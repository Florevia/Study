<template>
  <div>
    <h1>Home</h1>
    <h1>{{ name }}</h1>
    <h1>333 {{ fullName }}</h1>
    <h1>{{ this.$route.query.id }}</h1>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters(["fullName"]),
  },
};
</script>

<style></style>
