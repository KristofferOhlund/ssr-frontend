<script setup lang="ts">
import DocumentList from '../components/DocumentList.vue'
</script>

<template>
  <div class="about">
    <h1>All documents</h1>
      <DocumentList />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
