import mongoose from "mongoose";
import { MONGODB_CNX_STR } from "../config/config.database.js";

export async function conectar() {
  await mongoose.connect(MONGODB_CNX_STR);

  console.log(`base de datos conectada a ${MONGODB_CNX_STR}`);
}
