import { User } from "./userComposable.js";

const strptime = Date.now();
const date = new Date(strptime).toString();
const splitDate = date.split(" ").slice(0, -5).join(" ");

const comments = {
  makeComment: function makeComment(id) {
    const selection = window.getSelection();
    if (!selection) {
      return;
    }

    const range = selection.getRangeAt(0).cloneRange();

    const commentEl = document.createElement("button");
    commentEl.classList.add("yellow", "btn-comment");
    commentEl.setAttribute("popovertarget", `pop${id}`);

    range.surroundContents(commentEl);
    selection.removeAllRanges();
    selection.addRange(range);

    // Create the actual popover element
    this.createPopoverElement(id);
  },

  createPopoverElement: function createPopoverElement(id) {
    console.log("Creating popover...");
    // Create Popover:
    const popover = document.createElement("div");
    popover.setAttribute("popover", "manual");
    popover.classList.add("popover");
    popover.id = `pop${id}`;

    // Create Popover container
    const popContent = document.createElement("div");
    popContent.classList.add("popContent");

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.innerText = "Close pop";
    // Instead of using event listener:
    closeBtn.setAttribute("popovertarget", `pop${id}`);
    closeBtn.setAttribute("popovertargetaction", "hide");
    // Using attributes keeps them klickable when created by inserting innerHTML

    // closeBtn.addEventListener("click", () => {
    //   const pop = document.querySelector(`#pop${id}`);
    //   pop.hidePopover();
    // });

    popContent.appendChild(closeBtn);
    popover.appendChild(popContent);
    document.body.appendChild(popover);

    this.addComment(id);
  },

  // Adds a Comment div
  // Contains buttons and eventListeners
  addComment: function addComment(id) {
    // Find popover
    const popover = document.querySelector(`#pop${id}`);
    const popOverContainer = popover.firstChild;

    // Build comment content
    const comment = document.createElement("div");
    comment.classList.add("comment");
    const label = document.createElement("p");
    label.innerText = `Comment created by: ${User.user}`;
    const created = document.createElement("p");
    created.innerText = `Comment created: ${splitDate}`;
    const textarea = document.createElement("textarea");
    textarea.setAttribute("required", "true");

    // Add new comment
    const addComBtn = document.createElement("button");
    addComBtn.innerText = "Add Comment";
    addComBtn.addEventListener("click", () => {
      textarea.setAttribute("readonly", "true");
      addComment(id);
      addComBtn.setAttribute("disabled", "true");
    });

    // Resolve comment
    const resolveComBtn = document.createElement("button");
    resolveComBtn.innerText = "Resolve Comment";
    resolveComBtn.addEventListener("click", () => {
      const p = document.createElement("p");
      p.innerText = `Resolved at: ${splitDate}`;
      comment.insertBefore(p, comment.childNodes[2]);
      resolveComBtn.setAttribute("disabled", "true");
    });

    // Add content to comment container
    comment.appendChild(label);
    comment.appendChild(created);
    comment.appendChild(textarea);
    comment.appendChild(addComBtn);
    comment.appendChild(resolveComBtn);

    // Add comment container to the popover element
    popOverContainer.appendChild(comment);
  },
};

export default comments;
