const form = document.querySelector("#form-register");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirmation = document.querySelector("#password-confirmation");
const name = document.querySelector("#name");
const deudor = document.querySelector("#deudor-btn");
const acrededor = document.querySelector(".acrededor");

const URL = "http://localhost:3000/users";

form.addEventListener("submit", (event) => {
  // Eliminar las acciones por defecto
  event.preventDefault();
  const {
    target: { elements },
  } = event;
  // const { rol, name } = elements;
  // // console.log(elements)
  // console.log("rol ==> ", rol.value);
  // console.log("name ==> ", name.value);

  registerUser(elements);
});

async function registerUser({
  rol,
  name,
  password,
  password_confirmation,
  email,
}) {
  // 1. la contraseña tienen que ser iguales
  const { validated, message } = validaPassword(
    password,
    password_confirmation
  );
  if (!validated) {
    showAlert(message);
    return;
  }
  // 2. contraseña segura
  const { validated: validatedSegurity, message: messageError } =
    validatePasswordSegurity();

  if (!validatedSegurity) {
    showAlert(messageError);
    return;
  }

  // 3.No existe una cuenta con este correo
  if (await validateEmail()) {
    showAlert("el email ya esta registrado");
    return;
  }

  //4. es deudor o administrador

  try {
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        name: name.value,
        rol: rol.value,
      }),
    });

    if (rol.value === "deudor") {
      localStorage.setItem("rol", rol.value);
    }
  } catch {
    showAlert("la promesa falló");
  }
}

async function validateEmail() {
  const response = await fetch(`${URL}?email=${email.value}`);
  const data = await response.json();

  return data.length;
}

function validaPassword(password, password_confirmation) {

  if (password.value != password_confirmation.value) {
    return { validated: false, message: "Las contraseñas no coinciden " };
  }
  return { validated: true };
}

function showAlert(mesagge) {
  Swal.fire({
    title: "Error!",
    text: mesagge,
    icon: "error",
    confirmButtonText: "Cerrar",
    buttonsStyling: true,
  });
}

function validatePasswordSegurity() {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/;
  if (regex.test(password.value)) {
    return { validated: true };
  }
  return {
    validated: false,
    message:
      "la contraseña debe tener mayusculas minusculas, un caracter especial y un rango de 8 a 15 caracteres",
  };
}
