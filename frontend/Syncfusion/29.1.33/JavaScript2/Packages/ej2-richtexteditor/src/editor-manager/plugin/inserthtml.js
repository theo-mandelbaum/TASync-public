import { NodeSelection } from './../../selection/index';
import { NodeCutter } from './nodecutter';
import * as CONSTANT from './../base/constant';
import { detach, Browser, isNullOrUndefined as isNOU, createElement, closest } from '@syncfusion/ej2-base';
import { InsertMethods } from './insert-methods';
import { updateTextNode, nestedListCleanUp, scrollToCursor } from './../../common/util';
/**
 * Insert a HTML Node or Text
 *
 * @hidden
 * @deprecated
 */
var InsertHtml = /** @class */ (function () {
    function InsertHtml() {
    }
    InsertHtml.Insert = function (docElement, insertNode, editNode, isExternal, enterAction) {
        var node;
        if (typeof insertNode === 'string') {
            var divNode = document.createElement('div');
            divNode.innerHTML = insertNode.replace(/&(times|divide|ne)(;?)/g, '&amp;$1$2');
            node = isExternal ? divNode : divNode.firstChild;
        }
        else {
            if (isExternal && !(!isNOU(insertNode) && !isNOU(insertNode.classList) &&
                insertNode.classList.contains('pasteContent'))) {
                var divNode = document.createElement('div');
                divNode.appendChild(insertNode);
                node = divNode;
            }
            else {
                node = insertNode;
            }
        }
        var scrollHeight = !isNOU(editNode) ? editNode.scrollHeight : 0;
        var nodeSelection = new NodeSelection(editNode);
        var nodeCutter = new NodeCutter();
        var range = nodeSelection.getRange(docElement);
        if (range.startContainer === editNode && range.startContainer === range.endContainer && range.startOffset === 0 &&
            range.startOffset === range.endOffset && editNode.textContent.length === 0 &&
            (editNode.children[0].tagName === 'P' || editNode.children[0].tagName === 'DIV' || (editNode.children[0].tagName === 'BR'))) {
            nodeSelection.setSelectionText(docElement, range.startContainer.children[0], range.startContainer.children[0], 0, 0);
            range = nodeSelection.getRange(docElement);
        }
        if (range.startContainer === editNode && range.startContainer === range.endContainer && range.startOffset === 0 &&
            range.startOffset === range.endOffset && editNode.textContent.trim().length > 0) {
            var focusNode = this.findFirstTextNode(range.startContainer);
            if (!isNOU(focusNode)) {
                nodeSelection.setSelectionText(docElement, focusNode, focusNode, 0, 0);
                range = nodeSelection.getRange(docElement);
            }
        }
        if (range.startContainer.nodeName === 'BR' && range.startOffset === 0 && range.startOffset === range.endOffset &&
            range.startContainer === range.endContainer) {
            var currentIndex = Array.prototype.slice.call(range.startContainer.parentElement.childNodes).indexOf(range.startContainer);
            nodeSelection.setSelectionText(docElement, range.startContainer.parentElement, range.startContainer.parentElement, currentIndex, currentIndex);
            range = nodeSelection.getRange(docElement);
        }
        var isCursor = range.startOffset === range.endOffset && range.startOffset === 0 &&
            range.startContainer === range.endContainer;
        var isCollapsed = range.collapsed;
        var nodes = this.getNodeCollection(range, nodeSelection, node);
        var closestParentNode = (node.nodeName.toLowerCase() === 'table') ? (!isNOU(nodes[0]) ? this.closestEle(nodes[0].parentNode, editNode) : range.startContainer) : nodes[0];
        if (closestParentNode && closestParentNode.nodeName === 'BR') {
            closestParentNode = closestParentNode.parentNode;
        }
        if (closestParentNode && closestParentNode.nodeName === 'LI' && node.nodeName.toLowerCase() === 'table') {
            if (nodes.length === 0) {
                var tableCursor = nodeSelection.processedTableImageCursor(range);
                if (tableCursor.startName === 'TABLE' || tableCursor.endName === 'TABLE') {
                    var tableNode = tableCursor.start ? tableCursor.startNode : tableCursor.endNode;
                    nodes.push(tableNode);
                }
            }
            var lastclosestParentNode = this.closestEle(nodes[nodes.length - 1].parentNode, editNode);
            this.insertTableInList(range, node, closestParentNode, nodes[0], nodeCutter, lastclosestParentNode, editNode);
            return;
        }
        if (isCursor && range.startContainer.textContent === '' && range.startContainer.nodeName !== 'BR' && enterAction !== 'BR' && node.nodeName !== '#text' && !isNOU(node.children[0]) && !isNOU(node.children[0].tagName) && node.children[0].tagName === 'IMG' && node.children.length === 1) {
            range.startContainer.innerHTML = '';
        }
        if (isExternal || (!isNOU(node) && !isNOU(node.classList) &&
            node.classList.contains('pasteContent'))) {
            this.pasteInsertHTML(nodes, node, range, nodeSelection, nodeCutter, docElement, isCollapsed, closestParentNode, editNode, enterAction);
            return;
        }
        if (editNode !== range.startContainer && ((!isCollapsed && !(closestParentNode.nodeType === Node.ELEMENT_NODE &&
            CONSTANT.TABLE_BLOCK_TAGS.indexOf(closestParentNode.tagName.toLocaleLowerCase()) !== -1))
            || (node.nodeName.toLowerCase() === 'table' && closestParentNode &&
                CONSTANT.TABLE_BLOCK_TAGS.indexOf(closestParentNode.tagName.toLocaleLowerCase()) === -1))) {
            var preNode = nodeCutter.GetSpliceNode(range, closestParentNode);
            var sibNode = preNode.previousSibling;
            var parentNode = preNode.parentNode;
            if (nodes.length === 1 || (node.nodeName.toLowerCase() === 'table' && preNode.childElementCount === 0)) {
                nodeSelection.setSelectionContents(docElement, preNode);
                range = nodeSelection.getRange(docElement);
            }
            else if (parentNode && parentNode.nodeName !== 'LI') {
                var lasNode = nodeCutter.GetSpliceNode(range, nodes[nodes.length - 1].parentElement);
                lasNode = isNOU(lasNode) ? preNode : lasNode;
                nodeSelection.setSelectionText(docElement, preNode, lasNode, 0, (lasNode.nodeType === 3) ?
                    lasNode.textContent.length : lasNode.childNodes.length);
                range = nodeSelection.getRange(docElement);
            }
            if (range.startContainer.parentElement.closest('ol,ul') !== null && range.endContainer.parentElement.closest('ol,ul') !== null) {
                nestedListCleanUp(range, parentNode);
            }
            else {
                range.extractContents();
            }
            if (insertNode.tagName === 'TABLE') {
                var emptyElement = closest(range.startContainer, 'blockquote');
                if (!isNOU(emptyElement) && emptyElement.childNodes.length > 0) {
                    for (var i = emptyElement.childNodes.length - 1; i >= 0; i--) {
                        var currentChild = emptyElement.childNodes[i];
                        if (!isNOU(currentChild) && currentChild.innerText.trim() === '') {
                            detach(currentChild);
                        }
                    }
                }
                this.removeEmptyElements(editNode, false, emptyElement);
            }
            for (var index = 0; index < nodes.length; index++) {
                if (nodes[index].nodeType !== 3 && nodes[index].parentNode != null) {
                    if (nodes[index].nodeName === 'IMG') {
                        continue;
                    }
                    nodes[index].parentNode.removeChild(nodes[index]);
                }
            }
            if (!isNOU(sibNode) && !isNOU(sibNode.parentNode)) {
                if (docElement.contains(sibNode)) {
                    InsertMethods.AppendBefore(node, sibNode, true);
                }
                else {
                    range.insertNode(node);
                }
            }
            else {
                var previousNode = null;
                while (parentNode !== editNode && parentNode.firstChild &&
                    (parentNode.textContent.trim() === '') && parentNode.nodeName !== 'LI') {
                    var parentNode1 = parentNode.parentNode;
                    previousNode = parentNode;
                    parentNode = parentNode1;
                }
                if (previousNode !== null) {
                    parentNode = previousNode;
                }
                if (parentNode.firstChild && (parentNode !== editNode ||
                    (node.nodeName === 'TABLE' && isCursor && parentNode === range.startContainer &&
                        parentNode === range.endContainer))) {
                    if (parentNode.textContent.trim() === '' && parentNode !== editNode && parentNode.nodeName === 'LI') {
                        parentNode.appendChild(node);
                    }
                    else if (parentNode.textContent.trim() === '' && parentNode !== editNode) {
                        InsertMethods.AppendBefore(node, parentNode, false);
                        detach(parentNode);
                    }
                    else {
                        InsertMethods.AppendBefore(node, parentNode.firstChild, false);
                    }
                }
                else if (isNOU(preNode.previousSibling) && insertNode.tagName === 'TABLE') {
                    parentNode.prepend(node);
                }
                else {
                    parentNode.appendChild(node);
                }
            }
            if (node.nodeName === 'IMG') {
                this.imageFocus(node, nodeSelection, docElement);
            }
            else if (node.nodeType !== 3) {
                nodeSelection.setSelectionText(docElement, node, node, 0, node.childNodes.length);
            }
            else {
                nodeSelection.setSelectionText(docElement, node, node, 0, node.textContent.length);
            }
        }
        else {
            var liElement = !isNOU(closestParentNode) ? closest(closestParentNode, 'li') : null;
            if ((!isNOU(closestParentNode) && (closestParentNode.nodeName === 'TD' || closestParentNode.nodeName === 'TH')) && !isNOU(liElement) && !isCursor) {
                range.extractContents();
                liElement.appendChild(node);
                this.removeEmptyNextLI(liElement);
            }
            else {
                range.deleteContents();
                if (isCursor && range.startContainer.textContent === '' && range.startContainer.nodeName !== 'BR') {
                    range.startContainer.innerHTML = '';
                }
                if (Browser.isIE) {
                    var frag = docElement.createDocumentFragment();
                    frag.appendChild(node);
                    range.insertNode(frag);
                }
                else if (range.startContainer.nodeType === 1 && range.startContainer.nodeName.toLowerCase() === 'hr'
                    && range.endContainer.nodeName.toLowerCase() === 'hr') {
                    var paraElem = range.startContainer.nextElementSibling;
                    if (paraElem) {
                        if (paraElem.querySelector('br')) {
                            detach(paraElem.querySelector('br'));
                        }
                        paraElem.appendChild(node);
                    }
                }
                else {
                    if (range.startContainer.nodeName === 'BR') {
                        range.startContainer.parentElement.insertBefore(node, range.startContainer);
                    }
                    else {
                        range.insertNode(node);
                    }
                }
            }
            if (node.nodeType !== 3 && node.childNodes.length > 0) {
                nodeSelection.setSelectionText(docElement, node, node, 1, 1);
            }
            else if (node.nodeName === 'IMG') {
                this.imageFocus(node, nodeSelection, docElement);
            }
            else if (node.nodeType !== 3) {
                nodeSelection.setSelectionContents(docElement, node);
            }
            else {
                nodeSelection.setSelectionText(docElement, node, node, node.textContent.length, node.textContent.length);
            }
        }
        if (!isNOU(editNode) && scrollHeight < editNode.scrollHeight && node.nodeType === 1 && (node.nodeName === 'IMG' || !isNOU(node.querySelector('img')))) {
            scrollToCursor(docElement, editNode);
        }
    };
    InsertHtml.removeEmptyNextLI = function (liElement) {
        var nextLiElement = !isNOU(liElement.nextElementSibling)
            ? liElement.nextElementSibling : null;
        while (nextLiElement && nextLiElement.nodeName === 'LI' && nextLiElement.innerHTML.trim() === '') {
            detach(nextLiElement);
            nextLiElement = !isNOU(liElement.nextElementSibling)
                ? liElement.nextElementSibling : null;
        }
    };
    InsertHtml.findFirstTextNode = function (node) {
        if (node.nodeType === Node.TEXT_NODE) {
            return node;
        }
        for (var i = 0; i < node.childNodes.length; i++) {
            var textNode = this.findFirstTextNode(node.childNodes[i]);
            if (!isNOU(textNode)) {
                return textNode;
            }
        }
        return null;
    };
    InsertHtml.pasteInsertHTML = function (nodes, node, range, nodeSelection, nodeCutter, docElement, isCollapsed, closestParentNode, editNode, enterAction) {
        var isCursor = range.startOffset === range.endOffset &&
            range.startContainer === range.endContainer;
        if (isCursor && range.startContainer === editNode && editNode.textContent === '' && range.startOffset === 0 && range.endOffset === 0) {
            var currentBlockNode = this.getImmediateBlockNode(nodes[nodes.length - 1], editNode);
            nodeSelection.setSelectionText(docElement, currentBlockNode, currentBlockNode, 0, 0);
            range = nodeSelection.getRange(docElement);
        }
        var lasNode;
        var sibNode;
        var isSingleNode;
        var preNode;
        if (editNode !== range.startContainer && ((!isCollapsed && !(closestParentNode.nodeType === Node.ELEMENT_NODE &&
            CONSTANT.TABLE_BLOCK_TAGS.indexOf(closestParentNode.tagName.toLocaleLowerCase()) !== -1))
            || (node.nodeName.toLowerCase() === 'table' && closestParentNode &&
                CONSTANT.TABLE_BLOCK_TAGS.indexOf(closestParentNode.tagName.toLocaleLowerCase()) === -1))) {
            preNode = nodeCutter.GetSpliceNode(range, closestParentNode);
            if (!isNOU(preNode)) {
                sibNode = isNOU(preNode.previousSibling) ? preNode.parentNode.previousSibling : preNode.previousSibling;
                if (nodes.length === 1) {
                    nodeSelection.setSelectionContents(docElement, preNode);
                    range = nodeSelection.getRange(docElement);
                    isSingleNode = true;
                }
                else {
                    lasNode = nodeCutter.GetSpliceNode(range, nodes[nodes.length - 1].parentElement);
                    lasNode = isNOU(lasNode) ? preNode : lasNode;
                    nodeSelection.setSelectionText(docElement, preNode, lasNode, 0, (lasNode.nodeType === 3) ?
                        lasNode.textContent.length : lasNode.childNodes.length);
                    range = nodeSelection.getRange(docElement);
                    isSingleNode = false;
                }
            }
        }
        var containsBlockNode = false;
        this.removingComments(node);
        var allChildNodes = node.childNodes;
        for (var i = 0; i < allChildNodes.length; i++) {
            if (CONSTANT.BLOCK_TAGS.indexOf(allChildNodes[i].nodeName.toLocaleLowerCase()) >= 0) {
                containsBlockNode = true;
                break;
            }
        }
        var lastSelectionNode;
        var fragment = document.createDocumentFragment();
        if (!containsBlockNode) {
            if (!isCursor) {
                while (node.firstChild) {
                    lastSelectionNode = node.firstChild;
                    fragment.appendChild(node.firstChild);
                }
                if (isSingleNode) {
                    range.deleteContents();
                    this.removeEmptyElements(editNode, true);
                    range.insertNode(fragment);
                }
                else {
                    var startContainerParent = editNode === range.startContainer ?
                        range.startContainer : range.startContainer.parentNode;
                    // Get the index of the start container among its siblings
                    var startIndex = Array.prototype.indexOf.call(startContainerParent.childNodes, (Browser.userAgent.indexOf('Firefox') !== -1 && editNode === range.startContainer) ? range.startContainer.firstChild : range.startContainer);
                    range.deleteContents();
                    if (startIndex !== -1) {
                        range.setStart(startContainerParent, startIndex);
                        range.setEnd(startContainerParent, startIndex);
                    }
                    if (!isNOU(lasNode) && lasNode !== editNode) {
                        detach(lasNode);
                        this.removeEmptyElements(editNode, true);
                    }
                    // eslint-disable-next-line
                    !isNOU(sibNode) ? (sibNode.parentNode === editNode ? sibNode.appendChild(fragment) : sibNode.parentNode.appendChild(fragment)) : range.insertNode(fragment);
                }
            }
            else {
                var tempSpan = createElement('span', { className: 'tempSpan' });
                var nearestAnchor = closest(range.startContainer.parentElement, 'a');
                if (range.startContainer.nodeType === 3 && nearestAnchor && closest(nearestAnchor, 'span')) {
                    var immediateBlockNode = this.getImmediateBlockNode(range.startContainer, editNode);
                    if (immediateBlockNode.querySelectorAll('br').length > 0) {
                        detach(immediateBlockNode.querySelector('br'));
                    }
                    var rangeElement = closest(nearestAnchor, 'span');
                    rangeElement.appendChild(tempSpan);
                }
                else if (nodes[0] && nodes[0].nodeName === '#text' && nodes[0].nodeValue.includes('\u200B') && !isNOU(nodes[0].parentElement) && !isNOU(nodes[0].parentElement.previousElementSibling) && nodes[0].parentElement.previousElementSibling.classList.contains('e-mention-chip')) {
                    range.startContainer.parentElement.insertAdjacentElement('afterend', tempSpan);
                }
                else {
                    range.insertNode(tempSpan);
                }
                while (node.firstChild) {
                    lastSelectionNode = node.firstChild;
                    fragment.appendChild(node.firstChild);
                }
                var matchedElement = this.getClosestMatchingElement(tempSpan.parentNode, fragment);
                if (fragment.childNodes.length === 1 && fragment.firstChild && matchedElement) {
                    var wrapperDiv = document.createElement('div');
                    var text = fragment.firstChild.textContent || '';
                    wrapperDiv.innerHTML = fragment.firstChild.innerHTML || '';
                    var replacementNode = lastSelectionNode = wrapperDiv.firstChild;
                    if (replacementNode) {
                        matchedElement.replaceChild(replacementNode, tempSpan);
                        if (matchedElement.parentNode && replacementNode.nodeType === Node.TEXT_NODE && ((replacementNode.previousSibling &&
                            replacementNode.previousSibling.nodeType === Node.TEXT_NODE) ||
                            (replacementNode.nextSibling && replacementNode.nextSibling.nodeType === Node.TEXT_NODE))) {
                            matchedElement.parentNode.normalize();
                            var startOffset = range.startOffset + text.length;
                            nodeSelection.setCursorPoint(docElement, matchedElement.firstChild, startOffset);
                            lastSelectionNode = null;
                        }
                    }
                    wrapperDiv.remove();
                }
                else {
                    tempSpan.parentNode.replaceChild(fragment, tempSpan);
                }
            }
        }
        else {
            var parentElem = range.startContainer;
            while (!isNOU(parentElem) && parentElem.nodeName !== 'PRE' && parentElem !== editNode) {
                parentElem = parentElem.parentElement;
            }
            if (!isNOU(node) && !isNOU(parentElem) && parentElem.nodeName === 'PRE') {
                range.insertNode(node);
                lastSelectionNode = node.lastChild;
            }
            else {
                this.insertTempNode(range, node, nodes, nodeCutter, editNode);
                var isFirstTextNode = true;
                var isPreviousInlineElem = void 0;
                var paraElm = void 0;
                var previousParent = void 0;
                if (!this.contentsDeleted) {
                    if (!isCollapsed && range.startContainer.parentElement.textContent.length === 0 && range.startContainer.nodeName === 'BR' && range.startContainer.parentElement.nodeName === 'P') {
                        editNode.removeChild(range.startContainer.parentElement);
                    }
                    range.deleteContents();
                }
                while (node.firstChild) {
                    if (node.firstChild.nodeName === '#text' && node.firstChild.textContent.trim() === '') {
                        detach(node.firstChild);
                        continue;
                    }
                    if (node.firstChild.nodeName === '#text' && isFirstTextNode ||
                        (this.inlineNode.indexOf(node.firstChild.nodeName.toLocaleLowerCase()) >= 0 && isFirstTextNode)) {
                        lastSelectionNode = node.firstChild;
                        if (isNOU(node.previousElementSibling)) {
                            var firstParaElm = enterAction === 'DIV' ? createElement('div') : createElement('p');
                            node.parentElement.insertBefore(firstParaElm, node);
                        }
                        if (node.previousElementSibling.nodeName === 'BR') {
                            node.parentElement.insertBefore(node.firstChild, node);
                        }
                        else {
                            node.previousElementSibling.appendChild(node.firstChild);
                        }
                    }
                    else {
                        lastSelectionNode = node.firstChild;
                        if (node.firstChild.nodeName === '#text' ||
                            (this.inlineNode.indexOf(node.firstChild.nodeName.toLocaleLowerCase()) >= 0)) {
                            if (!isPreviousInlineElem) {
                                paraElm = enterAction === 'DIV' ? createElement('div') : createElement('p');
                                paraElm.appendChild(node.firstChild);
                                fragment.appendChild(paraElm);
                            }
                            else {
                                previousParent.appendChild(node.firstChild);
                                fragment.appendChild(previousParent);
                            }
                            previousParent = paraElm;
                            isPreviousInlineElem = true;
                        }
                        else {
                            fragment.appendChild(node.firstChild);
                            isPreviousInlineElem = false;
                        }
                        isFirstTextNode = false;
                    }
                }
                node.parentNode.replaceChild(fragment, node);
            }
        }
        if (lastSelectionNode instanceof Element && lastSelectionNode.nodeName === 'GOOGLE-SHEETS-HTML-ORIGIN') {
            var tableEle = lastSelectionNode.querySelector('table');
            var colGroup = tableEle.querySelector('colgroup');
            if (colGroup) {
                for (var i = 0; i < tableEle.rows.length; i++) {
                    for (var k = 0; k < tableEle.rows[i].cells.length; k++) {
                        if (colGroup.querySelectorAll('col')[k].hasAttribute('width')) {
                            var width = colGroup.querySelectorAll('col')[k].getAttribute('width');
                            tableEle.rows[i].cells[k].style.width = width + 'px';
                        }
                    }
                }
            }
        }
        if (lastSelectionNode && lastSelectionNode.nodeName === 'TABLE') {
            var pTag = createElement('p');
            pTag.appendChild(createElement('br'));
            lastSelectionNode.parentElement.insertBefore(pTag, lastSelectionNode.nextSibling);
            lastSelectionNode = pTag;
        }
        if (lastSelectionNode && lastSelectionNode.nodeName === '#text') {
            this.placeCursorEnd(lastSelectionNode, node, nodeSelection, docElement, editNode);
        }
        else if (lastSelectionNode && lastSelectionNode.nodeName === 'HR') {
            var nextSiblingNode = lastSelectionNode.nextSibling ? lastSelectionNode.nextSibling : null;
            var siblingTag = enterAction === 'DIV' ? createElement('div') : createElement('p');
            siblingTag.appendChild(createElement('br'));
            if (!isNOU(nextSiblingNode) && nextSiblingNode.nodeName === 'HR') {
                lastSelectionNode.parentNode.insertBefore(siblingTag, nextSiblingNode);
                lastSelectionNode = siblingTag;
            }
            else if (!isNOU(nextSiblingNode)) {
                lastSelectionNode = nextSiblingNode;
            }
            else {
                lastSelectionNode.parentNode.appendChild(siblingTag);
                lastSelectionNode.parentNode.insertBefore(lastSelectionNode, siblingTag);
                lastSelectionNode = siblingTag;
            }
            nodeSelection.setSelectionText(docElement, lastSelectionNode, lastSelectionNode, 0, 0);
        }
        else if (lastSelectionNode) {
            this.cursorPos(lastSelectionNode, node, nodeSelection, docElement, editNode);
        }
        this.alignCheck(editNode);
        this.listCleanUp(nodeSelection, docElement);
    };
    InsertHtml.compareParentElements = function (el1, el2) {
        if (!el1 || !el2) {
            return false;
        }
        if (el1.tagName !== el2.tagName) {
            return false;
        }
        return this.getFilteredAttributes(el1) === this.getFilteredAttributes(el2);
    };
    InsertHtml.getFilteredAttributes = function (element) {
        return Array.from(element.attributes)
            .map(function (attr) {
            if (attr.name === 'class') {
                var filteredClass = attr.value.split(' ')
                    .filter(function (cls) { return cls !== 'pasteContent_RTE'; })
                    .join(' ');
                return filteredClass ? "class='" + filteredClass + "'" : '';
            }
            return attr.name + "='" + attr.value + "'";
        })
            .filter(function (attr) { return attr.length > 0; })
            .sort()
            .join(' ');
    };
    InsertHtml.getClosestMatchingElement = function (startNode, fragment) {
        var currentNode = startNode;
        while (currentNode) {
            var matchingPastedNode = this.findMatchingChild(fragment, currentNode);
            if (matchingPastedNode) {
                return currentNode;
            }
            currentNode = currentNode.parentElement;
        }
        return null;
    };
    InsertHtml.findMatchingChild = function (fragment, targetNode) {
        for (var _i = 0, _a = Array.from(fragment.children); _i < _a.length; _i++) {
            var node = _a[_i];
            if (this.compareParentElements(node, targetNode)) {
                return node;
            }
            var deeperMatch = this.findMatchingChild(node, targetNode);
            if (deeperMatch) {
                return deeperMatch;
            }
        }
        return null;
    };
    InsertHtml.listCleanUp = function (nodeSelection, docElement) {
        var range = nodeSelection.getRange(docElement);
        var startContainer = range.startContainer;
        var startOffset = range.startOffset;
        var startParentElement = range.startContainer.parentElement;
        var endParentElement = range.endContainer.parentElement;
        if (!isNOU(startParentElement) && !isNOU(endParentElement)) {
            var startClosestList = startParentElement.closest('ol, ul');
            var endClosestList = endParentElement.closest('ol, ul');
            if (!isNOU(startClosestList) && !isNOU(endClosestList)) {
                var hasListCleanUp = this.cleanUpListItems(startClosestList);
                var hasListContainerCleanUp = this.cleanUpListContainer(startClosestList);
                if (hasListCleanUp || hasListContainerCleanUp) {
                    range.setStart(startContainer, startOffset);
                    range.setEnd(startContainer, startOffset);
                }
            }
        }
    };
    InsertHtml.cleanUpListItems = function (parentContainer) {
        var _this = this;
        var hasListCleanUp = false;
        var listItems;
        if (!isNOU(parentContainer.closest('ol, ul'))) {
            listItems = parentContainer.closest('ol, ul').querySelectorAll('li');
        }
        if (isNOU(listItems) || listItems.length === 0) {
            return false;
        }
        var nearestListItem = null;
        listItems.forEach(function (listItem) {
            var parentElement = listItem.parentElement;
            if (!isNOU(parentElement) && parentElement.nodeName !== 'OL' && parentElement.nodeName !== 'UL') {
                if (isNOU(nearestListItem)) {
                    nearestListItem = parentElement.closest('li');
                }
                if (!isNOU(nearestListItem)) {
                    var nextSibling = listItem.nextSibling;
                    if (!isNOU(nextSibling) && nextSibling.nodeName !== 'LI') {
                        var startIndex = Array.prototype.indexOf.call(parentElement.childNodes, nextSibling);
                        var clonedParent = parentElement.cloneNode(false);
                        var totalChildren = parentElement.childNodes.length;
                        for (var i = startIndex; i < totalChildren; i++) {
                            clonedParent.appendChild(parentElement.childNodes[startIndex]);
                        }
                        if (clonedParent.childNodes.length > 0) {
                            var newListItem = document.createElement('li');
                            newListItem.appendChild(clonedParent);
                            nearestListItem.insertAdjacentElement('afterend', newListItem);
                        }
                        else {
                            clonedParent.remove();
                        }
                    }
                    var closestList = parentElement.closest('ol, ul');
                    nearestListItem.insertAdjacentElement('afterend', listItem);
                    nearestListItem = nearestListItem.nextSibling;
                    if (!isNOU(closestList)) {
                        _this.removeEmptyElements(closestList);
                    }
                    hasListCleanUp = true;
                }
            }
        });
        var cleanUpFlattenListContainer = this.cleanUpFlattenListContainer(parentContainer);
        hasListCleanUp = cleanUpFlattenListContainer ? cleanUpFlattenListContainer : hasListCleanUp;
        return hasListCleanUp;
    };
    InsertHtml.cleanUpFlattenListContainer = function (parentContainer) {
        var hasListCleanUp = false;
        var listItems;
        if (!isNOU(parentContainer.closest('ol, ul'))) {
            listItems = parentContainer.closest('ol, ul').querySelectorAll('li');
        }
        if (isNOU(listItems) || listItems.length === 0) {
            return false;
        }
        listItems.forEach(function (listItem) {
            if (!isNOU(listItem.firstChild) && (listItem.firstChild.nodeName === 'OL' || listItem.firstChild.nodeName === 'UL')) {
                listItem.style.listStyleType = 'none';
            }
            var nestedLi = Array.from(listItem.children).find(function (child) {
                return child.tagName === 'LI' && (child.parentElement && child.parentElement.tagName !== 'OL' && child.parentElement.tagName !== 'UL');
            });
            if (!isNOU(nestedLi) && !isNOU(listItem.parentNode)) {
                listItem.parentNode.replaceChild(nestedLi, listItem);
                if (isNOU(nestedLi.textContent) || nestedLi.textContent.trim() === '') {
                    nestedLi.remove();
                }
                hasListCleanUp = true;
            }
        });
        return hasListCleanUp;
    };
    InsertHtml.cleanUpListContainer = function (parentList) {
        var hasListContainerCleanUp = false;
        var nonLiElementCollection = [];
        var replacements = [];
        if (!isNOU(parentList)) {
            parentList.childNodes.forEach(function (childNode) {
                if (childNode.nodeName.toLocaleUpperCase() !== 'LI') {
                    nonLiElementCollection.push(childNode);
                }
                if ((childNode.nodeName.toLocaleUpperCase() === 'LI' || parentList.lastChild === childNode) && nonLiElementCollection.length > 0) {
                    replacements.push({ elements: nonLiElementCollection.slice() });
                    nonLiElementCollection = [];
                }
            });
            replacements.forEach(function (_a) {
                var elements = _a.elements;
                var newListItem = document.createElement('li');
                elements[0].parentNode.replaceChild(newListItem, elements[0]);
                elements.forEach(function (child) { return newListItem.appendChild(child); });
                if (newListItem.textContent && newListItem.textContent.trim() === '' && !newListItem.querySelector('img')) {
                    parentList.removeChild(newListItem);
                }
                hasListContainerCleanUp = true;
            });
        }
        return hasListContainerCleanUp;
    };
    InsertHtml.placeCursorEnd = function (lastSelectionNode, node, nodeSelection, docElement, editNode) {
        lastSelectionNode = lastSelectionNode.nodeName === 'BR' ? (isNOU(lastSelectionNode.previousSibling) ? lastSelectionNode.parentNode
            : lastSelectionNode.previousSibling) : lastSelectionNode;
        while (!isNOU(lastSelectionNode) && lastSelectionNode.nodeName !== '#text' && lastSelectionNode.nodeName !== 'IMG' &&
            lastSelectionNode.nodeName !== 'BR' && lastSelectionNode.nodeName !== 'HR') {
            if (!isNOU(lastSelectionNode.lastChild) && (lastSelectionNode.lastChild.nodeName === 'P' &&
                lastSelectionNode.lastChild.innerHTML === '')) {
                var lineBreak = createElement('br');
                lastSelectionNode.lastChild.appendChild(lineBreak);
            }
            lastSelectionNode = lastSelectionNode.lastChild;
        }
        lastSelectionNode = isNOU(lastSelectionNode) ? node : lastSelectionNode;
        if (lastSelectionNode.nodeName === 'IMG') {
            this.imageFocus(lastSelectionNode, nodeSelection, docElement);
        }
        else {
            nodeSelection.setSelectionText(docElement, lastSelectionNode, lastSelectionNode, lastSelectionNode.textContent.length, lastSelectionNode.textContent.length);
        }
        this.removeEmptyElements(editNode);
    };
    InsertHtml.getNodeCollection = function (range, nodeSelection, node) {
        var nodes = [];
        if (range.startOffset === range.endOffset && range.startContainer === range.endContainer &&
            range.startContainer.nodeName !== 'BR' && range.startContainer.childNodes.length > 0 &&
            (range.startContainer.nodeName === 'TD' || (range.startContainer.nodeType !== 3 &&
                node.classList && node.classList.contains('pasteContent')))) {
            nodes.push(range.startContainer.childNodes[range.endOffset]);
        }
        else {
            nodes = nodeSelection.getInsertNodeCollection(range);
        }
        return nodes;
    };
    InsertHtml.insertTempNode = function (range, node, nodes, nodeCutter, editNode) {
        if (range.startContainer === editNode && !isNOU(range.startContainer.childNodes[range.endOffset - 1]) &&
            range.startContainer.childNodes[range.endOffset - 1].nodeName === 'TABLE') {
            if (isNOU(range.startContainer.childNodes[range.endOffset - 1].nextSibling)) {
                range.startContainer.appendChild(node);
            }
            else {
                range.startContainer.insertBefore(node, range.startContainer.childNodes[range.endOffset - 1].nextSibling);
            }
        }
        else if (range.startContainer === editNode && !isNOU(range.startContainer.childNodes[range.endOffset]) &&
            range.startContainer.childNodes[range.endOffset].nodeName === 'TABLE') {
            range.startContainer.appendChild(node);
        }
        else if (range.startContainer === range.endContainer && range.startContainer.nodeType !== 3
            && node.firstChild.nodeName === 'HR') {
            if (range.startContainer.classList.contains('e-content') || range.startContainer.nodeName === 'BODY') {
                range.startContainer.appendChild(node);
            }
            else {
                range.startContainer.parentNode.insertBefore(node, range.startContainer);
            }
        }
        else {
            var blockNode = this.getImmediateBlockNode(nodes[nodes.length - 1], editNode);
            if ((isNOU(blockNode) || isNOU(blockNode.parentElement)) && range.endContainer.nodeType !== 3) {
                blockNode = range.endContainer;
                range.setEnd(blockNode, range.endContainer.textContent.length);
            }
            if (blockNode && blockNode.nodeName === 'BODY' || blockNode.nodeName === 'DIV' && range.startContainer === range.endContainer && range.startContainer.nodeType === 1) {
                blockNode = range.startContainer;
            }
            if (blockNode && blockNode.closest('LI') && editNode.contains(blockNode.closest('LI')) && blockNode.nodeName !== 'TD' && blockNode.nodeName !== 'TH' && blockNode.nodeName !== 'TR' && node && node.firstElementChild &&
                ((node).firstElementChild.tagName === 'OL' || node.firstElementChild.tagName === 'UL')) {
                var liNode = void 0;
                while (node.firstElementChild.lastElementChild && node.firstElementChild.lastElementChild.tagName === 'LI') {
                    liNode = node.firstElementChild.lastElementChild;
                    liNode.style.removeProperty('margin-left');
                    liNode.style.removeProperty('margin-top');
                    liNode.style.removeProperty('margin-bottom');
                    node.firstElementChild.insertAdjacentElement('afterend', liNode);
                }
            }
            if (blockNode && blockNode.nodeName === 'TD' || blockNode.nodeName === 'TH' || blockNode.nodeName === 'TR') {
                var parentElem = range.startContainer;
                while (!isNOU(parentElem) && parentElem.parentElement !== blockNode) {
                    parentElem = parentElem.parentElement;
                }
                range.deleteContents();
                var splitedElm = nodeCutter.GetSpliceNode(range, parentElem);
                if (splitedElm) {
                    splitedElm.parentNode.replaceChild(node, splitedElm);
                }
                else {
                    range.insertNode(node);
                }
                this.contentsDeleted = true;
                return;
            }
            else {
                var nodeSelection = new NodeSelection(editNode);
                var currentNode = this.getNodeCollection(range, nodeSelection, node)[this.getNodeCollection(range, nodeSelection, node).length - 1];
                var splitedElm = void 0;
                if (currentNode && ((currentNode.nodeName === 'BR' || currentNode.nodeName === 'HR' ||
                    (currentNode.nodeName === '#text' && !isNOU(currentNode.parentElement) && currentNode.parentElement.nodeName === 'LI')) &&
                    (!isNOU(currentNode.parentElement) && currentNode.parentElement.textContent.trim().length === 0))) {
                    splitedElm = currentNode;
                    if (currentNode.parentElement.nodeName === 'LI' && !isNOU(currentNode.nextSibling) &&
                        currentNode.nextSibling.nodeName === 'BR') {
                        detach(currentNode.nextSibling);
                    }
                    if (currentNode.parentElement.nodeName === 'LI' && currentNode.parentElement.textContent === '') {
                        this.removeListfromPaste(range);
                        range.insertNode(node);
                        this.contentsDeleted = true;
                        return;
                    }
                }
                else if (currentNode && ((currentNode.nodeName === '#text' || currentNode.nodeName === 'BR') && !isNOU(currentNode.parentElement) &&
                    (currentNode.parentElement.nodeName === 'LI' || currentNode.parentElement.closest('LI') || (blockNode === editNode && currentNode.parentElement === blockNode)) &&
                    currentNode.parentElement.textContent.trim().length > 0)) {
                    splitedElm = currentNode;
                    if (currentNode.parentElement.nodeName === 'LI' && !isNOU(currentNode.nextSibling) &&
                        currentNode.nextSibling.nodeName === 'BR') {
                        detach(currentNode.nextSibling);
                    }
                    if (!range.collapsed) {
                        var startContainer = range.startContainer;
                        var startOffset = range.startOffset;
                        this.removeListfromPaste(range);
                        range.setStart(startContainer, startOffset);
                        range.setEnd(startContainer, startOffset);
                    }
                    range.insertNode(node);
                    this.contentsDeleted = true;
                    return;
                }
                else {
                    splitedElm = nodeCutter.GetSpliceNode(range, blockNode);
                }
                splitedElm.parentNode.replaceChild(node, splitedElm);
            }
        }
    };
    InsertHtml.cursorPos = function (lastSelectionNode, node, nodeSelection, docElement, editNode) {
        lastSelectionNode.classList.add('lastNode');
        editNode.innerHTML = updateTextNode(editNode.innerHTML);
        lastSelectionNode = editNode.querySelector('.lastNode');
        if (!isNOU(lastSelectionNode)) {
            this.placeCursorEnd(lastSelectionNode, node, nodeSelection, docElement, editNode);
            lastSelectionNode.classList.remove('lastNode');
            if (lastSelectionNode.classList.length === 0) {
                lastSelectionNode.removeAttribute('class');
            }
        }
    };
    InsertHtml.imageFocus = function (node, nodeSelection, docElement) {
        var focusNode = document.createTextNode(' ');
        if (node.parentNode && node.parentNode.nodeName === 'A') {
            var anchorTag = node.parentNode;
            var parentNode = anchorTag.parentNode;
            parentNode.insertBefore(focusNode, anchorTag.nextSibling);
            parentNode.insertBefore(node, focusNode);
        }
        else {
            node.parentNode.insertBefore(focusNode, node.nextSibling);
        }
        nodeSelection.setSelectionText(docElement, node.nextSibling, node.nextSibling, 0, 0);
    };
    // eslint-disable-next-line
    InsertHtml.getImmediateBlockNode = function (node, editNode) {
        while (node && CONSTANT.BLOCK_TAGS.indexOf(node.nodeName.toLocaleLowerCase()) < 0) {
            node = node.parentNode;
        }
        return node;
    };
    InsertHtml.removingComments = function (elm) {
        var innerElement = elm.innerHTML;
        innerElement = innerElement.replace(/<!--[\s\S]*?-->/g, '');
        elm.innerHTML = innerElement;
    };
    InsertHtml.findDetachEmptyElem = function (element, ignoreBlockNodes) {
        if (ignoreBlockNodes === void 0) { ignoreBlockNodes = false; }
        var removableElement;
        if (!isNOU(element.parentElement)) {
            var hasNbsp = element.parentElement.textContent.length > 0 && element.parentElement.textContent.match(/\u00a0/g)
                && element.parentElement.textContent.match(/\u00a0/g).length > 0;
            if (!hasNbsp && element.parentElement.textContent.trim() === '' && element.parentElement.contentEditable !== 'true' &&
                isNOU(element.parentElement.querySelector('img')) && element.parentElement.nodeName !== 'TD' && element.parentElement.nodeName !== 'TH') {
                removableElement = ignoreBlockNodes && CONSTANT.BLOCK_TAGS.indexOf(element.parentElement.tagName.toLowerCase()) !== -1 ?
                    element : this.findDetachEmptyElem(element.parentElement, ignoreBlockNodes);
            }
            else {
                removableElement = ignoreBlockNodes && CONSTANT.BLOCK_TAGS.indexOf(element.tagName.toLowerCase()) !== -1 ? null :
                    element;
            }
        }
        else {
            removableElement = null;
        }
        return removableElement;
    };
    InsertHtml.removeEmptyElements = function (element, ignoreBlockNodes, emptyElemet) {
        if (ignoreBlockNodes === void 0) { ignoreBlockNodes = false; }
        if (emptyElemet === void 0) { emptyElemet = null; }
        var emptyElements = element.querySelectorAll(':empty');
        var filteredEmptyElements = Array.from(emptyElements).filter(function (element) {
            var tagName = element.tagName.toLowerCase();
            // Some empty tags suc as TD TH convey a meaning and hence should not be removed.
            var meaningfulEmptyTags = ['td', 'th', 'textarea', 'input', 'img', 'video', 'audio', 'br', 'hr', 'iframe'];
            return !element.closest('svg') && !element.closest('canvas') && !(meaningfulEmptyTags.indexOf(tagName) > -1);
        });
        for (var i = 0; i < filteredEmptyElements.length; i++) {
            var lineWithDiv = true;
            var currentEmptyElem = filteredEmptyElements[i];
            if (currentEmptyElem.tagName === 'DIV') {
                lineWithDiv = currentEmptyElem.style.borderBottom === 'none' ||
                    currentEmptyElem.style.borderBottom === '' ? true : false;
            }
            if (currentEmptyElem.nodeName === 'COL') {
                var colGroup = currentEmptyElem.parentElement;
                detach(colGroup);
                continue;
            }
            var isEmptyElement = !isNOU(emptyElemet) && currentEmptyElem === emptyElemet;
            if (CONSTANT.SELF_CLOSING_TAGS.indexOf(currentEmptyElem.tagName.toLowerCase()) < 0 && lineWithDiv && !isEmptyElement) {
                var detachableElement = this.findDetachEmptyElem(currentEmptyElem, ignoreBlockNodes);
                if (!isNOU(detachableElement) && !(detachableElement.nodeType === Node.ELEMENT_NODE && detachableElement.nodeName.toUpperCase() === 'TEXTAREA')) {
                    detach(detachableElement);
                }
            }
        }
    };
    InsertHtml.closestEle = function (element, editNode) {
        var el = element;
        if (closest(el, 'li')) {
            return closest(el, 'li');
        }
        while (el && el.nodeType === 1) {
            if (el.parentNode === editNode ||
                (!isNOU(el.parentNode.tagName) &&
                    (CONSTANT.IGNORE_BLOCK_TAGS.indexOf(el.parentNode.tagName.toLocaleLowerCase()) !== -1
                        || CONSTANT.ALLOWED_TABLE_BLOCK_TAGS.indexOf(el.parentNode.tagName.toLocaleLowerCase()) !== -1))) {
                return el;
            }
            el = el.parentNode;
        }
        return null;
    };
    InsertHtml.insertTableInList = function (range, insertNode, parentNode, currentNode, nodeCutter, lastclosestParentNode, editNode) {
        var totalLi = !isNOU(closest(parentNode, 'ul,ol')) ? closest(parentNode, 'ul,ol').querySelectorAll('li').length : 0;
        var preNode = nodeCutter.SplitNode(range, parentNode, true);
        var sibNode = preNode.previousElementSibling;
        var nextSibNode = !isNOU(lastclosestParentNode) ? closest(lastclosestParentNode, 'li') : null;
        var nextElementSiblingValue = !isNOU(nextSibNode) ? nextSibNode.innerHTML : null;
        if (!isNOU(sibNode) && !isNOU(closest(sibNode, 'ol,ul')) && closest(sibNode, 'ol,ul').querySelectorAll('li').length > totalLi) {
            sibNode.appendChild(insertNode);
            range.deleteContents();
            if (preNode.childNodes.length > 0) {
                this.moveChildNodes(preNode, sibNode);
            }
            if ((parentNode !== lastclosestParentNode) && !isNOU(nextElementSiblingValue)
                && nextElementSiblingValue !== nextSibNode.innerHTML) {
                this.moveChildNodes(nextSibNode, sibNode);
            }
        }
        else {
            range.deleteContents();
            preNode.insertBefore(insertNode, preNode.firstChild);
            if (parentNode !== lastclosestParentNode) {
                this.moveChildNodes(lastclosestParentNode, parentNode);
            }
        }
        this.removeEmptyNextLI(closest(insertNode, 'li'));
        insertNode.classList.add('ignore-table');
    };
    InsertHtml.moveChildNodes = function (source, target) {
        while (!isNOU(source) && !isNOU(source.firstChild)) {
            target.appendChild(source.firstChild);
        }
    };
    InsertHtml.alignCheck = function (editNode) {
        var spanAligns = editNode.querySelectorAll('span[style*="text-align"]');
        for (var i = 0; i < spanAligns.length; i++) {
            var spanAlign = spanAligns[i];
            if (spanAlign) {
                var blockAlign = this.getImmediateBlockNode(spanAlign, null);
                if (blockAlign) {
                    var totalSpanText = '';
                    for (var j = 0; j < spanAligns.length; j++) {
                        var span = spanAligns[j];
                        if (blockAlign.contains(span)) {
                            totalSpanText += span.textContent;
                        }
                    }
                    if (blockAlign.textContent.trim() === totalSpanText.trim()) {
                        blockAlign.style.textAlign = spanAlign.style.textAlign;
                    }
                }
            }
        }
    };
    InsertHtml.removeListfromPaste = function (range) {
        range.deleteContents();
        var value = range.startContainer;
        if (!isNOU(value) && value.nodeName === 'LI' && !isNOU(value.parentElement) && (value.parentElement.nodeName === 'OL' || value.parentElement.nodeName === 'UL') && value.textContent.trim() === '') {
            value.parentElement.querySelectorAll('li').forEach(function (item) {
                if (item.textContent.trim() === '' && item !== value) {
                    item.remove();
                }
            });
        }
    };
    /**
     * Insert method
     *
     * @hidden
     * @deprecated
     */
    InsertHtml.inlineNode = ['a', 'abbr', 'acronym', 'audio', 'b', 'bdi', 'bdo', 'big', 'br', 'button',
        'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'font', 'i', 'iframe', 'img', 'input',
        'ins', 'kbd', 'label', 'map', 'mark', 'meter', 'noscript', 'object', 'output', 'picture', 'progress',
        'q', 'ruby', 's', 'samp', 'script', 'select', 'slot', 'small', 'span', 'strong', 'sub', 'sup', 'svg',
        'template', 'textarea', 'time', 'u', 'tt', 'var', 'video', 'wbr'];
    InsertHtml.contentsDeleted = false;
    return InsertHtml;
}());
export { InsertHtml };
