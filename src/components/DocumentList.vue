<script setup>
import DocItem from "@/components/DocItem.vue";
import DocActions from "./composables/DocumentActions.js";

defineProps(["allDocs", "loading"]);
</script>

<template>
  <div class="joke-section">
    <p v-if="loading.value">Documents is loading...</p>
    <p v-if="allDocs.data === null">Something went wrong..</p>
    <div v-else v-for="doc in allDocs.data" :key="doc._id" class="doc-list">
      <DocItem :doc="doc"> </DocItem>
      <div class="button-container">
        <button :value="doc._id" @click="DocActions.updateDocument(doc._id)" class="btn">
          Update
        </button>
        <button :value="doc._id" @click="DocActions.deleteDocument(doc._id)" class="btn btn-delete">
          Delete
        </button>
      </div>
      <hr />
    </div>
  </div>
</template>

<style>
.button-container {
  padding: 0rem calc(var(--section-gap) / 4) 1rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 2rem;
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

.btn-delete:hover {
  background-color: rgb(228, 44, 44);
}
</style>
