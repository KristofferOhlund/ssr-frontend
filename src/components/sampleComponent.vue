<script setup lang="ts">
import { onMounted } from "vue";

const props = defineProps<{
  msg: string;
}>();

let message;

onMounted(async () => (message = props.msg));
</script>

<template>
  <h1>Hello {{ msg }}</h1>
</template>
