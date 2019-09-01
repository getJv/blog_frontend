<template>
  <v-card class="mx-auto my-5" flat outlined>
    <v-img class="white--text" height="200px" :src="post.image"></v-img>
    <v-card-title class="display-2">{{post.title}}</v-card-title>
    <v-card-actions>
      <v-btn icon>
        <v-icon :color="isLiked" @click="post.liked = !post.liked">mdi-heart</v-icon>
      </v-btn>
      <v-btn small outlined to="/">Voltar</v-btn>
      <v-btn v-if="isLoggedIn" small text :to="{ name: 'post-form-edit',params: { id: post.id } }">Editar</v-btn>
    </v-card-actions>

    <v-card-text>
      <P class="title" >{{post.created_at | formatDate }} by {{post.author | userFormat}}</P>
      <p class="subtitle-1" >{{post.content}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn small outlined to="/">Voltar</v-btn>
      <v-btn v-if="isLoggedIn" small text :to="{ name: 'post-form-edit',params: { id: post.id } }">Editar</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import moment from "moment";
import auth from "@/services/auth";
export default {
  props: {
    post: {
      required: true,
      type: Object
    }
  },
  computed: {
    isLoggedIn() {
      return auth.loggedIn();
    },

    isLiked() {
      if (this.post.liked) {
        return "pink";
      }
      return "none";
    }
  },
  filters: {
    formatDate(value) {
      
      return moment(value).format("DD/MM/YYYY");
    },
    userFormat(value) {
      
      value = (value || "").split("@");
      return value[0];
    }
  }
};
</script>