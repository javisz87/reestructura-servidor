import { ErrorPermiss } from "../entidades/errorauth.js";

export function soloRol(rol) {
  return function (req, res, next) {
    req.user?.role;
    if (
      req.user?.role.includes(rol) ||
      req.session.passport.user?.role.includes(rol)
    )
      return next();
    return next(new ErrorPermiss(`solo disponible para rol '${rol}'`));
  };
}
