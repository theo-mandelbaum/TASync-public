import * as events from '../../common/base/constant';
import * as cls from '../base/css-constant';
import { PivotFieldList } from '../../pivotfieldlist/base/field-list';
import { createElement, setStyleAttribute, formatUnit, prepend, addClass, removeClass, isNullOrUndefined, select, remove } from '@syncfusion/ej2-base';
import { CalculatedField } from '../../common/calculatedfield/calculated-field';
PivotFieldList.Inject(CalculatedField);
/**
 * Module for Field List rendering
 */
/** @hidden */
var FieldList = /** @class */ (function () {
    /**
     * Constructor for Field List module.
     *
     * @param {PivotView} parent - It represent the parent
     */
    function FieldList(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - It returns a ModuleName
     * @private
     */
    FieldList.prototype.getModuleName = function () {
        return 'fieldList';
    };
    FieldList.prototype.initiateModule = function () {
        if (!select('#' + this.parent.element.id + '_PivotFieldList', this.parent.element)) {
            this.element = createElement('div', {
                id: this.parent.element.id + '_PivotFieldList',
                styles: 'position:' + (this.parent.enableRtl ? 'static' : 'absolute') + ';height:0;width:' + this.parent.element.style.width +
                    ';display:none'
            });
            if (select('#' + this.parent.element.id + 'containerwrapper', document) === null) {
                var containerWrapper = createElement('div', {
                    id: this.parent.element.id + 'containerwrapper',
                    styles: 'height:' + (isNaN(this.parent.height) ? this.parent.height : (this.parent.height + 'px'))
                });
                this.parent.element.parentElement.appendChild(containerWrapper);
                containerWrapper.appendChild(this.element);
                containerWrapper.appendChild(this.parent.element);
            }
            else {
                select('#' + this.parent.element.id + 'containerwrapper', document).appendChild(this.element);
            }
            this.parent.pivotFieldListModule = new PivotFieldList({
                dataSourceSettings: {
                    providerType: this.parent.dataSourceSettings.providerType,
                    rows: [],
                    columns: [],
                    values: [],
                    filters: []
                },
                spinnerTemplate: this.parent.spinnerTemplate,
                allowDeferLayoutUpdate: this.parent.allowDeferLayoutUpdate,
                renderMode: 'Popup',
                allowCalculatedField: this.parent.allowCalculatedField,
                showValuesButton: this.parent.showValuesButton,
                enableRtl: this.parent.enableRtl,
                locale: this.parent.locale,
                target: this.parent.element.parentElement,
                aggregateTypes: this.parent.aggregateTypes,
                maxNodeLimitInMemberEditor: this.parent.maxNodeLimitInMemberEditor,
                aggregateCellInfo: this.parent.bindTriggerEvents.bind(this.parent),
                onHeadersSort: this.parent.bindTriggerEvents.bind(this.parent),
                cssClass: this.parent.cssClass,
                enableFieldSearching: this.parent.enableFieldSearching,
                enableHtmlSanitizer: this.parent.enableHtmlSanitizer
            });
            this.parent.pivotFieldListModule.isPopupView = true;
            this.parent.pivotFieldListModule.pivotGridModule = this.parent;
            this.parent.pivotFieldListModule.appendTo(this.element);
        }
    };
    FieldList.prototype.updateControl = function () {
        if (this.parent.allowDeferLayoutUpdate) {
            this.parent.actionObj.actionName = 'Field list refreshed';
        }
        if (this.element) {
            var hasFieldList = void 0;
            for (var i = 0; i < this.parent.toolbar.length; i++) {
                if (this.parent.toolbar[i] === 'FieldList') {
                    hasFieldList = true;
                }
            }
            if (hasFieldList && this.parent.showToolbar && this.parent.dataSourceSettings.mode === 'Server') {
                this.element.style.display = 'none';
            }
            else {
                this.element.style.display = 'block';
            }
            prepend([this.element], this.parent.element);
            if (this.parent.showGroupingBar && this.parent.groupingBarModule) {
                clearTimeout(this.timeOutObj);
                this.timeOutObj = setTimeout(this.update.bind(this));
            }
            else if (!isNullOrUndefined((this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)))) {
                setStyleAttribute(this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS), {
                    left: 'auto'
                });
                if (this.parent.enableRtl) {
                    removeClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
                }
                else {
                    addClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
                }
            }
            setStyleAttribute(this.element, {
                width: formatUnit(this.parent.element.offsetWidth)
            });
        }
        this.parent.pivotFieldListModule.update(this.parent);
    };
    FieldList.prototype.update = function () {
        var currentWidth;
        if (this.parent.currentView !== 'Table') {
            currentWidth = this.parent.chart ? this.parent.pivotChartModule.getCalulatedWidth() : currentWidth;
        }
        else {
            currentWidth = this.parent.grid ? this.parent.grid.element.offsetWidth : currentWidth;
        }
        if (currentWidth && (!isNullOrUndefined((this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS))))) {
            var actualWidth = currentWidth < 400 ? (this.parent.minWidth || 400) : currentWidth;
            setStyleAttribute(this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS), {
                left: formatUnit(this.parent.enableRtl ?
                    -Math.abs((actualWidth) -
                        this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).offsetWidth) :
                    (actualWidth) -
                        this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS).offsetWidth)
            });
            if (this.parent.enableRtl) {
                addClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
            }
            else {
                removeClass([this.element.querySelector('.' + cls.TOGGLE_FIELD_LIST_CLASS)], 'e-fieldlist-left');
            }
        }
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    FieldList.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initSubComponent, this.initiateModule, this);
        this.parent.on(events.uiUpdate, this.updateControl, this);
    };
    /**
     *
     * @returns {void}
     * @hidden
     */
    FieldList.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.initSubComponent, this.initiateModule);
        this.parent.off(events.uiUpdate, this.updateControl);
    };
    /**
     * To destroy the Field List.
     *
     * @returns {void}
     * @hidden
     */
    FieldList.prototype.destroy = function () {
        this.removeEventListener();
        if (this.parent.pivotFieldListModule && !this.parent.pivotFieldListModule.isDestroyed) {
            this.parent.pivotFieldListModule.destroy();
            this.parent.pivotFieldListModule = null;
            if (!isNullOrUndefined(select('#' + this.parent.element.id + '_PivotFieldList', document))) {
                remove(select('#' + this.parent.element.id + '_PivotFieldList', document));
            }
        }
        else {
            return;
        }
    };
    return FieldList;
}());
export { FieldList };
