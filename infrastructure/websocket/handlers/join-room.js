export class JoinRoomHandler {
  constructor({ socket, logService }) {
    this.socket = socket
    this.logService = logService
  }

  joinRoom ({ roomId }) {
    console.log('dotinha')
    console.log(this.socket)
    this.socket.join(roomId)
    this.logService.log({
      event: "joinRoom",
      user: this.socket.handshake.auth.user.name,
      roomId,
      joinedRooms: this.socket.rooms,
    });
  }

  exec () {
    return this.joinRoom.bind(this)
  }
}