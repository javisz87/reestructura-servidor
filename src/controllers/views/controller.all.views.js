import { pm } from "../../dao/product.manager.fs.js";
import { pmg } from "../../dao/product.manager.mg.js";
import {
  PATH_NEW_PRODUCT,
  PATH_PRODUCT,
  PATH_CARTS,
  PATH_LOGIN,
  PATH_REGIS,
} from "../../config/config.viewspaths.js";
import { cmg } from "../../dao/cart.manager.mg.js";

export async function newProductView(req, res, next) {
  try {
    res.render(PATH_NEW_PRODUCT, {
      style: "style-newprod",
      faviconTitle: "Add Products",
      Head: "New Product",
    });
  } catch (error) {
    return next(error.message);
  }
}

export async function productView(req, res) {
  const urlsrt = `http://localhost:8080${req.originalUrl}`;
  const products = await pmg.getPagProducts(req.query, urlsrt);
  let cartid;
  let usrrole;
  let user;
  if (req.session.passport) {
    cartid = req.session.passport.user.cart;
    usrrole = req.session.passport.user.role;
    user = req.session.passport.user;
  } else {
    cartid = req.user.cart;
    usrrole = req.user.role;
    user = req.user;
  }

  console.log('🌙 ', 'user', '->', user)


  // const validrole = usrrole === "admin" || usrrole === "super-admin" ? 1 : 0;
  // const validrole = usrrole === "admin" ? 1 : 0;
  res.render(PATH_PRODUCT, {
    // role: validrole,
    user: user,
    cart: cartid,
    style: "style-base",
    faviconTitle: "Home",
    list: products,
    listExist: products.payload.length > 0,
  });
}

export async function cartView(req, res) {
  const products = await cmg.getProductsInCartById(req.params.cid);
  res.render(PATH_CARTS, {
    style: "style-cart",
    faviconTitle: "Cart",
    Head: "Cart Shopping",
    list: products,
    listExist: products.length > 0,
    cid: req.params.cid,
  });
}

export async function loginView(req, res) {
  res.render(PATH_LOGIN, {
    style: "style-login",
    faviconTitle: "Login",
  });
}

export async function regisView(req, res) {
  res.render(PATH_REGIS, {
    style: "style-register",
    faviconTitle: "Regis",
  });
}
