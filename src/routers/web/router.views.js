import { Router } from "express";
import {
  cartView,
  loginView,
  newProductView,
  productView,
  regisView,
} from "../../controllers/views/controller.all.views.js";
import { authJwtView } from "../../mid/authentication.js";
import { soloRol } from "../../mid/authorization.js";

export const viewsRouter = Router();

viewsRouter.get("/", (req, res, next) => {
  res.redirect("/login");
});

viewsRouter.get("/newproducts", authJwtView, /*soloRol("admin"),*/ newProductView);

//vistas de productos paginado
// TODO falta ver como hacer para que siempre aparezca en mi url page como req (ver como redirigir)
viewsRouter.get("/products", authJwtView, productView);

//vista de carritos
viewsRouter.get("/carts/:cid", authJwtView, cartView);

//Login
viewsRouter.get("/login", loginView);

//Register
viewsRouter.get("/register", regisView);
