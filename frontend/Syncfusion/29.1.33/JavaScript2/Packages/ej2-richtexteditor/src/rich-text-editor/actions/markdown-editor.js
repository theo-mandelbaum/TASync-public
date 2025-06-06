import * as events from '../base/constant';
import { isNullOrUndefined, addClass, removeClass } from '@syncfusion/ej2-base';
import { MarkdownFormatter } from '../formatter/markdown-formatter';
import { RenderType } from '../base/enum';
import * as classes from '../base/classes';
import { MarkdownToolbarStatus } from './markdown-toolbar-status';
import { MarkdownRender } from '../renderer/markdown-renderer';
import { MarkdownSelection } from './../../markdown-parser/plugin/markdown-selection';
/**
 * `MarkdownEditor` module is used to markdown editor
 */
var MarkdownEditor = /** @class */ (function () {
    function MarkdownEditor(parent, serviceLocator) {
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
        this.isDestroyed = false;
    }
    /**
     * Destroys the Markdown.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    MarkdownEditor.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.removeEventListener();
        this.isDestroyed = true;
    };
    MarkdownEditor.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.saveSelection = new MarkdownSelection();
        this.parent.on(events.initialLoad, this.instantiateRenderer, this);
        this.parent.on(events.initialEnd, this.render, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.markdownToolbarClick, this.onToolbarClick, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.selectAll, this.selectAll, this);
        this.parent.on(events.getSelectedHtml, this.getSelectedHtml, this);
        this.parent.on(events.selectionSave, this.onSelectionSave, this);
        this.parent.on(events.selectionRestore, this.onSelectionRestore, this);
        this.parent.on(events.readOnlyMode, this.updateReadOnly, this);
    };
    MarkdownEditor.prototype.updateReadOnly = function () {
        if (this.parent.readonly) {
            this.parent.contentModule.getEditPanel().setAttribute('readonly', 'readonly');
            addClass([this.parent.element], classes.CLS_RTE_READONLY);
        }
        else {
            this.parent.contentModule.getEditPanel().removeAttribute('readonly');
            removeClass([this.parent.element], classes.CLS_RTE_READONLY);
        }
    };
    MarkdownEditor.prototype.onSelectionSave = function () {
        var textArea = this.parent.contentModule.getEditPanel();
        this.saveSelection.save(textArea.selectionStart, textArea.selectionEnd);
    };
    // eslint-disable-next-line
    MarkdownEditor.prototype.onSelectionRestore = function (e) {
        this.contentRenderer.getEditPanel().focus();
        var textArea = this.parent.contentModule.getEditPanel();
        this.saveSelection.restore(textArea);
    };
    MarkdownEditor.prototype.onToolbarClick = function (args) {
        var item = args.item;
        var textArea = this.parent.contentModule.getEditPanel();
        if (item.command !== 'Formats') {
            textArea.focus();
        }
        var startOffset = textArea.selectionStart;
        var endOffset = textArea.selectionEnd;
        var text = textArea.value.substring(startOffset, endOffset);
        switch (item.subCommand) {
            case 'Maximize':
                this.parent.notify(events.enableFullScreen, { args: args });
                break;
            case 'Minimize':
                this.parent.notify(events.disableFullScreen, { args: args });
                break;
            case 'CreateLink':
                this.parent.notify(events.insertLink, { member: 'link', args: args, text: text, module: 'Markdown' });
                break;
            case 'Image':
                this.parent.notify(events.insertImage, { member: 'image', args: args, text: text, module: 'Markdown' });
                break;
            case 'CreateTable': {
                var tableConstant = {
                    'headingText': this.parent.localeObj.getConstant('TableHeadingText'),
                    'colText': this.parent.localeObj.getConstant('TableColText')
                };
                this.parent.formatter.process(this.parent, args, args.originalEvent, tableConstant);
                break;
            }
            default:
                this.parent.formatter.process(this.parent, args, args.originalEvent, null);
                break;
        }
    };
    MarkdownEditor.prototype.instantiateRenderer = function () {
        this.renderFactory.addRenderer(RenderType.Content, new MarkdownRender(this.parent));
    };
    MarkdownEditor.prototype.removeEventListener = function () {
        this.parent.off(events.initialEnd, this.render);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.markdownToolbarClick, this.onToolbarClick);
        this.parent.off(events.initialLoad, this.instantiateRenderer);
        this.parent.off(events.selectAll, this.selectAll);
        this.parent.off(events.getSelectedHtml, this.getSelectedHtml);
        this.parent.off(events.selectionSave, this.onSelectionSave);
        this.parent.off(events.selectionRestore, this.onSelectionRestore);
        this.parent.off(events.readOnlyMode, this.updateReadOnly);
    };
    MarkdownEditor.prototype.render = function () {
        this.contentRenderer = this.renderFactory.getRenderer(RenderType.Content);
        var editElement = this.contentRenderer.getEditPanel();
        var option = { undoRedoSteps: this.parent.undoRedoSteps, undoRedoTimer: this.parent.undoRedoTimer };
        if (isNullOrUndefined(this.parent.formatter)) {
            this.parent.formatter = new MarkdownFormatter({
                element: editElement,
                options: option
            });
        }
        else {
            this.parent.formatter.updateFormatter(editElement, this.contentRenderer.getDocument(), option);
        }
        if (this.parent.toolbarSettings.enable) {
            this.toolbarUpdate = new MarkdownToolbarStatus(this.parent);
        }
        this.parent.notify(events.bindOnEnd, {});
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} e - specifies the editor model
     * @returns {void}
     * @hidden
     * @deprecated
     */
    MarkdownEditor.prototype.onPropertyChanged = function (e) {
        // On property code change here
        if (!isNullOrUndefined(e.newProp.formatter)) {
            var editElement = this.contentRenderer.getEditPanel();
            var option = { undoRedoSteps: this.parent.undoRedoSteps,
                undoRedoTimer: this.parent.undoRedoTimer };
            this.parent.formatter.updateFormatter(editElement, this.contentRenderer.getDocument(), option);
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    MarkdownEditor.prototype.getModuleName = function () {
        return 'markdownEditor';
    };
    /**
     * For selecting all content in RTE
     *
     * @returns {void}
     * @private
     */
    MarkdownEditor.prototype.selectAll = function () {
        this.parent.formatter.editorManager.markdownSelection.setSelection(this.parent.contentModule.getEditPanel(), 0, this.parent.contentModule.getEditPanel().value.length);
    };
    /**
     * For get a selected text in RTE
     *
     * @param {NotifyArgs} e - specifies the arguments.
     * @returns {void}
     * @private
     */
    MarkdownEditor.prototype.getSelectedHtml = function (e) {
        e.callBack(this.parent.formatter.editorManager.markdownSelection.getSelectedText(this.parent.contentModule.getEditPanel()));
    };
    return MarkdownEditor;
}());
export { MarkdownEditor };
