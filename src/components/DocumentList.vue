<script setup lang="ts">
import DocumentItem from "./DocumentItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import { ref, onMounted, watchEffect } from "vue";
import { API } from "../config/config.js";
import router from "../router/index.js";

const allDocuments = ref([{ title: "Loading files..." }]);

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
 * Update Document
 */
function updateDocument(document) {
  router.push({
    path: "update",
    params: { doc: "document" },
  });
}
</script>

<template>
  <!-- <div v-if="allDocuments.length > 0"> -->
  <div v-for="document in allDocuments" :key="document._id">
    <DocumentItem>
      <template #icon>
        <DocumentationIcon />
      </template>
      <template #heading
        ><a :href="`document/${_id}`">{{ document.title }}</a></template
      >
      {{ document.content }}
      <template #delete
        ><button value="`${_id}`" @click="deleteObject(document.id)">Delete</button></template
      >
      <template #update
        ><button value="`${_id}`" @click="updateDocument(document)">Update</button></template
      >
    </DocumentItem>
  </div>
</template>
