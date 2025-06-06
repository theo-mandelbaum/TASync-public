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
import { PdfFontFamily, PdfTextWebLink } from '@syncfusion/ej2-pdf-export';
import { PdfStringFormat, PdfPageCountField, PdfPageNumberField } from '@syncfusion/ej2-pdf-export';
import { PdfPageTemplateElement, RectangleF, PdfCompositeField, PointF } from '@syncfusion/ej2-pdf-export';
import { PdfVerticalAlignment, PdfTextAlignment, PdfStandardFont } from '@syncfusion/ej2-pdf-export';
import { PdfFontStyle, PdfColor, PdfPen, PdfSolidBrush, SizeF, PdfBitmap } from '@syncfusion/ej2-pdf-export';
import { PdfBorders, PdfPaddings } from './pdf-base/index';
import { isNullOrUndefined, Internationalization, getValue, extend } from '@syncfusion/ej2-base';
import { getForeignData, ValueFormatter } from '@syncfusion/ej2-grids';
import { pixelToPoint, isScheduledTask } from '../base/utils';
/**
 * @hidden
 * `ExportHelper` for `PdfExport` & `ExcelExport`
 */
var ExportHelper = /** @class */ (function () {
    function ExportHelper(parent) {
        this.totalColumnWidth = 0;
        this.beforeSinglePageExport = {};
        this.baselineHeight = 8;
        this.parent = parent;
    }
    ExportHelper.prototype.processToFit = function () {
        this.beforeSinglePageExport['zoomingProjectStartDate'] = this.parent.zoomingProjectStartDate;
        this.beforeSinglePageExport['zoomingProjectEndDate'] = this.parent.zoomingProjectEndDate;
        this.beforeSinglePageExport['cloneProjectStartDate'] = this.parent.cloneProjectStartDate;
        this.beforeSinglePageExport['cloneProjectEndDate'] = this.parent.cloneProjectEndDate;
        this.beforeSinglePageExport['customTimelineSettings'] = extend({}, this.parent.timelineModule.customTimelineSettings, null, true);
        this.beforeSinglePageExport['isTimelineRoundOff'] = this.parent.isTimelineRoundOff;
        this.beforeSinglePageExport['topTier'] = this.parent.timelineModule.topTier;
        this.beforeSinglePageExport['topTierCellWidth'] = this.parent.timelineModule.topTierCellWidth;
        this.beforeSinglePageExport['topTierCollection'] = this.parent.timelineModule.topTierCollection;
        this.beforeSinglePageExport['bottomTier'] = this.parent.timelineModule.bottomTier;
        this.beforeSinglePageExport['bottomTierCellWidth'] = this.parent.timelineModule.bottomTierCellWidth;
        this.beforeSinglePageExport['bottomTierCollection'] = this.parent.timelineModule.bottomTierCollection;
        this.beforeSinglePageExport['totalTimelineWidth'] = this.parent.timelineModule.totalTimelineWidth;
        this.beforeSinglePageExport['timelineStartDate'] = this.parent.timelineModule.timelineStartDate;
        this.beforeSinglePageExport['timelineEndDate'] = this.parent.timelineModule.timelineEndDate;
        this.beforeSinglePageExport['timelineRoundOffEndDate'] = this.parent.timelineModule.timelineRoundOffEndDate;
        this.beforeSinglePageExport['perDayWidth'] = this.parent.perDayWidth;
        this.beforeSinglePageExport['updatedConnectorLineCollection'] = extend([], this.parent.updatedConnectorLineCollection, null, true);
        this.parent.timelineModule.isZoomToFit = true;
        this.parent.timelineModule.isZooming = false;
        if (!this.parent.zoomingProjectStartDate) {
            this.parent.zoomingProjectStartDate = this.parent.cloneProjectStartDate;
            this.parent.zoomingProjectEndDate = this.parent.cloneProjectEndDate;
        }
        if (this.parent.zoomingProjectStartDate > this.parent.cloneProjectStartDate) {
            this.parent.cloneProjectStartDate = new Date(this.parent.allowUnscheduledTasks ?
                this.parent.zoomingProjectStartDate : this.parent.cloneProjectStartDate);
        }
        this.parent.dataOperation.calculateProjectDates();
        var timeDifference = (this.parent.cloneProjectEndDate.getTime() - this.parent.cloneProjectStartDate.getTime());
        var totalDays = (timeDifference / (1000 * 3600 * 24));
        var chartsideWidth;
        var gridWidth;
        if (this.exportProps.fitToWidthSettings.gridWidth) {
            gridWidth = parseInt(this.exportProps.fitToWidthSettings.gridWidth.split('%')[0], 10);
        }
        if (this.exportProps.fitToWidthSettings.chartWidth) {
            chartsideWidth = parseInt(this.exportProps.fitToWidthSettings.chartWidth.split('%')[0], 10);
        }
        else {
            if (this.exportProps.fitToWidthSettings.gridWidth) {
                chartsideWidth = 100 - gridWidth;
            }
            else {
                chartsideWidth = 70;
            }
        }
        var pdfwidth = (this.parent.pdfExportModule['pdfPageDimensions'].width * chartsideWidth) / 100;
        var chartWidth = pdfwidth;
        var perDayWidth = chartWidth / totalDays;
        var zoomingLevel;
        var firstValue;
        var secondValue;
        var zoomingCollections = this.parent.zoomingLevels.slice();
        var sortedCollectons = zoomingCollections.sort(function (a, b) {
            return (!a.perDayWidth && !b.perDayWidth ? 0 : (a.perDayWidth < b.perDayWidth) ? 1 : -1);
        });
        if (perDayWidth === 0) { // return when the Gantt chart is not in viewable state.
            return;
        }
        for (var i = 0; i < sortedCollectons.length; i++) {
            firstValue = sortedCollectons[i];
            if (i === sortedCollectons.length - 1) {
                zoomingLevel = sortedCollectons[i];
                break;
            }
            else {
                secondValue = sortedCollectons[i + 1];
            }
            if (perDayWidth >= firstValue.perDayWidth) {
                zoomingLevel = sortedCollectons[i];
                break;
            }
            if (perDayWidth < firstValue.perDayWidth && perDayWidth > secondValue.perDayWidth) {
                zoomingLevel = sortedCollectons[i + 1];
                break;
            }
        }
        var newTimeline = extend({}, {}, zoomingLevel, true);
        this.parent.timelineModule['roundOffDateToZoom'](this.parent.cloneProjectStartDate, true, perDayWidth, newTimeline.bottomTier.unit, zoomingLevel);
        this.parent.timelineModule['roundOffDateToZoom'](this.parent.cloneProjectEndDate, false, perDayWidth, newTimeline.bottomTier.unit, zoomingLevel);
        var numberOfCells = this.parent.timelineModule['calculateNumberOfTimelineCells'](newTimeline);
        var scrollHeight = this.parent.pdfExportModule['pdfPageDimensions'].height; //17 is horizontal scrollbar width
        var emptySpace = scrollHeight <= 0 ? 0 : 17;
        newTimeline.timelineUnitSize = Math.abs((chartWidth - emptySpace)) / numberOfCells;
        this.parent.timelineModule['changeTimelineSettings'](newTimeline);
        this.parent.timelineModule.isZoomToFit = false;
        this.parent.timelineModule.isZooming = false;
    };
    /**
     * @param {IGanttData[]} data .
     * @param {PdfGantt} gantt .
     * @param {PdfExportProperties} props .
     * @returns {void} .
     * @private
     */
    ExportHelper.prototype.processGridExport = function (data, gantt, props) {
        this.flatData = data;
        this.gantt = gantt;
        this.exportValueFormatter = new ExportValueFormatter(this.parent.locale);
        this.exportProps = props;
        this.rowIndex = 0;
        this.colIndex = 0;
        this.columns = this.parent.treeGrid.columns;
        this.gantt.treeColumnIndex = this.parent.treeColumnIndex;
        this.gantt.rowHeight = pixelToPoint(this.parent.rowHeight);
        this.gantt.style.cellPadding.left = 0;
        this.gantt.style.cellPadding.right = 0;
        this.ganttStyle = this.gantt.ganttStyle;
        this.gantt.borderColor = this.ganttStyle.chartGridLineColor;
        this.parent.pdfExportModule.isPdfExport = true;
        if (this.exportProps.fitToWidthSettings && this.exportProps.fitToWidthSettings.isFitToWidth) {
            this.processToFit();
        }
        this.processHeaderContent();
        this.processGanttContent();
        this.processTimeline();
        this.processTaskbar();
        this.processPredecessor();
        this.parent.pdfExportModule.isPdfExport = false;
    };
    ExportHelper.prototype.processHeaderContent = function () {
        var _this = this;
        this.rowIndex++;
        this.row = this.gantt.rows.addRow();
        var index = 0;
        this.columns.forEach(function (column) {
            if (_this.isColumnVisible(column)) {
                _this.processColumnHeader(column, index);
                index++;
            }
        });
    };
    ExportHelper.prototype.processColumnHeader = function (column, index) {
        this.gantt.columns.add(1);
        var pdfColumn = this.gantt.columns.getColumn(index);
        if (this.parent.treeColumnIndex === index) {
            pdfColumn.isTreeColumn = true;
        }
        var width = parseInt(column.width, 10);
        pdfColumn.width = pixelToPoint(width);
        this.totalColumnWidth += pdfColumn.width;
        pdfColumn.headerText = column.headerText;
        pdfColumn.field = column.field;
        var cell = this.row.cells.getCell(index);
        cell.value = column.headerText;
        cell.isHeaderCell = true;
        if (this.ganttStyle && this.ganttStyle.columnHeader &&
            !isNullOrUndefined(this.ganttStyle.columnHeader.fontBrush)) {
            cell.style.fontBrush = new PdfColor(this.ganttStyle.columnHeader.fontBrush);
        }
        var treeGridHeaderHeight = this.parent.timelineModule.isSingleTier ? 45 : 60;
        this.copyStyles(this.ganttStyle.columnHeader, cell, false);
        this.row.height = pixelToPoint(treeGridHeaderHeight);
        if (column.headerTextAlign) {
            cell.style.format.alignment = PdfTextAlignment[column.headerTextAlign];
        }
        var template = {
            image: null,
            value: null,
            fontStyle: { fontBrush: null }
        };
        cell.fontStyle = {
            fontSize: 9
        };
        var args = {
            cell: cell,
            style: cell.style,
            value: cell.value,
            column: column,
            image: null,
            headerTemplate: template
        };
        if (this.parent.pdfColumnHeaderQueryCellInfo) {
            this.parent.trigger('pdfColumnHeaderQueryCellInfo', args);
        }
        if (args.headerTemplate.image && args.headerTemplate.value) {
            args.image = new PdfBitmap(args.headerTemplate.image[0].base64);
            args.image.height = args.headerTemplate.image[0].height || args.image.height;
            args.image.width = args.headerTemplate.image[0].width || args.image.width;
            cell.image = args.image;
            cell.value = args.headerTemplate.value;
            cell.fontStyle.fontSize = args.headerTemplate.fontStyle.fontSize;
            cell.fontStyle.fontFamily = args.headerTemplate.fontStyle.fontFamily;
            cell.fontStyle.fontBrush = args.headerTemplate.fontStyle.fontColor;
        }
        else {
            cell.value = args.value;
        }
    };
    ExportHelper.prototype.isColumnVisible = function (column) {
        var visibleColumn = column.visible || this.exportProps.includeHiddenColumn;
        return (visibleColumn);
    };
    ExportHelper.prototype.processGanttContent = function () {
        var _this = this;
        if (this.flatData.length === 0) {
            this.renderEmptyGantt();
        }
        else {
            var flatData = this.flatData;
            flatData.forEach(function (data) {
                _this.row = _this.gantt.rows.addRow();
                if (data.hasChildRecords) {
                    _this.gantt.rows.getRow(_this.rowIndex).isParentRow = true;
                    _this.processRecordRow(data);
                }
                else {
                    _this.processRecordRow(data);
                }
                _this.rowIndex++;
            });
        }
    };
    /**
     * Method for processing the timeline details
     *
     * @returns {void} .
     */
    ExportHelper.prototype.processTimeline = function () {
        if (this.parent.enableTimelineVirtualization) {
            this.parent.timelineModule.pdfExportTopTierCollection = [];
            this.parent.timelineModule.pdfExportBottomTierCollection = [];
            this.parent.timelineModule.createTimelineSeries();
        }
        var timelineSettings = this.parent.timelineModule;
        this.gantt.chartHeader.topTierHeight = this.gantt.chartHeader.bottomTierHeight
            = (this.parent.timelineModule.isSingleTier ? 45 : 60 / 2);
        this.gantt.chartHeader.topTierCellWidth = timelineSettings.topTierCellWidth;
        this.gantt.chartHeader.bottomTierCellWidth = timelineSettings.bottomTierCellWidth;
        this.gantt.chartHeader.topTier = extend([], [], this.parent.enableTimelineVirtualization ?
            timelineSettings.pdfExportTopTierCollection : timelineSettings.topTierCollection, true);
        this.gantt.chartHeader.bottomTier = extend([], [], this.parent.enableTimelineVirtualization ?
            timelineSettings.pdfExportBottomTierCollection : timelineSettings.bottomTierCollection, true);
        if (this.exportProps && this.exportProps.fitToWidthSettings && this.exportProps.fitToWidthSettings.isFitToWidth &&
            this.parent.enableTimelineVirtualization) {
            var tier = timelineSettings.topTier === 'None' ? 'bottomTier' : 'topTier';
            this.gantt.chartHeader.width = timelineSettings['calculateWidthBetweenTwoDate'](tier, timelineSettings.timelineStartDate, timelineSettings.timelineEndDate);
        }
        else {
            this.gantt.chartHeader.width = this.parent.enableTimelineVirtualization ? this.parent.timelineModule.wholeTimelineWidth :
                timelineSettings.totalTimelineWidth;
        }
        this.gantt.chartHeader.height = !isNullOrUndefined(this.gantt.rows.getRow(0).height) ? this.gantt.rows.getRow(0).height : 65;
        this.gantt.timelineStartDate = new Date(timelineSettings.timelineStartDate.getTime());
    };
    /**
     * Method for create the predecessor collection for rendering
     *
     * @returns {void} .
     */
    ExportHelper.prototype.processPredecessor = function () {
        var _this = this;
        if (isNullOrUndefined(this.exportProps.showPredecessorLines) || this.exportProps.showPredecessorLines) {
            this.parent.pdfExportModule.isPdfExport = true;
            this.parent.predecessorModule.createConnectorLinesCollection(this.flatData);
            this.parent.updatedConnectorLineCollection.forEach(function (data) {
                var predecessor = _this.gantt.predecessor.add();
                predecessor.parentLeft = data.parentLeft;
                predecessor.childLeft = data.childLeft;
                predecessor.parentWidth = data.parentWidth;
                predecessor.childWidth = data.childWidth;
                predecessor.parentIndex = _this.findIndexUsingParent(_this.flatData, data.parentIndex);
                predecessor.childIndex = _this.findIndexUsingParent(_this.flatData, data.childIndex);
                predecessor.rowHeight = data.rowHeight;
                predecessor.type = data.type;
                predecessor.milestoneParent = data.milestoneParent;
                predecessor.milestoneChild = data.milestoneChild;
                predecessor.parentEndPoint = data.parentEndPoint;
                predecessor.lineWidth = _this.parent.connectorLineWidth > 5 ? pixelToPoint(5) : pixelToPoint(_this.parent.connectorLineWidth);
                if (data.isCritical) {
                    predecessor.connectorLineColor = _this.ganttStyle.criticalConnectorLineColor;
                }
                else {
                    predecessor.connectorLineColor = _this.ganttStyle.connectorLineColor;
                }
                _this.gantt.predecessorCollection.push(predecessor);
            });
            this.parent.pdfExportModule.isPdfExport = false;
        }
    };
    ExportHelper.prototype.findIndexUsingParent = function (expandedRecord, parentIndex) {
        return expandedRecord.findIndex(function (data) { return data.index === parentIndex; });
    };
    ExportHelper.prototype.processRecordRow = function (data) {
        var _this = this;
        this.colIndex = 0;
        this.row.level = data.level;
        this.columns.forEach(function (column) {
            if (_this.isColumnVisible(column)) {
                _this.processRecordCell(data, column, _this.row);
                _this.colIndex++;
            }
        });
    };
    ExportHelper.prototype.processRecordCell = function (data, column, row) {
        var cell = row.cells.getCell(this.colIndex);
        var taskFields = this.parent.taskFields;
        var ganttProps = data.ganttProperties;
        if (column.editType === 'datepickeredit' || column.editType === 'datetimepickeredit') {
            cell.value = data[column.field];
        }
        else if (column.field === taskFields.duration) {
            cell.value = this.parent.getDurationString(ganttProps.duration, ganttProps.durationUnit);
        }
        else if (column.field === taskFields.resourceInfo) {
            cell.value = ganttProps.resourceNames;
        }
        else if (column.field === taskFields.work) {
            cell.value = this.parent.getWorkString(ganttProps.work, ganttProps.workUnit);
        }
        else {
            cell.value = !isNullOrUndefined(data[column.field]) ? data[column.field].toString() : '';
        }
        var cellValueString = !isNullOrUndefined(cell.value) ? cell.value.toString() : '';
        var cellValue = cellValueString;
        var value = !isNullOrUndefined(cellValue) ? cellValue : '';
        cell.isHeaderCell = false;
        cell.style.padding = new PdfPaddings();
        this.copyStyles(this.ganttStyle.cell, cell, row.isParentRow);
        if (column['index'] !== this.parent.treeColumnIndex) {
            cell.style.format.alignment = PdfTextAlignment[column.textAlign];
        }
        else {
            cell.style.format.paragraphIndent = cell.row.level * 10;
        }
        var args = {
            data: data,
            value: value,
            column: column,
            style: cell.style,
            cell: cell
        };
        args.value = this.exportValueFormatter.formatCellValue(args);
        if (this.parent.pdfQueryCellInfo) {
            this.parent.trigger('pdfQueryCellInfo', args);
            if (args.style.backgroundColor) {
                cell.style.backgroundColor = args.style.backgroundColor;
            }
            if (args.style.borderColor) {
                cell.style.borderColor = args.style.borderColor;
            }
            if (args.style.fontBrush) {
                cell.style.fontBrush = args.style.fontBrush;
            }
            if (args.style.fontColor) {
                cell.style.fontColor = args.style.fontColor;
            }
            if (args.style.fontFamily) {
                var font = args.style.fontFamily;
                var fontFamily = this.getFontFamily(font);
                cell.style.fontFamily = fontFamily;
            }
            else {
                cell.style.fontFamily = this.ganttStyle.fontFamily;
            }
            if (args.style.fontSize) {
                cell.style.fontSize = args.style.fontSize;
            }
            if (args.style.fontStyle) {
                var style = args.style.fontStyle;
                var fontStyle = this.getFontStyle(style);
                cell.style.fontStyle = fontStyle;
            }
            else {
                cell.style.fontStyle = this.ganttStyle.footer.fontStyle;
            }
            if (args.style.format) {
                cell.style.format = args.style.format;
            }
            if (args.style.padding) {
                cell.style.padding = args.style.padding;
            }
        }
        if (!isNullOrUndefined(args.image) && !isNullOrUndefined(args.image.base64)) {
            var dimension = extend({}, args.image, null, true);
            args.image = new PdfBitmap(args.image.base64);
            args.image.height = dimension['height'] ? dimension['height'] : args.image.height;
            args.image.width = dimension['width'] ? dimension['width'] : args.image.width;
            cell.image = args.image;
        }
        cell.value = args.value;
        if (!isNullOrUndefined(args.hyperLink) && (!isNullOrUndefined(args.hyperLink.displayText) ||
            !isNullOrUndefined(args.hyperLink.target))) {
            cell.value = this.setHyperLink(args);
        }
    };
    ExportHelper.prototype.setHyperLink = function (args) {
        // create the Text Web Link
        var textLink = new PdfTextWebLink();
        // set the hyperlink
        textLink.url = args.hyperLink.target;
        // set the link text
        textLink.text = args.hyperLink.displayText || args.hyperLink.target;
        // set the font
        textLink.font = new PdfStandardFont(PdfFontFamily.Helvetica, 9.75);
        // set the brush and pen for the text color
        textLink.brush = new PdfSolidBrush(new PdfColor(51, 102, 187));
        return textLink;
    };
    /**
     * Method for create the taskbar collection for rendering
     *
     * @returns {void} .
     */
    ExportHelper.prototype.processTaskbar = function () {
        var _this = this;
        var flatData = this.flatData;
        flatData.forEach(function (data) {
            var taskbar = _this.gantt.taskbar.add();
            var ganttProp = data.ganttProperties;
            taskbar.left = ganttProp.left;
            taskbar.width = ganttProp.width;
            if (taskbar.left < 0) {
                taskbar.width = taskbar.width + taskbar.left;
                taskbar.left = 0;
            }
            taskbar.progress = ganttProp.progress;
            taskbar.isScheduledTask = isScheduledTask(ganttProp);
            if (isScheduledTask) {
                if (isNullOrUndefined(ganttProp.endDate) && isNullOrUndefined(ganttProp.duration)) {
                    taskbar.unscheduledTaskBy = 'startDate';
                }
                else if (isNullOrUndefined(ganttProp.startDate) && isNullOrUndefined(ganttProp.duration)) {
                    taskbar.unscheduledTaskBy = 'endDate';
                }
                else {
                    taskbar.unscheduledTaskBy = 'duration';
                    taskbar.unscheduleStarteDate = _this.parent.dateValidationModule.getValidStartDate(data.ganttProperties);
                    taskbar.unscheduleEndDate = _this.parent.dateValidationModule.getValidEndDate(data.ganttProperties);
                }
            }
            // else {
            //     taskbar.unscheduleStarteDate = null;
            //     taskbar.unscheduleEndDate = null;
            // }
            taskbar.startDate = ganttProp.startDate;
            taskbar.endDate = ganttProp.endDate;
            taskbar.height = _this.parent.chartRowsModule.taskBarHeight;
            // if (this.parent.renderBaseline) {
            //     let height: number;
            //     if ((taskbar.height + this.baselineHeight) <= this.parent.rowHeight) {
            //         height = taskbar.height;
            //     } else {
            //         height = taskbar.height - (this.baselineHeight + 1);
            //     }
            //     taskbar.height = height;
            // }
            taskbar.indicators = ganttProp.indicators;
            taskbar.autoStartDate = ganttProp.autoStartDate;
            taskbar.autoEndDate = ganttProp.autoEndDate;
            taskbar.isAutoSchedule = ganttProp.isAutoSchedule;
            taskbar.autoWidth = ganttProp.autoWidth;
            taskbar.autoLeft = ganttProp.autoLeft;
            taskbar.segment = ganttProp.segments;
            taskbar.isSpliterTask = (isNullOrUndefined(ganttProp.segments) || ganttProp.segments.length === 0) ? false : true;
            if (taskbar.isSpliterTask) {
                taskbar.segmentCollection = taskbar.segment.map(function (obj) { return (__assign({}, obj)); });
            }
            taskbar.baselineTop = _this.parent.chartRowsModule.baselineTop;
            taskbar.isMilestone = ganttProp.isMilestone;
            taskbar.baselineStartDate = ganttProp.baselineStartDate;
            taskbar.baselineEndDate = ganttProp.baselineEndDate;
            taskbar.baselineLeft = ganttProp.baselineLeft;
            taskbar.baselineWidth = ganttProp.baselineWidth;
            if (taskbar.baselineLeft < 0) {
                taskbar.baselineWidth = taskbar.baselineWidth + taskbar.baselineLeft;
                taskbar.baselineLeft = 0;
            }
            taskbar.milestoneColor = new PdfColor(_this.ganttStyle.taskbar.milestoneColor);
            taskbar.isParentTask = data.hasChildRecords;
            if (ganttProp.isMilestone) {
                taskbar.height = ganttProp.width;
            }
            if (data[_this.parent.labelSettings.leftLabel]) {
                taskbar.leftTaskLabel.value = data[_this.parent.labelSettings.leftLabel].toString();
            }
            if (data[_this.parent.labelSettings.rightLabel]) {
                taskbar.rightTaskLabel.value = data[_this.parent.labelSettings.rightLabel].toString();
            }
            if (!isNullOrUndefined(data[_this.parent.labelSettings.taskLabel])) {
                taskbar.taskLabel = data[_this.parent.labelSettings.taskLabel].toString();
            }
            var reduceLeft = ganttProp.isMilestone ? Math.floor(_this.parent.chartRowsModule.taskBarHeight / 2) + 33 : 33; // 33 indicates default timeline cell width
            taskbar.rightTaskLabel.left = ganttProp.left + ganttProp.width + reduceLeft; // right label left value
            taskbar.fontFamily = _this.ganttStyle.fontFamily;
            taskbar.progressWidth = ganttProp.progressWidth;
            taskbar.labelColor = new PdfColor(_this.ganttStyle.label.fontColor);
            taskbar.progressFontColor = new PdfColor(_this.ganttStyle.taskbar.progressFontColor);
            if (taskbar.isParentTask) {
                taskbar.taskColor = new PdfColor(_this.ganttStyle.taskbar.parentTaskColor);
                taskbar.taskBorderColor = new PdfColor(_this.ganttStyle.taskbar.parentTaskBorderColor);
                taskbar.progressColor = new PdfColor(_this.ganttStyle.taskbar.parentProgressColor);
            }
            else {
                if (data.isCritical) {
                    taskbar.taskColor = new PdfColor(_this.ganttStyle.taskbar.criticalTaskColor);
                    taskbar.progressColor = new PdfColor(_this.ganttStyle.taskbar.criticalProgressColor);
                    taskbar.taskBorderColor = new PdfColor(_this.ganttStyle.taskbar.criticalTaskBorderColor);
                    taskbar.milestoneColor = new PdfColor(_this.ganttStyle.taskbar.criticalTaskColor);
                }
                else {
                    taskbar.taskColor = new PdfColor(_this.ganttStyle.taskbar.taskColor);
                    taskbar.progressColor = new PdfColor(_this.ganttStyle.taskbar.progressColor);
                    taskbar.taskBorderColor = new PdfColor(_this.ganttStyle.taskbar.taskBorderColor);
                }
            }
            taskbar.manualParentBorder = new PdfColor(_this.ganttStyle.taskbar.manualParentBorder);
            taskbar.manualChildBorder = new PdfColor(_this.ganttStyle.taskbar.manualChildBorder);
            taskbar.manuallineColor = new PdfColor(_this.ganttStyle.taskbar.manualLineColor);
            taskbar.unscheduledTaskBarColor = new PdfColor(_this.ganttStyle.taskbar.unscheduledTaskBarColor);
            taskbar.manualParentBackground = new PdfColor(_this.ganttStyle.taskbar.manualParentBackground);
            taskbar.manualParentProgress = new PdfColor(_this.ganttStyle.taskbar.manualParentProgress);
            taskbar.manualChildBackground = new PdfColor(_this.ganttStyle.taskbar.manualChildBackground);
            taskbar.manualChildProgress = new PdfColor(_this.ganttStyle.taskbar.manualChildProgress);
            taskbar.splitLineBackground = new PdfColor(_this.ganttStyle.taskbar.splitLineBackground);
            taskbar.baselineColor = new PdfColor(_this.ganttStyle.taskbar.baselineColor);
            taskbar.baselineBorderColor = new PdfColor(_this.ganttStyle.taskbar.baselineBorderColor);
            taskbar.gridLineColor = new PdfColor(_this.ganttStyle.chartGridLineColor);
            var labelTemplateStyle = {};
            labelTemplateStyle.leftLabel = { value: null, image: null, fontStyle: { fontBrush: null } };
            labelTemplateStyle.rightLabel = { value: null, image: null, fontStyle: { fontBrush: null } };
            labelTemplateStyle.taskLabel = { value: null, image: null, fontStyle: { fontBrush: null } };
            taskbar.labelSettings = labelTemplateStyle;
            var taskbarTemplate = {
                value: null,
                image: null,
                fontStyle: { fontBrush: null }
            };
            taskbar.taskbarTemplate = taskbarTemplate;
            _this.gantt.taskbarCollection.push(taskbar);
            var taskStyle = {};
            taskStyle.progressFontColor = taskbar.progressFontColor;
            taskStyle.taskColor = taskbar.taskColor;
            taskStyle.taskBorderColor = taskbar.taskBorderColor;
            taskStyle.progressColor = taskbar.progressColor;
            taskStyle.milestoneColor = taskbar.milestoneColor;
            taskStyle.baselineColor = taskbar.baselineColor;
            taskStyle.baselineBorderColor = taskbar.baselineBorderColor;
            var args = {
                taskbar: taskStyle,
                data: data,
                indicators: data.ganttProperties.indicators,
                labelSettings: labelTemplateStyle,
                taskbarTemplate: taskbarTemplate
            };
            if (_this.parent.pdfQueryTaskbarInfo) {
                var segmentCollection = [];
                args.taskbar.taskSegmentStyles = null;
                if (args.data.ganttProperties.segments) {
                    for (var i = 0; i < args.data.ganttProperties.segments.length; i++) {
                        var segmentTaskbar = {
                            taskColor: args.taskbar.taskColor,
                            taskBorderColor: args.taskbar.taskBorderColor,
                            progressColor: args.taskbar.progressColor
                        };
                        segmentCollection.push(segmentTaskbar);
                    }
                    args.taskbar.taskSegmentStyles = segmentCollection;
                }
                _this.parent.trigger('pdfQueryTaskbarInfo', args);
                taskbar.taskSegmentStyles = args.taskbar.taskSegmentStyles;
                taskbar.progressFontColor = args.taskbar.progressFontColor;
                taskbar.taskColor = args.taskbar.taskColor;
                taskbar.taskBorderColor = args.taskbar.taskBorderColor;
                taskbar.progressColor = args.taskbar.progressColor;
                taskbar.milestoneColor = args.taskbar.milestoneColor;
                taskbar.baselineColor = args.taskbar.baselineColor;
                taskbar.baselineBorderColor = args.taskbar.baselineBorderColor;
                taskbar.indicators = args.indicators;
                taskbar.labelSettings.leftLabel.value = args.labelSettings.leftLabel.value;
                var leftImages = args.labelSettings.leftLabel.image;
                taskbar.labelSettings.rightLabel.value = args.labelSettings.rightLabel.value;
                var rightImage = args.labelSettings.rightLabel.image;
                if (!isNullOrUndefined(args.labelSettings.taskLabel.value)) {
                    taskbar.taskLabel = args.labelSettings.taskLabel.value;
                }
                if (!isNullOrUndefined(args.labelSettings.leftLabel.image) && Array.isArray(args.labelSettings.leftLabel.image[0].base64)
                    && args.labelSettings.leftLabel.image[0].base64.length > 0) {
                    var baseCount = args.labelSettings.leftLabel.image[0].base64.length;
                    taskbar.labelSettings.leftLabel.image = [];
                    for (var i = 0; i < baseCount; i++) {
                        // Create separate objects for each element of the base64 array
                        taskbar.labelSettings.leftLabel.image.push({
                            base64: leftImages[0].base64[i],
                            width: leftImages[0].width,
                            height: leftImages[0].height
                        });
                    }
                }
                else if (!isNullOrUndefined(args.labelSettings.leftLabel.image)) {
                    taskbar.labelSettings.leftLabel.image = args.labelSettings.leftLabel.image;
                }
                if (!isNullOrUndefined(args.labelSettings.rightLabel.image) && Array.isArray(args.labelSettings.rightLabel.image[0].base64)
                    && args.labelSettings.rightLabel.image[0].base64.length > 0) {
                    var baseCount = args.labelSettings.rightLabel.image[0].base64.length;
                    taskbar.labelSettings.rightLabel.image = [];
                    for (var i = 0; i < baseCount; i++) {
                        // Create separate objects for each element of the base64 array
                        taskbar.labelSettings.rightLabel.image.push({
                            base64: rightImage[0].base64[i],
                            width: rightImage[0].width,
                            height: rightImage[0].height
                        });
                    }
                }
                else if (!isNullOrUndefined(args.labelSettings.rightLabel.image)) {
                    taskbar.labelSettings.rightLabel.image = args.labelSettings.rightLabel.image;
                }
                /* eslint-disable-next-line */
                var applyTemplate = function (target, source) {
                    target.progressFontColor = source.taskbar.progressFontColor;
                    target.taskColor = new PdfColor(source.taskbar.taskColor);
                    target.taskBorderColor = source.taskbar.taskBorderColor;
                    target.progressColor = source.taskbar.progressColor;
                    target.milestoneColor = source.taskbar.milestoneColor;
                    if (!isNullOrUndefined(source.taskbarTemplate.image) && !isNullOrUndefined(source.taskbarTemplate.image[0].base64)) {
                        var width = source.taskbarTemplate.image[0].width;
                        var milestoneHeight = taskbar.isMilestone ? ((source.taskbarTemplate.image[0].height <
                            (_this.parent.chartRowsModule.taskBarHeight * 0.7)) ? source.taskbarTemplate.image[0].height :
                            (_this.parent.chartRowsModule.taskBarHeight * 0.7) - 2) : (_this.parent.chartRowsModule.taskBarHeight * 0.7) - 2;
                        var taskbarHeight = !isNullOrUndefined(source.taskbarTemplate.image[0].height) ?
                            ((source.taskbarTemplate.image[0].height < taskbar.height) ?
                                source.taskbarTemplate.image[0].height : taskbar.height - 2) : taskbar.height - 2;
                        var height = taskbar.isMilestone ? milestoneHeight : taskbarHeight;
                        target.taskbarTemplate.image = source.taskbarTemplate.image;
                        target.taskbarTemplate.image[0].width = width;
                        target.taskbarTemplate.image[0].height = height;
                    }
                    if (!isNullOrUndefined(source.taskbarTemplate.value)) {
                        target.taskbarTemplate.value = source.taskbarTemplate.value;
                        target.taskbarTemplate.value = source.taskbarTemplate.value;
                        target.taskbarTemplate.fontStyle.fontColor = source.taskbarTemplate.fontStyle.fontColor;
                        target.taskbarTemplate.fontStyle.fontSize = source.taskbarTemplate.fontStyle.fontSize;
                        target.taskbarTemplate.fontStyle.fontFamily = source.taskbarTemplate.fontStyle.fontFamily;
                        target.taskbarTemplate.fontStyle.fontStyle = source.taskbarTemplate.fontStyle.fontStyle;
                        target.taskbarTemplate.fontStyle.fontBrush = source.taskbarTemplate.fontStyle.fontBrush;
                    }
                };
                if (!args.data.hasChildRecords && args.data.ganttProperties.duration !== 0) {
                    applyTemplate(taskbar, args);
                }
                else if (args.data.hasChildRecords && args.data.ganttProperties.duration !== 0) {
                    applyTemplate(taskbar, args);
                }
                else if (args.data.ganttProperties.duration === 0) {
                    applyTemplate(taskbar, args);
                }
            }
        });
    };
    /**
     * set text alignment of each columns in exporting grid
     *
     * @param {string} textAlign .
     * @param {PdfStringFormat} format .
     * @returns {PdfStringFormat} .
     * @private
     */
    ExportHelper.prototype.getHorizontalAlignment = function (textAlign, format) {
        if (format === undefined) {
            format = new PdfStringFormat();
        }
        switch (textAlign) {
            case 'Right':
                format.alignment = PdfTextAlignment.Right;
                break;
            case 'Center':
                format.alignment = PdfTextAlignment.Center;
                break;
            case 'Justify':
                format.alignment = PdfTextAlignment.Justify;
                break;
            case 'Left':
                format.alignment = PdfTextAlignment.Left;
                break;
        }
        return format;
    };
    /**
     * set vertical alignment of each columns in exporting grid
     *
     * @param {string} verticalAlign .
     * @param {PdfStringFormat} format .
     * @param {string} textAlign .
     * @returns {PdfStringFormat} .
     * @private
     */
    ExportHelper.prototype.getVerticalAlignment = function (verticalAlign, format, textAlign) {
        if (format === undefined) {
            format = new PdfStringFormat();
            format = this.getHorizontalAlignment(textAlign, format);
        }
        switch (verticalAlign) {
            case 'Bottom':
                format.lineAlignment = PdfVerticalAlignment.Bottom;
                break;
            case 'Middle':
                format.lineAlignment = PdfVerticalAlignment.Middle;
                break;
            case 'Top':
                format.lineAlignment = PdfVerticalAlignment.Top;
                break;
        }
        return format;
    };
    ExportHelper.prototype.getFontFamily = function (fontFamily) {
        switch (fontFamily) {
            case 'TimesRoman':
                return 2;
            case 'Courier':
                return 1;
            case 'Symbol':
                return 3;
            case 'ZapfDingbats':
                return 4;
            default:
                return 0;
        }
    };
    ExportHelper.prototype.getFontStyle = function (fontStyle) {
        switch (fontStyle) {
            case 'Strikeout':
                return 8;
            case 'Underline':
                return 4;
            case 'Italic':
                return 2;
            case 'Bold':
                return 1;
            default:
                return 0;
        }
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    ExportHelper.prototype.getFont = function (content) {
        if (content.font) {
            return content.font;
        }
        var defaultFontFamily = this.exportProps.ganttStyle && this.exportProps.ganttStyle.fontFamily ?
            this.exportProps.ganttStyle.fontFamily : PdfFontFamily.TimesRoman;
        var fontSize = (!isNullOrUndefined(content.style.fontSize)) ? (content.style.fontSize * 0.75) : 9.75;
        var fontFamily = (!isNullOrUndefined(content.style.fontFamily)) ?
            (this.getFontFamily(content.style.fontFamily)) : defaultFontFamily;
        var fontStyle = PdfFontStyle.Regular;
        // if (!isNullOrUndefined(content.style.bold) && content.style.bold) {
        //     fontStyle |= PdfFontStyle.Bold;
        // }
        // if (!isNullOrUndefined(content.style.italic) && content.style.italic) {
        //     fontStyle |= PdfFontStyle.Italic;
        // }
        // if (!isNullOrUndefined(content.style.underline) && content.style.underline) {
        //     fontStyle |= PdfFontStyle.Underline;
        // }
        // if (!isNullOrUndefined(content.style.strikeout) && content.style.strikeout) {
        //     fontStyle |= PdfFontStyle.Strikeout;
        // }
        return new PdfStandardFont(fontFamily, fontSize, fontStyle);
    };
    ExportHelper.prototype.renderEmptyGantt = function () {
        var row = this.gantt.rows.addRow();
        if (row.cells.count === 0) {
            row.cells.add();
        }
        row.cells.getCell(0).isHeaderCell = false;
        row.height = pixelToPoint(this.parent.rowHeight);
        this.copyStyles(this.ganttStyle.columnHeader, row.cells.getCell(0), row.isParentRow);
        var count = this.columns.length;
        row.cells.getCell(0).value = this.parent.localeObj.getConstant('emptyRecord');
        this.mergeCells(1, 0, count);
    };
    ExportHelper.prototype.mergeCells = function (rowIndex, colIndex, lastColIndex) {
        this.gantt.rows.getRow(rowIndex).cells.getCell(colIndex).columnSpan = lastColIndex;
    };
    /* eslint-disable-next-line */
    ExportHelper.prototype.copyStyles = function (style, cell, isParentRow) {
        cell.style.fontColor = new PdfColor(style.fontColor);
        cell.style.backgroundColor = new PdfColor(style.backgroundColor);
        cell.style.borderColor = new PdfColor(style.borderColor);
        cell.style.fontSize = style.fontSize;
        cell.style.fontStyle = style.fontStyle;
        /* eslint-disable-next-line */
        cell.style.format = Object.assign(new PdfStringFormat(), style.format);
        cell.style.borders = new PdfBorders();
        cell.style.borders.all = new PdfPen(cell.style.borderColor);
        cell.style.padding = new PdfPaddings();
        var padding = 0;
        if (cell.isHeaderCell) {
            padding = this.parent.timelineModule.isSingleTier ? 45 / 2 : 60 / 2;
        }
        else {
            padding = this.parent.rowHeight / 2;
        }
        cell.style.padding.top = (padding - style.fontSize > 0) ? padding - style.fontSize : padding;
        cell.style.padding.bottom = (padding - style.fontSize > 0) ? padding - style.fontSize : 0;
        cell.style.padding.left = 10;
        cell.style.padding.right = 10;
        if (style.padding) {
            cell.style.padding = style.padding;
        }
        if (style.borders) {
            cell.style.borders = style.borders;
        }
    };
    /**
     * @param {PdfDocument} pdfDoc .
     * @returns {void} .
     * @private
     */
    ExportHelper.prototype.initializePdf = function (pdfDoc) {
        this.pdfDoc = pdfDoc;
        var widths = [];
        var treeColumnIndex = 0;
        var tWidth = (this.pdfDoc.pageSettings.width - 82);
        if (this.exportProps && this.exportProps.fitToWidthSettings && this.exportProps.fitToWidthSettings.isFitToWidth) {
            var gridWidth = void 0;
            if (this.exportProps.fitToWidthSettings.gridWidth) {
                gridWidth = parseInt(this.exportProps.fitToWidthSettings.gridWidth.split('%')[0], 10);
            }
            else {
                if (this.exportProps.fitToWidthSettings.chartWidth) {
                    var chartWidth = parseInt(this.exportProps.fitToWidthSettings.chartWidth.split('%')[0], 10);
                    gridWidth = 100 - chartWidth;
                }
                else {
                    gridWidth = 30;
                }
            }
            var pdfwidth = (this.parent.pdfExportModule['pdfPageDimensions'].width * gridWidth) / 100;
            var perColumnWidth = pdfwidth / this.gantt.columns.columns.length;
            for (var i = 0; i < this.gantt.columns.columns.length; i++) {
                this.gantt.columns.getColumn(i).width = perColumnWidth;
            }
        }
        /* eslint-disable-next-line */
        var PdfPage = this.parent.pdfExportModule.pdfPage;
        if (this.totalColumnWidth > (this.pdfDoc.pageSettings.width - 82) && this.totalColumnWidth < PdfPage.getClientSize().width) {
            this.gantt.style.allowHorizontalOverflow = true;
        }
        else if ((tWidth / this.columns.length) < widths[treeColumnIndex]) {
            this.gantt.columns.getColumn(treeColumnIndex).width = widths[treeColumnIndex];
        }
        if (this.exportProps.enableFooter || isNullOrUndefined(this.exportProps.enableFooter)) {
            //code for draw the footer content
            var pageSize_1 = this.parent.pdfExportModule.getPageSize(this.exportProps.pageSize);
            var bounds = new RectangleF(0, 0, pageSize_1.width, 35);
            var pen = new PdfPen(this.ganttStyle.footer.borderColor);
            var footer = new PdfPageTemplateElement(bounds);
            var footerBrush = new PdfSolidBrush(this.ganttStyle.footer.backgroundColor);
            footer.graphics.drawRectangle(pen, footerBrush, 0, 0, pageSize_1.width, 35);
            /* eslint-disable-next-line */
            var font = new PdfStandardFont(this.ganttStyle.fontFamily, this.ganttStyle.footer.fontSize, this.ganttStyle.footer.fontStyle);
            if (this.ganttStyle.font) {
                font = this.ganttStyle.font;
            }
            var brush = new PdfSolidBrush(this.ganttStyle.footer.fontColor);
            var pageNumber = new PdfPageNumberField(font);
            var count = new PdfPageCountField(font, brush);
            var compositeField = new PdfCompositeField(font, brush, 'Page {0}', pageNumber, count);
            compositeField.stringFormat = this.ganttStyle.footer.format;
            compositeField.bounds = bounds;
            compositeField.draw(footer.graphics, new PointF(0, 0));
            pdfDoc.template.bottom = footer;
        }
        /* eslint-disable-next-line */
        var pageSize = PdfPage.size;
        var clientSize = !isNullOrUndefined(pageSize) ? pageSize : this.pdfDoc.pageSettings.size;
        // code for draw header content
        if (!isNullOrUndefined(this.exportProps.header)) {
            var headerProp = this.exportProps.header;
            var position = new PointF(0, headerProp.fromTop);
            var size = new SizeF((clientSize.width * 1.1), ((headerProp && headerProp.height) ? headerProp.height * 0.75 : 50));
            var bounds = new RectangleF(position, size);
            pdfDoc.template.top = this.drawPageTemplate(new PdfPageTemplateElement(bounds), headerProp);
        }
        // code for customization of footer
        if (!this.exportProps.enableFooter && !isNullOrUndefined(this.exportProps.footer)) {
            var footer = this.exportProps.footer;
            var position = new PointF(0, ((clientSize.width - 80) - ((footer && footer.fromBottom) ?
                footer.fromBottom * 0.75 : 0)));
            var size = new SizeF((clientSize.width * 1.1), ((footer && footer.height) ? footer.height * 0.75 : 50));
            var bounds = new RectangleF(position, size);
            this.pdfDoc.template.bottom = this.drawPageTemplate(new PdfPageTemplateElement(bounds), footer);
        }
    };
    ExportHelper.prototype.drawPageTemplate = function (template, element) {
        for (var _i = 0, _a = element.contents; _i < _a.length; _i++) {
            var content = _a[_i];
            switch (content.type) {
                case 'Text':
                    if (content.value === '' || content.value === undefined || content.value === null || typeof content.value !== 'string') {
                        throw new Error('please enter the valid input value in text content...');
                    }
                    this.drawText(template, content);
                    break;
                case 'PageNumber':
                    this.drawPageNumber(template, content);
                    break;
                case 'Image':
                    if (content.src === undefined || content.src === null || content.src === '') {
                        throw new Error('please enter the valid base64 string in image content...');
                    }
                    this.drawImage(template, content);
                    break;
                case 'Line':
                    this.drawLine(template, content);
                    break;
                default:
                    throw new Error('Please set valid content type...');
            }
        }
        return template;
    };
    // code for draw text
    /* eslint-disable-next-line */
    ExportHelper.prototype.drawText = function (pageTemplate, content) {
        var font = this.getFont(content);
        if (this.ganttStyle.font) {
            font = this.ganttStyle.font;
        }
        var brush = this.getBrushFromContent(content);
        var pen = null;
        if (!isNullOrUndefined(content.style.textPenColor)) {
            var penColor = this.hexToRgb(content.style.textPenColor);
            pen = new PdfPen(new PdfColor(penColor.r, penColor.g, penColor.b));
        }
        if (brush === null && pen === null) {
            brush = new PdfSolidBrush(new PdfColor(0, 0, 0));
        }
        var value = content.value.toString();
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var format = new PdfStringFormat();
        if (!isNullOrUndefined(content.style.stringFormat)) {
            format.alignment = content.style.stringFormat.alignment;
        }
        var result = this.setContentFormat(content, format);
        if (result !== null && !isNullOrUndefined(result.format) && !isNullOrUndefined(result.size)) {
            pageTemplate.graphics.drawString(value, font, pen, brush, x, y, result.size.width, result.size.height, result.format);
        }
        else {
            pageTemplate.graphics.drawString(value, font, pen, brush, x, y, format);
        }
    };
    // code for draw pagenumber
    /* eslint-disable-next-line */
    ExportHelper.prototype.drawPageNumber = function (documentHeader, content) {
        var font = this.getFont(content);
        var brush = null;
        if (!isNullOrUndefined(content.style.textBrushColor)) {
            var brushColor = this.hexToRgb(content.style.textBrushColor);
            brush = new PdfSolidBrush(new PdfColor(brushColor.r, brushColor.g, brushColor.b));
        }
        else {
            brush = new PdfSolidBrush(new PdfColor(0, 0, 0));
        }
        var pageNumber = new PdfPageNumberField(font, brush);
        pageNumber.numberStyle = this.getPageNumberStyle(content.pageNumberType);
        var compositeField;
        var format;
        if (!isNullOrUndefined(content.format)) {
            var total = '$total';
            var current = '$current';
            if (content.format.indexOf(total) !== -1 && content.format.indexOf(current) !== -1) {
                var pageCount = new PdfPageCountField(font);
                pageCount.numberStyle = this.getPageNumberStyle(content.pageNumberType);
                if (content.format.indexOf(total) > content.format.indexOf(current)) {
                    format = content.format.replace(current, '0');
                    format = format.replace(total, '1');
                }
                else {
                    format = content.format.replace(current, '1');
                    format = format.replace(total, '0');
                }
                compositeField = new PdfCompositeField(font, brush, format, pageNumber, pageCount);
            }
            else if (content.format.indexOf(current) !== -1 && content.format.indexOf(total) === -1) {
                format = content.format.replace(current, '0');
                compositeField = new PdfCompositeField(font, brush, format, pageNumber);
            }
            else {
                var pageCount = new PdfPageCountField(font);
                format = content.format.replace(total, '0');
                compositeField = new PdfCompositeField(font, brush, format, pageCount);
            }
        }
        else {
            format = '{0}';
            compositeField = new PdfCompositeField(font, brush, format, pageNumber);
        }
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var result = this.setContentFormat(content, compositeField.stringFormat);
        if (result !== null && !isNullOrUndefined(result.format) && !isNullOrUndefined(result.size)) {
            compositeField.stringFormat = result.format;
            compositeField.bounds = new RectangleF(x, y, result.size.width, result.size.height);
        }
        compositeField.draw(documentHeader.graphics, x, y);
    };
    // code for draw image
    /* eslint-disable-next-line */
    ExportHelper.prototype.drawImage = function (documentHeader, content) {
        var x = content.position.x * 0.75;
        var y = content.position.y * 0.75;
        var width = (!isNullOrUndefined(content.size) && !isNullOrUndefined(content.size.width)) ?
            (content.size.width * 0.50) : undefined;
        var height = (!isNullOrUndefined(content.size) && !isNullOrUndefined(content.size.height)) ?
            (content.size.height * 0.75) : undefined;
        var image = new PdfBitmap(content.src);
        if (!isNullOrUndefined(width)) {
            documentHeader.graphics.drawImage(image, x, y, width, height);
        }
        else {
            documentHeader.graphics.drawImage(image, x, y);
        }
    };
    // code for draw line
    /* eslint-disable-next-line */
    ExportHelper.prototype.drawLine = function (documentHeader, content) {
        var x1 = content.points.x1 * 0.75;
        var y1 = content.points.y1 * 0.75;
        var x2 = content.points.x2 * 0.75;
        var y2 = content.points.y2 * 0.75;
        var pen = this.getPenFromContent(content);
        if (!isNullOrUndefined(content.style)) {
            if (!isNullOrUndefined(content.style.penSize) && typeof content.style.penSize === 'number') {
                pen.width = content.style.penSize * 0.75;
            }
            pen.dashStyle = this.getDashStyle(content.style.dashStyle);
        }
        documentHeader.graphics.drawLine(pen, x1, y1, x2, y2);
    };
    ExportHelper.prototype.getPenFromContent = function (content) {
        var pen = new PdfPen(new PdfColor(0, 0, 0));
        if (!isNullOrUndefined(content.style) && content.style !== null && !isNullOrUndefined(content.style.penColor)) {
            var penColor = this.hexToRgb(content.style.penColor);
            pen = new PdfPen(new PdfColor(penColor.r, penColor.g, penColor.b));
        }
        return pen;
    };
    ExportHelper.prototype.getDashStyle = function (dashStyle) {
        switch (dashStyle) {
            case 'Dash':
                return 1;
            case 'Dot':
                return 2;
            case 'DashDot':
                return 3;
            case 'DashDotDot':
                return 4;
            default:
                return 0;
        }
    };
    ExportHelper.prototype.getBrushFromContent = function (content) {
        var brush = null;
        if (!isNullOrUndefined(content.style.textBrushColor)) {
            /* tslint:disable-next-line:max-line-length */
            var brushColor = this.hexToRgb(content.style.textBrushColor);
            brush = new PdfSolidBrush(new PdfColor(brushColor.r, brushColor.g, brushColor.b));
        }
        return brush;
    };
    ExportHelper.prototype.hexToRgb = function (hex) {
        if (hex === null || hex === '' || hex.length !== 7) {
            throw new Error('please set valid hex value for color...');
        }
        hex = hex.substring(1);
        var bigint = parseInt(hex, 16);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        return { r: r, g: g, b: b };
    };
    ExportHelper.prototype.setContentFormat = function (content, format) {
        var width = (content.size) ? content.size.width * 0.75 : this.pdfDoc.pageSettings.size.width;
        var height = (content.size) ? content.size.height * 0.75 : (!isNullOrUndefined(this.exportProps.footer) ?
            this.exportProps.footer.height * 0.50 : 0);
        format = new PdfStringFormat(PdfTextAlignment.Left, PdfVerticalAlignment.Middle);
        if (!isNullOrUndefined(content.style.hAlign)) {
            switch (content.style.hAlign) {
                case 'Right':
                    format.alignment = PdfTextAlignment.Right;
                    break;
                case 'Center':
                    format.alignment = PdfTextAlignment.Center;
                    break;
                case 'Justify':
                    format.alignment = PdfTextAlignment.Justify;
                    break;
                default:
                    format.alignment = PdfTextAlignment.Left;
            }
        }
        if (!isNullOrUndefined(content.style.vAlign)) {
            format = this.getVerticalAlignment(content.style.vAlign, format);
        }
        return { format: format, size: new SizeF(width, height) };
    };
    ExportHelper.prototype.getPageNumberStyle = function (pageNumberType) {
        switch (pageNumberType) {
            case 'LowerLatin':
                return 2;
            case 'LowerRoman':
                return 3;
            case 'UpperLatin':
                return 4;
            case 'UpperRoman':
                return 5;
            default:
                return 1;
        }
    };
    return ExportHelper;
}());
export { ExportHelper };
/**
 * @hidden
 * `ExportValueFormatter` for `PdfExport` & `ExcelExport`
 */
var ExportValueFormatter = /** @class */ (function () {
    function ExportValueFormatter(culture) {
        this.valueFormatter = new ValueFormatter(culture);
        this.internationalization = new Internationalization(culture);
    }
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    ExportValueFormatter.prototype.returnFormattedValue = function (args, customFormat) {
        if (!isNullOrUndefined(args.value) && args.value) {
            return this.valueFormatter.getFormatFunction(customFormat)(args.value);
        }
        else {
            return '';
        }
    };
    /**
     * @private
     */
    /* eslint-disable-next-line  */
    ExportValueFormatter.prototype.formatCellValue = function (args) {
        if (args.isForeignKey) {
            args.value = getValue(args.column.foreignKeyValue, getForeignData(args.column, {}, args.value)[0]);
        }
        if (args.column.type === 'number' && args.column.format !== undefined && args.column.format !== '') {
            return args.value ? this.internationalization.getNumberFormat({ format: args.column.format })(args.value) : '';
        }
        else if (args.column.type === 'boolean') {
            return args.value ? 'true' : 'false';
        }
        else if ((args.column.type === 'date' || args.column.type === 'datetime' || args.column.type === 'time') && args.column.format !== undefined) {
            if (typeof args.value === 'string') {
                args.value = new Date(args.value);
            }
            if (typeof args.column.format === 'string') {
                var format = void 0;
                if (args.column.type === 'date') {
                    format = { type: 'date', format: args.column.format };
                }
                else if (args.column.type === 'time') {
                    format = { type: 'time', format: args.column.format };
                }
                else {
                    format = { type: 'dateTime', format: args.column.format };
                }
                return this.returnFormattedValue(args, format);
            }
            else {
                if (args.column.format instanceof Object && args.column.format.type === undefined) {
                    return (args.value.toString());
                }
                else {
                    var customFormat = void 0;
                    if (args.column.type === 'date') {
                        /* eslint-disable-next-line max-len */
                        customFormat = { type: args.column.format.type, format: args.column.format.format, skeleton: args.column.format.skeleton };
                    }
                    else if (args.column.type === 'time') {
                        customFormat = { type: 'time', format: args.column.format.format, skeleton: args.column.format.skeleton };
                    }
                    else {
                        customFormat = { type: 'dateTime', format: args.column.format.format, skeleton: args.column.format.skeleton };
                    }
                    return this.returnFormattedValue(args, customFormat);
                }
            }
        }
        else {
            if ((!isNullOrUndefined(args.column.type) && !isNullOrUndefined(args.value)) || !isNullOrUndefined(args.value)) {
                return (args.value).toString();
            }
            else {
                return '';
            }
        }
    };
    return ExportValueFormatter;
}());
export { ExportValueFormatter };
