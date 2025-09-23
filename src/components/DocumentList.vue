<script setup lang="ts">
import DocumentItem from "./DocumentItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import { ref, onMounted, watchEffect } from "vue";
import { API } from "../config/config.js";

const allDocuments = ref([{ title: "Loading files..." }]);

/**
 * Delete Document from database
 * @param id string
 */
async function deleteObject(id) {
  await fetch(`${API}/document`, {
    body: JSON.stringify({ id: id }),
    headers: {
      "content-type": "application/json",
    },
    method: "DELETE",
  });

  // Update data
  updateDocumentList();
}

/**
 * Fetch all documents from database
 */
async function updateDocumentList() {
  const res = await fetch(API);
  allDocuments.value = await res.json();
}

/**
 * Init loader - fetch on component mount
 */
onMounted(async () => {
  await updateDocumentList();
});
</script>

<template>
  <!-- <div v-if="allDocuments.length > 0"> -->
  <div v-for="{ title, content, _id } in allDocuments" :key="_id">
    <DocumentItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading
        ><a :href="`document/${_id}`">{{ title }}</a></template
      >
      {{ content }}
      <template #delete
        ><button value="`${_id}`" @click="deleteObject(_id)">Delete</button></template
      >
    </DocumentItem>
  </div>
  <!-- </div> -->
</template>
