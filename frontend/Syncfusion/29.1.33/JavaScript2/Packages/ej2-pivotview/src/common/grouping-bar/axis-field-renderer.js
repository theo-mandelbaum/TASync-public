import * as events from '../../common/base/constant';
import * as cls from '../../common/base/css-constant';
import { createElement, isNullOrUndefined, prepend } from '@syncfusion/ej2-base';
import { PivotUtil } from '../../base/util';
import { PivotButton } from '../actions/pivot-button';
import { DataManager } from '@syncfusion/ej2-data';
/**
 * Module to render Axis Fields
 */
/** @hidden */
var AxisFields = /** @class */ (function () {
    /** Constructor for render module
     *
     * @param {PivotView} parent - Instance.
     */
    function AxisFields(parent) {
        this.parent = parent;
    }
    /**
     * Initialize the grouping bar pivot button rendering
     *
     * @returns {void}
     * @private
     */
    AxisFields.prototype.render = function () {
        if ((!this.parent.pivotButtonModule || (this.parent.pivotButtonModule && this.parent.pivotButtonModule.isDestroyed))) {
            new PivotButton(this.parent);
        }
        this.createPivotButtons();
        var pivotButtons = [];
        pivotButtons = pivotButtons.concat([].slice.call(this.parent.groupingBarModule.rowPanel.querySelectorAll('.' + cls.PIVOT_BUTTON_WRAPPER_CLASS)));
        var vlen = pivotButtons.length;
        for (var j = 0; j < vlen; j++) {
            var indentWidth = 24;
            if (!this.parent.isTabular) {
                var indentDiv = createElement('span', {
                    className: 'e-indent-div',
                    styles: this.parent.isTabular ? 'auto' : 'width:' + j * indentWidth + 'px'
                });
                prepend([indentDiv], pivotButtons[j]);
            }
        }
    };
    AxisFields.prototype.createPivotButtons = function () {
        var fields = [this.parent.dataSourceSettings.rows, this.parent.dataSourceSettings.columns,
            this.parent.dataSourceSettings.values, this.parent.dataSourceSettings.filters];
        var elements = Array.prototype.slice.call(this.parent.element.querySelectorAll('.' + cls.GROUP_ALL_FIELDS_CLASS +
            ',.' + cls.GROUP_ROW_CLASS + ',.' + cls.GROUP_COLUMN_CLASS + ',.' + cls.GROUP_VALUE_CLASS + ',.' + cls.GROUP_FILTER_CLASS));
        if (isNullOrUndefined(this.parent.element.querySelector('.' + cls.GROUP_PIVOT_ROW))) {
            elements.push(this.parent.groupingBarModule.rowPanel);
        }
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if ((this.parent.dataSourceSettings.values.length > 0 ? !element.classList.contains(cls.GROUP_CHART_VALUE) : true) ||
                (this.parent.dataSourceSettings.columns.length > 0 ? !element.classList.contains(cls.GROUP_CHART_COLUMN) : true)) {
                element.innerHTML = '';
            }
        }
        if ((this.parent.dataType === 'pivot' && this.parent.dataSourceSettings.dataSource && ((!(this.parent.dataSourceSettings.dataSource instanceof DataManager) &&
            (this.parent.dataSourceSettings.dataSource.length > 0)) ||
            (this.parent.dataSourceSettings.dataSource instanceof DataManager && this.parent.engineModule.data &&
                this.parent.engineModule.data.length > 0))) || (this.parent.dataType === 'olap' &&
            this.parent.dataSourceSettings.url && this.parent.dataSourceSettings.url !== '') ||
            (this.parent.dataSourceSettings.mode === 'Server' && this.parent.dataSourceSettings.url &&
                this.parent.dataSourceSettings.url !== '')) {
            var axis = ['rows', 'columns', 'values', 'filters'];
            if (this.parent.dataType === 'pivot' && this.parent.groupingBarSettings.showFieldsPanel) {
                axis.push('all-fields');
                fields.push([]);
                for (var _i = 0, _a = (this.parent.engineModule && this.parent.engineModule.fieldList ?
                    Object.keys(this.parent.engineModule.fieldList) : []); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (this.parent.engineModule.fieldList[key] &&
                        !this.parent.engineModule.fieldList[key].isSelected) {
                        fields[fields.length - 1].push(PivotUtil.getFieldInfo(key, this.parent, true).fieldItem);
                    }
                }
            }
            for (var i = 0, lnt = fields.length; i < lnt; i++) {
                if (fields[i]) {
                    var args = {
                        field: fields[i],
                        axis: axis[i].toString()
                    };
                    this.parent.notify(events.pivotButtonUpdate, args);
                }
            }
        }
    };
    return AxisFields;
}());
export { AxisFields };
