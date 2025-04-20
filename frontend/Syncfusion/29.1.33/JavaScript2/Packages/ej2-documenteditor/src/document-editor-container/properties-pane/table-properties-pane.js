import { createElement, classList, L10n, remove } from '@syncfusion/ej2-base';
import { Tab } from '@syncfusion/ej2-navigations';
import { TextProperties } from './text-properties-pane';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { NumericTextBox, ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * Represents table properties
 *
 * @private
 */
var TableProperties = /** @class */ (function () {
    function TableProperties(container, imageProperty, isRtl) {
        this.isTopMarginApply = false;
        this.isRightMarginApply = false;
        this.isBottomMarginApply = false;
        this.isLeftMarginApply = false;
        this.borderColor = '#000000';
        this.groupButtonClass = 'e-de-ctnr-group-btn e-btn-group';
        //Event Handler
        this.onOutlineBorderClickHandler = this.onOutlineBorder.bind(this);
        this.onAllBorderHandler = this.onAllBorder.bind(this);
        this.onInsideBorderHandler = this.onInsideBorder.bind(this);
        this.onLeftBorderHandler = this.onLeftBorder.bind(this);
        this.onVerticalBorderHandler = this.onVerticalBorder.bind(this);
        this.onRightBorderHandler = this.onRightBorder.bind(this);
        this.onTopBorderHandler = this.onTopBorder.bind(this);
        this.onHorizontalBorderHandler = this.onHorizontalBorder.bind(this);
        this.onBottomBorderHandler = this.onBottomBorder.bind(this);
        this.onInsertRowAboveHandler = this.onInsertRowAbove.bind(this);
        this.onInsertRowBelowHandler = this.onInsertRowBelow.bind(this);
        this.onInsertColumnLeftHandler = this.onInsertColumnLeft.bind(this);
        this.onInsertColumnRightHandler = this.onInsertColumnRight.bind(this);
        this.onDeleteRowHandler = this.onDeleteRow.bind(this);
        this.onDeleteColumnHandler = this.onDeleteColumn.bind(this);
        this.onMergeCellHandler = this.onMergeCell.bind(this);
        this.applyAlignTopHandler = this.applyAlignTop.bind(this);
        this.applyAlignBottomHandler = this.applyAlignBottom.bind(this);
        this.applyAlignCenterHorizontalHandler = this.applyAlignCenterHorizontal.bind(this);
        this.onTopMarginHandler = this.onTopMargin.bind(this);
        this.onRightMarginHandler = this.onRightMargin.bind(this);
        this.onLeftMarginHandler = this.onLeftMargin.bind(this);
        this.onBottomMarginHandler = this.onBottomMargin.bind(this);
        this.onTopMarginClickHandler = this.onTopMarginClick.bind(this);
        this.onTopMarginBlurHandler = this.onTopMarginBlur.bind(this);
        this.onRightMarginClickHandler = this.onRightMarginClick.bind(this);
        this.onRightMarginBlurHandler = this.onRightMarginBlur.bind(this);
        this.onLeftMarginClickHandler = this.onLeftMarginClick.bind(this);
        this.onLeftMarginBlurHandler = this.onLeftMarginBlur.bind(this);
        this.onBottomMarginClickHandler = this.onBottomMarginClick.bind(this);
        this.onBottomMarginBlurHandler = this.onBottomMarginBlur.bind(this);
        this.container = container;
        this.isRtl = isRtl;
        if (this.isRtl) {
            this.groupButtonClass = 'e-rtl ' + this.groupButtonClass;
        }
        this.tableTextProperties = new TextProperties(container, 'textProperties', true, this.isRtl);
        this.imageProperty = imageProperty;
        this.elementId = this.documentEditor.element.id;
        this.initializeTablePropPane();
        this.prevContext = this.documentEditor.selectionModule.contextType;
    }
    Object.defineProperty(TableProperties.prototype, "documentEditor", {
        get: function () {
            return this.container.documentEditor;
        },
        enumerable: true,
        configurable: true
    });
    TableProperties.prototype.initializeTablePropPane = function () {
        this.localObj = new L10n('documenteditorcontainer', this.container.defaultLocale, this.container.locale);
        this.tableProperties = createElement('div', { className: 'e-de-scrollbar-hide', styles: 'overflow: auto' });
        this.initFillColorDiv();
        this.initBorderStylesDiv();
        this.initCellDiv();
        this.initInsertOrDelCell();
        this.initCellMargin();
        this.initAlignText();
        this.addTablePropertyTab();
        // wire fnt property
        this.wireEvent();
    };
    /**
     * @private
     * @param {boolean} enable - enable/disable table properties pane.
     * @returns {void}
     */
    TableProperties.prototype.enableDisableElements = function (enable) {
        if (enable) {
            classList(this.element, [], ['e-de-overlay']);
        }
        else {
            classList(this.element, ['e-de-overlay'], []);
        }
    };
    TableProperties.prototype.addTablePropertyTab = function () {
        var tableHeader = createElement('div', { innerHTML: this.localObj.getConstant('Table') });
        var textHeader = createElement('div', { innerHTML: this.localObj.getConstant('Text') });
        this.parentElement = createElement('div', { styles: 'height:100%;overflow:auto;display:none', className: 'e-de-prop-pane e-de-scrollbar-hide' });
        this.element = createElement('div', { id: this.elementId + '_propertyTabDiv', className: 'e-de-property-tab' });
        /* eslint-disable-next-line max-len */
        var items = [{ header: { text: textHeader }, content: this.tableTextProperties.element }, { header: { text: tableHeader }, content: this.tableProperties }];
        this.propertiesTab = new Tab({ items: items, animation: { previous: { effect: 'None' }, next: { effect: 'None' } }, selected: this.onTabSelection.bind(this) });
        this.propertiesTab.isStringTemplate = true;
        this.propertiesTab.appendTo(this.element);
        this.parentElement.appendChild(this.element);
        this.container.propertiesPaneContainer.appendChild(this.parentElement);
    };
    TableProperties.prototype.onTabSelection = function (args) {
        args.preventFocus = true;
        this.documentEditor.resize();
        if (this.documentEditor.enableAutoFocus) {
            this.documentEditor.focusIn();
        }
    };
    TableProperties.prototype.wireEvent = function () {
        var _this = this;
        this.shadingBtn.addEventListener('change', this.changeBackgroundColor.bind(this));
        this.borderBtn.addEventListener('change', function (args) {
            setTimeout(function () {
                _this.borderColor = args.currentValue.hex;
                _this.tableOutlineBorder.element.focus();
            }, 10);
        });
        this.tableOutlineBorder.element.addEventListener('click', this.onOutlineBorderClickHandler);
        this.tableAllBorder.element.addEventListener('click', this.onAllBorderHandler);
        this.tableCenterBorder.element.addEventListener('click', this.onInsideBorderHandler);
        this.tableLeftBorder.element.addEventListener('click', this.onLeftBorderHandler);
        this.tableCenterVerticalBorder.element.addEventListener('click', this.onVerticalBorderHandler);
        this.tableRightBorder.element.addEventListener('click', this.onRightBorderHandler);
        this.tableTopBorder.element.addEventListener('click', this.onTopBorderHandler);
        this.tableCenterHorizontalBorder.element.addEventListener('click', this.onHorizontalBorderHandler);
        this.tableBottomBorder.element.addEventListener('click', this.onBottomBorderHandler);
        this.insertRowAbove.element.addEventListener('click', this.onInsertRowAboveHandler);
        this.insertRowBelow.element.addEventListener('click', this.onInsertRowBelowHandler);
        this.insertColumnLeft.element.addEventListener('click', this.onInsertColumnLeftHandler);
        this.insertColumnRight.element.addEventListener('click', this.onInsertColumnRightHandler);
        this.deleteRow.element.addEventListener('click', this.onDeleteRowHandler);
        this.deleteColumn.element.addEventListener('click', this.onDeleteColumnHandler);
        this.horizontalMerge.element.addEventListener('click', this.onMergeCellHandler);
        this.alignTop.element.addEventListener('click', this.applyAlignTopHandler);
        this.alignBottom.element.addEventListener('click', this.applyAlignBottomHandler);
        this.alignCenterHorizontal.element.addEventListener('click', this.applyAlignCenterHorizontalHandler);
        this.topMargin.htmlAttributes = { 'aria-label': 'top-margin' };
        this.bottomMargin.htmlAttributes = { 'aria-label': 'bottom-margin' };
        this.leftMargin.htmlAttributes = { 'aria-label': 'left-margin' };
        this.rightMargin.htmlAttributes = { 'aria-label': 'right-Margin' };
        this.topMargin.element.addEventListener('click', this.onTopMarginClickHandler);
        this.rightMargin.element.addEventListener('click', this.onRightMarginClickHandler);
        this.leftMargin.element.addEventListener('click', this.onLeftMarginClickHandler);
        this.bottomMargin.element.addEventListener('click', this.onBottomMarginClickHandler);
        this.topMargin.element.addEventListener('keydown', this.onTopMarginHandler);
        this.rightMargin.element.addEventListener('keydown', this.onRightMarginHandler);
        this.leftMargin.element.addEventListener('keydown', this.onLeftMarginHandler);
        this.bottomMargin.element.addEventListener('keydown', this.onBottomMarginHandler);
        this.topMargin.element.addEventListener('blur', this.onTopMarginBlurHandler);
        this.rightMargin.element.addEventListener('blur', this.onRightMarginBlurHandler);
        this.leftMargin.element.addEventListener('blur', this.onLeftMarginBlurHandler);
        this.bottomMargin.element.addEventListener('blur', this.onBottomMarginBlurHandler);
    };
    TableProperties.prototype.unWireEvent = function () {
        //Event Handler
        this.shadingBtn.removeEventListener('change', this.changeBackgroundColor);
        this.tableOutlineBorder.element.removeEventListener('click', this.onOutlineBorderClickHandler);
        this.tableAllBorder.element.removeEventListener('click', this.onAllBorderHandler);
        this.tableCenterBorder.element.removeEventListener('click', this.onInsideBorderHandler);
        this.tableLeftBorder.element.removeEventListener('click', this.onLeftBorderHandler);
        this.tableCenterVerticalBorder.element.removeEventListener('click', this.onVerticalBorderHandler);
        this.tableRightBorder.element.removeEventListener('click', this.onRightBorderHandler);
        this.tableTopBorder.element.removeEventListener('click', this.onTopBorderHandler);
        this.tableCenterHorizontalBorder.element.removeEventListener('click', this.onHorizontalBorderHandler);
        this.tableBottomBorder.element.removeEventListener('click', this.onBottomBorderHandler);
        this.insertRowAbove.element.removeEventListener('click', this.onInsertRowAboveHandler);
        this.insertRowBelow.element.removeEventListener('click', this.onInsertRowBelowHandler);
        this.insertColumnLeft.element.removeEventListener('click', this.onInsertColumnLeftHandler);
        this.insertColumnRight.element.removeEventListener('click', this.onInsertColumnRightHandler);
        this.deleteRow.element.removeEventListener('click', this.onDeleteRowHandler);
        this.deleteColumn.element.removeEventListener('click', this.onDeleteColumnHandler);
        this.horizontalMerge.element.removeEventListener('click', this.onMergeCellHandler);
        this.alignTop.element.removeEventListener('click', this.applyAlignTopHandler);
        this.alignBottom.element.removeEventListener('click', this.applyAlignBottomHandler);
        this.alignCenterHorizontal.element.removeEventListener('click', this.applyAlignCenterHorizontalHandler);
        this.topMargin.element.removeEventListener('click', this.onTopMarginClickHandler);
        this.rightMargin.element.removeEventListener('click', this.onRightMarginClickHandler);
        this.leftMargin.element.removeEventListener('click', this.onLeftMarginClickHandler);
        this.bottomMargin.element.removeEventListener('click', this.onBottomMarginClickHandler);
        this.topMargin.element.removeEventListener('keydown', this.onTopMarginHandler);
        this.rightMargin.element.removeEventListener('keydown', this.onRightMarginHandler);
        this.leftMargin.element.removeEventListener('keydown', this.onLeftMarginHandler);
        this.bottomMargin.element.removeEventListener('keydown', this.onBottomMarginHandler);
        this.topMargin.element.removeEventListener('blur', this.onTopMarginBlurHandler);
        this.rightMargin.element.removeEventListener('blur', this.onRightMarginBlurHandler);
        this.leftMargin.element.removeEventListener('blur', this.onLeftMarginBlurHandler);
        this.bottomMargin.element.removeEventListener('blur', this.onBottomMarginBlurHandler);
    };
    TableProperties.prototype.onTopMarginClick = function () {
        this.isTopMarginApply = true;
    };
    TableProperties.prototype.onTopMarginBlur = function () {
        this.applyTopMargin();
        this.isTopMarginApply = false;
    };
    TableProperties.prototype.onRightMarginClick = function () {
        this.isRightMarginApply = true;
    };
    TableProperties.prototype.onRightMarginBlur = function () {
        this.applyRightMargin();
        this.isRightMarginApply = false;
    };
    TableProperties.prototype.onLeftMarginClick = function () {
        this.isLeftMarginApply = true;
    };
    TableProperties.prototype.onLeftMarginBlur = function () {
        this.applyLeftMargin();
        this.isLeftMarginApply = false;
    };
    TableProperties.prototype.onBottomMarginClick = function () {
        this.isBottomMarginApply = true;
    };
    TableProperties.prototype.onBottomMarginBlur = function () {
        this.applyBottomMargin();
        this.isBottomMarginApply = false;
    };
    TableProperties.prototype.getBorder = function (border) {
        var lineWidth = (this.borderSize.content.indexOf('No Border') >= 0) ? 0 : parseFloat(this.borderSize.content);
        var linestyle = (lineWidth === 0) ? 'Cleared' : 'Single';
        var borderSettings = {
            type: border,
            borderColor: this.borderColor,
            lineWidth: lineWidth,
            borderStyle: linestyle
        };
        return borderSettings;
    };
    TableProperties.prototype.onOutlineBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('OutsideBorders'));
    };
    TableProperties.prototype.onAllBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('AllBorders'));
    };
    TableProperties.prototype.onInsideBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('InsideBorders'));
    };
    TableProperties.prototype.onLeftBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('LeftBorder'));
    };
    TableProperties.prototype.onVerticalBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('InsideVerticalBorder'));
    };
    TableProperties.prototype.onRightBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('RightBorder'));
    };
    TableProperties.prototype.onTopBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('TopBorder'));
    };
    TableProperties.prototype.onHorizontalBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('InsideHorizontalBorder'));
    };
    TableProperties.prototype.onBottomBorder = function () {
        this.documentEditor.editorModule.applyBorders(this.getBorder('BottomBorder'));
    };
    TableProperties.prototype.onTopMargin = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyTopMargin();
                _this.isTopMarginApply = false;
            }, 30);
        }
    };
    TableProperties.prototype.onBottomMargin = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyBottomMargin();
                _this.isBottomMarginApply = false;
            }, 30);
        }
    };
    TableProperties.prototype.onLeftMargin = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyLeftMargin();
                _this.isLeftMarginApply = false;
            }, 30);
        }
    };
    TableProperties.prototype.onRightMargin = function (e) {
        var _this = this;
        if (e.keyCode === 13) {
            setTimeout(function () {
                _this.applyRightMargin();
                _this.isRightMarginApply = false;
            }, 30);
        }
    };
    TableProperties.prototype.applyTopMargin = function () {
        if (!this.isTopMarginApply) {
            return;
        }
        this.documentEditor.selectionModule.cellFormat.topMargin = (this.topMargin.value > this.topMargin.max)
            ? this.topMargin.max : this.topMargin.value;
    };
    TableProperties.prototype.applyBottomMargin = function () {
        if (!this.isBottomMarginApply) {
            return;
        }
        this.documentEditor.selectionModule.cellFormat.bottomMargin = (this.bottomMargin.value > this.bottomMargin.max)
            ? this.bottomMargin.max : this.bottomMargin.value;
    };
    TableProperties.prototype.applyLeftMargin = function () {
        if (!this.isLeftMarginApply) {
            return;
        }
        this.documentEditor.selectionModule.cellFormat.leftMargin = (this.leftMargin.value > this.leftMargin.max)
            ? this.leftMargin.max : this.leftMargin.value;
    };
    TableProperties.prototype.applyRightMargin = function () {
        if (!this.isRightMarginApply) {
            return;
        }
        this.documentEditor.selectionModule.cellFormat.rightMargin = (this.rightMargin.value > this.rightMargin.max)
            ? this.rightMargin.max : this.rightMargin.value;
    };
    TableProperties.prototype.applyAlignTop = function () {
        this.documentEditor.selectionModule.cellFormat.verticalAlignment = 'Top';
    };
    TableProperties.prototype.applyAlignBottom = function () {
        this.documentEditor.selectionModule.cellFormat.verticalAlignment = 'Bottom';
    };
    TableProperties.prototype.applyAlignCenterHorizontal = function () {
        this.documentEditor.selectionModule.cellFormat.verticalAlignment = 'Center';
    };
    TableProperties.prototype.onMergeCell = function () {
        this.documentEditor.editorModule.mergeCells();
    };
    TableProperties.prototype.onInsertRowAbove = function () {
        this.documentEditor.editorModule.insertRow(true);
    };
    TableProperties.prototype.onInsertRowBelow = function () {
        this.documentEditor.editorModule.insertRow(false);
    };
    TableProperties.prototype.onInsertColumnLeft = function () {
        this.documentEditor.editorModule.insertColumn(true);
    };
    TableProperties.prototype.onInsertColumnRight = function () {
        this.documentEditor.editorModule.insertColumn(false);
    };
    TableProperties.prototype.onDeleteRow = function () {
        this.documentEditor.editorModule.deleteRow();
        this.documentEditor.focusIn();
    };
    TableProperties.prototype.onDeleteColumn = function () {
        this.documentEditor.editorModule.deleteColumn();
        this.documentEditor.focusIn();
    };
    TableProperties.prototype.onSelectionChange = function () {
        if (this.documentEditor.selectionModule) {
            if (this.documentEditor.editorModule && this.documentEditor.editorModule.canMergeCells()) {
                this.horizontalMerge.disabled = false;
            }
            else {
                this.horizontalMerge.disabled = true;
            }
            if (this.documentEditor.selectionModule.contextType === 'TableText' || this.documentEditor.selectionModule.contextType === 'TableImage') {
                this.shadingBtn.value = this.documentEditor.selectionModule.cellFormat.background ? this.documentEditor.selectionModule.cellFormat.background : '';
            }
            /* eslint-disable-next-line max-len */
            this.topMargin.value = this.documentEditor.selectionModule.cellFormat.topMargin ? this.documentEditor.selectionModule.cellFormat.topMargin : 0;
            /* eslint-disable-next-line max-len */
            this.bottomMargin.value = this.documentEditor.selectionModule.cellFormat.bottomMargin ? this.documentEditor.selectionModule.cellFormat.bottomMargin : 0;
            /* eslint-disable-next-line max-len */
            this.rightMargin.value = this.documentEditor.selectionModule.cellFormat.rightMargin ? this.documentEditor.selectionModule.cellFormat.rightMargin : 0;
            /* eslint-disable-next-line max-len */
            this.leftMargin.value = this.documentEditor.selectionModule.cellFormat.leftMargin ? this.documentEditor.selectionModule.cellFormat.leftMargin : 0;
        }
    };
    TableProperties.prototype.changeBackgroundColor = function (args) {
        var _this = this;
        if (!this.documentEditor.isReadOnly) {
            //Handle API for shading.
            this.documentEditor.selectionModule.cellFormat.background = args.currentValue.hex;
            setTimeout(function () {
                _this.documentEditor.focusIn();
            }, 10);
        }
    };
    TableProperties.prototype.initFillColorDiv = function () {
        var fillDiv = createElement('div', { id: this.elementId + '_fillColorDiv', className: 'e-de-property-div-padding de-tbl-fill-clr' });
        this.tableProperties.appendChild(fillDiv);
        var label = createElement('label', { className: 'e-de-prop-sub-label' });
        label.classList.add('e-de-prop-fill-label');
        if (this.isRtl) {
            label.classList.add('e-de-rtl');
        }
        label.textContent = this.localObj.getConstant('Fill');
        fillDiv.appendChild(label);
        // const buttonStyle: string = 'width:92px;display:inline-flex;padding:3px';
        this.shadingBtn = this.createColorPickerTemplate(this.elementId + '_tableShading', fillDiv, this.localObj.getConstant('Fill color'), false);
        classList(fillDiv.lastElementChild.lastElementChild.lastElementChild.firstChild, ['e-de-ctnr-cellbg-clr-picker'], ['e-caret']);
        this.documentEditor.documentHelper.shadingBtn = this.shadingBtn;
    };
    TableProperties.prototype.initBorderStylesDiv = function () {
        this.borderStyleDiv = createElement('div', { className: 'e-de-property-div-padding' });
        this.tableProperties.appendChild(this.borderStyleDiv);
        var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        //label.classList.add('e-de-table-prop-label');
        label.textContent = this.localObj.getConstant('Border Style');
        this.borderStyleDiv.appendChild(label);
        var parentDiv = createElement('div', { styles: 'display:inline-flex;' });
        var styleDiv = createElement('div', { styles: 'width:min-content;height:126px', className: 'e-de-grp-btn-ctnr' });
        var div1 = createElement('div', { className: this.groupButtonClass + ' e-de-ctnr-group-btn-top' });
        styleDiv.appendChild(div1);
        var div2 = createElement('div', { className: this.groupButtonClass + ' e-de-ctnr-group-btn-middle' });
        styleDiv.appendChild(div2);
        var div3 = createElement('div', { className: this.groupButtonClass + ' e-de-ctnr-group-btn-bottom' });
        styleDiv.appendChild(div3);
        if (this.isRtl) {
            div1.classList.add('e-de-rtl');
            div3.classList.add('e-de-rtl');
            parentDiv.classList.add('e-de-rtl');
            label.classList.add('e-de-rtl');
        }
        var btnStyle = '';
        this.tableOutlineBorder = this.createButtonTemplate(this.elementId + '_tableOutlineBorder', 'e-de-ctnr-outsideborder e-icons', div1, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Outside borders'));
        this.tableAllBorder = this.createButtonTemplate(this.elementId + '_tableAllBorder', 'e-de-ctnr-allborders e-icons', div1, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('All borders'));
        this.tableCenterBorder = this.createButtonTemplate(this.elementId + '_tableCenterBorder', 'e-de-ctnr-insideborders e-icons', div1, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Inside borders'));
        this.tableLeftBorder = this.createButtonTemplate(this.elementId + '_tableLeftBorder', 'e-de-ctnr-leftborders e-icons', div2, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Left border'));
        this.tableCenterVerticalBorder = this.createButtonTemplate(this.elementId + '_tableCenterVBorder', 'e-de-ctnr-insideverticalborder e-icons', div2, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Inside vertical border'));
        this.tableRightBorder = this.createButtonTemplate(this.elementId + '_tableRightBorder', 'e-de-ctnr-rightborder e-icons', div2, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Right border'));
        this.tableTopBorder = this.createButtonTemplate(this.elementId + '_tableTopBorder', 'e-de-ctnr-topborder e-icons', div3, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Top border'));
        this.tableCenterHorizontalBorder = this.createButtonTemplate(this.elementId + '_tableCenterHBorder', 'e-de-ctnr-insidehorizondalborder e-icons', div3, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Inside horizontal border'));
        this.tableBottomBorder = this.createButtonTemplate(this.elementId + '_tableBottomBorder', 'e-de-ctnr-bottomborder e-icons', div3, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Bottom border'));
        parentDiv.appendChild(styleDiv);
        var styleTypeDiv = createElement('div', { className: 'de-tbl-fill-clr' });
        if (!this.isRtl) {
            styleTypeDiv.classList.add('e-de-stylediv');
        }
        else {
            styleTypeDiv.classList.add('e-de-stylediv-rtl');
        }
        this.borderBtn = this.createColorPickerTemplate(this.elementId + '_tableBorderColor', styleTypeDiv, this.localObj.getConstant('Border color'), true);
        this.documentEditor.documentHelper.borderBtn = this.borderBtn;
        this.borderBtn.value = '#000000';
        styleTypeDiv.firstElementChild.lastElementChild.lastElementChild.style.width = '30px';
        styleTypeDiv.firstElementChild.lastElementChild.firstElementChild.firstElementChild.style.width = '100%';
        classList(styleTypeDiv.lastElementChild.lastElementChild.lastElementChild.firstChild, ['e-de-ctnr-highlightcolor'], ['e-caret']);
        this.borderSizeButton = createElement('button', { id: this.elementId + '_tableBorderSize', className: 'e-de-border-size-button', styles: 'font-size:10px;padding:0px;', attrs: { type: 'button' } });
        styleTypeDiv.appendChild(this.borderSizeButton);
        this.borderSize = this.createBorderSizeDropDown('e-de-ctnr-strokesize e-icons', this.borderSizeButton);
        parentDiv.appendChild(styleTypeDiv);
        this.borderSizeColorElement = document.getElementsByClassName('e-de-border-width');
        this.borderStyleDiv.appendChild(parentDiv);
    };
    TableProperties.prototype.initCellDiv = function () {
        var cellDiv = createElement('div', { className: 'e-de-property-div-padding' });
        this.tableProperties.appendChild(cellDiv);
        var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        //label.classList.add('e-de-table-prop-label');
        label.textContent = this.localObj.getConstant('Cell');
        cellDiv.appendChild(label);
        var parentDiv = createElement('div', { className: 'e-de-ctnr-group-btn' });
        parentDiv.classList.add('e-de-cell-div');
        if (this.isRtl) {
            parentDiv.classList.add('e-de-rtl');
            label.classList.add('e-de-rtl');
        }
        var btnStyle = '';
        this.horizontalMerge = this.createButtonTemplate(this.elementId + '_tableOutlineBorder', 'e-de-ctnr-mergecell e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Merge cells'));
        //this.verticalMerge = this.createButtonTemplate(this.elementId + '_tableAllBorder', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Vertical Merge');
        cellDiv.appendChild(parentDiv);
    };
    TableProperties.prototype.initInsertOrDelCell = function () {
        var tableOperationDiv = createElement('div', { className: 'e-de-property-div-padding' });
        this.tableProperties.appendChild(tableOperationDiv);
        var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        //label.classList.add('e-de-table-prop-label');
        label.textContent = this.localObj.getConstant('Insert Or Delete');
        tableOperationDiv.appendChild(label);
        var parentDiv = createElement('div', { className: 'e-de-insert-del-cell', styles: 'display:inline-flex' });
        var div1 = createElement('div', { className: this.groupButtonClass });
        parentDiv.appendChild(div1);
        var div2 = createElement('div', { className: this.groupButtonClass });
        if (!this.isRtl) {
            div2.style.marginLeft = '12px';
        }
        else {
            div2.style.marginRight = '12px';
            parentDiv.classList.add('e-de-rtl');
            label.classList.add('e-de-rtl');
        }
        parentDiv.appendChild(div2);
        var btnStyle = '';
        this.insertColumnLeft = this.createButtonTemplate(this.elementId + '_insertColumnLeft', 'e-de-ctnr-insertleft e-icons', div1, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Insert columns to the left'));
        this.insertColumnRight = this.createButtonTemplate(this.elementId + '_insertColumnRight', 'e-de-ctnr-insertright e-icons', div1, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Insert columns to the right'));
        this.insertRowAbove = this.createButtonTemplate(this.elementId + '_insertRowAbove', 'e-de-ctnr-insertabove e-icons', div1, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Insert rows above'));
        this.insertRowBelow = this.createButtonTemplate(this.elementId + '_insertRowBelow', 'e-de-ctnr-insertbelow e-icons', div1, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Insert rows below'));
        this.deleteRow = this.createButtonTemplate(this.elementId + '_deleteRow', 'e-de-ctnr-deleterows e-icons', div2, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Delete rows'));
        this.deleteColumn = this.createButtonTemplate(this.elementId + '_deleteColumn', 'e-de-ctnr-deletecolumns e-icons', div2, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Delete columns'));
        tableOperationDiv.appendChild(parentDiv);
    };
    TableProperties.prototype.initCellMargin = function () {
        var cellMarginDiv = createElement('div', { className: 'e-de-property-div-padding e-de-cellmargin-text' });
        this.tableProperties.appendChild(cellMarginDiv);
        var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        //label.classList.add('e-de-table-prop-label');
        label.textContent = this.localObj.getConstant('Cell Margin');
        cellMarginDiv.appendChild(label);
        var parentDiv = createElement('div', { styles: 'display:inline-flex' });
        if (this.isRtl) {
            label.classList.add('e-de-rtl');
        }
        var textboxDivStyle = 'width:' + 48 + 'px';
        var textboxParentDivStyle = 'width:' + 50 + 'px;float:left;';
        this.topMargin = this.createCellMarginTextBox(this.localObj.getConstant('Top'), this.elementId + '_topMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, this.localObj.getConstant('Top margin'));
        this.bottomMargin = this.createCellMarginTextBox(this.localObj.getConstant('Bottom'), this.elementId + '_bottomMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, this.localObj.getConstant('Bottom margin'));
        this.leftMargin = this.createCellMarginTextBox(this.localObj.getConstant('Left'), this.elementId + '_leftMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, this.localObj.getConstant('Left margin'));
        this.rightMargin = this.createCellMarginTextBox(this.localObj.getConstant('Right'), this.elementId + '_rightMargin', parentDiv, textboxDivStyle, textboxParentDivStyle, 500, this.localObj.getConstant('Right margin'), true);
        cellMarginDiv.appendChild(parentDiv);
    };
    TableProperties.prototype.initAlignText = function () {
        var alignmentDiv = createElement('div', { className: 'e-de-property-div-padding', styles: 'border-bottom-width:0px' });
        this.tableProperties.appendChild(alignmentDiv);
        var label = createElement('label', { className: 'e-de-ctnr-prop-label' });
        //label.classList.add('e-de-table-prop-label');
        label.textContent = this.localObj.getConstant('Align Text');
        alignmentDiv.appendChild(label);
        var parentDiv = createElement('div');
        if (this.isRtl) {
            parentDiv.classList.add('e-de-rtl');
            label.classList.add('e-de-rtl');
        }
        var div = createElement('div', { className: this.groupButtonClass });
        parentDiv.appendChild(div);
        var btnStyle = '';
        this.alignTop = this.createButtonTemplate(this.elementId + '_alignTop', 'e-de-ctnr-aligntop e-icons', div, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Align top'));
        // this.alignCenterVertical = this.createButtonTemplate(this.elementId + '_alignCenterVertical', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Align Center Vertical');
        // this.alignRight = this.createButtonTemplate(this.elementId + '_alignRight', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Align Right');
        this.alignBottom = this.createButtonTemplate(this.elementId + '_alignBottom', 'e-de-ctnr-alignbottom e-icons', div, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Align bottom'));
        // this.alignCenterHorizontal = this.createButtonTemplate(this.elementId + '_alignCenterHorizontal', 'e-de-icon-merge-column e-icons', parentDiv, 'e-de-prop-font-button', btnStyle, 'Align Center Horizontal');
        this.alignCenterHorizontal = this.createButtonTemplate(this.elementId + '_alignCenterHorizontal', 'e-de-ctnr-aligncenter-table e-icons', div, 'e-de-prop-font-button', btnStyle, this.localObj.getConstant('Align center'));
        this.alignCenterHorizontal.addEventListener('click', this.applyAlignCenterHorizontal.bind(this));
        alignmentDiv.appendChild(parentDiv);
    };
    /* eslint-disable-next-line max-len */
    TableProperties.prototype.createCellMarginTextBox = function (textboxLabel, textboxId, parentDiv, styles, parentStyle, maxValue, toolTipText, isRight) {
        var cellMarginParentDiv = createElement('div', { styles: parentStyle });
        if (!isRight) {
            cellMarginParentDiv.classList.add('e-de-cell-text-box');
        }
        var cellMarginLabel = createElement('label', { className: 'e-de-prop-sub-label' });
        cellMarginLabel.textContent = textboxLabel;
        cellMarginParentDiv.appendChild(cellMarginLabel);
        var cellMarginTextbox = createElement('input', { className: 'e-textbox', id: textboxId, styles: styles });
        cellMarginParentDiv.appendChild(cellMarginTextbox);
        var cellMarginNumericText = new NumericTextBox({ showSpinButton: false, min: 0, format: 'n0', max: maxValue, enableRtl: this.isRtl }, cellMarginTextbox);
        parentDiv.appendChild(cellMarginParentDiv);
        cellMarginTextbox.setAttribute('title', toolTipText);
        return cellMarginNumericText;
    };
    TableProperties.prototype.createBorderSizeDropDown = function (iconcss, button) {
        var _this = this;
        var div = createElement('div', { id: 'borderSizeTarget', styles: 'display:none' });
        var ulTag = createElement('ul', {
            styles: 'display: block; outline: 0px; width: 126px; height: auto;',
            id: 'borderSizeListMenu'
        });
        div.appendChild(ulTag);
        var noneOption = this.createDropdownOption(ulTag, this.localObj.getConstant('No Border'));
        noneOption.addEventListener('click', function () {
            _this.onBorderSizeChange('No Border');
        });
        var pixel = this.localObj.getConstant('px');
        var quaterOption = this.createDropdownOption(ulTag, '.25' + pixel);
        quaterOption.addEventListener('click', function () {
            _this.onBorderSizeChange('.25px');
        });
        var halfOption = this.createDropdownOption(ulTag, '.5' + pixel);
        halfOption.addEventListener('click', function () {
            _this.onBorderSizeChange('.5px');
        });
        var threeQuatersOption = this.createDropdownOption(ulTag, '.75' + pixel);
        threeQuatersOption.addEventListener('click', function () {
            _this.onBorderSizeChange('.75px');
        });
        var oneOption = this.createDropdownOption(ulTag, '1' + pixel);
        oneOption.addEventListener('click', function () {
            _this.onBorderSizeChange('1px');
        });
        var oneHalfOption = this.createDropdownOption(ulTag, '1.5' + pixel);
        oneHalfOption.addEventListener('click', function () {
            _this.onBorderSizeChange('1.5px');
        });
        var twoOption = this.createDropdownOption(ulTag, '2' + pixel);
        twoOption.addEventListener('click', function () {
            _this.onBorderSizeChange('2px');
        });
        var threeOption = this.createDropdownOption(ulTag, '3' + pixel);
        threeOption.addEventListener('click', function () {
            _this.onBorderSizeChange('3px');
        });
        var fourOption = this.createDropdownOption(ulTag, '4' + pixel);
        fourOption.addEventListener('click', function () {
            _this.onBorderSizeChange('4px');
        });
        var fiveOption = this.createDropdownOption(ulTag, '5' + pixel);
        fiveOption.addEventListener('click', function () {
            _this.onBorderSizeChange('5px');
        });
        var sixOption = this.createDropdownOption(ulTag, '6' + pixel);
        sixOption.addEventListener('click', function () {
            _this.onBorderSizeChange('6px');
        });
        var menuOptions = {
            target: div,
            iconCss: iconcss,
            cssClass: 'e-de-prop-bordersize',
            enableRtl: this.isRtl,
            content: '1.5px'
        };
        var dropdown = new DropDownButton(menuOptions);
        dropdown.beforeOpen = function () {
            div.style.display = 'block';
            for (var i = 0; i < _this.borderSizeColorElement.length; i++) {
                _this.borderSizeColorElement[parseInt(i.toString(), 10)].style.borderBottomColor = _this.borderColor;
            }
        };
        dropdown.beforeClose = function () {
            div.style.display = 'none';
        };
        dropdown.appendTo(button);
        dropdown.element.setAttribute('title', this.localObj.getConstant('Border width'));
        return dropdown;
    };
    TableProperties.prototype.onBorderSizeChange = function (value) {
        var _this = this;
        this.borderSize.content = value;
        setTimeout(function () {
            _this.tableOutlineBorder.element.focus();
        }, 10);
    };
    TableProperties.prototype.createDropdownOption = function (ulTag, text) {
        var liTag = createElement('li', {
            styles: 'display:block',
            className: 'e-de-floating-menuitem e-de-floating-menuitem-md e-de-list-items  e-de-list-item-size'
        });
        ulTag.appendChild(liTag);
        var innerHTML;
        if (text === 'No Border') {
            innerHTML = '<div>' + text + '</div>';
        }
        else if (text === '1.5px') {
            innerHTML = '<div>' + text + '<span class="e-de-list-line e-de-border-width"  style="margin-left:10px;border-bottom-width:' + text + ';' + '"' + '></span></div>';
        }
        else {
            innerHTML = '<div>' + text + '<span class="e-de-list-line e-de-border-width" style="margin-left:20px;border-bottom-width:' + text + ';' + '"' + '></span></div>';
        }
        var liInnerDiv = createElement('div', {
            className: 'e-de-list-header-presetmenu',
            innerHTML: innerHTML
        });
        liTag.appendChild(liInnerDiv);
        return liTag;
    };
    /* eslint-disable-next-line max-len */
    TableProperties.prototype.createDropDownButton = function (id, styles, parentDiv, iconCss, content, items, target) {
        var buttonElement = createElement('button', { id: id, styles: styles, attrs: { type: 'button' } });
        parentDiv.appendChild(buttonElement);
        var splitButtonClass = 'e-de-prop-splitbutton';
        if (this.isRtl) {
            splitButtonClass = 'e-rtl ' + splitButtonClass;
        }
        /* eslint-disable-next-line max-len */
        var dropDownBtn = new DropDownButton({ iconCss: iconCss, content: content, enableRtl: this.isRtl, cssClass: splitButtonClass }, buttonElement);
        if (items) {
            dropDownBtn.items = items;
        }
        if (target) {
            dropDownBtn.target = target;
        }
        return dropDownBtn;
    };
    /* eslint-disable-next-line max-len */
    TableProperties.prototype.createButtonTemplate = function (id, iconcss, div, buttonClass, styles, toolTipText, content, iconPos) {
        var buttonElement = createElement('Button', { id: id, styles: styles, attrs: { type: 'button' } });
        div.appendChild(buttonElement);
        var btn = new Button({
            cssClass: buttonClass, iconCss: iconcss, enableRtl: this.isRtl, iconPosition: (iconPos ? iconPos : 'Left'),
            content: content ? content : ''
        });
        btn.appendTo(buttonElement);
        buttonElement.setAttribute('title', toolTipText);
        buttonElement.setAttribute('aria-label', toolTipText);
        return btn;
    };
    TableProperties.prototype.createColorPickerTemplate = function (id, divElement, toolTipText, isBorderWidth) {
        var _a = this.documentEditor.documentEditorSettings.colorPickerSettings, columns = _a.columns, createPopupOnClick = _a.createPopupOnClick, disabled = _a.disabled, enablePersistence = _a.enablePersistence, inline = _a.inline, mode = _a.mode, modeSwitcher = _a.modeSwitcher, noColor = _a.noColor, presetColors = _a.presetColors, showButtons = _a.showButtons;
        var inputElement = createElement('input', { id: id });
        divElement.appendChild(inputElement);
        var cssClass = 'e-de-prop-font-button e-de-prop-font-colorpicker';
        if (isBorderWidth) {
            cssClass = cssClass + ' e-de-border-clr-picker';
        }
        /* eslint-disable-next-line max-len */
        var colorPicker = new ColorPicker({ cssClass: cssClass, enableRtl: this.isRtl, locale: this.container.locale, enableOpacity: false,
            mode: mode, modeSwitcher: modeSwitcher, showButtons: showButtons, columns: columns,
            createPopupOnClick: createPopupOnClick, disabled: disabled, enablePersistence: enablePersistence, inline: inline,
            noColor: noColor, presetColors: presetColors }, inputElement);
        inputElement.parentElement.setAttribute('title', toolTipText);
        inputElement.parentElement.setAttribute('aria-label', toolTipText);
        return colorPicker;
    };
    TableProperties.prototype.showTableProperties = function (isShow, propertyType) {
        if (isShow) {
            if (propertyType === 'text') {
                this.propertiesTab.hideTab(1, true);
            }
            else {
                this.propertiesTab.hideTab(1, false);
                if (this.prevContext !== this.documentEditor.selectionModule.contextType) {
                    this.propertiesTab.selectedItem = 1;
                }
            }
            this.prevContext = this.documentEditor.selectionModule.contextType;
            this.onSelectionChange();
            this.tableTextProperties.onSelectionChange();
        }
        if (!isShow && this.parentElement.style.display === 'none' || (isShow && this.parentElement.style.display === 'block')) {
            return;
        }
        this.parentElement.style.display = isShow ? 'block' : 'none';
        if (isShow) {
            this.updateTabContainerHeight();
        }
        this.documentEditor.resize();
        this.prevContext = this.documentEditor.selectionModule.contextType;
    };
    /**
     * @private
     * @returns {void} - Update tab container height.
     */
    TableProperties.prototype.updateTabContainerHeight = function () {
        if (this.parentElement && this.parentElement.style.display === 'block') {
            var tabHeaderHeight = this.parentElement.getElementsByClassName('e-tab-header')[0];
            if (tabHeaderHeight) {
                var paneHeight = this.parentElement.offsetHeight - tabHeaderHeight.offsetHeight;
                this.tableProperties.style.height = paneHeight + 'px';
                this.tableTextProperties.element.style.height = paneHeight + 'px';
            }
        }
    };
    TableProperties.prototype.removeHTMLDomElement = function () {
        var _this = this;
        if (this.borderSizeButton) {
            this.borderSizeButton.remove();
            this.borderSizeButton = null;
        }
        if (this.borderStyleDiv) {
            this.borderStyleDiv.childNodes.forEach(function (element) {
                _this.borderStyleDiv.removeChild(element);
                element = null;
            });
            this.borderStyleDiv.innerHTML = '';
            this.borderStyleDiv.remove();
            this.borderStyleDiv = null;
        }
        if (this.tableProperties) {
            this.tableProperties.childNodes.forEach(function (element) {
                _this.tableProperties.removeChild(element);
                element = null;
            });
            this.tableProperties.innerHTML = '';
            this.tableProperties.remove();
            this.tableProperties = null;
        }
    };
    TableProperties.prototype.destroy = function () {
        this.unWireEvent();
        this.container = undefined;
        if (this.shadingBtn) {
            this.shadingBtn.destroy();
            this.shadingBtn.element.remove();
            this.shadingBtn.element = null;
            this.shadingBtn = undefined;
        }
        if (this.borderBtn) {
            this.borderBtn.destroy();
            this.borderBtn.element.remove();
            this.borderBtn.element = null;
            this.borderBtn = undefined;
        }
        if (this.borderSize) {
            this.borderSize.destroy();
            this.borderSize = undefined;
        }
        if (this.topMargin) {
            this.topMargin.destroy();
            this.topMargin = undefined;
        }
        if (this.bottomMargin) {
            this.bottomMargin.destroy();
            this.bottomMargin = undefined;
        }
        if (this.leftMargin) {
            this.leftMargin.destroy();
            this.leftMargin = undefined;
        }
        if (this.rightMargin) {
            remove(this.rightMargin.element);
            this.rightMargin.destroy();
            this.rightMargin = undefined;
        }
        if (this.tableTextProperties) {
            this.tableTextProperties.destroy();
            this.tableTextProperties = undefined;
        }
        if (this.propertiesTab) {
            this.propertiesTab.destroy();
            this.propertiesTab = undefined;
        }
        if (this.imageProperty) {
            this.imageProperty = null;
        }
        if (this.tableOutlineBorder) {
            this.tableOutlineBorder.destroy();
        }
        this.tableOutlineBorder = undefined;
        if (this.tableAllBorder) {
            this.tableAllBorder.destroy();
        }
        this.tableAllBorder = undefined;
        if (this.tableCenterBorder) {
            this.tableCenterBorder.destroy();
        }
        this.tableCenterBorder = undefined;
        if (this.tableLeftBorder) {
            this.tableLeftBorder.destroy();
        }
        this.tableLeftBorder = undefined;
        if (this.tableCenterVerticalBorder) {
            this.tableCenterVerticalBorder.destroy();
        }
        this.tableCenterVerticalBorder = undefined;
        if (this.tableRightBorder) {
            this.tableRightBorder.destroy();
        }
        this.tableRightBorder = undefined;
        if (this.tableTopBorder) {
            this.tableTopBorder.destroy();
        }
        remove(this.tableTopBorder.element);
        this.tableTopBorder = undefined;
        if (this.tableCenterHorizontalBorder) {
            this.tableCenterHorizontalBorder.destroy();
        }
        remove(this.tableCenterHorizontalBorder.element);
        this.tableCenterHorizontalBorder = undefined;
        if (this.tableBottomBorder) {
            this.tableBottomBorder.destroy();
        }
        remove(this.tableBottomBorder.element);
        this.tableBottomBorder = undefined;
        if (this.horizontalMerge) {
            this.horizontalMerge.destroy();
        }
        remove(this.horizontalMerge.element);
        this.horizontalMerge = undefined;
        if (this.insertRowAbove) {
            this.insertRowAbove.destroy();
        }
        remove(this.insertRowAbove.element);
        this.insertRowAbove = undefined;
        if (this.insertRowBelow) {
            this.insertRowBelow.destroy();
        }
        remove(this.insertRowBelow.element);
        this.insertRowBelow = undefined;
        if (this.insertColumnLeft) {
            this.insertColumnLeft.destroy();
        }
        remove(this.insertColumnLeft.element);
        this.insertColumnLeft = undefined;
        if (this.insertColumnRight) {
            this.insertColumnRight.destroy();
        }
        remove(this.insertColumnRight.element);
        this.insertColumnRight = undefined;
        if (this.deleteRow) {
            this.deleteRow.destroy();
        }
        remove(this.deleteRow.element);
        this.deleteRow = undefined;
        if (this.deleteColumn) {
            this.deleteColumn.destroy();
        }
        remove(this.deleteColumn.element);
        this.deleteColumn = undefined;
        if (this.alignBottom) {
            this.alignBottom.destroy();
        }
        this.alignBottom = undefined;
        if (this.alignCenterHorizontal) {
            this.alignCenterHorizontal.destroy();
        }
        this.alignCenterHorizontal = undefined;
        if (this.alignTop) {
            this.alignTop.destroy();
        }
        this.removeHTMLDomElement();
        this.alignTop = undefined;
        this.groupButtonClass = undefined;
        this.borderColor = undefined;
        this.elementId = undefined;
    };
    return TableProperties;
}());
export { TableProperties };
