let storedCards = JSON.parse(localStorage.getItem("shopCards")) || [];

let shopCards = [].concat(storedCards);

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
            <h3 class="card-item name">
              ${card.searchName} (${card.brand}, ${card.series}, ${card.model})
            </h3>
            <p class="card-item stock ${card.dataStock}" data-stock="${card.stock}">${card.stockName}</p>
            <p class="card-item available" >Залишок ${card.stock} од.</p>
            <p class="card-item prise">
              ціна: <span>${card.price}</span>
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
              <h3 class="card-item name">
                ${card.searchName} (${card.brand}, ${card.series}, ${card.model})
              </h3>
              <p class="card-item descript">
                ${card.cardDescript}
              </p>
              <p class="card-item stock ${card.dataStock}" data-stock="${card.stock}">${card.stockName}</p>
              <p class="card-item available">Залишок ${card.stock} од.</p>
              <p class="card-item prise">
                ціна: <span class="prise-value">${card.price}</span>
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
            <button class="count-minus">-</button>
            <input
              type="number"
              class="shop-count"
              value="0"
              data-count="shop-count-${card.id}"
            />
             <button class="count-plus ">+</button>
             <p class="counter-value">${card.price}</p>
          </div>
          <button class="add-item button" disabled>Купити</button>
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
  // renderHidenCard(shopCards);
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
  // renderHidenCard(filteredCards);
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

function updateCounterValues() {
  const cards = document.querySelectorAll(".hiden-cards");

  cards.forEach((card) => {
    const inputField = card.querySelector(".shop-count");
    const countPlusButton = card.querySelector(".count-plus");
    const addItemButton = card.querySelector(".add-item");
    const counterValue = card.querySelector(".counter-value");

    if (inputField) {
      const stock = parseInt(
        card.querySelector(".card-item.stock").dataset.stock,
        10
      );
      const price = parseInt(
        card.querySelector(".prise-value").textContent,
        10
      );

      if (stock === 0) {
        inputField.value = 0;
        countPlusButton.disabled = true;
        addItemButton.disabled = true;
      } else {
        const quantity = parseInt(inputField.value, 10);
        countPlusButton.disabled = quantity >= stock;
        addItemButton.disabled = quantity > stock || quantity <= 0;

        const total = price * quantity;
        counterValue.textContent = total.toString();
      }
    }
  });
}

