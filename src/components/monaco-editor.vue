<script setup>
import { ref, watch } from "vue";
import { CodeEditor } from "monaco-editor-vue3";
import { User } from "./composables/UserComposable.js";
import DocActions from "./composables/DocumentActions.js";
import router from "../router/index.js";

import { socket } from "./socket/socket.js";

// ------------ SETUP ------------
// Define model to be able to prepulate data from
// an already existing code-document
const currentCode = defineModel("currentCode");

// If NEW Code Document
const code = ref();
const codeTitle = ref();

// Copy the value of property content since updateCode is an entire object
// make a new ref out of the content property - this will be rendered and
// executed in CodeEditor
let updateCode;
if (currentCode.value) {
  updateCode = ref(currentCode.value.content);
  codeTitle.value = currentCode.value.title;
}

// Saved output from Execution - This is shown in 'Terminal'
const decodedOutput = ref("");

// Show info on update
const jumbo = ref(null);
let hasError = ref(false);

// CodeEditor Config
const editorOptions = {
  fontSize: 14,
  minimap: { enabled: false },
  automaticLayout: true,
};

// ------------ PROPERTY ------------
// used in save / update document
const timestamp = Date.now();
const date = new Date(timestamp).toString().split(" ").slice(0, 5).join(" ");

// ------- SOCKET --------
socket.on("update", (data) => {
  updateCode.value = data;
});

/**
 * Emits the Update event
 * @param value string Updated value
 */
function emit() {
  if (updateCode) {
    socket.emit("update", updateCode.value);
  }
}

// ------------ ACTIONS ------------

// Execute Code
async function execute() {
  if (updateCode) {
    decodedOutput.value = await DocActions.executeCode(updateCode);
  } else {
    decodedOutput.value = await DocActions.executeCode(code);
  }
}

// Save Code as a Document
async function saveCodeDocument() {
  const body = {
    title: `${codeTitle.value}.js`,
    content: `${code.value}`,
    type: "code",
  };

  const result = await DocActions.createDocument(body);
  console.log(result);

  if (result.acknowledged) {
    // redirect
    router.push({ name: "documents" });
  }
}

// Update Code Document
async function updateCodeDocument() {
  // Make currentCode an JS objekt - since this stores the id, author and everything else
  const documentObject = JSON.parse(JSON.stringify(currentCode.value));
  // database looks for 'id' therefore copy and replace _id
  documentObject["id"] = documentObject["_id"];
  delete documentObject["_id"];

  // Update the content and title of our object, corresponding to the value from our new code
  documentObject.content = updateCode.value;
  documentObject.title = codeTitle.value;

  // Update the database
  const result = await DocActions.updateDocument(documentObject);
  if (!result.modifiedCount) {
    jumbo.value = result.message;
    hasError.value = true;
  } else {
    jumbo.value = "Document uppdated successfully!";
  }
}
</script>

<template>
  <div class="jumbo" id="jumbo" v-if="jumbo" :class="{ error: hasError }">
    <h3>{{ jumbo }}</h3>
  </div>
  <form class="code-form" @submit.prevent="execute">
    <div style="height: 400px">
      <input type="text" placeholder="Spara dokument som..." v-model="codeTitle"></input>
      <CodeEditor
        v-if="!updateCode"
        v-model:value="code"
        language="javascript"
        theme="vs-light"
        :options="editorOptions"
        @change="emit()"
      /><CodeEditor
        v-else
        v-model:value="updateCode"
        language="javascript"
        theme="vs-dark"
        :options="editorOptions"
        @change="emit()"
      />
    </div>
    <button type="submit" class="btn code-btn">Execute</button>
    <div v-if="decodedOutput !== ''" class="terminal">
      <p>{{ `${decodedOutput}` }}</p>
      <span>{{ `zsh-${User.user}@BTH ~/dbwebb-kurser/jsramverk/ssr-frontend =>` }}</span>
      <span class="cursor"></span>
      <button v-if="!updateCode" class="btn code-btn" type="submit" @click="saveCodeDocument">
        Save Code in DB
      </button>
      <button v-else class="btn code-btn" type="submit" @click="updateCodeDocument">
        Update Code in DB
      </button>
    </div>
  </form>
</template>

<style>
.code-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.terminal {
  border-radius: 5px;
  background-color: black;
  color: green;
  padding: 0.5rem;
  font-family: "Monaco";
  font-size: 1rem;
  font-weight: bold;
}

.cursor {
  display: inline-block;
  width: 10px; /* bredd på "space" */
  height: 18px;
  background-color: green;
  margin-left: 2px;
  animation: blink 1s steps(1) infinite;
}

.code-btn {
  padding: 14px 20px;
  margin: 8px 0;
  cursor: pointer;
  width: 100%;
  font-size: 1.2rem;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
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
</style>
