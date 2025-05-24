import express from 'express'
import { createServer } from "node:http";
import cors from "cors";
import socketHandShakeAuth from "./middleware/socket-handshake-auth.js";
import { initWebSocket } from "./infrastructure/websocket/init-websocket.js";
import { initializeRoutes } from "./infrastructure/http/router/index.js";

const app = express();
const server = createServer(app);
const port = 3000;

const io = initWebSocket(server);

app.use(cors());
app.use(express.json());
io.use(socketHandShakeAuth);
initializeRoutes(app);

server.listen(port, () => {
  console.log(`App is running over port ${port}`)
})
