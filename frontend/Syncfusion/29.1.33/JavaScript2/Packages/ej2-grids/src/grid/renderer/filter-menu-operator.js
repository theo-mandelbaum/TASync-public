import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Query, DataManager } from '@syncfusion/ej2-data';
import * as events from '../base/constant';
import * as literals from '../base/string-literals';
import { toggleFilterUI } from '../base/util';
/**
 * `filter operators` render boolean column.
 *
 * @hidden
 */
var FlMenuOptrUI = /** @class */ (function () {
    function FlMenuOptrUI(parent, customFltrOperators, serviceLocator, filterSettings) {
        this.ddOpen = this.dropDownOpen.bind(this);
        this.parent = parent;
        this.serviceLocator = serviceLocator;
        this.filterSettings = filterSettings;
        this.customFilterOperators = customFltrOperators;
        if (this.parent) {
            this.parent.on(events.filterMenuClose, this.destroyDropDownList, this);
            this.parent.on(events.destroy, this.destroyDropDownList, this);
        }
    }
    /**
     * @param {Element} dlgConetntEle - specifies the content element
     * @param {Element} target - specifies the target
     * @param {Column} column - specifies the column
     * @param {Dialog} dlgObj - specifies the dialog
     * @param {Object[]} operator - specifies the operator list
     * @returns {void}
     * @hidden
     */
    // eslint-disable-next-line max-len
    FlMenuOptrUI.prototype.renderOperatorUI = function (dlgConetntEle, target, column, dlgObj, operator) {
        var _this = this;
        this.dialogObj = dlgObj;
        var optr = column.type + 'Operator';
        this.optrData = this.customOptr = !isNullOrUndefined(operator) ? operator :
            (!isNullOrUndefined(this.parent.filterSettings.operators) && !isNullOrUndefined(this.parent.filterSettings.operators["" + optr])) ?
                this.parent.filterSettings.operators["" + optr] : this.customFilterOperators["" + optr];
        var dropDatasource = this.customOptr;
        var selectedValue = this.dropSelectedVal(column, optr);
        var optrDiv = this.parent.createElement('div', { className: 'e-flm_optrdiv' });
        dlgConetntEle.appendChild(optrDiv);
        var optrInput = this.parent.createElement('input', { id: column.uid + '-floptr' });
        optrDiv.appendChild(optrInput);
        this.dropOptr = new DropDownList({
            dataSource: dropDatasource,
            fields: { text: 'text', value: 'value' },
            cssClass: this.parent.cssClass ? 'e-popup-flmenu' + ' ' + this.parent.cssClass : 'e-popup-flmenu',
            enableRtl: this.parent.enableRtl,
            text: selectedValue,
            change: function () {
                var valInput = document.querySelector('.e-flmenu-valuediv').querySelector('input');
                if (_this.dropOptr.value === 'isempty' || _this.dropOptr.value === 'isnotempty' ||
                    _this.dropOptr.value === 'isnotnull' || _this.dropOptr.value === 'isnull') {
                    if (!isNullOrUndefined(valInput['ej2_instances'])) {
                        valInput['ej2_instances'][0]['enabled'] = false;
                    }
                    else {
                        valInput.setAttribute('disabled', 'true');
                    }
                }
                else if (!isNullOrUndefined(valInput.getAttribute('disabled'))) {
                    if (!isNullOrUndefined(valInput['ej2_instances'])) {
                        valInput['ej2_instances'][0]['enabled'] = true;
                    }
                    else {
                        valInput.removeAttribute('disabled');
                    }
                }
                toggleFilterUI(_this.dropOptr.value, column.uid, column, column.type, dlgObj, _this.dropOptr['previousValue']);
            }
        });
        this.dropOptr.addEventListener(literals['open'], this.ddOpen);
        this.dropOptr.appendTo('#' + column.uid + '-floptr');
    };
    FlMenuOptrUI.prototype.renderResponsiveDropDownList = function (args) {
        args.popup.element.style.width = '100%';
    };
    FlMenuOptrUI.prototype.dropDownOpen = function (args) {
        args.popup.element.style.zIndex = (this.dialogObj.zIndex + 1).toString();
        if (this.parent.enableAdaptiveUI) {
            this.renderResponsiveDropDownList(args);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FlMenuOptrUI.prototype.dropSelectedVal = function (col, optr) {
        var selValue = '';
        var columns = this.parent.filterSettings.columns;
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (col.field === column.field || (col.isForeignColumn() && col.foreignKeyValue === column.field)) {
                var selectedField = new DataManager(this.optrData).executeLocal(new Query().where('value', 'equal', column.operator));
                selValue = !isNullOrUndefined(selectedField[0]) ? selectedField[0].text : '';
            }
        }
        if (selValue === '') { // rewuired or not
            if (col.filter.operator) {
                var optrLen = Object.keys(this.optrData).length;
                for (var i = 0; i < optrLen; i++) {
                    if (this.optrData[parseInt(i.toString(), 10)].value === col.filter.operator) {
                        selValue = this.optrData[parseInt(i.toString(), 10)].text;
                    }
                }
            }
            else {
                selValue = this.optrData[0].text;
            }
        }
        return selValue;
    };
    /**
     * @returns {string} returns the operator
     * @hidden
     */
    FlMenuOptrUI.prototype.getFlOperator = function () {
        return this.dropOptr.value;
    };
    FlMenuOptrUI.prototype.destroyDropDownList = function () {
        if (this.dropOptr.isDestroyed) {
            return;
        }
        this.dropOptr.removeEventListener(literals['open'], this.ddOpen);
        this.dropOptr.destroy();
        this.parent.off(events.filterMenuClose, this.destroyDropDownList);
        this.parent.off(events.destroy, this.destroyDropDownList);
    };
    return FlMenuOptrUI;
}());
export { FlMenuOptrUI };
