const cardsBox = document.querySelector(".cards-box");
const cards = document.querySelectorAll(".card-wrapper");
const removeHidenButtons = document.querySelectorAll(".remove-hiden");

cards.forEach((card) => {
  card.addEventListener("click", function (event) {
    const groupId = event.currentTarget.getAttribute("data-card");
    const targetGroup = document.querySelector(
      `.hiden-card[data-card="${groupId}"]`
    );
    cardsBox.classList.add("hide");
    targetGroup.classList.remove("hiden");
  });
});

removeHidenButtons.forEach((button) => {
  button.addEventListener("click", function (event) {
    const targetGroup = event.currentTarget.closest(".hiden-card");
    targetGroup.classList.add("hiden");
    cardsBox.classList.remove("hide");
  });
});
