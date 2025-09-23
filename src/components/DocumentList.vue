<script setup lang="ts">
  import DocumentItem from './DocumentItem.vue';
  import DocumentationIcon from './icons/IconDocumentation.vue';
  import { ref, onMounted } from 'vue';

const API = 'http://localhost:1337/';

const allDocuments = ref( [{"title": "Loading files..."}] );

// onMounted
onMounted(async () => {
  const res = await fetch(API);
  allDocuments.value = await res.json();
})

// watchEffect(async () => {
//   const res = await fetch(API);
//   allDocuments.value = await res.json();
//   // console.log('res: ', res);
//   // console.log('allDocuments: ', allDocuments);
//   // console.log('allDocuments: ', allDocuments.value);
// })
</script>

<template>
  <!-- <div v-if="allDocuments.length > 0"> -->
    <div  v-for="{title, content, _id} in allDocuments" :key="_id">
      <DocumentItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading><a :href="`document/${_id}`">{{ title }}</a></template>
        {{ content }}
      </DocumentItem>
    </div>
  <!-- </div> -->
</template>
