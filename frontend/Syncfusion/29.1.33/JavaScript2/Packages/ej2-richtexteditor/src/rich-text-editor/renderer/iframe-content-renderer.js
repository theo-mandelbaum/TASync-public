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
import { ContentRender } from '../renderer/content-renderer';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { getEditValue } from '../base/util';
import { IFRAME_EDITOR_STYLES } from '../../common/editor-styles';
var IFRAMEHEADER = "\n    <!DOCTYPE html> \n    <html>\n         <head>\n            <meta charset='utf-8' /> \n            <style>" +
    IFRAME_EDITOR_STYLES.replace(/[\n\t]/g, '') + "\n            </style>\n        </head>\n";
/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
var IframeContentRender = /** @class */ (function (_super) {
    __extends(IframeContentRender, _super);
    function IframeContentRender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * The function is used to render Rich Text Editor iframe
     *
     * @hidden
     * @deprecated
     */
    IframeContentRender.prototype.renderPanel = function () {
        var rteObj = this.parent;
        var rteContent = getEditValue(rteObj.value, rteObj);
        var iFrameBodyContent = '<body contenteditable="true">' +
            rteContent + '</body></html>';
        var iFrameContent = IFRAMEHEADER + iFrameBodyContent;
        var iframe = this.parent.createElement('iframe', {
            id: this.parent.getID() + '_rte-view',
            className: 'e-rte-content',
            attrs: { 'srcdoc': iFrameContent }
        });
        iframe.setAttribute('role', 'none');
        this.setPanel(iframe);
        if (!isNOU(this.parent.iframeSettings.sandbox)) {
            var sandboxValues = this.parent.iframeSettings.sandbox
                .map(function (element) { return element.toLocaleLowerCase().trim(); })
                .join(' ');
            if (!sandboxValues.includes('allow-same-origin')) {
                sandboxValues += ' allow-same-origin';
            }
            iframe.setAttribute('sandbox', sandboxValues.trim());
        }
        rteObj.rootContainer.appendChild(iframe);
        iframe.contentDocument.body.setAttribute('aria-owns', this.parent.getID());
        iframe.contentDocument.open();
        iFrameContent = this.setThemeColor(iFrameContent, { color: '#333' });
        iframe.contentDocument.write(iFrameContent);
        iframe.contentDocument.close();
        var body = iframe.contentDocument.body;
        body.className = 'e-content';
        if (this.parent.height === 'auto') {
            body.style.overflowY = 'hidden';
        }
        if (!isNOU(this.parent.fontFamily.default)) {
            body.style.fontFamily = this.parent.fontFamily.default;
        }
        if (!isNOU(this.parent.fontSize.default)) {
            body.style.fontSize = this.parent.fontSize.default;
        }
        body.id = this.parent.getID() + '_rte-edit-view';
        if (rteObj.enableRtl) {
            this.contentPanel.contentDocument.body.setAttribute('class', 'e-rtl');
        }
        if (!isNOU(iframe.contentDocument.head) && this.parent.iframeSettings.metaTags.length > 0) {
            var head_1 = iframe.contentDocument.head;
            var metaData = this.parent.iframeSettings.metaTags;
            metaData.forEach(function (tag) {
                var meta = document.createElement('meta');
                for (var key in tag) {
                    if (!isNOU(tag[key])) {
                        meta.setAttribute((key === 'httpEquiv') ? 'http-equiv' : key, tag[key]);
                    }
                }
                head_1.appendChild(meta);
            });
        }
    };
    IframeContentRender.prototype.setThemeColor = function (content, styles) {
        var fontColor = getComputedStyle(this.parent.element, '.e-richtexteditor').getPropertyValue('color');
        return content.replace(styles.color, fontColor);
    };
    /**
     * Get the editable element of RichTextEditor
     *
     * @returns {Element} - specifies the element.
     * @hidden
     * @deprecated
     */
    IframeContentRender.prototype.getEditPanel = function () {
        var editNode;
        if (!isNOU(this.contentPanel.contentDocument)) {
            editNode = this.contentPanel.contentDocument.body;
        }
        else {
            editNode = this.parent.inputElement;
        }
        return editNode;
    };
    /**
     * Get the document of RichTextEditor
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    IframeContentRender.prototype.getDocument = function () {
        return this.getEditPanel().ownerDocument;
    };
    return IframeContentRender;
}(ContentRender));
export { IframeContentRender };
