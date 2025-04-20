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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../interactive-chat-base/interactive-chat-base-model.d.ts'/>
import { EventHandler, Property, NotifyPropertyChanges, Collection, Event, remove, L10n } from '@syncfusion/ej2-base';
import { ChildProperty, getUniqueID, isNullOrUndefined as isNOU, Complex, removeClass, addClass } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { InterActiveChatBase, ToolbarSettings, ToolbarItem } from '../interactive-chat-base/interactive-chat-base';
var ASSISTHEADER = 'e-aiassist-header-text e-assist-view-header';
/* eslint-enable @typescript-eslint/no-misused-new, no-redeclare */
/**
 * The prompts property maps the list of the prompts and binds the data to the suggestions.
 */
var Prompt = /** @class */ (function (_super) {
    __extends(Prompt, _super);
    function Prompt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], Prompt.prototype, "prompt", void 0);
    __decorate([
        Property('')
    ], Prompt.prototype, "response", void 0);
    __decorate([
        Property(null)
    ], Prompt.prototype, "isResponseHelpful", void 0);
    return Prompt;
}(ChildProperty));
export { Prompt };
/**
 * Specifies the type of assist view.
 */
export var AssistViewType;
(function (AssistViewType) {
    /**
     * Represents the default assist view type.
     */
    AssistViewType["Assist"] = "Assist";
    /**
     * Represents a custom assist view type.
     */
    AssistViewType["Custom"] = "Custom";
})(AssistViewType || (AssistViewType = {}));
/**
 * The assistView property maps the customized AiAssistView.
 */
var AssistView = /** @class */ (function (_super) {
    __extends(AssistView, _super);
    function AssistView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Assist')
    ], AssistView.prototype, "type", void 0);
    __decorate([
        Property('')
    ], AssistView.prototype, "name", void 0);
    __decorate([
        Property()
    ], AssistView.prototype, "iconCss", void 0);
    __decorate([
        Property()
    ], AssistView.prototype, "viewTemplate", void 0);
    return AssistView;
}(ChildProperty));
export { AssistView };
/**
 * The promptToolbarSettings property maps the list of the promptToolbarSettings and binds the data to the prompt.
 */
var PromptToolbarSettings = /** @class */ (function (_super) {
    __extends(PromptToolbarSettings, _super);
    function PromptToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('100%')
    ], PromptToolbarSettings.prototype, "width", void 0);
    __decorate([
        Collection([], ToolbarItem)
    ], PromptToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], PromptToolbarSettings.prototype, "itemClicked", void 0);
    return PromptToolbarSettings;
}(ChildProperty));
export { PromptToolbarSettings };
/**
 * The responseToolbarSettings property maps the list of the responseToolbarSettings and binds the data to the output items.
 */
var ResponseToolbarSettings = /** @class */ (function (_super) {
    __extends(ResponseToolbarSettings, _super);
    function ResponseToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('100%')
    ], ResponseToolbarSettings.prototype, "width", void 0);
    __decorate([
        Collection([], ToolbarItem)
    ], ResponseToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], ResponseToolbarSettings.prototype, "itemClicked", void 0);
    return ResponseToolbarSettings;
}(ChildProperty));
export { ResponseToolbarSettings };
/**
 * The `AIAssistView` component is designed to enhance user interaction by integrating AI driven assistance features.
 * It provides a seamless interface for incorporating suggestions & AI responses.
 *
 * ```html
 *  <div id='defaultAIAssistView'></div>
 * ```
 * ```typescript
 *  let aiAssistObj: AIAssistView = new AIAssistView();
 *  aiAssistObj.appendTo('#defaultAIAssistView');
 * ```
 */
