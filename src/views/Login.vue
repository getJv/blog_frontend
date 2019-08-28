<template>
  <div>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="indigo">
                <v-toolbar-title>Log in</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-form @submit.prevent="login">
                <v-card-text>
                  <p
                    v-if="$route.query.redirect && !error"
                    class="grey--text"
                  >Please identify your self</p>
                  <p v-if="error" class="red--text">Invalid credentials. Please try again</p>
                  <v-text-field v-model="username" label="E-mail" type="text"></v-text-field>
                  <v-text-field v-model="password" label="Password" type="password"></v-text-field>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text color="indigo" type="submit">Send</v-btn>
                  <v-btn text color="indigo" to="/">Back</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </div>
</template>
<script>
import axios from "axios";
import auth from "@/services/auth";
export default {
  created() {},
  data() {
    return {
      username: "jhonatanvinicius@gmail.com",
      password: "secret",
      error: false
    };
  },
  methods: {
    login() {
      axios
        .post(process.env.VUE_APP_ROOT_API_BACKEND + "/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          auth.saveSession(response.data);
          this.$router.push(this.$route.query.redirect || "/");
        })
        .catch(error => {
          auth.logout();
          this.error = true;
        });
    }
  }
};
</script>