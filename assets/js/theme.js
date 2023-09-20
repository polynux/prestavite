function loadTheme() {
  var themeScript = document.createElement("script");
  // check browser module support
  if (typeof window.Promise === "undefined") {
    themeScript.setAttribute("src", "/themes/prestavite/assets/js/prestavite.iife.js");
  } else {
    themeScript.setAttribute("src", "/themes/prestavite/assets/js/prestavite.es.js");
    themeScript.setAttribute("type", "module");
  }
  document.head.appendChild(themeScript);
}

document.addEventListener("DOMContentLoaded", function() {
  loadTheme();
});
