var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { CellRenderer } from './cell-renderer';
import { appendChildren, templateCompiler } from '../base/util';
import { CellType } from '../base/enum';
/**
 * GroupCaptionCellRenderer class which responsible for building group caption cell.
 *
 * @hidden
 */
var GroupCaptionCellRenderer = /** @class */ (function (_super) {
    __extends(GroupCaptionCellRenderer, _super);
    function GroupCaptionCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellUid = 0;
        _this.element = _this.parent
            .createElement('TD', { className: 'e-groupcaption',
            attrs: { id: _this.parent.element.id + 'captioncell', tabindex: '-1' } });
        return _this;
    }
    /**
     * Function to render the cell content based on Column object.
     *
     * @param  {Cell} cell - specifies the cell
     * @param  {Object} data - specifies the GroupedData
     * @returns {Element} returns the element
     */
    GroupCaptionCellRenderer.prototype.render = function (cell, data) {
        this.element.id = this.parent.element.id + 'captioncell' + this.cellUid++;
        var node = this.element.cloneNode();
        var gObj = this.parent;
        var column = cell.column;
        var domSetter = column.getDomSetter ? column.getDomSetter() : 'innerHTML';
        var result;
        var fKeyValue;
        var gTemplateValue;
        data.headerText = cell.column.headerText;
        if (cell.isForeignKey) {
            fKeyValue = this.format(cell.column, cell.column.valueAccessor('foreignKey', data, cell.column));
        }
        var value = cell.isForeignKey ? fKeyValue : cell.column.enableGroupByFormat ? data.key :
            this.format(cell.column, cell.column.valueAccessor('key', data, cell.column));
        for (var j = 0; j < gObj.aggregates.length; j++) {
            var _loop_1 = function (i) {
                if (gObj.getVisibleColumns()[0].field === gObj.aggregates[parseInt(j.toString(), 10)].columns[parseInt(i.toString(), 10)]
                    .field && gObj.aggregates[parseInt(j.toString(), 10)].columns[parseInt(i.toString(), 10)].groupCaptionTemplate) {
                    var gCaptionTemp = gObj.aggregates[parseInt(j.toString(), 10)]
                        .columns[parseInt(i.toString(), 10)].groupCaptionTemplate;
                    if (typeof gCaptionTemp === 'string' && gCaptionTemp.includes('$')) {
                        gTemplateValue = gObj.aggregates[parseInt(j.toString(), 10)].columns[parseInt(i.toString(), 10)]
                            .groupCaptionTemplate.split('$')[0] + data[gObj.getVisibleColumns()[0].field][gObj
                            .aggregates[parseInt(j.toString(), 10)].columns[parseInt(i.toString(), 10)].type] +
                            gObj.aggregates[parseInt(j.toString(), 10)].columns[parseInt(i.toString(), 10)]
                                .groupCaptionTemplate.split('}')[1];
                    }
                    else {
                        var column_1 = (gObj.aggregates[parseInt(j.toString(), 10)]
                            .columns[parseInt(i.toString(), 10)]);
                        var tempObj = column_1.getTemplate(CellType.CaptionSummary);
                        var tempID = '';
                        if (!isNullOrUndefined(tempObj)) {
                            var tempValue_1 = tempObj.fn(data[column_1.columnName], this_1.parent, tempObj.property, tempID);
                            var isReactPrintGrid = this_1.parent.printGridParent
                                && this_1.parent.printGridParent.isReact;
                            if ((this_1.parent.isReact || isReactPrintGrid) && typeof column_1.groupCaptionTemplate !== 'string') {
                                this_1.parent.renderTemplates(function () {
                                    if (tempValue_1 && tempValue_1.length) {
                                        if (!isNullOrUndefined(gObj.groupSettings.captionTemplate)) {
                                            node.appendChild(tempValue_1[0]);
                                        }
                                        else {
                                            node.innerText += ' ' + tempValue_1[0].textContent;
                                        }
                                    }
                                });
                            }
                            else {
                                if (tempValue_1 && tempValue_1.length) {
                                    if (!isNullOrUndefined(gObj.groupSettings.captionTemplate)) {
                                        gTemplateValue = tempValue_1;
                                    }
                                    else {
                                        gTemplateValue = tempValue_1[0].textContent;
                                    }
                                }
                            }
                        }
                    }
                    return "break";
                }
            };
            var this_1 = this;
            for (var i = 0; i < gObj.aggregates[parseInt(j.toString(), 10)].columns.length; i++) {
                var state_1 = _loop_1(i);
                if (state_1 === "break")
                    break;
            }
        }
        if (!isNullOrUndefined(gObj.groupSettings.captionTemplate)) {
            var isReactCompiler = this.parent.isReact && typeof (gObj.groupSettings.captionTemplate) !== 'string' &&
                !(gObj.groupSettings.captionTemplate.prototype &&
                    gObj.groupSettings.captionTemplate.prototype.CSPTemplate);
            var isReactChild = this.parent.parentDetails && this.parent.parentDetails.parentInstObj &&
                this.parent.parentDetails.parentInstObj.isReact;
            var isReactPrintGrid = this.parent.printGridParent && this.parent.printGridParent.isReact;
            if (isReactCompiler || isReactChild || isReactPrintGrid) {
                var tempID = gObj.element.id + 'captionTemplate';
                var groupKey = 'groupKey';
                var key = 'key';
                data["" + groupKey] = data["" + key];
                templateCompiler(gObj.groupSettings.captionTemplate)(data, this.parent, 'captionTemplate', tempID, null, null, node);
                this.parent.renderTemplates();
            }
            else if (this.parent.isVue
                || (gObj.parentDetails && gObj.parentDetails.parentInstObj && gObj.parentDetails.parentInstObj.isVue)) {
                result = templateCompiler(gObj.groupSettings.captionTemplate)(data, this.parent, 'captionTemplate', null, null, null, null, gObj.root);
            }
            else {
                result = templateCompiler(gObj.groupSettings.captionTemplate)(data);
            }
            if (!isReactCompiler && !isReactChild && !isReactPrintGrid) {
                appendChildren(node, result);
                if (gTemplateValue && gTemplateValue.length && gTemplateValue[0].textContent) {
                    node.appendChild(gTemplateValue[0]);
                }
            }
        }
        else {
            if (gObj.groupSettings.enableLazyLoading) {
                node["" + domSetter] = this.parent.sanitize(cell.column.headerText) + ': ' + this.parent.sanitize(value) +
                    (gTemplateValue ? '   ' + gTemplateValue : '');
            }
            else {
                node["" + domSetter] = this.parent.sanitize(cell.column.headerText) + ': ' + this.parent.sanitize(value) +
                    ' - ' + data.count + ' ' + (data.count < 2 ? this.localizer.getConstant('Item') : this.localizer.getConstant('Items'))
                    + (gTemplateValue ? '   ' + gTemplateValue : '');
            }
        }
        node.setAttribute('colspan', cell.colSpan.toString());
        node.setAttribute('aria-label', node.innerHTML + this.localizer.getConstant('GroupCaption'));
        node.setAttribute('title', node.textContent);
        return node;
    };
    return GroupCaptionCellRenderer;
}(CellRenderer));
export { GroupCaptionCellRenderer };
/**
 * GroupCaptionEmptyCellRenderer class which responsible for building group caption empty cell.
 *
 * @hidden
 */
var GroupCaptionEmptyCellRenderer = /** @class */ (function (_super) {
    __extends(GroupCaptionEmptyCellRenderer, _super);
    function GroupCaptionEmptyCellRenderer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.element = _this.parent.createElement('TD', { className: 'e-groupcaption' });
        return _this;
    }
    /**
     * Function to render the cell content based on Column object.
     *
     * @param {Cell} cell - specifies the cell
     * @param {Object} data - specifies the Object
     * @param {string} data.field - Defines the field
     * @param {string} data.key - Defines the key
     * @param {number} data.count - Defines the count
     * @returns {Element} returns the element
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GroupCaptionEmptyCellRenderer.prototype.render = function (cell, data) {
        var node = this.element.cloneNode();
        node.innerHTML = '&nbsp;';
        node.setAttribute('colspan', cell.colSpan.toString());
        return node;
    };
    return GroupCaptionEmptyCellRenderer;
}(CellRenderer));
export { GroupCaptionEmptyCellRenderer };
