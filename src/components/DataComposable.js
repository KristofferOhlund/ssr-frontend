// <!--<template>
//   <slot :data="data" :loading="loading"></slot>
// </template>-->

// <script setup>
import { ref, reactive } from "vue";
import { API } from "../config/config.js";

const allDocs = reactive({
  data: [],
});

const loading = ref(false);

const fetchDocuments = async () => {
  console.log("fetching documents...");
  loading.value = true;

  const response = await fetch(API);
  const responseData = await response.json();

  allDocs.data = responseData;

  loading.value = false;
};

// const singleDoc = reactive({
//   data: [],
// });

// CRUD OPERATIONS

const dataCalls = {
  /**
   * Get all Documents
   * @returns Object, loading
   */
  getAllDocs: function getAllDocs() {
    fetchDocuments();

    return {
      allDocs,
      loading,
    };
  },

  /**
   * Get Single Document
   * @param {*} docId
   * @returns
   */
  getOneDoc: function getOneDoc(docId) {
    const id = docId;

    const loading = ref(false);

    const fetchDocument = async (id) => {
      loading.value = true;

      try {
        const response = await fetch(`${API}/document/${id}`);
        const responseData = await response.json();

        loading.value = false;
        if (responseData) {
          singleDoc.data = [responseData];
        } else {
          singleDoc.data = null;
        }
      } catch (error) {
        return { error, loading };
      }
    };

    fetchDocument(id);

    return {
      singleDoc,
      singleLoading,
    };
  },

  /**
   * Delete document
   */
  deleteOne: function deleteOne(docId) {
    const id = docId;

    const loading = ref(false);

    const fetchDocuments = async (id) => {
      loading.value = true;

      try {
        const response = await fetch(`${API}/document/`, {
          body: JSON.stringify({ id: `${id}` }),
          headers: {
            "content-type": "application/json",
          },
          method: "DELETE",
        });

        const responseData = await response.json();

        loading.value = false;

        // if (responseData) {
        //   return await this.getDocs();
        // } else {
        //   // data.doc = null;
        // }
        return responseData;
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments(id);

    // return {
    //   data, loading
    // };
  },
};

// </script >
export { allDocs, loading, fetchDocuments, dataCalls };
