<script setup>
import { User } from "../composables/UserComposable.js";
import router from "../../router/index.js";
import { onMounted } from "vue";

/**
 * Logout user
 */
async function logOut() {
  User.isLoggedIn = false;
  router.push({ name: "home" });
}

/**
 * Redirect user if not logged in
 */
onMounted(() => {
  if (!User.isLoggedIn) {
    router.push({ name: "home" });
  }
});
</script>

<template>
  <form action="" @submit.prevent="logOut">
    <div class="logout-container">
      <h3>Are you sure you want to log out?</h3>
      <button type="submit" class="btn btn-delete">Logout</button>
    </div>
  </form>
</template>

<style>
.logout-container {
  margin: 2rem;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  flex-direction: column;
  gap: 1rem;
}
</style>
