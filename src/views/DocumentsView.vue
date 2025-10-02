<script setup>
import DocumentList from "@/components/DocumentList.vue";
import { allDocs, loading, fetchDocuments } from "../components/DataComposable.js";
import { onMounted, onUnmounted } from "vue";

let updateInterval;

onMounted(() => {
  fetchDocuments();
  updateInterval = setInterval(() => {
    fetchDocuments();
  }, 60 * 1000);
});

onUnmounted(() => {
  clearInterval(updateInterval);
});
</script>

<template>
  <DocumentList :allDocs="allDocs" :loading="loading" />
</template>

<style></style>
