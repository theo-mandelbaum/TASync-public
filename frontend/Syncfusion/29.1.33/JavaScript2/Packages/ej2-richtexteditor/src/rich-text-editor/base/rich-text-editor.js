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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, EventHandler, Complex, Browser, addClass, detach, updateCSSText } from '@syncfusion/ej2-base';
import { Property, NotifyPropertyChanges, formatUnit, L10n, closest } from '@syncfusion/ej2-base';
import { setStyleAttribute, Event, removeClass, print as printWindow, attributes } from '@syncfusion/ej2-base';
import { isNullOrUndefined as isNOU, compile, append, extend, debounce } from '@syncfusion/ej2-base';
import { Touch as EJ2Touch } from '@syncfusion/ej2-base';
import { getScrollableParent } from '@syncfusion/ej2-popups';
import * as events from '../base/constant';
import * as classes from '../base/classes';
import { Render } from '../renderer/render';
import { ViewSource } from '../renderer/view-source';
import { executeGroup } from './interface';
import { ServiceLocator } from '../services/service-locator';
import { RendererFactory } from '../services/renderer-factory';
import { RenderType, DialogType } from './enum';
import { ExecCommandCallBack } from '../actions/execute-command-callback';
import { KeyboardEvents } from '../actions/keyboard';
import { ToolbarSettings, ImageSettings, AudioSettings, VideoSettings, QuickToolbarSettings, FontFamily, FontSize, Format, NumberFormatList, BulletFormatList, FormatPainterSettings, EmojiSettings, ImportWord, ExportWord, ExportPdf } from '../models/toolbar-settings';
import { FileManagerSettings } from '../models/toolbar-settings';
import { TableSettings, PasteCleanupSettings } from '../models/toolbar-settings';
import { FontColor, BackgroundColor } from '../models/toolbar-settings';
import { IFrameSettings } from '../models/iframe-settings';
import { InlineMode } from '../models/inline-mode';
import { defaultLocale } from '../models/default-locale';
import { setAttributes } from '../actions/html-attributes';
import { FullScreen } from '../actions/full-screen';
import { EnterKeyAction } from '../actions/enter-key';
import * as CONSTANT from '../../common/constant';
import { dispatchEvent, getEditValue, isIDevice, decode, isEditableValueEmpty, getDefaultValue } from '../base/util';
import { scrollToCursor } from '../../common/util';
import { DialogRenderer } from '../renderer/dialog-renderer';
import { SlashMenuSettings } from '../models/slash-menu-settings';
import { mentionRestrictKeys } from '../../common/config';
import { CustomUserAgentData } from '../../common/user-agent';
import { cleanupInternalElements, removeSelectionClassStates, resetContentEditableElements } from '../base/util';
import { NodeSelection } from '../../selection/index';
/**
 * Represents the Rich Text Editor component.
 * ```html
 * <textarea id="rte"></textarea>
 * <script>
 *  var rteObj = new RichTextEditor();
 *  rteObj.appendTo("#rte");
 * </script>
 * ```
 */
