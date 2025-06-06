import { Dialog } from '@syncfusion/ej2-popups';
import { remove, extend, updateBlazorTemplate, initializeCSPTemplate } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { appendChildren, applyBiggerTheme, addBiggerDialog } from '../base/util';
import { ResponsiveDialogRenderer } from './responsive-dialog-renderer';
import { ResponsiveDialogAction } from '../base/enum';
import * as literals from '../base/string-literals';
/**
 * Edit render module is used to render grid edit row.
 *
 * @hidden
 */
var DialogEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     */
    function DialogEditRender(parent, serviceLocator) {
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.dialogDestroy, this.destroy, this);
        this.parent.on(events.destroy, this.destroy, this);
    }
    DialogEditRender.prototype.setLocaleObj = function () {
        this.l10n = this.serviceLocator.getService('localization');
    };
    DialogEditRender.prototype.addNew = function (elements, args) {
        this.isEdit = false;
        this.createDialog(elements, args);
    };
    DialogEditRender.prototype.update = function (elements, args) {
        this.isEdit = true;
        this.createDialog(elements, args);
    };
    DialogEditRender.prototype.createDialogHeader = function (args) {
        var _this = this;
        var gObj = this.parent;
        var header;
        if (this.parent.enableAdaptiveUI) {
            var responsiveDlgRenderer = new ResponsiveDialogRenderer(this.parent, this.serviceLocator);
            responsiveDlgRenderer.action = this.isEdit ? ResponsiveDialogAction.isEdit : ResponsiveDialogAction.isAdd;
            return responsiveDlgRenderer.renderResponsiveHeader(undefined, args);
        }
        else {
            if (gObj.editSettings.headerTemplate) {
                header = initializeCSPTemplate(function () {
                    return _this.getDialogEditTemplateElement('HeaderTemplate', args).outerHTML;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                });
            }
            else if (this.isEdit) {
                header = this.l10n.getConstant('EditFormTitle') + args.primaryKeyValue[0];
            }
            else {
                header = this.l10n.getConstant('AddFormTitle');
            }
        }
        return header;
    };
    DialogEditRender.prototype.createDialog = function (elements, args) {
        var _this = this;
        var gObj = this.parent;
        this.dialog = this.parent.createElement('div', { id: gObj.element.id + '_dialogEdit_wrapper' });
        this.dialog.style.width = 'auto';
        if (gObj.enableAdaptiveUI) {
            this.dialog.classList.add('e-responsive-dialog');
        }
        gObj.element.appendChild(this.dialog);
        this.setLocaleObj();
        this.dialog.setAttribute('aria-label', this.l10n.getConstant('DialogEdit'));
        // let position: PositionDataModel = this.parent.element.getBoundingClientRect().height < 400 ?
        //     { X: 'center', Y: 'top' } : { X: 'center', Y: 'center' };
        this.dialogObj = new Dialog(extend({
            header: this.createDialogHeader(args), isModal: true, visible: true,
            cssClass: this.parent.cssClass ? 'e-edit-dialog' + ' ' + this.parent.cssClass : 'e-edit-dialog',
            content: this.getEditElement(elements, args),
            showCloseIcon: true,
            allowDragging: true,
            // position: position,
            close: this.dialogClose.bind(this),
            created: this.dialogCreated.bind(this),
            closeOnEscape: true, width: gObj.editSettings.template ? 'auto' : '330px',
            target: args.target ? args.target : document.body, animationSettings: { effect: 'None' },
            footerTemplate: gObj.editSettings.footerTemplate ? initializeCSPTemplate(function () {
                return _this.getDialogEditTemplateElement('FooterTemplate', args).outerHTML;
            }) : null,
            buttons: [{
                    click: this.btnClick.bind(this),
                    buttonModel: { content: this.l10n.getConstant('SaveButton'),
                        cssClass: this.parent.cssClass ? 'e-primary' + ' ' + this.parent.cssClass : 'e-primary',
                        isPrimary: true }
                },
                { click: this.btnClick.bind(this),
                    buttonModel: {
                        cssClass: this.parent.cssClass ? 'e-flat' + ' ' + this.parent.cssClass : 'e-flat',
                        content: this.l10n.getConstant('CancelButton')
                    } }]
        }, gObj.editSettings.dialog ? (gObj.editSettings.dialog.params || {}) : {}));
        args.dialog = this.dialogObj;
        var isStringTemplate = 'isStringTemplate';
        this.dialogObj["" + isStringTemplate] = true;
        this.renderResponsiveDialog();
        this.dialogObj.appendTo(this.dialog);
        applyBiggerTheme(this.parent.element, this.dialogObj.element.parentElement);
        if (gObj.enableAdaptiveUI) {
            this.dialogObj.show(true);
        }
    };
    DialogEditRender.prototype.dialogCreated = function () {
        addBiggerDialog(this.parent);
    };
    DialogEditRender.prototype.renderResponsiveDialog = function () {
        var _this = this;
        if (this.parent.enableAdaptiveUI) {
            if (this.parent.adaptiveDlgTarget) {
                this.dialogObj.target = this.parent.adaptiveDlgTarget;
            }
            this.dialogObj.buttons = [{}];
            this.dialogObj.showCloseIcon = true;
            this.dialogObj.visible = false;
            this.dialogObj.width = '100%';
            this.dialogObj.open = function () {
                _this.dialogObj.element.style.maxHeight = '100%';
            };
        }
    };
    DialogEditRender.prototype.btnClick = function (e) {
        if (this.l10n.getConstant('CancelButton').toLowerCase() === e.target.innerText.trim().toLowerCase()) {
            this.dialogClose();
        }
        else {
            this.parent.endEdit();
        }
    };
    DialogEditRender.prototype.dialogClose = function () {
        this.parent.closeEdit();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DialogEditRender.prototype.destroy = function (args) {
        var dialogEditTemplates = ['template', 'headerTemplate', 'footerTemplate'];
        for (var i = 0; i < dialogEditTemplates.length; i++) {
            if (this.parent.editSettings[dialogEditTemplates[parseInt(i.toString(), 10)]]) {
                var templateName = dialogEditTemplates[parseInt(i.toString(), 10)].charAt(0).toUpperCase()
                    + dialogEditTemplates[parseInt(i.toString(), 10)].slice(1);
                var editTemplateID = this.parent.element.id + 'editSettings' + templateName;
                updateBlazorTemplate(editTemplateID, templateName, this.parent.editSettings);
            }
        }
        this.parent.notify(events.destroyForm, {});
        this.parent.isEdit = false;
        this.parent.notify(events.toolbarRefresh, {});
        if (this.dialog && !this.dialogObj.isDestroyed) {
            this.dialogObj.destroy();
            remove(this.dialog);
        }
    };
    DialogEditRender.prototype.getDialogEditTemplateElement = function (dialogTemp, args) {
        var tempDiv = this.parent.createElement('div', { className: 'e-dialog' + dialogTemp });
        var dummyData = extend({}, args.rowData, { isAdd: !this.isEdit }, true);
        var templateID = this.parent.element.id + 'editSettings' + dialogTemp;
        appendChildren(tempDiv, (dialogTemp === 'HeaderTemplate' ? this.parent.getEditHeaderTemplate() :
            this.parent.getEditFooterTemplate())(dummyData, this.parent, 'editSettings' + dialogTemp, templateID));
        updateBlazorTemplate(templateID, dialogTemp, this.parent.editSettings);
        return tempDiv;
    };
    DialogEditRender.prototype.getEditElement = function (elements, args) {
        var _this = this;
        var gObj = this.parent;
        var div = this.parent.createElement('div', { className: this.isEdit ? literals.editedRow : 'e-insertedrow' });
        var form = args.form =
            this.parent.createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        if (this.parent.editSettings.template) {
            var editTemplateID = this.parent.element.id + 'editSettingsTemplate';
            var dummyData = extend({}, args.rowData, { isAdd: !this.isEdit }, true);
            var isReactCompiler = this.parent.isReact && typeof (this.parent.editSettings.template) !== 'string' &&
                !(this.parent.editSettings.template.prototype &&
                    this.parent.editSettings.template.prototype.CSPTemplate);
            var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                this.parent.parentDetails.parentInstObj.isReact;
            if (isReactCompiler || isReactChild) {
                this.parent.getEditTemplate()(dummyData, this.parent, 'editSettingsTemplate', editTemplateID, null, null, form);
                this.parent.renderTemplates();
            }
            else {
                appendChildren(form, this.parent.getEditTemplate()(dummyData, this.parent, 'editSettingsTemplate', editTemplateID, null, null, null, gObj.root));
            }
            var setRules = function () {
                var columns = _this.parent.getColumns();
                for (var i = 0; i < columns.length; i++) {
                    if (columns[parseInt(i.toString(), 10)].validationRules) {
                        _this.parent.editModule.formObj.rules[columns[parseInt(i.toString(), 10)].field] =
                            columns[parseInt(i.toString(), 10)].validationRules;
                    }
                }
            };
            updateBlazorTemplate(editTemplateID, 'Template', this.parent.editSettings, true, setRules);
            div.appendChild(form);
            return div;
        }
        var table = this.parent.createElement('table', { className: literals.table, attrs: { cellspacing: '6px', role: 'grid' } });
        var tbody = this.parent.createElement(literals.tbody, { attrs: { role: 'rowgroup' } });
        var cols = gObj.getColumns();
        for (var i = 0; i < cols.length; i++) {
            if (this.parent.editModule.checkColumnIsGrouped(cols[parseInt(i.toString(), 10)]) || cols[parseInt(i.toString(), 10)].commands
                || cols[parseInt(i.toString(), 10)].commandsTemplate || cols[parseInt(i.toString(), 10)].type === 'checkbox') {
                continue;
            }
            var tr = this.parent.createElement('tr', { attrs: { role: 'row' } });
            var dataCell = this.parent.createElement('td', { className: literals.rowCell });
            dataCell.style.cssText = "text-align: " + (this.parent.enableRtl ? 'right' : 'left') + "; width: 190px;";
            elements[cols[parseInt(i.toString(), 10)].uid].classList.remove('e-input');
            dataCell.appendChild(elements[cols[parseInt(i.toString(), 10)].uid]);
            tr.appendChild(dataCell);
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
        form.appendChild(table);
        div.appendChild(form);
        return div;
    };
    DialogEditRender.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.dialogDestroy, this.destroy);
        this.parent.off(events.destroy, this.destroy);
    };
    return DialogEditRender;
}());
export { DialogEditRender };
