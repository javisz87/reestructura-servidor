import express from "express";
import { Router } from "express";
import { postCart } from "../../controllers/api/carts/controller.post.cart.js";
import { getCart } from "../../controllers/api/carts/controller.get.carts.js";
import { postPdrInCart } from "../../controllers/api/carts/controller.postprd.carts.js";
import { delPrdInCart } from "../../controllers/api/carts/controller.deleteprd.carts.js";
import { putCart } from "../../controllers/api/carts/controller.put.carts.js";
import { putPrdCart } from "../../controllers/api/carts/controller.putprd.carts.js";
import { deleteAllPrdCart } from "../../controllers/api/carts/controller.delete.carts.js";
import { soloRol } from "../../mid/authorization.js";

export const appCarts = Router();
appCarts.use(express.json());
appCarts.use(express.urlencoded({ extended: true }));


//creo un carrito
appCarts.post("/", postCart);

//muestro un carrito
appCarts.get("/:cid", getCart);

//le cargo productos al carrito con su cantidad
appCarts.post("/:cid/product/:pid", postPdrInCart);

//elimino un producto de un carrito
appCarts.delete("/:cid/product/:pid", delPrdInCart);

//actualizo un carrito
appCarts.put("/:cid", putCart);

//actualizo la cantidad de un producto en un carrito
appCarts.put("/:cid/product/:pid", putPrdCart);

//elimino todos los productos de un carrito
appCarts.delete("/:cid", deleteAllPrdCart);
