const formRegister = document.querySelector("#formRegister");

if (formRegister instanceof HTMLFormElement) {
  formRegister.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input_email = document.querySelector("#email");
    const input_first_name = document.querySelector("#first_name");
    const input_last_name = document.querySelector("#last_name");
    const input_age = document.querySelector("#age");
    const input_password = document.querySelector("#password");

    if (
      input_first_name instanceof HTMLInputElement &&
      input_last_name instanceof HTMLInputElement &&
      input_email instanceof HTMLInputElement &&
      input_age instanceof HTMLInputElement &&
      input_password instanceof HTMLInputElement
    ) {
      const datosUsuario = {
        email: input_email.value,
        first_name: input_first_name.value,
        last_name: input_last_name.value,
        age: input_age.value,
        password: input_password.value,
      };

      const { status } = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify(datosUsuario),
        headers: { "Content-Type": "application/json" },
      });

      if (status === 201) {
        // @ts-ignore
        Swal.fire({
          toast: true,
          showConfirmButton: true,
          title: `Creation Success`,
          icon: "success",
          background: "#600252",
          color: "#fff",
          confirmButtonColor: "#01657ed1",
        });
        window.location.href = "/products?limit=10&page=1";
      } else {
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
        console.log("[login] estado inesperado: " + status);
      }
    }
  });
}
