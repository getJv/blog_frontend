<template>
  <div>
    <v-card class="mx-auto my-5" flat outlined>
      <v-img class="white--text" :src="imageCard"></v-img>
      <v-card-title>{{title}}</v-card-title>

      <v-card-text>{{cardTitle}}</v-card-text>
      <v-card-actions>
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn small outlined to="post">Read</v-btn>
        <v-btn small text>Editar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    cardTitle: {
      required: true,
      type: String
    },
    imageCard: {
      required: true
    }
  }
};
</script>