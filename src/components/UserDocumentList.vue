<script setup>
import DocItem from "@/components/DocItem.vue";
import DocActions from "./composables/DocumentActions.js";
import router from "../router/index.ts";

const { allDocs, loading } = defineProps(["allDocs", "loading"]);

/**
 * Share document => redirect to /share
 * @param id string
 */
function shareDocument(id) {
  router.push({
    name: "share",
    params: {
      id: id,
    },
  });
}

/**
 * Update document => redirect to /update
 * @param id string
 */
function updateDocument(id) {
  router.push({
    name: "update",
    params: {
      id: id,
    },
  });
}

/**
 * Delete Document
 * Update allDocs.data
 */
async function deleteDocument(id) {
  const response = await DocActions.deleteDocument(id);
  // Update docs after delete
  if (response.deletedCount > 0) {
    router.push({ name: "home" });
  }
}
</script>

<template>
  <div class="joke-section">
    <p v-if="loading.value">Documents is loading...</p>
    <p v-if="allDocs.data === null">Something went wrong..</p>
    <div v-if="allDocs.data !== null">
      <h2>Dina Dokument:</h2>
      <div v-for="doc in allDocs.data.authorDocs">
        <div class="doc-container">
          <DocItem :doc="doc"> </DocItem>
          <div class="button-container">
            <button :value="doc._id" @click="shareDocument(doc._id)" class="btn">Share</button>
            <button :value="doc._id" @click="updateDocument(doc._id)" class="btn">Update</button>
            <button :value="doc._id" @click="deleteDocument(doc._id)" class="btn btn-delete">
              Delete
            </button>
          </div>
        </div>
        <hr />
      </div>
    </div>
    <div v-if="allDocs.data.colabDocs" v-for="doc in allDocs.data.colabDocs">
      <h2>Dokument som delas med dig:</h2>
      <div class="doc-container">
        <DocItem :doc="doc" :isShared="true"> </DocItem>
        <div class="button-container">
          <button :value="doc._id" @click="shareDocument(doc._id)" class="btn">Share</button>
          <button :value="doc._id" @click="updateDocument(doc._id)" class="btn">Update</button>
          <button :value="doc._id" @click="deleteDocument(doc._id)" class="btn btn-delete">
            Delete
          </button>
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<style>
.button-container {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.5rem;
}

hr {
  border: 1px solid #333;
}

.btn {
  color: var(--color-text);
  background-color: transparent;
  padding: 0.5rem 1rem;
  border: 2px solid var(--color-text);
  border-radius: 5rem;
  transition: all 0.2s ease-in-out;
}

.btn:hover {
  background-color: rgb(0, 189, 126);
  color: var(--color-background);
}

.add-btn,
.resolve-btn,
.close-btn {
  background-color: rgb(0, 189, 126);
  color: #fff;
  border: 2px solid var(--color-border);
}

.add-btn:hover,
.resolve-btn:hover,
.close-btn:hover {
  background-color: rgb(0, 126, 189);
  color: var(--color-background);
}

.btn-delete:hover {
  background-color: rgb(228, 44, 44);
}

.doc-container {
  display: flex;
  align-items: center;
}
</style>
