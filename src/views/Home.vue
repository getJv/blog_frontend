<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3"  v-for="n in 10" :key="n">
        <card
          title="MEu titulo"
          cardTitle="Lorem ipsum dolor sit amet consectetur ."
          imageCard="https://picsum.photos/id/1/1000/300"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from "../components/Card";

export default {
  components: {
    Card
  }
};
</script>
