import { formulaOperation, keyUp, keyDown, click, refreshFormulaDatasource, formulaBarOperation, keyCodes, isNavigationKey } from '../common/index';
import { editOperation, dialog, locale, focus } from '../common/index';
import { AutoComplete } from '@syncfusion/ej2-dropdowns';
import { detach, isNullOrUndefined, select } from '@syncfusion/ej2-base';
import { checkIsFormula, getSheet, getSheetName, getCellIndexes, isCellReference } from '../../workbook/index';
import { workbookFormulaOperation } from '../../workbook/index';
/**
 * @hidden
 * The `Formula` module is used to handle the formulas and its functionalities in Spreadsheet.
 */
var Formula = /** @class */ (function () {
    /**
     * Constructor for formula module in Spreadsheet.
     *
     * @private
     * @param {Spreadsheet} parent - Constructor for formula module in Spreadsheet.
     */
    function Formula(parent) {
        this.isFormulaBar = false;
        this.isFormula = false;
        this.isPopupOpened = false;
        this.isPreventClose = false;
        this.isSubFormula = false;
        this.parent = parent;
        this.addEventListener();
        //Spreadsheet.Inject(WorkbookFormula);
    }
    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    Formula.prototype.getModuleName = function () {
        return 'formula';
    };
    /**
     * To destroy the formula module.
     *
     * @returns {void} - To destroy the formula module.
     * @hidden
     */
    Formula.prototype.destroy = function () {
        this.removeEventListener();
        if (this.autocompleteInstance) {
            this.autocompleteInstance.destroy();
            if (this.autocompleteInstance.element) {
                this.autocompleteInstance.element.remove();
                this.autocompleteInstance.element = null;
            }
        }
        this.autocompleteInstance = null;
        if (this.acInputElement) {
            this.acInputElement.remove();
            this.acInputElement = null;
        }
        this.parent = null;
    };
    Formula.prototype.addEventListener = function () {
        this.parent.on(formulaOperation, this.performFormulaOperation, this);
        this.parent.on(keyUp, this.keyUpHandler, this);
        this.parent.on(keyDown, this.keyDownHandler, this);
        this.parent.on(click, this.formulaClick, this);
        this.parent.on(refreshFormulaDatasource, this.refreshFormulaDatasource, this);
    };
    Formula.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(formulaOperation, this.performFormulaOperation);
            this.parent.off(keyUp, this.keyUpHandler);
            this.parent.off(keyDown, this.keyDownHandler);
            this.parent.off(click, this.formulaClick);
            this.parent.off(refreshFormulaDatasource, this.refreshFormulaDatasource);
        }
    };
    Formula.prototype.performFormulaOperation = function (args) {
        var _this = this;
        var action = args.action;
        var l10n = this.parent.serviceLocator.getService(locale);
        switch (action) {
            case 'renderAutoComplete':
                this.renderAutoComplete();
                break;
            case 'endEdit':
                this.endEdit();
                break;
            case 'addDefinedName':
                args.isAdded = this.addDefinedName(args.definedName);
                break;
            case 'getNames':
                if (!args.sheetName) {
                    args.sheetName = getSheetName(this.parent);
                }
                args.names = this.getNames(args.sheetName);
                break;
            case 'getNameFromRange':
                args.definedName = this.getNameFromRange(args.range);
                break;
            case 'isFormulaEditing':
                args.isFormulaEdit = this.isFormula;
                break;
            case 'isCircularReference': {
                var dialogInst_1 = this.parent.serviceLocator.getService(dialog);
                var dialogContent_1 = l10n.getConstant('CircularReference');
                var triggerEvent_1 = function (dlgArgs) {
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.content !== dialogContent_1) {
                        dialogInst_1.dialogInstance.content = dlgArgs.content;
                        dialogInst_1.dialogInstance.dataBind();
                    }
                };
                var dlgInst = dialogInst_1.dialogInstance;
                if (dlgInst && dlgInst.visible && dlgInst.element.classList.contains('e-circularref-dlg')) {
                    triggerEvent_1({ dialogName: 'CircularReferenceDialog', element: dlgInst.element, target: this.parent.element, cancel: false,
                        cellAddress: args.address, content: dialogContent_1 });
                }
                else {
                    var cellAddress_1 = args.address;
                    dialogInst_1.show({
                        height: 180, width: 400, isModal: true, showCloseIcon: true, cssClass: 'e-circularref-dlg', content: dialogContent_1,
                        beforeOpen: function (args) {
                            var dlgArgs = { dialogName: 'CircularReferenceDialog', element: args.element,
                                target: args.target, cancel: args.cancel, cellAddress: cellAddress_1, content: dialogContent_1 };
                            triggerEvent_1(dlgArgs);
                            args.cancel = dlgArgs.cancel;
                        }
                    });
                }
                args.argValue = '0';
                break;
            }
        }
    };
    Formula.prototype.renderAutoComplete = function () {
        if (!select('#' + this.parent.element.id + '_ac', this.parent.element)) {
            var acElem = this.parent.createElement('input', { id: this.parent.element.id + '_ac', className: 'e-ss-ac' });
            this.parent.element.appendChild(acElem);
            var eventArgs = {
                action: 'getLibraryFormulas',
                formulaCollection: []
            };
            this.parent.notify(workbookFormulaOperation, eventArgs);
            var autoCompleteOptions = {
                dataSource: eventArgs.formulaCollection,
                cssClass: 'e-ss-atc',
                popupWidth: '130px',
                allowFiltering: true,
                filterType: 'StartsWith',
                sortOrder: 'Ascending',
                open: this.onSuggestionOpen.bind(this),
                close: this.onSuggestionClose.bind(this),
                select: this.onSelect.bind(this),
                actionComplete: this.onSuggestionComplete.bind(this)
            };
            this.autocompleteInstance = new AutoComplete(autoCompleteOptions, acElem);
            this.autocompleteInstance.createElement = this.parent.createElement;
            this.acInputElement = acElem;
        }
    };
    Formula.prototype.onSuggestionOpen = function (e) {
        var _this = this;
        this.isPopupOpened = true;
        e.popup.relateTo = this.getRelateToElem();
        e.popup.element.firstChild.style.maxHeight = '180px';
        new Promise(function (resolve) {
            setTimeout(function () { resolve(); }, 100);
        }).then(function () {
            _this.triggerKeyDownEvent(keyCodes.DOWN);
        });
    };
    Formula.prototype.onSuggestionClose = function (e) {
        if (this.isPreventClose) {
            e.cancel = true;
        }
        else {
            this.isPopupOpened = false;
        }
    };
    Formula.prototype.onSelect = function (e) {
        var updatedFormulaValue = '=' + e.itemData.value + '(';
        if (this.isSubFormula) {
            var editValue = this.getEditingValue();
            var parseIndex = editValue.lastIndexOf(this.parent.listSeparator);
            if (parseIndex > -1) {
                updatedFormulaValue = editValue.slice(0, parseIndex + 1);
            }
            else {
                parseIndex = editValue.lastIndexOf('(');
                if (parseIndex > -1) {
                    updatedFormulaValue = editValue.slice(0, parseIndex + 1);
                }
            }
            updatedFormulaValue += e.itemData.value + '(';
        }
        this.parent.notify(editOperation, {
            action: 'refreshEditor', value: updatedFormulaValue,
            refreshFormulaBar: true, refreshEditorElem: true, refreshCurPos: !this.isFormulaBar
        });
        if (this.isPopupOpened) {
            this.hidePopUp();
            var suggPopupElem = select('#' + this.parent.element.id + '_ac_popup');
            if (suggPopupElem) {
                detach(suggPopupElem);
            }
            this.isPopupOpened = false;
        }
    };
    Formula.prototype.onSuggestionComplete = function (args) {
        this.isPreventClose = args.result.length > 0;
        if (!this.isPreventClose) {
            args.cancel = true;
            this.hidePopUp();
        }
    };
    Formula.prototype.refreshFormulaDatasource = function () {
        var eventArgs = {
            action: 'getLibraryFormulas',
            formulaCollection: []
        };
        this.parent.notify(workbookFormulaOperation, eventArgs);
        if (this.autocompleteInstance) {
            this.autocompleteInstance.dataSource = eventArgs.formulaCollection;
        }
    };
    Formula.prototype.keyUpHandler = function (e) {
        if (this.parent.isEdit) {
            var editValue = this.getEditingValue();
            this.isFormula = checkIsFormula(editValue);
            if (this.isFormula || this.isPopupOpened) {
                if (e.keyCode !== keyCodes.TAB && this.isFormula) {
                    editValue = this.getSuggestionKeyFromFormula(editValue);
                }
                this.refreshFormulaSuggestion(e, editValue);
            }
        }
        else if (this.isPopupOpened) {
            this.hidePopUp();
        }
    };
    Formula.prototype.keyDownHandler = function (e) {
        var keyCode = e.keyCode;
        if (this.isFormula) {
            if (this.isPopupOpened) {
                switch (keyCode) {
                    case keyCodes.UP:
                    case keyCodes.DOWN:
                        e.preventDefault();
                        this.triggerKeyDownEvent(keyCode);
                        break;
                    case keyCodes.TAB:
                        e.preventDefault();
                        this.triggerKeyDownEvent(keyCodes.ENTER);
                        break;
                }
            }
        }
        else {
            var trgtElem = e.target;
            if (trgtElem.id === this.parent.element.id + '_name_box') {
                switch (keyCode) {
                    case keyCodes.ENTER:
                        if (!document.querySelector('.e-name-box.e-popup-open')) {
                            this.addDefinedName({ name: trgtElem.value });
                            focus(this.parent.element);
                        }
                        break;
                    case keyCodes.ESC:
                        focus(this.parent.element);
                        break;
                }
            }
        }
    };
    Formula.prototype.formulaClick = function (e) {
        if (this.parent.isEdit) {
            var trgtElem = e.target;
            this.isFormulaBar = trgtElem.classList.contains('e-formula-bar');
        }
    };
    Formula.prototype.refreshFormulaSuggestion = function (e, formula) {
        if (formula.length > 0) {
            var autoCompleteElem = this.autocompleteInstance.element;
            var keyCode = e.keyCode;
            var isSuggestionAlreadyOpened = this.isPopupOpened;
            if (!isNavigationKey(keyCode)) {
                autoCompleteElem.value = formula;
                autoCompleteElem.dispatchEvent(new Event('input'));
                autoCompleteElem.dispatchEvent(new Event('keyup'));
                if (isSuggestionAlreadyOpened) {
                    this.triggerKeyDownEvent(keyCodes.DOWN);
                }
            }
        }
        else {
            if (this.isPopupOpened) {
                this.isPreventClose = false;
                this.hidePopUp();
            }
        }
    };
    Formula.prototype.endEdit = function () {
        this.isSubFormula = false;
        this.isPreventClose = false;
        this.isFormula = false;
        this.isFormulaBar = false;
        if (this.isPopupOpened) {
            this.hidePopUp();
            var suggPopupElem = select('#' + this.parent.element.id + '_ac_popup');
            if (suggPopupElem) {
                detach(suggPopupElem);
            }
            this.isPopupOpened = false;
        }
    };
    Formula.prototype.hidePopUp = function () {
        this.autocompleteInstance.hidePopup();
    };
    Formula.prototype.getSuggestionKeyFromFormula = function (formula) {
        var suggestValue = '';
        formula = formula.substr(1); //remove = char.
        if (formula) {
            var bracketIndex = formula.lastIndexOf('(');
            formula = formula.substr(bracketIndex + 1);
            var fSplit = formula.split(this.parent.listSeparator);
            if (fSplit.length === 1) {
                suggestValue = fSplit[0];
                this.isSubFormula = bracketIndex > -1;
            }
            else {
                suggestValue = fSplit[fSplit.length - 1];
                this.isSubFormula = true;
            }
            var isAlphaNumeric = suggestValue.match(/\w/);
            if (!isAlphaNumeric || (isAlphaNumeric && isAlphaNumeric.index !== 0)) {
                suggestValue = '';
            }
        }
        return suggestValue;
    };
    Formula.prototype.getRelateToElem = function () {
        var eventArgs = { action: 'getElement' };
        if (this.isFormulaBar) {
            this.parent.notify(formulaBarOperation, eventArgs);
        }
        else {
            this.parent.notify(editOperation, eventArgs);
        }
        return eventArgs.element;
    };
    Formula.prototype.getEditingValue = function () {
        var eventArgs = { action: 'getCurrentEditValue', editedValue: '' };
        this.parent.notify(editOperation, eventArgs);
        return eventArgs.editedValue;
    };
    Formula.prototype.triggerKeyDownEvent = function (keyCode) {
        var autoCompleteElem = this.autocompleteInstance.element;
        autoCompleteElem.dispatchEvent(new Event('input'));
        var eventArg = new Event('keydown');
        eventArg['keyCode'] = keyCode;
        eventArg['which'] = keyCode;
        eventArg['altKey'] = false;
        eventArg['shiftKey'] = false;
        eventArg['ctrlKey'] = false;
        /* eslint-enable @typescript-eslint/dot-notation */
        autoCompleteElem.dispatchEvent(eventArg);
    };
    Formula.prototype.getNames = function (sheetName) {
        var names = this.parent.definedNames.filter(function (name) { return name.scope === 'Workbook' || name.scope === '' || name.scope === sheetName; });
        return names;
    };
    Formula.prototype.getNameFromRange = function (range) {
        var singleRange = range.slice(0, range.indexOf(':'));
        var sRange = range.substring(range.lastIndexOf('!') + 1).split(':');
        var isSingleCell = sRange.length > 1 && sRange[0] === sRange[1];
        var sheetName;
        var referRange;
        var name = this.parent.definedNames.filter(function (name) {
            sheetName = name.refersTo.substring(0, name.refersTo.lastIndexOf('!'));
            referRange = name.refersTo.substring(name.refersTo.lastIndexOf('!') + 1);
            if (sheetName.includes('\'') && sheetName.match(/^='.*'$/)) {
                sheetName = '=' + sheetName.slice(2, -1);
            }
            var referValue = sheetName + '!' + referRange.split('$').join('');
            if (isSingleCell && referValue === '=' + singleRange) {
                return true;
            }
            return referValue === '=' + range;
        });
        return name && name[0];
    };
    Formula.prototype.addDefinedName = function (definedName) {
        var _this = this;
        var name = definedName.name;
        var isAdded = false;
        if (name && isCellReference(name.toUpperCase())) {
            this.parent.goTo(name);
            return isAdded;
        }
        if (!definedName.refersTo) {
            var sheet = getSheet(this.parent, this.parent.activeSheetIndex);
            var sheetName = getSheetName(this.parent);
            sheetName = sheetName.indexOf(' ') !== -1 ? '\'' + sheetName + '\'' : sheetName;
            var selectRange = sheet.selectedRange;
            if (!isNullOrUndefined(selectRange)) {
                var colIndex = selectRange.indexOf(':');
                var left = selectRange.substr(0, colIndex);
                var right = selectRange.substr(colIndex + 1, selectRange.length);
                if (parseInt(right.replace(/\D/g, ''), 10) === sheet.rowCount && parseInt(left.replace(/\D/g, ''), 10) === 1) {
                    right = right.replace(/[0-9]/g, '');
                    left = left.replace(/[0-9]/g, '');
                    selectRange = '$' + left + ':$' + right;
                }
                else if (getCellIndexes(right)[1] === sheet.colCount - 1 && getCellIndexes(left)[1] === 0) {
                    right = right.replace(/\D/g, '');
                    left = left.replace(/\D/g, '');
                    selectRange = '$' + left + ':$' + right;
                }
                else {
                    selectRange = left === right ? left : selectRange;
                }
            }
            definedName.refersTo = sheetName + '!' + selectRange;
            definedName.scope = 'Workbook';
        }
        if (name.length > 0 && (/^([a-zA-Z_0-9.]){0,255}$/.test(name))) {
            var eventArgs = {
                action: 'addDefinedName', definedName: definedName, isAdded: false
            };
            this.parent.notify(workbookFormulaOperation, eventArgs);
            isAdded = eventArgs.isAdded;
            if (!eventArgs.isAdded) {
                this.parent.serviceLocator.getService(dialog).show({
                    content: this.parent.serviceLocator.getService(locale).getConstant('DefineNameExists'),
                    width: '300',
                    beforeOpen: function (args) {
                        var dlgArgs = {
                            dialogName: 'DefineNameExistsDialog',
                            element: args.element, target: args.target, cancel: args.cancel
                        };
                        _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                        if (dlgArgs.cancel) {
                            args.cancel = true;
                        }
                    }
                });
            }
        }
        else {
            this.parent.serviceLocator.getService(dialog).show({
                content: this.parent.serviceLocator.getService(locale).getConstant('DefineNameInValid'),
                width: '300',
                beforeOpen: function (args) {
                    var dlgArgs = {
                        dialogName: 'DefineNameInValidDialog',
                        element: args.element, target: args.target, cancel: args.cancel
                    };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                    }
                }
            });
        }
        return isAdded;
    };
    return Formula;
}());
export { Formula };
