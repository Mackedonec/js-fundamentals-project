import { bottonReqVisible, bottonLogVisible } from "./guest-nav.js";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  const userNameElement = document.querySelector(".guest-name");
  const userButtomExit = document.querySelector(".guest-exit");
  const formEdit = document.querySelector(".forms-editor-wrapper");
  const main = document.querySelector(".main");
  const headerNav = document.querySelector(".header-nav");
  const cardEeditor = document.querySelector(".card-editor");

  if (userNameElement) {
    bottonReqVisible.classList.add("hide");
    bottonLogVisible.classList.add("hide");
    userNameElement.innerText = `${loggedInUser.firstname}`;
    userButtomExit.classList.add("block");
  }
  if (loggedInUser.username === "Administrator") {
    cardEeditor.classList.remove("hide");

    cardEeditor.addEventListener("click", function () {
      main.classList.add("hide");
      headerNav.classList.add("hide");
      formEdit.classList.remove("hide");
    });
  }
}
