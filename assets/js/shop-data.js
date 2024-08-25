const shopCards = [
  {
    id: 1,
    img: "assets/img/tamplate.png",
    dataSearchName: "search-names",
    searchName: "Якісний товар",
    dataPrice: "price",
    price: "9999",
    cardDescript:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ea voluptates eius, molestiae dolor voluptas quis tenetur, natus commodi nobis cum neque sed repellendus, soluta corrupti. Porro sit itaque, eos et non corporis veniam iste, sapiente, unde aperiam nisi optio nam laboriosam sunt fuga molestiae natus sequi. Quas, a cum!",
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
  {
    id: 2,
    img: "assets/img/tamplate.png",
    dataSearchName: "search-names",
    searchName: "Гарний товар",
    dataPrice: "price",
    price: "7500",
    cardDescript:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ea voluptates eius, molestiae dolor voluptas quis tenetur, natus commodi nobis cum neque sed repellendus, soluta corrupti. Porro sit itaque, eos et non corporis veniam iste, sapiente, unde aperiam nisi optio nam laboriosam sunt fuga molestiae natus sequi. Quas, a cum!",
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
  {
    id: 3,
    img: "assets/img/tamplate.png",
    dataSearchName: "search-names",
    searchName: "Дуже якісний товар",
    dataPrice: "price",
    price: "11000",
    cardDescript:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ea voluptates eius, molestiae dolor voluptas quis tenetur, natus commodi nobis cum neque sed repellendus, soluta corrupti. Porro sit itaque, eos et non corporis veniam iste, sapiente, unde aperiam nisi optio nam laboriosam sunt fuga molestiae natus sequi. Quas, a cum!",
    dataBrand: "brand-1",
    brand: "Виробник 1",
    dataSeries: "series-3",
    series: "Якась серія 3",
    dataModel: "model-2",
    model: "Якась модель 2",
    dataCountry: "country-3",
    country: "Якась країна 3",
    dataColor: "color-3",
    color: "Якийсь колір 3",
    stock: 50,
  },
  {
    id: 4,
    img: "assets/img/tamplate.png",
    dataSearchName: "search-names",
    searchName: "Дорогий та якісний товар",
    dataPrice: "price",
    price: "18000",
    cardDescript:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ea voluptates eius, molestiae dolor voluptas quis tenetur, natus commodi nobis cum neque sed repellendus, soluta corrupti. Porro sit itaque, eos et non corporis veniam iste, sapiente, unde aperiam nisi optio nam laboriosam sunt fuga molestiae natus sequi. Quas, a cum!",
    dataBrand: "brand-4",
    brand: "Виробник 4",
    dataSeries: "series-1",
    series: "Якась серія 1",
    dataModel: "model-2",
    model: "Якась модель 2",
    dataCountry: "country-3",
    country: "Якась країна 3",
    dataColor: "color-others",
    color: "Інший колір",
    stock: 10,
  },
  {
    id: 5,
    img: "assets/img/tamplate.png",
    dataSearchName: "search-names",
    searchName: "Дешевий товар",
    dataPrice: "price",
    price: "5000",
    cardDescript:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit ea voluptates eius, molestiae dolor voluptas quis tenetur, natus commodi nobis cum neque sed repellendus, soluta corrupti. Porro sit itaque, eos et non corporis veniam iste, sapiente, unde aperiam nisi optio nam laboriosam sunt fuga molestiae natus sequi. Quas, a cum!",
    dataBrand: "brand-4",
    brand: "Виробник 4",
    dataSeries: "series-1",
    series: "Якась серія 1",
    dataModel: "model-6",
    model: "Якась модель 6",
    dataCountry: "country-2",
    country: "Якась країна 2",
    dataColor: "color-2",
    color: "Якийсь колір 2",
    stock: 0,
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

localStorage.setItem("shopCards", JSON.stringify(shopCards));
