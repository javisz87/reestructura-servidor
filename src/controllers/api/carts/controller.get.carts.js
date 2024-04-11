import { cm } from "../../../dao/cart.manager.fs.js";
import { cmg } from "../../../dao/cart.manager.mg.js";

export async function getCart(req, res, next) {
  try {
    const productosEnCarro = await cmg.getProductsInCartById(req.params.cid);
    res.json(productosEnCarro);
  } catch (error) {
    next(error);
  }
}
