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
import { PointF, PdfColor, PdfStringLayouter, PdfPen, PdfSolidBrush, RectangleF, SizeF, PdfStandardFont, PdfFontStyle, PdfStringFormat, PdfVerticalAlignment, PdfTextAlignment, PdfWordWrapType, PdfDashStyle, PdfPath, PdfBitmap, PdfBrushes, PdfLinearGradientBrush } from '@syncfusion/ej2-pdf-export';
import { pixelToPoint, pointToPixel } from '../base/utils';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
var PdfGanttTaskbarCollection = /** @class */ (function () {
    function PdfGanttTaskbarCollection(parent) {
        /** Defines the task baselineHeight . */
        this.baselineHeight = 8;
        this.segment = [];
        this.segmentCollection = [];
        /**
         * @private
         */
        this.leftTaskLabel = {};
        /**
         * @private
         */
        this.rightTaskLabel = {};
        this.startPage = -1;
        this.endPage = -1;
        this.spaceBetweenImageAndValue = 8;
        this.parent = parent;
    }
    PdfGanttTaskbarCollection.prototype.add = function () {
        return new PdfGanttTaskbarCollection(this.parent);
    };
    /**
     * @param {PdfPage} page .
     * @returns {PdfPage} .
     * Get the next PDF page
     */
    PdfGanttTaskbarCollection.prototype.GetNextPage = function (page) {
        var section = page.section;
        var index = section.indexOf(page);
        var nextPage = null;
        if (index === section.count - 1) {
            nextPage = section.add();
        }
        else {
            nextPage = section.getPages()[index + 1];
        }
        return nextPage;
    };
    PdfGanttTaskbarCollection.prototype.isAutoFit = function () {
        return ((this.parent.pdfExportModule && this.parent.pdfExportModule.helper.exportProps &&
            this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings &&
            this.parent.pdfExportModule.helper.exportProps.fitToWidthSettings.isFitToWidth) ||
            this.parent.timelineModule.isZoomedToFit) ? true : false;
    };
    /**
     * Draw the taskbar, chart back ground
     *
     * @private
     */
    /* eslint-disable */
    PdfGanttTaskbarCollection.prototype.drawTaskbar = function (page, startPoint, detail, cumulativeWidth, rowHeight, taskbar, lineWidth) {
        var _this = this;
        var taskGraphics = page.graphics;
        var isNextPage = false;
        var pageSize = page.getClientSize();
        var yPoint = startPoint.y + rowHeight;
        //code for while current pdf page is exceed
        if (yPoint > pageSize.height) {
            page = this.GetNextPage(page);
            page['contentWidth'] = (this.isAutoFit()) ? pointToPixel(detail.endPoint - detail.startPoint) : detail.endPoint - detail.startPoint;
            taskGraphics = page.graphics;
            startPoint.y = 0;
            if (this.parent.pdfExportModule.gantt.enableHeader) {
                this.parent.pdfExportModule.gantt.chartHeader.drawPageTimeline(page, startPoint, detail);
                startPoint.y = pixelToPoint(this.parent.timelineModule.isSingleTier ? 45 : 60);
            }
            isNextPage = true;
        }
        this.drawLeftLabel(page, startPoint, detail, cumulativeWidth, taskbar);
        //Draw Taskbar
        var font = new PdfStandardFont(this.fontFamily, 9, PdfFontStyle.Regular);
        var fontColor = null;
        var fontBrush = new PdfSolidBrush(this.progressFontColor);
        var customizedFont;
        var customizedFontBrush;
        var customizedFontColor;
        customizedFont = !isNullOrUndefined(taskbar.taskbarTemplate.value) && taskbar.taskbarTemplate.fontStyle && taskbar.taskbarTemplate.fontStyle.fontFamily && taskbar.taskbarTemplate.fontStyle.fontSize
            ? new PdfStandardFont(taskbar.taskbarTemplate.fontStyle.fontFamily, taskbar.taskbarTemplate.fontStyle.fontSize, taskbar.taskbarTemplate.fontStyle.fontStyle)
            : font;
        customizedFontBrush = !isNullOrUndefined(taskbar.taskbarTemplate.value) && taskbar.taskbarTemplate.fontStyle && taskbar.taskbarTemplate.fontStyle.fontColor
            ? new PdfSolidBrush(taskbar.taskbarTemplate.fontStyle.fontColor)
            : fontBrush;
        customizedFontColor = !isNullOrUndefined(taskbar.taskbarTemplate.value) && taskbar.taskbarTemplate.fontStyle && taskbar.taskbarTemplate.fontStyle.fontBrush
            ? new PdfPen(taskbar.taskbarTemplate.fontStyle.fontBrush)
            : fontColor;
        if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
            this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
            font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
        }
        var taskLabelFont;
        var taskLabelFontBrush;
        var ganttStyle = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle;
        if (taskbar.labelSettings.taskLabel.fontStyle.fontSize) {
            var taskFont = new PdfStandardFont(taskbar.labelSettings.taskLabel.fontStyle.fontFamily, taskbar.labelSettings.taskLabel.fontStyle.fontSize, taskbar.labelSettings.taskLabel.fontStyle.fontStyle);
            taskLabelFont = taskFont;
        }
        else if (ganttStyle && ganttStyle.label && ganttStyle.label.fontBrush) {
            taskLabelFontBrush = new PdfSolidBrush(ganttStyle.label.fontBrush);
        }
        else {
            taskLabelFont = font;
        }
        if (taskbar.labelSettings.taskLabel.fontStyle.fontColor) {
            taskLabelFontBrush = new PdfSolidBrush(taskbar.labelSettings.taskLabel.fontStyle.fontColor);
        }
        else {
            taskLabelFontBrush = fontBrush;
        }
        var progressFormat = new PdfStringFormat();
        progressFormat.lineAlignment = PdfVerticalAlignment.Middle;
        progressFormat.alignment = PdfTextAlignment.Right;
        var isLabelString = false;
        var updatedWidth;
        if (!isNullOrUndefined(this.taskLabel) && (/^[a-zA-Z0-9]/.test(this.taskLabel))) {
            if (this.taskLabel === '0' || this.taskLabel === '0%') {
                updatedWidth = this.width;
                progressFormat.alignment = PdfTextAlignment.Left;
            }
        }
        if ((!isNullOrUndefined(this.taskLabel) && (/^[a-zA-Z]/.test(this.taskLabel))) || (!isNullOrUndefined(taskbar.taskbarTemplate.value))) {
            isLabelString = true;
            progressFormat.alignment = PdfTextAlignment.Left;
        }
        var pageIndex = -1;
        var baselinePen = new PdfPen(taskbar.baselineBorderColor);
        var baselineBrush = new PdfSolidBrush(taskbar.baselineColor);
        var template = taskbar.taskbarTemplate;
        var renderedBaseline = false;
        if (!taskbar.isMilestone) {
            var taskbarPen_1 = new PdfPen(taskbar.taskBorderColor);
            var taskBrush_1 = new PdfSolidBrush(taskbar.taskColor);
            var manualParentBorderPen = new PdfPen(taskbar.manualParentBorder);
            var manualChildBorderPen = new PdfPen(taskbar.manualChildBorder);
            var manualTaskbarPen = new PdfPen(taskbar.manuallineColor);
            var manualParentPen = new PdfPen(taskbar.manualParentProgress);
            var manualline = new PdfPen(taskbar.manuallineColor);
            var manuallineBrush = new PdfSolidBrush(taskbar.manuallineColor);
            var splitline = new PdfPen(taskbar.splitLineBackground);
            var manualBrush = new PdfSolidBrush(taskbar.manualParentBackground);
            var manualChildBrush = new PdfSolidBrush(taskbar.manualChildBackground);
            var manualChildProgressBrush = new PdfSolidBrush(taskbar.manualChildProgress);
            var manualProgressBrush = new PdfSolidBrush(taskbar.manualParentProgress);
            var progressPen_1 = new PdfPen(taskbar.progressColor);
            var progressBrush_1 = new PdfSolidBrush(taskbar.progressColor);
            var adjustHeightforTaskbar = pixelToPoint((this.parent.rowHeight - this.height) / 2.0);
            var adjustHeightforBaseline = pixelToPoint((this.parent.rowHeight - this.height) / 4.5);
            var adjustHeight_1 = this.parent.renderBaseline ? adjustHeightforBaseline : adjustHeightforTaskbar;
            pageIndex = page.section.indexOf(page);
            var startDate = isNullOrUndefined(this.unscheduleStarteDate) ? this.startDate : this.unscheduleStarteDate;
            var endDate = isNullOrUndefined(this.unscheduleEndDate) ? this.endDate : this.unscheduleEndDate;
            var imageSize_1 = 10;
            //Task start and end date both are in the range of header split up start and end date
            if (detail.startDate <= startDate && endDate <= detail.endDate) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                if (!this.isScheduledTask && this.unscheduledTaskBy === 'duration') {
                    var brush1 = void 0;
                    var brush2 = void 0;
                    if (this.isAutoFit()) {
                        brush1 = new PdfLinearGradientBrush(new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5 + (taskbar.width) / 2, 0), new PointF(startPoint.x + (this.left - cumulativeWidth), 0), new PdfColor(taskbar.unscheduledTaskBarColor), new PdfColor(255, 255, 255));
                        taskGraphics.drawRectangle(brush1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (taskbar.width), pixelToPoint(taskbar.height));
                        brush2 = new PdfLinearGradientBrush(new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5 + (taskbar.width), 0), new PointF(startPoint.x + (this.left - cumulativeWidth) + (taskbar.width) / 2, 0), new PdfColor(255, 255, 255), new PdfColor(taskbar.unscheduledTaskBarColor));
                        //Draw rectangle to fill linear gradient color
                        taskGraphics.drawRectangle(brush2, startPoint.x + (this.left - cumulativeWidth) + 0.5 + (taskbar.width) / 2, startPoint.y + adjustHeight_1, (taskbar.width) / 2, pixelToPoint(taskbar.height));
                        if (template.value || template.image) {
                            var imageWidth = void 0;
                            if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                imageWidth = taskbar.taskbarTemplate.image[0].width;
                                var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                taskGraphics.drawImage(image, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                            }
                            else {
                                imageWidth = 0;
                            }
                            !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + (this.left - cumulativeWidth) + 0.5 + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(this.height), progressFormat) : '';
                        }
                    }
                    else {
                        brush1 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + pixelToPoint(taskbar.width) / 2, 0), new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth), 0), new PdfColor(taskbar.unscheduledTaskBarColor), new PdfColor(255, 255, 255));
                        taskGraphics.drawRectangle(brush1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                        brush2 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + pixelToPoint(taskbar.width), 0), new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + pixelToPoint(taskbar.width) / 2, 0), new PdfColor(255, 255, 255), new PdfColor(taskbar.unscheduledTaskBarColor));
                        //Draw rectangle to fill linear gradient color
                        taskGraphics.drawRectangle(brush2, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + pixelToPoint(taskbar.width) / 2, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width) / 2, pixelToPoint(taskbar.height));
                        if (template.value || template.image) {
                            var imageWidth = void 0;
                            if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                imageWidth = taskbar.taskbarTemplate.image[0].width;
                                var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                taskGraphics.drawImage(image, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                            }
                            else {
                                imageWidth = 0;
                            }
                            !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(this.height), progressFormat) : '';
                        }
                    }
                }
                else if (!this.isScheduledTask && this.unscheduledTaskBy === "endDate") {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight_1);
                }
                else if (!this.isScheduledTask && this.unscheduledTaskBy !== 'duration') {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight_1);
                }
                else {
                    if (taskbar.isSpliterTask) {
                        splitline.dashStyle = PdfDashStyle.Dot;
                        if (this.isAutoFit()) {
                            taskGraphics.drawLine(splitline, new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)), new PointF((taskbar.width) + startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)));
                        }
                        else {
                            taskGraphics.drawLine(splitline, new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)), new PointF(pixelToPoint(taskbar.width) + startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)));
                        }
                        taskbar.segment.map(function (data, index) {
                            var segmenttaskbarPen = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfPen(_this.taskSegmentStyles[index].taskBorderColor) : taskbarPen_1;
                            var segmenttaskBrush = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfSolidBrush(_this.taskSegmentStyles[index].taskColor) : taskBrush_1;
                            if (_this.isAutoFit()) {
                                taskGraphics.drawRectangle(segmenttaskbarPen, segmenttaskBrush, startPoint.x + (_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (data.width), pixelToPoint(taskbar.height));
                                if (template.value || template.image) {
                                    var imageWidth = void 0;
                                    if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                        imageWidth = taskbar.taskbarTemplate.image[0].width;
                                        var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                        taskGraphics.drawImage(image, startPoint.x + (_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                                    }
                                    else {
                                        imageWidth = 0;
                                    }
                                    !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + (_this.left + data.left - cumulativeWidth) + 0.5 + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(data.width), pixelToPoint(taskbar.height), progressFormat) : '';
                                }
                            }
                            else {
                                taskGraphics.drawRectangle(segmenttaskbarPen, segmenttaskBrush, startPoint.x + pixelToPoint(_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(data.width), pixelToPoint(taskbar.height));
                                if (template.value || template.image) {
                                    var imageWidth = void 0;
                                    if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                        imageWidth = taskbar.taskbarTemplate.image[0].width;
                                        var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                        taskGraphics.drawImage(image, startPoint.x + pixelToPoint(_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                                    }
                                    else {
                                        imageWidth = 0;
                                    }
                                    !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(_this.left + data.left - cumulativeWidth) + 0.5 + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(data.width), pixelToPoint(taskbar.height), progressFormat) : '';
                                }
                            }
                        });
                    }
                    else if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                        taskGraphics.save();
                        var path = new PdfPath();
                        path.addEllipse(0, 0, 5, 5);
                        if (this.isAutoFit()) {
                            taskGraphics.translateTransform(startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 - 2);
                        }
                        else {
                            taskGraphics.translateTransform(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 - 2);
                        }
                        taskGraphics.drawPath(manualTaskbarPen, manuallineBrush, path);
                        taskGraphics.restore();
                        var path1 = new PdfPath();
                        path1.addEllipse(0, 0, 5, 5);
                        taskGraphics.save();
                        if (this.isAutoFit()) {
                            taskGraphics.translateTransform(startPoint.x + (this.left - cumulativeWidth) + 0.5 + (this.width), startPoint.y + adjustHeight_1 - 2);
                        }
                        else {
                            taskGraphics.translateTransform(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + pixelToPoint(this.width), startPoint.y + adjustHeight_1 - 2);
                        }
                        taskGraphics.drawPath(manualTaskbarPen, manuallineBrush, path1);
                        taskGraphics.restore();
                        manualline.dashStyle = PdfDashStyle.Solid;
                        if (this.isAutoFit()) {
                            taskGraphics.drawLine(manualline, new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1), new PointF((taskbar.width) + startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1));
                        }
                        else {
                            taskGraphics.drawLine(manualline, new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1), new PointF(pixelToPoint(taskbar.width) + startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1));
                        }
                    }
                    else if (!taskbar.isAutoSchedule && !taskbar.isParentTask) {
                        taskGraphics.save();
                        taskGraphics.setTransparency(0.87);
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(manualChildBorderPen, manualChildBrush, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (taskbar.width), pixelToPoint(taskbar.height));
                        }
                        else {
                            taskGraphics.drawRectangle(manualChildBorderPen, manualChildBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                        }
                        taskGraphics.restore();
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(null, manualChildProgressBrush, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (taskbar.progressWidth), pixelToPoint(this.height));
                        }
                        else {
                            taskGraphics.drawRectangle(null, manualChildProgressBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.progressWidth), pixelToPoint(this.height));
                        }
                    }
                    else {
                        if (this.isAutoFit()) {
                            if (isNullOrUndefined(template.value) && isNullOrUndefined(template.image)) {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (taskbar.width), pixelToPoint(taskbar.height));
                            }
                            else {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (taskbar.width), pixelToPoint(taskbar.height));
                                var imageWidth = void 0;
                                if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                    imageWidth = taskbar.taskbarTemplate.image[0].width / 2.0;
                                    var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                    taskGraphics.drawImage(image, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + (taskbar.height - taskbar.taskbarTemplate.image[0].height) / 2.0, (taskbar.taskbarTemplate.image[0].width) / 2.0, (taskbar.taskbarTemplate.image[0].height) / 2.0);
                                }
                                else {
                                    imageWidth = 0;
                                }
                                if (taskbar.taskbarTemplate.value) {
                                    if (isLabelString) {
                                        updatedWidth = this.width;
                                    }
                                    taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + (this.left - cumulativeWidth) + imageWidth, startPoint.y + adjustHeight_1, (updatedWidth), pixelToPoint(this.height), progressFormat);
                                }
                            }
                        }
                        else {
                            if (isNullOrUndefined(template.value) && isNullOrUndefined(template.image)) {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                            }
                            else {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                                var imageWidth = void 0;
                                if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                    imageWidth = taskbar.taskbarTemplate.image[0].width;
                                    var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                    taskGraphics.drawImage(image, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 1, startPoint.y + adjustHeight_1 + 1 + pixelToPoint((taskbar.height - taskbar.taskbarTemplate.image[0].height) / 2.0), pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                                }
                                else {
                                    imageWidth = 0;
                                }
                                !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat) : '';
                            }
                        }
                    }
                    if (this.isScheduledTask && taskbar.isAutoSchedule && !taskbar.isSpliterTask) {
                        if (isNullOrUndefined(template.image) && isNullOrUndefined(template.value)) {
                            if (this.isAutoFit()) {
                                taskGraphics.drawRectangle(progressPen_1, progressBrush_1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (taskbar.progressWidth), pixelToPoint(taskbar.height));
                            }
                            else {
                                taskGraphics.drawRectangle(progressPen_1, progressBrush_1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.progressWidth), pixelToPoint(taskbar.height));
                            }
                            if (!isNullOrUndefined(this.parent.labelSettings.taskLabel) && !isNullOrUndefined(this.taskLabel)) {
                                if (this.taskLabel !== '0' && this.taskLabel !== '0%') {
                                    updatedWidth = this.progressWidth;
                                }
                                if (isLabelString) {
                                    updatedWidth = this.width;
                                }
                                if (this.isAutoFit()) {
                                    taskGraphics.drawString(this.taskLabel.toString(), taskLabelFont, fontColor, taskLabelFontBrush, startPoint.x + (this.left - cumulativeWidth), startPoint.y + adjustHeight_1, (updatedWidth), pixelToPoint(this.height), progressFormat);
                                }
                                else {
                                    taskGraphics.drawString(this.taskLabel.toString(), taskLabelFont, fontColor, taskLabelFontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth), startPoint.y + adjustHeight_1, pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                                }
                            }
                        }
                    }
                    else if (taskbar.isSpliterTask) {
                        taskbar.segment.map(function (data, index) {
                            var segmentprogressPen = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfPen(_this.taskSegmentStyles[index].progressColor) : progressPen_1;
                            var segmentprogressBrush = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfSolidBrush(_this.taskSegmentStyles[index].progressColor) : progressBrush_1;
                            if (_this.isAutoFit()) {
                                taskGraphics.drawRectangle(segmentprogressPen, segmentprogressBrush, startPoint.x + (_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (data.progressWidth), pixelToPoint(taskbar.height));
                            }
                            else {
                                taskGraphics.drawRectangle(segmentprogressPen, segmentprogressBrush, startPoint.x + pixelToPoint(_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(data.progressWidth), pixelToPoint(taskbar.height));
                            }
                        });
                    }
                }
                this.isCompleted = true;
                this.startPage = pageIndex;
                this.endPage = pageIndex;
            }
            //Task start date is in the range of header split up start and end date
            else if (detail.startDate <= startDate && detail.endDate >= startDate && (endDate >= detail.endDate)) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                var width = this.width;
                var renderWidth_1 = 0;
                var progressWidth = 0;
                var splitRenderwidth_1 = 0;
                this.width = this.width - (detail.totalWidth - (this.left - cumulativeWidth));
                renderWidth_1 = (detail.totalWidth - (this.left - cumulativeWidth));
                progressWidth = (detail.totalWidth - (this.left - cumulativeWidth));
                if (width < renderWidth_1) {
                    renderWidth_1 = width;
                }
                splitRenderwidth_1 = renderWidth_1;
                if (!this.isScheduledTask && this.unscheduledTaskBy === 'duration') {
                    var brush1 = void 0;
                    var brush2 = void 0;
                    if (this.isAutoFit()) {
                        brush1 = new PdfLinearGradientBrush(new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5 + (renderWidth_1) / 2, 0), new PointF(startPoint.x + (this.left - cumulativeWidth), 0), new PdfColor(taskbar.unscheduledTaskBarColor), new PdfColor(255, 255, 255));
                        taskGraphics.drawRectangle(brush1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (renderWidth_1), pixelToPoint(taskbar.height));
                        brush2 = new PdfLinearGradientBrush(new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5 + (renderWidth_1), 0), new PointF(startPoint.x + (this.left - cumulativeWidth) + (renderWidth_1) / 2, 0), new PdfColor(255, 255, 255), new PdfColor(taskbar.unscheduledTaskBarColor));
                        taskGraphics.drawRectangle(brush2, startPoint.x + (this.left - cumulativeWidth) + 0.5 + (renderWidth_1) / 2, startPoint.y + adjustHeight_1, (renderWidth_1) / 2, pixelToPoint(taskbar.height));
                        if (template.value || template.image) {
                            var imageWidth = void 0;
                            if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                imageWidth = taskbar.taskbarTemplate.image[0].width;
                                var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                taskGraphics.drawImage(image, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                            }
                            else {
                                imageWidth = 0;
                            }
                            !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + (this.left - cumulativeWidth) + 0.5 + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(this.height), progressFormat) : '';
                        }
                    }
                    else {
                        brush1 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + pixelToPoint(renderWidth_1) / 2, 0), new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth), 0), new PdfColor(taskbar.unscheduledTaskBarColor), new PdfColor(255, 255, 255));
                        taskGraphics.drawRectangle(brush1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(renderWidth_1), pixelToPoint(taskbar.height));
                        brush2 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + pixelToPoint(renderWidth_1), 0), new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + pixelToPoint(renderWidth_1) / 2, 0), new PdfColor(255, 255, 255), new PdfColor(taskbar.unscheduledTaskBarColor));
                        taskGraphics.drawRectangle(brush2, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + pixelToPoint(renderWidth_1) / 2, startPoint.y + adjustHeight_1, pixelToPoint(renderWidth_1) / 2, pixelToPoint(taskbar.height));
                        if (template.value || template.image) {
                            var imageWidth = void 0;
                            if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                imageWidth = taskbar.taskbarTemplate.image[0].width;
                                var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                taskGraphics.drawImage(image, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                            }
                            else {
                                imageWidth = 0;
                            }
                            !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5 + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(this.height), progressFormat) : '';
                        }
                    }
                }
                else if (!this.isScheduledTask && this.unscheduledTaskBy !== 'duration') {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight_1);
                }
                else if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                    taskGraphics.save();
                    var path = new PdfPath();
                    path.addEllipse(0, 0, 5, 5);
                    if (this.isAutoFit()) {
                        taskGraphics.translateTransform(startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 - 2);
                    }
                    else {
                        taskGraphics.translateTransform(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 - 2);
                    }
                    taskGraphics.drawPath(manualTaskbarPen, manuallineBrush, path);
                    taskGraphics.restore();
                    manualline.dashStyle = PdfDashStyle.Solid;
                    if (this.isAutoFit()) {
                        taskGraphics.drawLine(manualline, new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1), new PointF((renderWidth_1) + startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1));
                    }
                    else {
                        taskGraphics.drawLine(manualline, new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1), new PointF(pixelToPoint(renderWidth_1) + startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1));
                    }
                }
                else if (!taskbar.isAutoSchedule && !taskbar.isParentTask) {
                    if (this.isAutoFit()) {
                        taskGraphics.drawRectangle(manualChildBorderPen, null, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (renderWidth_1), pixelToPoint(taskbar.height));
                    }
                    else {
                        taskGraphics.drawRectangle(manualChildBorderPen, null, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(renderWidth_1), pixelToPoint(taskbar.height));
                    }
                    taskGraphics.save();
                    taskGraphics.setTransparency(0.87);
                    if (this.isAutoFit()) {
                        taskGraphics.drawRectangle(null, manualChildBrush, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (renderWidth_1), pixelToPoint(taskbar.height));
                    }
                    else {
                        taskGraphics.drawRectangle(null, manualChildBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(renderWidth_1), pixelToPoint(taskbar.height));
                    }
                    taskGraphics.restore();
                    if (this.isAutoFit()) {
                        taskGraphics.drawRectangle(null, manualChildProgressBrush, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (progressWidth), pixelToPoint(taskbar.height));
                    }
                    else {
                        taskGraphics.drawRectangle(null, manualChildProgressBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(progressWidth), pixelToPoint(taskbar.height));
                    }
                    taskbar.progressWidth = taskbar.progressWidth - progressWidth;
                }
                else if (!this.isScheduledTask && this.unscheduledTaskBy !== 'duration') {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight_1);
                }
                else if (!this.isScheduledTask && this.unscheduledTaskBy === "endDate") {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight_1);
                }
                else {
                    if (taskbar.isSpliterTask) {
                        var pervwidth_1 = 0;
                        var valueChangeBlocker_1 = true;
                        var lineWidth_1 = 0;
                        taskbar.segment.map(function (item) {
                            lineWidth_1 = item.left + item.width;
                        });
                        splitline.dashStyle = PdfDashStyle.Dot;
                        if (this.isAutoFit()) {
                            taskGraphics.drawLine(splitline, new PointF(startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)), new PointF((lineWidth_1) + (this.left - cumulativeWidth) + startPoint.x, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)));
                        }
                        else {
                            taskGraphics.drawLine(splitline, new PointF(startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)), new PointF(pixelToPoint(lineWidth_1) + pixelToPoint(this.left - cumulativeWidth) + startPoint.x, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)));
                        }
                        taskbar.segment.map(function (data, index) {
                            var segmenttaskbarPen = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfPen(_this.taskSegmentStyles[index].taskBorderColor) : taskbarPen_1;
                            var segmenttaskBrush = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfSolidBrush(_this.taskSegmentStyles[index].taskColor) : taskBrush_1;
                            if (_this.isAutoFit()) {
                                taskGraphics.drawRectangle(segmenttaskbarPen, segmenttaskBrush, startPoint.x + (_this.left - cumulativeWidth) + 0.5 + (data.left), startPoint.y + adjustHeight_1, (data.width), pixelToPoint(taskbar.height));
                                if (template.value || template.image) {
                                    var imageWidth = void 0;
                                    if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                        imageWidth = taskbar.taskbarTemplate.image[0].width;
                                        var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                        taskGraphics.drawImage(image, startPoint.x + (_this.left - cumulativeWidth) + 0.5 + (data.left), startPoint.y + adjustHeight_1, (taskbar.taskbarTemplate.image[0].width), (taskbar.taskbarTemplate.image[0].height));
                                    }
                                    else {
                                        imageWidth = 0;
                                    }
                                    !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + (_this.left - cumulativeWidth) + 0.5 + (data.left) + imageWidth, startPoint.y + adjustHeight_1, (data.width), (taskbar.height), progressFormat) : '';
                                }
                            }
                            else {
                                taskGraphics.drawRectangle(segmenttaskbarPen, segmenttaskBrush, startPoint.x + pixelToPoint(_this.left - cumulativeWidth) + 0.5 + pixelToPoint(data.left), startPoint.y + adjustHeight_1, pixelToPoint(data.width), pixelToPoint(taskbar.height));
                                if (template.value || template.image) {
                                    var imageWidth = void 0;
                                    if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                        imageWidth = taskbar.taskbarTemplate.image[0].width;
                                        var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                        taskGraphics.drawImage(image, startPoint.x + pixelToPoint(_this.left - cumulativeWidth) + 0.5 + pixelToPoint(data.left), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                                    }
                                    else {
                                        imageWidth = 0;
                                    }
                                    !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(_this.left - cumulativeWidth) + 0.5 + pixelToPoint(data.left) + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(data.width), pixelToPoint(taskbar.height), progressFormat) : '';
                                }
                            }
                            pervwidth_1 = data.left + data.width;
                            if (renderWidth_1 >= pervwidth_1) {
                                _this.segmentCollection[parseInt(index.toString(), 10)].width = 0;
                                _this.segmentCollection[parseInt(index.toString(), 10)].left = 0;
                            }
                            else {
                                if (renderWidth_1 >= (pervwidth_1 - data.width)) {
                                    _this.segmentCollection[parseInt(index.toString(), 10)].left = 0;
                                }
                                else {
                                    _this.segmentCollection[parseInt(index.toString(), 10)].left = ((splitRenderwidth_1 - data.left));
                                }
                                if (renderWidth_1 >= (pervwidth_1)) {
                                    _this.segmentCollection[parseInt(index.toString(), 10)].width = 0;
                                }
                                else {
                                    if (valueChangeBlocker_1) {
                                        _this.segmentCollection[parseInt(index.toString(), 10)].width = pervwidth_1 - renderWidth_1;
                                        valueChangeBlocker_1 = false;
                                    }
                                }
                            }
                            splitRenderwidth_1 = splitRenderwidth_1 + data.width + data.left;
                        });
                    }
                    else {
                        if (this.isAutoFit()) {
                            if (isNullOrUndefined(template.value) && isNullOrUndefined(template.image)) {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (renderWidth_1), pixelToPoint(taskbar.height));
                            }
                            else {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (renderWidth_1), pixelToPoint(taskbar.height));
                                if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                    var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                    taskGraphics.drawImage(image, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint((taskbar.height - taskbar.taskbarTemplate.image[0].height) / 0.5), (taskbar.taskbarTemplate.image[0].width / 2.0), (taskbar.taskbarTemplate.image[0].height / 2.0));
                                }
                                if (!isNullOrUndefined(taskbar.taskbarTemplate.value)) {
                                    var imageWidth = !isNullOrUndefined(taskbar.taskbarTemplate.image) ? taskbar.taskbarTemplate.image[0].width : 0;
                                    taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + (this.left - cumulativeWidth) + imageWidth, (startPoint.y + adjustHeight_1), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                                }
                            }
                        }
                        else {
                            if (isNullOrUndefined(template.value) && isNullOrUndefined(template.image)) {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(renderWidth_1), pixelToPoint(taskbar.height));
                            }
                            else {
                                taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(renderWidth_1), pixelToPoint(taskbar.height));
                                var imageWidth = void 0;
                                if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                    imageWidth = taskbar.taskbarTemplate.image[0].width;
                                    var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                    taskGraphics.drawImage(image, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 1, startPoint.y + adjustHeight_1 + 1 + pixelToPoint((taskbar.height - taskbar.taskbarTemplate.image[0].height) / 2.0), pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                                }
                                else {
                                    imageWidth = 0;
                                }
                                if (!isNullOrUndefined(taskbar.taskbarTemplate.value)) {
                                    this.stringLeft = pixelToPoint(this.left);
                                    var result_1 = this.getWidth(taskbar.taskbarTemplate.value, detail.endPoint - this.stringLeft, 15);
                                    taskGraphics.drawString(result_1.lines[0].text, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + imageWidth, (startPoint.y + adjustHeight_1), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                                    if (!isNullOrUndefined(result_1.remainder)) {
                                        this.remainString = result_1.remainder;
                                        this.stringLeft = detail.endPoint;
                                        // this.rightTaskLabel.isLeftCalculated = true;
                                    }
                                }
                            }
                        }
                        if (taskbar.isAutoSchedule && !taskbar.isSpliterTask) {
                            var progressBoundsWidth = 0;
                            if (this.progressWidth <= renderWidth_1) {
                                progressBoundsWidth = this.progressWidth;
                            }
                            else {
                                progressBoundsWidth = renderWidth_1;
                            }
                            if (isNullOrUndefined(template.image) && isNullOrUndefined(template.value)) {
                                if (this.isAutoFit()) {
                                    taskGraphics.drawRectangle(progressPen_1, progressBrush_1, startPoint.x + (this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (progressBoundsWidth), pixelToPoint(taskbar.height));
                                }
                                else {
                                    taskGraphics.drawRectangle(progressPen_1, progressBrush_1, startPoint.x + pixelToPoint(this.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(progressBoundsWidth), pixelToPoint(taskbar.height));
                                }
                            }
                            this.progressWidth -= progressBoundsWidth;
                            if (this.parent.labelSettings.taskLabel && !isNullOrUndefined(this.taskLabel)) {
                                updatedWidth = progressBoundsWidth;
                                if (isLabelString) {
                                    updatedWidth = renderWidth_1;
                                }
                                this.stringLeft = this.left;
                                if (isNullOrUndefined(taskbar.taskbarTemplate.value)) {
                                    var result_2 = this.getWidth(this.taskLabel.toString(), detail.endPoint - this.stringLeft, 15);
                                    taskGraphics.drawString(result_2.lines[0].text, taskLabelFont, fontColor, taskLabelFontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth), (startPoint.y + adjustHeight_1), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                                    if (!isNullOrUndefined(result_2.remainder)) {
                                        this.remainString = result_2.remainder;
                                        this.stringLeft = detail.endPoint;
                                        // this.rightTaskLabel.isLeftCalculated = true;
                                    }
                                }
                                else {
                                    if (this.isAutoFit()) {
                                        taskGraphics.drawString(this.taskLabel.toString(), taskLabelFont, fontColor, taskLabelFontBrush, startPoint.x + (this.left - cumulativeWidth), (startPoint.y + adjustHeight_1), (updatedWidth), pixelToPoint(this.height), progressFormat);
                                    }
                                    else {
                                        taskGraphics.drawString(this.taskLabel.toString(), taskLabelFont, fontColor, taskLabelFontBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth), (startPoint.y + adjustHeight_1), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                                    }
                                }
                            }
                        }
                    }
                    if (taskbar.isSpliterTask) {
                        taskbar.segment.map(function (data, index) {
                            var segmentprogressPen = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfPen(_this.taskSegmentStyles[index].progressColor) : progressPen_1;
                            var segmentprogressBrush = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfSolidBrush(_this.taskSegmentStyles[index].progressColor) : progressBrush_1;
                            if (_this.isAutoFit()) {
                                taskGraphics.drawRectangle(segmentprogressPen, segmentprogressBrush, startPoint.x + (_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, (data.progressWidth), pixelToPoint(taskbar.height));
                            }
                            else {
                                taskGraphics.drawRectangle(segmentprogressPen, segmentprogressBrush, startPoint.x + pixelToPoint(_this.left + data.left - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(data.progressWidth), pixelToPoint(taskbar.height));
                            }
                            if (_this.segmentCollection[parseInt(index.toString(), 10)].width === 0) {
                                _this.segmentCollection[parseInt(index.toString(), 10)].progressWidth = 0;
                            }
                            else {
                                if (data.width - _this.segmentCollection[parseInt(index.toString(), 10)].width < data.progressWidth && data.width !== _this.segmentCollection[index].width) {
                                    _this.segmentCollection[parseInt(index.toString(), 10)].progressWidth = data.progressWidth - (data.width - _this.segmentCollection[index].width);
                                }
                            }
                        });
                    }
                }
                this.left = 0;
                this.isCompleted = false;
                this.startPage = pageIndex;
            }
            //Task end date is in the range of header split up start and end date
            else if (endDate <= detail.endDate && detail.startDate <= endDate && !this.isCompleted) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                if (!this.isScheduledTask && this.unscheduledTaskBy === 'duration') {
                    var brush1 = void 0;
                    var brush2 = void 0;
                    brush1 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(taskbar.left + 0.5) + pixelToPoint(taskbar.width) / 2, 0), new PointF(startPoint.x + pixelToPoint(taskbar.left + 0.5), 0), new PdfColor(taskbar.unscheduledTaskBarColor), new PdfColor(255, 255, 255));
                    taskGraphics.drawRectangle(brush1, startPoint.x + pixelToPoint(taskbar.left + 0.5), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                    brush2 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(taskbar.left + 0.5) + pixelToPoint(taskbar.width), 0), new PointF(startPoint.x + pixelToPoint(taskbar.left + 0.5) + pixelToPoint(taskbar.width) / 2, 0), new PdfColor(255, 255, 255), new PdfColor(taskbar.unscheduledTaskBarColor));
                    taskGraphics.drawRectangle(brush2, startPoint.x + pixelToPoint(taskbar.left + 0.5) + pixelToPoint(taskbar.width) / 2, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width) / 2, pixelToPoint(taskbar.height));
                    if (template.value || template.image) {
                        var imageWidth = void 0;
                        if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                            imageWidth = taskbar.taskbarTemplate.image[0].width;
                            var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                            taskGraphics.drawImage(image, startPoint.x + pixelToPoint(taskbar.left + 0.5), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                        }
                        else {
                            imageWidth = 0;
                        }
                        !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(taskbar.left + 0.5) + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(this.height), progressFormat) : '';
                    }
                }
                else if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                    var path1 = new PdfPath();
                    path1.addEllipse(0, 0, 5, 5); // Circle with radius 5
                    taskGraphics.save(); // Save the current graphics state  
                    var lineStartX = startPoint.x + pixelToPoint(this.left + 0.5); // Calculate the endpoint of the line
                    var lineEndX = pixelToPoint(taskbar.width) + lineStartX - 5;
                    var lineY = startPoint.y + adjustHeight_1;
                    taskGraphics.drawLine(manualline, lineStartX, lineY, lineEndX, lineY); // Draw the line first     
                    taskGraphics.translateTransform(lineEndX, lineY - 2); // Now move the origin to the line's end point to draw the circle        
                    taskGraphics.drawPath(manualTaskbarPen, manuallineBrush, path1); // Draw the circle at the end of the line  
                    taskGraphics.restore(); // Restore the graphics state
                    manualline.dashStyle = PdfDashStyle.Solid; // Ensure the line has a solid style
                }
                else if (!taskbar.isAutoSchedule && !taskbar.isParentTask) {
                    taskGraphics.drawRectangle(manualChildBorderPen, null, startPoint.x + pixelToPoint(this.left + 0.5), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                    taskGraphics.save();
                    taskGraphics.setTransparency(0.87);
                    taskGraphics.drawRectangle(null, manualChildBrush, startPoint.x + pixelToPoint(this.left + 0.5), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                    taskGraphics.restore();
                    taskGraphics.drawRectangle(null, manualChildProgressBrush, startPoint.x + pixelToPoint(this.left + 0.5), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.progressWidth), pixelToPoint(taskbar.height));
                }
                else if (!this.isScheduledTask && this.unscheduledTaskBy === "endDate") {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight_1);
                }
                else if (taskbar.isSpliterTask) {
                    splitline.dashStyle = PdfDashStyle.Dot;
                    taskGraphics.drawLine(splitline, new PointF(startPoint.x + pixelToPoint(this.left) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)), new PointF(pixelToPoint(taskbar.width) + startPoint.x + pixelToPoint(this.left), startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height / 2)));
                    taskbar.segmentCollection.map(function (data, index) {
                        var segmenttaskbarPen = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfPen(_this.taskSegmentStyles[index].taskBorderColor) : taskbarPen_1;
                        var segmenttaskBrush = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfSolidBrush(_this.taskSegmentStyles[index].taskColor) : taskBrush_1;
                        if (data.width !== 0) {
                            taskGraphics.drawRectangle(segmenttaskbarPen, segmenttaskBrush, startPoint.x + pixelToPoint(taskbar.left + 0.5 + data.left), startPoint.y + adjustHeight_1, pixelToPoint(data.width), pixelToPoint(taskbar.height));
                            if (template.value || template.image) {
                                var imageWidth = void 0;
                                if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                                    imageWidth = taskbar.taskbarTemplate.image[0].width;
                                    var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                                    taskGraphics.drawImage(image, startPoint.x + pixelToPoint(taskbar.left + 0.5 + data.left), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                                }
                                else {
                                    imageWidth = 0;
                                }
                                !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(taskbar.left + 0.5 + data.left) + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(data.width), pixelToPoint(taskbar.height), progressFormat) : '';
                            }
                        }
                    });
                }
                else {
                    taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + pixelToPoint(taskbar.left + 0.5), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(taskbar.height));
                    if (!isNullOrUndefined(this.remainString)) {
                        var result = this.getWidth(this.remainString, taskbar.width - taskbar.left, 15);
                        taskGraphics.drawString(result.lines[0].text, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(taskbar.left), (startPoint.y + adjustHeight_1), result.actualSize.width, pixelToPoint(this.height), progressFormat);
                    }
                }
                if (this.isScheduledTask && taskbar.isAutoSchedule && !taskbar.isSpliterTask) {
                    if (isNullOrUndefined(template.image) && isNullOrUndefined(template.value)) {
                        taskGraphics.drawRectangle(progressPen_1, progressBrush_1, startPoint.x + pixelToPoint(taskbar.left + 0.5), startPoint.y + adjustHeight_1, pixelToPoint(taskbar.progressWidth), pixelToPoint(taskbar.height));
                    }
                    if (!isNullOrUndefined(this.taskLabel)) {
                        updatedWidth = this.progressWidth;
                        if (isLabelString) {
                            updatedWidth = this.width;
                        }
                        if (isNullOrUndefined(taskbar.taskbarTemplate.value)) {
                            if (isNullOrUndefined(taskbar.taskbarTemplate.value)) {
                                if (!isNullOrUndefined(this.remainString)) {
                                    var result_3 = this.getWidth(this.remainString, detail.endPoint - this.stringLeft, 15);
                                    taskGraphics.drawString(result_3.lines[0].text, font, fontColor, fontBrush, startPoint.x + pixelToPoint(this.left), (startPoint.y + adjustHeight_1), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                                }
                            }
                        }
                        if (!isNullOrUndefined(this.taskLabel)) {
                            updatedWidth = this.progressWidth;
                            if (isLabelString) {
                                updatedWidth = this.width;
                            }
                            taskGraphics.drawString(this.taskLabel.toString(), font, fontColor, fontBrush, startPoint.x + pixelToPoint(this.left), (startPoint.y + adjustHeight_1), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                        }
                    }
                }
                else if (taskbar.isSpliterTask) {
                    taskbar.segmentCollection.map(function (data, index) {
                        var segmentprogressPen = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfPen(_this.taskSegmentStyles[index].progressColor) : progressPen_1;
                        var segmentprogressBrush = !isNullOrUndefined(_this.taskSegmentStyles) ? new PdfSolidBrush(_this.taskSegmentStyles[index].progressColor) : progressBrush_1;
                        taskGraphics.drawRectangle(segmentprogressPen, segmentprogressBrush, startPoint.x + pixelToPoint(taskbar.left + 0.5 + data.left), startPoint.y + adjustHeight_1, pixelToPoint(data.progressWidth), pixelToPoint(taskbar.height));
                    });
                }
                this.isCompleted = true;
                this.endPage = pageIndex;
            }
            //Header splitup start and end date with in the task start and end date.
            //So the task is takes entire width of page.
            else if (startDate < detail.startDate && endDate > detail.endDate) {
                if (!this.isStartPoint) {
                    this.taskStartPoint = __assign({}, startPoint);
                    this.isStartPoint = true;
                }
                if (!this.isScheduledTask && this.unscheduledTaskBy === 'duration') {
                    var brush1 = void 0;
                    var brush2 = void 0;
                    brush1 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(taskbar.left) + 0.5 + pixelToPoint(detail.totalWidth) / 2, 0), new PointF(startPoint.x + pixelToPoint(taskbar.left), 0), new PdfColor(taskbar.unscheduledTaskBarColor), new PdfColor(255, 255, 255));
                    taskGraphics.drawRectangle(brush1, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(detail.totalWidth), pixelToPoint(taskbar.height));
                    brush2 = new PdfLinearGradientBrush(new PointF(startPoint.x + pixelToPoint(taskbar.left) + 0.5 + pixelToPoint(detail.totalWidth), 0), new PointF(startPoint.x + pixelToPoint(taskbar.left) + pixelToPoint(detail.totalWidth) / 2, 0), new PdfColor(255, 255, 255), new PdfColor(taskbar.unscheduledTaskBarColor));
                    taskGraphics.drawRectangle(brush2, startPoint.x + pixelToPoint(taskbar.left) + 0.5 + pixelToPoint(detail.totalWidth) / 2, startPoint.y + adjustHeight_1, pixelToPoint(detail.totalWidth) / 2, pixelToPoint(taskbar.height));
                    if (template.value || template.image) {
                        var imageWidth = void 0;
                        if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                            imageWidth = taskbar.taskbarTemplate.image[0].width;
                            var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                            taskGraphics.drawImage(image, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height));
                        }
                        else {
                            imageWidth = 0;
                        }
                        !isNullOrUndefined(taskbar.taskbarTemplate.value) ? taskGraphics.drawString(taskbar.taskbarTemplate.value, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(taskbar.left + 0.5) + imageWidth, startPoint.y + adjustHeight_1, pixelToPoint(taskbar.width), pixelToPoint(this.height), progressFormat) : 0;
                    }
                }
                else if (!this.isScheduledTask && this.unscheduledTaskBy === "endDate") {
                    this.drawUnscheduledTask(taskGraphics, startPoint, cumulativeWidth, adjustHeight_1);
                }
                else if (!taskbar.isAutoSchedule && !taskbar.isParentTask) {
                    taskGraphics.drawRectangle(manualChildBorderPen, null, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(detail.totalWidth), pixelToPoint(taskbar.height));
                    taskGraphics.save();
                    taskGraphics.setTransparency(0.87);
                    taskGraphics.drawRectangle(null, manualChildBrush, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(detail.totalWidth), pixelToPoint(taskbar.height));
                    taskGraphics.restore();
                    var progressBoundsWidth = 0;
                    if (this.progressWidth <= detail.totalWidth) {
                        progressBoundsWidth = this.progressWidth;
                    }
                    else {
                        progressBoundsWidth = detail.totalWidth;
                    }
                    if (isNullOrUndefined(template.image) && isNullOrUndefined(template.value)) {
                        taskGraphics.drawRectangle(progressPen_1, progressBrush_1, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(progressBoundsWidth), pixelToPoint(taskbar.height));
                    }
                    this.progressWidth -= progressBoundsWidth;
                    taskGraphics.drawRectangle(null, manualChildProgressBrush, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(progressBoundsWidth), pixelToPoint(taskbar.height));
                }
                else if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                    manualline.dashStyle = PdfDashStyle.Solid;
                    taskGraphics.drawLine(manualline, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(detail.totalWidth), startPoint.y + adjustHeight_1);
                }
                else {
                    taskGraphics.drawRectangle(taskbarPen_1, taskBrush_1, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(detail.totalWidth), pixelToPoint(taskbar.height));
                    if (!isNullOrUndefined(taskbar.taskbarTemplate.value)) {
                        if (!isNullOrUndefined(this.remainString)) {
                            var result_4 = this.getWidth(this.remainString, detail.endPoint - this.stringLeft, 15);
                            taskGraphics.drawString(result_4.lines[0].text, customizedFont, customizedFontColor, customizedFontBrush, startPoint.x + pixelToPoint(taskbar.left) + 0.5, (startPoint.y + adjustHeight_1), pixelToPoint(detail.totalWidth), pixelToPoint(this.height), progressFormat);
                        }
                    }
                    if (this.isScheduledTask && !taskbar.isParentTask) {
                        var progressBoundsWidth = 0;
                        if (this.progressWidth <= detail.totalWidth) {
                            progressBoundsWidth = this.progressWidth;
                        }
                        else {
                            progressBoundsWidth = detail.totalWidth;
                        }
                        if (isNullOrUndefined(template.image) && isNullOrUndefined(template.value)) {
                            taskGraphics.drawRectangle(progressPen_1, progressBrush_1, startPoint.x + pixelToPoint(taskbar.left) + 0.5, startPoint.y + adjustHeight_1, pixelToPoint(progressBoundsWidth), pixelToPoint(taskbar.height));
                        }
                        this.progressWidth -= progressBoundsWidth;
                        if (!isNullOrUndefined(this.taskLabel)) {
                            updatedWidth = progressBoundsWidth;
                            if (isLabelString) {
                                updatedWidth = this.width;
                            }
                            taskGraphics.drawString(this.taskLabel.toString(), taskLabelFont, fontColor, taskLabelFontBrush, startPoint.x + pixelToPoint(this.left), (startPoint.y + adjustHeight_1), pixelToPoint(updatedWidth), pixelToPoint(this.height), progressFormat);
                        }
                    }
                }
                this.isCompleted = false;
                this.width -= detail.totalWidth;
            }
            if (this.parent.renderBaseline && taskbar.baselineStartDate && taskbar.baselineEndDate) {
                if (detail.startDate <= taskbar.baselineStartDate && taskbar.baselineEndDate <= detail.endDate) {
                    if (!this.isStartPoint) {
                        this.taskStartPoint = __assign({}, startPoint);
                        this.isStartPoint = true;
                    }
                    if (this.parent.renderBaseline && taskbar.baselineStartDate && taskbar.baselineEndDate) {
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + (taskbar.baselineLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), (taskbar.baselineWidth), pixelToPoint(this.baselineHeight));
                        }
                        else {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + pixelToPoint(taskbar.baselineLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), pixelToPoint(taskbar.baselineWidth), pixelToPoint(this.baselineHeight));
                        }
                    }
                    this.isCompletedBaseline = true;
                    this.startPage = pageIndex;
                    this.endPage = pageIndex;
                }
                else if (detail.startDate <= taskbar.baselineStartDate && detail.endDate >= taskbar.baselineStartDate && (taskbar.baselineEndDate >= detail.endDate)) {
                    if (!this.isStartPoint) {
                        this.taskStartPoint = __assign({}, startPoint);
                        this.isStartPoint = true;
                    }
                    var width = this.baselineWidth;
                    var renderWidth = 0;
                    renderWidth = (detail.totalWidth - (taskbar.baselineLeft - cumulativeWidth));
                    if (width < renderWidth) {
                        renderWidth = width;
                    }
                    if (this.parent.renderBaseline && taskbar.baselineStartDate && taskbar.baselineEndDate) {
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + (taskbar.baselineLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), (renderWidth), pixelToPoint(this.baselineHeight));
                        }
                        else {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + pixelToPoint(taskbar.baselineLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), pixelToPoint(renderWidth), pixelToPoint(this.baselineHeight));
                        }
                    }
                    taskbar.baselineWidth = taskbar.baselineWidth - renderWidth;
                    this.baselineLeft = 0;
                    this.isCompletedBaseline = false;
                    this.startPage = pageIndex;
                }
                else if (taskbar.baselineEndDate <= detail.endDate && detail.startDate <= taskbar.baselineEndDate && !this.isCompletedBaseline) {
                    if (this.parent.renderBaseline && taskbar.baselineStartDate && taskbar.baselineEndDate) {
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + (taskbar.baselineLeft + 0.5), startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), (taskbar.baselineWidth), pixelToPoint(this.baselineHeight));
                        }
                        else {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + pixelToPoint(taskbar.baselineLeft + 0.5), startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), pixelToPoint(taskbar.baselineWidth), pixelToPoint(this.baselineHeight));
                        }
                    }
                    this.isCompletedBaseline = true;
                    this.endPage = pageIndex;
                }
                else if (taskbar.baselineStartDate < detail.startDate && taskbar.baselineEndDate > detail.endDate) {
                    if (this.parent.renderBaseline && taskbar.baselineStartDate && taskbar.baselineEndDate) {
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + (taskbar.baselineLeft) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), (detail.totalWidth), pixelToPoint(taskbar.baselineHeight));
                        }
                        else {
                            taskGraphics.drawRectangle(baselinePen, baselineBrush, startPoint.x + pixelToPoint(taskbar.baselineLeft) + 0.5, startPoint.y + adjustHeight_1 + pixelToPoint(taskbar.height + 3), pixelToPoint(detail.totalWidth), pixelToPoint(taskbar.baselineHeight));
                        }
                    }
                    this.isCompletedBaseline = false;
                    this.baselineWidth -= detail.totalWidth;
                }
            }
            if (!this.isAutoSchedule && taskbar.isParentTask) {
                if (detail.startDate <= taskbar.autoStartDate && taskbar.autoEndDate <= detail.endDate) {
                    if (!this.isStartPoint) {
                        this.taskStartPoint = __assign({}, startPoint);
                        this.isStartPoint = true;
                    }
                    if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(manualParentBorderPen, null, startPoint.x + (this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, (this.autoWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(manualParentBorderPen, null, startPoint.x + pixelToPoint(this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(this.autoWidth), pixelToPoint(12));
                        }
                        taskGraphics.save();
                        taskGraphics.setTransparency(0.87);
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(null, manualBrush, startPoint.x + (this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, (this.autoWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(null, manualBrush, startPoint.x + pixelToPoint(this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(this.autoWidth), pixelToPoint(12));
                        }
                        taskGraphics.restore();
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(null, manualProgressBrush, startPoint.x + (this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, (taskbar.progressWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(null, manualProgressBrush, startPoint.x + pixelToPoint(this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(taskbar.progressWidth), pixelToPoint(12));
                        }
                    }
                    this.isCompletedAutotask = true;
                    this.startPage = pageIndex;
                    this.endPage = pageIndex;
                }
                else if (detail.startDate <= taskbar.autoStartDate && detail.endDate >= taskbar.autoStartDate && (taskbar.autoEndDate >= detail.endDate)) {
                    if (!this.isStartPoint) {
                        this.taskStartPoint = __assign({}, startPoint);
                        this.isStartPoint = true;
                    }
                    var renderWidth = 0;
                    var progressWidth = 0;
                    renderWidth = (detail.totalWidth - (this.autoLeft - cumulativeWidth));
                    progressWidth = (detail.totalWidth - (this.autoLeft - cumulativeWidth));
                    if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(manualParentBorderPen, null, startPoint.x + (this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, (renderWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(manualParentBorderPen, null, startPoint.x + pixelToPoint(this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(renderWidth), pixelToPoint(12));
                        }
                        taskGraphics.save();
                        taskGraphics.setTransparency(0.87);
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(null, manualBrush, startPoint.x + (this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, (renderWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(null, manualBrush, startPoint.x + pixelToPoint(this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(renderWidth), pixelToPoint(12));
                        }
                        taskGraphics.restore();
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(null, manualProgressBrush, startPoint.x + (this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, (taskbar.progressWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(null, manualProgressBrush, startPoint.x + pixelToPoint(this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(progressWidth), pixelToPoint(12));
                        }
                        taskbar.autoWidth = taskbar.autoWidth - renderWidth;
                        taskbar.progressWidth = taskbar.progressWidth - progressWidth;
                    }
                    this.autoLeft = 0;
                    this.isCompletedAutotask = false;
                    this.startPage = pageIndex;
                }
                else if (taskbar.autoEndDate <= detail.endDate && detail.startDate <= taskbar.autoEndDate && !this.isCompletedAutotask) {
                    if (!this.isStartPoint) {
                        this.taskStartPoint = __assign({}, startPoint);
                        this.isStartPoint = true;
                    }
                    else if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                        taskGraphics.drawRectangle(manualParentBorderPen, null, startPoint.x + pixelToPoint(this.autoLeft + 0.5), startPoint.y + adjustHeight_1 + 10, pixelToPoint(taskbar.autoWidth), pixelToPoint(12));
                        taskGraphics.save();
                        taskGraphics.setTransparency(0.87);
                        taskGraphics.drawRectangle(manualBrush, startPoint.x + pixelToPoint(this.autoLeft + 0.5), startPoint.y + adjustHeight_1 + 10, pixelToPoint(taskbar.autoWidth), pixelToPoint(12));
                        taskGraphics.restore();
                        taskGraphics.drawRectangle(null, manualProgressBrush, startPoint.x + pixelToPoint(this.autoLeft + 0.5), startPoint.y + adjustHeight_1 + 10, pixelToPoint(taskbar.progressWidth), pixelToPoint(12));
                    }
                    this.isCompletedAutotask = true;
                    this.endPage = pageIndex;
                }
                else if (taskbar.autoStartDate < detail.startDate && taskbar.autoEndDate > detail.endDate) {
                    if (!this.isStartPoint) {
                        this.taskStartPoint = __assign({}, startPoint);
                        this.isStartPoint = true;
                    }
                    if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                        var progressBoundsWidth = 0;
                        if (this.progressWidth <= detail.totalWidth) {
                            progressBoundsWidth = this.progressWidth;
                        }
                        else {
                            progressBoundsWidth = detail.totalWidth;
                        }
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(null, manualProgressBrush, startPoint.x + (this.autoLeft + 0.5), startPoint.y + adjustHeight_1 + 10, (progressBoundsWidth), pixelToPoint(12));
                        }
                        else {
                            if (taskbar.progressWidth !== 0) {
                                taskGraphics.drawRectangle(null, manualProgressBrush, startPoint.x + pixelToPoint(this.autoLeft + 0.5), startPoint.y + adjustHeight_1 + 10, pixelToPoint(progressBoundsWidth), pixelToPoint(12));
                            }
                        }
                        this.progressWidth -= progressBoundsWidth;
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(manualParentBorderPen, null, startPoint.x + (this.autoLeft) + 0.5, startPoint.y + adjustHeight_1 + 10, (detail.totalWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(manualParentBorderPen, null, startPoint.x + pixelToPoint(this.autoLeft) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(detail.totalWidth), pixelToPoint(12));
                        }
                        taskGraphics.save();
                        taskGraphics.setTransparency(0.87);
                        if (this.isAutoFit()) {
                            taskGraphics.drawRectangle(null, manualBrush, startPoint.x + (this.autoLeft - cumulativeWidth) + 0.5, startPoint.y + adjustHeight_1 + 10, (detail.totalWidth), pixelToPoint(12));
                        }
                        else {
                            taskGraphics.drawRectangle(null, manualBrush, startPoint.x + pixelToPoint(this.autoLeft) + 0.5, startPoint.y + adjustHeight_1 + 10, pixelToPoint(detail.totalWidth), pixelToPoint(12));
                        }
                        taskGraphics.restore();
                    }
                    this.isCompletedAutotask = false;
                    this.autoWidth -= detail.totalWidth;
                }
            }
            if (!isNullOrUndefined(taskbar.indicators) && taskbar.indicators.length > 0) {
                taskbar.indicators.map(function (items, index) {
                    var currendate = _this.parent.dateValidationModule.getDateFromFormat(items.date, true);
                    if (detail.startDate <= currendate && currendate <= detail.endDate) {
                        var leftValue = _this.parent.chartRowsModule.getIndicatorleft(items.date);
                        if (!isNullOrUndefined(items.base64)) {
                            var image = new PdfBitmap(items.base64);
                            if (_this.isAutoFit()) {
                                taskGraphics.drawImage(image, (startPoint.x + (leftValue - cumulativeWidth) + 0.5 + 10) - _this.parent.perDayWidth / 2, startPoint.y + adjustHeight_1, imageSize_1, imageSize_1);
                                var state = taskGraphics.save();
                                taskGraphics.setClip(new RectangleF(startPoint.x, startPoint.y, page['contentWidth'], rowHeight));
                                taskGraphics.drawString(items.name, font, null, PdfBrushes.Black, (startPoint.x + (leftValue - cumulativeWidth) + 0.5 + 15 + imageSize_1) - _this.parent.perDayWidth / 2, startPoint.y + adjustHeight_1, null);
                                taskGraphics.restore(state);
                            }
                            else {
                                taskGraphics.drawImage(image, startPoint.x + pixelToPoint(leftValue - cumulativeWidth) + 0.5 + 10, startPoint.y + adjustHeight_1, imageSize_1, imageSize_1);
                                var state = taskGraphics.save();
                                taskGraphics.setClip(new RectangleF(startPoint.x, startPoint.y, page['contentWidth'], rowHeight));
                                taskGraphics.drawString(items.name, font, null, PdfBrushes.Black, startPoint.x + pixelToPoint(leftValue - cumulativeWidth) + 0.5 + 15 + imageSize_1, startPoint.y + adjustHeight_1, null);
                                taskGraphics.restore(state);
                            }
                        }
                    }
                });
            }
        }
        else {
            this.drawMilestone(page, startPoint, detail, cumulativeWidth, taskbar, false);
            if (this.parent.renderBaseline && taskbar.baselineStartDate && taskbar.baselineEndDate) {
                this.drawMilestone(page, startPoint, detail, cumulativeWidth, taskbar, true);
            }
        }
        this.drawRightLabel(page, startPoint, detail, cumulativeWidth);
        return isNextPage;
    };
    /* eslint-enable */
    /**
     * @param {IGanttStyle} ganttStyle .
     * @returns {PdfFont}
     * Customizes the font based on the Gantt style.
     */
    PdfGanttTaskbarCollection.prototype.getPdfFont = function (ganttStyle) {
        var font;
        if (ganttStyle && ganttStyle.label && (ganttStyle.label.fontSize || ganttStyle.label.fontStyle ||
            ganttStyle.label.fontFamily)) {
            var fontSize = ganttStyle.label.fontSize ? ganttStyle.label.fontSize : 9;
            var fontFamilyValue = ganttStyle.label.fontFamily;
            var fontFamily = ganttStyle.label.fontFamily ?
                fontFamilyValue : this.fontFamily;
            var fontStyleValue = ganttStyle.label.fontStyle;
            var fontStyle = ganttStyle.label.fontStyle ?
                this.parent.pdfExportModule.helper['getFontStyle'](fontStyleValue) : PdfFontStyle.Regular;
            font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
        }
        return font;
    };
    /* eslint-enable */
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @returns {void}
     * Draw task right side label
     */
    PdfGanttTaskbarCollection.prototype.drawRightLabel = function (page, startPoint, detail, cumulativeWidth) {
        var left;
        var graphics = page.graphics;
        if (!isNullOrUndefined(this.rightTaskLabel.value)) {
            if (this.rightTaskLabel.isLeftCalculated) {
                left = this.rightTaskLabel.left;
            }
            else {
                if (this.isAutoFit()) {
                    left = (this.rightTaskLabel.left);
                }
                else {
                    left = pixelToPoint(this.rightTaskLabel.left);
                }
            }
            var actualLeft = void 0;
            if (this.isAutoFit()) {
                actualLeft = left - (cumulativeWidth) + startPoint.x;
            }
            else {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            }
            var leftForLabel = this.isAutoFit() ? pixelToPoint(left) : left;
            if (detail.startPoint <= leftForLabel && leftForLabel < detail.endPoint &&
                !isNullOrUndefined(this.rightTaskLabel.value) && !this.rightTaskLabel.isCompleted) {
                var result = this.getWidth(this.rightTaskLabel.value, detail.endPoint - leftForLabel, 15);
                var font = new PdfStandardFont(this.fontFamily, 9);
                var customizedFont = void 0;
                var ganttStyle = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle;
                if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.label) && (!isNullOrUndefined(ganttStyle.label.fontSize)
                    || !isNullOrUndefined(ganttStyle.label.fontStyle) ||
                    !isNullOrUndefined(ganttStyle.label.fontFamily))) {
                    customizedFont = this.getPdfFont(ganttStyle);
                }
                if (!isNullOrUndefined(customizedFont)) {
                    font = customizedFont;
                }
                var padding = { left: 0, right: 0, top: 0, bottom: 0 };
                if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.label) &&
                    !isNullOrUndefined(ganttStyle.label.padding)) {
                    padding = ganttStyle.label.padding;
                }
                if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
                    this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
                    font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
                }
                var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.actualSize.height) / 2;
                var point = new PointF(actualLeft + padding.left, startPoint.y + adjustHeight + padding.top);
                var size = new SizeF((page['contentWidth'] - actualLeft) - (padding.left + padding.right), result.actualSize.height - (padding.top + padding.bottom));
                var labelBounds = new RectangleF(point, size);
                var labelFormat = new PdfStringFormat();
                labelFormat.alignment = PdfTextAlignment.Left;
                labelFormat.lineAlignment = PdfVerticalAlignment.Middle;
                if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.label) && !isNullOrUndefined(ganttStyle.label.format) &&
                    !isNullOrUndefined(ganttStyle.label.format.alignment)) {
                    labelFormat.alignment = ganttStyle.label.format.alignment;
                }
                if (result.actualSize.width > 0) {
                    var fontColor = null;
                    var ganttStyle_1 = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle;
                    var fontBrush = new PdfSolidBrush((ganttStyle_1 && ganttStyle_1.label && ganttStyle_1.label.fontBrush) ?
                        ganttStyle_1.label.fontBrush : this.labelColor);
                    /* eslint-disable-next-line */
                    var labelBrush = null;
                    if (!isNullOrUndefined(ganttStyle_1) && !isNullOrUndefined(ganttStyle_1.label) &&
                        !isNullOrUndefined(ganttStyle_1.label.backgroundColor)) {
                        labelBrush = new PdfSolidBrush(ganttStyle_1.label.backgroundColor);
                    }
                    var lablePen = null;
                    if (!isNullOrUndefined(ganttStyle_1) && !isNullOrUndefined(ganttStyle_1.label) &&
                        !isNullOrUndefined(ganttStyle_1.label.borderColor)) {
                        lablePen = new PdfPen(ganttStyle_1.label.borderColor);
                    }
                    var strSize = font.measureString(result.lines[0].text);
                    graphics.drawRectangle(lablePen, labelBrush, labelBounds.x - 3, labelBounds.y, strSize.width + 6, strSize.height);
                    graphics.drawString(result.lines[0].text, font, fontColor, fontBrush, labelBounds.x, labelBounds.y, size.width, size.height, labelFormat);
                    if (result.remainder !== null) {
                        this.rightTaskLabel.value = result.remainder;
                        this.rightTaskLabel.left = detail.endPoint;
                        this.rightTaskLabel.isLeftCalculated = true;
                    }
                    else {
                        this.rightTaskLabel.isCompleted = true;
                    }
                }
                else {
                    this.rightTaskLabel.left = detail.endPoint;
                }
            }
        }
        else {
            if (!isNullOrUndefined(this.labelSettings.rightLabel.image)) {
                this.previousWidthofRightImage = 0;
                this.previousWidthofRightValue = 0;
                for (var i = 0; i < this.labelSettings.rightLabel.image.length; i++) {
                    this.drawRigthlabelImage(page, startPoint, detail, cumulativeWidth, this.labelSettings.rightLabel.image[i]);
                    if (this.labelSettings.rightLabel.value) {
                        var value = this.labelSettings.rightLabel.value.split(',');
                        if (value) {
                            this.rightTaskLabel.isCompleted = false;
                            this.drawRightLabelValue(page, startPoint, detail, cumulativeWidth - this.spaceBetweenImageAndValue, value[i]);
                        }
                    }
                }
            }
            else if (this.labelSettings.rightLabel.value) {
                this.drawRightLabelValue(page, startPoint, detail, cumulativeWidth, this.labelSettings.rightLabel.value);
            }
        }
    };
    PdfGanttTaskbarCollection.prototype.drawRigthlabelImage = function (page, startPoint, detail, cumulativeWidth, rightImage) {
        var left;
        var graphics = page.graphics;
        var labelBounds;
        if (!isNullOrUndefined(this.labelSettings.rightLabel) && !isNullOrUndefined(this.labelSettings.rightLabel.image)) {
            if (this.labelSettings.isLeftCalculated) {
                left = this.rightTaskLabel.left;
            }
            else {
                if (this.isAutoFit()) {
                    if (this.labelSettings.rightLabel.image.length > 1) {
                        left = this.rightTaskLabel.left + +this.previousWidthofRightValue;
                        this.previousWidthofRightImage = rightImage.width;
                    }
                    else {
                        left = (this.rightTaskLabel.left);
                    }
                }
                else {
                    var value = void 0;
                    if (!isNullOrUndefined(this.labelSettings.rightLabel.value)) {
                        value = this.labelSettings.rightLabel.value.split(',');
                    }
                    if (this.labelSettings.rightLabel.image.length > 1 && value.length > 1) {
                        left = pixelToPoint(this.rightTaskLabel.left) + this.previousWidthofRightValue;
                        this.previousWidthofRightImage = rightImage.width;
                    }
                    else if (this.labelSettings.rightLabel.image.length > 1) {
                        left = pixelToPoint(this.rightTaskLabel.left) + this.previousWidthofRightImage;
                        this.previousWidthofRightImage = rightImage.width;
                    }
                    else {
                        left = pixelToPoint(this.rightTaskLabel.left);
                    }
                }
            }
            var actualLeft = void 0;
            if (this.isAutoFit()) {
                actualLeft = left - (cumulativeWidth) + startPoint.x;
            }
            else {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            }
            var leftForLabel = this.isAutoFit() ? pixelToPoint(left) : left;
            if (detail.startPoint <= leftForLabel && leftForLabel < detail.endPoint &&
                !isNullOrUndefined(this.labelSettings.rightLabel) && !this.rightTaskLabel.isCompleted) {
                var result = new SizeF(rightImage.width, rightImage.height);
                var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.height) / 2;
                var point = new PointF(actualLeft, startPoint.y + adjustHeight);
                var size = new SizeF(result.width, result.height);
                labelBounds = new RectangleF(point, size);
                var image = new PdfBitmap(rightImage.base64);
                if (result.width > 0) {
                    graphics.drawImage(image, labelBounds.x, labelBounds.y, result.width, result.height);
                    if (this.labelSettings.rightLabel.value !== null) {
                        this.rightTaskLabel.isLeftCalculated = true;
                    }
                    else {
                        if (isNullOrUndefined(this.labelSettings.rightLabel.value)) {
                            this.rightTaskLabel.isCompleted = true;
                        }
                    }
                }
                else {
                    this.rightTaskLabel.left = detail.endPoint;
                }
            }
        }
    };
    PdfGanttTaskbarCollection.prototype.drawRightLabelValue = function (page, startPoint, detail, cumulativeWidth, rightString) {
        var left;
        var graphics = page.graphics;
        if (!isNullOrUndefined(this.labelSettings.rightLabel.value)) {
            if (this.labelSettings.isLeftCalculated) {
                left = this.rightTaskLabel.left;
            }
            else {
                if (this.isAutoFit()) {
                    if (this.labelSettings.rightLabel.image) {
                        if (this.labelSettings.rightLabel.image.length > 1) {
                            left = this.rightTaskLabel.left + this.previousWidthofRightImage + this.previousWidthofRightValue;
                            if (!isNullOrUndefined(rightString)) {
                                var result = this.getWidthofrightLabel(rightString, detail.endPoint - left, 15);
                                this.previousWidthofRightValue += result.actualSize.width + this.previousWidthofRightImage;
                            }
                        }
                        else {
                            left = this.rightTaskLabel.left + this.labelSettings.rightLabel.image[0].width;
                        }
                    }
                    else {
                        left = (this.rightTaskLabel.left);
                    }
                }
                else {
                    if (this.labelSettings.rightLabel.image) {
                        if (this.labelSettings.rightLabel.image.length > 1) {
                            left = pixelToPoint(this.rightTaskLabel.left) + this.previousWidthofRightImage + this.previousWidthofRightValue;
                            if (!isNullOrUndefined(rightString)) {
                                var result = this.getWidthofrightLabel(rightString, detail.endPoint - left, 15);
                                this.previousWidthofRightValue += result.actualSize.width + this.previousWidthofRightImage;
                            }
                        }
                        else {
                            left = pixelToPoint(this.rightTaskLabel.left) + this.labelSettings.rightLabel.image[0].width;
                        }
                    }
                    else {
                        left = pixelToPoint(this.rightTaskLabel.left);
                    }
                }
            }
            var actualLeft = void 0;
            if (this.isAutoFit()) {
                actualLeft = left - (cumulativeWidth) + startPoint.x;
            }
            else {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            }
            var leftForLabel = this.isAutoFit() ? pixelToPoint(left) : left;
            if (detail.startPoint <= leftForLabel && leftForLabel < detail.endPoint &&
                !isNullOrUndefined(rightString) && !this.rightTaskLabel.isCompleted) {
                var result = this.getWidthofrightLabel(rightString, detail.endPoint - leftForLabel, 15);
                var font = new PdfStandardFont(this.fontFamily, 9);
                if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
                    this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
                    font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
                }
                var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.actualSize.height) / 2;
                var point = new PointF(actualLeft, startPoint.y + adjustHeight);
                var size = new SizeF(result.actualSize.width, result.actualSize.height);
                var labelBound = new RectangleF(point, size);
                var labelFormat = new PdfStringFormat();
                labelFormat.alignment = PdfTextAlignment.Right;
                labelFormat.lineAlignment = PdfVerticalAlignment.Middle;
                if (result.actualSize.width > 0) {
                    var fontColor = null;
                    var fontBrush = new PdfSolidBrush(this.labelColor);
                    var newFont = (this.labelSettings.rightLabel.fontStyle.fontSize) ? new PdfStandardFont(this.labelSettings.rightLabel.fontStyle.fontFamily, this.labelSettings.rightLabel.fontStyle.fontSize, this.labelSettings.rightLabel.fontStyle.fontStyle) : font;
                    var newFontBrush = this.labelSettings.rightLabel.fontStyle.fontColor ? new PdfSolidBrush(this.labelSettings.rightLabel.fontStyle.fontColor) : fontBrush;
                    /* eslint-disable-next-line */
                    graphics.drawString(rightString, newFont, fontColor, newFontBrush, labelBound.x, labelBound.y, result.actualSize.width, result.actualSize.height, labelFormat);
                    if (!isNullOrUndefined(result.remainder) && result.remainder !== null) {
                        this.rightTaskLabel.value = result.remainder;
                        this.rightTaskLabel.left = detail.endPoint;
                        this.rightTaskLabel.isLeftCalculated = true;
                    }
                    else {
                        if (isNullOrUndefined(this.labelSettings.rightLabel.value)) {
                            this.rightTaskLabel.isCompleted = true;
                        }
                    }
                }
                else {
                    this.rightTaskLabel.left = detail.endPoint;
                }
            }
        }
    };
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @param {PdfGanttTaskbarCollection} taskbar .
     * @returns {void}
     * Draw task left task label
     */
    PdfGanttTaskbarCollection.prototype.drawLeftLabel = function (page, startPoint, detail, cumulativeWidth, taskbar) {
        var graphics = page.graphics;
        var left;
        if (!isNullOrUndefined(this.leftTaskLabel.value)) {
            var labelLeft = 0;
            labelLeft = this.left;
            if (!this.leftTaskLabel.isLeftCalculated) {
                var result = this.getWidth(this.leftTaskLabel.value, Number.MAX_VALUE, 15);
                var reduceLeft = this.isMilestone ? Math.floor(this.parent.chartRowsModule.taskBarHeight / 2) + 33 : 33; // 33 indicates default timeline cell width
                if (this.isAutoFit()) {
                    left = (labelLeft - reduceLeft) - result.actualSize.width;
                }
                else {
                    left = pixelToPoint(labelLeft - reduceLeft) - result.actualSize.width;
                }
                this.leftTaskLabel.left = left;
                this.leftTaskLabel.isLeftCalculated = true;
            }
            else {
                left = this.leftTaskLabel.left;
            }
            var actualLeft = void 0;
            if (this.isAutoFit()) {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
                if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                    var leftValue = taskbar.left - taskbar.autoLeft;
                    if (taskbar.left < taskbar.autoLeft) {
                        actualLeft = left - cumulativeWidth + startPoint.x;
                    }
                    else {
                        actualLeft = left - cumulativeWidth + startPoint.x - leftValue;
                    }
                }
            }
            else {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
                if (!taskbar.isAutoSchedule && taskbar.isParentTask) {
                    var leftValue = pixelToPoint(taskbar.left) - pixelToPoint(taskbar.autoLeft);
                    if (taskbar.left < taskbar.autoLeft) {
                        actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
                    }
                    else {
                        actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x - leftValue;
                    }
                }
            }
            if (detail.startPoint <= left && left < detail.endPoint && !isNullOrUndefined(this.leftTaskLabel.value)
                && !this.leftTaskLabel.isCompleted) {
                var result = this.getWidth(this.leftTaskLabel.value, detail.endPoint - left, 15);
                var font = new PdfStandardFont(this.fontFamily, 9);
                var customizedFont = void 0;
                var ganttStyle = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle;
                if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.label) && (!isNullOrUndefined(ganttStyle.label.fontSize)
                    || !isNullOrUndefined(ganttStyle.label.fontStyle) ||
                    !isNullOrUndefined(ganttStyle.label.fontFamily))) {
                    customizedFont = this.getPdfFont(ganttStyle);
                }
                if (!isNullOrUndefined(customizedFont)) {
                    font = customizedFont;
                }
                if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
                    this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
                    font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
                }
                var padding = { left: 0, right: 0, top: 0, bottom: 0 };
                if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.label) &&
                    !isNullOrUndefined(ganttStyle.label.padding)) {
                    padding = ganttStyle.label.padding;
                }
                var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.actualSize.height) / 2;
                var rightLabelpoint = new PointF(actualLeft + padding.left, startPoint.y + adjustHeight + padding.top);
                var rightLabelSize = new SizeF(result.actualSize.width - (padding.left + padding.right), result.actualSize.height - (padding.top + padding.bottom));
                var rightLabelBounds = new RectangleF(rightLabelpoint, rightLabelSize);
                var rightLabelFormat = new PdfStringFormat();
                rightLabelFormat.alignment = PdfTextAlignment.Right;
                rightLabelFormat.lineAlignment = PdfVerticalAlignment.Middle;
                if (result.actualSize.width > 0) {
                    var fontColor = null;
                    /* eslint-disable-next-line */
                    var fontBrush = new PdfSolidBrush((ganttStyle && ganttStyle.label && ganttStyle.label.fontBrush) ?
                        ganttStyle.label.fontBrush : this.labelColor);
                    /* eslint-disable-next-line */
                    var labelBrush = null;
                    if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.label) &&
                        !isNullOrUndefined(ganttStyle.label.backgroundColor)) {
                        labelBrush = new PdfSolidBrush(ganttStyle.label.backgroundColor);
                    }
                    var lablePen = null;
                    if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.label) &&
                        !isNullOrUndefined(ganttStyle.label.borderColor)) {
                        lablePen = new PdfPen(ganttStyle.label.borderColor);
                    }
                    var strSize = font.measureString(result.lines[0].text);
                    graphics.drawRectangle(lablePen, labelBrush, rightLabelBounds.x - 3, rightLabelBounds.y, strSize.width + 6, strSize.height);
                    graphics.drawString(result.lines[0].text, font, fontColor, fontBrush, rightLabelBounds.x, rightLabelBounds.y, result.actualSize.width, result.actualSize.height, rightLabelFormat);
                    if (result.remainder !== null) {
                        this.leftTaskLabel.value = result.remainder;
                        this.leftTaskLabel.left = detail.endPoint;
                    }
                    else {
                        this.leftTaskLabel.isCompleted = true;
                    }
                }
                else {
                    this.leftTaskLabel.left = detail.endPoint;
                }
            }
        }
        else {
            if (!isNullOrUndefined(this.labelSettings.leftLabel) && !isNullOrUndefined(this.labelSettings.leftLabel.image)) {
                this.previousWidthofLeftImage = 0;
                this.previousWidthofLeftValue = 0;
                this.totalLeftWidth = 0;
                for (var i = 0; i < this.labelSettings.leftLabel.image.length; i++) {
                    var value = void 0;
                    var result = void 0;
                    if (!isNullOrUndefined(this.labelSettings.leftLabel.value)) {
                        value = this.labelSettings.leftLabel.value.split(',');
                        result = this.getWidth(value[i], Number.MAX_VALUE, 15);
                    }
                    var totalstringWidth = !isNullOrUndefined(result) ? result.actualSize.width : 0;
                    this.totalLeftWidth += this.labelSettings.leftLabel.image[i].width + totalstringWidth;
                }
                for (var i = 0; i < this.labelSettings.leftLabel.image.length; i++) {
                    this.drawLeftLabelImage(page, startPoint, detail, cumulativeWidth, this.labelSettings.leftLabel.image[i]);
                    if (this.labelSettings.leftLabel.value) {
                        var value = this.labelSettings.leftLabel.value.split(',');
                        if (value) {
                            this.drawLeftLabelValue(page, startPoint, detail, cumulativeWidth - this.spaceBetweenImageAndValue, value[i]);
                        }
                    }
                }
            }
            else if (!isNullOrUndefined(this.labelSettings.leftLabel) && !isNullOrUndefined(this.labelSettings.leftLabel.value)) {
                this.drawLeftLabelValue(page, startPoint, detail, cumulativeWidth, this.labelSettings.leftLabel.value);
            }
        }
    };
    PdfGanttTaskbarCollection.prototype.drawLeftLabelImage = function (page, startPoint, detail, cumulativeWidth, leftLabelImage) {
        var graphics = page.graphics;
        var left;
        var labelLeft = 0;
        labelLeft = this.left;
        if (!isNullOrUndefined(this.labelSettings.leftLabel) && !isNullOrUndefined(this.labelSettings.leftLabel.image)) {
            if (!this.leftTaskLabel.isLeftCalculated) {
                var result = new SizeF(leftLabelImage.width, leftLabelImage.height);
                var reduceLeft = this.isMilestone ? Math.floor(this.parent.chartRowsModule.taskBarHeight / 2) + 33 : 33; // 33 indicates default timeline cell width
                var value = this.labelSettings.leftLabel.value.split(',');
                if (this.isAutoFit()) {
                    if (this.labelSettings.leftLabel.image.length > 0 && value.length > 0) {
                        left = labelLeft - this.totalLeftWidth - result.width;
                        this.previousWidthofLeftImage += result.width;
                    }
                    else {
                        left = (labelLeft - reduceLeft) - result.width;
                    }
                }
                else {
                    if (this.labelSettings.leftLabel.image.length > 0 && value.length > 0) {
                        left = pixelToPoint(labelLeft) - this.totalLeftWidth - result.width;
                        this.previousWidthofLeftImage += result.width;
                    }
                    else {
                        left = pixelToPoint(labelLeft - reduceLeft) - result.width;
                    }
                }
                this.leftTaskLabel.left = left;
                this.leftTaskLabel.isLeftCalculated = true;
            }
            else {
                if (this.labelSettings.leftLabel.image.length > 1) {
                    left = this.leftTaskLabel.left + this.previousWidthofLeftValue;
                }
                else {
                    left = this.leftTaskLabel.left;
                }
            }
            var actualLeft = void 0;
            if (this.isAutoFit()) {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            }
            else {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            }
            if (detail.startPoint <= left && left < detail.endPoint && !isNullOrUndefined(leftLabelImage)
                && !this.leftTaskLabel.isCompleted) {
                var result = new SizeF(leftLabelImage.width, leftLabelImage.height);
                var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.height) / 2;
                var rightLabelpoint = new PointF(actualLeft, startPoint.y + adjustHeight);
                var rightLabelSize = new SizeF(result.width, result.height);
                var rightLabelBounds = new RectangleF(rightLabelpoint, rightLabelSize);
                var image = new PdfBitmap(leftLabelImage.base64);
                if (result.width > 0) {
                    graphics.drawImage(image, rightLabelBounds.x, rightLabelBounds.y, result.width, result.height);
                    this.totalLeftWidth = this.totalLeftWidth - result.width;
                }
                else {
                    this.leftTaskLabel.left = detail.endPoint;
                }
            }
        }
    };
    PdfGanttTaskbarCollection.prototype.drawLeftLabelValue = function (page, startPoint, detail, cumulativeWidth, leftLabelValue) {
        var graphics = page.graphics;
        var left;
        if (!isNullOrUndefined(leftLabelValue)) {
            var labelLeft = 0;
            labelLeft = this.left;
            if (!this.leftTaskLabel.isLeftCalculated) {
                var result = this.getWidthofLeftLabel(leftLabelValue, Number.MAX_VALUE, 15);
                var reduceLeft = this.isMilestone ? Math.floor(this.parent.chartRowsModule.taskBarHeight / 2) + 33 : 33; // 33 indicates default timeline cell width
                var value = this.labelSettings.leftLabel.value.split(',');
                if (this.isAutoFit()) {
                    var isLeftImageExist = !isNullOrUndefined(this.labelSettings.leftLabel.image) ? true : false;
                    var imageLength = isLeftImageExist ? this.labelSettings.leftLabel.image.length : 0;
                    if (value.length === 1 && isLeftImageExist && imageLength === 1) {
                        left = this.leftTaskLabel.left + this.previousWidthofLeftImage;
                        this.labelSettings.left = left;
                        var result_5 = this.getWidthofLeftLabel(leftLabelValue, Number.MAX_VALUE, 15);
                        this.previousWidthofLeftValue += this.previousWidthofLeftImage + result_5.actualSize.width;
                    }
                    else if (value.length > 1 && isLeftImageExist && imageLength > 1) {
                        var totalWidth = (this.previousWidthofLeftValue !== 0) ? this.previousWidthofLeftValue
                            + this.previousWidthofLeftImage : this.previousWidthofLeftImage;
                        left = this.leftTaskLabel.left + totalWidth;
                        this.labelSettings.left = left;
                        var result_6 = this.getWidthofLeftLabel(leftLabelValue, Number.MAX_VALUE, 15);
                        this.previousWidthofLeftValue += this.previousWidthofLeftImage + result_6.actualSize.width;
                    }
                    else {
                        left = (labelLeft - reduceLeft) - result.actualSize.width;
                    }
                }
                else {
                    left = pixelToPoint(labelLeft - reduceLeft) - result.actualSize.width;
                }
                this.leftTaskLabel.left = left;
                this.leftTaskLabel.isLeftCalculated = true;
            }
            else {
                var value = this.labelSettings.leftLabel.value.split(',');
                if (value.length === 1) {
                    left = this.leftTaskLabel.left + (this.previousWidthofLeftImage ? this.previousWidthofLeftImage : 0);
                    this.labelSettings.left = left;
                    var result = this.getWidthofLeftLabel(leftLabelValue, Number.MAX_VALUE, 15);
                    this.previousWidthofLeftValue += this.previousWidthofLeftImage + result.actualSize.width;
                }
                else if (value.length > 1) {
                    var totalWidth = (this.previousWidthofLeftValue !== 0) ?
                        this.previousWidthofLeftValue + this.previousWidthofLeftImage
                        : this.previousWidthofLeftImage;
                    left = this.leftTaskLabel.left + totalWidth;
                    this.labelSettings.left = left;
                    var result = this.getWidthofLeftLabel(leftLabelValue, Number.MAX_VALUE, 15);
                    this.previousWidthofLeftValue += this.previousWidthofLeftImage + result.actualSize.width;
                }
                else {
                    left = this.leftTaskLabel.left;
                }
            }
            var actualLeft = void 0;
            if (this.isAutoFit()) {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            }
            else {
                actualLeft = left - pixelToPoint(cumulativeWidth) + startPoint.x;
            }
            var leftForLabel = this.isAutoFit() ? pixelToPoint(left) : left;
            if (detail.startPoint <= leftForLabel && leftForLabel < detail.endPoint && !isNullOrUndefined(leftLabelValue)
                && !this.leftTaskLabel.isCompleted) {
                var result = this.getWidthofLeftLabel(leftLabelValue, detail.endPoint - leftForLabel, 15);
                var font = new PdfStandardFont(this.fontFamily, 9);
                if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
                    this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
                    font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
                }
                var adjustHeight = (pixelToPoint(this.parent.rowHeight) - result.actualSize.height) / 2;
                var rightLabelpoint = new PointF(actualLeft, startPoint.y + adjustHeight);
                var rightLabelSize = new SizeF(result.actualSize.width, result.actualSize.height);
                var rightLabelBounds = new RectangleF(rightLabelpoint, rightLabelSize);
                var rightLabelFormat = new PdfStringFormat();
                rightLabelFormat.alignment = PdfTextAlignment.Right;
                rightLabelFormat.lineAlignment = PdfVerticalAlignment.Middle;
                if (result.actualSize.width > 0) {
                    var fontColor = null;
                    var fontBrush = new PdfSolidBrush(this.labelColor);
                    var newFont = (this.labelSettings.leftLabel.fontStyle.fontSize) ? new PdfStandardFont(this.labelSettings.leftLabel.fontStyle.fontFamily, this.labelSettings.leftLabel.fontStyle.fontSize, this.labelSettings.leftLabel.fontStyle.fontStyle) : font;
                    var newFontBrush = this.labelSettings.leftLabel.fontStyle.fontColor ?
                        new PdfSolidBrush(this.labelSettings.leftLabel.fontStyle.fontColor) : fontBrush;
                    graphics.drawString(leftLabelValue, newFont, fontColor, newFontBrush, rightLabelBounds.x, rightLabelBounds.y, result.actualSize.width, result.actualSize.height, rightLabelFormat);
                    var value = this.labelSettings.leftLabel.value.split(',');
                    if ((!isNullOrUndefined(result.remainder)) && result.remainder !== null) {
                        this.leftTaskLabel.value = result.remainder;
                        this.leftTaskLabel.left = detail.endPoint;
                    }
                    else if (!isNullOrUndefined(this.labelSettings.leftLabel.image) &&
                        this.labelSettings.leftLabel.image.length === 1 && value.length === 1) {
                        this.leftTaskLabel.isCompleted = true;
                    }
                }
                else {
                    this.leftTaskLabel.left = detail.endPoint;
                }
            }
        }
    };
    PdfGanttTaskbarCollection.prototype.getWidth = function (value, width, height) {
        var font;
        font = new PdfStandardFont(this.fontFamily, 9);
        var ganttStyle = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle;
        if (ganttStyle && ganttStyle.label && ganttStyle.label.fontSize) {
            font = new PdfStandardFont(this.fontFamily, ganttStyle.label.fontSize);
            height = font.height;
        }
        if (!isNullOrUndefined(ganttStyle) && ganttStyle.font) {
            font = ganttStyle.font;
            height = font.height;
        }
        var layouter = new PdfStringLayouter();
        var progressFormat = new PdfStringFormat();
        progressFormat.alignment = PdfTextAlignment.Left;
        progressFormat.wordWrap = PdfWordWrapType.Character;
        progressFormat.lineAlignment = PdfVerticalAlignment.Middle;
        /* eslint-disable-next-line */
        var result = layouter.layout(value, font, progressFormat, new SizeF(width, height), false, new SizeF(width, height));
        return result;
    };
    PdfGanttTaskbarCollection.prototype.getWidthofLeftLabel = function (value, width, height) {
        var newFont = new PdfStandardFont(this.labelSettings.leftLabel.fontStyle.fontFamily, this.labelSettings.leftLabel.fontStyle.fontSize);
        var font;
        if (this.labelSettings.leftLabel.fontStyle.fontSize) {
            font = newFont;
        }
        else {
            font = new PdfStandardFont(this.fontFamily, 9);
        }
        if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
            this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
            font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
        }
        var layouter = new PdfStringLayouter();
        var progressFormat = new PdfStringFormat();
        progressFormat.alignment = PdfTextAlignment.Left;
        progressFormat.wordWrap = PdfWordWrapType.Character;
        progressFormat.lineAlignment = PdfVerticalAlignment.Middle;
        /* eslint-disable-next-line */
        var result = layouter.layout(value, font, progressFormat, new SizeF(width, height), false, new SizeF(width, height));
        return result;
    };
    PdfGanttTaskbarCollection.prototype.getWidthofrightLabel = function (value, width, height) {
        var newFont = new PdfStandardFont(this.labelSettings.rightLabel.fontStyle.fontFamily, this.labelSettings.rightLabel.fontStyle.fontSize);
        var font;
        if (this.labelSettings.rightLabel.fontStyle.fontSize) {
            font = newFont;
        }
        else {
            font = new PdfStandardFont(this.fontFamily, 9);
        }
        if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
            this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
            font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
        }
        var layouter = new PdfStringLayouter();
        var progressFormat = new PdfStringFormat();
        progressFormat.alignment = PdfTextAlignment.Left;
        progressFormat.wordWrap = PdfWordWrapType.Character;
        progressFormat.lineAlignment = PdfVerticalAlignment.Middle;
        /* eslint-disable-next-line */
        var result = layouter.layout(value, font, progressFormat, new SizeF(width, height), false, new SizeF(width, height));
        return result;
    };
    /**
     * @param {PdfGraphics} taskGraphics .
     * @param {PointF} startPoint .
     * @param {number} cumulativeWidth .
     * @param {number} adjustHeight .
     * @returns {void}
     * Draw Unscheduled Task
     */
    PdfGanttTaskbarCollection.prototype.drawUnscheduledTask = function (taskGraphics, startPoint, cumulativeWidth, adjustHeight) {
        var taskBrush = new PdfSolidBrush(this.taskColor);
        if (this.isAutoFit()) {
            taskGraphics.drawRectangle(taskBrush, startPoint.x + (this.left - cumulativeWidth), startPoint.y + adjustHeight, pixelToPoint(3), pixelToPoint(this.height));
        }
        else {
            taskGraphics.drawRectangle(taskBrush, startPoint.x + pixelToPoint(this.left - cumulativeWidth), startPoint.y + adjustHeight, pixelToPoint(3), pixelToPoint(this.height));
        }
    };
    /**
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @param {number} cumulativeWidth .
     * @param {PdfGanttTaskbarCollection} taskbar .
     * @param {boolean} isBaseline .
     * @returns {void}
    Draw milestone task
     */
    PdfGanttTaskbarCollection.prototype.drawMilestone = function (page, startPoint, detail, cumulativeWidth, taskbar, isBaseline) {
        if (detail.startDate <= this.startDate && this.startDate <= detail.endDate) {
            var taskGraphics = page.graphics;
            var pageIndex = page.section.indexOf(page);
            this.taskStartPoint = __assign({}, startPoint);
            var milestonePen = new PdfPen(this.milestoneColor);
            var adjustHeightforBaselineMilesone = pixelToPoint(((this.parent.rowHeight - this.height) / 3.0));
            var adjustHeightforMilesone = pixelToPoint(((this.parent.rowHeight - this.height) / 2.0));
            var adjustHeight = this.parent.renderBaseline ? adjustHeightforBaselineMilesone : adjustHeightforMilesone;
            var milestoneBrush = new PdfSolidBrush(this.milestoneColor);
            var baselinePen = new PdfPen(this.baselineBorderColor);
            var baselineBrush = new PdfSolidBrush(this.baselineColor);
            taskGraphics.save(); //saving graphics state
            var height = Math.floor(this.parent.chartRowsModule.taskBarHeight * 0.8);
            if (!isBaseline) {
                if (this.isAutoFit()) {
                    taskGraphics.translateTransform(startPoint.x + (this.left - cumulativeWidth), startPoint.y + adjustHeight - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2);
                }
                else {
                    taskGraphics.translateTransform(startPoint.x + pixelToPoint(this.left - cumulativeWidth), startPoint.y + adjustHeight - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2);
                }
            }
            if (isBaseline) {
                if (this.isAutoFit()) {
                    taskGraphics.translateTransform(startPoint.x + (taskbar.baselineLeft - cumulativeWidth), startPoint.y + adjustHeight - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2);
                }
                else {
                    taskGraphics.translateTransform(startPoint.x + pixelToPoint(taskbar.baselineLeft - cumulativeWidth), startPoint.y + adjustHeight - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2);
                }
            }
            taskGraphics.rotateTransform(45); //apply rotation
            if (this.parent.renderBaseline && this.baselineStartDate && this.baselineEndDate && isBaseline) {
                taskGraphics.drawRectangle(baselinePen, baselineBrush, 2, 2, pixelToPoint(height), pixelToPoint(height));
            }
            if (!isBaseline) {
                taskGraphics.drawRectangle(milestonePen, milestoneBrush, 0, 0, pixelToPoint(height), pixelToPoint(height));
            }
            taskGraphics.restore(); //restoring graphics state
            if (this.isAutoFit()) {
                if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                    var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                    var x = startPoint.x + (this.left - cumulativeWidth) - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2 +
                        ((this.parent.chartRowsModule.taskBarHeight * 0.7) - taskbar.taskbarTemplate.image[0].height) / 1.0;
                    var width = taskbar.taskbarTemplate.image[0].width / 2.0;
                    var height_1 = taskbar.taskbarTemplate.image[0].height / 2.0;
                    taskGraphics.drawImage(image, x, startPoint.y + adjustHeight - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2 +
                        (((this.parent.chartRowsModule.taskBarHeight * 0.7) - taskbar.taskbarTemplate.image[0].height) / 0.5), width, height_1);
                }
            }
            else {
                if (!isNullOrUndefined(taskbar.taskbarTemplate.image)) {
                    var image = new PdfBitmap(taskbar.taskbarTemplate.image[0].base64);
                    var x = startPoint.x + pixelToPoint(this.left - cumulativeWidth) - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2 +
                        pixelToPoint((this.parent.chartRowsModule.taskBarHeight * 0.7) - taskbar.taskbarTemplate.image[0].height) / 1.0;
                    taskGraphics.drawImage(image, x, startPoint.y + adjustHeight - (this.parent.chartRowsModule.taskBarHeight * 0.7) / 2 +
                        pixelToPoint(((this.parent.chartRowsModule.taskBarHeight * 0.7) - taskbar.taskbarTemplate.image[0].height) / 0.5), pixelToPoint(taskbar.taskbarTemplate.image[0].width), pixelToPoint(taskbar.taskbarTemplate.image[0].height - 2));
                }
            }
            this.endPage = this.startPage = pageIndex;
        }
    };
    return PdfGanttTaskbarCollection;
}());
export { PdfGanttTaskbarCollection };
