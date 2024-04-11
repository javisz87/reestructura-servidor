import { cm } from "../../../dao/cart.manager.fs.js";
import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import { cmg } from "../../../dao/cart.manager.mg.js";

export async function delPrdInCart(req, res, next) {
  try {
    await pmg.getProductById(req.params.pid);
  } catch (error) {
    return next(error);
  }
  try {
    const deleter = await cmg.delProductInCart(req.params.cid, req.params.pid);
    res.status(200).json(deleter);
  } catch (error) {
    return next(error);
  }
}
