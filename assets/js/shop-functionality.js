const headers = document.querySelectorAll(".search-group-header");
const counterContainer = document.querySelector(".shop-counter");
const inputField = counterContainer.querySelector(".shop-count");
const buttonNext = document.querySelector(".button-next");
const buttonNextTwo = document.querySelector(".button-next2");
const shopCardsbox = document.querySelector(".shop-cards-box");

buttonNext.addEventListener("click", function () {
  shopCardsbox.classList.add("more-height");
});

buttonNextTwo.addEventListener("click", function () {
  shopCardsbox.classList.add("more-height2");
});

const shopCountButtons = document
  .querySelector(".hiden-cards-box")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("count-plus")) {
      const inputField = event.target.previousElementSibling;
      inputField.value = parseInt(inputField.value) + 1;
    }

    if (event.target.classList.contains("count-minus")) {
      const inputField = event.target.nextElementSibling;
      const currentValue = parseInt(inputField.value);
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
