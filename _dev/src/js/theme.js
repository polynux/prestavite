import "bootstrap/js/src/util";
import "bootstrap/js/src/alert";
import "bootstrap/js/src/button";
import "bootstrap/js/src/collapse";
import "bootstrap/js/src/dropdown";
import "bootstrap/js/src/modal";
import "bootstrap/js/src/popover";
import "bootstrap/js/src/tab";
import "bootstrap/js/src/toast";
import "bootstrap/js/src/tooltip";
import "./lib/slick.min";
import "./lib/jquery.hoverIntent.min";
import SlickSlider from "./components/slick";
//
import "./responsive";
import "./checkout";
import "./customer";
import "./listing";
import "./product";
import "./cart";
//
import Form from "./components/form";
import TopMenu from "./components/top-menu";
import "./components/block-cart";
import "lazysizes";

import "../css/theme.scss";

$(() => {
  const form = new Form();
  let slickSlider = new SlickSlider();
  let topMenuEl = $("#_desktop_top_menu #top-menu");
  let topMenu = new TopMenu(topMenuEl);

  form.init();
  slickSlider.init();
  topMenu.init();

  //display input file content in custom file input BS
  $(".custom-file-input").on("change", function () {
    let fileName = $(this).val().split("\\").pop();
    $(this).next(".custom-file-label").addClass("selected").html(fileName);
  });
});
document.addEventListener("lazyloaded", function (e) {
  $(e.target).parent().addClass("rc--lazyload");
});
