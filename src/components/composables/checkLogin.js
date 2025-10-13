import { User } from "./UserComposable.js";
import router from "../../router/index.ts";

/**
 * Check if a user is logged in,
 * else redirect to loginPage
 * 
 * Use as composable to keep code DRY
 */
export default function checkLogin() {
    if (!User.isLoggedIn) {
        router.push({ name: "login" });
    }
}