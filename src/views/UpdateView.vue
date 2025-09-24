<script setup lang="ts">
import { onMounted, ref } from "vue";
import { API } from '../config/config.js';
import UpdateItem from '../components/UpdateItem.vue';
// import { useRoute } from 'vue-router';
// const route = useRoute();
// console.log(route.props);

const props = defineProps({
  id: String
})

// console.log('props: ', props);
// console.log('id: ', props.id);

const documentData = ref(null);

/**
 * Fetch document to update
 */
async function getDocument(id) {
  const res = await fetch(`${API}/document/${id}`);
  documentData.value = await res.json();
}

onMounted( async () => await getDocument(props.id));

</script>

<template>

  <div class="update">
    <p>id: {{ id }}</p>
    <h1>Update document</h1>
    <!-- <input type="text" :value="document.title">
    <textarea :value="document.content"></textarea> -->
    <div v-if="documentData">
      <UpdateItem :data="documentData" />
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
