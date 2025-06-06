import { removeClass, selectAll, isNullOrUndefined as isNOU, EventHandler } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { CLS_EXPAND_OPEN, CLS_TB_ITEM, CLS_ACTIVE, CLS_RTE_SOURCE_CODE_TXTAREA } from '../base/classes';
import * as CONSTANT from '../../common/constant';
import { RenderType } from '../base/enum';
import { KeyboardEvents } from '../actions/keyboard';
import { resetContentEditableElements, cleanupInternalElements } from '../base/util';
/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
var ViewSource = /** @class */ (function () {
    /**
     * Constructor for view source module
     *
     * @param {IRichTextEditor} parent - specifies the parent element.
     * @param {ServiceLocator} locator - specifies the locator.
     * @returns {void}
     */
    function ViewSource(parent, locator) {
        this.parent = parent;
        var serviceLocator = locator;
        this.rendererFactory = serviceLocator.getService('rendererFactory');
        this.addEventListener();
    }
    ViewSource.prototype.addEventListener = function () {
        this.parent.on(events.sourceCode, this.sourceCode, this);
        this.parent.on(events.initialEnd, this.onInitialEnd, this);
        this.parent.on(events.updateSource, this.updateSourceCode, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    ViewSource.prototype.onInitialEnd = function () {
        this.parent.formatter.editorManager.observer.on(CONSTANT.KEY_DOWN_HANDLER, this.onKeyDown, this);
    };
    ViewSource.prototype.removeEventListener = function () {
        this.unWireEvent();
        this.parent.off(events.sourceCode, this.sourceCode);
        this.parent.off(events.updateSource, this.updateSourceCode);
        this.parent.off(events.initialEnd, this.onInitialEnd);
        this.parent.off(events.destroy, this.destroy);
        this.parent.formatter.editorManager.observer.off(CONSTANT.KEY_DOWN_HANDLER, this.onKeyDown);
    };
    ViewSource.prototype.getSourceCode = function () {
        return this.parent.createElement('textarea', { className: CLS_RTE_SOURCE_CODE_TXTAREA + this.parent.getCssClass(true) });
    };
    ViewSource.prototype.wireEvent = function (element) {
        this.keyboardModule = new KeyboardEvents(element, {
            keyAction: this.previewKeyDown.bind(this), keyConfigs: this.parent.formatter.keyConfig, eventName: 'keydown'
        });
        EventHandler.add(this.previewElement, 'mousedown', this.mouseDownHandler, this);
    };
    ViewSource.prototype.unWireEvent = function () {
        if (this.previewElement) {
            EventHandler.remove(this.previewElement, 'mousedown', this.mouseDownHandler);
        }
        if (this.keyboardModule && !this.keyboardModule.isDestroyed) {
            this.keyboardModule.destroy();
        }
    };
    ViewSource.prototype.wireBaseKeyDown = function () {
        this.parent.keyboardModule = new KeyboardEvents(this.contentModule.getEditPanel(), {
            keyAction: this.parent.keyDown.bind(this.parent), keyConfigs: this.parent.formatter.keyConfig, eventName: 'keydown'
        });
    };
    ViewSource.prototype.unWireBaseKeyDown = function () {
        this.parent.keyboardModule.destroy();
    };
    ViewSource.prototype.mouseDownHandler = function (e) {
        this.parent.notify(events.sourceCodeMouseDown, { args: e });
    };
    ViewSource.prototype.previewKeyDown = function (event) {
        switch (event.action) {
            case 'html-source':
                this.updateSourceCode(event);
                event.preventDefault();
                break;
            case 'toolbar-focus':
                if (this.parent.toolbarSettings.enable && this.parent.getToolbarElement()) {
                    var firstActiveItem = this.parent.getToolbarElement().querySelector('.e-toolbar-item:not(.e-overlay)[title]');
                    firstActiveItem.firstElementChild.removeAttribute('tabindex');
                    firstActiveItem.firstElementChild.focus();
                }
                break;
        }
    };
    ViewSource.prototype.onKeyDown = function (e) {
        switch (e.event.action) {
            case 'html-source':
                e.event.preventDefault();
                this.sourceCode(e);
                e.callBack({
                    requestType: 'SourceCode',
                    editorMode: 'HTML',
                    event: e.event
                });
                break;
        }
    };
    /**
     * sourceCode method
     *
     * @param {ClickEventArgs} args - specifies the click event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ViewSource.prototype.sourceCode = function (args) {
        var _this = this;
        this.parent.notify(events.hidePopup, {});
        this.parent.isBlur = false;
        this.parent.trigger(events.actionBegin, { requestType: 'SourceCode', targetItem: 'SourceCode', args: args, cancel: false }, function (actionBeginArgs) {
            if (!actionBeginArgs.cancel) {
                var tbItems = selectAll('.' + CLS_TB_ITEM, _this.parent.element);
                _this.contentModule = _this.rendererFactory.getRenderer(RenderType.Content);
                var height = _this.parent.inputElement.getBoundingClientRect().height;
                _this.parent.rootContainer.classList.add('e-source-code-enabled');
                _this.parent.notify(events.updateToolbarItem, {
                    targetItem: 'SourceCode', updateItem: 'Preview',
                    baseToolbar: _this.parent.getBaseToolbarObject()
                });
                if (isNOU(_this.previewElement)) {
                    _this.previewElement = _this.getSourceCode();
                }
                _this.parent.inputElement.innerHTML = cleanupInternalElements(_this.replaceAmpersand(_this.parent.inputElement.innerHTML), _this.parent.editorMode);
                _this.parent.updateValueData();
                var rteContent = void 0;
                if (isNOU(_this.parent.element.querySelector('#' + _this.parent.getID() + '_source-view'))) {
                    rteContent = _this.parent.createElement('div', {
                        className: 'e-source-content', id: _this.parent.getID() + '_source-view',
                        attrs: { style: 'height:' + height + 'px' }
                    });
                }
                else {
                    rteContent = _this.parent.element.querySelector('#' + _this.parent.getID() + '_source-view');
                    rteContent.style.height = height + 'px';
                }
                rteContent.appendChild(_this.previewElement);
                _this.parent.rootContainer.appendChild(rteContent);
                _this.getPanel().value = cleanupInternalElements(_this.getTextAreaValue(), _this.parent.editorMode);
                _this.parent.isBlur = false;
                _this.parent.disableToolbarItem(_this.parent.toolbarSettings.items);
                _this.parent.enableToolbarItem('SourceCode');
                if (_this.parent.getToolbar()) {
                    removeClass([_this.parent.getToolbar()], [CLS_EXPAND_OPEN]);
                }
                removeClass(tbItems, [CLS_ACTIVE]);
                _this.wireEvent(_this.previewElement);
                _this.unWireBaseKeyDown();
                _this.previewElement.focus();
                _this.parent.inputElement.innerHTML = cleanupInternalElements(_this.replaceAmpersand(_this.parent.inputElement.innerHTML), _this.parent.editorMode);
                _this.parent.updateValue();
                _this.parent.trigger(events.actionComplete, { requestType: 'SourceCode', targetItem: 'SourceCode', args: args });
                _this.parent.invokeChangeEvent();
                if (!isNOU(_this.parent.saveInterval) && _this.parent.saveInterval > 0 && _this.parent.autoSaveOnIdle) {
                    _this.codeViewTimeInterval = setInterval(function () { _this.parent.notify(events.updateValueOnIdle, {}); }, _this.parent.saveInterval);
                }
            }
        });
    };
    /**
     * updateSourceCode method
     *
     * @param {ClickEventArgs} args - specifies the click event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ViewSource.prototype.updateSourceCode = function (args) {
        var _this = this;
        this.parent.isBlur = false;
        this.parent.trigger(events.actionBegin, { requestType: 'Preview', targetItem: 'Preview', args: args, cancel: false }, function (actionBeginArgs) {
            if (!actionBeginArgs.cancel) {
                _this.parent.rootContainer.classList.remove('e-source-code-enabled');
                var editHTML = _this.getPanel();
                _this.parent.notify(events.updateToolbarItem, {
                    targetItem: 'Preview', updateItem: 'SourceCode',
                    baseToolbar: _this.parent.getBaseToolbarObject()
                });
                if (!isNOU(editHTML)) {
                    editHTML.value = resetContentEditableElements(_this.replaceAmpersand(editHTML.value), _this.parent.editorMode);
                }
                var serializeValue = _this.parent.serializeValue(editHTML.value);
                var value = void 0;
                if (serializeValue === null || serializeValue === '') {
                    if (_this.parent.enterKey === 'DIV') {
                        value = '<div><br/></div>';
                    }
                    else if (_this.parent.enterKey === 'BR') {
                        value = '<br/>';
                    }
                    else {
                        value = '<p><br/></p>';
                    }
                }
                else {
                    value = serializeValue;
                }
                _this.contentModule.getEditPanel().innerHTML = resetContentEditableElements(_this.replaceAmpersand(value), _this.parent.editorMode);
                _this.parent.isBlur = false;
                _this.parent.enableToolbarItem(_this.parent.toolbarSettings.items);
                if (_this.parent.getToolbar()) {
                    removeClass([_this.parent.getToolbar()], [CLS_EXPAND_OPEN]);
                }
                _this.unWireEvent();
                _this.wireBaseKeyDown();
                _this.contentModule.getEditPanel().focus();
                _this.parent.updateValue();
                _this.parent.trigger(events.actionComplete, { requestType: 'Preview', targetItem: 'Preview', args: args });
                _this.parent.formatter.enableUndo(_this.parent);
                _this.parent.addAudioVideoWrapper();
                clearTimeout(_this.codeViewTimeInterval);
                _this.parent.invokeChangeEvent();
                _this.parent.notify(events.tableclass, {});
            }
        });
    };
    ViewSource.prototype.replaceAmpersand = function (value) {
        var _this = this;
        if (this.parent.editorMode === 'HTML') {
            var entities = ['times', 'divide', 'ne'];
            entities.forEach(function (entity) {
                // eslint-disable-next-line security/detect-non-literal-regexp
                var regex = new RegExp("&(amp;)*(" + entity + ")", 'g');
                if (_this.parent.enableHtmlSanitizer) {
                    var ampEntity = _this.parent.enableHtmlEncode ? "&amp;amp;amp;amp;" + entity : "&amp;amp;" + entity;
                    value = value.replace(regex, ampEntity);
                }
                else {
                    value = value.replace(regex, "&amp;" + entity);
                }
            });
        }
        return value;
    };
    ViewSource.prototype.getTextAreaValue = function () {
        return (this.contentModule.getEditPanel().innerHTML === '<p><br></p>') ||
            (this.contentModule.getEditPanel().innerHTML === '<div><br></div>') ||
            (this.contentModule.getEditPanel().innerHTML === '<br>') ||
            (this.contentModule.getEditPanel().childNodes.length === 1 &&
                (this.contentModule.getEditPanel().childNodes[0].tagName === 'P' &&
                    this.contentModule.getEditPanel().innerHTML.length === 7) ||
                (this.contentModule.getEditPanel().childNodes[0].tagName === 'DIV' &&
                    this.contentModule.getEditPanel().innerHTML.length === 11)) ? '' : this.parent.value;
    };
    /**
     * getPanel method
     *
     * @returns {HTMLTextAreaElement} - Specifies the Souce codetext area element.
     * @hidden
     * @deprecated
     */
    ViewSource.prototype.getPanel = function () {
        return this.parent.element && this.parent.element.querySelector('.e-rte-srctextarea');
    };
    /**
     * Destroy the entire RichTextEditor.
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    ViewSource.prototype.destroy = function () {
        if (isNOU(this.parent)) {
            return;
        }
        this.removeEventListener();
    };
    return ViewSource;
}());
export { ViewSource };
