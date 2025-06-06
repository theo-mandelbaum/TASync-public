import { formatUnit, isNullOrUndefined, extend, Property, ChildProperty, closest, classList, removeClass, addClass, remove, createElement, createInstance, detach, Draggable, EventHandler, append, SanitizeHtmlHelper, KeyboardEvents, initializeCSPTemplate, Touch, setStyleAttribute, Browser, debounce, Component, L10n, compile, Collection, Complex, Event, NotifyPropertyChanges } from '@syncfusion/ej2-base';
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
const actionBegin = 'actionBegin';
/** @private */
const actionComplete = 'actionComplete';
/** @private */
const actionFailure = 'actionFailure';
/** @private */
const cardClick = 'cardClick';
/** @private */
const cardDoubleClick = 'cardDoubleClick';
/** @private */
const cardRendered = 'cardRendered';
/** @private */
const queryCellInfo = 'queryCellInfo';
/** @private */
const dataBinding = 'dataBinding';
/** @private */
const dataBound = 'dataBound';
/** @private */
const dragStart = 'dragStart';
/** @private */
const drag = 'drag';
/** @private */
const dragStop = 'dragStop';
/** @private */
const documentClick = 'document-click';
/** @private */
const dialogOpen = 'dialogOpen';
/** @private */
const dialogClose = 'dialogClose';
// Constants for internal events
/** @private */
const contentReady = 'content-ready';
/** @private */
const dataReady = 'data-ready';
/** @private */
const bottomSpace = 25;
/** @private */
const cardSpace = 16;
/** @private */
const toggleWidth = 50;
/** @hidden */
const dataSourceChanged = 'dataSourceChanged';
/** @hidden */
const dataStateChange = 'dataStateChange';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Kanban data module
 */
