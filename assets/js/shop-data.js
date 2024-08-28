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
    stock: 101,
  },
  {
    id: 2,
    img: "assets/img/tamplate.png",
    dataSearchName: "search-names",
    searchName: "Гарний товар",
    dataPrice: "price",
    price: "7500",
    cardDescript: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    dataBrand: "brand-2",
    brand: "Виробник 2",
    dataSeries: "series-2",
    series: "Якась серія 2",
    dataModel: "model-2",
    model: "Якась модель 2",
    dataCountry: "country-2",
    country: "Якась країна 2",
    dataColor: "color-2",
    color: "Якийсь колір 2",
    stock: 50,
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
            <p class="card-item stock ${card.dataStock}" data-stock="${card.stock}">${card.stockName}</p>
            <p class="card-item available ${card.dataStock}" >Залишок ${card.stock} од.</p>
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
              <p class="card-item stock ${card.dataStock}" data-stock="${card.stock}">${card.stockName}</p>
              <p class="card-item prise">
                ціна: <span class="prise-value" data-price="${card.dataPrice}">${card.price}</span>
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
             <p class="counter-value">${card.price}</p>
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
  brandFilters,
  seriesFilters,
  modelFilters,
  countryFilters,
  colorFilters,
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

    const dataBrand = card.dataBrand;
    const matchesBrand =
      brandFilters.length === 0 || brandFilters.includes(dataBrand);

    const dataSeries = card.dataSeries;
    const matchesSeries =
      seriesFilters.length === 0 || seriesFilters.includes(dataSeries);

    const dataModel = card.dataModel;
    const matchesModel =
      modelFilters.length === 0 || modelFilters.includes(dataModel);

    const dataCountry = card.dataCountry;
    const matchesCountry =
      countryFilters.length === 0 || countryFilters.includes(dataCountry);

    const dataColor = card.dataColor;
    const matchesColor =
      colorFilters.length === 0 || colorFilters.includes(dataColor);

    return (
      matchesName &&
      matchesPrice &&
      matchesAvailability &&
      matchesBrand &&
      matchesSeries &&
      matchesModel &&
      matchesCountry &&
      matchesColor
    );
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
const availabilityCheckboxes = document.querySelectorAll(
  ".search-item[data-stock]"
);
const brandCheckboxes = document.querySelectorAll(".search-item[data-brand]");
const seriesCheckboxes = document.querySelectorAll(".search-item[data-series]");
const modelCheckboxes = document.querySelectorAll(".search-item[data-model]");
const countryCheckboxes = document.querySelectorAll(
  ".search-item[data-country]"
);
const colorCheckboxes = document.querySelectorAll(".search-item[data-color]");

searchInput.addEventListener("input", applyFilters);
[minPriceInput, maxPriceInput, ...rangeInputs].forEach((input) => {
  input.addEventListener("input", applyFilters);
});
availabilityCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});
brandCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});
seriesCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});
modelCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});
countryCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});
colorCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});

function applyFilters() {
  const searchQuery = searchInput.value;
  const minPrice = parseInt(minPriceInput.value);
  const maxPrice = parseInt(maxPriceInput.value);

  const availabilityFilters = Array.from(availabilityCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.stock);

  const brandFilters = Array.from(brandCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.brand);

  const seriesFilters = Array.from(seriesCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.series);

  const modelFilters = Array.from(modelCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.model);

  const countryFilters = Array.from(countryCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.country);

  const colorFilters = Array.from(colorCheckboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.dataset.color);

  const filteredCards = filterCards(
    searchQuery,
    minPrice,
    maxPrice,
    availabilityFilters,
    brandFilters,
    seriesFilters,
    modelFilters,
    countryFilters,
    colorFilters,
    shopCards
  );
  updateCardsDisplay(filteredCards);
}

