/**
 *  DOMTreeMethods - A `TreeWalkder` API implementation to get the block and text nodes in the selection.
 */
var DOMMethods = /** @class */ (function () {
    function DOMMethods(editElement) {
        this.directRangeElems = ['IMG', 'TABLE', 'AUDIO', 'VIDEO', 'HR'];
        this.BLOCK_TAGS = ['address', 'article', 'aside', 'audio', 'blockquote',
            'canvas', 'details', 'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer',
            'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'li', 'main', 'nav',
            'noscript', 'output', 'p', 'pre', 'section', 'td', 'tfoot', 'th',
            'video', 'body'];
        this.editableElement = editElement;
        this.currentDocument = editElement.ownerDocument;
    }
    /**
     * Method to get the block nodes inside the given Block node `TreeWalker` API.
     *
     * @returns {HTMLElement[]} The block node element.
     *
     *
     */
    DOMMethods.prototype.getBlockNode = function () {
        var _this = this;
        var blockCollection = [];
        var selection = this.currentDocument.getSelection();
        var range = selection.getRangeAt(0);
        // To find the direct range.
        var directRange = range.startContainer === this.editableElement && range.startContainer === range.endContainer &&
            range.startContainer.nodeName !== '#text';
        if (directRange) {
            if (range.startOffset === range.endOffset) {
                var isDirectRangeElems = this.editableElement.childNodes[range.startOffset] &&
                    this.directRangeElems.indexOf(this.editableElement.childNodes[range.startOffset].nodeName) > -1;
                if (isDirectRangeElems) {
                    blockCollection.push(this.editableElement.childNodes[range.startOffset]);
                }
            }
            else {
                var isElementRange = range.endOffset === range.startOffset + 1;
                if (isElementRange) {
                    blockCollection.push(this.editableElement.childNodes[range.startOffset]);
                }
            }
            if (blockCollection.length > 0) {
                return blockCollection;
            }
        }
        else {
            var start = range.startContainer.nodeType === Node.TEXT_NODE ?
                range.startContainer.parentElement : range.startContainer;
            var end = range.endContainer.nodeType === Node.TEXT_NODE ?
                range.endContainer.parentElement : range.endContainer;
            var endBlockNode = this.isBlockNode(end) ? end : this.getParentBlockNode(end);
            var blockNodeWalker = this.currentDocument.createTreeWalker(this.editableElement, NodeFilter.SHOW_ELEMENT, {
                acceptNode: function (node) {
                    if (!range.intersectsNode(node)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return _this.isBlockNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                }
            });
            blockNodeWalker.currentNode = start;
            while (blockNodeWalker.currentNode) {
                if (this.isBlockNode(blockNodeWalker.currentNode)) {
                    this.addToBlockCollection(blockCollection, blockNodeWalker, range);
                    blockNodeWalker.nextNode();
                }
                else {
                    blockNodeWalker.previousNode();
                }
                if (blockNodeWalker.currentNode === end || blockNodeWalker.currentNode === endBlockNode) {
                    this.addToBlockCollection(blockCollection, blockNodeWalker, range);
                    break;
                }
            }
        }
        return blockCollection;
    };
    DOMMethods.prototype.addToBlockCollection = function (blockCollection, blockNodeWalker, range) {
        var currentNode = blockNodeWalker.currentNode;
        if (blockNodeWalker.currentNode && blockCollection.indexOf(blockNodeWalker.currentNode) === -1) {
            if (currentNode.nodeName === 'LI') {
                var isDirectChild = !currentNode.parentNode.closest('li');
                if (isDirectChild) {
                    blockCollection.push(blockNodeWalker.currentNode);
                }
                else {
                    var commonAncestor = range.commonAncestorContainer;
                    var onlyNestedLISelection = ((commonAncestor.nodeName === 'OL' ||
                        commonAncestor.nodeName === 'UL') && commonAncestor.closest('li')) ? true : false;
                    if (onlyNestedLISelection) { // Edge case only nested List selection should allow the nodes.
                        blockCollection.push(blockNodeWalker.currentNode);
                    }
                    else {
                        return; // Nested list items are not added in the collection.
                    }
                }
            }
            else {
                blockCollection.push(blockNodeWalker.currentNode);
            }
        }
    };
    /**
     * Method to get the text nodes inside the given Block node `TreeWalker` API.
     *
     * @param {HTMLElement} blockElem - specifies the parent block element.
     * @returns {Text[]} The Text Nodes.
     *
     *
     */
    DOMMethods.prototype.getTextNodes = function (blockElem) {
        var nodeCollection = [];
        var selection = this.currentDocument.getSelection();
        var range = selection.getRangeAt(0);
        var textNodeWalker = this.currentDocument.createTreeWalker(blockElem, NodeFilter.SHOW_TEXT, {
            acceptNode: function (node) {
                if (!range.intersectsNode(node)) {
                    return NodeFilter.FILTER_REJECT;
                }
                return NodeFilter.FILTER_ACCEPT;
            }
        });
        var textNode = textNodeWalker.nextNode();
        while (textNode) {
            nodeCollection.push(textNode);
            textNode = textNodeWalker.nextNode();
        }
        return nodeCollection;
    };
    /**
     * isBlockNode method
     *
     * @param {Element} element - specifies the node element.
     * @returns {boolean} - sepcifies the boolean value
     * @hidden
     */
    DOMMethods.prototype.isBlockNode = function (element) {
        return (!!element && (element.nodeType === Node.ELEMENT_NODE && this.BLOCK_TAGS.indexOf(element.tagName.toLowerCase()) >= 0));
    };
    /**
     * Retrieves the last text node within the provided node and its descendants.
     *
     * This method uses a TreeWalker to traverse all text nodes in the given node's subtree,
     * and returns the last text node found.
     *
     * @param {Node} node - The root node from which to begin searching for text nodes.
     * @returns {Node | null} - The last text node within the node, or null if no text nodes are found.
     */
    DOMMethods.prototype.getLastTextNode = function (node) {
        var treeWalker = this.currentDocument.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
        var lastTextNode = null;
        var currentNode = treeWalker.nextNode();
        while (currentNode) {
            lastTextNode = currentNode;
            currentNode = treeWalker.nextNode();
        }
        return lastTextNode;
    };
    /**
     * Retrieves the first text node within the provided node and its descendants.
     *
     * This method uses a TreeWalker to traverse all text nodes in the given node's subtree,
     * and returns the first text node found.
     *
     * @param {Node} node - The root node from which to begin searching for text nodes.
     * @returns {Node | null} - The first text node within the node, or null if no text nodes are found.
     */
    DOMMethods.prototype.getFirstTextNode = function (node) {
        var treeWalker = this.currentDocument.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
        var firstTextNode = treeWalker.nextNode();
        return firstTextNode;
    };
    /**
     * Retrieves the parent block node of the given inline node.
     *
     * This method uses a TreeWalker to traverse the DOM tree and find the nearest ancestor of the given node
     * that is a block element.
     *
     * @param {Node} node - The node for which to find the parent block node.
     * @returns {Node} - The parent block node of the given node.
     * @hidden
     */
    DOMMethods.prototype.getParentBlockNode = function (node) {
        var _this = this;
        var treeWalker = this.currentDocument.createTreeWalker(this.editableElement, // root
        NodeFilter.SHOW_ELEMENT, // whatToShow
        {
            acceptNode: function (currentNode) {
                // Check if the node is a block element
                return _this.isBlockNode(currentNode) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
            }
        });
        treeWalker.currentNode = node;
        var blockParent = treeWalker.parentNode();
        return blockParent;
    };
    /**
     * Retrieves the top-most node in the DOM that is not a block-level element.
     * If the given text node is part of a block element, it returns the text node itself.
     * Otherwise, it traverses upwards through its parent nodes until it finds a node
     * that is either a block-level node or a node that contains different text content than the provided `text`.
     *
     * @param {Text} text - The text node from which to start the search. This can be a child of an inline element.
     * @returns {HTMLElement | Text} - The top-most parent element that is not a block node, or the text node itself if it's inside a block-level element.
     * @hidden
     *
     */
    DOMMethods.prototype.getTopMostNode = function (text) {
        if (this.isBlockNode(text.parentNode)) {
            return text;
        }
        var parent = text.parentNode;
        while (parent) {
            if (!this.isBlockNode(parent.parentNode) && text.textContent === parent.textContent) {
                parent = parent.parentNode;
            }
            else {
                return parent;
            }
        }
        return parent;
    };
    return DOMMethods;
}());
export { DOMMethods };
