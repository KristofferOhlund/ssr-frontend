<script>
import { socket } from "./socket/socket.js";

export default {
  name: "ConnectionManager",

  methods: {
    connect() {
      console.log("connect to socket from manager");
      socket.connect();
    },
    disconnect() {
      socket.disconnect();
    },
  },
};
</script>

<template>
  <button @click="connect()">Connect</button>
  <button @click="disconnect()">Disconnect</button>
</template>
