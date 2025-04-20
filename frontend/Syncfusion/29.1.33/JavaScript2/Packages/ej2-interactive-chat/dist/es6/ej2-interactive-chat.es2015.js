import { ChildProperty, Property, Collection, Event, Component, isNullOrUndefined, formatUnit, removeClass, addClass, attributes, EventHandler, append, remove, select, compile, NotifyPropertyChanges, getUniqueID, L10n, Complex, Internationalization } from '@syncfusion/ej2-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { TextArea } from '@syncfusion/ej2-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { Fab } from '@syncfusion/ej2-buttons';

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * Represents a toolbar item model in the component.
 */
class ToolbarItem extends ChildProperty {
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
/**
 * Represents the settings for the toolbar in the component.
 */
class ToolbarSettings extends ChildProperty {
}
__decorate([
    Collection([], ToolbarItem)
], ToolbarSettings.prototype, "items", void 0);
__decorate([
    Event()
], ToolbarSettings.prototype, "itemClicked", void 0);
/**
 * ChatBase component act as base class.
 */
let InterActiveChatBase = class InterActiveChatBase extends Component {
    /**
     * * Constructor for Base class
     *
     * @param {InterActiveChatBaseModel} options - Specifies the Base model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    preRender() {
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the current module name.
     */
    getModuleName() {
        return 'interactivechatBase';
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    render() {
    }
    /* To calculate the width when change via set model */
    setDimension(element, width, height) {
        element.style.width = !isNullOrUndefined(width) ? formatUnit(width) : element.style.width;
        element.style.height = !isNullOrUndefined(height) ? formatUnit(height) : element.style.height;
    }
    addCssClass(element, cssClass) {
        if (cssClass) {
            element.classList.add(cssClass);
        }
    }
    addRtlClass(element, isRtl) {
        if (isRtl) {
            element.classList.add('e-rtl');
        }
    }
    updateCssClass(element, newClass, oldClass) {
        if (oldClass) {
            removeClass([element], oldClass.trim().split(' '));
        }
        if (newClass) {
            addClass([element], newClass.trim().split(' '));
        }
    }
    updateHeader(showHeader, headerElement, viewWrapper) {
        if (!showHeader) {
            headerElement.hidden = true;
            viewWrapper.style.height = '100%';
        }
        else {
            headerElement.hidden = false;
            viewWrapper.style.height = '';
        }
    }
    renderViewSections(element, headerClassName, viewClassName) {
        const headerWrapper = this.createElement('div', { className: headerClassName });
        element.appendChild(headerWrapper);
        const viewWrapper = this.createElement('div', { className: viewClassName });
        element.appendChild(viewWrapper);
    }
    createViewComponents(viewWrapper) {
        const contentWrapper = this.createElement('div', { className: 'e-views' });
        const viewContainer = this.createElement('div', { className: 'e-view-container' });
        contentWrapper.appendChild(viewContainer);
        viewWrapper.appendChild(contentWrapper);
    }
    updateScroll(scrollElement) {
        scrollElement.scrollTo(0, scrollElement.scrollHeight);
    }
    getElement(element) {
        let className;
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
    }
    createSuggestionElement(suggestionHeader) {
        const suggestionContainer = this.createElement('div', { className: 'e-suggestions' });
        const suggestionHeaderElement = this.createElement('div', { className: 'e-suggestion-header' });
        const suggestionListElement = this.createElement('div', { className: 'e-suggestion-list' });
        if (suggestionHeader) {
            suggestionContainer.appendChild(suggestionHeaderElement);
        }
        suggestionContainer.appendChild(suggestionListElement);
        return { suggestionContainer, suggestionHeaderElement, suggestionListElement };
    }
    renderSuggestions(suggestionsArray, suggestionHeader, suggestionTemplate, contextName, templateName, onSuggestionClick) {
        const isSuggestionTemplate = suggestionTemplate ? true : false;
        if (suggestionsArray && suggestionsArray.length > 0) {
            const { suggestionContainer, suggestionHeaderElement, suggestionListElement } = this.createSuggestionElement(suggestionHeader);
            this.suggestionsElement = suggestionContainer;
            const suggestionContainerClass = `e-suggestions ${isSuggestionTemplate ? 'e-suggestion-item-template' : ''}`;
            this.suggestionsElement.className = suggestionContainerClass;
            this.suggestionHeader = suggestionHeaderElement;
            const suggestionList = suggestionListElement;
            this.renderSuggestionList(suggestionsArray, suggestionList, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick);
            if (suggestionHeader) {
                this.suggestionHeader.innerHTML = suggestionHeader;
            }
            this.suggestionsElement.append(suggestionList);
            this.content.append(this.suggestionsElement);
        }
    }
    renderSuggestionList(suggestionsArray, suggestionWrapper, isSuggestionTemplate, contextName, suggestionTemplate, templateName, onSuggestionClick) {
        const suggestionsListElement = this.createElement('ul', { attrs: { 'tabindex': '-1' } });
        suggestionsArray.forEach((suggestion, i) => {
            const suggestionList = this.createElement('li');
            attributes(suggestionList, { 'tabindex': '0' });
            EventHandler.add(suggestionList, 'click', onSuggestionClick, this);
            EventHandler.add(suggestionList, 'keydown', this.suggestionItemHandler, this);
            if (isSuggestionTemplate) {
                const suggestionContext = { index: i, [contextName]: suggestionsArray[parseInt(i.toString(), 10)] };
                this.updateContent(suggestionTemplate, suggestionList, suggestionContext, templateName);
            }
            else {
                suggestionList.innerHTML = suggestion;
            }
            suggestionsListElement.append(suggestionList);
        });
        suggestionWrapper.appendChild(suggestionsListElement);
    }
    suggestionItemHandler(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.onSuggestionClick(event);
        }
    }
    renderBannerView(bannerTemplate, parentElement, templateName) {
        if (bannerTemplate) {
            const className = templateName === 'emptyChatTemplate' ? 'e-empty-chat-template' : 'e-banner-view';
            const introContainer = this.createElement('div', { className: className });
            this.updateContent(bannerTemplate, introContainer, {}, templateName);
            parentElement.prepend(introContainer);
        }
    }
    updateContent(template, contentElement, context, templateName) {
        if (this.isReact) {
            this.clearTemplate([templateName]);
        }
        const notCompile = !(this.isReact || this.isVue);
        const ctn = this.getTemplateFunction(template, notCompile);
        if (typeof ctn === 'string') {
            contentElement.innerHTML = ctn;
        }
        else {
            append(ctn(context, this), contentElement);
        }
        this.renderReactTemplates();
    }
    renderFooterContent(footerTemplate, footer, prompt, promptPlaceholder, showClearButton, rowCount, className) {
        if (footerTemplate) {
            this.updateContent(footerTemplate, footer, {}, 'footerTemplate');
            return null;
        }
        else {
            const textareaEle = this.createElement('textarea', { className: className });
            footer.appendChild(textareaEle);
            return this.renderFooter(textareaEle, prompt, promptPlaceholder, showClearButton, rowCount);
        }
    }
    renderFooter(textareaElement, prompt, promptPlaceholder, showClearButton = false, rowCount) {
        const textareaObj = new TextArea({
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
    }
    renderSendIcon(sendIconClass, footer) {
        const sendIcon = this.createElement('span', { attrs: { class: sendIconClass, role: 'button', 'aria-label': 'Submit', tabindex: '0' } });
        footer.appendChild(sendIcon);
        return sendIcon;
    }
    appendChildren(target, ...children) {
        target.append(...children);
    }
    insertBeforeChildren(target, ...children) {
        target.prepend(...children);
    }
    wireFooterEvents(sendIcon, footer, footerTemplate) {
        if (sendIcon) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.add(sendIcon, 'click', this.onSendIconClick, this);
        }
        if (footer && !footerTemplate) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.add(footer, 'keydown', this.footerKeyHandler, this);
        }
    }
    unWireFooterEvents(sendIcon, footer, footerTemplate) {
        if (sendIcon) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.remove(sendIcon, 'click', this.onSendIconClick);
        }
        if (footer && !footerTemplate) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            EventHandler.remove(footer, 'keydown', this.footerKeyHandler);
        }
    }
    removeAndNullify(element) {
        if (element) {
            if (!isNullOrUndefined(element.parentNode)) {
                remove(element);
            }
            else {
                element.innerHTML = '';
            }
        }
    }
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    destroyAndNullify(obj) {
        if (obj) {
            obj.destroy();
            obj = null;
        }
    }
    /**
     * Gets template content based on the template property value.
     *
     * @param {string | Function} template - Template property value.
     * @param {boolean} notCompile - Compile property value.
     * @returns {Function} - Return template function.
     * @hidden
     */
    getTemplateFunction(template, notCompile) {
        if (typeof template === 'string') {
            let content = '';
            try {
                const tempEle = select(template);
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
    }
    /**
     * This method is abstract member of the Component<HTMLElement>.
     *
     * @param  {InterActiveChatBaseModel} newProp - Specifies new properties
     * @param  {InterActiveChatBaseModel} oldProp - Specifies old properties
     * @private
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    onPropertyChanged(newProp, oldProp) {
    }
};
__decorate([
    Event()
], InterActiveChatBase.prototype, "created", void 0);
InterActiveChatBase = __decorate([
    NotifyPropertyChanges
], InterActiveChatBase);

var __decorate$1 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const ASSISTHEADER = 'e-aiassist-header-text e-assist-view-header';
/* eslint-enable @typescript-eslint/no-misused-new, no-redeclare */
/**
 * The prompts property maps the list of the prompts and binds the data to the suggestions.
 */
class Prompt extends ChildProperty {
}
__decorate$1([
    Property(null)
], Prompt.prototype, "prompt", void 0);
__decorate$1([
    Property('')
], Prompt.prototype, "response", void 0);
__decorate$1([
    Property(null)
], Prompt.prototype, "isResponseHelpful", void 0);
/**
 * Specifies the type of assist view.
 */
var AssistViewType;
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
class AssistView extends ChildProperty {
}
__decorate$1([
    Property('Assist')
], AssistView.prototype, "type", void 0);
__decorate$1([
    Property('')
], AssistView.prototype, "name", void 0);
__decorate$1([
    Property()
], AssistView.prototype, "iconCss", void 0);
__decorate$1([
    Property()
], AssistView.prototype, "viewTemplate", void 0);
/**
 * The promptToolbarSettings property maps the list of the promptToolbarSettings and binds the data to the prompt.
 */
class PromptToolbarSettings extends ChildProperty {
}
__decorate$1([
    Property('100%')
], PromptToolbarSettings.prototype, "width", void 0);
__decorate$1([
    Collection([], ToolbarItem)
], PromptToolbarSettings.prototype, "items", void 0);
__decorate$1([
    Event()
], PromptToolbarSettings.prototype, "itemClicked", void 0);
/**
 * The responseToolbarSettings property maps the list of the responseToolbarSettings and binds the data to the output items.
 */
class ResponseToolbarSettings extends ChildProperty {
}
__decorate$1([
    Property('100%')
], ResponseToolbarSettings.prototype, "width", void 0);
__decorate$1([
    Collection([], ToolbarItem)
], ResponseToolbarSettings.prototype, "items", void 0);
__decorate$1([
    Event()
], ResponseToolbarSettings.prototype, "itemClicked", void 0);
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
let AIAssistView = class AIAssistView extends InterActiveChatBase {
    /**
     * Constructor for creating the component
     *
     * @param {AIAssistViewModel} options - Specifies the AIAssistViewModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.toolbarItems = [];
        this.displayContents = [];
        this.preTagElements = [];
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    }
    getDirective() {
        return 'EJS-AIASSISTVIEW';
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'aiassistview';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    render() {
        this.renderPromptView();
    }
    renderPromptView() {
        this.setDimension(this.element, this.width, this.height);
        this.renderViews();
        this.renderToolbar();
        this.updateTextAreaObject();
        this.wireEvents();
    }
    renderToolbar() {
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
    }
    renderViews() {
        this.assistViewTemplateIndex = -1;
        this.aiAssistViewRendered = false;
        this.isAssistView = false;
        this.isOutputRenderingStop = false;
        this.isResponseRequested = false;
        this.renderViewSections(this.element, 'e-view-header', 'e-view-content');
        let isAssistViewAssigned = false;
        let assistView;
        let customViewTemplate;
        let customViewCount = 1;
        if (this.views.length > 0) {
            for (let index = 0; index < this.views.length; index++) {
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
    }
    renderHeaderToolbar() {
        this.toolbar = new Toolbar({
            items: this.toolbarItems,
            height: '100%',
            enableRtl: this.enableRtl,
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false
                };
                if (this.toolbarSettings.itemClicked) {
                    this.toolbarSettings.itemClicked.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.htmlAttributes) {
                        const currentIndex = parseInt(args.item.htmlAttributes['data-index'].split(this.element.id + '_view_')[1], 10);
                        if (currentIndex !== this.activeView) {
                            const prevOnChange = this.isProtectedOnChange;
                            this.isProtectedOnChange = true;
                            const previousIndex = this.getIndex(this.activeView);
                            this.activeView = parseInt(args.item.htmlAttributes['data-index'].split(this.element.id + '_view_')[1], 10);
                            this.updateActiveView(previousIndex);
                            this.isProtectedOnChange = prevOnChange;
                        }
                    }
                }
            }
        });
        this.toolbarHeader = this.element.querySelector('.e-view-header');
        const toolbarEle = this.createElement('div');
        this.toolbar.appendTo(toolbarEle);
        this.toolbar.element.setAttribute('aria-label', 'assist-view-toolbar-header');
        this.toolbarHeader.appendChild(toolbarEle);
    }
    updateHeaderToolbar() {
        if (this.toolbarSettings.items.length > 0) {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const pushToolbar = this.toolbarSettings.items.map((item) => ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align
            }));
            this.toolbarItems = [...this.toolbarItems, ...pushToolbar];
        }
    }
    getIndex(currentIndex) {
        return (((currentIndex) > (this.views.length - (this.isAssistView ? 1 : 0))) || (currentIndex < 0)) ?
            0 : currentIndex;
    }
    updateActiveView(previousIndex) {
        const activeViewIndex = this.getIndex(this.activeView);
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
    }
    appendView(activeViewIndex) {
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
    }
    removePreviousView(previousIndex, activeViewIndex) {
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
    }
    renderDefaultView() {
        const viewWrapper = this.element.querySelector('.e-view-content');
        this.createViewComponents(viewWrapper);
        this.contentWrapper = this.element.querySelector('.e-views');
        this.contentWrapper.setAttribute('data-index', this.element.id + '_view_0');
        const contentContainer = this.element.querySelector('.e-view-container');
        this.content = this.getElement('contentContainer');
        this.footer = this.getElement('footer');
        const footerClass = `e-footer ${this.footerTemplate ? 'e-footer-template' : ''}`;
        this.footer.className = footerClass;
        this.renderContent();
        this.renderAssistViewFooter();
        this.renderBannerView(this.bannerTemplate, contentContainer, 'bannerTemplate');
        contentContainer.append(this.content);
        this.renderStopResponding();
    }
    renderStopResponding() {
        this.stopResponding = this.createElement('div', { attrs: { class: 'e-stop-response', tabIndex: '0', 'aria-label': 'Stop Responding', role: 'button' } });
        const stopRespondingIcon = this.createElement('span', { className: 'e-icons e-assist-stop' });
        this.stopRespondingContent = this.createElement('span', { className: 'e-stop-response-text' });
        this.l10n = new L10n('aiassistview', { stopResponseText: 'Stop Responding' }, this.locale);
        this.updateStopRespondingTitle();
        this.appendChildren(this.stopResponding, stopRespondingIcon, this.stopRespondingContent);
    }
    updateStopRespondingTitle() {
        this.l10n.setLocale(this.locale);
        this.stopRespondingContent.textContent = this.l10n.getConstant('stopResponseText');
    }
    renderContent() {
        this.renderSuggestions(this.promptSuggestions, this.promptSuggestionsHeader, this.promptSuggestionItemTemplate, 'promptSuggestion', 'promptSuggestionItemTemplate', this.onSuggestionClick);
        this.renderOutputContent();
        if (this.outputElement) {
            this.renderSkeleton();
        }
    }
    renderOutputContent(isMethodCall) {
        this.outputElement = this.getElement('outputElement');
        if (this.responseToolbarSettings.items.length === 0) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.responseToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy', cssClass: 'check' },
                { iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
                { iconCss: 'e-icons e-assist-dislike', tooltip: 'Dislike' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        if (this.prompts) {
            this.prompts.forEach((prompt, i) => {
                this.renderOutputContainer(prompt.prompt, prompt.response, i);
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
    }
    renderAssistViewFooter() {
        this.textareaObj = this.renderFooterContent(this.footerTemplate, this.footer, this.prompt, this.promptPlaceholder, this.showClearButton, this.getRowCount(''), 'e-assist-textarea');
        const sendIconClass = 'e-assist-send e-icons disabled';
        if (!this.footerTemplate) {
            this.sendIcon = this.renderSendIcon(sendIconClass, this.footer);
        }
        if (this.textareaObj) {
            this.textareaObj.input = this.handleInput.bind(this);
            this.activateSendIcon(this.textareaObj.value.length);
        }
    }
    handleInput(args) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = args.value;
        this.isProtectedOnChange = prevOnChange;
        this.activateSendIcon(args.value.length);
        this.updateTextAreaObject();
        const eventArgs = {
            value: args.value,
            previousValue: args.previousValue,
            event: args.event,
            element: this.textareaObj.element
        };
        this.trigger('promptChanged', eventArgs);
    }
    updateTextAreaObject() {
        if (isNullOrUndefined(this.textareaObj)) {
            return;
        }
        const textarea = this.textareaObj.element;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }
    getRowCount(textValue) {
        const lines = textValue.split('\n').length;
        return (lines < 10 ? (lines >= 1 ? lines : 1) : 10);
    }
    activateSendIcon(value) {
        this.sendIcon.classList.toggle('disabled', value === 0);
        this.sendIcon.classList.toggle('enabled', value > 0);
    }
    footerKeyHandler(e) {
        this.keyHandler(e, 'footer');
    }
    stopResponseKeyHandler(e) {
        this.keyHandler(e, 'stopresponse');
    }
    wireEvents() {
        this.wireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        if (this.stopResponding) {
            EventHandler.add(this.stopResponding, 'click', this.respondingStopper, this);
            EventHandler.add(this.stopResponding, 'keydown', this.stopResponseKeyHandler, this);
        }
        EventHandler.add(window, 'resize', this.updateTextAreaObject, this);
    }
    unWireEvents() {
        this.unWireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        if (this.stopResponding) {
            EventHandler.remove(this.stopResponding, 'click', this.respondingStopper);
            EventHandler.remove(this.stopResponding, 'keydown', this.stopResponseKeyHandler);
        }
        EventHandler.remove(window, 'resize', this.updateTextAreaObject);
        this.detachCodeCopyEventHandler();
    }
    detachCodeCopyEventHandler() {
        this.preTagElements.forEach(({ preTag, handler }) => {
            const copyIcon = preTag.querySelector('.e-code-copy');
            EventHandler.remove(copyIcon, 'click', handler);
        });
        this.preTagElements = [];
    }
    keyHandler(event, value) {
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
    }
    respondingStopper(event) {
        this.isOutputRenderingStop = true;
        this.isResponseRequested = false;
        this.lastStreamPrompt = '';
        if (this.outputElement.hasChildNodes) {
            const skeletonElement = this.element.querySelector('.e-loading-body');
            if (skeletonElement) {
                this.outputElement.removeChild(this.skeletonContainer);
            }
        }
        this.stopResponding.classList.remove('e-btn-active');
        const promptIndex = this.prompts ? this.prompts.length - 1 : -1;
        const eventArgs = {
            event: event,
            prompt: promptIndex >= 0 ? this.prompts[parseInt(promptIndex.toString(), 10)].prompt : '',
            dataIndex: this.prompts ? this.prompts.length - 1 : -1
        };
        this.trigger('stopRespondingClick', eventArgs);
    }
    onSuggestionClick(e) {
        this.suggestionsElement.hidden = true;
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompt = e.target.innerText;
        this.isProtectedOnChange = prevOnChange;
        this.onSendIconClick();
    }
    onSendIconClick() {
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
        const eventArgs = {
            cancel: false,
            responseToolbarItems: this.responseToolbarSettings.items,
            prompt: this.prompt,
            promptSuggestions: this.promptSuggestions
        };
        if (!this.footerTemplate) {
            const prevOnChange = this.isProtectedOnChange;
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
    }
    addPrompt() {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.prompts = [...this.prompts, { prompt: this.prompt, response: '', isResponseHelpful: null }];
        this.isProtectedOnChange = prevOnChange;
    }
    getContextObject(templateName, contentElement, index, arrayPosition) {
        let template;
        let context = {};
        const contextIndex = index >= 0 ? index : -1;
        const contextPrompt = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].prompt : '';
        const contextOutput = index >= 0 ? this.prompts[parseInt(contextIndex.toString(), 10)].response : '';
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
    }
    createOutputElement() {
        this.outputSuggestionEle = this.createElement('div', { attrs: { id: `e-prompt-item_${this.prompts.length - 1}`, class: `e-prompt-container ${this.promptItemTemplate ? 'e-prompt-item-template' : ''}` } });
        this.renderPrompt(this.prompt, this.prompts.length - 1);
        this.outputElement.append(this.outputSuggestionEle, this.skeletonContainer);
        this.skeletonContainer.hidden = false;
    }
    renderOutputContainer(promptText, outputText, index, isMethodCall, isFinalUpdate) {
        const outputContainer = this.createElement('div', { attrs: { id: `e-response-item_${index}`, class: `e-output-container ${this.responseItemTemplate ? 'e-response-item-template' : ''}` } });
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
    }
    renderOutput(outputContainer, promptText, outputText, isMethodCall, index, isFinalUpdate) {
        const promptIcon = this.createElement('span', {
            className: 'e-output-icon e-icons ' + (this.responseIconCss || (this.isAssistView && this.views[0].iconCss) || 'e-assistview-icon')
        });
        const aiOutputEle = this.createElement('div', { className: 'e-output' });
        if (!this.aiAssistViewRendered || isMethodCall) {
            if (!isNullOrUndefined(promptText)) {
                this.outputSuggestionEle = this.createElement('div', { attrs: { id: `e-prompt-item_${index}`, class: `e-prompt-container ${this.promptItemTemplate ? 'e-prompt-item-template' : ''}` } });
                this.renderPrompt(promptText, index);
            }
        }
        const lastPrompt = { prompt: promptText, response: outputText };
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
    }
    renderOutputTextContainer(response, aiOutputEle, index, isMethodCall, isFinalUpdate) {
        if (this.contentFooterEle) {
            this.contentFooterEle.classList.remove('e-assist-toolbar-active');
        }
        this.outputContentBodyEle = this.createElement('div', { attrs: { class: 'e-content-body', tabindex: '0' } });
        if (!isMethodCall) {
            this.outputContentBodyEle.innerHTML = response;
            const preTags = Array.from(this.outputContentBodyEle.querySelectorAll('pre'));
            preTags.forEach((preTag) => {
                const copyIcon = document.createElement('span');
                copyIcon.className = 'e-icons e-code-copy e-assist-copy';
                preTag.insertBefore(copyIcon, preTag.firstChild);
                this.preTagElements.push({ preTag, handler: this.getCopyHandler(preTag) });
                EventHandler.add(copyIcon, 'click', this.preTagElements[this.preTagElements.length - 1].handler);
            });
        }
        this.renderOutputToolbarItems(index, isFinalUpdate);
        this.appendChildren(aiOutputEle, this.outputContentBodyEle, this.contentFooterEle);
    }
    getCopyHandler(preTag) {
        return function () {
            const preText = preTag.innerText;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            window.navigator.clipboard.writeText(preText);
            const copyIcon = preTag.querySelector('.e-code-copy');
            copyIcon.className = 'e-icons e-code-copy e-assist-check';
            setTimeout(() => {
                copyIcon.className = 'e-icons e-code-copy e-assist-copy';
            }, 1000);
        };
    }
    renderOutputToolbarItems(index, isFinalUpdate) {
        this.contentFooterEle = this.createElement('div', { className: 'e-content-footer e-assist-toolbar-active' });
        const footerContent = this.createElement('div');
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
        this.responseToolbarEle.element.setAttribute('aria-label', `response-toolbar-${index}`);
        this.contentFooterEle.appendChild(footerContent);
    }
    renderResponseToolbar(index) {
        const pushToolbar = this.responseToolbarSettings.items.map((item) => {
            const toolbarItem = {
                type: item.type,
                visible: item.visible,
                disabled: item.disabled,
                tooltipText: item.tooltip,
                template: item.template,
                prefixIcon: item.iconCss,
                text: item.text,
                cssClass: item.cssClass,
                align: item.align,
                width: this.responseToolbarSettings.width
            };
            if (toolbarItem.prefixIcon === 'e-icons e-assist-like' && this.prompts[parseInt(index.toString(), 10)].isResponseHelpful) {
                toolbarItem.prefixIcon = 'e-icons e-assist-like-filled';
            }
            else if (toolbarItem.prefixIcon === 'e-icons e-assist-dislike' && this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false) {
                toolbarItem.prefixIcon = 'e-icons e-assist-dislike-filled';
            }
            return toolbarItem;
        });
        this.responseToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: index
                };
                if (this.responseToolbarSettings.itemClicked) {
                    this.responseToolbarSettings.itemClicked.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    this.handleItemClick(args, index);
                }
            }
        });
    }
    getClipBoardContent(value) {
        const tempElement = document.createElement('div');
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
    }
    handleItemClick(args, index) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        args.item.controlParent.element.querySelector('.e-assist-dislike');
        if (args.item.prefixIcon === 'e-icons e-assist-copy') {
            this.getClipBoardContent(this.prompts[parseInt(index.toString(), 10)].response);
            args.item.prefixIcon = 'e-icons e-assist-check';
            this.responseToolbarEle.dataBind();
            setTimeout(() => {
                args.item.prefixIcon = 'e-icons e-assist-copy';
                this.responseToolbarEle.dataBind();
            }, 1000);
        }
        const icon = args.item.prefixIcon;
        const isLikeInteracted = icon === 'e-icons e-assist-like-filled' || icon === 'e-icons e-assist-like';
        const isDislikeInteracted = icon === 'e-icons e-assist-dislike-filled' || icon === 'e-icons e-assist-dislike';
        if (isLikeInteracted || isDislikeInteracted) {
            let isHelpful = null;
            if (isLikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === true ? null : true;
            }
            else if (isDislikeInteracted) {
                isHelpful = this.prompts[parseInt(index.toString(), 10)].isResponseHelpful === false ? null : false;
            }
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompts[parseInt(index.toString(), 10)].isResponseHelpful = isHelpful;
            const promptItem = this.prompts[parseInt(index.toString(), 10)];
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
            const controlParentItems = args.item.controlParent.items;
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
    }
    renderPrompt(promptText, promptIndex) {
        const outputPrompt = this.createElement('div', { attrs: { class: 'e-prompt-text', tabindex: '0' } });
        const promptContent = this.createElement('div', { className: 'e-prompt-content' });
        const promptToolbarContainer = this.createElement('div', { className: 'e-prompt-toolbar' });
        const promptToolbar = this.createElement('div');
        const userIcon = this.createElement('span', { className: this.promptIconCss ? 'e-prompt-icon e-icons '
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
    }
    renderPromptToolbar(element, promptIndex) {
        let pushToolbar = [];
        if (this.promptToolbarSettings.items.length === 0) {
            pushToolbar = [
                { prefixIcon: 'e-icons e-assist-edit', tooltipText: 'Edit' },
                { prefixIcon: 'e-icons e-assist-copy', tooltipText: 'Copy' }
            ];
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.promptToolbarSettings.items = [
                { iconCss: 'e-icons e-assist-edit', tooltip: 'Edit' },
                { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' }
            ];
            this.isProtectedOnChange = prevOnChange;
        }
        else {
            pushToolbar = this.promptToolbarSettings.items.map((item) => ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align,
                width: this.promptToolbarSettings.width
            }));
        }
        this.promptToolbarEle = new Toolbar({
            items: pushToolbar,
            clicked: (args) => {
                const eventItemArgs = {
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
                const eventArgs = {
                    item: eventItemArgs,
                    event: args.originalEvent,
                    cancel: false,
                    dataIndex: promptIndex
                };
                if (this.promptToolbarSettings.itemClicked) {
                    this.promptToolbarSettings.itemClicked.call(this, eventArgs);
                }
                if (!eventArgs.cancel) {
                    if (args.item.prefixIcon === 'e-icons e-assist-edit') {
                        this.onEditIconClick(promptIndex);
                    }
                    if (args.item.prefixIcon === 'e-icons e-assist-copy') {
                        this.getClipBoardContent(this.prompts[parseInt(promptIndex.toString(), 10)].prompt);
                        args.item.prefixIcon = 'e-icons e-assist-check';
                        this.promptToolbarEle.dataBind();
                        setTimeout(() => {
                            args.item.prefixIcon = 'e-icons e-assist-copy';
                            this.promptToolbarEle.dataBind();
                        }, 1000);
                    }
                }
            }
        });
        this.promptToolbarEle.appendTo(element);
        this.promptToolbarEle.element.setAttribute('aria-label', `prompt-toolbar-${promptIndex}`);
    }
    renderSkeleton() {
        this.skeletonContainer = this.createElement('div', { className: 'e-output-container' });
        const outputViewWrapper = this.createElement('div', { className: 'e-output', styles: 'width: 70%;' });
        const skeletonIconEle = this.createElement('span', { className: 'e-output-icon e-skeleton e-skeleton-text e-shimmer-wave' });
        const skeletonBodyEle = this.createElement('div', { className: 'e-loading-body' });
        const skeletonFooterEle = this.createElement('div', { className: 'e-loading-footer' });
        const [skeletonLine1, skeletonLine2, skeletonLine3] = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 75%; height: 15px;' }),
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 50%; height: 15px;' })
        ];
        const [footerSkeleton] = [
            this.createElement('div', { className: 'e-skeleton e-skeleton-text e-shimmer-wave', styles: 'width: 100%; height: 30px;' })
        ];
        this.appendChildren(skeletonBodyEle, skeletonLine1, skeletonLine2, skeletonLine3);
        skeletonFooterEle.append(footerSkeleton);
        this.appendChildren(outputViewWrapper, skeletonBodyEle, skeletonFooterEle);
        this.appendChildren(this.skeletonContainer, skeletonIconEle, outputViewWrapper);
    }
    onEditIconClick(promptIndex) {
        if (this.textareaObj) {
            if (this.suggestionsElement) {
                this.suggestionsElement.hidden = true;
            }
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.textareaObj.value = this.prompt = this.prompts[parseInt(promptIndex.toString(), 10)].prompt;
            this.textareaObj.dataBind();
            this.updateTextAreaObject();
            this.textareaObj.focusIn();
            this.isProtectedOnChange = prevOnChange;
            this.activateSendIcon(this.prompt.length);
        }
    }
    updateIcons(newCss, isPromptIconCss = false) {
        let elements;
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
        for (let index = 0; index < (elements && elements.length); index++) {
            removeClass([elements[parseInt(index.toString(), 10)]], elements[parseInt(index.toString(), 10)].classList.toString().trim().split(' '));
            addClass([elements[parseInt(index.toString(), 10)]], newCss.trim().split(' '));
        }
    }
    updateToolbarSettings(previousToolbar) {
        const previousToolbarIndex = 0;
        for (let index = this.views.length; index < this.toolbarItems.length; index++) {
            if (previousToolbar.items[parseInt(previousToolbarIndex.toString(), 10)] === this.toolbarItems[parseInt(index.toString(), 10)]) {
                this.toolbarItems.splice(index, 1);
            }
        }
        this.updateHeaderToolbar();
        this.toolbar.items = this.toolbarItems;
    }
    updateResponse(response, index, isFinalUpdate, responseItem) {
        if (!this.responseItemTemplate && responseItem) {
            const outputContentBodyEle = responseItem.querySelector('.e-content-body');
            if (outputContentBodyEle) {
                outputContentBodyEle.innerHTML = response;
            }
        }
        else {
            this.renderOutputContainer(undefined, response, index, false, isFinalUpdate);
        }
    }
    destroy() {
        super.destroy();
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
    }
    destroyAssistView() {
        const properties = [
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
        for (const prop of properties) {
            const element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    }
    /**
     * Executes the specified prompt in the AIAssistView component. The method accepts a string representing the prompt.
     *
     * @param {string} prompt - The prompt text to be executed. It must be a non-empty string.
     *
     * @returns {void}
     */
    executePrompt(prompt) {
        if (!isNullOrUndefined(prompt) && prompt.trim().length > 0) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.prompt = prompt;
            this.isProtectedOnChange = prevOnChange;
            this.onSendIconClick();
        }
    }
    /**
     * Adds a response to the last prompt or appends a new prompt data in the AIAssistView component.
     *
     * @param {string | Object} outputResponse - The response to be added. Can be a string representing the response or an object containing both the prompt and the response.
     * - If `outputResponse` is a string, it updates the response for the last prompt in the prompts collection.
     * - If `outputResponse` is an object, it can either update the response of an existing prompt if the prompt matches or append a new prompt data.
     * @param {boolean} isFinalUpdate - Indicates whether this response is the final one, to hide the stop response button.
     * @returns {void}
     */
    addPromptResponse(outputResponse, isFinalUpdate = true) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (!this.isOutputRenderingStop) {
            const responseItem = this.element.querySelector(`#e-response-item_${this.prompts.length - 1}`);
            let lastPrompt = this.prompts[this.prompts.length - 1];
            if (typeof outputResponse === 'string') {
                if (!this.isResponseRequested) {
                    this.prompts = [...this.prompts, { prompt: null, response: null, isResponseHelpful: null }];
                    lastPrompt = this.prompts[this.prompts.length - 1];
                }
                lastPrompt.response = outputResponse;
                this.updateResponse(lastPrompt.response, this.prompts.length - 1, isFinalUpdate, responseItem);
            }
            if (typeof outputResponse === 'object') {
                const tPrompt = {
                    prompt: outputResponse.prompt,
                    response: outputResponse.response,
                    isResponseHelpful: isNullOrUndefined(outputResponse.isResponseHelpful) ? null :
                        outputResponse.isResponseHelpful
                };
                if (this.prompt === tPrompt.prompt || this.lastStreamPrompt === tPrompt.prompt) {
                    lastPrompt.response = tPrompt.response;
                    lastPrompt.isResponseHelpful = tPrompt.isResponseHelpful;
                    this.updateResponse(lastPrompt.response, this.prompts.length - 1, isFinalUpdate, responseItem);
                }
                else {
                    this.prompts = [...this.prompts, tPrompt];
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
    }
    /**
     * Scrolls the view to the bottom to display the most recent response in the AIAssistView component.
     * This method programmatically scrolls the view to the bottom,
     * typically used when new responses are added or to refocus on the latest response.
     *
     * @returns {void}
     */
    scrollToBottom() {
        this.updateScroll(this.contentWrapper);
    }
    /**
     * Called if any of the property value is changed.
     *
     * @param  {AIAssistViewModel} newProp - Specifies new properties
     * @param  {AIAssistViewModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
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
                    const suggestionHeaderElem = this.element.querySelector('.e-suggestions .e-suggestion-header');
                    if (!suggestionHeaderElem) {
                        this.suggestionsElement.append(this.suggestionHeader);
                    }
                    break;
                }
                case 'activeView': {
                    const previousViewIndex = this.getIndex(oldProp.activeView);
                    this.updateActiveView(previousViewIndex);
                    break;
                }
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove']('e-rtl');
                    if (!isNullOrUndefined(this.toolbar)) {
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
    }
};
__decorate$1([
    Property('')
], AIAssistView.prototype, "prompt", void 0);
__decorate$1([
    Property('Type prompt for assistance...')
], AIAssistView.prototype, "promptPlaceholder", void 0);
__decorate$1([
    Collection([], Prompt)
], AIAssistView.prototype, "prompts", void 0);
__decorate$1([
    Property([])
], AIAssistView.prototype, "promptSuggestions", void 0);
__decorate$1([
    Property('')
], AIAssistView.prototype, "promptSuggestionsHeader", void 0);
__decorate$1([
    Property(true)
], AIAssistView.prototype, "showHeader", void 0);
__decorate$1([
    Complex({ items: [] }, ToolbarSettings)
], AIAssistView.prototype, "toolbarSettings", void 0);
__decorate$1([
    Property(0)
], AIAssistView.prototype, "activeView", void 0);
__decorate$1([
    Property(null)
], AIAssistView.prototype, "promptIconCss", void 0);
__decorate$1([
    Property(null)
], AIAssistView.prototype, "responseIconCss", void 0);
__decorate$1([
    Property('100%')
], AIAssistView.prototype, "width", void 0);
__decorate$1([
    Property('100%')
], AIAssistView.prototype, "height", void 0);
__decorate$1([
    Property('')
], AIAssistView.prototype, "cssClass", void 0);
__decorate$1([
    Collection([], AssistView)
], AIAssistView.prototype, "views", void 0);
__decorate$1([
    Complex({ width: null, items: [] }, PromptToolbarSettings)
], AIAssistView.prototype, "promptToolbarSettings", void 0);
__decorate$1([
    Complex({ width: null, items: [] }, ResponseToolbarSettings)
], AIAssistView.prototype, "responseToolbarSettings", void 0);
__decorate$1([
    Property(false)
], AIAssistView.prototype, "showClearButton", void 0);
__decorate$1([
    Property('')
], AIAssistView.prototype, "footerTemplate", void 0);
__decorate$1([
    Property('')
], AIAssistView.prototype, "promptItemTemplate", void 0);
__decorate$1([
    Property('')
], AIAssistView.prototype, "responseItemTemplate", void 0);
__decorate$1([
    Property('')
], AIAssistView.prototype, "promptSuggestionItemTemplate", void 0);
__decorate$1([
    Property('')
], AIAssistView.prototype, "bannerTemplate", void 0);
__decorate$1([
    Event()
], AIAssistView.prototype, "promptRequest", void 0);
__decorate$1([
    Event()
], AIAssistView.prototype, "promptChanged", void 0);
__decorate$1([
    Event()
], AIAssistView.prototype, "stopRespondingClick", void 0);
AIAssistView = __decorate$1([
    NotifyPropertyChanges
], AIAssistView);

var __decorate$2 = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class MessageStatus extends ChildProperty {
}
__decorate$2([
    Property('')
], MessageStatus.prototype, "iconCss", void 0);
__decorate$2([
    Property('')
], MessageStatus.prototype, "text", void 0);
__decorate$2([
    Property('')
], MessageStatus.prototype, "tooltip", void 0);
/**
 * Represents a user model for a messages in the chatUI component.
 */
class User extends ChildProperty {
}
__decorate$2([
    Property('')
], User.prototype, "id", void 0);
__decorate$2([
    Property('Default')
], User.prototype, "user", void 0);
__decorate$2([
    Property('')
], User.prototype, "avatarUrl", void 0);
__decorate$2([
    Property('')
], User.prototype, "avatarBgColor", void 0);
__decorate$2([
    Property('')
], User.prototype, "cssClass", void 0);
/**
 *  Represents a model for a messages in the chatUI component.
 */
class Message extends ChildProperty {
}
__decorate$2([
    Property('')
], Message.prototype, "id", void 0);
__decorate$2([
    Property('')
], Message.prototype, "text", void 0);
__decorate$2([
    Complex({}, User)
], Message.prototype, "author", void 0);
__decorate$2([
    Property('')
], Message.prototype, "timeStamp", void 0);
__decorate$2([
    Property('')
], Message.prototype, "timeStampFormat", void 0);
__decorate$2([
    Complex({}, MessageStatus)
], Message.prototype, "status", void 0);
let ChatUI = class ChatUI extends InterActiveChatBase {
    /**
     * Constructor for creating the component
     *
     * @param {ChatUIModel} options - Specifies the ChatUIModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    constructor(options, element) {
        super(options, element);
        this.multiplier = 3;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    preRender() {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    }
    getDirective() {
        return 'EJS-CHATUI';
    }
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    getModuleName() {
        return 'chat-ui';
    }
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    getPersistData() {
        return this.addOnPersist([]);
    }
    render() {
        this.renderChatUIView();
    }
    renderChatUIView() {
        this.intl = new Internationalization();
        this.setDimension(this.element, this.width, this.height);
        this.renderViewSections(this.element, 'e-chat-header', 'e-chat-content');
        this.viewWrapper = this.element.querySelector('.e-chat-content');
        this.chatHeader = this.element.querySelector('.e-chat-header');
        this.renderChatHeader();
        this.renderChatContentElement();
        this.renderChatSuggestionsElement();
        this.renderChatFooterContent();
        this.addCssClass(this.element, this.cssClass);
        this.addRtlClass(this.element, this.enableRtl);
        this.updateHeader(this.showHeader, this.chatHeader, this.viewWrapper);
        if (isNullOrUndefined(this.messages) || this.messages.length <= 0) {
            this.renderBannerView(this.emptyChatTemplate, this.messageWrapper, 'emptyChatTemplate');
            this.isEmptyChatTemplateRendered = isNullOrUndefined(this.messageWrapper.querySelector('.e-empty-chat-template')) ? false : true;
        }
        this.wireEvents();
        this.renderTypingIndicator();
        this.updateScrollPosition(false, 0);
    }
    updateScrollPosition(isMethodCall, timeDelay) {
        if (this.isReact || this.isAngular) {
            setTimeout(() => {
                if (isMethodCall) {
                    this.handleAutoScroll();
                }
                else {
                    this.scrollToBottom();
                }
            }, timeDelay);
        }
        else {
            this.scrollToBottom();
        }
    }
    renderChatHeader() {
        if (this.headerText) {
            const headerContainer = this.createElement('div', { className: 'e-header' });
            if (this.headerIconCss) {
                const iconElement = this.createElement('span', { className: `e-header-icon e-icons ${this.headerIconCss}` });
                headerContainer.appendChild(iconElement);
            }
            const headerTextElement = this.createElement('div', { className: 'e-header-text' });
            headerTextElement.innerHTML = this.headerText;
            headerContainer.appendChild(headerTextElement);
            this.chatHeader.appendChild(headerContainer);
            this.renderChatHeaderToolbar(headerContainer);
        }
    }
    renderChatHeaderToolbar(headerContainer) {
        if (!isNullOrUndefined(this.headerToolbar) && this.headerToolbar.items.length > 0) {
            const toolbarEle = this.createElement('div', { className: 'e-chat-toolbar' });
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            const pushToolbar = this.headerToolbar.items.map((item) => ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align
            }));
            this.toolbar = new Toolbar({
                items: pushToolbar,
                height: '100%',
                enableRtl: this.enableRtl,
                clicked: (args) => {
                    const eventItemArgs = {
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
                    const eventArgs = {
                        item: eventItemArgs,
                        event: args.originalEvent,
                        cancel: false
                    };
                    if (this.headerToolbar.itemClicked) {
                        this.headerToolbar.itemClicked.call(this, eventArgs);
                    }
                }
            });
            this.toolbar.appendTo(toolbarEle);
            headerContainer.appendChild(toolbarEle);
        }
    }
    updateHeaderToolbar() {
        const headerContainer = this.chatHeader.querySelector('.e-header');
        if (!isNullOrUndefined(this.toolbar)) {
            const pushToolbar = this.headerToolbar.items.map((item) => ({
                type: item.type,
                template: item.template,
                disabled: item.disabled,
                cssClass: item.cssClass,
                visible: item.visible,
                tooltipText: item.tooltip,
                prefixIcon: item.iconCss,
                text: item.text,
                align: item.align
            }));
            this.toolbar.items = pushToolbar;
        }
        else {
            this.renderChatHeaderToolbar(headerContainer);
        }
    }
    renderChatContentElement() {
        this.messageWrapper = this.createElement('div', { className: 'e-message-wrapper', attrs: { 'tabindex': '0' } });
        this.viewWrapper.prepend(this.messageWrapper);
        this.content = this.createElement('div', { className: 'e-typing-suggestions' });
        this.viewWrapper.append(this.content);
        this.renderScrollDown();
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
    }
    setChatMsgId() {
        if (this.messages && this.messages.length > 0) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages = this.messages.map((msg, index) => {
                return Object.assign({}, msg, { id: msg.id || `${this.element.id}-message-${index + 1}` });
            });
            this.isProtectedOnChange = prevOnChange;
        }
    }
    renderScrollDown() {
        const scrollDownButton = this.createElement('button', { id: 'scrollDownButton' });
        this.downArrowIcon = new Fab({
            iconCss: 'e-icons e-chat-scroll-down',
            position: 'BottomRight',
            target: this.content,
            isPrimary: false
        });
        this.downArrowIcon.appendTo(scrollDownButton);
    }
    loadBatch() {
        for (let i = this.startIndex - 1; i >= 0; i--) {
            const currIndex = i; // To pass the actual index of the reversed item.
            const prevIndex = i === this.messages.length - 1 ? -1 : currIndex + 1;
            this.updateMessageTimeFormats(this.messages[parseInt(i.toString(), 10)], currIndex);
            const currentMessageDate = this.getMessageDate(currIndex);
            currentMessageDate.setHours(0, 0, 0, 0);
            if (Math.min(currIndex, prevIndex) >= 0) {
                const lastMessageDate = this.getMessageDate(prevIndex);
                lastMessageDate.setHours(0, 0, 0, 0);
                if (currentMessageDate.getTime() === lastMessageDate.getTime()) {
                    const prevTimeBreak = this.messageWrapper.querySelectorAll('.e-timebreak')[0];
                    if (prevTimeBreak) {
                        prevTimeBreak.remove();
                    }
                }
            }
            this.renderGroup(this.messageWrapper, this.messages[parseInt(i.toString(), 10)], true, currIndex, prevIndex);
            if (this.showTimeBreak) {
                this.messageWrapper.prepend(this.createTimebreakElement(currentMessageDate));
            }
            const viewportHeight = window.innerHeight;
            const loadHeight = viewportHeight * this.multiplier;
            this.startIndex = i;
            if (this.messageWrapper.scrollHeight > loadHeight) {
                break;
            }
        }
    }
    renderMessageGroup(chatContentWrapper) {
        if (this.loadOnDemand) {
            if (this.messages && this.messages.length <= 0) {
                return;
            }
            createSpinner({ target: this.messageWrapper });
            this.startIndex = this.messages.length;
            this.loadBatch();
        }
        else {
            this.messages.forEach((msg, i) => {
                this.renderGroup(chatContentWrapper, msg, false, i, i - 1);
            });
        }
    }
    isTimeBreakAdded(chatContentWrapper, loadOldChat) {
        return loadOldChat ?
            chatContentWrapper.firstElementChild.classList.contains('e-timebreak') :
            chatContentWrapper.lastElementChild.classList.contains('e-timebreak');
    }
    getLastUser(prevIndex) {
        if (prevIndex >= 0) {
            return this.messages[parseInt(prevIndex.toString(), 10)].author.id;
        }
        return '';
    }
    renderGroup(chatContentWrapper, msg, loadOldChat, index, prevIndex) {
        let messageGroup;
        if (!loadOldChat) {
            this.updateMessageTimeFormats(msg, index);
            this.handleTimeBreak(prevIndex, index, loadOldChat);
        }
        if (msg.author.id === this.user.id) {
            const hasTimeBreak = this.showTimeBreak && this.isTimeBreakAdded(chatContentWrapper, loadOldChat);
            if ((msg.author.id !== this.getLastUser(prevIndex)) || hasTimeBreak) {
                messageGroup = this.createElement('div', { className: `e-message-group e-right ${this.messageTemplate ? 'e-message-item-template' : ''}` });
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
            else {
                const length = this.element.querySelectorAll('.e-message-group.e-right').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-right')[loadOldChat ? 0 : length - 1];
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
        }
        else {
            if (this.getLastUser(prevIndex) !== msg.author.id || this.isTimeVaries(index, prevIndex)) {
                messageGroup = this.createElement('div', { className: `e-message-group e-left ${this.messageTemplate ? 'e-message-item-template' : ''}` });
                const avatarElement = this.createAvatarIcon(msg.author, false);
                if (!this.messageTemplate) {
                    messageGroup.prepend(avatarElement);
                }
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                if (this.loadOnDemand) {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
                else {
                    this.createLeftGroupItems(messageGroup, msg, index);
                    this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
                }
            }
            else {
                const length = this.element.querySelectorAll('.e-message-group.e-left').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-left')[loadOldChat ? 0 : length - 1];
                if (!loadOldChat) {
                    this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
                }
                else {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
            }
        }
    }
    isTimeVaries(index, prevIndex) {
        const currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        const lastMessageDate = this.getMessageDate(prevIndex);
        lastMessageDate.setHours(0, 0, 0, 0);
        return currentMessageDate.getTime() !== lastMessageDate.getTime();
    }
    loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup) {
        // To check if the previous author is the same as the current author. If not, create a group header.
        const isAnyMsgPresent = this.messages[parseInt((index - 1).toString(), 10)] ? true : false;
        const prevAuthorId = isAnyMsgPresent ? this.messages[parseInt((index - 1).toString(), 10)].author.id : '';
        const shouldCreateHeader = prevAuthorId !== msg.author.id ? true : false;
        if (shouldCreateHeader || this.isTimeVaries(index, index - 1)) {
            this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
            this.createLeftGroupItems(messageGroup, msg, index);
        }
        else {
            this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
        }
    }
    createLeftGroupItems(messageGroup, msg, index) {
        if (this.messageTemplate) {
            return;
        }
        const userHeaderContainer = this.createElement('div', {
            className: 'e-message-header-container'
        });
        const userHeader = this.createElement('div', {
            className: 'e-message-header'
        });
        userHeader.innerHTML = msg.author.user;
        const timeSpan = this.getTimeStampElement(msg.timeStamp
            ? msg.timeStamp
            : new Date(), msg.timeStampFormat, index);
        this.appendChildren(userHeaderContainer, userHeader, timeSpan);
        this.insertBeforeChildren(messageGroup, userHeaderContainer);
    }
    createAvatarIcon(author, isTypingUser) {
        const userName = author.user.trim();
        const nameParts = userName.split(' ');
        const initials = nameParts.length > 1
            ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
            : userName[0];
        const avatarIcon = this.createElement((!isNullOrUndefined(author.avatarUrl) && author.avatarUrl !== '') ? 'img' : 'span', { className: ` ${!isTypingUser ? 'e-message-icon' : 'e-user-icon'} ${author.cssClass}` });
        if (author.avatarBgColor) {
            avatarIcon.style.backgroundColor = author.avatarBgColor;
        }
        if (!isNullOrUndefined(author.avatarUrl) && author.avatarUrl !== '') {
            avatarIcon.src = author.avatarUrl;
            avatarIcon.alt = userName;
        }
        else {
            avatarIcon.innerHTML = initials;
        }
        return avatarIcon;
    }
    getTimeStampElement(timeStamp, timeStampFormat, index) {
        const formattedTime = this.getFormattedTime(timeStamp, timeStampFormat);
        return this.createElement('div', {
            className: 'e-time',
            innerHTML: this.showTimeStamp ? formattedTime : ''
        });
    }
    updateTimeFormats(timeStampFormat, fullTime, index) {
        if (this.messages[parseInt(index.toString(), 10)]) {
            const prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages[parseInt(index.toString(), 10)].timeStamp = this.intl.parseDate(fullTime, { format: 'dd/MM/yyyy hh:mm a' });
            this.messages[parseInt(index.toString(), 10)].timeStampFormat = timeStampFormat;
            this.isProtectedOnChange = prevOnChange;
        }
    }
    getFormattedTime(timeStamp, timeStampFormat) {
        timeStamp = typeof timeStamp === 'string' ? new Date(timeStamp) : timeStamp;
        return this.intl.formatDate(timeStamp, { format: this.getFormat(timeStampFormat) });
    }
    getFormat(timeStampFormat) {
        const hasValue = !isNullOrUndefined(timeStampFormat) && timeStampFormat.length > 0;
        return hasValue ? timeStampFormat
            : (!isNullOrUndefined(this.timeStampFormat) && this.timeStampFormat.length) ? this.timeStampFormat : 'dd/MM/yyyy hh:mm a';
    }
    addGroupItems(msg, messageGroup, isUserTimeStampRendered, showStatus, index, loadOldChat) {
        const messageItem = this.createElement('div', { className: 'e-message-item', id: `${msg.id}` });
        const messageStatusWrapper = this.createElement('div', { className: 'e-status-wrapper' });
        const timeSpan = this.getTimeStampElement(msg.timeStamp ? msg.timeStamp : new Date(), msg.timeStampFormat, index);
        const textElement = this.createElement('div', {
            className: 'e-text',
            innerHTML: msg.text
        });
        if (this.messageTemplate) {
            this.getContextObject('messageTemplate', messageGroup, index, msg);
        }
        else {
            if (!isUserTimeStampRendered) {
                messageItem.appendChild(timeSpan);
            }
            if (showStatus) {
                const messageElement = this.createElement('div', { className: 'e-status-item' });
                const statusIcon = this.createElement('span', { attrs: { class: `e-status-icon ${msg.status ? msg.status.iconCss : ''}`, title: `${msg.status ? msg.status.tooltip : ''}` } });
                const statusText = this.createElement('div', { innerHTML: msg.status ? msg.status.text : '', className: 'e-status-text' });
                this.appendChildren(messageElement, textElement, statusIcon);
                this.appendChildren(messageStatusWrapper, messageElement, statusText);
                messageItem.appendChild(messageStatusWrapper);
            }
            else {
                messageItem.appendChild(textElement);
            }
            this.manageChatContent(loadOldChat, messageGroup, messageItem);
        }
    }
    manageChatContent(loadOldChat, parentItem, ChildItem) {
        if (loadOldChat) {
            parentItem.prepend(ChildItem);
        }
        else {
            parentItem.appendChild(ChildItem);
        }
    }
    createTimebreakElement(date) {
        const timebreakDiv = this.createElement('div', { className: `e-timebreak ${this.timeBreakTemplate ? 'e-timebreak-template' : ''}` });
        const formattedTime = this.getFormattedTime(date, 'MMMM d, yyyy');
        if (this.timeBreakTemplate) {
            this.getContextObject('timeBreakTemplate', timebreakDiv, null, null, date);
        }
        else {
            const timeStampEle = this.createElement('span', { className: 'e-timestamp' });
            timeStampEle.innerHTML = formattedTime;
            timebreakDiv.appendChild(timeStampEle);
        }
        return timebreakDiv;
    }
    handleTimeBreak(lastMsgIndex, index, loadOldChat) {
        if (!this.showTimeBreak) {
            return;
        }
        const currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        if (lastMsgIndex === -1) {
            this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
        }
        else if (index > 0) {
            const lastMessageDate = this.getMessageDate(lastMsgIndex);
            lastMessageDate.setHours(0, 0, 0, 0);
            if ((currentMessageDate.getTime() !== lastMessageDate.getTime()) && !loadOldChat) {
                this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
            }
        }
    }
    renderNewMessage(msg, index) {
        if (this.isEmptyChatTemplateRendered) {
            const introContainer = this.messageWrapper.querySelector('.e-empty-chat-template');
            this.messageWrapper.removeChild(introContainer);
            this.isEmptyChatTemplateRendered = false;
        }
        this.renderGroup(this.messageWrapper, msg, false, index, index - 1);
    }
    loadMoreMessages() {
        if (this.startIndex <= 0) {
            return;
        }
        const currentScrollOffset = this.messageWrapper.scrollHeight - this.messageWrapper.scrollTop;
        showSpinner(this.messageWrapper);
        setTimeout(() => {
            hideSpinner(this.messageWrapper);
            this.loadBatch();
            this.messageWrapper.scrollTop = this.messageWrapper.scrollHeight - currentScrollOffset;
        }, 1000);
    }
    updateMessageTimeFormats(msg, index) {
        const fullTime = this.getFormattedTime(msg.timeStamp
            ? msg.timeStamp
            : new Date(), 'dd/MM/yyyy hh:mm a');
        this.updateTimeFormats(msg.timeStampFormat, fullTime, index);
    }
    getMessageDate(index) {
        return new Date(this.messages[parseInt(index.toString(), 10)].timeStamp);
    }
    renderChatSuggestionsElement() {
        if (!isNullOrUndefined(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
    }
    handleSuggestionUpdate() {
        if (this.suggestionsElement) {
            this.suggestionsElement.remove();
        }
        if (!isNullOrUndefined(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
        this.toggleScrollIcon();
    }
    onSuggestionClick(e) {
        this.suggestionsElement.hidden = true;
        this.textareaObj.value = e.target.innerText;
        this.onSendIconClick(e);
    }
    renderChatFooterContent() {
        this.footer = this.getElement('footer');
        const footerClass = `e-footer ${this.footerTemplate ? 'e-footer-template' : ''}`;
        this.footer.className = footerClass;
        this.renderChatFooter();
        this.viewWrapper.append(this.footer);
        this.updateFooter(this.showFooter, this.footer);
    }
    renderChatFooter() {
        this.textareaObj = this.renderFooterContent(this.footerTemplate, this.footer, '', this.placeholder, false, this.getRowCount(''), 'e-chat-textarea');
        const sendIconClass = 'e-chat-send e-icons disabled';
        if (!this.footerTemplate) {
            this.sendIcon = this.renderSendIcon(sendIconClass, this.footer);
        }
        if (this.textareaObj) {
            this.textareaObj.input = this.handleInput.bind(this);
            this.textareaObj.blur = (args) => this.triggerUserTyping(args.event, args.value);
            if (!isNullOrUndefined(this.textareaObj.value)) {
                this.activateSendIcon(this.textareaObj.value.length);
            }
        }
    }
    handleInput(args) {
        this.triggerUserTyping(args.event, args.value);
        this.activateSendIcon(args.value.length);
        this.updateTextAreaObject(args.value);
    }
    triggerUserTyping(event, value) {
        const eventArgs = {
            event: event,
            message: value,
            user: this.user,
            isTyping: event.type === 'blur' ? false : value.length > 0 ? true : false
        };
        this.trigger('userTyping', eventArgs);
    }
    renderTypingIndicator() {
        this.l10n = new L10n('chat-ui', {
            oneUserTyping: '{0} is typing',
            twoUserTyping: '{0} and {1} are typing',
            threeUserTyping: '{0}, {1}, and {2} other are typing',
            multipleUsersTyping: '{0}, {1}, and {2} others are typing'
        }, this.locale);
        if (this.indicatorWrapper) {
            this.indicatorWrapper.remove();
        }
        if (!this.typingUsers || this.typingUsers.length === 0) {
            return;
        }
        this.indicatorWrapper = this.createElement('div', {
            className: `e-typing-indicator ${this.typingUsersTemplate ? 'e-typing-indicator-template' : ''}`
        });
        if (this.typingUsersTemplate) {
            this.getContextObject('typingUsersTemplate', this.indicatorWrapper, null, null, null);
        }
        else {
            this.typingUsers.slice(0, 3).forEach((user) => {
                const avatarElement = this.createAvatarIcon(user, true);
                this.indicatorWrapper.appendChild(avatarElement);
            });
            const typingMessage = this.createElement('span', { className: 'e-user-text' });
            this.indicatorWrapper.appendChild(typingMessage);
            this.updateUserText();
            const indicatorContainer = this.createElement('div', { className: 'e-indicator-wrapper' });
            for (let i = 0; i < 3; i++) {
                const indicator = this.createElement('span', {
                    className: 'e-indicator'
                });
                this.appendChildren(indicatorContainer, indicator);
            }
            this.indicatorWrapper.appendChild(indicatorContainer);
        }
        this.content.prepend(this.indicatorWrapper);
    }
    updateUserText() {
        if (this.typingUsersTemplate) {
            return;
        }
        this.l10n.setLocale(this.locale);
        const userNames = this.typingUsers.filter((user) => user.user !== this.user.user)
            .map((user) => user.user);
        const displayText = this.getTypingMessage(userNames);
        const typingMessage = this.indicatorWrapper.querySelector('.e-user-text');
        typingMessage.innerHTML = displayText;
    }
    getTypingMessage(userNames) {
        if (userNames.length >= 3) {
            return this.l10n.getConstant(userNames.length > 3 ? 'multipleUsersTyping' : 'threeUserTyping')
                .replace('{0}', userNames[0].toString())
                .replace('{1}', userNames[1].toString())
                .replace('{2}', (userNames.length - 2).toString());
        }
        else {
            const userTemplate = this.l10n.getConstant(userNames.length === 2 ? 'twoUserTyping' : 'oneUserTyping');
            return userNames.length === 2
                ? userTemplate.replace('{0}', userNames[0].toString()).replace('{1}', userNames[1].toString())
                : userTemplate.replace('{0}', userNames[0].toString());
        }
    }
    updateTypingUsers(users) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.typingUsers = users;
        this.isProtectedOnChange = prevOnChange;
        this.renderTypingIndicator();
    }
    updateTextAreaObject(textValue) {
        const rowCount = this.getRowCount(textValue);
        this.textareaObj.rows = rowCount;
        this.textareaObj.cssClass = (rowCount >= 10) ? 'show-scrollbar' : 'hide-scrollbar';
    }
    getRowCount(textValue) {
        const lines = textValue.split('\n').length;
        return (lines < 10 ? (lines >= 1 ? lines : 1) : 10);
    }
    activateSendIcon(value) {
        this.sendIcon.classList.toggle('disabled', value === 0);
        this.sendIcon.classList.toggle('enabled', value > 0);
    }
    updateHeaderIcon() {
        const existingIconElement = this.element.querySelector('.e-header-icon');
        if (existingIconElement) {
            existingIconElement.className = `e-header-icon e-icons ${this.headerIconCss}`;
        }
        else {
            const headerContainer = this.element.querySelector('.e-header');
            if (headerContainer) {
                const iconElement = this.createElement('span', {
                    className: `e-header-icon e-icons ${this.headerIconCss}`
                });
                headerContainer.prepend(iconElement);
            }
        }
    }
    updateHeaderText() {
        if (this.headerText) {
            const headerTextEle = this.element.querySelector('.e-header-text');
            if (headerTextEle) {
                headerTextEle.innerHTML = this.headerText;
            }
        }
    }
    renderUpdatedMessage() {
        this.messageWrapper.innerHTML = '';
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
    }
    onSendIconClick(event) {
        if (!this.textareaObj.value.trim()) {
            return;
        }
        let newMessageObj = {
            id: `${this.element.id}-message-${this.messages.length + 1}`,
            author: this.user,
            text: this.textareaObj.value
        };
        const prevOnChange = this.isProtectedOnChange;
        this.textareaObj.value = '';
        this.activateSendIcon(this.textareaObj.value.length);
        const eventArgs = {
            cancel: false,
            message: newMessageObj
        };
        this.triggerUserTyping(event, '');
        this.trigger('messageSend', eventArgs, (args) => {
            if (args.cancel) {
                return;
            }
            newMessageObj = args.message;
            this.isProtectedOnChange = true;
            this.messages = [...this.messages, newMessageObj];
            this.isProtectedOnChange = prevOnChange;
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        });
        if (this.suggestionsElement) {
            this.suggestionsElement.hidden = false;
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(false, 5);
    }
    getContextObject(templateName, contentElement, index, message, currentMessagedate) {
        let template;
        let context = {};
        switch (templateName.toLowerCase()) {
            case 'messagetemplate': {
                template = this.messageTemplate;
                context = { message: message, index: index };
                break;
            }
            case 'timebreaktemplate': {
                template = this.timeBreakTemplate;
                context = { messageDate: currentMessagedate };
                break;
            }
            case 'typinguserstemplate': {
                template = this.typingUsersTemplate;
                context = { users: this.typingUsers };
                break;
            }
        }
        this.updateContent(template, contentElement, context, templateName);
    }
    handleAutoScroll() {
        if (this.isScrollAtBottom) {
            this.updateScroll(this.messageWrapper);
        }
        if (this.autoScrollToBottom) {
            this.updateScroll(this.messageWrapper);
        }
        this.toggleScrollIcon();
    }
    footerKeyHandler(e) {
        this.keyHandler(e, 'footer');
    }
    scrollBottomKeyHandler(e) {
        this.keyHandler(e, 'scrollBottom');
    }
    keyHandler(event, value) {
        if (event.key === 'Enter' && !event.shiftKey) {
            switch (value) {
                case 'footer':
                    event.preventDefault();
                    this.onSendIconClick(event);
                    this.updateTextAreaObject(this.textareaObj.value);
                    break;
                case 'scrollBottom':
                    this.scrollToBottom();
                    break;
            }
        }
    }
    updateFooter(showFooter, footerElement) {
        if (!showFooter) {
            footerElement.hidden = true;
        }
        else {
            footerElement.hidden = false;
        }
    }
    handleScroll() {
        const atBottom = this.checkScrollAtBottom();
        if (atBottom) {
            this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
            const suggestionEle = this.element.querySelector('.e-suggestions');
            if (suggestionEle) {
                this.toggleClassName(suggestionEle, atBottom, 'suggestion');
                if (!atBottom || !this.isScrollAtBottom) {
                    this.updateScroll(this.messageWrapper);
                }
            }
        }
        if (this.loadOnDemand && this.messageWrapper.scrollTop === 0) {
            this.multiplier += this.multiplier;
            this.loadMoreMessages();
        }
        this.isScrollAtBottom = atBottom;
    }
    checkScrollAtBottom() {
        const scrollThreshold = 5;
        const scrollTop = Math.floor(this.messageWrapper.scrollTop);
        const scrollHeight = Math.floor(this.messageWrapper.scrollHeight);
        const clientHeight = Math.floor(this.messageWrapper.clientHeight);
        return scrollHeight - scrollTop <= clientHeight + scrollThreshold;
    }
    toggleClassName(element, atBottom, name) {
        switch (name) {
            case 'downArrow':
                element.classList.toggle('e-arrowdown-hide', atBottom);
                element.classList.toggle('e-arrowdown-show', !atBottom);
                break;
            case 'suggestion':
                element.classList.toggle('e-show-suggestions', atBottom);
                element.classList.toggle('e-hide-suggestions', !atBottom);
                break;
            case 'scroll':
                element.classList.toggle('e-scroll-smooth', !atBottom);
                break;
        }
    }
    toggleScrollIcon() {
        const atBottom = this.checkScrollAtBottom();
        this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
        const suggestionEle = this.element.querySelector('.e-suggestions');
        if (suggestionEle) {
            this.toggleClassName(suggestionEle, atBottom, 'suggestion');
            if (atBottom) {
                this.updateScroll(this.messageWrapper);
            }
        }
        this.isScrollAtBottom = atBottom;
    }
    scrollBtnClick() {
        this.toggleClassName(this.messageWrapper, false, 'scroll');
        this.scrollToBottom();
        this.toggleClassName(this.messageWrapper, true, 'scroll');
    }
    updateMessageItem(message, msgId) {
        if (message.author || message.timeStamp || this.messageTemplate) {
            this.renderUpdatedMessage();
            return;
        }
        const messageItem = this.messageWrapper.querySelector(`#${msgId}`);
        if (!messageItem) {
            return;
        }
        if (message.id) {
            messageItem.id = message.id;
        }
        const textElement = messageItem.querySelector('.e-text');
        if (textElement && message.text) {
            textElement.innerHTML = message.text;
        }
        if (message.status) {
            const statusTextElement = messageItem.querySelector('.e-status-text');
            if (statusTextElement && message.status.text) {
                statusTextElement.innerHTML = message.status.text;
            }
            const statusIconElement = messageItem.querySelector('.e-status-icon');
            if (statusIconElement && message.status.iconCss) {
                const iconCss = message.status.iconCss;
                statusIconElement.className = `e-status-icon ${iconCss}`;
                if (message.status.tooltip) {
                    statusIconElement.title = message.status.tooltip;
                }
            }
        }
    }
    wireEvents() {
        this.wireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        EventHandler.add(this.messageWrapper, 'scroll', this.handleScroll, this);
        EventHandler.add(this.downArrowIcon.element, 'click', this.scrollBtnClick, this);
        EventHandler.add(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler, this);
    }
    unwireEvents() {
        this.unWireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        EventHandler.remove(this.messageWrapper, 'scroll', this.handleScroll);
        EventHandler.remove(this.downArrowIcon.element, 'click', this.scrollBtnClick);
        EventHandler.remove(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler);
    }
    destroyChatUI() {
        const properties = [
            'content',
            'sendIcon',
            'footer',
            'indicatorWrapper',
            'messageWrapper',
            'viewWrapper',
            'chatHeader'
        ];
        for (const prop of properties) {
            const element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    }
    /**
     * Scrolls to the last message in the conversation area of the Chat UI component.
     * This method allows programmatic control to ensure the chat view is scrolled to the bottom, typically used when new messages are added or to refocus on the most recent conversation.
     *
     * @returns {void}
     */
    scrollToBottom() {
        this.updateScroll(this.messageWrapper);
        this.toggleScrollIcon();
    }
    /**
     * Appends a new message to the end of the Chat UI conversation area.
     * This method adds the specified message as the latest entry in the chat:
     *
     * @function addMessage
     * @param {string | MessageModel} message - The message to be added to the conversation. Accepts either a plain text string or a `MessageModel` object.
     * - If `message` is a string, a `MessageModel` will be automatically created with the current user’s details, and the message will be appended.
     * - If `message` is an instance of `MessageModel`, it can represent a message from either the current user or another participant and will be appended directly.
     * @returns {void} No return value.
     */
    addMessage(message) {
        if (isNullOrUndefined(message)) {
            return;
        }
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (typeof message === 'string') {
            const newMessageObj = {
                id: `${this.element.id}-message-${this.messages.length + 1}`,
                author: this.user,
                text: message,
                timeStamp: new Date(),
                timeStampFormat: this.timeStampFormat
            };
            this.messages = [...this.messages, newMessageObj];
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        else {
            const newMessageObj = Object.assign({}, message, { id: message.id || `${this.element.id}-message-${this.messages.length + 1}` });
            this.messages = [...this.messages, newMessageObj];
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(true, 5);
        this.isProtectedOnChange = prevOnChange;
    }
    /**
     * Updates an existing message in the Chat UI component.
     * This method allows for modifying a message that has already been added to the conversation.
     * It requires the unique identifier of the message to be updated and the new message content as a `MessageModel`.
     *
     * @function updateMessage
     * @param {MessageModel} message - The updated message content represented as a `MessageModel`.
     * @param {string} msgId - The unique identifier of the message to be updated.
     * @returns {void} No return value.
     */
    updateMessage(message, msgId) {
        const prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.messages = this.messages.map((messageItem) => messageItem.id === msgId ? Object.assign({}, messageItem, message) : messageItem);
        this.updateMessageItem(message, msgId);
        this.isProtectedOnChange = prevOnChange;
    }
    /**
     * Scrolls to a specific message in the Chat UI component based on the provided message ID.
     * Locates the message with the specified ID and scrolls it to the view.
     *
     * @function scrollToMessage
     * @param {string} messageId - The unique identifier of the message to navigate to the corresponding message rendered in the chat UI.
     * @returns {void}.
     */
    scrollToMessage(messageId) {
        const messageElement = this.messageWrapper.querySelector(`#${messageId}`);
        if (!messageElement) {
            return;
        }
        messageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
    /**
     * Sets focus for the input textarea in the Chat UI component.
     * Ensures that user input is directed to the chat input field.
     *
     * @function focus
     * @returns {void}.
     */
    focus() {
        if (this.textareaObj) {
            this.textareaObj.focusIn();
        }
    }
    destroy() {
        super.destroy();
        this.unwireEvents();
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.split(' '));
        }
        this.element.classList.remove('e-rtl');
        this.destroyAndNullify(this.textareaObj);
        this.destroyAndNullify(this.downArrowIcon);
        this.destroyAndNullify(this.toolbar);
        this.destroyChatUI();
        this.intl = null;
    }
    /**
     * Called if any of the property value is changed.
     *
     * @param  {ChatUIModel} newProp - Specifies new properties
     * @param  {ChatUIModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp, oldProp) {
        for (const prop of Object.keys(newProp)) {
            switch (prop) {
                case 'width':
                case 'height':
                    this.setDimension(this.element, this.width, this.height);
                    break;
                case 'placeholder':
                    if (this.textareaObj) {
                        this.textareaObj.placeholder = this.placeholder;
                    }
                    break;
                case 'cssClass':
                    this.updateCssClass(this.element, newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove']('e-rtl');
                    if (!isNullOrUndefined(this.toolbar)) {
                        this.toolbar.enableRtl = this.enableRtl;
                        this.toolbar.dataBind();
                    }
                    break;
                case 'showHeader':
                    this.updateHeader(this.showHeader, this.chatHeader, this.viewWrapper);
                    break;
                case 'headerText':
                    this.updateHeaderText();
                    break;
                case 'headerIconCss':
                    this.updateHeaderIcon();
                    break;
                case 'messages': {
                    this.renderUpdatedMessage();
                    // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
                    this.updateScrollPosition(true, 5);
                    break;
                }
                case 'user': {
                    const newUser = {
                        id: newProp.user.id,
                        user: newProp.user.user,
                        avatarUrl: newProp.user.avatarUrl,
                        avatarBgColor: newProp.user.avatarBgColor,
                        cssClass: newProp.user.cssClass
                    };
                    this.user = Object.assign({}, this.user, newUser);
                    break;
                }
                case 'showTimeStamp':
                case 'timeStampFormat':
                case 'showTimeBreak':
                    if (this.messages.length > 0) {
                        this.renderUpdatedMessage();
                    }
                    break;
                case 'showFooter':
                    this.updateFooter(this.showFooter, this.footer);
                    break;
                case 'autoScrollToBottom':
                    this.handleAutoScroll();
                    break;
                case 'suggestions':
                    this.handleSuggestionUpdate();
                    break;
                case 'typingUsers':
                    this.updateTypingUsers(this.typingUsers);
                    break;
                case 'locale':
                    if (!this.typingUsers || this.typingUsers.length === 0) {
                        return;
                    }
                    this.updateUserText();
                    break;
                case 'headerToolbar':
                    this.updateHeaderToolbar();
                    break;
                case 'currencyCode':
                    this.refresh();
                    break;
            }
        }
    }
};
__decorate$2([
    Property('100%')
], ChatUI.prototype, "width", void 0);
__decorate$2([
    Property('100%')
], ChatUI.prototype, "height", void 0);
__decorate$2([
    Complex({}, User)
], ChatUI.prototype, "user", void 0);
__decorate$2([
    Property('Chat')
], ChatUI.prototype, "headerText", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "headerIconCss", void 0);
__decorate$2([
    Property('Type your message…')
], ChatUI.prototype, "placeholder", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "cssClass", void 0);
__decorate$2([
    Property(true)
], ChatUI.prototype, "showHeader", void 0);
__decorate$2([
    Property(true)
], ChatUI.prototype, "showFooter", void 0);
__decorate$2([
    Complex({ items: [] }, ToolbarSettings)
], ChatUI.prototype, "headerToolbar", void 0);
__decorate$2([
    Property([])
], ChatUI.prototype, "suggestions", void 0);
__decorate$2([
    Property(false)
], ChatUI.prototype, "showTimeBreak", void 0);
__decorate$2([
    Collection([], Message)
], ChatUI.prototype, "messages", void 0);
__decorate$2([
    Collection([], User)
], ChatUI.prototype, "typingUsers", void 0);
__decorate$2([
    Property('dd/MM/yyyy hh:mm a')
], ChatUI.prototype, "timeStampFormat", void 0);
__decorate$2([
    Property(true)
], ChatUI.prototype, "showTimeStamp", void 0);
__decorate$2([
    Property(false)
], ChatUI.prototype, "autoScrollToBottom", void 0);
__decorate$2([
    Property(false)
], ChatUI.prototype, "loadOnDemand", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "suggestionTemplate", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "footerTemplate", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "emptyChatTemplate", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "messageTemplate", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "timeBreakTemplate", void 0);
__decorate$2([
    Property('')
], ChatUI.prototype, "typingUsersTemplate", void 0);
__decorate$2([
    Event()
], ChatUI.prototype, "messageSend", void 0);
__decorate$2([
    Event()
], ChatUI.prototype, "userTyping", void 0);
ChatUI = __decorate$2([
    NotifyPropertyChanges
], ChatUI);

export { AIAssistView, AssistView, AssistViewType, ChatUI, InterActiveChatBase, Message, MessageStatus, Prompt, PromptToolbarSettings, ResponseToolbarSettings, ToolbarItem, ToolbarSettings, User };
//# sourceMappingURL=ej2-interactive-chat.es2015.js.map
