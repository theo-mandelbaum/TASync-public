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
import { Component, select, compile, NotifyPropertyChanges, isNullOrUndefined as isNOU, formatUnit, Event, append, addClass, removeClass, Property, ChildProperty, Collection } from '@syncfusion/ej2-base';
import { attributes, EventHandler, remove } from '@syncfusion/ej2-base';
import { TextArea } from '@syncfusion/ej2-inputs';
/**
 * Represents a toolbar item model in the component.
 */
var ToolbarItem = /** @class */ (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "iconCss", void 0);
    __decorate([
        Property()
    ], ToolbarItem.prototype, "text", void 0);
    __decorate([
        Property('Button')
    ], ToolbarItem.prototype, "type", void 0);
    __decorate([
        Property('Left')
    ], ToolbarItem.prototype, "align", void 0);
    __decorate([
        Property(true)
    ], ToolbarItem.prototype, "visible", void 0);
    __decorate([
        Property(false)
    ], ToolbarItem.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "tooltip", void 0);
    __decorate([
        Property('')
    ], ToolbarItem.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], ToolbarItem.prototype, "template", void 0);
    __decorate([
        Property(-1)
    ], ToolbarItem.prototype, "tabIndex", void 0);
    return ToolbarItem;
}(ChildProperty));
export { ToolbarItem };
/**
 * Represents the settings for the toolbar in the component.
 */
var ToolbarSettings = /** @class */ (function (_super) {
    __extends(ToolbarSettings, _super);
    function ToolbarSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Collection([], ToolbarItem)
    ], ToolbarSettings.prototype, "items", void 0);
    __decorate([
        Event()
    ], ToolbarSettings.prototype, "itemClicked", void 0);
    return ToolbarSettings;
}(ChildProperty));
export { ToolbarSettings };
/**
 * ChatBase component act as base class.
 */
