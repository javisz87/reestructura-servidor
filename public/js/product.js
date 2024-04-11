async function addProductQuantityToCart(cid, pid, quantity) {
  const cidarr = cid.split("carts/");
  const cidt = cidarr[1];
  console.log(cidt);
  console.log(quantity);
  const FETCH_URL = `http://localhost:8080/api/carts/${cidt}/product/${pid}?quantity=${quantity}`;
  const data = await fetch(FETCH_URL, { method: "POST" });
  console.log(data);
  // @ts-ignore
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: true,
    title: `added product`,
    icon: "success",
    background: "#bd9cfa",
    color: "#fff",
    confirmButtonColor: "#01657ed1",
  });
}
