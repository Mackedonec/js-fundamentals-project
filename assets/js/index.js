async function init() {
  await import("./shop-data.js");
  await import("./guest-nav.js");
  await import("./form-registr.js");
  await import("./form-login.js");
  await import("./iflogin.js");
  await import("./shop-edit.js");
  await import("./shop-functionality.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});