function initializeCardEventListeners() {
  const cardsBox = document.querySelector(".cards-box");
  const cardsHeight = document.querySelector(".hiden-cards-box");
  const cardsWrapper = document.querySelectorAll(".card-wrapper");
  const removeHidenButtons = document.querySelectorAll(".remove-hiden");
  const buttonNext = document.querySelector(".button-next");
  const buttonNextTwo = document.querySelector(".button-next2");

  cardsWrapper.forEach((card) => {
    card.addEventListener("click", function (event) {
      const groupId = event.currentTarget.getAttribute("data-card");
      const targetGroup = document.querySelector(
        `.hiden-cards[data-card="${groupId}"]`
      );
      cardsBox.classList.add("hide");
      buttonNext.classList.add("hide");
      buttonNextTwo.classList.add("hide");
      targetGroup.classList.remove("hiden");
      cardsHeight.classList.add("height");
    });
  });

  removeHidenButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const targetGroup = event.currentTarget.closest(".hiden-cards");
      targetGroup.classList.add("hiden");
      cardsBox.classList.remove("hide");
      buttonNext.classList.remove("hide");
      buttonNextTwo.classList.remove("hide");
      cardsHeight.classList.remove("height");
    });
  });
}

renderAllCards();

const counterContainer = document.querySelector(".shop-counter");
const inputField = counterContainer.querySelector(".shop-count");
const counterValue = document.querySelector(".counter-value");
const priseValue = document.querySelector(".prise-value");

function updateCounterValues() {
  const cards = document.querySelectorAll(".hiden-cards");

  cards.forEach((card) => {
    const inputField = card.querySelector(".shop-count");
    const counterValue = card.querySelector(".counter-value");
    const priseValue = card.querySelector(".prise-value");
    const countPlusButton = card.querySelector(".count-plus");
    const stock = parseInt(
      card.querySelector(".card-item.stock").dataset.stock,
      10
    );

    if (inputField && priseValue) {
      const quantity = parseInt(inputField.value, 10);
      const price = parseFloat(priseValue.textContent);
      const sum = quantity * price;
      counterValue.textContent = sum.toFixed(2); // Зазначаємо два десяткових знаки

      if (quantity >= stock) {
        countPlusButton.disabled = true;
      } else {
        countPlusButton.disabled = false;
      }
    }
  });
}

const CounterValue = document
  .querySelector(".hiden-cards-box")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("count-plus")) {
      const inputField = event.target.previousElementSibling;
      let currentValue = parseInt(inputField.value, 10);
      const stock = parseInt(
        inputField.closest(".hiden-cards").querySelector(".card-item.stock")
          .dataset.stock,
        10
      );

      if (currentValue < stock) {
        inputField.value = currentValue + 1;
      }
    }

    if (event.target.classList.contains("count-minus")) {
      const inputField = event.target.nextElementSibling;
      let currentValue = parseInt(inputField.value, 10);
      if (currentValue > 0) {
        inputField.value = currentValue - 1;
      }
    }

    if (event.target.classList.contains("remove-hiden")) {
      const targetGroup = event.target.closest(".hiden-cards");
      targetGroup.classList.add("hiden");
      document.querySelector(".cards-box").classList.remove("hide");
      document.querySelector(".hiden-cards-box").classList.remove("height");

      const inputField = targetGroup.querySelector(".shop-count");
      if (inputField) {
        inputField.value = 1;
      }
    }

    updateCounterValues();
  });

const resetButton = document.querySelector(".search-reset");

resetButton.addEventListener("click", function () {
  searchInput.value = "";
  minPriceInput.value = 1000;
  maxPriceInput.value = 24000;
  rangeInputs[0].value = 1000;
  rangeInputs[1].value = 24000;

  availabilityCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  brandCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  seriesCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  modelCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  countryCheckboxes.forEach((checkbox) => (checkbox.checked = false));
  colorCheckboxes.forEach((checkbox) => (checkbox.checked = false));

  const cardsBox = document.querySelector(".cards-box");
  const cardsHeight = document.querySelector(".hiden-cards-box");
  const hiddenCards = document.querySelectorAll(".hiden-cards");
  const shopCardsbox = document.querySelector(".shop-cards-box");
  const buttonNext = document.querySelector(".button-next");
  const buttonNextTwo = document.querySelector(".button-next2");

  cardsBox.classList.remove("hide");
  cardsHeight.classList.remove("height");
  buttonNext.classList.remove("hide");
  buttonNextTwo.classList.remove("hide");
  shopCardsbox.classList.remove("more-height");
  shopCardsbox.classList.remove("more-height2");
  hiddenCards.forEach((card) => card.classList.add("hiden"));

  updateCardsDisplay(shopCards);
});

// localStorage.setItem("shopCards", JSON.stringify(shopCards));
