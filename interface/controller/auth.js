export class AuthController {
  constructor({ authUseCase, logoutUseCase }) {
    this.authUseCase = authUseCase
    this.logoutUseCase = logoutUseCase
  }

  login (req, res) {
    const user = this.authUseCase.exec()
    res.send({ token: user.token });
  }

  async logout (req, res) {
    const { token } = req.body;
    await this.logoutUseCase.exec({ token })
    try {
      res.send({ success: true })
    } catch (err) {
      res.status(500).send({ message: err.message })
    }
  }
}