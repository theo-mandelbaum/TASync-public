import { PointF, PdfPage, PdfPen, PdfSolidBrush, RectangleF, SizeF } from '@syncfusion/ej2-pdf-export';
import { pixelToPoint } from '../base/utils';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * @hidden
 */
var PdfGanttPredecessor = /** @class */ (function () {
    function PdfGanttPredecessor(parent, pdfGantt) {
        this.parent = parent;
        this.pdfGantt = pdfGantt;
    }
    /**
     * @returns {PdfGanttPredecessor} .
     * @hidden
     */
    PdfGanttPredecessor.prototype.add = function () {
        return new PdfGanttPredecessor(this.parent);
    };
    /**
     * Calculate the predecesor line point and draw the predecessor
     *
     * @param {PdfGantt} pdfGantt .
     * @returns {void}
     * @private
     */
    PdfGanttPredecessor.prototype.drawPredecessor = function (pdfGantt) {
        this.pdfGantt = pdfGantt;
        var pages = pdfGantt.result.page.section.getPages();
        var parentTask = pdfGantt.taskbarCollection[this.parentIndex];
        var childTask = pdfGantt.taskbarCollection[this.childIndex];
        var startPage = new PdfPage();
        var endPage = new PdfPage();
        var predecessorType = '';
        var parentPageData;
        var childPageData;
        var parentY = 0;
        var childY = 0;
        if (childTask && parentTask) {
            switch (this.type) {
                case 'FS':
                    if (childTask.startPage > -1 && parentTask.endPage > -1) {
                        startPage = pages[parentTask.endPage];
                        endPage = pages[childTask.startPage];
                        parentPageData = pdfGantt.pdfPageDetail[parentTask.endPage - pdfGantt.chartPageIndex];
                        childPageData = pdfGantt.pdfPageDetail[childTask.startPage - pdfGantt.chartPageIndex];
                        if (this.parentIndex < this.childIndex) {
                            if (this.parentLeft < this.childLeft && this.childLeft > (this.parentLeft + this.parentWidth + 25)) {
                                predecessorType = 'FSType1';
                            }
                            else {
                                predecessorType = 'FSType2';
                            }
                        }
                        else {
                            if (this.parentLeft < this.childLeft && this.childLeft > (this.parentLeft + this.parentWidth + 25)) {
                                predecessorType = 'FSType3';
                            }
                            else {
                                predecessorType = 'FSType4';
                            }
                        }
                    }
                    else {
                        return;
                    }
                    break;
                case 'SF':
                    if (childTask.endPage > -1 && parentTask.startPage > -1) {
                        startPage = pages[parentTask.startPage];
                        endPage = pages[childTask.endPage];
                        parentPageData = pdfGantt.pdfPageDetail[parentTask.endPage - pdfGantt.chartPageIndex];
                        childPageData = pdfGantt.pdfPageDetail[childTask.startPage - pdfGantt.chartPageIndex];
                        if (this.parentIndex < this.childIndex) {
                            if (this.parentLeft > this.childLeft + this.childWidth) {
                                predecessorType = 'SFType1';
                            }
                            else {
                                predecessorType = 'SFType2';
                            }
                        }
                        else {
                            if (this.parentLeft > this.childLeft + this.childWidth) {
                                predecessorType = 'SFType3';
                            }
                            else {
                                predecessorType = 'SFType4';
                            }
                        }
                    }
                    else {
                        return;
                    }
                    break;
                case 'FF':
                    if (childTask.endPage > -1 && parentTask.endPage > -1) {
                        startPage = pages[parentTask.endPage];
                        endPage = pages[childTask.endPage];
                        parentPageData = pdfGantt.pdfPageDetail[parentTask.endPage - pdfGantt.chartPageIndex];
                        childPageData = pdfGantt.pdfPageDetail[childTask.endPage - pdfGantt.chartPageIndex];
                        if (this.parentIndex < this.childIndex) {
                            if ((this.childLeft + this.childWidth) >= (this.parentLeft + this.parentWidth)) {
                                predecessorType = 'FFType1';
                            }
                            else {
                                predecessorType = 'FFType2';
                            }
                        }
                        else {
                            if ((this.childLeft + this.childWidth) >= (this.parentLeft + this.parentWidth)) {
                                predecessorType = 'FFType3';
                            }
                            else {
                                predecessorType = 'FFType4';
                            }
                        }
                    }
                    else {
                        return;
                    }
                    break;
                case 'SS':
                    if (childTask.startPage > -1 && parentTask.startPage > -1) {
                        startPage = pages[parentTask.startPage];
                        endPage = pages[childTask.startPage];
                        parentPageData = pdfGantt.pdfPageDetail[parentTask.startPage - pdfGantt.chartPageIndex];
                        childPageData = pdfGantt.pdfPageDetail[childTask.startPage - pdfGantt.chartPageIndex];
                        if (this.parentIndex < this.childIndex) {
                            if (this.parentLeft >= this.childLeft) {
                                predecessorType = 'SSType1';
                            }
                            else {
                                predecessorType = 'SSType2';
                            }
                        }
                        else {
                            if (this.parentLeft >= this.childLeft) {
                                predecessorType = 'SSType3';
                            }
                            else {
                                predecessorType = 'SSType4';
                            }
                        }
                    }
                    else {
                        return;
                    }
                    break;
            }
            var midPointManualparent = Math.round((this.parent.rowHeight - 15) / 2.0);
            var midPointforTaskbar = Math.round((this.parent.rowHeight - 1) / 2.0);
            var midPointforBaseline = Math.round((this.parent.rowHeight - 10) / 2.0);
            var midPoint = this.parent.renderBaseline ? midPointforBaseline :
                ((!parentTask.isAutoSchedule && parentTask.isParentTask) || (!childTask.isAutoSchedule && childTask.isParentTask)) ?
                    midPointManualparent : midPointforTaskbar;
            midPoint = pixelToPoint(midPoint);
            /* eslint-disable-next-line */
            var point1 = void 0, point2 = void 0, point3 = void 0, point4 = void 0, point5 = void 0, point6 = void 0;
            point1 = point2 = point3 = point4 = point5 = point6 = new PointF();
            var parentTaskpoint = {
                x: parentTask.taskStartPoint.x,
                y: parentTask.taskStartPoint.y
            };
            var childTaskpoint = {
                x: childTask.taskStartPoint.x,
                y: childTask.taskStartPoint.y
            };
            parentY = parentTaskpoint.y + parentPageData.startPoint.y;
            childY = childTaskpoint.y + childPageData.startPoint.y;
            var ffpoint1 = void 0;
            var sspoint1 = void 0;
            var ffpoint3 = void 0;
            var ffpoint4 = void 0;
            var sspoint4 = void 0;
            if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                ffpoint1 = new PointF((this.parentLeft + this.parentWidth), parentY + midPoint);
                sspoint1 = new PointF((this.parentLeft) - 1, parentY + midPoint);
                ffpoint3 = new PointF((this.childLeft - 20), childY + midPoint);
                ffpoint4 = new PointF((this.childLeft - 6 - this.lineWidth) - 1, childY + midPoint);
                sspoint4 = new PointF((this.childLeft + this.childWidth + 6 + this.lineWidth) + 1, childY + midPoint);
            }
            else {
                ffpoint1 = new PointF(pixelToPoint(this.parentLeft + this.parentWidth), parentY + midPoint);
                sspoint1 = new PointF(pixelToPoint(this.parentLeft) - 1, parentY + midPoint);
                ffpoint3 = new PointF(pixelToPoint(this.childLeft - 20), childY + midPoint);
                ffpoint4 = new PointF(pixelToPoint(this.childLeft - 6 - this.lineWidth) - 1, childY + midPoint);
                sspoint4 = new PointF(pixelToPoint(this.childLeft + this.childWidth + 6 + this.lineWidth) + 1, childY + midPoint);
            }
            switch (predecessorType) {
                case 'FSType1':
                case 'FSType3':
                    point1 = ffpoint1;
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point2 = new PointF((this.childLeft - 20), parentY + midPoint);
                    }
                    else {
                        point2 = new PointF(pixelToPoint(this.childLeft - 20), parentY + midPoint);
                    }
                    point3 = ffpoint3;
                    point4 = ffpoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint);
                    break;
                case 'FSType2':
                    point1 = ffpoint1;
                    point2 = new PointF(point1.x + 10, parentY + midPoint);
                    point3 = new PointF(point1.x + 10, childY + 2);
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point4 = new PointF((this.childLeft - 20), childY + 2);
                    }
                    else {
                        point4 = new PointF(pixelToPoint(this.childLeft - 20), childY + 2);
                    }
                    point5 = ffpoint3;
                    point6 = ffpoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint, point5, point6);
                    break;
                case 'FSType4':
                    point1 = ffpoint1;
                    point2 = new PointF(point1.x + 10, parentY + midPoint);
                    point3 = new PointF(point1.x + 10, parentY + 2);
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point4 = new PointF((this.childLeft - 20), parentY + 2);
                    }
                    else {
                        point4 = new PointF(pixelToPoint(this.childLeft - 20), parentY + 2);
                    }
                    point5 = ffpoint3;
                    point6 = ffpoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint, point5, point6);
                    break;
                case 'FFType1':
                case 'FFType3':
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point1 = new PointF((this.parentLeft + this.parentWidth) + 1, parentY + midPoint);
                        point2 = new PointF((this.childLeft + this.childWidth + 20), parentY + midPoint);
                    }
                    else {
                        point1 = new PointF(pixelToPoint(this.parentLeft + this.parentWidth) + 1, parentY + midPoint);
                        point2 = new PointF(pixelToPoint(this.childLeft + this.childWidth + 20), parentY + midPoint);
                    }
                    point3 = new PointF(point2.x, childY + midPoint);
                    point4 = sspoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint);
                    break;
                case 'FFType2':
                case 'FFType4':
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point1 = new PointF((this.parentLeft + this.parentWidth) + 1, parentY + midPoint);
                        point2 = new PointF((this.parentLeft + this.parentWidth + 20), parentY + midPoint);
                    }
                    else {
                        point1 = new PointF(pixelToPoint(this.parentLeft + this.parentWidth) + 1, parentY + midPoint);
                        point2 = new PointF(pixelToPoint(this.parentLeft + this.parentWidth + 20), parentY + midPoint);
                    }
                    point3 = new PointF(point2.x, childY + midPoint);
                    point4 = sspoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint);
                    break;
                case 'SSType1':
                case 'SSType3':
                    point1 = sspoint1;
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point2 = new PointF((this.childLeft - 20), parentY + midPoint);
                    }
                    else {
                        point2 = new PointF(pixelToPoint(this.childLeft - 20), parentY + midPoint);
                    }
                    point3 = new PointF(point2.x, childY + midPoint);
                    point4 = ffpoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint);
                    break;
                case 'SSType2':
                case 'SSType4':
                    point1 = sspoint1;
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point2 = new PointF((this.parentLeft - 20), parentY + midPoint);
                    }
                    else {
                        point2 = new PointF(pixelToPoint(this.parentLeft - 20), parentY + midPoint);
                    }
                    point3 = new PointF(point2.x, childY + midPoint);
                    point4 = ffpoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint);
                    break;
                case 'SFType1':
                case 'SFType3':
                    point1 = sspoint1;
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point2 = new PointF((this.childLeft + this.childWidth + 20), parentY + midPoint);
                    }
                    else {
                        point2 = new PointF(pixelToPoint(this.childLeft + this.childWidth + 20), parentY + midPoint);
                    }
                    point3 = new PointF(point2.x, childY + midPoint);
                    point4 = sspoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint);
                    break;
                case 'SFType2':
                    point1 = sspoint1;
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point2 = new PointF((this.parentLeft - 20), parentY + midPoint);
                        point4 = new PointF((this.childLeft + this.childWidth + 20), childY + 2);
                    }
                    else {
                        point2 = new PointF(pixelToPoint(this.parentLeft - 20), parentY + midPoint);
                        point4 = new PointF(pixelToPoint(this.childLeft + this.childWidth + 20), childY + 2);
                    }
                    point3 = new PointF(point2.x, childY + 2);
                    point5 = new PointF(point4.x, childY + midPoint);
                    point6 = sspoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint, point5, point6);
                    break;
                case 'SFType4':
                    point1 = sspoint1;
                    if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
                        point2 = new PointF((this.parentLeft - 20), parentY + midPoint);
                        point4 = new PointF((this.childLeft + this.childWidth + 20), parentY + 2);
                    }
                    else {
                        point2 = new PointF(pixelToPoint(this.parentLeft - 20), parentY + midPoint);
                        point4 = new PointF(pixelToPoint(this.childLeft + this.childWidth + 20), parentY + 2);
                    }
                    point3 = new PointF(point2.x, parentY + 2);
                    point5 = new PointF(point4.x, childY + midPoint);
                    point6 = sspoint4;
                    this.connectLines(startPage, endPage, point1, point2, point3, point4, childTask, midPoint, point5, point6);
                    break;
            }
        }
    };
    /**
     * Method to draw the predecessor lines with calculated connector points
     *
     * @private
     */
    /* eslint-disable-next-line */
    PdfGanttPredecessor.prototype.connectLines = function (startPage, endPage, point1, point2, point3, point4, childTask, midPoint, point5, point6) {
        this.drawLine(startPage, point1, point2);
        this.drawLine(startPage, point2, point3);
        this.drawLine(startPage, point3, point4);
        if (!isNullOrUndefined(point5) && !isNullOrUndefined(point6)) {
            this.drawLine(startPage, point4, point5);
            this.drawLine(startPage, point5, point6);
        }
        this.drawArrow(endPage, childTask, midPoint);
    };
    /**
     * Method to check the predecessor line  occurs within the page
     *
     * @param {RectangleF} rect .
     * @param {number} x .
     * @param {number} y .
     * @returns {boolean} .
     * @private
     */
    PdfGanttPredecessor.prototype.contains = function (rect, x, y) {
        return rect.x <= x &&
            x < rect.x + rect.width &&
            rect.y <= y &&
            y < rect.y + rect.height;
    };
    /**
     * Find the PDF page index of given point
     *
     * @param {PointF} point .
     * @returns {number} .
     * @private
     */
    PdfGanttPredecessor.prototype.findPageIndex = function (point) {
        var pageIndex = -1;
        for (var index = 0; index < this.pdfGantt.pdfPageDetail.length; index++) {
            var pageData = this.pdfGantt.pdfPageDetail[index];
            var pageRect = new RectangleF(pageData.startPoint.x, pageData.startPoint.y, pageData.width, pageData.height);
            if (this.contains(pageRect, point.x, point.y)) {
                pageIndex = index;
                break;
            }
        }
        return pageIndex;
    };
    /**
     * Draw predecessor line
     *
     * @param {PdfPage} page .
     * @param {PointF} startPoint .
     * @param {PointF} endPoint .
     * @returns {void} .
     * @private
     */
    PdfGanttPredecessor.prototype.drawLine = function (page, startPoint, endPoint) {
        var pdfPages = this.pdfGantt.result.page.section.getPages();
        var graphics = page.graphics;
        var newEndPoint = { x: endPoint.x, y: endPoint.y };
        var newStartPoint = { x: endPoint.x, y: endPoint.y };
        var checkStartPoint = { x: endPoint.x, y: endPoint.y };
        var pageData = this.pdfGantt.pdfPageDetail[page.section.indexOf(page) - this.pdfGantt.chartPageIndex];
        var pageRect = new RectangleF(pageData.startPoint.x, pageData.startPoint.y, pageData.width, pageData.height);
        var startPointCheck = this.contains(pageRect, startPoint.x, startPoint.y);
        var endPointCheck = this.contains(pageRect, endPoint.x, endPoint.y);
        var pageIndex = -1;
        startPoint = new PointF(startPoint.x, startPoint.y);
        endPoint = new PointF(endPoint.x, endPoint.y);
        if (!startPointCheck && !endPointCheck || endPointCheck && !startPointCheck) {
            pageIndex = this.findPageIndex(startPoint);
            if (pageIndex > -1) {
                pageData = this.pdfGantt.pdfPageDetail[pageIndex];
                newStartPoint = startPoint;
                newEndPoint = endPoint;
                this.drawLine(pdfPages[pageIndex + this.pdfGantt.chartPageIndex], newStartPoint, newEndPoint);
            }
        }
        else if (!endPointCheck && startPointCheck) {
            var pageRectLeft = pageRect.x;
            var pageRectRight = pageRect.x + pageRect.width;
            var pageRectBottom = pageRect.y + pageRect.height;
            var pageRectTop = pageRect.y;
            if (pageRectLeft > endPoint.x) {
                checkStartPoint.x = endPoint.x = pageRectLeft - 1;
                newStartPoint.x = pageRectLeft - 1;
            }
            else if (pageRectRight < endPoint.x) {
                checkStartPoint.x = endPoint.x = pageRectRight;
                newStartPoint.x = pageRectRight;
                checkStartPoint.x += 1;
            }
            else if (pageRectBottom < endPoint.y) {
                checkStartPoint.y = endPoint.y = pageRectBottom;
                newStartPoint.y = pageRectBottom;
                checkStartPoint.y += 1;
                if (this.pdfGantt.enableHeader) {
                    newStartPoint.y += this.parent.timelineModule.isSingleTier ? pixelToPoint(45) : pixelToPoint(62);
                }
            }
            else if (pageRectTop > endPoint.y) {
                newStartPoint.y = checkStartPoint.y = pageRectTop - 1;
                endPoint.y = pageRectTop;
                if (this.pdfGantt.enableHeader) {
                    checkStartPoint.y += this.parent.timelineModule.isSingleTier ? pixelToPoint(45) : pixelToPoint(62);
                    endPoint.y += this.parent.timelineModule.isSingleTier ? pixelToPoint(45) : pixelToPoint(62);
                }
            }
            pageIndex = this.findPageIndex(checkStartPoint);
            if (pageIndex !== -1) {
                this.drawLine(pdfPages[pageIndex + this.pdfGantt.chartPageIndex], newStartPoint, newEndPoint);
            }
        }
        if (startPointCheck) {
            startPoint = new PointF(startPoint.x, startPoint.y);
            endPoint = new PointF(endPoint.x, endPoint.y);
            startPoint.x = startPoint.x + pageData.pageStartX - pageData.startPoint.x;
            startPoint.y = startPoint.y - pageData.startPoint.y;
            endPoint.x = endPoint.x + pageData.pageStartX - pageData.startPoint.x;
            endPoint.y = endPoint.y - pageData.startPoint.y;
            var brush = new PdfSolidBrush(this.connectorLineColor);
            var predecessorPen = new PdfPen(brush, pixelToPoint(this.lineWidth));
            graphics.drawLine(predecessorPen, startPoint, endPoint);
        }
    };
    /**
     * Draw predecessor arrow
     *
     * @param {PdfPage} page .
     * @param {PdfGanttTaskbarCollection} childTask .
     * @param {number} midPoint .
     * @returns {void} .
     * @private
     */
    PdfGanttPredecessor.prototype.drawArrow = function (page, childTask, midPoint) {
        var pageData = this.pdfGantt.pdfPageDetail[page.section.indexOf(page) - this.pdfGantt.chartPageIndex];
        /* eslint-disable-next-line */
        var pageRect = new RectangleF(new PointF(pageData.startPoint.x, pageData.startPoint.y), new SizeF(pageData.width, pageData.height));
        var startPoint = new PointF();
        var pdfPages = page.section.getPages();
        var width = 6 + this.lineWidth;
        var point2;
        if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
            if (this.type === 'FS' || this.type === 'SS') {
                startPoint = new PointF((this.childLeft) - 1, childTask.taskStartPoint.y + pageData.startPoint.y);
            }
            else {
                startPoint = new PointF((this.childLeft + this.childWidth) + 1, childTask.taskStartPoint.y + pageData.startPoint.y);
            }
        }
        else {
            if (this.type === 'FS' || this.type === 'SS') {
                startPoint = new PointF(pixelToPoint(this.childLeft) - 1, childTask.taskStartPoint.y + pageData.startPoint.y);
            }
            else {
                startPoint = new PointF(pixelToPoint(this.childLeft + this.childWidth) + 1, childTask.taskStartPoint.y + pageData.startPoint.y);
            }
        }
        var startPointCheck = this.contains(pageRect, startPoint.x, startPoint.y);
        if (!startPointCheck) {
            var pageIndex = this.findPageIndex(startPoint);
            if (pageIndex > -1) {
                pageData = this.pdfGantt.pdfPageDetail[pageIndex];
                page = pdfPages[pageIndex + this.pdfGantt.chartPageIndex];
            }
        }
        var graphics = page.graphics;
        startPoint.x = startPoint.x - pageData.startPoint.x + pageData.pageStartX;
        startPoint.y = startPoint.y - pageData.startPoint.y;
        var point1 = new PointF(startPoint.x, startPoint.y + midPoint);
        if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
            if (this.type === 'FS' || this.type === 'SS') {
                point2 = new PointF(point1.x - (width), point1.y - (width));
            }
            else {
                point2 = new PointF(point1.x + (width), point1.y - (width));
            }
        }
        else {
            if (this.type === 'FS' || this.type === 'SS') {
                point2 = new PointF(point1.x - pixelToPoint(width), point1.y - pixelToPoint(width));
            }
            else {
                point2 = new PointF(point1.x + pixelToPoint(width), point1.y - pixelToPoint(width));
            }
        }
        var brush = new PdfSolidBrush(this.connectorLineColor);
        var point3;
        var predecessorPen;
        if (this.parent.pdfExportModule.gantt.taskbar.isAutoFit()) {
            point3 = new PointF(point2.x, point2.y + (2 * width));
            predecessorPen = new PdfPen(brush, (this.lineWidth));
        }
        else {
            point3 = new PointF(point2.x, point2.y + pixelToPoint(2 * width));
            predecessorPen = new PdfPen(brush, pixelToPoint(this.lineWidth));
        }
        graphics.drawLine(predecessorPen, point1, point2);
        graphics.drawLine(predecessorPen, point2, point3);
        graphics.drawLine(predecessorPen, point3, point1);
    };
    return PdfGanttPredecessor;
}());
export { PdfGanttPredecessor };
