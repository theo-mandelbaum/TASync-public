import { addClass, attributes, Browser, closest, detach, isNullOrUndefined as isNOU, isNullOrUndefined, removeClass } from '@syncfusion/ej2-base';
import { isIDevice, removeClassWithAttr, scrollToCursor } from '../../common/util';
import { InsertHtml } from '../../editor-manager/plugin/inserthtml';
import { NodeSelection } from '../../selection/selection';
import * as classes from '../base/classes';
import * as CONSTANT from '../base/constant';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { getDefaultValue, getTextNodesUnder, sanitizeHelper } from '../base/util';
import { HTMLFormatter } from '../formatter/html-formatter';
import { ContentRender } from '../renderer/content-renderer';
import { IframeContentRender } from '../renderer/iframe-content-renderer';
import { ON_BEGIN } from './../../common/constant';
import { HtmlToolbarStatus } from './html-toolbar-status';
import { XhtmlValidation } from './xhtml-validation';
/**
 * `HtmlEditor` module is used to HTML editor
 */
var HtmlEditor = /** @class */ (function () {
    function HtmlEditor(parent, serviceLocator) {
        this.rangeCollection = [];
        this.isImageDelete = false;
        this.isMention = false;
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.xhtmlValidation = new XhtmlValidation(parent);
        this.addEventListener();
        this.isDestroyed = false;
        this.isCopyAll = false;
        this.isSlashMenuOpen = false;
        this.isPreviousNodeBrAfterBackSpace = false;
    }
    /**
     * Destroys the Markdown.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    HtmlEditor.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.clickTimeout) {
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;
        }
        this.removeEventListener();
        this.locator = null;
        this.contentRenderer = null;
        this.renderFactory = null;
        this.toolbarUpdate = null;
        this.nodeSelectionObj = null;
        this.isCopyAll = null;
        this.isSlashMenuOpen = null;
        if (this.rangeCollection.length > 0) {
            this.rangeCollection = [];
        }
        if (this.rangeElement) {
            this.rangeElement = null;
        }
        if (this.oldRangeElement) {
            this.oldRangeElement = null;
        }
        if (this.deleteRangeElement) {
            this.deleteRangeElement = null;
        }
        if (this.deleteOldRangeElement) {
            this.deleteOldRangeElement = null;
        }
        if (this.saveSelection) {
            this.saveSelection = null;
        }
        if (this.xhtmlValidation) {
            this.xhtmlValidation = null;
        }
        this.isDestroyed = true;
    };
    /**
     * @param {string} value - specifies the string value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    HtmlEditor.prototype.sanitizeHelper = function (value) {
        value = sanitizeHelper(value, this.parent);
        return value;
    };
    HtmlEditor.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.nodeSelectionObj = new NodeSelection(this.parent.inputElement);
        this.parent.on(events.initialLoad, this.instantiateRenderer, this);
        this.parent.on(events.htmlToolbarClick, this.onToolbarClick, this);
        this.parent.on(events.slashMenuOpening, this.onSlashMenuOpen, this);
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.keyUp, this.onKeyUp, this);
        this.parent.on(events.initialEnd, this.render, this);
        this.parent.on(events.modelChanged, this.onPropertyChanged, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.selectAll, this.selectAll, this);
        this.parent.on(events.selectRange, this.selectRange, this);
        this.parent.on(events.getSelectedHtml, this.getSelectedHtml, this);
        this.parent.on(events.selectionSave, this.onSelectionSave, this);
        this.parent.on(events.selectionRestore, this.onSelectionRestore, this);
        this.parent.on(events.readOnlyMode, this.updateReadOnly, this);
        this.parent.on(events.paste, this.onPaste, this);
        this.parent.on(events.tableclass, this.isTableClassAdded, this);
        this.parent.on(events.onHandleFontsizeChange, this.onHandleFontsizeChange, this);
    };
    HtmlEditor.prototype.onSlashMenuOpen = function () {
        this.isSlashMenuOpen = true;
    };
    HtmlEditor.prototype.updateReadOnly = function () {
        if (this.parent.readonly) {
            attributes(this.parent.contentModule.getEditPanel(), { contenteditable: 'false' });
            addClass([this.parent.element], classes.CLS_RTE_READONLY);
        }
        else {
            attributes(this.parent.contentModule.getEditPanel(), { contenteditable: 'true' });
            removeClass([this.parent.element], classes.CLS_RTE_READONLY);
        }
    };
    HtmlEditor.prototype.onSelectionSave = function () {
        var currentDocument = this.contentRenderer.getDocument();
        var range = this.nodeSelectionObj.getRange(currentDocument);
        this.saveSelection = this.nodeSelectionObj.save(range, currentDocument);
    };
    HtmlEditor.prototype.onSelectionRestore = function (e) {
        this.parent.isBlur = false;
        this.contentRenderer.getEditPanel().focus({ preventScroll: true });
        if ((isNullOrUndefined(e.items) || e.items) && (!isNullOrUndefined(this.saveSelection))) {
            this.saveSelection.restore();
        }
    };
    HtmlEditor.prototype.isTableClassAdded = function () {
        var tableElement = this.parent.inputElement.querySelectorAll('table');
        for (var i = 0; i < tableElement.length; i++) {
            // e-rte-table class is added to the table element for styling.
            // e-rte-paste-table class is added for pasted table element from MS Word and other sources such as Web will not have any styles.
            // e-rte-custom-table class is added for custom table element will not have any styles.
            if (!tableElement[i].classList.contains('e-rte-table') && !tableElement[i].classList.contains('e-rte-paste-table')
                && !tableElement[i].classList.contains('e-rte-custom-table')) {
                tableElement[i].classList.add('e-rte-table');
            }
        }
    };
    HtmlEditor.prototype.onHandleFontsizeChange = function (e) {
        var keyboardArgs = e.args;
        var args = { name: 'dropDownSelect' };
        args.item = {
            command: 'Font',
            subCommand: 'FontSize'
        };
        var items = this.parent.fontSize.items;
        var activeElem;
        if (this.parent.toolbarModule && this.parent.toolbarModule.dropDownModule &&
            this.parent.toolbarModule.dropDownModule.fontSizeDropDown && !isNOU(this.parent.toolbarModule.dropDownModule.fontSizeDropDown.activeElem[0].textContent) && this.parent.toolbarModule.dropDownModule.fontSizeDropDown.activeElem[0].textContent !== '') {
            activeElem = this.parent.toolbarModule.dropDownModule.fontSizeDropDown.activeElem[0].textContent;
        }
        else {
            var fontSizeValue = void 0;
            var selection = this.parent.contentModule.getDocument().getSelection();
            if (selection && selection.focusNode && selection.focusNode.parentElement) {
                fontSizeValue = document.defaultView.getComputedStyle(selection.focusNode.parentElement, null).getPropertyValue('font-size');
            }
            else {
                fontSizeValue = this.parent.fontSize.width;
            }
            fontSizeValue = isNOU(fontSizeValue) ? this.parent.fontSize.width : fontSizeValue;
            var actualTxtFontValues = fontSizeValue.match(/^([\d.]+)(\D+)$/);
            var size_1 = parseInt(actualTxtFontValues[1], 10);
            var unit = actualTxtFontValues[2];
            var defaultFontValues = items[1].value.match(/^([\d.]+)(\D+)$/);
            if (defaultFontValues[2] === unit) {
                var index = items.findIndex(function (_a) {
                    var value = _a.value;
                    return parseInt(value, 10) >= size_1;
                });
                activeElem = items[index].text;
            }
            else {
                var convertedSize_1 = this.convertFontSize(size_1, unit, defaultFontValues[2]);
                var index = items.findIndex(function (_a) {
                    var value = _a.value;
                    return parseInt(value, 10) >= convertedSize_1;
                });
                activeElem = items[index].text;
            }
        }
        var fontIndex = items.findIndex(function (size) { return size.text === (activeElem === 'Font Size' ? 'Default' : activeElem); });
        if (keyboardArgs.action === 'increase-fontsize' && fontIndex !== -1) {
            if (fontIndex >= items.length - 1) {
                var fontValues = items[fontIndex].value.match(/^([\d.]+)(\D+)$/);
                if (fontValues) {
                    var size = parseInt(fontValues[1], 10);
                    var unit = fontValues[2];
                    var roundedSize = size % 10 === 0 ? Math.ceil((size + 1) / 10) * 10 : Math.ceil(size / 10) * 10;
                    args.item.value = roundedSize.toLocaleString() + unit;
                    args.item.text = roundedSize.toLocaleString() + ' ' + unit;
                }
                this.parent.fontSize.items.push(args.item);
            }
            else {
                args.item.value = items[fontIndex + 1].value;
                args.item.text = items[fontIndex + 1].text;
            }
        }
        else if (keyboardArgs.action === 'decrease-fontsize' && fontIndex !== -1 && fontIndex > 0) {
            args.item.value = items[fontIndex - 1].value;
            args.item.text = items[fontIndex - 1].text;
        }
        else {
            if (fontIndex >= 0 && fontIndex < items.length && items[fontIndex]) {
                args.item.value = items[fontIndex].value;
                args.item.text = items[fontIndex].text;
            }
        }
        this.parent.formatter.process(this.parent, args, keyboardArgs);
    };
    HtmlEditor.prototype.convertFontSize = function (value, originalUnit, targetUnit) {
        if (CONSTANT.supportedUnits.indexOf(originalUnit) !== -1 || CONSTANT.supportedUnits.indexOf(targetUnit) !== -1) {
            originalUnit = 'px';
        }
        var convertedValue = value * CONSTANT.conversionFactors[originalUnit][targetUnit];
        return convertedValue;
    };
    HtmlEditor.prototype.onKeyUp = function (e) {
        var args = e.args;
        var restrictKeys = [8, 9, 13, 17, 18, 20, 27, 37, 38, 39, 40, 44, 45, 46, 91,
            112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123];
        var range = this.parent.getRange();
        var regEx = new RegExp('\u200B', 'g');
        var isEmptyNode = range.startContainer === range.endContainer && range.startOffset === range.endOffset &&
            range.startOffset === 1 && range.startContainer.textContent.length === 1 &&
            range.startContainer.textContent.charCodeAt(0) === 8203 &&
            range.startContainer.textContent.replace(regEx, '').length === 0;
        var isMention = false;
        if (range.startContainer === range.endContainer &&
            range.startOffset === range.endOffset && (range.startContainer !== this.parent.inputElement && range.startOffset !== 0)) {
            var mentionStartNode = range.startContainer.nodeType === 3 ?
                range.startContainer : range.startContainer.childNodes[range.startOffset - 1];
            isMention = args.keyCode === 16 &&
                mentionStartNode.textContent.charCodeAt(0) === 8203 &&
                !isNOU(mentionStartNode.previousSibling) && mentionStartNode.previousSibling.contentEditable === 'false';
        }
        if (this.isCopyAll) {
            return;
        }
        var pointer;
        var isRootParent = false;
        if (!this.isSlashMenuOpen &&
            restrictKeys.indexOf(args.keyCode) < 0 && !args.shiftKey && !args.ctrlKey && !args.altKey &&
            !isEmptyNode && !isMention) {
            pointer = range.startOffset;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            range.startContainer.nodeName === '#text' ? range.startContainer.parentElement !== this.parent.inputElement ? range.startContainer.parentElement.classList.add('currentStartMark')
                : isRootParent = true : range.startContainer.classList.add('currentStartMark');
            if (range.startContainer.textContent.charCodeAt(0) === 8203) {
                var previousLength_1 = range.startContainer.textContent.length;
                var previousRange = range.startOffset;
                this.removeZeroWidthSpaces(range.startContainer, regEx);
                pointer = previousRange === 0 ? previousRange : previousRange - (previousLength_1 - range.startContainer.textContent.length);
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), range.startContainer, pointer);
            }
            var previousLength = this.parent.inputElement.innerHTML.length;
            var currentLength = this.parent.inputElement.innerHTML.replace(regEx, '').length;
            var focusNode = range.startContainer;
            if (previousLength > currentLength && !isRootParent) {
                if (focusNode.textContent.trim().length !== 0 && focusNode.previousSibling) {
                    var tempSpan = document.createElement('span');
                    tempSpan.className = 'tempSpan';
                    range.insertNode(tempSpan);
                }
                var currentChild = this.parent.inputElement.firstChild;
                while (!isNOU(currentChild)) {
                    if (currentChild.nodeName === '#text') {
                        currentChild = currentChild.nextElementSibling;
                        continue;
                    }
                    if (currentChild.textContent.replace(regEx, '').trim().length > 0 && currentChild.textContent.includes('\u200B')) {
                        this.removeZeroWidthSpaces(currentChild, regEx);
                    }
                    currentChild = currentChild.nextElementSibling;
                }
                var tempSpanToRemove = this.parent.inputElement.querySelector('.tempSpan');
                if (tempSpanToRemove && tempSpanToRemove.previousSibling && focusNode.textContent.trim().length !== 0) {
                    focusNode = tempSpanToRemove.previousSibling;
                    pointer = tempSpanToRemove.previousSibling.textContent.length;
                    var parentElement = tempSpanToRemove.parentNode;
                    parentElement.removeChild(tempSpanToRemove);
                    tempSpanToRemove = null;
                }
                var currentElement = this.parent.inputElement.querySelector('.currentStartMark');
                var currentChildNode = currentElement ? currentElement.childNodes : [];
                if (currentChildNode.length > 1) {
                    for (var i = 0; i < currentChildNode.length; i++) {
                        if (currentChildNode[i].nodeName === '#text' && currentChildNode[i].textContent.length === 0) {
                            detach(currentChildNode[i]);
                            i--;
                        }
                        if (!isNOU(currentChildNode[i]) && focusNode.textContent.replace(regEx, '') === currentChildNode[i].textContent) {
                            var iscursorLeft = pointer <= focusNode.textContent.indexOf('\u200B');
                            pointer = focusNode.textContent.length > 1 ?
                                ((focusNode.textContent === currentChildNode[i].textContent || iscursorLeft) ? pointer :
                                    pointer - (focusNode.textContent.length - focusNode.textContent.replace(regEx, '').length)) :
                                focusNode.textContent.length;
                            focusNode = currentChildNode[i];
                        }
                    }
                }
                else if (currentChildNode.length === 1) {
                    if (focusNode.textContent.replace(regEx, '') === currentChildNode[0].textContent) {
                        focusNode = currentChildNode[0];
                    }
                }
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), focusNode, pointer);
            }
            var currentElem = this.parent.inputElement.querySelector('.currentStartMark');
            if (!isNOU(currentElem)) {
                currentElem.classList.remove('currentStartMark');
                if (currentElem.getAttribute('class').trim() === '') {
                    currentElem.removeAttribute('class');
                }
            }
            if (!isNOU(range.startContainer.previousSibling) && !isNOU(range.startContainer.previousSibling.parentElement) &&
                range.startContainer.parentElement === range.startContainer.previousSibling.parentElement &&
                range.startContainer.previousSibling.textContent.charCodeAt(0) === 8203 &&
                range.startContainer.previousSibling.textContent.length <= 1) {
                range.startContainer.previousSibling.textContent = range.startContainer.previousSibling.textContent.replace(regEx, '');
            }
            if (range.endContainer.textContent.charCodeAt(range.endOffset) === 8203) {
                pointer = range.startOffset;
                range.endContainer.textContent = range.endContainer.textContent.replace(regEx, '');
                this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), range.startContainer, pointer);
            }
        }
        this.isSlashMenuOpen = false;
    };
    HtmlEditor.prototype.removeZeroWidthSpaces = function (node, regex) {
        var _this = this;
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.textContent !== null) {
                node.textContent = node.textContent.replace(regex, '');
            }
            return;
        }
        node.childNodes.forEach(function (child) {
            _this.removeZeroWidthSpaces(child, regex);
        });
    };
    HtmlEditor.prototype.onKeyDown = function (e) {
        var _this = this;
        if (e.args.ctrlKey && e.args.keyCode === 65) {
            this.isCopyAll = true;
        }
        else {
            this.isCopyAll = false;
        }
        var currentRange;
        var args = e.args;
        if (this.parent.inputElement.querySelectorAll('.e-cell-select:not(table)').length > 1 && (args.keyCode === 8 || args.keyCode === 32 || args.keyCode === 13)) {
            this.tableSelectionKeyAction(e);
            this.parent.autoResize();
            return;
        }
        if (Browser.info.name === 'chrome') {
            currentRange = this.parent.getRange();
            this.backSpaceCleanup(e, currentRange);
            this.deleteCleanup(e, currentRange);
        }
        if (args.keyCode === 9 && this.parent.enableTabKey) {
            this.parent.formatter.saveData(e);
            if (!isNOU(args.target) && isNullOrUndefined(closest(args.target, '.e-rte-toolbar'))) {
                var range = this.nodeSelectionObj.getRange(this.contentRenderer.getDocument());
                var parentNode = this.nodeSelectionObj.getParentNodeCollection(range);
                if (!((parentNode[0].nodeName === 'LI' || closest(parentNode[0], 'li') ||
                    closest(parentNode[0], 'table')))) {
                    args.preventDefault();
                    var selection = this.contentRenderer.getDocument().getSelection().getRangeAt(0);
                    var alignmentNodes = this.parent.formatter.editorManager.domNode.blockNodes();
                    if (this.parent.enterKey === 'BR') {
                        if (selection.startOffset !== selection.endOffset && selection.startOffset === 0) {
                            var save = this.nodeSelectionObj.save(range, this.contentRenderer.getDocument());
                            this.parent.formatter.editorManager.domNode.setMarker(save);
                            alignmentNodes = this.parent.formatter.editorManager.domNode.blockNodes();
                            this.parent.formatter.editorManager.domNode.convertToBlockNodes(alignmentNodes, false);
                            this.marginTabAdd(args.shiftKey, alignmentNodes);
                            save = this.parent.formatter.editorManager.domNode.saveMarker(save);
                            save.restore();
                        }
                        else {
                            InsertHtml.Insert(this.contentRenderer.getDocument(), '&nbsp;&nbsp;&nbsp;&nbsp;');
                            this.rangeCollection.push(this.nodeSelectionObj.getRange(this.contentRenderer.getDocument()));
                        }
                    }
                    else {
                        if (selection.startOffset !== selection.endOffset && selection.startOffset === 0) {
                            this.marginTabAdd(args.shiftKey, alignmentNodes);
                        }
                        else {
                            InsertHtml.Insert(this.contentRenderer.getDocument(), '&nbsp;&nbsp;&nbsp;&nbsp;');
                            this.rangeCollection.push(this.nodeSelectionObj.getRange(this.contentRenderer.getDocument()));
                        }
                    }
                }
            }
            this.parent.formatter.saveData(e);
        }
        // Prevents the link from being added when a space, enter, or parenthesis key is pressed.
        // This ensures that parentheses are not mistakenly included as part of the URL.
        var regex = /[^\w\s\\/\\.\\:]/g;
        if (e.args.action === 'space' || e.args.action === 'enter' || e.args.keyCode === 13 || regex.test(e.args.key)) {
            this.spaceLink(e.args);
            if (this.parent.editorMode === 'HTML' && !this.parent.readonly) {
                var currentLength = this.parent.getText().trim().replace(/(\r\n|\n|\r|\t)/gm, '').replace(/\u200B/g, '').length;
                var selectionLength = this.parent.getSelection().length;
                var totalLength = (currentLength - selectionLength) + 1;
                if (!(this.parent.maxLength === -1 || totalLength <= this.parent.maxLength) &&
                    e.args.keyCode === 13) {
                    e.args.preventDefault();
                    return;
                }
                else {
                    this.parent.notify(events.enterHandler, { args: e.args });
                    scrollToCursor(this.parent.contentModule.getDocument(), this.parent.inputElement);
                }
            }
        }
        if (e.args.action === 'space') {
            var currentRange_1 = this.parent.getRange();
            var editorValue = currentRange_1.startContainer.textContent.slice(0, currentRange_1.startOffset);
            var orderedList_1 = this.isOrderedList(editorValue);
            var unOrderedList = this.isUnOrderedList(editorValue);
            var hasSplitedText = false;
            if (orderedList_1 || unOrderedList) {
                hasSplitedText = this.hasMultipleTextNode(currentRange_1);
                if (hasSplitedText && !this.isMention) {
                    var element = currentRange_1.startContainer;
                    element = this.parent.formatter.editorManager.domNode.getImmediateBlockNode(element);
                    if (element.childNodes.length > 0 && !element.innerHTML.includes('<br>')) {
                        hasSplitedText = false;
                    }
                }
            }
            if (!hasSplitedText && (orderedList_1 && !unOrderedList || unOrderedList && !orderedList_1)) {
                var eventArgs_1 = {
                    callBack: null,
                    event: e.args,
                    name: 'keydown-handler',
                    enterKey: this.parent.enterKey,
                    shiftEnterKey: this.parent.shiftEnterKey
                };
                var actionBeginArgs = {
                    cancel: false,
                    item: { command: 'Lists', subCommand: orderedList_1 ? 'OL' : 'UL' },
                    name: 'actionBegin',
                    originalEvent: e.args,
                    requestType: orderedList_1 ? 'OL' : 'UL'
                };
                this.parent.trigger(events.actionBegin, actionBeginArgs, function (actionBeginArgs) {
                    if (!actionBeginArgs.cancel) {
                        _this.parent.formatter.editorManager.observer.notify(ON_BEGIN, eventArgs_1);
                        _this.parent.trigger(events.actionComplete, {
                            editorMode: _this.parent.editorMode,
                            elements: _this.parent.formatter.editorManager.domNode.blockNodes(),
                            event: e.args,
                            name: events.actionComplete,
                            range: _this.parent.getRange(),
                            requestType: orderedList_1 ? 'OL' : 'UL'
                        });
                    }
                });
            }
        }
        if (Browser.info.name === 'chrome' && (!isNullOrUndefined(this.rangeElement) && !isNullOrUndefined(this.oldRangeElement) ||
            !isNullOrUndefined(this.deleteRangeElement) && !isNullOrUndefined(this.deleteOldRangeElement)) &&
            currentRange.startContainer.parentElement.tagName !== 'TD' && currentRange.startContainer.parentElement.tagName !== 'TH') {
            this.rangeElement = null;
            this.oldRangeElement = null;
            this.deleteRangeElement = null;
            this.deleteOldRangeElement = null;
            if (!this.isImageDelete) {
                args.preventDefault();
            }
            args.preventDefault();
        }
        this.parent.autoResize();
    };
    HtmlEditor.prototype.isOrderedList = function (editorValue) {
        editorValue = editorValue.replace(/\u200B/g, '');
        var olListStartRegex = [/^[1]+[.]+$/, /^[i]+[.]+$/, /^[a]+[.]+$/];
        if (!isNullOrUndefined(editorValue)) {
            for (var i = 0; i < olListStartRegex.length; i++) {
                if (olListStartRegex[i].test(editorValue)) {
                    return true;
                }
            }
        }
        return false;
    };
    HtmlEditor.prototype.isUnOrderedList = function (editorValue) {
        editorValue = editorValue.replace(/\u200B/g, '');
        var ulListStartRegex = [/^[*]$/, /^[-]$/];
        if (!isNullOrUndefined(editorValue)) {
            for (var i = 0; i < ulListStartRegex.length; i++) {
                if (ulListStartRegex[i].test(editorValue)) {
                    return true;
                }
            }
        }
        return false;
    };
    HtmlEditor.prototype.hasMultipleTextNode = function (range) {
        this.isMention = false;
        if (range && range.startContainer && range.startContainer.parentNode) {
            var parentNode = range.startContainer.parentNode;
            if (range.startContainer.previousElementSibling &&
                range.startContainer.previousElementSibling.classList.contains('e-mention-chip')
                && !range.startContainer.previousElementSibling.isContentEditable) {
                this.isMention = true;
                return true;
            }
            if (this.parent.enterKey === 'BR' || closest(parentNode, 'table')) {
                return false;
            }
            var childNodes = parentNode.childNodes;
            var textNodes = [];
            for (var i = 0; i < childNodes.length; i++) {
                var node = childNodes[i];
                if (node && node.nodeType === Node.TEXT_NODE) {
                    textNodes.push(node);
                    if (textNodes.length > 1) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    //Determines if the cursor is truly at the start of a block element
    HtmlEditor.prototype.isCursorAtBlockStart = function (range) {
        if (range.startOffset !== 0 || range.endOffset !== 0) {
            return false;
        }
        // Get the node where cursor is positioned
        var cursorNode = range.startContainer;
        // If cursor is in a text node, check its parent
        var elementAtCursor = cursorNode.nodeType === Node.TEXT_NODE ?
            cursorNode.parentElement : cursorNode;
        // First, check if we're in a table cell - we don't want to handle these
        if (elementAtCursor.tagName === 'TD' || elementAtCursor.tagName === 'TH') {
            return false;
        }
        // Find the block-level ancestor
        var blockNode = this.parent.formatter.editorManager.domNode.getImmediateBlockNode(elementAtCursor);
        // If cursor is directly in a block element at position 0, it's at the start
        if (cursorNode === blockNode && range.startOffset === 0) {
            return true;
        }
        // Otherwise, we need to check if the cursor is positioned at the absolute beginning of content
        var currentNode = elementAtCursor;
        var previousContentFound = false;
        // Walk up the DOM tree until we reach the block parent
        while (currentNode && currentNode !== blockNode) {
            // Check if there's any previous sibling with content
            var sibling = currentNode.previousSibling;
            while (sibling) {
                // Skip empty text nodes
                if (sibling.nodeType === Node.TEXT_NODE && (!sibling.textContent || !sibling.textContent.trim())) {
                    sibling = sibling.previousSibling;
                    continue;
                }
                // If we found any non-empty previous sibling, cursor is not at block start
                previousContentFound = true;
                break;
            }
            if (previousContentFound) {
                break;
            }
            // Move up to parent and check again
            currentNode = currentNode.parentNode;
        }
        // If we reached the block parent without finding previous content, cursor is at start
        return !previousContentFound;
    };
    HtmlEditor.prototype.backSpaceCleanup = function (e, currentRange) {
        var isLiElement = false;
        var isPreviousNotContentEditable = true;
        if (!isNOU(currentRange.startContainer.previousSibling) &&
            currentRange.startContainer.previousSibling.nodeName === 'SPAN') {
            isPreviousNotContentEditable = currentRange.startContainer.previousSibling.contentEditable === 'false' ? false : true;
        }
        var checkNode = currentRange.startContainer.nodeName === '#text' ? currentRange.startContainer.parentElement : currentRange.startContainer;
        var isSelectedPositionNotStart = closest(currentRange.startContainer.nodeName === '#text' ? currentRange.startContainer.parentElement : currentRange.startContainer, 'li') ?
            checkNode.nodeName !== 'li' && isNOU(checkNode.previousSibling) : true;
        // Method to determine if cursor is truly at start
        var isCursorAtStart = this.isCursorAtBlockStart(currentRange);
        if (e.args.code === 'Backspace' &&
            e.args.keyCode === 8 &&
            isCursorAtStart && currentRange.startContainer.textContent !== ' ' &&
            this.parent.getSelection().length === 0 && currentRange.startContainer.textContent.length > 0 &&
            isPreviousNotContentEditable && isSelectedPositionNotStart) {
            if ((!this.parent.formatter.editorManager.domNode.isBlockNode(checkNode) &&
                !isNOU(checkNode.previousSibling) && checkNode.previousSibling.nodeName === 'BR') ||
                (!isNOU(currentRange.startContainer.previousSibling) && currentRange.startContainer.previousSibling.nodeName === 'BR')) {
                return;
            }
            this.rangeElement = this.getRootBlockNode(currentRange.startContainer);
            if (this.rangeElement.tagName === 'OL' || this.rangeElement.tagName === 'UL') {
                var liElement = this.getRangeLiNode(currentRange.startContainer);
                if (liElement.previousElementSibling && liElement.previousElementSibling.childElementCount > 0) {
                    this.oldRangeElement = liElement.previousElementSibling.lastElementChild.nodeName === 'BR' ?
                        liElement.previousElementSibling : liElement.previousElementSibling.lastChild;
                    if (!isNOU(liElement.lastElementChild) && liElement.lastElementChild.nodeName !== 'BR' &&
                        isNOU(liElement.lastElementChild.previousSibling) && liElement.lastChild.nodeName !== '#text') {
                        this.rangeElement = liElement.lastElementChild;
                        isLiElement = true;
                    }
                    else {
                        this.rangeElement = liElement;
                    }
                }
            }
            else if (this.rangeElement === this.parent.inputElement || this.rangeElement.tagName === 'TABLE' ||
                (!isNOU(this.rangeElement.previousElementSibling) && this.rangeElement.previousElementSibling.tagName === 'TABLE')) {
                return;
            }
            else {
                this.oldRangeElement = this.rangeElement.previousElementSibling;
            }
            var findBlockElement = this.parent.formatter.editorManager.domNode.blockNodes();
            if (!isNOU(findBlockElement[0]) && currentRange.collapsed && currentRange.startOffset === 0 && currentRange.endOffset === 0 && findBlockElement[0].style.marginLeft !== '') {
                findBlockElement[0].style.marginLeft = (parseInt(findBlockElement[0].style.marginLeft, 10) <= 20) ? '' : (parseInt(findBlockElement[0].style.marginLeft, 10) - 20 + 'px');
            }
            if (isNOU(this.oldRangeElement) && isNOU(findBlockElement[0].previousSibling)) {
                return;
            }
            else if (findBlockElement[0].previousSibling) {
                var prevSibling = findBlockElement[0].previousSibling;
                var currentElement = findBlockElement[0];
                if (prevSibling.textContent.trim()) {
                    this.removeLastBr(prevSibling);
                    var lastPosition = this.parent.formatter.editorManager.nodeSelection.findLastTextPosition(prevSibling);
                    var cursorpointer = lastPosition.offset;
                    var lastChild = lastPosition.node;
                    var childNodes = Array.from(currentElement.childNodes);
                    var save = this.nodeSelectionObj.save(currentRange, this.contentRenderer.getDocument());
                    if (this.isPreviousNodeBrAfterBackSpace) {
                        this.parent.formatter.editorManager.domNode.setMarker(save);
                    }
                    var previousBlockElements = this.parent.formatter.editorManager.domNode.getImmediateBlockNode(lastChild);
                    for (var i = 0; i < childNodes.length; i++) {
                        previousBlockElements.appendChild(childNodes[i].cloneNode(true));
                    }
                    if (this.isPreviousNodeBrAfterBackSpace) {
                        save = this.parent.formatter.editorManager.domNode.saveMarker(save);
                        save.restore();
                    }
                    else {
                        this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), lastChild, cursorpointer);
                    }
                    currentElement.parentNode.removeChild(currentElement);
                    e.args.preventDefault();
                }
                else {
                    prevSibling.parentNode.removeChild(prevSibling);
                }
            }
            else {
                if (this.oldRangeElement.tagName === 'OL' || this.oldRangeElement.tagName === 'UL') {
                    this.oldRangeElement = this.oldRangeElement.lastElementChild.lastElementChild
                        ? this.oldRangeElement.lastElementChild.lastElementChild :
                        this.oldRangeElement.lastElementChild;
                }
                var lastNode = this.oldRangeElement.lastChild ? this.oldRangeElement.lastChild : this.oldRangeElement;
                while (lastNode.nodeType !== 3 && lastNode.nodeName !== '#text' &&
                    lastNode.nodeName !== 'BR' && !isNOU(lastNode.lastChild)) {
                    lastNode = lastNode.lastChild;
                }
                if (lastNode.nodeName === 'IMG') {
                    this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), lastNode.parentElement, lastNode.parentElement.childNodes.length);
                }
                else {
                    this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), 
                    // eslint-disable-next-line
                    lastNode, lastNode.textContent.length);
                }
                var checkParent = false;
                if (this.oldRangeElement && this.oldRangeElement.nodeName !== '#text' && this.oldRangeElement.querySelectorAll('BR').length === 1) {
                    var brElement = this.oldRangeElement.querySelector('BR');
                    if (brElement && isNOU(brElement.nextSibling)) {
                        var brParentElement = brElement.parentNode;
                        var currentState = this.oldRangeElement.innerHTML;
                        this.parent.formatter.saveData(currentState);
                        detach(brElement);
                        if (brParentElement && brParentElement.childNodes.length === 0) {
                            detach(brParentElement);
                            checkParent = true;
                        }
                    }
                }
                if (!isNOU(this.rangeElement) && this.oldRangeElement !== this.rangeElement && !checkParent) {
                    while (this.rangeElement.firstChild) {
                        if (this.oldRangeElement.nodeName === '#text') {
                            this.oldRangeElement.parentElement.appendChild(this.rangeElement.childNodes[0]);
                        }
                        else {
                            this.oldRangeElement.appendChild(this.rangeElement.childNodes[0]);
                        }
                    }
                    // eslint-disable-next-line
                    !isLiElement ? detach(this.rangeElement) : detach(this.rangeElement.parentElement);
                    this.oldRangeElement.normalize();
                }
            }
        }
        if (e.args.code === 'Backspace' && e.args.keyCode === 8 &&
            currentRange.startContainer.nodeType !== Node.TEXT_NODE) {
            var ChildNode = !isNOU(currentRange.startContainer.childNodes[currentRange.startOffset - 1]) &&
                !isNOU(currentRange.startContainer.childNodes[currentRange.startOffset - 1].isContentEditable) &&
                !currentRange.startContainer.childNodes[currentRange.startOffset - 1].isContentEditable ?
                currentRange.startContainer.childNodes[currentRange.startOffset - 1] : null;
            if (ChildNode) {
                ChildNode.remove();
                e.args.preventDefault();
            }
        }
    };
    //Finds the last significant node within the given element.
    HtmlEditor.prototype.getLastNode = function (node) {
        while (node && node.lastChild) {
            node = node.lastChild;
        }
        // Skip empty text nodes by checking if the node is a text node and contains only whitespace.
        while (node && node.nodeType === Node.TEXT_NODE && !node.nodeValue.trim()) {
            node = node.previousSibling;
        }
        return node;
    };
    // Removes the last <br> element from the given element if it is the last meaningful node.
    HtmlEditor.prototype.removeLastBr = function (element) {
        // Get the last meaningful node of the given element.
        var lastNode = this.getLastNode(element);
        // If the last node is a <br> element, remove it from the DOM.
        if (lastNode && lastNode.nodeName === 'BR' && lastNode.parentNode) {
            this.isPreviousNodeBrAfterBackSpace = !isNOU(lastNode.previousSibling) &&
                lastNode.previousSibling.nodeName === 'BR' ? true : false;
            lastNode.parentNode.removeChild(lastNode);
        }
    };
    HtmlEditor.prototype.deleteCleanup = function (e, currentRange) {
        var isLiElement = false;
        var liElement;
        var rootElement;
        if (e.args.code === 'Delete' && e.args.keyCode === 46 &&
            this.parent.contentModule.getText().trim().replace(/(\r\n|\n|\r|\t)/gm, '').replace(/\u200B/g, '').length !== 0 && this.parent.getSelection().length === 0 && currentRange.startContainer.parentElement.tagName !== 'TD' &&
            currentRange.startContainer.parentElement.tagName !== 'TH') {
            this.deleteRangeElement = rootElement = this.getRootBlockNode(currentRange.startContainer);
            if (this.deleteRangeElement.tagName === 'OL' || this.deleteRangeElement.tagName === 'UL') {
                liElement = this.getRangeLiNode(currentRange.startContainer);
                if (liElement.nextElementSibling && liElement.nextElementSibling.childElementCount > 0
                    && !liElement.nextElementSibling.querySelector('BR')) {
                    if (!isNullOrUndefined(liElement.lastElementChild)) {
                        this.deleteRangeElement = liElement.lastElementChild;
                        isLiElement = true;
                    }
                    else {
                        this.deleteRangeElement = liElement;
                    }
                }
                else {
                    this.deleteRangeElement = this.getRangeElement(liElement);
                }
            }
            else if (this.deleteRangeElement.nodeType === 3 || (this.deleteRangeElement.tagName === 'TABLE' ||
                (!isNullOrUndefined(this.deleteRangeElement.nextElementSibling) && this.deleteRangeElement.nextElementSibling.tagName === 'TABLE'))) {
                return;
            }
            var isImgWithEmptyBlockNode = false;
            if (this.deleteRangeElement.querySelectorAll('img').length > 0 && this.deleteRangeElement.textContent.trim() === '') {
                isImgWithEmptyBlockNode = true;
            }
            if (this.getCaretIndex(currentRange, this.deleteRangeElement) === this.deleteRangeElement.textContent.length &&
                !isImgWithEmptyBlockNode) {
                if (!isNullOrUndefined(liElement)) {
                    if (isLiElement || !isNullOrUndefined(liElement.nextElementSibling)) {
                        this.deleteOldRangeElement = this.getRangeElement(liElement.nextElementSibling);
                    }
                    else {
                        this.deleteOldRangeElement = rootElement.nextElementSibling;
                    }
                }
                else {
                    this.deleteOldRangeElement = this.deleteRangeElement.nextElementSibling;
                }
                if (isNullOrUndefined(this.deleteOldRangeElement)) {
                    return;
                }
                else {
                    if (currentRange.startOffset === 0 && currentRange.endOffset === 1 &&
                        this.deleteRangeElement.childNodes[0].nodeName === 'IMG') {
                        this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.parent.contentModule.getDocument(), this.deleteRangeElement, this.deleteRangeElement, 0, 1);
                        this.isImageDelete = true;
                    }
                    else {
                        this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), this.deleteRangeElement, this.deleteRangeElement.childNodes.length);
                        this.isImageDelete = false;
                    }
                    var brNode = this.deleteRangeElement.querySelector('BR');
                    var brLastChildNode = this.deleteRangeElement.lastChild;
                    var brParentNode = void 0;
                    if (brLastChildNode) {
                        brParentNode = brLastChildNode.parentNode;
                    }
                    if (brNode && brNode.classList.contains('e-rte-image-remove-focus')) {
                        removeClass([brNode], ['e-rte-image-focus']);
                        return;
                    }
                    else if (brNode && brLastChildNode && brLastChildNode.nodeName === 'BR') {
                        detach(brLastChildNode);
                        if (!isNullOrUndefined(brParentNode) && brParentNode.childNodes.length === 0) {
                            detach(brParentNode);
                        }
                        e.args.preventDefault();
                    }
                    if (!isNullOrUndefined(this.deleteRangeElement) && (this.deleteOldRangeElement.tagName !== 'OL' && this.deleteOldRangeElement.tagName !== 'UL')
                        && this.deleteOldRangeElement !== this.deleteRangeElement
                        && this.parent.contentModule.getEditPanel().contains(this.deleteRangeElement)) {
                        while (this.deleteOldRangeElement.firstChild) {
                            this.deleteRangeElement.appendChild(this.deleteOldRangeElement.childNodes[0]);
                        }
                        if (!isLiElement) {
                            detach(this.deleteOldRangeElement);
                        }
                        else {
                            detach(this.deleteOldRangeElement.parentElement);
                        }
                        this.deleteRangeElement.normalize();
                    }
                    else {
                        this.deleteRangeElement = null;
                        this.deleteOldRangeElement = null;
                    }
                }
            }
            else {
                this.deleteRangeElement = null;
            }
        }
    };
    HtmlEditor.prototype.getCaretIndex = function (currentRange, element) {
        var position = 0;
        if (this.parent.contentModule.getDocument().getSelection().rangeCount !== 0) {
            var preCaretRange = currentRange.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(currentRange.endContainer, currentRange.endOffset);
            position = preCaretRange.toString().length;
        }
        return position;
    };
    HtmlEditor.prototype.getRangeElement = function (element) {
        var rangeElement;
        if (element.childNodes.length <= 1) {
            rangeElement = element.lastElementChild ? element.lastElementChild.tagName === 'BR' ?
                element.lastElementChild.previousElementSibling ? element.lastElementChild.previousElementSibling
                    : element : element.lastElementChild : element;
        }
        else {
            rangeElement = element;
        }
        return rangeElement;
    };
    HtmlEditor.prototype.getRootBlockNode = function (rangeBlockNode) {
        // eslint-disable-next-line
        for (; rangeBlockNode && this.parent && this.parent.inputElement !== rangeBlockNode; rangeBlockNode = rangeBlockNode) {
            if (rangeBlockNode.parentElement === this.parent.inputElement) {
                break;
            }
            else {
                rangeBlockNode = rangeBlockNode.parentElement;
            }
        }
        return rangeBlockNode;
    };
    HtmlEditor.prototype.getRangeLiNode = function (rangeLiNode) {
        var node = rangeLiNode.parentElement;
        while (node !== this.parent.inputElement) {
            if (node.nodeType === 1 && node.tagName === 'LI') {
                break;
            }
            node = node.parentElement;
        }
        return node;
    };
    HtmlEditor.prototype.onPaste = function (e) {
        // eslint-disable-next-line
        var regex = new RegExp(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi);
        if (e.text.match(regex)) {
            if (e.isWordPaste) {
                return;
            }
            e.args.preventDefault();
            var range = this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument());
            // eslint-disable-next-line
            var saveSelection = this.parent.formatter.editorManager.nodeSelection.save(range, this.parent.contentModule.getDocument());
            // eslint-disable-next-line
            var httpRegex = new RegExp(/([^\S]|^)(((https?\:\/\/)))/gi);
            var wwwRegex = new RegExp(/([^\S]|^)(((www\.))(\S+))/gi);
            var enterSplitText = e.text.split('\n');
            var contentInnerElem = '';
            for (var i = 0; i < enterSplitText.length; i++) {
                if (enterSplitText[i].trim() === '') {
                    contentInnerElem += getDefaultValue(this.parent);
                }
                else {
                    var contentWithSpace = '';
                    var spaceBetweenContent = true;
                    var spaceSplit = enterSplitText[i].split(' ');
                    for (var j = 0; j < spaceSplit.length; j++) {
                        if (spaceSplit[j].trim() === '') {
                            contentWithSpace += spaceBetweenContent ? '&nbsp;' : ' ';
                        }
                        else {
                            spaceBetweenContent = false;
                            contentWithSpace += spaceSplit[j] + ' ';
                        }
                    }
                    if (i === 0) {
                        contentInnerElem += '<span>' + contentWithSpace.trim() + '</span>';
                    }
                    else {
                        contentInnerElem += '<p>' + contentWithSpace.trim() + '</p>';
                    }
                }
            }
            var divElement = this.parent.createElement('div');
            divElement.setAttribute('class', 'pasteContent');
            divElement.style.display = 'inline';
            divElement.innerHTML = contentInnerElem.replace('&para', '&amp;para');
            var paraElem = divElement.querySelectorAll('span, p');
            for (var i = 0; i < paraElem.length; i++) {
                var splitTextContent = paraElem[i].innerHTML.split(' ');
                var resultSplitContent = '';
                for (var j = 0; j < splitTextContent.length; j++) {
                    if (splitTextContent[j].match(httpRegex) || splitTextContent[j].match(wwwRegex)) {
                        resultSplitContent += '<a class="e-rte-anchor" href="' + splitTextContent[j] +
                            '" title="' + splitTextContent[j] + '" target="_blank"' + ' aria-label="' + this.parent.serviceLocator.getService('rteLocale').getConstant('linkAriaLabel') + '">' + splitTextContent[j] + ' </a>';
                    }
                    else {
                        resultSplitContent += splitTextContent[j] + ' ';
                    }
                }
                paraElem[i].innerHTML = resultSplitContent.trim();
            }
            var anchorElement = divElement.childNodes[0];
            if (!isNullOrUndefined(anchorElement) && !isNullOrUndefined(anchorElement.childNodes[0]) && anchorElement.nodeName === 'SPAN' && anchorElement.childNodes[0].nodeName === 'A') {
                divElement.innerHTML = divElement.innerHTML.replace('<span>', '').replace('</span>', '');
            }
            if (!isNullOrUndefined(this.parent.pasteCleanupModule)) {
                e.callBack(divElement.innerHTML);
            }
            else {
                this.parent.formatter.editorManager.execCommand('insertHTML', null, null, null, divElement);
            }
        }
    };
    HtmlEditor.prototype.spaceLink = function (e) {
        var range = this.nodeSelectionObj.getRange(this.contentRenderer.getDocument());
        if (range.startContainer.nodeType === Node.TEXT_NODE) {
            var selectNodeEle = this.nodeSelectionObj.getParentNodeCollection(range);
            var text = range.startContainer.textContent.substr(0, range.endOffset);
            var splitText = text.split(' ');
            var urlText = splitText[splitText.length - 1];
            var urlTextRange = range.startOffset - (text.length - splitText[splitText.length - 1].length);
            urlText = urlText.slice(0, urlTextRange);
            // eslint-disable-next-line
            var regex = new RegExp(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi);
            if (selectNodeEle[0] && selectNodeEle[0].nodeName !== 'A' && urlText.match(regex)) {
                var selection = this.nodeSelectionObj.save(range, this.parent.contentModule.getDocument());
                var url = urlText.indexOf('http') > -1 ? urlText : 'http://' + urlText;
                var selectParent = this.parent.formatter.editorManager.nodeSelection.getParentNodeCollection(range);
                var value = {
                    url: url,
                    selection: selection, selectParent: selectParent,
                    text: urlText,
                    title: '',
                    target: '_blank'
                };
                this.parent.formatter.process(this.parent, {
                    item: {
                        'command': 'Links',
                        'subCommand': 'CreateLink'
                    }
                }, e, value);
            }
        }
    };
    HtmlEditor.prototype.onToolbarClick = function (args) {
        var _this = this;
        var save;
        var selectNodeEle;
        var selectParentEle;
        var item = args.item;
        var closestElement = closest(args.originalEvent.target, '.e-rte-quick-popup');
        var target = args.originalEvent.target;
        this.parent.notify(events.closeTooltip, { target: target });
        if (item.command !== 'FormatPainter') {
            if (closestElement && !closestElement.classList.contains('e-rte-inline-popup') && !closestElement.classList.contains('e-rte-text-popup')) {
                if (!(item.subCommand === 'SourceCode' || item.subCommand === 'Preview' ||
                    item.subCommand === 'FontColor' || item.subCommand === 'BackgroundColor')) {
                    if (isIDevice() && item.command === 'Images') {
                        this.nodeSelectionObj.restore();
                    }
                    var range = this.nodeSelectionObj.getRange(this.parent.contentModule.getDocument());
                    save = this.nodeSelectionObj.save(range, this.parent.contentModule.getDocument());
                    selectNodeEle = this.nodeSelectionObj.getNodeCollection(range);
                    selectParentEle = this.nodeSelectionObj.getParentNodeCollection(range);
                }
                if (item.command === 'Images') {
                    this.parent.notify(events.imageToolbarAction, {
                        member: 'image', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Audios') {
                    this.parent.notify(events.audioToolbarAction, {
                        member: 'audio', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Videos') {
                    this.parent.notify(events.videoToolbarAction, {
                        member: 'video', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Links') {
                    this.parent.notify(events.linkToolbarAction, {
                        member: 'link', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
                if (item.command === 'Table') {
                    this.parent.notify(events.tableToolbarAction, {
                        member: 'table', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                    });
                }
            }
            else {
                var linkDialog = document.getElementById(this.parent.getID() + '_rtelink');
                var imageDialog = document.getElementById(this.parent.getID() + '_image');
                if (!(item.subCommand === 'SourceCode' || item.subCommand === 'Preview' ||
                    item.subCommand === 'FontColor' || item.subCommand === 'BackgroundColor' || item.subCommand === 'NumberFormatList' || item.subCommand === 'BulletFormatList')) {
                    var range = this.nodeSelectionObj.getRange(this.parent.contentModule.getDocument());
                    if (isNullOrUndefined(linkDialog) && isNullOrUndefined(imageDialog)) {
                        save = this.nodeSelectionObj.save(range, this.parent.contentModule.getDocument());
                    }
                    selectNodeEle = this.nodeSelectionObj.getNodeCollection(range);
                    selectParentEle = this.nodeSelectionObj.getParentNodeCollection(range);
                }
                switch (item.subCommand) {
                    case 'Maximize':
                        this.parent.notify(events.enableFullScreen, { args: args });
                        break;
                    case 'Minimize':
                        this.parent.notify(events.disableFullScreen, { args: args });
                        break;
                    case 'CreateLink':
                        this.parent.notify(events.insertLink, {
                            member: 'link', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'RemoveLink':
                        this.parent.notify(events.unLink, {
                            member: 'link', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'Print':
                        this.parent.print();
                        break;
                    case 'Image':
                        this.parent.notify(events.insertImage, {
                            member: 'image', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'Audio':
                        this.parent.notify(events.insertAudio, {
                            member: 'audio', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'Video':
                        this.parent.notify(events.insertVideo, {
                            member: 'video', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'CreateTable':
                        this.parent.notify(events.createTable, {
                            member: 'table', args: args, selection: save
                        });
                        break;
                    case 'SourceCode':
                        this.parent.notify(events.sourceCode, { member: 'viewSource', args: args });
                        break;
                    case 'Preview':
                        this.parent.notify(events.updateSource, { member: 'updateSource', args: args });
                        break;
                    case 'FontColor':
                    case 'BackgroundColor':
                        break;
                    case 'File':
                        this.parent.notify(events.renderFileManager, {
                            member: 'fileManager', args: args, selectNode: selectNodeEle, selection: save, selectParent: selectParentEle
                        });
                        break;
                    case 'EmojiPicker':
                        this.parent.notify(events.emojiPicker, { member: 'emojiPicker', args: args });
                        break;
                    case 'ImportWord':
                        this.parent.notify(events.onImport, {});
                        break;
                    case 'ExportWord':
                        this.parent.notify(events.onExport, { member: 'ExportWord', args: args });
                        break;
                    case 'ExportPdf':
                        this.parent.notify(events.onExport, { member: 'ExportPdf', args: args });
                        break;
                    default:
                        this.parent.formatter.process(this.parent, args, args.originalEvent, null);
                        break;
                }
                if (!isNOU(this.parent.quickToolbarModule) && ((isNOU(this.parent.quickToolbarModule.imageQTBar) && item.subCommand === 'Image') ||
                    (isNOU(this.parent.quickToolbarModule.audioQTBar) && item.subCommand === 'Audio') ||
                    (isNOU(this.parent.quickToolbarModule.videoQTBar) && item.subCommand === 'Video') ||
                    (isNOU(this.parent.quickToolbarModule.linkQTBar) && item.subCommand === 'CreateLink'))) {
                    this.parent.notify(events.renderQuickToolbar, {});
                }
            }
        }
        else {
            if (args.originalEvent.detail === 1) {
                clearTimeout(this.clickTimeout);
                this.clickTimeout = setTimeout(function () {
                    _this.parent.notify(events.formatPainterClick, {
                        member: 'formatPainter', args: args
                    });
                }, 200);
            }
            else {
                clearTimeout(this.clickTimeout);
                this.parent.notify(events.formatPainterDoubleClick, {
                    member: 'formatPainter', args: args
                });
            }
        }
    };
    HtmlEditor.prototype.instantiateRenderer = function () {
        if (this.parent.iframeSettings.enable) {
            this.renderFactory.addRenderer(RenderType.Content, new IframeContentRender(this.parent));
        }
        else {
            this.renderFactory.addRenderer(RenderType.Content, new ContentRender(this.parent));
        }
    };
    HtmlEditor.prototype.removeEventListener = function () {
        this.parent.off(events.initialEnd, this.render);
        this.parent.off(events.modelChanged, this.onPropertyChanged);
        this.parent.off(events.htmlToolbarClick, this.onToolbarClick);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.initialLoad, this.instantiateRenderer);
        this.parent.off(events.selectAll, this.selectAll);
        this.parent.off(events.selectRange, this.selectRange);
        this.parent.off(events.getSelectedHtml, this.getSelectedHtml);
        this.parent.off(events.selectionSave, this.onSelectionSave);
        this.parent.off(events.selectionRestore, this.onSelectionRestore);
        this.parent.off(events.readOnlyMode, this.updateReadOnly);
        this.parent.off(events.paste, this.onPaste);
        this.parent.off(events.tableclass, this.isTableClassAdded);
    };
    HtmlEditor.prototype.render = function () {
        this.contentRenderer = this.renderFactory.getRenderer(RenderType.Content);
        var editElement = this.contentRenderer.getEditPanel();
        var option = { undoRedoSteps: this.parent.undoRedoSteps, undoRedoTimer: this.parent.undoRedoTimer };
        if (isNullOrUndefined(this.parent.formatter)) {
            var formatterClass = new HTMLFormatter({
                currentDocument: this.contentRenderer.getDocument(),
                element: editElement,
                options: option,
                formatPainterSettings: this.parent.formatPainterSettings
            });
            this.parent.setProperties({ formatter: formatterClass }, true);
        }
        else {
            this.parent.formatter.updateFormatter(editElement, this.contentRenderer.getDocument(), option, this.parent.formatPainterSettings);
        }
        if (this.parent.enableXhtml) {
            this.parent.notify(events.xhtmlValidation, {});
        }
        if (this.parent.toolbarSettings.enable) {
            this.toolbarUpdate = new HtmlToolbarStatus(this.parent);
        }
        if (this.parent.inlineMode.enable) {
            if (!isNullOrUndefined(this.parent.fontFamily.default)) {
                editElement.style.fontFamily = this.parent.fontFamily.default;
            }
            if (!isNullOrUndefined(this.parent.fontSize.default)) {
                editElement.style.fontSize = this.parent.fontSize.default;
            }
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
    HtmlEditor.prototype.onPropertyChanged = function (e) {
        // On property code change here
        if (!isNOU(e) && !isNOU(e.newProp.toolbarSettings) && !isNOU(e.newProp.toolbarSettings.enable)) {
            this.toolbarUpdate = new HtmlToolbarStatus(this.parent);
        }
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
     * @returns {string} - returns the string value
     * @hidden
     */
    HtmlEditor.prototype.getModuleName = function () {
        return 'htmlEditor';
    };
    /**
     * For selecting all content in RTE
     *
     * @returns {void}
     * @private
     * @hidden
     */
    HtmlEditor.prototype.selectAll = function () {
        var nodes = getTextNodesUnder(this.parent.contentModule.getDocument(), this.parent.contentModule.getEditPanel());
        if (nodes.length > 0) {
            this.parent.formatter.editorManager.nodeSelection.setSelectionText(this.parent.contentModule.getDocument(), nodes[0], nodes[nodes.length - 1], 0, nodes[nodes.length - 1].textContent.length);
        }
    };
    /**
     * For selecting all content in RTE
     *
     * @param {NotifyArgs} e - specifies the notified arguments
     * @returns {void}
     * @private
     * @hidden
     */
    HtmlEditor.prototype.selectRange = function (e) {
        this.parent.formatter.editorManager.nodeSelection.setRange(this.parent.contentModule.getDocument(), e.range);
    };
    /**
     * For get a selected text in RTE
     *
     * @param {NotifyArgs} e - specifies the notified arguments
     * @returns {void}
     * @hidden
     */
    HtmlEditor.prototype.getSelectedHtml = function (e) {
        e.callBack(this.parent.formatter.editorManager.nodeSelection.getRange(this.parent.contentModule.getDocument()).toString());
    };
    HtmlEditor.prototype.tableSelectionKeyAction = function (e) {
        var args = e.args;
        // Handle the space, enter and backspace keys when the table cells are selected.
        var tableCellSelectNodes = this.parent.inputElement.querySelectorAll('.e-cell-select');
        for (var i = 0; i < tableCellSelectNodes.length; i++) {
            var currentCell = tableCellSelectNodes[i];
            removeClassWithAttr([currentCell], [classes.CLS_TABLE_SEL, classes.CLS_TABLE_MULTI_CELL, classes.CLS_TABLE_SEL_END]);
            if (i === 0) {
                if (args.keyCode === 32) {
                    currentCell.innerHTML = '&#8203;<br>';
                }
                else {
                    currentCell.innerHTML = '<br>';
                }
                this.nodeSelectionObj.setCursorPoint(this.parent.contentModule.getDocument(), currentCell.firstChild, 0);
            }
            else {
                currentCell.innerHTML = '<br>';
            }
        }
    };
    HtmlEditor.prototype.marginTabAdd = function (val, alignmentNodes) {
        for (var index = 0; index < alignmentNodes.length; index++) {
            var element = alignmentNodes[index];
            if (element.closest('li')) {
                continue;
            }
            if (element.style.marginLeft) {
                var count = parseInt(element.style.marginLeft, 10);
                if (val) {
                    count -= 20;
                }
                else {
                    count += 20;
                }
                element.style.marginLeft = count.toString() + 'px';
                if (element.style.marginLeft === '0px') {
                    element.removeAttribute('style');
                }
            }
            else if (!val) {
                element.style.marginLeft = '20px';
            }
        }
    };
    return HtmlEditor;
}());
export { HtmlEditor };
