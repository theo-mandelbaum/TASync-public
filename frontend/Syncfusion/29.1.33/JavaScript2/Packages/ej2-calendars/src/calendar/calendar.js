var __extends = (this && this.__extends) || (function () {
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, EventHandler, Internationalization } from '@syncfusion/ej2-base';
import { KeyboardEvents, L10n } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { cldrData, getDefaultDateObject, rippleEffect } from '@syncfusion/ej2-base';
import { removeClass, detach, closest, addClass, attributes } from '@syncfusion/ej2-base';
import { getValue, getUniqueID, extend, Browser } from '@syncfusion/ej2-base';
import { Property, Event, isNullOrUndefined, throwError } from '@syncfusion/ej2-base';
//class constant defination.
var OTHERMONTH = 'e-other-month';
var OTHERDECADE = 'e-other-year';
var ROOT = 'e-calendar';
var DEVICE = 'e-device';
var HEADER = 'e-header';
var RTL = 'e-rtl';
var CONTENT = 'e-content';
var CONTENTTABLE = 'e-calendar-content-table';
var YEAR = 'e-year';
var MONTH = 'e-month';
var DECADE = 'e-decade';
var ICON = 'e-icons';
var PREVICON = 'e-prev';
var NEXTICON = 'e-next';
var PREVSPAN = 'e-date-icon-prev';
var NEXTSPAN = 'e-date-icon-next ';
var ICONCONTAINER = 'e-icon-container';
var DISABLED = 'e-disabled';
var OVERLAY = 'e-overlay';
var WEEKEND = 'e-weekend';
var WEEKNUMBER = 'e-week-number';
var SELECTED = 'e-selected';
var FOCUSEDDATE = 'e-focused-date';
var FOCUSEDCELL = 'e-focused-cell';
var OTHERMONTHROW = 'e-month-hide';
var TODAY = 'e-today';
var TITLE = 'e-title';
var LINK = 'e-day';
var CELL = 'e-cell';
var WEEKHEADER = 'e-week-header';
var ZOOMIN = 'e-zoomin';
var FOOTER = 'e-footer-container';
var BTN = 'e-btn';
var FLAT = 'e-flat';
var CSS = 'e-css';
var PRIMARY = 'e-primary';
var DAYHEADERLONG = 'e-calendar-day-header-lg';
var dayMilliSeconds = 86400000;
var minutesMilliSeconds = 60000;
/**
 *
 * @private
 */
var CalendarBase = /** @class */ (function (_super) {
    __extends(CalendarBase, _super);
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     *
     * @param {CalendarBaseModel} options - Specifies the CalendarBase model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function CalendarBase(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.effect = '';
        _this.isPopupClicked = false;
        _this.isDateSelected = true;
        _this.isTodayClicked = false;
        _this.preventChange = false;
        _this.previousDates = false;
        return _this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    CalendarBase.prototype.render = function () {
        this.rangeValidation(this.min, this.max);
        this.calendarEleCopy = this.element.cloneNode(true);
        if (this.calendarMode === 'Islamic') {
            if (+(this.min.setSeconds(0)) === +new Date(1900, 0, 1, 0, 0, 0)) {
                this.min = new Date(1944, 2, 18);
            }
            if (+this.max === +new Date(2099, 11, 31)) {
                this.max = new Date(2069, 10, 16);
            }
        }
        this.globalize = new Internationalization(this.locale);
        if (isNullOrUndefined(this.firstDayOfWeek) || this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: this.globalize.getFirstDayOfWeek() }, true);
        }
        this.todayDisabled = false;
        this.todayDate = new Date(new Date().setHours(0, 0, 0, 0));
        if (this.getModuleName() === 'calendar') {
            this.element.classList.add(ROOT);
            if (this.enableRtl) {
                this.element.classList.add(RTL);
            }
            if (Browser.isDevice) {
                this.element.classList.add(DEVICE);
            }
            attributes(this.element, {
                'data-role': 'calendar'
            });
            this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
            this.element.setAttribute('tabindex', this.tabIndex);
        }
        else {
            this.calendarElement = this.createElement('div');
            this.calendarElement.classList.add(ROOT);
            if (this.enableRtl) {
                this.calendarElement.classList.add(RTL);
            }
            if (Browser.isDevice) {
                this.calendarElement.classList.add(DEVICE);
            }
            attributes(this.calendarElement, {
                'data-role': 'calendar'
            });
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.createHeader();
        this.createContent();
        this.wireEvents();
    };
    CalendarBase.prototype.rangeValidation = function (min, max) {
        if (isNullOrUndefined(min)) {
            this.setProperties({ min: new Date(1900, 0, 1) }, true);
        }
        if (isNullOrUndefined(max)) {
            this.setProperties({ max: new Date(2099, 11, 31) }, true);
        }
    };
    CalendarBase.prototype.getDefaultKeyConfig = function () {
        this.defaultKeyConfigs = {
            controlUp: 'ctrl+38',
            controlDown: 'ctrl+40',
            moveDown: 'downarrow',
            moveUp: 'uparrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            select: 'enter',
            home: 'home',
            end: 'end',
            pageUp: 'pageup',
            pageDown: 'pagedown',
            shiftPageUp: 'shift+pageup',
            shiftPageDown: 'shift+pagedown',
            controlHome: 'ctrl+home',
            controlEnd: 'ctrl+end',
            altUpArrow: 'alt+uparrow',
            spacebar: 'space',
            altRightArrow: 'alt+rightarrow',
            altLeftArrow: 'alt+leftarrow'
        };
        return this.defaultKeyConfigs;
    };
    CalendarBase.prototype.validateDate = function (value) {
        this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(this.min))) }, true);
        this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(this.max))) }, true);
        this.currentDate = this.currentDate ? this.currentDate : new Date(new Date().setHours(0, 0, 0, 0));
        if (!isNullOrUndefined(value) && this.min <= this.max && value >= this.min && value <= this.max) {
            this.currentDate = new Date(this.checkValue(value));
        }
    };
    CalendarBase.prototype.setOverlayIndex = function (popupWrapper, popupElement, modal, isDevice) {
        if (isDevice && !isNullOrUndefined(popupElement) && !isNullOrUndefined(modal) && !isNullOrUndefined(popupWrapper)) {
            var index = parseInt(popupElement.style.zIndex, 10) ? parseInt(popupElement.style.zIndex, 10) : 1000;
            modal.style.zIndex = (index - 1).toString();
            popupWrapper.style.zIndex = index.toString();
        }
    };
    CalendarBase.prototype.minMaxUpdate = function (value) {
        if (!(+this.min <= +this.max)) {
            this.setProperties({ min: this.min }, true);
            addClass([this.element], OVERLAY);
        }
        else {
            removeClass([this.element], OVERLAY);
        }
        this.min = isNullOrUndefined(this.min) || !(+this.min) ? this.min = new Date(1900, 0, 1) : this.min;
        this.max = isNullOrUndefined(this.max) || !(+this.max) ? this.max = new Date(2099, 11, 31) : this.max;
        if (+this.min <= +this.max && value && +value <= +this.max && +value >= +this.min) {
            this.currentDate = new Date(this.checkValue(value));
        }
        else {
            if (+this.min <= +this.max && !value && +this.currentDate > +this.max) {
                this.currentDate = new Date(this.checkValue(this.max));
            }
            else {
                if (+this.currentDate < +this.min) {
                    this.currentDate = new Date(this.checkValue(this.min));
                }
            }
        }
    };
    CalendarBase.prototype.createHeader = function () {
        var ariaPrevAttrs = {
            'aria-disabled': 'false',
            'aria-label': 'previous month'
        };
        var ariaNextAttrs = {
            'aria-disabled': 'false',
            'aria-label': 'next month'
        };
        var ariaTitleAttrs = {
            'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'title'
        };
        var tabIndexAttr = { 'tabindex': '0' };
        this.headerElement = this.createElement('div', { className: HEADER });
        var iconContainer = this.createElement('div', { className: ICONCONTAINER });
        this.previousIcon = this.createElement('button', { className: '' + PREVICON, attrs: { type: 'button' } });
        rippleEffect(this.previousIcon, {
            duration: 400,
            selector: '.e-prev',
            isCenterRipple: true
        });
        attributes(this.previousIcon, ariaPrevAttrs);
        attributes(this.previousIcon, tabIndexAttr);
        this.nextIcon = this.createElement('button', { className: '' + NEXTICON, attrs: { type: 'button' } });
        rippleEffect(this.nextIcon, {
            selector: '.e-next',
            duration: 400,
            isCenterRipple: true
        });
        if (this.getModuleName() === 'daterangepicker') {
            attributes(this.previousIcon, { tabIndex: '-1' });
            attributes(this.nextIcon, { tabIndex: '-1' });
        }
        attributes(this.nextIcon, ariaNextAttrs);
        attributes(this.nextIcon, tabIndexAttr);
        this.headerTitleElement = this.createElement('div', { className: '' + LINK + ' ' + TITLE });
        attributes(this.headerTitleElement, ariaTitleAttrs);
        attributes(this.headerTitleElement, tabIndexAttr);
        this.headerElement.appendChild(this.headerTitleElement);
        this.previousIcon.appendChild(this.createElement('span', { className: '' + PREVSPAN + ' ' + ICON }));
        this.nextIcon.appendChild(this.createElement('span', { className: '' + NEXTSPAN + ' ' + ICON }));
        iconContainer.appendChild(this.previousIcon);
        iconContainer.appendChild(this.nextIcon);
        this.headerElement.appendChild(iconContainer);
        if (this.getModuleName() === 'calendar') {
            this.element.appendChild(this.headerElement);
        }
        else {
            this.calendarElement.appendChild(this.headerElement);
        }
        this.adjustLongHeaderSize();
    };
    CalendarBase.prototype.createContent = function () {
        this.contentElement = this.createElement('div', { className: CONTENT });
        this.table = this.createElement('table', { attrs: { 'class': CONTENTTABLE, 'tabIndex': '0', 'role': 'grid', 'aria-activedescendant': '', 'aria-labelledby': this.element.id } });
        if (this.getModuleName() === 'calendar') {
            this.element.appendChild(this.contentElement);
        }
        else {
            this.calendarElement.appendChild(this.contentElement);
        }
        this.contentElement.appendChild(this.table);
        this.createContentHeader();
        this.createContentBody();
        if (this.showTodayButton) {
            this.createContentFooter();
        }
        if (this.getModuleName() !== 'daterangepicker') {
            EventHandler.add(this.table, 'focus', this.addContentFocus, this);
            EventHandler.add(this.table, 'blur', this.removeContentFocus, this);
        }
    };
    CalendarBase.prototype.addContentFocus = function (args) {
        var focusedDate = this.tableBodyElement.querySelector('tr td.e-focused-date');
        var selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
        if (!isNullOrUndefined(selectedDate)) {
            selectedDate.classList.add(FOCUSEDCELL);
        }
        else if (!isNullOrUndefined(focusedDate)) {
            focusedDate.classList.add(FOCUSEDCELL);
        }
    };
    CalendarBase.prototype.removeContentFocus = function (args) {
        var focusedDate = !isNullOrUndefined(this.tableBodyElement) ? this.tableBodyElement.querySelector('tr td.e-focused-date') : null;
        var selectedDate = !isNullOrUndefined(this.tableBodyElement) ? this.tableBodyElement.querySelector('tr td.e-selected') : null;
        if (!isNullOrUndefined(selectedDate)) {
            selectedDate.classList.remove(FOCUSEDCELL);
        }
        else if (!isNullOrUndefined(focusedDate)) {
            focusedDate.classList.remove(FOCUSEDCELL);
        }
    };
    CalendarBase.prototype.getCultureValues = function () {
        var culShortNames = [];
        var cldrObj;
        var dayFormat = !isNullOrUndefined(this.dayHeaderFormat) ? 'days.stand-alone.' + this.dayHeaderFormat.toLowerCase() : null;
        if ((this.locale === 'en' || this.locale === 'en-US') && !isNullOrUndefined(dayFormat)) {
            cldrObj = (getValue(dayFormat, getDefaultDateObject()));
        }
        else {
            cldrObj = (this.getCultureObjects(cldrData, '' + this.locale));
        }
        if (!isNullOrUndefined(cldrObj)) {
            for (var _i = 0, _a = Object.keys(cldrObj); _i < _a.length; _i++) {
                var obj = _a[_i];
                culShortNames.push(getValue(obj, cldrObj));
            }
        }
        return culShortNames;
    };
    CalendarBase.prototype.toCapitalize = function (text) {
        return !isNullOrUndefined(text) && text.length ? text[0].toUpperCase() + text.slice(1) : text;
    };
    CalendarBase.prototype.createContentHeader = function () {
        if (this.getModuleName() === 'calendar') {
            if (!isNullOrUndefined(this.element.querySelectorAll('.e-content .e-week-header')[0])) {
                detach(this.element.querySelectorAll('.e-content .e-week-header')[0]);
            }
        }
        else {
            if (!isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0])) {
                detach(this.calendarElement.querySelectorAll('.e-content .e-week-header')[0]);
            }
        }
        var daysCount = 6;
        var html = '';
        if (this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: 0 }, true);
        }
        this.tableHeadElement = this.createElement('thead', { className: WEEKHEADER });
        if (this.weekNumber) {
            html += '<th class="e-week-number" aria-hidden="true"></th>';
            if (this.getModuleName() === 'calendar') {
                addClass([this.element], '' + WEEKNUMBER);
            }
            else {
                addClass([this.calendarElement], '' + WEEKNUMBER);
            }
        }
        var shortNames = this.getCultureValues().length > 0 &&
            this.getCultureValues() ? this.shiftArray(((this.getCultureValues().length > 0 &&
            this.getCultureValues())), this.firstDayOfWeek) : null;
        if (!isNullOrUndefined(shortNames)) {
            for (var days = 0; days <= daysCount; days++) {
                html += '<th  class="">' + this.toCapitalize(shortNames[days]) + '</th>';
            }
        }
        html = '<tr>' + html + '</tr>';
        this.tableHeadElement.innerHTML = html;
        this.table.appendChild(this.tableHeadElement);
    };
    CalendarBase.prototype.createContentBody = function () {
        if (this.getModuleName() === 'calendar') {
            if (!isNullOrUndefined(this.element.querySelectorAll('.e-content tbody')[0])) {
                detach(this.element.querySelectorAll('.e-content tbody')[0]);
            }
        }
        else {
            if (!isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content tbody')[0])) {
                detach(this.calendarElement.querySelectorAll('.e-content tbody')[0]);
            }
        }
        switch (this.start) {
            case 'Year':
                this.renderYears();
                break;
            case 'Decade':
                this.renderDecades();
                break;
            default:
                this.renderMonths();
        }
    };
    CalendarBase.prototype.updateFooter = function () {
        this.todayElement.textContent = this.l10.getConstant('today');
        this.todayElement.setAttribute('aria-label', this.l10.getConstant('today'));
        this.todayElement.setAttribute('tabindex', '0');
    };
    CalendarBase.prototype.createContentFooter = function () {
        if (this.showTodayButton) {
            var minimum = new Date(+this.min);
            var maximum = new Date(+this.max);
            var l10nLocale = { today: 'Today' };
            this.globalize = new Internationalization(this.locale);
            this.l10 = new L10n(this.getModuleName(), l10nLocale, this.locale);
            this.todayElement = this.createElement('button', { attrs: { role: 'button' } });
            rippleEffect(this.todayElement);
            this.updateFooter();
            addClass([this.todayElement], [BTN, TODAY, FLAT, PRIMARY, CSS]);
            if ((!(+new Date(minimum.setHours(0, 0, 0, 0)) <= +this.todayDate &&
                +this.todayDate <= +new Date(maximum.setHours(0, 0, 0, 0)))) || (this.todayDisabled)) {
                addClass([this.todayElement], DISABLED);
            }
            this.footer = this.createElement('div', { className: FOOTER });
            this.footer.appendChild(this.todayElement);
            if (this.getModuleName() === 'calendar') {
                this.element.appendChild(this.footer);
            }
            if (this.getModuleName() === 'datepicker') {
                this.calendarElement.appendChild(this.footer);
            }
            if (this.getModuleName() === 'datetimepicker') {
                this.calendarElement.appendChild(this.footer);
            }
            if (!this.todayElement.classList.contains(DISABLED)) {
                EventHandler.add(this.todayElement, 'click', this.todayButtonClick, this);
            }
        }
    };
    CalendarBase.prototype.wireEvents = function (id, ref, keyConfig, moduleName) {
        EventHandler.add(this.headerTitleElement, 'click', this.navigateTitle, this);
        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
        if (this.getModuleName() === 'calendar') {
            this.keyboardModule = new KeyboardEvents(this.element, {
                eventName: 'keydown',
                keyAction: this.keyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        else {
            this.keyboardModule = new KeyboardEvents(this.calendarElement, {
                eventName: 'keydown',
                keyAction: this.keyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
    };
    CalendarBase.prototype.dateWireEvents = function (id, ref, keyConfig, moduleName) {
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, keyConfig);
        this.serverModuleName = moduleName;
    };
    CalendarBase.prototype.todayButtonClick = function (e, value, isCustomDate) {
        if (this.showTodayButton) {
            if (this.currentView() === this.depth) {
                this.effect = '';
            }
            else {
                this.effect = 'e-zoomin';
            }
            if (this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                this.navigateTo(this.depth, new Date(this.checkValue(value)), isCustomDate);
            }
            else {
                this.navigateTo('Month', new Date(this.checkValue(value)), isCustomDate);
            }
        }
    };
    CalendarBase.prototype.resetCalendar = function () {
        this.calendarElement && detach(this.calendarElement);
        this.tableBodyElement && detach(this.tableBodyElement);
        this.table && detach(this.table);
        this.tableHeadElement && detach(this.tableHeadElement);
        this.nextIcon && detach(this.nextIcon);
        this.previousIcon && detach(this.previousIcon);
        this.footer && detach(this.footer);
        this.todayElement = null;
        this.renderDayCellArgs = null;
        this.calendarElement = this.tableBodyElement = this.footer = this.tableHeadElement =
            this.nextIcon = this.previousIcon = this.table = null;
    };
    CalendarBase.prototype.keyActionHandle = function (e, value, multiSelection) {
        if (this.calendarElement === null && e.action === 'escape') {
            return;
        }
        var focusedDate = this.tableBodyElement.querySelector('tr td.e-focused-date');
        var selectedDate;
        if (multiSelection) {
            if (!isNullOrUndefined(focusedDate) && +value === parseInt(focusedDate.getAttribute('id').split('_')[0], 10)) {
                selectedDate = focusedDate;
            }
            else {
                selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
            }
        }
        else {
            selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
        }
        var view = this.getViewNumber(this.currentView());
        var depthValue = this.getViewNumber(this.depth);
        var levelRestrict = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
        this.effect = '';
        switch (e.action) {
            case 'moveLeft':
                if (this.getModuleName() !== 'daterangepicker' && !isNullOrUndefined(e.target)) {
                    this.keyboardNavigate(-1, view, e, this.max, this.min);
                    e.preventDefault();
                }
                break;
            case 'moveRight':
                if (this.getModuleName() !== 'daterangepicker' && !isNullOrUndefined(e.target)) {
                    this.keyboardNavigate(1, view, e, this.max, this.min);
                    e.preventDefault();
                }
                break;
            case 'moveUp':
                if (this.getModuleName() !== 'daterangepicker' && !isNullOrUndefined(e.target)) {
                    if (view === 0) {
                        this.keyboardNavigate(-7, view, e, this.max, this.min); // move the current date to the previous seven days.
                    }
                    else {
                        this.keyboardNavigate(-4, view, e, this.max, this.min); // move the current year to the previous four days.
                    }
                    e.preventDefault();
                }
                break;
            case 'moveDown':
                if (this.getModuleName() !== 'daterangepicker' && !isNullOrUndefined(e.target)) {
                    if (view === 0) {
                        this.keyboardNavigate(7, view, e, this.max, this.min);
                    }
                    else {
                        this.keyboardNavigate(4, view, e, this.max, this.min);
                    }
                    e.preventDefault();
                }
                break;
            case 'select':
                if (e.target === this.headerTitleElement) {
                    this.navigateTitle(e);
                }
                else if (e.target === this.previousIcon && !e.target.className.includes(DISABLED)) {
                    this.navigatePrevious(e);
                }
                else if (e.target === this.nextIcon && !e.target.className.includes(DISABLED)) {
                    this.navigateNext(e);
                }
                else if (e.target === this.todayElement && !e.target.className.includes(DISABLED)) {
                    this.todayButtonClick(e, value);
                    if (this.getModuleName() === 'datepicker' || this.getModuleName() === 'datetimepicker') {
                        if (this.isAngular) {
                            this.inputElement.focus();
                        }
                        else {
                            this.element.focus();
                        }
                    }
                }
                else {
                    var element = !isNullOrUndefined(focusedDate) ? focusedDate : selectedDate;
                    if (!isNullOrUndefined(element) && !element.classList.contains(DISABLED)) {
                        if (levelRestrict) {
                            // eslint-disable-next-line radix
                            var d = new Date(parseInt('' + (element).id, 0));
                            this.selectDate(e, d, (element));
                            if (this.getModuleName() === 'datepicker' || this.getModuleName() === 'datetimepicker') {
                                if (this.isAngular) {
                                    this.inputElement.focus();
                                }
                                else {
                                    this.element.focus();
                                }
                            }
                        }
                        else {
                            if (!e.target.className.includes(DISABLED)) {
                                this.contentClick(null, --view, (element), value);
                            }
                        }
                    }
                }
                break;
            case 'controlUp':
                this.title();
                e.preventDefault();
                break;
            case 'controlDown':
                if (!isNullOrUndefined(focusedDate) && !levelRestrict || !isNullOrUndefined(selectedDate) && !levelRestrict) {
                    this.contentClick(null, --view, (focusedDate || selectedDate), value);
                }
                e.preventDefault();
                break;
            case 'home':
                this.currentDate = this.firstDay(this.currentDate);
                detach(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                e.preventDefault();
                break;
            case 'end':
                this.currentDate = this.lastDay(this.currentDate, view);
                detach(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                e.preventDefault();
                break;
            case 'pageUp':
                this.addMonths(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'pageDown':
                this.addMonths(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'shiftPageUp':
                this.addYears(this.currentDate, -1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'shiftPageDown':
                this.addYears(this.currentDate, 1);
                this.navigateTo('Month', this.currentDate);
                e.preventDefault();
                break;
            case 'controlHome':
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 0, 1));
                e.preventDefault();
                break;
            case 'controlEnd':
                this.navigateTo('Month', new Date(this.currentDate.getFullYear(), 11, 31));
                e.preventDefault();
                break;
            case 'tab':
                if ((this.getModuleName() === 'datepicker' || this.getModuleName() === 'datetimepicker') && e.target === this.todayElement) {
                    e.preventDefault();
                    if (this.isAngular) {
                        this.inputElement.focus();
                    }
                    else {
                        this.element.focus();
                    }
                    this.hide();
                }
                break;
            case 'shiftTab':
                if ((this.getModuleName() === 'datepicker' || this.getModuleName() === 'datetimepicker') && e.target === this.headerTitleElement) {
                    e.preventDefault();
                    if (this.isAngular) {
                        this.inputElement.focus();
                    }
                    else {
                        this.element.focus();
                    }
                    this.hide();
                }
                break;
            case 'escape':
                if ((this.getModuleName() === 'datepicker' || this.getModuleName() === 'datetimepicker') && (e.target === this.headerTitleElement || e.target === this.previousIcon || e.target === this.nextIcon || e.target === this.todayElement)) {
                    this.hide();
                }
                break;
        }
    };
    CalendarBase.prototype.keyboardNavigate = function (number, currentView, e, max, min) {
        var date = new Date(this.checkValue(this.currentDate));
        switch (currentView) {
            case 2:
                this.addYears(this.currentDate, number);
                if (this.isMonthYearRange(this.currentDate)) {
                    detach(this.tableBodyElement);
                    this.renderDecades(e);
                }
                else {
                    this.currentDate = date;
                }
                break;
            case 1:
                this.addMonths(this.currentDate, number);
                if (this.calendarMode === 'Gregorian') {
                    if (this.isMonthYearRange(this.currentDate)) {
                        detach(this.tableBodyElement);
                        this.renderYears(e);
                    }
                    else {
                        this.currentDate = date;
                    }
                }
                else {
                    if (this.isMonthYearRange(this.currentDate)) {
                        detach(this.tableBodyElement);
                        this.renderYears(e);
                    }
                    else {
                        this.currentDate = date;
                    }
                }
                break;
            case 0:
                this.addDay(this.currentDate, number, e, max, min);
                if (this.isMinMaxRange(this.currentDate)) {
                    detach(this.tableBodyElement);
                    this.renderMonths(e);
                }
                else {
                    this.currentDate = date;
                }
                break;
        }
    };
    /**
     * Initialize the event handler
     *
     * @param {Date} value - Specifies value of date.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CalendarBase.prototype.preRender = function (value) {
        var _this = this;
        this.navigatePreviousHandler = this.navigatePrevious.bind(this);
        this.navigateNextHandler = this.navigateNext.bind(this);
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.navigateHandler = function (e) {
            _this.triggerNavigate(e);
        };
    };
    CalendarBase.prototype.minMaxDate = function (localDate) {
        var currentDate = new Date(new Date(+localDate).setHours(0, 0, 0, 0));
        var minDate = new Date(new Date(+this.min).setHours(0, 0, 0, 0));
        var maxDate = new Date(new Date(+this.max).setHours(0, 0, 0, 0));
        if (+currentDate === +minDate || +currentDate === +maxDate) {
            if (+localDate < +this.min) {
                localDate = new Date(+this.min);
            }
            if (+localDate > +this.max) {
                localDate = new Date(+this.max);
            }
        }
        return localDate;
    };
    CalendarBase.prototype.renderMonths = function (e, value, isCustomDate) {
        var numCells = this.weekNumber ? 8 : 7;
        var tdEles;
        if (this.calendarMode === 'Gregorian') {
            tdEles = this.renderDays(this.currentDate, value, null, null, isCustomDate, e);
        }
        else {
            tdEles = !isNullOrUndefined(this.islamicModule) ? this.islamicModule.islamicRenderDays(this.currentDate, value) : null;
        }
        this.createContentHeader();
        if (this.calendarMode === 'Gregorian') {
            this.renderTemplate(tdEles, numCells, MONTH, e, value);
        }
        else if (!isNullOrUndefined(this.islamicModule)) {
            this.islamicModule.islamicRenderTemplate(tdEles, numCells, MONTH, e, value);
        }
    };
    CalendarBase.prototype.renderDays = function (currentDate, value, multiSelection, values, isTodayDate, e) {
        var tdEles = [];
        var cellsCount = 42;
        var todayDate = isTodayDate ? new Date(+currentDate) : this.getDate(new Date(), this.timezone);
        var localDate = new Date(this.checkValue(currentDate));
        var minMaxDate;
        var currentMonth = localDate.getMonth();
        this.titleUpdate(currentDate, 'days');
        var d = localDate;
        localDate = new Date(d.getFullYear(), d.getMonth(), 0, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        while (localDate.getDay() !== this.firstDayOfWeek) {
            this.setStartDate(localDate, -1 * dayMilliSeconds);
        }
        for (var day = 0; day < cellsCount; ++day) {
            var weekEle = this.createElement('td', { className: CELL });
            var weekAnchor = this.createElement('span');
            if (day % 7 === 0 && this.weekNumber) {
                // 6 days are added to get Last day of the week and 3 days are added to get middle day of the week.
                var numberOfDays = this.weekRule === 'FirstDay' ? 6 : (this.weekRule === 'FirstFourDayWeek' ? 3 : 0);
                var finalDate = new Date(localDate.getFullYear(), localDate.getMonth(), (localDate.getDate() + numberOfDays));
                weekAnchor.textContent = '' + this.getWeek(finalDate);
                weekEle.appendChild(weekAnchor);
                addClass([weekEle], '' + WEEKNUMBER);
                tdEles.push(weekEle);
            }
            minMaxDate = new Date(+localDate);
            localDate = this.minMaxDate(localDate);
            var dateFormatOptions = { type: 'dateTime', skeleton: 'full' };
            var date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            var tdEle = this.dayCell(localDate);
            var title = this.globalize.formatDate(localDate, { type: 'date', skeleton: 'full' });
            var dayLink = this.createElement('span');
            dayLink.textContent = this.globalize.formatDate(localDate, { format: 'd', type: 'date', skeleton: 'yMd' });
            var disabled = (this.min > localDate) || (this.max < localDate);
            if (disabled) {
                addClass([tdEle], DISABLED);
                addClass([tdEle], OVERLAY);
            }
            else {
                dayLink.setAttribute('title', '' + title);
            }
            if (currentMonth !== localDate.getMonth()) {
                addClass([tdEle], OTHERMONTH);
                dayLink.setAttribute('aria-disabled', 'true');
            }
            if (localDate.getDay() === 0 || localDate.getDay() === 6) {
                addClass([tdEle], WEEKEND);
            }
            tdEle.appendChild(dayLink);
            this.renderDayCellArgs = {
                date: localDate,
                isDisabled: false,
                element: tdEle,
                isOutOfRange: disabled
            };
            var argument = this.renderDayCellArgs;
            this.renderDayCellEvent(argument);
            if (argument.isDisabled) {
                var selectDate = new Date(this.checkValue(value));
                var argsDate = new Date(this.checkValue(argument.date));
                if (multiSelection) {
                    if (!isNullOrUndefined(values) && values.length > 0) {
                        for (var index = 0; index < values.length; index++) {
                            var localDateString = +new Date(this.globalize.formatDate(argument.date, { type: 'date', skeleton: 'yMd' }));
                            var tempDateString = +new Date(this.globalize.formatDate(values[index], { type: 'date', skeleton: 'yMd' }));
                            if (localDateString === tempDateString) {
                                values.splice(index, 1);
                                index = -1;
                            }
                        }
                    }
                }
                else if (selectDate && +selectDate === +argsDate) {
                    this.setProperties({ value: null }, true);
                }
            }
            if (this.renderDayCellArgs.isDisabled && !tdEle.classList.contains(SELECTED)) {
                addClass([tdEle], DISABLED);
                addClass([tdEle], OVERLAY);
                dayLink.setAttribute('aria-disabled', 'true');
                if (+this.renderDayCellArgs.date === +this.todayDate) {
                    this.todayDisabled = true;
                }
            }
            var otherMnthBool = tdEle.classList.contains(OTHERMONTH);
            var disabledCls = tdEle.classList.contains(DISABLED);
            if (!disabledCls) {
                EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            // to set the value as null while setting the disabled date onProperty change.
            // if (args.isDisabled && +this.value === +args.date) {
            //     this.setProperties({ value: null }, true);
            // }
            var currentTarget = void 0;
            if (!isNullOrUndefined(e) && e.type === 'click') {
                currentTarget = e.currentTarget;
            }
            if (multiSelection && !isNullOrUndefined(values) && !disabledCls) {
                for (var tempValue = 0; tempValue < values.length; tempValue++) {
                    var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                    var formatOptions = { format: null, type: 'date', skeleton: 'short', calendar: type };
                    var localDateString = this.globalize.formatDate(localDate, formatOptions);
                    var tempDateString = this.globalize.formatDate(values[tempValue], formatOptions);
                    if ((localDateString === tempDateString && this.getDateVal(localDate, values[tempValue]))
                        || (this.getDateVal(localDate, value))) {
                        addClass([tdEle], SELECTED);
                    }
                    if (!isNullOrUndefined(currentTarget) && currentTarget.innerText === tdEle.innerText &&
                        this.previousDates && tdEle.classList.contains(SELECTED) && currentTarget.classList.contains(SELECTED)) {
                        removeClass([tdEle], SELECTED);
                        this.previousDates = false;
                        var copyValues = this.copyValues(values);
                        for (var i = 0; i < copyValues.length; i++) {
                            var type_1 = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                            var formatOptions_1 = { format: null, type: 'date', skeleton: 'short', calendar: type_1 };
                            var localDateString_1 = this.globalize.formatDate(date, formatOptions_1);
                            var tempDateString_1 = this.globalize.formatDate(copyValues[i], formatOptions_1);
                            if (localDateString_1 === tempDateString_1) {
                                var index = copyValues.indexOf(copyValues[i]);
                                copyValues.splice(index, 1);
                                values.splice(index, 1);
                            }
                        }
                        this.setProperties({ values: copyValues }, true);
                    }
                    else {
                        this.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                    }
                }
                if (values.length <= 0) {
                    this.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                }
            }
            else if (!disabledCls && this.getDateVal(localDate, value)) {
                addClass([tdEle], SELECTED);
            }
            this.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
            if (!isNullOrUndefined(date) && date.getFullYear() === todayDate.getFullYear() && date.getMonth() === todayDate.getMonth()
                && date.getDate() === todayDate.getDate()) {
                addClass([tdEle], TODAY);
            }
            tdEles.push(this.renderDayCellArgs.element);
            localDate = new Date(+minMaxDate);
            this.addDay(localDate, 1, null, this.max, this.min);
        }
        return tdEles;
    };
    CalendarBase.prototype.updateFocus = function (otherMonth, disabled, localDate, tableElement, currentDate) {
        if (currentDate.getDate() === localDate.getDate() && !otherMonth && !disabled) {
            addClass([tableElement], FOCUSEDDATE);
        }
        else {
            // eslint-disable-next-line radix
            if (currentDate >= this.max && parseInt(tableElement.id, 0) === +this.max && !otherMonth && !disabled) {
                addClass([tableElement], FOCUSEDDATE);
            }
            // eslint-disable-next-line radix
            if (currentDate <= this.min && parseInt(tableElement.id, 0) === +this.min && !otherMonth && !disabled) {
                addClass([tableElement], FOCUSEDDATE);
            }
        }
    };
    CalendarBase.prototype.renderYears = function (e, value) {
        this.removeTableHeadElement();
        var numCells = 4;
        var tdEles = [];
        var valueUtil = isNullOrUndefined(value);
        var curDate = new Date(this.checkValue(this.currentDate));
        var mon = curDate.getMonth();
        var yr = curDate.getFullYear();
        var localDate = curDate;
        var curYrs = localDate.getFullYear();
        var minYr = new Date(this.checkValue(this.min)).getFullYear();
        var minMonth = new Date(this.checkValue(this.min)).getMonth();
        var maxYr = new Date(this.checkValue(this.max)).getFullYear();
        var maxMonth = new Date(this.checkValue(this.max)).getMonth();
        localDate.setMonth(0);
        this.titleUpdate(this.currentDate, 'months');
        localDate.setDate(1);
        for (var month = 0; month < 12; ++month) {
            var tdEle = this.dayCell(localDate);
            var dayLink = this.createElement('span');
            var localMonth = (value && (value).getMonth() === localDate.getMonth());
            var select = (value && (value).getFullYear() === yr && localMonth);
            var title = this.globalize.formatDate(localDate, { type: 'date', format: 'MMM y' });
            dayLink.textContent = this.toCapitalize(this.globalize.formatDate(localDate, {
                format: null, type: 'dateTime', skeleton: 'MMM'
            }));
            if ((this.min && (curYrs < minYr || (month < minMonth && curYrs === minYr))) || (this.max && (curYrs > maxYr || (month > maxMonth && curYrs >= maxYr)))) {
                addClass([tdEle], DISABLED);
            }
            else if (!valueUtil && select) {
                addClass([tdEle], SELECTED);
            }
            else {
                if (localDate.getMonth() === mon && this.currentDate.getMonth() === mon) {
                    addClass([tdEle], FOCUSEDDATE);
                }
            }
            localDate.setDate(1);
            localDate.setMonth(localDate.getMonth() + 1);
            if (!tdEle.classList.contains(DISABLED)) {
                EventHandler.add(tdEle, 'click', this.clickHandler, this);
                dayLink.setAttribute('title', '' + title);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.renderTemplate(tdEles, numCells, YEAR, e, value);
    };
    CalendarBase.prototype.renderDecades = function (e, value) {
        this.removeTableHeadElement();
        var numCells = 4;
        var yearCell = 12;
        var tdEles = [];
        var localDate = new Date(this.checkValue(this.currentDate));
        localDate.setMonth(0);
        localDate.setDate(1);
        var localYr = localDate.getFullYear();
        var startYr = new Date(localDate.setFullYear((localYr - localYr % 10)));
        var endYr = new Date(localDate.setFullYear((localYr - localYr % 10 + (10 - 1))));
        var startFullYr = startYr.getFullYear();
        var endFullYr = endYr.getFullYear();
        var startHdrYr = this.globalize.formatDate(startYr, {
            format: null, type: 'dateTime', skeleton: 'y'
        });
        var endHdrYr = this.globalize.formatDate(endYr, { format: null, type: 'dateTime', skeleton: 'y' });
        this.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
        var start = new Date(localYr - (localYr % 10) - 1, 0, 1);
        var startYear = start.getFullYear();
        for (var rowIterator = 0; rowIterator < yearCell; ++rowIterator) {
            var year = startYear + rowIterator;
            localDate.setFullYear(year);
            var tdEle = this.dayCell(localDate);
            var dayLink = this.createElement('span');
            dayLink.textContent = this.globalize.formatDate(localDate, {
                format: null, type: 'dateTime', skeleton: 'y'
            });
            if ((year < startFullYr) || (year > endFullYr)) {
                addClass([tdEle], OTHERDECADE);
                dayLink.setAttribute('aria-disabled', 'true');
                if (!isNullOrUndefined(value) && localDate.getFullYear() === (value).getFullYear()) {
                    addClass([tdEle], SELECTED);
                }
                if (year < new Date(this.checkValue(this.min)).getFullYear() ||
                    year > new Date(this.checkValue(this.max)).getFullYear()) {
                    addClass([tdEle], DISABLED);
                }
            }
            else if (year < new Date(this.checkValue(this.min)).getFullYear() ||
                year > new Date(this.checkValue(this.max)).getFullYear()) {
                addClass([tdEle], DISABLED);
            }
            else if (!isNullOrUndefined(value) && localDate.getFullYear() === (value).getFullYear()) {
                addClass([tdEle], SELECTED);
            }
            else {
                if (localDate.getFullYear() === this.currentDate.getFullYear() && !tdEle.classList.contains(DISABLED)) {
                    addClass([tdEle], FOCUSEDDATE);
                }
            }
            if (!tdEle.classList.contains(DISABLED)) {
                EventHandler.add(tdEle, 'click', this.clickHandler, this);
                dayLink.setAttribute('title', '' + dayLink.textContent);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.renderTemplate(tdEles, numCells, 'e-decade', e, value);
    };
    CalendarBase.prototype.dayCell = function (localDate) {
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
        var dateFormatOptions = { skeleton: 'full', type: 'dateTime', calendar: type };
        var date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
        var value;
        if (!isNullOrUndefined(date)) {
            value = date.valueOf();
        }
        var attrs = {
            className: CELL, attrs: { 'id': '' + getUniqueID('' + value), 'aria-selected': 'false' }
        };
        return this.createElement('td', attrs);
    };
    CalendarBase.prototype.firstDay = function (date) {
        var collection = this.currentView() !== 'Decade' ? this.tableBodyElement.querySelectorAll('td:not(.' + OTHERMONTH + '):not(.' + WEEKNUMBER + ')') :
            this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERDECADE + '');
        if (collection.length) {
            for (var i = 0; i < collection.length; i++) {
                if (!collection[i].classList.contains(DISABLED)) {
                    // eslint-disable-next-line radix
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    };
    CalendarBase.prototype.lastDay = function (date, view) {
        var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (view !== 2) {
            var timeOffset = Math.abs(lastDate.getTimezoneOffset() - this.firstDay(date).getTimezoneOffset());
            if (timeOffset) {
                lastDate.setHours(this.firstDay(date).getHours() + (timeOffset / 60));
            }
            return this.findLastDay(lastDate);
        }
        else {
            return this.findLastDay(this.firstDay(lastDate));
        }
    };
    CalendarBase.prototype.checkDateValue = function (value) {
        return (!isNullOrUndefined(value) && value instanceof Date && !isNaN(+value)) ? value : null;
    };
    CalendarBase.prototype.findLastDay = function (date) {
        var collection = this.currentView() === 'Decade' ? this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERDECADE + '') :
            this.tableBodyElement.querySelectorAll('td:not(.' + OTHERMONTH + '):not(.' + WEEKNUMBER + ')');
        if (collection.length) {
            for (var i = collection.length - 1; i >= 0; i--) {
                if (!collection[i].classList.contains(DISABLED)) {
                    // eslint-disable-next-line radix
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    };
    CalendarBase.prototype.removeTableHeadElement = function () {
        if (this.getModuleName() === 'calendar') {
            if (!isNullOrUndefined(this.element.querySelectorAll('.e-content table thead')[0])) {
                detach(this.tableHeadElement);
            }
        }
        else {
            if (!isNullOrUndefined(this.calendarElement.querySelectorAll('.e-content table thead')[0])) {
                detach(this.tableHeadElement);
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CalendarBase.prototype.renderTemplate = function (elements, count, classNm, e, value) {
        var view = this.getViewNumber(this.currentView());
        var trEle;
        this.tableBodyElement = this.createElement('tbody');
        this.table.appendChild(this.tableBodyElement);
        removeClass([this.contentElement, this.headerElement], [MONTH, DECADE, YEAR]);
        addClass([this.contentElement, this.headerElement], [classNm]);
        var weekNumCell = 41;
        var numberCell = 35;
        var otherMonthCell = 6;
        var row = count;
        var rowIterator = 0;
        for (var dayCell = 0; dayCell < elements.length / count; ++dayCell) {
            trEle = this.createElement('tr');
            for (rowIterator = 0 + rowIterator; rowIterator < row; rowIterator++) {
                if (!elements[rowIterator].classList.contains('e-week-number') && !isNullOrUndefined(elements[rowIterator].children[0])) {
                    addClass([elements[rowIterator].children[0]], [LINK]);
                    rippleEffect(elements[rowIterator].children[0], {
                        duration: 600,
                        isCenterRipple: true
                    });
                }
                trEle.appendChild(elements[rowIterator]);
                if (this.weekNumber && rowIterator === otherMonthCell + 1 && elements[otherMonthCell + 1].classList.contains(OTHERMONTH)) {
                    addClass([trEle], OTHERMONTHROW);
                }
                if (!this.weekNumber && rowIterator === otherMonthCell && elements[otherMonthCell].
                    classList.contains(OTHERMONTH)) {
                    addClass([trEle], OTHERMONTHROW);
                }
                if (this.weekNumber) {
                    if (rowIterator === weekNumCell && elements[weekNumCell].classList.contains(OTHERMONTH)) {
                        addClass([trEle], OTHERMONTHROW);
                    }
                }
                else {
                    if (rowIterator === numberCell && elements[numberCell].classList.contains(OTHERMONTH)) {
                        addClass([trEle], OTHERMONTHROW);
                    }
                }
            }
            row = row + count;
            rowIterator = rowIterator + 0;
            this.tableBodyElement.appendChild(trEle);
        }
        this.table.querySelector('tbody').className = this.effect;
        if (this.calendarMode === 'Gregorian') {
            this.iconHandler();
        }
        else {
            this.islamicModule.islamicIconHandler();
        }
        if (view !== this.getViewNumber(this.currentView()) || (view === 0 && view !== this.getViewNumber(this.currentView()))) {
            this.navigateHandler(e);
        }
        this.setAriaActiveDescendant();
    };
    CalendarBase.prototype.clickHandler = function (e, value) {
        this.clickEventEmitter(e);
        var eve = e.currentTarget;
        var view = this.getViewNumber(this.currentView());
        if (eve.classList.contains(OTHERMONTH)) {
            this.contentClick(e, 0, null, value);
        }
        else if (view === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
            this.contentClick(e, 1, null, value);
        }
        else if (2 === view) {
            this.contentClick(e, 1, null, value);
        }
        else if (!eve.classList.contains(OTHERMONTH) && view === 0) {
            this.selectDate(e, this.getIdValue(e, null), null);
        }
        else {
            this.contentClick(e, 0, eve, value);
        }
        if (this.getModuleName() === 'calendar') {
            this.table.focus();
        }
    };
    // Content click event handler required for extended components
    CalendarBase.prototype.clickEventEmitter = function (e) {
        e.preventDefault();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CalendarBase.prototype.contentClick = function (e, view, element, value) {
        var currentView = this.getViewNumber(this.currentView());
        var d = this.getIdValue(e, element);
        switch (view) {
            case 0:
                if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                    detach(this.tableBodyElement);
                    this.currentDate = d;
                    this.effect = ZOOMIN;
                    this.renderMonths(e);
                }
                else {
                    if (this.calendarMode === 'Gregorian') {
                        this.currentDate.setMonth(d.getMonth());
                        if (d.getMonth() > 0 && this.currentDate.getMonth() !== d.getMonth()) {
                            this.currentDate.setDate(0);
                        }
                        this.currentDate.setFullYear(d.getFullYear());
                    }
                    else {
                        this.currentDate = d;
                    }
                    this.effect = ZOOMIN;
                    detach(this.tableBodyElement);
                    this.renderMonths(e);
                }
                break;
            case 1:
                if (currentView === this.getViewNumber(this.depth) && this.getViewNumber(this.start) >= this.getViewNumber(this.depth)) {
                    this.selectDate(e, d, null);
                }
                else {
                    if (this.calendarMode === 'Gregorian') {
                        this.currentDate.setFullYear(d.getFullYear());
                    }
                    else {
                        this.islamicPreviousHeader = this.headerElement.textContent;
                        var islamicDate = this.islamicModule.getIslamicDate(d);
                        this.currentDate = this.islamicModule.toGregorian(islamicDate.year, islamicDate.month, 1);
                    }
                    this.effect = ZOOMIN;
                    detach(this.tableBodyElement);
                    this.renderYears(e);
                }
        }
    };
    CalendarBase.prototype.switchView = function (view, e, multiSelection, isCustomDate) {
        switch (view) {
            case 0:
                detach(this.tableBodyElement);
                this.renderMonths(e, null, isCustomDate);
                break;
            case 1:
                detach(this.tableBodyElement);
                this.renderYears(e);
                break;
            case 2:
                detach(this.tableBodyElement);
                this.renderDecades(e);
        }
    };
    /**
     * To get component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    CalendarBase.prototype.getModuleName = function () {
        return 'calendar';
    };
    /**
     *
     * @returns {void}
     * @deprecated
     */
    CalendarBase.prototype.requiredModules = function () {
        var modules = [];
        if (this.calendarMode === 'Islamic') {
            modules.push({ args: [this], member: 'islamic', name: 'Islamic' });
        }
        return modules;
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string}
     */
    CalendarBase.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CalendarBaseModel} newProp - Returns the dynamic property value of the component.
     * @param {CalendarBaseModel} oldProp - Returns the previous property value of the component.
     * @param {boolean} multiSelection - - Specifies whether multiple date selection is enabled or not.
     * @param {Date[]} values - Specifies the dates.
     * @returns {void}
     * @private
     */
    CalendarBase.prototype.onPropertyChanged = function (newProp, oldProp, multiSelection, values) {
        this.effect = '';
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        if (this.getModuleName() === 'calendar') {
                            this.element.classList.add('e-rtl');
                        }
                        else {
                            this.calendarElement.classList.add('e-rtl');
                        }
                    }
                    else {
                        if (this.getModuleName() === 'calendar') {
                            this.element.classList.remove('e-rtl');
                        }
                        else {
                            this.calendarElement.classList.remove('e-rtl');
                        }
                    }
                    break;
                case 'dayHeaderFormat':
                    this.getCultureValues();
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentHeader();
                    }
                    else if (this.calendarElement) {
                        this.createContentHeader();
                    }
                    this.adjustLongHeaderSize();
                    break;
                case 'min':
                case 'max':
                    this.rangeValidation(this.min, this.max);
                    if (prop === 'min') {
                        this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(newProp.min))) }, true);
                    }
                    else {
                        this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(newProp.max))) }, true);
                    }
                    this.setProperties({ start: this.currentView() }, true);
                    if (this.tableBodyElement) {
                        detach(this.tableBodyElement);
                    }
                    this.minMaxUpdate();
                    if (multiSelection) {
                        this.validateValues(multiSelection, values);
                    }
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentBody();
                    }
                    else if (this.calendarElement) {
                        this.createContentBody();
                    }
                    if ((this.todayDate < this.min || this.max < this.todayDate) && (this.footer) && (this.todayElement)) {
                        detach(this.todayElement);
                        detach(this.footer);
                        this.todayElement = this.footer = null;
                        this.createContentFooter();
                    }
                    else {
                        if ((this.footer) && (this.todayElement) && this.todayElement.classList.contains('e-disabled')) {
                            removeClass([this.todayElement], DISABLED);
                            detach(this.todayElement);
                            detach(this.footer);
                            this.todayElement = this.footer = null;
                            this.createContentFooter();
                        }
                    }
                    break;
                case 'start':
                case 'depth':
                case 'weekNumber':
                case 'firstDayOfWeek':
                case 'weekRule':
                    this.checkView();
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    else if (this.calendarElement) {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    if (this.getModuleName() !== 'datepicker') {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    else if (this.calendarElement) {
                        this.createContentHeader();
                        this.createContentBody();
                    }
                    if (this.getModuleName() === 'calendar') {
                        var l10nLocale = { today: 'Today' };
                        this.l10 = new L10n(this.getModuleName(), l10nLocale, this.locale);
                    }
                    this.l10.setLocale(this.locale);
                    if (this.showTodayButton) {
                        this.updateFooter();
                    }
                    break;
                case 'showTodayButton':
                    if (newProp.showTodayButton) {
                        this.createContentFooter();
                    }
                    else {
                        if (!isNullOrUndefined(this.todayElement) && !isNullOrUndefined(this.footer)) {
                            detach(this.todayElement);
                            detach(this.footer);
                            this.todayElement = this.footer = undefined;
                        }
                    }
                    this.setProperties({ showTodayButton: newProp.showTodayButton }, true);
                    break;
            }
        }
    };
    /**
     * values property updated with considered disabled dates of the calendar.
     *
     * @param {boolean} multiSelection - Specifies whether multiple date selection is enabled.
     * @param {Date[]} values - Specifies the dates to validate.
     * @returns {void}
     */
    CalendarBase.prototype.validateValues = function (multiSelection, values) {
        if (multiSelection && !isNullOrUndefined(values) && values.length > 0) {
            var copyValues = this.copyValues(values);
            for (var skipIndex = 0; skipIndex < copyValues.length; skipIndex++) {
                var tempValue = copyValues[skipIndex];
                var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                var tempValueString = void 0;
                if (this.calendarMode === 'Gregorian') {
                    tempValueString = this.globalize.formatDate(tempValue, { type: 'date', skeleton: 'yMd' });
                }
                else {
                    tempValueString = this.globalize.formatDate(tempValue, { type: 'dateTime', skeleton: 'full', calendar: 'islamic' });
                }
                var minFormatOption = { type: 'date', skeleton: 'yMd', calendar: type };
                var minStringValue = this.globalize.formatDate(this.min, minFormatOption);
                var minString = minStringValue;
                var maxFormatOption = { type: 'date', skeleton: 'yMd', calendar: type };
                var maxStringValue = this.globalize.formatDate(this.max, maxFormatOption);
                var maxString = maxStringValue;
                if (+new Date(tempValueString) < +new Date(minString) ||
                    +new Date(tempValueString) > +new Date(maxString)) {
                    copyValues.splice(skipIndex, 1);
                    skipIndex = -1;
                }
            }
            this.setProperties({ values: copyValues }, true);
        }
    };
    CalendarBase.prototype.setValueUpdate = function () {
        if (!isNullOrUndefined(this.tableBodyElement)) {
            detach(this.tableBodyElement);
            this.setProperties({ start: this.currentView() }, true);
            this.createContentBody();
        }
    };
    CalendarBase.prototype.copyValues = function (values) {
        var copyValues = [];
        if (!isNullOrUndefined(values) && values.length > 0) {
            for (var index = 0; index < values.length; index++) {
                copyValues.push(new Date(+values[index]));
            }
        }
        return copyValues;
    };
    CalendarBase.prototype.titleUpdate = function (date, view) {
        var globalize = new Internationalization(this.locale);
        var dayFormatOptions;
        var monthFormatOptions;
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
        if (this.calendarMode === 'Gregorian') {
            dayFormatOptions = globalize.formatDate(date, { type: 'dateTime', skeleton: 'yMMMM', calendar: type });
            monthFormatOptions = globalize.formatDate(date, {
                format: null, type: 'dateTime', skeleton: 'y', calendar: type
            });
        }
        else {
            dayFormatOptions = globalize.formatDate(date, { type: 'dateTime', format: 'MMMM y', calendar: type });
            monthFormatOptions = globalize.formatDate(date, { type: 'dateTime', format: 'y', calendar: type });
        }
        switch (view) {
            case 'days':
                this.headerTitleElement.textContent = this.toCapitalize(dayFormatOptions);
                break;
            case 'months':
                this.headerTitleElement.textContent = monthFormatOptions;
        }
    };
    CalendarBase.prototype.setActiveDescendant = function () {
        var id;
        var focusedEle = this.tableBodyElement.querySelector('tr td.e-focused-date');
        var selectedEle = this.tableBodyElement.querySelector('tr td.e-selected');
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
        var title;
        var view = this.currentView();
        if (view === 'Month') {
            title = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'full', calendar: type });
        }
        else if (view === 'Year') {
            if (type !== 'islamic') {
                title = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'yMMMM', calendar: type });
            }
            else {
                title = this.globalize.formatDate(this.currentDate, { type: 'date', skeleton: 'GyMMM', calendar: type });
            }
        }
        else {
            title = this.globalize.formatDate(this.currentDate, {
                format: null, type: 'date', skeleton: 'y', calendar: type
            });
        }
        if (selectedEle || focusedEle) {
            if (!isNullOrUndefined(selectedEle)) {
                selectedEle.setAttribute('aria-selected', 'true');
            }
            (focusedEle || selectedEle).setAttribute('aria-label', title);
            id = (focusedEle || selectedEle).getAttribute('id');
        }
        return id;
    };
    CalendarBase.prototype.iconHandler = function () {
        new Date(this.checkValue(this.currentDate)).setDate(1);
        switch (this.currentView()) {
            case 'Month':
                this.previousIconHandler(this.compareMonth(new Date(this.checkValue(this.currentDate)), this.min) < 1);
                this.nextIconHandler(this.compareMonth(new Date(this.checkValue(this.currentDate)), this.max) > -1);
                break;
            case 'Year':
                this.previousIconHandler(this.compareYear(new Date(this.checkValue(this.currentDate)), this.min) < 1);
                this.nextIconHandler(this.compareYear(new Date(this.checkValue(this.currentDate)), this.max) > -1);
                break;
            case 'Decade':
                this.previousIconHandler(this.compareDecade(new Date(this.checkValue(this.currentDate)), this.min) < 1);
                this.nextIconHandler(this.compareDecade(new Date(this.checkValue(this.currentDate)), this.max) > -1);
        }
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    CalendarBase.prototype.destroy = function () {
        if (this.getModuleName() === 'calendar' && this.element) {
            removeClass([this.element], [ROOT]);
        }
        else {
            if (this.calendarElement && this.element) {
                removeClass([this.element], [ROOT]);
            }
        }
        if (this.getModuleName() === 'calendar' && this.element) {
            if (!isNullOrUndefined(this.headerTitleElement)) {
                EventHandler.remove(this.headerTitleElement, 'click', this.navigateTitle);
            }
            if (this.todayElement) {
                EventHandler.remove(this.todayElement, 'click', this.todayButtonClick);
            }
            this.previousIconHandler(true);
            this.nextIconHandler(true);
            this.keyboardModule.destroy();
            this.element.removeAttribute('data-role');
            if (!isNullOrUndefined(this.calendarEleCopy.getAttribute('tabindex'))) {
                this.element.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.element.removeAttribute('tabindex');
            }
        }
        if (this.element) {
            this.element.innerHTML = '';
        }
        this.todayElement = null;
        this.tableBodyElement = null;
        this.todayButtonEvent = null;
        this.renderDayCellArgs = null;
        this.headerElement = null;
        this.nextIcon = null;
        this.table = null;
        this.tableHeadElement = null;
        this.previousIcon = null;
        this.headerTitleElement = null;
        this.footer = null;
        this.contentElement = null;
        _super.prototype.destroy.call(this);
    };
    CalendarBase.prototype.title = function (e) {
        var currentView = this.getViewNumber(this.currentView());
        this.effect = ZOOMIN;
        this.switchView(++currentView, e);
    };
    CalendarBase.prototype.getViewNumber = function (stringVal) {
        if (stringVal === 'Month') {
            return 0;
        }
        else if (stringVal === 'Year') {
            return 1;
        }
        else {
            return 2;
        }
    };
    CalendarBase.prototype.navigateTitle = function (e) {
        e.preventDefault();
        this.title(e);
    };
    CalendarBase.prototype.previous = function () {
        this.effect = '';
        var currentView = this.getViewNumber(this.currentView());
        switch (this.currentView()) {
            case 'Month':
                this.addMonths(this.currentDate, -1);
                this.switchView(currentView);
                break;
            case 'Year':
                this.addYears(this.currentDate, -1);
                this.switchView(currentView);
                break;
            case 'Decade':
                this.addYears(this.currentDate, -10);
                this.switchView(currentView);
                break;
        }
    };
    CalendarBase.prototype.navigatePrevious = function (e) {
        !Browser.isDevice && e.preventDefault();
        if (this.calendarMode === 'Gregorian') {
            this.previous();
        }
        else {
            this.islamicModule.islamicPrevious();
        }
        this.triggerNavigate(e);
    };
    CalendarBase.prototype.next = function () {
        this.effect = '';
        var currentView = this.getViewNumber(this.currentView());
        switch (this.currentView()) {
            case 'Month':
                this.addMonths(this.currentDate, 1);
                this.switchView(currentView);
                break;
            case 'Year':
                this.addYears(this.currentDate, 1);
                this.switchView(currentView);
                break;
            case 'Decade':
                this.addYears(this.currentDate, 10);
                this.switchView(currentView);
                break;
        }
    };
    CalendarBase.prototype.navigateNext = function (eve) {
        !Browser.isDevice && eve.preventDefault();
        if (this.calendarMode === 'Gregorian') {
            this.next();
        }
        else {
            this.islamicModule.islamicNext();
        }
        this.triggerNavigate(eve);
    };
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param {string} view - Specifies the view of the Calendar.
     * @param {Date} date - Specifies the focused date in a view.
     * @param {boolean} isCustomDate - Specifies whether the calendar is rendered with custom today date or not.
     * @returns {void}
     */
    CalendarBase.prototype.navigateTo = function (view, date, isCustomDate) {
        if (+date >= +this.min && +date <= +this.max) {
            this.currentDate = date;
        }
        if (+date <= +this.min) {
            this.currentDate = new Date(this.checkValue(this.min));
        }
        if (+date >= +this.max) {
            this.currentDate = new Date(this.checkValue(this.max));
        }
        if ((this.getViewNumber(this.depth) >= this.getViewNumber(view))) {
            if ((this.getViewNumber(this.depth) <= this.getViewNumber(this.start))
                || this.getViewNumber(this.depth) === this.getViewNumber(view)) {
                view = this.depth;
            }
        }
        this.switchView(this.getViewNumber(view), null, null, isCustomDate);
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     */
    CalendarBase.prototype.currentView = function () {
        if (!isNullOrUndefined(this.contentElement) && this.contentElement.classList.contains(YEAR)) {
            return 'Year';
        }
        else if (!isNullOrUndefined(this.contentElement) && this.contentElement.classList.contains(DECADE)) {
            return 'Decade';
        }
        else {
            return 'Month';
        }
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    CalendarBase.prototype.getDateVal = function (date, value) {
        return (!isNullOrUndefined(value) && date.getDate() === (value).getDate()
            && date.getMonth() === (value).getMonth() && date.getFullYear() === (value).getFullYear());
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    CalendarBase.prototype.getCultureObjects = function (ld, c) {
        var gregorianFormat = !isNullOrUndefined(this.dayHeaderFormat) ? '.dates.calendars.gregorian.days.format.' + this.dayHeaderFormat.toLowerCase() : null;
        var islamicFormat = !isNullOrUndefined(this.dayHeaderFormat) ? '.dates.calendars.islamic.days.format.' + this.dayHeaderFormat.toLowerCase() : null;
        var mainVal = 'main.';
        if (this.calendarMode === 'Gregorian') {
            return getValue(mainVal + '' + this.locale + gregorianFormat, ld);
        }
        else {
            return getValue('main.' + '' + this.locale + islamicFormat, ld);
        }
    };
    CalendarBase.prototype.getWeek = function (d) {
        var currentDate = new Date(this.checkValue(d)).valueOf();
        var date = new Date(d.getFullYear(), 0, 1).valueOf();
        return Math.ceil((((currentDate - date) + dayMilliSeconds) / dayMilliSeconds) / 7);
    };
    CalendarBase.prototype.setStartDate = function (date, time) {
        var tzOffset = date.getTimezoneOffset();
        var d = new Date(date.getTime() + time);
        var tzOffsetDiff = d.getTimezoneOffset() - tzOffset;
        date.setTime(d.getTime() + tzOffsetDiff * minutesMilliSeconds);
    };
    CalendarBase.prototype.addMonths = function (date, i) {
        if (this.calendarMode === 'Gregorian') {
            var day = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        }
        else {
            var islamicDate = this.islamicModule.getIslamicDate(date);
            this.currentDate = this.islamicModule.toGregorian(islamicDate.year, (islamicDate.month) + i, 1);
        }
    };
    CalendarBase.prototype.addYears = function (date, i) {
        if (this.calendarMode === 'Gregorian') {
            var day = date.getDate();
            date.setDate(1);
            date.setFullYear(date.getFullYear() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        }
        else {
            var islamicDate = this.islamicModule.getIslamicDate(date);
            this.currentDate = this.islamicModule.toGregorian(islamicDate.year + i, (islamicDate.month), 1);
        }
    };
    CalendarBase.prototype.getIdValue = function (e, element) {
        var eve;
        if (e) {
            eve = e.currentTarget;
        }
        else {
            eve = element;
        }
        var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
        var dateFormatOptions = { type: 'dateTime', skeleton: 'full', calendar: type };
        // eslint-disable-next-line radix
        var dateString = this.globalize.formatDate(new Date(parseInt('' + eve.getAttribute('id'), 0)), dateFormatOptions);
        var date = this.globalize.parseDate(dateString, dateFormatOptions);
        var value = date.valueOf() - date.valueOf() % 1000;
        return new Date(value);
        //return this.globalize.parseDate(dateString, dateFormatOptions);
    };
    CalendarBase.prototype.adjustLongHeaderSize = function () {
        removeClass([this.element], DAYHEADERLONG);
        if (this.dayHeaderFormat === 'Wide') {
            addClass([this.getModuleName() === 'calendar' ? this.element : this.calendarElement], DAYHEADERLONG);
        }
    };
    CalendarBase.prototype.selectDate = function (e, date, node, multiSelection, values) {
        var element = node || e.currentTarget;
        this.isDateSelected = false;
        if (this.currentView() === 'Decade') {
            this.setDateDecade(this.currentDate, date.getFullYear());
        }
        else if (this.currentView() === 'Year') {
            this.setDateYear(this.currentDate, date);
        }
        else {
            if (multiSelection && !this.checkPresentDate(date, values)) {
                var copyValues = this.copyValues(values);
                if (!isNullOrUndefined(values) && copyValues.length > 0) {
                    copyValues.push(new Date(this.checkValue(date)));
                    this.setProperties({ values: copyValues }, true);
                    this.setProperties({ value: values[values.length - 1] }, true);
                }
                else {
                    this.setProperties({ values: [new Date(this.checkValue(date))] }, true);
                }
            }
            else {
                this.setProperties({ value: new Date(this.checkValue(date)) }, true);
            }
            this.currentDate = new Date(this.checkValue(date));
        }
        var tableBodyElement = closest(element, '.' + ROOT);
        if (isNullOrUndefined(tableBodyElement)) {
            tableBodyElement = this.tableBodyElement;
        }
        if (!multiSelection && !isNullOrUndefined(tableBodyElement.querySelector('.' + SELECTED))) {
            removeClass([tableBodyElement.querySelector('.' + SELECTED)], SELECTED);
        }
        if (!multiSelection && !isNullOrUndefined(tableBodyElement.querySelector('.' + FOCUSEDDATE))) {
            removeClass([tableBodyElement.querySelector('.' + FOCUSEDDATE)], FOCUSEDDATE);
        }
        if (!multiSelection && !isNullOrUndefined(tableBodyElement.querySelector('.' + FOCUSEDCELL))) {
            removeClass([tableBodyElement.querySelector('.' + FOCUSEDCELL)], FOCUSEDCELL);
        }
        if (multiSelection) {
            var copyValues = this.copyValues(values);
            var collection = Array.prototype.slice.call(this.tableBodyElement.querySelectorAll('td'));
            for (var index = 0; index < collection.length; index++) {
                var tempElement = tableBodyElement.querySelectorAll('td' + '.' + FOCUSEDDATE)[0];
                var selectedElement = tableBodyElement.querySelectorAll('td' + '.' + SELECTED)[0];
                if (collection[index] === tempElement) {
                    removeClass([collection[index]], FOCUSEDDATE);
                }
                if (collection[index] === selectedElement &&
                    !this.checkPresentDate(new Date(parseInt(selectedElement.getAttribute('id').split('_')[0], 10)), values)) {
                    removeClass([collection[index]], SELECTED);
                }
            }
            if (element.classList.contains(SELECTED)) {
                removeClass([element], SELECTED);
                for (var i = 0; i < copyValues.length; i++) {
                    var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                    var formatOptions = { format: null, type: 'date', skeleton: 'short', calendar: type };
                    var localDateString = this.globalize.formatDate(date, formatOptions);
                    var tempDateString = this.globalize.formatDate(copyValues[i], formatOptions);
                    if (localDateString === tempDateString) {
                        var index = copyValues.indexOf(copyValues[i]);
                        copyValues.splice(index, 1);
                        addClass([element], FOCUSEDDATE);
                    }
                }
                this.setProperties({ values: copyValues }, true);
            }
            else {
                addClass([element], SELECTED);
            }
        }
        else {
            addClass([element], SELECTED);
        }
        this.isDateSelected = true;
    };
    CalendarBase.prototype.checkPresentDate = function (dates, values) {
        var previousValue = false;
        if (!isNullOrUndefined(values)) {
            for (var checkPrevious = 0; checkPrevious < values.length; checkPrevious++) {
                var type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                var localDateString = this.globalize.formatDate(dates, {
                    format: null, type: 'date', skeleton: 'short', calendar: type
                });
                var tempDateString = this.globalize.formatDate(values[checkPrevious], {
                    format: null, type: 'date', skeleton: 'short', calendar: type
                });
                if (localDateString === tempDateString) {
                    previousValue = true;
                }
            }
        }
        return previousValue;
    };
    CalendarBase.prototype.setAriaActiveDescendant = function () {
        attributes(this.table, {
            'aria-activedescendant': '' + this.setActiveDescendant()
        });
    };
    CalendarBase.prototype.previousIconHandler = function (disabled) {
        if (disabled) {
            if (!isNullOrUndefined(this.previousIcon)) {
                EventHandler.remove(this.previousIcon, 'click', this.navigatePreviousHandler);
                addClass([this.previousIcon], '' + DISABLED);
                addClass([this.previousIcon], '' + OVERLAY);
                this.previousIcon.setAttribute('aria-disabled', 'true');
            }
        }
        else {
            EventHandler.add(this.previousIcon, 'click', this.navigatePreviousHandler);
            removeClass([this.previousIcon], '' + DISABLED);
            removeClass([this.previousIcon], '' + OVERLAY);
            this.previousIcon.setAttribute('aria-disabled', 'false');
        }
    };
    CalendarBase.prototype.renderDayCellEvent = function (args) {
        extend(this.renderDayCellArgs, { name: 'renderDayCell' });
        this.trigger('renderDayCell', args);
    };
    CalendarBase.prototype.navigatedEvent = function (eve) {
        extend(this.navigatedArgs, { name: 'navigated', event: eve });
        this.trigger('navigated', this.navigatedArgs);
    };
    CalendarBase.prototype.triggerNavigate = function (event) {
        this.navigatedArgs = { view: this.currentView(), date: this.currentDate };
        this.navigatedEvent(event);
    };
    CalendarBase.prototype.nextIconHandler = function (disabled) {
        if (disabled) {
            if (!isNullOrUndefined(this.previousIcon)) {
                EventHandler.remove(this.nextIcon, 'click', this.navigateNextHandler);
                addClass([this.nextIcon], DISABLED);
                addClass([this.nextIcon], OVERLAY);
                this.nextIcon.setAttribute('aria-disabled', 'true');
            }
        }
        else {
            EventHandler.add(this.nextIcon, 'click', this.navigateNextHandler);
            removeClass([this.nextIcon], DISABLED);
            removeClass([this.nextIcon], OVERLAY);
            this.nextIcon.setAttribute('aria-disabled', 'false');
        }
    };
    CalendarBase.prototype.compare = function (startDate, endDate, modifier) {
        var start = endDate.getFullYear();
        var end;
        var result;
        end = start;
        result = 0;
        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }
        if (startDate.getFullYear() > end) {
            result = 1;
        }
        else if (startDate.getFullYear() < start) {
            result = -1;
        }
        return result;
    };
    CalendarBase.prototype.isMinMaxRange = function (date) {
        return +date >= +this.min && +date <= +this.max;
    };
    CalendarBase.prototype.isMonthYearRange = function (date) {
        if (this.calendarMode === 'Gregorian') {
            return date.getMonth() >= this.min.getMonth()
                && date.getFullYear() >= this.min.getFullYear()
                && date.getMonth() <= this.max.getMonth()
                && date.getFullYear() <= this.max.getFullYear();
        }
        else {
            var islamicDate = this.islamicModule.getIslamicDate(date);
            return islamicDate.month >= (this.islamicModule.getIslamicDate(new Date(1944, 1, 18))).month
                && islamicDate.year >= (this.islamicModule.getIslamicDate(new Date(1944, 1, 18))).year
                && islamicDate.month <= (this.islamicModule.getIslamicDate(new Date(2069, 1, 16))).month
                && islamicDate.year <= (this.islamicModule.getIslamicDate(new Date(2069, 1, 16))).year;
        }
    };
    CalendarBase.prototype.compareYear = function (start, end) {
        return this.compare(start, end, 0);
    };
    CalendarBase.prototype.compareDecade = function (start, end) {
        return this.compare(start, end, 10);
    };
    CalendarBase.prototype.shiftArray = function (array, i) {
        return array.slice(i).concat(array.slice(0, i));
    };
    CalendarBase.prototype.addDay = function (date, i, e, max, min) {
        var column = i;
        var value = new Date(+date);
        if (!isNullOrUndefined(this.tableBodyElement) && !isNullOrUndefined(e)) {
            while (this.findNextTD(new Date(+date), column, max, min)) {
                column += i;
            }
            var rangeValue = new Date(value.setDate(value.getDate() + column));
            column = (+rangeValue > +max || +rangeValue < +min) ? column === i ? i - i : i : column;
        }
        date.setDate(date.getDate() + column);
    };
    CalendarBase.prototype.findNextTD = function (date, column, max, min) {
        var value = new Date(date.setDate(date.getDate() + column));
        var collection = [];
        var isDisabled = false;
        if ((!isNullOrUndefined(value) && value.getMonth()) === (!isNullOrUndefined(this.currentDate) && this.currentDate.getMonth())) {
            var tdEles = void 0;
            if (this.calendarMode === 'Gregorian') {
                tdEles = this.renderDays(value);
            }
            else {
                tdEles = this.islamicModule.islamicRenderDays(this.currentDate, value);
            }
            collection = tdEles.filter(function (element) {
                return element.classList.contains(DISABLED);
            });
        }
        else {
            collection = this.tableBodyElement.querySelectorAll('td.' + DISABLED);
        }
        if (+value <= (+(max)) && +value >= (+(min))) {
            if (collection.length) {
                for (var i = 0; i < collection.length; i++) {
                    // eslint-disable-next-line radix
                    isDisabled = (+value === +new Date(parseInt(collection[i].id, 0))) ? true : false;
                    if (isDisabled) {
                        break;
                    }
                }
            }
        }
        return isDisabled;
    };
    CalendarBase.prototype.getMaxDays = function (d) {
        var date;
        var tmpDate = new Date(this.checkValue(d));
        date = 28;
        var month = tmpDate.getMonth();
        while (tmpDate.getMonth() === month) {
            ++date;
            tmpDate.setDate(date);
        }
        return date - 1;
    };
    CalendarBase.prototype.setDateDecade = function (date, year) {
        date.setFullYear(year);
        this.setProperties({ value: new Date(this.checkValue(date)) }, true);
    };
    CalendarBase.prototype.setDateYear = function (date, value) {
        date.setFullYear(value.getFullYear(), value.getMonth(), date.getDate());
        if (value.getMonth() !== date.getMonth()) {
            date.setDate(0);
            this.currentDate = new Date(this.checkValue(value));
        }
        this.setProperties({ value: new Date(this.checkValue(date)) }, true);
    };
    CalendarBase.prototype.compareMonth = function (start, end) {
        var result;
        if (start.getFullYear() > end.getFullYear()) {
            result = 1;
        }
        else if (start.getFullYear() < end.getFullYear()) {
            result = -1;
        }
        else {
            result = start.getMonth() === end.getMonth() ? 0 : start.getMonth() > end.getMonth() ? 1 : -1;
        }
        return result;
    };
    CalendarBase.prototype.checkValue = function (inValue) {
        if (inValue instanceof Date) {
            return (inValue.toUTCString());
        }
        else {
            return ('' + inValue);
        }
    };
    CalendarBase.prototype.checkView = function () {
        if (this.start !== 'Decade' && this.start !== 'Year') {
            this.setProperties({ start: 'Month' }, true);
        }
        if (this.depth !== 'Decade' && this.depth !== 'Year') {
            this.setProperties({ depth: 'Month' }, true);
        }
        if (this.getViewNumber(this.depth) > this.getViewNumber(this.start)) {
            this.setProperties({ depth: 'Month' }, true);
        }
    };
    CalendarBase.prototype.getDate = function (date, timezone) {
        if (timezone) {
            date = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        }
        return date;
    };
    __decorate([
        Property(new Date(1900, 0, 1))
    ], CalendarBase.prototype, "min", void 0);
    __decorate([
        Property(true)
    ], CalendarBase.prototype, "enabled", void 0);
    __decorate([
        Property(null)
    ], CalendarBase.prototype, "cssClass", void 0);
    __decorate([
        Property(new Date(2099, 11, 31))
    ], CalendarBase.prototype, "max", void 0);
    __decorate([
        Property(null)
    ], CalendarBase.prototype, "firstDayOfWeek", void 0);
    __decorate([
        Property('Gregorian')
    ], CalendarBase.prototype, "calendarMode", void 0);
    __decorate([
        Property('Month')
    ], CalendarBase.prototype, "start", void 0);
    __decorate([
        Property('Month')
    ], CalendarBase.prototype, "depth", void 0);
    __decorate([
        Property(false)
    ], CalendarBase.prototype, "weekNumber", void 0);
    __decorate([
        Property('FirstDay')
    ], CalendarBase.prototype, "weekRule", void 0);
    __decorate([
        Property(true)
    ], CalendarBase.prototype, "showTodayButton", void 0);
    __decorate([
        Property('Short')
    ], CalendarBase.prototype, "dayHeaderFormat", void 0);
    __decorate([
        Property(false)
    ], CalendarBase.prototype, "enablePersistence", void 0);
    __decorate([
        Property(null)
    ], CalendarBase.prototype, "keyConfigs", void 0);
    __decorate([
        Property(null)
    ], CalendarBase.prototype, "serverTimezoneOffset", void 0);
    __decorate([
        Event()
    ], CalendarBase.prototype, "created", void 0);
    __decorate([
        Event()
    ], CalendarBase.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], CalendarBase.prototype, "navigated", void 0);
    __decorate([
        Event()
    ], CalendarBase.prototype, "renderDayCell", void 0);
    CalendarBase = __decorate([
        NotifyPropertyChanges
    ], CalendarBase);
    return CalendarBase;
}(Component));
export { CalendarBase };
/**
 * Represents the Calendar component that allows the user to select a date.
 * ```html
 * <div id="calendar"/>
 * ```
 * ```typescript
 * <script>
 *   var calendarObj = new Calendar({ value: new Date() });
 *   calendarObj.appendTo("#calendar");
 * </script>
 * ```
 */
var Calendar = /** @class */ (function (_super) {
    __extends(Calendar, _super);
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     *
     * @param {CalendarModel} options - Specifies the Calendar model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function Calendar(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    Calendar.prototype.render = function () {
        if (this.calendarMode === 'Islamic' && this.islamicModule === undefined) {
            throwError('Requires the injectable Islamic modules to render Calendar in Islamic mode');
        }
        if (this.isMultiSelection && typeof this.values === 'object' && !isNullOrUndefined(this.values) && this.values.length > 0) {
            var tempValues = [];
            var copyValues = [];
            for (var limit = 0; limit < this.values.length; limit++) {
                if (tempValues.indexOf(+this.values[limit]) === -1) {
                    tempValues.push(+this.values[limit]);
                    copyValues.push(this.values[limit]);
                }
            }
            this.setProperties({ values: copyValues }, true);
            for (var index = 0; index < this.values.length; index++) {
                if (!this.checkDateValue(this.values[index])) {
                    if (typeof (this.values[index]) === 'string' && this.checkDateValue(new Date(this.checkValue(this.values[index])))) {
                        var copyDate = new Date(this.checkValue(this.values[index]));
                        this.values.splice(index, 1);
                        this.values.splice(index, 0, copyDate);
                    }
                    else {
                        this.values.splice(index, 1);
                    }
                }
            }
            this.setProperties({ value: this.values[this.values.length - 1] }, true);
            this.previousValues = this.values.length;
        }
        this.validateDate();
        this.minMaxUpdate();
        if (this.getModuleName() === 'calendar') {
            this.setEnable(this.enabled);
            this.setClass(this.cssClass);
        }
        _super.prototype.render.call(this);
        if (this.getModuleName() === 'calendar') {
            var form = closest(this.element, 'form');
            if (form) {
                EventHandler.add(form, 'reset', this.formResetHandler.bind(this));
            }
            this.setTimeZone(this.serverTimezoneOffset);
        }
        this.renderComplete();
    };
    Calendar.prototype.setEnable = function (enable) {
        if (!enable) {
            addClass([this.element], DISABLED);
        }
        else {
            removeClass([this.element], DISABLED);
        }
    };
    Calendar.prototype.setClass = function (newCssClass, oldCssClass) {
        if (!isNullOrUndefined(oldCssClass)) {
            oldCssClass = (oldCssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(newCssClass)) {
            newCssClass = (newCssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(oldCssClass) && oldCssClass !== '') {
            removeClass([this.element], oldCssClass.split(' '));
        }
        if (!isNullOrUndefined(newCssClass)) {
            addClass([this.element], newCssClass.split(' '));
        }
    };
    Calendar.prototype.isDayLightSaving = function () {
        var secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        var firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    };
    Calendar.prototype.setTimeZone = function (offsetValue) {
        if (!isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            var serverTimezoneDiff = offsetValue;
            var clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            var timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date(this.value.getTime() + (timeZoneDiff * 60 * 60 * 1000));
        }
    };
    Calendar.prototype.formResetHandler = function () {
        this.setProperties({ value: null }, true);
    };
    Calendar.prototype.validateDate = function () {
        if (typeof this.value === 'string') {
            this.setProperties({ value: this.checkDateValue(new Date(this.checkValue(this.value))) }, true); // persist the value property.
        }
        _super.prototype.validateDate.call(this, this.value);
        if (!isNullOrUndefined(this.value) && this.min <= this.max && this.value >= this.min && this.value <= this.max) {
            this.currentDate = new Date(this.checkValue(this.value));
        }
        if (isNaN(+this.value)) {
            this.setProperties({ value: null }, true);
        }
    };
    Calendar.prototype.minMaxUpdate = function () {
        if (this.getModuleName() === 'calendar') {
            if (!isNullOrUndefined(this.value) && this.value <= this.min && this.min <= this.max) {
                this.setProperties({ value: this.min }, true);
                this.changedArgs = { value: this.value };
            }
            else {
                if (!isNullOrUndefined(this.value) && this.value >= this.max && this.min <= this.max) {
                    this.setProperties({ value: this.max }, true);
                    this.changedArgs = { value: this.value };
                }
            }
        }
        if (this.getModuleName() !== 'calendar' && !isNullOrUndefined(this.value)) {
            if (!isNullOrUndefined(this.value) && this.value < this.min && this.min <= this.max) {
                _super.prototype.minMaxUpdate.call(this, this.min);
            }
            else {
                if (!isNullOrUndefined(this.value) && this.value > this.max && this.min <= this.max) {
                    _super.prototype.minMaxUpdate.call(this, this.max);
                }
            }
        }
        else {
            _super.prototype.minMaxUpdate.call(this, this.value);
        }
    };
    Calendar.prototype.generateTodayVal = function (value) {
        var tempValue = new Date();
        if (!isNullOrUndefined(this.timezone)) {
            tempValue = _super.prototype.getDate.call(this, tempValue, this.timezone);
        }
        if (value && isNullOrUndefined(this.timezone)) {
            tempValue.setHours(value.getHours());
            tempValue.setMinutes(value.getMinutes());
            tempValue.setSeconds(value.getSeconds());
            tempValue.setMilliseconds(value.getMilliseconds());
        }
        else {
            tempValue = new Date(tempValue.getFullYear(), tempValue.getMonth(), tempValue.getDate(), 0, 0, 0, 0);
        }
        return tempValue;
    };
    Calendar.prototype.todayButtonClick = function (e) {
        if (this.showTodayButton) {
            var tempValue = this.generateTodayVal(this.value);
            this.setProperties({ value: tempValue }, true);
            this.isTodayClicked = true;
            this.todayButtonEvent = e;
            if (this.isMultiSelection) {
                var copyValues = this.copyValues(this.values);
                if (!_super.prototype.checkPresentDate.call(this, tempValue, this.values)) {
                    copyValues.push(tempValue);
                    this.setProperties({ values: copyValues });
                }
            }
            _super.prototype.todayButtonClick.call(this, e, new Date(+this.value));
        }
    };
    Calendar.prototype.keyActionHandle = function (e) {
        _super.prototype.keyActionHandle.call(this, e, this.value, this.isMultiSelection);
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    Calendar.prototype.preRender = function () {
        var _this = this;
        this.changeHandler = function (e) {
            _this.triggerChange(e);
        };
        this.checkView();
        _super.prototype.preRender.call(this, this.value);
    };
    /**
     * @returns {void}
     * @deprecated
     */
    Calendar.prototype.createContent = function () {
        this.previousDate = this.value;
        this.previousDateTime = this.value;
        _super.prototype.createContent.call(this);
    };
    Calendar.prototype.minMaxDate = function (localDate) {
        return _super.prototype.minMaxDate.call(this, localDate);
    };
    Calendar.prototype.renderMonths = function (e, value, isCustomDate) {
        _super.prototype.renderMonths.call(this, e, this.value, isCustomDate);
    };
    Calendar.prototype.renderDays = function (currentDate, value, isMultiSelect, values, isCustomDate, e) {
        var tempDays = _super.prototype.renderDays.call(this, currentDate, this.value, this.isMultiSelection, this.values, isCustomDate, e);
        if (this.isMultiSelection) {
            _super.prototype.validateValues.call(this, this.isMultiSelection, this.values);
        }
        return tempDays;
    };
    Calendar.prototype.renderYears = function (e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderYears.call(this, e, this.value);
        }
        else {
            this.islamicModule.islamicRenderYears(e, this.value);
        }
    };
    Calendar.prototype.renderDecades = function (e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderDecades.call(this, e, this.value);
        }
        else {
            this.islamicModule.islamicRenderDecade(e, this.value);
        }
    };
    Calendar.prototype.renderTemplate = function (elements, count, classNm, e) {
        if (this.calendarMode === 'Gregorian') {
            _super.prototype.renderTemplate.call(this, elements, count, classNm, e, this.value);
        }
        else {
            this.islamicModule.islamicRenderTemplate(elements, count, classNm, e, this.value);
        }
        this.changedArgs = { value: this.value, values: this.values };
        e && e.type === 'click' && e.currentTarget.classList.contains(OTHERMONTH) ? this.changeHandler(e) : this.changeHandler();
    };
    Calendar.prototype.clickHandler = function (e) {
        var eve = e.currentTarget;
        this.isPopupClicked = true;
        if (eve.classList.contains(OTHERMONTH)) {
            if (this.isMultiSelection) {
                var copyValues = this.copyValues(this.values);
                if (copyValues.toString().indexOf(this.getIdValue(e, null).toString()) === -1) {
                    copyValues.push(this.getIdValue(e, null));
                    this.setProperties({ values: copyValues }, true);
                    this.setProperties({ value: this.values[this.values.length - 1] }, true);
                }
                else {
                    this.previousDates = true;
                }
            }
            else {
                this.setProperties({ value: this.getIdValue(e, null) }, true);
            }
        }
        var storeView = this.currentView();
        _super.prototype.clickHandler.call(this, e, this.value);
        if (this.isMultiSelection && this.currentDate !== this.value &&
            !isNullOrUndefined(this.tableBodyElement.querySelectorAll('.' + FOCUSEDDATE)[0]) && storeView === 'Year') {
            this.tableBodyElement.querySelectorAll('.' + FOCUSEDDATE)[0].classList.remove(FOCUSEDDATE);
        }
    };
    Calendar.prototype.switchView = function (view, e, isMultiSelection, isCustomDate) {
        _super.prototype.switchView.call(this, view, e, this.isMultiSelection, isCustomDate);
    };
    /**
     * To get component name
     *
     * @returns {string} Return the component name.
     * @private
     */
    Calendar.prototype.getModuleName = function () {
        _super.prototype.getModuleName.call(this);
        return 'calendar';
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string}
     */
    Calendar.prototype.getPersistData = function () {
        _super.prototype.getPersistData.call(this);
        var keyEntity = ['value', 'values'];
        return this.addOnPersist(keyEntity);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CalendarModel} newProp - Returns the dynamic property value of the component.
     * @param {CalendarModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    Calendar.prototype.onPropertyChanged = function (newProp, oldProp) {
        this.effect = '';
        this.rangeValidation(this.min, this.max);
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'value':
                    if (this.isDateSelected) {
                        if (typeof newProp.value === 'string') {
                            this.setProperties({ value: new Date(this.checkValue(newProp.value)) }, true);
                        }
                        else {
                            newProp.value = new Date(this.checkValue(newProp.value));
                        }
                        if (isNaN(+this.value)) {
                            this.setProperties({ value: oldProp.value }, true);
                        }
                        this.update();
                    }
                    break;
                case 'values':
                    if (this.isDateSelected) {
                        if (typeof newProp.values === 'string' || typeof newProp.values === 'number') {
                            this.setProperties({ values: null }, true);
                        }
                        else {
                            var copyValues = this.copyValues(this.values);
                            for (var index = 0; index < copyValues.length; index++) {
                                var tempDate = copyValues[index];
                                if (this.checkDateValue(tempDate) && !_super.prototype.checkPresentDate.call(this, tempDate, copyValues)) {
                                    copyValues.push(tempDate);
                                }
                            }
                            this.setProperties({ values: copyValues }, true);
                            if (this.values.length > 0) {
                                this.setProperties({ value: newProp.values[newProp.values.length - 1] }, true);
                            }
                        }
                        this.validateValues(this.isMultiSelection, this.values);
                        this.update();
                    }
                    break;
                case 'isMultiSelection':
                    if (this.isDateSelected) {
                        this.setProperties({ isMultiSelection: newProp.isMultiSelection }, true);
                        this.update();
                    }
                    break;
                case 'enabled':
                    this.setEnable(this.enabled);
                    break;
                case 'cssClass':
                    if (this.getModuleName() === 'calendar') {
                        this.setClass(newProp.cssClass, oldProp.cssClass);
                    }
                    break;
                default:
                    _super.prototype.onPropertyChanged.call(this, newProp, oldProp, this.isMultiSelection, this.values);
            }
        }
        this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    Calendar.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.getModuleName() === 'calendar') {
            this.changedArgs = null;
            var form = closest(this.element, 'form');
            if (form) {
                EventHandler.remove(form, 'reset', this.formResetHandler.bind(this));
            }
        }
    };
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param {string} view - Specifies the view of the Calendar.
     * @param {Date} date - Specifies the focused date in a view.
     * @param {boolean} isCustomDate - Specifies whether the calendar is rendered with custom today date or not.
     * @returns {void}
     * @deprecated
     */
    Calendar.prototype.navigateTo = function (view, date, isCustomDate) {
        this.minMaxUpdate();
        _super.prototype.navigateTo.call(this, view, date, isCustomDate);
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     * @deprecated
     */
    Calendar.prototype.currentView = function () {
        return _super.prototype.currentView.call(this);
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * This method is used to add the single or multiple dates to the values property of the Calendar.
     *
     * @param {Date | Date[]} dates - Specifies the date or dates to be added to the values property of the Calendar.
     * @returns {void}
     * @deprecated
     */
    Calendar.prototype.addDate = function (dates) {
        if (typeof dates !== 'string' && typeof dates !== 'number') {
            var copyValues = this.copyValues(this.values);
            if (typeof dates === 'object' && (dates).length > 0) {
                var tempDates = dates;
                for (var i = 0; i < tempDates.length; i++) {
                    if (this.checkDateValue(tempDates[i]) && !_super.prototype.checkPresentDate.call(this, tempDates[i], copyValues)) {
                        if (!isNullOrUndefined(copyValues) && copyValues.length > 0) {
                            copyValues.push(tempDates[i]);
                        }
                        else {
                            copyValues = [new Date(+tempDates[i])];
                        }
                    }
                }
            }
            else {
                if (this.checkDateValue(dates) && !_super.prototype.checkPresentDate.call(this, dates, copyValues)) {
                    if (!isNullOrUndefined(copyValues) && copyValues.length > 0) {
                        copyValues.push((dates));
                    }
                    else {
                        copyValues = [new Date(+dates)];
                    }
                }
            }
            this.setProperties({ values: copyValues }, true);
            if (this.isMultiSelection) {
                this.setProperties({ value: this.values[this.values.length - 1] }, true);
            }
            this.validateValues(this.isMultiSelection, copyValues);
            this.update();
            this.changedArgs = { value: this.value, values: this.values };
            this.changeHandler();
        }
    };
    /**
     * This method is used to remove the single or multiple dates from the values property of the Calendar.
     *
     * @param {Date | Date[]} dates - Specifies the date or dates which need to be removed from the values property of the Calendar.
     * @returns {void}
     * @deprecated
     */
    Calendar.prototype.removeDate = function (dates) {
        if (typeof dates !== 'string' && typeof dates !== 'number' && !isNullOrUndefined(this.values) && this.values.length > 0) {
            var copyValues = this.copyValues(this.values);
            if (typeof dates === 'object' && ((dates).length > 0)) {
                var tempDates = dates;
                for (var index = 0; index < tempDates.length; index++) {
                    for (var i = 0; i < copyValues.length; i++) {
                        if (+copyValues[i] === +tempDates[index]) {
                            copyValues.splice(i, 1);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < copyValues.length; i++) {
                    if (+copyValues[i] === +dates) {
                        copyValues.splice(i, 1);
                    }
                }
            }
            this.setProperties({ values: copyValues }, false);
            this.update();
            if (this.isMultiSelection) {
                this.setProperties({ value: this.values[this.values.length - 1] }, true);
            }
            this.changedArgs = { value: this.value, values: this.values };
            this.changeHandler();
        }
    };
    /**
     * To set custom today date in calendar
     *
     * @param {Date} date - Specifies date value to be set.
     * @private
     * @returns {void}
     */
    Calendar.prototype.setTodayDate = function (date) {
        var todayDate = new Date(+date);
        this.setProperties({ value: todayDate }, true);
        _super.prototype.todayButtonClick.call(this, null, todayDate, true);
    };
    Calendar.prototype.update = function () {
        this.validateDate();
        this.minMaxUpdate();
        _super.prototype.setValueUpdate.call(this);
    };
    Calendar.prototype.selectDate = function (e, date, element) {
        _super.prototype.selectDate.call(this, e, date, element, this.isMultiSelection, this.values);
        if (this.isMultiSelection && !isNullOrUndefined(this.values) && this.values.length > 0) {
            this.setProperties({ value: this.values[this.values.length - 1] }, true);
        }
        this.changedArgs = { value: this.value, values: this.values };
        this.changeHandler(e);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Calendar.prototype.changeEvent = function (e) {
        if ((this.value && this.value.valueOf()) !== (this.previousDate && +this.previousDate.valueOf())
            || this.isMultiSelection) {
            if (this.isAngular && this.preventChange) {
                this.preventChange = false;
            }
            else {
                this.trigger('change', this.changedArgs);
            }
            this.previousDate = new Date(+this.value);
        }
    };
    Calendar.prototype.triggerChange = function (e) {
        if (!isNullOrUndefined(this.todayButtonEvent) && this.isTodayClicked) {
            e = this.todayButtonEvent;
            this.isTodayClicked = false;
        }
        this.changedArgs.event = e || null;
        this.changedArgs.isInteracted = !isNullOrUndefined(e);
        if (!isNullOrUndefined(this.value)) {
            this.setProperties({ value: this.value }, true);
        }
        // eslint-disable-next-line
        if (!this.isMultiSelection && +this.value !== Number.NaN && (!isNullOrUndefined(this.value) &&
            !isNullOrUndefined(this.previousDate) || this.previousDate === null
            && !isNaN(+this.value))) {
            this.changeEvent(e);
        }
        else if (!isNullOrUndefined(this.values) && this.previousValues !== this.values.length) {
            this.changeEvent(e);
            this.previousValues = this.values.length;
        }
    };
    __decorate([
        Property(null)
    ], Calendar.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], Calendar.prototype, "values", void 0);
    __decorate([
        Property(false)
    ], Calendar.prototype, "isMultiSelection", void 0);
    __decorate([
        Event()
    ], Calendar.prototype, "change", void 0);
    Calendar = __decorate([
        NotifyPropertyChanges
    ], Calendar);
    return Calendar;
}(CalendarBase));
export { Calendar };
