<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Figured</span>
        <span class="font-weight-light">Blog</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mx-2" color="green" dark to="post-form">
        <v-icon>mdi-plus</v-icon>
        <span class="mx-2">New Post</span>
      </v-btn>
      <v-btn class="mx-2 pink darken-1" v-bind="{ [`dark`]: teste }" @click="teste = !teste">
        <v-icon>mdi-heart</v-icon>
        <span class="mx-2">Favorites</span>
      </v-btn>

      <v-btn v-if="loggedIn" class="mx-2" text color="primary" @click="logout">
        <span class="mr-2">Logout</span>
      </v-btn>

      <v-btn v-else class="mx-2" text color="primary" to="/login">
        <span class="mr-2">Login</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import auth from "@/services/auth";

export default {
  name: "App",
  methods: {
    logout() {
      this.loggedIn = auth.logout();
      this.$router.push("/");
    }
  },
  updated() {
    this.loggedIn = auth.loggedIn();
  },
  data: () => ({
    teste: false,
    loggedIn: auth.loggedIn()
  })
};
</script>
