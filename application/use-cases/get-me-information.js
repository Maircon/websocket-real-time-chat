export class GetMeInformationUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository
  }

  exec ({ token }) {
    const users = this.userRepository.getUsers()
    const user = users.find((user) => !user.token === token)
    return user
  }
}