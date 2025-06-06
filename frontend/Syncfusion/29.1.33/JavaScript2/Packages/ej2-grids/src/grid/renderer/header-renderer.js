import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { setStyleAttribute, closest as getClosest, remove } from '@syncfusion/ej2-base';
import { classList } from '@syncfusion/ej2-base';
import { CellType } from '../base/enum';
import { RowRenderer } from './row-renderer';
import { Cell } from '../models/cell';
import { Row } from '../models/row';
import * as events from '../base/constant';
import { Draggable, Droppable } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { parentsUntil, wrap, measureColumnDepth, appendChildren, addFixedColumnBorder, clearReactVueTemplates } from '../base/util';
import * as literals from '../base/string-literals';
// eslint-disable-next-line valid-jsdoc, jsdoc/require-param
/**
 * Content module is used to render grid content
 *
 * @hidden
 */
var HeaderRender = /** @class */ (function () {
    /**
     * Constructor for header renderer module
     *
     * @param {IGrid} parent - specifies the IGrid
     * @param {ServiceLocator} serviceLocator - specifies the serviceLocator
     */
    function HeaderRender(parent, serviceLocator) {
        var _this = this;
        this.frzIdx = 0;
        this.notfrzIdx = 0;
        this.isFirstCol = false;
        this.isReplaceDragEle = true;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.helper = function (e) {
            var gObj = _this.parent;
            var target = _this.draggable.currentStateTarget;
            var parentEle = parentsUntil(target, 'e-headercell');
            if (!(gObj.allowReordering || gObj.allowGrouping) || (!isNullOrUndefined(parentEle)
                && parentEle.getElementsByClassName('e-checkselectall').length > 0)) {
                return false;
            }
            var visualElement = _this.parent.createElement('div', { className: 'e-cloneproperties e-dragclone e-headerclone' });
            var element = target.classList.contains('e-headercell') ? target : parentEle;
            if (!element || (!gObj.allowReordering && element.classList.contains('e-stackedheadercell'))) {
                return false;
            }
            var height = element.offsetHeight;
            var headercelldiv = element.querySelector('.e-headercelldiv') || element.querySelector('.e-stackedheadercelldiv');
            var col;
            if (headercelldiv) {
                if (element.querySelector('.e-stackedheadercelldiv')) {
                    col = gObj.getStackedHeaderColumnByHeaderText(headercelldiv.innerText.trim(), gObj.columns);
                }
                else {
                    col = gObj.getColumnByUid(headercelldiv.getAttribute('e-mappinguid'));
                }
                _this.column = col;
                if (_this.column.lockColumn) {
                    return false;
                }
                visualElement.setAttribute('e-mappinguid', _this.column.uid);
            }
            if (col && !isNullOrUndefined(col.headerTemplate)) {
                if (!isNullOrUndefined(col.headerTemplate)) {
                    var colIndex = gObj.getColumnIndexByField(col.field);
                    var result = col.getHeaderTemplate()(extend({ 'index': colIndex }, col), gObj, 'headerTemplate', null, null, null, null, gObj.root);
                    var isReactCompiler = gObj.isReact && typeof (col.headerTemplate) !== 'string';
                    var isReactChild = gObj.parentDetails && gObj.parentDetails.parentInstObj &&
                        gObj.parentDetails.parentInstObj.isReact;
                    if (isReactCompiler || isReactChild) {
                        gObj.renderTemplates();
                    }
                    appendChildren(visualElement, result);
                }
                else {
                    visualElement.innerHTML = col.headerTemplate;
                }
                if (!isNullOrUndefined(visualElement.firstChild) && visualElement.firstChild.nodeType === 1) {
                    visualElement.firstChild.style.pointerEvents = 'none';
                }
            }
            else {
                visualElement.innerHTML = headercelldiv ?
                    col.headerText : element.firstElementChild.innerHTML;
            }
            visualElement.style.width = element.offsetWidth + 'px';
            visualElement.style.height = element.offsetHeight + 'px';
            visualElement.style.lineHeight = (height - 6).toString() + 'px';
            gObj.element.appendChild(visualElement);
            return visualElement;
        };
        this.dragStart = function (e) {
            var gObj = _this.parent;
            gObj.element.querySelector('.e-gridpopup').style.display = 'none';
            gObj.notify(events.columnDragStart, { target: _this.draggable.currentStateTarget, column: _this.column, event: e.event });
        };
        this.drag = function (e) {
            var gObj = _this.parent;
            var target = e.target;
            if (target) {
                var closest = getClosest(target, '.e-grid');
                var cloneElement = _this.parent.element.querySelector('.e-cloneproperties');
                if (!closest || closest.getAttribute('id') !== gObj.element.getAttribute('id')) {
                    classList(cloneElement, ['e-notallowedcur'], ['e-defaultcur']);
                    if (gObj.allowReordering) {
                        gObj.element.querySelector('.e-reorderuparrow').style.display = 'none';
                        gObj.element.querySelector('.e-reorderdownarrow').style.display = 'none';
                    }
                    if (!gObj.groupSettings.allowReordering) {
                        return;
                    }
                }
                gObj.notify(events.columnDrag, { target: e.target, column: _this.column, event: e.event });
            }
        };
        this.dragStop = function (e) {
            var gObj = _this.parent;
            var cancel;
            gObj.element.querySelector('.e-gridpopup').style.display = 'none';
            if ((!parentsUntil(e.target, 'e-headercell') && !parentsUntil(e.target, 'e-groupdroparea')) ||
                (!gObj.allowReordering && parentsUntil(e.target, 'e-headercell')) ||
                (!e.helper.getAttribute('e-mappinguid') && parentsUntil(e.target, 'e-groupdroparea'))) {
                remove(e.helper);
                cancel = true;
            }
            gObj.notify(events.columnDragStop, { target: e.target, event: e.event, column: _this.column, cancel: cancel });
        };
        this.drop = function (e) {
            var gObj = _this.parent;
            var uid = e.droppedElement.getAttribute('e-mappinguid');
            var closest = getClosest(e.target, '.e-grid');
            remove(e.droppedElement);
            if (closest && closest.getAttribute('id') !== gObj.element.getAttribute('id') ||
                !(gObj.allowReordering || gObj.allowGrouping)) {
                return;
            }
            gObj.notify(events.headerDrop, { target: e.target, uid: uid, droppedElement: e.droppedElement });
        };
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.ariaService = this.serviceLocator.getService('ariaService');
        this.widthService = this.serviceLocator.getService('widthService');
        if (this.parent.isDestroyed) {
            return;
        }
        if (!this.parent.enableColumnVirtualization) {
            this.parent.on(events.columnVisibilityChanged, this.setVisible, this);
        }
        this.parent.on(events.columnPositionChanged, this.colPosRefresh, this);
        this.parent.on(events.initialEnd, this.renderCustomToolbar, this);
        if (this.parent.rowRenderingMode === 'Vertical') {
            this.parent.on(events.uiUpdate, this.updateCustomResponsiveToolbar, this);
        }
    }
    /**
     * The function is used to render grid header div
     *
     * @returns {void}
     */
    HeaderRender.prototype.renderPanel = function () {
        var div = this.parent.element.querySelector('.' + literals.gridHeader);
        var isRendered = (div != null);
        div = isRendered ? div : this.parent.createElement('div', { className: 'e-gridheader' });
        var innerDiv = isRendered ? div.querySelector('.' + literals.headerContent) :
            this.parent.createElement('div', { className: literals.headerContent });
        this.toggleStackClass(div);
        div.appendChild(innerDiv);
        this.setPanel(div);
        if (!isRendered) {
            this.parent.element.appendChild(div);
        }
    };
    /**
     * The function is used to render grid header div
     *
     * @returns {void}
     */
    HeaderRender.prototype.renderTable = function () {
        var headerDiv = this.getPanel();
        headerDiv.appendChild(this.createHeaderTable());
        this.setTable(headerDiv.querySelector('.' + literals.table));
        this.initializeHeaderDrag();
        this.initializeHeaderDrop();
        this.parent.notify(events.headerRefreshed, { rows: this.rows });
    };
    /**
     * Get the header content div element of grid
     *
     * @returns {Element} returns the element
     */
    HeaderRender.prototype.getPanel = function () {
        return this.headerPanel;
    };
    /**
     * Set the header content div element of grid
     *
     * @param  {Element} panel - specifies the panel element
     * @returns {void}
     */
    HeaderRender.prototype.setPanel = function (panel) {
        this.headerPanel = panel;
    };
    /**
     * Get the header table element of grid
     *
     * @returns {Element} returns the element
     */
    HeaderRender.prototype.getTable = function () {
        return this.headerTable;
    };
    /**
     * Set the header table element of grid
     *
     * @param  {Element} table - specifies the table element
     * @returns {void}
     */
    HeaderRender.prototype.setTable = function (table) {
        this.headerTable = table;
    };
    /**
     * Get the header colgroup element
     *
     * @returns {Element} returns the element
     */
    HeaderRender.prototype.getColGroup = function () {
        return this.colgroup;
    };
    /**
     * Set the header colgroup element
     *
     * @param {Element} colGroup - specifies the colgroup
     * @returns {Element} returns the element
     */
    HeaderRender.prototype.setColGroup = function (colGroup) {
        return this.colgroup = colGroup;
    };
    /**
     * Get the header row element collection.
     *
     * @returns {Element[]} returns the element
     */
    HeaderRender.prototype.getRows = function () {
        var table = this.getTable();
        return table.tHead.rows;
    };
    /**
     * The function is used to create header table elements
     *
     * @returns {Element} returns the element
     * @hidden
     */
    HeaderRender.prototype.createHeaderTable = function () {
        var table = this.createTable();
        var innerDiv = this.getPanel().querySelector('.' + literals.headerContent);
        innerDiv.appendChild(table);
        return innerDiv;
    };
    /**
     * The function is used to create header table elements
     *
     * @param {Element} tableEle - specifies the table Element
     * @param {freezeTable} tableName - specifies the table name
     * @returns {Element} returns the element
     * @hidden
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    HeaderRender.prototype.createHeader = function (tableEle, tableName) {
        if (tableEle === void 0) { tableEle = null; }
        var gObj = this.parent;
        if (this.getTable()) {
            remove(this.getTable());
        }
        var table = this.parent.createElement('table', { className: literals.table, attrs: { role: 'presentation' } });
        table.style.cssText = 'border-collapse: separate; border-spacing: .25px;';
        var findHeaderRow = this.createHeaderContent(tableName);
        var thead = findHeaderRow.thead;
        var tbody = this.parent.createElement(literals.tbody, { className: this.parent.frozenRows ||
                ((this.parent.enableVirtualization || this.parent.enableInfiniteScrolling) && this.parent.editSettings.showAddNewRow) ? '' :
                'e-hide', attrs: { role: 'rowgroup' } });
        this.caption = this.parent.createElement('caption', { innerHTML: this.parent.element.id + '_header_table', className: 'e-hide' });
        var colGroup = this.parent.createElement(literals.colGroup);
        var rowBody = this.parent.createElement('tr', { attrs: { role: 'row' }, className: (this.parent.enableVirtualization ||
                this.parent.enableInfiniteScrolling) && this.parent.editSettings.showAddNewRow ? 'e-hide' : '' });
        var bodyCell;
        var rows = this.rows = findHeaderRow.rows;
        for (var i = 0, len = rows.length; i < len; i++) {
            for (var j = 0, len_1 = rows[parseInt(i.toString(), 10)].cells.length; j < len_1; j++) {
                bodyCell = this.parent.createElement('td');
                rowBody.appendChild(bodyCell);
            }
        }
        if (gObj.allowFiltering || gObj.allowSorting || gObj.allowGrouping) {
            table.classList.add('e-sortfilter');
        }
        this.updateColGroup(colGroup);
        tbody.appendChild(rowBody);
        table.appendChild(this.setColGroup(colGroup));
        table.appendChild(thead);
        table.appendChild(tbody);
        table.appendChild(this.caption);
        return table;
    };
    /**
     * @param {Element} tableEle - specifies the column
     * @returns {Element} returns the element
     * @hidden
     */
    HeaderRender.prototype.createTable = function (tableEle) {
        if (tableEle === void 0) { tableEle = null; }
        return this.createHeader(tableEle);
    };
    HeaderRender.prototype.createHeaderContent = function (tableName) {
        var gObj = this.parent;
        var columns = gObj.getColumns();
        var thead = this.parent.createElement('thead', { attrs: { 'role': 'rowgroup' } });
        var colHeader = this.parent.createElement('tr', { className: 'e-columnheader', attrs: { role: 'row' } });
        var rowRenderer = new RowRenderer(this.serviceLocator, CellType.Header, gObj);
        rowRenderer.element = colHeader;
        var rows = [];
        var headerRow;
        this.colDepth = measureColumnDepth(gObj.columns);
        for (var i = 0, len = this.colDepth; i < len; i++) {
            rows[parseInt(i.toString(), 10)] = this.generateRow(i);
            rows[parseInt(i.toString(), 10)].cells = [];
        }
        rows = this.ensureColumns(rows);
        rows = this.getHeaderCells(rows, tableName);
        if (gObj.isRowDragable() && this.parent.getFrozenMode() === 'Right') {
            for (var i = 0, len = rows.length; i < len; i++) {
                rows[parseInt(i.toString(), 10)].cells.push(this.generateCell({}, CellType.RowDragHIcon));
            }
        }
        var headerTemplateColumn = columns.filter(function (a) { return a.headerTemplate; });
        if (headerTemplateColumn.length && (this.parent.isReact || this.parent.isVue)) {
            clearReactVueTemplates(this.parent, ['headerTemplate']);
        }
        for (var i = 0, len = this.colDepth; i < len; i++) {
            headerRow = rowRenderer.render(rows[parseInt(i.toString(), 10)], columns);
            if (this.parent.rowHeight && headerRow.querySelector('.e-headercell')) {
                headerRow.style.height = this.parent.rowHeight + 'px';
            }
            addFixedColumnBorder(headerRow);
            thead.appendChild(headerRow);
        }
        var findHeaderRow = {
            thead: thead,
            rows: rows
        };
        return findHeaderRow;
    };
    HeaderRender.prototype.updateColGroup = function (colGroup) {
        var cols = this.parent.getColumns();
        var col;
        var indexes = this.parent.getColumnIndexesInView();
        colGroup.id = this.parent.element.id + literals.colGroup;
        if (this.parent.allowGrouping) {
            for (var i = 0, len = this.parent.groupSettings.columns.length; i < len; i++) {
                if (this.parent.enableColumnVirtualization && indexes.indexOf(i) === -1) {
                    continue;
                }
                col = this.parent.createElement('col', { className: 'e-group-intent' });
                colGroup.appendChild(col);
            }
        }
        if (this.parent.detailTemplate || this.parent.childGrid) {
            col = this.parent.createElement('col', { className: 'e-detail-intent' });
            colGroup.appendChild(col);
        }
        if (this.parent.isRowDragable() && this.parent.getFrozenMode() !== 'Right') {
            col = this.parent.createElement('col', { className: 'e-drag-intent' });
            colGroup.appendChild(col);
        }
        for (var i = 0, len = cols.length; i < len; i++) {
            col = this.parent.createElement('col');
            if (cols[parseInt(i.toString(), 10)].visible === false) {
                setStyleAttribute(col, { 'display': 'none' });
            }
            colGroup.appendChild(col);
        }
        if (this.parent.isRowDragable() && this.parent.getFrozenMode() === 'Right') {
            col = this.parent.createElement('col', { className: 'e-drag-intent' });
            colGroup.appendChild(col);
        }
        return colGroup;
    };
    HeaderRender.prototype.ensureColumns = function (rows) {
        //TODO: generate dummy column for group, detail, stacked row here; ensureColumns here
        var gObj = this.parent;
        var indexes = this.parent.getColumnIndexesInView();
        for (var i = 0, len = rows.length; i < len; i++) {
            if (gObj.allowGrouping) {
                for (var c = 0, len_2 = gObj.groupSettings.columns.length; c < len_2; c++) {
                    if (this.parent.enableColumnVirtualization && indexes.indexOf(c) === -1) {
                        continue;
                    }
                    rows[parseInt(i.toString(), 10)].cells.push(this.generateCell({}, CellType.HeaderIndent));
                }
            }
            if (gObj.detailTemplate || gObj.childGrid) {
                var args = {};
                this.parent.notify(events.detailIndentCellInfo, args);
                rows[parseInt(i.toString(), 10)].cells.push(this.generateCell(args, CellType.DetailHeader));
            }
            if (gObj.isRowDragable() && this.parent.getFrozenMode() !== 'Right') {
                rows[parseInt(i.toString(), 10)].cells.push(this.generateCell({}, CellType.RowDragHIcon));
            }
        }
        return rows;
    };
    HeaderRender.prototype.getHeaderCells = function (rows, tableName) {
        var thead = this.parent.getHeaderTable() && this.parent.getHeaderTable().querySelector('thead');
        var cols = this.parent.enableColumnVirtualization ?
            this.parent.getColumns(this.parent.enablePersistence) : this.parent.columns;
        this.frzIdx = 0;
        this.notfrzIdx = 0;
        if (this.parent.lockcolPositionCount) {
            for (var i = 0; i < (!isNullOrUndefined(cols) ? cols.length : 0); i++) {
                this.lockColsRendered = false;
                rows = this.appendCells(cols[parseInt(i.toString(), 10)], rows, 0, i === 0, false, i === (cols.length - 1), thead, tableName, false);
            }
        }
        for (var i = 0, len = (!isNullOrUndefined(cols) ? cols.length : 0); i < len; i++) {
            this.notfrzIdx = 0;
            this.lockColsRendered = true;
            rows = this.appendCells(cols[parseInt(i.toString(), 10)], rows, 0, i === 0, false, i === (len - 1), thead, tableName, false);
        }
        return rows;
    };
    HeaderRender.prototype.appendCells = function (cols, rows, index, isFirstObj, isFirstCol, isLastCol, isMovable, tableName, isStackLastCol) {
        var lastCol = isLastCol ? isStackLastCol ? 'e-laststackcell' : 'e-lastcell' : '';
        var isLockColumn = !this.parent.lockcolPositionCount
            || (cols.lockColumn && !this.lockColsRendered) || (!cols.lockColumn && this.lockColsRendered);
        if (!cols.columns) {
            if (isLockColumn) {
                rows[parseInt(index.toString(), 10)].cells.push(this.generateCell(cols, CellType.Header, this.colDepth - index, (isFirstObj ? '' : (isFirstCol ? 'e-firstcell' : '')) + lastCol, index, this.parent.getColumnIndexByUid(cols.uid)));
            }
            if (this.parent.lockcolPositionCount) {
                if ((this.frzIdx + this.notfrzIdx < this.parent.frozenColumns) &&
                    ((cols.lockColumn && !this.lockColsRendered) || (!cols.lockColumn && this.lockColsRendered))) {
                    this.frzIdx++;
                }
                else {
                    this.notfrzIdx++;
                }
            }
            else {
                this.frzIdx++;
            }
        }
        else {
            this.isFirstCol = false;
            var colSpan = this.getCellCnt(cols, 0);
            if (colSpan) {
                var stackedLockColsCount = this.getStackedLockColsCount(cols, 0);
                var isStackedLockColumn = this.parent.lockcolPositionCount === 0
                    || (!this.lockColsRendered && stackedLockColsCount !== 0)
                    || (this.lockColsRendered && (colSpan - stackedLockColsCount) !== 0);
                if (isStackedLockColumn) {
                    rows[parseInt(index.toString(), 10)].cells.push(new Cell({
                        cellType: CellType.StackedHeader, column: cols,
                        colSpan: this.getColSpan(colSpan, stackedLockColsCount),
                        className: isFirstObj ? '' : (isFirstCol ? 'e-firstcell' : '')
                    }));
                }
            }
            if (this.parent.lockcolPositionCount && !this.lockColsRendered) {
                for (var i = 0; i < cols.columns.length; i++) {
                    rows = this.appendCells(cols.columns[parseInt(i.toString(), 10)], rows, index + 1, isFirstObj, i === 0, i === (cols.columns.length - 1) && isLastCol, isMovable, tableName, false);
                }
            }
            if (this.lockColsRendered) {
                for (var i = 0, len = cols.columns.length; i < len; i++) {
                    isFirstObj = isFirstObj && i === 0;
                    var isFirstCol_1 = this.isFirstCol = cols.columns[parseInt(i.toString(), 10)].visible
                        && !isFirstObj;
                    var isLaststackedCol = i === (len - 1) && isLastCol;
                    rows = this.appendCells(cols.columns[parseInt(i.toString(), 10)], rows, index + 1, isFirstObj, isFirstCol_1 && !isLaststackedCol, isLaststackedCol, isMovable, tableName, true);
                }
            }
        }
        return rows;
    };
    HeaderRender.prototype.getStackedLockColsCount = function (col, lockColsCount) {
        if (col.columns) {
            for (var i = 0; i < col.columns.length; i++) {
                lockColsCount = this.getStackedLockColsCount(col.columns[parseInt(i.toString(), 10)], lockColsCount);
            }
        }
        else if (col.lockColumn) {
            lockColsCount++;
        }
        return lockColsCount;
    };
    HeaderRender.prototype.getColSpan = function (colSpan, stackedLockColsCount) {
        colSpan = !this.lockColsRendered ? stackedLockColsCount : colSpan - stackedLockColsCount;
        return colSpan;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    HeaderRender.prototype.generateRow = function (index) {
        return new Row({});
    };
    HeaderRender.prototype.generateCell = function (column, cellType, rowSpan, className, rowIndex, colIndex) {
        var opt = {
            'visible': column.visible,
            'isDataCell': false,
            'isTemplate': !isNullOrUndefined(column.headerTemplate),
            'rowID': '',
            'column': column,
            'cellType': cellType,
            'rowSpan': rowSpan,
            'className': className,
            'index': rowIndex,
            'colIndex': colIndex
        };
        if (!opt.rowSpan || opt.rowSpan < 2) {
            delete opt.rowSpan;
        }
        return new Cell(opt);
    };
    /**
     * Function to hide header table column based on visible property
     *
     * @param {Column[]} columns - specifies the column
     * @returns {void}
     */
    HeaderRender.prototype.setVisible = function (columns) {
        var gObj = this.parent;
        var displayVal;
        var idx;
        for (var c = 0, clen = columns.length; c < clen; c++) {
            var column = columns[parseInt(c.toString(), 10)];
            idx = gObj.getNormalizedColumnIndex(column.uid);
            displayVal = column.visible ? '' : 'none';
            setStyleAttribute(this.getColGroup().children[parseInt(idx.toString(), 10)], { 'display': displayVal });
            if (gObj.editSettings.showAddNewRow && gObj.element.querySelector('.e-addedrow')) {
                setStyleAttribute(gObj.element.querySelector('.e-addedrow').querySelector('colgroup').childNodes[parseInt(idx.toString(), 10)], { 'display': displayVal });
            }
        }
        this.refreshUI();
        if (this.parent.editSettings.showAddNewRow) {
            this.parent.isAddNewRow = true;
        }
    };
    HeaderRender.prototype.colPosRefresh = function () {
        this.refreshUI();
    };
    /**
     * Refresh the header of the Grid.
     *
     * @returns {void}
     */
    HeaderRender.prototype.refreshUI = function () {
        var headerDiv = this.getPanel();
        this.toggleStackClass(headerDiv);
        var table = this.getTable();
        var tableName = undefined;
        if (table) {
            remove(table);
            if (this.parent.editSettings.showAddNewRow && !this.parent.isAddNewRow && table.querySelector('.e-addedrow') &&
                (this.parent.enableVirtualization || this.parent.enableInfiniteScrolling)) {
                (table.querySelector('.e-addedrow')).classList.add('e-addrow-removed');
                this.parent.isAddNewRow = true;
            }
            table.removeChild(table.firstChild);
            table.removeChild(table.childNodes[0]);
            var colGroup = this.parent.createElement(literals.colGroup);
            var findHeaderRow = this.createHeaderContent(tableName);
            this.rows = findHeaderRow.rows;
            table.insertBefore(findHeaderRow.thead, table.firstChild);
            this.updateColGroup(colGroup);
            table.insertBefore(this.setColGroup(colGroup), table.firstChild);
            this.appendContent(table);
            this.parent.notify(events.colGroupRefresh, {});
            this.widthService.setWidthToColumns();
            this.parent.updateDefaultCursor();
            this.initializeHeaderDrag();
            var rows = [].slice.call(headerDiv.querySelectorAll('tr.e-columnheader'));
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                var gCells = [].slice.call(row.getElementsByClassName('e-grouptopleftcell'));
                if (gCells.length) {
                    gCells[gCells.length - 1].classList.add('e-lastgrouptopleftcell');
                }
            }
            this.parent.notify(events.headerRefreshed, { rows: this.rows });
            if (this.parent.enableColumnVirtualization && parentsUntil(table, literals.movableHeader)) {
                this.parent.notify(events.headerRefreshed, { rows: this.rows, args: { isFrozen: false, isXaxis: true } });
            }
            if (this.parent.allowTextWrap && this.parent.textWrapSettings.wrapMode === 'Header') {
                wrap(rows, true);
            }
        }
        var firstHeaderCell = this.parent.getHeaderContent().querySelector('.e-headercell:not(.e-hide)');
        if (!isNullOrUndefined(firstHeaderCell)) {
            firstHeaderCell.tabIndex = 0;
        }
    };
    HeaderRender.prototype.toggleStackClass = function (div) {
        var column = this.parent.columns;
        var stackedHdr = (!isNullOrUndefined(column) ? column.some(function (column) { return !isNullOrUndefined(column.columns); })
            : false);
        if (stackedHdr) {
            div.classList.add('e-stackedheader');
        }
        else {
            div.classList.remove('e-stackedheader');
        }
    };
    HeaderRender.prototype.appendContent = function (table) {
        this.getPanel().querySelector('.' + literals.headerContent).appendChild(table);
    };
    HeaderRender.prototype.getCellCnt = function (col, cnt) {
        if (col.columns) {
            for (var i = 0, len = col.columns.length; i < len; i++) {
                cnt = this.getCellCnt(col.columns[parseInt(i.toString(), 10)], cnt);
            }
        }
        else {
            if (col.visible) {
                cnt++;
            }
        }
        return cnt;
    };
    HeaderRender.prototype.initializeHeaderDrag = function () {
        var gObj = this.parent;
        if (!(this.parent.allowReordering || (this.parent.allowGrouping && this.parent.groupSettings.showDropArea))) {
            return;
        }
        this.draggable = new Draggable(gObj.getHeaderContent(), {
            dragTarget: '.e-headercell',
            distance: 5,
            helper: this.helper,
            dragStart: this.dragStart,
            drag: this.drag,
            dragStop: this.dragStop,
            abort: '.e-rhandler',
            isReplaceDragEle: this.isReplaceDragEle
        });
        this.parent.on(events.destroy, this.droppableDestroy, this);
    };
    HeaderRender.prototype.initializeHeaderDrop = function () {
        var gObj = this.parent;
        this.droppable = new Droppable(gObj.getHeaderContent(), {
            accept: '.e-dragclone',
            drop: this.drop
        });
        this.parent.on(events.destroy, this.droppableDestroy, this);
    };
    HeaderRender.prototype.droppableDestroy = function () {
        if (this.droppable && !this.droppable.isDestroyed) {
            this.droppable.destroy();
        }
        if (this.draggable && !this.draggable.isDestroyed) {
            this.draggable.destroy();
        }
    };
    HeaderRender.prototype.renderCustomToolbar = function () {
        var _this = this;
        var gObj = this.parent;
        if (gObj.rowRenderingMode === 'Vertical' && !gObj.toolbar
            && (gObj.allowSorting || (gObj.allowFiltering && gObj.filterSettings.type !== 'FilterBar'))) {
            var div = gObj.createElement('div', { className: 'e-res-toolbar e-toolbar' });
            var toolbarItems = gObj.createElement('div', { className: 'e-toolbar-items' });
            var toolbarLeft = gObj.createElement('div', { className: 'e-toolbar-left' });
            var count = this.parent.allowFiltering && this.parent.allowSorting ? 2 : 1;
            for (var i = 0; i < count; i++) {
                var toolbarItem = gObj.createElement('div', { className: 'e-toolbar-item e-gridresponsiveicons e-icons e-tbtn-align' });
                var cls = count === 1 ? this.parent.allowSorting ? 'sort'
                    : 'filter' : i === 1 ? 'sort' : 'filter';
                var button = gObj.createElement('button', { className: 'e-tbar-btn e-control e-btn e-lib e-icon-btn' });
                var span = gObj.createElement('span', { className: 'e-btn-icon e-res' + cls + '-icon e-icons' });
                button.appendChild(span);
                var btnObj = new Button({
                    cssClass: this.parent.cssClass ? this.parent.cssClass : ''
                });
                btnObj.appendTo(button);
                button.onclick = function (e) {
                    if (e.target.classList.contains('e-ressort-btn')
                        || e.target.classList.contains('e-ressort-icon') ||
                        e.target.querySelector('.e-ressort-icon')) {
                        _this.parent.showResponsiveCustomSort();
                    }
                    else {
                        _this.parent.showResponsiveCustomFilter();
                    }
                };
                toolbarItem.appendChild(button);
                toolbarLeft.appendChild(toolbarItem);
            }
            toolbarItems.appendChild(toolbarLeft);
            div.appendChild(toolbarItems);
            gObj.element.insertBefore(div, this.parent.element.querySelector('.' + literals.gridHeader));
        }
        else {
            if (gObj.enableAdaptiveUI && !gObj.toolbar) {
                gObj.getContent().classList.add('e-responsive-header');
            }
        }
    };
    HeaderRender.prototype.updateCustomResponsiveToolbar = function (args) {
        var resToolbar = this.parent.element.querySelector('.e-responsive-toolbar');
        if (args.module === 'toolbar') {
            if (resToolbar) {
                remove(resToolbar);
            }
            else {
                this.renderCustomToolbar();
            }
        }
    };
    return HeaderRender;
}());
export { HeaderRender };
