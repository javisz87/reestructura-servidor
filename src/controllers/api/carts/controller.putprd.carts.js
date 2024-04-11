import { cm } from "../../../dao/cart.manager.fs.js";
import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import { cmg } from "../../../dao/cart.manager.mg.js";

export async function putPrdCart(req, res, next) {
  try {
    const prod = await pmg.getProductById(req.params.pid);
    try {
      // @ts-ignore
      if (prod?.stock < req.body.quantity) {
        throw new Error("Not Enough Stock");
      }
    } catch (error) {
      return next(error);
    }
  } catch (error) {
    return next(error);
  }
  try {
    const productupd = await cmg.updProductinCart(
      req.params.cid,
      req.params.pid,
      req.body
    );
    res.json(productupd);
  } catch (error) {
    next(error);
  }
}
