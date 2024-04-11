import fs from "fs/promises";

export default class cartsManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async #loadCarts() {
    const json = await fs.readFile(this.#path, "utf-8");
    this.carts = JSON.parse(json);
  }

  async #writeCarts() {
    const write = JSON.stringify(this.carts, null, 2);
    await fs.writeFile(this.#path, write);
  }

  async addCart(cart) {
    await this.#loadCarts();
    this.carts.push(cart);
    await this.#writeCarts();
    return cart;
  }

  async getProductInCartById(id) {
    await this.#loadCarts();
    const finder = this.carts.find((c) => c.id === id);
    if (!finder) {
      throw new Error("Not Found");
    }
    return finder.products;
  }

  async addProductInCart(cid, pid) {
    const products = await this.getProductInCartById(cid);
    const serchprod = products.find((p) => p.id === pid);
    if (!serchprod) {
      const finder = this.carts.find((c) => c.id === cid);
      finder.products.push({ id: pid, quantity: 1 });
    } else {
      serchprod.quantity++;
    }
    await this.#writeCarts();
    return serchprod;
  }
}


export const cm = new cartsManager("./src/database/carts.json");