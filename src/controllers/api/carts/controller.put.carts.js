import { cm } from "../../../dao/cart.manager.fs.js";
import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import { cmg } from "../../../dao/cart.manager.mg.js";

export async function putCart(req, res, next) {
  try {
    const productosEnCarro = await cmg.updateCart(req.params.cid, req.body);
    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
}
