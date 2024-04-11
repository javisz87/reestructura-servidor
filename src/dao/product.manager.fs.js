import fs from "fs/promises";

export default class ProductManager {
  #path;
  constructor(path) {
    this.#path = path;
  }

  async #loadProducts() {
    const json = await fs.readFile(this.#path, "utf-8");
    this.products = JSON.parse(json);
  }

  async #writeProducts() {
    const write = JSON.stringify(this.products, null, 2);
    await fs.writeFile(this.#path, write);
  }

  async addProduct(product) {
    await this.#loadProducts();
    const codeValid = this.products.find((e) => e.code === product.code);
    if (codeValid) {
      throw new Error("Product already exist");
    }

    this.products.push(product);
    await this.#writeProducts();
    return product;
  }

  async getProducts() {
    await this.#loadProducts();
    return this.products;
  }

  async getProductById(id) {
    await this.#loadProducts();
    const finder = this.products.find((c) => c.id === id);
    if (!finder) {
      throw new Error("Not Found");
    }
    return finder;
  }

  async deleteProduct(id) {
    await this.#loadProducts();
    const finder = this.products.find((c) => c.id === id);
    if (!finder) {
      throw new Error("Not Found");
    }
    const deleter = this.products.filter((e) => e.id !== id);
    this.products = deleter;
    await this.#writeProducts();
  }

  async updateProduct(id, productUpd) {
    await this.#loadProducts();
    const updindex = this.products.findIndex((e) => e.id === id);
    if (updindex === -1) {
      throw new Error("Not Found");
    }
    const oldproduct = this.products[updindex];
    this.products[updindex] = { ...oldproduct, ...productUpd };

    /*opción 2: para poder utilizar esta version propuesta por el tuto debe comentar las validaciones en la clase product que lanzan el error "some imput are empty"*/

    // const { title, description, price, thumbnail, stock, category } =
    //   productUpd;

    // this.products[updindex] = {
    //   title: title ?? this.products[updindex].title,

    //   description: description ?? this.products[updindex].description,

    //   price: price ?? this.products[updindex].price,

    //   thumbnail: thumbnail ?? this.products[updindex].thumbnail,

    //   code: this.products[updindex].code,

    //   stock: stock ?? this.products[updindex].stock,

    //   category: category ?? this.products[updindex].category,
    // };

    //--

    this.products[updindex].id = id;
    await this.#writeProducts();
    return this.products[updindex];
  }
}

export const pm = new ProductManager("./src/database/productos.json");
