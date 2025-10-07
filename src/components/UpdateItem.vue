<script setup lang="ts">
import { onMounted, ref } from "vue";
import { API } from "../config/config.js";
import router from "../router/index.js";
import { socket } from "@/socket";

const props = defineProps({
  // data: Object,
  id: String,
});

const documentData = ref(null);

// ------- SOCKET --------
socket.on("update", (data) => {
  console.log("Nu får client ett update event", data);
  documentData.value.id = data.id;
  documentData.value.title = data.title;
  documentData.value.content = data.content;
});

// Call getDocument function
onMounted(async () => {
  await getDocument(props.id);
  socket.emit("create", props.id);
});

async function getDocument(id) {
  const res = await fetch(`${API}/document/${id}`);
  documentData.value = await res.json();
}

function emit(value) {
  socket.emit("update", documentData.value);
}

/**
 * Createa new Document in database
 */
async function updateDocument() {
  await fetch(`${API}/document`, {
    body: JSON.stringify({
      id: `${documentData.value._id}`,
      title: `${documentData.value.title}`,
      content: `${documentData.value.content}`,
    }),
    headers: {
      "content-type": "application/json",
    },
    method: "PUT",
  });

  /**
   * Redirect to all documents route
   */
  router.push("/documents");
}
</script>

<!-- TEMPLATE -->
<template>
  <form v-if="documentData" @submit.prevent="updateDocument" id="update">
    <label for="title">Title</label>
    <input
      type="text"
      id="title"
      name="title"
      v-model="documentData.title"
      @change="emit(documentData.title)"
      required
    />

    <label for="content">Content</label>
    <textarea
      type="text"
      id="content"
      name="content"
      rows="20"
      cols="50"
      resize="none"
      v-model="documentData.content"
      required
    ></textarea>
    <p>Make updates and press submit:</p>
    <button form="update" value="submit">Submit</button>
  </form>
</template>

<style scoped>
form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
