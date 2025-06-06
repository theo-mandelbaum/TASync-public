/* eslint-disable @typescript-eslint/no-explicit-any */
import { isNullOrUndefined, append, createElement, addClass, initializeCSPTemplate, removeClass } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import * as cls from '../base/css-constant';
import * as util from '../base/util';
import * as events from '../base/constant';
/**
 * Tooltip for Schedule
 */
var EventTooltip = /** @class */ (function () {
    function EventTooltip(parent) {
        this.parent = parent;
        this.tooltipObj = new Tooltip({
            animation: { close: { effect: 'FadeOut' } },
            content: 'No title',
            position: 'BottomRight',
            offsetY: 10,
            mouseTrail: this.parent.isAdaptive ? false : true,
            showTipPointer: false,
            cssClass: this.parent.cssClass + ' ' + cls.EVENT_TOOLTIP_ROOT_CLASS,
            target: this.getTargets(),
            beforeRender: this.onBeforeRender.bind(this),
            beforeClose: this.onTooltipClose.bind(this),
            beforeOpen: this.onTooltipOpen.bind(this),
            enableRtl: this.parent.enableRtl,
            enableHtmlSanitizer: this.parent.enableHtmlSanitizer
        });
        this.tooltipObj.appendTo(this.parent.element);
    }
    EventTooltip.prototype.getTargets = function () {
        var targets = [];
        if (this.parent.activeViewOptions.group.headerTooltipTemplate) {
            targets.push('.' + cls.RESOURCE_CELLS_CLASS);
        }
        if (this.parent.eventSettings.enableTooltip) {
            targets.push('.' + cls.APPOINTMENT_CLASS);
        }
        return targets.join(',');
    };
    EventTooltip.prototype.onBeforeRender = function (args) {
        var _this = this;
        if (this.parent.uiStateValues.isSwipeScroll) {
            args.cancel = true;
            return;
        }
        if (!isNullOrUndefined(args.target.getAttribute('data-tooltip-id'))) {
            return;
        }
        if (args.target.classList.contains(cls.RESOURCE_CELLS_CLASS) && this.parent.activeViewOptions.group.resources.length > 0) {
            var resCollection = void 0;
            if (this.parent.activeView.isTimelineView()) {
                var index = parseInt(args.target.getAttribute('data-group-index'), 10);
                resCollection = this.parent.resourceBase.lastResourceLevel[parseInt(index.toString(), 10)];
            }
            else {
                var rowIndex = args.target.parentNode.sectionRowIndex;
                var cellIndex = args.target.cellIndex;
                resCollection =
                    this.parent.activeView.getColumnLevels()[parseInt(rowIndex.toString(), 10)][parseInt(cellIndex.toString(), 10)];
            }
            var data = {
                resource: resCollection.resource,
                resourceData: resCollection.resourceData
            };
            var contentContainer = createElement('div');
            var templateId = this.parent.element.id + '_headerTooltipTemplate';
            var tooltipTemplate = [].slice.call(this.parent.getHeaderTooltipTemplate()(data, this.parent, 'headerTooltipTemplate', templateId, false));
            append(tooltipTemplate, contentContainer);
            this.setContent(contentContainer);
            this.parent.renderTemplates();
            return;
        }
        var record = this.parent.eventBase.getEventByGuid(args.target.getAttribute('data-guid'));
        if (isNullOrUndefined(record)) {
            return;
        }
        if (!isNullOrUndefined(this.parent.eventSettings.tooltipTemplate)) {
            var contentContainer = createElement('div');
            var templateId = this.parent.element.id + '_tooltipTemplate';
            var tooltipTemplate = [].slice.call(this.parent.getEventTooltipTemplate()(record, this.parent, 'tooltipTemplate', templateId, false));
            append(tooltipTemplate, contentContainer);
            this.setContent(contentContainer);
        }
        else {
            var globalize = this.parent.globalize;
            var fields = this.parent.eventFields;
            var eventStart = new Date('' + record[fields.startTime]);
            var eventEnd = new Date('' + record[fields.endTime]);
            eventEnd = ((eventEnd.getTime() - eventStart.getTime() !== 0) && eventEnd.getHours() === 0 && eventEnd.getMinutes() === 0) ?
                new Date(eventEnd.setMilliseconds(-1000)) : eventEnd;
            var startDate = util.resetTime(new Date('' + eventStart));
            var endDate = util.resetTime(new Date('' + eventEnd));
            var tooltipSubject = (record[fields.subject] || this.parent.eventSettings.fields.subject.default
                || this.parent.localeObj.getConstant('addTitle'));
            var tooltipLocation = !isNullOrUndefined(record[fields.location]) ? record[fields.location] : '';
            var startMonthDate = '';
            var startMonthYearDate = '';
            var endMonthYearDate = '';
            startMonthDate = globalize.formatDate(eventStart, {
                type: 'date', skeleton: 'MMMd', calendar: this.parent.getCalendarMode()
            });
            startMonthYearDate = globalize.formatDate(eventStart, {
                type: 'date', skeleton: 'medium', calendar: this.parent.getCalendarMode()
            });
            endMonthYearDate = globalize.formatDate(eventEnd, {
                type: 'date', skeleton: 'medium', calendar: this.parent.getCalendarMode()
            });
            startMonthDate = util.capitalizeFirstWord(startMonthDate, 'single');
            startMonthYearDate = util.capitalizeFirstWord(startMonthYearDate, 'single');
            endMonthYearDate = util.capitalizeFirstWord(endMonthYearDate, 'single');
            var startTime = this.parent.getTimeString(eventStart);
            var endTime = this.parent.getTimeString(eventEnd);
            var tooltipDetails = void 0;
            if (startDate.getTime() === endDate.getTime()) {
                tooltipDetails =
                    globalize.formatDate(eventStart, {
                        type: 'date', skeleton: 'long', calendar: this.parent.getCalendarMode()
                    });
                tooltipDetails = util.capitalizeFirstWord(tooltipDetails, 'single');
            }
            else {
                tooltipDetails = (startDate.getFullYear() === endDate.getFullYear()) ? (startMonthDate + ' - ' + endMonthYearDate) :
                    (startMonthYearDate + ' - ' + endMonthYearDate);
            }
            var tooltipTime = (record[fields.isAllDay]) ? this.parent.localeObj.getConstant('allDay') :
                (startTime + ' - ' + endTime);
            var content_1 = '<div><div class="e-subject">' + tooltipSubject + '</div>' +
                '<div class="e-location">' + tooltipLocation + '</div>' +
                '<div class="e-details">' + tooltipDetails + '</div>' +
                '<div class="e-all-day">' + tooltipTime + '</div></div>';
            var contentTemp = function () {
                return content_1;
            };
            this.setContent(initializeCSPTemplate(contentTemp));
        }
        this.parent.renderTemplates(function () {
            if (_this.parent && _this.parent.isReact && !isNullOrUndefined(_this.parent.eventSettings.tooltipTemplate)) {
                var wraps = (document.querySelector('.' + cls.TOOLTIP_HIDDEN_CLASS));
                if (wraps) {
                    removeClass([wraps], cls.TOOLTIP_HIDDEN_CLASS);
                }
            }
        });
    };
    EventTooltip.prototype.onTooltipOpen = function (args) {
        if (args.element && this.parent.isReact && !isNullOrUndefined(this.parent.eventSettings.tooltipTemplate)) {
            addClass([args.element], cls.TOOLTIP_HIDDEN_CLASS);
        }
        var record = this.parent.eventBase.getEventByGuid(args.target.getAttribute('data-guid'));
        if (isNullOrUndefined(record)) {
            return;
        }
        var callbackArgs = {
            cancel: false,
            data: record,
            content: args.element,
            target: args.target
        };
        this.parent.trigger(events.tooltipOpen, callbackArgs, function (callbackArgs) {
            if (callbackArgs.cancel) {
                args.cancel = true;
                return;
            }
            args.element = callbackArgs.content;
        });
    };
    EventTooltip.prototype.onTooltipClose = function (args) {
        if (args.element) {
            removeClass([args.element], cls.POPUP_OPEN);
            addClass([args.element], cls.POPUP_CLOSE);
        }
        if (!(this.parent.isReact && this.parent.eventWindow.dialogObject && this.parent.eventWindow.dialogObject.visible)) {
            this.parent.resetTemplates(['tooltipTemplate', 'headerTooltipTemplate']);
        }
    };
    EventTooltip.prototype.setContent = function (content) {
        this.tooltipObj.setProperties({ content: content, windowCollision: true }, true);
    };
    EventTooltip.prototype.close = function () {
        this.tooltipObj.close();
    };
    EventTooltip.prototype.destroy = function () {
        this.tooltipObj.destroy();
        addClass([this.parent.element], 'e-control');
        this.tooltipObj = null;
        this.parent = null;
    };
    return EventTooltip;
}());
export { EventTooltip };
