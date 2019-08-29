<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="9">
        <v-card class="ma-3">
          <v-toolbar color="blue-grey darken-1" dark>
            <v-toolbar-title>Post Register</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-img class="white--text" height="200px" :src="form.imageUrl">
            <v-card-title class="align-end fill-height caption">{{form.title}}</v-card-title>
          </v-img>
          <v-card-text>
            <v-alert v-model="alert.status" dismissible :type="alert.type">{{alert.message}}</v-alert>
            <form class="pa-4">
              <v-text-field
                v-model="form.title"
                :error-messages="titleErrors"
                :counter="80"
                label="Título"
                required
                @input="$v.form.title.$touch()"
                @blur="$v.form.title.$touch()"
              ></v-text-field>

              <v-text-field
                v-model="form.imageUrl"
                :error-messages="imageUrlErrors"
                label="Image URL"
                required
                @input="$v.form.imageUrl.$touch()"
                @blur="$v.form.imageUrl.$touch()"
              ></v-text-field>

              <v-btn small dark color="cyan" class="mb-2" @click="imageSurprise">Change Image</v-btn>

              <vue-editor
                v-model="form.text"
                label="Descrição"
                @input="$v.form.text.$touch()"
                @blur="$v.form.text.$touch()"
              ></vue-editor>
            </form>
            <v-card-actions>
              <v-btn small color="primary" @click="submit">Post it!</v-btn>
              <v-btn small text to="/">Voltar</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength, maxLength, url } from "vuelidate/lib/validators";
import { VueEditor } from "vue2-editor";
import auth from "@/services/auth";
import axios from "axios";
import qs from "qs";
export default {
  mixins: [validationMixin],
  components: {
    VueEditor
  },
  validations: {
    form: {
      title: { required, minLength: minLength(6), maxLength: maxLength(80) },
      text: { maxLength: maxLength(255) },
      imageUrl: { required, url }
    }
  },
  mounted() {
    axios
      .get(
        process.env.VUE_APP_ROOT_API_BACKEND + "/post/" + this.$route.params.id
      )
      .then(res => {
        if (res.data) {
          this.form = {
            id: res.data._id,
            title: res.data.title,
            text: res.data.content,
            imageUrl: res.data.image
          };
        } else {
          this.alert.status = true;
          this.alert.message = 'Post not Found!';
          this.alert.type = "warning";
          this.$router.push({
            name: "home",
            params: { alert: this.alert }
          });
        }
      })
      .catch(err => {
        console.log("deu erro");
        this.alert.status = true;
        this.alert.message = err;
        this.alert.type = "error";
      });
  },
  data: () => ({
    alert: {
      status: false,
      type: "warning",
      message: ""
    },
    form: {}
  }),
  computed: {
    titleErrors() {
      const errors = [];
      if (!this.$v.form.title.$dirty) return errors;
      !this.$v.form.title.maxLength && errors.push("Max 80 characteres");
      !this.$v.form.title.minLength && errors.push("Min 5 characteres");
      !this.$v.form.title.required && errors.push("Required Field.");
      return errors;
    },
    textErrors() {
      const errors = [];
      if (!this.$v.form.text.$dirty) return errors;
      !this.$v.form.text.maxLength && errors.push("Max 255 characteres");
      return errors;
    },
    imageUrlErrors() {
      const errors = [];
      if (!this.$v.form.imageUrl.$dirty) return errors;
      !this.$v.form.imageUrl.required && errors.push("Required Field.");
      !this.$v.form.imageUrl.url &&
        errors.push(
          "Invalid URL. (Remember to start with: http:// ou https://)"
        );
      return errors;
    }
  },
  methods: {
    imageSurprise() {
      this.form.imageUrl =
        "https://picsum.photos/id/" +
        Math.floor(Math.random() * 1000 + 1) +
        "/1000/300";
    },
    submit() {
      this.$v.$touch();
      if (
        this.$v.form.title.$invalid ||
        this.$v.form.text.$invalid ||
        this.$v.form.imageUrl.$invalid
      ) {
        this.alert = true;
        return;
      }

      let config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${auth.getToken()}`
        }
      };

      let requestBody = {
        _id: this.form.id,
        title: this.form.title,
        image: this.form.imageUrl,
        content: this.form.text
      };

      axios
        .put(
          process.env.VUE_APP_ROOT_API_BACKEND + "/post/" + this.form.id,
          qs.stringify(requestBody),
          config
        )
        .then(res => {
          this.$router.push({
            name: "home"
          });
        })
        .catch(err => {
          console.log(err.response.data);
          this.alert.status = true;
          this.alert.message = err;
          this.alert.type = "error";
        });
    }
  }
};
</script>