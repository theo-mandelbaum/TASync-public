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
import { addClass, removeClass, attributes, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { CellRenderer } from './cell-renderer';
import { addStickyColumnPosition, appendChildren, parentsUntil } from '../base/util';
import { destroy, commandColumnDestroy } from '../base/constant';
/**
 * `CommandColumn` used to render command column in grid
 *
 * @hidden
 */
var CommandColumnRenderer = /** @class */ (function (_super) {
    __extends(CommandColumnRenderer, _super);
    function CommandColumnRenderer(parent, locator) {
        var _this = _super.call(this, parent, locator) || this;
        _this.buttonElement = _this.parent.createElement('button', {});
        _this.unbounDiv = _this.parent.createElement('div', { className: 'e-unboundcelldiv' });
        _this.childRefs = [];
        _this.element = _this.parent.createElement('TD', {
            className: 'e-rowcell e-unboundcell', attrs: {
                tabindex: '-1', role: 'gridcell'
            }
        });
        _this.parent.on(destroy, _this.destroyButtons, _this);
        _this.parent.on(commandColumnDestroy, _this.destroyButtons, _this);
        return _this;
    }
    CommandColumnRenderer.prototype.destroyButtons = function (args) {
        for (var i = 0; i < this.childRefs.length; i++) {
            if (this.childRefs[parseInt(i.toString(), 10)] && !this.childRefs[parseInt(i.toString(), 10)].isDestroyed
                && !(this.parent.editSettings.showAddNewRow && this.parent.enableVirtualization
                    && parentsUntil(this.childRefs[parseInt(i.toString(), 10)].element, 'e-addedrow'))) {
                this.childRefs[parseInt(i.toString(), 10)].destroy();
                if (this.childRefs[parseInt(i.toString(), 10)].element) {
                    this.childRefs[parseInt(i.toString(), 10)].element.innerHTML = '';
                }
            }
        }
        this.childRefs = [];
        if (args.type === 'refreshCommandColumn') {
            var elem = this.parent.element.querySelectorAll('.e-gridcontent .e-unboundcell');
            if (elem.length) {
                for (var i = 0; i < elem.length; i++) {
                    if (elem[parseInt(i.toString(), 10)] && !(this.parent.editSettings.showAddNewRow && this.parent.enableVirtualization
                        && parentsUntil(elem[parseInt(i.toString(), 10)], 'e-addedrow'))) {
                        if (elem[parseInt(i.toString(), 10)].querySelector('.e-unboundcelldiv')) {
                            elem[parseInt(i.toString(), 10)].querySelector('.e-unboundcelldiv').innerHTML = '';
                        }
                        elem[parseInt(i.toString(), 10)].innerHTML = '';
                    }
                }
                elem = null;
            }
        }
        else {
            this.parent.off(destroy, this.destroyButtons);
            this.parent.off(commandColumnDestroy, this.destroyButtons);
        }
    };
    /**
     * Function to render the cell content based on Column object.
     *
     * @param {cell<Column>} cell - specifies the cell
     * @param {Object} data - specifies the data
     * @param {Object} attributes - specifies the attributes
     * @param {boolean} isVirtualEdit - specifies virtual scroll editing
     * @returns {Element} returns the element
     */
    CommandColumnRenderer.prototype.render = function (cell, data, attributes, isVirtualEdit) {
        var node = this.element.cloneNode();
        var uid = 'uid';
        node.appendChild(this.unbounDiv.cloneNode());
        node.setAttribute('aria-label', this.localizer.getConstant('CommandColumnAria') + cell.column.headerText);
        if (cell.column.commandsTemplate) {
            if (this.parent.isReact && typeof (cell.column.commandsTemplate) !== 'string' && !(cell.column.commandsTemplate.prototype &&
                cell.column.commandsTemplate.prototype.CSPTemplate)) {
                var tempID = this.parent + 'commandsTemplate';
                cell.column.getColumnTemplate()(data, this.parent, 'commandsTemplate', tempID, null, null, node.firstElementChild);
                this.parent.renderTemplates();
            }
            else {
                appendChildren(node.firstElementChild, cell.column.getColumnTemplate()(data, this.parent, 'commandsTemplate', null, null, null, null, this.parent.root));
            }
        }
        else {
            for (var _i = 0, _a = cell.commands; _i < _a.length; _i++) {
                var command = _a[_i];
                node = this.renderButton(node, command, attributes.index, command["" + uid]);
            }
        }
        this.setAttributes(node, cell, attributes);
        if ((!this.parent.enableVirtualization && (this.parent.isEdit && (!this.parent.editSettings.showAddNewRow ||
            (this.parent.editSettings.showAddNewRow && (!this.parent.element.querySelector('.e-editedrow')))))) || isVirtualEdit) {
            addClass([].slice.call(node.getElementsByClassName('e-edit-delete')), 'e-hide');
            removeClass([].slice.call(node.getElementsByClassName('e-save-cancel')), 'e-hide');
        }
        else {
            addClass([].slice.call(node.getElementsByClassName('e-save-cancel')), 'e-hide');
            removeClass([].slice.call(node.getElementsByClassName('e-edit-delete')), 'e-hide');
        }
        if (this.parent.isFrozenGrid()) {
            addStickyColumnPosition(this.parent, cell.column, node);
        }
        return node;
    };
    CommandColumnRenderer.prototype.renderButton = function (node, buttonOption, index, uid) {
        var button = this.buttonElement.cloneNode();
        attributes(button, {
            'id': this.parent.element.id + (buttonOption.type || '') + '_' + index + '_' + uid, 'type': 'button',
            title: !isNullOrUndefined(buttonOption.title) ? buttonOption.title :
                buttonOption.buttonOption.content || this.localizer.getConstant(buttonOption.type) || buttonOption.type,
            'data-uid': uid
        });
        button.onclick = buttonOption.buttonOption.click;
        buttonOption.buttonOption.cssClass = this.parent.cssClass ?
            buttonOption.buttonOption.cssClass + ' ' + this.parent.cssClass : buttonOption.buttonOption.cssClass;
        var buttonObj = new Button(buttonOption.buttonOption, button);
        this.childRefs.push(buttonObj);
        buttonObj.commandType = buttonOption.type;
        node.firstElementChild.appendChild(buttonObj.element);
        switch (buttonOption.type) {
            case 'Edit':
            case 'Delete':
                addClass([button], ['e-edit-delete', 'e-' + buttonOption.type.toLowerCase() + 'button']);
                break;
            case 'Cancel':
            case 'Save':
                addClass([button], ['e-save-cancel', 'e-' + buttonOption.type.toLowerCase() + 'button']);
                break;
        }
        return node;
    };
    return CommandColumnRenderer;
}(CellRenderer));
export { CommandColumnRenderer };
