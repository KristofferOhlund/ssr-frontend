<script>
import { socket } from "@/socket";

export default {
  name: "MyForm",

  data() {
    return {
      isLoading: false,
      value: "",
    };
  },

  methods: {
    onSubmit() {
      this.isLoading = true;

      socket.timeout(5000).emit("chat message", this.value, () => {
        this.isLoading = false;
      });

      // Bara för att testa
      const ul = document.getElementById("inputList");
      const li = document.createElement("li");
      li.textContent = this.value;
      ul.appendChild(li);
      this.value = "";
    },
  },
};
</script>

<template>
  <ul id="inputList"></ul>
  <form @submit.prevent="onSubmit">
    <input v-model="value" />

    <button type="submit" :disabled="isLoading">Submit</button>
  </form>
</template>
