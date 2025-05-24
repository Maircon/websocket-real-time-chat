export class AuthUseCase {
  constructor({ userRepository, hashProvider }) {
    this.hashProvider = hashProvider
    this.userRepository = userRepository
  }

  exec () {
    const users = this.userRepository.getUsers();
    const user = users.find((user) => !user.auth);
    if (!user) {
      return res.status(500).send({ error: true, message: "usuario nao existe" });
    }
    const token = this.hashProvider.hash()
    user.auth = true;
    user.token = token;
    return user
  }
}