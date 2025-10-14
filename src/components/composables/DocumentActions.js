import router from "../../router/index.ts";
import { API } from "../../config/config.js";
import { dataCalls } from "./DataComposable.js";
import { User } from "./UserComposable.js";

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

    /**
    * Update document in database
    */
    updateDocument: async function updateDocument(documentData) {
        // console.log(documentData);
        await fetch(`${API}/document`, {
            body: JSON.stringify({
                id: `${documentData.value._id}`,
                title: `${documentData.value.title}`,
                content: `${documentData.value.content}`,
            }),
            headers: {
                "content-type": "application/json",
                "x-access-token": User.token,
            },
            method: "PUT",
        });

        /**
         * Redirect to all documents route
         */
        router.push("/documents");
    },

    // Share document to user
    shareDocument: async function shareDocument(mailBody) {
        try {
            await fetch(`${API}/document/${mailBody.docId}/invite`, {
                body: JSON.stringify(`${mailBody}`),
                headers: {
                    "content-type": "application/json",
                    "x-access-token": User.token,
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