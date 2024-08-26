const shopCards = [
  {
    id: 1,
    img: "assets/img/tamplate.png",
    dataSearchName: "search-names",
    searchName: "Якісний товар",
    dataPrice: "price",
    price: "9999",
    cardDescript: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    dataBrand: "brand-1",
    brand: "Виробник 1",
    dataSeries: "series-1",
    series: "Якась серія 1",
    dataModel: "model-1",
    model: "Якась модель 1",
    dataCountry: "country-1",
    country: "Якась країна 1",
    dataColor: "color-1",
    color: "Якийсь колір 1",
    stock: 100,
  },
].map((card) => {
  if (card.stock > 10) {
    card.dataStock = "in-stock";
    card.stockName = "Є в наявності";
  } else if (card.stock > 0) {
    card.dataStock = "wait-stock";
    card.stockName = "Товар закінчується";
  } else {
    card.dataStock = "out-stock";
    card.stockName = "Товар закінчився";
  }
  return card;
});

function renderCard(shopCards) {
  let cardsHtml = "";
  for (const card of shopCards) {
    cardsHtml += `
    <div class="card-wrapper" data-card="${card.id}">
        <div class="card-img-box">
          <img class="card-img" src="${card.img}" alt="" />
        </div>
        <div class="card-descript">
          <div class="visible-block">
            <h3 class="card-item name" data-search-name="${card.dataSearchName}">
              ${card.searchName} (${card.brand}, ${card.series}, ${card.model})
            </h3>
            <p class="card-item stock ${card.dataStock}" data-stock="${card.dataStock}">${card.stockName}</p>
            <p class="card-item prise">
              ціна: <span data-price="${card.dataPrice}">${card.price}</span>
            </p>
          </div>
          <div class="invisible block">
            <p class="card-item descrip">
              ${card.cardDescript}
            </p>
            <p class="card-item brand" data-brand="brand-${card.dataBrand}">${card.brand}</p>
            <p class="card-item series" data-series="series-${card.dataSeries}">${card.series}</p>
            <p class="card-item model" data-model="model-${card.dataModel}">${card.model}</p>
            <p class="card-item country" data-country="country-${card.dataCountry}">
              ${card.country}
            </p>
            <p class="card-item color" data-color="color-${card.dataColor}">${card.color}</p>
          </div>
        </div>
      </div>
    `;
  }
  const cardContainer = document.querySelector(".cards-box");
  cardContainer.innerHTML = cardsHtml;
}
renderCard(shopCards);

function renderHidenCard(shopCards) {
  let cardsHtml = "";
  for (const card of shopCards) {
    cardsHtml += `
    <div class="hiden-cards hiden" data-card="${card.id}">
        <div class="hiden-cards-wraper">
          <div class="hiden-card-img-wrapper">
            <div class="hiden-card-img-box">
              <img
                class="hiden-card-img"
                src="${card.img}"
                alt=""
              />
            </div>
          </div>
          <div class="hiden-card-descript">
            <div class="hiden-visible-block">
              <h3 class="card-item name" data-search-name="${card.dataSearchName}">
                ${card.searchName} (${card.brand}, ${card.series}, ${card.model})
              </h3>
              <p class="card-item descript">
                ${card.cardDescript}
              </p>
              <p class="card-item stock ${card.dataStock}" data-stock="${card.dataStock}">${card.stockName}</p>
              <p class="card-item prise">
                ціна: <span data-price="${card.dataPrice}">${card.price}</span>
              </p>
               <p class="card-item brand" data-brand="brand-${card.dataBrand}">${card.brand}</p>
              <p class="card-item series" data-series="series-${card.dataSeries}">${card.series}</p>
              <p class="card-item model" data-model="model-${card.dataModel}">${card.model}</p>
              <p class="card-item country" data-country="country-${card.dataCountry}">
                ${card.country}
              </p>
              <p class="card-item color" data-color="color-${card.dataColor}">${card.color}</p>
            </div>
          </div>
        </div>
        <div class="button-box">
          <button class="remove-hiden button">Закрити</button>
          <div class="shop-counter">
            <button class="count-minus ${card.dataStock}">-</button>
            <input
              type="number"
              class="shop-count ${card.dataStock}"
              value="1"
              data-count="shop-count-${card.id}"
            />
            <button class="count-plus ${card.dataStock}">+</button>
          </div>
          <button class="add-item ${card.dataStock} button">Купити</button>
        </div>
      </div>
    `;
  }
  const cardContainer = document.querySelector(".hiden-cards-box");
  cardContainer.innerHTML = cardsHtml;
}
renderHidenCard(shopCards);

