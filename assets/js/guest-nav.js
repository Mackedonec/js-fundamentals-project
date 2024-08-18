const formRegVisible = document.querySelector(".formreq-box");
const formLogVisible = document.querySelector(".formlog-box");
const bottonRegUnVisible = document.querySelector(".closedreg");
const bottonLogUnVisible = document.querySelector(".closedlog");
const bottonReqVisible = document.querySelector(".guest-registration");
const bottonLogVisible = document.querySelector(".guest-enter");
const main = document.querySelector(".main");
const footer = document.querySelector(".footer");

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
});

bottonLogUnVisible.addEventListener("click", function () {
  formLogVisible.classList.remove("visible");
  main.classList.remove("hide");
  footer.classList.add("hide");
});

export { bottonReqVisible, bottonLogVisible };
