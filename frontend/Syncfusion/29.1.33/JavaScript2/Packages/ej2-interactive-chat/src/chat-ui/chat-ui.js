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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
///<reference path='../interactive-chat-base/interactive-chat-base-model.d.ts'/>
import { NotifyPropertyChanges, Property, getUniqueID, isNullOrUndefined as isNOU, EventHandler, L10n } from '@syncfusion/ej2-base';
import { Internationalization, ChildProperty, Collection, removeClass, Event, Complex } from '@syncfusion/ej2-base';
import { InterActiveChatBase, ToolbarSettings } from '../interactive-chat-base/interactive-chat-base';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { Fab } from '@syncfusion/ej2-buttons';
var MessageStatus = /** @class */ (function (_super) {
    __extends(MessageStatus, _super);
    function MessageStatus() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], MessageStatus.prototype, "iconCss", void 0);
    __decorate([
        Property('')
    ], MessageStatus.prototype, "text", void 0);
    __decorate([
        Property('')
    ], MessageStatus.prototype, "tooltip", void 0);
    return MessageStatus;
}(ChildProperty));
export { MessageStatus };
/**
 * Represents a user model for a messages in the chatUI component.
 */
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], User.prototype, "id", void 0);
    __decorate([
        Property('Default')
    ], User.prototype, "user", void 0);
    __decorate([
        Property('')
    ], User.prototype, "avatarUrl", void 0);
    __decorate([
        Property('')
    ], User.prototype, "avatarBgColor", void 0);
    __decorate([
        Property('')
    ], User.prototype, "cssClass", void 0);
    return User;
}(ChildProperty));
export { User };
/**
 *  Represents a model for a messages in the chatUI component.
 */
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('')
    ], Message.prototype, "id", void 0);
    __decorate([
        Property('')
    ], Message.prototype, "text", void 0);
    __decorate([
        Complex({}, User)
    ], Message.prototype, "author", void 0);
    __decorate([
        Property('')
    ], Message.prototype, "timeStamp", void 0);
    __decorate([
        Property('')
    ], Message.prototype, "timeStampFormat", void 0);
    __decorate([
        Complex({}, MessageStatus)
    ], Message.prototype, "status", void 0);
    return Message;
}(ChildProperty));
export { Message };
var ChatUI = /** @class */ (function (_super) {
    __extends(ChatUI, _super);
    /**
     * Constructor for creating the component
     *
     * @param {ChatUIModel} options - Specifies the ChatUIModel model.
     * @param {string | HTMLElement} element - Specifies the element to render as component.
     * @private
     */
    function ChatUI(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.multiplier = 3;
        return _this;
    }
    /**
     * Initialize the event handler
     *
     * @private
     * @returns {void}
     */
    ChatUI.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    ChatUI.prototype.getDirective = function () {
        return 'EJS-CHATUI';
    };
    /**
     * To get component name.
     *
     * @returns {string} - It returns the current module name.
     * @private
     */
    ChatUI.prototype.getModuleName = function () {
        return 'chat-ui';
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @private
     * @returns {string} - It returns the persisted data.
     */
    ChatUI.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    ChatUI.prototype.render = function () {
        this.renderChatUIView();
    };
    ChatUI.prototype.renderChatUIView = function () {
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
        if (isNOU(this.messages) || this.messages.length <= 0) {
            this.renderBannerView(this.emptyChatTemplate, this.messageWrapper, 'emptyChatTemplate');
            this.isEmptyChatTemplateRendered = isNOU(this.messageWrapper.querySelector('.e-empty-chat-template')) ? false : true;
        }
        this.wireEvents();
        this.renderTypingIndicator();
        this.updateScrollPosition(false, 0);
    };
    ChatUI.prototype.updateScrollPosition = function (isMethodCall, timeDelay) {
        var _this = this;
        if (this.isReact || this.isAngular) {
            setTimeout(function () {
                if (isMethodCall) {
                    _this.handleAutoScroll();
                }
                else {
                    _this.scrollToBottom();
                }
            }, timeDelay);
        }
        else {
            this.scrollToBottom();
        }
    };
    ChatUI.prototype.renderChatHeader = function () {
        if (this.headerText) {
            var headerContainer = this.createElement('div', { className: 'e-header' });
            if (this.headerIconCss) {
                var iconElement = this.createElement('span', { className: "e-header-icon e-icons " + this.headerIconCss });
                headerContainer.appendChild(iconElement);
            }
            var headerTextElement = this.createElement('div', { className: 'e-header-text' });
            headerTextElement.innerHTML = this.headerText;
            headerContainer.appendChild(headerTextElement);
            this.chatHeader.appendChild(headerContainer);
            this.renderChatHeaderToolbar(headerContainer);
        }
    };
    ChatUI.prototype.renderChatHeaderToolbar = function (headerContainer) {
        var _this = this;
        if (!isNOU(this.headerToolbar) && this.headerToolbar.items.length > 0) {
            var toolbarEle = this.createElement('div', { className: 'e-chat-toolbar' });
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var pushToolbar = this.headerToolbar.items.map(function (item) { return ({
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
            this.toolbar = new Toolbar({
                items: pushToolbar,
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
                    if (_this.headerToolbar.itemClicked) {
                        _this.headerToolbar.itemClicked.call(_this, eventArgs);
                    }
                }
            });
            this.toolbar.appendTo(toolbarEle);
            headerContainer.appendChild(toolbarEle);
        }
    };
    ChatUI.prototype.updateHeaderToolbar = function () {
        var headerContainer = this.chatHeader.querySelector('.e-header');
        if (!isNOU(this.toolbar)) {
            var pushToolbar = this.headerToolbar.items.map(function (item) { return ({
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
            this.toolbar.items = pushToolbar;
        }
        else {
            this.renderChatHeaderToolbar(headerContainer);
        }
    };
    ChatUI.prototype.renderChatContentElement = function () {
        this.messageWrapper = this.createElement('div', { className: 'e-message-wrapper', attrs: { 'tabindex': '0' } });
        this.viewWrapper.prepend(this.messageWrapper);
        this.content = this.createElement('div', { className: 'e-typing-suggestions' });
        this.viewWrapper.append(this.content);
        this.renderScrollDown();
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
    };
    ChatUI.prototype.setChatMsgId = function () {
        var _this = this;
        if (this.messages && this.messages.length > 0) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages = this.messages.map(function (msg, index) {
                return __assign({}, msg, { id: msg.id || _this.element.id + "-message-" + (index + 1) });
            });
            this.isProtectedOnChange = prevOnChange;
        }
    };
    ChatUI.prototype.renderScrollDown = function () {
        var scrollDownButton = this.createElement('button', { id: 'scrollDownButton' });
        this.downArrowIcon = new Fab({
            iconCss: 'e-icons e-chat-scroll-down',
            position: 'BottomRight',
            target: this.content,
            isPrimary: false
        });
        this.downArrowIcon.appendTo(scrollDownButton);
    };
    ChatUI.prototype.loadBatch = function () {
        for (var i = this.startIndex - 1; i >= 0; i--) {
            var currIndex = i; // To pass the actual index of the reversed item.
            var prevIndex = i === this.messages.length - 1 ? -1 : currIndex + 1;
            this.updateMessageTimeFormats(this.messages[parseInt(i.toString(), 10)], currIndex);
            var currentMessageDate = this.getMessageDate(currIndex);
            currentMessageDate.setHours(0, 0, 0, 0);
            if (Math.min(currIndex, prevIndex) >= 0) {
                var lastMessageDate = this.getMessageDate(prevIndex);
                lastMessageDate.setHours(0, 0, 0, 0);
                if (currentMessageDate.getTime() === lastMessageDate.getTime()) {
                    var prevTimeBreak = this.messageWrapper.querySelectorAll('.e-timebreak')[0];
                    if (prevTimeBreak) {
                        prevTimeBreak.remove();
                    }
                }
            }
            this.renderGroup(this.messageWrapper, this.messages[parseInt(i.toString(), 10)], true, currIndex, prevIndex);
            if (this.showTimeBreak) {
                this.messageWrapper.prepend(this.createTimebreakElement(currentMessageDate));
            }
            var viewportHeight = window.innerHeight;
            var loadHeight = viewportHeight * this.multiplier;
            this.startIndex = i;
            if (this.messageWrapper.scrollHeight > loadHeight) {
                break;
            }
        }
    };
    ChatUI.prototype.renderMessageGroup = function (chatContentWrapper) {
        var _this = this;
        if (this.loadOnDemand) {
            if (this.messages && this.messages.length <= 0) {
                return;
            }
            createSpinner({ target: this.messageWrapper });
            this.startIndex = this.messages.length;
            this.loadBatch();
        }
        else {
            this.messages.forEach(function (msg, i) {
                _this.renderGroup(chatContentWrapper, msg, false, i, i - 1);
            });
        }
    };
    ChatUI.prototype.isTimeBreakAdded = function (chatContentWrapper, loadOldChat) {
        return loadOldChat ?
            chatContentWrapper.firstElementChild.classList.contains('e-timebreak') :
            chatContentWrapper.lastElementChild.classList.contains('e-timebreak');
    };
    ChatUI.prototype.getLastUser = function (prevIndex) {
        if (prevIndex >= 0) {
            return this.messages[parseInt(prevIndex.toString(), 10)].author.id;
        }
        return '';
    };
    ChatUI.prototype.renderGroup = function (chatContentWrapper, msg, loadOldChat, index, prevIndex) {
        var messageGroup;
        if (!loadOldChat) {
            this.updateMessageTimeFormats(msg, index);
            this.handleTimeBreak(prevIndex, index, loadOldChat);
        }
        if (msg.author.id === this.user.id) {
            var hasTimeBreak = this.showTimeBreak && this.isTimeBreakAdded(chatContentWrapper, loadOldChat);
            if ((msg.author.id !== this.getLastUser(prevIndex)) || hasTimeBreak) {
                messageGroup = this.createElement('div', { className: "e-message-group e-right " + (this.messageTemplate ? 'e-message-item-template' : '') });
                this.manageChatContent(loadOldChat, chatContentWrapper, messageGroup);
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
            else {
                var length_1 = this.element.querySelectorAll('.e-message-group.e-right').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-right')[loadOldChat ? 0 : length_1 - 1];
                this.addGroupItems(msg, messageGroup, false, true, index, loadOldChat);
            }
        }
        else {
            if (this.getLastUser(prevIndex) !== msg.author.id || this.isTimeVaries(index, prevIndex)) {
                messageGroup = this.createElement('div', { className: "e-message-group e-left " + (this.messageTemplate ? 'e-message-item-template' : '') });
                var avatarElement = this.createAvatarIcon(msg.author, false);
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
                var length_2 = this.element.querySelectorAll('.e-message-group.e-left').length;
                messageGroup = this.element.querySelectorAll('.e-message-group.e-left')[loadOldChat ? 0 : length_2 - 1];
                if (!loadOldChat) {
                    this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
                }
                else {
                    this.loadLeftGroupOnDemand(msg, loadOldChat, index, messageGroup);
                }
            }
        }
    };
    ChatUI.prototype.isTimeVaries = function (index, prevIndex) {
        var currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        var lastMessageDate = this.getMessageDate(prevIndex);
        lastMessageDate.setHours(0, 0, 0, 0);
        return currentMessageDate.getTime() !== lastMessageDate.getTime();
    };
    ChatUI.prototype.loadLeftGroupOnDemand = function (msg, loadOldChat, index, messageGroup) {
        // To check if the previous author is the same as the current author. If not, create a group header.
        var isAnyMsgPresent = this.messages[parseInt((index - 1).toString(), 10)] ? true : false;
        var prevAuthorId = isAnyMsgPresent ? this.messages[parseInt((index - 1).toString(), 10)].author.id : '';
        var shouldCreateHeader = prevAuthorId !== msg.author.id ? true : false;
        if (shouldCreateHeader || this.isTimeVaries(index, index - 1)) {
            this.addGroupItems(msg, messageGroup, true, false, index, loadOldChat);
            this.createLeftGroupItems(messageGroup, msg, index);
        }
        else {
            this.addGroupItems(msg, messageGroup, false, false, index, loadOldChat);
        }
    };
    ChatUI.prototype.createLeftGroupItems = function (messageGroup, msg, index) {
        if (this.messageTemplate) {
            return;
        }
        var userHeaderContainer = this.createElement('div', {
            className: 'e-message-header-container'
        });
        var userHeader = this.createElement('div', {
            className: 'e-message-header'
        });
        userHeader.innerHTML = msg.author.user;
        var timeSpan = this.getTimeStampElement(msg.timeStamp
            ? msg.timeStamp
            : new Date(), msg.timeStampFormat, index);
        this.appendChildren(userHeaderContainer, userHeader, timeSpan);
        this.insertBeforeChildren(messageGroup, userHeaderContainer);
    };
    ChatUI.prototype.createAvatarIcon = function (author, isTypingUser) {
        var userName = author.user.trim();
        var nameParts = userName.split(' ');
        var initials = nameParts.length > 1
            ? "" + nameParts[0][0] + nameParts[nameParts.length - 1][0]
            : userName[0];
        var avatarIcon = this.createElement((!isNOU(author.avatarUrl) && author.avatarUrl !== '') ? 'img' : 'span', { className: " " + (!isTypingUser ? 'e-message-icon' : 'e-user-icon') + " " + author.cssClass });
        if (author.avatarBgColor) {
            avatarIcon.style.backgroundColor = author.avatarBgColor;
        }
        if (!isNOU(author.avatarUrl) && author.avatarUrl !== '') {
            avatarIcon.src = author.avatarUrl;
            avatarIcon.alt = userName;
        }
        else {
            avatarIcon.innerHTML = initials;
        }
        return avatarIcon;
    };
    ChatUI.prototype.getTimeStampElement = function (timeStamp, timeStampFormat, index) {
        var formattedTime = this.getFormattedTime(timeStamp, timeStampFormat);
        return this.createElement('div', {
            className: 'e-time',
            innerHTML: this.showTimeStamp ? formattedTime : ''
        });
    };
    ChatUI.prototype.updateTimeFormats = function (timeStampFormat, fullTime, index) {
        if (this.messages[parseInt(index.toString(), 10)]) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.messages[parseInt(index.toString(), 10)].timeStamp = this.intl.parseDate(fullTime, { format: 'dd/MM/yyyy hh:mm a' });
            this.messages[parseInt(index.toString(), 10)].timeStampFormat = timeStampFormat;
            this.isProtectedOnChange = prevOnChange;
        }
    };
    ChatUI.prototype.getFormattedTime = function (timeStamp, timeStampFormat) {
        timeStamp = typeof timeStamp === 'string' ? new Date(timeStamp) : timeStamp;
        return this.intl.formatDate(timeStamp, { format: this.getFormat(timeStampFormat) });
    };
    ChatUI.prototype.getFormat = function (timeStampFormat) {
        var hasValue = !isNOU(timeStampFormat) && timeStampFormat.length > 0;
        return hasValue ? timeStampFormat
            : (!isNOU(this.timeStampFormat) && this.timeStampFormat.length) ? this.timeStampFormat : 'dd/MM/yyyy hh:mm a';
    };
    ChatUI.prototype.addGroupItems = function (msg, messageGroup, isUserTimeStampRendered, showStatus, index, loadOldChat) {
        var messageItem = this.createElement('div', { className: 'e-message-item', id: "" + msg.id });
        var messageStatusWrapper = this.createElement('div', { className: 'e-status-wrapper' });
        var timeSpan = this.getTimeStampElement(msg.timeStamp ? msg.timeStamp : new Date(), msg.timeStampFormat, index);
        var textElement = this.createElement('div', {
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
                var messageElement = this.createElement('div', { className: 'e-status-item' });
                var statusIcon = this.createElement('span', { attrs: { class: "e-status-icon " + (msg.status ? msg.status.iconCss : ''), title: "" + (msg.status ? msg.status.tooltip : '') } });
                var statusText = this.createElement('div', { innerHTML: msg.status ? msg.status.text : '', className: 'e-status-text' });
                this.appendChildren(messageElement, textElement, statusIcon);
                this.appendChildren(messageStatusWrapper, messageElement, statusText);
                messageItem.appendChild(messageStatusWrapper);
            }
            else {
                messageItem.appendChild(textElement);
            }
            this.manageChatContent(loadOldChat, messageGroup, messageItem);
        }
    };
    ChatUI.prototype.manageChatContent = function (loadOldChat, parentItem, ChildItem) {
        if (loadOldChat) {
            parentItem.prepend(ChildItem);
        }
        else {
            parentItem.appendChild(ChildItem);
        }
    };
    ChatUI.prototype.createTimebreakElement = function (date) {
        var timebreakDiv = this.createElement('div', { className: "e-timebreak " + (this.timeBreakTemplate ? 'e-timebreak-template' : '') });
        var formattedTime = this.getFormattedTime(date, 'MMMM d, yyyy');
        if (this.timeBreakTemplate) {
            this.getContextObject('timeBreakTemplate', timebreakDiv, null, null, date);
        }
        else {
            var timeStampEle = this.createElement('span', { className: 'e-timestamp' });
            timeStampEle.innerHTML = formattedTime;
            timebreakDiv.appendChild(timeStampEle);
        }
        return timebreakDiv;
    };
    ChatUI.prototype.handleTimeBreak = function (lastMsgIndex, index, loadOldChat) {
        if (!this.showTimeBreak) {
            return;
        }
        var currentMessageDate = this.getMessageDate(index);
        currentMessageDate.setHours(0, 0, 0, 0);
        if (lastMsgIndex === -1) {
            this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
        }
        else if (index > 0) {
            var lastMessageDate = this.getMessageDate(lastMsgIndex);
            lastMessageDate.setHours(0, 0, 0, 0);
            if ((currentMessageDate.getTime() !== lastMessageDate.getTime()) && !loadOldChat) {
                this.messageWrapper.appendChild(this.createTimebreakElement(currentMessageDate));
            }
        }
    };
    ChatUI.prototype.renderNewMessage = function (msg, index) {
        if (this.isEmptyChatTemplateRendered) {
            var introContainer = this.messageWrapper.querySelector('.e-empty-chat-template');
            this.messageWrapper.removeChild(introContainer);
            this.isEmptyChatTemplateRendered = false;
        }
        this.renderGroup(this.messageWrapper, msg, false, index, index - 1);
    };
    ChatUI.prototype.loadMoreMessages = function () {
        var _this = this;
        if (this.startIndex <= 0) {
            return;
        }
        var currentScrollOffset = this.messageWrapper.scrollHeight - this.messageWrapper.scrollTop;
        showSpinner(this.messageWrapper);
        setTimeout(function () {
            hideSpinner(_this.messageWrapper);
            _this.loadBatch();
            _this.messageWrapper.scrollTop = _this.messageWrapper.scrollHeight - currentScrollOffset;
        }, 1000);
    };
    ChatUI.prototype.updateMessageTimeFormats = function (msg, index) {
        var fullTime = this.getFormattedTime(msg.timeStamp
            ? msg.timeStamp
            : new Date(), 'dd/MM/yyyy hh:mm a');
        this.updateTimeFormats(msg.timeStampFormat, fullTime, index);
    };
    ChatUI.prototype.getMessageDate = function (index) {
        return new Date(this.messages[parseInt(index.toString(), 10)].timeStamp);
    };
    ChatUI.prototype.renderChatSuggestionsElement = function () {
        if (!isNOU(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
    };
    ChatUI.prototype.handleSuggestionUpdate = function () {
        if (this.suggestionsElement) {
            this.suggestionsElement.remove();
        }
        if (!isNOU(this.suggestions) && this.suggestions.length > 0) {
            this.renderSuggestions(this.suggestions, null, this.suggestionTemplate, 'suggestion', 'suggestionTemplate', this.onSuggestionClick);
        }
        this.toggleScrollIcon();
    };
    ChatUI.prototype.onSuggestionClick = function (e) {
        this.suggestionsElement.hidden = true;
        this.textareaObj.value = e.target.innerText;
        this.onSendIconClick(e);
    };
    ChatUI.prototype.renderChatFooterContent = function () {
        this.footer = this.getElement('footer');
        var footerClass = "e-footer " + (this.footerTemplate ? 'e-footer-template' : '');
        this.footer.className = footerClass;
        this.renderChatFooter();
        this.viewWrapper.append(this.footer);
        this.updateFooter(this.showFooter, this.footer);
    };
    ChatUI.prototype.renderChatFooter = function () {
        var _this = this;
        this.textareaObj = this.renderFooterContent(this.footerTemplate, this.footer, '', this.placeholder, false, this.getRowCount(''), 'e-chat-textarea');
        var sendIconClass = 'e-chat-send e-icons disabled';
        if (!this.footerTemplate) {
            this.sendIcon = this.renderSendIcon(sendIconClass, this.footer);
        }
        if (this.textareaObj) {
            this.textareaObj.input = this.handleInput.bind(this);
            this.textareaObj.blur = function (args) { return _this.triggerUserTyping(args.event, args.value); };
            if (!isNOU(this.textareaObj.value)) {
                this.activateSendIcon(this.textareaObj.value.length);
            }
        }
    };
    ChatUI.prototype.handleInput = function (args) {
        this.triggerUserTyping(args.event, args.value);
        this.activateSendIcon(args.value.length);
        this.updateTextAreaObject(args.value);
    };
    ChatUI.prototype.triggerUserTyping = function (event, value) {
        var eventArgs = {
            event: event,
            message: value,
            user: this.user,
            isTyping: event.type === 'blur' ? false : value.length > 0 ? true : false
        };
        this.trigger('userTyping', eventArgs);
    };
    ChatUI.prototype.renderTypingIndicator = function () {
        var _this = this;
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
            className: "e-typing-indicator " + (this.typingUsersTemplate ? 'e-typing-indicator-template' : '')
        });
        if (this.typingUsersTemplate) {
            this.getContextObject('typingUsersTemplate', this.indicatorWrapper, null, null, null);
        }
        else {
            this.typingUsers.slice(0, 3).forEach(function (user) {
                var avatarElement = _this.createAvatarIcon(user, true);
                _this.indicatorWrapper.appendChild(avatarElement);
            });
            var typingMessage = this.createElement('span', { className: 'e-user-text' });
            this.indicatorWrapper.appendChild(typingMessage);
            this.updateUserText();
            var indicatorContainer = this.createElement('div', { className: 'e-indicator-wrapper' });
            for (var i = 0; i < 3; i++) {
                var indicator = this.createElement('span', {
                    className: 'e-indicator'
                });
                this.appendChildren(indicatorContainer, indicator);
            }
            this.indicatorWrapper.appendChild(indicatorContainer);
        }
        this.content.prepend(this.indicatorWrapper);
    };
    ChatUI.prototype.updateUserText = function () {
        var _this = this;
        if (this.typingUsersTemplate) {
            return;
        }
        this.l10n.setLocale(this.locale);
        var userNames = this.typingUsers.filter(function (user) { return user.user !== _this.user.user; })
            .map(function (user) { return user.user; });
        var displayText = this.getTypingMessage(userNames);
        var typingMessage = this.indicatorWrapper.querySelector('.e-user-text');
        typingMessage.innerHTML = displayText;
    };
    ChatUI.prototype.getTypingMessage = function (userNames) {
        if (userNames.length >= 3) {
            return this.l10n.getConstant(userNames.length > 3 ? 'multipleUsersTyping' : 'threeUserTyping')
                .replace('{0}', userNames[0].toString())
                .replace('{1}', userNames[1].toString())
                .replace('{2}', (userNames.length - 2).toString());
        }
        else {
            var userTemplate = this.l10n.getConstant(userNames.length === 2 ? 'twoUserTyping' : 'oneUserTyping');
            return userNames.length === 2
                ? userTemplate.replace('{0}', userNames[0].toString()).replace('{1}', userNames[1].toString())
                : userTemplate.replace('{0}', userNames[0].toString());
        }
    };
    ChatUI.prototype.updateTypingUsers = function (users) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.typingUsers = users;
        this.isProtectedOnChange = prevOnChange;
        this.renderTypingIndicator();
    };
    ChatUI.prototype.updateTextAreaObject = function (textValue) {
        var rowCount = this.getRowCount(textValue);
        this.textareaObj.rows = rowCount;
        this.textareaObj.cssClass = (rowCount >= 10) ? 'show-scrollbar' : 'hide-scrollbar';
    };
    ChatUI.prototype.getRowCount = function (textValue) {
        var lines = textValue.split('\n').length;
        return (lines < 10 ? (lines >= 1 ? lines : 1) : 10);
    };
    ChatUI.prototype.activateSendIcon = function (value) {
        this.sendIcon.classList.toggle('disabled', value === 0);
        this.sendIcon.classList.toggle('enabled', value > 0);
    };
    ChatUI.prototype.updateHeaderIcon = function () {
        var existingIconElement = this.element.querySelector('.e-header-icon');
        if (existingIconElement) {
            existingIconElement.className = "e-header-icon e-icons " + this.headerIconCss;
        }
        else {
            var headerContainer = this.element.querySelector('.e-header');
            if (headerContainer) {
                var iconElement = this.createElement('span', {
                    className: "e-header-icon e-icons " + this.headerIconCss
                });
                headerContainer.prepend(iconElement);
            }
        }
    };
    ChatUI.prototype.updateHeaderText = function () {
        if (this.headerText) {
            var headerTextEle = this.element.querySelector('.e-header-text');
            if (headerTextEle) {
                headerTextEle.innerHTML = this.headerText;
            }
        }
    };
    ChatUI.prototype.renderUpdatedMessage = function () {
        this.messageWrapper.innerHTML = '';
        this.setChatMsgId();
        this.renderMessageGroup(this.messageWrapper);
    };
    ChatUI.prototype.onSendIconClick = function (event) {
        var _this = this;
        if (!this.textareaObj.value.trim()) {
            return;
        }
        var newMessageObj = {
            id: this.element.id + "-message-" + (this.messages.length + 1),
            author: this.user,
            text: this.textareaObj.value
        };
        var prevOnChange = this.isProtectedOnChange;
        this.textareaObj.value = '';
        this.activateSendIcon(this.textareaObj.value.length);
        var eventArgs = {
            cancel: false,
            message: newMessageObj
        };
        this.triggerUserTyping(event, '');
        this.trigger('messageSend', eventArgs, function (args) {
            if (args.cancel) {
                return;
            }
            newMessageObj = args.message;
            _this.isProtectedOnChange = true;
            _this.messages = _this.messages.concat([newMessageObj]);
            _this.isProtectedOnChange = prevOnChange;
            _this.renderNewMessage(newMessageObj, (_this.messages.length - 1));
        });
        if (this.suggestionsElement) {
            this.suggestionsElement.hidden = false;
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(false, 5);
    };
    ChatUI.prototype.getContextObject = function (templateName, contentElement, index, message, currentMessagedate) {
        var template;
        var context = {};
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
    };
    ChatUI.prototype.handleAutoScroll = function () {
        if (this.isScrollAtBottom) {
            this.updateScroll(this.messageWrapper);
        }
        if (this.autoScrollToBottom) {
            this.updateScroll(this.messageWrapper);
        }
        this.toggleScrollIcon();
    };
    ChatUI.prototype.footerKeyHandler = function (e) {
        this.keyHandler(e, 'footer');
    };
    ChatUI.prototype.scrollBottomKeyHandler = function (e) {
        this.keyHandler(e, 'scrollBottom');
    };
    ChatUI.prototype.keyHandler = function (event, value) {
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
    };
    ChatUI.prototype.updateFooter = function (showFooter, footerElement) {
        if (!showFooter) {
            footerElement.hidden = true;
        }
        else {
            footerElement.hidden = false;
        }
    };
    ChatUI.prototype.handleScroll = function () {
        var atBottom = this.checkScrollAtBottom();
        if (atBottom) {
            this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
            var suggestionEle = this.element.querySelector('.e-suggestions');
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
    };
    ChatUI.prototype.checkScrollAtBottom = function () {
        var scrollThreshold = 5;
        var scrollTop = Math.floor(this.messageWrapper.scrollTop);
        var scrollHeight = Math.floor(this.messageWrapper.scrollHeight);
        var clientHeight = Math.floor(this.messageWrapper.clientHeight);
        return scrollHeight - scrollTop <= clientHeight + scrollThreshold;
    };
    ChatUI.prototype.toggleClassName = function (element, atBottom, name) {
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
    };
    ChatUI.prototype.toggleScrollIcon = function () {
        var atBottom = this.checkScrollAtBottom();
        this.toggleClassName(this.downArrowIcon.element, atBottom, 'downArrow');
        var suggestionEle = this.element.querySelector('.e-suggestions');
        if (suggestionEle) {
            this.toggleClassName(suggestionEle, atBottom, 'suggestion');
            if (atBottom) {
                this.updateScroll(this.messageWrapper);
            }
        }
        this.isScrollAtBottom = atBottom;
    };
    ChatUI.prototype.scrollBtnClick = function () {
        this.toggleClassName(this.messageWrapper, false, 'scroll');
        this.scrollToBottom();
        this.toggleClassName(this.messageWrapper, true, 'scroll');
    };
    ChatUI.prototype.updateMessageItem = function (message, msgId) {
        if (message.author || message.timeStamp || this.messageTemplate) {
            this.renderUpdatedMessage();
            return;
        }
        var messageItem = this.messageWrapper.querySelector("#" + msgId);
        if (!messageItem) {
            return;
        }
        if (message.id) {
            messageItem.id = message.id;
        }
        var textElement = messageItem.querySelector('.e-text');
        if (textElement && message.text) {
            textElement.innerHTML = message.text;
        }
        if (message.status) {
            var statusTextElement = messageItem.querySelector('.e-status-text');
            if (statusTextElement && message.status.text) {
                statusTextElement.innerHTML = message.status.text;
            }
            var statusIconElement = messageItem.querySelector('.e-status-icon');
            if (statusIconElement && message.status.iconCss) {
                var iconCss = message.status.iconCss;
                statusIconElement.className = "e-status-icon " + iconCss;
                if (message.status.tooltip) {
                    statusIconElement.title = message.status.tooltip;
                }
            }
        }
    };
    ChatUI.prototype.wireEvents = function () {
        this.wireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        EventHandler.add(this.messageWrapper, 'scroll', this.handleScroll, this);
        EventHandler.add(this.downArrowIcon.element, 'click', this.scrollBtnClick, this);
        EventHandler.add(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler, this);
    };
    ChatUI.prototype.unwireEvents = function () {
        this.unWireFooterEvents(this.sendIcon, this.footer, this.footerTemplate);
        EventHandler.remove(this.messageWrapper, 'scroll', this.handleScroll);
        EventHandler.remove(this.downArrowIcon.element, 'click', this.scrollBtnClick);
        EventHandler.remove(this.downArrowIcon.element, 'keydown', this.scrollBottomKeyHandler);
    };
    ChatUI.prototype.destroyChatUI = function () {
        var properties = [
            'content',
            'sendIcon',
            'footer',
            'indicatorWrapper',
            'messageWrapper',
            'viewWrapper',
            'chatHeader'
        ];
        for (var _i = 0, properties_1 = properties; _i < properties_1.length; _i++) {
            var prop = properties_1[_i];
            var element = prop;
            this.removeAndNullify(this[element]);
            this[element] = null;
        }
    };
    /**
     * Scrolls to the last message in the conversation area of the Chat UI component.
     * This method allows programmatic control to ensure the chat view is scrolled to the bottom, typically used when new messages are added or to refocus on the most recent conversation.
     *
     * @returns {void}
     */
    ChatUI.prototype.scrollToBottom = function () {
        this.updateScroll(this.messageWrapper);
        this.toggleScrollIcon();
    };
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
    ChatUI.prototype.addMessage = function (message) {
        if (isNOU(message)) {
            return;
        }
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        if (typeof message === 'string') {
            var newMessageObj = {
                id: this.element.id + "-message-" + (this.messages.length + 1),
                author: this.user,
                text: message,
                timeStamp: new Date(),
                timeStampFormat: this.timeStampFormat
            };
            this.messages = this.messages.concat([newMessageObj]);
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        else {
            var newMessageObj = __assign({}, message, { id: message.id || this.element.id + "-message-" + (this.messages.length + 1) });
            this.messages = this.messages.concat([newMessageObj]);
            this.renderNewMessage(newMessageObj, (this.messages.length - 1));
        }
        // To prevent the issue where scrolling does not move to the bottom in the `messageTemplate` case on Angular and React platforms.
        this.updateScrollPosition(true, 5);
        this.isProtectedOnChange = prevOnChange;
    };
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
    ChatUI.prototype.updateMessage = function (message, msgId) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.messages = this.messages.map(function (messageItem) {
            return messageItem.id === msgId ? __assign({}, messageItem, message) : messageItem;
        });
        this.updateMessageItem(message, msgId);
        this.isProtectedOnChange = prevOnChange;
    };
    /**
     * Scrolls to a specific message in the Chat UI component based on the provided message ID.
     * Locates the message with the specified ID and scrolls it to the view.
     *
     * @function scrollToMessage
     * @param {string} messageId - The unique identifier of the message to navigate to the corresponding message rendered in the chat UI.
     * @returns {void}.
     */
    ChatUI.prototype.scrollToMessage = function (messageId) {
        var messageElement = this.messageWrapper.querySelector("#" + messageId);
        if (!messageElement) {
            return;
        }
        messageElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    };
    /**
     * Sets focus for the input textarea in the Chat UI component.
     * Ensures that user input is directed to the chat input field.
     *
     * @function focus
     * @returns {void}.
     */
    ChatUI.prototype.focus = function () {
        if (this.textareaObj) {
            this.textareaObj.focusIn();
        }
    };
    ChatUI.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
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
    };
    /**
     * Called if any of the property value is changed.
     *
     * @param  {ChatUIModel} newProp - Specifies new properties
     * @param  {ChatUIModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    ChatUI.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
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
                    if (!isNOU(this.toolbar)) {
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
                    var newUser = {
                        id: newProp.user.id,
                        user: newProp.user.user,
                        avatarUrl: newProp.user.avatarUrl,
                        avatarBgColor: newProp.user.avatarBgColor,
                        cssClass: newProp.user.cssClass
                    };
                    this.user = __assign({}, this.user, newUser);
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
    };
    __decorate([
        Property('100%')
    ], ChatUI.prototype, "width", void 0);
    __decorate([
        Property('100%')
    ], ChatUI.prototype, "height", void 0);
    __decorate([
        Complex({}, User)
    ], ChatUI.prototype, "user", void 0);
    __decorate([
        Property('Chat')
    ], ChatUI.prototype, "headerText", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "headerIconCss", void 0);
    __decorate([
        Property('Type your message…')
    ], ChatUI.prototype, "placeholder", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "cssClass", void 0);
    __decorate([
        Property(true)
    ], ChatUI.prototype, "showHeader", void 0);
    __decorate([
        Property(true)
    ], ChatUI.prototype, "showFooter", void 0);
    __decorate([
        Complex({ items: [] }, ToolbarSettings)
    ], ChatUI.prototype, "headerToolbar", void 0);
    __decorate([
        Property([])
    ], ChatUI.prototype, "suggestions", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "showTimeBreak", void 0);
    __decorate([
        Collection([], Message)
    ], ChatUI.prototype, "messages", void 0);
    __decorate([
        Collection([], User)
    ], ChatUI.prototype, "typingUsers", void 0);
    __decorate([
        Property('dd/MM/yyyy hh:mm a')
    ], ChatUI.prototype, "timeStampFormat", void 0);
    __decorate([
        Property(true)
    ], ChatUI.prototype, "showTimeStamp", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "autoScrollToBottom", void 0);
    __decorate([
        Property(false)
    ], ChatUI.prototype, "loadOnDemand", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "suggestionTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "footerTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "emptyChatTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "messageTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "timeBreakTemplate", void 0);
    __decorate([
        Property('')
    ], ChatUI.prototype, "typingUsersTemplate", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "messageSend", void 0);
    __decorate([
        Event()
    ], ChatUI.prototype, "userTyping", void 0);
    ChatUI = __decorate([
        NotifyPropertyChanges
    ], ChatUI);
    return ChatUI;
}(InterActiveChatBase));
export { ChatUI };
