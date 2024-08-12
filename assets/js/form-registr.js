const form = document.querySelector("#reg-form");

const fields = [
  {
    element: document.querySelector(".firstname"),
    text: document.querySelector(".firstname-text"),
    defaultText: document.querySelector(".firstname-text").innerText,
  },
  {
    element: document.querySelector(".lastname"),
    text: document.querySelector(".lastname-text"),
    defaultText: document.querySelector(".lastname-text").innerText,
  },
  {
    element: document.querySelector(".username"),
    text: document.querySelector(".username-text"),
    defaultText: document.querySelector(".username-text").innerText,
  },
  {
    element: document.querySelector(".password"),
    text: document.querySelector(".password-text"),
    defaultText: document.querySelector(".password-text").innerText,
  },
  {
    element: document.querySelector(".email"),
    text: document.querySelector(".email-text"),
    defaultText: document.querySelector(".email-text").innerText,
  },
];

function capitalizeFirstLetter(string) {
  return string
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = true;

  let guestFirstname = document.querySelector('input[name="firstname"]').value;
  let guestLastname = document.querySelector('input[name="lastname"]').value;
  const guestUsername = document.querySelector('input[name="username"]').value;
  const guestPassword = document.querySelector('input[name="password"]').value;
  const guestEmail = document.querySelector('input[name="email"]').value;

  guestFirstname = capitalizeFirstLetter(guestFirstname);
  guestLastname = capitalizeFirstLetter(guestLastname);

  const nameRegex = /^[\p{L}]{1,}$/u;
  const loginRegex = /^[\p{L}\p{N}_ ]{4,}$/u;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let allData = JSON.parse(localStorage.getItem("registrationData"));

  if (!Array.isArray(allData)) {
    allData = [];
  }

  if (nameRegex.test(guestFirstname) === false) {
    fields[0].element.classList.remove("success");
    fields[0].element.classList.add("error");
    fields[0].text.innerText = "Помилка. Має містити тільки літери";
    valid = false;
  } else {
    fields[0].element.classList.remove("error");
    fields[0].element.classList.add("success");
    fields[0].text.innerText = "Поле заповнене правильно";
  }

  if (nameRegex.test(guestLastname) === false) {
    fields[1].element.classList.remove("success");
    fields[1].element.classList.add("error");
    fields[1].text.innerText = "Помилка. Має містити тільки літери";
    valid = false;
  } else {
    fields[1].element.classList.remove("error");
    fields[1].element.classList.add("success");
    fields[1].text.innerText = "Поле заповнене правильно";
  }

  if (loginRegex.test(guestUsername) === false) {
    fields[2].element.classList.remove("success");
    fields[2].element.classList.add("error");
    fields[2].text.innerText =
      "Помилка. Може містити літери, цифри, пробіл, підкреслення та бути мінімум 4 символи";
    valid = false;
  } else if (allData.some((data) => data.username === guestUsername)) {
    fields[2].element.classList.remove("success");
    fields[2].element.classList.add("error");
    fields[2].text.innerText = "Це ім'я користувача вже зайнято";
    valid = false;
  } else {
    fields[2].element.classList.remove("error");
    fields[2].element.classList.add("success");
    fields[2].text.innerText = "Поле заповнене правильно";
  }

  if (passwordRegex.test(guestPassword) === false) {
    fields[3].element.classList.remove("success");
    fields[3].element.classList.add("error");
    fields[3].text.innerText =
      "Помилка. Тільки латиниця. Має містити велику літеру, цифру, спец.символ та бути мінімум 8 символів";
    valid = false;
  } else {
    fields[3].element.classList.remove("error");
    fields[3].element.classList.add("success");
    fields[3].text.innerText = "Поле заповнене правильно";
  }

  if (mailRegex.test(guestEmail) === false) {
    fields[4].element.classList.remove("success");
    fields[4].element.classList.add("error");
    fields[4].text.innerText = "Помилка. Має бути електронною поштою";
    valid = false;
  } else if (allData.some((data) => data.email === guestEmail)) {
    fields[4].element.classList.remove("success");
    fields[4].element.classList.add("error");
    fields[4].text.innerText = "Ця електронна адреса вже зайнята";
    valid = false;
  } else {
    fields[4].element.classList.remove("error");
    fields[4].element.classList.add("success");
    fields[4].text.innerText = "Поле заповнене правильно";
  }

  if (valid) {
    const registrationData = {
      firstname: guestFirstname,
      lastname: guestLastname,
      username: guestUsername,
      password: guestPassword,
      email: guestEmail,
    };

    allData.push(registrationData);

    localStorage.setItem("registrationData", JSON.stringify(allData));

    let count = 5;

    const closeButton = document.querySelector(".closed");
    closeButton.disabled = true;
    closeButton.classList.add("disabled");

    const closedText = document.querySelector(".closedtext");
    closedText.innerHTML = `Данні заповнено вірно.
    Реєстрація завершиться через <span class="closed-timer">${count}</span> секунд`;

    const timer = document.querySelector(".closed-timer");

    const intervalId = setInterval(function () {
      timer.innerText = count;
      count--;

      if (count < 0) {
        clearInterval(intervalId);
        form.submit();
      }
    }, 1000);
  }
});

form.addEventListener("reset", function () {
  fields.forEach((field) => {
    field.element.classList.remove("error", "success");
    field.text.innerText = field.defaultText;
  });
});

const data = JSON.parse(localStorage.getItem("registrationData"));
console.table(data);

// localStorage.clear();
