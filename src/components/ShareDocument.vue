<script setup>
import { onMounted, ref } from "vue";
import { User } from "./composables/UserComposable.js";
import checkLogin from "./composables/checkLogin.js";
import DocActions from "./composables/DocumentActions.js";

const props = defineProps({
  id: String,
});

const reciever = ref();
const message = ref();

// Jumbotron
const jumbo = ref(null);

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
  const body = {
    docId: `${props.id}`,
    sender: `${User.user}`,
    reciever: `${reciever.value}`,
    message: `${message.value}`,
  };

  const result = await DocActions.shareDocument(body);
  if (result.success) {
    jumbo.value = `You successfully invited ${reciever.value}`;
  }
}
</script>

<template>
  <form @submit.prevent="sendEmail">
    <div class="jumbo" v-if="jumbo">
      <h3>{{ jumbo }}</h3>
    </div>
    <label for="sender" class="green">Sender</label>
    <input type="email" :value="User.user" readonly />
    <label for="email" class="green">Invite Friend</label>
    <input type="email" v-model="reciever" placeholder="friend.sample@gmail.com" />
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
</style>
