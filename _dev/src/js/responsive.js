import $ from "jquery";

prestashop.responsive = prestashop.responsive || {};

prestashop.responsive.current_width = window.innerWidth;
prestashop.responsive.min_width = 992;
prestashop.responsive.mobile =
  prestashop.responsive.current_width < prestashop.responsive.min_width;

function swapChildren(obj1, obj2) {
  var temp = obj2.children().detach();
  obj2.empty().append(obj1.children().detach());
  obj1.append(temp);
}

function toggleMobileStyles() {
  if (prestashop.responsive.mobile) {
    $("*[id^='_desktop_']").each(function (_, el) {
      var target = $("#" + el.id.replace("_desktop_", "_mobile_"));
      if (target.length) {
        swapChildren($(el), target);
      }
    });
    $("[data-collapse-hide-mobile]").collapse("hide");
  } else {
    $("*[id^='_mobile_']").each(function (_, el) {
      var target = $("#" + el.id.replace("_mobile_", "_desktop_"));
      if (target.length) {
        swapChildren($(el), target);
      }
    });
    $("[data-collapse-hide-mobile]").not(".show").collapse("show");
    $("[data-modal-hide-mobile].show").modal("hide");
  }

  prestashop.emit("responsive update", {
    mobile: prestashop.responsive.mobile,
  });
}

$(window).on("resize", function () {
  var _cw = prestashop.responsive.current_width;
  var _mw = prestashop.responsive.min_width;
  var _w = window.innerWidth;
  var _toggle = (_cw >= _mw && _w < _mw) || (_cw < _mw && _w >= _mw);
  prestashop.responsive.current_width = _w;
  prestashop.responsive.mobile =
    prestashop.responsive.current_width < prestashop.responsive.min_width;
  if (_toggle) {
    toggleMobileStyles();
  }
});

$(() => {
  if (prestashop.responsive.mobile) {
    toggleMobileStyles();
  }
});
