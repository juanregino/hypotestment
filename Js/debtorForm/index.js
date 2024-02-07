const dragArea = document.querySelector(".drag-area");
const dropText = dragArea.querySelector("h2");
const btnDrop = dragArea.querySelector("button");
const inputFile = dragArea.querySelector("#input-file");
const direccion = document.querySelector("#direccion");
const tipoPropiedad = document.querySelector("#tipo-propiedad");
const tamaño = document.querySelector("#tamaño");
const habitaciones = document.querySelector("#habitaciones");
const numeroBaños = document.querySelector("#numero-baños");
const valor = document.querySelector("#valor");
const ubicacion = document.querySelector("#ubicacion");
const form = document.querySelector("form");

let files;
let URLimage;
btnDrop.addEventListener("click", (e) => {
  inputFile.click();
});

inputFile.addEventListener("change", (e) => {
  files = inputFile.files;
  dragArea.classList.add("active");
  showFiles(files);
  dragArea.classList.remove("active");
});

//mientras tenemos elementos que estamos arrastrando encima
dragArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dragArea.classList.add("active");
  dropText.textContent = "Suelta para cargar";
});
//cuando estemos arrastrando pero no dentro de dragArea
dragArea.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dragArea.classList.remove("active");
  dropText.textContent = "Arrastra y suelta imagenes";
});
//cuando soltamos archivos en esa zona
dragArea.addEventListener("drop", (e) => {
  e.preventDefault();

  files = e.dataTransfer.files;
  console.log(files);
  showFiles(files);
  dragArea.classList.remove("active");
  dropText.textContent = "Arrastra y suelta imagenes";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("buron send");
  postImg();
});

function showFiles(files) {
  if (files.length === undefined) {
    console.log(files, "if");
    processFile(files);
  } else {
    console.log(files, "else");

    for (const file of files) {
      console.log(files, "for");

      processFile(file);
    }
  }
}

function processFile(file) {
  const docType = file.type;
  console.log(docType, "DOC");
  const validExtensions = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
  if (validExtensions.includes(docType)) {
    //archivo valido
    const fileReader = new FileReader();
    const id = `file-${Math.random().toString(36).substring(7)}`;
    console.log(URLimage);
    
    fileReader.addEventListener("load", (e) => {
      URLimage = fileReader.result;
      console.log(fileReader.result);
      const fileURL = fileReader.result;
      const image = `
     <div id="${id}" class="file-container">
     <img src="${fileURL}" alt="${file.name}"   width="20"/>
     <div class="status">
     <span>${file.name}</span>
     <span class="status-text">
     Loading...
     </span>
     </div>
     </div>
     `;

      let html = document.querySelector("#preview");
      html.innerHTML += image;
    });
    fileReader.readAsDataURL(file);
    uploadfile(file, id);
  } else {
    alert("No es un archivo valido");
  }
}

async function postImg() {
  const house = {
    image: URLimage,
    userId: localStorage.getItem("idUser"),
    direccion: direccion.value,

    tipoPropiedad: tipoPropiedad.value,
    tamaño: tamaño.value,
    habitaciones: habitaciones.value,
    numeroBaños: numeroBaños.value,

    valor: valor.value,
    ubicacion: ubicacion.value,
  };
  console.log(house);
  await fetch("http://localhost:3000/houses", {
    method: "POST",
    head: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(house),
  });
}
