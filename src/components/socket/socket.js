import { reactive, watch } from "vue";
import { io } from "socket.io-client";
import { User } from "../composables/UserComposable.js";

export const state = reactive({
  connected: false,
  messages: [],
  barEvents: [],
});


watch(User, () => {
  if (User.token) {
    return setupSocketConnection();
  }
  destroySocketConnection()
})

let socket = null;

function setupSocketConnection() {
  // Porten måste vara densamma som socket i servern lyssnar på!
  // const URL = "http://localhost:3000";
  const URL = "https://jsramverk-sidr24.azurewebsites.net";


  socket = io(URL, {
    auth: {
      token: User.token
    }
  });

  console.log(User.token);

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

  socket.on("test", (mess) => {
    console.log(mess);
  });

}

function destroySocketConnection() {
  socket.close();
}

export { socket };