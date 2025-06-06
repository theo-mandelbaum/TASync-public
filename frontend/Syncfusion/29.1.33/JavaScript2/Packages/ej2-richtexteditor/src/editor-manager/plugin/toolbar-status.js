import { IsFormatted } from './isformatted';
import * as CONSTANT from './../base/constant';
import { NodeSelection } from './../../selection/index';
import { getDefaultHtmlTbStatus } from './../../common/util';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Update Toolbar Status
 *
 * @hidden
 * @deprecated
 */
export var statusCollection = getDefaultHtmlTbStatus();
var ToolbarStatus = /** @class */ (function () {
    function ToolbarStatus() {
    }
    /**
     * get method
     *
     * @param {Document} docElement - specifies the document element
     * @param {Node} rootNode - specifies the content editable element
     * @param {string[]} formatNode - specifies the format node
     * @param {string[]} fontSize - specifies the font size
     * @param {string[]} fontName - specifies the font name.
     * @param {Node} documentNode - specifies the document node.
     * @returns {IToolbarStatus} - returns the toolbar status
     * @hidden
     * @deprecated
     */
    ToolbarStatus.get = function (docElement, rootNode, formatNode, fontSize, fontName, documentNode) {
        var formatCollection = JSON.parse(JSON.stringify(statusCollection));
        var nodeCollection = JSON.parse(JSON.stringify(statusCollection));
        var nodeSelection = new NodeSelection(rootNode);
        var range = nodeSelection.getRange(docElement);
        var nodes = documentNode ? [documentNode] : range.collapsed ? nodeSelection.getNodeCollection(range) :
            nodeSelection.getSelectionNodeCollectionBr(range);
        var nodesLength = nodes.length;
        var isNodeChanged = false;
        for (var index = 0; index < nodes.length; index++) {
            while (nodes[index].nodeType === 3 && range.startContainer.nodeType === 3 && nodes[index].parentNode &&
                nodes[index].parentNode.lastElementChild && nodes[index].parentNode.lastElementChild.nodeName !== 'BR' &&
                (this.getImmediateBlockNode(nodes[index].parentNode)) &&
                (this.getImmediateBlockNode(nodes[index].parentNode)).textContent.replace(/\u200B/g, '').length === 0 &&
                range.startContainer.textContent.replace(/\u200B/g, '').length === 0 &&
                nodeSelection.get(docElement).toString().replace(/\u200B/g, '').length === 0) {
                nodes[index] = nodes[index].parentNode.lastElementChild.firstChild;
                isNodeChanged = true;
            }
            if (isNodeChanged && nodes[index]) {
                nodeSelection.setCursorPoint(docElement, nodes[index], nodes[index].textContent.length);
                isNodeChanged = false;
            }
            if ((nodes[index].nodeName !== 'BR' && nodes[index].nodeType !== 3) ||
                (nodesLength > 1 && nodes[index].nodeType === 3 && nodes[index].textContent.trim() === '')) {
                nodes.splice(index, 1);
                index--;
            }
        }
        for (var index = 0; index < nodes.length; index++) {
            // eslint-disable-next-line max-len
            formatCollection = this.getFormatParent(docElement, formatCollection, nodes[index], rootNode, formatNode, fontSize, fontName);
            if ((index === 0 && formatCollection.bold) || !formatCollection.bold) {
                nodeCollection.bold = formatCollection.bold;
            }
            if ((index === 0 && formatCollection.insertcode) || !formatCollection.insertcode) {
                nodeCollection.insertcode = formatCollection.insertcode;
            }
            if ((index === 0 && formatCollection.blockquote) || !formatCollection.blockquote) {
                nodeCollection.blockquote = formatCollection.blockquote;
            }
            if ((index === 0 && formatCollection.italic) || !formatCollection.italic) {
                nodeCollection.italic = formatCollection.italic;
            }
            if ((index === 0 && formatCollection.underline) || !formatCollection.underline) {
                nodeCollection.underline = formatCollection.underline;
            }
            if ((index === 0 && formatCollection.strikethrough) || !formatCollection.strikethrough) {
                nodeCollection.strikethrough = formatCollection.strikethrough;
            }
            if ((index === 0 && formatCollection.superscript) || !formatCollection.superscript) {
                nodeCollection.superscript = formatCollection.superscript;
            }
            if ((index === 0 && formatCollection.subscript) || !formatCollection.subscript) {
                nodeCollection.subscript = formatCollection.subscript;
            }
            if ((index === 0 && formatCollection.fontcolor) || !formatCollection.fontcolor) {
                nodeCollection.fontcolor = formatCollection.fontcolor;
            }
            if (index === 0 && formatCollection.fontname) {
                nodeCollection.fontname = formatCollection.fontname;
            }
            else {
                nodeCollection.fontname = formatCollection.fontname === nodeCollection.fontname ? formatCollection.fontname : 'empty';
            }
            if (index === 0 && formatCollection.fontsize) {
                nodeCollection.fontsize = formatCollection.fontsize;
            }
            else {
                nodeCollection.fontsize = formatCollection.fontsize === nodeCollection.fontsize ? formatCollection.fontsize : 'empty';
            }
            if ((index === 0 && formatCollection.backgroundcolor) || !formatCollection.backgroundcolor) {
                nodeCollection.backgroundcolor = formatCollection.backgroundcolor;
            }
            if ((index === 0 && formatCollection.orderedlist) || !formatCollection.orderedlist) {
                nodeCollection.orderedlist = formatCollection.orderedlist;
            }
            if ((index === 0 && formatCollection.unorderedlist) || !formatCollection.unorderedlist) {
                nodeCollection.unorderedlist = formatCollection.unorderedlist;
            }
            if ((index === 0 && formatCollection.alignments) || !formatCollection.alignments) {
                nodeCollection.alignments = formatCollection.alignments;
            }
            if (index === 0 && formatCollection.formats) {
                nodeCollection.formats = formatCollection.formats;
            }
            else {
                nodeCollection.formats = formatCollection.formats === nodeCollection.formats ? formatCollection.formats : 'empty';
            }
            if ((index === 0 && formatCollection.createlink) || !formatCollection.createlink) {
                nodeCollection.createlink = formatCollection.createlink;
            }
            if ((index === 0 && formatCollection.numberFormatList) || !formatCollection.numberFormatList) {
                nodeCollection.numberFormatList = formatCollection.numberFormatList;
            }
            if ((index === 0 && formatCollection.bulletFormatList) || !formatCollection.bulletFormatList) {
                nodeCollection.bulletFormatList = formatCollection.bulletFormatList;
            }
            if ((index === 0 && formatCollection.inlinecode) || !formatCollection.inlinecode) {
                nodeCollection.inlinecode = formatCollection.inlinecode;
            }
            formatCollection = JSON.parse(JSON.stringify(statusCollection));
        }
        return nodeCollection;
    };
    ToolbarStatus.getImmediateBlockNode = function (node) {
        do {
            node = node.parentNode;
        } while (node && CONSTANT.BLOCK_TAGS.indexOf(node.nodeName.toLocaleLowerCase()) < 0);
        return node;
    };
    ToolbarStatus.getFormatParent = function (docElement, formatCollection, node, targetNode, formatNode, fontSize, fontName) {
        var isListUpdated = false;
        var isComplexListUpdated = false;
        if (targetNode.contains(node) ||
            (node.nodeType === 3 && targetNode.nodeType !== 3 && targetNode.contains(node.parentNode))) {
            do {
                formatCollection = this.isFormattedNode(docElement, formatCollection, node, isListUpdated, isComplexListUpdated, formatNode, fontSize, fontName);
                if (formatCollection.orderedlist || formatCollection.unorderedlist) {
                    isListUpdated = true;
                }
                if (formatCollection.bulletFormatList || formatCollection.numberFormatList) {
                    isComplexListUpdated = true;
                }
                node = node.parentNode;
            } while (node && (node !== targetNode));
        }
        return formatCollection;
    };
    ToolbarStatus.isFormattedNode = function (docElement, formatCollection, node, isListUpdated, isComplexListUpdated, formatNode, fontSize, fontName) {
        if (!formatCollection.bold) {
            formatCollection.bold = IsFormatted.isBold(node);
        }
        if (!formatCollection.italic) {
            formatCollection.italic = IsFormatted.isItalic(node);
        }
        if (!formatCollection.underline) {
            formatCollection.underline = IsFormatted.isUnderline(node);
        }
        if (!formatCollection.strikethrough) {
            formatCollection.strikethrough = IsFormatted.isStrikethrough(node);
        }
        if (!formatCollection.superscript) {
            formatCollection.superscript = IsFormatted.isSuperscript(node);
        }
        if (!formatCollection.subscript) {
            formatCollection.subscript = IsFormatted.isSubscript(node);
        }
        if (!formatCollection.fontcolor) {
            formatCollection.fontcolor = this.isFontColor(docElement, node);
        }
        if (!formatCollection.fontname) {
            formatCollection.fontname = this.isFontName(docElement, node, fontName);
        }
        if (!formatCollection.fontsize) {
            formatCollection.fontsize = this.isFontSize(docElement, node, fontSize);
        }
        if (!formatCollection.backgroundcolor) {
            formatCollection.backgroundcolor = this.isBackgroundColor(node);
        }
        if (!formatCollection.orderedlist && !isListUpdated) {
            formatCollection.orderedlist = this.isOrderedList(node);
        }
        if (!formatCollection.unorderedlist && !isListUpdated) {
            formatCollection.unorderedlist = this.isUnorderedList(node);
        }
        if (!formatCollection.alignments) {
            formatCollection.alignments = this.isAlignment(node);
        }
        if (!formatCollection.formats) {
            formatCollection.formats = this.isFormats(node, formatNode);
            if (formatCollection.formats === 'pre') {
                formatCollection.insertcode = true;
            }
        }
        if (!formatCollection.blockquote) {
            var currentFormatCollection = void 0;
            if (!isNullOrUndefined(formatNode)) {
                if (formatNode.indexOf('blockquote') > -1) {
                    formatCollection.formats = this.isFormats(node, formatNode);
                    currentFormatCollection = formatCollection.formats;
                }
                else {
                    formatNode.push('blockquote');
                    currentFormatCollection = this.isFormats(node, formatNode);
                    for (var i = formatNode.length - 1; i >= 0; i--) {
                        if (formatNode[i] === 'blockquote') {
                            formatNode.splice(i, 1);
                        }
                    }
                }
            }
            if (currentFormatCollection === 'blockquote') {
                formatCollection.blockquote = true;
            }
        }
        if (!formatCollection.createlink) {
            formatCollection.createlink = this.isLink(node);
        }
        if (!formatCollection.numberFormatList && !isComplexListUpdated) {
            formatCollection.numberFormatList = this.isNumberFormatList(node);
        }
        if (!formatCollection.bulletFormatList && !isComplexListUpdated) {
            formatCollection.bulletFormatList = this.isBulletFormatList(node);
        }
        if (!formatCollection.inlinecode) {
            formatCollection.inlinecode = IsFormatted.isCode(node);
        }
        return formatCollection;
    };
    ToolbarStatus.isFontColor = function (docElement, node) {
        var color = node.style && node.style.color;
        if ((color === null || color === undefined || color === '') && node.nodeType !== 3) {
            color = this.getComputedStyle(docElement, node, 'color');
        }
        if (color !== null && color !== '' && color !== undefined) {
            return color;
        }
        else {
            return null;
        }
    };
    ToolbarStatus.isLink = function (node) {
        if (node.nodeName.toLocaleLowerCase() === 'a') {
            return true;
        }
        else {
            return false;
        }
    };
    ToolbarStatus.isBackgroundColor = function (node) {
        var backColor = node.style && node.style.backgroundColor;
        if (backColor !== null && backColor !== '' && backColor !== undefined) {
            return backColor;
        }
        else {
            return null;
        }
    };
    ToolbarStatus.isFontSize = function (docElement, node, fontSize) {
        var size = node.style && node.style.fontSize;
        if ((size === null || size === undefined || size === '') && node.nodeType !== 3 &&
            node.parentElement.classList.contains('e-content')) {
            size = this.getComputedStyle(docElement, node, 'font-size');
        }
        if ((size !== null && size !== '' && size !== undefined)
            && (fontSize === null || fontSize === undefined || (fontSize.indexOf(size) > -1))) {
            return size;
        }
        else {
            return null;
        }
    };
    ToolbarStatus.isFontName = function (docElement, node, fontName) {
        var name = node.style && node.style.fontFamily;
        if ((name === null || name === undefined || name === '') && node.nodeType !== 3) {
            name = this.getComputedStyle(docElement, node, 'font-family');
        }
        var index = null;
        if ((name !== null && name !== '' && name !== undefined)
            && (fontName === null || fontName === undefined || (fontName.filter(function (value, pos) {
                var regExp = RegExp;
                var pattern = new regExp(name, 'i');
                if ((value.replace(/"/g, '').replace(/ /g, '').toLowerCase() === name.replace(/"/g, '').replace(/ /g, '').toLowerCase()) ||
                    (value.split(',')[0] && !isNullOrUndefined(value.split(',')[0].trim().match(pattern)) &&
                        value.split(',')[0].trim() === value.split(',')[0].trim().match(pattern)[0])) {
                    index = pos;
                }
            }) && (index !== null)))) {
            return (index !== null) ? fontName[index] : name.replace(/"/g, '');
        }
        else {
            return null;
        }
    };
    ToolbarStatus.isOrderedList = function (node) {
        if (node.nodeName.toLocaleLowerCase() === 'ol') {
            return true;
        }
        else {
            return false;
        }
    };
    ToolbarStatus.isUnorderedList = function (node) {
        if (node.nodeName.toLocaleLowerCase() === 'ul') {
            return true;
        }
        else {
            return false;
        }
    };
    ToolbarStatus.isAlignment = function (node) {
        var align = node.style && node.style.textAlign;
        if (align === 'left') {
            return 'justifyleft';
        }
        else if (align === 'center') {
            return 'justifycenter';
        }
        else if (align === 'right') {
            return 'justifyright';
        }
        else if (align === 'justify') {
            return 'justifyfull';
        }
        else {
            return null;
        }
    };
    ToolbarStatus.isFormats = function (node, formatNode) {
        if (((formatNode === undefined || formatNode === null)
            && CONSTANT.BLOCK_TAGS.indexOf(node.nodeName.toLocaleLowerCase()) > -1)
            || (formatNode !== null && formatNode !== undefined
                && formatNode.indexOf(node.nodeName.toLocaleLowerCase()) > -1)) {
            return node.nodeName.toLocaleLowerCase();
        }
        else {
            return null;
        }
    };
    ToolbarStatus.getComputedStyle = function (docElement, node, prop) {
        return docElement.defaultView.getComputedStyle(node, null).getPropertyValue(prop);
    };
    ToolbarStatus.isNumberFormatList = function (node) {
        var list = node.style && node.style.listStyleType;
        if (list === 'lower-alpha') {
            return 'Lower Alpha';
        }
        else if (list === 'number') {
            return 'Number';
        }
        else if (list === 'upper-alpha') {
            return 'Upper Alpha';
        }
        else if (list === 'lower-roman') {
            return 'Lower Roman';
        }
        else if (list === 'upper-roman') {
            return 'Upper Roman';
        }
        else if (list === 'lower-greek') {
            return 'Lower Greek';
        }
        else if (list === 'none' && this.isOrderedList(node)) {
            return 'None';
        }
        else if (this.isOrderedList(node)) {
            return true;
        }
        else {
            return null;
        }
    };
    ToolbarStatus.isBulletFormatList = function (node) {
        var list = node.style && node.style.listStyleType;
        if (list === 'circle') {
            return 'Circle';
        }
        else if (list === 'square') {
            return 'Square';
        }
        else if (list === 'none' && this.isUnorderedList(node)) {
            return 'None';
        }
        else if (list === 'disc') {
            return 'Disc';
        }
        else if (this.isUnorderedList(node)) {
            return true;
        }
        else {
            return null;
        }
    };
    return ToolbarStatus;
}());
export { ToolbarStatus };
