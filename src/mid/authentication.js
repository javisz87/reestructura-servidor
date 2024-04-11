import passport from "passport";
import { Strategy } from "passport-local";
import { Strategy as gitStrategy } from "passport-github2";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { manejoDeErrores } from "./error.js";
import { bcCompare } from "../utils/hasher.js";
import { ErrorAuth } from "../entidades/errorauth.js";
import { CLIENTID_GIT, CLIENTSCR_GIT } from "../config/config.git.js";
import { JWT_PRIVATE_KEY } from "../config/config.auth.js";
import { encriptarJWT } from "../utils/cripto.js";

import Carts from "../entidades/carts.js";
import Users from "../entidades/Users.js";
// @ts-ignore
import { cm } from "../dao/cart.manager.fs.js";
import { cmg } from "../dao/cart.manager.mg.js";
// @ts-ignore
import { um } from "../dao/users.manager.fs.js";
import { umg } from "../dao/users.manager.mg.js";

passport.use(
  "local",
  new Strategy({ usernameField: "email" }, async (username, password, done) => {

    if (username == 'javier@javier.com' && password == 'javier1987') {
      done(null, {
        name: username,
        role: 'admin',
        age: 87,
      })
    } else {
      const userfinder = await umg.findUserByCondition({
        email: username,
      });
      const user = userfinder[0];
      if (!user) return done(new ErrorAuth());
      if (!bcCompare(password, user.password)) return done(new ErrorAuth());
      await cmg.delAllProductsInCart(user.cart);

      done(null, {
        name: user.first_name + " " + user.last_name,
        email: user.email,
        role: user.role,
        age: user.age,
        cart: user.cart?._id,
      });
    }

  })
);

passport.use(
  "git",
  new gitStrategy(
    {
      clientID: CLIENTID_GIT,
      clientSecret: CLIENTSCR_GIT,
      callbackURL: "http://localhost:8080/api/sessions/githubcallback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const newcart = new Carts();
        const cart = await cmg.addCart(newcart);
        req.session.cart = cart._id;
        const user = {
          email: profile.username,
          first_name: profile.displayName,
          last_name: profile.displayName,
          age: 0,
          password: `${profile.displayName}verficated`,
          role:
            profile.email === "adminCoder@coder.com"
              ? "admin"
              : profile.email === "javier@javier.com"
                ? "admin"
                : undefined,
          cart: cart.id,
        };

        const newusr = new Users(user);
        const userCreated = await umg.addUser(newusr.datos());
        // const objusr = JSON.parse(JSON.stringify(userCreated));

        req.session.user = userCreated;
      } catch (error) {
        await cmg.deleteCart(req.session.cart);
        try {
          const finder = await umg.findUserByCondition({
            email: profile.username,
          });
          const user = JSON.parse(JSON.stringify(finder[0]));
          await cmg.delAllProductsInCart(user.cart);
          req.session.user = user;
        } catch {
          done(error);
        }
      }
      done(null, {
        name: req.session.user.first_name + " " + req.session.user.last_name,
        email: req.session.user.email,
        age: req.session.user.age,
        cart: req.session.user.cart?._id,
      });
    }
  )
);

passport.use(
  "jwt",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        function (req) {
          let token = null;
          if (req && req.signedCookies) {
            token = req.signedCookies["jwt_authorization"];
          }
          return token;
        },
      ]),
      secretOrKey: JWT_PRIVATE_KEY,
    },
    async (jwt_payload, done) => {
      try {
        done(null, jwt_payload); // payload es el contenido del token, ya descifrado
      } catch (error) {
        done(error);
      }
    }
  )
);

// esto lo tengo que pasar para que pasport maneje las sesiones
passport.serializeUser((user, next) => {
  next(null, user);
});
passport.deserializeUser((user, next) => {
  next(null, user);
});

export const passportInitialize = passport.initialize();
// export const passportSession = passport.session();

//mid a exportar

export const authLocal = passport.authenticate("local", {
  failWithError: true,
});

export const authGithub = passport.authenticate("git", {
  scope: ["user:email", "read:user"],
});
export function anthGithub_CB(req, res, next) {
  passport.authenticate("git", (error, user, info) => {
    if (error || !user) return next(new ErrorAuth());
    res.cookie("jwt_authorization", encriptarJWT(user), {
      signed: true,
      httpOnly: true,
    });
    next();
  })(req, res, next);
}

export function authJwtApi(req, res, next) {
  passport.authenticate("jwt", (error, jwt_payload, info) => {
    if (error || !jwt_payload) return next(new ErrorAuth());
    req.user = jwt_payload;
    next();
  })(req, res, next);
}

export function authJwtView(req, res, next) {
  passport.authenticate("jwt", (error, jwt_payload) => {
    if (error || !jwt_payload) return res.redirect("/login");
    req.user = jwt_payload;
    next();
  })(req, res, next);
}
