import { getValue, isNullOrUndefined, initializeCSPTemplate } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import * as cls from '../base/css-constants';
/**
 * File for handling taskbar editing tooltip in Gantt.
 */
var EditTooltip = /** @class */ (function () {
    function EditTooltip(gantt, taskbarEdit) {
        this.parent = gantt;
        this.taskbarEdit = taskbarEdit;
    }
    /**
     * To create tooltip.
     *
     * @param {string} opensOn .
     * @param {boolean} mouseTrail .
     * @param {string} target .
     * @returns {void}
     * @private
     */
    EditTooltip.prototype.createTooltip = function (opensOn, mouseTrail, target) {
        var _this = this;
        this.toolTipObj = new Tooltip({
            opensOn: opensOn,
            position: 'TopRight',
            enableRtl: this.parent.enableRtl,
            mouseTrail: mouseTrail,
            cssClass: cls.ganttTooltip,
            windowCollision: true,
            target: target ? target : null,
            animation: { open: { effect: 'None' }, close: { effect: 'None' } }
        });
        this.toolTipObj.target = '.e-connectorpoint-left, .e-connectorpoint-right';
        this.toolTipObj.beforeRender = function (args) {
            var argsData = {
                data: _this.taskbarEdit.taskBarEditRecord,
                args: args,
                content: _this.toolTipObj.content
            };
            _this.parent.trigger('beforeTooltipRender', argsData);
        };
        this.toolTipObj.afterOpen = function (args) {
            _this.updateTooltipPosition(args);
        };
        this.toolTipObj.isStringTemplate = true;
        this.toolTipObj.appendTo(this.parent.chartPane);
    };
    /**
     * Method to update tooltip position
     *
     * @param {TooltipEventArgs} args .
     * @returns {void} .
     */
    EditTooltip.prototype.updateTooltipPosition = function (args) {
        args.element.style.visibility = 'visible';
        var parentWithZoomStyle = this.parent.element.closest('[style*="zoom"]');
        if (isNullOrUndefined(parentWithZoomStyle)) {
            var containerPosition = this.parent.getOffsetRect(this.parent.chartPane);
            var leftEnd = containerPosition.left + this.parent.chartPane.offsetWidth;
            var tooltipPositionX = args.element.offsetLeft;
            if (leftEnd < (tooltipPositionX + args.element.offsetWidth)) {
                tooltipPositionX += leftEnd - (tooltipPositionX + args.element.offsetWidth);
            }
            args.element.style.left = tooltipPositionX + 'px';
            args.element.style.visibility = 'visible';
            if (args.target && this.parent.tooltipSettings.editing) {
                var top_1 = args.target.getBoundingClientRect().top + window.scrollY;
                var tooltipPositionY = void 0;
                if (args.target.classList.contains('e-connectorpoint-left') ||
                    args.target.classList.contains('e-connectorpoint-right')) {
                    tooltipPositionY = top_1 - (args.element.offsetHeight) - 14;
                }
                else {
                    tooltipPositionY = top_1 - (args.element.offsetHeight) - 8;
                }
                this.toolTipHeight = args.element.style.top = tooltipPositionY + 'px';
            }
        }
    };
    /**
     * To show/hide taskbar edit tooltip.
     *
     * @param {boolean} bool .
     * @param {number} segmentIndex .
     * @returns {void}
     * @private
     */
    EditTooltip.prototype.showHideTaskbarEditTooltip = function (bool, segmentIndex) {
        if (bool && this.parent.tooltipSettings.showTooltip) {
            this.createTooltip('Custom', false);
            this.parent.tooltipModule.toolTipObj.close();
            this.updateTooltip(segmentIndex);
            if (this.parent.tooltipSettings.editing) {
                this.toolTipObj.openDelay = 500;
            }
            if (this.taskbarEdit.connectorSecondAction === 'ConnectorPointLeftDrag') {
                this.toolTipObj.open(this.taskbarEdit.connectorSecondElement.querySelector('.' + cls.connectorPointLeft));
            }
            else if (this.taskbarEdit.connectorSecondAction === 'ConnectorPointRightDrag') {
                this.toolTipObj.open(this.taskbarEdit.connectorSecondElement.querySelector('.' + cls.connectorPointRight));
            }
            else {
                this.toolTipObj.open(this.taskbarEdit.taskBarEditElement);
            }
        }
        else if (!isNullOrUndefined(this.toolTipObj)) {
            this.toolTipObj.destroy();
            this.toolTipObj = null;
        }
    };
    /**
     * To update tooltip content and position.
     *
     * @param {number} segmentIndex .
     * @returns {void} .
     * @private
     */
    EditTooltip.prototype.updateTooltip = function (segmentIndex) {
        var ganttProp = this.taskbarEdit.taskBarEditRecord.ganttProperties;
        var taskWidth = (isNullOrUndefined(segmentIndex) || segmentIndex === -1) ? ganttProp.width :
            ganttProp.segments[segmentIndex].width;
        var progressWidth = (isNullOrUndefined(segmentIndex) || segmentIndex === -1) ? ganttProp.progressWidth :
            ganttProp.segments[segmentIndex].progressWidth;
        var left = (isNullOrUndefined(segmentIndex) || segmentIndex === -1) ? ganttProp.left : ganttProp.left +
            ganttProp.segments[segmentIndex].left;
        if (!isNullOrUndefined(this.toolTipObj)) {
            if (this.taskbarEdit.taskBarEditAction === 'ConnectorPointLeftDrag' ||
                this.taskbarEdit.taskBarEditAction === 'ConnectorPointRightDrag') {
                this.toolTipObj.content = this.getTooltipText(segmentIndex);
                if (this.parent.tooltipSettings.editing) {
                    this.toolTipObj.openDelay = 500;
                }
                this.toolTipObj.offsetY = -3;
            }
            else {
                if (this.parent.tooltipSettings.editing) {
                    this.toolTipObj.openDelay = 500;
                }
                this.toolTipObj.content = this.getTooltipText(segmentIndex);
                if (ganttProp.segments && ganttProp.segments.length > 0 && this.taskbarEdit['mainElement'] && this.taskbarEdit.taskBarEditAction === 'ProgressResizing') {
                    var segments = this.taskbarEdit['mainElement'].querySelectorAll('.e-segmented-taskbar');
                    this.toolTipObj.refresh(segments[segmentIndex]);
                }
                else {
                    this.toolTipObj.refresh(this.taskbarEdit.taskBarEditElement);
                }
                if (this.taskbarEdit.taskBarEditAction === 'LeftResizing') {
                    if (this.parent.enableRtl) {
                        this.toolTipObj.offsetX = 0;
                    }
                    else {
                        this.toolTipObj.offsetX = -taskWidth;
                    }
                }
                else if (this.taskbarEdit.taskBarEditAction === 'RightResizing' ||
                    this.taskbarEdit.taskBarEditAction === 'ParentResizing') {
                    if (this.parent.enableRtl) {
                        this.toolTipObj.offsetX = -taskWidth;
                    }
                    else {
                        this.toolTipObj.offsetX = 0;
                    }
                }
                else if (this.taskbarEdit.taskBarEditAction === 'ProgressResizing') {
                    if (this.parent.enableRtl) {
                        this.toolTipObj.offsetX = -(progressWidth);
                    }
                    else {
                        this.toolTipObj.offsetX = -(taskWidth - progressWidth);
                    }
                }
                else if (this.taskbarEdit.taskBarEditAction === 'MilestoneDrag') {
                    this.toolTipObj.offsetX = -(this.parent.chartRowsModule.milestoneHeight / 2);
                }
                else if (taskWidth > 5) {
                    this.toolTipObj.offsetX = -(taskWidth + left - this.taskbarEdit.tooltipPositionX);
                }
                if (this.parent.tooltipSettings.editing && document.getElementsByClassName('e-gantt-tooltip')[0] && this.toolTipHeight) {
                    document.getElementsByClassName('e-gantt-tooltip')[0].style.top = this.toolTipHeight;
                }
            }
        }
    };
    /**
     * To get updated tooltip text.
     *
     * @param {number} segmentIndex .
     * @returns {void} .
     * @private
     */
    EditTooltip.prototype.getTooltipText = function (segmentIndex) {
        var tooltipString = '';
        var instance = this.parent.globalize;
        var editRecord = this.taskbarEdit.taskBarEditRecord.ganttProperties;
        if (!isNullOrUndefined(editRecord.segments) && editRecord.segments.length > 0 && segmentIndex !== -1
            && this.taskbarEdit.taskBarEditAction !== 'ProgressResizing') {
            editRecord = editRecord.segments[segmentIndex];
        }
        if (this.parent.tooltipSettings.editing) {
            var templateNode = this.parent.tooltipModule.templateCompiler(this.parent.tooltipSettings.editing, this.parent, this.taskbarEdit.taskBarEditRecord, 'TooltipEditingTemplate');
            if (getValue('tooltipEle', this.toolTipObj)) {
                this.parent.renderTemplates();
            }
            tooltipString = templateNode[0];
        }
        else {
            var startDate = void 0;
            var endDate = void 0;
            var duration = void 0;
            if (!isNullOrUndefined(editRecord) && !isNullOrUndefined(editRecord.startDate)) {
                startDate = '<tr><td class = "e-gantt-tooltip-label">' + this.parent.localeObj.getConstant('startDate') +
                    '</td><td class=' + cls.templatePadding + '>:</td><td class = "e-gantt-tooltip-value">' +
                    instance.formatDate(editRecord.startDate, { format: this.parent.getDateFormat() }) + '</td></tr>';
            }
            if (!isNullOrUndefined(editRecord) && !isNullOrUndefined(editRecord.endDate)) {
                endDate = '<tr><td class = "e-gantt-tooltip-label">' + this.parent.localeObj.getConstant('endDate') +
                    '</td><td class=' + cls.templatePadding + '>:</td><td class = "e-gantt-tooltip-value">' +
                    instance.formatDate(editRecord.endDate, { format: this.parent.getDateFormat() }) + '</td></tr>';
            }
            if (!isNullOrUndefined(editRecord) && !isNullOrUndefined(editRecord.duration)) {
                duration = '<tr><td class = "e-gantt-tooltip-label">' + this.parent.localeObj.getConstant('duration') +
                    '</td><td class=' + cls.templatePadding + '>:</td><td class = "e-gantt-tooltip-value">' +
                    this.parent.getDurationString(editRecord.duration, editRecord.durationUnit) + '</td></tr>';
            }
            switch (this.taskbarEdit.taskBarEditAction) {
                case 'ProgressResizing':
                    {
                        var progress = '<tr><td class = "e-gantt-tooltip-label">' + this.parent.localeObj.getConstant('progress') +
                            '</td><td class=' + cls.templatePadding + '>:</td><td class = "e-gantt-tooltip-value">' + editRecord.progress + '</td></tr>';
                        tooltipString = '<table class = "e-gantt-tooltiptable"><tbody>' +
                            progress + '</tbody></table>';
                        break;
                    }
                case 'LeftResizing':
                    {
                        tooltipString = '<table class = "e-gantt-tooltiptable"><tbody>' +
                            startDate + duration + '</tbody></table>';
                        break;
                    }
                case 'RightResizing':
                case 'ParentResizing':
                    {
                        tooltipString = '<table class = "e-gantt-tooltiptable"><tbody>' +
                            endDate + duration + '</tbody></table>';
                        break;
                    }
                case 'ChildDrag':
                case 'ParentDrag':
                case 'MilestoneDrag':
                case 'ManualParentDrag':
                    {
                        var sDate = '';
                        var eDate = '';
                        if (!isNullOrUndefined(this.taskbarEdit.taskBarEditRecord.ganttProperties.startDate)) {
                            sDate = startDate;
                        }
                        if (!isNullOrUndefined(this.taskbarEdit.taskBarEditRecord.ganttProperties.endDate)) {
                            eDate = endDate;
                        }
                        tooltipString = '<table class = "e-gantt-tooltiptable"><tbody>' + sDate + eDate + '</tbody></table>';
                        break;
                    }
                case 'ConnectorPointLeftDrag':
                case 'ConnectorPointRightDrag':
                    {
                        tooltipString = this.parent.connectorLineModule.tooltipTable;
                        if (isNullOrUndefined(this.toolTipObj)) {
                            this.parent.connectorLineModule.tooltipTable.innerHTML = '';
                            this.parent.connectorLineModule.tooltipTable.appendChild(this.parent.connectorLineModule.getConnectorLineTooltipInnerTd(this.parent.editModule.taskbarEditModule.taskBarEditRecord.ganttProperties.taskName, this.parent.editModule.taskbarEditModule.fromPredecessorText, '', ''));
                        }
                        break;
                    }
            }
        }
        if (typeof tooltipString === 'string') {
            var contentTemp = function () {
                return tooltipString;
            };
            return initializeCSPTemplate(contentTemp);
        }
        else {
            return tooltipString;
        }
    };
    return EditTooltip;
}());
export { EditTooltip };
