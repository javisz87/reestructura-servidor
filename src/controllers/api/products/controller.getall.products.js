import { pm } from "../../../dao/product.manager.fs.js";
import { pmg } from "../../../dao/product.manager.mg.js";

export async function getProductsController(req, res, next) {
  try {
    const urlsrt = `http://localhost:8080${req.originalUrl}`;
    const result = await pmg.getPagProducts(req.query, urlsrt);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
