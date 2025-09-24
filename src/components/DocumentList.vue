<script setup lang="ts">
import DocumentItem from "./DocumentItem.vue";
import DocumentationIcon from "./icons/IconDocumentation.vue";
import { ref, onMounted } from "vue";
import { API } from "../config/config.js";
import router from "../router/index.js";

const allDocuments = ref([{ title: "Loading files..." }]);

/**
 * Fetch all documents from database
 */
async function getDocumentList() {
  const res = await fetch(API);
  allDocuments.value = await res.json();
}

/**
 * Init loader - fetch on component mount
 */
onMounted(async () => {
  await getDocumentList();
});

/**
 * Delete Document from database
 * @param id string
 */
async function deleteObject(id) {
  console.log(id);
  await fetch(`${API}/document`, {
    body: JSON.stringify({ id: id }),
    headers: {
      "content-type": "application/json",
    },
    method: "DELETE",
  });

  // Update data
  getDocumentList();
}

/**
 * Update Document
 * DocumentList.vue:47 [Vue Router warn]: Path "update" was passed with params but they will be ignored. Use a named route alongside params instead.
 *
 */
function updateDocument(id) {
  router.push({
    name: "update",
    params: {
      id: id,
    },
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

      <template #heading>
        <a :href="`document/${document._id}`">{{ document.title }}</a>
      </template>

      {{ document.content }}

      <template #delete>
        <button :value="document._id" @click="deleteObject(document._id)">Delete</button>
      </template>

      <template #update>
        <button :value="document._id" @click="updateDocument(document._id)">Update</button>
      </template>
    </DocumentItem>
  </div>
</template>
