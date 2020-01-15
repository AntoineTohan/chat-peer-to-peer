const express = require("express");
const socketIO = require("socket.io");
const networkFinder = require("./networkFinder");

const app = express();

app.get("/", (req, res) => {
  res.send("");
});

app.get("/localNetwork", async (req, res) => {
  const response = JSON.stringify(await networkFinder.findAllLocalMachine());
  res.json(response);
});

const server = app.listen(3001);
const io = socketIO(server, { serveClient: false });

let allClient = [];

function addClient(newClient) {
  if (allClient.length === 0) {
    allClient.push(newClient);
  }
  allClient.map(client => {
    if (client.id === newClient.id) {
    } else {
      allClient.push(newClient);
    }
  });
}

function supressClient(supClient) {
  allClient.map(client => {
    if (client.id === supClient.id) {
      allClient = allClient.filter(c => c.id !== client.id);
    }
  });
}

io.on("connection", socket => {
  console.log(`new user connected from: ${socket.handshake.address}`);
  socket.on("message", messageContent => {
    io.emit("message", messageContent);
  });

  socket.on("identify", identify => {
    addClient(identify);
    io.emit("identify", allClient);
  });

  socket.on("disconnectChatroom", disconnect => {
    supressClient(disconnect);
    io.emit("identify", allClient);
    socket.disconnect();
  });
});
