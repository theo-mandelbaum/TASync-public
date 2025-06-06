import { formatUnit, isNullOrUndefined, extend, Property, ChildProperty, closest, classList, removeClass, addClass, createInstance, detach, remove, createElement, Draggable, EventHandler, append, SanitizeHtmlHelper, KeyboardEvents, initializeCSPTemplate, Touch, setStyleAttribute, Browser, debounce, L10n, compile, Collection, Complex, Event, NotifyPropertyChanges, Component } from '@syncfusion/ej2-base';
import { Dialog, Tooltip, Popup, createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { DataManager, Query, UrlAdaptor, Deferred, Predicate } from '@syncfusion/ej2-data';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { TextBox, NumericTextBox, FormValidator } from '@syncfusion/ej2-inputs';
import { Button } from '@syncfusion/ej2-buttons';
import { TreeView } from '@syncfusion/ej2-navigations';

/**
 * Kanban Constants
 */
// Constants for public events
/** @private */
var actionBegin = 'actionBegin';
/** @private */
var actionComplete = 'actionComplete';
/** @private */
var actionFailure = 'actionFailure';
/** @private */
var cardClick = 'cardClick';
/** @private */
var cardDoubleClick = 'cardDoubleClick';
/** @private */
var cardRendered = 'cardRendered';
/** @private */
var queryCellInfo = 'queryCellInfo';
/** @private */
var dataBinding = 'dataBinding';
/** @private */
var dataBound = 'dataBound';
/** @private */
var dragStart = 'dragStart';
/** @private */
var drag = 'drag';
/** @private */
var dragStop = 'dragStop';
/** @private */
var documentClick = 'document-click';
/** @private */
var dialogOpen = 'dialogOpen';
/** @private */
var dialogClose = 'dialogClose';
// Constants for internal events
/** @private */
var contentReady = 'content-ready';
/** @private */
var dataReady = 'data-ready';
/** @private */
var bottomSpace = 25;
/** @private */
var cardSpace = 16;
/** @private */
var toggleWidth = 50;
/** @hidden */
var dataSourceChanged = 'dataSourceChanged';
/** @hidden */
var dataStateChange = 'dataStateChange';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Kanban data module
 */
var Data = /** @class */ (function () {
    /**
     * Constructor for data module
     *
     * @param {Kanban} parent Accepts the instance of the Kanban
     */
    function Data(parent) {
        this.initload = false;
        this.dataState = { isPending: false, resolver: null, isDataChanged: false };
        this.parent = parent;
        this.keyField = this.parent.cardSettings.headerField;
        this.dataState = { isDataChanged: false };
        this.isObservable = false;
        this.initDataManager(parent.dataSource, parent.query);
        this.refreshDataManager();
    }
    /**
     * The function used to initialize dataManager` and query
     *
     * @param {Object[] | DataManager} dataSource Accepts the dataSource as collection of objects or Datamanager instance.
     * @param {Query} query Accepts the query to process the data from collections.
     * @returns {void}
     * @private
     */
    Data.prototype.initDataManager = function (dataSource, query) {
        this.dataManager = dataSource instanceof DataManager ? dataSource : new DataManager(dataSource);
        this.query = query instanceof Query ? query : new Query();
        this.kanbanData = new DataManager(this.parent.kanbanData);
    };
    /**
     * @returns {boolean} returns whether its remote data
     * @hidden
     */
    Data.prototype.isRemote = function () {
        return this.dataManager.dataSource.offline !== true && this.dataManager.dataSource.url !== undefined &&
            this.dataManager.dataSource.url !== '';
    };
    /**
     * @returns {boolean} returns the column key fields
     * @hidden
     */
    Data.prototype.columnKeyFields = function () {
        var columns = [];
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (column.keyField.toString().split(',').length > 1) {
                for (var _b = 0, _c = column.keyField.toString().split(','); _b < _c.length; _b++) {
                    var innerColumns = _c[_b];
                    columns.push(innerColumns.trim());
                }
            }
            else {
                columns.push(column.keyField.toString());
            }
        }
        return columns;
    };
    /**
     * The function used to generate updated Query from schedule model
     *
     * @param {string} parameter Accepts the parameter that needs to be sent to the service end.
     * @returns {void}
     * @private
     */
    Data.prototype.getQuery = function (parameter) {
        var query = this.query.clone();
        if (this.isRemote() && this.parent.enableVirtualization) {
            var cardHeight = this.parent.cardHeight === 'auto' ? 100 :
                parseInt(formatUnit(this.parent.cardHeight).split('px')[0], 10);
            var take = this.parent.height === 'auto' ? (Math.ceil(window.innerHeight / cardHeight) * 2) :
                (Math.ceil(parseInt(formatUnit(this.parent.height).split('px')[0], 10) / cardHeight) * 2);
            var columns = this.columnKeyFields();
            for (var i = 0; i < columns.length; i++) {
                query.where(this.parent.keyField, 'equal', columns[i]);
            }
            query.take(take);
            if (isNullOrUndefined(parameter)) {
                parameter = 'KanbanVirtualization';
            }
            query.addParams('KanbanVirtualization', parameter);
        }
        return query;
    };
    /**
     * The function used to get dataSource by executing given Query
     *
     * @param  {Query} query - A Query that specifies to generate dataSource
     * @returns {void}
     * @private
     */
    Data.prototype.getData = function (query) {
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            var def = this.eventPromise({ requestType: '' }, query);
            this.isObservable = true;
            return def.promise;
        }
        return this.dataManager.executeQuery(query);
    };
    Data.prototype.setState = function (state) {
        return this.dataState = state;
    };
    Data.prototype.getStateEventArgument = function (query) {
        var adaptr = new UrlAdaptor();
        var dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
        var state = adaptr.processQuery(dm, query);
        var data = JSON.parse(state.data);
        return extend(data, state.pvtData);
    };
    Data.prototype.eventPromise = function (args, query, index) {
        var _this = this;
        var dataArgs = args;
        var state = this.getStateEventArgument(query);
        var def = new Deferred();
        var deff = new Deferred();
        if (args.requestType !== undefined && this.dataState.isDataChanged !== false) {
            state.action = args;
            if (args.requestType === 'cardChanged' || args.requestType === 'cardRemoved' || args.requestType === 'cardCreated') {
                var editArgs_1 = args;
                editArgs_1.promise = deff.promise;
                editArgs_1.state = state;
                editArgs_1.index = index;
                this.setState({ isPending: true, resolver: deff.resolve });
                dataArgs.endEdit = deff.resolve;
                dataArgs.cancelEdit = deff.reject;
                this.parent.trigger(dataSourceChanged, editArgs_1);
                deff.promise.then(function () {
                    _this.setState({ isPending: true, resolver: def.resolve });
                    _this.parent.trigger(dataStateChange, state);
                    editArgs_1.addedRecords.forEach(function (data) {
                        _this.parent.kanbanData.push(data);
                    });
                    editArgs_1.changedRecords.forEach(function (changedRecord) {
                        var cardObj = _this.parent.kanbanData.filter(function (data) {
                            return data[_this.parent.cardSettings.headerField] ===
                                changedRecord[_this.parent.cardSettings.headerField];
                        })[0];
                        extend(cardObj, changedRecord);
                    });
                    editArgs_1.deletedRecords.forEach(function (deletedRecord) {
                        var index = _this.parent.kanbanData.findIndex(function (data) {
                            return data[_this.parent.cardSettings.headerField] === deletedRecord[_this.parent.cardSettings.headerField];
                        });
                        _this.parent.kanbanData.splice(index, 1);
                    });
                }).catch(function () { _this.parent.hideSpinner(); });
            }
            else {
                this.setState({ isPending: true, resolver: def.resolve });
                this.parent.trigger(dataStateChange, state);
            }
        }
        else {
            this.setState({});
            def.resolve(this.parent.dataSource);
        }
        return def;
    };
    /**
     * The function used to get the table name from the given Query
     *
     * @returns {string} Returns the table name.
     * @private
     */
    Data.prototype.getTable = function () {
        if (this.parent.query) {
            var query = this.getQuery();
            return query.fromTable;
        }
        else {
            return null;
        }
    };
    /**
     * The function is used to send the request and get response from datamanager
     *
     * @returns {void}
     * @private
     */
    Data.prototype.refreshDataManager = function () {
        var _this = this;
        var dataManager = this.getData(this.getQuery());
        dataManager.then(function (e) {
            return _this.dataManagerSuccess(e);
        }).catch(function (e) { return _this.dataManagerFailure(e); });
    };
    /**
     * The function is used to handle the success response from dataManager
     *
     * @param {ReturnType} e Accepts the dataManager success result
     * @param type
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line
    Data.prototype.dataManagerSuccess = function (e, type, offlineArgs, index) {
        var _this = this;
        if (this.parent.isDestroyed) {
            return;
        }
        if (type) {
            this.updateKanbanData(e);
            if (this.parent.enableVirtualization && this.isRemote()) {
                this.parent.virtualLayoutModule.refresh();
            }
        }
        else {
            this.parent.trigger(dataBinding, e, function (args) {
                _this.updateKanbanData(args);
                _this.parent.notify(dataReady, { processedData: _this.parent.kanbanData });
                _this.parent.trigger(dataBound, null, function () { return _this.parent.hideSpinner(); });
            });
        }
        if (this.initload) {
            this.parent.layoutModule.refresh();
            this.parent.renderTemplates();
        }
        this.initload = true;
    };
    /**
     * The function is used to handle the update the column data count for remote, and update kanbanData while perform the CRUD action
     *
     * @param {ReturnType} args Accepts the dataManager success result
     * @returns {void}
     * @private
     */
    Data.prototype.updateKanbanData = function (args) {
        var resultData = extend([], !isNullOrUndefined(args.result.result) ?
            args.result.result : args.result, null, true);
        if (this.isRemote() && this.parent.enableVirtualization && resultData.length > 0
            && !isNullOrUndefined(args.result.count)) {
            var columnsKeyFields = this.columnKeyFields();
            for (var i = 0; i < columnsKeyFields.length; i++) {
                if (args.result.count[i].Key === columnsKeyFields[i]) {
                    this.parent.columnDataCount[columnsKeyFields[i]] = args.result.count[i].Value;
                }
            }
        }
        this.parent.kanbanData = resultData;
        this.kanbanData = new DataManager(this.parent.kanbanData);
    };
    /**
     * The function is used to handle the failure response from dataManager
     *
     * @param {ReturnType} e Accepts the dataManager failure result
     * @returns {void}
     * @private
     */
    Data.prototype.dataManagerFailure = function (e) {
        var _this = this;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.trigger(actionFailure, { error: e }, function () { return _this.parent.hideSpinner(); });
    };
    /**
     * The function is used to perform the insert, update, delete and batch actions in datamanager
     *
     * @param {string} updateType Accepts the update type action
     * @param {SaveChanges} params Accepts the savechanges params
     * @param {string} type Accepts the requestType as string
     * @param {Object} data Accepts the data to perform crud action
     * @param {number} index Accepts the index to refresh the data into UI
     * @param {boolean} isDropped Accepts the boolean value based on based if it is dragged and dropped
     * @param {string} dataDropIndexKeyFieldValue Accepts the dropped index key field value card
     * @param {number} draggedKey Accepts the dragged keyfield of the column
     * @param {number} droppedKey Accepts the dropped keyfield of the column
     * @param {number} isMultipleDrag Accepts boolean value based on the multiple drag of the cards
     * @returns {void}
     * @private
     */
    Data.prototype.updateDataManager = function (updateType, params, type, data, index, isDropped, dataDropIndexKeyFieldValue, draggedKey, droppedKey, isMultipleDrag) {
        var _this = this;
        this.parent.showSpinner();
        var promise;
        var actionArgs = {
            requestType: type, cancel: false, addedRecords: params.addedRecords,
            changedRecords: params.changedRecords, deletedRecords: params.deletedRecords
        };
        this.setState({ isDataChanged: true });
        this.eventPromise(actionArgs, this.query, index);
        this.parent.trigger(actionComplete, actionArgs, function (offlineArgs) {
            if (!offlineArgs.cancel) {
                promise = _this.syncDataSource(_this.dataManager, updateType, params, data, isDropped, dataDropIndexKeyFieldValue);
                if (_this.dataManager.dataSource.offline) {
                    if (!_this.isObservable) {
                        _this.syncDataSource(_this.kanbanData, updateType, params, data, isDropped, dataDropIndexKeyFieldValue);
                        index = draggedKey === droppedKey && isMultipleDrag ? index - 1 : index;
                        _this.refreshUI(offlineArgs, index, isDropped);
                        if (_this.parent.enableVirtualization) {
                            _this.parent.virtualLayoutModule.refreshColumnData(draggedKey, droppedKey, offlineArgs.requestType, data[_this.parent.keyField]);
                        }
                    }
                }
                else {
                    promise.then(function (args) {
                        if (_this.parent.isDestroyed) {
                            return;
                        }
                        var dataManager = _this.getData(_this.getQuery());
                        dataManager.then(function (e) { return _this.dataManagerSuccess(e, 'DataSourceChange', offlineArgs, index); }).catch(function (e) { return _this.dataManagerFailure(e); });
                        if (offlineArgs.requestType === 'cardCreated') {
                            if (!Array.isArray(args)) {
                                offlineArgs.addedRecords[0] = extend(offlineArgs.addedRecords[0], args);
                            }
                            else {
                                _this.modifyArrayData(offlineArgs.addedRecords, args);
                            }
                        }
                        else if (offlineArgs.requestType === 'cardChanged') {
                            if (!Array.isArray(args)) {
                                offlineArgs.changedRecords[0] = extend(offlineArgs.changedRecords[0], args);
                            }
                            else {
                                _this.modifyArrayData(offlineArgs.changedRecords, args);
                            }
                        }
                        else if (offlineArgs.requestType === 'cardRemoved') {
                            if (!Array.isArray(args)) {
                                offlineArgs.deletedRecords[0] = extend(offlineArgs.deletedRecords[0], args);
                            }
                            else {
                                _this.modifyArrayData(offlineArgs.deletedRecords, args);
                            }
                        }
                        index = draggedKey === droppedKey && isMultipleDrag ? index - 1 : index;
                        _this.refreshUI(offlineArgs, index, isDropped);
                        if (_this.parent.enableVirtualization) {
                            _this.parent.virtualLayoutModule.refreshColumnData(draggedKey, droppedKey, offlineArgs.requestType, data[_this.parent.keyField]);
                        }
                    }).catch(function (e) {
                        _this.dataManagerFailure(e);
                    });
                }
            }
        });
    };
    Data.prototype.syncDataSource = function (dataManager, updateType, params, data, isDropped, dataDropIndexKeyFieldValue) {
        var _this = this;
        var promise;
        switch (updateType) {
            case 'insert':
                return dataManager.insert(data, this.getTable(), this.getQuery());
            case 'update':
                if (this.parent.enableVirtualization && !this.parent.dataModule.isRemote() && isDropped) {
                    promise = dataManager.remove(this.keyField, data, this.getTable(), this.getQuery());
                    promise = dataManager.insert(data, this.getTable(), this.getQuery(), dataManager.dataSource.json.findIndex(function (data) {
                        return data[_this.parent.cardSettings.headerField] === dataDropIndexKeyFieldValue;
                    }));
                    return promise;
                }
                else {
                    return dataManager.update(this.keyField, data, this.getTable(), this.getQuery());
                }
            case 'delete':
                return dataManager.remove(this.keyField, data, this.getTable(), this.getQuery());
            case 'batch':
                if (!this.parent.dataModule.isRemote() && isDropped && this.parent.enableVirtualization && data) {
                    for (var i = 0; i < data.length; i++) {
                        promise = dataManager.remove(this.keyField, data[i], this.getTable(), this.getQuery());
                    }
                    var currentIndex = dataManager.dataSource.json.findIndex(function (data) {
                        return data[_this.parent.cardSettings.headerField] === dataDropIndexKeyFieldValue;
                    });
                    for (var i = 0; i < data.length; i++, currentIndex++) {
                        promise = dataManager.insert(data[i], this.getTable(), this.getQuery(), currentIndex);
                    }
                    return promise;
                }
                else {
                    return dataManager.saveChanges(params, this.keyField, this.getTable(), this.getQuery());
                }
            default:
                return promise;
        }
    };
    Data.prototype.modifyArrayData = function (onLineData, e) {
        if (onLineData.length === e.length) {
            for (var i = 0; i < e.length; i++) {
                onLineData[i] = extend(onLineData[i], e[i]);
            }
        }
        return onLineData;
    };
    /**
     * The function is used to refresh the UI once the data manager action is completed
     *
     * @param {ActionEventArgs} args Accepts the ActionEventArgs to refresh UI.
     * @param {number} position Accepts the index to refresh UI.
     * @param {boolean} isDropped Accepts the boolean value based on based if it is dragged and dropped
     * @returns {void}
     */
    Data.prototype.refreshUI = function (args, position, isDropped) {
        var _this = this;
        if (this.parent.enableVirtualization) {
            this.parent.virtualLayoutModule.columnData = this.parent.virtualLayoutModule.getColumnCards();
            args.addedRecords.forEach(function (data, index) {
                _this.parent.virtualLayoutModule.renderCardBasedOnIndex(data, position + index, isDropped, args.requestType);
            });
            args.changedRecords.forEach(function (data) {
                _this.parent.virtualLayoutModule.removeCard(data);
                _this.parent.virtualLayoutModule.renderCardBasedOnIndex(data, position, isDropped, args.requestType);
                if (_this.parent.virtualLayoutModule.isSelectedCard) {
                    _this.parent.actionModule.SingleCardSelection(data);
                }
                if (_this.parent.sortSettings.field && _this.parent.sortSettings.sortBy === 'Index'
                    && _this.parent.sortSettings.direction === 'Descending' && position > 0) {
                    --position;
                }
                else {
                    position++;
                }
            });
            args.deletedRecords.forEach(function (data) {
                _this.parent.virtualLayoutModule.removeCard(data);
            });
            this.parent.virtualLayoutModule.refresh();
        }
        else {
            this.parent.layoutModule.columnData = this.parent.layoutModule.getColumnCards();
            if (this.parent.swimlaneSettings.keyField) {
                this.parent.layoutModule.kanbanRows = this.parent.layoutModule.getRows();
                this.parent.layoutModule.swimlaneData = this.parent.layoutModule.getSwimlaneCards();
            }
            args.addedRecords.forEach(function (data, index) {
                if (_this.parent.swimlaneSettings.keyField && !data[_this.parent.swimlaneSettings.keyField]) {
                    data[_this.parent.swimlaneSettings.keyField] = '';
                }
                _this.parent.layoutModule.renderCardBasedOnIndex(data, position + index);
            });
            args.changedRecords.forEach(function (data) {
                if (_this.parent.swimlaneSettings.keyField && !data[_this.parent.swimlaneSettings.keyField]) {
                    data[_this.parent.swimlaneSettings.keyField] = '';
                }
                _this.parent.layoutModule.removeCard(data);
                _this.parent.layoutModule.renderCardBasedOnIndex(data, position);
                if (_this.parent.layoutModule.isSelectedCard) {
                    _this.parent.actionModule.SingleCardSelection(data);
                }
                if (_this.parent.sortSettings.field && _this.parent.sortSettings.sortBy === 'Index'
                    && _this.parent.sortSettings.direction === 'Descending' && position > 0) {
                    --position;
                }
                else {
                    position++;
                }
            });
            args.deletedRecords.forEach(function (data) {
                _this.parent.layoutModule.removeCard(data);
            });
            this.parent.layoutModule.refresh();
        }
        this.parent.renderTemplates();
        this.parent.notify(contentReady, {});
        this.parent.trigger(dataBound, args, function () { return _this.parent.hideSpinner(); });
    };
    return Data;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of swimlane settings in kanban board.
 */
var SwimlaneSettings = /** @class */ (function (_super) {
    __extends(SwimlaneSettings, _super);
    function SwimlaneSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property()
    ], SwimlaneSettings.prototype, "keyField", void 0);
    __decorate([
        Property()
    ], SwimlaneSettings.prototype, "textField", void 0);
    __decorate([
        Property(false)
    ], SwimlaneSettings.prototype, "showEmptyRow", void 0);
    __decorate([
        Property(true)
    ], SwimlaneSettings.prototype, "showItemCount", void 0);
    __decorate([
        Property(false)
    ], SwimlaneSettings.prototype, "allowDragAndDrop", void 0);
    __decorate([
        Property()
    ], SwimlaneSettings.prototype, "template", void 0);
    __decorate([
        Property('Ascending')
    ], SwimlaneSettings.prototype, "sortDirection", void 0);
    __decorate([
        Property()
    ], SwimlaneSettings.prototype, "sortComparer", void 0);
    __decorate([
        Property(true)
    ], SwimlaneSettings.prototype, "showUnassignedRow", void 0);
    __decorate([
        Property(false)
    ], SwimlaneSettings.prototype, "enableFrozenRows", void 0);
    return SwimlaneSettings;
}(ChildProperty));

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of card settings in kanban board.
 */
var CardSettings = /** @class */ (function (_super) {
    __extends$1(CardSettings, _super);
    function CardSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$1([
        Property(true)
    ], CardSettings.prototype, "showHeader", void 0);
    __decorate$1([
        Property()
    ], CardSettings.prototype, "headerField", void 0);
    __decorate$1([
        Property()
    ], CardSettings.prototype, "contentField", void 0);
    __decorate$1([
        Property()
    ], CardSettings.prototype, "tagsField", void 0);
    __decorate$1([
        Property()
    ], CardSettings.prototype, "grabberField", void 0);
    __decorate$1([
        Property()
    ], CardSettings.prototype, "footerCssField", void 0);
    __decorate$1([
        Property()
    ], CardSettings.prototype, "template", void 0);
    __decorate$1([
        Property('Single')
    ], CardSettings.prototype, "selectionType", void 0);
    return CardSettings;
}(ChildProperty));

var __extends$2 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of editor settings.
 */
var DialogSettings = /** @class */ (function (_super) {
    __extends$2(DialogSettings, _super);
    function DialogSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$2([
        Property()
    ], DialogSettings.prototype, "template", void 0);
    __decorate$2([
        Property([])
    ], DialogSettings.prototype, "fields", void 0);
    __decorate$2([
        Property(null)
    ], DialogSettings.prototype, "model", void 0);
    return DialogSettings;
}(ChildProperty));

var __extends$3 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of columns in kanban board.
 */
var Columns = /** @class */ (function (_super) {
    __extends$3(Columns, _super);
    function Columns() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$3([
        Property()
    ], Columns.prototype, "keyField", void 0);
    __decorate$3([
        Property()
    ], Columns.prototype, "headerText", void 0);
    __decorate$3([
        Property()
    ], Columns.prototype, "template", void 0);
    __decorate$3([
        Property(false)
    ], Columns.prototype, "allowToggle", void 0);
    __decorate$3([
        Property(true)
    ], Columns.prototype, "isExpanded", void 0);
    __decorate$3([
        Property()
    ], Columns.prototype, "minCount", void 0);
    __decorate$3([
        Property()
    ], Columns.prototype, "maxCount", void 0);
    __decorate$3([
        Property(true)
    ], Columns.prototype, "showItemCount", void 0);
    __decorate$3([
        Property(false)
    ], Columns.prototype, "showAddButton", void 0);
    __decorate$3([
        Property(true)
    ], Columns.prototype, "allowDrag", void 0);
    __decorate$3([
        Property(true)
    ], Columns.prototype, "allowDrop", void 0);
    __decorate$3([
        Property([])
    ], Columns.prototype, "transitionColumns", void 0);
    return Columns;
}(ChildProperty));

var __extends$4 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of stacked header settings in kanban board.
 */
var StackedHeaders = /** @class */ (function (_super) {
    __extends$4(StackedHeaders, _super);
    function StackedHeaders() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$4([
        Property()
    ], StackedHeaders.prototype, "text", void 0);
    __decorate$4([
        Property()
    ], StackedHeaders.prototype, "keyFields", void 0);
    return StackedHeaders;
}(ChildProperty));

var __extends$5 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of sort settings in kanban board.
 */
var SortSettings = /** @class */ (function (_super) {
    __extends$5(SortSettings, _super);
    function SortSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate$5([
        Property('Index')
    ], SortSettings.prototype, "sortBy", void 0);
    __decorate$5([
        Property()
    ], SortSettings.prototype, "field", void 0);
    __decorate$5([
        Property('Ascending')
    ], SortSettings.prototype, "direction", void 0);
    return SortSettings;
}(ChildProperty));

/**
 * Kanban CSS Constants
 */
/** @private */
var ROOT_CLASS = 'e-kanban';
/** @private */
var RTL_CLASS = 'e-rtl';
/** @private */
var DEVICE_CLASS = 'e-device';
/** @private */
var ICON_CLASS = 'e-icons';
/** @private */
var TEMPLATE_CLASS = 'e-template';
/** @private */
var SWIMLANE_CLASS = 'e-swimlane';
/** @private */
var TABLE_CLASS = 'e-kanban-table';
/** @private */
var HEADER_CLASS = 'e-kanban-header';
/** @private */
var HEADER_TABLE_CLASS = 'e-header-table';
/** @private */
var HEADER_CELLS_CLASS = 'e-header-cells';
/** @private */
var HEADER_WRAP_CLASS = 'e-header-wrap';
/** @private */
var HEADER_TITLE_CLASS = 'e-header-title';
/** @private */
var HEADER_TEXT_CLASS = 'e-header-text';
/** @private */
var HEADER_ICON_CLASS = 'e-header-icon';
/** @private */
var STACKED_HEADER_ROW_CLASS = 'e-stacked-header-row';
/** @private */
var STACKED_HEADER_CELL_CLASS = 'e-stacked-header-cell';
/** @private */
var CONTENT_CELLS_CLASS = 'e-content-cells';
/** @private */
var CONTENT_CLASS = 'e-kanban-content';
/** @private */
var CONTENT_TABLE_CLASS = 'e-content-table';
/** @private */
var HEADER_ROW_TOGGLE_CLASS = 'e-toggle-header';
/** @private */
var HEADER_ROW_CLASS = 'e-header-row';
/** @private */
var CONTENT_ROW_CLASS = 'e-content-row';
/** @private */
var SWIMLANE_ROW_CLASS = 'e-swimlane-row';
/** @private */
var SWIMLANE_ROW_EXPAND_CLASS = 'e-swimlane-row-expand';
/** @private */
var SWIMLANE_ROW_COLLAPSE_CLASS = 'e-swimlane-row-collapse';
/** @private */
var SWIMLANE_ROW_TEXT_CLASS = 'e-swimlane-text';
/** @private */
var CARD_ITEM_COUNT_CLASS = 'e-item-count';
/** @private */
var CARD_WRAPPER_CLASS = 'e-card-wrapper';
/** @private */
var CARD_VIRTUAL_WRAPPER_CLASS = 'e-card-virtual-wrapper';
/** @private */
var CARD_CLASS = 'e-card';
/** @private */
var DROPPABLE_CLASS = 'e-droppable';
/** @private */
var DRAG_CLASS = 'e-drag';
/** @private */
var DROP_CLASS = 'e-drop';
/** @private */
var DISABLED_CLASS = 'e-disabled';
/** @private */
var CARD_HEADER_CLASS = 'e-card-header';
/** @private */
var CARD_CONTENT_CLASS = 'e-card-content';
/** @private */
var CARD_HEADER_TEXT_CLASS = 'e-card-header-caption';
/** @private */
var CARD_HEADER_TITLE_CLASS = 'e-card-header-title';
/** @private */
var CARD_TAGS_CLASS = 'e-card-tags';
/** @private */
var CARD_TAG_CLASS = 'e-card-tag';
/** @private */
var CARD_COLOR_CLASS = 'e-card-color';
/** @private */
var CARD_LABEL_CLASS = 'e-card-label';
/** @private */
var CARD_FOOTER_CLASS = 'e-card-footer';
/** @private */
var EMPTY_CARD_CLASS = 'e-empty-card';
/** @private */
var CARD_FOOTER_CSS_CLASS = 'e-card-footer-css';
/** @private */
var COLUMN_EXPAND_CLASS = 'e-column-expand';
/** @private */
var COLUMN_COLLAPSE_CLASS = 'e-column-collapse';
/** @private */
var COLLAPSE_HEADER_TEXT_CLASS = 'e-collapse-header-text';
/** @private */
var COLLAPSED_CLASS = 'e-collapsed';
/** @private */
var DIALOG_CLASS = 'e-kanban-dialog';
/** @private */
var FORM_CLASS = 'e-kanban-form';
/** @private */
var FORM_WRAPPER_CLASS = 'e-kanban-form-wrapper';
/** @private */
var ERROR_VALIDATION_CLASS = 'e-kanban-error';
/** @private */
var FIELD_CLASS = 'e-field';
/** @private */
var DRAGGED_CLONE_CLASS = 'e-target-dragged-clone';
/** @private */
var CLONED_CARD_CLASS = 'e-cloned-card';
/** @private */
var DRAGGED_CARD_CLASS = 'e-kanban-dragged-card';
/** @private */
var DROPPED_CLONE_CLASS = 'e-target-dropped-clone';
/** @private */
var DROPPING_CLASS = 'e-dropping';
/** @private */
var BORDER_CLASS = 'e-kanban-border';
/** @private */
var TOGGLE_VISIBLE_CLASS = 'e-toggle-visible';
/** @private */
var MULTI_CARD_WRAPPER_CLASS = 'e-multi-card-wrapper';
/** @private */
var MULTI_ACTIVE_CLASS = 'e-multi-active';
/** @private */
var TARGET_MULTI_CLONE_CLASS = 'e-target-multi-clone';
/** @private */
var MULTI_COLUMN_KEY_CLASS = 'e-column-key';
/** @private */
var CARD_SELECTION_CLASS = 'e-selection';
/** @private */
var TOOLTIP_CLASS = 'e-kanban-tooltip';
/** @private */
var TOOLTIP_TEXT_CLASS = 'e-tooltip-text';
/** @private */
var SWIMLANE_HEADER_CLASS = 'e-swimlane-header';
/** @private */
var SWIMLANE_HEADER_TOOLBAR_CLASS = 'e-swimlane-header-toolbar';
/** @private */
var TOOLBAR_MENU_CLASS = 'e-toolbar-menu';
/** @private */
var TOOLBAR_MENU_ICON_CLASS = 'e-icon-menu';
/** @private */
var TOOLBAR_LEVEL_TITLE_CLASS = 'e-toolbar-level-title';
/** @private */
var TOOLBAR_SWIMLANE_NAME_CLASS = 'e-toolbar-swimlane-name';
/** @private */
var SWIMLANE_OVERLAY_CLASS = 'e-swimlane-overlay';
/** @private */
var SWIMLANE_CONTENT_CLASS = 'e-swimlane-content';
/** @private */
var SWIMLANE_RESOURCE_CLASS = 'e-swimlane-resource';
/** @private */
var SWIMLANE_TREE_CLASS = 'e-swimlane-tree';
/** @private */
var LIMITS_CLASS = 'e-limits';
/** @private */
var MAX_COUNT_CLASS = 'e-max-count';
/** @private */
var MIN_COUNT_CLASS = 'e-min-count';
/** @private */
var MAX_COLOR_CLASS = 'e-max-color';
/** @private */
var MIN_COLOR_CLASS = 'e-min-color';
/** @private */
var POPUP_HEADER_CLASS = 'e-popup-header';
/** @private */
var CLOSE_CLASS = 'e-close';
/** @private */
var POPUP_CONTENT_CLASS = 'e-popup-content';
/** @private */
var POPUP_WRAPPER_CLASS = 'e-mobile-popup-wrapper';
/** @private */
var CLOSE_ICON_CLASS = 'e-close-icon';
/** @private */
var POPUP_OPEN_CLASS = 'e-popup-open';
/** @private */
var DIALOG_CONTENT_CONTAINER = 'e-kanban-dialog-content';
/** @private */
var SHOW_ADD_BUTTON = 'e-show-add-button';
/** @private */
var SHOW_ADD_ICON = 'e-show-add-icon';
/** @private */
var SHOW_ADD_FOCUS = 'e-show-add-focus';
/** @private */
var FROZEN_SWIMLANE_ROW_CLASS = 'e-frozen-swimlane-row';
/** @private */
var FROZEN_ROW_CLASS = 'e-frozen-row';
/** @private */
var TOOLBAR_SWIMLANE_ITEM_COUNT_CLASS = 'e-toolbar-swimlane-item-count';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Action module is used to perform card actions.
 */
