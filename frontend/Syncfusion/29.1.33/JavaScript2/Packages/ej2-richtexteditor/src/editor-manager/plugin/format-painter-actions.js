import { closest, createElement, detach, isNullOrUndefined as isNOU, removeClass } from '@syncfusion/ej2-base';
import * as EVENTS from '../../common/constant';
import { SelectionCommands } from '../plugin';
var FormatPainterActions = /** @class */ (function () {
    function FormatPainterActions(parent, options) {
        this.INVALID_TAGS = ['A', 'AUDIO', 'IMG', 'VIDEO', 'IFRAME'];
        this.parent = parent;
        this.settings = options;
        this.addEventListener();
        this.setDeniedFormats();
    }
    FormatPainterActions.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.FORMAT_PAINTER_ACTIONS, this.actionHandler, this);
        this.parent.observer.on(EVENTS.MODEL_CHANGED_PLUGIN, this.onPropertyChanged, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    FormatPainterActions.prototype.onPropertyChanged = function (prop) {
        if (prop && prop.module === 'formatPainter') {
            if (!isNOU(prop.newProp.formatPainterSettings.allowedFormats)) {
                this.settings.allowedFormats = prop.newProp.formatPainterSettings.allowedFormats;
            }
            if (!isNOU(prop.newProp.formatPainterSettings.deniedFormats)) {
                this.settings.deniedFormats = prop.newProp.formatPainterSettings.deniedFormats;
                this.setDeniedFormats();
            }
        }
    };
    FormatPainterActions.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.FORMAT_PAINTER_ACTIONS, this.actionHandler);
        this.parent.observer.off(EVENTS.MODEL_CHANGED_PLUGIN, this.onPropertyChanged);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    /**
     * Destroys the format painter.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    FormatPainterActions.prototype.destroy = function () {
        this.removeEventListener();
        this.INVALID_TAGS = null;
        this.copyCollection = null;
        this.deniedFormatsCollection = null;
        this.newElem = null;
        this.newElemLastChild = null;
        this.settings = null;
        this.parent = null;
    };
    FormatPainterActions.prototype.actionHandler = function (args) {
        this.settings.allowedContext = ['Text', 'List', 'Table'];
        if (!isNOU(args) && !isNOU(args.item) && !isNOU(args.item.formatPainterAction)) {
            switch (args.item.formatPainterAction) {
                case 'format-copy':
                    this.copyAction();
                    break;
                case 'format-paste':
                    this.pasteAction();
                    break;
                case 'escape':
                    this.escapeAction();
                    break;
            }
            this.callBack(args);
        }
    };
    FormatPainterActions.prototype.callBack = function (event) {
        if (event.callBack) {
            event.callBack({
                requestType: 'FormatPainter',
                action: event.item.formatPainterAction,
                event: event.event,
                editorMode: 'HTML',
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    FormatPainterActions.prototype.generateElement = function () {
        var copyCollection = this.copyCollection.slice(); // To clone without reversing the collcection array
        copyCollection.reverse();
        var length = copyCollection.length;
        var elemCollection = createElement('div', { className: 'e-format-paste-wrapper' });
        var lastAppendChild;
        for (var i = 0; i < length; i++) {
            var _a = copyCollection[i], attrs = _a.attrs, className = _a.className, styles = _a.styles, tagName = _a.tagName;
            var elem = createElement(tagName);
            if (className !== '') {
                elem.className = className;
            }
            for (var i_1 = 0; i_1 < attrs.length; i_1++) {
                var property = attrs[i_1].name;
                var value = attrs[i_1].value;
                elem.setAttribute(property, value);
            }
            for (var i_2 = 0; i_2 < styles.length; i_2++) {
                var property = styles[i_2].property;
                var value = styles[i_2].value;
                var priority = styles[i_2].priority;
                elem.style.setProperty(property, value, priority);
            }
            if (elemCollection.childElementCount === 0) {
                elemCollection.append(elem);
                lastAppendChild = elem;
            }
            else {
                lastAppendChild.append(elem);
                lastAppendChild = elem;
            }
        }
        var elemChild = this.removeDeniedFormats(elemCollection);
        var currentElem = elemChild;
        while (currentElem) {
            if (currentElem.firstChild === null) {
                lastAppendChild = currentElem;
                currentElem = undefined;
            }
            else {
                currentElem = currentElem.firstChild;
            }
        }
        this.newElem = elemChild;
        this.newElemLastChild = lastAppendChild;
    };
    FormatPainterActions.prototype.pasteAction = function () {
        if (isNOU(this.copyCollection) || this.copyCollection.length === 0) {
            this.paintPlainTextFormat();
            return;
        }
        this.insertFormatNode(this.newElem, this.newElemLastChild);
    };
    FormatPainterActions.prototype.removeDeniedFormats = function (parentElement) {
        if (!isNOU(this.deniedFormatsCollection) && this.deniedFormatsCollection.length > 0) {
            var deniedPropArray = this.deniedFormatsCollection;
            var length_1 = deniedPropArray.length;
            for (var i = 0; i < length_1; i++) {
                var tag = deniedPropArray[i].tag;
                if (deniedPropArray[i].tag) {
                    var elementsList = parentElement.querySelectorAll(tag);
                    for (var j = 0; j < elementsList.length; j++) {
                        if (deniedPropArray[i].classes.length > 0) {
                            var classes = deniedPropArray[i].classes;
                            var classLength = classes.length;
                            for (var k = 0; k < classLength; k++) {
                                if (elementsList[j].classList.contains(classes[k])) {
                                    removeClass([elementsList[j]], classes[k].trim());
                                }
                            }
                            if (elementsList[j].classList.length === 0) {
                                elementsList[j].removeAttribute('class');
                            }
                        }
                        if (deniedPropArray[i].styles.length > 0) {
                            var styles = deniedPropArray[i].styles;
                            var styleLength = styles.length;
                            for (var k = 0; k < styleLength; k++) {
                                elementsList[j].style.removeProperty(styles[k].trim());
                            }
                            if (elementsList[j].style.length === 0) {
                                elementsList[j].removeAttribute('style');
                            }
                        }
                        if (deniedPropArray[i].attributes.length > 0) {
                            var attributes = deniedPropArray[i].attributes;
                            var attributeLength = attributes.length;
                            for (var k = 0; k < attributeLength; k++) {
                                elementsList[j].removeAttribute(attributes[k].trim());
                            }
                        }
                    }
                }
            }
        }
        return parentElement.firstElementChild;
    };
    FormatPainterActions.prototype.copyAction = function () {
        var copyCollection = [];
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var domSelection = this.parent.nodeSelection;
        var nodes = range.collapsed ? domSelection.getSelectionNodeCollection(range) :
            domSelection.getSelectionNodeCollectionBr(range);
        if (nodes.length === 0 && domSelection.getSelectionNodeCollectionBr(range).length === 0) {
            return;
        }
        else {
            nodes = nodes.length === 0 ? domSelection.getSelectionNodeCollectionBr(range) : nodes;
        }
        var parentElem = nodes[0].parentElement;
        var currentContext = this.findCurrentContext(parentElem);
        var allowedRulesArray = this.settings.allowedFormats.indexOf(';') > -1 ? this.settings.allowedFormats.split(';') :
            [this.settings.allowedFormats];
        for (var i = 0; i < allowedRulesArray.length; i++) {
            allowedRulesArray[i] = allowedRulesArray[i].trim();
        }
        var _a = this.getRangeParentElem(currentContext, parentElem), rangeParentElem = _a[0], context = _a[1];
        if (currentContext === null) {
            currentContext = context;
        }
        if (!isNOU(currentContext) && this.settings.allowedContext.indexOf(currentContext) > -1) {
            if (range.startContainer.nodeName === '#text') {
                parentElem = range.startContainer.parentElement;
            }
            var lastElement = parentElem;
            do {
                if (allowedRulesArray.indexOf(parentElem.nodeName.toLowerCase()) > -1) {
                    var allAttributes = parentElem.attributes;
                    var attribute = [];
                    for (var i = 0; i < allAttributes.length; i++) {
                        if (allAttributes[i].name !== 'class' && allAttributes[i].name !== 'style') {
                            attribute.push(allAttributes[i]);
                        }
                    }
                    var classes = parentElem.className;
                    var allStyles = parentElem.style;
                    var styleProp = [];
                    for (var i = 0; i < allStyles.length; i++) {
                        var property = allStyles[i];
                        var value = allStyles.getPropertyValue(property);
                        var priority = allStyles.getPropertyPriority(property);
                        styleProp.push({ property: property, value: value, priority: priority });
                    }
                    copyCollection.push({
                        attrs: attribute, className: classes, styles: styleProp, tagName: parentElem.nodeName
                    });
                }
                if (rangeParentElem === parentElem) {
                    parentElem = undefined;
                }
                else if (!isNOU(parentElem.parentElement)) {
                    parentElem = parentElem.parentElement;
                }
                if (lastElement === parentElem) {
                    break;
                }
            } while (!isNOU(parentElem) || parentElem === this.parent.editableElement);
            this.copyCollection = copyCollection;
        }
        this.generateElement();
    };
    FormatPainterActions.prototype.getRangeParentElem = function (currentContext, rangeParent) {
        var startContainer = rangeParent;
        var rangeParentELem;
        if (startContainer.nodeType === 3) {
            startContainer = startContainer.parentElement;
        }
        switch (currentContext) {
            case 'Table':
                rangeParentELem = closest(startContainer, 'td');
                if (isNOU(rangeParentELem)) {
                    rangeParentELem = closest(startContainer, 'th');
                }
                break;
            case 'List':
                rangeParentELem = closest(startContainer, 'li');
                break;
            case 'Text':
                rangeParentELem = closest(startContainer, 'p');
                break;
        }
        if (isNOU(rangeParentELem)) {
            var nearBlockParentName = this.getNearestBlockParentElement(rangeParent);
            if (!isNOU(nearBlockParentName) && nearBlockParentName !== 'UL' &&
                nearBlockParentName !== 'OL' && nearBlockParentName !== 'LI') {
                rangeParentELem = closest(startContainer, nearBlockParentName);
                currentContext = 'Text';
            }
        }
        if (currentContext === 'List') {
            rangeParentELem = rangeParentELem.parentElement;
        }
        return [rangeParentELem, currentContext];
    };
    FormatPainterActions.prototype.getNearestBlockParentElement = function (rangeParent) {
        var node = rangeParent;
        if (node.nodeType === 3) {
            node = node.parentNode;
        }
        // iterate untill the content editable div
        while (node && node !== this.parent.editableElement) {
            // If true return the block node name.
            if (!isNOU(node) && this.isBlockElement(node)) {
                return node.nodeName;
            }
            // if false re assign node to parent node
            node = node.parentNode;
        }
        return null;
    };
    FormatPainterActions.prototype.isBlockElement = function (node) {
        var blockTags = ['P', 'DIV', 'UL', 'OL', 'LI', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6',
            'ADDRESS', 'ARTICLE', 'ASIDE', 'BLOCKQUOTE', 'FIGCAPTION', 'FIGURE', 'FOOTER', 'HEADER',
            'HR', 'MAIN', 'NAV', 'SECTION', 'SUMMARY', 'PRE'];
        return blockTags.indexOf(node.nodeName) > -1;
    };
    FormatPainterActions.prototype.escapeAction = function () {
        this.copyCollection = [];
    };
    FormatPainterActions.prototype.paintPlainTextFormat = function () {
        var range = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var domSelection = this.parent.nodeSelection;
        var nodes = range.collapsed ? domSelection.getSelectionNodeCollection(range) :
            domSelection.getSelectionNodeCollectionBr(range);
        var isInValid;
        if (nodes.length > 1) {
            for (var i = 0; i < nodes.length; i++) {
                isInValid = this.validateELementTag(nodes[i]);
            }
        }
        else {
            isInValid = this.validateELementTag(range.startContainer) && this.validateELementTag(range.endContainer);
        }
        if (!isInValid) {
            this.parent.execCommand('Clear', 'ClearFormat', null, null);
        }
    };
    FormatPainterActions.prototype.validateELementTag = function (node) {
        if (node.nodeType === 3) {
            node = node.parentElement;
        }
        return this.INVALID_TAGS.indexOf(node.tagName) > -1;
    };
    FormatPainterActions.prototype.findCurrentContext = function (parentElem) {
        var closestParagraph = closest(parentElem, 'p');
        var closestList = closest(parentElem, 'li');
        if (closestParagraph && !closestList) {
            return 'Text';
        }
        else if (closest(parentElem, 'li')) {
            if (!isNOU(closestParagraph) && !isNOU(closestList) && closestParagraph.textContent.trim() !== closestList.textContent.trim()) {
                return 'Text';
            }
            return 'List';
        }
        else if (closest(parentElem, 'td') || closest(parentElem, 'tr') || closest(parentElem, 'th')) {
            return 'Table';
        }
        return null;
    };
    FormatPainterActions.prototype.insertFormatNode = function (elem, lastChild) {
        var clonedElem = elem.cloneNode(true);
        if (!this.isBlockElement(elem)) {
            var newBlockElem = createElement('P');
            newBlockElem.appendChild(elem);
            clonedElem = newBlockElem.cloneNode(true);
        }
        var endNode = this.parent.editableElement;
        var docElement = this.parent.currentDocument;
        var childElem = clonedElem.firstChild;
        var inlineElement;
        while (childElem) {
            if (this.isBlockElement(childElem)) {
                childElem = childElem.firstChild;
            }
            else {
                inlineElement = childElem.parentNode.removeChild(childElem);
                break;
            }
        }
        var formatValues = {
            element: inlineElement,
            lastChild: lastChild
        };
        SelectionCommands.applyFormat(docElement, null, endNode, 'P', null, 'formatPainter', null, formatValues);
        var range = this.parent.nodeSelection.getRange(docElement);
        var isCollapsed = range.collapsed;
        var blockNodes = this.parent.domNode.blockNodes();
        var isListCopied = this.isListCopied();
        if (isListCopied) {
            for (var i = 0; i < blockNodes.length; i++) {
                if (closest(blockNodes[i], 'li')) {
                    blockNodes[i] = closest(blockNodes[i], 'li');
                }
            }
        }
        var isFullNodeSelected = false;
        if (blockNodes.length === 1) {
            isFullNodeSelected = blockNodes[0].textContent.trim() === range.toString().trim();
        }
        if (this.isBlockElement(clonedElem) && isCollapsed || blockNodes.length > 1 || isFullNodeSelected) {
            this.insertBlockNode(clonedElem, range, docElement, blockNodes);
        }
    };
    FormatPainterActions.prototype.isListCopied = function () {
        var isListCopied = false;
        for (var i = 0; i < this.copyCollection.length; i++) {
            if (this.copyCollection[i].tagName === 'OL' || this.copyCollection[i].tagName === 'UL') {
                isListCopied = true;
                break;
            }
        }
        return isListCopied;
    };
    FormatPainterActions.prototype.insertBlockNode = function (element, range, docElement, nodes) {
        var domSelection = this.parent.nodeSelection;
        var saveSelection = domSelection.save(range, docElement);
        this.parent.domNode.setMarker(saveSelection);
        var listElement; // To clone to multiple list elements
        var cloneListParentNode;
        var sameListType = false;
        if (element.nodeName === 'UL' || element.nodeName === 'OL') {
            cloneListParentNode = element.cloneNode(true);
            listElement = cloneListParentNode.firstChild;
        }
        var cloneElementNode = isNOU(cloneListParentNode) ? element : element.firstChild;
        for (var index = 0; index < nodes.length; index++) {
            if (this.INVALID_TAGS.indexOf(nodes[index].nodeName) > -1 ||
                nodes[index].querySelectorAll('img,audio,video,iframe').length > 0) {
                continue;
            }
            var cloneParentNode = cloneElementNode.cloneNode(false);
            // Appending all the child elements
            while (nodes[index].firstChild) {
                if (nodes[index].textContent.trim().length !== 0) {
                    cloneParentNode.appendChild(nodes[index].firstChild);
                }
                else {
                    nodes[index].removeChild(nodes[index].firstChild);
                }
            }
            if (nodes[index].nodeName === 'TD' || nodes[index].nodeName === 'TH') {
                if (isNOU(cloneListParentNode)) {
                    nodes[index].appendChild(cloneParentNode);
                    continue;
                }
                else if (index === 0 && !isNOU(cloneListParentNode)) {
                    nodes[index].appendChild(cloneListParentNode);
                    cloneListParentNode.appendChild(cloneParentNode);
                    continue;
                }
                else {
                    nodes[index].appendChild(cloneParentNode);
                    continue;
                }
            }
            if (!isNOU(cloneListParentNode)) {
                sameListType = this.isSameListType(element, nodes[index]);
            }
            if (cloneParentNode.nodeName === 'LI' && !sameListType) {
                this.insertNewList(range, nodes, index, cloneListParentNode, cloneParentNode);
            }
            else if (sameListType) {
                this.insertSameList(nodes, index, cloneListParentNode, cloneParentNode);
            }
            else {
                nodes[index].parentNode.replaceChild(cloneParentNode, nodes[index]);
            }
            /**Removing the inserted block node in list and appending to previous element sibling */
            if (cloneParentNode.nodeName !== 'LI' && (cloneParentNode.parentElement.nodeName === 'OL' ||
                cloneParentNode.parentElement.nodeName === 'UL')) {
                var parent_1 = cloneParentNode.parentElement;
                // Cutting single ul or ol to two ul or ol based on the range
                this.parent.nodeCutter.SplitNode(range, parent_1, true);
                if (!isNOU(parent_1.previousElementSibling)) {
                    parent_1.previousElementSibling.after(cloneParentNode);
                    // To remove the nested list items out of the block element
                    if (cloneParentNode.childNodes.length > 1) {
                        for (var j = 0; j < cloneParentNode.childNodes.length; j++) {
                            var currentChild = cloneParentNode.childNodes[j];
                            if (currentChild.nodeName === 'OL' || currentChild.nodeName === 'UL') {
                                cloneParentNode.after(currentChild);
                            }
                        }
                    }
                }
                else {
                    parent_1.parentElement.prepend(cloneParentNode);
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !isNOU(listElement) ? detach(listElement) : false;
        this.cleanEmptyLists();
        var save = this.parent.domNode.saveMarker(saveSelection);
        save.restore();
    };
    FormatPainterActions.prototype.insertNewList = function (range, nodes, index, cloneListParentNode, cloneParentNode) {
        // Appending the li nodes to the ol or ul node
        if (index === 0) {
            var nodeName = nodes[index].nodeName;
            nodes[index] = nodes[index].parentNode.replaceChild(cloneListParentNode, nodes[index]);
            var parent_2 = nodeName === 'LI' ? cloneListParentNode.parentElement
                : cloneListParentNode;
            // Splicing and then inserting the node to previous element sibling of the Listparent.parent
            this.parent.nodeCutter.SplitNode(range, parent_2, true);
            if (nodes[index].nodeName === 'LI' && !isNOU(parent_2)) {
                cloneListParentNode.append(cloneParentNode);
                if (!isNOU(parent_2.parentNode)) {
                    parent_2.parentNode.insertBefore(cloneListParentNode, parent_2);
                }
            }
            else {
                if (!isNOU(parent_2)) {
                    if (!isNOU(parent_2.previousElementSibling) && parent_2.previousElementSibling.nodeName === cloneListParentNode.nodeName) {
                        var currentParent = parent_2.previousElementSibling;
                        currentParent.append(cloneParentNode);
                        while (currentParent.firstChild) {
                            cloneListParentNode.append(currentParent.firstChild);
                        }
                    }
                    else if (!isNOU(parent_2.nextElementSibling) && parent_2.nextElementSibling.nodeName === cloneListParentNode.nodeName) {
                        var currentParent = parent_2.nextElementSibling;
                        currentParent.prepend(cloneParentNode);
                        while (currentParent.firstChild) {
                            cloneListParentNode.append(currentParent.firstChild);
                        }
                    }
                    else {
                        cloneListParentNode.append(cloneParentNode);
                    }
                }
                else {
                    cloneListParentNode.append(cloneParentNode);
                }
            }
        }
        else {
            cloneListParentNode.append(cloneParentNode);
        }
        this.detachEmptyBlockNodes(nodes[index]);
    };
    FormatPainterActions.prototype.insertSameList = function (nodes, index, cloneListParentNode, cloneParentNode) {
        if (index === 0) {
            if (!isNOU(nodes[index].parentNode) && (nodes[index].parentNode.nodeName === 'UL' || nodes[index].parentNode.nodeName === 'OL')) {
                // append the nodes[index].parentNode.childNodes to the clonelistparentnode
                if (nodes.length === 1) {
                    // When clicked with cursor in the single list item
                    while (cloneParentNode.firstChild) {
                        nodes[index].append(cloneParentNode.firstChild);
                    }
                    for (var i = 0; i < nodes[index].parentNode.childNodes.length; i++) {
                        var currentChild = nodes[index].parentNode.childNodes[i];
                        cloneListParentNode.append(currentChild.cloneNode(true));
                    }
                }
                else {
                    cloneListParentNode.append(cloneParentNode);
                }
                // replace the older ol and ul with new ol and ul of clonelistparentnode
                nodes[index].parentNode.parentNode.replaceChild(cloneListParentNode, nodes[index].parentNode);
            }
        }
        else {
            cloneListParentNode.append(cloneParentNode);
        }
        this.detachEmptyBlockNodes(nodes[index]);
    };
    FormatPainterActions.prototype.isSameListType = function (element, node) {
        var isSameListType = false;
        var nearestListNode = closest(node, 'ol, ul');
        if (!isNOU(nearestListNode) && nearestListNode.querySelectorAll('li').length > 0) {
            if (nearestListNode.nodeName === element.nodeName) {
                isSameListType = true;
            }
            else {
                isSameListType = false;
            }
        }
        return isSameListType;
    };
    FormatPainterActions.prototype.cleanEmptyLists = function () {
        var listElem = this.parent.editableElement.querySelectorAll('ol, ul');
        for (var i = 0; i < listElem.length; i++) {
            if (listElem[i].textContent.trim() === '') {
                detach(listElem[i]);
            }
        }
    };
    FormatPainterActions.prototype.setDeniedFormats = function () {
        var deniedFormatsCollection = [];
        if (isNOU(this.settings) || isNOU(this.settings.deniedFormats)) {
            return;
        }
        var deniedFormats = this.settings.deniedFormats.indexOf(';') > -1 ? this.settings.deniedFormats.split(';') :
            [this.settings.deniedFormats];
        var length = deniedFormats.length;
        for (var i = 0; i < length; i++) {
            var formatString = deniedFormats[i];
            if (formatString !== '') {
                formatString.trim();
                var collection = this.makeDeniedFormatsCollection(formatString);
                if (!isNOU(collection)) {
                    deniedFormatsCollection.push(collection);
                }
            }
        }
        this.deniedFormatsCollection = deniedFormatsCollection;
    };
    FormatPainterActions.prototype.detachEmptyBlockNodes = function (node) {
        if (!isNOU(node) && node.textContent.trim() === '') {
            detach(node);
        }
    };
    FormatPainterActions.prototype.makeDeniedFormatsCollection = function (value) {
        var openParenIndex = value.indexOf('(');
        var closeParenIndex = value.indexOf(')');
        var openBracketIndex = value.indexOf('[');
        var closeBracketIndex = value.indexOf(']');
        var openBraceIndex = value.indexOf('{');
        var closeBraceIndex = value.indexOf('}');
        var classes = [];
        var attributes = '';
        var styles = '';
        var tagName = '';
        var classList = [];
        var attributesList = [];
        var stylesList = [];
        if (openParenIndex > -1 && closeParenIndex > -1) {
            classes = value.substring(openParenIndex + 1, closeParenIndex).split(' ');
            classList = classes[0].split(')')[0].split(',');
        }
        if (openBracketIndex > -1 && closeBracketIndex > -1) {
            attributes = value.substring(openBracketIndex + 1, closeBracketIndex);
            attributesList = attributes.split(',');
        }
        if (openBraceIndex > -1 && closeBraceIndex > -1) {
            styles = value.substring(openBraceIndex + 1, closeBraceIndex);
            stylesList = styles.split(',');
        }
        var openIndexArray = [openParenIndex, openBracketIndex, openBraceIndex];
        openIndexArray = openIndexArray.filter(function (index) { return index > -1; });
        var len = openIndexArray.length;
        var min;
        if (len === 1) {
            min = openIndexArray[0];
        }
        else if (len === 2) {
            min = Math.min(openIndexArray[0], openIndexArray[1]);
        }
        else if (len === 3) {
            min = Math.min(openIndexArray[0], openIndexArray[1], openIndexArray[2]);
        }
        tagName = value.substring(0, min);
        tagName = tagName.trim();
        return ({
            tag: tagName, styles: stylesList, classes: classList,
            attributes: attributesList
        });
    };
    return FormatPainterActions;
}());
export { FormatPainterActions };
