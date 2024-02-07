// Selectors

//selects
const modalbody = document.querySelector(".modal-body");
const cardContainer = document.querySelector(".card-container");
let cardsData;

// eventos
document.addEventListener("DOMContentLoaded", async (e) => {
  cardsData = await getcardsData();
  showcard();
});

// functions

// GET DATA FOR CARDS
async function getcardsData() {
  const URL = "http://localhost:3000/houses";
  const response = await fetch(URL);
  const data = await response.json();
  console.log(data);
  return data;
}
// PRINT CAR DINFO
function showcard() {
  cardContainer.innerHTML = "";
  cardsData.forEach((card, index) => {
    cardContainer.innerHTML += `
    <div class="card">
      <div class="imgBx"><img src="${card.image}"></div>
      <div class="content">
        <span class="price">
          <a href=""><i class='bx bx-money'></i>${card.valor}</a>
        </span>
        <ul>
          <li id="ciudad"><i class='bx bx-current-location'></i>Ciudad: ${card.ciudad}</li>
          <li id="tipoCasa"><i class='bx bx-building-house' ></i>Tipo: ${card.tipoPropiedad}</li>
        </ul>
        <a  onclick="showmodal(${index})" class ="infobtn"href="#modal-contan">More Info</a>
      </div>
    </div>    
    `;
  });
}
// PRINT MODAL INFO
function showmodal(index) {
  modalbody.innerHTML = `
    <img src="${cardsData[index].image}" alt="#" /> 
          <div class="card-houses-info">
            <P>${cardsData[index].description}</P>
           <ul>
            <li class="sqm">Tamaño: ${cardsData[index].tamaño}</li>
            <li class="sqm">Nro Habitaciones: ${cardsData[index].habitaciones}</li>
            <li class="sqm">Nro Baños: ${cardsData[index].numeroBaños}</li>
            <li class="sqm">Ciudad: ${cardsData[index].ciudad}</li>
            <li class="tipoCasa">Tipo Propiedad: ${cardsData[index].tipoPropiedad}</li>
            <li class="Hlocat">Direccion: ${cardsData[index].direccion}</li>
              <a href=" https://wa.me/+573023568113">Contact Us</a>
           </ul>
    `;
}
