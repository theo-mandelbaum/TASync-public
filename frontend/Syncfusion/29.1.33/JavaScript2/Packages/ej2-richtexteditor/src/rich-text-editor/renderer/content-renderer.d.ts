import { IRenderer, IRichTextEditor } from '../base/interface';
/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
export declare class ContentRender implements IRenderer {
    protected contentPanel: Element;
    protected parent: IRichTextEditor;
    protected editableElement: HTMLElement;
    /**
     * Constructor for content renderer module
     *
     * @param {IRichTextEditor} parent - specifies the parent element.
     */
    constructor(parent?: IRichTextEditor);
    /**
     * The function is used to render Rich Text Editor content div
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    renderPanel(): void;
    /**
     * Get the content div element of RichTextEditor
     *
     * @returns {Element} - specifies the element.
     * @hidden
     * @deprecated
     */
    getPanel(): Element;
    /**
     * Get the editable element of RichTextEditor
     *
     * @returns {Element} - specifies the return element.
     * @hidden
     * @deprecated
     */
    getEditPanel(): Element;
    /**
     * Returns the text content as string.
     *
     * @returns {string} - specifies the string element.
     */
    getText(): string;
    /**
     * Set the content div element of RichTextEditor
     *
     * @param {Element} panel - specifies the panel element.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    setPanel(panel: Element): void;
    /**
     * Get the document of RichTextEditor
     *
     * @returns {Document} - specifies the document.
     * @hidden
     * @deprecated
     */
    getDocument(): Document;
}
