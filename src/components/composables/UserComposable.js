import { ref, reactive } from "vue";
import { API } from "../../config/config.js";

// reactive updates all views using User object
export const User = reactive({
    isLoggedIn: false,
    username: "",
    email: "sample@gmail.com",
    token: "",
    docs: []
});
