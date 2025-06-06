import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { Query, DataManager, Predicate, Deferred, UrlAdaptor, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { setFormatter, isGroupAdaptive, getColumnByForeignKeyValue, refreshFilteredColsUid } from '../base/util';
import * as events from '../base/constant';
import { ValueFormatter } from '../services/value-formatter';
import { CheckBoxFilterBase } from '../common/checkbox-filter-base';
/**
 * Grid data module is used to generate query and data source.
 *
 * @hidden
 */
var Data = /** @class */ (function () {
    /**
     * Constructor for data module.
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the service locator
     * @hidden
     */
    function Data(parent, serviceLocator) {
        this.dataState = { isPending: false, resolver: null, group: [] };
        this.foreignKeyDataState = { isPending: false, resolver: null };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.initDataManager();
        if (this.parent.isDestroyed || this.getModuleName() === 'foreignKey') {
            return;
        }
        this.parent.on(events.rowsAdded, this.addRows, this);
        this.parent.on(events.rowPositionChanged, this.reorderRows, this);
        this.parent.on(events.rowsRemoved, this.removeRows, this);
        this.parent.on(events.dataSourceModified, this.initDataManager, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.updateData, this.crudActions, this);
        this.parent.on(events.addDeleteAction, this.getData, this);
        this.parent.on(events.autoCol, this.refreshFilteredCols, this);
        this.parent.on(events.columnsPrepared, this.refreshFilteredCols, this);
    }
    Data.prototype.reorderRows = function (e) {
        if (this.parent.getDataModule().isRemote()) {
            this.parent.getCurrentViewRecords().splice(e.toIndex, 0, this.parent.getCurrentViewRecords().splice(e.fromIndex, 1)[0]);
        }
        else {
            this.dataManager.dataSource.json.splice(e.toIndex, 0, this.dataManager.dataSource.json.splice(e.fromIndex, 1)[0]);
        }
    };
    Data.prototype.getModuleName = function () {
        return 'data';
    };
    /**
     * The function used to initialize dataManager and external query
     *
     * @returns {void}
     */
    Data.prototype.initDataManager = function () {
        var gObj = this.parent;
        this.dataManager = gObj.dataSource instanceof DataManager ? gObj.dataSource :
            (isNullOrUndefined(gObj.dataSource) ? new DataManager() : new DataManager(gObj.dataSource));
        if (gObj.isAngular && !(gObj.query instanceof Query)) {
            gObj.setProperties({ query: new Query() }, true);
        }
        else {
            this.isQueryInvokedFromData = true;
            if (!(gObj.query instanceof Query)) {
                gObj.query = new Query();
            }
        }
    };
    /**
     * The function is used to generate updated Query from Grid model.
     *
     * @param {boolean} skipPage - specifies the boolean to skip the page
     * @param {boolean} isAutoCompleteCall - specifies for auto complete call
     * @returns {Query} returns the Query
     * @hidden
     */
    Data.prototype.generateQuery = function (skipPage, isAutoCompleteCall) {
        var gObj = this.parent;
        var query = !isNullOrUndefined(gObj.getQuery()) ? gObj.getQuery().clone() : new Query();
        if (this.parent.columnQueryMode === 'ExcludeHidden') {
            query.select(this.parent.getColumns().filter(function (column) { return !(column.isPrimaryKey !== true && column.visible === false || column.field === undefined); }).map(function (column) { return column.field; }));
        }
        else if (this.parent.columnQueryMode === 'Schema') {
            var selectQueryFields = [];
            var columns = this.parent.columns;
            for (var i = 0; i < columns.length; i++) {
                selectQueryFields.push(columns[parseInt(i.toString(), 10)].field);
            }
            query.select(selectQueryFields);
        }
        this.filterQuery(query);
        this.searchQuery(query);
        this.aggregateQuery(query);
        this.sortQuery(query);
        if (isGroupAdaptive(this.parent)) {
            this.virtualGroupPageQuery(query);
        }
        else {
            this.pageQuery(query, skipPage);
        }
        if (isNullOrUndefined(isAutoCompleteCall) || !isAutoCompleteCall) {
            this.groupQuery(query);
        }
        return query;
    };
    /**
     * @param {Query} query - specifies the query
     * @returns {Query} - returns the query
     * @hidden
     */
    Data.prototype.aggregateQuery = function (query) {
        var rows = this.parent.aggregates;
        for (var i = 0; i < rows.length; i++) {
            var row = rows[parseInt(i.toString(), 10)];
            for (var j = 0; j < row.columns.length; j++) {
                var cols = row.columns[parseInt(j.toString(), 10)];
                var types = cols.type instanceof Array ? cols.type : [cols.type];
                for (var k = 0; k < types.length; k++) {
                    query.aggregate(types[parseInt(k.toString(), 10)].toLowerCase(), cols.field);
                }
            }
        }
        return query;
    };
    Data.prototype.virtualGroupPageQuery = function (query) {
        var fName = 'fn';
        if (query.queries.length) {
            for (var i = 0; i < query.queries.length; i++) {
                if (query.queries[parseInt(i.toString(), 10)]["" + fName] === 'onPage') {
                    query.queries.splice(i, 1);
                }
            }
        }
        return query;
    };
    Data.prototype.pageQuery = function (query, skipPage) {
        var gObj = this.parent;
        var fName = 'fn';
        var args = { query: query, skipPage: false };
        gObj.notify(events.setVirtualPageQuery, args);
        if (args.skipPage) {
            return query;
        }
        if ((gObj.allowPaging || gObj.enableVirtualization || gObj.enableInfiniteScrolling) && skipPage !== true) {
            gObj.pageSettings.currentPage = Math.max(1, gObj.pageSettings.currentPage);
            if (gObj.pageSettings.pageCount <= 0) {
                gObj.pageSettings.pageCount = 8;
            }
            if (gObj.pageSettings.pageSize <= 0) {
                gObj.pageSettings.pageSize = 12;
            }
            if (query.queries.length) {
                for (var i = 0; i < query.queries.length; i++) {
                    if (query.queries[parseInt(i.toString(), 10)]["" + fName] === 'onPage') {
                        query.queries.splice(i, 1);
                    }
                }
            }
            if (!isNullOrUndefined(gObj.infiniteScrollModule) && gObj.enableInfiniteScrolling) {
                this.parent.notify(events.infinitePageQuery, query);
            }
            else {
                query.page(gObj.pageSettings.currentPage, gObj.allowPaging && gObj.pagerModule &&
                    (gObj.pagerModule.pagerObj.isAllPage && !gObj.isManualRefresh) &&
                    (!this.dataManager.dataSource.offline && !(this.dataManager.adaptor instanceof RemoteSaveAdaptor)) ?
                    null : gObj.pageSettings.pageSize);
            }
        }
        return query;
    };
    Data.prototype.groupQuery = function (query) {
        var gObj = this.parent;
        if (gObj.allowGrouping && gObj.groupSettings.columns.length) {
            if (this.parent.groupSettings.enableLazyLoading) {
                query.lazyLoad.push({ key: 'isLazyLoad', value: this.parent.groupSettings.enableLazyLoading });
            }
            var columns = gObj.groupSettings.columns;
            for (var i = 0, len = columns.length; i < len; i++) {
                var column = this.getColumnByField(columns[parseInt(i.toString(), 10)]);
                if (!column) {
                    this.parent.log('initial_action', { moduleName: 'group', columnName: columns[parseInt(i.toString(), 10)] });
                }
                var isGrpFmt = column.enableGroupByFormat;
                var format = column.format;
                if (isGrpFmt) {
                    query.group(columns[parseInt(i.toString(), 10)], this.formatGroupColumn.bind(this), format);
                }
                else {
                    query.group(columns[parseInt(i.toString(), 10)], null);
                }
            }
        }
        return query;
    };
    Data.prototype.sortQuery = function (query) {
        var gObj = this.parent;
        if ((gObj.allowSorting || gObj.allowGrouping) && gObj.sortSettings.columns.length) {
            var columns = gObj.sortSettings.columns;
            var sortGrp = [];
            for (var i = columns.length - 1; i > -1; i--) {
                var col = this.getColumnByField(columns[parseInt(i.toString(), 10)].field);
                if (col) {
                    col.setSortDirection(columns[parseInt(i.toString(), 10)].direction);
                }
                else {
                    this.parent.log('initial_action', { moduleName: 'sort', columnName: columns[parseInt(i.toString(), 10)].field });
                    return query;
                }
                var fn = columns[parseInt(i.toString(), 10)].direction;
                if (col.sortComparer) {
                    this.parent.log('grid_sort_comparer');
                    fn = !this.isRemote() ? col.sortComparer.bind(col) : columns[parseInt(i.toString(), 10)].direction;
                }
                if (gObj.groupSettings.columns.indexOf(columns[parseInt(i.toString(), 10)].field) === -1) {
                    if (col.isForeignColumn() || col.sortComparer) {
                        query.sortByForeignKey(col.field, fn, undefined, columns[parseInt(i.toString(), 10)].direction.toLowerCase());
                    }
                    else {
                        query.sortBy(col.field, fn);
                    }
                }
                else {
                    sortGrp.push({ direction: fn, field: col.field });
                }
            }
            for (var i = 0, len = sortGrp.length; i < len; i++) {
                if (typeof sortGrp[parseInt(i.toString(), 10)].direction === 'string') {
                    query.sortBy(sortGrp[parseInt(i.toString(), 10)].field, sortGrp[parseInt(i.toString(), 10)].direction);
                }
                else {
                    var col = this.getColumnByField(sortGrp[parseInt(i.toString(), 10)].field);
                    query.sortByForeignKey(sortGrp[parseInt(i.toString(), 10)].field, sortGrp[parseInt(i.toString(), 10)].direction, undefined, col.getSortDirection().toLowerCase());
                }
            }
        }
        return query;
    };
    /**
     * @param {Query} query - specifies the query
     * @param {Column} fcolumn - specifies the forein key column model
     * @param {boolean} isForeignKey - Confirms whether the column is a foreign key or not
     * @returns {Query} - returns the query
     * @hidden
     */
    Data.prototype.searchQuery = function (query, fcolumn, isForeignKey) {
        var sSettings = this.parent.searchSettings;
        var fields = (!isNullOrUndefined(sSettings.fields) && sSettings.fields.length) ? sSettings.fields
            : this.getSearchColumnFieldNames();
        var predicateList = [];
        var needForeignKeySearch = false;
        if (!isNullOrUndefined(this.parent.searchSettings.key) && this.parent.searchSettings.key.length) {
            needForeignKeySearch = this.parent.getForeignKeyColumns().some(function (col) { return fields.indexOf(col.field) > -1; });
            var adaptor = !isForeignKey ? this.dataManager.adaptor : fcolumn.dataSource.adaptor;
            if (needForeignKeySearch || (adaptor.getModuleName &&
                adaptor.getModuleName() === 'ODataV4Adaptor')) {
                fields = isForeignKey ? [fcolumn.foreignKeyValue] : fields;
                for (var i = 0; i < fields.length; i++) {
                    var column = isForeignKey ? fcolumn : this.getColumnByField(fields[parseInt(i.toString(), 10)]);
                    if (column.isForeignColumn() && !isForeignKey) {
                        predicateList = this.fGeneratePredicate(column, predicateList);
                    }
                    else {
                        predicateList.push(new Predicate(fields[parseInt(i.toString(), 10)], sSettings.operator, sSettings.key, sSettings.ignoreCase, sSettings.ignoreAccent));
                    }
                }
                var predList = Predicate.or(predicateList);
                predList.key = sSettings.key;
                query.where(predList);
            }
            else {
                query.search(sSettings.key, fields, sSettings.operator, sSettings.ignoreCase, sSettings.ignoreAccent);
            }
        }
        return query;
    };
    Data.prototype.filterQuery = function (query, column, skipFoerign) {
        var gObj = this.parent;
        var predicateList = [];
        var actualFilter = [];
        var foreignColumn = this.parent.getForeignKeyColumns();
        var foreignColEmpty;
        if (gObj.allowFiltering && gObj.filterSettings.columns.length) {
            var columns = column ? column : gObj.filterSettings.columns;
            var colType = {};
            for (var _i = 0, _a = gObj.getColumns(); _i < _a.length; _i++) {
                var col = _a[_i];
                colType[col.field] = col.filter.type ? col.filter.type : gObj.filterSettings.type;
            }
            var foreignCols = [];
            var defaultFltrCols = [];
            for (var _b = 0, columns_1 = columns; _b < columns_1.length; _b++) {
                var col = columns_1[_b];
                var gridColumn = col.isForeignKey ? gObj.getColumnByUid(col.uid) : gObj.getColumnByField(col.field);
                if (isNullOrUndefined(col.type) && gridColumn && (gridColumn.type === 'date' || gridColumn.type === 'datetime' || gridColumn.type === 'dateonly')) {
                    col.type = col.isForeignKey ? gObj.getColumnByUid(col.uid).type : gObj.getColumnByField(col.field).type;
                }
                if (col.isForeignKey) {
                    foreignCols.push(col);
                }
                else {
                    defaultFltrCols.push(col);
                }
            }
            if (defaultFltrCols.length) {
                for (var i = 0, len = defaultFltrCols.length; i < len; i++) {
                    defaultFltrCols[parseInt(i.toString(), 10)].uid = defaultFltrCols[parseInt(i.toString(), 10)].uid ||
                        this.parent.grabColumnByFieldFromAllCols(defaultFltrCols[parseInt(i.toString(), 10)]
                            .field, defaultFltrCols[parseInt(i.toString(), 10)].isForeignKey).uid;
                }
                var excelPredicate = CheckBoxFilterBase.getPredicate(defaultFltrCols);
                for (var _c = 0, _d = Object.keys(excelPredicate); _c < _d.length; _c++) {
                    var prop = _d[_c];
                    predicateList.push(excelPredicate["" + prop]);
                }
            }
            if (foreignCols.length) {
                for (var _e = 0, foreignCols_1 = foreignCols; _e < foreignCols_1.length; _e++) {
                    var col = foreignCols_1[_e];
                    col.uid = col.uid || this.parent.grabColumnByFieldFromAllCols(col.field, col.isForeignKey).uid;
                    var column_1 = this.parent.grabColumnByUidFromAllCols(col.uid);
                    if (!column_1) {
                        this.parent.log('initial_action', { moduleName: 'filter', columnName: col.field });
                    }
                    if (column_1.isForeignColumn() && getColumnByForeignKeyValue(col.field, foreignColumn) && !skipFoerign) {
                        actualFilter.push(col);
                        if (!column_1.columnData.length) {
                            foreignColEmpty = true;
                        }
                        predicateList = this.fGeneratePredicate(column_1, predicateList);
                    }
                    else {
                        var excelPredicate = CheckBoxFilterBase.getPredicate(columns);
                        for (var _f = 0, _g = Object.keys(excelPredicate); _f < _g.length; _f++) {
                            var prop = _g[_f];
                            predicateList.push(excelPredicate["" + prop]);
                        }
                    }
                }
            }
            if (predicateList.length && !foreignColEmpty) {
                query.where(Predicate.and(predicateList));
            }
            else {
                this.parent.notify(events.showEmptyGrid, {});
            }
        }
        return query;
    };
    Data.prototype.fGeneratePredicate = function (col, predicateList) {
        var fPredicate = {};
        if (col) {
            this.parent.notify(events.generateQuery, { predicate: fPredicate, column: col });
            if (fPredicate.predicate.predicates.length) {
                predicateList.push(fPredicate.predicate);
            }
        }
        return predicateList;
    };
    /**
     * The function is used to get dataManager promise by executing given Query.
     *
     * @param {object} args - specifies the object
     * @param {string} args.requestType - Defines the request type
     * @param {string[]} args.foreignKeyData - Defines the foreignKeyData.string
     * @param {Object} args.data - Defines the data.
     * @param {number} args.index - Defines the index .
     * @param {Query} query - Defines the query which will execute along with data processing.
     * @returns {Promise<Object>} - returns the object
     * @hidden
     */
    Data.prototype.getData = function (args, query) {
        var _this = this;
        if (args === void 0) { args = { requestType: '' }; }
        var key = this.getKey(args.foreignKeyData &&
            Object.keys(args.foreignKeyData).length ?
            args.foreignKeyData : this.parent.getPrimaryKeyFieldNames());
        this.parent.log('datasource_syntax_mismatch', { dataState: this.parent });
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            var def = this.eventPromise(args, query, key);
            return def.promise;
        }
        else {
            var crud = void 0;
            switch (args.requestType) {
                case 'delete':
                    query = query ? query : this.generateQuery();
                    // eslint-disable-next-line no-case-declarations
                    var len = Object.keys(args.data).length;
                    if (len === 1) {
                        crud = this.dataManager.remove(key, args.data[0], query.fromTable, query);
                    }
                    else {
                        var changes = {
                            addedRecords: [],
                            deletedRecords: [],
                            changedRecords: []
                        };
                        changes.deletedRecords = args.data;
                        crud = this.dataManager.saveChanges(changes, key, query.fromTable, query.requiresCount());
                    }
                    break;
                case 'save':
                    query = query ? query : this.generateQuery();
                    args.index = isNullOrUndefined(args.index) ? 0 : args.index;
                    crud = this.dataManager.insert(args.data, query.fromTable, query, args.index);
                    break;
            }
            var promise = 'promise';
            args["" + promise] = crud;
            // eslint-disable-next-line no-prototype-builtins
            if (crud && !Array.isArray(crud) && !crud.hasOwnProperty('deletedRecords')) {
                return crud.then(function () {
                    return _this.insert(query, args);
                });
            }
            else {
                return this.insert(query, args);
            }
        }
    };
    Data.prototype.insert = function (query, args) {
        if (args.requestType === 'save') {
            this.parent.notify(events.recordAdded, args);
        }
        return this.executeQuery(query);
    };
    Data.prototype.executeQuery = function (query) {
        var _this = this;
        if (this.dataManager.ready) {
            var deferred_1 = new Deferred();
            var ready = this.dataManager.ready;
            ready.then(function () {
                _this.dataManager.executeQuery(query).then(function (result) {
                    deferred_1.resolve(result);
                });
            }).catch(function (e) {
                deferred_1.reject(e);
            });
            return deferred_1.promise;
        }
        else {
            return this.dataManager.executeQuery(query);
        }
    };
    Data.prototype.formatGroupColumn = function (value, field) {
        var serviceLocator = this.serviceLocator;
        var column = this.getColumnByField(field);
        var date = value;
        if (!column.type) {
            column.type = date.getDay ? (date.getHours() > 0 || date.getMinutes() > 0 ||
                date.getSeconds() > 0 || date.getMilliseconds() > 0 ? 'datetime' : 'date') : typeof (value);
        }
        if (isNullOrUndefined(column.getFormatter())) {
            setFormatter(serviceLocator, column);
        }
        var formatVal = ValueFormatter.prototype.toView(value, column.getFormatter());
        return formatVal;
    };
    Data.prototype.crudActions = function (args) {
        var query = this.generateQuery();
        var promise = null;
        var pr = 'promise';
        var key = this.getKey(args.foreignKeyData &&
            Object.keys(args.foreignKeyData).length ? args.foreignKeyData :
            this.parent.getPrimaryKeyFieldNames());
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            this.eventPromise(args, query, key);
        }
        switch (args.requestType) {
            case 'save':
                promise = this.dataManager.update(key, args.data, query.fromTable, query, args.previousData);
                break;
        }
        args["" + pr] = promise ? promise : args["" + pr];
        this.parent.notify(events.crudAction, args);
    };
    /**
     * @param {object} changes - specifies the changes
     * @param {string} key - specifies the key
     * @param {object} original - specifies the original data
     * @param {Query} query - specifies the query
     * @returns {Promise<Object>} returns the object
     * @hidden
     */
    Data.prototype.saveChanges = function (changes, key, original, query) {
        if (query === void 0) { query = this.generateQuery(); }
        query.requiresCount();
        if ('result' in this.parent.dataSource) {
            var deff = new Deferred();
            var args = {
                requestType: 'batchsave', changes: changes, key: key, query: query,
                endEdit: deff.resolve
            };
            this.setState({ isPending: true, resolver: deff.resolve });
            this.parent.trigger(events.dataSourceChanged, args);
            return deff.promise;
        }
        else {
            var promise = this.dataManager.saveChanges(changes, key, query.fromTable, query, original);
            return promise;
        }
    };
    Data.prototype.getKey = function (keys) {
        if (keys && keys.length) {
            return keys[0];
        }
        return undefined;
    };
    /**
     * @returns {boolean} returns whether its remote data
     * @hidden
     */
    Data.prototype.isRemote = function () {
        return this.dataManager.dataSource.offline !== true && this.dataManager.dataSource.url !== undefined &&
            this.dataManager.dataSource.url !== '';
    };
    Data.prototype.addRows = function (e) {
        for (var i = e.records.length; i > 0; i--) {
            if (this.parent.dataSource instanceof DataManager && this.dataManager.dataSource.offline) {
                this.dataManager.dataSource.json.splice(e.toIndex, 0, e.records[i - 1]);
            }
            else if (((!this.parent.getDataModule().isRemote()) && (!isNullOrUndefined(this.parent.dataSource))) &&
                (!this.parent.dataSource.result)) {
                this.parent.dataSource['splice'](e.toIndex, 0, e.records[i - 1]);
            }
        }
    };
    Data.prototype.removeRows = function (e) {
        var json = this.dataManager.dataSource.json;
        if (this.parent.dataSource instanceof DataManager && this.dataManager.dataSource.offline) {
            this.dataManager.dataSource.json = json.filter(function (value) { return e.records.indexOf(value) === -1; });
        }
        else if (((!this.parent.getDataModule().isRemote()) && (!isNullOrUndefined(this.parent.dataSource))) &&
            (!this.parent.dataSource.result)) {
            this.parent.dataSource = json.filter(function (value) { return e.records.indexOf(value) === -1; });
        }
    };
    Data.prototype.getColumnByField = function (field) {
        var col;
        return (this.parent.columnModel).some(function (column) {
            col = column;
            return column.field === field;
        }) && col;
    };
    Data.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.rowsAdded, this.addRows);
        this.parent.off(events.rowsRemoved, this.removeRows);
        this.parent.off(events.dataSourceModified, this.initDataManager);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.updateData, this.crudActions);
        this.parent.off(events.addDeleteAction, this.getData);
        this.parent.off(events.autoCol, this.refreshFilteredCols);
        this.parent.off(events.columnsPrepared, this.refreshFilteredCols);
    };
    Data.prototype.getState = function () {
        return this.dataState;
    };
    Data.prototype.setState = function (state) {
        return this.dataState = state;
    };
    Data.prototype.getForeignKeyDataState = function () {
        return this.foreignKeyDataState;
    };
    Data.prototype.setForeignKeyDataState = function (state) {
        this.foreignKeyDataState = state;
    };
    Data.prototype.getStateEventArgument = function (query) {
        var adaptr = new UrlAdaptor();
        var dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
        var state = adaptr.processQuery(dm, query);
        var data = JSON.parse(state.data);
        return extend(data, state.pvtData);
    };
    Data.prototype.eventPromise = function (args, query, key) {
        var _this = this;
        var dataArgs = args;
        var state = this.getStateEventArgument(query);
        var def = new Deferred();
        var deff = new Deferred();
        if ((args.requestType !== undefined || (this.parent.groupSettings.disablePageWiseAggregates && query.queries.some(function (query) { return query.fn === 'onGroup'; })))
            && this.dataState.isDataChanged !== false) {
            state.action = args;
            if (args.requestType === 'save' || args.requestType === 'delete' || args.requestType === 'batchsave') {
                var editArgs_1 = args;
                editArgs_1.key = key;
                var promise = 'promise';
                editArgs_1["" + promise] = deff.promise;
                editArgs_1.state = state;
                this.setState({ isPending: true, resolver: deff.resolve });
                dataArgs.endEdit = deff.resolve;
                dataArgs.cancelEdit = deff.reject;
                this.parent.trigger(events.dataSourceChanged, editArgs_1);
                deff.promise.then(function () {
                    _this.setState({ isPending: true, resolver: def.resolve, group: state.group, aggregates: state.aggregates });
                    if (editArgs_1.requestType === 'save') {
                        _this.parent.notify(events.recordAdded, editArgs_1);
                    }
                    _this.parent.trigger(events.dataStateChange, state);
                })
                    .catch(function () { return void 0; });
            }
            else {
                this.setState({ isPending: true, resolver: def.resolve, group: state.group, aggregates: state.aggregates });
                this.parent.trigger(events.dataStateChange, state);
            }
        }
        else {
            this.setState({});
            def.resolve(this.parent.dataSource);
        }
        return def;
    };
    /**
     * Gets the columns where searching needs to be performed from the Grid.
     *
     * @returns {string[]} returns the searched column field names
     */
    Data.prototype.getSearchColumnFieldNames = function () {
        var colFieldNames = [];
        var columns = this.parent.getColumns();
        for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
            var col = columns_2[_i];
            if (col.allowSearching && !isNullOrUndefined(col.field)) {
                colFieldNames.push(col.field);
            }
        }
        return colFieldNames;
    };
    Data.prototype.refreshFilteredCols = function () {
        if (this.parent.allowFiltering && this.parent.filterSettings.columns.length) {
            refreshFilteredColsUid(this.parent, this.parent.filterSettings.columns);
        }
    };
    return Data;
}());
export { Data };
