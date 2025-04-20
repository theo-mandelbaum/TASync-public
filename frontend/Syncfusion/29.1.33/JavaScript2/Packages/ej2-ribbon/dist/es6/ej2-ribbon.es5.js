import { Property, Event, ChildProperty, Complex, Collection, getComponent, merge, EventHandler, isNullOrUndefined, closest, remove, select, compile, addClass, formatUnit, append, setValue, getUniqueID, KeyboardEvents, getInstance, isUndefined, removeClass, NotifyPropertyChanges, Component } from '@syncfusion/ej2-base';
import { MenuItem, MenuAnimationSettings, Tab, Toolbar, HScroll, TabAnimationSettings, Menu } from '@syncfusion/ej2-navigations';
import { FieldSettings, ComboBox } from '@syncfusion/ej2-dropdowns';
import { Item, DropDownButton, SplitButton } from '@syncfusion/ej2-splitbuttons';
import { Button, CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker } from '@syncfusion/ej2-inputs';
import { Tooltip, Popup } from '@syncfusion/ej2-popups';

/**
 * Defines the layout types of ribbon.
 */
var RibbonLayout;
(function (RibbonLayout) {
    /**
     * Displays the ribbon tab content in classic layout.
     */
    RibbonLayout["Classic"] = "Classic";
    /**
     * Displays the ribbon tab content in simplified layout.
     */
    RibbonLayout["Simplified"] = "Simplified";
})(RibbonLayout || (RibbonLayout = {}));
/**
 * Defines the alignment of the items in the ribbon group.
 */
var ItemOrientation;
(function (ItemOrientation) {
    /**
     * Displays the collection of items in rows.
     */
    ItemOrientation["Row"] = "Row";
    /**
     * Displays the collection of items in column.
     */
    ItemOrientation["Column"] = "Column";
})(ItemOrientation || (ItemOrientation = {}));
/**
 * Defines the current size of the ribbon item in normal mode.
 *
 * @aspNumberEnum
 */
var RibbonItemSize;
(function (RibbonItemSize) {
    /**
     * The item appears with large icon and text at the bottom.
     */
    RibbonItemSize[RibbonItemSize["Large"] = 4] = "Large";
    /**
     * The item appears with small icon and text at the right.
     */
    RibbonItemSize[RibbonItemSize["Medium"] = 2] = "Medium";
    /**
     * The item appears with small icon only.
     */
    RibbonItemSize[RibbonItemSize["Small"] = 1] = "Small";
})(RibbonItemSize || (RibbonItemSize = {}));
/**
 * Defines how to show an item in ribbon simplified layout.
 *
 * @aspNumberEnum
 */
var DisplayMode;
(function (DisplayMode) {
    /**
     * The item appears in the classic layout group.
     */
    DisplayMode[DisplayMode["Classic"] = 4] = "Classic";
    /**
     * The item appears in the simplified layout group.
     */
    DisplayMode[DisplayMode["Simplified"] = 2] = "Simplified";
    /**
     * The item appears in overflow popup.
     */
    DisplayMode[DisplayMode["Overflow"] = 1] = "Overflow";
    /**
     * The item appears in classic layout group, simplified layout group, and overflow popup based on ribbon overflow state.
     */
    DisplayMode[DisplayMode["Auto"] = 7] = "Auto";
})(DisplayMode || (DisplayMode = {}));
/**
 * Defines the type of the ribbon item.
 */
var RibbonItemType;
(function (RibbonItemType) {
    /**
     * Renders button as ribbon item.
     */
    RibbonItemType["Button"] = "Button";
    /**
     * Renders checkbox as ribbon item.
     */
    RibbonItemType["CheckBox"] = "CheckBox";
    /**
     * Renders color picker as ribbon item.
     */
    RibbonItemType["ColorPicker"] = "ColorPicker";
    /**
     * Renders combobox as ribbon item.
     */
    RibbonItemType["ComboBox"] = "ComboBox";
    /**
     * Renders dropdownbutton as ribbon item.
     */
    RibbonItemType["DropDown"] = "DropDown";
    /**
     * Renders splitbutton as ribbon item.
     */
    RibbonItemType["SplitButton"] = "SplitButton";
    /**
     * Renders the group button content as ribbon item.
     */
    RibbonItemType["GroupButton"] = "GroupButton";
    /**
     * Renders the gallery as ribbon item.
     */
    RibbonItemType["Gallery"] = "Gallery";
    /**
     * Renders the template content as ribbon item.
     */
    RibbonItemType["Template"] = "Template";
})(RibbonItemType || (RibbonItemType = {}));
/**
 * Defines the alignment of the items in the ribbon group.
 */
var RibbonGroupButtonSelection;
(function (RibbonGroupButtonSelection) {
    /**
     * Allows selecting single button from button group.
     */
    RibbonGroupButtonSelection["Single"] = "Single";
    /**
     * Allows selecting multiple buttons from button group.
     */
    RibbonGroupButtonSelection["Multiple"] = "Multiple";
})(RibbonGroupButtonSelection || (RibbonGroupButtonSelection = {}));

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon button item.
 */
var RibbonButtonSettings = /** @class */ (function (_super) {
    __extends(RibbonButtonSettings, _super);
    function RibbonButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of button.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonButtonSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate([
        Property('')
    ], RibbonButtonSettings.prototype, "content", void 0);
    __decorate([
        Property('')
    ], RibbonButtonSettings.prototype, "cssClass", void 0);
    __decorate([
        Property('')
    ], RibbonButtonSettings.prototype, "iconCss", void 0);
    __decorate([
        Property(false)
    ], RibbonButtonSettings.prototype, "isToggle", void 0);
    __decorate([
        Property(false)
    ], RibbonButtonSettings.prototype, "isPrimary", void 0);
    __decorate([
        Property({})
    ], RibbonButtonSettings.prototype, "htmlAttributes", void 0);
    __decorate([
        Event()
    ], RibbonButtonSettings.prototype, "created", void 0);
    __decorate([
        Event()
    ], RibbonButtonSettings.prototype, "clicked", void 0);
    return RibbonButtonSettings;
}(ChildProperty));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon checkbox item.
 */
var RibbonCheckBoxSettings = /** @class */ (function (_super) {
    __extends$1(RibbonCheckBoxSettings, _super);
    function RibbonCheckBoxSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of checkbox.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonCheckBoxSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$1([
        Property(false)
    ], RibbonCheckBoxSettings.prototype, "checked", void 0);
    __decorate$1([
        Property('')
    ], RibbonCheckBoxSettings.prototype, "cssClass", void 0);
    __decorate$1([
        Property('')
    ], RibbonCheckBoxSettings.prototype, "label", void 0);
    __decorate$1([
        Property('After')
    ], RibbonCheckBoxSettings.prototype, "labelPosition", void 0);
    __decorate$1([
        Property({})
    ], RibbonCheckBoxSettings.prototype, "htmlAttributes", void 0);
    __decorate$1([
        Event()
    ], RibbonCheckBoxSettings.prototype, "created", void 0);
    __decorate$1([
        Event()
    ], RibbonCheckBoxSettings.prototype, "change", void 0);
    return RibbonCheckBoxSettings;
}(ChildProperty));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon color picker.
 */
var RibbonColorPickerSettings = /** @class */ (function (_super) {
    __extends$2(RibbonColorPickerSettings, _super);
    function RibbonColorPickerSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of colorpicker.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonColorPickerSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$2([
        Property(10)
    ], RibbonColorPickerSettings.prototype, "columns", void 0);
    __decorate$2([
        Property('')
    ], RibbonColorPickerSettings.prototype, "cssClass", void 0);
    __decorate$2([
        Property('')
    ], RibbonColorPickerSettings.prototype, "label", void 0);
    __decorate$2([
        Property(true)
    ], RibbonColorPickerSettings.prototype, "enableOpacity", void 0);
    __decorate$2([
        Property('Palette')
    ], RibbonColorPickerSettings.prototype, "mode", void 0);
    __decorate$2([
        Property(true)
    ], RibbonColorPickerSettings.prototype, "modeSwitcher", void 0);
    __decorate$2([
        Property(false)
    ], RibbonColorPickerSettings.prototype, "noColor", void 0);
    __decorate$2([
        Property(null)
    ], RibbonColorPickerSettings.prototype, "presetColors", void 0);
    __decorate$2([
        Property(true)
    ], RibbonColorPickerSettings.prototype, "showButtons", void 0);
    __decorate$2([
        Property('#008000ff')
    ], RibbonColorPickerSettings.prototype, "value", void 0);
    __decorate$2([
        Property({})
    ], RibbonColorPickerSettings.prototype, "htmlAttributes", void 0);
    __decorate$2([
        Event()
    ], RibbonColorPickerSettings.prototype, "beforeClose", void 0);
    __decorate$2([
        Event()
    ], RibbonColorPickerSettings.prototype, "beforeOpen", void 0);
    __decorate$2([
        Event()
    ], RibbonColorPickerSettings.prototype, "beforeTileRender", void 0);
    __decorate$2([
        Event()
    ], RibbonColorPickerSettings.prototype, "created", void 0);
    __decorate$2([
        Event()
    ], RibbonColorPickerSettings.prototype, "change", void 0);
    __decorate$2([
        Event()
    ], RibbonColorPickerSettings.prototype, "open", void 0);
    __decorate$2([
        Event()
    ], RibbonColorPickerSettings.prototype, "select", void 0);
    return RibbonColorPickerSettings;
}(ChildProperty));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon combobox item.
 */
var RibbonComboBoxSettings = /** @class */ (function (_super) {
    __extends$3(RibbonComboBoxSettings, _super);
    function RibbonComboBoxSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of combobox.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonComboBoxSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$3([
        Property(false)
    ], RibbonComboBoxSettings.prototype, "allowFiltering", void 0);
    __decorate$3([
        Property(true)
    ], RibbonComboBoxSettings.prototype, "autofill", void 0);
    __decorate$3([
        Property('')
    ], RibbonComboBoxSettings.prototype, "cssClass", void 0);
    __decorate$3([
        Property('')
    ], RibbonComboBoxSettings.prototype, "label", void 0);
    __decorate$3([
        Property([])
    ], RibbonComboBoxSettings.prototype, "dataSource", void 0);
    __decorate$3([
        Complex({ text: null, value: null, iconCss: null, groupBy: null }, FieldSettings)
    ], RibbonComboBoxSettings.prototype, "fields", void 0);
    __decorate$3([
        Property('Contains')
    ], RibbonComboBoxSettings.prototype, "filterType", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "footerTemplate", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "groupTemplate", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "headerTemplate", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "index", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "itemTemplate", void 0);
    __decorate$3([
        Property('No records found')
    ], RibbonComboBoxSettings.prototype, "noRecordsTemplate", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "placeholder", void 0);
    __decorate$3([
        Property('300px')
    ], RibbonComboBoxSettings.prototype, "popupHeight", void 0);
    __decorate$3([
        Property('100%')
    ], RibbonComboBoxSettings.prototype, "popupWidth", void 0);
    __decorate$3([
        Property(true)
    ], RibbonComboBoxSettings.prototype, "showClearButton", void 0);
    __decorate$3([
        Property('None')
    ], RibbonComboBoxSettings.prototype, "sortOrder", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "text", void 0);
    __decorate$3([
        Property(null)
    ], RibbonComboBoxSettings.prototype, "value", void 0);
    __decorate$3([
        Property('150px')
    ], RibbonComboBoxSettings.prototype, "width", void 0);
    __decorate$3([
        Property({})
    ], RibbonComboBoxSettings.prototype, "htmlAttributes", void 0);
    __decorate$3([
        Event()
    ], RibbonComboBoxSettings.prototype, "beforeOpen", void 0);
    __decorate$3([
        Event()
    ], RibbonComboBoxSettings.prototype, "change", void 0);
    __decorate$3([
        Event()
    ], RibbonComboBoxSettings.prototype, "close", void 0);
    __decorate$3([
        Event()
    ], RibbonComboBoxSettings.prototype, "created", void 0);
    __decorate$3([
        Event()
    ], RibbonComboBoxSettings.prototype, "filtering", void 0);
    __decorate$3([
        Event()
    ], RibbonComboBoxSettings.prototype, "open", void 0);
    __decorate$3([
        Event()
    ], RibbonComboBoxSettings.prototype, "select", void 0);
    return RibbonComboBoxSettings;
}(ChildProperty));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon DropDownButton item.
 */
var RibbonDropDownSettings = /** @class */ (function (_super) {
    __extends$4(RibbonDropDownSettings, _super);
    function RibbonDropDownSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of DropDown.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonDropDownSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$4([
        Property('')
    ], RibbonDropDownSettings.prototype, "closeActionEvents", void 0);
    __decorate$4([
        Property('')
    ], RibbonDropDownSettings.prototype, "content", void 0);
    __decorate$4([
        Property('')
    ], RibbonDropDownSettings.prototype, "cssClass", void 0);
    __decorate$4([
        Property('')
    ], RibbonDropDownSettings.prototype, "iconCss", void 0);
    __decorate$4([
        Collection([], Item)
    ], RibbonDropDownSettings.prototype, "items", void 0);
    __decorate$4([
        Property('')
    ], RibbonDropDownSettings.prototype, "target", void 0);
    __decorate$4([
        Property(false)
    ], RibbonDropDownSettings.prototype, "createPopupOnClick", void 0);
    __decorate$4([
        Property({})
    ], RibbonDropDownSettings.prototype, "htmlAttributes", void 0);
    __decorate$4([
        Event()
    ], RibbonDropDownSettings.prototype, "beforeClose", void 0);
    __decorate$4([
        Event()
    ], RibbonDropDownSettings.prototype, "beforeItemRender", void 0);
    __decorate$4([
        Event()
    ], RibbonDropDownSettings.prototype, "beforeOpen", void 0);
    __decorate$4([
        Event()
    ], RibbonDropDownSettings.prototype, "close", void 0);
    __decorate$4([
        Event()
    ], RibbonDropDownSettings.prototype, "created", void 0);
    __decorate$4([
        Event()
    ], RibbonDropDownSettings.prototype, "open", void 0);
    __decorate$4([
        Event()
    ], RibbonDropDownSettings.prototype, "select", void 0);
    return RibbonDropDownSettings;
}(ChildProperty));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon SplitButton item.
 */
var RibbonSplitButtonSettings = /** @class */ (function (_super) {
    __extends$5(RibbonSplitButtonSettings, _super);
    function RibbonSplitButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of DropDown.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonSplitButtonSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$5([
        Property('')
    ], RibbonSplitButtonSettings.prototype, "closeActionEvents", void 0);
    __decorate$5([
        Property('')
    ], RibbonSplitButtonSettings.prototype, "content", void 0);
    __decorate$5([
        Property('')
    ], RibbonSplitButtonSettings.prototype, "cssClass", void 0);
    __decorate$5([
        Property('')
    ], RibbonSplitButtonSettings.prototype, "iconCss", void 0);
    __decorate$5([
        Collection([], Item)
    ], RibbonSplitButtonSettings.prototype, "items", void 0);
    __decorate$5([
        Property('')
    ], RibbonSplitButtonSettings.prototype, "target", void 0);
    __decorate$5([
        Property({})
    ], RibbonSplitButtonSettings.prototype, "htmlAttributes", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "beforeClose", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "beforeItemRender", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "beforeOpen", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "close", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "click", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "created", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "open", void 0);
    __decorate$5([
        Event()
    ], RibbonSplitButtonSettings.prototype, "select", void 0);
    return RibbonSplitButtonSettings;
}(ChildProperty));

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon tooltip.
 */
var RibbonTooltip = /** @class */ (function (_super) {
    __extends$6(RibbonTooltip, _super);
    function RibbonTooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$6([
        Property('')
    ], RibbonTooltip.prototype, "cssClass", void 0);
    __decorate$6([
        Property('')
    ], RibbonTooltip.prototype, "id", void 0);
    __decorate$6([
        Property('')
    ], RibbonTooltip.prototype, "title", void 0);
    __decorate$6([
        Property('')
    ], RibbonTooltip.prototype, "content", void 0);
    __decorate$6([
        Property('')
    ], RibbonTooltip.prototype, "iconCss", void 0);
    return RibbonTooltip;
}(ChildProperty));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$7 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon group button settings.
 */
var RibbonGroupButtonItem = /** @class */ (function (_super) {
    __extends$7(RibbonGroupButtonItem, _super);
    function RibbonGroupButtonItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of group button.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonGroupButtonItem.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$7([
        Property('')
    ], RibbonGroupButtonItem.prototype, "content", void 0);
    __decorate$7([
        Property('')
    ], RibbonGroupButtonItem.prototype, "iconCss", void 0);
    __decorate$7([
        Property('')
    ], RibbonGroupButtonItem.prototype, "keyTip", void 0);
    __decorate$7([
        Complex({}, RibbonTooltip)
    ], RibbonGroupButtonItem.prototype, "ribbonTooltipSettings", void 0);
    __decorate$7([
        Property(false)
    ], RibbonGroupButtonItem.prototype, "selected", void 0);
    __decorate$7([
        Property({})
    ], RibbonGroupButtonItem.prototype, "htmlAttributes", void 0);
    __decorate$7([
        Event()
    ], RibbonGroupButtonItem.prototype, "beforeClick", void 0);
    __decorate$7([
        Event()
    ], RibbonGroupButtonItem.prototype, "click", void 0);
    return RibbonGroupButtonItem;
}(ChildProperty));

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$8 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon group button settings.
 */
var RibbonGroupButtonSettings = /** @class */ (function (_super) {
    __extends$8(RibbonGroupButtonSettings, _super);
    function RibbonGroupButtonSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$8([
        Property('')
    ], RibbonGroupButtonSettings.prototype, "header", void 0);
    __decorate$8([
        Property('Single')
    ], RibbonGroupButtonSettings.prototype, "selection", void 0);
    __decorate$8([
        Collection([], RibbonGroupButtonItem)
    ], RibbonGroupButtonSettings.prototype, "items", void 0);
    return RibbonGroupButtonSettings;
}(ChildProperty));

var __extends$9 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$9 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon gallery item.
 */
var RibbonGalleryItem = /** @class */ (function (_super) {
    __extends$9(RibbonGalleryItem, _super);
    function RibbonGalleryItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$9([
        Property('')
    ], RibbonGalleryItem.prototype, "content", void 0);
    __decorate$9([
        Property('')
    ], RibbonGalleryItem.prototype, "iconCss", void 0);
    __decorate$9([
        Property({})
    ], RibbonGalleryItem.prototype, "htmlAttributes", void 0);
    __decorate$9([
        Property('')
    ], RibbonGalleryItem.prototype, "cssClass", void 0);
    __decorate$9([
        Property(false)
    ], RibbonGalleryItem.prototype, "disabled", void 0);
    return RibbonGalleryItem;
}(ChildProperty));

var __extends$a = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$a = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon gallery group.
 */
var RibbonGalleryGroup = /** @class */ (function (_super) {
    __extends$a(RibbonGalleryGroup, _super);
    function RibbonGalleryGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$a([
        Collection([], RibbonGalleryItem)
    ], RibbonGalleryGroup.prototype, "items", void 0);
    __decorate$a([
        Property('')
    ], RibbonGalleryGroup.prototype, "header", void 0);
    __decorate$a([
        Property('auto')
    ], RibbonGalleryGroup.prototype, "itemWidth", void 0);
    __decorate$a([
        Property('auto')
    ], RibbonGalleryGroup.prototype, "itemHeight", void 0);
    __decorate$a([
        Property('')
    ], RibbonGalleryGroup.prototype, "cssClass", void 0);
    return RibbonGalleryGroup;
}(ChildProperty));

var __extends$b = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$b = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon gallery settings.
 */
var RibbonGallerySettings = /** @class */ (function (_super) {
    __extends$b(RibbonGallerySettings, _super);
    function RibbonGallerySettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$b([
        Collection([], RibbonGalleryGroup)
    ], RibbonGallerySettings.prototype, "groups", void 0);
    __decorate$b([
        Property(3)
    ], RibbonGallerySettings.prototype, "itemCount", void 0);
    __decorate$b([
        Property(null)
    ], RibbonGallerySettings.prototype, "selectedItemIndex", void 0);
    __decorate$b([
        Property('auto')
    ], RibbonGallerySettings.prototype, "popupHeight", void 0);
    __decorate$b([
        Property('auto')
    ], RibbonGallerySettings.prototype, "popupWidth", void 0);
    __decorate$b([
        Property('')
    ], RibbonGallerySettings.prototype, "template", void 0);
    __decorate$b([
        Property('')
    ], RibbonGallerySettings.prototype, "popupTemplate", void 0);
    __decorate$b([
        Event()
    ], RibbonGallerySettings.prototype, "popupOpen", void 0);
    __decorate$b([
        Event()
    ], RibbonGallerySettings.prototype, "popupClose", void 0);
    __decorate$b([
        Event()
    ], RibbonGallerySettings.prototype, "itemHover", void 0);
    __decorate$b([
        Event()
    ], RibbonGallerySettings.prototype, "beforeItemRender", void 0);
    __decorate$b([
        Event()
    ], RibbonGallerySettings.prototype, "beforeSelect", void 0);
    __decorate$b([
        Event()
    ], RibbonGallerySettings.prototype, "select", void 0);
    return RibbonGallerySettings;
}(ChildProperty));

var __extends$c = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$c = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon item.
 */
var RibbonItem = /** @class */ (function (_super) {
    __extends$c(RibbonItem, _super);
    function RibbonItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of item.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonItem.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$c([
        Property('')
    ], RibbonItem.prototype, "keyTip", void 0);
    __decorate$c([
        Property(RibbonItemSize.Medium)
    ], RibbonItem.prototype, "activeSize", void 0);
    __decorate$c([
        Property(RibbonItemSize.Small | RibbonItemSize.Medium | RibbonItemSize.Large)
    ], RibbonItem.prototype, "allowedSizes", void 0);
    __decorate$c([
        Property('')
    ], RibbonItem.prototype, "id", void 0);
    __decorate$c([
        Property('')
    ], RibbonItem.prototype, "cssClass", void 0);
    __decorate$c([
        Property(false)
    ], RibbonItem.prototype, "disabled", void 0);
    __decorate$c([
        Property('')
    ], RibbonItem.prototype, "itemTemplate", void 0);
    __decorate$c([
        Property('Button')
    ], RibbonItem.prototype, "type", void 0);
    __decorate$c([
        Property(DisplayMode.Auto)
    ], RibbonItem.prototype, "displayOptions", void 0);
    __decorate$c([
        Complex({}, RibbonTooltip)
    ], RibbonItem.prototype, "ribbonTooltipSettings", void 0);
    __decorate$c([
        Complex({}, RibbonButtonSettings)
    ], RibbonItem.prototype, "buttonSettings", void 0);
    __decorate$c([
        Complex({}, RibbonDropDownSettings)
    ], RibbonItem.prototype, "dropDownSettings", void 0);
    __decorate$c([
        Complex({}, RibbonCheckBoxSettings)
    ], RibbonItem.prototype, "checkBoxSettings", void 0);
    __decorate$c([
        Complex({}, RibbonColorPickerSettings)
    ], RibbonItem.prototype, "colorPickerSettings", void 0);
    __decorate$c([
        Complex({}, RibbonComboBoxSettings)
    ], RibbonItem.prototype, "comboBoxSettings", void 0);
    __decorate$c([
        Complex({}, RibbonSplitButtonSettings)
    ], RibbonItem.prototype, "splitButtonSettings", void 0);
    __decorate$c([
        Complex({}, RibbonGroupButtonSettings)
    ], RibbonItem.prototype, "groupButtonSettings", void 0);
    __decorate$c([
        Complex({}, RibbonGallerySettings)
    ], RibbonItem.prototype, "gallerySettings", void 0);
    return RibbonItem;
}(ChildProperty));

var __extends$d = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$d = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the items of Ribbon.
 */
var RibbonCollection = /** @class */ (function (_super) {
    __extends$d(RibbonCollection, _super);
    function RibbonCollection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of collection.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonCollection.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$d([
        Property('')
    ], RibbonCollection.prototype, "id", void 0);
    __decorate$d([
        Property('')
    ], RibbonCollection.prototype, "cssClass", void 0);
    __decorate$d([
        Collection([], RibbonItem)
    ], RibbonCollection.prototype, "items", void 0);
    return RibbonCollection;
}(ChildProperty));

var __extends$e = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$e = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon group.
 */
var RibbonGroup = /** @class */ (function (_super) {
    __extends$e(RibbonGroup, _super);
    function RibbonGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of Group.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonGroup.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$e([
        Property('')
    ], RibbonGroup.prototype, "keyTip", void 0);
    __decorate$e([
        Property('')
    ], RibbonGroup.prototype, "launcherIconKeyTip", void 0);
    __decorate$e([
        Collection([], RibbonCollection)
    ], RibbonGroup.prototype, "collections", void 0);
    __decorate$e([
        Property('')
    ], RibbonGroup.prototype, "cssClass", void 0);
    __decorate$e([
        Property('')
    ], RibbonGroup.prototype, "id", void 0);
    __decorate$e([
        Property(false)
    ], RibbonGroup.prototype, "isCollapsed", void 0);
    __decorate$e([
        Property(true)
    ], RibbonGroup.prototype, "isCollapsible", void 0);
    __decorate$e([
        Property(false)
    ], RibbonGroup.prototype, "enableGroupOverflow", void 0);
    __decorate$e([
        Property('')
    ], RibbonGroup.prototype, "groupIconCss", void 0);
    __decorate$e([
        Property('')
    ], RibbonGroup.prototype, "header", void 0);
    __decorate$e([
        Property('Column')
    ], RibbonGroup.prototype, "orientation", void 0);
    __decorate$e([
        Property('')
    ], RibbonGroup.prototype, "overflowHeader", void 0);
    __decorate$e([
        Property(0)
    ], RibbonGroup.prototype, "priority", void 0);
    __decorate$e([
        Property(false)
    ], RibbonGroup.prototype, "showLauncherIcon", void 0);
    return RibbonGroup;
}(ChildProperty));

var __extends$f = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$f = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon tab.
 */
var RibbonTab = /** @class */ (function (_super) {
    __extends$f(RibbonTab, _super);
    function RibbonTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of tab.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonTab.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$f([
        Property('')
    ], RibbonTab.prototype, "keyTip", void 0);
    __decorate$f([
        Property('')
    ], RibbonTab.prototype, "id", void 0);
    __decorate$f([
        Property('')
    ], RibbonTab.prototype, "cssClass", void 0);
    __decorate$f([
        Collection([], RibbonGroup)
    ], RibbonTab.prototype, "groups", void 0);
    __decorate$f([
        Property('')
    ], RibbonTab.prototype, "header", void 0);
    return RibbonTab;
}(ChildProperty));

var __extends$g = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$g = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon file menu settings.
 */
var FileMenuSettings = /** @class */ (function (_super) {
    __extends$g(FileMenuSettings, _super);
    function FileMenuSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of FileMenu.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    FileMenuSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$g([
        Property('File')
    ], FileMenuSettings.prototype, "text", void 0);
    __decorate$g([
        Property(false)
    ], FileMenuSettings.prototype, "visible", void 0);
    __decorate$g([
        Collection([], MenuItem)
    ], FileMenuSettings.prototype, "menuItems", void 0);
    __decorate$g([
        Property(false)
    ], FileMenuSettings.prototype, "showItemOnClick", void 0);
    __decorate$g([
        Complex({}, MenuAnimationSettings)
    ], FileMenuSettings.prototype, "animationSettings", void 0);
    __decorate$g([
        Property('')
    ], FileMenuSettings.prototype, "itemTemplate", void 0);
    __decorate$g([
        Property('')
    ], FileMenuSettings.prototype, "popupTemplate", void 0);
    __decorate$g([
        Complex({}, RibbonTooltip)
    ], FileMenuSettings.prototype, "ribbonTooltipSettings", void 0);
    __decorate$g([
        Event()
    ], FileMenuSettings.prototype, "beforeClose", void 0);
    __decorate$g([
        Event()
    ], FileMenuSettings.prototype, "beforeOpen", void 0);
    __decorate$g([
        Event()
    ], FileMenuSettings.prototype, "beforeItemRender", void 0);
    __decorate$g([
        Event()
    ], FileMenuSettings.prototype, "close", void 0);
    __decorate$g([
        Event()
    ], FileMenuSettings.prototype, "open", void 0);
    __decorate$g([
        Event()
    ], FileMenuSettings.prototype, "select", void 0);
    __decorate$g([
        Property('')
    ], FileMenuSettings.prototype, "keyTip", void 0);
    return FileMenuSettings;
}(ChildProperty));

var __extends$h = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$h = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon backstage back button.
 */
var BackstageBackButton = /** @class */ (function (_super) {
    __extends$h(BackstageBackButton, _super);
    function BackstageBackButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$h([
        Property('')
    ], BackstageBackButton.prototype, "text", void 0);
    __decorate$h([
        Property('')
    ], BackstageBackButton.prototype, "iconCss", void 0);
    __decorate$h([
        Property(true)
    ], BackstageBackButton.prototype, "visible", void 0);
    return BackstageBackButton;
}(ChildProperty));

var __extends$i = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$i = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon backstage back button.
 */
var BackstageItem = /** @class */ (function (_super) {
    __extends$i(BackstageItem, _super);
    function BackstageItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$i([
        Property('')
    ], BackstageItem.prototype, "text", void 0);
    __decorate$i([
        Property('')
    ], BackstageItem.prototype, "id", void 0);
    __decorate$i([
        Property('')
    ], BackstageItem.prototype, "keyTip", void 0);
    __decorate$i([
        Property('')
    ], BackstageItem.prototype, "content", void 0);
    __decorate$i([
        Property('')
    ], BackstageItem.prototype, "iconCss", void 0);
    __decorate$i([
        Property(false)
    ], BackstageItem.prototype, "separator", void 0);
    __decorate$i([
        Property(false)
    ], BackstageItem.prototype, "isFooter", void 0);
    __decorate$i([
        Event()
    ], BackstageItem.prototype, "backStageItemClick", void 0);
    return BackstageItem;
}(ChildProperty));

var __extends$j = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$j = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon file menu settings.
 */
var BackStageMenu = /** @class */ (function (_super) {
    __extends$j(BackStageMenu, _super);
    function BackStageMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of Backstage Menu.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    BackStageMenu.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$j([
        Property('File')
    ], BackStageMenu.prototype, "text", void 0);
    __decorate$j([
        Property('')
    ], BackStageMenu.prototype, "keyTip", void 0);
    __decorate$j([
        Property(false)
    ], BackStageMenu.prototype, "visible", void 0);
    __decorate$j([
        Property('auto')
    ], BackStageMenu.prototype, "height", void 0);
    __decorate$j([
        Property('auto')
    ], BackStageMenu.prototype, "width", void 0);
    __decorate$j([
        Property(null)
    ], BackStageMenu.prototype, "target", void 0);
    __decorate$j([
        Complex({}, BackstageBackButton)
    ], BackStageMenu.prototype, "backButton", void 0);
    __decorate$j([
        Collection([], BackstageItem)
    ], BackStageMenu.prototype, "items", void 0);
    __decorate$j([
        Property('')
    ], BackStageMenu.prototype, "template", void 0);
    __decorate$j([
        Complex({}, RibbonTooltip)
    ], BackStageMenu.prototype, "ribbonTooltipSettings", void 0);
    return BackStageMenu;
}(ChildProperty));

var __extends$k = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$k = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Defines the ribbon contextual tab.
 */
var RibbonContextualTabSettings = /** @class */ (function (_super) {
    __extends$k(RibbonContextualTabSettings, _super);
    function RibbonContextualTabSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @param {Object} prop - Gets the property of contextual tab.
     * @param {boolean} muteOnChange - Gets the boolean value of muteOnChange.
     * @returns {void}
     * @private
     */
    RibbonContextualTabSettings.prototype.setProperties = function (prop, muteOnChange) {
        _super.prototype.setProperties.call(this, prop, muteOnChange);
    };
    __decorate$k([
        Property(false)
    ], RibbonContextualTabSettings.prototype, "visible", void 0);
    __decorate$k([
        Property(false)
    ], RibbonContextualTabSettings.prototype, "isSelected", void 0);
    __decorate$k([
        Collection([], RibbonTab)
    ], RibbonContextualTabSettings.prototype, "tabs", void 0);
    return RibbonContextualTabSettings;
}(ChildProperty));

/**
 * Specifies the File Manager internal ID's
 */
/** @hidden */
var ITEM_VERTICAL_CENTER = 'e-ribbon-vertical-center';
/** @hidden */
var EXPAND_COLLAPSE_ICON = 'e-icons e-drop-icon';
/** @hidden */
var BACKSTAGE_CLOSE_ICON = 'e-icons e-arrow-left';
/** @hidden */
var OVERFLOW_ICON = 'e-icons e-more-horizontal-1';
/** @hidden */
var VERTICAL_DDB = 'e-vertical';
/** @hidden */
var DISABLED_CSS = 'e-disabled';
/** @hidden */
var RTL_CSS = 'e-rtl';
/** @hidden */
var RIBBON_HOVER = 'e-ribbon-hover';
/** @hidden */
var RIBBON_CONTROL = 'e-ribbon-control';
/** @hidden */
var RIBBON_POPUP_CONTROL = 'e-ribbon-popup-control';
/** @hidden */
var RIBBON_POPUP_OPEN = 'e-ribbon-open';
/** @hidden */
var RIBBON_KEYTIP = 'e-ribbon-keytip';
/** @hidden */
var SPACE = ' ';
/** @hidden */
var HORIZONTAL_SCROLLBAR = 'e-hscroll-bar';
/** @hidden */
var HIDE_CSS = 'e-ribbon-hide';
/** @hidden */
var RIBBON_TAB = 'e-ribbon-tab';
/** @hidden */
var RIBBON_CONTEXTUAL_TAB = 'e-ribbon-contextual-tab';
/** @hidden */
var RIBBON_TAB_ACTIVE = 'e-ribbon-active';
/** @hidden */
var RIBBON_TAB_ITEM = 'e-ribbon-tab-item';
/** @hidden */
var RIBBON_COLLAPSE_BUTTON = 'e-ribbon-collapse-btn';
/** @hidden */
var RIBBON_EXPAND_BUTTON = 'e-ribbon-expand-btn';
/** @hidden */
var RIBBON_COLLAPSIBLE = 'e-ribbon-collapsible';
/** @hidden */
var RIBBON_OVERALL_OF_BUTTON = 'e-ribbon-overall-of-btn';
/** @hidden */
var RIBBON_GROUP_OF_BUTTON = 'e-ribbon-group-of-btn';
/** @hidden */
var RIBBON_OVERFLOW_TARGET = 'e-ribbon-overflow-target';
/** @hidden */
var RIBBON_OVERFLOW = 'e-ribbon-overflow';
/** @hidden */
var TAB_CONTENT = 'e-content';
/** @hidden */
var RIBBON_MINIMIZE = 'e-ribbon-minimize';
/** @hidden */
var RIBBON_GROUP = 'e-ribbon-group';
/** @hidden */
var RIBBON_SINGLE_BUTTON_SELECTION = 'e-ribbon-single-selection';
/** @hidden */
var RIBBON_MULTIPLE_BUTTON_SELECTION = 'e-ribbon-multiple-selection';
/** @hidden */
var RIBBON_GROUP_BUTTON = 'e-ribbon-group-button';
/** @hidden */
var RIBBON_GROUP_BUTTON_OVERFLOW_POPUP = 'e-ribbon-group-button-overflow-popup';
/** @hidden */
var RIBBON_GROUP_BUTTON_CONTENT = 'e-ribbon-group-button-content';
/** @hidden */
var RIBBON_GROUP_CONTAINER = 'e-ribbon-group-container';
/** @hidden */
var RIBBON_OF_TAB_CONTAINER = 'e-ribbon-of-tab';
/** @hidden */
var RIBBON_OF_GROUP_CONTAINER = 'e-ribbon-of-group-container';
/** @hidden */
var RIBBON_GROUP_CONTENT = 'e-ribbon-group-content';
/** @hidden */
var RIBBON_GROUP_HEADER = 'e-ribbon-group-header';
/** @hidden */
var RIBBON_OVERFLOW_HEADER = 'e-ribbon-overflow-header';
/** @hidden */
var RIBBON_GROUP_OVERFLOW = 'e-ribbon-group-overflow';
/** @hidden */
var RIBBON_GROUP_OVERFLOW_DDB = 'e-ribbon-group-overflow-ddb';
/** @hidden */
var RIBBON_LAUNCHER = 'e-ribbon-launcher';
/** @hidden */
var RIBBON_LAUNCHER_ICON_ELE = 'e-ribbon-launcher-icon';
/** @hidden */
var RIBBON_LAUNCHER_ICON = 'e-icons e-launcher';
/** @hidden */
var RIBBON_COLLECTION = 'e-ribbon-collection';
/** @hidden */
var RIBBON_ITEM = 'e-ribbon-item';
/** @hidden */
var RIBBON_ROW = 'e-ribbon-row';
/** @hidden */
var RIBBON_COLUMN = 'e-ribbon-column';
/** @hidden */
var RIBBON_LARGE_ITEM = 'e-ribbon-large-item';
/** @hidden */
var RIBBON_MEDIUM_ITEM = 'e-ribbon-medium-item';
/** @hidden */
var RIBBON_SMALL_ITEM = 'e-ribbon-small-item';
/** @hidden */
var RIBBON_CONTENT_HEIGHT = 'e-ribbon-content-height';
/** @hidden */
var DROPDOWNBUTTON = 'e-dropdown-btn';
/** @hidden */
var DROPDOWNBUTTON_HIDE = 'e-caret-hide';
/** @hidden */
var RIBBON_TEMPLATE = 'e-ribbon-template';
/** @hidden */
var RIBBON_HELP_TEMPLATE = 'e-ribbon-help-template';
/** @hidden */
var RIBBON_TOOLTIP = 'e-ribbon-tooltip';
/** @hidden */
var RIBBON_TOOLTIP_TARGET = 'e-ribbon-tooltip-target';
/** @hidden */
var RIBBON_TOOLTIP_TITLE = 'e-ribbon-tooltip-title';
/** @hidden */
var RIBBON_TOOLTIP_CONTENT = 'e-ribbon-tooltip-content';
/** @hidden */
var RIBBON_TOOLTIP_ICON = 'e-ribbon-tooltip-icon';
/** @hidden */
var RIBBON_TOOLTIP_CONTAINER = 'e-ribbon-tooltip-container';
/** @hidden */
var RIBBON_TEXT_CONTAINER = 'e-ribbon-text-container';
/** @hidden */
var RIBBON_SIMPLIFIED_MODE = 'e-ribbon-simplified-mode';
/** @hidden */
var RIBBON_BACKSTAGE_POPUP = 'e-ribbon-backstage-popup';
/** @hidden */
var RIBBON_BACKSTAGE_OPEN = 'e-ribbon-backstage-open';
/** @hidden */
var RIBBON_BACKSTAGE_CONTENT = 'e-ribbon-backstage-content';
/** @hidden */
var RIBBON_SELECTED_CONTENT = 'e-ribbon-selected-content';
/** @hidden */
var RIBBON_BACKSTAGE = 'e-ribbon-backstage';
/** @hidden */
var RIBBON_BACKSTAGE_MENU = 'e-ribbon-backstage-menu';
/** @hidden */
var RIBBON_BACKSTAGE_TEMPLATE = 'e-ribbon-backstage-template';
/** @hidden */
var RIBBON_BACKSTAGE_MENU_WRAPPER = 'e-ribbon-backstage-wrapper';
/** @hidden */
var RIBBON_BACKSTAGE_ITEMS_WRAPPER = 'e-ribbon-backstage-items-wrapper';
/** @hidden */
var RIBBON_BACKSTAGE_TEXT_MENU = 'e-blankicon';
/** @hidden */
var TAB_ID = '_tab';
/** @hidden */
var GROUP_ID = '_group';
/** @hidden */
var COLLECTION_ID = '_collection';
/** @hidden */
var ITEM_ID = '_item';
/** @hidden */
var COLLAPSE_BUTTON_ID = '_collapsebutton';
/** @hidden */
var OVRLOF_BUTTON_ID = '_sim_ovrl_overflow';
/** @hidden */
var GROUPOF_BUTTON_ID = '_sim_grp_overflow';
/** @hidden */
var HEADER_ID = '_header';
/** @hidden */
var LAUNCHER_ID = '_launcher';
/** @hidden */
var CONTENT_ID = '_content';
/** @hidden */
var CONTAINER_ID = '_container';
/** @hidden */
var OVERFLOW_ID = '_overflow';
/** @hidden */
var DROPDOWN_ID = '_dropdown';
/** @hidden */
var RIBBON_FILE_MENU_ID = '_filemenu';
/** @hidden */
var RIBBON_BACKSTAGE_MENU_ID = '_backstage';
/** @hidden */
var RIBBON_BACKSTAGE_POPUP_ID = '_backstagepopup';
/** @hidden */
var RIBBON_FILE_MENU_LIST = '_filemenulist';
/** @hidden */
var RIBBON_MENU_LIST = '_menulist';
/** @hidden */
var RIBBON_FOOTER_MENU_LIST = '_footermenulist';
/** @hidden */
var RIBBON_HELP_PANE_TEMPLATE_ID = '_helppanetemplate';
/** @hidden */
var RIBBON_GROUP_BUTTON_ID = '_grpbtn';
/** @hidden */
var RIBBON_KEYTIP_ID = '_keytip';
/** @hidden */
var RIBBON_FILE_MENU_WIDTH = '--fileMenuWidth';
/** @hidden */
var RIBBON_HELP_PANE_TEMPLATE_WIDTH = '--helpTemplateWidth';

/**
 * Defines the items of Ribbon.
 */
var RibbonButton = /** @class */ (function () {
    function RibbonButton(parent) {
        this.parent = parent;
    }
    RibbonButton.prototype.getModuleName = function () {
        return 'ribbonButton';
    };
    RibbonButton.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates button.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.createButton = function (item, itemEle) {
        var _this = this;
        var buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        var btnSettings = item.buttonSettings;
        new Button({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            iconCss: btnSettings.iconCss,
            disabled: item.disabled,
            cssClass: (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (btnSettings.cssClass ? btnSettings.cssClass : '')).trim(),
            content: item.activeSize === RibbonItemSize.Small ? '' : btnSettings.content,
            isPrimary: btnSettings.isPrimary,
            isToggle: btnSettings.isToggle,
            created: btnSettings.created
        }, buttonEle);
        if (btnSettings.htmlAttributes) {
            if (btnSettings.htmlAttributes.id) {
                delete btnSettings.htmlAttributes.id;
            }
            setCustomAttributes(buttonEle, btnSettings.htmlAttributes);
        }
        buttonEle.onclick = function (e) {
            if (btnSettings.clicked) {
                btnSettings.clicked.call(_this, e);
            }
        };
        if (btnSettings.content) {
            buttonEle.setAttribute('aria-label', btnSettings.content);
        }
        else {
            buttonEle.setAttribute('aria-label', 'button');
        }
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var buttonEle = itemEle.querySelector('#' + item.id);
        buttonEle.setAttribute('data-control', item.type.toString());
        var buttonObj = getComponent(buttonEle, Button);
        buttonObj.setProperties({ cssClass: buttonObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        buttonEle.onclick = function (e) {
            if (item.buttonSettings.clicked) {
                item.buttonSettings.clicked.call(_this, e);
            }
            if (overflowButton.element.classList.contains('e-active')) {
                overflowButton.toggle();
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var buttonEle = itemEle.querySelector('#' + item.id);
        var buttonObj = getComponent(buttonEle, Button);
        var cssClass = buttonObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        buttonObj.setProperties({ cssClass: cssClass.join(SPACE) });
        buttonEle.onclick = function (e) {
            if (item.buttonSettings.clicked) {
                item.buttonSettings.clicked.call(_this, e);
            }
        };
    };
    /**
     * Triggers the click action on the button.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonButton.prototype.click = function (controlId) {
        var buttonEle = getItemElement(this.parent, controlId);
        if (!buttonEle) {
            return;
        }
        var buttonObj = getComponent(buttonEle, Button);
        if (!buttonObj.disabled) {
            buttonObj.click();
        }
    };
    /**
     * Updates the button properties.
     *
     * @param {RibbonButtonSettingsModel} prop - Gets the button property.
     * @param {string} id - Gets the ID of button item.
     * @returns {void}
     */
    RibbonButton.prototype.updateButton = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.buttonSettings, prop);
        var buttonEle = getItemElement(this.parent, id, itemProp);
        if (!buttonEle) {
            return;
        }
        var buttonObj = getComponent(buttonEle, Button);
        if (prop.isToggle) {
            buttonEle.classList.add('e-active');
        }
        if (prop.cssClass) {
            prop.cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        if (prop.content) {
            prop.content = itemProp.item.activeSize === RibbonItemSize.Small ? '' : prop.content;
            buttonEle.setAttribute('aria-label', prop.content);
        }
        delete prop.clicked;
        buttonObj.setProperties(prop);
    };
    /**
     * Updates the button size.
     *
     * @param {HTMLElement} element - Gets the button element.
     * @param {RibbonItemModel} item - Gets the ribbon item.
     * @returns {void}
     * @hidden
     */
    RibbonButton.prototype.updateButtonSize = function (element, item) {
        var buttonObj = getComponent(element, Button);
        buttonObj.setProperties({
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            content: item.activeSize === RibbonItemSize.Small ? '' : item.buttonSettings.content
        });
    };
    return RibbonButton;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonCheckBox = /** @class */ (function () {
    function RibbonCheckBox(parent) {
        this.parent = parent;
    }
    RibbonCheckBox.prototype.getModuleName = function () {
        return 'ribbonCheckBox';
    };
    RibbonCheckBox.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates the check box.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonCheckBox.prototype.createCheckBox = function (item, itemEle) {
        var _this = this;
        var inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        var checkBoxSettings = item.checkBoxSettings;
        if (checkBoxSettings.htmlAttributes) {
            if (checkBoxSettings.htmlAttributes.id) {
                delete checkBoxSettings.htmlAttributes.id;
            }
        }
        new CheckBox({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            checked: checkBoxSettings.checked,
            cssClass: (RIBBON_CONTROL + SPACE + (checkBoxSettings.cssClass ? checkBoxSettings.cssClass : '')).trim(),
            label: checkBoxSettings.label,
            labelPosition: checkBoxSettings.labelPosition,
            disabled: item.disabled,
            created: checkBoxSettings.created,
            htmlAttributes: checkBoxSettings.htmlAttributes,
            change: function (e) {
                if (checkBoxSettings.change) {
                    checkBoxSettings.change.call(_this, e);
                }
            }
        }, inputEle);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonCheckBox.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var inputEle = itemEle.querySelector('#' + item.id);
        inputEle.setAttribute('data-control', item.type.toString());
        var checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.cssClass = checkBoxObj.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        checkBoxObj.dataBind();
        checkBoxObj.change = function (e) {
            if (item.checkBoxSettings.change) {
                item.checkBoxSettings.change.call(_this, e);
            }
            if (overflowButton.element.classList.contains('e-active')) {
                overflowButton.toggle();
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonCheckBox.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var inputEle = itemEle.querySelector('#' + item.id);
        var checkBoxObj = getComponent(inputEle, CheckBox);
        var cssClass = checkBoxObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        checkBoxObj.cssClass = cssClass.join(SPACE);
        checkBoxObj.dataBind();
        checkBoxObj.change = function (e) {
            if (item.checkBoxSettings.change) {
                item.checkBoxSettings.change.call(_this, e);
            }
        };
    };
    /**
     * Triggers the click action on the Checkbox.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonCheckBox.prototype.click = function (controlId) {
        var inputEle = getItemElement(this.parent, controlId);
        if (!inputEle) {
            return;
        }
        var checkBoxObj = getComponent(inputEle, CheckBox);
        if (!checkBoxObj.disabled) {
            checkBoxObj.click();
        }
    };
    /**
     * Updates the checkbox.
     *
     * @param {RibbonCheckBoxSettingsModel} prop - Gets the checkbox property.
     * @param {string} id - Gets the ID of checkbox.
     * @returns {void}
     */
    RibbonCheckBox.prototype.updateCheckBox = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.checkBoxSettings, prop);
        var inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.change;
        var checkBoxObj = getComponent(inputEle, CheckBox);
        checkBoxObj.setProperties(prop);
    };
    return RibbonCheckBox;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonColorPicker = /** @class */ (function () {
    function RibbonColorPicker(parent) {
        this.parent = parent;
    }
    RibbonColorPicker.prototype.getModuleName = function () {
        return 'ribbonColorPicker';
    };
    RibbonColorPicker.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates the colorpicker.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.createColorPicker = function (item, itemEle) {
        var _this = this;
        var inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        var colorPickerSettings = item.colorPickerSettings;
        var colorPicker = new ColorPicker({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            columns: colorPickerSettings.columns,
            cssClass: (RIBBON_CONTROL + SPACE + (colorPickerSettings.cssClass ? colorPickerSettings.cssClass : '')).trim(),
            disabled: item.disabled,
            enableOpacity: colorPickerSettings.enableOpacity,
            mode: colorPickerSettings.mode,
            modeSwitcher: colorPickerSettings.modeSwitcher,
            noColor: colorPickerSettings.noColor,
            presetColors: colorPickerSettings.presetColors,
            showButtons: colorPickerSettings.showButtons,
            value: colorPickerSettings.value,
            beforeClose: function () {
                colorPicker.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
                if (colorPickerSettings.beforeClose) {
                    colorPickerSettings.beforeClose.call(_this);
                }
            },
            beforeOpen: colorPickerSettings.beforeOpen,
            beforeTileRender: colorPickerSettings.beforeTileRender,
            created: colorPickerSettings.created,
            change: function (e) {
                colorPickerSettings.value = e.value.toString();
                if (colorPickerSettings.change) {
                    colorPickerSettings.change.call(_this, e);
                }
            },
            open: function () {
                colorPicker.element.parentElement.classList.add(RIBBON_POPUP_OPEN);
                if (colorPickerSettings.open) {
                    colorPickerSettings.open.call(_this);
                }
            },
            select: colorPickerSettings.select
        }, inputEle);
        if (colorPickerSettings.htmlAttributes) {
            if (colorPickerSettings.htmlAttributes.id) {
                delete colorPickerSettings.htmlAttributes.id;
            }
            setCustomAttributes(inputEle, colorPickerSettings.htmlAttributes);
        }
        var wrapper = colorPicker.element.parentElement;
        EventHandler.add(wrapper, 'mouseenter', this.toggleWrapperHover.bind(this, wrapper, true), this);
        EventHandler.add(wrapper, 'mouseleave', this.toggleWrapperHover.bind(this, wrapper, false), this);
    };
    RibbonColorPicker.prototype.toggleWrapperHover = function (wrapper, isAdd) {
        if (isAdd) {
            wrapper.classList.add(RIBBON_HOVER);
        }
        else {
            wrapper.classList.remove(RIBBON_HOVER);
        }
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var colorPickerSettings = item.colorPickerSettings;
        if (colorPickerSettings.label && this.parent.activeLayout === 'Simplified') {
            var label = this.parent.createElement('div', {
                className: 'e-ribbon-colorpicker-label',
                id: item.id + '_label',
                innerHTML: colorPickerSettings.label
            });
            itemEle.insertBefore(label, itemEle.firstChild);
        }
        var colorPickerEle = itemEle.querySelector('#' + item.id);
        colorPickerEle.setAttribute('data-control', item.type.toString());
        var colorPickerObj = getComponent(colorPickerEle, ColorPicker);
        colorPickerObj.setProperties({ cssClass: colorPickerObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        //Accessing the private property 'splitBtn' of ColorPicker component to get the colorpicker instance as there is no close event in colorpicker.
        var splitBtn = colorPickerObj['splitBtn'];
        var target;
        colorPickerObj.beforeClose = function (e) {
            target = e.event ? e.event.target : null;
            colorPickerObj.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
            if (item.colorPickerSettings.beforeClose) {
                item.colorPickerSettings.beforeClose.call(_this);
            }
        };
        splitBtn.close = function () {
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                if (overflowButton.element.classList.contains('e-active')) {
                    overflowButton.toggle();
                }
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var colorPickerSettings = item.colorPickerSettings;
        if (colorPickerSettings.label) {
            var label = itemEle.querySelector('#' + item.id + '_label');
            if (label) {
                label.remove();
            }
        }
        var colorPickerEle = itemEle.querySelector('#' + item.id);
        var colorPickerObj = getComponent(colorPickerEle, ColorPicker);
        var cssClass = colorPickerObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        colorPickerObj.setProperties({ cssClass: cssClass.join(SPACE) });
        var splitBtn = colorPickerObj['splitBtn'];
        //Accessing the private property 'splitBtn' of ColorPicker component to get the colorpicker instance as there is no close event in colorpicker.
        splitBtn.close = null;
        colorPickerObj.beforeClose = function () {
            colorPickerObj.element.parentElement.classList.remove(RIBBON_POPUP_OPEN);
            if (item.colorPickerSettings.beforeClose) {
                item.colorPickerSettings.beforeClose.call(_this);
            }
        };
    };
    RibbonColorPicker.prototype.getColorPickerObj = function (controlId) {
        var inputEle = getItemElement(this.parent, controlId);
        return inputEle ? getComponent(inputEle, ColorPicker) : null;
    };
    /**
     * Gets color value in specified type.
     *
     * @param {string} controlId -Gets the control ID.
     * @param {string} value - Specify the color value.
     * @param {string} type - Specify the type to which the specified color needs to be converted.
     * @returns {string} - Returns string.
     */
    RibbonColorPicker.prototype.getValue = function (controlId, value, type) {
        var colorPickerObj = this.getColorPickerObj(controlId);
        return colorPickerObj ? colorPickerObj.getValue(value, type) : '';
    };
    /**
     * To show/hide ColorPicker popup based on current state of the SplitButton.
     *
     * @param {string} controlId - set the id of the control.
     * @returns {void} - Returns void.
     */
    RibbonColorPicker.prototype.toggle = function (controlId) {
        var colorPickerObj = this.getColorPickerObj(controlId);
        if (!colorPickerObj) {
            return;
        }
        if (!colorPickerObj.disabled) {
            colorPickerObj.toggle();
        }
    };
    /**
     * Updates the colorpicker properties.
     *
     * @param {RibbonColorPickerSettingsModel} prop - Gets the colorpicker property.
     * @param {string} id - Gets the ID of colorpicker.
     * @returns {void}
     */
    RibbonColorPicker.prototype.updateColorPicker = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.checkBoxSettings, prop);
        var inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.beforeClose;
        delete prop.open;
        var colorPickerObj = getComponent(inputEle, ColorPicker);
        colorPickerObj.setProperties(prop);
    };
    /**
     * @param {HTMLElement} element - Gets the colorpicker element to be destroyed.
     * @returns {void}
     * @hidden
     */
    RibbonColorPicker.prototype.unwireColorPickerEvents = function (element) {
        var colorPickerObj = getComponent(element, ColorPicker);
        var wrapper = colorPickerObj.element.parentElement;
        EventHandler.remove(wrapper, 'mouseenter', this.toggleWrapperHover);
        EventHandler.remove(wrapper, 'mouseleave', this.toggleWrapperHover);
    };
    return RibbonColorPicker;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonComboBox = /** @class */ (function () {
    function RibbonComboBox(parent) {
        this.parent = parent;
    }
    RibbonComboBox.prototype.getModuleName = function () {
        return 'ribbonComboBox';
    };
    RibbonComboBox.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates the combobox.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonComboBox.prototype.createComboBox = function (item, itemEle) {
        var _this = this;
        var inputEle = this.parent.createElement('input', {
            id: item.id
        });
        itemEle.appendChild(inputEle);
        var comboBoxSettings = item.comboBoxSettings;
        if (comboBoxSettings.htmlAttributes) {
            if (comboBoxSettings.htmlAttributes.id) {
                delete comboBoxSettings.htmlAttributes.id;
            }
        }
        new ComboBox({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            allowCustom: false,
            floatLabelType: 'Never',
            ignoreAccent: true,
            ignoreCase: true,
            allowFiltering: comboBoxSettings.allowFiltering,
            autofill: comboBoxSettings.autofill,
            cssClass: (RIBBON_CONTROL + SPACE + (comboBoxSettings.cssClass ? comboBoxSettings.cssClass : '')).trim(),
            dataSource: comboBoxSettings.dataSource,
            enabled: !item.disabled,
            fields: comboBoxSettings.fields,
            filterType: comboBoxSettings.filterType,
            footerTemplate: comboBoxSettings.footerTemplate,
            groupTemplate: comboBoxSettings.groupTemplate,
            headerTemplate: comboBoxSettings.headerTemplate,
            index: comboBoxSettings.index,
            itemTemplate: comboBoxSettings.itemTemplate,
            noRecordsTemplate: comboBoxSettings.noRecordsTemplate,
            placeholder: comboBoxSettings.placeholder,
            popupHeight: comboBoxSettings.popupHeight,
            popupWidth: comboBoxSettings.popupWidth,
            showClearButton: comboBoxSettings.showClearButton,
            sortOrder: comboBoxSettings.sortOrder,
            text: comboBoxSettings.text,
            value: comboBoxSettings.value,
            width: comboBoxSettings.width,
            beforeOpen: comboBoxSettings.beforeOpen,
            open: comboBoxSettings.open,
            htmlAttributes: comboBoxSettings.htmlAttributes,
            close: function (e) {
                if (comboBoxSettings.close) {
                    comboBoxSettings.close.call(_this, e);
                }
            },
            filtering: comboBoxSettings.filtering,
            change: comboBoxSettings.change,
            select: comboBoxSettings.select,
            created: comboBoxSettings.created
        }, inputEle);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonComboBox.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var comboBoxSettings = item.comboBoxSettings;
        if (comboBoxSettings.label && this.parent.activeLayout === 'Simplified') {
            var label = this.parent.createElement('div', {
                className: 'e-ribbon-combobox-label',
                id: item.id + '_label',
                innerHTML: comboBoxSettings.label
            });
            itemEle.insertBefore(label, itemEle.firstChild);
        }
        var inputEle = itemEle.querySelector('#' + item.id);
        inputEle.setAttribute('data-control', item.type.toString());
        var comboBoxObj = getComponent(inputEle, ComboBox);
        comboBoxObj.setProperties({ cssClass: comboBoxObj.cssClass + SPACE + RIBBON_POPUP_CONTROL });
        comboBoxObj.close = function (e) {
            var target = e.event ? e.event.target : null;
            if (item.comboBoxSettings.close) {
                item.comboBoxSettings.close.call(_this, e);
            }
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                if (overflowButton.element.classList.contains('e-active')) {
                    overflowButton.toggle();
                }
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonComboBox.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var comboBoxSettings = item.comboBoxSettings;
        if (comboBoxSettings.label) {
            var label = itemEle.querySelector('#' + item.id + '_label');
            if (label) {
                label.remove();
            }
        }
        var inputEle = itemEle.querySelector('#' + item.id);
        var comboBoxObj = getComponent(inputEle, ComboBox);
        var cssClass = comboBoxObj.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        comboBoxObj.setProperties({ cssClass: cssClass.join(SPACE) });
        comboBoxObj.close = function (e) {
            if (item.comboBoxSettings.close) {
                item.comboBoxSettings.close.call(_this, e);
            }
        };
    };
    RibbonComboBox.prototype.getComboBoxObj = function (controlId) {
        var inputEle = getItemElement(this.parent, controlId);
        return inputEle ? getComponent(inputEle, ComboBox) : null;
    };
    /**
     * To filter the data from given data source by using query
     *
     * @param  {string } controlId - set the id of the control in which methods needs to be called.
     * @param  {Object[] } dataSource - Set the data source to filter.
     * @param  {Query} query - Specify the query to filter the data.
     * @param  {FieldSettingsModel} fields - Specify the fields to map the column in the data table.
     * @returns {void}
     */
    RibbonComboBox.prototype.filter = function (controlId, dataSource, query, fields) {
        this.getComboBoxObj(controlId).filter(dataSource, query, fields);
    };
    /**
     * To open/close DropDownButton popup based on current state of the combobox.
     *
     * @param {string} controlId - Gets the id of the control.
     * @returns {void}
     */
    RibbonComboBox.prototype.hidePopup = function (controlId) {
        var comboBoxObj = this.getComboBoxObj(controlId);
        if (!comboBoxObj) {
            return;
        }
        comboBoxObj.hidePopup();
    };
    /**
     * To open/close DropDownButton popup based on current state of the combobox.
     *
     * @param {string} controlId - Gets the id of the control.
     * @returns {void}
     */
    RibbonComboBox.prototype.showPopup = function (controlId) {
        var comboBoxObj = this.getComboBoxObj(controlId);
        if (!comboBoxObj) {
            return;
        }
        comboBoxObj.showPopup();
    };
    /**
     * Updates the combobox properties.
     *
     * @param {RibbonComboBoxSettingsModel} prop - Gets the combobox property.
     * @param {string} id - Gets the ID of combobox.
     * @returns {void}
     */
    RibbonComboBox.prototype.updateComboBox = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.comboBoxSettings, prop);
        var inputEle = getItemElement(this.parent, id, itemProp);
        if (!inputEle) {
            return;
        }
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + prop.cssClass).trim();
        }
        delete prop.close;
        var comboBoxObj = getComponent(inputEle, ComboBox);
        comboBoxObj.setProperties(prop);
    };
    return RibbonComboBox;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonDropDown = /** @class */ (function () {
    function RibbonDropDown(parent) {
        this.parent = parent;
    }
    RibbonDropDown.prototype.getModuleName = function () {
        return 'ribbonDropDown';
    };
    RibbonDropDown.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates DropDown.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.createDropDown = function (item, itemEle) {
        var _this = this;
        var buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        var dropDownSettings = item.dropDownSettings;
        var cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (dropDownSettings.cssClass ?
            dropDownSettings.cssClass : '')).trim();
        new DropDownButton({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            closeActionEvents: dropDownSettings.closeActionEvents,
            content: item.activeSize === RibbonItemSize.Small ? '' : dropDownSettings.content,
            cssClass: cssClass + ((item.activeSize === RibbonItemSize.Large) ? (SPACE + VERTICAL_DDB) : ''),
            disabled: item.disabled,
            iconCss: dropDownSettings.iconCss,
            items: dropDownSettings.items,
            target: dropDownSettings.target,
            createPopupOnClick: dropDownSettings.createPopupOnClick,
            beforeClose: function (e) {
                if (dropDownSettings.beforeClose) {
                    dropDownSettings.beforeClose.call(_this, e);
                }
            },
            beforeItemRender: dropDownSettings.beforeItemRender,
            beforeOpen: dropDownSettings.beforeOpen,
            close: function (e) {
                if (dropDownSettings.close) {
                    dropDownSettings.close.call(_this, e);
                }
            },
            created: dropDownSettings.created,
            open: dropDownSettings.open,
            select: dropDownSettings.select
        }).appendTo(buttonEle);
        if (dropDownSettings.htmlAttributes) {
            if (dropDownSettings.htmlAttributes.id) {
                delete dropDownSettings.htmlAttributes.id;
            }
            setCustomAttributes(buttonEle, dropDownSettings.htmlAttributes);
        }
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var dropdownElement = itemEle.querySelector('#' + item.id);
        dropdownElement.setAttribute('data-control', item.type.toString());
        var dropdown = getComponent(dropdownElement, DropDownButton);
        dropdown.cssClass = dropdown.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        dropdown.dataBind();
        var target;
        dropdown.beforeClose = function (e) {
            if (item.dropDownSettings.beforeClose) {
                item.dropDownSettings.beforeClose.call(_this, e);
            }
            target = e.event ? e.event.target : null;
        };
        dropdown.close = function (e) {
            if (item.dropDownSettings.close) {
                item.dropDownSettings.close.call(_this, e);
            }
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                if (overflowButton.element.classList.contains('e-active')) {
                    overflowButton.toggle();
                }
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var dropdownElement = itemEle.querySelector('#' + item.id);
        var dropdown = getComponent(dropdownElement, DropDownButton);
        var cssClass = dropdown.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        dropdown.cssClass = cssClass.join(SPACE);
        dropdown.dataBind();
        dropdown.close = function (e) {
            if (item.dropDownSettings.close) {
                item.dropDownSettings.close.call(_this, e);
            }
        };
        dropdown.beforeClose = function (e) {
            if (item.dropDownSettings.beforeClose) {
                item.dropDownSettings.beforeClose.call(_this, e);
            }
        };
    };
    /**
     * Creates Overflow DropDown.
     *
     * @param {string} id - Gets the ID of the dropdown item.
     * @param {string} name - Gets the name of the dropdown item.
     * @param {string} iconCss - Gets the icon of the dropdown item.
     * @param {HTMLElement} groupEle - Gets the overflow group element.
     * @param {HTMLElement} overflowEle - Gets the overflow element.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.createOverFlowDropDown = function (id, name, iconCss, groupEle, overflowEle, enableRtl) {
        var _this = this;
        this.enableRtl = enableRtl;
        var buttonEle = this.parent.createElement('button', {
            id: id + OVERFLOW_ID + DROPDOWN_ID
        });
        groupEle.setAttribute('tabindex', '0');
        overflowEle.appendChild(buttonEle);
        var dropdown = new DropDownButton({
            iconCss: iconCss,
            target: groupEle,
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            cssClass: VERTICAL_DDB + SPACE + RIBBON_GROUP_OVERFLOW_DDB,
            iconPosition: 'Top',
            content: name,
            beforeClose: function (args) {
                args.cancel = !isNullOrUndefined(args.event && closest(args.event.target, '.' + RIBBON_POPUP_CONTROL));
            }
        }, buttonEle);
        createTooltip(groupEle, this.parent);
        buttonEle.onclick = buttonEle.onkeydown = function () { _this.itemIndex = 0; };
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        groupEle.onkeydown = function (e) { _this.keyActionHandler(e, groupEle), _this; };
        return dropdown;
    };
    RibbonDropDown.prototype.keyActionHandler = function (e, target) {
        var controlElements = Array.prototype.slice.call(target.querySelectorAll('.e-control'));
        var templateElements = Array.prototype.slice.call(target.querySelectorAll('.e-ribbon-template'));
        var items = controlElements.concat(templateElements);
        var comboBoxElements = target.querySelectorAll('.e-combobox');
        var comboBoxEle;
        if (comboBoxElements) {
            for (var i = 0; i < comboBoxElements.length; i++) {
                if (comboBoxElements[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                    comboBoxEle = comboBoxElements[parseInt(i.toString(), 10)];
                }
            }
        }
        if (comboBoxEle) {
            for (var i = 0; i < items.length; i++) {
                if (items[parseInt(i.toString(), 10)].classList.contains('e-combobox')) {
                    if (items[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                        this.itemIndex = i;
                    }
                }
            }
        }
        if (e.target.classList.contains('e-control') || e.target.classList.contains('e-ribbon-template') || e.target.classList.contains('e-ribbon-launcher-icon') ||
            e.target.classList.contains('e-ribbon-last-item') || e.target.classList.contains('e-ribbon-first-item')) {
            if (e.key === 'ArrowRight' || (!e.shiftKey && e.key === 'Tab')) {
                this.handleNavigation(e, !this.enableRtl, items);
            }
            if (e.key === 'ArrowLeft' || (e.shiftKey && e.key === 'Tab')) {
                this.handleNavigation(e, this.enableRtl, items);
            }
        }
    };
    RibbonDropDown.prototype.handleNavigation = function (e, enableRtl, items) {
        if (!(items[0].classList.contains('e-ribbon-first-item'))) {
            items[0].classList.add('e-ribbon-first-item');
        }
        if (!(items[items.length - 1].classList.contains('e-ribbon-last-item'))) {
            items[items.length - 1].classList.add('e-ribbon-last-item');
        }
        if (enableRtl) {
            if (this.itemIndex === 0 && items[parseInt(this.itemIndex.toString(), 10)].classList.contains('e-ribbon-first-item')) {
                this.updateItemIndex(e, items, true);
            }
            if (!e.target.classList.contains('e-combobox') && !e.target.classList.contains('e-ribbon-last-item') &&
                !e.target.classList.contains('e-ribbon-group-container') && (e.target.classList.contains('e-ribbon-first-item')
                || this.itemIndex !== 0) && (e.target.classList.contains('e-control') || e.target.classList.contains('e-ribbon-template'))) {
                this.itemIndex++;
                this.updateItemIndex(e, items, true);
            }
            if (e.target.classList.contains('e-ribbon-last-item')) {
                var launcherIcon = false;
                launcherIcon = this.focusLauncherIcon(e, items);
                if (!launcherIcon) {
                    this.itemIndex = 0;
                    this.updateItemIndex(e, items, true);
                }
            }
            if (e.target.classList.contains('e-ribbon-launcher-icon')) {
                this.itemIndex = 0;
                this.updateItemIndex(e, items, true);
            }
        }
        else {
            if (!e.target.classList.contains('e-combobox') && this.itemIndex !== 0) {
                this.itemIndex--;
                this.updateItemIndex(e, items, false);
            }
            if (e.target.classList.contains('e-ribbon-first-item')) {
                var launcherIcon = false;
                launcherIcon = this.focusLauncherIcon(e, items);
                if (!launcherIcon) {
                    this.itemIndex = items.length - 1;
                    this.updateItemIndex(e, items, false);
                }
            }
            if (e.target.classList.contains('e-ribbon-launcher-icon')) {
                this.itemIndex = items.length - 1;
                this.updateItemIndex(e, items, false);
            }
        }
        if (e.target.classList.contains('e-combobox') && (e.key === 'Tab')) {
            if (enableRtl) {
                if (this.itemIndex < items.length - 1) {
                    this.itemIndex++;
                }
            }
            else {
                if (this.itemIndex > 0) {
                    this.itemIndex--;
                }
            }
        }
    };
    RibbonDropDown.prototype.focusLauncherIcon = function (e, items) {
        var groupContainer = items[parseInt(this.itemIndex.toString(), 10)].closest('.e-ribbon-group-container');
        var launcherIconEle;
        if (groupContainer) {
            launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
        }
        if (launcherIconEle) {
            if (e.key === 'Tab') {
                e.preventDefault();
            }
            groupContainer.querySelector('.e-ribbon-launcher-icon').focus();
            return true;
        }
        else {
            return false;
        }
    };
    RibbonDropDown.prototype.updateItemIndex = function (e, items, enableRtl) {
        var ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
        while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
            if (enableRtl) {
                if (this.itemIndex < items.length - 1) {
                    this.itemIndex++;
                }
                else {
                    var launcherIcon = false;
                    launcherIcon = this.focusLauncherIcon(e, items);
                    if (launcherIcon) {
                        break;
                    }
                    this.itemIndex = 0;
                }
            }
            else {
                if (this.itemIndex > 0) {
                    this.itemIndex--;
                }
                else {
                    var launcherIcon = false;
                    launcherIcon = this.focusLauncherIcon(e, items);
                    if (launcherIcon) {
                        break;
                    }
                    this.itemIndex = items.length - 1;
                }
            }
            ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
        }
        if (e.key === 'Tab') {
            e.preventDefault();
        }
        items[parseInt(this.itemIndex.toString(), 10)].focus();
    };
    /**
     * Removes Overflow DropDown.
     *
     * @param {HTMLElement} dropdownElement - Gets the ribbon DropDown element.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.removeOverFlowDropDown = function (dropdownElement) {
        var dropdown = getComponent(dropdownElement, DropDownButton);
        var tooltip = getComponent(dropdown.target, Tooltip);
        tooltip.destroy();
        dropdownElement.parentElement.parentElement.insertBefore(dropdown.target, dropdownElement.parentElement);
        dropdown.destroy();
        remove(dropdownElement);
    };
    /**
     * Gets DropDown item element.
     *
     * @param {HTMLElement} dropdownElement - Gets the ribbon DropDown element.
     * @param {string} id - Gets the ID of ribbon DropDown element.
     * @returns {HTMLElement} - Returns the DropDown item element.
     * @hidden
     */
    RibbonDropDown.prototype.getDDBItemElement = function (dropdownElement, id) {
        var dropdown = getComponent(dropdownElement, DropDownButton);
        var dropDownPopup = dropdown.dropDown.element;
        return dropDownPopup.querySelector('#' + id);
    };
    /**
     * Gets Overflow DropDown Popup.
     *
     * @param {itemProps} itemProp - Gets the property of ribbon item.
     * @param {HTMLElement} contentEle - Gets the content element.
     * @returns {HTMLElement} - Returns the Overflow DropDown Popup.
     * @hidden
     */
    RibbonDropDown.prototype.getOverflowDropDownPopup = function (itemProp, contentEle) {
        var dropdownElement = contentEle.querySelector('#' + this.parent.tabs[itemProp.tabIndex].groups[itemProp.groupIndex].id + OVERFLOW_ID + DROPDOWN_ID);
        var dropdown = getComponent(dropdownElement, DropDownButton);
        return dropdown.dropDown.element;
    };
    RibbonDropDown.prototype.getDropDownObj = function (controlId) {
        var dropDownEle = getItemElement(this.parent, controlId);
        return dropDownEle ? getComponent(dropDownEle, DropDownButton) : null;
    };
    /**
     * Adds a new item to the menu. By default, new item appends to
     * the list as the last item, but you can insert based on the text parameter.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {ItemModel[]} Items - Gets the DropDown items.
     * @param {string} text - Gets the text of the dropdown item where the new item needs to be inserted.
     * @returns {void}
     */
    RibbonDropDown.prototype.addItems = function (controlId, Items, text) {
        this.getDropDownObj(controlId).addItems(Items, text);
    };
    /**
     * Removes the items from the menu.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {string[]} Items -
     * @param {string} isUniqueId -
     * @returns {void}
     */
    RibbonDropDown.prototype.removeItems = function (controlId, Items, isUniqueId) {
        this.getDropDownObj(controlId).removeItems(Items, isUniqueId);
    };
    /**
     * To open/close DropDownButton popup based on current state of the DropDownButton.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonDropDown.prototype.toggle = function (controlId) {
        var dropdownObj = this.getDropDownObj(controlId);
        if (!dropdownObj) {
            return;
        }
        if (!dropdownObj.disabled) {
            dropdownObj.toggle();
        }
    };
    /**
     * Updates the dropdown.
     *
     * @param {RibbonDropDownSettingsModel} prop - Gets the dropdown property.
     * @param {string} id - Gets the ID of dropdown.
     * @returns {void}
     */
    RibbonDropDown.prototype.updateDropDown = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.dropDownSettings, prop);
        var btnEle = getItemElement(this.parent, id, itemProp);
        if (!btnEle) {
            return;
        }
        var control = getComponent(btnEle, DropDownButton);
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + ITEM_VERTICAL_CENTER + SPACE + prop.cssClass).trim();
            prop.cssClass = itemProp.item.activeSize === RibbonItemSize.Large ?
                (VERTICAL_DDB + SPACE + prop.cssClass).trim() : prop.cssClass;
            control.cssClass = prop.cssClass;
        }
        delete prop.close;
        delete prop.beforeClose;
        if (prop.content) {
            prop.content = itemProp.item.activeSize === RibbonItemSize.Small ? '' : prop.content;
        }
        control.setProperties(prop);
    };
    /**
     * Updated DropDown size
     *
     * @param {HTMLElement} element - Gets the dropdown element.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    RibbonDropDown.prototype.updateDropDownSize = function (element, item) {
        var control = getComponent(element, DropDownButton);
        var cssClass = control.cssClass.split(SPACE);
        if (item.activeSize === RibbonItemSize.Large) {
            cssClass.push(VERTICAL_DDB);
        }
        else {
            cssClass = cssClass.filter(function (value) { return value !== VERTICAL_DDB; });
        }
        control.cssClass = cssClass.join(SPACE);
        control.setProperties({ iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left' });
        control.setProperties({ content: item.activeSize === RibbonItemSize.Small ? '' : item.dropDownSettings.content });
    };
    return RibbonDropDown;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonSplitButton = /** @class */ (function () {
    function RibbonSplitButton(parent) {
        this.parent = parent;
    }
    RibbonSplitButton.prototype.getModuleName = function () {
        return 'ribbonSplitButton';
    };
    RibbonSplitButton.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates SplitButton.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.createSplitButton = function (item, itemEle) {
        var _this = this;
        var buttonEle = this.parent.createElement('button', {
            id: item.id
        });
        itemEle.appendChild(buttonEle);
        var splitButtonSettings = item.splitButtonSettings;
        var cssClass = (ITEM_VERTICAL_CENTER + SPACE + RIBBON_CONTROL + SPACE + (splitButtonSettings.cssClass ?
            splitButtonSettings.cssClass : '')).trim();
        var splitbutton = new SplitButton({
            locale: this.parent.locale,
            enableRtl: this.parent.enableRtl,
            enablePersistence: this.parent.enablePersistence,
            iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
            closeActionEvents: splitButtonSettings.closeActionEvents,
            cssClass: cssClass + ((item.activeSize === RibbonItemSize.Large) ? (SPACE + VERTICAL_DDB) : ''),
            disabled: item.disabled,
            iconCss: splitButtonSettings.iconCss,
            items: splitButtonSettings.items,
            target: splitButtonSettings.target,
            beforeClose: function (e) {
                if (splitButtonSettings.beforeClose) {
                    splitButtonSettings.beforeClose.call(_this, e);
                }
            },
            beforeItemRender: splitButtonSettings.beforeItemRender,
            beforeOpen: splitButtonSettings.beforeOpen,
            close: function () {
                splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.close) {
                    splitButtonSettings.close.call(_this);
                }
            },
            created: splitButtonSettings.created,
            open: function () {
                splitbutton['wrapper'].classList.add(RIBBON_POPUP_OPEN);
                if (splitButtonSettings.open) {
                    splitButtonSettings.open.call(_this);
                }
            },
            select: splitButtonSettings.select,
            click: function (e) {
                if (splitButtonSettings.click) {
                    splitButtonSettings.click.call(_this, e);
                }
            }
        }, buttonEle);
        if (splitButtonSettings.htmlAttributes) {
            if (splitButtonSettings.htmlAttributes.id) {
                delete splitButtonSettings.htmlAttributes.id;
            }
            setCustomAttributes(buttonEle, splitButtonSettings.htmlAttributes);
        }
        var dropdownEle = buttonEle.parentElement.querySelector('.e-dropdown-btn');
        dropdownEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        this.setContent(item, splitbutton);
        var wrapper = splitbutton['wrapper'];
        EventHandler.add(wrapper, 'mouseenter', function () { wrapper.classList.add(RIBBON_HOVER); }, this);
        EventHandler.add(wrapper, 'mouseleave', function () { wrapper.classList.remove(RIBBON_HOVER); }, this);
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var splitButtonEle = itemEle.querySelector('#' + item.id);
        splitButtonEle.setAttribute('data-control', item.type.toString());
        var splitbutton = getComponent(splitButtonEle, SplitButton);
        splitbutton.cssClass = splitbutton.cssClass + SPACE + RIBBON_POPUP_CONTROL;
        splitbutton.dataBind();
        var dropdownEle = splitButtonEle.parentElement.querySelector('.e-dropdown-btn');
        var ddbId = dropdownEle.getAttribute('id');
        var popupEle = document.querySelector('#' + ddbId + '-popup');
        dropdownEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.stopImmediatePropagation();
                dropdownEle.click();
            }
        };
        popupEle.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                splitbutton['wrapper'].classList.remove('e-ribbon-open');
                popupEle.querySelector('.e-focused').click();
            }
        };
        var target;
        splitbutton.beforeClose = function (e) {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(_this, e);
            }
            target = e.event ? e.event.target : null;
        };
        splitbutton.click = function (e) {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(_this, e);
            }
            if (overflowButton.element.classList.contains('e-active')) {
                overflowButton.toggle();
            }
        };
        splitbutton.close = function (e) {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(_this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
            if (target && !target.closest('.e-ribbon-group-overflow-ddb')) {
                if (overflowButton.element.classList.contains('e-active')) {
                    overflowButton.toggle();
                }
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved from overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.removeOverFlowEvents = function (item, itemEle) {
        var _this = this;
        var splitButtonEle = itemEle.querySelector('#' + item.id);
        var splitbutton = getComponent(splitButtonEle, SplitButton);
        var cssClass = splitbutton.cssClass.split(SPACE);
        cssClass = cssClass.filter(function (value) { return value !== RIBBON_POPUP_CONTROL; });
        splitbutton.cssClass = cssClass.join(SPACE);
        splitbutton.dataBind();
        splitbutton.beforeClose = function (e) {
            if (item.splitButtonSettings.beforeClose) {
                item.splitButtonSettings.beforeClose.call(_this, e);
            }
        };
        splitbutton.click = function (e) {
            if (item.splitButtonSettings.click) {
                item.splitButtonSettings.click.call(_this, e);
            }
        };
        splitbutton.close = function (e) {
            if (item.splitButtonSettings.close) {
                item.splitButtonSettings.close.call(_this, e);
            }
            splitbutton['wrapper'].classList.remove(RIBBON_POPUP_OPEN);
        };
    };
    RibbonSplitButton.prototype.setContent = function (item, control) {
        control['primaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Medium) ? item.splitButtonSettings.content : '' });
        control['secondaryBtnObj'].setProperties({ content: (item.activeSize === RibbonItemSize.Large) ? item.splitButtonSettings.content : '' });
    };
    RibbonSplitButton.prototype.getSplitButtonObj = function (controlId) {
        var splitButtonEle = getItemElement(this.parent, controlId);
        return getComponent(splitButtonEle, SplitButton);
    };
    /**
     * Adds a new item to the menu. By default, new item appends to
     * the list as the last item, but you can insert based on the text parameter.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {ItemModel[]} Items - Gets the SplitButton items.
     * @param {string} text - Gets the text of the splitbutton item where the new item needs to be inserted.
     * @returns {void}
     */
    RibbonSplitButton.prototype.addItems = function (controlId, Items, text) {
        this.getSplitButtonObj(controlId).addItems(Items, text);
    };
    /**
     * Removes the items from the menu.
     *
     * @param {string} controlId - Gets the control ID.
     * @param {string[]} Items -
     * @param {string} isUniqueId -
     * @returns {void}
     */
    RibbonSplitButton.prototype.removeItems = function (controlId, Items, isUniqueId) {
        this.getSplitButtonObj(controlId).removeItems(Items, isUniqueId);
    };
    /**
     * To open/close SplitButton popup based on current state of the SplitButton.
     *
     * @param {string} controlId - Gets the control ID.
     * @returns {void}
     */
    RibbonSplitButton.prototype.toggle = function (controlId) {
        var splitBtnObj = this.getSplitButtonObj(controlId);
        if (!splitBtnObj) {
            return;
        }
        if (!splitBtnObj.disabled) {
            splitBtnObj.toggle();
        }
    };
    /**
     * Updates the splitbutton.
     *
     * @param {RibbonSplitButtonSettingsModel} prop - Gets the splitbutton property.
     * @param {string} id - Gets the ID of dropdown.
     * @returns {void}
     */
    RibbonSplitButton.prototype.updateSplitButton = function (prop, id) {
        var itemProp = getItem(this.parent.tabs, id);
        if (!itemProp) {
            return;
        }
        merge(itemProp.item.splitButtonSettings, prop);
        var btnEle = getItemElement(this.parent, id, itemProp);
        if (!btnEle) {
            return;
        }
        var control = getComponent(btnEle, SplitButton);
        if (prop.cssClass) {
            prop.cssClass = (RIBBON_CONTROL + SPACE + ITEM_VERTICAL_CENTER + SPACE + prop.cssClass).trim();
            prop.cssClass = itemProp.item.activeSize === RibbonItemSize.Large ?
                (VERTICAL_DDB + SPACE + prop.cssClass).trim() : prop.cssClass;
            control.cssClass = prop.cssClass;
        }
        delete prop.open;
        delete prop.click;
        delete prop.close;
        delete prop.beforeClose;
        control.setProperties(prop);
        if (prop.content) {
            this.setContent(itemProp.item, control);
        }
    };
    /**
     * Updated SplitButton size
     *
     * @param {HTMLElement} element - Gets the splibutton element.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    RibbonSplitButton.prototype.updateSplitButtonSize = function (element, item) {
        var control = getComponent(element, SplitButton);
        var cssClass = control.cssClass.split(SPACE);
        if (item.activeSize === RibbonItemSize.Large) {
            cssClass.push(VERTICAL_DDB);
        }
        else {
            cssClass = cssClass.filter(function (value) { return value !== VERTICAL_DDB; });
        }
        control.cssClass = cssClass.join(SPACE);
        control.setProperties({ iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left' });
        this.setContent(item, control);
    };
    return RibbonSplitButton;
}());

/**
 * Gets index value.
 *
 * @param {Array} arr - Gets the array to find index.
 * @param {boolean} condition - Defines whether index matches with the value.
 * @returns {number} - Gets the index value.
 * @hidden
 */
function getIndex(arr, condition) {
    for (var i = 0; i < arr.length; i++) {
        if (condition(arr[parseInt(i.toString(), 10)], i)) {
            return i;
        }
    }
    return -1;
}
/**
 * Gets template content based on the template property value.
 *
 * @param {string | HTMLElement| Function} template - Template property value.
 * @returns {Function} - Return template function.
 * @hidden
 */
function getTemplateFunction(template) {
    if (typeof template === 'string') {
        var content = '';
        try {
            var tempEle = select(template);
            if (tempEle) {
                //Return innerHTML incase of jsrenderer script else outerHTML
                content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
            }
            else {
                content = template;
            }
        }
        catch (e) {
            content = template;
        }
        return compile(content);
    }
    else {
        /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
        return compile(template);
    }
}
/**
 * Gets the ribbon item
 *
 * @param {RibbonTabModel} tabs - Gets the ribbon tab model.
 * @param {string} id - Gets the ID of the tab.
 * @param {RibbonItemType} type - Gets the type of the item.
 * @returns {itemProps} - Gets the ribbon item.
 * @hidden
 */
function getItem(tabs, id, type) {
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[parseInt(i.toString(), 10)];
        for (var j = 0; j < tab.groups.length; j++) {
            var group = tab.groups[parseInt(j.toString(), 10)];
            for (var k = 0; k < group.collections.length; k++) {
                var collection = group.collections[parseInt(k.toString(), 10)];
                for (var l = 0; l < collection.items.length; l++) {
                    var item = collection.items[parseInt(l.toString(), 10)];
                    if ((id && item.id === id) || (type && item.type === type)) {
                        return {
                            item: item, collection: collection, group: group,
                            tabIndex: i, groupIndex: j, collectionIndex: k, itemIndex: l
                        };
                    }
                }
            }
        }
    }
    return null;
}
/**
 * Gets the ribbon collection.
 *
 * @param {RibbonTabModel} tabs - Gets the ribbon tab model.
 * @param {string} id - Gets the ID of the tab.
 * @returns {itemProps} - Gets the ribbon collection.
 * @hidden
 */
function getCollection(tabs, id) {
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[parseInt(i.toString(), 10)];
        for (var j = 0; j < tab.groups.length; j++) {
            var group = tab.groups[parseInt(j.toString(), 10)];
            for (var k = 0; k < group.collections.length; k++) {
                var collection = group.collections[parseInt(k.toString(), 10)];
                if (collection.id === id) {
                    return {
                        collection: collection, group: group,
                        tabIndex: i, groupIndex: j, collectionIndex: k
                    };
                }
            }
        }
    }
    return null;
}
/**
 * Gets the ribbon group.
 *
 * @param {RibbonTabModel} tabs - Gets the ribbon tab model.
 * @param {string} id - Gets the ID of the tab.
 * @returns {itemProps} - Gets the ribbon group.
 * @hidden
 */
function getGroup(tabs, id) {
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[parseInt(i.toString(), 10)];
        for (var j = 0; j < tab.groups.length; j++) {
            var group = tab.groups[parseInt(j.toString(), 10)];
            if (group.id === id) {
                return {
                    group: group, tabIndex: i, groupIndex: j
                };
            }
        }
    }
    return null;
}
/**
 * @param {HTMLElement} element - Gets the element to be destroyed.
 * @param {string} moduleName - Gets the module name.
 * @returns {void}
 * @hidden
 */
function destroyControl(element, moduleName) {
    var control = getComponent(element, moduleName);
    control.destroy();
}
/**
 * Updates common properties.
 *
 * @param {HTMLElement} element - Gets the element to be updated.
 * @param {string} moduleName - Gets the module name.
 * @param {commonProperties} commonProp - Gets the common properties to be updated.
 * @returns {void}
 * @hidden
 */
function updateCommonProperty(element, moduleName, commonProp) {
    var control = getComponent(element, moduleName);
    control.setProperties(commonProp);
}
/**
 * Updates disabled control.
 *
 * @param {HTMLElement} element - Gets the element to be disabled.
 * @param {string} moduleName - Gets the module name.
 * @param {boolean} disable - Defines whether the control to be disabled or not.
 * @returns {void}
 * @hidden
 */
function updateControlDisabled(element, moduleName, disable) {
    var control = getComponent(element, moduleName);
    control.setProperties(moduleName === 'combobox' ? { enabled: !disable } : { disabled: disable });
}
/**
 * Gets the ribbon item element.
 *
 * @param {Ribbon} parent - Gets the parent element.
 * @param {string} id - Gets the ID of the item.
 * @param {itemProps} itemProp - Gets the ribbon item.
 * @returns {HTMLElement} - Gets the ribbon item element.
 * @hidden
 */
function getItemElement(parent, id, itemProp) {
    if (!itemProp) {
        itemProp = getItem(parent.tabs, id);
        if (!itemProp) {
            return null;
        }
    }
    var contentEle = parent.tabObj.items[itemProp.tabIndex].content;
    if (contentEle.innerHTML === '') {
        return null;
    }
    if (parent.activeLayout === RibbonLayout.Classic) {
        if (itemProp.item.displayOptions & DisplayMode.Classic) {
            contentEle = (itemProp.group.isCollapsed) ? parent.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle)
                : contentEle;
            return contentEle.querySelector('#' + id);
        }
        else {
            return null;
        }
    }
    else {
        //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
        var ele = (itemProp.item.displayOptions & DisplayMode.Simplified) ?
            contentEle.querySelector('#' + itemProp.item.id) : null;
        // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
        if (!ele) {
            var dropdown = itemProp.group.enableGroupOverflow ?
                getComponent(contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID), DropDownButton)
                : parent.overflowDDB;
            ele = dropdown.target.querySelector('#' + itemProp.item.id);
        }
        return ele;
    }
}
/**
 * @param {RibbonTooltipModel} tooltip - Gets the property of tooltip.
 * @returns {boolean} - Gets whether the tooltip is present or not.
 * @hidden
 */
function isTooltipPresent(tooltip) {
    return (tooltip.content || tooltip.iconCss || tooltip.title || tooltip.id || tooltip.cssClass) ? true : false;
}
/**
 * Sets content for tooltip.
 *
 * @param {TooltipEventArgs} args - Gets the argument of tooltip.
 * @param {Tooltip} tooltip - Gets the tooltip to set the content.
 * @param {ribbonTooltipData} tooltipData - Gets the tooltip data.
 * @returns {void}
 * @hidden
 */
function setToolTipContent(args, tooltip, tooltipData) {
    var targetId = args.target.getAttribute('id');
    var dataObj = tooltipData.filter(function (e) { return e.id === targetId; })[0];
    var data = dataObj.data;
    var content = tooltip.createElement('div', {
        id: data.id ? RIBBON_TOOLTIP_CONTAINER + '_' + data.id : RIBBON_TOOLTIP_CONTAINER
    });
    tooltip.element.append(content);
    if (data.title) {
        var header = tooltip.createElement('div', {
            innerHTML: data.title,
            className: RIBBON_TOOLTIP_TITLE
        });
        content.appendChild(header);
    }
    var textContainer = tooltip.createElement('div', {
        className: RIBBON_TEXT_CONTAINER
    });
    content.appendChild(textContainer);
    if (data.iconCss) {
        var customCss = tooltip.createElement('div', {
            className: data.iconCss + ' ' + RIBBON_TOOLTIP_ICON
        });
        textContainer.appendChild(customCss);
    }
    if (data.content) {
        var tooltipContent = tooltip.createElement('div', {
            innerHTML: data.content,
            className: RIBBON_TOOLTIP_CONTENT
        });
        textContainer.appendChild(tooltipContent);
    }
    tooltip.setProperties({
        content: content,
        cssClass: data.cssClass ? data.cssClass + ' ' + RIBBON_TOOLTIP : RIBBON_TOOLTIP
    });
}
/**
 * Creates tooltip.
 *
 * @param {HTMLElement} element - Gets the element to add tooltip.
 * @param {Ribbon} ribbon - Gets the ribbon.
 * @returns {void}
 * @hidden
 */
function createTooltip(element, ribbon) {
    var ribbonTooltip = new Tooltip({
        target: '.' + RIBBON_TOOLTIP_TARGET,
        beforeRender: beforeTooltipRender.bind(this),
        windowCollision: true
    });
    ribbonTooltip.appendTo(element);
    /**
     * @param {TooltipEventArgs} args - Gets the tooltip argument.
     * @returns {void}
     * @hidden
     */
    function beforeTooltipRender(args) {
        setToolTipContent(args, ribbonTooltip, ribbon.tooltipData);
    }
}
/**
 * Destroys tooltip
 *
 * @param {HTMLElement} element - Gets the element in which the tooltip needs to be destroyed.
 * @returns {void}
 * @hidden
 */
function destroyTooltip(element) {
    var control = getComponent(element, Tooltip);
    control.destroy();
}
/**
 * Updates tooltip
 *
 * @param {HTMLElement} element - Gets the element in which the tooltip needs to be Updated.
 * @param {commonProperties} prop - Gets the property to be updated.
 * @returns {void}
 * @hidden
 */
function updateTooltipProp(element, prop) {
    var control = getComponent(element, Tooltip);
    control.setProperties(prop);
}
/**
 * Sets the HTML attributes of an element
 *
 * @param {HTMLElement} element - The HTML element for which attributes are to be updated.
 * @param {commonProperties} attributes - An object containing key-value pairs of attributes to be updated.
 * @returns {void}
 * @hidden
 */
function setCustomAttributes(element, attributes) {
    for (var key in attributes) {
        if (key === 'class') {
            var elementClass = attributes['class'].replace(/\s+/g, ' ').trim();
            if (elementClass) {
                addClass([element], elementClass.split(' '));
            }
        }
        else if (key === 'style') {
            var prevStyles = element.getAttribute('style') || '';
            var value = "" + prevStyles + attributes["" + key];
            element.setAttribute("" + key, value);
        }
        else {
            element.setAttribute(key, attributes["" + key]);
        }
    }
}

/**
 * Defines the items of Ribbon.
 */
var RibbonGroupButton = /** @class */ (function () {
    function RibbonGroupButton(parent) {
        this.parent = parent;
        this.isSelected = false;
    }
    RibbonGroupButton.prototype.getModuleName = function () {
        return 'ribbonGroupButton';
    };
    RibbonGroupButton.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates Group Button
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemElement - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGroupButton.prototype.createGroupButton = function (item, itemElement) {
        var _this = this;
        var groupBtnSettings = item.groupButtonSettings;
        this.count = 0;
        var btnContainerEle = this.parent.createElement('div', {
            id: item.id + RIBBON_GROUP_BUTTON_ID,
            className: 'e-btn-group'
        });
        itemElement.appendChild(btnContainerEle);
        for (var i = 0; i < groupBtnSettings.items.length; i++) {
            if ((groupBtnSettings.items[parseInt(i.toString(), 10)].iconCss)) {
                var groupButtonEle = this.parent.createElement('button', {
                    id: item.id + RIBBON_GROUP_BUTTON_ID + i,
                    className: RIBBON_GROUP_BUTTON
                });
                btnContainerEle.appendChild(groupButtonEle);
                new Button({
                    iconCss: groupBtnSettings.items[parseInt(i.toString(), 10)].iconCss,
                    disabled: item.disabled,
                    enableRtl: this.parent.enableRtl,
                    content: item.activeSize === RibbonItemSize.Small ? '' : groupBtnSettings.items[parseInt(i.toString(), 10)].content,
                    iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left'
                }, groupButtonEle);
                if (groupBtnSettings.items[parseInt(i.toString(), 10)].htmlAttributes) {
                    setCustomAttributes(groupButtonEle, groupBtnSettings.items[parseInt(i.toString(), 10)].htmlAttributes);
                }
                if (groupBtnSettings.items[parseInt(i.toString(), 10)].content) {
                    groupButtonEle.classList.add(RIBBON_GROUP_BUTTON_CONTENT);
                    groupButtonEle.setAttribute('aria-label', groupBtnSettings.items[parseInt(i.toString(), 10)].content);
                }
                else {
                    groupButtonEle.setAttribute('aria-label', 'groupbuttonitem');
                }
                var buttonEle = itemElement.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i);
                if (groupBtnSettings.selection === RibbonGroupButtonSelection.Single) {
                    btnContainerEle.classList.add(RIBBON_SINGLE_BUTTON_SELECTION);
                }
                else {
                    btnContainerEle.classList.add(RIBBON_MULTIPLE_BUTTON_SELECTION);
                }
                if (groupBtnSettings.items[parseInt(i.toString(), 10)].selected) {
                    if (groupBtnSettings.selection === RibbonGroupButtonSelection.Multiple) {
                        buttonEle.classList.add('e-active');
                    }
                    else {
                        if (this.count < 1) {
                            buttonEle.classList.add('e-active');
                            this.count++;
                        }
                    }
                }
                if (groupBtnSettings.items[parseInt(i.toString(), 10)].ribbonTooltipSettings &&
                    isTooltipPresent(groupBtnSettings.items[parseInt(i.toString(), 10)].ribbonTooltipSettings)) {
                    groupButtonEle.classList.add(RIBBON_TOOLTIP_TARGET);
                    this.parent.tooltipData.push({
                        id: groupButtonEle.id, data: groupBtnSettings.items[parseInt(i.toString(), 10)].ribbonTooltipSettings
                    });
                }
                EventHandler.add(buttonEle, 'click', this.groupButtonClicked.bind(this, i, item, groupBtnSettings), this);
            }
        }
        if (this.parent.activeLayout === 'Simplified') {
            var dropdownIcon = void 0;
            var activeEleCount = 0;
            var count = 0;
            var buttonEle = this.parent.createElement('button', {
                id: item.id
            });
            itemElement.appendChild(buttonEle);
            for (var i = 0; i < groupBtnSettings.items.length; i++) {
                if (item.groupButtonSettings.items[parseInt(i.toString(), 10)].selected &&
                    !this.isSelected && groupBtnSettings.selection === RibbonGroupButtonSelection.Single) {
                    dropdownIcon = item.groupButtonSettings.items[parseInt(i.toString(), 10)].iconCss;
                    this.isSelected = true;
                }
                else if (item.groupButtonSettings.items[parseInt(i.toString(), 10)].selected &&
                    groupBtnSettings.selection === RibbonGroupButtonSelection.Multiple) {
                    activeEleCount++;
                    if (activeEleCount === 1) {
                        dropdownIcon = item.groupButtonSettings.items[parseInt(i.toString(), 10)].iconCss;
                    }
                    else {
                        dropdownIcon = null;
                    }
                }
            }
            while (count < item.groupButtonSettings.items.length && !this.isSelected && !dropdownIcon) {
                if (item.groupButtonSettings.items[parseInt(count.toString(), 10)].iconCss) {
                    dropdownIcon = item.groupButtonSettings.items[parseInt(count.toString(), 10)].iconCss;
                    this.isSelected = true;
                }
                count++;
            }
            var dropdown = new DropDownButton({
                iconCss: dropdownIcon,
                target: btnContainerEle,
                enableRtl: this.parent.enableRtl,
                cssClass: 'e-ribbon-dropdown-group-button',
                disabled: item.disabled
            }, buttonEle);
            if (groupBtnSettings.header) {
                var dropDownPopup = dropdown.dropDown;
                this.addGroupButtonHeader(item.id, groupBtnSettings, dropDownPopup.element);
            }
            buttonEle.onclick = buttonEle.onkeydown = function () {
                _this.handleFocusState(item, itemElement);
            };
            btnContainerEle.onkeydown = function (e) {
                if (_this.parent.activeLayout === 'Simplified') {
                    _this.handleGroupButtonNavigation(e, item);
                }
            };
            createTooltip(btnContainerEle, this.parent);
            this.isSelected = false;
        }
    };
    RibbonGroupButton.prototype.groupButtonClicked = function (itemIndex, item, grpBtnSettings) {
        var previousItems = [];
        var selectingItems = [];
        var selectedItems = [];
        var groupButtonEle;
        var dropdown;
        for (var j = 0; j < grpBtnSettings.items.length; j++) {
            if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + j)) {
                if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + j).classList.contains('e-active')) {
                    previousItems.push(grpBtnSettings.items[parseInt(j.toString(), 10)]);
                }
            }
        }
        if (!(document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.contains('e-active'))) {
            selectingItems.push(grpBtnSettings.items[parseInt(itemIndex.toString(), 10)]);
        }
        var eventArgs = {
            cancel: false, previousItems: previousItems, selectingItems: selectingItems
        };
        if (grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].beforeClick) {
            grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].beforeClick.call(this, eventArgs);
        }
        if (eventArgs.cancel) {
            return;
        }
        else {
            if (grpBtnSettings.selection === RibbonGroupButtonSelection.Single) {
                if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID).classList.contains(RIBBON_MULTIPLE_BUTTON_SELECTION)) {
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID).classList.remove(RIBBON_MULTIPLE_BUTTON_SELECTION);
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID).classList.add(RIBBON_SINGLE_BUTTON_SELECTION);
                }
                for (var j = 0; j < grpBtnSettings.items.length; j++) {
                    if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + j) && document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + j).classList.contains('e-active')) {
                        document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + j).classList.remove('e-active');
                        grpBtnSettings.items[parseInt(j.toString(), 10)].
                            setProperties({ selected: false }, true);
                    }
                }
                document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.toggle('e-active');
                grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].setProperties({ selected: true }, true);
                if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.contains('e-active') && this.parent.activeLayout === 'Simplified') {
                    this.grpBtnIndex = itemIndex;
                    groupButtonEle = document.querySelector('#' + item.id);
                    dropdown = getComponent(groupButtonEle, DropDownButton);
                    dropdown.setProperties({
                        iconCss: grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].iconCss
                    });
                }
            }
            else {
                if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID).classList.contains(RIBBON_SINGLE_BUTTON_SELECTION)) {
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID).classList.remove(RIBBON_SINGLE_BUTTON_SELECTION);
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID).classList.add(RIBBON_MULTIPLE_BUTTON_SELECTION);
                }
                document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.toggle('e-active');
                if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.contains('e-active')) {
                    grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].
                        setProperties({ selected: true }, true);
                }
                else {
                    grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].
                        setProperties({ selected: false }, true);
                }
                var activeEleCount = 0;
                for (var n = 0; n < grpBtnSettings.items.length; n++) {
                    if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + n) && document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + n).classList.contains('e-active') && this.parent.activeLayout === 'Simplified' && n !== itemIndex) {
                        this.isSelected = true;
                        activeEleCount++;
                    }
                }
                if (this.parent.activeLayout === 'Simplified') {
                    var dropdownIcon = null;
                    var itemsCount = 0;
                    groupButtonEle = document.querySelector('#' + item.id);
                    dropdown = getComponent(groupButtonEle, DropDownButton);
                    if (!this.isSelected) {
                        if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.contains('e-active')) {
                            dropdownIcon = grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].iconCss;
                        }
                    }
                    else {
                        if (activeEleCount === 1 && !(document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.contains('e-active'))) {
                            for (var n = 0; n < grpBtnSettings.items.length; n++) {
                                if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + n) && document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + n).classList.contains('e-active')) {
                                    dropdownIcon = grpBtnSettings.items[parseInt(n.toString(), 10)].iconCss;
                                }
                            }
                        }
                    }
                    while (itemsCount < grpBtnSettings.items.length && !dropdownIcon) {
                        if (grpBtnSettings.items[parseInt(itemsCount.toString(), 10)].iconCss) {
                            dropdownIcon = grpBtnSettings.items[parseInt(itemsCount.toString(), 10)].iconCss;
                        }
                        itemsCount++;
                    }
                    dropdown.setProperties({ iconCss: dropdownIcon });
                    this.grpBtnIndex = itemIndex;
                }
                this.isSelected = false;
            }
            if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + itemIndex).classList.contains('e-active')) {
                selectedItems.push(grpBtnSettings.items[parseInt(itemIndex.toString(), 10)]);
            }
            var eventArgs_1 = { previousItems: previousItems, selectedItems: selectedItems };
            if (grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].click) {
                grpBtnSettings.items[parseInt(itemIndex.toString(), 10)].click.call(this, eventArgs_1);
            }
        }
    };
    /**
     * updates group button in mode switching
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemElement - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGroupButton.prototype.switchGroupButton = function (item, itemElement) {
        var _this = this;
        var groupBtnSettings = item.groupButtonSettings;
        var dropdownIcon = null;
        var activeEleCount = 0;
        var itemsCount = 0;
        if (this.parent.activeLayout === 'Simplified') {
            var containerEle = itemElement.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
            var buttonEle = this.parent.createElement('button', {
                id: item.id
            });
            itemElement.appendChild(buttonEle);
            for (var i = 0; i < groupBtnSettings.items.length; i++) {
                if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i)) {
                    if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i).classList.contains('e-active') && groupBtnSettings.selection === RibbonGroupButtonSelection.Single) {
                        dropdownIcon = groupBtnSettings.items[parseInt(i.toString(), 10)].iconCss;
                    }
                    else if (document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i).classList.contains('e-active') && groupBtnSettings.selection === RibbonGroupButtonSelection.Multiple) {
                        activeEleCount++;
                        if (activeEleCount === 1) {
                            dropdownIcon = groupBtnSettings.items[parseInt(i.toString(), 10)].iconCss;
                        }
                        else if (activeEleCount > 1) {
                            dropdownIcon = null;
                        }
                    }
                }
            }
            while (itemsCount < groupBtnSettings.items.length && !dropdownIcon) {
                if (groupBtnSettings.items[parseInt(itemsCount.toString(), 10)].iconCss) {
                    dropdownIcon = groupBtnSettings.items[parseInt(itemsCount.toString(), 10)].iconCss;
                }
                itemsCount++;
            }
            var dropdown = new DropDownButton({
                iconCss: dropdownIcon,
                target: containerEle,
                enableRtl: this.parent.enableRtl,
                cssClass: 'e-ribbon-dropdown-group-button',
                disabled: item.disabled
            }, buttonEle);
            if (groupBtnSettings.header) {
                var dropDownPopup = dropdown.dropDown;
                this.addGroupButtonHeader(item.id, groupBtnSettings, dropDownPopup.element);
            }
            buttonEle.onclick = buttonEle.onkeydown = function () {
                _this.handleFocusState(item, itemElement);
            };
            containerEle.onkeydown = function (e) {
                if (_this.parent.activeLayout === 'Simplified') {
                    _this.handleGroupButtonNavigation(e, item);
                }
            };
            createTooltip(containerEle, this.parent);
        }
        else {
            var groupButtonEle = itemElement.querySelector('#' + item.id);
            var dropdown = getComponent(groupButtonEle, DropDownButton);
            itemElement.appendChild(dropdown.target);
            if (groupButtonEle) {
                dropdown.destroy();
                remove(groupButtonEle);
            }
        }
    };
    RibbonGroupButton.prototype.handleFocusState = function (item, itemElement) {
        if (itemElement.querySelector('#' + item.id).classList.contains('e-active')) {
            var defaultSelectedBtn = document.querySelector('#' + item.id + '_grpbtn').querySelector('.' + RIBBON_GROUP_BUTTON + '.e-active');
            if (defaultSelectedBtn) {
                defaultSelectedBtn.focus();
            }
            else {
                document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + 0).focus();
            }
            this.grpBtnIndex = 0;
        }
    };
    RibbonGroupButton.prototype.addGroupButtonHeader = function (itemID, groupBtnSettings, popupEle) {
        var groupButtonHeader = this.parent.createElement('div', {
            className: 'e-ribbon-groupbutton-header',
            id: itemID + HEADER_ID,
            innerHTML: groupBtnSettings.header
        });
        popupEle.insertBefore(groupButtonHeader, popupEle.firstChild);
    };
    RibbonGroupButton.prototype.handleGroupButtonNavigation = function (e, item) {
        var groupButtonEle = document.querySelector('#' + item.id);
        var dropdown = getComponent(groupButtonEle, DropDownButton);
        var targetEle = dropdown.target;
        var isOverflowPopup = false;
        if (this.parent.activeLayout === 'Simplified' && targetEle.closest('.e-ribbon-dropdown-group-button').classList.contains(RIBBON_GROUP_BUTTON_OVERFLOW_POPUP)) {
            isOverflowPopup = true;
        }
        if (e.key === 'Tab') {
            e.preventDefault();
        }
        var groupBtnSettings = item.groupButtonSettings;
        if ((e.key === 'ArrowRight' && !isOverflowPopup) || (e.key === 'ArrowDown' && isOverflowPopup)) {
            if (!this.parent.enableRtl || (e.key === 'ArrowDown' && isOverflowPopup)) {
                this.grpBtnIndex++;
                if (this.grpBtnIndex < groupBtnSettings.items.length) {
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
                else {
                    this.grpBtnIndex = 0;
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
            }
            else {
                if (this.grpBtnIndex === 0) {
                    this.grpBtnIndex = groupBtnSettings.items.length - 1;
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
                else {
                    this.grpBtnIndex--;
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
            }
        }
        else if ((e.key === 'ArrowLeft' && !isOverflowPopup) || (e.key === 'ArrowUp' && isOverflowPopup)) {
            if (!this.parent.enableRtl || (e.key === 'ArrowUp' && isOverflowPopup)) {
                if (this.grpBtnIndex === 0) {
                    this.grpBtnIndex = groupBtnSettings.items.length - 1;
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
                else {
                    this.grpBtnIndex--;
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
            }
            else {
                this.grpBtnIndex++;
                if (this.grpBtnIndex < groupBtnSettings.items.length) {
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
                else {
                    this.grpBtnIndex = 0;
                    document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + (this.grpBtnIndex)).focus();
                }
            }
        }
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @param {DropDownButton} overflowButton - Gets the overflow button.
     * @returns {void}
     * @hidden
     */
    RibbonGroupButton.prototype.addOverFlowEvents = function (item, itemEle, overflowButton) {
        var _this = this;
        var groupBtnSettings = item.groupButtonSettings;
        var isIconOnly = true;
        var groupButtonEle = itemEle.querySelector('#' + item.id);
        var dropdown = getComponent(groupButtonEle, DropDownButton);
        dropdown.setProperties({ cssClass: dropdown.cssClass + SPACE + RIBBON_GROUP_BUTTON_OVERFLOW_POPUP, content: groupBtnSettings.header ? groupBtnSettings.header : '' });
        var targetEle = dropdown.target;
        if (targetEle.children.length) {
            for (var i = 0; i < targetEle.children.length; i++) {
                if (groupBtnSettings.items[parseInt(i.toString(), 10)].content) {
                    isIconOnly = false;
                    break;
                }
            }
            if (isIconOnly) {
                targetEle.classList.add('e-icon-btn');
            }
        }
        targetEle.onclick = function () {
            if (_this.parent.activeLayout === 'Simplified' && targetEle.closest('.e-ribbon-dropdown-group-button').classList.contains(RIBBON_GROUP_BUTTON_OVERFLOW_POPUP)) {
                dropdown.toggle();
                if (overflowButton.element.classList.contains('e-active')) {
                    overflowButton.toggle();
                }
            }
        };
    };
    /**
     * Removes the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGroupButton.prototype.removeOverFlowEvents = function (item, itemEle) {
        var groupButtonEle = itemEle.querySelector('#' + item.id);
        if (groupButtonEle) {
            var dropdown = getComponent(groupButtonEle, DropDownButton);
            var targetEle = dropdown.target;
            if (targetEle.classList.contains('e-icon-btn')) {
                targetEle.classList.remove('e-icon-btn');
            }
            var cssClass = dropdown.cssClass.split(SPACE);
            cssClass = cssClass.filter(function (value) { return value !== RIBBON_GROUP_BUTTON_OVERFLOW_POPUP; });
            dropdown.setProperties({ cssClass: cssClass.join(SPACE), content: '' });
        }
    };
    /**
     * Removes DropDown.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item.
     * @returns {void}
     * @hidden
     */
    RibbonGroupButton.prototype.destroyDropDown = function (item) {
        var groupButtonEle = document.querySelector('#' + item.id);
        if (groupButtonEle) {
            var dropdown = getComponent(groupButtonEle, DropDownButton);
            var tooltip = getComponent(dropdown.target, Tooltip);
            tooltip.destroy();
            dropdown.destroy();
            remove(groupButtonEle);
        }
    };
    /**
     * Updates the group button size.
     *
     * @param {HTMLElement} itemElement - Gets the group button container element.
     * @param {RibbonItemModel} item - Gets the ribbon item.
     * @returns {void}
     * @hidden
     */
    RibbonGroupButton.prototype.updateGroupButtonSize = function (itemElement, item) {
        var groupBtnSettings = item.groupButtonSettings;
        var buttonEle;
        for (var i = 0; i < groupBtnSettings.items.length; i++) {
            if (this.parent.activeLayout === 'Classic') {
                buttonEle = itemElement.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i);
            }
            else {
                buttonEle = document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i);
            }
            if (buttonEle) {
                var buttonObj = getComponent(buttonEle, Button);
                buttonObj.setProperties({
                    iconPosition: item.activeSize === RibbonItemSize.Large ? 'Top' : 'Left',
                    content: item.activeSize === RibbonItemSize.Small ? '' : groupBtnSettings.items[parseInt(i.toString(), 10)].content
                });
            }
        }
    };
    return RibbonGroupButton;
}());

/**
 * Defines the items of Ribbon.
 */
var RibbonGallery = /** @class */ (function () {
    function RibbonGallery(parent) {
        this.count = 0;
        this.isAdded = false;
        this.galleryItemsIndex = 0;
        this.registeredTemplate = {};
        this.parent = parent;
        var ref = 'viewContainerRef';
        setValue('registeredTemplate', this.registeredTemplate, this);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(ref, this.parent["" + ref], this);
    }
    RibbonGallery.prototype.getModuleName = function () {
        return 'ribbonGallery';
    };
    RibbonGallery.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates gallery.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.createGallery = function (item, itemEle) {
        var _this = this;
        var gallerySettings = item.gallerySettings;
        this.renderGalleryItems(gallerySettings, false, item.id, itemEle);
        var buttonEle = this.parent.createElement('button', {
            id: item.id + '_popupButton',
            className: 'e-ribbon-gallery-button e-icons e-drop-icon'
        });
        buttonEle.setAttribute('aria-label', 'gallerydropdownbutton');
        itemEle.appendChild(buttonEle);
        this.createPopup(item, buttonEle);
        buttonEle.onclick = function (args) {
            var popupEle = document.querySelector('#' + item.id + '_galleryPopup');
            if (popupEle) {
                var popup = getComponent(popupEle, Popup);
                if (popupEle.classList.contains('e-popup-close')) {
                    _this.showPopup(popup, popupEle, args, gallerySettings, item.id);
                }
                else {
                    _this.hidePopup(popup, popupEle, args, gallerySettings, item.id);
                }
            }
        };
        document.onclick = function (args) {
            var popupEle = document.querySelectorAll('.e-ribbon-gallery-popup.e-popup-open');
            var popupID;
            var itemProp;
            for (var i = 0; i < popupEle.length; i++) {
                var popup = getComponent(popupEle[parseInt(i.toString(), 10)], Popup);
                if (args.target.classList.contains('e-ribbon-gallery-button')) {
                    popupID = (popupEle[parseInt(i.toString(), 10)].id).replace(/_galleryPopup/g, '');
                    if ((args.target.id).replace(/_popupButton/g, '') !== popupID) {
                        itemProp = getItem(_this.parent.tabs, popupID);
                        _this.hidePopup(popup, popupEle[parseInt(i.toString(), 10)], args, itemProp.item.gallerySettings, popupID);
                        break;
                    }
                }
                else {
                    popupID = (popupEle[parseInt(i.toString(), 10)].id).replace(/_galleryPopup/g, '');
                    itemProp = getItem(_this.parent.tabs, popupID);
                    _this.hidePopup(popup, popupEle[parseInt(i.toString(), 10)], args, itemProp.item.gallerySettings, popupID);
                    break;
                }
            }
        };
    };
    RibbonGallery.prototype.renderGalleryItems = function (gallerySettings, isPopup, id, itemEle) {
        var _this = this;
        var galleryContainerEle;
        var galleryEle;
        var itemProp = getItem(this.parent.tabs, id);
        if (itemProp && itemProp.group) {
            itemProp.group.isCollapsible = false;
        }
        var galleryWrapper = this.parent.createElement('div', {
            className: 'e-ribbon-gallery-wrapper',
            id: id + '_galleryWrapper'
        });
        if (!isPopup) {
            itemEle.appendChild(galleryWrapper);
        }
        var _loop_1 = function (i) {
            var isHeightDefined = false;
            galleryContainerEle = this_1.parent.createElement('ol', {
                className: 'e-ribbon-gallery-container',
                id: id + '_galleryContainer' + i
            });
            if (gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight && gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight !== 'auto') {
                isHeightDefined = true;
            }
            if (gallerySettings.groups[parseInt(i.toString(), 10)].cssClass) {
                galleryContainerEle.classList.add(gallerySettings.groups[parseInt(i.toString(), 10)].cssClass);
            }
            var _loop_2 = function (j) {
                galleryEle = this_1.parent.createElement('li', {
                    className: 'e-ribbon-gallery-item',
                    id: (isPopup ? 'popup_' : '') + galleryContainerEle.id + '_gallery' + j,
                    attrs: { 'tabindex': '0' }
                });
                var itemEventArgs = { name: 'beforeItemRender', item: gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)] };
                if (gallerySettings.beforeItemRender) {
                    gallerySettings.beforeItemRender.call(this_1, itemEventArgs);
                }
                galleryContainerEle.appendChild(galleryEle);
                if (gallerySettings.selectedItemIndex && gallerySettings.selectedItemIndex === this_1.count) {
                    galleryEle.classList.add('e-ribbon-gallery-selected');
                }
                else {
                    if (!gallerySettings.selectedItemIndex && this_1.count === 0) {
                        galleryEle.classList.add('e-ribbon-gallery-selected');
                        gallerySettings.selectedItemIndex = this_1.count;
                    }
                }
                this_1.count = this_1.count + 1;
                galleryEle.onclick = function (e) {
                    _this.setActiveState(e.currentTarget, gallerySettings, id, true, e, isPopup);
                };
                galleryEle.onkeydown = function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        _this.setActiveState(e.currentTarget, gallerySettings, id, true, e, isPopup);
                    }
                };
                galleryEle.onmouseover = function (e) {
                    var hoverEventArgs = { event: e, name: 'itemHover', item: gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)] };
                    if (gallerySettings.itemHover) {
                        gallerySettings.itemHover.call(_this, hoverEventArgs);
                    }
                };
                if (gallerySettings.groups[parseInt(i.toString(), 10)].itemWidth && gallerySettings.groups[parseInt(i.toString(), 10)].itemWidth !== 'auto') {
                    galleryEle.style.width = gallerySettings.groups[parseInt(i.toString(), 10)].itemWidth + 'px';
                }
                if (gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight && gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight !== 'auto') {
                    galleryEle.style.height = gallerySettings.groups[parseInt(i.toString(), 10)].itemHeight + 'px';
                    galleryEle.style.paddingTop = '0px';
                    galleryEle.style.paddingBottom = '0px';
                    if (this_1.parent.activeLayout !== 'Simplified' && !isPopup) {
                        galleryContainerEle.style.flexFlow = 'wrap';
                    }
                }
                if ((!gallerySettings.template && !gallerySettings.popupTemplate) ||
                    ((gallerySettings.template && !gallerySettings.popupTemplate) && isPopup) ||
                    ((gallerySettings.popupTemplate && !gallerySettings.template) && !isPopup)) {
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].htmlAttributes) {
                        setCustomAttributes(galleryEle, gallerySettings.groups[parseInt(i.toString(), 10)]
                            .items[parseInt(j.toString(), 10)].htmlAttributes);
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss) {
                        var iconEle = this_1.parent.createElement('span', {
                            className: 'e-ribbon-gallery-icons' + ' ' + gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss
                        });
                        galleryEle.appendChild(iconEle);
                        if (this_1.parent.activeLayout === 'Simplified' && !isPopup) {
                            iconEle.classList.add('e-hidden');
                        }
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].content) {
                        galleryEle.appendChild(this_1.parent.createElement('span', {
                            innerHTML: gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].content,
                            className: 'e-ribbon-gallery-text'
                        }));
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].disabled) {
                        galleryEle.classList.add('e-disabled');
                    }
                    if (gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].cssClass) {
                        galleryEle.classList.add(gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].cssClass);
                    }
                }
                if (gallerySettings.template && !isPopup) {
                    this_1.createGalleryTemplate(galleryEle, gallerySettings, id, gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)]);
                }
                if (gallerySettings.popupTemplate && isPopup) {
                    this_1.createGalleryPopupTemplate(galleryEle, gallerySettings, id, gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)]);
                }
                if ((!isPopup && !isHeightDefined && (gallerySettings.itemCount === this_1.count))) {
                    galleryWrapper.appendChild(galleryContainerEle);
                    this_1.isAdded = true;
                    return "break";
                }
            };
            for (var j = 0; j < gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                var state_2 = _loop_2(j);
                if (state_2 === "break")
                    break;
            }
            if (this_1.isAdded && !isPopup) {
                return "break";
            }
            if (!isPopup) {
                galleryWrapper.appendChild(galleryContainerEle);
            }
            else {
                itemEle.appendChild(galleryContainerEle);
            }
            if (isPopup && gallerySettings.groups[parseInt(i.toString(), 10)].header) {
                var headerEle = (this_1.parent.createElement('div', {
                    className: 'e-ribbon-gallery-header',
                    innerHTML: gallerySettings.groups[parseInt(i.toString(), 10)].header
                }));
                itemEle.insertBefore(headerEle, galleryContainerEle);
            }
        };
        var this_1 = this;
        for (var i = 0; i < gallerySettings.groups.length; i++) {
            var state_1 = _loop_1(i);
            if (state_1 === "break")
                break;
        }
        this.count = 0;
        this.isAdded = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.isReact) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.portals = this.parent.portals.concat(this['portals']);
            this.parent['renderReactTemplates']();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this['portals'] = undefined;
        }
    };
    RibbonGallery.prototype.setWrapperWidth = function (itemCount, galleryWrapper, gallerySettings, itemID) {
        var count = 1;
        var itemsWidth = 0;
        var isWidthApplied = false;
        for (var i = 0; i < gallerySettings.groups.length; i++) {
            for (var j = 0; j < gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                if (itemCount >= count) {
                    var galleryItemEle = galleryWrapper.querySelector('#' + itemID + '_galleryContainer' + i + '_gallery' + j);
                    if (galleryItemEle) {
                        itemsWidth += galleryItemEle.offsetWidth;
                        var itemStyles = window.getComputedStyle(galleryItemEle);
                        if (itemStyles) {
                            var paddingWidth = parseFloat(itemStyles.paddingLeft) + parseFloat(itemStyles.paddingRight);
                            if (!(isNullOrUndefined(paddingWidth))) {
                                itemsWidth += paddingWidth;
                            }
                            var marginWidth = parseFloat(itemStyles.marginLeft) + parseFloat(itemStyles.marginRight);
                            if (!(isNullOrUndefined(marginWidth))) {
                                itemsWidth += marginWidth;
                            }
                        }
                    }
                }
                else {
                    isWidthApplied = true;
                    break;
                }
                count++;
            }
            if (isWidthApplied) {
                break;
            }
        }
        if (itemsWidth > 0) {
            galleryWrapper.style.width = itemsWidth + 'px';
        }
    };
    /**
     * Checks the gallery items height.
     *
     * @param {HTMLElement} activeContent - Gets the current active content.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.checkAvailableHeight = function (activeContent) {
        var galleryWrapperItems = activeContent.querySelectorAll('.e-ribbon-gallery-wrapper');
        for (var n = 0; n < galleryWrapperItems.length; n++) {
            var count = 0;
            var simplifiedItemsCount = 0;
            var isHeight = false;
            var galleryWrapper = galleryWrapperItems[parseInt(n.toString(), 10)];
            var itemID = galleryWrapper.id.replace(/_galleryWrapper/g, '');
            var galleryWrapperHeight = galleryWrapper.offsetHeight;
            var itemProp = getItem(this.parent.tabs, itemID);
            if (itemProp) {
                this.setWrapperWidth(itemProp.item.gallerySettings.itemCount, galleryWrapper, itemProp.item.gallerySettings, itemID);
                for (var i = 0; i < itemProp.item.gallerySettings.groups.length; i++) {
                    for (var j = 0; j < itemProp.item.gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                        var galleryItemEle = galleryWrapper.querySelector('#' + itemID + '_galleryContainer' + i + '_gallery' + j);
                        if (galleryItemEle) {
                            if (this.parent.activeLayout === 'Classic') {
                                if (galleryItemEle.classList.contains('e-hidden')) {
                                    galleryItemEle.classList.remove('e-hidden');
                                }
                                if (!isHeight) {
                                    var itemsValues = 0;
                                    var itemStyles = window.getComputedStyle(galleryItemEle);
                                    if (itemStyles) {
                                        var marginWidth = parseFloat(itemStyles.marginTop) + parseFloat(itemStyles.marginBottom);
                                        if (!(isNullOrUndefined(marginWidth))) {
                                            itemsValues += marginWidth;
                                        }
                                    }
                                    count++;
                                    if (itemProp.item.gallerySettings.itemCount === count) {
                                        count = 0;
                                        if (galleryWrapperHeight >= (galleryItemEle.offsetHeight + itemsValues)) {
                                            galleryWrapperHeight -= (galleryItemEle.offsetHeight + itemsValues);
                                        }
                                        else {
                                            isHeight = true;
                                            galleryItemEle.remove();
                                        }
                                    }
                                    else if (galleryWrapperHeight < (galleryItemEle.offsetHeight + itemsValues)) {
                                        isHeight = true;
                                        galleryItemEle.remove();
                                    }
                                }
                                else {
                                    galleryItemEle.remove();
                                }
                            }
                            else {
                                simplifiedItemsCount++;
                                if (simplifiedItemsCount > itemProp.item.gallerySettings.itemCount) {
                                    galleryItemEle.classList.add('e-hidden');
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * Checks the popup collision.
     *
     * @param {Popup} popup - Gets the popup.
     * @param {HTMLElement} popupEle - Gets the popup element.
     * @param {number} offsetValue - Gets the offset value of gallery popup button.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.checkCollision = function (popup, popupEle, offsetValue) {
        if (offsetValue === void 0) { offsetValue = 0; }
        var paddingWidth = 0;
        var marginWidth = 0;
        if (popupEle) {
            var windowWidth = window.innerWidth;
            var screenWidth = offsetValue === 0 ? windowWidth : Math.abs(windowWidth - (windowWidth - offsetValue));
            var paddingStyles = window.getComputedStyle(popupEle);
            if (paddingStyles) {
                paddingWidth = parseFloat(paddingStyles.paddingLeft) + parseFloat(paddingStyles.paddingRight);
                if (!(isNullOrUndefined(paddingWidth))) {
                    screenWidth = screenWidth - paddingWidth;
                }
            }
            var popupContainerItems = popupEle.querySelectorAll('.e-ribbon-gallery-container');
            if (popup.width !== 'auto') {
                popupContainerItems.forEach(function (ele) {
                    ele.style.flexFlow = 'wrap';
                });
            }
            var isCollideOccurs = false;
            for (var i = 0; i < popupContainerItems.length; i++) {
                var itemsWidth = 0;
                for (var j = 0; j < popupContainerItems[parseInt(i.toString(), 10)].querySelectorAll('.e-ribbon-gallery-item').length; j++) {
                    var popupItemStyles = window.getComputedStyle(popupContainerItems[parseInt(i.toString(), 10)].querySelectorAll('.e-ribbon-gallery-item')[parseInt(j.toString(), 10)]);
                    if (popupItemStyles) {
                        marginWidth = parseFloat(popupItemStyles.marginLeft) + parseFloat(popupItemStyles.marginRight);
                        if (!(isNullOrUndefined(marginWidth))) {
                            itemsWidth += marginWidth;
                        }
                    }
                    itemsWidth += Math.round(parseFloat(popupItemStyles.width));
                    if (((screenWidth <= itemsWidth) && popup.width === 'auto') || ((popup.width !== 'auto') && (screenWidth <= parseInt(popup.width.toString(), 10)) && (screenWidth <= itemsWidth))) {
                        popupEle.style.width = ((itemsWidth + Math.abs(paddingWidth - marginWidth)) - Math.round(parseFloat(popupItemStyles.width))) + 'px';
                        isCollideOccurs = true;
                        break;
                    }
                }
                if (isCollideOccurs) {
                    popupContainerItems.forEach(function (ele) {
                        ele.style.flexFlow = 'wrap';
                    });
                    if (popup.height === 'auto') {
                        this.setGalleryPopupHeight(popupEle, parseFloat(paddingStyles.height), parseFloat(paddingStyles.top));
                    }
                    break;
                }
            }
            if (!isCollideOccurs) {
                if (popup.width === 'auto') {
                    popupContainerItems.forEach(function (ele) {
                        ele.style.flexFlow = 'nowrap';
                    });
                    popupEle.style.width = 'auto';
                }
                else {
                    popupEle.style.width = (popup.width).toString();
                }
                if (popup.height === 'auto') {
                    this.setGalleryPopupHeight(popupEle, parseFloat(paddingStyles.height), parseFloat(paddingStyles.top));
                }
            }
        }
    };
    RibbonGallery.prototype.setGalleryPopupHeight = function (popupEle, popupHeight, popupTop) {
        if (window.innerHeight < popupHeight || window.innerHeight < Math.round(popupHeight + popupTop)) {
            popupEle.style.height = (window.innerHeight - popupTop) + 'px';
        }
        else {
            popupEle.style.height = 'auto';
        }
    };
    RibbonGallery.prototype.createPopup = function (item, buttonEle) {
        var popupContainer = this.parent.createElement('div', {
            className: 'e-ribbon-popup-container',
            id: item.id + '_popupContainer'
        });
        this.renderGalleryItems(item.gallerySettings, true, item.id, popupContainer);
        var gallerypopupElement = this.parent.createElement('div', {
            className: 'e-ribbon-gallery-popup',
            id: item.id + '_galleryPopup'
        });
        document.body.append(gallerypopupElement);
        var galleryPopup = new Popup(gallerypopupElement, {
            relateTo: buttonEle,
            content: popupContainer,
            collision: { X: 'fit', Y: 'flip' },
            actionOnScroll: 'hide',
            targetType: 'relative',
            position: { X: 'left', Y: 'bottom' },
            enableRtl: this.parent.enableRtl,
            width: item.gallerySettings.popupWidth,
            height: item.gallerySettings.popupHeight
        });
        galleryPopup.hide();
    };
    /**
     * Updates gallery in mode switching.
     *
     * @param {string} activeLayout - Gets the current active layout.
     * @param {string} itemID - Gets the ribbon item id.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.switchGalleryItems = function (activeLayout, itemID) {
        var itemEle = this.parent.element.querySelector('#' + itemID + CONTAINER_ID);
        var itemProp = getItem(this.parent.tabs, itemID);
        if (itemEle) {
            var galleryIcons = itemEle.querySelectorAll('.e-ribbon-gallery-icons');
            var galleryContainer = itemEle.querySelectorAll('.e-ribbon-gallery-container');
            if (galleryIcons.length) {
                for (var i = 0; i < galleryIcons.length; i++) {
                    if (activeLayout === 'Simplified') {
                        galleryIcons[parseInt(i.toString(), 10)].classList.add('e-hidden');
                    }
                    else {
                        galleryIcons[parseInt(i.toString(), 10)].classList.remove('e-hidden');
                    }
                }
            }
            if (galleryContainer.length && itemProp) {
                for (var n = 0; n < itemProp.item.gallerySettings.groups.length; n++) {
                    for (var i = 0; i < galleryContainer.length; i++) {
                        if (itemProp.item.gallerySettings.groups[parseInt(n.toString(), 10)].itemHeight && itemProp.item.gallerySettings.groups[parseInt(n.toString(), 10)].itemHeight !== 'auto') {
                            if (itemID + '_galleryContainer' + n === galleryContainer[parseInt(i.toString(), 10)].id) {
                                if (activeLayout === 'Simplified') {
                                    galleryContainer[parseInt(i.toString(), 10)].style.flexFlow = 'nowrap';
                                }
                                else {
                                    galleryContainer[parseInt(i.toString(), 10)].style.flexFlow = 'wrap';
                                }
                            }
                        }
                    }
                }
            }
            var activeContent = this.parent.tabObj.element.querySelector('#' + this.parent.tabs[this.parent.selectedTab].id + CONTENT_ID);
            if (activeContent) {
                this.checkAvailableHeight(activeContent);
            }
        }
    };
    /**
     * Adds the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.addOverFlowEvents = function (item, itemEle) {
        var _this = this;
        if (itemEle.closest('.e-ribbon-overflow-target')) {
            var buttonEle = this.parent.createElement('button', {
                id: item.id
            });
            itemEle.appendChild(buttonEle);
            if (itemEle.querySelector('.e-ribbon-gallery-wrapper').classList.contains('e-disabled')) {
                buttonEle.classList.add('e-disabled');
            }
            itemEle.querySelector('.e-ribbon-gallery-wrapper').classList.add('e-hidden');
            itemEle.querySelectorAll('.e-ribbon-gallery-container').forEach(function (ele) {
                ele.classList.add('e-hidden');
            });
            var popupButton = itemEle.querySelector('#' + item.id + '_popupButton');
            if (popupButton) {
                popupButton.classList.add('e-hidden');
            }
            var itemProp = getItem(this.parent.tabs, item.id);
            var iconCss = itemProp && itemProp.group.groupIconCss ? itemProp.group.groupIconCss : '';
            var content = itemProp && itemProp.group.header ? itemProp.group.header : '';
            if (!iconCss) {
                for (var i = 0; i < item.gallerySettings.groups.length; i++) {
                    for (var j = 0; j < item.gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                        if (item.gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss) {
                            iconCss = item.gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)].iconCss;
                            break;
                        }
                    }
                    if (iconCss) {
                        break;
                    }
                }
            }
            var popupEle = document.querySelector('#' + item.id + '_galleryPopup');
            var popup = getComponent(popupEle, Popup);
            var popupContainerEle_1 = document.querySelector('#' + item.id + '_galleryPopup .e-ribbon-popup-container');
            var dropdown = new DropDownButton({
                iconCss: iconCss,
                content: content,
                target: popupContainerEle_1,
                enableRtl: this.parent.enableRtl,
                cssClass: 'e-ribbon-gallery-dropdown',
                disabled: item.disabled,
                open: function () {
                    _this.setFoucsToFirstItem(popupContainerEle_1, true, item.id);
                },
                beforeClose: function (args) {
                    var isCancelled = _this.popupEvents(args.event, item.gallerySettings, 'popupClose', false);
                    if (isCancelled) {
                        args.cancel = true;
                    }
                }
            }, buttonEle);
            if (popup.width !== 'auto') {
                dropdown.dropDown.width = formatUnit(popup.width);
            }
            if (popup.height !== 'auto') {
                dropdown.dropDown.height = formatUnit(popup.height);
                dropdown.dropDown.element.style.height = (popup.height).toString();
            }
        }
    };
    /**
     * Removes the additional event handlers as the item moved into overflow popup.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {HTMLElement} itemEle - Gets the ribbon item element.
     * @returns {void}
     * @hidden
     */
    RibbonGallery.prototype.removeOverFlowEvents = function (item, itemEle) {
        var popupButton = itemEle.querySelector('#' + item.id + '_popupButton');
        if (popupButton) {
            popupButton.classList.remove('e-hidden');
        }
        itemEle.querySelector('.e-ribbon-gallery-wrapper').classList.remove('e-hidden');
        itemEle.querySelectorAll('.e-ribbon-gallery-container').forEach(function (ele) {
            ele.classList.remove('e-hidden');
        });
        var galleryDDBEle = document.querySelector('#' + item.id);
        if (galleryDDBEle) {
            var popupEle = document.querySelector('#' + item.id + '_galleryPopup');
            var dropdown = getComponent(galleryDDBEle, DropDownButton);
            popupEle.appendChild(dropdown.target);
            dropdown.destroy();
            remove(galleryDDBEle);
        }
    };
    RibbonGallery.prototype.setActiveState = function (galleryEle, gallerySettings, itemID, isInteracted, event, isPopup) {
        var previousItem;
        var currentItem;
        var itemEle = document.querySelector('#' + itemID + CONTAINER_ID);
        var selctedGalleryItem = Array.prototype.slice.call(itemEle.querySelectorAll('.e-ribbon-gallery-selected'));
        var popupEle = document.querySelector('#' + itemID + '_popupContainer');
        var popupGalleryItem = Array.prototype.slice.call(popupEle.querySelectorAll('.e-ribbon-gallery-selected'));
        if (popupGalleryItem.length) {
            selctedGalleryItem = selctedGalleryItem.concat(popupGalleryItem);
        }
        for (var i = 0; i < gallerySettings.groups.length; i++) {
            for (var j = 0; j < gallerySettings.groups[parseInt(i.toString(), 10)].items.length; j++) {
                if (selctedGalleryItem[0].id === itemID + '_galleryContainer' + i + '_gallery' + j) {
                    previousItem = gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)];
                }
                if (galleryEle.id === (isPopup ? 'popup_' : '') + itemID + '_galleryContainer' + i + '_gallery' + j) {
                    currentItem = gallerySettings.groups[parseInt(i.toString(), 10)].items[parseInt(j.toString(), 10)];
                }
            }
        }
        var galleryItem = document.getElementById(galleryEle.id);
        var galleryItemPopup;
        var selectingEventArgs = { cancel: false, name: 'beforeSelect', previousItem: previousItem, currentItem: currentItem, isInteracted: isInteracted, event: event };
        if (gallerySettings.beforeSelect) {
            gallerySettings.beforeSelect.call(this, selectingEventArgs);
        }
        if (selectingEventArgs.cancel) {
            return;
        }
        else {
            for (var i = 0; i < selctedGalleryItem.length; i++) {
                selctedGalleryItem[parseInt(i.toString(), 10)].classList.remove('e-ribbon-gallery-selected');
            }
            if (!galleryItem.id.startsWith('popup_')) {
                galleryItemPopup = document.getElementById('popup_' + galleryEle.id);
            }
            else if (document.getElementById(galleryItem.id.slice(6))) {
                galleryItemPopup = document.getElementById(galleryItem.id.slice(6));
            }
            if (galleryItemPopup) {
                galleryItemPopup.classList.add('e-ribbon-gallery-selected');
            }
            galleryItem.classList.add('e-ribbon-gallery-selected');
            var selectedEventArgs = { previousItem: previousItem, currentItem: currentItem, name: 'select', isInteracted: isInteracted, event: event };
            var galleryPopupItems = document.querySelectorAll('#' + itemID + '_popupContainer .e-ribbon-gallery-item');
            for (var i = 0; i < galleryPopupItems.length; i++) {
                if (galleryPopupItems[parseInt(i.toString(), 10)].id === galleryEle.id) {
                    gallerySettings.selectedItemIndex = i;
                    break;
                }
            }
            if (gallerySettings.select) {
                gallerySettings.select.call(this, selectedEventArgs);
            }
        }
    };
    RibbonGallery.prototype.popupEvents = function (args, gallerySettings, name, isOpen) {
        var popupEventArgs = { cancel: false, event: args, name: name };
        if (isOpen && gallerySettings.popupOpen) {
            gallerySettings.popupOpen.call(this, popupEventArgs);
        }
        else if (!isOpen && gallerySettings.popupClose) {
            gallerySettings.popupClose.call(this, popupEventArgs);
        }
        if (popupEventArgs.cancel) {
            return true;
        }
        return false;
    };
    RibbonGallery.prototype.showPopup = function (popup, popupEle, args, gallerySettings, itemID) {
        var isCancelled = this.popupEvents(args, gallerySettings, 'popupOpen', true);
        if (isCancelled) {
            return;
        }
        popup.show();
        this.checkCollision(popup, popupEle);
        var buttonEle = document.querySelector('#' + itemID + '_popupButton');
        buttonEle.classList.add('e-gallery-button-active');
        var buttonPosition = buttonEle.getBoundingClientRect();
        if (popupEle.offsetWidth > buttonPosition.left) {
            this.checkCollision(popup, popupEle, buttonPosition.left);
        }
        var offsetX = Math.abs((popupEle.offsetWidth - buttonPosition.left)) + buttonEle.offsetWidth;
        popupEle.style.left = offsetX + 'px';
        popupEle.style.top = popupEle.getBoundingClientRect().top + 2 + 'px';
        this.setFoucsToFirstItem(popupEle, false, itemID, popup, gallerySettings);
    };
    RibbonGallery.prototype.hidePopup = function (popup, popupEle, args, gallerySettings, itemID) {
        var isCancelled = this.popupEvents(args, gallerySettings, 'popupClose', false);
        if (isCancelled) {
            return;
        }
        popup.hide();
        var buttonEle = document.querySelector('#' + itemID + '_popupButton');
        buttonEle.classList.remove('e-gallery-button-active');
    };
    /**
     * Shows a specific gallery popup in the ribbon.
     *
     * @param {string} id - Gets the ribbon item id.
     * @returns {void}
     */
    RibbonGallery.prototype.showGalleryPopup = function (id) {
        var itemProp = getItem(this.parent.tabs, id);
        var popupEle = document.querySelector('#' + id + '_galleryPopup');
        var popup = getComponent(popupEle, Popup);
        this.showPopup(popup, popupEle, null, itemProp.item.gallerySettings, id);
    };
    /**
     * Hides a specific gallery popup in the ribbon.
     *
     * @param {string} id - Gets the ribbon item id.
     * @returns {void}
     */
    RibbonGallery.prototype.hideGalleryPopup = function (id) {
        var itemProp = getItem(this.parent.tabs, id);
        var popupEle = document.querySelector('#' + id + '_galleryPopup');
        var popup = getComponent(popupEle, Popup);
        this.hidePopup(popup, popupEle, null, itemProp.item.gallerySettings, id);
    };
    RibbonGallery.prototype.setFoucsToFirstItem = function (popupEle, isDropdown, itemID, popup, gallerySettings) {
        var _this = this;
        popupEle.querySelectorAll('.e-ribbon-gallery-item')[0].focus();
        this.galleryItemsIndex = 0;
        popupEle.onkeydown = function (e) {
            _this.handleGalleryPopupNavigation(e, popupEle, isDropdown, itemID, popup, gallerySettings);
        };
    };
    RibbonGallery.prototype.handleGalleryPopupNavigation = function (e, popupEle, isDropdown, itemID, popup, gallerySettings) {
        var galleryPopupEle = popupEle.querySelectorAll('.e-ribbon-gallery-item');
        if (galleryPopupEle) {
            if (e.key === 'Home') {
                this.galleryItemsIndex = 0;
                galleryPopupEle[this.galleryItemsIndex].focus();
            }
            else if (e.key === 'End') {
                this.galleryItemsIndex = galleryPopupEle.length - 1;
                galleryPopupEle[this.galleryItemsIndex].focus();
            }
            else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.galleryItemsIndex++;
                if (this.galleryItemsIndex !== galleryPopupEle.length) {
                    if (galleryPopupEle && (galleryPopupEle[this.galleryItemsIndex])) {
                        galleryPopupEle[this.galleryItemsIndex].focus();
                    }
                }
                else {
                    this.galleryItemsIndex = 0;
                    galleryPopupEle[this.galleryItemsIndex].focus();
                }
            }
            else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (this.galleryItemsIndex !== 0) {
                    this.galleryItemsIndex--;
                    if (galleryPopupEle && (galleryPopupEle[this.galleryItemsIndex])) {
                        galleryPopupEle[this.galleryItemsIndex].focus();
                    }
                }
                else {
                    this.galleryItemsIndex = galleryPopupEle.length - 1;
                    galleryPopupEle[this.galleryItemsIndex].focus();
                }
            }
            else if ((e.key === 'Enter' || e.code === 'Space') || (e.key === 'Escape' && !isDropdown)) {
                this.hidePopup(popup, popupEle, e, gallerySettings, itemID);
            }
        }
    };
    RibbonGallery.prototype.createGalleryTemplate = function (galleryItemEle, gallerySettings, id, items) {
        galleryItemEle.classList.add('e-ribbon-gallery-template');
        var templateName = 'ribbon' + id + 'galleryTemplate';
        this.parent['clearTemplate']([templateName]);
        var templateFunction = getTemplateFunction(gallerySettings.template);
        if (items.disabled) {
            galleryItemEle.classList.add('e-disabled');
        }
        if (items.cssClass) {
            galleryItemEle.classList.add(items.cssClass);
        }
        append(templateFunction({ items: items }, this, templateName, (id + 'galleryTemplate'), this.parent.isStringTemplate, null, null, this.parent), galleryItemEle);
    };
    RibbonGallery.prototype.createGalleryPopupTemplate = function (galleryItemEle, gallerySettings, id, items) {
        galleryItemEle.classList.add('e-ribbon-gallery-popup-template');
        var templateName = 'ribbon' + id + 'galleryPopupTemplate';
        this.parent['clearTemplate']([templateName]);
        var templateFunction = getTemplateFunction(gallerySettings.popupTemplate);
        if (items.disabled) {
            galleryItemEle.classList.add('e-disabled');
        }
        if (items.cssClass) {
            galleryItemEle.classList.add(items.cssClass);
        }
        append(templateFunction({ items: items }, this, templateName, (id + 'galleryPopupTemplate'), this.parent.isStringTemplate, null, null, this.parent), galleryItemEle);
    };
    return RibbonGallery;
}());

var __extends$l = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$l = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * The Ribbon Component is a structured layout to manage tools with tabs and groups.
 */
var Ribbon = /** @class */ (function (_super) {
    __extends$l(Ribbon, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param  {RibbonModel} options - Specifies the ribbon model
     * @param  {string|HTMLDivElement} element - Specifies the target element
     */
    function Ribbon(options, element) {
        var _this = this;
        Ribbon_1.Inject(RibbonButton, RibbonCheckBox, RibbonDropDown, RibbonSplitButton, RibbonComboBox, RibbonGroupButton);
        _this = _super.call(this, options, element) || this;
        return _this;
    }
    Ribbon_1 = Ribbon;
    /**
     * Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    Ribbon.prototype.render = function () {
        this.initialize();
    };
    Ribbon.prototype.preRender = function () {
        this.keysPress = '';
        this.idIndex = 0;
        this.tooltipData = [];
        this.initialPropsData = {};
        this.hiddenElements = {};
        this.keyTipElements = {};
        this.hiddenGroups = [];
        this.itemsModel = [];
        this.targetTabs = {};
        this.isAddRemove = false;
        this.isUpdateItems = false;
        this.keyConfigs = {
            leftarrow: 'leftarrow',
            rightarrow: 'rightarrow',
            tab: 'tab',
            shiftTab: 'shift+tab'
        };
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Ribbon.prototype.getPersistData = function () {
        return this.addOnPersist(['activeLayout']);
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module name
     * @private
     */
    Ribbon.prototype.getModuleName = function () {
        return 'ribbon';
    };
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - returns module declaration.
     * @hidden
     */
    Ribbon.prototype.requiredModules = function () {
        var modules = [];
        modules.push({ member: 'ribbonButton', args: [this], name: 'RibbonButton' }, { member: 'ribbonDropDown', args: [this], name: 'RibbonDropDown' }, { member: 'ribbonSplitButton', args: [this], name: 'RibbonSplitButton' }, { member: 'ribbonCheckBox', args: [this], name: 'RibbonCheckBox' }, { member: 'ribbonComboBox', args: [this], name: 'RibbonComboBox' }, { member: 'ribbonGroupButton', args: [this], name: 'RibbonGroupButton' });
        var canInjectColorPickerModule = getItem(this.tabs, null, RibbonItemType.ColorPicker);
        var canInjectGalleryModule = getItem(this.tabs, null, RibbonItemType.Gallery);
        if (canInjectColorPickerModule) {
            modules.push({ member: 'ribbonColorPicker', args: [this], name: 'RibbonColorPicker' });
        }
        if (canInjectGalleryModule) {
            modules.push({ member: 'ribbonGallery', args: [this], name: 'RibbonGallery' });
        }
        if (this.backStageMenu.visible || this.backStageMenu.items.length) {
            modules.push({ member: 'ribbonBackstage', args: [this], name: 'RibbonBackstage' });
        }
        if (this.fileMenu.visible || this.fileMenu.menuItems.length) {
            modules.push({ member: 'ribbonFileMenu', args: [this], name: 'RibbonFileMenu' });
        }
        if (this.contextualTabs.length) {
            modules.push({ member: 'ribbonContextualTab', args: [this], name: 'RibbonContextualTab' });
        }
        if (this.enableKeyTips) {
            modules.push({ member: 'ribbonKeyTip', args: [this], name: 'RibbonKeyTip' });
        }
        return modules;
    };
    Ribbon.prototype.initialize = function () {
        this.element.id = this.element.id || getUniqueID('e-' + this.getModuleName());
        addClass([this.element], ['e-rbn'].concat((this.cssClass ? this.cssClass.split(SPACE) : [])));
        if (this.enableRtl) {
            this.element.classList.add(RTL_CSS);
        }
        this.element.style.width = formatUnit(this.width);
        this.renderTabs();
        if (this.ribbonContextualTabModule) {
            this.ribbonContextualTabModule.addContextualTabs();
        }
        if (this.ribbonFileMenuModule) {
            this.ribbonFileMenuModule.createFileMenu(this.fileMenu);
        }
        if (this.ribbonBackstageModule) {
            this.ribbonBackstageModule.createBackStage(this.backStageMenu);
        }
        this.createHelpPaneTemplate();
        var toolbar = this.tabObj['tbObj'];
        toolbar.refreshOverflow();
        this.addTabOverflowKeyTip();
        createTooltip(this.element, this);
        this.isKeytipOpen = false;
        this.wireEvents();
        this.wireKeyboardEvent();
        this.currentControlIndex = 0;
    };
    Ribbon.prototype.wireEvents = function () {
        EventHandler.add(window, 'resize', this.resizeHandler, this);
        EventHandler.add(document.body, 'keydown', this.keytipActionHandler, this);
        EventHandler.add(document, 'mousedown', this.mouseEventHandler, this);
        EventHandler.add(document, 'scroll', this.mouseEventHandler, this);
    };
    Ribbon.prototype.wireKeyboardEvent = function () {
        this.keyboardModuleRibbon = new KeyboardEvents(this.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    Ribbon.prototype.keyActionHandler = function (e) {
        if (((e.key === 'Tab') && (!(e.target.classList.contains('e-tab-wrap')) && !(e.target.classList.contains('e-combobox'))))) {
            e.preventDefault();
        }
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        var controlElements = Array.prototype.slice.call(activeContent.querySelectorAll('.e-control'));
        var templateElements = Array.prototype.slice.call(activeContent.querySelectorAll('.e-ribbon-template'));
        var galleryElements = Array.prototype.slice.call(activeContent.querySelectorAll('.e-ribbon-gallery-item'));
        var ribbonControls = controlElements.concat(templateElements, galleryElements);
        var comboBoxElements = activeContent.querySelectorAll('.e-combobox');
        var comboBoxEle;
        if (comboBoxElements) {
            for (var i = 0; i < comboBoxElements.length; i++) {
                if (comboBoxElements[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                    comboBoxEle = comboBoxElements[parseInt(i.toString(), 10)];
                }
            }
        }
        if (comboBoxEle) {
            for (var i = 0; i < ribbonControls.length; i++) {
                if (ribbonControls[parseInt(i.toString(), 10)].classList.contains('e-combobox')) {
                    if (ribbonControls[parseInt(i.toString(), 10)].closest('.e-input-focus')) {
                        this.currentControlIndex = i;
                    }
                }
            }
        }
        if (this.currentControlIndex === 0) {
            var item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
            while (item && item.classList.contains('e-disabled')) {
                this.currentControlIndex++;
                item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
            }
        }
        if (e.target.classList.contains('e-control') || e.target.classList.contains('e-ribbon-launcher-icon') ||
            e.target.classList.contains('e-ribbon-collapse-btn') || e.target.classList.contains('e-ribbon-last-item') ||
            e.target.classList.contains('e-ribbon-first-item') || e.target.classList.contains('e-ribbon-group-of-btn') ||
            e.target.classList.contains('e-ribbon-overall-of-btn') || e.target.classList.contains('e-ribbon-template') || e.target.classList.contains('e-ribbon-gallery-item')) {
            switch (e.action) {
                case 'rightarrow':
                    this.handleNavigation(e, !this.enableRtl, ribbonControls);
                    break;
                case 'leftarrow':
                    this.handleNavigation(e, this.enableRtl, ribbonControls);
                    break;
                case 'tab':
                    if (e.target.classList.contains('e-combobox')) {
                        if (this.currentControlIndex < ribbonControls.length - 1) {
                            this.currentControlIndex++;
                        }
                    }
                    break;
                case 'shiftTab':
                    if (e.target.classList.contains('e-combobox')) {
                        if (this.currentControlIndex > 0) {
                            this.currentControlIndex--;
                        }
                    }
                    else {
                        this.tabObj.element.querySelector('.e-toolbar-item.e-active').querySelector('.e-tab-wrap').focus();
                        this.currentControlIndex = 0;
                    }
            }
        }
    };
    Ribbon.prototype.handleNavigation = function (e, enableRtl, ribbonControls) {
        var groupContainer;
        var prevGroupId;
        if (enableRtl) {
            if (this.currentControlIndex < ribbonControls.length - 1 && ribbonControls[this.currentControlIndex + 1].classList.contains('e-colorpicker')) {
                this.currentControlIndex++;
            }
        }
        else {
            if (this.currentControlIndex > 0 && ribbonControls[this.currentControlIndex - 1].classList.contains('e-colorpicker')) {
                this.currentControlIndex--;
            }
        }
        if ((!enableRtl && (this.currentControlIndex > 0)) || (enableRtl && (this.currentControlIndex < ribbonControls.length - 1))) {
            if (!e.target.classList.contains('e-combobox') && (e.target.classList.contains('e-control') || e.target.classList.contains('e-ribbon-template') || e.target.classList.contains('e-ribbon-gallery-item')) && !e.target.classList.contains('e-ribbon-last-item')) {
                if (enableRtl) {
                    this.currentControlIndex++;
                }
                else {
                    var prevGroupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
                    if (prevGroupContainer) {
                        prevGroupId = prevGroupContainer.getAttribute('id');
                    }
                    this.currentControlIndex--;
                }
                var item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                while (item && item.classList.contains('e-disabled')) {
                    if (((enableRtl && this.currentControlIndex === ribbonControls.length - 1) ||
                        (!enableRtl && this.currentControlIndex === 0))) {
                        if (ribbonControls[this.currentControlIndex].closest('.e-ribbon-item').classList.contains('e-disabled')) {
                            this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
                            break;
                        }
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    enableRtl ? this.currentControlIndex++ : this.currentControlIndex--;
                    item = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                }
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
                if (this.activeLayout === 'Classic') {
                    groupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
                    if (enableRtl) {
                        var launcherIconEle = void 0;
                        if (groupContainer) {
                            launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
                        }
                        if (launcherIconEle) {
                            var items = groupContainer.querySelectorAll('.e-ribbon-item');
                            var elem = items[items.length - 1].querySelector('.e-control');
                            if (elem) {
                                elem.classList.add('e-ribbon-last-item');
                            }
                        }
                    }
                    else {
                        if (groupContainer) {
                            var groupContainerId = groupContainer.getAttribute('id');
                            if (prevGroupId !== groupContainerId) {
                                var launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
                                if (launcherIconEle) {
                                    ribbonControls[parseInt((this.currentControlIndex + 1).toString(), 10)].classList.add('e-ribbon-first-item');
                                }
                            }
                        }
                    }
                }
                else {
                    if (ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.contains('e-ribbon-first-item')) {
                        ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.remove('e-ribbon-first-item');
                    }
                    else if (ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.contains('e-ribbon-last-item')) {
                        ribbonControls[parseInt((this.currentControlIndex).toString(), 10)].classList.remove('e-ribbon-last-item');
                    }
                }
            }
        }
        else {
            if (this.activeLayout === 'Classic') {
                this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
            }
            if (this.activeLayout === 'Simplified') {
                var overflowButton = this.tabObj.element.querySelector('.e-ribbon-overall-of-btn');
                if (enableRtl && (overflowButton && !overflowButton.classList.contains('e-ribbon-hide'))) {
                    overflowButton.focus();
                }
                else {
                    this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
                }
            }
        }
        if (e.target.classList.contains('e-ribbon-last-item')) {
            if (enableRtl) {
                groupContainer = ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
                groupContainer.querySelector('.e-ribbon-launcher-icon').focus();
            }
            else {
                this.currentControlIndex--;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
        }
        if (!enableRtl && e.target.classList.contains('e-ribbon-first-item')) {
            groupContainer = ribbonControls[parseInt((this.currentControlIndex - 1).toString(), 10)].closest('.' + RIBBON_GROUP_CONTAINER);
            var launcherIconEle = groupContainer.querySelector('.e-ribbon-launcher-icon');
            if (launcherIconEle) {
                groupContainer.querySelector('.e-ribbon-launcher-icon').focus();
            }
        }
        if (e.target.classList.contains('e-ribbon-launcher-icon')) {
            if (enableRtl) {
                this.currentControlIndex++;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
                if (ribbonControls[parseInt((this.currentControlIndex - 1).toString(), 10)].classList.contains('e-ribbon-last-item')) {
                    ribbonControls[parseInt((this.currentControlIndex - 1).toString(), 10)].classList.remove('e-ribbon-last-item');
                }
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                this.currentControlIndex;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
        }
        if (e.target.classList.contains('e-ribbon-collapse-btn')) {
            if (enableRtl) {
                this.currentControlIndex = 0;
                var ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
                    this.currentControlIndex++;
                    ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                }
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
            else {
                var overflowButton = this.tabObj.element.querySelector('.e-ribbon-overall-of-btn');
                if ((overflowButton && !overflowButton.classList.contains('e-ribbon-hide'))) {
                    overflowButton.focus();
                }
                else {
                    this.currentControlIndex = ribbonControls.length - 1;
                    var ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                    while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
                        this.currentControlIndex--;
                        ribbonItem = ribbonControls[this.currentControlIndex].closest('.e-ribbon-item');
                    }
                    ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
                }
            }
        }
        if (this.activeLayout === 'Simplified' && e.target.classList.contains('e-ribbon-overall-of-btn')) {
            if (enableRtl) {
                this.tabObj.element.querySelector('.e-ribbon-collapse-btn').focus();
            }
            else {
                this.currentControlIndex = ribbonControls.length - 1;
                ribbonControls[parseInt(this.currentControlIndex.toString(), 10)].focus();
            }
        }
    };
    Ribbon.prototype.resizeHandler = function () {
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
        if (this.scrollModule) {
            var scrollEle = this.tabObj.element.querySelector('.' + HORIZONTAL_SCROLLBAR);
            this.scrollModule.scrollStep = scrollEle.offsetWidth;
        }
        if (this.activeLayout === 'Simplified') {
            var activePopup = document.querySelectorAll('.e-ribbon .e-dropdown-btn.e-active, .e-ribbon-group-overflow-ddb .e-dropdown-btn.e-active');
            if (activePopup.length) {
                for (var i = 0; i < activePopup.length; i++) {
                    var dropDownBtn = getInstance(activePopup[parseInt(i.toString(), 10)], DropDownButton);
                    dropDownBtn.toggle();
                }
            }
        }
        var galleryPopupEle = document.querySelector('.e-ribbon-gallery-popup.e-popup-open');
        if (galleryPopupEle) {
            var popup = getComponent(galleryPopupEle, Popup);
            popup.hide();
        }
        if (this.ribbonKeyTipModule && this.enableKeyTips) {
            this.ribbonKeyTipModule.removeKeytip();
        }
    };
    Ribbon.prototype.mouseEventHandler = function () {
        if (this.ribbonKeyTipModule && this.enableKeyTips) {
            this.ribbonKeyTipModule.removeKeytip();
        }
    };
    Ribbon.prototype.keytipActionHandler = function (e) {
        if (this.enableKeyTips) {
            var isKeyTipPresent = false;
            var keyPress = e.key;
            if (e.altKey && e.key === 'Meta') {
                var activePopup = document.querySelectorAll('.e-ribbon .e-dropdown-btn.e-active, .e-ribbon-group-overflow-ddb .e-dropdown-btn.e-active');
                if (activePopup.length) {
                    for (var i = 0; i < activePopup.length; i++) {
                        var dropDownBtn = getInstance(activePopup[parseInt(i.toString(), 10)], DropDownButton);
                        dropDownBtn.toggle();
                    }
                    this.ribbonKeyTipModule.removeKeytip();
                }
                else {
                    if (!this.isKeytipOpen) {
                        var backstagePopup = document.querySelector('.e-ribbon-backstage-popup');
                        if (backstagePopup && backstagePopup.classList.contains('e-popup-open')) {
                            this.ribbonBackstageModule.hideBackstage();
                        }
                        this.ribbonKeyTipModule.createKeytip('tab');
                    }
                    else {
                        this.ribbonKeyTipModule.removeKeytip();
                    }
                }
            }
            else if (e.key === 'Escape' || e.key === 'Tab' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                this.ribbonKeyTipModule.removeKeytip(e.key);
            }
            else {
                var keyTipItems = document.querySelectorAll('.e-ribbon-keytip');
                if (keyTipItems) {
                    for (var i = 0; i < keyTipItems.length; i++) {
                        var keyTipItem = keyTipItems[parseInt(i.toString(), 10)];
                        if (keyTipItem.innerHTML.toLowerCase() === keyPress) {
                            isKeyTipPresent = true;
                            this.ribbonKeyTipModule.keytipPress(keyPress);
                            break;
                        }
                    }
                    if (!isKeyTipPresent) {
                        this.checkKeyTipPresent(keyPress, this.keysPress.length);
                    }
                }
            }
        }
    };
    Ribbon.prototype.checkKeyTipPresent = function (keyTip, length) {
        var keyTipItems = document.querySelectorAll('.e-ribbon-keytip');
        for (var i = 0; i < keyTipItems.length; i++) {
            var keyTipItem = keyTipItems[parseInt(i.toString(), 10)];
            if (keyTipItem.innerHTML.length > 1 && keyTipItem.innerHTML[parseInt(length.toString(), 10)].toLowerCase() === keyTip) {
                this.keysPress += keyTip;
                this.ribbonKeyTipModule.keytipPress(this.keysPress);
                this.removeKeytip(this.keysPress);
                break;
            }
        }
    };
    Ribbon.prototype.removeKeytip = function (keyTip) {
        var keyTipItems = document.querySelectorAll('.e-ribbon-keytip');
        for (var i = 0; i < keyTipItems.length; i++) {
            var keyTipItem = keyTipItems[parseInt(i.toString(), 10)];
            if (keyTipItem.innerHTML[0].toLowerCase() !== keyTip && keyTip !== '') {
                remove(keyTipItem);
            }
        }
    };
    Ribbon.prototype.addKeyTip = function (tabIndex, keyTip, id, type) {
        if (this.keyTipElements && this.keyTipElements[parseInt(tabIndex.toString(), 10)]) {
            var isKeyTipExist = false;
            if (!(this.keyTipElements[parseInt(tabIndex.toString(), 10)]["" + type])) {
                this.keyTipElements[parseInt(tabIndex.toString(), 10)]["" + type] = [];
            }
            if (Object.keys(this.keyTipElements[parseInt(tabIndex.toString(), 10)]["" + type]).length) {
                var keytipData = this.keyTipElements[parseInt(tabIndex.toString(), 10)]["" + type];
                for (var i = 0; i < Object.keys(this.keyTipElements[parseInt(tabIndex.toString(), 10)]["" + type]).length; i++) {
                    if (keytipData[parseInt(i.toString(), 10)].id === id) {
                        isKeyTipExist = true;
                    }
                }
                if (!isKeyTipExist) {
                    this.keyTipElements[parseInt(tabIndex.toString(), 10)]["" + type].
                        push({ id: id, type: type, keyTip: keyTip });
                }
            }
            else {
                this.keyTipElements[parseInt(tabIndex.toString(), 10)]["" + type].push({ id: id, type: type, keyTip: keyTip });
            }
        }
    };
    Ribbon.prototype.renderTabs = function () {
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal = this.checkID(this.tabsInternal, 'tab', this.element.id);
        this.setProperties({ tabs: this.tabsInternal }, true);
        var tabEle = this.createElement('div', {
            id: this.element.id + TAB_ID
        });
        this.element.appendChild(tabEle);
        this.validateItemSize();
        var tabItems = this.createTabItems(this.tabs);
        this.tabObj = new Tab({
            cssClass: RIBBON_TAB,
            selectedItem: this.selectedTab,
            overflowMode: 'Popup',
            width: this.width,
            items: tabItems,
            enableRtl: this.enableRtl,
            created: this.tabCreated.bind(this),
            selected: this.ribbonTabSelected.bind(this),
            selecting: this.ribbonTabSelecting.bind(this),
            animation: this.tabAnimation
        });
        this.tabObj.appendTo(tabEle);
        //Set the width value as "0px" with unit for proper calculation.
        this.element.style.setProperty(RIBBON_FILE_MENU_WIDTH, '0px');
        this.element.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, '0px');
        var toolbarEle = tabEle.querySelector('.e-toolbar');
        var toolbar = getComponent(toolbarEle, Toolbar);
        toolbar.setProperties({ width: 'calc(100% - var(--fileMenuWidth) - var(--helpTemplateWidth))' });
        this.element.classList[this.isMinimized ? 'add' : 'remove'](RIBBON_MINIMIZE);
    };
    Ribbon.prototype.minimize = function (val) {
        var _this = this;
        if (val === this.isMinimized) {
            return;
        }
        var eventArgs = { cancel: false };
        this.trigger(val ? 'ribbonCollapsing' : 'ribbonExpanding', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            _this.setProperties({ isMinimized: val }, true);
            _this.element.classList.toggle(RIBBON_MINIMIZE, _this.isMinimized);
            //to overwrite inline styles from hscroll
            _this.tabObj.element.querySelector('.e-content').style.display = val ? 'none' : 'block';
            if (!val) {
                _this.refreshLayout();
            }
        });
    };
    Ribbon.prototype.toggleLayout = function (args) {
        this.setProperties({ activeLayout: this.activeLayout === 'Simplified' ? 'Classic' : 'Simplified' }, true);
        this.switchLayout();
        var eventArgs = { activeLayout: this.activeLayout, event: args };
        this.trigger('ribbonLayoutSwitched', eventArgs);
    };
    Ribbon.prototype.tabCreated = function () {
        if (!this.hideLayoutSwitcher) {
            this.addExpandCollapse();
        }
        this.renderInitialTab(this.selectedTab);
    };
    Ribbon.prototype.ribbonTabSelected = function (e) {
        e.preventFocus = true;
        this.isAddRemove = false;
        var selectedTabId = e.selectedItem.getAttribute('data-id');
        var selectedIndex = getIndex(this.tabs, (function (tab) { return (tab.id === selectedTabId); }));
        selectedIndex = selectedIndex === -1 ? this.selectedTab : selectedIndex;
        var selectedContent = this.tabObj.items[parseInt(selectedIndex.toString(), 10)].content;
        if ((!selectedContent.querySelector('.' + RIBBON_GROUP)) && (this.tabs[parseInt(selectedIndex.toString(), 10)].groups.length !== 0)) {
            var elements = this.createGroups(this.tabs[parseInt(selectedIndex.toString(), 10)].groups, selectedIndex);
            append(elements, selectedContent);
        }
        var isContextual = this.isContextualTab(selectedTabId);
        this.updateSelectedState(selectedTabId);
        var eventArgs = { previousIndex: this.selectedTab, selectedIndex: selectedIndex, isContextual: isContextual };
        this.setProperties({ selectedTab: selectedIndex }, true);
        this.calculateHiddenElementsWidth(selectedIndex);
        if (this.isUpdateItems) {
            for (var i = 0; i < this.itemsModel.length; i++) {
                var item = this.itemsModel[parseInt(i.toString(), 10)];
                if (this.selectedTab === this.targetTabs[item.id]) {
                    this.updateItem(item);
                    this.itemsModel.splice(i, 1);
                    i--;
                }
            }
            if (this.itemsModel.length === 0) {
                this.isUpdateItems = false;
            }
        }
        if (this.ribbonGalleryModule) {
            this.ribbonGalleryModule.checkAvailableHeight(e.selectedContent.firstChild);
        }
        this.checkOverflow(selectedIndex, selectedContent);
        if (this.activeLayout === 'Simplified' && this.overflowDDB) {
            var overflowTarget = this.overflowDDB.target;
            var ofTabContainer = overflowTarget.querySelector('.' + RIBBON_TAB_ACTIVE);
            if (ofTabContainer) {
                ofTabContainer.classList.remove(RIBBON_TAB_ACTIVE);
            }
            var activeTab = overflowTarget.querySelector('#' + selectedTabId + OVERFLOW_ID);
            if (activeTab) {
                activeTab.classList.add(RIBBON_TAB_ACTIVE);
                this.overflowDDB.element.classList.remove(HIDE_CSS);
                this.checkOverflowHiddenItems(false, selectedIndex);
            }
            else {
                this.overflowDDB.element.classList.add(HIDE_CSS);
            }
        }
        this.trigger('tabSelected', eventArgs);
    };
    Ribbon.prototype.updateSelectedState = function (tabID) {
        if (this.contextualTabs.length) {
            for (var i = 0; i < this.contextualTabs.length; i++) {
                var isSelected = false;
                for (var j = 0; j < this.contextualTabs[parseInt(i.toString(), 10)].tabs.length; j++) {
                    if (this.contextualTabs[parseInt(i.toString(), 10)].tabs[parseInt(j.toString(), 10)].id === tabID) {
                        isSelected = true;
                        break;
                    }
                }
                this.contextualTabs[parseInt(i.toString(), 10)].
                    setProperties({ isSelected: isSelected }, true);
            }
        }
    };
    Ribbon.prototype.checkOverflow = function (tabIndex, activeContent) {
        var tabContent = activeContent.closest('.' + TAB_CONTENT);
        var isOverFlow = tabContent.offsetWidth < activeContent.offsetWidth;
        if (isOverFlow && !this.scrollModule) {
            if (this.activeLayout === 'Classic') {
                // Defines whether the shrinking is breaked due to insufficient space.
                var isBreak = false;
                isBreak = this.checkGroupShrinking(tabIndex, tabContent, activeContent, true);
                if (!isBreak && (tabContent.offsetWidth < activeContent.offsetWidth)) {
                    isBreak = this.checkGroupShrinking(tabIndex, tabContent, activeContent, false);
                }
                if (tabContent.offsetWidth < activeContent.offsetWidth) {
                    this.createOverflowDropdown(tabIndex, tabContent, activeContent);
                }
            }
            else {
                this.checkSimplifiedItemShrinking(tabIndex, tabContent, activeContent);
                if (tabContent.offsetWidth < activeContent.offsetWidth) {
                    this.createSimplfiedOverflow(tabContent, activeContent, tabIndex);
                }
            }
            //Adds Scroll if the tabwidth is less the content width even after adding overflow dropdown.
            if ((tabContent.offsetWidth < activeContent.offsetWidth) && (!this.scrollModule)) {
                this.scrollModule = new HScroll({
                    enableRtl: this.enableRtl
                }, this.tabObj.element.querySelector('.' + TAB_CONTENT));
            }
        }
        else if (!isOverFlow) {
            this.destroyScroll();
            if (this.activeLayout === 'Classic') {
                var isBreak = false;
                isBreak = this.removeOverflowDropdown(tabContent, activeContent, false, tabIndex);
                //Check for expanding small items to medium items.
                if (!isBreak && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                    isBreak = this.checkGroupExpanding(tabIndex, tabContent, activeContent, true);
                }
                //Check for expanding medium items to large items.
                if (!isBreak && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                    isBreak = this.checkGroupExpanding(tabIndex, tabContent, activeContent, false);
                }
            }
            else {
                this.removeSimplfiedOverflow(tabContent, activeContent, tabIndex);
                if (tabContent.offsetWidth > activeContent.offsetWidth) {
                    this.checkSimplifiedItemExpanding(tabIndex, tabContent, activeContent);
                }
            }
        }
        this.addTabOverflowKeyTip();
    };
    Ribbon.prototype.addTabOverflowKeyTip = function () {
        var tabOverflow = this.tabObj.element.querySelector('#_nav');
        if (tabOverflow) {
            this.keyTipElements['taboverflow'] = [];
            this.keyTipElements['taboverflow'].push({ id: tabOverflow.id, type: 'taboverflow', keyTip: '00' });
        }
        else {
            delete (this.keyTipElements['taboverflow']);
        }
    };
    Ribbon.prototype.checkSimplifiedItemShrinking = function (tabIndex, tabContent, activeContent) {
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var i = (tab.groups.length - 1); (i >= 0); i--) {
            var group = tab.groups[parseInt(i.toString(), 10)];
            var groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
            for (var j = 0; ((j < group.collections.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Medium) && (item.displayOptions & DisplayMode.Simplified)) {
                        var itemContainer = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                        if (itemContainer) {
                            var itemEle = itemContainer.querySelector('#' + item.id);
                            itemContainer.setAttribute('data-medium-width', activeContent.offsetWidth.toString());
                            item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                            this.setItemSize(itemEle, item);
                        }
                    }
                }
            }
        }
    };
    Ribbon.prototype.checkSimplifiedItemExpanding = function (tabIndex, tabContent, activeContent) {
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var i = (tab.groups.length - 1); (i >= 0); i--) {
            var group = tab.groups[parseInt(i.toString(), 10)];
            var groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
            for (var j = 0; ((j < group.collections.length) && (tabContent.offsetWidth > activeContent.offsetWidth)); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth > activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    if (((item.allowedSizes & RibbonItemSize.Small) && (item.allowedSizes & RibbonItemSize.Medium))
                        && (item.activeSize === RibbonItemSize.Small) && (item.displayOptions & DisplayMode.Simplified)) {
                        var itemContainer = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                        if (itemContainer) {
                            var valString = itemContainer.getAttribute('data-medium-width');
                            var value = valString ? parseInt(valString, 10) : null;
                            if (value && (tabContent.offsetWidth > value)) {
                                itemContainer.removeAttribute('data-medium-width');
                                var itemEle = itemContainer.querySelector('#' + item.id);
                                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                                this.setItemSize(itemEle, item);
                            }
                        }
                    }
                }
            }
        }
    };
    Ribbon.prototype.createSimplfiedOverflow = function (tabContent, activeContent, tabIndex) {
        var orderedGroups = this.getGroupResizeOrder(true, tabIndex);
        var isEmptyCollection;
        for (var i = 0; ((i < orderedGroups.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); i++) {
            var isGroupUpdated = false;
            var group = orderedGroups[parseInt(i.toString(), 10)];
            var groupEle = tabContent.querySelector('#' + group.id);
            var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
            for (var j = group.collections.length; ((j >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); j--) {
                var collection = group.collections[parseInt((j - 1).toString(), 10)];
                var collectionEle = groupEle.querySelector('#' + collection.id);
                for (var k = collection.items.length; ((k >= 1) && (tabContent.offsetWidth < activeContent.offsetWidth)); k--) {
                    var item = collection.items[k - 1];
                    var itemContainer = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
                    if (((item.displayOptions === DisplayMode.Auto) ||
                        (item.displayOptions === (DisplayMode.Simplified | DisplayMode.Overflow))) && !isNullOrUndefined(itemContainer)) {
                        var groupHidden = false;
                        var itemHidden = false;
                        var isAllItemHidden = false;
                        var isEmptyCollection_1 = false;
                        var groupItems = void 0;
                        if (groupEle.classList.contains('e-hidden') || groupEle.classList.contains('e-hide-group')) {
                            groupItems = groupEle.querySelectorAll('.e-ribbon-item.e-hidden');
                            if (groupItems.length) {
                                for (var i_1 = 0; i_1 < groupItems.length; i_1++) {
                                    groupItems[parseInt(i_1.toString(), 10)].classList.remove('e-hidden');
                                }
                            }
                            if (groupEle.classList.contains('e-hide-group')) {
                                isAllItemHidden = true;
                                groupEle.classList.remove('e-hide-group');
                                groupEle.classList.remove('e-ribbon-emptyCollection');
                                if (this.hiddenGroups.indexOf(groupEle.id) !== -1) {
                                    this.hiddenGroups.splice(this.hiddenGroups.indexOf(groupEle.id), 1);
                                }
                            }
                            else {
                                groupHidden = true;
                                groupEle.classList.remove('e-hidden');
                            }
                            if (!isGroupUpdated) {
                                this.calculateOverflowItemsWidth(groupEle.offsetWidth, false, tabIndex);
                                this.calculateMediumDataWidth(groupEle.offsetWidth, tabIndex, false);
                                isGroupUpdated = true;
                            }
                        }
                        else {
                            if (itemContainer.classList.contains('e-hidden')) {
                                itemHidden = true;
                                itemContainer.classList.remove('e-hidden');
                                if (groupEle.classList.contains('e-ribbon-emptyCollection')) {
                                    isEmptyCollection_1 = true;
                                    groupEle.classList.remove('e-ribbon-emptyCollection');
                                }
                                this.calculateOverflowItemsWidth(itemContainer.offsetWidth, false, tabIndex);
                                this.calculateMediumDataWidth(itemContainer.offsetWidth, tabIndex, false);
                            }
                        }
                        itemContainer.setAttribute('data-simplified-width', (activeContent.offsetWidth).toString());
                        if (itemHidden) {
                            itemContainer.classList.add('e-hidden');
                        }
                        if (groupItems && groupItems.length) {
                            for (var i_2 = 0; i_2 < groupItems.length; i_2++) {
                                groupItems[parseInt(i_2.toString(), 10)].classList.add('e-hidden');
                            }
                        }
                        if (groupHidden) {
                            groupEle.classList.add('e-hidden');
                        }
                        if (isAllItemHidden) {
                            groupEle.classList.add('e-hide-group');
                            groupEle.classList.add('e-ribbon-emptyCollection');
                        }
                        if (isEmptyCollection_1) {
                            groupEle.classList.add('e-ribbon-emptyCollection');
                        }
                        this.createOverflowPopup(item, tabIndex, group.enableGroupOverflow, group.id, group.header, itemContainer, groupContainer, true);
                        if (item.activeSize === RibbonItemSize.Small) {
                            var itemEle = itemContainer.querySelector('#' + item.id);
                            item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                            this.setItemSize(itemEle, item);
                        }
                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton) ||
                            (item.type === RibbonItemType.GroupButton) || (item.type === RibbonItemType.Gallery)) {
                            this.updatePopupItems(item, itemContainer, group.enableGroupOverflow, true);
                        }
                    }
                }
            }
            if (!(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
                groupEle.classList.add('e-ribbon-emptyCollection');
            }
            var itemsLength = groupEle.querySelectorAll('.' + RIBBON_ITEM);
            if (itemsLength && !group.enableGroupOverflow) {
                isEmptyCollection = this.checkEmptyCollection(itemsLength);
                if (isEmptyCollection) {
                    groupEle.classList.add('e-ribbon-emptyCollection');
                }
            }
            this.checkOverflowHiddenItems(group.enableGroupOverflow, tabIndex, group.id);
        }
    };
    Ribbon.prototype.checkEmptyCollection = function (itemsLength) {
        var isEmptyCollection = true;
        for (var i = 0; i < itemsLength.length; i++) {
            if (!(itemsLength[parseInt(i.toString(), 10)].classList.contains('e-hidden'))) {
                isEmptyCollection = false;
                break;
            }
        }
        return isEmptyCollection;
    };
    Ribbon.prototype.updatePopupItems = function (item, itemEle, isGroupOF, isMenu) {
        var _this = this;
        var dropdown = getComponent(itemEle.querySelector('#' + item.id), (item.type === RibbonItemType.DropDown || item.type === RibbonItemType.Gallery || item.type === RibbonItemType.GroupButton) ? DropDownButton : SplitButton);
        var dropDownPopup = dropdown.dropDown;
        // popup is on right if (isGroupOF && isMenu)
        // The position is reversed if RTL is enabled.
        // isRight = ((isGroupOF && isMenu) && !this.enableRtl ) || (!(isGroupOF && isMenu) && this.enableRtl)  ==> (isGroupOF && isMenu) !== this.enableRtl
        var isLeft = (isGroupOF && isMenu) === this.enableRtl;
        if (dropDownPopup) {
            dropDownPopup.setProperties({ position: { X: isLeft ? 'left' : 'right', Y: isMenu ? 'top' : 'bottom' } }, true);
            if (isMenu) {
                dropdown.beforeOpen = function () {
                    if (isLeft) {
                        if (item.type === RibbonItemType.Gallery && _this.ribbonGalleryModule) {
                            _this.ribbonGalleryModule.checkCollision(dropDownPopup, dropDownPopup.element);
                        }
                        dropDownPopup.element.style.setProperty('visibility', 'hidden');
                        dropDownPopup.element.style.setProperty('display', 'block');
                        dropDownPopup.setProperties({ offsetX: -1 * dropDownPopup.element.offsetWidth });
                        dropDownPopup.element.style.removeProperty('display');
                        dropDownPopup.element.style.removeProperty('visibility');
                    }
                };
            }
            else {
                dropDownPopup.setProperties({ offsetX: 0 }, true);
                dropdown.beforeOpen = null;
            }
        }
    };
    Ribbon.prototype.removeSimplfiedOverflow = function (tabContent, activeContent, tabIndex, isClear) {
        if (isClear === void 0) { isClear = false; }
        var orderedGroups = this.getGroupResizeOrder(false, tabIndex);
        var flag = true;
        var isEmptyCollection;
        for (var i = 0; ((i < orderedGroups.length) && flag); i++) {
            var group = orderedGroups[parseInt(i.toString(), 10)];
            var overflowDDB = void 0;
            var overflowtarget = void 0;
            if (group.enableGroupOverflow) {
                var overflowDDBEle = tabContent.querySelector('#' + group.id + GROUPOF_BUTTON_ID);
                if (overflowDDBEle) {
                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                    overflowtarget = overflowDDB.target;
                }
            }
            else {
                overflowDDB = this.overflowDDB;
                overflowtarget = this.overflowDDB ? this.overflowDDB.target : null;
            }
            for (var j = 0; ((j < group.collections.length) && flag); j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                // eslint-disable-next-line max-len
                for (var k = 0; ((k < collection.items.length) && flag && !isClear && (tabContent.offsetWidth > activeContent.offsetWidth)); k++) {
                    var item = collection.items[parseInt(k.toString(), 10)];
                    var itemContainer = void 0;
                    if (overflowtarget) {
                        itemContainer = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
                    }
                    if (((item.displayOptions === DisplayMode.Auto) ||
                        (item.displayOptions === (DisplayMode.Simplified | DisplayMode.Overflow))) && !isNullOrUndefined(itemContainer)) {
                        var width = parseInt(itemContainer.getAttribute('data-simplified-width'), 10);
                        var groupItemEle = tabContent.querySelector('#' + group.id);
                        if (itemContainer.classList.contains('e-hidden') || groupItemEle.classList.contains('e-hidden')) {
                            width = Math.abs(width - activeContent.offsetWidth);
                        }
                        if (!isClear && (tabContent.offsetWidth < width)) {
                            flag = false;
                            break;
                        }
                        var groupEle = tabContent.querySelector('#' + collection.id);
                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton) ||
                            (item.type === RibbonItemType.GroupButton) || (item.type === RibbonItemType.Gallery)) {
                            this.updatePopupItems(item, itemContainer, group.enableGroupOverflow, false);
                        }
                        groupEle.append(itemContainer);
                        if (itemContainer.classList.contains('e-hidden') || groupItemEle.classList.contains('e-hidden')) {
                            itemContainer.setAttribute('data-simplified-width', width.toString());
                            var isGroupHidden = false;
                            var widthDifference = 0;
                            if (itemContainer.classList.contains('e-hidden')) {
                                itemContainer.classList.remove('e-hidden');
                                if (groupItemEle.classList.contains('e-hide-group')) {
                                    isGroupHidden = true;
                                    widthDifference = this.checkWidthDifference(itemContainer, groupItemEle);
                                }
                                width = itemContainer.offsetWidth + widthDifference;
                                itemContainer.classList.add('e-hidden');
                            }
                            this.calculateOverflowItemsWidth(width, true, tabIndex);
                            this.calculateMediumDataWidth(width, tabIndex, true);
                            if (isGroupHidden) {
                                groupItemEle.classList.add('e-hide-group');
                                groupItemEle.classList.add('e-ribbon-emptyCollection');
                            }
                        }
                        this.removeOverflowEvent(item, itemContainer);
                        if (item.allowedSizes & RibbonItemSize.Small) {
                            item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                            this.setItemSize(itemContainer.querySelector('#' + item.id), item);
                        }
                        var groupElement = tabContent.querySelector('#' + group.id);
                        var itemEle = groupElement.querySelector('.' + RIBBON_ITEM);
                        if (groupElement.classList.contains('e-ribbon-emptyCollection') && itemEle !== null) {
                            var itemsLength = groupElement.querySelectorAll('.' + RIBBON_ITEM);
                            if (itemsLength) {
                                isEmptyCollection = this.checkEmptyCollection(itemsLength);
                                if (!isEmptyCollection) {
                                    groupElement.classList.remove('e-ribbon-emptyCollection');
                                }
                            }
                        }
                    }
                }
            }
            if (overflowDDB) {
                if (group.enableGroupOverflow) {
                    if (overflowtarget.childElementCount === 0 ||
                        (overflowtarget.childElementCount === 1 && this.isHeaderVisible(overflowtarget, group.id))) {
                        this.removeOverflowButton(overflowDDB);
                    }
                }
                else {
                    var ofGroupContainer = overflowtarget.querySelector('#' + group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = overflowtarget.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                        this.overflowDDB.element.classList.add(HIDE_CSS);
                    }
                }
            }
        }
        for (var i = 0; i < orderedGroups.length; i++) {
            this.checkOverflowHiddenItems(orderedGroups[parseInt(i.toString(), 10)].enableGroupOverflow, tabIndex, orderedGroups[parseInt(i.toString(), 10)].id);
        }
        if (this.overflowDDB) {
            var overflowEle = this.overflowDDB.target;
            if (overflowEle.childElementCount === 0) {
                this.removeOverflowButton(this.overflowDDB);
                this.overflowDDB = null;
            }
        }
    };
    Ribbon.prototype.checkOverflowHiddenItems = function (isGroupOF, tabIndex, groupId) {
        if (isGroupOF) {
            var overflowDDB = document.querySelector('#' + groupId + GROUPOF_BUTTON_ID);
            if (overflowDDB) {
                var overflowButton = getInstance(overflowDDB, DropDownButton);
                var overflowBtnTarget = overflowButton.target;
                var itemEle = overflowBtnTarget.querySelectorAll('.e-ribbon-item');
                var isHidden = true;
                for (var i = 0; i < itemEle.length; i++) {
                    if (!(itemEle[parseInt(i.toString(), 10)].classList.contains('e-hidden'))) {
                        isHidden = false;
                        break;
                    }
                }
                overflowButton.element.classList[isHidden ? 'add' : 'remove']('e-hidden');
            }
        }
        else {
            if (this.overflowDDB) {
                var isGroupHidden = true;
                var isItemHidden = void 0;
                var overflowEle = this.overflowDDB.target;
                var ofTabContainer = overflowEle.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                if (ofTabContainer) {
                    for (var k = 0; k < ofTabContainer.children.length; k++) {
                        isItemHidden = true;
                        var overflowTab = ofTabContainer.children[parseInt(k.toString(), 10)];
                        var groupTabContainer = overflowTab.querySelectorAll('.e-ribbon-item');
                        for (var n = 0; n < groupTabContainer.length; n++) {
                            if (!(groupTabContainer[parseInt(n.toString(), 10)].classList.contains('e-hidden'))) {
                                isItemHidden = false;
                                break;
                            }
                        }
                        overflowTab.classList[isItemHidden ? 'add' : 'remove']('e-hide-group');
                        if (!(overflowTab.classList.contains('e-hide-group')) && !(overflowTab.classList.contains('e-hidden'))) {
                            isGroupHidden = false;
                        }
                    }
                    this.overflowDDB.element.classList[isGroupHidden ? 'add' : 'remove'](HIDE_CSS);
                }
            }
        }
    };
    Ribbon.prototype.createOverflowPopup = function (item, tabIndex, isGroupOF, groupId, groupHeader, itemEle, groupContainer, isResize) {
        var overflowButton;
        var overflowtarget;
        var itemProp = getGroup(this.tabs, groupId);
        var contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
        var groupEle = contentEle.querySelector('#' + groupId);
        if (isGroupOF) {
            var overflowDDB = groupContainer.querySelector('#' + groupId + GROUPOF_BUTTON_ID);
            if (!overflowDDB) {
                overflowButton = this.addOverflowButton(groupId + GROUPOF_BUTTON_ID, isGroupOF);
                overflowButton.element.classList.add(RIBBON_GROUP_OF_BUTTON);
                groupContainer.appendChild(overflowButton.element);
            }
            else {
                overflowButton = getInstance(overflowDDB, DropDownButton);
            }
            this.addKeyTip(tabIndex, '0' + (itemProp.groupIndex + 1), overflowButton.element.id, 'grpofbtn');
            overflowtarget = overflowButton.target;
            var overflowBtnTarget = overflowButton.target;
            var headerEle = overflowBtnTarget.querySelector('#' + groupId + GROUPOF_BUTTON_ID + HEADER_ID);
            if (!headerEle) {
                if (itemProp.group.overflowHeader) {
                    var groupHeader_1 = this.createElement('div', {
                        className: RIBBON_OVERFLOW_HEADER,
                        id: groupId + GROUPOF_BUTTON_ID + HEADER_ID,
                        innerHTML: itemProp.group.overflowHeader
                    });
                    overflowBtnTarget.append(groupHeader_1);
                }
            }
            if (groupEle) {
                if (groupEle.classList.contains('e-disabled')) {
                    overflowBtnTarget.classList.add('e-disabled');
                }
                if (groupEle.classList.contains('e-hidden')) {
                    overflowBtnTarget.classList.add('e-hidden');
                }
                if (groupEle.classList.contains('e-hide-group')) {
                    overflowBtnTarget.classList.add('e-hide-group');
                }
            }
            if (isResize) {
                overflowBtnTarget.insertBefore(itemEle, overflowBtnTarget.querySelector('.' + RIBBON_ITEM));
            }
            else {
                overflowBtnTarget.append(itemEle);
            }
        }
        else {
            if (!this.overflowDDB) {
                this.overflowDDB = this.addOverflowButton(this.tabObj.element.id + OVRLOF_BUTTON_ID, isGroupOF);
                this.tabObj.element.insertBefore(this.overflowDDB.element, this.collapseButton);
                this.overflowDDB.element.classList.add(RIBBON_OVERALL_OF_BUTTON);
                this.createOfTabContainer(groupId, groupHeader, itemEle, tabIndex);
            }
            else {
                this.overflowDDB.element.classList.remove(HIDE_CSS);
                var overflowEle = this.overflowDDB.target;
                var ofTabContainer = overflowEle.querySelector('#' +
                    this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                if (ofTabContainer) {
                    var ofGroupContainer = overflowEle.querySelector('#' + groupId + CONTAINER_ID);
                    if (!ofGroupContainer) {
                        ofGroupContainer = itemProp.group.overflowHeader ? this.createGroupContainer(groupId, itemProp.group.overflowHeader) : this.createGroupContainer(groupId, groupHeader);
                        if (groupEle) {
                            if (groupEle.classList.contains('e-disabled')) {
                                ofGroupContainer.classList.add('e-disabled');
                            }
                            if (groupEle.classList.contains('e-hidden')) {
                                ofGroupContainer.classList.add('e-hidden');
                            }
                            if (groupEle.classList.contains('e-hide-group')) {
                                ofGroupContainer.classList.add('e-hide-group');
                            }
                        }
                        ofTabContainer.append(ofGroupContainer);
                    }
                    if (isResize) {
                        ofGroupContainer.insertBefore(itemEle, ofGroupContainer.querySelector('.' + RIBBON_ITEM));
                    }
                    else {
                        ofGroupContainer.append(itemEle);
                    }
                }
                else {
                    this.createOfTabContainer(groupId, groupHeader, itemEle, tabIndex);
                }
            }
            overflowButton = this.overflowDDB;
            overflowtarget = this.overflowDDB ? this.overflowDDB.target : null;
        }
        if (itemEle !== null) {
            this.addOverflowEvents(item, itemEle, overflowButton);
        }
        if (overflowtarget) {
            if (item.keyTip) {
                this.addKeyTip(tabIndex, item.keyTip, item.id, 'popupitem');
            }
        }
    };
    Ribbon.prototype.addOverflowEvents = function (item, itemEle, overflowButton) {
        switch (item.type) {
            case 'Button':
                this.ribbonButtonModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'DropDown':
                this.ribbonDropDownModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'SplitButton':
                this.ribbonSplitButtonModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'CheckBox':
                this.ribbonCheckBoxModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'ColorPicker':
                this.ribbonColorPickerModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'ComboBox':
                this.ribbonComboBoxModule.addOverFlowEvents(item, itemEle, overflowButton);
                break;
            case 'Gallery':
                if (this.activeLayout === 'Simplified') {
                    this.ribbonGalleryModule.addOverFlowEvents(item, itemEle);
                }
                break;
            case 'GroupButton':
                if (this.activeLayout === 'Simplified') {
                    this.ribbonGroupButtonModule.addOverFlowEvents(item, itemEle, overflowButton);
                    break;
                }
        }
    };
    Ribbon.prototype.createOfTabContainer = function (groupId, groupHeader, itemEle, tabIndex) {
        var ofTabContainer = this.createElement('div', {
            id: this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID,
            className: RIBBON_OF_TAB_CONTAINER
        });
        var overflowtarget = this.overflowDDB.target;
        overflowtarget.append(ofTabContainer);
        var itemProp = getGroup(this.tabs, groupId);
        var ofGroupContainer = itemProp.group.overflowHeader ?
            this.createGroupContainer(groupId, itemProp.group.overflowHeader) : this.createGroupContainer(groupId, groupHeader);
        ofGroupContainer.append(itemEle);
        ofTabContainer.append(ofGroupContainer);
        if (tabIndex === this.selectedTab) {
            ofTabContainer.classList.add(RIBBON_TAB_ACTIVE);
        }
        var groupEle = document.querySelector('#' + groupId);
        if (groupEle) {
            if (groupEle.classList.contains('e-disabled')) {
                ofGroupContainer.classList.add('e-disabled');
            }
            if (groupEle.classList.contains('e-hidden')) {
                ofGroupContainer.classList.add('e-hidden');
            }
            if (groupEle.classList.contains('e-hide-group')) {
                ofGroupContainer.classList.add('e-hide-group');
            }
        }
    };
    Ribbon.prototype.checkGroupShrinking = function (tabIndex, tabContent, activeContent, isLarge) {
        var isOverFlow = true;
        var isBreak = false;
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var j = (tab.groups.length - 1); (isOverFlow && (j >= 0)); j--) {
            // eslint-disable-next-line max-len
            isBreak = isLarge ? this.checkLargeToMedium(tabIndex, tab, j, tabContent, activeContent) : this.checkMediumToSmall(tabIndex, tab, j, tabContent, activeContent);
            isOverFlow = !isBreak && (tabContent.offsetWidth < activeContent.offsetWidth);
        }
        return isBreak;
    };
    Ribbon.prototype.checkValidCollectionLength = function (collections) {
        var count = 0;
        for (var i = 0; i < collections.length; i++) {
            var items = collections[parseInt(i.toString(), 10)].items;
            for (var ind = 0; ind < items.length; ind++) {
                if (items[parseInt(ind.toString(), 10)].displayOptions & DisplayMode.Classic) {
                    count++;
                    break;
                }
            }
            if (count > 1) {
                return false;
            }
        }
        return count === 1;
    };
    Ribbon.prototype.checkClassicCollection = function (collections, n, isIncrement) {
        var items = collections[parseInt(n.toString(), 10)].items;
        for (var ind = 0; ind < items.length; ind++) {
            if (items[parseInt(ind.toString(), 10)].displayOptions & DisplayMode.Classic) {
                return n;
            }
        }
        n = isIncrement ? n + 1 : n - 1;
        if (isIncrement) {
            return (n === collections.length) ? n : this.checkClassicCollection(collections, n, isIncrement);
        }
        else {
            return (n < 0) ? n : this.checkClassicCollection(collections, n, isIncrement);
        }
    };
    Ribbon.prototype.checkClassicItem = function (items, n, isIncrement) {
        var item = items[parseInt(n.toString(), 10)];
        if (item.displayOptions & DisplayMode.Classic) {
            return n;
        }
        n = isIncrement ? n + 1 : n - 1;
        if (isIncrement) {
            return (n === items.length) ? n : this.checkClassicItem(items, n, isIncrement);
        }
        else {
            return (n < 0) ? n : this.checkClassicItem(items, n, isIncrement);
        }
    };
    Ribbon.prototype.checkLargeToMedium = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip) {
        var _this = this;
        if (shouldSkip === void 0) { shouldSkip = false; }
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        if (group.isCollapsed && !shouldSkip) {
            return false;
        }
        var canReduceCollection = function (collection) {
            return (collection.items.length === 1) && canReduceItem(collection.items[0]);
        };
        var canReduceItem = function (item) {
            return (item.allowedSizes & RibbonItemSize.Medium) && (item.activeSize === RibbonItemSize.Large);
        };
        var createShrinkEle = function (id, firstItem, start, end) {
            var shrinkEle = _this.createElement('div', {
                className: 'e-ribbon-shrink' + SPACE + RIBBON_ROW,
                id: id + '_shrink_container' + start,
                attrs: { 'data-start': start.toString(), 'data-end': end.toString() }
            });
            firstItem.parentElement.insertBefore(shrinkEle, firstItem);
            if (!shouldSkip) {
                shrinkEle.setAttribute('data-large-width', activeContent.offsetWidth.toString());
            }
            return shrinkEle;
        };
        var moveItemToColumn = function (start, end) {
            var collection = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[0];
            var firstItem = activeContent.querySelector('#' + collection.items[parseInt(start.toString(), 10)].id + CONTAINER_ID);
            var shrinkEle = shouldSkip ? activeContent.querySelector('#' + collection.id + '_shrink_container' + start) :
                createShrinkEle(collection.id, firstItem, start, end);
            for (var i = start; i <= end; i++) {
                var item = collection.items[parseInt(i.toString(), 10)];
                if (!(item.displayOptions & DisplayMode.Classic)) {
                    continue;
                }
                var ele = activeContent.querySelector('#' + item.id + CONTAINER_ID);
                shrinkEle.appendChild(ele);
                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                if (item.type === RibbonItemType.GroupButton && _this.activeLayout === 'Classic') {
                    _this.setItemSize(ele.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID), item);
                }
                else {
                    _this.setItemSize(ele.querySelector('#' + item.id), item);
                }
            }
        };
        var moveCollectionToColumn = function (start, end) {
            var group = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)];
            var firstItem = activeContent.querySelector('#' + group.collections[parseInt(start.toString(), 10)].id);
            var shrinkEle = shouldSkip ? activeContent.querySelector('#' + group.id + '_shrink_container' + start) :
                createShrinkEle(group.id, firstItem, start, end);
            for (var i = start; i <= end; i++) {
                var collection = group.collections[parseInt(i.toString(), 10)];
                var ele = activeContent.querySelector('#' + collection.id);
                shrinkEle.appendChild(ele);
                collection.items[0].setProperties({ activeSize: RibbonItemSize.Medium }, true);
                if (collection.items[0].type === RibbonItemType.GroupButton && _this.activeLayout === 'Classic') {
                    _this.setItemSize(ele.querySelector('#' + collection.items[0].id + RIBBON_GROUP_BUTTON_ID), collection.items[0]);
                }
                else {
                    _this.setItemSize(ele.querySelector('#' + collection.items[0].id), collection.items[0]);
                }
            }
        };
        var orientation = group.orientation;
        if (orientation === ItemOrientation.Column) {
            for (var k = (group.collections.length - 1); k > 0; k--) {
                //to avoid negative index while checking for the second collection
                k = this.checkClassicCollection(group.collections, k, false);
                var l = k - 1;
                //Checks the element rendered at position n
                if ((l >= 0) && canReduceCollection(group.collections[parseInt(k.toString(), 10)])) {
                    l = this.checkClassicCollection(group.collections, l, false);
                    //Checks the element rendered at position n-1
                    if ((l >= 0) && canReduceCollection(group.collections[parseInt(l.toString(), 10)])) {
                        var m = l - 1;
                        if (m >= 0) {
                            m = this.checkClassicCollection(group.collections, m, false);
                        }
                        //Checks the element rendered at position n-2
                        if ((m >= 0) && canReduceCollection(group.collections[parseInt(m.toString(), 10)])) {
                            moveCollectionToColumn(m, k);
                        }
                        else {
                            moveCollectionToColumn(l, k);
                        }
                        k = m;
                        if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                            return true;
                        }
                    }
                    else {
                        k = l;
                    }
                }
            }
        }
        else {
            if (this.checkValidCollectionLength(group.collections)) {
                var collection = group.collections[0];
                for (var k = (collection.items.length - 1); k > 0; k--) {
                    //to avoid negative index while checking for the second item
                    k = this.checkClassicItem(collection.items, k, false);
                    var l = k - 1;
                    //Checks the element rendered at position n
                    if ((l >= 0) && canReduceItem(collection.items[parseInt(k.toString(), 10)])) {
                        l = this.checkClassicItem(collection.items, l, false);
                        //Checks the element rendered at position n-1
                        if ((l >= 0) && canReduceItem(collection.items[parseInt(l.toString(), 10)])) {
                            var m = l - 1;
                            //Checks the element rendered at position n-2
                            if (m >= 0) {
                                m = this.checkClassicItem(collection.items, m, false);
                            }
                            if ((m >= 0) && canReduceItem(collection.items[parseInt(m.toString(), 10)])) {
                                moveItemToColumn(m, k);
                            }
                            else {
                                moveItemToColumn(l, k);
                            }
                            k = m;
                            if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                                return true;
                            }
                        }
                        else {
                            k = l;
                        }
                    }
                }
            }
        }
        return false;
    };
    Ribbon.prototype.checkMediumToSmall = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip) {
        var _this = this;
        if (shouldSkip === void 0) { shouldSkip = false; }
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        if (group.isCollapsed && !shouldSkip) {
            return false;
        }
        var orientation = group.orientation;
        var ele = activeContent.querySelector('#' + group.id);
        var shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        var canReduceItem = function (item) {
            return (item.allowedSizes & RibbonItemSize.Small) && (item.activeSize === RibbonItemSize.Medium);
        };
        var reduceItemsToSmall = function (collectionIndex, start, end, middle) {
            if (middle === void 0) { middle = null; }
            var collection = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[parseInt(collectionIndex.toString(), 10)];
            var reduce = function (i) {
                var item = collection.items[parseInt(i.toString(), 10)];
                if (item.displayOptions & DisplayMode.Classic) {
                    var ele_1 = activeContent.querySelector('#' + item.id);
                    item.setProperties({ activeSize: RibbonItemSize.Small }, true);
                    if (item.type === RibbonItemType.GroupButton) {
                        ele_1 = activeContent.querySelector('#' + item.id + '_grpbtn');
                    }
                    _this.setItemSize(ele_1, item);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
        };
        var reduceCollectionsToSmall = function (index, start, end, middle) {
            if (middle === void 0) { middle = null; }
            var group = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)];
            if (!shouldSkip) {
                shrinkColumns[parseInt(index.toString(), 10)].setAttribute('data-medium-width', activeContent.offsetWidth.toString());
            }
            var reduce = function (i) {
                var collection = group.collections[parseInt(i.toString(), 10)];
                if (collection.items[0].displayOptions & DisplayMode.Classic) {
                    var ele_2 = activeContent.querySelector('#' + collection.items[0].id);
                    collection.items[0].setProperties({ activeSize: RibbonItemSize.Small }, true);
                    if (collection.items[0].type === RibbonItemType.GroupButton) {
                        ele_2 = activeContent.querySelector('#' + collection.items[0].id + RIBBON_GROUP_BUTTON_ID);
                    }
                    _this.setItemSize(ele_2, collection.items[0]);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
        };
        var setWidth = function (id) {
            if (!shouldSkip) {
                var ele_3 = activeContent.querySelector('#' + id);
                ele_3.setAttribute('data-medium-width', activeContent.offsetWidth.toString());
            }
        };
        if (orientation === ItemOrientation.Column) {
            if (shrinkColumns.length > 0) {
                for (var k = (shrinkColumns.length - 1); k >= 0; k--) {
                    var start = parseInt(shrinkColumns[parseInt(k.toString(), 10)].getAttribute('data-start'), 10);
                    var end = parseInt(shrinkColumns[parseInt(k.toString(), 10)].getAttribute('data-end'), 10);
                    //only 2 or 3 itmes alone can be present in shrinked column
                    var l = this.checkClassicCollection(group.collections, start + 1, false); //next valid item
                    if (canReduceItem(group.collections[parseInt(start.toString(), 10)].items[0])
                        && canReduceItem(group.collections[parseInt(l.toString(), 10)].items[0])) {
                        if (end === l) { //if only 2 item, then next valid item will be the end item, else check for 3 rd item satus.
                            reduceCollectionsToSmall(k, start, end);
                        }
                        else if (canReduceItem(group.collections[parseInt(end.toString(), 10)].items[0])) {
                            reduceCollectionsToSmall(k, start, end, l);
                        }
                        if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                            return true;
                        }
                    }
                }
            }
            for (var k = (group.collections.length - 1); k >= 0; k--) {
                var collection = group.collections[parseInt(k.toString(), 10)];
                var classicItems = [];
                for (var i = 0; i < collection.items.length; i++) {
                    if (collection.items[parseInt(i.toString(), 10)].displayOptions & DisplayMode.Classic) {
                        classicItems.push(i);
                    }
                }
                //If items length is 1 then, it would have been already check for shrinked column
                if ((classicItems.length > 1)) {
                    if (canReduceItem(collection.items[classicItems[0]]) && canReduceItem(collection.items[classicItems[1]])) {
                        if (classicItems.length === 2) {
                            setWidth(collection.id);
                            reduceItemsToSmall(k, classicItems[0], classicItems[1]);
                        }
                        else if (canReduceItem(collection.items[classicItems[2]])) {
                            setWidth(collection.id);
                            reduceItemsToSmall(k, classicItems[0], classicItems[2], classicItems[1]);
                        }
                        if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                            return true;
                        }
                    }
                }
            }
        }
        else {
            if (this.checkValidCollectionLength(group.collections)) {
                if (shrinkColumns.length > 0) {
                    for (var k = (shrinkColumns.length - 1); k >= 0; k--) {
                        var shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
                        var start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                        var end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                        //only 2 or 3 itmes alone can be present in shrinked column
                        var collection = group.collections[0];
                        var l = this.checkClassicItem(collection.items, start + 1, false); //next valid item
                        if (canReduceItem(group.collections[0].items[parseInt(start.toString(), 10)])
                            && canReduceItem(group.collections[0].items[parseInt(l.toString(), 10)])) {
                            if (end === l) { //if only 2 item, then next valid item will be the end item, else check for 3 rd item satus.
                                setWidth(shrinkColumn.id);
                                reduceItemsToSmall(0, start, end);
                            }
                            else if (canReduceItem(group.collections[0].items[parseInt(end.toString(), 10)])) {
                                setWidth(shrinkColumn.id);
                                reduceItemsToSmall(0, start, end, l);
                            }
                            if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                                return true;
                            }
                        }
                    }
                }
            }
            else {
                for (var k = (group.collections.length - 1); k >= 0; k--) {
                    var collection = group.collections[parseInt(k.toString(), 10)];
                    for (var l = (collection.items.length - 1); l >= 0; l--) {
                        l = this.checkClassicItem(collection.items, l, false);
                        if (l < 0) {
                            continue;
                        }
                        var item = collection.items[parseInt(l.toString(), 10)];
                        if (canReduceItem(item)) {
                            if (item.type !== RibbonItemType.GroupButton) {
                                setWidth(item.id);
                            }
                            else {
                                setWidth(item.id + RIBBON_GROUP_BUTTON_ID);
                            }
                            reduceItemsToSmall(k, l, l);
                            if (!shouldSkip && (tabContent.offsetWidth > activeContent.offsetWidth)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    Ribbon.prototype.checkGroupExpanding = function (tabIndex, tabContent, activeContent, isSmall) {
        var isBreak = false;
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        for (var j = 0; (!isBreak && (j < tab.groups.length)); j++) {
            isBreak = isSmall ? this.checkSmallToMedium(tabIndex, tab, j, tabContent, activeContent, false, true) :
                this.checkMediumToLarge(tabIndex, tab, j, tabContent, activeContent, false, true);
        }
        return isBreak;
    };
    // eslint-disable-next-line max-len
    Ribbon.prototype.checkSmallToMedium = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip, shouldClear) {
        var _this = this;
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        var orientation = group.orientation;
        var ele = activeContent.querySelector('#' + group.id);
        var shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        var canExpandItem = function (item) {
            return (item.allowedSizes & RibbonItemSize.Medium) && (item.activeSize === RibbonItemSize.Small);
        };
        var expandItemToMedium = function (collectionIndex, index, parentEle) {
            var collection = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections[parseInt(collectionIndex.toString(), 10)];
            var item = collection.items[parseInt(index.toString(), 10)];
            if (item.displayOptions & DisplayMode.Classic) {
                var ele_4 = parentEle.id === item.id ? parentEle : parentEle.querySelector('#' + item.id);
                item.setProperties({ activeSize: RibbonItemSize.Medium }, true);
                if (item.type === RibbonItemType.GroupButton) {
                    ele_4 = document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
                }
                _this.setItemSize(ele_4, item);
            }
        };
        var expandCollectionsToMedium = function (i) {
            var collections = _this.tabs[parseInt(tabIndex.toString(), 10)]
                .groups[parseInt(groupIndex.toString(), 10)].collections;
            var item = collections[parseInt(i.toString(), 10)].items[0];
            if (item.displayOptions & DisplayMode.Classic) {
                var ele_5 = activeContent.querySelector('#' + collections[parseInt(i.toString(), 10)].items[0].id);
                collections[parseInt(i.toString(), 10)].items[0].setProperties({ activeSize: RibbonItemSize.Medium }, true);
                if (item.type === RibbonItemType.GroupButton) {
                    ele_5 = activeContent.querySelector('#' + collections[parseInt(i.toString(), 10)].items[0].id + RIBBON_GROUP_BUTTON_ID);
                }
                _this.setItemSize(ele_5, collections[parseInt(i.toString(), 10)].items[0]);
            }
        };
        if (orientation === ItemOrientation.Row) {
            // collection length is 1, then the it wll be covered in shrinked columns
            if (!this.checkValidCollectionLength(group.collections)) {
                for (var k = 0; k < group.collections.length; k++) {
                    var collection = group.collections[parseInt(k.toString(), 10)];
                    for (var l = 0; l < collection.items.length; l++) {
                        l = this.checkClassicItem(collection.items, l, true);
                        if (l === collection.items.length) {
                            continue;
                        }
                        var item = collection.items[parseInt(l.toString(), 10)];
                        if (canExpandItem(item)) {
                            var itemEle = activeContent.querySelector('#' + item.id);
                            if (item.type === 'GroupButton') {
                                itemEle = activeContent.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
                            }
                            var valString = itemEle.getAttribute('data-medium-width');
                            var value = valString ? parseInt(valString, 10) : null;
                            if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                                expandItemToMedium(k, l, itemEle);
                                if (!shouldSkip || shouldClear) {
                                    itemEle.removeAttribute('data-medium-width');
                                }
                            }
                            else if (value) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        else {
            for (var k = 0; k < group.collections.length; k++) {
                //If items length is 1 then, it will be handled in shrinked column
                if ((group.collections[parseInt(k.toString(), 10)].items.length > 1)) {
                    var collection = group.collections[parseInt(k.toString(), 10)];
                    var itemEle = activeContent.querySelector('#' + collection.id);
                    var valString = itemEle.getAttribute('data-medium-width');
                    var value = valString ? parseInt(valString, 10) : null;
                    var classicItems = [];
                    for (var i = 0; i < collection.items.length; i++) {
                        if (collection.items[parseInt(i.toString(), 10)].displayOptions & DisplayMode.Classic) {
                            classicItems.push(i);
                        }
                    }
                    if ((classicItems.length > 1) && value && (shouldSkip || (tabContent.offsetWidth > value))) {
                        expandItemToMedium(k, classicItems[0], itemEle);
                        expandItemToMedium(k, classicItems[1], itemEle);
                        if (classicItems.length === 3) {
                            expandItemToMedium(k, classicItems[2], itemEle);
                        }
                        if (!shouldSkip || shouldClear) {
                            itemEle.removeAttribute('data-medium-width');
                        }
                    }
                    else if (value) {
                        return true;
                    }
                }
            }
        }
        if (shrinkColumns.length > 0) {
            for (var k = 0; k < shrinkColumns.length; k++) {
                var shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
                var valString = shrinkColumn.getAttribute('data-medium-width');
                var value = valString ? parseInt(valString, 10) : null;
                if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                    var start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                    var end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                    if (orientation === ItemOrientation.Row) {
                        var collection = group.collections[0];
                        var l = this.checkClassicItem(collection.items, start + 1, true); //next valid item
                        expandItemToMedium(0, start, shrinkColumn);
                        expandItemToMedium(0, l, shrinkColumn);
                        // if l == end, then l is the last item, else L is the middle item. If l is middle then call the method for end.
                        if (l !== end) {
                            expandItemToMedium(0, end, shrinkColumn);
                        }
                    }
                    else {
                        var m = this.checkClassicCollection(group.collections, start + 1, true); //next valid item
                        expandCollectionsToMedium(start);
                        expandCollectionsToMedium(m);
                        if (m !== end) {
                            expandCollectionsToMedium(end);
                        }
                    }
                    if (!shouldSkip || shouldClear) {
                        shrinkColumn.removeAttribute('data-medium-width');
                    }
                }
                else if (value) {
                    return true;
                }
            }
        }
        return false;
    };
    Ribbon.prototype.checkMediumToLarge = function (tabIndex, tab, groupIndex, tabContent, activeContent, shouldSkip, shouldClear) {
        var _this = this;
        var group = tab.groups[parseInt(groupIndex.toString(), 10)];
        var orientation = group.orientation;
        var ele = activeContent.querySelector('#' + group.id);
        var shrinkColumns = ele.querySelectorAll('.' + 'e-ribbon-shrink');
        if (shrinkColumns.length === 0) {
            return false;
        }
        var expandItemsToLarge = function (start, end, parentEle, middle) {
            var items = _this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].collections[0].items;
            var reduce = function (i) {
                var item = items[parseInt(i.toString(), 10)];
                if (item.displayOptions & DisplayMode.Classic) {
                    var container = parentEle.querySelector('#' + item.id + CONTAINER_ID);
                    var ele_6 = container.querySelector('#' + item.id);
                    item.setProperties({ activeSize: RibbonItemSize.Large }, true);
                    if (item.type === RibbonItemType.GroupButton) {
                        ele_6 = container.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
                    }
                    _this.setItemSize(ele_6, item);
                    parentEle.insertAdjacentElement('beforebegin', container);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
            if (!shouldSkip || shouldClear) {
                remove(parentEle);
            }
        };
        var expandCollectionsToLarge = function (start, end, parentEle, middle) {
            var collections = _this.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].collections;
            var reduce = function (i) {
                var collection = collections[parseInt(i.toString(), 10)];
                if (collection.items[0].displayOptions & DisplayMode.Classic) {
                    var collectionEle = parentEle.querySelector('#' + collection.id);
                    var ele_7 = collectionEle.querySelector('#' + collection.items[0].id);
                    collection.items[0].setProperties({ activeSize: RibbonItemSize.Large }, true);
                    if (collection.items[0].type === RibbonItemType.GroupButton) {
                        ele_7 = collectionEle.querySelector('#' + collection.items[0].id + RIBBON_GROUP_BUTTON_ID);
                    }
                    _this.setItemSize(ele_7, collection.items[0]);
                    parentEle.insertAdjacentElement('beforebegin', collectionEle);
                }
            };
            reduce(start);
            if (middle) {
                reduce(middle);
            }
            reduce(end);
            if (!shouldSkip || shouldClear) {
                remove(parentEle);
            }
        };
        for (var k = 0; k < shrinkColumns.length; k++) {
            var shrinkColumn = shrinkColumns[parseInt(k.toString(), 10)];
            var valString = shrinkColumn.getAttribute('data-large-width');
            var value = valString ? parseInt(valString, 10) : null;
            if (value && (shouldSkip || (tabContent.offsetWidth > value))) {
                var start = parseInt(shrinkColumn.getAttribute('data-start'), 10);
                var end = parseInt(shrinkColumn.getAttribute('data-end'), 10);
                if (orientation === ItemOrientation.Row) {
                    var collection = group.collections[0];
                    var l = this.checkClassicItem(collection.items, start + 1, true); //next valid item
                    if (l === end) {
                        expandItemsToLarge(start, end, shrinkColumn);
                    }
                    else {
                        expandItemsToLarge(start, end, shrinkColumn, l);
                    }
                }
                else {
                    var m = this.checkClassicCollection(group.collections, start + 1, true); //next valid item
                    if (m === end) {
                        expandCollectionsToLarge(start, end, shrinkColumn);
                    }
                    else {
                        expandCollectionsToLarge(start, end, shrinkColumn, m);
                    }
                }
                if (!shouldSkip || shouldClear) {
                    shrinkColumn.removeAttribute('data-large-width');
                }
            }
            else if (value) {
                return true;
            }
        }
        return false;
    };
    Ribbon.prototype.handleContentSize = function (itemEle, isRemoveOverflow) {
        var itemContainer = itemEle.closest('.' + RIBBON_GROUP_CONTENT);
        if (isRemoveOverflow) {
            itemContainer.classList.add(RIBBON_CONTENT_HEIGHT);
        }
        else {
            itemContainer.classList.remove(RIBBON_CONTENT_HEIGHT);
        }
    };
    Ribbon.prototype.setItemSize = function (itemEle, item) {
        if (itemEle) {
            var itemContainer = itemEle.closest('.' + RIBBON_ITEM);
            if (item.type === RibbonItemType.Button) {
                this.ribbonButtonModule.updateButtonSize(itemEle, item);
            }
            else if (item.type === RibbonItemType.DropDown) {
                this.ribbonDropDownModule.updateDropDownSize(itemEle, item);
            }
            else if (item.type === RibbonItemType.SplitButton) {
                this.ribbonSplitButtonModule.updateSplitButtonSize(itemEle, item);
            }
            else if (item.type === RibbonItemType.Template) {
                remove(itemEle);
                this.createTemplateContent(item, itemContainer);
            }
            else if (item.type === RibbonItemType.GroupButton) {
                this.ribbonGroupButtonModule.updateGroupButtonSize(itemEle, item);
            }
            itemContainer.classList.remove(RIBBON_CONTENT_HEIGHT, RIBBON_LARGE_ITEM, RIBBON_MEDIUM_ITEM, RIBBON_SMALL_ITEM);
            if (item.activeSize === RibbonItemSize.Large) {
                itemContainer.classList.add(RIBBON_LARGE_ITEM, RIBBON_CONTENT_HEIGHT);
            }
            else {
                itemContainer.classList.add((item.activeSize === RibbonItemSize.Medium) ?
                    RIBBON_MEDIUM_ITEM : RIBBON_SMALL_ITEM);
            }
        }
    };
    Ribbon.prototype.createOverflowDropdown = function (tabIndex, tabContent, activeContent) {
        var collapseOrder = this.getGroupResizeOrder(true, tabIndex);
        if (collapseOrder.length === 0) {
            return;
        }
        var _loop_1 = function (i) {
            var group = collapseOrder[parseInt(i.toString(), 10)];
            var groupEle = this_1.tabObj.element.querySelector('#' + group.id);
            groupEle.setAttribute('data-expanded-width', activeContent.offsetWidth.toString());
            var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
            var groupOverFlow = this_1.createElement('div', {
                className: RIBBON_GROUP_OVERFLOW + SPACE + RIBBON_LARGE_ITEM,
                id: group.id + OVERFLOW_ID + CONTAINER_ID
            });
            groupEle.insertBefore(groupOverFlow, groupContainer);
            var groupIndex = getIndex(this_1.tabs[parseInt(tabIndex.toString(), 10)].groups, function (e) { return e.id === group.id; });
            var tab = this_1.tabs[parseInt(tabIndex.toString(), 10)];
            //Expanding the items in the group to their original expanded state
            this_1.checkSmallToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, true, false);
            this_1.checkMediumToLarge(tabIndex, tab, groupIndex, tabContent, activeContent, true, false);
            var dropdown = this_1.ribbonDropDownModule.createOverFlowDropDown(group.id, group.header, group.groupIconCss, groupContainer, groupOverFlow, this_1.enableRtl);
            if (group.keyTip) {
                var overflowDDB = group.id + OVERFLOW_ID + DROPDOWN_ID;
                this_1.addKeyTip(tabIndex, group.keyTip, overflowDDB, 'grpoverflow');
            }
            this_1.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].setProperties({ isCollapsed: true }, true);
            for (var j = 0; j < group.collections.length; j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                var collectionEle = groupContainer.querySelector('#' + collection.id);
                for (var k = 0; k < collection.items.length; k++) {
                    var item = collection.items[parseInt(k.toString(), 10)];
                    var itemEle = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
                    if (itemEle !== null) {
                        this_1.handleContentSize(itemEle);
                        this_1.addOverflowEvents(item, itemEle, dropdown);
                    }
                    var overflowDDB = document.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID);
                    var overflowButton = getInstance(overflowDDB, DropDownButton);
                    if (overflowButton) {
                        var overflowtarget = overflowButton.target;
                        if (overflowtarget) {
                            if (this_1.keyTipElements[parseInt(tabIndex.toString(), 10)]) {
                                if (item.type === RibbonItemType.GroupButton) {
                                    for (var i_3 = 0; i_3 < item.groupButtonSettings.items.length; i_3++) {
                                        if (item.groupButtonSettings.items[parseInt(i_3.toString(), 10)].keyTip) {
                                            this_1.addKeyTip(tabIndex, item.groupButtonSettings.items[parseInt(i_3.toString(), 10)].keyTip, item.id + (RIBBON_GROUP_BUTTON_ID + i_3), 'grpoverflowpopup');
                                        }
                                    }
                                }
                                if (item.keyTip) {
                                    this_1.addKeyTip(tabIndex, item.keyTip, item.id, 'grpoverflowpopup');
                                }
                            }
                        }
                    }
                }
            }
        };
        var this_1 = this;
        for (var i = 0; ((i < collapseOrder.length) && (tabContent.offsetWidth < activeContent.offsetWidth)); i++) {
            _loop_1(i);
        }
    };
    // eslint-disable-next-line max-len
    Ribbon.prototype.removeOverflowDropdown = function (tabContent, activeContent, isClear, tabIndex) {
        if (isClear === void 0) { isClear = false; }
        var expandOrder = this.getGroupResizeOrder(false, tabIndex);
        if (expandOrder.length === 0) {
            return false;
        }
        var _loop_2 = function (i) {
            var group = expandOrder[parseInt(i.toString(), 10)];
            var groupEle = this_2.tabObj.element.querySelector('#' + group.id);
            if (!groupEle) {
                return "break";
            } //to handle the rerendering of tabcontrol when a ribbon tab is added/removed
            var width = parseInt(groupEle.getAttribute('data-expanded-width'), 10);
            if (!isClear && (tabContent.offsetWidth < width)) {
                return { value: true };
            }
            this_2.removeDropdown(group.id);
            var groupIndex = getIndex(this_2.tabs[parseInt(tabIndex.toString(), 10)].groups, function (e) { return e.id === group.id; });
            this_2.tabs[parseInt(tabIndex.toString(), 10)].
                groups[parseInt(groupIndex.toString(), 10)].setProperties({ isCollapsed: false }, true);
            var tab = this_2.tabs[parseInt(tabIndex.toString(), 10)];
            //Shrinking the items in the group to their previous shrinked state (before moving to dropdown)
            this_2.checkLargeToMedium(tabIndex, tab, groupIndex, tabContent, activeContent, true);
            this_2.checkMediumToSmall(tabIndex, tab, groupIndex, tabContent, activeContent, true);
            for (var j = 0; j < group.collections.length; j++) {
                var collection = group.collections[parseInt(j.toString(), 10)];
                var collectionEle = groupEle.querySelector('#' + collection.id);
                for (var k = 0; k < collection.items.length; k++) {
                    var item = collection.items[parseInt(k.toString(), 10)];
                    var itemEle = collectionEle.querySelector('#' + item.id + CONTAINER_ID);
                    if (itemEle !== null) {
                        this_2.handleContentSize(itemEle, true);
                        this_2.removeOverflowEvent(item, itemEle);
                    }
                }
            }
        };
        var this_2 = this;
        for (var i = 0; i < expandOrder.length; i++) {
            var state_1 = _loop_2(i);
            if (typeof state_1 === "object")
                return state_1.value;
            if (state_1 === "break")
                break;
        }
        return false;
    };
    Ribbon.prototype.removeDropdown = function (groupId) {
        var dropdownElement = this.tabObj.element.querySelector('#' + groupId + OVERFLOW_ID + DROPDOWN_ID);
        if (dropdownElement) {
            var groupOverFlow = dropdownElement.parentElement;
            this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
            remove(groupOverFlow);
        }
    };
    Ribbon.prototype.getGroupResizeOrder = function (isCollapse, tabIndex) {
        var _this = this;
        var groups = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
        groups = groups.filter(function (e) {
            // (isUndefined(e.isCollapsible) || e.isCollapsible) => check whethe rhte item is collapsible
            // if a isCollapsed property is undefined, then it is considered collapsible and included in collapsible list
            // ((isCollapse && !e.isCollapsed)||(!isCollapse && e.isCollapsed)) => isCollapse !== e.isCollapsed
            return (_this.activeLayout === 'Classic') ? (isUndefined(e.isCollapsible) || e.isCollapsible) && ((isCollapse &&
                isUndefined(e.isCollapsed)) || (!isUndefined(e.isCollapsed) && (isCollapse !== e.isCollapsed))) : true;
        });
        //sort the collapsible groups based on the priority
        groups.sort(function (a, b) { return a.priority - b.priority; });
        //reverse the sorted array to return the array in descending order while collapsing.
        return isCollapse ? groups.reverse() : groups;
    };
    Ribbon.prototype.destroyScroll = function () {
        if (this.scrollModule) {
            this.scrollModule.destroy();
            this.scrollModule = null;
        }
    };
    Ribbon.prototype.clearOverflowDropDown = function (index) {
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(index.toString(), 10)].id + CONTENT_ID);
        if (!activeContent) {
            return;
        }
        var tabContent = activeContent.closest('.' + TAB_CONTENT);
        if (this.activeLayout === 'Simplified') {
            this.removeSimplfiedOverflow(activeContent, tabContent, index, true);
        }
        else {
            this.removeOverflowDropdown(activeContent, tabContent, true, index);
        }
    };
    Ribbon.prototype.isContextualTab = function (tabID) {
        var isContextual = false;
        if (this.contextualTabs.length) {
            for (var i = 0; i < this.contextualTabs.length; i++) {
                for (var j = 0; j < this.contextualTabs[parseInt(i.toString(), 10)].tabs.length; j++) {
                    if (this.contextualTabs[parseInt(i.toString(), 10)].tabs[parseInt(j.toString(), 10)].id === tabID) {
                        isContextual = true;
                        break;
                    }
                }
            }
        }
        return isContextual;
    };
    Ribbon.prototype.ribbonTabSelecting = function (e) {
        var _this = this;
        this.currentControlIndex = 0;
        var nextTabId = e.selectingItem ? e.selectingItem.getAttribute('data-id') : null;
        var previousTabId = e.previousItem.getAttribute('data-id');
        var nextIndex = getIndex(this.tabs, (function (tab) { return (tab.id === nextTabId); }));
        var isContextual = this.isContextualTab(nextTabId);
        var previousIndex = getIndex(this.tabs, (function (tab) { return (tab.id === previousTabId); }));
        nextIndex = nextIndex === -1 ? this.selectedTab : nextIndex;
        var eventArgs = {
            cancel: e.cancel, isInteracted: e.isInteracted, previousIndex: previousIndex,
            selectedIndex: nextIndex, isContextual: isContextual
        };
        this.trigger('tabSelecting', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            _this.destroyScroll();
            if (!_this.isAddRemove && (previousIndex !== -1)) {
                _this.clearOverflowDropDown(previousIndex);
            }
            var selectedTabContent = _this.tabObj.items[parseInt(nextIndex.toString(), 10)].content;
            if ((!selectedTabContent.querySelector('.' + RIBBON_GROUP)) && (_this.tabs[parseInt(nextIndex.toString(), 10)].groups.length !== 0)) {
                var elements = _this.createGroups(_this.tabs[parseInt(nextIndex.toString(), 10)].groups, nextIndex);
                append(elements, selectedTabContent);
            }
        });
    };
    Ribbon.prototype.createTabItems = function (tabs) {
        var _this = this;
        var tabItems = [];
        var _loop_3 = function (i) {
            var ribbonTab = tabs[parseInt(i.toString(), 10)];
            var header = this_3.createElement('span', {
                innerHTML: ribbonTab.header,
                id: ribbonTab.id + HEADER_ID
            });
            var tabIndex = getIndex(this_3.tabs, (function (tab) { return (tab.id === ribbonTab.id); }));
            if (ribbonTab.keyTip) {
                if (!this_3.keyTipElements[parseInt(tabIndex.toString(), 10)]) {
                    this_3.keyTipElements[parseInt(tabIndex.toString(), 10)] = {};
                }
                this_3.addKeyTip(tabIndex, ribbonTab.keyTip, ribbonTab.id, 'tab');
            }
            header.onclick = function () { _this.minimize(false); };
            header.ondblclick = function () { _this.minimize(true); };
            var tab = { header: { text: header }, id: ribbonTab.id, cssClass: ribbonTab.cssClass };
            var content = this_3.createElement('div', {
                className: tab.cssClass,
                id: ribbonTab.id + CONTENT_ID
            });
            content.classList.add(RIBBON_TAB_ITEM);
            tab.content = content;
            tabItems.push(tab);
        };
        var this_3 = this;
        for (var i = 0; i < tabs.length; i++) {
            _loop_3(i);
        }
        return tabItems;
    };
    Ribbon.prototype.renderInitialTab = function (index) {
        var elements = this.createGroups(this.tabs[parseInt(index.toString(), 10)].groups, index);
        var content = this.tabObj.items[parseInt(index.toString(), 10)].content;
        append(elements, content);
        if (this.activeLayout === 'Simplified') {
            this.element.classList.add(RIBBON_SIMPLIFIED_MODE);
        }
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        if (this.ribbonGalleryModule) {
            this.ribbonGalleryModule.checkAvailableHeight(activeContent);
        }
        this.checkOverflow(this.selectedTab, activeContent);
    };
    Ribbon.prototype.addOverflowButton = function (btnId, isGroupOF) {
        var _this = this;
        var overflowButton = this.createElement('button', {
            id: btnId
        });
        var overflowTarget = this.createElement('div', {
            className: RIBBON_OVERFLOW_TARGET,
            attrs: { 'tabindex': '0' }
        });
        var overflowDDB = new DropDownButton({
            iconCss: OVERFLOW_ICON,
            cssClass: DROPDOWNBUTTON_HIDE + SPACE + RIBBON_GROUP_OVERFLOW_DDB,
            target: overflowTarget,
            locale: this.locale,
            enableRtl: this.enableRtl,
            enablePersistence: this.enablePersistence,
            beforeOpen: function (args) {
                var eventArgs = { element: args.element, event: args.event, cancel: args.cancel };
                _this.trigger('overflowPopupOpen', eventArgs, function (ribbonArgs) {
                    if (ribbonArgs.cancel) {
                        args.cancel = true;
                    }
                });
            },
            beforeClose: function (args) {
                var ele = args.event ? closest(args.event.target, '.' + RIBBON_POPUP_CONTROL) : null;
                var groupButtonEle = args.event ? closest(args.event.target, '.e-ribbon-group-button-overflow-popup') : null;
                var eventArgs = { element: args.element, event: args.event, cancel: args.cancel };
                _this.trigger('overflowPopupClose', eventArgs, function (ribbonArgs) {
                    if (ele || ribbonArgs.cancel || groupButtonEle) {
                        args.cancel = true;
                    }
                });
            }
        }, overflowButton);
        this.element.classList.add(RIBBON_OVERFLOW);
        createTooltip(overflowTarget, this);
        if (!isGroupOF) {
            this.keyTipElements['overflowbtn'] = [];
            this.keyTipElements['overflowbtn'].push({ id: btnId, type: 'overflowbtn', keyTip: '00' });
        }
        var isGroupOf;
        overflowButton.onkeydown = overflowButton.onclick = function () { _this.itemIndex = -1; isGroupOf = overflowButton.classList.contains('e-ribbon-overall-of-btn') ? false : true; };
        overflowTarget.onkeydown = function (e) { return (_this.upDownKeyHandler(e, overflowTarget, isGroupOf), _this); };
        return overflowDDB;
    };
    Ribbon.prototype.upDownKeyHandler = function (e, target, isGroupOf) {
        var items;
        if (isGroupOf) {
            items = target.getElementsByClassName('e-ribbon-item');
        }
        else {
            var currentList = target.querySelector('.e-ribbon-of-tab.e-ribbon-active');
            items = currentList.getElementsByClassName('e-ribbon-item');
        }
        var control = items[(!this.itemIndex || this.itemIndex < 0) ? 0 : this.itemIndex].querySelector('.e-control');
        var comboBoxEle = control && control.classList.contains('e-combobox') ?
            items[(!this.itemIndex || this.itemIndex < 0) ? 0 : this.itemIndex].querySelector('.e-combobox') : null;
        var ribbonItem;
        var templateEle;
        if (comboBoxEle === null || (e.key === 'Tab') || this.itemIndex < 0) {
            if (e.key === 'ArrowDown' || (!e.shiftKey && e.key === 'Tab')) {
                if ((!this.itemIndex && this.itemIndex !== 0) || this.itemIndex < 0 || this.itemIndex === items.length - 1) {
                    this.itemIndex = 0;
                    ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                    this.findDisabledItem(ribbonItem, items, true);
                    if (comboBoxEle && e.key === 'Tab') {
                        e.preventDefault();
                        var item = items[this.itemIndex].querySelector('.e-control');
                        if (item) {
                            item.focus();
                        }
                    }
                    templateEle = items[this.itemIndex].querySelector('.e-ribbon-template');
                }
                else if (this.itemIndex < items.length - 1 && this.itemIndex >= 0) {
                    this.itemIndex++;
                    ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                    this.findDisabledItem(ribbonItem, items, true);
                    templateEle = items[this.itemIndex].querySelector('.e-ribbon-template');
                }
                if (templateEle) {
                    templateEle.focus();
                }
            }
            else if (e.key === 'ArrowUp' || (e.shiftKey && e.key === 'Tab')) {
                if (comboBoxEle === null || (e.key === 'Tab')) {
                    if (!this.itemIndex || this.itemIndex === -1) {
                        this.itemIndex = items.length - 1;
                        ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                        this.findDisabledItem(ribbonItem, items, false);
                        if (comboBoxEle && (e.shiftKey && e.key === 'Tab')) {
                            e.preventDefault();
                            var item = items[this.itemIndex].querySelector('.e-control');
                            if (item) {
                                item.focus();
                            }
                        }
                        templateEle = items[this.itemIndex].querySelector('.e-ribbon-template');
                    }
                    else if (this.itemIndex <= items.length - 1 && this.itemIndex > 0) {
                        this.itemIndex--;
                        ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
                        this.findDisabledItem(ribbonItem, items, false);
                        templateEle = items[this.itemIndex].querySelector('.e-ribbon-template');
                    }
                    if (templateEle) {
                        templateEle.focus();
                    }
                }
            }
            target.setAttribute('index', this.itemIndex.toString());
        }
        var currentItemIndex = parseInt(target.getAttribute('index'), 10);
        var itemType = '';
        var controlItem = items[parseInt(currentItemIndex.toString(), 10)] ? items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control') : null;
        if (controlItem) {
            itemType = controlItem.getAttribute('data-control');
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ' || e.key === 'Tab') {
            if (itemType === 'ColorPicker') {
                if (e.key === 'Tab') {
                    e.preventDefault();
                }
                items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-split-colorpicker').focus();
            }
            else {
                if (e.key === 'Tab') {
                    e.preventDefault();
                }
                var elem = items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control');
                if (elem) {
                    elem.focus();
                }
            }
            if (e.key === ' ' && (itemType === 'CheckBox')) {
                var checkBoxEle = items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control');
                var checkBox = getComponent(checkBoxEle, CheckBox);
                this.itemIndex = -1;
                checkBox.click();
            }
        }
        if (((itemType === 'SplitButton') && (e.key === 'ArrowRight' || e.key === 'ArrowLeft'))) {
            if (e.key === 'ArrowRight') {
                if (this.enableRtl) {
                    items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control').focus();
                }
                else {
                    items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-dropdown-btn').focus();
                }
            }
            if (e.key === 'ArrowLeft') {
                if (this.enableRtl) {
                    items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-dropdown-btn').focus();
                }
                else {
                    items[parseInt(currentItemIndex.toString(), 10)].querySelector('.e-control').focus();
                }
            }
        }
        if (e.key === 'Enter') {
            this.itemIndex = -1;
        }
    };
    Ribbon.prototype.findDisabledItem = function (ribbonItem, items, isIncrease) {
        while (ribbonItem && ribbonItem.classList.contains('e-disabled')) {
            if (isIncrease) {
                if (this.itemIndex === items.length - 1 && items[this.itemIndex].closest('.e-ribbon-item').classList.contains('e-disabled')) {
                    this.itemIndex = -1;
                }
            }
            else {
                if (this.itemIndex === 0 && items[this.itemIndex].closest('.e-ribbon-item').classList.contains('e-disabled')) {
                    this.itemIndex = items.length;
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            isIncrease ? this.itemIndex++ : this.itemIndex--;
            ribbonItem = items[this.itemIndex].closest('.e-ribbon-item');
        }
    };
    Ribbon.prototype.removeOverflowButton = function (overflowDDB) {
        if (overflowDDB) {
            var btnEle = overflowDDB.element;
            destroyTooltip(overflowDDB.target);
            overflowDDB.destroy();
            btnEle.remove();
        }
    };
    Ribbon.prototype.removeOverflowEvent = function (item, itemEle) {
        if (itemEle) {
            switch (item.type) {
                case 'Button':
                    this.ribbonButtonModule.removeOverFlowEvents(item, itemEle);
                    break;
                case 'DropDown':
                    this.ribbonDropDownModule.removeOverFlowEvents(item, itemEle);
                    break;
                case 'SplitButton':
                    this.ribbonSplitButtonModule.removeOverFlowEvents(item, itemEle);
                    break;
                case 'CheckBox':
                    this.ribbonCheckBoxModule.removeOverFlowEvents(item, itemEle);
                    break;
                case 'ColorPicker':
                    this.ribbonColorPickerModule.removeOverFlowEvents(item, itemEle);
                    break;
                case 'ComboBox':
                    this.ribbonComboBoxModule.removeOverFlowEvents(item, itemEle);
                    break;
                case 'Gallery':
                    this.ribbonGalleryModule.removeOverFlowEvents(item, itemEle);
                    break;
                case 'GroupButton':
                    this.ribbonGroupButtonModule.removeOverFlowEvents(item, itemEle);
                    break;
            }
        }
    };
    Ribbon.prototype.createGroupContainer = function (groupId, groupHeader) {
        var ofGroupContainer = this.createElement('div', {
            className: RIBBON_OF_GROUP_CONTAINER,
            id: groupId + CONTAINER_ID
        });
        var ofGroupHeader = this.createElement('div', {
            className: RIBBON_OVERFLOW_HEADER,
            id: groupId + HEADER_ID,
            innerHTML: groupHeader
        });
        ofGroupContainer.append(ofGroupHeader);
        return ofGroupContainer;
    };
    Ribbon.prototype.addExpandCollapse = function () {
        var _this = this;
        this.collapseButton = this.createElement('span', {
            className: RIBBON_COLLAPSE_BUTTON + SPACE + EXPAND_COLLAPSE_ICON,
            id: this.tabObj.element.id + COLLAPSE_BUTTON_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Layout Switcher', 'role': 'button' }
        });
        this.collapseButton.onclick = function (e) { _this.toggleLayout(e); };
        this.collapseButton.onkeydown = function (e) {
            if (e.key === 'Enter') {
                _this.toggleLayout(e);
            }
        };
        this.element.classList.add(RIBBON_COLLAPSIBLE);
        if (this.activeLayout === 'Simplified') {
            this.collapseButton.classList.add(RIBBON_EXPAND_BUTTON);
        }
        this.tabObj.element.appendChild(this.collapseButton);
        if (this.layoutSwitcherKeyTip) {
            this.keyTipElements['collapse'] = [];
            this.keyTipElements['collapse'].push({ id: this.collapseButton.id, type: 'collapse', keyTip: this.layoutSwitcherKeyTip });
        }
    };
    Ribbon.prototype.removeExpandCollapse = function () {
        var _this = this;
        var index = getIndex(this.tooltipData, function (e) { return e.id === _this.collapseButton.id; });
        if (index !== -1) {
            this.tooltipData.splice(index, 1);
        }
        this.element.classList.remove(RIBBON_COLLAPSIBLE);
        remove(this.tabObj.element.querySelector('.' + RIBBON_COLLAPSE_BUTTON));
        this.collapseButton = null;
    };
    Ribbon.prototype.reRenderTabs = function (tabs) {
        this.destroyScroll();
        this.checkID(this.tabs, 'tab', this.element.id);
        for (var _i = 0, _a = Object.keys(tabs); _i < _a.length; _i++) {
            var key = _a[_i];
            var index = parseInt(key, 10);
            var tab = tabs[parseInt(index.toString(), 10)];
            var isNewTab = false;
            for (var j = 0; j < (this.tabObj.items.length); j++) {
                if (this.tabs[parseInt(index.toString(), 10)].id === this.tabObj.items[parseInt(j.toString(), 10)].id) {
                    isNewTab = true;
                    break;
                }
            }
            if (!isNewTab) {
                this.destroyTabItems(this.tabsInternal);
                this.tabsInternal = this.tabs.slice();
                this.validateItemSize();
                var tabItems = this.createTabItems(this.tabs);
                if (this.selectedTab >= this.tabs.length) {
                    this.selectedTab = this.tabs.length - 1;
                }
                this.tabObj.setProperties({ items: tabItems, selectedItem: this.selectedTab });
                break;
            }
            else {
                var groups = this.tabs[parseInt(index.toString(), 10)].groups;
                var tabEle = this.tabObj.element;
                var ribbonTab = this.tabs[parseInt(index.toString(), 10)];
                ribbonTab.setProperties(tab, true);
                this.setProperties({ groups: this.checkID(ribbonTab.groups, 'group', ribbonTab.id) }, true);
                this.validateItemSize();
                var contentEle = this.tabObj.items[parseInt(index.toString(), 10)].content;
                if (groups) {
                    // Check whether header is passed by the user and sets the updated values.
                    if (tab.header) {
                        this.tabObj.items[parseInt(index.toString(), 10)].header.text.innerText = ribbonTab.header;
                    }
                    // Check whether cssClass is passed by the user, and if it is, then remove the old values.
                    if (tab.cssClass) {
                        if (this.tabObj.items[parseInt(index.toString(), 10)].cssClass) {
                            contentEle.classList.remove(this.tabObj.items[parseInt(index.toString(), 10)].cssClass);
                            tabEle.querySelector('.e-active').classList.remove(this.tabObj.items[parseInt(index.toString(), 10)].cssClass);
                        }
                        contentEle.classList.add(ribbonTab.cssClass);
                        tabEle.querySelector('.e-active').classList.add(ribbonTab.cssClass);
                    }
                    // Check whether group is passed by the user, and if it is, then remove the old values.
                    if (tab.groups) {
                        for (var _b = 0, groups_1 = groups; _b < groups_1.length; _b++) {
                            var group = groups_1[_b];
                            var dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                            for (var _c = 0, _d = group.collections; _c < _d.length; _c++) {
                                var collection = _d[_c];
                                for (var _e = 0, _f = collection.items; _e < _f.length; _e++) {
                                    var item = _f[_e];
                                    var ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
                                    if (ele) {
                                        this.destroyFunction(item, ele);
                                    }
                                }
                            }
                            if (dropdownElement) {
                                this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                            }
                        }
                        var groupElements = contentEle.querySelectorAll('.e-ribbon-group');
                        // eslint-disable-next-line @typescript-eslint/tslint/config
                        groupElements.forEach(function (groupEle) { groupEle.remove(); });
                        var elements = this.createGroups(ribbonTab.groups, index);
                        append(elements, contentEle);
                    }
                }
            }
        }
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        this.checkOverflow(this.selectedTab, activeContent);
    };
    Ribbon.prototype.switchLayout = function () {
        this.currentControlIndex = 0;
        this.destroyScroll();
        this.collapseButton.classList.toggle(RIBBON_EXPAND_BUTTON, this.activeLayout === 'Simplified');
        this.element.classList.toggle(RIBBON_SIMPLIFIED_MODE, this.activeLayout === 'Simplified');
        for (var i = 0; i <= (this.tabs.length - 1); i++) {
            var tabIndex = i;
            var contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
            if (contentEle.innerHTML !== '') {
                var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
                var groupList = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
                var activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + CONTENT_ID);
                var tabContent = activeContent.closest('.' + TAB_CONTENT);
                if (this.activeLayout === 'Simplified') {
                    for (var i_4 = 0; i_4 < groupList.length; i_4++) {
                        var group = groupList[parseInt(i_4.toString(), 10)];
                        var alignType = groupList[parseInt(i_4.toString(), 10)].orientation;
                        if (group.isCollapsed) {
                            group.setProperties({ isCollapsed: false }, true);
                            this.removeDropdown(group.id);
                        }
                        else {
                            this.checkSmallToMedium(tabIndex, tab, i_4, tabContent, activeContent, true, false);
                            this.checkMediumToLarge(tabIndex, tab, i_4, tabContent, activeContent, true, false);
                        }
                        var groupEle = tabContent.querySelector('#' + group.id);
                        var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
                        var shrinkColumns = groupContainer.querySelectorAll('.' + 'e-ribbon-shrink');
                        for (var i_5 = 0; i_5 < shrinkColumns.length; i_5++) {
                            shrinkColumns[parseInt(i_5.toString(), 10)].remove();
                        }
                        var groupHeader = groupContainer.querySelector('#' + group.id + HEADER_ID);
                        groupHeader.remove();
                        var groupContent = groupContainer.querySelector('#' + group.id + CONTENT_ID);
                        groupContent.classList.replace(RIBBON_ROW, RIBBON_COLUMN);
                        groupContent.classList.remove(RIBBON_CONTENT_HEIGHT);
                        for (var j = 0; j < group.collections.length; j++) {
                            var collection = group.collections[parseInt(j.toString(), 10)];
                            var groupCollection = groupContainer.querySelector('#' + collection.id);
                            groupCollection.classList.replace(RIBBON_ROW, RIBBON_COLUMN);
                            for (var k = 0; k < collection.items.length; k++) {
                                var itemList = collection.items;
                                var item = collection.items[parseInt(k.toString(), 10)];
                                var flag = true;
                                while ((flag) && (item.displayOptions === DisplayMode.Classic)) {
                                    k++;
                                    var itemEle_1 = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                    var ele = itemEle_1.querySelector('#' + item.id);
                                    this.destroyFunction(item, ele);
                                    itemEle_1.remove();
                                    if (k < itemList.length) {
                                        item = itemList[parseInt(k.toString(), 10)];
                                    }
                                    else {
                                        flag = false;
                                    }
                                }
                                if (!flag) {
                                    break;
                                }
                                var size = ((item.allowedSizes === RibbonItemSize.Large) ||
                                    (item.allowedSizes & RibbonItemSize.Medium)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                                size = (!(item.displayOptions & DisplayMode.Simplified) && (item.displayOptions & DisplayMode.Overflow))
                                    ? RibbonItemSize.Medium : size;
                                var itemEle = void 0;
                                if (!(item.displayOptions & DisplayMode.Classic)) {
                                    itemEle = this.createItems([item], alignType, group.id, group.header, group.enableGroupOverflow, tabIndex, groupContainer)[0];
                                    if (item.displayOptions & DisplayMode.Simplified) {
                                        groupCollection.append(itemEle);
                                    }
                                }
                                else {
                                    itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                    if (item.displayOptions === (DisplayMode.Classic | DisplayMode.Overflow)) {
                                        this.createOverflowPopup(item, tabIndex, group.enableGroupOverflow, group.id, group.header, itemEle, groupContainer);
                                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton) ||
                                            (item.type === RibbonItemType.GroupButton) || (item.type === RibbonItemType.Gallery)) {
                                            this.updatePopupItems(item, itemEle, group.enableGroupOverflow, true);
                                        }
                                    }
                                    if (item.type === RibbonItemType.GroupButton) {
                                        this.ribbonGroupButtonModule.switchGroupButton(item, itemEle);
                                    }
                                    item.setProperties({ activeSize: size }, true);
                                    if (itemEle) {
                                        var ele = itemEle.querySelector('#' + item.id);
                                        this.setItemSize(ele, item);
                                    }
                                }
                                if (item.type === RibbonItemType.Gallery) {
                                    this.ribbonGalleryModule.switchGalleryItems(this.activeLayout, item.id);
                                }
                            }
                        }
                        if (!(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
                            groupEle.classList.add('e-ribbon-emptyCollection');
                        }
                    }
                }
                else {
                    this.element.classList.remove(RIBBON_OVERFLOW);
                    for (var i_6 = 0; i_6 < groupList.length; i_6++) {
                        var group = groupList[parseInt(i_6.toString(), 10)];
                        var alignType = groupList[parseInt(i_6.toString(), 10)].orientation;
                        var groupContainer = tabContent.querySelector('#' + group.id + CONTAINER_ID);
                        var groupContent = groupContainer.querySelector('#' + group.id + CONTENT_ID);
                        var groupHeader = this.createElement('div', {
                            className: RIBBON_GROUP_HEADER,
                            id: group.id + HEADER_ID,
                            innerHTML: group.header
                        });
                        groupContainer.appendChild(groupHeader);
                        if (alignType === 'Row') {
                            groupContent.classList.replace(RIBBON_COLUMN, RIBBON_ROW);
                        }
                        groupContent.classList.add(RIBBON_CONTENT_HEIGHT);
                        for (var j = 0; j < group.collections.length; j++) {
                            var overflowDDB = void 0;
                            var overflowtarget = void 0;
                            if (!group.enableGroupOverflow) {
                                overflowDDB = this.overflowDDB;
                                if (overflowDDB) {
                                    overflowtarget = this.overflowDDB.target;
                                }
                            }
                            else {
                                var overflowDDBEle = groupContainer.querySelector('#' + group.id + GROUPOF_BUTTON_ID);
                                if (overflowDDBEle) {
                                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                                    overflowtarget = overflowDDB.target;
                                }
                            }
                            var collection = group.collections[parseInt(j.toString(), 10)];
                            var groupCollection = groupContainer.querySelector('#' + collection.id);
                            if (alignType === 'Column') {
                                groupCollection.classList.replace(RIBBON_COLUMN, RIBBON_ROW);
                            }
                            for (var k = 0; k < collection.items.length; k++) {
                                var itemList = collection.items;
                                var item = collection.items[parseInt(k.toString(), 10)];
                                var flag = true;
                                while ((flag) && !(item.displayOptions & DisplayMode.Classic)) {
                                    k++;
                                    var itemEle = void 0;
                                    if ((item.displayOptions & DisplayMode.Simplified) || (item.displayOptions & DisplayMode.Overflow)) {
                                        if (item.displayOptions & DisplayMode.Simplified) {
                                            itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                        }
                                        else {
                                            itemEle = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
                                        }
                                        if (itemEle !== null) {
                                            var ele_8 = itemEle.querySelector('#' + item.id);
                                            this.destroyFunction(item, ele_8);
                                            itemEle.remove();
                                        }
                                    }
                                    if (k < itemList.length) {
                                        item = itemList[parseInt(k.toString(), 10)];
                                    }
                                    else {
                                        flag = false;
                                    }
                                }
                                if (!flag) {
                                    break;
                                }
                                if (!(item.displayOptions & (DisplayMode.Simplified | DisplayMode.Overflow))) {
                                    var itemEle = this.createItems([item], alignType, group.id, group.header, group.enableGroupOverflow, tabIndex)[0];
                                    groupCollection.append(itemEle);
                                }
                                else {
                                    var itemEle = groupContainer.querySelector('#' + item.id + CONTAINER_ID);
                                    if (!itemEle && overflowtarget) {
                                        itemEle = overflowtarget.querySelector('#' + item.id + CONTAINER_ID);
                                        if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton) ||
                                            (item.type === RibbonItemType.GroupButton) || (item.type === RibbonItemType.Gallery)) {
                                            this.updatePopupItems(item, itemEle, group.enableGroupOverflow, false);
                                        }
                                        this.removeOverflowEvent(item, itemEle);
                                    }
                                    if (item.type === RibbonItemType.GroupButton) {
                                        this.ribbonGroupButtonModule.switchGroupButton(item, itemEle);
                                    }
                                    if (itemEle) {
                                        groupCollection.append(itemEle);
                                    }
                                }
                                var ele = groupContainer.querySelector('#' + item.id);
                                if (item.type === RibbonItemType.GroupButton) {
                                    ele = groupContainer.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
                                }
                                var itemsize = (item.allowedSizes & RibbonItemSize.Large) ? RibbonItemSize.Large :
                                    (item.allowedSizes & RibbonItemSize.Medium) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                                item.setProperties({ activeSize: itemsize }, true);
                                this.setItemSize(ele, item);
                                if (item.type === RibbonItemType.Gallery) {
                                    this.ribbonGalleryModule.switchGalleryItems(this.activeLayout, item.id);
                                }
                            }
                            if (group.enableGroupOverflow && overflowDDB) {
                                if (overflowtarget.childElementCount === 0 ||
                                    (overflowtarget.childElementCount === 1 && this.isHeaderVisible(overflowtarget, group.id))) {
                                    this.removeOverflowButton(overflowDDB);
                                }
                            }
                        }
                    }
                }
                if (this.selectedTab === tabIndex) {
                    this.checkOverflow(tabIndex, activeContent);
                }
            }
        }
        if (this.activeLayout === 'Classic') {
            this.removeOverflowButton(this.overflowDDB);
            this.overflowDDB = null;
        }
    };
    Ribbon.prototype.createLauncherIcon = function (groupId, groupContainer, tabIndex) {
        var _this = this;
        var launcherIcon = this.createElement('div', {
            className: RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss ? this.launcherIconCss : RIBBON_LAUNCHER_ICON),
            id: groupId + LAUNCHER_ID,
            attrs: { 'tabindex': '0', 'type': 'button', 'aria-label': 'Launcher Icon', 'role': 'button' }
        });
        groupContainer.appendChild(launcherIcon);
        groupContainer.classList.add(RIBBON_LAUNCHER);
        EventHandler.add(launcherIcon, 'click', this.launcherIconClicked.bind(this, groupId), this);
        EventHandler.add(launcherIcon, 'keydown', function (e) {
            if (e.key === 'Enter') {
                _this.launcherIconClicked(groupId);
            }
        }, this);
        var itemProp = getGroup(this.tabs, groupId);
        if (itemProp.group.launcherIconKeyTip) {
            this.addKeyTip(tabIndex, itemProp.group.launcherIconKeyTip, launcherIcon.id, 'launcher');
        }
    };
    Ribbon.prototype.launcherIconClicked = function (id) {
        var eventArgs = { groupId: id };
        this.trigger('launcherIconClick', eventArgs);
    };
    Ribbon.prototype.createGroups = function (groupList, tabIndex) {
        var groupElements = [];
        for (var i = 0; i < groupList.length; i++) {
            var group = groupList[parseInt(i.toString(), 10)];
            var alignType = group.orientation;
            var groupEle = this.createElement('div', {
                className: group.cssClass,
                id: group.id
            });
            groupEle.classList.add(RIBBON_GROUP);
            groupElements.push(groupEle);
            var groupContainer = this.createElement('div', {
                className: group.cssClass,
                id: group.id + CONTAINER_ID
            });
            groupContainer.classList.add(RIBBON_GROUP_CONTAINER);
            groupEle.appendChild(groupContainer);
            var groupContent = this.createElement('div', {
                className: this.activeLayout === 'Simplified' ? RIBBON_GROUP_CONTENT : (RIBBON_GROUP_CONTENT + SPACE + RIBBON_CONTENT_HEIGHT),
                id: group.id + CONTENT_ID
            });
            groupContent.classList.add(((alignType === 'Column') || (this.activeLayout === 'Simplified')) ? RIBBON_COLUMN : RIBBON_ROW);
            groupContainer.appendChild(groupContent);
            if (this.activeLayout === 'Classic') {
                var groupHeader = this.createElement('div', {
                    className: RIBBON_GROUP_HEADER,
                    id: group.id + HEADER_ID,
                    innerHTML: group.header
                });
                groupContainer.appendChild(groupHeader);
            }
            if (group.showLauncherIcon) {
                this.createLauncherIcon(group.id, groupContainer, tabIndex);
            }
            var elements = this.createCollection(group.collections, group.orientation, group.id, group.header, group.enableGroupOverflow, tabIndex, groupContainer);
            append(elements, groupContent);
            var isItemsHidden = true;
            for (var j = 0; j < elements.length; j++) {
                if (isItemsHidden) {
                    for (var k = 0; k < elements[parseInt(j.toString(), 10)].children.length; k++) {
                        if (!(elements[parseInt(j.toString(), 10)].children[parseInt(k.toString(), 10)].classList.contains('e-hidden'))) {
                            isItemsHidden = false;
                            break;
                        }
                    }
                }
            }
            if (isItemsHidden) {
                groupEle.classList.add('e-hide-group');
            }
            if ((this.activeLayout === 'Simplified') && !(group.enableGroupOverflow || groupEle.querySelector('.' + RIBBON_ITEM))) {
                groupEle.classList.add('e-ribbon-emptyCollection');
            }
            var initialProps = this.initialPropsData[parseInt(tabIndex.toString(), 10)];
            if (initialProps) {
                if (initialProps.hiddenGroups && initialProps.hiddenGroups.length) {
                    this.updateGroupProps('hiddenGroups', initialProps, groupEle);
                }
                if (initialProps.disabledGroups && initialProps.disabledGroups.length) {
                    this.updateGroupProps('disabledGroups', initialProps, groupEle);
                }
            }
        }
        if (this.initialPropsData[parseInt(tabIndex.toString(), 10)]) {
            delete this.initialPropsData[parseInt(tabIndex.toString(), 10)];
        }
        return groupElements;
    };
    Ribbon.prototype.updateGroupProps = function (key, initialProps, groupEle) {
        // eslint-disable-next-line
        var groupIndex = initialProps[key].indexOf(groupEle.id);
        if (groupIndex !== -1) {
            if (key === 'hiddenGroups') {
                groupEle.classList.add('e-hidden');
            }
            else {
                groupEle.classList.add('e-disabled');
            }
        }
    };
    Ribbon.prototype.validateItemSize = function () {
        for (var k = 0; k < this.tabs.length; k++) {
            var groupList = this.tabs[parseInt(k.toString(), 10)].groups;
            for (var l = 0; l < groupList.length; l++) {
                var collectionList = groupList[parseInt(l.toString(), 10)].collections;
                var alignType = groupList[parseInt(l.toString(), 10)].orientation;
                for (var i = 0; i < collectionList.length; i++) {
                    var items = collectionList[parseInt(i.toString(), 10)].items;
                    for (var j = 0; j < items.length; j++) {
                        var ribbonitem = items[parseInt(j.toString(), 10)];
                        if (!ribbonitem.allowedSizes || (ribbonitem.allowedSizes === 0)) {
                            ribbonitem.setProperties({
                                allowedSizes: (RibbonItemSize.Small | RibbonItemSize.Medium | RibbonItemSize.Large)
                            }, true);
                        }
                        if ((ribbonitem.type === 'ColorPicker') && (ribbonitem.allowedSizes !== RibbonItemSize.Small)) {
                            ribbonitem.setProperties({ allowedSizes: RibbonItemSize.Small }, true);
                        }
                        else if ((ribbonitem.type === 'ComboBox' || ribbonitem.type === 'CheckBox') &&
                            (ribbonitem.allowedSizes !== RibbonItemSize.Medium)) {
                            ribbonitem.setProperties({ allowedSizes: RibbonItemSize.Medium }, true);
                        }
                        else if (((alignType === 'Column') && (items.length > 1)) || ((alignType === 'Row') && (collectionList.length > 1))) {
                            if (ribbonitem.allowedSizes & RibbonItemSize.Large) {
                                // To remove large size, perform 'and' with 011(3).
                                var sizeVal = ribbonitem.allowedSizes & (RibbonItemSize.Small | RibbonItemSize.Medium);
                                sizeVal = sizeVal ? sizeVal : RibbonItemSize.Medium;
                                ribbonitem.setProperties({ allowedSizes: sizeVal }, true);
                            }
                        }
                        var itemsize = (ribbonitem.allowedSizes & RibbonItemSize.Large) ? RibbonItemSize.Large :
                            (ribbonitem.allowedSizes & RibbonItemSize.Medium) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                        ribbonitem.setProperties({ activeSize: itemsize }, true);
                    }
                }
            }
        }
    };
    Ribbon.prototype.createCollection = function (collectionList, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer) {
        var collectionElements = [];
        for (var i = 0; i < collectionList.length; i++) {
            var collection = collectionList[parseInt(i.toString(), 10)];
            var collectionEle = this.createElement('div', {
                className: collection.cssClass,
                id: collection.id
            });
            collectionEle.classList.add(RIBBON_COLLECTION);
            collectionEle.classList.add(((alignType !== 'Column') || (this.activeLayout === 'Simplified')) ?
                RIBBON_COLUMN : RIBBON_ROW);
            collectionElements.push(collectionEle);
            var elements = this.createItems(collection.items, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer);
            append(elements, collectionEle);
            if ((alignType === 'Row') && (i === 2)) {
                break;
            }
        }
        return collectionElements;
    };
    Ribbon.prototype.createRibbonItem = function (item, itemEle) {
        switch (item.type) {
            case 'Button':
                this.ribbonButtonModule.createButton(item, itemEle);
                break;
            case 'DropDown':
                this.ribbonDropDownModule.createDropDown(item, itemEle);
                break;
            case 'SplitButton':
                this.ribbonSplitButtonModule.createSplitButton(item, itemEle);
                break;
            case 'CheckBox':
                this.ribbonCheckBoxModule.createCheckBox(item, itemEle);
                break;
            case 'ColorPicker':
                this.ribbonColorPickerModule.createColorPicker(item, itemEle);
                break;
            case 'ComboBox':
                this.ribbonComboBoxModule.createComboBox(item, itemEle);
                break;
            case 'Template':
                this.createTemplateContent(item, itemEle);
                break;
            case 'GroupButton':
                this.ribbonGroupButtonModule.createGroupButton(item, itemEle);
                break;
            case 'Gallery':
                this.ribbonGalleryModule.createGallery(item, itemEle);
                break;
        }
    };
    Ribbon.prototype.createItems = function (itemList, alignType, groupId, groupHeader, isGroupOF, tabIndex, groupContainer) {
        var _a;
        var itemElements = [];
        for (var i = 0; i < itemList.length; i++) {
            var item = itemList[parseInt(i.toString(), 10)];
            //To stop rendering of items with simplified mode position type as none
            var flag = true;
            while (flag &&
                (((this.activeLayout === 'Simplified') && !(item.displayOptions & (DisplayMode.Simplified | DisplayMode.Overflow))) ||
                    ((this.activeLayout === 'Classic') && !(item.displayOptions & DisplayMode.Classic)))) {
                i++;
                if (i < itemList.length) {
                    item = itemList[parseInt(i.toString(), 10)];
                }
                else {
                    flag = false;
                }
            }
            if (!flag) {
                break;
            }
            var itemEle = this.createElement('div', {
                className: item.cssClass,
                id: item.id + CONTAINER_ID
            });
            (_a = itemEle.classList).add.apply(_a, [RIBBON_ITEM].concat((item.disabled ? [DISABLED_CSS] : [])));
            // To avoid undefined items condition is added
            if (item.ribbonTooltipSettings && isTooltipPresent(item.ribbonTooltipSettings)) {
                itemEle.classList.add(RIBBON_TOOLTIP_TARGET);
                this.tooltipData.push({ id: itemEle.id, data: item.ribbonTooltipSettings });
            }
            if (item.type === RibbonItemType.GroupButton) {
                for (var i_7 = 0; i_7 < item.groupButtonSettings.items.length; i_7++) {
                    if (this.keyTipElements[parseInt(tabIndex.toString(), 10)] &&
                        item.groupButtonSettings.items[parseInt(i_7.toString(), 10)].keyTip) {
                        this.addKeyTip(tabIndex, item.groupButtonSettings.items[parseInt(i_7.toString(), 10)].keyTip, item.id + (RIBBON_GROUP_BUTTON_ID + i_7), 'item');
                    }
                }
            }
            if (item.keyTip) {
                if (item.type === RibbonItemType.Gallery) {
                    this.addKeyTip(tabIndex, item.keyTip, (item.id + '_popupButton'), 'item');
                }
                else {
                    this.addKeyTip(tabIndex, item.keyTip, item.id, 'item');
                }
            }
            var size = item.activeSize;
            if (!(item.type === RibbonItemType.Gallery)) {
                if (this.activeLayout === 'Simplified') {
                    size = ((item.allowedSizes === RibbonItemSize.Large) || (item.allowedSizes & RibbonItemSize.Medium) ||
                        (item.displayOptions === DisplayMode.Overflow)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                    item.setProperties({ activeSize: size }, true);
                }
                if (size & RibbonItemSize.Large) {
                    itemEle.classList.add(RIBBON_LARGE_ITEM, RIBBON_CONTENT_HEIGHT);
                }
                else {
                    itemEle.classList.add((size & RibbonItemSize.Medium) ? RIBBON_MEDIUM_ITEM : RIBBON_SMALL_ITEM);
                }
            }
            var initialProps = this.initialPropsData[parseInt(tabIndex.toString(), 10)];
            if (initialProps && initialProps.hiddenItems && initialProps.hiddenItems.length) {
                var itemIndex = initialProps.hiddenItems.indexOf(item.id);
                if (itemIndex !== -1) {
                    itemEle.classList.add('e-hidden');
                }
            }
            this.createRibbonItem(item, itemEle);
            if ((this.activeLayout === 'Simplified') && ((item.displayOptions === DisplayMode.Overflow) || (item.displayOptions === (DisplayMode.Classic | DisplayMode.Overflow)))) {
                this.createOverflowPopup(item, tabIndex, isGroupOF, groupId, groupHeader, itemEle, groupContainer);
                if ((item.type === RibbonItemType.DropDown) || (item.type === RibbonItemType.SplitButton) ||
                    (item.type === RibbonItemType.GroupButton) || (item.type === RibbonItemType.Gallery)) {
                    this.updatePopupItems(item, itemEle, isGroupOF, true);
                }
            }
            else {
                // For normal mode and Simplified mode position type as Group and Auto
                itemElements.push(itemEle);
            }
            if ((alignType === 'Column') && (i === 2)) {
                break;
            }
        }
        return itemElements;
    };
    Ribbon.prototype.createHelpPaneTemplate = function () {
        if (this.helpPaneTemplate) {
            var templateName = 'helpPaneTemplate';
            this.clearTemplate([templateName]);
            this.ribbonTempEle = this.createElement('div', {
                className: RIBBON_HELP_TEMPLATE,
                id: this.element.id + RIBBON_HELP_PANE_TEMPLATE_ID
            });
            var templateFunction = getTemplateFunction(this.helpPaneTemplate);
            append(templateFunction({}, this, templateName, 'helpPaneTemplate', this.isStringTemplate), this.ribbonTempEle);
            var tabEle = this.tabObj.element;
            var toolbarEle = tabEle.querySelector('.e-toolbar');
            toolbarEle.after(this.ribbonTempEle);
            tabEle.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, this.ribbonTempEle.offsetWidth + 'px');
            this.renderReactTemplates();
        }
    };
    Ribbon.prototype.createTemplateContent = function (item, itemElement) {
        var itemEle = this.createElement('div', {
            className: item.cssClass ? (RIBBON_TEMPLATE + SPACE + item.cssClass) : RIBBON_TEMPLATE,
            id: item.id,
            attrs: { 'tabindex': '-1' }
        });
        if (item.disabled) {
            itemEle.classList.add(DISABLED_CSS);
            itemEle.setAttribute('disabled', '');
        }
        itemElement.appendChild(itemEle);
        this.renderItemTemplate(item, itemEle);
    };
    Ribbon.prototype.renderItemTemplate = function (item, itemElement) {
        var templateName = 'ribbon' + item.id + 'itemTemplate';
        this.clearTemplate([templateName]);
        var templateFunction = getTemplateFunction(item.itemTemplate);
        append(templateFunction({ activeSize: RibbonItemSize[item.activeSize] }, this, templateName, (item.id + 'itemTemplate'), this.isStringTemplate), itemElement);
        this.renderReactTemplates();
    };
    Ribbon.prototype.checkID = function (list, type, initId) {
        var key = type === 'tab' ? TAB_ID : type === 'group' ? GROUP_ID :
            type === 'collection' ? COLLECTION_ID : ITEM_ID;
        for (var i = 0; i < list.length; i++) {
            var listitem = list[parseInt(i.toString(), 10)];
            if (!listitem.id) {
                var htmlAttrID = void 0;
                if (type === 'item') {
                    htmlAttrID = this.hasHtmlAtrrID(listitem);
                }
                listitem.setProperties({ id: htmlAttrID ? htmlAttrID : initId + key + (this.idIndex++) }, true);
            }
            switch (type) {
                case 'tab':
                    listitem.setProperties({ groups: this.checkID(listitem.groups, 'group', listitem.id) }, true);
                    break;
                case 'group':
                    listitem.setProperties({ collections: this.checkID(listitem.collections, 'collection', listitem.id) }, true);
                    break;
                case 'collection':
                    listitem.setProperties({ items: this.checkID(listitem.items, 'item', listitem.id) }, true);
                    break;
            }
        }
        return list;
    };
    Ribbon.prototype.hasHtmlAtrrID = function (listItem) {
        var id = '';
        if (listItem.buttonSettings.htmlAttributes.id) {
            id = listItem.buttonSettings.htmlAttributes.id;
        }
        else if (listItem.checkBoxSettings.htmlAttributes.id) {
            id = listItem.checkBoxSettings.htmlAttributes.id;
        }
        else if (listItem.colorPickerSettings.htmlAttributes.id) {
            id = listItem.colorPickerSettings.htmlAttributes.id;
        }
        else if (listItem.comboBoxSettings.htmlAttributes.id) {
            id = listItem.comboBoxSettings.htmlAttributes.id;
        }
        else if (listItem.dropDownSettings.htmlAttributes.id) {
            id = listItem.dropDownSettings.htmlAttributes.id;
        }
        else if (listItem.splitButtonSettings.htmlAttributes.id) {
            id = listItem.splitButtonSettings.htmlAttributes.id;
        }
        return id;
    };
    Ribbon.prototype.updateCommonProperty = function (commonProp) {
        this.tabObj.setProperties(commonProp);
        if (this.ribbonFileMenuModule) {
            this.ribbonFileMenuModule.setCommonProperties(commonProp);
        }
        if (this.ribbonBackstageModule) {
            this.ribbonBackstageModule.setCommonProperties(commonProp);
        }
        for (var i = 0; i < this.tabs.length; i++) {
            var tab = this.tabs[parseInt(i.toString(), 10)];
            var contentEle = this.tabObj.items[parseInt(i.toString(), 10)].content;
            if (contentEle.querySelector('.' + RIBBON_GROUP)) {
                for (var _i = 0, _a = tab.groups; _i < _a.length; _i++) {
                    var group = _a[_i];
                    var dropdownElement = void 0;
                    var dropdown = void 0;
                    if (this.activeLayout === RibbonLayout.Classic) {
                        dropdownElement = group.isCollapsed ?
                            contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                    }
                    else {
                        dropdownElement = group.enableGroupOverflow ?
                            contentEle.querySelector('#' + group.id + GROUPOF_BUTTON_ID) : null;
                        dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
                        if (dropdown) {
                            updateTooltipProp(dropdown.target, commonProp);
                            dropdown.setProperties(commonProp);
                        }
                    }
                    for (var _b = 0, _c = group.collections; _b < _c.length; _b++) {
                        var collection = _c[_b];
                        for (var _d = 0, _e = collection.items; _d < _e.length; _d++) {
                            var item = _e[_d];
                            var ele = null;
                            if (this.activeLayout === RibbonLayout.Classic) {
                                if (item.displayOptions & DisplayMode.Classic) {
                                    ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : item.type === RibbonItemType.GroupButton ? contentEle.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID) : contentEle.querySelector('#' + item.id);
                                }
                            }
                            else {
                                //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
                                ele = (item.displayOptions & DisplayMode.Simplified) ? contentEle.querySelector('#' + item.id) : null;
                                // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
                                if (!ele) {
                                    ele = dropdown.target.querySelector('#' + item.id);
                                    if (item.type === 'DropDown') {
                                        this.updatePopupItems(item, dropdown.target, group.enableGroupOverflow, true);
                                    }
                                }
                            }
                            if (ele) {
                                var moduleName = this.getItemModuleName(item);
                                if (moduleName !== 'template') {
                                    if (moduleName === 'group-btn' && this.activeLayout === 'Classic') {
                                        for (var i_8 = 0; i_8 < item.groupButtonSettings.items.length; i_8++) {
                                            var btnEle = ele.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i_8);
                                            updateCommonProperty(btnEle, 'btn', commonProp);
                                        }
                                    }
                                    else if (moduleName === 'group-btn' && this.activeLayout === 'Simplified') {
                                        updateCommonProperty(ele, 'dropdown-btn', commonProp);
                                        for (var i_9 = 0; i_9 < item.groupButtonSettings.items.length; i_9++) {
                                            var btnEle = document.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i_9);
                                            updateCommonProperty(btnEle, 'btn', commonProp);
                                        }
                                    }
                                    else {
                                        updateCommonProperty(ele, moduleName, commonProp);
                                    }
                                }
                                else if (!isNullOrUndefined(commonProp.enableRtl)) {
                                    ele.classList.toggle(RTL_CSS, commonProp.enableRtl);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Ribbon.prototype.removeLauncherIcon = function (groupId, dropdownElement, contentEle) {
        var containerId = groupId + CONTAINER_ID;
        var containerEle = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, containerId) : contentEle.querySelector('#' + containerId);
        if (containerEle) {
            containerEle.classList.remove(RIBBON_LAUNCHER);
            var launcherIcon = containerEle.querySelector('#' + groupId + LAUNCHER_ID);
            remove(launcherIcon);
        }
    };
    Ribbon.prototype.destroyTabItems = function (tabs) {
        for (var i = 0; i < tabs.length; i++) {
            var tab = tabs[parseInt(i.toString(), 10)];
            var contentEle = this.tabObj.items[parseInt(i.toString(), 10)].content;
            for (var _i = 0, _a = tab.groups; _i < _a.length; _i++) {
                var group = _a[_i];
                var dropdownElement = void 0;
                var dropdown = void 0;
                if (this.activeLayout === RibbonLayout.Classic) {
                    dropdownElement = group.isCollapsed ?
                        contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                    if (group.showLauncherIcon) {
                        this.removeLauncherIcon(group.id, dropdownElement, contentEle);
                    }
                }
                else {
                    dropdownElement = group.enableGroupOverflow ?
                        contentEle.querySelector('#' + group.id + GROUPOF_BUTTON_ID) : null;
                    dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
                }
                for (var _b = 0, _c = group.collections; _b < _c.length; _b++) {
                    var collection = _c[_b];
                    for (var _d = 0, _e = collection.items; _d < _e.length; _d++) {
                        var item = _e[_d];
                        var ele = void 0;
                        if (this.activeLayout === RibbonLayout.Classic) {
                            if (item.displayOptions & DisplayMode.Classic) {
                                ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) :
                                    contentEle.querySelector('#' + item.id);
                                if (item.type === RibbonItemType.GroupButton) {
                                    ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id +
                                        RIBBON_GROUP_BUTTON_ID) : contentEle.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
                                }
                                if (item.type === RibbonItemType.Gallery) {
                                    ele = contentEle.querySelector('#' + item.id + CONTAINER_ID);
                                }
                            }
                        }
                        else {
                            //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
                            ele = (item.displayOptions & DisplayMode.Simplified) ?
                                contentEle.querySelector('#' + item.id) : null;
                            if (item.type === RibbonItemType.Gallery) {
                                ele = (item.displayOptions & DisplayMode.Simplified) ? contentEle.querySelector('#' + item.id + CONTAINER_ID) : null;
                            }
                            // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
                            if (!ele) {
                                ele = dropdown ? dropdown.target.querySelector('#' + item.id) : null;
                            }
                        }
                        if (ele) {
                            this.destroyFunction(item, ele);
                        }
                    }
                }
                if ((this.activeLayout === RibbonLayout.Classic) && dropdownElement) {
                    this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                }
                else if ((this.activeLayout === RibbonLayout.Simplified) && group.enableGroupOverflow && dropdownElement) {
                    this.removeOverflowButton(dropdown);
                }
            }
        }
        if (this.overflowDDB) {
            this.removeOverflowButton(this.overflowDDB);
            this.overflowDDB = null;
        }
    };
    Ribbon.prototype.destroyFunction = function (item, ele) {
        var moduleName = this.getItemModuleName(item);
        if (moduleName === 'colorpicker') {
            this.ribbonColorPickerModule.unwireColorPickerEvents(ele);
        }
        else if (moduleName === 'group-btn') {
            if (this.activeLayout === 'Classic') {
                for (var i = 0; i < item.groupButtonSettings.items.length; i++) {
                    var btnEle = ele.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID + i);
                    if (btnEle) {
                        destroyControl(btnEle, 'btn');
                    }
                }
            }
            else {
                this.ribbonGroupButtonModule.destroyDropDown(item);
            }
            var _loop_4 = function (i) {
                if (item.groupButtonSettings.items[parseInt(i.toString(), 10)].ribbonTooltipSettings) {
                    var groupButtonID_1 = item.id + RIBBON_GROUP_BUTTON_ID + i;
                    var index = getIndex(this_4.tooltipData, function (e) { return e.id === groupButtonID_1; });
                    if (index !== -1) {
                        this_4.tooltipData.splice(index, 1);
                    }
                }
            };
            var this_4 = this;
            for (var i = 0; i < item.groupButtonSettings.items.length; i++) {
                _loop_4(i);
            }
        }
        else if (moduleName === 'gallery') {
            if (ele.closest('.e-ribbon-overflow-target')) {
                destroyControl(ele, 'dropdown-btn');
                var galleryPopupEle = Array.prototype.slice.call(document.querySelectorAll('#' + item.id + '_galleryPopup'));
                galleryPopupEle.concat(Array.prototype.slice.call(document.querySelectorAll('#' + item.id + '-popup')));
                for (var i = 0; i < galleryPopupEle.length; i++) {
                    galleryPopupEle[parseInt(i.toString(), 10)].remove();
                }
                var galleryPopupBtn = document.querySelector('#' + item.id + '_popupButton');
                if (galleryPopupBtn) {
                    galleryPopupBtn.remove();
                }
                var galleryWrapper = document.querySelector('#' + item.id + '_galleryWrapper');
                if (galleryWrapper) {
                    galleryWrapper.remove();
                }
            }
            else {
                var galleryEle = ele.querySelectorAll('.e-ribbon-gallery-item');
                var galleryPopupBtn = ele.parentElement.querySelector('#' + item.id + '_popupButton');
                if (galleryPopupBtn) {
                    galleryPopupBtn.remove();
                }
                for (var i = 0; i < galleryEle.length; i++) {
                    galleryEle[parseInt(i.toString(), 10)].remove();
                }
                var galleryPopupEle = document.querySelectorAll('#' + item.id + '_galleryPopup');
                for (var i = 0; i < galleryPopupEle.length; i++) {
                    galleryPopupEle[parseInt(i.toString(), 10)].remove();
                }
            }
        }
        else if (moduleName !== 'template') {
            destroyControl(ele, moduleName);
        }
        if (item.ribbonTooltipSettings) {
            var index = getIndex(this.tooltipData, function (e) { return e.id === item.id + CONTAINER_ID; });
            if (index !== -1) {
                this.tooltipData.splice(index, 1);
            }
        }
        if (item.type === 'GroupButton') {
            this.ribbonGroupButtonModule.destroyDropDown(item);
        }
    };
    /**
     * Gets the item module name.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     * @hidden
     */
    Ribbon.prototype.getItemModuleName = function (item) {
        switch (item.type) {
            case 'Button':
                return 'btn';
            case 'DropDown':
                return 'dropdown-btn';
            case 'SplitButton':
                return 'split-btn';
            case 'CheckBox':
                return 'checkbox';
            case 'ColorPicker':
                return 'colorpicker';
            case 'ComboBox':
                return 'combobox';
            case 'GroupButton':
                return 'group-btn';
            case 'Gallery':
                return 'gallery';
            default:
                return 'template';
        }
    };
    Ribbon.prototype.clearOverflowResize = function () {
        this.destroyScroll();
        this.clearOverflowDropDown(this.selectedTab);
        var tab = this.tabs[this.selectedTab];
        var activeContent = this.tabObj.element.querySelector('#' + this.tabs[this.selectedTab].id + CONTENT_ID);
        var tabContent = activeContent.closest('.' + TAB_CONTENT);
        for (var j = 0; (j < tab.groups.length); j++) {
            this.checkSmallToMedium(this.selectedTab, tab, j, tabContent, activeContent, true, true);
            this.checkMediumToLarge(this.selectedTab, tab, j, tabContent, activeContent, true, true);
        }
    };
    /**
     * Refreshes the layout.
     *
     * @returns {void}
     */
    Ribbon.prototype.refreshLayout = function () {
        this.resizeHandler();
    };
    /**
     * Selects the tab
     *
     * @param  {string} tabId - Gets the tab ID
     * @returns {void}
     */
    Ribbon.prototype.selectTab = function (tabId) {
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        this.setProperties({ selectedTab: index });
    };
    /**
     * Shows a specific tab in the ribbon.
     *
     * @param {string} tabId - The ID of the tab to be shown.
     * @param {boolean} isContextual - The boolean if the rendering is contextual.
     * @returns {void}
     */
    Ribbon.prototype.showTab = function (tabId, isContextual) {
        if (isContextual === void 0) { isContextual = false; }
        this.showHideTab(tabId, false, isContextual);
    };
    /**
     * Hides a specific tab in the ribbon.
     *
     * @param {string} tabId - The ID of the tab to be hidden.
     * @param {boolean} isContextual - The boolean if the rendering is contextual.
     * @returns {void}
     */
    Ribbon.prototype.hideTab = function (tabId, isContextual) {
        if (isContextual === void 0) { isContextual = false; }
        this.showHideTab(tabId, true, isContextual);
    };
    Ribbon.prototype.showHideTab = function (tabId, value, isContextual) {
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        this.tabObj.hideTab(index, value);
        if (isContextual) {
            var contextualTab_1;
            var tabEle = this.tabObj.element;
            for (var i = 0; i < this.contextualTabs.length; i++) {
                for (var j = 0; j < this.contextualTabs[parseInt(i.toString(), 10)].tabs.length; j++) {
                    if (tabId === this.contextualTabs[parseInt(i.toString(), 10)].tabs[parseInt(j.toString(), 10)].id) {
                        contextualTab_1 = this.contextualTabs[parseInt(i.toString(), 10)];
                    }
                }
            }
            if (contextualTab_1) {
                var isTabHidden = true;
                var _loop_5 = function (i) {
                    var index_1 = getIndex(this_5.tabs, function (e) {
                        return e.id === contextualTab_1.tabs[parseInt(i.toString(), 10)].id;
                    });
                    if (index_1 !== -1) {
                        var toolbarEle = tabEle.querySelectorAll('.e-toolbar-item')[parseInt(index_1.toString(), 10)];
                        if (!(toolbarEle.classList.contains('e-hidden'))) {
                            isTabHidden = false;
                        }
                    }
                };
                var this_5 = this;
                for (var i = 0; i < contextualTab_1.tabs.length; i++) {
                    _loop_5(i);
                }
                if (isTabHidden) {
                    contextualTab_1.setProperties({ visible: false }, true);
                }
                else {
                    contextualTab_1.setProperties({ visible: true }, true);
                }
            }
        }
    };
    /**
     * Enables a specific tab in the ribbon.
     *
     * @param {string} tabId - The ID of the tab to be enabled.
     * @returns {void}
     */
    Ribbon.prototype.enableTab = function (tabId) {
        this.enableDisableTab(tabId, true);
    };
    /**
     * Disables a specific tab in the ribbon.
     *
     * @param {string} tabId - The ID of the tab to be disabled.
     * @returns {void}
     */
    Ribbon.prototype.disableTab = function (tabId) {
        this.enableDisableTab(tabId, false);
    };
    Ribbon.prototype.enableDisableTab = function (tabId, value) {
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        var tbItems = this.tabObj.items[parseInt(index.toString(), 10)].content;
        this.tabObj.element.querySelector('#' + tabId + HEADER_ID).classList[value ? 'remove' : 'add']('e-disabled');
        tbItems.classList[value ? 'remove' : 'add']('e-disabled');
        this.tabObj.enableTab(index, value);
    };
    /**
     * Adds the ribbon tab.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model
     * @param {string} targetId  - Gets the ID of the target tab to add the new tab.
     * @param {boolean} isAfter - Defines whether the tab is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addTab = function (tab, targetId, isAfter) {
        var index = targetId ? getIndex(this.tabs, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? this.tabs.length : (index + (isAfter ? 1 : 0));
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal.splice(index, 0, tab);
        this.setProperties({ tabs: this.tabsInternal }, true);
        this.checkID([this.tabs[parseInt(index.toString(), 10)]], 'tab', this.element.id);
        this.tabsInternal = this.tabs.slice();
        this.validateItemSize();
        var tabItem = this.createTabItems([tab]);
        this.tabObj.addTab(tabItem, index);
    };
    /**
     * Removes the ribbon tab.
     *
     * @param {string} tabId - Gets the tab ID
     * @returns {void}
     */
    Ribbon.prototype.removeTab = function (tabId) {
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        var contentEle = this.tabObj.items[parseInt(index.toString(), 10)].content;
        var groups = this.tabs[parseInt(index.toString(), 10)].groups;
        if (groups && (contentEle.innerHTML !== '')) {
            for (var _i = 0, groups_2 = groups; _i < groups_2.length; _i++) {
                var group = groups_2[_i];
                var dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                for (var _a = 0, _b = group.collections; _a < _b.length; _a++) {
                    var collection = _b[_a];
                    for (var _c = 0, _d = collection.items; _c < _d.length; _c++) {
                        var item = _d[_c];
                        var ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
                        if (item.type === RibbonItemType.GroupButton && this.activeLayout === 'Classic') {
                            ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id +
                                RIBBON_GROUP_BUTTON_ID) : contentEle.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
                        }
                        if (ele) {
                            this.destroyFunction(item, ele);
                        }
                    }
                }
                if (dropdownElement) {
                    this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                }
            }
        }
        if (index === this.selectedTab) {
            this.isAddRemove = true;
        }
        this.tabsInternal = this.tabs.slice();
        this.tabsInternal.splice(index, 1);
        this.setProperties({ tabs: this.tabsInternal }, true);
        this.tabObj.removeTab(index);
    };
    /**
     * Adds the ribbon group.
     *
     * @param {string} tabId - Gets the tab ID.
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @param {string} targetId - Gets the ID of the target group to add the new group.
     * @param {boolean} isAfter - Defines whether the group is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addGroup = function (tabId, group, targetId, isAfter) {
        var tabIndex = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (tabIndex === -1) {
            return;
        }
        if (this.selectedTab === tabIndex) {
            this.clearOverflowResize();
        }
        var tab = this.tabs[parseInt(tabIndex.toString(), 10)];
        var ribbonGroups = tab.groups.slice();
        var index = targetId ? getIndex(ribbonGroups, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonGroups.length : (index + (isAfter ? 1 : 0));
        ribbonGroups.splice(index, 0, group);
        tab.setProperties({ groups: ribbonGroups }, true);
        this.checkID([tab.groups[parseInt(index.toString(), 10)]], 'group', tabId);
        this.validateItemSize();
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
        if (contentEle.innerHTML !== '') {
            var element = this.createGroups([tab.groups[parseInt(index.toString(), 10)]], tabIndex)[0];
            //insert the element in tab items property.
            var targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
            }
            else {
                contentEle.append(element);
            }
        }
        if (this.selectedTab === tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Removes the ribbon group.
     *
     * @param {string} groupId -Gets the group ID.
     * @returns {void}
     */
    Ribbon.prototype.removeGroup = function (groupId) {
        var itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (itemProp.group.showLauncherIcon) {
                this.removeLauncherIcon(itemProp.group.id, null, contentEle);
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            for (var _i = 0, _a = itemProp.group.collections; _i < _a.length; _i++) {
                var collection = _a[_i];
                for (var _b = 0, _c = collection.items; _b < _c.length; _b++) {
                    var item = _c[_b];
                    this.removeItemElement(contentEle, item, dropdown);
                }
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                if (itemProp.group.enableGroupOverflow) {
                    if (dropdown.target.childElementCount === 0 || (dropdown.target.childElementCount
                        === 1 && this.isHeaderVisible(dropdown.target, itemProp.group.id))) {
                        this.removeOverflowButton(dropdown);
                    }
                }
                else {
                    var ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                    }
                }
            }
            var groupEle = contentEle.querySelector('#' + groupId);
            if (groupEle) {
                groupEle.remove();
            }
        }
        var ribbonGroups = this.tabs[itemProp.tabIndex].groups.slice();
        ribbonGroups.splice(itemProp.groupIndex, 1);
        this.tabs[itemProp.tabIndex].setProperties({ groups: ribbonGroups }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    Ribbon.prototype.isHeaderVisible = function (headerEle, groupID) {
        return headerEle.querySelector('#' + groupID + GROUPOF_BUTTON_ID + HEADER_ID) ? true : false;
    };
    /**
     * Hides a specific group within a ribbon tab.
     *
     * @param {string} groupID - The ID of the group to be hidden.
     * @returns {void}
     */
    Ribbon.prototype.hideGroup = function (groupID) {
        this.showHideGroup(groupID, true);
    };
    /**
     * Shows a specific group within a ribbon tab.
     *
     * @param {string} groupID - The ID of the group to be shown.
     * @returns {void}
     */
    Ribbon.prototype.showGroup = function (groupID) {
        this.showHideGroup(groupID, false);
    };
    Ribbon.prototype.showHideGroup = function (groupID, isHidden) {
        var overflowDDB;
        var overflowtarget;
        var itemProp = getGroup(this.tabs, groupID);
        if (!itemProp) {
            return;
        }
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupEle = contentEle.querySelector('#' + groupID);
        if (groupEle) {
            this.updateHiddenElements(itemProp.tabIndex, isHidden ? 'hideGroup' : 'showGroup', groupID, isHidden, groupEle);
        }
        else {
            this.updateInitialProps(itemProp.tabIndex, groupID, 'hiddenGroups', isHidden);
        }
        if (this.overflowDDB) {
            var overflowEle = this.overflowDDB.target;
            var ofTabContainer = overflowEle.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
            if (itemProp.group.enableGroupOverflow) {
                var overflowDDBEle = contentEle.querySelector('#' + groupID + GROUPOF_BUTTON_ID);
                if (overflowDDBEle) {
                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                    overflowtarget = overflowDDB.target;
                }
                if (overflowtarget) {
                    if (isHidden) {
                        overflowtarget.classList.add('e-hidden');
                    }
                    else {
                        overflowtarget.classList.remove('e-hidden');
                    }
                }
            }
            else if (ofTabContainer) {
                var grpContainer = ofTabContainer.querySelector('#' + groupID + CONTAINER_ID);
                if (grpContainer) {
                    if (isHidden) {
                        grpContainer.classList.add('e-hidden');
                    }
                    else {
                        grpContainer.classList.remove('e-hidden');
                    }
                }
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    Ribbon.prototype.updateHiddenElements = function (tabIndex, key, id, isHidden, element, group) {
        if (isHidden) {
            if (!(element.classList.contains('e-hidden'))) {
                this.checkHiddenElements(key, id, tabIndex);
                element.classList.add('e-hidden');
                if (key === 'hideItem') {
                    this.checkHiddenItems(group, isHidden, tabIndex);
                }
                this.calculateHiddenElementsWidth(tabIndex);
            }
        }
        else {
            if (element.classList.contains('e-hidden')) {
                this.checkHiddenElements(key, id, tabIndex);
                element.classList.remove('e-hidden');
                this.calculateHiddenElementsWidth(tabIndex);
                if (key === 'showItem') {
                    this.checkHiddenItems(group, isHidden, tabIndex);
                }
            }
        }
    };
    Ribbon.prototype.checkHiddenElements = function (key, id, tabIndex) {
        if (this.activeLayout === 'Simplified') {
            var hiddenProps = this.hiddenElements[parseInt(tabIndex.toString(), 10)];
            if (!hiddenProps) {
                this.hiddenElements[parseInt(tabIndex.toString(), 10)] = {};
                hiddenProps = this.hiddenElements[parseInt(tabIndex.toString(), 10)];
            }
            if (hiddenProps) {
                if (!hiddenProps["" + key]) {
                    hiddenProps["" + key] = [];
                }
                if (hiddenProps["" + key].length) {
                    var index = hiddenProps["" + key].indexOf(id);
                    if (index === -1) {
                        hiddenProps["" + key].push(id);
                    }
                }
                else {
                    hiddenProps["" + key].push(id);
                }
            }
        }
    };
    Ribbon.prototype.updateItemsSimplifiedWidth = function (tabIndex, key) {
        var hiddenProps = this.hiddenElements[parseInt(tabIndex.toString(), 10)];
        if (hiddenProps && hiddenProps["" + key] && hiddenProps["" + key].length) {
            var _loop_6 = function (i) {
                var contentEle = this_6.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
                var hiddenEle;
                var groupEle = void 0;
                var isGroupHidden = false;
                var widthDifference = 0;
                if (key === 'hideGroup' || key === 'showGroup') {
                    hiddenEle = contentEle.querySelector('#' + hiddenProps["" + key][parseInt(i.toString(), 10)]);
                }
                else {
                    hiddenEle = contentEle.querySelector('#' + hiddenProps["" + key][parseInt(i.toString(), 10)] + CONTAINER_ID);
                }
                if (hiddenEle) {
                    if (key === 'hideGroup' || key === 'hideItem') {
                        var isHidden = false;
                        if (hiddenEle.classList.contains('e-hidden')) {
                            isHidden = true;
                            hiddenEle.classList.remove('e-hidden');
                        }
                        if (key === 'hideItem') {
                            groupEle = hiddenEle.closest('.e-ribbon-group');
                            if (groupEle.classList.contains('e-hide-group')) {
                                isGroupHidden = true;
                                widthDifference = this_6.checkWidthDifference(hiddenEle, groupEle);
                            }
                        }
                        this_6.calculateOverflowItemsWidth(hiddenEle.offsetWidth + widthDifference, true, tabIndex);
                        this_6.calculateMediumDataWidth(hiddenEle.offsetWidth + widthDifference, tabIndex, true);
                        if (isHidden) {
                            hiddenEle.classList.add('e-hidden');
                        }
                    }
                    else {
                        if (key === 'showItem') {
                            groupEle = hiddenEle.closest('.e-ribbon-group');
                            if (groupEle.classList.contains('e-hide-group')) {
                                isGroupHidden = true;
                                groupEle.classList.remove('e-hide-group');
                                groupEle.classList.remove('e-ribbon-emptyCollection');
                                widthDifference = Math.abs(hiddenEle.offsetWidth - groupEle.offsetWidth);
                                if (this_6.hiddenGroups.indexOf(groupEle.id) !== -1) {
                                    this_6.hiddenGroups.splice(this_6.hiddenGroups.indexOf(groupEle.id), 1);
                                }
                            }
                            else {
                                if (this_6.hiddenGroups.indexOf(groupEle.id) !== -1) {
                                    var hiddenItems = groupEle.querySelectorAll('.e-ribbon-item:not(.e-hidden)');
                                    hiddenItems.forEach(function (item) {
                                        if (item.id !== hiddenEle.id) {
                                            item.classList.add('e-hidden');
                                        }
                                    });
                                    widthDifference = Math.abs(hiddenEle.offsetWidth - groupEle.offsetWidth);
                                    hiddenItems.forEach(function (item) {
                                        if (item.id !== hiddenEle.id) {
                                            item.classList.remove('e-hidden');
                                        }
                                    });
                                    this_6.hiddenGroups.splice(this_6.hiddenGroups.indexOf(groupEle.id), 1);
                                }
                            }
                        }
                        this_6.calculateOverflowItemsWidth(hiddenEle.offsetWidth + widthDifference, false, tabIndex);
                        this_6.calculateMediumDataWidth(hiddenEle.offsetWidth + widthDifference, tabIndex, false);
                    }
                    if (isGroupHidden) {
                        groupEle.classList.add('e-hide-group');
                        groupEle.classList.add('e-ribbon-emptyCollection');
                    }
                }
                var index = hiddenProps["" + key].indexOf(hiddenProps["" + key][parseInt(i.toString(), 10)]);
                if (index !== -1) {
                    hiddenProps["" + key].splice(index, 1);
                    i--;
                }
                out_i_1 = i;
            };
            var this_6 = this, out_i_1;
            for (var i = 0; i < hiddenProps["" + key].length; i++) {
                _loop_6(i);
                i = out_i_1;
            }
        }
    };
    Ribbon.prototype.checkWidthDifference = function (hiddenEle, groupEle) {
        var widthDifference = 0;
        groupEle.classList.remove('e-hide-group');
        groupEle.classList.remove('e-ribbon-emptyCollection');
        if (this.hiddenGroups.length) {
            if (this.hiddenGroups.indexOf(groupEle.id) === -1) {
                this.hiddenGroups.push(groupEle.id);
                widthDifference = Math.abs(hiddenEle.offsetWidth - groupEle.offsetWidth);
            }
        }
        else {
            this.hiddenGroups.push(groupEle.id);
            widthDifference = Math.abs(hiddenEle.offsetWidth - groupEle.offsetWidth);
        }
        return widthDifference;
    };
    Ribbon.prototype.calculateHiddenElementsWidth = function (tabIndex) {
        if (tabIndex === this.selectedTab && this.activeLayout === 'Simplified') {
            var hiddenProps = this.hiddenElements[parseInt(tabIndex.toString(), 10)];
            if (hiddenProps) {
                for (var i = 0; i < Object.keys(hiddenProps).length; i++) {
                    this.updateItemsSimplifiedWidth(tabIndex, Object.keys(hiddenProps)[parseInt(i.toString(), 10)]);
                }
            }
        }
    };
    Ribbon.prototype.calculateMediumDataWidth = function (hiddenWidth, tabIndex, isHidden) {
        if (this.selectedTab === tabIndex && this.activeLayout === 'Simplified') {
            var activeContent = this.tabObj.element.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + CONTENT_ID);
            var mediumDataItems = Array.prototype.slice.call(activeContent.querySelectorAll('.e-ribbon-item'));
            if (this.overflowDDB) {
                var overflowEle = this.overflowDDB.target;
                var overflowItems = overflowEle.querySelectorAll('.e-ribbon-item');
                var selectedOFTab = document.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                for (var i = 0; i < overflowItems.length; i++) {
                    var ofTab = overflowItems[parseInt(i.toString(), 10)].closest('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (selectedOFTab && ofTab && selectedOFTab.id === ofTab.id && overflowItems[parseInt(i.toString(), 10)].hasAttribute('data-medium-width')) {
                        mediumDataItems.push(overflowItems[parseInt(i.toString(), 10)]);
                    }
                }
            }
            var groupOFButton = activeContent.querySelectorAll('.e-ribbon-group-of-btn');
            for (var i = 0; i < groupOFButton.length; i++) {
                var overflowButton = getInstance(groupOFButton[parseInt(i.toString(), 10)], DropDownButton);
                var overflowBtnTarget = overflowButton.target;
                var overflowItems = overflowBtnTarget.querySelectorAll('.e-ribbon-item');
                for (var i_10 = 0; i_10 < overflowItems.length; i_10++) {
                    if (overflowItems[parseInt(i_10.toString(), 10)].hasAttribute('data-medium-width')) {
                        mediumDataItems.push(overflowItems[parseInt(i_10.toString(), 10)]);
                    }
                }
            }
            for (var i = 0; i < mediumDataItems.length; i++) {
                if (mediumDataItems[parseInt(i.toString(), 10)].hasAttribute('data-medium-width')) {
                    var previousWidth = parseInt(mediumDataItems[parseInt(i.toString(), 10)].getAttribute('data-medium-width'), 10);
                    mediumDataItems[parseInt(i.toString(), 10)].setAttribute('data-medium-width', isHidden ? (previousWidth - hiddenWidth).toString() : (previousWidth + hiddenWidth).toString());
                }
            }
        }
    };
    Ribbon.prototype.calculateOverflowItemsWidth = function (hiddenItem, isHidden, tabIndex) {
        if (this.selectedTab === tabIndex && this.activeLayout === 'Simplified') {
            var groupList = this.tabs[parseInt(tabIndex.toString(), 10)].groups;
            for (var i = 0; i < groupList.length; i++) {
                var group = groupList[parseInt(i.toString(), 10)];
                if (group.enableGroupOverflow) {
                    var groupContainer = document.querySelector('#' + group.id);
                    var overflowButton = void 0;
                    var overflowDDB = groupContainer.querySelector('#' + group.id + GROUPOF_BUTTON_ID);
                    if (overflowDDB) {
                        overflowButton = getInstance(overflowDDB, DropDownButton);
                    }
                    if (overflowButton) {
                        var overflowEle = overflowButton.target;
                        var overflowItems = overflowEle.querySelectorAll('.e-ribbon-item');
                        for (var i_11 = 0; i_11 < overflowItems.length; i_11++) {
                            var previousWidth = parseInt(overflowItems[parseInt(i_11.toString(), 10)].getAttribute('data-simplified-width'), 10);
                            if (previousWidth) {
                                overflowItems[parseInt(i_11.toString(), 10)].setAttribute('data-simplified-width', isHidden ? (previousWidth - hiddenItem).toString() : (previousWidth + hiddenItem).toString());
                            }
                        }
                    }
                }
            }
        }
        if (this.overflowDDB) {
            var selectedOFTab = document.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
            var overflowEle = this.overflowDDB.target;
            var overflowItems = overflowEle.querySelectorAll('.e-ribbon-item');
            for (var i = 0; i < overflowItems.length; i++) {
                var ofTab = overflowItems[parseInt(i.toString(), 10)].closest('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                if (selectedOFTab && ofTab && selectedOFTab.id === ofTab.id) {
                    var previousWidth = parseInt(overflowItems[parseInt(i.toString(), 10)].getAttribute('data-simplified-width'), 10);
                    if (previousWidth) {
                        overflowItems[parseInt(i.toString(), 10)].setAttribute('data-simplified-width', isHidden ? (previousWidth - hiddenItem).toString() : (previousWidth + hiddenItem).toString());
                    }
                }
            }
        }
    };
    /**
     * Disables a specific group within a ribbon tab.
     *
     * @param {string} groupID - The ID of the group to be disabled.
     * @returns {void}
     */
    Ribbon.prototype.disableGroup = function (groupID) {
        this.enableDisableGroup(groupID, true);
    };
    /**
     * Enables a specific group within a ribbon tab.
     *
     * @param {string} groupID - The ID of the group to be enabled.
     * @returns {void}
     */
    Ribbon.prototype.enableGroup = function (groupID) {
        this.enableDisableGroup(groupID, false);
    };
    Ribbon.prototype.enableDisableGroup = function (groupID, isDisabled) {
        var overflowDDB;
        var overflowtarget;
        var itemProp = getGroup(this.tabs, groupID);
        if (!itemProp) {
            return;
        }
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupEle = contentEle.querySelector('#' + groupID);
        if (groupEle) {
            if (isDisabled) {
                groupEle.classList.add('e-disabled');
            }
            else {
                groupEle.classList.remove('e-disabled');
            }
        }
        else {
            this.updateInitialProps(itemProp.tabIndex, groupID, 'disabledGroups', isDisabled);
        }
        if (this.overflowDDB) {
            var overflowEle = this.overflowDDB.target;
            var ofTabContainer = overflowEle.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
            if (itemProp.group.enableGroupOverflow) {
                var overflowDDBEle = contentEle.querySelector('#' + groupID + GROUPOF_BUTTON_ID);
                if (overflowDDBEle) {
                    overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                    overflowtarget = overflowDDB.target;
                }
                if (overflowtarget) {
                    if (isDisabled) {
                        overflowtarget.classList.add('e-disabled');
                    }
                    else {
                        overflowtarget.classList.remove('e-disabled');
                    }
                }
            }
            else if (ofTabContainer) {
                var grpContainer = ofTabContainer.querySelector('#' + groupID + CONTAINER_ID);
                if (grpContainer) {
                    if (isDisabled) {
                        grpContainer.classList.add('e-disabled');
                    }
                    else {
                        grpContainer.classList.remove('e-disabled');
                    }
                }
            }
        }
    };
    /**
     * adds the ribbon collection.
     *
     * @param {string} groupId - Gets the ribbon group ID.
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @param {string} targetId - Gets the ID of the target collection to add the new collection.
     * @param {boolean} isAfter - Defines whether the collection is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addCollection = function (groupId, collection, targetId, isAfter) {
        var itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if ((itemProp.group.orientation === 'Row') && (itemProp.group.collections.length === 3)) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        var ribbonCollections = itemProp.group.collections.slice();
        var index = targetId ? getIndex(ribbonCollections, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonCollections.length : (index + (isAfter ? 1 : 0));
        ribbonCollections.splice(index, 0, collection);
        itemProp.group.setProperties({ collections: ribbonCollections }, true);
        this.checkID([itemProp.group.collections[parseInt(index.toString(), 10)]], 'collection', groupId);
        this.validateItemSize();
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var collection_1 = itemProp.group.collections[parseInt(index.toString(), 10)];
            var element = this.createCollection([collection_1], itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex)[0];
            if (itemProp.group.isCollapsed) {
                contentEle = this.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle);
            }
            //insert the element in tab items property.
            var targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
            }
            else {
                contentEle.querySelector('#' + groupId + CONTENT_ID).append(element);
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Removes the ribbon collection.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @returns {void}
     */
    Ribbon.prototype.removeCollection = function (collectionId) {
        var itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            for (var _i = 0, _a = itemProp.collection.items; _i < _a.length; _i++) {
                var item = _a[_i];
                this.removeItemElement(contentEle, item, dropdown);
            }
            var groupEle = contentEle.querySelector('#' + collectionId);
            if (groupEle) {
                groupEle.remove();
            }
        }
        var ribbonGroup = itemProp.group;
        var ribbonCollections = ribbonGroup.collections.slice();
        ribbonCollections.splice(itemProp.collectionIndex, 1);
        ribbonGroup.setProperties({ collections: ribbonCollections }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Adds ribbon item.
     *
     * @param {string} collectionId - Gets the collection ID.
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @param {string} targetId - Gets the ID of the target item to add the new item.
     * @param {boolean} isAfter - Defines whether the item is added before or after the target.
     * @returns {void}
     */
    Ribbon.prototype.addItem = function (collectionId, item, targetId, isAfter) {
        var itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if ((itemProp.group.orientation === 'Column') && (itemProp.collection.items.length === 3)) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        var ribbonItems = itemProp.collection.items.slice();
        var index = targetId ? getIndex(ribbonItems, function (e) { return e.id === targetId; }) : -1;
        index = (index === -1) ? ribbonItems.length : (index + (isAfter ? 1 : 0));
        ribbonItems.splice(index, 0, item);
        itemProp.collection.setProperties({ items: ribbonItems }, true);
        this.checkID([itemProp.collection.items[parseInt(index.toString(), 10)]], 'item', collectionId);
        this.validateItemSize();
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupContainer = contentEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
        if (contentEle.innerHTML !== '') {
            var item_1 = itemProp.collection.items[parseInt(index.toString(), 10)];
            var element = this.createItems([item_1], itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex, groupContainer)[0];
            if (itemProp.group.isCollapsed) {
                contentEle = this.ribbonDropDownModule.getOverflowDropDownPopup(itemProp, contentEle);
            }
            //insert the element in tab items property.
            var targetEle = targetId ? contentEle.querySelector('#' + targetId) : null;
            if (targetEle) {
                targetEle.closest('.' + RIBBON_ITEM).insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', element);
            }
            else {
                if (element) {
                    contentEle.querySelector('#' + collectionId).append(element);
                }
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Removes ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    Ribbon.prototype.removeItem = function (itemId) {
        var itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            var item = itemProp.item;
            this.removeItemElement(contentEle, item, dropdown);
        }
        var ribbonCollection = itemProp.collection;
        var ribbonItems = ribbonCollection.items;
        ribbonItems.splice(itemProp.itemIndex, 1);
        ribbonCollection.setProperties({ items: ribbonItems }, true);
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
    };
    /**
     * Hides a specific ribbon item.
     *
     * @param {string} itemId - The ID of the item to be hidden.
     * @returns {void}
     */
    Ribbon.prototype.hideItem = function (itemId) {
        this.showHideItem(itemId, true);
    };
    /**
     * Shows a specific ribbon item.
     *
     * @param {string} itemId - The ID of the item to be shown.
     * @returns {void}
     */
    Ribbon.prototype.showItem = function (itemId) {
        this.showHideItem(itemId, false);
    };
    Ribbon.prototype.showHideItem = function (itemId, isHidden) {
        var itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        var ele;
        if (itemProp.item.type === 'GroupButton') {
            ele = getItemElement(this, itemId + RIBBON_GROUP_BUTTON_ID, itemProp);
        }
        else {
            ele = getItemElement(this, itemId, itemProp);
        }
        if (ele) {
            var itemEle = closest(ele, '.e-ribbon-item');
            this.updateHiddenElements(itemProp.tabIndex, isHidden ? 'hideItem' : 'showItem', itemId, isHidden, itemEle, itemProp.group);
            if (this.selectedTab === itemProp.tabIndex) {
                this.refreshLayout();
            }
        }
        else {
            this.updateInitialProps(itemProp.tabIndex, itemId, 'hiddenItems', isHidden);
        }
    };
    Ribbon.prototype.updateInitialProps = function (tabIndex, id, key, isInsert) {
        var initialProps = this.initialPropsData[parseInt(tabIndex.toString(), 10)];
        if (!initialProps) {
            this.initialPropsData[parseInt(tabIndex.toString(), 10)] = {};
            initialProps = this.initialPropsData[parseInt(tabIndex.toString(), 10)];
        }
        if (initialProps) {
            if (!initialProps["" + key]) {
                initialProps["" + key] = [];
            }
            var itemIndex = initialProps["" + key].indexOf(id);
            if (isInsert) {
                if (itemIndex === -1) {
                    initialProps["" + key].push(id);
                }
            }
            else {
                if (itemIndex !== -1) {
                    initialProps["" + key].splice(itemIndex, 1);
                }
                if (initialProps["" + key].length === 0) {
                    delete initialProps["" + key];
                }
                if (Object.keys(initialProps).length === 0) {
                    delete this.initialPropsData[parseInt(tabIndex.toString(), 10)];
                }
            }
        }
    };
    Ribbon.prototype.checkHiddenItems = function (group, isHidden, tabIndex) {
        var isItemsHidden = true;
        var isEmptyCollection;
        var contentEle = this.tabObj.items[parseInt(tabIndex.toString(), 10)].content;
        var groupEle = contentEle.querySelector('#' + group.id);
        if (isHidden) {
            for (var i = 0; i < group.collections.length; i++) {
                if (isItemsHidden) {
                    var collection = group.collections[parseInt(i.toString(), 10)];
                    for (var j = 0; j < collection.items.length; j++) {
                        var item = collection.items[parseInt(j.toString(), 10)];
                        var itemEle = void 0;
                        if (item.type === 'GroupButton') {
                            var itemProp = getItem(this.tabs, item.id);
                            itemEle = getItemElement(this, item.id + RIBBON_GROUP_BUTTON_ID, itemProp);
                        }
                        else {
                            itemEle = getItemElement(this, item.id);
                        }
                        var itemContainer = itemEle ? itemEle.closest('.e-ribbon-item') : null;
                        if (!(itemContainer.classList.contains('e-hidden'))) {
                            isItemsHidden = false;
                            break;
                        }
                    }
                }
            }
            if (isItemsHidden) {
                groupEle.classList.add('e-hide-group');
                this.checkOverflowItems(isHidden, contentEle, group.enableGroupOverflow, tabIndex, group.id);
            }
        }
        else {
            groupEle.classList.remove('e-hide-group');
            this.checkOverflowItems(isHidden, contentEle, group.enableGroupOverflow, tabIndex, group.id);
        }
        if (this.activeLayout === 'Simplified' && !group.enableGroupOverflow) {
            var itemsLength = groupEle.querySelectorAll('.' + RIBBON_ITEM);
            if (itemsLength) {
                isEmptyCollection = this.checkEmptyCollection(itemsLength);
                groupEle.classList[isEmptyCollection ? 'add' : 'remove']('e-ribbon-emptyCollection');
            }
        }
    };
    Ribbon.prototype.checkOverflowItems = function (isHidden, contentEle, isGroupOF, tabIndex, groupID) {
        var overflowDDB;
        var overflowtarget;
        if (isGroupOF) {
            var overflowDDBEle = contentEle.querySelector('#' + groupID + GROUPOF_BUTTON_ID);
            if (overflowDDBEle) {
                overflowDDB = getInstance(overflowDDBEle, DropDownButton);
                overflowtarget = overflowDDB.target;
            }
            if (overflowtarget) {
                if (isHidden) {
                    overflowtarget.classList.add('e-hide-group');
                }
                else {
                    overflowtarget.classList.remove('e-hide-group');
                }
            }
        }
        else {
            if (this.overflowDDB) {
                var overflowEle = this.overflowDDB.target;
                var ofTabContainer = overflowEle.querySelector('#' + this.tabs[parseInt(tabIndex.toString(), 10)].id + OVERFLOW_ID);
                if (ofTabContainer) {
                    var grpContainer = ofTabContainer.querySelector('#' + groupID + CONTAINER_ID);
                    if (grpContainer) {
                        if (isHidden) {
                            grpContainer.classList.add('e-hide-group');
                        }
                        else {
                            grpContainer.classList.remove('e-hide-group');
                        }
                    }
                }
            }
        }
    };
    /**
     * tab - Gets the ribbon tab to be updated. The id of the tab is a required property. Other properties are optional.
     *
     * @param {RibbonTabModel} tab - Gets the ribbon tab model.
     * @returns {void}
     */
    Ribbon.prototype.updateTab = function (tab) {
        var tabId = tab.id;
        var index = getIndex(this.tabs, function (e) { return e.id === tabId; });
        if (index === -1) {
            return;
        }
        var contentEle = this.tabObj.items[parseInt(index.toString(), 10)].content;
        var groups = this.tabs[parseInt(index.toString(), 10)].groups;
        var tabEle = this.tabObj.element;
        if (groups && (contentEle.innerHTML !== '')) {
            // Check whether cssClass is passed by the user, and if it is, then remove the old values.
            if (tab.cssClass) {
                if (this.tabs[parseInt(index.toString(), 10)].cssClass) {
                    contentEle.classList.remove(this.tabs[parseInt(index.toString(), 10)].cssClass);
                    tabEle.querySelector('.e-active').classList.remove(this.tabs[parseInt(index.toString(), 10)].cssClass);
                }
            }
            // Check whether group is passed by the user, and if it is, then remove the old values.
            if (tab.groups) {
                for (var _i = 0, groups_3 = groups; _i < groups_3.length; _i++) {
                    var group = groups_3[_i];
                    var dropdownElement = group.isCollapsed ? contentEle.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID) : null;
                    for (var _a = 0, _b = group.collections; _a < _b.length; _a++) {
                        var collection = _b[_a];
                        for (var _c = 0, _d = collection.items; _c < _d.length; _c++) {
                            var item = _d[_c];
                            var ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id) : contentEle.querySelector('#' + item.id);
                            if (item.type === RibbonItemType.GroupButton && this.activeLayout === 'Classic') {
                                ele = dropdownElement ? this.ribbonDropDownModule.getDDBItemElement(dropdownElement, item.id +
                                    RIBBON_GROUP_BUTTON_ID) : contentEle.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID);
                            }
                            if (ele) {
                                this.destroyFunction(item, ele);
                            }
                        }
                    }
                    if (dropdownElement) {
                        this.ribbonDropDownModule.removeOverFlowDropDown(dropdownElement);
                    }
                }
                var groupElements = contentEle.querySelectorAll('.e-ribbon-group');
                // eslint-disable-next-line @typescript-eslint/tslint/config
                groupElements.forEach(function (groupEle) { groupEle.remove(); });
            }
        }
        if (index === this.selectedTab) {
            this.isAddRemove = true;
        }
        var ribbonTab = this.tabs[parseInt(index.toString(), 10)];
        ribbonTab.setProperties(tab, true);
        this.setProperties({ groups: this.checkID(ribbonTab.groups, 'group', ribbonTab.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML === '') {
            // Check whether group is passed by the user and sets the updated values.
            if (tab.groups) {
                var elements = this.createGroups(ribbonTab.groups, index);
                append(elements, contentEle);
            }
            if (this.selectedTab === index) {
                this.refreshLayout();
            }
            // Check whether cssClass is passed by the user and sets the updated values.
            if (tab.cssClass) {
                contentEle.classList.add(ribbonTab.cssClass);
                tabEle.querySelector('.e-active').classList.add(ribbonTab.cssClass);
            }
            // Check whether header is passed by the user and sets the updated values.
            if (tab.header) {
                tabEle.querySelector('#' + tabId + HEADER_ID).innerText = ribbonTab.header;
            }
        }
    };
    /**
     * group - Gets the ribbon group to be updated. The id of the group is a required property. Other properties are optional.
     *
     * @param {RibbonGroupModel} group - Gets the ribbon group model.
     * @returns {void}
     */
    Ribbon.prototype.updateGroup = function (group) {
        var groupId = group.id;
        var itemProp = getGroup(this.tabs, groupId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupEle = contentEle.querySelector('#' + groupId);
        var groupContainer = groupEle.querySelector('#' + group.id + CONTAINER_ID);
        var dropdownElement;
        var dropdown;
        if (contentEle.innerHTML !== '') {
            if (itemProp.group.showLauncherIcon) {
                this.removeLauncherIcon(itemProp.group.id, null, contentEle);
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            // Check whether cssClass is passed by the user, and if it is, then remove the old values.
            if (group.cssClass) {
                if (itemProp.group.cssClass) {
                    groupEle.classList.remove(itemProp.group.cssClass);
                    if (groupContainer) {
                        groupContainer.classList.remove(itemProp.group.cssClass);
                    }
                }
            }
            // Check whether collections or orientation is passed by the user, and if it is, then remove the old values.
            if (group.collections || group.orientation) {
                if (itemProp.group.collections || itemProp.group.orientation) {
                    for (var _i = 0, _a = itemProp.group.collections; _i < _a.length; _i++) {
                        var collection = _a[_i];
                        for (var _b = 0, _c = collection.items; _b < _c.length; _b++) {
                            var item = _c[_b];
                            this.removeItemElement(contentEle, item, dropdown);
                        }
                    }
                    var collectionElements = groupEle.querySelectorAll('.e-ribbon-collection');
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    collectionElements.forEach(function (collectionEle) { collectionEle.remove(); });
                    if (group.orientation) {
                        var groupContent = groupContainer.querySelector('.e-ribbon-group-content');
                        var removeCss = groupContent.classList.value.match(/(e-ribbon-[column|row]+)/g);
                        if (removeCss) {
                            removeClass([groupContent], removeCss);
                        }
                    }
                }
            }
            if (this.activeLayout === RibbonLayout.Simplified) {
                if (itemProp.group.enableGroupOverflow) {
                    if (dropdown.target.childElementCount === 0 || (dropdown.target.childElementCount
                        === 1 && this.isHeaderVisible(dropdown.target, itemProp.group.id))) {
                        this.removeOverflowButton(dropdown);
                    }
                }
                else {
                    var ofGroupContainer = dropdown.target.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                    if (ofGroupContainer && ofGroupContainer.childElementCount === 1) {
                        ofGroupContainer.remove();
                    }
                    var ofTabContainer = dropdown.target.querySelector('#' + this.tabs[parseInt(itemProp.tabIndex.toString(), 10)].id + OVERFLOW_ID);
                    if (ofTabContainer && ofTabContainer.childElementCount === 0) {
                        ofTabContainer.remove();
                    }
                }
            }
        }
        var ribbongroup = itemProp.group;
        ribbongroup.setProperties(group, true);
        ribbongroup.setProperties({ collections: this.checkID(ribbongroup.collections, 'collection', ribbongroup.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML !== '') {
            // Check whether showLauncherIcon or orientation is passed by the user and sets the updated values.
            if (group.showLauncherIcon) {
                this.createLauncherIcon(ribbongroup.id, groupContainer, itemProp.tabIndex);
            }
            // Check whether collections or orientation is passed by the user and sets the updated values.
            if (group.collections || group.orientation) {
                var groupContent = groupContainer.querySelector('.e-ribbon-group-content');
                groupContent.classList.add(((ribbongroup.orientation === 'Column') || (this.activeLayout === 'Simplified')) ? RIBBON_COLUMN : RIBBON_ROW);
                var elements = this.createCollection(ribbongroup.collections, ribbongroup.orientation, ribbongroup.id, ribbongroup.header, ribbongroup.enableGroupOverflow, itemProp.tabIndex, groupContainer);
                append(elements, groupContent);
            }
            if (this.selectedTab === itemProp.tabIndex) {
                this.refreshLayout();
            }
            // Check whether cssClass is passed by the user and sets the updated values.
            if (group.cssClass) {
                groupEle.classList.add(ribbongroup.cssClass);
                if (groupContainer) {
                    groupContainer.classList.add(ribbongroup.cssClass);
                }
            }
            // Check whether header is passed by the user and sets the updated values.
            if (group.header) {
                if (this.activeLayout === RibbonLayout.Simplified && !group.enableGroupOverflow) {
                    var overflowHeader = dropdown.target.querySelector('#' + group.id + HEADER_ID);
                    if (overflowHeader) {
                        overflowHeader.innerText = ribbongroup.header;
                    }
                }
                else if (this.activeLayout === RibbonLayout.Classic && !ribbongroup.isCollapsed) {
                    groupEle.querySelector('.e-ribbon-group-header').innerText = ribbongroup.header;
                }
                else if (this.activeLayout === RibbonLayout.Classic && ribbongroup.isCollapsed) {
                    var overflowEle = groupEle.querySelector('#' + ribbongroup.id + OVERFLOW_ID + DROPDOWN_ID);
                    // need to set instance for dropdown
                    var dropDownBtn = getInstance(overflowEle, DropDownButton);
                    var overflowHeader = dropDownBtn.target.querySelector('#' + group.id + HEADER_ID);
                    if (overflowHeader) {
                        overflowHeader.innerText = ribbongroup.header;
                    }
                }
            }
        }
    };
    /**
     * collection - Gets the ribbon collection to be updated. The id of the collection is a required property. Other properties are optional.
     *
     * @param {RibbonCollectionModel} collection - Gets the ribbon collection model.
     * @returns {void}
     */
    Ribbon.prototype.updateCollection = function (collection) {
        var collectionId = collection.id;
        var itemProp = getCollection(this.tabs, collectionId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var collectionEle = contentEle.querySelector('#' + collectionId);
        if (contentEle.innerHTML !== '') {
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (this.activeLayout === RibbonLayout.Simplified) {
                dropdownElement = itemProp.group.enableGroupOverflow ?
                    contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
            }
            // Check whether cssClass is passed by the user, and if it is, then remove the old values.
            if (collection.cssClass) {
                if (itemProp.collection.cssClass) {
                    collectionEle.classList.remove(itemProp.collection.cssClass);
                }
            }
            if (collection.items) {
                if (itemProp.collection.items) {
                    for (var _i = 0, _a = itemProp.collection.items; _i < _a.length; _i++) {
                        var item = _a[_i];
                        this.removeItemElement(contentEle, item, dropdown);
                    }
                }
            }
        }
        var ribboncollection = itemProp.collection;
        ribboncollection.setProperties(collection, true);
        ribboncollection.setProperties({ items: this.checkID(ribboncollection.items, 'item', ribboncollection.id) }, true);
        this.validateItemSize();
        if (contentEle.innerHTML !== '') {
            if (collection.items) {
                var groupContainer = contentEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
                var elements = this.createItems(ribboncollection.items, itemProp.group.orientation, itemProp.group.id, itemProp.group.header, itemProp.group.enableGroupOverflow, itemProp.tabIndex, groupContainer);
                append(elements, collectionEle);
            }
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.refreshLayout();
        }
        // Check whether cssClass is passed by the user and sets the updated values.
        if (collection.cssClass) {
            collectionEle.classList.add(ribboncollection.cssClass);
        }
    };
    /**
     * item - Gets the ribbon item to be updated. The id of the item is a required property. Other properties are optional.
     *
     * @param {RibbonItemModel} item - Gets the ribbon item model.
     * @returns {void}
     */
    Ribbon.prototype.updateItem = function (item) {
        var itemId = item.id;
        var itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        if (this.selectedTab === itemProp.tabIndex) {
            this.clearOverflowResize();
        }
        //Check whether the tab items are rendered
        var contentEle = this.tabObj.items[itemProp.tabIndex].content;
        var groupEle = contentEle.querySelector('#' + itemProp.group.id);
        if (groupEle) {
            var groupContainer = groupEle.querySelector('#' + itemProp.group.id + CONTAINER_ID);
            var itemContainer = null;
            var itemEle = null;
            var dropdownElement = void 0;
            var dropdown = void 0;
            if (contentEle.innerHTML !== '') {
                if (this.activeLayout === RibbonLayout.Simplified) {
                    dropdownElement = itemProp.group.enableGroupOverflow ?
                        contentEle.querySelector('#' + itemProp.group.id + GROUPOF_BUTTON_ID) : null;
                    dropdown = dropdownElement ? getComponent(dropdownElement, DropDownButton) : this.overflowDDB;
                }
                if (this.activeLayout === RibbonLayout.Simplified && itemProp.item.displayOptions === DisplayMode.Overflow) {
                    itemContainer = dropdown.target.querySelector('#' + itemId + CONTAINER_ID);
                    itemEle = dropdown.target.querySelector('#' + itemId);
                    if (item.displayOptions && item.displayOptions !== DisplayMode.Overflow) {
                        var collectionEle = groupContainer.querySelector('#' + itemProp.collection.id);
                        if (collectionEle) {
                            collectionEle.appendChild(itemContainer);
                        }
                    }
                }
                else {
                    itemContainer = groupContainer.querySelector('#' + itemId + CONTAINER_ID);
                    itemEle = contentEle.querySelector('#' + itemId);
                    if (!itemContainer) {
                        itemContainer = dropdown ? dropdown.target.querySelector('#' + itemId + CONTAINER_ID) : groupContainer.querySelector('#' + itemId + CONTAINER_ID);
                    }
                    if (!itemEle) {
                        itemEle = dropdown ? dropdown.target.querySelector('#' + itemId) : contentEle.querySelector('#' + itemId);
                    }
                    if (itemProp.item.type === 'Gallery') {
                        if (!itemEle) {
                            itemEle = contentEle.querySelector('#' + itemId + '_galleryWrapper');
                        }
                    }
                    if (itemProp.item.type === 'GroupButton' && this.activeLayout === RibbonLayout.Classic) {
                        itemEle = contentEle.querySelector('#' + itemId + RIBBON_GROUP_BUTTON_ID);
                    }
                    if (this.activeLayout === RibbonLayout.Simplified && item.displayOptions === DisplayMode.Overflow) {
                        this.createOverflowPopup(itemProp.item, itemProp.tabIndex, itemProp.group.enableGroupOverflow, itemProp.group.id, itemProp.group.header, itemContainer, groupContainer);
                        if ((itemProp.item.type === RibbonItemType.DropDown) || (itemProp.item.type === RibbonItemType.SplitButton) ||
                            (item.type === RibbonItemType.GroupButton) || (item.type === RibbonItemType.Gallery)) {
                            this.updatePopupItems(itemProp.item, itemContainer, itemProp.group.enableGroupOverflow, true);
                        }
                    }
                }
                // Check whether cssClass is passed by the user, and if it is, then remove the old values.
                if (item.cssClass) {
                    if (itemProp.item.cssClass) {
                        itemContainer.classList.remove(itemProp.item.cssClass);
                    }
                }
                this.destroyFunction(itemProp.item, itemEle);
                itemEle.remove();
                var removeCss = itemContainer.classList.value.match(/(e-ribbon-[large|medium|small]+-item)/g);
                if (removeCss) {
                    removeClass([itemContainer], removeCss);
                }
            }
            var ribbonItem = itemProp.item;
            ribbonItem.setProperties(item, true);
            this.validateItemSize();
            if (contentEle.innerHTML !== '') {
                // To avoid undefined items condition is added
                if (ribbonItem.ribbonTooltipSettings && isTooltipPresent(ribbonItem.ribbonTooltipSettings)) {
                    itemContainer.classList.add(RIBBON_TOOLTIP_TARGET);
                    this.tooltipData.push({ id: itemContainer.id, data: ribbonItem.ribbonTooltipSettings });
                }
                var size = ribbonItem.activeSize;
                if (this.activeLayout === 'Simplified') {
                    size = ((ribbonItem.allowedSizes === RibbonItemSize.Large) || (ribbonItem.allowedSizes & RibbonItemSize.Medium) ||
                        (ribbonItem.displayOptions === DisplayMode.Overflow)) ? RibbonItemSize.Medium : RibbonItemSize.Small;
                    ribbonItem.setProperties({ activeSize: size }, true);
                }
                if (size & RibbonItemSize.Large) {
                    itemContainer.classList.add(RIBBON_LARGE_ITEM, RIBBON_CONTENT_HEIGHT);
                }
                else {
                    if (size & RibbonItemSize.Medium) {
                        itemContainer.classList.add(RIBBON_MEDIUM_ITEM);
                    }
                    else {
                        itemContainer.classList.add(RIBBON_SMALL_ITEM);
                    }
                }
                this.createRibbonItem(ribbonItem, itemContainer);
                if (itemProp.item.type === 'Gallery' && document.querySelector('#' + itemId + '_container').closest('.e-ribbon-overflow-target') && item.displayOptions !== DisplayMode.Overflow) {
                    this.createOverflowPopup(itemProp.item, itemProp.tabIndex, itemProp.group.enableGroupOverflow, itemProp.group.id, itemProp.group.header, itemContainer, groupContainer);
                }
                if (this.activeLayout === 'Simplified' && itemProp.group.enableGroupOverflow) {
                    if (dropdown.target.childElementCount === 0 ||
                        (dropdown.target.childElementCount === 1 &&
                            this.isHeaderVisible(dropdown.target, itemProp.group.id))) {
                        this.removeOverflowButton(dropdown);
                    }
                }
                if (this.selectedTab === itemProp.tabIndex) {
                    this.refreshLayout();
                }
                if (item.cssClass) {
                    itemContainer.classList.add(ribbonItem.cssClass);
                }
                if (!(ribbonItem.disabled) && itemContainer.classList.contains(DISABLED_CSS)) {
                    itemContainer.classList.remove(DISABLED_CSS);
                }
                this.enableDisableItem(ribbonItem.id, ribbonItem.disabled);
            }
        }
        else {
            this.isUpdateItems = true;
            this.itemsModel.push(item);
            this.targetTabs[item.id] = itemProp.tabIndex;
        }
    };
    Ribbon.prototype.removeItemElement = function (contentEle, item, dropdown) {
        var ele = null;
        if (this.activeLayout === RibbonLayout.Classic) {
            ele = (item.displayOptions & DisplayMode.Classic) ? contentEle.querySelector('#' + item.id) : null;
            if (item.type === 'GroupButton') {
                ele = (item.displayOptions & DisplayMode.Classic) ? contentEle.querySelector('#' + item.id + RIBBON_GROUP_BUTTON_ID) : null;
            }
        }
        else {
            //Checks for Simplified and Auto options (Auto = classic + simplified + popup)
            ele = (item.displayOptions & DisplayMode.Simplified) ? contentEle.querySelector('#' + item.id) : null;
            // element will be null for "Popup" and if the item is moved to overflow in "Auto" mode
            if (!ele) {
                ele = dropdown.target.querySelector('#' + item.id);
            }
        }
        if (ele) {
            this.destroyFunction(item, ele);
            if (item.type === 'GroupButton' && this.activeLayout === RibbonLayout.Simplified) {
                document.getElementById(item.id + CONTAINER_ID).remove();
            }
            else {
                ele.closest('#' + item.id + CONTAINER_ID).remove();
            }
        }
    };
    /**
     * Enables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    Ribbon.prototype.enableItem = function (itemId) {
        this.enableDisableItem(itemId, false);
    };
    /**
     * Disables ribbon item.
     *
     * @param {string} itemId - Gets the item ID.
     * @returns {void}
     */
    Ribbon.prototype.disableItem = function (itemId) {
        this.enableDisableItem(itemId, true);
    };
    /**
     * Gets the Ribbon item model associated with the specified item ID.
     *
     * @param {string} itemId - The unique ID of the Ribbon item.
     * @returns {RibbonItemModel} - Returns the Ribbon item model.
     */
    Ribbon.prototype.getItem = function (itemId) {
        return getItem(this.tabs, itemId).item;
    };
    Ribbon.prototype.enableDisableItem = function (itemId, isDisabled) {
        var isUpdated = false;
        var isOverflow = false;
        var itemProp = getItem(this.tabs, itemId);
        if (!itemProp) {
            return;
        }
        itemProp.item.setProperties({ disabled: isDisabled }, true);
        var ele;
        if (itemProp.item.type === 'GroupButton') {
            ele = getItemElement(this, itemId + RIBBON_GROUP_BUTTON_ID, itemProp);
        }
        else if (itemProp.item.type === 'Gallery') {
            ele = document.querySelector('#' + itemId);
            if (!ele) {
                ele = document.querySelector('#' + itemId + '_galleryWrapper');
            }
            else {
                isOverflow = true;
            }
        }
        else {
            ele = getItemElement(this, itemId, itemProp);
        }
        if (ele) {
            var itemEle = closest(ele, '.e-ribbon-item');
            var moduleName = this.getItemModuleName(itemProp.item);
            isUpdated = isDisabled ? !itemEle.classList.contains(DISABLED_CSS) :
                itemEle.classList.contains(DISABLED_CSS);
            if (moduleName !== 'template') {
                if (isUpdated) {
                    if (moduleName === 'group-btn' && this.activeLayout === 'Simplified') {
                        updateControlDisabled(ele, 'dropdown-btn', isDisabled);
                        for (var i = 0; i < itemProp.item.groupButtonSettings.items.length; i++) {
                            var btnEle = document.querySelector('#' + itemId + RIBBON_GROUP_BUTTON_ID + i);
                            updateControlDisabled(btnEle, 'btn', isDisabled);
                        }
                    }
                    else if (moduleName === 'group-btn' && this.activeLayout === 'Classic') {
                        for (var i = 0; i < itemProp.item.groupButtonSettings.items.length; i++) {
                            var btnEle = ele.querySelector('#' + itemId + RIBBON_GROUP_BUTTON_ID + i);
                            updateControlDisabled(btnEle, 'btn', isDisabled);
                        }
                    }
                    else if (moduleName === 'gallery') {
                        ele.classList.toggle(DISABLED_CSS, isDisabled);
                        document.getElementById(itemId + '_popupButton').classList.toggle(DISABLED_CSS, isDisabled);
                        if (isOverflow) {
                            var galleryEle = document.getElementById(itemId + '_galleryWrapper');
                            galleryEle.classList.toggle(DISABLED_CSS, isDisabled);
                        }
                    }
                    else {
                        updateControlDisabled(ele, moduleName, isDisabled);
                    }
                }
            }
            else {
                ele.classList.toggle(DISABLED_CSS, isDisabled);
                ele.toggleAttribute('disabled', isDisabled);
            }
            itemEle.classList.toggle(DISABLED_CSS, itemProp.item.disabled);
        }
    };
    Ribbon.prototype.unwireEvents = function () {
        EventHandler.remove(window, 'resize', this.resizeHandler);
        EventHandler.remove(document.body, 'keydown', this.keytipActionHandler);
        EventHandler.remove(document, 'mousedown', this.mouseEventHandler);
        EventHandler.remove(document, 'scroll', this.mouseEventHandler);
    };
    Ribbon.prototype.destroy = function () {
        this.keyboardModuleRibbon.destroy();
        this.keyboardModuleRibbon = null;
        destroyTooltip(this.element);
        if (this.refreshing) {
            this.clearOverflowDropDown(this.selectedTab);
        }
        this.destroyTabItems(this.tabs);
        if (!this.hideLayoutSwitcher) {
            this.removeExpandCollapse();
        }
        this.collapseButton = undefined;
        if (this.scrollModule) {
            this.scrollModule.destroy();
            this.scrollModule = null;
        }
        if (this.ribbonTempEle) {
            remove(this.ribbonTempEle);
            this.ribbonTempEle = null;
        }
        _super.prototype.destroy.call(this);
        this.tabObj.destroy();
        this.tabObj = undefined;
        this.initialPropsData = {};
        this.hiddenGroups = [];
        this.hiddenElements = {};
        this.keyTipElements = {};
        this.itemsModel = [];
        this.targetTabs = {};
        remove(this.element.querySelector('#' + this.element.id + TAB_ID));
        this.element.style.removeProperty(RIBBON_FILE_MENU_WIDTH);
        this.element.style.removeProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH);
        this.element.style.removeProperty('width');
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(SPACE));
        }
        this.element.classList.remove(RTL_CSS, RIBBON_SIMPLIFIED_MODE, RIBBON_OVERFLOW, RIBBON_COLLAPSIBLE, RIBBON_MINIMIZE, 'e-rbn');
        this.unwireEvents();
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {RibbonModel} newProp - Specifies new properties
     * @param  {RibbonModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Ribbon.prototype.onPropertyChanged = function (newProp, oldProp) {
        var _a, _b;
        for (var _i = 0, _c = Object.keys(newProp); _i < _c.length; _i++) {
            var prop = _c[_i];
            switch (prop) {
                case 'activeLayout':
                    this.switchLayout();
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        (_a = this.element.classList).remove.apply(_a, oldProp.cssClass.split(SPACE));
                    }
                    if (newProp.cssClass) {
                        (_b = this.element.classList).add.apply(_b, newProp.cssClass.split(SPACE));
                    }
                    break;
                case 'isMinimized':
                    this.element.classList.toggle(RIBBON_MINIMIZE, this.isMinimized);
                    this.tabObj.element.querySelector('.e-content').style.display = this.isMinimized ? 'none' : 'block';
                    if (!this.isMinimized) {
                        this.refreshLayout();
                    }
                    break;
                case 'locale':
                    this.updateCommonProperty({ locale: this.locale });
                    break;
                case 'enablePersistence':
                    this.updateCommonProperty({ enablePersistence: this.enablePersistence });
                    break;
                case 'enableRtl':
                    this.element.classList.toggle(RTL_CSS, this.enableRtl);
                    this.updateCommonProperty({ enableRtl: newProp.enableRtl });
                    if (this.scrollModule) {
                        this.scrollModule.setProperties({ enableRtl: newProp.enableRtl });
                    }
                    break;
                case 'launcherIconCss':
                    for (var i = 0; i < this.tabs.length; i++) {
                        var tabContent = this.tabObj.items[parseInt(i.toString(), 10)].content;
                        var tab = this.tabs[parseInt(i.toString(), 10)];
                        if (tabContent.querySelector('.' + RIBBON_GROUP)) {
                            for (var _d = 0, _e = tab.groups; _d < _e.length; _d++) {
                                var group = _e[_d];
                                if (group.showLauncherIcon) {
                                    var className = RIBBON_LAUNCHER_ICON_ELE + ' ' + (this.launcherIconCss || RIBBON_LAUNCHER_ICON);
                                    if (group.isCollapsed) {
                                        var element = tabContent.querySelector('#' + group.id + OVERFLOW_ID + DROPDOWN_ID);
                                        var dropdown = getComponent(element, DropDownButton);
                                        var launcherIconEle = dropdown.target.querySelector('#' + group.id + LAUNCHER_ID);
                                        launcherIconEle.className = className;
                                    }
                                    else {
                                        var element = tabContent.querySelector('#' + group.id + LAUNCHER_ID);
                                        element.className = className;
                                    }
                                }
                            }
                        }
                    }
                    break;
                case 'selectedTab': {
                    var tabEle = this.tabObj.element;
                    var toolbarItem = tabEle.querySelectorAll('.e-toolbar-item')[parseInt(newProp.selectedTab.toString(), 10)];
                    if (!(toolbarItem.classList.contains('e-hidden') || toolbarItem.classList.contains('e-disable'))) {
                        this.tabObj.setProperties({ selectedItem: newProp.selectedTab });
                    }
                    break;
                }
                case 'tabAnimation':
                    this.tabObj.setProperties({ animation: newProp.tabAnimation });
                    break;
                case 'tabs':
                    this.reRenderTabs(newProp.tabs);
                    break;
                case 'contextualTabs':
                    for (var i = 0; i < this.contextualTabs.length; i++) {
                        if (newProp.contextualTabs[parseInt(i.toString(), 10)]) {
                            this.ribbonContextualTabModule.updateContextualTabs(newProp.contextualTabs[parseInt(i.toString(), 10)], this.contextualTabs[parseInt(i.toString(), 10)]);
                        }
                    }
                    break;
                case 'width':
                    this.element.style.width = formatUnit(newProp.width);
                    this.refreshLayout();
                    break;
                case 'fileMenu': {
                    if (this.ribbonFileMenuModule) {
                        this.ribbonFileMenuModule.updateFileMenu(this.fileMenu);
                    }
                    var toolbarEle = this.tabObj['tbObj'];
                    toolbarEle.refreshOverflow();
                    break;
                }
                case 'backStageMenu': {
                    if (this.ribbonBackstageModule) {
                        this.ribbonBackstageModule.updateBackStageMenu(this.backStageMenu);
                    }
                    var toolbarElement = this.tabObj['tbObj'];
                    toolbarElement.refreshOverflow();
                    break;
                }
                case 'helpPaneTemplate': {
                    if (this.ribbonTempEle) {
                        remove(this.ribbonTempEle);
                        this.ribbonTempEle = null;
                        this.tabObj.element.style.setProperty(RIBBON_HELP_PANE_TEMPLATE_WIDTH, '0px');
                    }
                    if (this.helpPaneTemplate) {
                        this.createHelpPaneTemplate();
                    }
                    var toolbar_1 = this.tabObj['tbObj'];
                    toolbar_1.refreshOverflow();
                    break;
                }
                case 'hideLayoutSwitcher':
                    if (this.hideLayoutSwitcher) {
                        this.removeExpandCollapse();
                    }
                    else {
                        this.addExpandCollapse();
                    }
                    break;
            }
        }
    };
    var Ribbon_1;
    __decorate$l([
        Property('Classic')
    ], Ribbon.prototype, "activeLayout", void 0);
    __decorate$l([
        Property('')
    ], Ribbon.prototype, "cssClass", void 0);
    __decorate$l([
        Property(false)
    ], Ribbon.prototype, "enableKeyTips", void 0);
    __decorate$l([
        Property('')
    ], Ribbon.prototype, "layoutSwitcherKeyTip", void 0);
    __decorate$l([
        Complex({}, FileMenuSettings)
    ], Ribbon.prototype, "fileMenu", void 0);
    __decorate$l([
        Complex({}, BackStageMenu)
    ], Ribbon.prototype, "backStageMenu", void 0);
    __decorate$l([
        Property('')
    ], Ribbon.prototype, "launcherIconCss", void 0);
    __decorate$l([
        Property(false)
    ], Ribbon.prototype, "isMinimized", void 0);
    __decorate$l([
        Property('en-us')
    ], Ribbon.prototype, "locale", void 0);
    __decorate$l([
        Property(0)
    ], Ribbon.prototype, "selectedTab", void 0);
    __decorate$l([
        Complex({}, TabAnimationSettings)
    ], Ribbon.prototype, "tabAnimation", void 0);
    __decorate$l([
        Collection([], RibbonTab)
    ], Ribbon.prototype, "tabs", void 0);
    __decorate$l([
        Collection([], RibbonContextualTabSettings)
    ], Ribbon.prototype, "contextualTabs", void 0);
    __decorate$l([
        Property('100%')
    ], Ribbon.prototype, "width", void 0);
    __decorate$l([
        Property('')
    ], Ribbon.prototype, "helpPaneTemplate", void 0);
    __decorate$l([
        Property(false)
    ], Ribbon.prototype, "hideLayoutSwitcher", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "tabSelecting", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "tabSelected", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "ribbonExpanding", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "ribbonCollapsing", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "ribbonLayoutSwitched", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "launcherIconClick", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "created", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "overflowPopupOpen", void 0);
    __decorate$l([
        Event()
    ], Ribbon.prototype, "overflowPopupClose", void 0);
    Ribbon = Ribbon_1 = __decorate$l([
        NotifyPropertyChanges
    ], Ribbon);
    return Ribbon;
}(Component));

/**
 * Defines the items of Ribbon.
 */
var RibbonFileMenu = /** @class */ (function () {
    function RibbonFileMenu(parent) {
        this.parent = parent;
    }
    RibbonFileMenu.prototype.getModuleName = function () {
        return 'ribbonFileMenu';
    };
    RibbonFileMenu.prototype.destroy = function () {
        if (this.fileMenuDDB) {
            this.destroyDDB();
        }
        this.parent = null;
    };
    /**
     * Creates File Menu
     *
     * @param {FileMenuSettingsModel} fileMenuOptions - Gets the property of filemenu.
     * @returns {void}
     * @hidden
     */
    RibbonFileMenu.prototype.createFileMenu = function (fileMenuOptions) {
        var _this = this;
        if (!fileMenuOptions.visible) {
            return;
        }
        this.ddbElement = this.parent.createElement('button', {
            id: this.parent.element.id + RIBBON_FILE_MENU_ID
        });
        var tabEle = this.parent.tabObj.element;
        var toolbarEle = tabEle.querySelector('.e-toolbar');
        tabEle.insertBefore(this.ddbElement, toolbarEle);
        this.fileMenuDDB = new DropDownButton({
            content: fileMenuOptions.text,
            enableRtl: this.parent.enableRtl,
            cssClass: 'e-ribbon-file-menu e-caret-hide',
            created: function () {
                tabEle.style.setProperty(RIBBON_FILE_MENU_WIDTH, _this.ddbElement.offsetWidth + 'px');
            },
            beforeClose: this.ddbBeforeEvent.bind(this, false),
            beforeOpen: this.ddbBeforeEvent.bind(this, true),
            close: this.ddbAfterEvent.bind(this, false),
            open: this.ddbAfterEvent.bind(this, true)
        }, this.ddbElement);
        if (this.parent.fileMenu.popupTemplate) {
            this.fileMenuDDB.setProperties({ target: this.parent.fileMenu.popupTemplate });
        }
        else {
            this.createRibbonMenu(fileMenuOptions);
        }
        this.parent.tabObj.refreshActiveTabBorder();
        this.addFileMenuTooltip(fileMenuOptions);
        this.addFileMenuKeytip();
    };
    RibbonFileMenu.prototype.addFileMenuTooltip = function (fileMenuOptions) {
        if (isTooltipPresent(fileMenuOptions.ribbonTooltipSettings)) {
            this.ddbElement.classList.add(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.push({ id: this.ddbElement.id, data: fileMenuOptions.ribbonTooltipSettings });
        }
    };
    RibbonFileMenu.prototype.addFileMenuKeytip = function () {
        if (this.parent.fileMenu.keyTip) {
            this.parent.keyTipElements['filemenu'] = [];
            this.parent.keyTipElements['filemenu'].push({ id: this.ddbElement.id, type: 'filemenu', keyTip: this.parent.fileMenu.keyTip });
        }
    };
    RibbonFileMenu.prototype.ddbBeforeEvent = function (isOpen, args) {
        //args.event is null when dropdown button is closed using a method call
        if (!isOpen && args.event && args.event.target.closest('.e-ribbon-menu')) {
            args.cancel = true;
        }
        var event = isOpen ? this.parent.fileMenu.beforeOpen :
            this.parent.fileMenu.beforeClose;
        if (event) {
            var eventArgs = { cancel: args.cancel, element: args.element, event: args.event };
            event.call(this, eventArgs);
            args.cancel = eventArgs.cancel;
        }
    };
    RibbonFileMenu.prototype.ddbAfterEvent = function (isOpen, args) {
        var element = isOpen ? this.fileMenuDDB.target : this.fileMenuDDB.element;
        element.focus();
        var event = isOpen ? this.parent.fileMenu.open : this.parent.fileMenu.close;
        if (event) {
            var eventArgs = { element: args.element };
            event.call(this, eventArgs);
        }
    };
    //Clone RibbonMenuItems before assigning to avoid reference issues.
    RibbonFileMenu.prototype.cloneMenuItem = function (items) {
        var itemsList = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[parseInt(i.toString(), 10)];
            itemsList.push({
                iconCss: item.iconCss,
                id: item.id,
                separator: item.separator,
                text: item.text,
                url: item.url,
                items: this.cloneMenuItem(item.items)
            });
        }
        return itemsList;
    };
    RibbonFileMenu.prototype.createRibbonMenu = function (menuOptions) {
        var _this = this;
        var ulElem = this.parent.createElement('ul', {
            id: this.parent.element.id + RIBBON_FILE_MENU_LIST
        });
        this.fileMenuDDB.setProperties({ target: ulElem });
        this.menuctrl = new Menu({
            orientation: 'Vertical',
            enableRtl: this.parent.enableRtl,
            cssClass: 'e-ribbon-menu',
            animationSettings: menuOptions.animationSettings,
            items: this.cloneMenuItem(menuOptions.menuItems),
            showItemOnClick: menuOptions.showItemOnClick,
            template: menuOptions.itemTemplate,
            beforeClose: this.menuBeforeEvent.bind(this, false),
            beforeOpen: this.menuBeforeEvent.bind(this, true),
            beforeItemRender: this.beforeItemRender.bind(this),
            onClose: this.menuAfterEvent.bind(this, false),
            onOpen: this.menuAfterEvent.bind(this, true),
            select: this.menuSelect.bind(this)
        }, ulElem);
        EventHandler.add(ulElem, 'keydown', function (e) {
            if (e.key === 'Tab') {
                _this.fileMenuDDB.toggle();
            }
        }, this);
    };
    RibbonFileMenu.prototype.menuBeforeEvent = function (isOpen, args) {
        var event = isOpen ? this.parent.fileMenu.beforeOpen :
            this.parent.fileMenu.beforeClose;
        if (event) {
            var eventArgs = {
                cancel: args.cancel, element: args.element, event: args.event,
                items: args.items, parentItem: args.parentItem
            };
            event.call(this, eventArgs);
            args.cancel = eventArgs.cancel;
        }
    };
    RibbonFileMenu.prototype.menuAfterEvent = function (isOpen, args) {
        var event = isOpen ? this.parent.fileMenu.open : this.parent.fileMenu.close;
        if (event) {
            var eventArgs = { element: args.element, items: args.items, parentItem: args.parentItem };
            event.call(this, eventArgs);
        }
    };
    RibbonFileMenu.prototype.beforeItemRender = function (args) {
        var event = this.parent.fileMenu.beforeItemRender;
        if (event) {
            var eventArgs = { element: args.element, item: args.item };
            event.call(this, eventArgs);
        }
    };
    RibbonFileMenu.prototype.menuSelect = function (args) {
        var event = this.parent.fileMenu.select;
        if (event) {
            var eventArgs = { element: args.element, item: args.item, event: args.event };
            event.call(this, eventArgs);
            if (!args.element.classList.contains('e-menu-caret-icon')) {
                this.fileMenuDDB.toggle();
            }
        }
    };
    /**
     * setRtl
     *
     * @param {commonProperties} commonProp - Get the common property of ribbon.
     * @returns {void}
     * @hidden
     */
    RibbonFileMenu.prototype.setCommonProperties = function (commonProp) {
        if (this.fileMenuDDB) {
            this.fileMenuDDB.setProperties(commonProp);
            if (this.menuctrl) {
                this.menuctrl.setProperties(commonProp);
            }
        }
    };
    /**
     * Update FileMenu
     *
     * @param {FileMenuSettingsModel} fileMenuOptions - Gets the property of filemenu.
     * @returns {void}
     * @hidden
     */
    RibbonFileMenu.prototype.updateFileMenu = function (fileMenuOptions) {
        if (fileMenuOptions.visible) {
            if (this.fileMenuDDB) {
                if (fileMenuOptions.text) {
                    this.fileMenuDDB.setProperties({
                        content: fileMenuOptions.text
                    });
                    this.parent.tabObj.element.style.setProperty(RIBBON_FILE_MENU_WIDTH, this.ddbElement.offsetWidth + 'px');
                }
                if (fileMenuOptions.popupTemplate) {
                    if (this.menuctrl) {
                        this.destroyMenu();
                    }
                    this.fileMenuDDB.setProperties({ target: fileMenuOptions.popupTemplate });
                }
                else {
                    if (this.menuctrl) {
                        this.menuctrl.setProperties({
                            animationSettings: fileMenuOptions.animationSettings,
                            items: this.cloneMenuItem(fileMenuOptions.menuItems),
                            showItemOnClick: fileMenuOptions.showItemOnClick,
                            template: fileMenuOptions.itemTemplate
                        });
                    }
                    else {
                        this.createRibbonMenu(fileMenuOptions);
                    }
                }
                this.removeFileMenuTooltip();
                this.removeFileMenuKeytip();
                this.addFileMenuTooltip(fileMenuOptions);
                this.addFileMenuKeytip();
            }
            else {
                this.createFileMenu(fileMenuOptions);
            }
        }
        else if (this.fileMenuDDB) {
            this.destroyDDB();
        }
        this.parent.tabObj.refreshActiveTabBorder();
    };
    RibbonFileMenu.prototype.destroyMenu = function () {
        if (this.menuctrl) {
            this.menuctrl.destroy();
            this.menuctrl = null;
        }
    };
    RibbonFileMenu.prototype.destroyDDB = function () {
        this.removeFileMenuTooltip();
        this.removeFileMenuKeytip();
        var tabEle = this.parent.tabObj.element;
        tabEle.style.removeProperty(RIBBON_FILE_MENU_WIDTH);
        this.destroyMenu();
        this.fileMenuDDB.destroy();
        this.fileMenuDDB = null;
        remove(this.ddbElement);
        this.ddbElement = null;
    };
    RibbonFileMenu.prototype.removeFileMenuTooltip = function () {
        var _this = this;
        var index = getIndex(this.parent.tooltipData, function (e) { return e.id === _this.ddbElement.id; });
        if (index !== -1) {
            this.ddbElement.classList.remove(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.splice(index, 1);
        }
    };
    RibbonFileMenu.prototype.removeFileMenuKeytip = function () {
        var _this = this;
        if (this.parent.keyTipElements['filemenu']) {
            var index = getIndex(this.parent.keyTipElements['filemenu'], function (e) { return e.id === _this.ddbElement.id; });
            if (index !== -1) {
                this.parent.keyTipElements['filemenu'].splice(index, 1);
            }
        }
    };
    /**
     * Add items to FileMenu.
     *
     * @param {MenuItemModel[]} items - Gets the items to be added.
     * @param {string} target - Gets the target item to add the items.
     * @param {boolean} isAfter - Gets the boolean value to add the items after or before the target item.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.addItems = function (items, target, isAfter, isUniqueId) {
        if (isAfter) {
            this.menuctrl.insertAfter(items, target, isUniqueId);
        }
        else {
            this.menuctrl.insertBefore(items, target, isUniqueId);
        }
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Remove items from FileMenu.
     *
     * @param {string[]} items - Gets the items to be removed.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.removeItems = function (items, isUniqueId) {
        this.menuctrl.removeItems(items, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Enable items in FileMenu.
     *
     * @param {string[]} items - Gets the items to be enabled.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.enableItems = function (items, isUniqueId) {
        this.menuctrl.enableItems(items, true, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Disable items in FileMenu.
     *
     * @param {string[]} items - Gets the items to be disabled.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.disableItems = function (items, isUniqueId) {
        this.menuctrl.enableItems(items, false, isUniqueId);
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    /**
     * Update items in FileMenu.
     *
     * @param {MenuItem} item - Gets the item to be updated.
     * @param {boolean} id - Gets the id of the item to be updated.
     * @param {boolean} isUniqueId - Gets whether the id provided is uniqueId or not.
     * @returns {void}
     */
    RibbonFileMenu.prototype.setItem = function (item, id, isUniqueId) {
        this.menuctrl.setItem(item, id, isUniqueId);
        this.menuctrl.refresh();
        this.parent.fileMenu.setProperties({ menuItems: this.menuctrl.items }, true);
    };
    return RibbonFileMenu;
}());

var __extends$m = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Defines the items of Ribbon.
 */
var RibbonBackstage = /** @class */ (function (_super) {
    __extends$m(RibbonBackstage, _super);
    function RibbonBackstage(parent) {
        var _this = _super.call(this) || this;
        _this.parent = parent;
        return _this;
    }
    /**
     * @private
     * @returns {void}
     */
    RibbonBackstage.prototype.render = function () {
        // render code
    };
    /**
     * @private
     * @returns {void}
     */
    RibbonBackstage.prototype.preRender = function () {
        // pre render code
    };
    RibbonBackstage.prototype.getPersistData = function () {
        return '';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    RibbonBackstage.prototype.onPropertyChanged = function () {
        // onProperty changes code
    };
    RibbonBackstage.prototype.getModuleName = function () {
        return 'ribbonBackstage';
    };
    RibbonBackstage.prototype.destroy = function () {
        if (this.backstageButton) {
            this.destroyDDB();
        }
        this.parent = null;
    };
    /**
     * Creates Backstage Menu
     *
     * @param {BackStageMenuModel} backStageOptions - Gets the property of backstage.
     * @returns {void}
     * @hidden
     */
    RibbonBackstage.prototype.createBackStage = function (backStageOptions) {
        var _this = this;
        if (!backStageOptions.visible) {
            return;
        }
        this.backstageButtonEle = this.parent.createElement('button', {
            id: this.parent.element.id + RIBBON_BACKSTAGE_MENU_ID
        });
        var tabEle = this.parent.tabObj.element;
        var toolbarEle = tabEle.querySelector('.e-toolbar');
        tabEle.insertBefore(this.backstageButtonEle, toolbarEle);
        this.backstageButton = new Button({
            content: backStageOptions.text,
            enableRtl: this.parent.enableRtl,
            cssClass: RIBBON_BACKSTAGE,
            created: function () {
                tabEle.style.setProperty(RIBBON_FILE_MENU_WIDTH, _this.backstageButtonEle.offsetWidth + 'px');
            }
        }, this.backstageButtonEle);
        this.createBackStagePopup(backStageOptions);
        if (this.parent.backStageMenu.template) {
            this.createBackStageTemplate(this.parent.backStageMenu.template);
        }
        else {
            var footerItemCount = 0;
            var itemCount = 0;
            for (var i = 0; i < backStageOptions.items.length; i++) {
                var item = backStageOptions.items[parseInt(i.toString(), 10)];
                if (item.isFooter) {
                    footerItemCount++;
                }
                else {
                    itemCount++;
                }
            }
            if (itemCount > 0) {
                this.createBackstageMenu(backStageOptions, false);
            }
            if (footerItemCount > 0) {
                this.createBackstageMenu(backStageOptions, true);
            }
            if (this.menuCtrl) {
                this.checkMenuItems(this.menuCtrl.items);
            }
            if (this.footerMenuCtrl) {
                this.checkMenuItems(this.footerMenuCtrl.items);
            }
        }
        this.backstageButtonEle.onclick = function (e) {
            e.stopPropagation();
            _this.showBackstage();
            _this.popupHTMLElement.classList.add(RIBBON_BACKSTAGE_OPEN);
            var menuItem = _this.menuWrapper.querySelector('.e-menu-item.e-selected');
            if (menuItem) {
                menuItem.classList.remove('e-selected');
            }
            for (var i = 0; i < backStageOptions.items.length; i++) {
                var item = backStageOptions.items[parseInt(i.toString(), 10)];
                if (!item.isFooter && _this.menuCtrl.items[0].text === item.text) {
                    var firstMenuEle = _this.popupHTMLElement.querySelector('#' + _this.menuCtrl.items[0].id);
                    if (firstMenuEle) {
                        firstMenuEle.classList.add('e-selected');
                        firstMenuEle.focus();
                        _this.menuIndex = 0;
                        _this.isCloseBtn = false;
                    }
                    _this.createBackStageContent(_this.menuCtrl.items[0].id, item.content);
                    break;
                }
                else {
                    continue;
                }
            }
        };
        this.parent.tabObj.refreshActiveTabBorder();
        this.addBackStageMenuTooltip(backStageOptions);
        this.addBackStageMenuKeyTip(backStageOptions);
        EventHandler.add(document, 'click', this.onClickEvent, this);
    };
    RibbonBackstage.prototype.onClickEvent = function (e) {
        var targetEle = e.target;
        if (this.popupHTMLElement.contains(targetEle)) {
            return;
        }
        else {
            this.hideBackstage();
        }
    };
    RibbonBackstage.prototype.addBackStageMenuTooltip = function (backStageOptions) {
        if (isTooltipPresent(backStageOptions.ribbonTooltipSettings)) {
            this.backstageButtonEle.classList.add(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.push({ id: this.backstageButtonEle.id, data: backStageOptions.ribbonTooltipSettings });
        }
    };
    RibbonBackstage.prototype.addBackStageMenuKeyTip = function (backStageOptions) {
        if (backStageOptions.keyTip) {
            if (!(this.parent.keyTipElements['backstage'])) {
                this.parent.keyTipElements['backstage'] = [];
            }
            this.parent.keyTipElements['backstage'].push({ id: this.backstageButtonEle.id, type: 'backstage', keyTip: backStageOptions.keyTip });
        }
        if (backStageOptions.items && backStageOptions.items.length) {
            if (!(this.parent.keyTipElements['backstageMenu'])) {
                this.parent.keyTipElements['backstageMenu'] = [];
            }
            for (var i = 0; i < backStageOptions.items.length; i++) {
                if (backStageOptions.items[parseInt(i.toString(), 10)].keyTip) {
                    this.parent.keyTipElements['backstageMenu'].push({ id: backStageOptions.items[parseInt(i.toString(), 10)].id, type: 'backstageMenu', keyTip: backStageOptions.items[parseInt(i.toString(), 10)].keyTip });
                }
            }
        }
    };
    RibbonBackstage.prototype.checkMenuItems = function (backStageItems) {
        for (var i = 0; i < backStageItems.length; i++) {
            var item = backStageItems[parseInt(i.toString(), 10)];
            if (!item.iconCss) {
                var menuItemEle = this.popupHTMLElement.querySelector('#' + item.id);
                menuItemEle.classList.add(RIBBON_BACKSTAGE_TEXT_MENU);
            }
        }
    };
    RibbonBackstage.prototype.createBackStagePopup = function (backStageOptions) {
        var _this = this;
        this.popupHTMLElement = this.parent.createElement('div', {
            id: this.parent.element.id + RIBBON_BACKSTAGE_POPUP_ID,
            className: RIBBON_BACKSTAGE_POPUP
        });
        var targetEle;
        if (backStageOptions.target) {
            targetEle = backStageOptions.target instanceof HTMLElement ? backStageOptions.target :
                document.querySelector(backStageOptions.target);
            targetEle.appendChild(this.popupHTMLElement);
        }
        else {
            this.parent.element.appendChild(this.popupHTMLElement);
        }
        this.popupEle = new Popup(this.popupHTMLElement, {
            height: backStageOptions.height,
            width: backStageOptions.width,
            relateTo: backStageOptions.target || this.parent.element,
            enableRtl: this.parent.enableRtl
        });
        if (this.parent.enableRtl) {
            this.updatePopupPositionOnRtl(this.parent.enableRtl);
        }
        this.hideBackstage();
        EventHandler.add(this.popupHTMLElement, 'keyup', function (e) {
            if (e.code === 'Escape') {
                _this.hideBackstage();
            }
            _this.handleNavigation(e);
        }, this);
    };
    RibbonBackstage.prototype.handleNavigation = function (e) {
        var closeBtnEle = this.popupHTMLElement.querySelector('.e-ribbon-close-btn');
        var menuItems = this.popupHTMLElement.querySelectorAll('.e-menu-item');
        var arrowUp = e.key === 'ArrowUp';
        var arrowDown = e.key === 'ArrowDown';
        if (arrowUp || arrowDown) {
            if ((arrowUp && this.menuIndex > 0) || (arrowDown && this.menuIndex < menuItems.length - 1 && !this.isCloseBtn)) {
                this.menuIndex = arrowUp ? this.menuIndex - 1 : this.menuIndex + 1;
            }
            else {
                if (closeBtnEle && !this.isCloseBtn) {
                    closeBtnEle.focus();
                    this.isCloseBtn = true;
                }
                else {
                    this.menuIndex = arrowUp ? menuItems.length - 1 : 0;
                    this.isCloseBtn = false;
                }
            }
            for (var i = 0; i < menuItems.length; i++) {
                menuItems[parseInt(i.toString(), 10)].classList.remove('e-focused');
            }
            if (!this.isCloseBtn) {
                if (arrowUp && menuItems[this.menuIndex].classList.contains('e-separator')) {
                    this.menuIndex--;
                }
                else if (arrowDown && menuItems[this.menuIndex].classList.contains('e-separator')) {
                    this.menuIndex++;
                }
                menuItems[this.menuIndex].classList.add('e-focused');
                menuItems[this.menuIndex].focus();
            }
        }
    };
    RibbonBackstage.prototype.updatePopupPositionOnRtl = function (enableRtl) {
        var popupStyle = this.popupHTMLElement.style;
        if (enableRtl) {
            popupStyle.right = popupStyle.left;
            popupStyle.left = 'unset';
        }
        else {
            popupStyle.left = popupStyle.right;
            popupStyle.right = 'unset';
        }
    };
    RibbonBackstage.prototype.createBackstageMenu = function (menuOptions, isFooter) {
        var _this = this;
        var wrapperEle = this.popupHTMLElement.querySelector('#' + this.parent.element.id + '_wrapper');
        if (!wrapperEle) {
            this.menuWrapper = this.parent.createElement('div', {
                id: this.parent.element.id + '_wrapper',
                className: RIBBON_BACKSTAGE_MENU_WRAPPER
            });
            this.popupHTMLElement.appendChild(this.menuWrapper);
        }
        if (menuOptions.backButton.visible && !isFooter) {
            var closeBtnEle = this.parent.createElement('button', {
                id: this.parent.element.id + '_close',
                className: 'e-ribbon-close-btn'
            });
            this.closeBtn = new Button({
                content: menuOptions.backButton.text,
                iconCss: menuOptions.backButton.iconCss ? menuOptions.backButton.iconCss : BACKSTAGE_CLOSE_ICON,
                enableRtl: this.parent.enableRtl
            }, closeBtnEle);
            this.menuWrapper.append(closeBtnEle);
            closeBtnEle.onclick = function () {
                _this.popupHTMLElement.classList.remove(RIBBON_BACKSTAGE_OPEN);
                _this.hideBackstage();
                _this.isBackButtonClicked = true;
            };
        }
        var itemsWrapperEle = this.popupHTMLElement.querySelector('#' + this.parent.element.id + '_itemswrapper');
        if (!itemsWrapperEle) {
            this.itemsWrapperEle = this.parent.createElement('div', {
                id: this.parent.element.id + '_itemswrapper',
                className: RIBBON_BACKSTAGE_ITEMS_WRAPPER
            });
            this.menuWrapper.append(this.itemsWrapperEle);
        }
        var ulFooterElem;
        if (isFooter) {
            ulFooterElem = this.parent.createElement('ul', {
                id: this.parent.element.id + RIBBON_FOOTER_MENU_LIST
            });
            this.itemsWrapperEle.appendChild(ulFooterElem);
        }
        else {
            this.ulMenuElem = this.parent.createElement('ul', {
                id: this.parent.element.id + RIBBON_MENU_LIST
            });
            this.itemsWrapperEle.appendChild(this.ulMenuElem);
        }
        if (!isFooter) {
            this.menuCtrl = new Menu({
                orientation: 'Vertical',
                enableRtl: this.parent.enableRtl,
                cssClass: RIBBON_BACKSTAGE_MENU,
                items: this.cloneMenuItem(menuOptions.items),
                select: this.menuSelect.bind(this, menuOptions)
            }, this.ulMenuElem);
        }
        else {
            this.footerMenuCtrl = new Menu({
                orientation: 'Vertical',
                enableRtl: this.parent.enableRtl,
                cssClass: RIBBON_BACKSTAGE_MENU,
                items: this.cloneFooterMenuItem(menuOptions.items),
                select: this.menuSelect.bind(this, menuOptions)
            }, ulFooterElem);
        }
    };
    RibbonBackstage.prototype.cloneMenuItem = function (items) {
        var itemsList = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[parseInt(i.toString(), 10)];
            if (item.isFooter) {
                continue;
            }
            else {
                itemsList.push({
                    id: item.id,
                    iconCss: item.iconCss,
                    separator: item.separator,
                    text: item.text
                });
            }
        }
        return itemsList;
    };
    RibbonBackstage.prototype.cloneFooterMenuItem = function (items) {
        var itemsList = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[parseInt(i.toString(), 10)];
            if (!item.isFooter) {
                continue;
            }
            else {
                itemsList.push({
                    id: item.id,
                    iconCss: item.iconCss,
                    separator: item.separator,
                    text: item.text
                });
            }
        }
        return itemsList;
    };
    RibbonBackstage.prototype.createBackStageContent = function (itemId, content) {
        var templateName = 'backstageContent';
        this.clearTemplate([templateName]);
        if (!this.backstageContentEle) {
            this.backstageContentEle = this.parent.createElement('div', {
                id: itemId + CONTENT_ID,
                className: RIBBON_BACKSTAGE_CONTENT
            });
        }
        else {
            this.backstageContentEle.innerHTML = '';
            this.backstageContentEle.id = itemId + CONTENT_ID;
        }
        var templateFunction = getTemplateFunction(content);
        append(templateFunction({}, this, templateName, 'backstageContent', this.parent.isStringTemplate), this.backstageContentEle);
        if (content) {
            this.popupHTMLElement.append(this.backstageContentEle);
        }
        this.renderReactTemplates();
        return templateFunction;
    };
    RibbonBackstage.prototype.createBackStageTemplate = function (template) {
        var templateName = 'backstageTemplate';
        this.clearTemplate([templateName]);
        this.backstageTempEle = this.parent.createElement('div', {
            id: this.parent.element.id + RIBBON_BACKSTAGE_MENU_ID + '_template',
            className: RIBBON_BACKSTAGE_TEMPLATE
        });
        var templateFunction = getTemplateFunction(template);
        append(templateFunction({}, this, templateName, 'backstageTemplate', this.parent.isStringTemplate), this.backstageTempEle);
        this.popupHTMLElement.append(this.backstageTempEle);
        this.renderReactTemplates();
        return templateFunction;
    };
    RibbonBackstage.prototype.menuSelect = function (menuOptions, args) {
        for (var i = 0; i < menuOptions.items.length; i++) {
            var item = menuOptions.items[parseInt(i.toString(), 10)];
            if (item.text === args.item.text) {
                this.contentItem = item;
                this.menuIndex = i;
                break;
            }
        }
        this.createBackStageContent(args.item.id, this.contentItem.content);
        var eventArgs = { cancel: false, target: args.element,
            item: this.contentItem, isBackButton: this.isBackButtonClicked };
        if (this.contentItem.backStageItemClick) {
            this.contentItem.backStageItemClick.call(this, eventArgs);
        }
        if (eventArgs.cancel) {
            return;
        }
    };
    /**
     * setRtl
     *
     * @param {commonProperties} commonProp - Get the common property of ribbon.
     * @returns {void}
     * @hidden
     */
    RibbonBackstage.prototype.setCommonProperties = function (commonProp) {
        if (this.backstageButton) {
            this.backstageButton.setProperties(commonProp);
            if (this.popupEle) {
                this.popupEle.setProperties(commonProp);
                if (this.popupHTMLElement) {
                    this.updatePopupPositionOnRtl(commonProp.enableRtl);
                }
                if (this.menuCtrl) {
                    this.menuCtrl.setProperties(commonProp);
                    if (this.closeBtn) {
                        this.closeBtn.setProperties(commonProp);
                    }
                }
                if (this.footerMenuCtrl) {
                    this.footerMenuCtrl.setProperties(commonProp);
                }
            }
        }
    };
    /**
     * Update Backstage menu
     *
     * @param {BackStageMenuModel} backStageOptions - Gets the property of backstage menu.
     * @returns {void}
     * @hidden
     */
    RibbonBackstage.prototype.updateBackStageMenu = function (backStageOptions) {
        if (backStageOptions.visible) {
            if (this.backstageButton) {
                if (backStageOptions.text) {
                    this.backstageButton.setProperties({
                        content: backStageOptions.text
                    });
                    this.parent.tabObj.element.style.setProperty(RIBBON_FILE_MENU_WIDTH, this.backstageButtonEle.offsetWidth + 'px');
                }
                if (this.popupEle) {
                    this.popupEle.setProperties({
                        height: backStageOptions.height,
                        width: backStageOptions.width,
                        target: backStageOptions.target || this.parent.element
                    });
                }
                if (backStageOptions.template) {
                    if (this.backstageTempEle) {
                        remove(this.backstageTempEle);
                        this.backstageTempEle = null;
                    }
                    this.createBackStageTemplate(backStageOptions.template);
                }
                else {
                    if (this.menuCtrl) {
                        this.menuCtrl.setProperties({
                            items: this.cloneMenuItem(backStageOptions.items)
                        });
                    }
                    if (this.footerMenuCtrl) {
                        this.footerMenuCtrl.setProperties({
                            items: this.cloneFooterMenuItem(backStageOptions.items)
                        });
                    }
                    else {
                        var footerItemCount = 0;
                        var itemCount = 0;
                        for (var i = 0; i < backStageOptions.items.length; i++) {
                            var item = backStageOptions.items[parseInt(i.toString(), 10)];
                            if (item.isFooter) {
                                footerItemCount++;
                            }
                            else {
                                itemCount++;
                            }
                        }
                        if (itemCount > 0) {
                            this.createBackstageMenu(backStageOptions, false);
                        }
                        if (footerItemCount > 0) {
                            this.createBackstageMenu(backStageOptions, true);
                        }
                    }
                }
                this.removeBackstageMenuTooltip();
                this.removeBackstageMenuKeyTip();
                this.addBackStageMenuTooltip(backStageOptions);
                this.addBackStageMenuKeyTip(backStageOptions);
            }
            else {
                this.createBackStage(backStageOptions);
            }
        }
        else if (this.backstageButton) {
            this.destroyDDB();
        }
        this.parent.tabObj.refreshActiveTabBorder();
    };
    RibbonBackstage.prototype.destroyMenu = function () {
        if (this.menuCtrl) {
            this.menuCtrl.destroy();
            this.menuCtrl = null;
        }
    };
    RibbonBackstage.prototype.destroyDDB = function () {
        this.removeBackstageMenuTooltip();
        this.removeBackstageMenuKeyTip();
        var tabEle = this.parent.tabObj.element;
        tabEle.style.removeProperty(RIBBON_FILE_MENU_WIDTH);
        this.destroyMenu();
        this.backstageButton.destroy();
        this.backstageButton = null;
        remove(this.backstageButtonEle);
        this.backstageButtonEle = null;
        EventHandler.remove(document, 'click', this.onClickEvent);
    };
    RibbonBackstage.prototype.removeBackstageMenuTooltip = function () {
        var _this = this;
        var index = getIndex(this.parent.tooltipData, function (e) { return e.id === _this.backstageButtonEle.id; });
        if (index !== -1) {
            this.backstageButtonEle.classList.remove(RIBBON_TOOLTIP_TARGET);
            this.parent.tooltipData.splice(index, 1);
        }
    };
    RibbonBackstage.prototype.removeBackstageMenuKeyTip = function () {
        var _this = this;
        if (this.parent.keyTipElements['backstage'] && this.parent.keyTipElements['backstage'].length) {
            var index = getIndex(this.parent.keyTipElements['backstage'], function (e) { return e.id === _this.backstageButtonEle.id; });
            if (index !== -1) {
                this.parent.keyTipElements['backstage'].splice(index, 1);
            }
        }
        if (this.parent.keyTipElements['backstageMenu'] && this.parent.keyTipElements['backstageMenu'].length) {
            for (var i = 0; i < this.parent.keyTipElements['backstageMenu'].length; i++) {
                this.parent.keyTipElements['backstageMenu'].splice(i, 1);
                i--;
            }
        }
    };
    /**
     * Add items to Backstage Menu.
     *
     * @param {BackstageItemModel[]} items - Gets the items to be added.
     * @param {string} target - Gets the target item to add the items.
     * @param {boolean} isAfter - Gets the boolean value to add the items after or before the target item.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonBackstage.prototype.addBackstageItems = function (items, target, isAfter, isUniqueId) {
        for (var i = 0; i < items.length; i++) {
            var item = items[parseInt(i.toString(), 10)];
            if (item.isFooter) {
                if (isAfter) {
                    this.footerMenuCtrl.insertAfter(items, target, isUniqueId);
                }
                else {
                    this.footerMenuCtrl.insertBefore(items, target, isUniqueId);
                }
            }
            else {
                if (isAfter) {
                    this.menuCtrl.insertAfter(items, target, isUniqueId);
                }
                else {
                    this.menuCtrl.insertBefore(items, target, isUniqueId);
                }
            }
        }
        var backstageItems = [].concat(this.menuCtrl.items, this.footerMenuCtrl.items);
        var backStageOptions = this.parent.backStageMenu;
        for (var i = 0; i < backStageOptions.items.length; i++) {
            var item = backStageOptions.items[parseInt(i.toString(), 10)];
            for (var i_1 = 0; i_1 < backstageItems.length; i_1++) {
                var item1 = backstageItems[parseInt(i_1.toString(), 10)];
                if (item.text === item1.text) {
                    item1.content = item.content;
                    break;
                }
            }
        }
        this.parent.backStageMenu.setProperties({ items: backstageItems }, true);
    };
    /**
     * Remove items from Backstage Menu.
     *
     * @param {string[]} items - Gets the items to be removed.
     * @param {boolean} isUniqueId - Gets whether the target provided is uniqueId or not.
     * @returns {void}
     */
    RibbonBackstage.prototype.removeBackstageItems = function (items, isUniqueId) {
        this.menuCtrl.removeItems(items, isUniqueId);
        this.footerMenuCtrl.removeItems(items, isUniqueId);
        var backstageItems = [].concat(this.menuCtrl.items, this.footerMenuCtrl.items);
        this.parent.backStageMenu.setProperties({ items: backstageItems }, true);
    };
    /**
     * Renders the backstage dynamically.
     *
     * @returns {void}
     */
    RibbonBackstage.prototype.showBackstage = function () {
        this.popupEle.show();
    };
    /**
     * Hides the backstage dynamically.
     *
     * @returns {void}
     */
    RibbonBackstage.prototype.hideBackstage = function () {
        if (this.popupEle.element.classList.contains(RIBBON_BACKSTAGE_OPEN)) {
            this.popupEle.element.classList.remove(RIBBON_BACKSTAGE_OPEN);
        }
        this.popupEle.hide();
    };
    return RibbonBackstage;
}(Component));

/**
 * Defines the ribbon contextual tab.
 */
var RibbonContextualTab = /** @class */ (function () {
    function RibbonContextualTab(parent) {
        this.parent = parent;
    }
    RibbonContextualTab.prototype.getModuleName = function () {
        return 'ribbonContextualTab';
    };
    RibbonContextualTab.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates Contextual tab.
     *
     * @returns {void}
     * @hidden
     */
    RibbonContextualTab.prototype.addContextualTabs = function () {
        var isSelected = false;
        for (var n = 0; n < this.parent.contextualTabs.length; n++) {
            for (var i = 0; i < this.parent.contextualTabs[parseInt(n.toString(), 10)].tabs.length; i++) {
                this.parent.addTab(this.parent.contextualTabs[parseInt(n.toString(), 10)].tabs[parseInt(i.toString(), 10)]);
                var index = this.parent.tabs.length - 1;
                var tabEle = this.parent.tabObj.element;
                var toolbarEle = tabEle.querySelectorAll('.e-toolbar-item')[parseInt(index.toString(), 10)];
                toolbarEle.classList.add(RIBBON_CONTEXTUAL_TAB);
                toolbarEle.classList.add('e-hidden');
                if (this.parent.contextualTabs[parseInt(n.toString(), 10)].visible) {
                    this.parent.showTab(this.parent.contextualTabs[parseInt(n.toString(), 10)].tabs[parseInt(i.toString(), 10)].id, true);
                    if (this.parent.contextualTabs[parseInt(n.toString(), 10)].isSelected && !isSelected) {
                        this.parent.selectTab(this.parent.contextualTabs[parseInt(n.toString(), 10)].tabs[0].id);
                        isSelected = true;
                    }
                }
            }
        }
    };
    /**
     * Updates Contextual tab.
     *
     * @param {RibbonContextualTabSettingsModel} newProp - Specifies new properties.
     * @param {RibbonContextualTabSettingsModel} contextualTab - Gets the property of contextual tab.
     * @returns {void}
     * @hidden
     */
    RibbonContextualTab.prototype.updateContextualTabs = function (newProp, contextualTab) {
        if (!(isNullOrUndefined(newProp.visible))) {
            for (var i = 0; i < contextualTab.tabs.length; i++) {
                if (newProp.visible) {
                    this.parent.showTab(contextualTab.tabs[parseInt(i.toString(), 10)].id, true);
                }
                else {
                    this.parent.hideTab(contextualTab.tabs[parseInt(i.toString(), 10)].id, true);
                }
            }
        }
        if (!(isNullOrUndefined(newProp.isSelected))) {
            if (newProp.isSelected && contextualTab.visible) {
                this.parent.selectTab(contextualTab.tabs[0].id);
            }
            else {
                var tabEle = this.parent.tabObj.element;
                for (var i = 0; i < this.parent.tabs.length; i++) {
                    var toolbarEle = tabEle.querySelectorAll('.e-toolbar-item')[parseInt(i.toString(), 10)];
                    if (!(toolbarEle.classList.contains('e-hidden') || toolbarEle.classList.contains('e-disable'))) {
                        this.parent.selectTab(this.parent.tabs[parseInt(i.toString(), 10)].id);
                        break;
                    }
                }
            }
        }
        if (newProp.tabs) {
            var _loop_1 = function (key) {
                var index = parseInt(key, 10);
                var tab = this_1.parent.tabs.filter(function (e) {
                    return e.id === contextualTab.tabs[parseInt(index.toString(), 10)].id;
                })[0];
                this_1.parent.updateTab(tab);
            };
            var this_1 = this;
            for (var _i = 0, _a = Object.keys(newProp.tabs); _i < _a.length; _i++) {
                var key = _a[_i];
                _loop_1(key);
            }
        }
    };
    return RibbonContextualTab;
}());

/**
 * Defines the keytip of Ribbon.
 */
var RibbonKeyTip = /** @class */ (function () {
    function RibbonKeyTip(parent) {
        this.isKeytipPopupOpen = false;
        this.parent = parent;
    }
    RibbonKeyTip.prototype.getModuleName = function () {
        return 'ribbonKeyTip';
    };
    RibbonKeyTip.prototype.destroy = function () {
        this.parent = null;
    };
    /**
     * Creates the keytips.
     *
     * @param {string} key - get's the keytip type.
     * @returns {void}
     * @hidden
     */
    RibbonKeyTip.prototype.createKeytip = function (key) {
        if (this.parent.keyTipElements) {
            var keytipData = void 0;
            if (key === 'tab') {
                for (var i = 0; i < this.parent.tabs.length; i++) {
                    if (this.parent.keyTipElements[parseInt(i.toString(), 10)]) {
                        keytipData = this.parent.keyTipElements[parseInt(i.toString(), 10)]["" + key];
                        this.createKeyTipElement((keytipData[0].id), keytipData[0].keyTip, 'tab', 'center', 'bottom', true);
                    }
                }
                if (this.parent.keyTipElements['filemenu']) {
                    keytipData = this.parent.keyTipElements['filemenu'];
                    this.createKeyTipElement((keytipData[0].id), keytipData[0].keyTip, 'filemenu');
                }
                if (this.parent.keyTipElements['backstage']) {
                    keytipData = this.parent.keyTipElements['backstage'];
                    this.createKeyTipElement((keytipData[0].id), keytipData[0].keyTip, 'backstage');
                }
                if (this.parent.keyTipElements['collapse']) {
                    keytipData = this.parent.keyTipElements['collapse'];
                    this.createKeyTipElement((keytipData[0].id), keytipData[0].keyTip, 'collapse');
                }
                if (this.parent.keyTipElements['taboverflow']) {
                    keytipData = this.parent.keyTipElements['taboverflow'];
                    this.createKeyTipElement((keytipData[0].id), keytipData[0].keyTip, 'taboverflow');
                }
            }
            else if (key === 'popupitem') {
                if (this.parent.keyTipElements[this.parent.selectedTab]['popupitem']) {
                    var popupKeyTipData = this.parent.keyTipElements[this.parent.selectedTab]['popupitem'];
                    for (var i = 0; i < Object.keys(this.parent.keyTipElements[this.parent.selectedTab]['popupitem']).length; i++) {
                        this.createKeyTipElement((popupKeyTipData[parseInt(i.toString(), 10)].id), popupKeyTipData[parseInt(i.toString(), 10)].keyTip, 'popupitem', 'left', 'top', false, true);
                    }
                }
            }
            else if (key === 'backstageMenu') {
                if (this.parent.keyTipElements['backstageMenu']) {
                    var backstageKeyTipData = this.parent.keyTipElements['backstageMenu'];
                    for (var i = 0; i < Object.keys(this.parent.keyTipElements['backstageMenu']).length; i++) {
                        this.createKeyTipElement((backstageKeyTipData[parseInt(i.toString(), 10)].id), backstageKeyTipData[parseInt(i.toString(), 10)].keyTip, 'backstageMenu', 'left', 'center');
                    }
                }
            }
            else if (key === 'grpoverflowpopup' && this.parent.activeLayout === 'Classic') {
                if (this.parent.keyTipElements[this.parent.selectedTab]['grpoverflowpopup']) {
                    this.calculateItemPosition(key);
                }
                if (this.parent.keyTipElements[this.parent.selectedTab]['launcher']) {
                    for (var i = 0; i < Object.keys(this.parent.keyTipElements[this.parent.selectedTab]['launcher']).length; i++) {
                        keytipData = this.parent.keyTipElements[this.parent.selectedTab]['launcher'];
                        this.createKeyTipElement((keytipData[parseInt(i.toString(), 10)].id), keytipData[parseInt(i.toString(), 10)].keyTip, 'launcher', 'center', 'bottom', false, true);
                    }
                }
            }
            else {
                this.calculateItemPosition(key);
                if (this.parent.activeLayout === 'Classic') {
                    if (this.parent.keyTipElements[this.parent.selectedTab]['launcher']) {
                        for (var i = 0; i < Object.keys(this.parent.keyTipElements[this.parent.selectedTab]['launcher']).length; i++) {
                            keytipData = this.parent.keyTipElements[this.parent.selectedTab]['launcher'];
                            this.createKeyTipElement((keytipData[parseInt(i.toString(), 10)].id), keytipData[parseInt(i.toString(), 10)].keyTip, 'launcher');
                        }
                    }
                    if (this.parent.keyTipElements[this.parent.selectedTab]['grpoverflow']) {
                        for (var i = 0; i < Object.keys(this.parent.keyTipElements[this.parent.selectedTab]['grpoverflow']).length; i++) {
                            keytipData = this.parent.keyTipElements[this.parent.selectedTab]['grpoverflow'];
                            this.createKeyTipElement((keytipData[parseInt(i.toString(), 10)].id), keytipData[parseInt(i.toString(), 10)].keyTip, 'grpoverflow');
                        }
                    }
                }
                if (this.parent.activeLayout === 'Simplified') {
                    if (this.parent.keyTipElements['overflowbtn']) {
                        keytipData = this.parent.keyTipElements['overflowbtn'];
                        this.createKeyTipElement((keytipData[0].id), keytipData[0].keyTip, 'overflowbtn');
                    }
                    if (this.parent.keyTipElements[this.parent.selectedTab]['grpofbtn']) {
                        for (var i = 0; i < Object.keys(this.parent.keyTipElements[this.parent.selectedTab]['grpofbtn']).length; i++) {
                            keytipData = this.parent.keyTipElements[this.parent.selectedTab]['grpofbtn'];
                            this.createKeyTipElement((keytipData[parseInt(i.toString(), 10)].id), keytipData[parseInt(i.toString(), 10)].keyTip, 'grpofbtn');
                        }
                    }
                }
            }
        }
    };
    RibbonKeyTip.prototype.calculateItemPosition = function (key, isMethod, keyTip) {
        if (isMethod === void 0) { isMethod = false; }
        var xOffset;
        var yOffset;
        var keytipData = this.parent.keyTipElements[parseInt(this.parent.selectedTab.toString(), 10)]["" + key];
        if (keytipData) {
            for (var i = 0; i < Object.keys(this.parent.keyTipElements[parseInt(this.parent.selectedTab.toString(), 10)]["" + key]).length; i++) {
                if ((isMethod && (keytipData[parseInt(i.toString(), 10)].keyTip === keyTip)) || !isMethod) {
                    var itemID = keytipData[parseInt(i.toString(), 10)].id;
                    if (keytipData[parseInt(i.toString(), 10)].id.indexOf('_grpbtn') !== -1) {
                        itemID = keytipData[parseInt(i.toString(), 10)].id.replace(/_grpbtn\d+/, '');
                    }
                    var itemProp = getItem(this.parent.tabs, itemID);
                    if (itemProp && itemProp.group.orientation === 'Column' && itemProp.collection.items.length > 1 && this.parent.activeLayout !== 'Simplified') {
                        if (itemProp.itemIndex === 0) {
                            xOffset = 'center';
                            yOffset = 'top';
                        }
                        else if (itemProp.itemIndex === 1) {
                            xOffset = 'center';
                            yOffset = 'center';
                        }
                        else {
                            xOffset = 'center';
                            yOffset = 'bottom';
                        }
                    }
                    else if (itemProp && itemProp.group.orientation === 'Row' && itemProp.group.collections.length > 1 && this.parent.activeLayout !== 'Simplified') {
                        if (itemProp.collectionIndex === 0) {
                            xOffset = 'center';
                            yOffset = 'top';
                        }
                        else {
                            xOffset = 'center';
                            yOffset = 'bottom';
                        }
                    }
                    if (key === 'item') {
                        this.createKeyTipElement((keytipData[parseInt(i.toString(), 10)].id), keytipData[parseInt(i.toString(), 10)].keyTip, key, xOffset, yOffset);
                    }
                    else {
                        this.createKeyTipElement((keytipData[parseInt(i.toString(), 10)].id), keytipData[parseInt(i.toString(), 10)].keyTip, key, xOffset, yOffset, false, true);
                    }
                }
            }
        }
    };
    RibbonKeyTip.prototype.createKeyTipElement = function (id, keyTip, type, xOffset, yOffset, isTab, isPopUpItem) {
        if (xOffset === void 0) { xOffset = 'center'; }
        if (yOffset === void 0) { yOffset = 'bottom'; }
        if (isTab === void 0) { isTab = false; }
        if (isPopUpItem === void 0) { isPopUpItem = false; }
        var keyEle = document.querySelector('#' + id);
        var isPopUpPresent = false;
        var splitBtnID;
        if (isTab) {
            keyEle = document.querySelector('#' + id + HEADER_ID);
        }
        if (keyEle) {
            if (keyEle.closest('.e-ribbon-group-overflow-ddb')) {
                isPopUpPresent = true;
            }
            if ((isTab && isPopUpItem) && keyEle.closest('.e-toolbar-pop')) {
                isPopUpPresent = true;
            }
            if (keyEle.closest('.e-split-btn-wrapper')) {
                var splitBtn = keyEle.closest('.e-split-btn-wrapper');
                splitBtnID = splitBtn.closest('.e-ribbon-item').id;
            }
            else {
                if (keyEle.closest('.e-colorpicker-wrapper')) {
                    keyEle = keyEle.closest('.e-colorpicker-wrapper');
                    splitBtnID = keyEle.closest('.e-ribbon-item').id;
                }
            }
        }
        if ((keyEle && keyEle.offsetParent) || (isTab && isPopUpItem)) {
            if ((isPopUpItem && isPopUpPresent) || !isPopUpItem) {
                var keytipElement = this.parent.createElement('div', {
                    className: RIBBON_KEYTIP,
                    id: id + RIBBON_KEYTIP_ID,
                    attrs: { role: 'dialog', 'aria-label': 'ribbon-keytip' }
                });
                document.body.append(keytipElement);
                var keytipPopup = new Popup(keytipElement, {
                    relateTo: '#' + (isTab ? id + HEADER_ID : splitBtnID ? splitBtnID : id),
                    content: keyTip,
                    collision: { X: 'fit', Y: 'flip' },
                    targetType: 'relative',
                    position: { X: xOffset, Y: yOffset },
                    enableRtl: this.parent.enableRtl,
                    actionOnScroll: 'hide'
                });
                keytipPopup.show();
                this.calculateKeyTipPosition(keyEle, keytipElement, type, yOffset);
                this.parent.isKeytipOpen = true;
            }
        }
    };
    RibbonKeyTip.prototype.calculateKeyTipPosition = function (itemEle, keytipElement, type, yOffset) {
        var position = itemEle.getBoundingClientRect();
        if (type === 'backstageMenu') {
            keytipElement.style.top = position.top + ((keytipElement.offsetHeight) / 2) + 'px';
            keytipElement.style.left = position.left + (itemEle.offsetWidth / 5) + 'px';
        }
        else {
            if (type !== 'popupitem') {
                keytipElement.style.left = position.left + (position.width - keytipElement.offsetWidth) / 2 + 'px';
            }
        }
        if (type === 'filemenu' || type === 'backstage') {
            keytipElement.style.top = position.top + ((itemEle.offsetHeight - (itemEle.offsetHeight / 3)) + (keytipElement.offsetHeight / 6)) + 'px';
        }
        else if ((type === 'item' && yOffset === 'top')) {
            keytipElement.style.top = (position.top - (itemEle.offsetHeight) / 2) + 'px';
        }
    };
    /**
     * Performs keytip action.
     *
     * @param {string} keyPress - Gets the keytip text.
     * @param {boolean} isMethod - Gets the isMethod.
     * @returns {void}
     * @hidden
     */
    RibbonKeyTip.prototype.keytipPress = function (keyPress, isMethod) {
        var _this = this;
        if (isMethod === void 0) { isMethod = false; }
        this.isKeytipPresent = false;
        for (var i = 0; ((i < Object.keys(this.parent.keyTipElements).length) && !this.isKeytipPresent); i++) {
            if (this.parent.keyTipElements[parseInt(i.toString(), 10)]) {
                for (var j = 0; ((j < Object.keys(this.parent.keyTipElements[parseInt(i.toString(), 10)]).length) &&
                    !this.isKeytipPresent); j++) {
                    var keytipData = this.parent.keyTipElements[parseInt(i.toString(), 10)][Object.
                        keys(this.parent.keyTipElements[parseInt(i.toString(), 10)])[parseInt(j.toString(), 10)]];
                    for (var k = 0; ((k < Object.keys(keytipData).length) && !this.isKeytipPresent); k++) {
                        if (keyPress.toUpperCase() === keytipData[parseInt(k.toString(), 10)].keyTip) {
                            var keyTipElement = document.querySelector('#' + keytipData[parseInt(k.toString(), 10)].id + RIBBON_KEYTIP_ID);
                            if (keyTipElement || isMethod) {
                                this.isKeytipPresent = true;
                                this.removeKeytip();
                                if (keytipData[parseInt(k.toString(), 10)].type === 'tab') {
                                    if (i !== this.parent.selectedTab) {
                                        this.parent.tabObj.select(i);
                                        setTimeout(function () {
                                            var tabOverflow = _this.parent.tabObj.element.querySelector('.e-nav-active');
                                            if (tabOverflow) {
                                                tabOverflow.click();
                                            }
                                            _this.createKeytip('item');
                                        }, 600);
                                    }
                                    else {
                                        this.createKeytip('item');
                                    }
                                }
                                else {
                                    if (keytipData[parseInt(k.toString(), 10)].type === 'item' || keytipData[parseInt(k.toString(), 10)].type === 'grpoverflowpopup' || keytipData[parseInt(k.toString(), 10)].type === 'popupitem') {
                                        if (document.getElementById(keytipData[parseInt(k.toString(), 10)].id) && document.getElementById(keytipData[parseInt(k.toString(), 10)].id).classList.contains('e-ribbon-group-button')) {
                                            document.getElementById(keytipData[parseInt(k.toString(), 10)].id).click();
                                        }
                                        else {
                                            var itemProp = void 0;
                                            if ((keytipData[parseInt(k.toString(), 10)].id).indexOf('_popupButton') !== -1) {
                                                var galleryID = keytipData[parseInt(k.toString(), 10)].id.replace(/_popupButton/g, '');
                                                itemProp = getItem(this.parent.tabs, galleryID);
                                            }
                                            else {
                                                itemProp = getItem(this.parent.tabs, keytipData[parseInt(k.toString(), 10)].id);
                                            }
                                            if (!isMethod || (isMethod && itemProp.tabIndex === this.parent.selectedTab)) {
                                                this.clickItems(itemProp, keytipData, k, false, isMethod);
                                            }
                                        }
                                    }
                                    else if (keytipData[parseInt(k.toString(), 10)].type === 'grpoverflow' || keytipData[parseInt(k.toString(), 10)].type === 'grpofbtn' || keytipData[parseInt(k.toString(), 10)].type === 'launcher') {
                                        var keyEle = document.querySelector('#' + keytipData[parseInt(k.toString(), 10)].id);
                                        this.removeKeytip();
                                        if (keyEle) {
                                            var groupID = keytipData[parseInt(k.toString(), 10)].id;
                                            if (isMethod) {
                                                if (keytipData[parseInt(k.toString(), 10)].id.indexOf('_launcher') !== -1 || keytipData[parseInt(k.toString(), 10)].id.indexOf('_sim_grp_overflow') !== -1 || keytipData[parseInt(k.toString(), 10)].id.indexOf('_overflow_dropdown') !== -1) {
                                                    groupID = keytipData[parseInt(k.toString(), 10)].id.replace(/_launcher|_sim_grp_overflow|_overflow_dropdown/g, '');
                                                    var itemProp = getGroup(this.parent.tabs, groupID);
                                                    if (itemProp.tabIndex === this.parent.selectedTab) {
                                                        this.clickItems(itemProp, keytipData, k, true, isMethod, keyEle);
                                                    }
                                                }
                                            }
                                            else {
                                                this.clickItems(null, keytipData, k, true, isMethod, keyEle);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (this.parent.keyTipElements) {
                    this.commonItemsKeyTipPress(keyPress, Object.keys(this.parent.keyTipElements)[parseInt(i.toString(), 10)], isMethod);
                }
            }
        }
    };
    RibbonKeyTip.prototype.clickItems = function (itemProp, keytipData, k, isGroupItems, isMethod, keyEle) {
        if (isGroupItems) {
            keyEle.click();
            if (!(keytipData[parseInt(k.toString(), 10)].type === 'launcher')) {
                this.isKeytipPopupOpen = true;
                if (keytipData[parseInt(k.toString(), 10)].type === 'grpoverflow') {
                    this.createKeytip('grpoverflowpopup');
                }
                else {
                    this.createKeytip('popupitem');
                }
            }
        }
        else {
            var itemID = keytipData[parseInt(k.toString(), 10)].id;
            if (document.querySelector('#' + itemID) && isMethod) {
                if (this.parent.activeLayout === 'Simplified') {
                    if (document.querySelector('#' + itemID).closest('#' + itemProp.group.id + '_sim_grp_overflow-popup') && document.querySelector('#' + itemID).closest('#' + itemProp.group.id + '_sim_grp_overflow-popup').classList.contains('e-popup-close')) {
                        document.querySelector('#' + itemProp.group.id + '_sim_grp_overflow').click();
                    }
                    else if (document.querySelector('#' + itemID).closest('#' + this.parent.tabObj.element.id + OVRLOF_BUTTON_ID + '-popup') && document.querySelector('#' + itemID).closest('#' + this.parent.tabObj.element.id + OVRLOF_BUTTON_ID + '-popup').classList.contains('e-popup-close')) {
                        document.querySelector('#' + this.parent.tabObj.element.id + OVRLOF_BUTTON_ID).click();
                    }
                }
                else {
                    if (document.querySelector('#' + itemID).closest('#' + itemProp.group.id + OVERFLOW_ID + DROPDOWN_ID + '-popup') && document.querySelector('#' + itemID).closest('#' + itemProp.group.id + OVERFLOW_ID + DROPDOWN_ID + '-popup').classList.contains('e-popup-close')) {
                        document.querySelector('#' + itemProp.group.id + OVERFLOW_ID + DROPDOWN_ID).click();
                    }
                }
            }
            var itemType = this.parent.getItemModuleName(itemProp.item);
            switch (itemType) {
                case 'btn':
                    this.parent.ribbonButtonModule.click(itemID);
                    break;
                case 'dropdown-btn':
                    this.parent.ribbonDropDownModule.toggle(itemID);
                    break;
                case 'split-btn':
                    this.parent.ribbonSplitButtonModule.toggle(itemID);
                    break;
                case 'checkbox':
                    this.parent.ribbonCheckBoxModule.click(itemID);
                    break;
                case 'colorpicker':
                    this.parent.ribbonColorPickerModule.toggle(itemID);
                    break;
                case 'combobox': {
                    var itemEle_1 = document.querySelector('#' + itemID);
                    if (this.isInteractableElement(itemEle_1)) {
                        setTimeout(function () {
                            itemEle_1.focus();
                        }, 100);
                    }
                    break;
                }
                case 'gallery': {
                    var galleryEle = document.querySelector('#' + itemID);
                    if (this.isInteractableElement(galleryEle)) {
                        galleryEle.click();
                    }
                    break;
                }
                case 'template': {
                    var templateEle = document.querySelector('#' + itemID);
                    if (this.isInteractableElement(templateEle)) {
                        templateEle.focus();
                    }
                    break;
                }
                case 'group-btn': {
                    var itemElement = document.querySelector('#' + itemID);
                    if (this.isInteractableElement(itemElement)) {
                        var item = getInstance(itemElement, DropDownButton);
                        item.toggle();
                        for (var i = 0; i < itemProp.item.groupButtonSettings.items.length; i++) {
                            if (itemProp.item.groupButtonSettings.items[parseInt(i.toString(), 10)].keyTip) {
                                this.createKeyTipElement(itemID + (RIBBON_GROUP_BUTTON_ID + i), itemProp.item.groupButtonSettings.items[parseInt(i.toString(), 10)].keyTip, 'item');
                            }
                        }
                    }
                    break;
                }
            }
        }
    };
    RibbonKeyTip.prototype.isInteractableElement = function (element) {
        return element && !element.closest('.e-ribbon-item').classList.contains('e-disabled');
    };
    RibbonKeyTip.prototype.commonItemsKeyTipPress = function (keyPress, key, isMethod) {
        var _this = this;
        if (this.parent.keyTipElements["" + key]) {
            var isKeyPressed = false;
            var keytipData = this.parent.keyTipElements["" + key];
            var keyEle = void 0;
            var keytipElement = void 0;
            if (keytipData) {
                if (key === 'backstageMenu') {
                    for (var i = 0; i < Object.keys(this.parent.keyTipElements["" + key]).length; i++) {
                        if (keytipData[parseInt(i.toString(), 10)].keyTip === keyPress.toUpperCase()) {
                            keyEle = document.querySelector('#' + keytipData[parseInt(i.toString(), 10)].id);
                            keytipElement = document.querySelector('#' + keyEle.id + RIBBON_KEYTIP_ID);
                            if (keytipElement || isMethod) {
                                isKeyPressed = true;
                                if (isMethod && document.querySelector('.e-ribbon-backstage-popup').classList.contains('e-popup-close')) {
                                    this.parent.tabObj.element.querySelector('.e-ribbon-backstage').click();
                                }
                                break;
                            }
                        }
                    }
                }
                else {
                    if (keytipData[0] && keytipData[0].keyTip === keyPress.toUpperCase()) {
                        keyEle = document.querySelector('#' + keytipData[0].id);
                        keytipElement = document.querySelector('#' + keytipData[0].id + RIBBON_KEYTIP_ID);
                        if (keytipElement || isMethod) {
                            isKeyPressed = true;
                        }
                    }
                }
            }
            if (isKeyPressed) {
                this.removeKeytip();
                this.isKeytipPresent = true;
                if (keyEle) {
                    keyEle.click();
                    if (key === 'backstage') {
                        this.createKeytip('backstageMenu');
                    }
                    else if (key === 'overflowbtn') {
                        this.isKeytipPopupOpen = true;
                        this.createKeytip('popupitem');
                    }
                    else if (key === 'taboverflow') {
                        setTimeout(function () {
                            for (var i = 0; i < Object.keys(_this.parent.keyTipElements).length; i++) {
                                if (_this.parent.keyTipElements[parseInt(i.toString(), 10)]) {
                                    var keytipData_1 = _this.parent.keyTipElements[parseInt(i.toString(), 10)]['tab'];
                                    _this.createKeyTipElement((keytipData_1[0].id), keytipData_1[0].keyTip, 'tab', 'center', 'bottom', true, true);
                                }
                            }
                        }, 600);
                    }
                }
            }
        }
    };
    /**
     * Removes the keytip.
     *
     * @param {string} key - Gets the keyboard key element.
     * @returns {void}
     * @hidden
     */
    RibbonKeyTip.prototype.removeKeytip = function (key) {
        var _this = this;
        var keyTipItems = document.querySelectorAll('.e-ribbon-keytip');
        var isKeyTipExist = false;
        this.parent.keysPress = '';
        var _loop_1 = function (i) {
            var keyTipItem = keyTipItems[parseInt(i.toString(), 10)];
            if (key === 'Escape' && this_1.parent.keyTipElements && this_1.parent.keyTipElements[this_1.parent.selectedTab]) {
                for (var j = 0; j < Object.keys(this_1.parent.keyTipElements[this_1.parent.selectedTab]).length; j++) {
                    var keyText = (Object.keys(this_1.parent.keyTipElements[parseInt(this_1.parent.selectedTab.toString(), 10)]))[parseInt(j.toString(), 10)];
                    var keyTipElement = this_1.parent.keyTipElements[parseInt(this_1.parent.selectedTab.toString(), 10)];
                    var index = getIndex(keyTipElement["" + keyText], function (e) {
                        return e.id +
                            RIBBON_KEYTIP_ID === keyTipItems[parseInt(i.toString(), 10)].id;
                    });
                    if (index !== -1) {
                        if ((keyText === 'item' && !(this_1.isKeytipPopupOpen)) || (keyText === 'grpoverflow' && this_1.parent.activeLayout === 'Classic')) {
                            this_1.createKeytip('tab');
                            key = '';
                            isKeyTipExist = true;
                            break;
                        }
                        else if (this_1.isKeytipPopupOpen) {
                            if ((keyText === 'popupitem' && this_1.parent.activeLayout === 'Simplified') || (keyText === 'grpoverflowpopup' && this_1.parent.activeLayout === 'Classic')) {
                                this_1.createKeytip('item');
                                key = '';
                                isKeyTipExist = true;
                                break;
                            }
                        }
                    }
                }
                for (var n = 0; n < Object.keys(this_1.parent.keyTipElements).length; n++) {
                    if (this_1.parent.keyTipElements[parseInt(n.toString(), 10)]) {
                        var keytipData = this_1.parent.keyTipElements[parseInt(n.toString(), 10)]['tab'];
                        for (var j = 0; j < Object.keys(keytipData).length; j++) {
                            if (keyTipItem.id === keytipData[0].id + RIBBON_KEYTIP_ID) {
                                if (document.querySelector('#' + keytipData[0].id + HEADER_ID).closest('.e-toolbar-pop')) {
                                    var tabOverflow = this_1.parent.tabObj.element.querySelector('.e-nav-active');
                                    tabOverflow.click();
                                    setTimeout(function () {
                                        _this.createKeytip('tab');
                                    }, 600);
                                    key = '';
                                    isKeyTipExist = true;
                                    break;
                                }
                            }
                        }
                        if (isKeyTipExist) {
                            break;
                        }
                    }
                }
                if (!isKeyTipExist && this_1.parent.keyTipElements['backstageMenu']) {
                    var index = getIndex(this_1.parent.keyTipElements['backstageMenu'], function (e) { return e.id + RIBBON_KEYTIP_ID === keyTipItems[parseInt(i.toString(), 10)].id; });
                    if (index !== -1) {
                        this_1.createKeytip('tab');
                        key = '';
                        isKeyTipExist = true;
                    }
                }
            }
            if (keyTipItem) {
                remove(keyTipItem);
            }
        };
        var this_1 = this;
        for (var i = 0; i < keyTipItems.length; i++) {
            _loop_1(i);
        }
        this.isKeytipPopupOpen = false;
        if (!isKeyTipExist) {
            this.parent.isKeytipOpen = false;
        }
    };
    /**
     * Shows the Keytip dynamically.
     *
     * @param  {string} keyAction - Item for which the tooltip is to be shown.
     * @returns {void}
     */
    RibbonKeyTip.prototype.showKeyTips = function (keyAction) {
        if (this.parent.enableKeyTips) {
            if (keyAction) {
                this.keytipPress(keyAction, true);
            }
            else {
                this.createKeytip('tab');
            }
        }
    };
    /**
     * Hides the Keytip dynamically.
     *
     * @returns {void}
     */
    RibbonKeyTip.prototype.hideKeyTips = function () {
        this.removeKeytip();
    };
    return RibbonKeyTip;
}());

export { BACKSTAGE_CLOSE_ICON, BackStageMenu, BackstageBackButton, BackstageItem, COLLAPSE_BUTTON_ID, COLLECTION_ID, CONTAINER_ID, CONTENT_ID, DISABLED_CSS, DROPDOWNBUTTON, DROPDOWNBUTTON_HIDE, DROPDOWN_ID, DisplayMode, EXPAND_COLLAPSE_ICON, FileMenuSettings, GROUPOF_BUTTON_ID, GROUP_ID, HEADER_ID, HIDE_CSS, HORIZONTAL_SCROLLBAR, ITEM_ID, ITEM_VERTICAL_CENTER, ItemOrientation, LAUNCHER_ID, OVERFLOW_ICON, OVERFLOW_ID, OVRLOF_BUTTON_ID, RIBBON_BACKSTAGE, RIBBON_BACKSTAGE_CONTENT, RIBBON_BACKSTAGE_ITEMS_WRAPPER, RIBBON_BACKSTAGE_MENU, RIBBON_BACKSTAGE_MENU_ID, RIBBON_BACKSTAGE_MENU_WRAPPER, RIBBON_BACKSTAGE_OPEN, RIBBON_BACKSTAGE_POPUP, RIBBON_BACKSTAGE_POPUP_ID, RIBBON_BACKSTAGE_TEMPLATE, RIBBON_BACKSTAGE_TEXT_MENU, RIBBON_COLLAPSE_BUTTON, RIBBON_COLLAPSIBLE, RIBBON_COLLECTION, RIBBON_COLUMN, RIBBON_CONTENT_HEIGHT, RIBBON_CONTEXTUAL_TAB, RIBBON_CONTROL, RIBBON_EXPAND_BUTTON, RIBBON_FILE_MENU_ID, RIBBON_FILE_MENU_LIST, RIBBON_FILE_MENU_WIDTH, RIBBON_FOOTER_MENU_LIST, RIBBON_GROUP, RIBBON_GROUP_BUTTON, RIBBON_GROUP_BUTTON_CONTENT, RIBBON_GROUP_BUTTON_ID, RIBBON_GROUP_BUTTON_OVERFLOW_POPUP, RIBBON_GROUP_CONTAINER, RIBBON_GROUP_CONTENT, RIBBON_GROUP_HEADER, RIBBON_GROUP_OF_BUTTON, RIBBON_GROUP_OVERFLOW, RIBBON_GROUP_OVERFLOW_DDB, RIBBON_HELP_PANE_TEMPLATE_ID, RIBBON_HELP_PANE_TEMPLATE_WIDTH, RIBBON_HELP_TEMPLATE, RIBBON_HOVER, RIBBON_ITEM, RIBBON_KEYTIP, RIBBON_KEYTIP_ID, RIBBON_LARGE_ITEM, RIBBON_LAUNCHER, RIBBON_LAUNCHER_ICON, RIBBON_LAUNCHER_ICON_ELE, RIBBON_MEDIUM_ITEM, RIBBON_MENU_LIST, RIBBON_MINIMIZE, RIBBON_MULTIPLE_BUTTON_SELECTION, RIBBON_OF_GROUP_CONTAINER, RIBBON_OF_TAB_CONTAINER, RIBBON_OVERALL_OF_BUTTON, RIBBON_OVERFLOW, RIBBON_OVERFLOW_HEADER, RIBBON_OVERFLOW_TARGET, RIBBON_POPUP_CONTROL, RIBBON_POPUP_OPEN, RIBBON_ROW, RIBBON_SELECTED_CONTENT, RIBBON_SIMPLIFIED_MODE, RIBBON_SINGLE_BUTTON_SELECTION, RIBBON_SMALL_ITEM, RIBBON_TAB, RIBBON_TAB_ACTIVE, RIBBON_TAB_ITEM, RIBBON_TEMPLATE, RIBBON_TEXT_CONTAINER, RIBBON_TOOLTIP, RIBBON_TOOLTIP_CONTAINER, RIBBON_TOOLTIP_CONTENT, RIBBON_TOOLTIP_ICON, RIBBON_TOOLTIP_TARGET, RIBBON_TOOLTIP_TITLE, RTL_CSS, Ribbon, RibbonBackstage, RibbonButton, RibbonButtonSettings, RibbonCheckBox, RibbonCheckBoxSettings, RibbonCollection, RibbonColorPicker, RibbonColorPickerSettings, RibbonComboBox, RibbonComboBoxSettings, RibbonContextualTab, RibbonContextualTabSettings, RibbonDropDown, RibbonDropDownSettings, RibbonFileMenu, RibbonGallery, RibbonGalleryGroup, RibbonGalleryItem, RibbonGallerySettings, RibbonGroup, RibbonGroupButton, RibbonGroupButtonItem, RibbonGroupButtonSelection, RibbonGroupButtonSettings, RibbonItem, RibbonItemSize, RibbonItemType, RibbonKeyTip, RibbonLayout, RibbonSplitButton, RibbonSplitButtonSettings, RibbonTab, RibbonTooltip, SPACE, TAB_CONTENT, TAB_ID, VERTICAL_DDB, createTooltip, destroyControl, destroyTooltip, getCollection, getGroup, getIndex, getItem, getItemElement, getTemplateFunction, isTooltipPresent, setCustomAttributes, setToolTipContent, updateCommonProperty, updateControlDisabled, updateTooltipProp };
//# sourceMappingURL=ej2-ribbon.es5.js.map
