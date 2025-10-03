
<script>
import { socket } from "@/socket";
import ConnectionManager from "./ConnectionManager.vue";

ConnectionManager.methods.connect();

export default {
  name: "MyForm",

  data() {
    return {
      isLoading: false,
      value: ""
    }
  },

  methods: {
    onSubmit() {
      this.isLoading = true;

      socket.timeout(5000).emit("chat message", this.value, () => {
        this.isLoading = false;
      });
    },
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <input v-model="value" />

    <button type="submit" :disabled="isLoading">Submit</button>
  </form>
</template>