var AIAssistView = /** @class */ (function (_super) {
    __extends(AIAssistView, _super);
    /**
     * Constructor for creating the component
     *
     * @param {AIAssistViewModel} options - Specifies the AIAssistViewModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function AIAssistView(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.toolbarItems = [];
        _this.displayContents = [];
        _this.preTagElements = [];
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    AIAssistView.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    AIAssistView.prototype.getDirective = function () {
        return 'EJS-AIASSISTVIEW';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    AIAssistView.prototype.getModuleName = function () {
        return 'aiassistview';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    AIAssistView.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    AIAssistView.prototype.render = function () {
        this.renderPromptView();
    };
    AIAssistView.prototype.renderPromptView = function () {
        this.setDimension(this.element, this.width, this.height);
        this.renderViews();
        this.renderToolbar();
        this.updateTextAreaObject();
        this.wireEvents();
    };
    AIAssistView.prototype.renderToolbar = function () {
        this.updateHeaderToolbar();
        if (this.assistViewTemplateIndex < 0) {
            this.displayContents.unshift(this.contentWrapper);
        }
        else {
            this.displayContents.unshift(this.assistCustomSection);
        }
        this.previousElement = this.displayContents[this.activeView];
        this.renderHeaderToolbar();
        this.viewWrapper = this.element.querySelector('.e-view-content');
        this.updateActiveView();
        this.addCssClass(this.element, this.cssClass);
        this.updateHeader(this.showHeader, this.toolbarHeader, this.viewWrapper);
        this.aiAssistViewRendered = true;
        this.addRtlClass(this.element, this.enableRtl);
    };
    AIAssistView.prototype.renderViews = function () {
        this.assistViewTemplateIndex = -1;
        this.aiAssistViewRendered = false;
        this.isAssistView = false;
        this.isOutputRenderingStop = false;
        this.isResponseRequested = false;
        this.renderViewSections(this.element, 'e-view-header', 'e-view-content');
        var isAssistViewAssigned = false;
        var assistView;
        var customViewTemplate;
        var customViewCount = 1;
        if (this.views.length > 0) {
            for (var index = 0; index < this.views.length; index++) {
                if (this.views[parseInt(index.toString(), 10)].type.toLocaleLowerCase() === 'assist' && !isAssistViewAssigned) {
                    assistView = {
                        text: this.views[parseInt(index.toString(), 10)].name || 'AI Assist',
                        prefixIcon: this.views[parseInt(index.toString(), 10)].iconCss || 'e-icons e-assistview-icon',
                        cssClass: ASSISTHEADER,
                        htmlAttributes: { 'data-index': this.element.id + '_view_0' }
                    };
                    this.toolbarItems.unshift(assistView);
                    if (this.views[parseInt(index.toString(), 10)].viewTemplate) {
                        this.assistViewTemplateIndex = index;
                    }
                    isAssistViewAssigned = true;
                    this.isAssistView = true;
                }
                else if (this.views[parseInt(index.toString(), 10)].type.toLocaleLowerCase() === 'custom') {
                    customViewTemplate = this.createElement('div', { className: 'e-customview-content-section-' + customViewCount + ' e-custom-view' });
                    this.getContextObject('customViewTemplate', customViewTemplate, -1, index);
                    this.displayContents.push(customViewTemplate);
                    this.toolbarItems.push({
                        text: this.views[parseInt(index.toString(), 10)].name || '',
                        prefixIcon: this.views[parseInt(index.toString(), 10)].iconCss || '',
                        cssClass: 'e-aiassist-header-text e-custom-view-header',
                        htmlAttributes: { 'data-index': this.element.id + '_view_' + customViewCount.toString() }
                    });
                    customViewCount++;
                }
            }
        }
        if (this.views.length === 0 || !isAssistViewAssigned) {
            assistView = {
                text: 'AI Assist',
                prefixIcon: 'e-icons e-assistview-icon',
                cssClass: ASSISTHEADER,
                htmlAttributes: { 'data-index': this.element.id + '_view_0' }
            };
            this.toolbarItems.unshift(assistView);
            isAssistViewAssigned = true;
        }
        if (this.assistViewTemplateIndex >= 0 && this.views[this.assistViewTemplateIndex].viewTemplate) {
            this.assistCustomSection = this.createElement('div', { attrs: { class: 'e-assistview-content-section', 'data-index': this.element.id + '_view_0' } });
            this.getContextObject('assistViewTemplate', this.assistCustomSection, -1, this.assistViewTemplateIndex);
        }
        else {
            this.renderDefaultView();
        }
    };
    AIAssistView.prototype.renderHeaderToolbar = function () {
        var _this = this;
        this.toolbar = new Toolbar({
            items: this.toolbarItems,
            height: '100%',
            enableRtl: this.enableRtl,
            clicked: function (args) {
                var eventItemArgs = {
                    type: args.item.type,
                    text: args.item.text,
                    iconCss: args.item.prefixIcon,
                    cssClass: args.item.cssClass,
                    tooltip: args.item.tooltipText,
                    template: args.item.template,
                    disabled: args.item.disabled,
                    visible: args.item.visible,
                    align: args.item.align,
                    tabIndex: args.item.tabIndex
                };
                var eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false
                };
                if (_this.toolbarSettings.itemClicked) {
                    _this.toolbarSettings.itemClicked.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.htmlAttributes) {
                        var currentIndex = parseInt(args.item.htmlAttributes['data-index'].split(_this.element.id + '_view_')[1], 10);
                        if (currentIndex !== _this.activeView) {
                            var prevOnChange = _this.isProtectedOnChange;
                            _this.isProtectedOnChange = true;
                            var previousIndex = _this.getIndex(_this.activeView);
                            _this.activeView = parseInt(args.item.htmlAttributes['data-index'].split(_this.element.id + '_view_')[1], 10);
                            _this.updateActiveView(previousIndex);
                            _this.isProtectedOnChange = prevOnChange;
                        }
                    }
                }
            }
        });
        this.toolbarHeader = this.element.querySelector('.e-view-header');
        var toolbarEle = this.createElement('div');
        this.toolbar.appendTo(toolbarEle);
        this.toolbar.element.setAttribute('aria-label', 'assist-view-toolbar-header');
        this.toolbarHeader.appendChild(toolbarEle);
    };
    AIAssistView.prototype.updateHeaderToolbar = function () {
        if (this.toolbarSettings.items.length > 0) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var pushToolbar = this.toolbarSettings.items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align
            }); });
            this.toolbarItems = this.toolbarItems.concat(pushToolbar);
        }
    };
    AIAssistView.prototype.getIndex = function (currentIndex) {
        return (((currentIndex) > (this.views.length - (this.isAssistView ? 1 : 0))) || (currentIndex < 0)) ?
            0 : currentIndex;
    };
    AIAssistView.prototype.updateActiveView = function (previousIndex) {
        var activeViewIndex = this.getIndex(this.activeView);
        if (!this.aiAssistViewRendered) {
            this.appendView(activeViewIndex);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)]) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)].classList.add('e-active');
            }
        }
        else if (previousIndex !== activeViewIndex) {
            this.removePreviousView(previousIndex, activeViewIndex);
            this.appendView(activeViewIndex);
        }
        this.previousElement = this.displayContents[parseInt(activeViewIndex.toString(), 10)];
    };
    AIAssistView.prototype.appendView = function (activeViewIndex) {
        //updating the new view section according to the activeView property
        if (activeViewIndex === 0 && this.assistViewTemplateIndex < 0) {
            this.viewWrapper.append(this.contentWrapper, this.stopResponding, this.footer);
        }
        else if (activeViewIndex === 0 && this.assistViewTemplateIndex >= 0) {
            this.viewWrapper.append(this.assistCustomSection);
        }
        else {
            this.viewWrapper.append(this.displayContents[parseInt(activeViewIndex.toString(), 10)]);
        }
    };
    AIAssistView.prototype.removePreviousView = function (previousIndex, activeViewIndex) {
        // removing the previously binded element
        this.viewWrapper.removeChild(this.previousElement);
        if (previousIndex === 0 && this.assistViewTemplateIndex < 0) {
            this.viewWrapper.removeChild(this.stopResponding);
            this.viewWrapper.removeChild(this.footer);
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.toolbar.tbarEle[parseInt(activeViewIndex.toString(), 10)].classList.add('e-active');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (previousIndex >= 0 && this.toolbar.tbarEle[parseInt(previousIndex.toString(), 10)]) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.toolbar.tbarEle[parseInt(previousIndex.toString(), 10)].classList.remove('e-active');
        }
    };
    AIAssistView.prototype.renderDefaultView = function () {
        var viewWrapper = this.element.querySelector('.e-view-content');
        this.createViewComponents(viewWrapper);
        this.contentWrapper = this.element.querySelector('.e-views');
        this.contentWrapper.setAttribute('data-index', this.element.id + '_view_0');
        var contentContainer = this.element.querySelector('.e-view-container');
        this.content = this.getElement('contentContainer');
        this.footer = this.getElement('footer');
        var footerClass = "e-footer " + (this.footerTemplate ? 'e-footer-template' : '');
        this.footer.className = footerClass;
        this.renderContent();
        this.renderAssistViewFooter();
        this.renderBannerView(this.bannerTemplate, contentContainer, 'bannerTemplate');
        contentContainer.append(this.content);
        this.renderStopResponding();
    };
    AIAssistView.prototype.renderStopResponding = function () {
        this.stopResponding = this.createElement('div', { attrs: { class: 'e-stop-response', tabIndex: '0', 'aria-label': 'Stop Responding', role: 'button' } });
        var stopRespondingIcon = this.createElement('span', { className: 'e-icons e-assist-stop' });
        this.stopRespondingContent = this.createElement('span', { className: 'e-stop-response-text' });
        this.l10n = new L10n('aiassistview', { stopResponseText: 'Stop Responding' }, this.locale);
        this.updateStopRespondingTitle();
        this.appendChildren(this.stopResponding, stopRespondingIcon, this.stopRespondingContent);
    };
    AIAssistView.prototype.updateStopRespondingTitle = function () {
        this.l10n.setLocale(this.locale);
        this.stopRespondingContent.textContent = this.l10n.getConstant('stopResponseText');
    };
    AIAssistView.prototype.renderContent = function () {
        this.renderSuggestions(this.promptSuggestions, this.promptSuggestionsHeader, this.promptSuggestionItemTemplate, 'promptSuggestion', 'promptSuggestionItemTemplate', this.onSuggestionClick);
        this.renderOutputContent();
        if (this.outputElement) {
            this.renderSkeleton();
        }
    };
    AIAssistView.prototype.renderOutputContent = function (isMethodCall) {
        var _this = this;
        this.outputElement = this.getElement('outputElement');
        if (this.responseToolbarSettings.items.length === 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.responseToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy', cssClass: 'check' },
                { iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
                { iconCss: 'e-icons e-assist-dislike', tooltip: 'Dislike' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        if (this.prompts) {
            this.prompts.forEach(function (prompt, i) {
                _this.renderOutputContainer(prompt.prompt, prompt.response, i);
            });
        }
        if (this.suggestionsElement && this.content.contains(this.suggestionsElement)) {
            this.content.insertBefore(this.outputElement, this.suggestionsElement);
        }
        else {
            this.content.appendChild(this.outputElement);
        }
        if (isMethodCall) {
            this.aiAssistViewRendered = true;
        }
    };
    AIAssistView.prototype.renderAssistViewFooter = function () {
        this.textareaObj = this.renderFooterContent(this.footerTemplate, this.footer, this.prompt, this.promptPlaceholder, this.showClearButton, this.getRowCount(''), 'e-assist-textarea');
        var sendIconClass = 'e-assist-send e-icons disabled';
        if (!this.footerTemplate) {
            this.sendIcon = this.renderSendIcon(sendIconClass, this.footer);
        }
        if (this.textareaObj) {
            this.textareaObj.input = this.handleInput.bind(this);
            this.activateSendIcon(this.textareaObj.value.length);
        }
    };
    AIAssistView.prototype.handleInput = function (args) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = args.value;
        this.isProtectedOnChange = prevOnChange;
        this.activateSendIcon(args.value.length);
        this.updateTextAreaObject();
        var eventArgs = {
            value: args.value,
            previousValue: args.previousValue,
            event: args.event,
            element: this.textareaObj.element
        };
        this.trigger('promptChanged', eventArgs);
    };
    AIAssistView.prototype.updateTextAreaObject = function () {
        if (isNOU(this.textareaObj)) {
            return;
        }
        var textarea = this.textareaObj.element;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };
    AIAssistView.prototype.getRowCount = function (textValue) {
        var lines = textValue.split('\n').length;
        return (lines < 10 ? (lines >= 1 ? lines : 1) : 10);
    };
    AIAssistView.prototype.activateSendIcon = function (value) {
        this.sendIcon.classList.toggle('disabled', value === 0);
        this.sendIcon.classList.toggle('enabled', value > 0);
    };
    AIAssistView.prototype.footerKeyHandler = function (e) {
        this.keyHandler(e, 'footer');
    };
    AIAssistView.prototype.stopResponseKeyHandler = function (e) {
        this.keyHandler(e, 'stopresponse');
    };
    AIAssistView.prototype.wireEvents = function () {
        this.wireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        if (this.stopResponding) {
            EventHandler.add(this.stopResponding, 'click', this.respondingStopper, this);
            EventHandler.add(this.stopResponding, 'keydown', this.stopResponseKeyHandler, this);
        }
        EventHandler.add(window, 'resize', this.updateTextAreaObject, this);
    };
    AIAssistView.prototype.unWireEvents = function () {
        this.unWireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        if (this.stopResponding) {
            EventHandler.remove(this.stopResponding, 'click', this.respondingStopper);
            EventHandler.remove(this.stopResponding, 'keydown', this.stopResponseKeyHandler);
        }
        EventHandler.remove(window, 'resize', this.updateTextAreaObject);
        this.detachCodeCopyEventHandler();
    };
    AIAssistView.prototype.detachCodeCopyEventHandler = function () {
        this.preTagElements.forEach(function (_a) {
            var preTag = _a.preTag, handler = _a.handler;
            var copyIcon = preTag.querySelector('.e-code-copy');
            EventHandler.remove(copyIcon, 'click', handler);
        });
        this.preTagElements = [];
    };
    AIAssistView.prototype.keyHandler = function (event, value) {
        if (event.key === 'Enter' && !event.shiftKey) {
            switch (value) {
                case 'footer':
                    event.preventDefault();
                    if (!this.isResponseRequested) {
                        this.onSendIconClick();
                    }
                    break;
                case 'stopresponse':
                    this.respondingStopper(event);
                    break;
            }
        }
    };
    AIAssistView.prototype.respondingStopper = function (event) {
        this.isOutputRenderingStop = true;
        this.isResponseRequested = false;
        this.lastStreamPrompt = '';
        if (this.outputElement.hasChildNodes) {
            var skeletonElement = this.element.querySelector('.e-loading-body');
            if (skeletonElement) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
        }
        this.stopResponding.classList.remove('e-btn-active');
        var promptIndex = this.prompts ? this.prompts.length - 1 : -1;
        var eventArgs = {
            event: event,
            prompt: promptIndex >= 0 ? this.prompts[parseInt(promptIndex.toString(), 10)].prompt : '',
            dataIndex: this.prompts ? this.prompts.length - 1 : -1
        };
        this.trigger('stopRespondingClick', eventArgs);
    };
    AIAssistView.prototype.onSuggestionClick = function (e) {
        this.suggestionsElement.hidden = true;
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = e.target.innerText;
        this.isProtectedOnChange = prevOnChange;
        this.onSendIconClick();
    };
    AIAssistView.prototype.onSendIconClick = function () {
        if (this.isResponseRequested || !this.prompt.trim()) {
            return;
        }
        this.isResponseRequested = true;
        this.lastStreamPrompt = '';
        if (this.suggestionsElement) {
            this.suggestionsElement.hidden = true;
        }
        this.isOutputRenderingStop = false;
        this.stopResponding.classList.add('e-btn-active');
        this.addPrompt();
        this.createOutputElement();
        var eventArgs = {
            cancel: false,
            responseToolbarItems: this.responseToolbarSettings.items,
            prompt: this.prompt,
            promptSuggestions: this.promptSuggestions
        };
        if (!this.footerTemplate) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = this.textareaObj.value = '';
            this.textareaObj.dataBind();
            this.isProtectedOnChange = prevOnChange;
            this.updateTextAreaObject();
            this.activateSendIcon(this.textareaObj.value.length);
        }
        this.trigger('promptRequest', eventArgs);
        if (this.contentWrapper) {
            this.scrollToBottom();
        }
    };
    AIAssistView.prototype.addPrompt = function () {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompts = this.prompts.concat([{ prompt: this.prompt, response: '', isResponseHelpful: null }]);
        this.isProtectedOnChange = prevOnChange;
    };
    AIAssistView.prototype.getContextObject = function (templateName, contentElement, index, arrayPosition) {
        var template;
        var context = {};
        var contextIndex = index >= 0 ? index : -1;
        var contextPrompt = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].prompt : '';
        var contextOutput = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].response : '';
        switch (templateName.toLowerCase()) {
            case 'promptitemtemplate': {
                template = this.promptItemTemplate;
                context = { prompt: contextPrompt, toolbarItems: this.promptToolbarSettings.items, index: contextIndex };
                break;
            }
            case 'responseitemtemplate': {
                template = this.responseItemTemplate;
                context = {
                    prompt: contextPrompt,
                    response: contextOutput,
                    index: contextIndex,
                    toolbarItems: this.responseToolbarSettings.items
                };
                break;
            }
            case 'customviewtemplate':
            case 'assistviewtemplate': {
                template = this.views[parseInt(arrayPosition.toString(), 10)].viewTemplate || '';
                break;
            }
        }
        this.updateContent(template, contentElement, context, templateName);
    };
    AIAssistView.prototype.createOutputElement = function () {
        this.outputSuggestionEle = this.createElement('div', { attrs: { id: "e-prompt-item_" + (this.prompts.length - 1), class: "e-prompt-container " + (this.promptItemTemplate ? 'e-prompt-item-template' : '') } });
        this.renderPrompt(this.prompt, this.prompts.length - 1);
        this.outputElement.append(this.outputSuggestionEle, this.skeletonContainer);
        this.skeletonContainer.hidden = false;
    };
    AIAssistView.prototype.renderOutputContainer = function (promptText, outputText, index, isMethodCall, isFinalUpdate) {
        var outputContainer = this.createElement('div', { attrs: { id: "e-response-item_" + index, class: "e-output-container " + (this.responseItemTemplate ? 'e-response-item-template' : '') } });
        this.renderOutput(outputContainer, promptText, outputText, isMethodCall, index, isFinalUpdate);
        if (promptText) {
            this.outputElement.append(this.outputSuggestionEle);
        }
        this.outputElement.append(outputContainer);
        if (this.stopResponding && isFinalUpdate) {
            this.stopResponding.classList.remove('e-btn-active');
        }
        if (!this.isOutputRenderingStop && !this.content.contains(this.suggestionsElement) && this.suggestionsElement) {
            this.content.append(this.suggestionsElement);
        }
    };
    AIAssistView.prototype.renderOutput = function (outputContainer, promptText, outputText, isMethodCall, index, isFinalUpdate) {
        var promptIcon = this.createElement('span', {
            className: 'e-output-icon e-icons ' + (this.responseIconCss || (this.isAssistView && this.views[0].iconCss) || 'e-assistview-icon')
        });
        var aiOutputEle = this.createElement('div', { className: 'e-output' });
        if (!this.aiAssistViewRendered || isMethodCall) {
            if (!isNOU(promptText)) {
                this.outputSuggestionEle = this.createElement('div', { attrs: { id: "e-prompt-item_" + index, class: "e-prompt-container " + (this.promptItemTemplate ? 'e-prompt-item-template' : '') } });
                this.renderPrompt(promptText, index);
            }
        }
        var lastPrompt = { prompt: promptText, response: outputText };
        if (lastPrompt.response) {
            if (this.responseItemTemplate) {
                this.getContextObject('responseItemTemplate', aiOutputEle, index);
                if (this.outputElement.querySelector('.e-skeleton')) {
                    this.outputElement.removeChild(this.skeletonContainer);
                }
                if (this.contentFooterEle) {
                    this.contentFooterEle.classList.remove('e-assist-toolbar-active');
                }
                this.renderOutputToolbarItems(index, isFinalUpdate);
                aiOutputEle.append(this.contentFooterEle);
                outputContainer.append(aiOutputEle);
            }
            else {
                this.renderOutputTextContainer(lastPrompt.response, aiOutputEle, index, false, isFinalUpdate);
                outputContainer.append(promptIcon, aiOutputEle);
            }
        }
        else if (this.aiAssistViewRendered) {
            if (this.outputElement.querySelector('.e-skeleton')) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
            if (this.suggestionsElement) {
                this.suggestionsElement.hidden = false;
            }
        }
    };
    AIAssistView.prototype.renderOutputTextContainer = function (response, aiOutputEle, index, isMethodCall, isFinalUpdate) {
        var _this = this;
        if (this.contentFooterEle) {
            this.contentFooterEle.classList.remove('e-assist-toolbar-active');
        }
        this.outputContentBodyEle = this.createElement('div', { attrs: { class: 'e-content-body', tabindex: '0' } });
        if (!isMethodCall) {
            this.outputContentBodyEle.innerHTML = response;
            var preTags = Array.from(this.outputContentBodyEle.querySelectorAll('pre'));
            preTags.forEach(function (preTag) {
                var copyIcon = document.createElement('span');
                copyIcon.className = 'e-icons e-code-copy e-assist-copy';
                preTag.insertBefore(copyIcon, preTag.firstChild);
                _this.preTagElements.push({ preTag: preTag, handler: _this.getCopyHandler(preTag) });
                EventHandler.add(copyIcon, 'click', _this.preTagElements[_this.preTagElements.length - 1].handler);
            });
        }
        this.renderOutputToolbarItems(index, isFinalUpdate);
        this.appendChildren(aiOutputEle, this.outputContentBodyEle, this.contentFooterEle);
    };
    AIAssistView.prototype.getCopyHandler = function (preTag) {
        return function () {
            var preText = preTag.innerText;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.navigator.clipboard.writeText(preText);
            var copyIcon = preTag.querySelector('.e-code-copy');
            copyIcon.className = 'e-icons e-code-copy e-assist-check';
            setTimeout(function () {
                copyIcon.className = 'e-icons e-code-copy e-assist-copy';
            }, 1000);
        };
    };
    AIAssistView.prototype.renderOutputToolbarItems = function (index, isFinalUpdate) {
        this.contentFooterEle = this.createElement('div', { className: 'e-content-footer e-assist-toolbar-active' });
        var footerContent = this.createElement('div');
        this.renderResponseToolbar(index);
        if (this.aiAssistViewRendered) {
            if (this.outputElement.querySelector('.e-skeleton')) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
            if (isFinalUpdate && this.suggestionsElement) {
                this.suggestionsElement.hidden = false;
            }
        }
        this.responseToolbarEle.appendTo(footerContent);
        this.responseToolbarEle.element.setAttribute('aria-label', "response-toolbar-" + index);
        this.contentFooterEle.appendChild(footerContent);
    };
    AIAssistView.prototype.renderResponseToolbar = function (index) {
        var _this = this;
        var pushToolbar = this.responseToolbarSettings.items.map(function (item) {
            var toolbarItem = {
                type: item.type,
                visible: item.visible,
                disabled: item.disabled,
                tooltipText: item.tooltip,
                template: item.template,
                prefixIcon: item.iconCss,
                text: item.text,
                cssClass: item.cssClass,
                align: item.align,
                width: _this.responseToolbarSettings.width
            };
            if (toolbarItem.prefixIcon === 'e-icons e-assist-like' && _this.prompts[parseInt(index.toString(), 10)].isResponseHelpful) {
                toolbarItem.prefixIcon = 'e-icons e-assist-like-filled';
            }
            else if (toolbarItem.prefixIcon === 'e-icons e-assist-dislike' && _this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false) {
                toolbarItem.prefixIcon = 'e-icons e-assist-dislike-filled';
            }
            return toolbarItem;
        });
        this.responseToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: function (args) {
                var eventItemArgs = {
                    type: args.item.type,
                    text: args.item.text,
                    iconCss: args.item.prefixIcon,
                    cssClass: args.item.cssClass,
                    tooltip: args.item.tooltipText,
                    template: args.item.template,
                    disabled: args.item.disabled,
                    visible: args.item.visible,
                    align: args.item.align,
                    tabIndex: args.item.tabIndex
                };
                var eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: index
                };
                if (_this.responseToolbarSettings.itemClicked) {
                    _this.responseToolbarSettings.itemClicked.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    _this.handleItemClick(args, index);
                }
            }
        });
    };
    AIAssistView.prototype.getClipBoardContent = function (value) {
        var tempElement = document.createElement('div');
        tempElement.innerHTML = value;
        tempElement.style.top = '0';
        tempElement.style.left = '0';
        tempElement.style.position = 'fixed';
        tempElement.style.opacity = '0';
        document.body.appendChild(tempElement);
        navigator.clipboard.write([
            new ClipboardItem({
                'text/html': new Blob([tempElement.innerHTML], { type: 'text/html' }),
                'text/plain': new Blob([tempElement.innerText], { type: 'text/plain' })
            })
        ]);
        document.body.removeChild(tempElement);
    };
    AIAssistView.prototype.handleItemClick = function (args, index) {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args.item.controlParent.element.querySelector('.e-assist-dislike');
        if (args.item.prefixIcon === 'e-icons e-assist-copy') {
            this.getClipBoardContent(this.prompts[parseInt(index.toString(), 10)].response);
            args.item.prefixIcon = 'e-icons e-assist-check';
            this.responseToolbarEle.dataBind();
            setTimeout(function () {
                args.item.prefixIcon = 'e-icons e-assist-copy';
                _this.responseToolbarEle.dataBind();
            }, 1000);
        }
        var icon = args.item.prefixIcon;
        var isLikeInteracted = icon === 'e-icons e-assist-like-filled' || icon === 'e-icons e-assist-like';
        var isDislikeInteracted = icon === 'e-icons e-assist-dislike-filled' || icon === 'e-icons e-assist-dislike';
        if (isLikeInteracted || isDislikeInteracted) {
            var isHelpful = null;
            if (isLikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === true ? null : true;
            }
            else if (isDislikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false ? null : false;
            }
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompts[parseInt(index.toString(), 10)].isResponseHelpful = isHelpful;
            var promptItem = this.prompts[parseInt(index.toString(), 10)];
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            var controlParentItems = args.item.controlParent.items;
            if (isLikeInteracted) {
                if (promptItem.isResponseHelpful === true) {
                    args.item.prefixIcon = 'e-icons e-assist-like-filled';
                    if (controlParentItems && controlParentItems.length > 2) {
                        controlParentItems[2].prefixIcon = 'e-icons e-assist-dislike';
                    }
                }
                else {
                    args.item.prefixIcon = 'e-icons e-assist-like';
                }
            }
            else if (isDislikeInteracted) {
                if (promptItem.isResponseHelpful === false) {
                    args.item.prefixIcon = 'e-icons e-assist-dislike-filled';
                    if (controlParentItems && controlParentItems.length > 1) {
                        controlParentItems[1].prefixIcon = 'e-icons e-assist-like';
                    }
                }
                else {
                    args.item.prefixIcon = 'e-icons e-assist-dislike';
                }
            }
            this.responseToolbarEle.dataBind();
            this.isProtectedOnChange = prevOnChange;
        }
    };
    AIAssistView.prototype.renderPrompt = function (promptText, promptIndex) {
        var outputPrompt = this.createElement('div', { attrs: { class: 'e-prompt-text', tabindex: '0' } });
        var promptContent = this.createElement('div', { className: 'e-prompt-content' });
        var promptToolbarContainer = this.createElement('div', { className: 'e-prompt-toolbar' });
        var promptToolbar = this.createElement('div');
        var userIcon = this.createElement('span', { className: this.promptIconCss ? 'e-prompt-icon e-icons '
                + this.promptIconCss : '' });
        if (this.promptItemTemplate) {
            this.getContextObject('promptItemTemplate', this.outputSuggestionEle, promptIndex);
        }
        else {
            outputPrompt.innerHTML = promptText;
            this.appendChildren(promptContent, outputPrompt);
            if (this.promptIconCss) {
                promptContent.appendChild(userIcon);
            }
            this.outputSuggestionEle.append(promptContent);
        }
        this.renderPromptToolbar(promptToolbar, promptIndex);
        promptToolbarContainer.append(promptToolbar);
        this.appendChildren(this.outputSuggestionEle, promptToolbarContainer);
    };
    AIAssistView.prototype.renderPromptToolbar = function (element, promptIndex) {
        var _this = this;
        var pushToolbar = [];
        if (this.promptToolbarSettings.items.length === 0) {
            pushToolbar = [
                { prefixIcon: 'e-icons e-assist-edit', tooltipText: 'Edit' },
                { prefixIcon: 'e-icons e-assist-copy', tooltipText: 'Copy' }
            ];
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.promptToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-edit', tooltip: 'Edit' },
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        else {
            pushToolbar = this.promptToolbarSettings.items.map(function (item) { return ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                width: _this.promptToolbarSettings.width
            }); });
        }
        this.promptToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: function (args) {
                var eventItemArgs = {
                    type: args.item.type,
                    text: args.item.text,
                    iconCss: args.item.prefixIcon,
                    cssClass: args.item.cssClass,
                    tooltip: args.item.tooltipText,
                    template: args.item.template,
                    disabled: args.item.disabled,
                    visible: args.item.visible,
                    align: args.item.align,
                    tabIndex: args.item.tabIndex
                };
                var eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: promptIndex
                };
                if (_this.promptToolbarSettings.itemClicked) {
                    _this.promptToolbarSettings.itemClicked.call(_this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.prefixIcon === 'e-icons e-assist-edit') {
                        _this.onEditIconClick(promptIndex);
                    }
                    if (args.item.prefixIcon === 'e-icons e-assist-copy') {
                        _this.getClipBoardContent(_this.prompts[parseInt(promptIndex.toString(), 10)].prompt);
                        args.item.prefixIcon = 'e-icons e-assist-check';
                        _this.promptToolbarEle.dataBind();
                        setTimeout(function () {
                            args.item.prefixIcon = 'e-icons e-assist-copy';
                            _this.promptToolbarEle.dataBind();
                        }, 1000);
                    }
                }
            }
        });
        this.promptToolbarEle.appendTo(element);
        this.promptToolbarEle.element.setAttribute('aria-label', "prompt-toolbar-" + promptIndex);
    };
    AIAssistView.prototype.renderSkeleton = function () {
        this.skeletonContainer = this.createElement('div', { className: 'e-output-container' });
        var outputViewWrapper = this.createElement('div', { className: 'e-output', styles: 'width: 70%;' });
        var skeletonIconEle = this.createElement('span', { className: 'e-output-icon e-skeleton e-skeleton-text e-shimmer-wave' });
        var skeletonBodyEle = this.createElement('div', { className: 'e-loading-body' });
        var skeletonFooterEle = this.createElement('div', { className: 'e-loading-footer' });
        var _a = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 75%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 50%; height: 15px;' })
        ], skeletonLine1 = _a[0], skeletonLine2 = _a[1], skeletonLine3 = _a[2];
        var footerSkeleton = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 30px;' })
        ][0];
        this.appendChildren(skeletonBodyEle, skeletonLine1, skeletonLine2, skeletonLine3);
        skeletonFooterEle.append(footerSkeleton);
        this.appendChildren(outputViewWrapper, skeletonBodyEle, skeletonFooterEle);
        this.appendChildren(this.skeletonContainer, skeletonIconEle, outputViewWrapper);
    };
    AIAssistView.prototype.onEditIconClick = function (promptIndex) {
        if (this.textareaObj) {
            if (this.suggestionsElement) {
                this.suggestionsElement.hidden = true;
            }
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.textareaObj.value = this.prompt = this.prompts[parseInt(promptIndex.toString(), 10)].prompt;
            this.textareaObj.dataBind();
            this.updateTextAreaObject();
            this.textareaObj.focusIn();
            this.isProtectedOnChange = prevOnChange;
            this.activateSendIcon(this.prompt.length);
        }
    };
    AIAssistView.prototype.updateIcons = function (newCss, isPromptIconCss) {
        if (isPromptIconCss === void 0) { isPromptIconCss = false; }
        var elements;
        if (this.outputElement) {
            if (isPromptIconCss) {
                newCss = 'e-prompt-icon e-icons ' + newCss;
                elements = this.outputElement.querySelectorAll('.e-prompt-icon');
            }
            else {
                newCss = ' e-output-icon e-icons ' + newCss;
                elements = this.outputElement.querySelectorAll('.e-output-icon');
            }
        }
        for (var index = 0; index < (elements && elements.length); index++) {
            removeClass([elements[parseInt(index.toString(), 10)]], elements[parseInt(index.toString(), 10)].classList.toString().trim().split(' '));
            addClass([elements[parseInt(index.toString(), 10)]], newCss.trim().split(' '));
        }
    };
    AIAssistView.prototype.updateToolbarSettings = function (previousToolbar) {
        var previousToolbarIndex = 0;
        for (var index = this.views.length; index < this.toolbarItems.length; index++) {
            if (previousToolbar.items[parseInt(previousToolbarIndex.toString(), 10)] === this.toolbarItems[parseInt(index.toString(), 10)]) {
                this.toolbarItems.splice(index, 1);
            }
        }
        this.updateHeaderToolbar();
        this.toolbar.items = this.toolbarItems;
    };
    AIAssistView.prototype.updateResponse = function (response, index, isFinalUpdate, responseItem) {
        if (!this.responseItemTemplate && responseItem) {
            var outputContentBodyEle = responseItem.querySelector('.e-content-body');
            if (outputContentBodyEle) {
                outputContentBodyEle.innerHTML = response;
            }
        }
        else {
            this.renderOutputContainer(undefined, response, index, false, isFinalUpdate);
        }
    };
    AIAssistView.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.destroyAndNullify(this.textareaObj);
        this.destroyAndNullify(this.responseToolbarEle);
        this.destroyAndNullify(this.promptToolbarEle);
        this.destroyAndNullify(this.toolbar);
        this.destroyAssistView();
        //private html elements nullify
        remove(this.viewWrapper);
        this.viewWrapper = null;
        this.aiAssistViewRendered = null;
        this.assistViewTemplateIndex = null;
        this.toolbarItems = [];
        this.displayContents = [];
        this.isOutputRenderingStop = null;
        this.isResponseRequested = null;
        this.suggestionHeader = null;
        this.previousElement = null;
        this.assistCustomSection = null;
        this.preTagElements = [];
        // properties nullify
        this.toolbarSettings = this.promptToolbarSettings = this.responseToolbarSettings = {};
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(' '));
        }
        this.element.classList.remove('e-rtl');
    };
    AIAssistView.prototype.destroyAssistView = function () {
        var properties = [
            'toolbarHeader',
            'sendIcon',
            'suggestions',
            'skeletonContainer',
            'outputElement',
            'outputSuggestionEle',
            'contentFooterEle',
            'footer',
            'assistCustomSection',
            'content',
            'stopRespondingContent',
            'stopResponding',
            'contentWrapper'
        ];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            var element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    };
    /**
     * Executes the specified prompt in the AIAssistView component. The method accepts a string representing the prompt.
     *
     * @param {string} prompt - The prompt text to be executed. It must be a non-empty string.
     *
     * @returns {void}
     */
    AIAssistView.prototype.executePrompt = function (prompt) {
        if (!isNOU(prompt) && prompt.trim().length > 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = prompt;
            this.isProtectedOnChange = prevOnChange;
            this.onSendIconClick();
        }
    };
    /**
     * Adds a response to the last prompt or appends a new prompt data in the AIAssistView component.
     *
     * @param {string | Object} outputResponse - The response to be added. Can be a string representing the response or an object containing both the prompt and the response.
     * - If `outputResponse` is a string, it updates the response for the last prompt in the prompts collection.
     * - If `outputResponse` is an object, it can either update the response of an existing prompt if the prompt matches or append a new prompt data.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    AIAssistView.prototype.addPromptResponse = function (outputResponse, isFinalUpdate) {
        if (isFinalUpdate === void 0) { isFinalUpdate = true; }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (!this.isOutputRenderingStop) {
            var responseItem = this.element.querySelector("#e-response-item_" + (this.prompts.length - 1));
            var lastPrompt = this.prompts[this.prompts.length - 1];
            if (typeof outputResponse === 'string') {
                if (!this.isResponseRequested) {
                    this.prompts = this.prompts.concat([{ prompt: null, response: null, isResponseHelpful: null }]);
                    lastPrompt = this.prompts[this.prompts.length - 1];
                }
                lastPrompt.response = outputResponse;
                this.updateResponse(lastPrompt.response, this.prompts.length - 1, isFinalUpdate, responseItem);
            }
            if (typeof outputResponse === 'object') {
                var tPrompt = {
                    prompt: outputResponse.prompt,
                    response: outputResponse.response,
                    isResponseHelpful: isNOU(outputResponse.isResponseHelpful) ? null :
                        outputResponse.isResponseHelpful
                };
                if (this.prompt === tPrompt.prompt || this.lastStreamPrompt === tPrompt.prompt) {
                    lastPrompt.response = tPrompt.response;
                    lastPrompt.isResponseHelpful = tPrompt.isResponseHelpful;
                    this.updateResponse(lastPrompt.response, this.prompts.length - 1, isFinalUpdate, responseItem);
                }
                else {
                    this.prompts = this.prompts.concat([tPrompt]);
                    this.renderOutputContainer(tPrompt.prompt, tPrompt.response, this.prompts.length - 1, true, isFinalUpdate);
                }
                if (!isFinalUpdate) {
                    this.lastStreamPrompt = tPrompt.prompt;
                }
            }
            if (isFinalUpdate && this.stopResponding) {
                this.stopResponding.classList.remove('e-btn-active');
            }
            this.isResponseRequested = !isFinalUpdate;
        }
        this.isProtectedOnChange = prevOnChange;
    };
    /**
     * Scrolls the view to the bottom to display the most recent response in the AIAssistView component.
     * This method programmatically scrolls the view to the bottom,
     * typically used when new responses are added or to refocus on the latest response.
     *
     * @returns {void}
     */
    AIAssistView.prototype.scrollToBottom = function () {
        this.updateScroll(this.contentWrapper);
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistViewModel} newProp - Specifies new properties
     * @param  {AIAssistViewModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    AIAssistView.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                case 'height':
                    this.setDimension(this.element, this.width, this.height);
                    break;
                case 'cssClass':
                    this.updateCssClass(this.element, newProp.cssClass, oldProp.cssClass);
                    break;
                case 'promptIconCss':
                    this.updateIcons(newProp.promptIconCss, true);
                    break;
                case 'responseIconCss':
                    this.updateIcons(newProp.responseIconCss);
                    break;
                case 'showHeader':
                    this.updateHeader(this.showHeader, this.toolbarHeader, this.viewWrapper);
                    break;
                case 'promptSuggestions':
                    if (this.suggestionsElement) {
                        this.suggestionsElement.remove();
                    }
                    if (!this.isOutputRenderingStop) {
                        this.renderSuggestions(this.promptSuggestions, this.promptSuggestionsHeader, this.promptSuggestionItemTemplate, 'promptSuggestion', 'promptSuggestionItemTemplate', this.onSuggestionClick);
                    }
                    break;
                case 'showClearButton':
                    this.textareaObj.showClearButton = this.showClearButton;
                    break;
                case 'promptPlaceholder':
                    this.textareaObj.placeholder = this.promptPlaceholder;
                    break;
                case 'promptSuggestionsHeader': {
                    this.suggestionHeader.innerHTML = this.promptSuggestionsHeader;
                    var suggestionHeaderElem = this.element.querySelector('.e-suggestions .e-suggestion-header');
                    if (!suggestionHeaderElem) {
                        this.suggestionsElement.append(this.suggestionHeader);
                    }
                    break;
                }
                case 'activeView': {
                    var previousViewIndex = this.getIndex(oldProp.activeView);
                    this.updateActiveView(previousViewIndex);
                    break;
                }
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove']('e-rtl');
                    if (!isNOU(this.toolbar)) {
                        this.toolbar.enableRtl = this.enableRtl;
                        this.toolbar.dataBind();
                    }
                    break;
                case 'toolbarSettings':
                    this.updateToolbarSettings(oldProp.toolbarSettings);
                    break;
                case 'promptToolbarSettings':
                case 'responseToolbarSettings':
                case 'prompts':
                    this.isOutputRenderingStop = false;
                    if (this.outputElement) {
                        remove(this.outputElement);
                    }
                    if (this.stopResponding) {
                        this.stopResponding.classList.remove('e-btn-active');
                    }
                    this.aiAssistViewRendered = false;
                    this.renderOutputContent(true);
                    this.detachCodeCopyEventHandler();
                    break;
                case 'prompt':
                    if (!this.footerTemplate) {
                        this.textareaObj.value = this.prompt;
                        this.textareaObj.dataBind();
                        this.updateTextAreaObject();
                    }
                    break;
                case 'locale':
                    if (this.assistViewTemplateIndex < 0) {
                        this.updateStopRespondingTitle();
                    }
                    break;
            }
        }
    };
    __decorate([
        Property('')
    ], AIAssistView.prototype, "prompt", void 0);
    __decorate([
        Property('Type prompt for assistance...')
    ], AIAssistView.prototype, "promptPlaceholder", void 0);
    __decorate([
        Collection([], Prompt)
    ], AIAssistView.prototype, "prompts", void 0);
    __decorate([
        Property([])
    ], AIAssistView.prototype, "promptSuggestions", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "promptSuggestionsHeader", void 0);
    __decorate([
        Property(true)
    ], AIAssistView.prototype, "showHeader", void 0);
    __decorate([
        Complex({ items: [] }, ToolbarSettings)
    ], AIAssistView.prototype, "toolbarSettings", void 0);
    __decorate([
        Property(0)
    ], AIAssistView.prototype, "activeView", void 0);
    __decorate([
        Property(null)
    ], AIAssistView.prototype, "promptIconCss", void 0);
    __decorate([
        Property(null)
    ], AIAssistView.prototype, "responseIconCss", void 0);
    __decorate([
        Property('100%')
    ], AIAssistView.prototype, "width", void 0);
    __decorate([
        Property('100%')
    ], AIAssistView.prototype, "height", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "cssClass", void 0);
    __decorate([
        Collection([], AssistView)
    ], AIAssistView.prototype, "views", void 0);
    __decorate([
        Complex({ width: null, items: [] }, PromptToolbarSettings)
    ], AIAssistView.prototype, "promptToolbarSettings", void 0);
    __decorate([
        Complex({ width: null, items: [] }, ResponseToolbarSettings)
    ], AIAssistView.prototype, "responseToolbarSettings", void 0);
    __decorate([
        Property(false)
    ], AIAssistView.prototype, "showClearButton", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "footerTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "promptItemTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "responseItemTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "promptSuggestionItemTemplate", void 0);
    __decorate([
        Property('')
    ], AIAssistView.prototype, "bannerTemplate", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "promptRequest", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "promptChanged", void 0);
    __decorate([
        Event()
    ], AIAssistView.prototype, "stopRespondingClick", void 0);
    AIAssistView = __decorate([
        NotifyPropertyChanges
    ], AIAssistView);
    return AIAssistView;
}(InterActiveChatBase));
export { AIAssistView };
