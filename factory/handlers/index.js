import { DisconnectHandler, JoinRoomHandler, LeaveRoomHandler, SendMessageHandler } from '../../infrastructure/websocket/handlers/index.js'

const logService = {
  log(message) {
    console.log(message)
  }
}

export const joinRoomHandlerFactory = ({ socket }) => {
  const joinRoomHandler = new JoinRoomHandler({
    logService,
    socket
  })

  return joinRoomHandler.exec()
}

export const leaveRoomHandlerFactory = ({ socket }) => {
  const leaveRoomHandler = new LeaveRoomHandler({
    socket,
    logService
  })

  return leaveRoomHandler.exec()
}

export const disconnectHandlerFactory = ({ socket }) => {
  const disconnectHandler = new DisconnectHandler({
    socket,
    logService
  })

  return disconnectHandler.exec()
}

export const sendMessageHandlerFactory = ({ socket, globalSocket }) => {
  const sendMessageHandler = new SendMessageHandler({
    globalSocket,
    socket,
    logService
  })

  return sendMessageHandler.exec()
}
