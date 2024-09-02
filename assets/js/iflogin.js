const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  const userNameElement = document.querySelector(".guest-name");
  const userButtomExit = document.querySelector(".guest-exit");
  const formEdit = document.querySelector(".forms-editor-wrapper");
  const main = document.querySelector(".main");
  const headerNav = document.querySelector(".header-nav");
  const cardEeditor = document.querySelector(".card-editor");
  const basketReglog = document.querySelector(".basket-reglog");
  const bottonReqVisible = document.querySelector(".guest-registration");
  const bottonLogVisible = document.querySelector(".guest-enter");
  const basketComplete = document.querySelector(".basket-complete");

  if (userNameElement) {
    bottonReqVisible.classList.add("hide");
    bottonLogVisible.classList.add("hide");
    userNameElement.innerText = `${loggedInUser.firstname}`;
    userButtomExit.classList.add("block");
    basketReglog.classList.add("hide");
    basketComplete.classList.remove("hide");
  }
  if (loggedInUser.username === "Administrator") {
    cardEeditor.classList.remove("hide");

    cardEeditor.addEventListener("click", function () {
      main.classList.add("hide");
      headerNav.classList.add("hide");
      formEdit.classList.remove("hide");
      basketReglog.classList.add("hide");
    });
  }
}
