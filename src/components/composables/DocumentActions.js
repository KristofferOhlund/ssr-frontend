import router from "../../router/index.ts";
import { API } from "../../config/config.js";
import { User } from "./UserComposable.js";

/**
 * Module for handling Documents
 */
const DocActions = {
  /**
   * Fetch all Documents where user is
   * either Author or collaborator
   * @param {email} email - for current user
   */
  fetchDocuments: async function fetchDocuments(email) {
    try {
      const response = await fetch(`${API}/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": User.token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error on fetchDocuments! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("fetchDocuments error:", error);
      return [];
    }
  },

  /**
   * Get single Document
   * @param {id} string DocumentId
   */
  getDocument: async function getDocument(id) {
    try {
      const response = await fetch(`${API}/document/${id}`, {
        headers: {
          "x-access-token": User.token,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error on getDocument! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Create new Doc
   * @param {Object} document - to save in DB
   * All documents MUST have title, content, type
   * author is optional, equals User.user
   */
  createDocument: async function createDocument(document) {
    try {
      const response = await fetch(`${API}/document`, {
        body: JSON.stringify({
          title: `${document.title}`,
          content: `${document.content}`,
          author: `${User.user}`,
          type: `${document.type}`,
        }),
        headers: {
          "content-type": "application/json",
          "x-access-token": User.token,
        },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP error on createDocument! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Delete document with ID
   * @param {string} id
   */
  deleteDocument: async function deleteDocument(id) {
    try {
      const response = await fetch(`${API}/document/`, {
        body: JSON.stringify({ id: `${id}` }),
        headers: {
          "content-type": "application/json",
          "x-access-token": User.token,
        },
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP error on Delete! Status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Update document in database
   */
  updateDocument: async function updateDocument(documentData) {
    try {
      const response = await fetch(`${API}/document`, {
        body: JSON.stringify(documentData),
        headers: {
          "content-type": "application/json",
          "x-access-token": User.token,
        },
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error(`HTTP error on updateDocument! Status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Share document
   * @param {Object} mailBody - contains sender, reciever, message
   */
  shareDocument: async function shareDocument(mailBody) {
    try {
      const response = await fetch(`${API}/invite`, {
        body: JSON.stringify({
          docId: `${mailBody.docId}`,
          sender: `${mailBody.sender}`,
          reciever: `${mailBody.reciever}`,
          message: `${mailBody.message}`,
        }),
        headers: {
          "content-type": "application/json",
          "x-access-token": User.token,
        },
        method: "POST",
      });
      if (!response.ok) {
        throw new Error(`HTTP error on Share! Status: ${response.status}`);
      }
      let result = await response.json();
      result["success"] = true;
      return result;
    } catch (error) {
      console.log("Något gick fel.");
      console.log(error);
    }
  },

  /**
   * Execute Code
   */
  executeCode: async function executeCode(code) {
    // encode to base64 string
    var data = {
      code: btoa(`${code.value}`),
    };

    const response = await fetch("https://execjs.emilfolino.se/code", {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      throw new Error(`HTTP error on executeCode! Status: ${response.status}`);
    }

    const result = await response.json();
    // Decode result
    return atob(result.data);
  },

  /**
   * GraphQL endpot for fetching all user Documents
   */
  fetchGraphQLDocuments: async function fetchGraphQLDocuments() {
    try {
      const response = await fetch(`${API}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": User.token,
        },
        body: JSON.stringify({
          query: `{
                        userDocuments(username: "${User.user}") {
                        authorDocs {
                            _id
                            author
                            collaborators
                            content
                            title
                            preview
                        }
                        collabDocs {
                            _id
                            author
                            collaborators
                            content
                            title
                            preview
                          }
                        }
                    } `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error on fetchDocuments! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("fetchDocuments error:", error);
      return [];
    }
  },

  /**
   * GraphQL endpot for fetching all user Documents
   */
  fetchOneGraphQLDocument: async function fetchOneGraphQLDocument(id) {
    try {
      const response = await fetch(`${API}/graphql`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": User.token,
        },
        body: JSON.stringify({
          query: `{
                        document(id: "${id}") {
                            _id
                            title
                            content
                            author
                            collaborators
                            type
                            comments {
                              id
                              content
                            }
                          }
                        } `,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error on fetchDocuments! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (error) {
      console.error("fetchDocuments error:", error);
      return [];
    }
  },
};

export default DocActions;
