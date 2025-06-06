import * as events from '../base/constant';
import { detach, addClass, isNullOrUndefined as isNOU, removeClass, closest, createElement, EventHandler, getComponent } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { TextBox } from '@syncfusion/ej2-inputs';
var EmojiPicker = /** @class */ (function () {
    function EmojiPicker(parent, serviceLocator) {
        this.noResultsFoundCount = 0;
        this.parent = parent;
        this.locator = serviceLocator;
        this.i10n = serviceLocator.getService('rteLocale');
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
        this.isDestroyed = false;
        this.isPopupDestroyed = false;
    }
    /**
     * Destroys the Count.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    EmojiPicker.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.removeEventListener();
        this.isDestroyed = true;
    };
    EmojiPicker.prototype.childDestroy = function () {
        if (this.isPopupDestroyed) {
            return;
        }
        if (this.popupObj && !this.popupObj.isDestroyed) {
            if (this.popupObj.element && this.popupObj.element.querySelector('.e-rte-emoji-search')) {
                var textBox = getComponent(this.popupObj.element.querySelector('.e-rte-emoji-search'), 'textbox');
                if (textBox && !textBox.isDestroyed) {
                    textBox.destroy();
                }
            }
            if (this.popupObj.element && this.popupObj.element.querySelector('.e-rte-emojipicker-toolbar')) {
                var toolbar_1 = getComponent(this.popupObj.element.querySelector('.e-rte-emojipicker-toolbar'), 'toolbar');
                if (toolbar_1 && !toolbar_1.isDestroyed) {
                    toolbar_1.destroy();
                }
            }
            var closeIcon = this.popupObj.element.querySelector('.e-clear-icon');
            if (!isNOU(closeIcon)) {
                EventHandler.remove(closeIcon, 'mousedown', this.searchFilter);
            }
            this.popupObj.destroy();
            this.isPopupDestroyed = true;
        }
        if (this.popDiv) {
            EventHandler.remove(this.popDiv, 'keydown', this.onKeyDown);
            EventHandler.remove(this.popDiv, 'keyup', this.searchFilter);
            if (this.popDiv.querySelector('.e-rte-emojipicker-btn')) {
                var btn = this.popDiv.querySelector('.e-rte-emojipicker-btn');
                EventHandler.remove(btn, 'scroll', this.scrollEvent);
                EventHandler.remove(btn, 'click', this.emojiBtnClick);
            }
        }
    };
    EmojiPicker.prototype.addEventListener = function () {
        this.parent.on(events.emojiPicker, this.toolbarClick, this);
        this.parent.on(events.docClick, this.docClick, this);
        this.parent.on(events.iframeMouseDown, this.onIframeMouseDown, this);
        this.parent.on(events.keyDown, this.onkeyPress, this);
        this.parent.on(events.keyUp, this.onkeyUp, this);
        this.parent.on(events.contentscroll, this.contentscroll, this);
        this.parent.on(events.scroll, this.contentscroll, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    // eslint-disable-next-line
    EmojiPicker.prototype.toolbarClick = function (args) {
        var _this = this;
        var _a, _b;
        this.noResultsFoundCount = 0;
        var spanElement;
        if (!isNOU(this.parent.element.querySelector('.e-emoji'))) {
            spanElement = this.parent.element.querySelector('.e-emoji');
        }
        else if (this.parent.inlineMode.enable) {
            spanElement = this.parent.element.ownerDocument.querySelector('.e-emoji');
        }
        this.divElement = spanElement.closest('div');
        if (!(this.parent.inputElement.contains(this.parent.formatter.editorManager.nodeSelection.
            getRange(this.parent.contentModule.getDocument()).startContainer))) {
            this.parent.contentModule.getEditPanel().focus();
        }
        var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
        this.save = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
        this.clickEvent = args.args;
        var emojiPicker = this.parent.emojiPickerSettings.iconsSet;
        if (this.popupObj) {
            removeClass([this.divElement], 'e-active');
            if (this.popupObj.element.querySelector('.e-rte-emoji-search') || !this.parent.emojiPickerSettings.showSearchBox) {
                this.popupObj.hide();
                return;
            }
            this.popupObj.hide();
        }
        this.popDiv = this.parent.createElement('div', { className: 'e-rte-emojipicker-popup', id: this.parent.getID() + '_emojiPicker' });
        if (!isNOU(this.parent.getToolbar()) && !this.parent.inlineMode.enable) {
            this.parent.getToolbar().parentElement.appendChild(this.popDiv);
        }
        else if (this.parent.inlineMode.enable) {
            this.parent.rootContainer.appendChild(this.popDiv);
        }
        EventHandler.add(this.popDiv, 'keydown', this.onKeyDown, this);
        EventHandler.add(this.popDiv, 'keyup', this.searchFilter, this);
        var extendEle = this.parent.element.querySelector('.e-toolbar-extended');
        var zIndex;
        if (!isNOU(extendEle)) {
            var computedStyle = window.getComputedStyle(extendEle);
            zIndex = computedStyle.getPropertyValue('z-index');
        }
        else {
            zIndex = '10001';
        }
        var target;
        var xValue;
        var yValue;
        if (!isNOU(args.args) && !this.parent.inlineMode.enable &&
            isNOU(this.parent.quickToolbarSettings.text)) {
            target = args.args.originalEvent.target;
            target = target.classList.contains('e-toolbar-item') ? target.firstChild : target.parentElement;
            xValue = 'left';
            yValue = 'bottom';
        }
        else if (isNOU(args.x) && isNOU(args.y) && !this.parent.inlineMode.enable && isNOU(this.parent.quickToolbarSettings.text)) {
            target = this.parent.inputElement;
            if (this.parent.contentModule.getDocument().getSelection().rangeCount > 0) {
                var coordinates = this.getCoordinates();
                xValue = coordinates.left;
                yValue = coordinates.top;
            }
        }
        else if (isNOU(args.x) && isNOU(args.y) && (this.parent.inlineMode.enable || !isNOU(this.parent.quickToolbarSettings.text))) {
            this.parent.notify(events.hidePopup, {});
            if (this.parent.contentModule.getDocument().getSelection().rangeCount > 0) {
                var coordinates = this.getCoordinates();
                xValue = coordinates.left;
                yValue = coordinates.top;
            }
        }
        else {
            target = this.parent.inputElement;
            xValue = args.x;
            yValue = args.y;
        }
        this.popupObj = new Popup(this.popDiv, {
            targetType: 'relative',
            relateTo: target,
            collision: { X: 'fit', Y: 'none' },
            offsetY: 8,
            viewPortElement: this.parent.element,
            position: { X: xValue, Y: yValue },
            enableRtl: this.parent.enableRtl,
            zIndex: parseInt(zIndex, 10) + 1,
            actionOnScroll: 'hide',
            close: function () {
                _this.parent.isBlur = false;
                _this.childDestroy();
                _this.popupObj.element.parentElement.style.zIndex = '';
                detach(_this.popupObj.element);
                _this.popupObj = null;
                var activeElement = _this.divElement.firstChild;
                activeElement.focus();
            }
        });
        this.isPopupDestroyed = false;
        addClass([this.popupObj.element], 'e-popup-open');
        this.popupObj.element.parentElement.style.zIndex = '11';
        this.popupObj.refreshPosition(target);
        // header search element
        if ((!isNOU(args.args) || (isNOU(args.x) && isNOU(args.y))) &&
            this.parent.emojiPickerSettings.showSearchBox) {
            var inputEle = createElement('input', { id: 'e-rte-emoji-search', className: 'e-rte-emoji-search' });
            this.popDiv.append(inputEle);
            var inputobj = new TextBox({
                placeholder: this.i10n.getConstant('emojiPickerTypeToFind'),
                showClearButton: true
            });
            inputobj.appendTo(inputEle);
            if (this.parent.userAgentData.isSafari() && this.parent.inputElement.contains(this.parent.getRange().startContainer)) {
                this.parent.notify(events.selectionSave, {});
            }
            inputEle.focus();
        }
        var closeIcon = this.popupObj.element.querySelector('.e-clear-icon');
        if (!isNOU(closeIcon)) {
            EventHandler.add(closeIcon, 'mousedown', this.searchFilter, this);
        }
        // Header emoji toolbar div
        var emojiToolBar = this.parent.createElement('div', { className: 'e-rte-emojipicker-toolbar' });
        this.popDiv.appendChild(emojiToolBar);
        var pushToolBar = [];
        for (var i = 0; i < this.parent.emojiPickerSettings.iconsSet.length; i++) {
            if (!isNOU(this.parent.emojiPickerSettings.iconsSet[i].iconCss)) {
                pushToolBar.push({ prefixIcon: this.parent.emojiPickerSettings.iconsSet[i].iconCss, htmlAttributes: (_a = {}, _a['title'] = this.parent.emojiPickerSettings.iconsSet[i].name, _a) });
            }
            else {
                pushToolBar.push({ text: '&#x' + this.parent.emojiPickerSettings.iconsSet[i].code + ';', htmlAttributes: (_b = {}, _b['title'] = this.parent.emojiPickerSettings.iconsSet[i].name, _b) });
            }
        }
        var toolbarObj = new Toolbar({
            items: pushToolBar,
            clicked: this.emojiToolbarClick.bind(this)
        });
        toolbarObj.appendTo(emojiToolBar);
        // emoji btn div
        var emojiBtnDiv = this.parent.createElement('div', { className: 'e-rte-emojipicker-btn' });
        this.popDiv.appendChild(emojiBtnDiv);
        var height;
        var popupBorder = window.getComputedStyle(this.popDiv);
        if ((isNOU(args.args) && !(isNOU(args.x) && isNOU(args.y))) ||
            !this.parent.emojiPickerSettings.showSearchBox) {
            height = (this.popDiv.getBoundingClientRect().height - emojiToolBar.getBoundingClientRect().height - (2 * parseFloat(popupBorder.borderWidth))) + 'px';
            emojiBtnDiv.style.setProperty('height', height, 'important');
        }
        else {
            var inputELe = this.parent.element.querySelector('.e-rte-emoji-search').parentElement;
            var getComputedStyle_1 = window.getComputedStyle(inputELe);
            height = (this.popDiv.getBoundingClientRect().height - emojiToolBar.getBoundingClientRect().height
                - inputELe.getBoundingClientRect().height
                - parseFloat(getComputedStyle_1.marginTop) - parseFloat(getComputedStyle_1.marginBottom)
                - (2 * parseFloat(popupBorder.borderWidth))) + 'px';
            emojiBtnDiv.style.setProperty('height', height, 'important');
        }
        for (var i = 0; i < emojiPicker.length; i++) {
            var emojiGroupDiv = this.parent.createElement('div', { className: 'e-rte-emojipicker-group' });
            emojiBtnDiv.appendChild(emojiGroupDiv);
            var emojiName = this.parent.createElement('div', { className: 'e-rte-emojipicker-name' });
            emojiName.innerText = this.parent.emojiPickerSettings.iconsSet[i].name;
            emojiName.setAttribute('aria-label', this.parent.emojiPickerSettings.iconsSet[i].name);
            emojiGroupDiv.appendChild(emojiName);
            var emojiBtn = this.parent.createElement('div', { className: 'e-rte-emojipickerbtn-group' });
            emojiGroupDiv.appendChild(emojiBtn);
            for (var j = 0; j < emojiPicker[i].icons.length; j++) {
                var button = this.parent.createElement('button', { className: 'e-btn ' + ' ' + 'e-control' });
                button.innerHTML = this.buttoncode(this.parent.emojiPickerSettings.iconsSet[i].icons[j].code);
                button.setAttribute('aria-label', (this.parent.emojiPickerSettings.iconsSet[i].icons[j].desc));
                button.setAttribute('title', (this.parent.emojiPickerSettings.iconsSet[i].icons[j].desc));
                emojiBtn.appendChild(button);
                if (button.innerHTML.length > 2) {
                    button.style.fontSize = '17px';
                }
            }
        }
        EventHandler.add(emojiBtnDiv, 'scroll', this.scrollEvent, this);
        EventHandler.add(emojiBtnDiv, 'click', this.emojiBtnClick, this);
        var emojiButtons = this.parent.element.querySelectorAll('.e-rte-emojipicker-btn button');
        if (isNOU(this.parent.element.querySelector('.e-rte-emoji-search')) && !isNOU(args.args)) {
            emojiButtons[0].focus();
            addClass([emojiButtons[0]], 'e-focus');
        }
        var popup = this.parent.element.querySelector('.e-rte-emojipicker-btn');
        var toolbarName = this.parent.element.querySelectorAll('.e-rte-emojipicker-toolbar button');
        var scrollTop;
        if (!isNOU(popup)) {
            scrollTop = Math.round(popup.scrollTop);
        }
        if (scrollTop < toolbarName[0].offsetHeight) {
            addClass([toolbarName[0]], 'e-selected');
        }
        if (this.popupObj) {
            addClass([this.divElement], 'e-active');
        }
    };
    EmojiPicker.prototype.onIframeMouseDown = function (e) {
        if (this.popupObj) {
            removeClass([this.divElement], 'e-active');
            this.popupObj.hide();
        }
    };
    EmojiPicker.prototype.buttoncode = function (value) {
        var valueLength = value.split('-');
        // eslint-disable-next-line
        var joinedEmoji = valueLength.map(function (cp) { return String.fromCodePoint(parseInt(cp, 16)); }).join('\u200D');
        return joinedEmoji;
    };
    EmojiPicker.prototype.docClick = function (e) {
        var target = e.args.target;
        if (target && target.classList && ((this.popupObj && !closest(target, '[id=' + '\'' + this.popupObj.element.id + '\'' + ']')))
            && (!target.classList.contains('e-emoji') && !target.classList.contains('e-toolbar-item'))) {
            if (this.popupObj) {
                removeClass([this.divElement], 'e-active');
                this.popupObj.hide();
            }
        }
    };
    EmojiPicker.prototype.scrollEvent = function () {
        var popup = this.parent.element.querySelector('.e-rte-emojipicker-btn');
        var emojiSet = this.parent.element.querySelectorAll('.e-rte-emojipicker-group');
        var toolbarName = this.parent.element.querySelectorAll('.e-rte-emojipicker-toolbar button');
        var scrollTop;
        if (!isNOU(popup)) {
            scrollTop = Math.round(popup.scrollTop);
        }
        var firstSetWidth = 0;
        for (var j = 0; j < toolbarName.length; j++) {
            if (scrollTop < toolbarName[0].offsetHeight) {
                if (!isNOU(toolbarName[j + 1])) {
                    removeClass([toolbarName[j + 1]], 'e-selected');
                }
                addClass([toolbarName[0]], 'e-selected');
            }
        }
        for (var i = 0; i < emojiSet.length; i++) {
            firstSetWidth += Math.round(emojiSet[i].offsetHeight);
            if (scrollTop >= firstSetWidth) {
                for (var k = 0; k < toolbarName.length; k++) {
                    if (toolbarName[k].classList.contains('e-selected')) {
                        removeClass([toolbarName[k]], 'e-selected');
                    }
                    /* eslint-enable */
                }
                if (!isNOU(toolbarName[i + 1])) {
                    addClass([toolbarName[i + 1]], 'e-selected');
                }
            }
        }
    };
    EmojiPicker.prototype.contentscroll = function () {
        if (isNOU(this.clickEvent) && this.popupObj) {
            removeClass([this.divElement], 'e-active');
            this.popupObj.hide();
            return;
        }
    };
    EmojiPicker.prototype.emojiToolbarClick = function (e) {
        var args = {
            // eslint-disable-next-line
            text: e.item.htmlAttributes.title,
        };
        var currentEleName = args.text;
        var emojiGroups = this.parent.element.querySelectorAll('.e-rte-emojipicker-group');
        var emojiButtons = this.parent.element.querySelectorAll('.e-rte-emojipicker-btn button');
        var toolbarName = this.parent.element.querySelectorAll('.e-rte-emojipicker-toolbar button');
        for (var i = 0; i < toolbarName.length; i++) {
            if (toolbarName[i].classList.contains('e-selected')) {
                removeClass([toolbarName[i]], 'e-selected');
            }
            /* eslint-enable */
        }
        for (var i = 0; i < emojiButtons.length; i++) {
            if (emojiButtons[i].classList.contains('e-focus')) {
                removeClass([emojiButtons[i]], 'e-focus');
            }
        }
        // Loop through the selected elements and perform the same operation on each element
        var emojiGroupsheight = this.parent.element.querySelector('.e-rte-emojipicker-btn');
        var emojiHeight = 0;
        // eslint-disable-next-line
        emojiGroups.forEach(function (group) {
            var childNodes = group.childNodes[0];
            var focusBtn = group.childNodes[1].childNodes[0];
            var ariaLabel = childNodes.getAttribute('aria-label');
            if (currentEleName === ariaLabel) {
                if (childNodes) {
                    emojiGroupsheight.scrollTop = emojiHeight + 10;
                    addClass([focusBtn], 'e-focus');
                    focusBtn.focus();
                }
            }
            else {
                emojiHeight += group.scrollHeight;
                removeClass([focusBtn], 'e-focus');
            }
        });
    };
    EmojiPicker.prototype.onKeyDown = function (e) {
        // Select all emoji buttons
        var emojiButtons = this.parent.element.querySelectorAll('.e-rte-emojipicker-btn button');
        var emojiGroups = this.parent.element.querySelectorAll('.e-rte-emojipickerbtn-group');
        var searchKeyHandler = this.parent.element.querySelector('.e-rte-emojisearch-btn button');
        if (e.keyCode === 27) {
            if (this.popupObj) {
                removeClass([this.divElement], 'e-active');
                this.popupObj.hide();
            }
        }
        if (e.keyCode === 13) {
            var activeEle = document.activeElement;
            if (activeEle.classList.contains('e-btn')) {
                this.emojiBtnClick(e);
                e.preventDefault();
            }
        }
        var srcElement = e.srcElement;
        if (!isNOU(srcElement)) {
            if (srcElement.classList.contains('e-rte-emoji-search') && e.keyCode === 40) {
                for (var i = 0; i < emojiButtons.length; i++) {
                    if (emojiButtons[i].classList.contains('e-focus')) {
                        removeClass([emojiButtons[i]], 'e-focus');
                    }
                }
            }
        }
        if (!isNOU(searchKeyHandler)) {
            this.filterKeyHandler(e);
        }
        else {
            for (var i = 0; i < emojiButtons.length; i++) {
                var focusIndex = i;
                if (emojiButtons[i].classList.contains('e-focus')) {
                    if (e.keyCode === 40) {
                        // Move focus to next row if there is one
                        if (emojiButtons.length - 4 > i) {
                            var count = 0;
                            for (var j = 0; j < emojiGroups.length; j++) {
                                for (var k = 0; k < emojiGroups[j].childNodes.length; k++) {
                                    // eslint-disable-next-line
                                    var childNodes = emojiGroups[j].childNodes[k];
                                    if (childNodes.classList.contains('e-focus') && count !== 1) {
                                        var currentIndex = k;
                                        var lastChild = emojiGroups[j].lastChild;
                                        var lastRowIndex = Math.floor((k) % 6);
                                        var lastEleLength = emojiGroups[j].childNodes.length - 1;
                                        var lastEleIndex = Math.floor((lastEleLength) % 6);
                                        if (currentIndex !== -1) {
                                            var nextRowIndex = currentIndex + 6;
                                            if (!isNOU(emojiGroups[j].childNodes[nextRowIndex])) {
                                                // next row has six buttons
                                                // handle focus change here
                                                var firstFocusEle = emojiButtons[i];
                                                removeClass([firstFocusEle], 'e-focus');
                                                var focusEle = emojiButtons[focusIndex += 6];
                                                addClass([focusEle], 'e-focus');
                                                focusEle.focus();
                                                break;
                                            }
                                            else if (isNOU(emojiGroups[j].childNodes[nextRowIndex]) && !lastChild.classList.contains('e-focus') && lastEleIndex < lastRowIndex) {
                                                var firstFocusEle = emojiButtons[i];
                                                removeClass([firstFocusEle], 'e-focus');
                                                var focusEle = emojiGroups[j].lastChild;
                                                addClass([focusEle], 'e-focus');
                                                focusEle.focus();
                                                count = 1;
                                                break;
                                            }
                                            else {
                                                var firstFocusEle = emojiButtons[i];
                                                removeClass([firstFocusEle], 'e-focus');
                                                var focusEle = emojiGroups[j + 1]
                                                    .childNodes[lastRowIndex];
                                                addClass([focusEle], 'e-focus');
                                                focusEle.focus();
                                                count = 1;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        }
                    }
                    else if (e.keyCode === 38) {
                        // Move focus to previous row if there is one
                        if (i >= 6) {
                            var count = 0;
                            for (var j = 0; j < emojiGroups.length; j++) {
                                for (var k = 0; k < emojiGroups[j].childNodes.length; k++) {
                                    var childNodes = emojiGroups[j].childNodes[k];
                                    if (childNodes.classList.contains('e-focus') && count !== 1) {
                                        // eslint-disable-next-line
                                        var currentIndex = k;
                                        var previousRowLength = isNOU(emojiGroups[j - 1]) ? null :
                                            emojiGroups[j - 1].childNodes.length % 6 || 6;
                                        if (currentIndex !== -1) {
                                            var previousRowIndex = currentIndex - 6;
                                            if (!isNOU(emojiGroups[j].childNodes[previousRowIndex])) {
                                                // previous row has six buttons
                                                // handle focus change here
                                                var firstFocusEle = emojiButtons[i];
                                                removeClass([firstFocusEle], 'e-focus');
                                                var focusEle = emojiButtons[focusIndex -= 6];
                                                addClass([focusEle], 'e-focus');
                                                focusEle.focus();
                                                break;
                                            }
                                            else if (isNOU(emojiGroups[j - 1].childNodes[emojiGroups[j - 1]
                                                .childNodes.length - (previousRowLength - k)])) {
                                                var firstFocusEle = emojiButtons[i];
                                                removeClass([firstFocusEle], 'e-focus');
                                                var focusEle = emojiGroups[j - 1].lastChild;
                                                addClass([focusEle], 'e-focus');
                                                focusEle.focus();
                                                count = 1;
                                                break;
                                            }
                                            else {
                                                // previous row has less than six buttons
                                                // handle focus change here
                                                var firstFocusEle = emojiButtons[i];
                                                removeClass([firstFocusEle], 'e-focus');
                                                var focusEle = emojiGroups[j - 1].childNodes[emojiGroups[j - 1].
                                                    childNodes.length - (previousRowLength - k)];
                                                addClass([focusEle], 'e-focus');
                                                focusEle.focus();
                                                count = 1;
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            var firstFocusEle = emojiButtons[i];
                            removeClass([firstFocusEle], 'e-focus');
                            var focusEle = emojiButtons[focusIndex -= 1];
                            var inputELe = this.popupObj.element.querySelector('.e-rte-emoji-search');
                            if (isNOU(focusEle) && !isNOU(inputELe)) {
                                inputELe.focus();
                                break;
                            }
                            addClass([focusEle], 'e-focus');
                            focusEle.focus();
                        }
                        break;
                    }
                    else if (e.keyCode === 39) {
                        // Move focus to next button in current row
                        if (emojiButtons.length !== i + 1) {
                            var firstFocusEle = emojiButtons[i];
                            removeClass([firstFocusEle], 'e-focus');
                            var focusEle = emojiButtons[focusIndex += 1];
                            addClass([focusEle], 'e-focus');
                            emojiButtons[focusIndex].focus();
                        }
                        break;
                    }
                    else if (e.keyCode === 37) {
                        // Move focus to previous button in current row
                        if (i > 0) {
                            var firstFocusEle = emojiButtons[i];
                            removeClass([firstFocusEle], 'e-focus');
                            var focusEle = emojiButtons[focusIndex -= 1];
                            addClass([focusEle], 'e-focus');
                            emojiButtons[focusIndex].focus();
                        }
                        break;
                    }
                }
            }
        }
        if (e.keyCode === 40) {
            var firstFocusEle = this.parent.element.querySelector('.e-focus');
            if (isNOU(firstFocusEle)) {
                var focusEle = emojiButtons[0];
                addClass([focusEle], 'e-focus');
                if (this.parent.userAgentData.isSafari() && this.parent.inputElement.contains(this.parent.getRange().startContainer)) {
                    this.parent.notify(events.selectionSave, {});
                }
                emojiButtons[0].focus();
            }
        }
    };
    EmojiPicker.prototype.filterKeyHandler = function (e) {
        var emojiButtons = this.parent.element.querySelectorAll('.e-rte-emojisearch-btn button');
        var firstFocusEle = this.parent.element.querySelector('.e-focus');
        if (isNOU(firstFocusEle) && e.keyCode === 40) {
            var focusEle = emojiButtons[0];
            addClass([focusEle], 'e-focus');
            if (this.parent.userAgentData.isSafari()) {
                this.parent.notify(events.selectionSave, {});
            }
            emojiButtons[0].focus();
        }
        else {
            for (var i = 0; i < emojiButtons.length; i++) {
                var focusIndex = i;
                var childNodes = emojiButtons[i];
                if (childNodes.classList.contains('e-focus')) {
                    if (e.keyCode === 38) {
                        if (i >= 6) {
                            var firstFocusEle_1 = emojiButtons[i];
                            removeClass([firstFocusEle_1], 'e-focus');
                            var focusEle = emojiButtons[focusIndex -= 6];
                            addClass([focusEle], 'e-focus');
                            focusEle.focus();
                            break;
                        }
                        else {
                            var firstFocusEle_2 = emojiButtons[i];
                            removeClass([firstFocusEle_2], 'e-focus');
                            var focusEle = emojiButtons[focusIndex -= 1];
                            var inputELe = this.popupObj.element.querySelector('.e-rte-emoji-search');
                            if (isNOU(focusEle) && !isNOU(inputELe)) {
                                inputELe.focus();
                                break;
                            }
                            addClass([focusEle], 'e-focus');
                            focusEle.focus();
                        }
                    }
                    else if (e.keyCode === 40) {
                        if (emojiButtons.length - 6 > i) {
                            var firstFocusEle_3 = emojiButtons[i];
                            removeClass([firstFocusEle_3], 'e-focus');
                            var focusEle = emojiButtons[focusIndex += 6];
                            addClass([focusEle], 'e-focus');
                            focusEle.focus();
                            break;
                        }
                    }
                    else if (e.keyCode === 39) {
                        if (emojiButtons.length !== i + 1) {
                            var firstFocusEle_4 = emojiButtons[i];
                            removeClass([firstFocusEle_4], 'e-focus');
                            var focusEle = emojiButtons[focusIndex += 1];
                            addClass([focusEle], 'e-focus');
                            emojiButtons[focusIndex].focus();
                        }
                        break;
                    }
                    else if (e.keyCode === 37) {
                        if (i > 0) {
                            var firstFocusEle_5 = emojiButtons[i];
                            removeClass([firstFocusEle_5], 'e-focus');
                            var focusEle = emojiButtons[focusIndex -= 1];
                            addClass([focusEle], 'e-focus');
                            emojiButtons[focusIndex].focus();
                            break;
                        }
                    }
                }
            }
        }
    };
    EmojiPicker.prototype.searchFilter = function (e, value, hasInternalCall) {
        if (hasInternalCall === void 0) { hasInternalCall = false; }
        var inputElement = this.parent.element.querySelector('.e-rte-emoji-search');
        var contentELe = this.parent.iframeSettings.enable ? this.parent.contentModule.getPanel() :
            this.parent.element.querySelector('.e-content');
        if (document.activeElement === inputElement || document.activeElement === contentELe) {
            var trimmedStr = void 0;
            if (value !== ':' && !isNOU(value)) {
                trimmedStr = value.replace(/^:/, '');
            }
            else if (!isNOU(value)) {
                trimmedStr = value;
            }
            var inputValue = isNOU(inputElement) ? trimmedStr : inputElement.value;
            var emojiButtons = this.parent.element.querySelectorAll('.e-rte-emojipicker-btn button');
            var emojipickerAll = this.parent.element.querySelector('.e-rte-emojipicker-btn');
            var emojiGroups = this.parent.element.querySelectorAll('.e-rte-emojipicker-group');
            var toolbarGroup = this.parent.element.querySelector('.e-rte-emojipicker-toolbar');
            var excludedDiv_1 = this.parent.element.querySelector('.e-rte-emojisearch-btn');
            var firstChild = this.popDiv.childNodes[0];
            var getComputedStyle_2 = window.getComputedStyle(firstChild);
            var inputHeight = firstChild.nodeName === 'SPAN' ? (firstChild.getBoundingClientRect().height + parseFloat(getComputedStyle_2.marginTop) +
                parseFloat(getComputedStyle_2.marginBottom)) : 0;
            var popupBorder = window.getComputedStyle(this.popDiv);
            // eslint-disable-next-line @typescript-eslint/tslint/config
            var filteredButtons = isNOU(excludedDiv_1) ? emojiButtons :
                // eslint-disable-next-line @typescript-eslint/tslint/config
                Array.from(emojiButtons).filter(function (button) { return !excludedDiv_1.contains(button); });
            if (!isNOU(toolbarGroup) && !isNOU(emojipickerAll) && !isNOU(inputValue)) {
                if (inputValue === '' || value === ':') {
                    toolbarGroup.style.display = '';
                    emojipickerAll.style.height = (this.popDiv.getBoundingClientRect().height - toolbarGroup.getBoundingClientRect().height - inputHeight - (2 * parseFloat(popupBorder.borderWidth))) + 'px';
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    emojiGroups.forEach(function (element) {
                        element.style.display = '';
                    });
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    emojiGroups.forEach(function (element) {
                        element.style.display = 'none';
                    });
                    toolbarGroup.style.display = 'none';
                    emojipickerAll.style.height = (this.popDiv.getBoundingClientRect().height - inputHeight - (2 * parseFloat(popupBorder.borderWidth))) + 'px';
                }
                var emojiBtnDiv = this.parent.createElement('div', { className: 'e-rte-emojisearch-btn' });
                var emojis = this.parent.element.querySelector('.e-rte-emojisearch-btn');
                if (emojis) {
                    emojis.remove();
                }
                var noEMoji = true;
                for (var i = 0; i < filteredButtons.length; i++) {
                    if (!isNOU(filteredButtons[i].getAttribute('title'))) {
                        var title = filteredButtons[i].getAttribute('title').toLowerCase();
                        var titleLength = title.split(' ');
                        for (var j = 0; j < titleLength.length; j++) {
                            if (titleLength[j].startsWith(inputValue.toLowerCase()) && inputValue !== '') {
                                var emoji = filteredButtons[i].cloneNode(true);
                                emojiBtnDiv.appendChild(emoji);
                                noEMoji = false;
                                break;
                            }
                        }
                    }
                }
                var noEmojiObj = this.parent.createElement('div', { className: 'e-rte-emojiSearch-noEmoji' });
                if (noEMoji && !this.parent.element.querySelector('.e-rte-emojiSearch-noEmoji') && (inputValue !== '' && value !== ':' && value !== ': :')) {
                    if (!isNOU(noEmojiObj)) {
                        noEmojiObj.innerHTML = '<span style="color: rgba(0, 0, 0, 0.75); font-weight: 500; font-size: 16px;">' + this.i10n.getConstant('emojiPickerNoResultFound') + ' 😥 </span>' + '<br>' + '<span style="color: rgba(0, 0, 0, 0.75);"> ' + this.i10n.getConstant('emojiPickerTrySomethingElse') + ' ? </span>';
                        noEmojiObj.style.margin = '55px';
                        emojipickerAll.appendChild(noEmojiObj);
                    }
                }
                else if (!noEMoji && this.parent.element.querySelector('.e-rte-emojiSearch-noEmoji') || (inputValue === '' && value === ':') || (inputValue === '' && this.parent.element.querySelector('.e-rte-emojiSearch-noEmoji'))) {
                    emojipickerAll.removeChild(this.parent.element.querySelector('.e-rte-emojiSearch-noEmoji'));
                }
                emojipickerAll.appendChild(emojiBtnDiv);
                if (hasInternalCall) {
                    if (noEMoji && value !== ':') {
                        this.noResultsFoundCount += 1;
                    }
                    else {
                        this.noResultsFoundCount = 0;
                    }
                    if (this.noResultsFoundCount >= 9) {
                        if (!isNOU(this.popupObj)) {
                            removeClass([this.divElement], 'e-active');
                            this.popupObj.hide();
                            this.noResultsFoundCount = 0;
                            return;
                        }
                    }
                }
            }
            else {
                return;
            }
        }
        else {
            return;
        }
    };
    EmojiPicker.prototype.emojiBtnClick = function (e) {
        var event = new MouseEvent('mouseleave', { bubbles: true, cancelable: true });
        // Includes the emote button element tooltip and toolbar tooltip
        var emotePickerTooltips = this.parent.element.querySelectorAll('.e-rte-emojipicker-popup [data-tooltip-id]');
        for (var i = 0; i < emotePickerTooltips.length; i++) {
            emotePickerTooltips[i].dispatchEvent(event);
        }
        var targetEle = e.target;
        if (targetEle.tagName !== 'BUTTON') {
            return;
        }
        targetEle.focus();
        var startOffset = this.save.startOffset;
        var textContent = this.save.range.startContainer.textContent;
        var previousText = textContent.substring(startOffset, startOffset + 1);
        // When toolbar action is clicked then only restore the range.
        if (!isNOU(this.clickEvent) || previousText !== ':') {
            this.save.restore();
        }
        if (this.popupObj) {
            removeClass([this.divElement], 'e-active');
            this.popupObj.hide();
        }
        if (this.parent.userAgentData.isSafari() && e.type === 'keydown') {
            this.parent.notify(events.selectionRestore, {});
        }
        var originalEvent = e;
        this.parent.formatter.process(this.parent, {
            item: {
                'command': 'EmojiPicker',
                'subCommand': 'EmojiPicker',
                value: targetEle.innerHTML
            },
            originalEvent: originalEvent
        }, e, originalEvent);
    };
    EmojiPicker.prototype.onkeyPress = function (e) {
        var originalEvent = e.args;
        var selection = (this.parent.iframeSettings.enable) ?
            this.parent.contentModule.getPanel().contentWindow.getSelection() :
            this.parent.contentModule.getDocument().getSelection();
        if (selection.rangeCount <= 0) {
            return;
        }
        var range = selection.getRangeAt(0);
        var cursorPos = range.startOffset;
        var prevChar = selection.focusNode.textContent.substring(cursorPos - 1, cursorPos);
        var isPrevSpace = /\s/.test(prevChar);
        var isPrevColon = selection.focusNode.textContent.substring(cursorPos - 1, cursorPos) === ':';
        var colon = selection.focusNode.textContent.charAt(cursorPos - 1) === ':';
        if (originalEvent.keyCode === 186 && originalEvent.shiftKey && (isPrevSpace || selection.focusOffset === 0)) {
            var coordinates = this.getCoordinates();
            this.parent.showEmojiPicker(coordinates.left, coordinates.top);
        }
        if (originalEvent.keyCode === 8 && colon && this.popupObj) {
            removeClass([this.divElement], 'e-active');
            this.popupObj.hide();
        }
        if (originalEvent.keyCode === 32 && isPrevColon && this.popupObj) {
            removeClass([this.divElement], 'e-active');
            var currentDocument = this.parent.iframeSettings.enable ? this.parent.contentModule.getPanel().ownerDocument :
                this.parent.contentModule.getDocument();
            if (this.parent.showTooltip && !isNOU(currentDocument.querySelector('.e-tooltip-wrap'))) {
                this.parent.notify(events.destroyTooltip, { args: event });
            }
            this.popupObj.hide();
        }
        if (this.popupObj && (originalEvent.keyCode === 37 || originalEvent.keyCode === 38 || originalEvent.keyCode === 39
            || originalEvent.keyCode === 27 || originalEvent.keyCode === 40)) {
            this.onKeyDown(originalEvent);
            originalEvent.preventDefault();
        }
    };
    EmojiPicker.prototype.onkeyUp = function (e) {
        var originalEvent = e.args;
        var selection = (this.parent.iframeSettings.enable) ?
            this.parent.contentModule.getPanel().contentWindow.getSelection() :
            this.parent.contentModule.getDocument().getSelection();
        if (selection.rangeCount <= 0) {
            return;
        }
        var range = selection.getRangeAt(0);
        var cursorPos = range.startOffset;
        // eslint-disable-next-line
        var selectedValue;
        var count = 0;
        for (var i = cursorPos - 1; i >= (cursorPos - selection.focusNode.textContent.length); i--) {
            var prevChar = selection.focusNode.textContent.substring(i - 1, i);
            var isPrevSpace = /:$/.test(prevChar);
            if (isPrevSpace && !isNOU(this.popDiv) && count === 0) {
                selectedValue = range.startContainer.textContent.substring(i - 1, cursorPos);
                this.searchFilter(originalEvent, selectedValue, true);
                count = 1;
            }
        }
        var colon = selection.focusNode.textContent.substring(cursorPos - 1, cursorPos);
        if (colon === ':' && !isNOU(this.popupObj)) {
            selectedValue = colon;
            this.searchFilter(originalEvent, selectedValue, true);
        }
    };
    EmojiPicker.prototype.getCoordinates = function () {
        var coordinates;
        var selection = (this.parent.iframeSettings.enable) ?
            this.parent.contentModule.getPanel().contentWindow.getSelection() : window.getSelection();
        var range = selection.getRangeAt(0);
        var firstChild;
        if (range.startContainer.nodeName === 'P' || range.startContainer.nodeName === 'DIV') {
            if (range.startContainer.childNodes[0].nodeName !== '#text') {
                firstChild = range.startContainer.childNodes[0];
            }
        }
        // eslint-disable-next-line
        var rect = isNOU(firstChild) ? range.getBoundingClientRect() : firstChild.getBoundingClientRect();
        var rteContent = this.parent.element.querySelector('.e-rte-content');
        var rteEle = this.parent.element;
        var toolbarHeight = rteEle.offsetHeight - rteContent.offsetHeight;
        var cursorTop = rect.top - this.parent.inputElement.getBoundingClientRect().top;
        var cursorLeft = rect.left - this.parent.inputElement.getBoundingClientRect().left;
        var screenHeight = window.innerHeight;
        var popupHeight = 330;
        var popupTop = cursorTop;
        var popupLeft = cursorLeft + rect.width;
        if (rteEle.getBoundingClientRect().top < 0 && !this.parent.inlineMode.enable) {
            popupTop = popupTop + rteContent.getBoundingClientRect().top - toolbarHeight;
        }
        if (rect.top < popupHeight) {
            // eslint-disable-next-line
            popupTop = popupTop;
        }
        else if (rect.top + popupHeight > screenHeight) {
            popupTop -= popupHeight + 20;
        }
        if (this.parent.inputElement) {
            coordinates = {
                top: popupTop + 60,
                left: popupLeft + 8
            };
        }
        return coordinates;
    };
    EmojiPicker.prototype.removeEventListener = function () {
        this.parent.off(events.emojiPicker, this.toolbarClick);
        this.parent.off(events.docClick, this.docClick);
        this.parent.off(events.iframeMouseDown, this.onIframeMouseDown);
        this.parent.off(events.keyDown, this.onkeyPress);
        this.parent.off(events.keyUp, this.onkeyUp);
        this.parent.off(events.contentscroll, this.contentscroll);
        this.parent.off(events.scroll, this.contentscroll);
        this.parent.off(events.destroy, this.destroy);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the string value
     */
    EmojiPicker.prototype.getModuleName = function () {
        return 'emojiPicker';
    };
    return EmojiPicker;
}());
export { EmojiPicker };
