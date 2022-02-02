<template>
  <p>{{ message }}</p>
</template>

<script>
import { fetchMessage } from "./services/fetchers.js";

export default {
  data() {
    return {
      message: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        this.message = await fetchMessage();
      } catch (e) {
        this.message = "server error";
      }
    },
  },
};
</script>
