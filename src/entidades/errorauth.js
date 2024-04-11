export class ErrorAuth extends Error {
  constructor(mensaje = "Authentication Error") {
    super(mensaje);
    this.tipo = "AUTHENTICATION_ERROR";
  }
}

export class ErrorPermiss extends Error {
  constructor(mensaje = "Permissions Error") {
    super(mensaje);
    this.tipo = "PERMISSIONS_ERROR";
  }
}
