<script setup>
import { ref } from "vue";
import { CodeEditor } from "monaco-editor-vue3";
import { User } from "./composables/UserComposable.js";

const code = ref();

const decodedOutput = ref("");

const editorOptions = {
  fontSize: 14,
  minimap: { enabled: false },
  automaticLayout: true,
};

async function execute() {
  var data = {
    code: btoa(`${code.value}`),
  };

  const response = await fetch("https://execjs.emilfolino.se/code", {
    body: JSON.stringify(data),
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
  });

  const result = await response.json();
  // write in terminal
  decodedOutput.value += atob(result.data);
  console.log(decodedOutput.value);
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
      {{ `zsh-${User.user}@MBA ~/dbwebb-kurser/jsramverk/ssr-frontend =>` }}
      <span class="cursor"></span>
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
  height: 400px;
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
