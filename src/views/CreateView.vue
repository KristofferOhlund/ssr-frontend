<script setup lang="ts">
  import CreateItem from '../components/CreateItem.vue'
</script>

<template>
  <div class="create">
    <h1>Create a new document</h1>
    <CreateItem>
    </CreateItem>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
