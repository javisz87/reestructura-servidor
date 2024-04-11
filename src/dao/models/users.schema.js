import mongoose, { Schema } from "mongoose";

export const SchemaUsers = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "dev", "user"], default: "user" },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "carts",
    },
  },
  { versionKey: false }
);

SchemaUsers.pre(/^find/, function (next) {
  this.populate("cart");
  next();
});
