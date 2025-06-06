/**
 * `Selection` module is used to handle RTE Selections.
 */
import { NodeSelection } from './../../selection/index';
import { NodeCutter } from './nodecutter';
import { InsertMethods } from './insert-methods';
import { IsFormatted } from './isformatted';
import { isIDevice, setEditFrameFocus } from '../../common/util';
import { isNullOrUndefined as isNOU, Browser, closest, detach } from '@syncfusion/ej2-base';
import { DOMNode } from './dom-node';
import { CustomUserAgentData } from '../../common/user-agent';
import { DOMMethods } from './dom-tree';
var SelectionCommands = /** @class */ (function () {
    function SelectionCommands() {
    }
    /**
     * applyFormat method
     *
     * @param {Document} docElement - specifies the document
     * @param {string} format - specifies the string value
     * @param {Node} endNode - specifies the end node
     * @param {string} enterAction - specifies the enter key action
     * @param {ITableSelection} tableCellSelection - specifies the table cell selection
     * @param {string} value - specifies the string value
     * @param {string} selector - specifies the string
     * @param {FormatPainterValue} painterValues specifies the element created and last child
     * @returns {void}
     * @hidden
     * @deprecated
     */
    SelectionCommands.applyFormat = function (docElement, format, endNode, enterAction, tableCellSelection, value, selector, painterValues) {
        this.enterAction = enterAction;
        var validFormats = ['bold', 'italic', 'underline', 'strikethrough', 'superscript',
            'subscript', 'uppercase', 'lowercase', 'fontcolor', 'fontname', 'fontsize', 'backgroundcolor', 'inlinecode'];
        if (validFormats.indexOf(format) > -1 || value === 'formatPainter') {
            if (format === 'backgroundcolor' && value === '') {
                value = 'transparent';
            }
            var domSelection = new NodeSelection(endNode);
            var domNode = new DOMNode(endNode, docElement);
            var nodeCutter = new NodeCutter();
            var isFormatted = new IsFormatted();
            var range = domSelection.getRange(docElement);
            var counter = 0;
            var currentAnchorNode = range.startContainer.parentElement;
            if (range.collapsed && !isNOU(currentAnchorNode) &&
                currentAnchorNode.tagName === 'A' &&
                (range.startOffset === currentAnchorNode.textContent.length || range.startOffset === 0)) {
                var emptyTextNode = document.createTextNode('');
                if (range.startOffset === 0) {
                    currentAnchorNode.parentNode.insertBefore(emptyTextNode, currentAnchorNode);
                }
                else {
                    if (!isNOU(currentAnchorNode.nextSibling)) {
                        currentAnchorNode.parentElement.insertBefore(emptyTextNode, currentAnchorNode.nextSibling);
                    }
                    else {
                        currentAnchorNode.parentNode.appendChild(emptyTextNode);
                    }
                }
                // Set the range to the empty text node
                var newRange = docElement.createRange();
                range.setStart(emptyTextNode, 0);
                range.setEnd(emptyTextNode, 0);
                range.collapse(true);
                domSelection.setRange(docElement, newRange);
            }
            if (Browser.userAgent.indexOf('Firefox') !== -1 && range.startContainer === range.endContainer && !isNOU(endNode) && range.startContainer === endNode) {
                var startChildNodes = range.startContainer.childNodes;
                var startNode = ((startChildNodes[(range.startOffset > 0) ? (range.startOffset - 1) :
                    range.startOffset]) || range.startContainer);
                var endNode_1 = (range.endContainer.childNodes[(range.endOffset > 0) ? (range.endOffset - 1) :
                    range.endOffset] || range.endContainer);
                var lastSelectionNode = (endNode_1.lastChild.nodeName === 'BR' ? (isNOU(endNode_1.lastChild.previousSibling) ? endNode_1
                    : endNode_1.lastChild.previousSibling) : endNode_1.firstChild);
                while (!isNOU(lastSelectionNode) && lastSelectionNode.nodeName !== '#text' && lastSelectionNode.nodeName !== 'IMG' &&
                    lastSelectionNode.nodeName !== 'BR' && lastSelectionNode.nodeName !== 'HR') {
                    lastSelectionNode = lastSelectionNode.lastChild;
                }
                domSelection.setSelectionText(docElement, startNode, lastSelectionNode, 0, 0);
                range = domSelection.getRange(docElement);
            }
            var save = domSelection.save(range, docElement);
            var nodes = void 0;
            var isTableSelect = false;
            if (endNode && tableCellSelection && endNode.nodeName !== '#text') {
                nodes = tableCellSelection.getTextNodes();
            }
            if (nodes && nodes.length > 0) {
                isTableSelect = true;
            }
            else {
                nodes = range.collapsed ? domSelection.getSelectionNodeCollection(range) :
                    domSelection.getSelectionNodeCollectionBr(range);
            }
            var isCollapsed = false;
            var isFormat = false;
            var isCursor = false;
            var preventRestore = false;
            var isFontStyle = (['fontcolor', 'fontname', 'fontsize', 'backgroundcolor'].indexOf(format) > -1);
            var isMACMentionStartEnd = false;
            var mentionPosition = void 0;
            if (SelectionCommands.userAgentData.isSafari()) {
                mentionPosition = SelectionCommands.isMentionStartOrEnd(endNode, nodes[0], nodes[nodes.length - 1]);
                isMACMentionStartEnd = mentionPosition !== 'None';
            }
            if (!isTableSelect && range.collapsed) {
                var currentFormatNode = isFormatted.getFormattedNode(range.startContainer, format, endNode);
                var currentSelector = !isNOU(currentFormatNode) ?
                    (currentFormatNode.getAttribute('style') === null ? currentFormatNode.nodeName :
                        currentFormatNode.nodeName + '[style=\'' + currentFormatNode.getAttribute('style') + '\']') : null;
                if (nodes.length > 0) {
                    isCollapsed = true;
                    range = nodeCutter.GetCursorRange(docElement, range, nodes[0]);
                }
                else if (range.startContainer.nodeType === 3 && ((range.startContainer.parentElement.childElementCount > 0 &&
                    range.startOffset > 0 && range.startContainer.parentElement.firstElementChild.tagName.toLowerCase() !== 'br') ||
                    !isNOU(currentFormatNode) && currentFormatNode ===
                        (range.startContainer.parentElement.closest(currentSelector)) &&
                        ((range.startContainer.parentElement.closest(currentSelector)).textContent.replace(new RegExp('\u200B', 'g'), '').trim().length !== 0))) {
                    isCollapsed = true;
                    range = nodeCutter.GetCursorRange(docElement, range, range.startContainer);
                    nodes.push(range.startContainer);
                }
                else {
                    var cursorNode = this.insertCursorNode(docElement, domSelection, range, isFormatted, nodeCutter, format, value, endNode);
                    domSelection.endContainer = domSelection.startContainer = domSelection.getNodeArray(cursorNode, true);
                    var childNodes = cursorNode.nodeName === 'BR' && cursorNode.parentNode.childNodes;
                    if (!isNOU(childNodes) && childNodes.length === 1 && childNodes[0].nodeName === 'BR' && nodes.length === 0) {
                        domSelection.setSelectionText(docElement, range.startContainer, range.endContainer, 0, 0);
                        preventRestore = true;
                    }
                    else {
                        domSelection.endOffset = domSelection.startOffset = 1;
                    }
                    if (cursorNode.nodeName === 'BR' && cursorNode.parentNode.textContent.length === 0) {
                        preventRestore = true;
                    }
                }
            }
            isCursor = isTableSelect ? false : range.collapsed;
            var isSubSup = false;
            var isRemoved = false;
            for (var index = 0; index < nodes.length; index++) {
                var formatNode = isFormatted.getFormattedNode(nodes[index], format, endNode);
                if (formatNode === null) {
                    if (format === 'subscript') {
                        formatNode = isFormatted.getFormattedNode(nodes[index], 'superscript', endNode);
                        isSubSup = formatNode === null ? false : true;
                    }
                    else if (format === 'superscript') {
                        formatNode = isFormatted.getFormattedNode(nodes[index], 'subscript', endNode);
                        isSubSup = formatNode === null ? false : true;
                    }
                    isRemoved = false;
                }
                if (index === 0 && formatNode === null) {
                    isFormat = true;
                }
                if (formatNode !== null && (!isFormat || isFontStyle)) {
                    nodes[index] = this.removeFormat(nodes, index, formatNode, isCursor, isTableSelect, isFormat, isFontStyle, range, nodeCutter, format, value, domSelection, endNode, domNode);
                    isRemoved = true;
                }
                if (!isRemoved && formatNode === null) {
                    nodes[index] = this.insertFormat(docElement, nodes, index, formatNode, isCursor, isTableSelect, isFormat, isFontStyle, range, nodeCutter, format, value, painterValues, domNode, endNode);
                    counter++;
                }
                if (nodes.length === counter) {
                    this.isWrapped = true;
                }
                if (!isTableSelect) {
                    if (!isMACMentionStartEnd) {
                        domSelection = this.applySelection(nodes, domSelection, nodeCutter, index, isCollapsed);
                    }
                }
            }
            if (isIDevice()) {
                setEditFrameFocus(endNode, selector);
            }
            if (!preventRestore && !isTableSelect) {
                save.restore();
            }
            if (isSubSup) {
                this.applyFormat(docElement, format, endNode, enterAction, tableCellSelection);
            }
        }
    };
    SelectionCommands.insertCursorNode = function (docElement, domSelection, range, isFormatted, nodeCutter, format, value, endNode) {
        var cursorNodes = domSelection.getNodeCollection(range);
        var domNode = new DOMNode(endNode, docElement);
        var cursorFormat = (cursorNodes.length > 0) ?
            (cursorNodes.length > 1 && range.startContainer === range.endContainer) ?
                this.getCursorFormat(isFormatted, cursorNodes, format, endNode) :
                ((value === '' && format === 'fontsize' && isFormatted.getFormattedNode(cursorNodes[0], format, endNode) == null && cursorNodes[0].parentElement.nodeName === 'SPAN') ? cursorNodes[0].parentElement : isFormatted.getFormattedNode(cursorNodes[0], format, endNode)) : null;
        var cursorNode = null;
        if (cursorFormat) {
            cursorNode = cursorNodes[0];
            if (cursorFormat.firstChild.textContent.charCodeAt(0) === 8203 && cursorFormat.firstChild.nodeType === 3) {
                var regEx = new RegExp('\u200B', 'g');
                var emptySpaceNode = void 0;
                if (cursorNode.nodeName !== '#text') {
                    for (var i = 0; i < cursorNodes.length; i++) {
                        if (cursorNodes[i].nodeType === Node.TEXT_NODE) {
                            cursorNode = cursorNodes[i];
                        }
                    }
                }
                if (cursorFormat.firstChild === cursorNode) {
                    cursorNode.textContent = (cursorFormat.parentElement && (domNode.isBlockNode(cursorFormat.parentElement) &&
                        cursorFormat.parentElement.textContent.length <= 1 ? cursorFormat.parentElement.childElementCount > 1 :
                        cursorFormat.childElementCount === 0) &&
                        (cursorFormat.parentElement.textContent.length > 1 ||
                            cursorFormat.parentElement.firstChild && cursorFormat.parentElement.firstChild.nodeType === 1) ?
                        cursorNode.textContent : cursorNode.textContent.replace(regEx, ''));
                    emptySpaceNode = cursorNode;
                }
                else {
                    cursorFormat.firstChild.textContent = cursorFormat.firstChild.textContent.replace(regEx, '');
                    emptySpaceNode = cursorFormat.firstChild;
                }
                var pointer = void 0;
                if (emptySpaceNode.textContent.length === 0) {
                    if (!isNOU(emptySpaceNode.previousSibling)) {
                        cursorNode = emptySpaceNode.previousSibling;
                        pointer = emptySpaceNode.textContent.length - 1;
                        domSelection.setCursorPoint(docElement, emptySpaceNode, pointer);
                    }
                    else if (!isNOU(emptySpaceNode.parentElement) && emptySpaceNode.parentElement.textContent.length === 0) {
                        var brElem = document.createElement('BR');
                        emptySpaceNode.parentElement.appendChild(brElem);
                        detach(emptySpaceNode);
                        cursorNode = brElem;
                        domSelection.setCursorPoint(docElement, cursorNode.parentElement, 0);
                    }
                }
            }
            if ((['fontcolor', 'fontname', 'fontsize', 'backgroundcolor'].indexOf(format) > -1)) {
                if (format === 'fontcolor') {
                    cursorFormat.style.color = value;
                }
                else if (format === 'fontname') {
                    cursorFormat.style.fontFamily = value;
                }
                else if (format === 'fontsize') {
                    cursorFormat.style.fontSize = value;
                }
                else {
                    cursorFormat.style.backgroundColor = value;
                }
                cursorNode = cursorFormat;
            }
            else {
                InsertMethods.unwrap(cursorFormat);
                domSelection.setCursorPoint(docElement, cursorNode, 0);
            }
        }
        else {
            if (cursorNodes.length > 1 && range.startOffset > 0 && (cursorNodes[0].firstElementChild &&
                cursorNodes[0].firstElementChild.tagName.toLowerCase() === 'br')) {
                cursorNodes[0].innerHTML = '';
            }
            if (cursorNodes.length === 1 && range.startOffset === 0 && (cursorNodes[0].nodeName === 'BR' || (isNOU(cursorNodes[0].nextSibling) ? false : cursorNodes[0].nextSibling.nodeName === 'BR'))) {
                detach(cursorNodes[0].nodeName === '#text' ? cursorNodes[0].nextSibling : cursorNodes[0]);
            }
            if (!isNOU(cursorNodes[0] && cursorNodes[0].parentElement) && IsFormatted.inlineTags.
                indexOf((cursorNodes[0].parentElement).tagName.toLowerCase()) !== -1 && cursorNodes[0].textContent.includes('\u200B')) {
                var element = this.GetFormatNode(format, value);
                var tempNode = cursorNodes[0];
                if (format === 'fontsize') {
                    var currentFormatNode = cursorNodes[0];
                    while (currentFormatNode) {
                        var isSameTextContent = currentFormatNode.parentElement.textContent.trim()
                            === cursorNodes[0].textContent.trim();
                        var previousElement = currentFormatNode.parentElement;
                        if (!domNode.isBlockNode(previousElement) && isSameTextContent &&
                            !(previousElement.nodeName === 'SPAN' && previousElement.classList.contains('e-img-inner'))) {
                            currentFormatNode = previousElement;
                        }
                        else {
                            break;
                        }
                        cursorNodes[0] = currentFormatNode;
                    }
                }
                this.applyStyles(cursorNodes, 0, element);
                return tempNode;
            }
            cursorNode = this.getInsertNode(docElement, range, format, value).firstChild;
        }
        return cursorNode;
    };
    SelectionCommands.getCursorFormat = function (isFormatted, cursorNodes, format, endNode) {
        var currentNode;
        for (var index = 0; index < cursorNodes.length; index++) {
            currentNode = cursorNodes[index].lastElementChild ?
                cursorNodes[index].lastElementChild : cursorNodes[index];
        }
        return (format === 'fontsize' && isFormatted.getFormattedNode(currentNode, format, endNode) == null && currentNode.parentElement.nodeName === 'SPAN') ? currentNode.parentElement : isFormatted.getFormattedNode(currentNode, format, endNode);
    };
    SelectionCommands.removeFormat = function (nodes, index, formatNode, isCursor, isTableCell, isFormat, isFontStyle, range, nodeCutter, format, value, domSelection, endNode, domNode) {
        var splitNode = null;
        var startText = range.startContainer.nodeName === '#text' ?
            range.startContainer.textContent.substring(range.startOffset, range.startContainer.textContent.length) :
            range.startContainer.textContent;
        var nodeText = nodes[index].textContent;
        var isParentNodeSameAsParentElement = nodes[0].parentElement.nodeName === nodes[0].parentElement.parentElement.nodeName;
        if (!(range.startContainer === range.endContainer && range.startOffset === 0
            && range.endOffset === range.startContainer.length
            && (range.startContainer.textContent === formatNode.textContent || isParentNodeSameAsParentElement))) {
            var nodeIndex = [];
            var cloneNode = nodes[index];
            var clonedElement = cloneNode;
            do {
                nodeIndex.push(domSelection.getIndex(cloneNode));
                cloneNode = cloneNode.parentNode;
            } while (cloneNode && (cloneNode !== formatNode));
            if (nodes[index].nodeName !== 'BR') {
                if (clonedElement.nodeName === '#text' && clonedElement.textContent.includes('\u200B')) {
                    clonedElement.remove();
                }
                if (!isTableCell) {
                    cloneNode = splitNode = (isCursor && (formatNode.textContent.length - 1) === range.startOffset) ?
                        nodeCutter.SplitNode(range, formatNode, true)
                        : nodeCutter.GetSpliceNode(range, formatNode);
                }
            }
            if (!isCursor) {
                while (cloneNode && cloneNode.childNodes.length > 0 && ((nodeIndex.length - 1) >= 0)
                    && (cloneNode.childNodes.length > nodeIndex[nodeIndex.length - 1])) {
                    if (cloneNode.childNodes.length > 1 && nodeIndex.length > 1) {
                        cloneNode = cloneNode.childNodes[nodeIndex[nodeIndex.length - 2]];
                        break;
                    }
                    else {
                        cloneNode = cloneNode.childNodes[nodeIndex[nodeIndex.length - 1]];
                        nodeIndex.pop();
                    }
                }
                if (nodes[index].nodeName !== 'BR') {
                    while (cloneNode.nodeType === 1 && cloneNode.childNodes.length > 0) {
                        cloneNode = cloneNode.childNodes[0];
                    }
                    if (cloneNode.nodeType === 3 && !(isCursor && cloneNode.nodeValue === '')) {
                        nodes[index] = cloneNode;
                    }
                    else {
                        var divNode = document.createElement('div');
                        divNode.innerHTML = '&#8203;';
                        if (cloneNode.nodeType !== 3) {
                            cloneNode.insertBefore(divNode.firstChild, cloneNode.firstChild);
                            nodes[index] = cloneNode.firstChild;
                        }
                        else {
                            cloneNode.parentNode.insertBefore(divNode.firstChild, cloneNode);
                            nodes[index] = cloneNode.previousSibling;
                            cloneNode.parentNode.removeChild(cloneNode);
                        }
                    }
                }
            }
            else {
                var lastNode = splitNode;
                for (; lastNode.firstChild !== null && lastNode.firstChild.nodeType !== 3; null) {
                    lastNode = lastNode.firstChild;
                }
                lastNode.innerHTML = '&#8203;';
                nodes[index] = lastNode.firstChild;
            }
        }
        else if (isFontStyle && !nodes[index].contains(formatNode) && nodes[index].nodeType === 3 &&
            nodes[index].textContent !== formatNode.textContent) {
            // If the selection is within the format node .
            var isFullNodeSelected = nodes[index].textContent === nodes[index].wholeText;
            var nodeTraverse = nodes[index];
            var styleElement = this.GetFormatNode(format, value);
            // while loop and traverse back until text content does not match with parent text content
            while (nodeTraverse && nodeTraverse.textContent === nodeTraverse.parentElement.textContent) {
                nodeTraverse = nodeTraverse.parentElement;
            }
            if (isFullNodeSelected && formatNode.textContent !== nodeTraverse.textContent) {
                var nodeArray = [];
                var priorityNode = this.getPriorityFormatNode(nodeTraverse, endNode);
                if (priorityNode && priorityNode.textContent === nodeTraverse.textContent) {
                    nodeTraverse = priorityNode;
                }
                nodeArray.push(nodeTraverse);
                this.applyStyles(nodeArray, 0, styleElement);
                return nodes[index];
            }
        }
        var fontStyle;
        if (format === 'backgroundcolor') {
            fontStyle = formatNode.style.fontSize;
        }
        var bgStyle;
        if (format === 'fontsize') {
            var bg = closest(nodes[index].parentElement, 'span[style*=' + 'background-color' + ']');
            if (!isNOU(bg)) {
                bgStyle = bg.style.backgroundColor;
            }
        }
        var formatNodeStyles = formatNode.getAttribute('style');
        var formatNodeTagName = formatNode.tagName;
        var child;
        if (formatNodeTagName === 'A' && format === 'underline') {
            formatNode.style.textDecoration = 'none';
            child = [formatNode];
        }
        else if (IsFormatted.inlineTags.indexOf(formatNodeTagName.toLowerCase()) !== -1 && isFontStyle && formatNodeTagName.toLocaleLowerCase() !== 'span') {
            var fontNodeStyle = formatNode.style;
            if (fontNodeStyle.color && format === 'fontcolor') {
                if (formatNode.nodeName === 'A') {
                    fontNodeStyle.color = value;
                }
                else {
                    fontNodeStyle.color = '';
                }
            }
            else if (fontNodeStyle.backgroundColor && format === 'backgroundcolor') {
                fontNodeStyle.backgroundColor = '';
            }
            else if (fontNodeStyle.fontSize && format === 'fontsize') {
                fontNodeStyle.fontSize = '';
            }
            else if (fontNodeStyle.fontFamily && format === 'fontname') {
                fontNodeStyle.fontFamily = '';
            }
            if (formatNode.getAttribute('style') === '') {
                formatNode.removeAttribute('style');
            }
            child = [formatNode];
        }
        else {
            child = InsertMethods.unwrap(formatNode);
            if (index === 0) {
                this.isUnwrapped = true;
            }
            var liElement = nodes[index].parentElement;
            if (!isNOU(liElement) && liElement.tagName.toLowerCase() !== 'li') {
                liElement = closest(liElement, 'li');
            }
            if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' &&
                (liElement.textContent.trim() === nodes[index].textContent.trim() ||
                    liElement.innerText.split('\n')[0] === nodes[index].textContent.trim())) {
                if (format === 'bold') {
                    liElement.style.fontWeight = '';
                }
                else if (format === 'italic') {
                    liElement.style.fontStyle = '';
                }
                else if (format === 'fontsize') {
                    liElement.style.fontSize = '';
                }
            }
            else if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li'
                && liElement.textContent.trim() !== nodes[index].textContent.trim()) {
                if (format === 'bold') {
                    liElement.style.fontWeight = '';
                }
                else if (format === 'italic') {
                    liElement.style.fontStyle = '';
                }
                SelectionCommands.conCatenateTextNode(liElement, format, '', 'normal', value);
            }
        }
        if (child[0] && !isFontStyle) {
            var nodeTraverse = child[index] ? child[index] : child[0];
            var textNode = nodeTraverse;
            for (; nodeTraverse && nodeTraverse.parentElement && nodeTraverse.parentElement !== endNode; 
            // eslint-disable-next-line
            nodeTraverse = nodeTraverse) {
                var nodeTraverseCondition = void 0;
                if (formatNode.nodeName === 'SPAN') {
                    nodeTraverseCondition = nodeTraverse.parentElement.tagName.toLocaleLowerCase()
                        === formatNode.tagName.toLocaleLowerCase() && nodeTraverse.parentElement.getAttribute('style') === formatNodeStyles;
                }
                else {
                    nodeTraverseCondition = nodeTraverse.parentElement.tagName.toLocaleLowerCase()
                        === formatNode.tagName.toLocaleLowerCase();
                }
                if (nodeTraverse.parentElement && nodeTraverseCondition &&
                    (nodeTraverse.parentElement.childElementCount > 1 || range.startOffset > 1)) {
                    if (textNode.parentElement && textNode.parentElement.tagName.toLocaleLowerCase()
                        === formatNode.tagName.toLocaleLowerCase()) {
                        if ((range.startOffset === range.endOffset) && textNode.nodeType !== 1 &&
                            !isNOU(textNode.textContent) && textNode.parentElement.childElementCount > 1) {
                            range.setStart(textNode, 0);
                            range.setEnd(textNode, textNode.textContent.length);
                            nodeCutter.SplitNode(range, textNode.parentElement, false);
                        }
                    }
                    if (nodeTraverse.parentElement.tagName.toLocaleLowerCase() === 'span') {
                        if (formatNode.style.textDecoration === 'underline' &&
                            nodeTraverse.parentElement.style.textDecoration !== 'underline') {
                            nodeTraverse = nodeTraverse.parentElement;
                            continue;
                        }
                    }
                    InsertMethods.unwrap(nodeTraverse.parentElement);
                    nodeTraverse = !isNOU(nodeTraverse.parentElement) && !domNode.isBlockNode(nodeTraverse.parentElement) ? textNode :
                        nodeTraverse.parentElement;
                }
                else {
                    nodeTraverse = nodeTraverse.parentElement;
                }
            }
        }
        if (child.length > 0 && isFontStyle) {
            for (var num = 0; num < child.length; num++) {
                if (child[num].nodeType !== 3 || (child[num].textContent &&
                    child[num].textContent.trim().length > 0)) {
                    if (value !== '' && value !== 'transparent') {
                        child[num] = InsertMethods.Wrap(child[num], this.GetFormatNode(format, value, formatNodeTagName, formatNodeStyles));
                    }
                    var liElement = nodes[index].parentElement;
                    if (!isNOU(liElement) && liElement.tagName.toLowerCase() !== 'li') {
                        liElement = closest(liElement, 'li');
                    }
                    if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' &&
                        liElement.textContent.trim() === nodes[index].textContent.trim()) {
                        if (format === 'fontname') {
                            liElement.style.fontFamily = value;
                        }
                    }
                    if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li'
                        && liElement.textContent.trim() !== nodes[index].textContent.trim()) {
                        liElement.removeAttribute('style');
                    }
                    if (child[num].textContent === startText && (range.startContainer.nodeName === '#text' || range.startContainer.nodeName !== '#text'
                        && range.startContainer.classList && !range.startContainer.classList.contains('e-multi-cells-select'))) {
                        if (num === 0) {
                            range.setStartBefore(child[num]);
                        }
                        else if (num === child.length - 1) {
                            range.setEndAfter(child[num]);
                        }
                    }
                }
            }
            var currentNodeElem = nodes[index].parentElement;
            if (!isNOU(fontStyle) && fontStyle !== '') {
                currentNodeElem.style.fontSize = fontStyle;
            }
            if (!isNOU(bgStyle) && bgStyle !== '') {
                currentNodeElem.style.backgroundColor = bgStyle;
            }
            if (format === 'fontsize' || format === 'fontcolor' || format === 'fontname') {
                var liElement = nodes[index].parentElement;
                var parentElement = nodes[index].parentElement;
                while (!isNOU(parentElement) && parentElement.tagName.toLowerCase() !== 'li') {
                    parentElement = parentElement.parentElement;
                    liElement = parentElement;
                }
                var num = index;
                var liChildContent = '';
                while (num >= 0 && !isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' && liElement.contains(nodes[num]) &&
                    liElement.textContent.replace('/\u200B/g', '').trim().includes(nodes[num].textContent.trim())) {
                    /* eslint-enable security/detect-object-injection */
                    liChildContent = nodes[num].textContent + liChildContent;
                    num--;
                }
                var isNestedList = false;
                var nestedListCount = 0;
                var isNestedListItem = false;
                if (!isNOU(liElement) && liElement.childNodes) {
                    for (var num_1 = 0; num_1 < liElement.childNodes.length; num_1++) {
                        if (liElement.childNodes[num_1].nodeName === 'OL' || liElement.childNodes[num_1].nodeName === 'UL') {
                            nestedListCount++;
                            isNestedList = true;
                        }
                    }
                }
                if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' &&
                    liElement.textContent.split('\u200B').join('').trim() === liChildContent.split('\u200B').join('').trim()) {
                    if (format === 'fontsize') {
                        liElement.style.fontSize = value;
                    }
                    else if (format === 'fontname') {
                        liElement.removeAttribute('style');
                    }
                    else {
                        liElement.style.color = value;
                        liElement.style.textDecoration = 'inherit';
                    }
                }
                else if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' && isNestedList) {
                    if (isNestedList && nestedListCount > 0) {
                        for (var num_2 = 0; num_2 < liElement.childNodes.length; num_2++) {
                            if (nodes[index].textContent === liElement.childNodes[num_2].textContent && nodes[index].textContent === nodeText && liElement.textContent.replace('/\u200B/g', '').trim().includes(liChildContent.split('\u200B').join('').trim())) {
                                isNestedListItem = true;
                            }
                        }
                    }
                    if (isNestedListItem) {
                        for (var num_3 = 0; num_3 < liElement.childNodes.length; num_3++) {
                            if (liElement.childNodes[num_3].nodeName === 'OL' || liElement.childNodes[num_3].nodeName === 'UL') {
                                liElement.childNodes[num_3].removeAttribute('style');
                            }
                        }
                        if (format === 'fontsize') {
                            liElement.style.fontSize = value;
                        }
                        else if (format === 'fontname') {
                            liElement.removeAttribute('style');
                        }
                        else {
                            liElement.style.color = value;
                            liElement.style.textDecoration = 'inherit';
                        }
                    }
                }
            }
        }
        return nodes[index];
    };
    SelectionCommands.insertFormat = function (docElement, nodes, index, formatNode, isCursor, isTableSelect, isFormat, isFontStyle, range, nodeCutter, format, value, painterValues, domNode, endNode) {
        if (!isCursor) {
            if ((formatNode === null && isFormat) || isFontStyle) {
                if (!isTableSelect && nodes[index].nodeName !== 'BR') {
                    nodes[index] = nodeCutter.GetSpliceNode(range, nodes[index]);
                    nodes[index].textContent = nodeCutter.TrimLineBreak(nodes[index].textContent);
                }
                if (format === 'uppercase' || format === 'lowercase') {
                    nodes[index].textContent = (format === 'uppercase') ? nodes[index].textContent.toLocaleUpperCase()
                        : nodes[index].textContent.toLocaleLowerCase();
                }
                else if (!(isFontStyle === true && value === '')) {
                    var element = this.GetFormatNode(format, value);
                    if (value === 'formatPainter' || isFontStyle) {
                        var liElement = nodes[index].parentElement;
                        var parentElement = nodes[index].parentElement;
                        while (!isNOU(parentElement) && parentElement.tagName.toLowerCase() !== 'li') {
                            parentElement = parentElement.parentElement;
                            liElement = parentElement;
                        }
                        if (format === 'fontcolor' || format === 'fontname' || format === 'fontsize') {
                            var parentElem = nodes[index].parentElement;
                            if (!isNOU(parentElem) && parentElem.childNodes) {
                                for (var i = 0; i < parentElem.childNodes.length; i++) {
                                    if (this.concatenateTextExcludingList(nodes, index) === nodes[index].textContent) {
                                        var liElement_1 = void 0;
                                        if (parentElem.tagName === 'LI') {
                                            liElement_1 = parentElem;
                                        }
                                        else if (parentElem.closest('li')) {
                                            liElement_1 = parentElem.closest('li');
                                        }
                                        if (!isNOU(liElement_1)) {
                                            switch (format) {
                                                case 'fontcolor':
                                                    liElement_1.style.color = value;
                                                    break;
                                                case 'fontname':
                                                    liElement_1.style.fontFamily = value;
                                                    break;
                                                case 'fontsize':
                                                    liElement_1.style.fontSize = value;
                                                    break;
                                                default:
                                                    break;
                                            }
                                        }
                                    }
                                    var childElement = parentElem.childNodes[i];
                                    if (childElement.tagName === 'OL' || childElement.tagName === 'UL') {
                                        switch (format) {
                                            case 'fontcolor':
                                                childElement.style.color = 'initial';
                                                break;
                                            case 'fontname':
                                                childElement.style.fontFamily = 'initial';
                                                break;
                                            case 'fontsize':
                                                childElement.style.fontSize = 'initial';
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                        }
                        if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' &&
                            liElement.textContent.trim() === nodes[index].textContent.trim()) {
                            if (format === 'fontsize') {
                                liElement.style.fontSize = value;
                            }
                            else if (format === 'fontcolor') {
                                liElement.style.color = value;
                                liElement.style.textDecoration = 'inherit';
                            }
                            else if (format === 'fontname') {
                                liElement.style.fontFamily = value;
                            }
                        }
                        if (value === 'formatPainter') {
                            return this.insertFormatPainterElem(nodes, index, range, nodeCutter, painterValues, domNode);
                        }
                        var currentNode = nodes[index];
                        var priorityNode = this.getPriorityFormatNode(currentNode, endNode);
                        // 1. Checking is there any priority node present in the selection range. (Use case for nested styles);
                        // 2  Or font style is applied. (Use case not a nested style)
                        if (!isNOU(priorityNode) || isFontStyle) {
                            var currentFormatNode = isNOU(priorityNode) ? currentNode : priorityNode;
                            currentFormatNode = !isNOU(priorityNode) && priorityNode.style.fontSize !== '' ?
                                currentFormatNode.firstChild : currentFormatNode;
                            if (isNOU(priorityNode) || format === 'fontsize') {
                                while (currentFormatNode) {
                                    var isSameTextContent = currentFormatNode.parentElement.textContent.trim()
                                        === nodes[index].textContent.trim();
                                    var parent_1 = currentFormatNode.parentElement;
                                    if (!domNode.isBlockNode(parent_1) && isSameTextContent &&
                                        !(parent_1.nodeName === 'SPAN' && parent_1.classList.contains('e-img-inner'))) {
                                        currentFormatNode = parent_1;
                                    }
                                    else {
                                        break;
                                    }
                                }
                            }
                            var nodeList = [];
                            // Since color is different for different themnes, we need to wrap the fontColor over the text node.
                            if (format === 'fontcolor') {
                                var closestAnchor = closest(nodes[index].parentElement, 'A');
                                if (!isNOU(closestAnchor) && closestAnchor.firstChild.textContent.trim()
                                    === nodes[index].textContent.trim()) {
                                    currentFormatNode = nodes[index];
                                }
                            }
                            if (nodes[index].textContent.trim() !== currentFormatNode.textContent.trim()) {
                                currentFormatNode = nodes[index];
                            }
                            nodeList[0] = currentFormatNode;
                            this.applyStyles(nodeList, 0, element);
                            if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li'
                                && liElement.textContent.trim() !== nodes[index].textContent.trim()) {
                                SelectionCommands.conCatenateTextNode(liElement, format, liElement.textContent, format, value);
                            }
                        }
                        else {
                            nodes[index] = this.applyStyles(nodes, index, element);
                        }
                    }
                    else {
                        var liElement = nodes[index].parentElement;
                        nodes[index] = this.applyStyles(nodes, index, element);
                        if (!isNOU(liElement) && liElement.tagName.toLowerCase() !== 'li') {
                            liElement = closest(liElement, 'li');
                        }
                        if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li' &&
                            (liElement.textContent.trim() === nodes[index].textContent.trim() ||
                                liElement.innerText.split('\n')[0] === nodes[index].textContent.trim())) {
                            if (format === 'bold') {
                                liElement.style.fontWeight = 'bold';
                            }
                            else if (format === 'italic') {
                                liElement.style.fontStyle = 'italic';
                            }
                        }
                        else if (!isNOU(liElement) && liElement.tagName.toLowerCase() === 'li'
                            && liElement.textContent.trim() !== nodes[index].textContent.trim()) {
                            SelectionCommands.conCatenateTextNode(liElement, format, liElement.textContent, format);
                        }
                    }
                }
            }
            else {
                if (!isTableSelect && nodes[index].isConnected) {
                    nodes[index] = nodeCutter.GetSpliceNode(range, nodes[index]);
                }
            }
        }
        else {
            if (format !== 'uppercase' && format !== 'lowercase') {
                var element = this.getInsertNode(docElement, range, format, value);
                nodes[index] = element.firstChild;
                nodeCutter.position = 1;
            }
            else {
                nodeCutter.position = range.startOffset;
            }
        }
        return nodes[index];
    };
    SelectionCommands.applyStyles = function (nodes, index, element) {
        if (!(nodes[index].nodeName === 'BR' && this.enterAction === 'BR')) {
            nodes[index] = (index === (nodes.length - 1)) || nodes[index].nodeName === 'BR' ?
                InsertMethods.Wrap(nodes[index], element)
                : InsertMethods.WrapBefore(nodes[index], element, true);
            nodes[index] = this.getChildNode(nodes[index], element);
        }
        return nodes[index];
    };
    SelectionCommands.getPriorityFormatNode = function (node, endNode) {
        var isFormatted = new IsFormatted();
        var fontSizeNode = isFormatted.getFormattedNode(node, 'fontsize', endNode);
        var fontColorNode;
        var backgroundColorNode;
        var fontNameNode;
        if (isNOU(fontSizeNode)) {
            backgroundColorNode = isFormatted.getFormattedNode(node, 'backgroundcolor', endNode);
            if (isNOU(backgroundColorNode)) {
                fontNameNode = isFormatted.getFormattedNode(node, 'fontname', endNode);
                if (isNOU(fontNameNode)) {
                    fontColorNode = isFormatted.getFormattedNode(node, 'fontcolor', endNode);
                    if (isNOU(fontColorNode)) {
                        return null;
                    }
                    else {
                        return fontColorNode;
                    }
                }
                else {
                    return fontNameNode;
                }
            }
            else {
                return backgroundColorNode;
            }
        }
        else {
            return fontSizeNode;
        }
    };
    SelectionCommands.getInsertNode = function (docElement, range, format, value) {
        var element = this.GetFormatNode(format, value);
        element.innerHTML = '&#8203;';
        if (Browser.isIE) {
            var frag = docElement.createDocumentFragment();
            frag.appendChild(element);
            range.insertNode(frag);
        }
        else {
            range.insertNode(element);
        }
        return element;
    };
    SelectionCommands.getChildNode = function (node, element) {
        if (node === undefined || node === null) {
            element.innerHTML = '&#8203;';
            node = element.firstChild;
        }
        return node;
    };
    SelectionCommands.applySelection = function (nodes, domSelection, nodeCutter, index, isCollapsed) {
        if (nodes.length === 1 && !isCollapsed) {
            domSelection.startContainer = domSelection.getNodeArray(nodes[index], true);
            domSelection.endContainer = domSelection.startContainer;
            domSelection.startOffset = 0;
            domSelection.endOffset = nodes[index].textContent.length;
        }
        else if (nodes.length === 1 && isCollapsed) {
            domSelection.startContainer = domSelection.getNodeArray(nodes[index], true);
            domSelection.endContainer = domSelection.startContainer;
            domSelection.startOffset = nodeCutter.position;
            domSelection.endOffset = nodeCutter.position;
        }
        else if (index === 0) {
            domSelection.startContainer = domSelection.getNodeArray(nodes[index], true);
            domSelection.startOffset = 0;
        }
        else if (index === nodes.length - 1) {
            domSelection.endContainer = domSelection.getNodeArray(nodes[index], false);
            domSelection.endOffset = nodes[index].textContent.length;
        }
        return domSelection;
    };
    SelectionCommands.GetFormatNode = function (format, value, tagName, styles) {
        var node;
        switch (format) {
            case 'bold':
                return document.createElement('strong');
            case 'italic':
                return document.createElement('em');
            case 'underline':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.textDecoration = 'underline';
                return node;
            case 'strikethrough':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.textDecoration = 'line-through';
                return node;
            case 'superscript':
                return document.createElement('sup');
            case 'subscript':
                return document.createElement('sub');
            case 'fontcolor':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.color = value;
                node.style.textDecoration = 'inherit';
                return node;
            case 'fontname':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.fontFamily = value;
                return node;
            case 'fontsize':
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.fontSize = value;
                return node;
            case 'inlinecode':
                return document.createElement('code');
            default:
                node = document.createElement('span');
                this.updateStyles(node, tagName, styles);
                node.style.backgroundColor = value;
                return node;
        }
    };
    SelectionCommands.updateStyles = function (ele, tag, styles) {
        if (styles !== null && tag === 'SPAN') {
            ele.style.cssText = styles;
        }
    };
    // Below function is used to insert the element created by the format painter plugin.
    SelectionCommands.insertFormatPainterElem = function (nodes, index, range, nodeCutter, painterValues, domNode) {
        var parent = !domNode.isBlockNode(nodes[index].parentElement) ?
            nodes[index].parentElement : nodes[index];
        if (!domNode.isBlockNode(parent)) {
            while (parent.textContent.trim() === parent.parentElement.textContent.trim() && !domNode.isBlockNode(parent.parentElement)) {
                parent = parent.parentElement;
            }
        }
        // The below code is used to remove the already present inline style from the text node.
        if (!isNOU(parent) && parent.nodeType === 1 && !(parent.classList.contains('e-rte-img-caption') || parent.classList.contains('e-img-inner'))) {
            this.formatPainterCleanup(index, nodes, parent, range, nodeCutter, domNode);
        }
        var elem = painterValues.element;
        // The below code is used to apply the inline format copied.
        if (!isNOU(elem)) {
            // Step 1: Cloning the element that is created by format painter.
            // Step 2: Finding the last child of the nested elememt using the paintervalues.lastchild nodename
            // Step 3: Assigning the nodes[index] text content to the last child element.
            // Step 4: Wrapping the cloned element with the nodes[index]
            var clonedElement = elem.cloneNode(true);
            var elemList = clonedElement.querySelectorAll(painterValues.lastChild.nodeName);
            var lastElement = void 0;
            if (elemList.length > 0) {
                lastElement = elemList[elemList.length - 1];
            }
            else {
                if (!isNOU(clonedElement) && clonedElement.nodeName === painterValues.lastChild.nodeName) {
                    lastElement = clonedElement;
                }
            }
            lastElement.textContent = nodes[index].textContent;
            var lastChild = lastElement.childNodes[0];
            nodes[index] = InsertMethods.Wrap(nodes[index], clonedElement);
            nodes[index].textContent = '';
            nodes[index] = lastChild;
        }
        return nodes[index];
    };
    SelectionCommands.formatPainterCleanup = function (index, nodes, parent, range, nodeCutter, domNode) {
        var INVALID_TAGS = ['A', 'AUDIO', 'IMG', 'VIDEO', 'IFRAME'];
        if (index === 0 && parent.textContent.trim() !== nodes[index].textContent.trim()) {
            nodeCutter.SplitNode(range, parent, true);
            var childELemList = nodes[index].parentElement.childNodes;
            for (var i = 0; i < childELemList.length; i++) {
                if (childELemList[i].textContent.trim() === nodes[i].textContent.trim()) {
                    parent.parentNode.insertBefore(childELemList[i], parent);
                    break;
                }
            }
            var blockChildNodes = parent.parentElement.childNodes;
            for (var k = 0; k < blockChildNodes.length; k++) {
                if ((blockChildNodes[k].textContent.trim() === '' || blockChildNodes[k].textContent.length === 0) &&
                    blockChildNodes[k].textContent.charCodeAt(0) !== 160) {
                    // 160 is the char code for &nbsp;
                    detach(blockChildNodes[k]);
                }
            }
        }
        else if (parent.textContent.trim() !== nodes[index].textContent.trim()) {
            parent.parentElement.insertBefore(nodes[index], parent);
        }
        else {
            while (!isNOU(parent) && parent.nodeType !== 3 && !domNode.isBlockNode(parent)) {
                var temp = void 0;
                for (var i = 0; i < parent.childNodes.length; i++) {
                    var currentChild = parent.childNodes[i];
                    if (currentChild.textContent.trim().length !== 0 && currentChild.nodeType !== 3) {
                        temp = parent.childNodes[i];
                    }
                }
                if (INVALID_TAGS.indexOf(parent.tagName) === -1) {
                    InsertMethods.unwrap(parent);
                }
                parent = temp;
            }
        }
    };
    SelectionCommands.concatenateTextExcludingList = function (nodes, index) {
        var result = '';
        var parentNode = nodes[index].nodeName === '#text' ? closest(nodes[index].parentElement, 'li') : closest(nodes[index], 'li');
        if (!isNOU(parentNode)) {
            for (var i = 0; i < parentNode.childNodes.length; i++) {
                var childNode = parentNode.childNodes[i];
                if ((childNode.nodeType === 3) || (childNode.nodeType === 1 && (childNode.tagName !== 'OL' && childNode.tagName !== 'UL'))) {
                    result += childNode.textContent;
                }
            }
        }
        return result;
    };
    SelectionCommands.conCatenateTextNode = function (liElement, format, value, formatStr, constVal) {
        var result = '';
        var colorStyle = '';
        var fontSize = '';
        var fontFamily = '';
        switch (format) {
            case 'bold':
                liElement.querySelectorAll('strong').forEach(function (e) {
                    result = result + e.textContent;
                });
                if (result === value) {
                    liElement.style.fontWeight = formatStr;
                }
                break;
            case 'italic':
                liElement.querySelectorAll('em').forEach(function (e) {
                    result = result + e.textContent;
                });
                if (result === value) {
                    liElement.style.fontStyle = formatStr;
                }
                break;
            case 'fontcolor':
                liElement.querySelectorAll('span').forEach(function (span) {
                    colorStyle = span.style.color;
                    if (SelectionCommands.hasColorsEqual(colorStyle, constVal)) {
                        result = result + span.textContent;
                    }
                });
                if (!isNOU(result) && !isNOU(value) && result !== '' && value !== '' && result.replace(/\s+/g, '') === value.replace(/\s+/g, '')) {
                    liElement.style.color = constVal;
                    liElement.style.textDecoration = 'inherit';
                }
                break;
            case 'fontsize':
                liElement.querySelectorAll('span').forEach(function (span) {
                    fontSize = span.style.getPropertyValue('font-size');
                    if (fontSize === constVal) {
                        result = result + span.textContent;
                    }
                });
                if (!isNOU(result) && !isNOU(value) && result !== '' && value !== '' && result.replace(/\s+/g, '') === value.replace(/\s+/g, '')) {
                    liElement.style.fontSize = constVal;
                }
                break;
            case 'fontname':
                liElement.querySelectorAll('span').forEach(function (span) {
                    fontFamily = span.style.getPropertyValue('font-family');
                    fontFamily = fontFamily.replace(/ /g, '');
                    if (fontFamily === constVal) {
                        result = result + span.textContent;
                    }
                });
                if (!isNOU(result) && !isNOU(value) && result !== '' && value !== '' && result.replace(/\s+/g, '') === value.replace(/\s+/g, '')) {
                    liElement.style.fontFamily = constVal;
                }
                break;
        }
    };
    SelectionCommands.hasColorsEqual = function (color1, color2) {
        if (isNOU(color1) || isNOU(color2) || color1.trim() === '' || color2.trim() === '') {
            return color1 === color2;
        }
        if (color1.startsWith('rgb(')) {
            color1 = color1.replace('rgb(', 'rgba(').slice(0, -1) + ',1)';
        }
        if (color2.startsWith('rgb(')) {
            color2 = color2.replace('rgb(', 'rgba(').slice(0, -1) + ',1)';
        }
        return color1.replace(/\s+/g, '') === color2.replace(/\s+/g, '');
    };
    SelectionCommands.isMentionStartOrEnd = function (editableElement, start, end) {
        var type = 'None';
        var domTree = new DOMMethods(editableElement);
        var startParent = domTree.getTopMostNode(start);
        var endParent = domTree.getTopMostNode(end);
        if ((startParent.nodeType === Node.ELEMENT_NODE && !startParent.isContentEditable) &&
            (endParent.nodeType === Node.ELEMENT_NODE && !endParent.isContentEditable)) {
            type = 'Both';
        }
        if (startParent.nodeType === Node.ELEMENT_NODE && !startParent.isContentEditable) {
            type = 'Start';
        }
        if (endParent.nodeType === Node.ELEMENT_NODE && !endParent.isContentEditable) {
            type = 'End';
        }
        return type;
    };
    SelectionCommands.enterAction = 'P';
    SelectionCommands.isUnwrapped = false;
    SelectionCommands.isWrapped = false;
    SelectionCommands.userAgentData = new CustomUserAgentData(Browser.userAgent, false);
    return SelectionCommands;
}());
export { SelectionCommands };
