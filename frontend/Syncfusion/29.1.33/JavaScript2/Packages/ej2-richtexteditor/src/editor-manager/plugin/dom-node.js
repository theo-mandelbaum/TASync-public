import * as CONSTANT from './../base/constant';
import { append, detach, createElement, isNullOrUndefined as isNOU, closest } from '@syncfusion/ej2-base';
import { NodeSelection } from './../../selection/index';
import { selfClosingTags } from '../../common/config';
import { getLastTextNode } from '../../common/util';
import { TableSelection } from './table-selection';
export var markerClassName = {
    startSelection: 'e-editor-select-start',
    endSelection: 'e-editor-select-end'
};
/**
 * DOMNode internal plugin
 *
 * @hidden
 * @deprecated
 */
var DOMNode = /** @class */ (function () {
    /**
     * Constructor for creating the DOMNode plugin
     *
     * @param {Element} parent - specifies the parent element
     * @param {Document} currentDocument - specifies the current document.
     * @hidden
     * @deprecated
     */
    function DOMNode(parent, currentDocument) {
        this.parent = parent;
        this.nodeSelection = new NodeSelection(parent);
        this.currentDocument = currentDocument;
        this.tableSelection = new TableSelection(parent, currentDocument);
    }
    /**
     * contents method
     *
     * @param {Element} element - specifies the element.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.contents = function (element) {
        return (element && 'IFRAME' !== element.tagName ? Array.prototype.slice.call(element.childNodes || []) : []);
    };
    /**
     * isBlockNode method
     *
     * @param {Element} element - specifies the node element.
     * @returns {boolean} - sepcifies the boolean value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.isBlockNode = function (element) {
        return (!!element && (element.nodeType === Node.ELEMENT_NODE && CONSTANT.BLOCK_TAGS.indexOf(element.tagName.toLowerCase()) >= 0));
    };
    /**
     * isLink method
     *
     * @param {Element} element - specifies the element
     * @returns {boolean} -  specifies the boolean value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.isLink = function (element) {
        return (!!element && (element.nodeType === Node.ELEMENT_NODE && 'a' === element.tagName.toLowerCase()));
    };
    /**
     * blockParentNode method
     *
     * @param {Element} element - specifies the element
     * @returns {Element} - returns the element value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.blockParentNode = function (element) {
        for (; element && element.parentNode !== this.parent && ((!element.parentNode ||
            !this.hasClass(element.parentNode, 'e-node-inner'))); null) {
            element = element.parentNode;
            if (this.isBlockNode(element)) {
                return element;
            }
        }
        return element;
    };
    /**
     * rawAttributes method
     *
     * @param {Element} element - specifies the element
     * @returns {string} - returns the string value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.rawAttributes = function (element) {
        var rawAttr = {};
        var attributes = element.attributes;
        if (attributes.length > 0) {
            for (var d = 0; d < attributes.length; d++) {
                var e = attributes[d];
                rawAttr[e.nodeName] = e.value;
            }
        }
        return rawAttr;
    };
    /**
     * attributes method
     *
     * @param {Element} element - sepcifies the element.
     * @returns {string} - returns the string value.
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.attributes = function (element) {
        if (!element) {
            return '';
        }
        var attr = '';
        var rawAttr = this.rawAttributes(element);
        var orderRawAttr = Object.keys(rawAttr).sort();
        for (var e = 0; e < orderRawAttr.length; e++) {
            var attrKey = orderRawAttr[e];
            var attrValue = rawAttr["" + attrKey];
            /* eslint-disable */
            if (attrValue.indexOf("'") < 0 && attrValue.indexOf('"') >= 0) {
                attr += ' ' + attrKey + "='" + attrValue + "'";
            }
            else if (attrValue.indexOf('"') >= 0 && attrValue.indexOf("'") >= 0) {
                /* eslint-enable */
                attrValue = attrValue.replace(/"/g, '&quot;');
                attr += ' ' + attrKey + '="' + attrValue + '"';
            }
            else {
                attr += ' ' + attrKey + '="' + attrValue + '"';
            }
        }
        return attr;
    };
    /**
     * clearAttributes method
     *
     * @param {Element} element - specifies the element
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.clearAttributes = function (element) {
        for (var attr = element.attributes, c = attr.length - 1; c >= 0; c--) {
            var key = attr[c];
            element.removeAttribute(key.nodeName);
        }
    };
    /**
     * openTagString method
     *
     * @param {Element} element - specifies the element.
     * @returns {string} - returns the string
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.openTagString = function (element) {
        return '<' + element.tagName.toLowerCase() + this.attributes(element) + '>';
    };
    /**
     * closeTagString method
     *
     * @param {Element} element - specifies the element
     * @returns {string} - returns the string value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.closeTagString = function (element) {
        return '</' + element.tagName.toLowerCase() + '>';
    };
    /**
     * createTagString method
     *
     * @param {string} tagName - specifies the tag name
     * @param {Element} relativeElement - specifies the relative element
     * @param {string} innerHTML - specifies the string value
     * @returns {string} - returns the string value.
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.createTagString = function (tagName, relativeElement, innerHTML) {
        return '<' + tagName.toLowerCase() + this.attributes(relativeElement) + '>' + innerHTML + '</' + tagName.toLowerCase() + '>';
    };
    /**
     * isList method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.isList = function (element) {
        return !!element && ['UL', 'OL'].indexOf(element.tagName) >= 0;
    };
    /**
     * isElement method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.isElement = function (element) {
        return element === this.parent;
    };
    /**
     * isEditable method
     *
     * @param {Element} element - specifes the element.
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.isEditable = function (element) {
        return ((!element.getAttribute || element.getAttribute('contenteditable') === 'true')
            && ['STYLE', 'SCRIPT'].indexOf(element.tagName) < 0);
    };
    /**
     * hasClass method
     *
     * @param {Element} element - specifes the element.
     * @param {string} className - specifies the class name value
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.hasClass = function (element, className) {
        return element && element.classList && element.classList.contains(className);
    };
    /**
     * replaceWith method
     *
     * @param {Element} element - specifes the element.
     * @param {string} value - specifies the string value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.replaceWith = function (element, value) {
        var parentNode = element.parentNode;
        parentNode.insertBefore(this.parseHTMLFragment(value), element);
        detach(element);
    };
    /**
     * parseHTMLFragment method
     *
     * @param {string} value - specifies the string value
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.parseHTMLFragment = function (value) {
        /* eslint-disable */
        var temp = createElement('template');
        temp.innerHTML = value;
        if (temp.content instanceof DocumentFragment) {
            return temp.content;
        }
        else {
            return document.createRange().createContextualFragment(value);
        }
        /* eslint-enable */
    };
    /**
     * wrap method
     *
     * @param {Element} element - specifies the element
     * @param {Element} wrapper - specifies the element.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.wrap = function (element, wrapper) {
        element.parentNode.insertBefore(wrapper, element);
        wrapper = element.previousSibling;
        wrapper.appendChild(element);
        return wrapper;
    };
    /**
     * insertAfter method
     *
     * @param {Element} newNode - specifies the new node element
     * @param {Element} referenceNode - specifies the referenece node
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.insertAfter = function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    };
    /**
     * wrapInner method
     *
     * @param {Element} parent - specifies the parent element.
     * @param {Element} wrapper - specifies the wrapper element.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.wrapInner = function (parent, wrapper) {
        parent.appendChild(wrapper);
        wrapper = parent.querySelector('.e-rte-wrap-inner');
        wrapper.classList.remove('e-rte-wrap-inner');
        if (wrapper.classList.length === 0) {
            wrapper.removeAttribute('class');
        }
        while (parent.firstChild !== wrapper) {
            wrapper.appendChild(parent.firstChild);
        }
        return wrapper;
    };
    /**
     * unWrap method
     *
     * @param {Element} element - specifies the element.
     * @returns {Element} - returns the element.
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.unWrap = function (element) {
        var parent = element && element.parentNode;
        if (!parent) {
            return [];
        }
        var unWrapNode = [];
        while (element.firstChild && (element.textContent !== ' ')) {
            unWrapNode.push(element.firstChild);
            parent.insertBefore(element.firstChild, element);
        }
        unWrapNode = unWrapNode.length > 0 ? unWrapNode : [element.parentNode];
        parent.removeChild(element);
        return unWrapNode;
    };
    /**
     * getSelectedNode method
     *
     * @param {Element} element - specifies the element
     * @param {number} index - specifies the index value.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.getSelectedNode = function (element, index) {
        if (element.nodeType === Node.ELEMENT_NODE && element.childNodes.length > 0 &&
            element.childNodes[index - 1] && element.childNodes[index - 1].nodeType === Node.ELEMENT_NODE &&
            (element.childNodes[index - 1].classList.contains(markerClassName.startSelection) ||
                element.childNodes[index - 1].classList.contains(markerClassName.endSelection))) {
            element = element.childNodes[index - 1];
        }
        else if (element.nodeType === Node.ELEMENT_NODE && element.childNodes.length > 0 && element.childNodes[index]) {
            element = element.childNodes[index];
        }
        if (element.nodeType === Node.TEXT_NODE) {
            element = element.parentNode;
        }
        return element;
    };
    /**
     * nodeFinds method
     *
     * @param {Element} element - specifies the element.
     * @param {Element[]} elements - specifies the array of elements
     * @returns {Element[]} - returnts the array elements
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.nodeFinds = function (element, elements) {
        var existNodes = [];
        for (var i = 0; i < elements.length; i++) {
            if (element.contains(elements[i]) && element !== elements[i]) {
                existNodes.push(elements[i]);
            }
        }
        return existNodes;
    };
    /**
     * isEditorArea method
     *
     * @returns {boolean} - returns the boolean value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.isEditorArea = function () {
        var range = this.getRangePoint(0);
        var element;
        for (element = range.commonAncestorContainer; element && !this.isElement(element); null) {
            element = element.parentNode;
        }
        return !!this.isElement(element);
    };
    /**
     * getRangePoint method
     *
     * @param {number} point - specifies the number value.
     * @returns {Range} - returns the range.
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.getRangePoint = function (point) {
        var selection = this.getSelection();
        var ranges = [];
        if (selection && selection.getRangeAt && selection.rangeCount) {
            ranges = [];
            for (var f = 0; f < selection.rangeCount; f++) {
                ranges.push(selection.getRangeAt(f));
            }
        }
        else {
            ranges = [this.currentDocument.createRange()];
        }
        return 'undefined' !== typeof point ? ranges[point] : ranges;
    };
    DOMNode.prototype.getSelection = function () {
        return this.nodeSelection.get(this.currentDocument);
    };
    /**
     * getPreviousNode method
     *
     * @param {Element} element - specifies the element
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.getPreviousNode = function (element) {
        element = element.previousElementSibling;
        for (; element && element.textContent === '\n'; null) {
            element = element.previousElementSibling;
        }
        return element;
    };
    /**
     * encode method
     *
     * @param {string} value - specifies the string value
     * @returns {string} - specifies the string value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.encode = function (value) {
        var divNode = document.createElement('div');
        divNode.innerText = value;
        // eslint-disable-next-line
        return divNode.innerHTML.replace(/<br\s*[\/]?>/gi, '\n');
    };
    /**
     * saveMarker method
     *
     * @param {NodeSelection} save - specifies the node selection,
     * @returns {NodeSelection} - returns the value
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.saveMarker = function (save) {
        var start = this.parent.querySelector('.' + markerClassName.startSelection);
        var end = this.parent.querySelector('.' + markerClassName.endSelection);
        var startTextNode;
        var endTextNode;
        if (this.hasClass(start, markerClassName.startSelection) && start.classList.length > 1) {
            var replace = this.createTagString(CONSTANT.DEFAULT_TAG, start, this.encode(start.textContent));
            this.replaceWith(start, replace);
            start = this.parent.querySelector('.' + markerClassName.startSelection);
            start.classList.remove(markerClassName.startSelection);
            startTextNode = start.childNodes[0];
        }
        else {
            startTextNode = this.unWrap(start)[0];
        }
        if (this.hasClass(end, markerClassName.endSelection) && end.classList.length > 1) {
            var replace = this.createTagString(CONSTANT.DEFAULT_TAG, end, this.encode(end.textContent));
            this.replaceWith(end, replace);
            end = this.parent.querySelector('.' + markerClassName.endSelection);
            end.classList.remove(markerClassName.endSelection);
            endTextNode = end.childNodes[0];
        }
        else {
            endTextNode = end ? this.unWrap(end)[0] : startTextNode;
        }
        save.startContainer = save.getNodeArray(startTextNode, true);
        save.endContainer = save.getNodeArray(endTextNode, false);
        return save;
    };
    DOMNode.prototype.marker = function (className, textContent) {
        return '<span class="' + className + '">' + textContent + '</span>';
    };
    /**
     * setMarker method
     *
     * @param {NodeSelection} save - specifies the node selection.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.setMarker = function (save) {
        var range = save.range;
        var startChildNodes = range.startContainer.childNodes;
        var isTableStart = startChildNodes.length > 1 && startChildNodes[0].nodeName === 'TABLE' && range.startOffset === 0;
        var isImgOnlySelected = startChildNodes.length > 1 && startChildNodes[0].nodeName === 'IMAGE' &&
            range.endOffset === 1 && range.endContainer.nodeName === '#text' && range.endContainer.textContent.length === 0;
        var start = ((isTableStart ? getLastTextNode(startChildNodes[range.startOffset + 1]) :
            startChildNodes[(range.startOffset > 0) ? (range.startOffset - 1) : range.startOffset]) || range.startContainer);
        var end = (range.endContainer.childNodes[(range.endOffset > 0) ? (isImgOnlySelected ? range.endOffset :
            (range.endOffset - 1)) : range.endOffset] || range.endContainer);
        if ((start.nodeType === Node.ELEMENT_NODE && end.nodeType === Node.ELEMENT_NODE) && (start.contains(end) || end.contains(start))) {
            var existNode = start.contains(end) ? start : end;
            var isElement = existNode.nodeType !== Node.TEXT_NODE;
            if (isElement) {
                var nodes = [];
                var textNodes = [];
                for (var node = existNode; existNode.contains(node); null) {
                    if (nodes.indexOf(node) < 0 && node.childNodes && node.childNodes.length) {
                        nodes.push(node);
                        node = node.childNodes[0];
                    }
                    else if (node.nextSibling) {
                        node = node.nextSibling;
                    }
                    else if (node.parentNode) {
                        node = node.parentNode;
                        nodes.push(node);
                    }
                    if (textNodes.indexOf(node) < 0 && (node.nodeType === Node.TEXT_NODE ||
                        (CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.parentNode.tagName.toLocaleLowerCase()) >= 0
                            && (node.tagName === 'BR' || node.tagName === 'IMG')))) {
                        textNodes.push(node);
                    }
                }
                if (textNodes.length) {
                    start = start.contains(end) ? textNodes[0] : start;
                    end = textNodes[textNodes.length - 1];
                }
            }
        }
        if (start !== end) {
            if (start.nodeType !== Node.TEXT_NODE && ((start.tagName === 'BR' &&
                CONSTANT.IGNORE_BLOCK_TAGS.indexOf(start.parentNode.tagName.toLocaleLowerCase()) >= 0) ||
                start.tagName === 'IMG')) {
                this.replaceWith(start, this.marker(markerClassName.startSelection, this.encode(start.textContent)));
                var markerStart = range.startContainer.querySelector('.' + markerClassName.startSelection);
                markerStart.appendChild(start);
            }
            else {
                if (start.nodeType !== 3 && start.nodeName !== '#text' && start.nodeName !== 'BR') {
                    var marker = this.marker(markerClassName.startSelection, '');
                    append([this.parseHTMLFragment(marker)], start);
                }
                else {
                    this.replaceWith(start, this.marker(markerClassName.startSelection, this.encode(start.textContent)));
                }
            }
            if (end.nodeType !== Node.TEXT_NODE && end.tagName === 'BR' &&
                CONSTANT.IGNORE_BLOCK_TAGS.indexOf(end.parentNode.tagName.toLocaleLowerCase()) >= 0) {
                this.replaceWith(end, this.marker(markerClassName.endSelection, this.encode(end.textContent)));
                var markerEnd = range.endContainer.querySelector('.' + markerClassName.endSelection);
                markerEnd.appendChild(end);
            }
            else {
                this.ensureSelfClosingTag(end, markerClassName.endSelection, range);
            }
        }
        else {
            this.ensureSelfClosingTag(start, markerClassName.startSelection, range);
        }
    };
    /**
     * ensureSelfClosingTag method
     *
     * @param {Element} start - specifies the element.
     * @param {string} className - specifes the class name string value
     * @param {Range} range - specifies the range value
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.ensureSelfClosingTag = function (start, className, range) {
        var isTable = false;
        if (start.nodeType === 3) {
            this.replaceWith(start, this.marker(className, this.encode(start.textContent)));
        }
        else if (start.tagName === 'BR') {
            this.replaceWith(start, this.marker(className, this.encode(start.textContent)));
            var markerStart = range.startContainer.querySelector('.' + className);
            if (markerStart) {
                markerStart.parentElement.appendChild(start);
            }
        }
        else {
            var tagName = !isNOU(start.parentElement) ? start.parentElement.tagName.toLocaleLowerCase() : '';
            if (start.tagName === 'IMG' && tagName !== 'p' && tagName !== 'div') {
                var parNode = document.createElement('p');
                start.parentElement.insertBefore(parNode, start);
                parNode.appendChild(start);
                start = parNode.children[0];
            }
            if (start.tagName === 'TABLE') {
                isTable = true;
                if (start.textContent === '') {
                    var tdNode = start.querySelectorAll('td');
                    start = tdNode[tdNode.length - 1];
                    start = !isNOU(start.childNodes[0]) ? start.childNodes[0] : start;
                }
                else {
                    var lastNode = start.lastChild;
                    while (lastNode.nodeType !== 3 && lastNode.nodeName !== '#text' &&
                        lastNode.nodeName !== 'BR') {
                        lastNode = lastNode.lastChild;
                    }
                    start = lastNode;
                }
            }
            for (var i = 0; i < selfClosingTags.length; i++) {
                start = (start.tagName === selfClosingTags[i] && !isTable) ? start.parentNode : start;
            }
            if (start.nodeType === 3 && start.nodeName === '#text') {
                this.replaceWith(start, this.marker(className, this.encode(start.textContent)));
            }
            else if (start.nodeName === 'BR') {
                this.replaceWith(start, this.marker(markerClassName.endSelection, this.encode(start.textContent)));
                var markerEnd = range.endContainer.querySelector('.' + markerClassName.endSelection);
                markerEnd.appendChild(start);
            }
            else {
                var marker = this.marker(className, '');
                append([this.parseHTMLFragment(marker)], start);
            }
        }
    };
    /**
     * createTempNode method
     *
     * @param {Element} element - specifies the element.
     * @returns {Element} - returns the element
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.createTempNode = function (element) {
        var textContent = element.textContent;
        if (element.tagName === 'BR') {
            var wrapper = '<' + CONSTANT.DEFAULT_TAG + '></' + CONSTANT.DEFAULT_TAG + '>';
            var node = element.parentNode;
            if (CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.tagName.toLocaleLowerCase()) >= 0) {
                element = this.wrap(element, this.parseHTMLFragment(wrapper));
            }
        }
        else if (((element.nodeType !== Node.TEXT_NODE &&
            (element.classList.contains(markerClassName.startSelection) ||
                element.classList.contains(markerClassName.endSelection))) ||
            textContent.replace(/\n/g, '').replace(/(^ *)|( *$)/g, '').length > 0 ||
            textContent.length && textContent.indexOf('\n') < 0)) {
            var wrapper = '<' + CONSTANT.DEFAULT_TAG + '></' + CONSTANT.DEFAULT_TAG + '>';
            var target = element;
            element = this.wrap(element, this.parseHTMLFragment(wrapper));
            var ignoreBr = target.nodeType === Node.ELEMENT_NODE && target.firstChild && target.firstChild.nodeName === 'BR'
                && (target.classList.contains(markerClassName.startSelection) ||
                    target.classList.contains(markerClassName.endSelection));
            if (!ignoreBr && element.nextElementSibling && element.nextElementSibling.tagName === 'BR') {
                element.appendChild(element.nextElementSibling);
            }
        }
        return element;
    };
    /**
     * getImageTagInSelection method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.getImageTagInSelection = function () {
        var selection = this.getSelection();
        if (this.isEditorArea() && selection.rangeCount) {
            return selection.focusNode.querySelectorAll('img');
        }
        return null;
    };
    /**
     * Method to wrap the inline and text node with block node.
     *
     * @param {HTMLElement} node - specifies the element sent to wrap the node around it with block nodes.
     * @param {string} wrapperElement - specifies which block nodes to wrap around.
     * @returns {HTMLElement} - returns the wrapped element.
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.gatherElementsAround = function (node, wrapperElement) {
        var newWrapElem = createElement(wrapperElement);
        // Insert the new div element before the current node.
        var currentNode = node.previousSibling;
        var currentNodeParent = node.parentElement;
        if (currentNodeParent.className === 'e-editor-select-start') {
            currentNodeParent.parentNode.insertBefore(newWrapElem, currentNodeParent);
        }
        else if (currentNodeParent) {
            currentNodeParent.insertBefore(newWrapElem, node);
        }
        var i = 0;
        while (currentNode !== null && currentNode.nodeName !== 'BR' &&
            !this.isBlockNode(currentNode)) {
            var prevSibling = currentNode.previousSibling;
            if (currentNode.nodeType === 3 || currentNode.nodeType === 1) {
                if (i === 0) {
                    newWrapElem.appendChild(currentNode);
                }
                else {
                    newWrapElem.insertBefore(currentNode, newWrapElem.firstChild);
                }
            }
            currentNode = prevSibling;
            i++;
        }
        // Add the current node to the new div
        newWrapElem.appendChild(node);
        // Gather text and inline elements after the currentNode
        currentNode = newWrapElem.nextSibling ? newWrapElem.nextSibling :
            newWrapElem.parentElement.nextSibling;
        while (currentNode !== null && currentNode.nodeName !== 'BR' &&
            !this.isBlockNode(currentNode)) {
            var nextSibling = currentNode.nextSibling ?
                currentNode.nextSibling : currentNode.parentElement.nextSibling;
            if (currentNode.nodeType === 3 || currentNode.nodeType === 1) {
                newWrapElem.appendChild(currentNode);
            }
            currentNode = nextSibling;
        }
        return newWrapElem;
    };
    /**
     * Method to convert all the inline nodes between the selection to block nodes.
     *
     * @param {Node[]} selectedNodes - specifies the nodes of the start and end selection.
     * @param {boolean} fromList - specifies if the method is called from list module.
     * @returns {Node[]} - returns the selected list of elements as block nodes.
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.convertToBlockNodes = function (selectedNodes, fromList) {
        if (selectedNodes.length > 1) {
            var i = 0;
            var currentSelectedNode = selectedNodes[0];
            while (!isNOU(currentSelectedNode)) {
                if (currentSelectedNode.nodeName === 'BR') {
                    var nextNode = currentSelectedNode.nextSibling;
                    detach(currentSelectedNode);
                    currentSelectedNode = nextNode;
                }
                if (!isNOU(currentSelectedNode)) {
                    if (fromList) {
                        selectedNodes[i] = currentSelectedNode.nodeName === 'LI' || this.isBlockNode(currentSelectedNode) ?
                            currentSelectedNode :
                            this.gatherElementsAround(currentSelectedNode, (fromList ? 'p' : 'div'));
                    }
                    else {
                        selectedNodes[i] = !this.isBlockNode(selectedNodes[i]) ?
                            this.gatherElementsAround(currentSelectedNode, (fromList ? 'p' : 'div')) :
                            selectedNodes[i];
                    }
                    var currentProcessNode = selectedNodes[i].nodeName === 'LI' ? selectedNodes[i].parentElement : selectedNodes[i];
                    var currentElementCheckNode = currentProcessNode.nodeName === '#text' ? currentProcessNode.parentElement : currentProcessNode;
                    currentSelectedNode = !isNOU(currentElementCheckNode.querySelector('.e-editor-select-end')) ||
                        !isNOU(closest(currentSelectedNode, '.e-editor-select-end')) ?
                        null : currentProcessNode.nextSibling;
                    if (currentSelectedNode === null && !isNOU(currentProcessNode.nextSibling) && currentProcessNode.nextSibling.nodeName === 'BR') {
                        detach(currentProcessNode.nextSibling);
                    }
                }
                i++;
            }
        }
        else {
            if (!this.isBlockNode(selectedNodes[0])) {
                selectedNodes[0] = this.gatherElementsAround(selectedNodes[0], (fromList ? 'p' : 'div'));
                if (!isNOU(selectedNodes[0].nextSibling) && (selectedNodes[0].nextSibling.nodeName === 'BR')) {
                    detach(selectedNodes[0].nextSibling);
                }
            }
        }
        return selectedNodes;
    };
    /**
     * blockNodes method
     *
     * @param {boolean} action - Optional Boolean that specifies the action is whether performed.
     * @returns {Node[]} - returns the node array values
     * @hidden
     * @deprecated
     */
    DOMNode.prototype.blockNodes = function (action) {
        var collectionNodes = [];
        var selection = this.getSelection();
        var tableBlockNodes = this.tableSelection.getBlockNodes();
        if (tableBlockNodes.length > 0) {
            return tableBlockNodes;
        }
        if (this.isEditorArea() && selection.rangeCount) {
            var ranges = this.getRangePoint();
            var _loop_1 = function (j) {
                var parentNode = void 0;
                var range = ranges[j];
                var startNode = this_1.getSelectedNode(range.startContainer, range.startOffset);
                var endNode = this_1.getSelectedNode(range.endContainer, range.endOffset);
                if (this_1.isBlockNode(startNode) && collectionNodes.indexOf(startNode) < 0) {
                    collectionNodes.push(startNode);
                }
                parentNode = this_1.blockParentNode(startNode);
                var endParentNode = this_1.blockParentNode(endNode);
                if (parentNode && collectionNodes.indexOf(parentNode) < 0) {
                    if (!isNOU(action) && action) {
                        var tableCellNodeNames_1 = ['TD', 'TH'];
                        var nodesToCheck = [range.commonAncestorContainer, parentNode, endParentNode];
                        if (nodesToCheck.some(function (node) { return tableCellNodeNames_1.indexOf(node.nodeName) !== -1; })) {
                            var processedNodes = this_1.getPreBlockNodeCollection(range);
                            if (processedNodes.length > 1) {
                                this_1.wrapWithBlockNode(processedNodes, collectionNodes);
                            }
                            else if (processedNodes.length > 0) {
                                if (startNode !== endNode && startNode.nodeName !== 'BR') {
                                    collectionNodes.push(this_1.createTempNode(startNode));
                                }
                                else if (startNode === endNode && startNode.nodeName === 'SPAN' && (startNode.classList.contains(markerClassName.startSelection)
                                    || startNode.classList.contains(markerClassName.endSelection))) {
                                    collectionNodes.push(this_1.createTempNode(startNode));
                                }
                            }
                        }
                        else {
                            collectionNodes.push(parentNode);
                        }
                    }
                    else {
                        if (CONSTANT.IGNORE_BLOCK_TAGS.indexOf(parentNode.tagName.toLocaleLowerCase()) >= 0 && (startNode.tagName === 'BR' ||
                            startNode.nodeType === Node.TEXT_NODE ||
                            startNode.classList.contains(markerClassName.startSelection) ||
                            startNode.classList.contains(markerClassName.endSelection))) {
                            var tempNode = startNode.previousSibling &&
                                startNode.previousSibling.nodeType === Node.TEXT_NODE ?
                                startNode.previousSibling : startNode;
                            if (!startNode.nextSibling && !startNode.previousSibling && startNode.tagName === 'BR') {
                                collectionNodes.push(tempNode);
                            }
                            else {
                                collectionNodes.push(this_1.createTempNode(tempNode));
                            }
                        }
                        else {
                            collectionNodes.push(parentNode);
                        }
                    }
                }
                var nodes = [];
                for (var node = startNode; node !== endNode && node !== this_1.parent; null) {
                    if (nodes.indexOf(node) < 0 && node.childNodes && node.childNodes.length) {
                        nodes.push(node);
                        node = node.childNodes[0];
                    }
                    else if (node && node.nodeType !== 8 && (node.tagName === 'BR' || (node.nodeType === Node.TEXT_NODE &&
                        node.textContent.trim() !== '') || (node.nodeType !== Node.TEXT_NODE &&
                        (node.classList.contains(markerClassName.startSelection) ||
                            node.classList.contains(markerClassName.endSelection)))) &&
                        CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.parentNode.tagName.toLocaleLowerCase()) >= 0) {
                        node = this_1.createTempNode(node);
                    }
                    else if (node.nextSibling && node.nextSibling.nodeType !== 8 &&
                        (node.nextSibling.tagName === 'BR' ||
                            node.nextSibling.nodeType === Node.TEXT_NODE ||
                            node.nextSibling.classList.contains(markerClassName.startSelection) ||
                            node.nextSibling.classList.contains(markerClassName.endSelection)) &&
                        CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.nextSibling.parentNode.tagName.toLocaleLowerCase()) >= 0) {
                        node = this_1.createTempNode(node.nextSibling);
                    }
                    else if (node.nextSibling) {
                        node = node.nextSibling;
                    }
                    else if (node.parentNode) {
                        node = node.parentNode;
                        nodes.push(node);
                    }
                    if (collectionNodes.indexOf(node) < 0 && node.nodeType === Node.ELEMENT_NODE &&
                        CONSTANT.IGNORE_BLOCK_TAGS.indexOf(node.parentNode.tagName.toLocaleLowerCase()) >= 0 &&
                        (node.classList.contains(markerClassName.startSelection) ||
                            node.classList.contains(markerClassName.endSelection))) {
                        collectionNodes.push(this_1.createTempNode(node));
                    }
                    if (this_1.isBlockNode(node) && this_1.ignoreTableTag(node) && nodes.indexOf(node) < 0 &&
                        collectionNodes.indexOf(node) < 0 && (node !== endNode || range.endOffset > 0)) {
                        collectionNodes.push(node);
                    }
                    if (node.nodeName === 'IMG' && node.parentElement.contentEditable === 'true') {
                        collectionNodes.push(node);
                    }
                }
                parentNode = this_1.blockParentNode(endNode);
                if (parentNode && this_1.ignoreTableTag(parentNode) && collectionNodes.indexOf(parentNode) < 0 &&
                    (!isNOU(parentNode.previousElementSibling) && parentNode.previousElementSibling.tagName !== 'IMG')) {
                    collectionNodes.push(parentNode);
                }
            };
            var this_1 = this;
            for (var j = 0; j < ranges.length; j++) {
                _loop_1(j);
            }
        }
        for (var i = collectionNodes.length - 1; i > 0; i--) {
            var nodes = this.nodeFinds(collectionNodes[i], collectionNodes);
            if (nodes.length) {
                var listNodes = collectionNodes[i].querySelectorAll('ul, ol');
                if (collectionNodes[i].tagName === 'LI' && listNodes.length > 0) {
                    continue;
                }
                else {
                    collectionNodes.splice(i, 1);
                }
            }
        }
        return collectionNodes;
    };
    DOMNode.prototype.ignoreTableTag = function (element) {
        return !(CONSTANT.TABLE_BLOCK_TAGS.indexOf(element.tagName.toLocaleLowerCase()) >= 0);
    };
    DOMNode.prototype.getPreBlockNodeCollection = function (range) {
        var startNode = this.getSelectedNode(range.startContainer, range.startOffset);
        var endNode = this.getSelectedNode(range.endContainer, range.endOffset);
        var nodes = [];
        var rootNode = startNode.closest('td, th');
        if (isNOU(rootNode)) {
            return nodes;
        }
        var rootChildNode = Array.from(rootNode.childNodes);
        var isContinue = true;
        var processedStart = this.getClosestInlineParent(startNode, rootNode, true);
        var processedEnd = this.getClosestInlineParent(endNode, rootNode, false);
        for (var i = 0; i < rootChildNode.length; i++) {
            var child = rootChildNode[i];
            if (processedStart === processedEnd && child === processedStart) {
                nodes.push(child);
                isContinue = true;
            }
            else if (child === processedStart) {
                isContinue = false;
            }
            else if (child === processedEnd) {
                nodes.push(child); // Early Exit so Push the end node.
                isContinue = true;
            }
            if (isContinue) {
                continue;
            }
            else {
                nodes.push(child);
            }
        }
        return nodes;
    };
    DOMNode.prototype.getClosestInlineParent = function (node, rootNode, isStart) {
        // 1. If the node is a text node, return the node
        // 2. If the node is a block node return block node
        // 3. If the node is a inline node,
        //      Traverse back untill the TD or TH node
        //      Check if the the previous sibling , next sibling is a block node.
        //      If yes return the inline node that is closest to the block node.
        if (node.nodeType === Node.TEXT_NODE) {
            return node;
        }
        if (this.isBlockNode(node)) {
            return node;
        }
        var currentNode = node;
        var rootFlag = false;
        while (currentNode) {
            var previousNode = currentNode;
            if (rootFlag) {
                if (this.isBlockNode(currentNode)) {
                    return previousNode;
                }
                if (isStart && currentNode.previousSibling) {
                    if (this.isBlockNode(currentNode.previousSibling) || currentNode.previousSibling.nodeName === 'BR') {
                        return previousNode;
                    }
                    else {
                        currentNode = currentNode.previousSibling;
                    }
                }
                else if (!isStart && currentNode.nextSibling) {
                    if (this.isBlockNode(currentNode.nextSibling) || currentNode.nextSibling.nodeName === 'BR') {
                        return previousNode;
                    }
                    else {
                        currentNode = currentNode.nextSibling;
                    }
                }
                else {
                    return currentNode;
                }
            }
            else {
                currentNode = currentNode.parentElement;
                if (currentNode === rootNode) {
                    currentNode = previousNode;
                    rootFlag = true;
                }
            }
        }
        return null;
    };
    DOMNode.prototype.wrapWithBlockNode = function (nodes, collectionNodes) {
        var wrapperElement = createElement('p');
        for (var i = 0; i < nodes.length; i++) {
            var child = nodes[i];
            if (child.nodeName === 'BR') {
                child.parentNode.insertBefore(wrapperElement, child);
                wrapperElement.appendChild(child);
                if (wrapperElement.childNodes.length > 0) {
                    collectionNodes.push(wrapperElement);
                }
                wrapperElement = createElement('p');
            }
            else {
                if (!this.isBlockNode(child)) {
                    if (child.nodeName === '#text' && child.textContent.trim() === '') {
                        continue;
                    }
                    if (wrapperElement.childElementCount === 0) {
                        child.parentNode.insertBefore(wrapperElement, child);
                        wrapperElement.appendChild(child);
                    }
                    else {
                        wrapperElement.appendChild(child);
                    }
                }
                else {
                    collectionNodes.push(child);
                }
                // Use case when the BR is next sibling but the BR is not the part of selection.
                if ((i === nodes.length - 1) && wrapperElement.nextElementSibling &&
                    wrapperElement.querySelectorAll('br').length === 0 &&
                    wrapperElement.nextElementSibling.nodeName === 'BR') {
                    wrapperElement.appendChild(wrapperElement.nextElementSibling);
                }
            }
        }
        if (wrapperElement.childNodes.length > 0 && collectionNodes.indexOf(wrapperElement) < 0) {
            collectionNodes.push(wrapperElement);
        }
    };
    DOMNode.prototype.getImmediateBlockNode = function (node) {
        while (node && CONSTANT.BLOCK_TAGS.indexOf(node.nodeName.toLocaleLowerCase()) < 0) {
            node = node.parentNode;
        }
        return node;
    };
    return DOMNode;
}());
export { DOMNode };