var Action = /** @class */ (function () {
    /**
     * Constructor for action module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    function Action(parent) {
        this.parent = parent;
        this.columnToggleArray = [];
        this.selectionArray = [];
        this.lastCardSelection = null;
        this.lastSelectionRow = null;
        this.lastCard = null;
        this.selectedCardsElement = [];
        this.selectedCardsData = [];
        this.hideColumnKeys = [];
    }
    Action.prototype.clickHandler = function (e) {
        var elementSelector = '.' + CARD_CLASS + ',.' + HEADER_ICON_CLASS + ',.' + CONTENT_ROW_CLASS + '.' +
            SWIMLANE_ROW_CLASS + ',.' + SHOW_ADD_BUTTON + ',.' + FROZEN_SWIMLANE_ROW_CLASS + ',.' + CONTENT_ROW_CLASS +
            ':not(.' + SWIMLANE_ROW_CLASS + ') .' + CONTENT_CELLS_CLASS;
        var target = closest(e.target, elementSelector);
        if (!target) {
            return;
        }
        if (target.classList.contains(CARD_CLASS)) {
            if (this.parent.allowKeyboard) {
                this.parent.keyboardModule.cardTabIndexRemove();
            }
            this.cardClick(e);
        }
        else if (target.classList.contains(HEADER_ICON_CLASS)) {
            this.columnExpandCollapse(e);
        }
        else if (target.classList.contains(CONTENT_ROW_CLASS) && target.classList.contains(SWIMLANE_ROW_CLASS)) {
            this.rowExpandCollapse(e);
        }
        else if (target.classList.contains(SHOW_ADD_BUTTON)) {
            this.addButtonClick(target);
        }
        else if (target.classList.contains(FROZEN_SWIMLANE_ROW_CLASS)) {
            var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.' + SWIMLANE_ROW_CLASS));
            var targetIcon = this.parent.layoutModule.frozenSwimlaneRow.querySelector('.' + ICON_CLASS);
            this.rowExpandCollapse(e, swimlaneRows[this.parent.layoutModule.frozenOrder]);
            var isCollapsed = targetIcon.classList.contains(SWIMLANE_ROW_COLLAPSE_CLASS) ? true : false;
            if (isCollapsed) {
                classList(targetIcon, [SWIMLANE_ROW_EXPAND_CLASS], [SWIMLANE_ROW_COLLAPSE_CLASS]);
            }
            else {
                classList(targetIcon, [SWIMLANE_ROW_COLLAPSE_CLASS], [SWIMLANE_ROW_EXPAND_CLASS]);
            }
        }
    };
    Action.prototype.addButtonClick = function (target) {
        var _this = this;
        var newData = {};
        if (this.parent.kanbanData.length === 0) {
            newData[this.parent.cardSettings.headerField] = 1;
        }
        else if (typeof (this.parent.kanbanData[0])[this.parent.cardSettings.headerField] === 'number') {
            var id = this.parent.kanbanData.map(function (obj) {
                return parseInt(obj[_this.parent.cardSettings.headerField], 10);
            });
            newData[this.parent.cardSettings.headerField] = Math.max.apply(Math, id) + 1;
        }
        newData[this.parent.keyField] = closest(target, '.' + CONTENT_CELLS_CLASS).getAttribute('data-key');
        if (this.parent.sortSettings.sortBy === 'Index') {
            newData[this.parent.sortSettings.field] = 1;
            if (closest(target, '.' + CONTENT_CELLS_CLASS).querySelector('.' + CARD_CLASS)) {
                var card = this.parent.sortSettings.direction === 'Ascending' ?
                    target.nextElementSibling.classList.contains(BORDER_CLASS) ?
                        target.nextElementSibling.nextElementSibling.lastElementChild : target.nextElementSibling.lastElementChild
                    : target.nextElementSibling.classList.contains(BORDER_CLASS) ?
                        target.nextElementSibling.nextElementSibling.firstElementChild : target.nextElementSibling.firstElementChild;
                var data = this.parent.getCardDetails(card);
                newData[this.parent.sortSettings.field] = data[this.parent.sortSettings.field] + 1;
            }
        }
        if (this.parent.kanbanData.length !== 0 && this.parent.swimlaneSettings.keyField &&
            closest(target, '.' + CONTENT_ROW_CLASS).previousElementSibling) {
            newData[this.parent.swimlaneSettings.keyField] =
                closest(target, '.' + CONTENT_ROW_CLASS).previousElementSibling.getAttribute('data-key');
        }
        this.parent.openDialog('Add', newData);
    };
    Action.prototype.doubleClickHandler = function (e) {
        var target = closest(e.target, '.' + CARD_CLASS);
        if (target) {
            this.cardDoubleClick(e);
        }
    };
    Action.prototype.cardClick = function (e, selectedCard) {
        var _this = this;
        var target = closest((selectedCard) ? selectedCard : e.target, '.' + CARD_CLASS);
        var cardClickObj = this.parent.getCardDetails(target);
        if (cardClickObj) {
            this.parent.activeCardData = { data: cardClickObj, element: target };
            var args = { data: cardClickObj, element: target, cancel: false, event: e };
            this.parent.trigger(cardClick, args, function (clickArgs) {
                if (!clickArgs.cancel) {
                    if (target.classList.contains(CARD_SELECTION_CLASS) && e.type === 'click') {
                        removeClass([target], CARD_SELECTION_CLASS);
                        if (_this.parent.enableVirtualization) {
                            _this.parent.virtualLayoutModule.disableAttributeSelection(target);
                        }
                        else {
                            _this.parent.layoutModule.disableAttributeSelection(target);
                        }
                    }
                    else {
                        var isCtrlKey = e.ctrlKey;
                        if (_this.parent.isAdaptive && _this.parent.touchModule) {
                            isCtrlKey = (_this.parent.touchModule.mobilePopup && _this.parent.touchModule.tabHold) || isCtrlKey;
                        }
                        _this.cardSelection(target, isCtrlKey, e.shiftKey);
                    }
                    if (_this.parent.isAdaptive && _this.parent.touchModule) {
                        _this.parent.touchModule.updatePopupContent();
                    }
                    var cell = closest(target, '.' + CONTENT_CELLS_CLASS);
                    if (_this.parent.allowKeyboard) {
                        var element = [].slice.call(cell.querySelectorAll('.' + CARD_CLASS));
                        element.forEach(function (e) { e.setAttribute('tabindex', '0'); });
                        _this.parent.keyboardModule.addRemoveTabIndex('Remove');
                    }
                }
            });
        }
    };
    Action.prototype.cardDoubleClick = function (e) {
        var _this = this;
        var target = closest(e.target, '.' + CARD_CLASS);
        var cardDoubleClickObj = this.parent.getCardDetails(target);
        this.parent.activeCardData = { data: cardDoubleClickObj, element: target };
        this.cardSelection(target, false, false);
        var args = { data: cardDoubleClickObj, element: target, cancel: false, event: e };
        this.parent.trigger(cardDoubleClick, args, function (doubleClickArgs) {
            if (!doubleClickArgs.cancel) {
                _this.parent.dialogModule.openDialog('Edit', args.data);
            }
        });
    };
    Action.prototype.rowExpandCollapse = function (e, isFrozenElem) {
        var _this = this;
        var headerTarget = (e instanceof HTMLElement) ? e : e.target;
        var currentSwimlaneHeader = !isNullOrUndefined(isFrozenElem) ? isFrozenElem : headerTarget;
        var args = { cancel: false, target: headerTarget, requestType: 'rowExpandCollapse' };
        this.parent.trigger(actionBegin, args, function (actionArgs) {
            if (!actionArgs.cancel) {
                var target = closest(currentSwimlaneHeader, '.' + SWIMLANE_ROW_CLASS);
                var key = target.getAttribute('data-key');
                var tgtRow = _this.parent.element.querySelector('.' + CONTENT_ROW_CLASS + (":nth-child(" + (target.rowIndex + 2) + ")"));
                var targetIcon = target.querySelector("." + SWIMLANE_ROW_EXPAND_CLASS + ",." + SWIMLANE_ROW_COLLAPSE_CLASS);
                var isCollapsed = target.classList.contains(COLLAPSED_CLASS) ? true : false;
                var tabIndex_1;
                if (isCollapsed) {
                    removeClass([tgtRow, target], COLLAPSED_CLASS);
                    classList(targetIcon, [SWIMLANE_ROW_EXPAND_CLASS], [SWIMLANE_ROW_COLLAPSE_CLASS]);
                    _this.parent.swimlaneToggleArray.splice(_this.parent.swimlaneToggleArray.indexOf(key), 1);
                    tabIndex_1 = '0';
                }
                else {
                    addClass([tgtRow, target], COLLAPSED_CLASS);
                    classList(targetIcon, [SWIMLANE_ROW_COLLAPSE_CLASS], [SWIMLANE_ROW_EXPAND_CLASS]);
                    _this.parent.swimlaneToggleArray.push(key);
                    tabIndex_1 = '-1';
                }
                targetIcon.setAttribute('aria-label', isCollapsed ? key + ' Expand' : key + ' Collapse');
                target.setAttribute('aria-expanded', isCollapsed.toString());
                tgtRow.setAttribute('aria-expanded', isCollapsed.toString());
                var rows = [].slice.call(tgtRow.querySelectorAll('.' + CONTENT_CELLS_CLASS));
                rows.forEach(function (cell) { cell.setAttribute('tabindex', tabIndex_1); });
                _this.parent.notify(contentReady, {});
                _this.parent.trigger(actionComplete, { target: headerTarget, requestType: 'rowExpandCollapse' });
            }
        });
    };
    Action.prototype.columnExpandCollapse = function (e) {
        var _this = this;
        var headerTarget = (e instanceof HTMLElement) ? e : e.target;
        var args = { cancel: false, target: headerTarget, requestType: 'columnExpandCollapse' };
        this.parent.trigger(actionBegin, args, function (actionArgs) {
            if (!actionArgs.cancel) {
                var target = closest(headerTarget, '.' + HEADER_CELLS_CLASS);
                var colIndex = target.cellIndex;
                _this.columnToggle(target);
                var collapsed = _this.parent.element.querySelectorAll("." + HEADER_CELLS_CLASS + "." + COLLAPSED_CLASS).length;
                if (collapsed === (_this.parent.columns.length - _this.hideColumnKeys.length)) {
                    var index = (colIndex + 1 === collapsed) ? 1 : colIndex + 2;
                    var headerSelector = "." + HEADER_CELLS_CLASS + ":not(." + STACKED_HEADER_CELL_CLASS + "):nth-child(" + index + ")";
                    var nextCol = _this.parent.element.querySelector(headerSelector);
                    addClass([nextCol], COLLAPSED_CLASS);
                    _this.columnToggle(nextCol);
                }
                _this.parent.notify(contentReady, {});
                _this.parent.trigger(actionComplete, { target: headerTarget, requestType: 'columnExpandCollapse' });
            }
        });
    };
    Action.prototype.columnToggle = function (target) {
        var _this = this;
        var colIndex = target.cellIndex;
        var elementSelector = "." + CONTENT_ROW_CLASS + ":not(." + SWIMLANE_ROW_CLASS + ")";
        var targetRow = [].slice.call(this.parent.element.querySelectorAll(elementSelector));
        var colSelector = "." + TABLE_CLASS + " col:nth-child(" + (colIndex + 1) + ")";
        var targetIcon = target.querySelector("." + COLUMN_EXPAND_CLASS + ",." + COLUMN_COLLAPSE_CLASS);
        var colGroup = [].slice.call(this.parent.element.querySelectorAll(colSelector));
        if (target.classList.contains(COLLAPSED_CLASS)) {
            removeClass(colGroup, COLLAPSED_CLASS);
            if (this.parent.isAdaptive) {
                if (this.parent.enableVirtualization) {
                    colGroup.forEach(function (col) { return col.style.width = formatUnit(_this.parent.virtualLayoutModule.getWidth()); });
                }
                else {
                    colGroup.forEach(function (col) { return col.style.width = formatUnit(_this.parent.layoutModule.getWidth()); });
                }
            }
            classList(targetIcon, [COLUMN_EXPAND_CLASS], [COLUMN_COLLAPSE_CLASS]);
            var _loop_1 = function (row) {
                var targetCol = row.querySelector("." + CONTENT_CELLS_CLASS + ":nth-child(" + (colIndex + 1) + ")");
                removeClass([targetCol, target], COLLAPSED_CLASS);
                remove(targetCol.querySelector('.' + COLLAPSE_HEADER_TEXT_CLASS));
                target.setAttribute('aria-expanded', 'true');
                targetCol.setAttribute('aria-expanded', 'true');
                var collapsedCell = [].slice.call(targetCol.parentElement.querySelectorAll('.' + COLLAPSED_CLASS));
                collapsedCell.forEach(function (cell) {
                    var collapasedText = cell.querySelector('.' + COLLAPSE_HEADER_TEXT_CLASS);
                    collapasedText.style.height = 'auto';
                    if (collapasedText && targetCol.getBoundingClientRect().height < (collapasedText.getBoundingClientRect().height + 10)) {
                        collapasedText.style.height = (targetCol.getBoundingClientRect().height - 4) + 'px';
                    }
                });
            };
            for (var _i = 0, targetRow_1 = targetRow; _i < targetRow_1.length; _i++) {
                var row = targetRow_1[_i];
                _loop_1(row);
            }
            if (this.parent.kanbanData.length === 0 && targetRow.length === 0) {
                removeClass([target], COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'true');
            }
            this.columnToggleArray.splice(this.columnToggleArray.indexOf(target.getAttribute('data-key')), 1);
            this.parent.columns[colIndex].setProperties({ isExpanded: true }, true);
            target.querySelector('.e-header-icon').setAttribute('aria-label', target.getAttribute('data-key') + ' Expand');
        }
        else {
            addClass(colGroup, COLLAPSED_CLASS);
            if (this.parent.isAdaptive) {
                colGroup.forEach(function (col) { return col.style.width = formatUnit(toggleWidth); });
            }
            classList(targetIcon, [COLUMN_COLLAPSE_CLASS], [COLUMN_EXPAND_CLASS]);
            var key = target.getAttribute('data-key');
            var _loop_2 = function (row) {
                var targetCol = row.querySelector("." + CONTENT_CELLS_CLASS + "[data-key=\"" + key + "\"]");
                var index = targetCol.cellIndex;
                var text = void 0;
                if (!this_1.parent.enableVirtualization) {
                    text = (this_1.parent.columns[index].showItemCount ? '[' +
                        targetCol.querySelectorAll('.' + CARD_CLASS).length + '] ' : '') + this_1.parent.columns[index].headerText;
                }
                else {
                    var value = this_1.parent.dataModule.isRemote() ?
                        this_1.parent.columnDataCount[this_1.parent.columns[index].keyField]
                        : this_1.parent.virtualLayoutModule.columnData[this_1.parent.columns[index].keyField].length;
                    text = (this_1.parent.columns[index].showItemCount ? '[' +
                        value + '] ' : '') + this_1.parent.columns[index].headerText;
                }
                targetCol.appendChild(createElement('div', { className: COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                addClass([targetCol, target], COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'false');
                targetCol.setAttribute('aria-expanded', 'false');
                var collapsedCell = [].slice.call(targetCol.parentElement.querySelectorAll('.' + COLLAPSED_CLASS));
                collapsedCell.forEach(function (cell) {
                    var collapasedText = cell.querySelector('.' + COLLAPSE_HEADER_TEXT_CLASS);
                    if (collapasedText && targetCol.getBoundingClientRect().height < (collapasedText.getBoundingClientRect().height + 10)) {
                        collapasedText.style.height = (targetCol.getBoundingClientRect().height - 4) + 'px';
                    }
                });
            };
            var this_1 = this;
            for (var _a = 0, targetRow_2 = targetRow; _a < targetRow_2.length; _a++) {
                var row = targetRow_2[_a];
                _loop_2(row);
            }
            if (this.parent.kanbanData.length === 0 && targetRow.length === 0) {
                addClass([target], COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'false');
            }
            this.columnToggleArray.push(target.getAttribute('data-key'));
            this.parent.columns[colIndex].setProperties({ isExpanded: false }, true);
            target.querySelector('.e-header-icon').setAttribute('aria-label', key + ' Collapse');
        }
    };
    Action.prototype.cardSelection = function (target, isCtrl, isShift) {
        var _this = this;
        if (!target) {
            return;
        }
        var cards = this.parent.getSelectedCards();
        if (this.parent.cardSettings.selectionType !== 'None') {
            var contentRow = closest(target, '.' + CONTENT_ROW_CLASS);
            var index = !isNullOrUndefined(this.lastSelectionRow) ? this.lastSelectionRow.rowIndex : contentRow.rowIndex;
            if (index !== contentRow.rowIndex && (isCtrl || isShift) && this.parent.cardSettings.selectionType === 'Multiple') {
                return;
            }
            if (cards.length !== 0 && (!isCtrl || this.parent.cardSettings.selectionType === 'Single')) {
                removeClass(cards, CARD_SELECTION_CLASS);
                if (this.parent.enableVirtualization) {
                    this.parent.virtualLayoutModule.disableAttributeSelection(cards);
                }
                else {
                    this.parent.layoutModule.disableAttributeSelection(cards);
                }
                cards.forEach(function (el) {
                    _this.selectionArray.splice(_this.selectionArray.indexOf(el.getAttribute('data-id')), 1);
                    _this.selectedCardsElement.splice(_this.selectedCardsElement.indexOf(el), 1);
                    _this.selectedCardsData.splice(_this.selectedCardsData.indexOf(_this.parent.getCardDetails(el), 1));
                });
            }
            if (cards.length > 0 && isShift && this.parent.cardSettings.selectionType === 'Multiple') {
                var curCards_1 = [];
                var start = void 0;
                var end = void 0;
                var i = void 0;
                var allCards = [].slice.call(contentRow.querySelectorAll('.' + CARD_CLASS));
                allCards.forEach(function (el) { return curCards_1.push(el.getAttribute('data-id')); });
                var curId = target.getAttribute('data-id');
                var lastId = this.lastCard.getAttribute('data-id');
                var curIndex = end = curCards_1.indexOf(curId);
                var lastIndex = start = curCards_1.indexOf(lastId);
                var select = curIndex > lastIndex ? 'next' : 'prev';
                if (select === 'prev') {
                    start = curIndex;
                    end = lastIndex;
                }
                for (i = start; i <= end; i++) {
                    var card = allCards[i];
                    addClass([card], CARD_SELECTION_CLASS);
                    card.setAttribute('aria-selected', 'true');
                    card.setAttribute('tabindex', '0');
                    this.selectionArray.push(card.getAttribute('data-id'));
                    this.selectedCardsElement.push(card);
                    this.selectedCardsData.push(this.parent.getCardDetails(card));
                    this.lastCardSelection = card;
                    if (select === 'prev') {
                        this.lastCardSelection = allCards[start];
                    }
                }
            }
            else {
                addClass([target], CARD_SELECTION_CLASS);
                target.setAttribute('aria-selected', 'true');
                target.setAttribute('tabindex', '0');
                this.selectionArray.push(target.getAttribute('data-id'));
                this.selectedCardsElement.push(target);
                this.selectedCardsData.push(this.parent.getCardDetails(target));
                this.lastCard = this.lastCardSelection = target;
                this.lastSelectionRow = closest(target, '.' + CONTENT_ROW_CLASS);
                if (this.lastSelectionRow.previousElementSibling) {
                    var elementSelector = "." + SWIMLANE_ROW_EXPAND_CLASS + ",." + SWIMLANE_ROW_COLLAPSE_CLASS;
                    var parentEle = this.lastSelectionRow.previousElementSibling.querySelector(elementSelector);
                    if (parentEle && parentEle.classList.contains(SWIMLANE_ROW_COLLAPSE_CLASS)) {
                        this.rowExpandCollapse(parentEle);
                    }
                }
            }
        }
    };
    Action.prototype.addColumn = function (columnOptions, index) {
        var addColumn = createInstance(Columns, [this.parent, 'columns', columnOptions, true]);
        this.parent.columns.splice(index, 0, addColumn);
        this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
    };
    Action.prototype.deleteColumn = function (index) {
        var listKey = this.parent.element.querySelectorAll('.' + HEADER_CELLS_CLASS).item(index);
        if (listKey && listKey.classList.contains(HEADER_ROW_TOGGLE_CLASS)) {
            this.columnToggleArray.splice(this.columnToggleArray.indexOf(listKey.getAttribute('data-key'), 0));
        }
        this.parent.columns.splice(index, 1);
        if (this.parent.columns.length === 0) {
            detach(this.parent.element.querySelector('.' + HEADER_CLASS));
            detach(this.parent.element.querySelector('.' + CONTENT_CLASS));
        }
        else {
            this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
        }
    };
    Action.prototype.showColumn = function (key) {
        var index = this.hideColumnKeys.indexOf(key.toString());
        if (index !== -1) {
            this.hideColumnKeys.splice(index, 1);
            this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
        }
    };
    Action.prototype.hideColumn = function (key) {
        this.hideColumnKeys.push(key.toString());
        this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
    };
    /**
     * Maintain the single card selection
     *
     * @param {Record<string, any>} data - Specifies the selected card data.
     * @returns {void}
     * @private
     * @hidden
     */
    Action.prototype.SingleCardSelection = function (data) {
        if (this.parent.cardSettings.selectionType !== 'None' && data[this.parent.cardSettings.headerField]) {
            // eslint-disable-next-line no-useless-escape
            var card = this.parent.element.querySelector('.e-card[data-id=\"' +
                // eslint-disable-next-line no-useless-escape
                data[this.parent.cardSettings.headerField].toString() + '"\]');
            if (card) {
                addClass([card], CARD_SELECTION_CLASS);
                card.setAttribute('aria-selected', 'true');
                card.setAttribute('tabindex', '0');
            }
        }
    };
    return Action;
}());

/**
 * Kanban CRUD module
 */
