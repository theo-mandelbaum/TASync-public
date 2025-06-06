import { removeClass, addClass, extend, EventHandler } from '@syncfusion/ej2-base';
import { closest, classList, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Grid } from '../base/grid';
import { parents, getUid, appendChildren, isComplexField, getObject } from '../base/util';
import * as events from '../base/constant';
import { AriaService } from '../services/aria-service';
import { Row } from '../models/row';
import { Cell } from '../models/cell';
import { CellType } from '../base/enum';
import * as literals from '../base/string-literals';
/**
 * The `DetailRow` module is used to handle detail template and hierarchy Grid operations.
 */
var DetailRow = /** @class */ (function () {
    /**
     * Constructor for the Grid detail template module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} locator - specifes the serviceLocator
     * @hidden
     */
    function DetailRow(parent, locator) {
        //Internal variables
        this.aria = new AriaService();
        this.childRefs = [];
        this.parent = parent;
        this.serviceLocator = locator;
        this.focus = locator.getService('focus');
        this.addEventListener();
    }
    /**
     * @returns {void}
     * @hidden
     */
    DetailRow.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        EventHandler.add(this.parent.element, 'auxclick', this.auxilaryclickHandler, this);
        this.parent.on(events.click, this.clickHandler, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.keyPressed, this.keyPressHandler, this);
        this.parent.on(events.expandChildGrid, this.expand, this);
        this.parent.on(events.columnVisibilityChanged, this.refreshColSpan, this);
        this.parent.on(events.destroy, this.destroyChildGrids, this);
        this.parent.on(events.destroyChildGrid, this.destroyChildGrids, this);
        this.parent.on(events.destroy, this.detachDetailTemplate, this);
        this.parent.on(events.detachDetailTemplate, this.detachDetailTemplate, this);
    };
    DetailRow.prototype.clickHandler = function (e) {
        if ((e.target.classList.contains('e-icon-grightarrow') || e.target.classList.contains('e-icon-gdownarrow'))
            && !this.parent.allowGrouping) {
            e.preventDefault();
        }
        this.toogleExpandcollapse(closest(e.target, 'td'));
    };
    DetailRow.prototype.auxilaryclickHandler = function (e) {
        if ((e.target.classList.contains('e-icon-grightarrow') || e.target.classList.contains('e-icon-gdownarrow'))
            && !this.parent.allowGrouping && (e.button === 1)) {
            e.preventDefault();
        }
    };
    DetailRow.prototype.toogleExpandcollapse = function (target) {
        this.l10n = this.serviceLocator.getService('localization');
        var gObj = this.parent;
        var table = this.parent.getContentTable();
        var lastrowIdx = this.parent.getCurrentViewRecords().length - 1;
        var parent = 'parentDetails';
        var childGrid;
        var isExpanded = target && target.classList.contains('e-detailrowcollapse');
        if (!(target && (target.classList.contains('e-detailrowcollapse') || target.classList.contains('e-detailrowexpand')))
            || (target && target.classList.contains('e-masked-cell'))) {
            return;
        }
        var tr = target.parentElement;
        var uid = tr.getAttribute('data-uid');
        var rowObj = gObj.getRowObjectFromUID(uid);
        var needToRefresh = false;
        var nextRow = this.parent.getContentTable().querySelector(literals.tbody).children[tr.rowIndex + 1];
        if (target.classList.contains('e-detailrowcollapse')) {
            var data_1 = rowObj.data;
            if (this.isDetailRow(nextRow)) {
                nextRow.style.display = '';
                gObj.notify(events.detailStateChange, { data: data_1,
                    childGrid: gObj.childGrid, detailElement: target, isExpanded: isExpanded });
                needToRefresh = true;
            }
            else if (gObj.getDetailTemplate() || gObj.childGrid) {
                var rowId = getUid('grid-row');
                var detailRow = this.parent.createElement('tr', { className: 'e-detailrow', attrs: { 'data-uid': rowId, role: 'row' } });
                var detailCell_1 = this.parent.createElement('th', { className: 'e-detailcell', attrs: { 'scope': 'col', role: 'columnheader' } });
                var colSpan = this.parent.getVisibleColumns().length;
                if (this.parent.allowRowDragAndDrop) {
                    colSpan++;
                }
                detailCell_1.setAttribute('colspan', colSpan.toString());
                var row = new Row({
                    isDataRow: true,
                    isExpand: true,
                    uid: rowId,
                    isDetailRow: true,
                    cells: [new Cell({ cellType: CellType.Indent }), new Cell({ isDataCell: true, visible: true })]
                });
                row.parentUid = rowObj.uid;
                for (var i = 0, len = gObj.groupSettings.columns.length; i < len; i++) {
                    detailRow.appendChild(this.parent.createElement('td', { className: 'e-indentcell' }));
                    row.cells.unshift(new Cell({ cellType: CellType.Indent }));
                }
                detailRow.appendChild(this.parent.createElement('th', { className: 'e-detailindentcell', attrs: { 'scope': 'col' } }));
                detailRow.appendChild(detailCell_1);
                tr.parentNode.insertBefore(detailRow, tr.nextSibling);
                var isReactCompiler = void 0;
                var isReactChild = void 0;
                if (gObj.detailTemplate) {
                    isReactCompiler = this.parent.isReact && typeof (gObj.detailTemplate) !== 'string' &&
                        !(gObj.detailTemplate.prototype && gObj.detailTemplate.prototype.CSPTemplate);
                    isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                        this.parent.parentDetails.parentInstObj.isReact;
                    var isReactPrintGrid = this.parent.printGridParent && this.parent.printGridParent.isReact;
                    var detailTemplateID = gObj.element.id + 'detailTemplate';
                    if (isReactCompiler || isReactChild || isReactPrintGrid) {
                        gObj.getDetailTemplate()(data_1, gObj, 'detailTemplate', detailTemplateID, null, null, detailCell_1);
                        this.parent.renderTemplates(function () {
                            gObj.trigger(events.detailDataBound, { detailElement: detailCell_1, data: data_1, childGrid: childGrid });
                        });
                    }
                    else {
                        appendChildren(detailCell_1, gObj.getDetailTemplate()(data_1, gObj, 'detailTemplate', detailTemplateID, undefined, undefined, undefined, this.parent['root']));
                    }
                }
                else {
                    childGrid = new Grid(this.getGridModel(gObj, rowObj, gObj.printMode));
                    childGrid.height = gObj.enableInfiniteScrolling && childGrid.height === 'auto' ? 300 : childGrid.height;
                    childGrid.root = gObj.root ? gObj.root : gObj;
                    this.childRefs.push(childGrid);
                    if (childGrid.query) {
                        childGrid.query = childGrid.query.clone();
                    }
                    childGrid["" + parent] = {
                        parentID: gObj.element.id,
                        parentPrimaryKeys: gObj.getPrimaryKeyFieldNames(),
                        parentKeyField: gObj.childGrid.queryString,
                        parentKeyFieldValue: gObj.childGrid.queryString && isComplexField(gObj.childGrid.queryString) ?
                            getObject(gObj.childGrid.queryString, data_1) : data_1[gObj.childGrid.queryString],
                        parentRowData: data_1
                    };
                    if (gObj.isReact || gObj.isVue) {
                        childGrid.parentDetails.parentInstObj = gObj;
                    }
                    else if (gObj.parentDetails && gObj.parentDetails.parentInstObj && (gObj.parentDetails.parentInstObj.isReact
                        || gObj.parentDetails.parentInstObj.isVue)) {
                        childGrid.parentDetails.parentInstObj = gObj.parentDetails.parentInstObj;
                    }
                    if (gObj.printGridParent && gObj.printGridParent.isReact) {
                        childGrid.printGridParent = gObj.printGridParent;
                    }
                    childGrid.isLegacyTemplate = gObj.isReact
                        || gObj.isLegacyTemplate;
                    if (gObj.isPrinting) {
                        childGrid.isPrinting = true;
                        childGrid.on(events.contentReady, this.promiseResolve(childGrid), this);
                        childGrid.on(events.onEmpty, this.promiseResolve(childGrid), this);
                    }
                    rowObj.childGrid = childGrid;
                    var modules = childGrid.getInjectedModules();
                    var injectedModues = gObj.getInjectedModules();
                    if (!modules || modules.length !== injectedModues.length) {
                        childGrid.setInjectedModules(injectedModues);
                    }
                    var gridElem = this.parent.createElement('div', {
                        id: 'child' + parents(tr, 'e-grid').length +
                            '_grid' + tr.rowIndex + getUid(''), className: 'e-childgrid'
                    });
                    detailCell_1.appendChild(gridElem);
                    childGrid.appendTo(gridElem);
                }
                detailRow.appendChild(detailCell_1);
                if (tr.nextSibling) {
                    tr.parentNode.insertBefore(detailRow, tr.nextSibling);
                }
                else {
                    tr.parentNode.appendChild(detailRow);
                }
                var rowElems = gObj.getRows();
                var rowObjs = gObj.getRowsObject();
                rowElems.splice(rowElems.indexOf(tr) + 1, 0, detailRow);
                if (gObj.enableInfiniteScrolling && gObj.infiniteScrollSettings.enableCache) {
                    var infiniteCache = gObj.contentModule
                        .infiniteCache;
                    var keys = Object.keys(infiniteCache);
                    for (var i = 0; i < keys.length; i++) {
                        var cacheIndex = infiniteCache[parseInt(keys[parseInt(i.toString(), 10)], 10)].indexOf(rowObj);
                        if (cacheIndex !== -1) {
                            infiniteCache[parseInt(keys[parseInt(i.toString(), 10)], 10)].splice(cacheIndex + 1, 0, row);
                            break;
                        }
                    }
                }
                else {
                    rowObjs.splice(rowObjs.indexOf(rowObj) + 1, 0, row);
                }
                if (!isReactCompiler || !isReactChild) {
                    gObj.trigger(events.detailDataBound, { detailElement: detailCell_1, data: data_1, childGrid: childGrid });
                }
                gObj.notify(events.detailDataBound, { rows: rowObjs });
            }
            classList(target, ['e-detailrowexpand'], ['e-detailrowcollapse']);
            classList(target.firstElementChild, ['e-dtdiagonaldown', 'e-icon-gdownarrow'], ['e-dtdiagonalright', 'e-icon-grightarrow']);
            rowObj.isExpand = true;
            if (target.classList.contains('e-lastrowcell') && this.parent.getContent().clientHeight > table.scrollHeight) {
                removeClass(target.parentElement.querySelectorAll('td'), 'e-lastrowcell');
                var detailrowIdx = table.querySelector(literals.tbody).getElementsByClassName('e-detailrow').length - 1;
                addClass(table.querySelector(literals.tbody).getElementsByClassName('e-detailrow')[parseInt(detailrowIdx.toString(), 10)].childNodes, ['e-lastrowcell']);
                this.lastrowcell = true;
            }
            this.aria.setExpand(target, true);
            target.firstElementChild.setAttribute('title', this.l10n.getConstant('Expanded'));
        }
        else {
            if (this.isDetailRow(nextRow)) {
                nextRow.style.display = 'none';
                gObj.notify(events.detailStateChange, { data: rowObj.data,
                    childGrid: gObj.childGrid, detailElement: target, isExpanded: isExpanded });
            }
            classList(target, ['e-detailrowcollapse'], ['e-detailrowexpand']);
            classList(target.firstElementChild, ['e-dtdiagonalright', 'e-icon-grightarrow'], ['e-dtdiagonaldown', 'e-icon-gdownarrow']);
            if (parseInt(tr.getAttribute(literals.ariaRowIndex), 10) - 1 === lastrowIdx && this.lastrowcell) {
                addClass(target.parentElement.querySelectorAll('td'), 'e-lastrowcell');
                this.lastrowcell = false;
            }
            rowObj.isExpand = false;
            needToRefresh = true;
            this.aria.setExpand(target, false);
            target.firstElementChild.setAttribute('title', this.l10n.getConstant('Collapsed'));
        }
        if (!isNullOrUndefined(gObj.detailTemplate) || (gObj.childGrid && needToRefresh)) {
            gObj.updateVisibleExpandCollapseRows();
            gObj.notify(events.refreshExpandandCollapse, { rows: gObj.getRowsObject() });
        }
        if (this.parent.allowTextWrap && this.parent.height === 'auto') {
            if (this.parent.getContentTable().scrollHeight > this.parent.getContent().clientHeight) {
                this.parent.scrollModule.setPadding();
            }
            else {
                this.parent.scrollModule.removePadding();
            }
        }
    };
    /**
     * @hidden
     * @param {IGrid} gObj - specifies the grid Object
     * @param {Row<Column>}rowObj - specifies the row object
     * @param {string} printMode - specifies the printmode
     * @returns {Object} returns the object
     */
    DetailRow.prototype.getGridModel = function (gObj, rowObj, printMode) {
        var gridModel;
        if (gObj.isPrinting && rowObj.isExpand && gObj.expandedRows &&
            gObj.expandedRows[rowObj.index] && gObj.expandedRows[rowObj.index].gridModel) {
            gObj.expandedRows[rowObj.index].gridModel.hierarchyPrintMode = gObj.childGrid.hierarchyPrintMode;
            gridModel = extend({}, gObj.expandedRows[rowObj.index].gridModel, gObj.childGrid, true);
        }
        else {
            if (gObj.isPrinting && gObj.childGrid.allowPaging) {
                gObj.childGrid.allowPaging = printMode === 'CurrentPage';
            }
            gridModel = extend({}, {}, gObj.childGrid, true);
        }
        return gridModel;
    };
    DetailRow.prototype.promiseResolve = function (grid) {
        var _this = this;
        return function () {
            grid.off(events.contentReady, _this.promiseResolve);
            grid.off(events.onEmpty, _this.promiseResolve);
            grid.notify(events.hierarchyPrint, {});
        };
    };
    DetailRow.prototype.isDetailRow = function (row) {
        return row && row.classList.contains('e-detailrow');
    };
    DetailRow.prototype.destroy = function () {
        var gridElement = this.parent.element;
        if (this.parent.isDestroyed || !gridElement || (!gridElement.querySelector('.' + literals.gridHeader) &&
            !gridElement.querySelector('.' + literals.gridContent))) {
            return;
        }
        EventHandler.remove(this.parent.element, 'auxclick', this.auxilaryclickHandler);
        this.parent.off(events.click, this.clickHandler);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.keyPressed, this.keyPressHandler);
        this.parent.off(events.expandChildGrid, this.expand);
        this.parent.off(events.columnVisibilityChanged, this.refreshColSpan);
        this.parent.off(events.destroy, this.destroyChildGrids);
        this.parent.off(events.destroyChildGrid, this.destroyChildGrids);
        this.parent.off(events.destroy, this.detachDetailTemplate);
        this.parent.off(events.detachDetailTemplate, this.detachDetailTemplate);
    };
    DetailRow.prototype.getTDfromIndex = function (index, className) {
        var tr = !isNullOrUndefined(index) ? this.parent.getDataRows()[parseInt(index.toString(), 10)] : undefined;
        if (tr && tr.querySelector(className)) {
            return tr.querySelector(className);
        }
        return null;
    };
    /**
     * Expands a detail row with the given target.
     *
     * @param  {Element} target - Defines the collapsed element to expand.
     * @returns {void}
     */
    DetailRow.prototype.expand = function (target) {
        if (!isNaN(target)) {
            target = this.getTDfromIndex(target, '.e-detailrowcollapse');
        }
        if (target && target.classList.contains('e-detailrowcollapse')) {
            this.toogleExpandcollapse(target);
        }
    };
    /**
     * Collapses a detail row with the given target.
     *
     * @param  {Element} target - Defines the expanded element to collapse.
     * @returns {void}
     */
    DetailRow.prototype.collapse = function (target) {
        if (!isNaN(target)) {
            target = this.getTDfromIndex(target, '.e-detailrowexpand');
        }
        if (target && target.classList.contains('e-detailrowexpand')) {
            this.toogleExpandcollapse(target);
        }
    };
    /**
     * Expands all the detail rows of the Grid.
     *
     * @returns {void}
     */
    DetailRow.prototype.expandAll = function () {
        this.expandCollapse(true);
        this.parent.trigger(events.actionComplete, { requestType: 'expandAllComplete', type: events.actionComplete, moduleObj: this });
    };
    /**
     * Collapses all the detail rows of the Grid.
     *
     * @returns {void}
     */
    DetailRow.prototype.collapseAll = function () {
        this.expandCollapse(false);
        this.parent.trigger(events.actionComplete, { requestType: 'collapseAllComplete', type: events.actionComplete, moduleObj: this });
    };
    DetailRow.prototype.expandCollapse = function (isExpand) {
        var td;
        var rows = this.parent.getDataRows();
        for (var i = 0, len = rows.length; i < len; i++) {
            td = rows[parseInt(i.toString(), 10)].querySelector('.e-detailrowcollapse, .e-detailrowexpand');
            if (isExpand) {
                this.expand(td);
            }
            else {
                this.collapse(td);
            }
        }
    };
    DetailRow.prototype.keyPressHandler = function (e) {
        var gObj = this.parent;
        var isMacLike = /(Mac)/i.test(navigator.platform);
        if (isMacLike && e.metaKey) {
            if (e.action === 'downArrow') {
                e.action = 'ctrlDownArrow';
            }
            else if (e.action === 'upArrow') {
                e.action = 'ctrlUpArrow';
            }
        }
        switch (e.action) {
            case 'ctrlDownArrow':
                this.expandAll();
                break;
            case 'ctrlUpArrow':
                this.collapseAll();
                break;
            case 'altUpArrow':
            case 'altDownArrow':
                // eslint-disable-next-line no-case-declarations
                var selected = gObj.allowSelection ? gObj.getSelectedRowIndexes() : [];
                if (selected.length) {
                    var dataRow = gObj.getDataRows()[selected[selected.length - 1]];
                    var td = dataRow.querySelector('.e-detailrowcollapse, .e-detailrowexpand');
                    if (e.action === 'altDownArrow') {
                        this.expand(td);
                    }
                    else {
                        this.collapse(td);
                    }
                }
                break;
            case 'enter':
                if (this.parent.isEdit) {
                    return;
                }
                // eslint-disable-next-line no-case-declarations
                var element = this.focus.getFocusedElement();
                if (element && (element.classList.contains('e-icon-grightarrow') || element.classList.contains('e-icon-gdownarrow'))) {
                    element = element.parentElement;
                }
                if (element && !element.classList.contains('e-detailrowcollapse') &&
                    !element.classList.contains('e-detailrowexpand')) {
                    break;
                }
                this.toogleExpandcollapse(element);
                break;
        }
    };
    DetailRow.prototype.refreshColSpan = function () {
        var detailrows = this.parent.contentModule.getTable().querySelectorAll('tr.e-detailrow');
        var colSpan = this.parent.getVisibleColumns().length;
        for (var i = 0; i < detailrows.length; i++) {
            detailrows[parseInt(i.toString(), 10)].querySelector('.e-detailcell').setAttribute('colspan', colSpan + '');
        }
    };
    DetailRow.prototype.destroyChildGrids = function (args) {
        var gObj = this.parent;
        if (gObj.enableInfiniteScrolling && (gObj.childGrid || gObj.detailTemplate) && args.requestType === 'infiniteScroll'
            && gObj.infiniteScrollSettings.enableCache) {
            var cacheIndex = args.direction === 'down'
                ? args.currentPage - gObj.infiniteScrollSettings.initialBlocks
                : args.currentPage + gObj.infiniteScrollSettings.initialBlocks;
            var infiniteCache_1 = gObj.contentModule
                .infiniteCache[parseInt(cacheIndex.toString(), 10)];
            var detailRows_1 = infiniteCache_1.filter(function (data) { return data.isDetailRow && data.parentUid; });
            if (gObj.childGrid) {
                var _loop_1 = function (i) {
                    var detailRow = gObj.getContentTable()
                        .querySelector('[data-uid="' + detailRows_1[parseInt(i.toString(), 10)].uid + '"]');
                    var childGridElement = detailRow.querySelector('.e-childgrid');
                    var childGridIndex = this_1.childRefs.findIndex(function (grid) { return grid.element.id === childGridElement.id; });
                    if (!this_1.childRefs[parseInt(childGridIndex.toString(), 10)].isDestroyed) {
                        this_1.childRefs[parseInt(childGridIndex.toString(), 10)].destroy();
                        this_1.childRefs.splice(childGridIndex, 1);
                    }
                    var detailRowIndex = infiniteCache_1.indexOf(detailRows_1[parseInt(i.toString(), 10)]);
                    infiniteCache_1.splice(detailRowIndex, 1);
                    infiniteCache_1[detailRowIndex - 1].childGrid = null;
                    infiniteCache_1[detailRowIndex - 1].isExpand = false;
                    detailRow.remove();
                };
                var this_1 = this;
                for (var i = 0; i < detailRows_1.length; i++) {
                    _loop_1(i);
                }
            }
            if (gObj.detailTemplate && detailRows_1.length) {
                var args_1 = [];
                var _loop_2 = function (i) {
                    args_1.push({
                        detailRow: gObj.getContentTable().querySelector('[data-uid="' + detailRows_1[parseInt(i.toString(), 10)].uid + '"]'),
                        detailRowObject: detailRows_1[parseInt(i.toString(), 10)],
                        parentRowObject: infiniteCache_1.find(function (parent) { return detailRows_1[parseInt(i.toString(), 10)]
                            .parentUid === parent.uid; })
                    });
                };
                for (var i = 0; i < detailRows_1.length; i++) {
                    _loop_2(i);
                }
                this.parent.trigger(events.beforeDetailTemplateDetach, args_1, function () {
                    for (var i = 0; i < detailRows_1.length; i++) {
                        var detailRow = gObj.getContentTable()
                            .querySelector('[data-uid="' + detailRows_1[parseInt(i.toString(), 10)].uid + '"]');
                        var detailRowIndex = infiniteCache_1.indexOf(detailRows_1[parseInt(i.toString(), 10)]);
                        infiniteCache_1.splice(detailRowIndex, 1);
                        infiniteCache_1[detailRowIndex - 1].isExpand = false;
                        detailRow.remove();
                    }
                });
            }
            return;
        }
        var rows = this.parent.getRowsObject();
        for (var i = 0; i < rows.length; i++) {
            rows[parseInt(i.toString(), 10)].childGrid = null;
        }
        for (var i = 0; i < this.childRefs.length; i++) {
            if (!this.childRefs[parseInt(i.toString(), 10)].isDestroyed) {
                this.childRefs[parseInt(i.toString(), 10)].destroy();
            }
        }
        this.childRefs = [];
    };
    DetailRow.prototype.detachDetailTemplate = function () {
        var gObj = this.parent;
        if (gObj.detailTemplate) {
            var rowsObject_1 = gObj.getRowsObject();
            var detailRows_2 = rowsObject_1.filter(function (data) { return data.isDetailRow && data.parentUid; });
            if (detailRows_2.length) {
                var args_2 = [];
                detailRows_2.map(function (data) {
                    args_2.push({
                        detailRow: gObj.getContentTable().querySelector('[data-uid="' + data.uid + '"]'),
                        detailRowObject: data,
                        parentRowObject: rowsObject_1.find(function (parent) { return data.parentUid === parent.uid; })
                    });
                });
                gObj.trigger(events.beforeDetailTemplateDetach, args_2, function () {
                    detailRows_2.map(function (data) {
                        gObj.getContentTable().querySelector('[data-uid="' + data.uid + '"]').remove();
                    });
                });
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} returns the module name
     * @private
     */
    DetailRow.prototype.getModuleName = function () {
        return 'detailRow';
    };
    return DetailRow;
}());
export { DetailRow };
