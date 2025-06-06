/* eslint-disable @typescript-eslint/no-explicit-any */
import { print as basePrint, createElement, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { Schedule } from '../base/schedule';
import { TimelineYear } from '../renderer/timeline-year';
import { Year } from '../renderer/year';
import { TimelineMonth } from '../renderer/timeline-month';
import { TimelineViews } from '../renderer/timeline-view';
import { MonthAgenda } from '../renderer/month-agenda';
import { Agenda } from '../renderer/agenda';
import { Month } from '../renderer/month';
import { WorkWeek } from '../renderer/work-week';
import { Week } from '../renderer/week';
import { Day } from '../renderer/day';
import * as events from '../base/constant';
/**
 * Print Module
 */
var Print = /** @class */ (function () {
    function Print(parent) {
        this.parent = parent;
    }
    Print.prototype.print = function (printOptions) {
        if (isNullOrUndefined(printOptions)) {
            this.printScheduler();
        }
        else {
            this.printSchedulerWithModel(printOptions);
        }
    };
    Print.prototype.printScheduler = function () {
        var _this = this;
        var clone = this.parent.element.cloneNode(true);
        clone.id = this.parent.element.id + '_print';
        var args = { cancel: false, printElement: clone };
        this.parent.trigger(events.beforePrint, args, function (printElement) {
            if (printElement.cancel) {
                return;
            }
            document.body.appendChild(clone);
            var className = _this.parent.currentView === 'MonthAgenda' ? '.e-appointment-wrap' : '.e-content-wrap';
            var scrollableEle = _this.parent.element.querySelector(className);
            var links = [].slice.call(document.getElementsByTagName('head')[0].querySelectorAll('link, style'));
            var reference = '';
            for (var _i = 0, links_1 = links; _i < links_1.length; _i++) {
                var link = links_1[_i];
                reference += link.outerHTML;
            }
            var div = createElement('div');
            clone.style.width = _this.parent.element.offsetWidth + 'px';
            var elementWidth = Math.round((parseInt(clone.style.width, 10)) / 100) * 100;
            div.appendChild(clone);
            var printWindow = window.open('', 'print', 'height=550,width=' + elementWidth + ',tabbar=no');
            printWindow.document.write('<!DOCTYPE html><html><head>' + reference + '</head><body>' + div.innerHTML +
                '<script>(function() { window.ready = true; })();</script></body></html>');
            printWindow.document.close();
            printWindow.focus();
            setTimeout(function () {
                if (printWindow.ready && scrollableEle) {
                    // eslint-disable-next-line no-self-assign
                    scrollableEle.scrollLeft = scrollableEle.scrollLeft;
                    // eslint-disable-next-line no-self-assign
                    scrollableEle.scrollTop = scrollableEle.scrollTop;
                    var headerTimeCellsScroll = printWindow.document.querySelector('.e-date-header-wrap');
                    if (headerTimeCellsScroll) {
                        headerTimeCellsScroll.scrollLeft = scrollableEle.scrollLeft;
                    }
                    var timeCellsScroll = printWindow.document.querySelector('.e-time-cells-wrap');
                    if (timeCellsScroll) {
                        timeCellsScroll.scrollTop = scrollableEle.scrollTop;
                    }
                    var contentCellScroll = printWindow.document.querySelector(className);
                    if (contentCellScroll) {
                        contentCellScroll.scrollLeft = scrollableEle.scrollLeft;
                        contentCellScroll.scrollTop = scrollableEle.scrollTop;
                    }
                    printWindow.print();
                    printWindow.close();
                }
            }, 500);
        });
    };
    Print.prototype.printSchedulerWithModel = function (printOptions) {
        var _this = this;
        var element = createElement('div', { id: this.parent.element.id + '_print', className: 'e-print-schedule' });
        document.body.appendChild(element);
        Schedule.Inject(Day, Week, WorkWeek, Month, Agenda, MonthAgenda, TimelineViews, TimelineMonth, Year, TimelineYear);
        this.printInstance = new Schedule(this.getPrintScheduleModel(printOptions));
        this.printInstance.isPrinting = true;
        this.printInstance.registeredTemplate = this.parent.registeredTemplate;
        this.printInstance.root = this.parent.root ? this.parent.root : this.parent;
        this.printInstance.appendTo(element);
        var args = { cancel: false, printElement: element };
        this.parent.trigger(events.beforePrint, args, function (printElement) {
            if (printElement.cancel) {
                _this.printCleanup();
                return;
            }
            _this.printInstance.on(events.print, _this.contentReady, _this);
            _this.printWindow = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth + ',tabbar=no');
            _this.printWindow.moveTo(0, 0);
            _this.printWindow.resizeTo(screen.availWidth, screen.availHeight);
        });
    };
    Print.prototype.getPrintScheduleModel = function (printOptions) {
        var printModel = {};
        var scheduleProps = ['agendaDaysCount', 'calendarMode', 'cssClass', 'currentView',
            'dateFormat', 'enableRtl', 'endHour', 'eventSettings', 'firstDayOfWeek',
            'firstMonthOfYear', 'group', 'height', 'locale', 'maxDate', 'minDate', 'readonly',
            'resources', 'rowAutoHeight', 'selectedDate', 'showHeaderBar', 'showTimeIndicator', 'showWeekNumber',
            'showWeekend', 'startHour', 'timeFormat', 'timeScale', 'timezone', 'views', 'width', 'workDays', 'workHours',
            'dateHeaderTemplate', 'dateRangeTemplate', 'cellHeaderTemplate', 'dayHeaderTemplate', 'monthHeaderTemplate',
            'cellTemplate', 'resourceHeaderTemplate', 'headerIndentTemplate', 'actionBegin', 'actionComplete', 'actionFailure',
            'created', 'dataBinding', 'dataBound', 'destroyed', 'eventRendered', 'moreEventsClick', 'navigating', 'popupOpen', 'popupClose', 'renderCell'
        ];
        var scheduleTemplates = ['cellHeaderTemplate', 'dayHeaderTemplate', 'monthHeaderTemplate', 'cellTemplate',
            'dateHeaderTemplate', 'dateRangeTemplate', 'eventTemplate', 'resourceHeaderTemplate', 'headerIndentTemplate'];
        var scheduleEvents = ['actionBegin', 'actionComplete', 'actionFailure', 'created', 'dataBinding', 'dataBound',
            'destroyed', 'eventRendered', 'moreEventsClick', 'navigating', 'popupOpen', 'popupClose', 'renderCell'];
        var eventSettings;
        var group;
        var timeScale;
        var views;
        for (var _i = 0, scheduleProps_1 = scheduleProps; _i < scheduleProps_1.length; _i++) {
            var key = scheduleProps_1[_i];
            switch (key) {
                case 'eventSettings': {
                    eventSettings = Object.assign({}, this.parent.eventSettings.properties);
                    eventSettings.dataSource = this.parent.eventsData;
                    var eventTemplate = !isNullOrUndefined(printOptions.eventSettings) &&
                        !isNullOrUndefined(printOptions.eventSettings.template) ? printOptions.eventSettings.template : eventSettings.template;
                    eventSettings.template = !this.parent.isAngular && typeof (eventTemplate) === 'function' ? null : eventTemplate;
                    printModel.eventSettings = eventSettings;
                    break;
                }
                case 'group':
                    group = isNullOrUndefined(printOptions.group) ? this.parent.group : printOptions.group;
                    group.headerTooltipTemplate = null;
                    printModel.group = group;
                    break;
                case 'timeScale':
                    timeScale = isNullOrUndefined(printOptions.timeScale) ? this.parent.timeScale : printOptions.timeScale;
                    if (!this.parent.isAngular) {
                        timeScale.majorSlotTemplate = typeof (timeScale.majorSlotTemplate) === 'function' ? null : timeScale.majorSlotTemplate;
                        timeScale.minorSlotTemplate = typeof (timeScale.minorSlotTemplate) === 'function' ? null : timeScale.minorSlotTemplate;
                    }
                    printModel.timeScale = timeScale;
                    break;
                case 'views':
                    views = isNullOrUndefined(printOptions.views) ? this.parent.views : printOptions.views;
                    if (!this.parent.isAngular && views && views.length > 0 && typeof (views[0]) === 'object') {
                        var _loop_1 = function (view) {
                            scheduleTemplates.forEach(function (x) {
                                if (!isNullOrUndefined(view["" + x])) {
                                    view["" + x] = typeof (view["" + x]) === 'function' ? null : view["" + x];
                                }
                            });
                        };
                        for (var _a = 0, views_1 = views; _a < views_1.length; _a++) {
                            var view = views_1[_a];
                            _loop_1(view);
                        }
                    }
                    printModel.views = views;
                    break;
                default:
                    if (scheduleTemplates.indexOf(key) > -1) {
                        printModel["" + key] = isNullOrUndefined(printOptions["" + key]) ?
                            (!this.parent.isAngular && typeof (this.parent["" + key]) === 'function' ? null : this.parent["" + key]) :
                            (!this.parent.isAngular && typeof (printOptions["" + key]) === 'function' ? null : printOptions["" + key]);
                        break;
                    }
                    if (scheduleEvents.indexOf(key) > -1) {
                        printModel["" + key] = printOptions["" + key];
                        break;
                    }
                    printModel["" + key] = isNullOrUndefined(printOptions["" + key]) ?
                        this.parent["" + key] : printOptions["" + key];
                    break;
            }
        }
        return printModel;
    };
    Print.prototype.contentReady = function () {
        var _this = this;
        this.printWindow = basePrint(this.printInstance.element, this.printWindow);
        this.closePrintWindow(this.printWindow, true);
        this.printWindow.onbeforeunload = function () {
            _this.printCleanup();
        };
    };
    Print.prototype.closePrintWindow = function (printWindow, cleanupRequired) {
        var _this = this;
        if (Browser.isIos) {
            var printInterval_1 = setInterval(function () {
                if (printWindow.opener) {
                    printWindow.close();
                }
                else if (isNullOrUndefined(printWindow.opener)) {
                    if (cleanupRequired) {
                        _this.printCleanup();
                    }
                    clearInterval(printInterval_1);
                }
            }, 500);
        }
    };
    Print.prototype.printCleanup = function () {
        if (this.printInstance) {
            this.printInstance.off(events.print, this.contentReady);
            this.printInstance.element.remove();
            this.printInstance.destroy();
            this.printInstance = null;
        }
        if (this.printWindow) {
            this.printWindow.onbeforeunload = null;
            this.printWindow = null;
        }
    };
    Print.prototype.getModuleName = function () {
        return 'print';
    };
    Print.prototype.destroy = function () {
        this.parent = null;
    };
    return Print;
}());
export { Print };
