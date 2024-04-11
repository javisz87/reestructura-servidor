import Carts from "../../../entidades/carts.js";
import Users from "../../../entidades/Users.js";
import { cm } from "../../../dao/cart.manager.fs.js";
import { cmg } from "../../../dao/cart.manager.mg.js";
import { um } from "../../../dao/users.manager.fs.js";
import { umg } from "../../../dao/users.manager.mg.js";
import { encriptarJWT } from "../../../utils/cripto.js";

export async function postUsuarios(req, res, next) {
  try {
    const newcart = new Carts();
    const cart = await cmg.addCart(newcart);
    req.session.cart = cart._id;
    const user = {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      age: req.body.age,
      password: req.body.password,
      role:
        req.body.email === "adminCoder@coder.com" &&
        req.body.password === "adminCod3r123"
          ? "admin"
          : req.body.email === "lucas@lucas.com" &&
            req.body.password === "lucas1997"
          // ? "super-admin"
          ? "admin"
          : undefined,
      cart: cart.id,
    };

    const newusr = new Users(user);
    const userCreated = await umg.addUser(newusr.datos());
    const objusr = JSON.parse(JSON.stringify(userCreated));

    // // req.login(objusr, (error) => {
    // //   if (error) {
    // //     next(new Error("falló el login!"));
    // //   } else {
    // //     res.status(201).json(req.objusr);
    // //   }
    // // });
    res.cookie("jwt_authorization", encriptarJWT(objusr), {
      signed: true,
      httpOnly: true,
    });

    res.status(201).json(objusr);
  } catch (error) {
    await cmg.deleteCart(req.session.cart);
    next(error);
  }
}
