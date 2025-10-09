import router from "../../router/index.ts";

/**
 * Module for handling Documents
 */
const DocActions = {
    // Delete Document
    deleteDocument: async function deleteDocument(id) {
        console.log(id);
        await dataCalls.deleteOne(id);

        fetchDocuments();
    },

    // Redirect to update document
    updateDocument: async function updateDocument(id) {
        router.push({
            name: "update",
            params: {
                id: id,
            },
        });
    }
}

export default DocActions;