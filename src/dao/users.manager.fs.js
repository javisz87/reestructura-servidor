import fs from "fs/promises";

export class UsersManager {
  #usr;
  #ruta;

  constructor(ruta) {
    this.#ruta = ruta;
    this.#usr = [];
  }

  async #leer() {
    const json = await fs.readFile(this.#ruta, "utf-8");
    this.#usr = JSON.parse(json);
  }

  async #escribir() {
    const nuevoJson = JSON.stringify(this.#usr, null, 2);
    await fs.writeFile(this.#ruta, nuevoJson);
  }

  async addUser(user) {
    await this.#leer();
    this.#usr.push(user);
    await this.#escribir();
    return user;
  }

  async findUser(email) {
    await this.#leer();
    const buscada = this.#usr.find((c) => c.email === email);
    if (!buscada) {
      throw new Error("id no encontrado");
    }
    return buscada;
  }

  async updateUser(id, nuevaUsr) {
    await this.#leer();
    const indiceBuscado = this.#usr.findIndex((c) => c.id === id);
    if (indiceBuscado === -1) {
      throw new Error("id no encontrado");
    }
    this.#usr[indiceBuscado] = nuevaUsr;
    await this.#escribir();
    return nuevaUsr;
  }

  async deleteUser(id) {
    await this.#leer();
    const indiceBuscado = this.#usr.findIndex((c) => c.id === id);
    if (indiceBuscado === -1) {
      throw new Error("id no encontrado");
    }
    const [borrado] = this.#usr.splice(indiceBuscado, 1);
    await this.#escribir();
    return borrado;
  }
}

export const um = new UsersManager("./src/database/users.json");
