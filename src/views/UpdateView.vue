<script setup lang="ts">
import CreateItem from "../components/CreateItem.vue";
import router from "../router/index.ts";
</script>

<template>
  {{ $route.params.doc }}
  {{ $props }}
  <div class="about">
    <h1>Update document</h1>
    <CreateItem> </CreateItem>
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
