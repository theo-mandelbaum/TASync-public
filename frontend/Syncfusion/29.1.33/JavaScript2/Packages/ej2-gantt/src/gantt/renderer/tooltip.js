import { Tooltip as TooltipComponent } from '@syncfusion/ej2-popups';
import { parentsUntil } from '../base/utils';
import * as cls from '../base/css-constants';
import { extend, isNullOrUndefined, getValue, EventHandler, closest, SanitizeHtmlHelper, initializeCSPTemplate, append } from '@syncfusion/ej2-base';
import { Deferred } from '@syncfusion/ej2-data';
/**
 * File for handling tooltip in Gantt.
 */
var Tooltip = /** @class */ (function () {
    function Tooltip(gantt) {
        this.parent = gantt;
        this.createTooltip();
        this.parent.on('destroy', this.destroy, this);
    }
    /**
     * To create tooltip.
     *
     * @returns {void} .
     * @private
     */
    Tooltip.prototype.createTooltip = function () {
        this.toolTipObj = new TooltipComponent();
        this.toolTipObj.target = '.e-header-cell-label, .e-gantt-child-taskbar,' +
            '.e-gantt-parent-taskbar, .e-gantt-milestone, .e-gantt-unscheduled-taskbar' +
            '.e-event-markers, .e-baseline-bar, .e-event-markers,' +
            '.e-connector-line-container, .e-indicator-span, .e-notes-info, .e-gantt-manualparent-milestone,' +
            '.e-taskbar-left-resizer, .e-taskbar-right-resizer, .e-baseline-gantt-milestone-container, .e-gantt-manualparenttaskbar';
        this.toolTipObj.position = 'BottomCenter';
        this.toolTipObj.openDelay = 700;
        this.toolTipObj.enableRtl = this.parent.enableRtl;
        this.toolTipObj.enableHtmlSanitizer = this.parent.enableHtmlSanitizer;
        this.toolTipObj.cssClass = cls.ganttTooltip;
        this.toolTipObj.animation = { open: { effect: 'None', delay: 0 }, close: { effect: 'None', delay: 0 } };
        this.toolTipObj.afterOpen = this.updateTooltipPosition.bind(this);
        this.toolTipObj.showTipPointer = false;
        this.toolTipObj.beforeRender = this.tooltipBeforeRender.bind(this);
        this.toolTipObj.afterClose = this.tooltipCloseHandler.bind(this);
        this.toolTipObj.isStringTemplate = true;
        this.toolTipObj.appendTo(this.parent.element);
    };
    Tooltip.prototype.tooltipBeforeRender = function (args) {
        var parent = this.parent;
        if (parent.isOnEdit) {
            args.cancel = true;
            return;
        }
        var element;
        var row = closest(args.target, 'div.' + cls.taskBarMainContainer);
        if (!isNullOrUndefined(row)) {
            element = args.target;
        }
        else {
            element = parentsUntil(args.target, cls.chartRowCell);
        }
        var data;
        var argsData = {
            data: {},
            args: args,
            cancel: false,
            content: ''
        };
        if (args.target.classList.contains('e-header-cell-label')) {
            if (parent.timelineSettings.showTooltip) {
                var tierValue = args.target.getAttribute('data-tier');
                var title = args.target.title;
                var innerContent = !isNullOrUndefined(parent.timelineTemplate) ? args.target.getAttribute('value') :
                    args.target.textContent;
                var templateContext = {
                    date: title,
                    value: innerContent,
                    tier: tierValue
                };
                var timelineTemplateNode = parent.tooltipSettings.timeline ? parent.tooltipModule.templateCompiler(parent.tooltipSettings.timeline, parent, extend({}, templateContext), 'TooltipTaskbarTemplate') : null;
                var tooltipTemplate = document.createElement('div');
                if (timelineTemplateNode) {
                    append(timelineTemplateNode, tooltipTemplate);
                    argsData.content = this.toolTipObj.content = tooltipTemplate;
                }
                else {
                    argsData.content = this.toolTipObj.content = parent.tooltipModule.getTooltipContent('timeline', data, parent, args);
                }
            }
            else {
                args.cancel = true;
            }
        }
        else {
            if (parent.tooltipSettings.showTooltip) {
                if (element) {
                    argsData.data = parent.ganttChartModule.getRecordByTaskBar(element);
                    data = argsData.data;
                }
                if (args.target.classList.contains('e-gantt-child-taskbar') ||
                    args.target.classList.contains('e-gantt-parent-taskbar') ||
                    args.target.classList.contains('e-gantt-milestone') ||
                    args.target.classList.contains('e-gantt-unscheduled-taskbar') ||
                    args.target.classList.contains('e-taskbar-left-resizer') ||
                    args.target.classList.contains('e-taskbar-right-resizer') ||
                    (args.target.classList.contains('e-gantt-manualparenttaskbar') && parent.tooltipSettings.taskbar)) {
                    var taskbarTemplateNode = void 0;
                    if (parent.tooltipSettings.taskbar) {
                        taskbarTemplateNode = parent.tooltipModule.templateCompiler(parent.tooltipSettings.taskbar, parent, data, 'TooltipTaskbarTemplate');
                    }
                    var tooltipTemplate = document.createElement('div');
                    if (taskbarTemplateNode) {
                        append(taskbarTemplateNode, tooltipTemplate);
                    }
                    argsData.content = this.toolTipObj.content = taskbarTemplateNode ? tooltipTemplate : data ?
                        parent.tooltipModule.getTooltipContent((data.ganttProperties.isMilestone ? 'milestone' : 'taskbar'), data, parent, args) : '';
                }
                else if (args.target.classList.contains('e-baseline-bar') ||
                    args.target.classList.contains('e-baseline-gantt-milestone-container')) {
                    var baseLineTemplateNode = void 0;
                    if ((parent.tooltipSettings.baseline)) {
                        baseLineTemplateNode = parent.tooltipModule.templateCompiler(parent.tooltipSettings.baseline, parent, data, 'TooltipBaselineTemplate');
                    }
                    var baselineTemplate = document.createElement('div');
                    if (baseLineTemplateNode) {
                        append(baseLineTemplateNode, baselineTemplate);
                    }
                    argsData.content = this.toolTipObj.content = baseLineTemplateNode ? baselineTemplate : data ?
                        parent.tooltipModule.getTooltipContent((data.ganttProperties.isMilestone ? 'milestone' : 'baseline'), data, parent, args) : '';
                }
                else if (args.target.classList.contains('e-event-markers')) {
                    argsData.content = this.toolTipObj.content = parent.tooltipModule.getTooltipContent('marker', data, parent, args);
                }
                else if (args.target.classList.contains('e-connector-line-container')) {
                    var dependencyLineTemplateNode = void 0;
                    parent.tooltipModule.predecessorTooltipData = parent.tooltipModule.getPredecessorTooltipData(args);
                    argsData.data = this.predecessorTooltipData;
                    if ((parent.tooltipSettings.connectorLine)) {
                        dependencyLineTemplateNode = parent.tooltipModule.templateCompiler(parent.tooltipSettings.connectorLine, parent, parent.tooltipModule.predecessorTooltipData, 'TooltipConnectorLineTemplate');
                    }
                    argsData.content = this.toolTipObj.content = dependencyLineTemplateNode ?
                        dependencyLineTemplateNode[0] :
                        parent.tooltipModule.getTooltipContent('connectorLine', data, parent, args);
                }
                else if (args.target.classList.contains('e-indicator-span')) {
                    argsData.content = this.toolTipObj.content =
                        parent.tooltipModule.getTooltipContent('indicator', data, parent, args);
                    if (isNullOrUndefined(argsData.content)) {
                        args.cancel = true;
                    }
                }
                else if (args.target.classList.contains('e-notes-info')) {
                    var ganttData = this.parent.ganttChartModule.getRecordByTarget(args.event);
                    argsData.content = this.toolTipObj.content = ganttData.ganttProperties.notes;
                    if (isNullOrUndefined(argsData.content)) {
                        args.cancel = true;
                    }
                }
                else if (args.target.classList.contains('e-gantt-manualparenttaskbar')) {
                    argsData.content = this.toolTipObj.content = parent.tooltipModule.getTooltipContent('manualtaskbar', data, parent, args);
                    if (isNullOrUndefined(argsData.content)) {
                        args.cancel = true;
                    }
                }
                else if (args.target.classList.contains('e-gantt-manualparent-milestone')) {
                    argsData.content = this.toolTipObj.content = parent.tooltipModule.getTooltipContent('manualmilestone', data, parent, args);
                    if (isNullOrUndefined(argsData.content)) {
                        args.cancel = true;
                    }
                }
            }
            else {
                args.cancel = true;
            }
        }
        if (args.cancel === false) {
            var callBackPromise_1 = new Deferred();
            parent.trigger('beforeTooltipRender', argsData, function (argData) {
                callBackPromise_1.resolve(argData);
                if (argData.cancel) {
                    args.cancel = true;
                }
            });
            this.toolTipObj.content = argsData.content;
            if (!this.parent.isAdaptive && args.event.type === 'mouseover') {
                this.currentTarget = args.target;
                EventHandler.add(this.currentTarget, 'mousemove', this.mouseMoveHandler.bind(this));
            }
            this.parent.renderTemplates();
            return callBackPromise_1;
        }
    };
    // eslint-disable-next-line
    Tooltip.prototype.tooltipCloseHandler = function (args) {
        this.tooltipMouseEvent = null;
        if (!this.parent.isAdaptive && !isNullOrUndefined(this.currentTarget)) {
            EventHandler.remove(this.currentTarget, 'mousemove', this.mouseMoveHandler);
        }
        this.currentTarget = null;
    };
    Tooltip.prototype.mouseMoveHandler = function (e) {
        this.tooltipMouseEvent = e;
    };
    /**
     * Method to update tooltip position
     *
     * @param {TooltipEventArgs} args .
     * @returns {void} .
     */
    Tooltip.prototype.updateTooltipPosition = function (args) {
        args.element.style.visibility = 'visible';
        var parentWithZoomStyle = this.parent.element.closest('[style*="zoom"]');
        if (isNullOrUndefined(parentWithZoomStyle)) {
            if (isNullOrUndefined(this.tooltipMouseEvent) || args.target.classList.contains('e-notes-info')) {
                return;
            }
            var postion = this.getPointorPosition(this.tooltipMouseEvent);
            var containerPosition = this.parent.getOffsetRect(this.parent.chartPane);
            var topEnd = containerPosition.top + this.parent.chartPane.offsetHeight;
            var leftEnd = containerPosition.left + this.parent.chartPane.offsetWidth;
            var tooltipPositionX = postion.x;
            var tooltipPositionY = postion.y;
            if (leftEnd < (tooltipPositionX + args.element.offsetWidth + 10)) {
                while (leftEnd < (tooltipPositionX + args.element.offsetWidth + 10)) {
                    tooltipPositionX = leftEnd - args.element.offsetWidth - 10;
                    args.element.style.left = tooltipPositionX + 'px';
                }
            }
            else {
                tooltipPositionX = tooltipPositionX + 10;
                args.element.style.left = tooltipPositionX + 'px';
            }
            if (args.event.clientY > args.element.offsetHeight) {
                if (window.innerHeight < args.element.offsetHeight + tooltipPositionY) {
                    tooltipPositionY = tooltipPositionY - args.element.offsetHeight - 10;
                }
                if ((topEnd < (tooltipPositionY + args.element.offsetHeight + 20))) {
                    tooltipPositionY = tooltipPositionY - args.element.offsetHeight - 10;
                }
                else {
                    tooltipPositionY = tooltipPositionY + 10;
                }
            }
            else {
                tooltipPositionY = tooltipPositionY + 10;
            }
            args.element.style.top = tooltipPositionY + 'px';
        }
    };
    /**
     * Method to get mouse pointor position
     *
     * @param {Event} e .
     * @returns {number} .
     */
    Tooltip.prototype.getPointorPosition = function (e) {
        var posX;
        var posY;
        if (!isNullOrUndefined(getValue('pageX', e)) || !isNullOrUndefined(getValue('pageY', e))) {
            posX = getValue('pageX', e);
            posY = getValue('pageY', e);
        }
        else if (!isNullOrUndefined(getValue('clientX', e)) || !isNullOrUndefined(getValue('clientY', e))) {
            posX = getValue('clientX', e) + document.body.scrollLeft + document.documentElement.scrollLeft;
            posY = getValue('clientY', e) + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return { x: posX, y: posY };
    };
    /**
     *  Getting tooltip content for different elements
     *
     * @param {string} elementType .
     * @param {IGanttData} ganttData .
     * @param {Gantt} parent .
     * @param {TooltipEventArgs} args .
     * @returns {string | Function} .
     */
    Tooltip.prototype.getTooltipContent = function (elementType, ganttData, parent, args) {
        var content;
        var data;
        var taskName;
        if (ganttData) {
            data = ganttData.ganttProperties;
            var taskNameValue = data.taskName;
            if (this.parent.enableHtmlSanitizer && typeof (taskNameValue) === 'string') {
                taskNameValue = SanitizeHtmlHelper.sanitize(taskNameValue);
            }
            taskName = !isNullOrUndefined(taskNameValue) ? '<tr class = "e-gantt-tooltip-rowcell"><td colspan="3">' +
                (this.parent.disableHtmlEncode ? taskNameValue.replace(/</g, '&lt;').replace(/>/g, '&gt;') : taskNameValue) + '</td></tr>' : '';
        }
        switch (elementType) {
            case 'milestone':
                {
                    var milestoneStartDate = void 0;
                    if (args.target.className.includes('e-baseline-gantt-milestone-container') && !isNullOrUndefined(data.baselineStartDate)) {
                        milestoneStartDate = data.baselineStartDate;
                    }
                    else if (!isNullOrUndefined(data.startDate)) {
                        milestoneStartDate = data.startDate;
                    }
                    var sDateValue = this.parent.getFormatedDate(milestoneStartDate, this.parent.getDateFormat());
                    if (this.parent.enableHtmlSanitizer && typeof (sDateValue) === 'string') {
                        sDateValue = SanitizeHtmlHelper.sanitize(sDateValue);
                    }
                    var sDate_1 = !isNullOrUndefined(milestoneStartDate) ? '<tr><td class = "e-gantt-tooltip-label"> Date</td><td>:</td>' +
                        '<td class = "e-gantt-tooltip-value">' +
                        sDateValue + '</td></tr>' : '';
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody>' +
                            taskName + sDate_1 + '</tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp);
                    break;
                }
            case 'taskbar':
                {
                    var scheduledTask = !ganttData.hasChildRecords || data.isAutoSchedule ? true : false;
                    var startDateValue = this.parent.getFormatedDate(scheduledTask ? data.startDate : data.autoStartDate, this.parent.getDateFormat());
                    var endDateValue = this.parent.getFormatedDate(scheduledTask ? data.endDate : data.autoEndDate, this.parent.getDateFormat());
                    var durationValue = this.parent.getDurationString((scheduledTask ? data.duration : data.autoDuration), data.durationUnit);
                    var progressValue = data.progress;
                    if (this.parent.enableHtmlSanitizer) {
                        startDateValue = typeof (startDateValue) === 'string' ? SanitizeHtmlHelper.sanitize(startDateValue) : startDateValue;
                        endDateValue = typeof (endDateValue) === 'string' ? SanitizeHtmlHelper.sanitize(endDateValue) : endDateValue;
                        durationValue = SanitizeHtmlHelper.sanitize(durationValue);
                    }
                    var startDate_1 = data.startDate ? '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant(scheduledTask ? 'startDate' : 'subTasksStartDate') +
                        '</td><td class=' + cls.templatePadding + '>:</td>' + '<td class = "e-gantt-tooltip-value"> ' + startDateValue + '</td></tr>' : '';
                    var endDate_1 = data.endDate ? '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant(scheduledTask ? 'endDate' : 'subTasksEndDate') +
                        '</td><td class=' + cls.templatePadding + '>:</td>' + '<td class = "e-gantt-tooltip-value">' + endDateValue + '</td></tr>' : '';
                    var duration_1 = !isNullOrUndefined(data.duration) ? '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('duration') + '</td><td class=' + cls.templatePadding + '>:</td>' +
                        '<td class = "e-gantt-tooltip-value"> ' + durationValue +
                        '</td></tr>' : '';
                    var progress_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('progress') + '</td><td class=' + cls.templatePadding + '>:</td><td>' + progressValue +
                        '</td></tr>';
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody>' +
                            taskName + startDate_1 + endDate_1 + duration_1 + progress_1 + '</tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp);
                    break;
                }
            case 'baseline':
                {
                    var baselineStartDateValue_1 = this.parent.getFormatedDate(data.baselineStartDate, this.parent.getDateFormat());
                    var baselineEndDateValue_1 = this.parent.getFormatedDate(data.baselineEndDate, this.parent.getDateFormat());
                    if (this.parent.enableHtmlSanitizer) {
                        baselineStartDateValue_1 = SanitizeHtmlHelper.sanitize(baselineStartDateValue_1);
                        baselineEndDateValue_1 = SanitizeHtmlHelper.sanitize(baselineEndDateValue_1);
                    }
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody>' +
                            taskName + '<tr><td class = "e-gantt-tooltip-label">' +
                            this.parent.localeObj.getConstant('baselineStartDate') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value">' +
                            baselineStartDateValue_1 + '</td></tr><tr>' +
                            '<td class = "e-gantt-tooltip-label">' + this.parent.localeObj.getConstant('baselineEndDate') +
                            '</td><td>:</td><td class = "e-gantt-tooltip-value">' +
                            baselineEndDateValue_1 + '</td></tr></tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp, this);
                    break;
                }
            case 'marker':
                {
                    var markerTooltipElement = parent.tooltipModule.getMarkerTooltipData(args);
                    var markerTooltipElementValue_1 = this.parent.getFormatedDate(this.parent.dateValidationModule.getDateFromFormat(markerTooltipElement.day), this.parent.getDateFormat());
                    var markerLabel_1 = markerTooltipElement.label ? markerTooltipElement.label : '';
                    if (this.parent.enableHtmlSanitizer) {
                        markerLabel_1 = SanitizeHtmlHelper.sanitize(markerLabel_1);
                        markerTooltipElementValue_1 = SanitizeHtmlHelper.sanitize(markerTooltipElementValue_1);
                    }
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody><tr><td>' +
                            markerTooltipElementValue_1 + '</td></tr><tr><td>' + (this.parent.disableHtmlEncode ? markerLabel_1.replace(/</g, '&lt;').replace(/>/g, '&gt;') : markerLabel_1) + '</td></tr></tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp, this);
                    break;
                }
            case 'connectorLine':
                {
                    var fromNameValue_1 = parent.tooltipModule.predecessorTooltipData.fromName;
                    var fromIdValue_1 = parent.tooltipModule.predecessorTooltipData.fromId;
                    var toNameValue_1 = parent.tooltipModule.predecessorTooltipData.toName;
                    var toIdValue_1 = parent.tooltipModule.predecessorTooltipData.toId;
                    var linkTextValue_1 = parent.tooltipModule.predecessorTooltipData.linkText;
                    var offsetStringValue_1 = parent.tooltipModule.predecessorTooltipData.offsetString;
                    if (this.parent.enableHtmlSanitizer) {
                        fromNameValue_1 = SanitizeHtmlHelper.sanitize(fromNameValue_1);
                        fromIdValue_1 = SanitizeHtmlHelper.sanitize(fromIdValue_1);
                        toNameValue_1 = SanitizeHtmlHelper.sanitize(toNameValue_1);
                        toIdValue_1 = SanitizeHtmlHelper.sanitize(toIdValue_1);
                        linkTextValue_1 = SanitizeHtmlHelper.sanitize(linkTextValue_1);
                        offsetStringValue_1 = SanitizeHtmlHelper.sanitize(offsetStringValue_1);
                    }
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody><tr><td class = "e-gantt-tooltip-label">' +
                            this.parent.localeObj.getConstant('from') + '</td><td>:</td>' +
                            '<td class = "e-gantt-tooltip-value">' + (this.parent.disableHtmlEncode ? fromNameValue_1.replace(/</g, '&lt;').replace(/>/g, '&gt;') : fromNameValue_1) + ' (' +
                            (this.parent.disableHtmlEncode ? (typeof (fromIdValue_1) === 'string' ? fromIdValue_1.replace(/</g, '&lt;').replace(/>/g, '&gt;') : fromIdValue_1) : fromIdValue_1) + ')' + '</td></tr><tr><td class = "e-gantt-tooltip-label">' +
                            this.parent.localeObj.getConstant('to') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value">' +
                            (this.parent.disableHtmlEncode ? toNameValue_1.replace(/</g, '&lt;').replace(/>/g, '&gt;') : toNameValue_1) + ' (' + toIdValue_1 + ')' + '</td></tr><tr><td class = "e-gantt-tooltip-label">' + this.parent.localeObj.getConstant('taskLink') +
                            '</td><td>:</td><td class = "e-gantt-tooltip-value"> ' + linkTextValue_1 +
                            '</td></tr><tr><td class = "e-gantt-tooltip-label">' + this.parent.localeObj.getConstant('lag') +
                            '</td><td>:</td><td class = "e-gantt-tooltip-value">' +
                            offsetStringValue_1 + '</td></tr></tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp, this);
                    break;
                }
            case 'indicator':
                if (args.target.title.length) {
                    var titleValue_1 = args.target.title;
                    if (this.parent.enableHtmlSanitizer && typeof (titleValue_1) === 'string') {
                        titleValue_1 = SanitizeHtmlHelper.sanitize(titleValue_1);
                    }
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody><tr>' + titleValue_1 + '</tr></tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp);
                }
                break;
            case 'timeline':
                {
                    var timlineTitleValue_1 = args.target.title;
                    if (this.parent.enableHtmlSanitizer && typeof (timlineTitleValue_1) === 'string') {
                        timlineTitleValue_1 = SanitizeHtmlHelper.sanitize(timlineTitleValue_1);
                    }
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody><tr>' + timlineTitleValue_1 + '</tr></tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp);
                    break;
                }
            case 'manualtaskbar':
                {
                    var autoStartDateValue = this.parent.getFormatedDate(data.autoStartDate, this.parent.getDateFormat());
                    var autoEndDateValue = this.parent.getFormatedDate(data.autoEndDate, this.parent.getDateFormat());
                    var durationUnitValue = this.parent.getDurationString(data.duration, data.durationUnit);
                    var manualStartDateValue = this.parent.getFormatedDate(data.startDate, this.parent.getDateFormat());
                    var manualEndDateValue = this.parent.getFormatedDate(data.endDate, this.parent.getDateFormat());
                    if (this.parent.enableHtmlSanitizer) {
                        autoStartDateValue = SanitizeHtmlHelper.sanitize(autoStartDateValue);
                        autoEndDateValue = SanitizeHtmlHelper.sanitize(autoEndDateValue);
                        durationUnitValue = SanitizeHtmlHelper.sanitize(durationUnitValue);
                        manualStartDateValue = SanitizeHtmlHelper.sanitize(manualStartDateValue);
                        manualEndDateValue = SanitizeHtmlHelper.sanitize(manualEndDateValue);
                    }
                    var autoStartDate_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('subTasksStartDate') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value"> ' +
                        autoStartDateValue + '</td></tr>';
                    var autoEndDate_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('subTasksEndDate') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value">' +
                        autoEndDateValue + '</td></tr>';
                    var durationValue_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('duration') + '</td><td>:</td>' +
                        '<td class = "e-gantt-tooltip-value"> ' + durationUnitValue +
                        '</td></tr>';
                    var manualStartDate_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('startDate') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value"> ' +
                        manualStartDateValue + '</td></tr>';
                    var manualEndDate_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('endDate') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value">' +
                        manualEndDateValue + '</td></tr>';
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody>' +
                            taskName + manualStartDate_1 + autoStartDate_1 + manualEndDate_1 + autoEndDate_1 + durationValue_1 + '</tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp);
                    break;
                }
            case 'manualmilestone':
                {
                    var autoStartValue = this.parent.getFormatedDate(data.autoStartDate, this.parent.getDateFormat());
                    var autoEndValue = this.parent.getFormatedDate(data.autoEndDate, this.parent.getDateFormat());
                    var dateValue = this.parent.getFormatedDate(data.startDate, this.parent.getDateFormat());
                    if (this.parent.enableHtmlSanitizer) {
                        autoStartValue = SanitizeHtmlHelper.sanitize(autoStartValue);
                        autoEndValue = SanitizeHtmlHelper.sanitize(autoEndValue);
                        dateValue = SanitizeHtmlHelper.sanitize(dateValue);
                    }
                    var autoStart_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('subTasksStartDate') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value"> ' +
                        autoStartValue + '</td></tr>';
                    var autoEnd_1 = '<tr><td class = "e-gantt-tooltip-label">' +
                        this.parent.localeObj.getConstant('subTasksEndDate') + '</td><td>:</td>' + '<td class = "e-gantt-tooltip-value">' +
                        autoEndValue + '</td></tr>';
                    var date_1 = '<tr><td class = "e-gantt-tooltip-label"> Date</td><td>:</td>' +
                        '<td class = "e-gantt-tooltip-value">' +
                        dateValue + '</tr>';
                    var contentTemp = function () {
                        return '<table class = "e-gantt-tooltiptable"><tbody>' +
                            taskName + date_1 + autoStart_1 + autoEnd_1 + '</tbody></table>';
                    };
                    content = initializeCSPTemplate(contentTemp);
                    break;
                }
        }
        return content;
    };
    /**
     * To get the details of an event marker.
     *
     * @param {TooltipEventArgs} args .
     * @returns {EventMarkerModel} .
     * @private
     */
    Tooltip.prototype.getMarkerTooltipData = function (args) {
        var markerTooltipId = (args.target.id).match(/\d+/g);
        var markerTooltipElement = this.parent.eventMarkers[Number(markerTooltipId)];
        return markerTooltipElement;
    };
    /**
     * To get the details of a connector line.
     *
     * @param {TooltipEventArgs} args .
     * @returns {PredecessorTooltip} .
     * @private
     */
    Tooltip.prototype.getPredecessorTooltipData = function (args) {
        var predeceesorParent = args.target.id;
        if (this.parent.enableHtmlSanitizer && typeof (predeceesorParent) === 'string') {
            predeceesorParent = SanitizeHtmlHelper.sanitize(predeceesorParent);
        }
        var taskIds = predeceesorParent.match(/ConnectorLineparent(.*)child(.*)/);
        taskIds.shift();
        var fromTask;
        var toTask;
        if (this.parent.viewType === 'ResourceView') {
            fromTask = this.parent.flatData[this.parent.getTaskIds().indexOf('T' + taskIds[0])];
            toTask = this.parent.flatData[this.parent.getTaskIds().indexOf('T' + taskIds[1])];
        }
        else {
            fromTask = this.parent.flatData[this.parent.ids.indexOf(taskIds[0])];
            toTask = this.parent.flatData[this.parent.ids.indexOf(taskIds[1])];
        }
        var predecessor = (fromTask.ganttProperties.predecessor).filter(function (pdc) { return pdc.to === taskIds[1]; });
        var predecessorTooltipData = {
            fromId: this.parent.viewType === 'ResourceView' ? fromTask.ganttProperties.taskId : fromTask.ganttProperties.rowUniqueID,
            toId: this.parent.viewType === 'ResourceView' ? toTask.ganttProperties.taskId : toTask.ganttProperties.rowUniqueID,
            fromName: fromTask.ganttProperties.taskName,
            toName: toTask.ganttProperties.taskName,
            linkType: predecessor[0].type,
            linkText: this.parent.getPredecessorTextValue(predecessor[0].type),
            offset: predecessor[0].offset,
            offsetUnit: predecessor[0].offsetUnit,
            offsetString: this.parent.getDurationString(predecessor[0].offset, predecessor[0].offsetUnit)
        };
        return predecessorTooltipData;
    };
    /**
     * To compile template string.
     *
     * @param {string | Function} template .
     * @param {Gantt} parent .
     * @param {IGanttData|PredecessorTooltip} data .
     * @param {string} propName .
     * @returns {NodeList} .
     * @private
     */
    Tooltip.prototype.templateCompiler = function (template, parent, data, propName) {
        var tooltipFunction = parent.chartRowsModule.templateCompiler(template);
        var templateID = parent.chartRowsModule.getTemplateID(propName);
        var templateNode = tooltipFunction(extend({ index: 0 }, data), parent, propName, templateID, true);
        return templateNode;
    };
    Tooltip.prototype.destroy = function () {
        this.toolTipObj.destroy();
    };
    return Tooltip;
}());
export { Tooltip };
