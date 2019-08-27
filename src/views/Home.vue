<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="post in posts" :key="post._id">
        <card :title="post.title" :content="post.content" :image="post.image" :created_at="post.created_at" :author="post.author" :liked="post.liked"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "@/components/Card";
import axios from "axios";

export default {
  components: {
    Card
  },
  methods: {
    getPosts() {
      axios
        .get(process.env.VUE_APP_ROOT_API_BACKEND + "/posts")
        .then(res => {
         
          this.posts = res.data;
           
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getPosts();
  },
  data() {
    return {
      posts: []
    };
  }
};
</script>
