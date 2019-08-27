<template>
  <div>
    <v-card class="mx-auto my-5" flat outlined>
      <!--  <v-img class="white--text" :src="image"></v-img> -->
      <!-- <v-card-title>{{title}}</v-card-title> -->
      <v-img class="white--text" height="200px" :src="image">
        <v-card-title class="align-end fill-height caption">{{title}}</v-card-title>
      </v-img>
      <v-card-title class="title">{{title}}</v-card-title>

      <v-card-text>
        <P class="caption">{{created_at | formatDate }} by {{author | userFormat}}</P>
        {{content | sliceText}}
      </v-card-text>
      <v-card-actions>
        <v-btn icon>
          <v-icon :color="isLiked" @click="liked = !liked">mdi-heart</v-icon>
        </v-btn>
        <v-btn small outlined to="post">Read</v-btn>
        <v-btn small text>Editar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import moment from "moment";
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    content: {
      required: true,
      type: String
    },
    image: {
      required: true
    },
    created_at: {
      required: true
    },
    author: {
      required: true
    }
    ,
    liked: {
      required: true,
      type:Boolean
    }
  },
  computed:{
      isLiked(){
          if(this.liked){
              return 'pink'
          }
          return 'none'
      }
  },
  filters: {
    formatDate(value) {
      return moment(String(value)).format("MM/DD/YYYY");
    },
    userFormat(value) {
      value = value.split("@");
      return value[0];
    },
    sliceText(value) {
    let max = 60
      if (value.length > max) {
        value = value.slice(0, max);
        value = value + " ...";
      }

      return value;
    }
  }
};
</script>