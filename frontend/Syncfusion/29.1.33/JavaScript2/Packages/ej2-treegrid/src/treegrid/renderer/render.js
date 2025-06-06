import { getObject, appendChildren } from '@syncfusion/ej2-grids';
import { templateCompiler, extend, CellRenderer } from '@syncfusion/ej2-grids';
import { addClass, createElement, isNullOrUndefined, getValue } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { isRemoteData, isOffline, getExpandStatus, isFilterChildHierarchy } from '../utils';
/**
 * TreeGrid render module
 *
 * @hidden
 */
var Render = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {TreeGrid} parent - Tree Grid instance
     */
    function Render(parent) {
        this.parent = parent;
        this.templateResult = null;
        this.parent.grid.on('template-result', this.columnTemplateResult, this);
        this.parent.grid.on('reactTemplateRender', this.reactTemplateRender, this);
    }
    /**
     * Updated row elements for TreeGrid
     *
     * @param {RowDataBoundEventArgs} args - Row details before its bound to DOM
     * @returns {void}
     */
    Render.prototype.RowModifier = function (args) {
        if (!args.data) {
            return;
        }
        var data = args.data;
        var parentData = data.parentItem;
        if (!isNullOrUndefined(data.parentItem) && !isFilterChildHierarchy(this.parent) &&
            (!(this.parent.allowPaging && !(this.parent.pageSettings.pageSizeMode === 'Root')) ||
                (isRemoteData(this.parent) && !isOffline(this.parent)))) {
            var collapsed = (this.parent.initialRender && (!(isNullOrUndefined(parentData[this.parent.expandStateMapping]) ||
                parentData[this.parent.expandStateMapping]) || this.parent.enableCollapseAll)) ||
                !getExpandStatus(this.parent, args.data, this.parent.grid.getCurrentViewRecords());
            if (collapsed && !isNullOrUndefined(args.row)) {
                this.parent['toggleRowVisibility'](args.row, 'e-childrow-hidden');
                var rowsObj = this.parent.grid.getRowsObject();
                if (!this.parent.grid.isFrozenGrid() && !isNullOrUndefined(args.row.getAttribute('data-uid'))) {
                    rowsObj.filter(function (e) { return e.uid === args.row.getAttribute('data-uid'); })[0].visible = false;
                }
            }
        }
        if (isRemoteData(this.parent) && !isOffline(this.parent)) {
            var proxy_1 = this.parent;
            var parentrec = this.parent.getCurrentViewRecords().filter(function (rec) {
                return getValue(proxy_1.idMapping, rec) === getValue(proxy_1.parentIdMapping, data);
            });
            if (parentrec.length > 0 && !parentrec[0].isSummaryRow && !isNullOrUndefined(args.row)) {
                var display = parentrec[0].expanded ? 'e-childrow-visible' : 'e-childrow-hidden';
                this.parent['toggleRowVisibility'](args.row, display);
            }
        }
        //addClass([args.row], 'e-gridrowindex' + index + 'level' + (<ITreeData>args.data).level);
        var summaryRow = getObject('isSummaryRow', args.data);
        if (summaryRow) {
            addClass([args.row], 'e-summaryrow');
        }
        if (!isNullOrUndefined(args.row)) {
            if (args.row.querySelector('.e-treegridexpand')) {
                args.row.setAttribute('aria-expanded', 'true');
            }
            else if (args.row.querySelector('.e-treegridcollapse')) {
                args.row.setAttribute('aria-expanded', 'false');
            }
            if (this.parent.enableCollapseAll && this.parent.initialRender) {
                if (!isNullOrUndefined(data.parentItem)) {
                    this.parent['toggleRowVisibility'](args.row, 'e-childrow-hidden');
                }
            }
        }
        var dragStartData = 'dragStartData';
        var draggedRecord = 'draggedRecord';
        if (this.parent.rowDragAndDropModule && this.parent.grid.rowDragAndDropModule && (this.parent.grid.rowDragAndDropModule["" + dragStartData] ||
            this.parent.rowDragAndDropModule["" + draggedRecord]) && this.parent.getContentTable().scrollHeight <= this.parent.getContent().clientHeight) {
            var lastRowBorder = 'lastRowBorder';
            var lastVisualData = this.parent.getVisibleRecords()[this.parent.getVisibleRecords().length - 1];
            if (lastVisualData.uniqueID === args.data.uniqueID && !isNullOrUndefined(args.row) && !args.row.cells[0].classList.contains('e-lastrowcell')) {
                this.parent["" + lastRowBorder](args.row, true);
            }
        }
        if (this.parent.isReact) {
            var renderReactTemplates = 'renderReactTemplates';
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var thisRef_1 = this;
            // tslint:disable-next-line:typedef
            thisRef_1.parent["" + renderReactTemplates](function () {
                thisRef_1.parent.trigger(events.rowDataBound, args);
            });
        }
        else {
            this.parent.trigger(events.rowDataBound, args);
        }
    };
    /**
     * cell renderer for tree column index cell
     *
     * @param {QueryCellInfoEventArgs} args - Cell detail before its bound to DOM
     * @returns {void}
     */
    Render.prototype.cellRender = function (args) {
        if (!args.data) {
            return;
        }
        var grid = this.parent.grid;
        var data = args.data;
        var index;
        var ispadfilter = isNullOrUndefined(data.filterLevel);
        var pad = ispadfilter ? data.level : data.filterLevel;
        var totalIconsWidth = 0;
        var cellElement;
        var column = this.parent.getColumnByUid(args.column.uid);
        var summaryRow = data.isSummaryRow;
        var frozenColumns = this.parent.getFrozenColumns();
        if (!isNullOrUndefined(data.parentItem)) {
            index = data.parentItem.index;
        }
        else {
            index = data.index;
        }
        var columnIndex;
        var getVirtualColIndexByUid = 'getVirtualColIndexByUid';
        if (this.parent.enableColumnVirtualization && !this.parent.initialRender) {
            columnIndex = this.parent["" + getVirtualColIndexByUid](args.column.uid);
        }
        else {
            columnIndex = grid.getColumnIndexByUid(args.column.uid);
        }
        if (columnIndex === this.parent.treeColumnIndex && (args.requestType === 'add' || args.requestType
            === 'rowDragAndDrop' || args.requestType === 'delete' || isNullOrUndefined(args.cell.querySelector('.e-treecell')))) {
            var container = createElement('div', { className: 'e-treecolumn-container' });
            var emptyExpandIcon = createElement('span', { className: 'e-icons e-none' });
            emptyExpandIcon.style.width = '10px';
            emptyExpandIcon.style.display = 'inline-block';
            for (var n = 0; n < pad; n++) {
                totalIconsWidth += 10;
                container.appendChild(emptyExpandIcon.cloneNode());
            }
            var iconRequired = !isNullOrUndefined(data.hasFilteredChildRecords)
                ? data.hasFilteredChildRecords : data.hasChildRecords;
            if (iconRequired && !isNullOrUndefined(data.childRecords)) {
                if (this.parent['isFromGantt'] && this.parent.loadChildOnDemand) {
                    iconRequired = data.hasChildRecords;
                }
                else {
                    iconRequired = !(data.childRecords.length === 0);
                }
            }
            if (iconRequired) {
                addClass([args.cell], 'e-treerowcell');
                args.cell.setAttribute('aria-expanded', data.expanded ? 'true' : 'false');
                var expandIcon = createElement('span', { className: 'e-icons' });
                var expand = void 0;
                if (this.parent.initialRender) {
                    expand = data.expanded &&
                        (isNullOrUndefined(data[this.parent.expandStateMapping]) || data[this.parent.expandStateMapping]) &&
                        !this.parent.enableCollapseAll;
                }
                else {
                    expand = !(!data.expanded || !getExpandStatus(this.parent, data, this.parent.grid.getCurrentViewRecords()));
                }
                addClass([expandIcon], (expand) ? 'e-treegridexpand' : 'e-treegridcollapse');
                totalIconsWidth += 18;
                container.appendChild(expandIcon);
                emptyExpandIcon.style.width = '4px';
                totalIconsWidth += 7;
                container.appendChild(emptyExpandIcon.cloneNode());
            }
            else if (pad || !pad && !data.level) {
                // icons width
                totalIconsWidth += 20;
                container.appendChild(emptyExpandIcon.cloneNode());
                container.appendChild(emptyExpandIcon.cloneNode());
            }
            //should add below code when paging funcitonality implemented
            // if (data.hasChildRecords) {
            //     addClass([expandIcon], data.expanded ? 'e-treegridexpand' : 'e-treegridcollapse');
            // }
            cellElement = createElement('span', { className: 'e-treecell' });
            if (this.parent.allowTextWrap) {
                cellElement.style.width = 'Calc(100% - ' + totalIconsWidth + 'px)';
            }
            addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            this.updateTreeCell(args, cellElement);
            container.appendChild(cellElement);
            args.cell.appendChild(container);
        }
        else if (this.templateResult) {
            this.templateResult = null;
        }
        var freeze = (grid.getFrozenLeftColumnsCount() > 0 || grid.getFrozenRightColumnsCount() > 0) ? true : false;
        if (!freeze) {
            if (frozenColumns > this.parent.treeColumnIndex && frozenColumns > 0 &&
                grid.getColumnIndexByUid(args.column.uid) === frozenColumns) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if (frozenColumns < this.parent.treeColumnIndex && frozenColumns > 0 &&
                (grid.getColumnIndexByUid(args.column.uid) === frozenColumns
                    || grid.getColumnIndexByUid(args.column.uid) === frozenColumns - 1)) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if (frozenColumns === this.parent.treeColumnIndex && frozenColumns > 0 &&
                grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex - 1) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
        }
        else {
            var freezerightColumns = grid.getFrozenRightColumns();
            var freezeLeftColumns = grid.getFrozenLeftColumns();
            var movableColumns = grid.getMovableColumns();
            if ((freezerightColumns.length > 0) && freezerightColumns[0].field === args.column.field) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if ((freezeLeftColumns.length > 0) && freezeLeftColumns[0].field === args.column.field) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
            else if ((movableColumns.length > 0) && movableColumns[0].field === args.column.field) {
                addClass([args.cell], 'e-gridrowindex' + index + 'level' + data.level);
            }
        }
        if (!isNullOrUndefined(column) && column.showCheckbox) {
            this.parent.notify('columnCheckbox', args);
            if (this.parent.allowTextWrap) {
                var checkboxElement = args.cell.querySelectorAll('.e-frame')[0];
                var width = parseInt(checkboxElement.style.width, 16);
                totalIconsWidth += width;
                totalIconsWidth += 10;
                if (grid.getColumnIndexByUid(args.column.uid) === this.parent.treeColumnIndex) {
                    cellElement = args.cell.querySelector('.e-treecell');
                }
                else {
                    cellElement = args.cell.querySelector('.e-treecheckbox');
                }
                cellElement.style.width = 'Calc(100% - ' + totalIconsWidth + 'px)';
            }
        }
        if (summaryRow) {
            addClass([args.cell], 'e-summarycell');
            var summaryData = getObject(args.column.field, args.data);
            summaryData = isNullOrUndefined(summaryData) ? null : summaryData;
            if (args.cell.querySelector('.e-treecell') != null) {
                args.cell.querySelector('.e-treecell').innerHTML = summaryData;
            }
            else {
                if (args.column.template) {
                    args.cell.innerHTML = null;
                }
                else {
                    args.cell.innerHTML = summaryData;
                }
            }
        }
        this.parent['args'] = args;
        var columnModel = getValue('columnModel', this.parent);
        var treeColumn = columnModel[this.parent.treeColumnIndex];
        if ((isNullOrUndefined(this.parent.rowTemplate) && !(this.parent.isReact))
            || ((this.parent.isReact) &&
                !args.column['template'])) {
            this.parent.trigger(events.queryCellInfo, args);
        }
        else if (((this.parent.isReact) &&
            treeColumn.field !== args.column.field)) {
            var renderReactTemplates = 'renderReactTemplates';
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var thisRef_2 = this;
            // tslint:disable-next-line:typedef
            thisRef_2.parent["" + renderReactTemplates](function () {
                thisRef_2.parent.trigger(events.queryCellInfo, args);
            });
        }
    };
    Render.prototype.updateTreeCell = function (args, cellElement) {
        var columnModel = getValue('columnModel', this.parent);
        var treeColumn = columnModel[this.parent.treeColumnIndex];
        var templateFn = 'templateFn';
        var colindex = args.column.index;
        if (isNullOrUndefined(treeColumn.field)) {
            args.cell.setAttribute('aria-colindex', (colindex + 1) + '');
        }
        if (treeColumn.field === args.column.field && !isNullOrUndefined(treeColumn.template)) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            args.column.template = treeColumn.template;
            args.column["" + templateFn] = templateCompiler(args.column.template);
            args.cell.classList.add('e-templatecell');
        }
        var textContent = args.cell.querySelector('.e-treecell') != null ?
            args.cell.querySelector('.e-treecell').innerHTML : args.cell.innerHTML;
        if (typeof (args.column.template) === 'object' && this.templateResult) {
            appendChildren(cellElement, this.templateResult);
            this.templateResult = null;
            args.cell.innerHTML = '';
        }
        else if (args.cell.classList.contains('e-templatecell')) {
            var len = args.cell.children.length;
            var tempID = this.parent.element.id + args.column.uid;
            if (treeColumn.field === args.column.field && !isNullOrUndefined(treeColumn.template)) {
                var portals = 'portals';
                var renderReactTemplates = 'renderReactTemplates';
                if (this.parent.isReact && typeof (args.column.template) !== 'string') {
                    args.column["" + templateFn](args.data, this.parent, 'columnTemplate', tempID, null, null, cellElement);
                    if (isNullOrUndefined(this.parent.grid["" + portals])) {
                        this.parent.grid["" + portals] = this.parent["" + portals];
                    }
                    this.parent.notify('renderReactTemplate', this.parent["" + portals]);
                    // eslint-disable-next-line @typescript-eslint/no-this-alias
                    var thisRef_3 = this;
                    // tslint:disable-next-line:typedef
                    thisRef_3.parent["" + renderReactTemplates](function () {
                        thisRef_3.parent.trigger(events.queryCellInfo, args);
                    });
                }
                else {
                    var str = 'isStringTemplate';
                    var result = args.column["" + templateFn](extend({ 'index': '' }, args.data), this.parent, 'template', tempID, this.parent["" + str]);
                    appendChildren(cellElement, result);
                }
                delete args.column.template;
                delete args.column["" + templateFn];
                args.cell.innerHTML = '';
            }
            else {
                for (var i = 0; i < len; len = args.cell.children.length) {
                    cellElement.appendChild(args.cell.children[parseInt(i.toString(), 10)]);
                }
            }
        }
        else {
            cellElement.innerHTML = textContent;
            args.cell.innerHTML = '';
        }
    };
    /**
     * @param {string} columnUid - Defines column uid
     * @returns {void}
     * @hidden
     */
    Render.prototype.refreshReactColumnTemplateByUid = function (columnUid) {
        var _this = this;
        if (this.parent.isReact) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.parent.clearTemplate(['columnTemplate'], undefined, function () {
                var cells = 'cells';
                var rowIdx = 'index';
                var rowsObj = _this.parent.grid.getRowsObject();
                var rows = _this.parent.getDataRows();
                var indent = _this.parent.grid.getIndentCount();
                var cellIndex = _this.parent.grid.getNormalizedColumnIndex(columnUid);
                if (rows.length !== 0) {
                    for (var j = 0; j < rowsObj.length; j++) {
                        if (rowsObj[parseInt(j.toString(), 10)].isDataRow
                            && !isNullOrUndefined(rowsObj[parseInt(j.toString(), 10)].index)) {
                            var cell = rowsObj[parseInt(j.toString(), 10)]["" + cells][parseInt(cellIndex.toString(), 10)];
                            var cellRenderer = new CellRenderer(_this.parent.grid, _this.parent.grid.serviceLocator);
                            var td = rows.length >= rowsObj.length
                                ? _this.parent.getCellFromIndex(rowsObj[parseInt(j.toString(), 10)].index, cellIndex - indent)
                                : rows[rowsObj[parseInt(j.toString(), 10)].index].querySelector('.e-templatecell');
                            cellRenderer.refreshTD(td, cell, rowsObj[parseInt(j.toString(), 10)].data, { index: rowsObj[parseInt(j.toString(), 10)]["" + rowIdx] });
                            var treecell = _this.parent.getRows()[parseInt(j.toString(), 10)]
                                .cells[parseInt(cellIndex.toString(), 10)];
                            _this.cellRender({ data: rowsObj[parseInt(j.toString(), 10)].data, cell: treecell, column: cell.column });
                        }
                    }
                }
            });
        }
    };
    Render.prototype.columnTemplateResult = function (args) {
        this.templateResult = args.template;
    };
    // eslint-disable-next-line
    Render.prototype.reactTemplateRender = function (args, callBack) {
        var renderReactTemplates = 'renderReactTemplates';
        var portals = 'portals';
        this.parent["" + portals] = args;
        this.parent.notify('renderReactTemplate', this.parent["" + portals]);
        this.parent["" + renderReactTemplates](callBack);
    };
    Render.prototype.destroy = function () {
        this.parent.grid.off('template-result', this.columnTemplateResult);
        this.parent.grid.off('reactTemplateRender', this.reactTemplateRender);
    };
    return Render;
}());
export { Render };