var Crud = /** @class */ (function () {
    /**
     * Constructor for CRUD module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    function Crud(parent) {
        this.parent = parent;
    }
    Crud.prototype.addCard = function (cardData, index) {
        var _this = this;
        var args = {
            cancel: false, requestType: 'cardCreate', addedRecords: (cardData instanceof Array) ? cardData : [cardData],
            changedRecords: [], deletedRecords: []
        };
        this.parent.trigger(actionBegin, args, function (addArgs) {
            if (!addArgs.cancel) {
                var modifiedData_1 = [];
                if (_this.parent.sortSettings.field && _this.parent.sortSettings.sortBy === 'Index') {
                    if (cardData instanceof Array) {
                        modifiedData_1 = cardData;
                    }
                    else {
                        modifiedData_1.push(cardData);
                    }
                    modifiedData_1.forEach(function (data, index) {
                        if (!data[_this.parent.sortSettings.field]) {
                            var columnData = _this.parent.getColumnData(data[_this.parent.keyField]);
                            if (_this.parent.sortSettings.direction === 'Ascending' && columnData.length > 0) {
                                data[_this.parent.sortSettings.field] =
                                    (columnData[columnData.length - 1][_this.parent.sortSettings.field]) + index + 1;
                            }
                            else if (_this.parent.sortSettings.direction === 'Descending' && columnData.length > 0) {
                                data[_this.parent.sortSettings.field] = columnData[0][_this.parent.sortSettings.field] + index + 1;
                            }
                            if (columnData.length === 0) {
                                data[_this.parent.sortSettings.field] = 1;
                            }
                        }
                    });
                    if (!(cardData instanceof Array)) {
                        if (!index && _this.parent.sortSettings.direction === 'Descending') {
                            // eslint-disable-next-line max-len
                            _this.parent.getColumnData(modifiedData_1[0][_this.parent.keyField]).filter(function (obj, count) {
                                if (obj[_this.parent.sortSettings.field] === modifiedData_1[0][_this.parent.sortSettings.field]) {
                                    index = count + 1;
                                }
                            });
                        }
                    }
                    if (index !== 0 && !index && _this.parent.sortSettings.direction === 'Descending') {
                        index = 0;
                    }
                    modifiedData_1 = _this.priorityOrder(modifiedData_1, index);
                }
                var addedRecords = (cardData instanceof Array) ? cardData : [cardData];
                var changedRecords = (_this.parent.sortSettings.field && _this.parent.sortSettings.sortBy === 'Index') ? modifiedData_1 : [];
                var editParms = { addedRecords: addedRecords, changedRecords: changedRecords, deletedRecords: [] };
                var type = (cardData instanceof Array || modifiedData_1.length > 0) ? 'batch' : 'insert';
                _this.parent.dataModule.updateDataManager(type, editParms, 'cardCreated', cardData, index);
            }
        });
    };
    Crud.prototype.getIndexFromData = function (data) {
        var cardElement = this.parent.element.querySelector("." + CARD_CLASS + "[data-id=\"" + data[this.parent.cardSettings.headerField] + "\"]");
        var element = closest(cardElement, '.' + CONTENT_CELLS_CLASS);
        var index = [].slice.call(element.querySelectorAll('.' + CARD_CLASS)).indexOf(cardElement);
        return index;
    };
    Crud.prototype.updateCard = function (cardData, index, isDropped, dataDropIndexKeyFieldValue, draggedKey, droppedKey, isMultipleDrag) {
        var _this = this;
        var args = {
            requestType: 'cardChange', cancel: false, addedRecords: [],
            changedRecords: (cardData instanceof Array) ? cardData : [cardData], deletedRecords: []
        };
        index = isNullOrUndefined(index) ? this.getIndexFromData(args.changedRecords[0]) : index;
        this.parent.trigger(actionBegin, args, function (updateArgs) {
            if (!updateArgs.cancel) {
                if (_this.parent.sortSettings.field && _this.parent.sortSettings.sortBy === 'Index') {
                    var modifiedData = [];
                    if (cardData instanceof Array) {
                        modifiedData = cardData;
                    }
                    else {
                        modifiedData.push(cardData);
                    }
                    cardData = _this.priorityOrder(modifiedData, index);
                }
                var editParms = {
                    addedRecords: [], changedRecords: (cardData instanceof Array) ? cardData : [cardData], deletedRecords: []
                };
                var type = (cardData instanceof Array) ? 'batch' : 'update';
                _this.parent.dataModule.updateDataManager(type, editParms, 'cardChanged', cardData, index, isDropped, dataDropIndexKeyFieldValue, draggedKey, droppedKey, isMultipleDrag);
            }
        });
    };
    Crud.prototype.deleteCard = function (cardData) {
        var _this = this;
        var editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
        if (typeof cardData === 'string' || typeof cardData === 'number') {
            editParms.deletedRecords = this.parent.kanbanData.filter(function (data) {
                return data[_this.parent.cardSettings.headerField] === cardData;
            });
        }
        else {
            editParms.deletedRecords = (cardData instanceof Array) ? cardData : [cardData];
        }
        var args = {
            requestType: 'cardRemove', cancel: false, addedRecords: [], changedRecords: [], deletedRecords: editParms.deletedRecords
        };
        this.parent.trigger(actionBegin, args, function (deleteArgs) {
            if (!deleteArgs.cancel) {
                var type = (editParms.deletedRecords.length > 1) ? 'batch' : 'delete';
                var cardData_1 = editParms.deletedRecords;
                _this.parent.dataModule.updateDataManager(type, editParms, 'cardRemoved', cardData_1[0]);
            }
        });
    };
    Crud.prototype.priorityOrder = function (cardData, cardIndex) {
        var _this = this;
        var cardsId = cardData.map(function (obj) { return obj[_this.parent.cardSettings.headerField]; });
        var num = cardData[cardData.length - 1][this.parent.sortSettings.field];
        var allModifiedKeys = cardData.map(function (obj) { return obj[_this.parent.keyField]; });
        var modifiedKey = allModifiedKeys.filter(function (key, index) { return allModifiedKeys.indexOf(key) === index; }).sort();
        var columnAllDatas;
        var finalData = [];
        var originalIndex = [];
        var _loop_1 = function (columnKey) {
            var keyData = cardData.filter(function (cardObj) {
                return cardObj[_this.parent.keyField] === columnKey;
            });
            columnAllDatas = this_1.parent.enableVirtualization ? this_1.parent.virtualLayoutModule.getColumnData(columnKey)
                : this_1.parent.layoutModule.getColumnData(columnKey);
            for (var _i = 0, _a = keyData; _i < _a.length; _i++) {
                var data = _a[_i];
                if (this_1.parent.swimlaneSettings.keyField) {
                    var swimlaneDatas = this_1.parent.getSwimlaneData(data[this_1.parent.swimlaneSettings.keyField]);
                    columnAllDatas = this_1.parent.getColumnData(columnKey, swimlaneDatas);
                }
            }
            keyData.forEach(function (key) { return finalData.push(key); });
            if (!isNullOrUndefined(cardIndex)) {
                var _loop_2 = function (j) {
                    columnAllDatas.filter(function (data, index) {
                        if (data[_this.parent.cardSettings.headerField] === cardsId[j] && index <= cardIndex) {
                            originalIndex.push(index);
                        }
                    });
                };
                for (var j = 0; j < cardsId.length; j++) {
                    _loop_2(j);
                }
                if (originalIndex.length > 0) {
                    cardIndex = cardIndex + originalIndex.length;
                }
                if (this_1.parent.sortSettings.direction === 'Ascending') {
                    for (var i = cardIndex; i < columnAllDatas.length; i++) {
                        if (cardsId.indexOf(columnAllDatas[i][this_1.parent.cardSettings.headerField]) === -1) {
                            columnAllDatas[i][this_1.parent.sortSettings.field] = ++num;
                            finalData.push(columnAllDatas[i]);
                        }
                    }
                }
                else {
                    for (var i = cardIndex - 1; i >= 0; i--) {
                        if (cardsId.indexOf(columnAllDatas[i][this_1.parent.cardSettings.headerField]) === -1) {
                            columnAllDatas[i][this_1.parent.sortSettings.field] = ++num;
                            finalData.push(columnAllDatas[i]);
                        }
                    }
                }
            }
        };
        var this_1 = this;
        for (var _i = 0, modifiedKey_1 = modifiedKey; _i < modifiedKey_1.length; _i++) {
            var columnKey = modifiedKey_1[_i];
            _loop_1(columnKey);
        }
        return finalData;
    };
    return Crud;
}());

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Drag and Drop module is used to perform card actions.
 */
var DragAndDrop = /** @class */ (function () {
    /**
     * Constructor for drag and drop module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    function DragAndDrop(parent) {
        this.insertClone = 'afterend';
        this.parent = parent;
        this.dragObj = {
            element: null, cloneElement: null, instance: null, targetClone: null, draggedClone: null, targetCloneMulti: null,
            selectedCards: [], pageX: 0, pageY: 0, navigationInterval: null, cardDetails: [], modifiedData: []
        };
        this.dragEdges = { left: false, right: false, top: false, bottom: false };
        this.isDragging = false;
        this.isExternalDrop = false;
    }
    DragAndDrop.prototype.wireDragEvents = function (element) {
        var dragContainment;
        if (!this.parent.element != null && this.parent.externalDropId.length === 0) {
            dragContainment = this.parent.element.querySelector('.' + CONTENT_CLASS);
        }
        this.dragObj.instance = new Draggable(element, {
            clone: true,
            enableTapHold: this.parent.isAdaptive,
            enableTailMode: true,
            cursorAt: { top: -10, left: -10 },
            dragArea: dragContainment,
            dragStart: this.dragStart.bind(this),
            drag: this.drag.bind(this),
            dragStop: this.dragStop.bind(this),
            enableAutoScroll: false,
            helper: this.dragHelper.bind(this)
        });
    };
    DragAndDrop.prototype.dragHelper = function (e) {
        if (this.parent.isAdaptive && this.parent.touchModule.mobilePopup &&
            this.parent.touchModule.mobilePopup.element.classList.contains(POPUP_OPEN_CLASS)) {
            this.parent.touchModule.mobilePopup.hide();
        }
        this.dragObj.element = closest(e.sender.target, '.' + CARD_CLASS);
        if (isNullOrUndefined(this.dragObj.element)) {
            return null;
        }
        this.dragObj.element.style.width = formatUnit(this.dragObj.element.offsetWidth);
        var cloneWrapper = createElement('div', { innerHTML: this.dragObj.element.outerHTML });
        this.dragObj.cloneElement = cloneWrapper.children.item(0);
        addClass([this.dragObj.cloneElement], CLONED_CARD_CLASS);
        this.dragObj.element.parentElement.appendChild(this.dragObj.cloneElement);
        this.dragObj.targetCloneMulti = createElement('div', { className: TARGET_MULTI_CLONE_CLASS });
        this.dragObj.targetClone = createElement('div', {
            className: DROPPED_CLONE_CLASS,
            styles: 'width:100%;height:' + formatUnit(this.dragObj.element.offsetHeight)
        });
        this.dragObj.modifiedData = [];
        return this.dragObj.cloneElement;
    };
    DragAndDrop.prototype.dragStart = function (e) {
        var _this = this;
        this.dragObj.selectedCards = this.dragObj.element;
        this.borderElm = this.parent.element.querySelectorAll('.' + BORDER_CLASS);
        if (this.dragObj.element.classList.contains(CARD_SELECTION_CLASS)) {
            var className = '.' + CARD_CLASS + '.' + CARD_SELECTION_CLASS + ':not(.' + CLONED_CARD_CLASS + ')';
            var closestEle = closest(this.dragObj.element, '.' + CONTENT_ROW_CLASS);
            this.dragObj.selectedCards = [].slice.call(closestEle.querySelectorAll(className));
            this.dragObj.selectedCards.forEach(function (element) {
                _this.dragObj.cardDetails.push(_this.parent.getCardDetails(element));
            });
        }
        else {
            this.dragObj.cardDetails = [this.parent.getCardDetails(this.dragObj.element)];
        }
        if (!isNullOrUndefined(this.dragObj.selectedCards) && !isNullOrUndefined(this.dragObj.selectedCards.length) &&
            this.dragObj.selectedCards.length >= 1) {
            this.dragObj.selectedCards[0].closest('.e-content-cells').classList.add('e-dragged-column');
        }
        else if (!isNullOrUndefined(this.dragObj.selectedCards) &&
            !isNullOrUndefined(this.dragObj.selectedCards.closest('.e-content-cells'))) {
            this.dragObj.selectedCards.closest('.e-content-cells').classList.add('e-dragged-column');
        }
        var dragArgs = { cancel: false, data: this.dragObj.cardDetails, event: e, element: this.dragObj.selectedCards };
        this.parent.trigger(dragStart, dragArgs, function (dragEventArgs) {
            if (dragEventArgs.cancel) {
                _this.removeElement(_this.dragObj.cloneElement);
                _this.dragObj.instance.intDestroy(e);
                _this.dragObj.element = null;
                _this.dragObj.targetClone = null;
                _this.dragObj.draggedClone = null;
                _this.dragObj.cloneElement = null;
                _this.dragObj.targetCloneMulti = null;
                return;
            }
            if (_this.dragObj.element.classList.contains(CARD_SELECTION_CLASS)) {
                _this.dragObj.selectedCards.forEach(function (element) { _this.draggedClone(element); });
                if (_this.dragObj.selectedCards.length > 1) {
                    _this.dragObj.cloneElement.innerHTML = '';
                    var drag = createElement('div', {
                        className: 'e-multi-card-text',
                        innerHTML: _this.dragObj.selectedCards.length + ' ' + _this.parent.localeObj.getConstant('cards')
                    });
                    _this.dragObj.cloneElement.appendChild(drag);
                    classList(_this.dragObj.cloneElement, ['e-multi-card-clone'], [CARD_SELECTION_CLASS]);
                    if (_this.parent.enableVirtualization) {
                        _this.parent.virtualLayoutModule.disableAttributeSelection(_this.dragObj.cloneElement);
                    }
                    else {
                        _this.parent.layoutModule.disableAttributeSelection(_this.dragObj.cloneElement);
                    }
                    _this.dragObj.cloneElement.style.width = '90px';
                }
            }
            else {
                _this.draggedClone(_this.dragObj.element);
            }
            EventHandler.add(document.body, 'keydown', _this.keydownHandler, _this);
            _this.parent.notify(contentReady, {});
        });
    };
    DragAndDrop.prototype.draggedClone = function (element) {
        this.dragObj.draggedClone = createElement('div', {
            className: DRAGGED_CLONE_CLASS,
            styles: 'width:' + formatUnit(element.offsetWidth - 1) + ';height:' + formatUnit(element.offsetHeight)
        });
        element.insertAdjacentElement('afterend', this.dragObj.draggedClone);
        addClass([element], DRAGGED_CARD_CLASS);
    };
    DragAndDrop.prototype.drag = function (e) {
        var _this = this;
        if (!e.target) {
            return;
        }
        var cardElement = closest(e.target, '.' + ROOT_CLASS + ' .' + CARD_CLASS);
        if (!isNullOrUndefined(cardElement) && this.parent.enableVirtualization && !isNullOrUndefined(e.target.previousElementSibling) &&
            !isNullOrUndefined(e.target.previousElementSibling.querySelector('.e-target-dropped-clone'))) {
            cardElement = e.target.previousElementSibling.querySelector('.e-target-dropped-clone').nextElementSibling;
        }
        var targetEle = e.target;
        if (!isNullOrUndefined(e.target.parentElement)) {
            if (e.target.nodeName === 'SPAN' && e.target.classList.contains('e-empty-card')) {
                targetEle = e.target.parentElement;
            }
            else if (e.target.nodeName === 'DIV' && e.target.classList.contains('e-kanban-border')) {
                if (!(this.parent.element.querySelector('.e-target-dropped-clone') === e.target.nextElementSibling.firstChild)) {
                    targetEle = e.target.parentElement;
                }
            }
        }
        var target = cardElement || targetEle;
        var selector = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + ') .' + CONTENT_CELLS_CLASS
            + '.' + DROPPABLE_CLASS;
        var contentCell = closest(target, selector);
        var cellDimension;
        var borderElem;
        var dropElement;
        if (target.nextElementSibling && target.nextElementSibling.lastChild) {
            dropElement = target.nextElementSibling.lastChild.previousElementSibling;
        }
        this.externalDrop(target);
        this.kanbanObj = this.parent.isExternalKanbanDrop ? this.parent.externalDropObj : this.parent;
        this.calculateArgs(e);
        if (contentCell && document.body.style.cursor !== 'not-allowed') {
            var targetKey = this.getColumnKey(contentCell);
            var keys = targetKey.split(',');
            this.multiCloneRemove();
            var isDrag = (targetKey === this.getColumnKey(closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS)))
                ? true : false;
            if (keys.length === 1 || isDrag) {
                if (target.classList.contains(DRAGGED_CLONE_CLASS)) {
                    this.removeElement(this.dragObj.targetClone, this.kanbanObj);
                }
                if (target.classList.contains(CARD_CLASS) || this.insertClone === 'beforebegin') {
                    var element = target.classList.contains(DRAGGED_CLONE_CLASS) ?
                        (target.previousElementSibling.classList.contains(DRAGGED_CARD_CLASS) ? null : target.previousElementSibling)
                        : target.previousElementSibling;
                    this.insertClone = 'afterend';
                    if (isNullOrUndefined(element)) {
                        var pageY = target.classList.contains(DRAGGED_CLONE_CLASS) ? (this.dragObj.pageY / 2) :
                            this.dragObj.pageY;
                        var height = target.classList.contains(DRAGGED_CLONE_CLASS) ? target.offsetHeight :
                            (target.offsetHeight / 2);
                        var kanbanTop = this.kanbanObj.element.getBoundingClientRect().top + window.scrollY;
                        var targetTop = target.getBoundingClientRect().top + window.scrollY;
                        var relativeTop = targetTop - kanbanTop;
                        pageY = pageY - kanbanTop;
                        if ((pageY - relativeTop) < height) {
                            this.insertClone = 'beforebegin';
                        }
                    }
                    if (target.classList.contains(CARD_CLASS)) {
                        if (this.parent.enableVirtualization) {
                            this.insertClone = this.isTargetElementVisible(target) ? this.insertClone : 'beforebegin';
                        }
                        target.insertAdjacentElement(this.insertClone, this.dragObj.targetClone);
                    }
                }
                else if (target.classList.contains(CONTENT_CELLS_CLASS) && !closest(target, '.' + SWIMLANE_ROW_CLASS)) {
                    if (target.querySelectorAll('.' + DRAGGED_CARD_CLASS).length !== 0 &&
                        target.querySelectorAll('.' + CARD_CLASS + ':not(.e-kanban-dragged-card):not(.e-cloned-card)').length === 0) {
                        return;
                    }
                    else {
                        target.querySelector('.' + CARD_WRAPPER_CLASS).appendChild(this.dragObj.targetClone);
                    }
                }
                else if ((target.classList.contains(CARD_WRAPPER_CLASS) ||
                    target.classList.contains(CARD_VIRTUAL_WRAPPER_CLASS)) &&
                    !closest(target, '.' + SWIMLANE_ROW_CLASS)
                    && contentCell.querySelectorAll('.' + CARD_CLASS).length === 0) {
                    target.appendChild(this.dragObj.targetClone);
                }
                else if (target.classList.contains(BORDER_CLASS) && !closest(target, '.' + SWIMLANE_ROW_CLASS)
                    && (target.nextElementSibling && target.nextElementSibling.classList.contains(CARD_WRAPPER_CLASS))
                    && this.dragObj.targetClone && (!dropElement || !dropElement.classList.contains(DROPPED_CLONE_CLASS))) {
                    if (!this.parent.enableVirtualization && !this.isTargetElementVisible(target.nextElementSibling)) {
                        target.nextElementSibling.appendChild(this.dragObj.targetClone);
                    }
                }
            }
            else if (keys.length > 1 && (contentCell.classList.contains(DROPPING_CLASS) ||
                contentCell.firstChild && contentCell.firstChild.classList.contains(DROPPING_CLASS))) {
                this.multiCloneCreate(keys, contentCell);
            }
            this.kanbanObj.notify(contentReady, {});
        }
        if (this.kanbanObj.element.querySelectorAll('.' + DROPPING_CLASS).length === 0) {
            this.cellDropping();
        }
        var isCollapsed = false;
        if (contentCell) {
            isCollapsed = contentCell.classList.contains(COLLAPSED_CLASS) && contentCell.classList.contains(DROPPING_CLASS);
            if (contentCell.getAttribute('aria-expanded') === 'true' || !contentCell.parentElement.hasAttribute('aria-expanded')) {
                cellDimension = contentCell.getBoundingClientRect();
                this.updateDimension(cellDimension);
            }
            borderElem = contentCell.querySelector('.' + BORDER_CLASS);
        }
        if (target && target.tagName === 'TABLE' && !isNullOrUndefined(target.querySelector('.' + CONTENT_ROW_CLASS))) {
            cellDimension = target.querySelector('.' + CONTENT_ROW_CLASS).getBoundingClientRect();
            this.updateDimension(cellDimension, target);
        }
        if (isCollapsed) {
            this.toggleVisible(target);
            addClass([contentCell], TOGGLE_VISIBLE_CLASS);
        }
        var tColumn = [].slice.call(this.kanbanObj.element.querySelectorAll('.' + TOGGLE_VISIBLE_CLASS));
        if (tColumn.length > 0 && !target.classList.contains(TOGGLE_VISIBLE_CLASS)
            && !closest(target, '.' + TOGGLE_VISIBLE_CLASS)) {
            this.toggleVisible(target, tColumn.slice(-1)[0]);
            removeClass(tColumn, TOGGLE_VISIBLE_CLASS);
        }
        this.kanbanObj.notify(contentReady, {});
        var multiKeyTarget = closest(target, '.' + MULTI_COLUMN_KEY_CLASS);
        if (multiKeyTarget) {
            var columnKeys = [].slice.call(this.kanbanObj.element.querySelectorAll('.' + MULTI_COLUMN_KEY_CLASS + ':not(.' +
                DISABLED_CLASS + ')')).filter(function (element) { return _this.getColumnKey(element) === _this.getColumnKey(multiKeyTarget); });
            if (columnKeys.length > 0) {
                addClass(columnKeys, MULTI_ACTIVE_CLASS);
                if (columnKeys[0].previousElementSibling) {
                    addClass([columnKeys[0].previousElementSibling], 'e-multi-bottom-border');
                }
            }
        }
        document.body.style.cursor = (contentCell && contentCell.classList.contains(DROPPING_CLASS) ||
            (contentCell && borderElem && borderElem.classList.contains(DROPPING_CLASS))) ? '' : 'not-allowed';
        if (cardElement && !(closest(cardElement, '.' + CONTENT_CELLS_CLASS)).classList.contains(DROPPING_CLASS) &&
            !(contentCell && borderElem && borderElem.classList.contains(DROPPING_CLASS))) {
            cardElement.style.cursor = 'not-allowed';
            document.body.style.cursor = 'not-allowed';
        }
        if (this.isExternalDrop && document.body.style.cursor === 'not-allowed') {
            document.body.style.cursor = '';
        }
        if (document.body.style.cursor === 'not-allowed') {
            this.removeElement(this.dragObj.targetClone, this.kanbanObj);
            this.multiCloneRemove();
        }
        this.updateScrollPosition();
        var dragArgs = { data: this.dragObj.cardDetails, event: e, element: this.dragObj.selectedCards };
        this.kanbanObj.trigger(drag, dragArgs);
        this.parent.isExternalKanbanDrop = false;
        this.isExternalDrop = false;
    };
    DragAndDrop.prototype.removeElement = function (element, kanbanObj) {
        kanbanObj = kanbanObj ? kanbanObj : this.parent;
        if (kanbanObj.element.getElementsByClassName(element.className).length > 0) {
            remove(element);
        }
    };
    DragAndDrop.prototype.isTargetElementVisible = function (targetElem) {
        var wrapperElem = closest(targetElem, '.' + CARD_WRAPPER_CLASS);
        if (!isNullOrUndefined(wrapperElem)) {
            var wrapperElemBottom = wrapperElem.getBoundingClientRect().bottom;
            var targetElemBottom = targetElem.getBoundingClientRect().bottom;
            if (targetElemBottom > wrapperElemBottom) {
                return false;
            }
            return true;
        }
        return true;
    };
    DragAndDrop.prototype.externalDrop = function (target) {
        var _this = this;
        this.parent.externalDropId.forEach(function (externalDropId) {
            var targetRootElement = closest(target, externalDropId);
            if (targetRootElement) {
                if (targetRootElement.classList.contains('e-kanban')) {
                    _this.parent.externalDropObj = document.querySelector(externalDropId).ej2_instances[0];
                    _this.parent.isExternalKanbanDrop = true;
                    var className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS +
                        '):not(.' + COLLAPSED_CLASS + ') .' + CONTENT_CELLS_CLASS;
                    var cells = [].slice.call(_this.parent.externalDropObj.element.querySelectorAll(className));
                    addClass(cells, DROPPING_CLASS);
                }
                else {
                    _this.isExternalDrop = true;
                }
            }
        });
    };
    DragAndDrop.prototype.multiCloneCreate = function (keys, contentCell) {
        var offsetHeight = contentCell.offsetHeight;
        var limitEle = contentCell.querySelector('.' + LIMITS_CLASS);
        if (limitEle) {
            offsetHeight -= limitEle.offsetHeight;
        }
        this.dragObj.targetCloneMulti.style.height = formatUnit(offsetHeight);
        if (contentCell.querySelector('.' + SHOW_ADD_BUTTON)) {
            addClass([contentCell.querySelector('.' + SHOW_ADD_BUTTON)], MULTI_CARD_WRAPPER_CLASS);
        }
        addClass([contentCell.querySelector('.' + CARD_WRAPPER_CLASS)], MULTI_CARD_WRAPPER_CLASS);
        contentCell.querySelector('.' + CARD_WRAPPER_CLASS).style.height = 'auto';
        contentCell.style.borderStyle = 'none';
        this.removeElement(this.dragObj.targetClone);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var dragCell = closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS);
            var transition = this.kanbanObj.columns[dragCell.cellIndex].transitionColumns;
            var allowTransition = this.allowedTransition(this.dragObj.element.getAttribute('data-key'), key, transition);
            var name_1 = allowTransition ? '' : ' ' + DISABLED_CLASS;
            var colKey = createElement('div', {
                className: MULTI_COLUMN_KEY_CLASS + name_1,
                attrs: { 'data-key': key.trim() }
            });
            var text = createElement('div', { className: 'e-text', innerHTML: key.trim() });
            contentCell.appendChild(this.dragObj.targetCloneMulti).appendChild(colKey).appendChild(text);
            colKey.style.cursor = allowTransition ? '' : 'not-allowed';
            colKey.style.lineHeight = colKey.style.height = formatUnit((offsetHeight / keys.length));
            text.style.top = formatUnit((offsetHeight / 2) - (text.offsetHeight / 2));
        }
    };
    DragAndDrop.prototype.allowedTransition = function (currentCardKey, targetCardKey, allowedKey) {
        var allowTransition = true;
        var targetKey = targetCardKey.split(',');
        for (var i = 0; i < targetKey.length; i++) {
            if (currentCardKey === targetKey[i].trim()) {
                return true;
            }
            if (allowedKey) {
                if (allowedKey.length === 1 && allowedKey[0].length === 0) {
                    return true;
                }
                for (var j = 0; j < allowedKey.length; j++) {
                    if (targetKey[i].trim() === allowedKey[j].trim()) {
                        return true;
                    }
                    else {
                        allowTransition = false;
                    }
                }
            }
        }
        return allowTransition;
    };
    DragAndDrop.prototype.cellDropping = function () {
        var _this = this;
        var dragCell = closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS);
        var dragRow = closest(this.dragObj.draggedClone, '.' + CONTENT_ROW_CLASS);
        if (dragCell && dragCell.classList.contains(DROP_CLASS)) {
            addClass([dragCell], DROPPING_CLASS);
        }
        this.addDropping(dragRow, dragCell);
        if (this.kanbanObj.swimlaneSettings.keyField && this.kanbanObj.swimlaneSettings.allowDragAndDrop) {
            var className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + '):not(.' + COLLAPSED_CLASS + ')';
            var rows = [].slice.call(this.kanbanObj.element.querySelectorAll(className));
            [].slice.call(rows).forEach(function (row) {
                if (dragRow !== row) {
                    _this.addDropping(row, dragCell);
                }
            });
        }
    };
    DragAndDrop.prototype.addDropping = function (dragRow, dragCell) {
        var _this = this;
        if (dragCell && this.borderElm && this.borderElm.length !== 0) {
            if (dragCell.classList.contains(DROPPING_CLASS)) {
                removeClass([dragCell], DROPPING_CLASS);
            }
            var cellDimension = dragCell.getBoundingClientRect();
            this.updateDimension(cellDimension);
        }
        else if (dragCell && dragRow) {
            [].slice.call(dragRow.children).forEach(function (cell) {
                var transition = _this.kanbanObj.columns[dragCell.cellIndex].transitionColumns;
                if (cell !== dragCell && cell.classList.contains(DROP_CLASS) &&
                    _this.allowedTransition(dragCell.getAttribute('data-key'), cell.getAttribute('data-key'), transition)) {
                    addClass([cell], DROPPING_CLASS);
                }
            });
        }
    };
    DragAndDrop.prototype.updateDimension = function (dimensions, target) {
        [].slice.call(this.borderElm).forEach(function (element) {
            if (element.parentElement && (element.parentElement.getAttribute('aria-expanded') === 'true' || !element.parentElement.hasAttribute('aria-expanded'))) {
                addClass([element], DROPPING_CLASS);
            }
            var hasAddButton = element.previousElementSibling;
            element.style.height = parseInt(dimensions.height.toString(), 10) - (hasAddButton &&
                hasAddButton.classList.contains(SHOW_ADD_BUTTON) ? hasAddButton.offsetHeight + hasAddButton.offsetTop : 0) + 'px';
            if (!target || target.tagName !== 'TABLE') {
                element.style.width = parseInt(dimensions.width.toString(), 10) + 'px';
            }
            element.style.left = (element.parentElement.getBoundingClientRect().left - closest(element, '.e-kanban').getBoundingClientRect().left) + 'px';
        });
    };
    DragAndDrop.prototype.keydownHandler = function (e) {
        if (e.code === 'Escape' && this.dragObj.cloneElement) {
            EventHandler.remove(this.dragObj.cloneElement, 'keydown', this.keydownHandler);
            this.dragObj.element.removeAttribute('aria-grabbed');
            this.dragStopClear();
            this.dragStopPostClear();
        }
    };
    DragAndDrop.prototype.dragStop = function (e) {
        var _this = this;
        var contentCell = closest(this.dragObj.targetClone, '.' + CONTENT_CELLS_CLASS);
        if (this.parent.enableVirtualization && !isNullOrUndefined(contentCell)) {
            contentCell.classList.add('e-dropped-column');
        }
        var columnKey;
        var dropIndex;
        var dataDropIndexKeyfieldValue;
        var isMultipleDrag;
        EventHandler.remove(document.body, 'keydown', this.keydownHandler);
        [].slice.call(this.borderElm).forEach(function (element) {
            element.classList.remove(DROPPING_CLASS);
        });
        if (this.dragObj.targetClone.parentElement) {
            isMultipleDrag = (this.dragObj.selectedCards && this.dragObj.selectedCards.length > 1
                && this.parent.sortSettings.sortBy === 'Index');
            var className = !isMultipleDrag ? '.' + CARD_CLASS + ':not(.' + DRAGGED_CARD_CLASS + ', .' + CLONED_CARD_CLASS + '),.' + DROPPED_CLONE_CLASS :
                '.' + CARD_CLASS + ':not(.' + CLONED_CARD_CLASS + '),.' + DROPPED_CLONE_CLASS;
            var element = [].slice.call(this.dragObj.targetClone.parentElement.querySelectorAll(className));
            dropIndex = element.indexOf(this.dragObj.targetClone);
            if (this.parent.enableVirtualization && !isNullOrUndefined(this.dragObj.targetClone.nextElementSibling)) {
                dataDropIndexKeyfieldValue = this.dragObj.targetClone.nextElementSibling.getAttribute('data-id');
            }
        }
        if (!isNullOrUndefined(this.kanbanObj) && this.kanbanObj.element.querySelector('.' + TARGET_MULTI_CLONE_CLASS)) {
            columnKey = closest(e.target, '.' + MULTI_COLUMN_KEY_CLASS + ':not(.' + DISABLED_CLASS + ')');
        }
        if (contentCell || columnKey) {
            var cardStatus_1;
            if (contentCell) {
                cardStatus_1 = this.getColumnKey(contentCell);
            }
            else {
                cardStatus_1 = this.getColumnKey(columnKey);
                contentCell = closest(columnKey, '.' + CONTENT_CELLS_CLASS);
            }
            if (this.dragObj.selectedCards instanceof HTMLElement) {
                this.updateDroppedData(this.dragObj.selectedCards, cardStatus_1, contentCell);
            }
            else {
                this.dragObj.selectedCards.forEach(function (element) { _this.updateDroppedData(element, cardStatus_1, contentCell); });
            }
            if (this.parent.sortSettings.field && this.parent.sortSettings.sortBy === 'Index') {
                this.changeOrder(this.dragObj.modifiedData, e.helper);
            }
        }
        if (this.dragObj.modifiedData.length === 0) {
            this.dragObj.modifiedData = this.dragObj.cardDetails;
        }
        var dragArgs = {
            cancel: false, data: this.dragObj.modifiedData, event: e, element: this.dragObj.selectedCards,
            dropIndex: dropIndex
        };
        this.parent.trigger(dragStop, dragArgs, function (dragEventArgs) {
            _this.dragStopClear();
            if (!dragEventArgs.cancel) {
                if (contentCell || columnKey) {
                    var updateCard = dragEventArgs.data instanceof Array &&
                        dragEventArgs.data.length > 1 ? dragEventArgs.data :
                        dragEventArgs.data[0];
                    var draggedColumnKey = void 0;
                    var droppedColumnKey = void 0;
                    if (_this.parent.enableVirtualization) {
                        draggedColumnKey = contentCell.closest('.e-kanban').querySelector('.e-dragged-column').getAttribute('data-key');
                        droppedColumnKey = contentCell.getAttribute('data-key');
                    }
                    _this.parent.crudModule.updateCard(updateCard, dragEventArgs.dropIndex, true, dataDropIndexKeyfieldValue, draggedColumnKey, droppedColumnKey, isMultipleDrag);
                    if (_this.parent.enableVirtualization) {
                        _this.parent.virtualLayoutModule.refreshColumnData(draggedColumnKey, droppedColumnKey);
                        _this.parent.virtualLayoutModule.ensureColumnNotEmpty(draggedColumnKey);
                    }
                }
            }
            _this.removeEmptyTrElement();
            _this.dragStopPostClear();
        });
    };
    DragAndDrop.prototype.removeEmptyTrElement = function () {
        if (!this.parent.swimlaneSettings.showEmptyRow) {
            var swimlaneRowList = this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row');
            for (var j = 0; j < swimlaneRowList.length; j++) {
                var cardRowData = swimlaneRowList[j].nextElementSibling.querySelectorAll('.e-card-wrapper .e-card');
                if (!isNullOrUndefined(swimlaneRowList[j].nextElementSibling) && cardRowData.length === 0) {
                    detach(swimlaneRowList[j].nextElementSibling);
                    detach(swimlaneRowList[j]);
                }
            }
        }
    };
    DragAndDrop.prototype.dragStopClear = function () {
        this.removeElement(this.dragObj.draggedClone);
        this.removeElement(this.dragObj.targetClone, this.kanbanObj);
        this.removeElement(this.dragObj.cloneElement);
        var dragMultiClone = [].slice.call(this.parent.element.querySelectorAll('.' + DRAGGED_CLONE_CLASS));
        dragMultiClone.forEach(function (clone) { remove(clone); });
        this.dragObj.element.style.removeProperty('width');
        this.multiCloneRemove();
        if (this.dragObj.selectedCards instanceof HTMLElement) {
            removeClass([this.dragObj.selectedCards], DRAGGED_CARD_CLASS);
        }
        else {
            removeClass(this.dragObj.selectedCards, DRAGGED_CARD_CLASS);
        }
        clearInterval(this.dragObj.navigationInterval);
        this.dragObj.navigationInterval = null;
        if (document.body.style.cursor === 'not-allowed') {
            document.body.style.cursor = '';
        }
        var styleCards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS + '[style]'));
        styleCards.forEach(function (styleCard) { styleCard.style.cursor = ''; });
        var className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + ')';
        var cells = [].slice.call(this.parent.element.querySelectorAll(className + ' .' + CONTENT_CELLS_CLASS));
        cells.forEach(function (cell) { return removeClass([cell], DROPPING_CLASS); });
        if (this.parent.externalDropObj) {
            var externalCells = [].slice.call(this.parent.externalDropObj.element.querySelectorAll(className + ' .' +
                CONTENT_CELLS_CLASS));
            externalCells.forEach(function (externalCell) { return removeClass([externalCell], DROPPING_CLASS); });
        }
    };
    DragAndDrop.prototype.dragStopPostClear = function () {
        if (this.parent.isAdaptive) {
            this.parent.touchModule.tabHold = false;
        }
        if (this.parent.element.querySelector('.e-dragged-column')) {
            this.parent.element.querySelector('.e-dragged-column').classList.remove('e-dragged-column');
        }
        if (this.parent.element.querySelector('.e-dropped-column')) {
            this.parent.element.querySelector('.e-dropped-column').classList.remove('e-dropped-column');
        }
        this.dragObj.cardDetails = this.dragObj.modifiedData = [];
        this.isDragging = false;
        this.parent.isExternalKanbanDrop = false;
        this.parent.externalDropObj = null;
    };
    DragAndDrop.prototype.updateDroppedData = function (element, cardStatus, contentCell) {
        var crudObj = this.parent.getCardDetails(element);
        var crudData = extend({}, crudObj, null, true);
        if (cardStatus.split(',').length === 1) {
            crudData[this.parent.keyField] = cardStatus;
        }
        if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneSettings.allowDragAndDrop) {
            var prev = closest(contentCell, '.' + CONTENT_ROW_CLASS).previousElementSibling;
            if (this.parent.isAdaptive) {
                var keyField = this.parent.layoutModule.kanbanRows[this.parent.layoutModule.swimlaneIndex].keyField;
                crudData[this.parent.swimlaneSettings.keyField] = keyField;
            }
            else {
                crudData[this.parent.swimlaneSettings.keyField] = this.getColumnKey(prev);
            }
        }
        this.dragObj.modifiedData.push(crudData);
    };
    DragAndDrop.prototype.changeOrder = function (modifieddata, draggedCard) {
        var _this = this;
        var prevele = false;
        var element;
        if (this.kanbanObj.sortSettings.direction === 'Ascending') {
            element = (draggedCard === this.dragObj.targetClone.previousElementSibling) &&
                (this.dragObj.targetClone.previousElementSibling &&
                    this.dragObj.targetClone.previousElementSibling.previousElementSibling) ?
                this.dragObj.targetClone.previousElementSibling.previousElementSibling : this.dragObj.targetClone.previousElementSibling;
        }
        else {
            element = this.dragObj.targetClone.nextElementSibling;
        }
        if (element && !element.classList.contains(DRAGGED_CARD_CLASS) && !element.classList.contains(CLONED_CARD_CLASS)
            && !element.classList.contains(DRAGGED_CLONE_CLASS)) {
            prevele = true;
        }
        else if (this.dragObj.targetClone.nextElementSibling && this.kanbanObj.sortSettings.direction === 'Ascending') {
            element = this.dragObj.targetClone.nextElementSibling;
        }
        else if (this.dragObj.targetClone.previousElementSibling && this.kanbanObj.sortSettings.direction === 'Descending') {
            element = this.dragObj.targetClone.previousElementSibling;
        }
        else {
            return;
        }
        if (element.classList.contains(CARD_CLASS)) {
            var obj = this.kanbanObj.getCardDetails(element);
            var keyIndex_1 = obj[this.kanbanObj.sortSettings.field];
            if (modifieddata.length > 1 && this.kanbanObj.sortSettings.direction === 'Descending') {
                modifieddata = modifieddata.reverse();
            }
            modifieddata.forEach(function (data, index) {
                if (prevele) {
                    data[_this.kanbanObj.sortSettings.field] = ++keyIndex_1;
                }
                else if (keyIndex_1 !== 1 && index <= data[_this.kanbanObj.sortSettings.field]) {
                    data[_this.kanbanObj.sortSettings.field] = --keyIndex_1;
                }
                else if (keyIndex_1 === 1) {
                    data[_this.kanbanObj.sortSettings.field] = index + 1;
                }
            });
        }
    };
    DragAndDrop.prototype.toggleVisible = function (target, tColumn) {
        var _this = this;
        var headerCells = '.' + HEADER_CELLS_CLASS + ':not(.' + STACKED_HEADER_CELL_CLASS + ')';
        var lists = [].slice.call(this.kanbanObj.element.querySelectorAll(headerCells));
        lists.forEach(function (list) {
            if (_this.getColumnKey(list) === _this.getColumnKey(tColumn || target)) {
                _this.kanbanObj.actionModule.columnToggle(list);
            }
        });
        var cloneTarget = closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS);
        if (cloneTarget) {
            var width = formatUnit(cloneTarget.offsetWidth - cardSpace);
            this.dragObj.draggedClone.style.width = width;
            this.dragObj.cloneElement.style.width = width;
        }
    };
    DragAndDrop.prototype.multiCloneRemove = function () {
        var cloneMulti = !isNullOrUndefined(this.kanbanObj) ? [].slice.call(this.kanbanObj.element.querySelectorAll('.' + TARGET_MULTI_CLONE_CLASS)) : [];
        if (cloneMulti.length > 0) {
            var columnKey = [].slice.call(this.kanbanObj.element.querySelectorAll('.' + MULTI_COLUMN_KEY_CLASS));
            columnKey.forEach(function (node) { return remove(node); });
            cloneMulti.forEach(function (node) {
                var cell = closest(node, '.' + CONTENT_CELLS_CLASS);
                if (cell) {
                    cell.style.borderStyle = '';
                    if (cell.querySelector('.' + SHOW_ADD_BUTTON)) {
                        removeClass([cell.querySelector('.' + SHOW_ADD_BUTTON)], MULTI_CARD_WRAPPER_CLASS);
                    }
                    removeClass([cell.querySelector('.' + CARD_WRAPPER_CLASS)], MULTI_CARD_WRAPPER_CLASS);
                }
            });
            this.removeElement(this.dragObj.targetCloneMulti, this.kanbanObj);
        }
    };
    DragAndDrop.prototype.calculateArgs = function (e) {
        var eventArgs = this.getPageCoordinates(e);
        this.dragObj.pageY = eventArgs.pageY;
        this.dragObj.pageX = eventArgs.pageX;
        this.isDragging = true;
        if (this.kanbanObj.isAdaptive && this.kanbanObj.tooltipModule) {
            this.kanbanObj.tooltipModule.tooltipObj.close();
        }
    };
    DragAndDrop.prototype.getPageCoordinates = function (e) {
        var eventArgs = e.event;
        return eventArgs && eventArgs.changedTouches ? eventArgs.changedTouches[0] : e.changedTouches ? e.changedTouches[0] :
            eventArgs || e;
    };
    DragAndDrop.prototype.getColumnKey = function (target) {
        if (target && target.getAttribute('data-key')) {
            return target.getAttribute('data-key').trim();
        }
        return '';
    };
    DragAndDrop.prototype.updateScrollPosition = function () {
        var _this = this;
        if (isNullOrUndefined(this.dragObj.navigationInterval)) {
            this.dragObj.navigationInterval = window.setInterval(function () { _this.autoScroll(); }, 100);
        }
    };
    DragAndDrop.prototype.autoScrollValidation = function () {
        var pageY = this.dragObj.pageY;
        var pageX = this.dragObj.pageX;
        var autoScrollDistance = 30;
        var dragEdges = { left: false, right: false, top: false, bottom: false };
        var viewBoundaries = this.kanbanObj.element.querySelector('.' + CONTENT_CLASS).getBoundingClientRect();
        if ((pageY < viewBoundaries.top + autoScrollDistance + window.pageYOffset) &&
            (pageY > viewBoundaries.top + window.pageYOffset)) {
            dragEdges.top = true;
        }
        if ((pageY > (viewBoundaries.bottom - autoScrollDistance) + window.pageYOffset) &&
            (pageY < viewBoundaries.bottom + window.pageYOffset)) {
            dragEdges.bottom = true;
        }
        if ((pageX < viewBoundaries.left + autoScrollDistance + window.pageXOffset) &&
            (pageX > viewBoundaries.left + window.pageXOffset)) {
            dragEdges.left = true;
        }
        if ((pageX > (viewBoundaries.right - autoScrollDistance) + window.pageXOffset) &&
            (pageX < viewBoundaries.right + window.pageXOffset)) {
            dragEdges.right = true;
        }
        this.dragEdges = dragEdges;
    };
    DragAndDrop.prototype.autoScroll = function () {
        this.autoScrollValidation();
        var scrollSensitivity = 30;
        if (this.kanbanObj.isAdaptive) {
            var parent_1;
            if (this.dragEdges.top || this.dragEdges.bottom) {
                if (this.dragObj.targetClone) {
                    parent_1 = closest(this.dragObj.targetClone, '.' + CARD_WRAPPER_CLASS);
                }
                else {
                    parent_1 = closest(this.dragObj.draggedClone, '.' + CARD_WRAPPER_CLASS);
                }
            }
            else if (this.dragEdges.right || this.dragEdges.left) {
                parent_1 = this.kanbanObj.element.querySelector('.' + CONTENT_CLASS);
            }
            if (parent_1) {
                var yIsScrollable = parent_1.offsetHeight <= parent_1.scrollHeight;
                var xIsScrollable = parent_1.offsetWidth <= parent_1.scrollWidth;
                var yInBounds = parent_1.scrollTop >= 0 && parent_1.scrollTop + parent_1.offsetHeight <= parent_1.scrollHeight;
                var xInBounds = parent_1.scrollLeft >= 0 && parent_1.scrollLeft + parent_1.offsetWidth <= parent_1.scrollWidth;
                if (yIsScrollable && yInBounds && (this.dragEdges.top || this.dragEdges.bottom)) {
                    parent_1.scrollTop += this.dragEdges.top ? -(scrollSensitivity + 36) : scrollSensitivity;
                }
                if (xIsScrollable && xInBounds && (this.dragEdges.left || this.dragEdges.right)) {
                    var width = this.parent.enableVirtualization ? this.kanbanObj.virtualLayoutModule.getWidth() :
                        this.kanbanObj.layoutModule.getWidth();
                    var scroll_1 = (width * (this.kanbanObj.columns.length - 1)) >
                        parent_1.scrollLeft;
                    if (scroll_1 || this.dragEdges.left) {
                        parent_1.scrollLeft += this.dragEdges.left ? -scrollSensitivity : scrollSensitivity;
                    }
                }
            }
        }
        else {
            var parent_2 = this.kanbanObj.element.querySelector('.' + CONTENT_CLASS);
            var column = this.dragObj.targetClone.parentElement;
            var yScrollable = parent_2.offsetHeight <= parent_2.scrollHeight;
            var xScrollable = parent_2.offsetWidth <= parent_2.scrollWidth;
            var yBounds = yScrollable && parent_2.scrollTop >= 0 && parent_2.scrollTop + parent_2.offsetHeight <= parent_2.scrollHeight;
            var xBounds = xScrollable && parent_2.scrollLeft >= 0 && parent_2.scrollLeft + parent_2.offsetWidth <= parent_2.scrollWidth;
            if (yBounds && (this.dragEdges.top || this.dragEdges.bottom)) {
                parent_2.scrollTop += this.dragEdges.top ? -scrollSensitivity : scrollSensitivity;
                if (this.parent.swimlaneSettings.enableFrozenRows) {
                    this.dragObj.cloneElement.style.top = !this.dragEdges.top ? (parseInt(this.dragObj.cloneElement.style.top, 10) + scrollSensitivity) + 'px' : (parseInt(this.dragObj.cloneElement.style.top, 10) - scrollSensitivity) + 'px';
                }
                if (column) {
                    column.scrollTop += this.dragEdges.top ? -scrollSensitivity : scrollSensitivity;
                }
            }
            if (xBounds && (this.dragEdges.left || this.dragEdges.right)) {
                parent_2.scrollLeft += this.dragEdges.left ? -scrollSensitivity : scrollSensitivity;
                if (column) {
                    column.scrollLeft += this.dragEdges.left ? -scrollSensitivity : scrollSensitivity;
                }
            }
            if (this.dragObj.pageY - window.scrollY < scrollSensitivity) {
                window.scrollTo(window.scrollX, window.scrollY - scrollSensitivity);
            }
            else if (window.innerHeight - (this.dragObj.pageY - window.scrollY) < scrollSensitivity) {
                window.scrollTo(window.scrollX, window.scrollY + scrollSensitivity);
            }
        }
    };
    DragAndDrop.prototype.unWireDragEvents = function (element) {
        if (!isNullOrUndefined(element) && !isNullOrUndefined(element.ej2_instances[0])) {
            var dragInstance = element.ej2_instances[0];
            if (dragInstance && !dragInstance.isDestroyed) {
                dragInstance.destroy();
            }
        }
    };
    return DragAndDrop;
}());

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Dialog module is used to perform card actions.
 */
var KanbanDialog = /** @class */ (function () {
    /**
     * Constructor for dialog module
     *
     * @param {Kanban} parent Accepts the kanban instance
     */
    function KanbanDialog(parent) {
        this.preventUpdate = false;
        this.parent = parent;
    }
    KanbanDialog.prototype.openDialog = function (action, data) {
        this.action = action;
        this.parent.activeCardData.data = data;
        this.renderDialog(data, action);
        this.dialogObj.show();
    };
    KanbanDialog.prototype.closeDialog = function () {
        this.dialogObj.hide();
    };
    KanbanDialog.prototype.renderDialog = function (args, action) {
        this.element = createElement('div', { id: this.parent.element.id + '_dialog_wrapper' });
        this.parent.element.appendChild(this.element);
        var dialogModel = {
            buttons: this.getDialogButtons(action),
            content: this.getDialogContent(args, action),
            cssClass: DIALOG_CLASS,
            enableRtl: this.parent.enableRtl,
            header: this.parent.localeObj.getConstant(action === 'Add' ? 'addTitle' : action === 'Edit' ? 'editTitle' : 'deleteTitle'),
            height: 'auto',
            isModal: true,
            showCloseIcon: true,
            width: (action === 'Delete') ? 400 : 350,
            visible: false,
            beforeOpen: this.onBeforeDialogOpen.bind(this),
            beforeClose: this.onBeforeDialogClose.bind(this)
        };
        this.dialogObj = new Dialog(extend(dialogModel, action !== 'Delete' ? (this.parent.dialogSettings.model || {}) : {}), this.element);
        if (action !== 'Delete') {
            this.applyFormValidation();
        }
        this.dialogObj.element.querySelector('.e-dlg-closeicon-btn').title = this.parent.localeObj.getConstant('close');
    };
    KanbanDialog.prototype.getDialogContent = function (args, action) {
        if (action === 'Delete') {
            return this.parent.localeObj.getConstant('deleteContent');
        }
        else {
            var container = createElement('div', { className: FORM_WRAPPER_CLASS });
            var form = createElement('form', {
                id: this.parent.element.id + 'EditForm',
                className: FORM_CLASS, attrs: { onsubmit: 'return false;' }
            });
            if (this.parent.dialogSettings.template) {
                if (args) {
                    this.destroyComponents();
                    [].slice.call(form.childNodes).forEach(function (node) { return remove(node); });
                }
                var templateId = this.parent.element.id + '_dialogTemplate';
                var dialogTemplate = this.parent.templateParser(this.parent.dialogSettings.template)(args, this.parent, 'dialogTemplate', templateId, false);
                append(dialogTemplate, form);
                this.parent.renderTemplates();
            }
            else {
                var dialogWrapper = createElement('div', { className: DIALOG_CONTENT_CONTAINER });
                form.appendChild(dialogWrapper);
                var table = createElement('table');
                dialogWrapper.appendChild(table);
                var dialogFields = this.getDialogFields();
                for (var _i = 0, dialogFields_1 = dialogFields; _i < dialogFields_1.length; _i++) {
                    var field = dialogFields_1[_i];
                    var tr = createElement('tr');
                    table.appendChild(tr);
                    tr.appendChild(createElement('td', { className: 'e-label', innerHTML: field.text ? field.text : field.key }));
                    var td = createElement('td');
                    tr.appendChild(td);
                    td.appendChild(this.renderComponents(field));
                }
            }
            container.appendChild(form);
            return container;
        }
    };
    KanbanDialog.prototype.getDialogFields = function () {
        var fields = this.parent.dialogSettings.fields;
        if (fields.length === 0) {
            fields = [
                { text: 'ID', key: this.parent.cardSettings.headerField, type: 'TextBox' },
                { key: this.parent.keyField, type: 'DropDown' },
                { key: this.parent.cardSettings.contentField, type: 'TextArea' }
            ];
            if (this.parent.sortSettings.field) {
                fields.splice(fields.length - 1, 0, { key: this.parent.sortSettings.field, type: 'TextBox' });
            }
            if (this.parent.swimlaneSettings.keyField) {
                fields.splice(fields.length - 1, 0, { key: this.parent.swimlaneSettings.keyField, type: 'DropDown' });
            }
        }
        return fields;
    };
    KanbanDialog.prototype.getDialogButtons = function (action) {
        var primaryButtonClass = action === 'Delete' ? 'e-dialog-yes' : action === 'Add' ? 'e-dialog-add' : 'e-dialog-edit';
        var flatButtonClass = action === 'Delete' ? 'e-dialog-no' : 'e-dialog-cancel';
        var dialogButtons = [
            {
                buttonModel: {
                    cssClass: 'e-flat ' + primaryButtonClass, isPrimary: true,
                    content: this.parent.localeObj.getConstant(action === 'Add' || action === 'Edit' ? 'save' : 'yes')
                },
                click: this.dialogButtonClick.bind(this)
            }, {
                buttonModel: {
                    cssClass: 'e-flat ' + flatButtonClass, isPrimary: false,
                    content: this.parent.localeObj.getConstant(action === 'Add' || action === 'Edit' ? 'cancel' : 'no')
                },
                click: this.dialogButtonClick.bind(this)
            }
        ];
        if (action === 'Edit') {
            var deleteButton = {
                buttonModel: { cssClass: 'e-flat e-dialog-delete', isPrimary: false, content: this.parent.localeObj.getConstant('delete') },
                click: this.dialogButtonClick.bind(this)
            };
            dialogButtons.splice(0, 0, deleteButton);
        }
        return dialogButtons;
    };
    KanbanDialog.prototype.renderComponents = function (field) {
        var wrapper = createElement('div', { className: field.key + '_wrapper' });
        var element = createElement('input', { className: FIELD_CLASS, attrs: { 'name': field.key } });
        wrapper.appendChild(element);
        var divElement;
        var dropDownOptions;
        var controlObj;
        var fieldValue = this.parent.activeCardData.data ?
            this.parent.activeCardData.data[field.key] : null;
        switch (field.type) {
            case 'DropDown':
                if (field.key === this.parent.keyField) {
                    var currentKeys = this.parent.enableVirtualization ?
                        this.parent.virtualLayoutModule.columnKeys : this.parent.layoutModule.columnKeys;
                    if (this.parent.actionModule.hideColumnKeys.length > 0) {
                        currentKeys = [];
                        for (var i = 0; i < this.parent.columns.length; i++) {
                            var isColumnVisible = this.parent.enableVirtualization ?
                                this.parent.virtualLayoutModule.isColumnVisible(this.parent.columns[i]) :
                                this.parent.layoutModule.isColumnVisible(this.parent.columns[i]);
                            if (isColumnVisible) {
                                var isNumeric = typeof this.parent.columns[i].keyField === 'number';
                                if (isNumeric) {
                                    currentKeys = currentKeys.concat(this.parent.columns[i].keyField.toString());
                                }
                                else {
                                    currentKeys = currentKeys.concat(this.parent.columns[i].keyField.split(',').map(function (e) { return e.trim(); }));
                                }
                            }
                        }
                    }
                    dropDownOptions = { dataSource: currentKeys, value: fieldValue ? fieldValue.toString() : fieldValue };
                }
                else if (field.key === this.parent.swimlaneSettings.keyField) {
                    dropDownOptions = {
                        dataSource: [].slice.call(this.parent.enableVirtualization ? this.parent.virtualLayoutModule.kanbanRows :
                            this.parent.layoutModule.kanbanRows),
                        fields: { text: 'textField', value: 'keyField' }, value: fieldValue
                    };
                }
                controlObj = new DropDownList(dropDownOptions);
                break;
            case 'Numeric':
                controlObj = new NumericTextBox({ value: fieldValue });
                break;
            case 'TextBox':
                controlObj = new TextBox({ value: fieldValue });
                if (fieldValue && this.parent.cardSettings.headerField === field.key) {
                    controlObj.enabled = false;
                }
                break;
            case 'TextArea':
                remove(element);
                divElement = createElement('div');
                element = createElement('textarea', {
                    className: FIELD_CLASS, attrs: { 'name': field.key, 'rows': '3', 'aria-label': this.parent.cardSettings.contentField },
                    innerHTML: fieldValue
                });
                wrapper.appendChild(divElement).appendChild(element);
                break;
        }
        if (controlObj) {
            controlObj.appendTo(element);
        }
        return wrapper;
    };
    KanbanDialog.prototype.onBeforeDialogOpen = function (args) {
        var _this = this;
        var eventProp = {
            data: this.parent.activeCardData.data,
            cancel: false, element: this.element,
            target: this.parent.activeCardData.element,
            requestType: this.action
        };
        this.storeElement = document.activeElement;
        if (parseInt(args.maxHeight, 10) <= 250) {
            args.maxHeight = '250px';
        }
        this.parent.trigger(dialogOpen, eventProp, function (openArgs) {
            args.cancel = openArgs.cancel;
            if (openArgs.cancel) {
                _this.destroy();
            }
        });
    };
    KanbanDialog.prototype.onBeforeDialogClose = function (args) {
        var _this = this;
        var formInputs = this.getFormElements();
        var cardObj = {};
        if (args.isInteracted) {
            /* close icon preventing data update */
            this.preventUpdate = true;
        }
        if (!this.preventUpdate) {
            for (var _i = 0, formInputs_1 = formInputs; _i < formInputs_1.length; _i++) {
                var input = formInputs_1[_i];
                var columnName = input.name || this.getColumnName(input);
                if (!isNullOrUndefined(columnName) && columnName !== '') {
                    var value = this.getValueFromElement(input);
                    if (columnName === this.parent.cardSettings.headerField) {
                        value = this.getIDType() === 'string' ? value : parseInt(value, 10);
                    }
                    cardObj[columnName] = value;
                }
            }
        }
        this.preventUpdate = false;
        cardObj = extend(this.parent.activeCardData.data, cardObj);
        var eventProp = { data: cardObj, cancel: false, element: this.element, requestType: this.action };
        this.parent.trigger(dialogClose, eventProp, function (closeArgs) {
            args.cancel = closeArgs.cancel;
            if (!closeArgs.cancel) {
                _this.cardData = eventProp.data;
                _this.destroy();
                _this.parent.actionModule.SingleCardSelection(_this.cardData);
            }
        });
    };
    KanbanDialog.prototype.getIDType = function () {
        if (this.parent.kanbanData.length !== 0) {
            return typeof (this.parent.kanbanData[0][this.parent.cardSettings.headerField]);
        }
        return 'string';
    };
    KanbanDialog.prototype.applyFormValidation = function () {
        var _this = this;
        var form = this.element.querySelector('.' + FORM_CLASS);
        var rules = {};
        for (var _i = 0, _a = this.parent.dialogSettings.fields; _i < _a.length; _i++) {
            var field = _a[_i];
            rules[field.key] = (field.validationRules && Object.keys(field.validationRules).length > 0) ? field.validationRules : null;
        }
        this.formObj = new FormValidator(form, {
            rules: rules,
            customPlacement: function (inputElement, error) {
                var id = error.getAttribute('for');
                var elem = _this.element.querySelector('#' + id + '_Error');
                if (!elem) {
                    _this.createTooltip(inputElement, error, id, '');
                }
            },
            validationComplete: function (args) {
                var elem = _this.element.querySelector('#' + args.inputName + '_Error');
                if (elem) {
                    elem.style.display = (args.status === 'failure') ? '' : 'none';
                }
            }
        });
    };
    KanbanDialog.prototype.createTooltip = function (element, error, name, display) {
        var dlgContent;
        var client;
        var inputClient = element.parentElement.getBoundingClientRect();
        if (this.element.classList.contains(DIALOG_CLASS)) {
            dlgContent = this.element;
            client = this.element.getBoundingClientRect();
        }
        else {
            dlgContent = this.element.querySelector('.e-kanban-dialog .e-dlg-content');
            client = dlgContent.getBoundingClientRect();
        }
        var div = createElement('div', {
            className: 'e-tooltip-wrap e-popup ' + ERROR_VALIDATION_CLASS,
            id: name + '_Error',
            styles: 'display:' + display + ';top:' +
                (inputClient.bottom - client.top + dlgContent.scrollTop + 9) + 'px;left:' +
                (inputClient.left - client.left + dlgContent.scrollLeft + inputClient.width / 2) + 'px;'
        });
        var content = createElement('div', { className: 'e-tip-content' });
        content.appendChild(error);
        var arrow = createElement('div', { className: 'e-arrow-tip e-tip-top' });
        arrow.appendChild(createElement('div', { className: 'e-arrow-tip-outer e-tip-top' }));
        arrow.appendChild(createElement('div', { className: 'e-arrow-tip-inner e-tip-top' }));
        div.appendChild(content);
        div.appendChild(arrow);
        dlgContent.appendChild(div);
        div.style.left = (parseInt(div.style.left, 10) - div.offsetWidth / 2) + 'px';
    };
    KanbanDialog.prototype.destroyToolTip = function () {
        if (this.element) {
            this.element.querySelectorAll('.' + ERROR_VALIDATION_CLASS).forEach(function (node) { return remove(node); });
        }
        if (this.formObj && this.formObj.element) {
            this.formObj.reset();
        }
    };
    KanbanDialog.prototype.dialogButtonClick = function (event) {
        var target = event.target.cloneNode(true);
        if (!isNullOrUndefined(event.keyCode) && event.keyCode === 13) {
            var valTrg = this.dialogObj.element.querySelector('.e-footer-content button.e-primary');
            target = valTrg.cloneNode(true);
        }
        var id = this.formObj.element.id;
        if (document.getElementById(id) && this.formObj.validate() &&
            (target.classList.contains('e-dialog-edit') || target.classList.contains('e-dialog-add'))) {
            this.dialogObj.hide();
            if (!isNullOrUndefined(this.cardData)) {
                if (target.classList.contains('e-dialog-edit')) {
                    var activeCard = this.parent.activeCardData;
                    var updateIndex = void 0;
                    if (activeCard.data[this.parent.keyField] === this.cardData[this.parent.keyField]
                        && activeCard.element) {
                        updateIndex = [].slice.call(activeCard.element.parentElement.children).indexOf(activeCard.element);
                    }
                    if (this.parent.enableHtmlSanitizer) {
                        if (typeof this.cardData[this.parent.cardSettings.contentField] === 'string') {
                            this.cardData[this.parent.cardSettings.contentField] =
                                SanitizeHtmlHelper.sanitize(this.cardData[this.parent.cardSettings.contentField]);
                        }
                    }
                    this.parent.crudModule.updateCard(this.cardData, updateIndex);
                }
                if (target.classList.contains('e-dialog-add')) {
                    this.parent.crudModule.addCard(this.cardData);
                }
                this.parent.actionModule.SingleCardSelection(this.cardData);
                this.cardData = null;
            }
        }
        if (!target.classList.contains('e-dialog-edit') && !target.classList.contains('e-dialog-add')) {
            if (target.classList.contains('e-dialog-cancel')) {
                this.preventUpdate = true;
            }
            this.dialogObj.hide();
            if (target.classList.contains('e-dialog-yes')) {
                this.parent.crudModule.deleteCard(this.parent.activeCardData.data);
            }
            else if (target.classList.contains('e-dialog-no')) {
                this.openDialog('Edit', this.parent.activeCardData.data);
            }
            else if (target.classList.contains('e-dialog-delete')) {
                this.openDialog('Delete', this.parent.activeCardData.data);
            }
        }
    };
    KanbanDialog.prototype.getFormElements = function () {
        var elements = [].slice.call(this.element.querySelectorAll('.' + FIELD_CLASS));
        var validElements = [];
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            if (element.classList.contains('e-control')) {
                validElements.push(element);
            }
            else if (element.querySelector('.e-control')) {
                validElements.push(element.querySelector('.e-control'));
            }
            else {
                validElements.push(element);
            }
        }
        return validElements;
    };
    KanbanDialog.prototype.getColumnName = function (element) {
        var attrName = element.getAttribute('data-name') || '';
        if (attrName === '') {
            var isDropDowns = false;
            var fieldSelector = '';
            if (element.classList.contains('e-dropdownlist') || element.classList.contains('e-multiselect')) {
                fieldSelector = element.classList.contains('e-dropdownlist') ? 'e-ddl' : 'e-multiselect';
                isDropDowns = true;
            }
            else if (element.classList.contains('e-numerictextbox')) {
                fieldSelector = 'e-numeric';
            }
            var classSelector = isDropDowns ? "." + fieldSelector + ":not(.e-control)" : "." + fieldSelector;
            var control = closest(element, classSelector) || element.querySelector("." + fieldSelector);
            if (control) {
                var attrEle = control.querySelector('[name]');
                if (attrEle) {
                    attrName = attrEle.name;
                }
            }
        }
        return attrName;
    };
    KanbanDialog.prototype.getValueFromElement = function (element) {
        var value;
        if (element.classList.contains('e-dropdownlist')) {
            value = element.ej2_instances[0].value;
        }
        else if (element.classList.contains('e-multiselect')) {
            value = element.ej2_instances[0].value;
        }
        else if (element.classList.contains('e-checkbox')) {
            value = element.ej2_instances[0].checked;
        }
        else {
            if (element.type === 'checkbox') {
                value = element.checked;
            }
            else {
                value = element.value;
            }
        }
        return value;
    };
    KanbanDialog.prototype.destroyComponents = function () {
        var formelement = this.getFormElements();
        for (var _i = 0, formelement_1 = formelement; _i < formelement_1.length; _i++) {
            var element = formelement_1[_i];
            var instance = element.ej2_instances;
            if (instance && instance.length > 0) {
                instance.forEach(function (node) { return node.destroy(); });
            }
            if (this.parent.isReact && this.formObj) {
                this.formObj.element.remove();
            }
        }
    };
    KanbanDialog.prototype.destroy = function () {
        this.destroyToolTip();
        this.destroyComponents();
        if (this.dialogObj) {
            this.dialogObj.destroy();
            this.storeElement.focus();
            this.dialogObj = null;
            remove(this.element);
            this.element = null;
        }
    };
    return KanbanDialog;
}());

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Kanban keyboard module
 */
var Keyboard = /** @class */ (function () {
    /**
     * Constructor for keyboard module
     *
     * @param {Kanban} parent Accepts the kanban instance
     */
    function Keyboard(parent) {
        this.keyConfigs = {
            firstCardSelection: '36',
            lastCardSelection: '35',
            upArrow: '38',
            downArrow: '40',
            rightArrow: '39',
            leftArrow: '37',
            multiSelectionEnter: 'ctrl+13',
            multiSelectionSpace: 'ctrl+32',
            multiSelectionByUpArrow: 'shift+38',
            multiSelectionByDownArrow: 'shift+40',
            shiftTab: 'shift+tab',
            enter: '13',
            tab: 'tab',
            delete: '46',
            escape: '27',
            space: '32'
        };
        this.parent = parent;
        this.parent.element.tabIndex = this.parent.element.tabIndex === -1 ? 0 : this.parent.element.tabIndex;
        this.keyboardModule = new KeyboardEvents(this.parent.element, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigs,
            eventName: 'keydown'
        });
        this.multiSelection = false;
    }
    Keyboard.prototype.keyActionHandler = function (e) {
        var _this = this;
        var selectedCard = this.parent.element.querySelectorAll("." + CARD_CLASS + "." + CARD_SELECTION_CLASS).item(0);
        if (!selectedCard && !closest(document.activeElement, "." + ROOT_CLASS)) {
            return;
        }
        var contentCell;
        var selectedCards;
        var selectedCardsData = [];
        switch (e.action) {
            case 'upArrow':
            case 'downArrow':
            case 'multiSelectionByUpArrow':
            case 'multiSelectionByDownArrow':
                e.preventDefault();
                this.processUpDownArrow(e.action, selectedCard);
                break;
            case 'rightArrow':
            case 'leftArrow':
                this.processLeftRightArrow(e);
                break;
            case 'firstCardSelection':
            case 'lastCardSelection':
                this.processCardSelection(e.action, selectedCard);
                break;
            case 'multiSelectionEnter':
            case 'multiSelectionSpace':
                if (document.activeElement) {
                    this.parent.actionModule.cardSelection(document.activeElement, true, false);
                }
                break;
            case 'space':
            case 'enter':
                this.processEnter(e, selectedCard);
                break;
            case 'escape':
                if (document.activeElement.classList.contains(CARD_CLASS) ||
                    document.activeElement.classList.contains(SHOW_ADD_BUTTON)) {
                    if (document.activeElement.classList.contains(CARD_SELECTION_CLASS)) {
                        removeClass([document.activeElement], CARD_SELECTION_CLASS);
                        document.activeElement.focus();
                    }
                    else {
                        var ele = closest(document.activeElement, '.' + CONTENT_CELLS_CLASS);
                        var cards = [].slice.call(ele.querySelectorAll('.' + CARD_CLASS));
                        removeClass(cards, CARD_SELECTION_CLASS);
                        ele.focus();
                        this.cardTabIndexRemove();
                        this.addRemoveTabIndex('Add');
                    }
                }
                break;
            case 'tab':
            case 'shiftTab':
                contentCell = closest(document.activeElement, '.' + CONTENT_CELLS_CLASS);
                if (document.activeElement.classList.contains(CARD_CLASS)) {
                    if (!document.activeElement.nextElementSibling && e.action === 'tab') {
                        e.preventDefault();
                    }
                    if (!document.activeElement.previousElementSibling && contentCell.querySelector('.' + SHOW_ADD_BUTTON)
                        && e.action === 'tab') {
                        addClass([contentCell.querySelector('.' + SHOW_ADD_BUTTON)], SHOW_ADD_FOCUS);
                    }
                }
                if (document.activeElement.classList.contains(SHOW_ADD_BUTTON)) {
                    if ((!contentCell.querySelector('.' + CARD_CLASS) && e.action === 'tab') || e.action === 'shiftTab') {
                        e.preventDefault();
                    }
                }
                if (document.activeElement.classList.contains(ROOT_CLASS)) {
                    this.cardTabIndexRemove();
                    this.parent.keyboardModule.addRemoveTabIndex('Add');
                }
                break;
            case 'delete':
                selectedCards = [].slice.call(this.parent.element.querySelectorAll("." + CARD_CLASS + "." + CARD_SELECTION_CLASS));
                selectedCards.forEach(function (selected) { selectedCardsData.push(_this.parent.getCardDetails(selected)); });
                this.parent.crudModule.deleteCard(selectedCardsData);
                break;
        }
    };
    Keyboard.prototype.processCardSelection = function (action, selectedCard) {
        if (selectedCard) {
            removeClass([selectedCard], CARD_SELECTION_CLASS);
            if (this.parent.enableVirtualization) {
                this.parent.virtualLayoutModule.disableAttributeSelection(selectedCard);
            }
            else {
                this.parent.layoutModule.disableAttributeSelection(selectedCard);
            }
            var selection = this.parent.actionModule.selectionArray;
            selection.splice(selection.indexOf(selectedCard.getAttribute('data-id')), 1);
        }
        this.cardTabIndexRemove();
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS));
        var element = action === 'firstCardSelection' ? cards[0] : cards[cards.length - 1];
        this.parent.actionModule.cardSelection(element, false, false);
        this.addRemoveTabIndex('Remove');
        element.focus();
        var card = [].slice.call(closest(element, '.' + CONTENT_CELLS_CLASS).querySelectorAll('.' + CARD_CLASS));
        card.forEach(function (element) { element.setAttribute('tabindex', '0'); });
    };
    Keyboard.prototype.processLeftRightArrow = function (e) {
        if (document.activeElement.classList.contains(CONTENT_CELLS_CLASS)) {
            if (e.action === 'rightArrow' && document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus();
            }
            else if (e.action === 'leftArrow' && document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus();
            }
        }
    };
    Keyboard.prototype.processUpDownArrow = function (action, selectedCard) {
        if (action === 'upArrow' && document.activeElement) {
            if (document.activeElement.classList.contains(CARD_CLASS) && document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus();
            }
            else if (document.activeElement.classList.contains(SHOW_ADD_BUTTON)) {
                document.activeElement.setAttribute('tabindex', '-1');
                removeClass([document.activeElement], SHOW_ADD_FOCUS);
                var cell = closest(document.activeElement, '.' + CONTENT_CELLS_CLASS);
                if (cell.querySelectorAll('.' + CARD_CLASS).length > 0) {
                    [].slice.call(cell.querySelectorAll('.' + CARD_CLASS)).slice(-1)[0].focus();
                }
            }
            this.removeSelection();
        }
        else if (action === 'downArrow' && document.activeElement &&
            document.activeElement.classList.contains(CARD_CLASS)) {
            if (document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus();
            }
            else if (closest(document.activeElement, '.' + CARD_WRAPPER_CLASS).nextElementSibling) {
                var ele = closest(document.activeElement, '.' + CARD_WRAPPER_CLASS).nextElementSibling;
                ele.setAttribute('tabindex', '0');
                addClass([ele], SHOW_ADD_FOCUS);
                ele.focus();
            }
            this.removeSelection();
        }
        if ((action === 'multiSelectionByUpArrow' || action === 'multiSelectionByDownArrow')
            && selectedCard && this.parent.cardSettings.selectionType === 'Multiple') {
            var card = void 0;
            if (action === 'multiSelectionByUpArrow') {
                card = document.activeElement.previousElementSibling;
            }
            else {
                card = document.activeElement.nextElementSibling;
            }
            if (card) {
                this.parent.actionModule.cardSelection(card, false, true);
                card.focus();
                this.multiSelection = true;
            }
        }
    };
    Keyboard.prototype.removeSelection = function () {
        if (this.multiSelection) {
            var cards = this.parent.getSelectedCards();
            if (cards.length > 0) {
                removeClass(cards, CARD_SELECTION_CLASS);
                if (this.parent.enableVirtualization) {
                    this.parent.virtualLayoutModule.disableAttributeSelection(cards);
                }
                else {
                    this.parent.layoutModule.disableAttributeSelection(cards);
                }
            }
            this.multiSelection = false;
        }
    };
    Keyboard.prototype.cardTabIndexRemove = function () {
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS));
        cards.forEach(function (card) { card.setAttribute('tabindex', '-1'); });
        var addButton = [].slice.call(this.parent.element.querySelectorAll('.' + SHOW_ADD_BUTTON));
        addButton.forEach(function (add) {
            add.setAttribute('tabindex', '-1');
            removeClass([add], SHOW_ADD_FOCUS);
        });
    };
    Keyboard.prototype.processEnter = function (e, selectedCard) {
        if (e.action === 'space') {
            e.preventDefault();
        }
        var element = (e.target);
        if (element.classList.contains(HEADER_ICON_CLASS)) {
            this.parent.actionModule.columnExpandCollapse(e);
        }
        if (element.classList.contains(SWIMLANE_ROW_EXPAND_CLASS) || element.classList.contains(SWIMLANE_ROW_COLLAPSE_CLASS)) {
            this.parent.actionModule.rowExpandCollapse(e);
        }
        if (document.activeElement.classList.contains(CARD_CLASS)) {
            this.parent.actionModule.cardSelection(document.activeElement, false, false);
        }
        if (document.activeElement.classList.contains(SHOW_ADD_BUTTON)) {
            if (!this.parent.dialogModule.dialogObj) {
                this.parent.actionModule.addButtonClick(document.activeElement);
            }
            document.activeElement.focus();
        }
        if (element.classList.contains(CONTENT_CELLS_CLASS)) {
            var cards = [].slice.call(element.querySelectorAll('.' + CARD_CLASS));
            this.addRemoveTabIndex('Remove');
            if (cards.length > 0) {
                element.querySelector('.' + CARD_CLASS).focus();
                cards.forEach(function (element) { element.setAttribute('tabindex', '0'); });
            }
            if (element.querySelector('.' + SHOW_ADD_BUTTON)) {
                element.querySelector('.' + SHOW_ADD_BUTTON).setAttribute('tabindex', '0');
                element.querySelector('.' + SHOW_ADD_BUTTON).focus();
            }
        }
        if (selectedCard === document.activeElement && this.parent.element.querySelectorAll('.' + CARD_SELECTION_CLASS).length === 1) {
            this.parent.activeCardData = {
                data: this.parent.getCardDetails(selectedCard), element: selectedCard
            };
            if (!this.parent.dialogModule.dialogObj) {
                this.parent.dialogModule.openDialog('Edit', this.parent.getCardDetails(selectedCard));
            }
            selectedCard.focus();
        }
    };
    Keyboard.prototype.addRemoveTabIndex = function (action) {
        var attribute = action === 'Add' ? '0' : '-1';
        var headerIcon = [].slice.call(this.parent.element.querySelectorAll('.' + HEADER_ICON_CLASS));
        if (headerIcon.length > 0) {
            headerIcon.forEach(function (element) { element.setAttribute('tabindex', attribute); });
        }
        var swimlaneIcon = [].slice.call(this.parent.element.querySelectorAll('.' + SWIMLANE_ROW_EXPAND_CLASS));
        if (swimlaneIcon.length > 0) {
            swimlaneIcon.forEach(function (element) { element.setAttribute('tabindex', attribute); });
        }
        var className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + ') .' + CONTENT_CELLS_CLASS;
        var contentCell = [].slice.call(this.parent.element.querySelectorAll(className));
        contentCell.forEach(function (element) { element.setAttribute('tabindex', attribute); });
    };
    Keyboard.prototype.destroy = function () {
        this.keyboardModule.destroy();
    };
    return Keyboard;
}());

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Tooltip for Kanban board
 */
