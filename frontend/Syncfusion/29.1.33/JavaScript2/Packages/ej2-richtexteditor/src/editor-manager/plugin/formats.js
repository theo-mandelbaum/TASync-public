import * as EVENTS from './../../common/constant';
import { isNullOrUndefined as isNOU, detach, createElement, closest } from '@syncfusion/ej2-base';
import { isIDevice, setEditFrameFocus } from '../../common/util';
import { markerClassName } from './dom-node';
import { NodeCutter } from './nodecutter';
/**
 * Formats internal component
 *
 * @hidden
 * @deprecated
 */
var Formats = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element.
     * @hidden
     * @deprecated
     */
    function Formats(parent) {
        this.blockquotePrevent = false;
        this.parent = parent;
        this.addEventListener();
    }
    Formats.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.FORMAT_TYPE, this.applyFormats, this);
        this.parent.observer.on(EVENTS.KEY_UP_HANDLER, this.onKeyUp, this);
        this.parent.observer.on(EVENTS.KEY_DOWN_HANDLER, this.onKeyDown, this);
        this.parent.observer.on(EVENTS.BLOCKQUOTE_LIST_HANDLE, this.blockQuotesHandled, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    Formats.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.FORMAT_TYPE, this.applyFormats);
        this.parent.observer.off(EVENTS.KEY_UP_HANDLER, this.onKeyUp);
        this.parent.observer.off(EVENTS.KEY_DOWN_HANDLER, this.onKeyDown);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    Formats.prototype.getParentNode = function (node) {
        var formatNode = node;
        var blockTags = ['DIV', 'SECTION', 'ARTICLE', 'ASIDE', 'FOOTER', 'HEADER', 'NAV', 'MAIN'];
        for (; node.parentNode && node.parentNode !== this.parent.editableElement; null) {
            node = node.parentNode;
        }
        if (blockTags.indexOf(node.nodeName.toUpperCase()) !== -1) {
            node = formatNode;
            while (blockTags.indexOf(node.nodeName.toUpperCase()) === -1) {
                if (blockTags.indexOf(node.parentNode.nodeName.toUpperCase()) !== -1) {
                    break;
                }
                node = node.parentNode;
            }
        }
        return node;
    };
    Formats.prototype.blockQuotesHandled = function () {
        this.blockquotePrevent = true;
    };
    Formats.prototype.onKeyUp = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var endCon = range.endContainer;
        var lastChild = endCon.lastChild;
        if (e.event.which === 13 && range.startContainer === endCon && endCon.nodeType !== 3) {
            var pTag = createElement('p');
            pTag.innerHTML = '<br>';
            if (!isNOU(lastChild) && lastChild && lastChild.nodeName === 'BR' && (lastChild.previousSibling && lastChild.previousSibling.nodeName === 'TABLE')) {
                endCon.replaceChild(pTag, lastChild);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, pTag, 0);
            }
            else {
                var brNode = this.parent.nodeSelection.getSelectionNodeCollectionBr(range)[0];
                if (!isNOU(brNode) && brNode.nodeName === 'BR' && (brNode.previousSibling && brNode.previousSibling.nodeName === 'TABLE')) {
                    endCon.replaceChild(pTag, brNode);
                    this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, pTag, 0);
                }
            }
        }
        if (e.enterAction !== 'BR' && !isNOU(range.startContainer) && !isNOU(range.startContainer.parentElement) && range.startContainer === range.endContainer && range.startContainer.nodeName === '#text' && range.startContainer.parentElement.classList.contains('e-content') && range.startContainer.parentElement.isContentEditable) {
            var pTag = createElement(e.enterAction);
            range.startContainer.parentElement.insertBefore(pTag, range.startContainer);
            pTag.appendChild(range.startContainer);
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, pTag, 1);
        }
    };
    Formats.prototype.getBlockParent = function (node, endNode) {
        var currentParent = node;
        while (node !== endNode) {
            currentParent = node;
            node = node.parentElement;
        }
        return currentParent;
    };
    Formats.prototype.onKeyDown = function (e) {
        if (e.event.which === 13 && !this.blockquotePrevent) {
            var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
            var startCon = (range.startContainer.textContent.length === 0 || range.startContainer.nodeName === 'PRE')
                ? range.startContainer : range.startContainer.parentElement;
            var endCon = (range.endContainer.textContent.length === 0 || range.endContainer.nodeName === 'PRE')
                ? range.endContainer : range.endContainer.parentElement;
            var preElem = closest(startCon, 'pre');
            var endPreElem = closest(endCon, 'pre');
            var blockquoteEle = closest(startCon, 'blockquote');
            var endBlockquoteEle = closest(endCon, 'blockquote');
            var liParent = !isNOU(preElem) && !isNOU(preElem.parentElement) && preElem.parentElement.tagName === 'LI';
            if (liParent) {
                return;
            }
            if (((isNOU(preElem) && !isNOU(endPreElem)) || (!isNOU(preElem) && isNOU(endPreElem)))) {
                e.event.preventDefault();
                this.deleteContent(range);
                this.removeCodeContent(range);
                range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, endCon, 0);
            }
            if (e.event.which === 13 && ((!isNOU(blockquoteEle) && !isNOU(endBlockquoteEle)) ||
                (!isNOU(blockquoteEle) && isNOU(endBlockquoteEle)))) {
                var startParent = this.getBlockParent(range.startContainer, blockquoteEle);
                if ((startParent.textContent.charCodeAt(0) === 8203 &&
                    startParent.textContent.length === 1) || (startParent.textContent.length === 0 &&
                    startParent.querySelectorAll('img').length === 0 &&
                    startParent.querySelectorAll('table').length === 0)) {
                    e.event.preventDefault();
                    if (isNOU(startParent.nextElementSibling)) {
                        this.paraFocus(startParent.parentElement === this.parent.editableElement ?
                            startParent : startParent.parentElement); //Revert from blockquotes while pressing enter key
                    }
                    else {
                        var nodeCutter = new NodeCutter();
                        var newElem = nodeCutter.SplitNode(range, startParent.parentElement, false).cloneNode(true);
                        this.paraFocus(startParent.parentElement === this.parent.editableElement ?
                            startParent : startParent.parentElement);
                    }
                }
            }
            if (e.event.which === 13 && !isNOU(preElem) && !isNOU(endPreElem)) {
                e.event.preventDefault();
                this.deleteContent(range);
                this.removeCodeContent(range);
                range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
                var lastEmpty = range.startContainer.childNodes[range.endOffset];
                var lastBeforeBr = range.startContainer.childNodes[range.endOffset - 1];
                var startParent = range.startContainer;
                if (!isNOU(lastEmpty) && !isNOU(lastBeforeBr) && isNOU(lastEmpty.nextSibling) &&
                    lastEmpty.nodeName === 'BR' && lastBeforeBr.nodeName === 'BR') {
                    this.paraFocus(range.startContainer, e.enterAction);
                }
                else if ((startParent.textContent.charCodeAt(0) === 8203 &&
                    startParent.textContent.length === 1) || startParent.textContent.length === 0) {
                    //Double enter with any parent tag for the node
                    while (startParent.parentElement.nodeName !== 'PRE' &&
                        (startParent.textContent.length === 1 || startParent.textContent.length === 0)) {
                        startParent = startParent.parentElement;
                    }
                    if (!isNOU(startParent.previousSibling) && startParent.previousSibling.nodeName === 'BR' &&
                        isNOU(startParent.nextSibling)) {
                        this.paraFocus(startParent.parentElement);
                    }
                    else {
                        this.isNotEndCursor(preElem, range);
                    }
                }
                else {
                    //Cursor at start and middle
                    this.isNotEndCursor(preElem, range);
                }
            }
        }
        this.blockquotePrevent = false;
    };
    Formats.prototype.removeCodeContent = function (range) {
        var regEx = new RegExp('\uFEFF', 'g');
        if (!isNOU(range.endContainer.textContent.match(regEx))) {
            var pointer = range.endContainer.textContent.charCodeAt(range.endOffset - 1) === 65279 ?
                range.endOffset - 2 : range.endOffset;
            range.endContainer.textContent = range.endContainer.textContent.replace(regEx, '');
            if (range.endContainer.textContent === '') {
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, range.endContainer.parentElement, 0);
            }
            else {
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, range.endContainer, pointer);
            }
        }
    };
    Formats.prototype.deleteContent = function (range) {
        if (range.startContainer !== range.endContainer || range.startOffset !== range.endOffset) {
            range.deleteContents();
        }
    };
    Formats.prototype.paraFocus = function (referNode, enterAction) {
        var insertTag;
        if (enterAction === 'DIV') {
            insertTag = createElement('div');
            insertTag.innerHTML = '<br>';
        }
        else if (enterAction === 'BR') {
            insertTag = createElement('br');
        }
        else {
            insertTag = createElement('p');
            insertTag.innerHTML = '<br>';
        }
        this.parent.domNode.insertAfter(insertTag, referNode);
        this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, insertTag, 0);
        detach(referNode.lastChild);
    };
    Formats.prototype.isNotEndCursor = function (preElem, range) {
        var nodeCutter = new NodeCutter();
        var isEnd = range.startOffset === preElem.lastChild.textContent.length &&
            preElem.lastChild.textContent === range.startContainer.textContent;
        //Cursor at start point
        if (preElem.textContent.indexOf(range.startContainer.textContent) === 0 &&
            ((range.startOffset === 0 && range.endOffset === 0) || range.startContainer.nodeName === 'PRE')) {
            this.insertMarker(preElem, range);
            var brTag = createElement('br');
            preElem.childNodes[range.endOffset].parentElement.insertBefore(brTag, preElem.childNodes[range.endOffset]);
        }
        else {
            //Cursor at middle
            var cloneNode = nodeCutter.SplitNode(range, preElem, true);
            this.insertMarker(preElem, range);
            var previousSib = preElem.previousElementSibling;
            if (previousSib.tagName === 'PRE') {
                previousSib.insertAdjacentHTML('beforeend', '<br>' + cloneNode.innerHTML);
                detach(preElem);
            }
        }
        //To place the cursor position
        this.setCursorPosition(isEnd, preElem);
    };
    Formats.prototype.setCursorPosition = function (isEnd, preElem) {
        var isEmpty = false;
        var markerElem = this.parent.editableElement.querySelector('.tempSpan');
        var mrkParentElem = markerElem.parentElement;
        // eslint-disable-next-line
        markerElem.parentNode.textContent === '' ? isEmpty = true :
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, markerElem, 0);
        if (isEnd) {
            if (isEmpty) {
                //Enter press when pre element is empty
                if (mrkParentElem === preElem) {
                    this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, markerElem, 0);
                    detach(markerElem);
                }
                else {
                    this.focusSelectionParent(markerElem, mrkParentElem);
                }
            }
            else {
                var brElm = createElement('br');
                this.parent.domNode.insertAfter(brElm, markerElem);
                this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, markerElem, 0);
                detach(markerElem);
            }
        }
        else {
            // eslint-disable-next-line
            isEmpty ? this.focusSelectionParent(markerElem, mrkParentElem) : detach(markerElem);
        }
    };
    Formats.prototype.focusSelectionParent = function (markerElem, tempSpanPElem) {
        detach(markerElem);
        tempSpanPElem.innerHTML = '\u200B';
        this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, tempSpanPElem, 0);
    };
    Formats.prototype.insertMarker = function (preElem, range) {
        var tempSpan = createElement('span', { className: 'tempSpan' });
        if (range.startContainer.nodeName === 'PRE') {
            preElem.childNodes[range.endOffset].parentElement.insertBefore(tempSpan, preElem.childNodes[range.endOffset]);
        }
        else {
            range.startContainer.parentElement.insertBefore(tempSpan, range.startContainer);
        }
    };
    Formats.prototype.applyFormats = function (e) {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var tableCursor = this.parent.nodeSelection.processedTableImageCursor(range);
        if ((tableCursor.start || tableCursor.end) && e.subCommand.toLowerCase() !== 'blockquote') {
            if (tableCursor.startName === 'TABLE' || tableCursor.endName === 'TABLE') {
                var tableNode = tableCursor.start ? tableCursor.startNode : tableCursor.endNode;
                this.applyTableSidesFormat(e, tableCursor.start, tableNode);
                return;
            }
        }
        var isSelectAll = false;
        if (this.parent.editableElement === range.endContainer &&
            !isNOU(this.parent.editableElement.children[range.endOffset - 1]) &&
            this.parent.editableElement.children[range.endOffset - 1].tagName === 'TABLE' && !range.collapsed) {
            isSelectAll = true;
        }
        var save = this.parent.nodeSelection.save(range, this.parent.currentDocument);
        this.parent.domNode.setMarker(save);
        var formatsNodes = this.parent.domNode.blockNodes(true);
        if (e.enterAction === 'BR') {
            this.setSelectionBRConfig();
            var allSelectedNode = this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument);
            var selectedNodes = this.parent.nodeSelection.getSelectionNodes(allSelectedNode);
            var currentFormatNodes = [];
            if (selectedNodes.length === 0) {
                selectedNodes.push(formatsNodes[0]);
            }
            for (var i = 0; i < selectedNodes.length; i++) {
                var currentNode = selectedNodes[i];
                var previousCurrentNode = void 0;
                while (!this.parent.domNode.isBlockNode(currentNode) && currentNode !== this.parent.editableElement) {
                    previousCurrentNode = currentNode;
                    currentNode = currentNode.parentElement;
                }
                if (this.parent.domNode.isBlockNode(currentNode) && currentNode === this.parent.editableElement) {
                    currentFormatNodes.push(previousCurrentNode);
                }
            }
            for (var i = 0; i < currentFormatNodes.length; i++) {
                if (!this.parent.domNode.isBlockNode(currentFormatNodes[i])) {
                    var currentNode = currentFormatNodes[i];
                    var previousNode = currentNode;
                    while (currentNode === this.parent.editableElement) {
                        previousNode = currentNode;
                        currentNode = currentNode.parentElement;
                    }
                    var tempElem = void 0;
                    if (this.parent.domNode.isBlockNode(previousNode.parentElement) &&
                        previousNode.parentElement === this.parent.editableElement) {
                        tempElem = createElement('div');
                        previousNode.parentElement.insertBefore(tempElem, previousNode);
                        tempElem.appendChild(previousNode);
                        if (previousNode.textContent.length === 0) {
                            previousNode.appendChild(createElement('br'));
                        }
                    }
                    else {
                        tempElem = previousNode;
                    }
                    var preNode = tempElem.previousSibling;
                    while (!isNOU(preNode) && preNode.nodeName !== 'BR' &&
                        !this.parent.domNode.isBlockNode(preNode)) {
                        tempElem.firstChild.parentElement.insertBefore(preNode, tempElem.firstChild);
                        preNode = tempElem.previousSibling;
                    }
                    if (!isNOU(preNode) && preNode.nodeName === 'BR') {
                        detach(preNode);
                    }
                    var postNode = tempElem.nextSibling;
                    while (!isNOU(postNode) && postNode.nodeName !== 'BR' &&
                        !this.parent.domNode.isBlockNode(postNode)) {
                        tempElem.appendChild(postNode);
                        postNode = tempElem.nextSibling;
                    }
                    if (!isNOU(postNode) && postNode.nodeName === 'BR') {
                        detach(postNode);
                    }
                }
            }
            this.setSelectionBRConfig();
            formatsNodes = this.parent.domNode.blockNodes();
        }
        var isWholeBlockquoteNotSelected = false;
        var isPartiallySelected = false;
        for (var i = 0; i < formatsNodes.length; i++) {
            if (isNOU(closest(formatsNodes[0], 'blockquote')) ||
                isNOU(closest(formatsNodes[formatsNodes.length - 1], 'blockquote'))) {
                isPartiallySelected = true;
            }
        }
        var isToggleBlockquote = false;
        for (var i = 0; i < formatsNodes.length; i++) {
            var parentNode = void 0;
            var replaceHTML = void 0;
            if (e.subCommand.toLowerCase() === 'blockquote') {
                parentNode = this.getParentNode(formatsNodes[i]);
                if (e.enterAction === 'BR') {
                    replaceHTML = parentNode.innerHTML;
                }
                else {
                    if (!isNOU(closest(formatsNodes[i], 'table')) && this.parent.editableElement.contains(closest(formatsNodes[i], 'table'))) {
                        replaceHTML = !isNOU(closest((formatsNodes[i]), 'blockquote')) ?
                            closest((formatsNodes[i]), 'blockquote').outerHTML :
                            (formatsNodes[i]).outerHTML;
                    }
                    else {
                        replaceHTML = parentNode.outerHTML;
                    }
                }
            }
            else {
                parentNode = formatsNodes[i];
                replaceHTML = parentNode.innerHTML;
            }
            if ((e.subCommand.toLowerCase() === 'blockquote' && e.subCommand.toLowerCase() === parentNode.tagName.toLowerCase() && isPartiallySelected) ||
                ((e.subCommand.toLowerCase() === parentNode.tagName.toLowerCase() &&
                    (e.subCommand.toLowerCase() !== 'pre' && e.subCommand.toLowerCase() !== 'blockquote' ||
                        (!isNOU(e.exeValue) && e.exeValue.name === 'dropDownSelect'))) ||
                    isNOU(parentNode.parentNode) || (parentNode.tagName === 'TABLE' && e.subCommand.toLowerCase() === 'pre'))) {
                continue;
            }
            this.cleanFormats(parentNode, e.subCommand);
            var replaceNode = (e.subCommand.toLowerCase() === 'pre' && parentNode.tagName.toLowerCase() === 'pre') ?
                'p' : e.subCommand;
            var isToggleBlockquoteList = e.subCommand.toLowerCase() === parentNode.tagName.toLowerCase() &&
                e.subCommand.toLowerCase() === 'blockquote' && !isNOU(closest(formatsNodes[i], 'li'));
            var ensureNode = parentNode.tagName === 'TABLE' ?
                (!isNOU(closest((formatsNodes[i]), 'blockquote')) ? closest((formatsNodes[i]), 'blockquote') : parentNode) : parentNode;
            isToggleBlockquote = (e.subCommand.toLowerCase() === ensureNode.tagName.toLowerCase())
                && e.subCommand.toLowerCase() === 'blockquote';
            var replaceTag = void 0;
            var startNode_1 = this.getNode(formatsNodes[i]);
            var endNode_1 = this.getNode(formatsNodes[formatsNodes.length - 1]);
            var wholeBlockquoteSelected = void 0;
            if (!isNOU(closest((formatsNodes[i]), 'table')) &&
                (!isNOU(closest((formatsNodes[i]), 'td')) || !isNOU(closest((formatsNodes[i]), 'th')))) {
                wholeBlockquoteSelected = this.hasOnlyBlockquotes((closest((formatsNodes[i]), 'td') ||
                    closest((formatsNodes[i]), 'th')));
            }
            else {
                wholeBlockquoteSelected = isToggleBlockquote && parentNode.firstChild === startNode_1 && parentNode.lastChild === endNode_1;
            }
            if (wholeBlockquoteSelected) {
                replaceTag = replaceHTML.replace(/<blockquote[^>]*>|<\/blockquote>/g, '');
            }
            else if (isToggleBlockquoteList) {
                isWholeBlockquoteNotSelected = true;
                if (i === 0) {
                    this.createBlockquoteSpan('e-rte-blockquote-close', startNode_1, 'before');
                }
                if (i === formatsNodes.length - 1) {
                    this.createBlockquoteSpan('e-rte-blockquote-open', endNode_1, 'after');
                }
            }
            else if (isToggleBlockquote && closest(formatsNodes[0], 'blockquote') && closest(formatsNodes[formatsNodes.length - 1], 'blockquote')) {
                isWholeBlockquoteNotSelected = true;
                if (i === 0) {
                    this.createBlockquoteSpan('e-rte-blockquote-close', formatsNodes[i], 'before');
                }
                if (i === formatsNodes.length - 1) {
                    this.createBlockquoteSpan('e-rte-blockquote-open', formatsNodes[i], 'after');
                }
            }
            else {
                replaceTag = this.parent.domNode.createTagString(replaceNode, (e.subCommand.toLowerCase() === 'blockquote' ? null : parentNode), replaceHTML.replace(/>\s+</g, '><'));
            }
            if (parentNode.tagName === 'LI') {
                parentNode.innerHTML = '';
                parentNode.insertAdjacentHTML('beforeend', replaceTag);
            }
            else if (!isWholeBlockquoteNotSelected) {
                var currentTag = ((!isNOU(closest(formatsNodes[i], 'table')) && this.parent.editableElement.contains(closest(formatsNodes[i], 'table'))) ?
                    (!isNOU(closest((formatsNodes[i]), 'blockquote')) ? closest((formatsNodes[i]), 'blockquote') : formatsNodes[i]) : parentNode);
                this.parent.domNode.replaceWith(currentTag, replaceTag);
            }
        }
        if (isWholeBlockquoteNotSelected) {
            var blockquoteElem = this.parent.editableElement.querySelectorAll('.e-rte-blockquote-open, .e-rte-blockquote-close');
            for (var i = 0; i < blockquoteElem.length; i++) {
                var blockquoteNode = blockquoteElem[i].parentElement;
                var blockquoteContent = blockquoteNode.innerHTML;
                blockquoteContent = blockquoteContent.replace(/<span class="e-rte-blockquote-open"><\/span>/g, '<blockquote>');
                blockquoteContent = blockquoteContent.replace(/<span class="e-rte-blockquote-close"><\/span>/g, '</blockquote>');
                if (blockquoteElem[0].parentElement === blockquoteElem[1].parentElement) {
                    this.parent.domNode.replaceWith(blockquoteNode, this.parent.domNode.openTagString(blockquoteNode) +
                        blockquoteContent.trim() + this.parent.domNode.closeTagString(blockquoteNode));
                    break;
                }
                else if (i === blockquoteElem.length - 1 && !isNOU(blockquoteElem[i]) && !isNOU(blockquoteElem[i - 1]) &&
                    blockquoteElem[i].parentElement !== blockquoteElem[i - 1].parentElement) {
                    this.parent.domNode.replaceWith(blockquoteNode, blockquoteContent.trim());
                }
                else {
                    this.parent.domNode.replaceWith(blockquoteNode, this.parent.domNode.openTagString(blockquoteNode) +
                        blockquoteContent.trim() + this.parent.domNode.closeTagString(blockquoteNode));
                }
            }
        }
        this.preFormatMerge();
        this.blockquotesFormatMerge(e.enterAction);
        var startNode = this.parent.editableElement.querySelector('.' + markerClassName.startSelection);
        var endNode = this.parent.editableElement.querySelector('.' + markerClassName.endSelection);
        if (!isNOU(startNode) && !isNOU(endNode)) {
            startNode = startNode.lastChild;
            endNode = endNode.lastChild;
        }
        save = this.parent.domNode.saveMarker(save);
        if (isIDevice()) {
            setEditFrameFocus(this.parent.editableElement, e.selector);
        }
        if (isSelectAll) {
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startNode, endNode, 0, endNode.textContent.length);
        }
        else if (tableCursor.start && e.subCommand.toLowerCase() === 'blockquote') {
            var focusNode = save.range.startContainer.childNodes[isToggleBlockquote ?
                (save.range.startOffset - 1) : save.range.startOffset];
            if (isToggleBlockquote) {
                var focusNodeParent = focusNode.parentElement;
                var focusIndex = Array.prototype.indexOf.call(focusNodeParent.childNodes, focusNode);
                this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, focusNodeParent, focusNodeParent, focusIndex, focusIndex);
            }
            else {
                this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, focusNode, focusNode, 0, 0);
            }
        }
        else {
            save.restore();
        }
        if (e.callBack) {
            e.callBack({
                requestType: e.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.domNode.blockNodes()
            });
        }
    };
    Formats.prototype.hasOnlyBlockquotes = function (currentNode) {
        var blockquoteFound = false;
        for (var i = 0; i < currentNode.childNodes.length; i++) {
            var child = currentNode.childNodes[i];
            if (child.nodeType === Node.TEXT_NODE) {
                var text = child.textContent.replace(/[\u200B\u200C\u200D]/g, '').trim(); // Remove zero-width spaces
                if (text !== '') {
                    return false; // Found non-empty text node, so it's invalid
                }
            }
            else if (child.nodeType === Node.ELEMENT_NODE) {
                if (child.tagName === 'BLOCKQUOTE') {
                    blockquoteFound = true;
                }
                else {
                    return false; // Found a non-blockquote element, so it's invalid
                }
            }
        }
        return blockquoteFound; // Return true only if at least one blockquote was found and no other elements
    };
    Formats.prototype.getNode = function (node) {
        if (node.nodeName === 'BLOCKQUOTE') {
            node = node.firstChild;
            return node;
        }
        for (; node.parentNode && node.parentNode.nodeName !== 'BLOCKQUOTE'; null) {
            node = node.parentNode;
        }
        return node;
    };
    Formats.prototype.createBlockquoteSpan = function (className, node, position) {
        var tempSpanElem = createElement('span');
        tempSpanElem.classList.add(className);
        if (position === 'before') {
            node.parentNode.insertBefore(tempSpanElem, node);
        }
        else {
            this.parent.domNode.insertAfter(tempSpanElem, node);
        }
        return tempSpanElem;
    };
    Formats.prototype.setSelectionBRConfig = function () {
        var startElem = this.parent.editableElement.querySelector('.' + markerClassName.startSelection);
        var endElem = this.parent.editableElement.querySelector('.' + markerClassName.endSelection);
        if (isNOU(endElem)) {
            this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, startElem, 0);
        }
        else {
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, startElem, endElem, 0, 0);
        }
    };
    Formats.prototype.preFormatMerge = function () {
        var preNodes = this.parent.editableElement.querySelectorAll('PRE');
        if (!isNOU(preNodes)) {
            for (var i = 0; i < preNodes.length; i++) {
                var previousSib = preNodes[i].previousElementSibling;
                if (!isNOU(previousSib) && previousSib.tagName === 'PRE') {
                    previousSib.insertAdjacentHTML('beforeend', '<br>' + preNodes[i].innerHTML);
                    detach(preNodes[i]);
                }
            }
        }
    };
    Formats.prototype.blockquotesFormatMerge = function (enterAction) {
        var blockquoteNodes = this.parent.editableElement.querySelectorAll('BLOCKQUOTE');
        if (!isNOU(blockquoteNodes)) {
            for (var i = 0; i < blockquoteNodes.length; i++) {
                if (blockquoteNodes[i].innerHTML.trim() === '') {
                    detach(blockquoteNodes[i]);
                }
                var previousSib = blockquoteNodes[i].previousElementSibling;
                if (!isNOU(previousSib) && previousSib.tagName === 'BLOCKQUOTE') {
                    previousSib.insertAdjacentHTML('beforeend', (enterAction === 'BR' ? '<br>' : '') + blockquoteNodes[i].innerHTML);
                    detach(blockquoteNodes[i]);
                }
            }
        }
    };
    Formats.prototype.cleanFormats = function (element, tagName) {
        var ignoreAttr = ['display', 'font-size', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right', 'font-weight'];
        tagName = tagName.toLowerCase();
        for (var i = 0; i < ignoreAttr.length && (tagName !== 'p' && tagName !== 'blockquote' && tagName !== 'pre'); i++) {
            element.style.removeProperty(ignoreAttr[i]);
        }
    };
    Formats.prototype.applyTableSidesFormat = function (e, start, table) {
        var formatNode = createElement(e.subCommand);
        if (!(e.enterAction === 'BR')) {
            formatNode.appendChild(createElement('br'));
        }
        table.insertAdjacentElement(start ? 'beforebegin' : 'afterend', formatNode);
        this.parent.nodeSelection.setCursorPoint(this.parent.currentDocument, formatNode, 0);
        if (e.callBack) {
            e.callBack({
                requestType: e.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.domNode.blockNodes()
            });
        }
    };
    Formats.prototype.destroy = function () {
        this.removeEventListener();
    };
    return Formats;
}());
export { Formats };
