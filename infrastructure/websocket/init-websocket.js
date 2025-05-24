import { Server } from 'socket.io'
import {
  disconnectHandlerFactory,
  joinRoomHandlerFactory,
  leaveRoomHandlerFactory,
  sendMessageHandlerFactory
} from '../../factory/handlers/index.js'

const registerHandlers = (socket, io) => {
  socket.on('joinRoom', joinRoomHandlerFactory({ socket }))
  socket.on('leaveRoom', leaveRoomHandlerFactory({ socket }))
  socket.on('disconnect', disconnectHandlerFactory({ socket }))
  socket.on('message', sendMessageHandlerFactory({ socket, globalSocket: io }))
}

export function initWebSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on('connection', (socket) => registerHandlers(socket, io))
  return io
}
