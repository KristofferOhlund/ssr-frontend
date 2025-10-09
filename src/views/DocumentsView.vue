<script setup>
import DocumentList from "@/components/DocumentList.vue";
import UserDocumentList from "@/components/UserDocumentList.vue";
import { User } from "../components/composables/UserComposable.js";
import { allDocs, loading, fetchDocuments } from "../components/composables/DataComposable.js";
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
  <UserDocumentList v-if="User.isLoggedIn" :allDocs="allDocs" :loading="loading" />
  <DocumentList v-else :allDocs="allDocs" :loading="loading" />
</template>

<style></style>