class Data {
    /**
     * Constructor for data module
     *
     * @param {Kanban} parent Accepts the instance of the Kanban
     */
    constructor(parent) {
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
    initDataManager(dataSource, query) {
        this.dataManager = dataSource instanceof DataManager ? dataSource : new DataManager(dataSource);
        this.query = query instanceof Query ? query : new Query();
        this.kanbanData = new DataManager(this.parent.kanbanData);
    }
    /**
     * @returns {boolean} returns whether its remote data
     * @hidden
     */
    isRemote() {
        return this.dataManager.dataSource.offline !== true && this.dataManager.dataSource.url !== undefined &&
            this.dataManager.dataSource.url !== '';
    }
    /**
     * @returns {boolean} returns the column key fields
     * @hidden
     */
    columnKeyFields() {
        const columns = [];
        for (const column of this.parent.columns) {
            if (column.keyField.toString().split(',').length > 1) {
                for (const innerColumns of column.keyField.toString().split(',')) {
                    columns.push(innerColumns.trim());
                }
            }
            else {
                columns.push(column.keyField.toString());
            }
        }
        return columns;
    }
    /**
     * The function used to generate updated Query from schedule model
     *
     * @param {string} parameter Accepts the parameter that needs to be sent to the service end.
     * @returns {void}
     * @private
     */
    getQuery(parameter) {
        const query = this.query.clone();
        if (this.isRemote() && this.parent.enableVirtualization) {
            const cardHeight = this.parent.cardHeight === 'auto' ? 100 :
                parseInt(formatUnit(this.parent.cardHeight).split('px')[0], 10);
            const take = this.parent.height === 'auto' ? (Math.ceil(window.innerHeight / cardHeight) * 2) :
                (Math.ceil(parseInt(formatUnit(this.parent.height).split('px')[0], 10) / cardHeight) * 2);
            const columns = this.columnKeyFields();
            for (let i = 0; i < columns.length; i++) {
                query.where(this.parent.keyField, 'equal', columns[i]);
            }
            query.take(take);
            if (isNullOrUndefined(parameter)) {
                parameter = 'KanbanVirtualization';
            }
            query.addParams('KanbanVirtualization', parameter);
        }
        return query;
    }
    /**
     * The function used to get dataSource by executing given Query
     *
     * @param  {Query} query - A Query that specifies to generate dataSource
     * @returns {void}
     * @private
     */
    getData(query) {
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            const def = this.eventPromise({ requestType: '' }, query);
            this.isObservable = true;
            return def.promise;
        }
        return this.dataManager.executeQuery(query);
    }
    setState(state) {
        return this.dataState = state;
    }
    getStateEventArgument(query) {
        const adaptr = new UrlAdaptor();
        const dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
        const state = adaptr.processQuery(dm, query);
        const data = JSON.parse(state.data);
        return extend(data, state.pvtData);
    }
    eventPromise(args, query, index) {
        const dataArgs = args;
        const state = this.getStateEventArgument(query);
        const def = new Deferred();
        const deff = new Deferred();
        if (args.requestType !== undefined && this.dataState.isDataChanged !== false) {
            state.action = args;
            if (args.requestType === 'cardChanged' || args.requestType === 'cardRemoved' || args.requestType === 'cardCreated') {
                const editArgs = args;
                editArgs.promise = deff.promise;
                editArgs.state = state;
                editArgs.index = index;
                this.setState({ isPending: true, resolver: deff.resolve });
                dataArgs.endEdit = deff.resolve;
                dataArgs.cancelEdit = deff.reject;
                this.parent.trigger(dataSourceChanged, editArgs);
                deff.promise.then(() => {
                    this.setState({ isPending: true, resolver: def.resolve });
                    this.parent.trigger(dataStateChange, state);
                    editArgs.addedRecords.forEach((data) => {
                        this.parent.kanbanData.push(data);
                    });
                    editArgs.changedRecords.forEach((changedRecord) => {
                        const cardObj = this.parent.kanbanData.filter((data) => data[this.parent.cardSettings.headerField] ===
                            changedRecord[this.parent.cardSettings.headerField])[0];
                        extend(cardObj, changedRecord);
                    });
                    editArgs.deletedRecords.forEach((deletedRecord) => {
                        const index = this.parent.kanbanData.findIndex((data) => data[this.parent.cardSettings.headerField] === deletedRecord[this.parent.cardSettings.headerField]);
                        this.parent.kanbanData.splice(index, 1);
                    });
                }).catch(() => { this.parent.hideSpinner(); });
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
    }
    /**
     * The function used to get the table name from the given Query
     *
     * @returns {string} Returns the table name.
     * @private
     */
    getTable() {
        if (this.parent.query) {
            const query = this.getQuery();
            return query.fromTable;
        }
        else {
            return null;
        }
    }
    /**
     * The function is used to send the request and get response from datamanager
     *
     * @returns {void}
     * @private
     */
    refreshDataManager() {
        const dataManager = this.getData(this.getQuery());
        dataManager.then((e) => this.dataManagerSuccess(e)).catch((e) => this.dataManagerFailure(e));
    }
    /**
     * The function is used to handle the success response from dataManager
     *
     * @param {ReturnType} e Accepts the dataManager success result
     * @param type
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line
    dataManagerSuccess(e, type, offlineArgs, index) {
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
            this.parent.trigger(dataBinding, e, (args) => {
                this.updateKanbanData(args);
                this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
                this.parent.trigger(dataBound, null, () => this.parent.hideSpinner());
            });
        }
        if (this.initload) {
            this.parent.layoutModule.refresh();
            this.parent.renderTemplates();
        }
        this.initload = true;
    }
    /**
     * The function is used to handle the update the column data count for remote, and update kanbanData while perform the CRUD action
     *
     * @param {ReturnType} args Accepts the dataManager success result
     * @returns {void}
     * @private
     */
    updateKanbanData(args) {
        const resultData = extend([], !isNullOrUndefined(args.result.result) ?
            args.result.result : args.result, null, true);
        if (this.isRemote() && this.parent.enableVirtualization && resultData.length > 0
            && !isNullOrUndefined(args.result.count)) {
            const columnsKeyFields = this.columnKeyFields();
            for (let i = 0; i < columnsKeyFields.length; i++) {
                if (args.result.count[i].Key === columnsKeyFields[i]) {
                    this.parent.columnDataCount[columnsKeyFields[i]] = args.result.count[i].Value;
                }
            }
        }
        this.parent.kanbanData = resultData;
        this.kanbanData = new DataManager(this.parent.kanbanData);
    }
    /**
     * The function is used to handle the failure response from dataManager
     *
     * @param {ReturnType} e Accepts the dataManager failure result
     * @returns {void}
     * @private
     */
    dataManagerFailure(e) {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.trigger(actionFailure, { error: e }, () => this.parent.hideSpinner());
    }
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
    updateDataManager(updateType, params, type, data, index, isDropped, dataDropIndexKeyFieldValue, draggedKey, droppedKey, isMultipleDrag) {
        this.parent.showSpinner();
        let promise;
        const actionArgs = {
            requestType: type, cancel: false, addedRecords: params.addedRecords,
            changedRecords: params.changedRecords, deletedRecords: params.deletedRecords
        };
        this.setState({ isDataChanged: true });
        this.eventPromise(actionArgs, this.query, index);
        this.parent.trigger(actionComplete, actionArgs, (offlineArgs) => {
            if (!offlineArgs.cancel) {
                promise = this.syncDataSource(this.dataManager, updateType, params, data, isDropped, dataDropIndexKeyFieldValue);
                if (this.dataManager.dataSource.offline) {
                    if (!this.isObservable) {
                        this.syncDataSource(this.kanbanData, updateType, params, data, isDropped, dataDropIndexKeyFieldValue);
                        index = draggedKey === droppedKey && isMultipleDrag ? index - 1 : index;
                        this.refreshUI(offlineArgs, index, isDropped);
                        if (this.parent.enableVirtualization) {
                            this.parent.virtualLayoutModule.refreshColumnData(draggedKey, droppedKey, offlineArgs.requestType, data[this.parent.keyField]);
                        }
                    }
                }
                else {
                    promise.then((args) => {
                        if (this.parent.isDestroyed) {
                            return;
                        }
                        const dataManager = this.getData(this.getQuery());
                        dataManager.then((e) => this.dataManagerSuccess(e, 'DataSourceChange', offlineArgs, index)).catch((e) => this.dataManagerFailure(e));
                        if (offlineArgs.requestType === 'cardCreated') {
                            if (!Array.isArray(args)) {
                                offlineArgs.addedRecords[0] = extend(offlineArgs.addedRecords[0], args);
                            }
                            else {
                                this.modifyArrayData(offlineArgs.addedRecords, args);
                            }
                        }
                        else if (offlineArgs.requestType === 'cardChanged') {
                            if (!Array.isArray(args)) {
                                offlineArgs.changedRecords[0] = extend(offlineArgs.changedRecords[0], args);
                            }
                            else {
                                this.modifyArrayData(offlineArgs.changedRecords, args);
                            }
                        }
                        else if (offlineArgs.requestType === 'cardRemoved') {
                            if (!Array.isArray(args)) {
                                offlineArgs.deletedRecords[0] = extend(offlineArgs.deletedRecords[0], args);
                            }
                            else {
                                this.modifyArrayData(offlineArgs.deletedRecords, args);
                            }
                        }
                        index = draggedKey === droppedKey && isMultipleDrag ? index - 1 : index;
                        this.refreshUI(offlineArgs, index, isDropped);
                        if (this.parent.enableVirtualization) {
                            this.parent.virtualLayoutModule.refreshColumnData(draggedKey, droppedKey, offlineArgs.requestType, data[this.parent.keyField]);
                        }
                    }).catch((e) => {
                        this.dataManagerFailure(e);
                    });
                }
            }
        });
    }
    syncDataSource(dataManager, updateType, params, data, isDropped, dataDropIndexKeyFieldValue) {
        let promise;
        switch (updateType) {
            case 'insert':
                return dataManager.insert(data, this.getTable(), this.getQuery());
            case 'update':
                if (this.parent.enableVirtualization && !this.parent.dataModule.isRemote() && isDropped) {
                    promise = dataManager.remove(this.keyField, data, this.getTable(), this.getQuery());
                    promise = dataManager.insert(data, this.getTable(), this.getQuery(), dataManager.dataSource.json.findIndex((data) => data[this.parent.cardSettings.headerField] === dataDropIndexKeyFieldValue));
                    return promise;
                }
                else {
                    return dataManager.update(this.keyField, data, this.getTable(), this.getQuery());
                }
            case 'delete':
                return dataManager.remove(this.keyField, data, this.getTable(), this.getQuery());
            case 'batch':
                if (!this.parent.dataModule.isRemote() && isDropped && this.parent.enableVirtualization && data) {
                    for (let i = 0; i < data.length; i++) {
                        promise = dataManager.remove(this.keyField, data[i], this.getTable(), this.getQuery());
                    }
                    let currentIndex = dataManager.dataSource.json.findIndex((data) => data[this.parent.cardSettings.headerField] === dataDropIndexKeyFieldValue);
                    for (let i = 0; i < data.length; i++, currentIndex++) {
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
    }
    modifyArrayData(onLineData, e) {
        if (onLineData.length === e.length) {
            for (let i = 0; i < e.length; i++) {
                onLineData[i] = extend(onLineData[i], e[i]);
            }
        }
        return onLineData;
    }
    /**
     * The function is used to refresh the UI once the data manager action is completed
     *
     * @param {ActionEventArgs} args Accepts the ActionEventArgs to refresh UI.
     * @param {number} position Accepts the index to refresh UI.
     * @param {boolean} isDropped Accepts the boolean value based on based if it is dragged and dropped
     * @returns {void}
     */
    refreshUI(args, position, isDropped) {
        if (this.parent.enableVirtualization) {
            this.parent.virtualLayoutModule.columnData = this.parent.virtualLayoutModule.getColumnCards();
            args.addedRecords.forEach((data, index) => {
                this.parent.virtualLayoutModule.renderCardBasedOnIndex(data, position + index, isDropped, args.requestType);
            });
            args.changedRecords.forEach((data) => {
                this.parent.virtualLayoutModule.removeCard(data);
                this.parent.virtualLayoutModule.renderCardBasedOnIndex(data, position, isDropped, args.requestType);
                if (this.parent.virtualLayoutModule.isSelectedCard) {
                    this.parent.actionModule.SingleCardSelection(data);
                }
                if (this.parent.sortSettings.field && this.parent.sortSettings.sortBy === 'Index'
                    && this.parent.sortSettings.direction === 'Descending' && position > 0) {
                    --position;
                }
                else {
                    position++;
                }
            });
            args.deletedRecords.forEach((data) => {
                this.parent.virtualLayoutModule.removeCard(data);
            });
            this.parent.virtualLayoutModule.refresh();
        }
        else {
            this.parent.layoutModule.columnData = this.parent.layoutModule.getColumnCards();
            if (this.parent.swimlaneSettings.keyField) {
                this.parent.layoutModule.kanbanRows = this.parent.layoutModule.getRows();
                this.parent.layoutModule.swimlaneData = this.parent.layoutModule.getSwimlaneCards();
            }
            args.addedRecords.forEach((data, index) => {
                if (this.parent.swimlaneSettings.keyField && !data[this.parent.swimlaneSettings.keyField]) {
                    data[this.parent.swimlaneSettings.keyField] = '';
                }
                this.parent.layoutModule.renderCardBasedOnIndex(data, position + index);
            });
            args.changedRecords.forEach((data) => {
                if (this.parent.swimlaneSettings.keyField && !data[this.parent.swimlaneSettings.keyField]) {
                    data[this.parent.swimlaneSettings.keyField] = '';
                }
                this.parent.layoutModule.removeCard(data);
                this.parent.layoutModule.renderCardBasedOnIndex(data, position);
                if (this.parent.layoutModule.isSelectedCard) {
                    this.parent.actionModule.SingleCardSelection(data);
                }
                if (this.parent.sortSettings.field && this.parent.sortSettings.sortBy === 'Index'
                    && this.parent.sortSettings.direction === 'Descending' && position > 0) {
                    --position;
                }
                else {
                    position++;
                }
            });
            args.deletedRecords.forEach((data) => {
                this.parent.layoutModule.removeCard(data);
            });
            this.parent.layoutModule.refresh();
        }
        this.parent.renderTemplates();
        this.parent.notify(contentReady, {});
        this.parent.trigger(dataBound, args, () => this.parent.hideSpinner());
    }
}

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of swimlane settings in kanban board.
 */
class SwimlaneSettings extends ChildProperty {
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

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of card settings in kanban board.
 */
class CardSettings extends ChildProperty {
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

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of editor settings.
 */
class DialogSettings extends ChildProperty {
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

var __decorate$3 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of columns in kanban board.
 */
class Columns extends ChildProperty {
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

var __decorate$4 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of stacked header settings in kanban board.
 */
class StackedHeaders extends ChildProperty {
}
__decorate$4([
    Property()
], StackedHeaders.prototype, "text", void 0);
__decorate$4([
    Property()
], StackedHeaders.prototype, "keyFields", void 0);

var __decorate$5 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Holds the configuration of sort settings in kanban board.
 */
class SortSettings extends ChildProperty {
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

/**
 * Kanban CSS Constants
 */
/** @private */
const ROOT_CLASS = 'e-kanban';
/** @private */
const RTL_CLASS = 'e-rtl';
/** @private */
const DEVICE_CLASS = 'e-device';
/** @private */
const ICON_CLASS = 'e-icons';
/** @private */
const TEMPLATE_CLASS = 'e-template';
/** @private */
const SWIMLANE_CLASS = 'e-swimlane';
/** @private */
const TABLE_CLASS = 'e-kanban-table';
/** @private */
const HEADER_CLASS = 'e-kanban-header';
/** @private */
const HEADER_TABLE_CLASS = 'e-header-table';
/** @private */
const HEADER_CELLS_CLASS = 'e-header-cells';
/** @private */
const HEADER_WRAP_CLASS = 'e-header-wrap';
/** @private */
const HEADER_TITLE_CLASS = 'e-header-title';
/** @private */
const HEADER_TEXT_CLASS = 'e-header-text';
/** @private */
const HEADER_ICON_CLASS = 'e-header-icon';
/** @private */
const STACKED_HEADER_ROW_CLASS = 'e-stacked-header-row';
/** @private */
const STACKED_HEADER_CELL_CLASS = 'e-stacked-header-cell';
/** @private */
const CONTENT_CELLS_CLASS = 'e-content-cells';
/** @private */
const CONTENT_CLASS = 'e-kanban-content';
/** @private */
const CONTENT_TABLE_CLASS = 'e-content-table';
/** @private */
const HEADER_ROW_TOGGLE_CLASS = 'e-toggle-header';
/** @private */
const HEADER_ROW_CLASS = 'e-header-row';
/** @private */
const CONTENT_ROW_CLASS = 'e-content-row';
/** @private */
const SWIMLANE_ROW_CLASS = 'e-swimlane-row';
/** @private */
const SWIMLANE_ROW_EXPAND_CLASS = 'e-swimlane-row-expand';
/** @private */
const SWIMLANE_ROW_COLLAPSE_CLASS = 'e-swimlane-row-collapse';
/** @private */
const SWIMLANE_ROW_TEXT_CLASS = 'e-swimlane-text';
/** @private */
const CARD_ITEM_COUNT_CLASS = 'e-item-count';
/** @private */
const CARD_WRAPPER_CLASS = 'e-card-wrapper';
/** @private */
const CARD_VIRTUAL_WRAPPER_CLASS = 'e-card-virtual-wrapper';
/** @private */
const CARD_CLASS = 'e-card';
/** @private */
const DROPPABLE_CLASS = 'e-droppable';
/** @private */
const DRAG_CLASS = 'e-drag';
/** @private */
const DROP_CLASS = 'e-drop';
/** @private */
const DISABLED_CLASS = 'e-disabled';
/** @private */
const CARD_HEADER_CLASS = 'e-card-header';
/** @private */
const CARD_CONTENT_CLASS = 'e-card-content';
/** @private */
const CARD_HEADER_TEXT_CLASS = 'e-card-header-caption';
/** @private */
const CARD_HEADER_TITLE_CLASS = 'e-card-header-title';
/** @private */
const CARD_TAGS_CLASS = 'e-card-tags';
/** @private */
const CARD_TAG_CLASS = 'e-card-tag';
/** @private */
const CARD_COLOR_CLASS = 'e-card-color';
/** @private */
const CARD_LABEL_CLASS = 'e-card-label';
/** @private */
const CARD_FOOTER_CLASS = 'e-card-footer';
/** @private */
const EMPTY_CARD_CLASS = 'e-empty-card';
/** @private */
const CARD_FOOTER_CSS_CLASS = 'e-card-footer-css';
/** @private */
const COLUMN_EXPAND_CLASS = 'e-column-expand';
/** @private */
const COLUMN_COLLAPSE_CLASS = 'e-column-collapse';
/** @private */
const COLLAPSE_HEADER_TEXT_CLASS = 'e-collapse-header-text';
/** @private */
const COLLAPSED_CLASS = 'e-collapsed';
/** @private */
const DIALOG_CLASS = 'e-kanban-dialog';
/** @private */
const FORM_CLASS = 'e-kanban-form';
/** @private */
const FORM_WRAPPER_CLASS = 'e-kanban-form-wrapper';
/** @private */
const ERROR_VALIDATION_CLASS = 'e-kanban-error';
/** @private */
const FIELD_CLASS = 'e-field';
/** @private */
const DRAGGED_CLONE_CLASS = 'e-target-dragged-clone';
/** @private */
const CLONED_CARD_CLASS = 'e-cloned-card';
/** @private */
const DRAGGED_CARD_CLASS = 'e-kanban-dragged-card';
/** @private */
const DROPPED_CLONE_CLASS = 'e-target-dropped-clone';
/** @private */
const DROPPING_CLASS = 'e-dropping';
/** @private */
const BORDER_CLASS = 'e-kanban-border';
/** @private */
const TOGGLE_VISIBLE_CLASS = 'e-toggle-visible';
/** @private */
const MULTI_CARD_WRAPPER_CLASS = 'e-multi-card-wrapper';
/** @private */
const MULTI_ACTIVE_CLASS = 'e-multi-active';
/** @private */
const TARGET_MULTI_CLONE_CLASS = 'e-target-multi-clone';
/** @private */
const MULTI_COLUMN_KEY_CLASS = 'e-column-key';
/** @private */
const CARD_SELECTION_CLASS = 'e-selection';
/** @private */
const TOOLTIP_CLASS = 'e-kanban-tooltip';
/** @private */
const TOOLTIP_TEXT_CLASS = 'e-tooltip-text';
/** @private */
const SWIMLANE_HEADER_CLASS = 'e-swimlane-header';
/** @private */
const SWIMLANE_HEADER_TOOLBAR_CLASS = 'e-swimlane-header-toolbar';
/** @private */
const TOOLBAR_MENU_CLASS = 'e-toolbar-menu';
/** @private */
const TOOLBAR_MENU_ICON_CLASS = 'e-icon-menu';
/** @private */
const TOOLBAR_LEVEL_TITLE_CLASS = 'e-toolbar-level-title';
/** @private */
const TOOLBAR_SWIMLANE_NAME_CLASS = 'e-toolbar-swimlane-name';
/** @private */
const SWIMLANE_OVERLAY_CLASS = 'e-swimlane-overlay';
/** @private */
const SWIMLANE_CONTENT_CLASS = 'e-swimlane-content';
/** @private */
const SWIMLANE_RESOURCE_CLASS = 'e-swimlane-resource';
/** @private */
const SWIMLANE_TREE_CLASS = 'e-swimlane-tree';
/** @private */
const LIMITS_CLASS = 'e-limits';
/** @private */
const MAX_COUNT_CLASS = 'e-max-count';
/** @private */
const MIN_COUNT_CLASS = 'e-min-count';
/** @private */
const MAX_COLOR_CLASS = 'e-max-color';
/** @private */
const MIN_COLOR_CLASS = 'e-min-color';
/** @private */
const POPUP_HEADER_CLASS = 'e-popup-header';
/** @private */
const CLOSE_CLASS = 'e-close';
/** @private */
const POPUP_CONTENT_CLASS = 'e-popup-content';
/** @private */
const POPUP_WRAPPER_CLASS = 'e-mobile-popup-wrapper';
/** @private */
const CLOSE_ICON_CLASS = 'e-close-icon';
/** @private */
const POPUP_OPEN_CLASS = 'e-popup-open';
/** @private */
const DIALOG_CONTENT_CONTAINER = 'e-kanban-dialog-content';
/** @private */
const SHOW_ADD_BUTTON = 'e-show-add-button';
/** @private */
const SHOW_ADD_ICON = 'e-show-add-icon';
/** @private */
const SHOW_ADD_FOCUS = 'e-show-add-focus';
/** @private */
const FROZEN_SWIMLANE_ROW_CLASS = 'e-frozen-swimlane-row';
/** @private */
const FROZEN_ROW_CLASS = 'e-frozen-row';
/** @private */
const TOOLBAR_SWIMLANE_ITEM_COUNT_CLASS = 'e-toolbar-swimlane-item-count';

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Action module is used to perform card actions.
 */
class Action {
    /**
     * Constructor for action module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    constructor(parent) {
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
    clickHandler(e) {
        const elementSelector = '.' + CARD_CLASS + ',.' + HEADER_ICON_CLASS + ',.' + CONTENT_ROW_CLASS + '.' +
            SWIMLANE_ROW_CLASS + ',.' + SHOW_ADD_BUTTON + ',.' + FROZEN_SWIMLANE_ROW_CLASS + ',.' + CONTENT_ROW_CLASS +
            ':not(.' + SWIMLANE_ROW_CLASS + ') .' + CONTENT_CELLS_CLASS;
        const target = closest(e.target, elementSelector);
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
            const swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.' + SWIMLANE_ROW_CLASS));
            const targetIcon = this.parent.layoutModule.frozenSwimlaneRow.querySelector('.' + ICON_CLASS);
            this.rowExpandCollapse(e, swimlaneRows[this.parent.layoutModule.frozenOrder]);
            const isCollapsed = targetIcon.classList.contains(SWIMLANE_ROW_COLLAPSE_CLASS) ? true : false;
            if (isCollapsed) {
                classList(targetIcon, [SWIMLANE_ROW_EXPAND_CLASS], [SWIMLANE_ROW_COLLAPSE_CLASS]);
            }
            else {
                classList(targetIcon, [SWIMLANE_ROW_COLLAPSE_CLASS], [SWIMLANE_ROW_EXPAND_CLASS]);
            }
        }
    }
    addButtonClick(target) {
        const newData = {};
        if (this.parent.kanbanData.length === 0) {
            newData[this.parent.cardSettings.headerField] = 1;
        }
        else if (typeof (this.parent.kanbanData[0])[this.parent.cardSettings.headerField] === 'number') {
            const id = this.parent.kanbanData.map((obj) => parseInt(obj[this.parent.cardSettings.headerField], 10));
            newData[this.parent.cardSettings.headerField] = Math.max(...id) + 1;
        }
        newData[this.parent.keyField] = closest(target, '.' + CONTENT_CELLS_CLASS).getAttribute('data-key');
        if (this.parent.sortSettings.sortBy === 'Index') {
            newData[this.parent.sortSettings.field] = 1;
            if (closest(target, '.' + CONTENT_CELLS_CLASS).querySelector('.' + CARD_CLASS)) {
                const card = this.parent.sortSettings.direction === 'Ascending' ?
                    target.nextElementSibling.classList.contains(BORDER_CLASS) ?
                        target.nextElementSibling.nextElementSibling.lastElementChild : target.nextElementSibling.lastElementChild
                    : target.nextElementSibling.classList.contains(BORDER_CLASS) ?
                        target.nextElementSibling.nextElementSibling.firstElementChild : target.nextElementSibling.firstElementChild;
                const data = this.parent.getCardDetails(card);
                newData[this.parent.sortSettings.field] = data[this.parent.sortSettings.field] + 1;
            }
        }
        if (this.parent.kanbanData.length !== 0 && this.parent.swimlaneSettings.keyField &&
            closest(target, '.' + CONTENT_ROW_CLASS).previousElementSibling) {
            newData[this.parent.swimlaneSettings.keyField] =
                closest(target, '.' + CONTENT_ROW_CLASS).previousElementSibling.getAttribute('data-key');
        }
        this.parent.openDialog('Add', newData);
    }
    doubleClickHandler(e) {
        const target = closest(e.target, '.' + CARD_CLASS);
        if (target) {
            this.cardDoubleClick(e);
        }
    }
    cardClick(e, selectedCard) {
        const target = closest((selectedCard) ? selectedCard : e.target, '.' + CARD_CLASS);
        const cardClickObj = this.parent.getCardDetails(target);
        if (cardClickObj) {
            this.parent.activeCardData = { data: cardClickObj, element: target };
            const args = { data: cardClickObj, element: target, cancel: false, event: e };
            this.parent.trigger(cardClick, args, (clickArgs) => {
                if (!clickArgs.cancel) {
                    if (target.classList.contains(CARD_SELECTION_CLASS) && e.type === 'click') {
                        removeClass([target], CARD_SELECTION_CLASS);
                        if (this.parent.enableVirtualization) {
                            this.parent.virtualLayoutModule.disableAttributeSelection(target);
                        }
                        else {
                            this.parent.layoutModule.disableAttributeSelection(target);
                        }
                    }
                    else {
                        let isCtrlKey = e.ctrlKey;
                        if (this.parent.isAdaptive && this.parent.touchModule) {
                            isCtrlKey = (this.parent.touchModule.mobilePopup && this.parent.touchModule.tabHold) || isCtrlKey;
                        }
                        this.cardSelection(target, isCtrlKey, e.shiftKey);
                    }
                    if (this.parent.isAdaptive && this.parent.touchModule) {
                        this.parent.touchModule.updatePopupContent();
                    }
                    const cell = closest(target, '.' + CONTENT_CELLS_CLASS);
                    if (this.parent.allowKeyboard) {
                        const element = [].slice.call(cell.querySelectorAll('.' + CARD_CLASS));
                        element.forEach((e) => { e.setAttribute('tabindex', '0'); });
                        this.parent.keyboardModule.addRemoveTabIndex('Remove');
                    }
                }
            });
        }
    }
    cardDoubleClick(e) {
        const target = closest(e.target, '.' + CARD_CLASS);
        const cardDoubleClickObj = this.parent.getCardDetails(target);
        this.parent.activeCardData = { data: cardDoubleClickObj, element: target };
        this.cardSelection(target, false, false);
        const args = { data: cardDoubleClickObj, element: target, cancel: false, event: e };
        this.parent.trigger(cardDoubleClick, args, (doubleClickArgs) => {
            if (!doubleClickArgs.cancel) {
                this.parent.dialogModule.openDialog('Edit', args.data);
            }
        });
    }
    rowExpandCollapse(e, isFrozenElem) {
        const headerTarget = (e instanceof HTMLElement) ? e : e.target;
        const currentSwimlaneHeader = !isNullOrUndefined(isFrozenElem) ? isFrozenElem : headerTarget;
        const args = { cancel: false, target: headerTarget, requestType: 'rowExpandCollapse' };
        this.parent.trigger(actionBegin, args, (actionArgs) => {
            if (!actionArgs.cancel) {
                const target = closest(currentSwimlaneHeader, '.' + SWIMLANE_ROW_CLASS);
                const key = target.getAttribute('data-key');
                const tgtRow = this.parent.element.querySelector('.' + CONTENT_ROW_CLASS + `:nth-child(${target.rowIndex + 2})`);
                const targetIcon = target.querySelector(`.${SWIMLANE_ROW_EXPAND_CLASS},.${SWIMLANE_ROW_COLLAPSE_CLASS}`);
                const isCollapsed = target.classList.contains(COLLAPSED_CLASS) ? true : false;
                let tabIndex;
                if (isCollapsed) {
                    removeClass([tgtRow, target], COLLAPSED_CLASS);
                    classList(targetIcon, [SWIMLANE_ROW_EXPAND_CLASS], [SWIMLANE_ROW_COLLAPSE_CLASS]);
                    this.parent.swimlaneToggleArray.splice(this.parent.swimlaneToggleArray.indexOf(key), 1);
                    tabIndex = '0';
                }
                else {
                    addClass([tgtRow, target], COLLAPSED_CLASS);
                    classList(targetIcon, [SWIMLANE_ROW_COLLAPSE_CLASS], [SWIMLANE_ROW_EXPAND_CLASS]);
                    this.parent.swimlaneToggleArray.push(key);
                    tabIndex = '-1';
                }
                targetIcon.setAttribute('aria-label', isCollapsed ? key + ' Expand' : key + ' Collapse');
                target.setAttribute('aria-expanded', isCollapsed.toString());
                tgtRow.setAttribute('aria-expanded', isCollapsed.toString());
                const rows = [].slice.call(tgtRow.querySelectorAll('.' + CONTENT_CELLS_CLASS));
                rows.forEach((cell) => { cell.setAttribute('tabindex', tabIndex); });
                this.parent.notify(contentReady, {});
                this.parent.trigger(actionComplete, { target: headerTarget, requestType: 'rowExpandCollapse' });
            }
        });
    }
    columnExpandCollapse(e) {
        const headerTarget = (e instanceof HTMLElement) ? e : e.target;
        const args = { cancel: false, target: headerTarget, requestType: 'columnExpandCollapse' };
        this.parent.trigger(actionBegin, args, (actionArgs) => {
            if (!actionArgs.cancel) {
                const target = closest(headerTarget, '.' + HEADER_CELLS_CLASS);
                const colIndex = target.cellIndex;
                this.columnToggle(target);
                const collapsed = this.parent.element.querySelectorAll(`.${HEADER_CELLS_CLASS}.${COLLAPSED_CLASS}`).length;
                if (collapsed === (this.parent.columns.length - this.hideColumnKeys.length)) {
                    const index = (colIndex + 1 === collapsed) ? 1 : colIndex + 2;
                    const headerSelector = `.${HEADER_CELLS_CLASS}:not(.${STACKED_HEADER_CELL_CLASS}):nth-child(${index})`;
                    const nextCol = this.parent.element.querySelector(headerSelector);
                    addClass([nextCol], COLLAPSED_CLASS);
                    this.columnToggle(nextCol);
                }
                this.parent.notify(contentReady, {});
                this.parent.trigger(actionComplete, { target: headerTarget, requestType: 'columnExpandCollapse' });
            }
        });
    }
    columnToggle(target) {
        const colIndex = target.cellIndex;
        const elementSelector = `.${CONTENT_ROW_CLASS}:not(.${SWIMLANE_ROW_CLASS})`;
        const targetRow = [].slice.call(this.parent.element.querySelectorAll(elementSelector));
        const colSelector = `.${TABLE_CLASS} col:nth-child(${colIndex + 1})`;
        const targetIcon = target.querySelector(`.${COLUMN_EXPAND_CLASS},.${COLUMN_COLLAPSE_CLASS}`);
        const colGroup = [].slice.call(this.parent.element.querySelectorAll(colSelector));
        if (target.classList.contains(COLLAPSED_CLASS)) {
            removeClass(colGroup, COLLAPSED_CLASS);
            if (this.parent.isAdaptive) {
                if (this.parent.enableVirtualization) {
                    colGroup.forEach((col) => col.style.width = formatUnit(this.parent.virtualLayoutModule.getWidth()));
                }
                else {
                    colGroup.forEach((col) => col.style.width = formatUnit(this.parent.layoutModule.getWidth()));
                }
            }
            classList(targetIcon, [COLUMN_EXPAND_CLASS], [COLUMN_COLLAPSE_CLASS]);
            for (const row of targetRow) {
                const targetCol = row.querySelector(`.${CONTENT_CELLS_CLASS}:nth-child(${colIndex + 1})`);
                removeClass([targetCol, target], COLLAPSED_CLASS);
                remove(targetCol.querySelector('.' + COLLAPSE_HEADER_TEXT_CLASS));
                target.setAttribute('aria-expanded', 'true');
                targetCol.setAttribute('aria-expanded', 'true');
                const collapsedCell = [].slice.call(targetCol.parentElement.querySelectorAll('.' + COLLAPSED_CLASS));
                collapsedCell.forEach((cell) => {
                    const collapasedText = cell.querySelector('.' + COLLAPSE_HEADER_TEXT_CLASS);
                    collapasedText.style.height = 'auto';
                    if (collapasedText && targetCol.getBoundingClientRect().height < (collapasedText.getBoundingClientRect().height + 10)) {
                        collapasedText.style.height = (targetCol.getBoundingClientRect().height - 4) + 'px';
                    }
                });
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
                colGroup.forEach((col) => col.style.width = formatUnit(toggleWidth));
            }
            classList(targetIcon, [COLUMN_COLLAPSE_CLASS], [COLUMN_EXPAND_CLASS]);
            const key = target.getAttribute('data-key');
            for (const row of targetRow) {
                const targetCol = row.querySelector(`.${CONTENT_CELLS_CLASS}[data-key="${key}"]`);
                const index = targetCol.cellIndex;
                let text;
                if (!this.parent.enableVirtualization) {
                    text = (this.parent.columns[index].showItemCount ? '[' +
                        targetCol.querySelectorAll('.' + CARD_CLASS).length + '] ' : '') + this.parent.columns[index].headerText;
                }
                else {
                    const value = this.parent.dataModule.isRemote() ?
                        this.parent.columnDataCount[this.parent.columns[index].keyField]
                        : this.parent.virtualLayoutModule.columnData[this.parent.columns[index].keyField].length;
                    text = (this.parent.columns[index].showItemCount ? '[' +
                        value + '] ' : '') + this.parent.columns[index].headerText;
                }
                targetCol.appendChild(createElement('div', { className: COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                addClass([targetCol, target], COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'false');
                targetCol.setAttribute('aria-expanded', 'false');
                const collapsedCell = [].slice.call(targetCol.parentElement.querySelectorAll('.' + COLLAPSED_CLASS));
                collapsedCell.forEach((cell) => {
                    const collapasedText = cell.querySelector('.' + COLLAPSE_HEADER_TEXT_CLASS);
                    if (collapasedText && targetCol.getBoundingClientRect().height < (collapasedText.getBoundingClientRect().height + 10)) {
                        collapasedText.style.height = (targetCol.getBoundingClientRect().height - 4) + 'px';
                    }
                });
            }
            if (this.parent.kanbanData.length === 0 && targetRow.length === 0) {
                addClass([target], COLLAPSED_CLASS);
                target.setAttribute('aria-expanded', 'false');
            }
            this.columnToggleArray.push(target.getAttribute('data-key'));
            this.parent.columns[colIndex].setProperties({ isExpanded: false }, true);
            target.querySelector('.e-header-icon').setAttribute('aria-label', key + ' Collapse');
        }
    }
    cardSelection(target, isCtrl, isShift) {
        if (!target) {
            return;
        }
        const cards = this.parent.getSelectedCards();
        if (this.parent.cardSettings.selectionType !== 'None') {
            const contentRow = closest(target, '.' + CONTENT_ROW_CLASS);
            const index = !isNullOrUndefined(this.lastSelectionRow) ? this.lastSelectionRow.rowIndex : contentRow.rowIndex;
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
                cards.forEach((el) => {
                    this.selectionArray.splice(this.selectionArray.indexOf(el.getAttribute('data-id')), 1);
                    this.selectedCardsElement.splice(this.selectedCardsElement.indexOf(el), 1);
                    this.selectedCardsData.splice(this.selectedCardsData.indexOf(this.parent.getCardDetails(el), 1));
                });
            }
            if (cards.length > 0 && isShift && this.parent.cardSettings.selectionType === 'Multiple') {
                const curCards = [];
                let start;
                let end;
                let i;
                const allCards = [].slice.call(contentRow.querySelectorAll('.' + CARD_CLASS));
                allCards.forEach((el) => curCards.push(el.getAttribute('data-id')));
                const curId = target.getAttribute('data-id');
                const lastId = this.lastCard.getAttribute('data-id');
                const curIndex = end = curCards.indexOf(curId);
                const lastIndex = start = curCards.indexOf(lastId);
                const select = curIndex > lastIndex ? 'next' : 'prev';
                if (select === 'prev') {
                    start = curIndex;
                    end = lastIndex;
                }
                for (i = start; i <= end; i++) {
                    const card = allCards[i];
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
                    const elementSelector = `.${SWIMLANE_ROW_EXPAND_CLASS},.${SWIMLANE_ROW_COLLAPSE_CLASS}`;
                    const parentEle = this.lastSelectionRow.previousElementSibling.querySelector(elementSelector);
                    if (parentEle && parentEle.classList.contains(SWIMLANE_ROW_COLLAPSE_CLASS)) {
                        this.rowExpandCollapse(parentEle);
                    }
                }
            }
        }
    }
    addColumn(columnOptions, index) {
        const addColumn = createInstance(Columns, [this.parent, 'columns', columnOptions, true]);
        this.parent.columns.splice(index, 0, addColumn);
        this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
    }
    deleteColumn(index) {
        const listKey = this.parent.element.querySelectorAll('.' + HEADER_CELLS_CLASS).item(index);
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
    }
    showColumn(key) {
        const index = this.hideColumnKeys.indexOf(key.toString());
        if (index !== -1) {
            this.hideColumnKeys.splice(index, 1);
            this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
        }
    }
    hideColumn(key) {
        this.hideColumnKeys.push(key.toString());
        this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
    }
    /**
     * Maintain the single card selection
     *
     * @param {Record<string, any>} data - Specifies the selected card data.
     * @returns {void}
     * @private
     * @hidden
     */
    SingleCardSelection(data) {
        if (this.parent.cardSettings.selectionType !== 'None' && data[this.parent.cardSettings.headerField]) {
            // eslint-disable-next-line no-useless-escape
            const card = this.parent.element.querySelector('.e-card[data-id=\"' +
                // eslint-disable-next-line no-useless-escape
                data[this.parent.cardSettings.headerField].toString() + '"\]');
            if (card) {
                addClass([card], CARD_SELECTION_CLASS);
                card.setAttribute('aria-selected', 'true');
                card.setAttribute('tabindex', '0');
            }
        }
    }
}

/**
 * Kanban CRUD module
 */
class Crud {
    /**
     * Constructor for CRUD module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    constructor(parent) {
        this.parent = parent;
    }
    addCard(cardData, index) {
        const args = {
            cancel: false, requestType: 'cardCreate', addedRecords: (cardData instanceof Array) ? cardData : [cardData],
            changedRecords: [], deletedRecords: []
        };
        this.parent.trigger(actionBegin, args, (addArgs) => {
            if (!addArgs.cancel) {
                let modifiedData = [];
                if (this.parent.sortSettings.field && this.parent.sortSettings.sortBy === 'Index') {
                    if (cardData instanceof Array) {
                        modifiedData = cardData;
                    }
                    else {
                        modifiedData.push(cardData);
                    }
                    modifiedData.forEach((data, index) => {
                        if (!data[this.parent.sortSettings.field]) {
                            const columnData = this.parent.getColumnData(data[this.parent.keyField]);
                            if (this.parent.sortSettings.direction === 'Ascending' && columnData.length > 0) {
                                data[this.parent.sortSettings.field] =
                                    (columnData[columnData.length - 1][this.parent.sortSettings.field]) + index + 1;
                            }
                            else if (this.parent.sortSettings.direction === 'Descending' && columnData.length > 0) {
                                data[this.parent.sortSettings.field] = columnData[0][this.parent.sortSettings.field] + index + 1;
                            }
                            if (columnData.length === 0) {
                                data[this.parent.sortSettings.field] = 1;
                            }
                        }
                    });
                    if (!(cardData instanceof Array)) {
                        if (!index && this.parent.sortSettings.direction === 'Descending') {
                            // eslint-disable-next-line max-len
                            this.parent.getColumnData(modifiedData[0][this.parent.keyField]).filter((obj, count) => {
                                if (obj[this.parent.sortSettings.field] === modifiedData[0][this.parent.sortSettings.field]) {
                                    index = count + 1;
                                }
                            });
                        }
                    }
                    if (index !== 0 && !index && this.parent.sortSettings.direction === 'Descending') {
                        index = 0;
                    }
                    modifiedData = this.priorityOrder(modifiedData, index);
                }
                const addedRecords = (cardData instanceof Array) ? cardData : [cardData];
                const changedRecords = (this.parent.sortSettings.field && this.parent.sortSettings.sortBy === 'Index') ? modifiedData : [];
                const editParms = { addedRecords: addedRecords, changedRecords: changedRecords, deletedRecords: [] };
                const type = (cardData instanceof Array || modifiedData.length > 0) ? 'batch' : 'insert';
                this.parent.dataModule.updateDataManager(type, editParms, 'cardCreated', cardData, index);
            }
        });
    }
    getIndexFromData(data) {
        const cardElement = this.parent.element.querySelector(`.${CARD_CLASS}[data-id="${data[this.parent.cardSettings.headerField]}"]`);
        const element = closest(cardElement, '.' + CONTENT_CELLS_CLASS);
        const index = [].slice.call(element.querySelectorAll('.' + CARD_CLASS)).indexOf(cardElement);
        return index;
    }
    updateCard(cardData, index, isDropped, dataDropIndexKeyFieldValue, draggedKey, droppedKey, isMultipleDrag) {
        const args = {
            requestType: 'cardChange', cancel: false, addedRecords: [],
            changedRecords: (cardData instanceof Array) ? cardData : [cardData], deletedRecords: []
        };
        index = isNullOrUndefined(index) ? this.getIndexFromData(args.changedRecords[0]) : index;
        this.parent.trigger(actionBegin, args, (updateArgs) => {
            if (!updateArgs.cancel) {
                if (this.parent.sortSettings.field && this.parent.sortSettings.sortBy === 'Index') {
                    let modifiedData = [];
                    if (cardData instanceof Array) {
                        modifiedData = cardData;
                    }
                    else {
                        modifiedData.push(cardData);
                    }
                    cardData = this.priorityOrder(modifiedData, index);
                }
                const editParms = {
                    addedRecords: [], changedRecords: (cardData instanceof Array) ? cardData : [cardData], deletedRecords: []
                };
                const type = (cardData instanceof Array) ? 'batch' : 'update';
                this.parent.dataModule.updateDataManager(type, editParms, 'cardChanged', cardData, index, isDropped, dataDropIndexKeyFieldValue, draggedKey, droppedKey, isMultipleDrag);
            }
        });
    }
    deleteCard(cardData) {
        const editParms = { addedRecords: [], changedRecords: [], deletedRecords: [] };
        if (typeof cardData === 'string' || typeof cardData === 'number') {
            editParms.deletedRecords = this.parent.kanbanData.filter((data) => data[this.parent.cardSettings.headerField] === cardData);
        }
        else {
            editParms.deletedRecords = (cardData instanceof Array) ? cardData : [cardData];
        }
        const args = {
            requestType: 'cardRemove', cancel: false, addedRecords: [], changedRecords: [], deletedRecords: editParms.deletedRecords
        };
        this.parent.trigger(actionBegin, args, (deleteArgs) => {
            if (!deleteArgs.cancel) {
                const type = (editParms.deletedRecords.length > 1) ? 'batch' : 'delete';
                const cardData = editParms.deletedRecords;
                this.parent.dataModule.updateDataManager(type, editParms, 'cardRemoved', cardData[0]);
            }
        });
    }
    priorityOrder(cardData, cardIndex) {
        const cardsId = cardData.map((obj) => obj[this.parent.cardSettings.headerField]);
        let num = cardData[cardData.length - 1][this.parent.sortSettings.field];
        const allModifiedKeys = cardData.map((obj) => obj[this.parent.keyField]);
        const modifiedKey = allModifiedKeys.filter((key, index) => allModifiedKeys.indexOf(key) === index).sort();
        let columnAllDatas;
        const finalData = [];
        const originalIndex = [];
        for (const columnKey of modifiedKey) {
            const keyData = cardData.filter((cardObj) => cardObj[this.parent.keyField] === columnKey);
            columnAllDatas = this.parent.enableVirtualization ? this.parent.virtualLayoutModule.getColumnData(columnKey)
                : this.parent.layoutModule.getColumnData(columnKey);
            for (const data of keyData) {
                if (this.parent.swimlaneSettings.keyField) {
                    const swimlaneDatas = this.parent.getSwimlaneData(data[this.parent.swimlaneSettings.keyField]);
                    columnAllDatas = this.parent.getColumnData(columnKey, swimlaneDatas);
                }
            }
            keyData.forEach((key) => finalData.push(key));
            if (!isNullOrUndefined(cardIndex)) {
                for (let j = 0; j < cardsId.length; j++) {
                    columnAllDatas.filter((data, index) => {
                        if (data[this.parent.cardSettings.headerField] === cardsId[j] && index <= cardIndex) {
                            originalIndex.push(index);
                        }
                    });
                }
                if (originalIndex.length > 0) {
                    cardIndex = cardIndex + originalIndex.length;
                }
                if (this.parent.sortSettings.direction === 'Ascending') {
                    for (let i = cardIndex; i < columnAllDatas.length; i++) {
                        if (cardsId.indexOf(columnAllDatas[i][this.parent.cardSettings.headerField]) === -1) {
                            columnAllDatas[i][this.parent.sortSettings.field] = ++num;
                            finalData.push(columnAllDatas[i]);
                        }
                    }
                }
                else {
                    for (let i = cardIndex - 1; i >= 0; i--) {
                        if (cardsId.indexOf(columnAllDatas[i][this.parent.cardSettings.headerField]) === -1) {
                            columnAllDatas[i][this.parent.sortSettings.field] = ++num;
                            finalData.push(columnAllDatas[i]);
                        }
                    }
                }
            }
        }
        return finalData;
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Drag and Drop module is used to perform card actions.
 */
class DragAndDrop {
    /**
     * Constructor for drag and drop module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    constructor(parent) {
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
    wireDragEvents(element) {
        let dragContainment;
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
    }
    dragHelper(e) {
        if (this.parent.isAdaptive && this.parent.touchModule.mobilePopup &&
            this.parent.touchModule.mobilePopup.element.classList.contains(POPUP_OPEN_CLASS)) {
            this.parent.touchModule.mobilePopup.hide();
        }
        this.dragObj.element = closest(e.sender.target, '.' + CARD_CLASS);
        if (isNullOrUndefined(this.dragObj.element)) {
            return null;
        }
        this.dragObj.element.style.width = formatUnit(this.dragObj.element.offsetWidth);
        const cloneWrapper = createElement('div', { innerHTML: this.dragObj.element.outerHTML });
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
    }
    dragStart(e) {
        this.dragObj.selectedCards = this.dragObj.element;
        this.borderElm = this.parent.element.querySelectorAll('.' + BORDER_CLASS);
        if (this.dragObj.element.classList.contains(CARD_SELECTION_CLASS)) {
            const className = '.' + CARD_CLASS + '.' + CARD_SELECTION_CLASS + ':not(.' + CLONED_CARD_CLASS + ')';
            const closestEle = closest(this.dragObj.element, '.' + CONTENT_ROW_CLASS);
            this.dragObj.selectedCards = [].slice.call(closestEle.querySelectorAll(className));
            this.dragObj.selectedCards.forEach((element) => {
                this.dragObj.cardDetails.push(this.parent.getCardDetails(element));
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
        const dragArgs = { cancel: false, data: this.dragObj.cardDetails, event: e, element: this.dragObj.selectedCards };
        this.parent.trigger(dragStart, dragArgs, (dragEventArgs) => {
            if (dragEventArgs.cancel) {
                this.removeElement(this.dragObj.cloneElement);
                this.dragObj.instance.intDestroy(e);
                this.dragObj.element = null;
                this.dragObj.targetClone = null;
                this.dragObj.draggedClone = null;
                this.dragObj.cloneElement = null;
                this.dragObj.targetCloneMulti = null;
                return;
            }
            if (this.dragObj.element.classList.contains(CARD_SELECTION_CLASS)) {
                this.dragObj.selectedCards.forEach((element) => { this.draggedClone(element); });
                if (this.dragObj.selectedCards.length > 1) {
                    this.dragObj.cloneElement.innerHTML = '';
                    const drag = createElement('div', {
                        className: 'e-multi-card-text',
                        innerHTML: this.dragObj.selectedCards.length + ' ' + this.parent.localeObj.getConstant('cards')
                    });
                    this.dragObj.cloneElement.appendChild(drag);
                    classList(this.dragObj.cloneElement, ['e-multi-card-clone'], [CARD_SELECTION_CLASS]);
                    if (this.parent.enableVirtualization) {
                        this.parent.virtualLayoutModule.disableAttributeSelection(this.dragObj.cloneElement);
                    }
                    else {
                        this.parent.layoutModule.disableAttributeSelection(this.dragObj.cloneElement);
                    }
                    this.dragObj.cloneElement.style.width = '90px';
                }
            }
            else {
                this.draggedClone(this.dragObj.element);
            }
            EventHandler.add(document.body, 'keydown', this.keydownHandler, this);
            this.parent.notify(contentReady, {});
        });
    }
    draggedClone(element) {
        this.dragObj.draggedClone = createElement('div', {
            className: DRAGGED_CLONE_CLASS,
            styles: 'width:' + formatUnit(element.offsetWidth - 1) + ';height:' + formatUnit(element.offsetHeight)
        });
        element.insertAdjacentElement('afterend', this.dragObj.draggedClone);
        addClass([element], DRAGGED_CARD_CLASS);
    }
    drag(e) {
        if (!e.target) {
            return;
        }
        let cardElement = closest(e.target, '.' + ROOT_CLASS + ' .' + CARD_CLASS);
        if (!isNullOrUndefined(cardElement) && this.parent.enableVirtualization && !isNullOrUndefined(e.target.previousElementSibling) &&
            !isNullOrUndefined(e.target.previousElementSibling.querySelector('.e-target-dropped-clone'))) {
            cardElement = e.target.previousElementSibling.querySelector('.e-target-dropped-clone').nextElementSibling;
        }
        let targetEle = e.target;
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
        const target = cardElement || targetEle;
        const selector = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + ') .' + CONTENT_CELLS_CLASS
            + '.' + DROPPABLE_CLASS;
        const contentCell = closest(target, selector);
        let cellDimension;
        let borderElem;
        let dropElement;
        if (target.nextElementSibling && target.nextElementSibling.lastChild) {
            dropElement = target.nextElementSibling.lastChild.previousElementSibling;
        }
        this.externalDrop(target);
        this.kanbanObj = this.parent.isExternalKanbanDrop ? this.parent.externalDropObj : this.parent;
        this.calculateArgs(e);
        if (contentCell && document.body.style.cursor !== 'not-allowed') {
            const targetKey = this.getColumnKey(contentCell);
            const keys = targetKey.split(',');
            this.multiCloneRemove();
            const isDrag = (targetKey === this.getColumnKey(closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS)))
                ? true : false;
            if (keys.length === 1 || isDrag) {
                if (target.classList.contains(DRAGGED_CLONE_CLASS)) {
                    this.removeElement(this.dragObj.targetClone, this.kanbanObj);
                }
                if (target.classList.contains(CARD_CLASS) || this.insertClone === 'beforebegin') {
                    const element = target.classList.contains(DRAGGED_CLONE_CLASS) ?
                        (target.previousElementSibling.classList.contains(DRAGGED_CARD_CLASS) ? null : target.previousElementSibling)
                        : target.previousElementSibling;
                    this.insertClone = 'afterend';
                    if (isNullOrUndefined(element)) {
                        let pageY = target.classList.contains(DRAGGED_CLONE_CLASS) ? (this.dragObj.pageY / 2) :
                            this.dragObj.pageY;
                        const height = target.classList.contains(DRAGGED_CLONE_CLASS) ? target.offsetHeight :
                            (target.offsetHeight / 2);
                        const kanbanTop = this.kanbanObj.element.getBoundingClientRect().top + window.scrollY;
                        const targetTop = target.getBoundingClientRect().top + window.scrollY;
                        const relativeTop = targetTop - kanbanTop;
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
        let isCollapsed = false;
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
        const tColumn = [].slice.call(this.kanbanObj.element.querySelectorAll('.' + TOGGLE_VISIBLE_CLASS));
        if (tColumn.length > 0 && !target.classList.contains(TOGGLE_VISIBLE_CLASS)
            && !closest(target, '.' + TOGGLE_VISIBLE_CLASS)) {
            this.toggleVisible(target, tColumn.slice(-1)[0]);
            removeClass(tColumn, TOGGLE_VISIBLE_CLASS);
        }
        this.kanbanObj.notify(contentReady, {});
        const multiKeyTarget = closest(target, '.' + MULTI_COLUMN_KEY_CLASS);
        if (multiKeyTarget) {
            const columnKeys = [].slice.call(this.kanbanObj.element.querySelectorAll('.' + MULTI_COLUMN_KEY_CLASS + ':not(.' +
                DISABLED_CLASS + ')')).filter((element) => this.getColumnKey(element) === this.getColumnKey(multiKeyTarget));
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
        const dragArgs = { data: this.dragObj.cardDetails, event: e, element: this.dragObj.selectedCards };
        this.kanbanObj.trigger(drag, dragArgs);
        this.parent.isExternalKanbanDrop = false;
        this.isExternalDrop = false;
    }
    removeElement(element, kanbanObj) {
        kanbanObj = kanbanObj ? kanbanObj : this.parent;
        if (kanbanObj.element.getElementsByClassName(element.className).length > 0) {
            remove(element);
        }
    }
    isTargetElementVisible(targetElem) {
        const wrapperElem = closest(targetElem, '.' + CARD_WRAPPER_CLASS);
        if (!isNullOrUndefined(wrapperElem)) {
            const wrapperElemBottom = wrapperElem.getBoundingClientRect().bottom;
            const targetElemBottom = targetElem.getBoundingClientRect().bottom;
            if (targetElemBottom > wrapperElemBottom) {
                return false;
            }
            return true;
        }
        return true;
    }
    externalDrop(target) {
        this.parent.externalDropId.forEach((externalDropId) => {
            const targetRootElement = closest(target, externalDropId);
            if (targetRootElement) {
                if (targetRootElement.classList.contains('e-kanban')) {
                    this.parent.externalDropObj = document.querySelector(externalDropId).ej2_instances[0];
                    this.parent.isExternalKanbanDrop = true;
                    const className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS +
                        '):not(.' + COLLAPSED_CLASS + ') .' + CONTENT_CELLS_CLASS;
                    const cells = [].slice.call(this.parent.externalDropObj.element.querySelectorAll(className));
                    addClass(cells, DROPPING_CLASS);
                }
                else {
                    this.isExternalDrop = true;
                }
            }
        });
    }
    multiCloneCreate(keys, contentCell) {
        let offsetHeight = contentCell.offsetHeight;
        const limitEle = contentCell.querySelector('.' + LIMITS_CLASS);
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
        for (const key of keys) {
            const dragCell = closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS);
            const transition = this.kanbanObj.columns[dragCell.cellIndex].transitionColumns;
            const allowTransition = this.allowedTransition(this.dragObj.element.getAttribute('data-key'), key, transition);
            const name = allowTransition ? '' : ' ' + DISABLED_CLASS;
            const colKey = createElement('div', {
                className: MULTI_COLUMN_KEY_CLASS + name,
                attrs: { 'data-key': key.trim() }
            });
            const text = createElement('div', { className: 'e-text', innerHTML: key.trim() });
            contentCell.appendChild(this.dragObj.targetCloneMulti).appendChild(colKey).appendChild(text);
            colKey.style.cursor = allowTransition ? '' : 'not-allowed';
            colKey.style.lineHeight = colKey.style.height = formatUnit((offsetHeight / keys.length));
            text.style.top = formatUnit((offsetHeight / 2) - (text.offsetHeight / 2));
        }
    }
    allowedTransition(currentCardKey, targetCardKey, allowedKey) {
        let allowTransition = true;
        const targetKey = targetCardKey.split(',');
        for (let i = 0; i < targetKey.length; i++) {
            if (currentCardKey === targetKey[i].trim()) {
                return true;
            }
            if (allowedKey) {
                if (allowedKey.length === 1 && allowedKey[0].length === 0) {
                    return true;
                }
                for (let j = 0; j < allowedKey.length; j++) {
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
    }
    cellDropping() {
        const dragCell = closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS);
        const dragRow = closest(this.dragObj.draggedClone, '.' + CONTENT_ROW_CLASS);
        if (dragCell && dragCell.classList.contains(DROP_CLASS)) {
            addClass([dragCell], DROPPING_CLASS);
        }
        this.addDropping(dragRow, dragCell);
        if (this.kanbanObj.swimlaneSettings.keyField && this.kanbanObj.swimlaneSettings.allowDragAndDrop) {
            const className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + '):not(.' + COLLAPSED_CLASS + ')';
            const rows = [].slice.call(this.kanbanObj.element.querySelectorAll(className));
            [].slice.call(rows).forEach((row) => {
                if (dragRow !== row) {
                    this.addDropping(row, dragCell);
                }
            });
        }
    }
    addDropping(dragRow, dragCell) {
        if (dragCell && this.borderElm && this.borderElm.length !== 0) {
            if (dragCell.classList.contains(DROPPING_CLASS)) {
                removeClass([dragCell], DROPPING_CLASS);
            }
            const cellDimension = dragCell.getBoundingClientRect();
            this.updateDimension(cellDimension);
        }
        else if (dragCell && dragRow) {
            [].slice.call(dragRow.children).forEach((cell) => {
                const transition = this.kanbanObj.columns[dragCell.cellIndex].transitionColumns;
                if (cell !== dragCell && cell.classList.contains(DROP_CLASS) &&
                    this.allowedTransition(dragCell.getAttribute('data-key'), cell.getAttribute('data-key'), transition)) {
                    addClass([cell], DROPPING_CLASS);
                }
            });
        }
    }
    updateDimension(dimensions, target) {
        [].slice.call(this.borderElm).forEach((element) => {
            if (element.parentElement && (element.parentElement.getAttribute('aria-expanded') === 'true' || !element.parentElement.hasAttribute('aria-expanded'))) {
                addClass([element], DROPPING_CLASS);
            }
            const hasAddButton = element.previousElementSibling;
            element.style.height = parseInt(dimensions.height.toString(), 10) - (hasAddButton &&
                hasAddButton.classList.contains(SHOW_ADD_BUTTON) ? hasAddButton.offsetHeight + hasAddButton.offsetTop : 0) + 'px';
            if (!target || target.tagName !== 'TABLE') {
                element.style.width = parseInt(dimensions.width.toString(), 10) + 'px';
            }
            element.style.left = (element.parentElement.getBoundingClientRect().left - closest(element, '.e-kanban').getBoundingClientRect().left) + 'px';
        });
    }
    keydownHandler(e) {
        if (e.code === 'Escape' && this.dragObj.cloneElement) {
            EventHandler.remove(this.dragObj.cloneElement, 'keydown', this.keydownHandler);
            this.dragObj.element.removeAttribute('aria-grabbed');
            this.dragStopClear();
            this.dragStopPostClear();
        }
    }
    dragStop(e) {
        let contentCell = closest(this.dragObj.targetClone, '.' + CONTENT_CELLS_CLASS);
        if (this.parent.enableVirtualization && !isNullOrUndefined(contentCell)) {
            contentCell.classList.add('e-dropped-column');
        }
        let columnKey;
        let dropIndex;
        let dataDropIndexKeyfieldValue;
        let isMultipleDrag;
        EventHandler.remove(document.body, 'keydown', this.keydownHandler);
        [].slice.call(this.borderElm).forEach((element) => {
            element.classList.remove(DROPPING_CLASS);
        });
        if (this.dragObj.targetClone.parentElement) {
            isMultipleDrag = (this.dragObj.selectedCards && this.dragObj.selectedCards.length > 1
                && this.parent.sortSettings.sortBy === 'Index');
            const className = !isMultipleDrag ? '.' + CARD_CLASS + ':not(.' + DRAGGED_CARD_CLASS + ', .' + CLONED_CARD_CLASS + '),.' + DROPPED_CLONE_CLASS :
                '.' + CARD_CLASS + ':not(.' + CLONED_CARD_CLASS + '),.' + DROPPED_CLONE_CLASS;
            const element = [].slice.call(this.dragObj.targetClone.parentElement.querySelectorAll(className));
            dropIndex = element.indexOf(this.dragObj.targetClone);
            if (this.parent.enableVirtualization && !isNullOrUndefined(this.dragObj.targetClone.nextElementSibling)) {
                dataDropIndexKeyfieldValue = this.dragObj.targetClone.nextElementSibling.getAttribute('data-id');
            }
        }
        if (!isNullOrUndefined(this.kanbanObj) && this.kanbanObj.element.querySelector('.' + TARGET_MULTI_CLONE_CLASS)) {
            columnKey = closest(e.target, '.' + MULTI_COLUMN_KEY_CLASS + ':not(.' + DISABLED_CLASS + ')');
        }
        if (contentCell || columnKey) {
            let cardStatus;
            if (contentCell) {
                cardStatus = this.getColumnKey(contentCell);
            }
            else {
                cardStatus = this.getColumnKey(columnKey);
                contentCell = closest(columnKey, '.' + CONTENT_CELLS_CLASS);
            }
            if (this.dragObj.selectedCards instanceof HTMLElement) {
                this.updateDroppedData(this.dragObj.selectedCards, cardStatus, contentCell);
            }
            else {
                this.dragObj.selectedCards.forEach((element) => { this.updateDroppedData(element, cardStatus, contentCell); });
            }
            if (this.parent.sortSettings.field && this.parent.sortSettings.sortBy === 'Index') {
                this.changeOrder(this.dragObj.modifiedData, e.helper);
            }
        }
        if (this.dragObj.modifiedData.length === 0) {
            this.dragObj.modifiedData = this.dragObj.cardDetails;
        }
        const dragArgs = {
            cancel: false, data: this.dragObj.modifiedData, event: e, element: this.dragObj.selectedCards,
            dropIndex: dropIndex
        };
        this.parent.trigger(dragStop, dragArgs, (dragEventArgs) => {
            this.dragStopClear();
            if (!dragEventArgs.cancel) {
                if (contentCell || columnKey) {
                    const updateCard = dragEventArgs.data instanceof Array &&
                        dragEventArgs.data.length > 1 ? dragEventArgs.data :
                        dragEventArgs.data[0];
                    let draggedColumnKey;
                    let droppedColumnKey;
                    if (this.parent.enableVirtualization) {
                        draggedColumnKey = contentCell.closest('.e-kanban').querySelector('.e-dragged-column').getAttribute('data-key');
                        droppedColumnKey = contentCell.getAttribute('data-key');
                    }
                    this.parent.crudModule.updateCard(updateCard, dragEventArgs.dropIndex, true, dataDropIndexKeyfieldValue, draggedColumnKey, droppedColumnKey, isMultipleDrag);
                    if (this.parent.enableVirtualization) {
                        this.parent.virtualLayoutModule.refreshColumnData(draggedColumnKey, droppedColumnKey);
                        this.parent.virtualLayoutModule.ensureColumnNotEmpty(draggedColumnKey);
                    }
                }
            }
            this.removeEmptyTrElement();
            this.dragStopPostClear();
        });
    }
    removeEmptyTrElement() {
        if (!this.parent.swimlaneSettings.showEmptyRow) {
            const swimlaneRowList = this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row');
            for (let j = 0; j < swimlaneRowList.length; j++) {
                const cardRowData = swimlaneRowList[j].nextElementSibling.querySelectorAll('.e-card-wrapper .e-card');
                if (!isNullOrUndefined(swimlaneRowList[j].nextElementSibling) && cardRowData.length === 0) {
                    detach(swimlaneRowList[j].nextElementSibling);
                    detach(swimlaneRowList[j]);
                }
            }
        }
    }
    dragStopClear() {
        this.removeElement(this.dragObj.draggedClone);
        this.removeElement(this.dragObj.targetClone, this.kanbanObj);
        this.removeElement(this.dragObj.cloneElement);
        const dragMultiClone = [].slice.call(this.parent.element.querySelectorAll('.' + DRAGGED_CLONE_CLASS));
        dragMultiClone.forEach((clone) => { remove(clone); });
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
        const styleCards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS + '[style]'));
        styleCards.forEach((styleCard) => { styleCard.style.cursor = ''; });
        const className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + ')';
        const cells = [].slice.call(this.parent.element.querySelectorAll(className + ' .' + CONTENT_CELLS_CLASS));
        cells.forEach((cell) => removeClass([cell], DROPPING_CLASS));
        if (this.parent.externalDropObj) {
            const externalCells = [].slice.call(this.parent.externalDropObj.element.querySelectorAll(className + ' .' +
                CONTENT_CELLS_CLASS));
            externalCells.forEach((externalCell) => removeClass([externalCell], DROPPING_CLASS));
        }
    }
    dragStopPostClear() {
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
    }
    updateDroppedData(element, cardStatus, contentCell) {
        const crudObj = this.parent.getCardDetails(element);
        const crudData = extend({}, crudObj, null, true);
        if (cardStatus.split(',').length === 1) {
            crudData[this.parent.keyField] = cardStatus;
        }
        if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneSettings.allowDragAndDrop) {
            const prev = closest(contentCell, '.' + CONTENT_ROW_CLASS).previousElementSibling;
            if (this.parent.isAdaptive) {
                const keyField = this.parent.layoutModule.kanbanRows[this.parent.layoutModule.swimlaneIndex].keyField;
                crudData[this.parent.swimlaneSettings.keyField] = keyField;
            }
            else {
                crudData[this.parent.swimlaneSettings.keyField] = this.getColumnKey(prev);
            }
        }
        this.dragObj.modifiedData.push(crudData);
    }
    changeOrder(modifieddata, draggedCard) {
        let prevele = false;
        let element;
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
            const obj = this.kanbanObj.getCardDetails(element);
            let keyIndex = obj[this.kanbanObj.sortSettings.field];
            if (modifieddata.length > 1 && this.kanbanObj.sortSettings.direction === 'Descending') {
                modifieddata = modifieddata.reverse();
            }
            modifieddata.forEach((data, index) => {
                if (prevele) {
                    data[this.kanbanObj.sortSettings.field] = ++keyIndex;
                }
                else if (keyIndex !== 1 && index <= data[this.kanbanObj.sortSettings.field]) {
                    data[this.kanbanObj.sortSettings.field] = --keyIndex;
                }
                else if (keyIndex === 1) {
                    data[this.kanbanObj.sortSettings.field] = index + 1;
                }
            });
        }
    }
    toggleVisible(target, tColumn) {
        const headerCells = '.' + HEADER_CELLS_CLASS + ':not(.' + STACKED_HEADER_CELL_CLASS + ')';
        const lists = [].slice.call(this.kanbanObj.element.querySelectorAll(headerCells));
        lists.forEach((list) => {
            if (this.getColumnKey(list) === this.getColumnKey(tColumn || target)) {
                this.kanbanObj.actionModule.columnToggle(list);
            }
        });
        const cloneTarget = closest(this.dragObj.draggedClone, '.' + CONTENT_CELLS_CLASS);
        if (cloneTarget) {
            const width = formatUnit(cloneTarget.offsetWidth - cardSpace);
            this.dragObj.draggedClone.style.width = width;
            this.dragObj.cloneElement.style.width = width;
        }
    }
    multiCloneRemove() {
        const cloneMulti = !isNullOrUndefined(this.kanbanObj) ? [].slice.call(this.kanbanObj.element.querySelectorAll('.' + TARGET_MULTI_CLONE_CLASS)) : [];
        if (cloneMulti.length > 0) {
            const columnKey = [].slice.call(this.kanbanObj.element.querySelectorAll('.' + MULTI_COLUMN_KEY_CLASS));
            columnKey.forEach((node) => remove(node));
            cloneMulti.forEach((node) => {
                const cell = closest(node, '.' + CONTENT_CELLS_CLASS);
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
    }
    calculateArgs(e) {
        const eventArgs = this.getPageCoordinates(e);
        this.dragObj.pageY = eventArgs.pageY;
        this.dragObj.pageX = eventArgs.pageX;
        this.isDragging = true;
        if (this.kanbanObj.isAdaptive && this.kanbanObj.tooltipModule) {
            this.kanbanObj.tooltipModule.tooltipObj.close();
        }
    }
    getPageCoordinates(e) {
        const eventArgs = e.event;
        return eventArgs && eventArgs.changedTouches ? eventArgs.changedTouches[0] : e.changedTouches ? e.changedTouches[0] :
            eventArgs || e;
    }
    getColumnKey(target) {
        if (target && target.getAttribute('data-key')) {
            return target.getAttribute('data-key').trim();
        }
        return '';
    }
    updateScrollPosition() {
        if (isNullOrUndefined(this.dragObj.navigationInterval)) {
            this.dragObj.navigationInterval = window.setInterval(() => { this.autoScroll(); }, 100);
        }
    }
    autoScrollValidation() {
        const pageY = this.dragObj.pageY;
        const pageX = this.dragObj.pageX;
        const autoScrollDistance = 30;
        const dragEdges = { left: false, right: false, top: false, bottom: false };
        const viewBoundaries = this.kanbanObj.element.querySelector('.' + CONTENT_CLASS).getBoundingClientRect();
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
    }
    autoScroll() {
        this.autoScrollValidation();
        const scrollSensitivity = 30;
        if (this.kanbanObj.isAdaptive) {
            let parent;
            if (this.dragEdges.top || this.dragEdges.bottom) {
                if (this.dragObj.targetClone) {
                    parent = closest(this.dragObj.targetClone, '.' + CARD_WRAPPER_CLASS);
                }
                else {
                    parent = closest(this.dragObj.draggedClone, '.' + CARD_WRAPPER_CLASS);
                }
            }
            else if (this.dragEdges.right || this.dragEdges.left) {
                parent = this.kanbanObj.element.querySelector('.' + CONTENT_CLASS);
            }
            if (parent) {
                const yIsScrollable = parent.offsetHeight <= parent.scrollHeight;
                const xIsScrollable = parent.offsetWidth <= parent.scrollWidth;
                const yInBounds = parent.scrollTop >= 0 && parent.scrollTop + parent.offsetHeight <= parent.scrollHeight;
                const xInBounds = parent.scrollLeft >= 0 && parent.scrollLeft + parent.offsetWidth <= parent.scrollWidth;
                if (yIsScrollable && yInBounds && (this.dragEdges.top || this.dragEdges.bottom)) {
                    parent.scrollTop += this.dragEdges.top ? -(scrollSensitivity + 36) : scrollSensitivity;
                }
                if (xIsScrollable && xInBounds && (this.dragEdges.left || this.dragEdges.right)) {
                    const width = this.parent.enableVirtualization ? this.kanbanObj.virtualLayoutModule.getWidth() :
                        this.kanbanObj.layoutModule.getWidth();
                    const scroll = (width * (this.kanbanObj.columns.length - 1)) >
                        parent.scrollLeft;
                    if (scroll || this.dragEdges.left) {
                        parent.scrollLeft += this.dragEdges.left ? -scrollSensitivity : scrollSensitivity;
                    }
                }
            }
        }
        else {
            const parent = this.kanbanObj.element.querySelector('.' + CONTENT_CLASS);
            const column = this.dragObj.targetClone.parentElement;
            const yScrollable = parent.offsetHeight <= parent.scrollHeight;
            const xScrollable = parent.offsetWidth <= parent.scrollWidth;
            const yBounds = yScrollable && parent.scrollTop >= 0 && parent.scrollTop + parent.offsetHeight <= parent.scrollHeight;
            const xBounds = xScrollable && parent.scrollLeft >= 0 && parent.scrollLeft + parent.offsetWidth <= parent.scrollWidth;
            if (yBounds && (this.dragEdges.top || this.dragEdges.bottom)) {
                parent.scrollTop += this.dragEdges.top ? -scrollSensitivity : scrollSensitivity;
                if (this.parent.swimlaneSettings.enableFrozenRows) {
                    this.dragObj.cloneElement.style.top = !this.dragEdges.top ? (parseInt(this.dragObj.cloneElement.style.top, 10) + scrollSensitivity) + 'px' : (parseInt(this.dragObj.cloneElement.style.top, 10) - scrollSensitivity) + 'px';
                }
                if (column) {
                    column.scrollTop += this.dragEdges.top ? -scrollSensitivity : scrollSensitivity;
                }
            }
            if (xBounds && (this.dragEdges.left || this.dragEdges.right)) {
                parent.scrollLeft += this.dragEdges.left ? -scrollSensitivity : scrollSensitivity;
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
    }
    unWireDragEvents(element) {
        if (!isNullOrUndefined(element) && !isNullOrUndefined(element.ej2_instances[0])) {
            const dragInstance = element.ej2_instances[0];
            if (dragInstance && !dragInstance.isDestroyed) {
                dragInstance.destroy();
            }
        }
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Dialog module is used to perform card actions.
 */
class KanbanDialog {
    /**
     * Constructor for dialog module
     *
     * @param {Kanban} parent Accepts the kanban instance
     */
    constructor(parent) {
        this.preventUpdate = false;
        this.parent = parent;
    }
    openDialog(action, data) {
        this.action = action;
        this.parent.activeCardData.data = data;
        this.renderDialog(data, action);
        this.dialogObj.show();
    }
    closeDialog() {
        this.dialogObj.hide();
    }
    renderDialog(args, action) {
        this.element = createElement('div', { id: this.parent.element.id + '_dialog_wrapper' });
        this.parent.element.appendChild(this.element);
        const dialogModel = {
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
    }
    getDialogContent(args, action) {
        if (action === 'Delete') {
            return this.parent.localeObj.getConstant('deleteContent');
        }
        else {
            const container = createElement('div', { className: FORM_WRAPPER_CLASS });
            const form = createElement('form', {
                id: this.parent.element.id + 'EditForm',
                className: FORM_CLASS, attrs: { onsubmit: 'return false;' }
            });
            if (this.parent.dialogSettings.template) {
                if (args) {
                    this.destroyComponents();
                    [].slice.call(form.childNodes).forEach((node) => remove(node));
                }
                const templateId = this.parent.element.id + '_dialogTemplate';
                const dialogTemplate = this.parent.templateParser(this.parent.dialogSettings.template)(args, this.parent, 'dialogTemplate', templateId, false);
                append(dialogTemplate, form);
                this.parent.renderTemplates();
            }
            else {
                const dialogWrapper = createElement('div', { className: DIALOG_CONTENT_CONTAINER });
                form.appendChild(dialogWrapper);
                const table = createElement('table');
                dialogWrapper.appendChild(table);
                const dialogFields = this.getDialogFields();
                for (const field of dialogFields) {
                    const tr = createElement('tr');
                    table.appendChild(tr);
                    tr.appendChild(createElement('td', { className: 'e-label', innerHTML: field.text ? field.text : field.key }));
                    const td = createElement('td');
                    tr.appendChild(td);
                    td.appendChild(this.renderComponents(field));
                }
            }
            container.appendChild(form);
            return container;
        }
    }
    getDialogFields() {
        let fields = this.parent.dialogSettings.fields;
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
    }
    getDialogButtons(action) {
        const primaryButtonClass = action === 'Delete' ? 'e-dialog-yes' : action === 'Add' ? 'e-dialog-add' : 'e-dialog-edit';
        const flatButtonClass = action === 'Delete' ? 'e-dialog-no' : 'e-dialog-cancel';
        const dialogButtons = [
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
            const deleteButton = {
                buttonModel: { cssClass: 'e-flat e-dialog-delete', isPrimary: false, content: this.parent.localeObj.getConstant('delete') },
                click: this.dialogButtonClick.bind(this)
            };
            dialogButtons.splice(0, 0, deleteButton);
        }
        return dialogButtons;
    }
    renderComponents(field) {
        const wrapper = createElement('div', { className: field.key + '_wrapper' });
        let element = createElement('input', { className: FIELD_CLASS, attrs: { 'name': field.key } });
        wrapper.appendChild(element);
        let divElement;
        let dropDownOptions;
        let controlObj;
        const fieldValue = this.parent.activeCardData.data ?
            this.parent.activeCardData.data[field.key] : null;
        switch (field.type) {
            case 'DropDown':
                if (field.key === this.parent.keyField) {
                    let currentKeys = this.parent.enableVirtualization ?
                        this.parent.virtualLayoutModule.columnKeys : this.parent.layoutModule.columnKeys;
                    if (this.parent.actionModule.hideColumnKeys.length > 0) {
                        currentKeys = [];
                        for (let i = 0; i < this.parent.columns.length; i++) {
                            const isColumnVisible = this.parent.enableVirtualization ?
                                this.parent.virtualLayoutModule.isColumnVisible(this.parent.columns[i]) :
                                this.parent.layoutModule.isColumnVisible(this.parent.columns[i]);
                            if (isColumnVisible) {
                                const isNumeric = typeof this.parent.columns[i].keyField === 'number';
                                if (isNumeric) {
                                    currentKeys = currentKeys.concat(this.parent.columns[i].keyField.toString());
                                }
                                else {
                                    currentKeys = currentKeys.concat(this.parent.columns[i].keyField.split(',').map((e) => e.trim()));
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
    }
    onBeforeDialogOpen(args) {
        const eventProp = {
            data: this.parent.activeCardData.data,
            cancel: false, element: this.element,
            target: this.parent.activeCardData.element,
            requestType: this.action
        };
        this.storeElement = document.activeElement;
        if (parseInt(args.maxHeight, 10) <= 250) {
            args.maxHeight = '250px';
        }
        this.parent.trigger(dialogOpen, eventProp, (openArgs) => {
            args.cancel = openArgs.cancel;
            if (openArgs.cancel) {
                this.destroy();
            }
        });
    }
    onBeforeDialogClose(args) {
        const formInputs = this.getFormElements();
        let cardObj = {};
        if (args.isInteracted) {
            /* close icon preventing data update */
            this.preventUpdate = true;
        }
        if (!this.preventUpdate) {
            for (const input of formInputs) {
                const columnName = input.name || this.getColumnName(input);
                if (!isNullOrUndefined(columnName) && columnName !== '') {
                    let value = this.getValueFromElement(input);
                    if (columnName === this.parent.cardSettings.headerField) {
                        value = this.getIDType() === 'string' ? value : parseInt(value, 10);
                    }
                    cardObj[columnName] = value;
                }
            }
        }
        this.preventUpdate = false;
        cardObj = extend(this.parent.activeCardData.data, cardObj);
        const eventProp = { data: cardObj, cancel: false, element: this.element, requestType: this.action };
        this.parent.trigger(dialogClose, eventProp, (closeArgs) => {
            args.cancel = closeArgs.cancel;
            if (!closeArgs.cancel) {
                this.cardData = eventProp.data;
                this.destroy();
                this.parent.actionModule.SingleCardSelection(this.cardData);
            }
        });
    }
    getIDType() {
        if (this.parent.kanbanData.length !== 0) {
            return typeof (this.parent.kanbanData[0][this.parent.cardSettings.headerField]);
        }
        return 'string';
    }
    applyFormValidation() {
        const form = this.element.querySelector('.' + FORM_CLASS);
        const rules = {};
        for (const field of this.parent.dialogSettings.fields) {
            rules[field.key] = (field.validationRules && Object.keys(field.validationRules).length > 0) ? field.validationRules : null;
        }
        this.formObj = new FormValidator(form, {
            rules: rules,
            customPlacement: (inputElement, error) => {
                const id = error.getAttribute('for');
                const elem = this.element.querySelector('#' + id + '_Error');
                if (!elem) {
                    this.createTooltip(inputElement, error, id, '');
                }
            },
            validationComplete: (args) => {
                const elem = this.element.querySelector('#' + args.inputName + '_Error');
                if (elem) {
                    elem.style.display = (args.status === 'failure') ? '' : 'none';
                }
            }
        });
    }
    createTooltip(element, error, name, display) {
        let dlgContent;
        let client;
        const inputClient = element.parentElement.getBoundingClientRect();
        if (this.element.classList.contains(DIALOG_CLASS)) {
            dlgContent = this.element;
            client = this.element.getBoundingClientRect();
        }
        else {
            dlgContent = this.element.querySelector('.e-kanban-dialog .e-dlg-content');
            client = dlgContent.getBoundingClientRect();
        }
        const div = createElement('div', {
            className: 'e-tooltip-wrap e-popup ' + ERROR_VALIDATION_CLASS,
            id: name + '_Error',
            styles: 'display:' + display + ';top:' +
                (inputClient.bottom - client.top + dlgContent.scrollTop + 9) + 'px;left:' +
                (inputClient.left - client.left + dlgContent.scrollLeft + inputClient.width / 2) + 'px;'
        });
        const content = createElement('div', { className: 'e-tip-content' });
        content.appendChild(error);
        const arrow = createElement('div', { className: 'e-arrow-tip e-tip-top' });
        arrow.appendChild(createElement('div', { className: 'e-arrow-tip-outer e-tip-top' }));
        arrow.appendChild(createElement('div', { className: 'e-arrow-tip-inner e-tip-top' }));
        div.appendChild(content);
        div.appendChild(arrow);
        dlgContent.appendChild(div);
        div.style.left = (parseInt(div.style.left, 10) - div.offsetWidth / 2) + 'px';
    }
    destroyToolTip() {
        if (this.element) {
            this.element.querySelectorAll('.' + ERROR_VALIDATION_CLASS).forEach((node) => remove(node));
        }
        if (this.formObj && this.formObj.element) {
            this.formObj.reset();
        }
    }
    dialogButtonClick(event) {
        let target = event.target.cloneNode(true);
        if (!isNullOrUndefined(event.keyCode) && event.keyCode === 13) {
            const valTrg = this.dialogObj.element.querySelector('.e-footer-content button.e-primary');
            target = valTrg.cloneNode(true);
        }
        const id = this.formObj.element.id;
        if (document.getElementById(id) && this.formObj.validate() &&
            (target.classList.contains('e-dialog-edit') || target.classList.contains('e-dialog-add'))) {
            this.dialogObj.hide();
            if (!isNullOrUndefined(this.cardData)) {
                if (target.classList.contains('e-dialog-edit')) {
                    const activeCard = this.parent.activeCardData;
                    let updateIndex;
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
    }
    getFormElements() {
        const elements = [].slice.call(this.element.querySelectorAll('.' + FIELD_CLASS));
        const validElements = [];
        for (const element of elements) {
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
    }
    getColumnName(element) {
        let attrName = element.getAttribute('data-name') || '';
        if (attrName === '') {
            let isDropDowns = false;
            let fieldSelector = '';
            if (element.classList.contains('e-dropdownlist') || element.classList.contains('e-multiselect')) {
                fieldSelector = element.classList.contains('e-dropdownlist') ? 'e-ddl' : 'e-multiselect';
                isDropDowns = true;
            }
            else if (element.classList.contains('e-numerictextbox')) {
                fieldSelector = 'e-numeric';
            }
            const classSelector = isDropDowns ? `.${fieldSelector}:not(.e-control)` : `.${fieldSelector}`;
            const control = closest(element, classSelector) || element.querySelector(`.${fieldSelector}`);
            if (control) {
                const attrEle = control.querySelector('[name]');
                if (attrEle) {
                    attrName = attrEle.name;
                }
            }
        }
        return attrName;
    }
    getValueFromElement(element) {
        let value;
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
    }
    destroyComponents() {
        const formelement = this.getFormElements();
        for (const element of formelement) {
            const instance = element.ej2_instances;
            if (instance && instance.length > 0) {
                instance.forEach((node) => node.destroy());
            }
            if (this.parent.isReact && this.formObj) {
                this.formObj.element.remove();
            }
        }
    }
    destroy() {
        this.destroyToolTip();
        this.destroyComponents();
        if (this.dialogObj) {
            this.dialogObj.destroy();
            this.storeElement.focus();
            this.dialogObj = null;
            remove(this.element);
            this.element = null;
        }
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Kanban keyboard module
 */
class Keyboard {
    /**
     * Constructor for keyboard module
     *
     * @param {Kanban} parent Accepts the kanban instance
     */
    constructor(parent) {
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
    keyActionHandler(e) {
        const selectedCard = this.parent.element.querySelectorAll(`.${CARD_CLASS}.${CARD_SELECTION_CLASS}`).item(0);
        if (!selectedCard && !closest(document.activeElement, `.${ROOT_CLASS}`)) {
            return;
        }
        let contentCell;
        let selectedCards;
        const selectedCardsData = [];
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
                        const ele = closest(document.activeElement, '.' + CONTENT_CELLS_CLASS);
                        const cards = [].slice.call(ele.querySelectorAll('.' + CARD_CLASS));
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
                selectedCards = [].slice.call(this.parent.element.querySelectorAll(`.${CARD_CLASS}.${CARD_SELECTION_CLASS}`));
                selectedCards.forEach((selected) => { selectedCardsData.push(this.parent.getCardDetails(selected)); });
                this.parent.crudModule.deleteCard(selectedCardsData);
                break;
        }
    }
    processCardSelection(action, selectedCard) {
        if (selectedCard) {
            removeClass([selectedCard], CARD_SELECTION_CLASS);
            if (this.parent.enableVirtualization) {
                this.parent.virtualLayoutModule.disableAttributeSelection(selectedCard);
            }
            else {
                this.parent.layoutModule.disableAttributeSelection(selectedCard);
            }
            const selection = this.parent.actionModule.selectionArray;
            selection.splice(selection.indexOf(selectedCard.getAttribute('data-id')), 1);
        }
        this.cardTabIndexRemove();
        const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS));
        const element = action === 'firstCardSelection' ? cards[0] : cards[cards.length - 1];
        this.parent.actionModule.cardSelection(element, false, false);
        this.addRemoveTabIndex('Remove');
        element.focus();
        const card = [].slice.call(closest(element, '.' + CONTENT_CELLS_CLASS).querySelectorAll('.' + CARD_CLASS));
        card.forEach((element) => { element.setAttribute('tabindex', '0'); });
    }
    processLeftRightArrow(e) {
        if (document.activeElement.classList.contains(CONTENT_CELLS_CLASS)) {
            if (e.action === 'rightArrow' && document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus();
            }
            else if (e.action === 'leftArrow' && document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus();
            }
        }
    }
    processUpDownArrow(action, selectedCard) {
        if (action === 'upArrow' && document.activeElement) {
            if (document.activeElement.classList.contains(CARD_CLASS) && document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus();
            }
            else if (document.activeElement.classList.contains(SHOW_ADD_BUTTON)) {
                document.activeElement.setAttribute('tabindex', '-1');
                removeClass([document.activeElement], SHOW_ADD_FOCUS);
                const cell = closest(document.activeElement, '.' + CONTENT_CELLS_CLASS);
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
                const ele = closest(document.activeElement, '.' + CARD_WRAPPER_CLASS).nextElementSibling;
                ele.setAttribute('tabindex', '0');
                addClass([ele], SHOW_ADD_FOCUS);
                ele.focus();
            }
            this.removeSelection();
        }
        if ((action === 'multiSelectionByUpArrow' || action === 'multiSelectionByDownArrow')
            && selectedCard && this.parent.cardSettings.selectionType === 'Multiple') {
            let card;
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
    }
    removeSelection() {
        if (this.multiSelection) {
            const cards = this.parent.getSelectedCards();
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
    }
    cardTabIndexRemove() {
        const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS));
        cards.forEach((card) => { card.setAttribute('tabindex', '-1'); });
        const addButton = [].slice.call(this.parent.element.querySelectorAll('.' + SHOW_ADD_BUTTON));
        addButton.forEach((add) => {
            add.setAttribute('tabindex', '-1');
            removeClass([add], SHOW_ADD_FOCUS);
        });
    }
    processEnter(e, selectedCard) {
        if (e.action === 'space') {
            e.preventDefault();
        }
        const element = (e.target);
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
            const cards = [].slice.call(element.querySelectorAll('.' + CARD_CLASS));
            this.addRemoveTabIndex('Remove');
            if (cards.length > 0) {
                element.querySelector('.' + CARD_CLASS).focus();
                cards.forEach((element) => { element.setAttribute('tabindex', '0'); });
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
    }
    addRemoveTabIndex(action) {
        const attribute = action === 'Add' ? '0' : '-1';
        const headerIcon = [].slice.call(this.parent.element.querySelectorAll('.' + HEADER_ICON_CLASS));
        if (headerIcon.length > 0) {
            headerIcon.forEach((element) => { element.setAttribute('tabindex', attribute); });
        }
        const swimlaneIcon = [].slice.call(this.parent.element.querySelectorAll('.' + SWIMLANE_ROW_EXPAND_CLASS));
        if (swimlaneIcon.length > 0) {
            swimlaneIcon.forEach((element) => { element.setAttribute('tabindex', attribute); });
        }
        const className = '.' + CONTENT_ROW_CLASS + ':not(.' + SWIMLANE_ROW_CLASS + ') .' + CONTENT_CELLS_CLASS;
        const contentCell = [].slice.call(this.parent.element.querySelectorAll(className));
        contentCell.forEach((element) => { element.setAttribute('tabindex', attribute); });
    }
    destroy() {
        this.keyboardModule.destroy();
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Tooltip for Kanban board
 */
class KanbanTooltip {
    /**
     * Constructor for tooltip module
     *
     * @param {Kanban} parent Accepts the kanban instance
     */
    constructor(parent) {
        this.parent = parent;
        this.renderTooltip();
    }
    renderTooltip() {
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
    }
    onBeforeRender(args) {
        if (this.parent.dragAndDropModule.isDragging) {
            args.cancel = true;
            return;
        }
        let tooltipContent;
        if (this.parent.tooltipTemplate) {
            tooltipContent = createElement('div');
            const target = closest(args.target, '.' + CARD_CLASS);
            const data = this.parent.getCardDetails(target);
            const templateId = this.parent.element.id + '_tooltipTemplate';
            const tooltipTemplate = this.parent.templateParser(this.parent.tooltipTemplate)(data, this.parent, 'tooltipTemplate', templateId, false);
            append(tooltipTemplate, tooltipContent);
            this.parent.renderTemplates();
        }
        else {
            tooltipContent = initializeCSPTemplate(function () {
                return `<div class="e-card-header-caption">${args.target.innerText}</div>`;
            });
        }
        this.tooltipObj.setProperties({ content: tooltipContent }, true);
    }
    onBeforeClose() {
        this.parent.resetTemplates(['tooltipTemplate']);
    }
    destroy() {
        this.tooltipObj.destroy();
        addClass([this.parent.element], 'e-control');
        this.tooltipObj = null;
    }
}

/**
 * Kanban touch module
 */
class KanbanTouch {
    /**
     * Constructor for touch module
     *
     * @param {Kanban} parent Accepts the kanban instance
     * @private
     */
    constructor(parent) {
        this.parent = parent;
        this.tabHold = false;
    }
    wireTouchEvents() {
        this.element = this.parent.element.querySelector('.' + CONTENT_CLASS);
        this.touchObj = new Touch(this.element, { tapHold: this.tapHoldHandler.bind(this) });
    }
    tapHoldHandler(e) {
        this.tabHold = true;
        const target = closest(e.originalEvent.target, '.' + CARD_CLASS);
        if (target && this.parent.cardSettings.selectionType === 'Multiple') {
            this.parent.actionModule.cardSelection(target, true, false);
            if (!this.mobilePopup) {
                this.renderMobilePopup();
                this.mobilePopup.show();
            }
            this.updatePopupContent();
        }
    }
    renderMobilePopup() {
        if (this.parent.cardSettings.selectionType === 'Multiple') {
            const mobilePopupWrapper = createElement('div', {
                className: POPUP_WRAPPER_CLASS + ' e-popup-close',
                innerHTML: `<div class="${POPUP_HEADER_CLASS}"><button class="${CLOSE_CLASS}"></button></div>` +
                    `<div class="${POPUP_CONTENT_CLASS}"></div>`
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
            const closeIcon = this.mobilePopup.element.querySelector('.' + CLOSE_CLASS);
            const buttonObj = new Button({
                cssClass: 'e-flat e-round e-small',
                enableRtl: this.parent.enableRtl,
                iconCss: ICON_CLASS + ' ' + CLOSE_ICON_CLASS
            });
            buttonObj.appendTo(closeIcon);
            buttonObj.isStringTemplate = true;
            EventHandler.add(closeIcon, 'click', this.closeClick, this);
        }
    }
    getPopupContent() {
        let popupContent;
        const selectedCards = this.parent.getSelectedCards();
        if (selectedCards.length > 1) {
            popupContent = '(' + selectedCards.length + ') ' + this.parent.localeObj.getConstant('cardsSelected');
        }
        else if (selectedCards.length === 1) {
            popupContent = ' ' + this.parent.getCardDetails(selectedCards[0])[this.parent.cardSettings.headerField];
        }
        return popupContent;
    }
    updatePopupContent() {
        if (!this.mobilePopup) {
            return;
        }
        const popupContent = this.getPopupContent();
        if (popupContent) {
            this.mobilePopup.element.querySelector('.' + POPUP_CONTENT_CLASS).textContent = popupContent;
        }
        else {
            this.mobilePopup.hide();
        }
    }
    closeClick() {
        this.parent.touchModule.mobilePopup.hide();
    }
    popupClose() {
        this.popupDestroy();
    }
    popupDestroy() {
        if (this.mobilePopup && this.mobilePopup.element) {
            const instance = this.mobilePopup.element.querySelector('.e-control.e-btn').ej2_instances[0];
            if (instance) {
                instance.destroy();
            }
            this.mobilePopup.destroy();
            remove(this.mobilePopup.element);
            this.mobilePopup = null;
        }
    }
    unWireTouchEvents() {
        if (this.touchObj) {
            this.touchObj.destroy();
        }
        this.touchObj = null;
        this.element = null;
    }
    destroy() {
        this.popupDestroy();
        this.unWireTouchEvents();
        this.tabHold = false;
    }
}

/**
 * Kanban mobile layout rendering module
 *
 */
class MobileLayout {
    constructor(parent) {
        this.parent = parent;
    }
    renderSwimlaneHeader() {
        const toolbarWrapper = createElement('div', {
            className: SWIMLANE_HEADER_CLASS,
            innerHTML: '<div class="' + SWIMLANE_HEADER_TOOLBAR_CLASS + '"><div class="' + TOOLBAR_MENU_CLASS +
                '"><div class="e-icons ' + TOOLBAR_MENU_ICON_CLASS + '"></div></div><div class="' + TOOLBAR_LEVEL_TITLE_CLASS +
                '"><div class="' + TOOLBAR_SWIMLANE_NAME_CLASS + '"></div></div></div>'
        });
        this.parent.element.appendChild(toolbarWrapper);
        EventHandler.add(toolbarWrapper.querySelector('.' + TOOLBAR_MENU_ICON_CLASS), 'click', this.menuClick, this);
    }
    renderSwimlaneTree() {
        const height = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS).offsetHeight;
        const treeHeight = window.innerHeight - height;
        this.popupOverlay = createElement('div', { className: SWIMLANE_OVERLAY_CLASS, styles: 'height: ' + treeHeight + 'px;' });
        const wrapper = createElement('div', { className: SWIMLANE_CONTENT_CLASS, styles: 'top:' + height + 'px;' });
        const treeWrapper = createElement('div', {
            className: SWIMLANE_RESOURCE_CLASS + ' e-popup-close', styles: 'height: ' + treeHeight + 'px;'
        });
        wrapper.appendChild(treeWrapper);
        wrapper.appendChild(this.popupOverlay);
        this.parent.element.appendChild(wrapper);
        const swimlaneTree = createElement('div', { className: SWIMLANE_TREE_CLASS });
        treeWrapper.appendChild(swimlaneTree);
        const dataSource = this.parent.enableVirtualization ?
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
        const popupObj = {
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
    }
    menuClick() {
        if (this.parent.element.querySelector('.' + SWIMLANE_RESOURCE_CLASS).classList.contains('e-popup-open')) {
            this.treePopup.hide();
            removeClass([this.popupOverlay], 'e-enable');
        }
        else {
            const treeNodes = [].slice.call(this.treeViewObj.element.querySelectorAll('.e-list-item'));
            removeClass(treeNodes, 'e-active');
            addClass([treeNodes[this.parent.layoutModule.swimlaneIndex]], 'e-active');
            this.treePopup.show();
            addClass([this.popupOverlay], 'e-enable');
        }
    }
    treeSwimlaneClick(args) {
        this.treePopup.hide();
        const treeNodes = [].slice.call(this.treeViewObj.element.querySelectorAll('.e-list-item'));
        this.parent.layoutModule.swimlaneIndex = treeNodes.indexOf(args.node);
        this.parent.layoutModule.scrollLeft = 0;
        this.parent.notify(dataReady, { processedData: this.parent.kanbanData });
        args.event.preventDefault();
    }
    hidePopup() {
        this.treePopup.hide();
        removeClass([this.popupOverlay], 'e-enable');
    }
    getWidth() {
        return (window.innerWidth * 80) / 100;
    }
    drawNode(args) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.swimlaneSettings.template && this.parent.isReact) {
            const templateId = this.parent.element.id + '_treeviewTemplate';
            const treeViewTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(args.nodeData, this.parent, 'nodeTemplate', templateId, false);
            append(treeViewTemplate, args.node.querySelector('.e-list-text'));
        }
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Kanban layout rendering module
 *
 */
class LayoutRender extends MobileLayout {
    constructor(parent) {
        super(parent);
        this.kanbanRows = [];
        this.parent = parent;
        this.columnKeys = [];
        this.swimlaneIndex = 0;
        this.swimlaneData = {};
        this.scrollLeft = 0;
        this.frozenOrder = 0;
        this.parent.on(dataReady, this.initRender, this);
        this.parent.on(contentReady, this.scrollUiUpdate, this);
    }
    initRender() {
        if (this.parent.columns.length === 0) {
            return;
        }
        this.columnData = this.getColumnCards();
        this.kanbanRows = this.getRows();
        this.swimlaneData = this.getSwimlaneCards();
        if (this.parent.isAdaptive) {
            const parent = this.parent.element.querySelector('.' + CONTENT_CLASS);
            if (parent) {
                this.scrollLeft = parent.scrollLeft;
            }
        }
        this.destroy();
        this.parent.on(dataReady, this.initRender, this);
        this.parent.on(contentReady, this.scrollUiUpdate, this);
        if (this.parent.isAdaptive && this.parent.swimlaneSettings.keyField && this.parent.kanbanData.length !== 0) {
            this.renderSwimlaneHeader();
        }
        const header = createElement('div', { className: HEADER_CLASS });
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
    }
    renderHeader(header) {
        const headerWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        header.appendChild(headerWrap);
        const headerTable = createElement('table', {
            className: TABLE_CLASS + ' ' + HEADER_TABLE_CLASS
        });
        headerWrap.appendChild(headerTable);
        this.renderColGroup(headerTable);
        const tableHead = createElement('thead');
        const tableBody = createElement('tbody', { className: 'e-hide', innerHTML: '<tr><td></td></tr>', attrs: { 'role': 'rowgroup' } });
        headerTable.appendChild(tableBody);
        headerTable.appendChild(tableHead);
        if (this.parent.stackedHeaders.length > 0) {
            tableHead.appendChild(this.createStackedRow(this.parent.stackedHeaders));
        }
        const tr = createElement('tr', { className: HEADER_ROW_CLASS });
        tableHead.appendChild(tr);
        for (const column of this.parent.columns) {
            if (this.isColumnVisible(column)) {
                const index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                const th = createElement('th', {
                    className: index === -1 ? HEADER_CELLS_CLASS : HEADER_CELLS_CLASS + ' ' + COLLAPSED_CLASS,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'scope': 'col' }
                });
                const classList = [];
                if (column.allowToggle) {
                    classList.push(HEADER_ROW_TOGGLE_CLASS);
                    if (!column.isExpanded) {
                        classList.push(COLLAPSED_CLASS);
                    }
                }
                addClass([th], classList);
                const headerWrapper = createElement('div', { className: HEADER_WRAP_CLASS });
                th.appendChild(headerWrapper);
                this.columnData = this.getColumnCards(this.parent.kanbanData);
                const noOfCard = this.columnData[column.keyField].length;
                const headerTitle = createElement('div', { className: HEADER_TITLE_CLASS });
                headerWrapper.appendChild(headerTitle);
                if (column.template) {
                    const templateArgs = {
                        keyField: column.keyField, headerText: column.headerText, minCount: column.minCount, maxCount: column.maxCount,
                        allowToggle: column.allowToggle, isExpanded: column.isExpanded, showItemCount: column.showItemCount, count: noOfCard
                    };
                    addClass([th], TEMPLATE_CLASS);
                    const templateId = this.parent.element.id + '_columnTemplate';
                    const templateHeader = this.parent.templateParser(column.template)(templateArgs, this.parent, 'columnTemplate', templateId, false);
                    append(templateHeader, headerTitle);
                }
                else {
                    const header = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: column.headerText });
                    headerTitle.appendChild(header);
                    if (column.showItemCount) {
                        const itemCount = createElement('div', {
                            className: CARD_ITEM_COUNT_CLASS,
                            innerHTML: '- ' + noOfCard.toString() + ' ' + this.parent.localeObj.getConstant('items')
                        });
                        headerTitle.appendChild(itemCount);
                    }
                }
                if (column.allowToggle) {
                    const isExpand = (column.isExpanded && index === -1) ? true : false;
                    const name = (isExpand) ? COLUMN_EXPAND_CLASS : COLUMN_COLLAPSE_CLASS;
                    const icon = createElement('div', {
                        className: HEADER_ICON_CLASS + ' ' + ICON_CLASS + ' ' + name,
                        attrs: { 'tabindex': '0', 'role': 'button' }
                    });
                    icon.setAttribute('aria-label', isExpand ? column.keyField + ' Expand' : column.keyField + ' Collapse');
                    th.setAttribute('aria-expanded', isExpand.toString());
                    headerWrapper.appendChild(icon);
                }
                const dataObj = [{ keyField: column.keyField, textField: column.headerText, count: noOfCard }];
                const args = { data: dataObj, element: tr, cancel: false, requestType: 'headerRow' };
                this.parent.trigger(queryCellInfo, args, (columnArgs) => {
                    if (!columnArgs.cancel) {
                        tr.appendChild(th);
                    }
                });
            }
        }
    }
    renderContent() {
        const content = createElement('div', { className: CONTENT_CLASS });
        this.parent.element.appendChild(content);
        const contentWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        content.appendChild(contentWrap);
        const contentTable = createElement('table', {
            className: TABLE_CLASS + ' ' + CONTENT_TABLE_CLASS, attrs: { 'role': 'presentation' }
        });
        contentWrap.appendChild(contentTable);
        this.renderColGroup(contentTable);
        const tHead = createElement('thead', { className: 'e-hide', attrs: { 'role': 'none' } });
        for (const column of this.parent.columns) {
            const thElem = createElement('th', { id: column.keyField, innerHTML: column.keyField, attrs: { 'scope': 'col' } });
            thElem.style.display = 'none';
            tHead.appendChild(thElem);
        }
        contentTable.appendChild(tHead);
        const tBody = createElement('tbody', { attrs: { 'role': 'treegrid', 'aria-label': 'Kanban Content' } });
        contentTable.appendChild(tBody);
        let isCollaspsed = false;
        this.swimlaneRow = this.kanbanRows;
        this.initializeSwimlaneTree();
        for (const row of this.swimlaneRow) {
            if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneToggleArray.length !== 0) {
                const index = this.parent.swimlaneToggleArray.indexOf(row.keyField);
                isCollaspsed = index !== -1;
            }
            if (this.parent.swimlaneSettings.keyField && !this.parent.isAdaptive) {
                this.renderSwimlaneRow(tBody, row, isCollaspsed);
            }
            this.renderSingleContent(tBody, row, isCollaspsed);
        }
    }
    renderSingleContent(tBody, row, isCollaspsed) {
        const className = isCollaspsed ? CONTENT_ROW_CLASS + ' ' + COLLAPSED_CLASS : CONTENT_ROW_CLASS;
        const tr = createElement('tr', { className: className,
            attrs: { 'role': 'row', 'aria-label': row.keyField + 'row content' } });
        for (const column of this.parent.columns) {
            if (this.isColumnVisible(column)) {
                const index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                const className = index === -1 ? CONTENT_CELLS_CLASS : CONTENT_CELLS_CLASS + ' ' + COLLAPSED_CLASS;
                const dragClass = (column.allowDrag ? ' ' + DRAG_CLASS : '') + (column.allowDrop ? ' ' + DROP_CLASS
                    + ' ' + DROPPABLE_CLASS : '');
                const td = createElement('td', {
                    className: className + dragClass, attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'tabindex': '0',
                        'aria-describedby': column.keyField.toString(), 'role': 'gridcell' }
                });
                if (column.allowToggle && !column.isExpanded || index !== -1) {
                    addClass([td], COLLAPSED_CLASS);
                    const text = (column.showItemCount ? '[' +
                        this.getColumnData(column.keyField, this.swimlaneData[row.keyField]).length + '] ' : '') + column.headerText;
                    td.appendChild(createElement('div', { className: COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                    td.setAttribute('aria-expanded', 'false');
                }
                if (column.showAddButton) {
                    const button = createElement('div', { className: SHOW_ADD_BUTTON, attrs: { 'tabindex': '-1' } });
                    button.appendChild(createElement('div', { className: SHOW_ADD_ICON + ' ' + ICON_CLASS }));
                    td.appendChild(button);
                }
                tr.appendChild(td);
            }
        }
        const dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        const args = { data: dataObj, element: tr, cancel: false, requestType: 'contentRow' };
        this.parent.trigger(queryCellInfo, args, (columnArgs) => {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    }
    initializeSwimlaneTree() {
        if (this.parent.swimlaneSettings.keyField && this.parent.isAdaptive && this.parent.kanbanData.length !== 0) {
            const swimlaneHeaderName = this.parent.element.querySelector('.' + TOOLBAR_SWIMLANE_NAME_CLASS);
            this.swimlaneRow = [this.kanbanRows[this.swimlaneIndex]];
            this.renderSwimlaneTree();
            if (this.parent.swimlaneSettings.template) {
                const cardCount = this.swimlaneData[this.swimlaneRow[0].keyField].length;
                const templateArgs = extend({}, this.swimlaneRow[0], { count: cardCount }, true);
                const swimlaneTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(templateArgs, this.parent, 'swimlaneTemplate', '', false);
                swimlaneHeaderName.appendChild(swimlaneTemplate[0]);
            }
            else {
                swimlaneHeaderName.innerHTML = this.swimlaneRow[0].textField;
                if (this.parent.swimlaneSettings.showItemCount) {
                    const cardCount = this.swimlaneData[this.swimlaneRow[0].keyField].length;
                    const targetItemCountElement = this.parent.element.querySelector('.' + SWIMLANE_HEADER_TOOLBAR_CLASS);
                    let itemCountElement;
                    let itemCountInnerElement;
                    if (!isNullOrUndefined(targetItemCountElement)) {
                        itemCountElement = createElement('div', { className: TOOLBAR_SWIMLANE_ITEM_COUNT_CLASS });
                        itemCountInnerElement = createElement('div', { className: CARD_ITEM_COUNT_CLASS });
                        itemCountElement.appendChild(itemCountInnerElement);
                        targetItemCountElement.appendChild(itemCountElement);
                    }
                    itemCountInnerElement.innerHTML = `- ${cardCount} ${this.parent.localeObj.getConstant('items')}`;
                }
            }
        }
    }
    renderSwimlaneRow(tBody, row, isCollapsed) {
        const name = CONTENT_ROW_CLASS + ' ' + SWIMLANE_ROW_CLASS;
        const className = isCollapsed ? ' ' + COLLAPSED_CLASS : '';
        const tr = createElement('tr', {
            className: name + className, attrs: { 'aria-label': row.keyField + ' row header',
                'role': 'row', 'data-key': row.keyField, 'aria-expanded': (!isCollapsed).toString() }
        });
        const col = this.parent.columns.length - this.parent.actionModule.hideColumnKeys.length;
        const td = createElement('td', { className: CONTENT_CELLS_CLASS,
            attrs: { 'data-role': 'kanban-column', 'role': 'gridcell', colspan: col.toString() } });
        const swimlaneHeader = createElement('div', { className: SWIMLANE_HEADER_CLASS });
        td.appendChild(swimlaneHeader);
        const iconClass = isCollapsed ? SWIMLANE_ROW_COLLAPSE_CLASS : SWIMLANE_ROW_EXPAND_CLASS;
        const iconDiv = createElement('div', {
            className: ICON_CLASS + ' ' + iconClass, attrs: {
                'tabindex': '0', 'role': 'button', 'aria-label': isCollapsed ? row.keyField + ' Collapse' : row.keyField + ' Expand'
            }
        });
        swimlaneHeader.appendChild(iconDiv);
        const headerWrap = createElement('div', { className: HEADER_WRAP_CLASS });
        swimlaneHeader.appendChild(headerWrap);
        const cardCount = this.swimlaneData[row.keyField].length;
        if (this.parent.swimlaneSettings.template) {
            const templateArgs = extend({}, row, { count: cardCount }, true);
            addClass([td], TEMPLATE_CLASS);
            const templateId = this.parent.element.id + '_swimlaneTemplate';
            const swimlaneTemplate = this.parent.templateParser(this.parent.swimlaneSettings.template)(templateArgs, this.parent, 'swimlaneTemplate', templateId, false);
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
                innerHTML: `- ${cardCount.toString()} ${this.parent.localeObj.getConstant('items')}`
            }));
        }
        tr.appendChild(td);
        const dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        const args = { data: dataObj, element: tr, cancel: false, requestType: 'swimlaneRow' };
        this.parent.trigger(queryCellInfo, args, (columnArgs) => {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    }
    renderCards() {
        const rows = this.swimlaneRow;
        const cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        const swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row'));
        const removeTrs = [];
        let columnTransition = false;
        cardRows.forEach((tr, index) => {
            let dataCount = 0;
            for (const column of this.parent.columns) {
                if (this.isColumnVisible(column)) {
                    const columnData = this.parent.swimlaneSettings.keyField ?
                        this.getColumnData(column.keyField, (this.parent.swimlaneSettings.showEmptyRow &&
                            isNullOrUndefined(this.swimlaneData[rows[index].keyField])) ? []
                            : this.swimlaneData[rows[index].keyField]) : this.columnData[column.keyField];
                    dataCount += columnData.length;
                    const columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    const cardWrapper = createElement('div', {
                        className: CARD_WRAPPER_CLASS, attrs: { 'role': 'listbox', 'tabindex': '0',
                            'aria-label': column.keyField.toString()
                        }
                    });
                    if (column.transitionColumns.length > 0) {
                        columnTransition = true;
                    }
                    if (!columnTransition && isNullOrUndefined(this.parent.swimlaneSettings.keyField)) {
                        const borderElem = createElement('div', { className: BORDER_CLASS });
                        columnWrapper.appendChild(borderElem);
                    }
                    columnWrapper.appendChild(cardWrapper);
                    if (columnData.length > 0) {
                        for (const data of columnData) {
                            const cardText = data[this.parent.cardSettings.headerField];
                            const cardIndex = this.parent.actionModule.selectionArray.indexOf(cardText);
                            const cardElement = this.renderCard(data);
                            if (cardIndex !== -1) {
                                cardElement.setAttribute('aria-selected', 'true');
                                addClass([cardElement], CARD_SELECTION_CLASS);
                            }
                            const args = { data: data, element: cardElement, cancel: false };
                            this.parent.trigger(cardRendered, args, (cardArgs) => {
                                if (!cardArgs.cancel) {
                                    cardWrapper.appendChild(cardElement);
                                }
                            });
                        }
                    }
                    else {
                        cardWrapper.appendChild(this.renderEmptyCard());
                    }
                }
            }
            if (dataCount === 0) {
                removeTrs.push(tr);
                if (swimlaneRows.length > 0) {
                    removeTrs.push(swimlaneRows[index]);
                }
            }
        });
        if (!this.parent.swimlaneSettings.showEmptyRow && (this.parent.kanbanData.length === 0 && !this.parent.showEmptyColumn)) {
            removeTrs.forEach((tr) => remove(tr));
        }
    }
    renderCard(data) {
        const cardElement = createElement('div', {
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
            const templateId = this.parent.element.id + '_cardTemplate';
            const cardTemplate = this.parent.templateParser(this.parent.cardSettings.template)(data, this.parent, 'cardTemplate', templateId, false);
            append(cardTemplate, cardElement);
        }
        else {
            const tooltipClass = this.parent.enableTooltip ? ' ' + TOOLTIP_TEXT_CLASS : '';
            if (this.parent.cardSettings.showHeader) {
                const cardHeader = createElement('div', { className: CARD_HEADER_CLASS });
                const cardCaption = createElement('div', { className: CARD_HEADER_TEXT_CLASS });
                const cardText = createElement('div', {
                    className: CARD_HEADER_TITLE_CLASS + tooltipClass,
                    innerHTML: data[this.parent.cardSettings.headerField] || ''
                });
                cardHeader.appendChild(cardCaption);
                cardCaption.appendChild(cardText);
                cardElement.appendChild(cardHeader);
            }
            const cardContent = createElement('div', {
                className: CARD_CONTENT_CLASS + tooltipClass,
                innerHTML: data[this.parent.cardSettings.contentField] || ''
            });
            cardElement.appendChild(cardContent);
            if (this.parent.cardSettings.tagsField && data[this.parent.cardSettings.tagsField]) {
                const cardTags = createElement('div', { className: CARD_TAGS_CLASS });
                const tags = data[this.parent.cardSettings.tagsField].toString().split(',');
                for (const tag of tags) {
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
                const cardFields = createElement('div', { className: CARD_FOOTER_CLASS });
                const keys = data[this.parent.cardSettings.footerCssField].split(',');
                for (const key of keys) {
                    cardFields.appendChild(createElement('div', {
                        className: key.trim() + ' ' + CARD_FOOTER_CSS_CLASS
                    }));
                }
                cardElement.appendChild(cardFields);
            }
        }
        return cardElement;
    }
    renderEmptyCard() {
        const emptyCard = createElement('span', {
            className: EMPTY_CARD_CLASS, innerHTML: this.parent.localeObj.getConstant('noCard'),
            attrs: { 'aria-label': this.parent.localeObj.getConstant('noCard'), 'role': 'option' }
        });
        return emptyCard;
    }
    renderColGroup(table) {
        const colGroup = createElement('colgroup');
        this.parent.columns.forEach((column) => {
            if (this.isColumnVisible(column)) {
                const index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                const isToggle = column.allowToggle && !column.isExpanded;
                const className = index === -1 ? (isToggle ? COLLAPSED_CLASS : '') : COLLAPSED_CLASS;
                const col = createElement('col', {
                    className: className,
                    attrs: { 'data-key': column.keyField.toString() }
                });
                if (this.parent.isAdaptive) {
                    const width = isToggle ? formatUnit(toggleWidth) : formatUnit(this.getWidth());
                    col.style.width = width;
                }
                colGroup.appendChild(col);
            }
        });
        table.appendChild(colGroup);
    }
    getRows() {
        let kanbanRows = [];
        if (this.parent.swimlaneSettings.keyField) {
            this.parent.kanbanData.map((obj) => {
                if (!this.parent.swimlaneSettings.showEmptyRow) {
                    if ((isNullOrUndefined(obj[this.parent.keyField])) || (obj[this.parent.keyField] === '') ||
                        (obj[this.parent.keyField] && this.columnKeys.indexOf(obj[this.parent.keyField].toString()) === -1)) {
                        return;
                    }
                }
                let textField = obj[this.parent.swimlaneSettings.textField] || obj[this.parent.swimlaneSettings.keyField];
                let keyField = obj[this.parent.swimlaneSettings.keyField];
                if (!obj[this.parent.swimlaneSettings.keyField]) {
                    if (this.parent.swimlaneSettings.showUnassignedRow) {
                        textField = this.parent.localeObj.getConstant('unassigned');
                        keyField = '';
                    }
                    else {
                        return;
                    }
                }
                kanbanRows.push({ keyField: keyField, textField: textField });
            });
            kanbanRows = kanbanRows.filter((item, index, arr) => index === arr.map((item) => item.keyField).indexOf(item.keyField));
            kanbanRows = this.swimlaneSorting(kanbanRows);
            kanbanRows.forEach((row) => {
                row.count = this.parent.kanbanData.filter((obj) => this.columnKeys.indexOf(obj[this.parent.keyField]) > -1 &&
                    obj[this.parent.swimlaneSettings.keyField] === row.keyField).length;
            });
            if (kanbanRows.length === 0) {
                kanbanRows.push({ keyField: '', textField: '' });
            }
        }
        else {
            kanbanRows.push({ keyField: '', textField: '' });
        }
        return kanbanRows;
    }
    swimlaneSorting(rows) {
        if (this.parent.swimlaneSettings.sortComparer) {
            rows = this.parent.swimlaneSettings.sortComparer.call(this.parent, rows);
        }
        else {
            rows.sort((a, b) => a.textField.localeCompare(b.textField, undefined, { numeric: true }));
            if (this.parent.swimlaneSettings.sortDirection === 'Descending') {
                rows.reverse();
            }
        }
        return rows;
    }
    createStackedRow(rows) {
        const tr = createElement('tr', { className: HEADER_ROW_CLASS + ' ' + STACKED_HEADER_ROW_CLASS });
        const stackedHeaders = [];
        this.parent.columns.forEach((column) => {
            let headerText = '';
            for (const row of rows) {
                if (row.keyFields.indexOf(column.keyField.toString()) !== -1) {
                    headerText = row.text;
                }
            }
            stackedHeaders.push(headerText);
        });
        for (let h = 0; h < stackedHeaders.length; h++) {
            let colSpan = 1;
            for (let j = h + 1; j < stackedHeaders.length; j++) {
                if ((stackedHeaders[h] !== '') && (stackedHeaders[j] !== '') && stackedHeaders[h] === stackedHeaders[j]) {
                    colSpan++;
                }
                else {
                    break;
                }
            }
            const div = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: stackedHeaders[h] });
            const th = createElement('th', {
                className: HEADER_CELLS_CLASS + ' ' + STACKED_HEADER_CELL_CLASS,
                attrs: { 'colspan': colSpan.toString(), 'scope': 'col' }
            });
            tr.appendChild(th).appendChild(div);
            h += colSpan - 1;
        }
        return tr;
    }
    scrollUiUpdate() {
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        let height = this.parent.element.offsetHeight - header.offsetHeight;
        if (this.parent.isAdaptive) {
            height = window.innerHeight - (header.offsetHeight + bottomSpace);
            const swimlaneToolbar = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
            if (swimlaneToolbar) {
                height -= swimlaneToolbar.offsetHeight;
            }
            const cardWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS));
            cardWrappers.forEach((cell) => {
                const cardWrapper = cell.querySelector('.' + CARD_WRAPPER_CLASS);
                if (!cardWrapper.classList.contains(MULTI_CARD_WRAPPER_CLASS)) {
                    cardWrapper.style.height = formatUnit(height);
                    EventHandler.add(cell, 'touchmove', this.onAdaptiveScroll, this);
                }
            });
        }
        if (this.parent.height !== 'auto' && this.parent.height !== '100%') {
            content.style.height = formatUnit(height);
        }
        [].slice.call(header.children).forEach((node) => {
            let paddingValue = 0;
            if ((content.offsetWidth - content.clientWidth) > 0) {
                paddingValue = 17;
                if ((content.offsetHeight - content.clientHeight) > 0) {
                    node.style.width = formatUnit(content.clientWidth);
                }
            }
            if (this.parent.enableRtl) {
                node.style.paddingLeft = formatUnit(paddingValue);
            }
            else {
                node.style.paddingRight = formatUnit(paddingValue);
            }
        });
        this.updateScrollPosition();
    }
    onContentScroll(e) {
        const target = e.target;
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach((node) => { node.scrollLeft = target.scrollLeft; });
        this.parent.scrollPosition.content = { left: target.scrollLeft, top: target.scrollTop };
        if (!isNullOrUndefined(this.parent.swimlaneSettings.keyField) && this.parent.swimlaneSettings.enableFrozenRows) {
            this.frozenRows(e);
        }
    }
    addFrozenSwimlaneDataKey(currentElem) {
        const frozenKey = currentElem.getAttribute('data-key');
        if (!isNullOrUndefined(frozenKey)) {
            this.frozenSwimlaneRow.setAttribute('data-key', frozenKey);
        }
    }
    frozenRows(e) {
        const firstSwimlane = this.parent.element.querySelector('.' + SWIMLANE_ROW_CLASS);
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (isNullOrUndefined(this.frozenSwimlaneRow)) {
            this.frozenSwimlaneRow = createElement('div', { className: FROZEN_SWIMLANE_ROW_CLASS });
            const frozenRow = createElement('div', { className: FROZEN_ROW_CLASS });
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
            const swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.' + SWIMLANE_ROW_CLASS));
            const curSwim = swimlaneRows[this.frozenOrder];
            const prevSwim = swimlaneRows[this.frozenOrder - 1];
            const nextSwim = swimlaneRows[this.frozenOrder + 1];
            let curSwimHeight;
            let prevSwimHeight;
            let nextSwimHeight;
            if (curSwim) {
                curSwimHeight = curSwim.getBoundingClientRect().top + curSwim.getBoundingClientRect().height;
            }
            if (prevSwim) {
                prevSwimHeight = prevSwim.getBoundingClientRect().top + prevSwim.getBoundingClientRect().height;
            }
            if (nextSwim) {
                nextSwimHeight = nextSwim.getBoundingClientRect().top + nextSwim.getBoundingClientRect().height;
            }
            const frozenSwimHeight = content.getBoundingClientRect().top + this.frozenSwimlaneRow.getBoundingClientRect().height;
            const frozenRowsElement = this.frozenSwimlaneRow.querySelector('.' + FROZEN_ROW_CLASS);
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
    }
    removeFrozenRows() {
        remove(this.frozenSwimlaneRow);
        this.frozenSwimlaneRow = null;
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        setStyleAttribute(header, { position: '', top: '' });
        setStyleAttribute(content, { position: '', top: '' });
        this.parent.scrollPosition.content = { left: this.parent.scrollPosition.content.left, top: 0 };
        content.scrollTop = 0;
        this.frozenOrder = 0;
    }
    onColumnScroll(e) {
        const target = e.target;
        if (target.offsetParent) {
            const columnKey = target.offsetParent.getAttribute('data-key');
            this.parent.scrollPosition.column[`${columnKey}`] = { left: target.scrollLeft, top: target.scrollTop };
        }
    }
    onAdaptiveScroll(e) {
        if (this.parent.touchModule.tabHold && !this.parent.touchModule.mobilePopup) {
            e.preventDefault();
        }
    }
    /**
     * Check column is visible or not.
     *
     * @param {ColumnsModel} column - specifies the column.
     * @returns {boolean}
     * @private
     * @hidden
     */
    isColumnVisible(column) {
        let isVisible = false;
        const isNumeric = typeof column.keyField === 'number';
        if (isNumeric) {
            isVisible = this.parent.actionModule.hideColumnKeys.indexOf(column.keyField.toString()) === -1;
        }
        else {
            column.keyField.split(',').forEach((key) => { isVisible = this.parent.actionModule.hideColumnKeys.indexOf(key) === -1; });
        }
        return isVisible;
    }
    renderLimits(column, target) {
        const limits = createElement('div', { className: LIMITS_CLASS });
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
    }
    renderValidation() {
        this.parent.columns.forEach((column) => {
            if (!column.minCount && !column.maxCount) {
                return;
            }
            const cardData = this.columnData[column.keyField];
            const keySelector = `[data-key="${column.keyField}"]`;
            const headerCell = this.parent.element.querySelector(`.${HEADER_CELLS_CLASS + keySelector}`);
            const rowCells = [].slice.call(this.parent.element.querySelectorAll(`.${CONTENT_CELLS_CLASS + keySelector}`));
            if (this.parent.constraintType === 'Swimlane' && this.parent.swimlaneSettings.keyField) {
                this.swimlaneRow.forEach((row, index) => {
                    this.renderLimits(column, rowCells[index]);
                    const rowCards = cardData.filter((card) => card[this.parent.swimlaneSettings.keyField] === row.keyField);
                    const colorClass = this.getValidationClass(column, rowCards.length);
                    if (colorClass) {
                        addClass([rowCells[index]], colorClass);
                    }
                });
            }
            else {
                this.renderLimits(column, headerCell);
                const colorClass = this.getValidationClass(column, cardData.length);
                if (colorClass) {
                    addClass(rowCells.concat(headerCell), colorClass);
                }
            }
        });
    }
    getValidationClass(column, count) {
        let colorClass;
        if (column.maxCount && count > column.maxCount) {
            colorClass = MAX_COLOR_CLASS;
        }
        else if (column.minCount && count < column.minCount) {
            colorClass = MIN_COLOR_CLASS;
        }
        return colorClass;
    }
    refreshValidation() {
        const validations = [].slice.call(this.parent.element.querySelectorAll('.' + LIMITS_CLASS));
        validations.forEach((node) => { remove(node); });
        const minClass = [].slice.call(this.parent.element.querySelectorAll('.' + MIN_COLOR_CLASS));
        removeClass(minClass, MIN_COLOR_CLASS);
        const maxClass = [].slice.call(this.parent.element.querySelectorAll('.' + MAX_COLOR_CLASS));
        removeClass(maxClass, MAX_COLOR_CLASS);
        this.renderValidation();
    }
    getColumnData(columnValue, dataSource = this.parent.kanbanData) {
        let cardData = [];
        const isNumeric = typeof columnValue === 'number';
        if (isNumeric) {
            const keyData = dataSource.filter((cardObj) => cardObj[this.parent.keyField] === columnValue);
            cardData = cardData.concat(keyData);
        }
        else {
            const columnKeys = columnValue.split(',');
            for (const key of columnKeys) {
                const keyData = dataSource.filter((cardObj) => cardObj[this.parent.keyField] === key.trim());
                cardData = cardData.concat(keyData);
            }
        }
        this.sortCategory(cardData);
        return cardData;
    }
    sortCategory(cardData) {
        let key = this.parent.cardSettings.headerField;
        const direction = this.parent.sortSettings.direction;
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
    }
    sortOrder(key, direction, cardData) {
        let isNumeric = true;
        if (this.parent.kanbanData.length > 0) {
            isNumeric = typeof (this.parent.kanbanData[0])[`${key}`] === 'number';
        }
        if (!isNumeric && this.parent.sortSettings.sortBy === 'Index') {
            return cardData;
        }
        let first;
        let second;
        cardData = cardData.sort((firstData, secondData) => {
            if (!isNumeric) {
                first = firstData[`${key}`] ? firstData[`${key}`].toLowerCase() : '';
                second = secondData[`${key}`] ? secondData[`${key}`].toLowerCase() : '';
            }
            else {
                first = firstData[`${key}`];
                second = secondData[`${key}`];
            }
            return (first > second) ? 1 : ((second > first) ? -1 : 0);
        });
        if (direction === 'Descending') {
            cardData.reverse();
        }
        return cardData;
    }
    documentClick(args) {
        if (args.target.classList.contains(SWIMLANE_OVERLAY_CLASS) &&
            this.parent.element.querySelector('.' + SWIMLANE_RESOURCE_CLASS).classList.contains('e-popup-open')) {
            this.treePopup.hide();
            removeClass([this.popupOverlay], 'e-enable');
        }
        if (closest(args.target, `.${ROOT_CLASS}`)) {
            return;
        }
        const cards = [].slice.call(this.parent.element.querySelectorAll(`.${CARD_CLASS}.${CARD_SELECTION_CLASS}`));
        removeClass(cards, CARD_SELECTION_CLASS);
        this.disableAttributeSelection(cards);
    }
    disableAttributeSelection(cards) {
        if (cards instanceof Element) {
            cards.setAttribute('aria-selected', 'false');
        }
        else {
            cards.forEach((card) => { card.setAttribute('aria-selected', 'false'); });
        }
    }
    getColumnCards(data) {
        const columnData = {};
        this.columnKeys = [];
        this.parent.columns.forEach((column) => {
            const isNumeric = typeof column.keyField === 'number';
            if (isNumeric) {
                this.columnKeys = this.columnKeys.concat(column.keyField.toString());
            }
            else {
                this.columnKeys = this.columnKeys.concat(column.keyField.split(',').map((e) => e.trim()));
            }
            const cardData = this.getColumnData(column.keyField, data);
            columnData[column.keyField] = cardData;
        });
        return columnData;
    }
    getSwimlaneCards() {
        const swimlaneData = {};
        if (this.parent.swimlaneSettings.keyField) {
            this.kanbanRows.forEach((row) => swimlaneData[row.keyField] = this.parent.kanbanData.filter((obj) => !isNullOrUndefined(obj[this.parent.keyField]) &&
                this.columnKeys.indexOf(obj[this.parent.keyField].toString()) > -1 &&
                ((!obj[this.parent.swimlaneSettings.keyField] && this.parent.swimlaneSettings.showUnassignedRow) ?
                    '' : obj[this.parent.swimlaneSettings.keyField]) === row.keyField));
        }
        return swimlaneData;
    }
    refreshHeaders() {
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach((child) => remove(child));
        this.renderHeader(header);
    }
    refreshCards() {
        this.parent.resetTemplates(['cardTemplate']);
        const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cards.forEach((card) => remove(card));
        this.renderCards();
        this.wireDragEvent();
        this.parent.renderTemplates();
    }
    refresh() {
        let isColumnTemplateRefreshed = false;
        this.parent.columns.forEach((column) => {
            if (column.showItemCount) {
                if (column && column.template && !isColumnTemplateRefreshed) {
                    this.refreshHeaders();
                    isColumnTemplateRefreshed = true;
                }
                const countSelector = `.${HEADER_CELLS_CLASS}[data-key="${column.keyField}"] .${CARD_ITEM_COUNT_CLASS}`;
                const itemCount = this.parent.element.querySelector(countSelector);
                if (itemCount) {
                    const isNumeric = typeof column.keyField === 'number';
                    let cardLength = 0;
                    if (isNumeric) {
                        // eslint-disable-next-line no-useless-escape
                        cardLength = ([].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key=\"' + column.keyField + '\"]'))).length;
                    }
                    else {
                        const keys = column.keyField.split(',');
                        for (const key of keys) {
                            // eslint-disable-next-line no-useless-escape
                            const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key=\"' + key.trim() + '\"]'));
                            cardLength = cards.length + cardLength;
                        }
                    }
                    itemCount.innerHTML = '- ' + cardLength + ' ' + this.parent.localeObj.getConstant('items');
                }
            }
        });
        if (this.parent.swimlaneSettings.keyField) {
            const swimlaneRows = [].slice.call(this.parent.element.querySelectorAll(`.${SWIMLANE_ROW_CLASS}`));
            swimlaneRows.forEach((swimlane) => {
                const swimlaneKey = swimlane.getAttribute('data-key');
                const itemCount = swimlane.querySelector(`.${CARD_ITEM_COUNT_CLASS}`);
                if (itemCount && swimlaneKey) {
                    const cards = [].slice.call(swimlane.nextElementSibling.querySelectorAll('.' + CARD_CLASS));
                    itemCount.innerHTML = '- ' + cards.length + ' ' + this.parent.localeObj.getConstant('items');
                }
            });
        }
        this.refreshValidation();
    }
    updateScrollPosition() {
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            if (!Browser.isIE) {
                content.scrollTo(this.parent.scrollPosition.content.left, this.parent.scrollPosition.content.top);
            }
            else {
                content.scrollTop = this.parent.scrollPosition.content.top;
                content.scrollLeft = this.parent.scrollPosition.content.left;
            }
        }
        const cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach((wrapper) => {
            if (wrapper.offsetParent) {
                const scrollData = this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')];
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
    }
    renderCardBasedOnIndex(data, index) {
        const key = data[this.parent.keyField];
        let cardRow = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row)');
        if (this.parent.swimlaneSettings.keyField && !this.parent.isAdaptive) {
            const rowSelector = `.e-content-row.e-swimlane-row[data-key="${data[this.parent.swimlaneSettings.keyField]}"]`;
            if (this.parent.element.querySelector(rowSelector)) {
                cardRow = this.parent.element.querySelector(rowSelector).nextElementSibling;
            }
            else {
                const columnIndex = this.columnKeys.indexOf(key);
                if (columnIndex !== -1 && this.parent.actionModule.hideColumnKeys.indexOf(key) === -1) {
                    const index = this.kanbanRows.findIndex((rowData) => rowData['keyField'] === data[this.parent.swimlaneSettings.keyField]);
                    const swim = [].slice.call(this.parent.element.querySelectorAll('.e-swimlane-row'));
                    let swimRow = this.parent.element.querySelector('.' + CONTENT_TABLE_CLASS + ' tbody');
                    if (swim[index]) {
                        swimRow = swim[index];
                    }
                    this.renderSwimlaneRow(swimRow, this.kanbanRows[index], false);
                    this.renderSingleContent(swimRow, this.kanbanRows[index], false);
                }
                cardRow = this.parent.element.querySelector(rowSelector).nextElementSibling;
                [].slice.call(cardRow.children).forEach((cell) => {
                    const cardWrapper = createElement('div', { className: CARD_WRAPPER_CLASS });
                    cell.appendChild(cardWrapper);
                    cardWrapper.appendChild(this.renderEmptyCard());
                });
            }
        }
        if (this.parent.sortSettings.sortBy !== 'Index') {
            let field = this.parent.cardSettings.headerField;
            if (this.parent.sortSettings.sortBy === 'Custom') {
                field = this.parent.sortSettings.field;
            }
            if (isNullOrUndefined(this.parent.swimlaneSettings.keyField)) {
                index = this.getColumnData(key, this.parent.kanbanData).findIndex((colData) => colData[`${field}`] === data[`${field}`]);
            }
            else {
                const swimlaneDatas = this.parent.getSwimlaneData(data[this.parent.swimlaneSettings.keyField]);
                index = this.getColumnData(key, swimlaneDatas).findIndex((colData) => colData[`${field}`] === data[`${field}`]);
            }
        }
        else if (this.parent.sortSettings.sortBy === 'Index' &&
            this.parent.sortSettings.field && this.parent.sortSettings.direction === 'Ascending') {
            index = data[this.parent.sortSettings.field] - 1;
        }
        if (cardRow) {
            const td = [].slice.call(cardRow.children).filter((e) => e.getAttribute('data-key').replace(/\s/g, '').split(',').indexOf(key.toString().replace(/\s/g, '')) !== -1)[0];
            const cardWrapper = td.querySelector('.' + CARD_WRAPPER_CLASS);
            const emptyCard = cardWrapper.querySelector('.' + EMPTY_CARD_CLASS);
            if (emptyCard) {
                remove(emptyCard);
            }
            const cardElement = this.renderCard(data);
            if (this.parent.allowDragAndDrop && td.classList.contains(DRAG_CLASS)) {
                this.parent.dragAndDropModule.wireDragEvents(cardElement);
                addClass([cardElement], DROPPABLE_CLASS);
            }
            const args = { data: data, element: cardElement, cancel: false };
            this.parent.trigger(cardRendered, args, (cardArgs) => {
                if (!cardArgs.cancel) {
                    if (isNullOrUndefined(index) || cardWrapper.children.length === 0) {
                        cardWrapper.appendChild(cardElement);
                    }
                    else {
                        cardWrapper.insertBefore(cardElement, cardWrapper.childNodes[index]);
                    }
                }
            });
        }
    }
    removeCard(data) {
        const cardKey = data[this.parent.cardSettings.headerField];
        const cardElement = this.parent.element.querySelector(`.${CARD_CLASS}[data-id="${cardKey}"]`);
        if (cardElement) {
            this.isSelectedCard = cardElement.classList.contains(CARD_SELECTION_CLASS) ? true : false;
            const cardContainer = cardElement.parentElement;
            remove(cardElement);
            if (cardContainer.querySelectorAll('.' + CARD_CLASS + ':not(.' + CLONED_CARD_CLASS + ')').length === 0) {
                cardContainer.appendChild(this.renderEmptyCard());
            }
        }
    }
    wireEvents() {
        EventHandler.add(this.parent.element, 'click', this.parent.actionModule.clickHandler, this.parent.actionModule);
        EventHandler.add(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler, this.parent.actionModule);
        EventHandler.add(document, Browser.touchStartEvent, this.documentClick, this);
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        EventHandler.add(content, 'scroll', this.onContentScroll, this);
        const cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach((wrapper) => {
            if (this.parent.isInitialRender && wrapper.offsetParent) {
                this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')] = { left: 0, top: 0 };
            }
            EventHandler.add(wrapper, 'scroll', this.onColumnScroll, this);
        });
        if (this.parent.isAdaptive) {
            this.parent.touchModule.wireTouchEvents();
            content.scrollLeft = this.scrollLeft;
        }
        this.wireDragEvent();
    }
    unWireEvents() {
        EventHandler.remove(this.parent.element, 'click', this.parent.actionModule.clickHandler);
        EventHandler.remove(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler);
        EventHandler.remove(document, Browser.touchStartEvent, this.documentClick);
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            EventHandler.remove(content, 'scroll', this.onContentScroll);
            if (this.parent.allowDragAndDrop) {
                this.unWireDragEvent();
            }
        }
        const cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        if (cardWrapper.length > 0) {
            cardWrapper.forEach((wrapper) => { EventHandler.remove(wrapper, 'scroll', this.onColumnScroll); });
        }
        if (this.parent.isAdaptive) {
            this.parent.touchModule.unWireTouchEvents();
        }
    }
    wireDragEvent() {
        if (this.parent.allowDragAndDrop) {
            const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
                + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
            addClass(cards, DROPPABLE_CLASS);
            cards.forEach((card) => this.parent.dragAndDropModule.wireDragEvents(card));
        }
    }
    unWireDragEvent() {
        const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
            + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
        removeClass(cards, DROPPABLE_CLASS);
        cards.forEach((card) => this.parent.dragAndDropModule.unWireDragEvents(card));
    }
    destroy() {
        this.parent.resetTemplates();
        this.parent.off(dataReady, this.initRender);
        this.parent.off(contentReady, this.scrollUiUpdate);
        this.unWireEvents();
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        if (header) {
            remove(header);
        }
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
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
        const swimlaneToolBarEle = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
        if (swimlaneToolBarEle) {
            remove(swimlaneToolBarEle);
        }
        const swimlaneContent = this.parent.element.querySelector('.' + SWIMLANE_CONTENT_CLASS);
        if (swimlaneContent) {
            remove(swimlaneContent);
        }
        const swimlaneFrozenRow = this.parent.element.querySelector('.' + FROZEN_SWIMLANE_ROW_CLASS);
        if (swimlaneFrozenRow) {
            remove(swimlaneFrozenRow);
            this.frozenSwimlaneRow = null;
        }
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Kanban layout rendering module
 *
 */
class VirtualLayoutRender extends MobileLayout {
    constructor(parent) {
        super(parent);
        this.parent = parent;
        this.kanbanRows = [];
        this.scrollStatus = {};
        this.offsets = {};
        this.tempOffsets = {};
        this.offsetKeys = [];
        this.columnKeys = [];
        this.scrollLeft = 0;
        this.frozenOrder = 0;
        this.winResize = this.windowResize.bind(this);
        if (this.parent.enableVirtualization) {
            this.parent.on(dataReady, this.initRender, this);
            this.parent.on(contentReady, this.scrollUiUpdate, this);
        }
    }
    initRender() {
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
            const parent = this.parent.element.querySelector('.' + CONTENT_CLASS);
            if (parent) {
                this.scrollLeft = parent.scrollLeft;
            }
        }
        this.destroy();
        this.parent.on(dataReady, this.initRender, this);
        this.parent.on(contentReady, this.scrollUiUpdate, this);
        const header = createElement('div', { className: HEADER_CLASS });
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
    }
    cardHeightCalculate() {
        let cardHeight;
        if (this.parent.cardHeight === 'auto') {
            cardHeight = 100 + 8; // 8 is the margin bottom value of the card.
        }
        else {
            cardHeight = parseInt(formatUnit(this.parent.cardHeight).split('px')[0], 10) + 8;
        }
        return cardHeight;
    }
    renderHeader(header) {
        const headerWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        header.appendChild(headerWrap);
        const headerTable = createElement('table', {
            className: TABLE_CLASS + ' ' + HEADER_TABLE_CLASS,
            attrs: { 'role': 'presentation' }
        });
        headerWrap.appendChild(headerTable);
        this.renderColGroup(headerTable);
        const tableHead = createElement('thead');
        headerTable.appendChild(tableHead);
        if (this.parent.stackedHeaders.length > 0) {
            tableHead.appendChild(this.createStackedRow(this.parent.stackedHeaders));
        }
        const tr = createElement('tr', { className: HEADER_ROW_CLASS });
        tableHead.appendChild(tr);
        for (const column of this.parent.columns) {
            if (this.isColumnVisible(column)) {
                const index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                const th = createElement('th', {
                    className: index === -1 ? HEADER_CELLS_CLASS : HEADER_CELLS_CLASS + ' ' + COLLAPSED_CLASS,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString() }
                });
                const classList = [];
                if (column.allowToggle) {
                    classList.push(HEADER_ROW_TOGGLE_CLASS);
                    if (!column.isExpanded) {
                        classList.push(COLLAPSED_CLASS);
                    }
                }
                addClass([th], classList);
                const headerWrapper = createElement('div', { className: HEADER_WRAP_CLASS });
                th.appendChild(headerWrapper);
                const noOfCard = this.parent.dataModule.isRemote() ?
                    this.parent.columnDataCount[column.keyField] : this.columnData[column.keyField].length;
                const headerTitle = createElement('div', { className: HEADER_TITLE_CLASS });
                headerWrapper.appendChild(headerTitle);
                if (column.template) {
                    const templateArgs = {
                        keyField: column.keyField, headerText: column.headerText, minCount: column.minCount, maxCount: column.maxCount,
                        allowToggle: column.allowToggle, isExpanded: column.isExpanded, showItemCount: column.showItemCount, count: noOfCard
                    };
                    addClass([th], TEMPLATE_CLASS);
                    const templateId = this.parent.element.id + '_columnTemplate';
                    const templateHeader = this.parent.templateParser(column.template)(templateArgs, this.parent, 'columnTemplate', templateId, false);
                    append(templateHeader, headerTitle);
                }
                else {
                    const header = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: column.headerText });
                    headerTitle.appendChild(header);
                    if (column.showItemCount) {
                        const itemCount = createElement('div', {
                            className: CARD_ITEM_COUNT_CLASS,
                            innerHTML: '- ' + noOfCard.toString() + ' ' + this.parent.localeObj.getConstant('items')
                        });
                        headerTitle.appendChild(itemCount);
                    }
                }
                if (column.allowToggle) {
                    const isExpand = (column.isExpanded && index === -1) ? true : false;
                    const name = (isExpand) ? COLUMN_EXPAND_CLASS : COLUMN_COLLAPSE_CLASS;
                    const icon = createElement('div', {
                        className: HEADER_ICON_CLASS + ' ' + ICON_CLASS + ' ' + name,
                        attrs: { 'tabindex': '0' }
                    });
                    icon.setAttribute('aria-label', isExpand ? column.keyField + ' Expand' : column.keyField + ' Collapse');
                    th.setAttribute('aria-expanded', isExpand.toString());
                    headerWrapper.appendChild(icon);
                }
                const dataObj = [{ keyField: column.keyField, textField: column.headerText, count: noOfCard }];
                const args = { data: dataObj, element: tr, cancel: false, requestType: 'headerRow' };
                this.parent.trigger(queryCellInfo, args, (columnArgs) => {
                    if (!columnArgs.cancel) {
                        tr.appendChild(th);
                    }
                });
            }
        }
    }
    renderContent() {
        const content = createElement('div', { className: CONTENT_CLASS });
        this.parent.element.appendChild(content);
        const contentWrap = createElement('div', { className: this.parent.swimlaneSettings.keyField ? SWIMLANE_CLASS : '' });
        content.appendChild(contentWrap);
        const contentTable = createElement('table', {
            className: TABLE_CLASS + ' ' + CONTENT_TABLE_CLASS,
            attrs: { 'role': 'presentation' }
        });
        contentWrap.appendChild(contentTable);
        this.renderColGroup(contentTable);
        const tBody = createElement('tbody');
        contentTable.appendChild(tBody);
        let isCollaspsed = false;
        for (const row of this.kanbanRows) {
            if (this.parent.swimlaneSettings.keyField && this.parent.swimlaneToggleArray.length !== 0) {
                const index = this.parent.swimlaneToggleArray.indexOf(row.keyField);
                isCollaspsed = index !== -1;
            }
            this.renderSingleContent(tBody, row, isCollaspsed);
        }
    }
    renderSingleContent(tBody, row, isCollaspsed) {
        const className = isCollaspsed ? CONTENT_ROW_CLASS + ' ' + COLLAPSED_CLASS : CONTENT_ROW_CLASS;
        const tr = createElement('tr', { className: className, attrs: { 'aria-expanded': 'true' } });
        for (const column of this.parent.columns) {
            if (this.isColumnVisible(column)) {
                const index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                const className = index === -1 ? CONTENT_CELLS_CLASS : CONTENT_CELLS_CLASS + ' ' + COLLAPSED_CLASS;
                const dragClass = (column.allowDrag ? ' ' + DRAG_CLASS : '') + (column.allowDrop ? ' ' + DROP_CLASS
                    + ' ' + DROPPABLE_CLASS : '');
                const td = createElement('td', {
                    className: className + dragClass,
                    attrs: { 'data-role': 'kanban-column', 'data-key': column.keyField.toString(), 'aria-expanded': 'true',
                        'tabindex': '0', 'role': 'navigation' }
                });
                if (column.allowToggle && !column.isExpanded || index !== -1) {
                    addClass([td], COLLAPSED_CLASS);
                    const text = (column.showItemCount ? '[' + (this.parent.dataModule.isRemote() ?
                        this.parent.columnDataCount[column.keyField] : this.getColumnData(column.keyField).length) +
                        '] ' : '') + column.headerText;
                    td.appendChild(createElement('div', { className: COLLAPSE_HEADER_TEXT_CLASS, innerHTML: text }));
                    td.setAttribute('aria-expanded', 'false');
                }
                if (column.showAddButton) {
                    const button = createElement('div', { className: SHOW_ADD_BUTTON, attrs: { 'tabindex': '-1' } });
                    button.appendChild(createElement('div', { className: SHOW_ADD_ICON + ' ' + ICON_CLASS }));
                    td.appendChild(button);
                }
                tr.appendChild(td);
                if (this.parent.enableVirtualization) {
                    const headerHeight = this.parent.element.querySelector('.e-kanban-header').getBoundingClientRect().height;
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
        const dataObj = [{ keyField: row.keyField, textField: row.textField, count: row.count }];
        const args = { data: dataObj, element: tr, cancel: false, requestType: 'contentRow' };
        this.parent.trigger(queryCellInfo, args, (columnArgs) => {
            if (!columnArgs.cancel) {
                if (tBody.classList.contains('e-swimlane-row')) {
                    tBody.insertAdjacentElement('beforebegin', tr);
                }
                else {
                    tBody.appendChild(tr);
                }
            }
        });
    }
    windowResize() {
        const cloumnsTDElem = this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS);
        const headerHeight = this.parent.element.querySelector('.e-kanban-header').getBoundingClientRect().height;
        for (let j = 0; j < cloumnsTDElem.length; j++) {
            if (this.parent.height === 'auto') {
                cloumnsTDElem[j].style.height = window.innerHeight - (headerHeight + this.parent.element.getBoundingClientRect().top + 15) + 'px';
            }
            else {
                cloumnsTDElem[j].style.height = parseInt(formatUnit(this.parent.height).split('px')[0], 10) - (headerHeight + 15) + 'px';
            }
        }
    }
    refreshColumnData(draggedColumnKey, droppedColumnKey, requestType, crudKeyField) {
        const cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        const isCRUD = (requestType === 'cardChanged' || requestType === 'cardCreated' || requestType === 'cardRemoved')
            && !isNullOrUndefined(crudKeyField);
        cardRows.forEach((tr) => {
            for (const column of this.parent.columns) {
                if (this.isColumnVisible(column) && (column.keyField === draggedColumnKey || column.keyField === droppedColumnKey)
                    || isCRUD) {
                    let cards = 0;
                    let blocks = [];
                    const columnData = this.getColumnCards()[column.keyField];
                    const currentColumnDataCount = this.parent.dataModule.isRemote() ?
                        this.parent.columnDataCount[column.keyField] : columnData.length;
                    const overallHeight = this.cardHeight * currentColumnDataCount;
                    // eslint-disable-next-line prefer-spread
                    blocks = Array.apply(null, Array(currentColumnDataCount)).map(() => ++cards);
                    const columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    const singleIndexCardCount = Math.ceil(parseInt(columnWrapper.style.height.split('px')[0], 10) / this.cardHeight);
                    this.offsets[1] = singleIndexCardCount * this.cardHeight;
                    for (let i = 1; i < blocks.length; i++) {
                        this.offsets[blocks[i]] = (this.offsets[blocks[i - 1]]) + (singleIndexCardCount * this.cardHeight);
                        this.tempOffsets[blocks[i]] = this.offsets[blocks[i] - 1] | 0;
                    }
                    const cardWrapper = columnWrapper.querySelector('.' + CARD_WRAPPER_CLASS);
                    const maxBlock = currentColumnDataCount % 2 === 0 ? currentColumnDataCount - 2 : currentColumnDataCount - 1;
                    const viewInfo = this.getInfoFromView(this.scrollStatus[column.keyField]);
                    const transformY = this.getTranslateY(viewInfo);
                    const cardVirtualElement = cardWrapper.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
                    cardVirtualElement.style.maxHeight = currentColumnDataCount * this.cardHeight + 'px';
                    this.setPadding(transformY, cardVirtualElement, currentColumnDataCount);
                    this.currentStatus = {
                        column: column.keyField,
                        columnOverAllHeight: overallHeight,
                        columnHeight: parseInt(columnWrapper.style.height.split('px')[0], 10),
                        previousScrollTop: this.scrollStatus[column.keyField].currentScrollTop,
                        currentScrollTop: cardWrapper.scrollTop,
                        scrollDirection: this.scrollStatus[column.keyField].scrollDirection,
                        currentBlockIndex: this.scrollStatus[column.keyField].currentBlockIndex,
                        oldBlockIndex: this.scrollStatus[column.keyField].oldBlockIndex,
                        offsets: this.offsets,
                        tempOffsets: this.tempOffsets,
                        totalColumnData: currentColumnDataCount,
                        singleIndexCardCount: singleIndexCardCount,
                        maxBlock: maxBlock
                    };
                    this.scrollStatus[column.keyField] = this.currentStatus;
                }
            }
        });
    }
    renderCards() {
        const cardRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row:not(.e-swimlane-row)'));
        const swimlaneRows = [].slice.call(this.parent.element.querySelectorAll('.e-content-row.e-swimlane-row'));
        const removeTrs = [];
        let columnTransition = false;
        cardRows.forEach((tr, index) => {
            let dataCount = 0;
            for (const column of this.parent.columns) {
                if (this.isColumnVisible(column)) {
                    let cards = 0;
                    const currentScrollIndex = 0;
                    let blocks = [];
                    this.offsets = {};
                    this.tempOffsets = {};
                    const columnData = this.columnData[column.keyField];
                    const currentColumnDataCount = this.parent.dataModule.isRemote()
                        ? this.parent.columnDataCount[column.keyField] : columnData.length;
                    dataCount += currentColumnDataCount;
                    const overallHeight = (this.cardHeight * currentColumnDataCount) + 7; //7 is difference between top space of the scroll element
                    const columnWrapper = tr.querySelector('[data-key="' + column.keyField + '"]');
                    const singleIndexCardCount = Math.ceil(parseFloat(columnWrapper.style.height.split('px')[0]) / this.cardHeight);
                    const currentColumnBlock = singleIndexCardCount > currentColumnDataCount ? currentColumnDataCount :
                        Math.floor(currentColumnDataCount / singleIndexCardCount);
                    // eslint-disable-next-line prefer-spread
                    blocks = Array.apply(null, Array(currentColumnDataCount)).map(() => ++cards);
                    this.offsets[1] = singleIndexCardCount * this.cardHeight + 7;
                    for (let i = 1; i < blocks.length; i++) {
                        this.offsets[blocks[i]] = (this.offsets[blocks[i - 1]]) + (singleIndexCardCount * this.cardHeight);
                        this.tempOffsets[blocks[i]] = this.offsets[blocks[i] - 1] | 0;
                    }
                    const cardWrapper = createElement('div', {
                        className: CARD_WRAPPER_CLASS, attrs: { 'role': 'listbox' }
                    });
                    const cardVirtualWrapper = createElement('div', {
                        className: CARD_VIRTUAL_WRAPPER_CLASS, attrs: { 'role': 'listbox' }
                    });
                    cardWrapper.appendChild(cardVirtualWrapper);
                    const maxBlock = currentColumnBlock % 2 === 0 ? currentColumnBlock : currentColumnBlock + 1;
                    this.currentStatus = {
                        column: column.keyField,
                        columnOverAllHeight: overallHeight,
                        columnHeight: parseInt(columnWrapper.style.height.split('px')[0], 10),
                        previousScrollTop: null,
                        currentScrollTop: cardWrapper.scrollTop,
                        scrollDirection: null,
                        currentBlockIndex: [1, 2],
                        oldBlockIndex: [1, 2],
                        offsets: this.offsets,
                        tempOffsets: this.tempOffsets,
                        totalColumnData: currentColumnDataCount,
                        singleIndexCardCount: singleIndexCardCount,
                        maxBlock: maxBlock
                    };
                    this.scrollStatus[column.keyField] = this.currentStatus;
                    if (column.transitionColumns.length > 0) {
                        columnTransition = true;
                    }
                    if (!columnTransition && isNullOrUndefined(this.parent.swimlaneSettings.keyField)) {
                        const borderElem = createElement('div', { className: BORDER_CLASS });
                        columnWrapper.appendChild(borderElem);
                    }
                    columnWrapper.appendChild(cardWrapper);
                    if (currentColumnDataCount > 0) {
                        for (let i = currentScrollIndex; i < singleIndexCardCount * 2 && i < columnData.length; i++) {
                            const cardText = columnData[i][this.parent.cardSettings.headerField];
                            const cardIndex = this.parent.actionModule.selectionArray.indexOf(cardText);
                            const cardElement = this.renderCard(columnData[i]);
                            if (cardIndex !== -1) {
                                cardElement.setAttribute('aria-selected', 'true');
                                addClass([cardElement], CARD_SELECTION_CLASS);
                            }
                            const args = { data: columnData[i], element: cardElement, cancel: false };
                            this.parent.trigger(cardRendered, args, (cardArgs) => {
                                if (!cardArgs.cancel) {
                                    cardVirtualWrapper.appendChild(cardElement);
                                }
                            });
                        }
                        cardVirtualWrapper.style.maxHeight = this.cardHeight * currentColumnDataCount + 'px';
                    }
                    else {
                        cardVirtualWrapper.appendChild(this.renderEmptyCard());
                    }
                    this.setPadding(0, cardVirtualWrapper, currentColumnDataCount);
                }
            }
            if (dataCount === 0) {
                removeTrs.push(tr);
                if (swimlaneRows.length > 0) {
                    removeTrs.push(swimlaneRows[index]);
                }
            }
        });
        if (!this.parent.swimlaneSettings.showEmptyRow && (this.parent.kanbanData.length === 0 && !this.parent.showEmptyColumn)) {
            removeTrs.forEach((tr) => remove(tr));
        }
    }
    renderCard(data) {
        const cardElement = createElement('div', {
            className: CARD_CLASS,
            attrs: {
                'data-id': data[this.parent.cardSettings.headerField], 'data-key': data[this.parent.keyField],
                'aria-selected': 'false', 'tabindex': '-1', 'role': 'option'
            }
        });
        cardElement.style.height = this.cardHeight - 8 + 'px'; // Since in the public card height calculation margin bottom is added, so it reduced here.
        if (this.parent.cardSettings.template) {
            addClass([cardElement], TEMPLATE_CLASS);
            const templateId = this.parent.element.id + '_cardTemplate';
            const cardTemplate = this.parent.templateParser(this.parent.cardSettings.template)(data, this.parent, 'cardTemplate', templateId, false);
            append(cardTemplate, cardElement);
        }
        else {
            const tooltipClass = this.parent.enableTooltip ? ' ' + TOOLTIP_TEXT_CLASS : '';
            if (this.parent.cardSettings.showHeader) {
                const cardHeader = createElement('div', { className: CARD_HEADER_CLASS });
                const cardCaption = createElement('div', { className: CARD_HEADER_TEXT_CLASS });
                const cardText = createElement('div', {
                    className: CARD_HEADER_TITLE_CLASS + tooltipClass,
                    innerHTML: data[this.parent.cardSettings.headerField] || ''
                });
                cardHeader.appendChild(cardCaption);
                cardCaption.appendChild(cardText);
                cardElement.appendChild(cardHeader);
            }
            const cardContent = createElement('div', {
                className: CARD_CONTENT_CLASS + tooltipClass,
                innerHTML: data[this.parent.cardSettings.contentField] || ''
            });
            cardElement.appendChild(cardContent);
            if (this.parent.cardSettings.tagsField && data[this.parent.cardSettings.tagsField]) {
                const cardTags = createElement('div', { className: CARD_TAGS_CLASS });
                const tags = data[this.parent.cardSettings.tagsField].toString().split(',');
                for (const tag of tags) {
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
                const cardFields = createElement('div', { className: CARD_FOOTER_CLASS });
                const keys = data[this.parent.cardSettings.footerCssField].split(',');
                for (const key of keys) {
                    cardFields.appendChild(createElement('div', {
                        className: key.trim() + ' ' + CARD_FOOTER_CSS_CLASS
                    }));
                }
                cardElement.appendChild(cardFields);
            }
        }
        return cardElement;
    }
    renderEmptyCard() {
        const emptyCard = createElement('span', {
            className: EMPTY_CARD_CLASS,
            innerHTML: this.parent.localeObj.getConstant('noCard')
        });
        return emptyCard;
    }
    renderColGroup(table) {
        const colGroup = createElement('colgroup');
        this.parent.columns.forEach((column) => {
            if (this.isColumnVisible(column)) {
                const index = this.parent.actionModule.columnToggleArray.indexOf(column.keyField.toString());
                const isToggle = column.allowToggle && !column.isExpanded;
                const className = index === -1 ? (isToggle ? COLLAPSED_CLASS : '') : COLLAPSED_CLASS;
                const col = createElement('col', {
                    className: className,
                    attrs: { 'data-key': column.keyField.toString() },
                    styles: this.parent.isAdaptive ? 'width: ' +
                        (isToggle ? formatUnit(toggleWidth) : formatUnit(this.getWidth())) : ''
                });
                colGroup.appendChild(col);
            }
        });
        table.appendChild(colGroup);
    }
    getRows() {
        const kanbanRows = [];
        kanbanRows.push({ keyField: '', textField: '' });
        return kanbanRows;
    }
    createStackedRow(rows) {
        const tr = createElement('tr', { className: HEADER_ROW_CLASS + ' ' + STACKED_HEADER_ROW_CLASS });
        const stackedHeaders = [];
        this.parent.columns.forEach((column) => {
            let headerText = '';
            for (const row of rows) {
                if (row.keyFields.indexOf(column.keyField.toString()) !== -1) {
                    headerText = row.text;
                }
            }
            stackedHeaders.push(headerText);
        });
        for (let h = 0; h < stackedHeaders.length; h++) {
            let colSpan = 1;
            for (let j = h + 1; j < stackedHeaders.length; j++) {
                if ((stackedHeaders[h] !== '') && (stackedHeaders[j] !== '') && stackedHeaders[h] === stackedHeaders[j]) {
                    colSpan++;
                }
                else {
                    break;
                }
            }
            const div = createElement('div', { className: HEADER_TEXT_CLASS, innerHTML: stackedHeaders[h] });
            const th = createElement('th', {
                className: HEADER_CELLS_CLASS + ' ' + STACKED_HEADER_CELL_CLASS,
                attrs: { 'colspan': colSpan.toString() }
            });
            tr.appendChild(th).appendChild(div);
            h += colSpan - 1;
        }
        return tr;
    }
    scrollUiUpdate() {
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        let height = this.parent.element.offsetHeight - header.offsetHeight;
        if (this.parent.isAdaptive) {
            height = window.innerHeight - (header.offsetHeight + bottomSpace);
            const swimlaneToolbar = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
            if (swimlaneToolbar) {
                height -= swimlaneToolbar.offsetHeight;
            }
            const cardWrappers = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS));
            cardWrappers.forEach((cell) => {
                const cardWrapper = cell.querySelector('.' + CARD_WRAPPER_CLASS);
                if (!cardWrapper.classList.contains(MULTI_CARD_WRAPPER_CLASS)) {
                    cardWrapper.style.height = formatUnit(height);
                    EventHandler.add(cell, 'touchmove', this.onAdaptiveScroll, this);
                }
            });
        }
        if (this.parent.height !== 'auto' && this.parent.height !== '100%') {
            content.style.height = formatUnit(height);
        }
        [].slice.call(header.children).forEach((node) => {
            let paddingValue = 0;
            if ((content.offsetWidth - content.clientWidth) > 0) {
                paddingValue = 17;
                if ((content.offsetHeight - content.clientHeight) > 0) {
                    node.style.width = formatUnit(content.clientWidth);
                }
            }
            if (this.parent.enableRtl) {
                node.style.paddingLeft = formatUnit(paddingValue);
            }
            else {
                node.style.paddingRight = formatUnit(paddingValue);
            }
        });
        this.updateScrollPosition();
    }
    onContentScroll(e) {
        const target = e.target;
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach((node) => { node.scrollLeft = target.scrollLeft; });
        this.parent.scrollPosition.content = { left: target.scrollLeft, top: target.scrollTop };
    }
    getOffset(block, viewInfo) {
        return Math.min(viewInfo.offsets[block] | 0, viewInfo.offsets[viewInfo.maxBlock] | 0);
    }
    getTranslateY(viewInfo) {
        const block = (viewInfo.newBlockIndex[0] || 1) - 1;
        const translate = this.getOffset(block, viewInfo);
        const endTranslate = this.getOffset(viewInfo.newBlockIndex[viewInfo.newBlockIndex.length - 1], viewInfo);
        const result = translate > viewInfo.currentScrollTop ?
            this.getOffset(block - 1, viewInfo) : endTranslate < (viewInfo.currentScrollTop + viewInfo.columnHeight) ?
            this.getOffset(block + 1, viewInfo) : translate;
        return result;
    }
    setPadding(paddingTop, scrollElem, dataCount, isScrolledToLast, direction) {
        if (isScrolledToLast && direction === 'down') {
            scrollElem.style.paddingTop = `${paddingTop}px`;
            scrollElem.style.paddingBottom = '0px';
        }
        else {
            scrollElem.style.paddingTop = `${paddingTop}px`;
            scrollElem.style.paddingBottom = `${this.cardHeight * dataCount - paddingTop}px`;
        }
    }
    getData(keyField, column, take, skip) {
        const query = this.query.clone();
        const predicate = new Predicate(keyField, 'equal', column, true);
        query.where(predicate);
        query.take(take);
        query.skip(skip);
        query.addParams('KanbanVirtualScroll', 'KanbanVirtualScroll');
        if (this.parent.dataSource && 'result' in this.parent.dataSource) {
            const def = this.eventPromise({ requestType: '' }, query);
            return def.promise;
        }
        return this.parent.dataModule.dataManager.executeQuery(query);
    }
    eventPromise(args, query) {
        const state = this.getStateEventArgument(query);
        const def = new Deferred();
        state.updateData = def.resolve;
        state.action = args;
        return def;
    }
    getStateEventArgument(query) {
        const adaptr = new UrlAdaptor();
        const dm = new DataManager({ url: '', adaptor: new UrlAdaptor });
        const state = adaptr.processQuery(dm, query);
        const data = JSON.parse(state.data);
        return extend(data, state.pvtData);
    }
    dataManagerSuccess(e, type) {
        let resultData;
        if (type) {
            resultData = extend([], !isNullOrUndefined(e.result.result) ?
                e.result.result : e.result, null, true);
        }
        else {
            this.parent.trigger(dataBinding, e, (args) => {
                resultData = extend([], !isNullOrUndefined(args.result.result) ?
                    args.result.result : args.result, null, true);
                this.parent.trigger(dataBound, null, () => this.parent.hideSpinner());
            });
        }
        return resultData;
    }
    dataManagerFailure(e) {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.trigger(actionFailure, { error: e }, () => this.parent.hideSpinner());
    }
    onColScrollShowSkeleton(args) {
        const target = args.target;
        if (this.parent.element.querySelectorAll('.e-card-skeleton-wrapper').length > 0) {
            return;
        }
        const key = target.parentElement.getAttribute('data-key');
        const previousScrollTop = this.scrollStatus[key].previousScrollTop;
        const parentElemHeight = target.parentElement.clientHeight;
        if ((target.scrollTop - previousScrollTop) > parentElemHeight || (previousScrollTop - target.scrollTop) > parentElemHeight) {
            this.showSkeleton(target, this.scrollStatus[key].singleIndexCardCount);
        }
    }
    showSkeleton(cardWrapper, skeletonCount) {
        const cardVirtualSkeletonWrapper = createElement('div', {
            className: 'e-card-virtual-skeleton-wrapper', attrs: { 'role': 'listbox' }
        });
        cardWrapper.parentElement.insertBefore(cardVirtualSkeletonWrapper, cardWrapper);
        cardVirtualSkeletonWrapper.style.position = 'absolute';
        cardVirtualSkeletonWrapper.style.zIndex = '10';
        for (let j = 0; j < skeletonCount; j++) {
            const skeletonWrapper = createElement('div', { className: 'e-card-skeleton-wrapper' });
            const skeleton = createElement('span', { className: 'e-skeleton e-skeleton-text e-shimmer-wave' });
            skeleton.style.height = this.cardHeight + 'px';
            // Assumption fix, issue reproduce in rare cases only .
            if (!isNullOrUndefined(cardWrapper.querySelector('.e-card'))) {
                skeleton.style.width = cardWrapper.querySelector('.e-card').getBoundingClientRect().width + 'px';
            }
            skeletonWrapper.appendChild(skeleton);
            cardVirtualSkeletonWrapper.appendChild(skeletonWrapper);
        }
    }
    hideSkeleton(cardWrapper) {
        setTimeout(() => {
            const skeletonWrapper = cardWrapper.querySelectorAll('.e-card-virtual-skeleton-wrapper');
            for (let i = 0; i < skeletonWrapper.length; i++) {
                detach(skeletonWrapper[i]);
            }
        }, 50);
    }
    onColumnScroll(e) {
        const target = e.target;
        const currentScrolledHeight = target.scrollTop;
        let columnKey;
        if (target.offsetParent) {
            columnKey = target.offsetParent.getAttribute('data-key');
            this.parent.scrollPosition.column[columnKey] = { left: target.scrollLeft, top: target.scrollTop };
        }
        if (this.parent.enableVirtualization) {
            const cardWrapper = target;
            let dataCount = 0;
            const columnData = this.getColumnCards()[columnKey];
            const currentColumnDataCount = this.parent.dataModule.isRemote() ?
                this.parent.columnDataCount[columnKey] : columnData.length;
            dataCount += currentColumnDataCount;
            const overallHeight = this.cardHeight * dataCount;
            let removeIndex = [];
            let addIndex = [];
            this.checkScrollDirection(columnKey, currentScrolledHeight);
            if (this.findScrollSpeed(target, columnKey) === 'fast' && currentScrolledHeight > overallHeight) {
                this.hideSkeleton(cardWrapper.parentElement);
                return;
            }
            const maxBlock = this.scrollStatus[columnKey].maxBlock;
            const isLastBlockRendered = this.scrollStatus[columnKey].currentBlockIndex.indexOf(maxBlock) > -1;
            const isDuplicateScroll = e.timeStamp - this.scrollStatus[columnKey].previousTimeStamps < 300;
            if (isLastBlockRendered && !isNullOrUndefined(this.scrollStatus[columnKey].previousTimeStamps) && isDuplicateScroll) {
                this.hideSkeleton(cardWrapper.parentElement);
                return;
            }
            this.scrollStatus[columnKey].previousTimeStamps = e.timeStamp;
            const viewInfo = this.getInfoFromView(this.scrollStatus[columnKey]);
            removeIndex = viewInfo.currentBlockIndex.filter(function (val) {
                return viewInfo.newBlockIndex.indexOf(val) === -1;
            });
            addIndex = viewInfo.newBlockIndex.filter(function (val) {
                return viewInfo.currentBlockIndex.indexOf(val) === -1;
            });
            const isScrolledToLast = currentScrolledHeight + target.clientHeight >= overallHeight;
            const transformY = isScrolledToLast ? overallHeight - (cardWrapper.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS).childElementCount * this.cardHeight)
                : this.getTranslateY(viewInfo);
            const cardVirtualElement = cardWrapper.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
            if (removeIndex.length > 0) {
                let removeStartIndex;
                let removeEndIndex;
                if (removeIndex[0] === 1) {
                    removeStartIndex = 0;
                    removeEndIndex = (removeIndex.length * this.scrollStatus[columnKey].singleIndexCardCount) - 1;
                }
                else {
                    removeStartIndex = ((removeIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    removeEndIndex = removeStartIndex + (removeIndex.length * this.scrollStatus[columnKey].singleIndexCardCount);
                }
                this.removeCardsOnScroll(cardVirtualElement, this.scrollStatus[columnKey].scrollDirection === 'down' ? true : false, removeStartIndex, removeEndIndex);
            }
            if (addIndex.length > 0) {
                if (this.parent.dataModule.isRemote()) {
                    const visibleStartIndex = ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    let resultData = [];
                    const dataManager = this.getData(this.parent.keyField, columnKey, (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length), visibleStartIndex);
                    dataManager.then((e) => {
                        resultData = this.dataManagerSuccess(e);
                        this.scrollCardInsert(columnKey, cardVirtualElement, target, currentScrolledHeight, cardWrapper, this.scrollStatus[columnKey].scrollDirection === 'down' ? 0 : (resultData.length - 1), true, resultData, null);
                    }).catch((e) => this.dataManagerFailure(e));
                }
                else {
                    const visibleStartIndex = this.scrollStatus[columnKey].scrollDirection === 'down' ? ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount) :
                        ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount)
                            + (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length) - 1;
                    const visibleLength = this.scrollStatus[columnKey].scrollDirection === 'down' ? visibleStartIndex + (this.scrollStatus[columnKey].singleIndexCardCount * addIndex.length) :
                        ((addIndex[0] - 1) * this.scrollStatus[columnKey].singleIndexCardCount);
                    this.scrollCardInsert(columnKey, cardVirtualElement, target, currentScrolledHeight, cardWrapper, visibleStartIndex, false, columnData, visibleLength);
                }
            }
            this.scrollStatus[columnKey].currentBlockIndex = this.scrollStatus[columnKey].newBlockIndex;
            this.setPadding(transformY, cardVirtualElement, currentColumnDataCount, isScrolledToLast, this.scrollStatus[columnKey].scrollDirection);
            viewInfo.currentBlockIndex = viewInfo.newBlockIndex;
            this.parent.renderTemplates();
            this.hideSkeleton(cardWrapper.parentElement);
        }
    }
    checkScrollDirection(columnKey, currentScrolledHeight) {
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
    }
    findScrollSpeed(target, columnKey) {
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
    }
    removeCardsOnScroll(cardVirtualElement, isDown, removeStartIndex, removeEndIndex) {
        for (let j = removeStartIndex; j < removeEndIndex; j++) {
            let removableElem = isDown ? cardVirtualElement.firstChild
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
    }
    scrollCardInsert(columnKey, cardVirtualElement, target, currentScrolledHeight, cardWrapper, startNumber, isRemote, resultData, visibleLength) {
        const conditonsScrollDownCase = isRemote ? resultData.length : visibleLength;
        const conditonsScrollUpCase = isRemote ? 0 : visibleLength;
        if (resultData.length > 0) {
            for (let j = startNumber; this.scrollStatus[columnKey].scrollDirection === 'down' ? (j < conditonsScrollDownCase) :
                j >= conditonsScrollUpCase; this.scrollStatus[columnKey].scrollDirection === 'down' ? j++ : j--) {
                if (!isNullOrUndefined(resultData[j])) {
                    const cardText = resultData[j][this.parent.cardSettings.headerField];
                    const cardIndex = this.parent.actionModule.selectionArray.indexOf(cardText);
                    const cardElement = this.renderCard(resultData[j]);
                    if (cardIndex !== -1) {
                        cardElement.setAttribute('aria-selected', 'true');
                        addClass([cardElement], CARD_SELECTION_CLASS);
                    }
                    const args = { data: resultData[j], element: cardElement, cancel: false };
                    this.parent.trigger(cardRendered, args, (cardArgs) => {
                        if (!cardArgs.cancel) {
                            if (this.scrollStatus[columnKey].scrollDirection === 'down') {
                                cardVirtualElement.appendChild(cardElement);
                            }
                            else {
                                cardVirtualElement.insertBefore(cardElement, cardVirtualElement.firstChild);
                            }
                            this.parent.dragAndDropModule.wireDragEvents(cardElement);
                            addClass([cardElement], DROPPABLE_CLASS);
                        }
                    });
                }
            }
            target.scrollTop = currentScrolledHeight;
        }
        else {
            cardWrapper.appendChild(this.renderEmptyCard());
        }
    }
    ensureColumnNotEmpty(draggedColumnKey) {
        const singleIndexCardCount = this.scrollStatus[draggedColumnKey].singleIndexCardCount;
        const draggedColumnData = this.columnData[draggedColumnKey];
        const draggedTdColummElement = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row) [data-key="' + draggedColumnKey + '"]');
        const wrapperELement = draggedTdColummElement.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
        const cardsList = wrapperELement.querySelectorAll('.' + CARD_CLASS);
        if (cardsList.length > 0) {
            const lastCardDataId = cardsList[cardsList.length - 1].getAttribute('data-id');
            const firstCardDataId = cardsList[0].getAttribute('data-id');
            let lastCardIndex;
            let firstCardIndex;
            if (cardsList.length < singleIndexCardCount * 2) {
                for (let i = 0; i < draggedColumnData.length; i++) {
                    if (lastCardDataId === (draggedColumnData[i][this.parent.cardSettings.headerField]).toString()) {
                        lastCardIndex = i;
                    }
                    if (firstCardDataId === (draggedColumnData[i][this.parent.cardSettings.headerField]).toString()) {
                        firstCardIndex = i;
                    }
                }
                const cardCount = cardsList.length;
                for (let i = cardCount; i < singleIndexCardCount * 2; i++) {
                    const isLast = lastCardIndex === draggedColumnData.length - 1 ? true : false;
                    const nextCardIndex = lastCardIndex < draggedColumnData.length ? lastCardIndex + 1 : firstCardIndex - 1;
                    if (nextCardIndex <= draggedColumnData.length) {
                        const nextCardData = draggedColumnData[nextCardIndex];
                        if (!isNullOrUndefined(nextCardData)) {
                            const nextCard = this.renderCard(nextCardData);
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
    }
    triggerCardRendering(nextCard, nextCardIndex, draggedColumnData, wrapperELement, isLast) {
        const cardText = draggedColumnData[nextCardIndex][this.parent.cardSettings.headerField];
        const cardIndex = this.parent.actionModule.selectionArray.indexOf(cardText);
        if (cardIndex !== -1) {
            nextCard.setAttribute('aria-selected', 'true');
            addClass([nextCard], CARD_SELECTION_CLASS);
        }
        const args = { data: draggedColumnData[nextCardIndex], element: nextCard, cancel: false };
        this.parent.trigger(cardRendered, args, (cardArgs) => {
            if (!cardArgs.cancel) {
                if (!isLast) {
                    wrapperELement.appendChild(nextCard);
                }
                else {
                    wrapperELement.insertBefore(nextCard, wrapperELement.querySelectorAll('.' + CARD_CLASS)[0]);
                }
                this.parent.dragAndDropModule.wireDragEvents(nextCard);
                addClass([nextCard], DROPPABLE_CLASS);
            }
        });
    }
    ensureBlocks(info) {
        let index = info.newBlockIndex[info.block];
        const maxPage = Math.ceil(info.totalColumnData / info.singleIndexCardCount);
        const max = Math.max;
        let indexes;
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
        return indexes.filter(indexRemoveZero => indexRemoveZero > 0);
    }
    getInfoFromView(scrollStatus) {
        let isBlockAdded = false;
        const infoType = scrollStatus;
        infoType.page = this.getPageFromTop(scrollStatus);
        infoType.newBlockIndex = this.getBlockIndexes(infoType.page);
        const blocks = this.ensureBlocks(infoType);
        if (infoType.newBlockIndex.toString() !== blocks.toString()) {
            // To avoid dupilcate row index problem in key focus support
            const newBlock = blocks[blocks.length - 1];
            if (infoType.newBlockIndex.indexOf(newBlock) === -1) {
                isBlockAdded = true;
            }
        }
        infoType.newBlockIndex = isBlockAdded ? blocks : infoType.newBlockIndex;
        return infoType;
    }
    getBlockIndexes(page) {
        return [page + (page - 1), page * 2];
    }
    getPageFromTop(info) {
        const total = info.totalColumnData;
        let page = 0;
        this.offsetKeys = Object.keys(info.offsets);
        this.offsetKeys.some((offset) => {
            let iOffset = Number(offset);
            const border = info.currentScrollTop <= info.offsets[parseInt(offset, 10)]
                || (iOffset === total && info.currentScrollTop > info.offsets[parseInt(offset, 10)]);
            if (border) {
                const maxPage = Math.ceil(total / info.singleIndexCardCount);
                if (this.offsetKeys.length % 2 !== 0 && iOffset.toString() === this.offsetKeys[this.offsetKeys.length - 2]
                    && info.currentScrollTop <= info.offsets[this.offsetKeys.length - 1]) {
                    iOffset = (iOffset + 1) > maxPage ? maxPage : iOffset + 1;
                }
                iOffset = iOffset > maxPage ? maxPage : iOffset;
                info.block = iOffset % 2 === 0 ? 1 : 0;
                page = Math.max(1, Math.min(this.getPage(iOffset, maxPage), maxPage));
            }
            return border;
        });
        return page;
    }
    getPage(block, maxPage) {
        if (block + 1 > maxPage) {
            return block % 2 === 0 ? block / 2 : (block - 1) / 2;
        }
        else {
            return block % 2 === 0 ? block / 2 : (block + 1) / 2;
        }
    }
    onAdaptiveScroll(e) {
        if (this.parent.touchModule.tabHold && !this.parent.touchModule.mobilePopup) {
            e.preventDefault();
        }
    }
    /**
     * Check column is visible or not.
     *
     * @param {ColumnsModel} column - specifies the column.
     * @returns {boolean} - Check column is visible or not.
     * @private
     * @hidden
     */
    isColumnVisible(column) {
        let isVisible = false;
        const isNumeric = typeof column.keyField === 'number';
        if (isNumeric) {
            isVisible = this.parent.actionModule.hideColumnKeys.indexOf(column.keyField.toString()) === -1;
        }
        else {
            column.keyField.split(',').forEach((key) => { isVisible = this.parent.actionModule.hideColumnKeys.indexOf(key) === -1; });
        }
        return isVisible;
    }
    renderLimits(column, target) {
        const limits = createElement('div', { className: LIMITS_CLASS });
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
    }
    renderValidation() {
        this.parent.columns.forEach((column) => {
            if (!column.minCount && !column.maxCount) {
                return;
            }
            const cardData = this.columnData[column.keyField];
            const keySelector = `[data-key="${column.keyField}"]`;
            const headerCell = this.parent.element.querySelector(`.${HEADER_CELLS_CLASS + keySelector}`);
            const rowCells = [].slice.call(this.parent.element.querySelectorAll(`.${CONTENT_CELLS_CLASS + keySelector}`));
            this.renderLimits(column, headerCell);
            const colorClass = this.getValidationClass(column, cardData.length);
            if (colorClass) {
                addClass(rowCells.concat(headerCell), colorClass);
            }
        });
    }
    getValidationClass(column, count) {
        let colorClass;
        if (column.maxCount && count > column.maxCount) {
            colorClass = MAX_COLOR_CLASS;
        }
        else if (column.minCount && count < column.minCount) {
            colorClass = MIN_COLOR_CLASS;
        }
        return colorClass;
    }
    refreshValidation() {
        const validations = [].slice.call(this.parent.element.querySelectorAll('.' + LIMITS_CLASS));
        validations.forEach((node) => { remove(node); });
        const minClass = [].slice.call(this.parent.element.querySelectorAll('.' + MIN_COLOR_CLASS));
        removeClass(minClass, MIN_COLOR_CLASS);
        const maxClass = [].slice.call(this.parent.element.querySelectorAll('.' + MAX_COLOR_CLASS));
        removeClass(maxClass, MAX_COLOR_CLASS);
        this.renderValidation();
    }
    getColumnData(columnValue, dataSource = this.parent.kanbanData) {
        let cardData = [];
        const isNumeric = typeof columnValue === 'number';
        if (isNumeric) {
            const keyData = dataSource.filter((cardObj) => cardObj[this.parent.keyField] === columnValue);
            cardData = cardData.concat(keyData);
        }
        else {
            const columnKeys = columnValue.split(',');
            for (const key of columnKeys) {
                const keyData = dataSource.filter((cardObj) => cardObj[this.parent.keyField] === key.trim());
                cardData = cardData.concat(keyData);
            }
        }
        this.sortCategory(cardData);
        return cardData;
    }
    sortCategory(cardData) {
        let key = this.parent.cardSettings.headerField;
        const direction = this.parent.sortSettings.direction;
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
    }
    sortOrder(key, direction, cardData) {
        let isNumeric = true;
        if (this.parent.kanbanData.length > 0) {
            isNumeric = typeof (this.parent.kanbanData[0])[key] === 'number';
        }
        if (!isNumeric && this.parent.sortSettings.sortBy === 'Index') {
            return cardData;
        }
        let first;
        let second;
        cardData = cardData.sort((firstData, secondData) => {
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
    }
    documentClick(args) {
        if (args.target.classList.contains(SWIMLANE_OVERLAY_CLASS) &&
            this.parent.element.querySelector('.' + SWIMLANE_RESOURCE_CLASS).classList.contains('e-popup-open')) {
            this.treePopup.hide();
            removeClass([this.popupOverlay], 'e-enable');
        }
        if (closest(args.target, `.${ROOT_CLASS}`)) {
            return;
        }
        const cards = [].slice.call(this.parent.element.querySelectorAll(`.${CARD_CLASS}.${CARD_SELECTION_CLASS}`));
        removeClass(cards, CARD_SELECTION_CLASS);
        this.disableAttributeSelection(cards);
    }
    disableAttributeSelection(cards) {
        if (cards instanceof Element) {
            cards.setAttribute('aria-selected', 'false');
        }
        else {
            cards.forEach((card) => { card.setAttribute('aria-selected', 'false'); });
        }
    }
    getColumnCards(data) {
        const columnData = {};
        this.columnKeys = [];
        this.parent.columns.forEach((column) => {
            const isNumeric = typeof column.keyField === 'number';
            if (isNumeric) {
                this.columnKeys = this.columnKeys.concat(column.keyField.toString());
            }
            else {
                this.columnKeys = this.columnKeys.concat(column.keyField.split(',').map((e) => e.trim()));
            }
            const cardData = this.getColumnData(column.keyField, data);
            columnData[column.keyField] = cardData;
        });
        return columnData;
    }
    refreshHeaders() {
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        [].slice.call(header.children).forEach((child) => remove(child));
        this.renderHeader(header);
    }
    refreshCards() {
        this.parent.resetTemplates(['cardTemplate']);
        const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_VIRTUAL_WRAPPER_CLASS));
        cards.forEach((card) => remove(card));
        this.renderCards();
        this.wireDragEvent();
        this.parent.renderTemplates();
    }
    refresh() {
        let isColumnTemplateRefreshed = false;
        this.parent.columns.forEach((column) => {
            if (column.showItemCount) {
                if (column && column.template && !isColumnTemplateRefreshed) {
                    this.refreshHeaders();
                    isColumnTemplateRefreshed = true;
                }
                const countSelector = `.${HEADER_CELLS_CLASS}[data-key="${column.keyField}"] .${CARD_ITEM_COUNT_CLASS}`;
                const itemCount = this.parent.element.querySelector(countSelector);
                if (itemCount) {
                    const columnDataLength = this.parent.dataModule.isRemote() ? this.parent.columnDataCount[column.keyField]
                        : this.columnData[column.keyField].length;
                    const isNumeric = typeof column.keyField === 'number';
                    let cardLength = 0;
                    if (isNumeric) {
                        cardLength = ([].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key="' + column.keyField + '"]'))).length;
                    }
                    else {
                        const keys = column.keyField.split(',');
                        for (const key of keys) {
                            const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_CLASS + '[data-key="' + key.trim() + '"]'));
                            cardLength = cards.length + cardLength;
                        }
                    }
                    itemCount.innerHTML = '- ' + columnDataLength + ' ' + this.parent.localeObj.getConstant('items');
                }
            }
        });
        this.refreshValidation();
    }
    updateScrollPosition() {
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            if (!Browser.isIE) {
                content.scrollTo(this.parent.scrollPosition.content.left, this.parent.scrollPosition.content.top);
            }
            else {
                content.scrollTop = this.parent.scrollPosition.content.top;
                content.scrollLeft = this.parent.scrollPosition.content.left;
            }
        }
        const cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach((wrapper) => {
            if (wrapper.offsetParent) {
                const scrollData = this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')];
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
    }
    renderCardBasedOnIndex(data, index, isDropped, requestType) {
        const key = data[this.parent.keyField];
        const cardRow = this.parent.element.querySelector('.e-content-row:not(.e-swimlane-row)');
        if (this.parent.sortSettings.sortBy !== 'Index') {
            let field = this.parent.cardSettings.headerField;
            if (this.parent.sortSettings.sortBy === 'Custom') {
                field = this.parent.sortSettings.field;
            }
            if (isNullOrUndefined(this.parent.swimlaneSettings.keyField)) {
                index = this.getColumnData(key, this.parent.kanbanData).findIndex((colData) => colData[field] === data[field]);
            }
            else {
                const swimlaneDatas = this.parent.getSwimlaneData(data[this.parent.swimlaneSettings.keyField]);
                index = this.getColumnData(key, swimlaneDatas).findIndex((colData) => colData[field] === data[field]);
            }
        }
        else if (this.parent.sortSettings.sortBy === 'Index' &&
            this.parent.sortSettings.field && this.parent.sortSettings.direction === 'Ascending') {
            index = data[this.parent.sortSettings.field] - 1;
        }
        if (cardRow) {
            const td = [].slice.call(cardRow.children).filter((e) => e.getAttribute('data-key').replace(/\s/g, '').split(',').indexOf(key.toString().replace(/\s/g, '')) !== -1)[0];
            const cardWrapper = td.querySelector('.' + CARD_VIRTUAL_WRAPPER_CLASS);
            const emptyCard = cardWrapper.querySelector('.' + EMPTY_CARD_CLASS);
            if (emptyCard) {
                remove(emptyCard);
            }
            const cardElement = this.renderCard(data);
            if (this.parent.allowDragAndDrop && td.classList.contains(DRAG_CLASS)) {
                this.parent.dragAndDropModule.wireDragEvents(cardElement);
                addClass([cardElement], DROPPABLE_CLASS);
            }
            const args = { data: data, element: cardElement, cancel: false };
            this.parent.trigger(cardRendered, args, (cardArgs) => {
                const addCardCondition = isDropped ? true : cardWrapper.childNodes.length
                    < this.scrollStatus[key].singleIndexCardCount;
                if (!cardArgs.cancel && addCardCondition || !isNullOrUndefined(requestType)) {
                    if (isNullOrUndefined(index) || cardWrapper.children.length === 0) {
                        cardWrapper.appendChild(cardElement);
                    }
                    else {
                        cardWrapper.insertBefore(cardElement, cardWrapper.childNodes[index]);
                    }
                }
            });
        }
    }
    removeCard(data) {
        const cardKey = data[this.parent.cardSettings.headerField];
        const cardElement = this.parent.element.querySelector(`.${CARD_CLASS}[data-id="${cardKey}"]`);
        if (cardElement) {
            this.isSelectedCard = cardElement.classList.contains(CARD_SELECTION_CLASS) ? true : false;
            const cardContainer = cardElement.parentElement;
            remove(cardElement);
            if (cardContainer.querySelectorAll('.' + CARD_CLASS + ':not(.' + CLONED_CARD_CLASS + ')').length === 0) {
                cardContainer.appendChild(this.renderEmptyCard());
            }
        }
    }
    wireEvents() {
        EventHandler.add(this.parent.element, 'click', this.parent.actionModule.clickHandler, this.parent.actionModule);
        EventHandler.add(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler, this.parent.actionModule);
        EventHandler.add(document, Browser.touchStartEvent, this.documentClick, this);
        window.addEventListener('resize', this.winResize);
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        EventHandler.add(content, 'scroll', this.onContentScroll, this);
        const cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        cardWrapper.forEach((wrapper) => {
            if (this.parent.isInitialRender && wrapper.offsetParent) {
                this.parent.scrollPosition.column[wrapper.offsetParent.getAttribute('data-key')] = { left: 0, top: 0 };
            }
            EventHandler.add(wrapper, 'scroll', this.onColScrollShowSkeleton, this);
            EventHandler.add(wrapper, 'scroll', debounce(this.onColumnScroll, 200), this);
        });
        if (this.parent.isAdaptive) {
            this.parent.touchModule.wireTouchEvents();
            content.scrollLeft = this.scrollLeft;
        }
        this.wireDragEvent();
    }
    unWireEvents() {
        EventHandler.remove(this.parent.element, 'click', this.parent.actionModule.clickHandler);
        EventHandler.remove(this.parent.element, 'dblclick', this.parent.actionModule.doubleClickHandler);
        EventHandler.remove(document, Browser.touchStartEvent, this.documentClick);
        window.removeEventListener('resize', this.winResize);
        this.winResize = null;
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
        if (content) {
            EventHandler.remove(content, 'scroll', this.onContentScroll);
            EventHandler.remove(content, 'scroll', this.onColScrollShowSkeleton);
            if (this.parent.allowDragAndDrop) {
                this.unWireDragEvent();
            }
        }
        const cardWrapper = [].slice.call(this.parent.element.querySelectorAll('.' + CARD_WRAPPER_CLASS));
        if (cardWrapper.length > 0) {
            cardWrapper.forEach((wrapper) => { EventHandler.remove(wrapper, 'scroll', debounce(this.onColumnScroll, 200)); });
        }
        if (this.parent.isAdaptive) {
            this.parent.touchModule.unWireTouchEvents();
        }
    }
    wireDragEvent() {
        if (this.parent.allowDragAndDrop) {
            const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
                + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
            addClass(cards, DROPPABLE_CLASS);
            if (cards.length > 0) {
                cards.forEach((card) => this.parent.dragAndDropModule.wireDragEvents(card));
            }
        }
    }
    unWireDragEvent() {
        const cards = [].slice.call(this.parent.element.querySelectorAll('.' + CONTENT_CELLS_CLASS
            + '.' + DRAG_CLASS + ' .' + CARD_CLASS));
        removeClass(cards, DROPPABLE_CLASS);
        if (cards.length > 0) {
            cards.forEach((card) => this.parent.dragAndDropModule.unWireDragEvents(card));
        }
    }
    destroy() {
        this.parent.resetTemplates();
        this.parent.off(dataReady, this.initRender);
        this.parent.off(contentReady, this.scrollUiUpdate);
        this.unWireEvents();
        const header = this.parent.element.querySelector('.' + HEADER_CLASS);
        if (header) {
            remove(header);
        }
        const content = this.parent.element.querySelector('.' + CONTENT_CLASS);
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
        const swimlaneToolBarEle = this.parent.element.querySelector('.' + SWIMLANE_HEADER_CLASS);
        if (swimlaneToolBarEle) {
            remove(swimlaneToolBarEle);
        }
        const swimlaneContent = this.parent.element.querySelector('.' + SWIMLANE_CONTENT_CLASS);
        if (swimlaneContent) {
            remove(swimlaneContent);
        }
    }
}

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
let Kanban = class Kanban extends Component {
    /**
     * Constructor for creating the Kanban widget
     *
     * @param {KanbanModel} options Accepts the kanban properties to render the Kanban board.
     * @param {string | HTMLElement} element Accepts the DOM element reference as either selector or element to render the Kanban Board.
     */
    constructor(options, element) {
        super(options, element);
        this.columnDataCount = {};
        this.needsID = true;
    }
    /**
     * Initializes the values of private members.
     *
     * @returns {void}
     * @private
     */
    preRender() {
        this.isAdaptive = Browser.isDevice;
        this.kanbanData = [];
        if (!this.enablePersistence || !this.swimlaneToggleArray) {
            this.swimlaneToggleArray = [];
        }
        this.activeCardData = { data: null, element: null };
        const defaultLocale = {
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
    }
    /**
     * To provide the array of modules needed for control rendering
     *
     * @returns {ModuleDeclaration[]} Returns the declared modules.
     * @private
     */
    requiredModules() {
        const modules = [];
        return modules;
    }
    /**
     * Returns the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persistance state.
     * @private
     */
    getPersistData() {
        if (this.dataSource.length > 0) {
            return this.addOnPersist(['columns', 'dataSource', 'swimlaneToggleArray']);
        }
        else {
            return this.addOnPersist(['columns', 'kanbanData', 'swimlaneToggleArray']);
        }
    }
    /**
     * Core method to return the module name.
     *
     * @returns {string} Returns the module name.
     * @private
     */
    getModuleName() {
        return 'kanban';
    }
    /**
     * Core method that initializes the control rendering.
     *
     * @returns {void}
     * @private
     */
    render() {
        const addClasses = [ROOT_CLASS];
        const removeClasses = [];
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
    }
    /**
     * Called internally, if any of the property value changed.
     *
     * @param {KanbanModel} newProp Gets the updated values
     * @param {KanbanModel} oldProp Gets the previous values
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
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
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSwimlaneSettingsPropertyChanged(newProp, _oldProp) {
        for (const prop of Object.keys(newProp)) {
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
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCardSettingsPropertyChanged(newProp, _oldProp) {
        let cards = [];
        for (const prop of Object.keys(newProp)) {
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
    }
    initializeModules() {
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
    }
    renderTemplates() {
        if (this.isReact) {
            this.renderReactTemplates();
        }
    }
    resetTemplates(templates) {
        if (this.isReact) {
            this.clearTemplate(templates);
        }
    }
    destroyModules() {
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
    }
    templateParser(template) {
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
    }
    /**
     * Returns the card details based on card ID from the board.
     *
     * @function getCardDetails
     * @param {Element} target Accepts the card element to get the details.
     * @returns {Object} Returns the card details based on given target.
     */
    getCardDetails(target) {
        const isNumeric = typeof (this.kanbanData[0])[this.cardSettings.headerField] === 'number';
        const targetId = isNumeric ? parseInt(target.getAttribute('data-id'), 10) : target.getAttribute('data-id');
        const cardObj = this.kanbanData.filter((data) => data[this.cardSettings.headerField] === targetId)[0];
        return cardObj;
    }
    /**
     * Returns the column data based on column key input.
     *
     * @function getColumnData
     * @param {string | number} columnKey Accepts the column key to get the objects.
     * @param {Object[]} dataSource Accepts the collection of objects to get the results based on given columnKey.
     * @returns {Object[]} Returns the collection of card objects based on given inputs.
     */
    getColumnData(columnKey, dataSource) {
        if (this.enableVirtualization) {
            return this.virtualLayoutModule.getColumnCards(dataSource)[`${columnKey}`] || [];
        }
        return this.layoutModule.getColumnCards(dataSource)[`${columnKey}`] || [];
    }
    /**
     * Returns the swimlane column data based on swimlane keyField input.
     *
     * @function getSwimlaneData
     * @param {string} keyField Accepts the swimlane keyField to get the objects.
     * @returns {Object[]} Returns the collection of card objects based on given inputs.
     */
    getSwimlaneData(keyField) {
        return this.layoutModule.getSwimlaneCards()[`${keyField}`] || [];
    }
    /**
     * Gets the list of selected cards from the board.
     *
     * @function getSelectedCards
     * @returns {HTMLElement[]} Returns the card elements based on selection.
     */
    getSelectedCards() {
        return [].slice.call(this.element.querySelectorAll('.' + CARD_CLASS + '.' + CARD_SELECTION_CLASS));
    }
    /**
     * Allows you to show the spinner on Kanban at the required scenarios.
     *
     * @function showSpinner
     * @returns {void}
     */
    showSpinner() {
        showSpinner(this.element);
    }
    /**
     * When the spinner is shown manually using the showSpinner method, it can be hidden using this `hideSpinner` method.
     *
     * @function hideSpinner
     * @returns {void}
     */
    hideSpinner() {
        hideSpinner(this.element);
    }
    /**
     * To manually open the dialog.
     *
     * @function openDialog
     * @param {CurrentAction} action Accepts the action for which the dialog needs to be opened such as either for new card creation or
     *  editing of existing cards. The applicable action names are `Add` and `Edit`.
     * @param {Object} data It can be card data.
     * @returns {void}
     */
    openDialog(action, data) {
        this.dialogModule.openDialog(action, data);
    }
    /**
     * To manually close the dialog.
     *
     * @function closeDialog
     * @returns {void}
     */
    closeDialog() {
        this.dialogModule.closeDialog();
    }
    /**
     * Adds the new card to the data source of Kanban and layout.
     *
     * @function addCard
     * @param {Object | Object[]} cardData Accepts Single card object or Collection of card objects to be added into Kanban.
     * @param {number} index Accepts the index to insert the card in column.
     * @returns {void}
     */
    addCard(cardData, index) {
        this.crudModule.addCard(cardData, index);
    }
    /**
     * Updates the changes made in the card object by passing it as a parameter to the data source.
     *
     * @function updateCard
     * @param {Object | Object[]} cardData Accepts Single card object or Collection of card objects to be updated into Kanban.
     * @param {number} index Accepts the index to update the card in column.
     * @returns {void}
     */
    updateCard(cardData, index) {
        this.crudModule.updateCard(cardData, index);
    }
    /**
     * Deletes the card based on the provided ID or card collection in the argument list.
     *
     * @function deleteCard
     * @param {string | number | Object | Object[]} cardData Accepts the ID of the remove card in string or number type or
     * Single card object or Collection of card objects to be removed from Kanban
     * @returns {void}
     */
    deleteCard(cardData) {
        this.crudModule.deleteCard(cardData);
    }
    /**
     * Add the column to Kanban board dynamically based on the provided column options and index in the argument list.
     *
     * @function addColumn
     * @param {ColumnsModel} columnOptions Accepts the properties to new column that are going to be added in the board.
     * @param {number} index Accepts the index of column to add the new column.
     * @returns {void}
     */
    addColumn(columnOptions, index) {
        this.actionModule.addColumn(columnOptions, index);
    }
    /**
     * Deletes the column based on the provided index value.
     *
     * @function deleteColumn
     * @param {number} index Accepts the index of column to delete the existing column from Kanban board.
     * @returns {void}
     */
    deleteColumn(index) {
        this.actionModule.deleteColumn(index);
    }
    /**
     * Shows the column from hidden based on the provided key in the columns.
     *
     * @function showColumn
     * @param {string | number} key Accepts the hidden column key name to be shown from the hidden state in board.
     * @returns {void}
     */
    showColumn(key) {
        this.actionModule.showColumn(key);
    }
    /**
     * Hides the column from Kanban board based on the provided key in the columns.
     *
     * @function hideColumn
     * @param {string | number} key Accepts the visible column key name to be hidden from the board.
     * @returns {void}
     */
    hideColumn(key) {
        this.actionModule.hideColumn(key);
    }
    /**
     * Method to refresh the Kanban UI based on modified records.
     *
     * @function refreshUI
     * @param {ActionEventArgs} args Accepts the added, changed or deleted data.
     * @param {number} index Accepts the index of the changed items.
     * @returns {void}
     */
    refreshUI(args, index) {
        index = index ? index : 0;
        this.dataModule.refreshUI(args, index);
    }
    /**
     * Method to refresh the column header.
     *
     * @method refreshHeader
     * @returns {void}
     */
    refreshHeader() {
        this.resetTemplates(['columnTemplate']);
        if (this.enableVirtualization) {
            this.virtualLayoutModule.refreshHeaders();
        }
        else {
            this.layoutModule.refreshHeaders();
        }
        this.renderTemplates();
    }
    /**
     * Removes the control from the DOM and detaches all its related event handlers. Also, it removes the attributes and classes.
     *
     * @function destroy
     * @returns {void}
     */
    destroy() {
        this.destroyModules();
        [].slice.call(this.element.childNodes).forEach((node) => { detach(node); });
        let removeClasses = [ROOT_CLASS];
        if (this.cssClass) {
            removeClasses = removeClasses.concat(this.cssClass.split(' '));
        }
        removeClass([this.element], removeClasses);
        super.destroy();
    }
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

export { Kanban, actionBegin, actionComplete, actionFailure, bottomSpace, cardClick, cardDoubleClick, cardRendered, cardSpace, contentReady, dataBinding, dataBound, dataReady, dataSourceChanged, dataStateChange, dialogClose, dialogOpen, documentClick, drag, dragStart, dragStop, queryCellInfo, toggleWidth };
//# sourceMappingURL=ej2-kanban.es2015.js.map
