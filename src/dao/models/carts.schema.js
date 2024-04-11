import mongoose, { Schema } from "mongoose";

export const SchemaCarts = new Schema(
  {
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: "products",
          },
          quantity: { type: Number },
        },
      ],
      default: [],
    },
  },
  { versionKey: false }
);

SchemaCarts.pre(/^find/, function (next) {
  this.populate("products.product");
  next();
});
