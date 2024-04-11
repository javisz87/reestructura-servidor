import mongoose from "mongoose";
import { SchemaCarts } from "./models/carts.schema.js";

export default class CartsMongoose {
  #cartsDb;
  constructor() {
    this.#cartsDb = mongoose.model("carts", SchemaCarts);
  }

  async addCart(cart) {
    const cartsave = await this.#cartsDb.create(cart);
    return cartsave;
  }

  async getProductsInCartById(id) {
    const cart = await this.#cartsDb.findById(id).lean();
    if (!cart) {
      throw new Error("Not Found");
    }
    return cart.products;
  }

  async addProductInCart(cid, pid, qt) {
    const products = await this.getProductsInCartById(cid);
    const serchprod = products.find(
      (p) => JSON.parse(JSON.stringify(p.product?._id)) === pid
    );
    if (!serchprod) {
      products.push({ product: pid, quantity: qt });
    } else {
      // @ts-ignore
      serchprod.quantity += qt
    }
    await this.#cartsDb.findByIdAndUpdate(cid, { products: products });
    return serchprod;
  }

  async delProductInCart(cid, pid) {
    const products = await this.getProductsInCartById(cid);
    const deleter = products.filter(
      (p) => JSON.parse(JSON.stringify(p.product?._id)) !== pid
    );
    await this.#cartsDb.findByIdAndUpdate(cid, { products: deleter });
    return deleter;
  }

  async updateCart(cid, updcart) {
    const cart = await this.#cartsDb.findById(cid).lean();
    if (!cart) {
      throw new Error("Not Found");
    }
    await this.#cartsDb.findByIdAndUpdate(cid, { products: { updcart } });
  }

  async updProductinCart(cid, pid, updquantity) {
    const products = await this.getProductsInCartById(cid);
    const serchprod = products.find(
      (p) => JSON.parse(JSON.stringify(p.product?._id)) === pid
    );
    if (!serchprod) {
      throw new Error("Not Found");
    }
    if (isNaN(updquantity.quantity) || updquantity.quantity < 0) {
      throw new Error("Invalid Quantity");
    }
    serchprod.quantity = updquantity.quantity;
    await this.#cartsDb.findByIdAndUpdate(cid, { products: products });
  }

  async delAllProductsInCart(cid) {
    let products = await this.getProductsInCartById(cid);
    products = [];
    await this.#cartsDb.findByIdAndUpdate(cid, { products: products });
    const cart = await this.#cartsDb.findById(cid).lean();
    return cart;
  }

  async deleteCart(cid) {
    const cart = await this.#cartsDb.findById(cid).lean();
    if (!cart) {
      throw new Error("Not Found");
    }
    await this.#cartsDb.findByIdAndRemove(cid);
  }
}
export const cmg = new CartsMongoose();
