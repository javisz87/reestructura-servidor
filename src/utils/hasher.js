import bcrypt, { compareSync } from "bcrypt";

export function hasher(frase) {
  return bcrypt.hashSync(frase, bcrypt.genSaltSync(10));
}

export function bcCompare(sended, act) {
  return bcrypt.compareSync(sended, act);
}
