<script setup lang="ts">
/**
 * DocItem only Displays a documents content
 * Use DocItem to render all Documents
 */

const props = defineProps<{
  doc: {
    _id: string;
    title: string;
    content: string;
    collaborators: Array<string>;
    author: string;
    type: string;
  };
  // If a document is shared by another user, sharedBy = author
  isShared: false;
}>();
</script>

<template>
  <div class="item">
    <div class="item-container">
      <img
        v-if="props.doc.type === 'text'"
        alt="Text Document logo"
        class="logo doctype"
        src="@/assets/text.png"
        width="75"
        height="75"
      />
      <img v-else alt="Code document" class="logo" src="@/assets/code.png" width="75" height="75" />
      <div>
        <h3 id="title">{{ props.doc.title }}</h3>
      </div>
    </div>

    <!--<p id="content">{{ props.doc.content }}</p>
    <p class="id" id="id">{{ props.doc._id }}</p>-->
    <div v-if="!props.isShared">
      <div v-if="props.doc.collaborators">
        <h3>Dokument delas med:</h3>
        <ul>
          <li v-for="collab in props.doc.collaborators">{{ collab }}</li>
        </ul>
      </div>
    </div>
    <div v-if="props.isShared">
      <h3>Dokument delas av:</h3>
      <p>{{ props.doc.author }}</p>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
  width: 500px;
  min-width: 0;
  margin-top: 2rem;
  align-items: flex-start;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

h3 {
  margin-left: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

p {
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
}

.id {
  font-size: 0.8rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 4);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}

.item-container {
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
}

.doctype {
  display: inline-block;
}
</style>
