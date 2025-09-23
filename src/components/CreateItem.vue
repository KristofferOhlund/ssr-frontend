<script setup lang="ts">
import { ref } from "vue";
import { API } from "../config/config.js";

const title = ref("");
const content = ref("");

async function createDocument() {
  await fetch(`${API}/document`, {
    body: JSON.stringify({
      title: `${title.value}`,
      content: `${content.value}`,
    }),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });
}
</script>

<template>
  <form @submit.prevent="createDocument" id="create">
    <label for="title">
      <input type="text" id="title" name="title" v-model="title" required />
    </label>
    <label for="content">
      <textarea
        type="text"
        id="content"
        name="content"
        rows="5"
        cols="33"
        v-model="content"
        required
      ></textarea>
    </label>

    <button form="create" value="submit">Submit</button>
  </form>
</template>

<style scoped>
form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
