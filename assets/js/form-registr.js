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

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let valid = true;

  const guestFirstname = document.querySelector(
    'input[name="firstname"]'
  ).value;
  const guestLastname = document.querySelector('input[name="lastname"]').value;
  const guestUsername = document.querySelector('input[name="username"]').value;
  const guestPassword = document.querySelector('input[name="password"]').value;
  const guestEmail = document.querySelector('input[name="email"]').value;

  const existingData = JSON.parse(localStorage.getItem("registrationData"));

  if (existingData) {
    if (existingData.username === guestUsername) {
      fields[2].element.classList.add("error");
      fields[2].text.innerText = "Це ім'я користувача вже зайнято";
      valid = false;
    }
    if (existingData.email === guestEmail) {
      fields[4].element.classList.add("error");
      fields[4].text.innerText = "Ця електронна адреса вже зайнята";
      valid = false;
    }
  }

  // Перевірка полів форми
  if (guestFirstname === "") {
    fields[0].element.classList.add("error");
    fields[0].text.innerText = "error";
    valid = false;
  } else {
    fields[0].element.classList.remove("error");
    fields[0].element.classList.add("success");
    fields[0].text.innerText = "success";
  }

  if (guestLastname === "") {
    fields[1].element.classList.add("error");
    fields[1].text.innerText = "error";
    valid = false;
  } else {
    fields[1].element.classList.remove("error");
    fields[1].element.classList.add("success");
    fields[1].text.innerText = "success";
  }

  if (guestUsername === "") {
    fields[2].element.classList.add("error");
    fields[2].text.innerText = "error";
    valid = false;
  } else if (!fields[2].element.classList.contains("error")) {
    fields[2].element.classList.remove("error");
    fields[2].element.classList.add("success");
    fields[2].text.innerText = "success";
  }

  if (guestPassword === "") {
    fields[3].element.classList.add("error");
    fields[3].text.innerText = "error";
    valid = false;
  } else {
    fields[3].element.classList.remove("error");
    fields[3].element.classList.add("success");
    fields[3].text.innerText = "success";
  }

  if (guestEmail === "") {
    fields[4].element.classList.add("error");
    fields[4].text.innerText = "error";
    valid = false;
  } else if (!fields[4].element.classList.contains("error")) {
    fields[4].element.classList.remove("error");
    fields[4].element.classList.add("success");
    fields[4].text.innerText = "success";
  }

  if (valid) {
    const registrationData = {
      firstname: guestFirstname,
      lastname: guestLastname,
      username: guestUsername,
      password: guestPassword,
      email: guestEmail,
    };
    localStorage.setItem("registrationData", JSON.stringify(registrationData));

    let count = 5;

    const closeButton = document.querySelector(".closed");
    closeButton.disabled = true;
    closeButton.classList.add("disabled");

    const closedText = document.querySelector(".closedtext");
    closedText.innerHTML = `Реєстрація пройшла успішно.
    Форма закриється за <span class="closed-timer">${count}</span> секунд`;

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

// localStorage.clear();
