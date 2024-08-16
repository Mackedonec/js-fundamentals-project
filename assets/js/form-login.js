const logForm = document.querySelector("#log-form");

const logFields = [
  {
    element: document.querySelector(".usernamelog"),
    text: document.querySelector(".usernamelog-text"),
    defaultText: document.querySelector(".usernamelog-text").innerText,
  },
  {
    element: document.querySelector(".passwordlog"),
    text: document.querySelector(".passwordlog-text"),
    defaultText: document.querySelector(".passwordlog-text").innerText,
  },
];

logForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = true;

  const logUsername = document
    .querySelector('input[name="usernamelog"]')
    .value.trim()
    .toLowerCase();
  const logPassword = document
    .querySelector('input[name="passwordlog"]')
    .value.trim();

  const regData = JSON.parse(localStorage.getItem("registrationData")) || [];

  const userData = regData.find(
    (data) => data.username.trim().toLowerCase() === logUsername
  );

  if (!logUsername) {
    logFields[0].element.classList.remove("success");
    logFields[0].element.classList.add("error");
    logFields[0].text.innerText = "Помилка. Введіть логін";
    valid = false;
  } else if (!userData) {
    logFields[0].element.classList.remove("success");
    logFields[0].element.classList.add("error");
    logFields[0].text.innerText = "Помилка. Неправильний логін";
    valid = false;
  } else {
    logFields[0].element.classList.remove("error");
    logFields[0].element.classList.add("success");
    logFields[0].text.innerText = "Поле заповнене правильно";
  }

  if (!logPassword) {
    logFields[1].element.classList.remove("success");
    logFields[1].element.classList.add("error");
    logFields[1].text.innerText = "Помилка. Введіть пароль";
    valid = false;
  } else if (userData && userData.password.trim() !== logPassword) {
    logFields[1].element.classList.remove("success");
    logFields[1].element.classList.add("error");
    logFields[1].text.innerText = "Помилка. Неправильний пароль";
    valid = false;
  } else if (!userData) {
    logFields[1].element.classList.remove("success");
    logFields[1].element.classList.add("error");
    logFields[1].text.innerText = "Помилка. Спочатку введіть правильний логін";
    valid = false;
  } else {
    logFields[1].element.classList.remove("error");
    logFields[1].element.classList.add("success");
    logFields[1].text.innerText = "Поле заповнене правильно";
  }

  if (valid) {
    const loggedInUser = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      password: userData.password,
      email: userData.email,
    };

    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    let count = 5;

    const closeButton = document.querySelector(".closedlog");
    closeButton.disabled = true;
    closeButton.classList.add("disabled");

    const closedText = document.querySelector(".closedtext-log");
    closedText.innerHTML = `Данні заповнено вірно.
    Вхід завершиться через <span class="closed-timer">${count}</span> секунд`;

    const timer = document.querySelector(".closed-timer");

    const intervalId = setInterval(function () {
      timer.innerText = count;
      count--;

      if (count < 0) {
        clearInterval(intervalId);
        logForm.submit();
      }
    }, 1000);
  }
});

logForm.addEventListener("reset", function () {
  logFields.forEach((field) => {
    field.element.classList.remove("error", "success");
    field.text.innerText = field.defaultText;
  });
});

const data = JSON.parse(localStorage.getItem("loggedInUser"));
console.table(data);

const logoutButton = document.querySelector(".guest-exit");

logoutButton.addEventListener("click", function () {
  localStorage.removeItem("loggedInUser");
  location.reload();
});
