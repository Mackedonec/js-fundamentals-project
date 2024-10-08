function init() {
  import("./shop-data.js");
  import("./shop-basket.js");
  import("./form-registr.js");
  import("./form-login.js");
  import("./iflogin.js");
  import("./shop-functionality.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
