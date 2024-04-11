import { Router } from "express";
import * as sesionesController from "../../controllers/api/session/controller.session.js";
import {
  authGithub,
  anthGithub_CB,
  authLocal,
  authJwtApi,
} from "../../mid/authentication.js";
import { getCurrentSessionController } from "../../controllers/api/session/controller.session.js";
import { soloRol } from "../../mid/authorization.js";

export const sessionRouter = Router();

//session local
sessionRouter.post("/", authLocal, sesionesController.postSesiones);

//git session
sessionRouter.get("/git", authGithub);
// sessionRouter.get("/gitcall", anthGithub_CB, (req, res, next) => {
sessionRouter.get("/githubcallback", anthGithub_CB, (req, res, next) => {
  res.redirect("/products?limit=10&page=1");
});

//logout
sessionRouter.delete("/", sesionesController.deleteSesiones);

// datos de sesion, para testear!
sessionRouter.get(
  "/current",
  authJwtApi,
  getCurrentSessionController
);
