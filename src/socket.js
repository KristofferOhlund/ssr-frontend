import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  messages: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";
const URL = "http://localhost:3000";

export const socket = io(URL);

// // The socket object can also be initialized without connecting right away with the autoConnect option:
// // This can be useful for example when the user must provide some credentials before connecting.
// export const socket = io(URL, {
//   autoConnect: false
// });

socket.on("connect", () => {
  console.log("connecting to socket");
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("chat message", (...args) => {
  console.log("chat mess", ...args);
  state.messages.push(args);
});

socket.on("bar", (...args) => {
  state.barEvents.push(args);
});
