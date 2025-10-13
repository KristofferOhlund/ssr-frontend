<script setup>
import { onMounted, ref } from "vue";
import { User } from "./composables/UserComposable.js";
import checkLogin from "./composables/checkLogin.js";
import DocActions from "./composables/DocumentActions.js";

const props = defineProps({
  id: String,
});

const adress = ref();
const message = ref();

/**
 * Check if user is loggedIn, else redirect to /login
 */
onMounted(() => {
  checkLogin();
});

/**
 * Create mailbody
 * Send Invitation
 */
async function sendEmail() {
  console.log("Sending Email");
  console.log(adress.value);
  console.log(message.value);
  const body = {
    docId: `${props.id}`,
    from: "`${User.email}`",
    reciever: `${adress.value}`,
    message: `${message.value}`,
  };

  DocActions.shareDocument(body);
}
</script>

<template>
  <form @submit.prevent="sendEmail">
    <div class="error" v-if="jumbo">
      <h3>{{ jumbo }}</h3>
    </div>
    <label for="sender" class="green">Sender</label>
    <input type="email" :value="User.email" readonly />
    <label for="email" class="green">Invite to Email</label>
    <input type="email" v-model="adress" />
    <label for="message" class="green">Message</label>
    <input type="text" v-model="message" />
    <button type="submit" class="formButton">Invite!</button>
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
