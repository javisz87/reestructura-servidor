import { Router } from "express";
import { postUsuarios } from "../../controllers/api/users/controller.post.users.js";
import { getUsersController } from "../../controllers/api/users/controller.getusers.js";
import { authJwtApi } from "../../mid/authentication.js";
// import { soloRol } from "../../mid/authorization.js";

export const appUsers = Router();

appUsers.post("/", postUsuarios);
// appUsers.get("/", authJwtApi, soloRol("super-admin"), getUsersController);
// appUsers.get("/", authJwtApi, soloRol("admin"), getUsersController);
appUsers.get("/", authJwtApi, /*soloRol("admin"),*/ getUsersController);
