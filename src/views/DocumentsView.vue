<script setup>
import UserDocumentList from "@/components/UserDocumentList.vue";
import { User } from "../components/composables/UserComposable.js";
import { allDocs, loading, fetchDocuments } from "../components/composables/DataComposable.js";
import { onMounted, onUnmounted } from "vue";
import checkLogin from "../components/composables/checkLogin.js";

let updateInterval;

/**
 * Redirect user if not logged in
 * Else fetch documents
 */
onMounted(() => {
  checkLogin();
  fetchDocuments(User.email);
  updateInterval = setInterval(() => {
    fetchDocuments(User.email);
  }, 60 * 1000);
});

onUnmounted(() => {
  clearInterval(updateInterval);
});
</script>

<template>
  <UserDocumentList v-if="User.isLoggedIn" :allDocs="allDocs" :loading="loading" />
</template>

<style></style>
