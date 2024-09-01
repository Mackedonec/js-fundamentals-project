let storedCards = JSON.parse(localStorage.getItem("shopBasket")) || [];
let shopBasket = [].concat(storedCards);

function renderItem(shopBasket) {
  let itemHtml = "";
  for (const item of shopBasket) {
    const totalValue = item.quantity * item.price;
    itemHtml += `
    <div class="basket-item" data-item="${item.id}">
      <div class="item-img-box">
        <img class="item-img" src="${item.img}" alt="" />
      </div>
      <p class="item-name">${item.searchName}</p>
      <div class="item-counter">
        <button class="count-minus">-</button>
        <input
          type="number"
          class="item-count"
          value="${item.quantity || 1}"
          data-count="item-count-${item.id}"
        />
        <button class="count-plus"${
          item.quantity === item.stock ? " disabled" : ""
        }>+</button>
        <p class="counter-value">${totalValue}</p>
        <button class="remove-item" data-id="${item.id}">Видалити</button>
      </div>
    </div>
    `;
  }
  const itemContainer = document.querySelector(".basket-items-box");
  itemContainer.innerHTML = itemHtml;

  updateTotalPrice();
}

renderItem(shopBasket);

const addItemButtons = document.querySelectorAll(".add-item");
addItemButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const cardId = parseInt(
      event.currentTarget.closest(".hiden-cards").dataset.card,
      10
    );
    location.reload();
    addToBasket(cardId);
  });
});

function addToBasket(cardId) {
  let storedCards = JSON.parse(localStorage.getItem("shopCards")) || [];
  let cardToAdd = storedCards.find((card) => card.id === cardId);

  if (!cardToAdd) return;

  let shopBasket = JSON.parse(localStorage.getItem("shopBasket")) || [];
  let basketItem = shopBasket.find((item) => item.id === cardId);

  if (basketItem) {
    basketItem.quantity += cardToAdd.currentValue || 1;
  } else {
    cardToAdd.quantity = cardToAdd.currentValue || 1;
    shopBasket.push(cardToAdd);
  }

  localStorage.setItem("shopBasket", JSON.stringify(shopBasket));
  updateBasketCounter();
  renderItem(shopBasket);
}

function updateBasketCounter() {
  let shopBasket = JSON.parse(localStorage.getItem("shopBasket")) || [];
  const imgCounter = document.querySelector(".img-counter");
  imgCounter.innerText = shopBasket.length;
}

updateBasketCounter();

function removeFromBasket(cardId) {
  let shopBasket = JSON.parse(localStorage.getItem("shopBasket")) || [];
  shopBasket = shopBasket.filter((item) => item.id !== cardId);
  localStorage.setItem("shopBasket", JSON.stringify(shopBasket));
  renderItem(shopBasket);
  updateBasketCounter();
}

document
  .querySelector(".basket-items-box")
  .addEventListener("click", function (event) {
    const target = event.target;
    let currentValue;
    let cardId;

    if (target.classList.contains("count-plus")) {
      const inputField = target.previousElementSibling;
      currentValue = parseInt(inputField.value, 10);
      cardId = parseInt(inputField.dataset.count.split("-")[2], 10);

      const item = shopBasket.find((item) => item.id === cardId);
      const stock = item ? item.stock : null;

      if (stock !== null) {
        if (currentValue < stock) {
          currentValue++;
          inputField.value = currentValue;
          updateItemQuantity(cardId, currentValue);
        } else {
          inputField.value = stock;
          updateItemQuantity(cardId, stock);
        }
      } else {
        currentValue++;
        inputField.value = currentValue;
        updateItemQuantity(cardId, currentValue);
      }
    }

    if (target.classList.contains("count-minus")) {
      const inputField = target.nextElementSibling;
      currentValue = parseInt(inputField.value, 10);
      cardId = parseInt(inputField.dataset.count.split("-")[2], 10);

      if (currentValue > 1) {
        currentValue--;
        inputField.value = currentValue;
        updateItemQuantity(cardId, currentValue);
      }
    }

    if (target.classList.contains("remove-item")) {
      cardId = parseInt(target.dataset.id, 10);
      removeFromBasket(cardId);
    }
  });

function updateItemQuantity(cardId, newQuantity) {
  let shopBasket = JSON.parse(localStorage.getItem("shopBasket")) || [];
  let item = shopBasket.find((item) => item.id === cardId);

  if (item) {
    item.quantity = newQuantity;
    localStorage.setItem("shopBasket", JSON.stringify(shopBasket));
    updateBasketCounter();

    const counterValue = document.querySelector(
      `.basket-item[data-item="${cardId}"] .counter-value`
    );
    if (counterValue) {
      const totalValue = item.quantity * item.price;
      counterValue.textContent = totalValue;
    }

    updateTotalPrice();

    const countPlusButton = document.querySelector(
      `.basket-item[data-item="${cardId}"] .count-plus`
    );
    if (countPlusButton) {
      const stock = item.stock;
      if (item.quantity >= stock) {
        countPlusButton.disabled = true;
      } else {
        countPlusButton.disabled = false;
      }
    }
  }
}

function updateTotalPrice() {
  let shopBasket = JSON.parse(localStorage.getItem("shopBasket")) || [];
  let totalPrice = 0;

  if (shopBasket.length > 0) {
    for (const item of shopBasket) {
      totalPrice += item.quantity * item.price;
    }
  }

  const totalPriceElement = document.querySelector(".total-price");
  const basketReglog = document.querySelector(".basket-reglog");

  if (shopBasket.length === 0) {
    totalPriceElement.textContent = `Корзина пуста`;
    basketReglog.classList.add("hide");
  } else {
    totalPriceElement.textContent = `Загальна вартість: ${totalPrice} грн`;
  }
}

console.table(JSON.parse(localStorage.getItem("shopBasket")));
