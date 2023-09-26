import $ from "jquery";
import SlickSlider from "./components/slick";

$(() => {
  createInputFile();
  let slickSlider = new SlickSlider();

  prestashop.on("updatedProduct", function (event) {
    createInputFile();
    $($(".tabs .nav-link.active").attr("href"))
      .addClass("active")
      .removeClass("fade");
    $(".js-product-images-modal").replaceWith(event.product_images_modal);
    slickSlider.init();
  });

  function createInputFile() {
    $(".js-file-input").on("change", (event) => {
      let target, file;

      if ((target = $(event.currentTarget)[0]) && (file = target.files[0])) {
        $(target).prev().text(file.name);
      }
    });
  }
});

$(document).on("shown.bs.modal", "#product-modal", function () {
  $("#js-slick-product").resize();
});

//add to cart loader
$(document).on(
  "click",
  ".js-add-to-cart:enabled:not(.is--loading)",
  function () {
    $(this).addClass("is--loading").attr("disabled", true);
  },
);
prestashop.on("updateCart", function () {
  removeAddToCartLoader();
});
prestashop.on("handleError", function () {
  removeAddToCartLoader();
  $(".js-add-to-cart").attr("disabled", false);
});
function removeAddToCartLoader() {
  $(".js-add-to-cart.is--loading").removeClass("is--loading");
}
