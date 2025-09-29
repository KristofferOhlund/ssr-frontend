<script setup lang="ts">
import DocumentList from '../components/DocumentList.vue'
</script>

<template>
  <div class="document-list">
    <h1>All documents</h1>
      <DocumentList />
  </div>
</template>

<style>
.document-list {
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .document-list {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
