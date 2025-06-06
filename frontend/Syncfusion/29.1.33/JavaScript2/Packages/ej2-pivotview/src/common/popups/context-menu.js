import { createElement, remove, select } from '@syncfusion/ej2-base';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
import { ContextMenu } from '@syncfusion/ej2-navigations';
/**
 * Module to render Pivot button
 */
/** @hidden */
var PivotContextMenu = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {PivotView | PivotFieldList} parent - parent
     * */
    function PivotContextMenu(parent) {
        this.parent = parent;
        this.parent.contextMenuModule = this;
    }
    /**
     * Initialize the pivot table rendering
     *
     * @returns {void}
     * @private
     */
    PivotContextMenu.prototype.render = function () {
        this.renderContextMenu();
    };
    PivotContextMenu.prototype.renderContextMenu = function () {
        var menuItems = [
            { text: this.parent.localeObj.getConstant('addToFilter'), id: this.parent.element.id + '_Filters' },
            { text: this.parent.localeObj.getConstant('addToRow'), id: this.parent.element.id + '_Rows' },
            { text: this.parent.localeObj.getConstant('addToColumn'), id: this.parent.element.id + '_Columns' },
            { text: this.parent.localeObj.getConstant('addToValue'), id: this.parent.element.id + '_Values' }
        ];
        var menuOptions = {
            cssClass: cls.PIVOT_CONTEXT_MENU_CLASS + (this.parent.cssClass ? (' ' + this.parent.cssClass) : ''),
            items: menuItems,
            enableRtl: this.parent.enableRtl,
            locale: this.parent.locale,
            beforeOpen: this.onBeforeMenuOpen.bind(this),
            select: this.onSelectContextMenu.bind(this)
        };
        var cMenu = createElement('ul', {
            id: this.parent.element.id + '_PivotContextMenu'
        });
        this.parent.element.appendChild(cMenu);
        this.menuObj = new ContextMenu(menuOptions);
        this.menuObj.isStringTemplate = true;
        this.menuObj.appendTo(cMenu);
    };
    PivotContextMenu.prototype.onBeforeMenuOpen = function (args) {
        var items = [].slice.call(args.element.querySelectorAll('li'));
        var fieldType = this.parent.dataType === 'olap' ? this.fieldElement.getAttribute('data-type') :
            this.fieldElement.querySelector('.' + cls.PIVOT_BUTTON_CONTENT_CLASS).getAttribute('data-type');
        removeClass(items, cls.MENU_DISABLE);
        if (fieldType === 'CalculatedField' || fieldType === 'isMeasureFieldsAvail') {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                if (item.textContent !== this.parent.localeObj.getConstant('addToValue')) {
                    addClass([item], cls.MENU_DISABLE);
                }
            }
        }
        else if (fieldType === 'isMeasureAvail') {
            for (var _a = 0, items_2 = items; _a < items_2.length; _a++) {
                var item = items_2[_a];
                if (item.textContent !== this.parent.localeObj.getConstant('addToRow') &&
                    item.textContent !== this.parent.localeObj.getConstant('addToColumn')) {
                    addClass([item], cls.MENU_DISABLE);
                }
            }
        }
        else if (this.parent.dataType === 'olap') {
            for (var _b = 0, items_3 = items; _b < items_3.length; _b++) {
                var item = items_3[_b];
                if (item.textContent === this.parent.localeObj.getConstant('addToValue')) {
                    addClass([item], cls.MENU_DISABLE);
                    break;
                }
            }
        }
        else if (this.fieldElement.getAttribute('isvalue') === 'true') {
            for (var _c = 0, items_4 = items; _c < items_4.length; _c++) {
                var item = items_4[_c];
                if (item.textContent === this.parent.localeObj.getConstant('addToValue') ||
                    item.textContent === this.parent.localeObj.getConstant('addToFilter')) {
                    addClass([item], cls.MENU_DISABLE);
                }
            }
        }
    };
    PivotContextMenu.prototype.onSelectContextMenu = function (menu) {
        if (menu.element.textContent !== null) {
            var fieldName = this.fieldElement.getAttribute('data-uid');
            var dropClass = menu.item.id.replace(this.parent.element.id + '_', '').toLowerCase();
            this.parent.pivotCommon.dataSourceUpdate.control = this.parent.getModuleName() === 'pivotview' ? this.parent :
                (this.parent.pivotGridModule ? this.parent.pivotGridModule : this.parent);
            this.parent.pivotCommon.dataSourceUpdate.btnElement = this.fieldElement;
            this.parent.pivotCommon.dataSourceUpdate.updateDataSource(fieldName, dropClass, -1);
            this.parent.updateDataSource(true);
            this.fieldElement = undefined;
        }
    };
    /**
     * To destroy the pivot button event listener
     *
     * @returns {void}
     * @hidden
     */
    PivotContextMenu.prototype.destroy = function () {
        if (!this.parent.isDestroyed) {
            return;
        }
        if (this.menuObj && !this.menuObj.isDestroyed) {
            this.menuObj.destroy();
            if (select('#' + this.parent.element.id + '_PivotContextMenu', document)) {
                remove(select('#' + this.parent.element.id + '_PivotContextMenu', document));
            }
        }
        else {
            return;
        }
    };
    return PivotContextMenu;
}());
export { PivotContextMenu };
