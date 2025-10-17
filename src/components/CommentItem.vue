<script setup>
import { ref, onMounted } from "vue";

//  Detta kan nog funka,

// Varning för pseudokod nedan:
// docComments = /graphql -> comments(document: docId ) {commentList { _id comment }}
// commentRef.value = docComments
// https://stackoverflow.com/questions/6328718/how-to-wrap-surround-highlighted-text-with-an-element

// Ref för att auto incrementera ID
const refId = ref(0);

function makeComment() {
  const selection = window.getSelection();
  if (!selection) {
    return;
  }

  const range = selection.getRangeAt(0).cloneRange();

  const commentEl = document.createElement("button");
  commentEl.classList.add("yellow", "btn-comment");
  commentEl.setAttribute("popovertarget", "testPop");

  // ------------------------------------------------------------------------------------
  // We send to DB and it returns the commentId
  // Separate collection: _id, docId, comment, deleted ?

  // HÄR SÄTTS ID:
  // commentId = await addCommentToDatabase(documentID)
  // span.id = commentId;
  // popovertarget="`${commentId}`";

  // For all comments with documentID -> <div id="`${commentId}`" popover>`${comment}`</div>
  // update comments-ref
  // socket emit

  // ------------------------------------------------------------------------------------

  range.surroundContents(commentEl);
  // selection.removeAllRanges();
  // selection.addRange(range);
  // Testing popover concept:
  const testPopover = document.createElement("div");
  testPopover.setAttribute("popover", "auto");
  testPopover.classList.add("popover");
  testPopover.id = "popover";
  document.body.appendChild(testPopover);

  addComment();
}

// Adds a Comment div
// Contains buttons and eventListeners
function addComment() {
  const testpop = document.querySelector("#popover");

  const comment = document.createElement("div");
  comment.setAttribute("id", refId.value);
  comment.classList.add("comment");
  const label = document.createElement("p");
  label.innerText = "Comment created by: User";
  const created = document.createElement("p");
  created.innerText = "Comment created: date";
  const textarea = document.createElement("textarea");
  textarea.setAttribute("required", "true");
  const addComBtn = document.createElement("button");
  addComBtn.innerText = "Add Comment";
  addComBtn.addEventListener("click", () => {
    // disable comment
    textarea.setAttribute("readonly", "true");
    saveCommentInDB();
    addComment();
  });

  const delComBtn = document.createElement("button");
  delComBtn.innerText = "Resolve Comment";
  delComBtn.addEventListener("click", () => {
    resolveComment(comment);
    delComBtn.removeEventListener("click", resolveComment);
  });

  // add to comment div
  comment.appendChild(label);
  comment.appendChild(created);
  comment.appendChild(textarea);
  comment.appendChild(addComBtn);
  comment.appendChild(delComBtn);

  // add to testpop
  testpop.appendChild(comment);

  // increment ID
  refId.value++;
}

// Save Comment in dB
function saveCommentInDB() {
  console.log("doc saved in DB");
}

// Resolve comment
function resolveComment(comment) {
  const p = document.createElement("p");
  p.innerText = "Resolved at: <date>";

  comment.insertBefore(p, comment.childNodes[2]);
  console.log("doc saved in DB");
  comment.setAttribute("disabled", "true");
}

// Add delete-comment-button (Soft delete)
// @click="deleteComment"
</script>

<template>
  <div class="comments">
    <div class="textarea" id="comment" contenteditable="true"></div>
    <button type="submit" @click="makeComment">Add comment</button>
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

.disabled {
  background-color: grey;
}

.comment {
  background-color: green;
  padding: 1rem;
  border-radius: 5px;
}

.popover {
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning ? */
  position: absolute;
  z-index: 999;
  margin: auto auto;
  background-color: red;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 2px;
  overflow-y: scroll;
  height: 400px;
}

.textarea {
  width: 400px;
  height: 400px;
  background-color: #f0f0f0;
  color: black;
}
</style>

//
<!-- <script setup lang="ts">
//   import { ref } from 'vue'

//   const title = ref('My content is pure text')
//   const content = ref(null)
//   let selected = "";

//   function validate(event : Event) {
//     (event.target as HTMLInputElement).blur()
//     title.value = content.value.innerText.trim()
//   }

//   defineExpose({ content })

//   function makeComment(){
//     selected = window.getSelection().toString();
//     console.log(selected);
//     const output = document.querySelector(".output")
//     output.innerHTML = `<span style="background-color: darkgreen;">Här kommer text: ${selected}</span>`
//   }
// </script>

// <template>
//   <form @submit.prevent="makeComment">
//     <div
//     ref="content"
//     contenteditable="true"
//     spellcheck="false"
//     @keydown.enter="validate"
//     style="background-color: white; color: black;">
//       {{ title }}
//     </div>

//     <button
//       type="submit"
//       >
//       Add comment
//     </button>
//   </form>
//   <div class="output"></div>
// </template>
//  -->

//
<!-- <script setup>
// import { ref, onMounted } from "vue";

// onMounted(() => {
//   const div = document.querySelector("#comment");

//   div.addEventListener("mouseup", () => {
//     const selection = document.getSelection();
//     const text = selection.toString();
//     console.log(text);
//     const mod = <span class="yellow">${text}</span>;
//     div.innerHTML = mod;
//   });
// });
// </script>

// <template>
//   <div class="textarea" id="comment" contenteditable="true"></div>
// </template>

// <style>
// .yellow {
//   background-color: yellow;
// }

// .textarea {
//   width: 400px;
//   height: 400px;
//   background-color: white;
//   color: black;
// }
// </style> -->
