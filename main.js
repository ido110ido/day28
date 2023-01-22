//Ex1
//A
// const getData = () => {
//   return new Promise((resolve, rejected) => {
//     setTimeout(() => resolve("hello world"), 2000);
//   });
// };
// const processData = async () => {
//   let data = await getData();
//   console.log(data);
// };
// processData();
// //B
// const myFunction = (data) =>
//   new Promise((resolve, rejected) => {
//     if (typeof data === "number") {
//       return data % 2 == 0
//         ? setTimeout(() => resolve("even"), 2000)
//         : setTimeout(() => resolve("odd"), 1000);
//     }
//     return rejected(Error("not a number :("));
//   });
//Ex2
const search_button = document.getElementById("search_button");
const search_field = document.getElementById("search");
const region_select = document.getElementById("region");
const getData = async () => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    randerList(response.data);
  } catch (error) {
    console.error(error);
  }
};
const searchData = async (name) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${name}`
    );
    randerList(response.data);
  } catch (error) {
    console.error(error);
  }
};
const regionData = async (region) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/region/${region}`
    );
    randerList(response.data);
  } catch (error) {
    console.error(error);
  }
};
search_field.addEventListener("input", () => {
  searchData(search_field.value);
});
region_select.addEventListener("change", () => {
  regionData(region_select.value);
});
const cardsGrid = document.getElementById("countrys_grid");

const randerList = (dataOfList) => {
  cardsGrid.innerHTML = "";
  for (let i = 0; i < dataOfList.length; i++) {
    const cardData = dataOfList[i];
    let cardElement = card(cardData);
    cardsGrid.appendChild(cardElement);
  }
};
const card = (cardData) => {
  let card = document.createElement("div");
  card.classList.add("card");
  //flag
  let img = document.createElement("img");
  img.classList.add("flag");
  img.src = cardData.flags.png;
  //info_div
  let infoDiv = document.createElement("div");
  infoDiv.classList.add("countrys_data");
  //country
  let countryName = document.createElement("h3");
  countryName.classList.add("countrys_name");
  countryName.innerText = cardData.name.common;
  //stats
  let statsDiv = document.createElement("div");
  statsDiv.classList.add("statsDiv");
  let population = document.createElement("div");
  let region = document.createElement("div");
  let capital = document.createElement("div");
  population.innerHTML = `<b>population: </b> ${cardData.population.toLocaleString(
    "en-US"
  )}`;
  region.innerHTML = `<b>region: </b>${cardData.region}`;
  capital.innerHTML = `<b>capital:</b> ${cardData.capital}`;
  statsDiv.appendChild(population);
  statsDiv.appendChild(region);
  statsDiv.appendChild(capital);
  //apppending
  infoDiv.appendChild(countryName);
  infoDiv.appendChild(statsDiv);
  card.appendChild(img);
  card.appendChild(infoDiv);
  return card;
};
getData();
