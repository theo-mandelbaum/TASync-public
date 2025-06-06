var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/* eslint-disable */
import { WTableFormat, WRowFormat, WCellFormat } from '../format/index';
import { CharacterRangeType, FontScriptType } from '../../base/types';
import { WParagraphFormat, WCharacterFormat, WBorder, WBorders } from '../format/index';
import { isNullOrUndefined, createElement, classList } from '@syncfusion/ej2-base';
import { Dictionary } from '../../base/dictionary';
import { HelperMethods } from '../editor/editor-helper';
import { WebLayoutViewer } from './viewer';
import { Revision } from '../track-changes/track-changes';
/**
 * @private
 */
var Rect = /** @class */ (function () {
    function Rect(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Object.defineProperty(Rect.prototype, "right", {
        get: function () {
            return this.x + this.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rect.prototype, "bottom", {
        get: function () {
            return this.y + this.height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param currentBound
     * @private
     */
    Rect.prototype.isIntersecting = function (currentBound) {
        if (currentBound.y > this.bottom || this.y > currentBound.bottom ||
            currentBound.x > this.right || this.x > currentBound.right) {
            return false;
        }
        return true;
    };
    /**
     * @private
     */
    Rect.prototype.clone = function () {
        return new Rect(this.x, this.y, this.width, this.height);
    };
    return Rect;
}());
export { Rect };
/**
 * @private
 */
var Padding = /** @class */ (function () {
    function Padding(right, left, top, bottom) {
        this.right = 10;
        this.left = 10;
        this.top = 10;
        this.bottom = 10;
        this.right = right;
        this.left = left;
        this.top = top;
        this.bottom = bottom;
    }
    return Padding;
}());
export { Padding };
/**
 * @private
 */
var Margin = /** @class */ (function () {
    function Margin(leftMargin, topMargin, rightMargin, bottomMargin) {
        this.left = leftMargin;
        this.top = topMargin;
        this.right = rightMargin;
        this.bottom = bottomMargin;
    }
    Margin.prototype.clone = function () {
        return new Margin(this.left, this.top, this.right, this.bottom);
    };
    Margin.prototype.destroy = function () {
        this.left = undefined;
        this.right = undefined;
        this.top = undefined;
        this.bottom = undefined;
    };
    return Margin;
}());
export { Margin };
/**
 * @private
 */
var Widget = /** @class */ (function () {
    function Widget() {
        /**
         * @private
         */
        this.childWidgets = [];
        /**
         * @private
         */
        this.x = 0;
        /**
         * @private
         */
        this.y = 0;
        /**
         * @private
         */
        this.width = 0;
        /**
         * @private
         */
        this.height = 0;
        /**
         * @private
         */
        this.index = 0;
    }
    Object.defineProperty(Widget.prototype, "indexInOwner", {
        get: function () {
            if (this instanceof BodyWidget && this.page) {
                if (this.containerWidget instanceof FootNoteWidget) {
                    return this.containerWidget.bodyWidgets.indexOf(this);
                }
                else {
                    return this.page.bodyWidgets.indexOf(this);
                }
            }
            else if (this.containerWidget && this.containerWidget.childWidgets) {
                return this.containerWidget.childWidgets.indexOf(this);
            }
            else if (this instanceof FootNoteWidget) {
                return 0;
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "firstChild", {
        get: function () {
            return this.childWidgets.length > 0 ? this.childWidgets[0] : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "lastChild", {
        get: function () {
            if (this.childWidgets) {
                return this.childWidgets.length > 0 ?
                    this.childWidgets[this.childWidgets.length - 1] : undefined;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "previousWidget", {
        get: function () {
            var widget = this;
            var index = this.indexInOwner;
            if (widget instanceof BodyWidget) {
                widget = index > 0 ? widget.page.bodyWidgets[index - 1] : undefined;
            }
            else {
                widget = index > 0 ? widget.containerWidget.childWidgets[index - 1] : undefined;
            }
            return widget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "nextWidget", {
        get: function () {
            var widget = this;
            var index = this.indexInOwner;
            if (index === -1) {
                return undefined;
            }
            if (widget instanceof BodyWidget) {
                widget = index < widget.page.bodyWidgets.length - 1 ?
                    widget.page.bodyWidgets[index + 1] : undefined;
            }
            else {
                widget = index < widget.containerWidget.childWidgets.length - 1 ?
                    widget.containerWidget.childWidgets[index + 1] : undefined;
            }
            return widget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "previousRenderedWidget", {
        get: function () {
            var widget = this;
            var index = this.indexInOwner;
            if (index < 0) {
                return undefined;
            }
            if (widget instanceof BodyWidget) {
                if (index > 0 && !(widget.containerWidget instanceof FootNoteWidget)) {
                    widget = widget.page.bodyWidgets[index - 1];
                }
                else if ((widget.containerWidget instanceof FootNoteWidget) && !widget.page.documentHelper.owner.editorModule.removeEditRange) {
                    if (index <= 0) {
                        return undefined;
                    }
                    widget = widget.containerWidget.bodyWidgets[index - 1];
                }
                else {
                    var page = widget.page.previousPage;
                    widget = page && page.bodyWidgets.length > 0 ? page.bodyWidgets[page.bodyWidgets.length - 1] : undefined;
                }
            }
            else if (widget instanceof FootNoteWidget) {
                var page = widget.page;
                while (page.previousPage) {
                    page = page.previousPage;
                    widget = page.footnoteWidget;
                    if (!isNullOrUndefined(widget)) {
                        break;
                    }
                }
            }
            else {
                if (index > 0) {
                    widget = widget.containerWidget.childWidgets[index - 1];
                }
                else {
                    var previousContainer = undefined;
                    if (widget.containerWidget instanceof TableCellWidget) {
                        previousContainer = widget.containerWidget.getPreviousSplitWidget();
                    }
                    else if (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget &&
                        widget.containerWidget.containerWidget.footNoteType === 'Endnote') {
                        previousContainer = widget.containerWidget.previousWidget ? widget.containerWidget.previousWidget : widget.containerWidget.previousRenderedWidget;
                    }
                    else if (!(widget.containerWidget instanceof TableRowWidget
                        || widget.containerWidget instanceof HeaderFooterWidget || (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget))) {
                        // Since cells are lay outed left to right, we should not navigate to previous row.
                        previousContainer = widget.containerWidget.previousRenderedWidget;
                    }
                    while (previousContainer && previousContainer.childWidgets.length === 0) {
                        previousContainer = previousContainer.previousRenderedWidget;
                        if (isNullOrUndefined(previousContainer)) {
                            break;
                        }
                    }
                    widget = previousContainer && previousContainer.constructor === widget.containerWidget.constructor ?
                        previousContainer.lastChild : undefined;
                }
            }
            return widget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "nextRenderedWidget", {
        get: function () {
            var widget = this;
            var index = this.indexInOwner;
            if (index < 0) {
                return undefined;
            }
            if (widget instanceof BodyWidget) {
                if (index < widget.page.bodyWidgets.length - 1 && !(widget.containerWidget instanceof FootNoteWidget)) {
                    widget = widget.page.bodyWidgets[index + 1];
                }
                else if (widget.containerWidget instanceof FootNoteWidget) {
                    if (index >= widget.containerWidget.bodyWidgets.length - 1 && !widget.page.documentHelper.owner.editorModule.removeEditRange) {
                        return undefined;
                    }
                    widget = widget.containerWidget.bodyWidgets[index + 1];
                }
                else if (widget.page.allowNextPageRendering) {
                    var page = widget.page.nextPage;
                    widget = page && page.bodyWidgets.length > 0 ? page.bodyWidgets[0] : undefined;
                }
                else {
                    widget = undefined;
                }
            }
            else if (widget instanceof FootNoteWidget) {
                var page = widget.page;
                while (page.allowNextPageRendering && page.nextPage) {
                    page = page.nextPage;
                    widget = page.footnoteWidget;
                    if (!isNullOrUndefined(widget)) {
                        break;
                    }
                }
            }
            else {
                if (index < widget.containerWidget.childWidgets.length - 1) {
                    widget = widget.containerWidget.childWidgets[index + 1];
                }
                else {
                    var nextContainer = undefined;
                    if (widget.containerWidget instanceof TableCellWidget) {
                        nextContainer = widget.containerWidget.getNextSplitWidget();
                    }
                    else if (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget &&
                        widget.containerWidget.containerWidget.footNoteType === 'Endnote') {
                        nextContainer = widget.containerWidget.nextWidget ? widget.containerWidget.nextWidget : widget.containerWidget.nextRenderedWidget;
                    }
                    else if (!(widget.containerWidget instanceof TableRowWidget
                        || widget.containerWidget instanceof HeaderFooterWidget || (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget))) {
                        // Since cells are lay outed left to right, we should not navigate to next row.
                        nextContainer = widget.containerWidget.nextRenderedWidget;
                    }
                    while (nextContainer && nextContainer.childWidgets.length === 0 && !(nextContainer instanceof TableCellWidget)) {
                        nextContainer = nextContainer.nextRenderedWidget;
                        if (isNullOrUndefined(nextContainer)) {
                            break;
                        }
                    }
                    widget = nextContainer && nextContainer.constructor === widget.containerWidget.constructor ?
                        nextContainer.firstChild : undefined;
                }
            }
            return widget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "previousSplitWidget", {
        get: function () {
            var widget = this;
            if (widget instanceof TableCellWidget) {
                return widget.getPreviousSplitWidget();
            }
            else {
                var previous = widget.previousRenderedWidget;
                if (widget instanceof BodyWidget && previous instanceof BodyWidget && widget.equals(previous) && !(widget.containerWidget instanceof FootNoteWidget && widget.containerWidget.footNoteType === 'Endnote')) {
                    return previous;
                }
                else if (previous instanceof BlockWidget && widget.index === previous.index && widget.equals(previous)) {
                    return previous;
                }
                else if (widget instanceof BodyWidget && widget.containerWidget instanceof FootNoteWidget
                    && widget.containerWidget.footNoteType === 'Endnote' && !isNullOrUndefined(widget.page.previousPage)
                    && !isNullOrUndefined(widget.page.previousPage.endnoteWidget)) {
                    previous = widget.page.previousPage.endnoteWidget.bodyWidgets[widget.page.previousPage.endnoteWidget.bodyWidgets.length - 1];
                    if (previous && previous instanceof BodyWidget && widget.index === previous.index && widget.equals(previous)) {
                        return previous;
                    }
                }
                else if (widget instanceof BlockWidget && widget.bodyWidget
                    && widget.bodyWidget.containerWidget instanceof FootNoteWidget && widget.bodyWidget.containerWidget.footNoteType === 'Endnote'
                    && !isNullOrUndefined(widget.bodyWidget.page.previousPage) && !isNullOrUndefined(widget.bodyWidget.page.previousPage.endnoteWidget)
                    && widget.bodyWidget.page.previousPage.endnoteWidget.bodyWidgets.length > 0) {
                    var previousEndnotePage = widget.bodyWidget.page.previousPage.endnoteWidget;
                    var lastBodyWidget = previousEndnotePage.bodyWidgets[previousEndnotePage.bodyWidgets.length - 1];
                    previous = lastBodyWidget.childWidgets[lastBodyWidget.childWidgets.length - 1];
                    if (previous && previous instanceof BlockWidget && widget.index === previous.index && widget.equals(previous)) {
                        return previous;
                    }
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Widget.prototype, "nextSplitWidget", {
        get: function () {
            var widget = this;
            if (widget instanceof TableCellWidget) {
                return widget.getNextSplitWidget();
            }
            else {
                var next = widget.nextRenderedWidget;
                if (widget instanceof BodyWidget && next instanceof BodyWidget && widget.equals(next) && !(widget.containerWidget instanceof FootNoteWidget && widget.containerWidget.footNoteType === 'Endnote')) {
                    return next;
                }
                else if (next instanceof BlockWidget && widget.index === next.index && widget.equals(next)) {
                    return next;
                }
                else if (widget instanceof BodyWidget && widget.containerWidget instanceof FootNoteWidget
                    && widget.containerWidget.footNoteType === 'Endnote' && !isNullOrUndefined(widget.page.nextPage)
                    && !isNullOrUndefined(widget.page.nextPage.endnoteWidget)) {
                    next = widget.page.nextPage.endnoteWidget.bodyWidgets[0];
                    if (next && next instanceof BodyWidget && widget.index === next.index && widget.equals(next)) {
                        return next;
                    }
                }
                else if (widget instanceof BlockWidget && widget.bodyWidget
                    && widget.bodyWidget.containerWidget instanceof FootNoteWidget && widget.bodyWidget.containerWidget.footNoteType === 'Endnote'
                    && !isNullOrUndefined(widget.bodyWidget.page.nextPage) && !isNullOrUndefined(widget.bodyWidget.page.nextPage.endnoteWidget)
                    && widget.bodyWidget.page.nextPage.endnoteWidget.bodyWidgets.length > 0) {
                    next = widget.bodyWidget.page.nextPage.endnoteWidget.bodyWidgets[0].childWidgets[0];
                    if (next && next instanceof BlockWidget && widget.index === next.index && widget.equals(next)) {
                        return next;
                    }
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Widget.prototype.getPreviousSplitWidgets = function () {
        var widgets = [];
        var widget = this.previousSplitWidget;
        while (widget) {
            widgets.unshift(widget);
            widget = widget.previousSplitWidget;
            if (widget && widget == widget.previousSplitWidget) {
                break;
            }
        }
        return widgets;
    };
    Widget.prototype.getSplitWidgets = function () {
        var widgets = this.getPreviousSplitWidgets();
        var widget = this;
        while (widget) {
            widgets.push(widget);
            widget = widget.nextSplitWidget;
        }
        return widgets;
    };
    Widget.prototype.combineWidget = function (viewer) {
        var root = this;
        var widgets = this.getSplitWidgets();
        if (widgets.length > 1) {
            root = widgets.shift();
            while (widgets.length > 0) {
                var splitWidget = widgets.shift();
                root.combine(splitWidget, viewer);
            }
        }
        if (root instanceof TableWidget) {
            root.combineRows(viewer);
        }
        return root;
    };
    Widget.prototype.combine = function (widget, viewer) {
        if (widget.childWidgets.length > 0) {
            var lastChild = this.lastChild;
            if (lastChild instanceof TableWidget) {
                lastChild.combineWidget(viewer);
            }
            else {
                var firstChild = widget.firstChild;
                if (!(widget instanceof TableWidget) && lastChild instanceof Widget && firstChild instanceof Widget &&
                    lastChild.index === firstChild.index) {
                    lastChild.combine(widget.childWidgets.shift(), viewer);
                }
            }
            this.addWidgets(widget.childWidgets);
            widget.childWidgets = [];
        }
        widget.destroyInternal(viewer);
    };
    Widget.prototype.addWidgets = function (childWidgets) {
        while (childWidgets.length > 0) {
            var widget = childWidgets.shift();
            if (widget instanceof LineWidget && this instanceof ParagraphWidget) {
                widget.paragraph = this;
                this.height += widget.height;
            }
            else if (widget instanceof Widget) {
                var lastChild = this.lastChild;
                widget.containerWidget = this;
                widget.y = lastChild instanceof Widget ? lastChild.y + lastChild.height : this.y;
                this.height += widget.height;
            }
            if (widget instanceof TableRowWidget) {
                var previousRow = this.childWidgets[this.childWidgets.length - 1];
                for (var i = 0; i < previousRow.childWidgets.length; i++) {
                    var previousCell = previousRow.childWidgets[i];
                    if (previousCell.cellFormat.rowSpan > 1) {
                        for (var j = 0; j < widget.childWidgets.length; j++) {
                            var currentCell = widget.childWidgets[j];
                            if (currentCell.columnIndex === previousCell.columnIndex && currentCell.isSplittedCell && currentCell.cellFormat.rowSpan === previousCell.cellFormat.rowSpan) {
                                for (var k = 0; k < currentCell.childWidgets.length; k++) {
                                    var block = currentCell.childWidgets[k];
                                    currentCell.childWidgets.splice(block.indexInOwner, 1);
                                    previousCell.childWidgets.push(block);
                                    block.containerWidget = previousCell;
                                    k--;
                                }
                                currentCell.ownerRow.childWidgets.splice(currentCell.indexInOwner, 1);
                                currentCell.containerWidget = undefined;
                                j--;
                            }
                        }
                    }
                }
            }
            this.childWidgets.push(widget);
        }
    };
    Widget.prototype.removeChild = function (index) {
        if (index > -1 && index < this.childWidgets.length) {
            this.childWidgets.splice(index, 1);
        }
    };
    Widget.prototype.destroy = function () {
        if (this.childWidgets) {
            while (this.childWidgets.length > 0) {
                var child = this.childWidgets.pop();
                if (child instanceof LineWidget || child instanceof Widget) {
                    child.destroy();
                }
            }
        }
        this.childWidgets = undefined;
        if (this.containerWidget) {
            this.containerWidget.removeChild(this.indexInOwner);
        }
        this.containerWidget = undefined;
        // if (this.margin) {
        //     this.margin.destroy();
        // }
        this.margin = undefined;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.index = undefined;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    Widget.prototype.componentDestroy = function () {
        if (this.childWidgets) {
            while (this.childWidgets.length > 0) {
                var child = this.childWidgets.pop();
                if (child instanceof LineWidget || child instanceof Widget) {
                    child.componentDestroy();
                }
            }
        }
        this.childWidgets = undefined;
        if (this.margin) {
            this.margin.destroy();
        }
        this.margin = undefined;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
        this.index = undefined;
        this.containerWidget = undefined;
    };
    return Widget;
}());
export { Widget };
/**
 * @private
 */
var BlockContainer = /** @class */ (function (_super) {
    __extends(BlockContainer, _super);
    function BlockContainer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.floatingElements = [];
        /**
         * @private
         */
        _this.footNoteReference = undefined;
        /**
         * @private
         */
        _this.sectionFormatIn = undefined;
        /**
        * @private
        */
        _this.columnIndex = 0;
        /**
         * @private
         */
        _this.isWord2010NextColumn = false;
        return _this;
    }
    Object.defineProperty(BlockContainer.prototype, "sectionFormat", {
        get: function () {
            var container = this;
            if (container instanceof BodyWidget) {
                return container.sectionFormatIn;
            }
            else if (container.page && !isNullOrUndefined(container.page.bodyWidgets)) {
                return container.page.bodyWidgets[0].sectionFormat;
            }
            return undefined;
        },
        set: function (value) {
            if (this instanceof BodyWidget) {
                this.sectionFormatIn = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockContainer.prototype, "sectionIndex", {
        get: function () {
            var container = this;
            var index = 0;
            if (container instanceof BodyWidget) {
                index = container.index;
            }
            else if (container.page) {
                index = container.page.bodyWidgets[0].index;
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    BlockContainer.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
        var documentHelper = undefined;
        var node = this;
        if (node instanceof BodyWidget) {
            hierarchicalIndex = node.index + ';' + hierarchicalIndex;
        }
        else if (node instanceof FootNoteWidget) {
            if (node.footNoteType === 'Footnote') {
                hierarchicalIndex = 'FN' + ';' + hierarchicalIndex;
            }
            else {
                hierarchicalIndex = 'EN' + ';' + hierarchicalIndex;
            }
        }
        else {
            if (node.headerFooterType.indexOf('Header') !== -1) {
                hierarchicalIndex = 'H' + ';' + hierarchicalIndex;
            }
            else {
                hierarchicalIndex = 'F' + ';' + hierarchicalIndex;
            }
        }
        if (!isNullOrUndefined(node.page)) {
            documentHelper = this.page.documentHelper;
            var pageIndex = documentHelper.pages.indexOf(this.page);
            return pageIndex + ';' + hierarchicalIndex;
        }
        return hierarchicalIndex;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    BlockContainer.prototype.componentDestroy = function () {
        if (this.sectionFormatIn) {
            this.sectionFormatIn.destroy();
        }
        this.sectionFormatIn = undefined;
        this.floatingElements = [];
        this.removedHeaderFooters = [];
        this.footNoteReference = undefined;
        this.page = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return BlockContainer;
}(Widget));
export { BlockContainer };
/**
 * @private
 */
var BodyWidget = /** @class */ (function (_super) {
    __extends(BodyWidget, _super);
    /**
     * Initialize the constructor of BodyWidget
     */
    function BodyWidget() {
        return _super.call(this) || this;
    }
    BodyWidget.prototype.equals = function (widget) {
        return widget instanceof BodyWidget && widget.sectionFormat === this.sectionFormat;
    };
    BodyWidget.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
        var documentHelper = undefined;
        var node = this;
        if (node.containerWidget instanceof FootNoteWidget) {
            hierarchicalIndex = node.containerWidget.bodyWidgets.indexOf(node) + ';' + hierarchicalIndex;
            if (node.containerWidget.footNoteType === 'Footnote') {
                hierarchicalIndex = 'FN' + ';' + hierarchicalIndex;
            }
            else {
                hierarchicalIndex = 'EN' + ';' + hierarchicalIndex;
            }
        }
        else {
            if (this.page && this.page.bodyWidgets.indexOf(this) !== -1) {
                hierarchicalIndex = this.page.bodyWidgets.indexOf(this) + ';' + hierarchicalIndex;
            }
            else {
                hierarchicalIndex = node.index + ';' + hierarchicalIndex;
            }
        }
        if (!isNullOrUndefined(node.page)) {
            documentHelper = this.page.documentHelper;
            var pageIndex = documentHelper.pages.indexOf(this.page);
            return pageIndex + ';' + hierarchicalIndex;
        }
        return hierarchicalIndex;
    };
    BodyWidget.prototype.getTableCellWidget = function (touchPoint) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            if (this.childWidgets[i] instanceof TableWidget) {
                var childWidget = this.childWidgets[i];
                var tableWidth = 0;
                if (childWidget.wrapTextAround) {
                    tableWidth = childWidget.getTableCellWidth();
                }
                if (!(childWidget.wrapTextAround) && childWidget.y <= touchPoint.y && (childWidget.y + childWidget.height) >= touchPoint.y) {
                    return childWidget.getTableCellWidget(touchPoint);
                }
                if ((childWidget.wrapTextAround &&
                    (childWidget.x <= touchPoint.x && (childWidget.x + tableWidth) >= touchPoint.x &&
                        childWidget.y <= touchPoint.y && (childWidget.y + childWidget.height) >= touchPoint.y))) {
                    return childWidget.getTableCellWidget(touchPoint);
                }
            }
        }
        var tableCellWidget = undefined;
        if (this.childWidgets.length > 0) {
            if (this.childWidgets[0].y <= touchPoint.y) {
                tableCellWidget = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(touchPoint);
            }
            else {
                tableCellWidget = this.childWidgets[0].getTableCellWidget(touchPoint);
            }
        }
        return tableCellWidget;
    };
    BodyWidget.prototype.destroyInternal = function (viewer) {
        var height = this.height;
        if (!isNullOrUndefined(this.childWidgets)) {
            for (var n = 0; n < this.childWidgets.length; n++) {
                var chilgWidget = this.childWidgets[n];
                if (chilgWidget instanceof ParagraphWidget) {
                    chilgWidget.destroyInternal(viewer);
                }
                else {
                    chilgWidget.destroyInternal(viewer);
                }
                if (isNullOrUndefined(this.childWidgets)) {
                    break;
                }
                n--;
            }
            this.childWidgets = undefined;
        }
        // if (this instanceof HeaderFooterWidget && ((this as HeaderFooterWidget).currentNode ))) {
        //     if (((this as HeaderFooterWidget).currentNode as WHeaderFooter).layoutedWidgets )) {
        //         let index: number = ((this as HeaderFooterWidget).currentNode as WHeaderFooter).layoutedWidgets.indexOf(this);
        //         ((this as HeaderFooterWidget).currentNode as WHeaderFooter).layoutedWidgets.splice(index, 1);
        //     }
        //     this.currentNode = undefined;
        if (!isNullOrUndefined(this.page)) {
            var index = this.indexInOwner;
            if (this.indexInOwner > -1) {
                this.page.bodyWidgets.splice(index, 1);
                if (this.page.bodyWidgets.length === 0) {
                    this.page.destroy();
                    // }
                }
                else if ((this instanceof HeaderFooterWidget)
                    && this.page.headerWidget === this) {
                    this.page.headerWidget = undefined;
                }
                else if ((this instanceof HeaderFooterWidget)
                    && this.page.footerWidget === this) {
                    this.page.footerWidget = undefined;
                }
                this.page = undefined;
            }
        }
        this.destroy();
    };
    BodyWidget.prototype.destroy = function () {
        // if (this.sectionFormatIn) {
        //     this.sectionFormatIn.destroy();
        // }
        this.sectionFormatIn = undefined;
        if (this.page && this.page.headerWidgetIn) {
            this.page.headerWidgetIn.page = undefined;
        }
        if (this.page && this.page.footerWidgetIn) {
            this.page.footerWidgetIn.page = undefined;
        }
        this.page = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    BodyWidget.prototype.componentDestroy = function () {
        _super.prototype.componentDestroy.call(this);
    };
    return BodyWidget;
}(BlockContainer));
export { BodyWidget };
/**
 * @private
 */
var HeaderFooterWidget = /** @class */ (function (_super) {
    __extends(HeaderFooterWidget, _super);
    function HeaderFooterWidget(type) {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.isEmpty = false;
        _this.headerFooterType = type;
        return _this;
    }
    HeaderFooterWidget.prototype.getTableCellWidget = function (point) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            if (this.childWidgets[i] instanceof TableWidget) {
                var child = this.childWidgets[i];
                var tableWidth = 0;
                if (child.wrapTextAround) {
                    tableWidth = child.getTableCellWidth();
                }
                if (!(child.wrapTextAround) && child.y <= point.y && (child.y + child.height) >= point.y) {
                    return child.getTableCellWidget(point);
                }
                if ((child.wrapTextAround &&
                    (child.x <= point.x && (child.x + tableWidth) >= point.x &&
                        child.y <= point.y && (child.y + child.height) >= point.y))) {
                    return child.getTableCellWidget(point);
                }
            }
        }
        var tableCell = undefined;
        if (this.childWidgets.length > 0) {
            if (this.childWidgets[0].y <= point.y) {
                tableCell = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(point);
            }
            else {
                tableCell = this.childWidgets[0].getTableCellWidget(point);
            }
        }
        return tableCell;
    };
    HeaderFooterWidget.prototype.equals = function (widget) {
        // Todo: Need to work
        return widget instanceof HeaderFooterWidget
            && widget.containerWidget === this.containerWidget;
    };
    HeaderFooterWidget.prototype.clone = function () {
        var headerFooter = new HeaderFooterWidget(this.headerFooterType);
        for (var i = 0; i < this.childWidgets.length; i++) {
            var block = this.childWidgets[i].clone();
            headerFooter.childWidgets.push(block);
            block.index = i;
            block.containerWidget = headerFooter;
        }
        headerFooter.isEmpty = this.isEmpty;
        headerFooter.x = this.x;
        headerFooter.y = this.y;
        headerFooter.height = 0;
        headerFooter.width = 0;
        return headerFooter;
    };
    HeaderFooterWidget.prototype.destroyInternal = function (viewer) {
        this.page = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    HeaderFooterWidget.prototype.componentDestroy = function () {
        _super.prototype.componentDestroy.call(this);
        this.parentHeaderFooter = undefined;
    };
    return HeaderFooterWidget;
}(BlockContainer));
export { HeaderFooterWidget };
/**
 * @private
 */
var BlockWidget = /** @class */ (function (_super) {
    __extends(BlockWidget, _super);
    function BlockWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.isLayouted = false;
        /**
         * @private
         */
        _this.isFieldCodeBlock = false;
        /**
         * @private
         */
        _this.locked = false;
        /**
         * @private
         */
        _this.lockedBy = '';
        return _this;
    }
    Object.defineProperty(BlockWidget.prototype, "bodyWidget", {
        get: function () {
            var widget = this;
            while (widget.containerWidget) {
                if (widget.containerWidget instanceof TextFrame) {
                    var paragraph = widget.containerWidget.containerShape.line.paragraph;
                    if (paragraph) {
                        return paragraph.bodyWidget;
                    }
                }
                else if (widget.containerWidget instanceof BlockContainer) {
                    return widget.containerWidget;
                }
                widget = widget.containerWidget;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockWidget.prototype, "leftIndent", {
        get: function () {
            var blockAdv = this;
            if (blockAdv instanceof ParagraphWidget && blockAdv.paragraphFormat instanceof WParagraphFormat) {
                return blockAdv.paragraphFormat.leftIndent;
            }
            else if (blockAdv instanceof TableWidget && blockAdv.tableFormat instanceof WTableFormat) {
                return blockAdv.tableFormat.leftIndent;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockWidget.prototype, "rightIndent", {
        get: function () {
            var blockAdv = this;
            if (blockAdv instanceof ParagraphWidget && blockAdv.paragraphFormat instanceof WParagraphFormat) {
                return blockAdv.paragraphFormat.rightIndent;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockWidget.prototype, "isInsideTable", {
        get: function () {
            return this.containerWidget instanceof TableCellWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockWidget.prototype, "isInHeaderFooter", {
        get: function () {
            return this.bodyWidget instanceof HeaderFooterWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BlockWidget.prototype, "associatedCell", {
        get: function () {
            if (this.containerWidget instanceof TableCellWidget) {
                return this.containerWidget;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Check whether the paragraph contains only page break.
     *
     * @private
     * @returns {boolean}: Returns true if paragraph contains page break alone.
     */
    BlockWidget.prototype.isPageBreak = function () {
        var isPageBreak = false;
        if (this instanceof ParagraphWidget) {
            var paragraph = this;
            if (paragraph != null && paragraph.childWidgets.length === 1 &&
                paragraph.firstChild.children.length === 1) {
                var pageBreak = paragraph.firstChild.children[0];
                isPageBreak = pageBreak.isPageBreak;
            }
        }
        return isPageBreak;
    };
    BlockWidget.prototype.isColumnBreak = function () {
        var isColumnBreak = false;
        if (this instanceof ParagraphWidget) {
            var paragraph = this;
            if (paragraph != null && paragraph.childWidgets.length === 1 &&
                paragraph.firstChild.children.length === 1) {
                var columnBreak = paragraph.firstChild.children[0];
                isColumnBreak = columnBreak.isColumnBreak;
            }
        }
        return isColumnBreak;
    };
    BlockWidget.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
        var node = this;
        hierarchicalIndex = node.containerWidget.childWidgets.indexOf(node) + ';' + hierarchicalIndex;
        if (!isNullOrUndefined(node.containerWidget)) {
            if (node.containerWidget instanceof TextFrame) {
                return node.containerWidget.getHierarchicalIndex(hierarchicalIndex);
            }
            else if (node.containerWidget instanceof BlockWidget) {
                return node.containerWidget.getHierarchicalIndex(hierarchicalIndex);
            }
            else if (node.containerWidget instanceof BlockContainer) {
                hierarchicalIndex = node.containerWidget.getHierarchicalIndex(hierarchicalIndex);
            }
        }
        return hierarchicalIndex;
    };
    BlockWidget.prototype.getIndex = function () {
        if (this instanceof ParagraphWidget || this instanceof TableWidget) {
            return this.containerWidget.childWidgets.indexOf(this);
        }
        else if (this instanceof TableRowWidget) {
            return this.ownerTable.childWidgets.indexOf(this);
        }
        else if (this instanceof TableCellWidget) {
            return this.ownerRow.childWidgets.indexOf(this);
        }
        return 0;
    };
    BlockWidget.prototype.getContainerWidth = function () {
        if (this.isInsideTable) {
            var block = this;
            if ((block instanceof TableWidget) && block.tableFormat.preferredWidthType === 'Auto' && this.associatedCell.ownerTable.isGridUpdated) {
                var containerWidth = 0;
                var columnSpan = this.associatedCell.cellFormat.columnSpan;
                var columnIndex = this.associatedCell.columnIndex;
                for (var i = 0; i < columnSpan; i++) {
                    containerWidth += this.associatedCell.ownerTable.tableHolder.columns[columnIndex].preferredWidth;
                    columnIndex++;
                }
                if (containerWidth > 0) {
                    return containerWidth;
                }
            }
            return this.associatedCell.getCellWidth(this);
        }
        if (this.containerWidget instanceof TextFrame) {
            var shape = this.containerWidget.containerShape;
            return HelperMethods.convertPixelToPoint(shape.width) - HelperMethods.convertPixelToPoint(shape.textFrame.marginLeft)
                - HelperMethods.convertPixelToPoint(shape.textFrame.marginRight);
        }
        else {
            var bodyWidget = this.bodyWidget;
            var sectionFormat = bodyWidget.sectionFormat;
            var padding = 0;
            if (!isNullOrUndefined(bodyWidget.page) && !isNullOrUndefined(bodyWidget.page.documentHelper) &&
                bodyWidget.page.documentHelper.compatibilityMode !== 'Word2013' && !this.isInsideTable && this instanceof TableWidget) {
                var firstRow = this.firstChild;
                padding = firstRow.firstChild.leftMargin + (firstRow).lastChild.rightMargin;
            }
            if (bodyWidget instanceof BodyWidget && sectionFormat.columns.length > 1) {
                var colIndex = bodyWidget.columnIndex;
                return HelperMethods.convertPixelToPoint(sectionFormat.columns[colIndex].width);
            }
            else {
                return sectionFormat.pageWidth - (sectionFormat.leftMargin + sectionFormat.rightMargin) + padding;
            }
        }
    };
    Object.defineProperty(BlockWidget.prototype, "bidi", {
        get: function () {
            if (this instanceof ParagraphWidget && this.paragraphFormat instanceof WParagraphFormat) {
                return this.paragraphFormat.bidi;
            }
            if (this instanceof TableWidget && this.tableFormat instanceof WTableFormat) {
                return this.tableFormat.bidi;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    BlockWidget.prototype.componentDestroy = function () {
        _super.prototype.componentDestroy.call(this);
        this.contentControlProperties = undefined;
    };
    return BlockWidget;
}(Widget));
export { BlockWidget };
/**
 * @private
 */
var FootNoteWidget = /** @class */ (function (_super) {
    __extends(FootNoteWidget, _super);
    function FootNoteWidget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.bodyWidgets = [];
        return _this;
    }
    FootNoteWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
        throw new Error('Method not implemented.');
    };
    FootNoteWidget.prototype.getTableCellWidget = function (point) {
        return undefined;
    };
    FootNoteWidget.prototype.equals = function (widget) {
        // Todo: Need to work
        return widget instanceof FootNoteWidget
            && widget.containerWidget === this.containerWidget;
    };
    FootNoteWidget.prototype.clone = function () {
        var footNote = new FootNoteWidget();
        for (var i = 0; i < this.childWidgets.length; i++) {
            var block = this.childWidgets[i].clone();
            footNote.childWidgets.push(block);
            block.index = i;
            block.containerWidget = footNote;
        }
        footNote.block = this.block;
        return footNote;
    };
    FootNoteWidget.prototype.destroyInternal = function (viewer) {
        this.block = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    FootNoteWidget.prototype.componentDestroy = function () {
        if (this.bodyWidgets && this.bodyWidgets.length > 0) {
            for (var i = 0; i < this.bodyWidgets.length; i++) {
                var bodyWidget = this.bodyWidgets[i];
                bodyWidget.componentDestroy();
            }
            this.bodyWidgets = [];
        }
        this.bodyWidgets = undefined;
        this.block = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return FootNoteWidget;
}(BlockContainer));
export { FootNoteWidget };
/**
 * @private
 */
var ParagraphWidget = /** @class */ (function (_super) {
    __extends(ParagraphWidget, _super);
    /**
     * Initialize the constructor of ParagraphWidget
     */
    function ParagraphWidget() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.isSectionBreak = false;
        /**
         * @private
         */
        _this.isChangeDetected = false;
        /**
         * @private
         */
        _this.textWrapWidth = false;
        /**
         * @private
         * The clientX having previous left value of empty paragraph
         */
        _this.clientX = undefined;
        /**
         * @private
         */
        _this.floatingElements = [];
        _this.paragraphFormat = new WParagraphFormat(_this);
        _this.characterFormat = new WCharacterFormat(_this);
        return _this;
    }
    Object.defineProperty(ParagraphWidget.prototype, "isEndsWithPageBreak", {
        get: function () {
            if (this.childWidgets.length > 0) {
                return this.lastChild.isEndsWithPageBreak;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ParagraphWidget.prototype, "isEndsWithColumnBreak", {
        get: function () {
            if (this.childWidgets.length > 0) {
                return this.lastChild.isEndsWithColumnBreak;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    ParagraphWidget.prototype.equals = function (widget) {
        return widget instanceof ParagraphWidget && widget.paragraphFormat === this.paragraphFormat;
    };
    ParagraphWidget.prototype.isContainsShapeAlone = function () {
        var containsShape = false;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var lineWidget = this.childWidgets[i];
            for (var j = 0; j < lineWidget.children.length; j++) {
                var inline = lineWidget.children[j];
                if (!(inline instanceof ShapeBase) || (inline instanceof ShapeBase && inline.textWrappingStyle === 'Inline')) {
                    return false;
                }
                else {
                    containsShape = true;
                }
            }
        }
        return containsShape ? true : false;
    };
    ParagraphWidget.prototype.isEmptyInternal = function (layoutCheck) {
        if (isNullOrUndefined(this.childWidgets) || this.childWidgets.length === 0) {
            return true;
        }
        for (var j = 0; j < this.childWidgets.length; j++) {
            var inlineElement = this.childWidgets[j];
            for (var i = 0; i < inlineElement.children.length; i++) {
                var inline = inlineElement.children[i];
                if (inline.length === 0) {
                    continue;
                }
                if (inline instanceof TextElementBox || inline instanceof ImageElementBox || inline instanceof BookmarkElementBox
                    || inline instanceof EditRangeEndElementBox || inline instanceof EditRangeStartElementBox
                    || inline instanceof ChartElementBox || inline instanceof ShapeElementBox
                    || inline instanceof ContentControl || (inline instanceof CommentCharacterElementBox && !layoutCheck)
                    || (inline instanceof FieldElementBox && HelperMethods.isLinkedFieldCharacter(inline))) {
                    return false;
                }
            }
        }
        return true;
    };
    ParagraphWidget.prototype.isEmpty = function () {
        return this.isEmptyInternal(false);
    };
    ParagraphWidget.prototype.getInline = function (offset, indexInInline) {
        var inline = undefined;
        var count = 0;
        var isStarted = false;
        var splittedWidget = this.getSplitWidgets();
        for (var k = 0; k < splittedWidget.length; k++) {
            var widget = splittedWidget[k];
            for (var j = 0; j < widget.childWidgets.length; j++) {
                var line = widget.childWidgets[j];
                for (var i = 0; i < line.children.length; i++) {
                    inline = line.children[i];
                    if (inline instanceof ListTextElementBox) {
                        continue;
                    }
                    if (!isStarted && (inline instanceof TextElementBox || inline instanceof ImageElementBox
                        || inline instanceof ShapeElementBox
                        || inline instanceof BookmarkElementBox || inline instanceof FieldElementBox
                        && HelperMethods.isLinkedFieldCharacter(inline))
                        || inline instanceof ChartElementBox || inline instanceof ContentControl || inline instanceof CommentCharacterElementBox) {
                        isStarted = true;
                    }
                    if (isStarted && offset <= count + inline.length) {
                        indexInInline = (offset - count);
                        return { 'element': inline, 'index': indexInInline };
                    }
                    count += inline.length;
                }
            }
        }
        if (offset > count) {
            indexInInline = isNullOrUndefined(inline) ? offset : inline.length;
        }
        return { 'element': inline, 'index': indexInInline };
    };
    ParagraphWidget.prototype.getLength = function () {
        var length = 0;
        if (isNullOrUndefined(this.childWidgets)) {
            return length;
        }
        for (var j = 0; j < this.childWidgets.length; j++) {
            var line = this.childWidgets[j];
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof ListTextElementBox) {
                    continue;
                }
                length += element.length;
            }
        }
        return length;
    };
    /**
     * Return the total length by considering splitted paragraph widgets.
     * @private
     */
    ParagraphWidget.prototype.getTotalLength = function () {
        var offset = 0;
        var splittedWidget = this.getSplitWidgets();
        for (var i = 0; i < splittedWidget.length; i++) {
            offset += splittedWidget[i].getLength();
        }
        return offset;
    };
    ParagraphWidget.prototype.getTableCellWidget = function (point) {
        return undefined;
    };
    ParagraphWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
        minimumWordWidth = HelperMethods.convertPointToPixel(minimumWordWidth);
        maximumWordWidth = HelperMethods.convertPointToPixel(maximumWordWidth);
        if (this.childWidgets.length > 0) {
            var element = this.childWidgets[0].children[0];
            var text = '';
            var elements = new Dictionary();
            var imageWidths = [];
            do {
                if (element instanceof TextElementBox && element.text !== '') {
                    elements.add(element, text.length);
                    text += (element.text);
                }
                else if (element instanceof FieldElementBox && element.fieldType === 0) {
                    var fieldBegin = element;
                    if (!isNullOrUndefined(fieldBegin.fieldEnd)) {
                        element = isNullOrUndefined(fieldBegin.fieldSeparator) ? fieldBegin.fieldEnd : fieldBegin.fieldSeparator;
                    }
                }
                else if (element instanceof ImageElementBox) {
                    imageWidths.push(element.width);
                }
                if (isNullOrUndefined(element) || isNullOrUndefined(element.nextNode)) {
                    break;
                }
                element = element.nextNode;
            } while (true);
            var pattern = void 0;
            if (this.isInsideTable && this.containerWidget instanceof TableCellWidget && this.containerWidget.ownerTable &&
                this.containerWidget.ownerTable.bodyWidget && this.containerWidget.ownerTable.bodyWidget.page &&
                this.containerWidget.ownerTable.bodyWidget.page.documentHelper && this.containerWidget.ownerTable.bodyWidget.page.documentHelper.layout
                && this.bodyWidget.page.documentHelper.layout.isAllColumnHasAutoWidthType) {
                pattern = new RegExp('[^\\s\\-\\u4E00-\\u9FFF]+', 'g');
            }
            else {
                pattern = new RegExp('\\b\\w+\\b', 'g');
            }
            var matches = [];
            var matchInfo = void 0;
            // eslint-disable  no-cond-assign
            while (!isNullOrUndefined(matchInfo = pattern.exec(text))) {
                matches.push(matchInfo);
            }
            for (var i = 0; i < matches.length; i++) {
                var match = matches[i];
                var width = 0;
                text = '';
                var matchedValue = '';
                var wordStartIndex = 0;
                var wordEndIndex = match.index;
                var index = match.index;
                for (var j = 0; j < elements.keys.length; j++) {
                    var span = elements.keys[j];
                    var startIndex = elements.get(span);
                    var spanLength = span.length;
                    if (index <= startIndex + spanLength) {
                        wordStartIndex = index - startIndex;
                        if (match.index + match[0].length <= startIndex + spanLength) {
                            wordEndIndex = (match.index + match[0].length) - (startIndex + wordStartIndex);
                        }
                        else {
                            wordEndIndex = spanLength - wordStartIndex;
                            index += wordEndIndex;
                        }
                        text = span.text.substring(wordStartIndex, wordStartIndex + wordEndIndex);
                        matchedValue = matchedValue + text;
                    }
                    if (text !== '') {
                        width += this.bodyWidget.page.documentHelper.textHelper.getWidth(text, span.characterFormat, span.scriptType);
                    }
                    if (matchedValue === match[0]) {
                        break;
                    }
                }
                if (width !== 0) {
                    if (minimumWordWidth === 0 || width > minimumWordWidth) {
                        minimumWordWidth = width;
                    }
                }
            }
            // Check the image widths present in the paragraph. Consider the maximum image width as minimum word width.
            var imageWidth = 0;
            if (imageWidths.length > 0) {
                imageWidth = Math.max.apply(null, imageWidths);
            }
            if (minimumWordWidth === 0 || imageWidth > minimumWordWidth) {
                minimumWordWidth = imageWidth;
            }
            var maximum = this.measureParagraph();
            if (maximumWordWidth === 0 || maximum > maximumWordWidth) {
                maximumWordWidth = maximum;
            }
        }
        var leftIndent = 0;
        if (!this.isEmpty() && this.floatingElements.length == 0 && !isNullOrUndefined(this.paragraphFormat) && this.paragraphFormat.leftIndent > 0
            && !isNullOrUndefined(this.associatedCell) && !isNullOrUndefined(this.associatedCell.cellFormat) && this.associatedCell.cellFormat.preferredWidthType === 'Point') {
            var paraIndent = this.paragraphFormat.leftIndent + this.paragraphFormat.firstLineIndent;
            if ((paraIndent + minimumWordWidth) > this.associatedCell.cellFormat.preferredWidth) {
                leftIndent = paraIndent;
            }
        }
        return {
            'maximumWordWidth': HelperMethods.convertPixelToPoint(maximumWordWidth),
            'minimumWordWidth': HelperMethods.convertPixelToPoint(minimumWordWidth) + leftIndent
        };
    };
    ParagraphWidget.prototype.measureParagraph = function () {
        var width = 0;
        var element = this.childWidgets[0].children[0];
        do {
            if (element instanceof TextElementBox && element.text !== '') {
                if (element.isWidthUpdated && element.text[element.text.length - 1] !== ' ') {
                    width += element.trimEndWidth;
                }
                else {
                    width += this.bodyWidget.page.documentHelper.textHelper.getWidth(element.text, element.characterFormat, element.scriptType);
                }
            }
            else if (element instanceof FieldElementBox && element.fieldType === 0) {
                var fieldBegin = element;
                if (fieldBegin.fieldEnd != null) {
                    element = isNullOrUndefined(fieldBegin.fieldSeparator) ? fieldBegin.fieldEnd : fieldBegin.fieldSeparator;
                }
            }
            else if (element instanceof ImageElementBox) {
                width += element.width;
            }
            if (isNullOrUndefined(element) || isNullOrUndefined(element.nextNode)) {
                break;
            }
            element = element.nextNode;
        } while (true);
        // Considered the left and right indent.
        if (this.leftIndent > 0) {
            width += this.leftIndent;
        }
        if (this.rightIndent > 0) {
            width += this.rightIndent;
        }
        return width;
    };
    ParagraphWidget.prototype.isArabicChar = function (character) {
        //Arabic characters https://en.wikipedia.org/wiki/Arabic_script#Unicode
        return ((character >= String.fromCharCode(1536) && character <= String.fromCharCode(1791)) //Script-Arab, Arabic characters https://en.wikipedia.org/wiki/Arabic_(Unicode_block)
            || (character >= String.fromCharCode(1872) && character <= String.fromCharCode(1919)) //Script-Arab, Arabic Supplement characters https://en.wikipedia.org/wiki/Arabic_Supplement
            || (character >= String.fromCharCode(2208) && character <= String.fromCharCode(2303)) //Script-Arab, Arabic Extended-A characters https://en.wikipedia.org/wiki/Arabic_Extended-A
            || (character >= String.fromCharCode(64336) && character <= String.fromCharCode(65023)) //Script-Arab, Arabic Presentation Forms-A characters https://en.wikipedia.org/wiki/Arabic_Presentation_Forms-A
            || (character >= String.fromCharCode(65136) && character <= String.fromCharCode(65279))); //Script-Arab, Arabic Presentation Forms-B characters https://en.wikipedia.org/wiki/Arabic_Presentation_Forms-B                
    };
    ParagraphWidget.prototype.isHebrewChar = function (character) {
        return ((character >= String.fromCharCode(1424) && character <= String.fromCharCode(1535)) //Script-Hebr, Hebrew characters https://en.wikipedia.org/wiki/Hebrew_alphabet#Unicode_and_HTML (https://en.wikipedia.org/wiki/Hebrew_(Unicode_block))
            || (character >= String.fromCharCode(64285) && character <= String.fromCharCode(64335))); //Script-Hebr, Hebrew Alphabetic Presentation Forms characters https://en.wikipedia.org/wiki/Alphabetic_Presentation_Forms                                                                    
    };
    ParagraphWidget.prototype.isHindiChar = function (character) {
        //Hindi characters are comes under the Devanagari scripts.
        //The Unicode Standard defines three blocks for Devanagari. https://en.wikipedia.org/wiki/Devanagari#Unicode              
        return ((character >= String.fromCharCode(2304) && character <= String.fromCharCode(2431)) //Devanagari (U+0900–U+097F), https://en.wikipedia.org/wiki/Devanagari_(Unicode_block)
            || (character >= String.fromCharCode(43232) && character <= String.fromCharCode(43263)) //Devanagari Extended (U+A8E0–U+A8FF), https://en.wikipedia.org/wiki/Devanagari_Extended
            || (character >= String.fromCharCode(7376) && character <= String.fromCharCode(7423))); //Vedic Extensions (U+1CD0–U+1CFF), https://en.wikipedia.org/wiki/Vedic_Extensions
    };
    ParagraphWidget.prototype.isKoreanChar = function (character) {
        return (
        //Korean characters https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_in_Unicode
        (character >= String.fromCharCode(44032) && character <= String.fromCharCode(55203)) //Hangul Syllables characters https://en.wikipedia.org/wiki/Hangul_Syllables
            || (character >= String.fromCharCode(4352) && character <= String.fromCharCode(4607)) //Hangul Jamo characters https://en.wikipedia.org/wiki/Hangul_Jamo_(Unicode_block)
            || (character >= String.fromCharCode(12592) && character <= String.fromCharCode(12687)) //Hangul Compatibility Jamo characters https://en.wikipedia.org/wiki/Hangul_Compatibility_Jamo
            || (character >= String.fromCharCode(43360) && character <= String.fromCharCode(43391)) //Hangul Jamo Extended-A characters https://en.wikipedia.org/wiki/Hangul_Jamo_Extended-A
            || (character >= String.fromCharCode(55216) && character <= String.fromCharCode(55295)) //Hangul Jamo Extended-B characters https://en.wikipedia.org/wiki/Hangul_Jamo_Extended-B
            || (character >= String.fromCharCode(44032) && character <= String.fromCharCode(55215)) //Hangul_Syllables characters https://en.wikipedia.org/wiki/Hangul_Syllables
        );
    };
    ParagraphWidget.prototype.isJapanese = function (character) {
        return (
        //Japanese and Ainu languages
        (character >= String.fromCharCode(12448) && character <= String.fromCharCode(12543)) //Katakana characters https://en.wikipedia.org/wiki/Katakana_(Unicode_block)
            || (character >= String.fromCharCode(12352) && character <= String.fromCharCode(12447)) //Hiragana characters https://en.wikipedia.org/wiki/Hiragana_(Unicode_block)
        );
    };
    ParagraphWidget.prototype.isThaiCharacter = function (character) {
        // Thai characters https://en.wikipedia.org/wiki/Thai_script#Unicode_ranges 
        return (character >= String.fromCharCode(3584) && character <= String.fromCharCode(3711));
    };
    ParagraphWidget.prototype.isChineseChar = function (character) {
        //To-Do: Should handle a Chinese characters as two separate scripts such as Chinese Simplified and Chinese Traditional.
        return (
        //Chinese characters https://en.wikipedia.org/wiki/Han_unification#Unicode_ranges
        //Chinese characters are comes under the Han script.
        (character >= String.fromCharCode(19968) && character <= String.fromCharCode(40959)) //CJK Unified Ideographs(4E00–9FFF), https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_(Unicode_block)
            || (character >= String.fromCharCode(13312) && character <= String.fromCharCode(19903)) //CJK Unified Ideographs Extension A(3400–4DBF), https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_Extension_A
            //|| (character >= '\u20000' && character <= '\u2A6DF') //CJK Unified Ideographs Extension B(20000–2A6DF), https://en.wikipedia.org/wiki/CJK_Unified_Ideographs_Extension_B
            // As we don't hold a 32 bit character into char data type, and also it get splitted into two char value, when it is 32 bit.
            // So, below we have added a maximum and least char range of the above 32 bit character.
            // We can split a 32 bit character into two 16 bit characters by "Char.ConvertFromUtf32(0x20000).ToCharArray()" built-in method.
            || (character >= String.fromCharCode(55360) && character <= String.fromCharCode(55401)) // Represents a start and end range of first character code, when we split a character between (character >= '\u20000' && character <= '\u2A6DF').
            || (character >= String.fromCharCode(56320) && character <= String.fromCharCode(57055)) // Represents a start and end range of second character code, when we split a character between (character >= '\u20000' && character <= '\u2A6DF').
            || (character >= String.fromCharCode(43360) && character <= String.fromCharCode(43391)) //CJK Compatibility Ideographs(F900–FAFF), https://en.wikipedia.org/wiki/CJK_Compatibility_Ideographs
            || (character >= String.fromCharCode(65280) && character <= String.fromCharCode(65519)) //Halfwidth and Fullwidth Forms, https://en.wikipedia.org/wiki/Halfwidth_and_Fullwidth_Forms_(Unicode_block).
            || (character >= String.fromCharCode(12288) && character <= String.fromCharCode(12351)) //CJK Symbols and Punctuation, https://en.wikipedia.org/wiki/CJK_Symbols_and_Punctuation
            || (character >= String.fromCharCode(0xF900) && character <= String.fromCharCode(0xFAFF)));
    };
    ParagraphWidget.prototype.isSpecialCharacters = function (character) {
        return ((character >= String.fromCharCode(8192) && character <= String.fromCharCode(10175)));
    };
    ParagraphWidget.prototype.getFontScriptType = function (inputCharacter, hasHintType) {
        // Return FontScriptType as Hindi, if input character is in-between Hindi character ranges.
        if (this.isHindiChar(inputCharacter))
            return FontScriptType.Hindi;
        // Return FontScriptType as Korean, if input character is in-between Korean character ranges.
        else if (this.isKoreanChar(inputCharacter))
            return FontScriptType.Korean;
        // Return FontScriptType as Japanese, if input character is in-between Japanese character ranges.
        else if (this.isJapanese(inputCharacter))
            return FontScriptType.Japanese;
        // Return FontScriptType as Chinese, if input character is in-between Chinese character ranges.
        else if (this.isChineseChar(inputCharacter))
            return FontScriptType.Chinese;
        // Return FontScriptType as Arabic, if input character is in-between Arabic character ranges.
        else if (this.isArabicChar(inputCharacter))
            return FontScriptType.Arabic;
        // Return FontScriptType as Hebrew, if input character is in-between Hebrew character ranges.
        else if (this.isHebrewChar(inputCharacter))
            return FontScriptType.Hebrew;
        // Return FontScriptType as Thai, if input character is in-between Thai character ranges.
        else if (this.isThaiCharacter(inputCharacter))
            return FontScriptType.Thai;
        // Return FontScriptType as SpecialCharacter, if input character is in-between SpecialCharacter character ranges.
        else if (this.isSpecialCharacters(inputCharacter) && hasHintType)
            return FontScriptType.SpecialCharacter;
        // Return FontScriptType as English, for remaining character ranges.
        else
            return FontScriptType.English;
    };
    ParagraphWidget.prototype.splitTextByFontScriptType = function (inputText, fontScriptTypes, hasHintType) {
        var splittedText = [];
        //Retrun the empty array, if input text is Null or Empty.
        if (isNullOrUndefined(inputText)
            || (!isNullOrUndefined(inputText) && inputText === '')) {
            return splittedText;
        }
        var text = '';
        var prevCharacterType = FontScriptType.English;
        var currCharacterType = FontScriptType.English;
        // Regex for finding a string is unicode or not.
        var surrogateRegex = /[\uD800-\uDFFF]/;
        for (var i = 0; i < inputText.length; i++) {
            // Gets a FontScriptType for the current character.
            // As per the Microsoft application behavior, we need to consider a space (\u0020) as previous character type.
            // So, that we can avoid a text splitting based on space character.
            if (inputText[i] != String.fromCharCode(32) && !surrogateRegex.test(inputText[i])) {
                // && !(char.IsHighSurrogate(inputText.charAt(i)) || char.IsLowSurrogate(inputText.charAt(i)))) { //Skip the setting of script type for surrogate character.
                currCharacterType = this.getFontScriptType(inputText[i], hasHintType);
            }
            //Add a current text into splitted text collection, when previous character type is not equival to current type.
            if (text != '' && currCharacterType !== prevCharacterType) {
                //Add splitted text and it's FontScriptType into the collection.
                splittedText.push(text);
                fontScriptTypes.push(prevCharacterType);
                //Reset the text value.
                text = '';
            }
            //Add a current character.
            text += inputText[i];
            //Assign a current character type as previous type.
            prevCharacterType = currCharacterType;
        }
        //Add a final text.
        if (text != '') {
            //Add splitted text and it's FontScriptType into the collection.
            splittedText.push(text);
            fontScriptTypes.push(currCharacterType);
            //Reset the text value.
            text = '';
        }
        return splittedText;
    };
    ParagraphWidget.prototype.splitTextRangeByScriptType = function (lineIndex) {
        var isField = false;
        var iIncrementer = 1;
        // Iterates the items for textrange in the paragraph.
        if (this.childWidgets.length > 0) {
            var lineWidget = this.childWidgets[lineIndex];
            for (var i = lineIndex + 1; i < this.childWidgets.length; i++) {
                var nextLineWidget = this.childWidgets[i];
                for (var m = 0; m < nextLineWidget.children.length; m++) {
                    var element = nextLineWidget.children[m];
                    lineWidget.children.push(element);
                    element.line = lineWidget;
                }
                this.childWidgets.splice(i, 1);
                i--;
            }
            for (var i = 0; i < lineWidget.children.length; i += iIncrementer) {
                var elementBox = lineWidget.children[i];
                iIncrementer = 1;
                // InlineContentControl inlineContentControl = paraItems[i] as InlineContentControl;
                // if (inlineContentControl != null)
                //     this.splitTextRangeByScriptType(inlineContentControl.ParagraphItems, splitter);
                ////Gets the span to split.
                var textElement = undefined;
                if (elementBox instanceof TextElementBox) {
                    textElement = elementBox;
                }
                if (elementBox instanceof FieldElementBox && elementBox.fieldType == 0) {
                    isField = true;
                }
                else if (elementBox instanceof FieldElementBox && elementBox.fieldType === 2) {
                    isField = false;
                }
                if (textElement != undefined && !isField) {
                    // ToDo: Need to handle CS font hint type
                    var hasHintType = textElement.characterFormat.fontHintType === 'EastAsia' && textElement.characterFormat.hasValue('fontFamilyFarEast');
                    var fontScriptTypes = [];
                    // Split a current text part text based on FontScriptType.
                    var splitedTextCollection = this.splitTextByFontScriptType(textElement.text, fontScriptTypes, hasHintType);
                    if (splitedTextCollection.length > 1) {
                        for (var j = 0; j < splitedTextCollection.length; j++) {
                            var text = splitedTextCollection[j];
                            if (j > 0) {
                                //Split text range.
                                //Clone the source text range.
                                var clonedtextElement = textElement.clone();
                                clonedtextElement.text = text;
                                //Sets a script type of WTextRange.
                                clonedtextElement.scriptType = fontScriptTypes[j];
                                //Insert the splitted text ranges in order.
                                lineWidget.children.splice(i + j, 0, clonedtextElement);
                                clonedtextElement.line = lineWidget;
                                iIncrementer++;
                                if (textElement.revisions.length > 0) {
                                    this.updateTextElementInRevisionRange(textElement, clonedtextElement);
                                }
                            }
                            else {
                                //Replace the source text range with splitted text.
                                textElement.text = text;
                                //Sets a script type of WTextRange.
                                textElement.scriptType = fontScriptTypes[j];
                            }
                        }
                    }
                    else if (splitedTextCollection.length > 0) {
                        //Sets a script type of WTextRange.
                        textElement.scriptType = fontScriptTypes[0];
                    }
                    // Clear the FontScriptType collection.
                    fontScriptTypes.length = 0;
                }
            }
        }
    };
    /**
     * @private
     */
    ParagraphWidget.prototype.splitLtrAndRtlText = function (lineIndex) {
        var isPrevLTRText = { value: null };
        var iIncrementer = 1;
        var hasRTLCharacter = { value: null };
        var characterRangeTypes = [];
        var isField = false;
        var documentHelper = this.bodyWidget.page.documentHelper;
        var textHelper = documentHelper.textHelper;
        if (this.childWidgets.length > 0) {
            var lineWidget = this.childWidgets[lineIndex];
            for (var i = 0; i < lineWidget.children.length; i += iIncrementer) {
                var elementBox = lineWidget.children[i];
                iIncrementer = 1;
                ////Gets the span to split.
                var textElement = undefined;
                if (elementBox instanceof TextElementBox) {
                    textElement = elementBox;
                }
                if (elementBox instanceof FieldElementBox && elementBox.fieldType == 0) {
                    isField = true;
                }
                else if (elementBox instanceof FieldElementBox && elementBox.fieldType === 2) {
                    isField = false;
                }
                if (textElement != undefined && !isField) {
                    var text = textElement.text;
                    var isTextBidi = textElement.characterFormat.bidi;
                    var isRTLLang = false;
                    var charTypeIndex = characterRangeTypes.length;
                    if (isTextBidi) {
                        isRTLLang = textHelper.isRightToLeftLanguage(elementBox.characterFormat.localeIdBidi);
                    }
                    ////Split the text as consicutive LTR and RTL
                    var splitedTextCollection = textHelper.splitTextByConsecutiveLtrAndRtl(text, isTextBidi, isRTLLang, characterRangeTypes, isPrevLTRText, hasRTLCharacter);
                    if (splitedTextCollection.length > 1) {
                        for (var j = 0; j < splitedTextCollection.length; j++) {
                            text = splitedTextCollection[j];
                            if (j > 0) {
                                ////Clone the source span.
                                var clonedTextElement = textElement.clone();
                                clonedTextElement.text = text;
                                clonedTextElement.characterRange = characterRangeTypes[j + charTypeIndex];
                                ////Inert the splitted span in order.
                                lineWidget.children.splice(i + j, 0, clonedTextElement);
                                clonedTextElement.line = lineWidget;
                                iIncrementer++;
                                if (textElement.revisions.length > 0) {
                                    this.updateTextElementInRevisionRange(textElement, clonedTextElement);
                                }
                            }
                            else {
                                ////Replace the source span with splitted text.
                                textElement.text = text;
                                textElement.characterRange = characterRangeTypes[charTypeIndex];
                            }
                        }
                    }
                    else if (splitedTextCollection.length > 0) {
                        textElement.characterRange = characterRangeTypes[charTypeIndex];
                    }
                }
            }
            characterRangeTypes.length = 0;
        }
    };
    ParagraphWidget.prototype.updateTextElementInRevisionRange = function (inline, splittedElementBox) {
        for (var i = 0; i < inline.revisions.length; i++) {
            var revision = inline.revisions[i];
            var inlineIndex = revision.range.indexOf(inline);
            revision.range.splice(inlineIndex + 1, 0, splittedElementBox);
            splittedElementBox.revisions.push(revision);
            splittedElementBox.removedIds = [];
        }
    };
    /**
     * Combine the spans by consecutive LTR and RTL texts.
     * @private
     */
    ParagraphWidget.prototype.combineconsecutiveRTL = function (lineIndex) {
        var isField = false;
        var documentHelper = this.bodyWidget.page.documentHelper;
        var textHelper = documentHelper.textHelper;
        for (var j = lineIndex; j < this.childWidgets.length; j++) {
            var lineWidget = this.childWidgets[j];
            for (var i = 0; i <= lineWidget.children.length - 2; i++) {
                var elementBox = lineWidget.children[i];
                if (elementBox instanceof FieldElementBox && elementBox.fieldType === 0) {
                    isField = true;
                }
                else if (elementBox instanceof FieldElementBox && elementBox.fieldType === 2) {
                    isField = false;
                }
                if (!isField && elementBox instanceof TextElementBox && lineWidget.children[i + 1] instanceof TextElementBox) {
                    var currentTxtRange = elementBox;
                    var nextTxtRange = lineWidget.children[i + 1];
                    // Bug 866413: Here skipped the Hewbrew script type rtl text combining, because facing element left margin issue.
                    if (((currentTxtRange.characterFormat.complexScript && currentTxtRange.scriptType == nextTxtRange.scriptType) || (currentTxtRange.characterFormat.bidi && currentTxtRange.scriptType !== FontScriptType.Hebrew
                        && currentTxtRange.characterRange == CharacterRangeType.RightToLeft && nextTxtRange.characterRange == CharacterRangeType.RightToLeft)) &&
                        currentTxtRange.text.length > 0 && nextTxtRange.text.length > 0 &&
                        !textHelper.isWordSplitChar(currentTxtRange.text[currentTxtRange.text.length - 1]) && !textHelper.isWordSplitChar(nextTxtRange.text[0])
                        && currentTxtRange.characterFormat.isEqualFormat(nextTxtRange.characterFormat) && this.compareRevisions(currentTxtRange.revisions, nextTxtRange.revisions)) {
                        currentTxtRange.text = currentTxtRange.text + nextTxtRange.text;
                        lineWidget.children.splice(i + 1, 1);
                        i--;
                    }
                    else if (currentTxtRange.characterRange == CharacterRangeType.RightToLeft && nextTxtRange.characterRange == CharacterRangeType.RightToLeft &&
                        currentTxtRange.text.length > 0 && nextTxtRange.text.length > 0 &&
                        textHelper.isWordSplitChar(currentTxtRange.text[currentTxtRange.text.length - 1]) && textHelper.isWordSplitChar(nextTxtRange.text[0])
                        && currentTxtRange.characterFormat.isEqualFormat(nextTxtRange.characterFormat) && this.compareRevisions(currentTxtRange.revisions, nextTxtRange.revisions)) {
                        currentTxtRange.text = currentTxtRange.text + nextTxtRange.text;
                        lineWidget.children.splice(i + 1, 1);
                        i--;
                    }
                }
            }
        }
    };
    ParagraphWidget.prototype.compareRevisions = function (revisionA, revisionB) {
        if (revisionA.length !== revisionB.length) {
            return false;
        }
        for (var i = 0; i < revisionA.length; i++) {
            if (revisionA[i] !== revisionB[i]) {
                return false;
            }
        }
        return true;
    };
    ParagraphWidget.prototype.clone = function () {
        var paragraph = new ParagraphWidget();
        paragraph.paragraphFormat.copyFormat(this.paragraphFormat);
        paragraph.characterFormat.copyFormat(this.characterFormat);
        for (var i = 0; i < this.childWidgets.length; i++) {
            var line = this.childWidgets[i];
            var cloneLine = line.clone();
            paragraph.childWidgets.push(cloneLine);
            for (var j = 0; j < cloneLine.children.length; j++) {
                var element = cloneLine.children[j];
                if ((element instanceof ImageElementBox && element.textWrappingStyle !== 'Inline') || element instanceof ShapeElementBox) {
                    paragraph.floatingElements.push(element);
                }
            }
            cloneLine.paragraph = paragraph;
        }
        paragraph.x = this.x;
        paragraph.y = this.y;
        paragraph.height = this.height;
        paragraph.width = this.width;
        paragraph['absoluteXPosition'] = isNullOrUndefined(this['absoluteXPosition']) ? undefined : { 'width': this['absoluteXPosition']['width'], 'x': this['absoluteXPosition']['x'] };
        if (this.contentControlProperties) {
            paragraph.contentControlProperties = this.contentControlProperties;
        }
        return paragraph;
    };
    ParagraphWidget.prototype.destroyInternal = function (viewer) {
        var height = this.height;
        if (!isNullOrUndefined(this.childWidgets)) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var widget = this.childWidgets[i];
                widget.destroy();
                if (this.childWidgets.length === 1 && isNullOrUndefined(this.childWidgets[0].children)) {
                    this.childWidgets = undefined;
                }
                if (isNullOrUndefined(this.childWidgets)) {
                    break;
                }
                i--;
            }
            this.childWidgets = undefined;
        }
        if (!isNullOrUndefined(this.containerWidget) && !isNullOrUndefined(this.containerWidget.childWidgets)
            && this.containerWidget.childWidgets.indexOf(this) !== -1) {
            this.containerWidget.childWidgets.splice(this.containerWidget.childWidgets.indexOf(this), 1);
            this.containerWidget.height -= height;
            // if ((isNullOrUndefined(this.containerWidget.childWidgets) || this.containerWidget.childWidgets.length === 0)
            //     && this.containerWidget instanceof BodyWidget) {
            //     // (this.containerWidget as BodyWidget).destroyInternal(viewer);
            // }
            this.containerWidget = undefined;
        }
        if (this.hasOwnProperty('absoluteXPosition')) {
            delete this['absoluteXPosition'];
        }
        this.destroy();
    };
    ParagraphWidget.prototype.destroy = function () {
        // if (this.paragraphFormat) {
        //     this.paragraphFormat.destroy();
        // }
        this.paragraphFormat = undefined;
        // if (this.characterFormat) {
        //     this.characterFormat.destroy();
        // }
        this.characterFormat = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    ParagraphWidget.prototype.componentDestroy = function () {
        if (this.paragraphFormat) {
            this.paragraphFormat.destroy();
        }
        this.paragraphFormat = undefined;
        if (this.characterFormat) {
            this.characterFormat.destroy();
        }
        this.characterFormat = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return ParagraphWidget;
}(BlockWidget));
export { ParagraphWidget };
/**
 * @private
 */
var TablePosition = /** @class */ (function () {
    function TablePosition() {
    }
    /**
     * @private
     */
    TablePosition.prototype.clone = function () {
        var positioning = new TablePosition();
        positioning.allowOverlap = this.allowOverlap;
        positioning.distanceTop = this.distanceTop;
        positioning.distanceRight = this.distanceRight;
        positioning.distanceLeft = this.distanceLeft;
        positioning.distanceBottom = this.distanceBottom;
        positioning.verticalAlignment = this.verticalAlignment;
        positioning.verticalOrigin = this.verticalOrigin;
        positioning.verticalPosition = this.verticalPosition;
        positioning.horizontalAlignment = this.horizontalAlignment;
        positioning.horizontalOrigin = this.horizontalOrigin;
        positioning.horizontalPosition = this.horizontalPosition;
        return positioning;
    };
    return TablePosition;
}());
export { TablePosition };
/**
 * @private
 */
var TableWidget = /** @class */ (function (_super) {
    __extends(TableWidget, _super);
    function TableWidget() {
        var _this = _super.call(this) || this;
        _this.flags = 0;
        /**
         * @private
         */
        _this.leftMargin = 0;
        /**
         * @private
         */
        _this.topMargin = 0;
        /**
         * @private
         */
        _this.rightMargin = 0;
        /**
         * @private
         */
        _this.bottomMargin = 0;
        /**
         * @private
         */
        _this.isDefaultFormatUpdated = false;
        /**
         * @private
         */
        _this.isContainInsideTable = false;
        /**
         * @private
         */
        _this.footnoteElement = [];
        _this.margin = new Margin(_this.leftMargin, _this.topMargin, _this.rightMargin, _this.bottomMargin);
        _this.leftBorderWidth = 0;
        _this.rightBorderWidth = 0;
        _this.topBorderWidth = 0;
        _this.bottomBorderWidth = 0;
        _this.tableFormat = new WTableFormat(_this);
        _this.tableHolder = new WTableHolder();
        _this.spannedRowCollection = new Dictionary();
        return _this;
    }
    Object.defineProperty(TableWidget.prototype, "isGridUpdated", {
        // /**
        //  * @private
        //  */
        // get length(): number {
        //     if (!isNullOrUndefined(this.nextSplitWidget)) {
        //         return 1;
        //     } else {
        //         if (isNullOrUndefined(this.previousSplitWidget)) {
        //             return 1;
        //         }
        //         return 0;
        //     }
        // }
        /**
         * @private
         */
        get: function () {
            return ((this.flags & 0x4) >> 2) !== 0;
        },
        /**
         * @private
         */
        set: function (value) {
            this.flags = ((this.flags & 0xFB) | ((value ? 1 : 0) << 2));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableWidget.prototype, "continueHeader", {
        /**
         * @private
         */
        get: function () {
            return ((this.flags & 0x2) >> 1) !== 0;
        },
        /**
         * @private
         */
        set: function (value) {
            this.flags = ((this.flags & 0xFD) | ((value ? 1 : 0) << 1));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableWidget.prototype, "header", {
        /**
         * @private
         */
        get: function () {
            return (this.flags & 0x1) !== 0;
        },
        /**
         * @private
         */
        set: function (value) {
            this.flags = ((this.flags & 0xFE) | (value ? 1 : 0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableWidget.prototype, "isBidiTable", {
        get: function () {
            return ((this.flags & 0x10) >> 4) !== 0;
        },
        set: function (value) {
            this.flags = ((this.flags & 0xEF) | ((value ? 1 : 0) << 4));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    TableWidget.prototype.equals = function (widget) {
        return widget instanceof TableWidget && widget.tableFormat === this.tableFormat;
    };
    /**
     * @private
     */
    TableWidget.prototype.combineRows = function (viewer) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            if (!isNullOrUndefined(row.firstChild) && row.firstChild.index !== 0 && row.getSplitWidgets().length === 1) {
                for (var j = 0; j < row.childWidgets.length; j++) {
                    row.childWidgets[j].index--;
                }
            }
            if (row.childWidgets.length === 0) {
                row.destroy();
                i--;
            }
            else {
                row.combineCells(viewer);
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.contains = function (tableCell) {
        if (this.equals(tableCell.ownerTable)) {
            return true;
        }
        while (tableCell.ownerTable.isInsideTable) {
            if (this.equals(tableCell.ownerTable)) {
                return true;
            }
            tableCell = tableCell.ownerTable.associatedCell;
        }
        return this.equals(tableCell.ownerTable);
    };
    /**
     * @private
     */
    TableWidget.prototype.getOwnerWidth = function (isBasedOnViewer) {
        var width = this.getContainerWidth();
        // As per the Microsoft Word behavior, left and right indent should be considered for the auto preferred width type table
        // and not to be considered for the point and percent preferred width type table.
        if (this.tableFormat.preferredWidthType === 'Auto') {
            width = width - this.leftIndent - this.rightIndent;
        }
        return width >= 0 ? width : 0;
    };
    /**
     * @private
     */
    TableWidget.prototype.getTableWidth = function () {
        var width = 0;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var rowWidth = 0;
            var row = this.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                rowWidth += row.childWidgets[j].cellFormat.cellWidth;
            }
            if (width < rowWidth) {
                width = rowWidth;
            }
        }
        return width;
    };
    /**
     * @private
     */
    TableWidget.prototype.getTableCellWidth = function () {
        var width = 0;
        for (var k = 0; k < this.childWidgets.length; k++) {
            var rowWidth = 0;
            var rowWidget = this.childWidgets[k];
            for (var m = 0; m < rowWidget.childWidgets.length; m++) {
                var cellWidget = rowWidget.childWidgets[m];
                var cellWidth = cellWidget.width;
                if (cellWidth === 0) {
                    cellWidth = cellWidget.cellFormat.cellWidth;
                    if (cellWidth > cellWidget.cellFormat.preferredWidth &&
                        cellWidget.cellFormat.preferredWidth !== 0 && cellWidget.cellFormat.preferredWidthType !== 'Percent') {
                        cellWidth = cellWidget.cellFormat.preferredWidth;
                    }
                    cellWidth = HelperMethods.convertPointToPixel(cellWidth - (cellWidget.margin.left + cellWidget.margin.right));
                }
                rowWidth += (cellWidth + cellWidget.margin.left + cellWidget.margin.right);
            }
            if (width < rowWidth) {
                width = rowWidth;
            }
        }
        return width;
    };
    /**
     * @private
     */
    TableWidget.prototype.getTableClientWidth = function (clientWidth) {
        var tableWidth = clientWidth;
        if (this.tableFormat.preferredWidthType === 'Point'
            && this.tableFormat.preferredWidth > 0) {
            tableWidth = this.tableFormat.preferredWidth;
        }
        else {
            if (this.tableFormat.preferredWidthType === 'Percent'
                && this.tableFormat.preferredWidth > 0) {
                tableWidth = tableWidth * this.tableFormat.preferredWidth / 100;
            }
        }
        return tableWidth;
    };
    /**
     * @private
     */
    TableWidget.prototype.getCellWidth = function (preferredWidth, preferredWidthType, containerWidth, cell) {
        var cellWidth = preferredWidth;
        if (preferredWidthType === 'Percent') {
            cellWidth = (preferredWidth * containerWidth) / 100;
        }
        else if (preferredWidthType === 'Point') {
            cellWidth = preferredWidth;
        }
        // For grid before and grid after with auto width, no need to calculate minimum preferred width.
        else if (!isNullOrUndefined(cell)) {
            cellWidth = this.getMinimumPreferredWidth(cell);
        }
        return cellWidth;
    };
    TableWidget.prototype.getMinimumPreferredWidth = function (cell) {
        var defaultWidth = 0;
        ////For fixed table, cell width (grid column width) should be considered as default width, When the preferred cell width is zero.
        if (cell.cellFormat.preferredWidth === 0 && cell.cellFormat.cellWidth !== 0 && !(cell.ownerTable
            && cell.ownerTable.bodyWidget && cell.ownerTable.bodyWidget.page &&
            cell.ownerTable.bodyWidget.page.documentHelper && cell.ownerTable.bodyWidget.page.documentHelper.layout
            && this.bodyWidget.page.documentHelper.layout.isAllColumnHasAutoWidthType)) {
            defaultWidth = cell.cellFormat.cellWidth;
        }
        else {
            defaultWidth = cell.getMinimumPreferredWidth();
        }
        return defaultWidth;
    };
    /**
     * @private
     */
    TableWidget.prototype.fitCellsToClientArea = function (clientWidth) {
        var tableWidth = this.getTableWidth();
        var factor = clientWidth / tableWidth;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            row.rowFormat.gridAfterWidth *= factor;
            row.rowFormat.gridBeforeWidth *= factor;
            for (var j = 0; j < row.childWidgets.length; j++) {
                row.childWidgets[j].cellFormat.cellWidth *= factor;
                row.childWidgets[j].cellFormat.preferredWidth *= factor;
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.getTableCellWidget = function (point) {
        var tableCellWidget = undefined;
        for (var i = 0; i < this.childWidgets.length; i++) {
            if (this.childWidgets[i].y <= point.y
                && (this.childWidgets[i].y + this.childWidgets[i].height) >= point.y) {
                tableCellWidget = this.childWidgets[i].getTableCellWidget(point);
                break;
            }
        }
        return tableCellWidget;
    };
    /**
     * @private
     */
    /* eslint-disable  */
    TableWidget.prototype.calculateGrid = function (isInsertRow) {
        var tempGrid = [];
        var tempSpanDecimal = [];
        var spannedCells = [];
        var containerWidth = this.getOwnerWidth(true);
        var tableWidth = this.getTableClientWidth(containerWidth);
        this.tableCellInfo = new Dictionary();
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            var rowCellInfo = new Dictionary();
            var rowFormat = row.rowFormat;
            var cellWidth = 0;
            var columnSpan = row.rowFormat.gridBefore;
            var currOffset = 0;
            if (tempGrid.indexOf(currOffset) < 0) {
                tempGrid.push(currOffset);
                tempSpanDecimal.push(currOffset);
            }
            //Converts the row grid before width from point to twips point by 15 factor.
            cellWidth = this.getCellWidth(rowFormat.gridBeforeWidth, rowFormat.gridBeforeWidthType, tableWidth, null);
            currOffset += cellWidth;
            var startOffset = parseFloat(currOffset.toFixed(2));
            if (tempGrid.indexOf(startOffset) < 0) {
                tempGrid.push(startOffset);
                tempSpanDecimal.push(currOffset);
            }
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                for (var k = 0; k < spannedCells.length; k++) {
                    if (spannedCells[k].columnIndex < columnSpan) {
                        continue;
                    }
                    var rowSpan = spannedCells[k].cellFormat.rowSpan;
                    var removeSpannedCell = true;
                    if (spannedCells[k].columnIndex > columnSpan) {
                        {
                            removeSpannedCell = false;
                            // If the cell is the last cell in the row and the row has grid after value..
                            if (j === row.childWidgets.length - 1 && row.rowFormat.gridAfter > 0) {
                                cellWidth = this.getCellWidth(spannedCells[k].cellFormat.preferredWidth, spannedCells[k].cellFormat.preferredWidthType, tableWidth, null);
                                currOffset += cellWidth;
                            }
                        }
                    }
                    else {
                        // If the table gird alone calculted then column index of the rowspanned cell will be directly taken. 
                        // If the gird calculation is done from the UI level opearations such as resizing then table holder 
                        // will have the columns at that time we can get the column index from the table holder.
                        //Converts the cell width from point to twips point by 15 factor.
                        cellWidth = this.getCellWidth(spannedCells[k].cellFormat.preferredWidth, spannedCells[k].cellFormat.preferredWidthType, tableWidth, null);
                        currOffset += cellWidth;
                        columnSpan = spannedCells[k].columnIndex + spannedCells[k].cellFormat.columnSpan;
                    }
                    if (!removeSpannedCell && j === row.childWidgets.length - 1) {
                        removeSpannedCell = true;
                    }
                    if (removeSpannedCell && i - spannedCells[k].ownerRow.rowIndex === rowSpan - 1) {
                        spannedCells.splice(k, 1);
                        k--;
                    }
                }
                // At the start of each row, we will process the row spanned cells to get the start column index.
                // To calculate grid properly, we need the items in the spanned cells collection in the order of their column index
                if (cell.cellFormat.rowSpan > 1) {
                    if (spannedCells.length === 0 || spannedCells[spannedCells.length - 1].columnIndex <= columnSpan) {
                        spannedCells.push(cell);
                    }
                    else {
                        for (var m = spannedCells.length; m > 0; m--) {
                            if (spannedCells[m - 1].columnIndex > columnSpan) {
                                spannedCells.splice(m - 1, 0, cell);
                            }
                        }
                    }
                }
                // Add start offset of each cell based on its index
                if (!rowCellInfo.containsKey(cell.cellIndex)) {
                    rowCellInfo.add(cell.cellIndex, parseFloat((currOffset - startOffset).toFixed(2)));
                }
                columnSpan += cell.cellFormat.columnSpan;
                //Converts the cell width from pixel to twips point by 15 factor.
                cellWidth = this.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, tableWidth, null);
                currOffset += cellWidth;
                var offset = parseFloat(currOffset.toFixed(2));
                if (tempGrid.indexOf(offset) < 0) {
                    tempGrid.push(offset);
                    tempSpanDecimal.push(currOffset);
                }
                if (j === row.childWidgets.length - 1 && rowFormat.gridAfter > 0) {
                    cellWidth = this.getCellWidth(rowFormat.gridAfterWidth, 'Point', tableWidth, null);
                    currOffset += cellWidth;
                    if (tempGrid.indexOf(parseFloat(currOffset.toFixed(2))) < 0) {
                        tempGrid.push(parseFloat(currOffset.toFixed(2)));
                        tempSpanDecimal.push(currOffset);
                    }
                    columnSpan += rowFormat.gridAfter;
                }
                // Add rowindex and its cells info for each row
                if (!this.tableCellInfo.containsKey(row.rowIndex)) {
                    this.tableCellInfo.add(row.rowIndex, rowCellInfo);
                }
            }
        }
        tempGrid.sort(function (a, b) { return a - b; });
        tempSpanDecimal.sort(function (a, b) { return a - b; });
        if (this.tableHolder.columns.length > 0 && (tempGrid.length - 1 !== this.tableHolder.columns.length || isInsertRow)) {
            this.updateColumnSpans(tempGrid, tableWidth, tempSpanDecimal);
        }
        this.tableCellInfo.clear();
        this.tableCellInfo = undefined;
    };
    TableWidget.prototype.updateColumnSpans = function (tempGrid, containerWidth, tempSpan) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            if (row.rowFormat.gridBeforeWidth >= 0) {
                row.rowFormat.gridBefore = row.getGridCount(tempGrid, undefined, -1, containerWidth, tempSpan);
            }
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var columnSpan = row.getGridCount(tempGrid, cell, cell.getIndex(), containerWidth, tempSpan);
                if (columnSpan > 0 && cell.cellFormat.columnSpan !== columnSpan) {
                    cell.cellFormat.columnSpan = columnSpan;
                }
            }
            if (row.rowFormat.gridAfterWidth >= 0) {
                row.rowFormat.gridAfter = row.getGridCount(tempGrid, undefined, row.childWidgets.length, containerWidth, tempSpan);
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
        this.checkTableColumns();
        var isAllColumnHasPointWidth = this.tableHolder.isAllColumnHasPointWidthType();
        var tableWidth = isAllColumnHasPointWidth ? this.tableHolder.getTotalWidth(0) : this.tableHolder.getTotalWidth(1);
        if (tableWidth > minimumWordWidth) {
            minimumWordWidth = tableWidth;
        }
        if (!isAllColumnHasPointWidth) {
            tableWidth = this.tableHolder.getTotalWidth(2);
        }
        if (tableWidth > maximumWordWidth) {
            maximumWordWidth = tableWidth;
        }
        return { 'minimumWordWidth': minimumWordWidth, 'maximumWordWidth': maximumWordWidth };
    };
    /**
     * @private
     */
    TableWidget.prototype.checkTableColumns = function () {
        if (this.isGridUpdated) {
            return;
        }
        var isAutoFit = this.isAutoFit();
        if (isAutoFit || this.tableHolder.columns.length === 0) {
            this.buildTableColumns();
        }
        this.isGridUpdated = false;
    };
    /**
     * @private
     */
    TableWidget.prototype.isAutoFit = function () {
        var bodyWidget = this.bodyWidget;
        if (!isNullOrUndefined(bodyWidget) && !isNullOrUndefined(bodyWidget.page)) {
            return bodyWidget.page.documentHelper.layout.getParentTable(this).tableFormat.allowAutoFit;
        }
        return false;
    };
    /**
     * @private
     */
    TableWidget.prototype.buildTableColumns = function () {
        if (this.isGridUpdated) {
            return;
        }
        // Clear existing columns in order to start creating columns freshly.
        this.tableHolder.resetColumns();
        var containerWidth = 0;
        var tableWidth = 0;
        var rowSpannedCells = [];
        /* eslint-disable-next-line max-len */
        var isAutoWidth = (this.tableFormat.preferredWidthType === 'Auto' || (this.tableFormat.preferredWidthType === "Point" && this.tableFormat.preferredWidth === 0));
        var isAutoFit = this.tableFormat.allowAutoFit;
        // For continuous layout, window width should be considered. 
        // If preferred width exceeds this limit, it can take upto maximum of 2112 pixels (1584 points will be assigned by Microsoft Word).
        if (((!isNullOrUndefined(this.bodyWidget.page)) && this.bodyWidget.page.viewer instanceof WebLayoutViewer && isAutoFit && !this.isInsideTable && !(this.containerWidget instanceof TextFrame))) {
            containerWidth = HelperMethods.convertPixelToPoint(this.bodyWidget.page.viewer.clientArea.width - this.bodyWidget.page.viewer.padding.right * 3);
        }
        else {
            containerWidth = this.getOwnerWidth(true);
        }
        if (!isNullOrUndefined(this.bodyWidget.page) && this.bodyWidget.page.documentHelper && this.bodyWidget.page.documentHelper.layout) {
            this.bodyWidget.page.documentHelper.layout.isAllColumnHasAutoWidthType = this.bodyWidget.page.documentHelper.layout.isAuto(this);
        }
        containerWidth = (this.tableFormat.preferredWidth > containerWidth) ? this.tableFormat.preferredWidth : containerWidth;
        var isZeroWidth = (isAutoWidth && this.tableFormat.preferredWidth === 0 && !isAutoFit);
        tableWidth = this.getTableClientWidth(containerWidth);
        var pageContainerWidth = this.getContainerWidth();
        if (isZeroWidth && !this.isDefaultFormatUpdated && isAutoFit) {
            this.splitWidthToTableCells(tableWidth, isZeroWidth);
        }
        var hasSpannedCells = false;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            var rowFormat = row.rowFormat;
            var columnSpan = 0;
            var cellWidth = 0;
            var sizeInfo = new ColumnSizeInfo();
            var offset = 0;
            if (rowFormat.gridBefore > 0 && (row.rowFormat.beforeWidth !== 0 || row.rowFormat.gridBeforeWidth !== 0) && ((this.bodyWidget.page.documentHelper.alignTablesRowByRow) ? row.ownerTable.tableFormat.tableAlignment === 'Left' || (this.bodyWidget.page.documentHelper.compatibilityMode === 'Word2003' && row.ownerTable.firstChild.rowFormat.gridAfter > 0) : true)) {
                cellWidth = this.getCellWidth(rowFormat.gridBeforeWidth, row.rowFormat.gridAfterWidthType, tableWidth, null);
                sizeInfo.minimumWidth = cellWidth;
                this.tableHolder.addColumns(columnSpan, columnSpan = rowFormat.gridBefore, cellWidth, sizeInfo, offset = cellWidth, 'Point');
            }
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                if (cell.cellFormat.rowSpan > 1 || cell.cellFormat.columnSpan > 1) {
                    hasSpannedCells = true;
                }
                if (rowSpannedCells.length === 0) {
                    cell.columnIndex = columnSpan;
                }
                for (var k = 0; k < rowSpannedCells.length; k++) {
                    var rowSpannedCell = rowSpannedCells[k];
                    if (rowSpannedCell.columnIndex < columnSpan) {
                        cell.columnIndex = columnSpan;
                        continue;
                    }
                    var rowSpan = 1;
                    var removeSpannedCell = true;
                    rowSpan = rowSpannedCell.cellFormat.rowSpan;
                    if (rowSpannedCell.columnIndex > columnSpan) {
                        cell.columnIndex = columnSpan;
                        removeSpannedCell = false;
                    }
                    else {
                        sizeInfo = rowSpannedCell.getCellSizeInfo(isAutoFit);
                        cellWidth = this.getCellWidth(rowSpannedCell.cellFormat.preferredWidth, rowSpannedCell.cellFormat.preferredWidthType, tableWidth, rowSpannedCell);
                        // If the table gird alone calculated then column index of the rowspanned cell will be directly taken. 
                        // If the gird calculation is done from the UI level operations such as resizing then table holder will have the columns at that time we can get the column index from the table holder.
                        if (this.tableHolder.columns.length > 0) {
                            this.tableHolder.addColumns(columnSpan, columnSpan = this.tableHolder.columns.indexOf(rowSpannedCell.ownerColumn) + rowSpannedCell.cellFormat.columnSpan, cellWidth, sizeInfo, offset += cellWidth, cell.cellFormat.preferredWidthType);
                            cell.columnIndex = columnSpan;
                        }
                        else {
                            this.tableHolder.addColumns(columnSpan, columnSpan = rowSpannedCell.columnIndex + rowSpannedCell.cellFormat.columnSpan, cellWidth, sizeInfo, offset += cellWidth, cell.cellFormat.preferredWidthType);
                            cell.columnIndex = columnSpan;
                        }
                    }
                    if (!removeSpannedCell && j === row.childWidgets.length - 1) {
                        removeSpannedCell = true;
                    }
                    if (removeSpannedCell && i - rowSpannedCell.ownerRow.rowIndex === rowSpan - 1) {
                        rowSpannedCells.splice(k, 1);
                        k--;
                    }
                }
                // At the start of each row, we will process the row spanned cells to get the start column index.
                // To calculate grid properly, we need the items in the spanned cells collection in the order of their column index
                if (cell.cellFormat.rowSpan > 1) {
                    if (rowSpannedCells.length === 0 || rowSpannedCells[rowSpannedCells.length - 1].columnIndex <= columnSpan) {
                        rowSpannedCells.push(cell);
                    }
                    else {
                        var insertIndex = 0;
                        for (var m = rowSpannedCells.length; m > 0; m--) {
                            if (rowSpannedCells[m - 1].columnIndex > columnSpan) {
                                insertIndex = m - 1;
                            }
                        }
                        rowSpannedCells.splice(insertIndex, 0, cell);
                    }
                }
                sizeInfo = cell.getCellSizeInfo(isAutoFit);
                cellWidth = this.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, tableWidth, cell);
                this.tableHolder.addColumns(columnSpan, columnSpan += cell.cellFormat.columnSpan, cellWidth, sizeInfo, offset += cellWidth, cell.cellFormat.preferredWidthType);
                if (j === row.childWidgets.length - 1 && rowFormat.gridAfterWidth > 0) {
                    cellWidth = this.getCellWidth(rowFormat.gridAfterWidth, 'Point', tableWidth, null);
                    sizeInfo.minimumWordWidth = sizeInfo.maximumWordWidth = sizeInfo.minimumWidth = cellWidth;
                    this.tableHolder.addColumns(columnSpan, columnSpan += rowFormat.gridAfter, cellWidth, sizeInfo, offset += cellWidth, 'Point');
                }
            }
        }
        if (!isNullOrUndefined(this.bodyWidget.page) && this.bodyWidget.page.documentHelper && this.bodyWidget.page.documentHelper.layout
            && this.bodyWidget.page.documentHelper.layout.isAllColumnHasAutoWidthType) {
            this.bodyWidget.page.documentHelper.layout.isAllColumnHasAutoWidthType = false;
        }
        if (isZeroWidth && !this.isDefaultFormatUpdated) {
            this.isDefaultFormatUpdated = true;
        }
        this.tableHolder.validateColumnWidths();
        if (isAutoFit) {
            // Fits the column width automatically based on contents.
            this.tableHolder.autoFitColumn(containerWidth, tableWidth, isAutoWidth, this.isInsideTable, isAutoFit, hasSpannedCells, this.leftIndent + this.rightIndent, pageContainerWidth, this.tableFormat.preferredWidthType);
        }
        else {
            // Fits the column width based on preferred width. i.e. Fixed layout.
            this.tableHolder.fitColumns(containerWidth, tableWidth, isAutoWidth, isAutoFit, this.leftIndent + this.rightIndent);
        }
        // if (!isAutoFit && isAutoWidth) {
        //     tableWidth = this.tableHolder.tableWidth;
        // }
        //Sets the width to cells
        this.setWidthToCells(tableWidth, isAutoWidth);
    };
    /**
     * @private
     */
    TableWidget.prototype.setWidthToCells = function (tableWidth, isAutoWidth) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var rw = this.childWidgets[i];
            var rowFormat = rw.rowFormat;
            if (rowFormat.gridBefore > 0) {
                rowFormat.beforeWidth = this.tableHolder.getCellWidth(0, rowFormat.gridBefore, tableWidth);
            }
            for (var j = 0; j < rw.childWidgets.length; j++) {
                var cell = rw.childWidgets[j];
                cell.cellFormat.cellWidth = this.tableHolder.getCellWidth(cell.columnIndex, cell.cellFormat.columnSpan, tableWidth);
                //By default, if cell preferred widthType is auto , width set based on table width and type is changed to 'Point'
            }
            if (rowFormat.gridAfter > 0) {
                rowFormat.afterWidth = this.tableHolder.getCellWidth(0, rowFormat.gridAfter, tableWidth);
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.updateProperties = function (updateAllowAutoFit, currentSelectedTable, autoFitBehavior) {
        if (updateAllowAutoFit) {
            this.tableFormat.allowAutoFit = autoFitBehavior !== 'FixedColumnWidth';
        }
        if (this !== currentSelectedTable) {
            currentSelectedTable.updateProperties(false, currentSelectedTable, autoFitBehavior);
            return;
        }
        if (autoFitBehavior === 'FixedColumnWidth') {
            // Clear the table widths and set the preferred width for cells.
            this.tableFormat.preferredWidth = 0;
            this.tableFormat.preferredWidthType = 'Auto';
            for (var i = 0; i < this.childWidgets.length; i++) {
                var rowWidget = this.childWidgets[i];
                for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                    var cellWidget = rowWidget.childWidgets[j];
                    cellWidget.cellFormat.preferredWidthType = 'Point';
                    cellWidget.cellFormat.preferredWidth = cellWidget.cellFormat.cellWidth;
                }
            }
        }
        else if (autoFitBehavior === 'FitToWindow') {
            // Set the preferred width for table and cells in percentage.
            var tableWidth = this.tableHolder.getTotalWidth(0);
            this.tableFormat.leftIndent = 0;
            this.tableFormat.preferredWidth = 100;
            this.tableFormat.preferredWidthType = 'Percent';
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                for (var z = 0; z < row.childWidgets.length; z++) {
                    var cell = row.childWidgets[z];
                    if (cell.cellFormat.preferredWidthType !== 'Percent') {
                        cell.cellFormat.preferredWidthType = 'Percent';
                        cell.cellFormat.preferredWidth = (cell.cellFormat.cellWidth / tableWidth) * 100;
                    }
                }
            }
        }
        else {
            // Clear the preferred width for table and cells.
            this.tableFormat.preferredWidth = 0;
            this.tableFormat.preferredWidthType = 'Auto';
            for (var i = 0; i < this.childWidgets.length; i++) {
                var row = this.childWidgets[i];
                row.rowFormat.beforeWidth = 0;
                row.rowFormat.gridBefore = 0;
                row.rowFormat.gridBeforeWidth = 0;
                row.rowFormat.gridBeforeWidthType = 'Auto';
                row.rowFormat.afterWidth = 0;
                row.rowFormat.gridAfter = 0;
                row.rowFormat.gridAfterWidth = 0;
                row.rowFormat.gridAfterWidthType = 'Auto';
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    cell.cellFormat.preferredWidth = 0;
                    cell.cellFormat.preferredWidthType = 'Auto';
                }
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.getMaxRowWidth = function (clientWidth) {
        var width = 0;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            var rowWidth = 0;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                rowWidth += this.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, clientWidth, cell);
            }
            if (width < rowWidth) {
                width = rowWidth;
            }
        }
        return width;
    };
    /**
     * @private
     */
    TableWidget.prototype.updateWidth = function (dragValue) {
        var totalPreferredWidth = this.tableHolder.getTotalWidth(0);
        var ownerWidth = this.getOwnerWidth(true);
        var containerWidth = this.getTableClientWidth(ownerWidth);
        if (containerWidth <= totalPreferredWidth) {
            if (this.tableFormat.preferredWidthType === 'Auto') {
                this.tableFormat.preferredWidthType = 'Point';
            }
        }
        if (this.tableFormat.preferredWidthType !== 'Auto') {
            if (this.tableFormat.preferredWidthType === 'Point') {
                this.tableFormat.preferredWidth = this.getMaxRowWidth(containerWidth);
            }
            else { //ToDo:Need to analyze more the Percentage calculation for table width.
                var value = (totalPreferredWidth / ownerWidth) * 100;
                this.tableFormat.preferredWidth = value;
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.convertPointToPercent = function (tablePreferredWidth, ownerWidth) {
        var value = 0;
        value = (tablePreferredWidth / ownerWidth) * 100;
        value = Math.round(value);
        return value < 100 ? value : 100; // The value should be lesser than or equal to 100%;
    };
    TableWidget.prototype.updateChildWidgetLeft = function (left) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var rowWidget = this.childWidgets[i];
            rowWidget.x = left;
            rowWidget.updateChildWidgetLeft(left);
        }
    };
    /**
     * Shift the widgets for right to left aligned table.
     * @private
     */
    TableWidget.prototype.shiftWidgetsForRtlTable = function (clientArea, tableWidget) {
        var clientAreaX = tableWidget.x;
        var clientAreaRight = clientArea.right;
        var cellSpace = 0;
        if (tableWidget.tableFormat && tableWidget.tableFormat.cellSpacing > 0) {
            cellSpace = tableWidget.tableFormat.cellSpacing;
        }
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = tableWidget.childWidgets[i];
            var rowX = rowWidget.x;
            var left = clientAreaRight - (rowX - clientAreaX);
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                var cellWidget = rowWidget.childWidgets[j];
                left = left -
                    (cellWidget.width + cellWidget.margin.left + cellWidget.margin.right - cellWidget.rightBorderWidth + cellSpace);
                cellWidget.updateWidgetLeft(left + cellWidget.margin.left);
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.clone = function () {
        var table = new TableWidget();
        table.tableHolder = this.tableHolder.clone();
        table.tableFormat.copyFormat(this.tableFormat);
        if (this.wrapTextAround) {
            table.wrapTextAround = this.wrapTextAround;
            table.positioning = this.positioning.clone();
        }
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i].clone();
            table.childWidgets.push(row);
            row.containerWidget = table;
            row.index = i;
        }
        table.x = this.x;
        table.y = this.y;
        table.height = this.height;
        table.width = this.width;
        table.isBidiTable = this.isBidiTable;
        table.containerWidget = this.containerWidget;
        if (this.contentControlProperties) {
            table.contentControlProperties = this.contentControlProperties;
        }
        return table;
    };
    /**
     * @private
     */
    TableWidget.getTableOf = function (node) {
        if (node instanceof WBorders) {
            var row = TableRowWidget.getRowOf(node);
            if (!isNullOrUndefined(row)) {
                return row.ownerTable;
            }
            else if (node.ownerBase instanceof WTableFormat && node.ownerBase.ownerBase instanceof TableWidget) {
                return node.ownerBase.ownerBase;
            }
            else {
                return undefined;
            }
        }
        return undefined;
    };
    /**
     * @private
     */
    TableWidget.prototype.fitChildToClientArea = function () {
        var clientWidth = this.getContainerWidth();
        if (Math.round(clientWidth) < Math.round(this.getTableWidth())) {
            this.fitCellsToClientArea(clientWidth);
        }
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                for (var k = 0; k < cell.childWidgets.length; k++) {
                    if (cell.childWidgets[k] instanceof TableWidget) {
                        cell.childWidgets[k].fitChildToClientArea();
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.getColumnCellsForSelection = function (startCell, endCell) {
        var cells = [];
        var start = startCell.columnIndex;
        var end = endCell.columnIndex + endCell.cellFormat.columnSpan;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var columnIndex = cell.columnIndex;
                var columnSpan = cell.cellFormat.columnSpan;
                if ((columnIndex + columnSpan > start && columnIndex + columnSpan < end) || (columnIndex > start && columnIndex < end)) {
                    if (cells.indexOf(cell) < 0) {
                        cells.push(cell);
                    }
                }
                else if ((columnIndex > start && columnIndex < end && columnIndex + columnSpan < end)
                    || (columnIndex < start && columnIndex + columnSpan > end)) {
                    if (cells.indexOf(cell) < 0) {
                        cells.push(cell);
                    }
                }
                else if (columnIndex === start || columnIndex + columnSpan === end) {
                    if (cells.indexOf(cell) < 0) {
                        cells.push(cell);
                    }
                }
            }
        }
        return cells;
    };
    /**
     * Splits width equally for all the cells.
     * @param tableClientWidth
     * @private
     */
    TableWidget.prototype.splitWidthToTableCells = function (tableClientWidth, isZeroWidth) {
        for (var row = 0; row < this.childWidgets.length; row++) {
            this.childWidgets[row].splitWidthToRowCells(tableClientWidth, isZeroWidth);
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.insertTableRowsInternal = function (tableRows, startIndex, isInsertRow, initilizeCellBorder) {
        for (var i = tableRows.length - 1; i >= 0; i--) {
            var row = tableRows.splice(i, 1)[0];
            row.containerWidget = this;
            if (initilizeCellBorder) {
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    cell.cellFormat.initializeCellBorders();
                }
            }
            this.childWidgets.splice(startIndex, 0, row);
        }
        this.updateRowIndex(startIndex);
        this.isGridUpdated = false;
        if (isInsertRow) {
            this.calculateGrid(true);
            this.buildTableColumns();
        }
        this.isGridUpdated = true;
    };
    /**
     * @private
     */
    TableWidget.prototype.updateRowIndex = function (startIndex) {
        for (var i = startIndex; i < this.childWidgets.length; i++) {
            var row = this.childWidgets[i];
            row.index = i;
            for (var j = 0; j < row.childWidgets.length; j++) {
                row.childWidgets[j].index = j;
                row.childWidgets[j].rowIndex = row.rowIndex;
            }
            startIndex++;
        }
    };
    /**
     * @private
     */
    TableWidget.prototype.getCellStartOffset = function (cell) {
        var offset = 0;
        if (cell && this.tableCellInfo) {
            if (this.tableCellInfo.containsKey(cell.ownerRow.rowIndex)) {
                var rowCellInfo = this.tableCellInfo.get(cell.ownerRow.rowIndex);
                if (rowCellInfo.containsKey(cell.cellIndex)) {
                    offset = rowCellInfo.get(cell.cellIndex);
                }
            }
        }
        return offset;
    };
    /**
     * @private
     */
    TableWidget.prototype.destroyInternal = function (viewer) {
        var height = this.height;
        if (!isNullOrUndefined(this.childWidgets)) {
            for (var j = 0; j < this.childWidgets.length; j++) {
                var widget = undefined;
                var childWidget = this.childWidgets[j];
                widget = childWidget;
                if (!isNullOrUndefined(widget)) {
                    widget.destroyInternal(viewer);
                }
                if (isNullOrUndefined(this.childWidgets)) {
                    break;
                }
                j--;
            }
            this.childWidgets = undefined;
        }
        if (!isNullOrUndefined(this.containerWidget)) {
            if (this.containerWidget instanceof BodyWidget) {
                if (this.containerWidget.floatingElements.indexOf(this) !== -1) {
                    this.containerWidget.floatingElements.splice(this.containerWidget.floatingElements.indexOf(this), 1);
                }
            }
            if (!isNullOrUndefined(this.containerWidget.childWidgets)) {
                if (this.containerWidget.childWidgets.indexOf(this) !== -1) {
                    this.containerWidget.childWidgets.splice(this.containerWidget.childWidgets.indexOf(this), 1);
                }
                this.containerWidget.height -= height;
                // if ((isNullOrUndefined(this.containerWidget.childWidgets) || this.containerWidget.childWidgets.length === 0)
                //     && this.containerWidget instanceof BodyWidget) {
                //     // (this.containerWidget as BodyWidget).destroyInternal(viewer);
                // }
            }
            this.containerWidget = undefined;
        }
        this.destroy();
    };
    /**
     * @private
     */
    TableWidget.prototype.destroy = function () {
        // if (this.tableFormat) {
        //     this.tableFormat.destroy();
        // }
        this.tableFormat = undefined;
        if (this.spannedRowCollection) {
            this.spannedRowCollection.destroy();
        }
        this.spannedRowCollection = undefined;
        // if (this.tableHolder) {
        //     this.tableHolder.destroy();
        // }
        this.tableHolder = undefined;
        this.flags = undefined;
        this.leftMargin = undefined;
        this.topMargin = undefined;
        this.rightMargin = undefined;
        this.bottomMargin = undefined;
        this.headerHeight = undefined;
        this.isDefaultFormatUpdated = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    TableWidget.prototype.componentDestroy = function () {
        if (this.tableFormat) {
            this.tableFormat.destroy();
        }
        this.tableFormat = undefined;
        if (this.spannedRowCollection) {
            this.spannedRowCollection.destroy();
        }
        this.spannedRowCollection = undefined;
        if (this.tableHolder) {
            this.tableHolder.destroy();
        }
        this.tableHolder = undefined;
        this.flags = undefined;
        this.leftMargin = undefined;
        this.topMargin = undefined;
        this.rightMargin = undefined;
        this.bottomMargin = undefined;
        this.headerHeight = undefined;
        this.isDefaultFormatUpdated = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return TableWidget;
}(BlockWidget));
export { TableWidget };
/**
 * @private
 */
var TableRowWidget = /** @class */ (function (_super) {
    __extends(TableRowWidget, _super);
    function TableRowWidget() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.isRenderBookmarkEnd = false;
        _this.topBorderWidth = 0;
        _this.bottomBorderWidth = 0;
        _this.rowFormat = new WRowFormat(_this);
        _this.editRangeID = new Dictionary();
        return _this;
    }
    Object.defineProperty(TableRowWidget.prototype, "rowIndex", {
        // /**
        //  * @private
        //  */
        // get length(): number {
        //     if (!isNullOrUndefined(this.nextSplitWidget)) {
        //         return 1;
        //     } else {
        //         if (isNullOrUndefined(this.previousSplitWidget)) {
        //             return 1;
        //         }
        //         return 0;
        //     }
        // }
        /**
         * @private
         */
        get: function () {
            if (this.containerWidget) {
                return this.containerWidget.childWidgets.indexOf(this);
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableRowWidget.prototype, "ownerTable", {
        /**
         * @private
         */
        get: function () {
            if (this.containerWidget instanceof TableWidget) {
                return this.containerWidget;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableRowWidget.prototype, "nextRow", {
        /**
         * @private
         */
        get: function () {
            var index = this.indexInOwner;
            if (index > -1 && index < this.ownerTable.childWidgets.length - 1) {
                return this.ownerTable.childWidgets[index + 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    TableRowWidget.prototype.equals = function (widget) {
        return widget instanceof TableRowWidget && widget.rowFormat === this.rowFormat;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.combineCells = function (viewer) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var cell = this.childWidgets[i];
            cell.combineWidget(viewer);
            if (!isNullOrUndefined(cell.cellFormat) && cell.cellFormat.rowSpan === 1) {
                var cellHeight = cell.height + cell.margin.top + cell.margin.bottom;
                if ((this.height - this.ownerTable.tableFormat.cellSpacing) < cell.height) {
                    this.height = this.ownerTable.tableFormat.cellSpacing + cell.height;
                }
            }
            else if (isNullOrUndefined(cell.cellFormat)) {
                i--;
            }
        }
    };
    /**
     * @private
     */
    TableRowWidget.getRowOf = function (node) {
        if (node instanceof WBorders) {
            var cell = TableCellWidget.getCellOf(node);
            if (!isNullOrUndefined(cell)) {
                return cell.ownerRow;
            }
            else if (node.ownerBase instanceof WRowFormat && node.ownerBase.ownerBase instanceof TableRowWidget) {
                return node.ownerBase.ownerBase;
            }
            else {
                return undefined;
            }
        }
        return undefined;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getCell = function (rowIndex, columnIndex, cellIndex) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var cell = this.childWidgets[i];
            if (cell.rowIndex === rowIndex && (!isNullOrUndefined(cellIndex) ? cell.cellIndex === cellIndex : cell.columnIndex === columnIndex)) {
                return cell;
            }
        }
        return undefined;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getCellUsingColumnIndex = function (rowIndex, columnIndex) {
        var cell;
        for (var i = 0; i < this.childWidgets.length; i++) {
            cell = this.childWidgets[i];
            if (cell.rowIndex === rowIndex && cell.columnIndex === columnIndex) {
                return cell;
            }
        }
        cell = this.getCell(rowIndex, columnIndex);
        if (!isNullOrUndefined(cell)) {
            return cell;
        }
        return undefined;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.splitWidthToRowCells = function (tableClientWidth, isZeroWidth) {
        var cells = this.childWidgets;
        var cellWidth = tableClientWidth / cells.length;
        for (var cell = 0; cell < cells.length; cell++) {
            if (isZeroWidth && cells[cell].cellFormat.preferredWidth === 0) {
                cells[cell].cellFormat.preferredWidth = cellWidth;
                this.ownerTable.isDefaultFormatUpdated = false;
            }
            else if (isZeroWidth) {
                this.ownerTable.isDefaultFormatUpdated = true;
                break;
            }
            else {
                cells[cell].cellFormat.preferredWidth = cellWidth;
            }
        }
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getGridCount = function (tableGrid, cell, index, containerWidth, tempSpan) {
        var prevOffset = 0;
        var width = 0;
        var ownerTable = this.ownerTable;
        var rowFormat = this.rowFormat;
        if (index === -1) {
            width = ownerTable.getCellWidth(rowFormat.gridBeforeWidth, rowFormat.gridBeforeWidthType, containerWidth, null);
        }
        else {
            prevOffset += ownerTable.getCellWidth(rowFormat.gridBeforeWidth, rowFormat.gridBeforeWidthType, containerWidth, null);
            if (index >= 0) {
                prevOffset += ownerTable.getCellStartOffset(cell);
            }
            if (index < this.childWidgets.length) {
                width = ownerTable.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, containerWidth, null);
            }
            else {
                width = ownerTable.getCellWidth(rowFormat.gridAfterWidth, rowFormat.gridAfterWidthType, containerWidth, null);
            }
        }
        var tabIndex = tableGrid.indexOf(prevOffset);
        var tabGrid = tempSpan[tabIndex];
        var gridEndIndex;
        var gridStartIndex = this.getOffsetIndex(tableGrid, prevOffset);
        var gridWidth = parseFloat((width + prevOffset).toFixed(2));
        var gridDecimalWidth = parseFloat((width + tabGrid).toFixed(2));
        if (gridDecimalWidth !== gridWidth && !isNullOrUndefined(tabGrid)) {
            gridEndIndex = this.getOffsetIndex(tableGrid, tabGrid + width);
        }
        else {
            gridEndIndex = this.getOffsetIndex(tableGrid, prevOffset + width);
        }
        return gridEndIndex - gridStartIndex;
    };
    TableRowWidget.prototype.getOffsetIndex = function (tableGrid, offset) {
        offset = parseFloat(offset.toFixed(2));
        var index = 0;
        if (tableGrid.indexOf(offset) >= 0) {
            index = tableGrid.indexOf(offset);
        }
        else {
            for (var i = 0; i < tableGrid.length; i++) {
                if (tableGrid[i] > offset) {
                    return i;
                }
            }
            index = tableGrid.length - 1;
        }
        return index;
    };
    TableRowWidget.prototype.getCellOffset = function (index, containerWidth) {
        var prevOffset = 0;
        var ownerTable = this.ownerTable;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var cellFormat = this.childWidgets[i].cellFormat;
            if (i === index) {
                break;
            }
            prevOffset += ownerTable.getCellWidth(cellFormat.preferredWidth, cellFormat.preferredWidthType, containerWidth, null);
        }
        return prevOffset;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.updateRowBySpannedCells = function () {
        var rowSpannedCells = this.getPreviousRowSpannedCells();
        var currentRowIndex = this.rowIndex;
        for (var i = 0; i < rowSpannedCells.length; i++) {
            var spannedCell = rowSpannedCells[i];
            var rowSpanEnd = spannedCell.ownerRow.rowIndex + spannedCell.cellFormat.rowSpan - 1;
            // If current row is row span end or includes spanned cells. then, decrease the rowspan
            if (rowSpanEnd >= currentRowIndex) {
                spannedCell.cellFormat.rowSpan -= 1;
            }
        }
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getPreviousRowSpannedCells = function (include) {
        var rowSpannedCells = [];
        var row = include ? this : this.previousWidget;
        while (!isNullOrUndefined(row)) {
            for (var i = 0; i < row.childWidgets.length; i++) {
                var cell = row.childWidgets[i];
                if (cell.cellFormat.rowSpan > 1) {
                    rowSpannedCells.splice(0, 0, cell);
                }
            }
            row = row.previousWidget;
        }
        return rowSpannedCells;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.isCellsHaveSameWidthUnit = function () {
        if (this.childWidgets.length > 0) {
            var firstCellWidthUnit = this.childWidgets[0].cellFormat.preferredWidthType;
            for (var i = 1; i < this.childWidgets.length; i++) {
                var cell = this.childWidgets[i];
                if (firstCellWidthUnit != cell.cellFormat.preferredWidthType) {
                    return false;
                }
            }
        }
        return true;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.updateUniformWidthUnitForCells = function () {
        var isSetMinwidth = false;
        if (this.ownerTable && this.ownerTable.tableHolder && this.ownerTable.tableHolder.columns && this.childWidgets.length !== this.ownerTable.tableHolder.columns.length) {
            isSetMinwidth = true;
        }
        for (var i = 0; i < this.childWidgets.length; i++) {
            var cell = this.childWidgets[i];
            cell.cellFormat.preferredWidthType = "Point";
            if (isSetMinwidth) {
                cell.cellFormat.preferredWidth = cell.getMinimumPreferredWidth();
            }
            else {
                cell.cellFormat.preferredWidth = cell.cellFormat.cellWidth;
            }
        }
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getTableCellWidget = function (point) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var x = Math.round(this.childWidgets[i].x);
            if (x - this.childWidgets[i].margin.left - 1 <= point.x
                && (x + this.childWidgets[i].width) >= point.x) {
                return this.childWidgets[i];
            }
            else if (i === this.childWidgets.length - 1
                && (this.childWidgets[i].x + this.childWidgets[i].width) + 1 <= point.x) {
                return this.childWidgets[i];
            }
        }
        var cellWidget = undefined;
        if (this.childWidgets.length > 0) {
            if (this.childWidgets[0].x <= point.x) {
                cellWidget = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(point);
            }
            else {
                cellWidget = this.childWidgets[0].getTableCellWidget(point);
            }
        }
        return cellWidget;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getFirstRowWidth = function () {
        var width = 0;
        for (var i = 0; i < this.childWidgets.length; i++) {
            width += this.childWidgets[i].getCellWidth(this.ownerTable);
        }
        return width;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getCellWidget = function (columnIndex, columnSpan) {
        var tableHolder = this.ownerTable.tableHolder;
        var index = tableHolder.getValidColumnIndex(columnIndex);
        if (index > columnIndex) {
            columnSpan -= index - columnIndex;
            columnIndex = index;
        }
        var colIndex = 0;
        if (this.rowFormat.gridBefore > 0) {
            colIndex += this.rowFormat.gridBefore;
        }
        for (var i = 0; i < this.childWidgets.length; i++) {
            var cell = this.childWidgets[i];
            var colSpan = cell.cellFormat.columnSpan;
            if (colIndex < cell.columnIndex && (colIndex <= columnIndex || colIndex < columnIndex + columnSpan)
                && cell.columnIndex > columnIndex) {
                return null;
            }
            if ((cell.columnIndex <= columnIndex || cell.columnIndex < columnIndex + columnSpan)
                && cell.columnIndex + colSpan > columnIndex) {
                return cell;
            }
            else if (cell.columnIndex > columnIndex) {
                break;
            }
            colIndex += colSpan;
        }
        return null;
    };
    TableRowWidget.prototype.getVerticalMergeStartCell = function (columnIndex, columnSpan) {
        var columns = this.ownerTable.tableHolder.columns;
        if (this.rowFormat.gridBefore > 0 && this.rowFormat.gridBefore > columnIndex + columnSpan) {
            return null;
        }
        var matchedCell = this.getCellWidget(columnIndex, columnSpan);
        if (!isNullOrUndefined(matchedCell)) {
            return matchedCell;
        }
        if (columnIndex + this.rowFormat.gridAfter === columns.length) {
            return null;
        }
        var cell;
        var previousRow = this.previousWidget;
        if (!isNullOrUndefined(previousRow)) {
            //Gets the First intersecting cell from previous row
            cell = previousRow.getVerticalMergeStartCell(columnIndex, columnSpan);
        }
        if (!isNullOrUndefined(cell) && cell.cellFormat.rowSpan > 1 && this.index === cell.rowIndex + cell.cellFormat.rowSpan - 1) {
            return cell;
        }
        return null;
    };
    /**
     * @private
     */
    TableRowWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
        return { 'minimumWordWidth': minimumWordWidth, 'maximumWordWidth': maximumWordWidth };
    };
    /**
     * @private
     */
    TableRowWidget.prototype.destroyInternal = function (viewer) {
        var height = this.height;
        if (!isNullOrUndefined(this.childWidgets)) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var widget = this.childWidgets[i];
                widget.destroyInternal(viewer);
                if (isNullOrUndefined(this.childWidgets)) {
                    break;
                }
                i--;
            }
            this.childWidgets = undefined;
        }
        if (!isNullOrUndefined(this.containerWidget)) {
            if (!isNullOrUndefined(this.containerWidget.childWidgets)) {
                this.containerWidget.childWidgets.splice(this.containerWidget.childWidgets.indexOf(this), 1);
                if ((isNullOrUndefined(this.containerWidget.childWidgets) || this.containerWidget.childWidgets.length === 0)
                    && this.containerWidget instanceof TableWidget) {
                    this.containerWidget.destroyInternal(viewer);
                }
                else if (this.containerWidget.containerWidget instanceof BodyWidget) {
                    this.containerWidget.containerWidget.height -= height;
                }
                this.containerWidget.height -= height;
            }
        }
        this.destroy();
    };
    /**
     * @private
     */
    TableRowWidget.prototype.clone = function () {
        var row = new TableRowWidget();
        row.rowFormat.copyFormat(this.rowFormat);
        row.topBorderWidth = this.topBorderWidth;
        row.bottomBorderWidth = this.bottomBorderWidth;
        row.isRenderBookmarkEnd = this.isRenderBookmarkEnd;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var cell = this.childWidgets[i].clone();
            row.childWidgets.push(cell);
            cell.containerWidget = row;
            cell.index = i;
            cell.rowIndex = this.rowIndex;
        }
        row.x = this.x;
        row.y = this.y;
        row.height = this.height;
        row.width = this.width;
        if (this.contentControlProperties) {
            row.contentControlProperties = this.contentControlProperties;
        }
        return row;
    };
    /**
     * Updates the child widgets left.
     * @param left
     * @private
     */
    TableRowWidget.prototype.updateChildWidgetLeft = function (left, updateLeftIndent) {
        // TODO: Cell spacing calculation.
        var spacing = 0;
        if (this.ownerTable.tableFormat.cellSpacing > 0) {
            spacing = this.ownerTable.tableFormat.cellSpacing;
        }
        for (var i = 0; i < this.childWidgets.length; i++) {
            var cellWidget = this.childWidgets[i];
            left += spacing + cellWidget.margin.left;
            cellWidget.x = left;
            cellWidget.updateChildWidgetLeft(cellWidget.x);
            left += cellWidget.width + cellWidget.margin.right;
        }
    };
    /**
     * Shift the widgets for RTL table.
     * @param tableWidget
     * @private
     */
    TableRowWidget.prototype.shiftWidgetForRtlTable = function () {
        var tableWidget = this.ownerTable;
        var clientAreaX = tableWidget.x;
        var cellSpace = 0;
        var tableWidth = 0;
        if (tableWidget.tableFormat != null && tableWidget.tableFormat.cellSpacing > 0) {
            cellSpace = tableWidget.tableFormat.cellSpacing;
        }
        tableWidth = HelperMethods.convertPointToPixel(tableWidget.getTableWidth());
        var rowX = this.x;
        var clientAreaRight = clientAreaX + tableWidth;
        var left = clientAreaRight - (rowX - clientAreaX);
        var prevSpannedCellWidth = 0;
        for (var j = 0; j < this.childWidgets.length; j++) {
            var cellWidget = this.childWidgets[j];
            var prevColumnIndex = 0;
            if (!isNullOrUndefined(cellWidget.previousWidget)) {
                prevColumnIndex = cellWidget.previousWidget.columnIndex + cellWidget.previousWidget.cellFormat.columnSpan;
            }
            if (prevColumnIndex < cellWidget.columnIndex) {
                prevSpannedCellWidth = HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableHolder.getPreviousSpannedCellWidth(prevColumnIndex, cellWidget.columnIndex));
                if (prevColumnIndex === 0) {
                    prevSpannedCellWidth = prevSpannedCellWidth - cellSpace / 2;
                }
            }
            left = left - (cellWidget.width + cellWidget.margin.left + cellWidget.margin.right + cellSpace);
            cellWidget.updateWidgetLeft(left + cellWidget.margin.left - prevSpannedCellWidth);
        }
    };
    /**
     * @private
     */
    TableRowWidget.prototype.destroy = function () {
        // if (this.rowFormat) {
        //     this.rowFormat.destroy();
        // }
        this.rowFormat = undefined;
        this.topBorderWidth = undefined;
        this.bottomBorderWidth = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    TableRowWidget.prototype.componentDestroy = function () {
        if (this.rowFormat) {
            this.rowFormat.destroy();
        }
        this.rowFormat = undefined;
        this.topBorderWidth = undefined;
        this.bottomBorderWidth = undefined;
        this.isRenderBookmarkEnd = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return TableRowWidget;
}(BlockWidget));
export { TableRowWidget };
/**
 * @private
 */
var TableCellWidget = /** @class */ (function (_super) {
    __extends(TableCellWidget, _super);
    function TableCellWidget() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.rowIndex = -1;
        _this.sizeInfoInternal = new ColumnSizeInfo();
        /**
         * @private
         */
        _this.updatedTopBorders = [];
        /**
         * @private
         */
        _this.isRenderBookmarkStart = false;
        /**
         * @private
         */
        _this.isRenderBookmarkEnd = false;
        /**
         * @private
         */
        _this.isRenderEditRangeStart = false;
        /**
        * @private
         */
        _this.isRenderEditRangeEnd = false;
        // /**
        //  * @private
        //  */
        // get length(): number {
        //     if (!isNullOrUndefined(this.nextSplitWidget)) {
        //         return 1;
        //     } else {
        //         if (isNullOrUndefined(this.previousSplitWidget)) {
        //             return 1;
        //         }
        //         return 0;
        //     }
        // }
        /**
        * @private
         */
        _this.isSplittedCell = false;
        _this.margin = new Margin(_this.leftMargin, _this.topMargin, _this.rightMargin, _this.bottomMargin);
        _this.leftBorderWidth = 0;
        _this.rightBorderWidth = 0;
        _this.cellFormat = new WCellFormat(_this);
        return _this;
    }
    Object.defineProperty(TableCellWidget.prototype, "ownerColumn", {
        /**
         * @private
         */
        get: function () {
            return this.ownerTable.tableHolder.columns[this.columnIndex];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "leftMargin", {
        /**
         * @private
         */
        get: function () {
            if (this.cellFormat && this.cellFormat.hasValue('leftMargin')) {
                return this.cellFormat.leftMargin;
            }
            else if (!isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('leftMargin')) {
                return this.ownerRow.rowFormat.leftMargin;
            }
            else if (!isNullOrUndefined(this.ownerTable) && !isNullOrUndefined(this.ownerTable.tableFormat) && this.ownerTable.tableFormat.hasValue('leftMargin')) {
                return this.ownerTable.tableFormat.leftMargin;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "topMargin", {
        /**
         * @private
         */
        get: function () {
            if (this.cellFormat && this.cellFormat.hasValue('topMargin')) {
                return this.cellFormat.topMargin;
            }
            else if (!isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('topMargin')) {
                return this.ownerRow.rowFormat.topMargin;
            }
            else if (!isNullOrUndefined(this.ownerTable) && !isNullOrUndefined(this.ownerTable.tableFormat) && this.ownerTable.tableFormat.hasValue('topMargin')) {
                return this.ownerTable.tableFormat.topMargin;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "rightMargin", {
        /**
         * @private
         */
        get: function () {
            if (this.cellFormat && this.cellFormat.hasValue('rightMargin')) {
                return this.cellFormat.rightMargin;
            }
            else if (!isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('rightMargin')) {
                return this.ownerRow.rowFormat.rightMargin;
            }
            else if (!isNullOrUndefined(this.ownerTable) && !isNullOrUndefined(this.ownerTable.tableFormat) && this.ownerTable.tableFormat.hasValue('rightMargin')) {
                return this.ownerTable.tableFormat.rightMargin;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "bottomMargin", {
        /**
         * @private
         */
        get: function () {
            if (this.cellFormat && this.cellFormat.hasValue('bottomMargin')) {
                return this.cellFormat.bottomMargin;
            }
            else if (!isNullOrUndefined(this.ownerRow) && this.ownerRow.rowFormat.hasValue('bottomMargin')) {
                return this.ownerRow.rowFormat.bottomMargin;
            }
            else if (!isNullOrUndefined(this.ownerTable) && !isNullOrUndefined(this.ownerTable.tableFormat) && this.ownerTable.tableFormat.hasValue('bottomMargin')) {
                return this.ownerTable.tableFormat.bottomMargin;
            }
            else {
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "cellIndex", {
        /**
         * @private
         */
        get: function () {
            if (this.ownerRow) {
                return this.ownerRow.childWidgets.indexOf(this);
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "ownerTable", {
        /**
         * @private
         */
        get: function () {
            if (this.containerWidget instanceof TableRowWidget) {
                return this.containerWidget.ownerTable;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "ownerRow", {
        /**
         * @private
         */
        get: function () {
            return this.containerWidget;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TableCellWidget.prototype, "sizeInfo", {
        /**
         * @private
         */
        get: function () {
            return this.sizeInfoInternal;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    TableCellWidget.prototype.equals = function (widget) {
        return widget instanceof TableCellWidget && widget.cellFormat === this.cellFormat;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getContainerTable = function () {
        var table = this.ownerTable;
        while (table instanceof TableWidget && table.associatedCell instanceof TableCellWidget) {
            table = table.associatedCell.getContainerTable();
        }
        return table;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getPreviousSplitWidget = function () {
        if (this.containerWidget instanceof TableRowWidget) {
            var row = this.containerWidget;
            do {
                row = row.previousRenderedWidget;
                if (isNullOrUndefined(row) || row.index < this.rowIndex) {
                    break;
                }
                var previousCell = row.getCell(this.rowIndex, this.columnIndex);
                if (previousCell && this.equals(previousCell)) {
                    return previousCell;
                }
            } while (row);
        }
        return undefined;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getNextSplitWidget = function () {
        var rowSpan = this.cellFormat.rowSpan;
        if (this.containerWidget instanceof TableRowWidget) {
            var row = this.containerWidget;
            do {
                row = row.nextRenderedWidget;
                if (isNullOrUndefined(row) || row.index > this.rowIndex + rowSpan) {
                    break;
                }
                var nextCell = row.getCell(this.rowIndex, this.columnIndex);
                if (nextCell && this.equals(nextCell)) {
                    return nextCell;
                }
            } while (row);
        }
        return undefined;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getTableCellWidget = function (point) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            if (this.childWidgets[i].y <= point.y
                && (this.childWidgets[i].y + this.childWidgets[i].height) >= point.y) {
                return this.childWidgets[i].getTableCellWidget(point);
            }
        }
        var tableCellWidget = undefined;
        if (this.childWidgets.length > 0) {
            if (this.childWidgets[0].y <= point.y) {
                tableCellWidget = this.childWidgets[this.childWidgets.length - 1].getTableCellWidget(point);
            }
            else {
                tableCellWidget = this.childWidgets[0].getTableCellWidget(point);
            }
        }
        return tableCellWidget;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.updateWidth = function (preferredWidth) {
        if (this.cellFormat.preferredWidthType === 'Point') {
            this.cellFormat.preferredWidth = preferredWidth;
        }
        else if (this.cellFormat.preferredWidthType === 'Percent') {
            this.cellFormat.preferredWidth = this.convertPointToPercent(preferredWidth);
        }
        this.cellFormat.cellWidth = preferredWidth;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getCellWidth = function (block) {
        var ownerTable = this.ownerTable;
        var containerWidth = ownerTable ? ownerTable.getTableClientWidth(ownerTable.getOwnerWidth(true)) : 0;
        var cellWidth = containerWidth;
        var leftMargin = !isNullOrUndefined(this.leftMargin) ? this.leftMargin : 0;
        var rightMargin = !isNullOrUndefined(this.rightMargin) ? this.rightMargin : 0;
        if (ownerTable && ownerTable.tableFormat.preferredWidthType === 'Auto' && ownerTable.tableFormat.allowAutoFit) {
            if (this.cellFormat.preferredWidth === 0) {
                cellWidth = containerWidth;
            }
            else {
                if (this.cellFormat.preferredWidthType === 'Percent') {
                    cellWidth = (this.cellFormat.preferredWidth * containerWidth) / 100 - leftMargin - rightMargin;
                }
                else {
                    // If cell has prefferd width, we need to consider prefferd width.
                    cellWidth = this.cellFormat.preferredWidth - leftMargin - rightMargin;
                }
            }
        }
        else if (this.cellFormat.preferredWidthType === 'Percent') {
            cellWidth = (this.cellFormat.preferredWidth * containerWidth) / 100 - leftMargin - rightMargin;
        }
        else if (this.cellFormat.preferredWidthType === 'Point') {
            if (block instanceof TableWidget && block.tableFormat.preferredWidthType === 'Percent') {
                cellWidth = this.cellFormat.cellWidth - leftMargin - rightMargin;
            }
            else {
                cellWidth = this.cellFormat.preferredWidth - leftMargin - rightMargin;
            }
        }
        // For grid before and grid after with auto width, no need to calculate minimum preferred width.
        return cellWidth;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.convertPointToPercent = function (cellPreferredWidth) {
        var value = 0;
        var clientWidth = this.ownerTable.getOwnerWidth(true);
        var tableWidth = this.ownerTable.getTableClientWidth(clientWidth);
        value = (cellPreferredWidth / tableWidth) * 100;
        value = Math.round(value);
        return value < 100 ? value : 100; // The value should be lesser than or equal to 100%;
    };
    /**
     * @private
     */
    TableCellWidget.getCellLeftBorder = function (tableCell) {
        var leftBorder = undefined;
        var cellBorder = tableCell.cellFormat.borders;
        var rowBorders = !isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
        var tableBorders = !isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
        if (!isNullOrUndefined(cellBorder.left)) {
            leftBorder = cellBorder.left;
        }
        if (isNullOrUndefined(leftBorder)) {
            leftBorder = tableCell.getLeftBorderToRenderByHierarchy(leftBorder, rowBorders, tableBorders);
        }
        if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
            leftBorder = tableCell.getLeftBorderToRenderByHierarchy(leftBorder, rowBorders, tableBorders);
        }
        else {
            var prevCell = this.getPreviousCell(tableCell);
            // if the border is shared then choose the border based on Conflict Resolution algorithm.
            leftBorder = tableCell.getPreviousCellLeftBorder(leftBorder, prevCell);
        }
        if (isNullOrUndefined(leftBorder)) {
            leftBorder = new WBorder(tableCell.cellFormat.borders);
        }
        return leftBorder;
    };
    TableCellWidget.getPreviousCell = function (tableCell) {
        var prevCell = undefined;
        if (!isNullOrUndefined(tableCell.previousWidget)) {
            //Validates whether the previous cell in same row is adjacent left cell and sets to prevCell.
            //If the previous cell is not in the same row and it is vertically merged, we have handled in serverside
            //to copy border based on priority of current cell left border and previous cell right border.
            var cell = tableCell.previousWidget;
            if (cell.columnIndex + cell.cellFormat.columnSpan === tableCell.columnIndex) {
                prevCell = cell;
            }
        }
        return prevCell;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getLeftBorderWidth = function () {
        var borderWidth = 0;
        // Added null condition check for asynchronous loading.
        if (this.cellFormat !== null && this.cellFormat.borders !== null) {
            // update the margins values respect to layouting of borders.
            // For normal table cells only left border is rendered. for last cell left and right border is rendered.
            // this border widths are not included in margins.
            borderWidth = TableCellWidget.getCellLeftBorder(this).getLineWidth();
            // need to render rightBorder specifically for all the cells when the cellSpacing is greater than zero or for last cell of each row.
        }
        return borderWidth;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getRightBorderWidth = function () {
        var borderWidth = 0;
        var ownerTable = this.ownerTable;
        //Added null condition check for asynchronous loading.
        if (this.cellFormat !== null && this.cellFormat.borders !== null) {
            borderWidth = TableCellWidget.getCellRightBorder(this).getLineWidth();
        }
        return borderWidth;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getCellSpacing = function () {
        var actualCellSpacing = this.ownerTable && this.ownerTable.tableFormat ? this.ownerTable.tableFormat.cellSpacing : 0;
        var cellSpacingToLayout = actualCellSpacing;
        // Considers the left, right margins and border widths(only available for Layouted table) for Minimum width.
        if (this.ownerRow.childWidgets.length === 1) {
            cellSpacingToLayout = actualCellSpacing * 2;
        }
        else if (this.cellIndex === 0 || this.cellIndex === this.ownerRow.childWidgets.length - 1) {
            cellSpacingToLayout = actualCellSpacing + (actualCellSpacing / 2);
        }
        else {
            cellSpacingToLayout = actualCellSpacing;
        }
        return cellSpacingToLayout;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getCellSizeInfo = function (isAutoFit) {
        var isSetWidth = true;
        var layout = undefined;
        if (!isNullOrUndefined(this.bodyWidget) && !isNullOrUndefined(this.bodyWidget.page)) {
            if (!isNullOrUndefined(this.bodyWidget.page.documentHelper)) {
                layout = this.bodyWidget.page.documentHelper.layout;
            }
        }
        if (!isNullOrUndefined(layout) && !isNullOrUndefined(layout.currentCell)) {
            isSetWidth = false;
            if (this === layout.currentCell) {
                isSetWidth = true;
            }
        }
        // Gets the minimum preferred width for the table cell.
        if (isSetWidth && !this.sizeInfo.hasMinimumWidth) {
            this.sizeInfo.minimumWidth = this.getMinimumPreferredWidth();
        }
        // Gets the minimum and maximum word widths.
        if (isAutoFit) {
            if (isSetWidth && !this.sizeInfo.hasMinimumWordWidth) {
                var size = this.getMinimumAndMaximumWordWidth(0, 0);
                this.sizeInfo.minimumWordWidth = size.minimumWordWidth + this.sizeInfo.minimumWidth;
                this.sizeInfo.maximumWordWidth = size.maximumWordWidth + this.sizeInfo.minimumWidth;
                // if minimum and maximum width values are equal, set value as zero.
                // later, preferred width value is considered for all width values.
                // if (this.sizeInfo.minimumWidth === this.sizeInfo.minimumWordWidth
                //     && this.sizeInfo.minimumWordWidth === this.sizeInfo.maximumWordWidth) {
                //     this.sizeInfo.minimumWordWidth = 0;
                //     this.sizeInfo.maximumWordWidth = 0;
                //     this.sizeInfo.minimumWidth = 0;
                // }
            }
        }
        var sizeInfo = new ColumnSizeInfo();
        sizeInfo.minimumWidth = this.sizeInfo.minimumWidth;
        sizeInfo.minimumWordWidth = this.sizeInfo.minimumWordWidth;
        sizeInfo.maximumWordWidth = this.sizeInfo.maximumWordWidth;
        return sizeInfo;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getMinimumPreferredWidth = function () {
        var defaultWidth = this.leftMargin + this.rightMargin + this.getLeftBorderWidth() + this.getRightBorderWidth() + this.getCellSpacing();
        return defaultWidth;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getPreviousCellLeftBorder = function (leftBorder, previousCell) {
        if ((isNullOrUndefined(previousCell) || (!isNullOrUndefined(leftBorder) && (leftBorder.lineStyle === 'None' && !leftBorder.hasNoneStyle)))) {
            if (!isNullOrUndefined(leftBorder) && !(leftBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                leftBorder = this.getLeftBorderToRenderByHierarchy(leftBorder, TableRowWidget.getRowOf(leftBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(leftBorder.ownerBase).tableFormat.borders);
            }
        }
        if (isNullOrUndefined(previousCell)) {
            return leftBorder;
        }
        else {
            var prevCellRightBorder = undefined;
            if (!isNullOrUndefined(previousCell.cellFormat.borders) && !isNullOrUndefined(previousCell.cellFormat.borders.right) && previousCell.cellFormat.borders.right.lineStyle !== 'None') {
                prevCellRightBorder = previousCell.cellFormat.borders.right;
            }
            if (!isNullOrUndefined(prevCellRightBorder) && prevCellRightBorder.lineStyle !== 'None') {
                return this.getBorderBasedOnPriority(prevCellRightBorder, leftBorder);
            }
            else if (!isNullOrUndefined(leftBorder) && !(leftBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                return this.getLeftBorderToRenderByHierarchy(leftBorder, TableRowWidget.getRowOf(leftBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(leftBorder.ownerBase).tableFormat.borders);
            }
        }
        return leftBorder;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getBorderBasedOnPriority = function (border, adjacentBorder) {
        // If the cell and its adjacent cell defined different borders then based on this algorithm the border choose to render.
        // Reference link :https://msdn.microsoft.com/en-us/library/office/documentformat.openxml.wordprocessing.tablecellborders.aspx
        if (isNullOrUndefined(border)) {
            return adjacentBorder;
        }
        else if (isNullOrUndefined(adjacentBorder)) {
            return border;
        }
        var borderWeight = border.getBorderWeight();
        var adjacentBorderWeight = adjacentBorder.getBorderWeight();
        //the border with higher wight  shall be displayed.
        if (borderWeight === adjacentBorderWeight) {
            //if the border is equal weight the based on the priority the border will be choosen to render.
            var borderPriority = border.getPrecedence();
            var adjacentBorderPriority = adjacentBorder.getPrecedence();
            if (borderPriority === adjacentBorderPriority) {
                //The color with the smaller brightness value shall be displayed.
                var borderColInRGB = HelperMethods.convertHexToRgb(border.color);
                var R1 = borderColInRGB.r;
                var G1 = borderColInRGB.g;
                var B1 = borderColInRGB.b;
                var adjacentBorderColInRGB = HelperMethods.convertHexToRgb(adjacentBorder.color);
                var R2 = adjacentBorderColInRGB.r;
                var G2 = adjacentBorderColInRGB.g;
                var B2 = adjacentBorderColInRGB.b;
                var borderBrightness = (R1 + B1 + (2 * G1));
                var adjacentBorderBrightness = (R2 + B2 + (2 * G2));
                if (borderBrightness === adjacentBorderBrightness) {
                    borderBrightness = (B1 + (2 * G1));
                    adjacentBorderBrightness = (B2 + (2 * G2));
                    if (borderBrightness === adjacentBorderBrightness) {
                        if (G1 === G2) {
                            return border;
                        }
                        else if (G1 > G2) {
                            return adjacentBorder;
                        }
                        else {
                            return border;
                        }
                    }
                    else if (borderBrightness > adjacentBorderBrightness) {
                        return adjacentBorder;
                    }
                    else {
                        return border;
                    }
                }
                else if (borderBrightness > adjacentBorderBrightness) {
                    return adjacentBorder;
                }
                else {
                    return border;
                }
            }
            else if (borderPriority > adjacentBorderPriority) {
                return border;
            }
            else {
                return adjacentBorder;
            }
        }
        else if (borderWeight > adjacentBorderWeight) {
            return border;
        }
        else {
            return adjacentBorder;
        }
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getLeftBorderToRenderByHierarchy = function (leftBorder, rowBorders, tableBorders) {
        var ownerCell = TableCellWidget.getCellOf(leftBorder.ownerBase);
        if (!isNullOrUndefined(ownerCell)) {
            var isFirstCell = false;
            if (ownerCell.columnIndex === 0 || (ownerCell.cellIndex === 0 && ownerCell.ownerRow.rowFormat.gridBefore > 0)) {
                isFirstCell = true;
            }
            var isRowBorderDefined = false;
            var hasNoneStyle = false;
            if (isFirstCell && !isNullOrUndefined(rowBorders.left)) {
                hasNoneStyle = rowBorders.left.hasNoneStyle;
            }
            else if (!isFirstCell && !isNullOrUndefined(rowBorders.vertical)) {
                hasNoneStyle = rowBorders.vertical.hasNoneStyle;
            }
            if (!isNullOrUndefined(rowBorders.left) && rowBorders.left.lineStyle !== 'None'
                && rowBorders.left.isBorderDefined && !hasNoneStyle && !isNullOrUndefined(leftBorder)
                && leftBorder.lineStyle === 'None' && leftBorder.isBorderDefined && !leftBorder.hasValue('color')) {
                isRowBorderDefined = true;
            }
            if ((!isNullOrUndefined(leftBorder) && leftBorder.lineStyle === 'None' && ((!leftBorder.isBorderDefined && !hasNoneStyle) || isRowBorderDefined)) || isNullOrUndefined(leftBorder)) {
                if (isFirstCell) {
                    leftBorder = rowBorders.left;
                    if ((!isNullOrUndefined(leftBorder) && leftBorder.lineStyle === 'None') || isNullOrUndefined(leftBorder)) {
                        leftBorder = tableBorders.left;
                    }
                }
                else {
                    leftBorder = rowBorders.vertical;
                    if ((!isNullOrUndefined(leftBorder) && leftBorder.lineStyle === 'None') || isNullOrUndefined(leftBorder)) {
                        leftBorder = tableBorders.vertical;
                    }
                }
            }
        }
        return leftBorder;
    };
    /**
     * @private
     */
    TableCellWidget.getCellRightBorder = function (tableCell) {
        var rightBorder = undefined;
        var cellBorder = tableCell.cellFormat.borders;
        var rowBorders = !isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
        var tableBorders = !isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
        if (!isNullOrUndefined(cellBorder.right)) {
            rightBorder = cellBorder.right;
        }
        if (isNullOrUndefined(rightBorder)) {
            rightBorder = tableCell.getRightBorderToRenderByHierarchy(rightBorder, rowBorders, tableBorders);
        }
        if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
            rightBorder = tableCell.getRightBorderToRenderByHierarchy(rightBorder, rowBorders, tableBorders);
        }
        else {
            var nextCell = this.getNextCell(tableCell);
            // if the border is shared then choose the border based on Conflict Resolution algorithm.
            rightBorder = tableCell.getAdjacentCellRightBorder(rightBorder, nextCell);
        }
        if (isNullOrUndefined(rightBorder)) {
            rightBorder = new WBorder(tableCell.cellFormat.borders);
        }
        return rightBorder;
    };
    TableCellWidget.getNextCell = function (tableCell) {
        var nextCell = undefined;
        var columnSpan = tableCell.cellFormat.columnSpan;
        if (!isNullOrUndefined(tableCell.nextWidget)) {
            //Validates whether the next cell in same row is adjacent right cell and sets to nextCell.
            //If the next cell is not in the same row and it is vertically merged, we have handled in serverside
            //to copy border based on priority of current cell right border and next cell left border.
            var cell = tableCell.nextWidget;
            if (tableCell.columnIndex + columnSpan === cell.columnIndex) {
                nextCell = cell;
            }
        }
        return nextCell;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getAdjacentCellRightBorder = function (rightBorder, nextCell) {
        if (isNullOrUndefined(nextCell) || (!isNullOrUndefined(rightBorder) && (rightBorder.lineStyle === 'None' && !rightBorder.hasNoneStyle))) {
            if (!isNullOrUndefined(rightBorder) && !(rightBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                rightBorder = this.getRightBorderToRenderByHierarchy(rightBorder, TableRowWidget.getRowOf(rightBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(rightBorder.ownerBase).tableFormat.borders);
            }
        }
        if (isNullOrUndefined(nextCell)) {
            return rightBorder;
        }
        else {
            var nextCellLeftBorder = undefined;
            if (!isNullOrUndefined(nextCell.cellFormat.borders) && !isNullOrUndefined(nextCell.cellFormat.borders.left) && nextCell.cellFormat.borders.left.lineStyle !== 'None') {
                nextCellLeftBorder = nextCell.cellFormat.borders.left;
            }
            if (!isNullOrUndefined(nextCellLeftBorder) && nextCellLeftBorder.lineStyle !== 'None') {
                return this.getBorderBasedOnPriority(rightBorder, nextCellLeftBorder);
            }
            else if (!isNullOrUndefined(rightBorder) && !(rightBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                return this.getRightBorderToRenderByHierarchy(rightBorder, TableRowWidget.getRowOf(rightBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(rightBorder.ownerBase).tableFormat.borders);
            }
        }
        return rightBorder;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getRightBorderToRenderByHierarchy = function (rightBorder, rowBorders, tableBorders) {
        var ownerCell = TableCellWidget.getCellOf(rightBorder.ownerBase);
        if (!isNullOrUndefined(ownerCell)) {
            var isLastCell = false;
            //Have to check lastcell logic
            if ((ownerCell.columnIndex + ownerCell.cellFormat.columnSpan) === ownerCell.ownerTable.tableHolder.columns.length
                || (ownerCell.cellIndex === ownerCell.ownerRow.childWidgets.length - 1)) {
                isLastCell = true;
            }
            var isRowBorderDefined = false;
            var hasNoneStyle = false;
            if (isLastCell && !isNullOrUndefined(rowBorders.right)) {
                hasNoneStyle = rowBorders.right.hasNoneStyle;
            }
            else if (!isLastCell && !isNullOrUndefined(rowBorders.vertical)) {
                hasNoneStyle = rowBorders.vertical.hasNoneStyle;
            }
            if (!isNullOrUndefined(rowBorders.right) && rowBorders.right.lineStyle !== 'None'
                && rowBorders.right.isBorderDefined && !hasNoneStyle && !isNullOrUndefined(rightBorder) && rightBorder.lineStyle === 'None'
                && rightBorder.isBorderDefined && !rightBorder.hasValue('color')) {
                isRowBorderDefined = true;
            }
            if ((!isNullOrUndefined(rightBorder) && rightBorder.lineStyle === 'None' && ((!rightBorder.isBorderDefined && !hasNoneStyle) || isRowBorderDefined)) || isNullOrUndefined(rightBorder)) {
                if (isLastCell) {
                    rightBorder = rowBorders.right;
                    if ((!isNullOrUndefined(rightBorder) && rightBorder.lineStyle === 'None') || isNullOrUndefined(rightBorder)) {
                        rightBorder = tableBorders.right;
                    }
                }
                else {
                    rightBorder = rowBorders.vertical;
                    if ((!isNullOrUndefined(rightBorder) && rightBorder.lineStyle === 'None') || isNullOrUndefined(rightBorder)) {
                        rightBorder = tableBorders.vertical;
                    }
                }
            }
        }
        return rightBorder;
    };
    /**
     * @private
     */
    TableCellWidget.getCellTopBorder = function (tableCell) {
        var topBorder = undefined;
        var cellBorder = tableCell.cellFormat.borders;
        var rowBorders = !isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
        var tableBorders = !isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
        if (!isNullOrUndefined(cellBorder.top)) {
            topBorder = cellBorder.top;
        }
        if (isNullOrUndefined(topBorder)) {
            topBorder = tableCell.getTopBorderToRenderByHierarchy(topBorder, rowBorders, tableBorders);
        }
        if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
            topBorder = tableCell.getTopBorderToRenderByHierarchy(topBorder, rowBorders, tableBorders);
        }
        else {
            var prevTopCell = tableCell.getTopAdjacentCell();
            //If the border is shared then choose the border based on Conflict Resolution algorithm.
            topBorder = tableCell.getPreviousCellTopBorder(topBorder, prevTopCell);
        }
        if (isNullOrUndefined(topBorder)) {
            topBorder = new WBorder(tableCell.cellFormat.borders);
        }
        return topBorder;
    };
    TableCellWidget.prototype.getTopAdjacentCell = function () {
        var previousRow = this.ownerRow.previousWidget;
        var cell;
        if (!isNullOrUndefined(previousRow)) {
            cell = previousRow.getVerticalMergeStartCell(this.columnIndex, this.cellFormat.columnSpan);
        }
        return cell;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getPreviousCellTopBorder = function (topBorder, previousTopCell) {
        if (isNullOrUndefined(previousTopCell) || (!isNullOrUndefined(topBorder) && (topBorder.lineStyle === 'None' && !topBorder.hasNoneStyle))) {
            if (!isNullOrUndefined(topBorder) && !(topBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                topBorder = this.getTopBorderToRenderByHierarchy(topBorder, TableRowWidget.getRowOf(topBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(topBorder.ownerBase).tableFormat.borders);
            }
        }
        if (isNullOrUndefined(previousTopCell)) {
            return topBorder;
        }
        else {
            var prevTopCellBottomBorder = undefined;
            if (!isNullOrUndefined(previousTopCell.cellFormat.borders) && !isNullOrUndefined(previousTopCell.cellFormat.borders.bottom)) {
                prevTopCellBottomBorder = this.getBottomBorderToRenderByHierarchy(previousTopCell.cellFormat.borders.bottom, previousTopCell.ownerRow.rowFormat.borders, previousTopCell.ownerTable.tableFormat.borders);
            }
            if (!isNullOrUndefined(prevTopCellBottomBorder) && prevTopCellBottomBorder.lineStyle !== 'None') {
                return this.getBorderBasedOnPriority(topBorder, prevTopCellBottomBorder);
            }
            else if (!isNullOrUndefined(topBorder) && !(topBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                return this.getTopBorderToRenderByHierarchy(topBorder, TableRowWidget.getRowOf(topBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(topBorder.ownerBase).tableFormat.borders);
            }
        }
        return topBorder;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getTopBorderToRenderByHierarchy = function (topBorder, rowBorders, tableBorders) {
        var ownerCell = TableCellWidget.getCellOf(topBorder.ownerBase);
        if (!isNullOrUndefined(ownerCell)) {
            var isFirstRow = isNullOrUndefined(ownerCell.ownerRow.previousWidget);
            var isRowBorderDefined = false;
            var hasNoneStyle = false;
            if (isFirstRow && !isNullOrUndefined(rowBorders.top)) {
                hasNoneStyle = rowBorders.top.hasNoneStyle;
            }
            else if (!isFirstRow && !isNullOrUndefined(rowBorders.horizontal)) {
                hasNoneStyle = rowBorders.horizontal.hasNoneStyle;
            }
            if (!isNullOrUndefined(rowBorders.top) && rowBorders.top.lineStyle !== 'None'
                && rowBorders.top.isBorderDefined && !hasNoneStyle && !isNullOrUndefined(topBorder)
                && topBorder.lineStyle === 'None' && topBorder.isBorderDefined && !topBorder.hasValue('color')) {
                isRowBorderDefined = true;
            }
            if ((!isNullOrUndefined(topBorder) && topBorder.lineStyle === 'None' && ((!topBorder.isBorderDefined && !hasNoneStyle) || isRowBorderDefined)) || isNullOrUndefined(topBorder)) {
                if (isFirstRow) {
                    topBorder = rowBorders.top;
                    if ((!isNullOrUndefined(topBorder) && topBorder.lineStyle === 'None') || isNullOrUndefined(topBorder)) {
                        topBorder = tableBorders.top;
                    }
                }
                else {
                    topBorder = rowBorders.horizontal;
                    if ((!isNullOrUndefined(topBorder) && topBorder.lineStyle === 'None') || isNullOrUndefined(topBorder)) {
                        topBorder = tableBorders.horizontal;
                    }
                }
            }
        }
        return topBorder;
    };
    /**
     * @private
     */
    TableCellWidget.getCellBottomBorder = function (tableCell) {
        var bottomBorder = undefined;
        var cellBorder = tableCell.cellFormat.borders;
        var rowBorders = !isNullOrUndefined(tableCell.ownerRow) ? tableCell.ownerRow.rowFormat.borders : undefined;
        var tableBorders = !isNullOrUndefined(tableCell.ownerTable) ? tableCell.ownerTable.tableFormat.borders : undefined;
        if (!isNullOrUndefined(cellBorder.bottom)) {
            bottomBorder = cellBorder.bottom;
        }
        if (isNullOrUndefined(bottomBorder)) {
            bottomBorder = tableCell.getBottomBorderToRenderByHierarchy(bottomBorder, rowBorders, tableBorders); // select the left border based on heirarchy.
        }
        if (tableCell.ownerTable.tableFormat.cellSpacing > 0) {
            bottomBorder = tableCell.getBottomBorderToRenderByHierarchy(bottomBorder, rowBorders, tableBorders);
        }
        else {
            var nextBottomCell = undefined;
            var nextRow = undefined;
            var rowSpan = tableCell.cellFormat.rowSpan;
            if (rowSpan === 1) {
                nextRow = tableCell.ownerRow.nextWidget;
            }
            else if (rowSpan > 1) {
                var row = tableCell.containerWidget;
                do {
                    row = row.nextWidget;
                    if (isNullOrUndefined(row)) {
                        break;
                    }
                    else if (row.index === tableCell.rowIndex + rowSpan) {
                        nextRow = row;
                        break;
                    }
                } while (row);
            }
            if (!isNullOrUndefined(nextRow)) {
                nextBottomCell = nextRow.getCellWidget(tableCell.columnIndex, tableCell.cellFormat.columnSpan);
            }
            //If the border is shared then choose the border based on Conflict Resolution algorithm.
            bottomBorder = tableCell.getAdjacentCellBottomBorder(bottomBorder, nextBottomCell);
        }
        if (isNullOrUndefined(bottomBorder)) {
            bottomBorder = new WBorder(tableCell.cellFormat.borders);
        }
        return bottomBorder;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getAdjacentCellBottomBorder = function (bottomBorder, nextBottomCell) {
        if (isNullOrUndefined(nextBottomCell) || (!isNullOrUndefined(bottomBorder) && (bottomBorder.lineStyle === 'None' && !bottomBorder.hasNoneStyle))) {
            if (!isNullOrUndefined(bottomBorder) && !(bottomBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                bottomBorder = this.getBottomBorderToRenderByHierarchy(bottomBorder, TableRowWidget.getRowOf(bottomBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(bottomBorder.ownerBase).tableFormat.borders);
            }
        }
        if (isNullOrUndefined(nextBottomCell)) {
            return bottomBorder;
        }
        else {
            var prevBottomCellTopBorder = undefined;
            if (!isNullOrUndefined(nextBottomCell.cellFormat.borders) && !isNullOrUndefined(nextBottomCell.cellFormat.borders.top) && nextBottomCell.cellFormat.borders.top.lineStyle !== 'None') {
                prevBottomCellTopBorder = nextBottomCell.cellFormat.borders.top;
            }
            if (!isNullOrUndefined(prevBottomCellTopBorder) && prevBottomCellTopBorder.lineStyle !== 'None') {
                return this.getBorderBasedOnPriority(bottomBorder, prevBottomCellTopBorder);
            }
            else if (!isNullOrUndefined(bottomBorder) && !(bottomBorder.ownerBase.ownerBase instanceof WTableFormat)) {
                return this.getBottomBorderToRenderByHierarchy(bottomBorder, TableRowWidget.getRowOf(bottomBorder.ownerBase).rowFormat.borders, TableWidget.getTableOf(bottomBorder.ownerBase).tableFormat.borders);
            }
        }
        return bottomBorder;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getBottomBorderToRenderByHierarchy = function (bottomBorder, rowBorders, tableBorders) {
        var ownerCell = TableCellWidget.getCellOf(bottomBorder.ownerBase);
        if (!isNullOrUndefined(ownerCell)) {
            var isLastRow = isNullOrUndefined(ownerCell.ownerRow.nextWidget);
            var isRowBorderDefined = false;
            var hasNoneStyle = false;
            if (isLastRow && !isNullOrUndefined(rowBorders.bottom)) {
                hasNoneStyle = rowBorders.bottom.hasNoneStyle;
            }
            else if (!isLastRow && !isNullOrUndefined(rowBorders.horizontal)) {
                hasNoneStyle = rowBorders.horizontal.hasNoneStyle;
            }
            if (!isNullOrUndefined(rowBorders.bottom) && rowBorders.bottom.lineStyle !== 'None'
                && rowBorders.bottom.isBorderDefined && !hasNoneStyle && !isNullOrUndefined(bottomBorder)
                && bottomBorder.lineStyle === 'None' && bottomBorder.isBorderDefined && !bottomBorder.hasValue('color')) {
                isRowBorderDefined = true;
            }
            if ((!isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle === 'None' && ((!bottomBorder.isBorderDefined && !hasNoneStyle) || isRowBorderDefined)) || isNullOrUndefined(bottomBorder)) {
                if (isLastRow) {
                    bottomBorder = rowBorders.bottom;
                    if ((!isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle === 'None') || isNullOrUndefined(bottomBorder)) {
                        bottomBorder = tableBorders.bottom;
                    }
                }
                else {
                    bottomBorder = rowBorders.horizontal;
                    if ((!isNullOrUndefined(bottomBorder) && bottomBorder.lineStyle === 'None') || isNullOrUndefined(bottomBorder)) {
                        bottomBorder = tableBorders.horizontal;
                    }
                }
            }
        }
        return bottomBorder;
    };
    /**
     * @private
     */
    TableCellWidget.getCellOf = function (node) {
        if (node instanceof WBorders) {
            if (node.ownerBase instanceof WCellFormat && node.ownerBase.ownerBase instanceof TableCellWidget) {
                return node.ownerBase.ownerBase;
            }
            else {
                return undefined;
            }
        }
        return undefined;
    };
    /**
     * Updates the Widget left.
     * @private
     */
    TableCellWidget.prototype.updateWidgetLeft = function (x) {
        this.x = x;
        this.updateChildWidgetLeft(x);
    };
    /**
     * @private
     */
    TableCellWidget.prototype.updateChildWidgetLeft = function (left) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var widget = this.childWidgets[i];
            widget.x = left;
            if (widget instanceof ParagraphWidget) {
                var leftIndent = HelperMethods.convertPointToPixel(widget.leftIndent);
                var rightIndent = HelperMethods.convertPointToPixel(widget.rightIndent);
                widget.x = left + (widget.bidi ? rightIndent : leftIndent);
            }
            if (widget instanceof TableWidget) {
                var tableWidget = widget;
                tableWidget.updateChildWidgetLeft(left);
                if (tableWidget.isBidiTable) {
                    var clientArea = new Rect(tableWidget.x, tableWidget.y, tableWidget.width, tableWidget.height);
                    tableWidget.shiftWidgetsForRtlTable(clientArea, tableWidget);
                }
            }
        }
    };
    /**
     * @private
     */
    TableCellWidget.prototype.getMinimumAndMaximumWordWidth = function (minimumWordWidth, maximumWordWidth) {
        for (var i = 0; i < this.childWidgets.length; i++) {
            var block = this.childWidgets[i];
            var widthInfo = block.getMinimumAndMaximumWordWidth(minimumWordWidth, maximumWordWidth);
            minimumWordWidth = widthInfo.minimumWordWidth;
            maximumWordWidth = widthInfo.maximumWordWidth;
        }
        return { 'minimumWordWidth': minimumWordWidth, 'maximumWordWidth': maximumWordWidth };
    };
    /**
     * @private
     */
    TableCellWidget.prototype.destroyInternal = function (viewer) {
        // let viewer: LayoutViewer = undefined;
        // let page: Page = this.getPage();
        // if (!isNullOrUndefined(page ))
        //     viewer = page.viewer;
        if (!isNullOrUndefined(this.childWidgets)) {
            for (var i = 0; i < this.childWidgets.length; i++) {
                var widget = this.childWidgets[i];
                if (widget instanceof ParagraphWidget) {
                    widget.destroyInternal(viewer);
                }
                else {
                    widget.destroyInternal(viewer);
                }
                i--;
            }
            this.childWidgets = undefined;
            if (!isNullOrUndefined(viewer.documentHelper.selection)) {
                if (viewer.documentHelper.selection.selectedWidgets.containsKey(this)) {
                    viewer.documentHelper.selection.selectedWidgets.remove(this);
                }
            }
        }
        this.destroy();
    };
    /**
     * @private
     */
    TableCellWidget.prototype.clone = function () {
        var cell = new TableCellWidget();
        cell.cellFormat.copyFormat(this.cellFormat);
        for (var i = 0; i < this.childWidgets.length; i++) {
            var block = this.childWidgets[i].clone();
            cell.childWidgets.push(block);
            block.containerWidget = cell;
            block.index = i;
        }
        cell.leftBorderWidth = this.leftBorderWidth;
        cell.rightBorderWidth = this.rightBorderWidth;
        cell.isRenderBookmarkEnd = this.isRenderBookmarkEnd;
        cell.isRenderBookmarkStart = this.isRenderBookmarkStart;
        if (this.margin) {
            cell.margin = this.margin.clone();
        }
        cell.columnIndex = this.columnIndex;
        cell.x = this.x;
        cell.y = this.y;
        cell.height = this.height;
        cell.width = this.width;
        if (this.contentControlProperties) {
            cell.contentControlProperties = this.contentControlProperties;
        }
        return cell;
    };
    /**
     * @private
     */
    TableCellWidget.prototype.destroy = function () {
        // if (this.cellFormat) {
        //     this.cellFormat.destroy();
        // }
        this.cellFormat = undefined;
        this.rowIndex = undefined;
        this.columnIndex = undefined;
        this.isSplittedCell = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    TableCellWidget.prototype.componentDestroy = function () {
        if (this.cellFormat) {
            this.cellFormat.destroy();
        }
        this.cellFormat = undefined;
        this.contentControlProperties = undefined;
        this.rowIndex = undefined;
        this.columnIndex = undefined;
        this.isRenderBookmarkStart = undefined;
        this.isRenderBookmarkEnd = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return TableCellWidget;
}(BlockWidget));
export { TableCellWidget };
/**
 * @private
 */
var LineWidget = /** @class */ (function () {
    /**
     * Initialize the constructor of LineWidget
     */
    function LineWidget(paragraphWidget) {
        /**
         * @private
         */
        this.children = [];
        /**
         * @private
         */
        this.x = 0;
        /**
         * @private
         */
        this.y = 0;
        /**
         * @private
         */
        this.width = 0;
        /**
         * @private
         */
        this.height = 0;
        /**
         * @private
         */
        this.marginTop = 0;
        /**
         * @private
         */
        this.maxBaseLine = 0;
        /**
        * @private
        */
        this.skipClipImage = false;
        this.paragraph = paragraphWidget;
    }
    Object.defineProperty(LineWidget.prototype, "renderedElements", {
        /**
         * Rendered elements contains reordered element for RTL layout
         */
        get: function () {
            if (!isNullOrUndefined(this.layoutedElements)) {
                return this.layoutedElements;
            }
            return this.children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineWidget.prototype, "indexInOwner", {
        /**
         * @private
         */
        get: function () {
            if (this.paragraph && this.paragraph.childWidgets) {
                return this.paragraph.childWidgets.indexOf(this);
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineWidget.prototype, "nextLine", {
        /**
         * @private
         */
        get: function () {
            var paragraph = this.paragraph;
            var lineIndex = this.indexInOwner;
            if (lineIndex <= paragraph.childWidgets.length - 2) {
                return paragraph.childWidgets[lineIndex + 1];
            }
            else if (paragraph.nextSplitWidget) {
                var line = paragraph.nextSplitWidget.firstChild;
                if (line instanceof LineWidget && line.paragraph.equals(this.paragraph)) {
                    return line;
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineWidget.prototype, "previousLine", {
        /**
         * @private
         */
        get: function () {
            var paragraph = this.paragraph;
            var lineIndex = this.indexInOwner;
            var splitParagraph = paragraph.previousSplitWidget;
            if (lineIndex > 0) {
                return paragraph.childWidgets[lineIndex - 1];
            }
            else if (splitParagraph instanceof ParagraphWidget) {
                var line = splitParagraph.lastChild;
                if (line instanceof LineWidget && line.paragraph.equals(this.paragraph)) {
                    return line;
                }
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineWidget.prototype, "isEndsWithPageBreak", {
        /**
         * @private
         */
        get: function () {
            if (this.children.length > 0) {
                var lastElement = this.children[this.children.length - 1];
                if (lastElement instanceof TextElementBox) {
                    return lastElement.isPageBreak;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineWidget.prototype, "isEndsWithColumnBreak", {
        get: function () {
            if (this.children.length > 0) {
                var lastElement = this.children[this.children.length - 1];
                if (lastElement instanceof TextElementBox) {
                    return lastElement.isColumnBreak;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LineWidget.prototype, "isEndsWithLineBreak", {
        /**
         * @private
         */
        get: function () {
            if (this.children.length > 0) {
                var lastElement = this.children[this.children.length - 1];
                if (lastElement instanceof TextElementBox) {
                    return lastElement.text === '\v';
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    LineWidget.prototype.isFirstLine = function () {
        var index = this.indexInOwner;
        if (index > -1 && (this.paragraph.previousSplitWidget === undefined || (this.paragraph.previousSplitWidget instanceof ParagraphWidget && (this.paragraph.previousSplitWidget.isEndsWithColumnBreak || this.paragraph.previousSplitWidget.isEndsWithPageBreak)))) {
            return index === 0;
        }
        return false;
    };
    /**
     * @private
     */
    LineWidget.prototype.isLastLine = function () {
        var index = this.indexInOwner;
        if (index > -1 && this.paragraph.nextSplitWidget === undefined) {
            return index === this.paragraph.childWidgets.length - 1;
        }
        return false;
    };
    /**
     * @private
     */
    LineWidget.prototype.getOffset = function (inline, index) {
        if (isNullOrUndefined(inline)) {
            return index;
        }
        var textIndex = index;
        var line = inline.line;
        for (var i = 0; i < line.children.length; i++) {
            var inlineElement = line.children[i];
            if (inline === inlineElement) {
                break;
            }
            if (inlineElement instanceof ListTextElementBox) {
                continue;
            }
            textIndex += inlineElement.length;
        }
        return textIndex;
    };
    /**
     * @private
     */
    LineWidget.prototype.getEndOffset = function () {
        var startOffset = 0;
        var count = 0;
        for (var i = 0; i < this.children.length; i++) {
            var inlineElement = this.children[i];
            if (inlineElement.length === 0) {
                continue;
            }
            if (inlineElement instanceof ListTextElementBox) {
                continue;
            }
            if (inlineElement.characterFormat.hidden) {
                count += inlineElement.length;
                continue;
            }
            if (inlineElement instanceof TextElementBox || inlineElement instanceof CommentCharacterElementBox
                || inlineElement instanceof EditRangeStartElementBox || inlineElement instanceof ImageElementBox
                || inlineElement instanceof EditRangeEndElementBox || inlineElement instanceof BookmarkElementBox
                || inlineElement instanceof ContentControl || (inlineElement instanceof FieldElementBox
                && HelperMethods.isLinkedFieldCharacter(inlineElement))) {
                startOffset = count + inlineElement.length;
            }
            count += inlineElement.length;
        }
        return startOffset;
    };
    /**
     * @private
     */
    LineWidget.prototype.getInline = function (offset, indexInInline, bidi, isInsert, isSpellCheck) {
        bidi = isNullOrUndefined(bidi) ? this.paragraph.bidi : bidi;
        var inlineElement = undefined;
        var count = 0;
        var isStarted = false;
        if (this.children.length === 0) {
            if (this.previousLine) {
                var elementBox = this.previousLine.children[this.previousLine.children.length - 1];
                if (elementBox instanceof TextElementBox && elementBox.text === '\v') {
                    inlineElement = this.previousLine.children[this.previousLine.children.length - 1];
                    indexInInline = 1;
                    return { 'element': inlineElement, 'index': indexInInline };
                }
            }
        }
        for (var i = 0; i < this.children.length; i++) {
            inlineElement = this.children[i];
            if (inlineElement instanceof ListTextElementBox) {
                continue;
            }
            if (!isStarted && (inlineElement instanceof TextElementBox || inlineElement instanceof ImageElementBox
                || inlineElement instanceof ShapeElementBox || inlineElement instanceof ContentControl
                || inlineElement instanceof BookmarkElementBox || inlineElement instanceof EditRangeEndElementBox
                || inlineElement instanceof EditRangeStartElementBox || inlineElement instanceof CommentCharacterElementBox
                || inlineElement instanceof FieldElementBox
                    && HelperMethods.isLinkedFieldCharacter(inlineElement))) {
                isStarted = true;
            }
            if (isStarted && offset <= count + inlineElement.length) {
                if (inlineElement instanceof TextElementBox && (inlineElement.text === ' ' && inlineElement.revisions.length === 0 && isInsert && !isSpellCheck)) {
                    var currentElement = this.getNextTextElement(this, i + 1);
                    inlineElement = !isNullOrUndefined(currentElement) ? currentElement : inlineElement;
                    indexInInline = isNullOrUndefined(currentElement) ? (offset - count) : 0;
                    return { 'element': inlineElement, 'index': indexInInline };
                }
                else if (offset === count + inlineElement.length && this.children[i + 1] instanceof FootnoteElementBox) {
                    return { 'element': this.children[i + 1], 'index': indexInInline };
                }
                else {
                    indexInInline = (offset - count);
                }
                return { 'element': inlineElement, 'index': indexInInline };
            }
            count += inlineElement.length;
        }
        if (offset > count) {
            indexInInline = isNullOrUndefined(inlineElement) ? offset : inlineElement.length;
        }
        return { 'element': inlineElement, 'index': indexInInline };
    };
    /**
     * @private
     */
    LineWidget.prototype.isEndnoteLineWidget = function () {
        if (!isNullOrUndefined(this.paragraph.containerWidget)
            && this.paragraph.containerWidget.containerWidget instanceof FootNoteWidget
            && this.paragraph.containerWidget.containerWidget.footNoteType === 'Endnote') {
            return true;
        }
        return false;
    };
    /**
     * Method to retrieve next element
     * @param line
     * @param index
     */
    LineWidget.prototype.getNextTextElement = function (line, index) {
        if (index < line.children.length - 1 && line.children[index]) {
            return line.children[index];
        }
        return null;
    };
    /**
     * @private
     */
    LineWidget.prototype.getHierarchicalIndex = function (hierarchicalIndex) {
        var node = this;
        hierarchicalIndex = node.paragraph.childWidgets.indexOf(node) + ';' + hierarchicalIndex;
        if (node.paragraph instanceof BlockWidget) {
            return node.paragraph.getHierarchicalIndex(hierarchicalIndex);
        }
        return hierarchicalIndex;
    };
    /**
     * @private
     */
    LineWidget.prototype.clone = function () {
        var line = new LineWidget(undefined);
        for (var j = 0; j < this.children.length; j++) {
            var element = this.children[j];
            var clone = element.clone();
            line.children.push(clone);
            clone.line = line;
        }
        line.width = this.width;
        line.height = this.height;
        if (!isNullOrUndefined(this.margin)) {
            line.margin = this.margin.clone();
        }
        return line;
    };
    /**
     * @private
     */
    LineWidget.prototype.destroy = function () {
        if (!isNullOrUndefined(this.children)) {
            for (var i = 0; i < this.children.length; i++) {
                this.children[i].destroy();
            }
            this.children = [];
        }
        this.children = undefined;
        if (this.paragraph) {
            this.paragraph.removeChild(this.indexInOwner);
        }
        this.paragraph = undefined;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    LineWidget.prototype.componentDestroy = function () {
        if (!isNullOrUndefined(this.children)) {
            for (var i = 0; i < this.children.length; i++) {
                var elementBox = this.children[i];
                elementBox.componentDestroy();
            }
            this.children = [];
        }
        this.children = undefined;
        this.paragraph = undefined;
        this.layoutedElements = [];
        this.layoutedElements = undefined;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
    };
    return LineWidget;
}());
export { LineWidget };
/**
 * @private
 */
var ElementBox = /** @class */ (function () {
    /**
     * Initialize the constructor of ElementBox
     */
    function ElementBox() {
        /**
         * @private
         */
        this.x = 0;
        /**
         * @private
         */
        this.y = 0;
        /**
         * @private
         */
        this.width = 0;
        /**
         * @private
         */
        this.height = 0;
        /**
        * @private
        */
        this.isWidthUpdated = false;
        /**
         * @private
         */
        this.margin = new Margin(0, 0, 0, 0);
        /**
         * @private
         */
        this.padding = new Margin(0, 0, 0, 0);
        /**
         * @private
         */
        this.characterFormat = undefined;
        /**
         * @private
         */
        this.isRightToLeft = false;
        /**
         * @private
         */
        this.canTrigger = false;
        /**
         * @private
         */
        this.ischangeDetected = false;
        /**
         * @private
         */
        this.isVisible = false;
        /**
         * @private
         */
        this.isSpellChecked = false;
        /**
         * @private
         */
        this.isSpellCheckTriggered = false;
        /**
         * @private
         */
        this.revisions = [];
        /**
         * @private
         */
        this.canTrack = false;
        /**
         * @private
         */
        this.removedIds = [];
        /**
         * @private
         */
        this.isMarkedForRevision = false;
        /**
         * @private
         */
        this.skipformFieldLength = false;
        /**
         * @private
         */
        this.characterRange = undefined;
        this.characterFormat = new WCharacterFormat(this);
        this.margin = new Margin(0, 0, 0, 0);
    }
    Object.defineProperty(ElementBox.prototype, "isPageBreak", {
        /**
         * @private
         */
        get: function () {
            if (this instanceof TextElementBox) {
                return this.text === '\f';
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "isColumnBreak", {
        get: function () {
            if (this instanceof TextElementBox) {
                return this.text === String.fromCharCode(14);
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "isValidNodeForTracking", {
        /**
         * @private
         * Method to indicate whether current element is trackable.
         */
        get: function () {
            if (this instanceof BookmarkElementBox || this instanceof CommentCharacterElementBox || this instanceof EditRangeStartElementBox || this instanceof EditRangeEndElementBox || this instanceof ContentControl) {
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "isCheckBoxElement", {
        /**
         * @private
         */
        get: function () {
            var element = this;
            if (element instanceof TextElementBox && !isNullOrUndefined(element.text)) {
                return element.text === String.fromCharCode(9745) || element.text === String.fromCharCode(9744);
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ElementBox.prototype.linkFieldCharacter = function (documentHelper) {
        if (!(this instanceof FieldElementBox)) {
            return;
        }
        if (this.fieldType === 0) {
            var fieldBegin = this;
            if (isNullOrUndefined(fieldBegin.fieldEnd)) {
                this.linkFieldTraversingForward(this.line, fieldBegin, fieldBegin);
                if (documentHelper.fields.indexOf(fieldBegin) === -1) {
                    documentHelper.fields.push(fieldBegin);
                }
                if (!isNullOrUndefined(fieldBegin.formFieldData) &&
                    documentHelper.formFields.indexOf(fieldBegin) === -1 && !documentHelper.layout.isInsertFormField) {
                    documentHelper.formFields.push(fieldBegin);
                }
            }
        }
        else if (this.fieldType === 2) {
            var fieldSeparator = this;
            //Links the field begin for the current separator.
            if (isNullOrUndefined(fieldSeparator.fieldBegin)) {
                this.linkFieldTraversingBackwardSeparator(this.line, fieldSeparator, fieldSeparator);
            }
            if (!isNullOrUndefined(fieldSeparator.fieldBegin)) {
                fieldSeparator.fieldBegin.fieldSeparator = fieldSeparator;
                //Links to field end traversing from field separator.
                if (isNullOrUndefined(fieldSeparator.fieldEnd)) {
                    var isFieldEnd = this.linkFieldTraversingForward(this.line, fieldSeparator.fieldBegin, fieldSeparator);
                    if (isFieldEnd) {
                        fieldSeparator.fieldEnd = fieldSeparator.fieldBegin.fieldEnd;
                    }
                }
                if (fieldSeparator.fieldEnd) {
                    fieldSeparator.fieldEnd.fieldSeparator = fieldSeparator;
                }
            }
        }
        else {
            var fieldEnd = this;
            //Links the field begin and separator for the current end.
            if (isNullOrUndefined(fieldEnd.fieldBegin)) {
                this.linkFieldTraversingBackward(this.line, fieldEnd, fieldEnd);
            }
        }
    };
    /**
     * @private
     */
    ElementBox.prototype.linkFieldTraversingBackward = function (line, fieldEnd, previousNode) {
        var k = line.children.length - 1;
        if (line.children.indexOf(previousNode) > -1) {
            k = line.children.indexOf(previousNode) - 1;
        }
        for (var j = k; j >= 0; j--) {
            var childNode = line.children[j];
            if (childNode instanceof FieldElementBox) {
                if (childNode.fieldType === 0) {
                    if (isNullOrUndefined(childNode.fieldEnd)) {
                        fieldEnd.fieldBegin = childNode;
                        if (isNullOrUndefined(childNode.fieldEnd)) {
                            childNode.fieldEnd = fieldEnd;
                        }
                        if (fieldEnd.fieldSeparator && isNullOrUndefined(fieldEnd.fieldSeparator.fieldBegin)) {
                            fieldEnd.fieldSeparator.fieldBegin = childNode;
                            if (isNullOrUndefined(childNode.fieldSeparator)) {
                                childNode.fieldSeparator = fieldEnd.fieldSeparator;
                            }
                        }
                        return !isNullOrUndefined(fieldEnd.fieldBegin);
                    }
                }
                else if (childNode.fieldType === 2 && isNullOrUndefined(childNode.fieldEnd)) {
                    fieldEnd.fieldSeparator = childNode;
                    childNode.fieldEnd = fieldEnd;
                    if (!isNullOrUndefined(childNode.fieldBegin)) {
                        fieldEnd.fieldBegin = childNode.fieldBegin;
                    }
                }
            }
        }
        if (line.previousLine) {
            this.linkFieldTraversingBackward(line.previousLine, fieldEnd, this);
        }
        else if (line.paragraph.previousRenderedWidget instanceof ParagraphWidget
            && line.paragraph.previousRenderedWidget.childWidgets.length > 0) {
            var prevParagraph = line.paragraph.previousRenderedWidget;
            this.linkFieldTraversingBackward(prevParagraph.childWidgets[prevParagraph.childWidgets.length - 1], fieldEnd, this);
        }
        return true;
    };
    /**
     * @private
     */
    ElementBox.prototype.linkFieldTraversingForward = function (line, fieldBegin, previousNode, fieldCount) {
        var i = 0;
        if (isNullOrUndefined(fieldCount)) {
            fieldCount = 0;
        }
        if (line.children.indexOf(previousNode) > -1) {
            i = line.children.indexOf(previousNode) + 1;
        }
        for (var j = i; j < line.children.length; j++) {
            var node = line.children[j];
            if (node instanceof FieldElementBox) {
                if (node.fieldType === 0) {
                    fieldCount++;
                }
                if (node.fieldType === 1) {
                    if (fieldCount !== 0) {
                        fieldCount--;
                        continue;
                    }
                    if (isNullOrUndefined(node.fieldBegin)) {
                        fieldBegin.fieldEnd = node;
                    }
                    if (fieldBegin.fieldEnd && isNullOrUndefined(fieldBegin.fieldEnd.fieldBegin)) {
                        fieldBegin.fieldEnd.fieldBegin = fieldBegin;
                    }
                    return true;
                }
                else if (isNullOrUndefined(fieldBegin.fieldSeparator)) {
                    if (node.fieldType === 2 && isNullOrUndefined(node.fieldBegin)) {
                        fieldBegin.fieldSeparator = node;
                        if (fieldBegin.fieldSeparator && isNullOrUndefined(fieldBegin.fieldSeparator.fieldBegin)) {
                            fieldBegin.fieldSeparator.fieldBegin = fieldBegin;
                        }
                        if (!isNullOrUndefined(node.fieldEnd)) {
                            fieldBegin.fieldEnd = node.fieldEnd;
                            fieldBegin.fieldSeparator.fieldEnd = fieldBegin.fieldEnd;
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        if (line.nextLine) {
            this.linkFieldTraversingForward(line.nextLine, fieldBegin, this, fieldCount);
        }
        else if (line.paragraph.nextRenderedWidget instanceof ParagraphWidget
            && line.paragraph.nextRenderedWidget.childWidgets.length > 0) {
            this.linkFieldTraversingForward(line.paragraph.nextRenderedWidget.childWidgets[0], fieldBegin, this, fieldCount);
        }
        else if (line.paragraph.nextRenderedWidget instanceof TableWidget) {
            var tableWidget = line.paragraph.nextRenderedWidget;
            tableWidget = tableWidget.getSplitWidgets().pop();
            if (!isNullOrUndefined(tableWidget.nextRenderedWidget) && tableWidget.nextRenderedWidget instanceof ParagraphWidget && tableWidget.nextRenderedWidget.childWidgets.length > 0) {
                this.linkFieldTraversingForward(tableWidget.nextRenderedWidget.childWidgets[0], fieldBegin, this, fieldCount);
            }
        }
        return true;
    };
    /**
     * @private
     */
    ElementBox.prototype.linkFieldTraversingBackwardSeparator = function (line, fieldSeparator, previousNode) {
        var index = line.children.length - 1;
        if (line.children.indexOf(previousNode) > -1) {
            index = line.children.indexOf(previousNode) - 1;
        }
        for (var i = index; i >= 0; i--) {
            var childElement = line.children[i];
            if (childElement instanceof FieldElementBox) {
                if (childElement instanceof FieldElementBox && childElement.fieldType === 0) {
                    if (isNullOrUndefined(childElement.fieldSeparator)) {
                        fieldSeparator.fieldBegin = childElement;
                    }
                    return !isNullOrUndefined(fieldSeparator.fieldBegin);
                }
            }
        }
        if (line.previousLine) {
            this.linkFieldTraversingBackwardSeparator(line.previousLine, fieldSeparator, this);
        }
        else if (line.paragraph.previousRenderedWidget instanceof ParagraphWidget
            && line.paragraph.previousRenderedWidget.childWidgets.length > 0) {
            line = line.paragraph.previousRenderedWidget.childWidgets[line.paragraph.previousRenderedWidget.childWidgets.length - 1];
            this.linkFieldTraversingBackwardSeparator(line, fieldSeparator, this);
        }
        else {
            return true;
        }
        return true;
    };
    Object.defineProperty(ElementBox.prototype, "length", {
        /**
         * @private
         */
        get: function () {
            return this.getLength();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "indexInOwner", {
        /**
         * @private
         */
        get: function () {
            return this.line instanceof LineWidget && this.line.children ? this.line.children.indexOf(this) : -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "previousElement", {
        /**
         * @private
         */
        get: function () {
            var index = this.indexInOwner;
            if (index > 0 && index < this.line.children.length) {
                return this.line.children[index - 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "nextElement", {
        /**
         * @private
         */
        get: function () {
            var index = this.indexInOwner;
            if (index > -1 && index < this.line.children.length - 1) {
                return this.line.children[index + 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "nextNode", {
        /**
         * @private
         */
        get: function () {
            var index = this.line.children.indexOf(this);
            var lineIndex = this.line.paragraph.childWidgets.indexOf(this.line);
            if (index < this.line.children.length - 1) {
                return this.line.children[index + 1];
            }
            else if (lineIndex < this.line.paragraph.childWidgets.length - 1) {
                return this.line.paragraph.childWidgets[lineIndex + 1].children[0];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "nextValidNodeForTracking", {
        /**
         * @private
         */
        get: function () {
            var elementBox = this;
            while (!isNullOrUndefined(elementBox) && (elementBox instanceof BookmarkElementBox || elementBox instanceof CommentCharacterElementBox || elementBox instanceof EditRangeStartElementBox || elementBox instanceof EditRangeEndElementBox || elementBox instanceof ContentControl)) {
                elementBox = elementBox.nextNode;
            }
            return elementBox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "previousValidNodeForTracking", {
        /**
         * @private
         */
        get: function () {
            var elementBox = this;
            while (!isNullOrUndefined(elementBox) && (elementBox instanceof BookmarkElementBox || elementBox instanceof CommentCharacterElementBox || elementBox instanceof EditRangeStartElementBox || elementBox instanceof EditRangeEndElementBox || elementBox instanceof ContentControl)) {
                elementBox = elementBox.previousNode;
            }
            return elementBox;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "previousNode", {
        /**
         * @private
         */
        get: function () {
            var index = this.line.children.indexOf(this);
            var lineIndex = this.line.paragraph.childWidgets.indexOf(this.line);
            if (index > 0) {
                return this.line.children[index - 1];
            }
            else if (lineIndex > 0) {
                var lineWidget = this.line.paragraph.childWidgets[lineIndex - 1];
                return lineWidget.children[lineWidget.children.length - 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ElementBox.prototype, "paragraph", {
        /**
         * @private
         */
        get: function () {
            if (this.line) {
                return this.line.paragraph;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ElementBox.prototype.destroy = function () {
        if (!isNullOrUndefined(this.line) && this.line.children && this.line.children.indexOf(this) > -1) {
            var index = this.line.children.indexOf(this);
            this.line.children.splice(index, 1);
        }
        this.line = undefined;
        if (this.characterFormat) {
            this.characterFormat.destroy();
        }
        this.characterFormat = undefined;
        if (this.margin) {
            this.margin.destroy();
        }
        this.margin = undefined;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    ElementBox.prototype.componentDestroy = function () {
        if (this.characterFormat) {
            this.characterFormat.destroy();
        }
        this.characterFormat = undefined;
        if (this.margin) {
            this.margin.destroy();
        }
        this.margin = undefined;
        if (this.padding) {
            this.padding.destroy();
        }
        this.padding = undefined;
        this.contentControlProperties = undefined;
        this.line = undefined;
        this.x = undefined;
        this.y = undefined;
        this.width = undefined;
        this.height = undefined;
    };
    /**
     * @private
     */
    ElementBox.objectCharacter = String.fromCharCode(65532);
    return ElementBox;
}());
export { ElementBox };
/**
 * @private
 */
var FieldElementBox = /** @class */ (function (_super) {
    __extends(FieldElementBox, _super);
    function FieldElementBox(type) {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.fieldType = 0;
        /**
         * @private
         */
        _this.fieldCodeType = '';
        /**
         * @private
         */
        _this.hasFieldEnd = false;
        /**
        * @private
        */
        _this.fieldBeginInternal = undefined;
        _this.fieldSeparatorInternal = undefined;
        _this.fieldEndInternal = undefined;
        _this.fieldType = type;
        return _this;
    }
    Object.defineProperty(FieldElementBox.prototype, "fieldBegin", {
        get: function () {
            return this.fieldBeginInternal;
        },
        set: function (field) {
            this.fieldBeginInternal = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldElementBox.prototype, "fieldSeparator", {
        get: function () {
            return this.fieldSeparatorInternal;
        },
        set: function (field) {
            this.fieldSeparatorInternal = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldElementBox.prototype, "fieldEnd", {
        get: function () {
            return this.fieldEndInternal;
        },
        set: function (field) {
            this.fieldEndInternal = field;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FieldElementBox.prototype, "resultText", {
        /**
         * @private
         */
        get: function () {
            if (!isNullOrUndefined(this.formFieldData) && this.fieldType === 0 &&
                !isNullOrUndefined(this.fieldSeparator) && !isNullOrUndefined(this.fieldEnd)) {
                var textElement = this.fieldSeparator.nextElement;
                var text = '';
                do {
                    if (textElement instanceof TextElementBox) {
                        text += textElement.text;
                    }
                    textElement = textElement.nextNode;
                    if (textElement === this.fieldEnd) {
                        break;
                    }
                } while (textElement);
                return text;
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    FieldElementBox.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    FieldElementBox.prototype.clone = function () {
        var field = new FieldElementBox(this.fieldType);
        if (this.fieldType === 0 && !isNullOrUndefined(this.formFieldData)) {
            field.formFieldData = this.formFieldData.clone();
        }
        field.characterFormat.copyFormat(this.characterFormat);
        if (this.margin) {
            field.margin = this.margin.clone();
        }
        field.width = this.width;
        field.height = this.height;
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revision = this.revisions[i];
                    field.revisions.push(revision.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                field.removedIds = Revision.cloneRevisions(this.revisions);
                if (this.fieldEnd) {
                    field.hasFieldEnd = this.hasFieldEnd;
                }
            }
            else {
                field.removedIds = this.removedIds.slice();
                if (!isNullOrUndefined(this.fieldEnd) && !isNullOrUndefined(this.fieldEnd.paragraph) && !(this.fieldEnd.paragraph.containerWidget instanceof TableCellWidget)) {
                    field.hasFieldEnd = this.hasFieldEnd;
                }
            }
        }
        field.fieldCodeType = this.fieldCodeType;
        return field;
    };
    /**
     * @private
     */
    FieldElementBox.prototype.destroy = function () {
        this.fieldType = undefined;
        this.hasFieldEnd = undefined;
        this.fieldBeginInternal = undefined;
        this.fieldEndInternal = undefined;
        this.fieldSeparatorInternal = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    FieldElementBox.prototype.componentDestroy = function () {
        if (this.formFieldData) {
            this.formFieldData.destroy();
        }
        this.formFieldData = undefined;
        this.fieldCodeType = undefined;
        this.fieldBeginInternal = undefined;
        this.fieldEndInternal = undefined;
        this.fieldSeparatorInternal = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return FieldElementBox;
}(ElementBox));
export { FieldElementBox };
/**
 * @private
 */
var FormField = /** @class */ (function () {
    function FormField() {
        /*
         * @private
         */
        this.name = '';
        /**
         * @private
         */
        this.enabled = true;
        /**
         * @private
         */
        this.helpText = '';
        /**
         * @private
         */
        this.statusText = '';
    }
    /**
     * @private
     */
    FormField.prototype.destroy = function () {
        this.name = undefined;
        this.helpText = undefined;
        this.statusText = undefined;
    };
    return FormField;
}());
export { FormField };
/**
 * @private
 */
var TextFormField = /** @class */ (function (_super) {
    __extends(TextFormField, _super);
    function TextFormField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.type = 'Text';
        /**
         * @private
         */
        _this.maxLength = 0;
        /**
         * @private
         */
        _this.defaultValue = '';
        /**
         * @private
         */
        _this.format = '';
        return _this;
    }
    /**
     * @private
     */
    TextFormField.prototype.clone = function () {
        var textForm = new TextFormField();
        textForm.type = this.type;
        textForm.name = this.name;
        textForm.enabled = this.enabled;
        textForm.helpText = this.helpText;
        textForm.statusText = this.statusText;
        textForm.maxLength = this.maxLength;
        textForm.defaultValue = this.defaultValue;
        textForm.format = this.format;
        return textForm;
    };
    /**
     * @private
     */
    TextFormField.prototype.getFormFieldInfo = function () {
        var textFormField = {
            defaultValue: this.defaultValue,
            enabled: this.enabled,
            format: this.format,
            helpText: this.helpText,
            maxLength: this.maxLength,
            type: this.type,
            name: this.name
        };
        return textFormField;
    };
    /**
     * @private
     */
    TextFormField.prototype.copyFieldInfo = function (info) {
        if (!isNullOrUndefined(info.defaultValue)) {
            this.defaultValue = info.defaultValue;
        }
        if (!isNullOrUndefined(info.enabled)) {
            this.enabled = info.enabled;
        }
        if (!isNullOrUndefined(info.format)) {
            this.format = info.format;
        }
        if (!isNullOrUndefined(info.helpText)) {
            this.helpText = info.helpText;
        }
        if (!isNullOrUndefined(info.maxLength)) {
            this.maxLength = info.maxLength;
        }
        if (!isNullOrUndefined(info.type)) {
            this.type = info.type;
        }
    };
    /**
     * @private
     */
    TextFormField.prototype.destroy = function () {
        this.format = undefined;
        this.defaultValue = undefined;
        _super.prototype.destroy.call(this);
    };
    return TextFormField;
}(FormField));
export { TextFormField };
/**
 * @private
 */
var CheckBoxFormField = /** @class */ (function (_super) {
    __extends(CheckBoxFormField, _super);
    function CheckBoxFormField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.sizeType = 'Auto';
        /**
         * @private
         */
        _this.size = 11;
        /**
         * @private
         */
        _this.defaultValue = false;
        /**
         * @private
         */
        _this.checked = false;
        return _this;
    }
    /**
     * @private
     */
    CheckBoxFormField.prototype.clone = function () {
        var checkBoxForm = new CheckBoxFormField();
        checkBoxForm.name = this.name;
        checkBoxForm.enabled = this.enabled;
        checkBoxForm.helpText = this.helpText;
        checkBoxForm.statusText = this.statusText;
        checkBoxForm.sizeType = this.sizeType;
        checkBoxForm.size = this.size;
        checkBoxForm.defaultValue = this.defaultValue;
        checkBoxForm.checked = this.checked;
        return checkBoxForm;
    };
    /**
     * @private
     */
    CheckBoxFormField.prototype.getFormFieldInfo = function () {
        var checkBoxFormField = {
            defaultValue: this.defaultValue,
            enabled: this.enabled,
            helpText: this.helpText,
            size: this.size,
            sizeType: this.sizeType,
            name: this.name
        };
        return checkBoxFormField;
    };
    /**
     * @private
     */
    CheckBoxFormField.prototype.copyFieldInfo = function (info) {
        if (!isNullOrUndefined(info.defaultValue)) {
            this.defaultValue = info.defaultValue;
            this.checked = info.defaultValue;
        }
        if (!isNullOrUndefined(info.enabled)) {
            this.enabled = info.enabled;
        }
        if (!isNullOrUndefined(info.size)) {
            this.size = info.size;
        }
        if (!isNullOrUndefined(info.helpText)) {
            this.helpText = info.helpText;
        }
        if (!isNullOrUndefined(info.sizeType)) {
            this.sizeType = info.sizeType;
        }
    };
    /**
     * @private
     */
    CheckBoxFormField.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    return CheckBoxFormField;
}(FormField));
export { CheckBoxFormField };
/**
 * @private
 */
var DropDownFormField = /** @class */ (function (_super) {
    __extends(DropDownFormField, _super);
    function DropDownFormField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.dropdownItems = [];
        /**
         * @private
         */
        _this.selectedIndex = 0;
        return _this;
    }
    /**
     * @private
     */
    DropDownFormField.prototype.clone = function () {
        var dropDown = new DropDownFormField();
        dropDown.name = this.name;
        dropDown.enabled = this.enabled;
        dropDown.helpText = this.helpText;
        dropDown.statusText = this.statusText;
        dropDown.dropdownItems = this.dropdownItems.slice();
        dropDown.selectedIndex = this.selectedIndex;
        return dropDown;
    };
    /**
     * @private
     */
    DropDownFormField.prototype.getFormFieldInfo = function () {
        var dropDownFormField = {
            dropdownItems: this.dropdownItems.slice(),
            enabled: this.enabled,
            helpText: this.helpText,
            name: this.name
        };
        return dropDownFormField;
    };
    /**
     * @private
     */
    DropDownFormField.prototype.copyFieldInfo = function (info) {
        if (!isNullOrUndefined(info.dropdownItems)) {
            this.dropdownItems = info.dropdownItems;
        }
        if (!isNullOrUndefined(info.enabled)) {
            this.enabled = info.enabled;
        }
        if (!isNullOrUndefined(info.helpText)) {
            this.helpText = info.helpText;
        }
    };
    /**
     * @private
     */
    DropDownFormField.prototype.destroy = function () {
        this.dropdownItems = [];
        this.dropdownItems = undefined;
        _super.prototype.destroy.call(this);
    };
    return DropDownFormField;
}(FormField));
export { DropDownFormField };
/**
 * @private
 */
var TextElementBox = /** @class */ (function (_super) {
    __extends(TextElementBox, _super);
    function TextElementBox() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.baselineOffset = 0;
        /**
         * @private
         */
        _this.text = '';
        /**
         * @private
         */
        _this.trimEndWidth = 0;
        /**
         * @private
         */
        _this.ignoreOnceItems = [];
        /**
         * @private
         */
        _this.istextCombined = false;
        /**
         * @private
         */
        _this.scriptType = FontScriptType.English;
        /**
         * @private
         */
        _this.renderedFontFamily = undefined;
        _this.errorCollection = [];
        return _this;
    }
    /**
     * @private
     */
    TextElementBox.prototype.getLength = function () {
        return this.text ? this.text.length : 0;
    };
    /**
     * @private
     */
    TextElementBox.prototype.clone = function () {
        var textEle = new TextElementBox();
        textEle.characterFormat.copyFormat(this.characterFormat);
        textEle.text = this.text;
        if (this.margin) {
            textEle.margin = this.margin.clone();
        }
        textEle.baselineOffset = this.baselineOffset;
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revision = this.revisions[i];
                    textEle.revisions.push(revision.clone());
                }
            }
        }
        else {
            // Copy the revisions when cloning the header row.
            if (this.paragraph && this.paragraph.isInsideTable && this.paragraph.containerWidget instanceof TableCellWidget && this.paragraph.containerWidget.ownerRow.rowFormat.isHeader) {
                textEle.revisions = this.revisions;
            }
            else {
                if (this.revisions.length > 0) {
                    textEle.removedIds = Revision.cloneRevisions(this.revisions);
                }
                else {
                    textEle.removedIds = this.removedIds.slice();
                }
            }
        }
        textEle.width = this.width;
        textEle.height = this.height;
        if (this.contentControlProperties) {
            textEle.contentControlProperties = this.contentControlProperties;
        }
        return textEle;
    };
    /**
     * @private
     */
    TextElementBox.prototype.destroy = function () {
        this.text = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * @private
     */
    TextElementBox.prototype.componentDestroy = function () {
        this.text = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return TextElementBox;
}(ElementBox));
export { TextElementBox };
/**
 * @private
 */
var Footnote = /** @class */ (function () {
    function Footnote() {
        this.separator = [];
        this.continuationNotice = [];
        this.continuationSeparator = [];
    }
    /**
     * @private
     */
    Footnote.prototype.clear = function () {
        if (this.separator) {
            for (var i = 0; i < this.separator.length; i++) {
                var bodyWidget = this.separator[i];
                bodyWidget.destroy();
            }
            this.separator = [];
        }
        if (this.continuationSeparator) {
            for (var i = 0; i < this.continuationSeparator.length; i++) {
                var bodyWidget = this.continuationSeparator[i];
                bodyWidget.destroy();
            }
            this.continuationSeparator = [];
        }
        if (this.continuationNotice) {
            for (var i = 0; i < this.continuationNotice.length; i++) {
                var bodyWidget = this.continuationNotice[i];
                bodyWidget.destroy();
            }
            this.continuationNotice = [];
        }
    };
    Footnote.prototype.destroy = function () {
        this.separator = [];
        this.continuationSeparator = [];
        this.continuationNotice = [];
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    Footnote.prototype.componentDestroy = function () {
        if (this.separator) {
            for (var i = 0; i < this.separator.length; i++) {
                var bodyWidget = this.separator[i];
                bodyWidget.componentDestroy();
            }
            this.separator = [];
        }
        this.separator = undefined;
        if (this.continuationSeparator) {
            for (var i = 0; i < this.continuationSeparator.length; i++) {
                var bodyWidget = this.continuationSeparator[i];
                bodyWidget.componentDestroy();
            }
            this.continuationSeparator = [];
        }
        this.continuationSeparator = undefined;
        if (this.continuationNotice) {
            for (var i = 0; i < this.continuationNotice.length; i++) {
                var bodyWidget = this.continuationNotice[i];
                bodyWidget.componentDestroy();
            }
            this.continuationNotice = [];
        }
        this.continuationNotice = undefined;
    };
    return Footnote;
}());
export { Footnote };
/**
 * @private
 */
var FootnoteElementBox = /** @class */ (function (_super) {
    __extends(FootnoteElementBox, _super);
    function FootnoteElementBox() {
        var _this = _super.call(this) || this;
        _this.isLayout = false;
        _this.bodyWidget = new BodyWidget();
        _this.bodyWidget.footNoteReference = _this;
        return _this;
    }
    FootnoteElementBox.prototype.clone = function () {
        var span = new FootnoteElementBox();
        span.text = this.text;
        span.characterFormat.copyFormat(this.characterFormat);
        span.height = this.height;
        span.footnoteType = this.footnoteType;
        span.width = this.width;
        span.symbolCode = this.symbolCode;
        // span.bodyWidget.childWidgets = this.bodyWidget.childWidgets;
        for (var i = 0; i < this.bodyWidget.childWidgets.length; i++) {
            var element = this.bodyWidget.childWidgets[i];
            if (element instanceof ParagraphWidget) {
                element = this.bodyWidget.childWidgets[i].clone();
            }
            else if (element instanceof TableWidget) {
                element = this.bodyWidget.childWidgets[i].clone();
            }
            span.bodyWidget.childWidgets.push(element);
        }
        span.bodyWidget.page = this.bodyWidget.page;
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revision = this.revisions[i];
                    span.revisions.push(revision.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                span.removedIds = Revision.cloneRevisions(this.revisions);
            }
            else {
                span.removedIds = this.removedIds.slice();
            }
        }
        if (this.margin) {
            span.margin = this.margin.clone();
        }
        return span;
    };
    FootnoteElementBox.prototype.getLength = function () {
        return 1;
    };
    FootnoteElementBox.prototype.destroy = function () {
        this.symbolCode = '';
        this.symbolFontName = '';
        this.customMarker = '';
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    FootnoteElementBox.prototype.componentDestroy = function () {
        if (this.characterFormat) {
            this.characterFormat.destroy();
            this.characterFormat = undefined;
        }
        this.symbolCode = '';
        this.symbolFontName = '';
        this.customMarker = '';
        if (this.bodyWidget) {
            this.bodyWidget.componentDestroy();
        }
        this.bodyWidget = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return FootnoteElementBox;
}(TextElementBox));
export { FootnoteElementBox };
/**
 * @private
 */
var ErrorTextElementBox = /** @class */ (function (_super) {
    __extends(ErrorTextElementBox, _super);
    function ErrorTextElementBox() {
        var _this = _super.call(this) || this;
        _this.startIn = undefined;
        _this.endIn = undefined;
        return _this;
    }
    Object.defineProperty(ErrorTextElementBox.prototype, "start", {
        get: function () {
            return this.startIn;
        },
        set: function (value) {
            this.startIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ErrorTextElementBox.prototype, "end", {
        get: function () {
            return this.endIn;
        },
        set: function (value) {
            this.endIn = value;
        },
        enumerable: true,
        configurable: true
    });
    ErrorTextElementBox.prototype.destroy = function () {
        this.start = undefined;
        this.end = undefined;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    ErrorTextElementBox.prototype.componentDestroy = function () {
        if (this.startIn) {
            this.startIn.destroy();
        }
        this.startIn = undefined;
        if (this.endIn) {
            this.endIn.destroy();
        }
        this.endIn = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return ErrorTextElementBox;
}(TextElementBox));
export { ErrorTextElementBox };
/**
 * @private
 */
var FieldTextElementBox = /** @class */ (function (_super) {
    __extends(FieldTextElementBox, _super);
    function FieldTextElementBox() {
        var _this = _super.call(this) || this;
        _this.fieldText = '';
        return _this;
    }
    Object.defineProperty(FieldTextElementBox.prototype, "text", {
        get: function () {
            return this.fieldText;
        },
        set: function (value) {
            this.fieldText = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    FieldTextElementBox.prototype.clone = function () {
        var fieldSpan = new FieldTextElementBox();
        fieldSpan.characterFormat.copyFormat(this.characterFormat);
        fieldSpan.fieldBegin = this.fieldBegin;
        fieldSpan.text = this.text;
        if (this.margin) {
            fieldSpan.margin = this.margin.clone();
        }
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revisionChanges = this.revisions[i];
                    fieldSpan.revisions.push(revisionChanges.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                fieldSpan.removedIds = Revision.cloneRevisions(this.revisions);
            }
            else {
                fieldSpan.removedIds = this.removedIds.slice();
            }
        }
        fieldSpan.width = this.width;
        fieldSpan.height = this.height;
        return fieldSpan;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    FieldTextElementBox.prototype.componentDestroy = function () {
        this.fieldText = undefined;
        this.fieldBegin = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return FieldTextElementBox;
}(TextElementBox));
export { FieldTextElementBox };
/**
 * @private
 */
var TabElementBox = /** @class */ (function (_super) {
    __extends(TabElementBox, _super);
    function TabElementBox() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.tabText = '';
        /**
         * @private
         */
        _this.tabLeader = 'None';
        return _this;
    }
    /**
     * @private
     */
    TabElementBox.prototype.destroy = function () {
        this.tabText = undefined;
        this.tabLeader = undefined;
    };
    /**
     * @private
     */
    TabElementBox.prototype.componentDestroy = function () {
        this.tabText = undefined;
        this.tabLeader = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    /**
     * @private
     */
    TabElementBox.prototype.clone = function () {
        var tabSpan = new TabElementBox();
        tabSpan.characterFormat.copyFormat(this.characterFormat);
        tabSpan.tabText = this.tabText;
        tabSpan.tabLeader = this.tabLeader;
        tabSpan.text = this.text;
        if (this.margin) {
            tabSpan.margin = this.margin.clone();
        }
        tabSpan.width = this.width;
        tabSpan.height = this.height;
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revision = this.revisions[i];
                    tabSpan.revisions.push(revision.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                tabSpan.removedIds = Revision.cloneRevisions(this.revisions);
            }
            else {
                tabSpan.removedIds = this.removedIds.slice();
            }
        }
        return tabSpan;
    };
    return TabElementBox;
}(TextElementBox));
export { TabElementBox };
/**
 * @private
 */
var BookmarkElementBox = /** @class */ (function (_super) {
    __extends(BookmarkElementBox, _super);
    function BookmarkElementBox(type) {
        var _this = _super.call(this) || this;
        _this.bookmarkTypeIn = 0;
        _this.refereneceIn = undefined;
        _this.nameIn = '';
        _this.bookmarkTypeIn = type;
        return _this;
    }
    Object.defineProperty(BookmarkElementBox.prototype, "bookmarkType", {
        /**
         * @private
         */
        get: function () {
            return this.bookmarkTypeIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookmarkElementBox.prototype, "properties", {
        /**
         * @private
         */
        get: function () {
            return this.propertiesIn;
        },
        /**
         * @private
         */
        set: function (properties) {
            this.propertiesIn = properties;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookmarkElementBox.prototype, "name", {
        /**
         * @private
         */
        get: function () {
            return this.nameIn;
        },
        /**
         * @private
         */
        set: function (name) {
            this.nameIn = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BookmarkElementBox.prototype, "reference", {
        /**
         * @private
         */
        get: function () {
            return this.refereneceIn;
        },
        /**
         * @private
         */
        set: function (reference) {
            this.refereneceIn = reference;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    BookmarkElementBox.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    BookmarkElementBox.prototype.destroy = function () {
        this.name = undefined;
        this.reference = undefined;
        this.bookmarkTypeIn = undefined;
    };
    /**
     * @private
     */
    BookmarkElementBox.prototype.componentDestroy = function () {
        this.name = undefined;
        this.reference = undefined;
        this.bookmarkTypeIn = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    /**
     * Clones the bookmark element box.
     * @param element - book mark element
     */
    /**
     * @private
     */
    BookmarkElementBox.prototype.clone = function () {
        var span = new BookmarkElementBox(this.bookmarkType);
        span.name = this.name;
        span.reference = this.reference;
        span.properties = this.properties;
        if (this.margin) {
            span.margin = this.margin.clone();
        }
        if (this.revisions.length > 0) {
            span.removedIds = Revision.cloneRevisions(this.revisions);
        }
        else {
            span.removedIds = this.removedIds.slice();
        }
        span.width = this.width;
        span.height = this.height;
        if (this.contentControlProperties) {
            span.contentControlProperties = this.contentControlProperties;
        }
        return span;
    };
    return BookmarkElementBox;
}(ElementBox));
export { BookmarkElementBox };
/**
 * @private
 */
var ContentControl = /** @class */ (function (_super) {
    __extends(ContentControl, _super);
    function ContentControl(widgetType) {
        var _this = _super.call(this) || this;
        _this.contentControlWidgetType = widgetType;
        _this.contentControlProperties = new ContentControlProperties(widgetType);
        return _this;
    }
    /**
     * @private
     */
    ContentControl.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    ContentControl.prototype.clone = function () {
        var span = new ContentControl(this.contentControlWidgetType);
        span.characterFormat.copyFormat(this.characterFormat);
        span.contentControlProperties = this.contentControlProperties;
        span.contentControlWidgetType = this.contentControlWidgetType;
        if (this.margin) {
            span.margin = this.margin.clone();
        }
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revisionChange = this.revisions[i];
                    span.revisions.push(revisionChange.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                span.removedIds = Revision.cloneRevisions(this.revisions);
            }
            else {
                span.removedIds = this.removedIds.slice();
            }
        }
        span.type = this.type;
        span.width = this.width;
        span.height = this.height;
        span.reference = this.reference;
        return span;
    };
    /**
     * @private
     */
    ContentControl.prototype.destroy = function () {
        this.contentControlProperties = undefined;
        this.contentControlWidgetType = undefined;
        _super.prototype.destroy.call(this);
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    ContentControl.prototype.componentDestroy = function () {
        if (this.contentControlProperties) {
            this.contentControlProperties.destroy();
            this.contentControlProperties = undefined;
        }
        this.contentControlWidgetType = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return ContentControl;
}(ElementBox));
export { ContentControl };
/**
 * @private
 */
/**
 * @private
 */
var ContentControlProperties = /** @class */ (function () {
    function ContentControlProperties(widgetType) {
        /**
         * @private
         */
        this.contentControlListItems = [];
        this.contentControlWidgetType = widgetType;
        this.characterFormat = new WCharacterFormat();
    }
    /**
     * @private
     */
    ContentControlProperties.prototype.destroy = function () {
        if (this.characterFormat) {
            this.characterFormat.destroy();
            this.characterFormat = undefined;
        }
        if (this.xmlMapping) {
            this.xmlMapping.destroy();
            this.xmlMapping = undefined;
        }
        this.lockContentControl = undefined;
        this.lockContents = undefined;
        this.tag = undefined;
        this.color = undefined;
        this.title = undefined;
        this.appearance = undefined;
        this.type = undefined;
        this.hasPlaceHolderText = undefined;
        this.multiline = undefined;
        this.isTemporary = undefined;
        this.isChecked = undefined;
        this.dateCalendarType = undefined;
        this.dateStorageFormat = undefined;
        this.dateDisplayLocale = undefined;
        this.dateDisplayFormat = undefined;
    };
    /**
     * @private
     */
    ContentControlProperties.prototype.clone = function () {
        var span = new ContentControlProperties(this.contentControlWidgetType);
        span.lockContentControl = this.lockContentControl;
        span.lockContents = this.lockContents;
        span.tag = this.tag;
        span.color = this.color;
        span.title = this.title;
        span.appearance = this.appearance;
        span.type = this.type;
        span.hasPlaceHolderText = this.hasPlaceHolderText;
        span.multiline = this.multiline;
        span.isTemporary = this.isTemporary;
        span.isChecked = this.isChecked;
        span.dateCalendarType = this.dateCalendarType;
        span.dateStorageFormat = this.dateStorageFormat;
        span.dateDisplayLocale = this.dateDisplayLocale;
        span.dateDisplayFormat = this.dateDisplayFormat;
        if (this.contentControlListItems.length > 0) {
            for (var i = 0; i < this.contentControlListItems.length; i++) {
                span.contentControlListItems.push(this.contentControlListItems[i].clone());
            }
        }
        if (this.checkedState) {
            span.checkedState = this.checkedState.clone();
        }
        if (this.uncheckedState) {
            span.uncheckedState = this.uncheckedState.clone();
        }
        if (this.xmlMapping) {
            span.xmlMapping = this.xmlMapping.clone();
        }
        return span;
    };
    return ContentControlProperties;
}());
export { ContentControlProperties };
/**
 * @private
 */
var ContentControlListItems = /** @class */ (function () {
    function ContentControlListItems() {
    }
    /**
     * @private
     */
    ContentControlListItems.prototype.destroy = function () {
        this.displayText = undefined;
        this.value = undefined;
    };
    /**
     * @private
     */
    ContentControlListItems.prototype.clone = function () {
        var span = new ContentControlListItems();
        span.displayText = this.displayText;
        span.value = this.value;
        return span;
    };
    return ContentControlListItems;
}());
export { ContentControlListItems };
/**
 * @private
 */
var CheckBoxState = /** @class */ (function () {
    function CheckBoxState() {
    }
    /**
     * @private
     */
    CheckBoxState.prototype.destroy = function () {
        this.font = undefined;
        this.value = undefined;
    };
    /**
     * @private
     */
    CheckBoxState.prototype.clone = function () {
        var span = new CheckBoxState();
        span.font = this.font;
        span.value = this.value;
        return span;
    };
    return CheckBoxState;
}());
export { CheckBoxState };
/**
 * @private
 */
var XmlMapping = /** @class */ (function () {
    function XmlMapping() {
    }
    /**
     * @private
     */
    XmlMapping.prototype.destroy = function () {
        this.isMapped = undefined;
        this.isWordMl = undefined;
        this.prefixMapping = undefined;
        this.xPath = undefined;
        this.storeItemId = undefined;
        this.customXmlPart = undefined;
    };
    /**
     * @private
     */
    XmlMapping.prototype.clone = function () {
        var span = new XmlMapping();
        span.isMapped = this.isMapped;
        span.isWordMl = this.isWordMl;
        span.prefixMapping = this.prefixMapping;
        span.xPath = this.xPath;
        span.storeItemId = this.storeItemId;
        if (this.customXmlPart) {
            span.customXmlPart = this.customXmlPart.clone();
        }
        return span;
    };
    return XmlMapping;
}());
export { XmlMapping };
/**
 * @private
 */
var CustomXmlPart = /** @class */ (function () {
    function CustomXmlPart() {
    }
    /**
     * @private
     */
    CustomXmlPart.prototype.destroy = function () {
        this.id = undefined;
        this.xml = undefined;
    };
    /**
     * @private
     */
    CustomXmlPart.prototype.clone = function () {
        var span = new CustomXmlPart();
        span.id = this.id;
        span.xml = this.xml;
        return span;
    };
    return CustomXmlPart;
}());
export { CustomXmlPart };
/**
 * @private
 */
var ShapeCommon = /** @class */ (function (_super) {
    __extends(ShapeCommon, _super);
    function ShapeCommon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.name = '';
        /**
         * @private
         */
        _this.alternateText = '';
        /**
         * @private
         */
        _this.title = '';
        return _this;
    }
    /**
     *
     * @private
     */
    ShapeCommon.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    ShapeCommon.prototype.clone = function () {
        var shape = new ShapeElementBox();
        return shape;
    };
    return ShapeCommon;
}(ElementBox));
export { ShapeCommon };
/**
 * @private
 */
var ShapeBase = /** @class */ (function (_super) {
    __extends(ShapeBase, _super);
    function ShapeBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.verticalPosition = 0;
        /**
         * @private
         */
        _this.horizontalPosition = 0;
        /**
         * @private
         */
        _this.textWrappingStyle = 'Inline';
        /**
         * @private
         */
        _this.distanceBottom = 0;
        /**
         * @private
         */
        _this.distanceLeft = 0;
        /**
         * @private
         */
        _this.distanceRight = 0;
        /**
         * @private
         */
        _this.distanceTop = 0;
        return _this;
    }
    return ShapeBase;
}(ShapeCommon));
export { ShapeBase };
/**
 * @private
 */
var ShapeElementBox = /** @class */ (function (_super) {
    __extends(ShapeElementBox, _super);
    function ShapeElementBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     */
    ShapeElementBox.prototype.clone = function () {
        var shape = new ShapeElementBox();
        shape.characterFormat.copyFormat(this.characterFormat);
        shape.x = this.x;
        shape.y = this.y;
        shape.width = this.width;
        shape.height = this.height;
        shape.shapeId = this.shapeId;
        shape.name = this.name;
        shape.alternateText = this.alternateText;
        shape.title = this.title;
        shape.widthScale = this.widthScale;
        shape.heightScale = this.heightScale;
        shape.visible = this.visible;
        shape.verticalPosition = this.verticalPosition;
        shape.verticalAlignment = this.verticalAlignment;
        shape.verticalOrigin = this.verticalOrigin;
        shape.verticalRelativePercent = this.verticalRelativePercent;
        shape.horizontalPosition = this.horizontalPosition;
        shape.horizontalAlignment = this.horizontalAlignment;
        shape.horizontalOrigin = this.horizontalOrigin;
        shape.horizontalRelativePercent = this.horizontalRelativePercent;
        shape.heightRelativePercent = this.heightRelativePercent;
        shape.widthRelativePercent = this.widthRelativePercent;
        shape.zOrderPosition = this.zOrderPosition;
        shape.allowOverlap = this.allowOverlap;
        shape.textWrappingStyle = this.textWrappingStyle;
        shape.textWrappingType = this.textWrappingType;
        shape.distanceBottom = this.distanceBottom;
        shape.distanceLeft = this.distanceLeft;
        shape.distanceRight = this.distanceRight;
        shape.distanceTop = this.distanceTop;
        shape.editingPoints = this.editingPoints;
        shape.layoutInCell = this.layoutInCell;
        shape.lockAnchor = this.lockAnchor;
        shape.autoShapeType = this.autoShapeType;
        if (this.lineFormat) {
            shape.lineFormat = this.lineFormat.clone();
        }
        if (this.fillFormat) {
            shape.fillFormat = this.fillFormat.clone();
        }
        if (this.textFrame) {
            shape.textFrame = this.textFrame.clone();
            shape.textFrame.containerShape = shape;
        }
        if (this.margin) {
            shape.margin = this.margin.clone();
        }
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revision = this.revisions[i];
                    shape.revisions.push(revision.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                shape.removedIds = Revision.cloneRevisions(this.revisions);
            }
            else {
                shape.removedIds = this.removedIds.slice();
            }
        }
        return shape;
    };
    return ShapeElementBox;
}(ShapeBase));
export { ShapeElementBox };
/**
 * @private
 */
var TextFrame = /** @class */ (function (_super) {
    __extends(TextFrame, _super);
    function TextFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @private
         */
        _this.marginLeft = 0;
        /**
         * @private
         */
        _this.marginRight = 0;
        /**
         * @private
         */
        _this.marginTop = 0;
        /**
         * @private
         */
        _this.marginBottom = 0;
        return _this;
    }
    TextFrame.prototype.equals = function () {
        return false;
    };
    TextFrame.prototype.destroyInternal = function () {
        //return;
    };
    TextFrame.prototype.getHierarchicalIndex = function (index) {
        var line = this.containerShape.line;
        var offset = line.getOffset(this.containerShape, 0).toString();
        return line.getHierarchicalIndex(offset);
    };
    TextFrame.prototype.getTableCellWidget = function () {
        return undefined;
    };
    /**
     * @private
     */
    TextFrame.prototype.clone = function () {
        var textFrame = new TextFrame();
        textFrame.textVerticalAlignment = this.textVerticalAlignment;
        textFrame.marginBottom = this.marginBottom;
        textFrame.marginLeft = this.marginLeft;
        textFrame.marginRight = this.marginRight;
        textFrame.marginTop = this.marginTop;
        for (var i = 0; i < this.childWidgets.length; i++) {
            var block = this.childWidgets[i].clone();
            textFrame.childWidgets.push(block);
            block.index = i;
            block.containerWidget = textFrame;
        }
        return textFrame;
    };
    return TextFrame;
}(Widget));
export { TextFrame };
/**
 * @private
 */
var LineFormat = /** @class */ (function () {
    function LineFormat() {
    }
    /**
     * @private
     */
    LineFormat.prototype.clone = function () {
        var lineFormat = new LineFormat();
        lineFormat.lineFormatType = this.lineFormatType;
        lineFormat.color = this.color;
        lineFormat.weight = this.weight;
        lineFormat.dashStyle = this.dashStyle;
        lineFormat.line = this.line;
        return lineFormat;
    };
    return LineFormat;
}());
export { LineFormat };
/**
 * @private
 */
var FillFormat = /** @class */ (function () {
    function FillFormat() {
    }
    /**
     * @private
     */
    FillFormat.prototype.clone = function () {
        var fillFormat = new FillFormat();
        fillFormat.color = this.color;
        fillFormat.fill = this.fill;
        return fillFormat;
    };
    return FillFormat;
}());
export { FillFormat };
/**
 * @private
 */
var ImageElementBox = /** @class */ (function (_super) {
    __extends(ImageElementBox, _super);
    function ImageElementBox(isInlineImage) {
        var _this = _super.call(this) || this;
        _this.imageStr = '';
        _this.imgElement = undefined;
        _this.isInlineImageIn = true;
        _this.crop = false;
        /**
         * @private
         */
        _this.left = 0;
        /**
         * @private
         */
        _this.top = 0;
        /**
         * @private
         */
        _this.right = 0;
        /**
         * @private
         */
        _this.bottom = 0;
        /**
         * @private
         */
        _this.isMetaFile = false;
        /**
         * @private
         */
        _this.isCompressed = false;
        _this.isInlineImageIn = isInlineImage;
        return _this;
    }
    Object.defineProperty(ImageElementBox.prototype, "isCrop", {
        /**
         * @private
         */
        get: function () {
            return this.crop;
        },
        set: function (value) {
            this.crop = value;
            if (value) {
                var right = 0;
                var bottom = 0;
                if (this.left !== 0) {
                    this.cropX = (this.left * this.cropWidthScale) / 100;
                }
                else {
                    this.cropX = 0;
                }
                if (this.top !== 0) {
                    this.cropY = (this.top * this.cropHeightScale) / 100;
                }
                else {
                    this.cropY = 0;
                }
                if (this.right !== 0) {
                    right = (this.right * this.cropWidthScale) / 100;
                }
                if (this.bottom !== 0) {
                    bottom = (this.bottom * this.cropHeightScale) / 100;
                }
                this.cropWidth = (this.cropWidthScale - (this.cropX + right));
                this.cropHeight = (this.cropHeightScale - (this.cropY + bottom));
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageElementBox.prototype, "isInlineImage", {
        /**
         * @private
         */
        get: function () {
            return this.isInlineImageIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageElementBox.prototype, "element", {
        /**
         * @private
         */
        get: function () {
            if (isNullOrUndefined(this.imgElement)) {
                this.imgElement = document.createElement('img');
            }
            return this.imgElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageElementBox.prototype, "length", {
        /**
         * @private
         */
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageElementBox.prototype, "imageString", {
        /**
         * @private
         */
        get: function () {
            return this.imageStr;
        },
        /**
         * @private
         */
        set: function (value) {
            this.imageStr = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ImageElementBox.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    ImageElementBox.prototype.clone = function () {
        var image = new ImageElementBox(this.isInlineImage);
        image.characterFormat.copyFormat(this.characterFormat);
        image.imageString = this.imageString;
        image.element.src = this.element.src;
        image.isMetaFile = this.isMetaFile;
        image.isCompressed = this.isCompressed;
        image.metaFileImageString = this.metaFileImageString;
        image.width = this.width;
        image.height = this.height;
        image.top = this.top;
        image.left = this.left;
        image.bottom = this.bottom;
        image.right = this.right;
        image.cropHeightScale = this.cropHeightScale;
        image.cropWidthScale = this.cropWidthScale;
        image.cropX = this.cropX;
        image.cropY = this.cropY;
        image.isCrop = this.isCrop;
        image.x = this.x;
        image.y = this.y;
        if (this.margin) {
            image.margin = this.margin.clone();
        }
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revision = this.revisions[i];
                    image.revisions.push(revision.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                image.removedIds = Revision.cloneRevisions(this.revisions);
            }
            else {
                image.removedIds = this.removedIds.slice();
            }
        }
        image.name = this.name;
        image.alternateText = this.alternateText;
        image.title = this.title;
        image.visible = this.visible;
        image.widthScale = this.widthScale;
        image.heightScale = this.heightScale;
        image.verticalPosition = this.verticalPosition;
        image.verticalOrigin = this.verticalOrigin;
        image.verticalAlignment = this.verticalAlignment;
        image.horizontalPosition = this.horizontalPosition;
        image.horizontalOrigin = this.horizontalOrigin;
        image.horizontalAlignment = this.horizontalAlignment;
        image.allowOverlap = this.allowOverlap;
        image.textWrappingStyle = this.textWrappingStyle;
        image.textWrappingType = this.textWrappingType;
        image.layoutInCell = this.layoutInCell;
        image.zOrderPosition = this.zOrderPosition;
        return image;
    };
    /**
     * @private
     */
    ImageElementBox.prototype.destroy = function () {
        this.imgElement = undefined;
        this.imageString = undefined;
        this.isInlineImageIn = undefined;
        _super.prototype.destroy.call(this);
    };
    return ImageElementBox;
}(ShapeBase));
export { ImageElementBox };
/**
 * @private
 */
var ListTextElementBox = /** @class */ (function (_super) {
    __extends(ListTextElementBox, _super);
    function ListTextElementBox(listLevel, isListFollowCharacter) {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.baselineOffset = 0;
        /**
         * @private
         */
        _this.trimEndWidth = 0;
        /**
         * @private
         */
        _this.isFollowCharacter = false;
        _this.listLevel = listLevel;
        _this.isFollowCharacter = isListFollowCharacter;
        return _this;
    }
    /**
     * @private
     */
    ListTextElementBox.prototype.getLength = function () {
        return this.text ? this.text.length : 0;
    };
    /**
     * @private
     */
    ListTextElementBox.prototype.clone = function () {
        var list = new ListTextElementBox(this.listLevel, this.isFollowCharacter);
        list.text = this.text;
        list.baselineOffset = this.baselineOffset;
        if (this.margin) {
            list.margin = this.margin.clone();
        }
        list.width = this.width;
        list.height = this.height;
        return list;
    };
    /**
     * @private
     */
    ListTextElementBox.prototype.destroy = function () {
        this.text = undefined;
        _super.prototype.destroy.call(this);
    };
    return ListTextElementBox;
}(ElementBox));
export { ListTextElementBox };
/**
 * @private
 */
var EditRangeEndElementBox = /** @class */ (function (_super) {
    __extends(EditRangeEndElementBox, _super);
    function EditRangeEndElementBox() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.editRangeStart = undefined;
        _this.editRangeId = -1;
        return _this;
    }
    /**
     * @private
     */
    EditRangeEndElementBox.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    EditRangeEndElementBox.prototype.destroy = function () {
        this.editRangeStart = undefined;
    };
    /**
     * @private
     */
    EditRangeEndElementBox.prototype.clone = function () {
        var end = new EditRangeEndElementBox();
        if (this.editRangeStart) {
            this.editRangeStart.editRangeEnd = end;
        }
        end.editRangeStart = this.editRangeStart;
        end.editRangeId = this.editRangeId;
        return end;
    };
    return EditRangeEndElementBox;
}(ElementBox));
export { EditRangeEndElementBox };
/**
 * @private
 */
var EditRangeStartElementBox = /** @class */ (function (_super) {
    __extends(EditRangeStartElementBox, _super);
    function EditRangeStartElementBox() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.columnFirst = -1;
        /**
         * @private
         */
        _this.columnLast = -1;
        /**
         * @private
         */
        _this.user = '';
        /**
         * @private
         */
        _this.group = '';
        _this.editRangeId = -1;
        return _this;
    }
    /**
     * @private
     */
    EditRangeStartElementBox.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    EditRangeStartElementBox.prototype.renderLockMark = function (currentUser, locale) {
        if (isNullOrUndefined(this.editRangeMark)) {
            var user = currentUser === this.user ? 'you' : this.user;
            this.editRangeMark = document.createElement('div');
            this.editRangeMark.style.display = 'none';
            this.editRangeMark.classList.add('e-de-lock-mark');
            var span = document.createElement('span');
            span.className = 'e-icons e-de-ctnr-lock';
            this.editRangeMark.appendChild(span);
            this.editRangeMark.title = locale.getConstant('This region is locked by') + ' ' + user;
        }
        if (this.line && isNullOrUndefined(this.editRangeMark.parentElement)) {
            var documentHelper = this.line.paragraph.bodyWidget.page.documentHelper;
            documentHelper.pageContainer.appendChild(this.editRangeMark);
        }
    };
    /**
     * @private
     */
    EditRangeStartElementBox.prototype.removeEditRangeMark = function () {
        if (this.editRangeMark) {
            this.editRangeMark.parentElement.removeChild(this.editRangeMark);
            this.editRangeMark = undefined;
        }
    };
    /**
     * @private
     */
    EditRangeStartElementBox.prototype.destroy = function () {
        this.user = undefined;
        this.columnFirst = undefined;
        this.columnLast = undefined;
    };
    /**
     * @private
     */
    EditRangeStartElementBox.prototype.clone = function () {
        var start = new EditRangeStartElementBox();
        start.columnFirst = this.columnFirst;
        start.columnLast = this.columnLast;
        start.user = this.user;
        start.group = this.group;
        if (this.editRangeEnd) {
            this.editRangeEnd.editRangeStart = start;
        }
        start.editRangeEnd = this.editRangeEnd;
        start.editRangeId = this.editRangeId;
        return start;
    };
    return EditRangeStartElementBox;
}(ElementBox));
export { EditRangeStartElementBox };
/**
 * @private
 */
var ChartElementBox = /** @class */ (function (_super) {
    __extends(ChartElementBox, _super);
    /**
     * @private
     */
    function ChartElementBox() {
        var _this = _super.call(this) || this;
        /**
         * @private
         */
        _this.chartTitle = '';
        /**
         * @private
         */
        _this.chartType = '';
        /**
         * @private
         */
        _this.chartElement = undefined;
        /**
         * @private
         */
        _this.chartCategory = [];
        /**
         * @private
         */
        _this.chartSeries = [];
        _this.chartArea = new ChartArea();
        _this.chartPlotArea = new ChartArea();
        _this.chartTitleArea = new ChartTitleArea();
        _this.chartLegend = new ChartLegend();
        _this.chartPrimaryCategoryAxis = new ChartCategoryAxis();
        _this.chartPrimaryValueAxis = new ChartCategoryAxis();
        _this.chartDataTable = new ChartDataTable();
        return _this;
    }
    /**
     * @private
     */
    ChartElementBox.prototype.getLength = function () {
        return 1;
    };
    Object.defineProperty(ChartElementBox.prototype, "title", {
        /**
         * @private
         */
        get: function () {
            return this.chartTitle;
        },
        /**
         * @private
         */
        set: function (value) {
            this.chartTitle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartElementBox.prototype, "type", {
        /**
         * @private
         */
        get: function () {
            return this.chartType;
        },
        /**
         * @private
         */
        set: function (value) {
            this.chartType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartElementBox.prototype, "chartGapWidth", {
        /**
         * @private
         */
        get: function () {
            return this.gapWidth;
        },
        /**
         * @private
         */
        set: function (value) {
            this.gapWidth = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartElementBox.prototype, "chartOverlap", {
        /**
         * @private
         */
        get: function () {
            return this.overlap;
        },
        /**
         * @private
         */
        set: function (value) {
            this.overlap = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartElementBox.prototype, "targetElement", {
        /**
         * @private
         */
        get: function () {
            if (isNullOrUndefined(this.div)) {
                this.div = createElement('div');
            }
            return this.div;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartElementBox.prototype, "officeChart", {
        /**
         * @private
         */
        get: function () {
            return this.officeChartInternal;
        },
        /**
         * @private
         */
        set: function (value) {
            if (value) {
                this.officeChartInternal = value;
                this.officeChartInternal.chart.loaded = this.onChartLoaded.bind(this);
            }
        },
        enumerable: true,
        configurable: true
    });
    ChartElementBox.prototype.onChartLoaded = function () {
        var _this = this;
        this.officeChart.convertChartToImage(this.officeChart.chart, this.width, this.height).then(function (dataURL) {
            _this.imageString = dataURL;
            _this.element.src = dataURL;
        });
    };
    /**
     * @private
     */
    ChartElementBox.prototype.clone = function () {
        var chart = new ChartElementBox();
        chart.chartTitle = this.chartTitle;
        chart.chartType = this.chartType;
        chart.height = this.height;
        chart.width = this.width;
        chart.gapWidth = this.gapWidth;
        chart.overlap = this.overlap;
        for (var i = 0; i < this.chartCategory.length; i++) {
            var chartCategory = this.chartCategory[i].clone();
            chart.chartCategory.push(chartCategory);
        }
        for (var i = 0; i < this.chartSeries.length; i++) {
            var series = this.chartSeries[i].clone();
            chart.chartSeries.push(series);
        }
        chart.chartArea = this.chartArea.clone();
        chart.chartPlotArea = this.chartPlotArea.clone();
        chart.chartLegend = this.chartLegend.clone();
        chart.chartTitleArea = this.chartTitleArea.clone();
        chart.chartPrimaryCategoryAxis = this.chartPrimaryCategoryAxis.clone();
        chart.chartPrimaryValueAxis = this.chartPrimaryValueAxis.clone();
        chart.chartDataTable = this.chartDataTable.clone();
        return chart;
    };
    /**
     * @private
     */
    ChartElementBox.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.officeChartInternal) {
            this.officeChartInternal.chart.loaded = undefined;
            this.officeChartInternal.destroy();
            this.officeChartInternal = undefined;
        }
        if (this.div) {
            this.div = undefined;
        }
        this.chartTitle = undefined;
        this.chartType = undefined;
        this.chartArea = undefined;
        this.chartPlotArea = undefined;
        this.chartCategory = [];
        this.chartSeries = [];
        this.chartTitleArea = undefined;
        this.chartLegend = undefined;
        this.chartPrimaryCategoryAxis = undefined;
        this.chartPrimaryValueAxis = undefined;
        this.chartDataTable = undefined;
        this.chartElement = undefined;
    };
    return ChartElementBox;
}(ImageElementBox));
export { ChartElementBox };
/**
 * @private
 */
var ChartArea = /** @class */ (function () {
    function ChartArea() {
    }
    Object.defineProperty(ChartArea.prototype, "chartForeColor", {
        /**
         * @private
         */
        get: function () {
            return this.foreColor;
        },
        /**
         * @private
         */
        set: function (value) {
            this.foreColor = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartArea.prototype.clone = function () {
        var chart = new ChartArea();
        chart.foreColor = this.foreColor;
        return chart;
    };
    /**
     * @private
     */
    ChartArea.prototype.destroy = function () {
        this.foreColor = undefined;
    };
    return ChartArea;
}());
export { ChartArea };
/**
 * @private
 */
var ChartCategory = /** @class */ (function () {
    function ChartCategory() {
        /**
         * @private
         */
        this.categoryXName = '';
        /**
         * @private
         */
        this.chartData = [];
    }
    Object.defineProperty(ChartCategory.prototype, "xName", {
        /**
         * @private
         */
        get: function () {
            return this.categoryXName;
        },
        /**
         * @private
         */
        set: function (value) {
            this.categoryXName = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartCategory.prototype.clone = function () {
        var chart = new ChartCategory();
        chart.categoryXName = this.categoryXName;
        for (var i = 0; i < this.chartData.length; i++) {
            var chartData = this.chartData[i].clone();
            chart.chartData.push(chartData);
        }
        return chart;
    };
    /**
     * @private
     */
    ChartCategory.prototype.destroy = function () {
        this.categoryXName = undefined;
        this.chartData = [];
    };
    return ChartCategory;
}());
export { ChartCategory };
/**
 * @private
 */
var ChartData = /** @class */ (function () {
    function ChartData() {
    }
    Object.defineProperty(ChartData.prototype, "yAxisValue", {
        /**
         * @private
         */
        get: function () {
            return this.yValue;
        },
        /**
         * @private
         */
        set: function (value) {
            this.yValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "xAxisValue", {
        /**
         * @private
         */
        get: function () {
            return this.xValue;
        },
        /**
         * @private
         */
        set: function (value) {
            this.xValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartData.prototype, "bubbleSize", {
        /**
         * @private
         */
        get: function () {
            return this.size;
        },
        /**
         * @private
         */
        set: function (value) {
            this.size = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartData.prototype.clone = function () {
        var chart = new ChartData();
        chart.yValue = this.yValue;
        chart.xValue = this.xValue;
        chart.size = this.size;
        return chart;
    };
    /**
     * @private
     */
    ChartData.prototype.destroy = function () {
        this.xValue = undefined;
        this.yValue = undefined;
        this.size = undefined;
    };
    return ChartData;
}());
export { ChartData };
/**
 * @private
 */
var ChartLegend = /** @class */ (function () {
    /**
     * @private
     */
    function ChartLegend() {
        this.chartTitleArea = new ChartTitleArea();
    }
    Object.defineProperty(ChartLegend.prototype, "chartLegendPostion", {
        /**
         * @private
         */
        get: function () {
            return this.legendPostion;
        },
        /**
         * @private
         */
        set: function (value) {
            this.legendPostion = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartLegend.prototype.clone = function () {
        var chart = new ChartLegend();
        chart.legendPostion = this.legendPostion;
        chart.chartTitleArea = this.chartTitleArea.clone();
        return chart;
    };
    /**
     * @private
     */
    ChartLegend.prototype.destroy = function () {
        this.legendPostion = undefined;
        this.chartTitleArea = undefined;
    };
    return ChartLegend;
}());
export { ChartLegend };
/**
 * @private
 */
var ChartSeries = /** @class */ (function () {
    function ChartSeries() {
        /**
         * @private
         */
        this.chartDataFormat = [];
        /**
         * @private
         */
        this.trendLines = [];
        this.errorBar = new ChartErrorBar();
        this.dataLabels = new ChartDataLabels();
        this.seriesFormat = new ChartSeriesFormat();
    }
    Object.defineProperty(ChartSeries.prototype, "seriesName", {
        /**
         * @private
         */
        get: function () {
            return this.name;
        },
        /**
         * @private
         */
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "firstSliceAngle", {
        /**
         * @private
         */
        get: function () {
            return this.sliceAngle;
        },
        /**
         * @private
         */
        set: function (value) {
            this.sliceAngle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeries.prototype, "doughnutHoleSize", {
        /**
         * @private
         */
        get: function () {
            return this.holeSize;
        },
        /**
         * @private
         */
        set: function (value) {
            this.holeSize = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartSeries.prototype.clone = function () {
        var chart = new ChartSeries();
        chart.name = this.name;
        chart.sliceAngle = this.sliceAngle;
        chart.holeSize = this.holeSize;
        chart.errorBar = this.errorBar.clone();
        chart.dataLabels = this.dataLabels.clone();
        chart.seriesFormat = this.seriesFormat.clone();
        for (var i = 0; i < this.chartDataFormat.length; i++) {
            var format = (this.chartDataFormat[i].clone());
            chart.chartDataFormat.push(format);
        }
        for (var i = 0; i < this.trendLines.length; i++) {
            var trendLine = (this.trendLines[i].clone());
            chart.trendLines.push(trendLine);
        }
        return chart;
    };
    /**
     * @private
     */
    ChartSeries.prototype.destroy = function () {
        this.name = undefined;
        this.errorBar = undefined;
        this.trendLines = undefined;
        this.chartDataFormat = [];
    };
    return ChartSeries;
}());
export { ChartSeries };
/**
 * @private
 */
var ChartErrorBar = /** @class */ (function () {
    function ChartErrorBar() {
    }
    Object.defineProperty(ChartErrorBar.prototype, "errorType", {
        /**
         * @private
         */
        get: function () {
            return this.type;
        },
        /**
         * @private
         */
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartErrorBar.prototype, "errorDirection", {
        /**
         * @private
         */
        get: function () {
            return this.direction;
        },
        /**
         * @private
         */
        set: function (value) {
            this.direction = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartErrorBar.prototype, "errorEndStyle", {
        /**
         * @private
         */
        get: function () {
            return this.endStyle;
        },
        /**
         * @private
         */
        set: function (value) {
            this.endStyle = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartErrorBar.prototype, "numberValue", {
        get: function () {
            return this.errorValue;
        },
        /**
         * @private
         */
        set: function (value) {
            this.errorValue = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartErrorBar.prototype.clone = function () {
        var chart = new ChartErrorBar();
        chart.type = this.type;
        chart.errorDirection = this.errorDirection;
        chart.endStyle = this.endStyle;
        chart.errorValue = this.errorValue;
        return chart;
    };
    /**
     * @private
     */
    ChartErrorBar.prototype.destroy = function () {
        this.type = undefined;
        this.errorDirection = undefined;
        this.endStyle = undefined;
    };
    return ChartErrorBar;
}());
export { ChartErrorBar };
/**
 * @private
 */
var ChartSeriesFormat = /** @class */ (function () {
    function ChartSeriesFormat() {
    }
    Object.defineProperty(ChartSeriesFormat.prototype, "markerStyle", {
        /**
         * @private
         */
        get: function () {
            return this.style;
        },
        /**
         * @private
         */
        set: function (value) {
            this.style = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeriesFormat.prototype, "markerColor", {
        /**
         * @private
         */
        get: function () {
            return this.color;
        },
        /**
         * @private
         */
        set: function (value) {
            this.color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartSeriesFormat.prototype, "numberValue", {
        /**
         * @private
         */
        get: function () {
            return this.size;
        },
        /**
         * @private
         */
        set: function (value) {
            this.size = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartSeriesFormat.prototype.clone = function () {
        var chart = new ChartSeriesFormat();
        chart.style = this.style;
        chart.color = this.color;
        chart.size = this.size;
        return chart;
    };
    /**
     * @private
     */
    ChartSeriesFormat.prototype.destroy = function () {
        this.style = undefined;
        this.color = undefined;
        this.size = undefined;
    };
    return ChartSeriesFormat;
}());
export { ChartSeriesFormat };
/**
 * @private
 */
var ChartDataLabels = /** @class */ (function () {
    function ChartDataLabels() {
    }
    Object.defineProperty(ChartDataLabels.prototype, "labelPosition", {
        /**
         * @private
         */
        get: function () {
            return this.position;
        },
        /**
         * @private
         */
        set: function (value) {
            this.position = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "fontName", {
        /**
         * @private
         */
        get: function () {
            return this.name;
        },
        /**
         * @private
         */
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "fontColor", {
        /**
         * @private
         */
        get: function () {
            return this.color;
        },
        /**
         * @private
         */
        set: function (value) {
            this.color = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "fontSize", {
        /**
         * @private
         */
        get: function () {
            return this.size;
        },
        /**
         * @private
         */
        set: function (value) {
            this.size = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "isLegendKey", {
        /**
         * @private
         */
        get: function () {
            return this.isLegend;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isLegend = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "isBubbleSize", {
        /**
         * @private
         */
        get: function () {
            return this.isBubble;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isBubble = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "isCategoryName", {
        /**
         * @private
         */
        get: function () {
            return this.isCategory;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isCategory = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "isSeriesName", {
        /**
         * @private
         */
        get: function () {
            return this.isSeries;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isSeries = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "isValue", {
        /**
         * @private
         */
        get: function () {
            return this.isValueEnabled;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isValueEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "isPercentage", {
        /**
         * @private
         */
        get: function () {
            return this.isPercentageEnabled;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isPercentageEnabled = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataLabels.prototype, "isLeaderLines", {
        /**
         * @private
         */
        get: function () {
            return this.showLeaderLines;
        },
        /**
         * @private
         */
        set: function (value) {
            this.showLeaderLines = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartDataLabels.prototype.clone = function () {
        var chart = new ChartDataLabels();
        chart.position = this.position;
        chart.name = this.name;
        chart.color = this.color;
        chart.size = this.size;
        chart.isBubble = this.isBubble;
        chart.isLegend = this.isLegend;
        chart.isCategory = this.isCategory;
        chart.isSeries = this.isSeries;
        chart.isValueEnabled = this.isValueEnabled;
        chart.isPercentageEnabled = this.isPercentageEnabled;
        chart.showLeaderLines = this.showLeaderLines;
        return chart;
    };
    /**
     * @private
     */
    ChartDataLabels.prototype.destroy = function () {
        this.position = undefined;
    };
    return ChartDataLabels;
}());
export { ChartDataLabels };
/**
 * @private
 */
var ChartTrendLines = /** @class */ (function () {
    function ChartTrendLines() {
    }
    Object.defineProperty(ChartTrendLines.prototype, "trendLineType", {
        /**
         * @private
         */
        get: function () {
            return this.type;
        },
        /**
         * @private
         */
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTrendLines.prototype, "trendLineName", {
        /**
         * @private
         */
        get: function () {
            return this.name;
        },
        /**
         * @private
         */
        set: function (value) {
            this.name = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTrendLines.prototype, "interceptValue", {
        /**
         * @private
         */
        get: function () {
            return this.intercept;
        },
        /**
         * @private
         */
        set: function (value) {
            this.intercept = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTrendLines.prototype, "forwardValue", {
        /**
         * @private
         */
        get: function () {
            return this.forward;
        },
        /**
         * @private
         */
        set: function (value) {
            this.forward = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTrendLines.prototype, "backwardValue", {
        /**
         * @private
         */
        get: function () {
            return this.backward;
        },
        /**
         * @private
         */
        set: function (value) {
            this.backward = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTrendLines.prototype, "isDisplayRSquared", {
        /**
         * @private
         */
        get: function () {
            return this.displayRSquared;
        },
        /**
         * @private
         */
        set: function (value) {
            this.displayRSquared = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTrendLines.prototype, "isDisplayEquation", {
        /**
         * @private
         */
        get: function () {
            return this.displayEquation;
        },
        /**
         * @private
         */
        set: function (value) {
            this.displayEquation = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartTrendLines.prototype.clone = function () {
        var chart = new ChartTrendLines();
        chart.type = this.type;
        chart.name = this.name;
        chart.forward = this.forward;
        chart.backward = this.backward;
        chart.intercept = this.intercept;
        chart.displayEquation = this.displayEquation;
        chart.displayRSquared = this.displayRSquared;
        return chart;
    };
    /**
     * @private
     */
    ChartTrendLines.prototype.destroy = function () {
        this.type = undefined;
        this.name = undefined;
        this.forward = undefined;
        this.backward = undefined;
    };
    return ChartTrendLines;
}());
export { ChartTrendLines };
/**
 * @private
 */
var ChartTitleArea = /** @class */ (function () {
    /**
     * @private
     */
    function ChartTitleArea() {
        this.dataFormat = new ChartDataFormat();
        this.layout = new ChartLayout();
    }
    Object.defineProperty(ChartTitleArea.prototype, "chartfontName", {
        /**
         * @private
         */
        get: function () {
            return this.fontName;
        },
        /**
         * @private
         */
        set: function (value) {
            this.fontName = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartTitleArea.prototype, "chartFontSize", {
        /**
         * @private
         */
        get: function () {
            return this.fontSize;
        },
        /**
         * @private
         */
        set: function (value) {
            this.fontSize = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartTitleArea.prototype.clone = function () {
        var chart = new ChartTitleArea();
        chart.fontName = this.fontName;
        chart.fontSize = this.fontSize;
        chart.dataFormat = this.dataFormat.clone();
        chart.layout = this.layout.clone();
        return chart;
    };
    /**
     * @private
     */
    ChartTitleArea.prototype.destroy = function () {
        this.fontName = undefined;
        this.fontSize = undefined;
        this.dataFormat = undefined;
        this.layout = undefined;
    };
    return ChartTitleArea;
}());
export { ChartTitleArea };
/**
 * @private
 */
var ChartDataFormat = /** @class */ (function () {
    /**
     * @private
     */
    function ChartDataFormat() {
        this.fill = new ChartFill();
        this.line = new ChartFill();
    }
    /**
     * @private
     */
    ChartDataFormat.prototype.clone = function () {
        var chart = new ChartDataFormat();
        chart.fill = this.fill.clone();
        chart.line = this.line.clone();
        return chart;
    };
    /**
     * @private
     */
    ChartDataFormat.prototype.destroy = function () {
        this.fill = undefined;
        this.line = undefined;
    };
    return ChartDataFormat;
}());
export { ChartDataFormat };
/**
 * @private
 */
var ChartFill = /** @class */ (function () {
    function ChartFill() {
    }
    Object.defineProperty(ChartFill.prototype, "color", {
        /**
         * @private
         */
        get: function () {
            return this.fillColor;
        },
        /**
         * @private
         */
        set: function (value) {
            this.fillColor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartFill.prototype, "rgb", {
        /**
         * @private
         */
        get: function () {
            return this.fillRGB;
        },
        /**
         * @private
         */
        set: function (value) {
            this.fillRGB = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartFill.prototype.clone = function () {
        var chart = new ChartFill();
        chart.fillColor = this.fillColor;
        chart.fillRGB = this.fillRGB;
        return chart;
    };
    /**
     * @private
     */
    ChartFill.prototype.destroy = function () {
        this.fillColor = undefined;
        this.fillRGB = undefined;
    };
    return ChartFill;
}());
export { ChartFill };
/**
 * @private
 */
var ChartLayout = /** @class */ (function () {
    function ChartLayout() {
    }
    Object.defineProperty(ChartLayout.prototype, "chartLayoutLeft", {
        /**
         * @private
         */
        get: function () {
            return this.layoutX;
        },
        /**
         * @private
         */
        set: function (value) {
            this.layoutX = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartLayout.prototype, "chartLayoutTop", {
        /**
         * @private
         */
        get: function () {
            return this.layoutY;
        },
        /**
         * @private
         */
        set: function (value) {
            this.layoutY = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartLayout.prototype.clone = function () {
        var chart = new ChartLayout();
        chart.layoutX = this.layoutX;
        chart.layoutY = this.layoutY;
        return chart;
    };
    /**
     * @private
     */
    ChartLayout.prototype.destroy = function () {
        this.layoutX = undefined;
        this.layoutY = undefined;
    };
    return ChartLayout;
}());
export { ChartLayout };
/**
 * @private
 */
var ChartCategoryAxis = /** @class */ (function () {
    function ChartCategoryAxis() {
        this.chartTitleArea = new ChartTitleArea();
    }
    Object.defineProperty(ChartCategoryAxis.prototype, "majorTick", {
        /**
         * @private
         */
        get: function () {
            return this.majorTickMark;
        },
        /**
         * @private
         */
        set: function (value) {
            this.majorTickMark = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "minorTick", {
        /**
         * @private
         */
        get: function () {
            return this.minorTickMark;
        },
        /**
         * @private
         */
        set: function (value) {
            this.minorTickMark = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "tickPosition", {
        /**
         * @private
         */
        get: function () {
            return this.tickLabelPostion;
        },
        /**
         * @private
         */
        set: function (value) {
            this.tickLabelPostion = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "minorGridLines", {
        /**
         * @private
         */
        get: function () {
            return this.hasMinorGridLines;
        },
        /**
         * @private
         */
        set: function (value) {
            this.hasMinorGridLines = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "majorGridLines", {
        /**
         * @private
         */
        get: function () {
            return this.hasMajorGridLines;
        },
        /**
         * @private
         */
        set: function (value) {
            this.hasMajorGridLines = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "interval", {
        /**
         * @private
         */
        get: function () {
            return this.majorUnit;
        },
        /**
         * @private
         */
        set: function (value) {
            this.majorUnit = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "isAutoInternal", {
        /**
         * @private
         */
        get: function () {
            return this.isAutoMajor;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isAutoMajor = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "max", {
        /**
         * @private
         */
        get: function () {
            return this.maximumValue;
        },
        /**
         * @private
         */
        set: function (value) {
            this.maximumValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "min", {
        /**
         * @private
         */
        get: function () {
            return this.minimumValue;
        },
        /**
         * @private
         */
        set: function (value) {
            this.minimumValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "categoryAxisTitle", {
        /**
         * @private
         */
        get: function () {
            return this.title;
        },
        /**
         * @private
         */
        set: function (value) {
            this.title = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "categoryAxisType", {
        /**
         * @private
         */
        get: function () {
            return this.categoryType;
        },
        /**
         * @private
         */
        set: function (value) {
            this.categoryType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "categoryNumberFormat", {
        /**
         * @private
         */
        get: function () {
            return this.numberFormat;
        },
        /**
         * @private
         */
        set: function (value) {
            this.numberFormat = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "axisFontSize", {
        /**
         * @private
         */
        get: function () {
            return this.fontSize;
        },
        /**
         * @private
         */
        set: function (value) {
            this.fontSize = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartCategoryAxis.prototype, "axisFontName", {
        /**
         * @private
         */
        get: function () {
            return this.fontName;
        },
        /**
         * @private
         */
        set: function (value) {
            this.fontName = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartCategoryAxis.prototype.clone = function () {
        var chart = new ChartCategoryAxis();
        chart.title = this.title;
        chart.categoryType = this.categoryType;
        chart.numberFormat = this.numberFormat;
        chart.fontSize = this.fontSize;
        chart.fontName = this.fontName;
        chart.hasMajorGridLines = this.hasMajorGridLines;
        chart.hasMinorGridLines = this.hasMinorGridLines;
        chart.minimumValue = this.minimumValue;
        chart.maximumValue = this.maximumValue;
        chart.majorUnit = this.majorUnit;
        chart.isAutoMajor = this.isAutoMajor;
        chart.majorTickMark = this.majorTickMark;
        chart.minorTickMark = this.minorTickMark;
        chart.tickLabelPostion = this.tickLabelPostion;
        chart.chartTitleArea = this.chartTitleArea.clone();
        return chart;
    };
    /**
     * @private
     */
    ChartCategoryAxis.prototype.destroy = function () {
        this.title = undefined;
        this.categoryType = undefined;
        this.numberFormat = undefined;
        this.chartTitleArea = undefined;
        this.minimumValue = undefined;
        this.maximumValue = undefined;
        this.fontSize = undefined;
        this.fontName = undefined;
        this.majorUnit = undefined;
        this.majorTickMark = undefined;
        this.minorTickMark = undefined;
        this.tickLabelPostion = undefined;
    };
    return ChartCategoryAxis;
}());
export { ChartCategoryAxis };
/**
 * @private
 */
var ChartDataTable = /** @class */ (function () {
    function ChartDataTable() {
    }
    Object.defineProperty(ChartDataTable.prototype, "showSeriesKeys", {
        /**
         * @private
         */
        get: function () {
            return this.isSeriesKeys;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isSeriesKeys = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataTable.prototype, "hasHorzBorder", {
        /**
         * @private
         */
        get: function () {
            return this.isHorzBorder;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isHorzBorder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataTable.prototype, "hasVertBorder", {
        /**
         * @private
         */
        get: function () {
            return this.isVertBorder;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isVertBorder = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChartDataTable.prototype, "hasBorders", {
        /**
         * @private
         */
        get: function () {
            return this.isBorders;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isBorders = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    ChartDataTable.prototype.clone = function () {
        var chart = new ChartDataTable();
        chart.isSeriesKeys = this.isSeriesKeys;
        chart.isHorzBorder = this.isHorzBorder;
        chart.isVertBorder = this.isVertBorder;
        chart.isBorders = this.isBorders;
        return chart;
    };
    /**
     * @private
     */
    ChartDataTable.prototype.destroy = function () {
        this.isSeriesKeys = undefined;
        this.isHorzBorder = undefined;
        this.isVertBorder = undefined;
        this.isBorders = undefined;
    };
    return ChartDataTable;
}());
export { ChartDataTable };
/**
 * @private
 */
var CommentCharacterElementBox = /** @class */ (function (_super) {
    __extends(CommentCharacterElementBox, _super);
    function CommentCharacterElementBox(type) {
        var _this = _super.call(this) || this;
        _this.commentType = 0;
        _this.commentId = '';
        _this.commentType = type;
        return _this;
    }
    Object.defineProperty(CommentCharacterElementBox.prototype, "comment", {
        get: function () {
            return this.commentInternal;
        },
        set: function (value) {
            this.commentInternal = value;
        },
        enumerable: true,
        configurable: true
    });
    CommentCharacterElementBox.prototype.getLength = function () {
        return 1;
    };
    CommentCharacterElementBox.prototype.clone = function () {
        var comment = new CommentCharacterElementBox(this.commentType);
        comment.commentId = this.commentId;
        comment.commentType = this.commentType;
        if (!isNullOrUndefined(this.commentInternal)) {
            comment.commentInternal = this.commentInternal.clone();
        }
        return comment;
    };
    CommentCharacterElementBox.prototype.renderCommentMark = function (topPosition, leftPosition) {
        var documentHelper = this.line.paragraph.bodyWidget.page.documentHelper;
        var commentMarkDictionary = documentHelper.render.commentMarkDictionary;
        if (this.commentType === 0 && isNullOrUndefined(this.commentMark)) {
            this.commentMark = document.createElement('div');
            this.commentMark.style.display = 'none';
            this.commentMark.classList.add('e-de-cmt-mark');
            var span = document.createElement('span');
            span.classList.add('e-icons');
            span.classList.add('e-de-cmt-mark-icon');
            this.commentMark.appendChild(span);
        }
        if (this.line && isNullOrUndefined(this.commentMark.parentElement)) {
            documentHelper.pageContainer.appendChild(this.commentMark);
            this.commentMark.addEventListener('click', this.selectComment.bind(this));
        }
        var positionOverlap = false;
        var overlapKey;
        for (var index = 0; index < commentMarkDictionary.length; index++) {
            if (this.elementsOverlap(commentMarkDictionary.keys[index], topPosition, leftPosition)) {
                positionOverlap = true;
                overlapKey = commentMarkDictionary.keys[index];
                break;
            }
        }
        if (positionOverlap) {
            var ifNotPresent = true;
            for (var index = 0; index < commentMarkDictionary.get(overlapKey).length; index++) {
                if (commentMarkDictionary.get(overlapKey)[index] === this) {
                    ifNotPresent = false;
                    break;
                }
            }
            if (ifNotPresent) {
                commentMarkDictionary.get(overlapKey).push(this);
            }
        }
        else {
            commentMarkDictionary.add(this.commentMark, [this]);
        }
        for (var index = 0; index < commentMarkDictionary.length; index++) {
            var element = commentMarkDictionary.keys[index];
            if (commentMarkDictionary.get(element).length == 1) {
                if (commentMarkDictionary.get(element)[0].commentMark) {
                    if (commentMarkDictionary.get(element)[0].commentMark.firstElementChild.classList.contains('e-de-multi-cmt-mark')) {
                        classList(commentMarkDictionary.get(element)[0].commentMark.firstElementChild, ['e-de-cmt-mark-icon'], ['e-de-multi-cmt-mark']);
                    }
                    else if (commentMarkDictionary.get(element)[0].commentInternal.isResolved && commentMarkDictionary.get(element)[0].commentMark.firstElementChild.classList.contains('e-de-cmt-mark-icon')) {
                        classList(commentMarkDictionary.get(element)[0].commentMark.
                            firstElementChild, ['e-de-cmt-resolve-icon'], ['e-de-cmt-mark-icon']);
                    }
                    else if (!commentMarkDictionary.get(element)[0].commentInternal.isResolved && commentMarkDictionary.get(element)[0].commentMark.firstElementChild.classList.contains('e-de-cmt-resolve-icon')) {
                        classList(commentMarkDictionary.get(element)[0].commentMark.firstElementChild, ['e-de-cmt-mark-icon'], ['e-de-cmt-resolve-icon']);
                    }
                }
            }
            if (commentMarkDictionary.get(element).length > 1) {
                for (var z = 0; z < commentMarkDictionary.get(element).length; z++) {
                    var resolve = true;
                    for (var z_1 = 0; z_1 < commentMarkDictionary.get(element).length; z_1++) {
                        if (commentMarkDictionary.get(element)[z_1].commentInternal && !commentMarkDictionary.get(element)[z_1].commentInternal.isResolved) {
                            resolve = false;
                            break;
                        }
                    }
                    if (commentMarkDictionary.get(element)[z].commentMark) {
                        if (commentMarkDictionary.get(element)[z].commentMark.firstElementChild.classList.contains('e-de-cmt-mark-icon')) {
                            classList(commentMarkDictionary.get(element)[z].commentMark.firstElementChild, ['e-de-multi-cmt-mark'], ['e-de-cmt-mark-icon']);
                        }
                        else if (!resolve && commentMarkDictionary.get(element)[z].commentMark.firstElementChild.classList.contains('e-de-multi-cmt-resolve')) {
                            classList(commentMarkDictionary.get(element)[z].commentMark.firstElementChild, ['e-de-multi-cmt-mark'], ['e-de-multi-cmt-resolve']);
                        }
                        else if (resolve) {
                            classList(commentMarkDictionary.get(element)[z].commentMark.firstElementChild, ['e-de-multi-cmt-resolve'], ['e-de-multi-cmt-mark']);
                        }
                    }
                }
            }
        }
    };
    CommentCharacterElementBox.prototype.elementsOverlap = function (elementOne, top, left) {
        var width = elementOne.offsetWidth;
        var height = elementOne.offsetHeight;
        var elementOneTop = parseFloat(elementOne.style.top);
        var elementOneLeft = parseFloat(elementOne.style.left);
        var elementOneBottom = elementOneTop + height;
        var elementOneRight = elementOneLeft + width;
        var elementTwoTop = parseFloat(top);
        var elementTwoLeft = parseFloat(left);
        var elementTwoBottom = elementTwoTop + height;
        var elementTwoRight = elementTwoLeft + width;
        return !(elementOneTop > elementTwoBottom ||
            elementOneRight < elementTwoLeft ||
            elementOneBottom < elementTwoTop ||
            elementOneLeft > elementTwoRight);
    };
    CommentCharacterElementBox.prototype.selectComment = function () {
        var documentHelper = this.line.paragraph.bodyWidget.page.documentHelper;
        var commentMarkDictionary = documentHelper.render.commentMarkDictionary;
        var topPosition = this.commentMark.style.top;
        var leftPosition = this.commentMark.style.left;
        var currentIndex = 0;
        var navigationArray = [];
        for (var index = 0; index < commentMarkDictionary.keys.length; index++) {
            if (this.elementsOverlap(commentMarkDictionary.keys[index], topPosition, leftPosition)) {
                navigationArray = commentMarkDictionary.get(commentMarkDictionary.keys[index]);
                break;
            }
        }
        if (!documentHelper.owner.documentHelper.currentSelectedComment) {
            currentIndex = 0;
        }
        else {
            for (var index = 0; index < navigationArray.length; index++) {
                if (navigationArray[index].comment === documentHelper.owner.documentHelper.currentSelectedComment) {
                    currentIndex = index;
                    break;
                }
            }
            if (currentIndex < (navigationArray.length - 1)) {
                currentIndex += 1;
            }
            else {
                currentIndex = 0;
            }
        }
        if (documentHelper.owner) {
            if (!documentHelper.owner.commentReviewPane.commentPane.isEditMode) {
                documentHelper.selectComment(navigationArray[currentIndex].comment);
            }
            else {
                documentHelper.owner.showComments = true;
            }
        }
    };
    CommentCharacterElementBox.prototype.removeCommentMark = function () {
        if (this.commentMark && this.commentMark.parentElement) {
            this.commentMark.removeEventListener('click', this.selectComment.bind(this));
            this.commentMark.parentElement.removeChild(this.commentMark);
        }
    };
    CommentCharacterElementBox.prototype.destroy = function () {
        if (this.commentMark) {
            this.removeCommentMark();
        }
        this.commentMark = undefined;
        this.commentInternal = undefined;
        this.commentId = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return CommentCharacterElementBox;
}(ElementBox));
export { CommentCharacterElementBox };
/**
 * @private
 */
var CommentElementBox = /** @class */ (function (_super) {
    __extends(CommentElementBox, _super);
    function CommentElementBox(date) {
        var _this = _super.call(this, 0) || this;
        _this.authorIn = '';
        _this.initialIn = '';
        _this.done = false;
        _this.posted = false;
        _this.textIn = '';
        _this.isReply = false;
        _this.ownerComment = undefined;
        _this.mentionsIn = [];
        _this.createdDate = date;
        _this.replyComments = [];
        return _this;
    }
    Object.defineProperty(CommentElementBox.prototype, "commentStart", {
        get: function () {
            return this.commentStartIn;
        },
        set: function (value) {
            this.commentStartIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "commentEnd", {
        get: function () {
            return this.commentEndIn;
        },
        set: function (value) {
            this.commentEndIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "author", {
        get: function () {
            return this.authorIn;
        },
        set: function (value) {
            this.authorIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "initial", {
        get: function () {
            return this.initialIn;
        },
        set: function (value) {
            this.initialIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "isResolved", {
        get: function () {
            return this.done;
        },
        set: function (value) {
            this.done = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "date", {
        get: function () {
            return this.createdDate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "text", {
        get: function () {
            return this.textIn;
        },
        set: function (value) {
            this.textIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "mentions", {
        get: function () {
            return this.mentionsIn;
        },
        set: function (value) {
            this.mentionsIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentElementBox.prototype, "isPosted", {
        get: function () {
            return this.posted;
        },
        set: function (value) {
            this.posted = value;
        },
        enumerable: true,
        configurable: true
    });
    CommentElementBox.prototype.getLength = function () {
        return 1;
    };
    CommentElementBox.prototype.clone = function () {
        var comment = new CommentElementBox(this.date);
        comment.author = this.author;
        comment.initial = this.initial;
        comment.commentId = this.commentId;
        comment.replyComments = this.replyComments;
        comment.isResolved = this.isResolved;
        comment.text = this.text;
        return comment;
    };
    CommentElementBox.prototype.destroy = function () {
        if (this.replyComments && this.replyComments.length > 0) {
            for (var i = 0; i < this.replyComments.length; i++) {
                var replyComment = this.replyComments[i];
                replyComment.destroy();
            }
            this.replyComments = [];
        }
        this.replyComments = undefined;
        if (this.commentStartIn) {
            this.commentStartIn.destroy();
            this.commentStartIn = undefined;
        }
        if (this.commentEndIn) {
            this.commentEndIn.destroy();
            this.commentEndIn = undefined;
        }
        this.commentId = undefined;
        this.createdDate = undefined;
        this.initialIn = undefined;
        this.textIn = undefined;
        this.authorIn = undefined;
        this.ownerComment = undefined;
        _super.prototype.destroy.call(this);
    };
    return CommentElementBox;
}(CommentCharacterElementBox));
export { CommentElementBox };
/**
 * @private
 */
var Page = /** @class */ (function () {
    /**
     * Initialize the constructor of Page
     */
    function Page(documentHelper) {
        /**
         * Specifies the Bonding Rectangle
         * @private
         */
        this.boundingRectangle = new Rect(96, 96, 816, 1056);
        /**
         * @private
         */
        this.repeatHeaderRowTableWidget = false;
        /**
         * Specifies the bodyWidgets
         * @default []
         * @private
         */
        this.bodyWidgets = [];
        /**
         * @private
         */
        this.headerWidgetIn = undefined;
        /**
         * @private
         */
        this.footerWidgetIn = undefined;
        /**
         * @private
         */
        this.footnoteWidget = undefined;
        /**
         * @private
         */
        this.endnoteWidget = undefined;
        /**
         * @private
         */
        this.currentPageNum = 1;
        /**
         * @private
         */
        this.allowNextPageRendering = true;
        this.documentHelper = documentHelper;
        // let text: string = 'DocumentEditor';
    }
    Object.defineProperty(Page.prototype, "headerWidget", {
        /**
         * @private
         */
        get: function () {
            if (!isNullOrUndefined(this.headerWidgetIn)) {
                if (this.headerWidgetIn.parentHeaderFooter) {
                    return this.headerWidgetIn.parentHeaderFooter;
                }
            }
            return this.headerWidgetIn;
        },
        /**
         * @private
         */
        set: function (value) {
            this.headerWidgetIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "footerWidget", {
        /**
         * @private
         */
        get: function () {
            if (!isNullOrUndefined(this.footerWidgetIn)) {
                if (this.footerWidgetIn.parentHeaderFooter) {
                    return this.footerWidgetIn.parentHeaderFooter;
                }
            }
            return this.footerWidgetIn;
        },
        /**
         * @private
         */
        set: function (value) {
            this.footerWidgetIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "index", {
        /**
         * @private
         */
        get: function () {
            if (this.documentHelper) {
                return this.documentHelper.pages.indexOf(this);
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "previousPage", {
        /**
         * @private
         */
        get: function () {
            var index = this.index;
            if (index > 0) {
                return this.documentHelper.pages[index - 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "nextPage", {
        /**
         * @private
         */
        get: function () {
            var index = this.index;
            if (index < this.documentHelper.pages.length - 1) {
                return this.documentHelper.pages[index + 1];
            }
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "sectionIndex", {
        /**
         * @private
         */
        get: function () {
            if (this.bodyWidgets.length > 0) {
                return this.bodyWidgets[0].index;
            }
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Page.prototype, "viewer", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    Page.prototype.destroy = function () {
        if (this.headerWidget && this.headerWidget.page === this) {
            this.headerWidget.page = undefined;
        }
        if (this.footerWidget && this.footerWidget.page === this) {
            this.footerWidget.page = undefined;
        }
        if (this.headerWidgetIn && !isNullOrUndefined(this.headerWidgetIn.parentHeaderFooter)) {
            if (this.viewer && this.documentHelper.owner.editorModule) {
                this.documentHelper.owner.editorModule.removeFieldInWidget(this.headerWidgetIn);
                // Remove content control
                this.documentHelper.owner.editorModule.removeFieldInWidget(this.headerWidgetIn, false, true);
            }
            this.headerWidgetIn.destroy();
            this.headerWidget = undefined;
        }
        if (this.footerWidgetIn && !isNullOrUndefined(this.footerWidgetIn.parentHeaderFooter)) {
            if (this.viewer && this.documentHelper.owner.editorModule) {
                this.documentHelper.owner.editorModule.removeFieldInWidget(this.footerWidgetIn);
                // Remove content control
                this.documentHelper.owner.editorModule.removeFieldInWidget(this.footerWidgetIn, false, true);
            }
            this.footerWidgetIn.destroy();
            this.footerWidgetIn = undefined;
        }
        this.bodyWidgets = [];
        this.bodyWidgets = undefined;
        if (!isNullOrUndefined(this.documentHelper)) {
            if (!isNullOrUndefined(this.documentHelper.pages)) {
                this.documentHelper.removePage(this);
            }
        }
        this.documentHelper = undefined;
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    Page.prototype.componentDestroy = function () {
        if (this.headerWidgetIn) {
            this.headerWidgetIn.componentDestroy();
            this.headerWidgetIn = undefined;
        }
        if (this.footerWidgetIn) {
            this.footerWidgetIn.componentDestroy();
            this.footerWidgetIn = undefined;
        }
        if (this.bodyWidgets) {
            for (var i = 0; i < this.bodyWidgets.length; i++) {
                var bodyWidget = this.bodyWidgets[i];
                bodyWidget.componentDestroy();
            }
            this.bodyWidgets = [];
            this.bodyWidgets = undefined;
        }
        this.documentHelper = undefined;
    };
    return Page;
}());
export { Page };
/**
 * @private
 */
var WTableHolder = /** @class */ (function () {
    function WTableHolder() {
        this.tableColumns = [];
        /**
         * @private
         */
        this.tableWidth = 0;
    }
    Object.defineProperty(WTableHolder.prototype, "columns", {
        get: function () {
            return this.tableColumns;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     */
    WTableHolder.prototype.resetColumns = function () {
        for (var i = 0; i < this.tableColumns.length; i++) {
            this.tableColumns[i].destroy();
        }
        this.tableColumns = [];
    };
    /**
     * @private
     */
    WTableHolder.prototype.getPreviousSpannedCellWidth = function (previousColumnIndex, curColumnIndex) {
        var width = 0;
        for (var i = previousColumnIndex; i < curColumnIndex; i++) {
            width += this.tableColumns[i].preferredWidth;
        }
        return width;
    };
    /**
     * @private
     */
    WTableHolder.prototype.addColumns = function (currentColumnIndex, columnSpan, width, sizeInfo, offset, preferredWidthType) {
        for (var i = this.columns.length; i < columnSpan; i++) {
            this.columns.push(new WColumn());
        }
        var availableWidth = 0;
        for (var j = currentColumnIndex; j < columnSpan; j++) {
            availableWidth += this.columns[j].preferredWidth;
        }
        // If width to add is greater than preferred width, then preferred width will be increased.
        // In case of Grid span > 1, only last grid column width will be updated.
        var gridSpan = columnSpan - currentColumnIndex;
        if (!(gridSpan > 1) && availableWidth < width) {
            this.columns[columnSpan - 1].preferredWidth += (width - availableWidth);
        }
        if (sizeInfo.minimumWordWidth > this.columns[columnSpan - 1].minimumWordWidth) {
            this.columns[columnSpan - 1].minimumWordWidth = sizeInfo.minimumWordWidth;
        }
        if (sizeInfo.maximumWordWidth > this.columns[columnSpan - 1].maximumWordWidth) {
            this.columns[columnSpan - 1].maximumWordWidth = sizeInfo.maximumWordWidth;
        }
        if (sizeInfo.minimumWidth > this.columns[columnSpan - 1].minimumWidth) {
            this.columns[columnSpan - 1].minimumWidth = sizeInfo.minimumWidth;
        }
        if (offset > this.columns[columnSpan - 1].endOffset) {
            this.columns[columnSpan - 1].endOffset = offset;
        }
        this.columns[columnSpan - 1].widthType = preferredWidthType;
    };
    /**
     * @private
     */
    WTableHolder.prototype.getTotalWidth = function (type) {
        var width = 0;
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            width += type === 0 ? column.preferredWidth :
                type === 1 ? column.minimumWordWidth :
                    type === 2 ? column.maximumWordWidth : column.minimumWidth;
        }
        return width;
    };
    /**
     * @private
     */
    WTableHolder.prototype.isFitColumns = function (containerWidth, preferredTableWidth, isAutoWidth) {
        // Gets total preferred width.
        var totalColumnWidth = this.getTotalWidth(0);
        // If auto table width, based on total column widths, minimum value will be updated.
        if (isAutoWidth) {
            this.tableWidth = preferredTableWidth > totalColumnWidth ? totalColumnWidth : preferredTableWidth;
        }
        else {
            this.tableWidth = preferredTableWidth;
        }
        // If total columns width doesn't match table width, then all grid column widths will be updated by even factor.
        // If totalColumnWidth < TableWidth, all grid columns are enlarged. Otherwise shrinked.
        if (totalColumnWidth !== this.tableWidth) {
            var factor = this.tableWidth / totalColumnWidth;
            factor = isNaN(factor) || factor === Infinity ? 1 : factor;
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                //column.PreferredWidth = factor * column.PreferredWidth;
                if (factor * column.preferredWidth < column.minWidth) {
                    return false;
                }
            }
            return true;
        }
        else {
            return true;
        }
    };
    /**
     * @private
     */
    WTableHolder.prototype.isAllColumnHasPointWidthType = function () {
        var isPointWidthType = true;
        for (var i = 0; i < this.columns.length; i++) {
            if (this.columns[i].widthType != 'Point') {
                isPointWidthType = false;
            }
        }
        return isPointWidthType;
    };
    /**
     * @private
     */
    WTableHolder.prototype.autoFitColumn = function (containerWidth, preferredTableWidth, isAuto, isNestedTable, isAutoFit, hasSpannedCells, indent, pageContainerWidth, tablePreferredWidthType) {
        // Cell's preferred width should be considered until the table width fits to the container width.
        var maxTotal = 0;
        var minTotal = 0;
        // For preferred width set as 0 pixels (not auto), then minimum word width only need to be considered.
        // But currently there is no way to find any one of cell in particular column has 0 px preferred width set.
        // If all columns are set as 0 pixels, then this will work.
        var remainingWidthTotal = 0;
        var isAllColumnPointWidth = this.columns.every(function (column) { return column.widthType === 'Point'; });
        var minWidthExceedCellWidth = 0;
        var columnIndexCollection = [];
        var totalColumnsPreferredWidth = this.getTotalWidth(0);
        var isTableHasPointWidth = !isAuto && tablePreferredWidthType === "Point" && isAllColumnPointWidth && !hasSpannedCells && HelperMethods.round(preferredTableWidth, 2) < HelperMethods.round(totalColumnsPreferredWidth, 2);
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            // If preferred width of column is less than column minimum width and also column is empty, considered column preferred width
            if (column.minimumWordWidth === 0 && column.maximumWordWidth === 0 && column.minWidth === 0) {
                column.minimumWordWidth = column.preferredWidth;
                column.maximumWordWidth = column.preferredWidth;
                column.minWidth = column.preferredWidth;
            }
            if (isTableHasPointWidth) {
                this.columns[i].preferredWidth = (this.columns[i].preferredWidth / totalColumnsPreferredWidth) * preferredTableWidth;
            }
            var difference = 0;
            maxTotal += column.preferredWidth > column.maximumWordWidth ? column.preferredWidth : column.maximumWordWidth;
            minTotal += column.preferredWidth > column.minimumWordWidth ? column.preferredWidth : column.minimumWordWidth;
            var preferred = column.preferredWidth === 0 ? column.minimumWordWidth : column.preferredWidth > column.minimumWordWidth ? column.preferredWidth : column.minimumWordWidth;
            difference = column.maximumWordWidth - preferred;
            remainingWidthTotal += difference > 0 ? difference : 0;
            if (column.preferredWidth < column.minimumWordWidth) {
                minWidthExceedCellWidth += column.minimumWordWidth - column.preferredWidth;
            }
            else {
                columnIndexCollection.push(i);
            }
        }
        // Try to fit maximum word width to match preferredTableWidth.
        if (maxTotal <= preferredTableWidth) {
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                if (column.widthType === 'Point') {
                    if (column.preferredWidth < column.minimumWordWidth) {
                        column.preferredWidth = column.minimumWordWidth;
                    }
                    continue;
                }
                if (column.preferredWidth < column.maximumWordWidth) {
                    // if (isNestedTable) {
                    //     column.preferredWidth = column.minimumWidth + column.minimumWordWidth;
                    // } else {
                    column.preferredWidth = column.maximumWordWidth;
                    //}
                }
            }
            // If the width is defined for table(cells undefined) then fit the columns to preferred table width using FitColumns.
            if (!isAuto) {
                this.fitColumns(containerWidth, preferredTableWidth, isAuto, isAutoFit);
            }
        }
        else {
            var totalPreferredWidth = this.getTotalWidth(0);
            if (isAllColumnPointWidth && !hasSpannedCells) {
                if (minTotal > containerWidth) {
                    if (containerWidth > totalPreferredWidth) {
                        minWidthExceedCellWidth -= (containerWidth - (totalPreferredWidth));
                    }
                    if (columnIndexCollection.length > 0 && minWidthExceedCellWidth > 0) {
                        var averageWidth = minWidthExceedCellWidth / this.columns.length;
                        for (var i = 0; i < this.columns.length; i++) {
                            var column = this.columns[i];
                            if (columnIndexCollection.indexOf(i) === -1) {
                                // Bug 891720: If minimum word width is greater than total preferred width, then set preferred width to resolve the layout issue.
                                if (totalPreferredWidth > column.minimumWordWidth) {
                                    column.preferredWidth = column.minimumWordWidth;
                                }
                            }
                            else {
                                column.preferredWidth = (column.preferredWidth - averageWidth);
                                // Bug 890447: If the preferred width is less than minimum word width, then set minimum word width as preferred width.
                                if (column.preferredWidth < column.minimumWordWidth) {
                                    column.preferredWidth = column.minimumWordWidth;
                                }
                            }
                        }
                        totalPreferredWidth = this.getTotalWidth(0);
                    }
                }
            }
            // If the table preferred table width is set, then check its greater than total minimum word width. 
            // If yes then set table preferred table width as container width. Else, check whether the total minimum word width is less than container width.
            // If yes, then set total minimum word width as container width. Else, set the container width to container width.
            if (!isAuto) {
                //let totalMinimumWordWidth: number = this.getTotalWidth(1);
                //if (preferredTableWidth > totalMinimumWordWidth && totalMinimumWordWidth < containerWidth) {
                var considerMinAsTableWidth = preferredTableWidth < minTotal && minTotal + (isNullOrUndefined(indent) ? 0 : indent) < containerWidth;
                if (isTableHasPointWidth && considerMinAsTableWidth) {
                    if (minTotal > preferredTableWidth && minWidthExceedCellWidth > 0) {
                        if (preferredTableWidth > totalPreferredWidth) {
                            minWidthExceedCellWidth -= (preferredTableWidth - totalPreferredWidth);
                        }
                        var averageWidth = minWidthExceedCellWidth / columnIndexCollection.length;
                        for (var i = 0; i < this.columns.length; i++) {
                            var column = this.columns[i];
                            if (columnIndexCollection.indexOf(i) === -1) {
                                column.preferredWidth = column.minimumWordWidth;
                            }
                            else {
                                column.preferredWidth = (column.preferredWidth - averageWidth);
                            }
                        }
                        totalPreferredWidth = this.getTotalWidth(0);
                    }
                    return;
                }
                this.fitColumns(containerWidth, considerMinAsTableWidth ? minTotal : preferredTableWidth, isAuto, isAutoFit);
                return;
                //}
                //containerWidth = preferredTableWidth < totalMinimumWordWidth ? totalMinimumWordWidth < containerWidth ? totalMinimumWordWidth : containerWidth : preferredTableWidth;
            }
            // Try to fit minimum word width to match preferredTableWidth or containerWidth.
            if (minTotal <= preferredTableWidth || minTotal <= containerWidth) {
                var availableWidth = containerWidth > preferredTableWidth ? containerWidth : preferredTableWidth;
                availableWidth = availableWidth - minTotal;
                for (var i = 0; i < this.columns.length; i++) {
                    var column = this.columns[i];
                    if (column.widthType === 'Point') {
                        continue;
                    }
                    if (column.preferredWidth === 0) {
                        column.preferredWidth = column.minimumWordWidth;
                    }
                    else {
                        if (column.preferredWidth < column.minimumWordWidth) {
                            column.preferredWidth = column.minimumWordWidth;
                        }
                    }
                    var difference = column.maximumWordWidth - column.preferredWidth;
                    difference = difference > 0 ? difference : 0;
                    var factor = availableWidth * (difference / remainingWidthTotal);
                    column.preferredWidth += isNaN(factor) ? 0 : factor;
                }
            }
            else {
                // Try to fit minimum width for each column and allot remaining space to columns based on their minimum word width.
                var totalMinimumWordWidth = this.getTotalWidth(1);
                var totalMinWidth = this.getTotalWidth(3);
                if (totalMinWidth > 2112) {
                    var cellWidth = 2112 / this.columns.length;
                    for (var i = 0; i < this.columns.length; i++) {
                        this.columns[i].preferredWidth = cellWidth;
                    }
                }
                else {
                    var availableWidth = 0;
                    if (((totalMinWidth < containerWidth) && ((containerWidth - totalMinWidth) >= 1) && !isAllColumnPointWidth)
                        || (isAllColumnPointWidth && !hasSpannedCells && totalMinimumWordWidth > containerWidth)) {
                        availableWidth = containerWidth - totalMinWidth;
                        for (var i = 0; i < this.columns.length; i++) {
                            var column = this.columns[i];
                            // The factor depends of current column's minimum word width and total minimum word width.
                            var factor = availableWidth * column.minimumWordWidth / totalMinimumWordWidth;
                            factor = isNaN(factor) ? 0 : factor;
                            column.preferredWidth = (column.minimumWidth == 0 ? 1 : column.minimumWidth) + factor;
                        }
                        // table width exceeds container width
                    }
                    else if (totalPreferredWidth > containerWidth) {
                        var factor = containerWidth / totalPreferredWidth;
                        for (var i = 0; i < this.columns.length; i++) {
                            var column = this.columns[i];
                            column.preferredWidth = column.preferredWidth * factor;
                        }
                    }
                }
            }
        }
        this.tableWidth = this.getTotalWidth(0);
    };
    /**
     * @private
     */
    WTableHolder.prototype.getValidColumnIndex = function (index) {
        var endOffset = 0;
        for (var i = 0; i < this.columns.length; i++) {
            var column = this.columns[i];
            if (i < index) {
                endOffset = column.endOffset;
            }
            else if (endOffset === column.endOffset) {
                //Increment the columnIndex if next column has zero width.
                index++;
            }
            else {
                break;
            }
        }
        return index;
    };
    /**
     * @private
     */
    WTableHolder.prototype.fitColumns = function (containerWidth, preferredTableWidth, isAutoWidth, isAutoFit, indent) {
        if (isNullOrUndefined(indent)) {
            indent = 0;
        }
        // Gets total preferred width.
        var totalColumnWidth = this.getTotalWidth(0);
        // Neglected left indent value, because in preferred table width left indent value is neglected
        if (isAutoWidth) {
            totalColumnWidth -= indent;
        }
        // If auto table width, based on total column widths, minimum value will be updated.
        if (isAutoWidth) {
            this.tableWidth = totalColumnWidth;
        }
        else {
            this.tableWidth = preferredTableWidth;
        }
        // If total columns width doesn't match table width, then all grid column widths will be updated by even factor.
        // If totalColumnWidth < TableWidth, all grid columns are enlarged. Otherwise shrinked.
        if (totalColumnWidth !== this.tableWidth) {
            var factor = this.tableWidth / totalColumnWidth;
            factor = isNaN(factor) || factor === Infinity ? 1 : factor;
            for (var i = 0; i < this.columns.length; i++) {
                var column = this.columns[i];
                if (column.widthType === 'Percent' && !isAutoWidth && !isAutoFit && totalColumnWidth > this.tableWidth) {
                    if (i !== 0 && column.endOffset > this.tableWidth) {
                        var totalCellWidth = this.getCellWidth(0, i + 1, preferredTableWidth);
                        if (totalCellWidth > this.tableWidth) {
                            column.preferredWidth -= (totalCellWidth - this.tableWidth);
                            if (column.preferredWidth === 0 || column.preferredWidth < column.minimumWidth) {
                                column.preferredWidth = column.minimumWidth > 0 ? column.minimumWidth : 1;
                                this.columns[0].preferredWidth -= column.preferredWidth;
                            }
                        }
                    }
                }
                else {
                    column.preferredWidth = factor * column.preferredWidth;
                }
            }
        }
    };
    /**
     * @private
     */
    WTableHolder.prototype.getCellWidth = function (columnIndex, columnSpan, preferredTableWidth) {
        var width = 0;
        for (var i = 0; i < columnSpan; i++) {
            width += this.tableColumns[i + columnIndex].preferredWidth;
        }
        return width;
    };
    /**
     * @private
     */
    WTableHolder.prototype.validateColumnWidths = function () {
        for (var i = 0; i < this.columns.length; i++) {
            if (i === 0) {
                if (this.columns[i].preferredWidth !== this.columns[i].endOffset) {
                    this.columns[i].preferredWidth = this.columns[i].endOffset;
                }
            }
            else {
                // If Previous column offset + current column preferred width is less than current column offset, 
                // Then current column preferred width is set to current column offset - previous column offset.
                if (this.columns[i - 1].endOffset + this.columns[i].preferredWidth < this.columns[i].endOffset) {
                    if (this.columns[i - 1].endOffset === 0) {
                        this.columns[i].preferredWidth = this.columns[i].endOffset - this.getPreviousValidOffset(i - 2);
                    }
                    else {
                        this.columns[i].preferredWidth = this.columns[i].endOffset - this.columns[i - 1].endOffset;
                    }
                }
            }
        }
    };
    WTableHolder.prototype.getPreviousValidOffset = function (columnIndex) {
        for (var j = columnIndex; j >= 0; j--) {
            if (this.columns[j].endOffset !== 0) {
                return this.columns[j].endOffset;
            }
        }
        return 0;
    };
    /**
     * @private
     */
    WTableHolder.prototype.clone = function () {
        var tableHolder = new WTableHolder();
        tableHolder.tableWidth = this.tableWidth;
        for (var i = 0; i < this.columns.length; i++) {
            tableHolder.columns.push(this.columns[i].clone());
        }
        return tableHolder;
    };
    /**
     * @private
     */
    WTableHolder.prototype.destroy = function () {
        if (!isNullOrUndefined(this.tableColumns)) {
            for (var i = 0; i < this.tableColumns.length; i++) {
                var column = this.tableColumns[i];
                column.destroy();
            }
        }
        this.tableColumns = [];
        this.tableColumns = undefined;
        this.tableWidth = undefined;
    };
    return WTableHolder;
}());
export { WTableHolder };
/**
 * @private
 */
var WColumn = /** @class */ (function () {
    function WColumn() {
        /**
         * @private
         */
        this.preferredWidth = 0;
        /**
         * @private
         */
        this.minWidth = 0;
        /**
         * @private
         */
        this.maxWidth = 0;
        /**
         * @private
         */
        this.endOffset = 0;
        /**
         * @private
         */
        this.minimumWordWidth = 0;
        /**
         * @private
         */
        this.maximumWordWidth = 0;
        /**
         * @private
         */
        this.minimumWidth = 0;
    }
    /**
     * @private
     */
    WColumn.prototype.clone = function () {
        var column = new WColumn();
        column.preferredWidth = this.preferredWidth;
        column.minWidth = this.minWidth;
        column.maxWidth = this.maxWidth;
        return column;
    };
    /**
     * @private
     */
    WColumn.prototype.destroy = function () {
        this.preferredWidth = undefined;
        this.minWidth = undefined;
        this.maxWidth = undefined;
    };
    return WColumn;
}());
export { WColumn };
/**
 * @private
 */
var ColumnSizeInfo = /** @class */ (function () {
    function ColumnSizeInfo() {
        /**
         * @private
         */
        this.minimumWordWidth = 0;
        /**
         * @private
         */
        this.maximumWordWidth = 0;
        /**
         * @private
         */
        this.minimumWidth = 0;
        /**
         * @private
         */
        this.hasMinimumWidth = false;
        /**
         * @private
         */
        this.hasMinimumWordWidth = false;
        /**
         * @private
         */
        this.hasMaximumWordWidth = false;
    }
    return ColumnSizeInfo;
}());
export { ColumnSizeInfo };
/**
 * @private
 */
var CommentEditInfo = /** @class */ (function () {
    function CommentEditInfo() {
    }
    return CommentEditInfo;
}());
export { CommentEditInfo };
/**
 * @private
 */
var MentionDataEditInfo = /** @class */ (function () {
    function MentionDataEditInfo() {
    }
    return MentionDataEditInfo;
}());
export { MentionDataEditInfo };
/**
 * @private
 */
var BreakElementBox = /** @class */ (function (_super) {
    __extends(BreakElementBox, _super);
    function BreakElementBox() {
        return _super.call(this) || this;
    }
    /**
     * @private
     */
    BreakElementBox.prototype.clone = function () {
        var breakElement = _super.prototype.clone.call(this);
        breakElement.breakClearType = this.breakClearType;
        return breakElement;
    };
    /*
    * @Private
    */
    BreakElementBox.prototype.destroy = function () {
        this.breakClearType = undefined;
        _super.prototype.destroy.call(this);
    };
    /*
    * @Private
    */
    BreakElementBox.prototype.componentDestroy = function () {
        this.breakClearType = undefined;
        _super.prototype.componentDestroy.call(this);
    };
    return BreakElementBox;
}(TextElementBox));
export { BreakElementBox };
/**
 * @private
 */
var TabStopListInfo = /** @class */ (function () {
    function TabStopListInfo() {
    }
    return TabStopListInfo;
}());
export { TabStopListInfo };
/**
 * @private
 */
var FootnoteEndnoteMarkerElementBox = /** @class */ (function (_super) {
    __extends(FootnoteEndnoteMarkerElementBox, _super);
    function FootnoteEndnoteMarkerElementBox() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @private
     */
    FootnoteEndnoteMarkerElementBox.prototype.getLength = function () {
        return 1;
    };
    /**
     * @private
     */
    FootnoteEndnoteMarkerElementBox.prototype.clone = function () {
        // return super.clone();
        var footEndEle = new FootnoteEndnoteMarkerElementBox();
        footEndEle.characterFormat.copyFormat(this.characterFormat);
        footEndEle.text = this.text;
        if (this.margin) {
            footEndEle.margin = this.margin.clone();
        }
        footEndEle.baselineOffset = this.baselineOffset;
        if (!isNullOrUndefined(this.paragraph) && this.paragraph.isInHeaderFooter) {
            if (this.revisions.length > 0) {
                for (var i = 0; i < this.revisions.length; i++) {
                    var revision = this.revisions[i];
                    footEndEle.revisions.push(revision.clone());
                }
            }
        }
        else {
            if (this.revisions.length > 0) {
                footEndEle.removedIds = Revision.cloneRevisions(this.revisions);
            }
            else {
                footEndEle.removedIds = this.removedIds.slice();
            }
        }
        footEndEle.width = this.width;
        footEndEle.height = this.height;
        if (this.contentControlProperties) {
            footEndEle.contentControlProperties = this.contentControlProperties;
        }
        return footEndEle;
    };
    return FootnoteEndnoteMarkerElementBox;
}(TextElementBox));
export { FootnoteEndnoteMarkerElementBox };
