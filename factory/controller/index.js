import { AuthUseCase, GetMeInformationUseCase, LogoutUseCase } from '../../application/use-cases/index.js'
import { HashProvider } from '../../infrastructure/provider/hash.js'
import { AuthController, HelloWorldController, MeController } from '../../interface/controller/index.js'
import { UserRepository } from '../../repository/user.js'
const userRepository = new UserRepository()

export const authControllerFactory = () => {
  const hashProvider = new HashProvider()
  const authUseCase = new AuthUseCase({ userRepository, hashProvider })
  const authController = new AuthController({
    authUseCase
  })
  return authController.login.bind(authController)
}

export const meControllerFactory = () => {
  const getMeInformationUseCase = new GetMeInformationUseCase({ userRepository })
  const meController = new MeController({ getMeInformationUseCase })
  return meController.exec.bind(meController)
}

export const helloWorldControllerFactory = () => {
  const helloWorldController = new HelloWorldController()
  return helloWorldController.exec.bind(helloWorldController)
}

export const LogoutControllerFactory = () => {
  const logoutUseCase = new LogoutUseCase({
    userRepository
  })
  const authController = new AuthController({
    logoutUseCase
  })
  return authController.logout.bind(authController)
}
