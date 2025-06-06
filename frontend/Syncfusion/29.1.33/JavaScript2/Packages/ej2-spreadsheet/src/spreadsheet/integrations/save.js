import { dialog, focus, locale } from '../index';
import { beginSave, saveCompleted, saveError, exportDialog } from '../../workbook/common/event';
import { getComponent, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * `Save` module is used to handle the save action in Spreadsheet.
 */
var Save = /** @class */ (function () {
    /**
     * Constructor for Save module in Spreadsheet.
     *
     * @private
     * @param {Spreadsheet} parent - Specifies the Spreadsheet instance.
     */
    function Save(parent) {
        this.parent = parent;
        this.addEventListener();
        //Spreadsheet.Inject(WorkbookSave);
    }
    /**
     * To destroy the Save module.
     *
     * @returns {void}
     * @hidden
     */
    Save.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    Save.prototype.addEventListener = function () {
        this.parent.on(beginSave, this.initiateSave, this);
        this.parent.on(saveCompleted, this.saveCompleted, this);
        this.parent.on(saveError, this.showErrorDialog, this);
        this.parent.on(exportDialog, this.exportDialog, this);
    };
    Save.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(beginSave, this.initiateSave);
            this.parent.off(saveCompleted, this.saveCompleted);
            this.parent.off(saveError, this.showErrorDialog);
            this.parent.off(exportDialog, this.exportDialog);
        }
    };
    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    Save.prototype.getModuleName = function () {
        return 'save';
    };
    /**
     * Initiate save process.
     *
     * @hidden
     * @returns {void} - Initiate save process.
     */
    Save.prototype.initiateSave = function () {
        this.parent.showSpinner();
    };
    /**
     * Save action completed.
     *
     * @hidden
     * @returns {void} - Save action completed.
     */
    Save.prototype.saveCompleted = function () {
        this.parent.hideSpinner();
    };
    Save.prototype.showErrorDialog = function (args) {
        var _this = this;
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        dialogInst.show({
            isModal: true, showCloseIcon: true, height: 180, width: 400, content: args.content,
            beforeOpen: function () { return focus(_this.parent.element); }
        });
    };
    Save.prototype.exportDialog = function (args) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogInst = this.parent.serviceLocator.getService(dialog);
        var type = args ? args.item.id.split(this.parent.element.id + '_')[1] : 'xlsx';
        if (isNullOrUndefined(this.parent.element.querySelector('.e-open-dlg'))) {
            var dlg = {
                isModal: true, showCloseIcon: true, cssClass: 'e-open-dlg',
                header: l10n.getConstant('SaveAs'),
                beforeOpen: function (args) {
                    var dlgArgs = {
                        dialogName: l10n.getConstant('SaveAs'),
                        element: args.element, target: args.target, cancel: args.cancel
                    };
                    _this.parent.trigger('dialogBeforeOpen', dlgArgs);
                    if (dlgArgs.cancel) {
                        args.cancel = true;
                    }
                    else {
                        dialogInst.dialogInstance.content = _this.OpenContent(type);
                        dialogInst.dialogInstance.dataBind();
                        _this.parent.element.querySelector('.e-text-open').setSelectionRange(0, _this.parent.element.querySelector('.e-text-open').value.length);
                        focus(_this.parent.element);
                    }
                },
                buttons: [{
                        buttonModel: {
                            content: l10n.getConstant('Save'), isPrimary: true, cssClass: 'e-btn-open-ok'
                        },
                        click: function () {
                            var name = _this.parent.element.querySelector('.e-text-open').value;
                            if (_this.checkValidName(name)) {
                                dialogInst.hide();
                                var type_1 = args ? args.item.id.split(_this.parent.element.id + "_")[1] : 'Xlsx';
                                _this.parent.save({ saveType: type_1, fileName: name });
                            }
                            else {
                                var saveButton = _this.parent.element.querySelector('.e-btn-open-ok');
                                var saveButtonObj = getComponent(saveButton, 'btn');
                                saveButtonObj.disabled = true;
                                var l10n_1 = _this.parent.serviceLocator.getService(locale);
                                var error = name.length === 0 ? l10n_1.getConstant('EmptyFileName') :
                                    (name.length > 218 ? l10n_1.getConstant('LargeName') : l10n_1.getConstant('FileNameError'));
                                var fileSpan = _this.parent.createElement('span', { className: 'e-file-alert-span' });
                                fileSpan.innerText = error;
                                if (_this.parent.element.querySelector('.e-file-alert-span')) {
                                    _this.parent.element.querySelector('.e-file-alert-span').remove();
                                }
                                (_this.parent.element.querySelector('.e-open-dlg').querySelector('.e-dlg-content')).appendChild(fileSpan);
                            }
                        }
                    }]
            };
            dialogInst.show(dlg);
        }
        else {
            dialogInst.hide();
        }
    };
    Save.prototype.checkValidName = function (name) {
        var isValidName = true;
        if (name.match(new RegExp('.*[\\[\\]\\*\\\\/\\?\\:\\<\\>\\|\\"].*')) || name.length < 1 || name.length > 218) {
            isValidName = false;
        }
        return isValidName;
    };
    Save.prototype.OpenContent = function (type) {
        var _this = this;
        var l10n = this.parent.serviceLocator.getService(locale);
        var dialogElem = this.parent.createElement('div', { className: 'e-open-dialog' });
        var openTextHeader = this.parent.createElement('div', { className: 'e-open-head' });
        var openTextE = this.parent.createElement('div', { className: 'e-input-group' });
        dialogElem.appendChild(openTextHeader);
        dialogElem.appendChild(openTextE);
        var header = l10n.getConstant('FileName');
        var id = this.parent.element.id + "_filename";
        var openTextH = this.parent.createElement('p', { className: 'e-header', id: id, attrs: { 'aria-label': l10n.getConstant('SaveAs') + " " + header } });
        openTextH.innerText = header;
        var openTextIp = this.parent.createElement('input', { className: 'e-input e-text-open', attrs: { 'type': 'Text', 'aria-labelledby': id } });
        var openTextSpan = this.parent.createElement('span', { className: 'e-input-group-icon' });
        openTextIp.onkeyup = function (e) {
            if (_this.parent.element.querySelector('.e-file-alert-span') && e.keyCode !== 13) {
                var saveButton = _this.parent.element.querySelector('.e-btn-open-ok');
                var buttonObj = getComponent(saveButton, 'btn');
                buttonObj.disabled = false;
                _this.parent.element.querySelector('.e-file-alert-span').remove();
            }
        };
        openTextHeader.appendChild(openTextH);
        openTextSpan.textContent = '.' + type.toLowerCase();
        openTextE.appendChild(openTextIp);
        openTextIp.setAttribute('value', 'Sample');
        openTextE.appendChild(openTextSpan);
        return dialogElem;
    };
    return Save;
}());
export { Save };
