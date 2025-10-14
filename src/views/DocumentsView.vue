<script setup>
import UserDocumentList from "@/components/UserDocumentList.vue";
import { User } from "../components/composables/UserComposable.js";
import { onMounted, onUnmounted, reactive, ref } from "vue";
import checkLogin from "../components/composables/checkLogin.js";
import DocAction from "../components/composables/DocumentActions.js";

let updateInterval;

/**
 * Reactive objekt storing all Documents in array
 */
const allDocs = reactive({
  data: [],
});

const loading = ref(false);

/**
 * Redirect user if not logged in
 * Else fetch documents
 */
onMounted(async () => {
  checkLogin();
  if (User.token) {
    loading.value = true;
    const response = await DocAction.fetchDocuments(User.email);
    allDocs.data = response;

    loading.value = false;
    // check for updates
    updateInterval = setInterval(async () => {
      const response = await DocAction.fetchDocuments(User.email);
      allDocs.data = response;
    }, 60 * 1000);
  }
});

onUnmounted(() => {
  clearInterval(updateInterval);
});
</script>

<template>
  <UserDocumentList v-if="User.isLoggedIn && allDocs.data" :allDocs="allDocs" :loading="loading" />
</template>

<style></style>
