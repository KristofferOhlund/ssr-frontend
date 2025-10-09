<script setup>
import { User } from "../composables/UserComposable.js";
import router from "../../router/index.js";

/**
 * Logout user
 */
async function logOut() {
  User.isLoggedIn = false;
  router.push({ name: "home" });
}
</script>

<template>
  <form action="" @submit.prevent="logOut">
    <h3>Are you sure you want to log out?</h3>
    <button type="submit">Logout</button>
  </form>
</template>
