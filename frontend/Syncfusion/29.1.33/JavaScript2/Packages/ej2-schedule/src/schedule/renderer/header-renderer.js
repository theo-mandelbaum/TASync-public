var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNullOrUndefined, createElement, remove, closest, addClass, removeClass, extend, append } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Calendar } from '@syncfusion/ej2-calendars';
import { Popup } from '@syncfusion/ej2-popups';
import * as events from '../base/constant';
import * as util from '../base/util';
import * as cls from '../base/css-constant';
/**
 * Header module
 */
var HeaderRenderer = /** @class */ (function () {
    function HeaderRenderer(parent) {
        this.parent = parent;
        this.l10n = this.parent.localeObj;
        this.renderHeader();
        this.addEventListener();
    }
    HeaderRenderer.prototype.addEventListener = function () {
        this.parent.on(events.documentClick, this.closeHeaderPopup, this);
    };
    HeaderRenderer.prototype.removeEventListener = function () {
        this.parent.off(events.documentClick, this.closeHeaderPopup);
    };
    HeaderRenderer.prototype.closeHeaderPopup = function (e) {
        var closestEle = closest(e.event.target, '.e-date-range,.e-header-popup,.e-day,.e-selected');
        var closestPop = closest(e.event.target, '.e-hor-nav,.e-toolbar-pop');
        var contentWrap = this.parent.element.querySelector('.' + cls.CONTENT_WRAP_CLASS);
        if (this.parent.isAdaptive) {
            if (!isNullOrUndefined(closestPop) && (closestPop.classList.contains('e-toolbar-pop') ||
                closestPop.classList.contains('e-hor-nav')) && !(closestPop.classList.contains('e-hor-nav') &&
                this.element.querySelector('.e-toolbar-pop').classList.contains(cls.POPUP_OPEN))) {
                addClass([contentWrap], cls.SCROLL_HIDDEN);
            }
            else {
                removeClass([contentWrap], cls.SCROLL_HIDDEN);
                var popupEle = this.element.querySelector('.e-toolbar-pop');
                if (!isNullOrUndefined(popupEle)) {
                    var popupObj = popupEle.ej2_instances[0];
                    if (popupObj && !(!isNullOrUndefined(closestPop) && closestPop.classList.contains('e-hor-nav') &&
                        popupEle.classList.contains(cls.POPUP_OPEN))) {
                        popupObj.hide();
                    }
                }
            }
        }
        if (!isNullOrUndefined(closestEle)) {
            return;
        }
        this.hideHeaderPopup();
    };
    HeaderRenderer.prototype.hideHeaderPopup = function () {
        if (this.headerPopup) {
            this.headerPopup.hide();
        }
    };
    HeaderRenderer.prototype.renderHeader = function () {
        this.element = createElement('div', { className: cls.TOOLBAR_CONTAINER });
        var toolbarEle = createElement('div', { className: cls.HEADER_TOOLBAR });
        this.element.appendChild(toolbarEle);
        this.parent.element.insertBefore(this.element, this.parent.element.firstElementChild);
        this.renderToolbar();
    };
    HeaderRenderer.prototype.renderToolbar = function () {
        var _this = this;
        var items = (this.parent.toolbarItems && this.parent.toolbarItems.length > 0) ?
            this.getToolbarItems() : this.getItems();
        this.parent.trigger(events.actionBegin, { requestType: 'toolbarItemRendering', items: items }, function (args) {
            _this.toolbarObj = new Toolbar({
                items: args.items,
                overflowMode: 'Popup',
                clicked: _this.toolbarClickHandler.bind(_this),
                created: _this.toolbarCreateHandler.bind(_this),
                enableRtl: _this.parent.enableRtl,
                enableHtmlSanitizer: _this.parent.enableHtmlSanitizer,
                locale: _this.parent.locale
            });
            _this.toolbarObj.isStringTemplate = true;
            _this.toolbarObj.root = _this.parent.root ? _this.parent.root : _this.parent;
            _this.toolbarObj.appendTo(_this.parent.element.querySelector('.' + cls.HEADER_TOOLBAR));
            _this.toolbarObj.element.setAttribute('aria-label', 'Scheduler');
            var prevNavEle = _this.toolbarObj.element.querySelector('.e-prev');
            if (prevNavEle) {
                prevNavEle.firstElementChild.setAttribute('title', _this.l10n.getConstant('previous'));
            }
            var nextNavEle = _this.toolbarObj.element.querySelector('.e-next');
            if (nextNavEle) {
                nextNavEle.firstElementChild.setAttribute('title', _this.l10n.getConstant('next'));
            }
            _this.updateAddIcon();
            _this.updateActiveView();
            _this.parent.trigger(events.actionComplete, { requestType: 'toolBarItemRendered', items: _this.toolbarObj.items });
        });
    };
    HeaderRenderer.prototype.updateItems = function () {
        var _this = this;
        if (this.toolbarObj) {
            var items = this.getItems();
            this.parent.trigger(events.actionBegin, { requestType: 'toolbarItemRendering', items: items }, function (args) {
                _this.toolbarObj.items = args.items;
                _this.toolbarObj.dataBind();
                _this.parent.trigger(events.actionComplete, { requestType: 'toolBarItemRendered', items: _this.toolbarObj.items });
            });
        }
    };
    HeaderRenderer.prototype.getPopUpRelativeElement = function () {
        if (this.parent.isAdaptive) {
            return this.toolbarObj.element;
        }
        return this.element.querySelector('.e-date-range');
    };
    HeaderRenderer.prototype.setDayOfWeek = function (index) {
        if (this.headerCalendar) {
            this.headerCalendar.firstDayOfWeek = index;
            this.headerCalendar.dataBind();
        }
    };
    HeaderRenderer.prototype.setCalendarDate = function (date) {
        if (this.headerCalendar) {
            this.headerCalendar.value = date;
            this.headerCalendar.dataBind();
        }
    };
    HeaderRenderer.prototype.setCalendarMinMaxDate = function () {
        if (this.headerCalendar) {
            this.headerCalendar.min = this.parent.minDate;
            this.headerCalendar.max = this.parent.maxDate;
            this.headerCalendar.dataBind();
        }
    };
    HeaderRenderer.prototype.getCalendarView = function () {
        if (['Month', 'MonthAgenda', 'TimelineMonth'].indexOf(this.parent.currentView) > -1) {
            return 'Year';
        }
        else if (['Year', 'TimelineYear'].indexOf(this.parent.currentView) > -1) {
            return 'Decade';
        }
        else {
            return 'Month';
        }
    };
    HeaderRenderer.prototype.setCalendarView = function () {
        if (this.headerCalendar) {
            var calendarView = this.getCalendarView();
            this.headerCalendar.depth = calendarView;
            this.headerCalendar.start = calendarView;
            this.headerCalendar.refresh();
        }
    };
    HeaderRenderer.prototype.updateActiveView = function () {
        var selEle = [].slice.call(this.toolbarObj.element.querySelectorAll('.e-views'));
        removeClass(selEle, ['e-active-view']);
        if (selEle.length > 0 && selEle[this.parent.viewIndex]) {
            addClass([selEle[this.parent.viewIndex]], ['e-active-view']);
        }
    };
    HeaderRenderer.prototype.updateDateRange = function (date) {
        var selEle = this.toolbarObj.element.querySelector('.e-date-range');
        if (!selEle) {
            return;
        }
        selEle.firstElementChild.setAttribute('aria-haspopup', 'true');
        var textEle = selEle.querySelector('.e-tbar-btn-text');
        if (this.parent.activeViewOptions.dateRangeTemplate) {
            textEle.textContent = '';
            var args = {
                startDate: this.parent.activeView.getStartDate(),
                endDate: this.parent.activeView.getEndDate(), currentView: this.parent.currentView
            };
            var viewName = this.parent.activeViewOptions.dateRangeTemplateName;
            var templateId = this.parent.element.id + '_' + viewName + 'dateRangeTemplate';
            var dateTemplate = [].slice.call(this.parent.getDateRangeTemplate()(args, this.parent, 'dateRangeTemplate', templateId, false, undefined, undefined, this.parent.root));
            append(dateTemplate, textEle);
        }
        else {
            var text = this.parent.activeView.getDateRangeText(date);
            selEle.firstElementChild.setAttribute('aria-label', text);
            textEle.textContent = text;
        }
        this.refresh();
    };
    HeaderRenderer.prototype.refresh = function () {
        if (this.toolbarObj) {
            this.toolbarObj.refreshOverflow();
        }
    };
    HeaderRenderer.prototype.updateAddIcon = function () {
        var addEle = this.toolbarObj.element.querySelector('.e-add');
        if (addEle) {
            if (!this.parent.eventSettings.allowAdding) {
                addClass([addEle], cls.HIDDEN_CLASS);
            }
            else {
                removeClass([addEle], cls.HIDDEN_CLASS);
            }
        }
    };
    HeaderRenderer.prototype.getDateRangeText = function () {
        var dateString = this.parent.globalize.formatDate(this.parent.selectedDate, {
            format: 'MMMM y', calendar: this.parent.getCalendarMode()
        });
        return util.capitalizeFirstWord(dateString, 'single');
    };
    HeaderRenderer.prototype.getItemModel = function (propItem) {
        var item = {};
        if (propItem.id) {
            item.id = propItem.id;
        }
        if (propItem.text) {
            item.text = propItem.text;
        }
        if (propItem.tooltipText) {
            item.tooltipText = propItem.tooltipText;
        }
        if (propItem.prefixIcon) {
            item.prefixIcon = propItem.prefixIcon;
        }
        if (propItem.cssClass) {
            item.cssClass = propItem.cssClass;
        }
        if (propItem.showTextOn !== 'Both') {
            item.showTextOn = propItem.showTextOn;
        }
        if (propItem.template) {
            item.template = propItem.template;
        }
        if (propItem.disabled) {
            item.disabled = propItem.disabled;
        }
        if (propItem.width !== 'auto') {
            item.width = propItem.width;
        }
        if (propItem.suffixIcon) {
            item.suffixIcon = propItem.suffixIcon;
        }
        if (propItem.align !== 'Left') {
            item.align = propItem.align;
        }
        if (propItem.overflow !== 'None') {
            item.overflow = propItem.overflow;
        }
        if (propItem.htmlAttributes) {
            item.htmlAttributes = propItem.htmlAttributes;
        }
        if (propItem.type !== 'Button') {
            item.type = propItem.type;
        }
        if (propItem.visible !== true) {
            item.visible = propItem.visible;
        }
        if (propItem.showAlwaysInPopup) {
            item.showAlwaysInPopup = propItem.showAlwaysInPopup;
        }
        if (propItem.tabIndex !== -1) {
            item.tabIndex = propItem.tabIndex;
        }
        return item;
    };
    HeaderRenderer.prototype.getToolbarItems = function () {
        var items = [];
        var propItem;
        for (var _i = 0, _a = this.parent.toolbarItems; _i < _a.length; _i++) {
            var item = _a[_i];
            propItem = this.getItemModel(item);
            var tbItem = void 0;
            if (item.name) {
                switch (item.name) {
                    case 'Today':
                        tbItem = {
                            showAlwaysInPopup: (this.parent.isAdaptive || this.parent.enableAdaptiveUI), prefixIcon: 'e-icon-today',
                            text: this.l10n.getConstant('today'), cssClass: 'e-today', overflow: 'Show'
                        };
                        tbItem.align = propItem.align ? propItem.align : item.align;
                        items.push(__assign({}, tbItem, propItem));
                        break;
                    case 'Previous':
                        tbItem = {
                            prefixIcon: 'e-icon-prev', tooltipText: 'Previous', overflow: 'Show',
                            cssClass: 'e-prev', htmlAttributes: { 'role': 'navigation' }
                        };
                        tbItem.align = propItem.align ? propItem.align : item.align;
                        items.push(__assign({}, tbItem, propItem));
                        break;
                    case 'Next':
                        tbItem = {
                            prefixIcon: 'e-icon-next', tooltipText: 'Next', overflow: 'Show',
                            cssClass: 'e-next', htmlAttributes: { 'role': 'navigation' }
                        };
                        tbItem.align = propItem.align ? propItem.align : item.align;
                        items.push(__assign({}, tbItem, propItem));
                        break;
                    case 'DateRangeText':
                        tbItem = {
                            text: this.getDateRangeText(), suffixIcon: 'e-icon-down-arrow', cssClass: 'e-date-range',
                            overflow: 'Show',
                            htmlAttributes: { 'aria-atomic': 'true', 'aria-live': 'assertive', 'role': 'navigation' }
                        };
                        tbItem.align = propItem.align ? propItem.align : item.align;
                        items.push(__assign({}, tbItem, propItem));
                        break;
                    case 'NewEvent':
                        tbItem = {
                            showAlwaysInPopup: (this.parent.isAdaptive || this.parent.enableAdaptiveUI), prefixIcon: 'e-icon-add',
                            text: this.l10n.getConstant('newEvent'), cssClass: 'e-add', overflow: 'Show'
                        };
                        tbItem.align = propItem.align ? propItem.align : item.align;
                        items.push(__assign({}, tbItem, propItem));
                        break;
                    case 'Views':
                        if (!isNullOrUndefined(this.parent.views) && this.parent.views.length > 1) {
                            for (var _b = 0, _c = this.parent.views; _b < _c.length; _b++) {
                                var view = _c[_b];
                                tbItem = this.getItemObject(view);
                                tbItem.align = propItem.align ? propItem.align : item.align;
                                items.push(__assign({}, tbItem, propItem));
                            }
                        }
                        break;
                    case 'Custom':
                        items.push(item);
                        break;
                }
            }
            else {
                items.push(item);
            }
        }
        return items;
    };
    HeaderRenderer.prototype.getItems = function () {
        var items = [];
        items.push({
            align: 'Left', prefixIcon: 'e-icon-prev', tooltipText: 'Previous', overflow: 'Show',
            cssClass: 'e-prev'
        });
        items.push({
            align: 'Left', prefixIcon: 'e-icon-next', tooltipText: 'Next', overflow: 'Show',
            cssClass: 'e-next'
        });
        items.push({
            align: 'Left', text: this.getDateRangeText(), suffixIcon: 'e-icon-down-arrow', cssClass: 'e-date-range',
            overflow: 'Show',
            htmlAttributes: { 'aria-atomic': 'true', 'aria-live': 'assertive' }
        });
        if (this.parent.isAdaptive || this.parent.enableAdaptiveUI) {
            items.push({
                align: 'Right', showAlwaysInPopup: (this.parent.isAdaptive || this.parent.enableAdaptiveUI), prefixIcon: 'e-icon-add',
                text: this.l10n.getConstant('newEvent'), cssClass: 'e-add', overflow: 'Show'
            });
            items.push({
                align: 'Right', showAlwaysInPopup: (this.parent.isAdaptive || this.parent.enableAdaptiveUI), prefixIcon: 'e-icon-today',
                text: this.l10n.getConstant('today'), cssClass: 'e-today', overflow: 'Show'
            });
        }
        else {
            items.push({
                align: 'Right', showAlwaysInPopup: (this.parent.isAdaptive || this.parent.enableAdaptiveUI), prefixIcon: 'e-icon-today',
                text: this.l10n.getConstant('today'), cssClass: 'e-today', overflow: 'Show'
            });
            if (!isNullOrUndefined(this.parent.views) && this.parent.views.length > 1) {
                items.push({ align: 'Right', type: 'Separator', cssClass: 'e-schedule-seperator' });
            }
        }
        if (!isNullOrUndefined(this.parent.views) && this.parent.views.length > 1) {
            for (var _i = 0, _a = this.parent.views; _i < _a.length; _i++) {
                var item = _a[_i];
                items.push(this.getItemObject(item));
            }
        }
        return items;
    };
    HeaderRenderer.prototype.getItemObject = function (item) {
        var viewName;
        var displayName;
        if (typeof (item) === 'string') {
            viewName = item.toLowerCase();
            displayName = null;
        }
        else {
            viewName = item.option.toLowerCase();
            displayName = item.displayName;
        }
        var view;
        var orientationClass;
        var isItemInsidePopup = this.parent.isAdaptive || this.parent.enableAdaptiveUI;
        switch (viewName) {
            case 'day':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-day',
                    text: displayName || this.l10n.getConstant('day'), cssClass: 'e-views e-day'
                };
                break;
            case 'week':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-week',
                    text: displayName || this.l10n.getConstant('week'), cssClass: 'e-views e-week'
                };
                break;
            case 'workweek':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-workweek',
                    text: displayName || this.l10n.getConstant('workWeek'), cssClass: 'e-views e-work-week'
                };
                break;
            case 'month':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-month',
                    text: displayName || this.l10n.getConstant('month'), cssClass: 'e-views e-month'
                };
                break;
            case 'year':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-year',
                    text: displayName || this.l10n.getConstant('year'), cssClass: 'e-views e-year'
                };
                break;
            case 'agenda':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-agenda',
                    text: displayName || this.l10n.getConstant('agenda'), cssClass: 'e-views e-agenda'
                };
                break;
            case 'monthagenda':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-month-agenda',
                    text: displayName || this.l10n.getConstant('monthAgenda'), cssClass: 'e-views e-month-agenda'
                };
                break;
            case 'timelineday':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-timeline-day',
                    text: displayName || this.l10n.getConstant('timelineDay'), cssClass: 'e-views e-timeline-day'
                };
                break;
            case 'timelineweek':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-timeline-week',
                    text: displayName || this.l10n.getConstant('timelineWeek'), cssClass: 'e-views e-timeline-week'
                };
                break;
            case 'timelineworkweek':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-timeline-workweek',
                    text: displayName || this.l10n.getConstant('timelineWorkWeek'), cssClass: 'e-views e-timeline-work-week'
                };
                break;
            case 'timelinemonth':
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-timeline-month',
                    text: displayName || this.l10n.getConstant('timelineMonth'), cssClass: 'e-views e-timeline-month'
                };
                break;
            case 'timelineyear':
                orientationClass = (item.orientation === 'Vertical') ? 'vertical' : 'horizontal';
                view = {
                    align: 'Right', showAlwaysInPopup: isItemInsidePopup, prefixIcon: 'e-icon-timeline-year-' + orientationClass,
                    text: displayName || this.l10n.getConstant('timelineYear'), cssClass: 'e-views e-timeline-year'
                };
                break;
        }
        return view;
    };
    HeaderRenderer.prototype.renderHeaderPopup = function () {
        var headerPopupEle = createElement('div', { className: cls.HEADER_POPUP_CLASS });
        var headerCalendarEle = createElement('div', { className: cls.HEADER_CALENDAR_CLASS });
        headerPopupEle.appendChild(headerCalendarEle);
        this.element.appendChild(headerPopupEle);
        this.headerPopup = new Popup(headerPopupEle, {
            actionOnScroll: 'hide',
            targetType: 'relative',
            relateTo: this.getPopUpRelativeElement(),
            position: { X: 'left', Y: 'bottom' },
            collision: { X: 'fit' },
            viewPortElement: this.element,
            enableRtl: this.parent.enableRtl
        });
        var calendarView = this.getCalendarView();
        var isDisplayDate = this.parent.currentView === 'Month' &&
            !isNullOrUndefined(this.parent.activeViewOptions.displayDate) && !this.hasSelectedDate();
        this.headerCalendar = new Calendar({
            value: isDisplayDate ? this.parent.activeViewOptions.displayDate : this.parent.selectedDate,
            min: this.parent.minDate,
            max: this.parent.maxDate,
            firstDayOfWeek: this.parent.activeViewOptions.firstDayOfWeek,
            weekNumber: this.parent.activeViewOptions.showWeekNumber,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            depth: calendarView,
            start: calendarView,
            calendarMode: this.parent.calendarMode,
            change: this.calendarChange.bind(this)
        });
        this.setCalendarTimezone();
        this.headerCalendar.appendTo(headerCalendarEle);
        this.headerPopup.hide();
    };
    HeaderRenderer.prototype.calendarChange = function (args) {
        if (args.value.getTime() !== this.parent.selectedDate.getTime()) {
            var calendarDate = util.resetTime(new Date(args.value));
            this.parent.changeDate(calendarDate);
        }
        this.headerPopup.hide();
    };
    HeaderRenderer.prototype.setCalendarTimezone = function () {
        if (this.headerCalendar) {
            this.headerCalendar.timezone = this.parent.timezone || this.parent.tzModule.getLocalTimezoneName();
        }
    };
    HeaderRenderer.prototype.calculateViewIndex = function (args) {
        var target = closest(args.originalEvent.target, '.e-views');
        var views = [].slice.call(this.element.querySelectorAll('.e-views'));
        return views.indexOf(target);
    };
    HeaderRenderer.prototype.toolbarCreateHandler = function () {
        if (this.parent && this.parent.portals && this.toolbarObj && this.toolbarObj.portals) {
            this.parent.portals = this.parent.portals.concat(this.toolbarObj.portals);
            this.parent['renderReactTemplates']();
        }
    };
    HeaderRenderer.prototype.toolbarClickHandler = function (args) {
        if (!args.item) {
            return;
        }
        var strClass = args.item.cssClass.replace('e-views ', '');
        var data;
        var isSameTime;
        var currentTime;
        switch (strClass) {
            case 'e-date-range':
                if (!this.headerPopup) {
                    this.renderHeaderPopup();
                }
                if (this.headerPopup.element.classList.contains(cls.POPUP_OPEN)) {
                    this.headerPopup.hide();
                }
                else {
                    this.headerPopup.show();
                }
                break;
            case 'e-day':
                this.parent.changeView('Day', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-week':
                this.parent.changeView('Week', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-work-week':
                this.parent.changeView('WorkWeek', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-month':
                this.parent.changeView('Month', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-year':
                this.parent.changeView('Year', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-agenda':
                this.parent.changeView('Agenda', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-month-agenda':
                this.parent.changeView('MonthAgenda', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-timeline-day':
                this.parent.changeView('TimelineDay', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-timeline-week':
                this.parent.changeView('TimelineWeek', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-timeline-work-week':
                this.parent.changeView('TimelineWorkWeek', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-timeline-month':
                this.parent.changeView('TimelineMonth', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-timeline-year':
                this.parent.changeView('TimelineYear', args.originalEvent, undefined, this.calculateViewIndex(args));
                break;
            case 'e-today':
                currentTime = util.resetTime(this.parent.getCurrentTime());
                if (this.parent.currentView === 'Agenda' || this.parent.currentView === 'MonthAgenda' || !this.parent.isSelectedDate(currentTime) ||
                    this.parent.currentView === 'Month' && this.parent.activeViewOptions.displayDate && !this.hasSelectedDate() &&
                        util.resetTime(this.parent.activeViewOptions.displayDate) !== currentTime || this.parent.currentView === 'Month' &&
                    this.parent.activeViewOptions.numberOfWeeks > 0 && !this.hasSelectedDate()
                    && util.resetTime(util.firstDateOfMonth(this.parent.selectedDate)) !== currentTime) {
                    this.parent.changeDate(currentTime, args.originalEvent);
                }
                break;
            case 'e-prev':
                this.parent.changeDate(this.parent.activeView.getNextPreviousDate('Previous'), args.originalEvent);
                break;
            case 'e-next':
                this.parent.changeDate(this.parent.activeView.getNextPreviousDate('Next'), args.originalEvent);
                break;
            case 'e-add':
                isSameTime = this.parent.activeCellsData.startTime.getTime() === this.parent.activeCellsData.endTime.getTime();
                if (this.parent.activeCellsData && !isSameTime) {
                    data = this.parent.activeCellsData;
                }
                else {
                    var interval = this.parent.activeViewOptions.timeScale.interval;
                    var slotCount = this.parent.activeViewOptions.timeScale.slotCount;
                    var msInterval = (interval * util.MS_PER_MINUTE) / slotCount;
                    var startTime = new Date(this.parent.selectedDate.getTime());
                    var currentTime_1 = this.parent.getCurrentTime();
                    startTime.setHours(currentTime_1.getHours(), (Math.round(startTime.getMinutes() / msInterval) * msInterval), 0);
                    var endTime = new Date(new Date(startTime.getTime()).setMilliseconds(startTime.getMilliseconds() + msInterval));
                    data = { startTime: startTime, endTime: endTime, isAllDay: false };
                }
                this.parent.eventWindow.openEditor(extend(data, { cancel: false, event: args.originalEvent }), 'Add');
                break;
        }
        if (isNullOrUndefined(this.toolbarObj)) {
            return;
        }
        var toolbarPopUp = this.toolbarObj.element.querySelector('.e-toolbar-pop');
        if (toolbarPopUp && args.item.type !== 'Input') {
            toolbarPopUp.ej2_instances[0].hide({ name: 'SlideUp', duration: 100 });
        }
    };
    HeaderRenderer.prototype.hasSelectedDate = function () {
        var selectedTime = util.resetTime(this.parent.selectedDate).getTime();
        return selectedTime >= this.parent.activeView.getStartDate().getTime() &&
            selectedTime <= this.parent.activeView.getEndDate().getTime();
    };
    HeaderRenderer.prototype.getHeaderElement = function () {
        return this.toolbarObj.element;
    };
    HeaderRenderer.prototype.updateHeaderItems = function (classType) {
        var prevNavEle = this.toolbarObj.element.querySelector('.e-prev');
        var nextNavEle = this.toolbarObj.element.querySelector('.e-next');
        var dateRangeEle = this.toolbarObj.element.querySelector('.e-date-range');
        if (prevNavEle) {
            if (classType === 'add') {
                addClass([prevNavEle], cls.HIDDEN_CLASS);
            }
            else {
                removeClass([prevNavEle], cls.HIDDEN_CLASS);
            }
        }
        if (nextNavEle) {
            if (classType === 'add') {
                addClass([nextNavEle], cls.HIDDEN_CLASS);
            }
            else {
                removeClass([nextNavEle], cls.HIDDEN_CLASS);
            }
        }
        if (dateRangeEle) {
            if (classType === 'add') {
                addClass([dateRangeEle], cls.TEXT_ELLIPSIS);
            }
            else {
                removeClass([dateRangeEle], cls.TEXT_ELLIPSIS);
            }
        }
    };
    HeaderRenderer.prototype.previousNextIconHandler = function () {
        var dates = (this.parent.currentView === 'Agenda' ?
            [this.parent.getCurrentViewDates()[0]] : this.parent.getCurrentViewDates());
        var prevNavEle = this.toolbarObj.element.querySelector('.' + cls.PREVIOUS_DATE_CLASS);
        var nextNavEle = this.toolbarObj.element.querySelector('.' + cls.NEXT_DATE_CLASS);
        var firstDate = new Date(dates[0].getTime());
        var lastDate = new Date(dates[dates.length - 1].getTime());
        if (this.parent.currentView === 'WorkWeek' || this.parent.currentView === 'TimelineWorkWeek') {
            firstDate = util.getWeekFirstDate(util.resetTime(this.parent.selectedDate), this.parent.activeViewOptions.firstDayOfWeek);
            lastDate = util.addDays(firstDate, 7 * this.parent.activeViewOptions.interval);
        }
        else if (this.parent.currentView === 'Month') {
            var isCustomMonth = !isNullOrUndefined(this.parent.activeViewOptions.displayDate) ||
                this.parent.activeViewOptions.numberOfWeeks > 0;
            firstDate = isCustomMonth ? this.parent.activeView.getStartDate() : util.firstDateOfMonth(this.parent.selectedDate);
            lastDate = isCustomMonth ? this.parent.activeView.getEndDate() :
                util.lastDateOfMonth(util.addMonths(firstDate, this.parent.activeViewOptions.interval - 1));
        }
        if (!isNullOrUndefined(prevNavEle)) {
            this.toolbarObj.enableItems(prevNavEle, firstDate > util.resetTime(this.parent.minDate));
        }
        if (!isNullOrUndefined(nextNavEle)) {
            this.toolbarObj.enableItems(nextNavEle, lastDate < util.resetTime(this.parent.maxDate));
        }
        this.setCalendarMinMaxDate();
    };
    HeaderRenderer.prototype.getModuleName = function () {
        return 'headerbar';
    };
    HeaderRenderer.prototype.destroy = function () {
        if (this.headerPopup && !this.headerPopup.isDestroyed) {
            this.headerPopup.destroy();
            this.headerPopup = null;
        }
        if (this.headerCalendar && !this.headerCalendar.isDestroyed) {
            this.headerCalendar.destroy();
            this.headerCalendar = null;
        }
        if (this.toolbarObj && !this.toolbarObj.isDestroyed) {
            this.toolbarObj.destroy();
            this.removeEventListener();
            remove(this.element);
            this.toolbarObj = null;
        }
        this.element = null;
        this.parent = null;
        this.l10n = null;
    };
    return HeaderRenderer;
}());
export { HeaderRenderer };
