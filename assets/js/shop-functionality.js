const headers = document.querySelectorAll(".search-group-header");
const cardsBox = document.querySelector(".cards-box");
const cardsWrapper = document.querySelectorAll(".card-wrapper");
const cardsHeight = document.querySelector(".hiden-card-box");
const counterContainer = document.querySelector(".shop-counter");
const removeHidenButtons = document.querySelectorAll(".remove-hiden");
const inputField = counterContainer.querySelector(".shop-count");
const plusButton = counterContainer.querySelector(".count-plus");
const minusButton = counterContainer.querySelector(".count-minus");

cardsWrapper.forEach((card) => {
  card.addEventListener("click", function (event) {
    const groupId = event.currentTarget.getAttribute("data-card");
    const targetGroup = document.querySelector(
      `.hiden-card[data-card="${groupId}"]`
    );
    cardsBox.classList.add("hide");
    targetGroup.classList.remove("hiden");
    cardsHeight.classList.add("height");
  });
});

removeHidenButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const targetGroup = event.currentTarget.closest(".hiden-card");
    targetGroup.classList.add("hiden");
    cardsBox.classList.remove("hide");
    cardsHeight.classList.remove("height");
    inputField.value = 1;
  });
});

plusButton.addEventListener("click", function () {
  inputField.value = parseInt(inputField.value) + 1;
});

minusButton.addEventListener("click", function () {
  const currentValue = parseInt(inputField.value);
  if (currentValue > 0) {
    inputField.value = currentValue - 1;
  }
});

headers.forEach((header) => {
  header.addEventListener("click", function (event) {
    const groupId = event.currentTarget.getAttribute("data-group");
    const targetGroup = document.querySelector(
      `.search-group[data-group="${groupId}"]`
    );

    event.currentTarget.classList.toggle("rotate");
    targetGroup.classList.toggle("invisible");
  });
});

const slider = (element) => {
  const slider = Boolean(element.classList)
    ? element
    : document.querySelector(selector);
  const rangeInput = slider.querySelectorAll(".range-input input");
  const priceInput = slider.querySelectorAll(".price-input input");
  const range = slider.querySelector(".slider .progress");

  let priceGap = 500;

  const updateRangeStyles = () => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);
    range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
  };

  priceInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = parseInt(priceInput[0].value),
        maxPrice = parseInt(priceInput[1].value);

      if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "input-min") {
          rangeInput[0].value = minPrice;
          updateRangeStyles();
        } else {
          rangeInput[1].value = maxPrice;
          updateRangeStyles();
        }
      }
    });
  });

  rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);

      if (maxVal - minVal < priceGap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxVal - priceGap;
        } else {
          rangeInput[1].value = minVal + priceGap;
        }
      } else {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
        updateRangeStyles();
      }
    });
  });

  const form = slider.closest("form");
  if (form) {
    form.addEventListener("reset", () => {
      setTimeout(() => {
        updateRangeStyles();
      }, 0);
    });
  }
};

document.querySelectorAll(".search-prise-element").forEach((n) => slider(n));
