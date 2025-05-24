import { UserRepository } from "../repository/user.js";
const userRepository = new UserRepository();

export default function socketHandShakeAuth(socket, next) {
  const token = socket.handshake.auth.token;
  const users = userRepository.getUsers();
  const user = users.find((user) => user.token === token);
  if (!user) {
    return next(new Error("Unauthorized"));
  }
  socket.handshake.auth.user = { ...user };
  next();
}
