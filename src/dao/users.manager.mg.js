import mongoose from "mongoose";
import { SchemaUsers } from "./models/users.schema.js";

export class UsersMongoose {
  #usersDb;
  constructor() {
    this.#usersDb = mongoose.model("users", SchemaUsers);
  }

  async addUser(user) {
    const usrsave = await this.#usersDb.create(user);
    return usrsave;
  }

  async findUsers() {
    const users = await this.#usersDb.find().lean();
    return users;
  }
  async findUserByCondition(condition) {
    const users = await this.#usersDb.find(condition).lean();
    return users;
  }

  async updateUser(id, usrUpd) {
    const finder = await this.#usersDb.findById(id).lean();
    if (!finder) {
      throw new Error("Not Found");
    }
    await this.#usersDb.findByIdAndUpdate(id, usrUpd);
  }
}

export const umg = new UsersMongoose();
