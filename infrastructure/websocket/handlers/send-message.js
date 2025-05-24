export class SendMessageHandler {
  constructor({ socket, globalSocket, logService }) {
    this.socket = socket
    this.logService = logService
    this.globalSocket = globalSocket
  }

  secureProps (user) {
    return {
      id: user.id,
      avatarUrl: user.avatarUrl,
      name: user.name,
      meta: user.meta,
    }
  }

  sendMessage ({ roomId, text }) {
    this.logService.log({
      user: this.socket.handshake.auth.user.name,
      message: text,
    });
    this.globalSocket.to(roomId).emit('message', {
      message: text,
      user: this.secureProps(this.socket.handshake.auth.user)
    })
  }

  exec () {
    return this.sendMessage.bind(this)
  }
}