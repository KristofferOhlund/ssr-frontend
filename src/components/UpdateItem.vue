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

// If true - shows addComment btn, else hide
const selectionChanged = ref(false);

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
function triggerInputEvent() {
  // Manually throw input event after comment
  // this will update documentData.value even if no manual
  // input is made
  const event = new Event("input", { bubbles: true });
  const editor = document.getElementById(`editor`);
  editor?.dispatchEvent(event);
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
  // Testing to render out the comments...
  console.log("Comments: ", documentData.value.comments);

  if (documentData.value.comments) {
    const popoverContainer = document.createElement("div");
    popoverContainer.id = "popoverContainer";

    for (const comment of documentData.value.comments) {
      const popover = document.createElement("div");

      popover.setAttribute("popover", "manual");
      popover.classList.add("popover");
      popover.id = `pop${comment.id}`;

      popover.innerHTML = comment.content;
      popoverContainer.appendChild(popover);

      // To give new added comments the right index
      commentId.value++;
    }
    document.body.appendChild(popoverContainer);
    const closeBtns = document.querySelectorAll(".close-btn");
    console.log("Close btns", closeBtns);
    for (const btn of closeBtns) {
      console.log("btn", btn);
      btn.addEventListener("click", () => {
        console.log("trying to fire event");
        const id = btn.id.slice(-1);
        console.log(id);
        insertUpdatedComment(id);
        const pop = document.querySelector(`#pop${id}`);
        console.log("ID", id);
        pop.hidePopover();
        triggerInputEvent();
        console.log(documentData.value);
      });
    }
  }
});

/**
 * Update document in database
 * Use DocActions insted of Component
 */
async function updateDocument() {
  const objData = JSON.parse(JSON.stringify(documentData.value));
  objData["id"] = objData["_id"];
  delete objData["_id"];

  console.log(objData);
  // const result = await DocActions.updateDocument(objData);
  // if (result) {
  //   console.log("Redirecting...");
  //   router.push({ name: "documents" });

  //   const popoverContainer = document.getElementById("popoverContainer");
  //   popoverContainer?.remove();
  // }
}

function insertUpdatedComment(id) {
  console.log("InsertUpdatedCOmment trigger");
  // Find current popover
  const popover = document.getElementById(`pop${id}`);

  if (!documentData.value.comments) {
    documentData.value.comments = [];
  }
  const newComment = { id: id, content: popover?.innerHTML };
  const foundIndex = documentData.value.comments.findIndex(
    (element) => element.id === newComment.id
  );
  if (foundIndex !== -1) {
    documentData.value.comments.splice(foundIndex, 1, newComment);
  } else {
    documentData.value.comments.push(newComment);
  }
}
/**
 * Add comments to DOM
 */
function dataComments() {
  comments.makeComment(documentData, commentId.value);

  // Find current popover
  const popover = document.getElementById(`pop${commentId.value}`);

  // If comments property is not found, create it as an array
  if (!documentData.value.comments) {
    documentData.value.comments = [];
  }

  triggerInputEvent();
  commentId.value++;
  // Set value to false => hide comment btn
  selectionChanged.value = false;
}

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
