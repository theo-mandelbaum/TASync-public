import { createElement, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { WTableFormat, WRowFormat, WCellFormat, WParagraphFormat } from '../format/index';
import { CheckBox, RadioButton } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Tab } from '@syncfusion/ej2-navigations';
import { classList } from '@syncfusion/ej2-base';
import { HelperMethods } from '../editor/editor-helper';
import { TextBox } from '@syncfusion/ej2-inputs';
import { SanitizeHtmlHelper } from '@syncfusion/ej2-base';
/**
 * The Table properties dialog is used to modify properties of selected table.
 */
var TablePropertiesDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function TablePropertiesDialog(documentHelper) {
        var _this = this;
        this.hasTableWidth = false;
        this.hasCellWidth = false;
        this.bidi = false;
        /**
         * @private
         */
        this.isTableBordersAndShadingUpdated = false;
        /**
         * @private
         */
        this.isCellBordersAndShadingUpdated = false;
        this.tabObj = undefined;
        this.localValue = undefined;
        /**
         * @private
         */
        this.isCellOptionsUpdated = false;
        /**
         * @private
         */
        this.isTableOptionsUpdated = false;
        /**
         * @returns {void}
         */
        this.onBeforeOpen = function () {
            _this.documentHelper.updateFocus();
            _this.loadTableProperties();
        };
        /**
         * @private
         * @returns {void}
         */
        this.onCloseTablePropertyDialog = function () {
            _this.unWireEvent.bind(_this);
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyTableProperties = function () {
            var selection = _this.documentHelper.selection;
            if (selection.tableFormat.title !== _this.titleTextBox.value) {
                if (!isNullOrUndefined(_this.titleTextBox.value)) {
                    _this.tableFormat.title = SanitizeHtmlHelper.sanitize((_this.titleTextBox).value);
                }
            }
            if (selection.tableFormat.description !== _this.descriptionTextBox.value) {
                if (!isNullOrUndefined(_this.descriptionTextBox.value)) {
                    _this.tableFormat.description = SanitizeHtmlHelper.sanitize((_this.descriptionTextBox).value);
                }
            }
            if (!_this.preferCheckBox.checked && !_this.preferCheckBox.indeterminate) {
                if (isNullOrUndefined(selection.tableFormat.preferredWidth) || selection.tableFormat.preferredWidth !== 0) {
                    _this.tableFormat.preferredWidth = 0;
                    _this.tableFormat.preferredWidthType = 'Point';
                }
            }
            if (_this.tableFormat.hasValue('tableAlignment') && _this.tableFormat.tableAlignment !== 'Left') {
                if (isNullOrUndefined(selection.tableFormat.leftIndent) || selection.tableFormat.leftIndent !== 0) {
                    _this.tableFormat.leftIndent = 0;
                }
            }
            if (!_this.rowHeightCheckBox.checked && !_this.rowHeightCheckBox.indeterminate) {
                if (isNullOrUndefined(selection.rowFormat.height) || selection.rowFormat.height !== 0) {
                    _this.rowFormat.heightType = 'AtLeast';
                    _this.rowFormat.height = 0;
                }
            }
            if (!_this.preferredCellWidthCheckBox.checked && !_this.preferredCellWidthCheckBox.indeterminate) {
                if (isNullOrUndefined(selection.cellFormat.preferredWidth) || selection.cellFormat.preferredWidth !== 0) {
                    _this.cellFormat.preferredWidthType = 'Point';
                    _this.cellFormat.preferredWidth = 0;
                }
            }
            else {
                var ownerTable = _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable;
                var containerWidth = ownerTable.getOwnerWidth(true);
                var tableWidth = ownerTable.getTableClientWidth(containerWidth);
                for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                    var rowWidget = ownerTable.childWidgets[parseInt(i.toString(), 10)];
                    for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                        var cellWidget = rowWidget.childWidgets[parseInt(j.toString(), 10)];
                        if (_this.cellFormat.preferredWidthType === 'Percent' && cellWidget.cellFormat.preferredWidthType === 'Point') {
                            cellWidget.cellFormat.preferredWidthType = 'Percent';
                            cellWidget.cellFormat.preferredWidth = cellWidget.cellFormat.preferredWidth / tableWidth * 100;
                        }
                        else if (_this.cellFormat.preferredWidthType === 'Point' && cellWidget.cellFormat.preferredWidthType === 'Percent') {
                            cellWidget.cellFormat.preferredWidthType = 'Point';
                            cellWidget.cellFormat.preferredWidth = cellWidget.cellFormat.cellWidth;
                        }
                    }
                }
                if (_this.cellFormat.preferredWidthType === 'Percent') {
                    if (!_this.tableFormat.hasValue('preferredWidth') && !_this.tableFormat.hasValue('preferredWidthType')
                        && _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable.tableFormat.preferredWidth === 0) {
                        /* eslint-disable-next-line max-len */
                        var containerWidth_1 = _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable.getOwnerWidth(true);
                        /* eslint-disable-next-line max-len */
                        var tableWidth_1 = _this.documentHelper.selection.start.paragraph.associatedCell.ownerTable.getTableClientWidth(containerWidth_1);
                        _this.tableFormat.preferredWidthType = 'Percent';
                        /* eslint-disable-next-line max-len */
                        _this.tableFormat.preferredWidth = tableWidth_1 / HelperMethods.convertPixelToPoint(_this.documentHelper.owner.viewer.clientArea.width) * 100;
                    }
                }
            }
            if (_this.rowHeightValue) {
                if (!_this.rowFormat.hasValue('heightType')
                    && selection.rowFormat.heightType !== _this.rowFormat.heightType) {
                    _this.rowFormat.heightType = selection.rowFormat.heightType;
                }
                _this.rowFormat.height = _this.rowHeightValue;
            }
            if (!(_this.isEqualTableFormat(selection.tableFormat, _this.tableFormat) && _this.isEqualRowFormat(selection.rowFormat, _this.rowFormat)
                && _this.isEqualCellFormat(selection.cellFormat, _this.cellFormat))) {
                _this.documentHelper.owner.editorModule.initComplexHistory('TableProperties');
                _this.documentHelper.owner.editorModule.onTableFormat(_this.tableFormat);
                _this.documentHelper.owner.editorModule.onRowFormat(_this.rowFormat);
                _this.documentHelper.owner.editorModule.onCellFormat(_this.cellFormat);
                _this.documentHelper.owner.editorHistoryModule.updateComplexHistory();
            }
            _this.closeTablePropertiesDialog();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyTableSubProperties = function () {
            if (_this.isCellOptionsUpdated) {
                var cellFormat = _this.documentHelper.owner.cellOptionsDialogModule.cellFormat;
                _this.documentHelper.owner.cellOptionsDialogModule.applySubCellOptions(cellFormat);
            }
            if (_this.isTableOptionsUpdated) {
                var tableFormat = _this.documentHelper.owner.tableOptionsDialogModule.tableFormat;
                _this.documentHelper.owner.tableOptionsDialogModule.applySubTableOptions(tableFormat);
            }
            _this.isCellOptionsUpdated = false;
            _this.isTableOptionsUpdated = false;
        };
        /**
         * @private
         * @returns {void}
         */
        this.unWireEvent = function () {
            //Table Format
            _this.preferCheckBox.change = undefined;
            _this.tableWidthBox.change = undefined;
            _this.tableWidthType.change = undefined;
            _this.leftIndentBox.change = undefined;
            //Row Format
            _this.rowHeightCheckBox.change = undefined;
            _this.rowHeightBox.change = undefined;
            _this.rowHeightType.change = undefined;
            _this.repeatHeader.change = undefined;
            _this.allowRowBreak.change = undefined;
            //Cell Format
            _this.preferredCellWidthCheckBox.change = undefined;
            _this.cellWidthBox.change = undefined;
            _this.cellWidthType.change = undefined;
            _this.cellFormat.destroy();
            _this.rowFormat.destroy();
            _this.tableFormat.destroy();
            _this.rowHeightValue = undefined;
            _this.documentHelper.dialog2.open = _this.documentHelper.selection.hideCaret.bind(_this.documentHelper.owner.viewer);
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeTablePropertiesDialog = function () {
            _this.documentHelper.dialog2.hide();
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @param {Event} event - Specified the event.
         * @returns {void}
         */
        this.changeBidirectional = function (event) {
            if (event.value === 'ltr') {
                _this.rtlButton.checked = !_this.ltrButton.checked;
                _this.tableFormat.bidi = false;
            }
            else {
                _this.ltrButton.checked = !_this.rtlButton.checked;
                _this.tableFormat.bidi = true;
            }
            if (_this.tableFormat.bidi && _this.tableFormat.tableAlignment === 'Left') {
                _this.tableFormat.tableAlignment = 'Right';
            }
            else if (!_this.tableFormat.bidi && _this.tableFormat.tableAlignment === 'Right') {
                _this.tableFormat.tableAlignment = 'Left';
            }
            _this.activeTableAlignment(_this.tableFormat, true);
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeTableCheckBox = function () {
            var enable = (_this.preferCheckBox.checked || _this.preferCheckBox.indeterminate);
            _this.tableWidthBox.enabled = enable;
            _this.tableWidthType.enabled = enable;
            if (enable) {
                _this.tableFormat.preferredWidthType = (_this.tableWidthType.value === 'Points') ?
                    'Point' : _this.tableWidthType.value;
            }
            else {
                _this.tableFormat.preferredWidthType = _this.documentHelper.selection.tableFormat.preferredWidthType;
            }
        };
        /**
         * @private
         * @param {Event} event - Specified the event.
         * @returns {void}
         */
        this.changeTableAlignment = function (event) {
            _this.updateClassForAlignmentProperties(_this.tableTab);
            var element = event.target;
            classList(element, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
            var bidi = _this.tableFormat.bidi || _this.rtlButton.checked;
            if ((element.classList.contains('e-de-table-left-alignment') && !bidi) ||
                (element.classList.contains('e-de-table-right-alignment') && bidi)) {
                _this.leftIndentBox.enabled = true;
            }
            else {
                _this.leftIndentBox.enabled = false;
            }
            _this.tableFormat.tableAlignment = _this.getTableAlignment();
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeTableRowCheckBox = function () {
            _this.rowHeightType.enabled = _this.rowHeightCheckBox.checked;
            _this.rowHeightBox.enabled = _this.rowHeightCheckBox.checked;
            if (_this.rowHeightType.enabled) {
                _this.rowFormat.heightType = _this.rowHeightType.value;
            }
            else {
                _this.rowFormat.heightType = _this.documentHelper.selection.rowFormat.heightType;
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.changeTableCellCheckBox = function () {
            _this.cellWidthType.enabled = _this.preferredCellWidthCheckBox.checked;
            _this.cellWidthBox.enabled = _this.preferredCellWidthCheckBox.checked;
        };
        /**
         * @private
         * @param {Event} event - Specified the event
         * @returns {void}
         */
        this.changeCellAlignment = function (event) {
            _this.updateClassForCellAlignment(_this.cellTab);
            var element = event.target;
            classList(element, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
            _this.cellFormat.verticalAlignment = _this.getCellAlignment();
        };
        //#endregion
        /**
         * @private
         *
         * @returns {void}
         */
        this.showTableOptionsDialog = function () {
            _this.documentHelper.owner.tableOptionsDialogModule.show();
            _this.documentHelper.dialog2.element.style.pointerEvents = 'none';
        };
        /**
         * @private
         *
         * @returns {void}
         */
        this.showBordersShadingsPropertiesDialog = function () {
            _this.documentHelper.owner.bordersAndShadingDialogModule.show();
            _this.documentHelper.dialog2.element.style.pointerEvents = 'none';
        };
        /**
         * @private
         *
         * @returns {void}
         */
        this.showCellOptionsDialog = function () {
            _this.documentHelper.owner.cellOptionsDialogModule.show();
            _this.documentHelper.dialog2.element.style.pointerEvents = 'none';
        };
        this.documentHelper = documentHelper;
    }
    Object.defineProperty(TablePropertiesDialog.prototype, "cellFormat", {
        get: function () {
            if (isNullOrUndefined(this.cellFormatIn)) {
                return this.cellFormatIn = new WCellFormat();
            }
            return this.cellFormatIn;
        },
        set: function (value) {
            this.cellFormatIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablePropertiesDialog.prototype, "tableFormat", {
        get: function () {
            if (isNullOrUndefined(this.tableFormatIn)) {
                this.tableFormatIn = new WTableFormat();
                return this.tableFormatIn;
            }
            return this.tableFormatIn;
        },
        set: function (value) {
            this.tableFormatIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablePropertiesDialog.prototype, "paraFormat", {
        get: function () {
            if (isNullOrUndefined(this.tableFormatIn)) {
                this.paraFormatIn = new WParagraphFormat();
                return this.paraFormatIn;
            }
            return this.paraFormatIn;
        },
        set: function (value) {
            this.paraFormatIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TablePropertiesDialog.prototype, "rowFormat", {
        get: function () {
            if (isNullOrUndefined(this.rowFormatInternal)) {
                this.rowFormatInternal = new WRowFormat();
                return this.rowFormatInternal;
            }
            return this.rowFormatInternal;
        },
        enumerable: true,
        configurable: true
    });
    TablePropertiesDialog.prototype.getModuleName = function () {
        return 'TablePropertiesDialog';
    };
    /**
     * @private
     * @param {L10n} localValue - Specifies the locale value
     * @param {boolean} isRtl - Specifies the is rtl
     * @returns {void}
     */
    TablePropertiesDialog.prototype.initTablePropertyDialog = function (localValue, isRtl) {
        this.localValue = localValue;
        var id = this.documentHelper.owner.containerId + '_TablePropertiesDialog';
        this.target = createElement('div', { id: id, className: 'e-de-table-properties-dlg' });
        var ejtabContainer = createElement('div', { id: this.target.id + '_TabContainer' });
        this.target.appendChild(ejtabContainer);
        this.tableTab = createElement('div', {
            id: this.target.id + '_TablePropertiesContentDialogTab', className: 'e-de-table-ppty-dlg-tabs'
        });
        this.rowTab = createElement('div', {
            id: this.target.id + '_RowPropertiesDialogTab', className: 'e-de-table-ppty-dlg-tabs'
        });
        this.cellTab = createElement('div', {
            id: this.target.id + '_CellPropertiesDialogTab', className: 'e-de-table-ppty-dlg-tabs'
        });
        this.altTab = createElement('div', {
            id: this.target.id + '_AltPropertiesDialogTab', className: 'e-de-table-ppty-dlg-tabs'
        });
        var separatorLine = createElement('div', { className: 'e-de-table-dialog-separator-line' });
        var ejtab = createElement('div', { id: this.target.id + '_TablePropertiesDialogTab', className: 'e-de-table-ppty-tab' });
        var headerContainer = createElement('div', { className: 'e-tab-header' });
        var tableHeader = createElement('div', {
            id: this.target.id + '_tableHeader', innerHTML: localValue.getConstant('Table')
        });
        var rowHeader = createElement('div', {
            id: this.target.id + '_rowHeader', innerHTML: localValue.getConstant('Row')
        });
        var cellHeader = createElement('div', {
            id: this.target.id + '_cellHeader', innerHTML: localValue.getConstant('Cell')
        });
        var altHeader = createElement('div', {
            id: this.target.id + '_altHeader', innerHTML: localValue.getConstant('Alt Text')
        });
        headerContainer.appendChild(tableHeader);
        headerContainer.appendChild(rowHeader);
        headerContainer.appendChild(cellHeader);
        headerContainer.appendChild(altHeader);
        var tableContent = createElement('div', { id: this.target.id + '_tableContent' });
        var rowContent = createElement('div', { id: this.target.id + '_rowContent' });
        var cellContent = createElement('div', { id: this.target.id + '_cellContent' });
        var altContent = createElement('div', { id: this.target.id + '_altContent' });
        var items = [
            { header: { text: tableHeader }, content: tableContent },
            { header: { text: rowHeader }, content: rowContent },
            { header: { text: cellHeader }, content: cellContent },
            { header: { text: altHeader }, content: altContent }
        ];
        tableContent.appendChild(this.tableTab);
        rowContent.appendChild(this.rowTab);
        cellContent.appendChild(this.cellTab);
        altContent.appendChild(this.altTab);
        ejtabContainer.appendChild(ejtab);
        this.initTableProperties(this.tableTab, localValue, this.documentHelper.owner.enableRtl);
        this.initTableRowProperties(this.rowTab, localValue, this.documentHelper.owner.enableRtl);
        this.initTableCellProperties(this.cellTab, localValue, this.documentHelper.owner.enableRtl);
        this.initTableAltProperties(this.altTab, localValue, this.documentHelper.owner.enableRtl);
        this.tabObj = new Tab({ items: items, enableRtl: isRtl }, ejtab);
        this.tabObj.isStringTemplate = true;
        this.target.appendChild(separatorLine);
        var alignMentButtons = this.tableTab.getElementsByClassName(this.tableTab.id + 'e-de-table-alignment');
        for (var i = 0; i < alignMentButtons.length; i++) {
            alignMentButtons[parseInt(i.toString(), 10)].addEventListener('click', this.changeTableAlignment);
        }
        var cellAlignment = this.cellTab.getElementsByClassName(this.cellTab.id + 'e-de-table-cell-alignment');
        for (var i = 0; i < cellAlignment.length; i++) {
            cellAlignment[parseInt(i.toString(), 10)].addEventListener('click', this.changeCellAlignment);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.show = function () {
        var localValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localValue.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initTablePropertyDialog(localValue, this.documentHelper.owner.enableRtl);
        }
        if (this.documentHelper.selection.caret.style.display !== 'none') {
            this.documentHelper.selection.caret.style.display = 'none';
        }
        this.documentHelper.dialog2.header = localValue.getConstant('Table Properties');
        this.documentHelper.dialog2.position = { X: 'center', Y: 'center' };
        this.documentHelper.dialog2.animationSettings = { effect: 'None', duration: 400, delay: 0 };
        this.documentHelper.dialog2.width = 'auto';
        this.documentHelper.dialog2.height = 'auto';
        this.documentHelper.dialog2.content = this.target;
        this.documentHelper.dialog2.beforeOpen = this.onBeforeOpen;
        this.documentHelper.dialog2.close = this.onCloseTablePropertyDialog;
        this.documentHelper.dialog2.open = this.wireEvent.bind(this);
        this.documentHelper.dialog2.buttons = [{
                click: this.applyTableProperties,
                buttonModel: { content: localValue.getConstant('Ok'), cssClass: 'e-flat e-table-ppty-okay', isPrimary: true }
            },
            {
                click: this.closeTablePropertiesDialog,
                buttonModel: { content: localValue.getConstant('Cancel'), cssClass: 'e-flat e-table-ppty-cancel' }
            }];
        //this.tabObj.select(0);
        this.documentHelper.dialog2.dataBind();
        this.documentHelper.dialog2.show();
        var dialogElement = this.documentHelper.dialog2.element;
        if (dialogElement) {
            this.documentHelper.updateDialogTabHeight(dialogElement, this.target);
        }
    };
    TablePropertiesDialog.prototype.isEqualTableFormat = function (sourceFormat, applyFormat) {
        if (applyFormat.hasValue('preferredWidth') && sourceFormat.preferredWidth !== applyFormat.preferredWidth) {
            return false;
        }
        if (applyFormat.hasValue('preferredWidthType') && sourceFormat.preferredWidthType !== applyFormat.preferredWidthType) {
            return false;
        }
        if (applyFormat.hasValue('tableAlignment') && sourceFormat.tableAlignment !== applyFormat.tableAlignment) {
            return false;
        }
        if (applyFormat.hasValue('leftIndent') && sourceFormat.leftIndent !== applyFormat.leftIndent) {
            return false;
        }
        if (applyFormat.hasValue('bidi') && sourceFormat.bidi !== applyFormat.bidi) {
            return false;
        }
        if (isNullOrUndefined(sourceFormat.title) ? '' !== applyFormat.title : sourceFormat.title !== applyFormat.title) {
            return false;
        }
        if (isNullOrUndefined(sourceFormat.description) ? '' !== applyFormat.description : sourceFormat.description !== applyFormat.description) {
            return false;
        }
        return true;
    };
    TablePropertiesDialog.prototype.isEqualRowFormat = function (sourceFormat, applyFormat) {
        if (applyFormat.hasValue('height') && sourceFormat.height !== applyFormat.height) {
            return false;
        }
        if (applyFormat.hasValue('heightType') && sourceFormat.heightType !== applyFormat.heightType) {
            return false;
        }
        if (applyFormat.hasValue('allowBreakAcrossPages') && sourceFormat.allowBreakAcrossPages !== applyFormat.allowBreakAcrossPages) {
            return false;
        }
        if (applyFormat.hasValue('isHeader') && sourceFormat.isHeader !== applyFormat.isHeader) {
            return false;
        }
        return true;
    };
    TablePropertiesDialog.prototype.isEqualCellFormat = function (sourceFormat, applyFormat) {
        if (applyFormat.hasValue('preferredWidth') && sourceFormat.preferredWidth !== applyFormat.preferredWidth) {
            return false;
        }
        if (applyFormat.hasValue('preferredWidthType') && sourceFormat.preferredWidthType !== applyFormat.preferredWidthType) {
            return false;
        }
        if (applyFormat.hasValue('verticalAlignment') && sourceFormat.verticalAlignment !== applyFormat.verticalAlignment) {
            return false;
        }
        return true;
    };
    /**
     * @private
     * @param {TableWidget} table - Specifies the table widget.
     * @returns {void}
     */
    TablePropertiesDialog.prototype.calculateGridValue = function (table) {
        table.isGridUpdated = false;
        table.buildTableColumns();
        table.isGridUpdated = true;
        this.documentHelper.selection.owner.isLayoutEnabled = true;
        this.documentHelper.layout.reLayoutTable(table);
        this.documentHelper.owner.editorModule.reLayout(this.documentHelper.selection);
        this.documentHelper.owner.editorModule.updateSelectionTextPosition(true);
        var history = this.documentHelper.owner.editorHistoryModule;
        if (history && history.currentBaseHistoryInfo) {
            if (history.currentBaseHistoryInfo.modifiedProperties.length > 0) {
                history.currentBaseHistoryInfo.updateSelection();
            }
            history.updateHistory();
        }
        this.documentHelper.owner.editorModule.fireContentChange();
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.loadTableProperties = function () {
        this.setTableProperties();
        this.setTableRowProperties();
        this.setTableCellProperties();
        this.setTableAltProperties();
        if (!this.documentHelper.owner.bordersAndShadingDialogModule) {
            this.bordersAndShadingButton.disabled = true;
        }
        else {
            this.bordersAndShadingButton.disabled = false;
        }
        // if (!this.documentHelper.owner.tableOptionsDialogModule) {
        //     this.tableOptionButton.disabled = true;
        // } else {
        this.tableOptionButton.disabled = false;
        // }
        // if (!this.documentHelper.owner.cellOptionsDialogModule) {
        //     this.cellOptionButton.disabled = true;
        // } else {
        this.cellOptionButton.disabled = false;
        // }
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.wireEvent = function () {
        this.documentHelper.selection.hideCaret();
        //Table Format
        this.preferCheckBox.change = this.changeTableCheckBox.bind(this);
        this.tableWidthBox.change = this.onTableWidthChange.bind(this);
        this.tableWidthType.change = this.onTableWidthTypeChange.bind(this);
        this.leftIndentBox.change = this.onLeftIndentChange.bind(this);
        //Row Format
        this.rowHeightCheckBox.change = this.changeTableRowCheckBox.bind(this);
        this.rowHeightBox.change = this.onRowHeightChange.bind(this);
        this.rowHeightType.change = this.onRowHeightTypeChange.bind(this);
        this.allowRowBreak.change = this.onAllowBreakAcrossPage.bind(this);
        this.repeatHeader.change = this.onRepeatHeader.bind(this);
        //Cell Format
        this.preferredCellWidthCheckBox.change = this.changeTableCellCheckBox.bind(this);
        this.cellWidthBox.change = this.onCellWidthChange.bind(this);
        this.cellWidthType.change = this.onCellWidthTypeChange.bind(this);
    };
    //#region Table Format
    TablePropertiesDialog.prototype.initTableProperties = function (element, localValue, isRtl) {
        var container = createElement('div', { className: 'e-de-table-dialog-size-label' });
        var sizeHeader = createElement('div', {
            innerHTML: localValue.getConstant('Size'),
            className: 'e-de-para-dlg-heading'
        });
        //const parentContainer: HTMLDivElement = <HTMLDivElement>createElement('div', { styles: 'display: inline-flex;' });
        var childContainer1 = createElement('div', {
            className: 'e-de-table-ppty-options-break'
        });
        var preferCheckBox = createElement('input', {
            attrs: { 'type': 'checkbox' }
        });
        var childContainer2 = createElement('div', {
            className: 'e-de-container-row'
        });
        var preferredWidthDiv = createElement('div', {
            className: 'e-de-subcontainer-left e-de-table-dialog-row-height'
        });
        this.preferredWidth = createElement('input');
        var controlDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        var tableWidthType = createElement('select', {
            innerHTML: '<option value="Points">' + localValue.getConstant('Points') +
                '</option><option value="Percent">' + localValue.getConstant('Percent') + '</option>'
        });
        // const labeltext: HTMLInputElement = <HTMLInputElement>createElement('span', {
        //     innerHTML: localValue.getConstant('Measure in'),
        //     className: 'e-de-table-measure-lbl'
        // });
        var alignment = createElement('div', { className: 'e-de-dlg-row' });
        var alignmentContainer = createElement('div', { className: 'e-de-subcontainer-left' });
        var alignmentHeader = createElement('div', {
            innerHTML: localValue.getConstant('Alignment'), className: 'e-de-table-dlg-alignment-heading'
        });
        var alignmentSubContainer = createElement('div', { className: 'e-de-container-row' });
        var classDivName = element.id + 'e-de-table-alignment e-de-table-dialog-alignment-icon';
        var leftDiv = createElement('div');
        var leftAlignDiv = createElement('div', { className: 'e-de-table-dia-align-div' });
        this.left = createElement('div', {
            className: 'e-icons e-de-table-properties-alignment e-de-table-left-alignment ' + classDivName,
            id: element.id + '_left_alignment'
            //styles: 'width:54px;height:54px;margin:2px'
        });
        leftAlignDiv.appendChild(this.left);
        leftAlignDiv.setAttribute('aria-label', localValue.getConstant('Left'));
        var centerAlignDiv = createElement('div', { className: 'e-de-table-dia-align-div' });
        this.center = createElement('div', {
            className: 'e-icons e-de-table-properties-alignment  e-de-table-center-alignment ' + classDivName,
            id: element.id + '_center_alignment'
            //styles: 'width:54px;height:54px;margin:2px'
        });
        centerAlignDiv.appendChild(this.center);
        centerAlignDiv.setAttribute('aria-label', localValue.getConstant('Center'));
        this.right = createElement('div', {
            //styles: 'width:54px;height:54px;margin:2px',
            className: 'e-icons e-de-table-properties-alignment  e-de-table-right-alignment ' + classDivName,
            id: element.id + '_right_alignment'
        });
        var rightAlignDiv = createElement('div', { className: 'e-de-table-dia-align-div' });
        rightAlignDiv.appendChild(this.right);
        rightAlignDiv.setAttribute('aria-label', localValue.getConstant('Right'));
        var leftlabel = createElement('label', {
            innerHTML: localValue.getConstant('Left'), className: 'e-de-table-dia-align-label'
        });
        var centerlabel = createElement('label', {
            innerHTML: localValue.getConstant('Center'), className: 'e-de-table-dia-align-label'
        });
        var rightlabel = createElement('label', {
            innerHTML: localValue.getConstant('Right'), className: 'e-de-table-dia-align-label'
        });
        var leftIndenetContainer = createElement('div', {
            className: 'e-de-subcontainer-right'
        });
        // let leftIndentLabelMargin: string;
        // let leftIndentBoxMargin: string;
        // if (isRtl) {
        //     leftIndentLabelMargin = 'left: 45px;';
        //     leftIndentBoxMargin = 'left: 45px;';
        // } else {
        //     leftIndentLabelMargin = 'right: 45px;';
        //     leftIndentBoxMargin = 'right: 45px;';
        // }
        // this.indentingLabel = createElement('label', {
        //     innerHTML: localValue.getConstant('Indent from left'),
        //     //styles: leftIndentLabelMargin,
        //     className: 'e-de-tbl-indent-lbl'
        // }) as HTMLLabelElement;
        // const leftIndentBox: HTMLDivElement = <HTMLDivElement>createElement('div', {
        //     styles: 'margin-top: 15px;position: relative;' + leftIndentBoxMargin
        // });
        this.leftIndent = createElement('input');
        var tableDirHeader = createElement('div', {
            innerHTML: localValue.getConstant('Table direction'), className: 'e-de-para-dlg-heading'
        });
        var tableDirContainer = createElement('div', { className: 'e-de-dlg-row' });
        var rtlDiv = createElement('div', { className: 'e-de-tbl-rtl-btn-div' });
        var rtlInputELe = createElement('input');
        rtlDiv.appendChild(rtlInputELe);
        tableDirContainer.appendChild(rtlDiv);
        var ltrDiv = createElement('div', { className: 'e-de-tbl-ltr-btn-div' });
        var ltrInputELe = createElement('input');
        ltrDiv.appendChild(ltrInputELe);
        tableDirContainer.appendChild(ltrDiv);
        this.rtlButton = new RadioButton({
            label: localValue.getConstant('Right-to-left'),
            value: 'rtl', cssClass: 'e-small', change: this.changeBidirectional,
            enableRtl: isRtl
        });
        this.rtlButton.appendTo(rtlInputELe);
        rtlInputELe.setAttribute('aria-label', localValue.getConstant('Right-to-left'));
        this.ltrButton = new RadioButton({
            label: localValue.getConstant('Left-to-right'),
            value: 'ltr', cssClass: 'e-small', change: this.changeBidirectional,
            enableRtl: isRtl
        });
        this.ltrButton.appendTo(ltrInputELe);
        ltrInputELe.setAttribute('aria-label', localValue.getConstant('Left-to-right'));
        var tableOptionContiner = createElement('div', {
            className: 'e-de-tbl-dlg-border-btn'
        });
        // if (isRtl) {
        //     tableOptionContiner.style.cssFloat = 'left';
        // }
        this.bordersAndShadingButton = createElement('button', {
            innerHTML: localValue.getConstant('Borders and Shading') + '...',
            className: 'e-control e-btn e-de-ok-button',
            attrs: { type: 'button' }
        });
        this.tableOptionButton = createElement('button', {
            className: 'e-control e-btn', innerHTML: localValue.getConstant('Options') + '...',
            attrs: { type: 'button' }
        });
        this.tableOptionButton.addEventListener('click', this.showTableOptionsDialog);
        this.bordersAndShadingButton.addEventListener('click', this.showBordersShadingsPropertiesDialog);
        tableOptionContiner.appendChild(this.bordersAndShadingButton);
        tableOptionContiner.appendChild(this.tableOptionButton);
        leftIndenetContainer.appendChild(this.leftIndent);
        alignmentSubContainer.appendChild(leftDiv);
        alignmentContainer.appendChild(alignmentHeader);
        leftDiv.appendChild(leftAlignDiv);
        alignmentContainer.appendChild(alignmentSubContainer);
        alignmentSubContainer.appendChild(centerAlignDiv);
        alignmentSubContainer.appendChild(rightAlignDiv);
        leftAlignDiv.appendChild(leftlabel);
        centerAlignDiv.appendChild(centerlabel);
        rightAlignDiv.appendChild(rightlabel);
        alignment.appendChild(alignmentContainer);
        container.appendChild(sizeHeader);
        element.appendChild(container);
        childContainer1.appendChild(preferCheckBox);
        container.appendChild(childContainer1);
        preferredWidthDiv.appendChild(this.preferredWidth);
        container.appendChild(childContainer2);
        controlDiv.appendChild(tableWidthType);
        alignment.appendChild(leftIndenetContainer);
        childContainer2.appendChild(preferredWidthDiv);
        childContainer2.appendChild(controlDiv);
        element.appendChild(alignment);
        element.appendChild(tableDirHeader);
        element.appendChild(tableDirContainer);
        element.appendChild(tableOptionContiner);
        this.tableWidthBox = new NumericTextBox({
            value: 0, decimals: 2, min: 0, max: 1584, enablePersistence: false
        });
        this.tableWidthBox.appendTo(this.preferredWidth);
        this.leftIndentBox = new NumericTextBox({
            value: 0, decimals: 2, min: -1584, max: 1584, enablePersistence: false, floatLabelType: 'Always', placeholder: localValue.getConstant('Indent from left')
        });
        this.leftIndentBox.appendTo(this.leftIndent);
        this.preferCheckBox = new CheckBox({
            label: localValue.getConstant('Preferred Width'), enableRtl: isRtl
        });
        this.preferCheckBox.appendTo(preferCheckBox);
        preferCheckBox.setAttribute('aria-label', localValue.getConstant('Preferred Width'));
        this.leftIndent.setAttribute('aria-labelledby', localValue.getConstant('Indent from left'));
        this.tableWidthType = new DropDownList({ enableRtl: isRtl, floatLabelType: 'Always', placeholder: localValue.getConstant('Measure in'), htmlAttributes: { 'aria-labelledby': localValue.getConstant('Measure in') } });
        this.tableWidthType.appendTo(tableWidthType);
        if (isRtl) {
            rtlDiv.classList.add('e-de-rtl');
            //childContainer2.classList.add('e-de-rtl');
            leftIndenetContainer.classList.add('e-de-rtl');
            tableOptionContiner.classList.add('e-de-rtl');
            //this.bordersAndShadingButton.classList.add('e-de-rtl');
            leftAlignDiv.classList.add('e-de-rtl');
            centerAlignDiv.classList.add('e-de-rtl');
            rightAlignDiv.classList.add('e-de-rtl');
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.onTableWidthChange = function () {
        this.tableFormat.preferredWidth = this.tableWidthBox.value;
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.onTableWidthTypeChange = function () {
        var value;
        //const table: TableWidget = this.documentHelper.selection.start.paragraph.associatedCell.ownerTable;
        var width = HelperMethods.convertPixelToPoint(this.documentHelper.owner.viewer.clientArea.width);
        if (this.tableWidthType.value === 'Percent' && this.documentHelper.selection.tableFormat.preferredWidthType !== 'Percent') {
            value = this.tableWidthBox.value / width * 100;
            this.formatNumericTextBox(this.tableWidthBox, 'Percent', value);
        }
        else if (this.tableWidthType.value === 'Points' && this.documentHelper.selection.tableFormat.preferredWidthType !== 'Point') {
            value = width / 100 * this.tableWidthBox.value;
            this.formatNumericTextBox(this.tableWidthBox, 'Point', value);
        }
        else {
            if (this.tableWidthBox.format === '#\'%\'') {
                if (this.tableWidthType.value === 'Points') {
                    value = width / 100 * this.tableWidthBox.value;
                }
                else {
                    value = this.tableWidthBox.value;
                }
            }
            else {
                if (this.tableWidthType.value === 'Percent') {
                    value = this.tableWidthBox.value / width * 100;
                }
                else {
                    value = this.tableWidthBox.value;
                }
            }
            this.formatNumericTextBox(this.tableWidthBox, (this.tableWidthType.value === 'Points') ? 'Point' : this.tableWidthType.value, value);
        }
        this.tableFormat.preferredWidthType = (this.tableWidthType.value === 'Points') ? 'Point' : this.tableWidthType.value;
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.onLeftIndentChange = function () {
        this.tableFormat.leftIndent = this.leftIndentBox.value;
    };
    TablePropertiesDialog.prototype.setTableAltProperties = function () {
        var tableFormat = this.documentHelper.selection.tableFormat;
        if (isNullOrUndefined(tableFormat.title)) {
            this.titleTextBox.value = '';
        }
        else {
            this.titleTextBox.value = tableFormat.title;
        }
        if (isNullOrUndefined(tableFormat.description)) {
            this.descriptionTextBox.value = '';
        }
        else {
            this.descriptionTextBox.value = tableFormat.description;
        }
    };
    TablePropertiesDialog.prototype.setTableProperties = function () {
        //instance of Table Property values
        var tableFormat = this.documentHelper.selection.tableFormat;
        var tableHasWidth = tableFormat.preferredWidth > 0;
        var preferredWidth = tableFormat.preferredWidth;
        if (isNullOrUndefined(tableFormat.preferredWidth)) {
            this.preferCheckBox.indeterminate = true;
            var startTable = this.documentHelper.selection.start.paragraph.associatedCell.ownerTable;
            var table = startTable.combineWidget(this.documentHelper.owner.viewer);
            preferredWidth = table.tableFormat.preferredWidth;
        }
        else {
            this.preferCheckBox.checked = tableHasWidth;
        }
        this.tableWidthBox.enabled = tableHasWidth;
        this.tableWidthType.enabled = tableHasWidth;
        this.formatNumericTextBox(this.tableWidthBox, tableFormat.preferredWidthType, preferredWidth);
        if (tableFormat.preferredWidthType === 'Auto' || tableFormat.preferredWidthType === 'Point') {
            this.tableWidthType.index = 0;
        }
        else {
            this.tableWidthType.index = 1;
        }
        this.activeTableAlignment(tableFormat, false);
        if (tableFormat.bidi) {
            this.rtlButton.checked = true;
            this.ltrButton.checked = false;
        }
        else {
            this.ltrButton.checked = true;
            this.rtlButton.checked = false;
        }
    };
    TablePropertiesDialog.prototype.activeTableAlignment = function (tableFormat, isChanged) {
        var tableAlignment = isChanged ? this.tableFormat.tableAlignment : undefined;
        // Consider the TableAlignment based on the Bidirectional property.
        if (isNullOrUndefined(tableAlignment)) {
            if (tableFormat.bidi) {
                if (tableFormat.tableAlignment === 'Left') {
                    tableAlignment = 'Right';
                }
                else if (tableFormat.tableAlignment === 'Right') {
                    tableAlignment = 'Left';
                }
            }
            else {
                tableAlignment = tableFormat.tableAlignment;
            }
        }
        if (tableFormat.bidi) {
            this.leftIndentBox.enabled = tableAlignment === 'Right';
            //this.indentingLabel.innerHTML = this.localValue.getConstant('Indent from right');
            this.leftIndentBox.placeholder = this.localValue.getConstant('Indent from right');
        }
        else {
            this.leftIndentBox.enabled = tableAlignment === 'Left';
            //this.indentingLabel.innerHTML = this.localValue.getConstant('Indent from left');
            this.leftIndentBox.placeholder = this.localValue.getConstant('Indent from left');
        }
        this.leftIndentBox.value = tableFormat.leftIndent;
        classList(this.left, [], ['e-de-table-alignment-active']);
        classList(this.right, [], ['e-de-table-alignment-active']);
        classList(this.center, [], ['e-de-table-alignment-active']);
        if (tableAlignment === 'Left') {
            classList(this.left, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
            //this.left.classList.add('e-de-table-alignment-active');
        }
        else if (tableAlignment === 'Center') {
            classList(this.center, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
            //this.center.classList.add('e-de-table-alignment-active');
        }
        else if (tableAlignment === 'Right') {
            classList(this.right, ['e-de-table-alignment-active'], ['e-de-table-properties-alignment']);
            //this.right.classList.add('e-de-table-alignment-active');
        }
    };
    /**
     * @private
     * @returns {string} Resturns table alignment
     */
    TablePropertiesDialog.prototype.getTableAlignment = function () {
        var id = this.tableTab.id;
        var groupButtons = this.tableTab.getElementsByClassName(id + 'e-de-table-alignment');
        for (var j = 0; j < groupButtons.length; j++) {
            var groupButton = groupButtons[parseInt(j.toString(), 10)];
            if (groupButton.classList.contains('e-de-table-alignment-active')) {
                if (j === 0) {
                    return this.ltrButton.checked ? 'Left' : 'Right';
                }
                else if (j === 1) {
                    return 'Center';
                }
                else {
                    return this.ltrButton.checked ? 'Right' : 'Left';
                }
            }
        }
        return undefined;
    };
    TablePropertiesDialog.prototype.updateClassForAlignmentProperties = function (element) {
        var id = element.id;
        var groupButtons = element.getElementsByClassName(id + 'e-de-table-alignment');
        for (var j = 0; j < groupButtons.length; j++) {
            var groupButton = groupButtons[parseInt(j.toString(), 10)];
            if (groupButton.classList.contains('e-de-table-alignment-active')) {
                classList(groupButton, ['e-de-table-properties-alignment'], ['e-de-table-alignment-active']);
            }
        }
    };
    //#endregion
    //#region Row Format
    TablePropertiesDialog.prototype.initTableRowProperties = function (element, localValue, isRtl) {
        var sizeDiv = createElement('div', { className: 'e-de-table-dialog-size-label' });
        var sizeLabeldiv = createElement('div', {
            innerHTML: localValue.getConstant('Size'),
            className: 'e-de-para-dlg-heading'
        });
        //const parentDiv: HTMLDivElement = <HTMLDivElement>createElement('div');
        // let childDiv1Float: string;
        // if (isRtl) {
        //     childDiv1Float = 'float: right;';
        // } else {
        //     childDiv1Float = 'float: left;';
        // }
        var childDiv1 = createElement('div', {
            className: 'e-de-table-ppty-options-break'
        });
        var rowHeightCheckBox = createElement('input', {
            attrs: { 'type': 'checkbox' }
        });
        var childdiv2 = createElement('div', {
            className: 'e-de-container-row'
        });
        var rowHeightDiv = createElement('div', {
            className: 'e-de-subcontainer-left e-de-table-dialog-row-height'
        });
        this.rowHeight = createElement('input', {
            attrs: { 'type': 'text' }
        });
        //let child2Float: string;
        // if (isRtl) {
        //     child2Float = 'float: left;';
        // } else {
        //     child2Float = 'float: right;';
        // }
        var controlDiv = createElement('div', { className: 'e-de-subcontainer-right' });
        //const child3: HTMLDivElement = createElement('div') as HTMLDivElement;
        //const child4: HTMLDivElement = createElement('div') as HTMLDivElement;
        //const controlDiv: HTMLDivElement = createElement('div', {className: 'e-de-subcontainer-right'}) as HTMLDivElement;
        var rowHeightType = createElement('select', {
            innerHTML: '<option value="AtLeast">' + localValue.getConstant('At least')
                + '</option><option value="Exactly">' + localValue.getConstant('Exactly') + '</option>'
        });
        // const labeltext: HTMLLabelElement = <HTMLLabelElement>createElement('span', {
        //     innerHTML: localValue.getConstant('Row height is'),
        //     className: 'e-de-table-measure-lbl'
        // });
        sizeDiv.appendChild(sizeLabeldiv);
        element.appendChild(sizeDiv);
        childDiv1.appendChild(rowHeightCheckBox);
        sizeDiv.appendChild(childDiv1);
        childdiv2.appendChild(rowHeightDiv);
        sizeDiv.appendChild(childdiv2);
        rowHeightDiv.appendChild(this.rowHeight);
        controlDiv.appendChild(rowHeightType);
        childdiv2.appendChild(controlDiv);
        var alignmentDiv = createElement('div', {
            innerHTML: localValue.getConstant('Options') + '...',
            className: 'e-de-para-dlg-heading'
        });
        var allowRowContainer = createElement('div', { className: 'e-de-table-ppty-options-break' });
        var repeatHeaderContaniner = createElement('div', { className: 'e-de-table-ppty-options-header-row' });
        var allowRowBreak = createElement('input', {
            attrs: { 'type': 'checkbox' }
        });
        var repeatHeader = createElement('input', {
            attrs: { 'type': 'checkbox' }
        });
        allowRowContainer.appendChild(allowRowBreak);
        repeatHeaderContaniner.appendChild(repeatHeader);
        element.appendChild(alignmentDiv);
        element.appendChild(allowRowContainer);
        element.appendChild(repeatHeaderContaniner);
        this.rowHeightBox = new NumericTextBox({
            value: 0, decimals: 2, min: 0, max: 1584, enablePersistence: false
        });
        this.rowHeightBox.appendTo(this.rowHeight);
        this.rowHeightCheckBox = new CheckBox({
            label: localValue.getConstant('Specify height'),
            enableRtl: isRtl
        });
        this.rowHeightCheckBox.appendTo(rowHeightCheckBox);
        rowHeightCheckBox.setAttribute('aria-label', localValue.getConstant('Specify height'));
        this.rowHeightType = new DropDownList({ enableRtl: isRtl, floatLabelType: 'Always', placeholder: localValue.getConstant('Row height is'), htmlAttributes: { 'aria-labelledby': localValue.getConstant('Row height is') } });
        this.rowHeightType.appendTo(rowHeightType);
        this.allowRowBreak = new CheckBox({
            label: localValue.getConstant('Allow row to break across pages'),
            enableRtl: isRtl
        });
        this.allowRowBreak.appendTo(allowRowBreak);
        allowRowBreak.setAttribute('aria-label', localValue.getConstant('Allow row to break across pages'));
        this.repeatHeader = new CheckBox({
            label: localValue.getConstant('Repeat as header row at the top of each page'),
            enableRtl: isRtl
        });
        this.repeatHeader.appendTo(repeatHeader);
        repeatHeader.setAttribute('aria-label', localValue.getConstant('Repeat as header row at the top of each page'));
        // if (isRtl) {
        //     child3.classList.add('e-de-rtl');
        //     child4.classList.add('e-de-rtl');
        //     childdiv2.classList.add('e-de-rtl');
        // }
    };
    TablePropertiesDialog.prototype.setTableRowProperties = function () {
        var rowFormat = this.documentHelper.selection.rowFormat;
        var enableRowHeight = (rowFormat.height > 0 || rowFormat.heightType === 'Exactly');
        //instance of table row values
        if (enableRowHeight) {
            this.rowHeightCheckBox.checked = true;
        }
        else {
            if (rowFormat.heightType === undefined) {
                this.rowHeightCheckBox.indeterminate = true;
                enableRowHeight = true;
            }
            else {
                this.rowHeightCheckBox.checked = false;
            }
        }
        this.rowHeightBox.enabled = enableRowHeight;
        this.rowHeightType.enabled = enableRowHeight;
        var enabledHeader = this.enableRepeatHeader() ? false : true;
        if (isNullOrUndefined(this.documentHelper.selection.rowFormat.isHeader)) {
            this.repeatHeader.indeterminate = true;
            this.repeatHeader.disabled = true;
        }
        else if (this.documentHelper.selection.rowFormat.isHeader) {
            this.repeatHeader.checked = !enabledHeader;
            this.repeatHeader.indeterminate = enabledHeader;
            this.repeatHeader.disabled = enabledHeader;
        }
        else {
            this.repeatHeader.checked = false;
            this.repeatHeader.indeterminate = false;
            this.repeatHeader.disabled = enabledHeader;
        }
        if (isNullOrUndefined(rowFormat.allowBreakAcrossPages)) {
            this.allowRowBreak.indeterminate = true;
        }
        else {
            this.allowRowBreak.checked = rowFormat.allowBreakAcrossPages;
        }
        this.rowHeightBox.value = rowFormat.height;
        if (rowFormat.heightType === 'Auto' || rowFormat.heightType === 'AtLeast') {
            this.rowHeightType.index = 0;
        }
        else {
            this.rowHeightType.index = 1;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.onRowHeightChange = function () {
        this.rowHeightValue = this.rowHeightBox.value;
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.onRowHeightTypeChange = function () {
        this.rowFormat.heightType = this.rowHeightType.text;
    };
    TablePropertiesDialog.prototype.onAllowBreakAcrossPage = function () {
        this.rowFormat.allowBreakAcrossPages = this.allowRowBreak.checked;
    };
    TablePropertiesDialog.prototype.onRepeatHeader = function () {
        this.rowFormat.isHeader = this.repeatHeader.checked;
    };
    /**
     * @private
     * @returns {boolean} Returns enable repeat header
     */
    TablePropertiesDialog.prototype.enableRepeatHeader = function () {
        var selection = this.documentHelper.selection;
        var start = selection.start;
        var end = selection.end;
        if (!selection.isForward) {
            start = selection.end;
            end = selection.start;
        }
        var startCell = start.paragraph.associatedCell;
        var endCell = end.paragraph.associatedCell;
        return startCell.ownerRow.index === 0 && endCell.ownerTable.equals(startCell.ownerTable);
    };
    //#endregion
    TablePropertiesDialog.prototype.initTableAltProperties = function (element, localValue, isRtl) {
        var altDiv = createElement('div', { className: 'e-de-table-dialog-size-label' });
        element.appendChild(altDiv);
        var titleDiv = createElement('div', {
            innerHTML: localValue.getConstant('Title'), className: 'e-de-para-dlg-heading'
        });
        altDiv.appendChild(titleDiv);
        var childdiv1 = createElement('div', {
            className: 'e-de-table-ppty-options-break'
        });
        var titleTextBox1 = createElement('input', {});
        this.titleTextBox = new TextBox({
            floatLabelType: 'Never'
        });
        altDiv.appendChild(childdiv1);
        childdiv1.appendChild(titleTextBox1);
        this.titleTextBox.appendTo(titleTextBox1);
        var descriptionDiv = createElement('div', {
            innerHTML: localValue.getConstant('Description'), className: 'e-de-para-dlg-heading'
        });
        altDiv.appendChild(descriptionDiv);
        var childdiv2 = createElement('div', {
            className: 'e-de-table-ppty-options-break'
        });
        var descriptionText = createElement('textarea', {});
        this.descriptionTextBox = new TextBox({
            floatLabelType: 'Never'
        });
        childdiv2.appendChild(descriptionText);
        this.descriptionTextBox.appendTo(descriptionText);
        altDiv.appendChild(childdiv2);
    };
    //#region Cell Format
    TablePropertiesDialog.prototype.initTableCellProperties = function (element, localValue, isRtl) {
        var sizeDiv = createElement('div', { className: 'e-de-table-dialog-size-label' });
        var div = createElement('div', {
            innerHTML: localValue.getConstant('Size'), className: 'e-de-para-dlg-heading'
        });
        //const parentdiv: HTMLDivElement = <HTMLDivElement>createElement('div');
        // let childdiv1Float: string;
        // if (isRtl) {
        //     childdiv1Float = 'float: right';
        // } else {
        //     childdiv1Float = 'float: left';
        // }
        var childdiv1 = createElement('div', {
            className: 'e-de-table-ppty-options-break'
        });
        var preferredCellWidthCheckBox = createElement('input', {
            attrs: { 'type': 'checkbox' }
        });
        var childdiv2 = createElement('div', {
            className: 'e-de-container-row'
        });
        var preferredCellDiv = createElement('div', {
            className: 'e-de-subcontainer-left e-de-table-dialog-row-height'
        });
        this.preferredCellWidth = createElement('input', {
            attrs: { 'type': 'text' }
        });
        // let child2Float: string;
        // if (isRtl) {
        //     child2Float = 'float: left;';
        // } else {
        //     child2Float = 'float: right;';
        // }
        var controlDiv = createElement('div', {
            className: 'e-de-subcontainer-right'
        });
        //const child3: HTMLDivElement = <HTMLDivElement>createElement('div');
        // let child4Float: string;
        // if (isRtl) {
        //     child4Float = 'float: left;';
        // } else {
        //     child4Float = 'float: right;';
        // }
        //const child4: HTMLDivElement = <HTMLDivElement>createElement('div');
        //const controlDiv: HTMLDivElement = createElement('div') as HTMLDivElement;
        var cellWidthType = createElement('select', {
            innerHTML: '<option value="Points">' + localValue.getConstant('Points') + '</option><option value="Percent">' +
                localValue.getConstant('Percent') + '</option>'
        });
        // const labeltext: HTMLLabelElement = createElement('span', {
        //     innerHTML: localValue.getConstant('Measure in'),
        //     className: 'e-de-table-measure-lbl'
        // }) as HTMLLabelElement;
        sizeDiv.appendChild(div);
        element.appendChild(sizeDiv);
        childdiv1.appendChild(preferredCellWidthCheckBox);
        preferredCellWidthCheckBox.setAttribute('aria-label', localValue.getConstant('Preferred Width'));
        sizeDiv.appendChild(childdiv1);
        preferredCellDiv.appendChild(this.preferredCellWidth);
        sizeDiv.appendChild(childdiv2);
        childdiv2.appendChild(preferredCellDiv);
        childdiv2.appendChild(controlDiv);
        controlDiv.appendChild(cellWidthType);
        var alignmentDiv = createElement('div', {
            innerHTML: localValue.getConstant('Vertical alignment'),
            className: 'e-de-para-dlg-heading'
        });
        var classDivName = element.id + 'e-de-table-cell-alignment e-de-tablecell-dialog-alignment-icon';
        var divAlignment = createElement('div', {
            className: 'e-de-container-row'
        });
        var topDiv = createElement('div');
        //const divStyle: string = 'width:54px;height:54px;margin:2px;border-style:solid;border-width:1px';
        var topAlignDiv = createElement('div', { className: 'e-de-tablecell-dia-align-div' });
        this.cellTopAlign = createElement('div', {
            id: element.id + '_cell_top-alignment',
            className: 'e-icons e-de-tablecell-alignment  e-de-tablecell-top-alignment ' + classDivName
        });
        topAlignDiv.appendChild(this.cellTopAlign);
        topAlignDiv.setAttribute('aria-label', localValue.getConstant('Top'));
        var centerAlignDiv = createElement('div', { className: 'e-de-tablecell-dia-align-div' });
        this.cellCenterAlign = createElement('div', {
            id: element.id + '_cell_center-alignment',
            className: 'e-icons e-de-tablecell-alignment  e-de-tablecell-center-alignment ' + classDivName
        });
        centerAlignDiv.appendChild(this.cellCenterAlign);
        centerAlignDiv.setAttribute('aria-label', localValue.getConstant('Center'));
        var bottomAlignDiv = createElement('div', { className: 'e-de-tablecell-dia-align-div' });
        this.cellBottomAlign = createElement('div', {
            id: element.id + '_cell_bottom-alignment',
            className: 'e-icons e-de-tablecell-alignment e-de-tablecell-bottom-alignment  ' + classDivName
        });
        bottomAlignDiv.appendChild(this.cellBottomAlign);
        bottomAlignDiv.setAttribute('aria-label', localValue.getConstant('Bottom'));
        var topLabel = createElement('label', {
            innerHTML: localValue.getConstant('Top'), className: 'e-de-table-dia-align-label'
        });
        var centerLabel = createElement('label', {
            innerHTML: localValue.getConstant('Center'), className: 'e-de-table-dia-align-label'
        });
        var bottomLabel = createElement('label', {
            innerHTML: localValue.getConstant('Bottom'), className: 'e-de-table-dia-align-label'
        });
        this.cellOptionButton = createElement('button', {
            innerHTML: localValue.getConstant('Options') + '...',
            className: 'e-control e-btn', attrs: { type: 'button' }
        });
        this.cellOptionButton.style.cssFloat = isRtl ? 'left' : 'right';
        divAlignment.appendChild(topDiv);
        topDiv.appendChild(topAlignDiv);
        divAlignment.appendChild(centerAlignDiv);
        divAlignment.appendChild(bottomAlignDiv);
        topAlignDiv.appendChild(topLabel);
        centerAlignDiv.appendChild(centerLabel);
        bottomAlignDiv.appendChild(bottomLabel);
        element.appendChild(alignmentDiv);
        element.appendChild(divAlignment);
        element.appendChild(this.cellOptionButton);
        this.cellOptionButton.addEventListener('click', this.showCellOptionsDialog);
        this.cellWidthBox = new NumericTextBox({
            value: 0, decimals: 2, min: 0, max: 1584, enablePersistence: false
        });
        this.cellWidthBox.appendTo(this.preferredCellWidth);
        this.preferredCellWidthCheckBox = new CheckBox({ label: localValue.getConstant('Preferred Width'), enableRtl: isRtl });
        this.preferredCellWidthCheckBox.appendTo(preferredCellWidthCheckBox);
        preferredCellWidthCheckBox.setAttribute('aria-label', localValue.getConstant('Preferred Width'));
        this.cellWidthType = new DropDownList({ enableRtl: isRtl, floatLabelType: 'Always', placeholder: localValue.getConstant('Measure in'), htmlAttributes: { 'aria-labelledby': localValue.getConstant('Measure in') } });
        this.cellWidthType.appendTo(cellWidthType);
        // if (isRtl) {
        //     childdiv2.classList.add('e-de-rtl');
        //     child3.classList.add('e-de-rtl');
        //     child4.classList.add('e-de-rtl');
        //     this.cellOptionButton.classList.add('e-de-rtl');
        //     topAlignDiv.classList.add('e-de-rtl');
        //     centerAlignDiv.classList.add('e-de-rtl');
        //     bottomAlignDiv.classList.add('e-de-rtl');
        // }
    };
    TablePropertiesDialog.prototype.setTableCellProperties = function () {
        var cellFormat = this.documentHelper.selection.cellFormat;
        //instance of table cell Values
        this.hasCellWidth = cellFormat.preferredWidth > 0;
        var preferredWidth = cellFormat.preferredWidth;
        if (isNullOrUndefined(cellFormat.preferredWidth)) {
            this.preferredCellWidthCheckBox.indeterminate = true;
            preferredWidth = this.documentHelper.selection.start.paragraph.associatedCell.cellFormat.preferredWidth;
        }
        else {
            this.preferredCellWidthCheckBox.checked = this.hasCellWidth;
        }
        this.cellWidthBox.enabled = this.hasCellWidth;
        this.cellWidthType.enabled = this.hasCellWidth;
        if (cellFormat.preferredWidthType === 'Auto' || cellFormat.preferredWidthType === 'Point') {
            this.cellWidthType.index = 0;
        }
        else {
            this.cellWidthType.index = 1;
        }
        this.formatNumericTextBox(this.cellWidthBox, cellFormat.preferredWidthType, preferredWidth);
        classList(this.cellTopAlign, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
        classList(this.cellCenterAlign, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
        classList(this.cellBottomAlign, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
        if (cellFormat.verticalAlignment === 'Top') {
            classList(this.cellTopAlign, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
            //this.cellTopAlign.classList.add('e-de-table-alignment-active');
        }
        else if (cellFormat.verticalAlignment === 'Center') {
            classList(this.cellCenterAlign, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
            //this.cellCenterAlign.classList.add('e-de-table-alignment-active');
        }
        else if (cellFormat.verticalAlignment === 'Bottom') {
            classList(this.cellBottomAlign, ['e-de-table-alignment-active'], ['e-de-tablecell-alignment']);
            //this.cellBottomAlign.classList.add('e-de-table-alignment-active');
        }
    };
    TablePropertiesDialog.prototype.updateClassForCellAlignment = function (element) {
        var cellAlignments = element.getElementsByClassName(element.id + 'e-de-table-cell-alignment');
        for (var j = 0; j < cellAlignments.length; j++) {
            var cellAlignment = cellAlignments[parseInt(j.toString(), 10)];
            if (cellAlignment.classList.contains('e-de-table-alignment-active')) {
                classList(cellAlignment, ['e-de-tablecell-alignment'], ['e-de-table-alignment-active']);
            }
        }
    };
    TablePropertiesDialog.prototype.formatNumericTextBox = function (textBox, format, value) {
        if (format === 'Auto' || format === 'Point') {
            textBox.format = 'n2';
        }
        else {
            textBox.format = '#\'%\'';
        }
        textBox.step = 1;
        textBox.decimals = 2;
        textBox.value = value;
        textBox.htmlAttributes = { 'aria-label': 'cellWidth' };
    };
    /**
     * @private
     * @returns {string} - Returns the alignement.
     */
    TablePropertiesDialog.prototype.getCellAlignment = function () {
        var id = this.cellTab.id;
        var groupButtons = this.cellTab.getElementsByClassName(id + 'e-de-table-cell-alignment');
        for (var j = 0; j < groupButtons.length; j++) {
            var groupButton = groupButtons[parseInt(j.toString(), 10)];
            if (groupButton.classList.contains('e-de-table-alignment-active')) {
                if (j === 0) {
                    return 'Top';
                }
                else if (j === 1) {
                    return 'Center';
                }
                else {
                    return 'Bottom';
                }
            }
        }
        return this.documentHelper.selection.cellFormat.verticalAlignment;
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.onCellWidthChange = function () {
        this.cellFormat.preferredWidth = this.cellWidthBox.value;
    };
    /**
     * @private
     * @returns {void}
     */
    TablePropertiesDialog.prototype.onCellWidthTypeChange = function () {
        var value;
        var table = this.documentHelper.selection.start.paragraph.associatedCell.ownerTable;
        var containerWidth = table.getOwnerWidth(true);
        var tableWidth = table.getTableClientWidth(containerWidth);
        if (this.cellWidthType.value === 'Percent' && this.documentHelper.selection.cellFormat.preferredWidthType !== 'Percent') {
            value = this.cellWidthBox.value / tableWidth * 100;
            this.formatNumericTextBox(this.cellWidthBox, 'Percent', value);
        }
        else if (this.cellWidthType.value === 'Points' && this.documentHelper.selection.cellFormat.preferredWidthType !== 'Point') {
            value = tableWidth / 100 * this.cellWidthBox.value;
            this.formatNumericTextBox(this.cellWidthBox, 'Point', value);
        }
        else {
            if (this.cellWidthBox.format === '#\'%\'') {
                if (this.cellWidthType.value === 'Points') {
                    value = tableWidth / 100 * this.cellWidthBox.value;
                }
                else {
                    value = this.cellWidthBox.value;
                }
            }
            else {
                if (this.cellWidthType.value === 'Percent') {
                    value = this.cellWidthBox.value / tableWidth * 100;
                }
                else {
                    value = this.cellWidthBox.value;
                }
            }
            this.formatNumericTextBox(this.cellWidthBox, (this.cellWidthType.value === 'Points') ? 'Point' : this.cellWidthType.value, value);
        }
        this.cellFormat.preferredWidthType = (this.cellWidthType.value === 'Points') ? 'Point' : this.cellWidthType.value;
    };
    /**
     * @private
     *
     * @returns {void}
     */
    TablePropertiesDialog.prototype.destroy = function () {
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var s = 0; s < this.target.childNodes.length; s++) {
                this.target.removeChild(this.target.childNodes[parseInt(s.toString(), 10)]);
                s--;
            }
            this.target = undefined;
        }
        this.dialog = undefined;
        this.target = undefined;
        this.cellAlignment = undefined;
        this.tableAlignment = undefined;
        this.documentHelper = undefined;
        this.preferCheckBox = undefined;
        this.tableWidthType = undefined;
        this.preferredWidth = undefined;
        this.rowHeightType = undefined;
        this.rowHeightCheckBox = undefined;
        this.rowHeight = undefined;
        this.cellWidthType = undefined;
        this.preferredCellWidthCheckBox = undefined;
        this.preferredCellWidth = undefined;
        this.tableTab = undefined;
        this.rowTab = undefined;
        this.cellTab = undefined;
        this.left = undefined;
        this.center = undefined;
        this.right = undefined;
        this.leftIndent = undefined;
        this.allowRowBreak = undefined;
        this.repeatHeader = undefined;
        this.cellTopAlign = undefined;
        this.cellCenterAlign = undefined;
        this.cellBottomAlign = undefined;
        this.titleTextBox = undefined;
        this.descriptionTextBox = undefined;
        this.altTab = undefined;
        if (this.paraFormatIn) {
            this.paraFormatIn.destroy();
            this.paraFormatIn = undefined;
        }
        if (this.tableFormatIn) {
            this.tableFormatIn.destroy();
        }
        if (this.cellFormatIn) {
            this.cellFormatIn.destroy();
        }
        this.tableFormatIn = undefined;
        this.cellFormatIn = undefined;
    };
    return TablePropertiesDialog;
}());
export { TablePropertiesDialog };
