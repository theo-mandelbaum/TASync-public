import { Component, Internationalization, isNullOrUndefined, Browser, attributes, closest, addClass, removeClass, rippleEffect, EventHandler, getValue, getDefaultDateObject, cldrData, detach, L10n, extend, KeyboardEvents, getUniqueID, Property, Event, NotifyPropertyChanges, throwError, HijriParser, Touch, formatUnit, Animation, setValue, ChildProperty, merge, isUndefined, createElement, select, remove, prepend, Collection, append, setStyleAttribute } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { Input } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { ListBase } from '@syncfusion/ej2-lists';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//class constant defination.
const OTHERMONTH = 'e-other-month';
const OTHERDECADE = 'e-other-year';
const ROOT = 'e-calendar';
const DEVICE = 'e-device';
const HEADER = 'e-header';
const RTL = 'e-rtl';
const CONTENT = 'e-content';
const CONTENTTABLE = 'e-calendar-content-table';
const YEAR = 'e-year';
const MONTH = 'e-month';
const DECADE = 'e-decade';
const ICON = 'e-icons';
const PREVICON = 'e-prev';
const NEXTICON = 'e-next';
const PREVSPAN = 'e-date-icon-prev';
const NEXTSPAN = 'e-date-icon-next ';
const ICONCONTAINER = 'e-icon-container';
const DISABLED = 'e-disabled';
const OVERLAY = 'e-overlay';
const WEEKEND = 'e-weekend';
const WEEKNUMBER = 'e-week-number';
const SELECTED = 'e-selected';
const FOCUSEDDATE = 'e-focused-date';
const FOCUSEDCELL = 'e-focused-cell';
const OTHERMONTHROW = 'e-month-hide';
const TODAY = 'e-today';
const TITLE = 'e-title';
const LINK = 'e-day';
const CELL = 'e-cell';
const WEEKHEADER = 'e-week-header';
const ZOOMIN = 'e-zoomin';
const FOOTER = 'e-footer-container';
const BTN = 'e-btn';
const FLAT = 'e-flat';
const CSS = 'e-css';
const PRIMARY = 'e-primary';
const DAYHEADERLONG = 'e-calendar-day-header-lg';
const dayMilliSeconds = 86400000;
const minutesMilliSeconds = 60000;
/**
 *
 * @private
 */
let CalendarBase = class CalendarBase extends Component {
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     *
     * @param {CalendarBaseModel} options - Specifies the CalendarBase model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.effect = '';
        this.isPopupClicked = false;
        this.isDateSelected = true;
        this.isTodayClicked = false;
        this.preventChange = false;
        this.previousDates = false;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
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
    }
    rangeValidation(min, max) {
        if (isNullOrUndefined(min)) {
            this.setProperties({ min: new Date(1900, 0, 1) }, true);
        }
        if (isNullOrUndefined(max)) {
            this.setProperties({ max: new Date(2099, 11, 31) }, true);
        }
    }
    getDefaultKeyConfig() {
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
    }
    validateDate(value) {
        this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(this.min))) }, true);
        this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(this.max))) }, true);
        this.currentDate = this.currentDate ? this.currentDate : new Date(new Date().setHours(0, 0, 0, 0));
        if (!isNullOrUndefined(value) && this.min <= this.max && value >= this.min && value <= this.max) {
            this.currentDate = new Date(this.checkValue(value));
        }
    }
    setOverlayIndex(popupWrapper, popupElement, modal, isDevice) {
        if (isDevice && !isNullOrUndefined(popupElement) && !isNullOrUndefined(modal) && !isNullOrUndefined(popupWrapper)) {
            const index = parseInt(popupElement.style.zIndex, 10) ? parseInt(popupElement.style.zIndex, 10) : 1000;
            modal.style.zIndex = (index - 1).toString();
            popupWrapper.style.zIndex = index.toString();
        }
    }
    minMaxUpdate(value) {
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
    }
    createHeader() {
        const ariaPrevAttrs = {
            'aria-disabled': 'false',
            'aria-label': 'previous month'
        };
        const ariaNextAttrs = {
            'aria-disabled': 'false',
            'aria-label': 'next month'
        };
        const ariaTitleAttrs = {
            'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'title'
        };
        const tabIndexAttr = { 'tabindex': '0' };
        this.headerElement = this.createElement('div', { className: HEADER });
        const iconContainer = this.createElement('div', { className: ICONCONTAINER });
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
    }
    createContent() {
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
    }
    addContentFocus(args) {
        const focusedDate = this.tableBodyElement.querySelector('tr td.e-focused-date');
        const selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
        if (!isNullOrUndefined(selectedDate)) {
            selectedDate.classList.add(FOCUSEDCELL);
        }
        else if (!isNullOrUndefined(focusedDate)) {
            focusedDate.classList.add(FOCUSEDCELL);
        }
    }
    removeContentFocus(args) {
        const focusedDate = !isNullOrUndefined(this.tableBodyElement) ? this.tableBodyElement.querySelector('tr td.e-focused-date') : null;
        const selectedDate = !isNullOrUndefined(this.tableBodyElement) ? this.tableBodyElement.querySelector('tr td.e-selected') : null;
        if (!isNullOrUndefined(selectedDate)) {
            selectedDate.classList.remove(FOCUSEDCELL);
        }
        else if (!isNullOrUndefined(focusedDate)) {
            focusedDate.classList.remove(FOCUSEDCELL);
        }
    }
    getCultureValues() {
        const culShortNames = [];
        let cldrObj;
        const dayFormat = !isNullOrUndefined(this.dayHeaderFormat) ? 'days.stand-alone.' + this.dayHeaderFormat.toLowerCase() : null;
        if ((this.locale === 'en' || this.locale === 'en-US') && !isNullOrUndefined(dayFormat)) {
            cldrObj = (getValue(dayFormat, getDefaultDateObject()));
        }
        else {
            cldrObj = (this.getCultureObjects(cldrData, '' + this.locale));
        }
        if (!isNullOrUndefined(cldrObj)) {
            for (const obj of Object.keys(cldrObj)) {
                culShortNames.push(getValue(obj, cldrObj));
            }
        }
        return culShortNames;
    }
    toCapitalize(text) {
        return !isNullOrUndefined(text) && text.length ? text[0].toUpperCase() + text.slice(1) : text;
    }
    createContentHeader() {
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
        const daysCount = 6;
        let html = '';
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
        const shortNames = this.getCultureValues().length > 0 &&
            this.getCultureValues() ? this.shiftArray(((this.getCultureValues().length > 0 &&
            this.getCultureValues())), this.firstDayOfWeek) : null;
        if (!isNullOrUndefined(shortNames)) {
            for (let days = 0; days <= daysCount; days++) {
                html += '<th  class="">' + this.toCapitalize(shortNames[days]) + '</th>';
            }
        }
        html = '<tr>' + html + '</tr>';
        this.tableHeadElement.innerHTML = html;
        this.table.appendChild(this.tableHeadElement);
    }
    createContentBody() {
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
    }
    updateFooter() {
        this.todayElement.textContent = this.l10.getConstant('today');
        this.todayElement.setAttribute('aria-label', this.l10.getConstant('today'));
        this.todayElement.setAttribute('tabindex', '0');
    }
    createContentFooter() {
        if (this.showTodayButton) {
            const minimum = new Date(+this.min);
            const maximum = new Date(+this.max);
            const l10nLocale = { today: 'Today' };
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
    }
    wireEvents(id, ref, keyConfig, moduleName) {
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
    }
    dateWireEvents(id, ref, keyConfig, moduleName) {
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, keyConfig);
        this.serverModuleName = moduleName;
    }
    todayButtonClick(e, value, isCustomDate) {
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
    }
    resetCalendar() {
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
    }
    keyActionHandle(e, value, multiSelection) {
        if (this.calendarElement === null && e.action === 'escape') {
            return;
        }
        const focusedDate = this.tableBodyElement.querySelector('tr td.e-focused-date');
        let selectedDate;
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
        let view = this.getViewNumber(this.currentView());
        const depthValue = this.getViewNumber(this.depth);
        const levelRestrict = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
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
                    const element = !isNullOrUndefined(focusedDate) ? focusedDate : selectedDate;
                    if (!isNullOrUndefined(element) && !element.classList.contains(DISABLED)) {
                        if (levelRestrict) {
                            // eslint-disable-next-line radix
                            const d = new Date(parseInt('' + (element).id, 0));
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
    }
    keyboardNavigate(number, currentView, e, max, min) {
        const date = new Date(this.checkValue(this.currentDate));
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
    }
    /**
     * Initialize the event handler
     *
     * @param {Date} value - Specifies value of date.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    preRender(value) {
        this.navigatePreviousHandler = this.navigatePrevious.bind(this);
        this.navigateNextHandler = this.navigateNext.bind(this);
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.navigateHandler = (e) => {
            this.triggerNavigate(e);
        };
    }
    minMaxDate(localDate) {
        const currentDate = new Date(new Date(+localDate).setHours(0, 0, 0, 0));
        const minDate = new Date(new Date(+this.min).setHours(0, 0, 0, 0));
        const maxDate = new Date(new Date(+this.max).setHours(0, 0, 0, 0));
        if (+currentDate === +minDate || +currentDate === +maxDate) {
            if (+localDate < +this.min) {
                localDate = new Date(+this.min);
            }
            if (+localDate > +this.max) {
                localDate = new Date(+this.max);
            }
        }
        return localDate;
    }
    renderMonths(e, value, isCustomDate) {
        const numCells = this.weekNumber ? 8 : 7;
        let tdEles;
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
    }
    renderDays(currentDate, value, multiSelection, values, isTodayDate, e) {
        const tdEles = [];
        const cellsCount = 42;
        const todayDate = isTodayDate ? new Date(+currentDate) : this.getDate(new Date(), this.timezone);
        let localDate = new Date(this.checkValue(currentDate));
        let minMaxDate;
        const currentMonth = localDate.getMonth();
        this.titleUpdate(currentDate, 'days');
        const d = localDate;
        localDate = new Date(d.getFullYear(), d.getMonth(), 0, d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
        while (localDate.getDay() !== this.firstDayOfWeek) {
            this.setStartDate(localDate, -1 * dayMilliSeconds);
        }
        for (let day = 0; day < cellsCount; ++day) {
            const weekEle = this.createElement('td', { className: CELL });
            const weekAnchor = this.createElement('span');
            if (day % 7 === 0 && this.weekNumber) {
                // 6 days are added to get Last day of the week and 3 days are added to get middle day of the week.
                const numberOfDays = this.weekRule === 'FirstDay' ? 6 : (this.weekRule === 'FirstFourDayWeek' ? 3 : 0);
                const finalDate = new Date(localDate.getFullYear(), localDate.getMonth(), (localDate.getDate() + numberOfDays));
                weekAnchor.textContent = '' + this.getWeek(finalDate);
                weekEle.appendChild(weekAnchor);
                addClass([weekEle], '' + WEEKNUMBER);
                tdEles.push(weekEle);
            }
            minMaxDate = new Date(+localDate);
            localDate = this.minMaxDate(localDate);
            const dateFormatOptions = { type: 'dateTime', skeleton: 'full' };
            const date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            const tdEle = this.dayCell(localDate);
            const title = this.globalize.formatDate(localDate, { type: 'date', skeleton: 'full' });
            const dayLink = this.createElement('span');
            dayLink.textContent = this.globalize.formatDate(localDate, { format: 'd', type: 'date', skeleton: 'yMd' });
            const disabled = (this.min > localDate) || (this.max < localDate);
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
            const argument = this.renderDayCellArgs;
            this.renderDayCellEvent(argument);
            if (argument.isDisabled) {
                const selectDate = new Date(this.checkValue(value));
                const argsDate = new Date(this.checkValue(argument.date));
                if (multiSelection) {
                    if (!isNullOrUndefined(values) && values.length > 0) {
                        for (let index = 0; index < values.length; index++) {
                            const localDateString = +new Date(this.globalize.formatDate(argument.date, { type: 'date', skeleton: 'yMd' }));
                            const tempDateString = +new Date(this.globalize.formatDate(values[index], { type: 'date', skeleton: 'yMd' }));
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
            const otherMnthBool = tdEle.classList.contains(OTHERMONTH);
            const disabledCls = tdEle.classList.contains(DISABLED);
            if (!disabledCls) {
                EventHandler.add(tdEle, 'click', this.clickHandler, this);
            }
            // to set the value as null while setting the disabled date onProperty change.
            // if (args.isDisabled && +this.value === +args.date) {
            //     this.setProperties({ value: null }, true);
            // }
            let currentTarget;
            if (!isNullOrUndefined(e) && e.type === 'click') {
                currentTarget = e.currentTarget;
            }
            if (multiSelection && !isNullOrUndefined(values) && !disabledCls) {
                for (let tempValue = 0; tempValue < values.length; tempValue++) {
                    const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                    const formatOptions = { format: null, type: 'date', skeleton: 'short', calendar: type };
                    const localDateString = this.globalize.formatDate(localDate, formatOptions);
                    const tempDateString = this.globalize.formatDate(values[tempValue], formatOptions);
                    if ((localDateString === tempDateString && this.getDateVal(localDate, values[tempValue]))
                        || (this.getDateVal(localDate, value))) {
                        addClass([tdEle], SELECTED);
                    }
                    if (!isNullOrUndefined(currentTarget) && currentTarget.innerText === tdEle.innerText &&
                        this.previousDates && tdEle.classList.contains(SELECTED) && currentTarget.classList.contains(SELECTED)) {
                        removeClass([tdEle], SELECTED);
                        this.previousDates = false;
                        const copyValues = this.copyValues(values);
                        for (let i = 0; i < copyValues.length; i++) {
                            const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                            const formatOptions = { format: null, type: 'date', skeleton: 'short', calendar: type };
                            const localDateString = this.globalize.formatDate(date, formatOptions);
                            const tempDateString = this.globalize.formatDate(copyValues[i], formatOptions);
                            if (localDateString === tempDateString) {
                                const index = copyValues.indexOf(copyValues[i]);
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
    }
    updateFocus(otherMonth, disabled, localDate, tableElement, currentDate) {
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
    }
    renderYears(e, value) {
        this.removeTableHeadElement();
        const numCells = 4;
        const tdEles = [];
        const valueUtil = isNullOrUndefined(value);
        const curDate = new Date(this.checkValue(this.currentDate));
        const mon = curDate.getMonth();
        const yr = curDate.getFullYear();
        const localDate = curDate;
        const curYrs = localDate.getFullYear();
        const minYr = new Date(this.checkValue(this.min)).getFullYear();
        const minMonth = new Date(this.checkValue(this.min)).getMonth();
        const maxYr = new Date(this.checkValue(this.max)).getFullYear();
        const maxMonth = new Date(this.checkValue(this.max)).getMonth();
        localDate.setMonth(0);
        this.titleUpdate(this.currentDate, 'months');
        localDate.setDate(1);
        for (let month = 0; month < 12; ++month) {
            const tdEle = this.dayCell(localDate);
            const dayLink = this.createElement('span');
            const localMonth = (value && (value).getMonth() === localDate.getMonth());
            const select = (value && (value).getFullYear() === yr && localMonth);
            const title = this.globalize.formatDate(localDate, { type: 'date', format: 'MMM y' });
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
    }
    renderDecades(e, value) {
        this.removeTableHeadElement();
        const numCells = 4;
        const yearCell = 12;
        const tdEles = [];
        const localDate = new Date(this.checkValue(this.currentDate));
        localDate.setMonth(0);
        localDate.setDate(1);
        const localYr = localDate.getFullYear();
        const startYr = new Date(localDate.setFullYear((localYr - localYr % 10)));
        const endYr = new Date(localDate.setFullYear((localYr - localYr % 10 + (10 - 1))));
        const startFullYr = startYr.getFullYear();
        const endFullYr = endYr.getFullYear();
        const startHdrYr = this.globalize.formatDate(startYr, {
            format: null, type: 'dateTime', skeleton: 'y'
        });
        const endHdrYr = this.globalize.formatDate(endYr, { format: null, type: 'dateTime', skeleton: 'y' });
        this.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
        const start = new Date(localYr - (localYr % 10) - 1, 0, 1);
        const startYear = start.getFullYear();
        for (let rowIterator = 0; rowIterator < yearCell; ++rowIterator) {
            const year = startYear + rowIterator;
            localDate.setFullYear(year);
            const tdEle = this.dayCell(localDate);
            const dayLink = this.createElement('span');
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
    }
    dayCell(localDate) {
        const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
        const dateFormatOptions = { skeleton: 'full', type: 'dateTime', calendar: type };
        const date = this.globalize.parseDate(this.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
        let value;
        if (!isNullOrUndefined(date)) {
            value = date.valueOf();
        }
        const attrs = {
            className: CELL, attrs: { 'id': '' + getUniqueID('' + value), 'aria-selected': 'false' }
        };
        return this.createElement('td', attrs);
    }
    firstDay(date) {
        const collection = this.currentView() !== 'Decade' ? this.tableBodyElement.querySelectorAll('td:not(.' + OTHERMONTH + '):not(.' + WEEKNUMBER + ')') :
            this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERDECADE + '');
        if (collection.length) {
            for (let i = 0; i < collection.length; i++) {
                if (!collection[i].classList.contains(DISABLED)) {
                    // eslint-disable-next-line radix
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    }
    lastDay(date, view) {
        const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        if (view !== 2) {
            const timeOffset = Math.abs(lastDate.getTimezoneOffset() - this.firstDay(date).getTimezoneOffset());
            if (timeOffset) {
                lastDate.setHours(this.firstDay(date).getHours() + (timeOffset / 60));
            }
            return this.findLastDay(lastDate);
        }
        else {
            return this.findLastDay(this.firstDay(lastDate));
        }
    }
    checkDateValue(value) {
        return (!isNullOrUndefined(value) && value instanceof Date && !isNaN(+value)) ? value : null;
    }
    findLastDay(date) {
        const collection = this.currentView() === 'Decade' ? this.tableBodyElement.querySelectorAll('td' + ':not(.' + OTHERDECADE + '') :
            this.tableBodyElement.querySelectorAll('td:not(.' + OTHERMONTH + '):not(.' + WEEKNUMBER + ')');
        if (collection.length) {
            for (let i = collection.length - 1; i >= 0; i--) {
                if (!collection[i].classList.contains(DISABLED)) {
                    // eslint-disable-next-line radix
                    date = new Date(parseInt(collection[i].id, 0));
                    break;
                }
            }
        }
        return date;
    }
    removeTableHeadElement() {
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
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    renderTemplate(elements, count, classNm, e, value) {
        const view = this.getViewNumber(this.currentView());
        let trEle;
        this.tableBodyElement = this.createElement('tbody');
        this.table.appendChild(this.tableBodyElement);
        removeClass([this.contentElement, this.headerElement], [MONTH, DECADE, YEAR]);
        addClass([this.contentElement, this.headerElement], [classNm]);
        const weekNumCell = 41;
        const numberCell = 35;
        const otherMonthCell = 6;
        let row = count;
        let rowIterator = 0;
        for (let dayCell = 0; dayCell < elements.length / count; ++dayCell) {
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
    }
    clickHandler(e, value) {
        this.clickEventEmitter(e);
        const eve = e.currentTarget;
        const view = this.getViewNumber(this.currentView());
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
    }
    // Content click event handler required for extended components
    clickEventEmitter(e) {
        e.preventDefault();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    contentClick(e, view, element, value) {
        const currentView = this.getViewNumber(this.currentView());
        const d = this.getIdValue(e, element);
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
                        const islamicDate = this.islamicModule.getIslamicDate(d);
                        this.currentDate = this.islamicModule.toGregorian(islamicDate.year, islamicDate.month, 1);
                    }
                    this.effect = ZOOMIN;
                    detach(this.tableBodyElement);
                    this.renderYears(e);
                }
        }
    }
    switchView(view, e, multiSelection, isCustomDate) {
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
    }
    /**
     * To get component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    getModuleName() {
        return 'calendar';
    }
    /**
     *
     * @returns {void}
     * @deprecated
     */
    requiredModules() {
        const modules = [];
        if (this.calendarMode === 'Islamic') {
            modules.push({ args: [this], member: 'islamic', name: 'Islamic' });
        }
        return modules;
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string}
     */
    getPersistData() {
        const keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    }
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
    onPropertyChanged(newProp, oldProp, multiSelection, values) {
        this.effect = '';
        for (const prop of Object.keys(newProp)) {
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
                        const l10nLocale = { today: 'Today' };
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
    }
    /**
     * values property updated with considered disabled dates of the calendar.
     *
     * @param {boolean} multiSelection - Specifies whether multiple date selection is enabled.
     * @param {Date[]} values - Specifies the dates to validate.
     * @returns {void}
     */
    validateValues(multiSelection, values) {
        if (multiSelection && !isNullOrUndefined(values) && values.length > 0) {
            const copyValues = this.copyValues(values);
            for (let skipIndex = 0; skipIndex < copyValues.length; skipIndex++) {
                const tempValue = copyValues[skipIndex];
                const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                let tempValueString;
                if (this.calendarMode === 'Gregorian') {
                    tempValueString = this.globalize.formatDate(tempValue, { type: 'date', skeleton: 'yMd' });
                }
                else {
                    tempValueString = this.globalize.formatDate(tempValue, { type: 'dateTime', skeleton: 'full', calendar: 'islamic' });
                }
                const minFormatOption = { type: 'date', skeleton: 'yMd', calendar: type };
                const minStringValue = this.globalize.formatDate(this.min, minFormatOption);
                const minString = minStringValue;
                const maxFormatOption = { type: 'date', skeleton: 'yMd', calendar: type };
                const maxStringValue = this.globalize.formatDate(this.max, maxFormatOption);
                const maxString = maxStringValue;
                if (+new Date(tempValueString) < +new Date(minString) ||
                    +new Date(tempValueString) > +new Date(maxString)) {
                    copyValues.splice(skipIndex, 1);
                    skipIndex = -1;
                }
            }
            this.setProperties({ values: copyValues }, true);
        }
    }
    setValueUpdate() {
        if (!isNullOrUndefined(this.tableBodyElement)) {
            detach(this.tableBodyElement);
            this.setProperties({ start: this.currentView() }, true);
            this.createContentBody();
        }
    }
    copyValues(values) {
        const copyValues = [];
        if (!isNullOrUndefined(values) && values.length > 0) {
            for (let index = 0; index < values.length; index++) {
                copyValues.push(new Date(+values[index]));
            }
        }
        return copyValues;
    }
    titleUpdate(date, view) {
        const globalize = new Internationalization(this.locale);
        let dayFormatOptions;
        let monthFormatOptions;
        const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
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
    }
    setActiveDescendant() {
        let id;
        const focusedEle = this.tableBodyElement.querySelector('tr td.e-focused-date');
        const selectedEle = this.tableBodyElement.querySelector('tr td.e-selected');
        const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
        let title;
        const view = this.currentView();
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
    }
    iconHandler() {
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
    }
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    destroy() {
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
        super.destroy();
    }
    title(e) {
        let currentView = this.getViewNumber(this.currentView());
        this.effect = ZOOMIN;
        this.switchView(++currentView, e);
    }
    getViewNumber(stringVal) {
        if (stringVal === 'Month') {
            return 0;
        }
        else if (stringVal === 'Year') {
            return 1;
        }
        else {
            return 2;
        }
    }
    navigateTitle(e) {
        e.preventDefault();
        this.title(e);
    }
    previous() {
        this.effect = '';
        const currentView = this.getViewNumber(this.currentView());
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
    }
    navigatePrevious(e) {
        !Browser.isDevice && e.preventDefault();
        if (this.calendarMode === 'Gregorian') {
            this.previous();
        }
        else {
            this.islamicModule.islamicPrevious();
        }
        this.triggerNavigate(e);
    }
    next() {
        this.effect = '';
        const currentView = this.getViewNumber(this.currentView());
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
    }
    navigateNext(eve) {
        !Browser.isDevice && eve.preventDefault();
        if (this.calendarMode === 'Gregorian') {
            this.next();
        }
        else {
            this.islamicModule.islamicNext();
        }
        this.triggerNavigate(eve);
    }
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param {string} view - Specifies the view of the Calendar.
     * @param {Date} date - Specifies the focused date in a view.
     * @param {boolean} isCustomDate - Specifies whether the calendar is rendered with custom today date or not.
     * @returns {void}
     */
    navigateTo(view, date, isCustomDate) {
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
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     */
    currentView() {
        if (!isNullOrUndefined(this.contentElement) && this.contentElement.classList.contains(YEAR)) {
            return 'Year';
        }
        else if (!isNullOrUndefined(this.contentElement) && this.contentElement.classList.contains(DECADE)) {
            return 'Decade';
        }
        else {
            return 'Month';
        }
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    getDateVal(date, value) {
        return (!isNullOrUndefined(value) && date.getDate() === (value).getDate()
            && date.getMonth() === (value).getMonth() && date.getFullYear() === (value).getFullYear());
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getCultureObjects(ld, c) {
        const gregorianFormat = !isNullOrUndefined(this.dayHeaderFormat) ? '.dates.calendars.gregorian.days.format.' + this.dayHeaderFormat.toLowerCase() : null;
        const islamicFormat = !isNullOrUndefined(this.dayHeaderFormat) ? '.dates.calendars.islamic.days.format.' + this.dayHeaderFormat.toLowerCase() : null;
        const mainVal = 'main.';
        if (this.calendarMode === 'Gregorian') {
            return getValue(mainVal + '' + this.locale + gregorianFormat, ld);
        }
        else {
            return getValue('main.' + '' + this.locale + islamicFormat, ld);
        }
    }
    getWeek(d) {
        const currentDate = new Date(this.checkValue(d)).valueOf();
        const date = new Date(d.getFullYear(), 0, 1).valueOf();
        return Math.ceil((((currentDate - date) + dayMilliSeconds) / dayMilliSeconds) / 7);
    }
    setStartDate(date, time) {
        const tzOffset = date.getTimezoneOffset();
        const d = new Date(date.getTime() + time);
        const tzOffsetDiff = d.getTimezoneOffset() - tzOffset;
        date.setTime(d.getTime() + tzOffsetDiff * minutesMilliSeconds);
    }
    addMonths(date, i) {
        if (this.calendarMode === 'Gregorian') {
            const day = date.getDate();
            date.setDate(1);
            date.setMonth(date.getMonth() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        }
        else {
            const islamicDate = this.islamicModule.getIslamicDate(date);
            this.currentDate = this.islamicModule.toGregorian(islamicDate.year, (islamicDate.month) + i, 1);
        }
    }
    addYears(date, i) {
        if (this.calendarMode === 'Gregorian') {
            const day = date.getDate();
            date.setDate(1);
            date.setFullYear(date.getFullYear() + i);
            date.setDate(Math.min(day, this.getMaxDays(date)));
        }
        else {
            const islamicDate = this.islamicModule.getIslamicDate(date);
            this.currentDate = this.islamicModule.toGregorian(islamicDate.year + i, (islamicDate.month), 1);
        }
    }
    getIdValue(e, element) {
        let eve;
        if (e) {
            eve = e.currentTarget;
        }
        else {
            eve = element;
        }
        const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
        const dateFormatOptions = { type: 'dateTime', skeleton: 'full', calendar: type };
        // eslint-disable-next-line radix
        const dateString = this.globalize.formatDate(new Date(parseInt('' + eve.getAttribute('id'), 0)), dateFormatOptions);
        const date = this.globalize.parseDate(dateString, dateFormatOptions);
        const value = date.valueOf() - date.valueOf() % 1000;
        return new Date(value);
        //return this.globalize.parseDate(dateString, dateFormatOptions);
    }
    adjustLongHeaderSize() {
        removeClass([this.element], DAYHEADERLONG);
        if (this.dayHeaderFormat === 'Wide') {
            addClass([this.getModuleName() === 'calendar' ? this.element : this.calendarElement], DAYHEADERLONG);
        }
    }
    selectDate(e, date, node, multiSelection, values) {
        const element = node || e.currentTarget;
        this.isDateSelected = false;
        if (this.currentView() === 'Decade') {
            this.setDateDecade(this.currentDate, date.getFullYear());
        }
        else if (this.currentView() === 'Year') {
            this.setDateYear(this.currentDate, date);
        }
        else {
            if (multiSelection && !this.checkPresentDate(date, values)) {
                const copyValues = this.copyValues(values);
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
        let tableBodyElement = closest(element, '.' + ROOT);
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
            const copyValues = this.copyValues(values);
            const collection = Array.prototype.slice.call(this.tableBodyElement.querySelectorAll('td'));
            for (let index = 0; index < collection.length; index++) {
                const tempElement = tableBodyElement.querySelectorAll('td' + '.' + FOCUSEDDATE)[0];
                const selectedElement = tableBodyElement.querySelectorAll('td' + '.' + SELECTED)[0];
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
                for (let i = 0; i < copyValues.length; i++) {
                    const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                    const formatOptions = { format: null, type: 'date', skeleton: 'short', calendar: type };
                    const localDateString = this.globalize.formatDate(date, formatOptions);
                    const tempDateString = this.globalize.formatDate(copyValues[i], formatOptions);
                    if (localDateString === tempDateString) {
                        const index = copyValues.indexOf(copyValues[i]);
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
    }
    checkPresentDate(dates, values) {
        let previousValue = false;
        if (!isNullOrUndefined(values)) {
            for (let checkPrevious = 0; checkPrevious < values.length; checkPrevious++) {
                const type = (this.calendarMode === 'Gregorian') ? 'gregorian' : 'islamic';
                const localDateString = this.globalize.formatDate(dates, {
                    format: null, type: 'date', skeleton: 'short', calendar: type
                });
                const tempDateString = this.globalize.formatDate(values[checkPrevious], {
                    format: null, type: 'date', skeleton: 'short', calendar: type
                });
                if (localDateString === tempDateString) {
                    previousValue = true;
                }
            }
        }
        return previousValue;
    }
    setAriaActiveDescendant() {
        attributes(this.table, {
            'aria-activedescendant': '' + this.setActiveDescendant()
        });
    }
    previousIconHandler(disabled) {
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
    }
    renderDayCellEvent(args) {
        extend(this.renderDayCellArgs, { name: 'renderDayCell' });
        this.trigger('renderDayCell', args);
    }
    navigatedEvent(eve) {
        extend(this.navigatedArgs, { name: 'navigated', event: eve });
        this.trigger('navigated', this.navigatedArgs);
    }
    triggerNavigate(event) {
        this.navigatedArgs = { view: this.currentView(), date: this.currentDate };
        this.navigatedEvent(event);
    }
    nextIconHandler(disabled) {
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
    }
    compare(startDate, endDate, modifier) {
        let start = endDate.getFullYear();
        let end;
        let result;
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
    }
    isMinMaxRange(date) {
        return +date >= +this.min && +date <= +this.max;
    }
    isMonthYearRange(date) {
        if (this.calendarMode === 'Gregorian') {
            return date.getMonth() >= this.min.getMonth()
                && date.getFullYear() >= this.min.getFullYear()
                && date.getMonth() <= this.max.getMonth()
                && date.getFullYear() <= this.max.getFullYear();
        }
        else {
            const islamicDate = this.islamicModule.getIslamicDate(date);
            return islamicDate.month >= (this.islamicModule.getIslamicDate(new Date(1944, 1, 18))).month
                && islamicDate.year >= (this.islamicModule.getIslamicDate(new Date(1944, 1, 18))).year
                && islamicDate.month <= (this.islamicModule.getIslamicDate(new Date(2069, 1, 16))).month
                && islamicDate.year <= (this.islamicModule.getIslamicDate(new Date(2069, 1, 16))).year;
        }
    }
    compareYear(start, end) {
        return this.compare(start, end, 0);
    }
    compareDecade(start, end) {
        return this.compare(start, end, 10);
    }
    shiftArray(array, i) {
        return array.slice(i).concat(array.slice(0, i));
    }
    addDay(date, i, e, max, min) {
        let column = i;
        const value = new Date(+date);
        if (!isNullOrUndefined(this.tableBodyElement) && !isNullOrUndefined(e)) {
            while (this.findNextTD(new Date(+date), column, max, min)) {
                column += i;
            }
            const rangeValue = new Date(value.setDate(value.getDate() + column));
            column = (+rangeValue > +max || +rangeValue < +min) ? column === i ? i - i : i : column;
        }
        date.setDate(date.getDate() + column);
    }
    findNextTD(date, column, max, min) {
        const value = new Date(date.setDate(date.getDate() + column));
        let collection = [];
        let isDisabled = false;
        if ((!isNullOrUndefined(value) && value.getMonth()) === (!isNullOrUndefined(this.currentDate) && this.currentDate.getMonth())) {
            let tdEles;
            if (this.calendarMode === 'Gregorian') {
                tdEles = this.renderDays(value);
            }
            else {
                tdEles = this.islamicModule.islamicRenderDays(this.currentDate, value);
            }
            collection = tdEles.filter((element) => {
                return element.classList.contains(DISABLED);
            });
        }
        else {
            collection = this.tableBodyElement.querySelectorAll('td.' + DISABLED);
        }
        if (+value <= (+(max)) && +value >= (+(min))) {
            if (collection.length) {
                for (let i = 0; i < collection.length; i++) {
                    // eslint-disable-next-line radix
                    isDisabled = (+value === +new Date(parseInt(collection[i].id, 0))) ? true : false;
                    if (isDisabled) {
                        break;
                    }
                }
            }
        }
        return isDisabled;
    }
    getMaxDays(d) {
        let date;
        const tmpDate = new Date(this.checkValue(d));
        date = 28;
        const month = tmpDate.getMonth();
        while (tmpDate.getMonth() === month) {
            ++date;
            tmpDate.setDate(date);
        }
        return date - 1;
    }
    setDateDecade(date, year) {
        date.setFullYear(year);
        this.setProperties({ value: new Date(this.checkValue(date)) }, true);
    }
    setDateYear(date, value) {
        date.setFullYear(value.getFullYear(), value.getMonth(), date.getDate());
        if (value.getMonth() !== date.getMonth()) {
            date.setDate(0);
            this.currentDate = new Date(this.checkValue(value));
        }
        this.setProperties({ value: new Date(this.checkValue(date)) }, true);
    }
    compareMonth(start, end) {
        let result;
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
    }
    checkValue(inValue) {
        if (inValue instanceof Date) {
            return (inValue.toUTCString());
        }
        else {
            return ('' + inValue);
        }
    }
    checkView() {
        if (this.start !== 'Decade' && this.start !== 'Year') {
            this.setProperties({ start: 'Month' }, true);
        }
        if (this.depth !== 'Decade' && this.depth !== 'Year') {
            this.setProperties({ depth: 'Month' }, true);
        }
        if (this.getViewNumber(this.depth) > this.getViewNumber(this.start)) {
            this.setProperties({ depth: 'Month' }, true);
        }
    }
    getDate(date, timezone) {
        if (timezone) {
            date = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
        }
        return date;
    }
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
let Calendar = class Calendar extends CalendarBase {
    /**
     * Initialized new instance of Calendar Class.
     * Constructor for creating the widget
     *
     * @param {CalendarModel} options - Specifies the Calendar model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        if (this.calendarMode === 'Islamic' && this.islamicModule === undefined) {
            throwError('Requires the injectable Islamic modules to render Calendar in Islamic mode');
        }
        if (this.isMultiSelection && typeof this.values === 'object' && !isNullOrUndefined(this.values) && this.values.length > 0) {
            const tempValues = [];
            const copyValues = [];
            for (let limit = 0; limit < this.values.length; limit++) {
                if (tempValues.indexOf(+this.values[limit]) === -1) {
                    tempValues.push(+this.values[limit]);
                    copyValues.push(this.values[limit]);
                }
            }
            this.setProperties({ values: copyValues }, true);
            for (let index = 0; index < this.values.length; index++) {
                if (!this.checkDateValue(this.values[index])) {
                    if (typeof (this.values[index]) === 'string' && this.checkDateValue(new Date(this.checkValue(this.values[index])))) {
                        const copyDate = new Date(this.checkValue(this.values[index]));
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
        super.render();
        if (this.getModuleName() === 'calendar') {
            const form = closest(this.element, 'form');
            if (form) {
                EventHandler.add(form, 'reset', this.formResetHandler.bind(this));
            }
            this.setTimeZone(this.serverTimezoneOffset);
        }
        this.renderComplete();
    }
    setEnable(enable) {
        if (!enable) {
            addClass([this.element], DISABLED);
        }
        else {
            removeClass([this.element], DISABLED);
        }
    }
    setClass(newCssClass, oldCssClass) {
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
    }
    isDayLightSaving() {
        const secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        const firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    }
    setTimeZone(offsetValue) {
        if (!isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            const serverTimezoneDiff = offsetValue;
            const clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            let timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date(this.value.getTime() + (timeZoneDiff * 60 * 60 * 1000));
        }
    }
    formResetHandler() {
        this.setProperties({ value: null }, true);
    }
    validateDate() {
        if (typeof this.value === 'string') {
            this.setProperties({ value: this.checkDateValue(new Date(this.checkValue(this.value))) }, true); // persist the value property.
        }
        super.validateDate(this.value);
        if (!isNullOrUndefined(this.value) && this.min <= this.max && this.value >= this.min && this.value <= this.max) {
            this.currentDate = new Date(this.checkValue(this.value));
        }
        if (isNaN(+this.value)) {
            this.setProperties({ value: null }, true);
        }
    }
    minMaxUpdate() {
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
                super.minMaxUpdate(this.min);
            }
            else {
                if (!isNullOrUndefined(this.value) && this.value > this.max && this.min <= this.max) {
                    super.minMaxUpdate(this.max);
                }
            }
        }
        else {
            super.minMaxUpdate(this.value);
        }
    }
    generateTodayVal(value) {
        let tempValue = new Date();
        if (!isNullOrUndefined(this.timezone)) {
            tempValue = super.getDate(tempValue, this.timezone);
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
    }
    todayButtonClick(e) {
        if (this.showTodayButton) {
            const tempValue = this.generateTodayVal(this.value);
            this.setProperties({ value: tempValue }, true);
            this.isTodayClicked = true;
            this.todayButtonEvent = e;
            if (this.isMultiSelection) {
                const copyValues = this.copyValues(this.values);
                if (!super.checkPresentDate(tempValue, this.values)) {
                    copyValues.push(tempValue);
                    this.setProperties({ values: copyValues });
                }
            }
            super.todayButtonClick(e, new Date(+this.value));
        }
    }
    keyActionHandle(e) {
        super.keyActionHandle(e, this.value, this.isMultiSelection);
    }
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    preRender() {
        this.changeHandler = (e) => {
            this.triggerChange(e);
        };
        this.checkView();
        super.preRender(this.value);
    }
    /**
     * @returns {void}
     * @deprecated
     */
    createContent() {
        this.previousDate = this.value;
        this.previousDateTime = this.value;
        super.createContent();
    }
    minMaxDate(localDate) {
        return super.minMaxDate(localDate);
    }
    renderMonths(e, value, isCustomDate) {
        super.renderMonths(e, this.value, isCustomDate);
    }
    renderDays(currentDate, value, isMultiSelect, values, isCustomDate, e) {
        const tempDays = super.renderDays(currentDate, this.value, this.isMultiSelection, this.values, isCustomDate, e);
        if (this.isMultiSelection) {
            super.validateValues(this.isMultiSelection, this.values);
        }
        return tempDays;
    }
    renderYears(e) {
        if (this.calendarMode === 'Gregorian') {
            super.renderYears(e, this.value);
        }
        else {
            this.islamicModule.islamicRenderYears(e, this.value);
        }
    }
    renderDecades(e) {
        if (this.calendarMode === 'Gregorian') {
            super.renderDecades(e, this.value);
        }
        else {
            this.islamicModule.islamicRenderDecade(e, this.value);
        }
    }
    renderTemplate(elements, count, classNm, e) {
        if (this.calendarMode === 'Gregorian') {
            super.renderTemplate(elements, count, classNm, e, this.value);
        }
        else {
            this.islamicModule.islamicRenderTemplate(elements, count, classNm, e, this.value);
        }
        this.changedArgs = { value: this.value, values: this.values };
        e && e.type === 'click' && e.currentTarget.classList.contains(OTHERMONTH) ? this.changeHandler(e) : this.changeHandler();
    }
    clickHandler(e) {
        const eve = e.currentTarget;
        this.isPopupClicked = true;
        if (eve.classList.contains(OTHERMONTH)) {
            if (this.isMultiSelection) {
                const copyValues = this.copyValues(this.values);
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
        const storeView = this.currentView();
        super.clickHandler(e, this.value);
        if (this.isMultiSelection && this.currentDate !== this.value &&
            !isNullOrUndefined(this.tableBodyElement.querySelectorAll('.' + FOCUSEDDATE)[0]) && storeView === 'Year') {
            this.tableBodyElement.querySelectorAll('.' + FOCUSEDDATE)[0].classList.remove(FOCUSEDDATE);
        }
    }
    switchView(view, e, isMultiSelection, isCustomDate) {
        super.switchView(view, e, this.isMultiSelection, isCustomDate);
    }
    /**
     * To get component name
     *
     * @returns {string} Return the component name.
     * @private
     */
    getModuleName() {
        super.getModuleName();
        return 'calendar';
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string}
     */
    getPersistData() {
        super.getPersistData();
        const keyEntity = ['value', 'values'];
        return this.addOnPersist(keyEntity);
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Called internally if any of the property value changed.
     *
     * @param {CalendarModel} newProp - Returns the dynamic property value of the component.
     * @param {CalendarModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        this.effect = '';
        this.rangeValidation(this.min, this.max);
        for (const prop of Object.keys(newProp)) {
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
                            const copyValues = this.copyValues(this.values);
                            for (let index = 0; index < copyValues.length; index++) {
                                const tempDate = copyValues[index];
                                if (this.checkDateValue(tempDate) && !super.checkPresentDate(tempDate, copyValues)) {
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
                    super.onPropertyChanged(newProp, oldProp, this.isMultiSelection, this.values);
            }
        }
        this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
    }
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    destroy() {
        super.destroy();
        if (this.getModuleName() === 'calendar') {
            this.changedArgs = null;
            const form = closest(this.element, 'form');
            if (form) {
                EventHandler.remove(form, 'reset', this.formResetHandler.bind(this));
            }
        }
    }
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param {string} view - Specifies the view of the Calendar.
     * @param {Date} date - Specifies the focused date in a view.
     * @param {boolean} isCustomDate - Specifies whether the calendar is rendered with custom today date or not.
     * @returns {void}
     * @deprecated
     */
    navigateTo(view, date, isCustomDate) {
        this.minMaxUpdate();
        super.navigateTo(view, date, isCustomDate);
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     * @deprecated
     */
    currentView() {
        return super.currentView();
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * This method is used to add the single or multiple dates to the values property of the Calendar.
     *
     * @param {Date | Date[]} dates - Specifies the date or dates to be added to the values property of the Calendar.
     * @returns {void}
     * @deprecated
     */
    addDate(dates) {
        if (typeof dates !== 'string' && typeof dates !== 'number') {
            let copyValues = this.copyValues(this.values);
            if (typeof dates === 'object' && (dates).length > 0) {
                const tempDates = dates;
                for (let i = 0; i < tempDates.length; i++) {
                    if (this.checkDateValue(tempDates[i]) && !super.checkPresentDate(tempDates[i], copyValues)) {
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
                if (this.checkDateValue(dates) && !super.checkPresentDate(dates, copyValues)) {
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
    }
    /**
     * This method is used to remove the single or multiple dates from the values property of the Calendar.
     *
     * @param {Date | Date[]} dates - Specifies the date or dates which need to be removed from the values property of the Calendar.
     * @returns {void}
     * @deprecated
     */
    removeDate(dates) {
        if (typeof dates !== 'string' && typeof dates !== 'number' && !isNullOrUndefined(this.values) && this.values.length > 0) {
            const copyValues = this.copyValues(this.values);
            if (typeof dates === 'object' && ((dates).length > 0)) {
                const tempDates = dates;
                for (let index = 0; index < tempDates.length; index++) {
                    for (let i = 0; i < copyValues.length; i++) {
                        if (+copyValues[i] === +tempDates[index]) {
                            copyValues.splice(i, 1);
                        }
                    }
                }
            }
            else {
                for (let i = 0; i < copyValues.length; i++) {
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
    }
    /**
     * To set custom today date in calendar
     *
     * @param {Date} date - Specifies date value to be set.
     * @private
     * @returns {void}
     */
    setTodayDate(date) {
        const todayDate = new Date(+date);
        this.setProperties({ value: todayDate }, true);
        super.todayButtonClick(null, todayDate, true);
    }
    update() {
        this.validateDate();
        this.minMaxUpdate();
        super.setValueUpdate();
    }
    selectDate(e, date, element) {
        super.selectDate(e, date, element, this.isMultiSelection, this.values);
        if (this.isMultiSelection && !isNullOrUndefined(this.values) && this.values.length > 0) {
            this.setProperties({ value: this.values[this.values.length - 1] }, true);
        }
        this.changedArgs = { value: this.value, values: this.values };
        this.changeHandler(e);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    changeEvent(e) {
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
    }
    triggerChange(e) {
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

/**
 *
 */
//class constant defination.
const OTHERMONTH$1 = 'e-other-month';
const YEAR$1 = 'e-year';
const MONTH$1 = 'e-month';
const DECADE$1 = 'e-decade';
const DISABLED$1 = 'e-disabled';
const OVERLAY$1 = 'e-overlay';
const WEEKEND$1 = 'e-weekend';
const WEEKNUMBER$1 = 'e-week-number';
const SELECTED$1 = 'e-selected';
const FOCUSEDDATE$1 = 'e-focused-date';
const OTHERMONTHROW$1 = 'e-month-hide';
const TODAY$1 = 'e-today';
const LINK$1 = 'e-day';
const CELL$1 = 'e-cell';
const dayMilliSeconds$1 = 86400000;
const minDecade = 2060;
const maxDecade = 2069;
class Islamic {
    constructor(instance) {
        this.calendarInstance = instance;
    }
    getModuleName() {
        return 'islamic';
    }
    islamicTitleUpdate(date, view) {
        const globalize = new Internationalization(this.calendarInstance.locale);
        switch (view) {
            case 'days':
                this.calendarInstance.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', format: 'MMMMyyyy', calendar: 'islamic' });
                break;
            case 'months':
                this.calendarInstance.headerTitleElement.textContent = globalize.formatDate(date, { type: 'dateTime', format: 'yyyy', calendar: 'islamic' });
        }
    }
    islamicRenderDays(currentDate, value, multiSelection, values) {
        const tdEles = [];
        const cellsCount = 42;
        let localDate = new Date(this.islamicInValue(currentDate));
        let minMaxDate;
        this.islamicTitleUpdate(currentDate, 'days');
        const islamicDate = this.getIslamicDate(localDate);
        const gregorianObject = this.toGregorian(islamicDate.year, islamicDate.month, 1);
        const currentMonth = islamicDate.month;
        localDate = gregorianObject;
        while (localDate.getDay() !== this.calendarInstance.firstDayOfWeek) {
            this.calendarInstance.setStartDate(localDate, -1 * dayMilliSeconds$1);
        }
        for (let day = 0; day < cellsCount; ++day) {
            const weekEle = this.calendarInstance.createElement('td', { className: CELL$1 });
            const weekAnchor = this.calendarInstance.createElement('span');
            if (day % 7 === 0 && this.calendarInstance.weekNumber) {
                weekAnchor.textContent = '' + this.calendarInstance.getWeek(localDate);
                weekEle.appendChild(weekAnchor);
                addClass([weekEle], '' + WEEKNUMBER$1);
                tdEles.push(weekEle);
            }
            minMaxDate = new Date(+localDate);
            localDate = this.calendarInstance.minMaxDate(localDate);
            const dateFormatOptions = { type: 'dateTime', skeleton: 'full', calendar: 'islamic' };
            const date = this.calendarInstance.globalize.parseDate(this.calendarInstance.globalize.formatDate(localDate, dateFormatOptions), dateFormatOptions);
            const tdEle = this.islamicDayCell(localDate);
            const title = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'full', calendar: 'islamic' });
            const dayLink = this.calendarInstance.createElement('span');
            dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'd', calendar: 'islamic' });
            const disabled = (this.calendarInstance.min > localDate) || (this.calendarInstance.max < localDate);
            if (disabled) {
                addClass([tdEle], DISABLED$1);
                addClass([tdEle], OVERLAY$1);
            }
            else {
                dayLink.setAttribute('title', '' + title);
            }
            const hijriMonthObject = this.getIslamicDate(localDate);
            if (currentMonth !== hijriMonthObject.month) {
                addClass([tdEle], OTHERMONTH$1);
            }
            if (localDate.getDay() === 0 || localDate.getDay() === 6) {
                addClass([tdEle], WEEKEND$1);
            }
            tdEle.appendChild(dayLink);
            this.calendarInstance.renderDayCellArgs = {
                date: localDate,
                isDisabled: false,
                element: tdEle,
                isOutOfRange: disabled
            };
            const argument = this.calendarInstance.renderDayCellArgs;
            this.calendarInstance.renderDayCellEvent(argument);
            if (argument.isDisabled) {
                if (this.calendarInstance.isMultiSelection) {
                    if (!isNullOrUndefined(this.calendarInstance.values) && this.calendarInstance.values.length > 0) {
                        for (let index = 0; index < values.length; index++) {
                            const localDateString = +new Date(this.calendarInstance.globalize.formatDate(argument.date, { type: 'date', skeleton: 'yMd', calendar: 'islamic' }));
                            const tempDateString = +new Date(this.calendarInstance.globalize.formatDate(this.calendarInstance.values[index], { type: 'date', skeleton: 'yMd', calendar: 'islamic' }));
                            if (localDateString === tempDateString) {
                                this.calendarInstance.values.splice(index, 1);
                                index = -1;
                            }
                        }
                    }
                }
                else if (value && +value === +argument.date) {
                    this.calendarInstance.setProperties({ value: null }, true);
                }
            }
            if (this.calendarInstance.renderDayCellArgs.isDisabled && !tdEle.classList.contains(SELECTED$1)) {
                addClass([tdEle], DISABLED$1);
                addClass([tdEle], OVERLAY$1);
                if (+this.calendarInstance.renderDayCellArgs.date === +this.calendarInstance.todayDate) {
                    this.calendarInstance.todayDisabled = true;
                }
            }
            const otherMnthBool = tdEle.classList.contains(OTHERMONTH$1);
            const disabledCls = tdEle.classList.contains(DISABLED$1);
            if (!disabledCls) {
                EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
            }
            if (this.calendarInstance.isMultiSelection && !isNullOrUndefined(this.calendarInstance.values) &&
                !otherMnthBool && !disabledCls) {
                for (let tempValue = 0; tempValue < this.calendarInstance.values.length; tempValue++) {
                    const localDateString = this.calendarInstance.globalize.formatDate(localDate, { type: 'date', skeleton: 'short', calendar: 'islamic' });
                    const tempDateString = this.calendarInstance.globalize.formatDate(this.calendarInstance.values[tempValue], { type: 'date', skeleton: 'short', calendar: 'islamic' });
                    if (localDateString === tempDateString &&
                        this.calendarInstance.getDateVal(localDate, this.calendarInstance.values[tempValue])) {
                        addClass([tdEle], SELECTED$1);
                    }
                    else {
                        this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                    }
                }
                if (this.calendarInstance.values.length <= 0) {
                    this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
                }
            }
            else if (!otherMnthBool && !disabledCls && this.calendarInstance.getDateVal(localDate, value)) {
                addClass([tdEle], SELECTED$1);
            }
            else {
                this.calendarInstance.updateFocus(otherMnthBool, disabledCls, localDate, tdEle, currentDate);
            }
            if (date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
                if (date.getFullYear() === new Date().getFullYear()) {
                    addClass([tdEle], TODAY$1);
                }
            }
            localDate = new Date(+minMaxDate);
            tdEles.push(this.calendarInstance.renderDayCellArgs.element);
            this.calendarInstance.addDay(localDate, 1, null, this.calendarInstance.max, this.calendarInstance.min);
        }
        return tdEles;
    }
    islamicIconHandler() {
        new Date(this.islamicInValue(this.calendarInstance.currentDate)).setDate(1);
        const date = new Date(this.islamicInValue(this.calendarInstance.currentDate));
        switch (this.calendarInstance.currentView()) {
            case 'Month':
                {
                    const prevMonthCompare = this.islamicCompareMonth(date, this.calendarInstance.min) < 1;
                    const nextMonthCompare = this.islamicCompareMonth(date, this.calendarInstance.max) > -1;
                    this.calendarInstance.previousIconHandler(prevMonthCompare);
                    this.calendarInstance.nextIconHandler(nextMonthCompare);
                }
                break;
            case 'Year':
                {
                    const prevYearCompare = this.hijriCompareYear(date, this.calendarInstance.min) < 1;
                    const nextYearCompare = this.hijriCompareYear(date, this.calendarInstance.max) > -1;
                    this.calendarInstance.previousIconHandler(prevYearCompare);
                    this.calendarInstance.nextIconHandler(nextYearCompare);
                }
                break;
            case 'Decade': {
                const startIslamicYear = 1361;
                const gregorianValue = HijriParser.toGregorian(startIslamicYear, 1, 1);
                let prevDecadeCompare = this.hijriCompareDecade(date, this.calendarInstance.min) < 1;
                const nextDecadeCompare = this.hijriCompareDecade(date, this.calendarInstance.max) > -1;
                prevDecadeCompare = HijriParser.toGregorian(this.calendarInstance.headerTitleElement.textContent.split('-')[0].trim(), 1, 1).getFullYear() === gregorianValue.getFullYear() ? true : prevDecadeCompare;
                this.calendarInstance.previousIconHandler(prevDecadeCompare);
                this.calendarInstance.nextIconHandler(nextDecadeCompare);
            }
        }
    }
    islamicNext() {
        this.calendarInstance.effect = '';
        const view = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        const islamicDate = this.getIslamicDate(this.calendarInstance.currentDate);
        switch (this.calendarInstance.currentView()) {
            case 'Year':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year + 1, islamicDate.month, 1);
                this.calendarInstance.switchView(view);
                break;
            case 'Month':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year, islamicDate.month + 1, 1);
                this.calendarInstance.switchView(view);
                break;
            case 'Decade':
                this.calendarInstance.nextIconClicked = true;
                if (islamicDate.year - this.calendarInstance.headerElement.textContent.split('-')[0].trim() === 1) {
                    islamicDate.year = islamicDate.year - this.calendarInstance.headerElement.textContent.split('-')[0].trim() === 1 ? islamicDate.year + 1 : islamicDate.year;
                }
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year + 10, islamicDate.month, 1);
                this.calendarInstance.switchView(view);
                break;
        }
    }
    islamicPrevious() {
        const currentView = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        this.calendarInstance.effect = '';
        const islamicDate = this.getIslamicDate(this.calendarInstance.currentDate);
        switch (this.calendarInstance.currentView()) {
            case 'Month':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year, islamicDate.month - 1, 1);
                this.calendarInstance.switchView(currentView);
                break;
            case 'Year':
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year - 1, islamicDate.month, 1);
                this.calendarInstance.switchView(currentView);
                break;
            case 'Decade':
                this.calendarInstance.previousIconClicked = true;
                this.calendarInstance.currentDate = this.toGregorian(islamicDate.year - 10, islamicDate.month - 1, 1);
                this.calendarInstance.switchView(currentView);
                break;
        }
    }
    islamicRenderYears(e, value) {
        this.calendarInstance.removeTableHeadElement();
        const numCells = 4;
        const tdEles = [];
        const valueUtil = isNullOrUndefined(value);
        const curDate = new Date(this.islamicInValue(this.calendarInstance.currentDate));
        let localDate = curDate;
        const islamicDate = this.getIslamicDate(localDate);
        const gregorianObject = HijriParser.toGregorian(islamicDate.year, 1, 1);
        localDate = gregorianObject;
        const mon = islamicDate.month;
        const yr = islamicDate.year;
        const curYrs = islamicDate.year;
        const minYr = (this.getIslamicDate(this.calendarInstance.min)).year;
        const minMonth = (this.getIslamicDate(this.calendarInstance.min)).month;
        const maxYr = (this.getIslamicDate(this.calendarInstance.max)).year;
        const maxMonth = (this.getIslamicDate(this.calendarInstance.max)).month;
        this.islamicTitleUpdate(this.calendarInstance.currentDate, 'months');
        for (let month = 1; month <= 12; ++month) {
            const islamicDate = this.getIslamicDate(localDate);
            const gregorianObject = HijriParser.toGregorian(islamicDate.year, month, 1);
            localDate = gregorianObject;
            const tdEle = this.islamicDayCell(localDate);
            const dayLink = this.calendarInstance.createElement('span');
            const localMonth = (value &&
                (this.getIslamicDate(value)).month === (this.getIslamicDate(localDate)).month);
            const select = (value && (this.getIslamicDate(value)).year === yr && localMonth);
            dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'dateTime', format: 'MMM', calendar: 'islamic' });
            if ((this.calendarInstance.min && (curYrs < minYr || (month < minMonth && curYrs === minYr))) || (this.calendarInstance.max && (curYrs > maxYr || (month > maxMonth && curYrs >= maxYr)))) {
                addClass([tdEle], DISABLED$1);
            }
            else if (!valueUtil && select) {
                addClass([tdEle], SELECTED$1);
            }
            else {
                if ((this.getIslamicDate(localDate)).month === mon &&
                    (this.getIslamicDate(this.calendarInstance.currentDate)).month === mon) {
                    addClass([tdEle], FOCUSEDDATE$1);
                }
            }
            if (!tdEle.classList.contains(DISABLED$1)) {
                EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
            }
            tdEle.appendChild(dayLink);
            tdEles.push(tdEle);
        }
        this.islamicRenderTemplate(tdEles, numCells, YEAR$1, e, value);
    }
    islamicRenderDecade(e, value) {
        this.calendarInstance.removeTableHeadElement();
        const numCells = 4;
        const yearCell = 12;
        const tdEles = [];
        let localDate = new Date(this.islamicInValue(this.calendarInstance.currentDate));
        let islamicDate = this.getIslamicDate(localDate);
        const gregorianObject = HijriParser.toGregorian(islamicDate.year, 1, 1);
        localDate = gregorianObject;
        const localYr = localDate.getFullYear();
        const startYr = new Date(this.islamicInValue((localYr - localYr % 10)));
        const endYr = new Date(this.islamicInValue((localYr - localYr % 10 + (10 - 1))));
        let startFullYr = startYr.getFullYear();
        let endFullYr = endYr.getFullYear();
        let startHdrYr = this.calendarInstance.globalize.formatDate(startYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
        let endHdrYr = this.calendarInstance.globalize.formatDate(endYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
        if (this.calendarInstance.locale === 'ar') {
            startHdrYr = Number(startHdrYr.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632 + 48)));
            endHdrYr = Number(endHdrYr.replace(/[٠١٢٣٤٥٦٧٨٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632 + 48)));
        }
        const splityear = this.calendarInstance.headerElement.textContent.split('-');
        if ((!isNullOrUndefined(e) && (splityear[0] !== startHdrYr) && e.action === 'home') ||
            (!isNullOrUndefined(e) && e.type === 'keydown' && e.action === 'end')) {
            startHdrYr = this.calendarInstance.headerElement.textContent.split('-')[0].trim();
            endHdrYr = this.calendarInstance.headerElement.textContent.split('-')[1].trim();
        }
        if (this.calendarInstance.islamicPreviousHeader) {
            startHdrYr = this.calendarInstance.islamicPreviousHeader.split('-')[0].trim();
            endHdrYr = this.calendarInstance.islamicPreviousHeader.split('-')[1].trim();
            this.calendarInstance.islamicPreviousHeader = null;
        }
        if (this.calendarInstance.previousIconClicked) {
            let i = 0;
            for (i = 0; i <= splityear.length; i++) {
                endHdrYr = endHdrYr - splityear[i] === 2 || splityear[i]
                    - endHdrYr === 2 ? (parseInt(endHdrYr, 10) + 1).toString() :
                    endHdrYr - splityear[i] === 3 || splityear[i] - endHdrYr === 3 ?
                        (parseInt(endHdrYr, 10) + 2).toString() : endHdrYr - splityear[i] === 4 ||
                        splityear[i] - endHdrYr === 4 ? (parseInt(endHdrYr, 10) + 3).toString() :
                        endHdrYr - splityear[i] === 5 || splityear[i] - endHdrYr === 5 ?
                            (parseInt(endHdrYr, 10) + 4).toString() : endHdrYr;
                if (endHdrYr - splityear[i] === 0 || splityear[i] - endHdrYr === 0) {
                    endHdrYr = (parseInt(endHdrYr, 10) - 1).toString();
                }
            }
            if (endHdrYr - splityear[i] === 8 || splityear[i] - endHdrYr === 8) {
                endHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
                startHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
            }
            if (endHdrYr - splityear[i] === 7 || splityear[i] - endHdrYr === 7) {
                endHdrYr = (parseInt(endHdrYr, 10) - 8).toString();
                startHdrYr = (parseInt(endHdrYr, 10) - 9).toString();
            }
            startHdrYr = endHdrYr - startHdrYr === 10
                ? (parseInt(startHdrYr, 10) + 1).toString() : endHdrYr - startHdrYr === 11
                ? (parseInt(startHdrYr, 10) + 2).toString() : endHdrYr - startHdrYr === 12
                ? (parseInt(startHdrYr, 10) + 3).toString() : startHdrYr;
            if (endHdrYr - startHdrYr === 8) {
                startHdrYr = (parseInt(startHdrYr, 10) - 1).toString();
            }
        }
        if (this.calendarInstance.nextIconClicked) {
            for (let i = 0; i <= splityear.length; i++) {
                if (startHdrYr - splityear[i] === 0 || splityear[i] - startHdrYr === 0) {
                    startHdrYr = (parseInt(startHdrYr, 10) + 1).toString();
                }
                if (startHdrYr - splityear[i] === 2 && startHdrYr > splityear[i].trim()) {
                    startHdrYr = (parseInt(startHdrYr, 10) - 1).toString();
                }
                if (splityear[i] - startHdrYr === 1 && startHdrYr < splityear[i].trim()) {
                    startHdrYr = (parseInt(startHdrYr, 10) + 2).toString();
                }
            }
            if (startHdrYr - this.calendarInstance.headerTitleElement.textContent.split('-')[1].trim() > 1) {
                startHdrYr = (parseInt(this.calendarInstance.headerTitleElement.textContent.split('-')[1].trim(), 10) + 1).toString();
                endHdrYr = (parseInt(startHdrYr, 10) + 9).toString();
            }
            endHdrYr = endHdrYr - startHdrYr === 10 ? (parseInt(endHdrYr, 10) - 1).toString() : endHdrYr;
            endHdrYr = endHdrYr - startHdrYr === 7
                ? (parseInt(endHdrYr, 10) + 2).toString() : endHdrYr - startHdrYr === 8
                ? (parseInt(endHdrYr, 10) + 1).toString() : endHdrYr;
        }
        if (this.calendarInstance.locale === 'ar') {
            const startHeaderYear = this.calendarInstance.globalize.formatDate(startYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
            const endHeaderYear = this.calendarInstance.globalize.formatDate(endYr, { type: 'dateTime', format: 'y', calendar: 'islamic' });
            this.calendarInstance.headerTitleElement.textContent = startHeaderYear + ' - ' + (endHeaderYear);
        }
        else {
            this.calendarInstance.headerTitleElement.textContent = startHdrYr + ' - ' + (endHdrYr);
        }
        this.calendarInstance.nextIconClicked = this.calendarInstance.previousIconClicked = false;
        const year = (parseInt(startHdrYr, 10) - 2).toString();
        startFullYr = Math.round(parseInt(startHdrYr, 10) * 0.97 + 622);
        endFullYr = Math.round(parseInt(endHdrYr, 10) * 0.97 + 622);
        const startYear = Math.round(parseInt(year, 10) * 0.97 + 622);
        for (let rowCount = 1; rowCount <= yearCell; ++rowCount) {
            const year = startYear + rowCount;
            localDate.setFullYear(year);
            localDate.setDate(1);
            localDate.setMonth(0);
            if ((this.getIslamicDate(localDate).year - islamicDate.year) > 1) {
                localDate.setMonth(1);
                rowCount = rowCount - 1;
                localDate.setFullYear(localDate.getFullYear() - 1);
            }
            islamicDate = this.getIslamicDate(localDate);
            const gregorianObject = HijriParser.toGregorian(islamicDate.year, 1, 1);
            localDate = gregorianObject;
            if (islamicDate.year === parseInt(startHdrYr, 10) - 1 || islamicDate.year >= startHdrYr &&
                islamicDate.year <= endFullYr || islamicDate.year === parseInt(endHdrYr, 10) + 1) {
                const tdEle = this.islamicDayCell(localDate);
                attributes(tdEle, { 'role': 'gridcell' });
                const dayLink = this.calendarInstance.createElement('span');
                dayLink.textContent = this.calendarInstance.globalize.formatDate(localDate, { type: 'dateTime', format: 'y', calendar: 'islamic' });
                if (islamicDate.year === parseInt(startHdrYr, 10) - 1 || (year < startFullYr) ||
                    (year > endFullYr) && islamicDate.year !== parseInt(endHdrYr, 10)) {
                    addClass([tdEle], OTHERMONTH$1);
                }
                else if (year < new Date(this.islamicInValue(this.calendarInstance.min)).getFullYear()
                    || year > new Date(this.islamicInValue(this.calendarInstance.max)).getFullYear()) {
                    addClass([tdEle], DISABLED$1);
                }
                else if (!isNullOrUndefined(value) &&
                    (this.getIslamicDate(localDate)).year ===
                        (this.getIslamicDate(value)).year) {
                    addClass([tdEle], SELECTED$1);
                }
                else {
                    if (localDate.getFullYear() === this.calendarInstance.currentDate.getFullYear() &&
                        !tdEle.classList.contains(DISABLED$1)) {
                        addClass([tdEle], FOCUSEDDATE$1);
                    }
                }
                if (!tdEle.classList.contains(DISABLED$1)) {
                    EventHandler.add(tdEle, 'click', this.calendarInstance.clickHandler, this.calendarInstance);
                }
                tdEle.appendChild(dayLink);
                if ((!isNullOrUndefined(e) && e.action === 'home' && islamicDate.year.toString() === startHdrYr) || (!isNullOrUndefined(e) && e.action === 'end' && islamicDate.year.toString() === endHdrYr)) {
                    addClass([tdEle], FOCUSEDDATE$1);
                }
                tdEles.push(tdEle);
            }
        }
        this.islamicRenderTemplate(tdEles, numCells, 'e-decade', e, value);
    }
    islamicDayCell(localDate) {
        const dateFormatOptions = { skeleton: 'full', type: 'dateTime', calendar: 'islamic' };
        const formatDate = this.calendarInstance.globalize.formatDate(localDate, dateFormatOptions);
        const date = this.calendarInstance.globalize.parseDate(formatDate, dateFormatOptions);
        const value = date.valueOf();
        const attrs = {
            className: CELL$1, attrs: { 'id': '' + getUniqueID('' + value), 'aria-selected': 'false', 'role': 'gridcell' }
        };
        return this.calendarInstance.createElement('td', attrs);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    islamicRenderTemplate(elements, count, classNm, e, value) {
        const view = this.calendarInstance.getViewNumber(this.calendarInstance.currentView());
        let trEle;
        this.calendarInstance.tableBodyElement = this.calendarInstance.createElement('tbody');
        this.calendarInstance.table.appendChild(this.calendarInstance.tableBodyElement);
        removeClass([this.calendarInstance.contentElement, this.calendarInstance.headerElement], [MONTH$1, DECADE$1, YEAR$1]);
        addClass([this.calendarInstance.contentElement, this.calendarInstance.headerElement], [classNm]);
        const weekNumCell = 41;
        const numberCell = 35;
        const otherMonthCell = 6;
        let row = count;
        let rowCount = 0;
        for (let dayCell = 0; dayCell < Math.round(elements.length / count); ++dayCell) {
            trEle = this.calendarInstance.createElement('tr', { attrs: { 'role': 'row' } });
            for (rowCount = 0 + rowCount; rowCount < row; rowCount++) {
                if (!elements[rowCount].classList.contains('e-week-number') && !isNullOrUndefined(elements[rowCount].children[0])) {
                    addClass([elements[rowCount].children[0]], [LINK$1]);
                    rippleEffect(elements[rowCount].children[0], {
                        duration: 600,
                        isCenterRipple: true
                    });
                }
                trEle.appendChild(elements[rowCount]);
                if (this.calendarInstance.weekNumber &&
                    rowCount === otherMonthCell + 1 && elements[otherMonthCell + 1].classList.contains(OTHERMONTH$1)) {
                    addClass([trEle], OTHERMONTHROW$1);
                }
                if (!this.calendarInstance.weekNumber
                    && rowCount === otherMonthCell && elements[otherMonthCell].classList.contains(OTHERMONTH$1)) {
                    addClass([trEle], OTHERMONTHROW$1);
                }
                if (this.calendarInstance.weekNumber) {
                    if (rowCount === weekNumCell && elements[weekNumCell].classList.contains(OTHERMONTH$1)) {
                        addClass([trEle], OTHERMONTHROW$1);
                    }
                }
                else {
                    if (rowCount === numberCell && elements[numberCell].classList.contains(OTHERMONTH$1)) {
                        addClass([trEle], OTHERMONTHROW$1);
                    }
                }
            }
            row = row + count;
            rowCount = rowCount + 0;
            this.calendarInstance.tableBodyElement.appendChild(trEle);
        }
        this.calendarInstance.table.querySelector('tbody').className = this.calendarInstance.effect;
        this.islamicIconHandler();
        if (view !== this.calendarInstance.getViewNumber(this.calendarInstance.currentView())
            || (view === 0 && view !== this.calendarInstance.getViewNumber(this.calendarInstance.currentView()))) {
            this.calendarInstance.navigateHandler(e);
        }
        this.calendarInstance.setAriaActiveDescendant();
        this.calendarInstance.changedArgs = { value: this.calendarInstance.value, values: this.calendarInstance.values };
        this.calendarInstance.changeHandler();
    }
    islamicCompareMonth(start, end) {
        const hijriStart = (this.getIslamicDate(start));
        const hijriEnd = (this.getIslamicDate(end));
        let result;
        if (hijriStart.year > hijriEnd.year) {
            result = 1;
        }
        else if (hijriStart.year < hijriEnd.year) {
            result = -1;
        }
        else {
            result = hijriStart.month === hijriEnd.month ? 0 : hijriStart.month > hijriEnd.month ? 1 : -1;
        }
        return result;
    }
    islamicCompare(startDate, endDate, modifier) {
        const hijriStart = this.getIslamicDate(startDate);
        const hijriEnd = this.getIslamicDate(endDate);
        let start = hijriEnd.year;
        let end;
        let result;
        end = start;
        result = 0;
        if (modifier) {
            start = start - start % modifier;
            end = start - start % modifier + modifier - 1;
        }
        if (hijriStart.year > end) {
            result = 1;
        }
        else if ((this.calendarInstance.currentView() === 'Decade') && hijriStart.year < start &&
            !((startDate.getFullYear() >= minDecade && startDate.getFullYear() <= maxDecade))) {
            result = -1;
        }
        else if (hijriStart.year < start && (this.calendarInstance.currentView() === 'Year')) {
            result = -1;
        }
        return result;
    }
    getIslamicDate(date) {
        return (HijriParser.getHijriDate(date));
    }
    toGregorian(year, month, date) {
        return HijriParser.toGregorian(year, month, date);
    }
    hijriCompareYear(start, end) {
        return this.islamicCompare(start, end, 0);
    }
    hijriCompareDecade(start, end) {
        return this.islamicCompare(start, end, 10);
    }
    destroy() {
        this.calendarInstance = null;
    }
    islamicInValue(inValue) {
        if (inValue instanceof Date) {
            return (inValue.toUTCString());
        }
        else {
            return ('' + inValue);
        }
    }
}
/* eslint-enable @typescript-eslint/no-explicit-any */

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//class constant defination
const DATEWRAPPER = 'e-date-wrapper';
const ROOT$1 = 'e-datepicker';
const LIBRARY = 'e-lib';
const CONTROL = 'e-control';
const POPUPWRAPPER = 'e-popup-wrapper';
const INPUTWRAPPER = 'e-input-group-icon';
const POPUP = 'e-popup';
const INPUTCONTAINER = 'e-input-group';
const INPUTFOCUS = 'e-input-focus';
const INPUTROOT = 'e-input';
const ERROR = 'e-error';
const ACTIVE = 'e-active';
const OVERFLOW = 'e-date-overflow';
const DATEICON = 'e-date-icon';
const ICONS = 'e-icons';
const OPENDURATION = 300;
const OFFSETVALUE = 4;
const SELECTED$2 = 'e-selected';
const FOCUSEDDATE$2 = 'e-focused-date';
const NONEDIT = 'e-non-edit';
const containerAttr = ['title', 'class', 'style'];
/**
 * Represents the DatePicker component that allows user to select
 * or enter a date value.
 * ```html
 * <input id='datepicker'/>
 * ```
 * ```typescript
 * <script>
 *   let datePickerObject:DatePicker = new DatePicker({ value: new Date() });
 *   datePickerObject.appendTo('#datepicker');
 * </script>
 * ```
 */
let DatePicker = class DatePicker extends Calendar {
    /**
     * Constructor for creating the widget.
     *
     * @param {DatePickerModel} options - Specifies the DatePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.isDateIconClicked = false;
        this.isAltKeyPressed = false;
        this.isInteracted = true;
        this.invalidValueString = null;
        this.checkPreviousValue = null;
        this.maskedDateValue = '';
        this.preventChange = false;
        this.isIconClicked = false;
        this.isDynamicValueChanged = false;
        this.moduleName = this.getModuleName();
        this.isFocused = false;
        this.isBlur = false;
        this.isKeyAction = false;
        this.datepickerOptions = options;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        this.initialize();
        this.bindEvents();
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        }
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.renderComplete();
        this.setTimeZone(this.serverTimezoneOffset);
    }
    setTimeZone(offsetValue) {
        if (!isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            const clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            const serverTimezoneDiff = offsetValue;
            let timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date((this.value).getTime() + (timeZoneDiff * 60 * 60 * 1000));
            this.updateInput();
        }
    }
    isDayLightSaving() {
        const firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        const secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    }
    setAllowEdit() {
        if (this.allowEdit) {
            if (!this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
        else {
            attributes(this.inputElement, { 'readonly': '' });
        }
        this.updateIconState();
    }
    updateIconState() {
        if (!this.allowEdit && this.inputWrapper && !this.readonly) {
            if (this.inputElement.value === '') {
                removeClass([this.inputWrapper.container], [NONEDIT]);
            }
            else {
                addClass([this.inputWrapper.container], [NONEDIT]);
            }
        }
        else if (this.inputWrapper) {
            removeClass([this.inputWrapper.container], [NONEDIT]);
        }
    }
    initialize() {
        this.checkInvalidValue(this.value);
        if (this.enableMask) {
            this.notify('createMask', {
                module: 'MaskedDateTime'
            });
        }
        this.createInput();
        this.updateHtmlAttributeToWrapper();
        this.setAllowEdit();
        if (this.enableMask && !this.value && this.maskedDateValue && (this.floatLabelType === 'Always' || !this.floatLabelType || !this.placeholder)) {
            this.updateInput(true);
            this.updateInputValue(this.maskedDateValue);
        }
        else if (!this.enableMask) {
            this.updateInput(true);
        }
        this.previousElementValue = this.inputElement.value;
        this.previousDate = !isNullOrUndefined(this.value) ? new Date(+this.value) : null;
        this.inputElement.setAttribute('value', this.inputElement.value);
        this.inputValueCopy = this.value;
    }
    createInput() {
        const ariaAttrs = {
            'aria-atomic': 'true', 'aria-expanded': 'false',
            'role': 'combobox', 'autocomplete': 'off', 'autocorrect': 'off',
            'autocapitalize': 'off', 'spellcheck': 'false', 'aria-invalid': 'false'
        };
        if (this.getModuleName() === 'datepicker') {
            const l10nLocale = { placeholder: this.placeholder };
            this.globalize = new Internationalization(this.locale);
            this.l10n = new L10n('datepicker', l10nLocale, this.locale);
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (this.fullScreenMode && Browser.isDevice) {
            this.cssClass += ' ' + 'e-popup-expand';
        }
        let updatedCssClassValues = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValues = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        const isBindClearAction = this.enableMask ? false : true;
        this.inputWrapper = Input.createInput({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            bindClearAction: isBindClearAction,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValues,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton
            },
            buttons: [INPUTWRAPPER + ' ' + DATEICON + ' ' + ICONS]
        }, this.createElement);
        this.setWidth(this.width);
        if (this.inputElement.name !== '') {
            this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute('name'));
        }
        else {
            this.inputElement.setAttribute('name', '' + this.element.id);
        }
        attributes(this.inputElement, ariaAttrs);
        if (!this.inputElement.hasAttribute('aria-label')) {
            this.inputElement.setAttribute('aria-label', this.getModuleName());
        }
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.inputElement.tabIndex = -1;
        }
        else {
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
        Input.addAttributes({ 'aria-label': 'select', 'role': 'button' }, this.inputWrapper.buttons[0]);
        addClass([this.inputWrapper.container], DATEWRAPPER);
    }
    updateInput(isDynamic = false, isBlur = false) {
        let formatOptions;
        if (this.value && !this.isCalendar()) {
            this.disabledDates(isDynamic, isBlur);
        }
        if (isNaN(+new Date(this.checkValue(this.value)))) {
            this.setProperties({ value: null }, true);
        }
        if (this.strictMode) {
            //calls the Calendar processDate protected method to update the date value according to the strictMode true behaviour.
            super.validateDate();
            this.minMaxUpdates();
            super.minMaxUpdate();
        }
        if (!isNullOrUndefined(this.value)) {
            const dateValue = this.value;
            let dateString;
            const tempFormat = !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
            if (this.getModuleName() === 'datetimepicker') {
                if (this.calendarMode === 'Gregorian') {
                    dateString = this.globalize.formatDate(this.value, {
                        format: tempFormat, type: 'dateTime', skeleton: 'yMd'
                    });
                }
                else {
                    dateString = this.globalize.formatDate(this.value, {
                        format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                    });
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                dateString = this.globalize.formatDate(this.value, formatOptions);
            }
            if ((+dateValue <= +this.max) && (+dateValue >= +this.min)) {
                this.updateInputValue(dateString);
            }
            else {
                const value = (+dateValue >= +this.max || !+this.value) || (!+this.value || +dateValue <= +this.min);
                if (!this.strictMode && value) {
                    this.updateInputValue(dateString);
                }
            }
        }
        if (isNullOrUndefined(this.value) && this.strictMode) {
            if (!this.enableMask) {
                this.updateInputValue('');
            }
            else {
                this.updateInputValue(this.maskedDateValue);
                this.notify('createMask', {
                    module: 'MaskedDateTime'
                });
            }
        }
        if (!this.strictMode && isNullOrUndefined(this.value) && this.invalidValueString) {
            this.updateInputValue(this.invalidValueString);
        }
        this.changedArgs = { value: this.value };
        this.errorClass();
        this.updateIconState();
    }
    minMaxUpdates() {
        if (!isNullOrUndefined(this.value) && this.value < this.min && this.min <= this.max && this.strictMode) {
            this.setProperties({ value: this.min }, true);
            this.changedArgs = { value: this.value };
        }
        else {
            if (!isNullOrUndefined(this.value) && this.value > this.max && this.min <= this.max && this.strictMode) {
                this.setProperties({ value: this.max }, true);
                this.changedArgs = { value: this.value };
            }
        }
    }
    checkStringValue(val) {
        let returnDate = null;
        let formatOptions = null;
        let formatDateTime = null;
        if (this.getModuleName() === 'datetimepicker') {
            const culture = new Internationalization(this.locale);
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
            }
            else {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'islamic' };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
        }
        returnDate = this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(val), formatOptions));
        if (isNullOrUndefined(returnDate) && (this.getModuleName() === 'datetimepicker')) {
            returnDate = this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(val), formatDateTime));
        }
        return returnDate;
    }
    checkInvalidValue(value) {
        if (!(value instanceof Date) && !isNullOrUndefined(value)) {
            let valueDate = null;
            let valueString = value;
            if (typeof value === 'number') {
                valueString = value.toString();
            }
            let formatOptions = null;
            let formatDateTime = null;
            if (this.getModuleName() === 'datetimepicker') {
                const culture = new Internationalization(this.locale);
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
                }
                else {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'islamic' };
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
            }
            let invalid = false;
            if (typeof valueString !== 'string') {
                valueString = null;
                invalid = true;
            }
            else {
                if (typeof valueString === 'string') {
                    valueString = valueString.trim();
                }
                valueDate = this.checkStringValue(valueString);
                if (!valueDate) {
                    let extISOString = null;
                    let basicISOString = null;
                    // eslint-disable-next-line
                    extISOString = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                    // eslint-disable-next-line
                    basicISOString = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                    if ((!extISOString.test(valueString) && !basicISOString.test(valueString))
                        || (/^[a-zA-Z0-9- ]*$/).test(valueString) || isNaN(+new Date(this.checkValue(valueString)))) {
                        invalid = true;
                    }
                    else {
                        valueDate = new Date(valueString);
                    }
                }
            }
            if (invalid) {
                if (!this.strictMode) {
                    this.invalidValueString = valueString;
                }
                this.setProperties({ value: null }, true);
            }
            else {
                this.setProperties({ value: valueDate }, true);
            }
        }
    }
    bindInputEvent() {
        if (!isNullOrUndefined(this.formatString) || this.enableMask) {
            if (this.enableMask || this.formatString.indexOf('y') === -1) {
                EventHandler.add(this.inputElement, 'input', this.inputHandler, this);
            }
            else {
                EventHandler.remove(this.inputElement, 'input', this.inputHandler);
            }
        }
    }
    bindEvents() {
        EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.dateIconHandler, this);
        EventHandler.add(this.inputElement, 'mouseup', this.mouseUpHandler, this);
        EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
        EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
        EventHandler.add(this.inputElement, 'keyup', this.keyupHandler, this);
        if (this.enableMask) {
            EventHandler.add(this.inputElement, 'keydown', this.keydownHandler, this);
        }
        this.bindInputEvent();
        // To prevent the twice triggering.
        EventHandler.add(this.inputElement, 'change', this.inputChangeHandler, this);
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.resetFormHandler, this);
        }
        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
        this.keyboardModules = new KeyboardEvents(this.inputElement, {
            eventName: 'keydown',
            keyAction: this.inputKeyActionHandle.bind(this),
            keyConfigs: this.defaultKeyConfigs
        });
    }
    keydownHandler(e) {
        switch (e.code) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'Home':
            case 'End':
            case 'Backspace':
            case 'Delete':
                if (this.enableMask && !this.popupObj && !this.readonly) {
                    if (e.code !== 'Delete' && e.code !== 'Backspace') {
                        e.preventDefault();
                    }
                    this.notify('keyDownHandler', {
                        module: 'MaskedDateTime',
                        e: e
                    });
                }
                break;
        }
    }
    unBindEvents() {
        if (!isNullOrUndefined(this.inputWrapper)) {
            EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.dateIconHandler);
        }
        EventHandler.remove(this.inputElement, 'mouseup', this.mouseUpHandler);
        EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
        EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        EventHandler.remove(this.inputElement, 'change', this.inputChangeHandler);
        EventHandler.remove(this.inputElement, 'keyup', this.keyupHandler);
        if (this.enableMask) {
            EventHandler.remove(this.inputElement, 'keydown', this.keydownHandler);
        }
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.remove(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler);
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.resetFormHandler);
        }
    }
    resetFormHandler() {
        if (!this.enabled) {
            return;
        }
        if (!this.inputElement.disabled) {
            let value = this.inputElement.getAttribute('value');
            if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
                value = '';
                this.inputValueCopy = null;
                this.inputElement.setAttribute('value', '');
            }
            this.setProperties({ value: this.inputValueCopy }, true);
            this.restoreValue();
            if (this.inputElement) {
                this.updateInputValue(value);
                this.errorClass();
            }
        }
    }
    restoreValue() {
        this.currentDate = this.value ? this.value : new Date();
        this.previousDate = this.value;
        this.previousElementValue = (isNullOrUndefined(this.inputValueCopy)) ? '' :
            this.globalize.formatDate(this.inputValueCopy, {
                format: this.formatString, type: 'dateTime', skeleton: 'yMd'
            });
    }
    inputChangeHandler(e) {
        if (!this.enabled) {
            return;
        }
        e.stopPropagation();
    }
    bindClearEvent() {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
    }
    resetHandler(e) {
        if (!this.enabled) {
            return;
        }
        e.preventDefault();
        this.clear(e);
    }
    mouseUpHandler(e) {
        if (this.enableMask) {
            e.preventDefault();
            this.notify('setMaskSelection', {
                module: 'MaskedDateTime'
            });
        }
    }
    clear(event) {
        this.setProperties({ value: null }, true);
        if (!this.enableMask) {
            this.updateInputValue('');
        }
        const clearedArgs = {
            event: event
        };
        this.trigger('cleared', clearedArgs);
        this.invalidValueString = '';
        this.updateInput();
        this.popupUpdate();
        this.changeEvent(event);
        if (this.enableMask) {
            this.notify('clearHandler', {
                module: 'MaskedDateTime'
            });
        }
        if (closest(this.element, 'form')) {
            const element = this.element;
            const keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    }
    preventEventBubbling(e) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.interopAdaptor.invokeMethodAsync('OnDateIconClick');
    }
    updateInputValue(value) {
        Input.setValue(value, this.inputElement, this.floatLabelType, this.showClearButton);
    }
    dateIconHandler(e) {
        if (!this.enabled) {
            return;
        }
        this.isIconClicked = true;
        if (Browser.isDevice) {
            this.inputElement.setAttribute('readonly', '');
            this.inputElement.blur();
        }
        e.preventDefault();
        if (!this.readonly) {
            if (this.isCalendar()) {
                this.hide(e);
            }
            else {
                this.isDateIconClicked = true;
                this.show(null, e);
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.focus();
                }
                this.inputElement.focus();
                addClass([this.inputWrapper.container], [INPUTFOCUS]);
                addClass(this.inputWrapper.buttons, ACTIVE);
            }
        }
        this.isIconClicked = false;
    }
    updateHtmlAttributeToWrapper() {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (const key of Object.keys(this.htmlAttributes)) {
                if (!isNullOrUndefined(this.htmlAttributes[`${key}`])) {
                    if (containerAttr.indexOf(key) > -1) {
                        if (key === 'class') {
                            const updatedClassValues = (this.htmlAttributes[`${key}`].replace(/\s+/g, ' ')).trim();
                            if (updatedClassValues !== '') {
                                addClass([this.inputWrapper.container], updatedClassValues.split(' '));
                            }
                        }
                        else if (key === 'style') {
                            let setStyle = this.inputWrapper.container.getAttribute(key);
                            if (!isNullOrUndefined(setStyle)) {
                                if (setStyle.charAt(setStyle.length - 1) === ';') {
                                    setStyle = setStyle + this.htmlAttributes[`${key}`];
                                }
                                else {
                                    setStyle = setStyle + ';' + this.htmlAttributes[`${key}`];
                                }
                            }
                            else {
                                setStyle = this.htmlAttributes[`${key}`];
                            }
                            this.inputWrapper.container.setAttribute(key, setStyle);
                        }
                        else {
                            this.inputWrapper.container.setAttribute(key, this.htmlAttributes[`${key}`]);
                        }
                    }
                }
            }
        }
    }
    updateHtmlAttributeToElement() {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (const key of Object.keys(this.htmlAttributes)) {
                if (containerAttr.indexOf(key) < 0) {
                    this.inputElement.setAttribute(key, this.htmlAttributes[`${key}`]);
                }
            }
        }
    }
    updateCssClass(newCssClass, oldCssClass) {
        if (!isNullOrUndefined(oldCssClass)) {
            oldCssClass = (oldCssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(newCssClass)) {
            newCssClass = (newCssClass.replace(/\s+/g, ' ')).trim();
        }
        Input.setCssClass(newCssClass, [this.inputWrapper.container], oldCssClass);
        if (this.popupWrapper) {
            Input.setCssClass(newCssClass, [this.popupWrapper], oldCssClass);
        }
    }
    calendarKeyActionHandle(e) {
        switch (e.action) {
            case 'escape':
                if (this.isCalendar()) {
                    this.hide(e);
                }
                else {
                    this.inputWrapper.container.children[this.index].blur();
                }
                break;
            case 'enter':
                if (!this.isCalendar()) {
                    this.show(null, e);
                }
                else {
                    if (+this.value !== +this.currentDate && !this.isCalendar()) {
                        this.inputWrapper.container.children[this.index].focus();
                    }
                }
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.focus();
                }
                break;
        }
    }
    inputFocusHandler() {
        this.isFocused = true;
        if (!this.enabled) {
            return;
        }
        if (this.enableMask && !this.inputElement.value && this.placeholder) {
            if (this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue(this.maskedDateValue);
                this.inputElement.selectionStart = 0;
                this.inputElement.selectionEnd = this.inputElement.value.length;
            }
        }
        if (this.enableMask && this.showClearButton && this.inputElement && this.inputElement.value === this.maskedDateValue && this.inputWrapper && this.inputWrapper.clearButton && !this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) {
            this.inputWrapper.clearButton.classList.add('e-clear-icon-hide');
        }
        const focusArguments = {
            model: this
        };
        this.isDateIconClicked = false;
        this.trigger('focus', focusArguments);
        this.updateIconState();
        if (this.openOnFocus && !this.isIconClicked) {
            this.show();
        }
    }
    inputHandler(e) {
        this.isPopupClicked = false;
        if (this.enableMask) {
            if (!isNullOrUndefined(e) && !isNullOrUndefined(e.inputType) && e.inputType === 'insertFromPaste') {
                this.notify('maskPasteInputHandler', {
                    module: 'MaskedDateTime'
                });
            }
            else {
                this.notify('inputHandler', {
                    module: 'MaskedDateTime'
                });
            }
        }
    }
    inputBlurHandler(e) {
        if (!this.enabled) {
            return;
        }
        this.strictModeUpdate();
        if (this.inputElement.value === '' && isNullOrUndefined(this.value)) {
            this.invalidValueString = null;
            this.updateInputValue('');
        }
        this.isBlur = true;
        this.updateInput(false, true);
        this.isBlur = false;
        this.popupUpdate();
        this.changeTrigger(e);
        if (this.enableMask && this.maskedDateValue && this.placeholder && this.floatLabelType !== 'Always') {
            if (this.inputElement.value === this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue('');
            }
        }
        this.errorClass();
        if (this.isCalendar() && document.activeElement === this.inputElement) {
            this.hide(e);
        }
        if (this.getModuleName() === 'datepicker') {
            const blurArguments = {
                model: this
            };
            this.trigger('blur', blurArguments);
        }
        if (this.isCalendar()) {
            this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
            this.calendarKeyboardModules = new KeyboardEvents(this.calendarElement.children[1].firstElementChild, {
                eventName: 'keydown',
                keyAction: this.calendarKeyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        this.isPopupClicked = false;
    }
    documentHandler(e) {
        if ((!isNullOrUndefined(this.popupObj) && !isNullOrUndefined(this.inputWrapper) && (this.inputWrapper.container.contains(e.target) && e.type !== 'mousedown' ||
            (this.popupObj.element && this.popupObj.element.contains(e.target)))) && e.type !== 'touchstart') {
            e.preventDefault();
        }
        const target = e.target;
        if (!(closest(target, '.e-datepicker.e-popup-wrapper')) && !isNullOrUndefined(this.inputWrapper)
            && !(closest(target, '.' + INPUTCONTAINER) === this.inputWrapper.container)
            && (!target.classList.contains('e-day'))
            && (!target.classList.contains('e-dlg-overlay'))) {
            this.hide(e);
            this.focusOut();
        }
        else if (closest(target, '.e-datepicker.e-popup-wrapper')) {
            // Fix for close the popup when select the previously selected value.
            if (target.classList.contains('e-day')
                && !isNullOrUndefined(e.target.parentElement)
                && e.target.parentElement.classList.contains('e-selected')
                && closest(target, '.e-content')
                && closest(target, '.e-content').classList.contains('e-' + this.depth.toLowerCase())) {
                this.hide(e);
            }
            else if (closest(target, '.e-footer-container')
                && target.classList.contains('e-today')
                && target.classList.contains('e-btn')
                && (+new Date(+this.value) === +super.generateTodayVal(this.value))) {
                this.hide(e);
            }
        }
    }
    inputKeyActionHandle(e) {
        const clickedView = this.currentView();
        switch (e.action) {
            case 'altUpArrow':
                this.isAltKeyPressed = false;
                this.hide(e);
                this.inputElement.focus();
                break;
            case 'altDownArrow':
                this.isAltKeyPressed = true;
                this.strictModeUpdate();
                this.updateInput();
                this.changeTrigger(e);
                if (this.getModuleName() === 'datepicker') {
                    this.show(null, e);
                }
                break;
            case 'escape':
                this.hide(e);
                break;
            case 'enter':
                this.strictModeUpdate();
                this.updateInput();
                this.popupUpdate();
                this.changeTrigger(e);
                this.errorClass();
                if (!this.isCalendar() && document.activeElement === this.inputElement) {
                    this.hide(e);
                }
                if (this.isCalendar()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                break;
            case 'tab':
            case 'shiftTab':
                {
                    let start = this.inputElement.selectionStart;
                    let end = this.inputElement.selectionEnd;
                    if (this.enableMask && !this.popupObj && !this.readonly) {
                        const length = this.inputElement.value.length;
                        if ((start === 0 && end === length) || (end !== length && e.action === 'tab') || (start !== 0 && e.action === 'shiftTab')) {
                            e.preventDefault();
                        }
                        this.notify('keyDownHandler', {
                            module: 'MaskedDateTime',
                            e: e
                        });
                        start = this.inputElement.selectionStart;
                        end = this.inputElement.selectionEnd;
                    }
                    this.strictModeUpdate();
                    this.updateInput();
                    this.popupUpdate();
                    this.changeTrigger(e);
                    this.errorClass();
                    if (this.enableMask) {
                        this.inputElement.selectionStart = start;
                        this.inputElement.selectionEnd = end;
                    }
                    if (e.action === 'tab' && e.target === this.inputElement && this.isCalendar() && document.activeElement === this.inputElement) {
                        e.preventDefault();
                        this.headerTitleElement.focus();
                    }
                    if (e.action === 'shiftTab' && e.target === this.inputElement && this.isCalendar() && document.activeElement === this.inputElement) {
                        this.hide(e);
                    }
                    break;
                }
            default:
                this.defaultAction(e);
                // Fix for close the popup when select the previously selected value.
                if (e.action === 'select' && clickedView === this.depth) {
                    this.hide(e);
                }
        }
    }
    defaultAction(e) {
        this.previousDate = ((!isNullOrUndefined(this.value) && new Date(+this.value)) || null);
        if (this.isCalendar()) {
            super.keyActionHandle(e);
            if (this.isCalendar()) {
                attributes(this.inputElement, {
                    'aria-activedescendant': '' + this.setActiveDescendant()
                });
            }
        }
    }
    popupUpdate() {
        if ((isNullOrUndefined(this.value)) && (!isNullOrUndefined(this.previousDate)) ||
            (((this.getModuleName() !== 'datetimepicker') && (+this.value !== +this.previousDate)) || ((this.getModuleName() === 'datetimepicker') && (+this.value !== +this.previousDateTime)))) {
            if (this.popupObj) {
                if (this.popupObj.element.querySelectorAll('.' + SELECTED$2).length > 0) {
                    removeClass(this.popupObj.element.querySelectorAll('.' + SELECTED$2), [SELECTED$2]);
                }
            }
            if (!isNullOrUndefined(this.value)) {
                if ((+this.value >= +this.min) && (+this.value <= +this.max)) {
                    const targetdate = new Date(this.checkValue(this.value));
                    super.navigateTo('Month', targetdate);
                }
            }
        }
    }
    strictModeUpdate() {
        let format;
        const pattern = /^y/;
        const charPattern = /[^a-zA-Z]/;
        let formatOptions;
        if (this.getModuleName() === 'datetimepicker') {
            format = !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
        }
        else if (!pattern.test(this.formatString) || charPattern.test(this.formatString)) {
            format = isNullOrUndefined(this.formatString) ? this.formatString : this.formatString.replace('dd', 'd');
        }
        if (!isNullOrUndefined(format)) {
            const len = format.split('M').length - 1;
            if (len < 3) {
                format = format.replace('MM', 'M');
            }
        }
        else {
            format = this.formatString;
        }
        let dateOptions;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                dateOptions = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                dateOptions = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
            dateOptions = formatOptions;
        }
        let date;
        if (typeof this.inputElement.value === 'string') {
            this.inputElement.value = this.inputElement.value.trim();
        }
        if ((this.getModuleName() === 'datetimepicker')) {
            if (this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), dateOptions))) {
                date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), dateOptions);
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), formatOptions);
            }
            if ((isNullOrUndefined(date) || (typeof (date) === 'object' && isNaN(date.getTime())))
                && !isNullOrUndefined(this.inputFormatsString)) {
                for (const format of this.inputFormatsString) {
                    let inputFormatOptions;
                    if (this.calendarMode === 'Gregorian') {
                        inputFormatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
                    }
                    else {
                        inputFormatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                    }
                    date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), inputFormatOptions);
                    if (!isNullOrUndefined(date) && date instanceof Date && !isNaN(date.getTime())) {
                        break;
                    }
                }
            }
        }
        else {
            date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), dateOptions);
            if ((isNullOrUndefined(date) || (typeof (date) === 'object' && isNaN(date.getTime())))
                && !isNullOrUndefined(this.inputFormatsString)) {
                for (const format of this.inputFormatsString) {
                    let inputFormatOptions;
                    if (this.calendarMode === 'Gregorian') {
                        inputFormatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
                    }
                    else {
                        inputFormatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                    }
                    date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), inputFormatOptions);
                    if (!isNullOrUndefined(date) && date instanceof Date && !isNaN(date.getTime())) {
                        break;
                    }
                }
            }
            date = (!isNullOrUndefined(date) && isNaN(+date)) ? null : date;
            if (!isNullOrUndefined(this.formatString) && this.inputElement.value !== '' && this.strictMode) {
                if ((this.isPopupClicked || (!this.isPopupClicked && this.inputElement.value === this.previousElementValue))
                    && this.formatString.indexOf('y') === -1) {
                    date.setFullYear(this.value.getFullYear());
                }
            }
        }
        // EJ2-35061 - To prevent change event from triggering twice when using strictmode and format property
        if ((this.getModuleName() === 'datepicker') && (this.value && !isNaN(+this.value)) && date) {
            date.setHours(this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds());
        }
        if (this.strictMode && date) {
            this.updateInputValue(this.globalize.formatDate(date, dateOptions));
            if (this.inputElement.value !== this.previousElementValue) {
                this.setProperties({ value: date }, true);
            }
        }
        else if (!this.strictMode) {
            if (this.inputElement.value !== this.previousElementValue) {
                this.setProperties({ value: date }, true);
            }
        }
        if (this.strictMode && !date && this.inputElement.value === (this.enableMask ? this.maskedDateValue : '')) {
            this.setProperties({ value: null }, true);
        }
        if (isNaN(+this.value)) {
            this.setProperties({ value: null }, true);
        }
        if (isNullOrUndefined(this.value)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        }
    }
    createCalendar() {
        this.popupWrapper = this.createElement('div', { className: '' + ROOT$1 + ' ' + POPUPWRAPPER, id: this.inputElement.id + '_options' });
        this.popupWrapper.setAttribute('aria-label', this.element.id);
        this.popupWrapper.setAttribute('role', 'dialog');
        if (!isNullOrUndefined(this.cssClass)) {
            this.popupWrapper.className += ' ' + this.cssClass;
        }
        if (Browser.isDevice) {
            this.modelHeader();
            this.modal = this.createElement('div');
            this.modal.className = '' + ROOT$1 + ' e-date-modal';
            document.body.className += ' ' + OVERFLOW;
            this.modal.style.display = 'block';
            document.body.appendChild(this.modal);
        }
        //this.calendarElement represent the Calendar object from the Calendar class.
        this.calendarElement.querySelector('table tbody').className = '';
        this.popupObj = new Popup(this.popupWrapper, {
            content: this.calendarElement,
            relateTo: Browser.isDevice ? document.body : this.inputWrapper.container,
            position: Browser.isDevice ? { X: 'center', Y: 'center' } : (this.enableRtl ? { X: 'right', Y: 'bottom' } : { X: 'left', Y: 'bottom' }),
            offsetY: OFFSETVALUE,
            targetType: 'container',
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            collision: Browser.isDevice ? { X: 'fit', Y: 'fit' } : (this.enableRtl ? { X: 'fit', Y: 'flip' } : { X: 'flip', Y: 'flip' }),
            open: () => {
                if (Browser.isDevice && this.fullScreenMode) {
                    this.iconRight = parseInt(window.getComputedStyle(this.calendarElement.querySelector('.e-header.e-month .e-prev')).marginRight, 10) > 16 ? true : false;
                    this.touchModule = new Touch(this.calendarElement.querySelector('.e-content.e-month'), {
                        swipe: this.CalendarSwipeHandler.bind(this)
                    });
                    EventHandler.add(this.calendarElement.querySelector('.e-content.e-month'), 'touchstart', this.TouchStartHandler, this);
                }
                if (this.getModuleName() !== 'datetimepicker') {
                    if (document.activeElement !== this.inputElement) {
                        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
                        this.calendarElement.children[1].firstElementChild.focus();
                        this.calendarKeyboardModules = new KeyboardEvents(this.calendarElement.children[1].firstElementChild, {
                            eventName: 'keydown',
                            keyAction: this.calendarKeyActionHandle.bind(this),
                            keyConfigs: this.defaultKeyConfigs
                        });
                        this.calendarKeyboardModules = new KeyboardEvents(this.inputWrapper.container.children[this.index], {
                            eventName: 'keydown',
                            keyAction: this.calendarKeyActionHandle.bind(this),
                            keyConfigs: this.defaultKeyConfigs
                        });
                    }
                }
            }, close: () => {
                if (this.isDateIconClicked) {
                    this.inputWrapper.container.children[this.index].focus();
                }
                if (this.value) {
                    this.disabledDates();
                }
                if (this.popupObj) {
                    this.popupObj.destroy();
                }
                this.resetCalendar();
                detach(this.popupWrapper);
                this.popupObj = this.popupWrapper = null;
                this.preventArgs = null;
                this.calendarKeyboardModules = null;
                this.setAriaAttributes();
            }, targetExitViewport: () => {
                if (!Browser.isDevice) {
                    this.hide();
                }
            }
        });
        this.popupObj.element.className += ' ' + this.cssClass;
        this.setAriaAttributes();
    }
    getAmPmValue(date) {
        try {
            if (typeof date === 'string' && date.trim() !== '') {
                // Replace am/pm variants with uppercase AM/PM
                return date.replace(/(am|pm|Am|aM|pM|Pm)/g, (match) => match.toLocaleUpperCase());
            }
            // If date is null, undefined, or an empty string, return a default value or empty string
            return '';
        }
        catch (error) {
            console.error('Error occurred while processing date:', error);
            return ''; // Return a default value in case of an error
        }
    }
    CalendarSwipeHandler(e) {
        let direction = 0;
        if (this.iconRight) {
            switch (e.swipeDirection) {
                case 'Left':
                    direction = 1;
                    break;
                case 'Right':
                    direction = -1;
                    break;
            }
        }
        else {
            switch (e.swipeDirection) {
                case 'Up':
                    direction = 1;
                    break;
                case 'Down':
                    direction = -1;
                    break;
            }
        }
        if (this.touchStart) {
            if (direction === 1) {
                this.navigateNext(e);
            }
            else if (direction === -1) {
                this.navigatePrevious(e);
            }
            this.touchStart = false;
        }
    }
    TouchStartHandler(e) {
        this.touchStart = true;
    }
    setAriaDisabled() {
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.inputElement.tabIndex = -1;
        }
        else {
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
    }
    modelHeader() {
        let dateOptions;
        const modelHeader = this.createElement('div', { className: 'e-model-header' });
        const yearHeading = this.createElement('h1', { className: 'e-model-year' });
        const h2 = this.createElement('div');
        const daySpan = this.createElement('span', { className: 'e-model-day' });
        const monthSpan = this.createElement('span', { className: 'e-model-month' });
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'y', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'y', skeleton: 'dateTime', calendar: 'islamic' };
        }
        yearHeading.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'E', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'E', skeleton: 'dateTime', calendar: 'islamic' };
        }
        daySpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions) + ', ';
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime', calendar: 'islamic' };
        }
        monthSpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        if (this.fullScreenMode) {
            const modelCloseIcon = this.createElement('span', { className: 'e-popup-close' });
            EventHandler.add(modelCloseIcon, 'mousedown touchstart', this.modelCloseHandler, this);
            const modelTodayButton = this.calendarElement.querySelector('button.e-today');
            h2.classList.add('e-day-wrapper');
            modelTodayButton.classList.add('e-outline');
            modelHeader.appendChild(modelCloseIcon);
            modelHeader.appendChild(modelTodayButton);
        }
        if (!this.fullScreenMode) {
            modelHeader.appendChild(yearHeading);
        }
        h2.appendChild(daySpan);
        h2.appendChild(monthSpan);
        modelHeader.appendChild(h2);
        this.calendarElement.insertBefore(modelHeader, this.calendarElement.firstElementChild);
    }
    modelCloseHandler(e) {
        this.hide();
    }
    changeTrigger(event) {
        if (this.inputElement.value !== this.previousElementValue) {
            if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
                if (this.isDynamicValueChanged && this.isCalendar()) {
                    this.popupUpdate();
                }
                this.changedArgs.value = this.value;
                this.changedArgs.event = event || null;
                this.changedArgs.element = this.element;
                this.changedArgs.isInteracted = !isNullOrUndefined(event);
                if (this.isAngular && this.preventChange) {
                    this.preventChange = false;
                }
                else {
                    this.trigger('change', this.changedArgs);
                }
                this.previousElementValue = this.inputElement.value;
                this.previousDate = !isNaN(+new Date(this.checkValue(this.value))) ? new Date(this.checkValue(this.value)) : null;
                this.isInteracted = true;
            }
        }
        this.isKeyAction = false;
    }
    navigatedEvent(eve) {
        extend(this.navigatedArgs, { name: 'navigated', event: eve });
        this.trigger('navigated', this.navigatedArgs);
    }
    keyupHandler(e) {
        this.isKeyAction = (this.inputElement.value !== this.previousElementValue) ? true : false;
        if (this.enableMask && this.showClearButton && this.inputElement && this.inputElement.value === this.maskedDateValue && this.inputWrapper && this.inputWrapper.clearButton && !this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) {
            this.inputWrapper.clearButton.classList.add('e-clear-icon-hide');
        }
    }
    changeEvent(event) {
        if (!this.isIconClicked && !(this.isBlur || this.isKeyAction)) {
            this.selectCalendar(event);
        }
        if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
            this.changedArgs.event = event ? event : null;
            this.changedArgs.element = this.element;
            this.changedArgs.isInteracted = this.isInteracted;
            if (!this.isDynamicValueChanged) {
                this.trigger('change', this.changedArgs);
            }
            this.previousDate = this.value && new Date(+this.value);
            if (!this.isDynamicValueChanged) {
                this.hide(event);
            }
            this.previousElementValue = this.inputElement.value;
            this.errorClass();
        }
        else if (event) {
            this.hide(event);
        }
        this.isKeyAction = false;
    }
    requiredModules() {
        const modules = [];
        if (this.calendarMode === 'Islamic') {
            modules.push({ args: [this], member: 'islamic', name: 'Islamic' });
        }
        if (this.enableMask) {
            modules.push({ args: [this], member: 'MaskedDateTime' });
        }
        return modules;
    }
    selectCalendar(e) {
        let date;
        let tempFormat;
        let formatOptions;
        if (this.getModuleName() === 'datetimepicker') {
            tempFormat = !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
        }
        else {
            tempFormat = this.formatString;
        }
        if (this.value) {
            if (this.getModuleName() === 'datetimepicker') {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: tempFormat, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.formatDate(this.changedArgs.value, formatOptions);
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.formatDate(this.changedArgs.value, formatOptions);
            }
            if (this.enableMask) {
                this.notify('createMask', {
                    module: 'MaskedDateTime'
                });
            }
        }
        if (!isNullOrUndefined(date)) {
            this.updateInputValue(date);
            if (this.enableMask) {
                this.notify('setMaskSelection', {
                    module: 'MaskedDateTime'
                });
            }
        }
    }
    isCalendar() {
        if (this.popupWrapper && this.popupWrapper.classList.contains('' + POPUPWRAPPER)) {
            return true;
        }
        return false;
    }
    setWidth(width) {
        if (typeof width === 'number') {
            this.inputWrapper.container.style.width = formatUnit(this.width);
        }
        else if (typeof width === 'string') {
            this.inputWrapper.container.style.width = (width.match(/px|%|em/)) ? (this.width) : (formatUnit(this.width));
        }
        else {
            this.inputWrapper.container.style.width = '100%';
        }
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Shows the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    show(type, e) {
        if ((this.enabled && this.readonly) || !this.enabled || this.popupObj) {
            return;
        }
        else {
            let prevent = true;
            let outOfRange;
            if (!isNullOrUndefined(this.value) && !(+this.value >= +new Date(this.checkValue(this.min))
                && +this.value <= +new Date(this.checkValue(this.max)))) {
                outOfRange = new Date(this.checkValue(this.value));
                this.setProperties({ 'value': null }, true);
            }
            else {
                outOfRange = this.value || null;
            }
            if (!this.isCalendar()) {
                super.render();
                this.setProperties({ 'value': outOfRange || null }, true);
                this.previousDate = outOfRange;
                this.createCalendar();
            }
            if (Browser.isDevice) {
                this.mobilePopupWrapper = this.createElement('div', { className: 'e-datepick-mob-popup-wrap' });
                document.body.appendChild(this.mobilePopupWrapper);
            }
            this.preventArgs = {
                preventDefault: () => {
                    prevent = false;
                },
                popup: this.popupObj,
                event: e || null,
                cancel: false,
                appendTo: Browser.isDevice ? this.mobilePopupWrapper : document.body
            };
            const eventArgs = this.preventArgs;
            this.trigger('open', eventArgs, (eventArgs) => {
                this.preventArgs = eventArgs;
                if (prevent && !this.preventArgs.cancel) {
                    addClass(this.inputWrapper.buttons, ACTIVE);
                    this.preventArgs.appendTo.appendChild(this.popupWrapper);
                    this.popupObj.refreshPosition(this.inputElement);
                    const openAnimation = {
                        name: 'FadeIn',
                        duration: Browser.isDevice ? 0 : OPENDURATION
                    };
                    if (this.zIndex === 1000) {
                        this.popupObj.show(new Animation(openAnimation), this.element);
                    }
                    else {
                        this.popupObj.show(new Animation(openAnimation), null);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    super.setOverlayIndex(this.mobilePopupWrapper, this.popupObj.element, this.modal, Browser.isDevice);
                    this.setAriaAttributes();
                    if (Browser.isDevice) {
                        const dlgOverlay = this.createElement('div', { className: 'e-dlg-overlay' });
                        dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
                        this.mobilePopupWrapper.appendChild(dlgOverlay);
                    }
                }
                else {
                    this.popupObj.destroy();
                    this.popupWrapper = this.popupObj = null;
                }
                if (!isNullOrUndefined(this.inputElement) && this.inputElement.value === '') {
                    if (!isNullOrUndefined(this.tableBodyElement) && this.tableBodyElement.querySelectorAll('td.e-selected').length > 0) {
                        addClass([this.tableBodyElement.querySelector('td.e-selected')], FOCUSEDDATE$2);
                        removeClass(this.tableBodyElement.querySelectorAll('td.e-selected'), SELECTED$2);
                    }
                }
                EventHandler.add(document, 'mousedown touchstart', this.documentHandler, this);
            });
        }
    }
    /**
     * Hide the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    hide(event) {
        if (!isNullOrUndefined(this.popupWrapper)) {
            let prevent = true;
            this.preventArgs = {
                preventDefault: () => {
                    prevent = false;
                },
                popup: this.popupObj,
                event: event || null,
                cancel: false
            };
            removeClass(this.inputWrapper.buttons, ACTIVE);
            removeClass([document.body], OVERFLOW);
            const eventArgs = this.preventArgs;
            if (this.isCalendar()) {
                this.trigger('close', eventArgs, (eventArgs) => {
                    this.closeEventCallback(prevent, eventArgs);
                });
            }
            else {
                this.closeEventCallback(prevent, eventArgs);
            }
        }
        else {
            if (Browser.isDevice && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
            this.setAllowEdit();
        }
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-param */
    closeEventCallback(prevent, eventArgs) {
        this.preventArgs = eventArgs;
        if (this.isCalendar() && (prevent && !this.preventArgs.cancel)) {
            this.popupObj.hide();
            this.isAltKeyPressed = false;
            this.keyboardModule.destroy();
            removeClass(this.inputWrapper.buttons, ACTIVE);
        }
        this.setAriaAttributes();
        if (Browser.isDevice && this.modal) {
            this.modal.style.display = 'none';
            this.modal.outerHTML = '';
            this.modal = null;
        }
        if (Browser.isDevice) {
            if (!isNullOrUndefined(this.mobilePopupWrapper) &&
                (prevent && (isNullOrUndefined(this.preventArgs) || !this.preventArgs.cancel))) {
                this.mobilePopupWrapper.remove();
                this.mobilePopupWrapper = null;
            }
        }
        EventHandler.remove(document, 'mousedown touchstart', this.documentHandler);
        if (Browser.isDevice && this.allowEdit && !this.readonly) {
            this.inputElement.removeAttribute('readonly');
        }
        this.setAllowEdit();
    }
    /* eslint-disable jsdoc/require-param */
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    focusIn(triggerEvent) {
        if (document.activeElement !== this.inputElement && this.enabled) {
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS]);
        }
    }
    /* eslint-enable jsdoc/require-param */
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    focusOut() {
        if (document.activeElement === this.inputElement) {
            removeClass([this.inputWrapper.container], [INPUTFOCUS]);
            this.inputElement.blur();
        }
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the DatePicker.
     *
     * @returns {string}
     * @deprecated
     */
    currentView() {
        let currentView;
        if (this.calendarElement) {
            // calls the Calendar currentView public method
            currentView = super.currentView();
        }
        return currentView;
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Navigates to specified month or year or decade view of the DatePicker.
     *
     * @param  {string} view - Specifies the view of the calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns {void}
     * @deprecated
     */
    navigateTo(view, date) {
        if (this.calendarElement) {
            // calls the Calendar navigateTo public method
            super.navigateTo(view, date);
        }
    }
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    destroy() {
        this.unBindEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        super.destroy();
        Input.destroy({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        if (!isNullOrUndefined(this.keyboardModules)) {
            this.keyboardModules.destroy();
        }
        if (this.popupObj && this.popupObj.element.classList.contains(POPUP)) {
            super.destroy();
        }
        const ariaAttrs = {
            'aria-atomic': 'true', 'aria-disabled': 'true',
            'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false'
        };
        if (this.inputElement.hasAttribute('aria-label')) {
            this.inputElement.removeAttribute('aria-label');
        }
        if (this.inputElement) {
            Input.removeAttributes(ariaAttrs, this.inputElement);
            if (!isNullOrUndefined(this.inputElementCopy.getAttribute('tabindex'))) {
                this.inputElement.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.inputElement.removeAttribute('tabindex');
            }
            EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
            this.ensureInputAttribute();
        }
        if (this.isCalendar()) {
            if (this.popupWrapper) {
                detach(this.popupWrapper);
            }
            this.popupObj = this.popupWrapper = null;
            this.keyboardModule.destroy();
        }
        if (this.ngTag === null) {
            if (this.inputElement) {
                if (!isNullOrUndefined(this.inputWrapper)) {
                    this.inputWrapper.container.insertAdjacentElement('afterend', this.inputElement);
                }
                removeClass([this.inputElement], [INPUTROOT]);
            }
            removeClass([this.element], [ROOT$1]);
            if (!isNullOrUndefined(this.inputWrapper)) {
                detach(this.inputWrapper.container);
            }
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.resetFormHandler);
        }
        this.inputWrapper = null;
        this.keyboardModules = null;
    }
    ensureInputAttribute() {
        const prop = [];
        for (let i = 0; i < this.inputElement.attributes.length; i++) {
            prop[i] = this.inputElement.attributes[i].name;
        }
        for (let i = 0; i < prop.length; i++) {
            if (isNullOrUndefined(this.inputElementCopy.getAttribute(prop[i]))) {
                if (prop[i].toLowerCase() === 'value') {
                    this.inputElement.value = '';
                }
                this.inputElement.removeAttribute(prop[i]);
            }
            else {
                if (prop[i].toLowerCase() === 'value') {
                    this.inputElement.value = this.inputElementCopy.getAttribute(prop[i]);
                }
                this.inputElement.setAttribute(prop[i], this.inputElementCopy.getAttribute(prop[i]));
            }
        }
    }
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    preRender() {
        this.inputElementCopy = this.element.cloneNode(true);
        removeClass([this.inputElementCopy], [ROOT$1, CONTROL, LIBRARY]);
        this.inputElement = this.element;
        this.formElement = closest(this.inputElement, 'form');
        this.index = this.showClearButton ? 2 : 1;
        this.ngTag = null;
        if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
            this.ngTag = this.element.tagName;
            this.inputElement = this.createElement('input');
            this.element.appendChild(this.inputElement);
        }
        if (this.element.getAttribute('id')) {
            if (this.ngTag !== null) {
                this.inputElement.id = this.element.getAttribute('id') + '_input';
            }
        }
        else {
            if (this.getModuleName() === 'datetimepicker') {
                this.element.id = getUniqueID('ej2-datetimepicker');
                if (this.ngTag !== null) {
                    attributes(this.inputElement, { 'id': this.element.id + '_input' });
                }
            }
            else {
                this.element.id = getUniqueID('ej2-datepicker');
                if (this.ngTag !== null) {
                    attributes(this.inputElement, { 'id': this.element.id + '_input' });
                }
            }
        }
        if (this.ngTag !== null) {
            this.validationAttribute(this.element, this.inputElement);
        }
        this.updateHtmlAttributeToElement();
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.checkHtmlAttributes(false);
        if (this.inputFormats) {
            this.checkInputFormats();
        }
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
        this.element.removeAttribute('tabindex');
        super.preRender();
    }
    getDefaultKeyConfig() {
        this.defaultKeyConfigs = {
            altUpArrow: 'alt+uparrow',
            altDownArrow: 'alt+downarrow',
            escape: 'escape',
            enter: 'enter',
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
            shiftTab: 'shift+tab',
            tab: 'tab'
        };
        return this.defaultKeyConfigs;
    }
    validationAttribute(target, inputElement) {
        const nameAttribute = target.getAttribute('name') ? target.getAttribute('name') : target.getAttribute('id');
        inputElement.setAttribute('name', nameAttribute);
        target.removeAttribute('name');
        const attribute = ['required', 'aria-required', 'form'];
        for (let i = 0; i < attribute.length; i++) {
            if (isNullOrUndefined(target.getAttribute(attribute[i]))) {
                continue;
            }
            const attr = target.getAttribute(attribute[i]);
            inputElement.setAttribute(attribute[i], attr);
            target.removeAttribute(attribute[i]);
        }
    }
    checkFormat() {
        const culture = new Internationalization(this.locale);
        if (this.format) {
            if (typeof this.format === 'string') {
                this.formatString = this.format;
            }
            else if (this.format.skeleton !== '' && !isNullOrUndefined(this.format.skeleton)) {
                const skeletonString = this.format.skeleton;
                if (this.getModuleName() === 'datetimepicker') {
                    this.formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'dateTime' });
                }
                else {
                    this.formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'date' });
                }
            }
            else {
                if (this.getModuleName() === 'datetimepicker') {
                    this.formatString = this.dateTimeFormat;
                }
                else {
                    this.formatString = null;
                }
            }
        }
        else {
            this.formatString = null;
        }
    }
    checkInputFormats() {
        const culture = new Internationalization(this.locale);
        this.inputFormatsString = [];
        if (this.inputFormats) {
            for (const format of this.inputFormats) {
                let formatString = '';
                if (typeof format === 'string') {
                    formatString = format;
                }
                else if (format.skeleton !== '' && !isNullOrUndefined(format.skeleton)) {
                    const skeletonString = format.skeleton;
                    if (this.getModuleName() === 'datetimepicker') {
                        formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'dateTime' });
                    }
                    else {
                        formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'date' });
                    }
                }
                if (formatString) {
                    this.inputFormatsString.push(formatString);
                }
            }
            if (this.inputFormatsString.length === 0) {
                this.inputFormatsString = null;
            }
        }
        else {
            this.inputFormatsString = null;
        }
    }
    checkHtmlAttributes(dynamic) {
        this.globalize = new Internationalization(this.locale);
        this.checkFormat();
        this.checkView();
        const attributes = dynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['value', 'min', 'max', 'disabled', 'readonly', 'style', 'name', 'placeholder', 'type'];
        let options;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                options = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                options = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
        }
        for (const prop of attributes) {
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['enabled'] === undefined)) || dynamic)) {
                            const enabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' ||
                                this.inputElement.getAttribute(prop) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !dynamic);
                        }
                        break;
                    case 'readonly':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['readonly'] === undefined)) || dynamic)) {
                            const readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                                this.inputElement.getAttribute(prop) === '' || this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !dynamic);
                        }
                        break;
                    case 'placeholder':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['placeholder'] === undefined)) || dynamic)) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !dynamic);
                        }
                        break;
                    case 'style':
                        this.inputElement.setAttribute('style', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'name':
                        this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'value':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['value'] === undefined)) || dynamic)) {
                            const value = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.getAmPmValue(value), options), {}), !dynamic);
                        }
                        break;
                    case 'min':
                        if ((+this.min === +new Date(1900, 0, 1)) || dynamic) {
                            const min = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.getAmPmValue(min), options), {}), !dynamic);
                        }
                        break;
                    case 'max':
                        if ((+this.max === +new Date(2099, 11, 31)) || dynamic) {
                            const max = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.getAmPmValue(max), options), {}), !dynamic);
                        }
                        break;
                    case 'type':
                        if (this.inputElement.getAttribute(prop) !== 'text') {
                            this.inputElement.setAttribute('type', 'text');
                        }
                        break;
                }
            }
        }
    }
    /**
     * To get component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    getModuleName() {
        return 'datepicker';
    }
    disabledDates(isDynamic = false, isBlur = false) {
        let formatOptions;
        let globalize;
        const valueCopy = this.checkDateValue(this.value) ? new Date(+this.value) : new Date(this.checkValue(this.value));
        const previousValCopy = this.previousDate;
        //calls the Calendar render method to check the disabled dates through renderDayCell event and update the input value accordingly.
        this.minMaxUpdates();
        if (!isDynamic || (isDynamic && !isNullOrUndefined(this.renderDayCell))) {
            super.render();
        }
        this.previousDate = previousValCopy;
        const date = valueCopy && +(valueCopy);
        const dateIdString = '*[id^="/id"]'.replace('/id', '' + date);
        if (!this.strictMode) {
            if (typeof this.value === 'string' || ((typeof this.value === 'object') && (+this.value) !== (+valueCopy))) {
                this.setProperties({ value: valueCopy }, true);
            }
        }
        if (!isNullOrUndefined(this.calendarElement) && !isNullOrUndefined(this.calendarElement.querySelectorAll(dateIdString)[0])) {
            if (this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled')) {
                if (!this.strictMode) {
                    this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                }
            }
        }
        let inputVal;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                globalize = this.globalize.formatDate(valueCopy, {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                });
            }
            else {
                globalize = this.globalize.formatDate(valueCopy, {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                });
            }
            inputVal = globalize;
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
            inputVal = this.globalize.formatDate(valueCopy, formatOptions);
        }
        if (!this.popupObj) {
            this.updateInputValue(inputVal);
            if (this.enableMask) {
                this.updateInputValue(this.maskedDateValue);
                this.notify('createMask', {
                    module: 'MaskedDateTime', isBlur: isBlur
                });
            }
        }
    }
    setAriaAttributes() {
        if (this.isCalendar()) {
            Input.addAttributes({ 'aria-expanded': 'true' }, this.inputElement);
            attributes(this.inputElement, { 'aria-owns': this.inputElement.id + '_options' });
            attributes(this.inputElement, { 'aria-controls': this.inputElement.id });
            if (this.value) {
                attributes(this.inputElement, { 'aria-activedescendant': '' + this.setActiveDescendant() });
            }
        }
        else {
            Input.addAttributes({ 'aria-expanded': 'false' }, this.inputElement);
            this.inputElement.removeAttribute('aria-owns');
            this.inputElement.removeAttribute('aria-controls');
            this.inputElement.removeAttribute('aria-activedescendant');
        }
    }
    errorClass() {
        const dateIdString = '*[id^="/id"]'.replace('/id', '' + (+this.value));
        const isDisabledDate = this.calendarElement &&
            this.calendarElement.querySelectorAll(dateIdString)[0] &&
            this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled');
        if ((!isNullOrUndefined(this.value) && !isNullOrUndefined(this.min) &&
            !isNullOrUndefined(this.max) && !(new Date(this.value).setMilliseconds(0) >=
            new Date(this.min).setMilliseconds(0)
            && new Date(this.value).setMilliseconds(0) <= new Date(this.max).setMilliseconds(0)))
            || (!this.strictMode && this.inputElement.value !== '' && this.inputElement.value !== this.maskedDateValue &&
                isNullOrUndefined(this.value) || isDisabledDate) || !this.isValidTime(this.value)) {
            addClass([this.inputWrapper.container], ERROR);
            attributes(this.inputElement, { 'aria-invalid': 'true' });
        }
        else if (!isNullOrUndefined(this.inputWrapper)) {
            removeClass([this.inputWrapper.container], ERROR);
            attributes(this.inputElement, { 'aria-invalid': 'false' });
        }
    }
    isValidTime(value) {
        return true;
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DatePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DatePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            const openPopup = ['blur', 'change', 'cleared', 'close', 'created', 'destroyed', 'focus', 'navigated', 'open', 'renderDayCell'];
            if (openPopup.indexOf(prop) > 0 && this.isReact) {
                this.isDynamicValueChanged = true;
            }
            switch (prop) {
                case 'value':
                    this.isDynamicValueChanged = true;
                    this.isInteracted = false;
                    this.invalidValueString = null;
                    this.checkInvalidValue(newProp.value);
                    newProp.value = this.value;
                    this.previousElementValue = this.inputElement.value;
                    if (isNullOrUndefined(this.value)) {
                        if (this.enableMask) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                        else {
                            this.updateInputValue('');
                        }
                        this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                    }
                    this.updateInput(true);
                    if (+this.previousDate !== +this.value) {
                        this.changeTrigger(null);
                    }
                    this.isInteracted = true;
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'format':
                    this.checkFormat();
                    this.bindInputEvent();
                    this.updateInput();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        if (!this.value) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                    }
                    break;
                case 'inputFormats':
                    this.checkInputFormats();
                    break;
                case 'allowEdit':
                    this.setAllowEdit();
                    break;
                case 'placeholder':
                    Input.setPlaceholder(this.placeholder, this.inputElement);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.inputElement);
                    this.setAriaDisabled();
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.checkHtmlAttributes(true);
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    if (this.datepickerOptions && this.datepickerOptions.placeholder == null) {
                        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                        Input.setPlaceholder(this.placeholder, this.inputElement);
                    }
                    this.updateInput();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'start':
                case 'depth':
                    this.checkView();
                    if (this.calendarElement) {
                        super.onPropertyChanged(newProp, oldProp);
                    }
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.inputElement, this.inputWrapper);
                    this.bindClearEvent();
                    this.index = this.showClearButton ? 2 : 1;
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    this.updateInput();
                    break;
                case 'width':
                    this.setWidth(newProp.width);
                    Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'enableMask':
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        this.updateInputValue(this.maskedDateValue);
                        this.bindInputEvent();
                    }
                    else {
                        if (this.inputElement.value === this.maskedDateValue) {
                            this.updateInputValue('');
                        }
                    }
                    break;
                default:
                    if (this.calendarElement && this.isCalendar()) {
                        super.onPropertyChanged(newProp, oldProp);
                    }
                    if (prop === 'min' && isNullOrUndefined(this.min)) {
                        this.min = new Date(1900, 0, 1);
                    }
                    if (prop === 'max' && isNullOrUndefined(this.max)) {
                        this.max = new Date(2099, 11, 31);
                    }
                    break;
            }
            if (!this.isDynamicValueChanged) {
                this.hide(null);
            }
            this.isDynamicValueChanged = false;
        }
    }
    /**
     * @private
     * @param {Date | Date[]} dates - Specifies the date or dates to be added to the values property of the Calendar.
     * @returns {void}
     */
    addDate(dates) {
        // no code
    }
};
__decorate$1([
    Property(null)
], DatePicker.prototype, "width", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "value", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "cssClass", void 0);
__decorate$1([
    Property(false)
], DatePicker.prototype, "strictMode", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "format", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "inputFormats", void 0);
__decorate$1([
    Property(true)
], DatePicker.prototype, "enabled", void 0);
__decorate$1([
    Property(false)
], DatePicker.prototype, "fullScreenMode", void 0);
__decorate$1([
    Property({})
], DatePicker.prototype, "htmlAttributes", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "values", void 0);
__decorate$1([
    Property(false)
], DatePicker.prototype, "isMultiSelection", void 0);
__decorate$1([
    Property(true)
], DatePicker.prototype, "showClearButton", void 0);
__decorate$1([
    Property(true)
], DatePicker.prototype, "allowEdit", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "keyConfigs", void 0);
__decorate$1([
    Property(false)
], DatePicker.prototype, "enablePersistence", void 0);
__decorate$1([
    Property(1000)
], DatePicker.prototype, "zIndex", void 0);
__decorate$1([
    Property(false)
], DatePicker.prototype, "readonly", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "placeholder", void 0);
__decorate$1([
    Property('Never')
], DatePicker.prototype, "floatLabelType", void 0);
__decorate$1([
    Property(null)
], DatePicker.prototype, "serverTimezoneOffset", void 0);
__decorate$1([
    Property(false)
], DatePicker.prototype, "openOnFocus", void 0);
__decorate$1([
    Property(false)
], DatePicker.prototype, "enableMask", void 0);
__decorate$1([
    Property({ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' })
], DatePicker.prototype, "maskPlaceholder", void 0);
__decorate$1([
    Event()
], DatePicker.prototype, "open", void 0);
__decorate$1([
    Event()
], DatePicker.prototype, "cleared", void 0);
__decorate$1([
    Event()
], DatePicker.prototype, "close", void 0);
__decorate$1([
    Event()
], DatePicker.prototype, "blur", void 0);
__decorate$1([
    Event()
], DatePicker.prototype, "focus", void 0);
__decorate$1([
    Event()
], DatePicker.prototype, "created", void 0);
__decorate$1([
    Event()
], DatePicker.prototype, "destroyed", void 0);
DatePicker = __decorate$1([
    NotifyPropertyChanges
], DatePicker);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const DATERANGEWRAPPER = 'e-date-range-wrapper';
const INPUTCONTAINER$1 = 'e-input-group';
const DATERANGEICON = 'e-input-group-icon e-range-icon e-icons';
const POPUP$1 = 'e-popup';
const LEFTCALENDER = 'e-left-calendar';
const RIGHTCALENDER = 'e-right-calendar';
const LEFTCONTAINER = 'e-left-container';
const RIGHTCONTAINER = 'e-right-container';
const ROOT$2 = 'e-daterangepicker';
const LIBRARY$1 = 'e-lib';
const CONTROL$1 = 'e-control';
const ERROR$1 = 'e-error';
const ACTIVE$1 = 'e-active';
const STARTENDCONTAINER = 'e-start-end';
const STARTDATE = 'e-start-date';
const ENDDATE = 'e-end-date';
const STARTBUTTON = 'e-start-btn';
const INPUTFOCUS$1 = 'e-input-focus';
const ENDBUTTON = 'e-end-btn';
const RANGEHOVER = 'e-range-hover';
const OTHERMONTH$2 = 'e-other-month';
const STARTLABEL = 'e-start-label';
const ENDLABEL = 'e-end-label';
const DISABLED$2 = 'e-disabled';
const SELECTED$3 = 'e-selected';
const CALENDAR = 'e-calendar';
const NEXTICON$1 = 'e-next';
const PREVICON$1 = 'e-prev';
const HEADER$1 = 'e-header';
const TITLE$1 = 'e-title';
const ICONCONTAINER$1 = 'e-icon-container';
const RANGECONTAINER = 'e-date-range-container';
const RANGEHEADER = 'e-range-header';
const PRESETS = 'e-presets';
const FOOTER$1 = 'e-footer';
const RANGEBORDER = 'e-range-border';
const TODAY$2 = 'e-today';
const FOCUSDATE = 'e-focused-date';
const CONTENT$1 = 'e-content';
const DAYSPAN = 'e-day-span';
const WEEKNUMBER$2 = 'e-week-number';
const DATEDISABLED = 'e-date-disabled';
const ICONDISABLED = 'e-icon-disabled';
const CALENDARCONTAINER = 'e-calendar-container';
const SEPARATOR = 'e-separator';
const APPLY = 'e-apply';
const CANCEL = 'e-cancel';
const DEVICE$1 = 'e-device';
const OVERLAY$2 = 'e-overlay';
const CHANGEICON = 'e-change-icon e-icons';
const LISTCLASS = 'e-list-item';
const RTL$1 = 'e-rtl';
const HOVER = 'e-hover';
const OVERFLOW$1 = 'e-range-overflow';
const OFFSETVALUE$1 = 4;
const PRIMARY$1 = 'e-primary';
const FLAT$1 = 'e-flat';
const CSS$1 = 'e-css';
const ZOOMIN$1 = 'e-zoomin';
const NONEDITABLE = 'e-non-edit';
const DAYHEADERLONG$1 = 'e-daterange-day-header-lg';
const HIDDENELEMENT = 'e-daterange-hidden';
const wrapperAttr = ['title', 'class', 'style'];
class Presets extends ChildProperty {
}
__decorate$2([
    Property()
], Presets.prototype, "label", void 0);
__decorate$2([
    Property()
], Presets.prototype, "start", void 0);
__decorate$2([
    Property()
], Presets.prototype, "end", void 0);
/**
 * Represents the DateRangePicker component that allows user to select the date range from the calendar
 * or entering the range through the input element.
 * ```html
 * <input id="daterangepicker"/>
 * ```
 * ```typescript
 * <script>
 *   var dateRangePickerObj = new DateRangePicker({ startDate: new Date("05/07/2017"), endDate: new Date("10/07/2017") });
 *   dateRangePickerObj.appendTo("#daterangepicker");
 * </script>
 * ```
 */
let DateRangePicker = class DateRangePicker extends CalendarBase {
    /**
     * Constructor for creating the widget
     *
     * @param {DateRangePickerModel} options - Specifies the DateRangePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.isCustomRange = false;
        this.isCustomWindow = false;
        this.presetsItem = [];
        this.liCollections = [];
        this.previousEleValue = '';
        this.isKeyPopup = false;
        this.dateDisabled = false;
        this.isRangeIconClicked = false;
        this.isMaxDaysClicked = false;
        this.disabledDays = [];
        this.preventBlur = false;
        this.preventFocus = false;
        this.invalidValueString = null;
        this.preventChange = false;
        this.dateRangeOptions = options;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        this.initialize();
        this.setProperties({ startDate: this.startValue }, true);
        this.setProperties({ endDate: this.endValue }, true);
        this.setModelValue();
        this.setDataAttribute(false);
        if (this.element.hasAttribute('data-val')) {
            this.element.setAttribute('data-val', 'false');
        }
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        }
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.renderComplete();
    }
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    preRender() {
        this.keyInputConfigs = {
            altDownArrow: 'alt+downarrow',
            escape: 'escape',
            enter: 'enter',
            tab: 'tab',
            altRightArrow: 'alt+rightarrow',
            altLeftArrow: 'alt+leftarrow',
            moveUp: 'uparrow',
            moveDown: 'downarrow',
            spacebar: 'space'
        };
        this.defaultConstant = {
            placeholder: this.placeholder,
            startLabel: 'Start Date',
            endLabel: 'End Date',
            customRange: 'Custom Range',
            applyText: 'Apply',
            cancelText: 'Cancel',
            selectedDays: 'Selected Days',
            days: 'days'
        };
        /**
         * Mobile View
         */
        this.isMobile = (Browser.isDevice) ? true : window.matchMedia('(max-width:550px)').matches;
        this.inputElement = this.element;
        this.angularTag = null;
        if (this.element.tagName === 'EJS-DATERANGEPICKER') {
            this.angularTag = this.element.tagName;
            this.inputElement = this.createElement('input');
            this.element.appendChild(this.inputElement);
        }
        this.cloneElement = this.element.cloneNode(true);
        removeClass([this.cloneElement], [ROOT$2, CONTROL$1, LIBRARY$1]);
        this.updateHtmlAttributeToElement();
        if (this.element.getAttribute('id')) {
            if (this.angularTag !== null) {
                this.inputElement.id = this.element.getAttribute('id') + '_input';
            }
        }
        else {
            this.element.id = getUniqueID('ej2-datetimepicker');
            if (this.angularTag !== null) {
                attributes(this.inputElement, { 'id': this.element.id + '_input' });
            }
        }
        this.checkInvalidRange(this.value);
        if (!this.invalidValueString && (typeof (this.value) === 'string')) {
            const rangeArray = this.value.split(' ' + this.separator + ' ');
            this.value = [new Date(rangeArray[0]), new Date(rangeArray[1])];
        }
        this.initProperty();
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
        this.element.removeAttribute('tabindex');
        super.preRender();
        this.navNextFunction = this.navNextMonth.bind(this);
        this.navPrevFunction = this.navPrevMonth.bind(this);
        this.deviceNavNextFunction = this.deviceNavNext.bind(this);
        this.deviceNavPrevFunction = this.deviceNavPrevious.bind(this);
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
        this.formElement = closest(this.element, 'form');
    }
    updateValue() {
        if (this.value && this.value.length > 0) {
            if (this.value[0] instanceof Date && !isNaN(+this.value[0])) {
                this.setProperties({ startDate: this.value[0] }, true);
                this.startValue = this.value[0];
            }
            else if (typeof this.value[0] === 'string') {
                if (+this.value[0] === 0 || isNaN(+(new Date(this.checkValue(this.value[0]))))) {
                    this.startValue = null;
                    this.setValue();
                }
                else {
                    this.setProperties({ startDate: new Date(this.checkValue(this.value[0])) }, true);
                    this.startValue = new Date(this.checkValue(this.value[0]));
                }
            }
            else {
                this.startValue = null;
                this.setValue();
            }
            if (this.value[1] instanceof Date && !isNaN(+this.value[1])) {
                this.setProperties({ endDate: this.value[1] }, true);
                this.endValue = this.value[1];
            }
            else if (typeof this.value[1] === 'string') {
                if (+this.value[0] === 0 || isNaN(+(new Date(this.checkValue(this.value[0]))))) {
                    this.setProperties({ endDate: null }, true);
                    this.endValue = null;
                    this.setValue();
                }
                else {
                    this.setProperties({ endDate: new Date(this.checkValue(this.value[1])) }, true);
                    this.endValue = new Date(this.checkValue(this.value[1]));
                    this.setValue();
                }
            }
            else {
                this.setProperties({ endDate: null }, true);
                this.endValue = null;
                this.setValue();
            }
        }
        else if (this.value && this.value.start) {
            if (this.value.start instanceof Date && !isNaN(+this.value.start)) {
                this.setProperties({ startDate: this.value.start }, true);
                this.startValue = this.value.start;
            }
            else if (typeof this.value.start === 'string') {
                this.setProperties({ startDate: new Date(this.checkValue(this.value.start)) }, true);
                this.startValue = new Date(this.checkValue(this.value.start));
            }
            else {
                this.startValue = null;
                this.setValue();
            }
            if (this.value.end instanceof Date && !isNaN(+this.value.end)) {
                this.setProperties({ endDate: this.value.end }, true);
                this.endValue = this.value.end;
            }
            else if (typeof this.value.end === 'string') {
                this.setProperties({ endDate: new Date(this.checkValue(this.value.end)) }, true);
                this.endValue = new Date(this.checkValue(this.value.end));
                this.setValue();
            }
            else {
                this.setProperties({ endDate: null }, true);
                this.endValue = null;
                this.setValue();
            }
        }
        else if (isNullOrUndefined(this.value)) {
            this.endValue = this.checkDateValue(new Date(this.checkValue(this.endDate)));
            this.startValue = this.checkDateValue(new Date(this.checkValue(this.startDate)));
            this.setValue();
        }
    }
    initProperty() {
        this.globalize = new Internationalization(this.locale);
        this.checkFormat();
        this.checkView();
        if (isNullOrUndefined(this.firstDayOfWeek) || this.firstDayOfWeek > 6 || this.firstDayOfWeek < 0) {
            this.setProperties({ firstDayOfWeek: this.globalize.getFirstDayOfWeek() }, true);
        }
        this.updateValue();
    }
    checkFormat() {
        if (this.format) {
            if (typeof this.format === 'string') {
                this.formatString = this.format;
            }
            else if (this.format.skeleton !== '' && !isNullOrUndefined(this.format.skeleton)) {
                const skeletonString = this.format.skeleton;
                this.formatString = this.globalize.getDatePattern({ skeleton: skeletonString, type: 'date' });
            }
            else {
                this.formatString = null;
            }
        }
        else {
            this.formatString = null;
        }
    }
    initialize() {
        if (this.angularTag !== null) {
            this.validationAttribute(this.element, this.inputElement);
        }
        this.checkHtmlAttributes(false);
        merge(this.defaultKeyConfigs, { shiftTab: 'shift+tab', tab: 'tab' });
        const start = this.checkDateValue(new Date(this.checkValue(this.startValue)));
        this.setProperties({ startDate: start }, true); // persist the value propeerty.
        this.setProperties({ endValue: this.checkDateValue(new Date(this.checkValue(this.endValue))) }, true);
        this.setValue();
        this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(this.min))) }, true);
        this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(this.max))) }, true);
        this.l10n = new L10n('daterangepicker', this.defaultConstant, this.locale);
        this.l10n.setLocale(this.locale);
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        this.processPresets();
        this.createInput();
        this.updateHtmlAttributeToWrapper();
        this.setRangeAllowEdit();
        this.bindEvents();
    }
    setDataAttribute(isDynamic) {
        let attributes = {};
        if (!isDynamic) {
            for (let i = 0; i < this.element.attributes.length; i++) {
                attributes[this.element.attributes[i].name] =
                    this.element.getAttribute(this.element.attributes[i].name);
            }
        }
        else {
            attributes = this.htmlAttributes;
        }
        for (const pro of Object.keys(attributes)) {
            if (pro.indexOf('data') === 0) {
                this.firstHiddenChild.setAttribute(pro, attributes[`${pro}`]);
                this.secondHiddenChild.setAttribute(pro, attributes[`${pro}`]);
            }
        }
    }
    setRangeAllowEdit() {
        if (this.allowEdit) {
            if (!this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
        else {
            attributes(this.inputElement, { 'readonly': '' });
        }
        this.updateClearIconState();
    }
    updateClearIconState() {
        if (!this.allowEdit && this.inputWrapper && !this.readonly) {
            if (this.inputElement.value === '') {
                removeClass([this.inputWrapper.container], [NONEDITABLE]);
            }
            else {
                addClass([this.inputWrapper.container], [NONEDITABLE]);
            }
        }
        else if (this.inputWrapper) {
            removeClass([this.inputWrapper.container], [NONEDITABLE]);
        }
    }
    validationAttribute(element, input) {
        const name = element.getAttribute('name') ? element.getAttribute('name') : element.getAttribute('id');
        input.setAttribute('name', name);
        element.removeAttribute('name');
        const attributes = ['required', 'aria-required', 'form'];
        for (let i = 0; i < attributes.length; i++) {
            if (isNullOrUndefined(element.getAttribute(attributes[i]))) {
                continue;
            }
            const attr = element.getAttribute(attributes[i]);
            input.setAttribute(attributes[i], attr);
            element.removeAttribute(attributes[i]);
        }
    }
    updateHtmlAttributeToWrapper() {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (const key of Object.keys(this.htmlAttributes)) {
                if (wrapperAttr.indexOf(key) > -1) {
                    if (key === 'class') {
                        const updatedClassValue = (this.htmlAttributes[`${key}`].replace(/\s+/g, ' ')).trim();
                        if (updatedClassValue !== '') {
                            addClass([this.inputWrapper.container], updatedClassValue.split(' '));
                        }
                    }
                    else if (key === 'style') {
                        let dateRangeStyle = this.inputWrapper.container.getAttribute(key);
                        dateRangeStyle = !isNullOrUndefined(dateRangeStyle) ? (dateRangeStyle + this.htmlAttributes[`${key}`]) :
                            this.htmlAttributes[`${key}`];
                        this.inputWrapper.container.setAttribute(key, dateRangeStyle);
                    }
                    else {
                        this.inputWrapper.container.setAttribute(key, this.htmlAttributes[`${key}`]);
                    }
                }
            }
        }
    }
    updateHtmlAttributeToElement() {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (const key of Object.keys(this.htmlAttributes)) {
                if (wrapperAttr.indexOf(key) < 0) {
                    this.inputElement.setAttribute(key, this.htmlAttributes[`${key}`]);
                }
            }
        }
    }
    updateCssClass(cssNewClass, cssOldClass) {
        if (!isNullOrUndefined(cssOldClass)) {
            cssOldClass = (cssOldClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(cssNewClass)) {
            cssNewClass = (cssNewClass.replace(/\s+/g, ' ')).trim();
        }
        Input.setCssClass(cssNewClass, [this.inputWrapper.container], cssOldClass);
        if (this.popupWrapper) {
            Input.setCssClass(cssNewClass, [this.popupWrapper], cssOldClass);
        }
    }
    processPresets() {
        this.presetsItem = [];
        let i = 0;
        if (!isNullOrUndefined(this.presets[0]) && !isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
            for (const range of this.presets) {
                const id = range.label.replace(/\s+/g, '') + '_' + (++i);
                if (typeof range.end === 'string') {
                    this.presetsItem.push({
                        id: id, text: range.label, end: new Date(this.checkValue(range.end)), start: new Date(this.checkValue(range.start))
                    });
                }
                else {
                    this.presetsItem.push({ id: id, text: range.label, start: range.start, end: range.end });
                }
            }
            const startDate = isNullOrUndefined(this.startValue) ? null : new Date(+this.startValue);
            const endDate = isNullOrUndefined(this.endValue) ? null : new Date(+this.endValue);
            this.presetsItem.push({ id: 'custom_range', text: this.l10n.getConstant('customRange'), start: startDate, end: endDate });
            if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
                this.isCustomRange = true;
                this.activeIndex = this.presetsItem.length - 1;
            }
        }
    }
    bindEvents() {
        EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler, this);
        EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
        EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
        EventHandler.add(this.inputElement, 'change', this.inputChangeHandler, this);
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.resetHandler, this);
        }
        if (!this.isMobile) {
            this.keyInputConfigs = extend(this.keyInputConfigs, this.keyConfigs);
            this.inputKeyboardModule = new KeyboardEvents(this.inputElement, {
                eventName: 'keydown',
                keyAction: this.inputHandler.bind(this),
                keyConfigs: this.keyInputConfigs
            });
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
        if (this.enabled) {
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
        else {
            this.inputElement.tabIndex = -1;
        }
    }
    unBindEvents() {
        EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler);
        EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
        EventHandler.remove(this.inputElement, 'change', this.inputChangeHandler);
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.remove(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler);
        }
        if (!this.isMobile) {
            if (!isNullOrUndefined(this.inputKeyboardModule)) {
                this.inputKeyboardModule.destroy();
            }
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
        this.inputElement.tabIndex = -1;
    }
    updateHiddenInput() {
        if (this.firstHiddenChild && this.secondHiddenChild) {
            const format = { format: this.formatString, type: 'datetime', skeleton: 'yMd' };
            if (typeof this.startDate === 'string') {
                this.startDate = this.globalize.parseDate(this.getAmPmValue(this.startDate), format);
            }
            if (typeof this.endDate === 'string') {
                this.endDate = this.globalize.parseDate(this.getAmPmValue(this.endDate), format);
            }
            this.firstHiddenChild.value = (this.startDate && this.globalize.formatDate(this.startDate, format))
                || (this.inputElement.value);
            this.secondHiddenChild.value = (this.endDate && this.globalize.formatDate(this.endDate, format)) ||
                (this.inputElement.value);
            this.dispatchEvent(this.firstHiddenChild, 'focusout');
            this.dispatchEvent(this.firstHiddenChild, 'change');
        }
    }
    inputChangeHandler(e) {
        if (!this.enabled) {
            return;
        }
        e.stopPropagation();
        this.updateHiddenInput();
    }
    bindClearEvent() {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.resetHandler, this);
        }
    }
    resetHandler(e) {
        if (!this.enabled) {
            return;
        }
        this.valueType = this.value;
        e.preventDefault();
        this.clear();
        const clearedArgs = {
            event: e
        };
        this.setProperties({ endDate: this.checkDateValue(this.endValue) }, true);
        this.setProperties({ startDate: this.checkDateValue(this.startValue) }, true);
        this.trigger('cleared', clearedArgs);
        this.changeTrigger(e);
        this.clearRange();
        this.hide(e);
        if (closest(this.element, 'form')) {
            const element = this.firstHiddenChild;
            const keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    }
    restoreValue() {
        this.previousEleValue = this.inputElement.value;
        this.previousStartValue = this.startValue;
        this.previousEndValue = this.endValue;
        this.valueType = null;
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
        this.setValue();
        this.setModelValue();
    }
    formResetHandler(e) {
        if (!this.enabled) {
            return;
        }
        if (this.formElement && (e.target === this.formElement) && !this.inputElement.disabled) {
            let val = this.inputElement.getAttribute('value');
            if (!isNullOrUndefined(this.startCopy)) {
                if (!isNullOrUndefined(this.value) && !isNullOrUndefined(this.value.start)) {
                    this.setProperties({ value: { start: this.startCopy, end: this.endCopy } }, true);
                    this.startValue = this.value.start;
                    this.endValue = this.value.end;
                }
                else {
                    this.setProperties({ value: [this.startCopy, this.endCopy] }, true);
                    this.startValue = this.value[0];
                    this.endValue = this.value[1];
                }
                this.setProperties({ startDate: this.startValue, endDate: this.endValue }, true);
            }
            else {
                this.setProperties({ value: null, startDate: null, endDate: null }, true);
                this.startValue = this.endValue = null;
            }
            if (this.element.tagName === 'EJS-DATERANGEPICKER') {
                this.setProperties({ value: null, startDate: null, endDate: null }, true);
                val = '';
                this.startValue = this.endValue = null;
                this.inputElement.setAttribute('value', '');
            }
            this.restoreValue();
            if (this.inputElement) {
                Input.setValue(val, this.inputElement, this.floatLabelType, this.showClearButton);
                this.errorClass();
            }
        }
    }
    clear() {
        if (this.startValue !== null) {
            this.startValue = null;
        }
        if (this.endValue !== null) {
            this.endValue = null;
        }
        if (this.value && this.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        if (this.value !== null && this.value.length > 0) {
            this.setProperties({ value: null }, true);
        }
        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        if (!(isNullOrUndefined(this.applyButton))) {
            this.applyButton.disabled = this.applyButton.element.disabled = true;
        }
        this.removeSelection();
    }
    rangeIconHandler(e) {
        if (!this.enabled) {
            return;
        }
        if (this.isMobile) {
            this.inputElement.setAttribute('readonly', '');
        }
        e.preventDefault();
        this.targetElement = null;
        if (this.isPopupOpen() && document.body.contains(this.popupObj.element)) {
            this.applyFunction(e);
        }
        else {
            this.isRangeIconClicked = true;
            this.inputWrapper.container.children[0].focus();
            this.show(null, e);
            if (!this.isMobile) {
                if (!isNullOrUndefined(this.leftCalendar)) {
                    this.isRangeIconClicked = false;
                    this.calendarFocus();
                    this.isRangeIconClicked = true;
                }
            }
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
        }
    }
    checkHtmlAttributes(isDynamic) {
        this.globalize = new Internationalization(this.locale);
        const attributes = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['startDate', 'endDate', 'minDays', 'maxDays', 'min', 'max', 'disabled', 'readonly', 'style', 'name', 'placeholder',
                'type', 'value'];
        const format = { format: this.formatString, type: 'date', skeleton: 'yMd' };
        for (const prop of attributes) {
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['enabled'] === undefined)) || isDynamic) {
                            const disabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' || this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ enabled: !disabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['readonly'] === undefined)) || isDynamic) {
                            const readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                                this.inputElement.getAttribute(prop) === 'true' || this.inputElement.getAttribute(prop) === '' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.dateRangeOptions) || (this.dateRangeOptions['value'] === undefined)) || isDynamic) {
                            const value = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, value, {}), !isDynamic);
                        }
                        break;
                    case 'style':
                        this.inputElement.setAttribute('style', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'min':
                        if ((isNullOrUndefined(this.min) || +this.min === +new Date(1900, 0, 1)) || isDynamic) {
                            const dateValue = this.globalize.parseDate(this.getAmPmValue(this.inputElement.getAttribute(prop)), format);
                            this.setProperties(setValue(prop, dateValue, {}), !isDynamic);
                        }
                        break;
                    case 'name':
                        this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'max':
                        if ((isNullOrUndefined(this.max) || +this.max === +new Date(2099, 11, 31)) || isDynamic) {
                            const dateValue = this.globalize.parseDate(this.getAmPmValue(this.inputElement.getAttribute(prop)), format);
                            this.setProperties(setValue(prop, dateValue, {}), !isDynamic);
                        }
                        break;
                    case 'startDate':
                        if (isNullOrUndefined(this.startDate)) {
                            const dateValue = this.globalize.parseDate(this.getAmPmValue(this.inputElement.getAttribute(prop)), format);
                            this.startValue = dateValue;
                            this.setValue();
                        }
                        break;
                    case 'endDate':
                        if (isNullOrUndefined(this.endDate)) {
                            const dateValue = this.globalize.parseDate(this.getAmPmValue(this.inputElement.getAttribute(prop)), format);
                            this.endValue = dateValue;
                            this.setValue();
                        }
                        break;
                    case 'minDays':
                        if (isNullOrUndefined(this.minDays)) {
                            this.setProperties(setValue(prop, parseInt(this.inputElement.getAttribute(prop), 10), {}), true);
                        }
                        break;
                    case 'maxDays':
                        if (isNullOrUndefined(this.maxDays)) {
                            this.setProperties(setValue(prop, parseInt(this.inputElement.getAttribute(prop), 10), {}), true);
                        }
                        break;
                    case 'type':
                        if (this.inputElement.getAttribute(prop) !== 'text') {
                            this.inputElement.setAttribute('type', 'text');
                        }
                        break;
                }
            }
        }
    }
    createPopup() {
        for (let i = 0; i < this.presetsItem.length; i++) {
            if ((i !== (this.presetsItem.length - 1)) && this.presetsItem[i].id === 'custom_range') {
                this.presetsItem.splice(i, 1);
            }
        }
        this.activeIndex = this.presetsItem.length - 1;
        this.isCustomRange = true;
        for (let i = 0; i <= this.presetsItem.length - 2; i++) {
            const startDate = this.presetsItem[i].start;
            const endDate = this.presetsItem[i].end;
            if (this.startValue && this.endValue) {
                if (startDate.getDate() === this.startValue.getDate() && startDate.getMonth() === this.startValue.getMonth() &&
                    startDate.getFullYear() === this.startValue.getFullYear() && endDate.getDate() === this.endValue.getDate() &&
                    endDate.getMonth() === this.endValue.getMonth() && endDate.getFullYear() === this.endValue.getFullYear()) {
                    this.activeIndex = i;
                    this.isCustomRange = false;
                }
            }
        }
        this.popupWrapper = createElement('div', { id: this.element.id + '_popup', className: ROOT$2 + ' ' + POPUP$1 });
        this.popupWrapper.setAttribute('aria-label', this.element.id);
        this.popupWrapper.setAttribute('role', 'dialog');
        this.adjustLongHeaderWidth();
        const isPreset = (!this.isCustomRange || this.isMobile);
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && isPreset) {
            this.isCustomWindow = false;
            this.createPresets();
            this.listRippleEffect();
            this.renderPopup();
        }
        else {
            this.isCustomWindow = true;
            this.renderControl();
        }
    }
    renderControl() {
        this.createControl();
        this.bindCalendarEvents();
        this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) &&
            !isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
            this.disabledDateRender();
        }
        this.updateHeader();
    }
    clearCalendarEvents() {
        if (this.leftCalPrevIcon && this.leftCalNextIcon && this.rightCalPrevIcon && this.rightCalNextIcon) {
            EventHandler.clearEvents(this.leftCalPrevIcon);
            EventHandler.clearEvents(this.leftCalNextIcon);
            EventHandler.clearEvents(this.rightCalPrevIcon);
            EventHandler.clearEvents(this.rightCalNextIcon);
        }
    }
    updateNavIcons() {
        super.iconHandler();
    }
    calendarIconEvent() {
        this.clearCalendarEvents();
        if (this.leftCalPrevIcon && !this.leftCalPrevIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.leftCalPrevIcon, 'mousedown', this.navPrevFunction);
        }
        if (this.leftCalNextIcon && !this.leftCalNextIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.leftCalNextIcon, 'mousedown', this.navNextFunction);
        }
        if (this.rightCalPrevIcon && !this.rightCalPrevIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.rightCalPrevIcon, 'mousedown', this.navPrevFunction);
        }
        if (this.rightCalNextIcon && !this.rightCalNextIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.rightCalNextIcon, 'mousedown', this.navNextFunction);
        }
    }
    bindCalendarEvents() {
        if (!this.isMobile) {
            this.updateNavIcons();
            this.calendarIconEvent();
            this.calendarIconRipple();
            this.headerTitleElement = this.popupObj.element.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1 + ' .' + TITLE$1);
            this.headerTitleElement = this.popupObj.element.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1 + ' .' + TITLE$1);
            this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
            this.leftKeyboardModule = new KeyboardEvents(this.leftCalendar, {
                eventName: 'keydown',
                keyAction: this.keyInputHandler.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
            this.rightKeyboardModule = new KeyboardEvents(this.rightCalendar, {
                eventName: 'keydown',
                keyAction: this.keyInputHandler.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        else {
            this.deviceCalendarEvent();
            EventHandler.add(this.startButton.element, 'click', this.deviceHeaderClick, this);
            EventHandler.add(this.endButton.element, 'click', this.deviceHeaderClick, this);
        }
        if (this.start === this.depth) {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
    }
    calendarIconRipple() {
        rippleEffect(this.leftCalPrevIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.leftCalNextIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
        rippleEffect(this.rightCalPrevIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.rightCalNextIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
    }
    deviceCalendarEvent() {
        EventHandler.clearEvents(this.nextIcon);
        EventHandler.clearEvents(this.previousIcon);
        rippleEffect(this.nextIcon, { selector: '.e-prev', duration: 400, isCenterRipple: true });
        rippleEffect(this.previousIcon, { selector: '.e-next', duration: 400, isCenterRipple: true });
        if (this.nextIcon && !this.nextIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.nextIcon, 'mousedown', this.deviceNavNextFunction);
        }
        if (this.previousIcon && !this.previousIcon.classList.contains(DISABLED$2)) {
            EventHandler.add(this.previousIcon, 'mousedown', this.deviceNavPrevFunction);
        }
    }
    deviceNavNext(e) {
        const calendar = closest(e.target, '.' + CALENDAR);
        this.updateDeviceCalendar(calendar);
        this.navigateNext(e);
        this.deviceNavigation();
    }
    deviceNavPrevious(e) {
        const calendar = closest(e.target, '.' + CALENDAR);
        this.updateDeviceCalendar(calendar);
        this.navigatePrevious(e);
        this.deviceNavigation();
    }
    updateDeviceCalendar(calendar) {
        if (calendar) {
            this.previousIcon = calendar.querySelector('.' + PREVICON$1);
            this.nextIcon = calendar.querySelector('.' + NEXTICON$1);
            this.calendarElement = calendar;
            this.deviceCalendar = calendar;
            this.contentElement = calendar.querySelector('.' + CONTENT$1);
            this.tableBodyElement = select('.' + CONTENT$1 + ' tbody', calendar);
            this.table = calendar.querySelector('.' + CONTENT$1).getElementsByTagName('table')[0];
            this.headerTitleElement = calendar.querySelector('.' + HEADER$1 + ' .' + TITLE$1);
            this.headerElement = calendar.querySelector('.' + HEADER$1);
        }
    }
    deviceHeaderClick(event) {
        const element = event.currentTarget;
        if (element.classList.contains(STARTBUTTON) && !isNullOrUndefined(this.startValue)) {
            this.endButton.element.classList.remove(ACTIVE$1);
            this.startButton.element.classList.add(ACTIVE$1);
            const calendar = this.popupObj.element.querySelector('.' + CALENDAR);
            this.updateDeviceCalendar(calendar);
            if (isNullOrUndefined(this.calendarElement.querySelector('.' + STARTDATE + ':not(.e-other-month)'))) {
                this.currentDate = new Date(+this.startValue);
                remove(this.tableBodyElement);
                this.createContentBody();
                this.deviceNavigation();
            }
            this.removeClassDisabled();
        }
        else if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            this.startButton.element.classList.remove(ACTIVE$1);
            this.endButton.element.classList.add(ACTIVE$1);
            const calendar = this.popupObj.element.querySelector('.' + CALENDAR);
            this.updateDeviceCalendar(calendar);
            if (isNullOrUndefined(this.calendarElement.querySelector('.' + ENDDATE + ':not(.e-other-month)'))) {
                this.currentDate = new Date(+this.endValue);
                remove(this.tableBodyElement);
                this.createContentBody();
                this.deviceNavigation();
            }
            this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
            this.selectableDates();
        }
    }
    inputFocusHandler() {
        if (!this.enabled) {
            return;
        }
        this.preventBlur = false;
        const focusArguments = {
            model: this
        };
        if (!this.preventFocus) {
            this.trigger('focus', focusArguments);
        }
        this.updateClearIconState();
        if (this.openOnFocus && !this.preventFocus) {
            this.preventFocus = true;
            this.show();
        }
        else {
            this.preventFocus = true;
        }
    }
    inputBlurHandler(e) {
        if (!this.enabled) {
            return;
        }
        if (!this.preventBlur) {
            const value = this.inputElement.value;
            if (!isNullOrUndefined(this.presetsItem)) {
                if (this.presetsItem.length > 0 && this.previousEleValue !== this.inputElement.value) {
                    this.activeIndex = this.presetsItem.length - 1;
                    this.isCustomRange = true;
                }
            }
            if (!isNullOrUndefined(value) && value.trim() !== '') {
                const range = value.split(' ' + this.separator + ' ');
                if (range.length > 1) {
                    this.invalidValueString = null;
                    const dateOptions = { format: this.formatString, type: 'date', skeleton: 'yMd' };
                    const startDate = this.globalize.parseDate(this.getAmPmValue(range[0]).trim(), dateOptions);
                    let endDate = this.globalize.parseDate(this.getAmPmValue(range[1]).trim(), dateOptions);
                    if (this.start !== 'Decade' && this.start === 'Year' && this.depth !== 'Month') {
                        if (this.inputElement.defaultValue !== value) {
                            endDate = this.getStartEndDate(endDate, true);
                        }
                    }
                    if (!isNullOrUndefined(startDate) && !isNaN(+startDate) && !isNullOrUndefined(endDate) && !isNaN(+endDate)) {
                        const prevStartVal = this.startValue;
                        this.startValue = startDate;
                        const prevEndVal = this.endValue;
                        this.endValue = endDate;
                        this.setValue();
                        this.refreshControl();
                        if (value !== this.previousEleValue) {
                            this.changeTrigger(e);
                        }
                        if (!this.preventBlur && document.activeElement !== this.inputElement) {
                            this.preventFocus = false;
                            const blurArguments = {
                                model: this
                            };
                            this.trigger('blur', blurArguments);
                        }
                        this.updateHiddenInput();
                        // For Mobile mode, when a value is present and choose another range and click on console
                        // when popup is open, two startvalues and end values are updated in the popup.
                        if (this.isMobile && this.isPopupOpen()) {
                            this.startValue = prevStartVal;
                            this.endValue = prevEndVal;
                        }
                        return;
                    }
                    else {
                        if (!this.strictMode) {
                            this.startValue = null;
                            this.endValue = null;
                            this.setValue();
                        }
                    }
                }
                else {
                    if (!this.strictMode) {
                        this.startValue = null;
                        this.endValue = null;
                        this.setValue();
                    }
                }
            }
            if (!this.strictMode) {
                if (isNullOrUndefined(this.popupObj)) {
                    this.currentDate = null;
                }
                this.previousStartValue = this.previousEndValue = null;
                this.startValue = null;
                this.endValue = null;
                this.setValue();
            }
            else {
                if (!isNullOrUndefined(value) && value.trim() === '') {
                    this.startValue = null;
                    this.endValue = null;
                }
                Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
                this.updateInput();
            }
            this.errorClass();
            this.changeTrigger(e);
            if (!this.preventBlur && document.activeElement !== this.inputElement) {
                this.preventFocus = false;
                const blurArguments = {
                    model: this
                };
                this.trigger('blur', blurArguments);
            }
        }
        this.updateHiddenInput();
    }
    getStartEndDate(date, isEnd) {
        if ((this.currentView() === 'Year' && !isNullOrUndefined(date)) || this.depth === 'Year') {
            return new Date(date.getFullYear(), date.getMonth() + (isEnd ? 1 : 0), isEnd ? 0 : 1);
        }
        else if (this.currentView() === 'Decade' && !isNullOrUndefined(date)) {
            return new Date(date.getFullYear(), isEnd ? 11 : 0, isEnd ? 31 : 1);
        }
        else {
            return null;
        }
    }
    clearRange() {
        this.previousStartValue = this.previousEndValue = null;
        this.currentDate = null;
    }
    errorClass() {
        const inputStr = !isNullOrUndefined(this.inputElement.value) ? this.inputElement.value.trim() : null;
        if (((isNullOrUndefined(this.endValue) && isNullOrUndefined(this.startValue) && inputStr !== '') ||
            ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
                || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)
                || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max))
            || ((this.startValue && this.isDateDisabled(this.startValue))
                || (this.endValue && this.isDateDisabled(this.endValue)))) && inputStr !== '') {
            addClass([this.inputWrapper.container], ERROR$1);
            attributes(this.inputElement, { 'aria-invalid': 'true' });
        }
        else {
            if (this.inputWrapper) {
                removeClass([this.inputWrapper.container], ERROR$1);
                attributes(this.inputElement, { 'aria-invalid': 'false' });
            }
        }
    }
    keyCalendarUpdate(isLeftCalendar, ele, isRemoveFocus = true) {
        if (isRemoveFocus) {
            this.removeFocusedDate();
        }
        if (isLeftCalendar) {
            this.leftCalCurrentDate = new Date(+this.currentDate);
            ele = this.leftCalendar;
        }
        else {
            this.rightCalCurrentDate = new Date(+this.currentDate);
            ele = this.rightCalendar;
        }
        this.updateCalendarElement(ele);
        this.table.focus();
        return ele;
    }
    navInCalendar(e, isLeftCalendar, leftLimit, rightLimit, ele) {
        let view = this.getViewNumber(this.currentView());
        let date;
        const min = this.min;
        let max;
        if (!isNullOrUndefined(this.maxDays) && this.isMaxDaysClicked && !isNullOrUndefined(this.startValue)) {
            max = new Date(new Date(+this.startValue).setDate(this.startValue.getDate() + (this.maxDays - 1)));
        }
        else {
            max = this.max;
        }
        switch (e.action) {
            case 'moveRight':
                date = new Date(+this.currentDate);
                this.addDay(date, 1, e, max, min);
                if (isLeftCalendar && +date === +rightLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.keyboardNavigate(1, view, e, max, min);
                this.keyNavigation(ele, e);
                break;
            case 'moveLeft':
                date = new Date(+this.currentDate);
                this.addDay(date, -1, e, max, min);
                if (!isLeftCalendar) {
                    if (+date === +leftLimit) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                }
                this.keyboardNavigate(-1, view, e, max, min);
                this.keyNavigation(ele, e);
                break;
            case 'moveUp':
                if (view === 0) {
                    date = new Date(+this.currentDate);
                    this.addDay(date, -7, e, max, min);
                    if (+date <= +leftLimit && !isLeftCalendar) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                    this.keyboardNavigate(-7, view, e, max, min);
                }
                else {
                    this.keyboardNavigate(-4, view, e, this.max, this.min); // move the current year to the previous four days.
                }
                this.keyNavigation(ele, e);
                break;
            case 'moveDown':
                if (view === 0) {
                    date = new Date(+this.currentDate);
                    this.addDay(date, 7, e, max, min);
                    if (isLeftCalendar && +date >= +rightLimit) {
                        ele = this.keyCalendarUpdate(false, ele);
                    }
                    this.keyboardNavigate(7, view, e, max, min);
                }
                else {
                    this.keyboardNavigate(4, view, e, this.max, this.min);
                }
                this.keyNavigation(ele, e);
                break;
            case 'home':
                this.currentDate = this.firstDay(this.currentDate);
                remove(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                this.keyNavigation(ele, e);
                break;
            case 'end':
                this.currentDate = this.lastDay(this.currentDate, view);
                remove(this.tableBodyElement);
                if (view === 0) {
                    this.renderMonths(e);
                }
                else if (view === 1) {
                    this.renderYears(e);
                }
                else {
                    this.renderDecades(e);
                }
                this.keyNavigation(ele, e);
                break;
            case 'tab':
                if (this.tabKeyValidation(ele, LEFTCALENDER)) {
                    ele = this.keyCalendarUpdate(false, ele, false);
                    this.currentDate = this.firstCellToFocus(this.rightCalendar);
                    view = this.getViewNumber(this.currentView());
                    this.keyboardNavigate(0, view, e, max, min);
                    this.keyNavigation(ele, e);
                }
                break;
            case 'shiftTab':
                if (this.tabKeyValidation(ele, RIGHTCALENDER)) {
                    ele = this.keyCalendarUpdate(true, ele, false);
                    this.currentDate = this.firstCellToFocus(this.leftCalendar);
                    this.keyboardNavigate(0, view, e, max, min);
                    this.keyNavigation(ele, e);
                }
                break;
        }
    }
    firstCellToFocus(calendar) {
        const focusAbleEle = this.getViewNumber(this.currentView()) === 2 ? calendar.children[1].firstElementChild.querySelector('td.e-cell:not(.e-week-number):not(.e-disabled):not(.e-other-year)') : calendar.children[1].firstElementChild.querySelector('td.e-cell:not(.e-week-number):not(.e-disabled):not(.e-other-month)');
        const focusEleID = focusAbleEle && focusAbleEle.id ? focusAbleEle.id.split('_')[0] : null;
        const currentFirstDay = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
        const focusDate = focusEleID ? new Date(+focusEleID) : currentFirstDay;
        return focusDate;
    }
    keyInputHandler(e, value) {
        let date;
        let view = this.getViewNumber(this.currentView());
        const rightDateLimit = new Date(this.rightCalCurrentDate.getFullYear(), this.rightCalCurrentDate.getMonth(), 1);
        const leftDateLimit = new Date(this.leftCalCurrentDate.getFullYear(), this.leftCalCurrentDate.getMonth() + 1, 0);
        let ele = closest(e.target, '.' + RIGHTCALENDER);
        ele = isNullOrUndefined(ele) ? this.leftCalendar : ele;
        const isLeftCalendar = ele.classList.contains(LEFTCALENDER);
        this.updateCalendarElement(ele);
        const selectedDate = this.tableBodyElement.querySelector('tr td.e-selected');
        const focusedDate = ele.querySelector('tr td.' + FOCUSDATE);
        const startDate = ele.querySelector('tr td.' + STARTDATE);
        const endDate = ele.querySelector('tr td.' + ENDDATE);
        const depthValue = this.getViewNumber(this.depth);
        const levelRestrict = (view === depthValue && this.getViewNumber(this.start) >= depthValue);
        const leftCalendar = closest(e.target, '.' + LEFTCALENDER);
        const rightCalendar = closest(e.target, '.' + RIGHTCALENDER);
        const presetElement = closest(e.target, '.' + PRESETS);
        if (!isNullOrUndefined(focusedDate)) {
            // eslint-disable-next-line no-self-assign
            this.currentDate = this.currentDate;
        }
        else if (!isNullOrUndefined(endDate) && !this.dateDisabled) {
            this.currentDate = new Date(+this.endValue);
        }
        else if (!isNullOrUndefined(startDate) && !this.dateDisabled) {
            this.currentDate = new Date(+this.startValue);
        }
        else if (!this.dateDisabled) {
            this.currentDate.setDate(1);
        }
        this.effect = '';
        switch (e.action) {
            case 'altUpArrow':
                if (this.isPopupOpen()) {
                    this.hide(e);
                    this.preventFocus = true;
                    this.inputElement.focus();
                    addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
                }
                break;
            case 'select':
                if (levelRestrict) {
                    const element = !isNullOrUndefined(focusedDate) ? focusedDate : startDate;
                    if (!isNullOrUndefined(element) && !element.classList.contains(DISABLED$2)) {
                        this.selectRange(null, (element));
                    }
                }
                else {
                    if (!isNullOrUndefined(selectedDate) && !levelRestrict || !isNullOrUndefined(focusedDate)) {
                        if (!isNullOrUndefined(this.value)) {
                            if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                                value = this.startDate;
                            }
                            else {
                                value = this.endDate;
                            }
                        }
                        this.controlDown = e;
                        this.contentClick(null, --view, (focusedDate || selectedDate), value);
                    }
                }
                e.preventDefault();
                break;
            case 'controlHome':
                {
                    const yearDate = new Date(this.currentDate.getFullYear(), 0, 1);
                    if (!isLeftCalendar && +yearDate < +leftDateLimit) {
                        ele = this.keyCalendarUpdate(true, ele);
                    }
                    super.navigateTo.call(this, 'Month', new Date(this.currentDate.getFullYear(), 0, 1));
                    this.keyNavigation(ele, e);
                }
                break;
            case 'altRightArrow':
                if (!isNullOrUndefined(leftCalendar)) {
                    this.rightCalendar.children[1].firstElementChild.focus();
                }
                else if (!isNullOrUndefined(rightCalendar)) {
                    if (!isNullOrUndefined(this.presetElement)) {
                        this.presetElement.focus();
                        this.removeFocusedDate();
                    }
                    else {
                        this.cancelButton.element.focus();
                    }
                }
                else {
                    if (!isNullOrUndefined(presetElement)) {
                        this.cancelButton.element.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'altLeftArrow':
                if (!isNullOrUndefined(leftCalendar)) {
                    if (this.applyButton.element.disabled !== true) {
                        this.applyButton.element.focus();
                    }
                    else {
                        this.cancelButton.element.focus();
                    }
                }
                else {
                    if (!isNullOrUndefined(rightCalendar)) {
                        this.leftCalendar.children[1].firstElementChild.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'controlUp':
                if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                    this.calendarNavigation(e, this.calendarElement);
                }
                else {
                    this.calendarNavigation(e, this.calendarElement);
                }
                e.preventDefault();
                break;
            case 'controlDown':
                if ((!isNullOrUndefined(selectedDate) || !isNullOrUndefined(focusedDate)) && !levelRestrict) {
                    if (!isNullOrUndefined(this.value)) {
                        if (this.calendarElement.classList.contains(LEFTCALENDER)) {
                            value = this.startDate;
                        }
                        else {
                            value = this.endDate;
                        }
                    }
                    this.controlDown = e;
                    this.contentClick(null, --view, (selectedDate || focusedDate), value);
                }
                e.preventDefault();
                break;
            case 'controlEnd':
                {
                    const yearDate = new Date(this.currentDate.getFullYear(), 11, 31);
                    if (isLeftCalendar && +yearDate > +rightDateLimit) {
                        ele = this.keyCalendarUpdate(false, ele);
                    }
                    super.navigateTo.call(this, 'Month', new Date(this.currentDate.getFullYear(), 11, 31));
                    this.keyNavigation(ele, e);
                }
                break;
            case 'pageUp':
                date = new Date(+this.currentDate);
                this.addMonths(date, -1);
                if (!isLeftCalendar && +date <= +leftDateLimit) {
                    ele = this.keyCalendarUpdate(true, ele);
                }
                this.addMonths(this.currentDate, -1);
                super.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'pageDown':
                date = new Date(+this.currentDate);
                this.addMonths(date, 1);
                if (isLeftCalendar && +date >= +rightDateLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.addMonths(this.currentDate, 1);
                super.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftPageUp':
                date = new Date(+this.currentDate);
                this.addYears(date, -1);
                if (!isLeftCalendar && +date <= +leftDateLimit) {
                    ele = this.keyCalendarUpdate(true, ele);
                }
                this.addYears(this.currentDate, -1);
                super.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftPageDown':
                date = new Date(+this.currentDate);
                this.addYears(date, 1);
                if (isLeftCalendar && +date >= +rightDateLimit) {
                    ele = this.keyCalendarUpdate(false, ele);
                }
                this.addYears(this.currentDate, 1);
                super.navigateTo.call(this, 'Month', this.currentDate);
                this.keyNavigation(ele, e);
                break;
            case 'shiftTab':
                if (!isNullOrUndefined(this.presetElement)) {
                    this.presetElement.setAttribute('tabindex', '0');
                    this.presetElement.focus();
                    this.removeFocusedDate();
                }
                if (isLeftCalendar) {
                    e.preventDefault();
                }
                if (this.tabKeyValidation(ele, RIGHTCALENDER)) {
                    this.currentDate = new Date(+this.leftCalCurrentDate);
                    this.navInCalendar(e, isLeftCalendar, leftDateLimit, rightDateLimit, ele);
                }
                break;
            case 'spacebar':
                if (this.applyButton && !this.applyButton.disabled) {
                    this.applyFunction(e);
                }
                break;
            case 'tab':
                if (this.tabKeyValidation(ele, LEFTCALENDER)) {
                    this.currentDate = new Date(+this.rightCalCurrentDate);
                    this.navInCalendar(e, isLeftCalendar, leftDateLimit, rightDateLimit, ele);
                }
                break;
            default:
                this.navInCalendar(e, isLeftCalendar, leftDateLimit, rightDateLimit, ele);
                this.checkMinMaxDays();
        }
        this.presetHeight();
    }
    tabKeyValidation(ele, calendarPos) {
        const isLeftCalendar = ele.classList.contains(calendarPos);
        const rightHeader = this.rightCalendar.querySelector('.e-header');
        const leftHeader = this.leftCalendar.querySelector('.e-header');
        const isRightMonth = rightHeader ? rightHeader.classList.contains('e-month') : false;
        const isLeftMonth = leftHeader ? leftHeader.classList.contains('e-month') : false;
        const isRightYear = rightHeader ? rightHeader.classList.contains('e-year') : false;
        const isLeftYear = leftHeader ? leftHeader.classList.contains('e-year') : false;
        const isRightDecade = rightHeader ? rightHeader.classList.contains('e-decade') : false;
        const isLeftDecade = leftHeader ? leftHeader.classList.contains('e-decade') : false;
        return isLeftCalendar && (isLeftMonth || isLeftYear || isLeftDecade) &&
            (isRightMonth || isRightYear || isRightDecade) && !this.isMobile;
    }
    keyNavigation(calendar, e) {
        this.bindCalendarCellEvents(calendar);
        if (calendar.classList.contains(LEFTCALENDER)) {
            this.leftCalCurrentDate = new Date(+this.currentDate);
        }
        else {
            this.rightCalCurrentDate = new Date(+this.currentDate);
        }
        this.updateNavIcons();
        this.calendarIconEvent();
        this.updateRange([calendar]);
        this.dateDisabled = this.isDateDisabled(this.currentDate);
        e.preventDefault();
    }
    inputHandler(e) {
        switch (e.action) {
            case 'altDownArrow':
                if (!this.isPopupOpen()) {
                    if (this.inputElement.value === '') {
                        this.clear();
                        this.changeTrigger(e);
                        this.clearRange();
                    }
                    this.show(null, e);
                    this.isRangeIconClicked = false;
                    if (!this.isMobile) {
                        if (!isNullOrUndefined(this.leftCalendar)) {
                            this.calendarFocus();
                        }
                    }
                    this.isKeyPopup = true;
                }
                break;
            case 'escape':
                if (this.isPopupOpen()) {
                    this.hide(e);
                }
                break;
            case 'enter':
                if (document.activeElement === this.inputElement) {
                    this.inputBlurHandler(e);
                    this.hide(e);
                }
                break;
            case 'tab':
                if (document.activeElement === this.inputElement && this.isPopupOpen()) {
                    this.hide(e);
                    e.preventDefault();
                }
                break;
        }
    }
    bindCalendarCellEvents(calendar) {
        let tdCells;
        if (calendar) {
            tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
        }
        else {
            tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td');
        }
        for (const cell of tdCells) {
            EventHandler.clearEvents(cell);
            const disabledCell = cell.classList.contains(DISABLED$2) || cell.classList.contains(DATEDISABLED);
            if (!disabledCell && !cell.classList.contains(WEEKNUMBER$2)) {
                if (!this.isMobile) {
                    EventHandler.add(cell, 'mouseover', this.hoverSelection, this);
                }
                EventHandler.add(cell, 'mousedown', this.selectRange, this);
            }
        }
    }
    removeFocusedDate() {
        const isDate = !isNullOrUndefined(this.startValue) || !isNullOrUndefined(this.endValue);
        const focusedDate = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' .' + FOCUSDATE);
        for (const ele of focusedDate) {
            const today = new Date();
            const eleDate = this.getIdValue(null, ele);
            if ((this.depth === 'Month' && this.currentView() === 'Month' &&
                (!ele.classList.contains(TODAY$2) || (ele.classList.contains(TODAY$2) && isDate)))
                || (this.depth === 'Year' && this.currentView() === 'Year' &&
                    ((!this.isSameMonth(today, eleDate) && !this.isSameYear(today, eleDate)) || isDate))
                || (this.depth === 'Decade' && this.currentView() === 'Decade' &&
                    (!this.isSameYear(today, eleDate) || isDate))) {
                ele.classList.remove(FOCUSDATE);
                if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(ENDDATE)) {
                    ele.removeAttribute('aria-label');
                }
            }
        }
    }
    hoverSelection(event, element) {
        const currentElement = element || event.currentTarget;
        const currentDate = this.getIdValue(null, currentElement);
        if (!isNullOrUndefined(this.startValue) && +this.startValue >= +this.min && +this.startValue <= +this.max) {
            if ((!this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)
                && isNullOrUndefined(this.endValue) && isNullOrUndefined(this.startValue))
                || (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue))) {
                const tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td');
                for (const ele of tdCells) {
                    const isDisabledCell = (!ele.classList.contains(DISABLED$2) || ele.classList.contains(DATEDISABLED));
                    if (!ele.classList.contains(WEEKNUMBER$2) && isDisabledCell) {
                        const eleDate = this.getIdValue(null, ele);
                        const startDateValue = this.currentView() === 'Month' ? new Date(+this.startValue) : this.getStartEndDate(new Date(+this.startValue), false);
                        const eleDateValue = new Date(+eleDate);
                        if (eleDateValue.setHours(0, 0, 0, 0) >= startDateValue.setHours(0, 0, 0, 0) && +eleDate <= +currentDate) {
                            addClass([ele], RANGEHOVER);
                        }
                        else {
                            removeClass([ele], [RANGEHOVER]);
                        }
                    }
                }
            }
        }
    }
    isSameStartEnd(startVal, endVal) {
        let isSame = false;
        if (this.depth === 'Month') {
            if ((startVal).setHours(0, 0, 0, 0) === (endVal).setHours(0, 0, 0, 0)) {
                isSame = true;
            }
        }
        else if (this.depth === 'Year') {
            if ((startVal.getFullYear() === endVal.getFullYear()) &&
                (startVal.getMonth() === endVal.getMonth())) {
                isSame = true;
            }
        }
        else if (this.depth === 'Decade') {
            if (startVal.getFullYear() === endVal.getFullYear()) {
                isSame = true;
            }
        }
        return isSame;
    }
    updateRange(elementCollection) {
        if (!isNullOrUndefined(this.startValue)) {
            for (const calendar of elementCollection) {
                const tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
                for (const ele of tdCells) {
                    if (!ele.classList.contains(WEEKNUMBER$2) && !ele.classList.contains(DISABLED$2)) {
                        const eleDate = this.getIdValue(null, ele);
                        const eleDateValue = this.getIdValue(null, ele);
                        if (!isNullOrUndefined(this.endValue)) {
                            const eleStartDateValue = this.currentView() === 'Month' ? new Date(+this.startValue) : this.getStartEndDate(new Date(+this.startValue), false);
                            const eleEndDateValue = this.currentView() === 'Month' ? new Date(+this.endValue) : this.getStartEndDate(new Date(+this.endValue), true);
                            if (this.currentView() === this.depth &&
                                +eleDateValue.setHours(0, 0, 0, 0) >= +eleStartDateValue.setHours(0, 0, 0, 0)
                                && +eleDateValue.setHours(0, 0, 0, 0) <= +eleEndDateValue.setHours(0, 0, 0, 0) &&
                                !this.isSameStartEnd(new Date(+this.startValue), new Date(+this.endValue)) &&
                                +new Date(+this.startValue).setHours(0, 0, 0, 0) >= +this.min
                                && +new Date(+this.endValue).setHours(0, 0, 0, 0) <= +this.max
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], RANGEHOVER);
                            }
                        }
                        else {
                            removeClass([ele], [RANGEHOVER]);
                        }
                        if (ele.classList.contains(SELECTED$3) && ele.classList.contains(ENDDATE) &&
                            (+eleDateValue !== +this.endValue)) {
                            removeClass([ele], [SELECTED$3]);
                            removeClass([ele], [ENDDATE]);
                        }
                        if (ele.classList.contains(RANGEHOVER) && (+eleDateValue > +this.endValue)) {
                            removeClass([ele], [RANGEHOVER]);
                        }
                        if (!ele.classList.contains(OTHERMONTH$2)) {
                            const startDateValue = this.currentView() === 'Month' ? new Date(+this.startValue) : this.getStartEndDate(new Date(+this.startValue), false);
                            let eleDateValue = new Date(+eleDate);
                            if (this.currentView() === this.depth &&
                                +eleDateValue.setHours(0, 0, 0, 0) === +startDateValue.setHours(0, 0, 0, 0)
                                && +eleDateValue.setHours(0, 0, 0, 0) >= +startDateValue.setHours(0, 0, 0, 0) &&
                                +this.startValue >= +this.min
                                && !this.inputWrapper.container.classList.contains('e-error')
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], [STARTDATE, SELECTED$3]);
                                this.addSelectedAttributes(ele, this.startValue, true);
                            }
                            const endDateValue = this.currentView() === 'Month' ? new Date(+this.endValue) : this.getStartEndDate(new Date(+this.endValue), true);
                            if (this.currentView() === 'Year') {
                                eleDateValue = new Date(eleDateValue.getFullYear(), eleDateValue.getMonth() + 1, 0);
                            }
                            else if (this.currentView() === 'Decade') {
                                eleDateValue = new Date(eleDateValue.getFullYear(), 11, 31);
                            }
                            if (this.currentView() === this.depth &&
                                !isNullOrUndefined(this.endValue) &&
                                +eleDateValue.setHours(0, 0, 0, 0) === +endDateValue.setHours(0, 0, 0, 0)
                                && +eleDateValue.setHours(0, 0, 0, 0) <= +endDateValue.setHours(0, 0, 0, 0) &&
                                +this.startValue >= +this.min
                                && !this.inputWrapper.container.classList.contains('e-error')
                                && !(this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue))) {
                                addClass([ele], [ENDDATE, SELECTED$3]);
                                this.addSelectedAttributes(ele, this.startValue, false);
                            }
                            if (+eleDate === +this.startValue && !isNullOrUndefined(this.endValue) && +eleDate === +this.endValue) {
                                this.addSelectedAttributes(ele, this.endValue, false, true);
                            }
                        }
                    }
                }
            }
        }
    }
    checkMinMaxDays() {
        if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) || (!isNullOrUndefined(this.maxDays) && this.maxDays > 0)) {
            if (!this.isMobile) {
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + LEFTCALENDER));
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + RIGHTCALENDER));
            }
            else {
                this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
            }
        }
    }
    rangeArgs(e) {
        let inputValue;
        let range;
        const startDate = !isNullOrUndefined(this.startValue) ?
            this.globalize.formatDate(this.startValue, {
                format: this.formatString, type: 'date', skeleton: 'yMd'
            }) : null;
        const endDate = !isNullOrUndefined(this.endValue) ?
            this.globalize.formatDate(this.endValue, {
                format: this.formatString, type: 'date', skeleton: 'yMd'
            }) : null;
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            inputValue = startDate + ' ' + this.separator + ' ' + endDate;
            range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
        }
        else {
            inputValue = '';
            range = 0;
        }
        const args = {
            value: this.value,
            startDate: this.startValue,
            endDate: this.endValue,
            daySpan: range,
            event: e || null,
            element: this.element,
            isInteracted: !isNullOrUndefined(e),
            text: inputValue
        };
        return args;
    }
    otherMonthSelect(ele, isStartDate, sameDate) {
        const value = +this.getIdValue(null, ele);
        const dateIdString = '*[id^="/id"]:not(.e-other-month)'.replace('/id', '' + value);
        const tdCell = this.popupObj && this.popupObj.element.querySelector(dateIdString);
        if (!isNullOrUndefined(tdCell)) {
            if (isStartDate) {
                addClass([tdCell], [STARTDATE, SELECTED$3]);
                this.addSelectedAttributes(tdCell, this.startValue, true);
            }
            else {
                addClass([tdCell], [ENDDATE, SELECTED$3]);
                this.addSelectedAttributes(tdCell, this.endValue, true);
            }
            if (sameDate) {
                this.addSelectedAttributes(ele, this.endValue, false, true);
            }
        }
    }
    selectRange(event, element) {
        let leftCalendar;
        let rightCalendar;
        if (event) {
            event.preventDefault();
        }
        let isValue;
        let startDateValue;
        let endDateValue;
        const value = this.inputElement.value;
        if (!isNullOrUndefined(value) && value.trim() !== '') {
            const range = value.split(' ' + this.separator + ' ');
            if (range.length > 1 && ((this.currentView() === 'Year' && this.depth === 'Year')
                || (this.currentView() === 'Decade' && this.depth === 'Decade'))) {
                const dateOptions = { format: this.formatString, type: 'date', skeleton: 'yMd' };
                startDateValue = this.globalize.parseDate(this.getAmPmValue(range[0]).trim(), dateOptions);
                endDateValue = this.globalize.parseDate(this.getAmPmValue(range[1]).trim(), dateOptions);
                isValue = true;
            }
        }
        let date = isNullOrUndefined(event) ? this.getIdValue(null, element)
            : this.getIdValue(event, null);
        if (!isNullOrUndefined(this.startValue)) {
            if (this.currentView() === 'Year' && this.depth === 'Year') {
                date = new Date(date.getFullYear(), date.getMonth(), this.startValue.getDate());
            }
            else if (this.currentView() === 'Decade' && this.depth === 'Decade') {
                date = new Date(date.getFullYear(), this.startValue.getMonth(), this.startValue.getDate());
            }
        }
        const y = date.getFullYear();
        const m = date.getMonth();
        const firstDay = isValue && this.start !== 'Year' ? new Date(y, m, startDateValue.getDate(), startDateValue.getHours(), startDateValue.getMinutes(), startDateValue.getSeconds()) : new Date(y, m, 1);
        const lastDay = isValue && this.start !== 'Year' ? new Date(y, m, endDateValue.getDate(), endDateValue.getHours(), endDateValue.getMinutes(), endDateValue.getSeconds()) : new Date(y, m + 1, 0);
        const firstMonth = isValue && this.start !== 'Year' ? new Date(y, startDateValue.getMonth(), startDateValue.getDate(), startDateValue.getHours(), startDateValue.getMinutes(), startDateValue.getSeconds()) : new Date(y, 0, 1);
        const lastMonth = isValue && this.start !== 'Year' ? new Date(y, endDateValue.getMonth(), endDateValue.getDate(), endDateValue.getHours(), endDateValue.getMinutes(), endDateValue.getSeconds()) : new Date(y, 11, 31);
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            if (!this.isMobile || this.isMobile && !this.endButton.element.classList.contains(ACTIVE$1)) {
                this.removeSelection();
            }
        }
        else if (this.isMobile && this.startButton.element.classList.contains(ACTIVE$1)) {
            this.removeSelection();
        }
        const ele = element || event.currentTarget;
        if (isNullOrUndefined(this.startValue)) {
            if (!isNullOrUndefined(this.previousStartValue)) {
                date.setHours(this.previousStartValue.getHours());
                date.setMinutes(this.previousStartValue.getMinutes());
                date.setSeconds(this.previousStartValue.getSeconds());
            }
            this.startValue = (this.depth === 'Month') ? new Date(this.checkValue(date)) :
                (this.depth === 'Year') ? firstDay : firstMonth;
            this.endValue = null;
            this.setValue();
            addClass([ele], STARTDATE);
            this.addSelectedAttributes(ele, this.startValue, true);
            if (ele.classList.contains(OTHERMONTH$2)) {
                this.otherMonthSelect(ele, true);
            }
            this.checkMinMaxDays();
            this.applyButton.disabled = true;
            this.applyButton.element.disabled = true;
            if (this.isMobile) {
                this.endButton.element.classList.add(ACTIVE$1);
                this.startButton.element.classList.remove(ACTIVE$1);
                this.endButton.element.removeAttribute('disabled');
                this.selectableDates();
            }
            this.trigger('select', this.rangeArgs(event));
        }
        else {
            if (+date === +this.startValue || +date > +this.startValue) {
                if (+date === +this.startValue && !isNullOrUndefined(this.minDays) && this.minDays > 1) {
                    return;
                }
                this.endValue = null;
                this.setValue();
                if (this.isMobile || element) {
                    this.hoverSelection(event, element);
                }
                if (!isNullOrUndefined(this.previousEndValue)) {
                    date.setHours(this.previousEndValue.getHours());
                    date.setMinutes(this.previousEndValue.getMinutes());
                    date.setSeconds(this.previousEndValue.getSeconds());
                }
                this.endValue = (this.depth === 'Month') ? new Date(this.checkValue(date)) :
                    (this.depth === 'Year') ? lastDay : lastMonth;
                this.setValue();
                let endEle = this.popupObj.element.querySelectorAll('.' + ENDDATE);
                if (this.isMobile) {
                    this.startButton.element.classList.remove(ACTIVE$1);
                    this.endButton.element.classList.add(ACTIVE$1);
                    for (const ele of endEle) {
                        ele.removeAttribute('aria-label');
                        if (!ele.classList.contains(STARTDATE)) {
                            ele.setAttribute('aria-selected', 'false');
                            removeClass([ele], [ENDDATE, SELECTED$3]);
                        }
                        else {
                            this.addSelectedAttributes(ele, this.startValue, true);
                            removeClass([ele], [ENDDATE]);
                        }
                    }
                }
                addClass([ele], ENDDATE);
                if (+this.endValue === +this.startValue) {
                    this.addSelectedAttributes(ele, this.endValue, false, true);
                }
                else {
                    this.addSelectedAttributes(ele, this.endValue, false);
                }
                if (ele.classList.contains(OTHERMONTH$2)) {
                    if (+this.endValue === +this.startValue) {
                        this.otherMonthSelect(ele, false, true);
                    }
                    else {
                        this.otherMonthSelect(ele, false);
                    }
                }
                endEle = this.popupObj.element.querySelectorAll('.' + ENDDATE);
                for (const ele of endEle) {
                    if (ele.classList.contains(STARTDATE)) {
                        removeClass([ele], [RANGEHOVER]);
                    }
                }
                this.applyButton.disabled = false;
                this.applyButton.element.disabled = false;
                if (!this.isMobile) {
                    this.removeClassDisabled();
                }
                if (!isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
                    this.disabledDateRender();
                }
                this.trigger('select', this.rangeArgs(event));
            }
            else if (+date < +this.startValue) {
                this.removeClassDisabled();
                this.startValue = (this.depth === 'Month') ? new Date(this.checkValue(date)) :
                    (this.depth === 'Year') ? firstDay : firstMonth;
                this.setValue();
                this.removeSelectedAttributes();
                removeClass(this.popupObj.element.querySelectorAll('.' + STARTDATE), [STARTDATE, SELECTED$3]);
                addClass([ele], STARTDATE);
                this.addSelectedAttributes(ele, this.startValue, true);
                if (ele.classList.contains(OTHERMONTH$2)) {
                    this.otherMonthSelect(ele, true);
                }
                this.checkMinMaxDays();
            }
        }
        if (event) {
            leftCalendar = closest(event.target, '.' + LEFTCALENDER);
        }
        if (!isNullOrUndefined(leftCalendar)) {
            this.leftCalendar.children[1].firstElementChild.focus();
        }
        else {
            if (event) {
                rightCalendar = event && closest(event.target, '.' + RIGHTCALENDER);
            }
            if (!isNullOrUndefined(rightCalendar)) {
                this.rightCalendar.children[1].firstElementChild.focus();
            }
        }
        addClass([ele], SELECTED$3);
        this.calendarIconEvent();
        this.updateHeader();
        this.removeFocusedDate();
    }
    selectableDates() {
        if (!isNullOrUndefined(this.startValue)) {
            const tdCells = this.calendarElement.querySelectorAll('.' + CALENDAR + ' td');
            let isStartDate = false;
            if (this.currentView() === this.depth) {
                for (const ele of tdCells) {
                    if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(WEEKNUMBER$2)) {
                        if (!ele.classList.contains(DISABLED$2)) {
                            const eleDate = this.getIdValue(null, ele);
                            if (+eleDate < +this.startValue) {
                                addClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                                EventHandler.clearEvents(ele);
                                continue;
                            }
                            else {
                                break;
                            }
                        }
                    }
                    if (ele.classList.contains(STARTDATE) && !ele.classList.contains(OTHERMONTH$2)) {
                        isStartDate = true;
                        break;
                    }
                }
                if (isStartDate) {
                    if (!this.previousIcon.classList.contains(DISABLED$2)) {
                        addClass([this.previousIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                    }
                }
            }
            else {
                for (const ele of tdCells) {
                    const startMonth = this.startValue.getMonth();
                    const startYear = this.startValue.getFullYear();
                    const element = this.getIdValue(null, ele);
                    if (!this.startButton.element.classList.contains(ACTIVE$1) && ((this.currentView() === 'Year' &&
                        (element.getMonth() < startMonth) && (element.getFullYear() <= startYear))
                        || (this.currentView() === 'Decade' && (element.getMonth() <= startMonth) &&
                            (element.getFullYear() < startYear)))) {
                        addClass([ele], [DISABLED$2]);
                    }
                    else {
                        break;
                    }
                }
                if (tdCells[0].classList.contains(DISABLED$2)) {
                    this.previousIconHandler(true);
                }
                else if (tdCells[tdCells.length - 1].classList.contains(DISABLED$2)) {
                    this.nextIconHandler(true);
                }
            }
        }
    }
    updateMinMaxDays(calendar) {
        if ((!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) ||
            (this.isMobile && this.endButton && this.endButton.element.classList.contains(ACTIVE$1))) {
            if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) || (!isNullOrUndefined(this.maxDays) && this.maxDays > 0)) {
                const startValueSelected = this.removeTimeValueFromDate(this.startValue);
                let minDate = new Date(new Date(+startValueSelected).setDate(startValueSelected.getDate() + (this.minDays - 1)));
                let maxDate = new Date(new Date(+startValueSelected).setDate(startValueSelected.getDate() + (this.maxDays - 1)));
                minDate = (!isNullOrUndefined(this.minDays) && this.minDays > 0) ? minDate : null;
                maxDate = (!isNullOrUndefined(this.maxDays) && this.maxDays > 0) ? maxDate : null;
                if (this.currentView() === 'Year') {
                    minDate = isNullOrUndefined(minDate) ? null : new Date(minDate.getFullYear(), minDate.getMonth(), 0);
                    maxDate = isNullOrUndefined(maxDate) ? null : new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
                }
                else if (this.currentView() === 'Decade') {
                    minDate = isNullOrUndefined(minDate) ? null : new Date(minDate.getFullYear() - 1, 11, 1);
                    maxDate = isNullOrUndefined(maxDate) ? null : new Date(maxDate.getFullYear(), 0, 1);
                }
                const tdCells = calendar.querySelectorAll('.' + CALENDAR + ' td');
                let maxEle;
                for (const ele of tdCells) {
                    if (!ele.classList.contains(STARTDATE) && !ele.classList.contains(WEEKNUMBER$2)) {
                        let eleDate = this.getIdValue(null, ele);
                        eleDate = this.removeTimeValueFromDate(eleDate);
                        if (!isNullOrUndefined(minDate) && +eleDate === +minDate && ele.classList.contains(DISABLED$2)) {
                            minDate.setDate(minDate.getDate() + 1);
                        }
                        if (!ele.classList.contains(DISABLED$2)) {
                            if (+eleDate <= +startValueSelected) {
                                continue;
                            }
                            if (!isNullOrUndefined(minDate) && +eleDate < +minDate) {
                                addClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                                EventHandler.clearEvents(ele);
                            }
                            if (!isNullOrUndefined(maxDate) && +eleDate > +maxDate) {
                                addClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                                this.isMaxDaysClicked = true;
                                EventHandler.clearEvents(ele);
                                if (isNullOrUndefined(maxEle) && !ele.classList.contains(OTHERMONTH$2)) {
                                    maxEle = ele;
                                }
                            }
                        }
                    }
                }
                if (!isNullOrUndefined(maxEle)) {
                    if (this.isMobile) {
                        if (!this.nextIcon.classList.contains(DISABLED$2)) {
                            addClass([this.nextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                        }
                    }
                    else {
                        let calendar = closest(maxEle, '.' + RIGHTCALENDER);
                        calendar = isNullOrUndefined(calendar) ? this.leftCalendar : calendar;
                        const isLeftCalendar = calendar.classList.contains(LEFTCALENDER);
                        if (!isLeftCalendar) {
                            if (!this.rightCalNextIcon.classList.contains(DISABLED$2)) {
                                addClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                        }
                        else {
                            if (!this.rightCalNextIcon.classList.contains(DISABLED$2)) {
                                addClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                            if (!this.leftCalNextIcon.classList.contains(DISABLED$2)) {
                                addClass([this.leftCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                            if (!this.rightCalPrevIcon.classList.contains(DISABLED$2)) {
                                addClass([this.rightCalPrevIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
                            }
                        }
                    }
                }
            }
        }
        else {
            this.isMaxDaysClicked = false;
        }
    }
    removeTimeValueFromDate(value) {
        const dateValue = new Date(value.getFullYear(), value.getMonth(), value.getDate());
        return dateValue;
    }
    removeClassDisabled() {
        const tdCells = this.popupObj.element.querySelectorAll('.' + CALENDAR + ' td' + '.' + DATEDISABLED);
        for (const ele of tdCells) {
            if (ele.classList.contains(DATEDISABLED)) {
                removeClass([ele], [DATEDISABLED, DISABLED$2, OVERLAY$2]);
                EventHandler.add(ele, 'click', this.selectRange, this);
                if (!this.isMobile) {
                    EventHandler.add(ele, 'mouseover', this.hoverSelection, this);
                }
            }
        }
        if (this.isMobile) {
            if (this.nextIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.nextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
            if (this.previousIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.previousIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
        }
        else {
            if (this.rightCalNextIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.rightCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
            if (this.rightCalPrevIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.rightCalPrevIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
            if (this.leftCalNextIcon.classList.contains(ICONDISABLED)) {
                removeClass([this.leftCalNextIcon], [ICONDISABLED, DISABLED$2, OVERLAY$2]);
            }
        }
    }
    updateHeader() {
        const format = { type: 'date', skeleton: 'yMMMd' };
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            let range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if (!isNullOrUndefined(this.disabledDayCnt)) {
                range = range - this.disabledDayCnt;
                this.disabledDayCnt = null;
            }
            this.popupObj.element.querySelector('.' + DAYSPAN).textContent = range.toString() + ' ' + this.l10n.getConstant('days');
        }
        else {
            this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
        }
        if (!this.isMobile) {
            if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.globalize.formatDate(this.endValue, format);
            }
            else {
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.l10n.getConstant('endLabel');
            }
            if (!isNullOrUndefined(this.startValue)) {
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.globalize.formatDate(this.startValue, format);
            }
            else {
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.l10n.getConstant('startLabel');
            }
        }
        else {
            if (!isNullOrUndefined(this.startValue)) {
                this.startButton.element.textContent = this.globalize.formatDate(this.startValue, format);
            }
            else {
                this.startButton.element.textContent = this.l10n.getConstant('startLabel');
            }
            if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
                this.endButton.element.textContent = this.globalize.formatDate(this.endValue, format);
            }
            else {
                this.endButton.element.textContent = this.l10n.getConstant('endLabel');
            }
        }
        if ((this.isDateDisabled(this.startValue) || this.isDateDisabled(this.endValue)) ||
            ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
                || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
                || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue))
                    && +this.startValue > +this.endValue))) {
            if (!this.isMobile) {
                this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
                this.popupObj.element.querySelector('.' + STARTLABEL).textContent = this.l10n.getConstant('startLabel');
                this.popupObj.element.querySelector('.' + ENDLABEL).textContent = this.l10n.getConstant('endLabel');
            }
            else {
                this.startButton.element.textContent = this.l10n.getConstant('startLabel');
                this.endButton.element.textContent = this.l10n.getConstant('endLabel');
                this.popupObj.element.querySelector('.' + DAYSPAN).textContent = this.l10n.getConstant('selectedDays');
            }
        }
        if (this.popupObj.element.querySelector('#custom_range')) {
            this.popupObj.element.querySelector('#custom_range').textContent =
                this.l10n.getConstant('customRange') !== '' ? this.l10n.getConstant('customRange') : 'Custom Range';
        }
    }
    removeSelection() {
        this.startValue = null;
        this.endValue = null;
        this.setValue();
        this.removeSelectedAttributes();
        if (this.popupObj) {
            if (this.popupObj.element.querySelectorAll('.' + SELECTED$3).length > 0) {
                removeClass(this.popupObj.element.querySelectorAll('.' + SELECTED$3), [STARTDATE, ENDDATE, SELECTED$3]);
            }
            if (this.popupObj.element.querySelectorAll('.' + FOCUSDATE).length > 0) {
                removeClass(this.popupObj.element.querySelectorAll('.' + FOCUSDATE), FOCUSDATE);
            }
            if (this.popupObj.element.querySelectorAll('.' + RANGEHOVER).length > 0) {
                removeClass(this.popupObj.element.querySelectorAll('.' + RANGEHOVER), [RANGEHOVER]);
            }
        }
    }
    addSelectedAttributes(ele, date, isStartDate, sameDate) {
        if (ele) {
            const title = this.globalize.formatDate(date, { type: 'date', skeleton: 'full' });
            if (!isNullOrUndefined(sameDate) && sameDate) {
                ele.setAttribute('aria-label', 'The current start and end date is ' + '' + title);
            }
            else {
                ele.setAttribute('aria-label', 'The current ' + (isStartDate ? 'start' : 'end') + ' date is ' + '' + title);
            }
            ele.setAttribute('aria-selected', 'true');
        }
    }
    removeSelectedAttributes() {
        if (this.popupObj) {
            const start = this.popupObj.element.querySelectorAll('.' + STARTDATE);
            for (const ele of start) {
                ele.setAttribute('aria-selected', 'false');
                ele.removeAttribute('aria-label');
            }
            const end = this.popupObj.element.querySelectorAll('.' + ENDDATE);
            for (const ele of end) {
                ele.setAttribute('aria-selected', 'false');
                ele.removeAttribute('aria-label');
            }
        }
    }
    updateCalendarElement(calendar) {
        if (calendar.classList.contains(LEFTCALENDER)) {
            this.calendarElement = this.leftCalendar;
            this.currentDate = this.leftCalCurrentDate;
            this.previousIcon = this.leftCalPrevIcon;
            this.nextIcon = this.leftCalNextIcon;
        }
        else {
            this.calendarElement = this.rightCalendar;
            this.currentDate = this.rightCalCurrentDate;
            this.previousIcon = this.rightCalPrevIcon;
            this.nextIcon = this.rightCalNextIcon;
        }
        this.contentElement = calendar.querySelector('.' + CONTENT$1);
        this.tableBodyElement = select('.' + CONTENT$1 + ' tbody', calendar);
        this.table = calendar.querySelector('.' + CONTENT$1).getElementsByTagName('table')[0];
        this.headerTitleElement = calendar.querySelector('.' + HEADER$1 + ' .' + TITLE$1);
        this.headerElement = calendar.querySelector('.' + HEADER$1);
    }
    navPrevMonth(e) {
        e.preventDefault();
        let ele = closest(e.target, '.' + LEFTCALENDER);
        ele = isNullOrUndefined(ele) ? closest(e.target, '.' + RIGHTCALENDER) : ele;
        this.updateCalendarElement(ele);
        this.navigatePrevious(e);
        if (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.updateMinMaxDays(ele);
        }
        this.updateControl(ele);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    deviceNavigation(ele) {
        this.deviceCalendarEvent();
        this.updateRange([this.popupObj.element.querySelector('.' + CALENDAR)]);
        if (this.endButton.element.classList.contains(ACTIVE$1)) {
            this.updateMinMaxDays(this.popupObj.element.querySelector('.' + CALENDAR));
        }
        if (this.endButton.element.classList.contains(ACTIVE$1)) {
            this.selectableDates();
        }
        if (this.currentView() === this.depth) {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
    }
    updateControl(calendar, customDate = null) {
        if (calendar.classList.contains(RIGHTCALENDER)) {
            this.rightCalCurrentDate = new Date(+(customDate ? customDate : this.currentDate));
        }
        else {
            this.leftCalCurrentDate = new Date(+this.currentDate);
        }
        this.calendarIconEvent();
        if ((((this.depth === 'Month')
            && this.leftCalendar.querySelector('.e-content').classList.contains('e-month')
            && this.rightCalendar.querySelector('.e-content').classList.contains('e-month'))
            || ((this.depth === 'Year')
                && this.leftCalendar.querySelector('.e-content').classList.contains('e-year')
                && this.rightCalendar.querySelector('.e-content').classList.contains('e-year'))
            || ((this.depth === 'Decade')
                && this.leftCalendar.querySelector('.e-content').classList.contains('e-decade')
                && this.rightCalendar.querySelector('.e-content').classList.contains('e-decade')))
            || this.isMobile) {
            this.bindCalendarCellEvents();
        }
        this.removeFocusedDate();
        this.updateRange([calendar]);
    }
    navNextMonth(event) {
        event.preventDefault();
        let ele = closest(event.target, '.' + LEFTCALENDER);
        ele = isNullOrUndefined(ele) ? closest(event.target, '.' + RIGHTCALENDER) : ele;
        this.updateCalendarElement(ele);
        this.navigateNext(event);
        if (!isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.updateMinMaxDays(ele);
        }
        this.updateControl(ele);
    }
    isPopupOpen() {
        if (!isNullOrUndefined(this.popupObj) && this.popupObj.element.classList.contains(POPUP$1)) {
            return true;
        }
        return false;
    }
    createRangeHeader() {
        const labelContainer = this.createElement('div', { className: STARTENDCONTAINER });
        if (!this.isMobile) {
            const startLabel = this.createElement('a', { className: STARTLABEL });
            const endLabel = this.createElement('a', { className: ENDLABEL });
            const changeIcon = this.createElement('span', { className: CHANGEICON });
            attributes(startLabel, { 'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'Start Date', 'role': 'button' });
            attributes(endLabel, { 'aria-atomic': 'true', 'aria-live': 'assertive', 'aria-label': 'End Date', 'role': 'button' });
            labelContainer.appendChild(startLabel);
            labelContainer.appendChild(changeIcon);
            labelContainer.appendChild(endLabel);
            startLabel.textContent = this.l10n.getConstant('startLabel');
            endLabel.textContent = this.l10n.getConstant('endLabel');
        }
        else {
            const endBtn = this.createElement('button', { className: ENDBUTTON });
            const startBtn = this.createElement('button', { className: STARTBUTTON });
            this.startButton = new Button({ content: this.l10n.getConstant('startLabel') }, startBtn);
            this.endButton = new Button({ content: this.l10n.getConstant('endLabel') }, endBtn);
            labelContainer.appendChild(startBtn);
            labelContainer.appendChild(endBtn);
        }
        return labelContainer;
    }
    disableInput() {
        if (this.strictMode) {
            if (!isNullOrUndefined(this.previousStartValue) && !isNullOrUndefined(this.previousEndValue)) {
                this.startValue = this.previousStartValue;
                this.endValue = this.previousEndValue;
                this.setValue();
                this.updateInput();
            }
        }
        else {
            this.updateInput();
            this.clearRange();
            this.setProperties({ startDate: null }, true);
            this.setProperties({ endDate: null }, true);
            this.startValue = null;
            this.endValue = null;
            this.setValue();
            this.errorClass();
        }
        this.setProperties({ enabled: false }, true);
        Input.setEnabled(this.enabled, this.inputElement);
        this.bindEvents();
    }
    validateMinMax() {
        this.min = isNullOrUndefined(this.min) || !(+this.min) ? this.min = new Date(1900, 0, 1) : this.min;
        this.max = isNullOrUndefined(this.max) || !(+this.max) ? this.max = new Date(2099, 11, 31) : this.max;
        if (!(this.min <= this.max)) {
            this.disableInput();
            return;
        }
        if (!isNullOrUndefined(this.minDays) && !isNullOrUndefined(this.maxDays)) {
            if (this.maxDays > 0 && this.minDays > 0 && (this.minDays > this.maxDays)) {
                this.maxDays = null;
            }
        }
        if (!isNullOrUndefined(this.minDays) && this.minDays < 0) {
            this.minDays = null;
        }
        if (!isNullOrUndefined(this.maxDays) && this.maxDays < 0) {
            this.maxDays = null;
        }
    }
    validateRangeStrict() {
        if (!isNullOrUndefined(this.startValue)) {
            if (+this.startValue <= +this.min) {
                this.startValue = this.min;
                this.setValue();
            }
            else if (+this.startValue >= +this.min && +this.startValue >= +this.max) {
                this.startValue = this.max;
            }
        }
        if (!isNullOrUndefined(this.endValue)) {
            if (+this.endValue > +this.max) {
                this.endValue = this.max;
                this.setValue();
            }
            else if (+this.endValue < +this.min) {
                this.endValue = this.min;
                this.setValue();
            }
        }
        this.validateMinMaxDays();
    }
    validateRange() {
        this.validateMinMaxDays();
    }
    validateMinMaxDays() {
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            const range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if ((!isNullOrUndefined(this.minDays) && this.minDays > 0) && !(range >= this.minDays)) {
                if (this.strictMode) {
                    const date = new Date(+this.startValue);
                    date.setDate(date.getDate() + (this.minDays - 1));
                    if (+date > +this.max) {
                        this.endValue = this.max;
                        this.setValue();
                    }
                    else {
                        this.endValue = date;
                        this.setValue();
                    }
                }
                else {
                    this.startValue = null;
                    this.endValue = null;
                    this.setValue();
                }
            }
            if ((!isNullOrUndefined(this.maxDays) && this.maxDays > 0) && !(range <= this.maxDays)) {
                if (this.strictMode) {
                    this.endValue = new Date(+this.startValue);
                    this.endValue.setDate(this.endValue.getDate() + (this.maxDays - 1));
                    this.setValue();
                }
                else {
                    this.startValue = null;
                    this.endValue = null;
                    this.setValue();
                }
            }
        }
    }
    renderCalendar() {
        this.calendarElement = this.createElement('div');
        this.calendarElement.classList.add(CALENDAR);
        if (this.enableRtl) {
            this.calendarElement.classList.add(RTL$1);
        }
        attributes(this.calendarElement, { 'data-role': 'calendar' });
        super.createHeader();
        super.createContent();
    }
    isSameMonth(start, end) {
        if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
            return true;
        }
        return false;
    }
    isSameYear(start, end) {
        if (start.getFullYear() === end.getFullYear()) {
            return true;
        }
        return false;
    }
    isSameDecade(start, end) {
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        if ((startYear - (startYear % 10)) === (endYear - (endYear % 10))) {
            return true;
        }
        return false;
    }
    startMonthCurrentDate() {
        if (this.isSameMonth(this.min, this.max) || +this.currentDate > +this.max || this.isSameMonth(this.currentDate, this.max)) {
            this.currentDate = new Date(+this.max);
            this.currentDate.setDate(1);
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        }
        else if (this.currentDate < this.min) {
            this.currentDate = new Date(this.checkValue(this.min));
        }
    }
    selectNextMonth() {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !this.isSameMonth(this.endValue, this.currentDate)
            && !this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)) {
            this.currentDate = new Date(+this.endValue);
        }
        else {
            this.currentDate.setDate(1);
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            return;
        }
        if ((!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
            || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.currentDate.setDate(1);
            const month = this.currentDate.getMonth() + 1;
            this.currentDate.setMonth(month);
        }
    }
    selectNextYear() {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !this.isSameYear(this.endValue, this.currentDate)
            && !this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)) {
            this.currentDate = new Date(+this.endValue);
        }
        else {
            this.currentDate.setMonth(0);
            const yr = this.currentDate.getFullYear() + 1;
            this.currentDate.setFullYear(yr);
            return;
        }
        if ((!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)
            || (!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.currentDate.setMonth(0);
            this.currentDate.setFullYear(this.currentDate.getFullYear() + 1);
        }
    }
    selectNextDecade() {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) && !this.isSameDecade(this.endValue, this.currentDate)
            && !this.isDateDisabled(this.endValue) && !this.isDateDisabled(this.startValue)) {
            this.currentDate = new Date(+this.endValue);
        }
        else {
            const decyr = this.currentDate.getFullYear() + 10;
            this.currentDate.setFullYear(decyr);
            return;
        }
        if (((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)
            || (!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || (!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.currentDate.setFullYear(this.currentDate.getFullYear() + 10);
        }
    }
    selectStartMonth() {
        if (!isNullOrUndefined(this.startValue)) {
            if (!isNullOrUndefined(this.max) && this.isSameMonth(this.startValue, this.max)) {
                this.currentDate = new Date(+this.max);
                this.currentDate.setDate(1);
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            }
            else if (!(this.startValue >= this.min && this.startValue <= this.max)
                || this.isDateDisabled(this.startValue)) {
                this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            }
            else {
                this.currentDate = new Date(+this.startValue);
            }
        }
        else {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
            this.startMonthCurrentDate();
        }
        if ((!isNullOrUndefined(this.endValue) && +this.endValue > +this.max)
            || (!isNullOrUndefined(this.startValue) && +this.startValue < +this.min)
            || ((!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) && +this.startValue > +this.endValue)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        }
        this.startMonthCurrentDate();
    }
    createCalendar() {
        const calendarContainer = this.createElement('div', { className: CALENDARCONTAINER });
        if (!this.isMobile) {
            this.selectStartMonth();
            this.renderCalendar();
            this.leftCalCurrentDate = new Date(+this.currentDate);
            this.calendarElement.classList.add(LEFTCALENDER);
            this.leftCalPrevIcon = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + PREVICON$1);
            this.leftCalNextIcon = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + NEXTICON$1);
            this.leftTitle = this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + TITLE$1);
            remove(this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + ICONCONTAINER$1));
            this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1).appendChild(this.leftCalNextIcon);
            this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1).appendChild(this.leftCalPrevIcon);
            prepend([this.leftCalPrevIcon], this.calendarElement.querySelector('.' + LEFTCALENDER + ' .' + HEADER$1));
            this.leftCalendar = this.calendarElement;
            const leftContainer = this.createElement('div', { className: LEFTCONTAINER });
            const rightContainer = this.createElement('div', { className: RIGHTCONTAINER });
            leftContainer.appendChild(this.leftCalendar);
            calendarContainer.appendChild(leftContainer);
            if (!this.isMobile) {
                EventHandler.add(this.leftTitle, 'click', this.leftNavTitle, this);
            }
            if (this.start === 'Month') {
                this.selectNextMonth();
            }
            if (this.start === 'Year') {
                this.selectNextYear();
            }
            if (this.start === 'Decade') {
                this.selectNextDecade();
            }
            this.renderCalendar();
            this.rightCalCurrentDate = new Date(+this.currentDate);
            addClass([this.calendarElement], RIGHTCALENDER);
            this.rightCalendar = this.calendarElement;
            removeClass([this.leftCalendar && this.leftCalendar.querySelector('.e-content tbody')], 'e-zoomin');
            removeClass([this.rightCalendar && this.rightCalendar.querySelector('.e-content tbody')], 'e-zoomin');
            this.rightCalPrevIcon = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + PREVICON$1);
            this.rightCalNextIcon = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + NEXTICON$1);
            this.rightTitle = this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + TITLE$1);
            remove(this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + ICONCONTAINER$1));
            this.calendarElement.querySelector('table').setAttribute('tabindex', '0');
            this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1).appendChild(this.rightCalNextIcon);
            this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1).appendChild(this.rightCalPrevIcon);
            prepend([this.rightCalPrevIcon], this.calendarElement.querySelector('.' + RIGHTCALENDER + ' .' + HEADER$1));
            rightContainer.appendChild(this.rightCalendar);
            calendarContainer.appendChild(rightContainer);
            if (!this.isMobile) {
                EventHandler.add(this.rightTitle, 'click', this.rightNavTitle, this);
            }
        }
        else {
            if (!isNullOrUndefined(this.startValue)) {
                this.currentDate = new Date(+this.startValue);
            }
            super.validateDate();
            super.minMaxUpdate();
            super.render();
            const prevIcon = this.calendarElement.querySelector('.' + CALENDAR + ' .' + PREVICON$1);
            const nextIcon = this.calendarElement.querySelector('.' + CALENDAR + ' .' + NEXTICON$1);
            remove(this.calendarElement.querySelector('.' + CALENDAR + ' .' + ICONCONTAINER$1));
            this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1).appendChild(nextIcon);
            this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1).appendChild(prevIcon);
            prepend([prevIcon], this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1));
            this.deviceCalendar = this.calendarElement;
            calendarContainer.appendChild(this.calendarElement);
            this.headerTitleElement = this.calendarElement.querySelector('.' + CALENDAR + ' .' + HEADER$1 + ' .' + TITLE$1);
        }
        return calendarContainer;
    }
    leftNavTitle(e) {
        if (this.isPopupOpen()) {
            this.calendarElement = this.leftCalendar;
            this.calendarNavigation(e, this.calendarElement);
        }
    }
    calendarNavigation(e, element) {
        this.table = element.querySelector('table');
        this.headerTitleElement = element.querySelector('.e-title');
        this.tableBodyElement = element.querySelector('tbody');
        this.tableHeadElement = element.querySelector('thead');
        this.contentElement = element.querySelector('.e-content');
        this.updateCalendarElement(element);
        super.navigateTitle(e);
        this.updateNavIcons();
    }
    rightNavTitle(e) {
        if (this.isPopupOpen()) {
            this.calendarElement = this.rightCalendar;
            this.calendarNavigation(e, this.calendarElement);
        }
    }
    clickEventEmitter(e) {
        if (!this.isMobile) {
            if (closest(e.target, '.e-calendar.e-left-calendar')) {
                this.calendarElement = this.leftCalendar;
                this.updateCalendarElement(this.leftCalendar);
            }
            else {
                this.calendarElement = this.rightCalendar;
                this.updateCalendarElement(this.rightCalendar);
            }
        }
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the Calendar.
     *
     * @returns {string}
     * @private
     * @hidden
     */
    currentView() {
        return super.currentView();
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    getCalendarView(view) {
        if (view === 'Year') {
            return 'Year';
        }
        else if (view === 'Decade') {
            return 'Decade';
        }
        else {
            return 'Month';
        }
    }
    navigatedEvent(e) {
        this.trigger('navigated', this.navigatedArgs);
        if (!isNullOrUndefined(this.popupObj)) {
            let element;
            const view = this.getCalendarView(this.currentView());
            if (this.isMobile) {
                if (view === this.depth) {
                    this.bindCalendarCellEvents();
                    this.deviceNavigation();
                    this.removeFocusedDate();
                    this.checkMinMaxDays();
                }
                else {
                    this.selectableDates();
                }
            }
            else {
                if (!this.isMobile && view === this.depth) {
                    element = this.calendarElement.classList.contains('e-left-calendar') ? this.leftCalendar : this.rightCalendar;
                    if (element === this.leftCalendar && ((e && !e.currentTarget.children[0].classList.contains('e-icons'))
                        || (!isNullOrUndefined(this.controlDown)))) {
                        this.leftCalCurrentDate = new Date(+this.currentDate);
                        this.effect = '';
                        this.currentDate = this.leftCalCurrentDate;
                        this.updateCalendarElement(this.leftCalendar);
                        this.updateControl(this.leftCalendar);
                        this.updateCalendarElement(this.rightCalendar);
                        super.navigateTo.call(this, view, this.rightCalCurrentDate);
                        const customDate = this.rightCalCurrentDate ? this.rightCalCurrentDate : this.currentDate;
                        this.updateControl(this.rightCalendar, customDate);
                        this.updateNavIcons();
                        this.calendarIconEvent();
                        this.calendarIconRipple();
                        this.controlDown = null;
                    }
                    else if (e && !e.currentTarget.children[0].classList.contains('e-icons')
                        || (!isNullOrUndefined(this.controlDown))) {
                        this.rightCalCurrentDate = new Date(+this.currentDate);
                        this.effect = '';
                        this.currentDate = this.rightCalCurrentDate;
                        this.updateCalendarElement(this.rightCalendar);
                        this.updateControl(this.rightCalendar);
                        this.updateCalendarElement(this.leftCalendar);
                        if (this.startValue && isNullOrUndefined(this.endValue)) {
                            if (view === 'Month' && this.startValue.getMonth() < this.rightCalCurrentDate.getMonth() &&
                                this.startValue.getFullYear() <= this.rightCalCurrentDate.getFullYear()) {
                                super.navigateTo.call(this, view, new Date(+this.startValue));
                            }
                            else if (view === 'Year' && this.startValue.getFullYear() < this.rightCalCurrentDate.getFullYear()) {
                                super.navigateTo.call(this, view, new Date(+this.startValue));
                            }
                            else {
                                super.navigateTo.call(this, view, this.leftCalCurrentDate);
                            }
                        }
                        else {
                            super.navigateTo.call(this, view, this.leftCalCurrentDate);
                        }
                        this.updateControl(this.leftCalendar);
                        this.updateNavIcons();
                        this.calendarIconEvent();
                        this.calendarIconRipple();
                        this.controlDown = null;
                    }
                    this.checkMinMaxDays();
                }
                else {
                    this.updateNavIcons();
                    this.calendarIconEvent();
                }
            }
        }
    }
    createControl() {
        const controlContainer = this.createElement('div', { className: RANGECONTAINER });
        const headerContainer = this.createElement('div', { className: RANGEHEADER });
        if (this.isMobile && this.fullScreenMode) {
            const modelHeaderIconWrapper = this.createElement('div', { className: 'e-model-header-wrapper' });
            const modelCloseIcon = this.createElement('span', { className: 'e-popup-close' });
            EventHandler.add(modelCloseIcon, 'mousedown touchstart', this.modelRangeCloseHandler, this);
            const modelApplyButton = this.createElement('span', { className: 'e-apply' });
            EventHandler.add(modelApplyButton, 'mousedown touchstart', this.applyFunction, this);
            modelHeaderIconWrapper.appendChild(modelCloseIcon);
            modelHeaderIconWrapper.appendChild(modelApplyButton);
            headerContainer.appendChild(modelHeaderIconWrapper);
        }
        const labelContainer = this.createRangeHeader();
        headerContainer.appendChild(labelContainer);
        const daySpan = this.createElement('div', { className: DAYSPAN });
        attributes(daySpan, { 'aria-label': 'Selected Days' });
        daySpan.textContent = this.l10n.getConstant('selectedDays');
        headerContainer.appendChild(daySpan);
        const separator = this.createElement('div', { className: SEPARATOR });
        const calendarContainer = this.createCalendar();
        controlContainer.appendChild(headerContainer);
        controlContainer.appendChild(separator);
        controlContainer.appendChild(calendarContainer);
        const footerSection = this.createElement('div', { className: FOOTER$1 });
        const cancelBtn = this.createElement('button', { className: CANCEL + ' ' + FLAT$1 + ' ' + CSS$1 });
        const applyBtn = this.createElement('button');
        addClass([applyBtn], [APPLY, FLAT$1, PRIMARY$1, CSS$1]);
        footerSection.appendChild(applyBtn);
        footerSection.appendChild(cancelBtn);
        const enable = !isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue);
        this.cancelButton = new Button({ content: this.l10n.getConstant('cancelText') }, cancelBtn);
        this.applyButton = new Button({ content: this.l10n.getConstant('applyText'), disabled: !enable }, applyBtn);
        EventHandler.add(applyBtn, 'click', this.applyFunction, this);
        EventHandler.add(cancelBtn, 'click', this.cancelFunction, this);
        this.popupWrapper.appendChild(controlContainer);
        if (!this.isMobile) {
            if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
                this.createPresets();
                this.listRippleEffect();
                addClass([controlContainer], RANGEBORDER);
                addClass([this.popupWrapper], 'e-preset-wrapper');
                const presets = this.popupWrapper.querySelector('.' + PRESETS);
                presets.style.height = this.popupWrapper.querySelector('.' + RANGECONTAINER).getBoundingClientRect().height + 'px';
            }
        }
        this.popupWrapper.appendChild(footerSection);
        if (this.isMobile) {
            this.deviceHeaderUpdate();
        }
        this.renderPopup();
    }
    modelRangeCloseHandler(e) {
        this.hide();
    }
    cancelFunction(eve) {
        if (document.activeElement !== this.inputElement) {
            this.preventFocus = true;
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
        }
        eve.preventDefault();
        if (this.isKeyPopup) {
            this.inputElement.focus();
            this.isKeyPopup = false;
        }
        this.startValue = null;
        this.endValue = null;
        this.removeSelection();
        this.hide(eve);
    }
    deviceHeaderUpdate() {
        if (isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
            this.endButton.element.setAttribute('disabled', '');
            this.startButton.element.classList.add(ACTIVE$1);
        }
        else if (!isNullOrUndefined(this.startValue)) {
            this.startButton.element.classList.add(ACTIVE$1);
        }
    }
    applyFunction(eve) {
        let isValueChanged = false;
        if (eve.type !== 'touchstart') {
            eve.preventDefault();
        }
        if (this.closeEventArgs && this.closeEventArgs.cancel) {
            this.startValue = this.popupWrapper.querySelector('.e-start-date') &&
                this.getIdValue(null, this.popupWrapper.querySelector('.e-start-date'));
            this.endValue = this.popupWrapper.querySelector('.e-end-date') &&
                this.getIdValue(null, this.popupWrapper.querySelector('.e-end-date'));
            this.setValue();
        }
        if (document.activeElement !== this.inputElement) {
            this.preventFocus = true;
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
        }
        if (eve.type !== 'touchstart' &&
            this.closeEventArgs && !this.closeEventArgs.cancel) {
            eve.preventDefault();
        }
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            if (!(this.previousStartValue && this.previousEndValue &&
                this.startValue.getDate() === this.previousStartValue.getDate() &&
                this.startValue.getMonth() === this.previousStartValue.getMonth() &&
                this.startValue.getFullYear() === this.previousStartValue.getFullYear()
                && this.endValue.getDate() === this.previousEndValue.getDate() &&
                this.endValue.getMonth() === this.previousEndValue.getMonth()
                && this.endValue.getFullYear() === this.previousEndValue.getFullYear())) {
                Input.setValue(this.rangeArgs(eve).text, this.inputElement, this.floatLabelType, this.showClearButton);
            }
            this.previousStartValue = new Date(+this.startValue);
            this.previousEndValue = new Date(+this.endValue);
            this.previousEleValue = this.inputElement.value;
            if (+this.initStartDate !== +this.startValue || +this.initEndDate !== +this.endValue) {
                isValueChanged = true;
            }
            this.changeTrigger(eve);
            this.hide(eve ? eve : null);
            this.errorClass();
            isValueChanged = true;
        }
        else {
            this.hide(eve ? eve : null);
        }
        if (!(closest(eve.target, '.' + INPUTCONTAINER$1))
            && (!isValueChanged)) {
            this.focusOut();
        }
        if (!this.isMobile) {
            this.isKeyPopup = false;
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.children[1].focus();
                this.keyInputConfigs = extend(this.keyInputConfigs, this.keyConfigs);
                this.popupKeyboardModule = new KeyboardEvents(this.inputWrapper.container.children[1], {
                    eventName: 'keydown',
                    keyConfigs: this.keyInputConfigs,
                    keyAction: this.popupKeyActionHandle.bind(this)
                });
            }
        }
    }
    onMouseClick(event, item) {
        if (event.type === 'touchstart') {
            return;
        }
        const target = item || event.target;
        const li = closest(target, '.' + LISTCLASS);
        const isClick = li && li.classList.contains(ACTIVE$1);
        if (li && li.classList.contains(LISTCLASS)) {
            this.setListSelection(li, event);
        }
        this.preventFocus = true;
        this.inputElement.focus();
        if (!this.isMobile) {
            this.preventFocus = true;
            if (li && li.classList.contains(LISTCLASS) && li.getAttribute('id') === 'custom_range') {
                this.leftCalendar.children[1].firstElementChild.focus();
            }
            else {
                if (!isClick && event.type === 'keydown') {
                    this.inputElement.focus();
                }
            }
        }
    }
    onMouseOver(event) {
        const li = closest(event.target, '.' + LISTCLASS);
        if (li && li.classList.contains(LISTCLASS) && !li.classList.contains(HOVER)) {
            addClass([li], HOVER);
        }
    }
    onMouseLeave(event) {
        const item = closest(event.target, '.' + HOVER);
        if (!isNullOrUndefined(item)) {
            removeClass([item], HOVER);
        }
    }
    setListSelection(li, event) {
        if (li && (!li.classList.contains(ACTIVE$1) || (this.isMobile && li.classList.contains(ACTIVE$1)))) {
            if (this.isMobile && li.classList.contains(ACTIVE$1)) {
                this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(li);
                const values = this.presetsItem[this.activeIndex];
                if (values.id === 'custom_range') {
                    this.renderCustomPopup();
                    return;
                }
                return;
            }
            this.removeListSelection();
            this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(li);
            addClass([li], ACTIVE$1);
            li.setAttribute('aria-selected', 'true');
            const values = this.presetsItem[this.activeIndex];
            if (values.id === 'custom_range') {
                this.renderCustomPopup();
            }
            else {
                this.applyPresetRange(values, event);
            }
        }
    }
    removeListSelection() {
        const item = this.presetElement.querySelector('.' + ACTIVE$1);
        if (!isNullOrUndefined(item)) {
            removeClass([item], ACTIVE$1);
            item.removeAttribute('aria-selected');
        }
    }
    setValue() {
        this.modelValue = [this.startValue, this.endValue];
    }
    applyPresetRange(values, e) {
        this.hide(null);
        this.presetsItem[this.presetsItem.length - 1].start = null;
        this.presetsItem[this.presetsItem.length - 1].end = null;
        this.startValue = values.start;
        this.endValue = values.end;
        this.setValue();
        this.refreshControl();
        this.trigger('select', this.rangeArgs(e));
        this.changeTrigger(e);
        this.previousEleValue = this.inputElement.value;
        this.isCustomRange = false;
        this.leftCalendar = this.rightCalendar = null;
        if (this.isKeyPopup) {
            this.isRangeIconClicked = false;
            this.inputElement.focus();
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showPopup(element, event) {
        this.presetHeight();
        if (this.zIndex === 1000) {
            this.popupObj.show(null, this.element);
        }
        else {
            this.popupObj.show(null, null);
        }
        if (this.isMobile) {
            this.popupObj.refreshPosition();
        }
    }
    renderCustomPopup() {
        this.isCustomWindow = true;
        this.popupObj.hide();
        this.popupWrapper = this.createElement('div', { id: this.element.id + '_popup', className: ROOT$2 + ' ' + POPUP$1 });
        this.renderControl();
        this.openEventArgs = {
            popup: this.popupObj || null,
            cancel: false,
            date: this.inputElement.value,
            model: this,
            event: event ? event : null,
            appendTo: this.isMobile || Browser.isDevice ? this.mobileRangePopupWrap : document.body
        };
        const eventArgs = this.openEventArgs;
        this.trigger('open', eventArgs, (eventArgs) => {
            this.openEventArgs = eventArgs;
            if (this.openEventArgs.cancel) {
                return;
            }
        });
        this.openEventArgs.appendTo.appendChild(this.popupWrapper);
        this.showPopup();
        this.isCustomRange = true;
        if (!this.isMobile) {
            this.calendarFocus();
        }
    }
    listRippleEffect() {
        for (const li of this.liCollections) {
            rippleEffect(li);
        }
    }
    createPresets() {
        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
            this.presetElement = this.createElement('div', { className: PRESETS, attrs: { 'tabindex': '0' } });
            const listTag = ListBase.createList(this.createElement, this.presetsItem, null, true);
            attributes(listTag, { 'role': 'listbox', 'aria-hidden': 'false', 'id': this.element.id + '_options', 'tabindex': '0', 'aria-label': 'daterangepicker-preset' });
            this.presetElement.appendChild(listTag);
            this.popupWrapper.appendChild(this.presetElement);
            const customElement = this.presetElement.querySelector('#custom_range');
            if (!isNullOrUndefined(customElement)) {
                customElement.textContent = this.l10n.getConstant('customRange') !== '' ? this.l10n.getConstant('customRange')
                    : 'Custom Range';
            }
            this.liCollections = this.presetElement.querySelectorAll('.' + LISTCLASS);
            this.wireListEvents();
            if (this.isMobile) {
                if (this.fullScreenMode) {
                    const modelWrapper = createElement('div', { className: 'e-range-mob-popup-wrap' });
                    const modelHeader = this.createElement('div', { className: 'e-model-header' });
                    const modelTitleSpan = this.createElement('span', { className: 'e-model-title' });
                    modelTitleSpan.textContent = 'Select Preset';
                    const modelCloseIcon = this.createElement('span', { className: 'e-popup-close' });
                    EventHandler.add(modelCloseIcon, 'mousedown touchstart', this.modelRangeCloseHandler, this);
                    const presetContent = this.presetElement;
                    modelHeader.appendChild(modelCloseIcon);
                    modelHeader.appendChild(modelTitleSpan);
                    modelWrapper.appendChild(modelHeader);
                    modelWrapper.appendChild(presetContent);
                    this.popupWrapper.insertBefore(modelWrapper, this.popupWrapper.firstElementChild);
                    this.presetElement.style.width = '100%';
                }
                else {
                    this.presetElement.style.width = this.inputWrapper.container.getBoundingClientRect().width + 'px';
                }
            }
            if (!isNullOrUndefined(this.activeIndex) && this.activeIndex > -1) {
                addClass([this.liCollections[this.activeIndex]], ACTIVE$1);
            }
        }
    }
    wireListEvents() {
        EventHandler.add(this.presetElement, 'click', this.onMouseClick, this);
        if (!this.isMobile) {
            EventHandler.add(this.presetElement, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.presetElement, 'mouseout', this.onMouseLeave, this);
        }
    }
    unWireListEvents() {
        if (!isNullOrUndefined(this.presetElement)) {
            EventHandler.remove(this.presetElement, 'click touchstart', this.onMouseClick);
            if (!this.isMobile) {
                EventHandler.remove(this.presetElement, 'mouseover', this.onMouseOver);
                EventHandler.remove(this.presetElement, 'mouseout', this.onMouseLeave);
            }
        }
    }
    renderPopup() {
        this.popupWrapper.classList.add('e-control');
        const popupWidth = this.popupWrapper.getBoundingClientRect().width;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass.trim() !== '') {
            this.popupWrapper.className += ' ' + this.cssClass;
        }
        if (this.isMobile && this.isCustomWindow) {
            this.modal = this.createElement('div');
            document.body.appendChild(this.modal);
        }
        this.popupObj = new Popup(this.popupWrapper, {
            relateTo: this.isMobile && this.isCustomWindow ? document.body :
                (!isNullOrUndefined(this.targetElement) ? this.targetElement : this.inputWrapper.container),
            position: (this.isMobile ?
                (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && !this.isCustomWindow ?
                    { X: 'left', Y: 'bottom' } : { X: 'center', Y: 'center' }) :
                this.enableRtl ? { X: 'left', Y: 'bottom' } : { X: 'right', Y: 'bottom' }),
            offsetX: this.isMobile || this.enableRtl ? 0 : -popupWidth,
            offsetY: OFFSETVALUE$1,
            collision: this.isMobile ?
                (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && !this.isCustomWindow ?
                    { X: 'fit' } : { X: 'fit', Y: 'fit' }) : { X: 'fit', Y: 'flip' },
            targetType: this.isMobile && this.isCustomWindow ? 'container' : 'relative',
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            open: () => {
                if (this.isMobile && this.fullScreenMode) {
                    this.iconRangeRight = this.calendarElement && window.getComputedStyle(this.calendarElement.querySelector('.e-header.e-month .e-prev')).cssFloat;
                    if (this.iconRangeRight) {
                        this.touchRangeModule = new Touch(this.calendarElement.querySelector('.e-content.e-month'), {
                            swipe: this.dateRangeSwipeHandler.bind(this)
                        });
                        EventHandler.add(this.calendarElement.querySelector('.e-content.e-month'), 'touchstart', this.touchStartRangeHandler, this);
                    }
                }
                attributes(this.inputElement, { 'aria-expanded': 'true', 'aria-owns': this.element.id, 'aria-controls': this.inputElement.id });
                if (this.value) {
                    attributes(this.inputElement, { 'aria-activedescendant': this.inputElement.id });
                }
                else {
                    this.inputElement.removeAttribute('aria-activedescendant');
                }
                addClass([this.inputWrapper.buttons[0]], ACTIVE$1);
                if (!this.isMobile) {
                    if (this.cancelButton) {
                        this.btnKeyboardModule = new KeyboardEvents(this.cancelButton.element, {
                            eventName: 'keydown',
                            keyAction: this.popupKeyActionHandle.bind(this),
                            keyConfigs: { tab: 'tab', altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                        this.btnKeyboardModule = new KeyboardEvents(this.applyButton.element, {
                            eventName: 'keydown',
                            keyAction: this.popupKeyActionHandle.bind(this),
                            keyConfigs: { altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                    }
                    if (!isNullOrUndefined(this.leftCalendar)) {
                        if (!this.isRangeIconClicked) {
                            this.calendarFocus();
                        }
                    }
                    if (!isNullOrUndefined(this.presetElement)) {
                        this.keyInputConfigs = extend(this.keyInputConfigs, this.keyConfigs);
                        this.presetKeyboardModule = new KeyboardEvents(this.presetElement, {
                            eventName: 'keydown',
                            keyAction: this.presetKeyActionHandler.bind(this),
                            keyConfigs: this.keyInputConfigs
                        });
                        this.presetKeyboardModule = new KeyboardEvents(this.presetElement, {
                            eventName: 'keydown',
                            keyAction: this.popupKeyActionHandle.bind(this),
                            keyConfigs: { altRightArrow: 'alt+rightarrow', altLeftArrow: 'alt+leftarrow' }
                        });
                        if (isNullOrUndefined(this.leftCalendar)) {
                            this.preventBlur = true;
                            this.presetElement.focus();
                        }
                        else {
                            this.presetElement.setAttribute('tabindex', '-1');
                        }
                    }
                    this.popupKeyBoardHandler();
                }
                if (this.isMobile && !Browser.isDevice) {
                    EventHandler.add(document, 'keydown', this.popupCloseHandler, this);
                }
            },
            close: () => {
                attributes(this.inputElement, { 'aria-expanded': 'false' });
                this.inputElement.removeAttribute('aria-owns');
                this.inputElement.removeAttribute('aria-controls');
                this.inputElement.removeAttribute('aria-activedescendant');
                removeClass([this.inputWrapper.buttons[0]], ACTIVE$1);
                if (this.isRangeIconClicked) {
                    this.inputWrapper.container.children[1].focus();
                }
                if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label)) {
                    this.unWireListEvents();
                }
                if (this.applyButton) {
                    this.applyButton.destroy();
                }
                if (this.cancelButton) {
                    this.cancelButton.destroy();
                }
                if (this.isMobile && this.endButton) {
                    this.endButton.destroy();
                }
                if (this.isMobile && this.startButton) {
                    this.startButton.destroy();
                }
                if (!isNullOrUndefined(this.popupObj)) {
                    if (!isNullOrUndefined(this.popupObj.element.parentElement)) {
                        detach(this.popupObj.element);
                    }
                    this.popupObj.destroy();
                    this.popupObj = null;
                }
                if (this.isMobile && !Browser.isDevice) {
                    EventHandler.remove(document, 'keydown', this.popupCloseHandler);
                }
            }, targetExitViewport: () => {
                const popupEle = this.popupObj && this.popupObj.element;
                if (!Browser.isDevice && popupEle && popupEle.getBoundingClientRect().height < window.innerHeight) {
                    this.hide();
                }
            }
        });
        if (this.isMobile) {
            this.popupObj.element.classList.add(DEVICE$1);
        }
        if (this.isMobile && this.isCustomWindow) {
            addClass([this.modal], [DEVICE$1, ROOT$2, 'e-range-modal']);
            document.body.className += ' ' + OVERFLOW$1;
            this.modal.style.display = 'block';
        }
        EventHandler.add(document, 'mousedown touchstart', this.documentHandler, this);
    }
    dateRangeSwipeHandler(e) {
        let direction = 0;
        if (this.iconRangeRight === 'left') {
            switch (e.swipeDirection) {
                case 'Left':
                    direction = 1;
                    break;
                case 'Right':
                    direction = -1;
                    break;
            }
        }
        else {
            switch (e.swipeDirection) {
                case 'Up':
                    direction = 1;
                    break;
                case 'Down':
                    direction = -1;
                    break;
            }
        }
        if (this.touchRangeStart) {
            if (direction === 1) {
                this.navigateNext(e);
            }
            else if (direction === -1) {
                this.navigatePrevious(e);
            }
            this.touchRangeStart = false;
        }
    }
    touchStartRangeHandler(e) {
        this.touchRangeStart = true;
    }
    popupCloseHandler(e) {
        switch (e.keyCode) {
            case 27:
                this.hide(e);
                break;
        }
    }
    calendarFocus() {
        const startDate = this.popupObj && this.popupObj.element.querySelector('.' + STARTDATE);
        if (startDate) {
            let ele = closest(startDate, '.' + RIGHTCALENDER);
            ele = isNullOrUndefined(ele) ? this.leftCalendar : ele;
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.focus();
            }
            else {
                this.preventBlur = true;
                ele.children[1].firstElementChild.focus();
            }
            addClass([startDate], FOCUSDATE);
        }
        else {
            if (this.isRangeIconClicked) {
                this.inputWrapper.container.focus();
            }
            else {
                this.preventBlur = true;
                this.leftCalendar.children[1].firstElementChild.focus();
            }
        }
    }
    presetHeight() {
        const presets = this.popupObj && this.popupObj.element.querySelector('.' + PRESETS);
        const rangeContainer = this.popupObj && this.popupObj.element.querySelector('.' + RANGECONTAINER);
        if (!isNullOrUndefined(presets) && !isNullOrUndefined(rangeContainer)) {
            presets.style.height = rangeContainer.getBoundingClientRect().height + 'px';
        }
    }
    presetKeyActionHandler(e) {
        switch (e.action) {
            case 'moveDown':
                this.listMoveDown(e);
                this.setScrollPosition();
                e.preventDefault();
                break;
            case 'moveUp':
                this.listMoveUp(e);
                this.setScrollPosition();
                e.preventDefault();
                break;
            case 'enter':
                {
                    const hvrItem = this.getHoverLI();
                    const actItem = this.getActiveLI();
                    if (!isNullOrUndefined(this.leftCalendar) && !isNullOrUndefined(actItem)) {
                        if (isNullOrUndefined(hvrItem) || (!isNullOrUndefined(actItem) && actItem === hvrItem)) {
                            this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(actItem);
                            const values = this.presetsItem[this.activeIndex];
                            if (values.id === 'custom_range') {
                                this.calendarFocus();
                                actItem.classList.remove(HOVER);
                                e.preventDefault();
                                return;
                            }
                        }
                    }
                    if (!isNullOrUndefined(hvrItem) || !isNullOrUndefined(actItem)) {
                        this.onMouseClick(e, hvrItem || actItem);
                    }
                    e.preventDefault();
                }
                break;
            case 'tab':
                if (this.leftCalendar) {
                    const item = this.getHoverLI();
                    if (!isNullOrUndefined(item)) {
                        item.classList.remove(HOVER);
                    }
                }
                else {
                    this.hide(e);
                    e.preventDefault();
                }
                break;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listMoveDown(e) {
        const hvrItem = this.getHoverLI();
        const actItem = this.getActiveLI();
        if (!isNullOrUndefined(hvrItem)) {
            const li = hvrItem.nextElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                removeClass([hvrItem], HOVER);
                addClass([li], HOVER);
            }
        }
        else if (!isNullOrUndefined(actItem)) {
            const li = actItem.nextElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                addClass([li], HOVER);
            }
        }
        else {
            addClass([this.liCollections[0]], HOVER);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    listMoveUp(e) {
        const hvrItem = this.getHoverLI();
        const actItem = this.getActiveLI();
        if (!isNullOrUndefined(hvrItem)) {
            const li = hvrItem.previousElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                removeClass([hvrItem], HOVER);
                addClass([li], HOVER);
            }
        }
        else if (!isNullOrUndefined(actItem)) {
            const li = actItem.previousElementSibling;
            if (!isNullOrUndefined(li) && li.classList.contains(LISTCLASS)) {
                addClass([li], HOVER);
            }
        }
    }
    getHoverLI() {
        const item = this.presetElement.querySelector('.' + HOVER);
        return item;
    }
    getActiveLI() {
        const item = this.presetElement.querySelector('.' + ACTIVE$1);
        return item;
    }
    popupKeyBoardHandler() {
        this.popupKeyboardModule = new KeyboardEvents(this.popupWrapper, {
            eventName: 'keydown',
            keyAction: this.popupKeyActionHandle.bind(this),
            keyConfigs: { escape: 'escape' }
        });
        this.keyInputConfigs = extend(this.keyInputConfigs, this.keyConfigs);
        this.popupKeyboardModule = new KeyboardEvents(this.inputWrapper.container.children[1], {
            eventName: 'keydown',
            keyAction: this.popupKeyActionHandle.bind(this),
            keyConfigs: this.keyInputConfigs
        });
    }
    setScrollPosition() {
        const listHeight = this.presetElement.getBoundingClientRect().height;
        const hover = this.presetElement.querySelector('.' + HOVER);
        const active = this.presetElement.querySelector('.' + ACTIVE$1);
        const element = !isNullOrUndefined(hover) ? hover : active;
        if (!isNullOrUndefined(element)) {
            const nextEle = element.nextElementSibling;
            const height = nextEle ? nextEle.offsetTop : element.offsetTop;
            const liHeight = element.getBoundingClientRect().height;
            if ((height + element.offsetTop) > listHeight) {
                this.presetElement.scrollTop = nextEle ? (height - (listHeight / 2 + liHeight / 2)) : height;
            }
            else {
                this.presetElement.scrollTop = 0;
            }
        }
    }
    popupKeyActionHandle(e) {
        const presetElement = closest(e.target, '.' + PRESETS);
        switch (e.action) {
            case 'escape':
                if (this.isPopupOpen()) {
                    if (this.isKeyPopup) {
                        this.inputElement.focus();
                        this.isKeyPopup = false;
                    }
                    this.hide(e);
                }
                else {
                    this.inputWrapper.container.children[1].blur();
                }
                break;
            case 'enter':
                if (!this.isPopupOpen()) {
                    this.show(null, e);
                }
                else {
                    this.inputWrapper.container.children[1].focus();
                }
                break;
            case 'tab':
                this.hide(e);
                break;
            case 'altRightArrow':
                if (!isNullOrUndefined(presetElement)) {
                    this.cancelButton.element.focus();
                }
                else {
                    if (document.activeElement === this.cancelButton.element && this.applyButton.element.disabled !== true) {
                        this.applyButton.element.focus();
                    }
                    else {
                        this.leftCalendar.children[1].firstElementChild.focus();
                    }
                }
                e.preventDefault();
                break;
            case 'altLeftArrow':
                if (!isNullOrUndefined(presetElement)) {
                    this.rightCalendar.children[1].firstElementChild.focus();
                }
                else {
                    if (document.activeElement === this.applyButton.element && this.applyButton.element.disabled !== true) {
                        this.cancelButton.element.focus();
                    }
                    else {
                        if (!isNullOrUndefined(this.presetElement) && (document.activeElement === this.cancelButton.element)) {
                            this.presetElement.focus();
                        }
                        else {
                            this.rightCalendar.children[1].firstElementChild.focus();
                        }
                    }
                }
                e.preventDefault();
                break;
        }
    }
    documentHandler(e) {
        if (isNullOrUndefined(this.popupObj)) {
            return;
        }
        const target = e.target;
        if (!this.inputWrapper.container.contains(target) ||
            (!isNullOrUndefined(this.popupObj) && !closest(target, '[id="' + this.popupWrapper.id + '"]') && e.type !== 'mousedown')) {
            if (e.type !== 'touchstart' && ((e.type === 'mousedown') ||
                this.closeEventArgs && !this.closeEventArgs.cancel)) {
                e.preventDefault();
            }
        }
        if ((isNullOrUndefined(this.targetElement) ||
            (!isNullOrUndefined(this.targetElement) && !(target === this.targetElement))) &&
            !(closest(target, '[id="' + this.popupWrapper.id + '"]'))
            && !(closest(target, '.' + INPUTCONTAINER$1) === this.inputWrapper.container)
            && !(closest(target, '.e-daterangepicker.e-popup') && (!target.classList.contains('e-day'))) && (!target.classList.contains('e-dlg-overlay'))) {
            this.preventBlur = false;
            if (this.isPopupOpen() && document.body.contains(this.popupObj.element)) {
                this.applyFunction(e);
                if (!this.isMobile) {
                    this.isRangeIconClicked = false;
                }
            }
        }
    }
    createInput() {
        if (this.fullScreenMode && this.isMobile) {
            this.cssClass += ' ' + 'e-popup-expand';
        }
        let updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        this.inputWrapper = Input.createInput({
            floatLabelType: this.floatLabelType,
            element: this.inputElement,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValue,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton
            },
            buttons: [DATERANGEICON]
        }, this.createElement);
        attributes(this.inputElement, {
            'tabindex': '0', 'aria-expanded': 'false', 'role': 'combobox',
            'autocomplete': 'off', 'aria-disabled': !this.enabled ? 'true' : 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false'
        });
        Input.addAttributes({ 'aria-label': 'select', 'role': 'button' }, this.inputWrapper.buttons[0]);
        // if (!isNullOrUndefined(this.placeholder) && this.placeholder.trim() !== '') {
        //     Input.addAttributes({ 'aria-placeholder': this.placeholder }, this.inputElement);
        // }
        this.setEleWidth(this.width);
        addClass([this.inputWrapper.container], DATERANGEWRAPPER);
        if (isNullOrUndefined(this.inputElement.getAttribute('name'))) {
            attributes(this.inputElement, { 'name': this.element.id });
        }
        if (this.inputElement.type === 'hidden') {
            this.inputWrapper.container.style.display = 'none';
        }
        this.refreshControl();
        this.previousEleValue = this.inputElement.value;
        this.inputElement.setAttribute('value', this.inputElement.value);
        this.startCopy = this.startDate;
        this.endCopy = this.endDate;
    }
    setEleWidth(width) {
        if (typeof width === 'string') {
            this.inputWrapper.container.style.width = (this.width);
        }
        else if (typeof width === 'number') {
            this.inputWrapper.container.style.width = formatUnit(this.width);
        }
        else {
            this.inputWrapper.container.style.width = '100%';
        }
    }
    adjustLongHeaderWidth() {
        if (this.dayHeaderFormat === 'Wide') {
            addClass([this.popupWrapper], DAYHEADERLONG$1);
        }
    }
    refreshControl() {
        this.validateMinMax();
        if (this.strictMode) {
            this.validateRangeStrict();
        }
        const isDisabled = this.disabledDates();
        if (this.strictMode && (isDisabled)) {
            this.startValue = this.previousStartValue;
            this.setProperties({ startDate: this.startValue }, true);
            this.endValue = this.previousEndValue;
            this.setProperties({ endDate: this.endValue }, true);
            this.setValue();
        }
        this.updateInput();
        if (!this.strictMode) {
            this.validateRange();
        }
        if (!this.strictMode && (isDisabled)) {
            this.clearRange();
        }
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue) &&
            !isDisabled && !isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
            this.disabledDateRender();
        }
        this.errorClass();
        this.previousStartValue = isNullOrUndefined(this.startValue) || isNaN(+this.startValue) ? null : new Date(+this.startValue);
        this.previousEndValue = isNullOrUndefined(this.endValue) || isNaN(+this.endValue) ? null : new Date(+this.endValue);
    }
    updateInput() {
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            const formatOption = { format: this.formatString, type: 'date', skeleton: 'yMd' };
            const startDate = this.globalize.formatDate(this.startValue, formatOption);
            const endDate = this.globalize.formatDate(this.endValue, formatOption);
            Input.setValue(startDate + ' ' + this.separator + ' ' + endDate, this.inputElement, this.floatLabelType, this.showClearButton);
            this.previousStartValue = new Date(+this.startValue);
            this.previousEndValue = new Date(+this.endValue);
        }
        if (!this.strictMode && isNullOrUndefined(this.value) && this.invalidValueString) {
            Input.setValue(this.invalidValueString, this.inputElement, this.floatLabelType, this.showClearButton);
        }
    }
    checkInvalidRange(value) {
        if (!isNullOrUndefined(value)) {
            let invalid = false;
            let startinvalue;
            let endinvalue;
            let startString = null;
            let endString = null;
            let valueString = null;
            let startObject = false;
            let endObject = false;
            let invalidobject = false;
            if (typeof (value) === 'string') {
                const range = value.split(' ' + this.separator + ' ');
                if (range.length === 2) {
                    startString = range[0];
                    endString = range[1];
                }
                else {
                    invalid = true;
                    valueString = value;
                }
            }
            else {
                if (value.length > 0) {
                    startinvalue = value[0];
                    endinvalue = value[1];
                }
                else {
                    startinvalue = value.start;
                    endinvalue = value.end;
                }
                if (!(startinvalue instanceof Date) && typeof (startinvalue) !== 'object') {
                    startString = this.getstringvalue(startinvalue);
                }
                else if (startinvalue instanceof Date) {
                    startObject = true;
                }
                else if (!isNullOrUndefined(startinvalue)) {
                    invalidobject = true;
                }
                if (!(endinvalue instanceof Date) && typeof (endinvalue) !== 'object') {
                    endString = this.getstringvalue(endinvalue);
                }
                else if (endinvalue instanceof Date) {
                    endObject = true;
                }
                else if (!isNullOrUndefined(endinvalue)) {
                    invalidobject = true;
                }
            }
            if ((isNullOrUndefined(startString) && !startObject && !isNullOrUndefined(endString)) ||
                (!isNullOrUndefined(startString) && !endObject && isNullOrUndefined(endString))) {
                invalid = true;
            }
            if (invalidobject) {
                startString = endString = valueString = null;
                invalid = true;
            }
            if (startString) {
                invalid = invalid || this.checkInvalidValue(startString);
            }
            if (endString) {
                invalid = invalid || this.checkInvalidValue(endString);
            }
            if (invalid) {
                if (startObject && !invalidobject) {
                    startString = startinvalue.toLocaleDateString();
                }
                if (endObject && !invalidobject) {
                    endString = endinvalue.toLocaleDateString();
                }
                if (!isNullOrUndefined(startString) && !isNullOrUndefined(endString)) {
                    valueString = startString + ' ' + this.separator + ' ' + endString;
                }
                else if (!isNullOrUndefined(startString)) {
                    valueString = startString;
                }
                else if (!isNullOrUndefined(endString)) {
                    valueString = endString;
                }
                this.invalidValueString = valueString;
                this.setProperties({ value: null }, true);
                this.setProperties({ startValue: null }, true);
                this.setProperties({ endValue: null }, true);
                this.startDate = null;
                this.endDate = null;
            }
        }
    }
    getstringvalue(value) {
        let stringValue = null;
        if (!isNullOrUndefined(value) && (typeof value === 'number')) {
            stringValue = (value).toString();
        }
        else if (!isNullOrUndefined(value) && (typeof value === 'string')) {
            stringValue = '' + value;
        }
        return stringValue;
    }
    checkInvalidValue(value) {
        const valueString = value;
        let invalid = false;
        let formatOpt = null;
        formatOpt = { format: this.formatString, type: 'date', skeleton: 'yMd' };
        if (typeof valueString !== 'string') {
            invalid = true;
        }
        else {
            const globalize = new Internationalization(this.locale);
            if (!this.checkDateValue(globalize.parseDate(valueString, formatOpt))) {
                let extISOStr = null;
                let basISOString = null;
                // eslint-disable-next-line
                extISOStr = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                // eslint-disable-next-line
                basISOString = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                if ((!extISOStr.test(valueString) && !basISOString.test(valueString))
                    || (/^[a-zA-Z0-9- ]*$/).test(valueString) || isNaN(+new Date(this.checkValue(valueString)))) {
                    invalid = true;
                }
            }
        }
        return invalid;
    }
    isDateDisabled(date) {
        if (isNullOrUndefined(date)) {
            return false;
        }
        const value = new Date(+date);
        if (+value < +this.min || +value > +this.max) {
            return true;
        }
        this.virtualRenderCellArgs = {
            date: value,
            isDisabled: false
        };
        const args = this.virtualRenderCellArgs;
        this.virtualRenderCellEvent(args);
        if (args.isDisabled) {
            return true;
        }
        return false;
    }
    disabledDateRender() {
        this.disabledDays = [];
        this.disabledDayCnt = null;
        const localDate = new Date(+this.startValue);
        let count = 0;
        while (+localDate <= +this.endValue && +this.endValue <= +this.max) {
            this.virtualRenderCellArgs = {
                date: localDate,
                isDisabled: false
            };
            const args = this.virtualRenderCellArgs;
            this.virtualRenderCellEvent(args);
            if (args.isDisabled) {
                this.disabledDays.push(new Date(+args.date));
                if (+localDate > +this.startValue && +localDate < +this.endValue) {
                    count++;
                }
            }
            this.addDay(localDate, 1, null, this.max, this.min);
        }
        this.disabledDayCnt = count;
    }
    virtualRenderCellEvent(args) {
        extend(this.virtualRenderCellArgs, { name: 'renderDayCell' });
        this.trigger('renderDayCell', args);
    }
    disabledDates() {
        let isStartDisabled = false;
        let isEndDisabled = false;
        if (!isNullOrUndefined(this.endValue) && !isNullOrUndefined(this.startValue)) {
            isStartDisabled = this.isDateDisabled(this.startValue);
            isEndDisabled = this.isDateDisabled(this.endValue);
            if (!this.isPopupOpen()) {
                this.currentDate = null;
            }
            this.setValue();
        }
        return (isStartDisabled || isEndDisabled);
    }
    setModelValue() {
        if (!this.value && this.startDate === null && this.endDate === null) {
            this.setProperties({ value: null }, true);
        }
        else if (this.value === null || this.value.start === null) {
            if (this.value === null) {
                this.setProperties({ value: [this.startDate, this.endDate] }, true);
            }
            else if (this.value.start === null) {
                this.setProperties({ value: { start: this.startDate, end: this.endDate } }, true);
            }
        }
        else {
            if ((this.value && this.value.length > 0) ||
                this.valueType && this.valueType.length > 0) {
                if (+this.startDate !== +this.value[0] || +this.endDate !== +this.value[1]) {
                    this.setProperties({ value: [this.startDate, this.endDate] }, true);
                }
                if (this.value && this.value[0] == null && this.value[1] == null) {
                    this.setProperties({ value: null }, true);
                }
            }
            else {
                if ((this.value && this.value.start)) {
                    this.setProperties({ value: { start: this.startDate, end: this.endDate } }, true);
                }
            }
        }
        this.createHiddenInput();
    }
    /**
     * To dispatch the event manually
     *
     * @param {HTMLElement} element - Specifies the element to dispatch the event.
     * @param {string} type - Specifies the name of the event.
     * @returns {void}
     */
    dispatchEvent(element, type) {
        const evt = document.createEvent('HTMLEvents');
        evt.initEvent(type, false, true);
        element.dispatchEvent(evt);
        this.firstHiddenChild.dispatchEvent(evt);
    }
    changeTrigger(e) {
        if (+this.initStartDate !== +this.startValue || +this.initEndDate !== +this.endValue) {
            this.setProperties({ endDate: this.checkDateValue(this.endValue) }, true);
            this.setProperties({ startDate: this.checkDateValue(this.startValue) }, true);
            this.setModelValue();
            if (this.isAngular && this.preventChange) {
                this.preventChange = false;
            }
            else {
                this.trigger('change', this.rangeArgs(e));
            }
        }
        this.previousEleValue = this.inputElement.value;
        this.initStartDate = this.checkDateValue(this.startValue);
        this.initEndDate = this.checkDateValue(this.endValue);
    }
    /**
     * This method is used to navigate to the month/year/decade view of the Calendar.
     *
     * @param  {string} view - Specifies the view of the Calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns {void}
     * @hidden
     */
    navigateTo(view, date) {
        if (this.isPopupOpen()) {
            if (view.toLowerCase() === 'month') {
                view = 'Month';
            }
            else if (view.toLowerCase() === 'year') {
                view = 'Year';
            }
            else if (view.toLowerCase() === 'decade') {
                view = 'Decade';
            }
            else {
                return;
            }
            if (this.getViewNumber(view) < this.getViewNumber(this.depth)) {
                view = this.depth;
            }
            if (this.isMobile) {
                super.navigateTo.call(this, view, date);
            }
            else {
                if (date < this.min) {
                    date = new Date(+this.min);
                }
                else if (date >= this.max) {
                    date = new Date(+this.max);
                }
                if (view === 'Month' && this.isSameMonth(date, this.max)) {
                    date = new Date(this.max.getFullYear(), this.max.getMonth() - 1, this.min.getDate());
                }
                else if (view === 'Year' && this.isSameYear(date, this.max)) {
                    date = new Date((this.max.getFullYear() - 1), this.max.getMonth(), this.max.getDate());
                }
                else if (view === 'Decade' && this.isSameDecade(date, this.max)) {
                    date = new Date((this.max.getFullYear() - 10), this.max.getMonth(), this.max.getDate());
                }
                this.leftCalCurrentDate = date;
                this.navigate(this.leftCalendar, this.leftCalCurrentDate, view);
                if (view === 'Month') {
                    date = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
                }
                else if (view === 'Year') {
                    date = new Date(this.currentDate.setFullYear(this.currentDate.getFullYear() + 1));
                }
                else {
                    date = new Date(this.currentDate.setFullYear(this.currentDate.getFullYear() + 10));
                }
                this.rightCalCurrentDate = date;
                this.navigate(this.rightCalendar, this.rightCalCurrentDate, view);
                this.leftKeyboardModule = this.rightKeyboardModule = null;
                this.updateNavIcons();
            }
            if (this.currentView() === this.depth) {
                this.bindCalendarCellEvents();
            }
            this.removeFocusedDate();
            this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
        }
    }
    navigate(calendar, date, view) {
        this.calendarElement = calendar;
        this.table = calendar.querySelector('table');
        this.tableBodyElement = calendar.querySelector('tbody');
        this.headerTitleElement = calendar.querySelector('.e-title');
        this.tableHeadElement = calendar.querySelector('thead');
        this.contentElement = calendar.querySelector('.e-content');
        this.previousIcon = calendar.querySelector('.e-prev');
        this.nextIcon = calendar.querySelector('.e-next');
        this.effect = ZOOMIN$1;
        super.navigateTo.call(this, view, date);
    }
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    focusIn() {
        if (document.activeElement !== this.inputElement && this.enabled) {
            addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
            this.inputElement.focus();
        }
    }
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    focusOut() {
        const isBlur = this.preventBlur;
        if (document.activeElement === this.inputElement) {
            removeClass([this.inputWrapper.container], [INPUTFOCUS$1]);
            this.preventBlur = false;
            this.inputElement.blur();
            this.preventBlur = isBlur;
        }
    }
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    destroy() {
        this.unBindEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        this.hide(null);
        const ariaAttrs = {
            'tabindex': '0', 'aria-expanded': 'false', 'role': 'combobox',
            'autocomplete': 'off', 'aria-disabled': !this.enabled ? 'true' : 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'aria-invalid': 'false', 'spellcheck': 'false'
        };
        if (this.inputElement) {
            removeClass([this.inputElement], [ROOT$2]);
            EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            Input.removeAttributes(ariaAttrs, this.inputElement);
            if (!isNullOrUndefined(this.cloneElement.getAttribute('tabindex'))) {
                this.inputElement.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.inputElement.removeAttribute('tabindex');
            }
            this.ensureInputAttribute();
            this.inputElement.classList.remove('e-input');
            if (!isNullOrUndefined(this.inputWrapper)) {
                EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.rangeIconHandler);
                if (this.angularTag === null) {
                    this.inputWrapper.container.parentElement.appendChild(this.inputElement);
                }
                detach(this.inputWrapper.container);
            }
        }
        if (!isNullOrUndefined(this.inputKeyboardModule) && !this.isMobile) {
            this.inputKeyboardModule.destroy();
        }
        if (this.popupObj) {
            if (!this.isMobile) {
                this.clearCalendarEvents();
            }
        }
        Input.destroy({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        super.destroy();
        this.inputWrapper = this.popupWrapper = this.popupObj = this.cloneElement = this.presetElement = null;
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
        if ((!isNullOrUndefined(this.firstHiddenChild))
            && (!isNullOrUndefined(this.secondHiddenChild))) {
            detach(this.firstHiddenChild);
            detach(this.secondHiddenChild);
            this.firstHiddenChild = this.secondHiddenChild = null;
            this.inputElement.setAttribute('name', this.element.getAttribute('data-name'));
            this.inputElement.removeAttribute('data-name');
        }
        this.closeEventArgs = null;
        this.leftCalendar = null;
        this.rightTitle = null;
        this.leftTitle = null;
        this.openEventArgs = null;
        this.leftCalNextIcon = null;
        this.rightCalendar = null;
        this.closeEventArgs = null;
        this.rightCalPrevIcon = null;
        this.leftCalPrevIcon = null;
        this.popupKeyboardModule = null;
        this.cancelButton = null;
        this.applyButton = null;
        this.calendarElement = null;
        this.leftKeyboardModule = null;
        this.rightCalNextIcon = null;
        this.leftCalNextIcon = null;
        this.btnKeyboardModule = null;
        this.rightKeyboardModule = null;
        this.leftKeyboardModule = null;
        this.presetKeyboardModule = null;
        this.liCollections = null;
        this.popupObj = null;
        this.popupWrapper = null;
    }
    ensureInputAttribute() {
        const attr = [];
        for (let i = 0; i < this.inputElement.attributes.length; i++) {
            attr[i] = this.inputElement.attributes[i].name;
        }
        for (let i = 0; i < attr.length; i++) {
            if (isNullOrUndefined(this.cloneElement.getAttribute(attr[i]))) {
                if (attr[i].toLowerCase() === 'value') {
                    this.inputElement.value = '';
                }
                this.inputElement.removeAttribute(attr[i]);
            }
            else {
                if (attr[i].toLowerCase() === 'value') {
                    this.inputElement.value = this.cloneElement.getAttribute(attr[i]);
                }
                this.inputElement.setAttribute(attr[i], this.cloneElement.getAttribute(attr[i]));
            }
        }
    }
    /**
     * To get component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    getModuleName() {
        return 'daterangepicker';
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Return the properties that are maintained upon browser refresh.
     *
     * @returns {string}
     */
    getPersistData() {
        const keyEntity = ['startDate', 'endDate', 'value'];
        return this.addOnPersist(keyEntity);
    }
    /**
     * Return the selected range and day span in the DateRangePicker.
     *
     * @returns {Object}
     */
    getSelectedRange() {
        let range;
        if (!isNullOrUndefined(this.startValue) && !isNullOrUndefined(this.endValue)) {
            range = (Math.round(Math.abs((this.removeTimeValueFromDate(this.startValue).getTime() -
                this.removeTimeValueFromDate(this.endValue).getTime()) / (1000 * 60 * 60 * 24))) + 1);
            if (!isNullOrUndefined(this.renderDayCellArgs) && this.renderDayCellArgs.isDisabled) {
                this.disabledDateRender();
            }
            if (!isNullOrUndefined(this.disabledDayCnt)) {
                range = range - this.disabledDayCnt;
                this.disabledDayCnt = null;
            }
        }
        else {
            range = 0;
        }
        return { startDate: this.startValue, endDate: this.endValue, daySpan: range };
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * To open the Popup container in the DateRangePicker component.
     *
     * @param {HTMLElement} element - Specifies element.
     * @returns {void}
     */
    show(element, event) {
        if (this.isMobile && this.popupObj) {
            this.popupObj.refreshPosition();
        }
        if ((this.enabled && this.readonly) || !this.enabled || this.popupObj) {
            return;
        }
        else {
            if (!this.isPopupOpen()) {
                if (element) {
                    this.targetElement = element;
                }
                this.createPopup();
                if (this.isMobile || Browser.isDevice) {
                    this.mobileRangePopupWrap = this.createElement('div', { className: 'e-daterangepick-mob-popup-wrap' });
                    document.body.appendChild(this.mobileRangePopupWrap);
                }
                this.openEventArgs = {
                    popup: this.popupObj || null,
                    cancel: false,
                    date: this.inputElement.value,
                    model: this,
                    event: event ? event : null,
                    appendTo: this.isMobile || Browser.isDevice ? this.mobileRangePopupWrap : document.body
                };
                const eventArgs = this.openEventArgs;
                this.trigger('open', eventArgs, (eventArgs) => {
                    this.openEventArgs = eventArgs;
                    if (!this.openEventArgs.cancel) {
                        this.openEventArgs.appendTo.appendChild(this.popupWrapper);
                        this.showPopup(element, event);
                        const isPreset = (!this.isCustomRange || (this.isMobile && this.isCustomRange));
                        if (!isUndefined(this.presets[0].start && this.presets[0].end && this.presets[0].label) && isPreset) {
                            this.setScrollPosition();
                        }
                        this.checkMinMaxDays();
                        if ((this.isMobile) && (!isNullOrUndefined(this.startDate)) && (isNullOrUndefined(this.endDate))) {
                            this.endButton.element.classList.add(ACTIVE$1);
                            this.startButton.element.classList.remove(ACTIVE$1);
                            this.endButton.element.removeAttribute('disabled');
                            this.selectableDates();
                        }
                        super.setOverlayIndex(this.mobileRangePopupWrap, this.popupObj.element, this.modal, this.isMobile || Browser.isDevice);
                        if (Browser.isDevice) {
                            const dlgOverlay = this.createElement('div', { className: 'e-dlg-overlay' });
                            dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
                            this.mobileRangePopupWrap.appendChild(dlgOverlay);
                        }
                    }
                });
            }
        }
    }
    /**
     * To close the Popup container in the DateRangePicker component.
     *
     * @returns {void}
     */
    hide(event) {
        if (this.popupObj) {
            if (isNullOrUndefined(this.previousEndValue) && isNullOrUndefined(this.previousStartValue)) {
                this.clearRange();
            }
            else {
                if (!isNullOrUndefined(this.previousStartValue)) {
                    this.startValue = new Date(this.checkValue(this.previousStartValue));
                    this.setValue();
                    this.currentDate = new Date(this.checkValue(this.startValue));
                }
                else {
                    this.startValue = null;
                    this.setValue();
                }
                if (!isNullOrUndefined(this.previousEndValue)) {
                    this.endValue = new Date(this.checkValue(this.previousEndValue));
                    this.setValue();
                }
                else {
                    this.endValue = null;
                    this.setValue();
                }
            }
            if (this.isPopupOpen()) {
                this.closeEventArgs = {
                    cancel: false,
                    popup: this.popupObj,
                    date: this.inputElement.value,
                    model: this,
                    event: event ? event : null
                };
                const eventArgs = this.closeEventArgs;
                this.trigger('close', eventArgs, (eventArgs) => {
                    this.closeEventArgs = eventArgs;
                    if (!this.closeEventArgs.cancel) {
                        if (this.isMobile) {
                            if (!isNullOrUndefined(this.startButton) && !isNullOrUndefined(this.endButton)) {
                                EventHandler.remove(this.startButton.element, 'click touchstart', this.deviceHeaderClick);
                                EventHandler.remove(this.endButton.element, 'click touchstart', this.deviceHeaderClick);
                            }
                        }
                        if (this.popupObj) {
                            this.popupObj.hide();
                            if (this.preventBlur) {
                                this.inputElement.focus();
                                addClass([this.inputWrapper.container], [INPUTFOCUS$1]);
                            }
                        }
                        if (!this.isMobile) {
                            if (!isNullOrUndefined(this.leftKeyboardModule) && !isNullOrUndefined(this.rightKeyboardModule)) {
                                this.leftKeyboardModule.destroy();
                                this.rightKeyboardModule.destroy();
                            }
                            if (!isNullOrUndefined(this.presetElement)) {
                                this.presetKeyboardModule.destroy();
                            }
                            if (!isNullOrUndefined(this.cancelButton)) {
                                this.btnKeyboardModule.destroy();
                            }
                        }
                        this.targetElement = null;
                        removeClass([document.body], OVERFLOW$1);
                        EventHandler.remove(document, 'mousedown touchstart', this.documentHandler);
                        if (this.isMobile && this.modal) {
                            this.modal.style.display = 'none';
                            this.modal.outerHTML = '';
                            this.modal = null;
                        }
                        if (this.isMobile || Browser.isDevice) {
                            if (!isNullOrUndefined(this.mobileRangePopupWrap)) {
                                this.mobileRangePopupWrap.remove();
                                this.mobileRangePopupWrap = null;
                            }
                        }
                        this.isKeyPopup = this.dateDisabled = false;
                    }
                    else {
                        removeClass([this.inputWrapper.buttons[0]], ACTIVE$1);
                    }
                    this.updateClearIconState();
                    this.updateHiddenInput();
                    if (this.isMobile && this.allowEdit && !this.readonly) {
                        this.inputElement.removeAttribute('readonly');
                    }
                });
            }
        }
        else {
            this.updateClearIconState();
            this.updateHiddenInput();
            if (this.isMobile && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-param */
    setLocale() {
        this.globalize = new Internationalization(this.locale);
        this.l10n.setLocale(this.locale);
        if (this.dateRangeOptions && this.dateRangeOptions.placeholder == null) {
            this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
            Input.setPlaceholder(this.placeholder, this.inputElement);
        }
        this.updateInput();
        this.updateHiddenInput();
        this.changeTrigger();
    }
    refreshChange() {
        this.checkView();
        this.refreshControl();
        this.changeTrigger();
    }
    setDate() {
        Input.setValue('', this.inputElement, this.floatLabelType, this.showClearButton);
        this.refreshChange();
    }
    enableInput() {
        if (+this.min <= +this.max) {
            this.setProperties({ enabled: true }, true);
            Input.setEnabled(this.enabled, this.inputElement);
            if (this.element.hasAttribute('disabled')) {
                this.bindEvents();
            }
        }
    }
    clearModelvalue(newProp, oldProp) {
        this.setProperties({ startDate: null }, true);
        this.setProperties({ endDate: null }, true);
        if (oldProp.value && oldProp.value.length > 0) {
            this.setProperties({ value: null }, true);
        }
        else if (oldProp.value && oldProp.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        else if (oldProp.value && !oldProp.value.start) {
            this.setProperties({ value: { start: null, end: null } }, true);
        }
        this.updateValue();
        this.setDate();
    }
    createHiddenInput() {
        if (isNullOrUndefined(this.firstHiddenChild) && isNullOrUndefined(this.secondHiddenChild)) {
            this.firstHiddenChild = this.createElement('input');
            this.secondHiddenChild = this.createElement('input');
        }
        if (!isNullOrUndefined(this.inputElement.getAttribute('name'))) {
            this.inputElement.setAttribute('data-name', this.inputElement.getAttribute('name'));
            this.inputElement.removeAttribute('name');
        }
        attributes(this.firstHiddenChild, {
            'type': 'text', 'name': this.inputElement.getAttribute('data-name'), 'class': HIDDENELEMENT
        });
        attributes(this.secondHiddenChild, {
            'type': 'text', 'name': this.inputElement.getAttribute('data-name'), 'class': HIDDENELEMENT
        });
        const format = { format: this.formatString, type: 'datetime', skeleton: 'yMd' };
        this.firstHiddenChild.value = this.startDate && this.globalize.formatDate(this.startDate, format);
        this.secondHiddenChild.value = this.endDate && this.globalize.formatDate(this.endDate, format);
        this.inputElement.parentElement.appendChild(this.firstHiddenChild);
        this.inputElement.parentElement.appendChild(this.secondHiddenChild);
    }
    setMinMaxDays() {
        if (this.isPopupOpen()) {
            this.removeClassDisabled();
            this.checkMinMaxDays();
            if (this.isMobile) {
                this.selectableDates();
            }
            if (!this.strictMode && (isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue))) {
                this.removeSelection();
            }
            else {
                this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
            }
            this.updateHeader();
        }
    }
    getAmPmValue(date) {
        try {
            if (typeof date === 'string' && date.trim() !== '') {
                // Replace am/pm variants with uppercase AM/PM
                return date.replace(/(am|pm|Am|aM|pM|Pm)/g, (match) => match.toLocaleUpperCase());
            }
            // If date is null, undefined, or an empty string, return a default value or empty string
            return '';
        }
        catch (error) {
            console.error('Error occurred while processing date:', error);
            return ''; // Return a default value in case of an error
        }
    }
    getStartEndValue(date, isEnd) {
        if (this.depth === 'Month') {
            return this.checkDateValue(new Date(this.checkValue(date)));
        }
        else if (this.depth === 'Year') {
            return new Date(date.getFullYear(), date.getMonth() + (isEnd ? 1 : 0), isEnd ? 0 : 1);
        }
        else {
            return new Date(date.getFullYear(), isEnd ? 11 : 0, isEnd ? 31 : 1);
        }
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DateRangePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DateRangePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        const format = { format: this.formatString, type: 'date', skeleton: 'yMd' };
        let isDynamicValueChange = false;
        for (const prop of Object.keys(newProp)) {
            const openPopup = ['blur', 'change', 'cleared', 'close', 'created', 'destroyed', 'focus', 'navigated', 'open', 'renderDayCell', 'select'];
            if (openPopup.indexOf(prop) > 0 && this.isReact) {
                isDynamicValueChange = true;
            }
            switch (prop) {
                case 'width':
                    this.setEleWidth(this.width);
                    Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'separator':
                    this.previousEleValue = this.inputElement.value;
                    this.setProperties({ separator: newProp.separator }, true);
                    this.updateInput();
                    this.changeTrigger();
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputElement);
                    this.setProperties({ placeholder: newProp.placeholder }, true);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    this.setRangeAllowEdit();
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enabled':
                    this.setProperties({ enabled: newProp.enabled }, true);
                    Input.setEnabled(this.enabled, this.inputElement);
                    if (this.enabled) {
                        this.inputElement.setAttribute('tabindex', this.tabIndex);
                    }
                    else {
                        this.inputElement.tabIndex = -1;
                    }
                    break;
                case 'allowEdit':
                    this.setRangeAllowEdit();
                    break;
                case 'enableRtl':
                    this.setProperties({ enableRtl: newProp.enableRtl }, true);
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    break;
                case 'format':
                    this.setProperties({ format: newProp.format }, true);
                    this.checkFormat();
                    this.updateInput();
                    this.changeTrigger();
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    if (this.dateRangeOptions && this.dateRangeOptions.placeholder == null) {
                        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                        Input.setPlaceholder(this.placeholder, this.inputElement);
                    }
                    this.setLocale();
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.setDataAttribute(true);
                    this.checkHtmlAttributes(true);
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.inputElement, this.inputWrapper);
                    this.bindClearEvent();
                    break;
                case 'startDate':
                    if (typeof newProp.startDate === 'string') {
                        newProp.startDate = this.globalize.parseDate(this.getAmPmValue(newProp.startDate), format);
                    }
                    if (+this.initStartDate !== +newProp.startDate) {
                        this.startValue = this.getStartEndValue(newProp.startDate, false);
                        this.setDate();
                        this.setValue();
                    }
                    break;
                case 'endDate':
                    if (typeof newProp.endDate === 'string') {
                        newProp.endDate = this.globalize.parseDate(this.getAmPmValue(newProp.endDate), format);
                    }
                    if (+this.initEndDate !== +newProp.endDate) {
                        this.endValue = this.getStartEndValue(newProp.endDate, true);
                        this.setDate();
                        this.setValue();
                    }
                    break;
                case 'value':
                    isDynamicValueChange = true;
                    this.invalidValueString = null;
                    this.checkInvalidRange(newProp.value);
                    if (typeof (newProp.value) === 'string') {
                        if (!this.invalidValueString) {
                            const rangeArray = newProp.value.split(' ' + this.separator + ' ');
                            this.value = [new Date(rangeArray[0]), new Date(rangeArray[1])];
                            this.updateValue();
                            this.setDate();
                        }
                        else {
                            this.clearModelvalue(newProp, oldProp);
                        }
                    }
                    else {
                        if ((!isNullOrUndefined(newProp.value) && newProp.value.length > 0)
                            || !isNullOrUndefined(newProp.value) && newProp.value.start) {
                            this.valueType = newProp.value;
                            if (newProp.value[0] === null || (newProp.value.start === null)) {
                                if (newProp.value.length === 1 || (newProp.value.start)) {
                                    this.clearModelvalue(newProp, oldProp);
                                }
                                else if (newProp.value[1] === null ||
                                    (newProp.value.start === null)) {
                                    this.clearModelvalue(newProp, oldProp);
                                }
                            }
                            else if ((+this.initStartDate !== +newProp.value[0]
                                || +this.initEndDate !== +newProp.value[1]) ||
                                (+this.initStartDate !== +(newProp.value.start
                                    || +this.initEndDate !== +newProp.value.start))) {
                                if (newProp.value.length === 1) {
                                    this.modelValue = newProp.value;
                                }
                                else if (newProp.value.start) {
                                    this.modelValue = newProp.value;
                                }
                                this.updateValue();
                                this.setDate();
                            }
                        }
                        else {
                            if (isNullOrUndefined(this.value)
                                || newProp.value.start == null) {
                                this.valueType = newProp.value;
                                this.startValue = null;
                                this.endValue = null;
                                this.clearModelvalue(newProp, oldProp);
                            }
                        }
                    }
                    if (this.isPopupOpen()) {
                        if (isNullOrUndefined(this.startValue) && isNullOrUndefined(this.endValue)) {
                            this.removeSelection();
                            if (this.isMobile) {
                                this.deviceHeaderUpdate();
                            }
                            return;
                        }
                        if (this.isMobile) {
                            this.navigate(this.deviceCalendar, this.startValue, this.currentView());
                            this.deviceHeaderUpdate();
                        }
                        else {
                            this.navigate(this.leftCalendar, this.startValue, this.currentView());
                            this.updateControl(this.leftCalendar);
                            this.navigate(this.rightCalendar, this.endValue, this.currentView());
                            this.updateControl(this.rightCalendar);
                        }
                        this.updateRange((this.isMobile ? [this.calendarElement] : [this.leftCalendar, this.rightCalendar]));
                        this.updateHeader();
                        this.applyButton.disabled = this.applyButton.element.disabled = false;
                    }
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    break;
                case 'minDays':
                    isDynamicValueChange = true;
                    this.setProperties({ minDays: newProp.minDays }, true);
                    this.refreshChange();
                    this.setMinMaxDays();
                    break;
                case 'maxDays':
                    isDynamicValueChange = true;
                    this.setProperties({ maxDays: newProp.maxDays }, true);
                    this.refreshChange();
                    this.setMinMaxDays();
                    break;
                case 'min':
                    this.setProperties({ min: this.checkDateValue(new Date(this.checkValue(newProp.min))) }, true);
                    this.previousEleValue = this.inputElement.value;
                    this.enableInput();
                    this.refreshChange();
                    break;
                case 'max':
                    this.setProperties({ max: this.checkDateValue(new Date(this.checkValue(newProp.max))) }, true);
                    this.enableInput();
                    this.refreshChange();
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    this.setProperties({ strictMode: newProp.strictMode }, true);
                    this.refreshChange();
                    break;
                case 'presets':
                    this.setProperties({ presets: newProp.presets }, true);
                    this.processPresets();
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'start':
                    this.setProperties({ start: newProp.start }, true);
                    this.refreshChange();
                    break;
                case 'depth':
                    this.setProperties({ depth: newProp.depth }, true);
                    this.refreshChange();
                    break;
            }
            if (!isDynamicValueChange) {
                this.hide(null);
            }
        }
    }
};
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "value", void 0);
__decorate$2([
    Property(false)
], DateRangePicker.prototype, "enablePersistence", void 0);
__decorate$2([
    Property(new Date(1900, 0, 1))
], DateRangePicker.prototype, "min", void 0);
__decorate$2([
    Property(new Date(2099, 11, 31))
], DateRangePicker.prototype, "max", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "locale", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "firstDayOfWeek", void 0);
__decorate$2([
    Property(false)
], DateRangePicker.prototype, "weekNumber", void 0);
__decorate$2([
    Property('Gregorian')
], DateRangePicker.prototype, "calendarMode", void 0);
__decorate$2([
    Property(false)
], DateRangePicker.prototype, "openOnFocus", void 0);
__decorate$2([
    Property(false)
], DateRangePicker.prototype, "fullScreenMode", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "created", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "destroyed", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "change", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "cleared", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "navigated", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "renderDayCell", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "startDate", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "endDate", void 0);
__decorate$2([
    Collection([{}], Presets)
], DateRangePicker.prototype, "presets", void 0);
__decorate$2([
    Property('')
], DateRangePicker.prototype, "width", void 0);
__decorate$2([
    Property(1000)
], DateRangePicker.prototype, "zIndex", void 0);
__decorate$2([
    Property(true)
], DateRangePicker.prototype, "showClearButton", void 0);
__decorate$2([
    Property(true)
], DateRangePicker.prototype, "showTodayButton", void 0);
__decorate$2([
    Property('Month')
], DateRangePicker.prototype, "start", void 0);
__decorate$2([
    Property('Month')
], DateRangePicker.prototype, "depth", void 0);
__decorate$2([
    Property('')
], DateRangePicker.prototype, "cssClass", void 0);
__decorate$2([
    Property('-')
], DateRangePicker.prototype, "separator", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "minDays", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "maxDays", void 0);
__decorate$2([
    Property(false)
], DateRangePicker.prototype, "strictMode", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "keyConfigs", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "format", void 0);
__decorate$2([
    Property(true)
], DateRangePicker.prototype, "enabled", void 0);
__decorate$2([
    Property(false)
], DateRangePicker.prototype, "readonly", void 0);
__decorate$2([
    Property(true)
], DateRangePicker.prototype, "allowEdit", void 0);
__decorate$2([
    Property('Never')
], DateRangePicker.prototype, "floatLabelType", void 0);
__decorate$2([
    Property(null)
], DateRangePicker.prototype, "placeholder", void 0);
__decorate$2([
    Property({})
], DateRangePicker.prototype, "htmlAttributes", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "open", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "close", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "select", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "focus", void 0);
__decorate$2([
    Event()
], DateRangePicker.prototype, "blur", void 0);
DateRangePicker = __decorate$2([
    NotifyPropertyChanges
], DateRangePicker);

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const WRAPPERCLASS = 'e-time-wrapper';
const POPUP$2 = 'e-popup';
const ERROR$2 = 'e-error';
const POPUPDIMENSION = '240px';
const DAY = new Date().getDate();
const MONTH$2 = new Date().getMonth();
const YEAR$2 = new Date().getFullYear();
const ROOT$3 = 'e-timepicker';
const LIBRARY$2 = 'e-lib';
const CONTROL$2 = 'e-control';
const CONTENT$2 = 'e-content';
const SELECTED$4 = 'e-active';
const HOVER$1 = 'e-hover';
const NAVIGATION = 'e-navigation';
const DISABLED$3 = 'e-disabled';
const ICONANIMATION = 'e-icon-anim';
const FOCUS = 'e-input-focus';
const LISTCLASS$1 = 'e-list-item';
const HALFPOSITION = 2;
const ANIMATIONDURATION = 50;
const OVERFLOW$2 = 'e-time-overflow';
const OFFSETVAL = 4;
const EDITABLE = 'e-non-edit';
const wrapperAttributes = ['title', 'class', 'style'];
// eslint-disable-next-line @typescript-eslint/no-namespace
var TimePickerBase;
(function (TimePickerBase) {
    // eslint-disable-next-line max-len, jsdoc/require-jsdoc
    function createListItems(createdEl, min, max, globalize, timeFormat, step) {
        if (this.calendarMode === 'Gregorian') ;
        let start;
        const interval = step * 60000;
        const listItems = [];
        const timeCollections = [];
        start = +(min.setMilliseconds(0));
        const end = +(max.setMilliseconds(0));
        while (end >= start) {
            timeCollections.push(start);
            listItems.push(globalize.formatDate(new Date(start), { format: timeFormat, type: 'time' }));
            start += interval;
        }
        const listTag = ListBase.createList(createdEl, listItems, null, true);
        return { collection: timeCollections, list: listTag };
    }
    TimePickerBase.createListItems = createListItems;
})(TimePickerBase || (TimePickerBase = {}));
class TimeMaskPlaceholder extends ChildProperty {
}
__decorate$3([
    Property('day')
], TimeMaskPlaceholder.prototype, "day", void 0);
__decorate$3([
    Property('month')
], TimeMaskPlaceholder.prototype, "month", void 0);
__decorate$3([
    Property('year')
], TimeMaskPlaceholder.prototype, "year", void 0);
__decorate$3([
    Property('day of the week')
], TimeMaskPlaceholder.prototype, "dayOfTheWeek", void 0);
__decorate$3([
    Property('hour')
], TimeMaskPlaceholder.prototype, "hour", void 0);
__decorate$3([
    Property('minute')
], TimeMaskPlaceholder.prototype, "minute", void 0);
__decorate$3([
    Property('second')
], TimeMaskPlaceholder.prototype, "second", void 0);
/**
 * TimePicker is an intuitive interface component which provides an options to select a time value
 * from popup list or to set a desired time value.
 * ```
 * <input id='timepicker' type='text'/>
 * <script>
 *   var timePickerObj = new TimePicker({ value: new Date() });
 *   timePickerObj.appendTo('#timepicker');
 * </script>
 * ```
 */
let TimePicker = class TimePicker extends Component {
    /**
     * Constructor for creating the widget
     *
     * @param {TimePickerModel} options - Specifies the TimePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.liCollections = [];
        this.timeCollections = [];
        this.disableItemCollection = [];
        this.invalidValueString = null;
        this.preventChange = false;
        this.maskedDateValue = '';
        this.moduleName = this.getModuleName();
        this.timeOptions = options;
    }
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    preRender() {
        this.keyConfigure = {
            enter: 'enter',
            escape: 'escape',
            end: 'end',
            tab: 'tab',
            home: 'home',
            down: 'downarrow',
            up: 'uparrow',
            left: 'leftarrow',
            right: 'rightarrow',
            open: 'alt+downarrow',
            close: 'alt+uparrow'
        };
        this.cloneElement = this.element.cloneNode(true);
        removeClass([this.cloneElement], [ROOT$3, CONTROL$2, LIBRARY$2]);
        this.inputElement = this.element;
        this.angularTag = null;
        this.formElement = closest(this.element, 'form');
        if (this.element.tagName === 'EJS-TIMEPICKER') {
            this.angularTag = this.element.tagName;
            this.inputElement = this.createElement('input');
            this.element.appendChild(this.inputElement);
        }
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
        this.element.removeAttribute('tabindex');
        this.openPopupEventArgs = {
            appendTo: document.body
        };
    }
    // element creation
    render() {
        this.initialize();
        this.createInputElement();
        this.updateHtmlAttributeToWrapper();
        this.setTimeAllowEdit();
        this.setEnable();
        this.validateInterval();
        this.bindEvents();
        this.validateDisable();
        this.setTimeZone();
        this.setValue(this.getFormattedValue(this.value));
        if (this.enableMask && !this.value && this.maskedDateValue && (this.floatLabelType === 'Always' || !this.floatLabelType || !this.placeholder)) {
            this.updateInputValue(this.maskedDateValue);
            this.checkErrorState(this.maskedDateValue);
        }
        this.anchor = this.inputElement;
        this.inputElement.setAttribute('value', this.inputElement.value);
        this.inputEleValue = this.getDateObject(this.inputElement.value);
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.renderComplete();
    }
    setTimeZone() {
        if (!isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            const clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            const serverTimezoneDiff = this.serverTimezoneOffset;
            let timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date((this.value).getTime() + (timeZoneDiff * 60 * 60 * 1000));
        }
    }
    isDayLightSaving() {
        const firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        const secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    }
    setTimeAllowEdit() {
        if (this.allowEdit) {
            if (!this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
        else {
            attributes(this.inputElement, { 'readonly': '' });
        }
        this.clearIconState();
    }
    clearIconState() {
        if (!this.allowEdit && this.inputWrapper && !this.readonly) {
            if (this.inputElement.value === '') {
                removeClass([this.inputWrapper.container], [EDITABLE]);
            }
            else {
                addClass([this.inputWrapper.container], [EDITABLE]);
            }
        }
        else if (this.inputWrapper) {
            removeClass([this.inputWrapper.container], [EDITABLE]);
        }
    }
    validateDisable() {
        this.setMinMax(this.initMin, this.initMax);
        if (!isNullOrUndefined(this.value)) {
            this.popupCreation();
            this.popupObj.destroy();
            this.popupWrapper = this.popupObj = null;
        }
        if ((!isNaN(+this.value) && this.value !== null)) {
            if (!this.valueIsDisable(this.value)) {
                //disable value given in value property so reset the date based on current date
                if (this.strictMode) {
                    this.resetState();
                }
                this.initValue = null;
                this.initMax = this.getDateObject(this.initMax);
                this.initMin = this.getDateObject(this.initMin);
                this.timeCollections = this.liCollections = [];
                this.setMinMax(this.initMin, this.initMax);
            }
        }
    }
    validationAttribute(target, input) {
        const name = target.getAttribute('name') ? target.getAttribute('name') : target.getAttribute('id');
        input.setAttribute('name', name);
        target.removeAttribute('name');
        const attributes = ['required', 'aria-required', 'form'];
        for (let i = 0; i < attributes.length; i++) {
            if (isNullOrUndefined(target.getAttribute(attributes[i]))) {
                continue;
            }
            const attr = target.getAttribute(attributes[i]);
            input.setAttribute(attributes[i], attr);
            target.removeAttribute(attributes[i]);
        }
    }
    initialize() {
        this.globalize = new Internationalization(this.locale);
        this.defaultCulture = new Internationalization('en');
        this.checkTimeFormat();
        this.checkInvalidValue(this.value);
        // persist the value property.
        this.setProperties({ value: this.checkDateValue(new Date(this.checkInValue(this.value))) }, true);
        this.setProperties({ min: this.checkDateValue(new Date(this.checkInValue(this.min))) }, true);
        this.setProperties({ max: this.checkDateValue(new Date(this.checkInValue(this.max))) }, true);
        this.setProperties({ scrollTo: this.checkDateValue(new Date(this.checkInValue(this.scrollTo))) }, true);
        if (this.angularTag !== null) {
            this.validationAttribute(this.element, this.inputElement);
        }
        this.updateHtmlAttributeToElement();
        this.checkAttributes(false); //check the input element attributes
        const localeText = { placeholder: this.placeholder };
        this.l10n = new L10n('timepicker', localeText, this.locale);
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        this.initValue = this.checkDateValue(this.value);
        this.initMin = this.checkDateValue(this.min);
        this.initMax = this.checkDateValue(this.max);
        this.isNavigate = this.isPreventBlur = this.isTextSelected = false;
        this.activeIndex = this.valueWithMinutes = this.prevDate = null;
        if (!isNullOrUndefined(this.element.getAttribute('id'))) {
            if (this.angularTag !== null) {
                this.inputElement.id = this.element.getAttribute('id') + '_input';
            }
        }
        else {
            //for angular case
            this.element.id = getUniqueID('ej2_timepicker');
            if (this.angularTag !== null) {
                attributes(this.inputElement, { 'id': this.element.id + '_input' });
            }
        }
        if (isNullOrUndefined(this.inputElement.getAttribute('name'))) {
            attributes(this.inputElement, { 'name': this.element.id });
        }
        if (this.enableMask) {
            this.notify('createMask', {
                module: 'MaskedDateTime'
            });
        }
    }
    checkTimeFormat() {
        if (this.format) {
            if (typeof this.format === 'string') {
                this.formatString = this.format;
            }
            else if (!isNullOrUndefined(this.format.skeleton) && this.format.skeleton !== '') {
                const skeletonString = this.format.skeleton;
                this.formatString = this.globalize.getDatePattern({ type: 'time', skeleton: skeletonString });
            }
            else {
                this.formatString = this.globalize.getDatePattern({ type: 'time', skeleton: 'short' });
            }
        }
        else {
            this.formatString = null;
        }
    }
    checkDateValue(value) {
        return (!isNullOrUndefined(value) && value instanceof Date && !isNaN(+value)) ? value : null;
    }
    createInputElement() {
        if (this.fullScreenMode && Browser.isDevice) {
            this.cssClass += ' ' + 'e-popup-expand';
        }
        let updatedCssClassesValue = this.cssClass;
        const isBindClearAction = this.enableMask ? false : true;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassesValue = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        this.inputWrapper = Input.createInput({
            element: this.inputElement,
            bindClearAction: isBindClearAction,
            floatLabelType: this.floatLabelType,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassesValue,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton
            },
            buttons: [' e-input-group-icon e-time-icon e-icons']
        }, this.createElement);
        this.inputWrapper.container.style.width = this.setWidth(this.width);
        attributes(this.inputElement, {
            'aria-autocomplete': 'list', 'tabindex': '0',
            'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false',
            'aria-disabled': 'false', 'aria-invalid': 'false'
        });
        if (!this.isNullOrEmpty(this.inputStyle)) {
            Input.addAttributes({ 'style': this.inputStyle }, this.inputElement);
        }
        addClass([this.inputWrapper.container], WRAPPERCLASS);
    }
    getCldrDateTimeFormat() {
        const culture = new Internationalization(this.locale);
        let cldrTime;
        const dateFormat = culture.getDatePattern({ skeleton: 'yMd' });
        if (this.isNullOrEmpty(this.formatString)) {
            cldrTime = dateFormat + ' ' + this.cldrFormat('time');
        }
        else {
            cldrTime = this.formatString;
        }
        return cldrTime;
    }
    checkInvalidValue(value) {
        let isInvalid = false;
        if (typeof value !== 'object' && !isNullOrUndefined(value)) {
            let valueString = value;
            if (typeof valueString === 'string') {
                valueString = valueString.trim();
            }
            let valueExpression = null;
            let valueExp = null;
            if (typeof value === 'number') {
                valueString = value.toString();
            }
            else if (typeof value === 'string') {
                if (!(/^[a-zA-Z0-9- ]*$/).test(value)) {
                    valueExpression = this.setCurrentDate(this.getDateObject(value));
                    if (isNullOrUndefined(valueExpression)) {
                        valueExpression = this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(valueString), {
                            format: this.getCldrDateTimeFormat(), type: 'datetime'
                        }));
                        if (isNullOrUndefined(valueExpression)) {
                            valueExpression = this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(valueString), {
                                format: this.formatString, type: 'dateTime', skeleton: 'yMd'
                            }));
                        }
                    }
                }
            }
            valueExp = this.globalize.parseDate(this.getAmPmValue(valueString), {
                format: this.getCldrDateTimeFormat(), type: 'datetime'
            });
            valueExpression = (!isNullOrUndefined(valueExp) && valueExp instanceof Date && !isNaN(+valueExp)) ? valueExp : null;
            if (isNullOrUndefined(valueExpression) && valueString.replace(/\s/g, '').length) {
                let extISOString = null;
                let basicISOString = null;
                // eslint-disable-next-line
                extISOString = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                // eslint-disable-next-line
                basicISOString = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                if ((!extISOString.test(valueString) && !basicISOString.test(valueString))
                    || ((/^[a-zA-Z0-9- ]*$/).test(value)) || isNaN(+new Date('' + valueString))) {
                    isInvalid = true;
                }
                else {
                    valueExpression = new Date('' + valueString);
                }
            }
            if (isInvalid) {
                if (!this.strictMode) {
                    this.invalidValueString = valueString;
                }
                this.setProperties({ value: null }, true);
                this.initValue = null;
            }
            else {
                this.setProperties({ value: valueExpression }, true);
                this.initValue = this.value;
            }
        }
    }
    requiredModules() {
        const modules = [];
        if (this.enableMask) {
            modules.push({ args: [this], member: 'MaskedDateTime' });
        }
        return modules;
    }
    getAmPmValue(date) {
        try {
            if (typeof date === 'string' && date.trim() !== '') {
                // Replace am/pm variants with uppercase AM/PM
                return date.replace(/(am|pm|Am|aM|pM|Pm)/g, (match) => match.toLocaleUpperCase());
            }
            // If date is null, undefined, or an empty string, return a default value or empty string
            return '';
        }
        catch (error) {
            console.error('Error occurred while processing date:', error);
            return ''; // Return a default value in case of an error
        }
    }
    cldrFormat(type) {
        let cldrDateTimeString;
        if (this.locale === 'en' || this.locale === 'en-US') {
            cldrDateTimeString = (getValue('timeFormats.short', getDefaultDateObject()));
        }
        else {
            cldrDateTimeString = (this.getCultureTimeObject(cldrData, '' + this.locale));
        }
        return cldrDateTimeString;
    }
    // destroy function
    destroy() {
        this.hide();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        this.unBindEvents();
        const ariaAttribute = {
            'aria-autocomplete': 'list', 'tabindex': '0',
            'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false',
            'aria-disabled': 'true', 'aria-invalid': 'false'
        };
        if (this.inputElement) {
            Input.removeAttributes(ariaAttribute, this.inputElement);
            if (this.angularTag === null) {
                this.inputWrapper.container.parentElement.appendChild(this.inputElement);
            }
            if (!isNullOrUndefined(this.cloneElement.getAttribute('tabindex'))) {
                this.inputElement.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.inputElement.removeAttribute('tabindex');
            }
            this.ensureInputAttribute();
            this.enableElement([this.inputElement]);
            this.inputElement.classList.remove('e-input');
            if (isNullOrUndefined(this.cloneElement.getAttribute('disabled'))) {
                Input.setEnabled(true, this.inputElement, this.floatLabelType);
            }
        }
        if (this.inputWrapper.container) {
            detach(this.inputWrapper.container);
        }
        this.inputWrapper = this.popupWrapper = this.cloneElement = undefined;
        this.liCollections = this.timeCollections = this.disableItemCollection = [];
        if (!isNullOrUndefined(this.rippleFn)) {
            this.rippleFn();
        }
        Input.destroy({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        super.destroy();
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
        this.rippleFn = null;
        this.openPopupEventArgs = null;
        this.selectedElement = null;
        this.listTag = null;
        this.liCollections = null;
    }
    ensureInputAttribute() {
        const propertyList = [];
        for (let i = 0; i < this.inputElement.attributes.length; i++) {
            propertyList[i] = this.inputElement.attributes[i].name;
        }
        for (let i = 0; i < propertyList.length; i++) {
            if (!isNullOrUndefined(this.cloneElement.getAttribute(propertyList[i]))) {
                this.inputElement.setAttribute(propertyList[i], this.cloneElement.getAttribute(propertyList[i]));
                if (propertyList[i].toLowerCase() === 'value') {
                    this.inputElement.value = this.cloneElement.getAttribute(propertyList[i]);
                }
            }
            else {
                this.inputElement.removeAttribute(propertyList[i]);
                if (propertyList[i].toLowerCase() === 'value') {
                    this.inputElement.value = '';
                }
            }
        }
    }
    //popup creation
    popupCreation() {
        this.popupWrapper = this.createElement('div', {
            className: ROOT$3 + ' ' + POPUP$2,
            attrs: { 'id': this.element.id + '_popup' }
        });
        this.popupWrapper.style.visibility = 'hidden';
        this.popupWrapper.setAttribute('aria-label', this.element.id);
        this.popupWrapper.setAttribute('role', 'dialog');
        if (!isNullOrUndefined(this.cssClass)) {
            this.popupWrapper.className += ' ' + this.cssClass;
        }
        if (!isNullOrUndefined(this.step) && this.step > 0) {
            this.generateList();
            append([this.listWrapper], this.popupWrapper);
        }
        this.addSelection();
        this.renderPopup();
        detach(this.popupWrapper);
    }
    getPopupHeight() {
        const height = parseInt(POPUPDIMENSION, 10);
        const popupHeight = this.popupWrapper.getBoundingClientRect().height;
        return popupHeight > height ? height : popupHeight;
    }
    generateList() {
        this.createListItems();
        this.wireListEvents();
        const rippleModel = { duration: 300, selector: '.' + LISTCLASS$1 };
        this.rippleFn = rippleEffect(this.listWrapper, rippleModel);
        this.liCollections = this.listWrapper.querySelectorAll('.' + LISTCLASS$1);
    }
    renderPopup() {
        this.containerStyle = this.inputWrapper.container.getBoundingClientRect();
        this.popupObj = new Popup(this.popupWrapper, {
            width: this.setPopupWidth(this.width),
            zIndex: this.zIndex,
            targetType: 'relative',
            position: Browser.isDevice ? { X: 'center', Y: 'center' } : { X: 'left', Y: 'bottom' },
            collision: Browser.isDevice ? { X: 'fit', Y: 'fit' } : { X: 'flip', Y: 'flip' },
            enableRtl: this.enableRtl,
            relateTo: Browser.isDevice ? document.body : this.inputWrapper.container,
            offsetY: OFFSETVAL,
            open: () => {
                this.popupWrapper.style.visibility = 'visible';
                addClass([this.inputWrapper.buttons[0]], SELECTED$4);
            }, close: () => {
                removeClass([this.inputWrapper.buttons[0]], SELECTED$4);
                this.unWireListEvents();
                this.inputElement.removeAttribute('aria-activedescendant');
                remove(this.popupObj.element);
                this.popupObj.destroy();
                this.popupWrapper.innerHTML = '';
                this.listWrapper = this.popupWrapper = this.listTag = undefined;
            }, targetExitViewport: () => {
                if (!Browser.isDevice) {
                    this.hide();
                }
            }
        });
        if (!Browser.isDevice) {
            this.popupObj.collision = { X: 'none', Y: 'flip' };
        }
        if (Browser.isDevice && this.fullScreenMode) {
            this.popupObj.element.style.maxHeight = '100%';
            this.popupObj.element.style.width = '100%';
        }
        else {
            this.popupObj.element.style.maxHeight = POPUPDIMENSION;
        }
        if (Browser.isDevice && this.fullScreenMode) {
            const modelHeader = this.createElement('div', { className: 'e-model-header' });
            const modelTitleSpan = this.createElement('span', { className: 'e-model-title' });
            modelTitleSpan.textContent = 'Select time';
            const modelCloseIcon = this.createElement('span', { className: 'e-popup-close' });
            EventHandler.add(modelCloseIcon, 'mousedown touchstart', this.timePopupCloseHandler, this);
            modelHeader.appendChild(modelCloseIcon);
            modelHeader.appendChild(modelTitleSpan);
            this.popupWrapper.insertBefore(modelHeader, this.popupWrapper.firstElementChild);
        }
    }
    timePopupCloseHandler(e) {
        this.hide();
    }
    //util function
    getFormattedValue(value) {
        if (isNullOrUndefined(this.checkDateValue(value))) {
            return null;
        }
        else {
            return this.globalize.formatDate(value, { skeleton: 'medium', type: 'time' });
        }
    }
    getDateObject(text) {
        if (!this.isNullOrEmpty(text)) {
            const dateValue = this.createDateObj(text);
            const value = !this.isNullOrEmpty(this.initValue);
            if (this.checkDateValue(dateValue)) {
                const date = value ? this.initValue.getDate() : DAY;
                const month = value ? this.initValue.getMonth() : MONTH$2;
                const year = value ? this.initValue.getFullYear() : YEAR$2;
                return new Date(year, month, date, dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds());
            }
        }
        return null;
    }
    updateHtmlAttributeToWrapper() {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (const key of Object.keys(this.htmlAttributes)) {
                if (wrapperAttributes.indexOf(key) > -1) {
                    if (key === 'class') {
                        const updatedClassesValue = (this.htmlAttributes[`${key}`].replace(/\s+/g, ' ')).trim();
                        if (updatedClassesValue !== '') {
                            addClass([this.inputWrapper.container], updatedClassesValue.split(' '));
                        }
                    }
                    else if (key === 'style') {
                        let timeStyle = this.inputWrapper.container.getAttribute(key);
                        timeStyle = !isNullOrUndefined(timeStyle) ? (timeStyle + this.htmlAttributes[`${key}`]) :
                            this.htmlAttributes[`${key}`];
                        this.inputWrapper.container.setAttribute(key, timeStyle);
                    }
                    else {
                        this.inputWrapper.container.setAttribute(key, this.htmlAttributes[`${key}`]);
                    }
                }
            }
        }
    }
    updateHtmlAttributeToElement() {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (const key of Object.keys(this.htmlAttributes)) {
                if (wrapperAttributes.indexOf(key) < 0) {
                    this.inputElement.setAttribute(key, this.htmlAttributes[`${key}`]);
                }
            }
        }
    }
    updateCssClass(cssClassNew, cssClassOld) {
        if (!isNullOrUndefined(cssClassOld)) {
            cssClassOld = (cssClassOld.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(cssClassNew)) {
            cssClassNew = (cssClassNew.replace(/\s+/g, ' ')).trim();
        }
        Input.setCssClass(cssClassNew, [this.inputWrapper.container], cssClassOld);
        if (this.popupWrapper) {
            Input.setCssClass(cssClassNew, [this.popupWrapper], cssClassOld);
        }
    }
    removeErrorClass() {
        removeClass([this.inputWrapper.container], ERROR$2);
        attributes(this.inputElement, { 'aria-invalid': 'false' });
    }
    checkErrorState(val) {
        const value = this.getDateObject(val);
        if ((this.validateState(value) && !this.invalidValueString) ||
            (this.enableMask && this.inputElement.value === this.maskedDateValue)) {
            this.removeErrorClass();
        }
        else {
            addClass([this.inputWrapper.container], ERROR$2);
            attributes(this.inputElement, { 'aria-invalid': 'true' });
        }
    }
    validateInterval() {
        if (!isNullOrUndefined(this.step) && this.step > 0) {
            this.enableElement([this.inputWrapper.buttons[0]]);
        }
        else {
            this.disableTimeIcon();
        }
    }
    disableTimeIcon() {
        this.disableElement([this.inputWrapper.buttons[0]]);
        this.hide();
    }
    disableElement(element) {
        addClass(element, DISABLED$3);
    }
    enableElement(element) {
        removeClass(element, DISABLED$3);
    }
    selectInputText() {
        this.inputElement.setSelectionRange(0, (this.inputElement).value.length);
    }
    setCursorToEnd() {
        this.inputElement.setSelectionRange((this.inputElement).value.length, (this.inputElement).value.length);
    }
    getMeridianText() {
        let meridian;
        if (this.locale === 'en' || this.locale === 'en-US') {
            meridian = getValue('dayPeriods.format.wide', getDefaultDateObject());
        }
        else {
            const gregorianFormat = '.dates.calendars.gregorian.dayPeriods.format.abbreviated';
            const mainVal = 'main.';
            meridian = getValue(mainVal + '' + this.locale + gregorianFormat, cldrData);
        }
        return meridian;
    }
    getCursorSelection() {
        const input = (this.inputElement);
        let start = 0;
        let end = 0;
        if (!isNaN(input.selectionStart)) {
            start = input.selectionStart;
            end = input.selectionEnd;
        }
        return { start: Math.abs(start), end: Math.abs(end) };
    }
    getActiveElement() {
        if (!isNullOrUndefined(this.popupWrapper)) {
            return this.popupWrapper.querySelectorAll('.' + SELECTED$4);
        }
        else {
            return null;
        }
    }
    isNullOrEmpty(value) {
        if (isNullOrUndefined(value) || (typeof value === 'string' && value.trim() === '')) {
            return true;
        }
        else {
            return false;
        }
    }
    setWidth(width) {
        if (typeof width === 'number') {
            width = formatUnit(width);
        }
        else if (typeof width === 'string') {
            width = (width.match(/px|%|em/)) ? width : formatUnit(width);
        }
        else {
            width = '100%';
        }
        return width;
    }
    setPopupWidth(width) {
        width = this.setWidth(width);
        if (width.indexOf('%') > -1) {
            const inputWidth = this.containerStyle.width * parseFloat(width) / 100;
            width = inputWidth.toString() + 'px';
        }
        return width;
    }
    setScrollPosition() {
        const element = this.selectedElement;
        if (!isNullOrUndefined(element)) {
            this.findScrollTop(element);
        }
        else if (this.popupWrapper && this.checkDateValue(this.scrollTo)) {
            this.setScrollTo();
        }
    }
    findScrollTop(element) {
        const listHeight = this.getPopupHeight();
        const nextEle = element.nextElementSibling;
        const height = nextEle ? nextEle.offsetTop : element.offsetTop;
        const liHeight = element.getBoundingClientRect().height;
        if ((height + element.offsetTop) > listHeight) {
            this.popupWrapper.scrollTop = nextEle ? (height - (listHeight / HALFPOSITION + liHeight / HALFPOSITION)) : height;
        }
        else {
            this.popupWrapper.scrollTop = 0;
        }
    }
    setScrollTo() {
        let element;
        if (!isNullOrUndefined(this.popupWrapper)) {
            const items = this.popupWrapper.querySelectorAll('.' + LISTCLASS$1);
            if (items.length) {
                const initialTime = this.timeCollections[0];
                const scrollTime = this.getDateObject(this.checkDateValue(this.scrollTo)).getTime();
                element = items[Math.round((scrollTime - initialTime) / (this.step * 60000))];
            }
        }
        else {
            this.popupWrapper.scrollTop = 0;
        }
        if (!isNullOrUndefined(element)) {
            this.findScrollTop(element);
        }
        else {
            this.popupWrapper.scrollTop = 0;
        }
    }
    getText() {
        return (isNullOrUndefined(this.checkDateValue(this.value))) ? '' : this.getValue(this.value);
    }
    getValue(value) {
        return (isNullOrUndefined(this.checkDateValue(value))) ? null : this.globalize.formatDate(value, {
            format: this.cldrTimeFormat(), type: 'time'
        });
    }
    cldrDateFormat() {
        let cldrDate;
        if (this.locale === 'en' || this.locale === 'en-US') {
            cldrDate = (getValue('dateFormats.short', getDefaultDateObject()));
        }
        else {
            cldrDate = (this.getCultureDateObject(cldrData, '' + this.locale));
        }
        return cldrDate;
    }
    cldrTimeFormat() {
        let cldrTime;
        if (this.isNullOrEmpty(this.formatString)) {
            if (this.locale === 'en' || this.locale === 'en-US') {
                cldrTime = (getValue('timeFormats.short', getDefaultDateObject()));
            }
            else {
                cldrTime = (this.getCultureTimeObject(cldrData, '' + this.locale));
            }
        }
        else {
            cldrTime = this.formatString;
        }
        return cldrTime;
    }
    dateToNumeric() {
        let cldrTime;
        if (this.locale === 'en' || this.locale === 'en-US') {
            cldrTime = (getValue('timeFormats.medium', getDefaultDateObject()));
        }
        else {
            cldrTime = (getValue('main.' + '' + this.locale + '.dates.calendars.gregorian.timeFormats.medium', cldrData));
        }
        return cldrTime;
    }
    getExactDateTime(value) {
        if (isNullOrUndefined(this.checkDateValue(value))) {
            return null;
        }
        else {
            return this.globalize.formatDate(value, { format: this.dateToNumeric(), type: 'time' });
        }
    }
    setValue(value) {
        const time = this.checkValue(value);
        if (!this.strictMode && !this.validateState(time)) {
            if (this.checkDateValue(this.valueWithMinutes) === null) {
                this.initValue = this.valueWithMinutes = null;
            }
            this.validateMinMax(this.value, this.min, this.max);
        }
        else {
            if (this.isNullOrEmpty(time)) {
                this.initValue = null;
                this.validateMinMax(this.value, this.min, this.max);
            }
            else {
                this.initValue = this.compareFormatChange(time);
            }
        }
        this.updateInput(true, this.initValue);
    }
    compareFormatChange(value) {
        if (isNullOrUndefined(value)) {
            return null;
        }
        return (value !== this.getText()) ? this.getDateObject(value) : this.getDateObject(this.value);
    }
    updatePlaceHolder() {
        Input.setPlaceholder(this.l10n.getConstant('placeholder'), this.inputElement);
    }
    //event related functions
    updateInputValue(value) {
        Input.setValue(value, this.inputElement, this.floatLabelType, this.showClearButton);
    }
    preventEventBubbling(e) {
        e.preventDefault();
        this.interopAdaptor.invokeMethodAsync('OnTimeIconClick');
    }
    popupHandler(e) {
        if (!this.enabled) {
            return;
        }
        if (Browser.isDevice) {
            this.inputElement.setAttribute('readonly', '');
        }
        e.preventDefault();
        if (this.isPopupOpen()) {
            this.closePopup(0, e);
        }
        else {
            this.inputElement.focus();
            this.show(e);
        }
    }
    mouseDownHandler() {
        if (!this.enabled) {
            return;
        }
        if (!this.readonly) {
            this.inputElement.setSelectionRange(0, 0);
            EventHandler.add(this.inputElement, 'mouseup', this.mouseUpHandler, this);
        }
    }
    mouseUpHandler(event) {
        if (!this.readonly) {
            event.preventDefault();
            if (this.enableMask) {
                event.preventDefault();
                this.notify('setMaskSelection', {
                    module: 'MaskedDateTime'
                });
                return;
            }
            else {
                EventHandler.remove(this.inputElement, 'mouseup', this.mouseUpHandler);
                const curPos = this.getCursorSelection();
                if (!(curPos.start === 0 && curPos.end === this.inputElement.value.length)) {
                    if (this.inputElement.value.length > 0) {
                        this.cursorDetails = this.focusSelection();
                    }
                    this.inputElement.setSelectionRange(this.cursorDetails.start, this.cursorDetails.end);
                }
            }
        }
    }
    focusSelection() {
        const regex = new RegExp('^[a-zA-Z0-9]+$');
        const split = this.inputElement.value.split('');
        split.push(' ');
        const curPos = this.getCursorSelection();
        let start = 0;
        let end = 0;
        let isSeparator = false;
        if (!this.isTextSelected) {
            for (let i = 0; i < split.length; i++) {
                if (!regex.test(split[i])) {
                    end = i;
                    isSeparator = true;
                }
                if (isSeparator) {
                    if (curPos.start >= start && curPos.end <= end) {
                        // eslint-disable-next-line no-self-assign
                        end = end;
                        this.isTextSelected = true;
                        break;
                    }
                    else {
                        start = i + 1;
                        isSeparator = false;
                    }
                }
            }
        }
        else {
            start = curPos.start;
            end = curPos.end;
            this.isTextSelected = false;
        }
        return { start: start, end: end };
    }
    inputHandler(event) {
        if (!this.readonly && this.enabled) {
            if (!((event.action === 'right' || event.action === 'left' || event.action === 'tab') || ((event.action === 'home' || event.action === 'end' || event.action === 'up' || event.action === 'down') && !this.isPopupOpen() && !this.enableMask))) {
                event.preventDefault();
            }
            switch (event.action) {
                case 'home':
                case 'end':
                case 'up':
                case 'down':
                    if (!this.isPopupOpen()) {
                        this.popupCreation();
                        this.popupObj.destroy();
                        this.popupObj = this.popupWrapper = null;
                    }
                    if (this.enableMask && !this.readonly && !this.isPopupOpen()) {
                        event.preventDefault();
                        this.notify('keyDownHandler', {
                            module: 'MaskedDateTime',
                            e: event
                        });
                    }
                    if (this.isPopupOpen()) {
                        this.keyHandler(event);
                    }
                    break;
                case 'enter':
                    if (this.isNavigate) {
                        this.selectedElement = this.liCollections[this.activeIndex];
                        this.valueWithMinutes = new Date(this.timeCollections[this.activeIndex]);
                        this.updateValue(this.valueWithMinutes, event);
                    }
                    else {
                        this.updateValue(this.inputElement.value, event);
                    }
                    this.hide();
                    this.isNavigate = false;
                    if (this.isPopupOpen()) {
                        event.stopPropagation();
                    }
                    break;
                case 'open':
                    this.show(event);
                    break;
                case 'escape':
                    this.updateInputValue(this.objToString(this.value));
                    if (this.enableMask) {
                        if (!this.value) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                        this.createMask();
                    }
                    this.previousState(this.value);
                    this.hide();
                    break;
                case 'close':
                    this.hide();
                    break;
                case 'right':
                case 'left':
                case 'tab':
                case 'shiftTab':
                    if (!this.isPopupOpen() && this.enableMask && !this.readonly) {
                        if ((this.inputElement.selectionStart === 0 && this.inputElement.selectionEnd === this.inputElement.value.length) ||
                            (this.inputElement.selectionEnd !== this.inputElement.value.length && event.action === 'tab') ||
                            (this.inputElement.selectionStart !== 0 && event.action === 'shiftTab') || (event.action === 'left' || event.action === 'right')) {
                            event.preventDefault();
                        }
                        this.notify('keyDownHandler', { module: 'MaskedDateTime',
                            e: event
                        });
                    }
                    break;
                default:
                    this.isNavigate = false;
                    break;
            }
        }
    }
    onMouseClick(event) {
        const target = event.target;
        const li = this.selectedElement = closest(target, '.' + LISTCLASS$1);
        this.setSelection(li, event);
        if (li && li.classList.contains(LISTCLASS$1)) {
            this.hide();
        }
    }
    closePopup(delay, e) {
        if (this.isPopupOpen() && this.popupWrapper) {
            const args = {
                popup: this.popupObj,
                event: e || null,
                cancel: false,
                name: 'open'
            };
            removeClass([document.body], OVERFLOW$2);
            this.trigger('close', args, (args) => {
                if (!args.cancel) {
                    const animModel = {
                        name: 'FadeOut',
                        duration: ANIMATIONDURATION,
                        delay: delay ? delay : 0
                    };
                    this.popupObj.hide(new Animation(animModel));
                    removeClass([this.inputWrapper.container], [ICONANIMATION]);
                    attributes(this.inputElement, { 'aria-expanded': 'false' });
                    this.inputElement.removeAttribute('aria-owns');
                    this.inputElement.removeAttribute('aria-controls');
                    this.inputElement.removeAttribute('aria-activedescendant');
                    EventHandler.remove(document, 'mousedown touchstart', this.documentClickHandler);
                }
                if (Browser.isDevice && this.modal) {
                    this.modal.style.display = 'none';
                    this.modal.outerHTML = '';
                    this.modal = null;
                }
                if (Browser.isDevice) {
                    if (!isNullOrUndefined(this.mobileTimePopupWrap)) {
                        this.mobileTimePopupWrap.remove();
                        this.mobileTimePopupWrap = null;
                    }
                }
                if (Browser.isDevice && this.allowEdit && !this.readonly) {
                    this.inputElement.removeAttribute('readonly');
                }
            });
        }
        else {
            if (Browser.isDevice && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
    }
    disposeServerPopup() {
        if (this.popupWrapper) {
            this.popupWrapper.style.visibility = 'hidden';
            this.popupWrapper.style.top = '-9999px';
            this.popupWrapper.style.left = '-9999px';
            this.popupWrapper.style.width = '0px';
            this.popupWrapper.style.height = '0px';
        }
    }
    checkValueChange(event, isNavigation) {
        if (!this.strictMode && !this.validateState(this.valueWithMinutes)) {
            if (this.checkDateValue(this.valueWithMinutes) === null) {
                this.initValue = this.valueWithMinutes = null;
            }
            this.setProperties({ value: this.compareFormatChange(this.inputElement.value) }, true);
            this.initValue = this.valueWithMinutes = this.compareFormatChange(this.inputElement.value);
            this.prevValue = this.inputElement.value;
            if (+this.prevDate !== +this.value) {
                this.changeEvent(event);
            }
        }
        else {
            if (!isNavigation) {
                const value = this.compareFormatChange(this.inputElement.value);
                if ((+this.prevDate !== +value) || isNullOrUndefined(this.checkDateValue(this.value))) {
                    this.valueProcess(event, value);
                }
            }
            else {
                const value = this.getDateObject(new Date(this.timeCollections[this.activeIndex]));
                if (+this.prevDate !== +value) {
                    this.valueProcess(event, value);
                }
            }
        }
    }
    onMouseOver(event) {
        const currentLi = closest(event.target, '.' + LISTCLASS$1);
        this.setHover(currentLi, HOVER$1);
    }
    setHover(li, className) {
        if (this.enabled && this.isValidLI(li) && !li.classList.contains(className)) {
            this.removeHover(className);
            addClass([li], className);
            if (className === NAVIGATION) {
                li.setAttribute('aria-selected', 'true');
            }
        }
    }
    setSelection(li, event) {
        if (this.isValidLI(li)) {
            this.checkValue(li.getAttribute('data-value'));
            if (this.enableMask) {
                this.createMask();
            }
            this.selectedElement = li;
            this.activeIndex = Array.prototype.slice.call(this.liCollections).indexOf(li);
            this.valueWithMinutes = new Date(this.timeCollections[this.activeIndex]);
            addClass([this.selectedElement], SELECTED$4);
            this.selectedElement.setAttribute('aria-selected', 'true');
            this.checkValueChange(event, true);
        }
    }
    onMouseLeave() {
        this.removeHover(HOVER$1);
    }
    scrollHandler() {
        if (this.getModuleName() === 'timepicker' && Browser.isDevice) {
            return;
        }
        else {
            this.hide();
        }
    }
    setMinMax(minVal, maxVal) {
        if (isNullOrUndefined(this.checkDateValue(minVal))) {
            this.initMin = this.getDateObject('12:00:00 AM');
        }
        if (isNullOrUndefined(this.checkDateValue(maxVal))) {
            this.initMax = this.getDateObject('11:59:59 PM');
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    validateMinMax(dateVal, minVal, maxVal) {
        const value = dateVal instanceof Date ? dateVal : this.getDateObject(dateVal);
        if (!isNullOrUndefined(this.checkDateValue(value))) {
            dateVal = this.strictOperation(this.initMin, this.initMax, dateVal, value);
        }
        else if (+(this.createDateObj(this.getFormattedValue(this.initMin))) >
            +(this.createDateObj(this.getFormattedValue(this.initMax)))) {
            this.disableTimeIcon();
        }
        if (this.strictMode) {
            dateVal = this.valueIsDisable(dateVal) ? dateVal : null;
        }
        this.checkErrorState(dateVal);
        return dateVal;
    }
    valueIsDisable(value) {
        if (!isNullOrUndefined(this.disableItemCollection) && this.disableItemCollection.length > 0) {
            if (this.disableItemCollection.length === this.timeCollections.length) {
                return false;
            }
            const time = value instanceof Date ? this.objToString(value) : value;
            for (let index = 0; index < this.disableItemCollection.length; index++) {
                if (time === this.disableItemCollection[index]) {
                    return false;
                }
            }
        }
        return true;
    }
    validateState(val) {
        if (!this.strictMode) {
            if (this.valueIsDisable(val)) {
                const value = typeof val === 'string' ? this.setCurrentDate(this.getDateObject(val)) :
                    this.setCurrentDate(this.getDateObject(val));
                const maxValue = this.setCurrentDate(this.getDateObject(this.initMax));
                const minValue = this.setCurrentDate(this.getDateObject(this.initMin));
                if (!isNullOrUndefined(this.checkDateValue(value))) {
                    if ((+(value) > +(maxValue)) || (+(value) < +(minValue))) {
                        return false;
                    }
                }
                else {
                    if ((+(maxValue) < +(minValue)) || this.inputElement.value !== '') {
                        return false;
                    }
                }
            }
            else {
                return false;
            }
        }
        return true;
    }
    strictOperation(minimum, maximum, dateVal, val) {
        const maxValue = this.createDateObj(this.getFormattedValue(maximum));
        const minValue = this.createDateObj(this.getFormattedValue(minimum));
        const value = this.createDateObj(this.getFormattedValue(val));
        if (this.strictMode) {
            if (+minValue > +maxValue) {
                this.disableTimeIcon();
                this.initValue = this.getDateObject(maxValue);
                this.updateInputValue(this.getValue(this.initValue));
                if (this.enableMask) {
                    this.createMask();
                }
                return this.inputElement.value;
            }
            else if (+minValue >= +value) {
                return this.getDateObject(minValue);
            }
            else if (+value >= +maxValue || +minValue === +maxValue) {
                return this.getDateObject(maxValue);
            }
        }
        else {
            if (+minValue > +maxValue) {
                this.disableTimeIcon();
                if (!isNaN(+this.createDateObj(dateVal))) {
                    return dateVal;
                }
            }
        }
        return dateVal;
    }
    bindEvents() {
        EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.popupHandler, this);
        EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
        EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
        EventHandler.add(this.inputElement, 'change', this.inputChangeHandler, this);
        EventHandler.add(this.inputElement, 'input', this.inputEventHandler, this);
        if (this.enableMask) {
            EventHandler.add(this.inputElement, 'keydown', this.keydownHandler, this);
            EventHandler.add(this.inputElement, 'keyup', this.keyupHandler, this);
        }
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.clearHandler, this);
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
        if (!Browser.isDevice) {
            this.keyConfigure = extend(this.keyConfigure, this.keyConfigs);
            this.inputEvent = new KeyboardEvents(this.inputWrapper.container, {
                keyAction: this.inputHandler.bind(this),
                keyConfigs: this.keyConfigure,
                eventName: 'keydown'
            });
            if (this.showClearButton && this.inputElement) {
                EventHandler.add(this.inputElement, 'mousedown', this.mouseDownHandler, this);
            }
        }
    }
    keydownHandler(e) {
        switch (e.code) {
            case 'Delete':
                if (this.enableMask && !this.popupObj && !this.readonly) {
                    this.notify('keyDownHandler', {
                        module: 'MaskedDateTime',
                        e: e
                    });
                }
                break;
        }
    }
    keyupHandler(e) {
        if ((e.code === 'Backspace' || e.code === 'Delete') && (this.enableMask && this.showClearButton && this.inputElement && this.inputElement.value === this.maskedDateValue && this.inputWrapper && this.inputWrapper.clearButton && !this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide'))) {
            this.inputWrapper.clearButton.classList.add('e-clear-icon-hide');
        }
    }
    formResetHandler() {
        if (!this.enabled) {
            return;
        }
        if (!this.inputElement.disabled) {
            let timeValue = this.inputElement.getAttribute('value');
            let val = this.checkDateValue(this.inputEleValue);
            if (this.element.tagName === 'EJS-TIMEPICKER') {
                val = null;
                timeValue = '';
                this.inputElement.setAttribute('value', '');
            }
            this.setProperties({ value: val }, true);
            this.prevDate = this.value;
            this.valueWithMinutes = this.value;
            this.initValue = this.value;
            if (this.inputElement) {
                this.updateInputValue(timeValue);
                if (this.enableMask) {
                    if (!timeValue) {
                        this.updateInputValue(this.maskedDateValue);
                    }
                    this.createMask();
                }
                this.checkErrorState(timeValue);
                this.prevValue = this.inputElement.value;
            }
        }
    }
    inputChangeHandler(e) {
        if (!this.enabled) {
            return;
        }
        e.stopPropagation();
    }
    inputEventHandler() {
        if (this.enableMask) {
            this.notify('inputHandler', {
                module: 'MaskedDateTime'
            });
        }
    }
    unBindEvents() {
        if (this.inputWrapper) {
            EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown touchstart', this.popupHandler);
        }
        EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
        EventHandler.remove(this.inputElement, 'change', this.inputChangeHandler);
        EventHandler.remove(this.inputElement, 'input', this.inputEventHandler);
        if (this.enableMask) {
            EventHandler.remove(this.inputElement, 'keyup', this.keyupHandler);
        }
        if (this.inputEvent) {
            this.inputEvent.destroy();
        }
        EventHandler.remove(this.inputElement, 'mousedown touchstart', this.mouseDownHandler);
        if (this.showClearButton && !isNullOrUndefined(this.inputWrapper) && !isNullOrUndefined(this.inputWrapper.clearButton)) {
            EventHandler.remove(this.inputWrapper.clearButton, 'mousedown touchstart', this.clearHandler);
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
    }
    bindClearEvent() {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown', this.clearHandler, this);
        }
    }
    raiseClearedEvent(e) {
        const clearedArgs = {
            event: e
        };
        this.trigger('cleared', clearedArgs);
    }
    clearHandler(e) {
        if (!this.enabled) {
            return;
        }
        e.preventDefault();
        if (!isNullOrUndefined(this.value)) {
            this.clear(e);
        }
        else {
            this.resetState();
            this.raiseClearedEvent(e);
        }
        if (this.popupWrapper) {
            this.popupWrapper.scrollTop = 0;
        }
        if (this.enableMask) {
            this.notify('clearHandler', {
                module: 'MaskedDateTime'
            });
        }
        if (closest(this.element, 'form')) {
            const element = this.element;
            const keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    }
    clear(event) {
        this.setProperties({ value: null }, true);
        this.initValue = null;
        this.resetState();
        this.raiseClearedEvent(event);
        this.changeEvent(event);
    }
    setZIndex() {
        if (this.popupObj) {
            this.popupObj.zIndex = this.zIndex;
            this.popupObj.dataBind();
        }
    }
    checkAttributes(isDynamic) {
        const attributes = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['step', 'disabled', 'readonly', 'style', 'name', 'value', 'min', 'max', 'placeholder'];
        let value;
        for (const prop of attributes) {
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.timeOptions) || (this.timeOptions['enabled'] === undefined)) || isDynamic) {
                            const enabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' || this.inputElement.getAttribute(prop) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'style':
                        this.inputStyle = this.inputElement.getAttribute(prop);
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.timeOptions) || (this.timeOptions['readonly'] === undefined)) || isDynamic) {
                            const readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                                this.inputElement.getAttribute(prop) === '' || this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'name':
                        this.inputElement.setAttribute('name', this.inputElement.getAttribute(prop));
                        break;
                    case 'step':
                        this.step = parseInt(this.inputElement.getAttribute(prop), 10);
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.timeOptions) || (this.timeOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !isDynamic);
                        }
                        break;
                    case 'min':
                        if ((isNullOrUndefined(this.timeOptions) || (this.timeOptions['min'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!isNullOrUndefined(this.checkDateValue(value))) {
                                this.setProperties({ min: value }, !isDynamic);
                            }
                        }
                        break;
                    case 'max':
                        if ((isNullOrUndefined(this.timeOptions) || (this.timeOptions['max'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!isNullOrUndefined(this.checkDateValue(value))) {
                                this.setProperties({ max: value }, !isDynamic);
                            }
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.timeOptions) || (this.timeOptions['value'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!isNullOrUndefined(this.checkDateValue(value))) {
                                this.initValue = value;
                                this.updateInput(false, this.initValue);
                                this.setProperties({ value: value }, !isDynamic);
                            }
                        }
                        break;
                }
            }
        }
    }
    setCurrentDate(value) {
        if (isNullOrUndefined(this.checkDateValue(value))) {
            return null;
        }
        return new Date(YEAR$2, MONTH$2, DAY, value.getHours(), value.getMinutes(), value.getSeconds());
    }
    getTextFormat() {
        let time = 0;
        if (this.cldrTimeFormat().split(' ')[0] === 'a' || this.cldrTimeFormat().indexOf('a') === 0) {
            time = 1;
        }
        else if (this.cldrTimeFormat().indexOf('a') < 0) {
            const strArray = this.cldrTimeFormat().split(' ');
            for (let i = 0; i < strArray.length; i++) {
                if (strArray[i].toLowerCase().indexOf('h') >= 0) {
                    time = i;
                    break;
                }
            }
        }
        return time;
    }
    updateValue(value, event) {
        let val;
        if (this.isNullOrEmpty(value)) {
            this.resetState();
        }
        else {
            val = this.checkValue(value);
            if (this.strictMode) {
                // this case set previous value to the text box when set invalid date
                const inputVal = (val === null && value.trim().length > 0) ?
                    this.previousState(this.prevDate) : this.inputElement.value;
                this.updateInputValue(inputVal);
                if (this.enableMask) {
                    if (!inputVal) {
                        this.updateInputValue(this.maskedDateValue);
                    }
                    if (isNullOrUndefined(val) && value !== this.maskedDateValue) {
                        this.createMask();
                    }
                    if (isNullOrUndefined(val) && value === this.maskedDateValue) {
                        this.updateInputValue(this.maskedDateValue);
                    }
                }
            }
        }
        this.checkValueChange(event, typeof value === 'string' ? false : true);
    }
    previousState(date) {
        const value = this.getDateObject(date);
        for (let i = 0; i < this.timeCollections.length; i++) {
            if (+value === this.timeCollections[i]) {
                this.activeIndex = i;
                this.selectedElement = this.liCollections[i];
                this.valueWithMinutes = new Date(this.timeCollections[i]);
                break;
            }
        }
        return this.getValue(date);
    }
    resetState() {
        this.removeSelection();
        Input.setValue('', this.inputElement, this.floatLabelType, false);
        this.valueWithMinutes = this.activeIndex = null;
        if (!this.strictMode) {
            this.checkErrorState(null);
        }
    }
    objToString(val) {
        if (isNullOrUndefined(this.checkDateValue(val))) {
            return null;
        }
        else {
            return this.globalize.formatDate(val, { format: this.cldrTimeFormat(), type: 'time' });
        }
    }
    checkValue(value) {
        if (!this.isNullOrEmpty(value)) {
            const date = value instanceof Date ? value : this.getDateObject(value);
            return this.validateValue(date, value);
        }
        this.resetState();
        return this.valueWithMinutes = null;
    }
    validateValue(date, value) {
        let time;
        const val = this.validateMinMax(value, this.min, this.max);
        const newval = this.getDateObject(val);
        if (this.getFormattedValue(newval) !== this.getFormattedValue(this.value)) {
            this.valueWithMinutes = isNullOrUndefined(newval) ? null : newval;
            time = this.objToString(this.valueWithMinutes);
        }
        else {
            if (this.strictMode) {
                //for strict mode case, when value not present within a range. Reset the nearest range value.
                date = newval;
            }
            this.valueWithMinutes = this.checkDateValue(date);
            time = this.objToString(this.valueWithMinutes);
        }
        if (!this.strictMode && isNullOrUndefined(time)) {
            const value = val.trim().length > 0 ? val : '';
            this.updateInputValue(value);
            if (this.enableMask) {
                if (!value) {
                    this.updateInputValue(this.maskedDateValue);
                }
            }
        }
        else {
            this.updateInputValue(time);
            if (this.enableMask) {
                if (time === '') {
                    this.updateInputValue(this.maskedDateValue);
                }
                if (isNullOrUndefined(time) && value !== this.maskedDateValue) {
                    this.createMask();
                }
                if (isNullOrUndefined(time) && value === this.maskedDateValue) {
                    this.updateInputValue(this.maskedDateValue);
                }
            }
        }
        return time;
    }
    createMask() {
        this.notify('createMask', {
            module: 'MaskedDateTime'
        });
    }
    findNextElement(event) {
        const textVal = (this.inputElement).value;
        const value = isNullOrUndefined(this.valueWithMinutes) ? this.createDateObj(textVal) :
            this.getDateObject(this.valueWithMinutes);
        let timeVal = null;
        const count = this.liCollections.length;
        const collections = this.timeCollections;
        if (!isNullOrUndefined(this.checkDateValue(value)) || !isNullOrUndefined(this.activeIndex)) {
            if (event.action === 'home') {
                const index = this.validLiElement(0);
                timeVal = +(this.createDateObj(new Date(this.timeCollections[index])));
                this.activeIndex = index;
            }
            else if (event.action === 'end') {
                const index = this.validLiElement(collections.length - 1, true);
                timeVal = +(this.createDateObj(new Date(this.timeCollections[index])));
                this.activeIndex = index;
            }
            else {
                if (event.action === 'down') {
                    for (let i = 0; i < count; i++) {
                        if (+value < this.timeCollections[i]) {
                            const index = this.validLiElement(i);
                            timeVal = +(this.createDateObj(new Date(this.timeCollections[index])));
                            this.activeIndex = index;
                            break;
                        }
                        else if (i === count - 1) {
                            const index = this.validLiElement(0);
                            timeVal = +(this.createDateObj(new Date(this.timeCollections[index])));
                            this.activeIndex = index;
                            break;
                        }
                    }
                }
                else {
                    for (let i = count - 1; i >= 0; i--) {
                        if (+value > this.timeCollections[i]) {
                            const index = this.validLiElement(i, true);
                            timeVal = +(this.createDateObj(new Date(this.timeCollections[index])));
                            this.activeIndex = index;
                            break;
                        }
                        else if (i === 0) {
                            const index = this.validLiElement(count - 1);
                            timeVal = +(this.createDateObj(new Date(this.timeCollections[index])));
                            this.activeIndex = index;
                            break;
                        }
                    }
                }
            }
            this.selectedElement = this.liCollections[this.activeIndex];
            this.elementValue(isNullOrUndefined(timeVal) ? null : new Date(timeVal));
        }
        else {
            this.selectNextItem(event);
        }
    }
    selectNextItem(event) {
        const index = this.validLiElement(0, event.action === 'down' ? false : true);
        this.activeIndex = index;
        this.selectedElement = this.liCollections[index];
        this.elementValue(new Date(this.timeCollections[index]));
    }
    elementValue(value) {
        if (!isNullOrUndefined(this.checkDateValue(value))) {
            this.checkValue(value);
        }
    }
    validLiElement(index, backward) {
        let elementIndex = null;
        const items = isNullOrUndefined(this.popupWrapper) ? this.liCollections :
            this.popupWrapper.querySelectorAll('.' + LISTCLASS$1);
        let isCheck = true;
        if (items.length) {
            if (backward) {
                for (let i = index; i >= 0; i--) {
                    if (!items[i].classList.contains(DISABLED$3)) {
                        elementIndex = i;
                        break;
                    }
                    else if (i === 0) {
                        if (isCheck) {
                            index = i = items.length;
                            isCheck = false;
                        }
                    }
                }
            }
            else {
                for (let i = index; i <= items.length - 1; i++) {
                    if (!items[i].classList.contains(DISABLED$3)) {
                        elementIndex = i;
                        break;
                    }
                    else if (i === items.length - 1) {
                        if (isCheck) {
                            index = i = -1;
                            isCheck = false;
                        }
                    }
                }
            }
        }
        return elementIndex;
    }
    keyHandler(event) {
        if (isNullOrUndefined(this.step) || this.step <= 0 || !isNullOrUndefined(this.inputWrapper)
            && this.inputWrapper.buttons[0].classList.contains(DISABLED$3)) {
            return;
        }
        const count = this.timeCollections.length;
        if (isNullOrUndefined(this.getActiveElement()) || this.getActiveElement().length === 0) {
            if (this.liCollections.length > 0) {
                if (isNullOrUndefined(this.value) && isNullOrUndefined(this.activeIndex)) {
                    const index = this.validLiElement(0, event.action === 'down' ? false : true);
                    this.activeIndex = index;
                    this.selectedElement = this.liCollections[index];
                    this.elementValue(new Date(this.timeCollections[index]));
                }
                else {
                    this.findNextElement(event);
                }
            }
            else {
                this.findNextElement(event);
            }
        }
        else {
            let nextItem;
            if ((event.keyCode >= 37) && (event.keyCode <= 40)) {
                let index = (event.keyCode === 40 || event.keyCode === 39) ? ++this.activeIndex : --this.activeIndex;
                this.activeIndex = index = this.activeIndex === (count) ? 0 : this.activeIndex;
                this.activeIndex = index = this.activeIndex < 0 ? (count - 1) : this.activeIndex;
                this.activeIndex = index = this.validLiElement(this.activeIndex, (event.keyCode === 40 || event.keyCode === 39) ?
                    false : true);
                nextItem = isNullOrUndefined(this.timeCollections[index]) ?
                    this.timeCollections[0] : this.timeCollections[index];
            }
            else if (event.action === 'home') {
                const index = this.validLiElement(0);
                this.activeIndex = index;
                nextItem = this.timeCollections[index];
            }
            else if (event.action === 'end') {
                const index = this.validLiElement(count - 1, true);
                this.activeIndex = index;
                nextItem = this.timeCollections[index];
            }
            this.selectedElement = this.liCollections[this.activeIndex];
            this.elementValue(new Date(nextItem));
        }
        this.isNavigate = true;
        this.setHover(this.selectedElement, NAVIGATION);
        this.setActiveDescendant();
        if (this.enableMask) {
            this.selectInputText();
        }
        if (this.isPopupOpen() && this.selectedElement !== null && (!event || event.type !== 'click')) {
            this.setScrollPosition();
        }
    }
    getCultureTimeObject(ld, c) {
        return getValue('main.' + c + '.dates.calendars.gregorian.timeFormats.short', ld);
    }
    getCultureDateObject(ld, c) {
        return getValue('main.' + c + '.dates.calendars.gregorian.dateFormats.short', ld);
    }
    wireListEvents() {
        EventHandler.add(this.listWrapper, 'click', this.onMouseClick, this);
        if (!Browser.isDevice) {
            EventHandler.add(this.listWrapper, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.listWrapper, 'mouseout', this.onMouseLeave, this);
        }
    }
    unWireListEvents() {
        if (this.listWrapper) {
            EventHandler.remove(this.listWrapper, 'click', this.onMouseClick);
            if (!Browser.isDevice) {
                EventHandler.remove(this.listWrapper, 'mouseover', this.onMouseOver);
                EventHandler.remove(this.listWrapper, 'mouseout', this.onMouseLeave);
            }
        }
    }
    valueProcess(event, value) {
        const result = (isNullOrUndefined(this.checkDateValue(value))) ? null : value;
        if (+this.prevDate !== +result) {
            this.initValue = result;
            this.changeEvent(event);
        }
    }
    changeEvent(e) {
        this.addSelection();
        this.updateInput(true, this.initValue);
        const eventArgs = {
            event: (e || null),
            value: this.value,
            text: (this.inputElement).value,
            isInteracted: !isNullOrUndefined(e),
            element: this.element
        };
        eventArgs.value = this.valueWithMinutes || this.getDateObject(this.inputElement.value);
        this.prevDate = this.valueWithMinutes || this.getDateObject(this.inputElement.value);
        if (this.isAngular && this.preventChange) {
            this.preventChange = false;
        }
        else {
            this.trigger('change', eventArgs);
        }
        this.invalidValueString = null;
        this.checkErrorState(this.value);
    }
    updateInput(isUpdate, date) {
        if (isUpdate) {
            this.prevValue = this.getValue(this.prevDate);
        }
        this.prevDate = this.valueWithMinutes = date;
        if ((typeof date !== 'number') || (this.value && +new Date(+this.value).setMilliseconds(0)) !== +date) {
            this.setProperties({ value: date }, true);
            if (this.enableMask && this.value) {
                this.createMask();
            }
        }
        if (!this.strictMode && isNullOrUndefined(this.value) && this.invalidValueString) {
            this.checkErrorState(this.invalidValueString);
            this.updateInputValue(this.invalidValueString);
        }
        this.clearIconState();
    }
    setActiveDescendant() {
        if (!isNullOrUndefined(this.selectedElement) && this.value) {
            attributes(this.inputElement, { 'aria-activedescendant': this.selectedElement.getAttribute('id') });
        }
        else {
            this.inputElement.removeAttribute('aria-activedescendant');
        }
    }
    removeSelection() {
        this.removeHover(HOVER$1);
        if (!isNullOrUndefined(this.popupWrapper)) {
            const items = this.popupWrapper.querySelectorAll('.' + SELECTED$4);
            if (items.length) {
                removeClass(items, SELECTED$4);
                items[0].removeAttribute('aria-selected');
            }
        }
    }
    removeHover(className) {
        const hoveredItem = this.getHoverItem(className);
        if (hoveredItem && hoveredItem.length) {
            removeClass(hoveredItem, className);
            if (className === NAVIGATION) {
                hoveredItem[0].removeAttribute('aria-selected');
            }
        }
    }
    getHoverItem(className) {
        let hoveredItem;
        if (!isNullOrUndefined(this.popupWrapper)) {
            hoveredItem = this.popupWrapper.querySelectorAll('.' + className);
        }
        return hoveredItem;
    }
    setActiveClass() {
        if (!isNullOrUndefined(this.popupWrapper)) {
            const items = this.popupWrapper.querySelectorAll('.' + LISTCLASS$1);
            if (items.length) {
                for (let i = 0; i < items.length; i++) {
                    if ((this.timeCollections[i] === +this.getDateObject(this.valueWithMinutes))) {
                        items[i].setAttribute('aria-selected', 'true');
                        this.selectedElement = items[i];
                        this.activeIndex = i;
                        break;
                    }
                }
            }
        }
    }
    addSelection() {
        this.selectedElement = null;
        this.removeSelection();
        this.setActiveClass();
        if (!isNullOrUndefined(this.selectedElement)) {
            addClass([this.selectedElement], SELECTED$4);
            this.selectedElement.setAttribute('aria-selected', 'true');
        }
    }
    isValidLI(li) {
        return (li && li.classList.contains(LISTCLASS$1) && !li.classList.contains(DISABLED$3));
    }
    createDateObj(val) {
        const formatStr = null;
        let today = this.globalize.formatDate(new Date(), { format: formatStr, skeleton: 'short', type: 'date' });
        let value = null;
        if (typeof val === 'string') {
            if (val.toUpperCase().indexOf('AM') > -1 || val.toUpperCase().indexOf('PM') > -1) {
                today = this.defaultCulture.formatDate(new Date(), { format: formatStr, skeleton: 'short', type: 'date' });
                value = isNaN(+new Date(today + ' ' + val)) ? null : new Date(new Date(today + ' ' + val).setMilliseconds(0));
                if (isNullOrUndefined(value)) {
                    value = this.timeParse(today, val);
                }
            }
            else {
                value = this.timeParse(today, val);
            }
        }
        else if (val instanceof Date) {
            value = val;
        }
        return value;
    }
    timeParse(today, val) {
        let value;
        value = this.globalize.parseDate(this.getAmPmValue(today + ' ' + val), {
            format: this.cldrDateFormat() + ' ' + this.cldrTimeFormat(), type: 'datetime'
        });
        value = isNullOrUndefined(value) ? this.globalize.parseDate(this.getAmPmValue(today + ' ' + val), {
            format: this.cldrDateFormat() + ' ' + this.dateToNumeric(), type: 'datetime'
        }) : value;
        value = isNullOrUndefined(value) ? value : new Date(value.setMilliseconds(0));
        return value;
    }
    createListItems() {
        this.listWrapper = this.createElement('div', { className: CONTENT$2, attrs: { 'tabindex': '-1' } });
        let start;
        const interval = this.step * 60000;
        const listItems = [];
        this.timeCollections = [];
        this.disableItemCollection = [];
        start = +(this.getDateObject(this.initMin).setMilliseconds(0));
        const end = +(this.getDateObject(this.initMax).setMilliseconds(0));
        while (end >= start) {
            this.timeCollections.push(start);
            listItems.push(this.globalize.formatDate(new Date(start), { format: this.cldrTimeFormat(), type: 'time' }));
            start += interval;
        }
        const listBaseOptions = {
            itemCreated: (args) => {
                const eventArgs = {
                    element: args.item,
                    text: args.text, value: this.getDateObject(args.text), isDisabled: false
                };
                this.trigger('itemRender', eventArgs, (eventArgs) => {
                    if (eventArgs.isDisabled) {
                        eventArgs.element.classList.add(DISABLED$3);
                    }
                    if (eventArgs.element.classList.contains(DISABLED$3)) {
                        this.disableItemCollection.push(eventArgs.element.getAttribute('data-value'));
                    }
                });
            }
        };
        this.listTag = ListBase.createList(this.createElement, listItems, listBaseOptions, true);
        attributes(this.listTag, { 'role': 'listbox', 'aria-hidden': 'false', 'id': this.element.id + '_options', 'tabindex': '0' });
        append([this.listTag], this.listWrapper);
    }
    documentClickHandler(event) {
        const target = event.target;
        if ((!isNullOrUndefined(this.popupObj) && !isNullOrUndefined(this.inputWrapper) && (this.inputWrapper.container.contains(target) && event.type !== 'mousedown' ||
            (this.popupObj.element && this.popupObj.element.contains(target)))) && event.type !== 'touchstart') {
            event.preventDefault();
        }
        if (!(closest(target, '[id="' + this.popupObj.element.id + '"]')) && target !== this.inputElement
            && target !== (this.inputWrapper && this.inputWrapper.buttons[0]) &&
            target !== (this.inputWrapper && this.inputWrapper.clearButton) &&
            target !== (this.inputWrapper && this.inputWrapper.container)
            && (!target.classList.contains('e-dlg-overlay'))) {
            if (this.isPopupOpen()) {
                this.hide();
                this.focusOut();
            }
        }
        else if (target !== this.inputElement) {
            if (!Browser.isDevice) {
                this.isPreventBlur = (Browser.isIE || Browser.info.name === 'edge') && (document.activeElement === this.inputElement)
                    && (target === this.popupWrapper);
            }
        }
    }
    setEnableRtl() {
        Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
        if (this.popupObj) {
            this.popupObj.enableRtl = this.enableRtl;
            this.popupObj.dataBind();
        }
    }
    setEnable() {
        Input.setEnabled(this.enabled, this.inputElement, this.floatLabelType);
        if (this.enabled) {
            removeClass([this.inputWrapper.container], DISABLED$3);
            attributes(this.inputElement, { 'aria-disabled': 'false' });
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
        else {
            this.hide();
            addClass([this.inputWrapper.container], DISABLED$3);
            attributes(this.inputElement, { 'aria-disabled': 'true' });
            this.inputElement.tabIndex = -1;
        }
    }
    getProperty(date, val) {
        if (val === 'min') {
            this.initMin = this.checkDateValue(new Date(this.checkInValue(date.min)));
            this.setProperties({ min: this.initMin }, true);
        }
        else {
            this.initMax = this.checkDateValue(new Date(this.checkInValue(date.max)));
            this.setProperties({ max: this.initMax }, true);
        }
        if (this.inputElement.value === '') {
            this.validateMinMax(this.value, this.min, this.max);
        }
        else {
            this.checkValue(this.inputElement.value);
        }
        this.checkValueChange(null, false);
    }
    inputBlurHandler(e) {
        if (!this.enabled) {
            return;
        }
        // IE popup closing issue when click over the scrollbar
        if (this.isPreventBlur && this.isPopupOpen()) {
            this.inputElement.focus();
            return;
        }
        this.closePopup(0, e);
        if (this.enableMask && this.maskedDateValue && this.placeholder && this.floatLabelType !== 'Always') {
            if (this.inputElement.value === this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue('');
            }
        }
        removeClass([this.inputWrapper.container], [FOCUS]);
        if (this.getText() !== this.inputElement.value) {
            this.updateValue((this.inputElement).value, e);
        }
        else if (this.inputElement.value.trim().length === 0) {
            this.resetState();
        }
        this.cursorDetails = null;
        this.isNavigate = false;
        if (this.inputElement.value === '') {
            this.invalidValueString = null;
        }
        const blurArguments = {
            model: this
        };
        this.trigger('blur', blurArguments);
    }
    /**
     * Focuses out the TimePicker textbox element.
     *
     * @returns {void}
     */
    focusOut() {
        if (document.activeElement === this.inputElement) {
            this.inputElement.blur();
            removeClass([this.inputWrapper.container], [FOCUS]);
            const blurArguments = {
                model: this
            };
            this.trigger('blur', blurArguments);
        }
    }
    isPopupOpen() {
        if (this.popupWrapper && this.popupWrapper.classList.contains('' + ROOT$3)) {
            return true;
        }
        return false;
    }
    inputFocusHandler() {
        if (!this.enabled) {
            return;
        }
        const focusArguments = {
            model: this
        };
        if (!this.readonly && !Browser.isDevice && !this.enableMask) {
            this.selectInputText();
        }
        if (this.enableMask && !this.inputElement.value && this.placeholder) {
            if (this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue(this.maskedDateValue);
                this.inputElement.selectionStart = 0;
                this.inputElement.selectionEnd = this.inputElement.value.length;
            }
        }
        if (this.enableMask && this.showClearButton && this.inputElement && this.inputElement.value === this.maskedDateValue && this.inputWrapper && this.inputWrapper.clearButton && !this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) {
            this.inputWrapper.clearButton.classList.add('e-clear-icon-hide');
        }
        this.trigger('focus', focusArguments);
        this.clearIconState();
        if (this.openOnFocus) {
            this.show();
        }
    }
    /**
     * Focused the TimePicker textbox element.
     *
     * @returns {void}
     */
    focusIn() {
        if (document.activeElement !== this.inputElement && this.enabled) {
            this.inputElement.focus();
        }
    }
    /**
     * Hides the TimePicker popup.
     *
     * @returns {void}
     * @deprecated
     */
    hide() {
        this.closePopup(100, null);
        this.clearIconState();
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Opens the popup to show the list items.
     *
     * @returns {void}
     * @deprecated
     */
    show(event) {
        if ((this.enabled && this.readonly) || !this.enabled || this.popupWrapper) {
            return;
        }
        else {
            this.popupCreation();
            if (Browser.isDevice && this.listWrapper) {
                this.modal = this.createElement('div');
                this.modal.className = '' + ROOT$3 + ' e-time-modal';
                document.body.className += ' ' + OVERFLOW$2;
                document.body.appendChild(this.modal);
            }
            if (Browser.isDevice) {
                this.mobileTimePopupWrap = this.createElement('div', { className: 'e-timepicker-mob-popup-wrap' });
                document.body.appendChild(this.mobileTimePopupWrap);
            }
            this.openPopupEventArgs = {
                popup: this.popupObj || null,
                cancel: false,
                event: event || null,
                name: 'open',
                appendTo: Browser.isDevice ? this.mobileTimePopupWrap : document.body
            };
            const eventArgs = this.openPopupEventArgs;
            this.trigger('open', eventArgs, (eventArgs) => {
                this.openPopupEventArgs = eventArgs;
                if (!this.openPopupEventArgs.cancel && !this.inputWrapper.buttons[0].classList.contains(DISABLED$3)) {
                    this.openPopupEventArgs.appendTo.appendChild(this.popupWrapper);
                    this.popupAlignment(this.openPopupEventArgs);
                    this.setScrollPosition();
                    if (!Browser.isDevice) {
                        this.inputElement.focus();
                    }
                    const openAnimation = {
                        name: 'FadeIn',
                        duration: ANIMATIONDURATION
                    };
                    this.popupObj.refreshPosition(this.anchor);
                    if (this.zIndex === 1000) {
                        this.popupObj.show(new Animation(openAnimation), this.element);
                    }
                    else {
                        this.popupObj.show(new Animation(openAnimation), null);
                    }
                    this.setActiveDescendant();
                    attributes(this.inputElement, { 'aria-expanded': 'true' });
                    attributes(this.inputElement, { 'aria-owns': this.inputElement.id + '_options' });
                    attributes(this.inputElement, { 'aria-controls': this.inputElement.id });
                    addClass([this.inputWrapper.container], FOCUS);
                    EventHandler.add(document, 'mousedown touchstart', this.documentClickHandler, this);
                    this.setOverlayIndex(this.mobileTimePopupWrap, this.popupObj.element, this.modal, Browser.isDevice);
                    if (Browser.isDevice) {
                        const dlgOverlay = this.createElement('div', { className: 'e-dlg-overlay' });
                        dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
                        this.mobileTimePopupWrap.appendChild(dlgOverlay);
                    }
                }
                else {
                    this.popupObj.destroy();
                    this.popupWrapper = this.listTag = undefined;
                    this.liCollections = this.timeCollections = this.disableItemCollection = [];
                    this.popupObj = null;
                }
            });
        }
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-param */
    setOverlayIndex(popupWrapper, timePopupElement, modal, isDevice) {
        if (isDevice && !isNullOrUndefined(timePopupElement) && !isNullOrUndefined(modal) && !isNullOrUndefined(popupWrapper)) {
            const index = parseInt(timePopupElement.style.zIndex, 10) ? parseInt(timePopupElement.style.zIndex, 10) : 1000;
            modal.style.zIndex = (index - 1).toString();
            popupWrapper.style.zIndex = index.toString();
        }
    }
    formatValues(type) {
        let value;
        if (typeof type === 'number') {
            value = formatUnit(type);
        }
        else if (typeof type === 'string') {
            value = (type.match(/px|%|em/)) ? type : isNaN(parseInt(type, 10)) ? type : formatUnit(type);
        }
        return value;
    }
    popupAlignment(args) {
        args.popup.position.X = this.formatValues(args.popup.position.X);
        args.popup.position.Y = this.formatValues(args.popup.position.Y);
        if (!isNaN(parseFloat(args.popup.position.X)) || !isNaN(parseFloat(args.popup.position.Y))) {
            this.popupObj.relateTo = this.anchor = document.body;
            this.popupObj.targetType = 'container';
        }
        if (!isNaN(parseFloat(args.popup.position.X))) {
            this.popupObj.offsetX = parseFloat(args.popup.position.X);
        }
        if (!isNaN(parseFloat(args.popup.position.Y))) {
            this.popupObj.offsetY = parseFloat(args.popup.position.Y);
        }
        if (!Browser.isDevice) {
            switch (args.popup.position.X) {
                case 'left':
                    break;
                case 'right':
                    args.popup.offsetX = this.containerStyle.width;
                    break;
                case 'center':
                    args.popup.offsetX = -(this.containerStyle.width / 2);
                    break;
            }
            switch (args.popup.position.Y) {
                case 'top':
                    break;
                case 'bottom':
                    break;
                case 'center':
                    args.popup.offsetY = -(this.containerStyle.height / 2);
                    break;
            }
            if (args.popup.position.X === 'center' && args.popup.position.Y === 'center') {
                this.popupObj.relateTo = this.inputWrapper.container;
                this.anchor = this.inputElement;
                this.popupObj.targetType = 'relative';
            }
        }
        else {
            if (args.popup.position.X === 'center' && args.popup.position.Y === 'center') {
                this.popupObj.relateTo = this.anchor = document.body;
                this.popupObj.offsetY = 0;
                this.popupObj.targetType = 'container';
                this.popupObj.collision = { X: 'fit', Y: 'fit' };
            }
        }
    }
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the properties to be maintained upon browser refresh.
     *
     * @returns {string}
     */
    getPersistData() {
        const keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    }
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * To get component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    getModuleName() {
        return 'timepicker';
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {TimePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {TimePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputElement);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement, this.floatLabelType);
                    if (this.readonly) {
                        this.hide();
                    }
                    this.setTimeAllowEdit();
                    break;
                case 'enabled':
                    this.setProperties({ enabled: newProp.enabled }, true);
                    this.setEnable();
                    break;
                case 'allowEdit':
                    this.setTimeAllowEdit();
                    break;
                case 'enableRtl':
                    this.setProperties({ enableRtl: newProp.enableRtl }, true);
                    this.setEnableRtl();
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    this.setZIndex();
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.checkAttributes(true);
                    break;
                case 'min':
                case 'max':
                    this.getProperty(newProp, prop);
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.inputElement, this.inputWrapper);
                    this.bindClearEvent();
                    break;
                case 'locale':
                    this.setProperties({ locale: newProp.locale }, true);
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    if (this.timeOptions && this.timeOptions.placeholder == null) {
                        this.updatePlaceHolder();
                    }
                    this.setValue(this.value);
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'width':
                    setStyleAttribute(this.inputWrapper.container, { 'width': this.setWidth(newProp.width) });
                    this.containerStyle = this.inputWrapper.container.getBoundingClientRect();
                    Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'format':
                    this.setProperties({ format: newProp.format }, true);
                    this.checkTimeFormat();
                    this.setValue(this.value);
                    if (this.enableMask) {
                        this.createMask();
                        if (!this.value) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                    }
                    break;
                case 'value':
                    this.invalidValueString = null;
                    this.checkInvalidValue(newProp.value);
                    newProp.value = this.value;
                    if (!this.invalidValueString) {
                        if (typeof newProp.value === 'string') {
                            this.setProperties({ value: this.checkDateValue(new Date(newProp.value)) }, true);
                            newProp.value = this.value;
                        }
                        else {
                            if ((newProp.value && +new Date(+newProp.value).setMilliseconds(0)) !== +this.value) {
                                newProp.value = this.checkDateValue(new Date('' + newProp.value));
                            }
                        }
                        this.initValue = newProp.value;
                        newProp.value = this.compareFormatChange(this.checkValue(newProp.value));
                    }
                    else {
                        this.updateInputValue(this.invalidValueString);
                        this.checkErrorState(this.invalidValueString);
                    }
                    if (this.enableMask && isNullOrUndefined(newProp.value)) {
                        this.updateInputValue(this.maskedDateValue);
                        this.checkErrorState(this.maskedDateValue);
                    }
                    this.checkValueChange(null, false);
                    if (this.isPopupOpen()) {
                        this.setScrollPosition();
                    }
                    if (this.isAngular && this.preventChange) {
                        this.preventChange = false;
                    }
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    if (newProp.strictMode) {
                        this.checkErrorState(null);
                    }
                    this.setProperties({ strictMode: newProp.strictMode }, true);
                    this.checkValue((this.inputElement).value);
                    this.checkValueChange(null, false);
                    break;
                case 'scrollTo':
                    if (this.checkDateValue(new Date(this.checkInValue(newProp.scrollTo)))) {
                        if (this.popupWrapper) {
                            this.setScrollTo();
                        }
                        this.setProperties({ scrollTo: this.checkDateValue(new Date(this.checkInValue(newProp.scrollTo))) }, true);
                    }
                    else {
                        this.setProperties({ scrollTo: null }, true);
                    }
                    break;
                case 'enableMask':
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        this.updateInputValue(this.maskedDateValue);
                    }
                    else {
                        if (this.inputElement.value === this.maskedDateValue) {
                            this.updateInputValue('');
                        }
                    }
                    break;
            }
        }
    }
    checkInValue(inValue) {
        if (inValue instanceof Date) {
            return (inValue.toUTCString());
        }
        else {
            return ('' + inValue);
        }
    }
};
__decorate$3([
    Property(null)
], TimePicker.prototype, "width", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "cssClass", void 0);
__decorate$3([
    Property(false)
], TimePicker.prototype, "strictMode", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "keyConfigs", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "format", void 0);
__decorate$3([
    Property(true)
], TimePicker.prototype, "enabled", void 0);
__decorate$3([
    Property(false)
], TimePicker.prototype, "fullScreenMode", void 0);
__decorate$3([
    Property(false)
], TimePicker.prototype, "readonly", void 0);
__decorate$3([
    Property({})
], TimePicker.prototype, "htmlAttributes", void 0);
__decorate$3([
    Property('Never')
], TimePicker.prototype, "floatLabelType", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "placeholder", void 0);
__decorate$3([
    Property(1000)
], TimePicker.prototype, "zIndex", void 0);
__decorate$3([
    Property(false)
], TimePicker.prototype, "enablePersistence", void 0);
__decorate$3([
    Property(true)
], TimePicker.prototype, "showClearButton", void 0);
__decorate$3([
    Property(30)
], TimePicker.prototype, "step", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "scrollTo", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "value", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "min", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "max", void 0);
__decorate$3([
    Property(true)
], TimePicker.prototype, "allowEdit", void 0);
__decorate$3([
    Property(false)
], TimePicker.prototype, "openOnFocus", void 0);
__decorate$3([
    Property(false)
], TimePicker.prototype, "enableMask", void 0);
__decorate$3([
    Property({ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' })
], TimePicker.prototype, "maskPlaceholder", void 0);
__decorate$3([
    Property(null)
], TimePicker.prototype, "serverTimezoneOffset", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "change", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "created", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "destroyed", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "open", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "itemRender", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "close", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "cleared", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "blur", void 0);
__decorate$3([
    Event()
], TimePicker.prototype, "focus", void 0);
TimePicker = __decorate$3([
    NotifyPropertyChanges
], TimePicker);
/* eslint-enable @typescript-eslint/no-explicit-any */

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//class constant defination
const DATEWRAPPER$1 = 'e-date-wrapper';
const DATEPICKERROOT = 'e-datepicker';
const DATETIMEWRAPPER = 'e-datetime-wrapper';
const DAY$1 = new Date().getDate();
const MONTH$3 = new Date().getMonth();
const YEAR$3 = new Date().getFullYear();
const HOUR = new Date().getHours();
const MINUTE = new Date().getMinutes();
const SECOND = new Date().getSeconds();
const MILLISECOND = new Date().getMilliseconds();
const ROOT$4 = 'e-datetimepicker';
const DATETIMEPOPUPWRAPPER = 'e-datetimepopup-wrapper';
const INPUTWRAPPER$1 = 'e-input-group-icon';
const POPUP$3 = 'e-popup';
const TIMEICON = 'e-time-icon';
const INPUTFOCUS$2 = 'e-input-focus';
const POPUPDIMENSION$1 = '250px';
const ICONANIMATION$1 = 'e-icon-anim';
const DISABLED$4 = 'e-disabled';
const ERROR$3 = 'e-error';
const CONTENT$3 = 'e-content';
const NAVIGATION$1 = 'e-navigation';
const ACTIVE$2 = 'e-active';
const HOVER$2 = 'e-hover';
const ICONS$1 = 'e-icons';
const HALFPOSITION$1 = 2;
const LISTCLASS$2 = 'e-list-item';
const ANIMATIONDURATION$1 = 100;
const OVERFLOW$3 = 'e-time-overflow';
/**
 * Represents the DateTimePicker component that allows user to select
 * or enter a date time value.
 * ```html
 * <input id="dateTimePicker"/>
 * ```
 * ```typescript
 * <script>
 *   let dateTimePickerObject:DateTimePicker = new DateTimePicker({ value: new Date() });
 *   dateTimePickerObject.appendTo("#dateTimePicker");
 * </script>
 * ```
 */
let DateTimePicker = class DateTimePicker extends DatePicker {
    /**
     * Constructor for creating the widget
     *
     * @param {DateTimePickerModel} options - Specifies the DateTimePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.valueWithMinutes = null;
        this.scrollInvoked = false;
        this.moduleName = this.getModuleName();
        this.formatRegex = /dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yyy|yy|y|'[^']*'|'[^']*'/g;
        this.dateFormatString = '';
        this.dateTimeOptions = options;
    }
    focusHandler() {
        if (!this.enabled) {
            return;
        }
        addClass([this.inputWrapper.container], INPUTFOCUS$2);
    }
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    focusIn() {
        super.focusIn();
    }
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    focusOut() {
        if (document.activeElement === this.inputElement) {
            this.inputElement.blur();
            removeClass([this.inputWrapper.container], [INPUTFOCUS$2]);
        }
    }
    blurHandler(e) {
        if (!this.enabled) {
            return;
        }
        // IE popup closing issue when click over the scrollbar
        if (this.isTimePopupOpen() && this.isPreventBlur) {
            this.inputElement.focus();
            return;
        }
        removeClass([this.inputWrapper.container], INPUTFOCUS$2);
        const blurArguments = {
            model: this
        };
        if (this.isTimePopupOpen()) {
            this.hide(e);
        }
        this.trigger('blur', blurArguments);
    }
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    destroy() {
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        if (this.popupObject && this.popupObject.element.classList.contains(POPUP$3)) {
            this.popupObject.destroy();
            detach(this.dateTimeWrapper);
            this.dateTimeWrapper = undefined;
            this.liCollections = this.timeCollections = [];
            if (!isNullOrUndefined(this.rippleFn)) {
                this.rippleFn();
            }
        }
        const ariaAttribute = {
            'aria-live': 'assertive', 'aria-atomic': 'true', 'aria-invalid': 'false',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false',
            'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off'
        };
        if (this.inputElement) {
            Input.removeAttributes(ariaAttribute, this.inputElement);
        }
        if (this.isCalendar()) {
            if (this.popupWrapper) {
                detach(this.popupWrapper);
            }
            this.popupObject = this.popupWrapper = null;
            this.keyboardHandler.destroy();
        }
        this.unBindInputEvents();
        this.liCollections = null;
        this.rippleFn = null;
        this.selectedElement = null;
        this.listTag = null;
        this.timeIcon = null;
        this.popupObject = null;
        this.preventArgs = null;
        this.keyboardModule = null;
        Input.destroy({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        super.destroy();
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        this.timekeyConfigure = {
            enter: 'enter',
            escape: 'escape',
            end: 'end',
            tab: 'tab',
            home: 'home',
            down: 'downarrow',
            up: 'uparrow',
            left: 'leftarrow',
            right: 'rightarrow',
            open: 'alt+downarrow',
            close: 'alt+uparrow'
        };
        this.valueWithMinutes = null;
        this.previousDateTime = null;
        this.isPreventBlur = false;
        this.cloneElement = this.element.cloneNode(true);
        this.dateTimeFormat = this.cldrDateTimeFormat();
        this.initValue = this.value;
        if (typeof (this.min) === 'string') {
            this.min = this.checkDateValue(new Date(this.min));
        }
        if (typeof (this.max) === 'string') {
            this.max = this.checkDateValue(new Date(this.max));
        }
        if (typeof (this.minTime) === 'string') {
            this.minTime = this.checkDateValue(new Date(this.minTime));
        }
        if (typeof (this.maxTime) === 'string') {
            this.maxTime = this.checkDateValue(new Date(this.maxTime));
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        super.updateHtmlAttributeToElement();
        this.checkAttributes(false);
        const localeText = { placeholder: this.placeholder };
        this.l10n = new L10n('datetimepicker', localeText, this.locale);
        this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        super.render();
        this.createInputElement();
        super.updateHtmlAttributeToWrapper();
        this.bindInputEvents();
        if (this.enableMask) {
            this.notify('createMask', {
                module: 'MaskedDateTime'
            });
        }
        this.setValue(true);
        if (this.enableMask && !this.value && this.maskedDateValue && (this.floatLabelType === 'Always' || !this.floatLabelType || !this.placeholder)) {
            Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        this.setProperties({ scrollTo: this.checkDateValue(new Date(this.checkValue(this.scrollTo))) }, true);
        this.previousDateTime = this.value && new Date(+this.value);
        if (this.element.tagName === 'EJS-DATETIMEPICKER') {
            this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
            this.element.removeAttribute('tabindex');
            if (!this.enabled) {
                this.inputElement.tabIndex = -1;
            }
        }
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        }
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-date-time-icon');
        }
        this.renderComplete();
    }
    setValue(isDynamic = false) {
        this.initValue = this.validateMinMaxRange(this.value);
        if (!this.strictMode && this.isDateObject(this.initValue)) {
            const value = this.validateMinMaxRange(this.initValue);
            Input.setValue(this.getFormattedValue(value), this.inputElement, this.floatLabelType, this.showClearButton);
            this.setProperties({ value: value }, true);
        }
        else {
            if (isNullOrUndefined(this.value)) {
                this.initValue = null;
                this.setProperties({ value: null }, true);
            }
        }
        this.valueWithMinutes = this.value;
        super.updateInput(isDynamic);
    }
    validateMinMaxRange(value) {
        let result = value;
        if (this.isDateObject(value)) {
            result = this.validateValue(value);
        }
        else {
            if (+this.min > +this.max) {
                this.disablePopupButton(true);
            }
        }
        this.checkValidState(result);
        return result;
    }
    checkValidState(value) {
        this.isValidState = true;
        if (!this.strictMode) {
            if ((+(value) > +(this.max)) || (+(value) < +(this.min)) || !this.isValidTime(value)) {
                this.isValidState = false;
            }
        }
        this.checkErrorState();
    }
    checkErrorState() {
        if (this.isValidState) {
            removeClass([this.inputWrapper.container], ERROR$3);
        }
        else {
            addClass([this.inputWrapper.container], ERROR$3);
        }
        attributes(this.inputElement, { 'aria-invalid': this.isValidState ? 'false' : 'true' });
    }
    isValidTime(value) {
        if (value != null && (this.minTime || this.maxTime)) {
            let minTimeValue;
            let maxTimeValue;
            let maxValue;
            let minValue;
            const valueTime = value.getHours() * 3600000 + value.getMinutes() * 60000 +
                value.getSeconds() * 1000 + value.getMilliseconds();
            if (this.minTime) {
                minTimeValue = this.minTime.getHours() * 3600000 + this.minTime.getMinutes() * 60000 +
                    this.minTime.getSeconds() * 1000 + this.minTime.getMilliseconds();
            }
            if (this.maxTime) {
                maxTimeValue = this.maxTime.getHours() * 3600000 + this.maxTime.getMinutes() * 60000 +
                    this.maxTime.getSeconds() * 1000 + this.maxTime.getMilliseconds();
            }
            if (this.min && (+value.getDate() === +this.min.getDate() && +value.getMonth() === +this.min.getMonth() &&
                +value.getFullYear() === +this.min.getFullYear())) {
                minValue = this.min.getHours() * 3600000 + this.min.getMinutes() * 60000 +
                    this.min.getSeconds() * 1000 + this.min.getMilliseconds();
                minTimeValue = minTimeValue < minValue ? minValue : minTimeValue;
            }
            if (this.max && (+value.getDate() === +this.max.getDate() && +value.getMonth() === +this.max.getMonth() &&
                +this.max.getFullYear() === +this.max.getFullYear())) {
                maxValue = this.max.getHours() * 3600000 + this.max.getMinutes() * 60000 +
                    this.max.getSeconds() * 1000 + this.max.getMilliseconds();
                maxTimeValue = maxTimeValue > maxValue ? maxValue : maxTimeValue;
            }
            if (this.strictMode) {
                let newValue;
                if (minTimeValue && valueTime < minTimeValue) {
                    newValue = new Date(value.getFullYear(), value.getMonth(), value.getDate(), this.minTime.getHours(), this.minTime.getMinutes(), this.minTime.getSeconds(), this.minTime.getMilliseconds());
                    this.setProperties({ value: newValue }, true);
                    this.changedArgs = { value: this.value };
                }
                else if (maxTimeValue && valueTime > maxTimeValue) {
                    newValue = new Date(value.getFullYear(), value.getMonth(), value.getDate(), this.maxTime.getHours(), this.maxTime.getMinutes(), this.maxTime.getSeconds(), this.maxTime.getMilliseconds());
                    this.setProperties({ value: newValue }, true);
                    this.changedArgs = { value: this.value };
                }
                return true;
            }
            else {
                return !((minTimeValue && valueTime < minTimeValue) || (maxTimeValue && valueTime > maxTimeValue));
            }
        }
        return true;
    }
    validateValue(value) {
        let dateVal = value;
        if (this.strictMode) {
            if (+this.min > +this.max) {
                this.disablePopupButton(true);
                dateVal = this.max;
            }
            else if (+value < +this.min) {
                dateVal = this.min;
            }
            else if (+value > +this.max) {
                dateVal = this.max;
            }
        }
        else {
            if (+this.min > +this.max) {
                this.disablePopupButton(true);
                dateVal = value;
            }
        }
        return dateVal;
    }
    disablePopupButton(isDisable) {
        if (isDisable) {
            addClass([this.inputWrapper.buttons[0], this.timeIcon], DISABLED$4);
            this.hide();
        }
        else {
            removeClass([this.inputWrapper.buttons[0], this.timeIcon], DISABLED$4);
        }
    }
    getFormattedValue(value) {
        let dateOptions;
        if (!isNullOrUndefined(value)) {
            if (this.calendarMode === 'Gregorian') {
                dateOptions = { format: this.cldrDateTimeFormat(), type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                dateOptions = { format: this.cldrDateTimeFormat(), type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
            return this.globalize.formatDate(value, dateOptions);
        }
        else {
            return null;
        }
    }
    isDateObject(value) {
        return (!isNullOrUndefined(value) && !isNaN(+value)) ? true : false;
    }
    createInputElement() {
        removeClass([this.inputElement], DATEPICKERROOT);
        removeClass([this.inputWrapper.container], DATEWRAPPER$1);
        addClass([this.inputWrapper.container], DATETIMEWRAPPER);
        addClass([this.inputElement], ROOT$4);
        this.renderTimeIcon();
    }
    renderTimeIcon() {
        this.timeIcon = Input.appendSpan(INPUTWRAPPER$1 + ' ' + TIMEICON + ' ' + ICONS$1, this.inputWrapper.container);
    }
    bindInputEvents() {
        EventHandler.add(this.timeIcon, 'mousedown', this.timeHandler, this);
        EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.dateHandler, this);
        EventHandler.add(this.inputElement, 'blur', this.blurHandler, this);
        EventHandler.add(this.inputElement, 'focus', this.focusHandler, this);
        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
        this.keyboardHandler = new KeyboardEvents(this.inputElement, {
            eventName: 'keydown',
            keyAction: this.inputKeyAction.bind(this),
            keyConfigs: this.defaultKeyConfigs
        });
    }
    unBindInputEvents() {
        EventHandler.remove(this.timeIcon, 'mousedown touchstart', this.timeHandler);
        EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown touchstart', this.dateHandler);
        if (this.inputElement) {
            EventHandler.remove(this.inputElement, 'blur', this.blurHandler);
            EventHandler.remove(this.inputElement, 'focus', this.focusHandler);
        }
        if (this.keyboardHandler) {
            this.keyboardHandler.destroy();
        }
    }
    cldrTimeFormat() {
        let cldrTime;
        if (this.isNullOrEmpty(this.timeFormat)) {
            if (this.locale === 'en' || this.locale === 'en-US') {
                cldrTime = (getValue('timeFormats.short', getDefaultDateObject()));
            }
            else {
                cldrTime = (this.getCultureTimeObject(cldrData, '' + this.locale));
            }
        }
        else {
            cldrTime = this.timeFormat;
        }
        return cldrTime;
    }
    cldrDateTimeFormat() {
        let cldrTime;
        const culture = new Internationalization(this.locale);
        const dateFormat = culture.getDatePattern({ skeleton: 'yMd' });
        if (this.isNullOrEmpty(this.formatString)) {
            cldrTime = dateFormat + ' ' + this.getCldrFormat('time');
        }
        else {
            cldrTime = this.formatString;
        }
        return cldrTime;
    }
    getCldrFormat(type) {
        let cldrDateTime;
        if (this.locale === 'en' || this.locale === 'en-US') {
            cldrDateTime = (getValue('timeFormats.short', getDefaultDateObject()));
        }
        else {
            cldrDateTime = (this.getCultureTimeObject(cldrData, '' + this.locale));
        }
        return cldrDateTime;
    }
    isNullOrEmpty(value) {
        if (isNullOrUndefined(value) || (typeof value === 'string' && value.trim() === '')) {
            return true;
        }
        else {
            return false;
        }
    }
    getCultureTimeObject(ld, c) {
        if (this.calendarMode === 'Gregorian') {
            return getValue('main.' + '' + this.locale + '.dates.calendars.gregorian.timeFormats.short', ld);
        }
        else {
            return getValue('main.' + '' + this.locale + '.dates.calendars.islamic.timeFormats.short', ld);
        }
    }
    timeHandler(e) {
        if (!this.enabled) {
            return;
        }
        this.isIconClicked = true;
        if (Browser.isDevice) {
            this.inputElement.setAttribute('readonly', '');
        }
        if (e.currentTarget === this.timeIcon) {
            e.preventDefault();
        }
        if (this.enabled && !this.readonly) {
            if (this.isDatePopupOpen()) {
                super.hide(e);
            }
            if (this.isTimePopupOpen()) {
                this.closePopup(e);
            }
            else {
                this.inputElement.focus();
                this.popupCreation('time', e);
                addClass([this.inputWrapper.container], [INPUTFOCUS$2]);
            }
        }
        this.isIconClicked = false;
    }
    dateHandler(e) {
        if (!this.enabled) {
            return;
        }
        if (e.currentTarget === this.inputWrapper.buttons[0]) {
            e.preventDefault();
        }
        if (this.enabled && !this.readonly) {
            if (this.isTimePopupOpen()) {
                this.closePopup(e);
            }
            if (!isNullOrUndefined(this.popupWrapper)) {
                this.popupCreation('date', e);
            }
        }
    }
    show(type, e) {
        if ((this.enabled && this.readonly) || !this.enabled) {
            return;
        }
        else {
            if (type === 'time' && !this.dateTimeWrapper) {
                if (this.isDatePopupOpen()) {
                    this.hide(e);
                }
                this.popupCreation('time', e);
            }
            else if (!this.popupObj) {
                if (this.isTimePopupOpen()) {
                    this.hide(e);
                }
                super.show();
                this.popupCreation('date', e);
            }
        }
    }
    toggle(e) {
        if (this.isDatePopupOpen()) {
            super.hide(e);
            this.show('time', null);
        }
        else if (this.isTimePopupOpen()) {
            this.hide(e);
            super.show(null, e);
            this.popupCreation('date', null);
        }
        else {
            this.show(null, e);
        }
    }
    listCreation() {
        let dateObject;
        if (this.calendarMode === 'Gregorian') {
            this.cldrDateTimeFormat().replace(this.formatRegex, this.TimePopupFormat());
            if (this.dateFormatString === '') {
                this.dateFormatString = this.cldrDateTimeFormat();
            }
            dateObject = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), {
                format: this.dateFormatString, type: 'datetime'
            });
        }
        else {
            dateObject = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), {
                format: this.cldrDateTimeFormat(), type: 'datetime', calendar: 'islamic'
            });
        }
        const value = isNullOrUndefined(this.value) ? this.inputElement.value !== '' ?
            dateObject : new Date() : this.value;
        this.valueWithMinutes = value;
        this.listWrapper = createElement('div', { className: CONTENT$3, attrs: { 'tabindex': '0' } });
        const min = this.startTime(value);
        const max = this.endTime(value);
        const listDetails = TimePickerBase.createListItems(this.createElement, min, max, this.globalize, this.cldrTimeFormat(), this.step);
        this.timeCollections = listDetails.collection;
        this.listTag = listDetails.list;
        attributes(this.listTag, { 'role': 'listbox', 'aria-hidden': 'false', 'id': this.element.id + '_options' });
        append([listDetails.list], this.listWrapper);
        this.wireTimeListEvents();
        const rippleModel = { duration: 300, selector: '.' + LISTCLASS$2 };
        this.rippleFn = rippleEffect(this.listWrapper, rippleModel);
        this.liCollections = this.listWrapper.querySelectorAll('.' + LISTCLASS$2);
    }
    popupCreation(type, e) {
        if (Browser.isDevice) {
            this.element.setAttribute('readonly', 'readonly');
        }
        if (type === 'date') {
            if (!this.readonly && this.popupWrapper) {
                addClass([this.popupWrapper], DATETIMEPOPUPWRAPPER);
                attributes(this.popupWrapper, { 'id': this.element.id + '_options' });
            }
        }
        else {
            if (!this.readonly) {
                const dateTimeWrapperElement = createElement('div', {
                    className: ROOT$4 + ' ' + POPUP$3,
                    attrs: { 'id': this.element.id + '_timepopup' }
                });
                dateTimeWrapperElement.style.cssText = 'visibility: hidden; display: block;';
                this.dateTimeWrapper = dateTimeWrapperElement;
                if (!isNullOrUndefined(this.cssClass)) {
                    this.dateTimeWrapper.className += ' ' + this.cssClass;
                }
                if (!isNullOrUndefined(this.step) && this.step > 0) {
                    this.listCreation();
                    append([this.listWrapper], this.dateTimeWrapper);
                }
                document.body.appendChild(this.dateTimeWrapper);
                this.addTimeSelection();
                this.renderPopup();
                this.setTimeScrollPosition();
                this.openPopup(e);
                if (!Browser.isDevice || (Browser.isDevice && !this.fullScreenMode)) {
                    this.popupObject.refreshPosition(this.inputElement);
                }
                if (Browser.isDevice) {
                    this.modelWrapper.style.zIndex = (this.popupObject.zIndex - 1).toString();
                    if (this.fullScreenMode) {
                        this.dateTimeWrapper.style.left = '0px';
                    }
                }
            }
        }
    }
    openPopup(e) {
        this.preventArgs = {
            cancel: false,
            popup: this.popupObject,
            event: e || null
        };
        const eventArgs = this.preventArgs;
        this.trigger('open', eventArgs, (eventArgs) => {
            this.preventArgs = eventArgs;
            if (!this.preventArgs.cancel && !this.readonly) {
                const openAnimation = {
                    name: 'FadeIn',
                    duration: ANIMATIONDURATION$1
                };
                if (this.zIndex === 1000) {
                    this.popupObject.show(new Animation(openAnimation), this.element);
                }
                else {
                    this.popupObject.show(new Animation(openAnimation), null);
                }
                addClass([this.inputWrapper.container], [ICONANIMATION$1]);
                attributes(this.inputElement, { 'aria-expanded': 'true' });
                attributes(this.inputElement, { 'aria-owns': this.inputElement.id + '_options' });
                attributes(this.inputElement, { 'aria-controls': this.inputElement.id });
                EventHandler.add(document, 'mousedown touchstart', this.documentClickHandler, this);
            }
        });
    }
    documentClickHandler(event) {
        const target = event.target;
        if ((!isNullOrUndefined(this.popupObject) && (this.inputWrapper.container.contains(target) && event.type !== 'mousedown' ||
            (this.popupObject.element && this.popupObject.element.contains(target)))) && event.type !== 'touchstart') {
            event.preventDefault();
        }
        if (!(closest(target, '[id="' + (this.popupObject && this.popupObject.element.id + '"]'))) && target !== this.inputElement
            && target !== this.timeIcon && !isNullOrUndefined(this.inputWrapper) && target !== this.inputWrapper.container && !target.classList.contains('e-dlg-overlay')) {
            if (this.isTimePopupOpen()) {
                this.hide(event);
                this.focusOut();
            }
        }
        else if (target !== this.inputElement) {
            if (!Browser.isDevice) {
                this.isPreventBlur = ((document.activeElement === this.inputElement) && (Browser.isIE || Browser.info.name === 'edge')
                    && target === this.popupObject.element);
            }
        }
    }
    isTimePopupOpen() {
        return (this.dateTimeWrapper && this.dateTimeWrapper.classList.contains('' + ROOT$4)) ? true : false;
    }
    isDatePopupOpen() {
        return (this.popupWrapper && this.popupWrapper.classList.contains('' + DATETIMEPOPUPWRAPPER)) ? true : false;
    }
    renderPopup() {
        this.containerStyle = this.inputWrapper.container.getBoundingClientRect();
        if (Browser.isDevice) {
            this.timeModal = createElement('div');
            this.timeModal.className = '' + ROOT$4 + ' e-time-modal';
            document.body.className += ' ' + OVERFLOW$3;
            this.timeModal.style.display = 'block';
            document.body.appendChild(this.timeModal);
        }
        if (Browser.isDevice) {
            this.modelWrapper = createElement('div', { className: 'e-datetime-mob-popup-wrap' });
            this.modelWrapper.appendChild(this.dateTimeWrapper);
            const dlgOverlay = createElement('div', { className: 'e-dlg-overlay' });
            dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
            this.modelWrapper.appendChild(dlgOverlay);
            document.body.appendChild(this.modelWrapper);
        }
        const offset = 4;
        this.popupObject = new Popup(this.dateTimeWrapper, {
            width: this.setPopupWidth(),
            zIndex: this.zIndex,
            targetType: 'container',
            collision: Browser.isDevice ? { X: 'fit', Y: 'fit' } : { X: 'flip', Y: 'flip' },
            relateTo: Browser.isDevice ? document.body : this.inputWrapper.container,
            position: Browser.isDevice ? { X: 'center', Y: 'center' } : { X: 'left', Y: 'bottom' },
            enableRtl: this.enableRtl,
            offsetY: offset,
            open: () => {
                this.dateTimeWrapper.style.visibility = 'visible';
                addClass([this.timeIcon], ACTIVE$2);
                if (!Browser.isDevice) {
                    this.timekeyConfigure = extend(this.timekeyConfigure, this.keyConfigs);
                    this.inputEvent = new KeyboardEvents(this.inputWrapper.container, {
                        keyAction: this.timeKeyActionHandle.bind(this),
                        keyConfigs: this.timekeyConfigure,
                        eventName: 'keydown'
                    });
                }
            }, close: () => {
                removeClass([this.timeIcon], ACTIVE$2);
                this.unWireTimeListEvents();
                this.inputElement.removeAttribute('aria-activedescendant');
                remove(this.popupObject.element);
                this.popupObject.destroy();
                this.dateTimeWrapper.innerHTML = '';
                if (this.modelWrapper) {
                    remove(this.modelWrapper);
                }
                this.listWrapper = this.dateTimeWrapper = undefined;
                if (this.inputEvent) {
                    this.inputEvent.destroy();
                }
            }, targetExitViewport: () => {
                if (!Browser.isDevice) {
                    this.hide();
                }
            }
        });
        if (Browser.isDevice && this.fullScreenMode) {
            this.popupObject.element.style.maxHeight = '100%';
            this.popupObject.element.style.width = '100%';
        }
        else {
            this.popupObject.element.style.maxHeight = POPUPDIMENSION$1;
        }
        if (Browser.isDevice && this.fullScreenMode) {
            const modelHeader = this.createElement('div', { className: 'e-model-header' });
            const modelTitleSpan = this.createElement('span', { className: 'e-model-title' });
            modelTitleSpan.textContent = 'Select time';
            const modelCloseIcon = this.createElement('span', { className: 'e-popup-close' });
            EventHandler.add(modelCloseIcon, 'mousedown touchstart', this.dateTimeCloseHandler, this);
            modelHeader.appendChild(modelCloseIcon);
            modelHeader.appendChild(modelTitleSpan);
            this.dateTimeWrapper.insertBefore(modelHeader, this.dateTimeWrapper.firstElementChild);
        }
    }
    dateTimeCloseHandler(e) {
        this.hide();
    }
    setDimension(width) {
        if (typeof width === 'number') {
            width = formatUnit(width);
        }
        else if (typeof width === 'string') {
            // eslint-disable-next-line no-self-assign
            width = width;
        }
        else {
            width = '100%';
        }
        return width;
    }
    setPopupWidth() {
        let width = this.setDimension(this.width);
        if (width.indexOf('%') > -1) {
            const inputWidth = this.containerStyle.width * parseFloat(width) / 100;
            width = inputWidth.toString() + 'px';
        }
        return width;
    }
    wireTimeListEvents() {
        EventHandler.add(this.listWrapper, 'click', this.onMouseClick, this);
        if (!Browser.isDevice) {
            EventHandler.add(this.listWrapper, 'mouseover', this.onMouseOver, this);
            EventHandler.add(this.listWrapper, 'mouseout', this.onMouseLeave, this);
        }
    }
    unWireTimeListEvents() {
        if (this.listWrapper) {
            EventHandler.remove(this.listWrapper, 'click', this.onMouseClick);
            EventHandler.remove(document, 'mousedown touchstart', this.documentClickHandler);
            if (!Browser.isDevice) {
                EventHandler.add(this.listWrapper, 'mouseover', this.onMouseOver, this);
                EventHandler.add(this.listWrapper, 'mouseout', this.onMouseLeave, this);
            }
        }
    }
    onMouseOver(event) {
        const currentLi = closest(event.target, '.' + LISTCLASS$2);
        this.setTimeHover(currentLi, HOVER$2);
    }
    onMouseLeave() {
        this.removeTimeHover(HOVER$2);
    }
    setTimeHover(li, className) {
        if (this.enabled && this.isValidLI(li) && !li.classList.contains(className)) {
            this.removeTimeHover(className);
            addClass([li], className);
        }
    }
    getPopupHeight() {
        const height = parseInt(POPUPDIMENSION$1, 10);
        const popupHeight = this.dateTimeWrapper.getBoundingClientRect().height;
        if (Browser.isDevice && this.fullScreenMode) {
            return popupHeight;
        }
        else {
            return popupHeight > height ? height : popupHeight;
        }
    }
    changeEvent(e) {
        super.changeEvent(e);
        if ((this.value && this.value.valueOf()) !== (this.previousDateTime && +this.previousDateTime.valueOf())) {
            this.valueWithMinutes = this.value;
            this.setInputValue('date');
            this.previousDateTime = this.value && new Date(+this.value);
        }
    }
    updateValue(e) {
        this.setInputValue('time');
        if (+this.previousDateTime !== +this.value) {
            this.changedArgs = {
                value: this.value, event: e || null,
                isInteracted: !isNullOrUndefined(e),
                element: this.element
            };
            this.addTimeSelection();
            this.trigger('change', this.changedArgs);
            this.previousDateTime = this.previousDate = this.value;
        }
    }
    setTimeScrollPosition() {
        const popupElement = this.selectedElement;
        if (!isNullOrUndefined(popupElement)) {
            this.findScrollTop(popupElement);
        }
        else if (this.dateTimeWrapper && this.checkDateValue(this.scrollTo)) {
            this.setScrollTo();
        }
    }
    findScrollTop(element) {
        const listHeight = this.getPopupHeight();
        const nextElement = element.nextElementSibling;
        const height = nextElement ? nextElement.offsetTop : element.offsetTop;
        const lineHeight = element.getBoundingClientRect().height;
        if ((height + element.offsetTop) > listHeight) {
            if (Browser.isDevice && this.fullScreenMode) {
                const listContent = this.dateTimeWrapper.querySelector('.e-content');
                listContent.scrollTop = nextElement ? (height - (listHeight / HALFPOSITION$1 + lineHeight / HALFPOSITION$1)) : height;
            }
            else {
                this.dateTimeWrapper.scrollTop = nextElement ? (height - (listHeight / HALFPOSITION$1 + lineHeight / HALFPOSITION$1)) : height;
            }
        }
        else {
            this.dateTimeWrapper.scrollTop = 0;
        }
    }
    setScrollTo() {
        let element;
        const items = this.dateTimeWrapper.querySelectorAll('.' + LISTCLASS$2);
        if (items.length >= 0) {
            this.scrollInvoked = true;
            const initialTime = this.timeCollections[0];
            const scrollTime = this.getDateObject(this.checkDateValue(this.scrollTo)).getTime();
            element = items[Math.round((scrollTime - initialTime) / (this.step * 60000))];
        }
        else {
            this.dateTimeWrapper.scrollTop = 0;
        }
        if (!isNullOrUndefined(element)) {
            this.findScrollTop(element);
        }
        else {
            this.dateTimeWrapper.scrollTop = 0;
        }
    }
    setInputValue(type) {
        if (type === 'date') {
            this.inputElement.value = this.previousElementValue = this.getFormattedValue(this.getFullDateTime());
            this.setProperties({ value: this.getFullDateTime() }, true);
        }
        else {
            const tempVal = this.getFormattedValue(new Date(this.timeCollections[this.activeIndex]));
            Input.setValue(tempVal, this.inputElement, this.floatLabelType, this.showClearButton);
            this.previousElementValue = this.inputElement.value;
            this.setProperties({ value: new Date(this.timeCollections[this.activeIndex]) }, true);
            if (this.enableMask) {
                this.createMask();
            }
        }
        this.updateIconState();
    }
    getFullDateTime() {
        let value = null;
        if (this.isDateObject(this.valueWithMinutes)) {
            value = this.combineDateTime(this.valueWithMinutes);
        }
        else {
            value = this.previousDate;
        }
        return this.validateMinMaxRange(value);
    }
    createMask() {
        this.notify('createMask', {
            module: 'MaskedDateTime'
        });
    }
    combineDateTime(value) {
        if (this.isDateObject(value)) {
            const day = this.previousDate.getDate();
            const month = this.previousDate.getMonth();
            const year = this.previousDate.getFullYear();
            const hour = value.getHours();
            const minutes = value.getMinutes();
            const seconds = value.getSeconds();
            return new Date(year, month, day, hour, minutes, seconds);
        }
        else {
            return this.previousDate;
        }
    }
    onMouseClick(event) {
        const target = event.target;
        const li = this.selectedElement = closest(target, '.' + LISTCLASS$2);
        if (li && li.classList.contains(LISTCLASS$2)) {
            this.timeValue = li.getAttribute('data-value');
            this.hide(event);
        }
        this.setSelection(li, event);
    }
    setSelection(li, event) {
        if (this.isValidLI(li) && !li.classList.contains(ACTIVE$2)) {
            this.selectedElement = li;
            const index = Array.prototype.slice.call(this.liCollections).indexOf(li);
            this.activeIndex = index;
            this.valueWithMinutes = new Date(this.timeCollections[this.activeIndex]);
            addClass([this.selectedElement], ACTIVE$2);
            this.selectedElement.setAttribute('aria-selected', 'true');
            this.updateValue(event);
        }
    }
    setTimeActiveClass() {
        const collections = isNullOrUndefined(this.dateTimeWrapper) ? this.listWrapper : this.dateTimeWrapper;
        if (!isNullOrUndefined(collections)) {
            const items = collections.querySelectorAll('.' + LISTCLASS$2);
            if (items.length) {
                for (let i = 0; i < items.length; i++) {
                    if (this.timeCollections[i] === +(this.valueWithMinutes)) {
                        items[i].setAttribute('aria-selected', 'true');
                        this.selectedElement = items[i];
                        this.activeIndex = i;
                        this.setTimeActiveDescendant();
                        break;
                    }
                }
            }
        }
    }
    setTimeActiveDescendant() {
        if (!isNullOrUndefined(this.selectedElement) && this.value) {
            attributes(this.inputElement, { 'aria-activedescendant': this.selectedElement.getAttribute('id') });
        }
        else {
            this.inputElement.removeAttribute('aria-activedescendant');
        }
    }
    addTimeSelection() {
        this.selectedElement = null;
        this.removeTimeSelection();
        this.setTimeActiveClass();
        if (!isNullOrUndefined(this.selectedElement)) {
            addClass([this.selectedElement], ACTIVE$2);
            this.selectedElement.setAttribute('aria-selected', 'true');
        }
    }
    removeTimeSelection() {
        this.removeTimeHover(HOVER$2);
        if (!isNullOrUndefined(this.dateTimeWrapper)) {
            const items = this.dateTimeWrapper.querySelectorAll('.' + ACTIVE$2);
            if (items.length) {
                removeClass(items, ACTIVE$2);
                items[0].removeAttribute('aria-selected');
            }
        }
    }
    removeTimeHover(className) {
        const hoveredItem = this.getTimeHoverItem(className);
        if (hoveredItem && hoveredItem.length) {
            removeClass(hoveredItem, className);
        }
    }
    getTimeHoverItem(className) {
        const collections = isNullOrUndefined(this.dateTimeWrapper) ? this.listWrapper : this.dateTimeWrapper;
        let hoveredItem;
        if (!isNullOrUndefined(collections)) {
            hoveredItem = collections.querySelectorAll('.' + className);
        }
        return hoveredItem;
    }
    isValidLI(li) {
        return (li && li.classList.contains(LISTCLASS$2) && !li.classList.contains(DISABLED$4));
    }
    calculateStartEnd(value, range, method) {
        const day = value.getDate();
        const month = value.getMonth();
        const year = value.getFullYear();
        const hours = value.getHours();
        const minutes = value.getMinutes();
        const seconds = value.getSeconds();
        const milliseconds = value.getMilliseconds();
        if (range) {
            if (method === 'starttime') {
                return new Date(year, month, day, 0, 0, 0);
            }
            else {
                return new Date(year, month, day, 23, 59, 59);
            }
        }
        else {
            return new Date(year, month, day, hours, minutes, seconds, milliseconds);
        }
    }
    startTime(date) {
        let tempStartValue;
        let start;
        const tempMin = this.min;
        const tempMax = this.max;
        const value = date === null ? new Date() : date;
        let isModified = false;
        let startValue;
        if (this.minTime) {
            startValue = new Date(value.getFullYear(), value.getMonth(), value.getDate(), this.minTime.getHours(), this.minTime.getMinutes(), this.minTime.getSeconds(), this.minTime.getMilliseconds());
            isModified = true;
        }
        else {
            startValue = value;
        }
        if ((+startValue.getDate() === +tempMin.getDate() && +startValue.getMonth() === +tempMin.getMonth() &&
            +startValue.getFullYear() === +tempMin.getFullYear()) ||
            ((+new Date(startValue.getFullYear(), startValue.getMonth(), startValue.getDate())) <=
                +new Date(tempMin.getFullYear(), tempMin.getMonth(), tempMin.getDate()))) {
            start = false;
            tempStartValue = tempMin;
            if (isModified && ((+new Date(startValue.getFullYear(), startValue.getMonth(), startValue.getDate(), startValue.getHours(), startValue.getMinutes(), startValue.getSeconds(), startValue.getMilliseconds())) >=
                +new Date(tempMin.getFullYear(), tempMin.getMonth(), tempMin.getDate(), tempMin.getHours(), tempMin.getMinutes(), tempMin.getSeconds(), tempMin.getMilliseconds()))) {
                tempStartValue.setHours(startValue.getHours(), startValue.getMinutes(), startValue.getSeconds(), startValue.getMilliseconds());
            }
        }
        else if (+startValue < +tempMax && +startValue > +tempMin) {
            start = !isModified;
            tempStartValue = startValue;
        }
        else if (+startValue >= +tempMax) {
            start = true;
            tempStartValue = tempMax;
        }
        return this.calculateStartEnd(tempStartValue, start, 'starttime');
    }
    TimePopupFormat() {
        let format = '';
        let formatCount = 0;
        const proxy =  this;
        /**
         * Formats the value specifier.
         *
         * @param {string} formattext - The format text.
         * @returns {string} The formatted value specifier.
         */
        function formatValueSpecifier(formattext) {
            switch (formattext) {
                case 'd':
                case 'dd':
                case 'ddd':
                case 'dddd':
                case 'M':
                case 'MM':
                case 'MMM':
                case 'MMMM':
                case 'y':
                case 'yy':
                case 'yyy':
                case 'yyyy':
                    if (format === '') {
                        format = format + formattext;
                    }
                    else {
                        format = format + '/' + formattext;
                    }
                    formatCount = formatCount + 1;
                    break;
            }
            if (formatCount > 2) {
                proxy.dateFormatString = format;
            }
            return format;
        }
        return formatValueSpecifier;
    }
    endTime(date) {
        let tempEndValue;
        let end;
        const tempMax = this.max;
        const value = date === null ? new Date() : date;
        let isModified = false;
        let endValue;
        if (this.maxTime) {
            endValue = new Date(value.getFullYear(), value.getMonth(), value.getDate(), this.maxTime.getHours(), this.maxTime.getMinutes(), this.maxTime.getSeconds(), this.maxTime.getMilliseconds());
            isModified = true;
        }
        else {
            endValue = value;
        }
        if ((+endValue.getDate() === +tempMax.getDate() && +endValue.getMonth() === +tempMax.getMonth() &&
            +endValue.getFullYear() === +tempMax.getFullYear()) ||
            (+new Date(endValue.getUTCFullYear(), endValue.getMonth(), endValue.getDate()) >=
                +new Date(tempMax.getFullYear(), tempMax.getMonth(), tempMax.getDate()))) {
            end = false;
            tempEndValue = this.max;
            if (isModified && (+new Date(endValue.getUTCFullYear(), endValue.getMonth(), endValue.getDate(), endValue.getHours(), endValue.getMinutes(), endValue.getSeconds(), endValue.getMilliseconds()) <=
                +new Date(tempMax.getFullYear(), tempMax.getMonth(), tempMax.getDate(), tempMax.getHours(), tempMax.getMinutes(), tempMax.getSeconds(), tempMax.getMilliseconds()))) {
                tempEndValue.setHours(endValue.getHours(), endValue.getMinutes(), endValue.getSeconds(), endValue.getMilliseconds());
            }
        }
        else if (+endValue < +this.max && +endValue > +this.min) {
            end = !isModified;
            tempEndValue = endValue;
        }
        else if (+endValue <= +this.min) {
            end = true;
            tempEndValue = this.min;
        }
        return this.calculateStartEnd(tempEndValue, end, 'endtime');
    }
    hide(e) {
        if (this.popupObj || this.dateTimeWrapper) {
            this.preventArgs = {
                cancel: false,
                popup: this.popupObj || this.popupObject,
                event: e || null
            };
            const eventArgs = this.preventArgs;
            if (isNullOrUndefined(this.popupObj)) {
                this.trigger('close', eventArgs, (eventArgs) => {
                    this.dateTimeCloseEventCallback(e, eventArgs);
                });
            }
            else {
                this.dateTimeCloseEventCallback(e, eventArgs);
            }
        }
        else {
            if (Browser.isDevice && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
            this.setAllowEdit();
        }
    }
    dateTimeCloseEventCallback(e, eventArgs) {
        this.preventArgs = eventArgs;
        if (!this.preventArgs.cancel) {
            if (this.isDatePopupOpen()) {
                super.hide(e);
            }
            else if (this.isTimePopupOpen()) {
                this.closePopup(e);
                removeClass([document.body], OVERFLOW$3);
                if (Browser.isDevice && this.timeModal) {
                    this.timeModal.style.display = 'none';
                    this.timeModal.outerHTML = '';
                    this.timeModal = null;
                }
                this.setTimeActiveDescendant();
            }
        }
        if (Browser.isDevice && this.allowEdit && !this.readonly) {
            this.inputElement.removeAttribute('readonly');
        }
        this.setAllowEdit();
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    closePopup(e) {
        if (this.isTimePopupOpen() && this.popupObject) {
            const animModel = {
                name: 'FadeOut',
                duration: ANIMATIONDURATION$1,
                delay: 0
            };
            this.popupObject.hide(new Animation(animModel));
            this.inputWrapper.container.classList.remove(ICONANIMATION$1);
            attributes(this.inputElement, { 'aria-expanded': 'false' });
            this.inputElement.removeAttribute('aria-owns');
            this.inputElement.removeAttribute('aria-controls');
            EventHandler.remove(document, 'mousedown touchstart', this.documentClickHandler);
        }
    }
    preRender() {
        this.checkFormat();
        this.dateTimeFormat = this.cldrDateTimeFormat();
        super.preRender();
        removeClass([this.inputElementCopy], [ROOT$4]);
    }
    getProperty(date, val) {
        if (val === 'min') {
            this.setProperties({ min: this.validateValue(date.min) }, true);
        }
        else {
            this.setProperties({ max: this.validateValue(date.max) }, true);
        }
    }
    checkAttributes(isDynamic) {
        const attributes = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['style', 'name', 'step', 'disabled', 'readonly', 'value', 'min', 'max', 'placeholder', 'type'];
        let value;
        for (const prop of attributes) {
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'name':
                        this.inputElement.setAttribute('name', this.inputElement.getAttribute(prop));
                        break;
                    case 'step':
                        this.step = parseInt(this.inputElement.getAttribute(prop), 10);
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['readonly'] === undefined)) || isDynamic) {
                            const readonly = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' ||
                                this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !isDynamic);
                        }
                        break;
                    case 'min':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['min'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!this.isNullOrEmpty(value) && !isNaN(+value)) {
                                this.setProperties({ min: value }, !isDynamic);
                            }
                        }
                        break;
                    case 'disabled':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['enabled'] === undefined)) || isDynamic) {
                            const enabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === 'true' ||
                                this.inputElement.getAttribute(prop) === '' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['value'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!this.isNullOrEmpty(value) && !isNaN(+value)) {
                                this.setProperties({ value: value }, !isDynamic);
                            }
                        }
                        break;
                    case 'max':
                        if ((isNullOrUndefined(this.dateTimeOptions) || (this.dateTimeOptions['max'] === undefined)) || isDynamic) {
                            value = new Date(this.inputElement.getAttribute(prop));
                            if (!this.isNullOrEmpty(value) && !isNaN(+value)) {
                                this.setProperties({ max: value }, !isDynamic);
                            }
                        }
                        break;
                }
            }
        }
    }
    requiredModules() {
        const modules = [];
        if (this.calendarMode === 'Islamic') {
            modules.push({ args: [this], member: 'islamic', name: 'Islamic' });
        }
        if (this.enableMask) {
            modules.push(this.maskedDateModule());
        }
        return modules;
    }
    maskedDateModule() {
        const modules = { args: [this], member: 'MaskedDateTime' };
        return modules;
    }
    getTimeActiveElement() {
        if (!isNullOrUndefined(this.dateTimeWrapper)) {
            return this.dateTimeWrapper.querySelectorAll('.' + ACTIVE$2);
        }
        else {
            return null;
        }
    }
    createDateObj(val) {
        return val instanceof Date ? val : null;
    }
    getDateObject(text) {
        if (!this.isNullOrEmpty(text)) {
            const dateValue = this.createDateObj(text);
            const value = this.valueWithMinutes;
            const status = !isNullOrUndefined(value);
            if (this.checkDateValue(dateValue)) {
                const date = status ? value.getDate() : DAY$1;
                const month = status ? value.getMonth() : MONTH$3;
                const year = status ? value.getFullYear() : YEAR$3;
                const hour = status ? value.getHours() : HOUR;
                const minute = status ? value.getMinutes() : MINUTE;
                const second = status ? value.getSeconds() : SECOND;
                const millisecond = status ? value.getMilliseconds() : MILLISECOND;
                if (!this.scrollInvoked) {
                    return new Date(year, month, date, hour, minute, second, millisecond);
                }
                else {
                    this.scrollInvoked = false;
                    return new Date(year, month, date, dateValue.getHours(), dateValue.getMinutes(), dateValue.getSeconds(), dateValue.getMilliseconds());
                }
            }
        }
        return null;
    }
    findNextTimeElement(event) {
        const textVal = (this.inputElement).value;
        const value = isNullOrUndefined(this.valueWithMinutes) ? this.createDateObj(textVal) :
            this.getDateObject(this.valueWithMinutes);
        let dateTimeVal = null;
        const listCount = this.liCollections.length;
        if (!isNullOrUndefined(this.activeIndex) || !isNullOrUndefined(this.checkDateValue(value))) {
            if (event.action === 'home') {
                dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[0])));
                this.activeIndex = 0;
            }
            else if (event.action === 'end') {
                dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[this.timeCollections.length - 1])));
                this.activeIndex = this.timeCollections.length - 1;
            }
            else {
                if (event.action === 'down') {
                    for (let i = 0; i < listCount; i++) {
                        if (+value < this.timeCollections[i]) {
                            dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[i])));
                            this.activeIndex = i;
                            break;
                        }
                    }
                }
                else {
                    for (let i = listCount - 1; i >= 0; i--) {
                        if (+value > this.timeCollections[i]) {
                            dateTimeVal = +(this.createDateObj(new Date(this.timeCollections[i])));
                            this.activeIndex = i;
                            break;
                        }
                    }
                }
            }
            this.selectedElement = this.liCollections[this.activeIndex];
            this.timeElementValue(isNullOrUndefined(dateTimeVal) ? null : new Date(dateTimeVal));
        }
    }
    setTimeValue(date, value) {
        let dateString;
        let time;
        const val = this.validateMinMaxRange(value);
        const newval = this.createDateObj(val);
        if (this.getFormattedValue(newval) !== (!isNullOrUndefined(this.value) ? this.getFormattedValue(this.value) : null)) {
            this.valueWithMinutes = isNullOrUndefined(newval) ? null : newval;
            time = new Date(+this.valueWithMinutes);
        }
        else {
            if (this.strictMode) {
                //for strict mode case, when value not present within a range. Reset the nearest range value.
                date = newval;
            }
            this.valueWithMinutes = this.checkDateValue(date);
            time = new Date(+this.valueWithMinutes);
        }
        if (this.calendarMode === 'Gregorian') {
            dateString = this.globalize.formatDate(time, {
                format: !isNullOrUndefined(this.formatString) ? this.formatString : this.cldrDateTimeFormat(),
                type: 'dateTime', skeleton: 'yMd'
            });
        }
        else {
            dateString = this.globalize.formatDate(time, {
                format: !isNullOrUndefined(this.formatString) ? this.formatString : this.cldrDateTimeFormat(),
                type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
            });
        }
        if (!this.strictMode && isNullOrUndefined(time)) {
            Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        else {
            Input.setValue(dateString, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        return time;
    }
    timeElementValue(value) {
        if (!isNullOrUndefined(this.checkDateValue(value)) && !this.isNullOrEmpty(value)) {
            const date = value instanceof Date ? value : this.getDateObject(value);
            return this.setTimeValue(date, value);
        }
        return null;
    }
    timeKeyHandler(event) {
        if (isNullOrUndefined(this.step) || this.step <= 0) {
            return;
        }
        const listCount = this.timeCollections.length;
        if (isNullOrUndefined(this.getTimeActiveElement()) || this.getTimeActiveElement().length === 0) {
            if (this.liCollections.length > 0) {
                if (isNullOrUndefined(this.value) && isNullOrUndefined(this.activeIndex)) {
                    this.activeIndex = 0;
                    this.selectedElement = this.liCollections[0];
                    this.timeElementValue(new Date(this.timeCollections[0]));
                }
                else {
                    this.findNextTimeElement(event);
                }
            }
        }
        else {
            let nextItemValue;
            if ((event.keyCode >= 37) && (event.keyCode <= 40)) {
                let index = (event.keyCode === 40 || event.keyCode === 39) ? ++this.activeIndex : --this.activeIndex;
                this.activeIndex = index = this.activeIndex === (listCount) ? 0 : this.activeIndex;
                this.activeIndex = index = this.activeIndex < 0 ? (listCount - 1) : this.activeIndex;
                nextItemValue = isNullOrUndefined(this.timeCollections[index]) ?
                    this.timeCollections[0] : this.timeCollections[index];
            }
            else if (event.action === 'home') {
                this.activeIndex = 0;
                nextItemValue = this.timeCollections[0];
            }
            else if (event.action === 'end') {
                this.activeIndex = listCount - 1;
                nextItemValue = this.timeCollections[listCount - 1];
            }
            this.selectedElement = this.liCollections[this.activeIndex];
            this.timeElementValue(new Date(nextItemValue));
        }
        this.isNavigate = true;
        this.setTimeHover(this.selectedElement, NAVIGATION$1);
        this.setTimeActiveDescendant();
        if (this.isTimePopupOpen() && this.selectedElement !== null && (!event || event.type !== 'click')) {
            this.setTimeScrollPosition();
        }
    }
    timeKeyActionHandle(event) {
        if (this.enabled) {
            if (event.action !== 'right' && event.action !== 'left' && event.action !== 'tab') {
                event.preventDefault();
            }
            switch (event.action) {
                case 'up':
                case 'down':
                case 'home':
                case 'end':
                    this.timeKeyHandler(event);
                    break;
                case 'enter':
                    if (this.isNavigate) {
                        this.selectedElement = this.liCollections[this.activeIndex];
                        this.valueWithMinutes = new Date(this.timeCollections[this.activeIndex]);
                        this.setInputValue('time');
                        if (+this.previousDateTime !== +this.value) {
                            this.changedArgs.value = this.value;
                            this.addTimeSelection();
                            this.previousDateTime = this.value;
                        }
                    }
                    else {
                        this.updateValue(event);
                    }
                    this.hide(event);
                    addClass([this.inputWrapper.container], INPUTFOCUS$2);
                    this.isNavigate = false;
                    event.stopPropagation();
                    break;
                case 'escape':
                    this.hide(event);
                    break;
                default:
                    this.isNavigate = false;
                    break;
            }
        }
    }
    inputKeyAction(event) {
        switch (event.action) {
            case 'altDownArrow':
                this.strictModeUpdate();
                this.updateInput();
                this.toggle(event);
                break;
        }
    }
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DateTimePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DateTimePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @deprecated
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            const openPopup = ['blur', 'change', 'cleared', 'close', 'created', 'destroyed', 'focus', 'navigated', 'open', 'renderDayCell'];
            if (openPopup.indexOf(prop) > 0 && this.isReact) {
                this.isDynamicValueChanged = true;
            }
            switch (prop) {
                case 'value':
                    this.isDynamicValueChanged = true;
                    this.invalidValueString = null;
                    this.checkInvalidValue(newProp.value);
                    newProp.value = this.value;
                    newProp.value = this.validateValue(newProp.value);
                    if (this.enableMask) {
                        Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                    }
                    else {
                        Input.setValue(this.getFormattedValue(newProp.value), this.inputElement, this.floatLabelType, this.showClearButton);
                    }
                    this.valueWithMinutes = newProp.value;
                    this.setProperties({ value: newProp.value }, true);
                    if (this.popupObj) {
                        this.popupUpdate();
                    }
                    this.previousDateTime = new Date(this.inputElement.value);
                    this.updateInput();
                    this.changeTrigger(null);
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    if (this.enableMask && this.value) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'min':
                case 'max':
                    this.getProperty(newProp, prop);
                    this.updateInput();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'cssClass':
                    if (!isNullOrUndefined(oldProp.cssClass)) {
                        oldProp.cssClass = (oldProp.cssClass.replace(/\s+/g, ' ')).trim();
                    }
                    if (!isNullOrUndefined(newProp.cssClass)) {
                        newProp.cssClass = (newProp.cssClass.replace(/\s+/g, ' ')).trim();
                    }
                    Input.setCssClass(newProp.cssClass, [this.inputWrapper.container], oldProp.cssClass);
                    if (this.dateTimeWrapper) {
                        Input.setCssClass(newProp.cssClass, [this.dateTimeWrapper], oldProp.cssClass);
                    }
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    if (this.dateTimeOptions && this.dateTimeOptions.placeholder == null) {
                        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                        Input.setPlaceholder(this.l10n.getConstant('placeholder'), this.inputElement);
                    }
                    this.dateTimeFormat = this.cldrDateTimeFormat();
                    super.updateInput();
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.checkAttributes(true);
                    break;
                case 'format':
                    this.setProperties({ format: newProp.format }, true);
                    this.checkFormat();
                    this.dateTimeFormat = this.formatString;
                    this.setValue();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        if (!this.value) {
                            Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                        }
                    }
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.inputElement);
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.inputElement);
                    if (this.enabled) {
                        this.inputElement.setAttribute('tabindex', this.tabIndex);
                    }
                    else {
                        this.inputElement.tabIndex = -1;
                    }
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    this.updateInput();
                    break;
                case 'width':
                    this.setWidth(newProp.width);
                    Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-date-time-icon');
                    }
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-date-time-icon');
                    }
                    break;
                case 'scrollTo':
                    if (this.checkDateValue(new Date(this.checkValue(newProp.scrollTo)))) {
                        if (this.dateTimeWrapper) {
                            this.setScrollTo();
                        }
                        this.setProperties({ scrollTo: this.checkDateValue(new Date(this.checkValue(newProp.scrollTo))) }, true);
                    }
                    else {
                        this.setProperties({ scrollTo: null }, true);
                    }
                    break;
                case 'enableMask':
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                    }
                    else {
                        if (this.inputElement.value === this.maskedDateValue) {
                            this.maskedDateValue = '';
                            Input.setValue(this.maskedDateValue, this.inputElement, this.floatLabelType, this.showClearButton);
                        }
                    }
                    break;
                default:
                    super.onPropertyChanged(newProp, oldProp);
                    break;
            }
            if (!this.isDynamicValueChanged) {
                this.hide(null);
            }
            this.isDynamicValueChanged = false;
        }
    }
    /**
     * To get component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    getModuleName() {
        return 'datetimepicker';
    }
    restoreValue() {
        this.previousDateTime = this.previousDate;
        this.currentDate = this.value ? this.value : new Date();
        this.valueWithMinutes = this.value;
        this.previousDate = this.value;
        this.previousElementValue = this.previousElementValue = (isNullOrUndefined(this.inputValueCopy)) ? '' :
            this.getFormattedValue(this.inputValueCopy);
    }
};
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "timeFormat", void 0);
__decorate$4([
    Property(30)
], DateTimePicker.prototype, "step", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "scrollTo", void 0);
__decorate$4([
    Property(1000)
], DateTimePicker.prototype, "zIndex", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "value", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "keyConfigs", void 0);
__decorate$4([
    Property({})
], DateTimePicker.prototype, "htmlAttributes", void 0);
__decorate$4([
    Property(false)
], DateTimePicker.prototype, "enablePersistence", void 0);
__decorate$4([
    Property(true)
], DateTimePicker.prototype, "allowEdit", void 0);
__decorate$4([
    Property(false)
], DateTimePicker.prototype, "isMultiSelection", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "values", void 0);
__decorate$4([
    Property(true)
], DateTimePicker.prototype, "showClearButton", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "placeholder", void 0);
__decorate$4([
    Property(false)
], DateTimePicker.prototype, "strictMode", void 0);
__decorate$4([
    Property(false)
], DateTimePicker.prototype, "fullScreenMode", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "serverTimezoneOffset", void 0);
__decorate$4([
    Property(new Date(1900, 0, 1))
], DateTimePicker.prototype, "min", void 0);
__decorate$4([
    Property(new Date(2099, 11, 31))
], DateTimePicker.prototype, "max", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "minTime", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "maxTime", void 0);
__decorate$4([
    Property(null)
], DateTimePicker.prototype, "firstDayOfWeek", void 0);
__decorate$4([
    Property('Gregorian')
], DateTimePicker.prototype, "calendarMode", void 0);
__decorate$4([
    Property('Month')
], DateTimePicker.prototype, "start", void 0);
__decorate$4([
    Property('Month')
], DateTimePicker.prototype, "depth", void 0);
__decorate$4([
    Property(false)
], DateTimePicker.prototype, "weekNumber", void 0);
__decorate$4([
    Property(true)
], DateTimePicker.prototype, "showTodayButton", void 0);
__decorate$4([
    Property('Short')
], DateTimePicker.prototype, "dayHeaderFormat", void 0);
__decorate$4([
    Property(false)
], DateTimePicker.prototype, "openOnFocus", void 0);
__decorate$4([
    Property(false)
], DateTimePicker.prototype, "enableMask", void 0);
__decorate$4([
    Property({ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' })
], DateTimePicker.prototype, "maskPlaceholder", void 0);
__decorate$4([
    Event()
], DateTimePicker.prototype, "open", void 0);
__decorate$4([
    Event()
], DateTimePicker.prototype, "close", void 0);
__decorate$4([
    Event()
], DateTimePicker.prototype, "cleared", void 0);
__decorate$4([
    Event()
], DateTimePicker.prototype, "blur", void 0);
__decorate$4([
    Event()
], DateTimePicker.prototype, "focus", void 0);
__decorate$4([
    Event()
], DateTimePicker.prototype, "created", void 0);
__decorate$4([
    Event()
], DateTimePicker.prototype, "destroyed", void 0);
DateTimePicker = __decorate$4([
    NotifyPropertyChanges
], DateTimePicker);

const ARROWLEFT = 'ArrowLeft';
const ARROWRIGHT = 'ArrowRight';
const ARROWUP = 'ArrowUp';
const ARROWDOWN = 'ArrowDown';
const TAB = 'Tab';
const SHIFTTAB = 'shiftTab';
const END = 'End';
const HOME = 'Home';
class MaskedDateTime {
    constructor(parent) {
        this.mask = '';
        this.defaultConstant = {
            day: 'day',
            month: 'month',
            year: 'year',
            hour: 'hour',
            minute: 'minute',
            second: 'second',
            dayOfTheWeek: 'day of the week'
        };
        this.hiddenMask = '';
        this.validCharacters = 'dMyhmHfasz';
        this.isDayPart = false;
        this.isMonthPart = false;
        this.isYearPart = false;
        this.isHourPart = false;
        this.isMinutePart = false;
        this.isSecondsPart = false;
        this.isMilliSecondsPart = false;
        this.monthCharacter = '';
        this.periodCharacter = '';
        this.isHiddenMask = false;
        this.isComplete = false;
        this.isNavigate = false;
        this.navigated = false;
        this.isBlur = false;
        this.formatRegex = /EEEEE|EEEE|EEE|EE|E|cccc|ccc|dddd|ddd|dd|d|MMMM|MMM|MM|M|yyyy|yyy|yy|y|HH|H|hh|h|mm|m|fff|ff|f|aa|a|ss|s|zzzz|zzz|zz|z|'[^']*'|'[^']*'/g;
        this.isDeletion = false;
        this.isShortYear = false;
        this.isDeleteKey = false;
        this.isDateZero = false;
        this.isMonthZero = false;
        this.isYearZero = false;
        this.isLeadingZero = false;
        this.dayTypeCount = 0;
        this.monthTypeCount = 0;
        this.hourTypeCount = 0;
        this.minuteTypeCount = 0;
        this.secondTypeCount = 0;
        this.parent = parent;
        this.dateformat = this.getCulturedFormat();
        this.maskDateValue = this.parent.value != null ? new Date(+this.parent.value) : new Date();
        this.maskDateValue.setMonth(0);
        this.maskDateValue.setHours(0);
        this.maskDateValue.setMinutes(0);
        this.maskDateValue.setSeconds(0);
        this.previousDate = new Date(this.maskDateValue.getFullYear(), this.maskDateValue.getMonth(), this.maskDateValue.getDate(), this.maskDateValue.getHours(), this.maskDateValue.getMinutes(), this.maskDateValue.getSeconds());
        this.removeEventListener();
        this.addEventListener();
    }
    getModuleName() {
        return 'MaskedDateTime';
    }
    addEventListener() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on('createMask', this.createMask, this);
        this.parent.on('setMaskSelection', this.validCharacterCheck, this);
        this.parent.on('inputHandler', this.maskInputHandler, this);
        this.parent.on('keyDownHandler', this.maskKeydownHandler, this);
        this.parent.on('clearHandler', this.clearHandler, this);
        this.parent.on('maskPasteInputHandler', this.maskPasteInputHandler, this);
    }
    removeEventListener() {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('createMask', this.createMask);
        this.parent.off('setMaskSelection', this.validCharacterCheck);
        this.parent.off('inputHandler', this.maskInputHandler);
        this.parent.off('keyDownHandler', this.maskKeydownHandler);
        this.parent.off('clearHandler', this.clearHandler);
        this.parent.off('maskPasteInputHandler', this.maskPasteInputHandler);
    }
    createMask(mask) {
        this.isDayPart = this.isMonthPart = this.isYearPart = this.isHourPart = this.isMinutePart = this.isSecondsPart = false;
        this.dateformat = this.getCulturedFormat();
        if (this.parent.maskPlaceholder.day) {
            this.defaultConstant['day'] = this.parent.maskPlaceholder.day;
        }
        if (this.parent.maskPlaceholder.month) {
            this.defaultConstant['month'] = this.parent.maskPlaceholder.month;
        }
        if (this.parent.maskPlaceholder.year) {
            this.defaultConstant['year'] = this.parent.maskPlaceholder.year;
        }
        if (this.parent.maskPlaceholder.hour) {
            this.defaultConstant['hour'] = this.parent.maskPlaceholder.hour;
        }
        if (this.parent.maskPlaceholder.minute) {
            this.defaultConstant['minute'] = this.parent.maskPlaceholder.minute;
        }
        if (this.parent.maskPlaceholder.second) {
            this.defaultConstant['second'] = this.parent.maskPlaceholder.second;
        }
        if (this.parent.maskPlaceholder.dayOfTheWeek) {
            this.defaultConstant['dayOfTheWeek'] = this.parent.maskPlaceholder.dayOfTheWeek.toString();
        }
        this.getCUltureMaskFormat();
        const inputValue = this.dateformat.replace(this.formatRegex, this.formatCheck());
        this.isHiddenMask = true;
        this.hiddenMask = this.dateformat.replace(this.formatRegex, this.formatCheck());
        this.isHiddenMask = false;
        this.previousHiddenMask = this.hiddenMask;
        this.mask = this.previousValue = inputValue;
        this.parent.maskedDateValue = this.mask;
        if (this.parent.value) {
            this.navigated = true;
            this.isBlur = mask.isBlur;
            this.setDynamicValue();
        }
    }
    getCUltureMaskFormat() {
        this.l10n = new L10n(this.parent.moduleName, this.defaultConstant, this.parent.locale);
        this.objectString = Object.keys(this.defaultConstant);
        for (let i = 0; i < this.objectString.length; i++) {
            this.defaultConstant[this.objectString[i].toString()] =
                this.l10n.getConstant(this.objectString[i].toString());
        }
    }
    validCharacterCheck() {
        let start = this.parent.inputElement.selectionStart;
        if (this.parent.moduleName !== 'timepicker') {
            if (start === this.hiddenMask.length && this.mask === this.parent.inputElement.value) {
                start = 0;
            }
        }
        for (let i = start, j = start - 1; i < this.hiddenMask.length || j >= 0; i++, j--) {
            if (i < this.hiddenMask.length && this.validCharacters.indexOf(this.hiddenMask[i]) !== -1) {
                this.setSelection(this.hiddenMask[i]);
                return;
            }
            if (j >= 0 && this.validCharacters.indexOf(this.hiddenMask[j]) !== -1) {
                this.setSelection(this.hiddenMask[j]);
                return;
            }
        }
    }
    setDynamicValue() {
        this.maskDateValue = new Date(+this.parent.value);
        this.isDayPart = this.isMonthPart = this.isYearPart = this.isHourPart = this.isMinutePart = this.isSecondsPart = true;
        this.updateValue();
        if (!this.isBlur) {
            this.validCharacterCheck();
        }
    }
    setSelection(validChar) {
        let start = -1;
        let end = 0;
        for (let i = 0; i < this.hiddenMask.length; i++) {
            if (this.hiddenMask[i] === validChar) {
                end = i + 1;
                if (start === -1) {
                    start = i;
                }
            }
        }
        if (start < 0) {
            start = 0;
        }
        this.parent.inputElement.setSelectionRange(start, end);
    }
    maskKeydownHandler(args) {
        if (args.e.key === 'Backspace') {
            const start = this.parent.inputElement.selectionStart;
            let formatText = '';
            if (this.validCharacters.indexOf(this.hiddenMask[start]) !== -1) {
                formatText = this.hiddenMask[start];
            }
            switch (formatText) {
                case 'd':
                    this.dayTypeCount = Math.max(this.dayTypeCount - 1, 0);
                    break;
                case 'M':
                    this.monthTypeCount = Math.max(this.monthTypeCount - 1, 0);
                    break;
                case 'H':
                case 'h':
                    this.hourTypeCount = Math.max(this.hourTypeCount - 1, 0);
                    break;
                case 'm':
                    this.minuteTypeCount = Math.max(this.minuteTypeCount - 1, 0);
                    break;
                case 's':
                    this.secondTypeCount = Math.max(this.secondTypeCount - 1, 0);
                    break;
            }
            return;
        }
        this.dayTypeCount = this.monthTypeCount = this.hourTypeCount = this.minuteTypeCount = this.secondTypeCount = 0;
        if (args.e.key === 'Delete') {
            this.isDeleteKey = true;
            return;
        }
        if ((!args.e.altKey && !args.e.ctrlKey) && (args.e.key === ARROWLEFT || args.e.key === ARROWRIGHT
            || args.e.key === SHIFTTAB || args.e.key === TAB || args.e.action === SHIFTTAB ||
            args.e.key === END || args.e.key === HOME)) {
            const start = this.parent.inputElement.selectionStart;
            const end = this.parent.inputElement.selectionEnd;
            const length = this.parent.inputElement.value.length;
            if ((start === 0 && end === length) && (args.e.key === TAB || args.e.action === SHIFTTAB)) {
                const index = args.e.action === SHIFTTAB ? end : 0;
                this.parent.inputElement.selectionStart = this.parent.inputElement.selectionEnd = index;
            }
            if (args.e.key === END || args.e.key === HOME) {
                const range = args.e.key === END ? length : 0;
                this.parent.inputElement.selectionStart = this.parent.inputElement.selectionEnd = range;
            }
            this.navigateSelection(args.e.key === ARROWLEFT || args.e.action === SHIFTTAB || args.e.key === END ? true : false);
        }
        if ((!args.e.altKey && !args.e.ctrlKey) && (args.e.key === ARROWUP || args.e.key === ARROWDOWN)) {
            let start = this.parent.inputElement.selectionStart;
            let formatText = '';
            if (this.validCharacters.indexOf(this.hiddenMask[start]) !== -1) {
                formatText = this.hiddenMask[start];
            }
            this.dateAlteration(args.e.key === ARROWDOWN ? true : false);
            const inputValue = this.dateformat.replace(this.formatRegex, this.formatCheck());
            this.isHiddenMask = true;
            this.hiddenMask = this.dateformat.replace(this.formatRegex, this.formatCheck());
            this.isHiddenMask = false;
            this.previousHiddenMask = this.hiddenMask;
            this.previousValue = inputValue;
            this.parent.inputElement.value = inputValue;
            for (let i = 0; i < this.hiddenMask.length; i++) {
                if (formatText === this.hiddenMask[i]) {
                    start = i;
                    break;
                }
            }
            this.parent.inputElement.selectionStart = start;
            this.validCharacterCheck();
        }
    }
    isPersist() {
        const isPersist = this.parent.isFocused || this.navigated;
        return isPersist;
    }
    differenceCheck() {
        const start = this.parent.inputElement.selectionStart;
        const inputValue = this.parent.inputElement.value;
        const previousVal = this.previousValue.substring(0, start + this.previousValue.length - inputValue.length);
        const newVal = inputValue.substring(0, start);
        const newDateValue = new Date(+this.maskDateValue);
        const maxDate = new Date(newDateValue.getFullYear(), newDateValue.getMonth() + 1, 0).getDate();
        if (previousVal.indexOf(newVal) === 0 && (newVal.length === 0 ||
            this.previousHiddenMask[newVal.length - 1] !== this.previousHiddenMask[newVal.length])) {
            for (let i = newVal.length; i < previousVal.length; i++) {
                if (this.previousHiddenMask[i] !== '' && this.validCharacters.indexOf(this.previousHiddenMask[i]) >= 0) {
                    this.isDeletion = this.handleDeletion(this.previousHiddenMask[i], false);
                }
            }
            if (this.isDeletion) {
                return;
            }
        }
        switch (this.previousHiddenMask[start - 1]) {
            case 'd':
                {
                    let date = (this.isDayPart && newDateValue.getDate().toString().length < 2 &&
                        !this.isPersist() ? newDateValue.getDate() * 10 : 0) + parseInt(newVal[start - 1], 10);
                    this.isDateZero = (newVal[start - 1] === '0');
                    this.parent.isFocused = this.parent.isFocused ? false : this.parent.isFocused;
                    this.navigated = this.navigated ? false : this.navigated;
                    if (isNaN(date)) {
                        return;
                    }
                    for (let i = 0; date > maxDate; i++) {
                        date = parseInt(date.toString().slice(1), 10);
                    }
                    if (date >= 1) {
                        newDateValue.setDate(date);
                        this.isNavigate = date.toString().length === 2;
                        this.previousDate = new Date(newDateValue.getFullYear(), newDateValue.getMonth(), newDateValue.getDate());
                        if (newDateValue.getMonth() !== this.maskDateValue.getMonth()) {
                            return;
                        }
                        this.isDayPart = true;
                        const maxDaysInMonth = new Date(newDateValue.getFullYear(), newDateValue.getMonth() + 1, 0).getDate();
                        this.dayTypeCount += (this.dayTypeCount === 0 && (parseInt(date + '0', 10) > maxDaysInMonth)) ? 2 : 1;
                    }
                    else {
                        this.isDayPart = false;
                        if (!(this.dayTypeCount === 1 && this.isDateZero)) {
                            this.dayTypeCount += this.isDateZero ? 1 : 0;
                        }
                    }
                    break;
                }
            case 'M':
                {
                    let month;
                    if (newDateValue.getMonth().toString().length < 2 && !this.isPersist()) {
                        month = (this.isMonthPart ? (newDateValue.getMonth() + 1) * 10 : 0) + parseInt(newVal[start - 1], 10);
                    }
                    else {
                        month = parseInt(newVal[start - 1], 10);
                    }
                    this.parent.isFocused = this.parent.isFocused ? false : this.parent.isFocused;
                    this.navigated = this.navigated ? false : this.navigated;
                    this.isMonthZero = (newVal[start - 1] === '0');
                    if (!isNaN(month)) {
                        while (month > 12) {
                            month = parseInt(month.toString().slice(1), 10);
                        }
                        if (month >= 1) {
                            newDateValue.setMonth(month - 1);
                            if (month >= 10 || month === 1) {
                                if (this.isLeadingZero && month === 1) {
                                    this.isNavigate = month.toString().length === 1;
                                    this.isLeadingZero = false;
                                }
                                else {
                                    this.isNavigate = month.toString().length === 2;
                                }
                            }
                            else {
                                this.isNavigate = month.toString().length === 1;
                            }
                            if (newDateValue.getMonth() !== month - 1) {
                                newDateValue.setDate(1);
                                newDateValue.setMonth(month - 1);
                            }
                            if (this.isDayPart) {
                                const previousMaxDate = new Date(this.previousDate.getFullYear(), this.previousDate.getMonth() + 1, 0).getDate();
                                const currentMaxDate = new Date(newDateValue.getFullYear(), newDateValue.getMonth() + 1, 0).getDate();
                                if (this.previousDate.getDate() === previousMaxDate && currentMaxDate <= previousMaxDate) {
                                    newDateValue.setDate(currentMaxDate);
                                }
                            }
                            this.previousDate = new Date(newDateValue.getFullYear(), newDateValue.getMonth(), newDateValue.getDate());
                            this.isMonthPart = true;
                            this.monthTypeCount = this.monthTypeCount + 1;
                            this.isLeadingZero = false;
                        }
                        else {
                            newDateValue.setMonth(0);
                            this.isLeadingZero = true;
                            this.isMonthPart = false;
                            if (!(this.monthTypeCount === 1 && this.isMonthZero)) {
                                this.monthTypeCount += this.isMonthZero ? 1 : 0;
                            }
                        }
                    }
                    else {
                        const monthString = (this.getCulturedValue('months[stand-alone].wide'));
                        const monthValue = Object.keys(monthString);
                        this.monthCharacter += newVal[start - 1].toLowerCase();
                        while (this.monthCharacter.length > 0) {
                            let i = 1;
                            for (const months of monthValue) {
                                if (monthString[i].toLowerCase().indexOf(this.monthCharacter) === 0) {
                                    newDateValue.setMonth(i - 1);
                                    this.isMonthPart = true;
                                    this.maskDateValue = newDateValue;
                                    return;
                                }
                                i++;
                            }
                            this.monthCharacter = this.monthCharacter.substring(1, this.monthCharacter.length);
                        }
                    }
                    break;
                }
            case 'y':
                {
                    let year = (this.isYearPart && (newDateValue.getFullYear().toString().length < 4
                        && !this.isShortYear) ? newDateValue.getFullYear() * 10 : 0) + parseInt(newVal[start - 1], 10);
                    let yearValue = (this.dateformat.match(/y/g) || []).length;
                    yearValue = yearValue !== 2 ? 4 : yearValue;
                    this.isShortYear = false;
                    this.isYearZero = (newVal[start - 1] === '0');
                    if (isNaN(year)) {
                        return;
                    }
                    while (year > 9999) {
                        year = parseInt(year.toString().slice(1), 10);
                    }
                    if (year < 1) {
                        this.isYearPart = false;
                    }
                    else {
                        newDateValue.setFullYear(year);
                        if (year.toString().length === yearValue) {
                            this.isNavigate = true;
                        }
                        this.previousDate = new Date(newDateValue.getFullYear(), newDateValue.getMonth(), newDateValue.getDate());
                        this.isYearPart = true;
                    }
                    break;
                }
            case 'h':
                this.hour = (this.isHourPart && (newDateValue.getHours() % 12 || 12).toString().length < 2
                    && !this.isPersist() ? (newDateValue.getHours() % 12 || 12) * 10 : 0) + parseInt(newVal[start - 1], 10);
                this.parent.isFocused = this.parent.isFocused ? false : this.parent.isFocused;
                this.navigated = this.navigated ? false : this.navigated;
                if (isNaN(this.hour)) {
                    return;
                }
                while (this.hour > 12) {
                    this.hour = parseInt(this.hour.toString().slice(1), 10);
                }
                newDateValue.setHours(Math.floor(newDateValue.getHours() / 12) * 12 + (this.hour % 12));
                this.isNavigate = this.hour.toString().length === 2;
                this.isHourPart = true;
                this.hourTypeCount = (this.hourTypeCount === 0 && this.hour && (parseInt(this.hour + '0', 10) > 12)) ? 2 : this.hourTypeCount + 1;
                break;
            case 'H':
                this.hour = (this.isHourPart && newDateValue.getHours().toString().length < 2 &&
                    !this.isPersist() ? newDateValue.getHours() * 10 : 0) + parseInt(newVal[start - 1], 10);
                this.parent.isFocused = this.parent.isFocused ? false : this.parent.isFocused;
                this.navigated = this.navigated ? false : this.navigated;
                if (isNaN(this.hour)) {
                    return;
                }
                for (let i = 0; this.hour > 23; i++) {
                    this.hour = parseInt(this.hour.toString().slice(1), 10);
                }
                newDateValue.setHours(this.hour);
                this.isNavigate = this.hour.toString().length === 2;
                this.isHourPart = true;
                this.hourTypeCount = (this.hourTypeCount === 0 && this.hour && (parseInt(this.hour + '0', 10) > 23)) ? 2 : this.hourTypeCount + 1;
                break;
            case 'm':
                {
                    let minutes = (this.isMinutePart && newDateValue.getMinutes().toString().length < 2
                        && !this.isPersist() ? newDateValue.getMinutes() * 10 : 0) + parseInt(newVal[start - 1], 10);
                    this.parent.isFocused = this.parent.isFocused ? false : this.parent.isFocused;
                    this.navigated = this.navigated ? false : this.navigated;
                    if (isNaN(minutes)) {
                        return;
                    }
                    for (let i = 0; minutes > 59; i++) {
                        minutes = parseInt(minutes.toString().slice(1), 10);
                    }
                    newDateValue.setMinutes(minutes);
                    this.isNavigate = minutes.toString().length === 2;
                    this.isMinutePart = true;
                    this.minuteTypeCount = (this.minuteTypeCount === 0 && (parseInt(minutes + '0', 10) > 59)) ? 2 : this.minuteTypeCount + 1;
                    break;
                }
            case 's':
                {
                    let seconds = (this.isSecondsPart && newDateValue.getSeconds().toString().length < 2 &&
                        !this.isPersist() ? newDateValue.getSeconds() * 10 : 0) + parseInt(newVal[start - 1], 10);
                    this.parent.isFocused = this.parent.isFocused ? false : this.parent.isFocused;
                    this.navigated = this.navigated ? false : this.navigated;
                    if (isNaN(seconds)) {
                        return;
                    }
                    for (let i = 0; seconds > 59; i++) {
                        seconds = parseInt(seconds.toString().slice(1), 10);
                    }
                    newDateValue.setSeconds(seconds);
                    this.isNavigate = seconds.toString().length === 2;
                    this.isSecondsPart = true;
                    this.secondTypeCount = (this.secondTypeCount === 0 && (parseInt(seconds + '0', 10) > 59)) ? 2 : this.secondTypeCount + 1;
                    break;
                }
            case 'a':
                {
                    this.periodCharacter += newVal[start - 1].toLowerCase();
                    const periodString = (this.getCulturedValue('dayPeriods.format.wide'));
                    const periodkeys = Object.keys(periodString);
                    for (let i = 0; this.periodCharacter.length > 0; i++) {
                        if ((periodString[periodkeys[0]].toLowerCase().indexOf(this.periodCharacter) === 0
                            && newDateValue.getHours() >= 12) || (periodString[periodkeys[1]].toLowerCase().
                            indexOf(this.periodCharacter) === 0 && newDateValue.getHours() < 12)) {
                            newDateValue.setHours((newDateValue.getHours() + 12) % 24);
                            this.maskDateValue = newDateValue;
                        }
                        this.periodCharacter = this.periodCharacter.substring(1, this.periodCharacter.length);
                    }
                    break;
                }
        }
        this.maskDateValue = newDateValue;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formatCheck() {
        const proxy =  this;
        function formatValueSpecifier(formattext) {
            let result;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const daysAbbreviated = proxy.getCulturedValue('days[stand-alone].abbreviated');
            const dayKeyAbbreviated = Object.keys(daysAbbreviated);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const daysWide = (proxy.getCulturedValue('days[stand-alone].wide'));
            const dayKeyWide = Object.keys(daysWide);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const daysNarrow = (proxy.getCulturedValue('days[stand-alone].narrow'));
            const dayKeyNarrow = Object.keys(daysNarrow);
            const monthAbbreviated = (proxy.getCulturedValue('months[stand-alone].abbreviated'));
            const monthWide = (proxy.getCulturedValue('months[stand-alone].wide'));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const periodString = (proxy.getCulturedValue('dayPeriods.format.wide'));
            let milliseconds;
            let dateOptions;
            switch (formattext) {
                case 'ddd':
                case 'dddd':
                case 'd':
                    result = proxy.isDayPart ? proxy.maskDateValue.getDate().toString() : proxy.defaultConstant['day'].toString();
                    result = proxy.zeroCheck(proxy.isDateZero, proxy.isDayPart, result);
                    if (proxy.dayTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.dayTypeCount = 0;
                    }
                    break;
                case 'dd':
                    result = proxy.isDayPart ? proxy.roundOff(proxy.maskDateValue.getDate(), 2) : proxy.defaultConstant['day'].toString();
                    result = proxy.zeroCheck(proxy.isDateZero, proxy.isDayPart, result);
                    if (proxy.dayTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.dayTypeCount = 0;
                    }
                    break;
                case 'E':
                case 'EE':
                case 'EEE':
                case 'ccc':
                    result = proxy.isDayPart && proxy.isMonthPart && proxy.isYearPart ? daysAbbreviated[dayKeyAbbreviated[proxy.maskDateValue.getDay()]].toString() : proxy.defaultConstant['dayOfTheWeek'].toString();
                    break;
                case 'EEEE':
                case 'cccc':
                    result = proxy.isDayPart && proxy.isMonthPart && proxy.isYearPart ? daysWide[dayKeyWide[proxy.maskDateValue.getDay()]].toString() : proxy.defaultConstant['dayOfTheWeek'].toString();
                    break;
                case 'EEEEE':
                    result = proxy.isDayPart && proxy.isMonthPart && proxy.isYearPart ? daysNarrow[dayKeyNarrow[proxy.maskDateValue.getDay()]].toString() : proxy.defaultConstant['dayOfTheWeek'].toString();
                    break;
                case 'M':
                    result = proxy.isMonthPart ? (proxy.maskDateValue.getMonth() + 1).toString() : proxy.defaultConstant['month'].toString();
                    result = proxy.zeroCheck(proxy.isMonthZero, proxy.isMonthPart, result);
                    if (proxy.monthTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.monthTypeCount = 0;
                    }
                    break;
                case 'MM':
                    result = proxy.isMonthPart ? proxy.roundOff(proxy.maskDateValue.getMonth() + 1, 2) : proxy.defaultConstant['month'].toString();
                    result = proxy.zeroCheck(proxy.isMonthZero, proxy.isMonthPart, result);
                    if (proxy.monthTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.monthTypeCount = 0;
                    }
                    break;
                case 'MMM':
                    result = proxy.isMonthPart ? monthAbbreviated[proxy.maskDateValue.getMonth() + 1] : proxy.defaultConstant['month'].toString();
                    break;
                case 'MMMM':
                    result = proxy.isMonthPart ? monthWide[proxy.maskDateValue.getMonth() + 1] : proxy.defaultConstant['month'].toString();
                    break;
                case 'yy':
                    result = proxy.isYearPart ? proxy.roundOff(proxy.maskDateValue.getFullYear() % 100, 2) : proxy.defaultConstant['year'].toString();
                    result = proxy.zeroCheck(proxy.isYearZero, proxy.isYearPart, result);
                    break;
                case 'y':
                case 'yyy':
                case 'yyyy':
                    result = proxy.isYearPart ? proxy.roundOff(proxy.maskDateValue.getFullYear(), 4) : proxy.defaultConstant['year'].toString();
                    result = proxy.zeroCheck(proxy.isYearZero, proxy.isYearPart, result);
                    break;
                case 'h':
                    result = proxy.isHourPart ? (proxy.maskDateValue.getHours() % 12 || 12).toString() : proxy.defaultConstant['hour'].toString();
                    if (proxy.hourTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.hourTypeCount = 0;
                    }
                    break;
                case 'hh':
                    result = proxy.isHourPart ? proxy.roundOff(proxy.maskDateValue.getHours() % 12 || 12, 2) : proxy.defaultConstant['hour'].toString();
                    if (proxy.hourTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.hourTypeCount = 0;
                    }
                    break;
                case 'H':
                    result = proxy.isHourPart ? proxy.maskDateValue.getHours().toString() : proxy.defaultConstant['hour'].toString();
                    if (proxy.hourTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.hourTypeCount = 0;
                    }
                    break;
                case 'HH':
                    result = proxy.isHourPart ? proxy.roundOff(proxy.maskDateValue.getHours(), 2) : proxy.defaultConstant['hour'].toString();
                    if (proxy.hourTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.hourTypeCount = 0;
                    }
                    break;
                case 'm':
                    result = proxy.isMinutePart ? proxy.maskDateValue.getMinutes().toString() : proxy.defaultConstant['minute'].toString();
                    if (proxy.minuteTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.minuteTypeCount = 0;
                    }
                    break;
                case 'mm':
                    result = proxy.isMinutePart ? proxy.roundOff(proxy.maskDateValue.getMinutes(), 2) : proxy.defaultConstant['minute'].toString();
                    if (proxy.minuteTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.minuteTypeCount = 0;
                    }
                    break;
                case 's':
                    result = proxy.isSecondsPart ? proxy.maskDateValue.getSeconds().toString() : proxy.defaultConstant['second'].toString();
                    if (proxy.secondTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.secondTypeCount = 0;
                    }
                    break;
                case 'ss':
                    result = proxy.isSecondsPart ? proxy.roundOff(proxy.maskDateValue.getSeconds(), 2) : proxy.defaultConstant['second'].toString();
                    if (proxy.secondTypeCount === 2) {
                        proxy.isNavigate = true;
                        proxy.secondTypeCount = 0;
                    }
                    break;
                case 'f':
                    result = Math.floor(proxy.maskDateValue.getMilliseconds() / 100).toString();
                    break;
                case 'ff':
                    milliseconds = proxy.maskDateValue.getMilliseconds();
                    if (proxy.maskDateValue.getMilliseconds() > 99) {
                        milliseconds = Math.floor(proxy.maskDateValue.getMilliseconds() / 10);
                    }
                    result = proxy.roundOff(milliseconds, 2);
                    break;
                case 'fff':
                    result = proxy.roundOff(proxy.maskDateValue.getMilliseconds(), 3);
                    break;
                case 'a':
                case 'aa':
                    result = proxy.maskDateValue.getHours() < 12 ? periodString['am'] : periodString['pm'];
                    break;
                case 'z':
                case 'zz':
                case 'zzz':
                case 'zzzz':
                    dateOptions = {
                        format: formattext,
                        type: 'dateTime', skeleton: 'yMd', calendar: proxy.parent.calendarMode
                    };
                    result = proxy.parent.globalize.formatDate(proxy.maskDateValue, dateOptions);
                    break;
            }
            result = result !== undefined ? result : formattext.slice(1, formattext.length - 1);
            if (proxy.isHiddenMask) {
                let hiddenChar = '';
                for (let i = 0; i < result.length; i++) {
                    hiddenChar += formattext[0];
                }
                return hiddenChar;
            }
            else {
                return result;
            }
        }
        return formatValueSpecifier;
    }
    isValidDate(dateString) {
        const date = new Date(dateString);
        // Return true if the date is valid, false otherwise
        return !isNaN(date.getTime());
    }
    maskPasteInputHandler() {
        if (this.isValidDate(this.parent.inputElement.value)) {
            this.maskDateValue = new Date(this.parent.inputElement.value);
            this.isDayPart = this.isMonthPart = this.isYearPart = this.isHourPart = this.isMinutePart = this.isSecondsPart = true;
            this.updateValue();
            if (!this.isBlur) {
                this.validCharacterCheck();
            }
            return;
        }
        else {
            this.maskInputHandler();
        }
    }
    maskInputHandler() {
        let start = this.parent.inputElement.selectionStart;
        let formatText = '';
        if (this.validCharacters.indexOf(this.hiddenMask[start]) !== -1) {
            formatText = this.hiddenMask[start];
        }
        this.differenceCheck();
        const inputValue = this.dateformat.replace(this.formatRegex, this.formatCheck());
        this.isHiddenMask = true;
        this.hiddenMask = this.dateformat.replace(this.formatRegex, this.formatCheck());
        this.isDateZero = this.isMonthZero = this.isYearZero = false;
        this.isHiddenMask = false;
        this.previousHiddenMask = this.hiddenMask;
        this.previousValue = inputValue;
        this.parent.inputElement.value = inputValue;
        for (let i = 0; i < this.hiddenMask.length; i++) {
            if (formatText === this.hiddenMask[i]) {
                start = i;
                break;
            }
        }
        let scrollPositionY;
        if (Browser.isDevice && (Browser.isIos || Browser.isIos7)) {
            const scrollableParent = this.findScrollableParent(this.parent.inputElement);
            scrollPositionY = scrollableParent ? scrollableParent.getBoundingClientRect().top : window.scrollY;
        }
        this.parent.inputElement.selectionStart = start;
        this.validCharacterCheck();
        if ((this.isNavigate || this.isDeletion) && !this.isDeleteKey) {
            const isbackward = this.isNavigate ? false : true;
            this.isNavigate = this.isDeletion = false;
            this.navigateSelection(isbackward);
            if (Browser.isDevice && (Browser.isIos || Browser.isIos7)) {
                setTimeout(() => {
                    window.scrollTo(0, scrollPositionY);
                }, 0);
            }
        }
        if (this.isDeleteKey) {
            this.isDeletion = false;
        }
        this.isDeleteKey = false;
    }
    findScrollableParent(element) {
        while (element) {
            if (this.isScrollable(element)) {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }
    isScrollable(element) {
        const overflowY = window.getComputedStyle(element).overflowY;
        return element.scrollHeight > element.clientHeight && (overflowY === 'auto' || overflowY === 'scroll');
    }
    navigateSelection(isbackward) {
        const start = this.parent.inputElement.selectionStart;
        const end = this.parent.inputElement.selectionEnd;
        let formatIndex = isbackward ? start - 1 : end;
        this.navigated = true;
        while (formatIndex < this.hiddenMask.length && formatIndex >= 0) {
            if (this.validCharacters.indexOf(this.hiddenMask[formatIndex]) >= 0) {
                this.setSelection(this.hiddenMask[formatIndex]);
                break;
            }
            formatIndex = formatIndex + (isbackward ? -1 : 1);
        }
    }
    roundOff(val, count) {
        const valueText = val.toString();
        const length = count - valueText.length;
        let result = '';
        for (let i = 0; i < length; i++) {
            result += '0';
        }
        return result + valueText;
    }
    zeroCheck(isZero, isDayPart, resultValue) {
        let result = resultValue;
        if (isZero && !isDayPart) {
            result = '0';
        }
        return result;
    }
    handleDeletion(format, isSegment) {
        switch (format) {
            case 'd':
                this.isDayPart = isSegment;
                break;
            case 'M':
                this.isMonthPart = isSegment;
                if (!isSegment) {
                    this.maskDateValue.setMonth(0);
                    this.monthCharacter = '';
                }
                break;
            case 'y':
                this.isYearPart = isSegment;
                break;
            case 'H':
            case 'h':
                this.isHourPart = isSegment;
                if (!isSegment) {
                    this.periodCharacter = '';
                }
                break;
            case 'm':
                this.isMinutePart = isSegment;
                break;
            case 's':
                this.isSecondsPart = isSegment;
                break;
            default:
                return false;
        }
        return true;
    }
    dateAlteration(isDecrement) {
        const start = this.parent.inputElement.selectionStart;
        let formatText = '';
        if (this.validCharacters.indexOf(this.hiddenMask[start]) !== -1) {
            formatText = this.hiddenMask[start];
        }
        else {
            return;
        }
        const newDateValue = new Date(this.maskDateValue.getFullYear(), this.maskDateValue.getMonth(), this.maskDateValue.getDate(), this.maskDateValue.getHours(), this.maskDateValue.getMinutes(), this.maskDateValue.getSeconds());
        this.previousDate = new Date(this.maskDateValue.getFullYear(), this.maskDateValue.getMonth(), this.maskDateValue.getDate(), this.maskDateValue.getHours(), this.maskDateValue.getMinutes(), this.maskDateValue.getSeconds());
        const incrementValue = isDecrement ? -1 : 1;
        switch (formatText) {
            case 'd':
                newDateValue.setDate(newDateValue.getDate() + incrementValue);
                break;
            case 'M':
                {
                    const newMonth = newDateValue.getMonth() + incrementValue;
                    newDateValue.setDate(1);
                    newDateValue.setMonth(newMonth);
                    if (this.isDayPart) {
                        const previousMaxDate = new Date(this.previousDate.getFullYear(), this.previousDate.getMonth() + 1, 0).getDate();
                        const currentMaxDate = new Date(newDateValue.getFullYear(), newDateValue.getMonth() + 1, 0).getDate();
                        if (this.previousDate.getDate() === previousMaxDate && currentMaxDate <= previousMaxDate) {
                            newDateValue.setDate(currentMaxDate);
                        }
                        else {
                            newDateValue.setDate(this.previousDate.getDate());
                        }
                    }
                    else {
                        newDateValue.setDate(this.previousDate.getDate());
                    }
                    this.previousDate = new Date(newDateValue.getFullYear(), newDateValue.getMonth(), newDateValue.getDate());
                    break;
                }
            case 'y':
                newDateValue.setFullYear(newDateValue.getFullYear() + incrementValue);
                break;
            case 'H':
            case 'h':
                newDateValue.setHours(newDateValue.getHours() + incrementValue);
                break;
            case 'm':
                newDateValue.setMinutes(newDateValue.getMinutes() + incrementValue);
                break;
            case 's':
                newDateValue.setSeconds(newDateValue.getSeconds() + incrementValue);
                break;
            case 'a':
                newDateValue.setHours((newDateValue.getHours() + 12) % 24);
                break;
        }
        this.maskDateValue = newDateValue.getFullYear() > 0 ? newDateValue : this.maskDateValue;
        if (this.validCharacters.indexOf(this.hiddenMask[start]) !== -1) {
            this.handleDeletion(this.hiddenMask[start], true);
        }
    }
    getCulturedValue(format) {
        const locale = this.parent.locale;
        let result;
        if (locale === 'en' || locale === 'en-US') {
            result = getValue(format, getDefaultDateObject());
        }
        else {
            result = getValue('main.' + '' + locale + ('.dates.calendars.gregorian.' + format), cldrData);
        }
        return result;
    }
    getCulturedFormat() {
        let formatString = (this.getCulturedValue('dateTimeFormats[availableFormats].yMd')).toString();
        if (this.parent.moduleName === 'datepicker') {
            formatString = (this.getCulturedValue('dateTimeFormats[availableFormats].yMd')).toString();
            if (this.parent.format && this.parent.formatString) {
                formatString = this.parent.formatString;
            }
        }
        if (this.parent.moduleName === 'datetimepicker') {
            formatString = (this.getCulturedValue('dateTimeFormats[availableFormats].yMd')).toString();
            if (this.parent.dateTimeFormat) {
                formatString = this.parent.dateTimeFormat;
            }
        }
        if (this.parent.moduleName === 'timepicker') {
            formatString = this.parent.cldrTimeFormat();
        }
        return formatString;
    }
    clearHandler() {
        this.isDayPart = this.isMonthPart = this.isYearPart = this.isHourPart = this.isMinutePart = this.isSecondsPart = false;
        this.updateValue();
        if (this.parent.inputElement && this.parent.inputElement.value === this.parent.maskedDateValue && this.parent.inputWrapper && this.parent.inputWrapper.clearButton && !this.parent.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) {
            this.parent.inputWrapper.clearButton.classList.add('e-clear-icon-hide');
        }
    }
    updateValue() {
        this.monthCharacter = this.periodCharacter = '';
        const inputValue = this.dateformat.replace(this.formatRegex, this.formatCheck());
        this.isHiddenMask = true;
        this.hiddenMask = this.dateformat.replace(this.formatRegex, this.formatCheck());
        this.isHiddenMask = false;
        this.previousHiddenMask = this.hiddenMask;
        this.previousValue = inputValue;
        this.parent.updateInputValue(inputValue);
        if (this.parent.strictMode && (this.dayTypeCount !== 0 || this.monthTypeCount !== 0)) {
            this.isLeadingZero = false;
        }
        this.dayTypeCount = 0;
        this.monthTypeCount = 0;
    }
    destroy() {
        this.removeEventListener();
    }
}

export { Calendar, CalendarBase, DatePicker, DateRangePicker, DateTimePicker, Islamic, MaskedDateTime, Presets, TimeMaskPlaceholder, TimePicker, TimePickerBase };
//# sourceMappingURL=ej2-calendars.es2015.js.map
