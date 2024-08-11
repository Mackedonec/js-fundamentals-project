const formRegVisible = document.querySelector(".form-box");
const formLogVisible = document.querySelector(".login-box");
const bottonUnVisible = document.querySelector(".closed");
const bottonReqVisible = document.querySelector(".guest-registration");
const bottonLogVisible = document.querySelector(".guest-enter");

bottonReqVisible.addEventListener("click", function () {
  formRegVisible.classList.add("visible");
});

bottonLogVisible.addEventListener("click", function () {
  formLogVisible.classList.add("visible");
});

bottonUnVisible.addEventListener("click", function () {
  formRegVisible.classList.remove("visible");
  bottonLogVisible.classList.remove("visible");
});
