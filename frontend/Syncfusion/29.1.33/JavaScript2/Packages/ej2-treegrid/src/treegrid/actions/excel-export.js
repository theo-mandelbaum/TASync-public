import { getObject, Grid, ExcelExport as GridExcel, ExportHelper } from '@syncfusion/ej2-grids';
import { Data } from '@syncfusion/ej2-grids';
import { isRemoteData, isOffline, getParentData, getExpandStatus } from '../utils';
import { isNullOrUndefined, setValue, extend } from '@syncfusion/ej2-base';
import { DataManager, Query } from '@syncfusion/ej2-data';
import * as event from '../base/constant';
/**
 * TreeGrid Excel Export module
 *
 * @hidden
 */
var ExcelExport = /** @class */ (function () {
    /**
     * Constructor for Excel Export module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function ExcelExport(parent) {
        this.isCollapsedStatePersist = false;
        Grid.Inject(GridExcel);
        this.parent = parent;
        this.dataResults = {};
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @private
     * @returns {string} Returns ExcelExport module name
     */
    ExcelExport.prototype.getModuleName = function () {
        return 'ExcelExport';
    };
    /**
     * @hidden
     * @returns {void}
     */
    ExcelExport.prototype.addEventListener = function () {
        this.parent.on('updateResults', this.updateExcelResultModel, this);
        this.parent.on('excelCellInfo', this.excelQueryCellInfo, this);
        this.parent.grid.on('export-RowDataBound', this.exportRowDataBound, this);
        this.parent.grid.on('finalPageSetup', this.finalPageSetup, this);
    };
    /**
     * To destroy the Excel Export
     *
     * @returns {void}
     * @hidden
     */
    ExcelExport.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {void}
     */
    ExcelExport.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off('updateResults', this.updateExcelResultModel);
        this.parent.off('excelCellInfo', this.excelQueryCellInfo);
        this.parent.grid.off('export-RowDataBound', this.exportRowDataBound);
        this.parent.grid.off('finalPageSetup', this.finalPageSetup);
    };
    ExcelExport.prototype.updateExcelResultModel = function (returnResult) {
        this.dataResults = returnResult;
    };
    ExcelExport.prototype.Map = function (excelExportProperties, 
    /* eslint-disable-next-line */
    isMultipleExport, workbook, isBlob, isCsv) {
        var _this = this;
        var dataSource = this.parent.dataSource;
        var data = new Data(this.parent.grid);
        var property = Object();
        setValue('isCsv', isCsv, property);
        setValue('cancel', false, property);
        if (!isNullOrUndefined(excelExportProperties)) {
            this.isCollapsedStatePersist = excelExportProperties.isCollapsedStatePersist;
        }
        if (!isNullOrUndefined(excelExportProperties)) {
            if (!isNullOrUndefined(excelExportProperties.dataSource) && !excelExportProperties.dataSource['dataSource']) {
                return this.parent.grid.excelExportModule.Map(this.parent.grid, excelExportProperties, isMultipleExport, workbook, isCsv, isBlob);
            }
            if (excelExportProperties.exportType === 'CurrentPage') {
                excelExportProperties.dataSource = this.parent.getCurrentViewRecords();
                return this.parent.grid.excelExportModule.Map(this.parent.grid, excelExportProperties, isMultipleExport, workbook, isCsv, isBlob);
            }
        }
        return new Promise(function (resolve) {
            var dm = _this.isLocal() && !(dataSource instanceof DataManager) ? new DataManager(dataSource)
                : _this.parent.dataSource;
            var query = new Query();
            if (!_this.isLocal()) {
                query = _this.generateQuery(query);
                query.queries = _this.parent.grid.getDataModule().generateQuery().queries;
                query = ExportHelper.getQuery(_this.parent.grid, data);
                if (isNullOrUndefined(_this.parent.filterModule)) {
                    query.queries = query.queries.slice(1, 2);
                    query.params = query.params.slice(0, 0);
                }
                setValue('query', query, property);
            }
            _this.parent.trigger(event.beforeExcelExport, extend(property, excelExportProperties));
            if (getObject('cancel', property)) {
                return null;
            }
            dm.executeQuery(query).then(function (e) {
                var customData = null;
                if (!isNullOrUndefined(excelExportProperties) && !isNullOrUndefined(excelExportProperties.dataSource)) {
                    customData = excelExportProperties.dataSource;
                }
                excelExportProperties = _this.manipulateExportProperties(excelExportProperties, dataSource, e);
                return _this.parent.grid.excelExportModule.Map(_this.parent.grid, excelExportProperties, isMultipleExport, workbook, isCsv, isBlob).then(function (book) {
                    if (customData != null) {
                        excelExportProperties.dataSource = customData;
                    }
                    else {
                        delete excelExportProperties.dataSource;
                    }
                    resolve(book);
                });
            });
        });
    };
    ExcelExport.prototype.generateQuery = function (query, property) {
        if (!isNullOrUndefined(property) && property.exportType === 'CurrentPage'
            && this.parent.allowPaging) {
            property.exportType = 'AllPages';
            query.addParams('ExportType', 'CurrentPage');
            query.where(this.parent.parentIdMapping, 'equal', null);
            query = getObject('grid.renderModule.data.pageQuery', this.parent)(query);
        }
        return query;
    };
    ExcelExport.prototype.manipulateExportProperties = function (property, dtSrc, queryResult) {
        //count not required for this query
        var args = Object();
        if (!isNullOrUndefined(this.parent.grid.getDataModule())) {
            setValue('query', this.parent.grid.getDataModule().generateQuery(true), args);
        }
        setValue('isExport', true, args);
        if (!isNullOrUndefined(property) && !isNullOrUndefined(property.exportType)) {
            setValue('exportType', property.exportType, args);
        }
        if (!this.isLocal()) {
            this.parent.parentData = [];
            this.parent.dataModule.convertToFlatData(getObject('result', queryResult));
            setValue('expresults', this.parent.flatData, args);
        }
        this.parent.notify('dataProcessor', args);
        //args = this.parent.dataModule.dataProcessor(args);
        args = this.dataResults;
        dtSrc = isNullOrUndefined(args.result) ? this.parent.flatData.slice(0) : args.result;
        if (!this.isLocal()) {
            this.parent.flatData = [];
        }
        if (property && property.dataSource) {
            var flatsData = this.parent.flatData;
            var dataSrc = property.dataSource instanceof DataManager ? property.dataSource.dataSource.json : property.dataSource;
            this.parent.dataModule.convertToFlatData(dataSrc);
            dtSrc = this.parent.flatData;
            this.parent.flatData = flatsData;
        }
        property = isNullOrUndefined(property) ? Object() : property;
        property.dataSource = new DataManager({ json: dtSrc });
        if (this.parent.aggregates.length > 0) {
            property.query = args['query'];
        }
        return property;
    };
    /**
     * TreeGrid Excel Export cell modifier
     *
     * @param {ExcelQueryCellInfoEventArgs} args - current cell details
     * @hidden
     * @returns {void}
     */
    ExcelExport.prototype.excelQueryCellInfo = function (args) {
        if (this.parent.grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex) {
            var style = {};
            var data = args.data;
            var ispadfilter = isNullOrUndefined(data.filterLevel);
            var pad = ispadfilter ? data.level : data.filterLevel;
            style.indent = pad;
            args.style = style;
        }
        this.parent.notify('updateResults', args);
        this.parent.trigger('excelQueryCellInfo', args);
    };
    ExcelExport.prototype.exportRowDataBound = function (excelRow) {
        if (excelRow.type === 'excel') {
            var excelrowobj = excelRow.rowObj.data;
            var filtercolumnlength = this.parent.grid.filterSettings.columns.length;
            var rowlength = excelRow.excelRows.length;
            var rowlevel = excelrowobj.level;
            if (excelrowobj.parentItem && getParentData(this.parent, excelrowobj.parentItem.uniqueID, Boolean(filtercolumnlength))) {
                var expandedStatus = false;
                var sublevelState = false;
                var state = getExpandStatus(this.parent, excelrowobj, this.parent.parentData);
                if (this.isCollapsedStatePersist && (!state || !this.parent.isLocalData)) {
                    expandedStatus = true;
                    sublevelState = excelrowobj.expanded ? false : true;
                }
                excelRow.excelRows[rowlength - 1].grouping = { outlineLevel: rowlevel, isCollapsed: sublevelState,
                    isHidden: expandedStatus };
            }
            else if (excelrowobj.hasChildRecords && isNullOrUndefined(excelrowobj.parentItem)) {
                excelRow.excelRows[rowlength - 1].grouping = { outlineLevel: rowlevel };
            }
        }
    };
    /* eslint-disable-next-line */
    ExcelExport.prototype.finalPageSetup = function (workbook) {
        for (var i = 0; i < workbook.worksheets.length; i++) {
            if (workbook.worksheets[parseInt(i.toString(), 10)].rows) {
                workbook.worksheets[parseInt(i.toString(), 10)].pageSetup = { isSummaryRowBelow: false };
            }
        }
    };
    ExcelExport.prototype.isLocal = function () {
        return !isRemoteData(this.parent) && isOffline(this.parent);
    };
    return ExcelExport;
}());
export { ExcelExport };
