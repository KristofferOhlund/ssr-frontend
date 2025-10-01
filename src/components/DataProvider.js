// <!--<template>
//   <slot :data="data" :loading="loading"></slot>
// </template>-->

// <script setup>
import { ref, reactive } from "vue";
import { API } from "../config/config.js";

const dataCalls = {
  /**
   * Get all Documents
   * @returns Object, loading
   */
  getDocs: function getDocuments() {
    const data = reactive({
      doc: [
        // {
        //   _id: null,
        //   title: null,
        //   content: null,
        // },
      ],
    });

    const loading = ref(false);

    const fetchDocuments = async () => {
      loading.value = true;

      const response = await fetch(API);
      const responseData = await response.json();

      data.doc = responseData;

      loading.value = false;
    };

    fetchDocuments();

    return {
      data,
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
    const data = reactive({
      doc: [],
    });

    const loading = ref(false);

    const fetchDocuments = async (id) => {
      loading.value = true;

      try {
        const response = await fetch(`${API}/document/${id}`);
        const responseData = await response.json();

        loading.value = false;
        if (responseData) {
          data.doc = [responseData];
        } else data.doc = null;
      } catch (error) {
        return { error, loading };
      }
    };

    fetchDocuments(id);

    return {
      data,
      loading,
    };
  },

  /**
   * Delete document
   */
  deleteOne: function deleteOne(docId) {
    const id = docId;
    // const data = reactive({
    //   doc: [],
    // });

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

        if (responseData) {
          return await this.getDocs();
        } else {
          // data.doc = null;
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments(id);

    // return {
    //   data, loading
    // };
  },

  /**
   * Alternative function
   * @returns Get all documents
   */
  getAll: async function getAll() {
    const loading = ref(false);

    loading.value = true;

    const response = await fetch(API);
    const responseData = await response.json();

    let data = this.getData(responseData);
    // return (this.getData(responseData));

    loading.value = false;

    return { data, loading };
  },

  /**
   * Reuse method to make code more dry
   * @param {json} responseData parsed data from fetch
   */
  getData: function getData(responseData) {
    // const loading = ref(false);

    // loading.value = true;
    const data = reactive({
      doc: [
        {
          _id: null,
          title: null,
          content: null,
        },
      ],
    });

    // loading.value = false;
    data.doc = responseData;

    return data;
  },
};

// </script >
export default dataCalls;
