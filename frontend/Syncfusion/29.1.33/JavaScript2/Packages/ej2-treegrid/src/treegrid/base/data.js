import { extend, isNullOrUndefined, setValue, getValue, addClass, removeClass } from '@syncfusion/ej2-base';
import { DataManager, Query, DataUtil } from '@syncfusion/ej2-data';
import { showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { getObject, getUid } from '@syncfusion/ej2-grids';
import { isRemoteData, isOffline, isCountRequired, getExpandStatus } from '../utils';
import * as events from './constant';
/**
 * Internal dataoperations for tree grid
 *
 * @hidden
 */
var DataManipulation = /** @class */ (function () {
    function DataManipulation(grid) {
        this.addedRecords = 'addedRecords';
        this.parent = grid;
        this.parentItems = [];
        this.taskIds = [];
        this.hierarchyData = [];
        this.storedIndex = -1;
        this.sortedData = [];
        this.isSortAction = false;
        this.addEventListener();
        this.dataResults = {};
        this.isSelfReference = !isNullOrUndefined(this.parent.parentIdMapping);
    }
    /**
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.addEventListener = function () {
        this.parent.on('updateRemoteLevel', this.updateParentRemoteData, this);
        this.parent.grid.on('sorting-begin', this.beginSorting, this);
        this.parent.on('updateAction', this.updateData, this);
        this.parent.on(events.remoteExpand, this.collectExpandingRecs, this);
        this.parent.on('dataProcessor', this.dataProcessor, this);
    };
    /**
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.remoteExpand, this.collectExpandingRecs);
        this.parent.off('updateRemoteLevel', this.updateParentRemoteData);
        this.parent.off('updateAction', this.updateData);
        this.parent.off('dataProcessor', this.dataProcessor);
        this.parent.grid.off('sorting-begin', this.beginSorting);
    };
    /**
     * To destroy the dataModule
     *
     * @returns {void}
     * @hidden
     */
    DataManipulation.prototype.destroy = function () {
        this.removeEventListener();
    };
    /**
     * @hidden
     * @returns {boolean} -Returns whether remote data binding
     */
    DataManipulation.prototype.isRemote = function () {
        if (!(this.parent.dataSource instanceof DataManager)) {
            return false;
        }
        return true;
        // let gridData:  DataManager = <DataManager>this.parent.dataSource;
        // return gridData.dataSource.offline !== true && gridData.dataSource.url !== undefined;
    };
    /**
     * Function to manipulate datasource
     *
     * @param {Object} data - Provide tree grid datasource to convert to flat data
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.convertToFlatData = function (data) {
        var _this = this;
        this.parent.flatData = (!isNullOrUndefined(data) && Object.keys(data).length === 0
            && !(this.parent.dataSource instanceof DataManager) ?
            this.parent.dataSource : []);
        this.parent.parentData = [];
        if ((isRemoteData(this.parent) && !isOffline(this.parent)) && data instanceof DataManager && !(data instanceof Array)) {
            var dm = this.parent.dataSource;
            if (this.parent.parentIdMapping) {
                this.parent.query = isNullOrUndefined(this.parent.query) ?
                    new Query() : this.parent.query;
                if (this.parent.parentIdMapping) {
                    var filterKey = this.parent.query.params.filter(function (param) { return param.key === 'IdMapping'; });
                    if (this.parent.initialRender && !filterKey.length) {
                        this.parent.query.where(this.parent.parentIdMapping, 'equal', null);
                        this.parent.query.addParams('IdMapping', this.parent.idMapping);
                    }
                }
                if (!this.parent.hasChildMapping) {
                    var qry = this.parent.query.clone();
                    qry.queries = [];
                    qry = qry.select([this.parent.parentIdMapping]);
                    qry.isCountRequired = true;
                    dm.executeQuery(qry).then(function (e) {
                        _this.parentItems = DataUtil.distinct(e.result, _this.parent.parentIdMapping, false);
                        var req;
                        if (e.result) {
                            req = 0;
                        }
                        else {
                            req = 1;
                        }
                        if (req === 0) {
                            setValue('grid.contentModule.isLoaded', true, _this.parent);
                            if (!isNullOrUndefined(_this.zerothLevelData)) {
                                setValue('cancel', false, _this.zerothLevelData);
                                getValue('grid.renderModule', _this.parent).dataManagerSuccess(_this.zerothLevelData);
                                _this.zerothLevelData = null;
                            }
                            _this.parent.grid.hideSpinner();
                        }
                    });
                }
            }
        }
        else if (data instanceof Array) {
            this.convertJSONData(data);
        }
    };
    DataManipulation.prototype.convertJSONData = function (data) {
        this.hierarchyData = [];
        this.taskIds = [];
        if (!this.parent.idMapping) {
            this.hierarchyData = data;
        }
        else {
            var keys = Object.keys(data);
            for (var i = 0; i < keys.length; i++) {
                var tempData = data[parseInt(i.toString(), 10)];
                this.hierarchyData.push(extend({}, tempData));
                if (!isNullOrUndefined(tempData[this.parent.idMapping])) {
                    this.taskIds.push(tempData[this.parent.idMapping]);
                }
            }
        }
        if (this.isSelfReference) {
            var selfData = [];
            var mappingData = new DataManager(this.hierarchyData).executeLocal(new Query()
                .group(this.parent.parentIdMapping));
            for (var i = 0; i < mappingData.length; i++) {
                var groupData = mappingData[parseInt(i.toString(), 10)];
                var index = this.taskIds.indexOf(groupData.key);
                if (!isNullOrUndefined(groupData.key)) {
                    if (index > -1) {
                        var childData = (groupData.items);
                        this.hierarchyData[parseInt(index.toString(), 10)][this.parent.childMapping] = childData;
                        continue;
                    }
                }
                selfData.push.apply(selfData, groupData.items);
            }
            this.hierarchyData = this.selfReferenceUpdate(selfData);
        }
        if (!Object.keys(this.hierarchyData).length) {
            var isGantt = 'isGantt';
            var referenceData = !(this.parent.dataSource instanceof DataManager) && this.parent["" + isGantt];
            this.parent.flatData = referenceData ? (this.parent.dataSource) : [];
        }
        else {
            this.createRecords(this.hierarchyData);
        }
        this.storedIndex = -1;
    };
    // private crudActions(): void {
    //   if (this.parent.dataSource instanceof DataManager && (this.parent.dataSource.adaptor instanceof RemoteSaveAdaptor)) {
    //     let oldUpdate: Function = this.parent.dataSource.adaptor.update;
    //     this.parent.dataSource.adaptor.update =
    //         function (dm: DataManager, keyField: string, value: Object, tableName?: string, query?: Query, original?: Object): Object {
    //                value = getPlainData(value);
    //                return oldUpdate.apply(this, [dm, keyField, value, tableName, query, original]);
    //              }
    //   }
    // }
    DataManipulation.prototype.selfReferenceUpdate = function (selfData) {
        var result = [];
        while (this.hierarchyData.length > 0 && selfData.length > 0) {
            var index = selfData.indexOf(this.hierarchyData[0]);
            if (index === -1) {
                this.hierarchyData.shift();
            }
            else {
                result.push(this.hierarchyData.shift());
                selfData.splice(index, 1);
            }
        }
        return result;
    };
    /**
     * Function to update the zeroth level parent records in remote binding
     *
     * @param {BeforeDataBoundArgs} args - contains data before its bounds to tree grid
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.updateParentRemoteData = function (args) {
        var _this = this;
        var actionArgs = 'actionArgs';
        if (isRemoteData(this.parent) && this.parent.enableVirtualization && args["" + actionArgs].requestType === 'virtualscroll') {
            this.parent.hideSpinner();
        }
        var records = args.result;
        if (isRemoteData(this.parent) && this.parent.enableVirtualization && (args["" + actionArgs].requestType === 'virtualscroll' || args["" + actionArgs].action === 'clearFilter' || args["" + actionArgs].searchString === '')) {
            this.parent.query.expands = [];
        }
        if (!this.parent.hasChildMapping && !this.parentItems.length &&
            (this.parent.loadChildOnDemand)) {
            this.zerothLevelData = args;
            setValue('cancel', true, args);
        }
        else {
            if (this.parent.loadChildOnDemand) {
                var index = 0;
                var _loop_1 = function (rec) {
                    if (isCountRequired(this_1.parent) && records[parseInt(rec.toString(), 10)].hasChildRecords &&
                        this_1.parent.initialRender) {
                        records[parseInt(rec.toString(), 10)].expanded = false;
                    }
                    if (isRemoteData(this_1.parent) && this_1.parent.enableVirtualization) {
                        var childRecords_1 = [];
                        var parent_1 = this_1.parent;
                        records.filter(function (e) {
                            if (e["" + parent_1.parentIdMapping] === records[parseInt(rec.toString(), 10)]["" + parent_1.idMapping]) {
                                childRecords_1.push(e);
                            }
                        });
                        if (childRecords_1.length) {
                            records[parseInt(rec.toString(), 10)].expanded = true;
                        }
                        else if (records[parseInt(rec.toString(), 10)].hasChildRecords) {
                            records[parseInt(rec.toString(), 10)].expanded = false;
                        }
                    }
                    if (isNullOrUndefined(records[parseInt(rec.toString(), 10)].index)) {
                        records[parseInt(rec.toString(), 10)].taskData = extend({}, records[parseInt(rec.toString(), 10)]);
                        records[parseInt(rec.toString(), 10)].uniqueID = getUid(this_1.parent.element.id + '_data_');
                        setValue('uniqueIDCollection.' + records[parseInt(rec.toString(), 10)].uniqueID, records[parseInt(rec.toString(), 10)], this_1.parent);
                        if (isRemoteData(this_1.parent) && this_1.parent.enableVirtualization && records[parseInt(rec.toString(), 10)]["" + this_1.parent.parentIdMapping] && (isNullOrUndefined(records[parseInt(rec.toString(), 10)].level) || records[parseInt(rec.toString(), 10)].level === 0)) {
                            var parentID_1 = records[parseInt(rec.toString(), 10)]["" + this_1.parent.parentIdMapping];
                            var parentRec = records.find(function (record) { return record["" + _this.parent.idMapping] === parentID_1; });
                            if (parentRec) {
                                records[parseInt(rec.toString(), 10)].level = parentRec.level + 1;
                            }
                        }
                        else {
                            records[parseInt(rec.toString(), 10)].level = 0;
                        }
                        records[parseInt(rec.toString(), 10)].index = index;
                        if ((records[parseInt(rec.toString(), 10)][this_1.parent.hasChildMapping] ||
                            this_1.parentItems.indexOf(records[parseInt(rec.toString(), 10)][this_1.parent.idMapping]) !== -1)) {
                            records[parseInt(rec.toString(), 10)].hasChildRecords = true;
                        }
                        records[parseInt(rec.toString(), 10)].checkboxState = 'uncheck';
                    }
                    index++;
                };
                var this_1 = this;
                for (var rec = 0; rec < records.length; rec++) {
                    _loop_1(rec);
                }
            }
            else {
                var dataResults = 'dataResults';
                var expandRecord = 'expandRecord';
                if (!isNullOrUndefined(records) && !((!this.parent.loadChildOnDemand) && isCountRequired(this.parent) && !isNullOrUndefined(this.parent["" + dataResults]["" + expandRecord])) &&
                    !(isRemoteData(this.parent) && !this.parent.loadChildOnDemand && args["" + actionArgs].isExpandCollapse && this.parent.enableVirtualization)) {
                    this.convertToFlatData(records);
                }
            }
        }
        if (isRemoteData(this.parent) && !this.parent.loadChildOnDemand && args["" + actionArgs].isExpandCollapse && this.parent.enableVirtualization) {
            args.result = records;
        }
        else if (isRemoteData(this.parent) && this.parent.enableVirtualization && this.parent.loadChildOnDemand) {
            args.result = records;
        }
        else {
            args.result = !this.parent.loadChildOnDemand ? this.parent.flatData : records;
        }
        this.UpdateIndexLevel(args.result);
        if (isRemoteData(this.parent) && this.parent.enableVirtualization && !this.parent.loadChildOnDemand
            && this.parent.grid.aggregates.length && this.parent.grid.sortSettings.columns.length === 0
            && this.parent.grid.filterSettings.columns.length === 0 && !this.parent.grid.searchSettings.key.length) {
            var query = 'query';
            var summaryQuery = args["" + query].queries.filter(function (q) { return q.fn === 'onAggregates'; });
            args.result = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.parent.flatData, true);
        }
        this.parent.notify('updateResults', args);
    };
    /**
     * Updates the index level for the given data array.
     *
     * @param {object[]} data - An array of objects representing the data whose index levels need to be updated.
     * @returns {void}
     */
    DataManipulation.prototype.UpdateIndexLevel = function (data) {
        var i = 0;
        var level = 0;
        data.forEach(function (item) {
            var record = item;
            var parentItem = record.parentItem;
            if (parentItem != null) {
                var parentLevel = parentItem.level;
                record.level = parentLevel + 1;
            }
            else {
                record.level = level;
            }
            record.index = i;
            i++;
        });
    };
    /**
     * Function to manipulate datasource
     *
     * @param {{record: ITreeData, rows: HTMLTableRowElement[], parentRow: HTMLTableRowElement}} rowDetails - Row details for which child rows has to be fetched
     * @param {ITreeData} rowDetails.record - current expanding record
     * @param {HTMLTableRowElement[]} rowDetails.rows - Expanding Row element
     * @param {HTMLTableRowElement} rowDetails.parentRow  - Curent expanding row element
     * @param {boolean} isChild - Specified whether current record is already a child record
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.collectExpandingRecs = function (rowDetails, isChild) {
        var gridRows = this.parent.getRows();
        var name = 'name';
        if (this.parent.rowTemplate) {
            var rows = this.parent.getContentTable().rows;
            gridRows = [].slice.call(rows);
        }
        var childRecord;
        if (rowDetails.rows.length > 0) {
            if (!isChild) {
                rowDetails.record.expanded = true;
            }
            for (var i = 0; i < rowDetails.rows.length; i++) {
                this.parent['toggleRowVisibility'](rowDetails.rows[parseInt(i.toString(), 10)], 'e-childrow-visible');
                if (!this.parent.loadChildOnDemand) {
                    var targetEle = rowDetails.rows[parseInt(i.toString(), 10)].getElementsByClassName('e-treegridcollapse')[0];
                    childRecord = this.parent.rowTemplate ?
                        this.parent.grid.getCurrentViewRecords()[rowDetails.rows[parseInt(i.toString(), 10)].rowIndex] :
                        this.parent.grid.getRowObjectFromUID(rowDetails.rows[parseInt(i.toString(), 10)].getAttribute('data-Uid')).data;
                    if (!isNullOrUndefined(targetEle) && childRecord.expanded) {
                        addClass([targetEle], 'e-treegridexpand');
                        removeClass([targetEle], 'e-treegridcollapse');
                    }
                    var childRows = [];
                    childRows = gridRows.filter(function (r) {
                        return r.querySelector('.e-gridrowindex' + childRecord.index + 'level' + (childRecord.level + 1));
                    });
                    if (childRows.length && childRecord.expanded) {
                        this.collectExpandingRecs({ record: childRecord, rows: childRows, parentRow: rowDetails.parentRow }, true);
                    }
                }
                var expandingTd = rowDetails.rows[parseInt(i.toString(), 10)].querySelector('.e-detailrowcollapse');
                if (!isNullOrUndefined(expandingTd)) {
                    this.parent.grid.detailRowModule.expand(expandingTd);
                }
            }
            this.parent.grid.pageSettings.totalRecordsCount += rowDetails.rows.length;
        }
        else {
            this.fetchRemoteChildData({ action: rowDetails["" + name], record: rowDetails.record, rows: rowDetails.rows, parentRow: rowDetails.parentRow });
        }
    };
    DataManipulation.prototype.fetchRemoteChildData = function (rowDetails) {
        var _this = this;
        var args = { row: rowDetails.parentRow, data: rowDetails.record };
        var dm = this.parent.dataSource;
        var qry = this.parent.grid.getDataModule().generateQuery();
        var clonequries = qry.queries.filter(function (e) { return e.fn !== 'onPage' && e.fn !== 'onWhere'; });
        qry.queries = clonequries;
        qry.isCountRequired = true;
        var idMappingValue = parseInt(rowDetails.record[this.parent.idMapping], 10);
        if (isNaN(idMappingValue)) {
            idMappingValue = rowDetails.record[this.parent.idMapping].toString();
        }
        if (this.parent.enableVirtualization && rowDetails.action === 'remoteExpand') {
            qry.take(this.parent.pageSettings.pageSize);
            var expandDetail = [];
            expandDetail.push('ExpandingAction', idMappingValue.toString());
            qry.expand(expandDetail);
        }
        else if (this.parent.enableVirtualization && rowDetails.action === 'collapse') {
            qry.take(this.parent.grid.pageSettings.pageSize);
            var expandDetail = [];
            expandDetail.push('CollapsingAction', idMappingValue.toString());
            qry.expand(expandDetail);
        }
        qry.where(this.parent.parentIdMapping, 'equal', rowDetails.record[this.parent.idMapping]);
        if (rowDetails.action === 'remoteExpand' && this.parent.grid.filterSettings && this.parent.grid.filterSettings.columns.length) {
            var filterqry = this.parent.grid.getDataModule().generateQuery().queries.filter(function (e) { return e.fn !== 'onPage' && typeof e.e.predicates !== 'undefined'; });
            qry.queries.push(filterqry[0]);
        }
        showSpinner(this.parent.element);
        dm.executeQuery(qry).then(function (e) {
            var remoteExpandedData = 'remoteExpandedData';
            var remoteCollapsedData = 'remoteCollapsedData';
            var level = 'level';
            var datas = _this.parent.grid.currentViewData.slice();
            var inx;
            var idMapping = _this.parent.idMapping;
            if (_this.parent['isGantt'] && _this.parent.loadChildOnDemand && _this.parent.hasChildMapping) {
                for (var i = 0; i < _this.parent.grid.currentViewData.length; i++) {
                    if (rowDetails.record[idMapping] === _this.parent.grid.currentViewData[i][idMapping]) {
                        inx = i;
                        break;
                    }
                }
            }
            else {
                inx = datas.indexOf(rowDetails.record);
            }
            if (_this.parent.enableVirtualization && (rowDetails.action === 'collapse' || rowDetails.action === 'remoteExpand')) {
                datas = [];
                for (var i = 0; i < inx; i++) {
                    datas.push(_this.parent.grid.currentViewData[parseInt(i.toString(), 10)]);
                }
            }
            if (inx === -1) {
                _this.parent.grid.getRowsObject().forEach(function (rows) {
                    if (rows.data.uniqueID === rowDetails.record.uniqueID) {
                        inx = rows.index;
                    }
                });
            }
            var haveChild = getObject('actual.nextLevel', e);
            var result = e.result;
            var resultChildData = [];
            if (rowDetails.action === 'remoteExpand' && _this.parent.grid.filterModule && _this.parent.grid.filterModule['value']) {
                for (var i = 0; i < datas.length; i++) {
                    if (Object.prototype.hasOwnProperty.call(datas[parseInt(i.toString(), 10)], _this.parent.parentIdMapping) && datas[parseInt(i.toString(), 10)]['' + _this.parent.parentIdMapping] !== null && datas[parseInt(i.toString(), 10)].level === 0) {
                        datas.splice(i, 1);
                        i--;
                    }
                }
                for (var i = 0; i < result.length; i++) {
                    if (rowDetails.record['' + _this.parent.idMapping] !== result[parseInt(i.toString(), 10)]['' + _this.parent.idMapping] &&
                        rowDetails.record['' + _this.parent.idMapping] === result[parseInt(i.toString(), 10)]['' + _this.parent.parentIdMapping]) {
                        if (Object.prototype.hasOwnProperty.call(result, i)) {
                            resultChildData.push(result[parseInt(i.toString(), 10)]);
                        }
                    }
                }
                result = resultChildData;
            }
            if (_this.parent.enableVirtualization && rowDetails.action === 'remoteExpand') {
                rowDetails.record.childRecords = [];
                for (var i = 0; i < result.length; i++) {
                    if (rowDetails.record['' + _this.parent.idMapping] !== result[parseInt(i.toString(), 10)]['' + _this.parent.idMapping] &&
                        rowDetails.record['' + _this.parent.idMapping] === result[parseInt(i.toString(), 10)]['' + _this.parent.parentIdMapping] && Object.prototype.hasOwnProperty.call(result, i)) {
                        rowDetails.record.childRecords.push(result[parseInt(i.toString(), 10)]);
                    }
                }
            }
            else {
                rowDetails.record.childRecords = result;
            }
            for (var r = 0; r < result.length; r++) {
                var record = result[parseInt(r.toString(), 10)];
                if (_this.parent.enableVirtualization && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping] && rowDetails.action === 'remoteExpand') {
                    _this.parent["" + remoteExpandedData].push(rowDetails.record);
                }
                else if (_this.parent.enableVirtualization && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping] && rowDetails.action === 'collapse') {
                    for (var i = 0; i < _this.parent["" + remoteExpandedData].length; i++) {
                        if (rowDetails.record["" + _this.parent.idMapping] === _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                            _this.parent["" + remoteExpandedData].splice(i, 1);
                        }
                    }
                }
                record.taskData = extend({}, record);
                if (record["" + _this.parent.parentIdMapping] && _this.parent.enableVirtualization && _this.parent["" + remoteExpandedData].length) {
                    for (var i = 0; i < _this.parent["" + remoteExpandedData].length; i++) {
                        if (record["" + _this.parent.parentIdMapping] === _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                            record.level = _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)]["" + level] + 1;
                            var parentData = _this.parent["" + remoteExpandedData][parseInt(i.toString(), 10)];
                            delete parentData.childRecords;
                            record.parentItem = parentData;
                            record.parentUniqueID = parentData.uniqueID;
                        }
                    }
                }
                else if (_this.parent.enableVirtualization) {
                    if ((record["" + _this.parent.hasChildMapping] ||
                        _this.parentItems.indexOf(record["" + _this.parent.idMapping]) !== -1)
                        && !(haveChild && !haveChild[parseInt(r.toString(), 10)])) {
                        if (isNullOrUndefined(record["" + _this.parent.parentIdMapping])) {
                            record.level = 0;
                            if (rowDetails.action === 'remoteExpand') {
                                record.childRecords = [];
                                record.childRecords = rowDetails.record.childRecords;
                            }
                        }
                        else {
                            record.level = rowDetails.record.level;
                        }
                    }
                    else {
                        var parentData = extend({}, rowDetails.record);
                        delete parentData.childRecords;
                        record.parentItem = parentData;
                        record.parentUniqueID = rowDetails.record.uniqueID;
                    }
                }
                else {
                    record.level = rowDetails.record.level + 1;
                    var parentData = extend({}, rowDetails.record);
                    delete parentData.childRecords;
                    record.parentItem = parentData;
                    record.parentUniqueID = rowDetails.record.uniqueID;
                }
                if (isNullOrUndefined(record.index) && !isNullOrUndefined(record.parentItem)) {
                    if (record["" + _this.parent.parentIdMapping]) {
                        record.index = record.parentItem.index;
                    }
                }
                record.uniqueID = getUid(_this.parent.element.id + '_data_');
                if (rowDetails.record["" + _this.parent.idMapping] === record["" + _this.parent.idMapping]) {
                    rowDetails.record.uniqueID = record.uniqueID;
                }
                record.checkboxState = 'uncheck';
                if (_this.parent.enableVirtualization && isNullOrUndefined(record.level)) {
                    for (var p = 0; p < _this.parent.grid.currentViewData.length; p++) {
                        if (_this.parent.grid.currentViewData[parseInt(p.toString(), 10)]["" + _this.parent.idMapping] === record["" + _this.parent.parentIdMapping]) {
                            record.level = _this.parent.grid.currentViewData[parseInt(p.toString(), 10)]['level'] + 1;
                        }
                    }
                }
                setValue('uniqueIDCollection.' + record.uniqueID, record, _this.parent);
                // delete result[r].parentItem.childRecords;
                if ((record["" + _this.parent.hasChildMapping] ||
                    _this.parentItems.indexOf(record["" + _this.parent.idMapping]) !== -1)
                    && !(haveChild && !haveChild[parseInt(r.toString(), 10)])) {
                    record.hasChildRecords = true;
                    if (_this.parent.enableVirtualization && !_this.parent.loadChildOnDemand) {
                        for (var i = 0; i < _this.parent["" + remoteCollapsedData].length; i++) {
                            if (record["" + _this.parent.idMapping] === _this.parent["" + remoteCollapsedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                                record.expanded = _this.parent["" + remoteCollapsedData][parseInt(i.toString(), 10)]['expanded'];
                            }
                        }
                        if (rowDetails.action === 'collapse' && record["" + _this.parent.idMapping] !== rowDetails.record["" + _this.parent.idMapping] && record.expanded !== false) {
                            record.expanded = true;
                        }
                        else if (rowDetails.action === 'collapse' && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping]) {
                            record.expanded = false;
                            _this.parent["" + remoteCollapsedData].push(rowDetails.record);
                        }
                        else if (rowDetails.action === 'remoteExpand') {
                            for (var i = 0; i < _this.parent.grid.currentViewData.length; i++) {
                                if (_this.parent.grid.currentViewData[parseInt(i.toString(), 10)]["" + _this.parent.idMapping] === record["" + _this.parent.idMapping]) {
                                    result.splice(r, 1, _this.parent.grid.currentViewData[parseInt(i.toString(), 10)]);
                                }
                            }
                            if (record[_this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping]) {
                                for (var i = 0; i < _this.parent["" + remoteCollapsedData].length; i++) {
                                    if (rowDetails.record["" + _this.parent.idMapping] === _this.parent["" + remoteCollapsedData][parseInt(i.toString(), 10)]["" + _this.parent.idMapping]) {
                                        _this.parent["" + remoteCollapsedData].splice(i, 1);
                                    }
                                }
                            }
                            if (record.expanded !== false) {
                                record.expanded = true;
                            }
                        }
                    }
                    else if (_this.parent.enableVirtualization && record["" + _this.parent.idMapping] === rowDetails.record["" + _this.parent.idMapping] && rowDetails.action !== 'collapse') {
                        record.expanded = true;
                    }
                    else if (!(_this.parent.enableVirtualization && !_this.parent.loadChildOnDemand)) {
                        record.expanded = false;
                    }
                }
                datas.splice(inx + r + 1, 0, record);
            }
            setValue('result', datas, e);
            setValue('action', 'beforecontentrender', e);
            _this.parent.trigger(events.actionComplete, e);
            hideSpinner(_this.parent.element);
            if (_this.parent.grid.aggregates.length > 0 && !_this.parent.enableVirtualization) {
                var gridQuery = getObject('query', e);
                var result_1 = 'result';
                if (isNullOrUndefined(gridQuery)) {
                    gridQuery = getValue('grid.renderModule.data', _this.parent).aggregateQuery(new Query());
                }
                if (!isNullOrUndefined(gridQuery)) {
                    var summaryQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                    e["" + result_1] = _this.parent.summaryModule.calculateSummaryValue(summaryQuery, e["" + result_1], true);
                }
            }
            if (rowDetails.action === 'remoteExpand' && _this.parent.allowPaging && _this.parent.pageSettings.pageSizeMode === 'All') {
                _this.parent.grid.pageSettings.totalRecordsCount = _this.parent.grid.pageSettings.totalRecordsCount + result.length;
            }
            if (_this.parent.enableVirtualization) {
                _this.parent.grid.pageSettings.totalRecordsCount = e.count;
            }
            e.count = _this.parent.grid.pageSettings.totalRecordsCount;
            var virtualArgs = {};
            if (_this.parent.enableVirtualization) {
                _this.remoteVirtualAction(virtualArgs);
            }
            var notifyArgs = { index: inx, childData: result };
            if (_this.parent.enableInfiniteScrolling) {
                _this.parent.notify('infinite-remote-expand', notifyArgs);
            }
            else {
                getValue('grid.renderModule', _this.parent).dataManagerSuccess(e, virtualArgs);
            }
            _this.parent.trigger(events.expanded, args);
        });
    };
    DataManipulation.prototype.remoteVirtualAction = function (virtualArgs) {
        virtualArgs.requestType = 'refresh';
        setValue('isExpandCollapse', true, virtualArgs);
        var contentModule = getValue('grid.contentModule', this.parent);
        var currentInfo = getValue('currentInfo', contentModule);
        var prevInfo = getValue('prevInfo', contentModule);
        if (currentInfo.loadNext && this.parent.grid.pageSettings.currentPage === currentInfo.nextInfo.page) {
            this.parent.grid.pageSettings.currentPage = prevInfo.page;
        }
    };
    DataManipulation.prototype.beginSorting = function () {
        this.isSortAction = true;
        if (isRemoteData(this.parent) && this.parent.enableVirtualization) {
            var index = this.parent.query.queries.indexOf(this.parent.query.queries.filter(function (q) { return q.fn === 'onSortBy'; })[0]);
            if (index !== -1) {
                this.parent.query.queries.splice(index, 1);
            }
            if (this.parent.grid.sortSettings.columns.length === 0) {
                this.parent.query.sortBy(null, null);
            }
        }
    };
    DataManipulation.prototype.createRecords = function (data, parentRecords) {
        var treeGridData = [];
        var keys = Object.keys(data);
        for (var i = 0, len = keys.length; i < len; i++) {
            var currentData = extend({}, data[parseInt(i.toString(), 10)]);
            currentData.taskData = data[parseInt(i.toString(), 10)];
            var level = 0;
            this.storedIndex++;
            if (!Object.prototype.hasOwnProperty.call(currentData, 'index')) {
                currentData.index = this.storedIndex;
            }
            var childMapping = currentData[this.parent.childMapping];
            var hasChildren = !isNullOrUndefined(childMapping) && childMapping.length > 0;
            var shouldCount = isCountRequired(this.parent);
            var hasChildMapping = currentData[this.parent.hasChildMapping];
            if ((hasChildren && !shouldCount) || (hasChildMapping && shouldCount)) {
                currentData.hasChildRecords = true;
            }
            else {
                currentData.hasChildRecords = false;
            }
            if ((!isNullOrUndefined(childMapping) && !shouldCount) ||
                (hasChildMapping) && shouldCount) {
                if (this.parent.enableCollapseAll || !isNullOrUndefined(this.parent.dataStateChange)
                    && isNullOrUndefined(childMapping)) {
                    currentData.expanded = false;
                }
                else {
                    currentData.expanded = !isNullOrUndefined(currentData[this.parent.expandStateMapping])
                        ? currentData[this.parent.expandStateMapping] : true;
                }
            }
            if (!Object.prototype.hasOwnProperty.call(currentData, 'index')) {
                currentData.index = currentData.hasChildRecords ? this.storedIndex : this.storedIndex;
            }
            if (this.isSelfReference && isNullOrUndefined(currentData[this.parent.parentIdMapping])) {
                this.parent.parentData.push(currentData);
            }
            currentData.uniqueID = getUid(this.parent.element.id + '_data_');
            setValue('uniqueIDCollection.' + currentData.uniqueID, currentData, this.parent);
            if (!isNullOrUndefined(parentRecords)) {
                var parentData = extend({}, parentRecords);
                delete parentData.childRecords;
                delete parentData[this.parent.childMapping];
                if (this.isSelfReference) {
                    delete parentData.taskData[this.parent.childMapping];
                }
                currentData.parentItem = parentData;
                currentData.parentUniqueID = parentData.uniqueID;
                level = parentRecords.level + 1;
            }
            if (!Object.prototype.hasOwnProperty.call(currentData, 'level')) {
                currentData.level = level;
            }
            currentData.checkboxState = 'uncheck';
            var remoteCollapsedData = 'remoteCollapsedData';
            if (this.parent.enableVirtualization && !this.parent.loadChildOnDemand && isRemoteData(this.parent)
                && !this.parent.initialRender) {
                if (!currentData.hasChildRecords && isNullOrUndefined(currentData["" + this.parent.parentIdMapping])) {
                    currentData.hasChildRecords = true;
                    for (var c = 0; c < this.parent["" + remoteCollapsedData].length; c++) {
                        if (this.parent["" + remoteCollapsedData][parseInt(c.toString(), 10)]["" + this.parent.idMapping] === currentData["" + this.parent.idMapping]) {
                            currentData.expanded = false;
                        }
                    }
                }
                else if (currentData.level === 0 && isNullOrUndefined(parentRecords) && !currentData.hasChildRecords) {
                    currentData.level = currentData.level + 1;
                }
                if (currentData["" + this.parent.hasChildMapping] && !isNullOrUndefined(currentData["" + this.parent.expandStateMapping])) {
                    currentData.expanded = currentData["" + this.parent.expandStateMapping];
                    currentData.hasChildRecords = true;
                }
                this.parent.flatData.push(currentData);
            }
            else if (isNullOrUndefined(currentData["" + this.parent.parentIdMapping]) || currentData.parentItem) {
                if (!isNullOrUndefined(this.parent.rowDropSettings.targetID)) {
                    if (!this.parent.rowDragAndDropModule['isDuplicateData'](currentData)) {
                        this.parent.flatData.push(currentData);
                    }
                }
                else {
                    this.parent.flatData.push(currentData);
                }
                this.parent['infiniteScrollData'].push(currentData);
            }
            if (!this.isSelfReference && currentData.level === 0) {
                this.parent.parentData.push(currentData);
            }
            if (!isNullOrUndefined(currentData[this.parent.childMapping] && currentData[this.parent.childMapping].length)) {
                var record = this.createRecords(currentData[this.parent.childMapping], currentData);
                currentData.childRecords = record;
            }
            treeGridData.push(currentData);
        }
        return treeGridData;
    };
    /**
     * Function to perform filtering/sorting action for local data
     *
     * @param {BeforeDataBoundArgs} args - data details to be processed before binding to grid
     * @hidden
     * @returns {void}
     */
    DataManipulation.prototype.dataProcessor = function (args) {
        var isExport = getObject('isExport', args);
        var expresults = getObject('expresults', args);
        var exportType = getObject('exportType', args);
        var isPrinting = getObject('isPrinting', args);
        var dataObj;
        var actionArgs = getObject('actionArgs', args);
        var requestType = getObject('requestType', args);
        var actionData = getObject('data', args);
        var action = getObject('action', args);
        var actionAddArgs = actionArgs;
        var primaryKeyColumnName = this.parent.getPrimaryKeyFieldNames()[0];
        var dataValue = getObject('data', actionAddArgs);
        if ((!isNullOrUndefined(actionAddArgs)) && (!isNullOrUndefined(actionAddArgs.action)) && (actionAddArgs.action === 'add')
            && (!isNullOrUndefined(actionAddArgs.data)) && isNullOrUndefined(actionAddArgs.data["" + primaryKeyColumnName])) {
            actionAddArgs.data["" + primaryKeyColumnName] = args.result[actionAddArgs.index]["" + primaryKeyColumnName];
            dataValue.taskData["" + primaryKeyColumnName] = args.result[actionAddArgs.index]["" + primaryKeyColumnName];
        }
        if ((!isNullOrUndefined(actionArgs) && Object.keys(actionArgs).length) || requestType === 'save') {
            requestType = requestType ? requestType : actionArgs.requestType;
            actionData = actionData ? actionData : getObject('data', actionArgs);
            action = action ? action : getObject('action', actionArgs);
            if (this.parent.editSettings.mode === 'Batch') {
                this.batchChanges = this.parent.grid.editModule.getBatchChanges();
            }
            if (this.parent.isLocalData) {
                this.updateAction(actionData, action, requestType);
            }
        }
        if (isExport && !isNullOrUndefined(expresults)) {
            dataObj = expresults;
        }
        else {
            dataObj = isCountRequired(this.parent) ? getValue('result', this.parent.grid.dataSource)
                : this.parent.grid.dataSource;
        }
        var results = dataObj instanceof DataManager ? dataObj.dataSource.json : dataObj;
        var count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
            : results.length;
        var qry = new Query();
        var gridQuery = getObject('query', args);
        var filterQuery;
        var searchQuery;
        if (!isNullOrUndefined(gridQuery)) {
            filterQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onWhere'; });
            searchQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onSearch'; });
        }
        if ((this.parent.grid.allowFiltering && this.parent.grid.filterSettings.columns.length) ||
            (this.parent.grid.searchSettings.key.length > 0) || (!isNullOrUndefined(gridQuery) &&
            (filterQuery.length || searchQuery.length) && this.parent.isLocalData)) {
            if (isNullOrUndefined(gridQuery)) {
                gridQuery = new Query();
                gridQuery = getValue('grid.renderModule.data', this.parent).filterQuery(gridQuery);
                gridQuery = getValue('grid.renderModule.data', this.parent).searchQuery(gridQuery);
            }
            var fltrQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onWhere'; });
            var srchQuery = gridQuery.queries.filter(function (q) { return q.fn === 'onSearch'; });
            qry.queries = fltrQuery.concat(srchQuery);
            var filteredData = new DataManager(results).executeLocal(qry);
            this.parent.notify('updateFilterRecs', { data: filteredData });
            results = this.dataResults.result;
            this.dataResults.result = null;
            if (this.parent.grid.aggregates.length > 0) {
                var query = getObject('query', args);
                if (isNullOrUndefined(gridQuery)) {
                    gridQuery = getValue('grid.renderModule.data', this.parent).aggregateQuery(new Query());
                }
                if (!isNullOrUndefined(query)) {
                    var summaryQuery = query.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                    results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, results, true);
                }
            }
        }
        if (this.parent.grid.aggregates.length && this.parent.grid.sortSettings.columns.length === 0
            && this.parent.grid.filterSettings.columns.length === 0 && !this.parent.grid.searchSettings.key.length) {
            var gridQuery_1 = getObject('query', args);
            if (isNullOrUndefined(gridQuery_1)) {
                gridQuery_1 = getValue('grid.renderModule.data', this.parent).aggregateQuery(new Query());
            }
            var summaryQuery = gridQuery_1.queries.filter(function (q) { return q.fn === 'onAggregates'; });
            results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.parent.flatData, true);
        }
        if (this.parent.grid.sortSettings.columns.length > 0 || this.isSortAction) {
            this.isSortAction = false;
            var parentData = this.parent.parentData;
            var query = getObject('query', args);
            var srtQry = new Query();
            for (var srt = this.parent.grid.sortSettings.columns.length - 1; srt >= 0; srt--) {
                var getColumnByField = 'getColumnByField';
                var col = this.parent.grid.renderModule.data["" + getColumnByField](this.parent.grid.
                    sortSettings.columns[parseInt(srt.toString(), 10)].field);
                var compFun = col.sortComparer && isOffline(this.parent) ?
                    col.sortComparer.bind(col) :
                    this.parent.grid.sortSettings.columns[parseInt(srt.toString(), 10)].direction;
                srtQry.sortBy(this.parent.grid.sortSettings.columns[parseInt(srt.toString(), 10)].field, compFun);
            }
            var modifiedData = new DataManager(parentData).executeLocal(srtQry);
            if (this.parent.allowRowDragAndDrop && !isNullOrUndefined(this.parent.rowDragAndDropModule['draggedRecord']) &&
                this.parent.rowDragAndDropModule['droppedRecord'].hasChildRecords && this.parent.rowDragAndDropModule['dropPosition'] !== 'middleSegment') {
                var dragdIndex = modifiedData.indexOf(this.parent.rowDragAndDropModule['draggedRecord']);
                modifiedData.splice(dragdIndex, 1);
                var dropdIndex = modifiedData.indexOf(this.parent.rowDragAndDropModule['droppedRecord']);
                if (this.parent.rowDragAndDropModule['droppedRecord'].hasChildRecords && this.parent.rowDragAndDropModule['dropPosition'] === 'topSegment') {
                    modifiedData.splice(dropdIndex, 0, this.parent.rowDragAndDropModule['draggedRecord']);
                }
                else if (this.parent.rowDragAndDropModule['dropPosition'] === 'bottomSegment') {
                    modifiedData.splice(dropdIndex + 1, 0, this.parent.rowDragAndDropModule['draggedRecord']);
                }
            }
            var sortArgs = { modifiedData: modifiedData, filteredData: results, srtQry: srtQry };
            this.parent.notify('createSort', sortArgs);
            results = sortArgs.modifiedData;
            this.dataResults.result = null;
            this.sortedData = results;
            this.parent.notify('updateModel', {});
            if (this.parent.grid.aggregates.length > 0 && !isNullOrUndefined(query)) {
                var isSort = false;
                var query_1 = getObject('query', args);
                var summaryQuery = query_1.queries.filter(function (q) { return q.fn === 'onAggregates'; });
                results = this.parent.summaryModule.calculateSummaryValue(summaryQuery, this.sortedData, isSort);
            }
        }
        count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
            : results.length;
        var temp = this.paging(results, count, isExport, isPrinting, exportType, args);
        results = temp.result;
        count = temp.count;
        args.result = results;
        args.count = count;
        this.parent.notify('updateResults', args);
    };
    DataManipulation.prototype.paging = function (results, count, isExport, isPrinting, exportType, args) {
        if (this.parent.allowPaging && (!isExport || exportType === 'CurrentPage')
            && (!isPrinting || this.parent.printMode === 'CurrentPage')) {
            this.parent.notify(events.pagingActions, { result: results, count: count, actionArgs: args });
            results = this.dataResults.result;
            count = isCountRequired(this.parent) ? getValue('count', this.parent.dataSource)
                : this.dataResults.count;
        }
        else if ((this.parent.enableVirtualization || this.parent.enableInfiniteScrolling) && (!isExport || exportType === 'CurrentPage')
            && getValue('requestType', args) !== 'save') {
            var actArgs = this.parent.enableInfiniteScrolling ? args : getValue('actionArgs', args);
            this.parent.notify(events.pagingActions, { result: results, count: count, actionArgs: actArgs });
            results = this.dataResults.result;
            count = this.dataResults.count;
        }
        var isPdfExport = 'isPdfExport';
        var isCollapsedStatePersist = 'isCollapsedStatePersist';
        if ((isPrinting === true || (args["" + isPdfExport] && (isNullOrUndefined(args["" + isCollapsedStatePersist])
            || args["" + isCollapsedStatePersist]))) && this.parent.printMode === 'AllPages') {
            var actualResults = [];
            for (var i = 0; i < results.length; i++) {
                var expandStatus = getExpandStatus(this.parent, results[parseInt(i.toString(), 10)], this.parent.parentData);
                if (expandStatus) {
                    actualResults.push(results[parseInt(i.toString(), 10)]);
                }
            }
            results = actualResults;
            count = results.length;
        }
        var value = { result: results, count: count };
        return value;
    };
    DataManipulation.prototype.updateData = function (dataResult) {
        this.dataResults = dataResult;
    };
    DataManipulation.prototype.updateAction = function (actionData, action, requestType) {
        if ((requestType === 'delete' || requestType === 'save')) {
            this.parent.notify(events.crudAction, { value: actionData, action: action || requestType });
        }
        if (requestType === 'batchsave' && this.parent.editSettings.mode === 'Batch') {
            this.parent.notify(events.batchSave, {});
        }
    };
    return DataManipulation;
}());
export { DataManipulation };
