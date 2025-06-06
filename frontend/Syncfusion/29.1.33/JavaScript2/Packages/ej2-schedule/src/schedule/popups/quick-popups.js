/* eslint-disable @typescript-eslint/no-explicit-any */
import { closest, EventHandler, isNullOrUndefined, formatUnit, append } from '@syncfusion/ej2-base';
import { addClass, removeClass, createElement, remove, extend } from '@syncfusion/ej2-base';
import { Dialog, Popup, isCollide } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';
import { Input } from '@syncfusion/ej2-inputs';
import { FieldValidator } from './form-validator';
import * as event from '../base/constant';
import * as cls from '../base/css-constant';
import * as util from '../base/util';
var EVENT_FIELD = 'e-field';
/**
 * Quick Popups interactions
 */
var QuickPopups = /** @class */ (function () {
    function QuickPopups(parent) {
        this.isMultipleEventSelect = false;
        this.isCrudAction = false;
        this.parent = parent;
        this.l10n = this.parent.localeObj;
        this.fieldValidator = new FieldValidator();
        this.render();
        this.addEventListener();
    }
    QuickPopups.prototype.render = function () {
        this.renderQuickPopup();
        this.renderMorePopup();
        this.renderQuickDialog();
    };
    QuickPopups.prototype.renderQuickPopup = function () {
        var quickPopupWrapper = createElement('div', { className: cls.POPUP_WRAPPER_CLASS + ' e-popup-close', attrs: { role: 'dialog' } });
        if (this.parent.isAdaptive) {
            document.body.appendChild(quickPopupWrapper);
            addClass([quickPopupWrapper], cls.DEVICE_CLASS);
        }
        else {
            this.parent.element.appendChild(quickPopupWrapper);
        }
        this.quickPopup = new Popup(quickPopupWrapper, {
            targetType: (this.parent.isAdaptive ? 'container' : 'relative'),
            enableRtl: this.parent.enableRtl,
            open: this.quickPopupOpen.bind(this),
            close: this.quickPopupClose.bind(this),
            hideAnimation: (this.parent.isAdaptive ? { name: 'ZoomOut' } : { name: 'FadeOut', duration: 150 }),
            showAnimation: (this.parent.isAdaptive ? { name: 'ZoomIn' } : { name: 'FadeIn', duration: 150 }),
            collision: (this.parent.isAdaptive ? { X: 'fit', Y: 'fit' } :
                (this.parent.enableRtl ? { X: 'flip', Y: 'fit' } : { X: 'none', Y: 'fit' })),
            position: (this.parent.isAdaptive || this.parent.enableRtl ? { X: 'left', Y: 'top' } : { X: 'right', Y: 'top' }),
            viewPortElement: (this.parent.isAdaptive ? document.body : this.parent.element),
            zIndex: (this.parent.isAdaptive ? 1004 : 3)
        });
    };
    QuickPopups.prototype.renderMorePopup = function () {
        var moreEventPopup = "<div class=\"" + cls.MORE_EVENT_POPUP_CLASS + "\"><div class=\"" + cls.MORE_EVENT_HEADER_CLASS + "\">" +
            ("<div class=\"" + cls.MORE_EVENT_CLOSE_CLASS + "\" title=\"" + this.l10n.getConstant('close') + "\" tabindex=\"0\" role=\"button\"></div>") +
            ("<div class=\"" + cls.MORE_EVENT_DATE_HEADER_CLASS + "\"><div class=\"" + cls.MORE_EVENT_HEADER_DAY_CLASS + "\" id=\"" + this.parent.element.id + "_more_popup\"></div>") +
            ("<div class=\"" + cls.MORE_EVENT_HEADER_DATE_CLASS + " " + cls.NAVIGATE_CLASS + "\" tabindex=\"0\" role=\"link\"></div></div></div></div>");
        var moreEventWrapper = createElement('div', {
            className: cls.MORE_POPUP_WRAPPER_CLASS + ' e-popup-close',
            innerHTML: moreEventPopup
        });
        if (this.parent.isAdaptive) {
            document.body.appendChild(moreEventWrapper);
            addClass([moreEventWrapper], cls.DEVICE_CLASS);
        }
        else {
            this.parent.element.appendChild(moreEventWrapper);
        }
        this.morePopup = new Popup(moreEventWrapper, {
            targetType: (this.parent.isAdaptive ? 'container' : 'relative'),
            enableRtl: this.parent.enableRtl,
            hideAnimation: { name: 'ZoomOut', duration: 300 },
            showAnimation: { name: 'ZoomIn', duration: 300 },
            open: this.morePopupOpen.bind(this),
            close: this.morePopupClose.bind(this),
            collision: (this.parent.isAdaptive ? { X: 'fit', Y: 'fit' } :
                (this.parent.enableRtl ? { X: 'flip', Y: 'fit' } : { X: 'flip', Y: 'flip' })),
            viewPortElement: (this.parent.isAdaptive ? document.body : this.parent.element),
            zIndex: (this.parent.isAdaptive ? 1002 : 2)
        });
        this.morePopup.element.setAttribute('role', 'dialog');
        this.morePopup.element.setAttribute('aria-labelledby', this.parent.element.id + '_more_popup');
        var closeButton = this.morePopup.element.querySelector('.' + cls.MORE_EVENT_CLOSE_CLASS);
        this.renderButton('e-round', cls.ICON + ' ' + cls.CLOSE_ICON_CLASS, false, closeButton, this.closeClick);
        EventHandler.add(this.morePopup.element.querySelector('.' + cls.MORE_EVENT_HEADER_DATE_CLASS), 'click', this.navigationClick, this);
    };
    QuickPopups.prototype.renderQuickDialog = function () {
        var buttonModel = [
            { buttonModel: { cssClass: 'e-quick-alertok e-flat', isPrimary: true }, click: this.dialogButtonClick.bind(this) },
            { buttonModel: { cssClass: 'e-quick-alertcancel e-flat', isPrimary: false }, click: this.dialogButtonClick.bind(this) },
            {
                buttonModel: { cssClass: 'e-quick-dialog-cancel e-disable e-flat', isPrimary: false },
                click: this.dialogButtonClick.bind(this)
            }
        ];
        if (this.parent.eventSettings.editFollowingEvents) {
            var followingSeriesButton = {
                buttonModel: { cssClass: 'e-quick-alertfollowing e-flat', isPrimary: false }, click: this.dialogButtonClick.bind(this)
            };
            buttonModel.splice(1, 0, followingSeriesButton);
        }
        this.quickDialog = new Dialog({
            animationSettings: { effect: 'Zoom' },
            buttons: buttonModel,
            cssClass: cls.QUICK_DIALOG_CLASS,
            closeOnEscape: true,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            beforeClose: this.beforeQuickDialogClose.bind(this),
            isModal: true,
            position: { X: 'center', Y: 'center' },
            showCloseIcon: true,
            target: document.body,
            visible: false,
            width: 'auto'
        });
        var dialogElement = createElement('div', { id: this.parent.element.id + 'QuickDialog' });
        this.parent.element.appendChild(dialogElement);
        this.quickDialog.appendTo(dialogElement);
        var okButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_OK);
        if (okButton) {
            okButton.setAttribute('aria-label', this.l10n.getConstant('occurrence'));
            okButton.setAttribute('aria-label', okButton.innerHTML);
        }
        var cancelButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_CANCEL);
        if (cancelButton) {
            cancelButton.setAttribute('aria-label', this.l10n.getConstant('series'));
            cancelButton.setAttribute('aria-label', cancelButton.innerHTML);
        }
        if (this.quickDialog.element.querySelector('.e-dlg-closeicon-btn')) {
            this.quickDialog.element.querySelector('.e-dlg-closeicon-btn').setAttribute('title', this.l10n.getConstant('close'));
        }
    };
    // eslint-disable-next-line max-len
    QuickPopups.prototype.renderButton = function (className, iconName, isDisabled, element, clickEvent) {
        var buttonObj = new Button({
            cssClass: className,
            disabled: isDisabled,
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer,
            iconCss: iconName
        });
        buttonObj.appendTo(element);
        EventHandler.add(element, 'click', clickEvent, this);
        removeClass([element], cls.ICON);
    };
    QuickPopups.prototype.quickDialogClass = function (action) {
        var classList = [
            cls.QUICK_DIALOG_OCCURRENCE_CLASS, cls.QUICK_DIALOG_SERIES_CLASS, cls.QUICK_DIALOG_DELETE_CLASS,
            cls.QUICK_DIALOG_CANCEL_CLASS, cls.QUICK_DIALOG_ALERT_BTN_CLASS, cls.DISABLE_CLASS
        ];
        var okButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_OK);
        var cancelButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_CANCEL);
        var followingEventButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_FOLLOWING);
        removeClass([okButton, cancelButton], classList);
        addClass([this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_CANCEL_CLASS)], cls.DISABLE_CLASS);
        if (this.parent.eventSettings.editFollowingEvents) {
            addClass([followingEventButton], cls.DISABLE_CLASS);
            removeClass([this.quickDialog.element], cls.FOLLOWING_EVENTS_DIALOG);
        }
        switch (action) {
            case 'Recurrence':
                addClass([okButton], cls.QUICK_DIALOG_OCCURRENCE_CLASS);
                addClass([cancelButton], cls.QUICK_DIALOG_SERIES_CLASS);
                if (this.parent.eventSettings.editFollowingEvents) {
                    removeClass([followingEventButton], cls.DISABLE_CLASS);
                    addClass([this.quickDialog.element], cls.FOLLOWING_EVENTS_DIALOG);
                    addClass([followingEventButton], cls.QUICK_DIALOG_FOLLOWING_EVENTS_CLASS);
                }
                break;
            case 'Delete':
                addClass([okButton], cls.QUICK_DIALOG_DELETE_CLASS);
                addClass([cancelButton], cls.QUICK_DIALOG_CANCEL_CLASS);
                break;
            case 'Alert':
                addClass([okButton], [cls.QUICK_DIALOG_ALERT_OK, cls.QUICK_DIALOG_ALERT_BTN_CLASS]);
                addClass([cancelButton], [cls.QUICK_DIALOG_ALERT_CANCEL, cls.DISABLE_CLASS]);
                break;
        }
    };
    QuickPopups.prototype.applyFormValidation = function () {
        var form = this.quickPopup.element.querySelector('.' + cls.FORM_CLASS);
        var rules = {};
        rules[this.parent.eventSettings.fields.subject.name] = this.parent.eventSettings.fields.subject.validation;
        this.fieldValidator.renderFormValidator(form, rules, this.quickPopup.element, this.parent.locale);
    };
    QuickPopups.prototype.openRecurrenceAlert = function () {
        var editDeleteOnly = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_OK);
        if (editDeleteOnly) {
            editDeleteOnly.innerHTML = this.l10n.getConstant(this.parent.currentAction === 'Delete' ? 'deleteEvent' : 'editEvent');
            editDeleteOnly.setAttribute('aria-label', editDeleteOnly.innerHTML);
        }
        var editFollowingEventsOnly = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_FOLLOWING);
        if (editFollowingEventsOnly) {
            editFollowingEventsOnly.innerHTML = this.l10n.getConstant('editFollowingEvent');
            editFollowingEventsOnly.setAttribute('aria-label', editFollowingEventsOnly.innerHTML);
        }
        var editDeleteSeries = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_CANCEL);
        if (editDeleteSeries) {
            editDeleteSeries.innerHTML = this.l10n.getConstant(this.parent.currentAction === 'Delete' ? 'deleteSeries' : 'editSeries');
            editDeleteSeries.setAttribute('aria-label', editDeleteSeries.innerHTML);
        }
        this.quickDialog.content = this.l10n.getConstant('editContent');
        this.quickDialog.header = this.l10n.getConstant(this.parent.currentAction === 'Delete' ? 'deleteTitle' : 'editTitle');
        this.quickDialogClass('Recurrence');
        this.showQuickDialog('RecurrenceAlert');
    };
    QuickPopups.prototype.openRecurrenceValidationAlert = function (type) {
        this.quickDialogClass('Alert');
        var okButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_OK);
        okButton.innerHTML = this.l10n.getConstant('ok');
        okButton.setAttribute('aria-label', okButton.innerHTML);
        var cancelButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_CANCEL);
        cancelButton.innerHTML = this.l10n.getConstant('cancel');
        cancelButton.setAttribute('aria-label', cancelButton.innerHTML);
        this.quickDialog.header = this.l10n.getConstant('alert');
        var dialogCancel;
        switch (type) {
            case 'wrongPattern':
                addClass([cancelButton], cls.DISABLE_CLASS);
                this.quickDialog.content = this.l10n.getConstant('wrongPattern');
                break;
            case 'createError':
                addClass([cancelButton], cls.DISABLE_CLASS);
                this.quickDialog.content = this.l10n.getConstant('createError');
                break;
            case 'sameDayAlert':
                addClass([cancelButton], cls.DISABLE_CLASS);
                this.quickDialog.content = this.l10n.getConstant('sameDayAlert');
                break;
            case 'seriesChangeAlert':
                dialogCancel = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_CANCEL_CLASS);
                removeClass([cancelButton, dialogCancel], cls.DISABLE_CLASS);
                this.quickDialog.content = this.l10n.getConstant('seriesChangeAlert');
                okButton.innerHTML = this.l10n.getConstant('yes');
                cancelButton.innerHTML = this.l10n.getConstant('no');
                dialogCancel.innerHTML = this.l10n.getConstant('cancel');
                break;
            case 'occurrenceAlert':
                addClass([cancelButton], cls.DISABLE_CLASS);
                this.quickDialog.content = this.l10n.getConstant('occurenceAlert');
                break;
        }
        if ((!this.parent.enableRecurrenceValidation && type === 'wrongPattern') || this.parent.enableRecurrenceValidation) {
            this.showQuickDialog('RecurrenceValidationAlert');
        }
    };
    QuickPopups.prototype.openDeleteAlert = function () {
        if (this.parent.activeViewOptions.readonly) {
            return;
        }
        var okButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_OK);
        if (okButton) {
            okButton.innerHTML = this.l10n.getConstant('delete');
            okButton.setAttribute('aria-label', okButton.innerHTML);
        }
        var cancelButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_CANCEL);
        if (cancelButton) {
            cancelButton.innerHTML = this.l10n.getConstant('cancel');
            cancelButton.setAttribute('aria-label', cancelButton.innerHTML);
        }
        this.quickDialog.content = (this.parent.activeEventData.event.length > 1) ?
            this.l10n.getConstant('deleteMultipleContent') : this.l10n.getConstant('deleteContent');
        this.quickDialog.header = (this.parent.activeEventData.event.length > 1) ?
            this.l10n.getConstant('deleteMultipleEvent') : this.l10n.getConstant('deleteEvent');
        this.quickDialogClass('Delete');
        this.showQuickDialog('DeleteAlert');
    };
    QuickPopups.prototype.openValidationError = function (type, eventData) {
        this.quickDialog.header = this.l10n.getConstant('alert');
        this.quickDialog.content = this.l10n.getConstant(type);
        var okButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_OK);
        if (okButton) {
            okButton.innerHTML = this.l10n.getConstant('ok');
            okButton.setAttribute('aria-label', okButton.innerHTML);
        }
        var cancelButton = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_CANCEL);
        if (cancelButton) {
            cancelButton.innerHTML = this.l10n.getConstant('cancel');
            okButton.setAttribute('aria-label', cancelButton.innerHTML);
        }
        this.quickDialogClass('Alert');
        this.showQuickDialog(type === 'overlapAlert' ? 'OverlapAlert' : 'ValidationAlert', eventData);
    };
    QuickPopups.prototype.showQuickDialog = function (popupType, eventData) {
        var _this = this;
        this.quickDialog.dataBind();
        var eventProp = {
            type: popupType, cancel: false, element: this.quickDialog.element,
            data: extend({}, (eventData || this.parent.activeEventData.event), null, true)
        };
        if (!this.parent.activeViewOptions.allowOverlap) {
            eventProp.overlapEvents = this.parent.overlapAppointments;
        }
        this.parent.trigger(event.popupOpen, eventProp, function (popupArgs) {
            if (!popupArgs.cancel) {
                _this.quickDialog.show();
            }
        });
    };
    QuickPopups.prototype.createMoreEventList = function (eventCollection, groupOrder, groupIndex) {
        var _this = this;
        var fields = this.parent.eventFields;
        var moreEventContentEle = createElement('div', { className: cls.MORE_EVENT_CONTENT_CLASS });
        var moreEventWrapperEle = createElement('div', { className: cls.MORE_EVENT_WRAPPER_CLASS });
        if (eventCollection.length === 0) {
            moreEventWrapperEle = createElement('div', {
                className: cls.MORE_EVENT_CONTENT_CLASS,
                innerHTML: this.l10n.getConstant('emptyContainer')
            });
        }
        else {
            var _loop_1 = function (eventData) {
                var eventText = (eventData[fields.subject] || this_1.parent.eventSettings.fields.subject.default
                    || this_1.parent.localeObj.getConstant('addTitle'));
                var appointmentElement = createElement('div', {
                    className: cls.APPOINTMENT_CLASS,
                    attrs: {
                        'data-id': '' + eventData[fields.id],
                        'data-guid': eventData.Guid, 'role': 'button', 'tabindex': '0',
                        'aria-disabled': this_1.parent.eventBase.getReadonlyAttribute(eventData),
                        'aria-label': this_1.parent.getAnnouncementString(eventData)
                    }
                });
                if (eventData[fields.isReadonly]) {
                    addClass([appointmentElement], 'e-read-only');
                }
                var templateElement = void 0;
                if (!isNullOrUndefined(this_1.parent.activeViewOptions.eventTemplate)) {
                    var tempId = this_1.parent.element.id + '_' + this_1.parent.activeViewOptions.eventTemplateName + 'eventTemplate';
                    templateElement = this_1.parent.getAppointmentTemplate()(eventData, this_1.parent, 'eventTemplate', tempId, false, undefined, undefined, this_1.parent.root);
                    append(templateElement, appointmentElement);
                }
                else {
                    appointmentElement.appendChild(createElement('div', { className: cls.SUBJECT_CLASS }));
                    this_1.parent.sanitize(eventText, appointmentElement.firstElementChild);
                }
                if (!isNullOrUndefined(groupIndex)) {
                    appointmentElement.setAttribute('data-group-index', groupIndex);
                }
                if (!isNullOrUndefined(eventData[fields.recurrenceRule])) {
                    var iconClass = (eventData[fields.id] === eventData[fields.recurrenceID]) ?
                        cls.EVENT_RECURRENCE_ICON_CLASS : cls.EVENT_RECURRENCE_EDIT_ICON_CLASS;
                    appointmentElement.appendChild(createElement('div', { className: cls.ICON + ' ' + iconClass }));
                }
                var args = {
                    data: extend({}, eventData, null, true),
                    element: appointmentElement, cancel: false
                };
                this_1.parent.trigger(event.eventRendered, args, function (eventArgs) {
                    if (!eventArgs.cancel) {
                        moreEventWrapperEle.appendChild(appointmentElement);
                        var isPreventCrud = _this.parent.isAdaptive || _this.parent.currentView === 'Year';
                        _this.parent.eventBase.wireAppointmentEvents(appointmentElement, eventData, isPreventCrud);
                        _this.parent.eventBase.applyResourceColor(appointmentElement, eventData, 'backgroundColor', groupOrder);
                    }
                });
            };
            var this_1 = this;
            for (var _i = 0, eventCollection_1 = eventCollection; _i < eventCollection_1.length; _i++) {
                var eventData = eventCollection_1[_i];
                _loop_1(eventData);
            }
        }
        moreEventContentEle.appendChild(moreEventWrapperEle);
        return moreEventContentEle;
    };
    QuickPopups.prototype.tapHoldEventPopup = function (e) {
        var target = closest(e.target, '.' + cls.APPOINTMENT_CLASS);
        this.parent.selectedElements = [];
        this.isMultipleEventSelect = true;
        this.parent.eventBase.getSelectedEventElements(target);
        this.parent.activeEventData = this.parent.eventBase.getSelectedEvents();
        var guid = target.getAttribute('data-guid');
        var eventObj = this.parent.eventBase.getEventByGuid(guid);
        if (isNullOrUndefined(eventObj)) {
            return;
        }
        var eventTitle = (eventObj[this.parent.eventFields.subject] || this.l10n.getConstant('noTitle'));
        var eventTemplate = "<div class=\"" + cls.MULTIPLE_EVENT_POPUP_CLASS + "\"><div class=\"" + cls.POPUP_HEADER_CLASS + "\">" +
            ("<button class=\"" + cls.CLOSE_CLASS + "\" title=\"" + this.l10n.getConstant('close') + "\"></button>") +
            ("<div class=\"" + cls.SUBJECT_CLASS + "\">" + eventTitle + "</div>") +
            ("<button class=\"" + cls.EDIT_CLASS + "\" title=\"" + this.l10n.getConstant('edit') + "\"></button>") +
            ("<button class=\"" + cls.DELETE_CLASS + "\" title=\"" + this.l10n.getConstant('delete') + "\"></button></div></div>");
        this.quickPopup.element.innerHTML = eventTemplate;
        var closeIcon = this.quickPopup.element.querySelector('.' + cls.CLOSE_CLASS);
        this.renderButton('e-flat e-round e-small', cls.ICON + ' ' + cls.CLOSE_ICON_CLASS, false, closeIcon, this.closeClick);
        var readonly = this.parent.activeViewOptions.readonly || eventObj[this.parent.eventFields.isReadonly];
        var editAction = !this.parent.eventSettings.allowEditing || readonly;
        var deleteAction = !this.parent.eventSettings.allowDeleting || readonly;
        var editIcon = this.quickPopup.element.querySelector('.' + cls.EDIT_CLASS);
        if (editIcon) {
            this.renderButton('e-flat e-round e-small', cls.ICON + ' ' + cls.EDIT_ICON_CLASS, editAction, editIcon, this.editClick);
        }
        var deleteIcon = this.quickPopup.element.querySelector('.' + cls.DELETE_CLASS);
        if (deleteIcon) {
            this.renderButton('e-flat e-round e-small', cls.ICON + ' ' + cls.DELETE_ICON_CLASS, deleteAction, deleteIcon, this.deleteClick);
        }
        this.beforeQuickPopupOpen(target, this.parent.eventBase.getPageCoordinates(e));
    };
    QuickPopups.prototype.isCellBlocked = function (args) {
        var tempObj = {};
        tempObj[this.parent.eventFields.startTime] = this.parent.activeCellsData.startTime;
        tempObj[this.parent.eventFields.endTime] = this.parent.activeCellsData.endTime;
        tempObj[this.parent.eventFields.isAllDay] = this.parent.activeCellsData.isAllDay;
        if (this.parent.activeViewOptions.group.resources.length > 0) {
            var targetCell = args.element instanceof Array ? args.element[0] : args.element;
            var groupIndex = parseInt(targetCell.getAttribute('data-group-index'), 10);
            this.parent.resourceBase.setResourceValues(tempObj, isNaN(groupIndex) ? null : groupIndex);
        }
        return this.parent.eventBase.isBlockRange(tempObj);
    };
    QuickPopups.prototype.cellClick = function (args) {
        var date = new Date(args.startTime.getTime());
        if (!this.parent.showQuickInfo || !this.parent.eventSettings.allowAdding ||
            this.parent.currentView === 'MonthAgenda' || this.isCellBlocked(args) ||
            !this.parent.isMinMaxDate(new Date(date.setHours(0, 0, 0, 0)))) {
            this.quickPopupHide();
            return;
        }
        var targetEle = !isNullOrUndefined(args.event) ? args.event.target : args.element;
        if (this.parent.isAdaptive) {
            this.quickPopupHide();
            var newEventClone = this.parent.element.querySelector('.' + cls.NEW_EVENT_CLASS);
            if (isNullOrUndefined(newEventClone)) {
                newEventClone = createElement('div', {
                    className: cls.NEW_EVENT_CLASS,
                    innerHTML: "<div class=\"e-title\">+ " + this.l10n.getConstant('newEvent') + "</div>"
                });
            }
            var targetCell = closest(targetEle, '.' + cls.WORK_CELLS_CLASS + ',.' + cls.ALLDAY_CELLS_CLASS);
            if (targetCell) {
                targetCell.appendChild(newEventClone);
            }
            return;
        }
        var target = closest(targetEle, '.' + cls.WORK_CELLS_CLASS + ',.' + cls.ALLDAY_CELLS_CLASS + ',.' +
            cls.HEADER_CELLS_CLASS);
        if (isNullOrUndefined(target) || targetEle.classList.contains(cls.MORE_INDICATOR_CLASS)) {
            return;
        }
        var isSameTarget = this.quickPopup.relateTo === target;
        if (isSameTarget && this.quickPopup.element.classList.contains(cls.POPUP_OPEN)) {
            var subjectElement_1 = this.quickPopup.element.querySelector('.' + cls.SUBJECT_CLASS);
            if (subjectElement_1) {
                subjectElement_1.focus();
            }
            return;
        }
        else if (this.quickPopup.element) {
            this.destroyPopupButtons('quickPopup');
        }
        var temp = {};
        temp[this.parent.eventFields.startTime] = this.parent.activeCellsData.startTime;
        temp[this.parent.eventFields.endTime] = this.parent.activeCellsData.endTime;
        temp[this.parent.eventFields.isAllDay] = this.parent.activeCellsData.isAllDay;
        var quickCellPopup = createElement('div', { className: cls.CELL_POPUP_CLASS });
        quickCellPopup.appendChild(this.getPopupHeader('Cell', temp));
        quickCellPopup.appendChild(this.getPopupContent('Cell', args, temp));
        quickCellPopup.appendChild(this.getPopupFooter('Cell', temp));
        this.quickPopup.element.setAttribute('aria-label', this.l10n.getConstant('newEvent'));
        var subjectElement = quickCellPopup.querySelector('.' + cls.SUBJECT_CLASS);
        if (subjectElement) {
            Input.createInput({ element: subjectElement, properties: { placeholder: this.l10n.getConstant('addTitle') } });
        }
        if (!isNullOrUndefined(this.parent.eventSettings.fields.subject.default)) {
            subjectElement.value = this.parent.eventSettings.fields.subject.default;
        }
        var closeIcon = quickCellPopup.querySelector('.' + cls.CLOSE_CLASS);
        if (closeIcon) {
            this.renderButton('e-flat e-round e-small', cls.ICON + ' ' + cls.CLOSE_ICON_CLASS, false, closeIcon, this.popupClose);
        }
        var moreButton = quickCellPopup.querySelector('.' + cls.QUICK_POPUP_EVENT_DETAILS_CLASS);
        if (moreButton) {
            this.renderButton('e-flat', '', false, moreButton, this.detailsClick);
        }
        var saveButton = quickCellPopup.querySelector('.' + cls.EVENT_CREATE_CLASS);
        if (saveButton) {
            this.renderButton('e-flat e-primary', '', this.parent.activeViewOptions.readonly, saveButton, this.saveClick);
        }
        if (this.morePopup) {
            this.morePopup.hide();
        }
        this.quickPopup.content = quickCellPopup;
        this.quickPopup.relateTo = target;
        this.quickPopup.dataBind();
        this.beforeQuickPopupOpen(target, this.parent.eventBase.getPageCoordinates(args.event));
    };
    QuickPopups.prototype.isSameEventClick = function (events) {
        var isSameTarget = this.quickPopup.relateTo === closest(events.element, '.' + cls.APPOINTMENT_CLASS);
        if (isSameTarget && this.quickPopup.element.classList.contains(cls.POPUP_OPEN)) {
            var editIcon = this.quickPopup.element.querySelector('.' + cls.EDIT_CLASS);
            if (editIcon) {
                editIcon.focus();
            }
            if (!this.parent.isAdaptive) {
                var editButton = this.quickPopup.element.querySelector('.' + cls.EDIT_EVENT_CLASS);
                if (editButton) {
                    editButton.focus();
                }
            }
            return true;
        }
        return false;
    };
    QuickPopups.prototype.isQuickTemplate = function (type) {
        return this.parent.quickInfoTemplates.templateType === 'Both' || this.parent.quickInfoTemplates.templateType === type;
    };
    QuickPopups.prototype.eventClick = function (events) {
        if (this.parent.eventTooltip) {
            this.parent.eventTooltip.close();
        }
        if (!this.parent.showQuickInfo) {
            return;
        }
        if (this.parent.isAdaptive && this.isMultipleEventSelect) {
            this.updateTapHoldEventPopup(closest(events.element, '.' + cls.APPOINTMENT_CLASS));
        }
        else {
            var isSameTarget = this.isSameEventClick(events);
            this.parent.selectedElements = [];
            if (isSameTarget) {
                return;
            }
            else if (this.quickPopup.element) {
                this.destroyPopupButtons('quickPopup');
            }
            var eventData = events.event;
            var quickEventPopup = createElement('div', { className: cls.EVENT_POPUP_CLASS });
            quickEventPopup.appendChild(this.getPopupHeader('Event', eventData));
            quickEventPopup.appendChild(this.getPopupContent('Event', events, eventData));
            quickEventPopup.appendChild(this.getPopupFooter('Event', eventData));
            this.quickPopup.element.setAttribute('aria-label', this.l10n.getConstant('editEvent'));
            var readonly = this.parent.activeViewOptions.readonly || eventData[this.parent.eventFields.isReadonly];
            var editAction = !this.parent.eventSettings.allowEditing || readonly;
            var deleteAction = !this.parent.eventSettings.allowDeleting || readonly;
            var editIcon = quickEventPopup.querySelector('.' + cls.EDIT_CLASS);
            var buttonClass = 'e-flat e-round e-small';
            if (editIcon) {
                this.renderButton(buttonClass, cls.ICON + ' ' + cls.EDIT_ICON_CLASS, editAction, editIcon, this.editClick);
            }
            var deleteIcon = quickEventPopup.querySelector('.' + cls.DELETE_CLASS);
            if (deleteIcon) {
                this.renderButton(buttonClass, cls.ICON + ' ' + cls.DELETE_ICON_CLASS, deleteAction, deleteIcon, this.deleteClick);
            }
            var closeIcon = quickEventPopup.querySelector('.' + cls.CLOSE_CLASS);
            if (closeIcon) {
                this.renderButton(buttonClass, cls.ICON + ' ' + cls.CLOSE_ICON_CLASS, false, closeIcon, this.popupClose);
            }
            var editButton = quickEventPopup.querySelector('.' + cls.EDIT_EVENT_CLASS);
            if (editButton) {
                this.renderButton('e-flat e-primary', '', editAction, editButton, this.editClick);
            }
            var deleteButton = quickEventPopup.querySelector('.' + cls.DELETE_EVENT_CLASS);
            if (deleteButton) {
                this.renderButton('e-flat', '', deleteAction, deleteButton, this.deleteClick);
            }
            if (this.morePopup && !closest(events.element, '.' + cls.MORE_EVENT_WRAPPER_CLASS)) {
                this.morePopup.hide();
            }
            this.quickPopup.content = quickEventPopup;
            this.quickPopup.relateTo = this.parent.isAdaptive ? document.body :
                closest(events.element, '.' + cls.APPOINTMENT_CLASS);
            this.quickPopup.dataBind();
            this.beforeQuickPopupOpen(events.element, this.parent.eventBase.getPageCoordinates(events.originalEvent));
        }
    };
    QuickPopups.prototype.getPopupHeader = function (headerType, headerData) {
        var headerTemplate = createElement('div', { className: cls.POPUP_HEADER_CLASS });
        if (this.isQuickTemplate(headerType) && this.parent.quickInfoTemplates.header) {
            var headerArgs = extend({}, headerData, { elementType: headerType.toLowerCase() }, true);
            var templateId = this.parent.element.id;
            var headerTemp = [].slice.call(this.parent.getQuickInfoTemplatesHeader()(headerArgs, this.parent, 'header', templateId + '_headerTemplate', false));
            append([].slice.call(headerTemp), headerTemplate);
        }
        else {
            var header = void 0;
            var args = void 0;
            switch (headerType) {
                case 'Cell':
                    header = "<div class=\"" + cls.POPUP_HEADER_ICON_WRAPPER + "\"><button class=\"" + cls.CLOSE_CLASS + "\" title=" +
                        ("\"" + this.l10n.getConstant('close') + "\"></button></div>");
                    break;
                case 'Event':
                    args = this.getFormattedString(headerData);
                    header = "<div class=\"" + cls.POPUP_HEADER_ICON_WRAPPER + "\">" +
                        ("<button class=\"" + (cls.EDIT_CLASS + ' ' + cls.ICON) + "\" title=\"" + this.l10n.getConstant('edit') + "\"></button>") +
                        ("<button class=\"" + (cls.DELETE_CLASS + ' ' + cls.ICON) + "\" title=\"" + this.l10n.getConstant('delete') + "\"></button>") +
                        ("<button class=\"" + cls.CLOSE_CLASS + "\" title=\"" + this.l10n.getConstant('close') + "\"></button></div>") +
                        ("<div class=\"" + cls.SUBJECT_WRAP + "\"><div class=\"" + cls.SUBJECT_CLASS + " " + cls.TEXT_ELLIPSIS + "\" ") +
                        ("title=\"" + (args.eventSubject ? args.eventSubject.replaceAll('"', '\'') : args.eventSubject) + "\"></div></div >");
                    break;
            }
            var templateWrapper = createElement('div', { innerHTML: header });
            if (headerType === 'Event') {
                var subjectText = templateWrapper.querySelector('.' + cls.SUBJECT_CLASS);
                this.parent.sanitize(args.eventSubject, subjectText);
            }
            append([].slice.call(templateWrapper.childNodes), headerTemplate);
        }
        return headerTemplate;
    };
    QuickPopups.prototype.getPopupContent = function (type, args, data) {
        var contentTemplate = createElement('div', { className: cls.POPUP_CONTENT_CLASS });
        if (this.isQuickTemplate(type) && this.parent.quickInfoTemplates.content) {
            var contentArgs = extend({}, data, { elementType: type.toLowerCase() }, true);
            var templateId = this.parent.element.id;
            var contentTemp = [].slice.call(this.parent.getQuickInfoTemplatesContent()(contentArgs, this.parent, 'content', templateId + '_contentTemplate', false));
            append([].slice.call(contentTemp), contentTemplate);
        }
        else {
            var content = void 0;
            var cellDetails = void 0;
            var argsData = void 0;
            var resourceText = this.getResourceText(args, type.toLowerCase());
            switch (type) {
                case 'Cell':
                    cellDetails = this.getFormattedString(data);
                    content = "<table class=\"" + cls.POPUP_TABLE_CLASS + "\"><tbody><tr><td><form class=\"" + cls.FORM_CLASS + "\" onsubmit=" +
                        ("\"return false;\"><input class=\"" + cls.SUBJECT_CLASS + " " + EVENT_FIELD + "\" type=\"text\" name=") +
                        ("\"" + this.parent.eventFields.subject + "\" /></form></td></tr><tr><td><div class=\"" + cls.DATE_TIME_CLASS + "\">") +
                        ("<div class=\"" + cls.DATE_TIME_ICON_CLASS + " " + cls.ICON + "\"></div><div class=\"" + cls.DATE_TIME_DETAILS_CLASS + " ") +
                        (cls.TEXT_ELLIPSIS + "\">" + cellDetails.details + "</div></div>") +
                        ((this.parent.activeViewOptions.group.resources.length > 0 ? "<div class=\"" + cls.RESOURCE_CLASS + "\">" +
                            ("<div class=\"" + cls.RESOURCE_ICON_CLASS + " " + cls.ICON + " \"></div><div class=\"" + cls.RESOURCE_DETAILS_CLASS + " ") +
                            (cls.TEXT_ELLIPSIS + "\"></div></div>") : '') + "</td></tr></tbody></table>");
                    break;
                case 'Event':
                    argsData = this.getFormattedString(data);
                    content = '<div class="' + cls.DATE_TIME_CLASS + '"><div class="' + cls.DATE_TIME_ICON_CLASS + ' ' + cls.ICON +
                        '"></div><div class="' + cls.DATE_TIME_WRAPPER_CLASS + ' ' + cls.TEXT_ELLIPSIS + '"><div class="' +
                        cls.DATE_TIME_DETAILS_CLASS + ' ' + cls.TEXT_ELLIPSIS + '">' + argsData.details + '</div>';
                    if (data[this.parent.eventFields.recurrenceRule]) {
                        content += '<div class="' + cls.RECURRENCE_SUMMARY_CLASS + ' ' + cls.TEXT_ELLIPSIS + '">' +
                            this.getRecurrenceSummary(data) + '</div>';
                    }
                    content += '</div></div>';
                    if (data[this.parent.eventFields.location]) {
                        content += '<div class="' + cls.LOCATION_CLASS + '"><div class="' + cls.LOCATION_ICON_CLASS + ' ' +
                            cls.ICON + '"></div><div class="' + cls.LOCATION_DETAILS_CLASS + ' ' + cls.TEXT_ELLIPSIS + '"></div></div>';
                    }
                    if (data[this.parent.eventFields.startTimezone] || data[this.parent.eventFields.endTimezone]) {
                        content += '<div class="' + cls.TIME_ZONE_CLASS + '"><div class="' + cls.TIME_ZONE_ICON_CLASS + ' ' + cls.ICON +
                            '"></div><div class="' + cls.TIME_ZONE_DETAILS_CLASS + ' ' + cls.TEXT_ELLIPSIS + '">' +
                            this.getTimezone(data) + '</div></div>';
                    }
                    if (data[this.parent.eventFields.description]) {
                        content += '<div class="' + cls.DESCRIPTION_CLASS + '"><div class="' + cls.DESCRIPTION_ICON_CLASS + ' ' + cls.ICON +
                            '"></div><div class="' + cls.DESCRIPTION_DETAILS_CLASS + ' ' + cls.TEXT_ELLIPSIS + '"></div></div>';
                    }
                    if (this.parent.resourceCollection.length > 0) {
                        content += '<div class="' + cls.RESOURCE_CLASS + '"><div class="' + cls.RESOURCE_ICON_CLASS + ' ' + cls.ICON +
                            '"></div><div class="' + cls.RESOURCE_DETAILS_CLASS + ' ' + cls.TEXT_ELLIPSIS + '"></div></div>';
                    }
                    break;
            }
            var templateWrapper = createElement('div', { innerHTML: content });
            if (data[this.parent.eventFields.location]) {
                var locationDetails = templateWrapper.querySelector('.' + cls.LOCATION_DETAILS_CLASS);
                if (!isNullOrUndefined(locationDetails)) {
                    this.parent.sanitize(data[this.parent.eventFields.location], locationDetails);
                }
            }
            if (data[this.parent.eventFields.description]) {
                var descriptionDetails = templateWrapper.querySelector('.' + cls.DESCRIPTION_DETAILS_CLASS);
                if (!isNullOrUndefined(descriptionDetails)) {
                    this.parent.sanitize(data[this.parent.eventFields.description], descriptionDetails);
                }
            }
            if (resourceText) {
                var resourceDetails = templateWrapper.querySelector('.' + cls.RESOURCE_DETAILS_CLASS);
                if (!isNullOrUndefined(resourceDetails)) {
                    this.parent.sanitize(resourceText, resourceDetails);
                }
            }
            append([].slice.call(templateWrapper.childNodes), contentTemplate);
        }
        return contentTemplate;
    };
    QuickPopups.prototype.getPopupFooter = function (footerType, footerData) {
        var footerTemplate = createElement('div', { className: cls.POPUP_FOOTER_CLASS });
        if (this.isQuickTemplate(footerType) && this.parent.quickInfoTemplates.footer) {
            var footerArgs = extend({}, footerData, { elementType: footerType.toLowerCase() }, true);
            var templateId = this.parent.element.id;
            var footerTemp = [].slice.call(this.parent.getQuickInfoTemplatesFooter()(footerArgs, this.parent, 'footer', templateId + '_footerTemplate', false));
            append([].slice.call(footerTemp), footerTemplate);
        }
        else {
            var footer = void 0;
            switch (footerType) {
                case 'Cell':
                    footer = "<button class=\"" + (cls.QUICK_POPUP_EVENT_DETAILS_CLASS + ' ' + cls.TEXT_ELLIPSIS) + "\" title=" +
                        ("\"" + this.l10n.getConstant('moreDetails') + "\">" + this.l10n.getConstant('moreDetails') + "</button>") +
                        ("<button class=\"" + cls.EVENT_CREATE_CLASS + " " + cls.TEXT_ELLIPSIS + "\" title=\"" + this.l10n.getConstant('save') + "\">") +
                        (this.l10n.getConstant('save') + "</button>");
                    break;
                case 'Event':
                    footer = "" + (this.parent.isAdaptive ? '' : "<button class=\"" + cls.EDIT_EVENT_CLASS + " " +
                        (cls.TEXT_ELLIPSIS + "\" title=\"" + this.l10n.getConstant('edit') + "\">" + this.l10n.getConstant('edit') + "</button>") +
                        ("<button class=\"" + cls.DELETE_EVENT_CLASS + " " + cls.TEXT_ELLIPSIS + "\" title=\"" + this.l10n.getConstant('delete') + "\">") +
                        (this.l10n.getConstant('delete') + "</button>"));
                    break;
            }
            var templateWrapper = createElement('div', { innerHTML: footer });
            append([].slice.call(templateWrapper.childNodes), footerTemplate);
        }
        return footerTemplate;
    };
    QuickPopups.prototype.getResourceText = function (args, type) {
        if (this.parent.resourceCollection.length === 0) {
            return null;
        }
        var resourceValue = '';
        if (this.parent.activeViewOptions.group.resources.length === 0) {
            var resourceCollection_1 = this.parent.resourceBase.resourceCollection.slice(-1)[0];
            var resourceData = resourceCollection_1.dataSource;
            if (type === 'event') {
                var eventData = args.event;
                var _loop_2 = function (data) {
                    var resourceId = eventData[resourceCollection_1.field];
                    if (resourceId instanceof Array) {
                        if (resourceId.indexOf(data[resourceCollection_1.idField]) > -1) {
                            var id_1 = resourceId[resourceId.indexOf(data[resourceCollection_1.idField])];
                            var resource = resourceData.filter(function (e) {
                                return e[resourceCollection_1.idField] === id_1;
                            })[0];
                            resourceValue += (resourceValue === '') ? resource[resourceCollection_1.textField] :
                                ', ' + resource[resourceCollection_1.textField];
                        }
                    }
                    else if (data[resourceCollection_1.idField] === resourceId) {
                        resourceValue = data[resourceCollection_1.textField].toString();
                    }
                };
                for (var _i = 0, resourceData_1 = resourceData; _i < resourceData_1.length; _i++) {
                    var data = resourceData_1[_i];
                    _loop_2(data);
                }
            }
            else {
                resourceValue = resourceData[0][resourceCollection_1.textField].toString();
            }
        }
        else {
            if (type === 'event') {
                var eventData = args.event;
                var resourceData = void 0;
                var lastResource_1;
                for (var i = this.parent.resourceBase.resourceCollection.length - 1; i >= 0; i--) {
                    resourceData = eventData[this.parent.resourceBase.resourceCollection[parseInt(i.toString(), 10)].field];
                    if (!isNullOrUndefined(resourceData)) {
                        lastResource_1 = this.parent.resourceBase.resourceCollection[parseInt(i.toString(), 10)];
                        break;
                    }
                }
                if (!Array.isArray(resourceData)) {
                    resourceData = [resourceData];
                }
                var resNames_1 = [];
                var lastResourceData_1 = lastResource_1.dataSource;
                resourceData.forEach(function (value) {
                    var text;
                    var i = util.findIndexInData(lastResourceData_1, lastResource_1.idField, value);
                    if (i > -1) {
                        text = lastResourceData_1[parseInt(i.toString(), 10)][lastResource_1.textField];
                    }
                    if (text) {
                        resNames_1.push(text);
                    }
                });
                resourceValue = resNames_1.join(', ');
            }
            else {
                var argsData = args;
                var groupIndex = !isNullOrUndefined(argsData.groupIndex) ? argsData.groupIndex : 0;
                var resourceDetails = this.parent.resourceBase.lastResourceLevel[parseInt(groupIndex.toString(), 10)];
                resourceValue = resourceDetails.resourceData[resourceDetails.resource.textField];
            }
        }
        return resourceValue;
    };
    QuickPopups.prototype.getFormattedString = function (eventData) {
        var fields = this.parent.eventFields;
        var eventSubject = (eventData[fields.subject] || this.l10n.getConstant('noTitle'));
        var startDate = eventData[fields.startTime];
        var endDate = eventData[fields.endTime];
        var startDateDetails = this.getDateFormat(startDate, 'long');
        var endDateDetails = (eventData[fields.isAllDay] && endDate.getHours() === 0 && endDate.getMinutes() === 0) ?
            this.getDateFormat(util.addDays(new Date(endDate.getTime()), -1), 'long') :
            this.getDateFormat(endDate, 'long');
        var startTimeDetail = this.parent.getTimeString(startDate);
        var endTimeDetail = this.parent.getTimeString(endDate);
        var details = '';
        var spanLength = endDate.getDate() !== startDate.getDate() &&
            (endDate.getTime() - startDate.getTime()) / (60 * 60 * 1000) < 24 ? 1 : 0;
        if (eventData[fields.isAllDay]) {
            details = startDateDetails + ' (' + this.l10n.getConstant('allDay') + ')';
            if (((util.getUniversalTime(endDate) - util.getUniversalTime(startDate)) / util.MS_PER_DAY) > 1) {
                details += '&nbsp;-&nbsp;' + endDateDetails + ' (' + this.l10n.getConstant('allDay') + ')';
            }
        }
        else if ((((util.getUniversalTime(endDate) - util.getUniversalTime(startDate)) / util.MS_PER_DAY) >= 1) || spanLength > 0) {
            details = startDateDetails + ' (' + startTimeDetail + ')' + '&nbsp;-&nbsp;' + endDateDetails + ' (' + endTimeDetail + ')';
        }
        else {
            details = startDateDetails + ' (' + (startTimeDetail + '&nbsp;-&nbsp;' + endTimeDetail) + ')';
        }
        return { eventSubject: eventSubject, details: details };
    };
    QuickPopups.prototype.moreEventClick = function (data, endDate, groupIndex) {
        var _this = this;
        this.quickPopupHide(true);
        var moreEventContentEle = this.morePopup.element.querySelector('.' + cls.MORE_EVENT_CONTENT_CLASS);
        if (moreEventContentEle) {
            remove(moreEventContentEle);
        }
        var selectedDate = ((data.date).getTime()).toString();
        var target = closest(data.element, '.' + cls.MORE_INDICATOR_CLASS + ',.' + cls.WORK_CELLS_CLASS);
        var day = this.parent.globalize.formatDate(data.date, { format: 'E', calendar: this.parent.getCalendarMode() });
        this.morePopup.element.querySelector('.' + cls.MORE_EVENT_HEADER_DAY_CLASS).innerHTML = util.capitalizeFirstWord(day, 'single');
        var dateElement = this.morePopup.element.querySelector('.' + cls.MORE_EVENT_HEADER_DATE_CLASS);
        dateElement.innerHTML = this.getDateFormat(data.date, 'd');
        dateElement.setAttribute('data-date', selectedDate);
        dateElement.setAttribute('data-end-date', endDate.getTime().toString());
        var groupOrder;
        if (!isNullOrUndefined(groupIndex)) {
            dateElement.setAttribute('data-group-index', groupIndex);
            groupOrder = this.parent.resourceBase.lastResourceLevel[parseInt(groupIndex, 10)].groupOrder;
        }
        var moreEventElements = this.createMoreEventList(data.event, groupOrder, groupIndex);
        this.morePopup.element.querySelector('.' + cls.MORE_EVENT_POPUP_CLASS).appendChild(moreEventElements);
        removeClass(this.morePopup.element.querySelector('.' + cls.MORE_EVENT_DATE_HEADER_CLASS).childNodes, cls.CURRENTDATE_CLASS);
        if (util.resetTime(data.date).getTime() === util.resetTime(this.parent.getCurrentTime()).getTime()) {
            addClass(this.morePopup.element.querySelector('.' + cls.MORE_EVENT_DATE_HEADER_CLASS).childNodes, cls.CURRENTDATE_CLASS);
        }
        if (!this.parent.isAdaptive) {
            if (this.parent.currentView.indexOf('Timeline') !== -1) {
                var gIndex = target.getAttribute('data-group-index');
                var startDate = new Date(parseInt(target.getAttribute('data-start-date'), 10));
                startDate.setHours(startDate.getHours(), startDate.getMinutes(), 0);
                var tdDate = startDate.getTime().toString();
                if (isNullOrUndefined(gIndex)) {
                    this.morePopup.relateTo = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS +
                        ' tbody tr td[data-date="' + tdDate + '"]');
                }
                else {
                    this.morePopup.relateTo = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS +
                        ' tbody tr td[data-group-index="' + gIndex + '"][data-date="' + tdDate + '"]');
                    if (isNullOrUndefined(this.morePopup.relateTo)) {
                        var workCells = [].slice.call(this.parent.element.querySelectorAll('.' + cls.CONTENT_WRAP_CLASS +
                            ' tbody tr td[data-group-index="' + gIndex + '"]'));
                        for (var i = 0; i < workCells.length; i++) {
                            var date = workCells[parseInt(i.toString(), 10)].getAttribute('data-date');
                            if (date < tdDate) {
                                this.morePopup.relateTo = workCells[parseInt(i.toString(), 10)];
                            }
                        }
                    }
                }
            }
            else {
                this.morePopup.relateTo = closest(target, '.' + cls.WORK_CELLS_CLASS);
            }
        }
        this.parent.renderTemplates(function () {
            var eventProp = {
                type: 'EventContainer', cancel: false,
                element: _this.morePopup.element, data: data
            };
            _this.parent.trigger(event.popupOpen, eventProp, function (popupArgs) {
                if (!popupArgs.cancel) {
                    _this.morePopup.show();
                }
            });
        });
    };
    QuickPopups.prototype.saveClick = function (event) {
        this.applyFormValidation();
        this.dialogEvent = event;
        this.isCrudAction = true;
        this.quickPopupHide();
    };
    QuickPopups.prototype.detailsClick = function (event) {
        var subjectEle = this.quickPopup.element.querySelector('.' + cls.SUBJECT_CLASS);
        if (subjectEle && subjectEle.value !== '') {
            extend(this.parent.activeCellsData, { subject: subjectEle.value });
        }
        this.dialogEvent = event;
        this.isCrudAction = false;
        this.fieldValidator.destroyToolTip();
        this.quickPopupHide();
        this.parent.eventWindow.openEditor(this.parent.activeCellsData, 'Add');
    };
    QuickPopups.prototype.editClick = function (event) {
        this.dialogEvent = event;
        this.quickPopupHide(true);
        var data = this.parent.activeEventData.event;
        this.parent.currentAction = 'EditSeries';
        if (!isNullOrUndefined(data[this.parent.eventFields.recurrenceRule])) {
            this.parent.currentAction = 'EditOccurrence';
            this.openRecurrenceAlert();
        }
        else {
            this.parent.eventWindow.openEditor(data, this.parent.currentAction);
        }
    };
    QuickPopups.prototype.deleteClick = function (event) {
        this.dialogEvent = event;
        this.quickPopupHide(true);
        this.parent.currentAction = 'Delete';
        if (this.parent.activeEventData.event[this.parent.eventFields.recurrenceRule]) {
            this.openRecurrenceAlert();
        }
        else {
            this.openDeleteAlert();
        }
    };
    QuickPopups.prototype.updateMoreEventContent = function () {
        if (this.morePopup.element.classList.contains('e-popup-close')) {
            return;
        }
        var moreEventContentEle = this.morePopup.element.querySelector('.' + cls.MORE_EVENT_CONTENT_CLASS);
        if (moreEventContentEle) {
            remove(moreEventContentEle);
        }
        var dateElement = this.morePopup.element.querySelector('.' + cls.MORE_EVENT_HEADER_DATE_CLASS);
        var startDate = new Date(parseInt(dateElement.getAttribute('data-date'), 10));
        var endDate = new Date(parseInt(dateElement.getAttribute('data-end-date'), 10));
        var groupIndex = dateElement.getAttribute('data-group-index');
        var data;
        var groupOrder;
        if (!isNullOrUndefined(groupIndex)) {
            data = this.parent.resourceBase.lastResourceLevel[parseInt(groupIndex, 10)];
            groupOrder = data.groupOrder;
        }
        var events = this.parent.eventBase.filterEvents(startDate, endDate, this.parent.eventsProcessed, data);
        var moreElement = this.createMoreEventList(events, groupOrder, groupIndex);
        this.morePopup.element.querySelector('.' + cls.MORE_EVENT_POPUP_CLASS).appendChild(moreElement);
    };
    QuickPopups.prototype.closeClick = function (event) {
        this.dialogEvent = event;
        if (this.parent.currentView === 'Year' && this.parent.activeCellsData && this.parent.activeCellsData.element) {
            this.parent.selectCell(this.parent.activeCellsData.element);
        }
        this.quickPopupHide();
        this.morePopup.hide();
    };
    QuickPopups.prototype.dialogButtonClick = function (event) {
        this.dialogEvent = event;
        this.quickDialog.hide();
        var target = event.target;
        var cancelBtn = this.quickDialog.element.querySelector('.' + cls.QUICK_DIALOG_ALERT_CANCEL);
        var eventData = this.parent.activeEventData.event;
        if (target.classList.contains(cls.QUICK_DIALOG_OCCURRENCE_CLASS)) {
            this.parent.currentAction = (this.parent.currentAction === 'Delete') ? 'DeleteOccurrence' : 'EditOccurrence';
            switch (this.parent.currentAction) {
                case 'EditOccurrence':
                    this.parent.eventWindow.openEditor(eventData, this.parent.currentAction);
                    break;
                case 'DeleteOccurrence':
                    this.parent.crudModule.deleteEvent(eventData, this.parent.currentAction);
                    break;
            }
        }
        else if (target.classList.contains(cls.QUICK_DIALOG_FOLLOWING_EVENTS_CLASS)) {
            this.parent.currentAction = (this.parent.currentAction === 'Delete') ? 'DeleteFollowingEvents' : 'EditFollowingEvents';
            switch (this.parent.currentAction) {
                case 'EditFollowingEvents':
                    this.parent.eventWindow.openEditor(eventData, this.parent.currentAction);
                    break;
                case 'DeleteFollowingEvents':
                    this.parent.crudModule.deleteEvent(eventData, this.parent.currentAction);
                    break;
            }
        }
        else if (target.classList.contains(cls.QUICK_DIALOG_SERIES_CLASS)) {
            this.parent.currentAction = (this.parent.currentAction === 'Delete') ? 'DeleteSeries' : 'EditSeries';
            switch (this.parent.currentAction) {
                case 'EditSeries':
                    this.parent.eventWindow.openEditor(this.parent.eventBase.getParentEvent(eventData, true), this.parent.currentAction);
                    break;
                case 'DeleteSeries':
                    this.parent.crudModule.deleteEvent(eventData, this.parent.currentAction);
                    break;
            }
        }
        else if (target.classList.contains(cls.QUICK_DIALOG_DELETE_CLASS)) {
            this.parent.crudModule.deleteEvent(eventData, this.parent.currentAction);
        }
        else if (!cancelBtn.classList.contains(cls.DISABLE_CLASS) && (target.classList.contains(cls.QUICK_DIALOG_ALERT_OK) ||
            (target.classList.contains(cls.QUICK_DIALOG_ALERT_CANCEL) && !cancelBtn.classList.contains(cls.QUICK_DIALOG_CANCEL_CLASS)))) {
            this.parent.uiStateValues.isIgnoreOccurrence = target.classList.contains(cls.QUICK_DIALOG_ALERT_CANCEL);
            this.parent.eventWindow.eventSave(event, this.l10n.getConstant('ok'));
        }
    };
    QuickPopups.prototype.updateTapHoldEventPopup = function (target) {
        var selectedElements = this.parent.eventBase.getSelectedEventElements(target);
        this.parent.activeEventData = this.parent.eventBase.getSelectedEvents();
        if (selectedElements.length > 0) {
            var eventObj = this.parent.eventBase.getEventByGuid(selectedElements[0].getAttribute('data-guid'));
            var titleContent = (selectedElements.length === 1) ?
                (eventObj[this.parent.eventFields.subject] || this.l10n.getConstant('noTitle')) :
                '(' + selectedElements.length + ')' + '&nbsp;' + this.l10n.getConstant('selectedItems');
            this.quickPopup.element.querySelector('.' + cls.SUBJECT_CLASS).innerHTML = titleContent;
            if (selectedElements.length > 1) {
                addClass([this.quickPopup.element.querySelector('.' + cls.EDIT_ICON_CLASS)], cls.HIDDEN_CLASS);
            }
            else {
                removeClass([this.quickPopup.element.querySelector('.' + cls.EDIT_ICON_CLASS)], cls.HIDDEN_CLASS);
            }
        }
        else {
            this.parent.selectedElements = [];
            this.quickPopupHide();
        }
    };
    QuickPopups.prototype.getTimezone = function (event) {
        var zoneDetails = '';
        zoneDetails += event[this.parent.eventFields.startTimezone] || '';
        zoneDetails += zoneDetails === '' ? '' : ' - ';
        zoneDetails += event[this.parent.eventFields.endTimezone] || '';
        return zoneDetails;
    };
    QuickPopups.prototype.getRecurrenceSummary = function (event) {
        var recurrenceEditor = this.parent.eventWindow.getRecurrenceEditorInstance();
        if (recurrenceEditor) {
            var ruleSummary = recurrenceEditor.getRuleSummary(event[this.parent.eventFields.recurrenceRule]);
            return ruleSummary.charAt(0).toUpperCase() + ruleSummary.slice(1);
        }
        return '';
    };
    QuickPopups.prototype.getDateFormat = function (date, skeletonString) {
        return util.capitalizeFirstWord(this.parent.globalize.formatDate(date, { skeleton: skeletonString, calendar: this.parent.getCalendarMode() }), 'single');
    };
    QuickPopups.prototype.getDataFromTarget = function (target) {
        if (target.classList.contains(cls.APPOINTMENT_CLASS)) {
            return this.parent.activeEventData.event;
        }
        // Deprecated cells data in quick popups
        var eventObj = {
            startTime: this.parent.activeCellsData.startTime,
            endTime: this.parent.activeCellsData.endTime,
            isAllDay: this.parent.activeCellsData.isAllDay,
            groupIndex: this.parent.activeCellsData.groupIndex
        };
        var cellsData = this.parent.activeCellsData;
        this.parent.eventWindow.convertToEventData(cellsData, eventObj);
        return eventObj;
    };
    QuickPopups.prototype.beforeQuickDialogClose = function (e) {
        var _this = this;
        var args = {
            event: e.event || this.dialogEvent,
            type: (isNullOrUndefined(this.parent.activeEventData.event)) ? 'ValidationAlert' :
                !isNullOrUndefined(this.parent.activeEventData.event[this.parent.eventFields.recurrenceRule])
                    ? 'RecurrenceAlert' : 'DeleteAlert', cancel: false, data: this.parent.activeEventData.event,
            element: this.quickDialog.element
        };
        this.parent.trigger(event.popupClose, args, function (popupCloseArgs) {
            if (!popupCloseArgs.cancel) {
                _this.parent.eventBase.focusElement(true);
            }
        });
    };
    QuickPopups.prototype.beforeQuickPopupOpen = function (target, originalEvent) {
        var _this = this;
        this.parent.renderTemplates(function () {
            var isEventPopup = _this.quickPopup.element.querySelector('.' + cls.EVENT_POPUP_CLASS);
            var popupType = _this.parent.isAdaptive ? isEventPopup ? 'ViewEventInfo' : 'EditEventInfo' : 'QuickInfo';
            var eventProp = {
                type: popupType, cancel: false, data: extend({}, _this.getDataFromTarget(target), null, true),
                target: target, element: _this.quickPopup.element
            };
            _this.parent.trigger(event.popupOpen, eventProp, function (popupArgs) {
                if (popupArgs.cancel) {
                    _this.quickPopupHide();
                    _this.destroyPopupButtons('quickPopup');
                    if (popupArgs.element.classList.contains(cls.POPUP_OPEN)) {
                        _this.quickPopupClose();
                    }
                    util.removeChildren(_this.quickPopup.element);
                    _this.isMultipleEventSelect = false;
                }
                else {
                    var display = _this.quickPopup.element.style.display;
                    _this.quickPopup.element.style.display = 'block';
                    if (_this.parent.isAdaptive) {
                        _this.quickPopup.element.removeAttribute('style');
                        _this.quickPopup.element.style.display = 'block';
                        _this.quickPopup.element.style.height = formatUnit((popupType === 'EditEventInfo') ? 65 : window.innerHeight);
                    }
                    else {
                        var isVirtualScroll = _this.parent.virtualScrollModule && _this.parent.virtualScrollModule.isHorizontalScroll
                            && !isNullOrUndefined(closest(target, '.' + cls.CONTENT_TABLE_CLASS));
                        var conTable = _this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS + ' table');
                        _this.quickPopup.offsetX = isVirtualScroll && !_this.parent.enableRtl ? (util.getTranslateX(conTable) + 10) : 10;
                        _this.quickPopup.offsetY = _this.parent.virtualScrollModule && !_this.parent.virtualScrollModule.isHorizontalScroll ?
                            _this.quickPopup.offsetY : 0;
                        _this.quickPopup.collision = { X: _this.parent.enableRtl ? 'flip' : 'none', Y: 'fit' };
                        _this.quickPopup.position = { X: _this.parent.enableRtl ? 'left' : 'right', Y: _this.parent.enableRtl ? 'bottom' : 'top' };
                        _this.quickPopup.dataBind();
                        _this.quickPopup.refreshPosition(null, true);
                        var collide = isCollide(_this.quickPopup.element, _this.parent.element);
                        if (collide.indexOf(_this.parent.enableRtl ? 'left' : 'right') > -1) {
                            _this.quickPopup.offsetX = -target.offsetWidth - 10 - _this.quickPopup.element.offsetWidth;
                            if (isVirtualScroll && !_this.parent.enableRtl) {
                                _this.quickPopup.offsetX = util.getTranslateX(conTable) + _this.quickPopup.offsetX;
                            }
                            _this.quickPopup.dataBind();
                            _this.quickPopup.refreshPosition(null, true);
                            var leftCollide = isCollide(_this.quickPopup.element, _this.parent.element);
                            if (leftCollide.indexOf('left') > -1) {
                                _this.quickPopup.position = { X: 'center', Y: 'center' };
                                _this.quickPopup.collision = { X: 'fit', Y: 'fit' };
                                _this.quickPopup.offsetX = -(_this.quickPopup.element.offsetWidth / 2);
                                _this.quickPopup.dataBind();
                            }
                        }
                        if (_this.parent.virtualScrollModule && !_this.parent.virtualScrollModule.isHorizontalScroll && (collide.indexOf('top') > -1 || collide.indexOf('bottom') > -1)) {
                            var translateY = util.getTranslateY(conTable);
                            _this.quickPopup.offsetY = translateY;
                            _this.quickPopup.dataBind();
                            _this.quickPopup.refreshPosition(null, true);
                        }
                        if (_this.quickPopup.position.X === 'center' && _this.quickPopup.position.Y === 'center' && !isNullOrUndefined(originalEvent) &&
                            originalEvent.clientX && originalEvent.clientY) {
                            var clientX = originalEvent.clientX;
                            var clientY = originalEvent.clientY;
                            var targetRect = target.getBoundingClientRect();
                            var offsetY = originalEvent.offsetY || Math.ceil(clientY - targetRect.y);
                            var previousOffset = _this.quickPopup.offsetY;
                            var collision = isCollide(_this.quickPopup.element, target);
                            var popupRect = _this.quickPopup.element.getBoundingClientRect();
                            var targetEle = document.elementFromPoint(clientX, clientY);
                            if (collision.indexOf('top') > -1 || collision.indexOf('bottom') > -1 || closest(targetEle, '.' + cls.POPUP_WRAPPER_CLASS)) {
                                if (popupRect.top <= clientY &&
                                    clientY <= popupRect.top + popupRect.height) {
                                    _this.quickPopup.offsetY = previousOffset - popupRect.height - 10;
                                    _this.quickPopup.dataBind();
                                    collision = isCollide(_this.quickPopup.element, _this.parent.element);
                                    if (collision.indexOf('top') > -1) {
                                        _this.quickPopup.offsetY = previousOffset + offsetY + 10;
                                        _this.quickPopup.dataBind();
                                    }
                                }
                                else if (isCollide(_this.quickPopup.element, _this.parent.element).indexOf('bottom') > -1) {
                                    _this.quickPopup.offsetY =
                                        previousOffset - offsetY - Math.ceil(popupRect.height) - 10;
                                    _this.quickPopup.dataBind();
                                }
                            }
                        }
                    }
                    if (isEventPopup) {
                        _this.applyEventColor();
                    }
                    _this.quickPopup.element.style.display = display;
                    _this.quickPopup.dataBind();
                    _this.quickPopup.show();
                }
            });
        });
    };
    QuickPopups.prototype.applyEventColor = function () {
        var colorField = '';
        if (this.parent.currentView === 'Agenda' || this.parent.currentView === 'MonthAgenda') {
            colorField = this.parent.enableRtl ? 'border-right-color' : 'border-left-color';
        }
        else {
            colorField = 'background-color';
        }
        var color = this.parent.activeEventData.element.style[colorField];
        if (color === '') {
            return;
        }
        var colorEle = this.quickPopup.element.querySelector('.' + cls.POPUP_HEADER_CLASS);
        var footerEle = this.quickPopup.element.querySelector('.' + cls.POPUP_FOOTER_CLASS);
        if (footerEle && footerEle.offsetParent) {
            colorEle = this.quickPopup.element.querySelector('.' + cls.SUBJECT_CLASS);
            if (colorEle) {
                colorEle.style.borderLeftColor = color;
                color = "rgba(" + color.match(/\d+/g).join() + ",0.3)";
            }
        }
        if (colorEle) {
            colorEle.style.backgroundColor = color;
        }
    };
    QuickPopups.prototype.quickPopupOpen = function () {
        if (this.parent.isAdaptive) {
            this.quickPopup.element.style.top = '0px';
            return;
        }
        if (this.quickPopup.element.querySelector('.' + cls.CELL_POPUP_CLASS)) {
            var subjectElement = this.quickPopup.element.querySelector('.' + cls.SUBJECT_CLASS);
            if (subjectElement) {
                subjectElement.focus();
            }
        }
        else {
            var editElement = this.quickPopup.element.querySelector('.' + cls.EDIT_EVENT_CLASS);
            if (editElement) {
                editElement.focus();
            }
            var editIcon = this.quickPopup.element.querySelector('.' + cls.EDIT_CLASS);
            if (editIcon) {
                editIcon.focus();
            }
        }
    };
    QuickPopups.prototype.quickPopupClose = function () {
        this.parent.eventBase.focusElement();
        this.quickPopup.relateTo = '.' + cls.WORK_CELLS_CLASS;
        this.fieldValidator.destroyToolTip();
        if (this.quickPopup.element.querySelectorAll('.e-formvalidator').length) {
            this.fieldValidator.destroy();
        }
        this.destroyPopupButtons('quickPopup');
        util.removeChildren(this.quickPopup.element);
    };
    QuickPopups.prototype.morePopupOpen = function () {
        if (this.parent.isAdaptive) {
            this.morePopup.element.style.top = '0px';
            this.morePopup.element.style.left = '0px';
            this.morePopup.element.style.height = formatUnit(window.innerHeight);
            return;
        }
        this.morePopup.element.querySelector('.' + cls.MORE_EVENT_HEADER_DATE_CLASS).focus();
        this.morePopup.refreshPosition();
    };
    QuickPopups.prototype.morePopupClose = function () {
        var moreWrapper = this.parent.element.querySelector('.' + cls.MORE_EVENT_WRAPPER_CLASS);
        if (moreWrapper) {
            remove(moreWrapper);
        }
    };
    QuickPopups.prototype.popupClose = function (event) {
        this.dialogEvent = event;
        this.isCrudAction = false;
        this.quickPopupHide(true);
    };
    QuickPopups.prototype.quickPopupHide = function (hideAnimation) {
        var _this = this;
        if (!this.quickPopup.element.classList.contains(cls.POPUP_OPEN)) {
            return;
        }
        var isCellPopup = this.quickPopup.element.querySelector('.' + cls.CELL_POPUP_CLASS);
        var popupData;
        if (isCellPopup) {
            var formvalidator = this.quickPopup.element.querySelector('.e-formvalidator');
            if (this.isCrudAction && formvalidator &&
                !formvalidator.ej2_instances[0].validate()) {
                return;
            }
            var fields = this.parent.eventFields;
            var saveObj = this.parent.eventWindow.getObjectFromFormData(cls.POPUP_WRAPPER_CLASS);
            this.parent.eventWindow.setDefaultValueToObject(saveObj);
            saveObj[fields.id] = this.parent.eventBase.getEventMaxID();
            saveObj[fields.startTime] = this.parent.activeCellsData.startTime;
            saveObj[fields.endTime] = this.parent.activeCellsData.endTime;
            saveObj[fields.isAllDay] = this.parent.activeCellsData.isAllDay;
            if (this.parent.resourceBase) {
                this.parent.resourceBase.setResourceValues(saveObj);
            }
            popupData = saveObj;
        }
        else {
            popupData = this.parent.activeEventData.event;
        }
        var isEventPopup = this.quickPopup.element.querySelector('.' + cls.EVENT_POPUP_CLASS);
        var args = {
            event: this.dialogEvent,
            type: this.parent.isAdaptive ? isEventPopup ? 'ViewEventInfo' : 'EditEventInfo' : 'QuickInfo',
            cancel: false, data: popupData, element: this.quickPopup.element,
            target: (isCellPopup ? this.parent.activeCellsData.element : this.parent.activeEventData.element)
        };
        this.parent.trigger(event.popupClose, args, function (popupCloseArgs) {
            if (!popupCloseArgs.cancel) {
                if (_this.quickPopup.element.classList.contains('e-popup-open')) {
                    if (isCellPopup && _this.isCrudAction) {
                        _this.parent.currentAction = 'Add';
                        _this.parent.crudModule.addEvent(popupCloseArgs.data);
                    }
                    if (hideAnimation) {
                        var animation = _this.quickPopup.hideAnimation;
                        _this.quickPopup.hideAnimation = null;
                        _this.quickPopup.hide();
                        _this.quickPopup.hideAnimation = animation;
                    }
                    else {
                        _this.quickPopup.hide();
                    }
                    _this.isMultipleEventSelect = false;
                    _this.isCrudAction = false;
                }
            }
        });
    };
    QuickPopups.prototype.navigationClick = function (e) {
        var navigateEle = closest(e.target, '.' + cls.NAVIGATE_CLASS);
        if (!isNullOrUndefined(navigateEle)) {
            var date = this.parent.getDateFromElement(e.currentTarget);
            if (!isNullOrUndefined(date)) {
                this.closeClick(e);
                this.parent.setProperties({ selectedDate: date }, true);
                this.parent.changeView(this.parent.getNavigateView(), e);
            }
        }
    };
    QuickPopups.prototype.documentClick = function (e) {
        var target = e.event.target;
        var isInsideDialog = !!closest(target, '.e-dialog');
        var classNames = '.' + cls.POPUP_WRAPPER_CLASS + ',.' + cls.HEADER_CELLS_CLASS + ',.' + cls.ALLDAY_CELLS_CLASS +
            ',.' + cls.WORK_CELLS_CLASS + ',.' + cls.APPOINTMENT_CLASS;
        if (!isInsideDialog) {
            classNames += ',.e-popup';
        }
        var popupWrap = this.parent.element.querySelector('.' + cls.POPUP_WRAPPER_CLASS);
        if ((popupWrap && popupWrap.childElementCount > 0 && !closest(target, classNames)) || !closest(target, classNames)) {
            this.quickPopupHide();
            this.parent.removeNewEventElement();
        }
        var tar = this.parent.allowInline ? this.parent.inlineModule.getInlineElement() : null;
        if (tar && tar !== target) {
            this.parent.inlineModule.documentClick(tar);
        }
        if (closest(target, '.' + cls.APPOINTMENT_CLASS + ',.' + cls.HEADER_CELLS_CLASS)) {
            this.parent.removeNewEventElement();
        }
        if (!closest(target, '.' + cls.MORE_POPUP_WRAPPER_CLASS) && (target.classList &&
            !target.classList.contains(cls.MORE_INDICATOR_CLASS))
            && (!closest(target, '.' + cls.MORE_POPUP_WRAPPER_CLASS + '.' + cls.POPUP_OPEN))
            && !closest(target, '.' + cls.WORK_CELLS_CLASS)) {
            this.morePopup.hide();
        }
    };
    QuickPopups.prototype.onClosePopup = function (event) {
        if (!isNullOrUndefined(event)) {
            this.dialogEvent = event;
        }
        this.quickPopupHide();
        if (isNullOrUndefined(event) || (!isNullOrUndefined(event) && event.action !== 'escape') ||
            (this.parent.inlineModule && this.parent.element.querySelector('.' + cls.INLINE_APPOINTMENT_CLASS))) {
            this.parent.eventBase.focusElement();
        }
    };
    QuickPopups.prototype.addEventListener = function () {
        this.parent.on(event.cellClick, this.cellClick, this);
        this.parent.on(event.eventClick, this.eventClick, this);
        this.parent.on(event.documentClick, this.documentClick, this);
        this.parent.on(event.dataReady, this.updateMoreEventContent, this);
    };
    QuickPopups.prototype.removeEventListener = function () {
        this.parent.off(event.cellClick, this.cellClick);
        this.parent.off(event.eventClick, this.eventClick);
        this.parent.off(event.documentClick, this.documentClick);
        this.parent.off(event.dataReady, this.updateMoreEventContent);
    };
    QuickPopups.prototype.destroyPopupButtons = function (popupName) {
        var popup = popupName === 'quickPopup' ? this.quickPopup : this.morePopup;
        var buttonCollections = [].slice.call(popup.element.querySelectorAll('.e-control.e-btn'));
        for (var _i = 0, buttonCollections_1 = buttonCollections; _i < buttonCollections_1.length; _i++) {
            var button = buttonCollections_1[_i];
            var instance = button.ej2_instances[0];
            if (instance) {
                instance.destroy();
            }
        }
        if (popupName === 'quickPopup') {
            var input = popup.element.querySelector('input.' + cls.SUBJECT_CLASS);
            if (input) {
                input.remove();
            }
            var form = this.quickPopup.element.querySelector('form.' + cls.FORM_CLASS);
            if (form) {
                util.removeChildren(form);
                form.remove();
            }
            this.parent.resetTemplates(['content', 'header', 'footer']);
        }
    };
    QuickPopups.prototype.refreshQuickDialog = function () {
        this.destroyQuickDialog();
        this.renderQuickDialog();
    };
    QuickPopups.prototype.refreshQuickPopup = function () {
        this.destroyQuickPopup();
        this.renderQuickPopup();
    };
    QuickPopups.prototype.refreshMorePopup = function () {
        this.destroyMorePopup();
        this.renderMorePopup();
    };
    QuickPopups.prototype.destroyQuickDialog = function () {
        if (this.quickDialog.element) {
            this.quickDialog.destroy();
            remove(this.quickDialog.element);
            this.quickDialog = null;
        }
    };
    QuickPopups.prototype.destroyQuickPopup = function () {
        if (this.quickPopup.element) {
            this.destroyPopupButtons('quickPopup');
            this.quickPopup.destroy();
            remove(this.quickPopup.element);
            this.quickPopup = null;
        }
    };
    QuickPopups.prototype.destroyMorePopup = function () {
        if (this.morePopup.element) {
            this.destroyPopupButtons('morePopup');
            this.morePopup.destroy();
            remove(this.morePopup.element);
            this.morePopup = null;
        }
    };
    QuickPopups.prototype.destroy = function () {
        if (this.quickPopup.element.querySelectorAll('.e-formvalidator').length) {
            this.fieldValidator.destroy();
        }
        this.removeEventListener();
        this.destroyQuickPopup();
        this.destroyMorePopup();
        this.destroyQuickDialog();
        this.dialogEvent = null;
        this.parent = null;
        this.l10n = null;
        this.isCrudAction = null;
        this.fieldValidator = null;
        this.isMultipleEventSelect = null;
    };
    return QuickPopups;
}());
export { QuickPopups };
