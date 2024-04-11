const formLogin = document.getElementById("formLogin");

if (formLogin instanceof HTMLFormElement) {
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input_email = document.querySelector("#email");
    const input_password = document.querySelector("#pass");

    if (
      input_email instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
      const datosUsuario = {
        email: input_email.value,
        password: input_password.value,
      };
      const { status } = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosUsuario),
      });

      if (status === 201) {
        window.location.href = "/products?limit=10&page=1";
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Welcome`,
          icon: "success",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
      } else {
        console.log("[login] estado inesperado: " + status);
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Authentication Failed`,
          icon: "error",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
      }
    }
  });
}
