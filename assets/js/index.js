async function init() {
  import("./shop-data.js");
  import("./shop-functionality.js");
  import("./shop-basket.js");
  import("./form-registr.js");
  await import("./form-login.js");
  await import("./iflogin.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
