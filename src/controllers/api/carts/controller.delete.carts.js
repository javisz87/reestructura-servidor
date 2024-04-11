import { cm } from "../../../dao/cart.manager.fs.js";
import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import { cmg } from "../../../dao/cart.manager.mg.js";

export async function deleteAllPrdCart(req, res, next) {
  try {
    const deleter = await cmg.delAllProductsInCart(req.params.cid);
    res.json(deleter);
  } catch (error) {
    return next(error);
  }
}
