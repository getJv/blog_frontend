<template>
  <v-card class="mx-auto my-5" flat outlined>
    <v-img class="white--text" height="200px" :src="post.image">
      <v-card-title class="align-end fill-height caption">{{this.post.title}}</v-card-title>
    </v-img>
    <v-card-title class="title">{{this.post.title}}</v-card-title>

    <v-card-text>
      <P class="caption">{{this.post.created_at | formatDate }} by {{this.post.author | userFormat}}</P>
      {{post.content | sliceText}}
    </v-card-text>
    <v-card-actions>
      <v-btn icon>
        <v-icon :color="isLiked" @click="liked = !liked">mdi-heart</v-icon>
      </v-btn>
      <v-btn small outlined :to="{ name: 'post', params: { id: this.post._id } }">Read</v-btn>
      <v-btn v-if="isLoggedIn" small text>Editar</v-btn>
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
      return moment(value, "DD/MM/YYYY").format("MM/DD/YYYY");
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