var KanbanTooltip = /** @class */ (function () {
    /**
     * Constructor for tooltip module
     *
     * @param {Kanban} parent Accepts the kanban instance
     */
    function KanbanTooltip(parent) {
        this.parent = parent;
        this.renderTooltip();
    }
    KanbanTooltip.prototype.renderTooltip = function () {
        this.tooltipObj = new Tooltip({
            cssClass: this.parent.cssClass + ' ' + TOOLTIP_CLASS,
            enableRtl: this.parent.enableRtl,
            mouseTrail: !this.parent.isAdaptive,
            offsetY: 5,
            position: 'BottomCenter',
            showTipPointer: true,
            target: '.' + TOOLTIP_TEXT_CLASS,
            beforeRender: this.onBeforeRender.bind(this),
            beforeClose: this.onBeforeClose.bind(this)
        });
        this.tooltipObj.appendTo(this.parent.element);
        this.tooltipObj.isStringTemplate = true;
    };
    KanbanTooltip.prototype.onBeforeRender = function (args) {
        if (this.parent.dragAndDropModule.isDragging) {
            args.cancel = true;
            return;
        }
        var tooltipContent;
        if (this.parent.tooltipTemplate) {
            tooltipContent = createElement('div');
            var target = closest(args.target, '.' + CARD_CLASS);
            var data = this.parent.getCardDetails(target);
            var templateId = this.parent.element.id + '_tooltipTemplate';
            var tooltipTemplate = this.parent.templateParser(this.parent.tooltipTemplate)(data, this.parent, 'tooltipTemplate', templateId, false);
            append(tooltipTemplate, tooltipContent);
            this.parent.renderTemplates();
        }
        else {
            tooltipContent = initializeCSPTemplate(function () {
                return "<div class=\"e-card-header-caption\">" + args.target.innerText + "</div>";
            });
        }
        this.tooltipObj.setProperties({ content: tooltipContent }, true);
    };
    KanbanTooltip.prototype.onBeforeClose = function () {
        this.parent.resetTemplates(['tooltipTemplate']);
    };
    KanbanTooltip.prototype.destroy = function () {
        this.tooltipObj.destroy();
        addClass([this.parent.element], 'e-control');
        this.tooltipObj = null;
    };
    return KanbanTooltip;
}());

/**
 * Kanban touch module
 */
