export class LogoutUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  exec ({ token }) {
    const users = this.userRepository.getUsers();
    const user = users.find((user) => user.token === token);
    if (!user) {
      throw new Error('user not found')
    }
    user.auth = false
    user.token = ""
    return user
  }
}