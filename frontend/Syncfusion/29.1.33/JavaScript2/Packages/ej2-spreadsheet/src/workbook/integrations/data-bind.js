import { DataManager, Query, Deferred } from '@syncfusion/ej2-data';
import { getCell, setCell, isFilterHidden } from '../base/index';
import { getRangeIndexes, checkIsFormula, updateSheetFromDataSource, dataSourceChanged } from '../common/index';
import { getCellIndexes, dataChanged, getCellAddress, isInRange } from '../common/index';
import { triggerDataChange, getAutoDetectFormatParser, updateView } from '../index';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Data binding module
 */
var DataBind = /** @class */ (function () {
    function DataBind(parent) {
        this.parent = parent;
        this.requestedInfo = [];
        this.addEventListener();
    }
    DataBind.prototype.addEventListener = function () {
        this.parent.on(updateSheetFromDataSource, this.updateSheetFromDataSourceHandler, this);
        this.parent.on(dataSourceChanged, this.dataSourceChangedHandler, this);
        this.parent.on(dataChanged, this.dataChangedHandler, this);
        this.parent.on(triggerDataChange, this.triggerDataChangeHandler, this);
    };
    DataBind.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(updateSheetFromDataSource, this.updateSheetFromDataSourceHandler);
            this.parent.off(dataSourceChanged, this.dataSourceChangedHandler);
            this.parent.off(dataChanged, this.dataChangedHandler);
            this.parent.off(triggerDataChange, this.triggerDataChangeHandler);
        }
    };
    /**
     * Update given data source to sheet.
     *
     * @param {Object} args - Specify the args.
     * @param {ExtendedSheet} args.sheet - Specify the sheet.
     * @param {number[]} args.indexes - Specify the indexes.
     * @param {Promise<CellModel>} args.promise - Specify the promise.
     * @param {number} args.rangeSettingCount - Specify the rangeSettingCount.
     * @param {string} args.formulaCellRef - Specify the formulaCellRef.
     * @param {number} args.sheetIndex - Specify the sheetIndex.
     * @param {boolean} args.loadFullData - Specify whether to load full data or not.
     * @param {boolean} args.resolveAfterFullDataLoaded - Specify the resolveAfterFullDataLoaded.
     * @param {Function} args.loadComplete - Specify the callback function that will be invoked once all the data are updated.
     * @param {boolean} args.loadFromStartCell - Specify the whether to load the data from the range startCell address.
     * @param {boolean} args.autoDetectFormat - Specify whether to auto detect format based on the cell value.
     * @param {Function} args.updateDependentCellsCallback - Specify a callback function to update the dependent cells address to refresh
     * after the data binding.
     * @returns {void} - Update given data source to sheet.
     */
    DataBind.prototype.updateSheetFromDataSourceHandler = function (args) {
        var _this = this;
        var cell;
        var flds;
        var sCellIdx;
        var result;
        var remoteUrl;
        var isLocal;
        var dataManager;
        var requestedRange = [];
        var sRanges = [];
        var rowIdx;
        var colIdx;
        var deferred = new Deferred();
        var sRowIdx;
        var sColIdx;
        var loadedInfo;
        args.promise = deferred.promise;
        var startCellIndexes;
        var autoDetectFormat = args.autoDetectFormat;
        var autoDetectFormatFn = autoDetectFormat && getAutoDetectFormatParser(this.parent);
        if (args.sheet && args.sheet.ranges.length) {
            var prevVal_1;
            var _loop_1 = function (k) {
                var range = args.sheet.ranges[k];
                startCellIndexes = getRangeIndexes(range.startCell);
                if (args.loadFromStartCell) {
                    args.indexes = startCellIndexes;
                }
                var sRange = args.indexes[0];
                var eRange = args.indexes[2];
                sRowIdx = startCellIndexes[0];
                dataManager = range.dataSource instanceof DataManager ? range.dataSource
                    : range.dataSource ? new DataManager(range.dataSource) : new DataManager();
                remoteUrl = remoteUrl || dataManager.dataSource.url;
                args.sheet.isLocalData = isLocal || !dataManager.dataSource.url;
                if (sRowIdx <= sRange) {
                    sRange = sRange - sRowIdx;
                }
                else {
                    if (sRowIdx <= eRange) {
                        eRange = eRange - sRowIdx;
                        sRange = 0;
                    }
                    else {
                        sRange = -1;
                    }
                }
                if (range.showFieldAsHeader && sRange !== 0) {
                    sRange -= 1;
                }
                var isEndReached = false;
                var insertRowCount = 0;
                this_1.initRangeInfo(range);
                var count = this_1.getMaxCount(range);
                loadedInfo = this_1.getLoadedInfo(sRange, eRange, range);
                sRange = loadedInfo.unloadedRange[0];
                eRange = loadedInfo.unloadedRange[1];
                if (range.info.insertRowRange) {
                    range.info.insertRowRange.forEach(function (range) {
                        insertRowCount += ((range[1] - range[0]) + 1);
                    });
                    sRange -= insertRowCount;
                    eRange -= insertRowCount;
                }
                if (sRange >= count) {
                    isEndReached = true;
                }
                else if (eRange > count) {
                    eRange = count;
                }
                if (!args.loadComplete) {
                    this_1.requestedInfo.push({ deferred: deferred, indexes: args.indexes, isNotLoaded: loadedInfo.isNotLoaded });
                }
                if (sRange >= 0 && loadedInfo.isNotLoaded && !isEndReached) {
                    sRanges[k] = sRange;
                    requestedRange[k] = false;
                    var fieldsOrder_1;
                    if (range.fieldsOrder) {
                        fieldsOrder_1 = [].slice.call(range.fieldsOrder);
                    }
                    var query = (range.query ? range.query : new Query()).clone();
                    if (!args.loadFullData) {
                        query = query.range(sRange, eRange >= count ? eRange : eRange + 1);
                    }
                    dataManager.executeQuery(query.requiresCount()).then(function (e) {
                        if (!_this.parent || _this.parent.isDestroyed) {
                            return;
                        }
                        result = (e.result && e.result.result ? e.result.result : e.result);
                        sCellIdx = getRangeIndexes(range.startCell);
                        sRowIdx = sCellIdx[0];
                        sColIdx = sCellIdx[1];
                        if (result && result.length) {
                            if (!range.info.count) {
                                count = e.count;
                                range.info.count = e.count;
                            }
                            flds = range.info.flds || fieldsOrder_1 || Object.keys(result[0]);
                            if (!range.info.fldLen) {
                                range.info.fldLen = flds.length;
                                range.info.flds = flds;
                            }
                            if (range.info.insertColumnRange) {
                                var insertCount_1 = 0;
                                range.info.insertColumnRange.forEach(function (insertRange) {
                                    for (var i = insertRange[0]; i <= insertRange[1]; i++) {
                                        if (i <= sColIdx) {
                                            flds.splice(0, 0, "emptyCell" + insertCount_1);
                                        }
                                        else {
                                            flds.splice(i - sColIdx, 0, "emptyCell" + insertCount_1);
                                        }
                                        insertCount_1++;
                                    }
                                });
                            }
                            if (sRanges[k] === 0 && range.showFieldAsHeader) {
                                rowIdx = sRowIdx + sRanges[k] + insertRowCount;
                                flds.forEach(function (field, i) {
                                    cell = getCell(rowIdx, sColIdx + i, args.sheet, true);
                                    if (!cell) {
                                        args.sheet.rows[sRowIdx + sRanges[k]].cells[sColIdx + i] = field.includes('emptyCell') ? {}
                                            : { value: field };
                                    }
                                    else if (!field.includes('emptyCell')) {
                                        cell.value = field;
                                    }
                                });
                            }
                            result.forEach(function (item, i) {
                                rowIdx = sRowIdx + sRanges[k] + i + (range.showFieldAsHeader ? 1 : 0) + insertRowCount;
                                flds.forEach(function (field, idx) {
                                    colIdx = sColIdx + idx;
                                    cell = getCell(rowIdx, colIdx, args.sheet, true);
                                    if (cell) {
                                        prevVal_1 = cell.value;
                                        if (!field.includes('emptyCell')) {
                                            setCell(rowIdx, colIdx, args.sheet, _this.getCellDataFromProp(item[field]), true);
                                        }
                                    }
                                    else {
                                        prevVal_1 = undefined;
                                        cell = args.sheet.rows[rowIdx].cells[colIdx] =
                                            field.includes('emptyCell') ? {} : _this.getCellDataFromProp(item[field]);
                                    }
                                    if (autoDetectFormat) {
                                        autoDetectFormatFn(cell);
                                    }
                                    if (args.updateDependentCellsCallback && prevVal_1 !== cell.value) {
                                        args.updateDependentCellsCallback(rowIdx, colIdx);
                                    }
                                });
                            });
                        }
                        else {
                            flds = [];
                        }
                        var totalRows;
                        if ((sRowIdx + (count || e.count)) > 0) {
                            totalRows = (sRowIdx + (count || e.count) + (range.showFieldAsHeader ? 1 : 0) + insertRowCount) - 1;
                        }
                        else {
                            totalRows = args.sheet.usedRange.rowIndex;
                        }
                        var totalCols = sColIdx + flds.length - 1 < 0 ? args.sheet.usedRange.colIndex : sColIdx + flds.length - 1;
                        if (args.loadFullData) {
                            eRange = totalRows;
                        }
                        var usedRange = { rowIndex: totalRows, colIndex: totalCols };
                        if (_this.parent.scrollSettings && _this.parent.scrollSettings.isFinite) {
                            usedRange.rowIndex = totalRows < args.sheet.rowCount ? totalRows : args.sheet.rowCount - 1;
                            usedRange.colIndex = totalCols < args.sheet.colCount ? totalCols : args.sheet.colCount - 1;
                        }
                        if (args.sheet.usedRange.rowIndex < usedRange.rowIndex) {
                            _this.parent.setSheetPropertyOnMute(args.sheet, 'usedRange', { rowIndex: usedRange.rowIndex, colIndex: args.sheet.usedRange.colIndex });
                        }
                        if (args.sheet.usedRange.colIndex < usedRange.colIndex) {
                            _this.parent.setSheetPropertyOnMute(args.sheet, 'usedRange', { rowIndex: args.sheet.usedRange.rowIndex, colIndex: usedRange.colIndex });
                        }
                        if (insertRowCount) {
                            loadedInfo = _this.getLoadedInfo(sRange, eRange, range);
                            sRange = loadedInfo.unloadedRange[0];
                            eRange = loadedInfo.unloadedRange[1];
                            if (sRange > count) {
                                loadedInfo.isNotLoaded = false;
                            }
                            if (loadedInfo.isNotLoaded) {
                                if (eRange > count) {
                                    eRange = count;
                                }
                                range.info.loadedRange.push([sRange, eRange]);
                            }
                        }
                        else {
                            range.info.loadedRange.push([sRange, eRange]);
                        }
                        requestedRange[k] = true;
                        if (requestedRange.indexOf(false) === -1) {
                            var dataLoading = void 0;
                            if (eRange + sRowIdx < sRowIdx + range.info.count) {
                                if (!args.rangeSettingCount) {
                                    args.rangeSettingCount = [];
                                }
                                args.rangeSettingCount.push(k);
                                dataLoading = true;
                                //if (remoteUrl) {
                                var unloadedArgs = {
                                    sheet: args.sheet, indexes: [0, 0, totalRows, totalCols],
                                    promise: new Promise(function (resolve) { resolve((function () { })()); }),
                                    rangeSettingCount: args.rangeSettingCount, loadComplete: args.loadComplete,
                                    autoDetectFormat: args.autoDetectFormat, resolveAfterFullDataLoaded: args.resolveAfterFullDataLoaded
                                };
                                _this.updateSheetFromDataSourceHandler(unloadedArgs);
                                unloadedArgs.promise.then(function () {
                                    if (_this.parent.getModuleName() === 'workbook') {
                                        return;
                                    }
                                    args.rangeSettingCount.pop();
                                    if (!args.rangeSettingCount.length) {
                                        _this.parent.notify('created', null);
                                    }
                                    if (args.formulaCellRef) {
                                        _this.notfyFormulaCellRefresh(args.formulaCellRef, args.sheetIndex);
                                    }
                                    else if (args.loadComplete) {
                                        args.loadComplete();
                                    }
                                });
                                //}
                            }
                            else if (args.formulaCellRef) {
                                _this.notfyFormulaCellRefresh(args.formulaCellRef, args.sheetIndex);
                            }
                            else if (args.loadComplete) {
                                args.loadComplete();
                            }
                            if (!(dataLoading && args.resolveAfterFullDataLoaded)) {
                                _this.checkResolve(args.indexes);
                                if (args.resolveAfterFullDataLoaded) {
                                    _this.checkResolve([0, 0, 0, 0]);
                                }
                            }
                        }
                    });
                }
                else if (k === 0 && requestedRange.indexOf(false) === -1) {
                    if (args.loadComplete) {
                        args.loadComplete();
                    }
                    this_1.checkResolve(args.indexes);
                }
            };
            var this_1 = this;
            for (var k = args.sheet.ranges.length - 1; k >= 0; k--) {
                _loop_1(k);
            }
        }
        else {
            deferred.resolve();
        }
    };
    DataBind.prototype.notfyFormulaCellRefresh = function (formulaCellRef, sheetIndex) {
        this.parent.formulaRefCell = null;
        this.parent.notify(updateView, { indexes: getRangeIndexes(formulaCellRef), sheetIndex: sheetIndex, refreshing: true });
    };
    DataBind.prototype.checkResolve = function (indexes) {
        var resolved;
        var isSameRng;
        var cnt = 0;
        this.requestedInfo.forEach(function (info, idx) {
            isSameRng = JSON.stringify(info.indexes) === JSON.stringify(indexes);
            if (isSameRng || resolved) {
                if (idx === 0) {
                    info.deferred.resolve();
                    cnt++;
                    resolved = true;
                }
                else {
                    if (resolved && (info.isLoaded || !info.isNotLoaded)) {
                        info.deferred.resolve();
                        cnt++;
                    }
                    else if (isSameRng && resolved) {
                        info.deferred.resolve();
                        cnt++;
                    }
                    else if (isSameRng) {
                        info.isLoaded = true;
                    }
                    else {
                        resolved = false;
                    }
                }
            }
        });
        this.requestedInfo.splice(0, cnt);
    };
    DataBind.prototype.getCellDataFromProp = function (prop) {
        var data = {};
        if (Object.prototype.toString.call(prop) === '[object Object]') {
            if (prop.formula) {
                data.formula = prop.formula;
            }
            else if (!isNullOrUndefined(prop.value)) {
                if (typeof (prop.value) === 'string') {
                    if (prop.value.indexOf('http://') === 0 || prop.value.indexOf('https://') === 0 ||
                        prop.value.indexOf('ftp://') === 0 || prop.value.indexOf('www.') === 0) {
                        data.hyperlink = prop.value;
                        data.style = { textDecoration: 'underline', color: '#00e' };
                    }
                    else {
                        data.value = prop.value;
                    }
                }
                else {
                    data.value = prop.value;
                }
            }
        }
        else {
            if (checkIsFormula(prop)) {
                data.formula = prop;
            }
            else {
                if (typeof (prop) === 'string') {
                    if (prop.indexOf('http://') === 0 || prop.indexOf('https://') === 0 ||
                        prop.indexOf('ftp://') === 0 || prop.indexOf('www.') === 0) {
                        data.hyperlink = prop;
                        data.style = { textDecoration: 'underline', color: '#00e' };
                    }
                    else {
                        data.value = prop;
                    }
                }
                else {
                    data.value = prop;
                }
            }
        }
        return data;
    };
    DataBind.prototype.getLoadedInfo = function (sRange, eRange, range) {
        var isNotLoaded = true;
        range.info.loadedRange.forEach(function (range) {
            if (range[0] <= sRange && sRange <= range[1]) {
                if (range[0] <= eRange && eRange <= range[1]) {
                    isNotLoaded = false;
                }
                else {
                    sRange = range[1] + 1;
                }
            }
            else if (range[0] <= eRange && eRange <= range[1]) {
                eRange = range[0] - 1;
            }
        });
        return { isNotLoaded: isNotLoaded, unloadedRange: [sRange, eRange] };
    };
    DataBind.prototype.getMaxCount = function (range) {
        if (range.query) {
            var query = range.query.queries;
            for (var i = 0; i < query.length; i++) {
                if (query[i].fn === 'onTake') {
                    return Math.min(query[i].e.nos, range.info.count || query[i].e.nos);
                }
            }
        }
        return range.info.count;
    };
    DataBind.prototype.initRangeInfo = function (range) {
        if (!range.info) {
            range.info = { loadedRange: [] };
        }
    };
    /**
     * Remove old data from sheet.
     *
     * @param {Object} args - Specify the args.
     * @param {number} args.sheetIdx - Specify the sheetIdx.
     * @param {number} args.rangeIdx - Specify the rangeIdx.
     * @param {Object[]} args.changedData - Specify the changedData.
     * @returns {void} - Remove old data from sheet.
     */
    DataBind.prototype.dataSourceChangedHandler = function (args) {
        var _this = this;
        var row;
        var sheet = this.parent.sheets[args.sheetIdx];
        var range = sheet.ranges[args.rangeIdx];
        if (range && (this.checkRangeHasChanges(sheet, args.rangeIdx) || !range.info)) {
            var showFieldAsHeader_1 = range.showFieldAsHeader;
            var indexes_1 = getCellIndexes(range.startCell);
            if (range.info) {
                range.info.loadedRange.forEach(function (loadedRange) {
                    for (var i = loadedRange[0]; i <= loadedRange[1] && (i < range.info.count + (showFieldAsHeader_1 ? 1 : 0)); i++) {
                        row = sheet.rows[i + indexes_1[0]];
                        if (row) {
                            for (var j = indexes_1[1]; j < indexes_1[1] + range.info.fldLen; j++) {
                                if (row.cells && row.cells[j]) {
                                    delete row.cells[j];
                                }
                            }
                        }
                    }
                });
                range.info = null;
            }
            var evtArgs = {
                sheet: sheet, indexes: [0, 0, sheet.rowCount - 1, sheet.colCount - 1], loadFullData: true,
                promise: new Promise(function (resolve) { resolve((function () { })()); })
            };
            this.updateSheetFromDataSourceHandler(evtArgs);
            evtArgs.promise.then(function () {
                _this.parent.trigger('dataSourceChanged', { data: args.changedData, action: 'dataSourceChanged', rangeIndex: args.rangeIdx,
                    sheetIndex: args.sheetIdx });
                _this.parent.notify(updateView, { sheetIndex: args.sheetIdx, checkWrap: true, checkCF: true });
            });
        }
    };
    DataBind.prototype.checkRangeHasChanges = function (sheet, rangeIdx) {
        if (this.parent.isAngular) {
            if (sheet['changedRangeIdx'] === rangeIdx) {
                delete sheet['changedRangeIdx'];
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Triggers dataSourceChange event when cell data changes
     *
     * @param {Object} args - Specify the args.
     * @param {number} args.sheetIdx - Specify the sheetIdx.
     * @param {number} args.activeSheetIndex - Specify the activeSheetIndex.
     * @param {string} args.address - Specify the address.
     * @param {number} args.startIndex - Specify the startIndex.
     * @param {number} args.endIndex - Specify the endIndex.
     * @param {string} args.modelType - Specify the modelType.
     * @param {RowModel[]} args.deletedModel - Specify the deletedModel.
     * @param {RowModel[]} args.model - Specify the model.
     * @param {string} args.insertType - Specify the insertType.
     * @param {number} args.index - Specify the index.
     * @param {string} args.type - Specify the type.
     * @param {boolean} args.isMethod - Specify the isMethod.
     * @param {string} args.fillRange - Specify the fill range.
     * @param {string} args.range - Specify the range.
     * @param {string} args.requestType - Specify the requestType.
     * @param {Object[]} args.data - Specify the data.
     * @param {boolean}  args.isDataRequest - Specify the isDataRequest.
     * @param {string} args.pastedRange - Specify the pasted range.
     * @param {boolean} args.skipFilterCheck - Specify the skip filter check.
     * @returns {void} - Triggers dataSourceChange event when cell data changes
     */
    DataBind.prototype.dataChangedHandler = function (args) {
        var _this = this;
        var changedData = [{}];
        var action;
        var cell;
        var dataRange;
        var startCell;
        var inRange;
        var inRangeCut;
        var deleteRowDetails;
        var sheetIdx = args.sheetIdx === undefined ? this.parent.activeSheetIndex : args.sheetIdx;
        var sheet = this.parent.sheets[sheetIdx];
        var cellIndices;
        var cutIndices;
        sheet.ranges.forEach(function (range, idx) {
            if (range.dataSource) {
                var isNewRow = void 0;
                startCell = getCellIndexes(range.startCell);
                dataRange = startCell.concat([startCell[0] + range.info.count + (range.showFieldAsHeader ? 0 : -1),
                    startCell[1] + range.info.fldLen - 1]);
                if (args.modelType === 'Row' || args.modelType === 'Column') {
                    if (args.modelType === 'Column') {
                        if (args.insertType) {
                            inRange = dataRange[1] < args.index && dataRange[3] >= args.index;
                            cellIndices = [args.index];
                            if (!inRange) {
                                if ((dataRange[3] + 1 === args.index && args.insertType === 'after')) {
                                    args.model.forEach(function () {
                                        range.info.flds.splice(args.index - startCell[1], 0, '');
                                    });
                                    range.info.fldLen += args.model.length;
                                }
                                else if (dataRange[1] >= args.index) {
                                    range.startCell = getCellAddress(startCell[0], startCell[1] + args.model.length);
                                }
                            }
                            else {
                                args.model.forEach(function () {
                                    range.info.flds.splice(args.index - startCell[1], 0, '');
                                });
                                range.info.fldLen += args.model.length;
                            }
                        }
                        else {
                            inRange = dataRange[1] <= args.startIndex && dataRange[3] >= args.startIndex;
                            if (inRange) {
                                for (var i = args.startIndex; i <= args.endIndex; i++) {
                                    if (i <= dataRange[3]) {
                                        range.info.flds.splice(args.startIndex, 1);
                                        range.info.fldLen -= 1;
                                    }
                                }
                            }
                        }
                        return;
                    }
                    else {
                        if (args.insertType) {
                            inRange = ((!range.showFieldAsHeader && (args.insertType === 'above' || args.isMethod)) ? dataRange[0] <=
                                args.index : dataRange[0] < args.index) && dataRange[2] >= args.index;
                            cellIndices = [args.index];
                            if (!inRange) {
                                if ((dataRange[2] + 1 === args.index && args.insertType === 'below')) {
                                    isNewRow = true;
                                    range.info.count += args.model.length;
                                }
                                else if (dataRange[0] >= args.index) {
                                    range.startCell = getCellAddress(startCell[0] + args.model.length, startCell[1]);
                                }
                            }
                            else {
                                isNewRow = true;
                                range.info.count += args.model.length;
                            }
                            if (args.isMethod) {
                                return;
                            }
                        }
                        else {
                            inRange = dataRange[0] <= args.startIndex && dataRange[2] >= args.startIndex;
                            if (args.isDataRequest) {
                                cellIndices = [args.startIndex, dataRange[1], args.startIndex, dataRange[1]];
                            }
                            else {
                                action = 'delete';
                            }
                        }
                    }
                }
                else {
                    var argsAddress = args.address || args.range || args.fillRange;
                    cellIndices = getRangeIndexes(args.requestType && args.requestType.toLowerCase().includes('paste') ? args.pastedRange.substring(args.pastedRange.lastIndexOf('!') + 1) :
                        args.sheetIdx > -1 ? args.address : argsAddress.substring(argsAddress.lastIndexOf('!') + 1));
                    var dataRangeIndices = [range.showFieldAsHeader ? dataRange[0] + 1 : dataRange[0]].concat(dataRange.slice(1, 4));
                    if (range.showFieldAsHeader && cellIndices[0] === startCell[0]) {
                        for (var i = cellIndices[1]; i <= cellIndices[3]; i++) {
                            if (i >= dataRangeIndices[1] && i <= dataRangeIndices[3]) {
                                range.info.flds[i - startCell[1]] = getCell(startCell[0], i, sheet, false, true).value || '';
                            }
                        }
                    }
                    inRange = isInRange(dataRangeIndices, cellIndices, true);
                    if (args.requestType === 'paste' && args.copiedInfo.isCut) {
                        cutIndices = [].slice.call(args.copiedInfo.range);
                        if (range.showFieldAsHeader && cutIndices[0] === startCell[0]) {
                            for (var i = cutIndices[1]; i <= cutIndices[3]; i++) {
                                if (i >= dataRangeIndices[1] && i <= dataRangeIndices[3]) {
                                    range.info.flds[i - startCell[1]] = '';
                                }
                            }
                            inRange = false;
                        }
                        inRangeCut = isInRange(dataRangeIndices, cutIndices, true);
                    }
                }
                if (inRange || isNewRow || inRangeCut) {
                    if (args.modelType === 'Row' && !args.insertType && !args.isDataRequest) {
                        args.deletedModel.forEach(function (row, rowIdx) {
                            changedData[rowIdx] = {};
                            range.info.flds.forEach(function (fld, idx) {
                                if (row.cells) {
                                    cell = row.cells[startCell[1] + idx];
                                    changedData[rowIdx]["" + fld] = _this.getFormattedValue(cell);
                                }
                                else {
                                    changedData[rowIdx]["" + fld] = null;
                                }
                            });
                            range.info.count -= 1;
                        });
                        if (args.isMethod) {
                            return;
                        }
                        deleteRowDetails = { count: args.deletedModel.length, index: args.endIndex };
                    }
                    else {
                        action = isNewRow ? 'add' : 'edit';
                        var addedCutData_1 = 0;
                        if (inRangeCut) {
                            addedCutData_1 = cutIndices[2] - cutIndices[0] + 1;
                            var _loop_2 = function (i) {
                                changedData[i] = {};
                                range.info.flds.forEach(function (fld, idx) {
                                    if (fld) {
                                        cell = getCell(cutIndices[0] + i, startCell[1] + idx, sheet);
                                        changedData[i]["" + fld] = _this.getFormattedValue(cell);
                                    }
                                });
                            };
                            for (var i = 0; i < addedCutData_1; i++) {
                                _loop_2(i);
                            }
                        }
                        if (inRange || isNewRow) {
                            var filterCheck = !args.isDataRequest && !inRangeCut && !isNewRow && !args.skipFilterCheck;
                            var _loop_3 = function (i, count) {
                                if (filterCheck && isFilterHidden(sheet, cellIndices[0] + i)) {
                                    return out_count_1 = count, "continue";
                                }
                                changedData[count + addedCutData_1] = {};
                                range.info.flds.forEach(function (fld, idx) {
                                    if (fld) {
                                        cell = getCell(cellIndices[0] + i, startCell[1] + idx, sheet);
                                        changedData[count + addedCutData_1]["" + fld] = _this.getFormattedValue(cell);
                                    }
                                });
                                count++;
                                out_count_1 = count;
                            };
                            var out_count_1;
                            for (var i = 0, count = 0; i < (isNewRow ? args.model.length : (cellIndices[2] - cellIndices[0])
                                + 1 || 1); i++) {
                                _loop_3(i, count);
                                count = out_count_1;
                            }
                        }
                    }
                    if (args.isDataRequest) {
                        args.data = changedData;
                    }
                    else {
                        _this.parent.trigger('dataSourceChanged', { data: changedData, action: action, rangeIndex: idx, sheetIndex: sheetIdx });
                    }
                }
                else if (deleteRowDetails && deleteRowDetails.count && dataRange[0] > deleteRowDetails.index) {
                    range.startCell = getCellAddress(startCell[0] - deleteRowDetails.count, startCell[1]);
                }
            }
        });
    };
    DataBind.prototype.getFormattedValue = function (cell) {
        var value = this.parent.getDisplayText(cell);
        if (value === '') {
            return null;
        }
        else if (cell && !cell.format && typeof cell.value === 'number') {
            return cell.value;
        }
        return value;
    };
    DataBind.prototype.triggerDataChangeHandler = function (args) {
        var dataChangingActions = ['insert', 'delete', 'edit', 'cellDelete', 'cellSave', 'autofill', 'clipboard', 'clear'];
        var triggerDataChange = true;
        if ((args.action === 'delete' || args.action === 'insert') && ['Sheet'].indexOf(args.eventArgs.modelType) > -1) {
            triggerDataChange = false;
        }
        else if (args.action === 'clear' && ['Clear Formats', 'Clear Hyperlinks'].indexOf(args.eventArgs.type) > -1) {
            triggerDataChange = false;
        }
        else if (args.action === 'clipboard' && args.eventArgs.requestType === 'Formats') {
            triggerDataChange = false;
        }
        if (triggerDataChange && dataChangingActions.indexOf(args.action) > -1) {
            var evtArgs = void 0;
            if (args.isUndo && (args.action === 'delete' || args.action === 'insert')) {
                evtArgs = extend({}, args.eventArgs);
                if (args.action === 'delete') {
                    evtArgs.index = evtArgs.startIndex;
                    evtArgs.model = evtArgs.deletedModel;
                    evtArgs.insertType = 'below';
                }
                else {
                    evtArgs.startIndex = evtArgs.index;
                    evtArgs.endIndex = args.eventArgs.index + args.eventArgs.model.length - 1;
                    evtArgs.deletedModel = evtArgs.model;
                    delete evtArgs.insertType;
                }
            }
            else {
                evtArgs = args.eventArgs;
            }
            this.parent.notify(dataChanged, evtArgs);
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    DataBind.prototype.getModuleName = function () {
        return 'dataBind';
    };
    /**
     * Destroys the Data binding module.
     *
     * @returns {void} - Destroys the Data binding module.
     */
    DataBind.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
        this.requestedInfo = [];
    };
    return DataBind;
}());
export { DataBind };
