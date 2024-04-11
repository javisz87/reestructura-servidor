import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import { socketFn } from "../../../mid/soketio.rt.js";

export async function updateProduct(req, res, next) {
  let upd;
  try {
    upd = { ...req.body };
  } catch (error) {
    return next(error);
  }
  try {
    const actualizada = await pmg.updateProduct(req.params.pid, upd);
    await socketFn();
    res.json(actualizada);
  } catch (error) {
    next(error);
  }
}
