import { getEditValue } from '../base/util';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
var ContentRender = /** @class */ (function () {
    /**
     * Constructor for content renderer module
     *
     * @param {IRichTextEditor} parent - specifies the parent element.
     */
    function ContentRender(parent) {
        this.parent = parent;
    }
    /**
     * The function is used to render Rich Text Editor content div
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ContentRender.prototype.renderPanel = function () {
        var rteObj = this.parent;
        var div = this.parent.createElement('div', { className: 'e-rte-content', id: this.parent.getID() + 'rte-view' });
        var rteContent = getEditValue(rteObj.value, rteObj);
        this.editableElement = this.parent.createElement('div', {
            className: 'e-content',
            id: this.parent.getID() + '_rte-edit-view',
            attrs: {
                'contenteditable': 'true'
            }
        });
        if (!isNOU(this.parent.fontFamily.default)) {
            this.editableElement.style.fontFamily = this.parent.fontFamily.default;
        }
        if (!isNOU(this.parent.fontSize.default)) {
            this.editableElement.style.fontSize = this.parent.fontSize.default;
        }
        this.editableElement.innerHTML = rteContent;
        div.appendChild(this.editableElement);
        this.setPanel(div);
        rteObj.rootContainer.appendChild(div);
    };
    /**
     * Get the content div element of RichTextEditor
     *
     * @returns {Element} - specifies the element.
     * @hidden
     * @deprecated
     */
    ContentRender.prototype.getPanel = function () {
        return this.contentPanel;
    };
    /**
     * Get the editable element of RichTextEditor
     *
     * @returns {Element} - specifies the return element.
     * @hidden
     * @deprecated
     */
    ContentRender.prototype.getEditPanel = function () {
        return this.editableElement;
    };
    /**
     * Returns the text content as string.
     *
     * @returns {string} - specifies the string element.
     */
    ContentRender.prototype.getText = function () {
        var textString = this.getEditPanel().innerText;
        return textString === '\n' ? '' : textString;
    };
    /**
     * Set the content div element of RichTextEditor
     *
     * @param {Element} panel - specifies the panel element.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ContentRender.prototype.setPanel = function (panel) {
        this.contentPanel = panel;
    };
    /**
     * Get the document of RichTextEditor
     *
     * @returns {Document} - specifies the document.
     * @hidden
     * @deprecated
     */
    ContentRender.prototype.getDocument = function () {
        return this.getEditPanel().ownerDocument;
    };
    return ContentRender;
}());
export { ContentRender };
