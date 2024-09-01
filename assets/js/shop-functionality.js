const buttonNext = document.querySelector(".button-next");
const buttonNextTwo = document.querySelector(".button-next2");
const shopCardsbox = document.querySelector(".shop-cards-box");
const closeEditor = document.querySelector(".close-editor");
const main = document.querySelector(".main");
const headerNav = document.querySelector(".header-nav");
const formEdit = document.querySelector(".forms-editor-wrapper");
const guestImgWrapper = document.querySelector(".guest-img-wrapper");
const shopBasketWapper = document.querySelector(".shop-basket-wrapper");
const bottonReq = document.querySelector(".registration");
const bottonLog = document.querySelector(".enter");
const footer = document.querySelector(".footer");
const formRegVisible = document.querySelector(".formreq-box");
const formLogVisible = document.querySelector(".formlog-box");
const basketClosed = document.querySelector(".basket-closed");
const bottonRegUnVisible = document.querySelector(".closedreg");
const bottonLogUnVisible = document.querySelector(".closedlog");
const bottonReqVisible = document.querySelector(".guest-registration");
const bottonLogVisible = document.querySelector(".guest-enter");
// const cardWrapper = document.querySelector(".card-wrapper ");

// cardWrapper.addEventListener("click", function () {
//   location.reload();
// });

bottonReqVisible.addEventListener("click", function () {
  formRegVisible.classList.add("visible");
  main.classList.add("hide");
  footer.classList.add("hide");
});

bottonLogVisible.addEventListener("click", function () {
  formLogVisible.classList.add("visible");
  main.classList.add("hide");
  footer.classList.add("hide");
});

bottonRegUnVisible.addEventListener("click", function () {
  formRegVisible.classList.remove("visible");
  main.classList.remove("hide");
  footer.classList.add("hide");
  shopBasketWapper.classList.add("hide");
});

bottonLogUnVisible.addEventListener("click", function () {
  formLogVisible.classList.remove("visible");
  main.classList.remove("hide");
  footer.classList.add("hide");
  shopBasketWapper.classList.add("hide");
});

basketClosed.addEventListener("click", function () {
  main.classList.remove("hide");
  headerNav.classList.remove("hide");
  shopBasketWapper.classList.add("hide");
});

guestImgWrapper.addEventListener("click", function () {
  main.classList.add("hide");
  headerNav.classList.add("hide");
  shopBasketWapper.classList.remove("hide");
});

bottonReq.addEventListener("click", function () {
  formRegVisible.classList.add("visible");
  main.classList.add("hide");
  footer.classList.add("hide");
  shopBasketWapper.classList.add("hide");
  headerNav.classList.remove("hide");
});

bottonLog.addEventListener("click", function () {
  formLogVisible.classList.add("visible");
  main.classList.add("hide");
  footer.classList.add("hide");
  shopBasketWapper.classList.add("hide");
  headerNav.classList.remove("hide");
});

closeEditor.addEventListener("click", function () {
  main.classList.remove("hide");
  headerNav.classList.remove("hide");
  formEdit.classList.add("hide");
});

buttonNext.addEventListener("click", function () {
  shopCardsbox.classList.add("more-height");
});

buttonNextTwo.addEventListener("click", function () {
  shopCardsbox.classList.add("more-height2");
});

const headers = document.querySelectorAll(".search-group-header");

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
