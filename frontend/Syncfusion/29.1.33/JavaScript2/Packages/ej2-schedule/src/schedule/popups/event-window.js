/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, isNullOrUndefined, addClass, remove, EventHandler, extend, append, detach } from '@syncfusion/ej2-base';
import { cldrData, removeClass, getValue, getDefaultDateObject, closest, SanitizeHtmlHelper, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { Query, Deferred } from '@syncfusion/ej2-data';
import { CheckBox, Button } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';
import { DropDownList, MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Input } from '@syncfusion/ej2-inputs';
import { DateTimePicker } from '@syncfusion/ej2-calendars';
import { FieldValidator } from './form-validator';
import { RecurrenceEditor } from '../../recurrence-editor/recurrence-editor';
import * as cls from '../base/css-constant';
import * as event from '../base/constant';
import * as util from '../base/util';
var EVENT_FIELD = 'e-field';
var REPEAT_CONTAINER_CLASS = 'e-recurrence-container';
var REPEAT_BUTTON_ICON_CLASS = 'e-recurrence-edit';
var REPEAT_BUTTON_CLASS = 'e-recurrence-edit-button';
var REPEAT_DIALOG_CLASS = 'e-recurrence-dialog';
var HIDE_STYLE_CLASS = 'e-hide';
/**
 * Event editor window
 */
var EventWindow = /** @class */ (function () {
    function EventWindow(parent) {
        this.parent = parent;
        this.l10n = this.parent.localeObj;
        this.fields = this.parent.eventFields;
        this.eventWindowTime = { startTime: new Date(), endTime: new Date() };
        this.renderEventWindow();
    }
    EventWindow.prototype.renderEventWindow = function () {
        this.element = createElement('div', { id: this.parent.element.id + '_dialog_wrapper' });
        this.parent.element.appendChild(this.element);
        var dialogModel = {
            animationSettings: { effect: 'Zoom' },
            content: this.getEventWindowContent(),
            cssClass: cls.EVENT_WINDOW_DIALOG_CLASS,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            height: this.parent.isAdaptive ? '100%' : 'auto',
            minHeight: '300px',
            isModal: true,
            showCloseIcon: this.parent.isAdaptive ? false : true,
            target: document.body,
            visible: false,
            width: '500px',
            beforeOpen: this.onBeforeOpen.bind(this),
            beforeClose: this.onBeforeClose.bind(this)
        };
        if (this.parent.isAdaptive) {
            dialogModel.cssClass = cls.EVENT_WINDOW_DIALOG_CLASS + ' ' + cls.DEVICE_CLASS;
            if (!this.parent.editorHeaderTemplate) {
                dialogModel.header = '<div class="e-title-header"><div class="e-back-icon e-icons"></div><div class="e-title-text">' +
                    this.l10n.getConstant('newEvent') + '</div><div class="e-save-icon e-icons"></div></div>';
            }
        }
        else {
            if (!this.parent.editorFooterTemplate) {
                this.renderDialogButtons(dialogModel);
            }
            if (!this.parent.editorHeaderTemplate) {
                dialogModel.header = '<div class="e-title-text">' + this.l10n.getConstant('newEvent') + '</div>';
            }
        }
        this.dialogObject = new Dialog(dialogModel, this.element);
        if (this.dialogObject.element.querySelector('.e-dlg-closeicon-btn')) {
            this.dialogObject.element.querySelector('.e-dlg-closeicon-btn').setAttribute('title', this.l10n.getConstant('close'));
        }
        this.addEventHandlers();
        addClass([this.element.parentElement], cls.EVENT_WINDOW_DIALOG_CLASS + '-container');
        EventHandler.add(this.dialogObject.element, 'keydown', this.preventEventSave, this);
        this.applyFormValidation();
    };
    EventWindow.prototype.renderDialogButtons = function (dialogButton) {
        dialogButton.buttons = [{
                buttonModel: {
                    content: this.l10n.getConstant('deleteButton'), cssClass: cls.DELETE_EVENT_CLASS,
                    disabled: !this.parent.eventSettings.allowDeleting || this.parent.readonly
                },
                click: this.eventDelete.bind(this)
            }, {
                buttonModel: {
                    content: this.l10n.getConstant('saveButton'), cssClass: 'e-primary ' + cls.EVENT_WINDOW_SAVE_BUTTON_CLASS,
                    isPrimary: true, disabled: !this.parent.eventSettings.allowAdding || this.parent.readonly
                },
                click: this.eventSave.bind(this)
            }, {
                buttonModel: { cssClass: cls.EVENT_WINDOW_CANCEL_BUTTON_CLASS, content: this.l10n.getConstant('cancelButton') },
                click: this.dialogClose.bind(this)
            }];
    };
    EventWindow.prototype.addEventHandlers = function () {
        var backIcon = this.element.querySelector('.' + cls.EVENT_WINDOW_BACK_ICON_CLASS);
        var saveIcon = this.element.querySelector('.' + cls.EVENT_WINDOW_SAVE_ICON_CLASS);
        if (this.parent.isAdaptive && !isNullOrUndefined(backIcon) && !isNullOrUndefined(saveIcon)) {
            EventHandler.add(backIcon, 'click', this.dialogClose, this);
            EventHandler.add(saveIcon, 'click', this.eventSave, this);
        }
    };
    EventWindow.prototype.refresh = function () {
        this.destroy(true);
        this.renderEventWindow();
    };
    EventWindow.prototype.refreshRecurrenceEditor = function () {
        if (this.recurrenceEditor) {
            var recurrenceEditor = this.recurrenceEditor.element;
            this.recurrenceEditor.destroy();
            this.createRecurrenceEditor(recurrenceEditor);
        }
    };
    EventWindow.prototype.setRecurrenceEditor = function (recurrenceEditor) {
        if (this.parent.editorTemplate) {
            this.recurrenceEditor = recurrenceEditor;
        }
    };
    EventWindow.prototype.openEditor = function (data, type, isEventData, repeatType) {
        this.parent.currentAction = type;
        this.parent.removeNewEventElement();
        if (this.parent.quickPopup) {
            this.parent.quickPopup.quickPopupHide(true);
        }
        this.parent.inlineModule.removeInlineAppointmentElement();
        if (type === 'Add') {
            var eventObj = {};
            this.cellClickAction = !isEventData;
            this.parent.activeCellsData = data;
            var event_1 = data;
            if (this.cellClickAction) {
                this.convertToEventData(event_1, eventObj);
            }
            else {
                this.parent.activeCellsData = {
                    startTime: (event_1.startTime || event_1[this.fields.startTime]),
                    endTime: (event_1.endTime || event_1[this.fields.endTime]),
                    isAllDay: (event_1.isAllDay || event_1[this.fields.isAllDay]),
                    element: event_1.element,
                    groupIndex: event_1.groupIndex
                };
                eventObj = event_1;
            }
            data = eventObj;
        }
        if (!isNullOrUndefined(this.parent.editorHeaderTemplate)) {
            this.parent.resetTemplates(['editorHeaderTemplate']);
            if (this.parent.isAdaptive && !this.parent.editorFooterTemplate) {
                this.dialogObject.header = this.createAdaptiveHeaderElement(data);
            }
            else {
                this.dialogObject.header = this.getDialogHeader(data);
            }
        }
        if (!isNullOrUndefined(this.parent.editorFooterTemplate)) {
            this.parent.resetTemplates(['editorFooterTemplate']);
            this.dialogObject.footerTemplate = this.getDialogFooter(data);
        }
        if (!isNullOrUndefined(this.parent.editorHeaderTemplate) || !isNullOrUndefined(this.parent.editorFooterTemplate)) {
            this.dialogObject.dataBind();
            this.addEventHandlers();
        }
        if (!isNullOrUndefined(this.parent.editorTemplate)) {
            this.renderFormElements(this.element.querySelector('.e-schedule-form'), data, type, repeatType);
        }
        else {
            this.setEditorContent(data, type, repeatType);
        }
    };
    EventWindow.prototype.setEditorContent = function (data, type, repeatType) {
        if (!this.parent.isAdaptive && isNullOrUndefined(this.parent.editorTemplate)) {
            removeClass([this.dialogObject.element.querySelector('.e-recurrenceeditor')], cls.DISABLE_CLASS);
        }
        if (this.recurrenceEditor) {
            this.recurrenceEditor.firstDayOfWeek = this.parent.activeViewOptions.firstDayOfWeek;
        }
        switch (type) {
            case 'Add':
                this.onCellDetailsUpdate(data, repeatType);
                break;
            case 'Save':
            case 'EditOccurrence':
            case 'EditSeries':
            case 'EditFollowingEvents':
                if (type === 'EditOccurrence' && !this.parent.isAdaptive && isNullOrUndefined(this.parent.editorTemplate)) {
                    addClass([this.dialogObject.element.querySelector('.e-recurrenceeditor')], cls.DISABLE_CLASS);
                }
                this.cellClickAction = false;
                this.onEventDetailsUpdate(data);
                break;
        }
    };
    EventWindow.prototype.setDialogContent = function () {
        this.dialogObject.content = this.getEventWindowContent();
        this.dialogObject.dataBind();
        this.applyFormValidation();
    };
    EventWindow.prototype.setDialogHeader = function () {
        if (!isNullOrUndefined(this.parent.editorHeaderTemplate)) {
            this.parent.resetTemplates(['editorHeaderTemplate']);
            if (this.parent.isAdaptive && !this.parent.editorFooterTemplate) {
                this.dialogObject.header = this.createAdaptiveHeaderElement();
            }
            else {
                this.dialogObject.header = this.getDialogHeader();
            }
        }
        else if (this.parent.isAdaptive) {
            this.dialogObject.header = '<div class="e-title-header"><div class="e-back-icon e-icons"></div><div class="e-title-text">' +
                this.l10n.getConstant('newEvent') + '</div><div class="e-save-icon e-icons"></div></div>';
        }
        else {
            this.dialogObject.header = '<div class="e-title-text">' + this.l10n.getConstant('newEvent') + '</div>';
        }
        this.dialogObject.dataBind();
        this.addEventHandlers();
    };
    EventWindow.prototype.setDialogFooter = function () {
        if (!isNullOrUndefined(this.parent.editorFooterTemplate)) {
            this.parent.resetTemplates(['editorFooterTemplate']);
            this.dialogObject.footerTemplate = this.getDialogFooter();
        }
        else if (!this.parent.isAdaptive && isNullOrUndefined(this.parent.editorFooterTemplate)) {
            this.renderDialogButtons(this.dialogObject);
        }
        else if (this.parent.isAdaptive && isNullOrUndefined(this.parent.editorFooterTemplate)) {
            this.dialogObject.footerTemplate = null;
        }
        this.dialogObject.dataBind();
    };
    EventWindow.prototype.createAdaptiveHeaderElement = function (data) {
        var header = createElement('div', { className: 'e-title-header' });
        var headerBackIcon = createElement('div', { className: 'e-back-icon e-icons' });
        header.appendChild(headerBackIcon);
        var headerTemplate = this.getDialogHeader(data);
        header.appendChild(headerTemplate);
        var headerSaveIcon = createElement('div', { className: 'e-save-icon e-icons' });
        header.appendChild(headerSaveIcon);
        return header;
    };
    EventWindow.prototype.getDialogHeader = function (args) {
        var headerTemplate = [];
        var headerTemplateId = this.parent.element.id + '_editorHeaderTemplate';
        var temHeaderDiv = document.createElement('div');
        headerTemplate = [].slice.call(this.parent.getEditorHeaderTemplate()(args || {}, this.parent, 'editorHeaderTemplate', headerTemplateId, false));
        append(headerTemplate, temHeaderDiv);
        return temHeaderDiv;
    };
    EventWindow.prototype.getDialogFooter = function (args) {
        var footerTemplate = [];
        var footerTemplateId = this.parent.element.id + '_editorFooterTemplate';
        var temFooterDiv = document.createElement('div');
        footerTemplate = [].slice.call(this.parent.getEditorFooterTemplate()(args || {}, this.parent, 'editorFooterTemplate', footerTemplateId, false));
        append(footerTemplate, temFooterDiv);
        return temFooterDiv;
    };
    EventWindow.prototype.preventEventSave = function (e) {
        if (this.parent && !this.parent.allowKeyboardInteraction && e.code === 'Enter') {
            this.isEnterKey = true;
        }
    };
    EventWindow.prototype.onBeforeOpen = function (args) {
        var _this = this;
        var endTime = this.eventData[this.fields.endTime].getTime();
        var eventProp = {
            type: 'Editor',
            data: this.eventData,
            cancel: false,
            element: this.element,
            target: (this.cellClickAction ? this.parent.activeCellsData.element : this.parent.activeEventData.element)
        };
        if (this.cellClickAction) {
            eventProp.duration = this.getSlotDuration();
        }
        var saveObj = this.getInstance(cls.EVENT_WINDOW_SAVE_BUTTON_CLASS);
        if (saveObj) {
            saveObj.disabled = !(this.cellClickAction ? this.parent.eventSettings.allowAdding : this.parent.eventSettings.allowEditing);
            saveObj.dataBind();
        }
        var deleteObj = this.getInstance(cls.DELETE_EVENT_CLASS);
        if (deleteObj) {
            deleteObj.disabled = !this.parent.eventSettings.allowDeleting;
            deleteObj.dataBind();
        }
        var callBackPromise = new Deferred();
        this.parent.trigger(event.popupOpen, eventProp, function (popupArgs) {
            args.cancel = popupArgs.cancel;
            args.maxHeight = _this.parent.isAdaptive ? 'max-content' : args.maxHeight;
            _this.duration = _this.cellClickAction ? popupArgs.duration : null;
            if (_this.eventData[_this.fields.endTime].getTime() === endTime && !_this.cellClickAction &&
                _this.eventData[_this.fields.endTime].getHours() === 0 &&
                _this.eventData[_this.fields.endTime].getMinutes() === 0) {
                _this.eventData = extend({}, _this.eventData, null, true);
                _this.trimAllDay(_this.eventData);
            }
            _this.refreshDateTimePicker(_this.duration);
            if (_this.cellClickAction && popupArgs.duration !== _this.getSlotDuration() && isNullOrUndefined(_this.parent.editorTemplate)) {
                var startObj = _this.getInstance(cls.EVENT_WINDOW_START_CLASS);
                var endObj = _this.getInstance(cls.EVENT_WINDOW_END_CLASS);
                endObj.value = new Date(startObj.value.getTime() + (util.MS_PER_MINUTE * popupArgs.duration));
                endObj.dataBind();
            }
            if (_this.parent.editorTemplate && _this.element.querySelector('.e-recurrenceeditor') && !_this.recurrenceEditor) {
                _this.recurrenceEditor = _this.getInstance('e-recurrenceeditor');
            }
            callBackPromise.resolve(args);
        });
        return callBackPromise;
    };
    EventWindow.prototype.onBeforeClose = function (args) {
        var _this = this;
        if (args.isInteracted) {
            this.isCrudAction = false;
        }
        var eventProp = {
            type: 'Editor',
            event: args.event || this.dialogEvent,
            data: this.eventCrudData,
            cancel: false,
            element: this.element,
            target: (this.cellClickAction ? this.parent.activeCellsData.element : this.parent.activeEventData.element)
        };
        var callBackPromise = new Deferred();
        this.parent.trigger(event.popupClose, eventProp, function (popupArgs) {
            args.cancel = popupArgs.cancel;
            if (!popupArgs.cancel) {
                if (_this.isCrudAction) {
                    args.cancel = _this.processCrudActions(popupArgs.data);
                    _this.isCrudAction = args.cancel;
                }
                if (!_this.isCrudAction) {
                    _this.resetForm();
                    _this.parent.eventBase.focusElement(true);
                    _this.eventCrudData = null;
                }
            }
            callBackPromise.resolve(args);
        });
        return callBackPromise;
    };
    EventWindow.prototype.getEventWindowContent = function () {
        var container = createElement('div', { className: cls.FORM_CONTAINER_CLASS });
        var form = createElement('form', {
            id: this.parent.element.id + 'EditForm',
            className: cls.FORM_CLASS,
            attrs: { onsubmit: 'return false;' }
        });
        this.renderFormElements(form);
        container.appendChild(form);
        return container;
    };
    EventWindow.prototype.renderFormElements = function (form, args, type, repeatType) {
        var _this = this;
        if (!isNullOrUndefined(this.parent.editorTemplate)) {
            if (args) {
                if (this.fieldValidator) {
                    this.fieldValidator.destroy();
                    this.fieldValidator = null;
                }
                if (this.recurrenceEditor) {
                    this.recurrenceEditor.destroy();
                    this.recurrenceEditor = null;
                }
                this.destroyComponents();
                this.parent.resetTemplates(['editorTemplate']);
                EventHandler.clearEvents(form);
                if (!this.parent.isReact) {
                    var formElements = [].slice.call(form.children);
                    for (var _i = 0, formElements_1 = formElements; _i < formElements_1.length; _i++) {
                        var element = formElements_1[_i];
                        remove(element);
                    }
                }
            }
            var templateId = this.parent.element.id + '_editorTemplate';
            var tempEle = [].slice.call(this.parent.getEditorTemplate()(args || {}, this.parent, 'editorTemplate', templateId, false));
            append(tempEle, form);
            this.parent.renderTemplates(function () {
                if (_this.element) {
                    _this.applyFormValidation();
                    if (args) {
                        _this.setEditorContent(args, type, repeatType);
                    }
                }
            });
        }
        else {
            form.appendChild(this.getDefaultEventWindowContent());
            if (args) {
                this.setEditorContent(args, type, repeatType);
            }
        }
    };
    EventWindow.prototype.getDefaultEventWindowContent = function () {
        var parentDiv = this.createDivElement(cls.EVENT_WINDOW_DIALOG_PARENT_CLASS);
        var titleLocationDiv = this.createDivElement(cls.EVENT_WINDOW_TITLE_LOCATION_DIV_CLASS);
        parentDiv.appendChild(titleLocationDiv);
        titleLocationDiv.appendChild(this.renderTextBox(cls.SUBJECT_CLASS));
        titleLocationDiv.appendChild(this.renderTextBox(cls.LOCATION_CLASS));
        var startEndDateTimeDiv = this.createDivElement(cls.EVENT_WINDOW_START_END_DIV_CLASS);
        parentDiv.appendChild(startEndDateTimeDiv);
        startEndDateTimeDiv.appendChild(this.renderDateTimePicker(cls.EVENT_WINDOW_START_CLASS, this.onTimeChange.bind(this)));
        startEndDateTimeDiv.appendChild(this.renderDateTimePicker(cls.EVENT_WINDOW_END_CLASS));
        var allDayTimezoneDiv = this.createDivElement(cls.EVENT_WINDOW_ALLDAY_TZ_DIV_CLASS);
        parentDiv.appendChild(allDayTimezoneDiv);
        allDayTimezoneDiv.appendChild(this.renderCheckBox(cls.EVENT_WINDOW_ALL_DAY_CLASS));
        allDayTimezoneDiv.appendChild(this.renderCheckBox(cls.TIME_ZONE_CLASS));
        var timezoneParentDiv = this.createDivElement(cls.EVENT_WINDOW_TIME_ZONE_DIV_CLASS);
        parentDiv.appendChild(timezoneParentDiv);
        timezoneParentDiv.appendChild(this.renderDropDown(cls.EVENT_WINDOW_START_TZ_CLASS));
        timezoneParentDiv.appendChild(this.renderDropDown(cls.EVENT_WINDOW_END_TZ_CLASS));
        var repeatParentDiv = this.createDivElement(cls.EVENT_WINDOW_REPEAT_DIV_CLASS);
        parentDiv.appendChild(repeatParentDiv);
        var repeatDiv = this.renderCheckBox(cls.EVENT_WINDOW_REPEAT_CLASS);
        var repeatEditContainer = createElement('span', { className: REPEAT_CONTAINER_CLASS });
        var button = createElement('button', {
            className: REPEAT_BUTTON_CLASS,
            attrs: { type: 'button', 'title': this.l10n.getConstant('editRecurrence') }
        });
        this.buttonObj = new Button({ iconCss: REPEAT_BUTTON_ICON_CLASS + ' e-icons', cssClass: 'e-medium ' + this.parent.cssClass });
        repeatEditContainer.appendChild(button);
        this.buttonObj.appendTo(button);
        repeatDiv.appendChild(repeatEditContainer);
        repeatParentDiv.appendChild(repeatDiv);
        if (this.parent.isAdaptive) {
            EventHandler.add(button, 'click', this.loadRecurrenceEditor, this);
        }
        else {
            this.createRecurrenceEditor(parentDiv);
        }
        if (this.parent.resourceCollection.length > 0) {
            var resourceParentDiv = this.createDivElement(cls.EVENT_WINDOW_RESOURCES_DIV_CLASS);
            for (var _i = 0, _a = this.parent.resourceBase.resourceCollection; _i < _a.length; _i++) {
                var resource = _a[_i];
                resourceParentDiv.appendChild(this.renderResourceDetails(resource));
            }
            parentDiv.appendChild(resourceParentDiv);
        }
        var description = this.createDivElement(cls.DESCRIPTION_CLASS + '-row');
        description.appendChild(this.renderTextBox(cls.DESCRIPTION_CLASS));
        parentDiv.appendChild(description);
        var submit = createElement('button', { attrs: { type: 'hidden', title: 'submit' } });
        submit.style.display = 'none';
        parentDiv.appendChild(submit);
        return parentDiv;
    };
    EventWindow.prototype.createRecurrenceEditor = function (parentDiv) {
        var recurrenceEditor = createElement('div', { id: this.parent.element.id + '_recurrence_editor' });
        parentDiv.appendChild(recurrenceEditor);
        this.recurrenceEditor = this.renderRecurrenceEditor();
        this.recurrenceEditor.appendTo(recurrenceEditor);
        this.updateMinMaxDateToEditor();
    };
    EventWindow.prototype.createDivElement = function (className) {
        return createElement('div', { className: className });
    };
    EventWindow.prototype.createInputElement = function (className, fieldName, type) {
        return createElement(type || 'input', {
            className: className, attrs: {
                type: 'text', name: fieldName, value: '', id: fieldName
            }
        });
    };
    EventWindow.prototype.getSlotDuration = function () {
        return this.parent.activeViewOptions.timeScale.interval / this.parent.activeViewOptions.timeScale.slotCount;
    };
    EventWindow.prototype.renderDateTimePicker = function (value, changeEvent) {
        var dateTimeDiv = this.createDivElement(value + '-container');
        var fieldName = this.getFieldName(value);
        var dateTimeInput = this.createInputElement(value + ' ' + EVENT_FIELD, fieldName);
        dateTimeDiv.appendChild(dateTimeInput);
        var dateTimePicker = new DateTimePicker({
            change: changeEvent,
            firstDayOfWeek: this.parent.activeViewOptions.firstDayOfWeek,
            calendarMode: this.parent.calendarMode,
            min: this.parent.minDate,
            max: new Date(new Date(+this.parent.maxDate).setHours(23, 59, 59)),
            cssClass: this.parent.cssClass,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            floatLabelType: 'Always',
            strictMode: true,
            timeFormat: this.parent.activeViewOptions.timeFormat,
            format: (isNullOrUndefined(this.parent.dateFormat) ?
                this.getFormat('dateFormats') : this.parent.dateFormat) + ' ' + this.parent.activeViewOptions.timeFormat,
            placeholder: this.getFieldLabel(value),
            step: this.getSlotDuration(),
            width: '100%'
        });
        dateTimePicker.appendTo(dateTimeInput);
        return dateTimeDiv;
    };
    EventWindow.prototype.refreshDateTimePicker = function (duration) {
        var elementSelector = '.' + cls.EVENT_WINDOW_START_CLASS + ',.' + cls.EVENT_WINDOW_END_CLASS;
        var startEndElement = [].slice.call(this.element.querySelectorAll(elementSelector));
        for (var _i = 0, startEndElement_1 = startEndElement; _i < startEndElement_1.length; _i++) {
            var element = startEndElement_1[_i];
            var instance = element.ej2_instances[0];
            instance.firstDayOfWeek = this.parent.activeViewOptions.firstDayOfWeek;
            instance.timeFormat = this.parent.activeViewOptions.timeFormat;
            instance.step = duration || this.getSlotDuration();
            instance.dataBind();
        }
    };
    EventWindow.prototype.onTimeChange = function () {
        var startObj = this.getInstance(cls.EVENT_WINDOW_START_CLASS);
        if (startObj.element.parentElement.classList.contains('e-input-focus')) {
            var endObj = this.getInstance(cls.EVENT_WINDOW_END_CLASS);
            var duration = 0;
            if (this.cellClickAction) {
                duration = util.MS_PER_MINUTE * this.duration;
                this.eventWindowTime.startTime = startObj.value;
            }
            else {
                duration = this.eventData[this.fields.endTime].getTime() - this.eventData[this.fields.startTime].getTime();
            }
            var endDate = (isNullOrUndefined(startObj.value)) ? null : new Date(startObj.value.getTime() + duration);
            if (this.cellClickAction) {
                this.eventWindowTime.endTime = endDate;
            }
            endObj.value = endDate;
            endObj.dataBind();
        }
        if (this.recurrenceEditor) {
            this.recurrenceEditor.updateRuleUntilDate(this.eventWindowTime.startTime);
        }
    };
    EventWindow.prototype.renderResourceDetails = function (resourceData) {
        var _this = this;
        var fieldName = resourceData.field;
        var value = 'e-' + fieldName;
        var labelValue = resourceData.title;
        var resourceDiv = this.createDivElement(value + '-container' + ' ' + 'e-resources');
        var resourceInput = this.createInputElement(value + ' ' + EVENT_FIELD, fieldName);
        resourceDiv.appendChild(resourceInput);
        var resourceTemplate = function (data) {
            return SanitizeHtmlHelper.sanitize("<div class=\"e-resource-template\">\n                <div class=\"e-resource-color\" data-resource-color=\"" + data[resourceData.colorField] + "\"></div>\n                <div class=\"e-resource-text\">" + data[resourceData.textField] + "</div></div>");
        };
        initializeCSPTemplate(resourceTemplate, resourceData);
        if (resourceData.allowMultiple) {
            var listObj = new MultiSelect({
                enableRtl: this.parent.enableRtl,
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
                cssClass: this.parent.cssClass || '',
                dataSource: resourceData.dataSource,
                change: this.onMultiselectResourceChange.bind(this),
                itemTemplate: resourceTemplate,
                fields: {
                    text: resourceData.textField,
                    value: resourceData.idField
                },
                htmlAttributes: { 'name': fieldName },
                floatLabelType: 'Always',
                placeholder: labelValue,
                popupHeight: '230px',
                popupWidth: '447px',
                mode: 'Box',
                open: function (args) {
                    Promise.resolve().then(function () {
                        _this.applyStylesAfterRender(args);
                    });
                }
            });
            listObj.appendTo(resourceInput);
        }
        else {
            var dropDownList = new DropDownList({
                cssClass: this.parent.cssClass || '',
                change: this.onDropdownResourceChange.bind(this),
                dataSource: resourceData.dataSource,
                enableRtl: this.parent.enableRtl,
                fields: {
                    text: resourceData.textField,
                    value: resourceData.idField
                },
                htmlAttributes: { 'name': fieldName },
                floatLabelType: 'Always',
                placeholder: labelValue,
                popupHeight: '230px',
                popupWidth: '447px',
                itemTemplate: resourceTemplate,
                open: function (args) {
                    Promise.resolve().then(function () {
                        _this.applyStylesAfterRender(args);
                    });
                }
            });
            dropDownList.appendTo(resourceInput);
        }
        return resourceDiv;
    };
    EventWindow.prototype.applyStylesAfterRender = function (args) {
        if (!args.popup || !args.popup.element) {
            return;
        }
        var resourceColors = args.popup.element.querySelectorAll('.e-resource-color[data-resource-color]');
        resourceColors.forEach(function (element) {
            var color = element.getAttribute('data-resource-color');
            if (color) {
                element.style.backgroundColor = color;
            }
        });
    };
    EventWindow.prototype.renderDropDown = function (value) {
        var _this = this;
        var fieldName = this.getFieldName(value);
        var timezoneDiv = this.createDivElement(value + '-container');
        var timezoneInput = this.createInputElement(value + ' ' + EVENT_FIELD, fieldName);
        timezoneDiv.appendChild(timezoneInput);
        var dropDownList = new DropDownList({
            allowFiltering: true,
            change: this.onTimezoneChange.bind(this),
            cssClass: this.parent.cssClass || '',
            dataSource: this.parent.timezoneDataSource,
            enableRtl: this.parent.enableRtl,
            fields: { text: 'Text', value: 'Value' },
            filterBarPlaceholder: this.parent.localeObj.getConstant('searchTimezone'),
            noRecordsTemplate: this.parent.localeObj.getConstant('noRecords'),
            filtering: function (e) {
                var query = new Query();
                query = (e.text !== '') ? query.where('Text', 'contains', e.text, true) : query;
                e.updateData(_this.parent.timezoneDataSource, query);
            },
            htmlAttributes: { 'title': this.getFieldLabel(value), 'name': fieldName },
            floatLabelType: 'Always',
            placeholder: this.getFieldLabel(value),
            popupHeight: '230px'
        });
        dropDownList.appendTo(timezoneInput);
        return timezoneDiv;
    };
    EventWindow.prototype.onMultiselectResourceChange = function (args) {
        if (!args.value || !this.parent.activeViewOptions.group.byGroupID || this.parent.resourceCollection.length <= 1) {
            return;
        }
        var resourceCollection = this.parent.resourceBase.resourceCollection;
        var fieldName = args.element.getAttribute('name') || this.getColumnName(args.element);
        for (var i = 0; i < resourceCollection.length; i++) {
            if (resourceCollection[parseInt(i.toString(), 10)].field === fieldName && i < resourceCollection.length - 1) {
                var resObject = this.createInstance(i);
                var datasource = [];
                var _loop_1 = function (j) {
                    var resourceModel = resourceCollection[i + 1];
                    // eslint-disable-next-line max-len
                    var filter = resourceModel.dataSource.filter(function (data) {
                        return data[resourceModel.groupIDField] === args.value[parseInt(j.toString(), 10)];
                    })[0];
                    var groupId = (!isNullOrUndefined(filter)) ?
                        filter[resourceCollection[i + 1].groupIDField] : null;
                    var filterRes = this_1.filterDatasource(i, groupId);
                    datasource = datasource.concat(filterRes);
                };
                var this_1 = this;
                for (var j = 0; j < args.value.length; j++) {
                    _loop_1(j);
                }
                resObject.dataSource = datasource;
                resObject.dataBind();
            }
        }
    };
    EventWindow.prototype.createInstance = function (index) {
        var resourceData = this.parent.resourceBase.resourceCollection[index + 1];
        var resObject = this.element.querySelector('.e-' + resourceData.field).
            ej2_instances[0];
        resObject.clear();
        return resObject;
    };
    EventWindow.prototype.onDropdownResourceChange = function (args) {
        if (!args.value || this.parent.resourceCollection.length <= 1 || !this.parent.activeViewOptions.group.byGroupID) {
            return;
        }
        var fieldName = args.element.getAttribute('name') || this.getColumnName(args.element);
        var resourceCollection = this.parent.resourceBase.resourceCollection;
        for (var i = 0; i < resourceCollection.length; i++) {
            if ((i < resourceCollection.length - 1) && resourceCollection[parseInt(i.toString(), 10)].field === fieldName) {
                var resObj = this.createInstance(i);
                var groupId = args.itemData[resourceCollection[parseInt(i.toString(), 10)].idField];
                resObj.dataSource = this.filterDatasource(i, groupId);
                resObj.dataBind();
                var resValue = (resObj.dataSource.length > 0) ?
                    resObj.dataSource[0][resourceCollection[i + 1].idField] : null;
                resObj.value = (resourceCollection[i + 1].allowMultiple) ? [resValue] : resValue;
                resObj.dataBind();
            }
        }
    };
    EventWindow.prototype.filterDatasource = function (index, groupId) {
        var resourceData = this.parent.resourceBase.resourceCollection[index + 1];
        return resourceData.dataSource.filter(function (data) {
            return data[resourceData.groupIDField] === groupId;
        });
    };
    EventWindow.prototype.onTimezoneChange = function (args) {
        var fieldName = args.element.getAttribute('name') || this.getColumnName(args.element);
        if (fieldName === this.parent.eventFields.startTimezone) {
            var startTimezoneObj = this.getInstance(cls.EVENT_WINDOW_START_TZ_CLASS);
            var endTimezoneObj = this.getInstance(cls.EVENT_WINDOW_END_TZ_CLASS);
            endTimezoneObj.value = startTimezoneObj.value;
            endTimezoneObj.dataBind();
        }
    };
    EventWindow.prototype.renderCheckBox = function (value) {
        var checkBoxDiv = this.createDivElement(value + '-container');
        var fieldName = this.getFieldName(value);
        var checkBoxInput = this.createInputElement(value + ' ' + EVENT_FIELD, fieldName);
        checkBoxDiv.appendChild(checkBoxInput);
        var checkBox = new CheckBox({
            change: this.onChange.bind(this),
            cssClass: value + ' ' + this.parent.cssClass,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            label: this.getFieldLabel(value)
        });
        checkBox.appendTo(checkBoxInput);
        checkBoxInput.setAttribute('name', fieldName);
        if (fieldName === 'Repeat') {
            this.repeatStatus = checkBox;
        }
        return checkBoxDiv;
    };
    EventWindow.prototype.renderTextBox = function (value) {
        var textBoxDiv = this.createDivElement(value + '-container');
        var fieldName = this.getFieldName(value);
        var elementType = (value === cls.DESCRIPTION_CLASS) ? 'textarea' : 'input';
        var textBoxInput = this.createInputElement(value + ' ' + EVENT_FIELD, fieldName, elementType);
        textBoxDiv.appendChild(textBoxInput);
        Input.createInput({
            element: textBoxInput,
            floatLabelType: 'Always',
            properties: {
                enableRtl: this.parent.enableRtl,
                placeholder: this.getFieldLabel(value)
            }
        });
        return textBoxDiv;
    };
    EventWindow.prototype.getFieldName = function (name) {
        var fieldName = '';
        switch (name) {
            case cls.SUBJECT_CLASS:
                fieldName = this.fields.subject;
                break;
            case cls.LOCATION_CLASS:
                fieldName = this.fields.location;
                break;
            case cls.EVENT_WINDOW_START_CLASS:
                fieldName = this.fields.startTime;
                break;
            case cls.EVENT_WINDOW_END_CLASS:
                fieldName = this.fields.endTime;
                break;
            case cls.DESCRIPTION_CLASS:
                fieldName = this.fields.description;
                break;
            case cls.EVENT_WINDOW_ALL_DAY_CLASS:
                fieldName = this.fields.isAllDay;
                break;
            case cls.EVENT_WINDOW_START_TZ_CLASS:
                fieldName = this.fields.startTimezone;
                break;
            case cls.EVENT_WINDOW_END_TZ_CLASS:
                fieldName = this.fields.endTimezone;
                break;
            case cls.TIME_ZONE_CLASS:
                fieldName = 'Timezone';
                break;
            case cls.EVENT_WINDOW_REPEAT_CLASS:
                fieldName = 'Repeat';
                break;
        }
        return fieldName;
    };
    EventWindow.prototype.getFieldLabel = function (fieldName) {
        var labelText = '';
        switch (fieldName) {
            case cls.SUBJECT_CLASS:
                labelText = this.parent.editorTitles.subject;
                break;
            case cls.LOCATION_CLASS:
                labelText = this.parent.editorTitles.location;
                break;
            case cls.DESCRIPTION_CLASS:
                labelText = this.parent.editorTitles.description;
                break;
            case cls.EVENT_WINDOW_START_CLASS:
                labelText = this.parent.editorTitles.startTime;
                break;
            case cls.EVENT_WINDOW_END_CLASS:
                labelText = this.parent.editorTitles.endTime;
                break;
            case cls.EVENT_WINDOW_START_TZ_CLASS:
                labelText = this.parent.editorTitles.startTimezone;
                break;
            case cls.EVENT_WINDOW_END_TZ_CLASS:
                labelText = this.parent.editorTitles.endTimezone;
                break;
            case cls.EVENT_WINDOW_REPEAT_CLASS:
                labelText = this.parent.editorTitles.recurrenceRule;
                break;
            case cls.EVENT_WINDOW_ALL_DAY_CLASS:
                labelText = this.parent.editorTitles.isAllDay;
                break;
            case cls.TIME_ZONE_CLASS:
                labelText = this.l10n.getConstant('timezone');
                break;
        }
        return labelText;
    };
    EventWindow.prototype.onChange = function (args) {
        if (args.event && args.event.target) {
            var targetSelector = "." + cls.EVENT_WINDOW_ALL_DAY_CLASS + ",." + cls.TIME_ZONE_CLASS + ",." + cls.EVENT_WINDOW_REPEAT_CLASS;
            var target = closest(args.event.target, targetSelector);
            if (target.classList.contains(cls.EVENT_WINDOW_ALL_DAY_CLASS)) {
                this.onAllDayChange(args.checked);
            }
            else if (target.classList.contains(cls.TIME_ZONE_CLASS)) {
                this.timezoneChangeStyle(args.checked);
            }
            else if (target.classList.contains(cls.EVENT_WINDOW_REPEAT_CLASS)) {
                this.onRepeatChange(args.checked);
            }
        }
    };
    EventWindow.prototype.renderRepeatDialog = function () {
        var element = createElement('div');
        this.repeatDialogObject = new Dialog({
            header: this.l10n.getConstant('recurrence'),
            visible: false,
            content: '<div class="e-rec-editor"></div>',
            closeOnEscape: true,
            width: '90%',
            buttons: [{
                    click: this.repeatSaveDialog.bind(this),
                    buttonModel: { content: this.l10n.getConstant('save'), cssClass: 'e-save', isPrimary: true }
                },
                { click: this.repeatCancelDialog.bind(this), buttonModel: { cssClass: 'e-cancel', content: this.l10n.getConstant('cancel') } }],
            target: this.element,
            animationSettings: { effect: 'Zoom' },
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            isModal: true,
            cssClass: REPEAT_DIALOG_CLASS,
            open: this.repeatOpenDialog.bind(this)
        });
        this.element.appendChild(element);
        this.repeatDialogObject.appendTo(element);
        this.createRecurrenceEditor(this.repeatDialogObject.element.querySelector('.e-rec-editor'));
    };
    EventWindow.prototype.loadRecurrenceEditor = function () {
        this.repeatDialogObject.show();
        if (this.recurrenceEditor && this.repeatRule) {
            this.recurrenceEditor.setRecurrenceRule(this.repeatRule);
        }
    };
    EventWindow.prototype.onRepeatChange = function (state) {
        if (state) {
            if (!this.repeatDialogObject) {
                this.renderRepeatDialog();
            }
            this.recurrenceEditor.setProperties({ startDate: this.repeatStartDate, selectedType: 0 });
            this.loadRecurrenceEditor();
        }
        else {
            if (this.repeatDialogObject) {
                this.repeatDialogObject.hide();
            }
            this.repeatRule = '';
            if (this.recurrenceEditor) {
                this.recurrenceEditor.setRecurrenceRule(this.repeatRule);
                this.updateRepeatLabel(this.repeatRule);
            }
            var element = this.element.querySelector('.' + REPEAT_CONTAINER_CLASS);
            addClass([element], HIDE_STYLE_CLASS);
        }
    };
    EventWindow.prototype.repeatSaveDialog = function () {
        this.repeatRule = this.recurrenceEditor.getRecurrenceRule();
        var element = this.element.querySelector('.' + REPEAT_CONTAINER_CLASS);
        if (this.recurrenceEditor.getRecurrenceRule()) {
            removeClass([element], HIDE_STYLE_CLASS);
        }
        else {
            addClass([element], HIDE_STYLE_CLASS);
            this.repeatStatus.setProperties({ checked: false });
        }
        this.updateRepeatLabel(this.repeatRule);
        this.closeRepeatDialog();
    };
    EventWindow.prototype.closeRepeatDialog = function () {
        this.repeatDialogObject.hide();
    };
    EventWindow.prototype.repeatCancelDialog = function () {
        this.closeRepeatDialog();
        if (this.recurrenceEditor) {
            this.recurrenceEditor.setRecurrenceRule(this.repeatTempRule);
        }
        if (!this.repeatTempRule) {
            this.repeatStatus.setProperties({ checked: false });
        }
    };
    EventWindow.prototype.repeatOpenDialog = function () {
        this.repeatTempRule = this.recurrenceEditor.getRecurrenceRule();
    };
    EventWindow.prototype.onCellDetailsUpdate = function (eventObj, repeatType) {
        if (!this.parent.eventSettings.allowAdding) {
            return;
        }
        if (this.parent.isAdaptive && repeatType && !this.repeatDialogObject) {
            this.renderRepeatDialog();
        }
        this.element.querySelector('.' + cls.FORM_CLASS).removeAttribute('data-id');
        if (isNullOrUndefined(this.parent.editorHeaderTemplate)) {
            this.element.querySelector('.' + cls.EVENT_WINDOW_TITLE_TEXT_CLASS).innerHTML = this.l10n.getConstant('newEvent');
        }
        eventObj.Timezone = false;
        this.repeatStartDate = eventObj[this.fields.startTime];
        this.repeatRule = '';
        if (!isNullOrUndefined(this.parent.eventSettings.fields.subject.default)) {
            eventObj[this.fields.subject] = this.parent.eventSettings.fields.subject.default;
        }
        if (!isNullOrUndefined(this.parent.eventSettings.fields.location.default)) {
            eventObj[this.fields.location] = this.parent.eventSettings.fields.location.default;
        }
        if (!isNullOrUndefined(this.parent.eventSettings.fields.description.default)) {
            eventObj[this.fields.description] = this.parent.eventSettings.fields.description.default;
        }
        this.showDetails(eventObj);
        if (eventObj[this.fields.recurrenceRule] && this.recurrenceEditor) {
            this.recurrenceEditor.setRecurrenceRule(eventObj[this.fields.recurrenceRule], eventObj[this.fields.startTime]);
            this.repeatRule = eventObj[this.fields.recurrenceRule];
        }
        var deleteButton = this.element.querySelector('.' + cls.DELETE_EVENT_CLASS);
        if (deleteButton) {
            addClass([deleteButton], cls.DISABLE_CLASS);
        }
        if (this.recurrenceEditor) {
            this.recurrenceEditor.setProperties({
                startDate: eventObj[this.fields.startTime],
                selectedType: !isNullOrUndefined(repeatType) ? repeatType : !isNullOrUndefined(eventObj[this.fields.recurrenceRule]) ?
                    this.recurrenceEditor.selectedType : 0
            });
            this.repeatRule = this.recurrenceEditor.value;
        }
        if (this.parent.isAdaptive && isNullOrUndefined(this.parent.editorTemplate)) {
            var element = this.element.querySelector('.' + REPEAT_CONTAINER_CLASS);
            if (eventObj[this.fields.recurrenceRule] || repeatType) {
                removeClass([element], HIDE_STYLE_CLASS);
                this.repeatStatus.setProperties({ checked: true });
            }
            else {
                addClass([element], HIDE_STYLE_CLASS);
                this.repeatStatus.setProperties({ checked: false });
            }
            this.updateRepeatLabel(this.repeatRule);
        }
        else {
            var saveButton = this.element.querySelector('.' + cls.EVENT_WINDOW_SAVE_BUTTON_CLASS);
            this.disableButton(saveButton, false);
        }
        this.dialogObject.show();
    };
    EventWindow.prototype.convertToEventData = function (cellsData, eventObj) {
        if (cellsData.subject) {
            eventObj[this.fields.subject] = cellsData.subject;
        }
        eventObj[this.fields.startTime] = cellsData.startTime;
        eventObj[this.fields.endTime] = cellsData.endTime;
        eventObj[this.fields.isAllDay] = cellsData.isAllDay;
        if (cellsData.RecurrenceRule) {
            eventObj[this.fields.recurrenceRule] = cellsData.RecurrenceRule;
        }
        if (this.parent.resourceCollection.length > 0 || this.parent.activeViewOptions.group.resources.length > 0) {
            this.parent.resourceBase.setResourceValues(eventObj);
        }
    };
    EventWindow.prototype.applyFormValidation = function () {
        var form = this.element.querySelector('.' + cls.FORM_CLASS);
        if (!form) {
            return;
        }
        var getValidationRule = function (rules) {
            return (rules && Object.keys(rules).length > 0) ? rules : undefined;
        };
        var rules = {};
        var subjectRule = getValidationRule(this.parent.eventSettings.fields.subject.validation);
        if (!isNullOrUndefined(subjectRule)) {
            rules[this.parent.eventSettings.fields.subject.name] = subjectRule;
        }
        var locationRule = getValidationRule(this.parent.eventSettings.fields.location.validation);
        if (!isNullOrUndefined(locationRule)) {
            rules[this.parent.eventSettings.fields.location.name] = locationRule;
        }
        var startTimeRule = getValidationRule(this.parent.eventSettings.fields.startTime.validation);
        if (!isNullOrUndefined(startTimeRule)) {
            rules[this.parent.eventSettings.fields.startTime.name] = startTimeRule;
        }
        var endTimeRule = getValidationRule(this.parent.eventSettings.fields.endTime.validation);
        if (!isNullOrUndefined(endTimeRule)) {
            rules[this.parent.eventSettings.fields.endTime.name] = endTimeRule;
        }
        var descriptionRule = getValidationRule(this.parent.eventSettings.fields.description.validation);
        if (!isNullOrUndefined(descriptionRule)) {
            rules[this.parent.eventSettings.fields.description.name] = descriptionRule;
        }
        if (this.fieldValidator) {
            this.fieldValidator.destroy();
            this.fieldValidator = null;
        }
        this.fieldValidator = new FieldValidator();
        this.fieldValidator.renderFormValidator(form, rules, this.element, this.parent.locale);
    };
    EventWindow.prototype.showDetails = function (eventData) {
        this.eventData = eventData;
        var eventObj = extend({}, eventData, null, true);
        var formElements = this.getFormElements(cls.EVENT_WINDOW_DIALOG_CLASS);
        if ((!this.cellClickAction || this.cellClickAction && !isNullOrUndefined(this.parent.editorTemplate)) &&
            eventObj[this.fields.endTime].getHours() === 0 && eventObj[this.fields.endTime].getMinutes() === 0) {
            this.trimAllDay(eventObj);
        }
        var keyNames = Object.keys(eventObj);
        for (var _i = 0, formElements_2 = formElements; _i < formElements_2.length; _i++) {
            var curElement = formElements_2[_i];
            var columnName = curElement.name || this.getColumnName(curElement);
            if (!isNullOrUndefined(columnName) && columnName !== '') {
                if (keyNames.indexOf(columnName) !== -1) {
                    this.setValueToElement(curElement, eventObj["" + columnName]);
                }
                else {
                    this.setDefaultValueToElement(curElement);
                }
            }
        }
        if (isNullOrUndefined(this.parent.editorTemplate)) {
            this.onAllDayChange(eventObj[this.fields.isAllDay]);
            var timezoneObj = this.getInstance(cls.TIME_ZONE_CLASS + '.' + EVENT_FIELD);
            if (!(isNullOrUndefined(eventObj[this.fields.startTimezone]) && isNullOrUndefined(eventObj[this.fields.endTimezone]))) {
                timezoneObj.checked = true;
                timezoneObj.dataBind();
            }
            this.timezoneChangeStyle(timezoneObj.checked);
            delete eventObj.Timezone;
        }
    };
    EventWindow.prototype.getColumnName = function (element) {
        var attrName = element.getAttribute('data-name') || '';
        if (attrName === '') {
            var isDropDowns = false;
            var fieldSelector = '';
            if (element.classList.contains('e-dropdownlist')) {
                fieldSelector = 'e-ddl';
                isDropDowns = true;
            }
            else if (element.classList.contains('e-multiselect')) {
                fieldSelector = 'e-multiselect';
                isDropDowns = true;
            }
            else if (element.classList.contains('e-datetimepicker')) {
                fieldSelector = 'e-datetimepicker';
            }
            else if (element.classList.contains('e-datepicker')) {
                fieldSelector = 'e-datepicker';
            }
            else if (element.classList.contains('e-checkbox')) {
                fieldSelector = 'e-checkbox';
            }
            else if (element.classList.contains('e-numerictextbox')) {
                fieldSelector = 'e-numerictextbox';
            }
            var classSelector = isDropDowns ? "." + fieldSelector + ":not(.e-control)" : "." + fieldSelector;
            var control = closest(element, classSelector) || element.querySelector("." + fieldSelector);
            if (control) {
                var attrEle = control.querySelector('[name]');
                if (attrEle) {
                    attrName = attrEle.name;
                }
            }
        }
        return attrName;
    };
    EventWindow.prototype.onAllDayChange = function (allDayStatus) {
        var startObj = this.getInstance(cls.EVENT_WINDOW_START_CLASS);
        var endObj = this.getInstance(cls.EVENT_WINDOW_END_CLASS);
        var timezoneDiv = this.element.querySelector('.e-time-zone-container');
        var format;
        if (allDayStatus) {
            format = (isNullOrUndefined(this.parent.dateFormat)) ? this.getFormat('dateFormats') : this.parent.dateFormat;
            addClass(this.element.querySelectorAll('.e-time-icon'), cls.EVENT_WINDOW_ICON_DISABLE_CLASS);
            addClass([timezoneDiv], cls.DISABLE_CLASS);
            if (this.element.querySelector('.' + cls.EVENT_WINDOW_TIME_ZONE_DIV_CLASS)) {
                removeClass([this.element.querySelector('.' + cls.EVENT_WINDOW_TIME_ZONE_DIV_CLASS)], cls.ENABLE_CLASS);
            }
            startObj.format = endObj.format = format;
        }
        else {
            format = (isNullOrUndefined(this.parent.dateFormat)) ? this.getFormat('dateFormats') + ' ' +
                this.parent.activeViewOptions.timeFormat : this.parent.dateFormat + ' ' + this.parent.activeViewOptions.timeFormat;
            removeClass(this.element.querySelectorAll('.e-time-icon'), cls.EVENT_WINDOW_ICON_DISABLE_CLASS);
            removeClass([timezoneDiv], cls.DISABLE_CLASS);
            if (this.element.querySelector('.e-checkbox-wrapper .e-time-zone').checked) {
                addClass([this.element.querySelector('.' + cls.EVENT_WINDOW_TIME_ZONE_DIV_CLASS)], cls.ENABLE_CLASS);
            }
            startObj.format = endObj.format = format;
        }
        if (this.cellClickAction) {
            this.updateDateTime(allDayStatus, startObj, endObj);
        }
        startObj.dataBind();
        endObj.dataBind();
        if (!isNullOrUndefined(this.recurrenceEditor)) {
            this.recurrenceEditor.updateRuleUntilDate(startObj.value);
        }
    };
    EventWindow.prototype.updateDateTime = function (allDayStatus, startObj, endObj) {
        var startDate;
        var endDate;
        if (allDayStatus) {
            startDate = util.resetTime(new Date(this.eventWindowTime.startTime.getTime()));
            if (this.parent.activeCellsData.isAllDay) {
                var temp = util.addDays(new Date(this.eventWindowTime.endTime.getTime()), -1).getTime();
                endDate = (+this.eventWindowTime.startTime > temp) ? this.eventWindowTime.endTime : new Date(temp);
            }
            else {
                endDate = util.resetTime(new Date(this.eventWindowTime.endTime.getTime()));
            }
        }
        else {
            var start = this.parent.activeCellsData.startTime;
            startDate = new Date(this.eventWindowTime.startTime.getTime());
            startDate.setHours(start.getHours(), start.getMinutes(), start.getSeconds());
            if (this.parent.activeCellsData.isAllDay) {
                var startHour = this.parent.getStartEndTime(this.parent.workHours.start);
                startDate.setHours(startHour.getHours(), startHour.getMinutes(), startHour.getSeconds());
                endDate = new Date(startDate.getTime());
                endDate.setMilliseconds(util.MS_PER_MINUTE * this.getSlotDuration());
            }
            else {
                endDate = new Date(startDate.getTime());
                endDate.setMilliseconds(this.parent.activeCellsData.endTime.getTime() - this.parent.activeCellsData.startTime.getTime());
            }
        }
        this.eventWindowTime = { startTime: new Date(startDate.getTime()), endTime: new Date(endDate.getTime()) };
        startObj.value = startDate;
        endObj.value = endDate;
        startObj.dataBind();
        endObj.dataBind();
    };
    EventWindow.prototype.getFormat = function (formatType) {
        var format;
        if (isNullOrUndefined(this.parent.locale) || this.parent.locale === 'en' || this.parent.locale === 'en-US') {
            format = getValue(formatType + '.short', getDefaultDateObject(this.parent.getCalendarMode()));
        }
        else {
            format = getValue("main." + this.parent.locale + ".dates.calendars." + this.parent.getCalendarMode() + "." + formatType + ".short", cldrData);
        }
        return format;
    };
    EventWindow.prototype.onEventDetailsUpdate = function (eventObj) {
        if (!this.parent.eventSettings.allowEditing) {
            return;
        }
        if (!this.parent.isAdaptive && isNullOrUndefined(this.parent.editorFooterTemplate)) {
            removeClass([this.element.querySelector('.' + cls.DELETE_EVENT_CLASS)], cls.DISABLE_CLASS);
        }
        if (isNullOrUndefined(this.parent.editorHeaderTemplate)) {
            this.element.querySelector('.' + cls.EVENT_WINDOW_TITLE_TEXT_CLASS).innerHTML = this.l10n.getConstant('editEvent');
        }
        this.element.querySelector('.' + cls.FORM_CLASS).setAttribute('data-id', eventObj[this.fields.id].toString());
        if (isNullOrUndefined(this.parent.editorTemplate)) {
            eventObj = extend({}, eventObj, null, true);
            var timezoneObj = this.getInstance(cls.TIME_ZONE_CLASS + '.' + EVENT_FIELD);
            var timezoneValue = void 0;
            if (eventObj[this.fields.startTimezone] || eventObj[this.fields.endTimezone]) {
                timezoneValue = true;
                this.parent.eventBase.timezoneConvert(eventObj);
            }
            else {
                timezoneValue = false;
            }
            eventObj.Timezone = timezoneValue;
            timezoneObj.checked = timezoneValue;
            timezoneObj.dataBind();
        }
        this.showDetails(eventObj);
        if (eventObj[this.fields.recurrenceRule] && this.recurrenceEditor) {
            this.recurrenceEditor.setRecurrenceRule(eventObj[this.fields.recurrenceRule], eventObj[this.fields.startTime]);
        }
        else if (!this.parent.isAdaptive && this.recurrenceEditor) {
            this.recurrenceEditor.setProperties({ startDate: eventObj[this.fields.startTime] });
            this.recurrenceEditor.setRecurrenceRule('');
        }
        this.repeatStartDate = eventObj[this.fields.startTime];
        this.repeatRule = '';
        if (eventObj[this.fields.recurrenceRule]) {
            if (this.recurrenceEditor) {
                this.recurrenceEditor.setRecurrenceRule(eventObj[this.fields.recurrenceRule], eventObj[this.fields.startTime]);
            }
            this.repeatRule = eventObj[this.fields.recurrenceRule];
        }
        if (this.parent.isAdaptive && isNullOrUndefined(this.parent.editorTemplate)) {
            var element = this.element.querySelector('.' + REPEAT_CONTAINER_CLASS);
            if (eventObj[this.fields.recurrenceRule]) {
                removeClass([element], HIDE_STYLE_CLASS);
                this.repeatStatus.setProperties({ checked: true });
            }
            else {
                addClass([element], HIDE_STYLE_CLASS);
                this.repeatStatus.setProperties({ checked: false });
            }
            this.updateRepeatLabel(this.repeatRule);
        }
        var isDisable = (this.parent.readonly || eventObj[this.fields.isReadonly]);
        if (!this.parent.isAdaptive) {
            var saveButton = this.element.querySelector('.' + cls.EVENT_WINDOW_SAVE_BUTTON_CLASS);
            var deleteButton = this.element.querySelector('.' + cls.DELETE_EVENT_CLASS);
            this.disableButton(saveButton, isDisable);
            this.disableButton(deleteButton, isDisable);
        }
        else {
            var saveIcon = this.element.querySelector('.' + cls.EVENT_WINDOW_SAVE_ICON_CLASS);
            if (saveIcon) {
                if (isDisable) {
                    addClass([saveIcon], cls.ICON_DISABLE_CLASS);
                }
                else {
                    removeClass([saveIcon], cls.ICON_DISABLE_CLASS);
                }
            }
        }
        this.dialogObject.show();
    };
    EventWindow.prototype.disableButton = function (element, value) {
        if (element) {
            element.ej2_instances[0].disabled = value;
        }
    };
    EventWindow.prototype.renderRecurrenceEditor = function () {
        return new RecurrenceEditor({
            calendarMode: this.parent.calendarMode,
            cssClass: this.parent.cssClass,
            dateFormat: this.parent.dateFormat,
            enableRtl: this.parent.enableRtl,
            firstDayOfWeek: this.parent.activeViewOptions.firstDayOfWeek,
            locale: this.parent.locale
        });
    };
    EventWindow.prototype.updateMinMaxDateToEditor = function () {
        var startDate = this.element.querySelector('.e-start');
        var endDate = this.element.querySelector('.e-end');
        if (startDate && endDate) {
            var startObj = startDate.ej2_instances[0];
            var endObj = endDate.ej2_instances[0];
            startObj.min = this.parent.minDate;
            startObj.max = this.parent.maxDate;
            endObj.min = this.parent.minDate;
            endObj.max = this.parent.maxDate;
            startObj.dataBind();
            endObj.dataBind();
        }
        if (this.recurrenceEditor) {
            var untilDate = this.recurrenceEditor.element.querySelector('.e-until-date');
            if (untilDate) {
                var untilObj = untilDate.ej2_instances[0];
                untilObj.min = this.parent.minDate;
                untilObj.max = this.parent.maxDate;
                untilObj.dataBind();
            }
        }
    };
    EventWindow.prototype.updateRepeatLabel = function (repeatRule) {
        if (this.parent.isAdaptive && !this.repeatDialogObject) {
            this.renderRepeatDialog();
        }
        var data = repeatRule ?
            (this.l10n.getConstant('repeats') + ' ' + this.recurrenceEditor.getRuleSummary(repeatRule)) : this.l10n.getConstant('repeat');
        this.repeatStatus.setProperties({ label: data });
    };
    EventWindow.prototype.dialogClose = function (event) {
        if (this.isEnterKey) {
            this.isEnterKey = false;
            return;
        }
        this.dialogEvent = event;
        this.isCrudAction = false;
        this.parent.activeEventData = { event: undefined, element: undefined };
        this.parent.currentAction = null;
        this.dialogObject.hide();
    };
    EventWindow.prototype.resetForm = function () {
        this.fieldValidator.destroyToolTip();
        this.resetFormFields();
        if (!this.parent.isAdaptive && this.recurrenceEditor && !this.recurrenceEditor.isDestroyed) {
            this.recurrenceEditor.resetFields();
        }
    };
    EventWindow.prototype.timezoneChangeStyle = function (value) {
        var timezoneDiv = this.element.querySelector('.' + cls.EVENT_WINDOW_TIME_ZONE_DIV_CLASS);
        var localTimezoneName = this.parent.tzModule.getLocalTimezoneName();
        if (value) {
            addClass([timezoneDiv], cls.ENABLE_CLASS);
            var startTimezoneObj = this.getInstance(cls.EVENT_WINDOW_START_TZ_CLASS);
            var endTimezoneObj = this.getInstance(cls.EVENT_WINDOW_END_TZ_CLASS);
            var timezone = startTimezoneObj.dataSource;
            if (!startTimezoneObj.value || !this.parent.timezone) {
                var found = timezone.some(function (tz) { return tz.Value === localTimezoneName; });
                if (!found) {
                    timezone.push({ Value: localTimezoneName, Text: localTimezoneName });
                    startTimezoneObj.dataSource = timezone;
                    endTimezoneObj.dataSource = timezone;
                    startTimezoneObj.dataBind();
                    endTimezoneObj.dataBind();
                }
            }
            startTimezoneObj.value = startTimezoneObj.value || this.parent.timezone || localTimezoneName;
            endTimezoneObj.value = endTimezoneObj.value || this.parent.timezone || localTimezoneName;
            startTimezoneObj.dataBind();
            endTimezoneObj.dataBind();
        }
        else {
            removeClass([timezoneDiv], cls.ENABLE_CLASS);
        }
    };
    EventWindow.prototype.resetFormFields = function () {
        var formElement = this.getFormElements(cls.EVENT_WINDOW_DIALOG_CLASS);
        for (var _i = 0, formElement_1 = formElement; _i < formElement_1.length; _i++) {
            var currentElement = formElement_1[_i];
            var columnName = currentElement.name || this.getColumnName(currentElement);
            if (!isNullOrUndefined(columnName) && columnName !== '') {
                this.setDefaultValueToElement(currentElement);
            }
        }
    };
    EventWindow.prototype.eventSave = function (event, alert) {
        if (this.isEnterKey) {
            this.isEnterKey = false;
            return;
        }
        var formElement = this.element.querySelector('.' + cls.FORM_CLASS);
        if (formElement && formElement.classList.contains('e-formvalidator') &&
            !formElement.ej2_instances[0].validate()) {
            return;
        }
        var dataCollection = this.getEventDataFromEditor();
        if (this.processEventValidation(dataCollection.tempData, alert)) {
            return;
        }
        this.eventCrudData = dataCollection.eventData;
        this.dialogEvent = event;
        this.isCrudAction = true;
        this.dialogObject.hide();
    };
    EventWindow.prototype.getEventDataFromEditor = function () {
        var eventObj = extend({}, this.getObjectFromFormData(cls.EVENT_WINDOW_DIALOG_CLASS));
        if (!eventObj.Timezone) {
            eventObj[this.fields.startTimezone] = null;
            eventObj[this.fields.endTimezone] = null;
        }
        delete eventObj.Timezone;
        delete eventObj.Repeat;
        this.setDefaultValueToObject(eventObj);
        eventObj[this.fields.recurrenceRule] = this.recurrenceEditor ? this.recurrenceEditor.getRecurrenceRule() || null : undefined;
        var tempObj = extend({}, eventObj, null, true);
        if (eventObj[this.fields.isAllDay]) {
            eventObj[this.fields.startTime] = (isNullOrUndefined(eventObj[this.fields.startTime])) ? null
                : util.resetTime(new Date(eventObj[this.fields.startTime].getTime()));
            eventObj[this.fields.endTime] = (isNullOrUndefined(eventObj[this.fields.endTime])) ? null
                : util.addDays(util.resetTime(new Date(eventObj[this.fields.endTime].getTime())), 1);
        }
        return { eventData: eventObj, tempData: tempObj };
    };
    EventWindow.prototype.processEventValidation = function (eventObj, alert) {
        var alertType;
        if (isNullOrUndefined(this.parent.editorTemplate)) {
            if (!eventObj[this.fields.startTime] || !eventObj[this.fields.endTime]) {
                this.parent.quickPopup.openValidationError('invalidDateError');
                return true;
            }
            if (eventObj[this.fields.startTime] > eventObj[this.fields.endTime]) {
                this.parent.quickPopup.openValidationError('startEndError');
                return true;
            }
        }
        if (this.recurrenceEditor && this.recurrenceEditor.value && this.recurrenceEditor.value !== '') {
            if (this.parent.currentAction !== 'EditOccurrence') {
                alertType = this.recurrenceValidation(eventObj[this.fields.startTime], eventObj[this.fields.endTime], alert);
            }
            var isShowAlert = true;
            if (alertType === 'seriesChangeAlert' && this.parent.uiStateValues.isIgnoreOccurrence) {
                isShowAlert = false;
            }
            if (!isNullOrUndefined(alertType) && isShowAlert
                && ((!this.parent.enableRecurrenceValidation && alertType === 'wrongPattern') || this.parent.enableRecurrenceValidation)) {
                this.parent.quickPopup.openRecurrenceValidationAlert(alertType);
                return true;
            }
        }
        return false;
    };
    EventWindow.prototype.processCrudActions = function (eventObj) {
        var _this = this;
        this.parent.uiStateValues.isBlock = false;
        var resourceData = this.getResourceData(eventObj);
        var isResourceEventExpand = (this.parent.activeViewOptions.group.resources.length > 0 ||
            this.parent.resourceCollection.length > 0) && !this.parent.activeViewOptions.group.allowGroupEdit
            && !isNullOrUndefined(resourceData);
        var eventId = this.getEventIdFromForm();
        if (!isNullOrUndefined(eventId)) {
            var eveId_1 = this.parent.eventBase.getEventIDType() === 'string' ? eventId : parseInt(eventId, 10);
            var editedData = this.parent.eventsData.filter(function (data) {
                return data[_this.fields.id] === eveId_1;
            })[0];
            if (isNullOrUndefined(editedData)) {
                editedData = this.parent.blockData.filter(function (data) {
                    return data[_this.fields.id] === eveId_1;
                })[0];
            }
            eventObj = extend({}, editedData, eventObj);
            if (eventObj[this.fields.isReadonly]) {
                return false;
            }
            if (this.parent.eventBase.checkOverlap(eventObj)) {
                return true;
            }
            var currentAction = void 0;
            if (!isNullOrUndefined(editedData[this.fields.recurrenceRule])) {
                currentAction = this.parent.currentAction;
                eventObj.Guid = this.parent.activeEventData.event.Guid;
                if (this.parent.currentAction === 'EditOccurrence') {
                    if (!eventObj[this.fields.recurrenceID]) {
                        eventObj[this.fields.id] = this.parent.eventBase.getEventMaxID();
                        eventObj.Guid = this.parent.activeEventData.event.Guid;
                    }
                    else {
                        eveId_1 = eventObj[this.fields.recurrenceID];
                        currentAction = null;
                    }
                    if (this.parent.enableRecurrenceValidation && this.editOccurrenceValidation(eveId_1, eventObj)) {
                        return true;
                    }
                }
                if (this.parent.currentAction === 'EditSeries' || eventObj[this.fields.id] !== editedData[this.fields.id]) {
                    eventObj[this.fields.recurrenceID] = editedData[this.fields.id];
                }
                else if (this.parent.currentAction === 'EditFollowingEvents') {
                    eventObj[this.fields.id] = this.parent.eventBase.getEventMaxID();
                    eventObj[this.fields.followingID] = editedData[this.fields.id];
                }
            }
            if (isResourceEventExpand) {
                this.resourceSaveEvent(eventObj, 'Save', currentAction);
            }
            else {
                this.parent.saveEvent(eventObj, currentAction);
            }
        }
        else {
            this.parent.currentAction = 'Add';
            if (this.parent.eventBase.checkOverlap(eventObj)) {
                return true;
            }
            if (isResourceEventExpand) {
                this.resourceSaveEvent(eventObj, this.parent.currentAction);
            }
            else {
                eventObj[this.fields.id] = this.parent.eventBase.getEventMaxID();
                this.parent.addEvent(eventObj);
            }
        }
        return this.parent.uiStateValues.isBlock;
    };
    EventWindow.prototype.getResourceData = function (eventObj) {
        var resourceData = null;
        if (!isNullOrUndefined(this.parent.resourceBase) && !isNullOrUndefined(this.parent.resourceBase.resourceCollection)
            && this.parent.resourceBase.resourceCollection.length > 0) {
            var lastResourceData = this.parent.resourceBase.resourceCollection.slice(-1)[0];
            resourceData = eventObj[lastResourceData.field];
        }
        return resourceData;
    };
    EventWindow.prototype.getObjectFromFormData = function (className) {
        var formElement = this.getFormElements(className);
        var eventObj = {};
        for (var _i = 0, formElement_2 = formElement; _i < formElement_2.length; _i++) {
            var currentElement = formElement_2[_i];
            var columnName = currentElement.name || this.getColumnName(currentElement);
            if (!isNullOrUndefined(columnName) && columnName !== '') {
                eventObj["" + columnName] = this.getValueFromElement(currentElement);
            }
        }
        return eventObj;
    };
    EventWindow.prototype.setDefaultValueToObject = function (eventObj) {
        if (!isNullOrUndefined(eventObj[this.fields.subject])) {
            eventObj[this.fields.subject] = eventObj[this.fields.subject] || this.parent.eventSettings.fields.subject.default
                || this.l10n.getConstant('addTitle');
        }
        if (!isNullOrUndefined(eventObj[this.fields.location])) {
            eventObj[this.fields.location] = eventObj[this.fields.location] || this.parent.eventSettings.fields.location.default;
        }
        if (!isNullOrUndefined(eventObj[this.fields.description])) {
            eventObj[this.fields.description] = eventObj[this.fields.description] || this.parent.eventSettings.fields.description.default;
        }
    };
    EventWindow.prototype.recurrenceValidation = function (startDate, endDate, alert) {
        var alertMessage;
        var recEditor = this.recurrenceEditor;
        var interval = this.getInstance('e-repeat-interval.e-numerictextbox').value;
        if (alert !== this.l10n.getConstant('ok')) {
            var activeEvent = this.parent.activeEventData.event;
            var excludedEvents = [];
            if ((this.parent.currentAction === 'EditSeries' || this.parent.currentAction === 'EditFollowingEvents')
                && !isNullOrUndefined(activeEvent)) {
                var eventStartTime = activeEvent[this.parent.eventFields.startTime];
                var seriesEvents = this.parent.eventBase.getSeriesEvents(this.eventData, eventStartTime);
                if (seriesEvents.length > 0) {
                    excludedEvents = this.parent.eventBase.getEditedOccurrences(seriesEvents, eventStartTime);
                }
                else {
                    var event_2 = this.parent.eventBase.getEventById(activeEvent[this.parent.eventFields.id]);
                    excludedEvents = this.parent.eventBase.getEditedOccurrences([event_2], eventStartTime);
                }
                if (this.parent.currentAction === 'EditSeries'
                    && !isNullOrUndefined(this.eventData[this.parent.eventFields.recurrenceException])) {
                    excludedEvents.push(this.eventData);
                }
            }
            if (excludedEvents.length > 0) {
                alertMessage = 'seriesChangeAlert';
            }
            if (this.getInstance('e-end-on-left .e-ddl .e-dropdownlist').value === 'until' &&
                this.getInstance('e-end-on-date .e-datepicker').value < startDate) {
                alertMessage = 'wrongPattern';
            }
            if (isNullOrUndefined(alertMessage)) {
                var types = recEditor.value.split(';')[1].split('=')[1].split(',');
                var obj = { 'SU': 0, 'MO': 1, 'TU': 2, 'WE': 3, 'TH': 4, 'FR': 5, 'SA': 6 };
                var temp = [];
                var tempDiff = [];
                var tempValue = void 0;
                switch (recEditor.value.split(';')[0].split('=')[1]) {
                    case 'DAILY':
                        if ((((endDate.getTime() - startDate.getTime()) / (1000 * 3600)) > (interval * 24))) {
                            alertMessage = 'createError';
                        }
                        break;
                    case 'WEEKLY':
                        types = recEditor.value.split(';')[1].split('=')[1].split(',');
                        for (var index = 0; index < types.length * (interval + 1); index++) {
                            temp[parseInt(index.toString(), 10)] =
                                (types.length > index) ? obj[types[parseInt(index.toString(), 10)]] :
                                    temp[index - types.length] + (7 * interval);
                        }
                        tempValue = temp.sort(function (a, b) { return a - b; });
                        for (var index = 1; index < tempValue.length; index++) {
                            tempDiff.push(tempValue[parseInt(index.toString(), 10)] - tempValue[index - 1]);
                        }
                        if ((((endDate.getTime() - startDate.getTime()) / (1000 * 3600)) >= Math.min.apply(Math, tempDiff) * 24)
                            || isNullOrUndefined(interval)) {
                            alertMessage = 'createError';
                        }
                        break;
                    case 'MONTHLY':
                        if (endDate.getTime() >= new Date(+startDate).setMonth(startDate.getMonth() + interval)) {
                            alertMessage = 'createError';
                        }
                        break;
                    case 'YEARLY':
                        if (endDate.getTime() >= new Date(+startDate).setFullYear(startDate.getFullYear() + interval)) {
                            alertMessage = 'createError';
                        }
                        break;
                }
            }
        }
        else {
            if (endDate.getTime() >= new Date(+startDate).setMonth(startDate.getMonth() + interval)) {
                alertMessage = 'createError';
            }
            if (isNullOrUndefined(alertMessage)) {
                this.parent.quickPopup.quickDialog.hide();
            }
        }
        if (isNullOrUndefined(interval)) {
            alertMessage = 'createError';
        }
        return alertMessage;
    };
    EventWindow.prototype.getRecurrenceIndex = function (recColl, event) {
        var recIndex;
        for (var index = 0; index < recColl.length; index++) {
            if (event[this.fields.startTime].valueOf() === recColl[parseInt(index.toString(), 10)][this.fields.startTime].valueOf()) {
                recIndex = index;
                break;
            }
        }
        return recIndex;
    };
    EventWindow.prototype.trimAllDay = function (data) {
        if (data[this.fields.isAllDay]) {
            var temp = util.addDays(new Date(+data[this.fields.endTime]), -1).getTime();
            data[this.fields.endTime] = (+data[this.fields.startTime] > temp) ? data[this.fields.endTime] : new Date(temp);
        }
    };
    EventWindow.prototype.editOccurrenceValidation = function (eventId, currentData, editData) {
        var _this = this;
        if (editData === void 0) {
            editData = this.eventData;
        }
        var recurColl = this.parent.getOccurrencesByID(eventId);
        var excludedDatas = this.parent.eventsData.filter(function (data) {
            return data[_this.fields.recurrenceID] === eventId;
        });
        excludedDatas.map(function (data) { return recurColl.push(extend({}, data)); });
        currentData = extend({}, currentData);
        this.trimAllDay(currentData);
        for (var _i = 0, recurColl_1 = recurColl; _i < recurColl_1.length; _i++) {
            var data = recurColl_1[_i];
            this.trimAllDay(data);
        }
        this.parent.eventBase.sortByTime(recurColl);
        var index = this.getRecurrenceIndex(recurColl, editData);
        if (isNullOrUndefined(index)) {
            return false;
        }
        var currentStartTime = new Date(+currentData[this.fields.startTime]);
        var currentEndTime = new Date(+currentData[this.fields.endTime]);
        var nextStartTime;
        var nextEndTime;
        if (index !== recurColl.length - 1) {
            nextStartTime = new Date(+recurColl[index + 1][this.fields.startTime]);
            nextEndTime = new Date(+recurColl[index + 1][this.fields.endTime]);
        }
        var lastEndTime = new Date(+recurColl[recurColl.length - 1][this.fields.endTime]);
        if (index === 0) {
            if (!isNullOrUndefined(recurColl[index + 1])) {
                if (!(nextStartTime.getTime() >= currentEndTime.getTime()) &&
                    (util.resetTime(lastEndTime).getTime() >=
                        util.resetTime(currentStartTime).getTime()) ||
                    util.resetTime(lastEndTime).getTime() < util.resetTime(currentStartTime).getTime()) {
                    this.parent.quickPopup.openRecurrenceValidationAlert('occurrenceAlert');
                    return true;
                }
                else if (!(util.resetTime(currentStartTime).getTime() <
                    util.resetTime(nextStartTime).getTime())) {
                    this.parent.quickPopup.openRecurrenceValidationAlert('sameDayAlert');
                    return true;
                }
            }
            return false;
        }
        else {
            var previousStartTime = new Date(+recurColl[index - 1][this.fields.startTime]);
            var previousEndTime = new Date(+recurColl[index - 1][this.fields.endTime]);
            if (index === recurColl.length - 1) {
                if (util.resetTime(new Date(+recurColl[(recurColl.length - 1) - index][this.fields.startTime])).getTime() >
                    util.resetTime(currentStartTime).getTime()) {
                    this.parent.quickPopup.openRecurrenceValidationAlert('occurrenceAlert');
                    return true;
                }
                else if (!((previousEndTime.getTime() <= currentStartTime.getTime()) &&
                    (util.resetTime(currentStartTime).getTime() > util.resetTime(previousStartTime).getTime()))) {
                    this.parent.quickPopup.openRecurrenceValidationAlert('sameDayAlert');
                    return true;
                }
            }
            else if (!(((util.resetTime(previousStartTime).getTime() < util.resetTime(currentStartTime).getTime()) ||
                util.resetTime(new Date(+recurColl[0][this.fields.startTime])).getTime() >
                    util.resetTime(currentStartTime).getTime()) &&
                ((util.resetTime(nextStartTime).getTime() > util.resetTime(currentStartTime).getTime()) ||
                    (lastEndTime.getTime() < currentStartTime.getTime())))) {
                this.parent.quickPopup.openRecurrenceValidationAlert('sameDayAlert');
                return true;
            }
            else if (!(previousEndTime.getTime() <= currentStartTime.getTime() && nextStartTime.getTime() >=
                currentEndTime.getTime()) || (util.resetTime(nextEndTime).getTime() <
                util.resetTime(currentStartTime).getTime()) ||
                (util.resetTime(previousStartTime).getTime() > util.resetTime(currentEndTime).getTime()) ||
                !(util.resetTime(currentStartTime).getTime() < util.resetTime(nextStartTime).getTime())) {
                this.parent.quickPopup.openRecurrenceValidationAlert('occurrenceAlert');
                return true;
            }
        }
        return false;
    };
    EventWindow.prototype.resourceSaveEvent = function (eventObj, action, currentAction) {
        var _this = this;
        var lastResourceData = this.parent.resourceBase.resourceCollection.slice(-1)[0];
        var resourceData = eventObj[lastResourceData.field];
        resourceData = (resourceData instanceof Array) ? resourceData.reverse() : [resourceData].reverse();
        var lastLevel = this.parent.resourceBase.lastResourceLevel;
        var eventList = [];
        var _loop_2 = function (i) {
            var events = extend({}, eventObj, null, true);
            events[this_2.fields.id] = this_2.parent.eventBase.getEventMaxID();
            var temp = [];
            var addValues = function () {
                if (action === 'Save' && i === resourceData.length - 1) {
                    if (temp.length > 0) {
                        temp[0][_this.fields.id] = eventObj[_this.fields.id];
                        for (var k = 1; k < temp.length; k++) {
                            temp[parseInt(k.toString(), 10)][_this.fields.id] = _this.parent.eventBase.getEventMaxID(i);
                            eventList.push(temp[parseInt(k.toString(), 10)]);
                            _this.parent.saveEvent(temp[0], currentAction);
                        }
                    }
                    else {
                        events[_this.fields.id] = eventObj[_this.fields.id];
                        _this.parent.saveEvent(events, currentAction);
                    }
                }
                else {
                    if (temp.length > 0) {
                        for (var j = 0; j < temp.length; j++) {
                            temp[parseInt(j.toString(), 10)][_this.fields.id] = _this.parent.eventBase.getEventMaxID(j);
                            eventList.push(temp[parseInt(j.toString(), 10)]);
                        }
                    }
                    else {
                        events[_this.fields.id] = _this.parent.eventBase.getEventMaxID(i);
                        eventList.push(events);
                    }
                }
            };
            if (this_2.parent.activeViewOptions.group.byGroupID && (!isNullOrUndefined(lastLevel))) {
                var lastResource = lastResourceData.dataSource;
                var resCol = this_2.parent.resourceCollection;
                var index = void 0;
                if (resCol.length > 1) {
                    index =
                        util.findIndexInData(lastResource, lastResourceData.idField, resourceData[parseInt(i.toString(), 10)], events, resCol);
                }
                else {
                    index =
                        util.findIndexInData(lastResource, lastResourceData.idField, resourceData[parseInt(i.toString(), 10)]);
                }
                if (index < 0) {
                    return { value: void 0 };
                }
                var groupId_1 = lastResource[parseInt(index.toString(), 10)][lastResourceData.groupIDField];
                var filter = lastLevel.filter(function (obj) { return obj.resourceData[lastResourceData.idField] ===
                    resourceData[parseInt(i.toString(), 10)]; }).
                    filter(function (obj) { return obj.resourceData[lastResourceData.groupIDField] === groupId_1; })[0];
                var groupOrder = filter.groupOrder;
                for (var index_1 = 0; index_1 < this_2.parent.resourceBase.resourceCollection.length; index_1++) {
                    var field = this_2.parent.resourceBase.resourceCollection[parseInt(index_1.toString(), 10)].field;
                    events["" + field] = (groupOrder[parseInt(index_1.toString(), 10)] instanceof Array) ? groupOrder[parseInt(index_1.toString(), 10)][0] :
                        groupOrder[parseInt(index_1.toString(), 10)];
                }
                addValues();
            }
            else {
                for (var index = 0; index < this_2.parent.resourceBase.resourceCollection.length - 1; index++) {
                    var field = this_2.parent.resourceBase.resourceCollection[parseInt(index.toString(), 10)].field;
                    if (events["" + field] instanceof Array && events["" + field].length > 1) {
                        for (var k = 0; k < events["" + field].length; k++) {
                            var event_3 = extend({}, events, null, true);
                            event_3["" + field] = eventObj["" + field][parseInt(k.toString(), 10)];
                            event_3[lastResourceData.field] = resourceData[parseInt(i.toString(), 10)];
                            temp.push(event_3);
                        }
                    }
                    else {
                        if (temp.length === 0) {
                            events["" + field] = (eventObj["" + field] instanceof Array) ?
                                eventObj["" + field][0] : eventObj["" + field];
                            events[lastResourceData.field] = resourceData[parseInt(i.toString(), 10)];
                        }
                        else {
                            for (var l = 0; l < temp.length; l++) {
                                temp[parseInt(l.toString(), 10)]["" + field] = (eventObj["" + field] instanceof Array) ?
                                    eventObj["" + field][0] : eventObj["" + field];
                            }
                        }
                    }
                }
                events[lastResourceData.field] = resourceData[parseInt(i.toString(), 10)];
                addValues();
            }
        };
        var this_2 = this;
        for (var i = 0; i < resourceData.length; i++) {
            var state_1 = _loop_2(i);
            if (typeof state_1 === "object")
                return state_1.value;
        }
        if (eventList.length > 0) {
            for (var _i = 0, eventList_1 = eventList; _i < eventList_1.length; _i++) {
                var event_4 = eventList_1[_i];
                event_4[this.fields.recurrenceException] = null;
                event_4[this.fields.recurrenceID] = null;
            }
            this.parent.addEvent(eventList);
        }
    };
    EventWindow.prototype.getEventIdFromForm = function () {
        return this.element.querySelector('.' + cls.FORM_CLASS).getAttribute('data-id');
    };
    EventWindow.prototype.getFormElements = function (className) {
        var elements = [];
        if (className === cls.EVENT_WINDOW_DIALOG_CLASS) {
            elements = [].slice.call(this.element.querySelectorAll('.' + EVENT_FIELD));
        }
        else {
            elements = [].slice.call(this.parent.element.querySelectorAll('.' + className + ' .' + EVENT_FIELD));
        }
        return elements;
    };
    EventWindow.prototype.getValueFromElement = function (element) {
        var value;
        if (element.classList.contains('e-datepicker')) {
            value = element.ej2_instances[0].value;
        }
        else if (element.classList.contains('e-datetimepicker')) {
            value = element.ej2_instances[0].value;
        }
        else if (element.classList.contains('e-dropdownlist')) {
            value = element.ej2_instances[0].value;
        }
        else if (element.classList.contains('e-multiselect')) {
            value = element.ej2_instances[0].value;
        }
        else if (element.classList.contains('e-checkbox')) {
            value = element.ej2_instances[0].checked;
        }
        else if (element.classList.contains('e-numerictextbox')) {
            value = element.ej2_instances[0].value;
        }
        else {
            if (element.type === 'checkbox') {
                value = element.checked;
            }
            else {
                value = this.parent.enableHtmlSanitizer ?
                    SanitizeHtmlHelper.sanitize(element.value) : element.value;
            }
        }
        return value;
    };
    EventWindow.prototype.setValueToElement = function (element, value) {
        if (element.classList.contains('e-datepicker')) {
            var instance = element.ej2_instances[0];
            instance.value = value;
            instance.dataBind();
        }
        else if (element.classList.contains('e-datetimepicker')) {
            var instance = element.ej2_instances[0];
            if (instance.element.classList.contains(cls.EVENT_WINDOW_START_CLASS)) {
                this.eventWindowTime.startTime = new Date('' + value);
            }
            else {
                this.eventWindowTime.endTime = new Date('' + value);
            }
            instance.value = value;
            instance.dataBind();
        }
        else if (element.classList.contains('e-dropdownlist')) {
            var instance = element.ej2_instances[0];
            instance.value = value;
            instance.dataBind();
        }
        else if (element.classList.contains('e-multiselect')) {
            var instance = element.ej2_instances[0];
            instance.value = [];
            instance.value = ((value instanceof Array) ? value : [value]);
            instance.dataBind();
        }
        else if (element.classList.contains('e-checkbox')) {
            var instance = element.ej2_instances[0];
            instance.checked = value;
            instance.dataBind();
        }
        else if (element.classList.contains('e-numerictextbox')) {
            var instance = element.ej2_instances[0];
            instance.value = value;
            instance.dataBind();
        }
        else {
            if (element.type !== 'checkbox') {
                element.value = value || '';
            }
            else {
                element.checked = value;
            }
        }
    };
    EventWindow.prototype.setDefaultValueToElement = function (element) {
        if (element.classList.contains('e-datepicker')) {
            var instance = element.ej2_instances[0];
            instance.value = this.parent.getCurrentTime();
            instance.dataBind();
        }
        else if (element.classList.contains('e-datetimepicker')) {
            var instance = element.ej2_instances[0];
            var dateValue = this.parent.getCurrentTime();
            this.eventWindowTime = { startTime: dateValue, endTime: dateValue };
            instance.value = dateValue;
            instance.dataBind();
        }
        else if (element.classList.contains('e-dropdownlist')) {
            var instance = element.ej2_instances[0];
            instance.value = null;
            instance.dataBind();
        }
        else if (element.classList.contains('e-multiselect')) {
            var instance = element.ej2_instances[0];
            instance.value = [];
            instance.dataBind();
        }
        else if (element.classList.contains('e-checkbox')) {
            var instance = element.ej2_instances[0];
            instance.checked = false;
            instance.dataBind();
        }
        else if (element.classList.contains('e-numerictextbox')) {
            var instance = element.ej2_instances[0];
            instance.value = null;
            instance.dataBind();
        }
        else {
            if (element.type === 'checkbox') {
                element.checked = false;
            }
            else {
                element.value = '';
            }
        }
    };
    EventWindow.prototype.getInstance = function (className) {
        var element = this.element.querySelector('.' + className);
        return element ? element.ej2_instances[0] : null;
    };
    EventWindow.prototype.eventDelete = function (event) {
        if (this.isEnterKey) {
            this.isEnterKey = false;
            return;
        }
        switch (this.parent.currentAction) {
            case 'EditOccurrence':
                if (!isNullOrUndefined(this.parent.activeEventData.event[this.parent.eventFields.recurrenceRule])) {
                    this.parent.currentAction = 'DeleteOccurrence';
                }
                else {
                    this.parent.currentAction = 'Delete';
                }
                break;
            case 'EditSeries':
                this.parent.currentAction = 'DeleteSeries';
                break;
            case 'Save':
                this.parent.currentAction = 'Delete';
                break;
            case 'EditFollowingEvents':
                if (!isNullOrUndefined(this.parent.activeEventData.event[this.parent.eventFields.recurrenceRule])) {
                    this.parent.currentAction = 'DeleteFollowingEvents';
                }
                break;
        }
        this.dialogEvent = event;
        this.isCrudAction = false;
        this.dialogObject.hide();
        this.parent.quickPopup.openDeleteAlert();
    };
    EventWindow.prototype.getRecurrenceEditorInstance = function () {
        if (this.parent.isAdaptive && !this.repeatDialogObject) {
            this.renderRepeatDialog();
        }
        return this.recurrenceEditor;
    };
    EventWindow.prototype.destroyComponents = function () {
        var formElements = this.getFormElements(cls.EVENT_WINDOW_DIALOG_CLASS);
        for (var _i = 0, formElements_3 = formElements; _i < formElements_3.length; _i++) {
            var element = formElements_3[_i];
            var instance = void 0;
            if (element.classList.contains('e-datetimepicker')) {
                instance = element.ej2_instances;
            }
            else if (element.classList.contains('e-datepicker')) {
                instance = element.ej2_instances;
            }
            else if (element.classList.contains('e-checkbox')) {
                instance = element.ej2_instances;
            }
            else if (element.classList.contains('e-dropdownlist')) {
                instance = element.ej2_instances;
            }
            else if (element.classList.contains('e-multiselect')) {
                instance = element.ej2_instances;
            }
            else if (element.classList.contains('e-numerictextbox')) {
                instance = element.ej2_instances;
            }
            if (instance && instance[0]) {
                instance[0].destroy();
            }
        }
        if (this.buttonObj) {
            this.buttonObj.destroy();
        }
    };
    EventWindow.prototype.detachComponents = function () {
        var formElements = this.getFormElements(cls.EVENT_WINDOW_DIALOG_CLASS);
        for (var _i = 0, formElements_4 = formElements; _i < formElements_4.length; _i++) {
            var element = formElements_4[_i];
            detach(element);
        }
    };
    EventWindow.prototype.destroy = function (isIgnore) {
        if (this.parent && !this.parent.isDestroyed) {
            this.parent.resetTemplates(['editorTemplate', 'editorHeaderTemplate', 'editorFooterTemplate']);
        }
        this.destroyComponents();
        if (this.recurrenceEditor) {
            this.recurrenceEditor.destroy();
            detach(this.recurrenceEditor.element);
            this.recurrenceEditor = null;
        }
        if (this.fieldValidator) {
            this.fieldValidator.destroy();
            this.fieldValidator = null;
        }
        if (this.repeatDialogObject) {
            this.repeatDialogObject.destroy();
            this.repeatDialogObject = null;
        }
        this.detachComponents();
        if (this.dialogObject) {
            if (this.dialogObject.element) {
                var form = this.dialogObject.element.querySelector('form');
                util.removeChildren(form);
                detach(form);
                EventHandler.remove(this.dialogObject.element, 'keydown', this.preventEventSave);
            }
            this.dialogObject.destroy();
            this.dialogObject = null;
        }
        if (this.element) {
            remove(this.element);
            this.element = null;
        }
        if (!isIgnore) {
            this.l10n = null;
            this.parent = null;
            this.fields = null;
            this.buttonObj = null;
            this.repeatStatus = null;
            this.eventWindowTime = null;
            this.dialogEvent = null;
        }
    };
    return EventWindow;
}());
export { EventWindow };
