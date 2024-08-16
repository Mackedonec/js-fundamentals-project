const formRegVisible = document.querySelector(".formreq-box");
const formLogVisible = document.querySelector(".formlog-box");
const bottonRegUnVisible = document.querySelector(".closedreg");
const bottonLogUnVisible = document.querySelector(".closedlog");
const bottonReqVisible = document.querySelector(".guest-registration");
const bottonLogVisible = document.querySelector(".guest-enter");

bottonReqVisible.addEventListener("click", function () {
  formRegVisible.classList.add("visible");
});

bottonLogVisible.addEventListener("click", function () {
  formLogVisible.classList.add("visible");
});

bottonRegUnVisible.addEventListener("click", function () {
  formRegVisible.classList.remove("visible");
});

bottonLogUnVisible.addEventListener("click", function () {
  formLogVisible.classList.remove("visible");
});

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
  const userNameElement = document.querySelector(".guest-name");
  const userButtomExit = document.querySelector(".guest-cleare");
  if (userNameElement) {
    bottonReqVisible.classList.add("unvisible");
    bottonLogVisible.classList.add("unvisible");
    userNameElement.innerText = `${loggedInUser.firstname}`;
    userButtomExit.classList.add("block");
  }
}
