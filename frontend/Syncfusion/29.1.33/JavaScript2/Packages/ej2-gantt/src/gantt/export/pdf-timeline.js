import { PointF, PdfColor, PdfPen, PdfSolidBrush, PdfStandardFont, PdfStringFormat, PdfVerticalAlignment, PdfTextAlignment, PdfWordWrapType, RectangleF, PdfFontStyle } from '@syncfusion/ej2-pdf-export';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
import { pixelToPoint, pointToPixel } from '../base/utils';
/**
 */
var PdfTimeline = /** @class */ (function () {
    function PdfTimeline(gantt) {
        this.holidayCompleted = false;
        this.fitHolidayCompleted = false;
        this.timelineWidth = 0;
        this.lastWidth = 0;
        this.topTierValueLeftPadding = 8;
        this.width = 0;
        this.gantt = gantt;
        this.parent = gantt.parent;
        this.topTierPoint = new PointF();
        this.bottomTierPoint = new PointF();
        this.topTierIndex = 0;
        this.bottomTierIndex = 0;
        this.prevTopTierIndex = 0;
        this.prevBottomTierIndex = 0;
    }
    /**
     * @private
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails} detail .
     * @returns {void}
     */
    PdfTimeline.prototype.drawTimeline = function (page, startPoint, detail) {
        this.detailsTimeline = detail;
        var remainWidth = (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ?
            pointToPixel(Math.floor(detail.totalWidth)) : Math.round(detail.totalWidth);
        var renderWidth = 0;
        this.topTierPoint.x = startPoint.x;
        this.topTierPoint.y = startPoint.y;
        this.prevTopTierIndex = this.topTierIndex;
        this.prevBottomTierIndex = this.bottomTierIndex;
        while (remainWidth > 0) {
            var pHeader = this.topTier[this.topTierIndex];
            if (this.topTier.length > this.topTierIndex) {
                var isCompleted = false;
                if (!this.topTier[this.topTierIndex].isFinished) {
                    if (remainWidth >= pHeader.width) {
                        renderWidth = pHeader.width;
                        pHeader.isFinished = true;
                        pHeader.completedWidth = renderWidth;
                        isCompleted = true;
                    }
                    else {
                        renderWidth = remainWidth;
                        isCompleted = false;
                        pHeader.isFinished = false;
                        pHeader.width = pHeader.width - remainWidth;
                        pHeader.completedWidth = renderWidth;
                    }
                }
                //Primary header Event Arguments
                var reWidth = (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ? renderWidth : pixelToPoint(renderWidth);
                /* eslint-disable-next-line */
                this.triggerQueryTimelinecell(page, this.topTierPoint.x, this.topTierPoint.y, this.topTierHeight, reWidth, pHeader.value, true, this.parent.timelineModule.isSingleTier &&
                    this.parent.timelineSettings.topTier.unit === 'Day' ? pHeader.startDate : null);
                this.topTierPoint.x += reWidth;
                remainWidth -= renderWidth;
                if (isCompleted) {
                    this.topTierIndex++;
                }
            }
            else {
                remainWidth = 0;
            }
        }
        remainWidth = Math.round(detail.totalWidth);
        var height = this.parent.timelineModule.isSingleTier ? 0 : this.topTierHeight;
        this.bottomTierPoint = new PointF(startPoint.x, pixelToPoint(startPoint.y + height));
        while (remainWidth > 0) {
            var secondHeader = this.bottomTier[this.bottomTierIndex];
            if (this.bottomTier.length > this.bottomTierIndex) {
                var isCompleted = true;
                var width = secondHeader.width;
                if (remainWidth < width) {
                    width = remainWidth;
                    /* eslint-disable-next-line */
                    isCompleted = false;
                    secondHeader.completedWidth = width;
                }
                //Secondary header Event Arguments
                this.triggerQueryTimelinecell(page, this.bottomTierPoint.x, this.bottomTierPoint.y, this.bottomTierHeight, (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ? width : pixelToPoint(width), secondHeader.value, false, secondHeader.startDate);
                this.bottomTierPoint.x = (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ?
                    this.bottomTierPoint.x + width : this.bottomTierPoint.x + pixelToPoint(width);
                remainWidth -= width;
                secondHeader.completedWidth = width;
                // if (isCompleted) {
                this.bottomTierIndex++;
                // }
                if (remainWidth > 0 && remainWidth < width) {
                    remainWidth = secondHeader.width - 1;
                }
            }
            else {
                remainWidth = 0;
            }
        }
        this.timelineWidth = this.lastWidth;
    };
    /**
     *
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {TimelineDetails}  detail .
     * @returns {void} .
     * Draw the specific gantt chart side header when the taskbar exceeds the page
     * @private
     */
    /* eslint-disable-next-line */
    PdfTimeline.prototype.drawPageTimeline = function (page, startPoint, detail) {
        this.topTierPoint = extend({}, {}, startPoint, true);
        for (var index = this.prevTopTierIndex; index <= this.topTierIndex; index++) {
            if (this.topTier.length > index) {
                var pHeader = this.topTier[index];
                if (pHeader.completedWidth > 0) {
                    //Primary header Event Arguments
                    /* eslint-disable-next-line */
                    this.triggerQueryTimelinecell(page, this.topTierPoint.x, this.topTierPoint.y, this.topTierHeight, (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ? pHeader.completedWidth : pixelToPoint(pHeader.completedWidth), pHeader.value, true, this.parent.timelineModule.isSingleTier &&
                        this.parent.timelineSettings.topTier.unit === 'Day' ? pHeader.startDate : null);
                    this.topTierPoint.x += (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ?
                        pHeader.completedWidth : pixelToPoint(pHeader.completedWidth);
                }
            }
        }
        this.bottomTierPoint.x = startPoint.x;
        this.bottomTierPoint.y = pixelToPoint(startPoint.y + this.topTierHeight);
        for (var index = this.prevBottomTierIndex; index <= this.bottomTierIndex; index++) {
            if (this.bottomTier.length > index) {
                var secondHeader = this.bottomTier[index];
                if (secondHeader.completedWidth > 0) {
                    //Secondary header Event Arguments
                    /* eslint-disable-next-line */
                    this.triggerQueryTimelinecell(page, this.bottomTierPoint.x, this.bottomTierPoint.y, this.bottomTierHeight, (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ? secondHeader.width : pixelToPoint(secondHeader.width), secondHeader.value, false, secondHeader.startDate);
                    this.bottomTierPoint.x = (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) ?
                        this.bottomTierPoint.x + secondHeader.width : this.bottomTierPoint.x + pixelToPoint(secondHeader.width);
                }
            }
        }
    };
    /**
     * Method to trigger pdf query timelinecell event
     */
    /* eslint-disable-next-line */
    PdfTimeline.prototype.triggerQueryTimelinecell = function (page, x, y, height, width, value, isTopTier, currentDate) {
        var _this = this;
        var days = new Date(currentDate).getDay();
        var graphics = page.graphics;
        var timelineStyle = {};
        var ganttStyle = this.gantt.ganttStyle;
        timelineStyle.borderColor = new PdfColor(ganttStyle.timeline.borderColor);
        timelineStyle.fontColor = new PdfColor(ganttStyle.timeline.fontColor);
        timelineStyle.fontSize = ganttStyle.timeline.fontSize;
        timelineStyle.fontStyle = ganttStyle.timeline.fontStyle;
        timelineStyle.backgroundColor = new PdfColor(ganttStyle.timeline.backgroundColor);
        if (ganttStyle.timeline.padding) {
            timelineStyle.padding = ganttStyle.timeline.padding;
        }
        var format = this.initializePdfStringFormat(ganttStyle, isTopTier);
        timelineStyle.format = format;
        var eventArgs = {
            timelineCell: timelineStyle,
            value: value
        };
        if (this.parent.pdfQueryTimelineCellInfo) {
            this.parent.trigger('pdfQueryTimelineCellInfo', eventArgs);
        }
        var e = eventArgs.timelineCell;
        var cellBackgroundColor = new PdfSolidBrush(eventArgs.timelineCell.backgroundColor);
        var nonWorkingDays = this.parent.nonWorkingDayIndex;
        var isHoliday = false;
        var holidayContainerColor = new PdfSolidBrush(ganttStyle.holiday.backgroundColor);
        if (this.parent.highlightWeekends && nonWorkingDays.indexOf(days) !== -1 && (this.parent.timelineModule.bottomTier === 'Day' || this.parent.timelineModule.bottomTier === 'None' && this.parent.timelineModule.topTier === 'Day')) {
            cellBackgroundColor = holidayContainerColor;
            isHoliday = true;
        }
        this.parent.holidays.map(function (item) {
            var fromDate = new Date(item.from);
            var toDate = new Date(item.to);
            var timelinedate = new Date(currentDate);
            if (fromDate <= timelinedate && toDate >= timelinedate && (_this.parent.timelineModule.bottomTier === 'Day' || (_this.parent.timelineModule.bottomTier === 'None' && _this.parent.timelineModule.topTier === 'Day'))) {
                cellBackgroundColor = holidayContainerColor;
                if (fromDate.getTime() === timelinedate.getTime()) {
                    _this.holidayWidth = x;
                }
                if (toDate.getTime() === timelinedate.getTime()) {
                    _this.holidayLabel = item.label;
                    var changeDate = new Date(item.to);
                    changeDate.setDate(changeDate.getDate() + 1);
                    var day = _this.parent.dataOperation.getTaskWidth(fromDate, changeDate);
                    _this.holidayNumberOfDays = pixelToPoint(day) / width;
                    _this.holidayCompleted = true;
                }
                isHoliday = true;
            }
            else if (_this.parent.timelineModule.bottomTier !== 'Day') {
                if (_this.detailsTimeline.startDate <= fromDate && _this.detailsTimeline.endDate >= fromDate) {
                    _this.parent.timelineModule.bottomTierCollection.map(function (items) {
                        if (items.startDate <= fromDate && items.endDate >= fromDate) {
                            if (items.startDate === currentDate) {
                                _this.fitHolidayCompleted = true;
                                _this.fromDataHoliday = item.from;
                                _this.holidayLabel = item.label;
                            }
                        }
                    });
                }
            }
        });
        var timelineborder = isHoliday && ganttStyle.holiday && ganttStyle.holiday.borders
            ? ganttStyle.holiday.borders.left
            : isHoliday && ganttStyle.holiday && ganttStyle.holiday.borderColor
                ? new PdfPen(ganttStyle.holiday.borderColor)
                : new PdfPen(eventArgs.timelineCell.borderColor);
        if (!this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
            this.lastWidth = x + width;
        }
        var adjustedWidth = isHoliday && (ganttStyle.holiday.borderColor || ganttStyle.holiday.borders) ? width - 2 : width;
        // rectangle for timeline header
        graphics.drawRectangle(timelineborder, cellBackgroundColor, x, y, adjustedWidth, pixelToPoint(height));
        var rectPen = (!isTopTier && (this.parent.gridLines === 'Both' || this.parent.gridLines === 'Vertical')) ?
            new PdfPen(ganttStyle.chartGridLineColor) : null;
        var gridLineColor = isHoliday && (ganttStyle.holiday.borderColor || ganttStyle.holiday.borders) ?
            timelineborder : rectPen;
        // rectangle for chart side timeline
        graphics.drawRectangle(gridLineColor, cellBackgroundColor, x, y + pixelToPoint(height), adjustedWidth, page.getClientSize().height);
        var font1 = new PdfStandardFont(ganttStyle.fontFamily, e.fontSize, e.fontStyle);
        if (ganttStyle.font) {
            font1 = ganttStyle.font;
        }
        var customizedFont = this.getPdfFont(ganttStyle);
        if (!isNullOrUndefined(customizedFont)) {
            font1 = customizedFont;
        }
        var fontColor = (ganttStyle.holiday && ganttStyle.holiday.fontColor) ?
            new PdfSolidBrush(ganttStyle.holiday.fontColor) : new PdfSolidBrush(new PdfColor(0, 0, 0));
        var fontBrush = (ganttStyle.holiday && ganttStyle.holiday.fontBrush) ?
            new PdfPen(new PdfColor(ganttStyle.holiday.fontBrush)) : null;
        var textFormat = new PdfStringFormat();
        textFormat = (ganttStyle.holiday && ganttStyle.holiday.format) ? ganttStyle.holiday.format : null;
        var padding = { left: 0, right: 0, top: 0, bottom: 0 };
        if (!isNullOrUndefined(ganttStyle) && !isNullOrUndefined(ganttStyle.holiday) &&
            !isNullOrUndefined(ganttStyle.holiday.padding)) {
            padding = ganttStyle.holiday.padding;
        }
        var strSize;
        if (!isNullOrUndefined(this.holidayLabel)) {
            strSize = font1.measureString(this.holidayLabel);
        }
        if (this.holidayCompleted) {
            var state_1 = graphics.save();
            var fontHieght = font1.height;
            var fontSize = font1.size;
            graphics.translateTransform(this.holidayWidth + width - ((fontSize / 2) * this.holidayNumberOfDays) -
                fontHieght + (fontHieght / 2) + (width * this.holidayNumberOfDays) / 2, 40);
            graphics.rotateTransform(-90);
            graphics.translateTransform(-(page.getClientSize().height / 2), -((this.holidayWidth + width + fontSize) / ((this.holidayWidth + width) / width)));
            graphics.drawString(this.holidayLabel, font1, fontBrush, fontColor, 5 - (padding.left + padding.right), 5 - (padding.top + padding.bottom), strSize.width + 10, strSize.height + 10, textFormat);
            graphics.restore(state_1);
            this.holidayCompleted = false;
        }
        if (this.fitHolidayCompleted) {
            var holidayBrush = holidayContainerColor;
            var fontSize = font1.size;
            graphics.drawRectangle(gridLineColor, holidayBrush, x + (width / 2) - fontSize, y +
                pixelToPoint(height), fontSize, page.getClientSize().height);
            var state_2 = graphics.save();
            graphics.translateTransform(x + width + (width / 2) - fontSize, 40);
            graphics.rotateTransform(-90);
            graphics.translateTransform(-(page.getClientSize().height / 2), -((this.holidayWidth + width + fontSize) / ((this.holidayWidth + width) / width)));
            graphics.drawString(this.holidayLabel, font1, fontBrush, fontColor, 5 - (padding.left + padding.right), 5 - (padding.top + padding.bottom), strSize.width + 10, strSize.height + 10, textFormat);
            graphics.restore(state_2);
            this.fitHolidayCompleted = false;
        }
        var font = new PdfStandardFont(ganttStyle.fontFamily, e.fontSize, e.fontStyle);
        if (ganttStyle.font) {
            font = ganttStyle.font;
        }
        var textBrush = new PdfSolidBrush(!isNullOrUndefined(ganttStyle.timeline.fontBrush)
            ? ganttStyle.timeline.fontBrush : eventArgs.timelineCell.fontColor);
        var pLeft = ganttStyle.timeline.padding ? eventArgs.timelineCell.padding.left : 0;
        var pTop = ganttStyle.timeline.padding ? eventArgs.timelineCell.padding.top : 0;
        /* eslint-disable-next-line */
        var state = graphics.save();
        graphics.setClip(new RectangleF(x, y, width, pixelToPoint(height)));
        if (isTopTier) {
            x = x + pLeft + this.topTierValueLeftPadding;
        }
        else {
            x = x + pLeft;
        }
        graphics.drawString(eventArgs.value, font, null, textBrush, x, y + pTop, pixelToPoint(width), pixelToPoint(height), e.format);
        graphics.restore(state);
    };
    /**
     * Initializes and returns a PdfStringFormat based on the provided Gantt style and tier level.
     *
     * @param {IGanttStyle} ganttStyle - The style settings for the Gantt chart which include the timeline format.
     * @param {boolean} isTopTier - A flag indicating whether the format is for the top tier of the timeline.
     * @returns {PdfStringFormat} The initialized PdfStringFormat with appropriate line alignment, text alignment,
     * and word wrap type, as determined by the ganttStyle and isTopTier flag.
     */
    PdfTimeline.prototype.initializePdfStringFormat = function (ganttStyle, isTopTier) {
        var format = new PdfStringFormat();
        if (isNullOrUndefined(ganttStyle.timeline.format)) {
            if (isTopTier) {
                format.lineAlignment = PdfVerticalAlignment.Middle;
                format.alignment = PdfTextAlignment.Left;
            }
            else {
                format.lineAlignment = PdfVerticalAlignment.Middle;
                format.alignment = PdfTextAlignment.Center;
                format.wordWrap = PdfWordWrapType.Character;
            }
        }
        else {
            format = ganttStyle.timeline.format;
        }
        return format;
    };
    PdfTimeline.prototype.getPdfFont = function (ganttStyle) {
        var font;
        if (ganttStyle && ganttStyle.holiday && (ganttStyle.holiday.fontSize || ganttStyle.holiday.fontStyle ||
            ganttStyle.holiday.fontFamily)) {
            var fontSize = ganttStyle.holiday.fontSize ? ganttStyle.holiday.fontSize : 9;
            var fontFamily = ganttStyle.holiday.fontFamily ?
                ganttStyle.holiday.fontFamily : this.fontFamily;
            var fontStyle = ganttStyle.holiday.fontStyle ?
                ganttStyle.holiday.fontStyle : PdfFontStyle.Regular;
            font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
        }
        return font;
    };
    return PdfTimeline;
}());
export { PdfTimeline };
