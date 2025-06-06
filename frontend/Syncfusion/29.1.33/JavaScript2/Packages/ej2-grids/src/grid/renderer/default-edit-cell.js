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
import { isNullOrUndefined, extend } from '@syncfusion/ej2-base';
import { isEditable, createEditElement, parentsUntil, isCellHaveWidth } from '../base/util';
import { TextBox } from '@syncfusion/ej2-inputs';
import { EditCellBase } from './edit-cell-base';
/**
 * `DefaultEditCell` is used to handle default cell type editing.
 *
 * @hidden
 */
var DefaultEditCell = /** @class */ (function (_super) {
    __extends(DefaultEditCell, _super);
    function DefaultEditCell() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DefaultEditCell.prototype.create = function (args) {
        var attr = {
            type: 'text', value: !isNullOrUndefined(args.value) ? args.value : ''
        };
        var inputElement = createEditElement(this.parent, args.column, 'e-field e-input e-defaultcell', attr);
        if (args.column.textAlign) {
            inputElement.style.textAlign = args.column.textAlign;
        }
        return inputElement;
    };
    DefaultEditCell.prototype.read = function (element) {
        if (element.type === 'hidden' && !isNullOrUndefined(element.ej2_instances[0]) &&
            !isNullOrUndefined(element.ej2_instances[0].textarea)) {
            return element.ej2_instances[0].value;
        }
        else {
            return element.value;
        }
    };
    DefaultEditCell.prototype.write = function (args) {
        var col = args.column;
        var isInline = this.parent.editSettings.mode !== 'Dialog';
        var props = {
            element: args.element, floatLabelType: this.parent.editSettings.mode !== 'Dialog' ? 'Never' : 'Always',
            enableRtl: this.parent.enableRtl, enabled: isEditable(args.column, args.requestType, args.element) && isCellHaveWidth(parentsUntil(args.element, 'e-rowcell')),
            placeholder: isInline ? '' : args.column.headerText,
            cssClass: this.parent.cssClass ? this.parent.cssClass : ''
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!isNullOrUndefined(col.edit) && !isNullOrUndefined(col.edit.params) && col.edit.params.multiline) {
            var cellValue = (col.valueAccessor(col.field, args.rowData, col));
            props['value'] = cellValue;
        }
        this.obj = new TextBox(extend(props, col.edit.params));
        this.obj.appendTo(args.element);
        if (this.parent.editSettings.mode === 'Batch') {
            this.obj.element.addEventListener('keydown', this.keyEventHandler);
        }
    };
    DefaultEditCell.prototype.keyEventHandler = function (args) {
        if (args.key === 'Enter' || args.key === 'Tab') {
            var evt = new Event('change', { bubbles: false, cancelable: true });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.dispatchEvent(evt);
        }
    };
    DefaultEditCell.prototype.destroy = function () {
        if (this.obj && !this.obj.isDestroyed) {
            this.obj.element.removeEventListener('keydown', this.keyEventHandler);
            this.obj.destroy();
            this.obj.element.remove();
        }
    };
    return DefaultEditCell;
}(EditCellBase));
export { DefaultEditCell };
