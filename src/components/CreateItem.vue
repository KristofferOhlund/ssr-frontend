<script setup lang="ts">
/**
 * MODULE TO CREATE FORM OF TYPE [TYPE]
 * TYPE IS SELECTED BY USER
 *
 * IF CODE - IMPORT CODEFORM
 * ELSE DOCUMENTFORM
 */
import { ref } from "vue";
import checkLogin from "./composables/checkLogin.js";
import DocumentForm from "./forms/DocumentForm.vue";
import monacoEditor from "./monaco-editor.vue";

// Make sure user is logged in
checkLogin();

const textDoc = ref(false);
const codeDoc = ref(false);

function renderDocType(event) {
  let refType = event.target.value;
  refType == "textDoc" ? (textDoc.value = true) : (codeDoc.value = true);
}
</script>

<template>
  <div class="doc-type-container">
    <form v-if="!textDoc && !codeDoc">
      <h1>Select document Type</h1>
      <div class="type-btn-container">
        <button class="btn code" type="submit" value="textDoc" @click="renderDocType($event)">
          TextDocument
        </button>
        <button class="btn doc" type="submit" value="codeDoc" @click="renderDocType($event)">
          CodeDocument
        </button>
      </div>
    </form>
  </div>
  <div v-if="textDoc"><DocumentForm></DocumentForm></div>
  <div v-else-if="codeDoc">
    <monacoEditor></monacoEditor>
  </div>
</template>

<style scoped>
.doc-type-container {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.type-btn-container {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
}
</style>
