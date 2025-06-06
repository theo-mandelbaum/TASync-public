import { addClass, isNullOrUndefined, removeClass, select, closest } from '@syncfusion/ej2-base';
import { RenderType } from '../base/enum';
import { getIndex } from '../base/util';
import * as events from '../base/constant';
import * as classes from '../base/classes';
import { getDropDownValue, getFormattedFontSize } from '../base/util';
import * as model from '../models/items';
/**
 * `Toolbar` module is used to handle Toolbar actions.
 */
var DropDownButtons = /** @class */ (function () {
    function DropDownButtons(parent, serviceLocator) {
        this.parent = parent;
        this.locator = serviceLocator;
        this.i10n = serviceLocator.getService('rteLocale');
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
    }
    DropDownButtons.prototype.initializeInstance = function () {
        this.toolbarRenderer = this.renderFactory.getRenderer(RenderType.Toolbar);
    };
    DropDownButtons.prototype.beforeRender = function (args) {
        var item = args.item;
        if (item.cssClass) {
            addClass([args.element], item.cssClass);
        }
    };
    DropDownButtons.prototype.dropdownContent = function (width, type, content) {
        return ('<span style="display: inline-flex;' + 'width:' + ((type === 'quick') ? 'auto' : width) + '" >' +
            '<span class="e-rte-dropdown-btn-text">' + content + '</span></span>');
    };
    /**
     * renderDropDowns method
     *
     * @param {IDropDownRenderArgs} args - specifies the arguments
     * @returns {void}
     * @hidden
     * @param {HTMLElement} targetEle - specifies the arugument
     * @deprecated
     */
    DropDownButtons.prototype.renderDropDowns = function (args, targetEle) {
        var _this = this;
        this.initializeInstance();
        var type = args.containerType;
        var tbElement = args.container;
        model.templateItems.forEach(function (item) {
            var targetElement = undefined;
            if (getIndex(item, args.items) !== -1) {
                switch (item) {
                    case 'numberformatlist': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_NumberFormatList', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var formatOLItem = _this.parent.numberFormatList.types.slice();
                        formatOLItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Lists', enumerable: true }, subCommand: { value: 'NumberFormatList', enumerable: true }
                            });
                        });
                        _this.numberFormatListDropDown = _this.toolbarRenderer.renderListDropDown({
                            cssClass: 'e-order-list' + ' ' + classes.CLS_RTE_ELEMENTS + ' ' + classes.CLS_ICONS,
                            itemName: 'NumberFormatList', items: formatOLItem, element: targetElement
                        });
                        break;
                    }
                    case 'bulletformatlist': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_BulletFormatList', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var formatULItem = _this.parent.bulletFormatList.types.slice();
                        formatULItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Lists', enumerable: true }, subCommand: { value: 'BulletFormatList', enumerable: true }
                            });
                        });
                        _this.bulletFormatListDropDown = _this.toolbarRenderer.renderListDropDown({
                            cssClass: 'e-unorder-list' + ' ' + classes.CLS_RTE_ELEMENTS + ' ' + classes.CLS_ICONS,
                            itemName: 'BulletFormatList', items: formatULItem, element: targetElement
                        });
                        break;
                    }
                    case 'formats': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_Formats', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var formatItem = _this.parent.format.types.slice();
                        formatItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Formats', enumerable: true }, subCommand: { value: item.value, enumerable: true }
                            });
                        });
                        var formatContent = isNullOrUndefined(_this.parent.format.default) ? formatItem[0].text :
                            _this.parent.format.default;
                        _this.formatDropDown = _this.toolbarRenderer.renderDropDownButton({
                            iconCss: ((type === 'quick') ? 'e-formats e-icons' : ''),
                            content: _this.dropdownContent(_this.parent.format.width, type, ((type === 'quick') ? '' : getDropDownValue(formatItem, formatContent, 'text', 'text'))),
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_FORMATS_TB_BTN,
                            itemName: 'Formats', items: formatItem, element: targetElement
                        });
                        break;
                    }
                    case 'fontname': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_FontName', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var fontItem = _this.parent.fontFamily.items.slice();
                        fontItem.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Font', enumerable: true }, subCommand: { value: 'FontName', enumerable: true }
                            });
                        });
                        var fontNameContent = isNullOrUndefined(_this.parent.fontFamily.default) ? fontItem.length === 0 ? '' : fontItem[0].text :
                            _this.parent.fontFamily.default;
                        _this.fontNameDropDown = _this.toolbarRenderer.renderDropDownButton({
                            iconCss: ((type === 'quick') ? 'e-font-name e-icons' : ''),
                            content: _this.dropdownContent(_this.parent.fontFamily.width, type, ((fontItem.length === 0) ? _this.i10n.getConstant('fontName') : (type === 'quick') ? '' : (getDropDownValue(fontItem, fontNameContent, 'text', 'text') === 'Default' ? _this.i10n.getConstant('fontName') : getDropDownValue(fontItem, fontNameContent, 'text', 'text')))),
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_FONT_NAME_TB_BTN,
                            itemName: 'FontName', items: fontItem, element: targetElement
                        });
                        break;
                    }
                    case 'fontsize': {
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_FontSize', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        var fontsize = !isNullOrUndefined(_this.fontSizeDropDown) &&
                            !isNullOrUndefined(_this.fontSizeDropDown.items) && _this.fontSizeDropDown.items.length > 0 ?
                            _this.fontSizeDropDown.items : JSON.parse(JSON.stringify(_this.parent.fontSize.items.slice()));
                        fontsize.forEach(function (item) {
                            Object.defineProperties(item, {
                                command: { value: 'Font', enumerable: true }, subCommand: { value: 'FontSize', enumerable: true }
                            });
                        });
                        var fontSizeContent = isNullOrUndefined(_this.parent.fontSize.default) ? fontsize.length === 0 ? '' : fontsize[0].text :
                            _this.parent.fontSize.default;
                        var fontSizeDropDownContent = ((fontSizeContent === 'Default') ? getDropDownValue(fontsize, fontSizeContent.replace(/\s/g, ''), 'text', 'text') : getDropDownValue(fontsize, fontSizeContent.replace(/\s/g, ''), 'value', 'text'));
                        _this.fontSizeDropDown = _this.toolbarRenderer.renderDropDownButton({
                            content: _this.dropdownContent(_this.parent.fontSize.width, type, fontsize.length === 0 ? _this.i10n.getConstant('fontSize') : (getFormattedFontSize((fontSizeDropDownContent === 'Default') ? _this.i10n.getConstant('fontSize') : fontSizeDropDownContent))),
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_FONT_SIZE_TB_BTN,
                            itemName: 'FontSize', items: fontsize, element: targetElement
                        });
                        break;
                    }
                    case 'alignments':
                        targetElement = select('#' + _this.parent.getID() + '_' + type + '_Alignments', tbElement);
                        if (isNullOrUndefined(targetElement) || targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
                            return;
                        }
                        _this.alignDropDown = _this.toolbarRenderer.renderDropDownButton({
                            iconCss: 'e-justify-left e-icons',
                            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_ALIGN_TB_BTN,
                            itemName: 'Alignments', items: model.alignmentItems, element: targetElement
                        });
                        break;
                    case 'align':
                    case 'videoalign':
                        _this.renderAlignmentDropDown(type, tbElement, targetEle, item);
                        break;
                    case 'display':
                    case 'audiolayoutoption':
                    case 'videolayoutoption':
                        _this.renderDisplayDropDown(type, tbElement, targetEle, item);
                        break;
                    case 'tablerows':
                        _this.rowDropDown(type, tbElement, targetElement, targetEle);
                        break;
                    case 'tablecolumns':
                        _this.columnDropDown(type, tbElement, targetElement);
                        break;
                    case 'tablecell':
                        _this.cellDropDown(type, tbElement, targetElement);
                        break;
                    case 'tablecellverticalalign':
                        _this.verticalAlignDropDown(type, tbElement, targetElement);
                        break;
                    case 'styles':
                        _this.tableStylesDropDown(type, tbElement, targetElement);
                        break;
                }
            }
        });
        if (this.parent.inlineMode.enable) {
            this.setCssClass({ cssClass: this.parent.getCssClass() });
        }
    };
    DropDownButtons.prototype.getUpdateItems = function (items, value) {
        var dropDownItems = items.slice();
        dropDownItems.forEach(function (item) {
            Object.defineProperties(item, {
                command: { value: (value === 'Format' ? 'Formats' : 'Font'), enumerable: true },
                subCommand: { value: (value === 'Format' ? item.value : value), enumerable: true }
            });
        });
        return dropDownItems;
    };
    DropDownButtons.prototype.onPropertyChanged = function (model) {
        var newProp = model.newProp;
        var type;
        var content;
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'fontFamily':
                    if (this.fontNameDropDown) {
                        for (var _b = 0, _c = Object.keys(newProp.fontFamily); _b < _c.length; _b++) {
                            var fontFamily = _c[_b];
                            switch (fontFamily) {
                                case 'default':
                                case 'width': {
                                    var fontItems = this.fontNameDropDown.items;
                                    type = !isNullOrUndefined(closest(this.fontNameDropDown.element, '.' + classes.CLS_QUICK_TB)) ?
                                        'quick' : 'toolbar';
                                    var fontNameContent = isNullOrUndefined(this.parent.fontFamily.default) ? fontItems[0].text :
                                        this.parent.fontFamily.default;
                                    content = this.dropdownContent(this.parent.fontFamily.width, type, ((type === 'quick') ? '' : (getDropDownValue(fontItems, fontNameContent, 'text', 'text')) === 'Default' ? this.i10n.getConstant('fontName') : getDropDownValue(fontItems, fontNameContent, 'text', 'text')));
                                    this.fontNameDropDown.setProperties({ content: content });
                                    if (!isNullOrUndefined(this.parent.fontFamily.default)) {
                                        this.getEditNode().style.fontFamily = this.parent.fontFamily.default;
                                    }
                                    else {
                                        this.getEditNode().style.removeProperty('font-family');
                                    }
                                    break;
                                }
                                case 'items':
                                    this.fontNameDropDown.setProperties({
                                        items: this.getUpdateItems(newProp.fontFamily.items, 'FontName')
                                    });
                                    break;
                            }
                        }
                    }
                    break;
                case 'fontSize':
                    if (this.fontSizeDropDown) {
                        for (var _d = 0, _e = Object.keys(newProp.fontSize); _d < _e.length; _d++) {
                            var fontSize = _e[_d];
                            switch (fontSize) {
                                case 'default':
                                case 'width': {
                                    var fontsize = this.fontSizeDropDown.items;
                                    type = !isNullOrUndefined(closest(this.fontSizeDropDown.element, '.' + classes.CLS_QUICK_TB)) ? 'quick' : 'toolbar';
                                    var fontSizeContent = isNullOrUndefined(this.parent.fontSize.default) ? fontsize[0].text :
                                        this.parent.fontSize.default;
                                    var fontSizeDropDownContent = ((fontSizeContent === 'Default') ? getDropDownValue(fontsize, fontSizeContent.replace(/\s/g, ''), 'text', 'text') : getDropDownValue(fontsize, fontSizeContent.replace(/\s/g, ''), 'value', 'text'));
                                    content = this.dropdownContent(this.parent.fontSize.width, type, getFormattedFontSize((fontSizeDropDownContent === 'Default') ? this.i10n.getConstant('fontSize') : fontSizeDropDownContent));
                                    this.fontSizeDropDown.setProperties({ content: content });
                                    if (!isNullOrUndefined(this.parent.fontSize.default)) {
                                        this.getEditNode().style.fontSize = this.parent.fontSize.default;
                                    }
                                    else {
                                        this.getEditNode().style.removeProperty('font-size');
                                    }
                                    break;
                                }
                                case 'items':
                                    this.fontSizeDropDown.setProperties({
                                        items: this.getUpdateItems(newProp.fontSize.items, 'FontSize')
                                    });
                                    break;
                            }
                        }
                    }
                    break;
                case 'format':
                    if (this.formatDropDown) {
                        for (var _f = 0, _g = Object.keys(newProp.format); _f < _g.length; _f++) {
                            var format = _g[_f];
                            switch (format) {
                                case 'default':
                                case 'width': {
                                    var formatItems = this.formatDropDown.items;
                                    type = !isNullOrUndefined(closest(this.formatDropDown.element, '.' + classes.CLS_QUICK_TB)) ? 'quick' : 'toolbar';
                                    var formatContent = isNullOrUndefined(this.parent.format.default) ? formatItems[0].text :
                                        this.parent.format.default;
                                    content = this.dropdownContent(this.parent.format.width, type, ((type === 'quick') ? '' : getDropDownValue(formatItems, formatContent, 'text', 'text')));
                                    this.formatDropDown.setProperties({ content: content });
                                    break;
                                }
                                case 'types':
                                    this.formatDropDown.setProperties({
                                        items: this.getUpdateItems(newProp.format.types, 'Format')
                                    });
                                    break;
                            }
                        }
                    }
                    break;
            }
        }
    };
    DropDownButtons.prototype.getEditNode = function () {
        return this.parent.contentModule.getEditPanel();
    };
    DropDownButtons.prototype.rowDropDown = function (type, tbElement, targetElement, targetEle) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableRows', tbElement);
        var rowItems = Array.from(model.tableRowsItems);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        if (targetEle.closest('th')) {
            rowItems.shift();
        }
        this.tableRowsDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-rows e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableRows',
            items: rowItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.columnDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableColumns', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.tableColumnsDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-columns e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableColumns',
            items: model.tableColumnsItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.cellDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableCell', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.tableCellDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-cell e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableCell',
            items: model.tableCellItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.verticalAlignDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_TableCellVerticalAlign', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.tableCellVerticalAlignDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-table-cell-ver-align e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'TableCellVerticalAlign',
            items: model.TableCellVerticalAlignItems,
            element: targetElement
        });
    };
    DropDownButtons.prototype.renderDisplayDropDown = function (type, tbElement, targetElement, item) {
        var targetEle = targetElement;
        targetElement = select('#' + this.parent.getID() + '_' + type + (item === 'display' ? '_Display' : item === 'videolayoutoption' ? '_VideoLayoutOption' : '_AudioLayoutOption'), tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.displayDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: item === 'display' ? 'e-display e-icons' : item === 'videolayoutoption' ? 'e-video-display e-icons' : 'e-audio-display e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ITEMS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: item === 'display' ? 'Display' : item === 'videolayoutoption' ? 'VideoLayoutOption' : 'AudioLayoutOption',
            items: item === 'display' ? model.imageDisplayItems : item === 'videolayoutoption' ? model.videoLayoutOptionItems : model.audioLayoutOptionItems,
            element: targetElement,
            activeElement: targetEle
        });
    };
    DropDownButtons.prototype.renderAlignmentDropDown = function (type, tbElement, targetElement, item) {
        var targetEle = targetElement;
        targetElement = select('#' + this.parent.getID() + '_' + type + (item === 'align' ? '_Align' : '_VideoAlign'), tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.imageAlignDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-justify-left e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ICONS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: item === 'align' ? 'Align' : 'VideoAlign',
            items: item === 'align' ? model.imageAlignItems : model.videoAlignItems,
            element: targetElement,
            activeElement: targetEle
        });
    };
    DropDownButtons.prototype.tableStylesDropDown = function (type, tbElement, targetElement) {
        targetElement = select('#' + this.parent.getID() + '_' + type + '_Styles', tbElement);
        if (targetElement.classList.contains(classes.CLS_DROPDOWN_BTN)) {
            return;
        }
        this.imageAlignDropDown = this.toolbarRenderer.renderDropDownButton({
            iconCss: 'e-style e-icons',
            cssClass: classes.CLS_DROPDOWN_POPUP + ' ' + classes.CLS_DROPDOWN_ICONS + ' ' + classes.CLS_QUICK_DROPDOWN,
            itemName: 'Styles',
            items: this.parent.tableSettings.styles,
            element: targetElement
        });
    };
    DropDownButtons.prototype.removeDropDownClasses = function (target) {
        removeClass([target], [
            classes.CLS_DROPDOWN_BTN,
            classes.CLS_DROPDOWN_POPUP,
            classes.CLS_DROPDOWN_ICONS,
            classes.CLS_DROPDOWN_ITEMS
        ]);
    };
    /**
     * destroyDropDowns method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DropDownButtons.prototype.destroyDropDowns = function () {
        if (this.formatDropDown) {
            this.removeDropDownClasses(this.formatDropDown.element);
            this.formatDropDown.destroy();
            this.formatDropDown = null;
        }
        if (this.fontNameDropDown) {
            this.removeDropDownClasses(this.fontNameDropDown.element);
            this.fontNameDropDown.destroy();
            this.fontNameDropDown = null;
        }
        if (this.fontSizeDropDown) {
            this.removeDropDownClasses(this.fontSizeDropDown.element);
            this.fontSizeDropDown.destroy();
            this.fontSizeDropDown = null;
        }
        if (this.alignDropDown) {
            this.removeDropDownClasses(this.alignDropDown.element);
            this.alignDropDown.destroy();
            this.alignDropDown = null;
        }
        if (this.imageAlignDropDown) {
            this.removeDropDownClasses(this.imageAlignDropDown.element);
            this.imageAlignDropDown.destroy();
            this.imageAlignDropDown = null;
        }
        if (this.displayDropDown) {
            this.removeDropDownClasses(this.displayDropDown.element);
            this.displayDropDown.destroy();
            this.displayDropDown = null;
        }
        if (this.tableRowsDropDown) {
            this.removeDropDownClasses(this.tableRowsDropDown.element);
            this.tableRowsDropDown.destroy();
            this.tableRowsDropDown = null;
        }
        if (this.tableColumnsDropDown) {
            this.removeDropDownClasses(this.tableColumnsDropDown.element);
            this.tableColumnsDropDown.destroy();
            this.tableColumnsDropDown = null;
        }
        if (this.tableCellDropDown) {
            this.removeDropDownClasses(this.tableCellDropDown.element);
            this.tableCellDropDown.destroy();
            this.tableCellDropDown = null;
        }
        if (this.tableCellVerticalAlignDropDown) {
            this.removeDropDownClasses(this.tableCellVerticalAlignDropDown.element);
            this.tableCellVerticalAlignDropDown.destroy();
            this.tableCellVerticalAlignDropDown = null;
        }
        if (this.numberFormatListDropDown) {
            this.removeDropDownClasses(this.numberFormatListDropDown.element);
            this.numberFormatListDropDown.destroy();
            this.numberFormatListDropDown = null;
        }
        if (this.bulletFormatListDropDown) {
            this.removeDropDownClasses(this.bulletFormatListDropDown.element);
            this.bulletFormatListDropDown.destroy();
            this.bulletFormatListDropDown = null;
        }
        this.toolbarRenderer = null;
    };
    DropDownButtons.prototype.setRtl = function (args) {
        if (this.formatDropDown) {
            this.formatDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.fontNameDropDown) {
            this.fontNameDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.fontSizeDropDown) {
            this.fontSizeDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.alignDropDown) {
            this.alignDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.imageAlignDropDown) {
            this.imageAlignDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.displayDropDown) {
            this.displayDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.numberFormatListDropDown) {
            this.numberFormatListDropDown.setProperties({ enableRtl: args.enableRtl });
        }
        if (this.bulletFormatListDropDown) {
            this.bulletFormatListDropDown.setProperties({ enableRtl: args.enableRtl });
        }
    };
    DropDownButtons.prototype.updateCss = function (dropDownObj, e) {
        if (dropDownObj && e.cssClass) {
            if (isNullOrUndefined(e.oldCssClass)) {
                dropDownObj.setProperties({ cssClass: (dropDownObj.cssClass + ' ' + e.cssClass).trim() });
            }
            else {
                dropDownObj.setProperties({ cssClass: (dropDownObj.cssClass.replace(e.oldCssClass, '').trim() + ' ' + e.cssClass).trim() });
            }
        }
    };
    DropDownButtons.prototype.setCssClass = function (e) {
        var dropDownObj = [
            this.formatDropDown, this.fontNameDropDown, this.fontSizeDropDown, this.alignDropDown, this.imageAlignDropDown,
            this.displayDropDown, this.numberFormatListDropDown, this.bulletFormatListDropDown, this.tableRowsDropDown,
            this.tableColumnsDropDown, this.tableCellDropDown, this.tableCellVerticalAlignDropDown
        ];
        for (var i = 0; i < dropDownObj.length; i++) {
            this.updateCss(dropDownObj[i], e);
        }
    };
    DropDownButtons.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.beforeDropDownItemRender, this.beforeRender, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.rtlMode, this.setRtl, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.bindCssClass, this.setCssClass, this);
    };
    DropDownButtons.prototype.onIframeMouseDown = function () {
        if (!isNullOrUndefined(this.parent.getToolbarElement()) && (this.parent.getToolbarElement().querySelectorAll('.e-rte-dropdown-btn[aria-expanded="true"]').length > 0 || this.parent.getToolbarElement().querySelectorAll('.e-dropdown-btn.e-rte-inline-dropdown[aria-expanded="true"]').length > 0)) {
            this.closeOpenDropdowns();
        }
    };
    DropDownButtons.prototype.closeOpenDropdowns = function () {
        var dropdowns = [
            this.formatDropDown,
            this.fontNameDropDown,
            this.fontSizeDropDown,
            this.alignDropDown,
            this.imageAlignDropDown,
            this.displayDropDown,
            this.numberFormatListDropDown,
            this.bulletFormatListDropDown,
            this.tableRowsDropDown,
            this.tableColumnsDropDown,
            this.tableCellDropDown,
            this.tableCellVerticalAlignDropDown,
            this.parent.toolbarModule.colorPickerModule.fontColorDropDown,
            this.parent.toolbarModule.colorPickerModule.backgroundColorDropDown
        ];
        dropdowns.forEach(function (dropdown) {
            if (dropdown && dropdown.dropDown && dropdown.dropDown.element && dropdown.dropDown.element.classList.contains('e-popup-open')) {
                dropdown.toggle();
            }
        });
    };
    DropDownButtons.prototype.removeEventListener = function () {
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.rtlMode, this.setRtl);
        this.parent.off(events.beforeDropDownItemRender, this.beforeRender);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.bindCssClass, this.setCssClass);
    };
    DropDownButtons.prototype.destroy = function () {
        this.removeEventListener();
        this.destroyDropDowns();
    };
    return DropDownButtons;
}());
export { DropDownButtons };
