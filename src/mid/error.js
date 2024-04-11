export const errorFn = (error, req, res, next) => {
  switch (error.message) {
    case "Product already exist" || "Not Found":
      res.status(404);
      break;
    case "Some imput is empty":
      res.status(400);
      break;
    default:
      res.status(500);
  }

  res.json({ message: error.message });
};

export function manejoDeErrores(error, req, res, next) {
  switch (error.tipo) {
    case "ERROR_DE_AUTENTICACION":
      res.status(401);
      break;
    case "ERROR_DE_PERMISOS":
      res.status(403);
      break;
    default:
      res.status(500);
  }
  console.log("comienza el log del error");
  console.log(error);
  console.log("fin del log del error");

  res.json({ errorMsg: error.message });
}