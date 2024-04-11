const btnLogout = document.getElementById("logout");

if (btnLogout instanceof HTMLAnchorElement) {
  btnLogout.addEventListener("click", async (e) => {
    const { status } = await fetch("/api/sessions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (status === 200) {
      window.location.href = "/login";
    } else {
      console.log("[login] estado inesperado: " + status);
    }
  });
}
