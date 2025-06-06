import * as events from '../base/constant';
import { Workbook } from '@syncfusion/ej2-excel-export';
import { isNullOrUndefined, getEnumValue, compile, getValue, detach, extend } from '@syncfusion/ej2-base';
import { Data } from '../actions/data';
import { ExportHelper, ExportValueFormatter } from './export-helper';
import { SummaryModelGenerator, GroupSummaryModelGenerator, CaptionSummaryModelGenerator } from '../services/summary-model-generator';
import { CellType } from '../base/enum';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { getPrintGridModel, getUid, isExportColumns, updateColumnTypeForExportColumns, prepareColumns, measureColumnDepth } from '../base/util';
import { defaultCurrencyCode } from '@syncfusion/ej2-base';
/**
 * @hidden
 * `ExcelExport` module is used to handle the Excel export action.
 */
var ExcelExport = /** @class */ (function () {
    /**
     * Constructor for the Grid Excel Export module.
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} locator - specifies the ServiceLocator
     * @hidden
     */
    function ExcelExport(parent, locator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.book = {};
        this.workSheet = [];
        this.rows = [];
        this.columns = [];
        this.styles = [];
        this.rowLength = 1;
        this.expType = 'AppendToSheet';
        this.includeHiddenColumn = false;
        this.isCsvExport = false;
        this.isChild = false;
        this.isElementIdChanged = false;
        this.gridPool = {};
        this.sheet = {};
        this.grpFooterTemplates = [];
        this.footerTemplates = [];
        this.aggIndex = 0;
        this.totalAggregates = 0;
        this.parent = parent;
        this.helper = new ExportHelper(parent);
        this.locator = locator;
        this.l10n = this.locator.getService('localization');
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     */
    ExcelExport.prototype.getModuleName = function () {
        return 'ExcelExport';
    };
    ExcelExport.prototype.init = function (gObj) {
        if (gObj.element !== null && gObj.element.id === '') {
            gObj.element.id = new Date().toISOString();
            this.isElementIdChanged = true;
        }
        this.parent = gObj;
        if (this.parent.isDestroyed) {
            return;
        }
        this.isExporting = undefined;
        this.book = {};
        this.workSheet = [];
        this.rows = [];
        this.columns = [];
        this.styles = [];
        this.rowLength = 1;
        this.footer = undefined;
        this.expType = 'AppendToSheet';
        this.includeHiddenColumn = false;
        this.exportValueFormatter = new ExportValueFormatter(gObj.locale);
        gObj.id = getUid('main-grid');
        this.gridPool[gObj.id] = false;
    };
    /**
     * Export Grid to Excel file.
     *
     * @param {IGrid} grid - Defines the grid.
     * @param  {exportProperties} exportProperties - Defines the export properties of the Grid.
     * @param  {isMultipleExport} isMultipleExport - Defines is multiple Grid's are exported.
     * @param  {Workbook} workbook - Defined the Workbook if multiple Grid is exported.
     * @param  {boolean} isCsv - true if export to CSV.
     * @param {boolean} isBlob - true if isBlob is enabled.
     * @returns {Promise<any>} - Returns the map for export.
     */
    // eslint-disable-next-line
    ExcelExport.prototype.Map = function (grid, exportProperties, isMultipleExport, workbook, isCsv, isBlob) {
        var gObj = grid;
        var cancel = 'cancel';
        var isBlb = 'isBlob';
        var Child = 'isChild';
        var csv = 'isCsv';
        var workbk = 'workbook';
        var isMultiEx = 'isMultipleExport';
        this.gridPool = {};
        if ((grid.childGrid || grid.detailTemplate) && !(!isNullOrUndefined(exportProperties) && exportProperties.hierarchyExportMode === 'None')) {
            grid.expandedRows = getPrintGridModel(grid).expandedRows;
        }
        var args = {
            requestType: 'beforeExcelExport', gridObject: gObj, cancel: false,
            isMultipleExport: isMultipleExport, workbook: workbook, isCsv: isCsv, isBlob: isBlob, isChild: this.isChild,
            grpFooterTemplates: this.grpFooterTemplates
        };
        gObj.trigger(events.beforeExcelExport, args);
        if (args["" + cancel]) {
            return new Promise(function (resolve) {
                return resolve();
            });
        }
        this.parent.log('exporting_begin', this.getModuleName());
        this.data = new Data(gObj);
        this.isExporting = true;
        this.isBlob = args["" + isBlb];
        this.isChild = args["" + Child];
        this.grpFooterTemplates = args['grpFooterTemplates'];
        if (args["" + csv]) {
            this.isCsvExport = args["" + csv];
        }
        else {
            this.isCsvExport = false;
        }
        if (isExportColumns(exportProperties)) {
            updateColumnTypeForExportColumns(exportProperties, gObj);
        }
        return this.processRecords(gObj, exportProperties, args["" + isMultiEx], args["" + workbk]);
    };
    ExcelExport.prototype.exportingSuccess = function (resolve) {
        this.isExporting = false;
        this.parent.trigger(events.excelExportComplete, this.isBlob ? { promise: this.blobPromise } : { gridInstance: this.parent });
        this.parent.log('exporting_complete', this.getModuleName());
        resolve(this.book);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ExcelExport.prototype.processRecords = function (gObj, exportProperties, isMultipleExport, workbook) {
        var _this = this;
        if (!isNullOrUndefined(exportProperties) && !isNullOrUndefined(exportProperties.dataSource)) {
            exportProperties.dataSource = exportProperties.dataSource instanceof DataManager ?
                exportProperties.dataSource : new DataManager(exportProperties.dataSource);
            var query_1 = exportProperties.query ? exportProperties.query : new Query();
            if (isNullOrUndefined(query_1.isCountRequired) || gObj.aggregates) {
                query_1.isCountRequired = true;
            }
            return new Promise(function (resolve) {
                var dataManager = exportProperties.dataSource.executeQuery(query_1);
                dataManager.then(function (r) {
                    _this.init(gObj);
                    _this.processInnerRecords(gObj, exportProperties, isMultipleExport, workbook, r).then(function () {
                        _this.exportingSuccess(resolve);
                    });
                });
            });
        }
        else if (!isNullOrUndefined(exportProperties) && exportProperties.exportType === 'CurrentPage' &&
            !(this.parent.groupSettings.enableLazyLoading && this.parent.groupSettings.columns.length
                && !this.parent.getDataModule().isRemote())) {
            return new Promise(function (resolve) {
                _this.init(gObj);
                _this.processInnerRecords(gObj, exportProperties, isMultipleExport, workbook, _this.parent.getCurrentViewRecords());
                _this.exportingSuccess(resolve);
            });
        }
        else {
            var allPromise_1 = [];
            var query = ExportHelper.getQuery(gObj, this.data);
            if (this.parent.groupSettings.enableLazyLoading && this.parent.groupSettings.columns.length
                && !this.parent.getDataModule().isRemote()) {
                if (isNullOrUndefined(exportProperties)) {
                    exportProperties = { hierarchyExportMode: 'All' };
                }
                exportProperties.hierarchyExportMode = exportProperties.hierarchyExportMode === 'None' ? 'None' : 'All';
                if (exportProperties.hierarchyExportMode === 'All') {
                    query.lazyLoad = [];
                }
            }
            allPromise_1.push(this.data.getData({}, query));
            allPromise_1.push(this.helper.getColumnData(gObj));
            return new Promise(function (resolve, reject) {
                Promise.all(allPromise_1).then(function (e) {
                    _this.init(gObj);
                    _this.processInnerRecords(gObj, exportProperties, isMultipleExport, workbook, e[0]).then(function () {
                        _this.exportingSuccess(resolve);
                    });
                }).catch(function (e) {
                    reject(_this.book);
                    _this.parent.trigger(events.actionFailure, e);
                });
            });
        }
    };
    ExcelExport.prototype.processInnerRecords = function (gObj, exportProperties, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isMultipleExport, workbook, r) {
        var _this = this;
        this.groupedColLength = gObj.groupSettings.columns.length;
        var blankRows = 5;
        var separator;
        var rows = [];
        var colDepth = measureColumnDepth(gObj.columns);
        var isExportPropertiesPresent = !isNullOrUndefined(exportProperties);
        if (isExportPropertiesPresent && !isNullOrUndefined(exportProperties.multipleExport)) {
            this.expType = (!isNullOrUndefined(exportProperties.multipleExport.type) ? exportProperties.multipleExport.type : 'AppendToSheet');
            if (!isNullOrUndefined(exportProperties.multipleExport.blankRows)) {
                blankRows = exportProperties.multipleExport.blankRows;
            }
        }
        if (isNullOrUndefined(workbook)) {
            this.workSheet = [];
            this.rows = [];
            this.columns = [];
            this.styles = [];
            this.sheet.images = [];
        }
        else if (this.expType === 'NewSheet') {
            this.workSheet = workbook.worksheets;
            this.rows = [];
            this.columns = [];
            this.sheet.images = [];
            this.styles = workbook.styles;
        }
        else {
            this.workSheet = [];
            this.rows = workbook.worksheets[0].rows;
            this.columns = workbook.worksheets[0].columns;
            this.styles = workbook.styles;
            this.sheet.images = workbook.worksheets[0].images;
            this.rowLength = (this.rows[this.rows.length - 1].index + blankRows);
            this.rowLength++;
        }
        if (isExportPropertiesPresent) {
            if (!isNullOrUndefined(isMultipleExport)) {
                if (!isNullOrUndefined(exportProperties.header) && (isMultipleExport || this.expType === 'NewSheet')) {
                    this.processExcelHeader(JSON.parse(JSON.stringify(exportProperties.header)));
                }
                if (!isNullOrUndefined(exportProperties.footer)) {
                    if (this.expType === 'AppendToSheet') {
                        if (!isMultipleExport) {
                            this.footer = JSON.parse(JSON.stringify(exportProperties.footer));
                        }
                    }
                    else {
                        this.footer = JSON.parse(JSON.stringify(exportProperties.footer));
                    }
                }
            }
            else {
                if (!isNullOrUndefined(exportProperties.header)) {
                    this.processExcelHeader(JSON.parse(JSON.stringify(exportProperties.header)));
                }
                if (!isNullOrUndefined(exportProperties.footer)) {
                    this.footer = JSON.parse(JSON.stringify(exportProperties.footer));
                }
            }
        }
        this.includeHiddenColumn = (isExportPropertiesPresent ? exportProperties.includeHiddenColumn : false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise(function (resolve, reject) {
            gObj.childGridLevel = 0;
            rows = _this.processGridExport(gObj, exportProperties, r);
            _this.globalResolve = resolve;
            _this.gridPool[gObj.id] = true;
            _this.helper.checkAndExport(_this.gridPool, _this.globalResolve);
        }).then(function () {
            var organisedRows = [];
            _this.organiseRows(rows, rows[0].index, organisedRows);
            _this.rows = _this.rows.concat(organisedRows);
            //footer template add
            if (!isNullOrUndefined(_this.footer)) {
                if ((_this.expType === 'AppendToSheet' && !isMultipleExport) || (_this.expType === 'NewSheet')) {
                    _this.processExcelFooter(_this.footer);
                }
            }
            if (_this.columns.length > 0) {
                _this.sheet.columns = _this.columns;
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            _this.sheet.rows = _this.rows;
            _this.sheet.enableRtl = _this.parent.enableRtl;
            if (_this.parent.allowFiltering && gObj.getVisibleColumns().length && isExportPropertiesPresent &&
                exportProperties.enableFilter) {
                var headerRowLen = exportProperties.header ? exportProperties.header.headerRows ||
                    exportProperties.header.rows.length : 0;
                var autoFilters = {
                    row: colDepth + headerRowLen, column: _this.groupedColLength ? _this.groupedColLength + 1 :
                        _this.sheet.columns[0].index, lastRow: _this.sheet.rows.length, lastColumn: _this.sheet.columns.length
                };
                _this.sheet.autoFilters = autoFilters;
            }
            _this.workSheet.push(_this.sheet);
            _this.book.worksheets = _this.workSheet;
            _this.book.styles = _this.styles;
            gObj.notify('finalPageSetup', _this.book);
            if (!isMultipleExport) {
                if (_this.isCsvExport) {
                    if (isExportPropertiesPresent && !isNullOrUndefined(exportProperties.separator)
                        && exportProperties.separator !== ',') {
                        separator = exportProperties.separator;
                    }
                    var book = new Workbook(_this.book, 'csv', gObj.locale, defaultCurrencyCode, separator);
                    if (!_this.isBlob) {
                        if (isExportPropertiesPresent && exportProperties.fileName) {
                            book.save(exportProperties.fileName);
                        }
                        else {
                            book.save('Export.csv');
                        }
                    }
                    else {
                        _this.blobPromise = book.saveAsBlob('text/csv');
                    }
                }
                else {
                    var book = new Workbook(_this.book, 'xlsx', gObj.locale, defaultCurrencyCode);
                    if (!_this.isBlob) {
                        if (isExportPropertiesPresent && exportProperties.fileName) {
                            book.save(exportProperties.fileName);
                        }
                        else {
                            book.save('Export.xlsx');
                        }
                    }
                    else {
                        _this.blobPromise = book.saveAsBlob('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                    }
                }
                if (_this.isElementIdChanged) {
                    gObj.element.id = '';
                }
                delete gObj.expandedRows;
            }
            return workbook;
        });
    };
    ExcelExport.prototype.organiseRows = function (rows, initialIndex, organisedRows) {
        if (!rows.length) {
            return initialIndex;
        }
        for (var i = 0; i < rows.length; i++) {
            var row = rows[parseInt(i.toString(), 10)];
            var childRows = row.childRows;
            if (childRows) {
                row.index = initialIndex++;
                delete row.childRows;
                organisedRows.push(row);
                initialIndex = this.organiseRows(childRows, initialIndex, organisedRows);
            }
            else {
                row.index = initialIndex++;
                organisedRows.push(row);
            }
        }
        return initialIndex;
    };
    ExcelExport.prototype.processGridExport = function (gObj, exportProperties, r) {
        var excelRows = [];
        if (!isNullOrUndefined(exportProperties) && !isNullOrUndefined(exportProperties.theme)) {
            this.theme = exportProperties.theme;
        }
        if ((gObj.childGrid || gObj.detailTemplate) && !isNullOrUndefined(exportProperties)) {
            gObj.hierarchyPrintMode = exportProperties.hierarchyExportMode || 'Expanded';
        }
        var helper = new ExportHelper(gObj, this.helper.getForeignKeyData());
        var gColumns = isExportColumns(exportProperties) ?
            prepareColumns(exportProperties.columns, gObj.enableColumnVirtualization) :
            helper.getGridExportColumns(gObj.columns);
        var headerRow = helper.getHeaders(gColumns, this.includeHiddenColumn);
        var groupIndent = gObj.groupSettings.columns.length ? gObj.groupSettings.columns.length - 1 : 0;
        excelRows = this.processHeaderContent(gObj, headerRow, groupIndent, excelRows);
        if (!isNullOrUndefined(exportProperties) && Object.keys(exportProperties).length &&
            isNullOrUndefined(exportProperties.dataSource)) {
            if (exportProperties.exportType === 'CurrentPage' && (!gObj.groupSettings.enableLazyLoading
                || gObj.getDataModule().isRemote())) {
                excelRows = this.processRecordContent(gObj, r, headerRow, exportProperties, gObj.currentViewData, excelRows, helper);
            }
            else {
                excelRows = this.processRecordContent(gObj, r, headerRow, exportProperties, undefined, excelRows, helper);
            }
        }
        else {
            excelRows = this.processRecordContent(gObj, r, headerRow, exportProperties, undefined, excelRows, helper);
        }
        gObj.notify(events.exportDataBound, { excelRows: excelRows, type: 'excel' });
        this.capTemplate = undefined;
        this.footerTemplates = [];
        this.grpFooterTemplates = [];
        this.aggIndex = 0;
        this.totalAggregates = 0;
        return excelRows;
    };
    ExcelExport.prototype.processRecordContent = function (gObj, returnType, headerRow, exportProperties, currentViewRecords, excelRow, helper) {
        var record;
        if (!isNullOrUndefined(currentViewRecords) && currentViewRecords.length) {
            record = currentViewRecords;
        }
        else {
            record = returnType.result;
        }
        if (!isNullOrUndefined(record.level)) {
            this.processGroupedRows(gObj, record, headerRow, record.level, 0, exportProperties, excelRow, helper);
        }
        else {
            this.processRecordRows(gObj, record, headerRow, 0, 0, exportProperties, excelRow, helper);
        }
        if (!isNullOrUndefined(returnType.aggregates)) {
            if (!isNullOrUndefined(currentViewRecords) && !this.parent.groupSettings.enableLazyLoading) {
                this.processAggregates(gObj, returnType.result, excelRow, currentViewRecords);
            }
            else {
                var result = returnType.result.GroupGuid ?
                    returnType.result.records : returnType.result;
                this.processAggregates(gObj, result, excelRow);
            }
        }
        return excelRow;
    };
    ExcelExport.prototype.processGroupedRows = function (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gObj, dataSource, headerRow, level, startIndex, excelExportProperties, excelRows, helper) {
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
            var item = dataSource_1[_i];
            var cells = [];
            var index = 1;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var cell = {};
            cell.index = (index + level) - 1;
            var col = gObj.getColumnByField(item.field);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var args = {
                value: item.key,
                column: col,
                style: undefined,
                isForeignKey: col.isForeignColumn()
            };
            var value = gObj.getColumnByField(item.field).headerText +
                ': ' + (!col.enableGroupByFormat ? this.exportValueFormatter.formatCellValue(args) : item.key) + ' - ';
            if (item.count > 1) {
                value += item.count + ' items';
            }
            else {
                value += item.count + ' item';
            }
            var cArgs = { captionText: value, type: this.isCsvExport ? 'CSV' : 'Excel', data: item };
            this.parent.trigger(events.exportGroupCaption, cArgs);
            cell.value = cArgs.captionText;
            cell.style = this.getCaptionThemeStyle(this.theme);
            if (!isNullOrUndefined(cArgs.style)) {
                cell.style = this.mergeOptions(cell.style, cArgs.style);
            }
            var captionModelGen = new CaptionSummaryModelGenerator(gObj);
            var groupCaptionSummaryRows = captionModelGen.generateRows(item);
            this.fillAggregates(gObj, groupCaptionSummaryRows, (dataSource.level + dataSource.childLevels) - 1, excelRows, this.rowLength);
            cells.push(cell);
            if (excelRows[excelRows.length - 1].cells.length > 0) {
                var lIndex = dataSource.level + dataSource.childLevels + groupCaptionSummaryRows[0].cells.length;
                var hIndex = 0;
                for (var _a = 0, _b = excelRows[excelRows.length - 1].cells; _a < _b.length; _a++) {
                    var tCell = _b[_a];
                    if (tCell.index < lIndex) {
                        lIndex = tCell.index;
                    }
                    if (tCell.index > hIndex) {
                        hIndex = tCell.index;
                    }
                    if (cells[cells.length - 1].index !== tCell.index) {
                        cells.push(tCell);
                    }
                }
                if ((lIndex - cell.index) > 1) {
                    cell.colSpan = lIndex - cell.index;
                }
                while (hIndex < (headerRow.columns.length + level + dataSource.childLevels)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var sCell = {};
                    sCell.index = (hIndex + 1);
                    sCell.style = this.getCaptionThemeStyle(this.theme);
                    cells.push(sCell);
                    hIndex++;
                }
            }
            else {
                var span = 0;
                //Calculation for column span when group caption dont have aggregates
                for (var _c = 0, _d = headerRow.columns; _c < _d.length; _c++) {
                    var col_1 = _d[_c];
                    if (col_1.visible) {
                        span++;
                    }
                }
                cell.colSpan = (dataSource.childLevels + span);
            }
            excelRows[excelRows.length - 1].cells = cells;
            this.rowLength++;
            if (this.groupedColLength < 8 && level > 1) {
                var grouping = { outlineLevel: level - 1, isCollapsed: true };
                excelRows[excelRows.length - 1].grouping = grouping;
            }
            if (!isNullOrUndefined(dataSource.childLevels) && dataSource.childLevels > 0) {
                this.processGroupedRows(gObj, item.items, headerRow, item.items.level, startIndex, excelExportProperties, excelRows, helper);
                this.processAggregates(gObj, item, excelRows, undefined, (level - 1) + dataSource.childLevels, true);
            }
            else {
                startIndex = this.processRecordRows(gObj, item.items, headerRow, (level - 1), startIndex, excelExportProperties, excelRows, helper);
                this.processAggregates(gObj, item, excelRows, undefined, (level - 1), true);
            }
        }
    };
    ExcelExport.prototype.processRecordRows = function (gObj, record, headerRow, level, startIndex, excelExportProperties, excelRows, helper) {
        var index = 1;
        var cells = [];
        var columns = headerRow.columns;
        var rows = helper.getGridRowModel(columns, record, gObj, startIndex);
        for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
            var row = rows_1[_i];
            cells = [];
            startIndex++;
            index = 1;
            var templateRowHeight = void 0;
            for (var c = 0, len = row.cells.length; c < len; c++) {
                var gCell = row.cells[parseInt(c.toString(), 10)];
                if (gCell.cellType !== CellType.Data) {
                    continue;
                }
                var column = gCell.column;
                var field = column.field;
                var cellValue = !isNullOrUndefined(field) ? column.valueAccessor(field, row.data, column) : '';
                var value = !isNullOrUndefined(cellValue) ? cellValue : '';
                if (column.type === 'dateonly' && typeof value === 'string' && value) {
                    var arr = value.split(/[^0-9.]/);
                    value = new Date(parseInt(arr[0], 10), parseInt(arr[1], 10) - 1, parseInt(arr[2], 10));
                }
                var fkData = void 0;
                if (column.isForeignColumn && column.isForeignColumn()) {
                    fkData = helper.getFData(value, column);
                    value = getValue(column.foreignKeyValue, fkData);
                }
                if (!isNullOrUndefined(value)) {
                    var cell = {};
                    var idx = index + level + gObj.childGridLevel;
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var excelCellArgs = {
                        data: row.data, column: column, foreignKeyData: fkData,
                        value: value, style: undefined, colSpan: 1, cell: cell
                    };
                    gObj.trigger(events.excelQueryCellInfo, excelCellArgs);
                    if (!isNullOrUndefined(excelCellArgs.image) && !isNullOrUndefined(excelCellArgs.image.base64)) {
                        templateRowHeight = this.setImage(excelCellArgs, idx);
                        if (excelCellArgs.image.height && excelCellArgs.value !== '') {
                            templateRowHeight += 30;
                        }
                    }
                    if (!isNullOrUndefined(excelCellArgs.hyperLink)) {
                        excelCellArgs.cell.hyperlink = { target: excelCellArgs.hyperLink.target };
                        excelCellArgs.value = excelCellArgs.hyperLink.displayText || excelCellArgs.value;
                    }
                    cell = excelCellArgs.cell;
                    cell.index = idx;
                    cell.value = excelCellArgs.value;
                    if (excelCellArgs.data === '' && gObj.childGridLevel && index === 1) {
                        var style = {};
                        style.hAlign = 'left';
                        excelCellArgs = { style: style };
                        cell.colSpan = gObj.getVisibleColumns().length;
                        cell.value = this.l10n.getConstant('EmptyRecord');
                    }
                    if (excelCellArgs.colSpan > 1) {
                        cell.colSpan = excelCellArgs.colSpan;
                    }
                    if (!isNullOrUndefined(excelCellArgs.style)) {
                        var styleIndex = this.getColumnStyle(gObj, index + level);
                        cell.style = this.mergeOptions(this.styles[parseInt(styleIndex.toString(), 10)], excelCellArgs.style);
                    }
                    else {
                        cell.style = { name: gObj.element.id + 'column' + (index + level) };
                    }
                    cells.push(cell);
                }
                index++;
            }
            var excelRow = { index: this.rowLength++, cells: cells };
            if (!isNullOrUndefined(templateRowHeight)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                excelRow.height = templateRowHeight;
            }
            if (this.groupedColLength && this.groupedColLength < 8 && (level + 1) > 0) {
                excelRow.grouping = { outlineLevel: (level + 1), isCollapsed: true };
                excelRows.push(excelRow);
            }
            else {
                excelRows.push(excelRow);
            }
            if ((row.isExpand || this.isChild) && (!isNullOrUndefined(gObj.childGrid) || !isNullOrUndefined(gObj.detailTemplate))) {
                if (!isNullOrUndefined(gObj.childGrid)) {
                    gObj.isPrinting = true;
                    var exportType = (!isNullOrUndefined(excelExportProperties) && excelExportProperties.exportType) ?
                        excelExportProperties.exportType : 'AllPages';
                    var returnVal = this.helper.createChildGrid(gObj, row, exportType, this.gridPool);
                    var childGridObj = returnVal.childGrid;
                    var element = returnVal.element;
                    childGridObj.actionFailure =
                        helper.failureHandler(this.gridPool, childGridObj, this.globalResolve);
                    childGridObj.childGridLevel = gObj.childGridLevel + 1;
                    var childExportProperties = extend(excelExportProperties, {
                        columns: null,
                        dataSource: null,
                        query: null
                    });
                    var args = { childGrid: childGridObj, row: row, exportProperties: childExportProperties };
                    this.parent.trigger(events.exportDetailDataBound, args);
                    childGridObj.beforeDataBound = this.childGridCell(excelRow, childGridObj, childExportProperties, row);
                    childGridObj.appendTo(element);
                }
                else {
                    var args = { parentRow: row, row: excelRow, value: {}, action: 'excelexport', gridInstance: gObj };
                    this.parent.trigger(events.exportDetailTemplate, args);
                    excelRow.childRows = this.processDetailTemplate(args);
                }
            }
            gObj.notify(events.exportRowDataBound, { rowObj: row, type: 'excel', excelRows: excelRows });
        }
        return startIndex;
    };
    ExcelExport.prototype.processDetailTemplate = function (templateData) {
        var _this = this;
        var rows = [];
        var templateRowHeight;
        var detailIndent = 2;
        var detailCellIndex;
        if (templateData.value.columnHeader || templateData.value.rows) {
            var processCell_1 = function (currentCell, isHeader) {
                var cell = {};
                if (isNullOrUndefined(currentCell.index)) {
                    currentCell.index = detailCellIndex;
                    detailCellIndex++;
                }
                cell.index = currentCell.index + detailIndent;
                if (!isNullOrUndefined(currentCell.value)) {
                    cell.value = currentCell.value;
                }
                if (!isNullOrUndefined(currentCell.colSpan)) {
                    cell.colSpan = currentCell.colSpan;
                }
                if (!isNullOrUndefined(currentCell.rowSpan)) {
                    cell.rowSpan = currentCell.rowSpan;
                }
                if (isHeader) {
                    cell.style = _this.getHeaderThemeStyle(_this.theme);
                }
                else {
                    cell.style = _this.getRecordThemeStyle(_this.theme);
                }
                if (!isNullOrUndefined(currentCell.style)) {
                    var cellStyle = {
                        fontColor: currentCell.style.fontColor,
                        fontName: currentCell.style.fontName,
                        fontSize: currentCell.style.fontSize,
                        hAlign: currentCell.style.excelHAlign,
                        vAlign: currentCell.style.excelVAlign,
                        rotation: currentCell.style.excelRotation,
                        bold: currentCell.style.bold,
                        indent: currentCell.style.indent,
                        italic: currentCell.style.italic,
                        underline: currentCell.style.underline,
                        backColor: currentCell.style.backColor,
                        wrapText: currentCell.style.wrapText,
                        borders: currentCell.style.excelBorders,
                        numberFormat: currentCell.style.excelNumberFormat,
                        type: currentCell.style.excelType,
                        strikeThrough: currentCell.style.strikeThrough
                    };
                    cell.style = _this.mergeOptions(cellStyle, cell.style);
                }
                if (!isNullOrUndefined(currentCell.image) && !isNullOrUndefined(currentCell.image.base64)) {
                    if (currentCell.rowSpan > 1) {
                        _this.setImage(currentCell, cell.index);
                    }
                    else {
                        templateRowHeight = _this.setImage(currentCell, cell.index);
                        if (currentCell.image.height && currentCell.value !== '') {
                            templateRowHeight += 30;
                        }
                    }
                }
                if (!isNullOrUndefined(currentCell.hyperLink)) {
                    cell.hyperlink = { target: currentCell.hyperLink.target };
                    cell.value = currentCell.hyperLink.displayText;
                }
                return cell;
            };
            var processRow = function (currentRow, isHeader) {
                var excelDetailCells = [];
                detailCellIndex = 0;
                for (var j = 0; j < currentRow.cells.length; j++) {
                    var currentCell = currentRow.cells[parseInt(j.toString(), 10)];
                    var detailCell = processCell_1(currentCell, isHeader);
                    excelDetailCells.push(detailCell);
                }
                var row = { index: _this.rowLength++, cells: excelDetailCells };
                if (!isNullOrUndefined(templateRowHeight)) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    row.height = templateRowHeight;
                    templateRowHeight = null;
                }
                rows.push(row);
            };
            if (templateData.value.columnHeader) {
                for (var i = 0; i < templateData.value.columnHeader.length; i++) {
                    processRow(templateData.value.columnHeader[parseInt(i.toString(), 10)], true);
                }
            }
            if (templateData.value.rows) {
                for (var i = 0; i < templateData.value.rows.length; i++) {
                    processRow(templateData.value.rows[parseInt(i.toString(), 10)]);
                }
            }
        }
        else if (templateData.value.image) {
            templateRowHeight = this.setImage(templateData.value, detailIndent);
            var row = {
                index: this.rowLength++,
                cells: [{
                        index: detailIndent,
                        style: this.getRecordThemeStyle(this.theme)
                    }]
            };
            if (!isNullOrUndefined(templateRowHeight)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                row.height = templateRowHeight;
                templateRowHeight = null;
            }
            rows.push(row);
        }
        else if (templateData.value.text) {
            var row = {
                index: this.rowLength++,
                cells: [{
                        index: detailIndent,
                        value: templateData.value.text,
                        style: this.getRecordThemeStyle(this.theme)
                    }]
            };
            rows.push(row);
        }
        else if (templateData.value.hyperLink) {
            var row = {
                index: this.rowLength++,
                cells: [{
                        index: 2,
                        hyperlink: { target: templateData.value.hyperLink.target },
                        value: templateData.value.hyperLink.displayText,
                        style: this.getRecordThemeStyle(this.theme)
                    }]
            };
            rows.push(row);
        }
        for (var i = 0; i < rows.length; i++) {
            rows[parseInt(i.toString(), 10)].grouping = {
                outlineLevel: 1, isCollapsed: !templateData.parentRow.isExpand, isHidden: !templateData.parentRow.isExpand
            };
        }
        return rows;
    };
    ExcelExport.prototype.setImage = function (args, idx) {
        if (isNullOrUndefined(this.sheet.images)) {
            this.sheet.images = [];
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var excelImage = {
            image: args.image.base64, row: this.rowLength, column: idx,
            lastRow: this.rowLength, lastColumn: idx
        };
        if (args.image.width && args.image.height) {
            excelImage.width = args.image.width;
            excelImage.height = args.image.height;
        }
        this.sheet.images.push(excelImage);
        this.columns[idx - 1].width = args.image.width || this.columns[idx - 1].width;
        return args.image.height || 50;
    };
    ExcelExport.prototype.childGridCell = function (excelRow, childGridObj, excelExportProps, gRow) {
        var _this = this;
        return function (result) {
            childGridObj.beforeDataBound = null;
            result.cancel = true;
            if (result.result.length === 0) {
                result.result = [''];
            }
            excelRow.childRows = _this.processGridExport(childGridObj, excelExportProps, result);
            var intent = _this.parent.groupSettings.columns.length;
            var rows = excelRow.childRows;
            for (var i = 0; i < rows.length; i++) {
                rows[parseInt(i.toString(), 10)].grouping = { outlineLevel: intent + childGridObj
                        .childGridLevel, isCollapsed: !gRow.isExpand, isHidden: !gRow.isExpand };
            }
            childGridObj.destroy();
            detach(childGridObj.element);
            _this.gridPool[childGridObj.id] = true;
            _this.helper.checkAndExport(_this.gridPool, _this.globalResolve);
            return excelRow;
        };
    };
    ExcelExport.prototype.processAggregates = function (gObj, rec, excelRows, currentViewRecords, indent, byGroup) {
        var summaryModel = new SummaryModelGenerator(gObj);
        var columns = summaryModel.getColumns();
        columns = columns.filter(function (col) { return isNullOrUndefined(col.commands) && col.type !== 'checkbox'; });
        if (gObj.aggregates.length && this.parent !== gObj) {
            gObj.aggregateModule.prepareSummaryInfo();
        }
        var data = undefined;
        if (!isNullOrUndefined(currentViewRecords)) {
            data = currentViewRecords;
        }
        else {
            data = rec;
        }
        if (indent === undefined) {
            indent = 0;
        }
        if (gObj.groupSettings.columns.length > 0 && byGroup) {
            var groupSummaryModel = new GroupSummaryModelGenerator(gObj);
            var groupSummaryRows = groupSummaryModel.generateRows(data, { level: data.level });
            if (groupSummaryRows.length > 0) {
                excelRows = this.fillAggregates(gObj, groupSummaryRows, indent, excelRows);
            }
        }
        else {
            indent = gObj.groupSettings.columns.length > 0 && !byGroup ? gObj.groupSettings.columns.length : indent;
            var sRows = summaryModel.generateRows(data, rec.aggregates, null, null, columns);
            if (sRows.length > 0 && !byGroup) {
                indent = gObj.groupSettings.columns.length ? indent - 1 : indent;
                excelRows = this.fillAggregates(gObj, sRows, indent, excelRows);
            }
        }
        return excelRows;
    };
    ExcelExport.prototype.fillAggregates = function (gObj, rows, indent, excelRows, customIndex) {
        for (var _i = 0, rows_2 = rows; _i < rows_2.length; _i++) {
            var row = rows_2[_i];
            var cells = [];
            var isEmpty = true;
            var index = 0;
            for (var _a = 0, _b = row.cells; _a < _b.length; _a++) {
                var cell = _b[_a];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var eCell = {};
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var columnsDetails = {};
                if (!isNullOrUndefined(cell.attributes.index)) {
                    columnsDetails = this.parent.getColumnByIndex(cell.attributes.index);
                }
                if (cell.cellType === CellType.DetailFooterIntent || columnsDetails.type === 'checkbox' || columnsDetails.commands) {
                    continue;
                }
                if ((cell.visible || this.includeHiddenColumn)) {
                    index++;
                    if (cell.isDataCell) {
                        isEmpty = false;
                        var footerTemplate = !isNullOrUndefined(cell.column.footerTemplate);
                        var groupFooterTemplate = !isNullOrUndefined(cell.column.groupFooterTemplate);
                        var groupCaptionTemplate = !isNullOrUndefined(cell.column.groupCaptionTemplate);
                        eCell.index = index + indent + gObj.childGridLevel;
                        if (footerTemplate) {
                            eCell.value = this.getAggreateValue(gObj, CellType.Summary, cell.column.footerTemplate, cell, row);
                        }
                        else if (groupFooterTemplate) {
                            eCell.value = this.getAggreateValue(gObj, CellType.GroupSummary, cell.column.groupFooterTemplate, cell, row);
                        }
                        else if (groupCaptionTemplate) {
                            eCell.value = this.getAggreateValue(gObj, CellType.CaptionSummary, cell.column.groupCaptionTemplate, cell, row);
                        }
                        else {
                            for (var _c = 0, _d = Object.keys(row.data[cell.column.field]); _c < _d.length; _c++) {
                                var key = _d[_c];
                                if (key === cell.column.type) {
                                    if (!isNullOrUndefined(row.data[cell.column.field].Sum)) {
                                        eCell.value = row.data[cell.column.field][cell.column.field + " - sum"];
                                    }
                                    else if (!isNullOrUndefined(row.data[cell.column.field].Average)) {
                                        eCell.value = row.data[cell.column.field][cell.column.field + " - average"];
                                    }
                                    else if (!isNullOrUndefined(row.data[cell.column.field].Max)) {
                                        eCell.value = row.data[cell.column.field][cell.column.field + " - max"];
                                    }
                                    else if (!isNullOrUndefined(row.data[cell.column.field].Min)) {
                                        eCell.value = row.data[cell.column.field][cell.column.field + " - min"];
                                    }
                                    else if (!isNullOrUndefined(row.data[cell.column.field].Count)) {
                                        eCell.value = row.data[cell.column.field][cell.column.field + " - count"];
                                    }
                                    else if (!isNullOrUndefined(row.data[cell.column.field].TrueCount)) {
                                        eCell.value = row.data[cell.column.field][cell.column.field + " - truecount"];
                                    }
                                    else if (!isNullOrUndefined(row.data[cell.column.field].FalseCount)) {
                                        eCell.value = row.data[cell.column.field][cell.column.field + " - falsecount"];
                                    }
                                    else if (!isNullOrUndefined(row.data[cell.column.field].Custom)) {
                                        eCell.value = row.data[cell.column.field].Custom;
                                    }
                                }
                            }
                        }
                        eCell.style = this.getCaptionThemeStyle(this.theme); //{ name: gObj.element.id + 'column' + index };
                        this.aggregateStyle(cell.column, eCell.style, cell.column.field);
                        var gridCellStyle = cell.attributes.class != null ? cell.attributes.class.toString() : '';
                        if (gridCellStyle) {
                            eCell.style.hAlign = gridCellStyle.indexOf('e-rightalign') > -1 ? 'right' :
                                gridCellStyle.indexOf('e-centeralign') > -1 ? 'center' : 'left';
                        }
                        var args = {
                            row: row,
                            type: footerTemplate ? 'Footer' : groupFooterTemplate ? 'GroupFooter' : 'GroupCaption',
                            style: eCell,
                            cell: cell
                        };
                        this.parent.trigger(events.excelAggregateQueryCellInfo, args);
                        cells.push(eCell);
                    }
                    else {
                        if (customIndex === undefined) {
                            eCell.index = index + indent + gObj.childGridLevel;
                            eCell.style = this.getCaptionThemeStyle(this.theme); //{ name: gObj.element.id + 'column' + index };
                            cells.push(eCell);
                        }
                    }
                }
            }
            if (!isNullOrUndefined(customIndex)) {
                excelRows.push({ index: customIndex, cells: cells });
            }
            else {
                var row_1 = {};
                var dummyOutlineLevel = 'outlineLevel';
                var dummyGrouping = 'grouping';
                if (this.groupedColLength < 8 && this.groupedColLength > 0 && !(gObj.groupSettings.enableLazyLoading && isNullOrUndefined(excelRows[excelRows.length - 1]["" + dummyGrouping]))) {
                    var level = excelRows[excelRows.length - 1]["" + dummyGrouping]["" + dummyOutlineLevel];
                    var grouping = { outlineLevel: level, isCollapsed: true };
                    row_1 = { index: this.rowLength++, cells: cells, grouping: grouping };
                }
                else {
                    row_1 = { index: this.rowLength++, cells: cells };
                }
                if (!isEmpty) {
                    excelRows.push(row_1);
                }
            }
        }
        return excelRows;
    };
    ExcelExport.prototype.aggregateStyle = function (col, style, field) {
        var column = this.parent.getColumnByField(field);
        if (typeof col.format === 'object') {
            var format = col.format;
            style.numberFormat = !isNullOrUndefined(format.format) ? format.format : format.skeleton;
            if (!isNullOrUndefined(format.type)) {
                style.type = format.type.toLowerCase();
            }
        }
        else {
            style.numberFormat = col.format;
        }
        if (!isNullOrUndefined(column) && isNullOrUndefined(style.type)) {
            style.type = column.type.toLowerCase();
        }
    };
    ExcelExport.prototype.getAggreateValue = function (gObj, cellType, template, cell, row) {
        var templateFn = {};
        templateFn[getEnumValue(CellType, cell.cellType)] = compile(template);
        var txt;
        var data = row.data[cell.column.field ? cell.column.field : cell.column.columnName];
        if ((this.parent.isReact || this.parent.isVue || this.parent.isVue3 || this.parent.isAngular) &&
            !(typeof cell.column.footerTemplate === 'string' || typeof cell.column.groupFooterTemplate === 'string' || typeof cell.column.groupCaptionTemplate === 'string')) {
            txt = data[(cell.column.type)];
            return !isNullOrUndefined(txt) ? (txt) : '';
        }
        else {
            txt = (templateFn[getEnumValue(CellType, cell.cellType)](data, this.parent));
            if (this.parent.isVue3 && !isNullOrUndefined(txt[1])) {
                return txt[1].textContent;
            }
        }
        return !isNullOrUndefined(txt[0]) ? txt[0].textContent : '';
    };
    ExcelExport.prototype.mergeOptions = function (JSON1, JSON2) {
        var result = {};
        var attrname = Object.keys(JSON1);
        for (var index = 0; index < attrname.length; index++) {
            if (attrname[parseInt(index.toString(), 10)] !== 'name') {
                result[attrname[parseInt(index.toString(), 10)]] = JSON1[attrname[parseInt(index.toString(), 10)]];
            }
        }
        attrname = Object.keys(JSON2);
        for (var index = 0; index < attrname.length; index++) {
            if (attrname[parseInt(index.toString(), 10)] !== 'name') {
                result[attrname[parseInt(index.toString(), 10)]] = JSON2[attrname[parseInt(index.toString(), 10)]];
            }
        }
        return result;
    };
    ExcelExport.prototype.getColumnStyle = function (gObj, columnIndex) {
        var index = 0;
        for (var _i = 0, _a = this.styles; _i < _a.length; _i++) {
            var style = _a[_i];
            if (style.name === gObj.element.id + 'column' + columnIndex) {
                return index;
            }
            index++;
        }
        return undefined;
    };
    ExcelExport.prototype.headerRotation = function (args) {
        var degree = args.style.rotation;
        if (degree <= 90 && degree >= 0) {
            args.style.hAlign = 'Left';
        }
        else if (degree > 90 && degree <= 180) {
            args.style.hAlign = 'Right';
        }
        else {
            degree = 180;
            args.style.hAlign = 'Right';
        }
        args.style.rotation = degree;
    };
    ExcelExport.prototype.processHeaderContent = function (gObj, headerRow, indent, excelRows) {
        var rowIndex = 1;
        var gridRows = headerRow.rows;
        // Column collection with respect to the records in the grid
        var gridColumns = headerRow.columns;
        var spannedCells = [];
        if (indent > 0) {
            var index = 0;
            while (index !== indent) {
                this.columns.push({ index: index + 1, width: 30 });
                index++;
            }
        }
        for (var col = 0; col < gridColumns.length; col++) {
            this.parseStyles(gObj, gridColumns[parseInt(col.toString(), 10)], this.getRecordThemeStyle(this.theme), indent + col + 1);
        }
        var templateRowHeight;
        for (var row = 0; row < gridRows.length; row++) {
            var currentCellIndex = 1 + indent;
            var cells = [];
            for (var column = 0; column < gridRows[parseInt(row.toString(), 10)].cells.length; column++) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                var style = {};
                var cell = {};
                var gridCell = gridRows[parseInt(row.toString(), 10)].cells[parseInt(column.toString(), 10)];
                if (gridCell.isSpanned || gridCell.cellType === CellType.HeaderIndent || gridCell.cellType === CellType.DetailHeader) {
                    continue;
                }
                var result = { contains: true, index: 1 };
                while (result.contains) {
                    result = this.getIndex(spannedCells, rowIndex, currentCellIndex);
                    currentCellIndex = result.index;
                    if (!result.contains) {
                        cell.index = result.index + gObj.childGridLevel;
                        break;
                    }
                }
                if (!isNullOrUndefined(gridCell.rowSpan) && gridCell.rowSpan !== 1) {
                    cell.rowSpan = gridCell.rowSpan;
                    for (var i = rowIndex; i < gridCell.rowSpan + rowIndex; i++) {
                        var spannedCell = { rowIndex: 0, columnIndex: 0,
                            colSpan: 0 };
                        spannedCell.rowIndex = i;
                        spannedCell.columnIndex = currentCellIndex;
                        spannedCell.colSpan = gridCell.colSpan || 1;
                        spannedCells.push(spannedCell);
                    }
                }
                if (!isNullOrUndefined(gridCell.colSpan) && gridCell.colSpan !== 1) {
                    cell.colSpan = gridCell.colSpan;
                    currentCellIndex = currentCellIndex + cell.colSpan - 1;
                }
                cell.value = gridCell.column.headerText;
                style = this.getHeaderThemeStyle(this.theme);
                if (!isNullOrUndefined(gridCell.column.textAlign)) {
                    style.hAlign = gridCell.column.textAlign.toLowerCase();
                }
                if (!isNullOrUndefined(gridCell.column.headerTextAlign)) {
                    style.hAlign = gridCell.column.headerTextAlign.toLowerCase();
                }
                var excelHeaderCellArgs = { cell: cell, gridCell: gridCell, style: style };
                gObj.trigger(events.excelHeaderQueryCellInfo, excelHeaderCellArgs);
                if (gridCell.cellType === CellType.Header && cell.colSpan > 1) {
                    currentCellIndex = currentCellIndex + cell.colSpan - 1;
                    for (var j = 1; j < cell.colSpan; j++) {
                        var nextCellIndex = column + j;
                        if (nextCellIndex < gridRows[parseInt(row.toString(), 10)].cells.length) {
                            gridRows[parseInt(row.toString(), 10)].cells[parseInt(nextCellIndex.toString(), 10)].isSpanned = true;
                        }
                    }
                    for (var i = 0; i < spannedCells.length; i++) {
                        if (spannedCells[parseInt(i.toString(), 10)].columnIndex === cell.index) {
                            spannedCells[parseInt(i.toString(), 10)].colSpan = cell.colSpan;
                        }
                    }
                }
                if (excelHeaderCellArgs.style.rotation) {
                    this.headerRotation(excelHeaderCellArgs);
                }
                if (!isNullOrUndefined(excelHeaderCellArgs.image) && !isNullOrUndefined(excelHeaderCellArgs.image.base64)) {
                    templateRowHeight = this.setImage(excelHeaderCellArgs, currentCellIndex);
                }
                if (!isNullOrUndefined(excelHeaderCellArgs.hyperLink)) {
                    excelHeaderCellArgs.cell.hyperlink = { target: excelHeaderCellArgs.hyperLink.target };
                    cell.value = excelHeaderCellArgs.hyperLink.displayText || cell.value;
                }
                cell.style = excelHeaderCellArgs.style;
                cells.push(cell);
                currentCellIndex++;
            }
            var excelRow = { index: this.rowLength++, cells: cells };
            if (!isNullOrUndefined(templateRowHeight)) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                excelRow.height = templateRowHeight;
            }
            excelRows.push(excelRow);
        }
        return excelRows;
    };
    ExcelExport.prototype.getHeaderThemeStyle = function (theme) {
        var style = {};
        style.fontSize = 12;
        style.borders = { color: '#E0E0E0' };
        style.bold = true;
        if (!isNullOrUndefined(theme) && !isNullOrUndefined(theme.header)) {
            style = this.updateThemeStyle(theme.header, style);
        }
        return style;
    };
    ExcelExport.prototype.updateThemeStyle = function (themestyle, style) {
        return extend(style, themestyle);
    };
    ExcelExport.prototype.getCaptionThemeStyle = function (theme) {
        var style = {};
        style.fontSize = 13;
        style.backColor = '#F6F6F6';
        if (!isNullOrUndefined(theme) && !isNullOrUndefined(theme.caption)) {
            style = this.updateThemeStyle(theme.caption, style);
        }
        return style;
    };
    ExcelExport.prototype.getRecordThemeStyle = function (theme) {
        var style = {};
        style.fontSize = 13;
        style.borders = { color: '#E0E0E0' };
        if (!isNullOrUndefined(theme) && !isNullOrUndefined(theme.record)) {
            style = this.updateThemeStyle(theme.record, style);
        }
        return style;
    };
    ExcelExport.prototype.processExcelHeader = function (header) {
        if (!isNullOrUndefined(header.rows) && (this.expType === 'NewSheet' || this.rowLength === 1)) {
            var noRows = void 0;
            if (header.headerRows === undefined) {
                this.rowLength = header.rows.length;
            }
            else {
                this.rowLength = header.headerRows;
            }
            if (this.rowLength < header.rows.length) {
                noRows = this.rowLength;
            }
            else {
                noRows = header.rows.length;
            }
            this.rowLength++;
            for (var row = 0; row < noRows; row++) {
                var json = header.rows[parseInt(row.toString(), 10)];
                //Row index
                if (!(json.index !== null && !isNullOrUndefined(json.index))) {
                    json.index = (row + 1);
                }
                this.updatedCellIndex(json);
            }
        }
    };
    ExcelExport.prototype.updatedCellIndex = function (json) {
        var cellsLength = json.cells.length;
        for (var cellId = 0; cellId < cellsLength; cellId++) {
            var jsonCell = json.cells[parseInt(cellId.toString(), 10)];
            //cell index
            if (!(jsonCell.index !== null && !isNullOrUndefined(jsonCell.index))) {
                jsonCell.index = (cellId + 1);
            }
        }
        this.rows.push(json);
    };
    ExcelExport.prototype.processExcelFooter = function (footer) {
        if (!isNullOrUndefined(footer.rows)) {
            var noRows = void 0;
            if (footer.footerRows === undefined) {
                this.rowLength += footer.rows.length;
            }
            else {
                if (footer.footerRows > footer.rows.length) {
                    this.rowLength += (footer.footerRows - footer.rows.length);
                    noRows = footer.rows.length;
                }
                else {
                    noRows = footer.footerRows;
                }
            }
            for (var row = 0; row < noRows; row++) {
                var json = footer.rows[parseInt(row.toString(), 10)];
                //Row index
                if (json.index === null || json.index === undefined) {
                    json.index = this.rowLength++;
                }
                else {
                    json.index += this.rowLength;
                }
                this.updatedCellIndex(json);
            }
        }
    };
    ExcelExport.prototype.getIndex = function (spannedCells, rowIndex, columnIndex) {
        for (var _i = 0, spannedCells_1 = spannedCells; _i < spannedCells_1.length; _i++) {
            var spannedCell = spannedCells_1[_i];
            if ((spannedCell.rowIndex === rowIndex) && (spannedCell.columnIndex === columnIndex)) {
                columnIndex += spannedCell.colSpan || 1;
                return { contains: true, index: columnIndex };
            }
        }
        return { contains: false, index: columnIndex };
    };
    ExcelExport.prototype.parseStyles = function (gObj, col, style, index) {
        if (!isNullOrUndefined(col.format)) {
            if (typeof col.format === 'object') {
                var format = col.format;
                style.numberFormat = !isNullOrUndefined(format.format) ? format.format : format.skeleton;
                if (!isNullOrUndefined(format.type)) {
                    style.type = format.type === 'dateonly' ? 'date' : format.type.toLowerCase();
                }
            }
            else {
                style.numberFormat = col.format;
                style.type = col.type === 'dateonly' ? 'date' : col.type;
            }
        }
        if (!isNullOrUndefined(col.textAlign)) {
            style.hAlign = col.textAlign.toLowerCase();
        }
        if (Object.keys(style).length > 0) {
            style.name = gObj.element.id + 'column' + index;
            this.styles.push(style);
        }
        if (!gObj.childGridLevel) {
            if (!isNullOrUndefined(col.width) && col.width !== 'auto') {
                this.columns.push({ index: index + gObj.childGridLevel, width: typeof col.width === 'number' ?
                        col.width : this.helper.getConvertedWidth(col.width) });
            }
            else {
                this.columns.push({ index: index + gObj.childGridLevel, width: null });
            }
        }
    };
    ExcelExport.prototype.destroy = function () {
        //destroy for exporting
    };
    return ExcelExport;
}());
export { ExcelExport };
