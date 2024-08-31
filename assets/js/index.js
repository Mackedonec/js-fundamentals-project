async function init() {
  await import("./shop-data.js");
  await import("./shop-functionality.js");
  await import("./shop-basket.js");
  await import("./guest-nav.js");
  await import("./form-registr.js");
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
