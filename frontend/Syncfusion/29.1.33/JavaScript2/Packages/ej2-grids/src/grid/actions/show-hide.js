import { isNullOrUndefined, remove } from '@syncfusion/ej2-base';
import { iterateArrayOrObject, isGroupAdaptive, isActionPrevent, addRemoveEventListener } from '../base/util';
import { ColumnWidthService } from '../services/width-controller';
import * as events from '../base/constant';
/**
 * The `ShowHide` module is used to control column visibility.
 */
var ShowHide = /** @class */ (function () {
    /**
     * Constructor for the show hide module.
     *
     * @param {IGrid} parent - specifies the IGrid
     * @hidden
     */
    function ShowHide(parent) {
        this.colName = [];
        this.isShowHide = false;
        this.parent = parent;
        this.addEventListener();
        this.widthService = new ColumnWidthService(parent);
    }
    ShowHide.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.evtHandlers = [{ event: events.batchCancel, handler: this.batchChanges },
            { event: events.batchCnfrmDlgCancel, handler: this.resetColumnState }
        ];
        addRemoveEventListener(this.parent, this.evtHandlers, true, this);
    };
    /**
     * @returns {void}
     * @hidden
     */
    ShowHide.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        addRemoveEventListener(this.parent, this.evtHandlers, false);
    };
    ShowHide.prototype.batchChanges = function () {
        if (this.isShowHide) {
            this.isShowHide = false;
            this.setVisible(this.colName, this.changedCol);
            this.changedCol = this.colName = [];
        }
    };
    /**
     * Shows a column by column name.
     *
     * @param  {string|string[]} columnName - Defines a single or collection of column names to show.
     * @param  {string} showBy - Defines the column key either as field name or header text.
     * @returns {void}
     */
    ShowHide.prototype.show = function (columnName, showBy) {
        var keys = this.getToggleFields(columnName);
        var columns = this.getColumns(keys, showBy);
        this.parent.notify(events.tooltipDestroy, { module: 'edit' });
        for (var i = 0; i < columns.length; i++) {
            columns[parseInt(i.toString(), 10)].visible = true;
        }
        this.setVisible(columns);
    };
    /**
     * Hides a column by column name.
     *
     * @param  {string|string[]} columnName - Defines a single or collection of column names to hide.
     * @param  {string} hideBy - Defines the column key either as field name or header text.
     * @returns {void}
     */
    ShowHide.prototype.hide = function (columnName, hideBy) {
        var keys = this.getToggleFields(columnName);
        var columns = this.getColumns(keys, hideBy);
        this.parent.notify(events.tooltipDestroy, { module: 'edit' });
        for (var i = 0; i < columns.length; i++) {
            columns[parseInt(i.toString(), 10)].visible = false;
        }
        this.setVisible(columns);
    };
    ShowHide.prototype.getToggleFields = function (key) {
        var finalized = [];
        if (typeof key === 'string') {
            finalized = [key];
        }
        else {
            finalized = key;
        }
        return finalized;
    };
    ShowHide.prototype.getColumns = function (keys, getKeyBy) {
        var _this = this;
        var columns = iterateArrayOrObject(keys, function (key) {
            return iterateArrayOrObject(_this.parent.columnModel, function (item) {
                if (item["" + getKeyBy] === key) {
                    return item;
                }
                return undefined;
            })[0];
        });
        return columns;
    };
    ShowHide.prototype.batchActionPrevent = function (columns, changedStateColumns) {
        if (changedStateColumns === void 0) { changedStateColumns = []; }
        if (isActionPrevent(this.parent)) {
            this.colName = columns;
            this.changedCol = changedStateColumns;
            this.parent.closeEdit();
            return false;
        }
        return true;
    };
    ShowHide.prototype.resetColumnState = function () {
        if (this.isShowHide) {
            for (var i = 0; i < this.colName.length; i++) {
                this.colName[parseInt(i.toString(), 10)].visible = !this.colName[parseInt(i.toString(), 10)].visible;
            }
        }
    };
    /**
     * Shows or hides columns by given column collection.
     *
     * @private
     * @param {Column[]} columns - Specifies the columns.
     * @param {Column[]} changedStateColumns - specifies the changedStateColumns
     * @returns {void}
     */
    ShowHide.prototype.setVisible = function (columns, changedStateColumns) {
        var _this = this;
        if (changedStateColumns === void 0) { changedStateColumns = []; }
        this.isShowHide = true;
        if (!this.batchActionPrevent(columns, changedStateColumns)) {
            return;
        }
        changedStateColumns = (changedStateColumns.length > 0) ? changedStateColumns : columns;
        var args = {
            requestType: 'columnstate',
            cancel: false,
            columns: changedStateColumns
        };
        var cancel = 'cancel';
        if (this.parent.enableInfiniteScrolling && this.parent.allowGrouping
            && this.parent.groupModule.groupSettings.columns.length > 0) {
            this.parent.contentModule.visibleRows = [];
        }
        this.parent.trigger(events.actionBegin, args, function (showHideArgs) {
            var currentViewCols = _this.parent.getColumns();
            columns = isNullOrUndefined(columns) ? currentViewCols : columns;
            if (showHideArgs["" + cancel]) {
                _this.parent.notify(events.resetColumns, { showHideArgs: showHideArgs });
                if (columns.length > 0) {
                    columns[0].visible = true;
                }
                return;
            }
            _this.parent.notify(events.destroyEditForm, args);
            if (isGroupAdaptive(_this.parent)) {
                _this.parent.contentModule.emptyVcRows();
            }
            var addedRow = _this.parent.element.querySelector('.e-addedrow');
            if (_this.parent.editSettings.showAddNewRow && addedRow) {
                remove(addedRow);
                if (_this.parent.enableVirtualization || _this.parent.enableInfiniteScrolling) {
                    _this.parent.isAddNewRow = true;
                }
                _this.parent.addNewRowFocus = true;
                _this.parent.isEdit = false;
            }
            if (_this.parent.allowSelection && _this.parent.getSelectedRecords().length &&
                !_this.parent.selectionSettings.persistSelection) {
                _this.parent.clearSelection();
            }
            if (_this.parent.enableColumnVirtualization) {
                _this.parent.notify(events.refreshFrozenPosition, { isModeChg: true });
            }
            else {
                if (_this.parent.isFrozenGrid() && columns.length) {
                    _this.parent.notify(events.refreshFrozenPosition, { isModeChg: true });
                }
                else {
                    _this.parent.notify(events.columnVisibilityChanged, columns);
                }
            }
            var params = {
                requestType: 'columnstate',
                columns: changedStateColumns
            };
            _this.parent.trigger(events.actionComplete, params);
            var startAdd = !_this.parent.element.querySelector('.e-addedrow');
            if (_this.parent.editSettings.showAddNewRow && startAdd) {
                _this.parent.isEdit = false;
                _this.parent.addRecord();
                if (!(_this.parent.enableVirtualization || _this.parent.enableInfiniteScrolling)) {
                    _this.parent.notify(events.showAddNewRowFocus, {});
                }
            }
            if (_this.parent.columnQueryMode !== 'All') {
                _this.parent.refresh();
            }
        });
        if (!this.parent.groupSettings.columns.length) {
            if (this.parent.autoFit) {
                this.parent.preventAdjustColumns();
            }
            else if (this.parent.allowResizing && this.parent.resizeSettings.mode === 'Normal') {
                var isMaxWidth = this.parent.getHeaderTable().style.width.indexOf('px') === -1;
                this.widthService.setWidthToTable(isMaxWidth);
            }
        }
    };
    return ShowHide;
}());
export { ShowHide };
