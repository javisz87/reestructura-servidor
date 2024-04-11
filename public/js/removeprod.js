async function delProductInCartShop(cid, pid) {
  const cidarr = cid.split("carts/");
  const cidt = cidarr[1];
  const FETCH_URL = `http://localhost:8080/api/carts/${cidt}/product/${pid}`;
  const { status } = await fetch(FETCH_URL, { method: "DELETE" });

  if (status === 200) {
    location.reload();
  }
}
