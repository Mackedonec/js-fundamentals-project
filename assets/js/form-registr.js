const formreg = document.querySelector("#reg-form");

const fieldsreg = [
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

let regData = JSON.parse(localStorage.getItem("registrationData"));

if (!Array.isArray(regData)) {
  regData = [];
}

const administrator = {
  firstname: "Admin",
  lastname: "Admin",
  username: "Administrator",
  password: "T,bcbvfxrfnf187",
  email: "defaultuser@example.com",
};

const administratorExists = regData.some(
  (data) => data.username === administrator.username
);

if (!administratorExists) {
  regData.push(administrator);
  localStorage.setItem("registrationData", JSON.stringify(regData));
}

formreg.addEventListener("submit", function (event) {
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
    /^(?=.*\p{Lower})(?=.*\p{Upper})(?=.*\d)(?=.*[@$!%*?,.&])[\p{L}\p{N}@$!%*?,.&]{8,}$/u;
  const mailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nameRegex.test(guestFirstname) === false) {
    fieldsreg[0].element.classList.remove("success");
    fieldsreg[0].element.classList.add("error");
    fieldsreg[0].text.innerText = "Помилка. Має містити тільки літери";
    valid = false;
  } else {
    fieldsreg[0].element.classList.remove("error");
    fieldsreg[0].element.classList.add("success");
    fieldsreg[0].text.innerText = "Поле заповнене правильно";
  }

  if (nameRegex.test(guestLastname) === false) {
    fieldsreg[1].element.classList.remove("success");
    fieldsreg[1].element.classList.add("error");
    fieldsreg[1].text.innerText = "Помилка. Має містити тільки літери";
    valid = false;
  } else {
    fieldsreg[1].element.classList.remove("error");
    fieldsreg[1].element.classList.add("success");
    fieldsreg[1].text.innerText = "Поле заповнене правильно";
  }

  if (loginRegex.test(guestUsername) === false) {
    fieldsreg[2].element.classList.remove("success");
    fieldsreg[2].element.classList.add("error");
    fieldsreg[2].text.innerText =
      "Помилка. Може містити літери, цифри, пробіл, підкреслення та бути мінімум 4 символи";
    valid = false;
  } else if (regData.some((data) => data.username === guestUsername)) {
    fieldsreg[2].element.classList.remove("success");
    fieldsreg[2].element.classList.add("error");
    fieldsreg[2].text.innerText = "Помилка. Цей логін вже зайнятий";
    valid = false;
  } else {
    fieldsreg[2].element.classList.remove("error");
    fieldsreg[2].element.classList.add("success");
    fieldsreg[2].text.innerText = "Поле заповнене правильно";
  }

  if (passwordRegex.test(guestPassword) === false) {
    fieldsreg[3].element.classList.remove("success");
    fieldsreg[3].element.classList.add("error");
    fieldsreg[3].text.innerText =
      "Помилка. Має містити велику літеру, цифру, спец.символи @$!%*?,.& та бути мінімум 8 символів";
    valid = false;
  } else {
    fieldsreg[3].element.classList.remove("error");
    fieldsreg[3].element.classList.add("success");
    fieldsreg[3].text.innerText = "Поле заповнене правильно";
  }

  if (mailRegex.test(guestEmail) === false) {
    fieldsreg[4].element.classList.remove("success");
    fieldsreg[4].element.classList.add("error");
    fieldsreg[4].text.innerText = "Помилка. Має бути електронною поштою";
    valid = false;
  } else if (regData.some((data) => data.email === guestEmail)) {
    fieldsreg[4].element.classList.remove("success");
    fieldsreg[4].element.classList.add("error");
    fieldsreg[4].text.innerText = "Помилка. Ця електронна почта вже зайнята";
    valid = false;
  } else {
    fieldsreg[4].element.classList.remove("error");
    fieldsreg[4].element.classList.add("success");
    fieldsreg[4].text.innerText = "Поле заповнене правильно";
  }

  if (valid) {
    const registrationData = {
      firstname: guestFirstname,
      lastname: guestLastname,
      username: guestUsername,
      password: guestPassword,
      email: guestEmail,
    };

    regData.push(registrationData);

    localStorage.setItem("registrationData", JSON.stringify(regData));

    let count = 5;

    const closeButton = document.querySelector(".closedreg");
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
        formreg.submit();
      }
    }, 1000);
  }
});

formreg.addEventListener("reset", function () {
  fieldsreg.forEach((fieldsreg) => {
    fieldsreg.element.classList.remove("error", "success");
    fieldsreg.text.innerText = fieldsreg.defaultText;
  });
});

const data = JSON.parse(localStorage.getItem("registrationData"));
console.table(data);

// localStorage.removeItem("registrationData");
