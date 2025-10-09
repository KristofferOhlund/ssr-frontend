<script setup>
import { ref } from 'vue'
import { API } from "../../config/config.js";
import { useRoute } from 'vue-router'
import { User } from "../composables/UserComposable.js";
import router from "../../router/index.js";

// Dynamic route handler
// route = current route aka /login | /register
let route = useRoute()

const userInput = ref({
    email: "",
    password: ""
})

// kalle
// password123

async function handleUser() {
    const userObject = {
        ...userInput.value
    };

    const path = route.path.replace("/", "");

    if (path === "login") {
        User.IsLoggedIn = true;

        router.push({
        name: "documents",
        params: {
        user: User,
        },
    });

    // try {
    //     const path = route.path.replace("/", "");
    //     const response = await fetch(`${API}auth/${path}`, {
    //         body: JSON.stringify(userObject),
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         method: 'POST'
    //     });

    //     if (response.status === 200) {
    //         const result = await response.json();
    //         if (result.loggedIn === "true") {
    //             User.IsloggedIn = true;
    //         }
    //         console.log(User);
            
            
    //     }

    //     return "not ok";
    // } catch (error) {
    //     console.error(error);
    // }
}}
</script>

<template>
  <form @submit.prevent="handleUser" id="handleUser">
    <label for="email" class="green">Email</label>
    <input type="text" id="email" name="email" v-model="userInput.email" required />
    <label for="password" class="green">Password</label>
    <input type="password" id="password" name="password" v-model="userInput.password" required></input>
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
