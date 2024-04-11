const formCargaProducts = document.querySelector("#product-form");

if (formCargaProducts instanceof HTMLFormElement) {
  formCargaProducts.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formCargaProducts);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
    fetch("api/products", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    // @ts-ignore
    Swal.fire({
      toast: true,
      showConfirmButton: true,
      title: `Product created`,
      icon: "success",
      background: "#bd9cfa",
      color: "#fff",
      confirmButtonColor: "#01657ed1",
    });
  });
}
