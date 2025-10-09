import { ref, reactive } from "vue";
import { API } from "../../config/config.js";


export const User = ref({
    isLoggedIn: true,
    token: "",
    docs: []
});

// export default const User = {
//     login: async function login(userObject) {
//         const user = {
//             ...userObject
//         };

//         try {
//             const response = await fetch(`${API}/login`, {
//                 body: JSON.stringify(user),
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 method: 'POST'
//             });

//             if (response.status === 200) {
//                 const result = await response.json();
//                 console.log(result);

//                 if (result.data?.type === "success") {
//                     auth.token = result.data.token;
//                     loggedIn = true;
//                     console.log("DU har loggat in")
//                     return "ok";
//                 }
//             }

//             return "not ok";
//         } catch (error) {
//             console.error(error);
//         }
//     },

//     register: async function register(userObject) {
//         const user = {
//             ...userObject
//         };

//         try {
//             const response = await fetch(`${API}/login`, {
//                 body: JSON.stringify(user),
//                 headers: {
//                     'content-type': 'application/json'
//                 },
//                 method: 'POST'
//             });

//             if (response.status === 200) {
//                 const result = await response.json();
//                 console.log(result);

//                 if (result.data?.type === "success") {
//                     auth.token = result.data.token;
//                     loggedIn = true;
//                     console.log("DU har loggat in")
//                     return "ok";
//                 }
//             }

//             return "not ok";
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }
