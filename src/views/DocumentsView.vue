<script setup>
// Delete Document
async function deleteDocument(id) {
  console.log(id);
  await dataCalls.deleteOne(id);
  data.value = await dataCalls.getDocs();

  await nextTick();

  data.value = await dataCalls.getDocs();
}

// Redirect to update document
async function updateDocument(id) {
  router.push({
    name: "update",
    params: {
      id: id,
    },
  });
}

import DocItem from "@/components/DocItem.vue";
import dataCalls from "../components/DataProvider";
import { ref, nextTick } from "vue";

// const { data, loading } = dataCalls.deleteOne("68db823a95c2def26cc801d5");
const dataObject = dataCalls.getDocs();

const data = ref(dataObject.data);
const loading = ref(dataObject.loading);
</script>

<template>
  <div class="joke-section">
    <p v-if="loading">Documents is loading...</p>
    <p v-if="data.doc === null">Something went wrong..</p>
    <li v-else v-for="doc in data.doc" :key="doc._id">
      <DocItem :doc="doc"> </DocItem>
      <button :value="doc._id" @click="deleteDocument(doc._id)">Delete</button>
      <button :value="doc._id" @click="updateDocument(doc._id)">Update</button>
    </li>
  </div>
</template>
