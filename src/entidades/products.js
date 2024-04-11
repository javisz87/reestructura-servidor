import { randomUUID } from "crypto";
// persistencia en archivos descomentar id

export default class Products {
  // #id;
  #title;
  #description;
  #price;
  #thumbnail;
  #code;
  #stock;
  #status;
  #category;

  constructor({ title, description, price, thumbnail, code, stock, category }) {
    // this.#id = randomUUID();
    this.#title = title;
    this.#description = description;
    this.#price = price;
    this.#thumbnail = [thumbnail];
    this.#code = code;
    this.#stock = stock ?? 0;
    this.#status = true;
    this.#category = category;
  }

  // Geters
  // get id() {
  //   return this.#id;
  // }

  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get price() {
    return this.#price;
  }
  get thumbnail() {
    return this.#thumbnail;
  }
  get code() {
    return this.#code;
  }
  get stock() {
    return this.#stock;
  }
  get status() {
    return this.status;
  }
  get category() {
    return this.#category;
  }

  //metodos para acceder a copia y proteger original
  datos() {
    return {
      // id: this.#id,
      title: this.#title,
      description: this.#description,
      price: this.#price,
      thumbnail: this.#thumbnail,
      code: this.#code,
      stock: this.#stock,
      status: this.#status,
      category: this.#category,
    };
  }
}
