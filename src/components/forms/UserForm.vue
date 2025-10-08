<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

async function handleUser() {
  if (route.path === "#/login") {
    // Login user
  }
  // Register user
}
</script>

<template>
  <form @submit.prevent="handleUser" id="handleUser">
    <label for="title" class="green">Username</label>
    <input type="text" id="title" name="title" required />
    <label for="content" class="green">Email</label>
    <input type="email" id="email" name="email" required></input>
    <label for="password" class="green">Password</label>
    <input type="password" id="password" name="password" required></input>
    <button class="formButton" value="submit"> {{ route.path.replace("/", "").toUpperCase() }}</button>
  </form>
</template>

<style scoped>
form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

form * {
  border-radius: 5px;
}

.formButton {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  font-size: 1.2rem;
}

.register {
  background-color: blue;
}

input {
    height: 2rem;
}
</style>
