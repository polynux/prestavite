import $ from "jquery";
import SlickSlider from "./components/slick";

$(() => {
  prestashop.on("clickQuickView", function (elm) {
    let data = {
      action: "quickview",
      id_product: elm.dataset.idProduct,
      id_product_attribute: elm.dataset.idProductAttribute,
    };
    $.post(prestashop.urls.pages.product, data, null, "json")
      .then(function (resp) {
        $("body").append(resp.quickview_html);
        let productModal = $(
          `#quickview-modal-${resp.product.id}-${resp.product.id_product_attribute}`,
        );
        productModal.modal("show");

        productModal.on("hidden.bs.modal", function () {
          productModal.remove();
        });
        productModal.on("shown.bs.modal", function () {
          productConfig(productModal);
        });
      })
      .fail((resp) => {
        prestashop.emit("handleError", {
          eventType: "clickQuickView",
          resp: resp,
        });
      });
  });

  var productConfig = (qv) => {
    let slickSlider = new SlickSlider();
    slickSlider.init();
  };

  const parseSearchUrl = function (event) {
    if (event.target.dataset.searchUrl !== undefined) {
      return event.target.dataset.searchUrl;
    }

    if ($(event.target).parent()[0].dataset.searchUrl === undefined) {
      throw new Error("Can not parse search URL");
    }

    return $(event.target).parent()[0].dataset.searchUrl;
  };

  $("body").on(
    "change",
    "#search_filters input[data-search-url]",
    function (event) {
      prestashop.emit("updateFacets", parseSearchUrl(event));
    },
  );

  $("body").on("click", ".js-search-filters-clear-all", function (event) {
    prestashop.emit("updateFacets", parseSearchUrl(event));
  });

  $("body").on("click", ".js-search-link", function (event) {
    event.preventDefault();
    prestashop.emit("updateFacets", $(event.target).closest("a").get(0).href);
  });

  $("body").on("change", "#select-sort-order", function () {
    var urlsearch = $(this).val();
    prestashop.emit("updateFacets", urlsearch);
  });

  $("body").on("change", "#search_filters select", function (event) {
    var urlsearch = $(this).val();
    prestashop.emit("updateFacets", urlsearch);
  });

  prestashop.on("updateProductList", (data) => {
    updateProductListDOM(data);
    window.scrollTo(0, 0);
  });
});

function updateProductListDOM(data) {
  $("#search_filters").replaceWith(data.rendered_facets);
  $("#js-active-search-filters").replaceWith(data.rendered_active_filters);
  $("#js-product-list-top").replaceWith(data.rendered_products_top);
  $("#js-product-list").replaceWith(data.rendered_products);
  $("#js-product-list-bottom").replaceWith(data.rendered_products_bottom);
  if (
    typeof data.rendered_products_header !== "undefined" &&
    data.rendered_products_header
  ) {
    $("#js-product-list-header").replaceWith(data.rendered_products_header);
  }
}
