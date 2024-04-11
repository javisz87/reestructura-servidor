import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";
import { socketFn } from "../../../mid/soketio.rt.js";

export async function deleteProduct(req, res, next) {
  try {
    await pmg.deleteProduct(req.params.pid);
    await socketFn();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
}