const CounterValue = document
  .querySelector(".hiden-cards-box")
  .addEventListener("click", function (event) {
    let currentValue;
    let cardId;

    if (event.target.classList.contains("count-plus")) {
      const inputField = event.target.previousElementSibling;
      currentValue = parseInt(inputField.value, 10);
      cardId = inputField.dataset.count.split("-")[2];
      const stock = parseInt(
        inputField.closest(".hiden-cards").querySelector(".card-item.stock")
          .dataset.stock,
        10
      );

      if (currentValue < stock) {
        currentValue++;
        inputField.value = currentValue;
      }
    }

    if (event.target.classList.contains("count-minus")) {
      const inputField = event.target.nextElementSibling;
      currentValue = parseInt(inputField.value, 10);
      cardId = inputField.dataset.count.split("-")[2];
      if (currentValue > 0) {
        currentValue--;
        inputField.value = currentValue;
      }
    }

    if (typeof currentValue !== "undefined" && typeof cardId !== "undefined") {
      const cardIndex = shopCards.findIndex(
        (card) => card.id === parseInt(cardId)
      );

      if (cardIndex !== -1) {
        shopCards[cardIndex].currentValue = currentValue;
        saveToLocalStorage("shopCards", shopCards);
      }
    }

    if (event.target.classList.contains("remove-hiden")) {
      const targetGroup = event.target.closest(".hiden-cards");
      targetGroup.classList.add("hiden");
      document.querySelector(".cards-box").classList.remove("hide");
      document.querySelector(".hiden-cards-box").classList.remove("height");

      const inputField = targetGroup.querySelector(".shop-count");
      if (inputField) {
        inputField.value = 0;

        const cardId = targetGroup.dataset.card;
        const cardIndex = shopCards.findIndex(
          (card) => card.id === parseInt(cardId)
        );

        if (cardIndex !== -1) {
          shopCards[cardIndex].currentValue = 1;
          saveToLocalStorage("shopCards", shopCards);
        }
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

function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

saveToLocalStorage("shopCards", shopCards);

function updateCardsAfterAdd() {
  shopCards = JSON.parse(localStorage.getItem("shopCards")) || [];
  renderAllCards();
  renderHidenCard(shopCards);
}

const formEdit = document
  .getElementById("submit-edit")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let valid = true;

    function getBrand(dataBrandInput) {
      switch (dataBrandInput) {
        case "brand-1":
          return "Виробник 1";
        case "brand-2":
          return "Виробник 2";
        case "brand-3":
          return "Виробник 3";
        case "brand-4":
          return "Виробник 4";
        case "brand-5":
          return "Виробник 5";
        default:
          return "Інший виробник";
      }
    }

    function getSeries(dataSeriesInput) {
      switch (dataSeriesInput) {
        case "series-1":
          return "Якась серія 1";
        case "series-2":
          return "Якась серія 2";
        case "series-3":
          return "Якась серія 3";
        default:
          return "Інша серія";
      }
    }

    function getModel(dataModelInput) {
      switch (dataModelInput) {
        case "model-1":
          return "Якась модель 1";
        case "model-2":
          return "Якась модель 2";
        case "model-3":
          return "Якась модель 3";
        case "model-4":
          return "Якась модель 4";
        case "model-5":
          return "Якась модель 5";
        case "model-6":
          return "Якась модель 6";
        default:
          return "Інша модель";
      }
    }

    function getCountry(dataCountryInput) {
      switch (dataCountryInput) {
        case "country-1":
          return "Якась країна 1";
        case "country-2":
          return "Якась країна 2";
        case "country-3":
          return "Якась країна 3";
        case "country-4":
          return "Якась країна 4";
        default:
          return "Інша країна";
      }
    }

    function getColor(dataColorInput) {
      switch (dataColorInput) {
        case "color-1":
          return "Якийсь колір 1";
        case "color-2":
          return "Якийсь колір 2";
        case "color-3":
          return "Якийсь колір 3";
        default:
          return "Інший колір";
      }
    }

    function getStockStatus(stockInput) {
      if (stockInput >= 25) {
        return { dataStock: "in-stock", stockName: "Є в наявності" };
      } else if (stockInput > 0) {
        return { dataStock: "wait-stock", stockName: "Товар закінчується" };
      } else {
        return { dataStock: "out-stock", stockName: "Товар закінчився" };
      }
    }

    const idInput = document.querySelector("#id-edit").value;
    const imgInput = document.querySelector("#img-edit").value;
    const searchNameInput = document.querySelector("#searchName-edit").value;
    const priceInput = document.querySelector("#price-edit").value;
    const cardDescriptInput =
      document.querySelector("#cardDescript-edit").value;
    const dataBrandInput = document.querySelector("#dataBrand-edit").value;
    const dataSeriesInput = document.querySelector("#dataSeries-edit").value;
    const dataModelInput = document.querySelector("#dataModel-edit").value;
    const dataCountryInput = document.querySelector("#dataCountry-edit").value;
    const dataColorInput = document.querySelector("#dataColor-edit").value;
    const stockInput = parseInt(
      document.querySelector("#stock-edit").value,
      10
    );

    if (!idInput) {
      valid = false;
    }

    if (!imgInput) {
      valid = false;
    }

    if (!searchNameInput) {
      valid = false;
    }

    if (!priceInput) {
      valid = false;
    }

    if (!cardDescriptInput) {
      valid = false;
    }

    if (!dataBrandInput) {
      valid = false;
    }

    if (!dataSeriesInput) {
      valid = false;
    }

    if (!dataModelInput) {
      valid = false;
    }

    if (!dataCountryInput) {
      valid = false;
    }

    if (!dataColorInput) {
      valid = false;
    }

    if (stockInput === "") {
      valid = false;
    }

    if (valid) {
      const existingCardIndex = shopCards.findIndex(
        (card) => card.id === parseInt(idInput, 10)
      );

      shopCards[existingCardIndex] = {
        id: shopCards[existingCardIndex].id,
        img: imgInput,
        searchName: searchNameInput,
        price: parseInt(priceInput, 10),
        cardDescript: cardDescriptInput,
        dataBrand: dataBrandInput,
        brand: getBrand(dataBrandInput),
        dataSeries: dataSeriesInput,
        series: getSeries(dataSeriesInput),
        dataModel: dataModelInput,
        model: getModel(dataModelInput),
        dataCountry: dataCountryInput,
        country: getCountry(dataCountryInput),
        dataColor: dataColorInput,
        color: getColor(dataColorInput),
        stock: stockInput,
        ...getStockStatus(stockInput),
      };

      localStorage.setItem("shopCards", JSON.stringify(shopCards));
      renderAllCards();
      renderHidenCard(shopCards);
    }
  });

document
  .getElementById("submit-add")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let valid = true;

    function getBrand(dataBrandInput) {
      switch (dataBrandInput) {
        case "brand-1":
          return "Виробник 1";
        case "brand-2":
          return "Виробник 2";
        case "brand-3":
          return "Виробник 3";
        case "brand-4":
          return "Виробник 4";
        case "brand-5":
          return "Виробник 5";
        default:
          return "Інший виробник";
      }
    }

    function getSeries(dataSeriesInput) {
      switch (dataSeriesInput) {
        case "series-1":
          return "Якась серія 1";
        case "series-2":
          return "Якась серія 2";
        case "series-3":
          return "Якась серія 3";
        default:
          return "Інша серія";
      }
    }

    function getModel(dataModelInput) {
      switch (dataModelInput) {
        case "model-1":
          return "Якась модель 1";
        case "model-2":
          return "Якась модель 2";
        case "model-3":
          return "Якась модель 3";
        case "model-4":
          return "Якась модель 4";
        case "model-5":
          return "Якась модель 5";
        case "model-6":
          return "Якась модель 6";
        default:
          return "Інша модель";
      }
    }

    function getCountry(dataCountryInput) {
      switch (dataCountryInput) {
        case "country-1":
          return "Якась країна 1";
        case "country-2":
          return "Якась країна 2";
        case "country-3":
          return "Якась країна 3";
        case "country-4":
          return "Якась країна 4";
        default:
          return "Інша країна";
      }
    }

    function getColor(dataColorInput) {
      switch (dataColorInput) {
        case "color-1":
          return "Якийсь колір 1";
        case "color-2":
          return "Якийсь колір 2";
        case "color-3":
          return "Якийсь колір 3";
        default:
          return "Інший колір";
      }
    }

    function getStockStatus(stockInput) {
      if (stockInput >= 25) {
        return { dataStock: "in-stock", stockName: "Є в наявності" };
      } else if (stockInput > 0) {
        return { dataStock: "wait-stock", stockName: "Товар закінчується" };
      } else {
        return { dataStock: "out-stock", stockName: "Товар закінчився" };
      }
    }

    const idInput = document.querySelector("#id-add").value;
    const imgInput = document.querySelector("#img-add").value;
    const searchNameInput = document.querySelector("#searchName-add").value;
    const priceInput = document.querySelector("#price-add").value;
    const cardDescriptInput = document.querySelector("#cardDescript-add").value;
    const dataBrandInput = document.querySelector("#dataBrand-add").value;
    const dataSeriesInput = document.querySelector("#dataSeries-add").value;
    const dataModelInput = document.querySelector("#dataModel-add").value;
    const dataCountryInput = document.querySelector("#dataCountry-add").value;
    const dataColorInput = document.querySelector("#dataColor-add").value;
    const stockInput = parseInt(document.querySelector("#stock-add").value, 10);

    if (!imgInput) valid = false;
    if (!searchNameInput) valid = false;
    if (!priceInput) valid = false;
    if (!cardDescriptInput) valid = false;
    if (!dataBrandInput) valid = false;
    if (!dataSeriesInput) valid = false;
    if (!dataModelInput) valid = false;
    if (!dataCountryInput) valid = false;
    if (!dataColorInput) valid = false;
    if (stockInput === "") valid = false;

    const newCard = {
      id: parseInt(shopCards.length + 1, 10),
      img: imgInput,
      searchName: searchNameInput,
      price: parseInt(priceInput, 10),
      cardDescript: cardDescriptInput,
      dataBrand: dataBrandInput,
      brand: getBrand(dataBrandInput),
      dataSeries: dataSeriesInput,
      series: getSeries(dataSeriesInput),
      dataModel: dataModelInput,
      model: getModel(dataModelInput),
      dataCountry: dataCountryInput,
      country: getCountry(dataCountryInput),
      dataColor: dataColorInput,
      color: getColor(dataColorInput),
      stock: stockInput,
      ...getStockStatus(stockInput),
    };

    if (valid) {
      shopCards.push(newCard);
      localStorage.setItem("shopCards", JSON.stringify(shopCards));
      updateCardsAfterAdd();
    }
  });

localStorage.setItem("shopCards", JSON.stringify(shopCards));

console.table(JSON.parse(localStorage.getItem("shopCards")));

// localStorage.clear(shopCards);