var KanbanTouch = /** @class */ (function () {
    /**
     * Constructor for touch module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    function KanbanTouch(parent) {
        this.parent = parent;
        this.tabHold = false;
    }
    KanbanTouch.prototype.wireTouchEvents = function () {
        this.element = this.parent.element.querySelector('.' + CONTENT_CLASS);
        this.touchObj = new Touch(this.element, { tapHold: this.tapHoldHandler.bind(this) });
    };
    KanbanTouch.prototype.tapHoldHandler = function (e) {
        this.tabHold = true;
        var target = closest(e.originalEvent.target, '.' + CARD_CLASS);
        if (target && this.parent.cardSettings.selectionType === 'Multiple') {
            this.parent.actionModule.cardSelection(target, true, false);
            if (!this.mobilePopup) {
                this.renderMobilePopup();
                this.mobilePopup.show();
            }
            this.updatePopupContent();
        }
    };
    KanbanTouch.prototype.renderMobilePopup = function () {
        if (this.parent.cardSettings.selectionType === 'Multiple') {
            var mobilePopupWrapper = createElement('div', {
                className: POPUP_WRAPPER_CLASS + ' e-popup-close',
                innerHTML: "<div class=\"" + POPUP_HEADER_CLASS + "\"><button class=\"" + CLOSE_CLASS + "\"></button></div>" +
                    ("<div class=\"" + POPUP_CONTENT_CLASS + "\"></div>")
            });
            document.body.appendChild(mobilePopupWrapper);
            addClass([mobilePopupWrapper], DEVICE_CLASS);
            this.mobilePopup = new Popup(mobilePopupWrapper, {
                targetType: 'container',
                enableRtl: this.parent.enableRtl,
                hideAnimation: { name: 'ZoomOut' },
                showAnimation: { name: 'ZoomIn' },
                collision: { X: 'fit', Y: 'fit' },
                position: { X: 'left', Y: 'top' },
                viewPortElement: document.body,
                zIndex: 1004,
                close: this.popupClose.bind(this)
            });
            var closeIcon = this.mobilePopup.element.querySelector('.' + CLOSE_CLASS);
            var buttonObj = new Button({
                cssClass: 'e-flat e-round e-small',
                enableRtl: this.parent.enableRtl,
                iconCss: ICON_CLASS + ' ' + CLOSE_ICON_CLASS
            });
            buttonObj.appendTo(closeIcon);
            buttonObj.isStringTemplate = true;
            EventHandler.add(closeIcon, 'click', this.closeClick, this);
        }
    };
    KanbanTouch.prototype.getPopupContent = function () {
        var popupContent;
        var selectedCards = this.parent.getSelectedCards();
        if (selectedCards.length > 1) {
            popupContent = '(' + selectedCards.length + ') ' + this.parent.localeObj.getConstant('cardsSelected');
        }
        else if (selectedCards.length === 1) {
            popupContent = ' ' + this.parent.getCardDetails(selectedCards[0])[this.parent.cardSettings.headerField];
        }
        return popupContent;
    };
    KanbanTouch.prototype.updatePopupContent = function () {
        if (!this.mobilePopup) {
            return;
        }
        var popupContent = this.getPopupContent();
        if (popupContent) {
            this.mobilePopup.element.querySelector('.' + POPUP_CONTENT_CLASS).textContent = popupContent;
        }
        else {
            this.mobilePopup.hide();
        }
    };
    KanbanTouch.prototype.closeClick = function () {
        this.parent.touchModule.mobilePopup.hide();
    };
    KanbanTouch.prototype.popupClose = function () {
        this.popupDestroy();
    };
    KanbanTouch.prototype.popupDestroy = function () {
        if (this.mobilePopup && this.mobilePopup.element) {
            var instance = this.mobilePopup.element.querySelector('.e-control.e-btn').ej2_instances[0];
            if (instance) {
                instance.destroy();
            }
            this.mobilePopup.destroy();
            remove(this.mobilePopup.element);
            this.mobilePopup = null;
        }
    };
    KanbanTouch.prototype.unWireTouchEvents = function () {
        if (this.touchObj) {
            this.touchObj.destroy();
        }
        this.touchObj = null;
        this.element = null;
    };
    KanbanTouch.prototype.destroy = function () {
        this.popupDestroy();
        this.unWireTouchEvents();
        this.tabHold = false;
    };
    return KanbanTouch;
}());

/**
 * Kanban mobile layout rendering module
 *
 */
var MobileLayout = /** @class */ (function () {
    function MobileLayout(parent) {
        this.parent = parent;
    }
    MobileLayout.prototype.renderSwimlaneHeader = function () {
        var toolbarWrapper = createElement('div', {
            className: SWIMLANE_HEADER_CLASS,
            innerHTML: '<div class="' + SWIMLANE_HEADER_TOOLBAR_CLASS + '"><div class="' + TOOLBAR_MENU_CLASS +
                '"><div class="e-icons ' + TOOLBAR_MENU_ICON_CLASS + '"></div></div><div class="' + TOOLBAR_LEVEL_TITLE_CLASS +
                '"><div class="' + TOOLBAR_SWIMLANE_NAME_CLASS + '"></div></div></div>'
        });
        this.parent.element.appendChild(toolbarWrapper);
        EventHandler.add(toolbarWrapper.querySelector('.' + TOOLBAR_MENU_ICON_CLASS), 'click', this.menuClick, this);
    };
    MobileLayout.prototype.renderSwimlaneTree = function () {
        var height = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS).offsetHeight;
        var treeHeight = window.innerHeight - height;
        this.popupOverlay = createElement('div', { className: SWIMLANE_OVERLAY_CLASS, styles: 'height: ' + treeHeight + 'px;' });
        var wrapper = createElement('div', { className: SWIMLANE_CONTENT_CLASS, styles: 'top:' + height + 'px;' });
        var treeWrapper = createElement('div', {
            className: SWIMLANE_RESOURCE_CLASS + ' e-popup-close', styles: 'height: ' + treeHeight + 'px;'
        });
        wrapper.appendChild(treeWrapper);
        wrapper.appendChild(this.popupOverlay);
        this.parent.element.appendChild(wrapper);
        var swimlaneTree = createElement('div', { className: SWIMLANE_TREE_CLASS });
        treeWrapper.appendChild(swimlaneTree);
        var dataSource = this.parent.enableVirtualization ?
            this.parent.virtualLayoutModule.kanbanRows : this.parent.layoutModule.kanbanRows;
        this.treeViewObj = new TreeView({
            cssClass: this.parent.cssClass,
            enableRtl: this.parent.enableRtl,
            fields: {
                dataSource: dataSource,
                id: 'keyField',
                text: 'textField'
            },
            nodeTemplate: this.parent.swimlaneSettings.template,
            nodeClicked: this.treeSwimlaneClick.bind(this),
            drawNode: this.drawNode.bind(this)
        });
        this.treeViewObj.appendTo(swimlaneTree);
        var popupObj = {
            targetType: 'relative',
            actionOnScroll: 'none',
            enableRtl: this.parent.enableRtl,
            zIndex: 10,
            hideAnimation: { name: 'SlideLeftOut', duration: 500 },
            showAnimation: { name: 'SlideLeftIn', duration: 500 },
            viewPortElement: this.parent.element.querySelector('.' + CONTENT_CLASS)
        };
        popupObj.content = this.treeViewObj.element;
        this.treePopup = new Popup(treeWrapper, popupObj);
    };
    MobileLayout.prototype.menuClick = function () {
        if (this.parent.element.querySelector('.' + SWIMLANE_RESOURCE_CLASS).classList.contains('e-popup-open')) {
            this.treePopup.hide();
            removeClass([this.popupOverlay], 'e-enable');
        }
        else {
            var treeNodes = [].slice.call(this.treeViewObj.element.querySelectorAll('.e-list-item'));
            removeClass(treeNodes, 'e-active');
            addClass([treeNodes[this.parent.layoutModule.swimlaneIndex]], 'e-active');
            this.treePopup.show();
            addClass([this.popupOverlay], 'e-enable');
        }
    };
    MobileLayout.prototype.treeSwimlaneClick = function (args) {
        this.treePopup.hide();
        var treeNodes = [].slice.call(this.treeViewObj.element.querySelectorAll('.e-list-item'));
        this.parent.layoutModule.swimlaneIndex = treeNodes.indexOf(args.node);
        this.parent.layoutModule.scrollLeft = 0;
        this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
        args.event.preventDefault();
    };
    MobileLayout.prototype.hidePopup = function () {
        this.treePopup.hide();
        removeClass([this.popupOverlay], 'e-enable');
    };
    MobileLayout.prototype.getWidth = function () {
        return (window.innerWidth * 80) / 100;
    };
    MobileLayout.prototype.drawNode = function (args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.swimlaneSettings.template && this.parent.isReact) {
            var templateId = this.parent.element.id + '_treeviewTemplate';
            var treeViewTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(args.nodeData, this.parent, 'nodeTemplate', templateId, false);
            append(treeViewTemplate, args.node.querySelector('.e-list-text'));
        }
    };
    return MobileLayout;
}());

var __extends$6 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Kanban layout rendering module
 *
 */
var LayoutRender = /** @class */ (function (_super) {
    __extends$6(LayoutRender, _super);
    function LayoutRender(parent) {
        var _this = _super.call(this, parent) || this;
        _this.kanbanRows = [];
        _this.parent = parent;
        _this.columnKeys = [];
        _this.swimlaneIndex = 0;
        _this.swimlaneData = {};
        _this.scrollLeft = 0;
        _this.frozenOrder = 0;
        _this.parent.on(dataReady, _this.initRender, _this);
        _this.parent.on(contentReady, _this.scrollUiUpdate, _this);
        return _this;
    }
    LayoutRender.prototype.initRender = function () {
        if (this.parent.columns.length === 0) {
            return;
        }
        this.columnData = this.getColumnCards();
        this.kanbanRows = this.getRows();
        this.swimlaneData = this.getSwimlaneCards();
        if (this.parent.isAdaptive) {
            var parent_1 = this.parent.element.querySelector('.' + CONTENT_CLASS);
            if (parent_1) {
                this.scrollLeft = parent_1.scrollLeft;
            }
        }
        this.destroy();
        this.parent.on(dataReady, this.initRender, this);
        this.parent.on(contentReady, this.scrollUiUpdate, this);
        if (this.parent.isAdaptive && this.parent.swimlaneSettings.keyField && this.parent.kanbanData.length !== 0) {
            this.renderSwimlaneHeader();
        }
        var header = createElement('div', { className: HEADER_CLASS });
        this.parent.element.appendChild(header);
        this.renderHeader(header);
        this.renderContent();
        this.renderCards();
        this.renderValidation();
        this.parent.renderTemplates();
        this.parent.notify(contentReady, {});
        this.wireEvents();
        if (this.parent.isInitialRender) {
            this.parent.isInitialRender = false;
        }
    };
    LayoutRender.prototype.renderHeader = function (header) {
        var headerWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        header.appendChild(headerWrap);
        var headerTable = createElement('table', {
            className: TABLE_CLASS + ' ' + HEADER_TABLE_CLASS
        });
        headerWrap.appendChild(headerTable);
        this.renderColGroup(headerTable);
        var tableHead = createElement('thead');
        var tableBody = createElement('tbody', { className: 'e-hide', innerHTML: '<tr><td></td></tr>', attrs: { 'role': 'rowgroup' } });
        headerTable.appendChild(tableBody);
        headerTable.appendChild(tableHead);
        if (this.parent.stackedHeaders.length > 0) {
            tableHead.appendChild(this.createStackedRow(this.parent.stackedHeaders));
        }
        var tr = createElement('tr', { className: HEADER_ROW_CLASS });
        tableHead.appendChild(tr);
        var _loop_1 = function (column) {
            if (this_1.isColumnVisible(column)) {
                var index = this_1.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var th_1 = createElement('th', {
                    className: index === -1 ? HEADER_CELLS_CLASS : HEADER_CELLS_CLASS + ' ' + COLLAPSED_CLASS,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'scope': 'col' }
                });
                var classList = [];
                if (column.allowToggle) {
                    classList.push(HEADER_ROW_TOGGLE_CLASS);
                    if (!column.isExpanded) {
                        classList.push(COLLAPSED_CLASS);
                    }
                }
                addClass([th_1], classList);
                var headerWrapper = createElement('div', { className: HEADER_WRAP_CLASS });
                th_1.appendChild(headerWrapper);
                this_1.columnData = this_1.getColumnCards(this_1.parent.kanbanData);
                var noOfCard = this_1.columnData[column.keyField].length;
                var headerTitle = createElement('div', { className: HEADER_TITLE_CLASS });
                headerWrapper.appendChild(headerTitle);
                if (column.template) {
                    var templateArgs = {
                        keyField: column.keyField, headerText: column.headerText, minCount: column.minCount, maxCount: column.maxCount,
                        allowToggle: column.allowToggle, isExpanded: column.isExpanded, showItemCount: column.showItemCount, count: noOfCard
                    };
                    addClass([th_1], TEMPLATE_CLASS);
                    var templateId = this_1.parent.element.id + '_columnTemplate';
                    var templateHeader = this_1.parent.templateParser(column.template)(templateArgs, this_1.parent, 'columnTemplate', templateId, false);
                    append(templateHeader, headerTitle);
                }
                else {
                    var header_1 = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: column.headerText });
                    headerTitle.appendChild(header_1);
                    if (column.showItemCount) {
                        var itemCount = createElement('div', {
                            className: CARD_ITEM_COUNT_CLASS,
                            innerHTML: '- ' + noOfCard.toString() + ' ' + this_1.parent.localeObj.getConstant('items')
                        });
                        headerTitle.appendChild(itemCount);
                    }
                }
                if (column.allowToggle) {
                    var isExpand = (column.isExpanded && index === -1) ? true : false;
                    var name_1 = (isExpand) ? COLUMN_EXPAND_CLASS : COLUMN_COLLAPSE_CLASS;
                    var icon = createElement('div', {
                        className: HEADER_ICON_CLASS + ' ' + ICON_CLASS + ' ' + name_1,
                        attrs: { 'tabindex': '0', 'role': 'button' }
                    });
                    icon.setAttribute('aria-label', isExpand ? column.keyField + ' Expand' : column.keyField + ' Collapse');
                    th_1.setAttribute('aria-expanded', isExpand.toString());
                    headerWrapper.appendChild(icon);
                }
                var dataObj = [{ keyField: column.keyField, textField: column.headerText, count: noOfCard }];
                var args = { data: dataObj, element: tr, cancel: false, requestType: 'headerRow' };
                this_1.parent.trigger(queryCellInfo, args, function (columnArgs) {
                    if (!columnArgs.cancel) {
                        tr.appendChild(th_1);
                    }
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            _loop_1(column);
        }
    };
    LayoutRender.prototype.renderContent = function () {
        var content = createElement('div', { className: CONTENT_CLASS });
        this.parent.element.appendChild(content);
        var contentWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        content.appendChild(contentWrap);
        var contentTable = createElement('table', {
            className: TABLE_CLASS + ' ' + CONTENT_TABLE_CLASS, attrs: { 'role': 'presentation' }
        });
        contentWrap.appendChild(contentTable);
        this.renderColGroup(contentTable);
        var tHead = createElement('thead', { className: 'e-hide', attrs: { 'role': 'none' } });
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            var thElem = createElement('th', { id: column.keyField, innerHTML: column.keyField, attrs: { 'scope': 'col' } });
            thElem.style.display = 'none';
            tHead.appendChild(thElem);
        }
        contentTable.appendChild(tHead);
        var tBody = createElement('tbody', { attrs: { 'role': 'treegrid', 'aria-label': 'Kanban Content' } });
        contentTable.appendChild(tBody);
        var isCollaspsed = false;
        this.swimlaneRow = this.kanbanRows;
        this.initializeSwimlaneTree();
        for (var _b = 0, _c = this.swimlaneRow; _b < _c.length; _b++) {
            var row = _c[_b];
            if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneToggleArray.length !== 0) {
                var index = this.parent.swimlaneToggleArray.indexOf(row.keyField);
                isCollaspsed = index !== -1;
            }
            if (this.parent.swimlaneSettings.keyField && !this.parent.isAdaptive) {
                this.renderSwimlaneRow(tBody, row, isCollaspsed);
            }
            this.renderSingleContent(tBody, row, isCollaspsed);
        }
    };
    LayoutRender.prototype.renderSingleContent = function (tBody, row, isCollaspsed) {
        var className = isCollaspsed ? CONTENT_ROW_CLASS + ' ' + COLLAPSED_CLASS : CONTENT_ROW_CLASS;
        var tr = createElement('tr', { className: className,
            attrs: { 'role': 'row', 'aria-label': row.keyField + 'row content' } });
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (this.isColumnVisible(column)) {
                var index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var className_1 = index === -1 ? CONTENT_CELLS_CLASS : CONTENT_CELLS_CLASS + ' ' + COLLAPSED_CLASS;
                var dragClass = (column.allowDrag ? ' ' + DRAG_CLASS : '') + (column.allowDrop ? ' ' + DROP_CLASS
                    + ' ' + DROPPABLE_CLASS : '');
                var td = createElement('td', {
                    className: className_1 + dragClass, attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'tabindex': '0',
                        'aria-describedby': column.keyField.toString(), 'role': 'gridcell' }
                });
                if (column.allowToggle && !column.isExpanded || index !== -1) {
                    addClass([td], COLLAPSED_CLASS);
                    var text = (column.showItemCount ? '[' +
                        this.getColumnData(column.keyField, this.swimlaneData[row.keyField]).length + '] ' : '') + column.headerText;
                    td.appendChild(createElement('div', { className: COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                    td.setAttribute('aria-expanded', 'false');
                }
                if (column.showAddButton) {
                    var button = createElement('div', { className: SHOW_ADD_BUTTON, attrs: { 'tabindex': '-1' } });
                    button.appendChild(createElement('div', { className: SHOW_ADD_ICON + ' ' + ICON_CLASS }));
                    td.appendChild(button);
                }
                tr.appendChild(td);
            }
        }
        var dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        var args = { data: dataObj, element: tr, cancel: false, requestType: 'contentRow' };
        this.parent.trigger(queryCellInfo, args, function (columnArgs) {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    };
    LayoutRender.prototype.initializeSwimlaneTree = function () {
        if (this.parent.swimlaneSettings.keyField && this.parent.isAdaptive && this.parent.kanbanData.length !== 0) {
            var swimlaneHeaderName = this.parent.element.querySelector('.' + TOOLBAR_SWIMLANE_NAME_CLASS);
            this.swimlaneRow = [this.kanbanRows[this.swimlaneIndex]];
            this.renderSwimlaneTree();
            if (this.parent.swimlaneSettings.template) {
                var cardCount = this.swimlaneData[this.swimlaneRow[0].keyField].length;
                var templateArgs = extend({}, this.swimlaneRow[0], { count: cardCount }, true);
                var swimlaneTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(templateArgs, this.parent, 'swimlaneTemplate', '', false);
                swimlaneHeaderName.appendChild(swimlaneTemplate[0]);
            }
            else {
                swimlaneHeaderName.innerHTML = this.swimlaneRow[0].textField;
                if (this.parent.swimlaneSettings.showItemCount) {
                    var cardCount = this.swimlaneData[this.swimlaneRow[0].keyField].length;
                    var targetItemCountElement = this.parent.element.querySelector('.' + SWIMLANE_HEADER_TOOLBAR_CLASS);
                    var itemCountElement = void 0;
                    var itemCountInnerElement = void 0;
                    if (!isNullOrUndefined(targetItemCountElement)) {
                        itemCountElement = createElement('div', { className: TOOLBAR_SWIMLANE_ITEM_COUNT_CLASS });
                        itemCountInnerElement = createElement('div', { className: CARD_ITEM_COUNT_CLASS });
                        itemCountElement.appendChild(itemCountInnerElement);
                        targetItemCountElement.appendChild(itemCountElement);
                    }
                    itemCountInnerElement.innerHTML = "- " + cardCount + " " + this.parent.localeObj.getConstant('items');
                }
            }
        }
    };
    LayoutRender.prototype.renderSwimlaneRow = function (tBody, row, isCollapsed) {
        var name = CONTENT_ROW_CLASS + ' ' + SWIMLANE_ROW_CLASS;
        var className = isCollapsed ? ' ' + COLLAPSED_CLASS : '';
        var tr = createElement('tr', {
            className: name + className, attrs: { 'aria-label': row.keyField + ' row header',
                'role': 'row', 'data-key': row.keyField, 'aria-expanded': (!isCollapsed).toString() }
        });
        var col = this.parent.columns.length - this.parent.actionModule.hideColumnKeys.length;
        var td = createElement('td', { className: CONTENT_CELLS_CLASS,
            attrs: { 'data-role': 'kanban-column', 'role': 'gridcell', colspan: col.toString() } });
        var swimlaneHeader = createElement('div', { className: SWIMLANE_HEADER_CLASS });
        td.appendChild(swimlaneHeader);
        var iconClass = isCollapsed ? SWIMLANE_ROW_COLLAPSE_CLASS : SWIMLANE_ROW_EXPAND_CLASS;
        var iconDiv = createElement('div', {
            className: ICON_CLASS + ' ' + iconClass, attrs: {
                'tabindex': '0', 'role': 'button', 'aria-label': isCollapsed ? row.keyField + ' Collapse' : row.keyField + ' Expand'
            }
        });
        swimlaneHeader.appendChild(iconDiv);
        var headerWrap = createElement('div', { className: HEADER_WRAP_CLASS });
        swimlaneHeader.appendChild(headerWrap);
        var cardCount = this.swimlaneData[row.keyField].length;
        if (this.parent.swimlaneSettings.template) {
            var templateArgs = extend({}, row, { count: cardCount }, true);
            addClass([td], TEMPLATE_CLASS);
            var templateId = this.parent.element.id + '_swimlaneTemplate';
            var swimlaneTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(templateArgs, this.parent, 'swimlaneTemplate', templateId, false);
            append(swimlaneTemplate, headerWrap);
        }
        else {
            headerWrap.appendChild(createElement('div', {
                className: SWIMLANE_ROW_TEXT_CLASS,
                innerHTML: row.textField,
                attrs: { 'data-role': row.textField }
            }));
        }
        if (this.parent.swimlaneSettings.showItemCount) {
            swimlaneHeader.appendChild(createElement('div', {
                className: CARD_ITEM_COUNT_CLASS,
                innerHTML: "- " + cardCount.toString() + " " + this.parent.localeObj.getConstant('items')
            }));
        }
        tr.appendChild(td);
        var dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        var args = { data: dataObj, element: tr, cancel: false, requestType: 'swimlaneRow' };
        this.parent.trigger(queryCellInfo, args, function (columnArgs) {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    };
    LayoutRender.prototype.renderCards = function () {
        var _this = this;
        var rows = this.swimlaneRow;
        var cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row'));
        var removeTrs = [];
        var columnTransition = false;
        cardRows.forEach(function (tr, index) {
            var dataCount = 0;
            var _loop_2 = function (column) {
                if (_this.isColumnVisible(column)) {
                    var columnData = _this.parent.swimlaneSettings.keyField ?
                        _this.getColumnData(column.keyField, (_this.parent.swimlaneSettings.showEmptyRow &&
                            isNullOrUndefined(_this.swimlaneData[rows[index].keyField])) ? []
                            : _this.swimlaneData[rows[index].keyField]) : _this.columnData[column.keyField];
                    dataCount += columnData.length;
                    var columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    var cardWrapper_1 = createElement('div', {
                        className: CARD_WRAPPER_CLASS, attrs: { 'role': 'listbox', 'tabindex': '0',
                            'aria-label': column.keyField.toString()
                        }
                    });
                    if (column.transitionColumns.length > 0) {
                        columnTransition = true;
                    }
                    if (!columnTransition && isNullOrUndefined(_this.parent.swimlaneSettings.keyField)) {
                        var borderElem = createElement('div', { className: BORDER_CLASS });
                        columnWrapper.appendChild(borderElem);
                    }
                    columnWrapper.appendChild(cardWrapper_1);
                    if (columnData.length > 0) {
                        var _loop_3 = function (data) {
                            var cardText = data[_this.parent.cardSettings.headerField];
                            var cardIndex = _this.parent.actionModule.selectionArray.indexOf(cardText);
                            var cardElement = _this.renderCard(data);
                            if (cardIndex !== -1) {
                                cardElement.setAttribute('aria-selected', 'true');
                                addClass([cardElement], CARD_SELECTION_CLASS);
                            }
                            var args = { data: data, element: cardElement, cancel: false };
                            _this.parent.trigger(cardRendered, args, function (cardArgs) {
                                if (!cardArgs.cancel) {
                                    cardWrapper_1.appendChild(cardElement);
                                }
                            });
                        };
                        for (var _i = 0, _a = columnData; _i < _a.length; _i++) {
                            var data = _a[_i];
                            _loop_3(data);
                        }
                    }
                    else {
                        cardWrapper_1.appendChild(_this.renderEmptyCard());
                    }
                }
            };
            for (var _i = 0, _a = _this.parent.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                _loop_2(column);
            }
            if (dataCount === 0) {
                removeTrs.push(tr);
                if (swimlaneRows.length > 0) {
                    removeTrs.push(swimlaneRows[index]);
                }
            }
        });
        if (!this.parent.swimlaneSettings.showEmptyRow && (this.parent.kanbanData.length === 0 && !this.parent.showEmptyColumn)) {
            removeTrs.forEach(function (tr) { return remove(tr); });
        }
    };
    LayoutRender.prototype.renderCard = function (data) {
        var cardElement = createElement('div', {
            className: CARD_CLASS,
            attrs: { 'data-id': data[this.parent.cardSettings.headerField], 'data-key': data[this.parent.keyField],
                'aria-selected': 'false', 'tabindex': '-1', 'role': 'option', 'aria-roledescription': 'Card'
            }
        });
        if (this.parent.cardHeight !== 'auto') {
            cardElement.style.height = formatUnit(this.parent.cardHeight);
        }
        if (this.parent.cardSettings.template) {
            addClass([cardElement], TEMPLATE_CLASS);
            var templateId = this.parent.element.id + '_cardTemplate';
            var cardTemplate = this.parent.templateParser(this.parent.cardSettings.template)(data, this.parent, 'cardTemplate', templateId, false);
            append(cardTemplate, cardElement);
        }
        else {
            var tooltipClass = this.parent.enableTooltip ? ' ' + TOOLTIP_TEXT_CLASS : '';
            if (this.parent.cardSettings.showHeader) {
                var cardHeader = createElement('div', { className: CARD_HEADER_CLASS });
                var cardCaption = createElement('div', { className: CARD_HEADER_TEXT_CLASS });
                var cardText = createElement('div', {
                    className: CARD_HEADER_TITLE_CLASS + tooltipClass,
                    innerHTML: data[this.parent.cardSettings.headerField] || ''
                });
                cardHeader.appendChild(cardCaption);
                cardCaption.appendChild(cardText);
                cardElement.appendChild(cardHeader);
            }
            var cardContent = createElement('div', {
                className: CARD_CONTENT_CLASS + tooltipClass,
                innerHTML: data[this.parent.cardSettings.contentField] || ''
            });
            cardElement.appendChild(cardContent);
            if (this.parent.cardSettings.tagsField && data[this.parent.cardSettings.tagsField]) {
                var cardTags = createElement('div', { className: CARD_TAGS_CLASS });
                var tags = data[this.parent.cardSettings.tagsField].toString().split(',');
                for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                    var tag = tags_1[_i];
                    cardTags.appendChild(createElement('div', {
                        className: CARD_TAG_CLASS + ' ' + CARD_LABEL_CLASS, innerHTML: tag
                    }));
                }
                cardElement.appendChild(cardTags);
            }
            if (this.parent.cardSettings.grabberField && data[this.parent.cardSettings.grabberField]) {
                addClass([cardElement], CARD_COLOR_CLASS);
                cardElement.style.borderLeftColor = data[this.parent.cardSettings.grabberField];
            }
            if (this.parent.cardSettings.footerCssField) {
                var cardFields = createElement('div', { className: CARD_FOOTER_CLASS });
                var keys = data[this.parent.cardSettings.footerCssField].split(',');
                for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                    var key = keys_1[_a];
                    cardFields.appendChild(createElement('div', {
                        className: key.trim() + ' ' + CARD_FOOTER_CSS_CLASS
                    }));
                }
                cardElement.appendChild(cardFields);
            }
        }
        return cardElement;
    };
    LayoutRender.prototype.renderEmptyCard = function () {
        var emptyCard = createElement('span', {
            className: EMPTY_CARD_CLASS, innerHTML: this.parent.localeObj.getConstant('noCard'),
            attrs: { 'aria-label': this.parent.localeObj.getConstant('noCard'), 'role': 'option' }
        });
        return emptyCard;
    };
    LayoutRender.prototype.renderColGroup = function (table) {
        var _this = this;
        var colGroup = createElement('colgroup');
        this.parent.columns.forEach(function (column) {
            if (_this.isColumnVisible(column)) {
                var index = _this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var isToggle = column.allowToggle && !column.isExpanded;
                var className = index === -1 ? (isToggle ? COLLAPSED_CLASS : '') : COLLAPSED_CLASS;
                var col = createElement('col', {
                    className: className,
                    attrs: { 'data-key': column.keyField.toString() }
                });
                if (_this.parent.isAdaptive) {
                    var width = isToggle ? formatUnit(toggleWidth) : formatUnit(_this.getWidth());
                    col.style.width = width;
                }
                colGroup.appendChild(col);
            }
        });
        table.appendChild(colGroup);
    };
    LayoutRender.prototype.getRows = function () {
        var _this = this;
        var kanbanRows = [];
        if (this.parent.swimlaneSettings.keyField) {
            this.parent.kanbanData.map(function (obj) {
                if (!_this.parent.swimlaneSettings.showEmptyRow) {
                    if ((isNullOrUndefined(obj[_this.parent.keyField])) || (obj[_this.parent.keyField] === '') ||
                        (obj[_this.parent.keyField] && _this.columnKeys.indexOf(obj[_this.parent.keyField].toString()) === -1)) {
                        return;
                    }
                }
                var textField = obj[_this.parent.swimlaneSettings.textField] || obj[_this.parent.swimlaneSettings.keyField];
                var keyField = obj[_this.parent.swimlaneSettings.keyField];
                if (!obj[_this.parent.swimlaneSettings.keyField]) {
                    if (_this.parent.swimlaneSettings.showUnassignedRow) {
                        textField = _this.parent.localeObj.getConstant('unassigned');
                        keyField = '';
                    }
                    else {
                        return;
                    }
                }
                kanbanRows.push({ keyField: keyField, textField: textField });
            });
            kanbanRows = kanbanRows.filter(function (item, index, arr) {
                return index === arr.map(function (item) { return item.keyField; }).indexOf(item.keyField);
            });
            kanbanRows = this.swimlaneSorting(kanbanRows);
            kanbanRows.forEach(function (row) {
                row.count = _this.parent.kanbanData.filter(function (obj) {
                    return _this.columnKeys.indexOf(obj[_this.parent.keyField]) > -1 &&
                        obj[_this.parent.swimlaneSettings.keyField] === row.keyField;
                }).length;
            });
            if (kanbanRows.length === 0) {
                kanbanRows.push({ keyField: '', textField: '' });
            }
        }
        else {
            kanbanRows.push({ keyField: '', textField: '' });
        }
        return kanbanRows;
    };
    LayoutRender.prototype.swimlaneSorting = function (rows) {
        if (this.parent.swimlaneSettings.sortComparer) {
            rows = this.parent.swimlaneSettings.sortComparer.call(this.parent, rows);
        }
        else {
            rows.sort(function (a, b) { return a.textField.localeCompare(b.textField, undefined, { numeric: true }); });
            if (this.parent.swimlaneSettings.sortDirection === 'Descending') {
                rows.reverse();
            }
        }
        return rows;
    };
    LayoutRender.prototype.createStackedRow = function (rows) {
        var tr = createElement('tr', { className: HEADER_ROW_CLASS + ' ' + STACKED_HEADER_ROW_CLASS });
        var stackedHeaders = [];
        this.parent.columns.forEach(function (column) {
            var headerText = '';
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                if (row.keyFields.indexOf(column.keyField.toString()) !== -1) {
                    headerText = row.text;
                }
            }
            stackedHeaders.push(headerText);
        });
        for (var h = 0; h < stackedHeaders.length; h++) {
            var colSpan = 1;
            for (var j = h + 1; j < stackedHeaders.length; j++) {
                if ((stackedHeaders[h] !== '') && (stackedHeaders[j] !== '') && stackedHeaders[h] === stackedHeaders[j]) {
                    colSpan++;
                }
                else {
                    break;
                }
            }
            var div = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: stackedHeaders[h] });
            var th = createElement('th', {
                className: HEADER_CELLS_CLASS + ' ' + STACKED_HEADER_CELL_CLASS,
                attrs: { 'colspan': colSpan.toString(), 'scope': 'col' }
            });
            tr.appendChild(th).appendChild(div);
            h += colSpan - 1;
        }
        return tr;
    };
    LayoutRender.prototype.scrollUiUpdate = function () {
        var _this = this;
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        var height = this.parent.element.offsetHeight - header.offsetHeight;
        if (this.parent.isAdaptive) {
            height = window.innerHeight - (header.offsetHeight + bottomSpace);
            var swimlaneToolbar = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
            if (swimlaneToolbar) {
                height -= swimlaneToolbar.offsetHeight;
            }
            var cardWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS));
            cardWrappers.forEach(function (cell) {
                var cardWrapper = cell.querySelector('.' + CARD_WRAPPER_CLASS);
                if (!cardWrapper.classList.contains(MULTI_CARD_WRAPPER_CLASS)) {
                    cardWrapper.style.height = formatUnit(height);
                    EventHandler.add(cell, 'touchmove', _this.onAdaptiveScroll, _this);
                }
            });
        }
        if (this.parent.height !== 'auto' && this.parent.height !== '100%') {
            content.style.height = formatUnit(height);
        }
        [].slice.call(header.children).forEach(function (node) {
            var paddingValue = 0;
            if ((content.offsetWidth - content.clientWidth) > 0) {
                paddingValue = 17;
                if ((content.offsetHeight - content.clientHeight) > 0) {
                    node.style.width = formatUnit(content.clientWidth);
                }
            }
            if (_this.parent.enableRtl) {
                node.style.paddingLeft = formatUnit(paddingValue);
            }
            else {
                node.style.paddingRight = formatUnit(paddingValue);
            }
        });
        this.updateScrollPosition();
    };
    LayoutRender.prototype.onContentScroll = function (e) {
        var target = e.target;
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach(function (node) { node.scrollLeft = target.scrollLeft; });
        this.parent.scrollPosition.content = { left: target.scrollLeft, top: target.scrollTop };
        if (!isNullOrUndefined(this.parent.swimlaneSettings.keyField) && this.parent.swimlaneSettings.enableFrozenRows) {
            this.frozenRows(e);
        }
    };
    LayoutRender.prototype.addFrozenSwimlaneDataKey = function (currentElem) {
        var frozenKey = currentElem.getAttribute('data-key');
        if (!isNullOrUndefined(frozenKey)) {
            this.frozenSwimlaneRow.setAttribute('data-key', frozenKey);
        }
    };
    LayoutRender.prototype.frozenRows = function (e) {
        var firstSwimlane = this.parent.element.querySelector('.' + SWIMLANE_ROW_CLASS);
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (isNullOrUndefined(this.frozenSwimlaneRow)) {
            this.frozenSwimlaneRow = createElement('div', { className: FROZEN_SWIMLANE_ROW_CLASS });
            var frozenRow = createElement('div', { className: FROZEN_ROW_CLASS });
            this.frozenSwimlaneRow.appendChild(frozenRow);
            this.parent.element.insertBefore(this.frozenSwimlaneRow, this.parent.element.firstElementChild);
            frozenRow.appendChild(firstSwimlane.querySelector('.' + SWIMLANE_HEADER_CLASS).cloneNode(true));
            this.addFrozenSwimlaneDataKey(firstSwimlane);
            setStyleAttribute(this.frozenSwimlaneRow, { height: formatUnit(firstSwimlane.getBoundingClientRect().height),
                width: formatUnit(content.querySelector('.e-swimlane').getBoundingClientRect().width),
                top: formatUnit(header.getBoundingClientRect().height.toString())
            });
            setStyleAttribute(header, { position: 'relative', top: formatUnit((-this.frozenSwimlaneRow.getBoundingClientRect().height)) });
            setStyleAttribute(content, { position: 'relative', top: formatUnit((-this.frozenSwimlaneRow.getBoundingClientRect().height)) });
        }
        else {
            var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.' + SWIMLANE_ROW_CLASS));
            var curSwim = swimlaneRows[this.frozenOrder];
            var prevSwim = swimlaneRows[this.frozenOrder - 1];
            var nextSwim = swimlaneRows[this.frozenOrder + 1];
            var curSwimHeight = void 0;
            var prevSwimHeight = void 0;
            var nextSwimHeight = void 0;
            if (curSwim) {
                curSwimHeight = curSwim.getBoundingClientRect().top + curSwim.getBoundingClientRect().height;
            }
            if (prevSwim) {
                prevSwimHeight = prevSwim.getBoundingClientRect().top + prevSwim.getBoundingClientRect().height;
            }
            if (nextSwim) {
                nextSwimHeight = nextSwim.getBoundingClientRect().top + nextSwim.getBoundingClientRect().height;
            }
            var frozenSwimHeight = content.getBoundingClientRect().top + this.frozenSwimlaneRow.getBoundingClientRect().height;
            var frozenRowsElement = this.frozenSwimlaneRow.querySelector('.' + FROZEN_ROW_CLASS);
            if (nextSwimHeight && frozenSwimHeight >= nextSwimHeight && this.frozenOrder < swimlaneRows.length - 1) {
                if (frozenRowsElement) {
                    remove(frozenRowsElement.querySelector('.' + SWIMLANE_HEADER_CLASS));
                    frozenRowsElement.appendChild(nextSwim.querySelector('.' + SWIMLANE_HEADER_CLASS).cloneNode(true));
                    this.addFrozenSwimlaneDataKey(nextSwim);
                }
                ++this.frozenOrder;
            }
            else if (prevSwimHeight && frozenSwimHeight < curSwimHeight && frozenSwimHeight > prevSwimHeight && this.frozenOrder > 0) {
                if (frozenRowsElement) {
                    remove(frozenRowsElement.querySelector('.' + SWIMLANE_HEADER_CLASS));
                    frozenRowsElement.appendChild(prevSwim.querySelector('.' + SWIMLANE_HEADER_CLASS).cloneNode(true));
                    this.addFrozenSwimlaneDataKey(prevSwim);
                }
                --this.frozenOrder;
            }
        }
        if (e && e.target.scrollTop === 0) {
            this.removeFrozenRows();
        }
    };
    LayoutRender.prototype.removeFrozenRows = function () {
        remove(this.frozenSwimlaneRow);
        this.frozenSwimlaneRow = null;
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        setStyleAttribute(header, { position: '', top: '' });
        setStyleAttribute(content, { position: '', top: '' });
        this.parent.scrollPosition.content = { left: this.parent.scrollPosition.content.left, top: 0 };
        content.scrollTop = 0;
        this.frozenOrder = 0;
    };
    LayoutRender.prototype.onColumnScroll = function (e) {
        var target = e.target;
        if (target.offsetParent) {
            var columnKey = target.offsetParent.getAttribute('data-key');
            this.parent.scrollPosition.column["" + columnKey] = { left: target.scrollLeft, top: target.scrollTop };
        }
    };
    LayoutRender.prototype.onAdaptiveScroll = function (e) {
        if (this.parent.touchModule.tabHold && !this.parent.touchModule.mobilePopup) {
            e.preventDefault();
        }
    };
    /**
     * Check column is visible or not.
     *
     * @param {ColumnsModel} column - specifies the column.
     * @returns {boolean}
     * @private
     * @hidden
     */
    LayoutRender.prototype.isColumnVisible = function (column) {
        var _this = this;
        var isVisible = false;
        var isNumeric = typeof column.keyField === 'number';
        if (isNumeric) {
            isVisible = this.parent.actionModule.hideColumnKeys.indexOf(column.keyField.toString()) === -1;
        }
        else {
            column.keyField.split(',').forEach(function (key) { isVisible = _this.parent.actionModule.hideColumnKeys.indexOf(key) === -1; });
        }
        return isVisible;
    };
    LayoutRender.prototype.renderLimits = function (column, target) {
        var limits = createElement('div', { className: LIMITS_CLASS });
        if (column.minCount) {
            limits.appendChild(createElement('div', {
                className: MIN_COUNT_CLASS,
                innerHTML: this.parent.localeObj.getConstant('min') + ': ' + column.minCount.toString()
            }));
        }
        if (column.maxCount) {
            limits.appendChild(createElement('div', {
                className: MAX_COUNT_CLASS,
                innerHTML: this.parent.localeObj.getConstant('max') + ': ' + column.maxCount.toString()
            }));
        }
        if (limits.childElementCount > 0) {
            if (target.querySelector('.' + CARD_WRAPPER_CLASS)) {
                target.insertBefore(limits, target.firstElementChild);
            }
            else {
                target.appendChild(limits);
            }
        }
    };
    LayoutRender.prototype.renderValidation = function () {
        var _this = this;
        this.parent.columns.forEach(function (column) {
            if (!column.minCount && !column.maxCount) {
                return;
            }
            var cardData = _this.columnData[column.keyField];
            var keySelector = "[data-key=\"" + column.keyField + "\"]";
            var headerCell = _this.parent.element.querySelector("." + (HEADER_CELLS_CLASS + keySelector));
            var rowCells = [].slice.call(_this.parent.element.querySelectorAll("." + (CONTENT_CELLS_CLASS + keySelector)));
            if (_this.parent.constraintType === 'Swimlane' && _this.parent.swimlaneSettings.keyField) {
                _this.swimlaneRow.forEach(function (row, index) {
                    _this.renderLimits(column, rowCells[index]);
                    var rowCards = cardData.filter(function (card) {
                        return card[_this.parent.swimlaneSettings.keyField] === row.keyField;
                    });
                    var colorClass = _this.getValidationClass(column, rowCards.length);
                    if (colorClass) {
                        addClass([rowCells[index]], colorClass);
                    }
                });
            }
            else {
                _this.renderLimits(column, headerCell);
                var colorClass = _this.getValidationClass(column, cardData.length);
                if (colorClass) {
                    addClass(rowCells.concat(headerCell), colorClass);
                }
            }
        });
    };
    LayoutRender.prototype.getValidationClass = function (column, count) {
        var colorClass;
        if (column.maxCount && count > column.maxCount) {
            colorClass = MAX_COLOR_CLASS;
        }
        else if (column.minCount && count < column.minCount) {
            colorClass = MIN_COLOR_CLASS;
        }
        return colorClass;
    };
    LayoutRender.prototype.refreshValidation = function () {
        var validations = [].slice.call(this.parent.element.querySelectorAll('.' + LIMITS_CLASS));
        validations.forEach(function (node) { remove(node); });
        var minClass = [].slice.call(this.parent.element.querySelectorAll('.' + MIN_COLOR_CLASS));
        removeClass(minClass, MIN_COLOR_CLASS);
        var maxClass = [].slice.call(this.parent.element.querySelectorAll('.' + MAX_COLOR_CLASS));
        removeClass(maxClass, MAX_COLOR_CLASS);
        this.renderValidation();
    };
    LayoutRender.prototype.getColumnData = function (columnValue, dataSource) {
        var _this = this;
        if (dataSource === void 0) { dataSource = this.parent.kanbanData; }
        var cardData = [];
        var isNumeric = typeof columnValue === 'number';
        if (isNumeric) {
            var keyData = dataSource.filter(function (cardObj) {
                return cardObj[_this.parent.keyField] === columnValue;
            });
            cardData = cardData.concat(keyData);
        }
        else {
            var columnKeys = columnValue.split(',');
            var _loop_4 = function (key) {
                var keyData = dataSource.filter(function (cardObj) {
                    return cardObj[_this.parent.keyField] === key.trim();
                });
                cardData = cardData.concat(keyData);
            };
            for (var _i = 0, columnKeys_1 = columnKeys; _i < columnKeys_1.length; _i++) {
                var key = columnKeys_1[_i];
                _loop_4(key);
            }
        }
        this.sortCategory(cardData);
        return cardData;
    };
    LayoutRender.prototype.sortCategory = function (cardData) {
        var key = this.parent.cardSettings.headerField;
        var direction = this.parent.sortSettings.direction;
        switch (this.parent.sortSettings.sortBy) {
            case 'DataSourceOrder':
                this.sortOrder(key, direction, cardData);
                break;
            case 'Custom':
            case 'Index':
                if (this.parent.sortSettings.field) {
                    key = this.parent.sortSettings.field;
                }
                this.sortOrder(key, direction, cardData);
                break;
        }
        return cardData;
    };
    LayoutRender.prototype.sortOrder = function (key, direction, cardData) {
        var isNumeric = true;
        if (this.parent.kanbanData.length > 0) {
            isNumeric = typeof (this.parent.kanbanData[0])["" + key] === 'number';
        }
        if (!isNumeric && this.parent.sortSettings.sortBy === 'Index') {
            return cardData;
        }
        var first;
        var second;
        cardData = cardData.sort(function (firstData, secondData) {
            if (!isNumeric) {
                first = firstData["" + key] ? firstData["" + key].toLowerCase() : '';
                second = secondData["" + key] ? secondData["" + key].toLowerCase() : '';
            }
            else {
                first = firstData["" + key];
                second = secondData["" + key];
            }
            return (first > second) ? 1 : ((second > first) ? -1 : 0);
        });
        if (direction === 'Descending') {
            cardData.reverse();
        }
        return cardData;
    };
    LayoutRender.prototype.documentClick = function (args) {
        if (args.target.classList.contains(SWIMLANE_OVERLAY_CLASS) &&
            this.parent.element.querySelector('.' + SWIMLANE_RESOURCE_CLASS).classList.contains('e-popup-open')) {
            this.treePopup.hide();
            removeClass([this.popupOverlay], 'e-enable');
        }
        if (closest(args.target, "." + ROOT_CLASS)) {
            return;
        }
        var cards = [].slice.call(this.parent.element.querySelectorAll("." + CARD_CLASS + "." + CARD_SELECTION_CLASS));
        removeClass(cards, CARD_SELECTION_CLASS);
        this.disableAttributeSelection(cards);
    };
    LayoutRender.prototype.disableAttributeSelection = function (cards) {
        if (cards instanceof Element) {
            cards.setAttribute('aria-selected', 'false');
        }
        else {
            cards.forEach(function (card) { card.setAttribute('aria-selected', 'false'); });
        }
    };
    LayoutRender.prototype.getColumnCards = function (data) {
        var _this = this;
        var columnData = {};
        this.columnKeys = [];
        this.parent.columns.forEach(function (column) {
            var isNumeric = typeof column.keyField === 'number';
            if (isNumeric) {
                _this.columnKeys = _this.columnKeys.concat(column.keyField.toString());
            }
            else {
                _this.columnKeys = _this.columnKeys.concat(column.keyField.split(',').map(function (e) { return e.trim(); }));
            }
            var cardData = _this.getColumnData(column.keyField, data);
            columnData[column.keyField] = cardData;
        });
        return columnData;
    };
    LayoutRender.prototype.getSwimlaneCards = function () {
        var _this = this;
        var swimlaneData = {};
        if (this.parent.swimlaneSettings.keyField) {
            this.kanbanRows.forEach(function (row) {
                return swimlaneData[row.keyField] = _this.parent.kanbanData.filter(function (obj) {
                    return !isNullOrUndefined(obj[_this.parent.keyField]) &&
                        _this.columnKeys.indexOf(obj[_this.parent.keyField].toString()) > -1 &&
                        ((!obj[_this.parent.swimlaneSettings.keyField] && _this.parent.swimlaneSettings.showUnassignedRow) ?
                            '' : obj[_this.parent.swimlaneSettings.keyField]) === row.keyField;
                });
            });
        }
        return swimlaneData;
    };
    LayoutRender.prototype.refreshHeaders = function () {
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach(function (child) { return remove(child); });
        this.renderHeader(header);
    };
    LayoutRender.prototype.refreshCards = function () {
        this.parent.resetTemplates(['cardTemplate']);
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cards.forEach(function (card) { return remove(card); });
        this.renderCards();
        this.wireDragEvent();
        this.parent.renderTemplates();
    };
    LayoutRender.prototype.refresh = function () {
        var _this = this;
        var isColumnTemplateRefreshed = false;
        this.parent.columns.forEach(function (column) {
            if (column.showItemCount) {
                if (column && column.template && !isColumnTemplateRefreshed) {
                    _this.refreshHeaders();
                    isColumnTemplateRefreshed = true;
                }
                var countSelector = "." + HEADER_CELLS_CLASS + "[data-key=\"" + column.keyField + "\"] ." + CARD_ITEM_COUNT_CLASS;
                var itemCount = _this.parent.element.querySelector(countSelector);
                if (itemCount) {
                    var isNumeric = typeof column.keyField === 'number';
                    var cardLength = 0;
                    if (isNumeric) {
                        // eslint-disable-next-line no-useless-escape
                        cardLength = ([].slice.call(_this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key=\"' + column.keyField + '\"]'))).length;
                    }
                    else {
                        var keys = column.keyField.split(',');
                        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                            var key = keys_2[_i];
                            // eslint-disable-next-line no-useless-escape
                            var cards = [].slice.call(_this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key=\"' + key.trim() + '\"]'));
                            cardLength = cards.length + cardLength;
                        }
                    }
                    itemCount.innerHTML = '- ' + cardLength + ' ' + _this.parent.localeObj.getConstant('items');
                }
            }
        });
        if (this.parent.swimlaneSettings.keyField) {
            var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll("." + SWIMLANE_ROW_CLASS));
            swimlaneRows.forEach(function (swimlane) {
                var swimlaneKey = swimlane.getAttribute('data-key');
                var itemCount = swimlane.querySelector("." + CARD_ITEM_COUNT_CLASS);
                if (itemCount && swimlaneKey) {
                    var cards = [].slice.call(swimlane.nextElementSibling.querySelectorAll('.' + CARD_CLASS));
                    itemCount.innerHTML = '- ' + cards.length + ' ' + _this.parent.localeObj.getConstant('items');
                }
            });
        }
        this.refreshValidation();
    };
    LayoutRender.prototype.updateScrollPosition = function () {
        var _this = this;
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            if (!Browser.isIE) {
                content.scrollTo(this.parent.scrollPosition.content.left, this.parent.scrollPosition.content.top);
            }
            else {
                content.scrollTop = this.parent.scrollPosition.content.top;
                content.scrollLeft = this.parent.scrollPosition.content.left;
            }
        }
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach(function (wrapper) {
            if (wrapper.offsetParent) {
                var scrollData = _this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')];
                if (scrollData) {
                    if (!Browser.isIE) {
                        wrapper.scrollTo(scrollData.left, scrollData.top);
                    }
                    else {
                        wrapper.scrollTop = scrollData.top;
                        wrapper.scrollLeft = scrollData.left;
                    }
                }
            }
        });
    };
    LayoutRender.prototype.renderCardBasedOnIndex = function (data, index) {
        var _this = this;
        var key = data[this.parent.keyField];
        var cardRow = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row)');
        if (this.parent.swimlaneSettings.keyField && !this.parent.isAdaptive) {
            var rowSelector = ".e-content-row.e-swimlane-row[data-key=\"" + data[this.parent.swimlaneSettings.keyField] + "\"]";
            if (this.parent.element.querySelector(rowSelector)) {
                cardRow = this.parent.element.querySelector(rowSelector).nextElementSibling;
            }
            else {
                var columnIndex = this.columnKeys.indexOf(key);
                if (columnIndex !== -1 && this.parent.actionModule.hideColumnKeys.indexOf(key) === -1) {
                    var index_1 = this.kanbanRows.findIndex(function (rowData) { return rowData['keyField'] === data[_this.parent.swimlaneSettings.keyField]; });
                    var swim = [].slice.call(this.parent.element.querySelectorAll('.e-swimlane-row'));
                    var swimRow = this.parent.element.querySelector('.' + CONTENT_TABLE_CLASS + ' tbody');
                    if (swim[index_1]) {
                        swimRow = swim[index_1];
                    }
                    this.renderSwimlaneRow(swimRow, this.kanbanRows[index_1], false);
                    this.renderSingleContent(swimRow, this.kanbanRows[index_1], false);
                }
                cardRow = this.parent.element.querySelector(rowSelector).nextElementSibling;
                [].slice.call(cardRow.children).forEach(function (cell) {
                    var cardWrapper = createElement('div', { className: CARD_WRAPPER_CLASS });
                    cell.appendChild(cardWrapper);
                    cardWrapper.appendChild(_this.renderEmptyCard());
                });
            }
        }
        if (this.parent.sortSettings.sortBy !== 'Index') {
            var field_1 = this.parent.cardSettings.headerField;
            if (this.parent.sortSettings.sortBy === 'Custom') {
                field_1 = this.parent.sortSettings.field;
            }
            if (isNullOrUndefined(this.parent.swimlaneSettings.keyField)) {
                index = this.getColumnData(key, this.parent.kanbanData).findIndex(function (colData) {
                    return colData["" + field_1] === data["" + field_1];
                });
            }
            else {
                var swimlaneDatas = this.parent.getSwimlaneData(data[this.parent.swimlaneSettings.keyField]);
                index = this.getColumnData(key, swimlaneDatas).findIndex(function (colData) { return colData["" + field_1] === data["" + field_1]; });
            }
        }
        else if (this.parent.sortSettings.sortBy === 'Index' &&
            this.parent.sortSettings.field && this.parent.sortSettings.direction === 'Ascending') {
            index = data[this.parent.sortSettings.field] - 1;
        }
        if (cardRow) {
            var td = [].slice.call(cardRow.children).filter(function (e) {
                return e.getAttribute('data-key').replace(/\s/g, '').split(',').indexOf(key.toString().replace(/\s/g, '')) !== -1;
            })[0];
            var cardWrapper_2 = td.querySelector('.' + CARD_WRAPPER_CLASS);
            var emptyCard = cardWrapper_2.querySelector('.' + EMPTY_CARD_CLASS);
            if (emptyCard) {
                remove(emptyCard);
            }
            var cardElement_1 = this.renderCard(data);
            if (this.parent.allowDragAndDrop && td.classList.contains(DRAG_CLASS)) {
                this.parent.dragAndDropModule.wireDragEvents(cardElement_1);
                addClass([cardElement_1], DROPPABLE_CLASS);
            }
            var args = { data: data, element: cardElement_1, cancel: false };
            this.parent.trigger(cardRendered, args, function (cardArgs) {
                if (!cardArgs.cancel) {
                    if (isNullOrUndefined(index) || cardWrapper_2.children.length === 0) {
                        cardWrapper_2.appendChild(cardElement_1);
                    }
                    else {
                        cardWrapper_2.insertBefore(cardElement_1, cardWrapper_2.childNodes[index]);
                    }
                }
            });
        }
    };
    LayoutRender.prototype.removeCard = function (data) {
        var cardKey = data[this.parent.cardSettings.headerField];
        var cardElement = this.parent.element.querySelector("." + CARD_CLASS + "[data-id=\"" + cardKey + "\"]");
        if (cardElement) {
            this.isSelectedCard = cardElement.classList.contains(CARD_SELECTION_CLASS) ? true : false;
            var cardContainer = cardElement.parentElement;
            remove(cardElement);
            if (cardContainer.querySelectorAll('.' + CARD_CLASS + ':not(.' + CLONED_CARD_CLASS + ')').length === 0) {
                cardContainer.appendChild(this.renderEmptyCard());
            }
        }
    };
    LayoutRender.prototype.wireEvents = function () {
        var _this = this;
        EventHandler.add(this.parent.element, 'click', this.parent.actionModule.clickHandler, this.parent.actionModule);
        EventHandler.add(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler, this.parent.actionModule);
        EventHandler.add(document, Browser.touchStartEvent, this.documentClick, this);
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        EventHandler.add(content, 'scroll', this.onContentScroll, this);
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach(function (wrapper) {
            if (_this.parent.isInitialRender && wrapper.offsetParent) {
                _this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')] = { left: 0, top: 0 };
            }
            EventHandler.add(wrapper, 'scroll', _this.onColumnScroll, _this);
        });
        if (this.parent.isAdaptive) {
            this.parent.touchModule.wireTouchEvents();
            content.scrollLeft = this.scrollLeft;
        }
        this.wireDragEvent();
    };
    LayoutRender.prototype.unWireEvents = function () {
        var _this = this;
        EventHandler.remove(this.parent.element, 'click', this.parent.actionModule.clickHandler);
        EventHandler.remove(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler);
        EventHandler.remove(document, Browser.touchStartEvent, this.documentClick);
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            EventHandler.remove(content, 'scroll', this.onContentScroll);
            if (this.parent.allowDragAndDrop) {
                this.unWireDragEvent();
            }
        }
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        if (cardWrapper.length > 0) {
            cardWrapper.forEach(function (wrapper) { EventHandler.remove(wrapper, 'scroll', _this.onColumnScroll); });
        }
        if (this.parent.isAdaptive) {
            this.parent.touchModule.unWireTouchEvents();
        }
    };
    LayoutRender.prototype.wireDragEvent = function () {
        var _this = this;
        if (this.parent.allowDragAndDrop) {
            var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
                + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
            addClass(cards, DROPPABLE_CLASS);
            cards.forEach(function (card) { return _this.parent.dragAndDropModule.wireDragEvents(card); });
        }
    };
    LayoutRender.prototype.unWireDragEvent = function () {
        var _this = this;
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
            + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
        removeClass(cards, DROPPABLE_CLASS);
        cards.forEach(function (card) { return _this.parent.dragAndDropModule.unWireDragEvents(card); });
    };
    LayoutRender.prototype.destroy = function () {
        this.parent.resetTemplates();
        this.parent.off(dataReady, this.initRender);
        this.parent.off(contentReady, this.scrollUiUpdate);
        this.unWireEvents();
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        if (header) {
            remove(header);
        }
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            remove(content);
        }
        if (this.treeViewObj) {
            this.treeViewObj.destroy();
            this.treeViewObj = null;
        }
        if (this.treePopup) {
            this.treePopup.destroy();
            this.treePopup = null;
        }
        var swimlaneToolBarEle = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
        if (swimlaneToolBarEle) {
            remove(swimlaneToolBarEle);
        }
        var swimlaneContent = this.parent.element.querySelector('.' + SWIMLANE_CONTENT_CLASS);
        if (swimlaneContent) {
            remove(swimlaneContent);
        }
        var swimlaneFrozenRow = this.parent.element.querySelector('.' + FROZEN_SWIMLANE_ROW_CLASS);
        if (swimlaneFrozenRow) {
            remove(swimlaneFrozenRow);
            this.frozenSwimlaneRow = null;
        }
    };
    return LayoutRender;
}(MobileLayout));

