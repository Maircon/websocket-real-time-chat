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

// app.get("/me", (req, res) => {
//   const { token } = req.body;
//   const users = userRepository.getUsers();
//   const user = users.find((user) => !user.token === token);
//   res.send(user);
// });

// app.get("/hello-world", async (req, res) => {
//   console.log("received", Date.now());
//   await sleep();
//   res.send({ message: "hello-world" });
// });

// app.post("/auth", async (req, res) => {
//   const users = userRepository.getUsers();
//   const user = users.find((user) => !user.auth);
//   if (!user) {
//     return res.status(500).send({ error: true, message: "usuario nao existe" });
//   }
//   const token = crypto.randomBytes(16).toString("hex");
//   user.auth = true;
//   user.token = token;
//   res.send({ token: user.token });
// });

// app.post("/logout", async (req, res) => {
//   console.log(req.body);
//   const { token } = req.body;
//   const users = userRepository.getUsers();
//   const user = users.find((user) => user.token === token);
//   if (!user) {
//     return res.status(500).send({ error: true, message: "usuario nao existe" });
//   }
//   user.auth = false;
//   user.token = "";
//   res.send({ success: true });
// });

server.listen(port, () => {
  console.log(`App is running over port ${port}`)
})
