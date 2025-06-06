/**
 * Markdown module is used to render Rich Text Editor as Markdown editor content
 *
 * @hidden
 * @deprecated
 */
var MarkdownRender = /** @class */ (function () {
    /**
     * Constructor for content renderer module
     *
     * @param {IRichTextEditor} parent - specifies the parent.
     */
    function MarkdownRender(parent) {
        this.parent = parent;
    }
    /**
     * The function is used to render Rich Text Editor content div
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    MarkdownRender.prototype.renderPanel = function () {
        var rteObj = this.parent;
        var div = this.parent.createElement('div', { id: this.parent.getID() + '_view', className: 'e-rte-content' });
        this.editableElement = this.parent.createElement('textarea', {
            className: 'e-content',
            id: this.parent.getID() + '_editable-content',
            attrs: { 'aria-labelledby': this.parent.getID() + '_view' }
        });
        div.appendChild(this.editableElement);
        this.setPanel(div);
        rteObj.rootContainer.appendChild(div);
    };
    /**
     * Get the content div element of RichTextEditor
     *
     * @returns {Element} - specifies the element
     * @hidden
     * @deprecated
     */
    MarkdownRender.prototype.getPanel = function () {
        return this.contentPanel;
    };
    /**
     * Get the editable element of RichTextEditor
     *
     * @returns {Element} - specifies the element
     * @hidden
     * @deprecated
     */
    MarkdownRender.prototype.getEditPanel = function () {
        return this.editableElement;
    };
    /**
     * Returns the text content as string.
     *
     * @returns {string} - specifies the string values.
     */
    MarkdownRender.prototype.getText = function () {
        return this.getEditPanel().value;
    };
    /**
     * Set the content div element of RichTextEditor
     *
     * @param  {Element} panel - specifies the element.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    MarkdownRender.prototype.setPanel = function (panel) {
        this.contentPanel = panel;
    };
    /**
     * Get the document of RichTextEditor
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    MarkdownRender.prototype.getDocument = function () {
        return this.getEditPanel().ownerDocument;
    };
    return MarkdownRender;
}());
export { MarkdownRender };
