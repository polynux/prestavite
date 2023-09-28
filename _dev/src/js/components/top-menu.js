import $ from "jquery";

export default class TopMenu {
  constructor(el) {
    this.el = el;
  }
  init() {
    let self = this;
    self.el.hoverIntent({
      over: self.toggleClassSubMenu,
      out: self.toggleClassSubMenu,
      selector: " > li",
      timeout: 100,
    });
  }

  toggleClassSubMenu() {
    let _item = $(this);
    let expanded = _item.attr("aria-expanded");
    if (typeof expanded !== "undefined") {
      expanded = expanded.toLowerCase() === "true";
      _item.toggleClass("menu__item--active").attr("aria-expanded", !expanded);
      $(".menu-sub", _item)
        .attr("aria-expanded", !expanded)
        .attr("aria-hidden", expanded);
    }
  }
}
