import Carts from "../../../entidades/carts.js";
import { cm } from "../../../dao/cart.manager.fs.js";
import { cmg } from "../../../dao/cart.manager.mg.js";

export async function postCart(req, res, next) {
  try {
    const newcart = new Carts();
    const agregada = await cmg.addCart(newcart);
    res.json(agregada);
  } catch (error) {
    next(error);
  }
}
