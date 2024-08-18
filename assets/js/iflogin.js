import { bottonReqVisible, bottonLogVisible } from "./guest-nav.js";

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  const userNameElement = document.querySelector(".guest-name");
  const userButtomExit = document.querySelector(".guest-exit");

  if (userNameElement) {
    bottonReqVisible.classList.add("hide");
    bottonLogVisible.classList.add("hide");
    userNameElement.innerText = `${loggedInUser.firstname}`;
    userButtomExit.classList.add("block");
  }
}
