import { isNullOrUndefined, addClass, extend } from '@syncfusion/ej2-base';
import { appendChildren, setStyleAndAttributes, addFixedColumnBorder, addStickyColumnPosition, resetColandRowSpanStickyPosition } from '../base/util';
import * as literals from '../base/string-literals';
/**
 * Edit render module is used to render grid edit row.
 *
 * @hidden
 */
var InlineEditRender = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {IGrid} parent - returns the IGrid
     */
    function InlineEditRender(parent) {
        this.parent = parent;
    }
    InlineEditRender.prototype.addNew = function (elements, args) {
        this.isEdit = false;
        var tbody;
        if ((this.parent.frozenRows || ((this.parent.enableVirtualization || this.parent.enableInfiniteScrolling) &&
            this.parent.editSettings.showAddNewRow)) && this.parent.editSettings.newRowPosition === 'Top') {
            tbody = this.parent.getHeaderTable().querySelector(literals.tbody);
        }
        else {
            tbody = this.parent.getContentTable().querySelector(literals.tbody);
        }
        args.row = this.parent.createElement('tr', { className: 'e-row e-addedrow' });
        if (this.parent.getContentTable().querySelector('.e-emptyrow') && !this.parent.editSettings.showAddNewRow) {
            var emptyRow = this.parent.getContentTable().querySelector('.e-emptyrow');
            emptyRow.parentNode.removeChild(emptyRow);
            if (this.parent.frozenRows && this.parent.element.querySelector('.e-frozenrow-empty')) {
                this.parent.element.querySelector('.e-frozenrow-empty').classList.remove('e-frozenrow-empty');
            }
        }
        if (this.parent.editSettings.newRowPosition === 'Top') {
            tbody.insertBefore(args.row, tbody.firstChild);
        }
        else {
            tbody.appendChild(args.row);
        }
        args.row.appendChild(this.getEditElement(elements, false, undefined, args, true));
        this.parent.editModule.checkLastRow(args.row, args);
    };
    InlineEditRender.prototype.update = function (elements, args) {
        this.isEdit = true;
        var tdElement = [].slice.call(args.row.querySelectorAll('td.e-rowcell'));
        args.row.innerHTML = '';
        args.row.appendChild(this.getEditElement(elements, true, tdElement, args, true));
        args.row.classList.add(literals.editedRow);
        this.parent.editModule.checkLastRow(args.row, args);
    };
    // eslint-disable-next-line max-len
    InlineEditRender.prototype.getEditElement = function (elements, isEdit, tdElement, args, isFrozen) {
        var gObj = this.parent;
        var gLen = 0;
        var isDetail = !isNullOrUndefined(gObj.detailTemplate) || !isNullOrUndefined(gObj.childGrid) ? 1 : 0;
        if (gObj.allowGrouping) {
            gLen = gObj.groupSettings.columns.length;
        }
        var td = this.parent.createElement('td', {
            className: 'e-editcell e-normaledit',
            attrs: {
                colspan: (gObj.getCurrentVisibleColumns(this.parent.enableColumnVirtualization).length +
                    this.parent.getIndentCount()).toString()
            }
        });
        var form = args.form =
            this.parent.createElement('form', { id: gObj.element.id + 'EditForm', className: 'e-gridform' });
        if (this.parent.editSettings.template) {
            this.appendChildren(form, args.rowData, isFrozen);
            td.appendChild(form);
            return td;
        }
        var table = this.parent.createElement('table', { className: 'e-table e-inline-edit', attrs: { cellspacing: '0.25', role: 'grid' } });
        table.appendChild(gObj.getContentTable().querySelector(literals.colGroup).cloneNode(true));
        var tbody = this.parent.createElement(literals.tbody, { attrs: { role: 'rowgroup' } });
        var tr = this.parent.createElement('tr');
        if (this.parent.rowHeight) {
            tr.style.height = this.parent.rowHeight + 'px';
        }
        var i = 0;
        if (isDetail) {
            tr.insertBefore(this.parent.createElement('td', { className: 'e-detailrowcollapse' }), tr.firstChild);
        }
        if (gObj.isRowDragable()) {
            tr.appendChild(this.parent.createElement('td', { className: 'e-dragindentcell' }));
        }
        while (i < gLen) {
            tr.appendChild(this.parent.createElement('td', { className: 'e-indentcell' }));
            i++;
        }
        var m = 0;
        i = 0;
        var inputValue;
        var isFirstVisibleCell = true;
        var cols = args.isCustomFormValidation ? this.parent.columnModel : gObj.getColumns();
        while ((isEdit && m < tdElement.length && i < cols.length) || i < cols.length) {
            var span = isEdit && tdElement[parseInt(m.toString(), 10)] ?
                tdElement[parseInt(m.toString(), 10)].getAttribute('colspan') : null;
            var col = cols[parseInt(i.toString(), 10)];
            inputValue = (elements[col.uid]).value;
            var td_1 = this.parent.createElement('td', { className: literals.rowCell, attrs: { 'colspan': span ? span : '' } });
            td_1.style.cssText = col.textAlign ? "text-align: " + col.textAlign + ";" : '';
            if (col.visible) {
                td_1.appendChild(elements[col.uid]);
                if (this.parent.rowRenderingMode === 'Vertical') {
                    setStyleAndAttributes(td_1, { 'data-cell': col.headerText });
                    if (i === 0) {
                        td_1.classList.add('e-responsive-editcell');
                    }
                }
                if (col.editType === 'booleanedit') {
                    td_1.classList.add('e-boolcell');
                }
                else if (col.commands || col.commandsTemplate) {
                    addClass([td_1], 'e-unboundcell');
                }
                if (!this.parent.enableRtl && (gObj.gridLines === 'Vertical' || gObj.gridLines === 'Both') &&
                    gLen && isFirstVisibleCell) {
                    td_1.classList.add('e-grid-group-first-cell');
                    isFirstVisibleCell = false;
                }
            }
            else {
                td_1.classList.add('e-hide');
            }
            if (this.parent.isFrozenGrid()) {
                addStickyColumnPosition(this.parent, col, td_1);
                if (this.parent.isSpan) {
                    var colSpan = td_1.getAttribute('colspan') ? parseInt(td_1.getAttribute('colspan'), 10) : 1;
                    resetColandRowSpanStickyPosition(this.parent, col, td_1, colSpan);
                }
                if (this.parent.enableColumnVirtualization) {
                    if (col.freeze === 'Left' && !isNullOrUndefined(col.valueX)) {
                        td_1.style.left = (col.valueX - this.parent.translateX) + 'px';
                    }
                    else if (col.freeze === 'Right' && !isNullOrUndefined(col.valueX)) {
                        td_1.style.right = (col.valueX + this.parent.translateX) + 'px';
                    }
                    else if (col.freeze === 'Fixed') {
                        td_1.style.left = (this.parent.leftrightColumnWidth('left') - this.parent.translateX) + 'px';
                        td_1.style.right = (this.parent.leftrightColumnWidth('right') + this.parent.translateX) + 'px';
                    }
                }
            }
            td_1.setAttribute('aria-label', inputValue + this.parent.localeObj.getConstant('ColumnHeader') + col.headerText);
            tr.appendChild(td_1);
            i = span ? i + parseInt(span, 10) : i + 1;
            m++;
        }
        addFixedColumnBorder(tr);
        tbody.appendChild(tr);
        table.appendChild(tbody);
        form.appendChild(table);
        td.appendChild(form);
        return td;
    };
    InlineEditRender.prototype.removeEventListener = function () {
        //To destroy the renderer
    };
    InlineEditRender.prototype.appendChildren = function (form, data, isFrozen) {
        var _this = this;
        var dummyData = extend({}, data, { isAdd: !this.isEdit, isFrozen: isFrozen }, true);
        var editTemplateID = this.parent.element.id + 'editSettingsTemplate';
        if (this.parent.isReact && typeof (this.parent.editSettings.template) !== 'string' &&
            !(this.parent.editSettings.template.prototype &&
                this.parent.editSettings.template.prototype.CSPTemplate)) {
            this.parent.getEditTemplate()(dummyData, this.parent, 'editSettingsTemplate', editTemplateID, null, null, form);
            this.parent.renderTemplates();
        }
        else {
            appendChildren(form, this.parent.getEditTemplate()(dummyData, this.parent, 'editSettingsTemplate', editTemplateID, null, null, null, this.parent.root));
        }
        // eslint-disable-next-line
        var setRules = function () {
            var cols = _this.parent.getColumns();
            for (var i = 0; i < cols.length; i++) {
                if (cols[parseInt(i.toString(), 10)].validationRules) {
                    _this.parent.editModule.formObj.rules[cols[parseInt(i.toString(), 10)].field] =
                        cols[parseInt(i.toString(), 10)].validationRules;
                }
            }
        };
    };
    return InlineEditRender;
}());
export { InlineEditRender };