var InterActiveChatBase = /** @class */ (function (_super) {
    __extends(InterActiveChatBase, _super);
    /**
     * * Constructor for Base class
     *
     * @param {InterActiveChatBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function InterActiveChatBase(options, element) {
        return _super.call(this, options, element) || this;
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    InterActiveChatBase.prototype.preRender = function () {
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    InterActiveChatBase.prototype.getModuleName = function () {
        return 'interactivechatBase';
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    InterActiveChatBase.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    InterActiveChatBase.prototype.render = function () {
    };
    /* To calculate the width when change via set model */
    InterActiveChatBase.prototype.setDimension = function (element, width, height) {
        element.style.width = !isNOU(width) ? formatUnit(width) : element.style.width;
        element.style.height = !isNOU(height) ? formatUnit(height) : element.style.height;
    };
    InterActiveChatBase.prototype.addCssClass = function (element, cssClass) {
        if (cssClass) {
            element.classList.add(cssClass);
        }
    };
    InterActiveChatBase.prototype.addRtlClass = function (element, isRtl) {
        if (isRtl) {
            element.classList.add('e-rtl');
        }
    };
    InterActiveChatBase.prototype.updateCssClass = function (element, newClass, oldClass) {
        if (oldClass) {
            removeClass([element], oldClass.trim().split(' '));
        }
        if (newClass) {
            addClass([element], newClass.trim().split(' '));
        }
    };
    InterActiveChatBase.prototype.updateHeader = function (showHeader, headerElement, viewWrapper) {
        if (!showHeader) {
            headerElement.hidden = true;
            viewWrapper.style.height = '100%';
        }
        else {
            headerElement.hidden = false;
            viewWrapper.style.height = '';
        }
    };
    InterActiveChatBase.prototype.renderViewSections = function (element, headerClassName, viewClassName) {
        var headerWrapper = this.createElement('div', { className: headerClassName });
        element.appendChild(headerWrapper);
        var viewWrapper = this.createElement('div', { className: viewClassName });
        element.appendChild(viewWrapper);
    };
    InterActiveChatBase.prototype.createViewComponents = function (viewWrapper) {
        var contentWrapper = this.createElement('div', { className: 'e-views' });
        var viewContainer = this.createElement('div', { className: 'e-view-container' });
        contentWrapper.appendChild(viewContainer);
        viewWrapper.appendChild(contentWrapper);
    };
    InterActiveChatBase.prototype.updateScroll = function (scrollElement) {
        scrollElement.scrollTo(0, scrollElement.scrollHeight);
    };
    InterActiveChatBase.prototype.getElement = function (element) {
        var className;
        switch (element) {
            case 'footer':
                className = 'e-footer';
                break;
            case 'contentContainer':
                className = 'e-content-container';
                break;
            case 'outputElement':
                className = 'e-content';
                break;
            default:
                className = '';
                break;
        }
        return this.createElement('div', { className: className });
    };
    InterActiveChatBase.prototype.createSuggestionElement = function (suggestionHeader) {
        var suggestionContainer = this.createElement('div', { className: 'e-suggestions' });
        var suggestionHeaderElement = this.createElement('div', { className: 'e-suggestion-header' });
        var suggestionListElement = this.createElement('div', { className: 'e-suggestion-list' });
        if (suggestionHeader) {
            suggestionContainer.appendChild(suggestionHeaderElement);
        }
        suggestionContainer.appendChild(suggestionListElement);
        return { suggestionContainer: suggestionContainer, suggestionHeaderElement: suggestionHeaderElement, suggestionListElement: suggestionListElement };
    };
    InterActiveChatBase.prototype.renderSuggestions = function (suggestionsArray, suggestionHeader, suggestionTemplate, contextName, templateName, onSuggestionClick) {
        var isSuggestionTemplate = suggestionTemplate ? true : false;
        if (suggestionsArray && suggestionsArray.length > 0) {
            var _a = this.createSuggestionElement(suggestionHeader), suggestionContainer = _a.suggestionContainer, suggestionHeaderElement = _a.suggestionHeaderElement, suggestionListElement = _a.suggestionListElement;
            this.suggestionsElement = suggestionContainer;
            var suggestionContainerClass = "e-suggestions " + (isSuggestionTemplate ? 'e-suggestion-item-template' : '');
            this.suggestionsElement.className = suggestionContainerClass;
            this.suggestionHeader = suggestionHeaderElement;
            var suggestionList = suggestionListElement;
            this.renderSuggestionList(suggestionsArray, suggestionList, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick);
            if (suggestionHeader) {
                this.suggestionHeader.innerHTML = suggestionHeader;
            }
            this.suggestionsElement.append(suggestionList);
            this.content.append(this.suggestionsElement);
        }
    };
    InterActiveChatBase.prototype.renderSuggestionList = function (suggestionsArray, suggestionWrapper, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick) {
        var _this = this;
        var suggestionsListElement = this.createElement('ul', { attrs: { 'tabindex': '-1' } });
        suggestionsArray.forEach(function (suggestion, i) {
            var _a;
            var suggestionList = _this.createElement('li');
            attributes(suggestionList, { 'tabindex': '0' });
            EventHandler.add(suggestionList, 'click', onSuggestionClick, _this);
            EventHandler.add(suggestionList, 'keydown', _this.suggestionItemHandler, _this);
            if (isSuggestionTemplate) {
                var suggestionContext = (_a = { index: i }, _a[contextName] = suggestionsArray[parseInt(i.toString(), 10)], _a);
                _this.updateContent(suggestionTemplate, suggestionList, suggestionContext, templateName);
            }
            else {
                suggestionList.innerHTML = suggestion;
            }
            suggestionsListElement.append(suggestionList);
        });
        suggestionWrapper.appendChild(suggestionsListElement);
    };
    InterActiveChatBase.prototype.suggestionItemHandler = function (event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.onSuggestionClick(event);
        }
    };
    InterActiveChatBase.prototype.renderBannerView = function (bannerTemplate, parentElement, templateName) {
        if (bannerTemplate) {
            var className = templateName === 'emptyChatTemplate' ? 'e-empty-chat-template' : 'e-banner-view';
            var introContainer = this.createElement('div', { className: className });
            this.updateContent(bannerTemplate, introContainer, {}, templateName);
            parentElement.prepend(introContainer);
        }
    };
    InterActiveChatBase.prototype.updateContent = function (template, contentElement, context, templateName) {
        if (this.isReact) {
            this.clearTemplate([templateName]);
        }
        var notCompile = !(this.isReact || this.isVue);
        var ctn = this.getTemplateFunction(template, notCompile);
        if (typeof ctn === 'string') {
            contentElement.innerHTML = ctn;
        }
        else {
            append(ctn(context, this), contentElement);
        }
        this.renderReactTemplates();
    };
    InterActiveChatBase.prototype.renderFooterContent = function (footerTemplate, footer, prompt, promptPlaceholder, showClearButton, rowCount, className) {
        if (footerTemplate) {
            this.updateContent(footerTemplate, footer, {}, 'footerTemplate');
            return null;
        }
        else {
            var textareaEle = this.createElement('textarea', { className: className });
            footer.appendChild(textareaEle);
            return this.renderFooter(textareaEle, prompt, promptPlaceholder, showClearButton, rowCount);
        }
    };
    InterActiveChatBase.prototype.renderFooter = function (textareaElement, prompt, promptPlaceholder, showClearButton, rowCount) {
        if (showClearButton === void 0) { showClearButton = false; }
        var textareaObj = new TextArea({
            rows: rowCount,
            cols: 300,
            cssClass: rowCount >= 10 ? 'show-scrollbar' : 'hide-scrollbar',
            placeholder: promptPlaceholder,
            resizeMode: 'None',
            value: prompt,
            showClearButton: showClearButton
        });
        textareaObj.appendTo(textareaElement);
        return textareaObj;
    };
    InterActiveChatBase.prototype.renderSendIcon = function (sendIconClass, footer) {
        var sendIcon = this.createElement('span', { attrs: { class: sendIconClass, role: 'button', 'aria-label': 'Submit', tabindex: '0' } });
        footer.appendChild(sendIcon);
        return sendIcon;
    };
    InterActiveChatBase.prototype.appendChildren = function (target) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        target.append.apply(target, children);
    };
    InterActiveChatBase.prototype.insertBeforeChildren = function (target) {
        var children = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            children[_i - 1] = arguments[_i];
        }
        target.prepend.apply(target, children);
    };
    InterActiveChatBase.prototype.wireFooterEvents = function (sendIcon, footer, footerTemplate) {
        if (sendIcon) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.add(sendIcon, 'click', this.onSendIconClick, this);
        }
        if (footer && !footerTemplate) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.add(footer, 'keydown', this.footerKeyHandler, this);
        }
    };
    InterActiveChatBase.prototype.unWireFooterEvents = function (sendIcon, footer, footerTemplate) {
        if (sendIcon) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.remove(sendIcon, 'click', this.onSendIconClick);
        }
        if (footer && !footerTemplate) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.remove(footer, 'keydown', this.footerKeyHandler);
        }
    };
    InterActiveChatBase.prototype.removeAndNullify = function (element) {
        if (element) {
            if (!isNOU(element.parentNode)) {
                remove(element);
            }
            else {
                element.innerHTML = '';
            }
        }
    };
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    InterActiveChatBase.prototype.destroyAndNullify = function (obj) {
        if (obj) {
            obj.destroy();
            obj = null;
        }
    };
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    InterActiveChatBase.prototype.getTemplateFunction = function (template, notCompile) {
        if (typeof template === 'string') {
            var content = '';
            try {
                var tempEle = select(template);
                if (tempEle) {
                    //Return innerHTML incase of jsrenderer script else outerHTML
                    content = tempEle.tagName === 'SCRIPT' ? tempEle.innerHTML : tempEle.outerHTML;
                    notCompile = false;
                }
                else {
                    content = template;
                }
            }
            catch (e) {
                content = template;
            }
            return notCompile ? content : compile(content);
        }
        else {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            return compile(template);
        }
    };
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param  {InterActiveChatBaseModel} newProp - Specifies new properties
     * @param  {InterActiveChatBaseModel} oldProp - Specifies old properties
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    InterActiveChatBase.prototype.onPropertyChanged = function (newProp, oldProp) {
    };
    __decorate([
        Event()
    ], InterActiveChatBase.prototype, "created", void 0);
    InterActiveChatBase = __decorate([
        NotifyPropertyChanges
    ], InterActiveChatBase);
    return InterActiveChatBase;
}(Component));
export { InterActiveChatBase };
