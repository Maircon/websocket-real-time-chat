export class MeController {
  constructor({ getMeInformationUseCase }) {
    this.useCase = getMeInformationUseCase
  }
  
  exec (req, res) {
    const {
      token
    } = req.body
    const user = this.useCase.exec({ token })
    res.send(user)
  }
}
