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
  user: "",
  password: "",
});

const jumbo = ref(null);

const hasError = ref(false);

async function handleUser() {
  const userObject = {
    ...userInput.value,
  };

  console.log(userObject);

  try {
    const path = route.path.replace("/", "");
    const response = await fetch(`${API}/auth/${path}`, {
      body: JSON.stringify(userObject),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    // 201 == user created
    // redirect to login
    if (response.status === 201) {
      jumbo.value = "User created successfully!";
    }

    // 200 = logged in
    else if (response.status === 200) {
      const result = await response.json();

      // Update User object
      User.isLoggedIn = true;
      User.name = result.user ?? "Default namn";
      User.token = result.jwt;
      router.replace({
        name: `home`,
      });
    }

    // anything but 201, 200
    else {
      const result = await response.json();
      jumbo.value = result.message;
      hasError.value = true;
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <form @submit.prevent="handleUser" id="handleUser">
    <div class="jumbo" id="jumbo" v-if="jumbo" :class="{ error: hasError }">
      <h3>{{ jumbo }}</h3>
    </div>
    <label for="email" class="green">Email</label>
    <input type="text" id="email" name="email" v-model="userInput.user" required />
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

.jumbo {
  border-radius: 5px;
  height: 3rem;
  text-align: center;
  align-content: center;
  font-weight: bold;
  box-shadow: inset 2px lightcyan;
  color: #fff;
  background-color: green;
}

.error {
  background-color: #e42c2c;
}

/* .success {
  background-color: green;
} */
</style>
