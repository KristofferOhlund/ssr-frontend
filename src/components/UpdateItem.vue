<script setup lang="ts">
import { onMounted, ref } from "vue";
import { socket } from "./socket/socket.js";
import DocActions from "./composables/DocumentActions.js";
import monacoEditor from "./monaco-editor.vue";
import EditableContent from "./editableContent.vue";
import checkLogin from "./composables/checkLogin.js";
import comments from "./composables/comments.js";
import router from "../router/index.ts";

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
  console.log("event triggered");
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
async function updateDocument() {
  const objData = {};
  Object.assign(objData, documentData.value);
  objData["id"] = objData["_id"];
  delete objData["_id"];

  const result = await DocActions.updateDocument(objData);
  if (result) {
    router.push({ name: "documents" });
  }
}

/**
 * Add comments to DOM
 */
function dataComments() {
  comments.makeComment(commentId.value);
  // Manually throw input event after comment
  // this will update documentData.value even if no manual
  // input is made
  var event = new Event("input");
  const editor = document.getElementById(`editor`);
  editor?.dispatchEvent(event);

  // Find current popover
  const popover = document.getElementById(`pop${commentId.value}`);

  if (!documentData.value.comments) {
    documentData.value.comments = [];
  }
  documentData.value.comments.push({
    id: commentId.value,
    content: popover?.innerHTML,
  });

  const div = document.createElement("div");
  div.setAttribute("id", `${commentId.value++}`);
  div.innerHTML = documentData.value.comments[commentId.value].content;

  document.body.appendChild(div);
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
