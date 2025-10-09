<script setup>
import { ref, watch } from "vue";
import { API } from "../../config/config.js";
import { useRoute } from "vue-router";
import { User } from "../composables/UserComposable.js";
import router from "../../router/index.js";

// Dynamic route handler
// route = current route aka /login | /register
let route = useRoute();

// Reset jumbo if route changes
watch(route, () => {
  jumbo.value = null;
});

const userInput = ref({
  email: "",
  password: "",
});

const jumbo = ref(null);

async function handleUser() {
  const userObject = {
    ...userInput.value,
  };

  try {
    const path = route.path.replace("/", "");
    const response = await fetch(`${API}auth/${path}`, {
      body: JSON.stringify(userObject),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    // 201 == user created
    // redirect to login
    if (response.status === 201) {
      router.push({
        name: "login",
      });
    }

    // 200 = logged in
    else if (response.status === 200) {
      const result = await response.json();

      // Update User object
      User.isLoggedIn = true;
      User.name = result.user ?? "Default namn";
      router.replace({
        name: `home`,
      });
    }

    // anything but 201, 200
    else {
      const result = await response.json();
      jumbo.value = result.message;
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <form @submit.prevent="handleUser" id="handleUser">
    <div class="error" v-if="jumbo">
      <h3>{{ jumbo }}</h3>
    </div>
    <label for="email" class="green">Email</label>
    <input type="text" id="email" name="email" v-model="userInput.email" required />
    <label for="password" class="green">Password</label>
    <input type="password" id="password" name="password" v-model="userInput.password" required />
    <button class="formButton" value="submit">
      {{ route.path.replace("/", "").toUpperCase() }}
    </button>
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

.error {
  background-color: #e42c2c;
  border-radius: 5px;
  height: 3rem;
  text-align: center;
  align-content: center;
  font-weight: bold;
  box-shadow: inset 2px lightcyan;
  color: #fff;
  /* font-size: 1.2rem; */
}
</style>
