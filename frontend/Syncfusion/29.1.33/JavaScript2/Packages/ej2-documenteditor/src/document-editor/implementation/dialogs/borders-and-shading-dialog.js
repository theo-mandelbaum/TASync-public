import { classList, createElement, initializeCSPTemplate, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { WTableFormat, WBorder, WBorders, WShading, WCellFormat } from '../format/index';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { ColorPicker } from '@syncfusion/ej2-inputs';
/**
 * The Borders and Shading dialog is used to modify borders and shading options for selected table or cells.
 */
var BordersAndShadingDialog = /** @class */ (function () {
    /**
     * @param {DocumentHelper} documentHelper - Specifies the document helper.
     * @private
     */
    function BordersAndShadingDialog(documentHelper) {
        var _this = this;
        this.cellFormat = new WCellFormat();
        this.tableFormat = new WTableFormat();
        this.isShadingChanged = false;
        this.handleSettingCheckBoxActionHandler = this.onhandleSettingCheckBoxActionClicked.bind(this);
        this.handlePreviewCheckBoxActionHandler = this.onhandlePreviewCheckBoxActionClicked.bind(this);
        /**
         * @private
         * @returns {void}
         */
        this.applyBordersShadingsProperties = function () {
            var tablePropertiesDialog = _this.documentHelper.owner.tablePropertiesDialogModule;
            var selectedCell = _this.documentHelper.selection.start.paragraph.associatedCell;
            //Need to bind the properties with current cell and current table formats.
            var borders = undefined;
            if (_this.checkClassName(_this.previewDivTopTop) || _this.checkClassName(_this.previewDivTopBottom)
                || _this.checkClassName(_this.previewDivTopCenter) || _this.checkClassName(_this.previewDivBottomcenter)
                || _this.checkClassName(_this.previewDivBottomLeft) || _this.checkClassName(_this.previewDivBottomRight)
                || _this.checkClassName(_this.previewDivDiagonalRight) || _this.checkClassName(_this.previewDivLeftDiagonal)) {
                borders = new WBorders();
                if (_this.checkClassName(_this.previewDivTopTop)) {
                    borders.top = _this.getBorder('top');
                }
                if (_this.checkClassName(_this.previewDivTopBottom)) {
                    borders.bottom = _this.getBorder('bottom');
                }
                if (_this.checkClassName(_this.previewDivBottomLeft)) {
                    borders.left = _this.getBorder('left');
                }
                if (_this.checkClassName(_this.previewDivBottomRight)) {
                    borders.right = _this.getBorder('right');
                }
                if (_this.checkClassName(_this.previewDivTopCenter)) {
                    borders.horizontal = _this.getBorder('horizontal');
                }
                if (_this.checkClassName(_this.previewDivBottomcenter)) {
                    borders.vertical = _this.getBorder('vertical');
                }
                if (_this.checkClassName(_this.previewDivLeftDiagonal)) {
                    borders.diagonalDown = _this.getBorder('diagonalDown');
                }
                if (_this.checkClassName(_this.previewDivDiagonalRight)) {
                    borders.diagonalUp = _this.getBorder('diagonalUp');
                }
            }
            var shading = new WShading();
            var editorModule = _this.documentHelper.owner.editorModule;
            shading.backgroundColor = _this.shadingColorPicker.value;
            if (_this.ulelementShading.value === 'Cell') {
                if (tablePropertiesDialog) {
                    tablePropertiesDialog.isCellBordersAndShadingUpdated = true;
                }
                _this.cellFormat.borders = new WBorders();
                if (!isNullOrUndefined(borders)) {
                    editorModule.applyBordersInternal(_this.cellFormat.borders, borders);
                }
                else if (_this.noneDiv.classList.contains('e-de-table-border-inside-setting-click')) {
                    editorModule.applyBordersInternal(_this.cellFormat.borders, new WBorders());
                }
                // Once option has been added for texture and foreground, need to handle this similar to Shading Fill.
                if (!isNullOrUndefined(selectedCell.cellFormat.shading)) {
                    shading.foregroundColor = selectedCell.cellFormat.shading.foregroundColor;
                    shading.textureStyle = selectedCell.cellFormat.shading.textureStyle;
                }
                _this.cellFormat.shading = new WShading();
                editorModule.applyShading(_this.cellFormat.shading, shading);
            }
            else if (_this.ulelementShading.value === 'Table') {
                if (tablePropertiesDialog) {
                    tablePropertiesDialog.isTableBordersAndShadingUpdated = true;
                }
                var currentTableFormat = _this.documentHelper.owner.selectionModule.tableFormat.table.tableFormat;
                _this.tableFormat.copyFormat(currentTableFormat);
                _this.tableFormat.borders = new WBorders();
                // when we copy a table and paste it in documentEditor, in that case rowFormat and cellFormat has a border value instead of tableFormat. So, we need to clear the border value from rowFormat and cellFormat.
                if (!isNullOrUndefined(borders) || _this.noneDiv.classList.contains('e-de-table-border-inside-setting-click')) {
                    var table = _this.documentHelper.owner.selectionModule.tableFormat.table;
                    for (var _i = 0, _a = table.childWidgets; _i < _a.length; _i++) {
                        var rowWidget = _a[_i];
                        _this.updateBorder(table.tableFormat.borders.left, rowWidget.rowFormat.borders.left);
                        _this.updateBorder(table.tableFormat.borders.top, rowWidget.rowFormat.borders.top);
                        _this.updateBorder(table.tableFormat.borders.right, rowWidget.rowFormat.borders.right);
                        _this.updateBorder(table.tableFormat.borders.bottom, rowWidget.rowFormat.borders.bottom);
                        var rowHorizontalBorder = rowWidget.rowFormat.borders.horizontal;
                        var tableHorizontalBorder = table.tableFormat.borders.horizontal;
                        if ((rowHorizontalBorder.lineStyle === 'Single' && tableHorizontalBorder.lineStyle === 'None') ||
                            (rowHorizontalBorder.lineStyle === 'Cleared' && tableHorizontalBorder.lineStyle === 'Cleared')) {
                            tableHorizontalBorder.lineStyle = 'Single';
                            tableHorizontalBorder.lineWidth = rowHorizontalBorder.lineWidth;
                        }
                        var rowVerticalBorder = rowWidget.rowFormat.borders.vertical;
                        var tableVerticalBorder = table.tableFormat.borders.vertical;
                        if ((rowVerticalBorder.lineStyle === 'Single' && tableVerticalBorder.lineStyle === 'None') ||
                            (rowVerticalBorder.lineStyle === 'Cleared' && tableVerticalBorder.lineStyle === 'Cleared')) {
                            tableVerticalBorder.lineStyle = 'Single';
                            tableVerticalBorder.lineWidth = rowVerticalBorder.lineWidth;
                        }
                        rowWidget.rowFormat.borders.clearFormat();
                        for (var _b = 0, _c = rowWidget.childWidgets; _b < _c.length; _b++) {
                            var cellWidget = _c[_b];
                            cellWidget.cellFormat.borders.clearFormat();
                        }
                    }
                }
                if (!isNullOrUndefined(borders)) {
                    editorModule.applyBordersInternal(_this.tableFormat.borders, borders);
                }
                else if (_this.noneDiv.classList.contains('e-de-table-border-inside-setting-click')) {
                    editorModule.applyBordersInternal(_this.tableFormat.borders, new WBorders());
                }
                // Once option has been added for texture and foreground, need to handle this similar to Shading Fill.
                if (!isNullOrUndefined(currentTableFormat.shading)) {
                    shading.foregroundColor = currentTableFormat.shading.foregroundColor;
                    shading.textureStyle = currentTableFormat.shading.textureStyle;
                }
                _this.tableFormat.shading = new WShading();
                _this.isShadingChanged = currentTableFormat.shading.backgroundColor !== shading.backgroundColor;
                editorModule.applyShading(_this.tableFormat.shading, shading);
            }
            else if (_this.ulelementShading.value === 'Paragraph') {
                var isNoneBorder = _this.noneDiv.classList.contains('e-de-table-border-inside-setting-click');
                if (!isNullOrUndefined(_this.paragraphFormat)) {
                    editorModule.applyBordersInternal(_this.paragraphFormat.borders, isNoneBorder ? new WBorders() : borders);
                }
                else {
                    editorModule.onApplyParagraphFormat('borders', isNoneBorder ? new WBorders() : borders, false, false);
                }
            }
            _this.applyFormat();
            _this.closeDialog();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeDialog = function () {
            _this.documentHelper.dialog.hide();
            _this.closeBordersShadingsDialog();
        };
        /**
         * @private
         * @returns {void}
         */
        this.closeBordersShadingsDialog = function () {
            _this.paragraphFormat = undefined;
            _this.documentHelper.dialog2.element.style.pointerEvents = '';
            _this.documentHelper.updateFocus();
        };
        /**
         * @private
         * @param {Event} event - Specifies the event args.
         * @returns {void}
         */
        this.handleSettingCheckBoxAction = function (event) {
            var targetId = event.target.id;
            var tableBorderDialogId = _this.target.id;
            // let targetDiv: HTMLDivElement;
            if (targetId === tableBorderDialogId + '_None_Div' || targetId === tableBorderDialogId + '_None_Div_Container'
                || targetId === tableBorderDialogId + '_None_Div_Transparent') {
                _this.updateClassForSettingDivElements();
                _this.noneDiv.classList.add('e-de-table-border-inside-setting-click');
                _this.setSettingPreviewDivElement('none');
            }
            else if (targetId === tableBorderDialogId + '_Box_Div' || targetId === tableBorderDialogId + '_Box_Div_Container'
                || targetId === tableBorderDialogId + '_Box_Div_Transparent') {
                _this.updateClassForSettingDivElements();
                _this.boxDiv.classList.add('e-de-table-border-inside-setting-click');
                _this.setSettingPreviewDivElement('box');
            }
            else if (targetId === tableBorderDialogId + '_All_Div' || targetId === tableBorderDialogId + '_All_Div_Container'
                || targetId === tableBorderDialogId + '_All_Div_Transparent') {
                _this.updateClassForSettingDivElements();
                _this.allDiv.classList.add('e-de-table-border-inside-setting-click');
                _this.setSettingPreviewDivElement('all');
            }
            else {
                if (_this.ulelementShading.value === 'Paragraph') {
                    _this.updateClassForSettingDivElements();
                    _this.customDiv.classList.add('e-de-table-border-inside-setting-click');
                    _this.setSettingPreviewDivElement('customDiv');
                }
                else {
                    _this.updateClassForSettingDivElements();
                    _this.customDiv.classList.add('e-de-table-border-inside-setting-click');
                    _this.setSettingPreviewDivElement('customDiv');
                }
            }
        };
        /**
         * @private
         * @param {Event} event - Specifies the event args.
         * @returns {void}
         */
        this.handlePreviewCheckBoxAction = function (event) {
            var target = event.target;
            var targetId = target.id;
            // const tableBorderDialog: HTMLElement = this.target;
            var tableBorderDialogId = _this.target.id;
            var compareClass = 'e-de-table-border-inside-preview-click';
            _this.customDiv.click();
            if (targetId === tableBorderDialogId + '_Preview_Div_TopTop_Container' || targetId === tableBorderDialogId + '_Preview_Div_TopTop'
                || targetId === tableBorderDialogId + '_previewDivTopTopTransParent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivTopTop);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div', '_Preview_Div_TopTop', 'TopTop');
            }
            else if (targetId === tableBorderDialogId + '_Preview_Div_TopCenter_Container'
                || targetId === tableBorderDialogId + '_Preview_Div_TopCenter'
                || targetId === tableBorderDialogId + '_previewDivTopCenterTransParent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivTopCenter);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div_Horizontal', '_Preview_Div_TopCenter', 'TopCenter');
            }
            else if (targetId === tableBorderDialogId + '_Preview_Div_TopBottom_Container' || targetId === tableBorderDialogId + '_Preview_Div_TopBottom'
                || targetId === tableBorderDialogId + '_previewDivTopBottomTransParent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivTopBottom);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div', '_Preview_Div_TopBottom', 'TopBottom');
            }
            else if (targetId === tableBorderDialogId + '_Preview_Div_LeftDiagonal_Container'
                || targetId === tableBorderDialogId + '_Preview_Div_LeftDiagonal'
                || targetId === tableBorderDialogId + '_previewDivLeftDiagonalTransParent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivLeftDiagonal);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div_Left_Diagonal', '_Preview_Div_LeftDiagonal', 'LeftDiagonal');
            }
            else if (targetId === tableBorderDialogId + '_Preview_Div_BottomLeft_Container' || targetId === tableBorderDialogId + '_Preview_Div_BottomLeft'
                || targetId === tableBorderDialogId + '_previewDivBottomLeftTransparent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivBottomLeft);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div', '_Preview_Div_BottomLeft', 'BottomLeft');
            }
            else if (targetId === tableBorderDialogId + '_Preview_Div_BottomCenter_Container'
                || targetId === tableBorderDialogId + '_Preview_Div_BottomCenter'
                || targetId === tableBorderDialogId + '_previewDivBottomcenterTransparent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivBottomcenter);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div_Vertical', '_Preview_Div_BottomCenter', 'BottomCenter');
            }
            else if (targetId === tableBorderDialogId + '_Preview_Div_BottomRight_Container' || targetId === tableBorderDialogId + '_Preview_Div_BottomRight'
                || targetId === tableBorderDialogId + '_previewDivBottomRightTransparent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivBottomRight);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div', '_Preview_Div_BottomRight', 'BottomRight');
            }
            else if (targetId === tableBorderDialogId + '_Preview_Div_RightDiagonal_Container'
                || targetId === tableBorderDialogId + '_Preview_Div_RightDiagonal'
                || targetId === tableBorderDialogId + '_previewDivDiagonalRightTransparent') {
                _this.handlePreviewCheckBoxShowHide(tableBorderDialogId, compareClass, _this.previewDivDiagonalRight);
                _this.showHidePreviewDivElements(tableBorderDialogId, compareClass, '_Preview_Div_Right_Diagonal', '_Preview_Div_RightDiagonal', 'RightDiagonal');
            }
        };
        /**
         * @private
         * @returns {void}
         */
        this.applyTableCellPreviewBoxes = function () {
            //this.customDiv.click();
            if (!isNullOrUndefined(_this.ulelementShading)) {
                if (_this.ulelementShading.value === 'Cell') {
                    _this.shadingColorPicker.disabled = false;
                    _this.previewDivBottomcenterContainer.style.visibility = 'hidden';
                    _this.previewDivTopCenterContainer.style.visibility = 'hidden';
                    _this.previewVerticalDiv.style.display = 'none';
                    _this.previewHorizontalDiv.style.display = 'none';
                    _this.previewDivLeftDiagonal.style.display = '';
                    _this.previewDivDiagonalRight.style.display = '';
                    _this.previewDivBottomRightContainer.style.left = '80px';
                    classList(_this.noneDivTransparent, ['e-de-table-border-none-setting'], ['e-de-para-border-none-setting']);
                    classList(_this.boxDivTransparent, ['e-de-table-border-box-setting'], ['e-de-para-border-box-setting']);
                    classList(_this.allDivTransparent, ['e-de-table-border-all-setting'], ['e-de-para-border-shadow-setting']);
                    classList(_this.customDivTransparent, ['e-de-table-border-custom-setting'], ['e-de-para-border-custom-setting']);
                }
                else if (_this.ulelementShading.value === 'Table') {
                    _this.shadingColorPicker.disabled = false;
                    _this.previewDivLeftDiagonal.style.display = 'none';
                    _this.previewDivDiagonalRight.style.display = 'none';
                    _this.previewDivBottomcenterContainer.style.visibility = 'visible';
                    _this.previewDivTopCenterContainer.style.visibility = 'visible';
                    _this.previewVerticalDiv.style.display = '';
                    _this.previewHorizontalDiv.style.display = '';
                    _this.previewDivBottomRightContainer.style.left = '110px';
                    classList(_this.noneDivTransparent, ['e-de-table-border-none-setting'], ['e-de-para-border-none-setting']);
                    classList(_this.boxDivTransparent, ['e-de-table-border-box-setting'], ['e-de-para-border-box-setting']);
                    classList(_this.allDivTransparent, ['e-de-table-border-all-setting'], ['e-de-para-border-shadow-setting']);
                    classList(_this.customDivTransparent, ['e-de-table-border-custom-setting'], ['e-de-para-border-custom-setting']);
                }
                else {
                    _this.shadingColorPicker.disabled = true;
                    _this.previewDivBottomcenterContainer.style.visibility = 'hidden';
                    _this.previewDivTopCenterContainer.style.visibility = 'hidden';
                    _this.previewVerticalDiv.style.display = 'none';
                    _this.previewHorizontalDiv.style.display = 'none';
                    _this.previewLeftDiagonalDiv.style.display = 'none';
                    _this.previewRightDiagonalDiv.style.display = 'none';
                    classList(_this.noneDivTransparent, ['e-de-para-border-none-setting'], ['e-de-table-border-none-setting']);
                    classList(_this.boxDivTransparent, ['e-de-para-border-box-setting'], ['e-de-table-border-box-setting']);
                    classList(_this.allDivTransparent, ['e-de-para-border-shadow-setting'], ['e-de-table-border-all-setting']);
                    classList(_this.customDivTransparent, ['e-de-para-border-custom-setting'], ['e-de-table-border-custom-setting']);
                }
            }
        };
        /**
         * @private
         * @param {ColorPickerEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.applyPreviewTableBackgroundColor = function (args) {
            if (!isNullOrUndefined(args.currentValue)) {
                var color = args.currentValue.hex;
                _this.previewDiv.style.backgroundColor = color;
            }
        };
        /**
         * @private
         * @param {ColorPickerEventArgs} args - Specifies the event args.
         * @returns {void}
         */
        this.applyPreviewTableBorderColor = function (args) {
            if (!isNullOrUndefined(args.currentValue)) {
                var color = args.currentValue.hex;
                _this.previewDiv.style.borderColor = color;
                _this.previewRightDiagonalDiv.style.backgroundColor = color;
                _this.previewLeftDiagonalDiv.style.backgroundColor = color;
                _this.previewVerticalDiv.style.backgroundColor = color;
                _this.previewHorizontalDiv.style.backgroundColor = color;
            }
        };
        this.documentHelper = documentHelper;
    }
    BordersAndShadingDialog.prototype.getModuleName = function () {
        return 'BordersAndShadingDialog';
    };
    /**
     * @private
     * @param {L10n} localeValue - Specifies the locale.
     * @param {boolean} isRtl - Specifies is rtl.
     * @returns {void}
     */
    BordersAndShadingDialog.prototype.initBordersAndShadingsDialog = function (localeValue, isRtl) {
        this.target = createElement('div', {
            id: this.documentHelper.owner.containerId + '_table_border_shadings',
            className: 'e-de-table-border-shading-dlg'
        });
        this.displayText = createElement('div', {
            innerHTML: localeValue.getConstant('Borders'),
            className: 'e-de-table-border-heading'
        });
        this.settingAndPreviewContainer = createElement('div', {
            className: 'e-de-dlg-row'
        });
        this.settingsContiner = createElement('div', {});
        this.styleContainer = createElement('div', {});
        this.previewContiner = createElement('div', {
            className: 'e-de-table-border-preview-container'
        });
        this.previewSubContainer1 = createElement('div', {
            className: 'e-de-dlg-row'
        });
        this.previewSubContainer2 = createElement('div', {});
        this.styleSubContainer = createElement('div', {
            className: 'e-de-container-row'
        });
        this.dropdownListDiv = createElement('div', {
            className: 'e-de-subcontainer-left'
        });
        this.dropDownList = createElement('input', {});
        this.widthcontainerDiv = createElement('div', {
            className: 'e-de-container-row'
        });
        this.widthNumericDiv = createElement('div', {
            className: 'e-de-subcontainer-left'
        });
        this.widthNumeric = createElement('input', {});
        this.colorDiv = createElement('div', {
            className: 'e-de-subcontainer-right'
        });
        this.colorText = createElement('div', {
            innerHTML: localeValue.getConstant('Color'),
            className: 'e-de-table-border-clr-heading'
        });
        this.borderColorPickerElement = createElement('input', {
            attrs: { 'type': 'color' },
            className: 'e-dlg-clr-pkr-top'
        });
        this.settingText = createElement('div', {
            innerHTML: localeValue.getConstant('Setting'),
            className: 'e-de-table-setting-heading'
        });
        this.settingsSubContiner = createElement('div', {
            className: 'e-de-dlg-row'
        });
        this.noneDivContainer = createElement('div', {
            id: this.target.id + '_None_Div_Container'
        });
        this.noneDiv = createElement('div', {
            id: this.target.id + '_None_Div',
            className: 'e-de-table-border-inside-setting e-de-table-border-setting-genral'
        });
        this.noneDivLabel = createElement('label', {
            innerHTML: localeValue.getConstant('None'), className: 'e-de-table-setting-labels-heading',
            id: this.target.id + '_None_Div_Label'
        });
        this.boxDivContainer = createElement('div', {
            id: this.target.id + '_Box_Div_Container'
        });
        this.boxDiv = createElement('div', {
            id: this.target.id + '_Box_Div',
            className: 'e-de-table-border-inside-setting e-de-table-border-setting-genral'
        });
        this.boxDivLabel = createElement('label', {
            innerHTML: localeValue.getConstant('Box'), className: 'e-de-table-setting-labels-heading',
            id: this.target.id + '_Box_Div_Label'
        });
        this.allDivContainer = createElement('div', {
            id: this.target.id + '_All_Div_Container'
        });
        this.allDiv = createElement('div', {
            id: this.target.id + '_All_Div',
            className: 'e-de-table-border-inside-setting e-de-table-border-setting-genral'
        });
        this.allDivLabel = createElement('label', {
            innerHTML: localeValue.getConstant('All'), className: 'e-de-table-setting-labels-heading',
            id: this.target.id + '_All_Div_Label'
        });
        this.customDivContainer = createElement('div', {
            id: this.target.id + '_Custom_Div_Container'
        });
        this.customDiv = createElement('div', {
            id: this.target.id + '_Custom_Div',
            className: 'e-de-table-border-inside-setting e-de-table-border-setting-genral'
        });
        this.customDivLabel = createElement('label', {
            innerHTML: localeValue.getConstant('Custom'), className: 'e-de-table-setting-labels-heading',
            id: this.target.id + '_Custom_Div_Label'
        });
        this.noneDivTransparent = createElement('div', {
            id: this.target.id + '_None_Div_Transparent', className: 'e-icons e-de-table-border-setting e-de-table-border-none-setting'
        });
        this.boxDivTransparent = createElement('div', {
            id: this.target.id + '_Box_Div_Transparent', className: 'e-icons e-de-table-border-setting e-de-table-border-box-setting'
        });
        this.allDivTransparent = createElement('div', {
            id: this.target.id + '_All_Div_Transparent', className: 'e-icons e-de-table-border-setting e-de-table-border-all-setting'
        });
        this.customDivTransparent = createElement('div', {
            id: this.target.id + '_Custom_Div_Transparent', className: 'e-icons e-de-table-border-setting e-de-table-border-custom-setting'
        });
        if (isRtl) {
            this.noneDivTransparent.classList.add('e-de-rtl');
            this.boxDivTransparent.classList.add('e-de-rtl');
            this.allDivTransparent.classList.add('e-de-rtl');
            this.customDivTransparent.classList.add('e-de-rtl');
        }
        this.previewText = createElement('div', {
            innerHTML: localeValue.getConstant('Preview'), className: 'e-de-table-setting-heading'
        });
        this.previewDiv = createElement('div', {
            id: this.target.id + '_Preview_Div', className: 'e-de-border-dlg-preview-div',
            styles: 'position: relative'
        });
        this.previewRightDiagonalDiv = createElement('div', {
            styles: 'position: absolute;width:1px;height:111px;left: 38px;top: -17px;transform: rotate(135deg); background-color: black',
            id: this.target.id + '_Preview_Div_Right_Diagonal',
            className: 'e-de-border-dlg-preview-inside-divs'
        });
        this.previewLeftDiagonalDiv = createElement('div', {
            styles: 'position: absolute;width: 1px;height: 111px;left: 38px;top: -17px;transform:rotate(45deg); background-color: black',
            id: this.target.id + '_Preview_Div_Left_Diagonal',
            className: 'e-de-border-dlg-preview-inside-divs'
        });
        this.previewVerticalDiv = createElement('div', {
            styles: 'width: 1px;height: 80px;position: absolute;left: 39px;top: -1px; background-color: black',
            id: this.target.id + '_Preview_Div_Vertical',
            className: 'e-de-border-dlg-preview-inside-divs'
        });
        this.previewHorizontalDiv = createElement('div', {
            styles: 'width: 80px;height: 1px;position: absolute;left: -1px;top: 41px; background-color: black',
            id: this.target.id + '_Preview_Div_Horizontal',
            className: 'e-de-border-dlg-preview-inside-divs'
        });
        this.previewDivVerticalContainer = createElement('div');
        this.previewDivTopTopContainer = createElement('div', {
            styles: 'margin-top: 0',
            className: 'e-de-table-border-icon-container',
            id: this.target.id + '_Preview_Div_TopTop_Container'
        });
        this.previewDivTopTop = createElement('div', {
            id: this.target.id + '_Preview_Div_TopTop',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivTopCenterContainer = createElement('div', {
            className: 'e-de-table-border-icon-container',
            id: this.target.id + '_Preview_Div_TopCenter_Container'
        });
        this.previewDivTopCenter = createElement('div', {
            id: this.target.id + '_Preview_Div_TopCenter',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivTopBottomContainer = createElement('div', {
            className: 'e-de-table-border-icon-container',
            id: this.target.id + '_Preview_Div_TopBottom_Container'
        });
        this.previewDivTopBottom = createElement('div', {
            id: this.target.id + '_Preview_Div_TopBottom',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivLeftDiagonalContainer = createElement('div', {
            className: 'e-de-table-border-icon-container',
            id: this.target.id + '_Preview_Div_LeftDiagonal_Container'
        });
        this.previewDivLeftDiagonal = createElement('div', {
            id: this.target.id + '_Preview_Div_LeftDiagonal',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivHorizontalContainer = createElement('div', { className: 'e-de-dlg-row' });
        this.previewDivBottomLeftContainer = createElement('div', {
            id: this.target.id + '_Preview_Div_BottomLeft_Container',
            className: 'e-de-table-border-icon-container'
        });
        this.previewDivBottomLeft = createElement('div', {
            id: this.target.id + '_Preview_Div_BottomLeft',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivBottomcenterContainer = createElement('div', {
            id: this.target.id + '_Preview_Div_BottomCenter_Container',
            className: 'e-de-table-border-icon-container'
        });
        this.previewDivBottomcenter = createElement('div', {
            id: this.target.id + '_Preview_Div_BottomCenter',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivBottomRightContainer = createElement('div', {
            id: this.target.id + '_Preview_Div_BottomRight_Container',
            className: 'e-de-table-border-icon-container'
        });
        this.previewDivBottomRight = createElement('div', {
            id: this.target.id + '_Preview_Div_BottomRight',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivDiagonalRightContainer = createElement('div', {
            className: 'e-de-table-border-icon-container',
            id: this.target.id + '_Preview_Div_RightDiagonal_Container'
        });
        this.previewDivDiagonalRight = createElement('div', {
            id: this.target.id + '_Preview_Div_RightDiagonal',
            className: 'e-de-table-border-inside-preview e-de-table-border-preview-genral'
        });
        this.previewDivTopTopTransParent = createElement('div', {
            id: this.target.id + '_previewDivTopTopTransParent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-toptop-alignment'
        });
        this.previewDivTopCenterTransParent = createElement('div', {
            id: this.target.id + '_previewDivTopCenterTransParent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-topcenter-alignment'
        });
        this.previewDivTopBottomTransParent = createElement('div', {
            id: this.target.id + '_previewDivTopBottomTransParent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-topbottom-alignment'
        });
        this.previewDivLeftDiagonalTransParent = createElement('div', {
            id: this.target.id + '_previewDivLeftDiagonalTransParent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-diagionalup-alignment'
        });
        this.previewDivBottomLeftTransparent = createElement('div', {
            id: this.target.id + '_previewDivBottomLeftTransparent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-bottomleft-alignment'
        });
        this.previewDivBottomcenterTransparent = createElement('div', {
            id: this.target.id + '_previewDivBottomcenterTransparent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-bottomcenter-alignment'
        });
        this.previewDivBottomRightTransparent = createElement('div', {
            id: this.target.id + '_previewDivBottomRightTransparent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-bottomright-alignment'
        });
        this.previewDivDiagonalRightTransparent = createElement('div', {
            id: this.target.id + '_previewDivDiagonalRightTransparent',
            className: 'e-icons e-de-table-border-preview e-de-table-border-diagionaldown-alignment'
        });
        this.shadingContiner = createElement('div', {});
        this.shadingText = createElement('div', {
            innerHTML: localeValue.getConstant('Shading'), className: 'e-de-table-border-heading'
        });
        this.shadings = createElement('div', { className: 'e-de-dlg-row' });
        this.colorPickerDiv = createElement('div', { className: 'e-de-table-border-clr-left-container' });
        this.label = createElement('div', {
            innerHTML: localeValue.getConstant('Fill'), className: 'e-de-table-border-clr-heading'
        });
        this.shadingColorPickerElement = createElement('input', {
            attrs: { 'type': 'color' },
            id: this.target.id + '_shading_color'
        });
        this.shdApply = createElement('div', {
            className: 'e-de-subcontainer-right'
        });
        var ulelementShading = createElement('input', {
            id: this.target.id + '_shading'
        });
        var ulelementShadingValue = [
            { Value: 'Cell', Name: localeValue.getConstant('Cell ') },
            { Value: 'Table', Name: localeValue.getConstant('Table') },
            { Value: 'Paragraph', Name: localeValue.getConstant('Paragraph') }
        ];
        this.shdApply.appendChild(ulelementShading);
        this.noneDiv.appendChild(this.noneDivTransparent);
        this.boxDiv.appendChild(this.boxDivTransparent);
        this.allDiv.appendChild(this.allDivTransparent);
        this.customDiv.appendChild(this.customDivTransparent);
        this.noneDivContainer.appendChild(this.noneDiv);
        this.noneDivContainer.appendChild(this.noneDivLabel);
        this.boxDivContainer.appendChild(this.boxDiv);
        this.boxDivContainer.appendChild(this.boxDivLabel);
        this.allDivContainer.appendChild(this.allDiv);
        this.allDivContainer.appendChild(this.allDivLabel);
        this.customDivContainer.appendChild(this.customDiv);
        this.customDivContainer.appendChild(this.customDivLabel);
        this.settingsContiner.appendChild(this.settingText);
        this.settingsContiner.appendChild(this.settingsSubContiner);
        this.settingsSubContiner.appendChild(this.noneDivContainer);
        this.settingsSubContiner.appendChild(this.boxDivContainer);
        this.settingsSubContiner.appendChild(this.allDivContainer);
        this.settingsSubContiner.appendChild(this.customDivContainer);
        this.previewDivBottomcenter.appendChild(this.previewDivBottomcenterTransparent);
        this.previewDivBottomRight.appendChild(this.previewDivBottomRightTransparent);
        this.previewDivBottomLeft.appendChild(this.previewDivBottomLeftTransparent);
        this.previewDivTopTop.appendChild(this.previewDivTopTopTransParent);
        this.previewDivTopCenter.appendChild(this.previewDivTopCenterTransParent);
        this.previewDivTopBottom.appendChild(this.previewDivTopBottomTransParent);
        this.previewDivDiagonalRight.appendChild(this.previewDivDiagonalRightTransparent);
        this.previewDivLeftDiagonal.appendChild(this.previewDivLeftDiagonalTransParent);
        this.previewDivBottomcenterContainer.appendChild(this.previewDivBottomcenter);
        this.previewDivBottomLeftContainer.appendChild(this.previewDivBottomLeft);
        this.previewDivBottomRightContainer.appendChild(this.previewDivBottomRight);
        this.previewDivDiagonalRightContainer.appendChild(this.previewDivDiagonalRight);
        this.previewDivLeftDiagonalContainer.appendChild(this.previewDivLeftDiagonal);
        this.previewDivTopBottomContainer.appendChild(this.previewDivTopBottom);
        this.previewDivTopCenterContainer.appendChild(this.previewDivTopCenter);
        this.previewDivTopTopContainer.appendChild(this.previewDivTopTop);
        this.previewContiner.appendChild(this.previewText);
        this.previewContiner.appendChild(this.previewSubContainer1);
        this.previewSubContainer1.appendChild(this.previewDivVerticalContainer);
        this.previewSubContainer1.appendChild(this.previewSubContainer2);
        this.previewSubContainer2.appendChild(this.previewDiv);
        this.previewSubContainer2.appendChild(this.previewDivHorizontalContainer);
        this.previewDiv.appendChild(this.previewLeftDiagonalDiv);
        this.previewDiv.appendChild(this.previewRightDiagonalDiv);
        this.previewDiv.appendChild(this.previewHorizontalDiv);
        this.previewDiv.appendChild(this.previewVerticalDiv);
        this.previewDivHorizontalContainer.appendChild(this.previewDivBottomLeftContainer);
        this.previewDivHorizontalContainer.appendChild(this.previewDivBottomcenterContainer);
        this.previewDivHorizontalContainer.appendChild(this.previewDivBottomRightContainer);
        this.previewDivHorizontalContainer.appendChild(this.previewDivDiagonalRightContainer);
        this.previewDivVerticalContainer.appendChild(this.previewDivTopTopContainer);
        this.previewDivVerticalContainer.appendChild(this.previewDivTopCenterContainer);
        this.previewDivVerticalContainer.appendChild(this.previewDivTopBottomContainer);
        this.previewDivVerticalContainer.appendChild(this.previewDivLeftDiagonalContainer);
        this.shadings.appendChild(this.colorPickerDiv);
        this.colorPickerDiv.appendChild(this.label);
        this.colorPickerDiv.appendChild(this.shadingColorPickerElement);
        this.shadings.appendChild(this.shdApply);
        this.shadingContiner.appendChild(this.shadingText);
        this.shadingContiner.appendChild(this.shadings);
        this.styleContainer.appendChild(this.styleSubContainer);
        this.styleSubContainer.appendChild(this.dropdownListDiv);
        this.dropdownListDiv.appendChild(this.dropDownList);
        this.styleContainer.appendChild(this.widthcontainerDiv);
        this.widthcontainerDiv.appendChild(this.widthNumericDiv);
        this.widthNumericDiv.appendChild(this.widthNumeric);
        this.widthcontainerDiv.appendChild(this.colorDiv);
        this.colorDiv.appendChild(this.colorText);
        this.colorDiv.appendChild(this.borderColorPickerElement);
        this.borderColorPickerElement.setAttribute('aria-label', this.colorText.innerHTML);
        this.settingAndPreviewContainer.appendChild(this.settingsContiner);
        this.settingAndPreviewContainer.appendChild(this.previewContiner);
        this.target.appendChild(this.displayText);
        this.target.appendChild(this.settingAndPreviewContainer);
        this.target.appendChild(this.styleContainer);
        this.target.appendChild(this.shadingContiner);
        // Handling Setting Container
        this.noneDivContainer.addEventListener('click', this.handleSettingCheckBoxActionHandler);
        this.boxDivContainer.addEventListener('click', this.handleSettingCheckBoxActionHandler);
        this.allDivContainer.addEventListener('click', this.handleSettingCheckBoxActionHandler);
        this.customDivContainer.addEventListener('click', this.handleSettingCheckBoxActionHandler);
        // Handling Preview Div Container
        this.previewDivBottomcenterContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        this.previewDivBottomLeftContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        this.previewDivBottomRightContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        this.previewDivTopTopContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        this.previewDivTopBottomContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        this.previewDivTopCenterContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        this.previewDivDiagonalRightContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        this.previewDivLeftDiagonalContainer.addEventListener('click', this.handlePreviewCheckBoxActionHandler);
        // handling dropdown change
        this.borderWidth = new NumericTextBox({
            value: 0.5, min: 0.25, max: 6, decimals: 2, step: 0.25,
            floatLabelType: 'Always', placeholder: localeValue.getConstant('Width'),
            enablePersistence: false
        });
        this.borderWidth.appendTo(this.widthNumeric);
        var empList = [
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5.5H98" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'Single' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5.5H98" stroke-linejoin="round" stroke-dasharray="1 1"/></svg></div>', 'LineStyle': 'Dot' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1347_1852)"><path d="M3.05176e-05 5.5H98" stroke-linejoin="round" stroke-dasharray="4 1"/></g><defs><clipPath id="clip0_1347_1852"><rect width="98" height="10" fill="white"/></clipPath></defs></svg></div>', 'LineStyle': 'DashSmallGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5.5H98" stroke-linejoin="round" stroke-dasharray="4 4"/></svg></div>', 'LineStyle': 'DashLargeGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5.5H98" stroke-linejoin="round" stroke-dasharray="7 3 3 3"/></svg></div>', 'LineStyle': 'DashDot' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4.5H98" stroke-linejoin="round" stroke-dasharray="6 2 2 2 2 2"/></svg></div>', 'LineStyle': 'DashDotDot' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.5H98" stroke-linejoin="round"/><path d="M0 5.5H98" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'Double' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5.5H98" stroke-linejoin="round"/><path d="M0 3.5H98" stroke-linejoin="round"/><path d="M0 7.5H98" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'Triple' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 4H98" stroke-width="4" stroke-linejoin="round"/><path d="M0 4H98" stroke-width="4" stroke-linejoin="round"/><path d="M0 7.5H98" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'ThinThickSmallGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 6H98" stroke-width="4" stroke-linejoin="round"/><path d="M0 2.5H98" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'ThickThinSmallGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5H98" stroke-width="4" stroke-linejoin="round"/><path d="M0 1.5H98" stroke-linejoin="round"/><path d="M0 8.5H98" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'ThinThickThinSmallGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3H98" stroke-width="4" stroke-linejoin="round"/><path d="M0 8H98" stroke-width="2" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'ThickThinMediumGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 7H98" stroke-width="4" stroke-linejoin="round"/><path d="M0 2H98" stroke-width="2" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'ThinThickMediumGap' },
            { 'Svg': '<div class="e-de-svg-border-fill-color"><svg style="width:98%;" height="23" viewBox="0 0 98 23" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M98 8H0V9H98V8ZM98 10H0V14H98V10ZM0 15H98V16H0V15Z" /></svg></div>', 'LineStyle': 'ThinThickThinMediumGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 8.5H98" stroke-linejoin="round"/><path d="M0 3H98" stroke-width="2" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'ThinThickLargeGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.5H98" stroke-linejoin="round"/><path d="M0 8H98" stroke-width="2" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'ThickThinLargeGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1347_1892)"><g clip-path="url(#clip0_1407_5)"><path d="M0 0.5H98" stroke-linejoin="round"/><path d="M0 9.5H98" stroke-linejoin="round"/><path d="M0 5H98" stroke-width="2" stroke-linejoin="round"/></g><defs><clipPath id="clip0_1407_5"><rect width="98" height="10" fill="white"/></clipPath></defs></svg></div>', 'LineStyle': 'ThinThickThinLargeGap' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 3H5V4H3V3ZM2 5V4H3V5H2ZM1 6V5H2V6H1ZM1 6V7H0V6H1ZM6 5H5V4H6V5ZM7 6H6V5H7V6ZM9 6V7H7V6H9ZM10 5V6H9V5H10ZM11 4V5H10V4H11ZM13 4H11V3H13V4ZM14 5H13V4H14V5ZM15 6H14V5H15V6ZM17 6V7H15V6H17ZM18 5V6H17V5H18ZM19 4V5H18V4H19ZM21 4H19V3H21V4ZM22 5H21V4H22V5ZM23 6H22V5H23V6ZM25 6V7H23V6H25ZM26 5V6H25V5H26ZM27 4V5H26V4H27ZM29 4H27V3H29V4ZM30 5H29V4H30V5ZM31 6H30V5H31V6ZM33 6V7H31V6H33ZM34 5V6H33V5H34ZM35 4V5H34V4H35ZM37 4H35V3H37V4ZM38 5H37V4H38V5ZM39 6H38V5H39V6ZM41 6V7H39V6H41ZM42 5V6H41V5H42ZM43 4V5H42V4H43ZM45 4H43V3H45V4ZM46 5H45V4H46V5ZM47 6H46V5H47V6ZM49 6V7H47V6H49ZM50 5V6H49V5H50ZM51 4V5H50V4H51ZM53 4H51V3H53V4ZM54 5H53V4H54V5ZM55 6H54V5H55V6ZM57 6V7H55V6H57ZM58 5V6H57V5H58ZM59 4V5H58V4H59ZM61 4H59V3H61V4ZM62 5H61V4H62V5ZM63 6H62V5H63V6ZM65 6V7H63V6H65ZM66 5V6H65V5H66ZM67 4V5H66V4H67ZM69 4H67V3H69V4ZM70 5H69V4H70V5ZM71 6H70V5H71V6ZM73 6V7H71V6H73ZM74 5V6H73V5H74ZM75 4V5H74V4H75ZM77 4H75V3H77V4ZM78 5H77V4H78V5ZM79 6H78V5H79V6ZM81 6V7H79V6H81ZM82 5V6H81V5H82ZM83 4V5H82V4H83ZM85 4H83V3H85V4ZM86 5H85V4H86V5ZM87 6H86V5H87V6ZM89 6V7H87V6H89ZM90 5V6H89V5H90ZM91 4V5H90V4H91ZM93 4H91V3H93V4ZM94 5H93V4H94V5ZM95 6V5H94V6H95ZM95 6V7H97V6H95Z" fill="black"/></svg></div>', 'LineStyle': 'SingleWavy' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M3 2H5V3H3V2ZM2 4V3H3V4H2ZM2 4V5H1V4H2ZM6 4H5V3H6V4ZM9 4V5H6V4H9ZM10 3V4H9V3H10ZM12 3H10V2H12V3ZM13 4H12V3H13V4ZM16 4V5H13V4H16ZM17 3V4H16V3H17ZM19 3H17V2H19V3ZM20 4H19V3H20V4ZM23 4V5H20V4H23ZM24 3V4H23V3H24ZM26 3H24V2H26V3ZM27 4H26V3H27V4ZM30 4V5H27V4H30ZM31 3V4H30V3H31ZM33 3H31V2H33V3ZM34 4H33V3H34V4ZM37 4V5H34V4H37ZM38 3V4H37V3H38ZM40 3H38V2H40V3ZM41 4H40V3H41V4ZM44 4V5H41V4H44ZM45 3V4H44V3H45ZM47 3H45V2H47V3ZM48 4H47V3H48V4ZM51 4V5H48V4H51ZM52 3V4H51V3H52ZM54 3H52V2H54V3ZM55 4H54V3H55V4ZM58 4V5H55V4H58ZM59 3V4H58V3H59ZM61 3H59V2H61V3ZM62 4H61V3H62V4ZM65 4V5H62V4H65ZM66 3V4H65V3H66ZM68 3H66V2H68V3ZM69 4H68V3H69V4ZM72 4V5H69V4H72ZM73 3V4H72V3H73ZM75 3H73V2H75V3ZM76 4H75V3H76V4ZM79 4V5H76V4H79ZM80 3V4H79V3H80ZM82 3H80V2H82V3ZM83 4H82V3H83V4ZM86 4V5H83V4H86ZM87 3V4H86V3H87ZM89 3H87V2H89V3ZM90 4H89V3H90V4ZM93 4V5H90V4H93ZM94 3V4H93V3H94ZM96 3H94V2H96V3ZM96 3H97V4H96V3ZM2 7H1V8H2V7ZM3 6H2V7H3V6ZM5 6H3V5H5V6ZM6 7H5V6H6V7ZM9 7V8H6V7H9ZM10 6V7H9V6H10ZM12 6H10V5H12V6ZM13 7H12V6H13V7ZM16 7H13V8H16V7ZM17 6H16V7H17V6ZM19 6V5H17V6H19ZM20 7V6H19V7H20ZM23 7H20V8H23V7ZM24 6H23V7H24V6ZM26 6V5H24V6H26ZM27 7V6H26V7H27ZM30 7V8H27V7H30ZM31 6V7H30V6H31ZM33 6H31V5H33V6ZM34 7H33V6H34V7ZM37 7V8H34V7H37ZM38 6V7H37V6H38ZM40 6H38V5H40V6ZM41 7H40V6H41V7ZM44 7H41V8H44V7ZM45 6H44V7H45V6ZM47 6V5H45V6H47ZM48 7V6H47V7H48ZM51 7H48V8H51V7ZM52 6H51V7H52V6ZM54 6V5H52V6H54ZM55 7V6H54V7H55ZM58 7V8H55V7H58ZM59 6V7H58V6H59ZM61 6H59V5H61V6ZM62 7H61V6H62V7ZM65 7V8H62V7H65ZM66 6V7H65V6H66ZM68 6H66V5H68V6ZM69 7H68V6H69V7ZM72 7H69V8H72V7ZM73 6H72V7H73V6ZM75 6V5H73V6H75ZM76 7V6H75V7H76ZM79 7H76V8H79V7ZM80 6H79V7H80V6ZM82 6V5H80V6H82ZM83 7V6H82V7H83ZM86 7V8H83V7H86ZM87 6V7H86V6H87ZM89 6H87V5H89V6ZM90 7H89V6H90V7ZM93 7V8H90V7H93ZM94 6V7H93V6H94ZM96 6H94V5H96V6ZM96 6V7H97V6H96Z" fill="black"/></svg></div>', 'LineStyle': 'DoubleWavy' },
            { 'Svg': '<div class="e-de-svg-border-fill-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 3H4V4H3V5H2V6H1V7H0V3ZM3 6V5H4V6H3ZM5 5V6H4V7H9V6H10V7H11V6H12V7H17V6H18V7H19V6H20V7H25V6H26V7H27V6H28V7H33V6H34V7H35V6H36V7H41V6H42V7H43V6H44V7H49V6H50V7H51V6H52V7H57V6H58V7H59V6H60V7H65V6H66V7H67V6H68V7H73V6H74V7H75V6H76V7H81V6H82V7H83V6H84V7H89V6H90V7H91V6H92V7H97V6H98V5V3H95V4H94V3H93V4H92V3H87V4H86V3H85V4H84V3H79V4H78V3H77V4H76V3H71V4H70V3H69V4H68V3H63V4H62V3H61V4H60V3H55V4H54V3H53V4H52V3H47V4H46V3H45V4H44V3H39V4H38V3H37V4H36V3H31V4H30V3H29V4H28V3H23V4H22V3H21V4H20V3H15V4H14V3H13V4H12V3H7V4H6V3H5V4H4V5H5ZM5 5H6V4H5V5ZM12 5V4H11V5H10V6H11V5H12ZM13 5V6H12V5H13ZM13 5V4H14V5H13ZM20 5V4H19V5H18V6H19V5H20ZM21 5H22V4H21V5ZM21 5H20V6H21V5ZM28 5V4H27V5H26V6H27V5H28ZM29 5V6H28V5H29ZM29 5H30V4H29V5ZM36 5V4H35V5H34V6H35V5H36ZM37 5V4H38V5H37ZM37 5H36V6H37V5ZM44 5V4H43V5H42V6H43V5H44ZM45 5V6H44V5H45ZM45 5V4H46V5H45ZM52 5V4H51V5H50V6H51V5H52ZM53 5H54V4H53V5ZM53 5H52V6H53V5ZM60 5V4H59V5H58V6H59V5H60ZM61 5V6H60V5H61ZM61 5H62V4H61V5ZM68 5V4H67V5H66V6H67V5H68ZM69 5V4H70V5H69ZM69 5H68V6H69V5ZM76 5V4H75V5H74V6H75V5H76ZM77 5V6H76V5H77ZM77 5V4H78V5H77ZM84 5V4H83V5H82V6H83V5H84ZM85 5H86V4H85V5ZM85 5H84V6H85V5ZM92 5V4H91V5H90V6H91V5H92ZM93 5V6H92V5H93ZM93 5H94V4H93V5ZM3 6H2V7H3V6Z" /></svg></div>', 'LineStyle': 'DashDotStroked' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 8H98" stroke-width="2" stroke-linejoin="round"/><path d="M0 5H98" stroke="#808080" stroke-width="4" stroke-linejoin="round"/><path d="M0 2H98" stroke="#C0C0C0" stroke-width="2" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'Emboss3D' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 2H98" stroke-width="2" stroke-linejoin="round"/><path d="M0 5H98" stroke="#808080" stroke-width="4" stroke-linejoin="round"/><path d="M0 8H98" stroke="#C0C0C0" stroke-width="2" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'Engrave3D' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.5H98" stroke="#A0A0A0" stroke-linejoin="round"/><path d="M0 8.5H98" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'Outset' },
            { 'Svg': '<div class="e-de-svg-border-color"><svg style="width:98%;" height="10" viewBox="0 0 98 10" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.5H98" stroke-linejoin="round"/><path d="M0 8.5H98" stroke="#A0A0A0" stroke-linejoin="round"/></svg></div>', 'LineStyle': 'Inset' }
        ];
        this.widthNumeric.setAttribute('aria-labelledby', localeValue.getConstant('width'));
        var itemTemplate = initializeCSPTemplate(function (data) { return "<div>" + data.Svg + "</div>"; });
        this.borderStyle = new DropDownList({
            popupHeight: '150px', dataSource: empList,
            floatLabelType: 'Always',
            fields: { text: 'Svg', value: 'LineStyle' },
            itemTemplate: itemTemplate,
            valueTemplate: itemTemplate,
            placeholder: localeValue.getConstant('Style'),
            enableRtl: isRtl
        });
        this.borderStyle.appendTo(this.dropDownList);
        this.dropDownList.setAttribute('aria-lablledby', localeValue.getConstant('Style'));
        this.ulelementShading = new DropDownList({
            dataSource: ulelementShadingValue,
            fields: { text: 'Name', value: 'Value' },
            change: this.applyTableCellPreviewBoxes, index: 1,
            floatLabelType: 'Always', placeholder: localeValue.getConstant('Apply To'),
            enableRtl: isRtl,
            htmlAttributes: { 'aria-labelledby': localeValue.getConstant('Apply To') }
        });
        this.ulelementShading.appendTo(ulelementShading);
        var _a = this.documentHelper.owner.documentEditorSettings.colorPickerSettings, columns = _a.columns, createPopupOnClick = _a.createPopupOnClick, cssClass = _a.cssClass, disabled = _a.disabled, enablePersistence = _a.enablePersistence, inline = _a.inline, mode = _a.mode, modeSwitcher = _a.modeSwitcher, noColor = _a.noColor, presetColors = _a.presetColors, showButtons = _a.showButtons;
        this.borderColorPicker = new ColorPicker({
            value: '#000000', change: this.applyPreviewTableBorderColor,
            enableRtl: isRtl, locale: this.documentHelper.owner.locale, cssClass: 'e-de-dlg-clr-picker',
            enableOpacity: false,
            mode: mode, modeSwitcher: modeSwitcher, showButtons: showButtons, columns: columns,
            createPopupOnClick: createPopupOnClick, disabled: disabled,
            enablePersistence: enablePersistence, inline: inline, noColor: noColor, presetColors: presetColors
        });
        this.documentHelper.borderColorPicker = this.borderColorPicker;
        this.borderColorPicker.appendTo(this.borderColorPickerElement);
        this.shadingColorPicker = new ColorPicker({
            value: '#FFFFFF', change: this.applyPreviewTableBackgroundColor,
            enableRtl: isRtl, locale: this.documentHelper.owner.locale, cssClass: 'e-de-dlg-clr-picker',
            enableOpacity: false,
            mode: mode, modeSwitcher: modeSwitcher, showButtons: showButtons, columns: columns,
            createPopupOnClick: createPopupOnClick, disabled: disabled,
            enablePersistence: enablePersistence, inline: inline, noColor: noColor, presetColors: presetColors
        });
        this.documentHelper.shadingColorPicker = this.shadingColorPicker;
        this.shadingColorPicker.appendTo(this.shadingColorPickerElement);
        if (isRtl) {
            this.label.classList.add('e-de-rtl');
        }
    };
    BordersAndShadingDialog.prototype.updateBorder = function (tableBorder, rowBorder) {
        if (rowBorder.lineStyle === 'Single' && tableBorder.lineStyle === 'None') {
            tableBorder.lineStyle = 'Single';
            tableBorder.lineWidth = rowBorder.lineWidth;
        }
    };
    BordersAndShadingDialog.prototype.applyFormat = function () {
        // const selection: Selection = this.documentHelper.selection;
        var editorModule = this.documentHelper.owner.editorModule;
        if (this.ulelementShading.value !== 'Paragraph') {
            editorModule.initComplexHistory('BordersAndShading');
            editorModule.isBordersAndShadingDialog = true;
            if (this.ulelementShading.value === 'Cell') {
                editorModule.onCellFormat(this.cellFormat);
            }
            else if (this.ulelementShading.value === 'Table') {
                editorModule.onTableFormat(this.tableFormat, true);
            }
            if (!isNullOrUndefined(this.documentHelper.owner.editorHistoryModule.currentHistoryInfo)) {
                this.documentHelper.owner.editorHistoryModule.updateComplexHistory();
            }
            if (this.ulelementShading.value === 'Cell') {
                editorModule.isCellFormatApplied = true;
            }
            else {
                editorModule.isCellFormatApplied = false;
            }
        }
        if (this.ulelementShading.value === 'Cell') {
            editorModule.isCellFormatApplied = true;
        }
        else {
            editorModule.isCellFormatApplied = false;
        }
        editorModule.isBordersAndShadingDialog = false;
    };
    BordersAndShadingDialog.prototype.getBorder = function (type) {
        var border = new WBorder();
        border.color = this.borderColorPicker.value;
        border.lineStyle = this.borderStyle.value;
        border.lineWidth = this.borderWidth.value;
        if (type === 'left' || type === 'right') {
            border.space = 4;
        }
        else {
            border.space = 1;
        }
        return border;
    };
    BordersAndShadingDialog.prototype.checkClassName = function (element) {
        return element.classList.contains('e-de-table-border-inside-preview-click');
    };
    /**
     * @private
     * @returns {void}
     */
    BordersAndShadingDialog.prototype.show = function () {
        var localeValue = new L10n('documenteditor', this.documentHelper.owner.defaultLocale);
        localeValue.setLocale(this.documentHelper.owner.locale);
        if (!this.target) {
            this.initBordersAndShadingsDialog(localeValue, this.documentHelper.owner.enableRtl);
        }
        this.loadBordersShadingsPropertiesDialog(localeValue);
        this.documentHelper.dialog.content = this.target;
        this.documentHelper.dialog.header = localeValue.getConstant('Borders and Shading');
        this.documentHelper.dialog.beforeOpen = this.documentHelper.updateFocus;
        this.documentHelper.dialog.close = this.closeBordersShadingsDialog;
        this.documentHelper.dialog.position = { X: 'center', Y: 'center' };
        this.documentHelper.dialog.width = 'auto';
        this.documentHelper.dialog.height = 'auto';
        this.documentHelper.dialog.buttons = [{
                click: this.applyBordersShadingsProperties,
                buttonModel: { content: localeValue.getConstant('Ok'), cssClass: 'e-flat e-table-border-shading-okay', isPrimary: true }
            },
            {
                click: this.closeDialog,
                buttonModel: { content: localeValue.getConstant('Cancel'), cssClass: 'e-flat e-table-border-shading-cancel' }
            }];
        this.documentHelper.dialog.dataBind();
        this.documentHelper.dialog.show();
    };
    BordersAndShadingDialog.prototype.onhandleSettingCheckBoxActionClicked = function (event) {
        this.handleSettingCheckBoxAction(event);
    };
    BordersAndShadingDialog.prototype.onhandlePreviewCheckBoxActionClicked = function (event) {
        this.handlePreviewCheckBoxAction(event);
    };
    BordersAndShadingDialog.prototype.updateClassForSettingDivElements = function () {
        var settingDivs = this.target.getElementsByClassName('e-de-table-border-inside-setting');
        for (var j = 0; j < settingDivs.length; j++) {
            if (settingDivs[parseInt(j.toString(), 10)].className.indexOf('e-de-table-border-inside-setting-click') !== -1) {
                var tempClassName = settingDivs[parseInt(j.toString(), 10)].className;
                tempClassName = tempClassName.replace('e-de-table-border-inside-setting-click', '');
                settingDivs[parseInt(j.toString(), 10)].className = tempClassName;
            }
        }
    };
    BordersAndShadingDialog.prototype.setSettingPreviewDivElement = function (position) {
        switch (position) {
            case 'none':
                this.previewDivTopTop.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivTopCenter.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivTopBottom.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivLeftDiagonal.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivDiagonalRight.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivBottomRight.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivBottomLeft.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivBottomcenter.classList.remove('e-de-table-border-inside-preview-click');
                this.isShowHidePreviewTableElements('none');
                break;
            case 'box':
                this.previewDivTopCenter.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivLeftDiagonal.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivDiagonalRight.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivBottomcenter.classList.remove('e-de-table-border-inside-preview-click');
                this.previewDivTopTop.classList.add('e-de-table-border-inside-preview-click');
                this.previewDivTopBottom.classList.add('e-de-table-border-inside-preview-click');
                this.previewDivBottomRight.classList.add('e-de-table-border-inside-preview-click');
                this.previewDivBottomLeft.classList.add('e-de-table-border-inside-preview-click');
                this.isShowHidePreviewTableElements('box');
                break;
            case 'all':
                if (this.ulelementShading.value === 'Cell' || this.ulelementShading.value === 'Table') {
                    this.previewDivLeftDiagonal.classList.remove('e-de-table-border-inside-preview-click');
                    this.previewDivDiagonalRight.classList.remove('e-de-table-border-inside-preview-click');
                    this.previewDivBottomcenter.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivTopTop.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivTopBottom.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivBottomRight.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivBottomLeft.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivTopCenter.classList.add('e-de-table-border-inside-preview-click');
                    this.isShowHidePreviewTableElements('all');
                }
                else {
                    this.previewDivLeftDiagonal.classList.remove('e-de-table-border-inside-preview-click');
                    this.previewDivDiagonalRight.classList.remove('e-de-table-border-inside-preview-click');
                    this.previewDivBottomcenter.classList.remove('e-de-table-border-inside-preview-click');
                    this.previewDivTopTop.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivTopBottom.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivBottomRight.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivBottomLeft.classList.add('e-de-table-border-inside-preview-click');
                    this.previewDivTopCenter.classList.remove('e-de-table-border-inside-preview-click');
                    this.isShowHidePreviewTableElements('all');
                }
                break;
        }
    };
    BordersAndShadingDialog.prototype.isShowHidePreviewTableElements = function (settingDiv) {
        switch (settingDiv) {
            case 'none':
                this.previewDiv.style.border = 'none';
                this.previewRightDiagonalDiv.style.display = 'none';
                this.previewLeftDiagonalDiv.style.display = 'none';
                this.previewHorizontalDiv.style.display = 'none';
                this.previewVerticalDiv.style.display = 'none';
                break;
            case 'box':
                this.previewDiv.style.border = '1px solid rgba(0, 0, 0, .54)';
                this.previewRightDiagonalDiv.style.display = 'none';
                this.previewLeftDiagonalDiv.style.display = 'none';
                this.previewHorizontalDiv.style.display = 'none';
                this.previewVerticalDiv.style.display = 'none';
                break;
            case 'all':
                if (this.ulelementShading.value === 'Cell' || this.ulelementShading.value === 'Table') {
                    this.previewDiv.style.border = '1px solid rgba(0, 0, 0, .54)';
                    this.previewRightDiagonalDiv.style.display = 'none';
                    this.previewLeftDiagonalDiv.style.display = 'none';
                    this.previewHorizontalDiv.style.display = 'block';
                    this.previewVerticalDiv.style.display = 'block';
                }
                else {
                    this.previewDiv.style.border = '1px solid rgba(0, 0, 0, .54)';
                    this.previewRightDiagonalDiv.style.display = 'none';
                    this.previewLeftDiagonalDiv.style.display = 'none';
                    this.previewHorizontalDiv.style.display = 'none';
                    this.previewVerticalDiv.style.display = 'none';
                }
                break;
        }
    };
    BordersAndShadingDialog.prototype.handlePreviewCheckBoxShowHide = function (tableBorderDialogId, compareClass, element) {
        if (element.classList.contains(compareClass)) {
            element.classList.remove(compareClass);
        }
        else {
            element.classList.add(compareClass);
        }
    };
    BordersAndShadingDialog.prototype.showHidePreviewDivElements = function (tableBorderDialogId, compareClass, elementClass, compareElementClass, position) {
        var setElement = document.getElementById(tableBorderDialogId + elementClass);
        var compareElement = document.getElementById(tableBorderDialogId + compareElementClass);
        if (position === 'TopTop') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'border-top');
        }
        else if (position === 'TopCenter') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'display');
        }
        else if (position === 'TopBottom') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'border-bottom');
        }
        else if (position === 'LeftDiagonal') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'display');
        }
        else if (position === 'BottomLeft') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'border-left');
        }
        else if (position === 'BottomCenter') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'display');
        }
        else if (position === 'BottomRight') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'border-right');
        }
        else if (position === 'RightDiagonal') {
            this.setPropertyPreviewDivElement(setElement, compareElement, compareClass, 'display');
        }
    };
    BordersAndShadingDialog.prototype.setPropertyPreviewDivElement = function (ele, compareElement, compareClass, property) {
        if (compareElement.classList.contains(compareClass) && property.split('-')[0] === 'border') {
            /* eslint-disable @typescript-eslint/no-explicit-any */
            ele.style["" + property] = '1px solid rgba(0, 0, 0, .54)';
        }
        else if (compareElement.classList.contains(compareClass) && property === 'display') {
            ele.style["" + property] = 'block';
        }
        else {
            ele.style["" + property] = 'none';
            /* eslint-enable @typescript-eslint/no-explicit-any */
        }
    };
    BordersAndShadingDialog.prototype.loadBordersShadingsPropertiesDialog = function (localeValue) {
        var lineStyle;
        var borderColor;
        var fillColor;
        var borderWidth;
        if (!isNullOrUndefined(this.documentHelper.selection.tableFormat.table)) {
            this.shadingContiner.style.display = 'block';
            this.ulelementShading.dataSource = [
                { Value: 'Cell', Name: localeValue.getConstant('Cell') },
                { Value: 'Table', Name: localeValue.getConstant('Table') },
                { Value: 'Paragraph', Name: localeValue.getConstant('Paragraph') }
            ];
            this.ulelementShading.dataBind();
            var tableFormat = this.documentHelper.selection.tableFormat.table.tableFormat;
            if (!isNullOrUndefined(tableFormat) && !isNullOrUndefined(tableFormat.borders)) {
                this.cloneBorders(tableFormat.borders);
                if (isNullOrUndefined(tableFormat.borders) || isNullOrUndefined(tableFormat.borders.top)) {
                    lineStyle = 0;
                    borderColor = '#000000';
                    borderWidth = 0;
                    fillColor = '#000000';
                }
                else {
                    lineStyle = this.getLineStyle(tableFormat.borders.top.lineStyle);
                    borderColor = tableFormat.borders.top.color;
                    borderWidth = tableFormat.borders.top.getLineWidth();
                    fillColor = tableFormat.shading.backgroundColor;
                }
                this.ulelementShading.value = 'Table';
                this.shadingColorPicker.value = fillColor;
                this.shadingColorPicker.disabled = false;
            }
        }
        else {
            this.shadingContiner.style.display = 'none';
            this.ulelementShading.dataSource = [
                { Value: 'Paragraph', Name: localeValue.getConstant('Paragraph') }
            ];
            this.ulelementShading.dataBind();
            var paraFormat = this.documentHelper.selection.start.paragraph.paragraphFormat;
            this.ulelementShading.value = 'Paragraph';
            this.cloneBorders(paraFormat.borders);
            var border = this.getSelectionBorderFormat();
            if (!border.hasValues()) {
                lineStyle = 0;
                borderColor = '#000000';
                borderWidth = 0.5;
            }
            else {
                lineStyle = this.getLineStyle(border.lineStyle);
                borderColor = border.color;
                borderWidth = border.lineWidth;
            }
            this.shadingColorPicker.disabled = true;
        }
        this.borderColorPicker.value = borderColor;
        this.previewDivLeftDiagonal.style.display = 'none';
        this.previewDivDiagonalRight.style.display = 'none';
        this.borderWidth.value = borderWidth;
        this.borderStyle.index = lineStyle;
    };
    BordersAndShadingDialog.prototype.getSelectionBorderFormat = function () {
        var border = new WBorder();
        var borders = this.documentHelper.selection.paragraphFormat.borders;
        if (borders.top.lineStyle !== 'None') {
            return this.copyToBorder(border, borders.top);
        }
        else if (borders.left.lineStyle !== 'None') {
            return this.copyToBorder(border, borders.left);
        }
        else if (borders.bottom.lineStyle !== 'None') {
            return this.copyToBorder(border, borders.bottom);
        }
        else if (borders.right.lineStyle !== 'None') {
            return this.copyToBorder(border, borders.right);
        }
        return border;
    };
    BordersAndShadingDialog.prototype.copyToBorder = function (border, selectionBorder) {
        if (!isNullOrUndefined(selectionBorder.lineStyle)) {
            border.lineStyle = selectionBorder.lineStyle;
        }
        if (!isNullOrUndefined(selectionBorder.color)) {
            border.color = selectionBorder.color;
        }
        if (!isNullOrUndefined(selectionBorder.lineWidth)) {
            border.lineWidth = selectionBorder.lineWidth;
        }
        return border;
    };
    /* eslint-disable  */
    BordersAndShadingDialog.prototype.cloneBorders = function (borders) {
        var topBorder = false;
        var bottomBorder = false;
        var leftBorder = false;
        var rightBorder = false;
        var horizontalBorder = false;
        var verticalBorder = false;
        var diagonalDownBorder = false;
        var customBorder = false;
        var diagonalUpBorder = false;
        if (borders !== null) {
            if (borders.top && (borders.top.hasNoneStyle || borders.top.lineStyle !== 'None')) {
                topBorder = true;
            }
            if (borders.bottom && (borders.bottom.hasNoneStyle || borders.bottom.lineStyle !== 'None')) {
                bottomBorder = true;
            }
            if (borders.left && (borders.left.hasNoneStyle || borders.left.lineStyle !== 'None')) {
                leftBorder = true;
            }
            if (borders.right && (borders.right.hasNoneStyle || borders.right.lineStyle !== 'None')) {
                rightBorder = true;
            }
            if (borders.horizontal && (borders.horizontal.hasNoneStyle || borders.horizontal.lineStyle !== 'None')) {
                horizontalBorder = true;
            }
            if (borders.vertical && (borders.vertical.hasNoneStyle || borders.vertical.lineStyle !== 'None')) {
                verticalBorder = true;
            }
            if (borders.diagonalDown && (borders.diagonalDown.hasNoneStyle || borders.diagonalDown.lineStyle !== 'None')) {
                diagonalDownBorder = true;
            }
            if (borders.diagonalUp && (borders.diagonalUp.hasNoneStyle || borders.diagonalUp.lineStyle !== 'None')) {
                diagonalUpBorder = true;
            }
            if (!(!topBorder || !bottomBorder || !leftBorder || !rightBorder)) {
                if (!(!topBorder || !bottomBorder || !leftBorder || !rightBorder || !horizontalBorder
                    || !verticalBorder || diagonalUpBorder || diagonalDownBorder)) {
                    if ((topBorder && bottomBorder && leftBorder && rightBorder && horizontalBorder && verticalBorder
                        && !diagonalUpBorder && !diagonalDownBorder)) {
                        if (borders.top.hasNoneStyle && borders.bottom.hasNoneStyle && borders.left.hasNoneStyle
                            && borders.right.hasNoneStyle && borders.horizontal.hasNoneStyle && borders.vertical.hasNoneStyle) {
                            this.setSettingPreviewDivElement('none');
                            this.customDiv.classList.remove('e-de-table-border-inside-setting-click');
                            this.noneDiv.classList.add('e-de-table-border-inside-setting-click');
                            this.boxDiv.classList.remove('e-de-table-border-inside-setting-click');
                            this.allDiv.classList.remove('e-de-table-border-inside-setting-click');
                        }
                        else {
                            this.setSettingPreviewDivElement('all');
                            this.allDiv.classList.add('e-de-table-border-inside-setting-click');
                            this.customDiv.classList.remove('e-de-table-border-inside-setting-click');
                            this.noneDiv.classList.remove('e-de-table-border-inside-setting-click');
                            this.boxDiv.classList.remove('e-de-table-border-inside-setting-click');
                        }
                    }
                }
                else if ((leftBorder && bottomBorder && topBorder && rightBorder && !horizontalBorder && !verticalBorder)) {
                    if (borders.top.hasNoneStyle && borders.bottom.hasNoneStyle && borders.left.hasNoneStyle
                        && borders.right.hasNoneStyle && borders.horizontal.hasNoneStyle && borders.vertical.hasNoneStyle) {
                        this.setSettingPreviewDivElement('none');
                        this.boxDiv.classList.remove('e-de-table-border-inside-setting-click');
                        this.allDiv.classList.remove('e-de-table-border-inside-setting-click');
                        this.customDiv.classList.remove('e-de-table-border-inside-setting-click');
                        this.noneDiv.classList.add('e-de-table-border-inside-setting-click');
                    }
                    else {
                        this.setSettingPreviewDivElement('box');
                        this.customDiv.classList.remove('e-de-table-border-inside-setting-click');
                        this.noneDiv.classList.remove('e-de-table-border-inside-setting-click');
                        this.boxDiv.classList.add('e-de-table-border-inside-setting-click');
                        this.allDiv.classList.remove('e-de-table-border-inside-setting-click');
                    }
                }
                else {
                    customBorder = true;
                }
            }
            else {
                customBorder = true;
            }
            this.previewDivLeftDiagonal.classList.remove('e-de-table-border-inside-preview-click');
            this.previewDivDiagonalRight.classList.remove('e-de-table-border-inside-preview-click');
            if (!topBorder && !bottomBorder && !leftBorder && !rightBorder && !horizontalBorder && !verticalBorder) {
                if (this.ulelementShading.value === 'Cell' || this.ulelementShading.value === 'Table') {
                    this.customDiv.classList.remove('e-de-table-border-inside-setting-click');
                    this.noneDiv.classList.add('e-de-table-border-inside-setting-click');
                    this.boxDiv.classList.remove('e-de-table-border-inside-setting-click');
                    this.allDiv.classList.remove('e-de-table-border-inside-setting-click');
                }
                else {
                    this.setSettingPreviewDivElement('none');
                    this.customDiv.classList.remove('e-de-table-border-inside-setting-click');
                    this.noneDiv.classList.add('e-de-table-border-inside-setting-click');
                    this.boxDiv.classList.remove('e-de-table-border-inside-setting-click');
                    this.allDiv.classList.remove('e-de-table-border-inside-setting-click');
                }
            }
            else if (customBorder) {
                this.customDiv.classList.add('e-de-table-border-inside-setting-click');
                this.noneDiv.classList.remove('e-de-table-border-inside-setting-click');
                this.boxDiv.classList.remove('e-de-table-border-inside-setting-click');
                this.allDiv.classList.remove('e-de-table-border-inside-setting-click');
                if (this.ulelementShading.value === 'Cell' || this.ulelementShading.value === 'Table') {
                    if (topBorder) {
                        this.previewDivTopTop.classList.add('e-de-table-border-inside-preview-click');
                    }
                    else {
                        this.previewDivTopTop.classList.remove('e-de-table-border-inside-preview-click');
                    }
                }
                else {
                    if (topBorder) {
                        this.previewDivTopTop.classList.add('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderTop = '1px solid rgba(0,0,0,.54)';
                    }
                    else {
                        this.previewDivTopTop.classList.remove('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderTop = '0px';
                    }
                }
                if (this.ulelementShading.value == 'Cell' || this.ulelementShading.value === 'Table') {
                    if (bottomBorder) {
                        this.previewDivTopBottom.classList.add('e-de-table-border-inside-preview-click');
                    }
                    else {
                        this.previewDivTopBottom.classList.remove('e-de-table-border-inside-preview-click');
                    }
                }
                else {
                    if (bottomBorder) {
                        this.previewDivTopBottom.classList.add('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderBottom = '1px solid rgba(0,0,0,.54)';
                    }
                    else {
                        this.previewDivTopBottom.classList.remove('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderBottom = '0px';
                    }
                }
                if (this.ulelementShading.value == 'Cell' || this.ulelementShading.value === 'Table') {
                    if (leftBorder) {
                        this.previewDivBottomLeft.classList.add('e-de-table-border-inside-preview-click');
                    }
                    else {
                        this.previewDivBottomLeft.classList.remove('e-de-table-border-inside-preview-click');
                    }
                }
                else {
                    if (leftBorder) {
                        this.previewDivBottomLeft.classList.add('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderLeft = '1px solid rgba(0,0,0,.54)';
                    }
                    else {
                        this.previewDivBottomLeft.classList.remove('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderLeft = '0px';
                    }
                }
                if (this.ulelementShading.value == 'Cell' || this.ulelementShading.value === 'Table') {
                    if (rightBorder) {
                        this.previewDivBottomRight.classList.add('e-de-table-border-inside-preview-click');
                    }
                    else {
                        this.previewDivBottomRight.classList.remove('e-de-table-border-inside-preview-click');
                    }
                }
                else {
                    if (rightBorder) {
                        this.previewDivBottomRight.classList.add('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderRight = '1px solid rgba(0,0,0,.54)';
                    }
                    else {
                        this.previewDivBottomRight.classList.remove('e-de-table-border-inside-preview-click');
                        this.previewDiv.style.borderRight = '0px';
                    }
                }
                if (verticalBorder) {
                    this.previewDivBottomcenter.classList.add('e-de-table-border-inside-preview-click');
                }
                else {
                    this.previewDivBottomcenter.classList.remove('e-de-table-border-inside-preview-click');
                }
                if (horizontalBorder) {
                    this.previewDivTopCenter.classList.add('e-de-table-border-inside-preview-click');
                }
                else {
                    this.previewDivTopCenter.classList.remove('e-de-table-border-inside-preview-click');
                }
            }
        }
    };
    BordersAndShadingDialog.prototype.getLineStyle = function (lineStyle) {
        switch (lineStyle) {
            case 'Single': return 0;
            case 'Dot': return 1;
            case 'DashSmallGap': return 2;
            case 'DashLargeGap': return 3;
            case 'DashDot': return 4;
            case 'DashDotDot': return 5;
            case 'Double': return 6;
            case 'Triple': return 7;
            case 'ThinThickSmallGap': return 8;
            case 'ThickThinSmallGap': return 9;
            case 'ThinThickThinSmallGap': return 10;
            case 'ThinThickMediumGap': return 11;
            case 'ThickThinMediumGap': return 12;
            case 'ThinThickThinMediumGap': return 13;
            case 'ThinThickLargeGap': return 14;
            case 'ThickThinLargeGap': return 15;
            case 'ThinThickThinLargeGap': return 16;
            case 'SingleWavy': return 17;
            case 'DoubleWavy': return 18;
            case 'DashDotStroked': return 29;
            case 'Emboss3D': return 20;
            case 'Engrave3D': return 21;
            case 'Outset': return 22;
            case 'Inset': return 23;
        }
        return 0;
    };
    /**
     * @private
     * @returns {void}
     */
    BordersAndShadingDialog.prototype.destroy = function () {
        if (!isNullOrUndefined(this.target)) {
            if (this.target.parentElement) {
                this.target.parentElement.removeChild(this.target);
            }
            for (var k = 0; k < this.target.childNodes.length; k++) {
                this.target.removeChild(this.target.childNodes[k]);
                k--;
            }
            this.target = undefined;
        }
        if (this.cellFormat) {
            this.cellFormat.destroy();
            this.cellFormat = undefined;
        }
        if (this.tableFormat) {
            this.tableFormat.destroy();
            this.tableFormat = undefined;
        }
        if (this.paragraphFormat) {
            this.paragraphFormat.destroy();
            this.paragraphFormat = undefined;
        }
        this.dialog = undefined;
        this.target = undefined;
        if (!isNullOrUndefined(this.borderStyle)) {
            this.borderStyle.destroy();
        }
        this.borderStyle = undefined;
        if (!isNullOrUndefined(this.borderColorPicker)) {
            this.borderColorPicker.destroy();
        }
        this.borderColorPicker = undefined;
        if (!isNullOrUndefined(this.shadingColorPicker)) {
            this.shadingColorPicker.destroy();
        }
        this.shadingColorPicker = undefined;
        if (!isNullOrUndefined(this.ulelementShading)) {
            this.ulelementShading.destroy();
        }
        this.removeEvents();
        this.removeElements();
        this.ulelementShading = undefined;
        this.noneDivTransparent = undefined;
        this.boxDivTransparent = undefined;
        this.allDivTransparent = undefined;
        this.customDivTransparent = undefined;
        this.previewDiv = undefined;
        this.previewRightDiagonalDiv = undefined;
        this.previewLeftDiagonalDiv = undefined;
        this.previewVerticalDiv = undefined;
        this.previewHorizontalDiv = undefined;
        this.previewDivTopTopContainer = undefined;
        this.previewDivTopTop = undefined;
        this.previewDivTopCenterContainer = undefined;
        this.previewDivTopCenter = undefined;
        this.previewDivTopBottomContainer = undefined;
        this.previewDivTopBottom = undefined;
        this.previewDivLeftDiagonalContainer = undefined;
        this.previewDivLeftDiagonal = undefined;
        this.previewDivBottomLeftContainer = undefined;
        this.previewDivBottomLeft = undefined;
        this.previewDivBottomcenterContainer = undefined;
        this.previewDivBottomcenter = undefined;
        this.previewDivBottomRightContainer = undefined;
        this.previewDivBottomRight = undefined;
        this.previewDivDiagonalRightContainer = undefined;
        this.previewDivDiagonalRight = undefined;
        this.previewDivTopTopTransParent = undefined;
        this.previewDivTopCenterTransParent = undefined;
        this.previewDivTopBottomTransParent = undefined;
        this.previewDivLeftDiagonalTransParent = undefined;
        this.previewDivBottomLeftTransparent = undefined;
        this.previewDivBottomcenterTransparent = undefined;
        this.previewDivBottomRightTransparent = undefined;
        this.previewDivDiagonalRightTransparent = undefined;
        this.shadingContiner = undefined;
        this.noneDiv = undefined;
        this.customDiv = undefined;
        this.allDiv = undefined;
        this.boxDiv = undefined;
        this.displayText = undefined;
        this.settingAndPreviewContainer = undefined;
        this.settingsContiner = undefined;
        this.styleContainer = undefined;
        this.previewContiner = undefined;
        this.previewSubContainer1 = undefined;
        this.previewSubContainer2 = undefined;
        this.styleSubContainer = undefined;
        this.dropdownListDiv = undefined;
        this.dropDownList = undefined;
        this.widthcontainerDiv = undefined;
        this.widthNumericDiv = undefined;
        this.widthNumeric = undefined;
        this.colorDiv = undefined;
        this.colorText = undefined;
        this.borderColorPickerElement = undefined;
        this.settingText = undefined;
        this.settingsSubContiner = undefined;
        this.noneDivContainer = undefined;
        this.noneDivLabel = undefined;
        this.boxDivContainer = undefined;
        this.boxDivLabel = undefined;
        this.allDivContainer = undefined;
        this.allDivLabel = undefined;
        this.customDivContainer = undefined;
        this.customDivLabel = undefined;
        this.previewDivHorizontalContainer = undefined;
        this.previewDivVerticalContainer = undefined;
        this.previewText = undefined;
        this.shadingText = undefined;
        this.shadings = undefined;
        this.colorPickerDiv = undefined;
        this.label = undefined;
        this.shadingColorPickerElement = undefined;
        this.shdApply = undefined;
        this.documentHelper = undefined;
    };
    BordersAndShadingDialog.prototype.removeEvents = function () {
        if (this.noneDivContainer) {
            this.noneDivContainer.removeEventListener('click', this.handleSettingCheckBoxActionHandler);
        }
        if (this.boxDivContainer) {
            this.boxDivContainer.removeEventListener('click', this.handleSettingCheckBoxActionHandler);
        }
        if (this.allDivContainer) {
            this.allDivContainer.removeEventListener('click', this.handleSettingCheckBoxActionHandler);
        }
        if (this.customDivContainer) {
            this.customDivContainer.removeEventListener('click', this.handleSettingCheckBoxActionHandler);
        }
        if (this.previewDivBottomcenterContainer) {
            this.previewDivBottomcenterContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
        if (this.previewDivBottomLeftContainer) {
            this.previewDivBottomLeftContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
        if (this.previewDivBottomRightContainer) {
            this.previewDivBottomRightContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
        if (this.previewDivTopBottomContainer) {
            this.previewDivTopBottomContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
        if (this.previewDivTopCenterContainer) {
            this.previewDivTopCenterContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
        if (this.previewDivTopTopContainer) {
            this.previewDivTopTopContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
        if (this.previewDivDiagonalRightContainer) {
            this.previewDivDiagonalRightContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
        if (this.previewDivLeftDiagonalContainer) {
            this.previewDivLeftDiagonalContainer.removeEventListener('click', this.handlePreviewCheckBoxActionHandler);
        }
    };
    BordersAndShadingDialog.prototype.removeElements = function () {
        if (this.noneDivTransparent) {
            this.noneDivTransparent.remove();
            this.noneDivTransparent = undefined;
        }
        if (this.boxDivTransparent) {
            this.boxDivTransparent.remove();
            this.boxDivTransparent = undefined;
        }
        if (this.allDivTransparent) {
            this.allDivTransparent.remove();
            this.allDivTransparent = undefined;
        }
        if (this.customDivTransparent) {
            this.customDivTransparent.remove();
            this.customDivTransparent = undefined;
        }
        if (this.previewDiv) {
            this.previewDiv.remove();
            this.previewDiv = undefined;
        }
        if (this.previewRightDiagonalDiv) {
            this.previewRightDiagonalDiv.remove();
            this.previewRightDiagonalDiv = undefined;
        }
        if (this.previewLeftDiagonalDiv) {
            this.previewLeftDiagonalDiv.remove();
            this.previewLeftDiagonalDiv = undefined;
        }
        if (this.previewVerticalDiv) {
            this.previewVerticalDiv.remove();
            this.previewVerticalDiv = undefined;
        }
        if (this.previewHorizontalDiv) {
            this.previewHorizontalDiv.remove();
            this.previewHorizontalDiv = undefined;
        }
        if (this.previewDivTopTopContainer) {
            this.previewDivTopTopContainer.remove();
            this.previewDivTopTopContainer = undefined;
        }
        if (this.previewDivTopTop) {
            this.previewDivTopTop.remove();
            this.previewDivTopTop = undefined;
        }
        if (this.previewDivTopCenterContainer) {
            this.previewDivTopCenterContainer.remove();
            this.previewDivTopCenterContainer = undefined;
        }
        if (this.previewDivTopCenter) {
            this.previewDivTopCenter.remove();
            this.previewDivTopCenter = undefined;
        }
        if (this.previewDivTopBottomContainer) {
            this.previewDivTopBottomContainer.remove();
            this.previewDivTopBottomContainer = undefined;
        }
        if (this.previewDivTopBottom) {
            this.previewDivTopBottom.remove();
            this.previewDivTopBottom = undefined;
        }
        if (this.previewDivLeftDiagonalContainer) {
            this.previewDivLeftDiagonalContainer.remove();
            this.previewDivLeftDiagonalContainer = undefined;
        }
        if (this.previewDivLeftDiagonal) {
            this.previewDivLeftDiagonal.remove();
            this.previewDivLeftDiagonal = undefined;
        }
        if (this.previewDivBottomLeftContainer) {
            this.previewDivBottomLeftContainer.remove();
            this.previewDivBottomLeftContainer = undefined;
        }
        if (this.previewDivBottomLeft) {
            this.previewDivBottomLeft.remove();
            this.previewDivBottomLeft = undefined;
        }
        if (this.previewDivBottomcenterContainer) {
            this.previewDivBottomcenterContainer.remove();
            this.previewDivBottomcenterContainer = undefined;
        }
        if (this.previewDivBottomcenter) {
            this.previewDivBottomcenter.remove();
            this.previewDivBottomcenter = undefined;
        }
        if (this.previewDivBottomRightContainer) {
            this.previewDivBottomRightContainer.remove();
            this.previewDivBottomRightContainer = undefined;
        }
        if (this.previewDivBottomRight) {
            this.previewDivBottomRight.remove();
            this.previewDivBottomRight = undefined;
        }
        if (this.previewDivDiagonalRightContainer) {
            this.previewDivDiagonalRightContainer.remove();
            this.previewDivDiagonalRightContainer = undefined;
        }
        if (this.previewDivDiagonalRight) {
            this.previewDivDiagonalRight.remove();
            this.previewDivDiagonalRight = undefined;
        }
        if (this.previewDivTopTopTransParent) {
            this.previewDivTopTopTransParent.remove();
            this.previewDivTopTopTransParent = undefined;
        }
        if (this.previewDivTopCenterTransParent) {
            this.previewDivTopCenterTransParent.remove();
            this.previewDivTopCenterTransParent = undefined;
        }
        if (this.previewDivTopBottomTransParent) {
            this.previewDivTopBottomTransParent.remove();
            this.previewDivTopBottomTransParent = undefined;
        }
        if (this.previewDivLeftDiagonalTransParent) {
            this.previewDivLeftDiagonalTransParent.remove();
            this.previewDivLeftDiagonalTransParent = undefined;
        }
        if (this.previewDivBottomLeftTransparent) {
            this.previewDivBottomLeftTransparent.remove();
            this.previewDivBottomLeftTransparent = undefined;
        }
        if (this.previewDivBottomcenterTransparent) {
            this.previewDivBottomcenterTransparent.remove();
            this.previewDivBottomcenterTransparent = undefined;
        }
        if (this.previewDivBottomRightTransparent) {
            this.previewDivBottomRightTransparent.remove();
            this.previewDivBottomRightTransparent = undefined;
        }
        if (this.previewDivDiagonalRightTransparent) {
            this.previewDivDiagonalRightTransparent.remove();
            this.previewDivDiagonalRightTransparent = undefined;
        }
        if (this.shadingContiner) {
            this.shadingContiner.remove();
            this.shadingContiner = undefined;
        }
        if (this.noneDiv) {
            this.noneDiv.remove();
            this.noneDiv = undefined;
        }
        if (this.customDiv) {
            this.customDiv.remove();
            this.customDiv = undefined;
        }
        if (this.allDiv) {
            this.allDiv.remove();
            this.allDiv = undefined;
        }
        if (this.boxDiv) {
            this.boxDiv.remove();
            this.boxDiv = undefined;
        }
        if (this.displayText) {
            this.displayText.remove();
            this.displayText = undefined;
        }
        if (this.settingAndPreviewContainer) {
            this.settingAndPreviewContainer.remove();
            this.settingAndPreviewContainer = undefined;
        }
        if (this.settingsContiner) {
            this.settingsContiner.remove();
            this.settingsContiner = undefined;
        }
        if (this.styleContainer) {
            this.styleContainer.remove();
            this.styleContainer = undefined;
        }
        if (this.previewContiner) {
            this.previewContiner.remove();
            this.previewContiner = undefined;
        }
        if (this.previewSubContainer1) {
            this.previewSubContainer1.remove();
            this.previewSubContainer1 = undefined;
        }
        if (this.previewSubContainer2) {
            this.previewSubContainer2.remove();
            this.previewSubContainer2 = undefined;
        }
        if (this.styleSubContainer) {
            this.styleSubContainer.remove();
            this.styleSubContainer = undefined;
        }
        if (this.dropdownListDiv) {
            this.dropdownListDiv.remove();
            this.dropdownListDiv = undefined;
        }
        if (this.dropDownList) {
            this.dropDownList.remove();
            this.dropDownList = undefined;
        }
        if (this.widthcontainerDiv) {
            this.widthcontainerDiv.remove();
            this.widthcontainerDiv = undefined;
        }
        if (this.widthNumericDiv) {
            this.widthNumericDiv.remove();
            this.widthNumericDiv = undefined;
        }
        if (this.widthNumeric) {
            this.widthNumeric.remove();
            this.widthNumeric = undefined;
        }
        if (this.colorDiv) {
            this.colorDiv.remove();
            this.colorDiv = undefined;
        }
        if (this.colorText) {
            this.colorText.remove();
            this.colorText = undefined;
        }
        if (this.borderColorPickerElement) {
            this.borderColorPickerElement.remove();
            this.borderColorPickerElement = undefined;
        }
        if (this.settingText) {
            this.settingText.remove();
            this.settingText = undefined;
        }
        if (this.settingsSubContiner) {
            this.settingsSubContiner.remove();
            this.settingsSubContiner = undefined;
        }
        if (this.noneDivContainer) {
            this.noneDivContainer.remove();
            this.noneDivContainer = undefined;
        }
        if (this.noneDivLabel) {
            this.noneDivLabel.remove();
            this.noneDivLabel = undefined;
        }
        if (this.boxDivContainer) {
            this.boxDivContainer.remove();
            this.boxDivContainer = undefined;
        }
        if (this.boxDivLabel) {
            this.boxDivLabel.remove();
            this.boxDivLabel = undefined;
        }
        if (this.allDivContainer) {
            this.allDivContainer.remove();
            this.allDivContainer = undefined;
        }
        if (this.allDivLabel) {
            this.allDivLabel.remove();
            this.allDivLabel = undefined;
        }
        if (this.customDivContainer) {
            this.customDivContainer.remove();
            this.customDivContainer = undefined;
        }
        if (this.customDivLabel) {
            this.customDivLabel.remove();
            this.customDivLabel = undefined;
        }
        if (this.previewDivHorizontalContainer) {
            this.previewDivHorizontalContainer.remove();
            this.previewDivHorizontalContainer = undefined;
        }
        if (this.previewDivVerticalContainer) {
            this.previewDivVerticalContainer.remove();
            this.previewDivVerticalContainer = undefined;
        }
        if (this.previewText) {
            this.previewText.remove();
            this.previewText = undefined;
        }
        if (this.shadingText) {
            this.shadingText.remove();
            this.shadingText = undefined;
        }
        if (this.shadings) {
            this.shadings.remove();
            this.shadings = undefined;
        }
        if (this.colorPickerDiv) {
            this.colorPickerDiv.remove();
            this.colorPickerDiv = undefined;
        }
        if (this.label) {
            this.label.remove();
            this.label = undefined;
        }
        if (this.shadingColorPickerElement) {
            this.shadingColorPickerElement.remove();
            this.shadingColorPickerElement = undefined;
        }
        if (this.shdApply) {
            this.shdApply.remove();
            this.shdApply = undefined;
        }
    };
    return BordersAndShadingDialog;
}());
export { BordersAndShadingDialog };
