<script setup>
import { ref, onMounted } from "vue";

//  Detta kan nog funka,

// Varning för pseudokod nedan:
// docComments = /graphql -> comments(document: docId ) {commentList { _id comment }}
// commentRef.value = docComments
// https://stackoverflow.com/questions/6328718/how-to-wrap-surround-highlighted-text-with-an-element

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

// Ref för att auto incrementera ID
const refId = ref(0);

function makeComment() {
  let id = `id${refId.value}`;
  // increment ID
  refId.value++;
  const selection = window.getSelection();
  if (!selection) {
    return;
  }

  const range = selection.getRangeAt(0).cloneRange();

  const commentEl = document.createElement("button");
  commentEl.classList.add("yellow", "btn-comment");
  commentEl.setAttribute("popovertarget", `${id}`);

  range.surroundContents(commentEl);
  selection.removeAllRanges();
  selection.addRange(range);

  // Create the actual popover element
  createPopoverElement(id);
}

function createPopoverElement(id) {
  // Create Popover:
  const popover = document.createElement("div");
  popover.setAttribute("popover", "manual");
  popover.classList.add("popover");
  popover.id = `${id}`;

  // Create Popover container
  const popContent = document.createElement("div");
  popContent.classList.add("popContent");

  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.innerText = "Close pop";
  closeBtn.addEventListener("click", () => {
    const pop = document.querySelector(`#${id}`);
    pop.hidePopover();
  });

  popContent.appendChild(closeBtn);
  popover.appendChild(popContent);
  document.body.appendChild(popover);

  addComment(id);
}

// Adds a Comment div
// Contains buttons and eventListeners
function addComment(id) {
  // Find popover
  const popover = document.querySelector(`#${id}`);
  const popOverContainer = popover.firstChild;
  console.log(popOverContainer);

  // Build comment content
  const comment = document.createElement("div");
  comment.classList.add("comment");
  const label = document.createElement("p");
  label.innerText = "Comment created by: User";
  const created = document.createElement("p");
  created.innerText = "Comment created: date";
  const textarea = document.createElement("textarea");
  textarea.setAttribute("required", "true");

  // Add new comment
  const addComBtn = document.createElement("button");
  addComBtn.innerText = "Add Comment";
  addComBtn.addEventListener("click", () => {
    textarea.setAttribute("readonly", "true");
    addComment(id);
  });

  // Resolve comment
  const delComBtn = document.createElement("button");
  delComBtn.innerText = "Resolve Comment";
  delComBtn.addEventListener("click", () => {
    resolveComment(comment);
    delComBtn.removeEventListener("click", resolveComment);
  });

  // Add content to comment container
  comment.appendChild(label);
  comment.appendChild(created);
  comment.appendChild(textarea);
  comment.appendChild(addComBtn);
  comment.appendChild(delComBtn);

  // Add comment container to the popover element
  popOverContainer.appendChild(comment);
}

// Resolve comment
function resolveComment(comment) {
  const p = document.createElement("p");
  p.innerText = "Resolved at: <date>";
  comment.insertBefore(p, comment.childNodes[2]);
  console.log("doc saved in DB");
  comment.setAttribute("disabled", "true");
}
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

.popContent {
  background-color: red;
  border: 2px solid var(--color-border);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 2px;
  overflow-y: auto;
  max-height: 400px;
}

.popover {
  /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning ? */
  position: absolute;
  z-index: 999;
  margin: auto auto;
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
