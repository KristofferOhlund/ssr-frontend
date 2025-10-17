<script setup lang="ts">
import { onMounted, ref } from "vue";
import { socket } from "./socket/socket.js";
import DocActions from "./composables/DocumentActions.js";
import monacoEditor from "./monaco-editor.vue";

// Get's ID from parent (documentList)
const props = defineProps({
  // data: Object,
  id: String,
});

const documentData = ref(null);

// UPDATE CODE DOC
const update = ref(true);

// ------- SOCKET --------
socket.on("update", (data) => {
  documentData.value = data;
});

/**
 * Emits the Update event
 * @param value string Updated value
 */
function emit() {
  socket.emit("update", documentData.value);
}

// Call getDocument function
// emit the create event - backend creates room based on id.
onMounted(async () => {
  const result = await DocActions.fetchOneGraphQLDocument(props.id);
  if (result) {
    documentData.value = result.data.document;
    if (!documentData.value.type) {
      documentData.value.type = "text";
    }
    socket.emit("create", props.id);
  }
});

/**
 * Update document in database
 * Use DocActions insted of Component
 */
function updateDocument() {
  DocActions.updateDocument(documentData);
}
</script>

<template>
  <form
    v-if="documentData && documentData.type === 'text'"
    @submit.prevent="updateDocument"
    id="update"
  >
    <label for="title">Title</label>
    <input
      type="text"
      id="title"
      name="title"
      v-model="documentData.title"
      @change="emit()"
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
      @change="emit()"
      required
    ></textarea>
    <p>Make updates and press submit:</p>
    <button form="update" value="submit">Submit</button>
  </form>
  <monaco-editor
    v-if="documentData && documentData.type === 'code'"
    v-model:currentCode="documentData"
  ></monaco-editor>
</template>

<style scoped>
form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>
