<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
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
  // Because monacoEditor is a child and uses documentData as a v-model
  // whenever the child emits an update it updates the documentData.value
  // which socket.on("update") catches and updates the data, which in turns destroy the
  // monaco editor.
  // Therefore we only update the data if its a document - even though the event is still catched
  if (documentData && documentData.value.type === "text") {
    documentData.value = data;
    renderPopoverDynamically();
  }
});

/**
 * Emits the Update event
 * @param value string Updated value
 */
function emit() {
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
  renderPopoverDynamically();
});

onUnmounted(() => {
  const popoverContainer = document.getElementById("popoverContainer");
  if (popoverContainer) {
    popoverContainer.innerHTML = "";
  }
});

function renderPopoverDynamically() {
  if (documentData.value.comments) {
    let popoverContainer = document.getElementById("popoverContainer");
    if (!popoverContainer) {
      popoverContainer = document.createElement("div");
      popoverContainer.id = "popoverContainer";
      document.body.appendChild(popoverContainer);
    }

    popoverContainer.innerHTML = "";

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
    // document.body.appendChild(popoverContainer);
    const closeBtns = document.querySelectorAll(".close-btn");
    for (const btn of closeBtns) {
      btn.addEventListener("click", () => {
        const reg = /\d+/;
        const id = btn.id.match(reg);
        const idNumber = id[0];
        insertUpdatedComment(idNumber);
        const pop = document.querySelector(`#pop${idNumber}`);
        pop.hidePopover();
        triggerInputEvent();
      });
    }
  }
}

/**
 * Update document in database
 * Use DocActions insted of Component
 */
async function updateDocument() {
  const objData = JSON.parse(JSON.stringify(documentData.value));
  objData["id"] = objData["_id"];
  delete objData["_id"];

  // Update inte database
  const result = await DocActions.updateDocument(objData);
  if (result) {
    router.push({ name: "documents" });
  }
}

function insertUpdatedComment(id) {
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
  emit();
}
/**
 * Add comments to DOM
 */
function dataComments() {
  comments.makeComment(documentData, commentId.value);

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
    <button @click="updateDocument" class="btn update-doc">Uppdatera dokument</button>
    <button v-if="selectionChanged" @click="dataComments" class="btn add-comment">
      Add comment
    </button>
  </div>
  <monaco-editor
    v-if="documentData && documentData.type === 'code'"
    v-model:currentCode="documentData"
  ></monaco-editor>
</template>

<style>
/* form {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  position: relative;
} */

.btn-container {
  display: flex;
  justify-content: space-evenly;
  /* align-content: center; */
  margin: 0.5rem;
}

.yellow {
  background-color: yellow;
}

.btn-comment {
  border: none;
  cursor: help;
}

.disabled {
  background-color: grey;
}

.comment {
  border: 2px solid var(--color-border);
  padding: 1rem;
  border-radius: 5px;
}

.popContent {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  max-height: 400px;
  padding: 0.5rem;
}

.popover {
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning ? */
  position: absolute;
  z-index: 999;
  margin: auto;
  border-radius: 5px;
}

/* [draggable="true"] {
  cursor: move;
} */

.comment-textarea {
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 5px;
  border: 2px solid var(--color-border);
}
</style>
