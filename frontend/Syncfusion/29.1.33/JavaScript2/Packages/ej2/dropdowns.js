"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
exports.__esModule = true;
var index = require("@syncfusion/ej2-dropdowns");
index.DropDownList.Inject(index.VirtualScroll);
index.ComboBox.Inject(index.VirtualScroll);
index.AutoComplete.Inject(index.VirtualScroll);
index.MultiSelect.Inject(index.CheckBoxSelection, index.VirtualScroll);
index.ListBox.Inject(index.CheckBoxSelection);
__export(require("@syncfusion/ej2-dropdowns"));
