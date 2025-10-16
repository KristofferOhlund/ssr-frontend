<script setup>
import { ref } from "vue";
import { CodeEditor } from "monaco-editor-vue3";
import { User } from "./composables/UserComposable.js";
import DocActions from "./composables/DocumentActions.js";
import router from "../router/index.js";

// CodeEditor V-model
const code = ref();
// CodeEditor Config
const editorOptions = {
  fontSize: 14,
  minimap: { enabled: false },
  automaticLayout: true,
};

// Saved output from Execution
const decodedOutput = ref("");

// Execute Code
async function execute() {
  decodedOutput.value = await DocActions.executeCode(code);
}

// Save Code as a Document
async function saveCodeDocument() {
  const timestampd = Date.now();
  const date = new Date(timestampd).toString().split(" ").slice(0, 5).join(" ");
  const body = {
    title: `Code execution: ${date}`,
    content: `${decodedOutput.value}`,
    type: "code",
  };

  const result = await DocActions.createDocument(body);

  if (result.acknowledged) {
    // redirect
    router.push({ name: "documents" });
  }
}
</script>

<template>
  <form class="code-form" @submit.prevent="execute">
    <div style="height: 400px">
      <CodeEditor
        v-model:value="code"
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
      <button class="btn code-btn" type="submit" @click="saveCodeDocument">Save Code in DB</button>
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
