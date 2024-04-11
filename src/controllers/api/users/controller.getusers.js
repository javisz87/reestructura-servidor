import { umg } from "../../../dao/users.manager.mg.js";

export async function getUsersController(req, res, next) {
  const users = await umg.findUsers();
  res.json(users);
}
