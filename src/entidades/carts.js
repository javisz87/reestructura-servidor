import { randomUUID } from "crypto";

// persistencia en archivos descomentar id

//mongoose

export default class Carts {
  // #id
  #products;
  constructor() {
    // this.#id = randomUUID();
    this.#products = [];
  }
  // get id() {
  //   return this.#id;
  // }

  get products() {
    return this.#products;
  }

  //metodos para acceder a copia y proteger original
  datos() {
    return {
      // id: this.#id,
      products: this.#products,
    };
  }
}
