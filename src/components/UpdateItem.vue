<script setup lang="ts">
import { ref } from "vue";
import { API } from "../config/config.js";
import router from "../router/index.js";

const props = defineProps({
  data: Object
});

const document = ref(props.data);
console.log('document: ', document);

/**
 * Createa new Document in database
 */
async function updateDocument() {
  // console.log('sending PUT', API, title.value, content.value, document.value._id);
  await fetch(`${API}/document`, {
    body: JSON.stringify({
      id: `${document.value._id}`,
      title: `${title.value}`,
      content: `${content.value}`,
    }),
    headers: {
      "content-type": "application/json",
    },
    method: "PUT",
  });

  // Push to `/document/${document.value._id}` when it exists
  router.push('/documents');
}
</script>

<template>
  <p>Make updates and press submit:</p>
  <form v-if="document" @submit.prevent="updateDocument" id="update">
    <label for="title">
      <input type="text" id="title" name="title" v-model="document.title" required />
    </label>
    <label for="content">
      <textarea
        type="text"
        id="content"
        name="content"
        rows="5"
        cols="33"
        v-model="document.content"
        required
      ></textarea>
    </label>

    <button form="update" value="submit">Submit</button>
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
