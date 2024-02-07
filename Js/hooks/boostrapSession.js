(() => {
  const idUSer = localStorage.getItem("idUSer");
  const path = window.location.pathname;

  //? Esto Para que sirve ??
  const routeActive = path.substring(path.lastIndexOf("/") + 1);

  const privateRoutes = ["debtorform.html", "cards.html"];

  if (privateRoutes.includes(routeActive) && !idUSer) {
    window.location.href = "index.html";
  }
})();
