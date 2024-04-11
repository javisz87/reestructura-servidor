import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";

export async function getProductController  (req, res, next)  {
  try {
    const producto = await pmg.getProductById(req.params.pid);
    res.json(producto);
  } catch (error) {
    next(error);
  }
};
