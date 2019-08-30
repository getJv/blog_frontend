<template>
  <v-container fluid>
    <v-row align="center" justify="center" class="mt-5">
      <v-col cols="6">
        <v-text-field v-model="searchInput" placeholder="Search..." outlined solo clearable flat></v-text-field>
        <center>
          <span v-if="textNotFound" class="pink--text caption">Oh... Nothing found. Please try again</span>
          <v-alert
            class="my-3"
            v-model="alert.status"
            dismissible
            :type="alert.type"
          >{{alert.message}}</v-alert>
        </center>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="post in filteredList" :key="post._id.$oid">
        <card :post="post" @refresh-post="getPosts" />
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
  computed: {
    nothingFound() {
      return this.textNotFound && this.searchInput.length < 1;
    },
    filteredList() {
      let newList = [];
       let allowedSearchLength = this.searchInput.length > 2;
      if (allowedSearchLength) { 
        this.posts.filter(item => {
          if (item.title.toLowerCase().search(this.searchInput.toLowerCase()) >= 0) {
            newList.push(item);
          }
        });
      } 
      if (newList.length != 0) {
        this.textNotFound = false;
        return newList;
      }  else if (allowedSearchLength && newList.length < 1) {
        this.textNotFound = true;
      } else {
        this.textNotFound = false;
      } 

      return this.posts;
    }
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
    this.alert.status = this.$route.params.alert.status || false;
    this.alert.type = this.$route.params.alert.type || "warning";
    this.alert.message = this.$route.params.alert.message || "";
  },
  data() {
    return {
      posts: [],
      searchInput: "",
      textNotFound: false,
      alert: {
        status: false,
        type: "warning",
        message: ""
      }
    };
  }
};
</script>