//---------------------------------

function renderAllCards() {
  renderCard(shopCards);
  renderHidenCard(shopCards);
  initializeCardEventListeners();
}

function filterCards(
  searchQuery,
  minPrice,
  maxPrice,
  availabilityFilters,
  cards
) {
  return cards.filter((card) => {
    const matchesName = card.searchName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const price = parseInt(card.price);
    const matchesPrice = price >= minPrice && price <= maxPrice;

    const dataStock = card.dataStock;
    const matchesAvailability =
      availabilityFilters.length === 0 ||
      availabilityFilters.includes(dataStock);

    return matchesName && matchesPrice && matchesAvailability;
  });
}

function updateCardsDisplay(filteredCards) {
  renderCard(filteredCards);
  renderHidenCard(filteredCards);
  initializeCardEventListeners();
}

const searchInput = document.querySelector(".main-search");
const minPriceInput = document.querySelector(".input-min");
const maxPriceInput = document.querySelector(".input-max");
const rangeInputs = document.querySelectorAll(".range-input input");
const availabilityCheckboxes = document.querySelectorAll(".search-item");

searchInput.addEventListener("input", applyFilters);
[minPriceInput, maxPriceInput, ...rangeInputs].forEach((input) => {
  input.addEventListener("input", applyFilters);
});
availabilityCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

function applyFilters() {
  const searchQuery = searchInput.value;
  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);

  const availabilityFilters = Array.from(availabilityCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.stock);

  const filteredCards = filterCards(
    searchQuery,
    minPrice,
    maxPrice,
    availabilityFilters,
    shopCards
  );
  updateCardsDisplay(filteredCards);
}

function initializeCardEventListeners() {
  const cardsBox = document.querySelector(".cards-box");
  const cardsHeight = document.querySelector(".hiden-cards-box");
  const cardsWrapper = document.querySelectorAll(".card-wrapper");
  const removeHidenButtons = document.querySelectorAll(".remove-hiden");

  cardsWrapper.forEach((card) => {
    card.addEventListener("click", function (event) {
      const groupId = event.currentTarget.getAttribute("data-card");
      const targetGroup = document.querySelector(
        `.hiden-cards[data-card="${groupId}"]`
      );
      cardsBox.classList.add("hide");
      targetGroup.classList.remove("hiden");
      cardsHeight.classList.add("height");
    });
  });

  removeHidenButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const targetGroup = event.currentTarget.closest(".hiden-cards");
      targetGroup.classList.add("hiden");
      cardsBox.classList.remove("hide");
      cardsHeight.classList.remove("height");
    });
  });
}

renderAllCards();

const resetButton = document.querySelector(".search-reset");

resetButton.addEventListener("click", function () {
  searchInput.value = "";
  minPriceInput.value = 6000; // Default value
  maxPriceInput.value = 19000; // Default value
  rangeInputs[0].value = 6000; // Default value
  rangeInputs[1].value = 19000; // Default value

  availabilityCheckboxes.forEach((checkbox) => (checkbox.checked = false));

  const cardsBox = document.querySelector(".cards-box");
  const cardsHeight = document.querySelector(".hiden-cards-box");
  const hiddenCards = document.querySelectorAll(".hiden-cards");

  cardsBox.classList.remove("hide");
  cardsHeight.classList.remove("height");
  hiddenCards.forEach((card) => card.classList.add("hiden"));

  updateCardsDisplay(shopCards);
});

localStorage.setItem("shopCards", JSON.stringify(shopCards));
