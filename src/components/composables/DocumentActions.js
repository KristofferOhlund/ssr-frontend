import router from "../../router/index.ts";
import { API } from "../../config/config.js";
import { dataCalls } from "./DataComposable.js";

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
    },

    // Share document to user
    shareDocument: async function shareDocument(mailBody) {
        try {
            await fetch(`${API}/document/${mailBody.docId}/invite`, {
                body: JSON.stringify(`${mailBody}`),
                headers: {
                    "content-type": "application/json",
                },
                method: "POST",
            });
        }
        catch (error) {
            console.log("Något gick fel.");
            console.log(error);
        }
    }
}

export default DocActions;