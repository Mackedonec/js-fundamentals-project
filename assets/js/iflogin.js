import { bottonReqVisible, bottonLogVisible } from "./guest-nav.js";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  const userNameElement = document.querySelector(".guest-name");
  const userButtomExit = document.querySelector(".guest-exit");
  const formEdit = document.querySelector(".form-edit-wrapper");
  const main = document.querySelector(".main");
  const headerNav = document.querySelector(".header-nav");

  if (userNameElement) {
    bottonReqVisible.classList.add("hide");
    bottonLogVisible.classList.add("hide");
    userNameElement.innerText = `${loggedInUser.firstname}`;
    userButtomExit.classList.add("block");
  }
  if (loggedInUser.username === "Administrator") {
    main.classList.add("hide");
    // headerNav.classList.add("hide");
    formEdit.classList.remove("hide");
  }
}
