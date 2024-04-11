import express from "express";
import { Router } from "express";
import { appProducts } from "./router.products.js";
import { appCarts } from "./router.carts.js";
import { appUsers } from "./router.users.js";
import { sessionRouter } from "./router.session.js";

export const apiRouter = Router();

apiRouter.use(express.json());
apiRouter.use(express.urlencoded({ extended: true }));

apiRouter.use("/products", appProducts);
apiRouter.use("/carts", appCarts);
apiRouter.use("/users", appUsers);
apiRouter.use("/sessions", sessionRouter);
