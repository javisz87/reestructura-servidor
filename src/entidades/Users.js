import { hasher } from "../utils/hasher.js";

export default class Users {
  // #id;
  #email;
  #first_name;
  #last_name;
  #age;
  #password;
  #role;
  #cart;

  constructor({ email, first_name, last_name, age, password, role, cart }) {
    // this.#id = randomUUID();
    this.#email = email;
    this.#first_name = first_name;
    this.#last_name = last_name;
    this.#age = age;
    this.#password = hasher(password);
    this.#role = role;
    this.#cart = cart;
  }

  // Geters
  // get id() {
  //   return this.#id;
  // }

  get email() {
    return this.#email;
  }
  get first_name() {
    return this.#first_name;
  }
  get last_name() {
    return this.#last_name;
  }
  get age() {
    return this.#age;
  }
  get password() {
    return this.#password;
  }
  get role() {
    return this.#role;
  }
  get cart() {
    return this.#cart;
  }

  //metodos para acceder a copia y proteger original
  datos() {
    return {
      // id: this.#id,
      email: this.#email,
      first_name: this.#first_name,
      last_name: this.#last_name,
      age: this.#age,
      password: this.#password,
      role: this.#role,
      cart: this.#cart,
    };
  }
}
