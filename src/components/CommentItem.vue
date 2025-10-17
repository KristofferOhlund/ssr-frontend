

<!--  Detta kan nog funka halvbra -->
<!-- /graphql -> comments(document: docId ) {commentList { _id comment }} -->
<!-- https://stackoverflow.com/questions/6328718/how-to-wrap-surround-highlighted-text-with-an-element -->

<script setup>
import { ref, onMounted } from "vue";


function makeComment(){
    const selection = window.getSelection();

    const range = selection.getRangeAt(0).cloneRange();

    const span = document.createElement("button");
    span.classList.add('yellow', "btn-comment");
  // ------------------------------------------------------------------------------------
    // We send to DB and it returns the commentId
    // Separate collection: _id, comment, docId ?

    // HÄR SÄTTS ID:
    // commentId = await addCommentToDatabase(documentID)
    // span.id = commentId;
    // popovertarget="`${commentId}`";


    // For all comments with documentID -> <div id="`${commentId}`" popover>`${comment}`</div>

  // ------------------------------------------------------------------------------------

    range.surroundContents(span);
    selection.removeAllRanges();
    selection.addRange(range)
  };

onMounted(() => {

});
</script>

<template>
  <div class="comments">
    <div class="textarea" id="comment" contenteditable="true"></div>
    <button type="submit" @click="makeComment" >Add comment</button>
  </div>
</template>

<style>
.yellow {
  background-color: yellow;
}

.btn-comment {
  border: none;
  cursor: help;

}

.textarea {
  width: 400px;
  height: 400px;
  background-color: white;
  color: black;
}
</style>


<!-- <script setup lang="ts">
  import { ref } from 'vue'

  const title = ref('My content is pure text')
  const content = ref(null)
  let selected = "";

  function validate(event : Event) {
    (event.target as HTMLInputElement).blur()
    title.value = content.value.innerText.trim()
  }

  defineExpose({ content })

  function makeComment(){
    selected = window.getSelection().toString();
    console.log(selected);
    const output = document.querySelector(".output")
    output.innerHTML = `<span style="background-color: darkgreen;">Här kommer text: ${selected}</span>`
  }
</script>

<template>
  <form @submit.prevent="makeComment">
    <div
    ref="content"
    contenteditable="true"
    spellcheck="false"
    @keydown.enter="validate"
    style="background-color: white; color: black;">
      {{ title }}
    </div>

    <button
      type="submit"
      >
      Add comment
    </button>
  </form>
  <div class="output"></div>
</template>
 -->


<!-- <script setup>
import { ref, onMounted } from "vue";

onMounted(() => {
  const div = document.querySelector("#comment");

  div.addEventListener("mouseup", () => {
    const selection = document.getSelection();
    const text = selection.toString();
    console.log(text);
    const mod = <span class="yellow">${text}</span>;
    div.innerHTML = mod;
  });
});
</script>

<template>
  <div class="textarea" id="comment" contenteditable="true"></div>
</template>

<style>
.yellow {
  background-color: yellow;
}

.textarea {
  width: 400px;
  height: 400px;
  background-color: white;
  color: black;
}
</style> -->

