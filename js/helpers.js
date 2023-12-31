class ExtendDrawBarCheckboxes {
  constructor(opt) {
    let ctrl = this;
    ctrl.checkboxes = opt.checkboxes || [];
    ctrl.onRemoveOrig = opt.draw.onRemove;
  }
  onAdd(map) {
    let ctrl = this;
    ctrl.map = map;
    ctrl._container = document.createElement("div");
    ctrl._container.className = "mapboxgl-ctrl-group mapboxgl-ctrl";
    ctrl.elContainer = ctrl._container;
    ctrl.checkboxes.forEach((b) => {
      ctrl.addCheckbox(b);
    });
    return ctrl._container;
  }
  onRemove(map) {
    let ctrl = this;
    ctrl.checkboxes.forEach((b) => {
      ctrl.removeButton(b);
    });
    ctrl.onRemoveOrig(map);
  }
  addCheckbox(opt) {
    let ctrl = this;
    const elCheckbox = document.createElement("input");
    elCheckbox.setAttribute("type", "checkbox");
    elCheckbox.setAttribute("title", opt.title);
    elCheckbox.checked = opt.initialState === "checked";
    elCheckbox.className = "mapbox-gl-draw_ctrl-draw-btn";
    if (opt.classes instanceof Array) {
      opt.classes.forEach((c) => {
        elCheckbox.classList.add(c);
      });
    }
    elCheckbox.addEventListener(opt.on, opt.action);
    ctrl.elContainer.appendChild(elCheckbox);
    opt.elCheckbox = elCheckbox;
  }
  removeButton(opt) {
    opt.elCheckbox.removeEventListener(opt.on, opt.action);
    opt.elCheckbox.remove();
  }
}
