<script setup lang="ts">
const props = defineProps<{
  msg: string;
}>();
</script>

<template>
  <h1>Hello {{ msg }}</h1>
</template>
