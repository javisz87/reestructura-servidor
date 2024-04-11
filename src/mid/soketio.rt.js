import { io } from "../app/server.js";
import { pmg } from "../dao/product.manager.mg.js";
import { pm } from "../dao/product.manager.fs.js";

export async function socketFn(req, res, next) {
  const products = await pmg.getProducts();
  io.emit("reloadProducts", {
    list: products,
    listOk: products.length > 0,
  });
}
