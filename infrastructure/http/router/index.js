import { authControllerFactory, helloWorldControllerFactory, LogoutControllerFactory, meControllerFactory } from "../../../factory/controller/index.js";

export const initializeRoutes = (app) => {
  app.get("/me", meControllerFactory())
  app.get("/hello-world", helloWorldControllerFactory());
  app.post("/auth", authControllerFactory());
  app.post("/logout", LogoutControllerFactory());
}
