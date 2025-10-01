<script setup>
import DocItem from "@/components/DocItem.vue";
import dataCalls from "../components/DataProvider";
import { ref } from "vue";
import router from "../router/index.js";

const data = ref(null);
const loading = ref(true);

// Delete Document
async function deleteDocument(id) {
  console.log(id);
  await dataCalls.deleteOne(id);
  data.value = await dataCalls.getDocs();

  // await nextTick();

  const updateData = await dataCalls.getDocs();
  console.log(updateData)

  data.value = updateData.data;
  loading.value = updateData.loading;
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


// const { data, loading } = dataCalls.deleteOne("68db823a95c2def26cc801d5");
const dataObject = dataCalls.getDocs();

data.value = dataObject.data;
loading.value = dataObject.loading;

</script>

<template>
  <div class="joke-section">
    <p v-if="loading.value">Documents is loading...</p>
    <p v-if="data.doc === null">Something went wrong..</p>
    <div v-else v-for="doc in data.doc" :key="doc._id">
      <DocItem :doc="doc"> </DocItem>
      <button :value="doc._id" @click="updateDocument(doc._id)">Update</button>
      <button :value="doc._id" @click="deleteDocument(doc._id)">Delete</button>
    </div>
  </div>
</template>
