<template>
  <v-card class="mx-auto my-5" flat outlined>
    <v-img class="white--text" height="200px" :src="post.image">
      <v-card-title class="align-end fill-height caption">{{post.title}}</v-card-title>
    </v-img>
    <v-card-title class="title">{{post.title}}</v-card-title>

    <v-card-text>
      <P class="caption">{{post.created_at | formatDate }} by {{post.author | userFormat}}</P>
      <div v-html="$options.filters.sliceText(post.content)"></div>
    </v-card-text>
    <v-card-actions>
      <v-btn icon>
        <v-icon :color="isLiked" @click="post.liked = !post.liked">mdi-heart</v-icon>
      </v-btn>
      <v-btn small outlined :to="{ name: 'post', params: { id: post._id.$oid } }">Read</v-btn>
      <v-btn
        v-if="isLoggedIn"
        small
        text
        :to="{ name: 'post-form-edit', params: { id: post._id.$oid } }"
      >Editar</v-btn>
      <v-btn v-if="isLoggedIn" right small text @click="remove">Remove</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import moment from "moment";
import auth from "@/services/auth";
import axios from 'axios'
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      isLoggedIn: auth.loggedIn()
    };
  },
  watch: {
    isLoggedIn() {
      return auth.loggedIn();
    }
  },
  methods: {
    remove() {
      let config = {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${auth.getToken()}`
        }
      };

      axios
        .delete(
          process.env.VUE_APP_ROOT_API_BACKEND + "/post/" + this.post._id.$oid,
          config
        )
        .then(() => {
          this.$emit('refresh-post');
        })
    }
  },
  computed: {
    isLiked() {
      if (this.post.liked) {
        return "pink";
      }
      return "none";
    }
  },
  filters: {
    formatDate(value) {
      return moment(value,"YYYY/MM/DD").format("YYYY/MM/DD");
    },
    userFormat(value) {
      value = (value || "").split("@");
      return value[0];
    },
    sliceText(value) {
      let max = 60;
      if ((value || "").length > max) {
        value = value.slice(0, max);
        value = value + " ...";
      }

      return value;
    }
  }
};
</script>