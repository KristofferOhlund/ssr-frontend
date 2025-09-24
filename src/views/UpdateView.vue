<script setup lang="ts">
import UpdateItem from "../components/UpdateItem.vue";

const props = defineProps({
  id: String,
});
</script>

<template>
  <div class="update">
    <h1>Update document</h1>
    <UpdateItem :id="props.id"></UpdateItem>
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
