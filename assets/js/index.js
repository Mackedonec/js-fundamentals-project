function init() {
  import("./guest-nav.js");
  import("./form-registr.js");
  import("./form-login.js");
  import("./iflogin.js");
  import("./shop-search.js");
  import("./shop-data.js");
}

const totalPartials = document.querySelectorAll(
  '[hx-trigger="load"], [data-hx-trigger="load"]'
).length;
let loadedPartialsCount = 0;

document.body.addEventListener("htmx:afterOnLoad", () => {
  loadedPartialsCount++;
  if (loadedPartialsCount === totalPartials) init();
});

// import("./guest-nav.js");
// import("./form-registr.js");
// import("./form-login.js");
