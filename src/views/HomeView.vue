<script setup lang="ts">
import { User } from "../components/composables/UserComposable.js";
</script>

<template>
  <main>
    <h3 v-if="User.isLoggedIn">Welcome - {{ User.user }}</h3>
    <h3 v-else>Welcome! Please login or register</h3>
  </main>
</template>
