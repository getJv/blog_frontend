<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="9">
        <card-reader :post="post" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardReader from "@/components/CardReader";
import axios from "axios";

export default {
  components: {
    CardReader
  },
  created() {
    axios
      .get(
        process.env.VUE_APP_ROOT_API_BACKEND + "/post/" + this.$route.params.id
      )
      .then(res => {
        this.post = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  data() {
    return {
      post: {}
    };
  }
};
</script>