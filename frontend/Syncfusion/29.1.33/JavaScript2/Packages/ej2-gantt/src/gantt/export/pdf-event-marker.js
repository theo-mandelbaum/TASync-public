import { PointF, PdfColor, PdfPen, PdfSolidBrush, PdfStandardFont, PdfFontFamily, PdfStringFormat, PdfTextAlignment, PdfFontStyle } from '@syncfusion/ej2-pdf-export';
import { pixelToPoint } from '../base/utils';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { PdfBorders } from './../export/pdf-base/pdf-borders';
var EventMarker = /** @class */ (function () {
    function EventMarker(parent) {
        this.parent = parent;
    }
    EventMarker.prototype.drawEventMarker = function (page, startPoint, cumulativeWidth, detail, eventMarker, cumulativeHeight, ganttStyles) {
        var taskGraphics = page.graphics;
        var pageSize = page.getClientSize();
        var font = new PdfStandardFont(PdfFontFamily.Helvetica, 10);
        if (!isNullOrUndefined(this.parent.pdfExportModule['helper']['exportProps'].ganttStyle) &&
            this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font) {
            font = this.parent.pdfExportModule['helper']['exportProps'].ganttStyle.font;
        }
        /* eslint-disable-next-line */
        var strSize;
        if (!isNullOrUndefined(eventMarker.label)) {
            strSize = font.measureString(eventMarker.label);
        }
        var triangle = 8;
        var eventLine = ganttStyles.eventMarker.lineStyle;
        eventLine.dashStyle = ganttStyles.eventMarker.lineStyle.dashStyle;
        if (detail.startDate <= eventMarker.date && eventMarker.date <= detail.endDate) {
            var enventFormat = new PdfStringFormat();
            enventFormat.alignment = PdfTextAlignment.Center;
            var textFormat = !isNullOrUndefined(ganttStyles.eventMarker.label.format) ?
                ganttStyles.eventMarker.label.format : enventFormat;
            var eventBrush = new PdfSolidBrush(ganttStyles.eventMarker.label.backgroundColor);
            var fontColor = (ganttStyles.eventMarker.label && ganttStyles.eventMarker.label.fontColor) ?
                new PdfSolidBrush(ganttStyles.eventMarker.label.fontColor) : null;
            var customizedFont = this.getPdfFont(ganttStyles);
            if (isNullOrUndefined(customizedFont)) {
                customizedFont = font;
            }
            var defaultBorder = ganttStyles.eventMarker.label.borders ? ganttStyles.eventMarker.label.borders : null;
            if (ganttStyles.eventMarker.label.borderColor) {
                var pdfborders = new PdfBorders();
                pdfborders.all = new PdfPen(new PdfColor(ganttStyles.eventMarker.label.borderColor));
                defaultBorder = pdfborders;
            }
            var border = (!isNullOrUndefined(defaultBorder) && !isNullOrUndefined(defaultBorder.left)) ? defaultBorder.left : null;
            var padding = { left: 0, right: 0, top: 0, bottom: 0 };
            if (!isNullOrUndefined(ganttStyles) && !isNullOrUndefined(ganttStyles.eventMarker) &&
                !isNullOrUndefined(ganttStyles.eventMarker.label) && !isNullOrUndefined(ganttStyles.eventMarker.label.padding)) {
                padding = ganttStyles.eventMarker.label.padding;
            }
            var customizedFontBrush = !isNullOrUndefined(ganttStyles.eventMarker.label.fontBrush) ?
                new PdfPen(ganttStyles.eventMarker.label.fontBrush) : null;
            var left = this.parent.dataOperation.getTaskLeft(this.parent.dateValidationModule.getDateFromFormat(eventMarker.date, true), false, true);
            var diff = 10;
            if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                taskGraphics.drawLine(eventLine, new PointF(startPoint.x + (left - cumulativeWidth) + diff, cumulativeHeight), new PointF(startPoint.x + (left - cumulativeWidth) + diff, pageSize.height));
                if (!isNullOrUndefined(eventMarker.label) && eventMarker.label.length > 0) {
                    taskGraphics.save();
                    taskGraphics.translateTransform(startPoint.x + (left - cumulativeWidth) + 7 + diff, cumulativeHeight + pixelToPoint(50) + strSize.height / 2);
                    taskGraphics.rotateTransform(45);
                    taskGraphics.drawRectangle(border, eventBrush, 0, 0, triangle, triangle);
                    taskGraphics.restore();
                    taskGraphics.drawRectangle(border, eventBrush, startPoint.x + (left - cumulativeWidth) + 7 + diff, cumulativeHeight + pixelToPoint(50), strSize.width + 10, strSize.height * 2);
                    taskGraphics.drawString(eventMarker.label, customizedFont, customizedFontBrush, fontColor, (startPoint.x +
                        (left - cumulativeWidth) + 12 + diff) - (padding.left + padding.right), (cumulativeHeight + pixelToPoint(50) + pixelToPoint(strSize.height / 2)) - (padding.top + padding.bottom), strSize.width, strSize.height, textFormat);
                }
            }
            else {
                taskGraphics.drawLine(eventLine, new PointF(startPoint.x + pixelToPoint(left - cumulativeWidth) + diff, cumulativeHeight), new PointF(startPoint.x + pixelToPoint(left - cumulativeWidth) + diff, pageSize.height));
                if (!isNullOrUndefined(eventMarker.label) && eventMarker.label.length > 0) {
                    taskGraphics.save();
                    taskGraphics.translateTransform(startPoint.x + pixelToPoint(left - cumulativeWidth) + 7 + diff, cumulativeHeight + pixelToPoint(50) + strSize.height / 2);
                    taskGraphics.rotateTransform(45);
                    taskGraphics.drawRectangle(border, eventBrush, 0, 0, triangle, triangle);
                    taskGraphics.restore();
                    taskGraphics.drawRectangle(border, eventBrush, startPoint.x + pixelToPoint(left - cumulativeWidth) + 7 + diff, cumulativeHeight + pixelToPoint(50), strSize.width + 10, strSize.height * 2);
                    taskGraphics.drawString(eventMarker.label, customizedFont, customizedFontBrush, fontColor, (startPoint.x + pixelToPoint(left - cumulativeWidth) + 12 + diff) - (padding.left + padding.right), (cumulativeHeight + pixelToPoint(50) + pixelToPoint(strSize.height / 2)) - (padding.top + padding.bottom), strSize.width, strSize.height, textFormat);
                }
            }
        }
    };
    EventMarker.prototype.getPdfFont = function (ganttStyle) {
        var font;
        if (ganttStyle && ganttStyle.eventMarker && ganttStyle.eventMarker.label &&
            (ganttStyle.eventMarker.label.fontSize || ganttStyle.eventMarker.label.fontStyle ||
                ganttStyle.eventMarker.label.fontFamily)) {
            var fontSize = ganttStyle.eventMarker.label.fontSize ? ganttStyle.eventMarker.label.fontSize : 9;
            var fontFamily = ganttStyle.eventMarker.label.fontFamily ?
                ganttStyle.eventMarker.label.fontFamily : this.fontFamily;
            var fontStyle = ganttStyle.eventMarker.label.fontStyle ?
                ganttStyle.eventMarker.label.fontStyle : PdfFontStyle.Regular;
            font = new PdfStandardFont(fontFamily, fontSize, fontStyle);
        }
        return font;
    };
    return EventMarker;
}());
export { EventMarker };
