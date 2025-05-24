export class DisconnectHandler {
  constructor({ socket, logService }) {
    this.socket = socket
    this.logService = logService
  }

  disconnect () {
    this.logService.log({ message: 'client has disconnected' })
  }

  exec () {
    return this.disconnect.bind(this)
  }
}