var __extends$7 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * Kanban layout rendering module
 *
 */
var VirtualLayoutRender = /** @class */ (function (_super) {
    __extends$7(VirtualLayoutRender, _super);
    function VirtualLayoutRender(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        _this.kanbanRows = [];
        _this.scrollStatus = {};
        _this.offsets = {};
        _this.tempOffsets = {};
        _this.offsetKeys = [];
        _this.columnKeys = [];
        _this.scrollLeft = 0;
        _this.frozenOrder = 0;
        _this.winResize = _this.windowResize.bind(_this);
        if (_this.parent.enableVirtualization) {
            _this.parent.on(dataReady, _this.initRender, _this);
            _this.parent.on(contentReady, _this.scrollUiUpdate, _this);
        }
        return _this;
    }
    VirtualLayoutRender.prototype.initRender = function () {
        this.isSwimlane = !isNullOrUndefined(this.parent.swimlaneSettings.keyField) &&
            this.parent.swimlaneSettings.keyField.trim().length > 1 ? true : false;
        this.query = this.parent.query instanceof Query ? this.parent.query : new Query();
        if (this.parent.columns.length === 0) {
            return;
        }
        this.cardHeight = this.cardHeightCalculate();
        this.columnData = this.getColumnCards();
        this.kanbanRows = this.getRows();
        if (this.parent.isAdaptive) {
            var parent_1 = this.parent.element.querySelector('.' + CONTENT_CLASS);
            if (parent_1) {
                this.scrollLeft = parent_1.scrollLeft;
            }
        }
        this.destroy();
        this.parent.on(dataReady, this.initRender, this);
        this.parent.on(contentReady, this.scrollUiUpdate, this);
        var header = createElement('div', { className: HEADER_CLASS });
        this.parent.element.appendChild(header);
        this.renderHeader(header);
        if (!this.isSwimlane) {
            this.renderContent();
            this.renderCards();
        }
        this.renderValidation();
        this.parent.renderTemplates();
        this.parent.notify(contentReady, {});
        this.wireEvents();
        if (this.parent.isInitialRender) {
            this.parent.isInitialRender = false;
        }
    };
    VirtualLayoutRender.prototype.cardHeightCalculate = function () {
        var cardHeight;
        if (this.parent.cardHeight === 'auto') {
            cardHeight = 100 + 8; // 8 is the margin bottom value of the card.
        }
        else {
            cardHeight = parseInt(formatUnit(this.parent.cardHeight).split('px')[0], 10) + 8;
        }
        return cardHeight;
    };
    VirtualLayoutRender.prototype.renderHeader = function (header) {
        var headerWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        header.appendChild(headerWrap);
        var headerTable = createElement('table', {
            className: TABLE_CLASS + ' ' + HEADER_TABLE_CLASS,
            attrs: { 'role': 'presentation' }
        });
        headerWrap.appendChild(headerTable);
        this.renderColGroup(headerTable);
        var tableHead = createElement('thead');
        headerTable.appendChild(tableHead);
        if (this.parent.stackedHeaders.length > 0) {
            tableHead.appendChild(this.createStackedRow(this.parent.stackedHeaders));
        }
        var tr = createElement('tr', { className: HEADER_ROW_CLASS });
        tableHead.appendChild(tr);
        var _loop_1 = function (column) {
            if (this_1.isColumnVisible(column)) {
                var index = this_1.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var th_1 = createElement('th', {
                    className: index === -1 ? HEADER_CELLS_CLASS : HEADER_CELLS_CLASS + ' ' + COLLAPSED_CLASS,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString() }
                });
                var classList = [];
                if (column.allowToggle) {
                    classList.push(HEADER_ROW_TOGGLE_CLASS);
                    if (!column.isExpanded) {
                        classList.push(COLLAPSED_CLASS);
                    }
                }
                addClass([th_1], classList);
                var headerWrapper = createElement('div', { className: HEADER_WRAP_CLASS });
                th_1.appendChild(headerWrapper);
                var noOfCard = this_1.parent.dataModule.isRemote() ?
                    this_1.parent.columnDataCount[column.keyField] : this_1.columnData[column.keyField].length;
                var headerTitle = createElement('div', { className: HEADER_TITLE_CLASS });
                headerWrapper.appendChild(headerTitle);
                if (column.template) {
                    var templateArgs = {
                        keyField: column.keyField, headerText: column.headerText, minCount: column.minCount, maxCount: column.maxCount,
                        allowToggle: column.allowToggle, isExpanded: column.isExpanded, showItemCount: column.showItemCount, count: noOfCard
                    };
                    addClass([th_1], TEMPLATE_CLASS);
                    var templateId = this_1.parent.element.id + '_columnTemplate';
                    var templateHeader = this_1.parent.templateParser(column.template)(templateArgs, this_1.parent, 'columnTemplate', templateId, false);
                    append(templateHeader, headerTitle);
                }
                else {
                    var header_1 = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: column.headerText });
                    headerTitle.appendChild(header_1);
                    if (column.showItemCount) {
                        var itemCount = createElement('div', {
                            className: CARD_ITEM_COUNT_CLASS,
                            innerHTML: '- ' + noOfCard.toString() + ' ' + this_1.parent.localeObj.getConstant('items')
                        });
                        headerTitle.appendChild(itemCount);
                    }
                }
                if (column.allowToggle) {
                    var isExpand = (column.isExpanded && index === -1) ? true : false;
                    var name_1 = (isExpand) ? COLUMN_EXPAND_CLASS : COLUMN_COLLAPSE_CLASS;
                    var icon = createElement('div', {
                        className: HEADER_ICON_CLASS + ' ' + ICON_CLASS + ' ' + name_1,
                        attrs: { 'tabindex': '0' }
                    });
                    icon.setAttribute('aria-label', isExpand ? column.keyField + ' Expand' : column.keyField + ' Collapse');
                    th_1.setAttribute('aria-expanded', isExpand.toString());
                    headerWrapper.appendChild(icon);
                }
                var dataObj = [{ keyField: column.keyField, textField: column.headerText, count: noOfCard }];
                var args = { data: dataObj, element: tr, cancel: false, requestType: 'headerRow' };
                this_1.parent.trigger(queryCellInfo, args, function (columnArgs) {
                    if (!columnArgs.cancel) {
                        tr.appendChild(th_1);
                    }
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            _loop_1(column);
        }
    };
    VirtualLayoutRender.prototype.renderContent = function () {
        var content = createElement('div', { className: CONTENT_CLASS });
        this.parent.element.appendChild(content);
        var contentWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        content.appendChild(contentWrap);
        var contentTable = createElement('table', {
            className: TABLE_CLASS + ' ' + CONTENT_TABLE_CLASS,
            attrs: { 'role': 'presentation' }
        });
        contentWrap.appendChild(contentTable);
        this.renderColGroup(contentTable);
        var tBody = createElement('tbody');
        contentTable.appendChild(tBody);
        var isCollaspsed = false;
        for (var _i = 0, _a = this.kanbanRows; _i < _a.length; _i++) {
            var row = _a[_i];
            if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneToggleArray.length !== 0) {
                var index = this.parent.swimlaneToggleArray.indexOf(row.keyField);
                isCollaspsed = index !== -1;
            }
            this.renderSingleContent(tBody, row, isCollaspsed);
        }
    };
    VirtualLayoutRender.prototype.renderSingleContent = function (tBody, row, isCollaspsed) {
        var className = isCollaspsed ? CONTENT_ROW_CLASS + ' ' + COLLAPSED_CLASS : CONTENT_ROW_CLASS;
        var tr = createElement('tr', { className: className, attrs: { 'aria-expanded': 'true' } });
        for (var _i = 0, _a = this.parent.columns; _i < _a.length; _i++) {
            var column = _a[_i];
            if (this.isColumnVisible(column)) {
                var index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var className_1 = index === -1 ? CONTENT_CELLS_CLASS : CONTENT_CELLS_CLASS + ' ' + COLLAPSED_CLASS;
                var dragClass = (column.allowDrag ? ' ' + DRAG_CLASS : '') + (column.allowDrop ? ' ' + DROP_CLASS
                    + ' ' + DROPPABLE_CLASS : '');
                var td = createElement('td', {
                    className: className_1 + dragClass,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'aria-expanded': 'true',
                        'tabindex': '0', 'role': 'navigation' }
                });
                if (column.allowToggle && !column.isExpanded || index !== -1) {
                    addClass([td], COLLAPSED_CLASS);
                    var text = (column.showItemCount ? '[' + (this.parent.dataModule.isRemote() ?
                        this.parent.columnDataCount[column.keyField] : this.getColumnData(column.keyField).length) +
                        '] ' : '') + column.headerText;
                    td.appendChild(createElement('div', { className: COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                    td.setAttribute('aria-expanded', 'false');
                }
                if (column.showAddButton) {
                    var button = createElement('div', { className: SHOW_ADD_BUTTON, attrs: { 'tabindex': '-1' } });
                    button.appendChild(createElement('div', { className: SHOW_ADD_ICON + ' ' + ICON_CLASS }));
                    td.appendChild(button);
                }
                tr.appendChild(td);
                if (this.parent.enableVirtualization) {
                    var headerHeight = this.parent.element.querySelector('.e-kanban-header').getBoundingClientRect().height;
                    //'15' is reduced for optimal padding in the bottom and to avoid page scrollbar appear in the height auto case.
                    if (this.parent.height === 'auto') {
                        td.style.height = window.innerHeight - (headerHeight + this.parent.element.getBoundingClientRect().top + 15) + 'px';
                    }
                    else {
                        td.style.height = parseInt(formatUnit(this.parent.height).split('px')[0], 10) - (headerHeight + 15) + 'px';
                    }
                }
            }
        }
        var dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        var args = { data: dataObj, element: tr, cancel: false, requestType: 'contentRow' };
        this.parent.trigger(queryCellInfo, args, function (columnArgs) {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    };
    VirtualLayoutRender.prototype.windowResize = function () {
        var cloumnsTDElem = this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS);
        var headerHeight = this.parent.element.querySelector('.e-kanban-header').getBoundingClientRect().height;
        for (var j = 0; j < cloumnsTDElem.length; j++) {
            if (this.parent.height === 'auto') {
                cloumnsTDElem[j].style.height = window.innerHeight - (headerHeight + this.parent.element.getBoundingClientRect().top + 15) + 'px';
            }
            else {
                cloumnsTDElem[j].style.height = parseInt(formatUnit(this.parent.height).split('px')[0], 10) - (headerHeight + 15) + 'px';
            }
        }
    };
    VirtualLayoutRender.prototype.refreshColumnData = function (draggedColumnKey, droppedColumnKey, requestType, crudKeyField) {
        var _this = this;
        var cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        var isCRUD = (requestType === 'cardChanged' || requestType === 'cardCreated' || requestType === 'cardRemoved')
            && !isNullOrUndefined(crudKeyField);
        cardRows.forEach(function (tr) {
            var _loop_2 = function (column) {
                if (_this.isColumnVisible(column) && (column.keyField === draggedColumnKey || column.keyField === droppedColumnKey)
                    || isCRUD) {
                    var cards_1 = 0;
                    var blocks = [];
                    var columnData = _this.getColumnCards()[column.keyField];
                    var currentColumnDataCount = _this.parent.dataModule.isRemote() ?
                        _this.parent.columnDataCount[column.keyField] : columnData.length;
                    var overallHeight = _this.cardHeight * currentColumnDataCount;
                    // eslint-disable-next-line prefer-spread
                    blocks = Array.apply(null, Array(currentColumnDataCount)).map(function () { return ++cards_1; });
                    var columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    var singleIndexCardCount = Math.ceil(parseInt(columnWrapper.style.height.split('px')[0], 10) / _this.cardHeight);
                    _this.offsets[1] = singleIndexCardCount * _this.cardHeight;
                    for (var i = 1; i < blocks.length; i++) {
                        _this.offsets[blocks[i]] = (_this.offsets[blocks[i - 1]]) + (singleIndexCardCount * _this.cardHeight);
                        _this.tempOffsets[blocks[i]] = _this.offsets[blocks[i] - 1] | 0;
                    }
                    var cardWrapper = columnWrapper.querySelector('.' + CARD_WRAPPER_CLASS);
                    var maxBlock = currentColumnDataCount % 2 === 0 ? currentColumnDataCount - 2 : currentColumnDataCount - 1;
                    var viewInfo = _this.getInfoFromView(_this.scrollStatus[column.keyField]);
                    var transformY = _this.getTranslateY(viewInfo);
                    var cardVirtualElement = cardWrapper.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
                    cardVirtualElement.style.maxHeight = currentColumnDataCount * _this.cardHeight + 'px';
                    _this.setPadding(transformY, cardVirtualElement, currentColumnDataCount);
                    _this.currentStatus = {
                        column: column.keyField,
                        columnOverAllHeight: overallHeight,
                        columnHeight: parseInt(columnWrapper.style.height.split('px')[0], 10),
                        previousScrollTop: _this.scrollStatus[column.keyField].currentScrollTop,
                        currentScrollTop: cardWrapper.scrollTop,
                        scrollDirection: _this.scrollStatus[column.keyField].scrollDirection,
                        currentBlockIndex: _this.scrollStatus[column.keyField].currentBlockIndex,
                        oldBlockIndex: _this.scrollStatus[column.keyField].oldBlockIndex,
                        offsets: _this.offsets,
                        tempOffsets: _this.tempOffsets,
                        totalColumnData: currentColumnDataCount,
                        singleIndexCardCount: singleIndexCardCount,
                        maxBlock: maxBlock
                    };
                    _this.scrollStatus[column.keyField] = _this.currentStatus;
                }
            };
            for (var _i = 0, _a = _this.parent.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                _loop_2(column);
            }
        });
    };
    VirtualLayoutRender.prototype.renderCards = function () {
        var _this = this;
        var cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        var swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row'));
        var removeTrs = [];
        var columnTransition = false;
        cardRows.forEach(function (tr, index) {
            var dataCount = 0;
            var _loop_3 = function (column) {
                if (_this.isColumnVisible(column)) {
                    var cards_2 = 0;
                    var currentScrollIndex = 0;
                    var blocks = [];
                    _this.offsets = {};
                    _this.tempOffsets = {};
                    var columnData = _this.columnData[column.keyField];
                    var currentColumnDataCount = _this.parent.dataModule.isRemote()
                        ? _this.parent.columnDataCount[column.keyField] : columnData.length;
                    dataCount += currentColumnDataCount;
                    var overallHeight = (_this.cardHeight * currentColumnDataCount) + 7; //7 is difference between top space of the scroll element
                    var columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    var singleIndexCardCount = Math.ceil(parseFloat(columnWrapper.style.height.split('px')[0]) / _this.cardHeight);
                    var currentColumnBlock = singleIndexCardCount > currentColumnDataCount ? currentColumnDataCount :
                        Math.floor(currentColumnDataCount / singleIndexCardCount);
                    // eslint-disable-next-line prefer-spread
                    blocks = Array.apply(null, Array(currentColumnDataCount)).map(function () { return ++cards_2; });
                    _this.offsets[1] = singleIndexCardCount * _this.cardHeight + 7;
                    for (var i = 1; i < blocks.length; i++) {
                        _this.offsets[blocks[i]] = (_this.offsets[blocks[i - 1]]) + (singleIndexCardCount * _this.cardHeight);
                        _this.tempOffsets[blocks[i]] = _this.offsets[blocks[i] - 1] | 0;
                    }
                    var cardWrapper = createElement('div', {
                        className: CARD_WRAPPER_CLASS, attrs: { 'role': 'listbox' }
                    });
                    var cardVirtualWrapper_1 = createElement('div', {
                        className: CARD_VIRTUAL_WRAPPER_CLASS, attrs: { 'role': 'listbox' }
                    });
                    cardWrapper.appendChild(cardVirtualWrapper_1);
                    var maxBlock = currentColumnBlock % 2 === 0 ? currentColumnBlock : currentColumnBlock + 1;
                    _this.currentStatus = {
                        column: column.keyField,
                        columnOverAllHeight: overallHeight,
                        columnHeight: parseInt(columnWrapper.style.height.split('px')[0], 10),
                        previousScrollTop: null,
                        currentScrollTop: cardWrapper.scrollTop,
                        scrollDirection: null,
                        currentBlockIndex: [1, 2],
                        oldBlockIndex: [1, 2],
                        offsets: _this.offsets,
                        tempOffsets: _this.tempOffsets,
                        totalColumnData: currentColumnDataCount,
                        singleIndexCardCount: singleIndexCardCount,
                        maxBlock: maxBlock
                    };
                    _this.scrollStatus[column.keyField] = _this.currentStatus;
                    if (column.transitionColumns.length > 0) {
                        columnTransition = true;
                    }
                    if (!columnTransition && isNullOrUndefined(_this.parent.swimlaneSettings.keyField)) {
                        var borderElem = createElement('div', { className: BORDER_CLASS });
                        columnWrapper.appendChild(borderElem);
                    }
                    columnWrapper.appendChild(cardWrapper);
                    if (currentColumnDataCount > 0) {
                        var _loop_4 = function (i) {
                            var cardText = columnData[i][_this.parent.cardSettings.headerField];
                            var cardIndex = _this.parent.actionModule.selectionArray.indexOf(cardText);
                            var cardElement = _this.renderCard(columnData[i]);
                            if (cardIndex !== -1) {
                                cardElement.setAttribute('aria-selected', 'true');
                                addClass([cardElement], CARD_SELECTION_CLASS);
                            }
                            var args = { data: columnData[i], element: cardElement, cancel: false };
                            _this.parent.trigger(cardRendered, args, function (cardArgs) {
                                if (!cardArgs.cancel) {
                                    cardVirtualWrapper_1.appendChild(cardElement);
                                }
                            });
                        };
                        for (var i = currentScrollIndex; i < singleIndexCardCount * 2 && i < columnData.length; i++) {
                            _loop_4(i);
                        }
                        cardVirtualWrapper_1.style.maxHeight = _this.cardHeight * currentColumnDataCount + 'px';
                    }
                    else {
                        cardVirtualWrapper_1.appendChild(_this.renderEmptyCard());
                    }
                    _this.setPadding(0, cardVirtualWrapper_1, currentColumnDataCount);
                }
            };
            for (var _i = 0, _a = _this.parent.columns; _i < _a.length; _i++) {
                var column = _a[_i];
                _loop_3(column);
            }
            if (dataCount === 0) {
                removeTrs.push(tr);
                if (swimlaneRows.length > 0) {
                    removeTrs.push(swimlaneRows[index]);
                }
            }
        });
        if (!this.parent.swimlaneSettings.showEmptyRow && (this.parent.kanbanData.length === 0 && !this.parent.showEmptyColumn)) {
            removeTrs.forEach(function (tr) { return remove(tr); });
        }
    };
    VirtualLayoutRender.prototype.renderCard = function (data) {
        var cardElement = createElement('div', {
            className: CARD_CLASS,
            attrs: {
                'data-id': data[this.parent.cardSettings.headerField], 'data-key': data[this.parent.keyField],
                'aria-selected': 'false', 'tabindex': '-1', 'role': 'option'
            }
        });
        cardElement.style.height = this.cardHeight - 8 + 'px'; // Since in the public card height calculation margin bottom is added, so it reduced here.
        if (this.parent.cardSettings.template) {
            addClass([cardElement], TEMPLATE_CLASS);
            var templateId = this.parent.element.id + '_cardTemplate';
            var cardTemplate = this.parent.templateParser(this.parent.cardSettings.template)(data, this.parent, 'cardTemplate', templateId, false);
            append(cardTemplate, cardElement);
        }
        else {
            var tooltipClass = this.parent.enableTooltip ? ' ' + TOOLTIP_TEXT_CLASS : '';
            if (this.parent.cardSettings.showHeader) {
                var cardHeader = createElement('div', { className: CARD_HEADER_CLASS });
                var cardCaption = createElement('div', { className: CARD_HEADER_TEXT_CLASS });
                var cardText = createElement('div', {
                    className: CARD_HEADER_TITLE_CLASS + tooltipClass,
                    innerHTML: data[this.parent.cardSettings.headerField] || ''
                });
                cardHeader.appendChild(cardCaption);
                cardCaption.appendChild(cardText);
                cardElement.appendChild(cardHeader);
            }
            var cardContent = createElement('div', {
                className: CARD_CONTENT_CLASS + tooltipClass,
                innerHTML: data[this.parent.cardSettings.contentField] || ''
            });
            cardElement.appendChild(cardContent);
            if (this.parent.cardSettings.tagsField && data[this.parent.cardSettings.tagsField]) {
                var cardTags = createElement('div', { className: CARD_TAGS_CLASS });
                var tags = data[this.parent.cardSettings.tagsField].toString().split(',');
                for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
                    var tag = tags_1[_i];
                    cardTags.appendChild(createElement('div', {
                        className: CARD_TAG_CLASS + ' ' + CARD_LABEL_CLASS, innerHTML: tag
                    }));
                }
                cardElement.appendChild(cardTags);
            }
            if (this.parent.cardSettings.grabberField && data[this.parent.cardSettings.grabberField]) {
                addClass([cardElement], CARD_COLOR_CLASS);
                cardElement.style.borderLeftColor = data[this.parent.cardSettings.grabberField];
            }
            if (this.parent.cardSettings.footerCssField) {
                var cardFields = createElement('div', { className: CARD_FOOTER_CLASS });
                var keys = data[this.parent.cardSettings.footerCssField].split(',');
                for (var _a = 0, keys_1 = keys; _a < keys_1.length; _a++) {
                    var key = keys_1[_a];
                    cardFields.appendChild(createElement('div', {
                        className: key.trim() + ' ' + CARD_FOOTER_CSS_CLASS
                    }));
                }
                cardElement.appendChild(cardFields);
            }
        }
        return cardElement;
    };
    VirtualLayoutRender.prototype.renderEmptyCard = function () {
        var emptyCard = createElement('span', {
            className: EMPTY_CARD_CLASS,
            innerHTML: this.parent.localeObj.getConstant('noCard')
        });
        return emptyCard;
    };
    VirtualLayoutRender.prototype.renderColGroup = function (table) {
        var _this = this;
        var colGroup = createElement('colgroup');
        this.parent.columns.forEach(function (column) {
            if (_this.isColumnVisible(column)) {
                var index = _this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                var isToggle = column.allowToggle && !column.isExpanded;
                var className = index === -1 ? (isToggle ? COLLAPSED_CLASS : '') : COLLAPSED_CLASS;
                var col = createElement('col', {
                    className: className,
                    attrs: { 'data-key': column.keyField.toString() },
                    styles: _this.parent.isAdaptive ? 'width: ' +
                        (isToggle ? formatUnit(toggleWidth) : formatUnit(_this.getWidth())) : ''
                });
                colGroup.appendChild(col);
            }
        });
        table.appendChild(colGroup);
    };
    VirtualLayoutRender.prototype.getRows = function () {
        var kanbanRows = [];
        kanbanRows.push({ keyField: '', textField: '' });
        return kanbanRows;
    };
    VirtualLayoutRender.prototype.createStackedRow = function (rows) {
        var tr = createElement('tr', { className: HEADER_ROW_CLASS + ' ' + STACKED_HEADER_ROW_CLASS });
        var stackedHeaders = [];
        this.parent.columns.forEach(function (column) {
            var headerText = '';
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                if (row.keyFields.indexOf(column.keyField.toString()) !== -1) {
                    headerText = row.text;
                }
            }
            stackedHeaders.push(headerText);
        });
        for (var h = 0; h < stackedHeaders.length; h++) {
            var colSpan = 1;
            for (var j = h + 1; j < stackedHeaders.length; j++) {
                if ((stackedHeaders[h] !== '') && (stackedHeaders[j] !== '') && stackedHeaders[h] === stackedHeaders[j]) {
                    colSpan++;
                }
                else {
                    break;
                }
            }
            var div = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: stackedHeaders[h] });
            var th = createElement('th', {
                className: HEADER_CELLS_CLASS + ' ' + STACKED_HEADER_CELL_CLASS,
                attrs: { 'colspan': colSpan.toString() }
            });
            tr.appendChild(th).appendChild(div);
            h += colSpan - 1;
        }
        return tr;
    };
    VirtualLayoutRender.prototype.scrollUiUpdate = function () {
        var _this = this;
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        var height = this.parent.element.offsetHeight - header.offsetHeight;
        if (this.parent.isAdaptive) {
            height = window.innerHeight - (header.offsetHeight + bottomSpace);
            var swimlaneToolbar = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
            if (swimlaneToolbar) {
                height -= swimlaneToolbar.offsetHeight;
            }
            var cardWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS));
            cardWrappers.forEach(function (cell) {
                var cardWrapper = cell.querySelector('.' + CARD_WRAPPER_CLASS);
                if (!cardWrapper.classList.contains(MULTI_CARD_WRAPPER_CLASS)) {
                    cardWrapper.style.height = formatUnit(height);
                    EventHandler.add(cell, 'touchmove', _this.onAdaptiveScroll, _this);
                }
            });
        }
        if (this.parent.height !== 'auto' && this.parent.height !== '100%') {
            content.style.height = formatUnit(height);
        }
        [].slice.call(header.children).forEach(function (node) {
            var paddingValue = 0;
            if ((content.offsetWidth - content.clientWidth) > 0) {
                paddingValue = 17;
                if ((content.offsetHeight - content.clientHeight) > 0) {
                    node.style.width = formatUnit(content.clientWidth);
                }
            }
            if (_this.parent.enableRtl) {
                node.style.paddingLeft = formatUnit(paddingValue);
            }
            else {
                node.style.paddingRight = formatUnit(paddingValue);
            }
        });
        this.updateScrollPosition();
    };
    VirtualLayoutRender.prototype.onContentScroll = function (e) {
        var target = e.target;
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach(function (node) { node.scrollLeft = target.scrollLeft; });
        this.parent.scrollPosition.content = { left: target.scrollLeft, top: target.scrollTop };
    };
    VirtualLayoutRender.prototype.getOffset = function (block, viewInfo) {
        return Math.min(viewInfo.offsets[block] | 0, viewInfo.offsets[viewInfo.maxBlock] | 0);
    };
    VirtualLayoutRender.prototype.getTranslateY = function (viewInfo) {
        var block = (viewInfo.newBlockIndex[0] || 1) - 1;
        var translate = this.getOffset(block, viewInfo);
        var endTranslate = this.getOffset(viewInfo.newBlockIndex[viewInfo.newBlockIndex.length - 1], viewInfo);
        var result = translate > viewInfo.currentScrollTop ?
            this.getOffset(block - 1, viewInfo) : endTranslate < (viewInfo.currentScrollTop + viewInfo.columnHeight) ?
            this.getOffset(block + 1, viewInfo) : translate;
        return result;
    };
    VirtualLayoutRender.prototype.setPadding = function (paddingTop, scrollElem, dataCount, isScrolledToLast, direction) {
        if (isScrolledToLast && direction === 'down') {
            scrollElem.style.paddingTop = paddingTop + "px";
            scrollElem.style.paddingBottom = '0px';
        }
        else {
            scrollElem.style.paddingTop = paddingTop + "px";
            scrollElem.style.paddingBottom = this.cardHeight * dataCount - paddingTop + "px";
        }
    };
    VirtualLayoutRender.prototype.getData = function (keyField, column, take, skip) {
        var query = this.query.clone();
        var predicate = new Predicate(keyField, 'equal', column, true);
        query.where(predicate);
        query.take(take);
        query.skip(skip);
        query.addParams('KanbanVirtualScroll', 'KanbanVirtualScroll');
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            var def = this.eventPromise({ requestType: '' }, query);
            return def.promise;
        }
        return this.parent.dataModule.dataManager.executeQuery(query);
    };
    VirtualLayoutRender.prototype.eventPromise = function (args, query) {
        var state = this.getStateEventArgument(query);
        var def = new Deferred();
        state.updateData = def.resolve;
        state.action = args;
        return def;
    };
    VirtualLayoutRender.prototype.getStateEventArgument = function (query) {
        var adaptr = new UrlAdaptor();
        var dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
        var state = adaptr.processQuery(dm, query);
        var data = JSON.parse(state.data);
        return extend(data, state.pvtData);
    };
    VirtualLayoutRender.prototype.dataManagerSuccess = function (e, type) {
        var _this = this;
        var resultData;
        if (type) {
            resultData = extend([], !isNullOrUndefined(e.result.result) ?
                e.result.result : e.result, null, true);
        }
        else {
            this.parent.trigger(dataBinding, e, function (args) {
                resultData = extend([], !isNullOrUndefined(args.result.result) ?
                    args.result.result : args.result, null, true);
                _this.parent.trigger(dataBound, null, function () { return _this.parent.hideSpinner(); });
            });
        }
        return resultData;
    };
    VirtualLayoutRender.prototype.dataManagerFailure = function (e) {
        var _this = this;
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.trigger(actionFailure, { error: e }, function () { return _this.parent.hideSpinner(); });
    };
    VirtualLayoutRender.prototype.onColScrollShowSkeleton = function (args) {
        var target = args.target;
        if (this.parent.element.querySelectorAll('.e-card-skeleton-wrapper').length > 0) {
            return;
        }
        var key = target.parentElement.getAttribute('data-key');
        var previousScrollTop = this.scrollStatus[key].previousScrollTop;
        var parentElemHeight = target.parentElement.clientHeight;
        if ((target.scrollTop - previousScrollTop) > parentElemHeight || (previousScrollTop - target.scrollTop) > parentElemHeight) {
            this.showSkeleton(target, this.scrollStatus[key].singleIndexCardCount);
        }
    };
    VirtualLayoutRender.prototype.showSkeleton = function (cardWrapper, skeletonCount) {
        var cardVirtualSkeletonWrapper = createElement('div', {
            className: 'e-card-virtual-skeleton-wrapper', attrs: { 'role': 'listbox' }
        });
        cardWrapper.parentElement.insertBefore(cardVirtualSkeletonWrapper, cardWrapper);
        cardVirtualSkeletonWrapper.style.position = 'absolute';
        cardVirtualSkeletonWrapper.style.zIndex = '10';
        for (var j = 0; j < skeletonCount; j++) {
            var skeletonWrapper = createElement('div', { className: 'e-card-skeleton-wrapper' });
            var skeleton = createElement('span', { className: 'e-skeleton e-skeleton-text e-shimmer-wave' });
            skeleton.style.height = this.cardHeight + 'px';
            // Assumption fix, issue reproduce in rare cases only .
            if (!isNullOrUndefined(cardWrapper.querySelector('.e-card'))) {
                skeleton.style.width = cardWrapper.querySelector('.e-card').getBoundingClientRect().width + 'px';
            }
            skeletonWrapper.appendChild(skeleton);
            cardVirtualSkeletonWrapper.appendChild(skeletonWrapper);
        }
    };
    VirtualLayoutRender.prototype.hideSkeleton = function (cardWrapper) {
        setTimeout(function () {
            var skeletonWrapper = cardWrapper.querySelectorAll('.e-card-virtual-skeleton-wrapper');
            for (var i = 0; i < skeletonWrapper.length; i++) {
                detach(skeletonWrapper[i]);
            }
        }, 50);
    };
    VirtualLayoutRender.prototype.onColumnScroll = function (e) {
        var _this = this;
        var target = e.target;
        var currentScrolledHeight = target.scrollTop;
        var columnKey;
        if (target.offsetParent) {
            columnKey = target.offsetParent.getAttribute('data-key');
            this.parent.scrollPosition.column[columnKey] = { left: target.scrollLeft, top: target.scrollTop };
        }
        if (this.parent.enableVirtualization) {
            var cardWrapper_1 = target;
            var dataCount = 0;
            var columnData = this.getColumnCards()[columnKey];
            var currentColumnDataCount = this.parent.dataModule.isRemote() ?
                this.parent.columnDataCount[columnKey] : columnData.length;
            dataCount += currentColumnDataCount;
            var overallHeight = this.cardHeight * dataCount;
            var removeIndex = [];
            var addIndex = [];
            this.checkScrollDirection(columnKey, currentScrolledHeight);
            if (this.findScrollSpeed(target, columnKey) === 'fast' && currentScrolledHeight > overallHeight) {
                this.hideSkeleton(cardWrapper_1.parentElement);
                return;
            }
            var maxBlock = this.scrollStatus[columnKey].maxBlock;
            var isLastBlockRendered = this.scrollStatus[columnKey].currentBlockIndex.indexOf(maxBlock) > -1;
            var isDuplicateScroll = e.timeStamp - this.scrollStatus[columnKey].previousTimeStamps < 300;
            if (isLastBlockRendered && !isNullOrUndefined(this.scrollStatus[columnKey].previousTimeStamps) && isDuplicateScroll) {
                this.hideSkeleton(cardWrapper_1.parentElement);
                return;
            }
            this.scrollStatus[columnKey].previousTimeStamps = e.timeStamp;
            var viewInfo_1 = this.getInfoFromView(this.scrollStatus[columnKey]);
            removeIndex = viewInfo_1.currentBlockIndex.filter(function (val) {
                return viewInfo_1.newBlockIndex.indexOf(val) === -1;
            });
            addIndex = viewInfo_1.newBlockIndex.filter(function (val) {
                return viewInfo_1.currentBlockIndex.indexOf(val) === -1;
            });
            var isScrolledToLast = currentScrolledHeight + target.clientHeight >= overallHeight;
            var transformY = isScrolledToLast ? overallHeight - (cardWrapper_1.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS).childElementCount * this.cardHeight)
                : this.getTranslateY(viewInfo_1);
            var cardVirtualElement_1 = cardWrapper_1.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
            if (removeIndex.length > 0) {
                var removeStartIndex = void 0;
                var removeEndIndex = void 0;
                if (removeIndex[0] === 1) {
                    removeStartIndex = 0;
                    removeEndIndex = (removeIndex.length * this.scrollStatus[columnKey].singleIndexCardCount) - 1;
                }
                else {
                    removeStartIndex = ((removeIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    removeEndIndex = removeStartIndex + (removeIndex.length * this.scrollStatus[columnKey].singleIndexCardCount);
                }
                this.removeCardsOnScroll(cardVirtualElement_1, this.scrollStatus[columnKey].scrollDirection === 'down' ? true : false, removeStartIndex, removeEndIndex);
            }
            if (addIndex.length > 0) {
                if (this.parent.dataModule.isRemote()) {
                    var visibleStartIndex = ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    var resultData_1 = [];
                    var dataManager = this.getData(this.parent.keyField, columnKey, (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length), visibleStartIndex);
                    dataManager.then(function (e) {
                        resultData_1 = _this.dataManagerSuccess(e);
                        _this.scrollCardInsert(columnKey, cardVirtualElement_1, target, currentScrolledHeight, cardWrapper_1, _this.scrollStatus[columnKey].scrollDirection === 'down' ? 0 : (resultData_1.length - 1), true, resultData_1, null);
                    }).catch(function (e) { return _this.dataManagerFailure(e); });
                }
                else {
                    var visibleStartIndex = this.scrollStatus[columnKey].scrollDirection === 'down' ? ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount) :
                        ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount)
                            + (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length) - 1;
                    var visibleLength = this.scrollStatus[columnKey].scrollDirection === 'down' ? visibleStartIndex + (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length) :
                        ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    this.scrollCardInsert(columnKey, cardVirtualElement_1, target, currentScrolledHeight, cardWrapper_1, visibleStartIndex, false, columnData, visibleLength);
                }
            }
            this.scrollStatus[columnKey].currentBlockIndex = this.scrollStatus[columnKey].newBlockIndex;
            this.setPadding(transformY, cardVirtualElement_1, currentColumnDataCount, isScrolledToLast, this.scrollStatus[columnKey].scrollDirection);
            viewInfo_1.currentBlockIndex = viewInfo_1.newBlockIndex;
            this.parent.renderTemplates();
            this.hideSkeleton(cardWrapper_1.parentElement);
        }
    };
    VirtualLayoutRender.prototype.checkScrollDirection = function (columnKey, currentScrolledHeight) {
        // Update the previous and current scroll top value
        this.scrollStatus[columnKey].previousScrollTop = this.scrollStatus[columnKey].currentScrollTop;
        this.scrollStatus[columnKey].currentScrollTop = currentScrolledHeight;
        // Check the scroll direction
        if (currentScrolledHeight > this.scrollStatus[columnKey].previousScrollTop) {
            this.scrollStatus[columnKey].scrollDirection = 'down';
        }
        else {
            this.scrollStatus[columnKey].scrollDirection = 'up';
        }
    };
    VirtualLayoutRender.prototype.findScrollSpeed = function (target, columnKey) {
        // Find the scroll speed
        if (this.scrollStatus[columnKey].scrollDirection === 'down' &&
            (target.scrollTop - this.scrollStatus[columnKey].previousScrollTop > target.clientHeight)) {
            return 'fast';
        }
        else if (this.scrollStatus[columnKey].scrollDirection === 'up' &&
            (this.scrollStatus[columnKey].previousScrollTop - target.scrollTop > target.clientHeight)) {
            return 'fast';
        }
        return 'slow';
    };
    VirtualLayoutRender.prototype.removeCardsOnScroll = function (cardVirtualElement, isDown, removeStartIndex, removeEndIndex) {
        for (var j = removeStartIndex; j < removeEndIndex; j++) {
            var removableElem = isDown ? cardVirtualElement.firstChild
                : cardVirtualElement.lastChild;
            while (!isNullOrUndefined(removableElem) && (removableElem.classList.contains(DRAGGED_CARD_CLASS) ||
                removableElem.classList.contains(DRAGGED_CLONE_CLASS) ||
                removableElem.classList.contains(DROPPED_CLONE_CLASS) ||
                removableElem.classList.contains(CLONED_CARD_CLASS))) {
                removableElem = isDown ? removableElem.nextSibling : removableElem.previousSibling;
            }
            if (!isNullOrUndefined(removableElem)) {
                detach(removableElem);
            }
        }
    };
    VirtualLayoutRender.prototype.scrollCardInsert = function (columnKey, cardVirtualElement, target, currentScrolledHeight, cardWrapper, startNumber, isRemote, resultData, visibleLength) {
        var _this = this;
        var conditonsScrollDownCase = isRemote ? resultData.length : visibleLength;
        var conditonsScrollUpCase = isRemote ? 0 : visibleLength;
        if (resultData.length > 0) {
            var _loop_5 = function (j) {
                if (!isNullOrUndefined(resultData[j])) {
                    var cardText = resultData[j][this_2.parent.cardSettings.headerField];
                    var cardIndex = this_2.parent.actionModule.selectionArray.indexOf(cardText);
                    var cardElement_1 = this_2.renderCard(resultData[j]);
                    if (cardIndex !== -1) {
                        cardElement_1.setAttribute('aria-selected', 'true');
                        addClass([cardElement_1], CARD_SELECTION_CLASS);
                    }
                    var args = { data: resultData[j], element: cardElement_1, cancel: false };
                    this_2.parent.trigger(cardRendered, args, function (cardArgs) {
                        if (!cardArgs.cancel) {
                            if (_this.scrollStatus[columnKey].scrollDirection === 'down') {
                                cardVirtualElement.appendChild(cardElement_1);
                            }
                            else {
                                cardVirtualElement.insertBefore(cardElement_1, cardVirtualElement.firstChild);
                            }
                            _this.parent.dragAndDropModule.wireDragEvents(cardElement_1);
                            addClass([cardElement_1], DROPPABLE_CLASS);
                        }
                    });
                }
            };
            var this_2 = this;
            for (var j = startNumber; this.scrollStatus[columnKey].scrollDirection === 'down' ? (j < conditonsScrollDownCase) :
                j >= conditonsScrollUpCase; this.scrollStatus[columnKey].scrollDirection === 'down' ? j++ : j--) {
                _loop_5(j);
            }
            target.scrollTop = currentScrolledHeight;
        }
        else {
            cardWrapper.appendChild(this.renderEmptyCard());
        }
    };
    VirtualLayoutRender.prototype.ensureColumnNotEmpty = function (draggedColumnKey) {
        var singleIndexCardCount = this.scrollStatus[draggedColumnKey].singleIndexCardCount;
        var draggedColumnData = this.columnData[draggedColumnKey];
        var draggedTdColummElement = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row) [data-key="' + draggedColumnKey + '"]');
        var wrapperELement = draggedTdColummElement.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
        var cardsList = wrapperELement.querySelectorAll('.' + CARD_CLASS);
        if (cardsList.length > 0) {
            var lastCardDataId = cardsList[cardsList.length - 1].getAttribute('data-id');
            var firstCardDataId = cardsList[0].getAttribute('data-id');
            var lastCardIndex = void 0;
            var firstCardIndex = void 0;
            if (cardsList.length < singleIndexCardCount * 2) {
                for (var i = 0; i < draggedColumnData.length; i++) {
                    if (lastCardDataId === (draggedColumnData[i][this.parent.cardSettings.headerField]).toString()) {
                        lastCardIndex = i;
                    }
                    if (firstCardDataId === (draggedColumnData[i][this.parent.cardSettings.headerField]).toString()) {
                        firstCardIndex = i;
                    }
                }
                var cardCount = cardsList.length;
                for (var i = cardCount; i < singleIndexCardCount * 2; i++) {
                    var isLast = lastCardIndex === draggedColumnData.length - 1 ? true : false;
                    var nextCardIndex = lastCardIndex < draggedColumnData.length ? lastCardIndex + 1 : firstCardIndex - 1;
                    if (nextCardIndex <= draggedColumnData.length) {
                        var nextCardData = draggedColumnData[nextCardIndex];
                        if (!isNullOrUndefined(nextCardData)) {
                            var nextCard = this.renderCard(nextCardData);
                            this.triggerCardRendering(nextCard, nextCardIndex, draggedColumnData, wrapperELement, isLast);
                            if (isLast) {
                                firstCardIndex = nextCardIndex;
                            }
                            else {
                                lastCardIndex = nextCardIndex;
                            }
                        }
                    }
                }
            }
        }
    };
    VirtualLayoutRender.prototype.triggerCardRendering = function (nextCard, nextCardIndex, draggedColumnData, wrapperELement, isLast) {
        var _this = this;
        var cardText = draggedColumnData[nextCardIndex][this.parent.cardSettings.headerField];
        var cardIndex = this.parent.actionModule.selectionArray.indexOf(cardText);
        if (cardIndex !== -1) {
            nextCard.setAttribute('aria-selected', 'true');
            addClass([nextCard], CARD_SELECTION_CLASS);
        }
        var args = { data: draggedColumnData[nextCardIndex], element: nextCard, cancel: false };
        this.parent.trigger(cardRendered, args, function (cardArgs) {
            if (!cardArgs.cancel) {
                if (!isLast) {
                    wrapperELement.appendChild(nextCard);
                }
                else {
                    wrapperELement.insertBefore(nextCard, wrapperELement.querySelectorAll('.' + CARD_CLASS)[0]);
                }
                _this.parent.dragAndDropModule.wireDragEvents(nextCard);
                addClass([nextCard], DROPPABLE_CLASS);
            }
        });
    };
    VirtualLayoutRender.prototype.ensureBlocks = function (info) {
        var index = info.newBlockIndex[info.block];
        var maxPage = Math.ceil(info.totalColumnData / info.singleIndexCardCount);
        var max = Math.max;
        var indexes;
        if (info.scrollDirection === 'down') {
            indexes = index >= maxPage ? [max(index, 1), --index, --index].reverse() :
                (index + 1 >= maxPage ? [max(index - 1, 1), index, ++index] :
                    [max(index, 1), ++index, ++index]);
        }
        else {
            indexes = index === maxPage ? [max(index - 2, 1), max(index - 1, 1), index] :
                [max(index - 1, 1), index, index + 1];
        }
        // eslint-disable-next-line
        return indexes.filter(function (indexRemoveZero) { return indexRemoveZero > 0; });
    };
    VirtualLayoutRender.prototype.getInfoFromView = function (scrollStatus) {
        var isBlockAdded = false;
        var infoType = scrollStatus;
        infoType.page = this.getPageFromTop(scrollStatus);
        infoType.newBlockIndex = this.getBlockIndexes(infoType.page);
        var blocks = this.ensureBlocks(infoType);
        if (infoType.newBlockIndex.toString() !== blocks.toString()) {
            // To avoid dupilcate row index problem in key focus support
            var newBlock = blocks[blocks.length - 1];
            if (infoType.newBlockIndex.indexOf(newBlock) === -1) {
                isBlockAdded = true;
            }
        }
        infoType.newBlockIndex = isBlockAdded ? blocks : infoType.newBlockIndex;
        return infoType;
    };
    VirtualLayoutRender.prototype.getBlockIndexes = function (page) {
        return [page + (page - 1), page * 2];
    };
    VirtualLayoutRender.prototype.getPageFromTop = function (info) {
        var _this = this;
        var total = info.totalColumnData;
        var page = 0;
        this.offsetKeys = Object.keys(info.offsets);
        this.offsetKeys.some(function (offset) {
            var iOffset = Number(offset);
            var border = info.currentScrollTop <= info.offsets[parseInt(offset, 10)]
                || (iOffset === total && info.currentScrollTop > info.offsets[parseInt(offset, 10)]);
            if (border) {
                var maxPage = Math.ceil(total / info.singleIndexCardCount);
                if (_this.offsetKeys.length % 2 !== 0 && iOffset.toString() === _this.offsetKeys[_this.offsetKeys.length - 2]
                    && info.currentScrollTop <= info.offsets[_this.offsetKeys.length - 1]) {
                    iOffset = (iOffset + 1) > maxPage ? maxPage : iOffset + 1;
                }
                iOffset = iOffset > maxPage ? maxPage : iOffset;
                info.block = iOffset % 2 === 0 ? 1 : 0;
                page = Math.max(1, Math.min(_this.getPage(iOffset, maxPage), maxPage));
            }
            return border;
        });
        return page;
    };
    VirtualLayoutRender.prototype.getPage = function (block, maxPage) {
        if (block + 1 > maxPage) {
            return block % 2 === 0 ? block / 2 : (block - 1) / 2;
        }
        else {
            return block % 2 === 0 ? block / 2 : (block + 1) / 2;
        }
    };
    VirtualLayoutRender.prototype.onAdaptiveScroll = function (e) {
        if (this.parent.touchModule.tabHold && !this.parent.touchModule.mobilePopup) {
            e.preventDefault();
        }
    };
    /**
     * Check column is visible or not.
     *
     * @param {ColumnsModel} column - specifies the column.
     * @returns {boolean} - Check column is visible or not.
     * @private
     * @hidden
     */
    VirtualLayoutRender.prototype.isColumnVisible = function (column) {
        var _this = this;
        var isVisible = false;
        var isNumeric = typeof column.keyField === 'number';
        if (isNumeric) {
            isVisible = this.parent.actionModule.hideColumnKeys.indexOf(column.keyField.toString()) === -1;
        }
        else {
            column.keyField.split(',').forEach(function (key) { isVisible = _this.parent.actionModule.hideColumnKeys.indexOf(key) === -1; });
        }
        return isVisible;
    };
    VirtualLayoutRender.prototype.renderLimits = function (column, target) {
        var limits = createElement('div', { className: LIMITS_CLASS });
        if (column.minCount) {
            limits.appendChild(createElement('div', {
                className: MIN_COUNT_CLASS,
                innerHTML: this.parent.localeObj.getConstant('min') + ': ' + column.minCount.toString()
            }));
        }
        if (column.maxCount) {
            limits.appendChild(createElement('div', {
                className: MAX_COUNT_CLASS,
                innerHTML: this.parent.localeObj.getConstant('max') + ': ' + column.maxCount.toString()
            }));
        }
        if (limits.childElementCount > 0) {
            if (target.querySelector('.' + CARD_WRAPPER_CLASS)) {
                target.insertBefore(limits, target.firstElementChild);
            }
            else {
                target.appendChild(limits);
            }
        }
    };
    VirtualLayoutRender.prototype.renderValidation = function () {
        var _this = this;
        this.parent.columns.forEach(function (column) {
            if (!column.minCount && !column.maxCount) {
                return;
            }
            var cardData = _this.columnData[column.keyField];
            var keySelector = "[data-key=\"" + column.keyField + "\"]";
            var headerCell = _this.parent.element.querySelector("." + (HEADER_CELLS_CLASS + keySelector));
            var rowCells = [].slice.call(_this.parent.element.querySelectorAll("." + (CONTENT_CELLS_CLASS + keySelector)));
            _this.renderLimits(column, headerCell);
            var colorClass = _this.getValidationClass(column, cardData.length);
            if (colorClass) {
                addClass(rowCells.concat(headerCell), colorClass);
            }
        });
    };
    VirtualLayoutRender.prototype.getValidationClass = function (column, count) {
        var colorClass;
        if (column.maxCount && count > column.maxCount) {
            colorClass = MAX_COLOR_CLASS;
        }
        else if (column.minCount && count < column.minCount) {
            colorClass = MIN_COLOR_CLASS;
        }
        return colorClass;
    };
    VirtualLayoutRender.prototype.refreshValidation = function () {
        var validations = [].slice.call(this.parent.element.querySelectorAll('.' + LIMITS_CLASS));
        validations.forEach(function (node) { remove(node); });
        var minClass = [].slice.call(this.parent.element.querySelectorAll('.' + MIN_COLOR_CLASS));
        removeClass(minClass, MIN_COLOR_CLASS);
        var maxClass = [].slice.call(this.parent.element.querySelectorAll('.' + MAX_COLOR_CLASS));
        removeClass(maxClass, MAX_COLOR_CLASS);
        this.renderValidation();
    };
    VirtualLayoutRender.prototype.getColumnData = function (columnValue, dataSource) {
        var _this = this;
        if (dataSource === void 0) { dataSource = this.parent.kanbanData; }
        var cardData = [];
        var isNumeric = typeof columnValue === 'number';
        if (isNumeric) {
            var keyData = dataSource.filter(function (cardObj) {
                return cardObj[_this.parent.keyField] === columnValue;
            });
            cardData = cardData.concat(keyData);
        }
        else {
            var columnKeys = columnValue.split(',');
            var _loop_6 = function (key) {
                var keyData = dataSource.filter(function (cardObj) {
                    return cardObj[_this.parent.keyField] === key.trim();
                });
                cardData = cardData.concat(keyData);
            };
            for (var _i = 0, columnKeys_1 = columnKeys; _i < columnKeys_1.length; _i++) {
                var key = columnKeys_1[_i];
                _loop_6(key);
            }
        }
        this.sortCategory(cardData);
        return cardData;
    };
    VirtualLayoutRender.prototype.sortCategory = function (cardData) {
        var key = this.parent.cardSettings.headerField;
        var direction = this.parent.sortSettings.direction;
        switch (this.parent.sortSettings.sortBy) {
            case 'DataSourceOrder':
                this.sortOrder(key, direction, cardData);
                break;
            case 'Custom':
            case 'Index':
                if (this.parent.sortSettings.field) {
                    key = this.parent.sortSettings.field;
                }
                this.sortOrder(key, direction, cardData);
                break;
        }
        return cardData;
    };
    VirtualLayoutRender.prototype.sortOrder = function (key, direction, cardData) {
        var isNumeric = true;
        if (this.parent.kanbanData.length > 0) {
            isNumeric = typeof (this.parent.kanbanData[0])[key] === 'number';
        }
        if (!isNumeric && this.parent.sortSettings.sortBy === 'Index') {
            return cardData;
        }
        var first;
        var second;
        cardData = cardData.sort(function (firstData, secondData) {
            if (!isNumeric) {
                first = firstData[key].toLowerCase();
                second = secondData[key].toLowerCase();
            }
            else {
                first = firstData[key];
                second = secondData[key];
            }
            return (first > second) ? 1 : ((second > first) ? -1 : 0);
        });
        if (direction === 'Descending') {
            cardData.reverse();
        }
        return cardData;
    };
    VirtualLayoutRender.prototype.documentClick = function (args) {
        if (args.target.classList.contains(SWIMLANE_OVERLAY_CLASS) &&
            this.parent.element.querySelector('.' + SWIMLANE_RESOURCE_CLASS).classList.contains('e-popup-open')) {
            this.treePopup.hide();
            removeClass([this.popupOverlay], 'e-enable');
        }
        if (closest(args.target, "." + ROOT_CLASS)) {
            return;
        }
        var cards = [].slice.call(this.parent.element.querySelectorAll("." + CARD_CLASS + "." + CARD_SELECTION_CLASS));
        removeClass(cards, CARD_SELECTION_CLASS);
        this.disableAttributeSelection(cards);
    };
    VirtualLayoutRender.prototype.disableAttributeSelection = function (cards) {
        if (cards instanceof Element) {
            cards.setAttribute('aria-selected', 'false');
        }
        else {
            cards.forEach(function (card) { card.setAttribute('aria-selected', 'false'); });
        }
    };
    VirtualLayoutRender.prototype.getColumnCards = function (data) {
        var _this = this;
        var columnData = {};
        this.columnKeys = [];
        this.parent.columns.forEach(function (column) {
            var isNumeric = typeof column.keyField === 'number';
            if (isNumeric) {
                _this.columnKeys = _this.columnKeys.concat(column.keyField.toString());
            }
            else {
                _this.columnKeys = _this.columnKeys.concat(column.keyField.split(',').map(function (e) { return e.trim(); }));
            }
            var cardData = _this.getColumnData(column.keyField, data);
            columnData[column.keyField] = cardData;
        });
        return columnData;
    };
    VirtualLayoutRender.prototype.refreshHeaders = function () {
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach(function (child) { return remove(child); });
        this.renderHeader(header);
    };
    VirtualLayoutRender.prototype.refreshCards = function () {
        this.parent.resetTemplates(['cardTemplate']);
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_VIRTUAL_WRAPPER_CLASS));
        cards.forEach(function (card) { return remove(card); });
        this.renderCards();
        this.wireDragEvent();
        this.parent.renderTemplates();
    };
    VirtualLayoutRender.prototype.refresh = function () {
        var _this = this;
        var isColumnTemplateRefreshed = false;
        this.parent.columns.forEach(function (column) {
            if (column.showItemCount) {
                if (column && column.template && !isColumnTemplateRefreshed) {
                    _this.refreshHeaders();
                    isColumnTemplateRefreshed = true;
                }
                var countSelector = "." + HEADER_CELLS_CLASS + "[data-key=\"" + column.keyField + "\"] ." + CARD_ITEM_COUNT_CLASS;
                var itemCount = _this.parent.element.querySelector(countSelector);
                if (itemCount) {
                    var columnDataLength = _this.parent.dataModule.isRemote() ? _this.parent.columnDataCount[column.keyField]
                        : _this.columnData[column.keyField].length;
                    var isNumeric = typeof column.keyField === 'number';
                    var cardLength = 0;
                    if (isNumeric) {
                        cardLength = ([].slice.call(_this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key="' + column.keyField + '"]'))).length;
                    }
                    else {
                        var keys = column.keyField.split(',');
                        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                            var key = keys_2[_i];
                            var cards = [].slice.call(_this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key="' + key.trim() + '"]'));
                            cardLength = cards.length + cardLength;
                        }
                    }
                    itemCount.innerHTML = '- ' + columnDataLength + ' ' + _this.parent.localeObj.getConstant('items');
                }
            }
        });
        this.refreshValidation();
    };
    VirtualLayoutRender.prototype.updateScrollPosition = function () {
        var _this = this;
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            if (!Browser.isIE) {
                content.scrollTo(this.parent.scrollPosition.content.left, this.parent.scrollPosition.content.top);
            }
            else {
                content.scrollTop = this.parent.scrollPosition.content.top;
                content.scrollLeft = this.parent.scrollPosition.content.left;
            }
        }
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach(function (wrapper) {
            if (wrapper.offsetParent) {
                var scrollData = _this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')];
                if (scrollData) {
                    if (!Browser.isIE) {
                        wrapper.scrollTo(scrollData.left, scrollData.top);
                    }
                    else {
                        wrapper.scrollTop = scrollData.top;
                        wrapper.scrollLeft = scrollData.left;
                    }
                }
            }
        });
    };
    VirtualLayoutRender.prototype.renderCardBasedOnIndex = function (data, index, isDropped, requestType) {
        var _this = this;
        var key = data[this.parent.keyField];
        var cardRow = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row)');
        if (this.parent.sortSettings.sortBy !== 'Index') {
            var field_1 = this.parent.cardSettings.headerField;
            if (this.parent.sortSettings.sortBy === 'Custom') {
                field_1 = this.parent.sortSettings.field;
            }
            if (isNullOrUndefined(this.parent.swimlaneSettings.keyField)) {
                index = this.getColumnData(key, this.parent.kanbanData).findIndex(function (colData) {
                    return colData[field_1] === data[field_1];
                });
            }
            else {
                var swimlaneDatas = this.parent.getSwimlaneData(data[this.parent.swimlaneSettings.keyField]);
                index = this.getColumnData(key, swimlaneDatas).findIndex(function (colData) { return colData[field_1] === data[field_1]; });
            }
        }
        else if (this.parent.sortSettings.sortBy === 'Index' &&
            this.parent.sortSettings.field && this.parent.sortSettings.direction === 'Ascending') {
            index = data[this.parent.sortSettings.field] - 1;
        }
        if (cardRow) {
            var td = [].slice.call(cardRow.children).filter(function (e) {
                return e.getAttribute('data-key').replace(/\s/g, '').split(',').indexOf(key.toString().replace(/\s/g, '')) !== -1;
            })[0];
            var cardWrapper_2 = td.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
            var emptyCard = cardWrapper_2.querySelector('.' + EMPTY_CARD_CLASS);
            if (emptyCard) {
                remove(emptyCard);
            }
            var cardElement_2 = this.renderCard(data);
            if (this.parent.allowDragAndDrop && td.classList.contains(DRAG_CLASS)) {
                this.parent.dragAndDropModule.wireDragEvents(cardElement_2);
                addClass([cardElement_2], DROPPABLE_CLASS);
            }
            var args = { data: data, element: cardElement_2, cancel: false };
            this.parent.trigger(cardRendered, args, function (cardArgs) {
                var addCardCondition = isDropped ? true : cardWrapper_2.childNodes.length
                    < _this.scrollStatus[key].singleIndexCardCount;
                if (!cardArgs.cancel && addCardCondition || !isNullOrUndefined(requestType)) {
                    if (isNullOrUndefined(index) || cardWrapper_2.children.length === 0) {
                        cardWrapper_2.appendChild(cardElement_2);
                    }
                    else {
                        cardWrapper_2.insertBefore(cardElement_2, cardWrapper_2.childNodes[index]);
                    }
                }
            });
        }
    };
    VirtualLayoutRender.prototype.removeCard = function (data) {
        var cardKey = data[this.parent.cardSettings.headerField];
        var cardElement = this.parent.element.querySelector("." + CARD_CLASS + "[data-id=\"" + cardKey + "\"]");
        if (cardElement) {
            this.isSelectedCard = cardElement.classList.contains(CARD_SELECTION_CLASS) ? true : false;
            var cardContainer = cardElement.parentElement;
            remove(cardElement);
            if (cardContainer.querySelectorAll('.' + CARD_CLASS + ':not(.' + CLONED_CARD_CLASS + ')').length === 0) {
                cardContainer.appendChild(this.renderEmptyCard());
            }
        }
    };
    VirtualLayoutRender.prototype.wireEvents = function () {
        var _this = this;
        EventHandler.add(this.parent.element, 'click', this.parent.actionModule.clickHandler, this.parent.actionModule);
        EventHandler.add(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler, this.parent.actionModule);
        EventHandler.add(document, Browser.touchStartEvent, this.documentClick, this);
        window.addEventListener('resize', this.winResize);
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        EventHandler.add(content, 'scroll', this.onContentScroll, this);
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach(function (wrapper) {
            if (_this.parent.isInitialRender && wrapper.offsetParent) {
                _this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')] = { left: 0, top: 0 };
            }
            EventHandler.add(wrapper, 'scroll', _this.onColScrollShowSkeleton, _this);
            EventHandler.add(wrapper, 'scroll', debounce(_this.onColumnScroll, 200), _this);
        });
        if (this.parent.isAdaptive) {
            this.parent.touchModule.wireTouchEvents();
            content.scrollLeft = this.scrollLeft;
        }
        this.wireDragEvent();
    };
    VirtualLayoutRender.prototype.unWireEvents = function () {
        var _this = this;
        EventHandler.remove(this.parent.element, 'click', this.parent.actionModule.clickHandler);
        EventHandler.remove(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler);
        EventHandler.remove(document, Browser.touchStartEvent, this.documentClick);
        window.removeEventListener('resize', this.winResize);
        this.winResize = null;
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            EventHandler.remove(content, 'scroll', this.onContentScroll);
            EventHandler.remove(content, 'scroll', this.onColScrollShowSkeleton);
            if (this.parent.allowDragAndDrop) {
                this.unWireDragEvent();
            }
        }
        var cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        if (cardWrapper.length > 0) {
            cardWrapper.forEach(function (wrapper) { EventHandler.remove(wrapper, 'scroll', debounce(_this.onColumnScroll, 200)); });
        }
        if (this.parent.isAdaptive) {
            this.parent.touchModule.unWireTouchEvents();
        }
    };
    VirtualLayoutRender.prototype.wireDragEvent = function () {
        var _this = this;
        if (this.parent.allowDragAndDrop) {
            var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
                + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
            addClass(cards, DROPPABLE_CLASS);
            if (cards.length > 0) {
                cards.forEach(function (card) { return _this.parent.dragAndDropModule.wireDragEvents(card); });
            }
        }
    };
    VirtualLayoutRender.prototype.unWireDragEvent = function () {
        var _this = this;
        var cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
            + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
        removeClass(cards, DROPPABLE_CLASS);
        if (cards.length > 0) {
            cards.forEach(function (card) { return _this.parent.dragAndDropModule.unWireDragEvents(card); });
        }
    };
    VirtualLayoutRender.prototype.destroy = function () {
        this.parent.resetTemplates();
        this.parent.off(dataReady, this.initRender);
        this.parent.off(contentReady, this.scrollUiUpdate);
        this.unWireEvents();
        var header = this.parent.element.querySelector('.' + HEADER_CLASS);
        if (header) {
            remove(header);
        }
        var content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            remove(content);
        }
        if (this.treeViewObj) {
            this.treeViewObj.destroy();
            this.treeViewObj = null;
        }
        if (this.treePopup) {
            this.treePopup.destroy();
            this.treePopup = null;
        }
        var swimlaneToolBarEle = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
        if (swimlaneToolBarEle) {
            remove(swimlaneToolBarEle);
        }
        var swimlaneContent = this.parent.element.querySelector('.' + SWIMLANE_CONTENT_CLASS);
        if (swimlaneContent) {
            remove(swimlaneContent);
        }
    };
    return VirtualLayoutRender;
}(MobileLayout));

