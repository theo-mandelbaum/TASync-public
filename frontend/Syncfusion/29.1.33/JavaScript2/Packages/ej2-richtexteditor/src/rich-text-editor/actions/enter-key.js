import { isNullOrUndefined as isNOU, detach, Browser } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
/**
 * `EnterKey` module is used to handle enter key press actions.
 */
var EnterKeyAction = /** @class */ (function () {
    function EnterKeyAction(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    EnterKeyAction.prototype.addEventListener = function () {
        this.parent.on(events.enterHandler, this.enterHandler, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    EnterKeyAction.prototype.destroy = function () {
        if (isNOU(this.parent)) {
            return;
        }
        this.removeEventListener();
    };
    EnterKeyAction.prototype.removeEventListener = function () {
        this.parent.off(events.enterHandler, this.enterHandler);
        this.parent.off(events.destroy, this.destroy);
    };
    EnterKeyAction.prototype.getRangeNode = function () {
        this.range = this.parent.getRange();
        this.startNode = this.range.startContainer.nodeName === '#text' ? this.range.startContainer.parentElement :
            this.range.startContainer;
        this.endNode = this.range.endContainer.nodeName === '#text' ? this.range.endContainer.parentElement :
            this.range.endContainer;
    };
    EnterKeyAction.prototype.enterHandler = function (e) {
        var _this = this;
        this.getRangeNode();
        var isTableEnter = true;
        this.formatTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote'];
        var tableImagCursor = this.processedTableImageCursor();
        if (tableImagCursor.start || tableImagCursor.end) {
            if (tableImagCursor.startName === 'TABLE' || tableImagCursor.endName === 'TABLE') { // Default browser action prevented and hanled manually.
                this.handleCursorAtTableSide(e, tableImagCursor.start, tableImagCursor.end);
                return;
            }
        }
        if (tableImagCursor.start || tableImagCursor.end || this.range.startContainer.nodeName === 'IMG') {
            if (this.parent.enterKey === 'BR' && (tableImagCursor.startName === 'IMG' || tableImagCursor.endName === 'IMG' || this.range.startContainer.nodeName === 'IMG')) { // Default browser action prevented and hanled manually.
                this.handleEnterKeyAtImageSide(e, tableImagCursor.start, tableImagCursor.end);
                return;
            }
        }
        if (!isNOU(this.startNode.closest('TABLE')) && !isNOU(this.endNode.closest('TABLE'))) {
            isTableEnter = false;
            var curElement = this.startNode;
            var blockElement = curElement;
            while (!this.parent.formatter.editorManager.domNode.isBlockNode(curElement)) {
                curElement = curElement.parentElement;
                blockElement = curElement;
            }
            isTableEnter = blockElement.tagName === 'TH' || blockElement.tagName === 'TD' || blockElement.tagName === 'TBODY' ? false : true;
        }
        var eventArgs = e.args;
        if (eventArgs.which === 13 && !eventArgs.ctrlKey && (!Browser.isDevice ? (eventArgs.code === 'Enter' || eventArgs.code === 'NumpadEnter') : eventArgs.key === 'Enter')) {
            if (isNOU(this.startNode.closest('LI, UL, OL')) && isNOU(this.endNode.closest('LI, UL, OL')) &&
                isNOU(this.startNode.closest('.e-img-inner')) && isTableEnter &&
                isNOU(this.startNode.closest('PRE')) && isNOU(this.endNode.closest('PRE')) &&
                isNOU(this.startNode.closest('BLOCKQUOTE')) && isNOU(this.endNode.closest('BLOCKQUOTE'))) {
                var shiftKey_1 = e.args.shiftKey;
                var actionBeginArgs = {
                    cancel: false,
                    name: events.actionBegin,
                    requestType: shiftKey_1 ? 'ShiftEnterAction' : 'EnterAction',
                    originalEvent: e.args
                };
                this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                    if (!actionBeginArgs.cancel) {
                        if (_this.parent.formatter.getUndoRedoStack().length === 0) {
                            _this.parent.formatter.saveData();
                        }
                        if (!(_this.range.startOffset === _this.range.endOffset && _this.range.startContainer === _this.range.endContainer)) {
                            if (_this.range.startContainer.nodeType === Node.TEXT_NODE || !((_this.range.startContainer.nodeName === 'IMG' || _this.range.startContainer.querySelector('img')) ||
                                _this.range.startContainer.nodeName === 'SPAN' && (_this.range.startContainer.classList.contains('e-video-wrap') ||
                                    _this.range.startContainer.classList.contains('e-audio-wrap')))) {
                                _this.range.deleteContents();
                            }
                            if (_this.range.startContainer.nodeName === '#text' && _this.range.startContainer.textContent.length === 0 &&
                                _this.range.startContainer.parentElement !== _this.parent.inputElement) {
                                if (_this.parent.enterKey === 'BR') {
                                    _this.range.startContainer.parentElement.innerHTML = '&#8203;';
                                }
                                else {
                                    _this.range.startContainer.parentElement.innerHTML = '<br>';
                                }
                            }
                            else if (_this.range.startContainer === _this.parent.inputElement && _this.range.startContainer.innerHTML === '') {
                                if (_this.parent.enterKey === 'P') {
                                    _this.range.startContainer.innerHTML = '<p><br></p>';
                                }
                                else if (_this.parent.enterKey === 'DIV') {
                                    _this.range.startContainer.innerHTML = '<div><br></div>';
                                }
                                else {
                                    _this.range.startContainer.innerHTML = '<br>';
                                }
                                var focusElem = _this.range.startContainer.childNodes[_this.range.startOffset];
                                _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), focusElem, 0);
                            }
                            else if (_this.parent.inputElement === _this.range.startContainer) {
                                var focusElem = _this.range.startContainer.childNodes[_this.range.startOffset];
                                if (focusElem.nodeName === '#text' && focusElem.textContent.length === 0) {
                                    _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), focusElem, focusElem.textContent.length === 0 ? 0 : focusElem.previousSibling.textContent.length);
                                }
                                else {
                                    _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), focusElem, focusElem.textContent.length >= 0 ? 0 : 1);
                                    if (focusElem.previousSibling.textContent.length === 0) {
                                        detach(focusElem.previousSibling);
                                        if (!shiftKey_1) {
                                            var currentFocusElem = !isNOU(focusElem.lastChild) ? focusElem.lastChild : focusElem;
                                            while (!isNOU(currentFocusElem) && currentFocusElem.nodeName !== '#text' && currentFocusElem.nodeName !== 'BR') {
                                                currentFocusElem = currentFocusElem.lastChild;
                                            }
                                            if (currentFocusElem.nodeName !== 'BR' && currentFocusElem.parentElement.textContent.length === 0 && currentFocusElem.parentElement.innerHTML.length === 0 &&
                                                currentFocusElem.parentElement.nodeName !== 'BR') {
                                                currentFocusElem.parentElement.appendChild(_this.parent.createElement('BR'));
                                            }
                                            _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), currentFocusElem.nodeName === 'BR' ? currentFocusElem : currentFocusElem.parentElement, currentFocusElem.parentElement.textContent.length >= 0 || currentFocusElem.nodeName === 'BR' ? 0 : 1);
                                        }
                                    }
                                    else if (focusElem.textContent.length === 0) {
                                        var currentFocusElem = focusElem.previousSibling.nodeName === '#text' ? focusElem.previousSibling : focusElem.previousSibling.lastChild;
                                        while (!isNOU(currentFocusElem) && currentFocusElem.nodeName !== '#text') {
                                            currentFocusElem = currentFocusElem.lastChild;
                                        }
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), currentFocusElem, currentFocusElem.textContent.length);
                                        detach(focusElem);
                                    }
                                    else if (_this.parent.enterKey !== 'BR' &&
                                        focusElem.previousSibling.textContent.length !== 0 && focusElem.textContent.length !== 0) {
                                        e.args.preventDefault();
                                        return;
                                    }
                                }
                                _this.getRangeNode();
                            }
                        }
                        if (_this.range.startContainer === _this.range.endContainer &&
                            _this.range.startOffset === _this.range.endOffset && _this.range.startContainer === _this.parent.inputElement) {
                            if (!(_this.parent.inputElement.childNodes.length === 1 && _this.parent.inputElement.childNodes[0].nodeName === 'TABLE')) {
                                if (isNOU(_this.range.startContainer.childNodes[_this.range.startOffset])) {
                                    var currentLastElem = _this.range.startContainer.childNodes[_this.range.startOffset - 1];
                                    while (currentLastElem.lastChild !== null && currentLastElem.nodeName !== '#text') {
                                        currentLastElem = currentLastElem.lastChild;
                                    }
                                    _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), currentLastElem, (currentLastElem.nodeName === 'BR' ? 0 : currentLastElem.textContent.length));
                                }
                                else {
                                    _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), _this.range.startContainer.childNodes[_this.range.startOffset], 0);
                                }
                            }
                            _this.getRangeNode();
                        }
                        if ((_this.parent.enterKey === 'P' && !shiftKey_1) || (_this.parent.enterKey === 'DIV' && !shiftKey_1) ||
                            (_this.parent.shiftEnterKey === 'P' && shiftKey_1) ||
                            (_this.parent.shiftEnterKey === 'DIV' && shiftKey_1)) {
                            if ((_this.range.startOffset === 1 && _this.parent.inputElement.childNodes.length === 1 && _this.parent.inputElement.childNodes[0].nodeName === 'TABLE')) {
                                var newElem = _this.createInsertElement(shiftKey_1);
                                newElem.appendChild(_this.parent.createElement('BR'));
                                _this.parent.inputElement.appendChild(newElem);
                                _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), newElem, 0);
                            }
                            else {
                                var nearBlockNode = void 0;
                                if (isTableEnter && _this.parent.formatter.editorManager.domNode.isBlockNode(_this.startNode)) {
                                    if (_this.range.startContainer.nodeName === '#text' && !isNOU(_this.range.startContainer.previousSibling) && _this.range.startContainer.previousSibling.nodeName === 'HR') {
                                        nearBlockNode = _this.range.startContainer.nextSibling;
                                    }
                                    else {
                                        nearBlockNode = _this.startNode;
                                    }
                                }
                                else {
                                    nearBlockNode = _this.parent.formatter.editorManager.domNode.blockParentNode(_this.startNode);
                                }
                                var isMediaNode = false; // To check the image audio and video node cases
                                var isFocusedFirst = false;
                                var parentElement = _this.range.startContainer.parentElement;
                                var isPreWrapApplied = false;
                                var isTextWrapApplied = false;
                                if (parentElement) {
                                    var computedStyle = _this.parent.contentModule.getDocument()
                                        .defaultView.getComputedStyle(parentElement);
                                    isPreWrapApplied = computedStyle.getPropertyValue('white-space') === 'pre-wrap';
                                    isTextWrapApplied = computedStyle.getPropertyValue('text-wrap') === 'nowrap';
                                }
                                if (_this.range.startOffset !== 0 && _this.range.endOffset !== 0 &&
                                    _this.range.startContainer === _this.range.endContainer && !(!isNOU(nearBlockNode.childNodes[0])
                                    && (nearBlockNode.childNodes[0].nodeName === 'IMG' || nearBlockNode.querySelectorAll('img, audio, video').length > 0))) {
                                    var startNodeText = _this.range.startContainer.textContent;
                                    var splitFirstText = startNodeText.substring(0, _this.range.startOffset);
                                    var lastCharBeforeCursor = splitFirstText.charCodeAt(_this.range.startOffset - 1);
                                    var isSplitTextEmpty = splitFirstText.trim().length === 0;
                                    var hasContentAfterCursor = startNodeText.slice(_this.range.startOffset).trim().length !== 0;
                                    var isCursorAtStartNonPreWrap = lastCharBeforeCursor !== 160
                                        && isSplitTextEmpty && !isPreWrapApplied && !isTextWrapApplied;
                                    var isCursorAtStartPreWrapWithContent = lastCharBeforeCursor === 32
                                        && (isPreWrapApplied || isTextWrapApplied) && isSplitTextEmpty && hasContentAfterCursor;
                                    if ((isCursorAtStartNonPreWrap || isCursorAtStartPreWrapWithContent) &&
                                        !_this.range.startContainer.previousSibling) {
                                        isFocusedFirst = true;
                                    }
                                }
                                else if (_this.range.startOffset === 0 && _this.range.endOffset === 0) {
                                    isFocusedFirst = true;
                                }
                                _this.removeBRElement(nearBlockNode);
                                var fireFoxEnterAtMiddle = Browser.userAgent.indexOf('Firefox') !== -1 && _this.range.startOffset === 0 && _this.range.startContainer === _this.range.endContainer &&
                                    _this.range.startContainer.nodeName === '#text' && !isNOU(_this.range.startContainer.previousSibling) && !_this.parent.formatter.editorManager.domNode.isBlockNode(_this.range.startContainer.previousSibling) &&
                                    _this.range.startContainer.parentElement === _this.range.startContainer.previousSibling.parentElement;
                                var preventZeroWithSpace = ((_this.range.startContainer.nodeName === '#text' && _this.range.startContainer.textContent.includes('\u200B') &&
                                    _this.range.startContainer.textContent.trim() === '\u200B') ||
                                    (_this.range.startContainer.nodeName === '#text' && !isNOU(_this.range.startContainer.textContent[_this.range.startOffset]) &&
                                        _this.range.startContainer.textContent[_this.range.startOffset].includes('\u200B') && _this.range.startContainer.textContent[_this.range.startOffset] === '\u200B' &&
                                        _this.parent.inputElement.textContent[0] !== '\u200B'));
                                var preventEnterkeyShiftKey = (_this.range.startContainer.nodeName === '#text' || _this.range.startContainer.nodeName === 'BR') && (_this.range.startOffset === 0 && _this.range.endOffset === 0) && _this.range.startContainer.parentElement === _this.parent.inputElement && _this.parent.enterKey === 'BR' && shiftKey_1;
                                // eslint-disable-next-line max-len
                                if (!preventEnterkeyShiftKey && !preventZeroWithSpace && !fireFoxEnterAtMiddle && ((_this.range.startOffset === 0 && _this.range.endOffset === 0) || isFocusedFirst) &&
                                    !(!isNOU(_this.range.startContainer.previousSibling) &&
                                        (_this.range.startContainer.previousSibling.nodeName === 'IMG' || _this.range.startContainer.previousSibling.nodeName === 'BR'))) {
                                    var isNearBlockLengthZero = void 0;
                                    var newElem = void 0;
                                    if (!isNOU(_this.range.startContainer.childNodes) &&
                                        (_this.range.startContainer.textContent.length === 0 ||
                                            (_this.range.startContainer.nodeName !== '#text' && !isNOU(_this.range.startContainer.querySelector('.e-video-clickelem')) &&
                                                _this.range.startContainer.querySelector('.e-video-clickelem').textContent.length === 0)) &&
                                        (_this.range.startContainer.querySelectorAll('img, audio, video').length > 0 ||
                                            !isNOU(_this.range.startContainer.querySelector('.e-video-clickelem')) ||
                                            _this.range.startContainer.nodeName === 'IMG' || _this.range.startContainer.nodeName === 'TABLE')) {
                                        newElem = _this.createInsertElement(shiftKey_1);
                                        isMediaNode = true;
                                        isNearBlockLengthZero = false;
                                    }
                                    else {
                                        if ((nearBlockNode.textContent.trim().length !== 0 ||
                                            (!isNOU(nearBlockNode.childNodes[0]) && nearBlockNode.childNodes[0].nodeName === 'IMG') ||
                                            (nearBlockNode.textContent.trim() === '' && nearBlockNode.querySelectorAll('img, audio, video').length > 0))) {
                                            if ((_this.range.startOffset === _this.range.endOffset && _this.range.startOffset !== 0)) {
                                                newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, nearBlockNode, false).cloneNode(true);
                                            }
                                            else {
                                                newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, nearBlockNode, true).cloneNode(true);
                                                isMediaNode = true;
                                            }
                                            isNearBlockLengthZero = false;
                                        }
                                        else {
                                            newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, nearBlockNode, true).cloneNode(true);
                                            isNearBlockLengthZero = true;
                                        }
                                    }
                                    var insertElem = void 0;
                                    if (_this.formatTags.indexOf(newElem.nodeName.toLocaleLowerCase()) < 0) {
                                        insertElem = _this.createInsertElement(shiftKey_1);
                                    }
                                    else {
                                        insertElem = _this.parent.createElement(newElem.nodeName);
                                    }
                                    while (newElem.firstChild) {
                                        insertElem.appendChild(newElem.firstChild);
                                    }
                                    var isAudioVideo = _this.range.startContainer !== nearBlockNode && (nearBlockNode.querySelector('.e-video-wrap') ||
                                        nearBlockNode.querySelector('.e-audio-wrap') && _this.range.startContainer.classList.contains('e-clickelem')) ? true : false;
                                    var isImageElement = _this.range.startContainer !== nearBlockNode && nearBlockNode.querySelector('img') ? true : false;
                                    if (isAudioVideo) {
                                        _this.parent.formatter.editorManager.domNode.insertAfter(insertElem, nearBlockNode);
                                    }
                                    else {
                                        nearBlockNode.parentElement.insertBefore(insertElem, nearBlockNode);
                                    }
                                    if (!isNearBlockLengthZero) {
                                        var currentFocusElem = insertElem;
                                        var finalFocusElem = void 0;
                                        if (_this.range.startOffset === _this.range.endOffset && _this.range.startOffset !== 0) {
                                            while (!isNOU(currentFocusElem) && currentFocusElem.nodeName !== '#text' &&
                                                currentFocusElem.nodeName !== 'BR') {
                                                finalFocusElem = currentFocusElem;
                                                currentFocusElem = currentFocusElem.lastChild;
                                            }
                                        }
                                        else {
                                            finalFocusElem = currentFocusElem;
                                        }
                                        finalFocusElem.innerHTML = '<br>';
                                        if (!isMediaNode) {
                                            detach(nearBlockNode);
                                        }
                                    }
                                    if (isAudioVideo || isImageElement) {
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), insertElem, 0);
                                    }
                                    else {
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), insertElem.nextElementSibling, 0);
                                    }
                                }
                                else if (nearBlockNode !== _this.parent.inputElement && nearBlockNode.textContent.length === 0 && !(!isNOU(nearBlockNode.childNodes[0]) && nearBlockNode.childNodes[0].nodeName === 'IMG' ||
                                    (nearBlockNode.querySelectorAll('video').length > 0) || (nearBlockNode.querySelectorAll('audio').length > 0) || (nearBlockNode.querySelectorAll('img').length > 0))) {
                                    if (!isNOU(nearBlockNode.children[0]) && nearBlockNode.children[0].tagName !== 'BR') {
                                        var newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, nearBlockNode, false).cloneNode(true);
                                        _this.parent.formatter.editorManager.domNode.insertAfter(newElem, nearBlockNode);
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), newElem, newElem.textContent.length >= 0 ? 0 : 1);
                                    }
                                    else {
                                        var insertElem = _this.createInsertElement(shiftKey_1);
                                        insertElem.innerHTML = '<br>';
                                        _this.parent.formatter.editorManager.domNode.insertAfter(insertElem, nearBlockNode);
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), insertElem, 0);
                                    }
                                }
                                else if (_this.range.startContainer === _this.range.endContainer && _this.range.startContainer.nodeType !== Node.TEXT_NODE && ((_this.range.startContainer.nodeName === 'IMG' || _this.range.startContainer.querySelector('img')) ||
                                    (_this.range.startContainer.nodeName === 'SPAN' && (_this.range.startContainer.classList.contains('e-video-wrap') ||
                                        _this.range.startContainer.classList.contains('e-audio-wrap'))))) {
                                    if (nearBlockNode.textContent.trim().length > 0) {
                                        var newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, nearBlockNode, true);
                                        var audioVideoElem = !isNOU(newElem.previousSibling.querySelector('.e-video-wrap')) ?
                                            newElem.previousSibling.querySelector('.e-video-wrap') : newElem.previousSibling.querySelector('.e-audio-wrap');
                                        var isBRInserted = false;
                                        if (!isNOU(audioVideoElem)) {
                                            var lastNode = audioVideoElem.previousSibling;
                                            while (!isNOU(lastNode) && lastNode.nodeName !== '#text') {
                                                lastNode = lastNode.lastChild;
                                            }
                                            if (isNOU(lastNode)) {
                                                var brElm = _this.parent.createElement('br');
                                                audioVideoElem.parentElement.appendChild(brElm);
                                                isBRInserted = true;
                                            }
                                            if (isBRInserted) {
                                                _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), audioVideoElem.parentElement, 0);
                                            }
                                            else {
                                                _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), lastNode, lastNode.textContent.length);
                                            }
                                            detach(audioVideoElem);
                                        }
                                    }
                                    else {
                                        var newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, nearBlockNode, true);
                                        var focusElem = newElem.hasChildNodes() ? newElem.previousSibling : newElem;
                                        var imageElem = !isNOU(newElem.querySelector('img')) ?
                                            newElem.querySelector('img') : null;
                                        var insertElem = _this.createInsertElement(shiftKey_1);
                                        if (!isNOU(imageElem)) {
                                            if (isFocusedFirst) {
                                                newElem.parentElement.insertBefore(insertElem, newElem);
                                                focusElem = newElem.previousSibling;
                                            }
                                            else {
                                                _this.parent.formatter.editorManager.domNode.insertAfter(insertElem, newElem);
                                                focusElem = newElem.nextSibling;
                                            }
                                        }
                                        else if (isNOU(imageElem) && focusElem.querySelector('img')) {
                                            focusElem = newElem;
                                        }
                                        while (!isNOU(focusElem.firstChild)) {
                                            detach(focusElem.firstChild);
                                        }
                                        var brElm = _this.parent.createElement('br');
                                        focusElem.appendChild(brElm);
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), focusElem, 0);
                                    }
                                    if (!isNOU(_this.parent.audioModule)) {
                                        _this.parent.audioModule.hideAudioQuickToolbar();
                                    }
                                    if (!isNOU(_this.parent.videoModule)) {
                                        _this.parent.videoModule.hideVideoQuickToolbar();
                                    }
                                }
                                else if (_this.parent.enterKey === 'BR' && shiftKey_1 && _this.range.startContainer.nodeType === Node.TEXT_NODE && _this.range.startContainer.parentElement && _this.range.startContainer.parentElement === _this.parent.inputElement) {
                                    var range = _this.range;
                                    var startContainer = range.startContainer;
                                    var startOffset = range.startOffset;
                                    var newElement = _this.parent.createElement(_this.parent.shiftEnterKey);
                                    if (startContainer.nodeType === Node.TEXT_NODE && range.endOffset !== 0 && range.startOffset !== 0) {
                                        var textNode = startContainer;
                                        if (startOffset < textNode.length) {
                                            var newTextNode = textNode.splitText(startOffset);
                                            newElement.appendChild(newTextNode);
                                        }
                                        else {
                                            newElement.innerHTML = '<br>';
                                        }
                                        textNode.parentNode.insertBefore(newElement, textNode.nextSibling);
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), newElement, 0);
                                    }
                                    else if (startOffset === 0 && range.endOffset === 0) {
                                        newElement.innerHTML = '<br>';
                                        if (range.endOffset === startContainer.textContent.length) {
                                            var brElement = _this.parent.createElement('br');
                                            startContainer.parentNode.insertBefore(brElement, startContainer);
                                        }
                                        startContainer.parentNode.insertBefore(newElement, startContainer);
                                        var cursorTarget = (range.endOffset === startContainer.textContent.length)
                                            ? newElement : newElement.nextSibling;
                                        startContainer.parentNode.insertBefore(newElement, startContainer);
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), cursorTarget, 0);
                                    }
                                }
                                else {
                                    var newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, nearBlockNode, true);
                                    if (!isNOU(newElem.childNodes[0]) && newElem.childNodes[0].nodeName === '#text' &&
                                        newElem.childNodes[0].textContent.length === 0) {
                                        detach(newElem.childNodes[0]);
                                    }
                                    if (newElem.textContent.trim().length === 0 || (newElem.childNodes[0].textContent.trim().includes('\u200B') && newElem.childNodes[0].textContent.trim() === '\u200B')) {
                                        var brElm = _this.parent.createElement('br');
                                        if (_this.startNode.nodeName === 'A') {
                                            var startParentElem = _this.startNode.parentElement;
                                            _this.startNode.parentElement.insertBefore(brElm, _this.startNode);
                                            detach(_this.startNode);
                                            _this.startNode = startParentElem;
                                        }
                                        else {
                                            if (_this.startNode.nodeName !== 'BR') {
                                                _this.startNode.appendChild(brElm);
                                            }
                                        }
                                        if (newElem.childNodes[0].textContent === '\n') {
                                            detach(newElem.childNodes[0]);
                                        }
                                        if (newElem.childNodes[0].textContent.trim().includes('\u200B') && newElem.childNodes[0].textContent.trim() === '\u200B') {
                                            detach(newElem.childNodes[0]);
                                        }
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), _this.startNode, 0);
                                    }
                                    if (((_this.parent.enterKey === 'P' || _this.parent.enterKey === 'DIV') && !shiftKey_1) || ((_this.parent.shiftEnterKey === 'DIV' ||
                                        _this.parent.shiftEnterKey === 'P') && shiftKey_1)) {
                                        var isHeadingTag = _this.formatTags.indexOf(newElem.nodeName.toLocaleLowerCase());
                                        if ((isHeadingTag < 0) || (isHeadingTag >= 0 && newElem.textContent.trim().length === 0)) {
                                            var insertElm = _this.createInsertElement(shiftKey_1);
                                            while (newElem.firstChild) {
                                                insertElm.appendChild(newElem.firstChild);
                                            }
                                            _this.parent.formatter.editorManager.domNode.insertAfter(insertElm, newElem);
                                            detach(newElem);
                                            _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), _this.parent.formatter.editorManager.domNode.isBlockNode(_this.startNode) ?
                                                insertElm : _this.startNode, 0);
                                        }
                                    }
                                }
                            }
                            e.args.preventDefault();
                        }
                        if ((_this.parent.enterKey === 'BR' && !shiftKey_1) || (_this.parent.shiftEnterKey === 'BR' && shiftKey_1)) {
                            var currentParent = void 0;
                            if (!_this.parent.formatter.editorManager.domNode.isBlockNode(_this.startNode)) {
                                var currentNode = _this.startNode;
                                var previousNode = currentNode;
                                while (!_this.parent.formatter.editorManager.domNode.isBlockNode(currentNode)) {
                                    previousNode = currentNode;
                                    currentNode = currentNode.parentElement;
                                }
                                currentParent = currentNode === _this.parent.inputElement ?
                                    previousNode : currentNode;
                            }
                            else {
                                currentParent = _this.startNode;
                            }
                            var currentParentStyle = window.getComputedStyle(currentParent);
                            _this.removeBRElement(currentParent);
                            var isEmptyBrInserted = false;
                            var currentParentLastChild = currentParent.lastChild;
                            while (!isNOU(currentParentLastChild) && !(currentParentLastChild.nodeName === '#text' || currentParentLastChild.nodeName === 'BR'
                                || currentParentLastChild.nodeName === 'IMG')) {
                                currentParentLastChild = currentParentLastChild.lastChild;
                            }
                            var isLastNodeLength = _this.range.startContainer === currentParentLastChild ?
                                _this.range.startContainer.textContent.length : currentParent.textContent.length;
                            var isImageElement = (_this.range.startContainer.nodeName === 'IMG' || (_this.range.startContainer.childNodes.length > 0
                                && !isNOU(_this.range.startContainer.childNodes[_this.range.startOffset]) && _this.range.startContainer.childNodes[_this.range.startOffset].nodeName === 'IMG') || (_this.range.startContainer.nodeType === 1 &&
                                _this.range.startContainer.querySelector('img') !== null));
                            if (currentParent !== _this.parent.inputElement &&
                                _this.parent.formatter.editorManager.domNode.isBlockNode(currentParent) &&
                                _this.range.startOffset === _this.range.endOffset &&
                                (_this.range.startOffset === isLastNodeLength ||
                                    (currentParent.textContent.trim().length === 0 && isImageElement))) {
                                var focusBRElem = _this.parent.createElement('br');
                                if (_this.range.startOffset === 0 && _this.range.startContainer.nodeName === 'TABLE') {
                                    _this.range.startContainer.parentElement.insertBefore(focusBRElem, _this.range.startContainer);
                                }
                                else {
                                    if (currentParentLastChild.nodeName === 'BR' && currentParent.textContent.length === 0) {
                                        _this.parent.formatter.editorManager.domNode.insertAfter(focusBRElem, currentParentLastChild);
                                    }
                                    else if (_this.range.startOffset === 0 && _this.range.endOffset === 0 && isImageElement) {
                                        var imageElement = _this.range.startContainer.nodeName === 'IMG' ? _this.range.startContainer :
                                            _this.range.startContainer.childNodes[_this.range.startOffset];
                                        currentParent.insertBefore(focusBRElem, imageElement);
                                    }
                                    else {
                                        var lineBreakBRElem = _this.parent.createElement('br');
                                        var anchorElement = (!isNOU(_this.range.startContainer.parentElement) && _this.range.startContainer.parentElement.nodeName === 'A'
                                            && _this.range.startContainer.parentElement.textContent.length === _this.range.startOffset)
                                            ? _this.range.startContainer.parentElement : _this.range.startContainer;
                                        _this.parent.formatter.editorManager.domNode.insertAfter(focusBRElem, anchorElement);
                                        _this.parent.formatter.editorManager.domNode.insertAfter(lineBreakBRElem, anchorElement);
                                        var brSibling = anchorElement.nextElementSibling;
                                        var brNextSibling = !isNOU(brSibling) ? brSibling.nextElementSibling : null;
                                        if (!isNOU(brSibling) && !isNOU(brNextSibling) && !isNOU(brNextSibling.nextElementSibling) &&
                                            brSibling.nodeName === 'BR' && brNextSibling.nodeName === 'BR' && brNextSibling.nextElementSibling.nodeName === 'BR') {
                                            brNextSibling.nextElementSibling.remove();
                                        }
                                    }
                                }
                                _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), focusBRElem, 0);
                            }
                            else if (!isNOU(currentParent) && currentParent !== _this.parent.inputElement && currentParent.nodeName !== 'BR') {
                                if (currentParent.textContent.trim().length === 0 || (currentParent.textContent.trim().length === 1 &&
                                    currentParent.textContent.charCodeAt(0) === 8203)) {
                                    if ((currentParent.childElementCount > 0 && currentParent.lastElementChild.nodeName === 'IMG') || (currentParent.lastElementChild && currentParent.lastElementChild.nodeName === 'BR') || !isNOU(currentParent.firstElementChild) &&
                                        (currentParent.querySelector('.e-video-wrap') || currentParent.querySelector('.e-audio-wrap'))) {
                                        _this.insertBRElement();
                                    }
                                    else {
                                        var newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, currentParent, true).cloneNode(true);
                                        _this.parent.formatter.editorManager.domNode.insertAfter(newElem, currentParent);
                                        var outerBRElem = _this.parent.createElement('br');
                                        newElem.parentElement.insertBefore(outerBRElem, newElem);
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), newElem, 0);
                                    }
                                }
                                else {
                                    var newElem = void 0;
                                    var outerBRElem = _this.parent.createElement('br');
                                    if (_this.range.startOffset === 0 && _this.range.endOffset === 0 &&
                                        !isNOU(currentParent.previousSibling) && currentParent.previousSibling.nodeName === 'BR' && currentParent.nodeName !== 'P' && currentParent.nodeName !== 'DIV') {
                                        newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, currentParent, false).cloneNode(true);
                                        _this.parent.formatter.editorManager.domNode.insertAfter(outerBRElem, currentParent);
                                        _this.insertFocusContent();
                                        var currentFocusElem = outerBRElem.nextSibling;
                                        while (!isNOU(currentFocusElem) && currentFocusElem.nodeName !== '#text') {
                                            currentFocusElem = currentFocusElem.lastChild;
                                        }
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), currentFocusElem, 0);
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        isEmptyBrInserted = true;
                                    }
                                    else if (currentParent !== _this.parent.inputElement &&
                                        (currentParentStyle.display === 'inline' || currentParentStyle.display === 'inline-block')) {
                                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                        newElem = _this.parent.formatter.editorManager.nodeCutter.SplitNode(_this.range, currentParent, true).cloneNode(true);
                                        currentParent.parentElement.insertBefore(outerBRElem, currentParent);
                                        _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), currentParent, 0);
                                        _this.insertFocusContent();
                                    }
                                    else {
                                        _this.insertBRElement();
                                    }
                                }
                            }
                            else {
                                _this.insertBRElement();
                            }
                            e.args.preventDefault();
                        }
                        _this.triggerActionComplete(e, shiftKey_1);
                        _this.parent.inputElement.dispatchEvent(new Event('input'));
                    }
                });
            }
        }
    };
    EnterKeyAction.prototype.removeBRElement = function (currentElement) {
        if (Browser.userAgent.indexOf('Firefox') !== -1 &&
            this.range.endOffset === currentElement.textContent.length && (currentElement.textContent.length !== 0 ||
            currentElement.querySelectorAll('BR').length > 1) &&
            !isNOU(currentElement.lastChild) && currentElement.lastChild.nodeName === 'BR') {
            detach(currentElement.lastChild);
        }
    };
    EnterKeyAction.prototype.insertBRElement = function () {
        var isEmptyBrInserted = false;
        var isFocusTextNode = true;
        var isImageElement = false;
        if (this.range.endContainer.textContent.length === 0 && this.range.startContainer.nodeName === 'BR') {
            isFocusTextNode = false;
        }
        var brElm = this.parent.createElement('br');
        var findAnchorLastChild = this.startNode;
        while (findAnchorLastChild.lastChild) {
            findAnchorLastChild = findAnchorLastChild.lastChild;
        }
        var findAnchorElement = this.startNode.nodeName === 'A' && this.endNode.nodeName === 'A' &&
            !isNOU(this.range.startContainer.parentElement) && this.range.startOffset === this.range.endOffset &&
            this.range.startContainer.textContent.trim().length === findAnchorLastChild.textContent.trim().length;
        if (this.startNode.nodeName === 'BR' && this.endNode.nodeName === 'BR' && this.range.startOffset === 0 && this.range.startOffset === this.range.endOffset) {
            this.parent.formatter.editorManager.domNode.insertAfter(brElm, this.startNode);
            isEmptyBrInserted = true;
        }
        else {
            if (this.startNode === this.parent.inputElement && !isNOU(this.range.startContainer.previousSibling) &&
                this.range.startContainer.previousSibling.nodeName === 'BR' && this.range.startContainer.textContent.length === 0) {
                isEmptyBrInserted = true;
            }
            if (findAnchorElement) {
                this.parent.formatter.editorManager.domNode.insertAfter(brElm, this.startNode);
            }
            else if (this.startNode.tagName === 'SPAN' && (this.startNode.classList.contains('e-video-wrap') || this.startNode.classList.contains('e-audio-wrap'))) {
                this.startNode.parentElement.insertBefore(brElm, this.startNode);
                var nearBlockNode = this.parent.formatter.editorManager.domNode.blockParentNode(this.startNode);
                var newElem = this.parent.formatter.editorManager.nodeCutter.SplitNode(this.range, nearBlockNode, true);
                detach(newElem.previousSibling.childNodes[1]);
                isEmptyBrInserted = true;
            }
            else if (this.startNode.nodeType === Node.ELEMENT_NODE && this.startNode.childElementCount > 0 && this.startNode.lastElementChild.nodeName === 'IMG') {
                this.startNode.parentElement.insertBefore(brElm, this.startNode);
                isEmptyBrInserted = true;
                isImageElement = true;
            }
            else {
                this.range.insertNode(brElm);
                isEmptyBrInserted = true;
            }
        }
        if (isEmptyBrInserted || (!isNOU(brElm.nextElementSibling) && brElm.nextElementSibling.tagName === 'BR') || (!isNOU(brElm.nextSibling) && (brElm.nextSibling.textContent.length > 0 || (brElm.nextSibling.nodeName === '#text' && brElm.nextSibling.textContent.trim().length === 0 && !isNOU(brElm.nextSibling.nextSibling) && brElm.nextSibling.nextSibling.textContent.trim().length > 0)))) {
            this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), !isNOU(brElm.nextSibling) && isFocusTextNode && !isImageElement ? brElm.nextSibling : brElm, 0);
            isEmptyBrInserted = false;
        }
        else {
            var brElements = this.parent.createElement('br');
            if (findAnchorElement) {
                this.parent.formatter.editorManager.domNode.insertAfter(brElements, this.startNode);
            }
            else {
                this.range.insertNode(brElements);
            }
            this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), brElm, 0);
        }
    };
    EnterKeyAction.prototype.insertFocusContent = function () {
        if (this.range.startContainer.textContent.length === 0) {
            if (this.range.startContainer.nodeName === '#text') {
                this.range.startContainer.parentElement.innerHTML = '&#8203;';
            }
            else {
                this.range.startContainer.innerHTML = '&#8203;';
            }
        }
    };
    EnterKeyAction.prototype.createInsertElement = function (shiftKey) {
        var insertElem;
        if ((this.parent.enterKey === 'DIV' && !shiftKey) || (this.parent.shiftEnterKey === 'DIV' && shiftKey)) {
            insertElem = this.parent.createElement('div');
        }
        else if ((this.parent.enterKey === 'P' && !shiftKey) || (this.parent.shiftEnterKey === 'P' && shiftKey)) {
            insertElem = this.parent.createElement('p');
        }
        var previousBlockNode = this.parent.formatter.editorManager.domNode.blockNodes()[0].previousSibling;
        var nextBlockNode = this.parent.formatter.editorManager.domNode.blockNodes()[0].nextSibling;
        if (!isNOU(previousBlockNode) && previousBlockNode.nodeName !== '#text' && previousBlockNode.hasAttribute('style') && previousBlockNode.nodeName !== 'TABLE') {
            insertElem.style.cssText = previousBlockNode.getAttribute('style');
        }
        if (isNOU(previousBlockNode) && !isNOU(nextBlockNode) && nextBlockNode.nodeName !== '#text' && nextBlockNode.hasAttribute('style') && nextBlockNode.nodeName !== 'TABLE') {
            insertElem.style.cssText = nextBlockNode.getAttribute('style');
        }
        return insertElem;
    };
    EnterKeyAction.prototype.triggerActionComplete = function (e, shiftKey) {
        this.parent.trigger(events.actionComplete, { requestType: shiftKey ? 'ShiftEnterAction' : 'EnterAction', args: e.args });
    };
    EnterKeyAction.prototype.handleCursorAtTableSide = function (e, isStart, isEnd) {
        var _this = this;
        if (this.parent.enterKey !== 'BR') {
            var shiftKey_2 = e.args.shiftKey;
            var actionBeginArgs = {
                cancel: false,
                name: events.actionBegin,
                requestType: shiftKey_2 ? 'ShiftEnterAction' : 'EnterAction',
                originalEvent: e.args
            };
            this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                if (!actionBeginArgs.cancel) {
                    var newElement = _this.parent.createElement(_this.parent.enterKey);
                    newElement.innerHTML = '<br>';
                    var tableElement = void 0;
                    if (isStart) {
                        tableElement = _this.range.startContainer.childNodes[_this.range.startOffset];
                        tableElement.parentElement.insertBefore(newElement, tableElement);
                    }
                    if (isEnd) {
                        tableElement = _this.range.startContainer.childNodes[_this.range.startOffset - 1];
                        if (!isNOU(tableElement.nextSibling)) {
                            tableElement.parentElement.insertBefore(newElement, tableElement.nextSibling);
                        }
                        else if (isNOU(tableElement.nextSibling)) {
                            tableElement.parentElement.appendChild(newElement);
                        }
                    }
                    _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), newElement, 0);
                    e.args.preventDefault();
                    _this.triggerActionComplete(e, shiftKey_2);
                }
            });
        }
    };
    EnterKeyAction.prototype.handleEnterKeyAtImageSide = function (e, isStart, isEnd) {
        var _this = this;
        var actionBeginArgs = {
            cancel: false,
            name: events.actionBegin,
            requestType: e.args.shiftKey ? 'ShiftEnterAction' : 'EnterAction',
            originalEvent: e.args
        };
        var directRange = false;
        if (this.range.startContainer.nodeName === 'IMG' && this.range.startOffset === 0) {
            directRange = true;
        }
        this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
            if (!actionBeginArgs.cancel) {
                if (_this.parent.enterKey === 'BR') {
                    var newElement = _this.parent.createElement('BR');
                    var imageElement = void 0;
                    if (directRange) {
                        imageElement = _this.range.startContainer;
                        imageElement.parentElement.insertBefore(newElement, imageElement);
                        _this.parent.formatter.editorManager.nodeSelection.
                            setCursorPoint(_this.parent.contentModule.getDocument(), imageElement, 0);
                    }
                    if (isStart) {
                        imageElement = _this.range.startContainer.childNodes[_this.range.startOffset];
                        imageElement.parentElement.insertBefore(newElement, imageElement);
                        _this.parent.formatter.editorManager.nodeSelection.
                            setCursorPoint(_this.parent.contentModule.getDocument(), imageElement, 0);
                    }
                    if (isEnd) {
                        imageElement = _this.range.startContainer.childNodes[_this.range.startOffset - 1];
                        if (!isNOU(imageElement.nextSibling)) {
                            imageElement.parentElement.insertBefore(newElement, imageElement.nextSibling);
                            _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), newElement.nextSibling, 0);
                        }
                        else if (isNOU(imageElement.nextSibling)) {
                            imageElement.parentElement.appendChild(newElement);
                            var brElement = _this.parent.createElement('BR');
                            imageElement.parentElement.appendChild(brElement);
                            _this.parent.formatter.editorManager.nodeSelection.setCursorPoint(_this.parent.contentModule.getDocument(), brElement, 0);
                        }
                    }
                    e.args.preventDefault();
                    _this.triggerActionComplete(e, e.args.shiftKey);
                }
            }
        });
    };
    EnterKeyAction.prototype.isTableOrImageStart = function () {
        var customHandlerElements = ['IMG', 'TABLE'];
        var startContainer = this.range.startContainer;
        var startOffset = this.range.startOffset;
        var isCursorAtStart = this.range.collapsed && (startContainer.nodeType === 1) &&
            startContainer.isContentEditable && startContainer.childNodes[startOffset] &&
            (customHandlerElements.indexOf(startContainer.childNodes[startOffset].nodeName) > -1);
        if (isCursorAtStart) {
            return { start: isCursorAtStart, startNodeName: startContainer.childNodes[startOffset].nodeName };
        }
        else {
            return { start: false, startNodeName: '' };
        }
    };
    EnterKeyAction.prototype.isTableOrImageEnd = function () {
        var customHandlerElements = ['IMG', 'TABLE'];
        var startContainer = this.range.startContainer;
        var startOffset = this.range.startOffset;
        var isCursorAtEnd = this.range.collapsed && (startContainer.nodeType === 1) &&
            startContainer.isContentEditable && startContainer.childNodes[startOffset - 1] &&
            (customHandlerElements.indexOf(startContainer.childNodes[startOffset - 1].nodeName) > -1);
        if (isCursorAtEnd) {
            return { end: isCursorAtEnd, endNodeName: startContainer.childNodes[startOffset - 1].nodeName };
        }
        else {
            return { end: false, endNodeName: '' };
        }
    };
    EnterKeyAction.prototype.processedTableImageCursor = function () {
        var _a = this.isTableOrImageStart(), start = _a.start, startNodeName = _a.startNodeName;
        var _b = this.isTableOrImageEnd(), end = _b.end, endNodeName = _b.endNodeName;
        return { start: start, startName: startNodeName, end: end, endName: endNodeName };
    };
    return EnterKeyAction;
}());
export { EnterKeyAction };
