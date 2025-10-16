<script setup lang="ts">
/**
 * MODULE FOR CREATING A TEXT DOCUMENT
 */
import { ref } from "vue";
import router from "../../router/index.js";
import DocAction from "../composables/DocumentActions.js";
import checkLogin from "../composables/checkLogin.js";

// Make sure user is logged in
checkLogin();

const title = ref("");
const content = ref("");

/**
 * Create new Document
 * Redirect to documents after document has been created
 */
async function createDocument() {
  const doc = {
    title: `${title.value}`,
    content: `${content.value}`,
    type: "text",
  };

  const result = await DocAction.createDocument(doc);

  if (result.acknowledged) {
    // Clear input
    title.value = "";
    content.value = "";

    // redirect
    router.push({ name: "documents" });
  }
}
</script>

<template>
  <form @submit.prevent="createDocument" id="create">
    <label for="title">Title</label>
    <input type="text" id="title" name="title" v-model="title" required />
    <label for="content">Content</label>
    <textarea
      type="text"
      id="content"
      name="content"
      rows="20"
      cols="50"
      v-model="content"
      required
    ></textarea>
    <p>Enter your content and press submit:</p>
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
