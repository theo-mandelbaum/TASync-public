import { Property, ChildProperty, Event, getUniqueID, isNullOrUndefined, addClass, removeClass, prepend, formatUnit, getValue, attributes, Browser, append, L10n, select, compile, EventHandler, KeyboardEvents, closest, Animation, detach, Complex, Collection, NotifyPropertyChanges, Component } from '@syncfusion/ej2-base';
import { Input } from '@syncfusion/ej2-inputs';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { showSpinner, hideSpinner, createSpinner, Popup } from '@syncfusion/ej2-popups';
import { Grid, VirtualScroll, Group, Edit, Sort, Resize } from '@syncfusion/ej2-grids';

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
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var DROPDOWNICON = 'e-input-group-icon e-multicolumn-list-icon e-icons';
var CONTENT = 'e-popup-content';
var ICONANIMATION = 'e-icon-anim';
var NODATA = 'e-nodata';
var DISABLED = 'e-disabled';
var INPUTFOCUS = 'e-input-focus';
var MULTICOLUMNLIST = 'e-multicolumn-list';
var HIDDENELEMENT = 'e-multicolumn-list-hidden';
var MULTICOLUMNGRID = 'e-multicolumn-grid';
var MultiColumnGrid = /** @class */ (function () {
    function MultiColumnGrid() {
    }
    /**
     * Injecting required modules for component.
     *
     * @returns {void}
     * @private
     */
    MultiColumnGrid.prototype.InjectModules = function () {
        Grid.Inject(VirtualScroll, Group, Edit, Sort, Resize);
    };
    return MultiColumnGrid;
}());
/**
 * Defines the filter type.
 */
var FilterType;
(function (FilterType) {
    /**
     * Checks whether a value begins with the specified value.
     */
    FilterType["StartsWith"] = "StartsWith";
    /**
     * Checks whether a value ends with specified value.
     */
    FilterType["EndsWith"] = "EndsWith";
    /**
     * Checks whether a value contains with specified value.
     */
    FilterType["Contains"] = "Contains";
})(FilterType || (FilterType = {}));
/**
 * Specifies the sortOrder to sort the data source.
 */
var SortOrder;
(function (SortOrder) {
    /**
     * The datasource is not sorting. Default value is None.
     */
    SortOrder["None"] = "None";
    /**
     * The datasource is sorting with ascending order.
     */
    SortOrder["Ascending"] = "Ascending";
    /**
     * The data source is sorting with descending order.
     */
    SortOrder["Descending"] = "Descending";
})(SortOrder || (SortOrder = {}));
/**
 * Specifies the type of sorting to be applied for the columns.
 */
var SortType;
(function (SortType) {
    /**
     * Allow sorting only one column
     */
    SortType["OneColumn"] = "OneColumn";
    /**
     * Allow sorting multiple columns
     */
    SortType["MultipleColumns"] = "MultipleColumns";
})(SortType || (SortType = {}));
/**
 * Specifies the type of wrap mode to be applied for the grid cells.
 */
var WrapMode;
(function (WrapMode) {
    /**
     * Specifies that both header and content text wrapping are enabled.
     */
    WrapMode["Both"] = "Both";
    /**
     * Specifies that only content text wrapping is enabled.
     */
    WrapMode["Content"] = "Content";
    /**
     * Specifies that only header text wrapping is enabled.
     */
    WrapMode["Header"] = "Header";
})(WrapMode || (WrapMode = {}));
/**
 * The fields property maps the columns of the data table and binds the data to the component.
 */
var FieldSettings = /** @class */ (function (_super) {
    __extends(FieldSettings, _super);
    function FieldSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], FieldSettings.prototype, "text", void 0);
    __decorate([
        Property()
    ], FieldSettings.prototype, "value", void 0);
    __decorate([
        Property()
    ], FieldSettings.prototype, "groupBy", void 0);
    return FieldSettings;
}(ChildProperty));
/**
 * Specifies the number of columns and its respective fields to be displayed in the dropdown popup.
 */
var Column = /** @class */ (function (_super) {
    __extends(Column, _super);
    function Column() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Column.prototype, "field", void 0);
    __decorate([
        Property('')
    ], Column.prototype, "header", void 0);
    __decorate([
        Property('')
    ], Column.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Column.prototype, "textAlign", void 0);
    __decorate([
        Property(null)
    ], Column.prototype, "format", void 0);
    __decorate([
        Property(false)
    ], Column.prototype, "displayAsCheckBox", void 0);
    __decorate([
        Property(null)
    ], Column.prototype, "template", void 0);
    __decorate([
        Property(null)
    ], Column.prototype, "headerTemplate", void 0);
    __decorate([
        Property(null)
    ], Column.prototype, "customAttributes", void 0);
    return Column;
}(ChildProperty));
/**
 * Specifies the configuration of the columns in the popup content.
 */
var GridSettings = /** @class */ (function (_super) {
    __extends(GridSettings, _super);
    function GridSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(false)
    ], GridSettings.prototype, "enableAltRow", void 0);
    __decorate([
        Property(null)
    ], GridSettings.prototype, "rowHeight", void 0);
    __decorate([
        Property('Default')
    ], GridSettings.prototype, "gridLines", void 0);
    __decorate([
        Property(false)
    ], GridSettings.prototype, "allowTextWrap", void 0);
    __decorate([
        Property(WrapMode.Both)
    ], GridSettings.prototype, "textWrapMode", void 0);
    __decorate([
        Property(false)
    ], GridSettings.prototype, "allowResizing", void 0);
    __decorate([
        Event()
    ], GridSettings.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], GridSettings.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], GridSettings.prototype, "resizeStop", void 0);
    return GridSettings;
}(ChildProperty));
/**
 * The `MultiColumnComboBox` allows the user to search and select values from a list. It provides a list of options that can be selected using a filter input.
 * The selected value will be displayed in the input element.
 *
 * ```html
 *  <input type='text' id='multi-column'></input>
 * ```
 * ```typescript
 *  let multiColObj: MultiColumnComboBox = new MultiColumnComboBox();
 *  multiColObj.appendTo('#multi-column');
 * ```
 */
