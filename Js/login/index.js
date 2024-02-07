const formLogin = document.querySelector("#form-login");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const URL = "http://localhost:3000/users";

formLogin.addEventListener("submit", (e) => {
  e.preventDefault();

  login();
});

async function login() {
  const response = await fetch(`${URL}?email=${email.value}`);
  const data = await response.json();
  console.log(data);
  if (!data.length) {
    showAlert("Email No Registrado");
    return;
  }

  if (data[0].password === password.value) {
    // localStorage.setItem("isAuthorizated","true")
    localStorage.setItem("idUSer", data[0].id);
    if (data[0].rol === "deudor") {
      window.location.href = "debtorform.html";
    } else {
      window.location.href = "cards.html";
    }
  } else {
    showAlert("Credenciales Incorrectas");
  }
}
function showAlert(mesagge) {
  Swal.fire({
    title: "Error!",
    text: mesagge,
    icon: "error",
    confirmButtonText: "Cerrar",
    confirmButtonColor: "#000",
  });
}
