<script setup>
import { ref, watch } from "vue";
import { CodeEditor } from "monaco-editor-vue3";
import { User } from "./composables/UserComposable.js";
import DocActions from "./composables/DocumentActions.js";
import router from "../router/index.js";

// TODO
// UPDATE IS ACTING WIERD - SOMETIMES UPDATES AND SOMETIMES DONT
// WHEN DELET DOCUMENT - DISPLAYS KINGENS DOC? WHEN REFRESH SHOWS ALL AGAIN
// WIERD ERRORS - FLAGS.JOB FULL & PROPERTY 'ON' ON NULL

// ------------ SETUP ------------
// Define model to be able to prepulate data from
// an already existing code-document
const currentCode = defineModel("currentCode");

// Copy the value of property content since updateCode is an entire object
// make a new ref out of the content property - this will be rendered and
// executed in CodeEditor
let updateCode;
if (currentCode.value) {
  updateCode = ref(currentCode.value.content);
}

// If NEW Code Document
const code = ref();

// Saved output from Execution - This is shown in 'Terminal'
const decodedOutput = ref("");

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
    title: `Code execution: ${date}`,
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
  // Update title when current date and time
  currentCode.value.title = date;
  currentCode.value.content += updateCode.value;
  const result = await DocActions.updateDocument(currentCode);

  if (result) {
    // redirect
    router.push({ name: "documents" });
  }
}
</script>

<template>
  <form class="code-form" @submit.prevent="execute">
    <div style="height: 400px">
      <CodeEditor
        v-if="!updateCode"
        v-model:value="code"
        language="javascript"
        theme="vs-light"
        :options="editorOptions"
      /><CodeEditor
        v-else
        v-model:value="updateCode"
        language="javascript"
        theme="vs-dark"
        :options="editorOptions"
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
</style>
