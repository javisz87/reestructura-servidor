import { cm } from "../../../dao/cart.manager.fs.js";
import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import { cmg } from "../../../dao/cart.manager.mg.js";

export async function postPdrInCart (req, res, next)  {
  try {
    await pmg.getProductById(req.params.pid);
  } catch (error) {
    return next(error);
  }
  try {
    const product = await cmg.addProductInCart(
      req.params.cid,
      req.params.pid,
      Number(req.query.quantity) || 1
    );
    res.json(product);
  } catch (error) {
    next(error);
  }
};
