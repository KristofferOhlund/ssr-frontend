<script setup lang="ts">
import DocItem from "./DocItem.vue";
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
  const result = await res.json();

  allDocuments.value = result;
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
  <div class="doc" v-for="document in allDocuments" :key="document._id">
    <i><DocumentationIcon /></i>
    <DocItem :doc="document"> </DocItem>
  </div>
</template>

<style scoped>
  .doc {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  i {
    display: flex;
    place-items: center;
    place-content: center;
    width: 32px;
    height: 32px;

    color: var(--color-text);
  }

</style>

<!--
<template>
  <!-- <div v-if="allDocuments.length > 0">
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
-->
