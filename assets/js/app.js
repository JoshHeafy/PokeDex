const btnSiguiente = document.querySelector("#siguiente");
const btnAtras = document.querySelector("#atras");

let paginaActual = 1;
const resultadosPorPagina = 10;
let offset = 0;
let pokemones = [];

async function fetchData() {
  const pokeData = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${resultadosPorPagina}`)
    .then(response => response.json())
    .catch(error => console.log("Error al obtener los datos:", error));

  console.log("Pokemon:", pokeData);
  pokemones = pokeData?.results ?? [];

  const contenedor = document.getElementById("pokemones-contenedor");
  contenedor.innerHTML = "";

  var index = offset + 1;
  pokemones.forEach((pok) => {
    const pokBloq = crearBloquePokemones(pok, index++);
    contenedor.appendChild(pokBloq);
  });
}

function avanzarPagina() {
  paginaActual++;
  offset = (paginaActual - 1) * resultadosPorPagina;
  fetchData();
}

function retrocederPagina() {
  if (paginaActual > 1) {
    paginaActual--;
    offset = (paginaActual - 1) * resultadosPorPagina;
    fetchData();
  }
}

function crearBloquePokemones(pokem, index) {
  const prodContenedor = document.createElement("article");
  prodContenedor.classList.add("poke-item");

  const pokeImg = document.createElement("img");
  pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`;

  const pokeId = document.createElement("header");
  pokeId.textContent = `Nro: ${index}`;

  const pokeDetalle = document.createElement("aside");

  const pokeName = document.createElement("div");
  pokeName.textContent = capitalizeFirstLetter(pokem.name);

  const pokeVer = document.createElement("button");
  pokeVer.classList.add("btnMore");
  pokeVer.textContent = "";
  pokeVer.addEventListener("click", () => mostrarDetalles(pokem));

  pokeDetalle.append(pokeName, pokeId);
  prodContenedor.append(pokeImg, pokeVer, pokeDetalle);

  return prodContenedor;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

btnSiguiente.addEventListener("click", avanzarPagina);
btnAtras.addEventListener("click", retrocederPagina);

fetchData();
