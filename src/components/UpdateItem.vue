<script setup lang="ts">
import { onMounted, ref } from "vue";
import { socket } from "./socket/socket.js";
import DocActions from "./composables/DocumentActions.js";
import monacoEditor from "./monaco-editor.vue";
import EditableContent from "./editableContent.vue";
import checkLogin from "./composables/checkLogin.js";
import comments from "./composables/comments.js";

checkLogin();

// Get's ID from parent (documentList)
const props = defineProps({
  // data: Object,
  id: String,
});

// CommentID
const commentId = ref(0);

// Documents fetched from Database
const documentData = ref(null);

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

/**
 * Add comments to DOM
 */
function dataComments() {
  comments.makeComment(commentId.value);
  commentId.value++;
  // Set value to false => hide comment btn
  selectionChanged.value = false;
}

let selectionChanged = ref(false);

/**
 * Update selectionChanged value
 */
function selectionstart() {
  selectionChanged.value = true;
}
</script>

<template>
  <!--v-model funkar endast på input elements, därför funkar inte socket med emit-->
  <div v-if="documentData && documentData.type === 'text'">
    <h3 for="title">Dokument titel</h3>
    <input
      type="text"
      id="title"
      name="title"
      v-model="documentData.title"
      @change="emit()"
      required
    />
    <EditableContent
      v-model="documentData"
      @input="emit()"
      @selectstart="selectionstart()"
    ></EditableContent>
    <button @click="updateDocument">Uppdatera dokument</button>
    <button v-if="selectionChanged" @click="dataComments">Add comment</button>
  </div>
  <!--<form
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
  </form>-->
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