var __extends$8 = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate$6 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * The Kanban board is an efficient way to visually depict various stages of a process using cards with transparent workflows.
 * The Kanban board has rich set of APIs, methods, and events used to enable or disable its features and customize them.
 * ```html
 * <div id="kanban"></div>
 * ```
 * ```typescript
 * <script>
 *   var kanbanObj = new Kanban();
 *   kanbanObj.appendTo("#kanban");
 * </script>
 * ```
 */
var Kanban = /** @class */ (function (_super) {
    __extends$8(Kanban, _super);
    /**
     * Constructor for creating the Kanban widget
     *
     * @param {KanbanModel} options Accepts the kanban properties to render the Kanban board.
     * @param {string | HTMLElement} element Accepts the DOM element reference as either selector or element to render the Kanban Board.
     */
    function Kanban(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.columnDataCount = {};
        _this.needsID = true;
        return _this;
    }
    /**
     * Initializes the values of private members.
     *
     * @returns {void}
     * @private
     */
    Kanban.prototype.preRender = function () {
        this.isAdaptive = Browser.isDevice;
        this.kanbanData = [];
        if (!this.enablePersistence || !this.swimlaneToggleArray) {
            this.swimlaneToggleArray = [];
        }
        this.activeCardData = { data: null, element: null };
        var defaultLocale = {
            items: 'items',
            min: 'Min',
            max: 'Max',
            cardsSelected: 'Cards Selected',
            addTitle: 'Add New Card',
            editTitle: 'Edit Card Details',
            deleteTitle: 'Delete Card',
            deleteContent: 'Are you sure you want to delete this card?',
            save: 'Save',
            delete: 'Delete',
            cancel: 'Cancel',
            yes: 'Yes',
            no: 'No',
            close: 'Close',
            noCard: 'No cards to display',
            unassigned: 'Unassigned',
            cards: 'Cards'
        };
        this.localeObj = new L10n(this.getModuleName(), defaultLocale, this.locale);
        this.scrollPosition = { content: { left: 0, top: 0 }, column: {} };
        this.isInitialRender = true;
    };
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} Returns the declared modules.
     * @private
     */
    Kanban.prototype.requiredModules = function () {
        var modules = [];
        return modules;
    };
    /**
     * Returns the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persistance state.
     * @private
     */
    Kanban.prototype.getPersistData = function () {
        if (this.dataSource.length > 0) {
            return this.addOnPersist(['columns', 'dataSource', 'swimlaneToggleArray']);
        }
        else {
            return this.addOnPersist(['columns', 'kanbanData', 'swimlaneToggleArray']);
        }
    };
    /**
     * Core method to return the module name.
     *
     * @returns {string} Returns the module name.
     * @private
     */
    Kanban.prototype.getModuleName = function () {
        return 'kanban';
    };
    /**
     * Core method that initializes the control rendering.
     *
     * @returns {void}
     * @private
     */
    Kanban.prototype.render = function () {
        var addClasses = [ROOT_CLASS];
        var removeClasses = [];
        if (this.enableRtl) {
            addClasses.push(RTL_CLASS);
        }
        else {
            removeClasses.push(RTL_CLASS);
        }
        if (this.isAdaptive) {
            addClasses.push(DEVICE_CLASS);
        }
        else {
            removeClasses.push(DEVICE_CLASS);
        }
        if (this.cssClass) {
            addClasses.push(this.cssClass);
        }
        classList(this.element, addClasses, removeClasses);
        this.element.style.width = formatUnit(this.width);
        this.element.style.height = formatUnit(this.height);
        this.element.setAttribute('role', 'application');
        this.element.setAttribute('aria-label', 'Kanban Board');
        createSpinner({ target: this.element });
        this.showSpinner();
        this.initializeModules();
    };
    /**
     * Called internally, if any of the property value changed.
     *
     * @param {KanbanModel} newProp Gets the updated values
     * @param {KanbanModel} oldProp Gets the previous values
     * @returns {void}
     * @private
     */
    Kanban.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([this.element], oldProp.cssClass);
                    }
                    if (newProp.cssClass) {
                        addClass([this.element], newProp.cssClass);
                    }
                    break;
                case 'enableRtl':
                case 'locale':
                    this.refresh();
                    break;
                case 'width':
                    this.element.style.width = formatUnit(newProp.width);
                    this.element.querySelector('.' + HEADER_CLASS).firstElementChild.style.width = 'auto';
                    this.notify(contentReady, {});
                    break;
                case 'height':
                    this.element.style.height = formatUnit(newProp.height);
                    this.element.querySelector('.' + CONTENT_CLASS).style.height = 'auto';
                    this.notify(contentReady, {});
                    break;
                case 'dataSource':
                case 'query':
                    if (this.dataModule) {
                        this.dataModule.setState({ isDataChanged: false });
                    }
                    this.dataModule = new Data(this);
                    break;
                case 'columns':
                case 'constraintType':
                    this.notify(dataReady, { processedData: this.kanbanData });
                    break;
                case 'swimlaneSettings':
                    this.onSwimlaneSettingsPropertyChanged(newProp.swimlaneSettings, oldProp.swimlaneSettings);
                    break;
                case 'cardSettings':
                    this.onCardSettingsPropertyChanged(newProp.cardSettings, oldProp.cardSettings);
                    break;
                case 'allowDragAndDrop':
                    if (newProp.allowDragAndDrop) {
                        if (this.enableVirtualization) {
                            this.virtualLayoutModule.wireDragEvent();
                        }
                        else {
                            this.layoutModule.wireDragEvent();
                        }
                    }
                    else {
                        if (this.enableVirtualization) {
                            this.virtualLayoutModule.unWireDragEvent();
                        }
                        else {
                            this.layoutModule.unWireDragEvent();
                        }
                    }
                    break;
                case 'enableTooltip':
                    if (this.tooltipModule) {
                        this.tooltipModule.destroy();
                        this.tooltipModule = null;
                    }
                    if (newProp.enableTooltip) {
                        this.tooltipModule = new KanbanTooltip(this);
                        if (this.enableVirtualization) {
                            this.virtualLayoutModule.refreshCards();
                        }
                        else {
                            this.layoutModule.refreshCards();
                        }
                    }
                    break;
                case 'dialogSettings':
                    if (newProp.dialogSettings) {
                        this.dialogModule = new KanbanDialog(this);
                    }
                    break;
                case 'allowKeyboard':
                    if (this.keyboardModule) {
                        this.keyboardModule.destroy();
                        this.keyboardModule = null;
                    }
                    if (newProp.allowKeyboard) {
                        this.keyboardModule = new Keyboard(this);
                    }
                    break;
                case 'stackedHeaders':
                    if (this.enableVirtualization) {
                        this.virtualLayoutModule.refreshHeaders();
                    }
                    else {
                        this.layoutModule.refreshHeaders();
                    }
                    break;
                case 'sortSettings':
                    this.notify(dataReady, { processedData: this.kanbanData });
                    break;
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Kanban.prototype.onSwimlaneSettingsPropertyChanged = function (newProp, _oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'keyField':
                case 'textField':
                case 'showEmptyRow':
                case 'showItemCount':
                case 'template':
                case 'sortDirection':
                    this.notify(dataReady, { processedData: this.kanbanData });
                    break;
                case 'enableFrozenRows':
                    if (this.layoutModule.frozenSwimlaneRow && !this.swimlaneSettings.enableFrozenRows) {
                        this.layoutModule.removeFrozenRows();
                    }
                    break;
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Kanban.prototype.onCardSettingsPropertyChanged = function (newProp, _oldProp) {
        var cards = [];
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'showHeader':
                case 'headerField':
                case 'contentField':
                case 'template':
                case 'tagsField':
                case 'grabberField':
                case 'footerCssField':
                    if (this.enableVirtualization) {
                        this.virtualLayoutModule.refreshCards();
                    }
                    else {
                        this.layoutModule.refreshCards();
                    }
                    break;
                case 'selectionType':
                    cards = this.getSelectedCards();
                    if (cards.length > 0) {
                        removeClass(cards, CARD_SELECTION_CLASS);
                        if (this.enableVirtualization) {
                            this.virtualLayoutModule.disableAttributeSelection(cards);
                        }
                        else {
                            this.layoutModule.disableAttributeSelection(cards);
                        }
                    }
                    break;
            }
        }
    };
    Kanban.prototype.initializeModules = function () {
        this.dataModule = new Data(this);
        if (this.enableVirtualization) {
            this.virtualLayoutModule = new VirtualLayoutRender(this);
        }
        else {
            this.layoutModule = new LayoutRender(this);
        }
        if (this.allowKeyboard) {
            this.keyboardModule = new Keyboard(this);
        }
        this.actionModule = new Action(this);
        this.crudModule = new Crud(this);
        this.dragAndDropModule = new DragAndDrop(this);
        this.dialogModule = new KanbanDialog(this);
        if (this.enableTooltip) {
            this.tooltipModule = new KanbanTooltip(this);
        }
        if (Browser.isDevice || Browser.isTouch) {
            this.touchModule = new KanbanTouch(this);
        }
    };
    Kanban.prototype.renderTemplates = function () {
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    Kanban.prototype.resetTemplates = function (templates) {
        if (this.isReact) {
            this.clearTemplate(templates);
        }
    };
    Kanban.prototype.destroyModules = function () {
        if (this.layoutModule) {
            this.layoutModule.destroy();
            this.layoutModule = null;
        }
        if (this.keyboardModule) {
            this.keyboardModule.destroy();
            this.keyboardModule = null;
        }
        if (this.virtualLayoutModule) {
            this.virtualLayoutModule.destroy();
            this.virtualLayoutModule = null;
        }
        if (this.touchModule) {
            this.touchModule.destroy();
            this.touchModule = null;
        }
        if (this.tooltipModule) {
            this.tooltipModule.destroy();
            this.tooltipModule = null;
        }
        this.dialogModule = null;
        this.actionModule = null;
        this.crudModule = null;
        this.dataModule = null;
        this.dragAndDropModule = null;
    };
    Kanban.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template === 'function') {
                    return compile(template);
                }
                else if (document.querySelectorAll(template).length) {
                    return compile(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return compile(template);
            }
        }
        return undefined;
    };
    /**
     * Returns the card details based on card ID from the board.
     *
     * @function getCardDetails
     * @param {Element} target Accepts the card element to get the details.
     * @returns {Object} Returns the card details based on given target.
     */
    Kanban.prototype.getCardDetails = function (target) {
        var _this = this;
        var isNumeric = typeof (this.kanbanData[0])[this.cardSettings.headerField] === 'number';
        var targetId = isNumeric ? parseInt(target.getAttribute('data-id'), 10) : target.getAttribute('data-id');
        var cardObj = this.kanbanData.filter(function (data) {
            return data[_this.cardSettings.headerField] === targetId;
        })[0];
        return cardObj;
    };
    /**
     * Returns the column data based on column key input.
     *
     * @function getColumnData
     * @param {string | number} columnKey Accepts the column key to get the objects.
     * @param {Object[]} dataSource Accepts the collection of objects to get the results based on given columnKey.
     * @returns {Object[]} Returns the collection of card objects based on given inputs.
     */
    Kanban.prototype.getColumnData = function (columnKey, dataSource) {
        if (this.enableVirtualization) {
            return this.virtualLayoutModule.getColumnCards(dataSource)["" + columnKey] || [];
        }
        return this.layoutModule.getColumnCards(dataSource)["" + columnKey] || [];
    };
    /**
     * Returns the swimlane column data based on swimlane keyField input.
     *
     * @function getSwimlaneData
     * @param {string} keyField Accepts the swimlane keyField to get the objects.
     * @returns {Object[]} Returns the collection of card objects based on given inputs.
     */
    Kanban.prototype.getSwimlaneData = function (keyField) {
        return this.layoutModule.getSwimlaneCards()["" + keyField] || [];
    };
    /**
     * Gets the list of selected cards from the board.
     *
     * @function getSelectedCards
     * @returns {HTMLElement[]} Returns the card elements based on selection.
     */
    Kanban.prototype.getSelectedCards = function () {
        return [].slice.call(this.element.querySelectorAll('.' + CARD_CLASS + '.' + CARD_SELECTION_CLASS));
    };
    /**
     * Allows you to show the spinner on Kanban at the required scenarios.
     *
     * @function showSpinner
     * @returns {void}
     */
    Kanban.prototype.showSpinner = function () {
        showSpinner(this.element);
    };
    /**
     * When the spinner is shown manually using the showSpinner method, it can be hidden using this `hideSpinner` method.
     *
     * @function hideSpinner
     * @returns {void}
     */
    Kanban.prototype.hideSpinner = function () {
        hideSpinner(this.element);
    };
    /**
     * To manually open the dialog.
     *
     * @function openDialog
     * @param {CurrentAction} action Accepts the action for which the dialog needs to be opened such as either for new card creation or
     *  editing of existing cards. The applicable action names are `Add` and `Edit`.
     * @param {Object} data It can be card data.
     * @returns {void}
     */
    Kanban.prototype.openDialog = function (action, data) {
        this.dialogModule.openDialog(action, data);
    };
    /**
     * To manually close the dialog.
     *
     * @function closeDialog
     * @returns {void}
     */
    Kanban.prototype.closeDialog = function () {
        this.dialogModule.closeDialog();
    };
    /**
     * Adds the new card to the data source of Kanban and layout.
     *
     * @function addCard
     * @param {Object | Object[]} cardData Accepts Single card object or Collection of card objects to be added into Kanban.
     * @param {number} index Accepts the index to insert the card in column.
     * @returns {void}
     */
    Kanban.prototype.addCard = function (cardData, index) {
        this.crudModule.addCard(cardData, index);
    };
    /**
     * Updates the changes made in the card object by passing it as a parameter to the data source.
     *
     * @function updateCard
     * @param {Object | Object[]} cardData Accepts Single card object or Collection of card objects to be updated into Kanban.
     * @param {number} index Accepts the index to update the card in column.
     * @returns {void}
     */
    Kanban.prototype.updateCard = function (cardData, index) {
        this.crudModule.updateCard(cardData, index);
    };
    /**
     * Deletes the card based on the provided ID or card collection in the argument list.
     *
     * @function deleteCard
     * @param {string | number | Object | Object[]} cardData Accepts the ID of the remove card in string or number type or
     * Single card object or Collection of card objects to be removed from Kanban
     * @returns {void}
     */
    Kanban.prototype.deleteCard = function (cardData) {
        this.crudModule.deleteCard(cardData);
    };
    /**
     * Add the column to Kanban board dynamically based on the provided column options and index in the argument list.
     *
     * @function addColumn
     * @param {ColumnsModel} columnOptions Accepts the properties to new column that are going to be added in the board.
     * @param {number} index Accepts the index of column to add the new column.
     * @returns {void}
     */
    Kanban.prototype.addColumn = function (columnOptions, index) {
        this.actionModule.addColumn(columnOptions, index);
    };
    /**
     * Deletes the column based on the provided index value.
     *
     * @function deleteColumn
     * @param {number} index Accepts the index of column to delete the existing column from Kanban board.
     * @returns {void}
     */
    Kanban.prototype.deleteColumn = function (index) {
        this.actionModule.deleteColumn(index);
    };
    /**
     * Shows the column from hidden based on the provided key in the columns.
     *
     * @function showColumn
     * @param {string | number} key Accepts the hidden column key name to be shown from the hidden state in board.
     * @returns {void}
     */
    Kanban.prototype.showColumn = function (key) {
        this.actionModule.showColumn(key);
    };
    /**
     * Hides the column from Kanban board based on the provided key in the columns.
     *
     * @function hideColumn
     * @param {string | number} key Accepts the visible column key name to be hidden from the board.
     * @returns {void}
     */
    Kanban.prototype.hideColumn = function (key) {
        this.actionModule.hideColumn(key);
    };
    /**
     * Method to refresh the Kanban UI based on modified records.
     *
     * @function refreshUI
     * @param {ActionEventArgs} args Accepts the added, changed or deleted data.
     * @param {number} index Accepts the index of the changed items.
     * @returns {void}
     */
    Kanban.prototype.refreshUI = function (args, index) {
        index = index ? index : 0;
        this.dataModule.refreshUI(args, index);
    };
    /**
     * Method to refresh the column header.
     *
     * @method refreshHeader
     * @returns {void}
     */
    Kanban.prototype.refreshHeader = function () {
        this.resetTemplates(['columnTemplate']);
        if (this.enableVirtualization) {
            this.virtualLayoutModule.refreshHeaders();
        }
        else {
            this.layoutModule.refreshHeaders();
        }
        this.renderTemplates();
    };
    /**
     * Removes the control from the DOM and detaches all its related event handlers. Also, it removes the attributes and classes.
     *
     * @function destroy
     * @returns {void}
     */
    Kanban.prototype.destroy = function () {
        this.destroyModules();
        [].slice.call(this.element.childNodes).forEach(function (node) { detach(node); });
        var removeClasses = [ROOT_CLASS];
        if (this.cssClass) {
            removeClasses = removeClasses.concat(this.cssClass.split(' '));
        }
        removeClass([this.element], removeClasses);
        _super.prototype.destroy.call(this);
    };
    __decorate$6([
        Property()
    ], Kanban.prototype, "cssClass", void 0);
    __decorate$6([
        Property('auto')
    ], Kanban.prototype, "width", void 0);
    __decorate$6([
        Property('auto')
    ], Kanban.prototype, "height", void 0);
    __decorate$6([
        Property('auto')
    ], Kanban.prototype, "cardHeight", void 0);
    __decorate$6([
        Property()
    ], Kanban.prototype, "enableVirtualization", void 0);
    __decorate$6([
        Property([])
    ], Kanban.prototype, "dataSource", void 0);
    __decorate$6([
        Property()
    ], Kanban.prototype, "query", void 0);
    __decorate$6([
        Property()
    ], Kanban.prototype, "keyField", void 0);
    __decorate$6([
        Property('Column')
    ], Kanban.prototype, "constraintType", void 0);
    __decorate$6([
        Property([])
    ], Kanban.prototype, "externalDropId", void 0);
    __decorate$6([
        Collection([], Columns)
    ], Kanban.prototype, "columns", void 0);
    __decorate$6([
        Property(true)
    ], Kanban.prototype, "allowKeyboard", void 0);
    __decorate$6([
        Property(true)
    ], Kanban.prototype, "enableHtmlSanitizer", void 0);
    __decorate$6([
        Collection([], StackedHeaders)
    ], Kanban.prototype, "stackedHeaders", void 0);
    __decorate$6([
        Complex({}, SwimlaneSettings)
    ], Kanban.prototype, "swimlaneSettings", void 0);
    __decorate$6([
        Complex({}, CardSettings)
    ], Kanban.prototype, "cardSettings", void 0);
    __decorate$6([
        Complex({}, SortSettings)
    ], Kanban.prototype, "sortSettings", void 0);
    __decorate$6([
        Complex({}, DialogSettings)
    ], Kanban.prototype, "dialogSettings", void 0);
    __decorate$6([
        Property(true)
    ], Kanban.prototype, "allowDragAndDrop", void 0);
    __decorate$6([
        Property(false)
    ], Kanban.prototype, "enableTooltip", void 0);
    __decorate$6([
        Property(false)
    ], Kanban.prototype, "showEmptyColumn", void 0);
    __decorate$6([
        Property(false)
    ], Kanban.prototype, "enablePersistence", void 0);
    __decorate$6([
        Property()
    ], Kanban.prototype, "tooltipTemplate", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "actionBegin", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "actionComplete", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "actionFailure", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "created", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dataBinding", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dataBound", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "cardClick", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "cardDoubleClick", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "queryCellInfo", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "cardRendered", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dragStart", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "drag", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dragStop", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dialogOpen", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dialogClose", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dataStateChange", void 0);
    __decorate$6([
        Event()
    ], Kanban.prototype, "dataSourceChanged", void 0);
    Kanban = __decorate$6([
        NotifyPropertyChanges
    ], Kanban);
    return Kanban;
}(Component));

export { Kanban, actionBegin, actionComplete, actionFailure, bottomSpace, cardClick, cardDoubleClick, cardRendered, cardSpace, contentReady, dataBinding, dataBound, dataReady, dataSourceChanged, dataStateChange, dialogClose, dialogOpen, documentClick, drag, dragStart, dragStop, queryCellInfo, toggleWidth };
//# sourceMappingURL=ej2-kanban.es5.js.map
