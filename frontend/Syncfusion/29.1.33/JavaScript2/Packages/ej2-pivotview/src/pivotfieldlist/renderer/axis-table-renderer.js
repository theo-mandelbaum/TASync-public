import { createElement, EventHandler, removeClass, addClass, Droppable } from '@syncfusion/ej2-base';
import * as cls from '../../common/base/css-constant';
/**
 * Module to render Axis Field Table
 */
/** @hidden */
var AxisTableRenderer = /** @class */ (function () {
    /** Constructor for render module */
    function AxisTableRenderer(parent) {
        this.parent = parent;
    }
    /**
     * Initialize the axis table rendering
     *
     * @returns {void}
     * @private
     */
    AxisTableRenderer.prototype.render = function () {
        if (!this.parent.isAdaptive) {
            var axisTable = createElement('div', {
                className: cls.AXIS_TABLE_CLASS + ' ' + (this.parent.dataType === 'olap' ? cls.OLAP_AXIS_TABLE_CLASS : '')
            });
            this.leftAxisPanel = createElement('div', { className: cls.LEFT_AXIS_PANEL_CLASS });
            this.rightAxisPanel = createElement('div', { className: cls.RIGHT_AXIS_PANEL_CLASS });
            this.parent.dialogRenderer.parentElement.appendChild(axisTable);
            axisTable.appendChild(this.leftAxisPanel);
            axisTable.appendChild(this.rightAxisPanel);
            this.axisTable = axisTable;
            this.renderAxisTable();
        }
        this.parent.axisFieldModule.render();
    };
    AxisTableRenderer.prototype.renderAxisTable = function () {
        var fieldLabels = ['filters', 'rows', 'columns', 'values'];
        for (var len = 0, lnt = fieldLabels.length; len < lnt; len++) {
            var axis = createElement('div', {
                className: cls.FIELD_LIST_CLASS + '-' + fieldLabels[len]
            });
            var axisTitleWrapper = createElement('div', {
                className: cls.AXIS_ICON_CLASS + '-container'
            });
            var axisTitle = createElement('div', {
                className: cls.AXIS_HEADER_CLASS,
                attrs: { title: this.parent.localeObj.getConstant(fieldLabels[len]) }
            });
            axisTitle.innerText = this.parent.localeObj.getConstant(fieldLabels[len]);
            axisTitleWrapper.appendChild(this.getIconupdate(fieldLabels[len]));
            axisTitleWrapper.appendChild(axisTitle);
            var axisContent = createElement('div', { className: cls.AXIS_CONTENT_CLASS + ' ' + 'e-' + fieldLabels[len] });
            var localePrompt = void 0;
            if (fieldLabels[len] === 'rows') {
                localePrompt = this.parent.localeObj.getConstant('dropRowPrompt');
            }
            else if (fieldLabels[len] === 'columns') {
                localePrompt = this.parent.localeObj.getConstant('dropColPrompt');
            }
            else if (fieldLabels[len] === 'values') {
                localePrompt = this.parent.localeObj.getConstant('dropValPrompt');
            }
            else {
                localePrompt = this.parent.localeObj.getConstant('dropFilterPrompt');
            }
            var axisPrompt = createElement('span', {
                className: cls.AXIS_PROMPT_CLASS
            });
            axisPrompt.innerText = localePrompt;
            new Droppable(axisContent, {});
            axis.appendChild(axisTitleWrapper);
            axis.appendChild(axisContent);
            axis.appendChild(axisPrompt);
            if (len <= 1) {
                this.leftAxisPanel.appendChild(axis);
            }
            else {
                this.rightAxisPanel.appendChild(axis);
            }
            this.unWireEvent(axisContent);
            this.wireEvent(axisContent);
        }
    };
    AxisTableRenderer.prototype.getIconupdate = function (axis) {
        var axisWrapper = createElement('span', {
            attrs: { 'tabindex': '-1', 'aria-disabled': 'false' },
            className: cls.AXIS_ICON_CLASS + '-icon-container'
        });
        var axisElement = createElement('span', {
            attrs: {
                'tabindex': '-1', 'aria-disabled': 'false'
            },
            className: cls.ICON + ' ' + cls.AXIS_ICON_CLASS + '-' + axis
        });
        axisWrapper.appendChild(axisElement);
        return axisWrapper;
    };
    AxisTableRenderer.prototype.wireEvent = function (element) {
        EventHandler.add(element, 'mouseover', this.updateDropIndicator, this);
        EventHandler.add(element, 'mouseleave', this.updateDropIndicator, this);
    };
    AxisTableRenderer.prototype.unWireEvent = function (element) {
        EventHandler.remove(element, 'mouseover', this.updateDropIndicator);
        EventHandler.remove(element, 'mouseleave', this.updateDropIndicator);
    };
    AxisTableRenderer.prototype.updateDropIndicator = function (e) {
        var parentElement = this.parent.dialogRenderer.parentElement;
        if (this.parent.isDragging && e.target.classList.contains(cls.AXIS_CONTENT_CLASS) && e.type === 'mouseover') {
            removeClass([].slice.call(parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
            removeClass([].slice.call(parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS + '-last')), cls.INDICATOR_HOVER_CLASS);
            var element = [].slice.call(e.target.querySelectorAll('.' + cls.PIVOT_BUTTON_WRAPPER_CLASS));
            if (element.length > 0) {
                addClass([element[element.length - 1].querySelector('.' + cls.DROP_INDICATOR_CLASS + '-last')], cls.INDICATOR_HOVER_CLASS);
            }
        }
        else if (!this.parent.isDragging || (!e.target.classList.contains(cls.DROPPABLE_CLASS) && e.type === 'mouseleave')) {
            removeClass([].slice.call(parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS)), cls.INDICATOR_HOVER_CLASS);
            removeClass([].slice.call(parentElement.querySelectorAll('.' + cls.DROP_INDICATOR_CLASS + '-last')), cls.INDICATOR_HOVER_CLASS);
        }
    };
    return AxisTableRenderer;
}());
export { AxisTableRenderer };
