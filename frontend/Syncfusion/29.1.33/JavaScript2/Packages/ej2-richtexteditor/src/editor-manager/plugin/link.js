import * as CONSTANT from './../base/constant';
import { NodeSelection } from '../../selection/selection';
import { NodeCutter } from './nodecutter';
import { InsertHtml } from './inserthtml';
import { createElement, isNullOrUndefined as isNOU, closest } from '@syncfusion/ej2-base';
import * as EVENTS from './../../common/constant';
import { DOMMethods } from './dom-tree';
import { InsertMethods } from './insert-methods';
import { IsFormatted } from './isformatted';
/**
 * Link internal component
 *
 * @hidden
 * @deprecated
 */
var LinkCommand = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the editor manager
     * @hidden
     * @deprecated
     */
    function LinkCommand(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    LinkCommand.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.LINK, this.linkCommand, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    LinkCommand.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.LINK, this.linkCommand);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    LinkCommand.prototype.linkCommand = function (e) {
        switch (e.value.toString().toLocaleLowerCase()) {
            case 'createlink':
            case 'editlink':
                this.createLink(e);
                break;
            case 'openlink':
                this.openLink(e);
                break;
            case 'removelink':
                this.removeLink(e);
                break;
        }
    };
    LinkCommand.prototype.createLink = function (e) {
        var closestAnchor = (!isNOU(e.item.selectParent) && e.item.selectParent.length === 1) &&
            closest(e.item.selectParent[0], 'a');
        closestAnchor = !isNOU(closestAnchor) ? closestAnchor :
            (!isNOU(e.item.selectParent) && e.item.selectParent.length === 1) ?
                (e.item.selectParent[0]) : null;
        if (!isNOU(closestAnchor) && closestAnchor.tagName === 'A') {
            var anchorEle = closestAnchor;
            var linkText = '';
            if (!isNOU(e.item.url)) {
                anchorEle.setAttribute('href', e.item.url);
            }
            if (!isNOU(e.item.title)) {
                anchorEle.setAttribute('title', e.item.title);
            }
            if (!isNOU(e.item.text) && e.item.text !== '') {
                linkText = anchorEle.innerText;
                anchorEle.innerText = e.item.text;
            }
            if (!isNOU(e.item.target)) {
                anchorEle.setAttribute('target', e.item.target);
                anchorEle.setAttribute('aria-label', e.item.ariaLabel);
            }
            else {
                anchorEle.removeAttribute('target');
                anchorEle.removeAttribute('aria-label');
            }
            if (linkText === e.item.text) {
                e.item.selection.setSelectionText(this.parent.currentDocument, anchorEle, anchorEle, 1, 1);
                e.item.selection.restore();
            }
            else {
                var startIndex = e.item.action === 'Paste' ? anchorEle.childNodes[0].textContent.length : 0;
                var endIndex = anchorEle.firstChild.nodeName === '#text' ? anchorEle.childNodes[0].textContent.length : anchorEle.childNodes.length;
                e.item.selection.setSelectionText(this.parent.currentDocument, anchorEle.childNodes[0], anchorEle.childNodes[0], startIndex, endIndex);
            }
        }
        else {
            var domSelection = new NodeSelection(this.parent.editableElement);
            var range = domSelection.getRange(this.parent.currentDocument);
            if (range.endContainer.nodeName === '#text' && range.startContainer.textContent.length === (range.endOffset + 1) &&
                range.endContainer.textContent.charAt(range.endOffset) === ' ' && (!isNOU(range.endContainer.nextSibling) && range.endContainer.nextSibling.nodeName === 'A')) {
                domSelection.setSelectionText(this.parent.currentDocument, range.startContainer, range.endContainer, range.startOffset, range.endOffset + 1);
                range = domSelection.getRange(this.parent.currentDocument);
            }
            var text = isNOU(e.item.text) ? true : e.item.text.replace(/ /g, '').localeCompare(range.toString()
                .replace(/\n/g, ' ').replace(/ /g, '')) < 0;
            if (e.event && e.event.type === 'keydown' && (e.event.keyCode === 32
                || e.event.keyCode === 13) || e.item.action === 'Paste' || range.collapsed || text) {
                var anchor = this.createAchorNode(e);
                anchor.innerText = e.item.text === '' ? e.item.url : e.item.text;
                var text_1 = anchor.innerText;
                // Replace spaces with non-breaking spaces
                var modifiedText = text_1.replace(/  +/g, function (match) {
                    return '\u00A0'.repeat(match.length);
                });
                anchor.innerText = modifiedText;
                e.item.selection.restore();
                InsertHtml.Insert(this.parent.currentDocument, anchor, this.parent.editableElement);
                if (!isNOU(anchor.parentElement) && anchor.parentElement.nodeName === 'LI') {
                    if (!isNOU(anchor.parentNode.childNodes) && anchor.parentNode.childNodes[0].textContent === '') {
                        anchor.parentNode.removeChild(anchor.parentNode.childNodes[0]);
                    }
                }
                var regex = /[^\w\s\\/\\.\\:]/g;
                if (e.event && e.event.type === 'keydown' && (e.event.keyCode === 32
                    || e.event.keyCode === 13 || regex.test(e.event.key))) {
                    var startContainer = e.item.selection.range.startContainer;
                    startContainer.textContent = this.removeText(startContainer.textContent, e.item.text);
                }
                else {
                    var startIndex = e.item.action === 'Paste' ? anchor.childNodes[0].textContent.length : 0;
                    e.item.selection.setSelectionText(this.parent.currentDocument, anchor.childNodes[0], anchor.childNodes[0], startIndex, anchor.childNodes[0].textContent.length);
                }
            }
            else {
                this.handleLinkFormat(e);
            }
        }
        if (e.callBack) {
            e.callBack({
                requestType: 'Links',
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    LinkCommand.prototype.createAchorNode = function (e) {
        var anchorEle = createElement('a', {
            className: 'e-rte-anchor',
            attrs: {
                href: e.item.url,
                title: isNOU(e.item.title) || e.item.title === '' ? e.item.url : e.item.title
            }
        });
        if (!isNOU(e.item.target)) {
            anchorEle.setAttribute('target', e.item.target);
        }
        if (!isNOU(e.item.ariaLabel)) {
            anchorEle.setAttribute('aria-label', e.item.ariaLabel);
        }
        return anchorEle;
    };
    LinkCommand.prototype.removeText = function (text, val) {
        var arr = text.split(' ');
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                arr.splice(i, 1);
                i--;
            }
        }
        return arr.join(' ') + ' ';
    };
    LinkCommand.prototype.openLink = function (e) {
        document.defaultView.open(e.item.url, e.item.target);
        this.callBack(e);
    };
    LinkCommand.prototype.removeLink = function (e) {
        var blockNodes = this.parent.domNode.blockNodes();
        if (blockNodes.length < 2) {
            this.parent.domNode.setMarker(e.item.selection);
            var closestAnchor = closest(e.item.selectParent[0], 'a');
            var selectParent = closestAnchor ? closestAnchor : e.item.selectParent[0];
            var parent_1 = selectParent.parentNode;
            var child = [];
            for (; selectParent.firstChild; null) {
                if (parent_1) {
                    child.push(parent_1.insertBefore(selectParent.firstChild, selectParent));
                }
                else {
                    break;
                }
            }
            parent_1.removeChild(selectParent);
            if (child && child.length === 1) {
                e.item.selection.startContainer = e.item.selection.getNodeArray(child[child.length - 1], true);
                e.item.selection.endContainer = e.item.selection.startContainer;
                e.item.selection.startOffset = 0;
                e.item.selection.endOffset = child[child.length - 1].textContent.length;
            }
            e.item.selection = this.parent.domNode.saveMarker(e.item.selection);
        }
        else {
            for (var i = 0; i < blockNodes.length; i++) {
                var linkNode = blockNodes[i].querySelectorAll('a');
                for (var j = 0; j < linkNode.length; j++) {
                    if (this.parent.currentDocument.getSelection().containsNode(linkNode[j], true)) {
                        linkNode[j].outerHTML = linkNode[j].innerHTML;
                    }
                }
            }
        }
        e.item.selection.restore();
        this.callBack(e);
    };
    LinkCommand.prototype.callBack = function (e) {
        if (e.callBack) {
            e.callBack({
                requestType: e.item.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    LinkCommand.prototype.destroy = function () {
        this.removeEventListener();
    };
    LinkCommand.prototype.handleLinkFormat = function (e) {
        var editableElement = this.parent.editableElement;
        var range = this.parent.nodeSelection.getRange(editableElement.ownerDocument);
        var selection = this.parent.currentDocument.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return;
        }
        var domMethods = new DOMMethods(editableElement);
        var blockNodes = e.enterAction === 'BR' ? [this.parent.editableElement] : domMethods.getBlockNode();
        var appliedNodes = [];
        var inlineMediaTags = ['IMG', 'AUDIO', 'VIDEO'];
        var mediaStart;
        var mediaEnd;
        if (range.startContainer.nodeType === 1) {
            var mediaNode = range.startContainer.childNodes[range.startOffset];
            mediaStart = mediaNode && inlineMediaTags.indexOf(mediaNode.nodeName) > -1 ? mediaNode : null;
        }
        if (range.endContainer.nodeType === 1) {
            var mediaNode = range.endContainer.childNodes[range.endContainer.childNodes.length > 1 ?
                range.endOffset - 1 : range.endOffset];
            mediaEnd = mediaNode && inlineMediaTags.indexOf(mediaNode.nodeName) > -1 ? mediaNode : null;
        }
        var staticRange = {
            startContainer: range.startContainer,
            endContainer: range.endContainer,
            endOffset: range.endOffset,
            startOffset: range.startOffset,
            collapsed: range.collapsed
        };
        for (var i = 0; i < blockNodes.length; i++) {
            var currentNode = blockNodes[i];
            this.unwrapLink(currentNode);
            currentNode.normalize();
            this.applyLinkToBlockNode(currentNode, e, appliedNodes);
        }
        if (appliedNodes.length === 0) {
            return;
        }
        if (mediaStart || mediaEnd) {
            var start = mediaStart ? mediaStart.parentElement : staticRange.startContainer;
            var end = mediaEnd ? mediaEnd.parentElement : staticRange.endContainer;
            var startOffset = mediaStart ? 0 : staticRange.startOffset;
            var endOffset = staticRange.endOffset;
            this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, start, end, startOffset, endOffset);
        }
        else {
            if (appliedNodes.length === 1) {
                this.parent.nodeSelection.setSelectionContents(this.parent.currentDocument, appliedNodes[0]);
            }
            else {
                this.parent.nodeSelection.setSelectionText(this.parent.currentDocument, appliedNodes[0], // Start Node
                appliedNodes[appliedNodes.length - 1], // end Node
                0, // start offset
                appliedNodes[appliedNodes.length - 1].textContent.length // end offset
                );
            }
        }
    };
    LinkCommand.prototype.applyLinkToBlockNode = function (blockNode, e, appliedNode) {
        var domMethods = new DOMMethods(this.parent.editableElement);
        var textNodes = domMethods.getTextNodes(blockNode);
        var inlineNodes = blockNode.querySelectorAll('*');
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        // eslint-disable-next-line prefer-const
        var complexFormatNodes = [];
        var hasOnlyTextNode = inlineNodes.length === 0;
        for (var i = 0; i < textNodes.length; i++) {
            var splitNode = void 0;
            var currentTextNode = textNodes[i];
            var fontColorNode = new IsFormatted().getFormattedNode(currentTextNode, 'fontcolor', blockNode);
            if (hasOnlyTextNode) { // Only text node case.
                splitNode = this.getSplitNode(currentTextNode, range);
                appliedNode.push(InsertMethods.Wrap(splitNode, this.createAchorNode(e)));
            }
            else {
                if (fontColorNode) { // Font color foramt case.
                    if (complexFormatNodes.length > 0) {
                        this.replaceElementsWithAnchor(complexFormatNodes, this.createAchorNode(e), e.enterAction);
                    }
                    splitNode = this.getSplitNode(fontColorNode, range);
                    if (range.intersectsNode(fontColorNode)) {
                        InsertMethods.Wrap(fontColorNode.firstChild, this.createAchorNode(e));
                        appliedNode.push(currentTextNode);
                    }
                }
                else { // Partial selection of Inline nodes.
                    var partialStart = range.startContainer.nodeName === '#text' &&
                        range.startContainer === currentTextNode && range.startOffset !== 0;
                    var partialEnd = range.endContainer.nodeName === '#text' &&
                        range.endContainer === currentTextNode && range.endOffset !== range.startContainer.textContent.length;
                    if (i > 0) {
                        var currentParent = e.enterAction === 'BR' ? this.parent.editableElement : domMethods.getParentBlockNode(currentTextNode);
                        if (currentParent !== blockNode) {
                            this.replaceElementsWithAnchor(complexFormatNodes, this.createAchorNode(e), e.enterAction);
                        }
                    }
                    if (partialStart || partialEnd) {
                        var topMostFormatNode = domMethods.getTopMostNode(currentTextNode);
                        splitNode = this.getSplitNode(topMostFormatNode, range);
                        appliedNode.push(currentTextNode);
                        complexFormatNodes.push(currentTextNode);
                    }
                    else {
                        appliedNode.push(currentTextNode);
                        complexFormatNodes.push(currentTextNode);
                    }
                    if (i === textNodes.length - 1) {
                        this.replaceElementsWithAnchor(complexFormatNodes, this.createAchorNode(e), e.enterAction);
                    }
                }
            }
        }
    };
    LinkCommand.prototype.unwrapLink = function (elem) {
        var links = elem.querySelectorAll('a');
        if (links.length === 0) {
            return;
        }
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var startContainer = range.startContainer;
        var endContainer = range.endContainer;
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;
        this.parent.nodeSelection.save(range, this.parent.currentDocument);
        var selection = this.parent.nodeSelection.get(this.parent.currentDocument);
        for (var i = 0; i < links.length; i++) {
            if (range.intersectsNode(links[i])) {
                if (selection.containsNode(links[i], false)) {
                    InsertMethods.unwrap(links[i]);
                }
                else {
                    var linkText = links[i] && links[i].textContent;
                    if (linkText && range.startContainer.textContent &&
                        linkText.indexOf(range.startContainer.textContent) !== -1) {
                        startOffset = 0;
                    }
                    var splitNode = this.getSplitNode(links[i], range);
                    InsertMethods.unwrap(splitNode);
                }
            }
        }
        range.setStart(startContainer, startOffset);
        range.setEnd(endContainer, endOffset);
    };
    LinkCommand.prototype.replaceElementsWithAnchor = function (complexFormatNodes, anchor, enterAction) {
        var domMethods = new DOMMethods(this.parent.editableElement);
        var processedNodes = [];
        for (var j = 0; j < complexFormatNodes.length; j++) {
            var currentText = complexFormatNodes[j];
            processedNodes.push(domMethods.getTopMostNode(currentText));
        }
        complexFormatNodes.length = 0;
        var firstNode = processedNodes[0];
        var cloneNode = anchor.cloneNode(true);
        firstNode.parentElement.insertBefore(anchor, firstNode);
        var previousBRAnchor;
        for (var i = 0; i < processedNodes.length; i++) {
            var node = processedNodes[i];
            if (enterAction === 'BR') {
                if (i === 0) {
                    anchor.appendChild(node);
                }
                else {
                    if (isNOU(previousBRAnchor)) {
                        var anchorElem = cloneNode.cloneNode(true);
                        node.parentElement.insertBefore(anchorElem, node);
                        anchorElem.appendChild(node);
                        previousBRAnchor = anchorElem;
                    }
                    else {
                        var isNextSiblingBlockOrBR = (node.nextSibling && node.nextSibling.nodeName === 'BR') || domMethods.isBlockNode(node.nextSibling);
                        var isPrevSiblingBlockOrBR = (node.previousSibling && node.previousSibling.nodeName === 'BR') || domMethods.isBlockNode(node.previousSibling);
                        var isLastElement = this.parent.editableElement.lastChild === node;
                        var isBlockParent = domMethods.isBlockNode(node.parentElement);
                        if (isNextSiblingBlockOrBR && isPrevSiblingBlockOrBR) {
                            var anchorElem = cloneNode.cloneNode(true);
                            node.parentElement.insertBefore(anchorElem, node);
                            anchorElem.appendChild(node);
                            previousBRAnchor = anchorElem;
                        }
                        else if (isLastElement) {
                            var anchorElem = cloneNode.cloneNode(true);
                            node.parentElement.insertBefore(anchorElem, node);
                            anchorElem.appendChild(node);
                        }
                        else if (isBlockParent) {
                            var anchorElem = cloneNode.cloneNode(true);
                            node.parentElement.insertBefore(anchorElem, node);
                            anchorElem.appendChild(node);
                            previousBRAnchor = anchorElem;
                        }
                        else {
                            previousBRAnchor.appendChild(node);
                        }
                    }
                }
            }
            else {
                anchor.appendChild(node);
            }
        }
    };
    LinkCommand.prototype.getSplitNode = function (node, range) {
        var nodeCutter = new NodeCutter();
        var splitNode;
        if (range.collapsed) {
            splitNode = nodeCutter.SplitNode(range, node, true);
        }
        else {
            splitNode = nodeCutter.GetSpliceNode(range, node);
        }
        return splitNode;
    };
    return LinkCommand;
}());
export { LinkCommand };
