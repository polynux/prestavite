import $ from "jquery";

function setUpCheckout() {
  $(".js-terms a").on("click", (event) => {
    event.preventDefault();
    var url = $(event.target).attr("href");
    if (url) {
      // TODO: Handle request if no pretty URL
      url += `?content_only=1`;
      $.get(url, (content) => {
        $("#modal")
          .find(".js-modal-content")
          .html($(content).find(".page-content--cms").contents());
      }).fail((resp) => {
        prestashop.emit("handleError", { eventType: "clickTerms", resp: resp });
      });
    }

    $("#modal").modal("show");
  });

  $(".js-gift-checkbox").on("click", () => {
    $("#gift").collapse("toggle");
  });
}

$(() => {
  if ($("body#checkout").length === 1) {
    setUpCheckout();
  }

  prestashop.on("updatedDeliveryForm", (params) => {
    if (
      typeof params.deliveryOption === "undefined" ||
      0 === params.deliveryOption.length
    ) {
      return;
    }
    // Hide all carrier extra content ...
    $(".carrier-extra-content").hide();
    // and show the one related to the selected carrier
    params.deliveryOption.next(".carrier-extra-content").slideDown();
  });
  prestashop.on("changedCheckoutStep", (params) => {
    if (typeof params.event.currentTarget !== "undefined") {
      $(".collapse", params.event.currentTarget)
        .not(".show")
        .not(".collapse .collapse")
        .collapse("show");
    }
  });
});

$(document).on("change", ".js-input-delivery:checked", (event) => {
  $(".js-label-delivery.selected").removeClass("selected");
  $("#js-" + $(this).attr("id")).addClass("selected");
});

$(document).on("click", ".js-checkout-step-header", (event) => {
  let stepIdentifier = $(event.currentTarget).data("identifier");
  $("#" + stepIdentifier).addClass("-current");
  $("#content-" + stepIdentifier)
    .collapse("show")
    .scrollTop();
});
