import { NodeSelection } from './../../selection/index';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { InsertMethods } from './insert-methods';
/**
 * Split the Node based on selection
 *
 * @hidden
 * @deprecated
 */
var NodeCutter = /** @class */ (function () {
    function NodeCutter() {
        this.enterAction = 'P';
        this.position = -1;
        this.nodeSelection = new NodeSelection();
    }
    // Split Selection Node
    /**
     * GetSpliceNode method
     *
     * @param {Range} range - specifies the range
     * @param {HTMLElement} node - specifies the node element.
     * @returns {Node} - returns the node value
     * @hidden
     * @deprecated
     */
    NodeCutter.prototype.GetSpliceNode = function (range, node) {
        node = this.SplitNode(range, node, true);
        node = this.SplitNode(range, node, false);
        return node;
    };
    /**
     * @param {Range} range - specifies the range
     * @param {HTMLElement} node - specifies the node element.
     * @param {boolean} isCollapsed - specifies the boolean value
     * @returns {HTMLElement} - returns the element
     * @hidden
     * @deprecated
     */
    NodeCutter.prototype.SplitNode = function (range, node, isCollapsed) {
        if (node) {
            var clone = range.cloneRange();
            var parent_1 = node.parentNode;
            var index = this.nodeSelection.getIndex(node);
            clone.collapse(isCollapsed);
            // eslint-disable-next-line
            (isCollapsed) ? clone.setStartBefore(node) : clone.setEndAfter(node);
            var fragment = clone.extractContents();
            if (isCollapsed) {
                node = parent_1.childNodes[index];
                fragment = this.spliceEmptyNode(fragment, false);
                if (fragment && fragment.childNodes.length > 0) {
                    var isEmpty = (fragment.childNodes.length === 1 && fragment.childNodes[0].nodeName !== 'IMG' && !(fragment.querySelectorAll('img').length > 0)
                        && this.isRteElm(fragment) && fragment.textContent.trim() === '' && fragment.textContent.charCodeAt(0) !== 32 && fragment.textContent.charCodeAt(0) !== 160) ? true : false;
                    if (!isEmpty) {
                        if (node) {
                            InsertMethods.AppendBefore(fragment, node);
                        }
                        else {
                            parent_1.appendChild(fragment);
                            var divNode = document.createElement('div');
                            divNode.innerHTML = '&#65279;&#65279;';
                            node = divNode.firstChild;
                            parent_1.appendChild(node);
                        }
                    }
                }
            }
            else {
                node = parent_1.childNodes.length > 1 ? parent_1.childNodes[index] :
                    parent_1.childNodes[0];
                fragment = this.spliceEmptyNode(fragment, true);
                if (fragment && fragment.childNodes.length > 0) {
                    var isEmpty = (fragment.childNodes.length === 1 && fragment.childNodes[0].nodeName !== 'IMG'
                        && this.isRteElm(fragment) && fragment.textContent.trim() === '' && fragment.textContent.charCodeAt(0) !== 32 && fragment.textContent.charCodeAt(0) !== 160) ? true : false;
                    if (!isEmpty) {
                        if (node) {
                            InsertMethods.AppendBefore(fragment, node, true);
                        }
                        else if (parent_1.childNodes.length > 1 && parent_1.childNodes.length !== index) {
                            node = parent_1.childNodes[parent_1.childNodes.length - 1];
                            InsertMethods.AppendBefore(fragment, node, true);
                            node = node.nextSibling;
                        }
                        else {
                            parent_1.appendChild(fragment);
                            var divNode = document.createElement('div');
                            divNode.innerHTML = '&#65279;&#65279;';
                            parent_1.insertBefore(divNode.firstChild, parent_1.firstChild);
                            node = parent_1.firstChild;
                        }
                    }
                }
            }
            return node;
        }
        else {
            return null;
        }
    };
    NodeCutter.prototype.isRteElm = function (fragment) {
        var result = true;
        if (fragment.childNodes.length === 1 && fragment.childNodes[0].nodeName !== 'IMG') {
            var firstChild = fragment.childNodes[0];
            for (var i = 0; !isNOU(firstChild.childNodes) && i < firstChild.childNodes.length; i++) {
                if (firstChild.childNodes[i].nodeName === 'IMG' || (firstChild.childNodes[i].nodeName === 'SPAN' &&
                    (firstChild.childNodes[i].classList.contains('e-video-wrap') ||
                        firstChild.childNodes[i].classList.contains('e-embed-video-wrap') ||
                        firstChild.childNodes[i].classList.contains('e-audio-wrap'))) || firstChild.childNodes[i].nodeName === 'TABLE') {
                    result = false;
                }
            }
        }
        else {
            result = true;
        }
        return result;
    };
    NodeCutter.prototype.spliceEmptyNode = function (fragment, isStart) {
        var len;
        if (fragment.childNodes.length === 1 && fragment.childNodes[0].nodeName === '#text' &&
            fragment.childNodes[0].textContent === '' || fragment.textContent === '') {
            len = -1;
        }
        else {
            len = fragment.childNodes.length - 1;
        }
        if (len > -1 && !isStart) {
            this.spliceEmptyNode(fragment.childNodes[len], isStart);
        }
        else if (len > -1) {
            this.spliceEmptyNode(fragment.childNodes[0], isStart);
        }
        else if (fragment.nodeType !== 3 && fragment.nodeType !== 11 && fragment.nodeName !== 'IMG' && !(fragment.querySelectorAll('img').length > 0) && !(fragment.classList.contains('e-video-wrap')) && !(fragment.classList.contains('e-audio-wrap'))) {
            fragment.parentNode.removeChild(fragment);
        }
        return fragment;
    };
    // Cursor Position split
    NodeCutter.prototype.GetCursorStart = function (indexes, index, isStart) {
        indexes = (isStart) ? indexes : indexes.reverse();
        var position = indexes[0];
        for (var num = 0; num < indexes.length && ((isStart) ? (indexes[num] < index) : (indexes[num] >= index)); num++) {
            position = indexes[num];
        }
        return position;
    };
    /**
     * GetCursorRange method
     *
     * @param {Document} docElement - specifies the document
     * @param {Range} range - specifies the range
     * @param {Node} node - specifies the node.
     * @returns {Range} - returns the range value
     * @hidden
     * @deprecated
     */
    NodeCutter.prototype.GetCursorRange = function (docElement, range, node) {
        var cursorRange = docElement.createRange();
        var indexes = [];
        indexes.push(0);
        var str = this.TrimLineBreak(node.data);
        var index = str.indexOf(' ', 0);
        while (index !== -1) {
            if (indexes.indexOf(index) < 0) {
                indexes.push(index);
            }
            if (new RegExp('\\s').test(str[index - 1]) && (indexes.indexOf(index - 1) < 0)) {
                indexes.push(index - 1);
            }
            if (new RegExp('\\s').test(str[index + 1])) {
                indexes.push(index + 1);
            }
            index = str.indexOf(' ', (index + 1));
        }
        indexes.push(str.length);
        if ((indexes.indexOf(range.startOffset) >= 0)
            || ((indexes.indexOf(range.startOffset - 1) >= 0) && (range.startOffset !== 1
                || (range.startOffset === 1 && new RegExp('\\s').test(str[0])))
                || (((indexes[indexes.length - 1] - 1) === range.startOffset) && range.endOffset !== (str.length - 1) && !new RegExp('\\s').test(str[0])))) {
            cursorRange = range;
            this.position = 1;
        }
        else {
            var startOffset = this.GetCursorStart(indexes, range.startOffset, true);
            if (startOffset !== 0 && str[startOffset] && str[startOffset] === ' ') {
                startOffset = startOffset + 1;
            }
            this.position = range.startOffset - startOffset;
            cursorRange.setStart(range.startContainer, startOffset);
            cursorRange.setEnd(range.startContainer, this.GetCursorStart(indexes, range.startOffset, false));
        }
        return cursorRange;
    };
    /**
     * GetCursorNode method
     *
     * @param {Document} docElement - specifies the document
     * @param {Range} range - specifies the range
     * @param {Node} node - specifies the node.
     * @returns {Node} - returns the node value
     * @hidden
     * @deprecated
     */
    NodeCutter.prototype.GetCursorNode = function (docElement, range, node) {
        return this.GetSpliceNode(this.GetCursorRange(docElement, range, node), node);
    };
    /**
     * TrimLineBreak method
     *
     * @param {string} line - specifies the string value.
     * @returns {string} - returns the string
     * @hidden
     * @deprecated
     */
    NodeCutter.prototype.TrimLineBreak = function (line) {
        return line.replace(/(\r\n\t|\n|\r\t)/gm, ' ');
    };
    return NodeCutter;
}());
export { NodeCutter };
