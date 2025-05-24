export class LeaveRoomHandler {
  constructor({ socket, logService }) {
    this.socket = socket
    this.logService = logService
  }

  leaveRoom ({ roomId }) {
    this.socket.join(roomId)
    this.logService.log({
      event: "leaveRoom",
      user: this.socket.handshake.auth.user.name,
      roomId,
      joinedRooms: this.socket.rooms,
    });
  }

  exec () {
    return this.leaveRoom.bind(this)
  }
}