var RichTextEditor = /** @class */ (function (_super) {
    __extends(RichTextEditor, _super);
    function RichTextEditor(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isPlainPaste = false;
        _this.needsID = true;
        _this.isCopyAll = false;
        return _this;
    }
    /**
     * To provide the array of modules needed for component rendering
     *
     * @returns {ModuleDeclaration[]} - specifies the declaration.
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.requiredModules = function () {
        var modules = [];
        if (this.toolbarSettings.enable) {
            modules.push({ member: 'toolbar', args: [this, this.serviceLocator] });
            modules.push({
                member: 'link',
                args: [this, this.serviceLocator]
            });
            modules.push({
                member: 'table',
                args: [this, this.serviceLocator]
            });
            modules.push({
                member: 'image',
                args: [this, this.serviceLocator]
            });
            modules.push({
                member: 'audio',
                args: [this, this.serviceLocator]
            });
            modules.push({
                member: 'video',
                args: [this, this.serviceLocator]
            });
            if (this.quickToolbarSettings.enable) {
                modules.push({ member: 'quickToolbar', args: [this, this.serviceLocator] });
            }
        }
        if (this.editorMode === 'HTML' && this.slashMenuSettings.enable) {
            modules.push({ member: 'slashMenu', args: [this, this.serviceLocator] });
        }
        if (this.showCharCount) {
            modules.push({ member: 'count', args: [this, this.serviceLocator] });
        }
        if (this.editorMode === 'Markdown') {
            modules.push({ member: 'markdownEditor', args: [this, this.serviceLocator] });
        }
        if (this.editorMode === 'HTML') {
            modules.push({ member: 'htmlEditor', args: [this, this.serviceLocator] });
            modules.push({ member: 'pasteCleanup', args: [this, this.serviceLocator] });
            modules.push({ member: 'importExport', args: [this, this.serviceLocator] });
            modules.push({
                member: 'formatPainter',
                args: [this]
            });
            modules.push({
                member: 'emojiPicker',
                args: [this, this.serviceLocator]
            });
        }
        if (this.fileManagerSettings.enable) {
            modules.push({ member: 'fileManager', args: [this, this.serviceLocator] });
        }
        if (this.enableResize) {
            modules.push({ member: 'resize', args: [this] });
        }
        return modules;
    };
    RichTextEditor.prototype.updateEnable = function () {
        if (this.enabled) {
            removeClass([this.element], classes.CLS_DISABLED);
            this.element.setAttribute('aria-disabled', 'false');
            if (!isNOU(this.htmlAttributes.tabindex)) {
                this.inputElement.setAttribute('tabindex', this.htmlAttributes.tabindex);
            }
            else {
                this.inputElement.setAttribute('tabindex', '0');
            }
        }
        else {
            if (this.getToolbar()) {
                removeClass(this.getToolbar().querySelectorAll('.' + classes.CLS_ACTIVE), classes.CLS_ACTIVE);
                removeClass([this.getToolbar().parentElement], [classes.CLS_TB_FLOAT]);
            }
            addClass([this.element], classes.CLS_DISABLED);
            this.element.tabIndex = -1;
            this.element.setAttribute('aria-disabled', 'true');
            this.inputElement.setAttribute('tabindex', '-1');
        }
    };
    /**
     * setEnable method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.setEnable = function () {
        this.updateEnable();
        // eslint-disable-next-line
        (this.enabled) ? this.eventInitializer() : this.unWireEvents();
    };
    RichTextEditor.prototype.initializeValue = function () {
        this.isFocusOut = false;
        this.isRTE = false;
        this.isBlur = true;
        this.defaultResetValue = null;
        this.isResizeInitialized = false;
    };
    /**
     * For internal use only - Initialize the event handler;
     *
     * @returns {void}
     * @hidden
     * @private
     */
    RichTextEditor.prototype.preRender = function () {
        this.initializeValue();
        this.clickPoints = { clientX: 0, clientY: 0 };
        this.initialValue = this.value;
        this.serviceLocator = new ServiceLocator;
        this.initializeServices();
        this.setContainer();
        this.persistData();
        setStyleAttribute(this.element, { 'width': formatUnit(this.width) });
        attributes(this.element, { role: 'application', 'aria-label': 'Rich Text Editor' });
        this.beforeRenderClassValue = this.element.getAttribute('class');
    };
    RichTextEditor.prototype.persistData = function () {
        if (this.enablePersistence && this.originalElement.tagName === 'TEXTAREA') {
            this.element.id = this.originalElement.id + '_wrapper';
            var data = window.localStorage.getItem(this.getModuleName() + this.element.id);
            if (!(isNOU(data) || (data === ''))) {
                this.setProperties(JSON.parse(data), true);
            }
        }
    };
    RichTextEditor.prototype.setContainer = function () {
        this.originalElement = this.element.cloneNode(true);
        if (this.value === null || this.valueTemplate !== null) {
            this.setValue();
        }
        if (this.element.hasAttribute('tabindex')) {
            this.htmlAttributes = { 'tabindex': this.element.getAttribute('tabindex') };
            this.element.removeAttribute('tabindex');
        }
        this.element.innerHTML = '';
        var invalidAttr = ['class', 'style', 'id', 'ejs-for'];
        var htmlAttr = {};
        for (var a = 0; a < this.element.attributes.length; a++) {
            if (invalidAttr.indexOf(this.element.attributes[a].name) === -1 &&
                !(/^data-val/.test(this.element.attributes[a].name))) { // data-val for asp.net core data annotation validation.
                htmlAttr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
            }
        }
        extend(htmlAttr, this.htmlAttributes, htmlAttr);
        this.setProperties({ htmlAttributes: htmlAttr }, true);
        if (!isNOU(this.htmlAttributes.id)) {
            this.element.id = this.htmlAttributes.id;
        }
        this.internalID = this.element.id;
        if (this.element.tagName === 'TEXTAREA') {
            var rteOuterWrapper = this.createElement('div', {
                className: this.element.getAttribute('class')
            });
            this.element.innerHTML = '';
            this.element.parentElement.insertBefore(rteOuterWrapper, this.element);
            this.valueContainer = this.element;
            removeClass([this.valueContainer], this.element.getAttribute('class').split(' '));
            this.element = rteOuterWrapper;
        }
        else {
            this.valueContainer = this.createElement('textarea', {
                id: this.getID() + '-value',
                attrs: { 'aria-labelledby': this.getID() }
            });
        }
        this.valueContainer.name = this.getID();
        addClass([this.valueContainer], classes.CLS_RTE_HIDDEN);
        if (!isNOU(this.cssClass)) {
            var currentClassList = this.cssClass.split(' ');
            for (var i = 0; i < currentClassList.length; i++) {
                addClass([this.valueContainer], currentClassList[i]);
            }
        }
        this.rootContainer = this.createElement('div', { className: classes.CLS_RTE_CONTAINER, attrs: { 'role': 'presentation' } });
        this.element.appendChild(this.rootContainer);
        this.rootContainer.appendChild(this.valueContainer);
    };
    /**
     * getPersistData method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getPersistData = function () {
        return this.addOnPersist(['value']);
    };
    /**
     * Focuses the Rich Text Editor component.
     *
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.focusIn = function () {
        if (this.enabled) {
            this.inputElement.focus();
            this.focusHandler({});
        }
    };
    /**
     * Blurs the Rich Text Editor component, removing focus.
     *
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.focusOut = function () {
        if (this.enabled) {
            this.inputElement.blur();
            this.blurHandler({});
        }
    };
    /**
     * Selects all content within the RichTextEditor.
     *
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.selectAll = function () {
        this.notify(events.selectAll, {});
    };
    /**
     * Selects a specific content range or element.
     *
     * @param {Range} range - Specify the range you want to select within the content.
     * This method is used to select a particular sentence, word, or the entire document.
     *
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.selectRange = function (range) {
        this.notify(events.selectRange, { range: range });
    };
    /**
     * Retrieves the HTML markup from the currently selected content in RichTextEditor.
     *
     * @returns {string} - Returns the HTML string of selected content.
     * @public
     */
    RichTextEditor.prototype.getSelection = function () {
        var str = '';
        this.notify(events.getSelectedHtml, {
            callBack: function (txt) {
                str = txt;
            }
        });
        return str;
    };
    /**
     * Displays the emoji picker. If coordinates are provided, it positions the picker at those locations.
     *
     * @param {number} x - The x-axis position for the emoji picker.
     * @param {number} y - The y-axis position for the emoji picker.
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.showEmojiPicker = function (x, y) {
        if (this.readonly) {
            return;
        }
        this.notify(events.emojiPicker, { x: x, y: y });
    };
    /**
     * Executes a specified command within the rich text editor, optionally utilizing additional parameters to tailor execution.
     *
     * @returns {void}
     * @param {CommandName} commandName - The name of the command to be executed, such as 'importWord', 'insertHTML', and others.
     * @param {string | HTMLElement | ILinkCommandsArgs | IImageCommandsArgs | ITableCommandsArgs | FormatPainterSettingsModel | IAudioCommandsArgs | IVideoCommandsArgs} value
     * - An optional parameter that supplies the necessary value relevant to the command. This could be a string, an HTMLElement, or specific argument types like ILinkCommandsArgs, etc., contingent on the command requirements.
     * @param {ExecuteCommandOption} option - Specifies additional options for executing the command, such as enabling features like undo functionality.
     * @public
     */
    RichTextEditor.prototype.executeCommand = function (commandName, value, option) {
        if (commandName === 'importWord') {
            var importContainer = this.createElement('div');
            importContainer.innerHTML = value;
            var tableElement = importContainer.querySelectorAll('table:not(.e-rte-table):not(.e-rte-paste-table)');
            for (var i = 0; i < tableElement.length; i++) {
                tableElement[i].classList.add('e-rte-paste-table');
            }
            value = importContainer.innerHTML;
            importContainer.remove();
            commandName = 'insertHTML';
        }
        value = this.htmlPurifier(commandName, value);
        var internalValue;
        if (this.editorMode === 'HTML') {
            var range = this.getRange();
            if (this.iframeSettings.enable) {
                this.formatter.editorManager.nodeSelection.Clear(this.element.ownerDocument);
            }
            var toFocus = (this.iframeSettings.enable &&
                range.startContainer === this.inputElement) ? true : !this.inputElement.contains(range.startContainer);
            if (toFocus) {
                this.focusIn();
            }
        }
        var tool = executeGroup["" + commandName];
        if (option && option.undo) {
            if (option.undo && this.formatter.getUndoRedoStack().length === 0) {
                this.formatter.saveData();
            }
        }
        if (this.maxLength !== -1 && !isNOU(tool.command)) {
            var currentInsertContentLength = 0;
            if (tool.command === 'Links') {
                currentInsertContentLength = value.text.length === 0 ?
                    value.url.length : value.text.length;
            }
            if (tool.command === 'Images' || tool.command === 'Table' || tool.command === 'Files') {
                currentInsertContentLength = 1;
            }
            if (tool.command === 'InsertHTML') {
                if (!isNOU(value)) {
                    var tempElem = this.createElement('div');
                    tempElem.innerHTML = value;
                    currentInsertContentLength = tempElem.textContent.length;
                }
                else if (!isNOU(tool.value) && (tool.value === '<hr/>' || tool.value === '<br/>')) {
                    currentInsertContentLength = 1;
                }
            }
            if (tool.command === 'InsertText') {
                currentInsertContentLength = value.length;
            }
            var currentLength = this.getText().trim().replace(/(\r\n|\n|\r|\t)/gm, '').replace(/\u200B/g, '').length;
            var selectionLength = this.getSelection().length;
            var totalLength = (currentLength - selectionLength) + currentInsertContentLength;
            if (!(this.maxLength === -1 || totalLength <= this.maxLength)) {
                return;
            }
        }
        internalValue = value;
        if (tool.command === 'FormatPainter') {
            if (!isNOU(value)) {
                this.formatPainterSettings = value;
            }
            internalValue = {
                formatPainterAction: tool.value
            };
        }
        this.formatter.editorManager.execCommand(tool.command, tool.subCommand ? tool.subCommand : (internalValue ? internalValue : tool.value), null, null, (internalValue ? internalValue : tool.value), (internalValue ? internalValue : (tool.value === 'UL' || tool.value === 'OL') ? null : tool.value), null, this.enterKey);
        scrollToCursor(this.contentModule.getDocument(), this.inputElement);
        if (option && option.undo) {
            this.formatter.saveData();
            this.formatter.enableUndo(this);
        }
        this.setPlaceHolder();
        this.notify(events.contentChanged, {});
    };
    RichTextEditor.prototype.htmlPurifier = function (command, value) {
        if (this.editorMode === 'HTML') {
            switch (command) {
                case 'insertHTML':
                    if (this.enableHtmlSanitizer) {
                        if (typeof value === 'string') {
                            value = value.replace(/&(times|divide|ne)/g, '&amp;amp;$1');
                            value = this.htmlEditorModule.sanitizeHelper(value);
                        }
                        else {
                            value = this.htmlEditorModule.sanitizeHelper(value.outerHTML);
                        }
                    }
                    break;
                case 'insertTable':
                    if (isNOU(value.width)) {
                        value.width = { minWidth: this.tableSettings.minWidth,
                            maxWidth: this.tableSettings.maxWidth, width: this.tableSettings.width };
                    }
                    break;
                case 'insertImage': {
                    var temp = this.createElement('img', {
                        attrs: {
                            src: value.url
                        }
                    });
                    var imageValue = temp.outerHTML;
                    if (this.enableHtmlSanitizer) {
                        imageValue = this.htmlEditorModule.sanitizeHelper(temp.outerHTML);
                    }
                    var url = (imageValue !== '' && (this.createElement('div', {
                        innerHTML: imageValue
                    }).firstElementChild).getAttribute('src')) || null;
                    url = !isNOU(url) ? url : '';
                    value.url = url;
                    if (isNOU(value.width)) {
                        value.width = { minWidth: this.insertImageSettings.minWidth,
                            maxWidth: this.insertImageSettings.maxWidth, width: this.insertImageSettings.width };
                    }
                    if (isNOU(value.height)) {
                        value.height = { minHeight: this.insertImageSettings.minHeight,
                            maxHeight: this.insertImageSettings.maxHeight, height: this.insertImageSettings.height };
                    }
                    break;
                }
                case 'insertAudio': {
                    var wrapTemp = this.createElement('audio', {
                        attrs: {
                            controls: ''
                        }
                    });
                    var temp = this.createElement('source', {
                        attrs: {
                            src: value.url,
                            type: value.url && value.url.split('.').length > 0
                                ? 'audio/' + value.url.split('.')[value.url.split('.').length - 1] : ''
                        }
                    });
                    wrapTemp.appendChild(temp);
                    var audioValue = wrapTemp.outerHTML;
                    if (this.enableHtmlSanitizer) {
                        audioValue = this.htmlEditorModule.sanitizeHelper(wrapTemp.outerHTML);
                    }
                    var url = (audioValue !== '' && (this.createElement('div', {
                        innerHTML: audioValue
                    }).firstElementChild.firstElementChild).getAttribute('src')) || null;
                    url = !isNOU(url) ? url : '';
                    value.url = url;
                    break;
                }
                case 'insertVideo': {
                    var wrapTemp = this.createElement('video', {
                        attrs: {
                            controls: ''
                        }
                    });
                    var temp = this.createElement('source', {
                        attrs: {
                            src: value.url,
                            type: value.url && value.url.split('.').length > 0
                                ? 'video/' + value.url.split('.')[value.url.split('.').length - 1] : ''
                        }
                    });
                    wrapTemp.appendChild(temp);
                    var audioValue = wrapTemp.outerHTML;
                    if (this.enableHtmlSanitizer) {
                        audioValue = this.htmlEditorModule.sanitizeHelper(temp.outerHTML);
                    }
                    var url = (audioValue !== '' && (this.createElement('div', {
                        innerHTML: audioValue
                    }).firstElementChild).getAttribute('src')) || null;
                    url = !isNOU(url) ? url : '';
                    value.url = url;
                    if (isNOU(value.width)) {
                        value.width = { minWidth: this.insertVideoSettings.minWidth,
                            maxWidth: this.insertVideoSettings.maxWidth, width: this.insertVideoSettings.width };
                    }
                    if (isNOU(value.height)) {
                        value.height = { minHeight: this.insertVideoSettings.minHeight,
                            maxHeight: this.insertVideoSettings.maxHeight, height: this.insertVideoSettings.height };
                    }
                    break;
                }
                case 'createLink': {
                    var tempNode = this.createElement('a', {
                        attrs: {
                            href: value.url
                        }
                    });
                    var linkValue = tempNode.outerHTML;
                    if (this.enableHtmlSanitizer) {
                        linkValue = this.htmlEditorModule.sanitizeHelper(tempNode.outerHTML);
                    }
                    var href = (linkValue !== '' && (this.createElement('div', {
                        innerHTML: linkValue
                    }).firstElementChild).getAttribute('href')) || null;
                    href = !isNOU(href) ? href : '';
                    value.url = href;
                    break;
                }
            }
        }
        return value;
    };
    RichTextEditor.prototype.encode = function (value) {
        var divNode = this.createElement('div');
        divNode.innerText = value.trim();
        // eslint-disable-next-line
        return divNode.innerHTML.replace(/<br\s*[\/]?>/gi, '\n');
    };
    /**
     * For internal use only - To Initialize the component rendering.
     *
     * @returns {void}
     * @private
     * @deprecated
     */
    RichTextEditor.prototype.render = function () {
        this.setProperties({ value: this.replaceEntities(this.value) }, true);
        if (this.value && !this.valueTemplate) {
            this.setProperties({ value: this.serializeValue(this.value) }, true);
        }
        this.value = (!(this.editorMode === 'Markdown') && !isNOU(this.value)) ? this.addAnchorAriaLabel(this.value) : this.value;
        this.renderModule = new Render(this, this.serviceLocator);
        this.sourceCodeModule = new ViewSource(this, this.serviceLocator);
        this.notify(events.initialLoad, {});
        this.trigger(events.load);
        this.RTERender();
        // eslint-disable-next-line
        var execCommandCallBack = new ExecCommandCallBack(this);
        this.userAgentData = new CustomUserAgentData(Browser.userAgent, false);
        this.notify(events.initialEnd, {});
        if (this.enableXhtml) {
            this.setProperties({ value: this.getXhtml() }, true);
        }
        if (this.toolbarSettings.enable && (this.toolbarSettings.type === 'Expand' || this.toolbarSettings.type === 'MultiRow' || this.toolbarSettings.type === 'Scrollable') && !isNOU(this.getToolbar()) &&
            (this.toolbarSettings.items.indexOf('Undo') > -1 && this.toolbarSettings.items.indexOf('Redo') > -1)) {
            this.disableToolbarItem(['Undo', 'Redo']);
        }
        if (this.value !== null) {
            this.valueContainer.defaultValue = this.value;
        }
        // eslint-disable-next-line
        (this.enabled && !this.readonly) ? this.eventInitializer() : this.unWireEvents();
        this.notify(events.bindCssClass, { cssClass: this.getCssClass() });
        this.addAudioVideoWrapper();
        this.notify(events.tableclass, {});
        this.autoResize();
        this.renderComplete();
    };
    /**
     * addAudioVideoWrapper method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.addAudioVideoWrapper = function () {
        var _this = this;
        var insertElem;
        var audioElm = this.element.querySelectorAll('audio');
        for (var i = 0; i < audioElm.length; i++) {
            if (!audioElm[i].classList.contains('e-rte-audio')) {
                audioElm[i].classList.add('e-rte-audio');
                audioElm[i].classList.add(classes.CLS_AUDIOINLINE);
            }
            // eslint-disable-next-line max-len
            if (!audioElm[i].parentElement.classList.contains(classes.CLS_CLICKELEM) && !audioElm[i].parentElement.classList.contains(classes.CLS_AUDIOWRAP)) {
                var audioWrapElem = this.createElement('span', { className: classes.CLS_AUDIOWRAP });
                var csstext = 'width:300px; margin:0 auto;';
                updateCSSText(audioWrapElem, csstext);
                audioWrapElem.contentEditable = 'false';
                var audioInnerWrapElem = this.createElement('span', { className: classes.CLS_CLICKELEM });
                audioWrapElem.appendChild(audioInnerWrapElem);
                audioElm[i].parentNode.insertBefore(audioWrapElem, audioElm[i].nextSibling);
                audioInnerWrapElem.appendChild(audioElm[i]);
                if (audioWrapElem.nextElementSibling === null) {
                    insertElem = this.createElement('br');
                    audioWrapElem.parentNode.insertBefore(insertElem, audioWrapElem.nextSibling);
                }
            }
        }
        var videoElm = this.element.querySelectorAll('video');
        for (var i = 0; i < videoElm.length; i++) {
            if (!videoElm[i].classList.contains('e-rte-video')) {
                videoElm[i].classList.add('e-rte-video');
                videoElm[i].classList.add(classes.CLS_VIDEOINLINE);
            }
            // eslint-disable-next-line max-len
            if (!videoElm[i].parentElement.classList.contains(classes.CLS_CLICKELEM) && !videoElm[i].parentElement.classList.contains(classes.CLS_VIDEOWRAP)) {
                var videoWrapElem = this.createElement('span', { className: classes.CLS_VIDEOWRAP });
                videoWrapElem.contentEditable = 'false';
                videoElm[i].parentNode.insertBefore(videoWrapElem, videoElm[i].nextSibling);
                videoWrapElem.appendChild(videoElm[i]);
                if (videoWrapElem.nextElementSibling === null) {
                    insertElem = this.createElement('br');
                    videoWrapElem.parentNode.insertBefore(insertElem, videoWrapElem.nextSibling);
                }
            }
            if (Browser.userAgent.indexOf('Firefox') !== -1) {
                // eslint-disable-next-line
                videoElm[i].addEventListener('play', function (args) {
                    _this.notify(events.mouseDown, { args: args });
                    _this.notify('editAreaClick', { args: args });
                });
                // eslint-disable-next-line
                videoElm[i].addEventListener('pause', function (args) {
                    _this.notify(events.mouseDown, { args: args });
                    _this.notify('editAreaClick', { args: args });
                });
            }
        }
    };
    /**
     * For internal use only - Initialize the event handler
     *
     * @returns {void}
     * @private
     * @deprecated
     * @hidden
     */
    RichTextEditor.prototype.eventInitializer = function () {
        this.wireEvents();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    RichTextEditor.prototype.cleanList = function (e) {
        var range = this.getRange();
        var currentStartContainer = range.startContainer;
        var currentEndContainer = range.endContainer;
        var currentStartOffset = range.startOffset;
        var isSameContainer = currentStartContainer === currentEndContainer ? true : false;
        // eslint-disable-next-line
        var currentEndOffset = currentEndContainer.textContent.length;
        var endNode = range.endContainer.nodeName === '#text' ? range.endContainer.parentElement :
            range.endContainer;
        var closestLI = closest(endNode, 'LI');
        var isDetached = false;
        var currentRangeEndOffset = range.endOffset;
        if (currentEndContainer.nodeType === Node.TEXT_NODE) {
            if (currentEndContainer.textContent.charAt(currentRangeEndOffset - 1) === '\uFEFF') {
                currentRangeEndOffset--;
            }
        }
        if (!isNOU(closestLI) && endNode.textContent.trim().length === currentRangeEndOffset &&
            !range.collapsed && isNOU(endNode.nextElementSibling) && !endNode.classList.contains(classes.CLS_IMG_INNER)) {
            for (var i = 0; i < closestLI.childNodes.length; i++) {
                if (closestLI.childNodes[i].nodeName === '#text' && closestLI.childNodes[i].textContent.trim().length === 0) {
                    detach(closestLI.childNodes[i]);
                    isDetached = true;
                    i--;
                }
            }
            var currentLastElem = closestLI;
            while (currentLastElem.lastChild !== null && currentLastElem.nodeName !== '#text') {
                currentLastElem = currentLastElem.lastChild;
            }
            if (isDetached) {
                var currentLast = currentLastElem.nodeName === 'BR' && !isNOU(currentLastElem.previousSibling) ?
                    currentLastElem.previousSibling : currentLastElem;
                this.formatter.editorManager.nodeSelection.setSelectionText(this.contentModule.getDocument(), isSameContainer ? currentLast : currentStartContainer, currentLast, currentStartOffset, (currentLast.nodeName === 'BR' ? 0 : currentLast.textContent.length));
            }
        }
    };
    /**
     * For internal use only - keydown the event handler;
     *
     * @param {KeyboardEvent} e - specifies the event.
     * @returns {void}
     * @private
     * @deprecated
     * @hidden
     */
    RichTextEditor.prototype.keyDown = function (e) {
        var isMacDev = this.userAgentData.getPlatform() === 'macOS';
        if (((e.ctrlKey || (e.metaKey && isMacDev)) && e.shiftKey && e.keyCode === 86) ||
            (e.metaKey && isMacDev && e.altKey && e.shiftKey && e.keyCode === 86)) {
            this.isPlainPaste = true;
        }
        if (this.inputElement.classList.contains('e-mention')) {
            var mentionPopup = this.element.ownerDocument.getElementById(this.inputElement.id + '_popup');
            var slashMenuPopup = this.element.ownerDocument.getElementById(this.inputElement.id + '_slash_menu_popup');
            var mentionKeys = mentionRestrictKeys;
            var isMentionKeys = mentionKeys.indexOf(e.key) !== -1;
            var isMentionPopupOpen = mentionPopup && mentionPopup.classList.contains('e-popup-open');
            var isSlashMenuPopupOpen = slashMenuPopup && slashMenuPopup.classList.contains('e-popup-open');
            if (isMentionKeys && (isMentionPopupOpen || isSlashMenuPopupOpen)) {
                return;
            }
        }
        if (this.enableTabKey) {
            if (this.quickToolbarModule && !e.altKey && e.key !== 'F10' && e.action !== 'toolbar-focus') {
                this.quickToolbarModule.hideQuickToolbars();
            }
            var isImageResize = this.imageModule && this.imageModule.imgResizeDiv ? true : false;
            var isVideoResize = this.videoModule && this.videoModule.vidResizeDiv ? true : false;
            if (isImageResize) {
                this.imageModule.cancelResizeAction();
            }
            if (isVideoResize) {
                this.videoModule.cancelResizeAction();
            }
        }
        this.notify(events.keyDown, { member: 'keydown', args: e });
        this.restrict(e);
        if (this.editorMode === 'HTML') {
            this.cleanList(e);
        }
        if (this.editorMode === 'HTML' && ((e.which === 8 && e.code === 'Backspace') || (e.which === 46 && e.code === 'Delete'))) {
            var range = this.getRange();
            var startNode = range.startContainer.nodeName === '#text' ? range.startContainer.parentElement :
                range.startContainer;
            if (closest(startNode, 'pre') &&
                (e.which === 8 && range.startContainer.textContent.charCodeAt(range.startOffset - 1) === 8203) ||
                (e.which === 46 && range.startContainer.textContent.charCodeAt(range.startOffset) === 8203)) {
                var regEx = new RegExp('\u200B', 'g');
                var pointer = e.which === 8 ? range.startOffset - 1 : range.startOffset;
                range.startContainer.textContent = range.startContainer.textContent.replace(regEx, '');
                this.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), range.startContainer, pointer);
            }
            else if ((e.code === 'Backspace' && e.which === 8) &&
                range.startContainer.textContent.charCodeAt(0) === 8203 && range.collapsed) {
                var parentEle = range.startContainer.parentElement;
                var index = void 0;
                var i = void 0;
                for (i = 0; i < parentEle.childNodes.length; i++) {
                    if (parentEle.childNodes[i] === range.startContainer) {
                        index = i;
                    }
                }
                var bool = true;
                var removeNodeArray = [];
                for (i = index; i >= 0; i--) {
                    // eslint-disable-next-line max-len
                    if (parentEle.childNodes[i].nodeType === 3 && parentEle.childNodes[i].textContent.charCodeAt(0) === 8203 && bool) {
                        removeNodeArray.push(i);
                    }
                    else {
                        bool = false;
                    }
                }
                if (removeNodeArray.length > 0) {
                    for (i = removeNodeArray.length - 1; i > 0; i--) {
                        parentEle.childNodes[removeNodeArray[i]].textContent = '';
                    }
                }
                this.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), range.startContainer, range.startOffset);
            }
        }
        var notFormatPainterCopy = isNOU(e.action) ? true : (e.action !== 'format-copy' ? true : false);
        if (this.formatter.getUndoRedoStack().length === 0 && notFormatPainterCopy &&
            !(e.altKey || (e.shiftKey && e.which === 16) || (e.altKey && e.shiftKey && e.which === 67))) {
            this.formatter.saveData();
        }
        var preventingMention = false;
        if (this.editorMode === 'HTML') {
            var range = this.getRange();
            preventingMention = !isNOU(range.startContainer) && range.startContainer === range.endContainer && range.endContainer.childNodes.length > 1 && !isNOU(range.startContainer.childNodes[range.startOffset - 1]) && range.startContainer.childNodes[range.startOffset - 1].nodeName === '#text' && !isNOU(range.startContainer.childNodes[range.startOffset - 1].previousSibling) && range.startContainer.childNodes[range.startOffset - 1].textContent.charCodeAt(0) === 32 && range.startContainer.childNodes[range.startOffset - 1].previousSibling.classList.contains('e-mention-chip');
        }
        var keyboardEventAction = ['insert-link', 'format-copy', 'format-paste', 'insert-image', 'insert-table', 'insert-audio', 'insert-video'];
        if (keyboardEventAction.indexOf(e.action) === -1 &&
            (!e.target || !(e.target.classList.contains('e-mention') && !isNOU(document.querySelector('#' + e.target.id + '_popup.e-popup-open')) && e.code === 'Tab')) &&
            (e.action && e.action !== 'paste' && e.action !== 'space'
                || e.which === 9 || (e.code === 'Backspace' && e.which === 8)) && !preventingMention) {
            var FormatPainterEscapeAction = false;
            if (!isNOU(this.formatPainterModule)) {
                FormatPainterEscapeAction = this.formatPainterModule.previousAction === 'escape';
            }
            if (!FormatPainterEscapeAction) {
                if (this.editorMode === 'HTML' && (e.action === 'increase-fontsize' || e.action === 'decrease-fontsize')) {
                    this.notify(events.onHandleFontsizeChange, { member: 'onHandleFontsizeChange', args: e });
                }
                else {
                    this.formatter.process(this, null, e);
                }
            }
            switch (e.action) {
                case 'toolbar-focus':
                    if (this.toolbarSettings.enable && this.getToolbarElement()) {
                        if (this.userAgentData.isSafari() && e.type === 'keydown' && this.formatter.editorManager.nodeSelection &&
                            this.formatter.editorManager.nodeSelection.get(this.contentModule.getDocument()).rangeCount > 0 &&
                            this.inputElement.contains(this.getRange().startContainer)) {
                            this.notify(events.selectionSave, {});
                        }
                        var toolbarFocusType = 'toolbar';
                        var firstActiveItem = this.getToolbarElement().querySelector('.e-toolbar-item:not(.e-overlay)[title]');
                        var quickToolbarElem = this.getRenderedQuickToolbarElem();
                        if (quickToolbarElem) {
                            firstActiveItem = quickToolbarElem.querySelector('.e-toolbar-item:not(.e-overlay)[title]');
                            toolbarFocusType = 'quickToolbar';
                        }
                        if (firstActiveItem) {
                            var firstChild = firstActiveItem.firstElementChild;
                            firstChild.removeAttribute('tabindex');
                            firstChild.focus();
                            if (quickToolbarElem && quickToolbarElem.classList.contains('e-rte-image-popup') && toolbarFocusType === 'quickToolbar' && this.userAgentData.isSafari()) {
                                this.inputElement.ownerDocument.getSelection().removeAllRanges();
                            }
                        }
                    }
                    break;
                case 'escape':
                    this.contentModule.getEditPanel().focus();
                    break;
            }
        }
        this.notify(events.afterKeyDown, { member: 'afterKeyDown', args: e });
        this.autoResize();
        if (!isNOU(this.placeholder)) {
            this.setPlaceHolder();
        }
        if (!isNOU(e) && !isNOU(e.code) && (e.code === 'Backspace' || e.code === 'Delete')) {
            var range = this.contentModule.getDocument().getSelection().getRangeAt(0);
            var div = document.createElement('div');
            div.appendChild(range.cloneContents());
            var selectedHTML = div.innerHTML;
            if (selectedHTML === this.inputElement.innerHTML) {
                this.isCopyAll = true;
            }
        }
        // Cmd + Backspace triggers only the keydown event; the keyup event is not triggered.
        if (e.metaKey && e.key === 'Backspace' && this.autoSaveOnIdle) {
            this.keyUp(e);
        }
    };
    RichTextEditor.prototype.keyUp = function (e) {
        if (this.editorMode === 'HTML') {
            var range = this.getRange();
            if (!isNOU(e) && !isNOU(e.code) && (e.code === 'Backspace' || e.code === 'Delete')) {
                // To prevent the reformatting the content removed browser behavior.
                var currentRange = this.getRange();
                var selection = this.iframeSettings.enable ? this.contentModule.getPanel().ownerDocument.getSelection() :
                    this.contentModule.getDocument().getSelection();
                if (this.isCopyAll) {
                    var brElement = this.createElement('br');
                    var newElement = this.enterKey === 'BR' ? brElement : this.createElement(this.enterKey).appendChild(brElement).parentElement;
                    this.inputElement.innerHTML = '';
                    this.inputElement.appendChild(newElement);
                    this.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), brElement, 0);
                    this.isCopyAll = false;
                }
                if (selection.rangeCount > 0 && this.contentModule.getDocument().activeElement.tagName !== 'INPUT' && this.inputElement.contains(this.contentModule.getDocument().activeElement) && range.startContainer.innerHTML === '<br>' && range.startContainer.textContent === '') {
                    selection.removeAllRanges();
                    selection.addRange(currentRange);
                }
            }
            if (Browser.userAgent.indexOf('Firefox') !== -1 && range.startContainer.nodeName === '#text' &&
                range.startContainer.parentElement === this.inputElement && this.enterKey !== 'BR') {
                var range_1 = this.getRange();
                var tempElem = this.createElement(this.enterKey);
                range_1.startContainer.parentElement.insertBefore(tempElem, range_1.startContainer);
                tempElem.appendChild(range_1.startContainer);
                this.formatter.editorManager.nodeSelection.setSelectionText(this.contentModule.getDocument(), tempElem.childNodes[0], tempElem.childNodes[0], tempElem.childNodes[0].textContent.length, tempElem.childNodes[0].textContent.length);
            }
        }
        var currentStackIndex = this.formatter.getCurrentStackIndex();
        if (currentStackIndex === 0) {
            this.updateUndoRedoStack(e);
        }
        this.notify(events.keyUp, { member: 'keyup', args: e });
        this.notify(events.tableModulekeyUp, { member: 'tableModulekeyUp', args: e });
        if (e.code === 'KeyX' && e.which === 88 && e.keyCode === 88 && e.ctrlKey && (this.inputElement.innerHTML === '' ||
            this.inputElement.innerHTML === '<br>')) {
            this.inputElement.innerHTML = resetContentEditableElements(getEditValue(getDefaultValue(this), this), this.editorMode);
        }
        var isMention = this.inputElement.classList.contains('e-mention');
        var allowedKeys = e.which === 32 || e.which === 13 || e.which === 8 || e.which === 46 || e.which === 9 && isMention;
        var formatPainterCopy = e.key === 'C' && e.altKey && e.shiftKey;
        var formatPainterPaste = e.key === 'V' && e.altKey && e.shiftKey;
        if ((!formatPainterCopy && !formatPainterPaste) && ((e.key !== 'shift' && !e.ctrlKey) && e.key && e.key.length === 1 || allowedKeys) || (this.editorMode === 'Markdown'
            && ((e.key !== 'shift' && !e.ctrlKey) && e.key && e.key.length === 1 || allowedKeys)) || (this.autoSaveOnIdle && Browser.isDevice) && !this.inlineMode.enable) {
            this.formatter.onKeyHandler(this, e);
        }
        if (this.inputElement && this.inputElement.textContent.length !== 0
            || this.element.querySelectorAll('.e-toolbar-item.e-active').length > 0 || this.formatter.getUndoRedoStack().length > 0) {
            this.notify(events.toolbarRefresh, { args: e });
        }
        this.setPlaceHolder();
    };
    /**
     * @param {string} value - specifies the value.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.serializeValue = function (value) {
        if (this.editorMode === 'HTML' && !isNOU(value)) {
            if (this.enableHtmlEncode) {
                value = this.htmlEditorModule.sanitizeHelper(decode(value));
                value = this.encode(value);
            }
            else {
                value = this.htmlEditorModule.sanitizeHelper(value);
                value = this.enableXhtml ? this.htmlEditorModule.xhtmlValidation.selfEncloseValidation(value) : value;
            }
        }
        return value;
    };
    /**
     * Sanitizes an HTML string to prevent cross-site scripting (XSS) attacks.
     * This method is applicable when the editor mode is specifically set to `HTML`.
     *
     * @param {string} value - The HTML content to be sanitized for security purposes.
     * @returns {string} - The HTML content after being sanitized.
     */
    RichTextEditor.prototype.sanitizeHtml = function (value) {
        return this.serializeValue(value);
    };
    /**
     * updateValue method
     *
     * @param {string} value - specifies the string value.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.updateValue = function (value) {
        if (isNOU(value)) {
            var inputVal = this.inputElement.innerHTML;
            this.setProperties({ value: isEditableValueEmpty(inputVal) ? null : inputVal });
        }
        else {
            this.setProperties({ value: value });
        }
    };
    RichTextEditor.prototype.triggerEditArea = function (e) {
        if (!isIDevice()) {
            this.notify(events.editAreaClick, { member: 'editAreaClick', args: e });
        }
        else {
            var touch = (e.touches ? e.changedTouches[0] : e);
            if (this.clickPoints.clientX === touch.clientX && this.clickPoints.clientY === touch.clientY) {
                this.notify(events.editAreaClick, { member: 'editAreaClick', args: e });
            }
        }
    };
    RichTextEditor.prototype.notifyMouseUp = function (e) {
        var touch = (e.touches ? e.changedTouches[0] : e);
        this.notify(events.mouseUp, { member: 'mouseUp', args: e,
            touchData: { prevClientX: this.clickPoints.clientX, prevClientY: this.clickPoints.clientY,
                clientX: touch.clientX, clientY: touch.clientY }
        });
        if (this.inputElement && ((this.editorMode === 'HTML' && ((this.inputElement.textContent.length !== 0) || e.target && !isNOU(e.target.querySelector('li')))) ||
            (this.editorMode === 'Markdown' && this.inputElement.value.length !== 0)) ||
            (e.target && !isNOU(closest(e.target, 'table'))) ||
            (e.target && !isNOU(e.target.querySelector('img'))) ||
            (e.target && (e.target.nodeName === 'VIDEO' ||
                e.target.querySelectorAll('.' + classes.CLS_VIDEOWRAP).length > 0) ||
                (e.target && e.target.nodeName !== 'BR' &&
                    (e.target.classList.contains(classes.CLS_AUDIOWRAP) ||
                        e.target.classList.contains(classes.CLS_CLICKELEM) ||
                        e.target.classList.contains(classes.CLS_VID_CLICK_ELEM))))) {
            this.notify(events.toolbarRefresh, { args: e });
        }
        this.triggerEditArea(e);
    };
    RichTextEditor.prototype.updateUndoRedoStack = function (e) {
        var undoRedoStack = this.formatter.getUndoRedoStack();
        var currentStackIndex = this.formatter.getCurrentStackIndex();
        var navigationKeys = [
            'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
            'Home', 'End', 'PageUp', 'PageDown'
        ];
        var isNavKey = navigationKeys.indexOf(e.key) !== -1;
        var isNavigationKey = e.type === 'keyup' ? isNavKey : true;
        if (undoRedoStack.length === 0 || currentStackIndex === 0) {
            if (undoRedoStack.length === 0) {
                this.formatter.saveData();
            }
            else if (currentStackIndex === 0 && this.editorMode === 'HTML' && isNavigationKey) {
                var firstStackState = undoRedoStack[0];
                var save = new NodeSelection(this.inputElement)
                    .save(this.getRange(), this.contentModule.getDocument());
                firstStackState.range = save;
            }
            else if (currentStackIndex === 0 && this.editorMode === 'Markdown' && isNavigationKey) {
                var markdownFirstStackState = undoRedoStack[0];
                var start = this.inputElement.selectionStart;
                var end = this.inputElement.selectionEnd;
                markdownFirstStackState.start = start;
                markdownFirstStackState.end = end;
            }
        }
    };
    RichTextEditor.prototype.mouseUp = function (e) {
        if (this.quickToolbarSettings.showOnRightClick && Browser.isDevice) {
            var target = e.target;
            var closestTable = closest(target, 'table');
            if (target && target.nodeName === 'A' || target.nodeName === 'IMG' || (target.nodeName === 'TD' || target.nodeName === 'TH' ||
                target.nodeName === 'TABLE' || (closestTable && this.contentModule.getEditPanel().contains(closestTable)))) {
                return;
            }
        }
        this.notifyMouseUp(e);
        this.setPlaceHolder();
        this.autoResize();
        this.updateUndoRedoStack(e);
    };
    /**
     * @param {Function} module - specifies the module function.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.ensureModuleInjected = function (module) {
        return this.getInjectedModules().indexOf(module) >= 0;
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.onCopy = function () {
        this.contentModule.getDocument().execCommand('copy', false, null);
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.onCut = function () {
        this.contentModule.getDocument().execCommand('cut', false, null);
    };
    /**
     * @param {KeyboardEvent} e - specifies the keyboard event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.onPaste = function (e) {
        var _this = this;
        var evenArgs = {
            originalEvent: e,
            cancel: false,
            requestType: 'Paste'
        };
        this.trigger(events.actionBegin, evenArgs, function (pasteArgs) {
            var currentLength = _this.getText().replace(/\u200B/g, '').replace(_this.editorMode === 'HTML' ? /(\r\n|\n|\r|\t)/gm : '', '').length;
            var selectionLength = _this.getSelection().length;
            var pastedContentLength = (isNOU(e) || isNOU(e.clipboardData))
                ? 0 : e.clipboardData.getData('text/plain').replace(/(\r\n|\n|\r|\t)/gm, '').replace(/\u200B/g, '').length;
            var totalLength = (currentLength - selectionLength) + pastedContentLength;
            if (_this.editorMode === 'Markdown') {
                var args_1 = { requestType: 'Paste', editorMode: _this.editorMode, event: e };
                setTimeout(function () {
                    _this.formatter.onSuccess(_this, args_1);
                }, 0);
                if (!(_this.maxLength === -1 || totalLength <= _this.maxLength)) {
                    e.preventDefault();
                }
                return;
            }
            if (!pasteArgs.cancel && _this.inputElement.contentEditable === 'true' &&
                (_this.maxLength === -1 || totalLength <= _this.maxLength)) {
                var isImageDialogOpen = _this.contentModule.getDocument().querySelector('.e-rte-img-dialog');
                if (!isNOU(_this.pasteCleanupModule)) {
                    if (isNOU(isImageDialogOpen)) {
                        _this.notify(events.pasteClean, { args: e, isPlainPaste: _this.isPlainPaste });
                    }
                }
                else {
                    if (!_this.isPlainPaste) {
                        console.warn('[WARNING] :: Module "pasteCleanup" is not available in RichTextEditor component! You either misspelled the module name or forgot to load it.');
                        var args_2 = { requestType: 'Paste', editorMode: _this.editorMode, event: e };
                        var value = null;
                        var htmlValue = false;
                        if (e && !isNOU(e.clipboardData)) {
                            value = e.clipboardData.getData('text/plain');
                            htmlValue = e.clipboardData.getData('text/html').indexOf('MsoNormal') > 0;
                        }
                        var file = e && e.clipboardData &&
                            e.clipboardData.items.length > 0 ?
                            e.clipboardData.items[0].getAsFile() : null;
                        if (value !== null) {
                            _this.notify(events.paste, {
                                file: file,
                                args: e,
                                text: value,
                                isWordPaste: htmlValue
                            });
                        }
                        setTimeout(function () {
                            _this.formatter.onSuccess(_this, args_2);
                        }, 0);
                    }
                }
            }
            else {
                e.preventDefault();
            }
        });
        this.isPlainPaste = false;
    };
    /**
     * @param {string} action - specifies the string value.
     * @param {MouseEvent} event - specifies the event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.clipboardAction = function (action, event) {
        switch (action.toLowerCase()) {
            case 'cut':
                this.onCut();
                this.formatter.onSuccess(this, {
                    requestType: 'Cut',
                    editorMode: this.editorMode,
                    event: event
                });
                break;
            case 'copy':
                this.onCopy();
                this.formatter.onSuccess(this, {
                    requestType: 'Copy',
                    editorMode: this.editorMode,
                    event: event
                });
                break;
            case 'paste':
                this.onPaste(event);
                break;
        }
    };
    /**
     * Destroys the component by detaching or removing all event handlers,
     * attributes, and CSS classes. It also clears the component's element content.
     *
     * @returns {void}
     */
    RichTextEditor.prototype.destroy = function () {
        if (this.isDestroyed || !this.isRendered) {
            return;
        }
        this.element.className = this.beforeRenderClassValue;
        this.removeHtmlAttributes();
        this.removeAttributes();
        this.beforeRenderClassValue = null;
        if (!isNOU(this.timeInterval)) {
            clearInterval(this.timeInterval);
            this.timeInterval = null;
        }
        if (!isNOU(this.autoSaveTimeOut)) {
            clearTimeout(this.autoSaveTimeOut);
            this.autoSaveTimeOut = null;
        }
        if (!isNOU(this.idleInterval)) {
            clearTimeout(this.idleInterval);
            this.idleInterval = null;
        }
        this.notify(events.destroy, {});
        this.destroyDependentModules();
        this.unWireEvents();
        if (this.originalElement.tagName === 'TEXTAREA') {
            this.element.parentElement.insertBefore(this.valueContainer, this.element);
            this.valueContainer.id = this.getID();
            this.valueContainer.removeAttribute('name');
            detach(this.element);
            if (this.originalElement.innerHTML.trim() !== '') {
                this.valueContainer.value = this.originalElement.innerHTML.trim();
                this.setProperties({ value: (!isNOU(this.initialValue) ? this.initialValue : null) }, true);
            }
            else {
                this.valueContainer.value = this.valueContainer.defaultValue;
            }
            this.element = this.valueContainer;
            for (var i = 0; i < this.originalElement.classList.length; i++) {
                addClass([this.element], this.originalElement.classList[i]);
            }
            if (!isNOU(this.cssClass)) {
                var currentClassList = this.cssClass.split(' ');
                for (var i = 0; i < currentClassList.length; i++) {
                    addClass([this.element], currentClassList[i]);
                }
            }
            removeClass([this.element], classes.CLS_RTE_HIDDEN);
        }
        else {
            if (this.originalElement.innerHTML.trim() !== '') {
                this.element.innerHTML = this.originalElement.innerHTML.trim();
                this.setProperties({ value: (!isNOU(this.initialValue) ? this.initialValue : null) }, true);
            }
            else {
                this.element.innerHTML = '';
            }
        }
        var dialogElement = document.querySelector('.e-dialog.e-rte-elements');
        if (dialogElement) {
            detach(dialogElement);
        }
        if (this.placeholder && this.placeHolderWrapper) {
            this.placeHolderWrapper = null;
        }
        if (!isNOU(this.cssClass)) {
            var allClassName = this.cssClass.split(' ');
            for (var i = 0; i < allClassName.length; i++) {
                if (allClassName[i].trim() !== '') {
                    removeClass([this.element], allClassName[i]);
                }
            }
        }
        if (this.rootContainer) {
            this.rootContainer = null;
        }
        if (this.valueContainer) {
            this.valueContainer = null;
        }
        if (this.originalElement) {
            this.originalElement = null;
        }
        this.currentTarget = null;
        this.scrollParentElements = [];
        this.userAgentData = null;
        this.isRendered = false;
        _super.prototype.destroy.call(this);
    };
    RichTextEditor.prototype.removeHtmlAttributes = function () {
        if (this.htmlAttributes) {
            var keys = Object.keys(this.htmlAttributes);
            for (var i = 0; i < keys.length && this.element.hasAttribute(keys[i]); i++) {
                this.element.removeAttribute(keys[i]);
            }
        }
    };
    RichTextEditor.prototype.removeAttributes = function () {
        if (!this.enabled) {
            removeClass([this.element], classes.CLS_DISABLED);
        }
        if (this.enableRtl) {
            removeClass([this.element], classes.CLS_RTL);
        }
        if (this.readonly) {
            removeClass([this.element], classes.CLS_RTE_READONLY);
        }
        if (this.element.style.width !== '' && this.originalElement.style.width === '') {
            this.element.style.removeProperty('width');
        }
        if (this.element.style.height !== '' && this.originalElement.style.height === '') {
            this.element.style.removeProperty('height');
        }
        this.element.removeAttribute('aria-disabled');
        this.element.removeAttribute('role');
        this.element.removeAttribute('tabindex');
        this.element.removeAttribute('aria-label');
    };
    RichTextEditor.prototype.destroyDependentModules = function () {
        // To handle the non Injectible module destruction.
        this.renderModule.destroy();
        this.formatter.editorManager.destroy();
    };
    /**
     * Retrieves the HTML or text content inside the RichTextEditor.
     *
     * @returns {Element} - The element containing the content.
     */
    RichTextEditor.prototype.getContent = function () {
        return this.contentModule.getPanel();
    };
    /**
     * Retrieves the text content as a string.
     *
     * @returns {string} - The plain text content.
     */
    RichTextEditor.prototype.getText = function () {
        return this.contentModule.getText();
    };
    /**
     * Retrieves the HTML representation of the selected content as a string.
     *
     * @returns {string} - The HTML content of the selected area.
     */
    RichTextEditor.prototype.getSelectedHtml = function () {
        var range;
        var wrapperElm = this.createElement('div');
        var selection = this.contentModule.getDocument().getSelection();
        if (selection.rangeCount > 0) {
            range = selection.getRangeAt(0);
            var selectedHtml = range.cloneContents();
            wrapperElm.appendChild(selectedHtml);
        }
        return wrapperElm.innerHTML;
    };
    /**
     * Displays the inline quick toolbar.
     *
     * @returns {void}
     */
    RichTextEditor.prototype.showInlineToolbar = function () {
        if (this.inlineMode.enable) {
            var currentRange = this.getRange();
            var targetElm = currentRange.endContainer.nodeName === '#text' ?
                currentRange.endContainer.parentElement : currentRange.endContainer;
            var rects = Array.from(currentRange.getClientRects(), function (rect) { return rect; });
            if (rects.length === 0) {
                rects = [currentRange.startContainer.getBoundingClientRect()];
            }
            if (rects.length > 0) {
                var x = rects[0].left;
                var y = rects[0].top;
                this.quickToolbarModule.showInlineQTBar(x, y, targetElm);
            }
        }
    };
    /**
     * Hides the inline quick toolbar.
     *
     * @returns {void}
     */
    RichTextEditor.prototype.hideInlineToolbar = function () {
        this.quickToolbarModule.hideInlineQTBar();
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @private
     * @deprecated
     */
    RichTextEditor.prototype.getModuleName = function () {
        return 'richtexteditor';
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {RichTextEditorModel} newProp - specifies the the property.
     * @param {RichTextEditorModel} oldProp - specifies the old property.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    /* eslint-disable */
    RichTextEditor.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'enterKey':
                case 'value': {
                    var nVal = void 0;
                    if (prop === 'enterKey') {
                        if (this.value === null || this.value === '<div><br></div>' || this.value === '<p><br></p>' ||
                            this.value === '<br>') {
                            nVal = null;
                        }
                        else {
                            nVal = this.value;
                        }
                    }
                    else {
                        nVal = newProp[prop];
                    }
                    nVal = this.editorMode === 'HTML' ? this.replaceEntities(nVal) : nVal;
                    nVal = this.serializeValue(nVal);
                    var val = this.editorMode === 'HTML' ? getEditValue(nVal, this) : nVal;
                    if ((!isNOU(nVal) && nVal !== '') || prop === 'enterKey') {
                        this.setProperties({ value: ((this.enableHtmlEncode) ? this.encode(decode(val)) : val) }, true);
                    }
                    this.updatePanelValue();
                    if (this.inputElement) {
                        this.notify(events.tableclass, {});
                    }
                    this.setPlaceHolder();
                    this.notify(events.xhtmlValidation, { module: 'XhtmlValidation', newProp: newProp, oldProp: oldProp });
                    if (this.enableXhtml) {
                        this.setProperties({ value: this.getXhtml() }, true);
                    }
                    if (this.showCharCount) {
                        this.countModule.refresh();
                    }
                    this.addAudioVideoWrapper();
                    break;
                }
                case 'valueTemplate':
                    this.setValue(true);
                    if (this.showCharCount) {
                        this.countModule.refresh();
                    }
                    break;
                case 'width':
                    this.setWidth(newProp[prop]);
                    if (this.toolbarSettings.enable && !this.inlineMode.enable) {
                        this.toolbarModule.refreshToolbarOverflow();
                        this.resizeHandler();
                    }
                    break;
                case 'height':
                    this.setHeight(newProp[prop]);
                    this.autoResize();
                    break;
                case 'readonly':
                    this.setReadOnly(false);
                    break;
                case 'cssClass':
                    this.element.classList.remove(oldProp[prop]);
                    this.setCssClass(newProp[prop]);
                    this.notify(events.bindCssClass, { cssClass: newProp[prop], oldCssClass: oldProp[prop] });
                    break;
                case 'enabled':
                    this.setEnable();
                    break;
                case 'enableRtl':
                    this.updateRTL();
                    break;
                case 'placeholder':
                    this.placeholder = newProp[prop];
                    this.setPlaceHolder();
                    break;
                case 'htmlAttributes':
                    setAttributes(this.htmlAttributes, this, false, false);
                    break;
                case 'iframeSettings': {
                    var frameSetting = oldProp[prop];
                    if (frameSetting.resources) {
                        var iframe = this.contentModule.getDocument();
                        var header = iframe.querySelector('head');
                        var files = void 0;
                        if (frameSetting.resources.scripts) {
                            files = header.querySelectorAll('.' + classes.CLS_SCRIPT_SHEET);
                            this.removeSheets(files);
                        }
                        if (frameSetting.resources.styles) {
                            files = header.querySelectorAll('.' + classes.CLS_STYLE_SHEET);
                            this.removeSheets(files);
                        }
                    }
                    this.setIframeSettings();
                    break;
                }
                case 'locale':
                    _super.prototype.refresh.call(this);
                    break;
                case 'inlineMode':
                    this.notify(events.modelChanged, { module: 'quickToolbar', newProp: newProp, oldProp: oldProp });
                    break;
                case 'toolbarSettings':
                    this.notify(events.modelChanged, { module: 'toolbar', newProp: newProp, oldProp: oldProp });
                    break;
                case 'maxLength':
                    if (this.showCharCount) {
                        this.countModule.refresh();
                    }
                    break;
                case 'showCharCount':
                    if (newProp[prop] && this.countModule) {
                        this.countModule.renderCount();
                    }
                    else if (newProp[prop] === false && this.countModule) {
                        this.countModule.destroy();
                    }
                    break;
                case 'enableHtmlEncode':
                    this.updateValueData();
                    this.updatePanelValue();
                    this.setPlaceHolder();
                    if (this.showCharCount) {
                        this.countModule.refresh();
                    }
                    break;
                case 'undoRedoSteps':
                case 'undoRedoTimer':
                    this.formatter.editorManager.observer.notify(CONSTANT.MODEL_CHANGED, { newProp: newProp, oldProp: oldProp });
                    break;
                case 'enableXhtml':
                    this.notify(events.xhtmlValidation, { module: 'XhtmlValidation', newProp: newProp, oldProp: oldProp });
                    break;
                case 'quickToolbarSettings':
                    newProp.quickToolbarSettings.showOnRightClick ? this.wireContextEvent() : this.unWireContextEvent();
                    this.notify(events.modelChanged, { newProp: newProp, oldProp: oldProp });
                    break;
                case 'formatPainterSettings':
                    this.formatter.editorManager.observer.notify(CONSTANT.MODEL_CHANGED, { module: 'formatPainter', newProp: newProp });
                    break;
                default:
                    this.notify(events.modelChanged, { newProp: newProp, oldProp: oldProp });
                    break;
            }
            this.autoResize();
        }
    };
    /* eslint-enable */
    /**
     * @hidden
     * @returns {void}
     * @deprecated
     */
    RichTextEditor.prototype.updateValueData = function () {
        if (this.enableHtmlEncode) {
            this.setProperties({ value: this.encode(decode(this.inputElement.innerHTML)) }, true);
        }
        else {
            this.setProperties({
                value: /<[a-z][\s\S]*>/i.test(this.inputElement.innerHTML) ? this.inputElement.innerHTML :
                    decode(this.inputElement.innerHTML)
            });
        }
    };
    RichTextEditor.prototype.removeSheets = function (srcList) {
        var i;
        for (i = 0; i < srcList.length; i++) {
            detach(srcList[i]);
        }
    };
    RichTextEditor.prototype.replaceEntities = function (value) {
        var _this = this;
        if (this.editorMode !== 'HTML' || isNOU(value) || !/&(amp;)*((times)|(divide)|(ne))/.test(value)) {
            return value;
        }
        var isEncodedOrSanitized = this.enableHtmlEncode || this.enableHtmlSanitizer;
        var createReplacement = function (entity) {
            var replacement = isEncodedOrSanitized ? "&amp;amp;" + entity : "&amp;" + entity;
            var regexPattern = (!_this.enableHtmlEncode && _this.enableHtmlSanitizer)
                ? "&(" + entity + ")"
                : "&(amp;)*(" + entity + ")";
            var regExp = RegExp;
            var regex = new regExp(regexPattern, 'g');
            return [replacement, regex];
        };
        var entities = ['times', 'divide', 'ne'];
        var replacementsAndRegexes = entities.map(createReplacement);
        for (var _i = 0, replacementsAndRegexes_1 = replacementsAndRegexes; _i < replacementsAndRegexes_1.length; _i++) {
            var _a = replacementsAndRegexes_1[_i], replacement = _a[0], regex = _a[1];
            if (regex.test(value)) {
                value = value.replace(regex, replacement);
            }
        }
        return value;
    };
    RichTextEditor.prototype.updatePanelValue = function () {
        this.setProperties({ value: this.replaceEntities(this.value) }, true);
        var value = this.editorMode === 'HTML' ? this.listOrderCorrection(this.value) : this.value;
        value = (this.enableHtmlEncode && this.value) ? decode(value) : value;
        var getTextArea = this.element.querySelector('.' + classes.CLS_RTE_SOURCE_CODE_TXTAREA);
        if (value) {
            if (!isNOU(getTextArea) && this.rootContainer.classList.contains('e-source-code-enabled')) {
                getTextArea.value = this.value;
            }
            if (this.valueContainer) {
                this.valueContainer.value = (this.enableHtmlEncode) ? this.value : value;
            }
            if (this.editorMode === 'HTML' && this.inputElement && this.inputElement.innerHTML.trim() !== value.trim()) {
                this.inputElement.innerHTML = resetContentEditableElements(value, this.editorMode);
            }
            else if (this.editorMode === 'Markdown' && this.inputElement
                && this.inputElement.value.trim() !== value.trim()) {
                this.inputElement.value = value;
            }
        }
        else {
            if (!isNOU(getTextArea) && this.rootContainer.classList.contains('e-source-code-enabled')) {
                getTextArea.value = '';
            }
            if (this.editorMode === 'HTML') {
                this.inputElement.innerHTML = '';
                var brElement = this.createElement('br');
                if (this.enterKey === 'DIV') {
                    var divElement = this.createElement('DIV');
                    divElement.appendChild(brElement);
                    this.inputElement.appendChild(divElement);
                }
                else if (this.enterKey === 'BR') {
                    this.inputElement.appendChild(brElement);
                }
                else {
                    var pElement = this.createElement('P');
                    pElement.appendChild(brElement);
                    this.inputElement.appendChild(pElement);
                }
                if (this.formatter && this.formatter.editorManager && this.formatter.editorManager.nodeSelection) {
                    this.formatter.editorManager.nodeSelection.setCursorPoint(this.contentModule.getDocument(), brElement, 0);
                }
            }
            else {
                this.inputElement.value = '';
            }
            if (this.valueContainer) {
                this.valueContainer.value = '';
            }
        }
        if (this.showCharCount) {
            this.countModule.refresh();
        }
    };
    RichTextEditor.prototype.listOrderCorrection = function (value) {
        var valueElementWrapper = this.createElement('div');
        valueElementWrapper.innerHTML = value;
        var listElements = valueElementWrapper.querySelectorAll('UL, OL');
        for (var i = 0; i < listElements.length; i++) {
            if (!isNOU(listElements[i]) && !isNOU(listElements[i].parentElement) && !isNOU(listElements[i].previousElementSibling) && (listElements[i].parentElement.nodeName === 'UL' || listElements[i].parentElement.nodeName === 'OL')) {
                listElements[i].previousElementSibling.appendChild(listElements[i]);
            }
        }
        return valueElementWrapper.innerHTML;
    };
    RichTextEditor.prototype.setHeight = function (height) {
        if (height !== 'auto') {
            this.element.style.height = formatUnit(height);
        }
        else {
            this.element.style.height = 'auto';
        }
        if (this.toolbarSettings.type === 'Expand' && (typeof (this.height) === 'string' &&
            this.height.indexOf('px') > -1 || typeof (this.height) === 'number')) {
            this.element.classList.add(classes.CLS_RTE_FIXED_TB_EXPAND);
        }
        else {
            this.element.classList.remove(classes.CLS_RTE_FIXED_TB_EXPAND);
        }
    };
    /**
     * setPlaceHolder method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.setPlaceHolder = function () {
        if (this.inputElement && this.placeholder && this.iframeSettings.enable !== true) {
            if (this.editorMode !== 'Markdown') {
                if (!this.placeHolderWrapper) {
                    this.placeHolderWrapper = this.createElement('span', { className: 'rte-placeholder e-rte-placeholder' + ' ' + this.getCssClass() });
                    if (this.fontSize.default) {
                        this.placeHolderWrapper.style.fontSize = this.fontSize.default;
                    }
                    if (this.inputElement) {
                        this.inputElement.parentElement.insertBefore(this.placeHolderWrapper, this.inputElement);
                    }
                }
                this.placeHolderWrapper.innerHTML = this.placeholder;
                if (this.inputElement.textContent.length === 0 && this.inputElement.childNodes.length < 2 && !isNOU(this.inputElement.firstChild) && (this.inputElement.firstChild.nodeName === 'BR' ||
                    ((this.inputElement.firstChild.nodeName === 'P' || this.inputElement.firstChild.nodeName === 'DIV') && !isNOU(this.inputElement.firstChild.firstChild) &&
                        this.inputElement.firstChild.childNodes.length < 2 && this.inputElement.firstChild.firstChild.nodeName === 'BR'))) {
                    this.placeHolderWrapper.classList.add('enabled');
                    EventHandler.add(this.inputElement, 'input', this.setPlaceHolder, this);
                }
                else {
                    this.placeHolderWrapper.classList.remove('enabled');
                    EventHandler.remove(this.inputElement, 'input', this.setPlaceHolder);
                }
            }
            else {
                this.inputElement.setAttribute('placeholder', this.placeholder);
            }
        }
        if (this.placeholder && this.iframeSettings.enable && this.inputElement) {
            if (this.inputElement.textContent.length === 0 && this.inputElement.childNodes.length < 2 && !isNOU(this.inputElement.firstChild) && (this.inputElement.firstChild.nodeName === 'BR' ||
                ((this.inputElement.firstChild.nodeName === 'P' || this.inputElement.firstChild.nodeName === 'DIV') && !isNOU(this.inputElement.firstChild.firstChild) &&
                    this.inputElement.firstChild.firstChild.nodeName === 'BR'))) {
                addClass([this.inputElement], 'e-rte-placeholder');
                this.inputElement.setAttribute('placeholder', this.placeholder);
                EventHandler.add(this.inputElement, 'input', this.setPlaceHolder, this);
            }
            else {
                removeClass([this.inputElement], 'e-rte-placeholder');
                EventHandler.remove(this.inputElement, 'input', this.setPlaceHolder);
            }
        }
    };
    RichTextEditor.prototype.setWidth = function (width) {
        if (width !== 'auto') {
            setStyleAttribute(this.element, { 'width': formatUnit(this.width) });
        }
        else {
            this.element.style.width = 'auto';
        }
    };
    RichTextEditor.prototype.setCssClass = function (cssClass) {
        if (!isNOU(cssClass)) {
            var allClassName = cssClass.split(' ');
            for (var i = 0; i < allClassName.length; i++) {
                if (allClassName[i].trim() !== '') {
                    this.element.classList.add(allClassName[i]);
                }
            }
        }
    };
    RichTextEditor.prototype.updateRTL = function () {
        this.notify(events.rtlMode, { enableRtl: this.enableRtl });
        if (this.enableRtl) {
            this.element.classList.add(classes.CLS_RTL);
            this.inputElement.classList.add(classes.CLS_RTL);
        }
        else {
            this.element.classList.remove(classes.CLS_RTL);
            this.inputElement.classList.remove(classes.CLS_RTL);
        }
    };
    RichTextEditor.prototype.updateReadOnly = function () {
        this.notify(events.readOnlyMode, { editPanel: this.inputElement, mode: this.readonly });
    };
    /**
     * setReadOnly method
     *
     * @param {boolean} initial - specifies the boolean value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.setReadOnly = function (initial) {
        this.updateReadOnly();
        if (!initial) {
            if (this.readonly && this.enabled) {
                this.unbindEvents();
                this.unWireEvents();
            }
            else if (this.enabled) {
                this.wireEvents();
            }
        }
    };
    /**
     * Prints all the pages of the RichTextEditor by default.
     *
     * @returns {void}
     */
    RichTextEditor.prototype.print = function () {
        var _this = this;
        var printWind;
        var printArgs = {
            element: this.inputElement,
            requestType: 'print',
            cancel: false
        };
        this.trigger(events.actionBegin, printArgs, function (printingArgs) {
            printWind = window.open('', 'print', 'height=' + window.outerHeight + ',width=' + window.outerWidth);
            if (Browser.info.name === 'msie') {
                printWind.resizeTo(screen.availWidth, screen.availHeight);
            }
            printWind = printWindow(_this.inputElement, printWind);
            if (!printingArgs.cancel) {
                var actionArgs = {
                    requestType: 'print'
                };
                _this.trigger(events.actionComplete, actionArgs);
            }
        });
    };
    /**
     * Refreshes the view of the editor.
     *
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.refreshUI = function () {
        this.renderModule.refresh();
    };
    /**
     * Displays the Rich Text Editor component in full-screen mode.
     *
     * @returns {void}
     */
    RichTextEditor.prototype.showFullScreen = function () {
        this.fullScreenModule.showFullScreen();
    };
    /**
     * Enables the specified toolbar items in the Rich Text Editor component.
     *
     * @param {string | string[]} items - A single item or a collection of items to be enabled in the toolbar.
     * @param {boolean} muteToolbarUpdate - Determines whether to mute updates of the toolbar item status in the Rich Text Editor.
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.enableToolbarItem = function (items, muteToolbarUpdate) {
        this.toolbarModule.enableTBarItems(this.getBaseToolbarObject(), items, true, muteToolbarUpdate);
    };
    /**
     * Disables the specified toolbar items in the Rich Text Editor component.
     *
     * @param {string | string[]} items - A single item or a collection of items to be disabled in the toolbar.
     * @param {boolean} muteToolbarUpdate - Determines whether to mute updates of the toolbar item status in the Rich Text Editor.
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.disableToolbarItem = function (items, muteToolbarUpdate) {
        this.toolbarModule.enableTBarItems(this.getBaseToolbarObject(), items, false, muteToolbarUpdate);
    };
    /**
     * Removes the specified toolbar items from the Rich Text Editor component.
     *
     * @param {string | string[]} items - A single item or a collection of items to be removed from the toolbar.
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.removeToolbarItem = function (items) {
        this.toolbarModule.removeTBarItems(items);
    };
    /**
     * Get the selected range from the RichTextEditor's content.
     *
     * @returns {void}
     * @public
     * @deprecated
     */
    RichTextEditor.prototype.getRange = function () {
        return this.formatter.editorManager.nodeSelection.getRange(this.contentModule.getDocument());
    };
    RichTextEditor.prototype.initializeServices = function () {
        this.serviceLocator.register('rendererFactory', new RendererFactory);
        this.serviceLocator.register('rteLocale', this.localeObj = new L10n(this.getModuleName(), defaultLocale, this.locale));
        this.serviceLocator.register('dialogRenderObject', new DialogRenderer(this));
    };
    RichTextEditor.prototype.RTERender = function () {
        var rendererFactory = this.serviceLocator.getService('rendererFactory');
        this.contentModule = rendererFactory.getRenderer(RenderType.Content);
        this.fullScreenModule = new FullScreen(this);
        this.enterKeyModule = new EnterKeyAction(this);
        this.renderModule.render();
        this.inputElement = this.contentModule.getEditPanel();
        this.setHeight(this.height);
        setAttributes(this.htmlAttributes, this, false, true);
        if (this.iframeSettings) {
            this.setIframeSettings();
        }
        this.setCssClass(this.cssClass);
        this.updateEnable();
        this.setPlaceHolder();
        this.updateRTL();
        this.updateReadOnly();
        this.updatePanelValue();
        if (this.enableHtmlEncode && !isNOU(this.value)) {
            this.setProperties({ value: this.encode(decode(this.value)) });
        }
    };
    RichTextEditor.prototype.setIframeSettings = function () {
        if (this.iframeSettings.resources) {
            var styleSrc = this.iframeSettings.resources.styles;
            var scriptSrc = this.iframeSettings.resources.scripts;
            if (!isNOU(this.iframeSettings.resources.scripts) && this.iframeSettings.resources.scripts.length > 0) {
                this.InjectSheet(true, scriptSrc);
            }
            if (!isNOU(this.iframeSettings.resources.styles) && this.iframeSettings.resources.styles.length > 0) {
                this.InjectSheet(false, styleSrc);
            }
        }
        if (this.iframeSettings.attributes) {
            setAttributes(this.iframeSettings.attributes, this, true, false);
        }
    };
    RichTextEditor.prototype.InjectSheet = function (scriptSheet, srcList) {
        try {
            if (srcList && srcList.length > 0) {
                var iFrame = this.contentModule.getDocument();
                var target = iFrame.querySelector('head');
                for (var i = 0; i < srcList.length; i++) {
                    if (scriptSheet) {
                        var scriptEle = this.createScriptElement();
                        scriptEle.src = srcList[i];
                        target.appendChild(scriptEle);
                    }
                    else {
                        var styleEle = this.createStyleElement();
                        styleEle.href = srcList[i];
                        target.appendChild(styleEle);
                    }
                }
            }
        }
        catch (e) {
            return;
        }
    };
    RichTextEditor.prototype.createScriptElement = function () {
        var scriptEle = this.createElement('script', {
            className: classes.CLS_SCRIPT_SHEET
        });
        scriptEle.type = 'text/javascript';
        return scriptEle;
    };
    RichTextEditor.prototype.createStyleElement = function () {
        var styleEle = this.createElement('link', {
            className: classes.CLS_STYLE_SHEET
        });
        styleEle.rel = 'stylesheet';
        return styleEle;
    };
    RichTextEditor.prototype.setValue = function (isPropertyChange) {
        var _this = this;
        if (this.valueTemplate) {
            var regEx = new RegExp(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i);
            if (typeof this.valueTemplate === 'string' && regEx.test(this.valueTemplate)) {
                this.setProperties({ value: this.valueTemplate });
            }
            else {
                var compiledTemplate = compile(this.valueTemplate)('', this, 'valueTemplate');
                if (typeof this.valueTemplate !== 'string' && this.isReact) {
                    this.displayTempElem = this.createElement('div');
                    for (var i = 0; i < compiledTemplate.length; i++) {
                        var item = compiledTemplate[i];
                        append([item], this.displayTempElem);
                    }
                    this.renderTemplates(function () {
                        _this.inputElement.innerHTML = resetContentEditableElements(_this.displayTempElem.childNodes[0].innerHTML, _this.editorMode);
                        _this.setProperties({ value: _this.inputElement.innerHTML.trim() });
                    });
                }
                else {
                    var appendElem = this.element;
                    if (isPropertyChange) {
                        this.inputElement.innerHTML = '';
                        appendElem = this.inputElement;
                    }
                    for (var i = 0; i < compiledTemplate.length; i++) {
                        var item = compiledTemplate[i];
                        append([item], appendElem);
                    }
                    var content = appendElem.innerHTML.trim();
                    if (content.length > 0) {
                        this.setProperties({ value: content });
                    }
                    this.renderReactTemplates();
                }
            }
        }
        else {
            // eslint-disable-next-line
            var innerHtml = !isNOU(this.element.innerHTML) && this.element.innerHTML.replace(/<(\/?|\!?)(!--!--)>/g, '').trim();
            if (innerHtml !== '') {
                if (this.element.tagName === 'TEXTAREA') {
                    this.setProperties({ value: decode(innerHtml) });
                }
                else {
                    this.setProperties({ value: innerHtml });
                }
            }
        }
    };
    // eslint-disable-next-line
    RichTextEditor.prototype.renderTemplates = function (callBack) {
        this.renderReactTemplates(callBack);
    };
    RichTextEditor.prototype.updateResizeFlag = function () {
        this.isResizeInitialized = true;
    };
    /**
     * Image max width calculation method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getInsertImgMaxWidth = function () {
        var maxWidth = this.insertImageSettings.maxWidth;
        // eslint-disable-next-line
        var imgPadding = 12;
        var imgResizeBorder = 2;
        var editEle = this.contentModule.getEditPanel();
        if (this.editorMode === 'HTML' && !isNOU(this.formatter.editorManager.nodeSelection) && !isNOU(this.formatter.editorManager.nodeSelection.range)) {
            var currentRange = this.formatter.editorManager.nodeSelection.range;
            if (currentRange.startContainer.nodeType !== 3 && currentRange.startContainer.closest &&
                !isNOU(currentRange.startContainer.closest('TD'))) {
                editEle = currentRange.startContainer;
            }
        }
        var eleStyle = window.getComputedStyle(editEle);
        var editEleMaxWidth = editEle.offsetWidth - (imgPadding + imgResizeBorder +
            parseFloat(eleStyle.paddingLeft.split('px')[0]) + parseFloat(eleStyle.paddingRight.split('px')[0]) +
            parseFloat(eleStyle.marginLeft.split('px')[0]) + parseFloat(eleStyle.marginRight.split('px')[0]));
        return isNOU(maxWidth) ? editEleMaxWidth : maxWidth;
    };
    /**
     * Video max width calculation method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getInsertVidMaxWidth = function () {
        var maxWidth = this.insertVideoSettings.maxWidth;
        // eslint-disable-next-line
        var vidPadding = 12;
        var vidResizeBorder = 2;
        var editEle = this.contentModule.getEditPanel();
        var eleStyle = window.getComputedStyle(editEle);
        var editEleMaxWidth = editEle.offsetWidth - (vidPadding + vidResizeBorder +
            parseFloat(eleStyle.paddingLeft.split('px')[0]) + parseFloat(eleStyle.paddingRight.split('px')[0]) +
            parseFloat(eleStyle.marginLeft.split('px')[0]) + parseFloat(eleStyle.marginRight.split('px')[0]));
        return isNOU(maxWidth) ? editEleMaxWidth : maxWidth;
    };
    /**
     * Retrieves the HTML content from the Rich Text Editor.
     *
     * @returns {string} - The HTML content as a string. If XHTML is enabled, `null` is returned for empty content.
     * @public
     */
    RichTextEditor.prototype.getHtml = function () {
        var htmlValue = cleanupInternalElements(this.contentModule.getEditPanel().innerHTML, this.editorMode);
        return (this.enableXhtml && (htmlValue === '<p><br></p>' || htmlValue === '<div><br></div>' ||
            htmlValue === '<br>') ? null : this.serializeValue(htmlValue));
    };
    /**
     * Retrieves XHTML validated HTML content from the Rich Text Editor
     * when the `enableXhtml` property is set to true.
     *
     * @returns {string} - The XHTML validated HTML content as a string.
     * @public
     */
    RichTextEditor.prototype.getXhtml = function () {
        var currentValue = cleanupInternalElements(this.value, this.editorMode);
        if (!isNOU(currentValue) && this.enableXhtml) {
            currentValue = this.htmlEditorModule.xhtmlValidation.selfEncloseValidation(currentValue);
        }
        return currentValue;
    };
    /**
     * Toggles the display of the HTML/Markdown source code within the editor.
     *
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.showSourceCode = function () {
        if (this.readonly) {
            return;
        }
        this.notify(events.sourceCode, {});
    };
    /**
     * Calculates the maximum number of characters currently in the Rich Text Editor.
     *
     * @returns {number} - The total number of characters.
     * @public
     */
    RichTextEditor.prototype.getCharCount = function () {
        var htmlText = this.editorMode === 'Markdown' ? this.inputElement.value.trim() :
            this.inputElement.textContent.trim();
        var htmlLength;
        if (this.editorMode !== 'Markdown' && htmlText.indexOf('\u200B') !== -1) {
            htmlLength = htmlText.replace(/\u200B/g, '').length;
        }
        else {
            htmlLength = htmlText.length;
        }
        return htmlLength;
    };
    /**
     * Displays a specified dialog within the Rich Text Editor.
     *
     * @param {DialogType} type - The type of dialog to display.
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.showDialog = function (type) {
        if (type === DialogType.InsertLink) {
            this.notify(events.showLinkDialog, {});
        }
        else if (type === DialogType.InsertImage) {
            this.notify(events.showImageDialog, {});
        }
        else if (type === DialogType.InsertAudio) {
            this.notify(events.showAudioDialog, {});
        }
        else if (type === DialogType.InsertVideo) {
            this.notify(events.showVideoDialog, {});
        }
        else if (type === DialogType.InsertTable) {
            this.notify(events.showTableDialog, {});
        }
    };
    /**
     * Closes a specified dialog within the Rich Text Editor.
     *
     * @param {DialogType} type - The type of dialog to close.
     * @returns {void}
     * @public
     */
    RichTextEditor.prototype.closeDialog = function (type) {
        if (type === DialogType.InsertLink) {
            this.notify(events.closeLinkDialog, {});
        }
        else if (type === DialogType.InsertImage) {
            this.notify(events.closeImageDialog, {});
        }
        else if (type === DialogType.InsertAudio) {
            this.notify(events.closeAudioDialog, {});
        }
        else if (type === DialogType.InsertVideo) {
            this.notify(events.closeVideoDialog, {});
        }
        else if (type === DialogType.InsertTable) {
            this.notify(events.closeTableDialog, {});
        }
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getBaseToolbarObject = function () {
        var tbObj;
        if (this.inlineMode.enable && (!Browser.isDevice || isIDevice())) {
            tbObj = this.quickToolbarModule && this.quickToolbarModule.getInlineBaseToolbar();
        }
        else {
            tbObj = this.toolbarModule && this.toolbarModule.getBaseToolbar();
        }
        return tbObj;
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getToolbar = function () {
        return this.toolbarModule ? this.toolbarModule.getToolbarElement() : null;
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getToolbarElement = function () {
        return this.toolbarModule && this.toolbarModule.getToolbarElement();
    };
    /**
     * @returns {void}
     * getID method
     *
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getID = function () {
        return this.internalID;
    };
    /**
     * Returns the CSS class.
     *
     * @param {boolean} [isSpace] - Specifies whether to include a space before the CSS class.
     * @returns {string} The CSS class.
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.getCssClass = function (isSpace) {
        return (isNOU(this.cssClass) ? '' : isSpace ? ' ' + this.cssClass : this.cssClass);
    };
    RichTextEditor.prototype.mouseDownHandler = function (e) {
        var touch = (e.touches ? e.changedTouches[0] : e);
        addClass([this.element], [classes.CLS_FOCUS]);
        this.preventDefaultResize(e);
        this.notify(events.mouseDown, { args: e });
        this.formatter.editorManager.observer.notify(events.mouseDown, { args: e });
        this.clickPoints = { clientX: touch.clientX, clientY: touch.clientY };
    };
    RichTextEditor.prototype.preventImgResize = function (e) {
        if (e.target.nodeName.toLocaleLowerCase() === 'img') {
            e.preventDefault();
        }
    };
    /**
     * preventDefaultResize method
     *
     * @param {FocusEvent} e - specifies the event.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    // eslint-disable-next-line
    RichTextEditor.prototype.preventDefaultResize = function (e) {
        if (Browser.info.name === 'msie') {
            this.contentModule.getEditPanel().addEventListener('mscontrolselect', this.preventImgResize);
        }
        else if (Browser.info.name === 'mozilla') {
            this.contentModule.getDocument().execCommand('enableObjectResizing', false, 'false');
            this.contentModule.getDocument().execCommand('enableInlineTableEditing', false, 'false');
        }
    };
    // eslint-disable-next-line
    RichTextEditor.prototype.defaultResize = function (e) {
        if (Browser.info.name === 'msie') {
            this.contentModule.getEditPanel().removeEventListener('mscontrolselect', this.preventImgResize);
        }
        else if (Browser.info.name === 'mozilla') {
            this.contentModule.getDocument().execCommand('enableObjectResizing', true, 'true');
            this.contentModule.getDocument().execCommand('enableInlineTableEditing', true, 'true');
        }
    };
    RichTextEditor.prototype.resizeHandler = function () {
        if (!document.body.contains(this.element)) {
            document.defaultView.removeEventListener('resize', this.resizeHandler, true);
            this.onResizeHandler = null;
            return;
        }
        if (this.toolbarSettings.enable && !this.inlineMode.enable) {
            this.toolbarModule.refreshToolbarOverflow();
        }
        this.notify(events.windowResize, null);
        this.autoResize();
    };
    RichTextEditor.prototype.scrollHandler = function (e) {
        if (this.element) {
            this.notify(events.scroll, { args: e });
        }
    };
    RichTextEditor.prototype.contentScrollHandler = function (e) {
        this.notify(events.contentscroll, { args: e });
    };
    RichTextEditor.prototype.focusHandler = function (e) {
        if ((!this.isRTE || this.isFocusOut)) {
            this.isRTE = this.isFocusOut ? false : true;
            this.isFocusOut = false;
            addClass([this.element], [classes.CLS_FOCUS]);
            if (this.editorMode === 'HTML') {
                this.cloneValue = (this.inputElement.innerHTML === '<p><br></p>' || this.inputElement.innerHTML === '<div><br></div>' ||
                    this.inputElement.innerHTML === '<br>') ? null : this.enableHtmlEncode ?
                    this.encode(decode(this.inputElement.innerHTML)) : this.inputElement.innerHTML;
            }
            else {
                this.cloneValue = this.inputElement.value === '' ? null :
                    this.inputElement.value;
            }
            var active = document.activeElement;
            if (active === this.element || active === this.getToolbarElement() || active === this.contentModule.getEditPanel()
                || ((this.iframeSettings.enable && active === this.contentModule.getPanel()) &&
                    e.target && !e.target.classList.contains('e-img-inner')
                    && (e.target && e.target.parentElement
                        && !e.target.parentElement.classList.contains('e-img-wrap')))
                || closest(active, '.e-rte-toolbar') === this.getToolbarElement()) {
                this.contentModule.getEditPanel().focus();
                if (!isNOU(this.getToolbarElement())) {
                    this.getToolbarElement().setAttribute('tabindex', '-1');
                    var items = this.getToolbarElement().querySelectorAll('[tabindex="0"]');
                    for (var i = 0; i < items.length; i++) {
                        items[i].setAttribute('tabindex', '-1');
                    }
                }
            }
            this.preventDefaultResize(e);
            this.trigger('focus', { event: e, isInteracted: Object.keys(e).length === 0 ? false : true });
            if (!isNOU(this.saveInterval) && this.saveInterval > 0 && !this.autoSaveOnIdle && isNOU(this.timeInterval)) {
                this.timeInterval = setInterval(this.updateValueOnIdle.bind(this), this.saveInterval);
            }
            EventHandler.add(document, 'mousedown', this.onDocumentClick, this);
        }
        if (!this.readonly) {
            var currentFocus = this.getCurrentFocus(e);
            if (currentFocus === 'editArea' || currentFocus === 'textArea' || currentFocus === 'sourceCode') {
                this.resetToolbarTabIndex();
            }
        }
    };
    RichTextEditor.prototype.getUpdatedValue = function () {
        var value;
        var getTextArea = this.element.querySelector('.' + classes.CLS_RTE_SOURCE_CODE_TXTAREA);
        if (this.editorMode === 'HTML') {
            value = (this.inputElement.innerHTML === '<p><br></p>' || this.inputElement.innerHTML === '<div><br></div>' ||
                this.inputElement.innerHTML === '<br>') ? null : this.enableHtmlEncode ?
                this.encode(decode(cleanupInternalElements(this.inputElement.innerHTML, this.editorMode))) :
                this.inputElement.innerHTML;
            if (this.enableHtmlSanitizer && !isNOU(value) && /&(amp;)*((times)|(divide)|(ne))/.test(value)) {
                value = value.replace(/&(amp;)*(times|divide|ne)/g, '&amp;amp;$2');
            }
            if (!isNOU(getTextArea) && this.rootContainer.classList.contains('e-source-code-enabled')) {
                value = /&(amp;)*((times)|(divide)|(ne))/.test(getTextArea.value) ? getTextArea.value.replace(/&(amp;)*(times|divide|ne)/g, '&amp;amp;$2') : getTextArea.value;
            }
        }
        else {
            value = this.inputElement.value === '' ? null :
                this.inputElement.value;
        }
        if (value != null && !this.enableHtmlEncode) {
            value = cleanupInternalElements(value, this.editorMode);
        }
        return value;
    };
    RichTextEditor.prototype.updateValueOnIdle = function () {
        if (!isNOU(this.tableModule) && !isNOU(this.inputElement.querySelector('.e-table-box.e-rbox-select'))) {
            return;
        }
        this.setProperties({ value: this.getUpdatedValue() }, true);
        this.valueContainer.value = this.value;
        this.isValueChangeBlurhandler = false;
        this.invokeChangeEvent();
    };
    RichTextEditor.prototype.updateIntervalValue = function () {
        clearTimeout(this.idleInterval);
        this.idleInterval = setTimeout(this.updateValueOnIdle.bind(this), 0);
    };
    RichTextEditor.prototype.cleanupResizeElements = function (args) {
        var value = cleanupInternalElements(args.value, this.editorMode);
        args.callBack(value);
    };
    RichTextEditor.prototype.addAnchorAriaLabel = function (value) {
        var valueElementWrapper = document.createElement('div');
        valueElementWrapper.innerHTML = value;
        var item = valueElementWrapper.querySelectorAll('a');
        if (item.length > 0) {
            for (var i = 0; i < item.length; i++) {
                if (item[i].hasAttribute('target') && item[i].getAttribute('target') === '_blank') {
                    item[i].setAttribute('aria-label', this.serviceLocator.getService('rteLocale').getConstant('linkAriaLabel'));
                }
            }
        }
        return valueElementWrapper.innerHTML;
    };
    RichTextEditor.prototype.updateStatus = function (e) {
        if (!isNOU(e.html) || !isNOU(e.markdown)) {
            var status_1 = this.formatter.editorManager.undoRedoManager.getUndoStatus();
            var eventArgs = {
                undo: status_1.undo,
                redo: status_1.redo,
                html: e.html,
                markdown: e.markdown
            };
            this.trigger(events.updatedToolbarStatus, eventArgs);
        }
    };
    RichTextEditor.prototype.onDocumentClick = function (e) {
        var target = e.target;
        var rteElement = closest(target, '.' + classes.CLS_RTE);
        if (!this.element.contains(e.target) && document !== e.target && rteElement !== this.element &&
            !closest(target, '[aria-owns="' + this.getID() + '"]')) {
            this.isBlur = true;
            this.isRTE = false;
        }
        this.notify(events.docClick, { args: e });
        var hideQuickToolbarChecker = this.quickToolbarModule && !this.inlineMode.enable &&
            isNOU(this.quickToolbarModule.inlineQTBar);
        if ((hideQuickToolbarChecker && !isNOU(closest(target, '.' + 'e-toolbar-wrapper'))) || (hideQuickToolbarChecker && (!isNOU(closest(target, '.e-rte-table-resize')) || !isNOU(closest(target, '.e-table-box'))))) {
            this.quickToolbarModule.hideQuickToolbars();
        }
        if (Browser.info.name !== 'msie' && e.detail > 3) {
            e.preventDefault();
        }
    };
    RichTextEditor.prototype.blurHandler = function (e) {
        var trg = e.relatedTarget;
        if (trg) {
            var rteElement = closest(trg, '.' + classes.CLS_RTE);
            if (!rteElement && this.iframeSettings.enable) {
                var iframeElement = this.element.querySelector('#' + this.getID() + '_rte-view');
                if (iframeElement && iframeElement.contentWindow.document.body.contains(trg)) {
                    rteElement = closest(iframeElement, '.' + classes.CLS_RTE);
                }
            }
            if (rteElement && rteElement === this.element) {
                this.isBlur = false;
                if (trg === this.getToolbarElement()) {
                    trg.setAttribute('tabindex', '-1');
                }
            }
            else if (closest(trg, '[aria-owns="' + this.getID() + '"]') || closest(trg, '.' + classes.CLS_RTE_ELEMENTS)) {
                this.isBlur = false;
            }
            else {
                this.isBlur = true;
                trg = null;
            }
        }
        if (this.isBlur && isNOU(trg)) {
            removeClass([this.element], [classes.CLS_FOCUS]);
            removeSelectionClassStates(this.inputElement);
            this.notify(events.focusChange, {});
            var value = this.getUpdatedValue();
            if (!this.rootContainer.classList.contains('e-source-code-enabled')) {
                this.setProperties({ value: value }, true);
            }
            else {
                this.setProperties({ value: value });
            }
            this.valueContainer.value = this.value;
            this.isValueChangeBlurhandler = true;
            this.invokeChangeEvent();
            this.isFocusOut = true;
            this.isBlur = false;
            dispatchEvent(this.valueContainer, 'focusout');
            this.defaultResize(e);
            this.trigger('blur', { event: e, isInteracted: Object.keys(e).length === 0 ? false : true });
            if (!isNOU(this.timeInterval)) {
                clearInterval(this.timeInterval);
                this.timeInterval = null;
            }
            if (!isNOU(this.placeHolderWrapper) && this.element.querySelector('[title = Preview]')) {
                this.placeHolderWrapper.style.display = 'none';
            }
            EventHandler.remove(document, 'mousedown', this.onDocumentClick);
        }
        else {
            this.isRTE = true;
        }
        if (!this.readonly && this.getCurrentFocus(e) === 'outside') {
            this.resetToolbarTabIndex();
        }
    };
    /**
     * invokeChangeEvent method
     *
     * @returns {void}
     * @param {CustomEvent} args - The arguments associated with the content change event.
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.contentChanged = function (args) {
        var tempSpanToRemove = this.inputElement.querySelector('.tempSpan');
        if (tempSpanToRemove) {
            detach(tempSpanToRemove);
        }
        if (args && !isNOU(args.detail) && args.detail.click) {
            this.formatter.saveData();
        }
        if (this.autoSaveOnIdle) {
            if (!isNOU(this.saveInterval)) {
                clearTimeout(this.autoSaveTimeOut);
                this.autoSaveTimeOut = setTimeout(this.updateIntervalValue.bind(this), this.saveInterval);
            }
        }
    };
    /**
     * invokeChangeEvent method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.invokeChangeEvent = function () {
        var currentValue;
        if (this.enableXhtml) {
            currentValue = this.getXhtml();
        }
        else {
            currentValue = this.value;
        }
        var eventArgs = {
            value: currentValue,
            isInteracted: this.isValueChangeBlurhandler
        };
        if (this.value !== cleanupInternalElements(this.cloneValue, this.editorMode)) {
            this.trigger('change', eventArgs);
            this.cloneValue = this.value;
        }
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.wireScrollElementsEvents = function () {
        this.scrollParentElements = getScrollableParent(this.element);
        for (var _i = 0, _a = this.scrollParentElements; _i < _a.length; _i++) {
            var element = _a[_i];
            EventHandler.add(element, 'scroll', this.scrollHandler, this);
        }
        if (!this.iframeSettings.enable) {
            // Add the scroll event handler from the inputElement
            EventHandler.add(this.inputElement, 'scroll', this.contentScrollHandler, this);
        }
    };
    RichTextEditor.prototype.wireContextEvent = function () {
        if (this.quickToolbarSettings.showOnRightClick) {
            EventHandler.add(this.inputElement, 'contextmenu', this.contextHandler, this);
            if (Browser.isDevice) {
                this.touchModule = new EJ2Touch(this.inputElement, { tapHold: this.touchHandler.bind(this), tapHoldThreshold: 500 });
            }
        }
    };
    RichTextEditor.prototype.unWireContextEvent = function () {
        EventHandler.remove(this.inputElement, 'contextmenu', this.contextHandler);
        if (Browser.isDevice && this.touchModule) {
            this.touchModule.destroy();
        }
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.unWireScrollElementsEvents = function () {
        this.scrollParentElements = getScrollableParent(this.element);
        for (var _i = 0, _a = this.scrollParentElements; _i < _a.length; _i++) {
            var element = _a[_i];
            EventHandler.remove(element, 'scroll', this.scrollHandler);
        }
        if (!this.iframeSettings.enable) {
            // Remove the scroll event handler from the inputElement
            EventHandler.remove(this.inputElement, 'scroll', this.contentScrollHandler);
        }
    };
    RichTextEditor.prototype.touchHandler = function (e) {
        this.notifyMouseUp(e.originalEvent);
        this.triggerEditArea(e.originalEvent);
    };
    RichTextEditor.prototype.contextHandler = function (e) {
        var closestElem = closest(e.target, 'a, table, img, video, audio, .e-embed-video-wrap');
        if (!closestElem && e.target && e.target.classList &&
            (e.target.classList.contains(classes.CLS_AUDIOWRAP) ||
                e.target.classList.contains(classes.CLS_CLICKELEM))) {
            closestElem = e.target.querySelector('audio');
        }
        if (this.inlineMode.onSelection === false || (!isNOU(closestElem) && this.inputElement.contains(closestElem)
            && (closestElem.tagName === 'IMG' || closestElem.tagName === 'TABLE' || closestElem.tagName === 'A' ||
                closestElem.tagName.toLowerCase() === 'video' || closestElem.tagName.toLowerCase() === 'audio' || closestElem.tagName === 'SPAN'))) {
            e.preventDefault();
        }
    };
    RichTextEditor.prototype.resetHandler = function () {
        var defaultValue = this.valueContainer.defaultValue.trim();
        this.setProperties({ value: defaultValue === '' ? null : defaultValue });
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    RichTextEditor.prototype.autoResize = function () {
        if (!this.element || !this.originalElement || !this.valueContainer) {
            return;
        }
        if (this.height === 'auto') {
            if (this.editorMode === 'Markdown') {
                this.setAutoHeight(this.inputElement);
            }
            else if (this.iframeSettings.enable) {
                var iframeElement = this.element.querySelector('#' + this.getID() + '_rte-view');
                if (iframeElement) {
                    this.setAutoHeight(iframeElement);
                }
            }
        }
        else {
            if (this.editorMode === 'Markdown') {
                var textArea = this.inputElement;
                var otherElemHeight = (this.enableResize || this.showCharCount) ? 20 : 0;
                // Three added because of border top of the e-rte-container, bottom of the toolbar wrapper and then bottom of the e-rte-container.
                if (textArea) {
                    textArea.style.height = this.element.clientHeight - (this.toolbarModule.getToolbarHeight() + otherElemHeight + 3) + 'px';
                }
            }
            else if (this.iframeSettings.enable) {
                var iframe = this.element.querySelector('#' + this.getID() + '_rte-view');
                var otherElemHeight = (this.enableResize || this.showCharCount) ? 20 : 0;
                // Three added because of border top of the e-rte-container, bottom of the toolbar wrapper and then bottom of the e-rte-container.
                if (iframe && this.toolbarModule) {
                    iframe.style.height = this.element.clientHeight - (this.toolbarModule.getToolbarHeight() + otherElemHeight + 3) + 'px';
                }
            }
        }
    };
    RichTextEditor.prototype.setAutoHeight = function (element) {
        if (element.nodeName === 'TEXTAREA') {
            element.style.height = 'auto';
            element.style.height = (this.inputElement.scrollHeight + 16) + 'px';
            element.style.overflow = 'hidden';
        }
        else if (element.nodeName === 'IFRAME') {
            element.style.height = this.inputElement.parentElement.offsetHeight + 'px';
        }
    };
    RichTextEditor.prototype.wireEvents = function () {
        this.onBlurHandler = this.blurHandler.bind(this);
        this.onFocusHandler = this.focusHandler.bind(this);
        this.onResizeHandler = this.resizeHandler.bind(this);
        this.element.addEventListener('focusin', this.onFocusHandler, true);
        this.element.addEventListener('focusout', this.onBlurHandler, true);
        this.on(events.contentChanged, this.contentChanged, this);
        this.on(events.resizeInitialized, this.updateResizeFlag, this);
        this.on(events.updateTbItemsStatus, this.updateStatus, this);
        this.on(events.cleanupResizeElements, this.cleanupResizeElements, this);
        this.on(events.updateValueOnIdle, this.updateValueOnIdle, this);
        this.on(events.autoResize, this.autoResize, this);
        if (this.iframeSettings.enable) {
            this.onLoadHandler = this.iframeEditableElemLoad.bind(this);
            this.contentModule.getEditPanel().addEventListener('load', this.onLoadHandler, true);
        }
        if (this.readonly && this.enabled) {
            return;
        }
        this.bindEvents();
    };
    RichTextEditor.prototype.restrict = function (e) {
        if (this.maxLength >= 0) {
            var element = this.editorMode === 'Markdown' ? this.contentModule.getText() :
                (this.getText().replace(/(\r\n|\n|\r|\t)/gm, '').replace(/\u200B/g, ''));
            if (!element) {
                return;
            }
            var array = [8, 16, 17, 37, 38, 39, 40, 46, 65];
            var arrayKey = void 0;
            for (var i = 0; i <= array.length - 1; i++) {
                if (e.which === array[i]) {
                    if (e.ctrlKey && e.which === 65) {
                        return;
                    }
                    else if (e.which !== 65) {
                        arrayKey = array[i];
                        return;
                    }
                }
            }
            if ((element.length >= this.maxLength && this.maxLength !== -1) && e.which !== arrayKey) {
                e.preventDefault();
            }
        }
    };
    RichTextEditor.prototype.beforeInputHandler = function (e) {
        if (this.maxLength >= 0) {
            var element = this.editorMode === 'Markdown' ? this.contentModule.getText() :
                (this.getText().replace(/(\r\n|\n|\r|\t)/gm, '').replace(/\u200B/g, ''));
            if (e.data && element.length >= this.maxLength && !this.isSpecialInputType(e)) {
                e.preventDefault();
            }
        }
    };
    RichTextEditor.prototype.isSpecialInputType = function (e) {
        var allowedKeys = [8, 16, 17, 37, 38, 39, 40, 46, 65];
        if (e.inputType) {
            return (e.inputType.indexOf('delete') !== -1 ||
                e.inputType.indexOf('backward') !== -1 ||
                e.inputType === 'insertLineBreak');
        }
        return allowedKeys.indexOf(e.which) !== -1;
    };
    RichTextEditor.prototype.bindEvents = function () {
        this.keyboardModule = new KeyboardEvents(this.inputElement, {
            keyAction: this.keyDown.bind(this), keyConfigs: __assign({}, this.formatter.keyConfig, this.keyConfig), eventName: 'keydown'
        });
        if (this.userAgentData && this.userAgentData.getPlatform() === 'Android') {
            EventHandler.add(this.inputElement, 'beforeinput', this.beforeInputHandler, this);
        }
        var formElement = closest(this.valueContainer, 'form');
        if (formElement) {
            EventHandler.add(formElement, 'reset', this.resetHandler, this);
        }
        EventHandler.add(this.inputElement, 'keyup', this.keyUp, this);
        EventHandler.add(this.inputElement, 'paste', this.onPaste, this);
        EventHandler.add(this.inputElement, 'content-changed', this.contentChanged, this);
        this.mouseDownDebListener = debounce(this.mouseUp, 30);
        EventHandler.add(this.inputElement, Browser.touchEndEvent, this.mouseDownDebListener, this);
        EventHandler.add(this.inputElement, Browser.touchStartEvent, this.mouseDownHandler, this);
        EventHandler.add(this.inputElement, 'input', this.inputHandler, this);
        this.wireContextEvent();
        this.formatter.editorManager.observer.on(CONSTANT.KEY_DOWN_HANDLER, this.editorKeyDown, this);
        this.element.ownerDocument.defaultView.addEventListener('resize', this.onResizeHandler, true);
        if (this.iframeSettings.enable) {
            EventHandler.add(this.inputElement, 'focusin', this.focusHandler, this);
            EventHandler.add(this.inputElement, 'focusout', this.blurHandler, this);
            EventHandler.add(this.inputElement.ownerDocument, 'scroll', this.contentScrollHandler, this);
            EventHandler.add(this.inputElement.ownerDocument, Browser.touchStartEvent, this.onIframeMouseDown, this);
            EventHandler.add(this.contentModule.getPanel(), 'load', this.iframeLoadHandler, this);
        }
        this.wireScrollElementsEvents();
    };
    RichTextEditor.prototype.onIframeMouseDown = function (e) {
        this.isBlur = false;
        this.currentTarget = e.target;
        this.notify(events.iframeMouseDown, e);
    };
    RichTextEditor.prototype.inputHandler = function () {
        this.autoResize();
    };
    RichTextEditor.prototype.editorKeyDown = function (e) {
        switch (e.event.action) {
            case 'copy':
                this.onCopy();
                break;
            case 'cut':
                this.onCut();
                break;
            case 'tab':
                if (this.iframeSettings.enable) {
                    this.isBlur = true;
                }
                break;
        }
        if (e.callBack && (e.event.action === 'copy' || e.event.action === 'cut' || e.event.action === 'delete')) {
            e.callBack({
                requestType: e.event.action,
                editorMode: 'HTML',
                event: e.event
            });
        }
    };
    RichTextEditor.prototype.unWireEvents = function () {
        this.element.removeEventListener('focusin', this.onFocusHandler, true);
        this.onFocusHandler = null;
        this.element.removeEventListener('focusout', this.onBlurHandler, true);
        this.onBlurHandler = null;
        this.off(events.contentChanged, this.contentChanged);
        this.off(events.resizeInitialized, this.updateResizeFlag);
        this.off(events.updateTbItemsStatus, this.updateStatus);
        this.off(events.cleanupResizeElements, this.cleanupResizeElements);
        this.off(events.updateValueOnIdle, this.updateValueOnIdle);
        this.off(events.autoResize, this.autoResize);
        if (this.iframeSettings.enable) {
            this.contentModule.getEditPanel().removeEventListener('load', this.onLoadHandler, true);
            this.onLoadHandler = null;
        }
        if (this.readonly && this.enabled) {
            return;
        }
        this.unbindEvents();
    };
    RichTextEditor.prototype.unbindEvents = function () {
        if (this.keyboardModule && !this.keyboardModule.isDestroyed) {
            this.keyboardModule.destroy();
            this.keyboardModule = null;
        }
        var formElement = closest(this.valueContainer, 'form');
        if (formElement) {
            EventHandler.remove(formElement, 'reset', this.resetHandler);
        }
        EventHandler.remove(this.inputElement, 'keyup', this.keyUp);
        EventHandler.remove(this.inputElement, 'paste', this.onPaste);
        EventHandler.remove(this.inputElement, 'content-changed', this.contentChanged);
        EventHandler.remove(this.inputElement, Browser.touchEndEvent, this.mouseDownDebListener);
        this.mouseDownDebListener = null;
        EventHandler.remove(this.inputElement, Browser.touchStartEvent, this.mouseDownHandler);
        EventHandler.remove(this.inputElement, 'input', this.inputHandler);
        EventHandler.remove(document, 'mousedown', this.onDocumentClick);
        this.unWireContextEvent();
        if (this.formatter) {
            this.formatter.editorManager.observer.off(CONSTANT.KEY_DOWN_HANDLER, this.editorKeyDown);
        }
        this.element.ownerDocument.defaultView.removeEventListener('resize', this.onResizeHandler, true);
        this.onResizeHandler = null;
        if (this.iframeSettings.enable) {
            EventHandler.remove(this.inputElement, 'focusin', this.focusHandler);
            EventHandler.remove(this.inputElement, 'focusout', this.blurHandler);
            EventHandler.remove(this.inputElement.ownerDocument, 'scroll', this.contentScrollHandler);
            EventHandler.remove(this.inputElement.ownerDocument, Browser.touchStartEvent, this.onIframeMouseDown);
            EventHandler.remove(this.contentModule.getPanel(), 'load', this.iframeLoadHandler);
        }
        if (this.userAgentData && this.userAgentData.getPlatform() === 'Android') {
            EventHandler.remove(this.inputElement, 'beforeinput', this.beforeInputHandler);
        }
        this.unWireScrollElementsEvents();
    };
    /**
     *
     * @param {FocusEvent} e - The focus event.
     * @returns {string} Returns the current focus either `editArea` or `toolbar` or `textArea` or `sourceCode` or `outside` of the RichTextEditor.
     * @hidden
     */
    RichTextEditor.prototype.getCurrentFocus = function (e) {
        if (e.target === this.inputElement && document.activeElement === this.inputElement) {
            return 'editArea';
        }
        else if (e.target === this.getToolbarElement() || (!isNOU(e.relatedTarget) && closest(e.relatedTarget, '.e-rte-toolbar') === this.getToolbarElement())) {
            return 'toolbar';
        }
        else if (e.target === this.valueContainer && document.activeElement === this.valueContainer) {
            return 'textArea';
        }
        else if (!isNOU(e.target) && e.target.classList.contains(classes.CLS_RTE_SOURCE_CODE_TXTAREA)
            && document.activeElement === e.target) {
            return 'sourceCode';
        }
        return 'outside';
    };
    /**
     * @returns {void}
     * @hidden
     */
    RichTextEditor.prototype.resetToolbarTabIndex = function () {
        if (this.getToolbarElement()) {
            var toolbarItem = this.getToolbarElement().querySelectorAll('input,select,button,a,[tabindex]');
            for (var i = 0; i < toolbarItem.length; i++) {
                if ((!toolbarItem[i].classList.contains('e-rte-dropdown-btn') &&
                    !toolbarItem[i].classList.contains('e-insert-table-btn')) &&
                    (!toolbarItem[i].hasAttribute('tabindex') ||
                        toolbarItem[i].getAttribute('tabindex') !== '-1')) {
                    toolbarItem[i].setAttribute('tabindex', '-1');
                }
            }
        }
    };
    RichTextEditor.prototype.getRenderedQuickToolbarElem = function () {
        if (!isNOU(this.quickToolbarModule)) {
            var quickToolbars = this.quickToolbarModule.getQuickToolbarInstance();
            for (var i = 0; i < quickToolbars.length; i++) {
                if (quickToolbars[i] && quickToolbars[i].isRendered) {
                    return quickToolbars[i].element;
                }
            }
        }
        return null;
    };
    RichTextEditor.prototype.iframeLoadHandler = function () {
        this.autoResize();
    };
    RichTextEditor.prototype.iframeEditableElemLoad = function () {
        this.autoResize();
    };
    __decorate([
        Complex({}, ToolbarSettings)
    ], RichTextEditor.prototype, "toolbarSettings", void 0);
    __decorate([
        Complex({ enable: false, items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList', 'CodeBlock', 'Blockquote'], popupWidth: '300px', popupHeight: '320px' }, SlashMenuSettings)
    ], RichTextEditor.prototype, "slashMenuSettings", void 0);
    __decorate([
        Complex({}, QuickToolbarSettings)
    ], RichTextEditor.prototype, "quickToolbarSettings", void 0);
    __decorate([
        Complex({}, PasteCleanupSettings)
    ], RichTextEditor.prototype, "pasteCleanupSettings", void 0);
    __decorate([
        Complex({}, FormatPainterSettings)
    ], RichTextEditor.prototype, "formatPainterSettings", void 0);
    __decorate([
        Complex({}, EmojiSettings)
    ], RichTextEditor.prototype, "emojiPickerSettings", void 0);
    __decorate([
        Complex({}, IFrameSettings)
    ], RichTextEditor.prototype, "iframeSettings", void 0);
    __decorate([
        Complex({}, ImageSettings)
    ], RichTextEditor.prototype, "insertImageSettings", void 0);
    __decorate([
        Complex({}, ImportWord)
    ], RichTextEditor.prototype, "importWord", void 0);
    __decorate([
        Complex({}, ExportWord)
    ], RichTextEditor.prototype, "exportWord", void 0);
    __decorate([
        Complex({}, ExportPdf)
    ], RichTextEditor.prototype, "exportPdf", void 0);
    __decorate([
        Complex({}, AudioSettings)
    ], RichTextEditor.prototype, "insertAudioSettings", void 0);
    __decorate([
        Complex({}, VideoSettings)
    ], RichTextEditor.prototype, "insertVideoSettings", void 0);
    __decorate([
        Complex({}, TableSettings)
    ], RichTextEditor.prototype, "tableSettings", void 0);
    __decorate([
        Property(0)
    ], RichTextEditor.prototype, "floatingToolbarOffset", void 0);
    __decorate([
        Complex({}, InlineMode)
    ], RichTextEditor.prototype, "inlineMode", void 0);
    __decorate([
        Complex({}, FileManagerSettings)
    ], RichTextEditor.prototype, "fileManagerSettings", void 0);
    __decorate([
        Property('100%')
    ], RichTextEditor.prototype, "width", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "enablePersistence", void 0);
    __decorate([
        Property(true)
    ], RichTextEditor.prototype, "showTooltip", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "enableResize", void 0);
    __decorate([
        Property({})
    ], RichTextEditor.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(null)
    ], RichTextEditor.prototype, "placeholder", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "autoSaveOnIdle", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "readonly", void 0);
    __decorate([
        Property(true)
    ], RichTextEditor.prototype, "enabled", void 0);
    __decorate([
        Property(true)
    ], RichTextEditor.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "enableHtmlEncode", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "enableXhtml", void 0);
    __decorate([
        Property('auto')
    ], RichTextEditor.prototype, "height", void 0);
    __decorate([
        Property(null)
    ], RichTextEditor.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], RichTextEditor.prototype, "value", void 0);
    __decorate([
        Property('P')
    ], RichTextEditor.prototype, "enterKey", void 0);
    __decorate([
        Property('BR')
    ], RichTextEditor.prototype, "shiftEnterKey", void 0);
    __decorate([
        Property(30)
    ], RichTextEditor.prototype, "undoRedoSteps", void 0);
    __decorate([
        Property(300)
    ], RichTextEditor.prototype, "undoRedoTimer", void 0);
    __decorate([
        Property('HTML')
    ], RichTextEditor.prototype, "editorMode", void 0);
    __decorate([
        Property(null)
    ], RichTextEditor.prototype, "keyConfig", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "showCharCount", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "enableTabKey", void 0);
    __decorate([
        Property(false)
    ], RichTextEditor.prototype, "enableAutoUrl", void 0);
    __decorate([
        Property(-1)
    ], RichTextEditor.prototype, "maxLength", void 0);
    __decorate([
        Complex({}, Format)
    ], RichTextEditor.prototype, "format", void 0);
    __decorate([
        Complex({}, NumberFormatList)
    ], RichTextEditor.prototype, "numberFormatList", void 0);
    __decorate([
        Complex({}, BulletFormatList)
    ], RichTextEditor.prototype, "bulletFormatList", void 0);
    __decorate([
        Complex({}, FontFamily)
    ], RichTextEditor.prototype, "fontFamily", void 0);
    __decorate([
        Complex({}, FontSize)
    ], RichTextEditor.prototype, "fontSize", void 0);
    __decorate([
        Complex({}, FontColor)
    ], RichTextEditor.prototype, "fontColor", void 0);
    __decorate([
        Complex({}, BackgroundColor)
    ], RichTextEditor.prototype, "backgroundColor", void 0);
    __decorate([
        Property(null)
    ], RichTextEditor.prototype, "valueTemplate", void 0);
    __decorate([
        Property(10000)
    ], RichTextEditor.prototype, "saveInterval", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "actionBegin", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "actionComplete", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforeDialogOpen", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "dialogOpen", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforeDialogClose", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "dialogClose", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforeQuickToolbarOpen", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "quickToolbarOpen", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "quickToolbarClose", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "toolbarStatusUpdate", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "updatedToolbarStatus", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "imageSelected", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforeImageUpload", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "imageUploading", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "imageUploadSuccess", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "imageUploadFailed", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "imageRemoving", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "afterImageDelete", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "fileSelected", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforeFileUpload", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "fileUploading", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "fileUploadSuccess", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "fileUploadFailed", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "fileRemoving", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "afterMediaDelete", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "created", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforeSanitizeHtml", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "blur", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "toolbarClick", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "focus", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "change", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforePasteCleanup", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "afterPasteCleanup", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "beforeImageDrop", void 0);
    __decorate([
        Property(null)
    ], RichTextEditor.prototype, "formatter", void 0);
    __decorate([
        Event()
    ], RichTextEditor.prototype, "slashMenuItemSelect", void 0);
    RichTextEditor = __decorate([
        NotifyPropertyChanges
    ], RichTextEditor);
    return RichTextEditor;
}(Component));
export { RichTextEditor };
