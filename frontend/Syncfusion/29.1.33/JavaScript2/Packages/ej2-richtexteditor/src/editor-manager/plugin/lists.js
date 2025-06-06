import * as CONSTANT from './../base/constant';
import { createElement, detach, prepend, append, attributes, Browser } from '@syncfusion/ej2-base';
import { markerClassName } from './dom-node';
import * as EVENTS from './../../common/constant';
import { setStyleAttribute } from '@syncfusion/ej2-base';
import { isIDevice, setEditFrameFocus } from '../../common/util';
import { isNullOrUndefined, isNullOrUndefined as isNOU, closest } from '@syncfusion/ej2-base';
import { InsertHtml } from './inserthtml';
import { DOMMethods } from './dom-tree';
/**
 * Lists internal component
 *
 * @hidden
 * @deprecated
 */
var Lists = /** @class */ (function () {
    /**
     * Constructor for creating the Lists plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    function Lists(parent) {
        this.listTabIndentation = false;
        this.parent = parent;
        this.domNode = this.parent.domNode;
        this.addEventListener();
    }
    Lists.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.LIST_TYPE, this.applyListsHandler, this);
        this.parent.observer.on(EVENTS.KEY_UP_HANDLER, this.onKeyUp, this);
        this.parent.observer.on(EVENTS.KEY_DOWN_HANDLER, this.keyDownHandler, this);
        this.parent.observer.on(EVENTS.SPACE_ACTION, this.spaceKeyAction, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    Lists.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.LIST_TYPE, this.applyListsHandler);
        this.parent.observer.off(EVENTS.KEY_UP_HANDLER, this.onKeyUp);
        this.parent.observer.off(EVENTS.KEY_DOWN_HANDLER, this.keyDownHandler);
        this.parent.observer.off(EVENTS.SPACE_ACTION, this.spaceKeyAction);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    Lists.prototype.testList = function (elem) {
        var olListRegex = [/^[\d]+[.]+$/,
            /^(?=[MDCLXVI])M*(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})[.]$/gi,
            /^[a-zA-Z][.]+$/];
        var elementStart = !isNullOrUndefined(elem) ? elem.innerText.trim().split('.')[0] + '.' : null;
        if (!isNullOrUndefined(elementStart)) {
            for (var i = 0; i < olListRegex.length; i++) {
                if (olListRegex[i].test(elementStart)) {
                    return true;
                }
            }
        }
        return false;
    };
    Lists.prototype.testCurrentList = function (range) {
        var olListStartRegex = [/^[1]+[.]+$/, /^[i]+[.]+$/, /^[a]+[.]+$/];
        if (!isNullOrUndefined(range.startContainer.textContent.slice(0, range.startOffset))) {
            var currentContent = range.startContainer.textContent.replace(/\u200B/g, '').slice(0, range.startOffset).trim();
            for (var i = 0; i < olListStartRegex.length; i++) {
                if (olListStartRegex[i].test(currentContent) && currentContent.length === 2) {
                    return true;
                }
            }
        }
        return false;
    };
    Lists.prototype.createAutoList = function (enterKey, shiftEnterKey) {
        var autoListRules = {
            BR: { BR: true, P: true, DIV: true },
            P: { BR: false, P: true, DIV: true },
            DIV: { BR: false, P: true, DIV: true }
        };
        if (autoListRules[enterKey] && autoListRules[enterKey][shiftEnterKey] !== undefined) {
            return autoListRules[enterKey][shiftEnterKey];
        }
        return false;
    };
    Lists.prototype.isInsideSameListType = function (startNode, startElementOLTest) {
        if (!startNode) {
            return false;
        }
        // Find the closest <li> ancestor of the startNode
        var listItem = startNode.closest('li');
        if (!listItem) {
            return false; // Not inside a list item
        }
        // Get the parent list element (either <ul> or <ol>)
        var parentList = listItem.closest('ul, ol');
        if (!parentList) {
            return false; // No valid list container found
        }
        // Check if parentList is OL or UL and compare with startElementOLTest
        return (parentList.tagName === 'OL' && startElementOLTest) || (parentList.tagName === 'UL' && !startElementOLTest);
    };
    Lists.prototype.spaceList = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        this.saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        // eslint-disable-next-line
        var endNode = this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
        var preElement = startNode.previousElementSibling;
        var nextElement = startNode.nextElementSibling;
        var preElemULStart = !isNullOrUndefined(preElement) ?
            preElement.innerText.trim().substring(0, 1) : null;
        var nextElemULStart = !isNullOrUndefined(nextElement) ?
            nextElement.innerText.trim().substring(0, 1) : null;
        var startElementOLTest = this.testCurrentList(range);
        var preElementOLTest = this.testList(preElement);
        var nextElementOLTest = this.testList(nextElement);
        var isInsideSameListType = this.isInsideSameListType(startNode, startElementOLTest);
        var nextElementBRTest = range.startContainer.previousElementSibling && range.startContainer.previousElementSibling.tagName === 'BR';
        if (!isInsideSameListType && !preElementOLTest && !nextElementOLTest && preElemULStart !== '*' && nextElemULStart !== '*' && (this.createAutoList(e.enterKey, e.shiftEnterKey) || !nextElementBRTest)) {
            var brElement = createElement('br');
            if (startElementOLTest) {
                range.startContainer.textContent = range.startContainer.textContent.slice(range.startOffset, range.startContainer.textContent.length);
                if (range.startContainer.nodeName === '#text' && range.startContainer.textContent.length === 0) {
                    this.parent.domNode.insertAfter(brElement, range.startContainer);
                }
                this.applyListsHandler({ subCommand: 'OL', callBack: e.callBack });
                e.event.preventDefault();
            }
            else if (range.startContainer.textContent.replace(/\u200B/g, '').slice(0, range.startOffset).trim() === '*' ||
                range.startContainer.textContent.replace(/\u200B/g, '').slice(0, range.startOffset).trim() === '-') {
                range.startContainer.textContent = range.startContainer.textContent.slice(range.startOffset, range.startContainer.textContent.length);
                if (range.startContainer.nodeName === '#text' && range.startContainer.textContent.length === 0) {
                    this.parent.domNode.insertAfter(brElement, range.startContainer);
                }
                this.applyListsHandler({ subCommand: 'UL', callBack: e.callBack });
                e.event.preventDefault();
            }
        }
    };
    Lists.prototype.enterList = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var startNode = range.startContainer.nodeName === 'LI' ? range.startContainer :
            range.startContainer.parentElement.closest('LI');
        var endNode = range.endContainer.nodeName === 'LI' ? range.endContainer :
            range.endContainer.parentElement.closest('LI');
        // Checks for Image, Audio , Video Element inside List Element
        var hasMediaElem = false;
        if (!isNOU(startNode)) {
            var videoElemList = startNode.querySelectorAll('.e-video-clickelem');
            var embedVideoElem = videoElemList.length > 0 && videoElemList[0].childNodes[0].nodeName === 'IFRAME';
            hasMediaElem = startNode.querySelectorAll('IMG').length > 0 || startNode.querySelectorAll('AUDIO').length > 0 || startNode.querySelectorAll('VIDEO').length > 0 || embedVideoElem;
        }
        var startNodeParent;
        var parentOfCurrentOLUL;
        if (startNode) {
            startNodeParent = startNode.parentElement;
            if (startNodeParent) {
                parentOfCurrentOLUL = startNodeParent.parentElement;
            }
        }
        var tableElement = !isNullOrUndefined(startNode) ? startNode.querySelector('TABLE') : null;
        if (!isNOU(startNode) && !isNOU(endNode) && startNode === endNode && startNode.tagName === 'LI' &&
            startNode.textContent.trim() === '' && !hasMediaElem && isNOU(tableElement)) {
            if (startNode.innerHTML.indexOf('&nbsp;') >= 0) {
                return;
            }
            if (startNode.textContent.charCodeAt(0) === 65279) {
                startNode.textContent = '';
            }
            if (isNOU(parentOfCurrentOLUL.closest('UL')) && isNOU(parentOfCurrentOLUL.closest('OL'))) {
                if (!isNOU(startNode.nextElementSibling)) {
                    var nearBlockNode = this.parent.domNode.blockParentNode(startNode);
                    this.parent.nodeCutter.GetSpliceNode(range, nearBlockNode);
                }
                var insertTag = void 0;
                if (e.enterAction === 'DIV') {
                    insertTag = createElement('div');
                    insertTag.innerHTML = '<br>';
                }
                else if (e.enterAction === 'P') {
                    insertTag = createElement('p');
                    insertTag.innerHTML = '<br>';
                }
                else {
                    insertTag = createElement('br');
                }
                var immediateBlock = this.domNode.getImmediateBlockNode(range.startContainer);
                var _a = this.applyFormattingFromRange(insertTag, range, immediateBlock, e.enterAction), formattedElement = _a.formattedElement, cursorTarget = _a.cursorTarget;
                insertTag = formattedElement;
                if (!isNOU(parentOfCurrentOLUL) && parentOfCurrentOLUL.nodeName === 'BLOCKQUOTE') {
                    this.parent.observer.notify('blockquote_list_handled', {});
                }
                this.parent.domNode.insertAfter(insertTag, startNodeParent);
                e.event.preventDefault();
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, cursorTarget, 0);
                if (startNodeParent.textContent === '' && (startNodeParent.querySelectorAll('audio,video,table').length === 0)) {
                    detach(startNodeParent);
                }
                else {
                    detach(startNode);
                }
            }
            // To handle the nested enter key press in the list for the first LI element
            if (!isNOU(parentOfCurrentOLUL) && (!isNOU(parentOfCurrentOLUL.closest('UL')) || !isNOU(parentOfCurrentOLUL.closest('OL'))) &&
                parentOfCurrentOLUL.nodeName === 'LI' && parentOfCurrentOLUL.style.listStyleType === 'none' &&
                parentOfCurrentOLUL.textContent === '' && startNode.textContent === '' && startNode === startNodeParent.firstElementChild &&
                isNOU(startNode.nextSibling)) {
                detach(startNodeParent);
                parentOfCurrentOLUL.style.removeProperty('list-style-type');
                e.event.preventDefault();
            }
        }
        this.handleNestedEnterKeyForLists(e, parentOfCurrentOLUL, startNode, startNodeParent);
    };
    Lists.prototype.applyFormattingFromRange = function (element, range, blockNode, enterAction) {
        var cursorTarget = element;
        var formatTags = [];
        if (blockNode) {
            var currentNode = range.startContainer;
            var blockElements = ['div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'ul', 'ol', 'table', 'tr', 'td', 'th'];
            while (currentNode && currentNode !== blockNode) {
                var nodeName = currentNode.nodeName.toLowerCase();
                if (blockElements.indexOf(nodeName) === -1 && currentNode.nodeType === Node.ELEMENT_NODE) {
                    formatTags.push({
                        tag: nodeName,
                        element: currentNode
                    });
                }
                currentNode = currentNode.parentNode;
            }
            if (formatTags.length > 0) {
                element = (enterAction === 'BR') ? createElement('DIV') : element;
                element.innerHTML = '';
                var currentElement_1 = element;
                formatTags.reverse().forEach(function (format) {
                    var newElement = createElement(format.tag);
                    Array.from(format.element.attributes).forEach(function (attr) {
                        newElement.setAttribute(attr.name, attr.value);
                    });
                    currentElement_1.appendChild(newElement);
                    currentElement_1 = newElement;
                });
                var brElement = createElement('br');
                currentElement_1.appendChild(brElement);
                cursorTarget = currentElement_1;
            }
        }
        return { formattedElement: (enterAction === 'BR' && formatTags.length > 0) ? element.firstChild : element, cursorTarget: cursorTarget };
    };
    Lists.prototype.handleNestedEnterKeyForLists = function (e, parentOfCurrentOLUL, startNode, startNodeParent) {
        var hasIgnoredElement = false;
        if (!isNOU(startNode) && startNode.querySelectorAll('audio,video,table,img').length > 0) {
            hasIgnoredElement = true;
        }
        if (!isNOU(parentOfCurrentOLUL) && (!isNOU(parentOfCurrentOLUL.closest('UL')) || !isNOU(parentOfCurrentOLUL.closest('OL')) || startNodeParent.nodeName === 'UL' || startNodeParent.nodeName === 'OL') &&
            (parentOfCurrentOLUL.nodeName === 'LI' || startNode.nodeName === 'LI') && (parentOfCurrentOLUL.style.listStyleType === 'none' || parentOfCurrentOLUL.style.listStyleType === '') &&
            parentOfCurrentOLUL.textContent !== '' && (startNode.textContent !== '' || !isNOU(startNode.nextSibling)) && startNode.firstElementChild && (startNode.firstElementChild.textContent === '' && !hasIgnoredElement) && (startNode === startNodeParent.firstElementChild || startNode.nodeName === 'LI')) {
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            this.saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
            this.domNode.setMarker(this.saveSelection);
            e.event.preventDefault();
            var nodes = [];
            if (startNode === startNodeParent.firstElementChild) {
                nodes.push(startNodeParent.firstElementChild);
            }
            else if (startNode.nodeName === 'LI') {
                nodes.push(startNode);
            }
            this.revertList(nodes, e);
            this.revertClean();
            this.saveSelection = this.domNode.saveMarker(this.saveSelection);
            this.saveSelection.restore();
        }
    };
    Lists.prototype.backspaceList = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        var endNode = this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
        startNode = startNode.nodeName === 'BR' ? startNode.parentElement : startNode;
        endNode = endNode.nodeName === 'BR' ? endNode.parentElement : endNode;
        if (!isNOU(startNode) && startNode.closest('li')) {
            var listCursorInfo = this.getListCursorInfo(range);
            var isFirst = startNode.previousElementSibling === null;
            var allowedCursorSelections = ['StartParent'];
            var allowedSelections = ['SingleFull', 'MultipleFull'];
            var blockNodes = this.parent.domNode.blockNodes();
            var isAllListSelected = this.isAllListNodesSelected(startNode.closest('li').parentElement);
            var hasIndent = listCursorInfo.position === 'StartNested' && startNode && startNode.parentElement &&
                startNode.parentElement.closest('li') && startNode.parentElement.closest('li').getAttribute('style')
                && startNode.parentElement.closest('li').getAttribute('style').indexOf('list-style-type: none;') !== -1;
            if (isFirst && (allowedCursorSelections.indexOf(listCursorInfo.position) > -1 || hasIndent)) {
                e.event.preventDefault();
                var saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
                this.domNode.setMarker(saveSelection);
                this.revertList([blockNodes[0]], e);
                this.revertClean();
                saveSelection = this.domNode.saveMarker(saveSelection);
                saveSelection.restore();
                return;
            }
            else if (allowedSelections.indexOf(listCursorInfo.selectionState) > -1 && isAllListSelected) {
                e.event.preventDefault();
                blockNodes[0].innerHTML = '';
                range.deleteContents();
                if (blockNodes.length > 1) {
                    for (var i = 0; i < blockNodes.length; i++) {
                        if (i === 0) {
                            continue; // First List is needed after the removal of list items.
                        }
                        var list = blockNodes[i];
                        detach(list);
                    }
                }
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, blockNodes[0], 0);
                return;
            }
        }
        if (startNode === endNode && !isNullOrUndefined(closest(startNode, 'li')) &&
            ((startNode.textContent.trim() === '' && startNode.textContent.charCodeAt(0) === 65279) ||
                (startNode.textContent.length === 1 && startNode.textContent.charCodeAt(0) === 8203))) {
            startNode.textContent = '';
        }
        if (startNode === endNode && startNode.tagName === 'LI' && startNode.textContent.length === 0 &&
            isNOU(startNode.previousElementSibling)) {
            startNode.removeAttribute('style');
        }
        if (startNode === endNode && startNode.textContent === '') {
            if (startNode.parentElement.tagName === 'LI' && endNode.parentElement.tagName === 'LI') {
                detach(startNode);
            }
            else if (startNode.closest('ul') || startNode.closest('ol')) {
                var parentList = !isNOU(startNode.closest('ul')) ? startNode.closest('ul') : startNode.closest('ol');
                if (parentList.firstElementChild === startNode && !isNOU(parentList.children[1]) &&
                    (parentList.children[1].tagName === 'OL' || parentList.children[1].tagName === 'UL')) {
                    if (parentList.tagName === parentList.children[1].tagName) {
                        while (parentList.children[1].lastChild) {
                            this.parent.domNode.insertAfter(parentList.children[1].lastChild, parentList.children[1]);
                        }
                        detach(parentList.children[1]);
                    }
                    else {
                        parentList.parentElement.insertBefore(parentList.children[1], parentList);
                    }
                }
            }
        }
        else if (!isNOU(startNode.firstChild) && startNode.firstChild.nodeName === 'BR' &&
            (!isNullOrUndefined(startNode.childNodes[1]) && (startNode.childNodes[1].nodeName === 'UL' ||
                startNode.childNodes[1].nodeName === 'OL'))) {
            var parentList = !isNOU(startNode.closest('ul')) ? startNode.closest('ul') : startNode.closest('ol');
            if (parentList.tagName === startNode.childNodes[1].nodeName) {
                while (startNode.childNodes[1].lastChild) {
                    this.parent.domNode.insertAfter(startNode.children[1].lastChild, startNode);
                }
                detach(startNode.childNodes[1]);
            }
            else {
                parentList.parentElement.insertBefore(startNode.children[1], parentList);
            }
        }
        if (startNode === endNode && startNode.tagName === 'LI' && this.isAtListStart(startNode, range) && !isNOU(startNode.closest('ul, ol'))) {
            var currentList = startNode.closest('ul, ol');
            var parentListItem = currentList.parentElement;
            var prevSibling = startNode.previousElementSibling;
            var nestedList = startNode.querySelector('ol, ul');
            if ((!isNOU(parentListItem) && parentListItem.tagName === 'LI' && !isNOU(currentList.previousSibling)) || (!isNOU(prevSibling) && prevSibling.nodeName === 'LI')) {
                if (!isNOU(nestedList) && (isNOU(prevSibling) || !isNOU(prevSibling))) {
                    e.event.preventDefault();
                    // Preventing a default content editable div behaviour and Handles rearrangement of nested lists when press the backspace while the cursor is at the nested list structure and also redistributes child nodes and maintains cursor position after rearrangement
                    this.handleNestedListRearrangement(startNode, currentList, parentListItem, prevSibling, nestedList);
                }
            }
        }
        this.removeList(range, e);
        this.firstListBackSpace(range, e);
    };
    Lists.prototype.handleNestedListRearrangement = function (startNode, currentList, parentListItem, prevSibling, nestedList) {
        var cursorOffset = this.parent.nodeSelection.findLastTextPosition(!isNOU(prevSibling) ? prevSibling : currentList.previousSibling);
        var childNodes = Array.from(startNode.childNodes);
        for (var i = 0; i < childNodes.length; i++) {
            var child = childNodes[i];
            if (child === nestedList && nestedList) {
                while (nestedList.firstChild) {
                    currentList.insertBefore(nestedList.firstChild, startNode);
                    var emptyOL = startNode.querySelector('OL:empty,UL:empty');
                    if (emptyOL) {
                        startNode.remove();
                    }
                }
            }
            else {
                if (!isNOU(prevSibling)) {
                    cursorOffset.node.parentElement.closest('li').appendChild(child);
                }
                else {
                    parentListItem.insertBefore(child, currentList);
                }
            }
        }
        this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, cursorOffset.node, cursorOffset.offset);
    };
    Lists.prototype.findPreviousElementForCursor = function (currentElement) {
        var previousNode = null;
        // Try to find a previous sibling first
        if (currentElement.previousElementSibling) {
            previousNode = currentElement.previousElementSibling;
        }
        // If no previous sibling, try the parent (if not the editable element itself)
        else if (currentElement.parentElement && currentElement.parentElement !== this.parent.editableElement) {
            previousNode = currentElement.parentElement;
        }
        return previousNode;
    };
    Lists.prototype.handleCursorPositioningAfterListRemoval = function (previousNode) {
        if (!previousNode) {
            return;
        }
        // For Safari, explicitly set the cursor position
        if (this.parent.userAgentData.isSafari()) {
            var cursorPosition = this.parent.nodeSelection.findLastTextPosition(previousNode);
            if (cursorPosition) {
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, cursorPosition.node, cursorPosition.offset);
            }
            else {
                // If we can't find a text position, place at the end of the element
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, previousNode, previousNode.childNodes.length);
            }
        }
    };
    Lists.prototype.removeList = function (range, e) {
        var _this = this;
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        var endNode = (!isNOU(range.endContainer.parentElement.closest('li')) && range.endContainer.parentElement.closest('li').childElementCount > 1 && range.endContainer.nodeName === '#text') ? range.endContainer : this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
        var parentList = (range.startContainer.nodeName === '#text') ? range.startContainer.parentElement.closest('li') : range.startContainer.closest('li');
        var fullContent = '';
        if (!isNOU(parentList) && !isNOU(parentList.firstChild)) {
            parentList.childNodes.forEach(function (e) {
                fullContent = fullContent + e.textContent;
            });
        }
        startNode = startNode.nodeName === 'BR' ? startNode.parentElement : startNode;
        endNode = endNode.nodeName === 'BR' ? endNode.parentElement : endNode;
        startNode = startNode.nodeName !== 'LI' && !isNOU(startNode.closest('LI')) ? startNode.closest('LI') : startNode;
        endNode = endNode.nodeName !== 'LI' && endNode.nodeName !== '#text' && !isNOU(endNode.closest('LI')) ? endNode.closest('LI') : endNode;
        if (((range.commonAncestorContainer.nodeName === 'OL' || range.commonAncestorContainer.nodeName === 'UL' || range.commonAncestorContainer.nodeName === 'LI') &&
            isNOU(endNode.nextElementSibling) && endNode.textContent.length === range.endOffset &&
            isNOU(startNode.previousElementSibling) && range.startOffset === 0) ||
            (Browser.userAgent.indexOf('Firefox') !== -1 && range.startContainer === range.endContainer && range.startContainer === this.parent.editableElement &&
                range.startOffset === 0 && range.endOffset === 1)) {
            // Find where to place the cursor before removing elements for safari
            var previousNode_1;
            if (Browser.userAgent.indexOf('Firefox') !== -1) {
                previousNode_1 = this.findPreviousElementForCursor(range.commonAncestorContainer.childNodes[0]);
                detach(range.commonAncestorContainer.childNodes[0]);
            }
            else if (range.commonAncestorContainer.nodeName === 'LI') {
                previousNode_1 = this.findPreviousElementForCursor(range.commonAncestorContainer.parentElement);
                detach(range.commonAncestorContainer.parentElement);
            }
            else {
                previousNode_1 = this.findPreviousElementForCursor(range.commonAncestorContainer);
                detach(range.commonAncestorContainer);
            }
            e.event.preventDefault();
            // Handle cursor positioning for safari
            this.handleCursorPositioningAfterListRemoval(previousNode_1);
            parentList = (range.startContainer.nodeName === '#text') ? range.startContainer.parentElement.closest('li') : range.startContainer.closest('li');
        }
        var previousNode;
        if (!isNOU(parentList) && (!range.collapsed || (parentList.textContent.trim() === '' && isNOU(parentList.previousElementSibling) && isNOU(parentList.nextElementSibling))) && parentList.textContent === fullContent) {
            range.deleteContents();
            var listItems_1 = this.parent.editableElement.querySelectorAll('li');
            var _loop_1 = function (i) {
                if (!isNOU(listItems_1[i].childNodes)) {
                    listItems_1[i].childNodes.forEach(function (child) {
                        if (child.nodeName === 'A' && child.textContent === '') {
                            listItems_1[i].removeChild(child);
                        }
                    });
                }
                if ((!listItems_1[i].firstChild || listItems_1[i].textContent.trim() === '') && (listItems_1[i] === startNode || listItems_1[i] === endNode)) {
                    previousNode = this_1.findPreviousElementForCursor(listItems_1[i]);
                    listItems_1[i].parentNode.removeChild(listItems_1[i]);
                }
            };
            var this_1 = this;
            for (var i = 0; i < listItems_1.length; i++) {
                _loop_1(i);
            }
            this.parent.editableElement.querySelectorAll('ol').forEach(function (ol) {
                if (!ol.firstChild || ol.textContent.trim() === '') {
                    previousNode = _this.findPreviousElementForCursor(ol);
                    ol.parentNode.removeChild(ol);
                }
            });
            this.parent.editableElement.querySelectorAll('ul').forEach(function (ul) {
                if (!ul.firstChild || ul.textContent.trim() === '') {
                    previousNode = _this.findPreviousElementForCursor(ul);
                    ul.parentNode.removeChild(ul);
                }
            });
            e.event.preventDefault();
            // Handle cursor positioning for safari
            this.handleCursorPositioningAfterListRemoval(previousNode);
        }
    };
    Lists.prototype.onKeyUp = function (e) {
        if (!isNOU(this.commonLIParent) && !isNOU(this.commonLIParent.querySelector('.removeList'))) {
            var currentLIElem = this.commonLIParent.querySelector('.removeList');
            while (!isNOU(currentLIElem.firstChild)) {
                this.parent.domNode.insertAfter(currentLIElem.firstChild, currentLIElem);
            }
            detach(currentLIElem);
        }
        if (e.event.keyCode === 13) {
            var listElements = this.parent.editableElement.querySelectorAll('UL, OL');
            for (var i = 0; i < listElements.length; i++) {
                if (!isNullOrUndefined(listElements[i]) && !isNOU(listElements[i].parentElement) && !isNullOrUndefined(listElements[i].previousElementSibling) && (listElements[i].parentElement.nodeName === 'UL' || listElements[i].parentElement.nodeName === 'OL')) {
                    listElements[i].previousElementSibling.appendChild(listElements[i]);
                }
            }
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Lists.prototype.firstListBackSpace = function (range, _e) {
        var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
        var listItem = startNode.closest('LI');
        if (!isNOU(listItem) && !this.isAtListStart(listItem, range)) {
            return;
        }
        if (!isNOU(startNode.closest('OL'))) {
            this.commonLIParent = startNode.closest('OL');
        }
        else if (!isNOU(startNode.closest('UL'))) {
            this.commonLIParent = startNode.closest('UL');
        }
        if (!isNOU(listItem) && range.startOffset === 0 && range.endOffset === 0 &&
            isNOU(startNode.previousSibling) && !isNOU(this.commonLIParent) && isNOU(this.commonLIParent.previousSibling) &&
            (isNOU(this.commonLIParent.parentElement.closest('OL')) && isNOU(this.commonLIParent.parentElement.closest('UL')) &&
                isNOU(this.commonLIParent.parentElement.closest('LI')))) {
            var currentElem = createElement('P');
            currentElem.innerHTML = '&#8203;';
            startNode.classList.add('removeList');
            this.commonLIParent.parentElement.insertBefore(currentElem, this.commonLIParent);
        }
    };
    Lists.prototype.isAtListStart = function (startNode, range) {
        if (startNode.nodeName !== 'LI') {
            return false;
        }
        var listItem = startNode;
        var firstTextNode = this.getFirstTextNode(listItem);
        return firstTextNode === range.startContainer && range.startOffset === 0;
    };
    Lists.prototype.getFirstTextNode = function (element) {
        if (element.nodeType === Node.TEXT_NODE) {
            return element;
        }
        for (var i = 0; i < element.childNodes.length; i++) {
            var firstTextNode = this.getFirstTextNode(element.childNodes[i]);
            if (firstTextNode) {
                return firstTextNode;
            }
        }
        return null;
    };
    Lists.prototype.keyDownHandler = function (e) {
        if (e.event.which === 13) {
            this.enterList(e);
        }
        if (e.event.which === 32) {
            this.spaceList(e);
        }
        if (e.event.which === 8) {
            this.backspaceList(e);
        }
        if ((e.event.which === 46 && e.event.action === 'delete')) {
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            var commonAncestor = range.commonAncestorContainer;
            var startEle = range.startContainer;
            var endEle = range.endContainer;
            var startNode = startEle.nodeType === 3 ? this.domNode.blockParentNode(startEle) : startEle;
            var endNode = endEle.nodeType === 3 ? this.domNode.blockParentNode(endEle) : endEle;
            if ((commonAncestor.nodeName === 'UL' || commonAncestor.nodeName === 'OL') && startNode !== endNode
                && (!isNullOrUndefined(closest(startNode, 'ul')) || !isNullOrUndefined(closest(startNode, 'ol')))
                && (!isNullOrUndefined(closest(endNode, 'ul')) || !isNullOrUndefined(closest(endNode, 'ol')))
                && ((commonAncestor.lastElementChild === closest(endNode, 'li') && commonAncestor.lastChild !== endNode)) && !range.collapsed) {
                if (this.areAllListItemsSelected(commonAncestor, range)) {
                    detach(commonAncestor);
                }
            }
            this.removeList(range, e);
        }
        if (e.event.which === 9) {
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            if (!(e.event.action && e.event.action === 'indent')) {
                this.saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
            }
            if (e.enableTabKey) {
                this.handleListIndentation();
            }
            var blockNodes = void 0;
            var startOffset = range.startOffset;
            var endOffset = range.endOffset;
            var startNode = this.parent.domNode.getSelectedNode(range.startContainer, range.startOffset);
            var endNode = this.parent.domNode.getSelectedNode(range.endContainer, range.endOffset);
            if ((startNode === endNode && (startNode.nodeName === 'BR' || startNode.nodeName === '#text') &&
                CONSTANT.IGNORE_BLOCK_TAGS.indexOf(startNode.parentNode.tagName.toLocaleLowerCase()) >= 0)) {
                return;
            }
            else {
                if (!(e.event.action && (e.event.action === 'indent')) && !this.listTabIndentation) {
                    this.domNode.setMarker(this.saveSelection);
                }
                blockNodes = this.domNode.blockNodes();
            }
            var nodes = [];
            var isNested = true;
            for (var i = 0; i < blockNodes.length; i++) {
                if (blockNodes[i].parentNode.tagName === 'LI') {
                    nodes.push(blockNodes[i].parentNode);
                }
                else if (!closest(blockNodes[i], 'OL') && !closest(blockNodes[i], 'UL') && closest(blockNodes[i], 'LI')) {
                    nodes.push(closest(blockNodes[i], 'LI'));
                }
                else if (blockNodes[i].tagName === 'LI' && blockNodes[i].childNodes[0].tagName !== 'P' &&
                    (blockNodes[i].childNodes[0].tagName !== 'OL' &&
                        blockNodes[i].childNodes[0].tagName !== 'UL')) {
                    nodes.push(blockNodes[i]);
                }
            }
            if (nodes.length > 1 || nodes.length === 1) {
                e.event.preventDefault();
                e.event.stopPropagation();
                this.currentAction = this.getAction(nodes[0]);
                if (e.event.shiftKey && (!e.enableTabKey || (e.enableTabKey && !this.listTabIndentation))) {
                    this.revertList(nodes, e);
                    this.revertClean();
                }
                else if (!e.enableTabKey || (e.enableTabKey && !this.listTabIndentation)) {
                    isNested = this.nestedList(nodes);
                }
                if (isNested) {
                    this.cleanNode();
                    this.parent.editableElement.focus({ preventScroll: true });
                }
                if (!(e.event.action && (e.event.action === 'indent')) && !this.listTabIndentation) {
                    this.saveSelection = this.domNode.saveMarker(this.saveSelection);
                    this.saveSelection.restore();
                    if (e.callBack) {
                        e.callBack({
                            requestType: this.currentAction,
                            editorMode: 'HTML',
                            range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                            elements: this.parent.domNode.blockNodes(),
                            event: e.event
                        });
                    }
                }
            }
            else {
                if (!(e.event.action && (e.event.action === 'indent')) && !this.listTabIndentation) {
                    if (e.event && e.event.shiftKey && e.event.key === 'Tab') {
                        e.event.action = 'tab';
                    }
                    this.saveSelection = this.domNode.saveMarker(this.saveSelection);
                    this.saveSelection.restore();
                }
            }
            this.listTabIndentation = false;
        }
        else {
            switch (e.event.action) {
                case 'ordered-list':
                    this.applyListsHandler({ subCommand: 'OL', callBack: e.callBack });
                    e.event.preventDefault();
                    break;
                case 'unordered-list':
                    this.applyListsHandler({ subCommand: 'UL', callBack: e.callBack });
                    e.event.preventDefault();
                    break;
            }
        }
    };
    Lists.prototype.handleListIndentation = function () {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var parentNodeList = this.saveSelection.getParentNodeCollection(range);
        if ((parentNodeList[0].nodeName === 'LI' || closest(parentNodeList[0], 'li'))
            && !this.isCursorAtStartOfLI(range)) {
            var startParentNode = parentNodeList[parentNodeList.length - 1];
            var endParentNode = parentNodeList[0];
            var startElementTextNode = range.startContainer;
            if (startParentNode && endParentNode) {
                range.deleteContents();
                if (startParentNode !== endParentNode) {
                    var currentBlockNode = startElementTextNode;
                    while (currentBlockNode.parentElement) {
                        if (this.parent.domNode.isBlockNode(currentBlockNode.parentElement)) {
                            currentBlockNode = currentBlockNode.parentElement;
                            break;
                        }
                        currentBlockNode = currentBlockNode.parentElement;
                    }
                    var cursorPosition = void 0;
                    var tabSpaceHTML = '&nbsp;&nbsp;&nbsp;&nbsp;<span class="rte-tab-space"></span>';
                    if (this.parent.domNode.isBlockNode(startParentNode.lastChild)) {
                        startElementTextNode.nodeValue += '\u00A0\u00A0\u00A0\u00A0';
                        cursorPosition = startElementTextNode.nodeValue.length;
                    }
                    else {
                        startParentNode.innerHTML += tabSpaceHTML;
                    }
                    var listItemFirstChild = endParentNode.firstChild;
                    if (listItemFirstChild && this.parent.domNode.isBlockNode(listItemFirstChild)) {
                        while (listItemFirstChild.firstChild) {
                            currentBlockNode.appendChild(listItemFirstChild.firstChild);
                        }
                        listItemFirstChild.remove();
                    }
                    while (endParentNode.firstChild) {
                        if (this.parent.domNode.isBlockNode(endParentNode.firstChild)) {
                            this.parent.domNode.insertAfter(endParentNode.firstChild, currentBlockNode);
                        }
                        else {
                            startParentNode.appendChild(endParentNode.firstChild);
                        }
                    }
                    endParentNode.remove();
                    var tabSpanElement = startParentNode.querySelector('.rte-tab-space');
                    if (tabSpanElement && tabSpanElement.previousSibling) {
                        this.saveSelection.setCursorPoint(this.parent.currentDocument, tabSpanElement.previousSibling, tabSpanElement.previousSibling.textContent.length);
                        tabSpanElement.parentNode.removeChild(tabSpanElement);
                    }
                    else {
                        this.saveSelection.setCursorPoint(this.parent.currentDocument, startElementTextNode, cursorPosition);
                    }
                }
                else {
                    InsertHtml.Insert(this.parent.currentDocument, '&nbsp;&nbsp;&nbsp;&nbsp;');
                }
                this.listTabIndentation = true;
            }
        }
    };
    Lists.prototype.isCursorAtStartOfLI = function (range) {
        var node = range.startContainer;
        while (node && node.nodeName !== 'LI') {
            node = node.parentNode;
        }
        if (!node) {
            return false;
        }
        var tempRange = range.cloneRange();
        tempRange.selectNodeContents(node);
        tempRange.setEnd(range.startContainer, range.startOffset);
        return tempRange.toString().trim() === '';
    };
    Lists.prototype.spaceKeyAction = function (e) {
        if (e.event.which === 32) {
            this.spaceList(e);
        }
    };
    Lists.prototype.getAction = function (element) {
        var parentNode = element.parentNode;
        return (parentNode.nodeName === 'OL' ? 'OL' : 'UL');
    };
    Lists.prototype.revertClean = function () {
        var collectionNodes = this.parent.editableElement.querySelectorAll('ul, ol');
        for (var i = 0; i < collectionNodes.length; i++) {
            var listNodes = collectionNodes[i].querySelectorAll('ul, ol');
            if (listNodes.length > 0) {
                for (var j = 0; j < listNodes.length; j++) {
                    var prevSibling = listNodes[j].previousSibling;
                    if (prevSibling && prevSibling.tagName === 'LI') {
                        prevSibling.appendChild(listNodes[j]);
                    }
                }
            }
        }
    };
    Lists.prototype.noPreviousElement = function (elements) {
        var firstNode;
        var firstNodeOL;
        var siblingListOL = elements.querySelectorAll('ol, ul');
        var siblingListLI = elements
            .querySelectorAll('li');
        var siblingListLIFirst = this.domNode.contents(siblingListLI[0])[0];
        if (siblingListLI.length > 0 && (siblingListOL.length <= 1 || siblingListOL[0].childNodes.length > 1) && (siblingListLIFirst.nodeName === 'OL' || siblingListLIFirst.nodeName === 'UL')) {
            firstNode = siblingListLI[0];
        }
        else {
            firstNodeOL = siblingListOL[0];
        }
        if (firstNode) {
            for (var h = this.domNode.contents(elements)[0]; h && !this.domNode.isList(h); null) {
                var nextSibling = h.nextSibling;
                prepend([h], firstNode);
                setStyleAttribute(elements, { 'list-style-type': 'none' });
                setStyleAttribute(firstNode, { 'list-style-type': '' });
                h = nextSibling;
            }
        }
        else if (firstNodeOL) {
            var nestedElement = createElement('li');
            prepend([nestedElement], firstNodeOL);
            for (var h = this.domNode.contents(elements)[0]; h && !this.domNode.isList(h); null) {
                var nextSibling = h.nextSibling;
                nestedElement.appendChild(h);
                h = nextSibling;
            }
            prepend([firstNodeOL], elements.parentNode);
            detach(elements);
            var nestedElementLI = createElement('li', { styles: 'list-style-type: none;' });
            prepend([nestedElementLI], firstNodeOL.parentNode);
            append([firstNodeOL], nestedElementLI);
        }
        else {
            var nestedElementLI = createElement('li', { styles: 'list-style-type: none;' });
            prepend([nestedElementLI], elements.parentNode);
            var nestedElement = createElement(elements.parentNode.tagName);
            prepend([nestedElement], nestedElementLI);
            append([elements], nestedElement);
        }
    };
    Lists.prototype.nestedList = function (elements) {
        var isNested = false;
        for (var i = 0; i < elements.length; i++) {
            var prevSibling = this.domNode.getPreviousNode(elements[i]);
            if (prevSibling) {
                isNested = true;
                var firstNode = void 0;
                var firstNodeLI = void 0;
                var siblingListOL = elements[i].querySelectorAll('ol, ul');
                var siblingListLI = elements[i]
                    .querySelectorAll('li');
                var siblingListLIFirst = this.domNode.contents(siblingListLI[0])[0];
                if (siblingListLI.length > 0 && (siblingListOL.length <= 1 || siblingListOL[0].childNodes.length > 1) && (siblingListLIFirst.nodeName === 'OL' || siblingListLIFirst.nodeName === 'UL')) {
                    firstNodeLI = siblingListLI[0];
                }
                else {
                    firstNode = siblingListOL[0];
                }
                if (firstNode) {
                    var nestedElement = createElement('li');
                    prepend([nestedElement], firstNode);
                    for (var h = this.domNode.contents(elements[i])[0]; h && !this.domNode.isList(h); null) {
                        var nextSibling = h.nextSibling;
                        nestedElement.appendChild(h);
                        h = nextSibling;
                    }
                    append([firstNode], prevSibling);
                    detach(elements[i]);
                }
                else if (firstNodeLI) {
                    if (prevSibling.tagName === 'LI') {
                        for (var h = this.domNode.contents(elements[i])[0]; h && !this.domNode.isList(h); null) {
                            var nextSibling = h.nextSibling;
                            prepend([h], firstNodeLI);
                            setStyleAttribute(elements[i], { 'list-style-type': 'none' });
                            setStyleAttribute(firstNodeLI, { 'list-style-type': '' });
                            h = nextSibling;
                        }
                        append([firstNodeLI.parentNode], prevSibling);
                        detach(elements[i]);
                    }
                }
                else {
                    if (prevSibling.tagName === 'LI') {
                        var nestedElement = createElement(elements[i].parentNode.tagName);
                        nestedElement.style.listStyleType =
                            elements[i].parentNode.style.listStyleType;
                        append([nestedElement], prevSibling);
                        append([elements[i]], nestedElement);
                    }
                    else if (prevSibling.tagName === 'OL' || prevSibling.tagName === 'UL') {
                        append([elements[i]], prevSibling);
                    }
                }
            }
            else {
                var element = elements[i];
                isNested = true;
                this.noPreviousElement(element);
            }
        }
        return isNested;
    };
    Lists.prototype.isCursorBeforeTable = function (range) {
        return range.startOffset === range.endOffset &&
            range.startContainer.childNodes.length > 0 && !isNOU(range.startContainer.childNodes[range.startOffset]) &&
            range.startContainer.childNodes[range.startOffset].nodeName === 'TABLE';
    };
    Lists.prototype.isCursorAtEndOfTable = function (range) {
        return (range.startOffset === range.endOffset &&
            range.startContainer.childNodes.length > 0 && !isNOU(range.startContainer.childNodes[range.startOffset - 1]) &&
            range.startContainer.childNodes[range.startOffset - 1].nodeName === 'TABLE');
    };
    Lists.prototype.isListItemWithTableChild = function (node) {
        return node.nodeName === 'LI' && !isNOU(node.firstChild) &&
            node.firstChild.nodeName === 'TABLE';
    };
    Lists.prototype.applyListsHandler = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        if (Browser.userAgent.indexOf('Firefox') !== -1 && range.startContainer === range.endContainer && range.startContainer === this.parent.editableElement) {
            var startChildNodes = range.startContainer.childNodes;
            var startNode = ((startChildNodes[(range.startOffset > 0) ? (range.startOffset - 1) :
                range.startOffset]) || range.startContainer);
            var endNode = (range.endContainer.childNodes[(range.endOffset > 0) ? (range.endOffset - 1) :
                range.endOffset] || range.endContainer);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            var lastSelectionNode = endNode.lastChild.nodeName === 'BR' ? (isNOU(endNode.lastChild.previousSibling) ? endNode
                : endNode.lastChild.previousSibling) : endNode.lastChild;
            while (!isNOU(lastSelectionNode) && lastSelectionNode.nodeName !== '#text' && lastSelectionNode.nodeName !== 'IMG' &&
                lastSelectionNode.nodeName !== 'BR' && lastSelectionNode.nodeName !== 'HR') {
                lastSelectionNode = lastSelectionNode.lastChild;
            }
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startNode, lastSelectionNode, 0, lastSelectionNode.textContent.length);
            range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        }
        if (range.startContainer === range.endContainer && range.startContainer === this.parent.editableElement &&
            range.startOffset === range.endOffset && range.startOffset === 0 &&
            this.parent.editableElement.textContent.length === 0 && (this.parent.editableElement.childNodes[0].nodeName !== 'TABLE' &&
            this.parent.editableElement.childNodes[0].nodeName !== 'IMG')) {
            var focusNode = range.startContainer.childNodes[0];
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, focusNode, focusNode, 0, 0);
            range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        }
        this.saveSelection = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        this.currentAction = e.subCommand;
        this.currentAction = e.subCommand = this.currentAction === 'NumberFormatList' ? 'OL' : this.currentAction === 'BulletFormatList' ? 'UL' : this.currentAction;
        this.domNode.setMarker(this.saveSelection);
        var listsNodes = this.domNode.blockNodes(true);
        if (e.enterAction === 'BR') {
            if (this.isCursorBeforeTable(range)) {
                listsNodes = [range.startContainer.childNodes[range.startOffset]];
            }
            else if (this.isCursorAtEndOfTable(range)) {
                listsNodes = [range.startContainer.childNodes[range.startOffset - 1]];
            }
            else if (listsNodes.length === 1 && this.isListItemWithTableChild(listsNodes[0])) {
                listsNodes[0] = listsNodes[0].firstChild;
            }
            else {
                this.setSelectionBRConfig();
                this.parent.domNode.convertToBlockNodes(this.parent.domNode.blockNodes(), true);
                this.setSelectionBRConfig();
                listsNodes = this.parent.domNode.blockNodes();
            }
        }
        for (var i = 0; i < listsNodes.length; i++) {
            if (listsNodes[i].tagName === 'TABLE' && !range.collapsed) {
                listsNodes.splice(i, 1);
            }
            if (listsNodes.length > 0 && listsNodes[i].tagName !== 'LI'
                && 'LI' === listsNodes[i].parentNode.tagName) {
                listsNodes[i] = listsNodes[i].parentNode;
            }
        }
        this.applyLists(listsNodes, this.currentAction, e.selector, e.item, e);
        if (e.callBack) {
            e.callBack({
                requestType: this.currentAction,
                event: e.event,
                editorMode: 'HTML',
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.domNode.blockNodes()
            });
        }
    };
    Lists.prototype.setSelectionBRConfig = function () {
        var startElem = this.parent.editableElement.querySelector('.' + markerClassName.startSelection);
        var endElem = this.parent.editableElement.querySelector('.' + markerClassName.endSelection);
        if (isNOU(endElem)) {
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, startElem, 0);
        }
        else {
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startElem, endElem, 0, 0);
        }
    };
    Lists.prototype.applyLists = function (elements, type, selector, item, e) {
        var isReverse = true;
        if (this.isRevert(elements, type, item) && isNOU(item)) {
            this.revertList(elements, e);
            this.removeEmptyListElements();
        }
        else {
            this.checkLists(elements, type, item);
            var marginLeftAttribute = '';
            if (elements[0].style.marginLeft !== '') {
                marginLeftAttribute = ' style = "margin-left: ' + elements[0].style.marginLeft + ';"';
            }
            for (var i = 0; i < elements.length; i++) {
                if (!isNOU(item) && !isNOU(item.listStyle)) {
                    if (item.listStyle === 'listImage') {
                        setStyleAttribute(elements[i], { 'list-style-image': item.listImage });
                    }
                    else {
                        setStyleAttribute(elements[i], { 'list-style-image': 'none' });
                        setStyleAttribute(elements[i], { 'list-style-type': item.listStyle.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() });
                    }
                }
                elements[i].style.removeProperty('margin-left');
                var elemAtt = elements[i].tagName === 'IMG' || elements[i].classList.contains('e-editor-select-start') ? '' : this.domNode.attributes(elements[i]);
                if (elements[i].getAttribute('contenteditable') === 'true'
                    && elements[i].childNodes.length === 1 && elements[i].childNodes[0].nodeName === 'TABLE') {
                    var listEle = document.createElement(type);
                    listEle.innerHTML = '<li><br/></li>';
                    elements[i].appendChild(listEle);
                }
                else if ('LI' !== elements[i].tagName && isNOU(item) &&
                    elements[i].nodeName === 'BLOCKQUOTE') {
                    isReverse = false;
                    var openTag = '<' + type + marginLeftAttribute + '>';
                    var closeTag = '</' + type + '>';
                    var newTag = 'li' + elemAtt;
                    var replaceHTML = elements[i].innerHTML;
                    var innerHTML = this.domNode.createTagString(newTag, null, replaceHTML);
                    var collectionString = openTag + innerHTML + closeTag;
                    elements[i].innerHTML = collectionString;
                }
                else if ('LI' !== elements[i].tagName && isNOU(item)) {
                    isReverse = false;
                    var openTag = '<' + type + marginLeftAttribute + '>';
                    var closeTag = '</' + type + '>';
                    var newTag = 'li' + elemAtt;
                    var replaceHTML = (elements[i].tagName.toLowerCase() === CONSTANT.DEFAULT_TAG ?
                        elements[i].innerHTML : elements[i].outerHTML);
                    var innerHTML = this.domNode.createTagString(newTag, null, replaceHTML);
                    innerHTML = this.setStyle(innerHTML);
                    var collectionString = openTag + innerHTML + closeTag;
                    this.domNode.replaceWith(elements[i], collectionString);
                }
                else if (!isNOU(item) && 'LI' !== elements[i].tagName) {
                    // eslint-disable-next-line
                    isReverse = false;
                    var currentElemAtt = elements[i].tagName === 'IMG' ? '' : this.domNode.attributes(elements[i]);
                    var openTag = '<' + type + currentElemAtt + '>';
                    var closeTag = '</' + type + '>';
                    var newTag = 'li';
                    var replaceHTML = (elements[i].tagName.toLowerCase() === CONSTANT.DEFAULT_TAG ?
                        elements[i].innerHTML : elements[i].outerHTML);
                    var innerHTML = this.domNode.createTagString(newTag, null, replaceHTML);
                    var collectionString = openTag + innerHTML + closeTag;
                    this.domNode.replaceWith(elements[i], collectionString);
                }
            }
        }
        this.cleanNode();
        if (e.enterAction === 'BR') {
            var spansToRemove = document.querySelectorAll('span#removeSpan');
            spansToRemove.forEach(function (span) {
                var fragment = document.createDocumentFragment();
                while (span.firstChild) {
                    fragment.appendChild(span.firstChild);
                }
                span.parentNode.replaceChild(fragment, span);
            });
        }
        this.parent.editableElement.focus({ preventScroll: true });
        if (isIDevice()) {
            setEditFrameFocus(this.parent.editableElement, selector);
        }
        this.saveSelection = this.domNode.saveMarker(this.saveSelection);
        this.saveSelection.restore();
    };
    Lists.prototype.setStyle = function (innerHTML) {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = innerHTML.trim(); // Convert string to DOM elements
        var liElement = tempDiv.querySelector('li');
        var styleElement = liElement;
        if (liElement && liElement.children.length === 1) {
            var _loop_2 = function () {
                var childElement = liElement.firstChild;
                if (childElement && (childElement.style.cssText || childElement.tagName.toUpperCase() === 'B' || childElement.tagName.toUpperCase() === 'STRONG' || childElement.tagName.toUpperCase() === 'I' || childElement.tagName.toUpperCase() === 'EM')) {
                    // Extract styles, filter out background-color, and merge
                    var allowedStyles_1 = ['font-size', 'font-family', 'color', 'font-weight'];
                    var filteredStyles = childElement.style.cssText.split(';')
                        .map(function (style) { return style.trim(); })
                        .filter(function (style) {
                        var styleName = !isNOU(style.split(':')[0]) ? style.split(':')[0].trim() : '';
                        return styleName && allowedStyles_1.indexOf(styleName) !== -1;
                    })
                        .join(';');
                    if (filteredStyles) {
                        styleElement.style.cssText += (styleElement.style.cssText ? ';' : '') + filteredStyles;
                    }
                    else if (childElement.tagName.toUpperCase() === 'B' || childElement.tagName.toUpperCase() === 'STRONG') {
                        filteredStyles = 'font-weight: bold;';
                        styleElement.style.cssText += (styleElement.style.cssText ? ';' : '') + filteredStyles;
                    }
                    else if (childElement.tagName.toUpperCase() === 'I' || childElement.tagName.toUpperCase() === 'EM') {
                        filteredStyles = 'font-style: italic;';
                        styleElement.style.cssText += (styleElement.style.cssText ? ';' : '') + filteredStyles;
                    }
                }
                liElement = childElement;
            };
            while (liElement && liElement.children.length === 1 && liElement.firstChild &&
                liElement.firstChild.nodeType !== Node.TEXT_NODE) {
                _loop_2();
            }
            innerHTML = tempDiv.innerHTML;
        }
        return innerHTML;
    };
    Lists.prototype.removeEmptyListElements = function () {
        var listElem = this.parent.editableElement.querySelectorAll('ol, ul');
        for (var i = 0; i < listElem.length; i++) {
            if (listElem[i].textContent.trim() === '') {
                detach(listElem[i]);
            }
        }
    };
    Lists.prototype.isRevert = function (nodes, tagName, item) {
        var isRevert = true;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].tagName !== 'LI') {
                return false;
            }
            if (nodes[i].parentNode.tagName !== tagName ||
                isNOU(item) && nodes[i].parentNode.style.listStyleType !== '') {
                isRevert = false;
            }
            if (nodes[i].parentNode.tagName === tagName && nodes[i].parentNode.style.listStyleType !== '') {
                isRevert = true;
            }
        }
        return isRevert;
    };
    Lists.prototype.checkLists = function (nodes, tagName, item) {
        var nodesTemp = [];
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i].parentNode;
            if (!isNOU(item) && 'LI' === nodes[i].tagName && !isNOU(item.listStyle)) {
                if (item.listStyle === 'listImage') {
                    setStyleAttribute(node, { 'list-style-image': item.listImage });
                }
                else {
                    setStyleAttribute(node, { 'list-style-image': 'none' });
                    setStyleAttribute(node, { 'list-style-type': item.listStyle.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() });
                }
            }
            if ((nodes[i].tagName === 'LI' && node.tagName !== tagName && nodesTemp.indexOf(node) < 0) ||
                (nodes[i].tagName === 'LI' && node.tagName === tagName && nodesTemp.indexOf(node) < 0 && item !== null)) {
                nodesTemp.push(node);
            }
            if (isNOU(item) && (node.tagName === tagName ||
                ((node.tagName === 'UL' || node.tagName === 'OL') && node.hasAttribute('style')))) {
                if (node.hasAttribute('style')) {
                    node.removeAttribute('style');
                }
            }
        }
        for (var j = nodesTemp.length - 1; j >= 0; j--) {
            var h = nodesTemp[j];
            var replace = '<' + tagName.toLowerCase() + ' '
                + this.domNode.attributes(h) + '>' + h.innerHTML + '</' + tagName.toLowerCase() + '>';
            this.domNode.replaceWith(nodesTemp[j], replace);
        }
    };
    Lists.prototype.cleanNode = function () {
        var liParents = this.parent.editableElement.querySelectorAll('ol + ol, ul + ul');
        var listStyleType;
        var firstNodeOL;
        for (var c = 0; c < liParents.length; c++) {
            var node = liParents[c];
            var toFindtopOlUl = true;
            var containsListElements = node;
            while (containsListElements.parentElement) {
                if (containsListElements.parentElement && containsListElements.parentElement.tagName !== 'LI' && containsListElements.parentElement.tagName !== 'OL' && containsListElements.parentElement.tagName !== 'UL') {
                    break;
                }
                containsListElements = containsListElements.parentElement;
            }
            if (toFindtopOlUl && (liParents[c].parentElement.parentElement.nodeName === 'OL' || liParents[c].parentElement.parentElement.nodeName === 'UL')) {
                toFindtopOlUl = false;
                var preElement = liParents[c].parentElement.parentElement;
                listStyleType = preElement.style.listStyleType;
                firstNodeOL = node.previousElementSibling;
            }
            if (this.domNode.isList(node.previousElementSibling) &&
                this.domNode.openTagString(node) === this.domNode.openTagString(node.previousElementSibling)) {
                var contentNodes = this.domNode.contents(node);
                for (var f = 0; f < contentNodes.length; f++) {
                    node.previousElementSibling.appendChild(contentNodes[f]);
                }
                node.parentNode.removeChild(node);
            }
            else if (!isNOU(node.getAttribute('level'))) {
                if (node.tagName === node.previousElementSibling.tagName) {
                    node.previousElementSibling.lastChild.append(node);
                }
            }
            else if (this.domNode.isList(node.previousElementSibling) && containsListElements.contains(node.previousElementSibling) && ((node.tagName === 'OL' || node.tagName === 'UL') && (node.previousElementSibling.nodeName === 'OL' || node.previousElementSibling.nodeName === 'UL'))) {
                var contentNodes = this.domNode.contents(node);
                for (var f = 0; f < contentNodes.length; f++) {
                    node.previousElementSibling.appendChild(contentNodes[f]);
                }
                node.parentNode.removeChild(node);
            }
        }
        if (firstNodeOL) {
            firstNodeOL.style.listStyleType = listStyleType;
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            var listOlUlElements = [];
            if (range.commonAncestorContainer.nodeName === 'UL' || range.commonAncestorContainer.nodeName === 'OL') {
                if (range.commonAncestorContainer instanceof Element) {
                    listOlUlElements.push(range.commonAncestorContainer);
                }
                listOlUlElements = listOlUlElements.concat(Array.from(range.commonAncestorContainer.querySelectorAll('ol, ul')));
            }
            else {
                listOlUlElements = Array.from(range.commonAncestorContainer.querySelectorAll('ol, ul'));
            }
            for (var k = 0; k < listOlUlElements.length; k++) {
                var listStyle = void 0;
                var listElements = listOlUlElements[k];
                while (listElements) {
                    if (listElements.nodeName === 'OL' || listElements.nodeName === 'OL') {
                        if (listElements.style.listStyleType !== '' && listElements.style.listStyleType !== 'none' && listElements.nodeName !== 'LI') {
                            listStyle = listElements.style.listStyleType;
                        }
                        else if (!isNOU(listStyle) && (listElements.style.listStyleType === '' || listElements.style.listStyleType === 'none') &&
                            listElements.nodeName !== 'LI' && (listElements.nodeName === 'UL' || listElements.nodeName === 'OL')) {
                            listElements.style.listStyleType = listStyle;
                        }
                    }
                    listElements = listElements.querySelector('UL,OL');
                }
            }
        }
    };
    Lists.prototype.findUnSelected = function (temp, elements) {
        temp = temp.slice().reverse();
        if (temp.length > 0) {
            var rightIndent = [];
            var indentElements = [];
            var lastElement = elements[elements.length - 1];
            var lastElementChild = [];
            var childElements = [];
            lastElementChild = (lastElement.childNodes);
            for (var z = 0; z < lastElementChild.length; z++) {
                if (lastElementChild[z].tagName === 'OL' || lastElementChild[z].tagName === 'UL') {
                    var childLI = lastElementChild[z]
                        .querySelectorAll('li');
                    if (childLI.length > 0) {
                        for (var y = 0; y < childLI.length; y++) {
                            childElements.push(childLI[y]);
                        }
                    }
                }
            }
            for (var i = 0; i < childElements.length; i++) {
                var count = 0;
                for (var j = 0; j < temp.length; j++) {
                    if (!childElements[i].contains((temp[j]))) {
                        count = count + 1;
                    }
                }
                if (count === temp.length) {
                    indentElements.push(childElements[i]);
                }
            }
            if (indentElements.length > 0) {
                for (var x = 0; x < indentElements.length; x++) {
                    if (this.domNode.contents(indentElements[x])[0].nodeName !== 'OL' &&
                        this.domNode.contents(indentElements[x])[0].nodeName !== 'UL') {
                        rightIndent.push(indentElements[x]);
                    }
                }
            }
            if (rightIndent.length > 0) {
                this.nestedList(rightIndent);
            }
        }
    };
    Lists.prototype.revertList = function (elements, e) {
        var temp = [];
        for (var i = elements.length - 1; i >= 0; i--) {
            for (var j = i - 1; j >= 0; j--) {
                if (elements[j].contains((elements[i])) || elements[j] === elements[i]) {
                    temp.push(elements[i]);
                    elements.splice(i, 1);
                    break;
                }
            }
        }
        this.findUnSelected(temp, elements);
        var viewNode = [];
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            if (this.domNode.contents(element)[0].nodeType === 3 && this.domNode.contents(element)[0].textContent.trim().length === 0) {
                detach(this.domNode.contents(element)[0]);
            }
            var parentNode = elements[i].parentNode;
            var className = element.getAttribute('class');
            if (temp.length === 0) {
                var siblingList = elements[i].querySelectorAll('ul, ol');
                var firstNode = siblingList[0];
                if (firstNode) {
                    var child = firstNode
                        .querySelectorAll('li');
                    if (child) {
                        var nestedElement = createElement(firstNode.tagName);
                        append([nestedElement], firstNode.parentNode);
                        var nestedElementLI = createElement('li', { styles: 'list-style-type: none;' });
                        append([nestedElementLI], nestedElement);
                        append([firstNode], nestedElementLI);
                    }
                }
            }
            if (element.parentNode.insertBefore(this.closeTag(parentNode.tagName), element),
                'LI' === parentNode.parentNode.tagName || 'OL' === parentNode.parentNode.tagName ||
                    'UL' === parentNode.parentNode.tagName) {
                element.parentNode.insertBefore(this.closeTag('LI'), element);
            }
            else {
                var classAttr = '';
                if (className) {
                    // eslint-disable-next-line
                    classAttr += ' class="' + className + '"';
                }
                var closestListMargin = this.getClosestListParentMargin(element);
                if (CONSTANT.DEFAULT_TAG && 0 === element.querySelectorAll(CONSTANT.BLOCK_TAGS.join(', ')).length) {
                    var wrapperclass = isNullOrUndefined(className) ? ' class="e-rte-wrap-inner"' :
                        ' class="' + className + ' e-rte-wrap-inner"';
                    var parentElement = parentNode;
                    if (elements.length === parentElement.querySelectorAll('li').length) {
                        if (!isNOU(parentElement.style.listStyleType)) {
                            parentNode.style.removeProperty('list-style-type');
                        }
                        if (!isNOU(parentElement.style.listStyleImage)) {
                            parentNode.style.removeProperty('list-style-image');
                        }
                        if (parentElement.style.length === 0) {
                            parentNode.removeAttribute('style');
                        }
                    }
                    var wrapperTag = isNullOrUndefined(e.enterAction) ? CONSTANT.DEFAULT_TAG : e.enterAction;
                    var wrapper = '<' + wrapperTag + wrapperclass + this.domNode.attributes(element) + '></' + wrapperTag + '>';
                    var tempElement = document.createElement('div');
                    tempElement.innerHTML = wrapper;
                    if (closestListMargin !== '') {
                        tempElement.firstElementChild.style.marginLeft = closestListMargin;
                    }
                    if (e.enterAction !== 'BR') {
                        this.domNode.wrapInner(element, this.domNode.parseHTMLFragment(tempElement.innerHTML));
                    }
                    else {
                        var wrapperSpan = '<span class=e-rte-wrap-inner id=removeSpan></span>';
                        var br = document.createElement('br');
                        this.domNode.wrapInner(element, this.domNode.parseHTMLFragment(wrapperSpan));
                        element.appendChild(br);
                    }
                }
                else if (this.domNode.contents(element)[0].nodeType === 3) {
                    var replace = this.domNode.createTagString(CONSTANT.DEFAULT_TAG, parentNode, this.parent.domNode.encode(this.domNode.contents(element)[0].textContent));
                    this.domNode.replaceWith(this.domNode.contents(element)[0], replace);
                }
                else if (this.domNode.contents(element)[0].classList.contains(markerClassName.startSelection) ||
                    this.domNode.contents(element)[0].classList.contains(markerClassName.endSelection)) {
                    var replace = this.domNode.createTagString(CONSTANT.DEFAULT_TAG, parentNode, '<br>' + this.domNode.contents(element)[0].outerHTML);
                    if (this.domNode.contents(element)[1] && this.domNode.contents(element)[1].tagName === 'BR') {
                        this.domNode.contents(element)[1].remove();
                        replace = this.domNode.createTagString(CONSTANT.DEFAULT_TAG, parentNode, '<br>' + this.domNode.contents(element)[0].outerHTML);
                    }
                    else {
                        replace = this.domNode.createTagString(CONSTANT.DEFAULT_TAG, parentNode, this.domNode.contents(element)[0].outerHTML);
                    }
                    this.domNode.replaceWith(this.domNode.contents(element)[0], replace);
                }
                else {
                    var childNode = element.firstChild;
                    if (childNode) {
                        var attributes_1 = element.parentElement.attributes;
                        if (attributes_1.length > 0) {
                            for (var d = 0; d < attributes_1.length; d++) {
                                var e_1 = attributes_1[d];
                                var clean = function (v) {
                                    return v ? v.split(';').filter(function (s) { return !/list-style-(image|type):/.test(s.trim()); }).join(';').trim() : '';
                                };
                                var existingValue = clean(childNode.getAttribute(e_1.nodeName));
                                var parentValue = clean(element.parentElement.getAttribute(e_1.nodeName));
                                if (existingValue && existingValue !== parentValue) {
                                    childNode.setAttribute(e_1.nodeName, existingValue ? parentValue + ' ' + existingValue : parentValue);
                                }
                                else {
                                    childNode.setAttribute(e_1.nodeName, parentValue);
                                }
                                if (childNode.style.length === 0) {
                                    childNode.removeAttribute('style');
                                }
                            }
                        }
                    }
                    className = childNode.getAttribute('class');
                    if (className && childNode.getAttribute('class') && className !== childNode.getAttribute('class')) {
                        attributes(childNode, { 'class': className + ' ' + childNode.getAttribute('class') });
                    }
                }
                append([this.openTag('LI')], element);
                prepend([this.closeTag('LI')], element);
            }
            this.domNode.insertAfter(this.openTag(parentNode.tagName), element);
            if (parentNode.parentNode.tagName === 'LI') {
                parentNode = parentNode.parentNode.parentNode;
            }
            if (viewNode.indexOf(parentNode) < 0) {
                viewNode.push(parentNode);
            }
        }
        for (var i = 0; i < viewNode.length; i++) {
            var node = viewNode[i];
            var nodeInnerHtml = node.innerHTML;
            var closeTag = /<span class="e-rte-list-close-([a-z]*)"><\/span>/g;
            var openTag = /<span class="e-rte-list-open-([a-z]*)"><\/span>/g;
            nodeInnerHtml = nodeInnerHtml.replace(closeTag, '</$1>');
            nodeInnerHtml = nodeInnerHtml.replace(openTag, '<$1 ' + this.domNode.attributes(node) + '>');
            this.domNode.replaceWith(node, this.domNode.openTagString(node) + nodeInnerHtml.trim() + this.domNode.closeTagString(node));
        }
        var emptyUl = this.parent.editableElement.querySelectorAll('ul:empty, ol:empty');
        for (var i = 0; i < emptyUl.length; i++) {
            detach(emptyUl[i]);
        }
        var emptyLi = this.parent.editableElement.querySelectorAll('li:empty');
        for (var i = 0; i < emptyLi.length; i++) {
            detach(emptyLi[i]);
        }
    };
    Lists.prototype.getClosestListParentMargin = function (element) {
        var current = element;
        while (current && current !== this.parent.editableElement) {
            if (current.nodeName === 'UL' || current.nodeName === 'OL') {
                return current.style.marginLeft;
            }
            current = current.parentElement;
        }
        return '';
    };
    Lists.prototype.openTag = function (type) {
        return this.domNode.parseHTMLFragment('<span class="e-rte-list-open-' + type.toLowerCase() + '"></span>');
    };
    Lists.prototype.closeTag = function (type) {
        return this.domNode.parseHTMLFragment('<span class="e-rte-list-close-' + type.toLowerCase() + '"></span>');
    };
    Lists.prototype.destroy = function () {
        this.removeEventListener();
        if (this.domNode) {
            this.domNode = null;
        }
    };
    Lists.prototype.areAllListItemsSelected = function (list, range) {
        var listItems = list.querySelectorAll('li');
        for (var i = 0; i < listItems.length; i++) {
            var listItem = listItems[i];
            var listItemRange = this.parent.currentDocument.createRange();
            listItemRange.selectNodeContents(listItem);
            if (!range.intersectsNode(listItem)) {
                return false;
            }
        }
        return true;
    };
    Lists.prototype.getListCursorInfo = function (range) {
        var position;
        var selectionState;
        var domMethods = new DOMMethods(this.parent.editableElement);
        var startNode = range.startContainer.nodeType === Node.TEXT_NODE ?
            domMethods.getTopMostNode(range.startContainer) : range.startContainer;
        var endNode = range.endContainer.nodeType === Node.TEXT_NODE ?
            domMethods.getTopMostNode(range.endContainer) : range.endContainer;
        var isSelection = !range.collapsed;
        var startList = startNode.nodeType === Node.TEXT_NODE ? startNode.parentElement.closest('li') :
            startNode.closest('li');
        var endList = endNode.nodeType === Node.TEXT_NODE ? endNode.parentElement.closest('li') :
            endNode.closest('li');
        var isNestedStart = startList && startList.closest('ol, ul') ? this.checkIsNestedList(startList.closest('ol, ul')) : false;
        var isNestedEnd = endList && endList.closest('ol, ul') ? this.checkIsNestedList(endList.closest('ol, ul')) : false;
        var blockNodes = this.parent.domNode.blockNodes();
        var length = blockNodes.length;
        var itemType = this.getListSelectionType(isNestedStart ? 'Nested' : 'Parent', isNestedEnd ? 'Nested' : 'Parent');
        if (isSelection) {
            if (blockNodes.length === 1) {
                selectionState = range.startOffset === 0 && range.endOffset === startList.textContent.length ? 'SingleFull' : 'SinglePartial';
            }
            else {
                selectionState = range.startOffset === 0 && range.endOffset === blockNodes[length - 1].textContent.length ? 'MultipleFull' : 'MultiplePartial';
            }
            position = 'None';
        }
        else {
            if (range.startOffset === 0 && startNode.previousSibling === null) {
                position = isNestedStart ? 'StartNested' : 'StartParent';
            }
            else if (range.startOffset === startList.textContent.length && startNode.nextSibling === null) {
                position = isNestedStart ? 'EndNested' : 'EndParent';
            }
            else {
                position = isNestedStart ? 'MiddleNested' : 'MiddleParent';
            }
            selectionState = 'None';
        }
        return { position: position, selectionState: selectionState, itemType: itemType };
    };
    Lists.prototype.checkIsNestedList = function (listParent) {
        var isDirectParent = listParent.parentElement === this.parent.editableElement;
        if (isDirectParent) { // Check if the list is directly under the editable element.
            return false;
        }
        if (listParent.closest('li')) {
            return true;
        }
        return false;
    };
    Lists.prototype.getListSelectionType = function (start, end) {
        if (start === 'Nested' && end === 'Nested') {
            return 'Nested';
        }
        else if (start === 'Parent' && end === 'Parent') {
            return 'Parent';
        }
        else {
            return 'Mixed';
        }
    };
    Lists.prototype.isAllListNodesSelected = function (list) {
        var selection = this.parent.currentDocument.getSelection();
        var isAllSelected = false;
        var liNodes = list.querySelectorAll('li');
        for (var i = 0; i < liNodes.length; i++) {
            if (selection.containsNode(liNodes[i], false)) {
                isAllSelected = true;
            }
            else {
                isAllSelected = false;
                break;
            }
        }
        return isAllSelected;
    };
    return Lists;
}());
export { Lists };
