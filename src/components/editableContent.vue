<script setup>
import { onMounted, watch, ref } from "vue";

// 'Ref' with a two-way connection between parent and child
const userObject = defineModel();

watch(
  userObject,
  () => {
    const editor = document.getElementById("editor");
    editor.innerHTML = userObject.value.content;
    // https://www.reddit.com/r/learnjavascript/comments/p0ted5/how_to_set_text_cursor_position_in_a/

    // Find last element in editablecontent div
    let textNode = editor.childNodes[editor.childNodes.length - 1];
    if (textNode.nodeName !== "#text") {
      textNode = textNode.firstChild;
    }

    if (textNode && textNode.nodeType === Node.TEXT_NODE) {
      const pos = textNode.data.length;
      const range = document.createRange();
      range.setStart(textNode, pos);
      range.setEnd(textNode, pos);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  },
  { deep: true } // userObject är bara en referens, för att kontrollera innehåll krävs deep
);

onMounted(() => {
  // Since editable is not an input element, we have to trigger the input
  // event insted of the @change (which works on regular input elements)
  // When input is made to editable div - we update the content value in userObject
  // Since we have a two way connection - between child and parent
  // if inputType = insertText - we add text, else we remove text
  // OBS! Kan INTE hantera enter (newline) eller markera allt och backspace
  const editor = document.getElementById("editor");
  editor.innerHTML = userObject.value.content;

  //   console.log(editor);

  editor.addEventListener("input", (event) => {
    userObject.value.content = editor.innerHTML;
  });
});
</script>

<template>
  <div class="editable" contenteditable="true" id="editor">
    <!--Content sätts genom innerHtml-->
  </div>
</template>

<style>
.editable {
  background-color: #fff;
  border-radius: 5px;
  border: 2px solid grey;
  color: black;
  height: 400px;
  margin-bottom: 1rem;
}
</style>
