<script setup lang="ts">
  import { ref } from 'vue';
  import { API } from '../config/config.js';

  const newDocument = ref(
    {
      title: "",
      content: ""
    }
  );

  async function createDocument (e) {
    console.log(e.target);
    console.log(e.target.title.value);

    newDocument.value.title = e.target.title.value;
    newDocument.value.content = e.target.content.value;

    console.log(newDocument.value);

    const result = await fetch(`${API}/document`, {
      body: JSON.stringify({
        title: `${newDocument.value.title}`,
        content: `${newDocument.value.content}`,
      }),
      headers: {
        'content-type': 'application/json'
        },
      method: 'POST'
    })
    console.log(result);
  }
</script>

<template>
  <form @submit.prevent="createDocument" id="create">

    <label for="title">
      <input type="text" id="title" name="title" required>
    </label>

    <label for="content">
      <textarea type="text" id="content" name="content" rows="5" cols="33" required></textarea>
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
