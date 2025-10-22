import { User } from "./UserComposable.js";

const strptime = Date.now();
const date = new Date(strptime).toString();
const splitDate = date.split(" ").slice(0, -5).join(" ");

const comments = {
    makeComment: function makeComment(documentData, id) {
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
        this.createPopoverElement(documentData, id);
    },

    createPopoverElement: function createPopoverElement(documentData, id) {
        // Create Popover:
        const popover = document.createElement("div");
        popover.setAttribute("popover", "manual");
        // popover.setAttribute("draggable", "true");
        popover.classList.add("popover");
        popover.id = `pop${id}`;

        // Create Popover container
        const popContent = document.createElement("div");
        popContent.classList.add("popContent");

        // Close button
        const closeBtn = document.createElement("button");
        closeBtn.innerText = "Close pop";
        closeBtn.classList.add("close-btn");
        closeBtn.classList.add("btn");
        closeBtn.id = `close-btn-${id}`;

        closeBtn.addEventListener("click", () => {
            const pop = document.querySelector(`#pop${id}`);
            pop.hidePopover();
            documentData.value.comments.push({
                id: id,
                content: popover?.innerHTML,
            });
            // Manually throw input event after comment
            // this will update documentData.value even if no manual
            // input is made
            const event = new Event("input", { bubbles: true });
            const editor = document.getElementById(`editor`);
            editor?.dispatchEvent(event);
        });
        popContent.appendChild(closeBtn);
        popover.appendChild(popContent);
        let popoverContainer = document.getElementById("popoverContainer");
        if (!popoverContainer) {
            popoverContainer = document.createElement("div");
            popoverContainer.id = "popoverContainer";
            document.body.appendChild(popoverContainer);
        }
        popoverContainer.appendChild(popover);

        this.addComment(id);
    },

    // Adds a Comment div
    // Contains buttons and eventListeners
    addComment: function addComment(id) {
        // Find popover
        const popover = document.querySelector(`#pop${id}`);
        const popoverWrapper = popover.firstChild;

        // Build comment content
        const comment = document.createElement("div");
        comment.classList.add("comment");
        const label = document.createElement("p");
        label.innerText = `Comment created by: ${User.user}`;
        const created = document.createElement("p");
        created.innerText = `Comment created: ${splitDate}`;
        const commentOutput = document.createElement("div");
        commentOutput.setAttribute("id", `commentOutput-${id}`);
        const textarea = document.createElement("textarea");
        textarea.classList.add("comment-textarea");
        textarea.setAttribute("required", "true");

        // Add new comment
        const btnContainer = document.createElement("div");
        btnContainer.classList.add("btn-container");
        const addComBtn = document.createElement("button");
        addComBtn.classList.add("btn");
        addComBtn.classList.add("add-btn");
        addComBtn.innerText = "Add Comment";
        addComBtn.addEventListener("click", () => {
            const p = document.createElement("p");
            p.innerText = textarea.value;
            textarea.value = "";
            commentOutput.appendChild(p);
        });

        // Resolve comment
        const resolveComBtn = document.createElement("button");
        resolveComBtn.classList.add("btn");
        resolveComBtn.classList.add("resolve-btn");
        resolveComBtn.innerText = "Resolve Comment";
        resolveComBtn.addEventListener("click", () => {
            const p = document.createElement("p");
            p.innerText = `Resolved at: ${splitDate}`;
            comment.insertBefore(p, comment.childNodes[3]);
            resolveComBtn.setAttribute("disabled", "true");
            addComBtn.setAttribute("disabled", "true");
            textarea.setAttribute("disabled", "true");
        });

        // Add btn to btnContainer
        btnContainer.appendChild(addComBtn);
        btnContainer.appendChild(resolveComBtn);

        // Add content to comment container
        comment.appendChild(label);
        comment.appendChild(created);
        comment.appendChild(commentOutput);
        comment.appendChild(textarea);
        comment.appendChild(btnContainer);

        // Add comment container to the popover element
        popoverWrapper.appendChild(comment);
    },
};

export default comments;
