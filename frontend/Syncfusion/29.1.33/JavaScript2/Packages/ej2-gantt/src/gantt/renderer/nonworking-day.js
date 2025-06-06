import { createElement, formatUnit, remove, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import * as cls from '../base/css-constants';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
var NonWorkingDay = /** @class */ (function () {
    function NonWorkingDay(gantt) {
        this.weekendWidthUpdated = false;
        this.parent = gantt;
        this.nonworkingContainer = null;
        this.holidayContainer = null;
        this.weekendContainer = null;
    }
    /**
     * Method append nonworking container
     *
     * @returns {void} .
     */
    NonWorkingDay.prototype.createNonworkingContainer = function () {
        if (!this.parent.ganttChartModule.chartBodyContent.contains(this.nonworkingContainer)) {
            this.nonworkingContainer = createElement('div', {
                className: cls.nonworkingContainer
            });
            if (this.parent.enableTimelineVirtualization) {
                this.nonworkingContainer.style.height = '100%';
            }
            this.parent.ganttChartModule.chartBodyContent.insertBefore(this.nonworkingContainer, this.parent.ganttChartModule.chartBodyContent.firstChild);
        }
    };
    /**
     * calculation for holidays rendering.
     *
     * @returns {void} .
     * @private
     */
    NonWorkingDay.prototype.renderHolidays = function () {
        var _this = this;
        if (this.parent.holidays && this.parent.holidays.length > 0) {
            this.createNonworkingContainer();
            if (!this.nonworkingContainer.contains(this.holidayContainer)) {
                this.holidayContainer = createElement('div', {
                    className: cls.holidayContainer
                });
                if (this.parent.enableTimelineVirtualization) {
                    this.holidayContainer.style.height = '100%';
                    this.holidayContainer.style.zIndex = '-1';
                }
                this.nonworkingContainer.appendChild(this.holidayContainer);
            }
            var holidayElements = this.getHolidaysElement().childNodes;
            this.holidayContainer.innerHTML = '';
            holidayElements.forEach(function (element) {
                _this.holidayContainer.appendChild(element.cloneNode(true));
            });
        }
        else if (this.holidayContainer && this.holidayContainer.parentNode) {
            remove(this.holidayContainer);
            if (this.nonworkingContainer && this.nonworkingContainer.childNodes.length === 0) {
                remove(this.nonworkingContainer);
            }
        }
    };
    /**
     * Method to return holidays as html string
     *
     * @returns {HTMLElement} .
     */
    NonWorkingDay.prototype.getHolidaysElement = function () {
        var fromDate;
        var toDate;
        var container = createElement('div');
        var height = this.parent.contentHeight;
        var toolbarHeight = 0;
        if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(this.parent.toolbarModule.element)) {
            toolbarHeight = this.parent.toolbarModule.element.offsetHeight;
        }
        var viewportHeight = this.parent.ganttHeight - toolbarHeight - this.parent.ganttChartModule.chartTimelineContainer.offsetHeight;
        for (var i = 0; i < this.parent.holidays.length; i++) {
            if (this.parent.holidays[i].from && this.parent.holidays[i].to) {
                fromDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].from);
                toDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].to);
                toDate.setDate(toDate.getDate() + 1);
                fromDate.setHours(0, 0, 0, 0);
                toDate.setHours(0, 0, 0, 0);
            }
            else if (this.parent.holidays[i].from) {
                fromDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].from);
                fromDate.setHours(0, 0, 0, 0);
            }
            else if (this.parent.holidays[i].to) {
                fromDate = this.parent.dateValidationModule.getDateFromFormat(this.parent.holidays[i].to);
                fromDate.setHours(0, 0, 0, 0);
            }
            var width = (this.parent.holidays[i].from && this.parent.holidays[i].to) ?
                this.parent.dataOperation.getTaskWidth(fromDate, toDate) : this.parent.perDayWidth;
            var left = this.parent.dataOperation.getTaskLeft(fromDate, false, true);
            var align = this.parent.enableRtl ? "right:" + left + "px;" : "left:" + left + "px;";
            var holidayDiv = createElement('div', {
                className: cls.holidayElement, styles: align + " width:" + width + "px; height:100%;"
            });
            var spanTop = (viewportHeight < height) ? viewportHeight / 2 : height / 2;
            var spanElement = createElement('span', {
                className: cls.holidayLabel, styles: "top:" + spanTop + "px;left:" + (width / 2) + "px;"
            });
            var property = this.parent.disableHtmlEncode ? 'textContent' : 'innerHTML';
            spanElement[property] = this.parent.holidays[i].label ? this.parent.holidays[i].label : '';
            if (this.parent.enableHtmlSanitizer && typeof (spanElement[property]) === 'string') {
                spanElement[property] = SanitizeHtmlHelper.sanitize(spanElement[property]);
            }
            holidayDiv.appendChild(spanElement);
            if (this.parent.holidays[i].cssClass) {
                holidayDiv.classList.add(this.parent.holidays[i].cssClass);
            }
            container.appendChild(holidayDiv);
        }
        return container;
    };
    /**
     * @returns {void} .
     * @private
     */
    NonWorkingDay.prototype.renderWeekends = function () {
        var _this = this;
        if (this.parent.highlightWeekends) {
            this.createNonworkingContainer();
            if (!this.nonworkingContainer.contains(this.weekendContainer)) {
                this.weekendContainer = createElement('div', {
                    className: cls.weekendContainer
                });
                if (this.parent.enableTimelineVirtualization) {
                    this.weekendContainer.style.height = '100%';
                    this.weekendContainer.style.zIndex = '-1';
                }
                this.nonworkingContainer.appendChild(this.weekendContainer);
            }
            var weekendElements = this.getWeekendElements().childNodes;
            this.weekendContainer.innerHTML = '';
            weekendElements.forEach(function (element) {
                _this.weekendContainer.appendChild(element.cloneNode(true));
            });
        }
        else if (this.weekendContainer) {
            remove(this.weekendContainer);
            if (this.nonworkingContainer && this.nonworkingContainer.childNodes.length === 0) {
                remove(this.nonworkingContainer);
            }
        }
    };
    /**
     * Method to get weekend html string
     *
     * @returns {HTMLElement} .
     */
    NonWorkingDay.prototype.getWeekendElements = function () {
        var container = createElement('div');
        var leftValueForStartDate = (this.parent.enableTimelineVirtualization &&
            this.parent.ganttChartModule.scrollObject.element.scrollLeft !== 0)
            ? this.parent.ganttChartModule.scrollObject.getTimelineLeft() : null;
        var startDate = (this.parent.enableTimelineVirtualization && !isNullOrUndefined(leftValueForStartDate))
            ? new Date((this.parent.timelineModule['dateByLeftValue'](leftValueForStartDate)).getTime()) :
            new Date(this.parent.timelineModule.timelineStartDate.getTime());
        var endDate = this.parent.enableTimelineVirtualization ? new Date((this.parent.timelineModule.weekendEndDate).getTime()) :
            new Date(this.parent.timelineModule.timelineEndDate.getTime());
        var nonWorkingIndex = this.parent.nonWorkingDayIndex;
        var isFirstCell = true;
        var isFirstExecution = true;
        this.weekendWidthUpdated = false;
        do {
            if (nonWorkingIndex.indexOf(startDate.getDay()) !== -1) {
                var left = this.parent.dataOperation.getTaskLeft(startDate, false, true);
                var width = this.parent.perDayWidth;
                if (isFirstCell) {
                    var start = new Date(startDate.getTime());
                    var tempEnd = new Date(start.getTime());
                    tempEnd.setDate(tempEnd.getDate() + 1);
                    tempEnd.setHours(0, 0, 0, 0);
                    width = this.parent.dataOperation.getTaskWidth(start, tempEnd);
                    isFirstCell = false;
                }
                var sDate = new Date(startDate);
                var dubDate = new Date(startDate);
                sDate.setDate(sDate.getDate() + 1);
                var sDateOffset = sDate.getTimezoneOffset();
                var dubDateOffset = dubDate.getTimezoneOffset();
                if (!isFirstExecution) {
                    var isHourTimeline = (this.parent.timelineModule.bottomTier === 'Hour' &&
                        this.parent.timelineModule.customTimelineSettings.bottomTier.count === 1) ||
                        (this.parent.timelineModule.bottomTier === 'Minutes' &&
                            this.parent.timelineModule.customTimelineSettings.bottomTier.count === 60) ||
                        (this.parent.timelineModule.topTier === 'Hour' &&
                            this.parent.timelineModule.customTimelineSettings.topTier.count === 1 &&
                            this.parent.timelineModule.bottomTier === 'Minutes' &&
                            (this.parent.timelineModule.customTimelineSettings.bottomTier.count === 30 ||
                                this.parent.timelineModule.customTimelineSettings.bottomTier.count === 15));
                    if (!this.weekendWidthUpdated) {
                        if (isHourTimeline && sDateOffset < dubDateOffset) {
                            width = width - (this.parent.perDayWidth / 24);
                            this.weekendWidthUpdated = true;
                        }
                    }
                }
                else {
                    isFirstExecution = false;
                }
                var align = this.parent.enableRtl ? "right:" + left + "px;" : "left:" + left + "px;";
                var weekendDiv = createElement('div', {
                    className: cls.weekend, styles: align + " width:" + width + "px;height:100%;"
                });
                container.appendChild(weekendDiv);
            }
            startDate.setDate(startDate.getDate() + 1);
            startDate.setHours(0, 0, 0, 0);
        } while (startDate < endDate);
        return container;
    };
    NonWorkingDay.prototype.updateHolidayLabelHeight = function () {
        var height = this.parent.getContentHeight();
        var gantttable = document.getElementById(this.parent.element.id);
        var toolbarHeight = 0;
        if (!isNullOrUndefined(this.parent.toolbarModule) && !isNullOrUndefined(this.parent.toolbarModule.element)) {
            toolbarHeight = this.parent.toolbarModule.element.offsetHeight;
        }
        var viewportHeight = (this.parent.height === 'auto') ? gantttable.offsetHeight - toolbarHeight - this.parent.ganttChartModule.chartTimelineContainer.offsetHeight :
            this.parent.ganttHeight - toolbarHeight - this.parent.ganttChartModule.chartTimelineContainer.offsetHeight;
        var top = (viewportHeight < height) ? viewportHeight / 2 : height / 2;
        var labels = this.holidayContainer.querySelectorAll('.' + cls.holidayLabel);
        for (var i = 0; i < labels.length; i++) {
            labels[i].style.top = formatUnit(top);
        }
    };
    /**
     * Method to update height for all internal containers
     *
     * @returns {void} .
     * @private
     */
    NonWorkingDay.prototype.updateContainerHeight = function () {
        var height = this.parent.getContentHeight();
        if (this.holidayContainer) {
            this.holidayContainer.style.height = formatUnit(height);
            this.updateHolidayLabelHeight();
        }
        if (this.weekendContainer) {
            this.weekendContainer.style.height = formatUnit(height);
        }
    };
    /**
     * Method to remove containers of holiday and weekend
     *
     * @returns {void} .
     */
    NonWorkingDay.prototype.removeContainers = function () {
        if (this.holidayContainer) {
            remove(this.holidayContainer);
        }
        if (this.weekendContainer) {
            remove(this.weekendContainer);
        }
        if (this.nonworkingContainer) {
            remove(this.nonworkingContainer);
        }
    };
    return NonWorkingDay;
}());
export { NonWorkingDay };