var MultiColumnComboBox = /** @class */ (function (_super) {
    __extends(MultiColumnComboBox, _super);
    /**
     * *Constructor for creating the component
     *
     * @param {MultiColumnComboBoxModel} options - Specifies the MultiColumnComboBox model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function MultiColumnComboBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.gridInject = new MultiColumnGrid();
        _this.isShowSpinner = true;
        _this.gridInject.InjectModules();
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    MultiColumnComboBox.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        this.keyConfigs = {
            escape: 'escape',
            altUp: 'alt+uparrow',
            altDown: 'alt+downarrow',
            tab: 'tab',
            shiftTab: 'shift+tab',
            end: 'end',
            enter: 'enter',
            home: 'home',
            moveDown: 'downarrow',
            moveUp: 'uparrow'
        };
        this.matchedRowEle = this.matchedContent = this.exactMatchedContent = null;
        this.persistData();
    };
    MultiColumnComboBox.prototype.getDirective = function () {
        return 'EJS-MULTICOLUMNCOMBOBOX';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    MultiColumnComboBox.prototype.getModuleName = function () {
        return 'multicolumncombobox';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    MultiColumnComboBox.prototype.getPersistData = function () {
        return this.addOnPersist(['value']);
    };
    MultiColumnComboBox.prototype.persistData = function () {
        if (this.enablePersistence) {
            this.element.id += '_wrapper';
            var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
            if (!(isNullOrUndefined(data) || (data === ''))) {
                this.setProperties(JSON.parse(data), true);
            }
        }
    };
    MultiColumnComboBox.prototype.render = function () {
        this.renderInput();
        this.renderGrid();
        this.popupDiv = this.createElement('div', { className: CONTENT });
        this.popupDiv.appendChild(this.gridEle);
        this.setHTMLAttributes();
        this.renderPopup();
        this.wireEvents();
    };
    MultiColumnComboBox.prototype.setHiddenValue = function () {
        if (isNullOrUndefined(this.value)) {
            this.hiddenElement.innerHTML = '';
            return;
        }
        var existingOption = this.hiddenElement.querySelector('option');
        if (!isNullOrUndefined(existingOption)) {
            existingOption.textContent = this.text;
            existingOption.setAttribute('value', this.value.toString());
        }
        else if (!isNullOrUndefined(this.hiddenElement)) {
            var newOption = document.createElement('option');
            newOption.text = this.text;
            newOption.setAttribute('value', this.value.toString());
            newOption.setAttribute('selected', '');
            this.hiddenElement.appendChild(newOption);
        }
    };
    MultiColumnComboBox.prototype.renderGrid = function () {
        var _this = this;
        var gridColumns = this.getGridColumns();
        var sortOrder = this.sortOrder.toString().toLowerCase();
        this.gridObj = new Grid({
            dataSource: this.dataSource,
            columns: gridColumns,
            allowSorting: this.allowSorting,
            enableStickyHeader: true,
            gridLines: this.gridSettings.gridLines,
            rowHeight: this.gridSettings.rowHeight,
            enableAltRow: this.gridSettings.enableAltRow,
            enableVirtualization: this.enableVirtualization,
            enableRtl: this.enableRtl,
            editSettings: { allowAdding: false },
            query: this.query,
            allowTextWrap: this.gridSettings.allowTextWrap,
            textWrapSettings: { wrapMode: this.gridSettings.textWrapMode },
            height: this.popupHeight,
            allowResizing: this.gridSettings.allowResizing,
            allowMultiSorting: this.sortType.toString().toLowerCase() === 'multiplecolumns' && this.allowSorting,
            rowTemplate: this.itemTemplate,
            beforeDataBound: function () {
                if (_this.dataSource instanceof DataManager && _this.isShowSpinner) {
                    _this.showHideSpinner(true);
                    _this.isShowSpinner = false;
                }
            },
            dataBound: function () { _this.onDataBound(); },
            actionFailure: function (args) { _this.onActionFailure(args); },
            actionBegin: function (args) { _this.trigger('actionBegin', args); },
            actionComplete: this.handleActionComplete.bind(this),
            keyPressed: this.handleKeyPressed.bind(this),
            resizing: function (args) {
                if (_this.gridSettings.resizing) {
                    _this.gridSettings.resizing.call(_this, args);
                }
            },
            resizeStart: function (args) {
                if (_this.gridSettings.resizeStart) {
                    _this.gridSettings.resizeStart.call(_this, args);
                }
            },
            resizeStop: function (args) {
                if (_this.gridSettings.resizeStop) {
                    _this.gridSettings.resizeStop.call(_this, args);
                }
            }
        });
        this.gridEle = this.createElement('div', { id: this.element.id + "_" + getUniqueID('grid'), className: MULTICOLUMNGRID });
        this.updateGroupByField();
        if (gridColumns.length > 0) {
            // Set first column as primary key to avoid PRIMARY KEY MISSING warning.
            this.gridObj.columns[0].isPrimaryKey = true;
        }
        if (sortOrder !== 'none') {
            this.gridObj.sortSettings = { columns: [{ field: this.fields.text, direction: sortOrder === 'ascending' ?
                            SortOrder.Ascending : SortOrder.Descending }] };
        }
        this.gridObj.appendTo(this.gridEle);
        if (!isNullOrUndefined(this.value) || !isNullOrUndefined(this.text) || !isNullOrUndefined(this.index)) {
            this.initValue(null, null, true);
        }
    };
    MultiColumnComboBox.prototype.handleActionComplete = function (args) {
        var _this = this;
        this.trigger('actionComplete', args);
        if (args.requestType === 'sorting') {
            this.updateRowSelection(args);
        }
        if (Array.isArray(args.rows) && this.isDataFiltered) {
            var rows = args.rows;
            var rowHeight_1 = 0;
            rows.forEach(function (row) {
                var rowElement = _this.gridObj.getRowElementByUID(row.uid);
                if (rowElement) {
                    rowHeight_1 += rowElement.getBoundingClientRect().height;
                }
            });
            this.popupRowHeight = rowHeight_1 || parseFloat(this.popupHeight);
            this.updateGridHeight(true, true);
        }
        this.popupObj.refreshPosition();
        this.gridObj.element.querySelector('.e-content').scrollTop = 0;
    };
    MultiColumnComboBox.prototype.handleKeyPressed = function (args) {
        if (args.key === 'Enter') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            args.cancel = true;
            if (this.isPopupOpen) {
                this.selectedGridRow(this.gridObj.getRows()[this.gridObj.selectedRowIndex], args, true);
                this.hidePopup(args);
                this.focusIn(args);
            }
        }
        if (this.fields.groupBy) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            args.cancel = true;
            this.gridKeyActionHandler(args, true);
        }
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    MultiColumnComboBox.prototype.isRowMatching = function (data, selectedValue, selectedText) {
        var flattenData = function (data) {
            var result = [];
            if (data && typeof data === 'object') {
                if (Array.isArray(data)) {
                    data.forEach(function (item) { return result.push.apply(result, flattenData(item)); });
                }
                else {
                    Object.keys(data).forEach(function (key) { return result.push.apply(result, flattenData(data["" + key])); });
                }
            }
            else if (data != null) {
                result.push(String(data));
            }
            return result;
        };
        var flattenedValues = flattenData(data);
        return (flattenedValues.indexOf(selectedValue) !== -1 && flattenedValues.indexOf(selectedText) !== -1);
    };
    MultiColumnComboBox.prototype.updateRowSelection = function (args) {
        var _this = this;
        if (args) {
            var dataRows = args.rows;
            dataRows.forEach(function (row) {
                _this.selectDataRow(row.data, row.index);
            });
        }
    };
    MultiColumnComboBox.prototype.selectDataRow = function (data, index) {
        var isPresent = this.isRowMatching(data, this.value ?
            this.value.toString() : '', this.text ? this.text.toString() : '');
        if (isPresent) {
            this.gridObj.selectRow(index);
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.index = index;
            this.isProtectedOnChange = prevOnChange;
            return;
        }
    };
    MultiColumnComboBox.prototype.findIndex = function (arr, obj) {
        return arr.findIndex(function (item) {
            // eslint-disable-next-line
            return Object.keys(obj).every(function (key) { return item[key] === obj[key]; });
        });
    };
    MultiColumnComboBox.prototype.getGridColumns = function () {
        var _this = this;
        return this.columns.map(function (_a) {
            var field = _a.field, header = _a.header, width = _a.width, textAlign = _a.textAlign, format = _a.format, displayAsCheckBox = _a.displayAsCheckBox, template = _a.template, headerTemplate = _a.headerTemplate, customAttributes = _a.customAttributes;
            return ({
                field: field,
                headerText: header,
                width: width,
                textAlign: textAlign.toString() === '' && _this.enableRtl ? 'Right' : textAlign,
                format: format,
                displayAsCheckBox: displayAsCheckBox,
                template: template,
                headerTemplate: headerTemplate,
                customAttributes: customAttributes,
                type: displayAsCheckBox && !format ? 'boolean' : undefined
            });
        });
    };
    MultiColumnComboBox.prototype.updateGroupByField = function () {
        var groupByField = this.fields.groupBy;
        var isGroupByValid = groupByField !== '' && !isNullOrUndefined(groupByField);
        if (isGroupByValid) {
            if (this.sortType.toString().toLowerCase() !== 'multiplecolumns') {
                this.gridEle.classList.add('e-multicolumn-group');
            }
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.gridObj.allowGrouping = true;
            this.gridObj.groupSettings = {
                showDropArea: false,
                columns: [groupByField]
            };
            if (this.groupTemplate && isGroupByValid) {
                this.gridObj.groupSettings.captionTemplate = this.groupTemplate;
            }
            if (this.isVue) {
                this.gridObj.isVue = this.isVue;
            }
            this.isProtectedOnChange = prevOnChange;
        }
    };
    MultiColumnComboBox.prototype.onDataBound = function () {
        var _this = this;
        var dataCount = this.dataSource.length;
        var popupChild = this.popupDiv.querySelector('.' + MULTICOLUMNGRID);
        var hasNoDataClass = this.popupDiv.classList.contains(NODATA);
        if (dataCount <= 0 && popupChild) {
            this.l10nUpdate();
            this.popupDiv.removeChild(this.gridEle);
            addClass([this.popupDiv], [NODATA]);
        }
        else if (hasNoDataClass && dataCount >= 1) {
            removeClass([this.popupDiv], [NODATA]);
            var noRecordEle = this.popupDiv.querySelector('.e-no-records');
            if (noRecordEle) {
                this.popupDiv.removeChild(noRecordEle);
            }
        }
        if (this.isInitialRender) {
            var gridContentRow = this.popupDiv.querySelector('.e-gridcontent tr');
            var rowHeight = !hasNoDataClass ? gridContentRow ?
                gridContentRow.getBoundingClientRect().height : 0 :
                this.popupDiv.getBoundingClientRect().height;
            this.popupRowHeight = rowHeight;
            this.popupObj.hide();
            this.popupEle.style.visibility = 'unset';
            this.isInitialRender = false;
        }
        var rowElements = this.gridObj.element.querySelectorAll('.e-row');
        if (this.isDataFiltered && rowElements.length > 0 && this.inputEle.value !== '') {
            var firstRowEle = rowElements[0];
            firstRowEle.classList.add('e-row-focus');
        }
        if (this.dataSource instanceof DataManager) {
            setTimeout(function () {
                _this.showHideSpinner(false);
            });
        }
    };
    MultiColumnComboBox.prototype.showHideSpinner = function (isShow) {
        if (isShow) {
            showSpinner(this.dropdownElement);
        }
        else {
            hideSpinner(this.dropdownElement);
        }
    };
    MultiColumnComboBox.prototype.onActionFailure = function (args) {
        this.trigger('actionFailure', args);
        this.l10nUpdate(true);
        addClass([this.popupDiv], [NODATA]);
    };
    MultiColumnComboBox.prototype.renderInput = function () {
        var allowedAttributes = ['aria-expanded', 'aria-readOnly', 'aria-disabled', 'autocomplete',
            'autocapitalize', 'spellcheck', 'tabindex'];
        var setAttributes = function (element, attributes) {
            for (var key in attributes) {
                // eslint-disable-next-line no-prototype-builtins
                if (attributes.hasOwnProperty(key) && allowedAttributes.indexOf(key) !== -1 && isNullOrUndefined(element.getAttribute(key))) {
                    element.setAttribute(key, attributes[key]);
                }
            }
        };
        if (this.element.tagName === 'INPUT') {
            this.inputEle = this.element;
            if (isNullOrUndefined(this.inputEle.getAttribute('role'))) {
                this.inputEle.setAttribute('role', 'combobox');
            }
            if (isNullOrUndefined(this.inputEle.getAttribute('type'))) {
                this.inputEle.setAttribute('type', 'text');
            }
            setAttributes(this.inputEle, {
                'aria-expanded': 'false',
                'aria-readOnly': this.readonly.toString(),
                'aria-disabled': this.disabled.toString(),
                autocomplete: 'off',
                autocapitalize: 'off',
                spellcheck: 'false',
                tabindex: '0'
            });
        }
        else {
            this.inputEle = this.createElement('input', { attrs: { role: 'textbox', type: 'text' } });
            this.element.parentElement.insertBefore(this.inputEle, this.element);
        }
        this.inputObj = Input.createInput({
            element: this.inputEle,
            buttons: [DROPDOWNICON],
            floatLabelType: this.floatLabelType,
            properties: {
                enabled: !this.disabled,
                readonly: this.readonly,
                placeholder: this.placeholder,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton,
                cssClass: this.cssClass
            }
        }, this.createElement);
        this.inputWrapper = this.inputObj.container;
        this.inputWrapper.classList.add(MULTICOLUMNLIST);
        this.inputWrapper.setAttribute('spellcheck', 'false');
        this.hiddenElement = this.createElement('select', {
            attrs: {
                'aria-hidden': 'true',
                'tabindex': '-1',
                'class': HIDDENELEMENT
            }
        });
        prepend([this.hiddenElement], this.inputWrapper);
        var name = this.inputEle.getAttribute('name') ? this.inputEle.getAttribute('name') : this.inputEle.getAttribute('id');
        this.hiddenElement.setAttribute('name', name);
        this.inputEle.removeAttribute('name');
        if (!this.hiddenElement.hasAttribute('aria-label')) {
            this.hiddenElement.setAttribute('aria-label', this.getModuleName());
        }
        if (this.element.tagName === this.getDirective()) {
            this.element.appendChild(this.inputWrapper);
        }
        this.setElementWidth(this.width);
        this.dropdownElement = this.inputWrapper.querySelector('.e-input-group-icon.e-multicolumn-list-icon.e-icons');
        createSpinner({
            target: this.dropdownElement
        });
    };
    MultiColumnComboBox.prototype.setElementWidth = function (inputWidth) {
        if (isNullOrUndefined(inputWidth)) {
            return;
        }
        var ddElement = this.inputWrapper;
        if (typeof inputWidth === 'number') {
            ddElement.style.width = formatUnit(inputWidth);
        }
        else if (typeof inputWidth === 'string') {
            ddElement.style.width = inputWidth.match(/px|%|em/) ? inputWidth : formatUnit(inputWidth);
        }
    };
    MultiColumnComboBox.prototype.setHTMLAttributes = function () {
        var _this = this;
        var htmlAttributes = this.htmlAttributes;
        var inputEle = this.inputEle;
        if (Object.keys(htmlAttributes).length) {
            for (var _i = 0, _a = Object.keys(htmlAttributes); _i < _a.length; _i++) {
                var htmlAttr = _a[_i];
                switch (htmlAttr) {
                    case 'class':
                        this.inputWrapper.classList.add(htmlAttributes[htmlAttr]);
                        break;
                    case 'disabled':
                        this.setProperties({ enabled: false }, true);
                        this.setEnable();
                        break;
                    case 'readonly':
                        this.setProperties({ readonly: true }, true);
                        this.dataBind();
                        break;
                    case 'style': {
                        var styles = htmlAttributes[htmlAttr];
                        this.inputWrapper.style.cssText = '';
                        if (styles) {
                            styles.split(';').forEach(function (styleProperty) {
                                var _a = styleProperty.split(':').map(function (part) { return part.trim(); }), property = _a[0], value = _a[1];
                                if (property && value) {
                                    _this.inputWrapper.style.setProperty(property, value);
                                }
                            });
                        }
                        break;
                    }
                    default: {
                        var defaultAttr = ['title', 'id', 'placeholder', 'role', 'autocomplete', 'autocapitalize', 'spellcheck', 'minlength', 'maxlength'];
                        var validateAttr = ['name', 'required'];
                        if (validateAttr.indexOf(htmlAttr) > -1 || htmlAttr.indexOf('data') === 0) {
                            this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                        }
                        else if (defaultAttr.indexOf(htmlAttr) > -1) {
                            if (htmlAttr === 'placeholder') {
                                Input.setPlaceholder(htmlAttributes[htmlAttr], inputEle);
                            }
                            else {
                                inputEle.setAttribute(htmlAttr, htmlAttributes[htmlAttr]);
                            }
                        }
                        else {
                            inputEle.setAttribute(htmlAttr, htmlAttributes[htmlAttr]);
                        }
                        break;
                    }
                }
            }
        }
    };
    /* To set enable property */
    MultiColumnComboBox.prototype.setEnable = function () {
        Input.setEnabled(!this.disabled, this.inputEle);
        if (!this.disabled) {
            removeClass([this.inputWrapper], DISABLED);
            this.setAriaDisabled('false');
        }
        else {
            if (this.isPopupOpen) {
                this.hidePopup();
            }
            addClass([this.inputWrapper], DISABLED);
            if (this.inputWrapper && this.inputWrapper.classList.contains(INPUTFOCUS)) {
                removeClass([this.inputWrapper], [INPUTFOCUS]);
            }
            this.setAriaDisabled('true');
        }
    };
    MultiColumnComboBox.prototype.setAriaDisabled = function (value) {
        this.inputEle.setAttribute('aria-disabled', value);
        this.inputWrapper.setAttribute('aria-disabled', value);
    };
    MultiColumnComboBox.prototype.updateFieldValue = function (fieldValue, dataObj) {
        var fieldVal = getValue(fieldValue, dataObj).toString();
        return fieldVal;
    };
    MultiColumnComboBox.prototype.initValue = function (isRerender, isValue, isInitial) {
        var _this = this;
        var prevItemData = this.gridObj.getSelectedRecords()[0];
        var prevItemEle = this.gridObj.getSelectedRows()[0];
        var item;
        var currentValue;
        var currentText;
        var currentIndex;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = this.value ? this.value.toString() : this.value;
        this.isProtectedOnChange = prevOnChange;
        var updateValues = function (dataList) {
            var result = _this.updateCurrentValues(item, dataList);
            currentValue = result.currentValue;
            currentText = result.currentText;
            currentIndex = result.currentIndex;
        };
        if ((!isRerender && (!isNullOrUndefined(this.value) || !isNullOrUndefined(this.text))) || (isRerender && isValue !== undefined)) {
            var value_1 = isRerender ? (isValue ? this.value : this.text) : (!isNullOrUndefined(this.value) ? this.value : this.text);
            if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof DataManager) {
                this.dataSource.executeQuery(new Query).then(function (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var dataLists = e.result;
                    var filteredData = dataLists.filter(function (item) {
                        var fieldVal = _this.updateFieldValue(isRerender ? (isValue ? _this.fields.value : _this.fields.text) :
                            !isNullOrUndefined(_this.value) ? _this.fields.value : _this.fields.text, item);
                        return fieldVal === value_1;
                    });
                    if (filteredData.length > 0) {
                        item = filteredData[0];
                        updateValues(dataLists);
                        _this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
                        _this.gridObj.selectRow(_this.index);
                    }
                });
            }
            else if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof Array) {
                item = this.dataSource.filter(function (data) {
                    var fieldVal = _this.updateFieldValue(isRerender ? (isValue ? _this.fields.value : _this.fields.text) :
                        !isNullOrUndefined(_this.value) ? _this.fields.value : _this.fields.text, data);
                    return fieldVal === value_1;
                })[0];
                updateValues(this.dataSource);
            }
        }
        else if (!isNullOrUndefined(this.index)) {
            if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof DataManager) {
                this.dataSource.executeQuery(new Query).then(function (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var dataLists = e.result;
                    item = dataLists[_this.index];
                    updateValues(dataLists);
                    _this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
                    _this.gridObj.selectRow(_this.index);
                });
            }
            else if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof Array) {
                if (!this.fields.groupBy) {
                    item = this.dataSource[this.index];
                    updateValues(this.dataSource);
                }
                else {
                    setTimeout(function () {
                        var rows = _this.gridObj.getRows();
                        if (rows && rows.length > 0) {
                            var rowData = _this.gridObj.getRowInfo(rows[_this.index]).rowData;
                            var value = _this.fields.value;
                            for (var i = 0; i < rows.length; i++) {
                                if (rowData && rowData[parseInt(value.toString(), 10)] ===
                                    _this.dataSource[parseInt(i.toString(), 10)][parseInt(value.toString(), 10)]) {
                                    item = rowData;
                                    updateValues(_this.dataSource);
                                    _this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
                                    _this.gridObj.selectRow(_this.index);
                                    break;
                                }
                            }
                        }
                    });
                }
            }
        }
        if (!(this.dataSource instanceof DataManager)) {
            this.updateChangeEvent(item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial);
        }
    };
    MultiColumnComboBox.prototype.updateChangeEvent = function (item, prevItemData, prevItemEle, currentValue, currentText, currentIndex, isRerender, isInitial) {
        var fieldValue = item ? this.updateFieldValue(this.fields.value, item) : null;
        var ChangeEventArgs = {
            value: item ? fieldValue : null,
            itemData: { text: currentText, value: currentValue },
            item: this.getDataByValue(this.value),
            previousItemData: prevItemData,
            previousItemElement: prevItemEle,
            itemElement: this.inputWrapper,
            event: null,
            isInteracted: !isRerender
        };
        this.updateValues(currentValue, currentText, currentIndex, ChangeEventArgs, isInitial);
    };
    MultiColumnComboBox.prototype.updateCurrentValues = function (item, dataList) {
        if (!isNullOrUndefined(item)) {
            var fieldText = this.updateFieldValue(this.fields.text, item);
            var fieldValue = this.updateFieldValue(this.fields.value, item);
            Input.setValue(fieldText, this.inputEle, this.floatLabelType, this.showClearButton);
            return {
                currentValue: fieldValue,
                currentText: fieldText,
                currentIndex: dataList.indexOf(item)
            };
        }
        return {
            currentValue: null,
            currentText: null,
            currentIndex: null
        };
    };
    MultiColumnComboBox.prototype.renderPopup = function () {
        this.popupEle = this.createElement('div', {
            id: this.element.id + '_options', className: MULTICOLUMNLIST + ' e-popup ' + (this.cssClass !== null ? this.cssClass : '')
        });
        attributes(this.popupEle, { 'aria-label': this.element.id, 'role': 'dialog' });
        document.body.appendChild(this.popupEle);
        this.createPopup(this.popupEle);
        prepend([this.popupDiv], this.popupEle);
        if (this.footerTemplate) {
            this.setFooterTemplate();
        }
        var popupHeight = this.getSize(false);
        this.popupEle.style.maxHeight = popupHeight;
        if (this.footerTemplate) {
            var height = Math.round(this.footer.getBoundingClientRect().height);
            popupHeight = formatUnit(parseInt(popupHeight, 10) - height + 'px');
        }
        this.popupDiv.style.maxHeight = popupHeight;
        this.updateGridHeight();
        this.popupEle.style.visibility = 'hidden';
        this.isInitialRender = true;
    };
    MultiColumnComboBox.prototype.updateGridHeight = function (isFilter, autoHeight) {
        var height;
        if (isFilter) {
            var gridContentEle = this.gridObj.getContent().querySelector('.e-content');
            var scrollBarHeight = gridContentEle.offsetHeight - gridContentEle.clientHeight;
            if (this.fields.groupBy !== '' && !isNullOrUndefined(this.fields.groupBy)) {
                this.popupRowHeight += this.popupRowHeight;
            }
            height = autoHeight ? (this.popupRowHeight < this.prevGridHeight ? (this.popupRowHeight + scrollBarHeight) + 'px' : this.prevGridHeight + 'px') : this.prevGridHeight + 'px';
        }
        else {
            this.prevGridHeight = this.popupDiv.getBoundingClientRect().height - this.popupDiv.querySelector('.e-gridheader').getBoundingClientRect().height;
            height = this.prevGridHeight + 'px';
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.gridObj.height = height;
        this.isProtectedOnChange = prevOnChange;
    };
    MultiColumnComboBox.prototype.createPopup = function (element) {
        var _this = this;
        this.popupObj = new Popup(element, {
            width: this.getSize(true),
            targetType: 'relative',
            collision: { X: 'flip', Y: 'flip' },
            relateTo: this.inputWrapper,
            enableRtl: this.enableRtl,
            position: { X: 'left', Y: 'bottom' },
            targetExitViewport: function () {
                if (!Browser.isDevice) {
                    _this.hidePopup();
                }
            },
            open: function () {
                _this.inputEle.focus();
                _this.updateClearIconState();
            }
        });
    };
    MultiColumnComboBox.prototype.setFooterTemplate = function () {
        if (this.footer) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact && typeof this.footerTemplate === 'function') {
                this.clearTemplate(['footerTemplate']);
            }
            else {
                this.footer.innerHTML = '';
            }
        }
        else {
            this.footer = this.createElement('div');
            addClass([this.footer], 'e-popup-footer');
        }
        var compiledString = this.getTemplateFunction(this.footerTemplate);
        var dataCount = this.dataSource.length;
        var tempArr = compiledString({ count: dataCount }, this, 'footerTemplate', this.element.id + 'footerTemplate', this.isStringTemplate, undefined, this.footer);
        if (tempArr) {
            tempArr = Array.prototype.slice.call(tempArr);
            append(tempArr, this.footer);
        }
        append([this.footer], this.popupEle);
    };
    MultiColumnComboBox.prototype.l10nUpdate = function (actionFailure) {
        if (this.noRecord) {
            this.noRecord.innerHTML = '';
        }
        else {
            this.noRecord = this.createElement('div');
        }
        if (this.noRecordsTemplate !== 'No records found' || this.actionFailureTemplate !== 'Request Failed') {
            var template = actionFailure ? this.actionFailureTemplate : this.noRecordsTemplate;
            var templateId = actionFailure ? this.element.id + '_actionFailure' : this.element.id + '_noRecords';
            var templatestring = actionFailure ? 'actionFailureTemplate' : 'noRecordsTemplate';
            var compiledString = this.getTemplateFunction(template);
            var tempArr = compiledString({}, this, templatestring, templateId, this.isStringTemplate, undefined, this.noRecord);
            if (tempArr) {
                tempArr = Array.prototype.slice.call(tempArr);
                append(tempArr, this.noRecord);
            }
        }
        else {
            var l10nLocale = { noRecordsTemplate: 'No records found', actionFailureTemplate: 'Request Failed' };
            this.l10n = new L10n('multicolumncombobox', l10nLocale, this.locale);
            this.noRecord.innerHTML = actionFailure ?
                this.l10n.getConstant('actionFailureTemplate') : this.l10n.getConstant('noRecordsTemplate');
        }
        addClass([this.noRecord], 'e-no-records');
        prepend([this.noRecord], this.popupDiv);
        this.popupObj.refreshPosition();
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    MultiColumnComboBox.prototype.getTemplateFunction = function (template) {
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
    };
    /*To calculate the width and height of the popup */
    MultiColumnComboBox.prototype.getSize = function (ispopupWidth) {
        var currentDimension = ispopupWidth ? this.popupWidth : this.popupHeight;
        var size = formatUnit(currentDimension);
        if (size.includes('%')) {
            var dimensionValue = ispopupWidth ? this.inputWrapper.offsetWidth : document.documentElement.clientHeight;
            size = (dimensionValue * parseFloat(size) / 100).toString() + 'px';
        }
        else if (typeof currentDimension === 'string') {
            size = currentDimension.match(/px|em/) ? currentDimension : size;
        }
        return size;
    };
    MultiColumnComboBox.prototype.selectedGridRow = function (row, e, isKeyNav) {
        var _this = this;
        var eventArgs = {
            isInteracted: e ? true : false,
            item: this.gridObj.getSelectedRecords()[0],
            itemElement: row,
            itemData: this.gridObj.getSelectedRecords()[0],
            event: e,
            cancel: false
        };
        var selectedRecords = this.gridObj.getSelectedRecords()[0];
        var dataText = selectedRecords ? this.updateFieldValue(this.fields.text, selectedRecords) : '';
        var dataValue = selectedRecords ? this.updateFieldValue(this.fields.value, selectedRecords) : '';
        var ChangeEventArgs = {
            isInteracted: e ? true : false,
            item: selectedRecords,
            itemElement: row,
            itemData: { text: selectedRecords ? dataText : '', value: selectedRecords ? dataValue : '' },
            event: e,
            cancel: false,
            value: selectedRecords ? dataValue : '',
            previousItemData: { text: this.text, value: this.value },
            previousItemElement: this.previousItemElement
        };
        this.trigger('select', eventArgs, function (eventArgs) {
            if (!eventArgs.cancel && eventArgs.itemData) {
                var event_1 = e;
                var isUpdateVal = event_1.key === 'Enter' || event_1.key === 'Tab' || event_1.shiftKey && event_1.key === 'Tab' || event_1.altKey && event_1.key === 'ArrowUp';
                if (!isKeyNav || (isKeyNav && isUpdateVal)) {
                    _this.updateValues(selectedRecords ? dataValue : '', selectedRecords ? dataText : '', _this.gridObj.selectedRowIndex, ChangeEventArgs);
                }
                Input.setValue(selectedRecords ? dataText : '', _this.inputEle, _this.floatLabelType, _this.showClearButton);
                _this.setHiddenValue();
                if (!isKeyNav || (isKeyNav && isUpdateVal)) {
                    _this.hidePopup(e);
                }
            }
        });
    };
    MultiColumnComboBox.prototype.updateValues = function (value, text, index, eventArgs, isInitial) {
        this.previousItemElement = eventArgs.itemElement;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.text = text || this.text;
        this.value = value || this.value;
        this.index = this.selectedRowIndex = !isNullOrUndefined(index) ? index : this.index;
        this.isProtectedOnChange = prevOnChange;
        this.setHiddenValue();
        if (!isInitial) {
            this.triggerChangeEvent(eventArgs);
        }
    };
    MultiColumnComboBox.prototype.triggerChangeEvent = function (eventArgs) {
        this.trigger('change', eventArgs, function (eventArgs) {
            if (eventArgs.cancel) {
                return;
            }
        });
    };
    MultiColumnComboBox.prototype.inputHandler = function (e) {
        var _this = this;
        this.showPopup(null, true);
        this.updateClearIconState();
        if (this.allowFiltering) {
            var inputValue_1 = e.target.value.toLowerCase();
            var customFiltering_1 = false;
            var eventArgs_1 = {
                preventDefaultAction: false,
                text: inputValue_1,
                updateData: function (dataSource, query, fields) {
                    if (eventArgs_1.cancel) {
                        return;
                    }
                    customFiltering_1 = true;
                    _this.filterAction(dataSource, inputValue_1, query, fields);
                },
                event: e,
                cancel: false
            };
            this.trigger('filtering', eventArgs_1, function (eventArgs) {
                if (!eventArgs.cancel && !eventArgs.preventDefaultAction && !customFiltering_1) {
                    _this.filterAction(_this.dataSource, inputValue_1, _this.query, _this.fields);
                }
            });
        }
        this.updateInputValue(e.target.value);
    };
    MultiColumnComboBox.prototype.updateInputValue = function (inputValue) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, data, exactData, query, result, totaldata;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.dataSource instanceof DataManager)) return [3 /*break*/, 2];
                        query = new Query();
                        return [4 /*yield*/, this.dataSource.executeQuery(query)];
                    case 1:
                        result = _c.sent();
                        totaldata = result.result;
                        (_a = this.filterDatas(totaldata, inputValue), data = _a.data, exactData = _a.exactData);
                        return [3 /*break*/, 3];
                    case 2:
                        if (Array.isArray(this.dataSource)) {
                            (_b = this.filterDatas(this.dataSource, inputValue), data = _b.data, exactData = _b.exactData);
                        }
                        _c.label = 3;
                    case 3:
                        this.selectFilteredRows(data, exactData);
                        return [2 /*return*/];
                }
            });
        });
    };
    MultiColumnComboBox.prototype.filterDatas = function (dataSource, inputValue) {
        var _this = this;
        var data = dataSource.filter(function (item) {
            var fieldText = _this.updateFieldValue(_this.fields.text, item);
            return inputValue && fieldText.toLowerCase().startsWith(inputValue.toLowerCase());
        });
        var exactData = dataSource.filter(function (item) {
            var fieldText = _this.updateFieldValue(_this.fields.text, item);
            return fieldText === inputValue;
        });
        return { data: data, exactData: exactData };
    };
    MultiColumnComboBox.prototype.selectFilteredRows = function (data, exactData) {
        if (data.length <= 0) {
            this.matchedRowEle = this.matchedContent = this.exactMatchedContent = null;
            return;
        }
        this.matchedContent = data[0];
        this.exactMatchedContent = exactData[0];
        var selectedIndex = this.findIndex(this.gridObj.currentViewData, this.matchedContent);
        this.matchedRowEle = this.gridObj.getRowByIndex(selectedIndex);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MultiColumnComboBox.prototype.filterAction = function (dataSource, inputValue, query, fields) {
        var _this = this;
        var isQuery = query || new Query();
        var filterType = this.filterType.toString().toLowerCase();
        if (isNullOrUndefined(query) && isNullOrUndefined(fields)) {
            this.updateGridDataSource(dataSource);
        }
        else if (query) {
            if (dataSource instanceof DataManager) {
                this.filteringHandler(dataSource, inputValue, query, fields);
            }
            else {
                new DataManager(dataSource).executeQuery(query).then(function (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var dataLists = e.result;
                    _this.updateGridDataSource(dataLists);
                });
            }
        }
        else {
            if (dataSource instanceof DataManager) {
                this.filteringHandler(dataSource, inputValue, isQuery, fields);
            }
            else if (Array.isArray(dataSource)) {
                var filteredData = dataSource.filter(function (item) {
                    return _this.filterData(item, filterType, inputValue, fields);
                });
                this.updateGridDataSource(filteredData);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    MultiColumnComboBox.prototype.filteringHandler = function (dataSource, inputValue, query, fields) {
        var _this = this;
        var filterType = this.filterType.toString().toLowerCase();
        var filteredData;
        dataSource.executeQuery(query).then(function (e) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var dataLists = e.result;
            filteredData = dataLists.filter(function (item) { return _this.filterData(item, filterType, inputValue, fields); });
            _this.updateGridDataSource(filteredData);
        });
    };
    MultiColumnComboBox.prototype.filterData = function (item, filterType, inputValue, fields) {
        var dataValue = this.updateFieldValue(fields ? fields.text : this.fields.text, item);
        var itemValue = dataValue.toLowerCase();
        switch (filterType) {
            case 'startswith':
                return itemValue.startsWith(inputValue);
            case 'endswith':
                return itemValue.endsWith(inputValue);
            case 'contains':
                return itemValue.includes(inputValue);
            default:
                return false;
        }
    };
    MultiColumnComboBox.prototype.updateGridDataSource = function (dataSource) {
        if (dataSource.length > 0) {
            removeClass([this.popupDiv], [NODATA]);
            var noRecordEle = this.popupDiv.querySelector('.e-no-records');
            if (noRecordEle) {
                this.popupDiv.removeChild(noRecordEle);
            }
            this.gridObj.dataSource = dataSource;
            this.isDataFiltered = true;
        }
        else {
            this.l10nUpdate();
            addClass([this.popupDiv], [NODATA]);
        }
    };
    MultiColumnComboBox.prototype.wireEvents = function () {
        if (!isNullOrUndefined(this.inputObj.buttons[0])) {
            EventHandler.add(this.inputObj.buttons[0], 'mousedown', this.preventBlur, this);
            EventHandler.add(this.inputObj.buttons[0], 'mousedown', this.dropDownClick, this);
        }
        EventHandler.add(document, 'mousedown', this.onDocumentClick, this);
        EventHandler.add(this.gridEle, 'click', this.onMouseClick, this);
        EventHandler.add(this.inputEle, 'input', this.inputHandler, this);
        EventHandler.add(this.inputEle, 'focus', this.focusIn, this);
        if (this.showClearButton) {
            EventHandler.add(this.inputObj.clearButton, 'mousedown', this.clearText, this);
        }
        EventHandler.add(window, 'resize', this.windowResize, this);
        this.keyboardModule = new KeyboardEvents(this.inputWrapper, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        this.keyboardModule = new KeyboardEvents(this.gridEle, {
            keyAction: this.gridKeyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
    };
    MultiColumnComboBox.prototype.unWireEvents = function () {
        if (!isNullOrUndefined(this.inputObj.buttons[0])) {
            EventHandler.remove(this.inputObj.buttons[0], 'mousedown', this.preventBlur);
            EventHandler.remove(this.inputObj.buttons[0], 'mousedown', this.dropDownClick);
        }
        EventHandler.remove(document, 'mousedown', this.onDocumentClick);
        EventHandler.remove(this.inputEle, 'input', this.inputHandler);
        EventHandler.remove(this.inputWrapper, 'focus', this.focusIn);
        EventHandler.remove(window, 'resize', this.windowResize);
        EventHandler.remove(this.gridEle, 'click', this.onMouseClick);
        if (this.showClearButton) {
            EventHandler.remove(this.inputObj.clearButton, 'mousedown', this.clearText);
        }
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
        }
    };
    MultiColumnComboBox.prototype.preventBlur = function (e) {
        e.preventDefault();
    };
    MultiColumnComboBox.prototype.dropDownClick = function (e) {
        if (this.disabled || this.readonly) {
            return;
        }
        var focusedEle = this.gridEle.querySelector('.e-row-focus');
        if (focusedEle) {
            focusedEle.classList.remove('e-row-focus');
        }
        if (this.isPopupOpen) {
            this.hidePopup(e);
        }
        else {
            this.showPopup(e);
        }
    };
    MultiColumnComboBox.prototype.onMouseClick = function (e) {
        var target = e.target;
        var row = closest(target, '.e-row');
        var selectedRowIndex = this.gridObj.selectedRowIndex;
        if (row) {
            if (selectedRowIndex >= 0) {
                this.selectedGridRow(row, e);
            }
            else {
                this.gridObj.selectedRowIndex = this.gridObj.getRows().indexOf(row);
                this.gridObj.selectRow(this.gridObj.selectedRowIndex);
                this.hidePopup(e);
            }
        }
    };
    MultiColumnComboBox.prototype.onDocumentClick = function (e) {
        var target = e.target;
        if (this.disabled || this.readonly || !this.isPopupOpen) {
            if (!target.closest('.e-multicolumn-list')) {
                this.focusOut();
            }
            return;
        }
        if ((target.classList.contains('e-multicolumn-list-icon') || closest(target, '.e-multicolumn-list.e-popup'))) {
            e.preventDefault();
        }
        else {
            if (!target.classList.contains('e-multicolumncombobox') && !target.classList.contains('e-clear-icon')) {
                if (!isNullOrUndefined(this.text)) {
                    this.updateInputValue(this.text);
                }
                var isClearVal = this.inputEle.value === '' ? true : false;
                this.updateValuesOnInput(e, null, isClearVal);
            }
        }
    };
    MultiColumnComboBox.prototype.updateValuesOnInput = function (mouseEvent, keyEvent, isClearValues, isKeyDown) {
        if (isKeyDown === void 0) { isKeyDown = false; }
        var e = mouseEvent ? mouseEvent : keyEvent;
        var val = isKeyDown ? this.matchedContent : this.exactMatchedContent;
        if (!val) {
            this.inputEle.value = this.value = this.index = this.text = null;
        }
        this.hidePopup(e);
        if (this.matchedRowEle && !isClearValues && val) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            var fieldText = this.updateFieldValue(this.fields.text, this.matchedContent);
            var fieldValue = this.updateFieldValue(this.fields.value, this.matchedContent);
            this.inputEle.value = fieldText;
            this.value = fieldValue;
            var selectIndex = this.findIndex(this.gridObj.currentViewData, this.matchedContent);
            this.index = selectIndex;
            this.text = fieldText;
            this.gridObj.selectRow(selectIndex);
            this.selectedGridRow(this.gridObj.getRowByIndex(selectIndex), e);
            this.previousItemElement = this.gridObj.getSelectedRows()[0];
            this.isProtectedOnChange = prevOnChange;
        }
        else {
            if (this.isDataFiltered) {
                this.inputEle.value = '';
                var ChangeEventArgs = {
                    value: null,
                    itemData: { text: null, value: null },
                    item: null,
                    previousItemData: { text: this.text, value: this.value },
                    previousItemElement: this.previousItemElement,
                    itemElement: null,
                    event: e,
                    isInteracted: true,
                    cancel: false
                };
                var prevOnChange = this.isProtectedOnChange;
                this.isProtectedOnChange = true;
                this.text = this.value = this.index = null;
                this.gridObj.refreshColumns();
                this.isProtectedOnChange = prevOnChange;
                this.triggerChangeEvent(ChangeEventArgs);
                this.isDataFiltered = false;
                this.matchedContent = this.matchedRowEle = null;
            }
        }
    };
    MultiColumnComboBox.prototype.clearText = function (e) {
        this.isDataFiltered = true;
        this.updateValuesOnInput(e, null, true);
    };
    MultiColumnComboBox.prototype.windowResize = function () {
        if (this.popupObj) {
            this.popupObj.setProperties({ width: this.getSize(true) });
            this.popupObj.refreshPosition();
        }
    };
    /* To set cssclass for the dropdowntree */
    MultiColumnComboBox.prototype.setCssClass = function (newClass, oldClass) {
        var elements = this.popupObj ? [this.inputWrapper, this.popupObj.element] : [this.inputWrapper];
        if (!isNullOrUndefined(oldClass) && oldClass !== '') {
            removeClass(elements, oldClass.split(' '));
        }
        if (!isNullOrUndefined(newClass) && newClass !== '') {
            addClass(elements, newClass.split(' '));
        }
    };
    MultiColumnComboBox.prototype.keyActionHandler = function (e) {
        switch (e.action) {
            case 'escape':
            case 'altUp':
            case 'shiftTab':
            case 'tab':
                if (this.isPopupOpen) {
                    this.hidePopup(e);
                }
                else {
                    this.focusOut();
                }
                break;
            case 'altDown':
                if (!this.isPopupOpen) {
                    this.showPopup(e);
                    this.updateSelectedItem(e, false);
                }
                break;
            case 'moveDown':
            case 'moveUp':
                this.updateSelectedItem(e, true, true);
                break;
            case 'enter':
                this.updateValuesOnInput(null, e, false, true);
                this.focusIn(e);
                break;
            case 'home':
            case 'end':
                this.updateSelectedItem(e);
                break;
        }
    };
    MultiColumnComboBox.prototype.gridKeyActionHandler = function (e, isGroup) {
        var keyActionMap = {
            'ArrowDown': 'moveDown',
            'ArrowUp': 'moveUp',
            'End': 'end',
            'Home': 'home',
            'Tab': 'tab',
            'Escape': 'escape',
            'Shift+Tab': 'shiftTab',
            'Alt+ArrowUp': 'altUp'
        };
        if (isGroup) {
            var key = "" + (e.altKey ? 'Alt+' : '') + (e.shiftKey ? 'Shift+' : '') + e.key;
            e.action = keyActionMap[key] || e.action;
        }
        switch (e.action) {
            case 'escape':
            case 'tab':
            case 'shiftTab':
            case 'altUp':
                if (this.isPopupOpen) {
                    e.preventDefault();
                    if (e.action !== 'escape') {
                        this.updateSelectedItem(e);
                    }
                    this.hidePopup(e);
                }
                break;
            case 'moveDown':
            case 'moveUp':
            case 'home':
            case 'end':
                this.updateSelectedItem(e);
                break;
        }
    };
    MultiColumnComboBox.prototype.updateSelectedItem = function (e, isUpdateIndex, isInputTarget) {
        var _this = this;
        if (isUpdateIndex === void 0) { isUpdateIndex = true; }
        if (this.isPopupOpen) {
            var index_1 = this.fields.groupBy ? (this.gridObj.selectedRowIndex || 0) : this.gridObj.selectedRowIndex;
            var dataLength = this.dataSource instanceof DataManager ? this.remoteDataLength :
                this.dataSource.length;
            if ((index_1 === -1 && (e.action === 'moveDown' || e.action === 'moveUp')) || (e.action === 'home')) {
                index_1 = 0;
            }
            else if ((index_1 >= (dataLength - 1) && e.action === 'moveDown') || (e.action === 'end')) {
                index_1 = dataLength - 1;
            }
            else if (e.action === 'moveDown' && (index_1 >= 0 && index_1 <= (dataLength - 1)) && (this.fields.groupBy || isInputTarget)) {
                index_1 += 1;
            }
            else if (e.action === 'moveUp' && index_1 > 0 && (this.fields.groupBy) || isInputTarget) {
                index_1 -= 1;
            }
            if (!this.enableVirtualization) {
                this.selectRow(e, isUpdateIndex, index_1);
            }
            else {
                setTimeout(function () { _this.selectRow(e, isUpdateIndex, index_1); });
            }
        }
    };
    MultiColumnComboBox.prototype.selectRow = function (e, isUpdateIndex, index) {
        if (isUpdateIndex === void 0) { isUpdateIndex = true; }
        this.gridObj.selectRow(index);
        this.gridObj.selectedRowIndex = index;
        var focusedEle = this.gridEle.querySelector('.e-row-focus');
        if (focusedEle) {
            focusedEle.classList.remove('e-row-focus');
        }
        if (isUpdateIndex) {
            this.selectedGridRow(this.gridObj.getRows()[parseInt(index.toString(), 10)], e, true);
        }
    };
    MultiColumnComboBox.prototype.updateClearIconState = function () {
        var clearIconEle = this.inputWrapper.querySelector('.e-clear-icon');
        if (clearIconEle) {
            clearIconEle.style.display = this.inputEle.value === '' ? 'none' : 'flex';
        }
    };
    MultiColumnComboBox.prototype.updateDynamicDataSource = function (newDataSource, oldDataSource) {
        if (this.gridObj) {
            var dataLength_1;
            this.isShowSpinner = true;
            this.gridObj.dataSource = newDataSource;
            var isRemoteData = oldDataSource instanceof DataManager;
            if (isRemoteData) {
                oldDataSource.executeQuery(new Query()).then(function (e) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    dataLength_1 = e.result.length;
                });
            }
            else {
                dataLength_1 = oldDataSource.length;
            }
            if (dataLength_1 === 0) {
                this.popupDiv.appendChild(this.gridEle);
            }
        }
    };
    /**
     * Sets the focus to the component for interaction.component for interaction.
     *
     * @param {FocusEvent | MouseEvent | KeyboardEvent | TouchEvent} e - Specifies the event.
     * @returns {void}
     */
    MultiColumnComboBox.prototype.focusIn = function (e) {
        if (this.disabled || this.readonly) {
            return;
        }
        addClass([this.inputWrapper], [INPUTFOCUS]);
        this.inputEle.focus();
        this.updateClearIconState();
        this.trigger('focus', e);
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputEle, this.inputWrapper);
        }
    };
    /**
     * Moves the focus from the component if the component is already focused.
     *
     * @param {MouseEvent | KeyboardEvent} e - Specifies the event.
     * @returns {void}
     */
    MultiColumnComboBox.prototype.focusOut = function (e) {
        if (this.disabled || this.readonly) {
            return;
        }
        if (this.isPopupOpen) {
            this.hidePopup(e);
        }
        if (this.inputWrapper) {
            removeClass([this.inputWrapper], [INPUTFOCUS]);
            var clearIconEle = this.inputWrapper.querySelector('.e-clear-icon');
            if (clearIconEle) {
                clearIconEle.style.display = 'none';
            }
            if (this.floatLabelType !== 'Never') {
                Input.calculateWidth(this.inputEle, this.inputWrapper);
            }
        }
    };
    /**
     * Opens the popup that displays the list of items.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @param {boolean} isInputOpen - Specifies whether the input is open or not.
     * @returns {void}
     */
    MultiColumnComboBox.prototype.showPopup = function (e, isInputOpen) {
        var _this = this;
        var animModel = { name: 'FadeIn', duration: 100 };
        var eventArgs = { popup: this.popupObj, event: e, cancel: false, animation: animModel };
        this.trigger('open', eventArgs, function (eventArgs) {
            if (!eventArgs.cancel && !_this.isPopupOpen) {
                _this.isPopupOpen = true;
                _this.popupObj.refreshPosition();
                addClass([_this.inputWrapper], [ICONANIMATION]);
                attributes(_this.inputEle, { 'aria-expanded': 'true', 'aria-owns': _this.element.id + '_popup', 'aria-controls': _this.element.id });
                if (!isInputOpen) {
                    if ((_this.value || _this.text || _this.index)) {
                        _this.gridObj.selectRow(_this.selectedRowIndex);
                    }
                }
                var contentEle = _this.gridObj.getContent();
                if (contentEle) {
                    var activeRow = contentEle.querySelector('.e-rowcell.e-active');
                    var firstRow = contentEle.querySelector('.e-row');
                    if (activeRow) {
                        _this.inputEle.setAttribute('aria-activedescendant', activeRow.parentElement.getAttribute('data-uid'));
                    }
                    else if (firstRow) {
                        _this.inputEle.setAttribute('aria-activedescendant', firstRow.getAttribute('data-uid'));
                    }
                }
                if (!isNullOrUndefined(_this.dataSource) && _this.dataSource instanceof DataManager) {
                    _this.dataSource.executeQuery(new Query).then(function (e) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        _this.remoteDataLength = e.result.length;
                    });
                }
                _this.popupObj.show(new Animation(eventArgs.animation), _this.popupEle.firstElementChild);
            }
        });
    };
    /**
     * Hides the popup if it is in open state.
     *
     * @param {MouseEvent | KeyboardEventArgs | TouchEvent} e - Specifies the event.
     * @returns {void}
     */
    MultiColumnComboBox.prototype.hidePopup = function (e) {
        var _this = this;
        var animModel = { name: 'FadeOut', duration: 100 };
        var eventArgs = { popup: this.popupObj, event: e || null, cancel: false, animation: animModel };
        var target = e ? e.target : null;
        this.trigger('close', eventArgs, function (eventArgs) {
            if (!eventArgs.cancel) {
                _this.isPopupOpen = false;
                removeClass([_this.inputWrapper], [ICONANIMATION]);
                attributes(_this.inputEle, { 'aria-expanded': 'false' });
                _this.popupObj.hide(new Animation(eventArgs.animation));
                if (target && (target.classList.contains('e-multicolumn-list-icon') || target.classList.contains('e-rowcell'))) {
                    if (!_this.value) {
                        _this.gridObj.refreshColumns();
                    }
                    setTimeout(function () { _this.focusIn(e); });
                }
                else {
                    _this.focusOut();
                }
                _this.inputEle.removeAttribute('aria-owns');
                _this.inputEle.removeAttribute('aria-activedescendant');
            }
        });
        setTimeout(function () {
            if (_this.gridObj) {
                _this.gridObj.dataSource = _this.dataSource;
                _this.updateGridHeight(true, false);
            }
        }, 100);
    };
    /**
     * Adds a new item to the popup list. By default, new item appends to the list as the last item,
     * but you can insert based on the index parameter.
     *
     * @param { Object[] } items - Specifies an array of JSON data or a JSON data.
     * @param { number } index - Specifies the index to place the newly added item in the popup list.
     * @returns {void}
     */
    MultiColumnComboBox.prototype.addItems = function (items, index) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.gridObj.editSettings.allowAdding = true;
        this.gridObj.dataBind();
        this.isProtectedOnChange = prevOnChange;
        this.gridObj.addRecord(items, index);
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets all the list items bound on this component.
     *
     * @returns {Element[]}
     */
    MultiColumnComboBox.prototype.getItems = function () {
        return this.gridObj.getDataRows();
    };
    /**
     * Gets the data Object that matches the given value.
     *
     * @param { string } value - Specifies the value of the list item.
     * @returns {Object}
     */
    MultiColumnComboBox.prototype.getDataByValue = function (value) {
        var _this = this;
        if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof Array) {
            return this.dataSource.filter(function (item) {
                var fieldValue = _this.updateFieldValue(_this.fields.value, item);
                return fieldValue === value;
            })[0];
        }
        else if (!isNullOrUndefined(this.dataSource) && this.dataSource instanceof DataManager) {
            this.dataSource.executeQuery(new Query()).then(function (e) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var dataLists = e.result;
                return dataLists.filter(function (item) {
                    var fieldValue = _this.updateFieldValue(_this.fields.value, item);
                    return fieldValue === value;
                })[0];
            });
        }
        return null;
    };
    MultiColumnComboBox.prototype.destroy = function () {
        this.unWireEvents();
        if (this.gridObj) {
            this.gridObj.destroy();
            detach(this.gridObj.element);
        }
        if (this.inputEle) {
            var attrArray = ['placeholder', 'aria-expanded', 'spellcheck', 'aria-label', 'role', 'type',
                'aria-owns', 'aria-controls', 'aria-readonly', 'autocomplete', 'autocapitalize', 'spellcheck', 'aria-activedescendant'];
            for (var i = 0; i < attrArray.length; i++) {
                this.inputEle.removeAttribute(attrArray[i]);
            }
            this.inputEle.classList.remove('e-input');
            Input.setValue('', this.inputEle, this.floatLabelType, this.showClearButton);
        }
        if (this.popupEle) {
            this.popupEle.removeAttribute('aria-label');
            this.popupEle.removeAttribute('role');
        }
        if (this.popupObj) {
            this.popupObj.destroy();
            detach(this.popupObj.element);
        }
        if (this.element.tagName !== this.getDirective()) {
            this.inputWrapper.parentElement.insertBefore(this.element, this.inputWrapper);
        }
        if (this.inputObj) {
            detach(this.inputObj.container);
            this.inputObj = null;
        }
        Input.destroy({
            element: this.inputEle,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        });
        detach(this.inputWrapper);
        detach(this.popupDiv);
        this.inputEle = null;
        this.previousItemElement = null;
        this.inputWrapper.innerHTML = '';
        this.inputWrapper = null;
        this.popupDiv = null;
        this.popupObj = null;
        this.gridObj = null;
        this.gridEle = null;
        this.popupEle = null;
        this.footer = null;
        this.noRecord = null;
        this.hiddenElement = null;
        this.dropdownElement = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {MultiColumnComboBoxModel} newProp - Specifies new properties
     * @param  {MultiColumnComboBoxModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    MultiColumnComboBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            var gridColumns = void 0;
            switch (prop) {
                case 'width':
                case 'popupWidth':
                    if (prop === 'width') {
                        this.setElementWidth(newProp.width);
                    }
                    if (this.popupObj) {
                        this.popupObj.element.style.width = this.getSize(true);
                    }
                    break;
                case 'popupHeight':
                    if (this.popupObj) {
                        var height = this.getSize(false);
                        this.popupObj.element.style.maxHeight = height;
                        this.popupDiv.style.maxHeight = height;
                        this.gridObj.height = height;
                    }
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputEle);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputEle);
                    break;
                case 'disabled':
                    Input.setEnabled(!this.disabled, this.inputEle);
                    this.setEnable();
                    break;
                case 'cssClass':
                    this.setCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'floatLabelType':
                    Input.removeFloating(this.inputObj);
                    Input.addFloating(this.inputEle, this.floatLabelType, this.placeholder);
                    break;
                case 'showClearButton':
                    Input.setClearButton(newProp.showClearButton, this.inputEle, this.inputObj);
                    break;
                case 'value':
                    this.initValue(true, true);
                    break;
                case 'text':
                    this.initValue(true, false);
                    break;
                case 'index':
                    this.initValue(true);
                    break;
                case 'sortOrder':
                    if (this.gridObj) {
                        this.gridObj.sortSettings.columns = [{
                                field: this.fields.text, direction: newProp.sortOrder === SortOrder.Ascending ?
                                    SortOrder.Ascending : SortOrder.Descending
                            }];
                    }
                    break;
                case 'htmlAttributes':
                    this.setHTMLAttributes();
                    break;
                case 'noRecordsTemplate':
                    this.l10nUpdate();
                    break;
                case 'actionFailureTemplate':
                    this.l10nUpdate(true);
                    break;
                case 'footerTemplate':
                    this.setFooterTemplate();
                    break;
                case 'itemTemplate':
                    if (this.gridObj) {
                        this.gridObj.rowTemplate = newProp.itemTemplate;
                    }
                    break;
                case 'groupTemplate':
                    this.groupTemplate = newProp.groupTemplate;
                    this.updateGroupByField();
                    break;
                case 'enableRtl':
                    if (this.gridObj && this.popupObj) {
                        this.gridObj.enableRtl = newProp.enableRtl;
                        Input.setEnableRtl(newProp.enableRtl, [this.inputWrapper]);
                        this.popupObj.enableRtl = newProp.enableRtl;
                    }
                    break;
                case 'dataSource':
                    this.updateDynamicDataSource(newProp.dataSource, oldProp.dataSource);
                    break;
                case 'query':
                    if (this.gridObj) {
                        this.gridObj.query = newProp.query;
                    }
                    break;
                case 'gridSettings':
                    if (this.gridObj) {
                        this.gridObj.gridLines = newProp.gridSettings.gridLines;
                        this.gridObj.rowHeight = newProp.gridSettings.rowHeight;
                        this.gridObj.enableAltRow = newProp.gridSettings.enableAltRow;
                        this.gridObj.allowResizing = newProp.gridSettings.allowResizing;
                        if (!(isNullOrUndefined(newProp.gridSettings.allowTextWrap))) {
                            this.gridObj.allowTextWrap = newProp.gridSettings.allowTextWrap;
                        }
                        if (!(isNullOrUndefined(newProp.gridSettings.textWrapMode))) {
                            this.gridObj.textWrapSettings.wrapMode = newProp.gridSettings.textWrapMode;
                        }
                    }
                    break;
                case 'fields':
                    this.fields = newProp.fields;
                    this.updateGroupByField();
                    break;
                case 'filterType':
                    this.filterType = newProp.filterType;
                    break;
                case 'enableVirtualization':
                    if (this.gridObj) {
                        this.enableVirtualization = this.gridObj.enableVirtualization = newProp.enableVirtualization;
                    }
                    break;
                case 'sortType':
                    if (this.gridObj) {
                        this.sortType = newProp.sortType;
                        this.gridObj.allowMultiSorting = this.sortType.toString().toLowerCase() === 'multiplecolumns' && this.allowSorting;
                    }
                    break;
                case 'allowFiltering':
                    this.allowFiltering = newProp.allowFiltering;
                    break;
                case 'allowSorting':
                    if (this.gridObj) {
                        this.allowSorting = this.gridObj.allowSorting = newProp.allowSorting;
                    }
                    break;
                case 'columns':
                    if (this.gridObj) {
                        gridColumns = this.getGridColumns();
                        this.gridObj.columns = gridColumns;
                    }
                    break;
            }
        }
    };
    __decorate([
        Property([])
    ], MultiColumnComboBox.prototype, "dataSource", void 0);
    __decorate([
        Property(null)
    ], MultiColumnComboBox.prototype, "text", void 0);
    __decorate([
        Property(null)
    ], MultiColumnComboBox.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], MultiColumnComboBox.prototype, "index", void 0);
    __decorate([
        Property('100%')
    ], MultiColumnComboBox.prototype, "width", void 0);
    __decorate([
        Property('300px')
    ], MultiColumnComboBox.prototype, "popupHeight", void 0);
    __decorate([
        Property('100%')
    ], MultiColumnComboBox.prototype, "popupWidth", void 0);
    __decorate([
        Property(null)
    ], MultiColumnComboBox.prototype, "placeholder", void 0);
    __decorate([
        Property(true)
    ], MultiColumnComboBox.prototype, "allowFiltering", void 0);
    __decorate([
        Property(true)
    ], MultiColumnComboBox.prototype, "allowSorting", void 0);
    __decorate([
        Property(false)
    ], MultiColumnComboBox.prototype, "showClearButton", void 0);
    __decorate([
        Property('')
    ], MultiColumnComboBox.prototype, "cssClass", void 0);
    __decorate([
        Complex({ text: null, value: null, groupBy: null }, FieldSettings)
    ], MultiColumnComboBox.prototype, "fields", void 0);
    __decorate([
        Collection([], Column)
    ], MultiColumnComboBox.prototype, "columns", void 0);
    __decorate([
        Complex({}, GridSettings)
    ], MultiColumnComboBox.prototype, "gridSettings", void 0);
    __decorate([
        Property(FilterType.StartsWith)
    ], MultiColumnComboBox.prototype, "filterType", void 0);
    __decorate([
        Property('Never')
    ], MultiColumnComboBox.prototype, "floatLabelType", void 0);
    __decorate([
        Property(SortOrder.None)
    ], MultiColumnComboBox.prototype, "sortOrder", void 0);
    __decorate([
        Property(SortType.OneColumn)
    ], MultiColumnComboBox.prototype, "sortType", void 0);
    __decorate([
        Property(false)
    ], MultiColumnComboBox.prototype, "enableVirtualization", void 0);
    __decorate([
        Property(false)
    ], MultiColumnComboBox.prototype, "disabled", void 0);
    __decorate([
        Property(false)
    ], MultiColumnComboBox.prototype, "readonly", void 0);
    __decorate([
        Property(false)
    ], MultiColumnComboBox.prototype, "enablePersistence", void 0);
    __decorate([
        Property()
    ], MultiColumnComboBox.prototype, "query", void 0);
    __decorate([
        Property(null)
    ], MultiColumnComboBox.prototype, "itemTemplate", void 0);
    __decorate([
        Property(null)
    ], MultiColumnComboBox.prototype, "footerTemplate", void 0);
    __decorate([
        Property(null)
    ], MultiColumnComboBox.prototype, "groupTemplate", void 0);
    __decorate([
        Property('Request Failed')
    ], MultiColumnComboBox.prototype, "actionFailureTemplate", void 0);
    __decorate([
        Property('No records found')
    ], MultiColumnComboBox.prototype, "noRecordsTemplate", void 0);
    __decorate([
        Property({})
    ], MultiColumnComboBox.prototype, "htmlAttributes", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "created", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "open", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "close", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "actionFailure", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "filtering", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "select", void 0);
    __decorate([
        Event()
    ], MultiColumnComboBox.prototype, "change", void 0);
    MultiColumnComboBox = __decorate([
        NotifyPropertyChanges
    ], MultiColumnComboBox);
    return MultiColumnComboBox;
}(Component));

export { Column, FieldSettings, FilterType, GridSettings, MultiColumnComboBox, MultiColumnGrid, SortOrder, SortType, WrapMode };
//# sourceMappingURL=ej2-multicolumn-combobox.es5.js.map
