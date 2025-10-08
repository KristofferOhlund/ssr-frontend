<script setup>
import { ref } from 'vue'
import { API } from "../../config/config.js";
import { useRoute } from 'vue-router'

// Dynamic route handler
// route = current route aka /login | /register
let route = useRoute()

const user = ref({
    userName: "",
    password: ""
})

// kalle
// password123

async function handleUser() {
    const userObject = {
        ...user.value
    };

    try {
        const path = route.path.replace("/", "");
        const response = await fetch(`${API}${path}`, {
            body: JSON.stringify(userObject),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        if (response.status === 200) {
            const result = await response.json();
            console.log(result);

            if (result.data?.type === "success") {
                auth.token = result.data.token;
                loggedIn = true;
                console.log("DU har loggat in")
                return "ok";
            }
        }

        return "not ok";
    } catch (error) {
        console.error(error);
    }
}
</script>

<template>
  <form @submit.prevent="handleUser" id="handleUser">
    <label for="title" class="green">Username</label>
    <input type="text" id="title" name="title" v-model="user.userName"required />
    <label for="content" class="green">Email</label>
    <!--<input type="email" id="email" name="email" required></input>
    <label for="password" class="green">Password</label>-->
    <input type="password" id="password" name="password" v-model="user.password" required></input>
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
