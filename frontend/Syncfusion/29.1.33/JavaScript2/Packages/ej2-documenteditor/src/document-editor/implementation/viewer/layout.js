/* eslint-disable */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Dictionary } from '../../base/dictionary';
import { CharacterRangeType } from '../../base/types';
import { HelperMethods, Point, WrapPosition } from '../editor/editor-helper';
import { WBorder, WBorders, WCharacterFormat, WParagraphFormat } from '../format/index';
import { WListLevel } from '../list/list-level';
import { BlockContainer, BlockWidget, BodyWidget, BookmarkElementBox, EditRangeEndElementBox, EditRangeStartElementBox, ElementBox, FieldElementBox, FieldTextElementBox, HeaderFooterWidget, ImageElementBox, LineWidget, ListTextElementBox, Margin, ParagraphWidget, Rect, TabElementBox, TableCellWidget, TableRowWidget, TableWidget, TextElementBox, Widget, CheckBoxFormField, DropDownFormField, ShapeElementBox, TextFrame, ContentControl, FootnoteElementBox, FootNoteWidget, ShapeBase, CommentCharacterElementBox, FootnoteEndnoteMarkerElementBox } from './page';
import { PageLayoutViewer, WebLayoutViewer } from './viewer';
import { TextHelper } from './text-helper';
// Check box character is rendered smaller when compared to MS Word
// So, mutiplied the font side by below factor to render check box character large.
var CHECK_BOX_FACTOR = 1.35;
/**
 * @private
 */
var Layout = /** @class */ (function () {
    function Layout(documentHelper) {
        /**
         * @private
         */
        this.islayoutFootnote = false;
        /**
         * @private
         */
        this.isMultiColumnDoc = false;
        /**
         * @private
         */
        this.allowLayout = true;
        /**
         * @private
         */
        this.isReplaceAll = false;
        /**
         * @private
         */
        this.isTextFormat = false;
        /**
        * @private
        */
        this.isSectionBreakCont = false;
        /**
         * @private
         */
        this.isReplacingAll = false;
        /**
         * @private
         */
        this.footHeight = 0;
        /**
         * @private
         */
        this.existFootnoteHeight = 0;
        /**
         * @private
         */
        this.isfootMove = false;
        /**
         * @private
         */
        this.footnoteHeight = 0;
        /**
         * @private
         */
        this.isTableFootNote = false;
        /**
         * @private
         */
        this.isRelayout = false;
        /**
         * @private
         */
        this.isRelayoutneed = false;
        /**
         * @private
         */
        this.isOverlapFloatTable = false;
        this.isInitialLoad = true;
        /**
          * @private
          */
        this.isInsertFormField = false;
        this.fieldBegin = undefined;
        this.maxTextHeight = 0;
        this.maxBaseline = 0;
        this.maxTextBaseline = 0;
        this.isFieldCode = false;
        this.isRtlFieldCode = false;
        this.isRTLLayout = false;
        this.isSkipFirstLineIndent = false;
        this.currentCell = undefined;
        this.isFootnoteContentChanged = false;
        this.isEndnoteContentChanged = false;
        this.keepWithNext = false;
        this.is2013Justification = false;
        this.nextElementToLayout = undefined;
        this.endNoteHeight = 0;
        this.isMultiColumnSplit = false;
        this.isMultiColumnLayout = false;
        this.skipUpdateContainerWidget = false;
        this.isIFfield = false;
        this.isLayoutWhole = false;
        /**
         * @private
         */
        this.isBidiReLayout = false;
        /**
         * @private
         */
        this.defaultTabWidthPixel = 48;
        /**
         * @private
         */
        this.isRelayoutFootnote = false;
        this.isRelayoutOverlap = false;
        this.skipRelayoutOverlap = false;
        this.isWrapText = false;
        this.isYPositionUpdated = false;
        this.isXPositionUpdated = false;
        this.hasFloatingElement = false;
        this.isFootNoteLayoutStart = false;
        this.wrapPosition = [];
        this.shiftedFloatingItemsFromTable = [];
        this.isDocumentContainsRtl = false;
        /**
         * @private
         */
        this.isPastingContent = false;
        this.layoutedFootnoteElement = [];
        /**
         * @private
         */
        this.isAllColumnHasAutoWidthType = false;
        this.documentHelper = documentHelper;
    }
    Layout.prototype.isSameStyle = function (currentParagraph, isAfterSpacing) {
        var nextOrPrevSibling = undefined;
        if (isAfterSpacing) {
            if (currentParagraph.nextWidget instanceof ParagraphWidget) {
                nextOrPrevSibling = currentParagraph.nextWidget;
            }
        }
        else {
            if (currentParagraph.previousWidget instanceof ParagraphWidget) {
                nextOrPrevSibling = currentParagraph.previousWidget;
            }
        }
        if (isNullOrUndefined(nextOrPrevSibling)) {
            //Need to skip contextual spacing behavior when document is not Word 2013 and paragraph preserved inside the table cell with AllowSpaceOfSameStyleInTable compatiblity options.
            if (currentParagraph.paragraphFormat.contextualSpacing && (currentParagraph.isInsideTable ? (!this.documentHelper.allowSpaceOfSameStyleInTable || this.documentHelper.compatibilityMode === 'Word2013') : false)) {
                if (currentParagraph.index === 0) {
                    nextOrPrevSibling = this.updateFirstParagraphSpacingBasedOnContextualSpacing(currentParagraph, isAfterSpacing);
                }
                else if (currentParagraph.index === currentParagraph.associatedCell.childWidgets.length - 1) {
                    nextOrPrevSibling = this.updateLastParagraphSpacingBasedOnContextualSpacing(currentParagraph);
                    if (nextOrPrevSibling === currentParagraph) {
                        return true;
                    }
                }
            }
            if (isNullOrUndefined(nextOrPrevSibling)) {
                return false;
            }
        }
        if (nextOrPrevSibling instanceof ParagraphWidget && currentParagraph.paragraphFormat.baseStyle === nextOrPrevSibling.paragraphFormat.baseStyle && (currentParagraph.isInsideTable ? !this.documentHelper.allowSpaceOfSameStyleInTable : true)) {
            if (currentParagraph.paragraphFormat.listFormat.listId >= 0 && nextOrPrevSibling.paragraphFormat.listFormat.listId >= 0) {
                if (!currentParagraph.paragraphFormat.contextualSpacing) {
                    if (isAfterSpacing && currentParagraph.paragraphFormat.spaceAfterAuto) {
                        return true;
                    }
                    else if (!isAfterSpacing && currentParagraph.paragraphFormat.spaceBeforeAuto) {
                        return true;
                    }
                }
            }
            return currentParagraph.paragraphFormat.contextualSpacing;
        }
        return false;
    };
    Layout.prototype.updateFirstParagraphSpacingBasedOnContextualSpacing = function (paragraph, isAfterSpacing) {
        var ownerCell = paragraph.associatedCell;
        var ownerRow = ownerCell.ownerRow;
        var ownerTable = ownerRow.ownerTable;
        var nextOrPrevSibling;
        if (isAfterSpacing) {
            nextOrPrevSibling = isNullOrUndefined(paragraph.nextRenderedWidget) ? (!isNullOrUndefined(ownerCell.nextRenderedWidget) ? ownerCell.nextRenderedWidget.firstChild : undefined) : paragraph.nextRenderedWidget;
        }
        else {
            nextOrPrevSibling = isNullOrUndefined(paragraph.previousRenderedWidget) ? (!isNullOrUndefined(ownerCell.previousRenderedWidget) ? ownerCell.previousRenderedWidget.firstChild : undefined) : paragraph.previousRenderedWidget;
        }
        if (ownerCell.index === 0 && paragraph.index === 0) {
            if (ownerRow.index === 0) {
                if (ownerTable.isInsideTable && ownerTable.index == 0) {
                    nextOrPrevSibling = this.checkOwnerTablePrevItem(ownerTable, paragraph);
                }
                else {
                    //If paragraph is preserved in first row first cell means, need to check owner table previous sibling.
                    var ownerTablePrevSibling = ownerTable.previousRenderedWidget;
                    return ownerTablePrevSibling;
                }
            }
            else {
                if (isNullOrUndefined(nextOrPrevSibling) && paragraph.paragraphFormat.baseStyle.name === "Normal" && paragraph.paragraphFormat.listFormat.listId < 0) {
                    return paragraph;
                }
                return nextOrPrevSibling;
            }
        }
        else if (paragraph.index === 0 && !isAfterSpacing) {
            //If para is first item in any cell excluding first cell, need to check previous cell last item.
            var prevCell = ownerRow.childWidgets[ownerCell.index - 1];
            var prevCelllastItem = prevCell.childWidgets[prevCell.childWidgets.length - 1];
            //if previous cell last item is table means skip before spacing value no need to check any paragraph styles.
            if (prevCelllastItem instanceof TableWidget && paragraph.paragraphFormat.baseStyle.name === "Normal" && paragraph.paragraphFormat.listFormat.listId < 0) {
                return paragraph;
            }
        }
        return nextOrPrevSibling;
    };
    Layout.prototype.updateLastParagraphSpacingBasedOnContextualSpacing = function (paragraph) {
        var ownerCell = paragraph.associatedCell;
        var ownerRow = ownerCell.ownerRow;
        var nextCellFirstItem;
        if (ownerCell.index === ownerRow.childWidgets.length - 1 && paragraph.index === ownerCell.childWidgets.length - 1) {
            if (paragraph.paragraphFormat.baseStyle.name === "Normal" && paragraph.paragraphFormat.listFormat.listId < 0) {
                //If para preserved in last item in cell and cell is last cell in current row means its after spacing value not considered.
                return paragraph;
            }
        }
        else if (paragraph.index === ownerCell.childWidgets.length - 1) {
            //If current para is last item in current cell then need to check next cell first item.
            var nextCell = ownerRow.childWidgets[ownerCell.index + 1];
            nextCellFirstItem = nextCell.firstChild;
            //If next cell first item is table then need to check inner table first para.
            //This is applicable for multiple nested table so when first item is table it try to get its first paragraph.
            while (nextCellFirstItem instanceof TableWidget) {
                nextCellFirstItem = nextCellFirstItem.childWidgets[0].childWidgets[0].childWidgets[0];
            }
        }
        return nextCellFirstItem;
    };
    Layout.prototype.checkOwnerTablePrevItem = function (ownerTable, paragraph) {
        var row = ownerTable.associatedCell.ownerRow;
        var prevSibling;
        if (row.index > 0) {
            if (paragraph.paragraphFormat.baseStyle.name === "Normal" && paragraph.paragraphFormat.listFormat.listId < 0) {
                return paragraph;
            }
        }
        else {
            if (row.ownerTable.isInsideTable && row.ownerTable.index === 0) {
                this.checkOwnerTablePrevItem(row.ownerTable, paragraph);
            }
            else {
                var prevSibling_1 = row.ownerTable.previousRenderedWidget;
                return prevSibling_1;
            }
        }
        return prevSibling;
    };
    Object.defineProperty(Layout.prototype, "viewer", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    Layout.prototype.layout = function () {
        // Todo: Need to handle complete document layout(relayout).
        //const page: Page = this.documentHelper.pages[0];
        //const body: BodyWidget = page.bodyWidgets[0];
    };
    /**
     * Releases un-managed and - optionally - managed resources.
     *
     * @returns {void}
     */
    Layout.prototype.destroy = function () {
        this.documentHelper = undefined;
        this.value = undefined;
        this.allowLayout = undefined;
        this.isInitialLoad = undefined;
        this.fieldBegin = undefined;
        this.maxTextHeight = undefined;
        this.maxBaseline = undefined;
        this.maxTextBaseline = undefined;
        this.isSkipFirstLineIndent = undefined;
        this.isFieldCode = undefined;
        this.footnoteHeight = undefined;
        this.isMultiColumnDoc = undefined;
        this.isIFfield = undefined;
        this.isPastingContent = undefined;
    };
    Layout.prototype.layoutItems = function (sections, isReLayout, isContinuousSection) {
        var _this = this;
        var page;
        var height = 0;
        var width = 0;
        for (var i = 0; i < sections.length; i++) {
            var section = sections[i];
            if (section.sectionFormat.numberOfColumns > 1) {
                this.isMultiColumnDoc = true;
            }
            var nextSection = sections[i + 1];
            this.viewer.columnLayoutArea.setColumns(section.sectionFormat);
            var lastpage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
            var bodyWidget = void 0;
            if (!isNullOrUndefined(lastpage) && !isNullOrUndefined(lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1]) && lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].childWidgets.length === 0 && !isNullOrUndefined(lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].previousSplitWidget)) {
                bodyWidget = lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].previousSplitWidget;
            }
            /* eslint-disable-next-line max-len */
            // If page break next para is section last para and it is empty then ms word will layout in the section break in previous para. So checking the next para into existing behaviour.
            if (i > 0 && !isNullOrUndefined(bodyWidget) && !isNullOrUndefined(bodyWidget.lastChild) && !(bodyWidget.lastChild instanceof TableWidget)) {
                var lastChild_1 = bodyWidget.lastChild;
                var previousWidget = lastChild_1.previousRenderedWidget;
                if (lastChild_1.isSectionBreak && previousWidget instanceof ParagraphWidget && previousWidget.isEndsWithPageBreak) {
                    lastChild_1 = previousWidget;
                }
                if ((this.documentHelper.compatibilityMode === 'Word2013' && (lastChild_1.isEndsWithPageBreak || lastChild_1.isEndsWithColumnBreak)) && lastpage.bodyWidgets[0].childWidgets.length === 0) {
                    var removedPages = this.documentHelper.pages.splice(this.documentHelper.pages.length - 1, 1);
                    removedPages[0].destroy();
                    lastpage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
                }
            }
            var breakCode = section.sectionFormat.breakCode;
            var prevSection = undefined;
            if (i !== 0 && this.documentHelper.compatibilityMode === 'Word2010' && breakCode === 'NewColumn') {
                var splitWidgets = sections[i - 1].getSplitWidgets();
                prevSection = splitWidgets[splitWidgets.length - 1];
                if (prevSection.sectionFormat.columns.length > 1 && section.sectionFormat.columns.length > 1 && prevSection.sectionFormat.columns.length === section.sectionFormat.columns.length && prevSection.sectionFormat.columns.length - 1 !== prevSection.columnIndex && !(prevSection.lastChild instanceof ParagraphWidget && prevSection.lastChild.isEndsWithPageBreak)) {
                    var nextColumn = this.viewer.columnLayoutArea.getNextColumnByBodyWidget(prevSection);
                    if (!isNullOrUndefined(nextColumn)) {
                        section.columnIndex = nextColumn.index;
                        section.isWord2010NextColumn = true;
                        section.y = prevSection.y;
                        this.viewer.clientActiveArea.height -= section.y - this.viewer.clientActiveArea.y;
                        this.viewer.clientActiveArea.y = section.y;
                    }
                }
            }
            if (!section.isWord2010NextColumn && breakCode !== 'NoBreak') {
                breakCode = 'NewPage';
            }
            // We are layouting the section last paragraph in previous paragraph if its empty So if previous paragraph is page break then we need to create new page.
            var lastChild = void 0;
            if (i !== 0) {
                lastChild = lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1].lastChild;
                if (lastChild) {
                    var previousWidget = lastChild.previousRenderedWidget;
                    if (lastChild instanceof ParagraphWidget && lastChild.isSectionBreak && previousWidget instanceof ParagraphWidget) {
                        lastChild = previousWidget;
                    }
                }
            }
            if ((i === 0 && !isContinuousSection) || (i !== 0 && !section.isWord2010NextColumn && (isNullOrUndefined(breakCode) || breakCode === 'NewPage' || height !== section.sectionFormat.pageHeight || width !== section.sectionFormat.pageWidth || (!isNullOrUndefined(lastChild) && lastChild.isEndsWithPageBreak)))) {
                page = this.viewer.createNewPage(section);
            }
            else {
                var clientY = this.documentHelper.viewer.clientActiveArea.y;
                var clientHeight = this.documentHelper.viewer.clientActiveArea.height;
                if (isContinuousSection) {
                    var section_1 = this.getBodyWidget(lastpage.bodyWidgets[lastpage.bodyWidgets.length - 1], true);
                    var height_1 = this.getNextWidgetHeight(section_1);
                    this.viewer.updateClientArea(section_1, section_1.page);
                    clientHeight = this.viewer.clientActiveArea.height - (height_1 - this.viewer.clientActiveArea.y);
                    clientY = height_1;
                    isContinuousSection = false;
                }
                //if (i - 1 > 0) {
                page = lastpage;
                //}
                page.bodyWidgets.push(section);
                page.bodyWidgets[page.bodyWidgets.length - 1].page = page;
                this.documentHelper.viewer.updateClientArea(section, page);
                this.documentHelper.viewer.clientActiveArea.y = clientY;
                this.documentHelper.viewer.clientActiveArea.height = clientHeight;
            }
            height = section.sectionFormat.pageHeight;
            width = section.sectionFormat.pageWidth;
            this.addBodyWidget(this.viewer.clientActiveArea, section);
            if (this.documentHelper.pages.length > 1) {
                var pageIndex = 0;
                for (var i_1 = 0; i_1 < this.documentHelper.pages.length; i_1++) {
                    var prevPage = this.documentHelper.pages[i_1];
                    var prevSectionIndex = prevPage.sectionIndex;
                    var index = section.index;
                    if (prevSectionIndex > index || prevPage === page) {
                        break;
                    }
                    pageIndex++;
                }
                if (pageIndex < this.documentHelper.pages.length - 1) {
                    this.documentHelper.insertPage(pageIndex, page);
                }
            }
            this.layoutSection(section, 0, nextSection);
            if (section.isWord2010NextColumn && !isNullOrUndefined(prevSection)) {
                var sectionHeight = this.getNextWidgetHeight(prevSection);
                if (this.viewer.clientActiveArea.y < sectionHeight) {
                    this.viewer.updateClientArea(prevSection, prevSection.page);
                    this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.height - (sectionHeight - this.viewer.clientActiveArea.y);
                    this.viewer.clientActiveArea.y = sectionHeight;
                }
            }
        }
        if (!isReLayout) {
            this.layoutComments(this.documentHelper.comments);
        }
        this.updateFieldElements();
        if (this.documentHelper.owner.layoutType === 'Pages') {
            this.layoutEndNoteElement();
        }
        /* tslint:disable:align */
        setTimeout(function () {
            if (_this.documentHelper) {
                _this.documentHelper.isScrollHandler = true;
                // if (this.documentHelper.owner.isSpellCheck && this.documentHelper.owner.spellChecker.enableOptimizedSpellCheck) {
                //     this.documentHelper.triggerElementsOnLoading = true;
                // }
                _this.documentHelper.clearContent();
                _this.viewer.updateScrollBars();
                _this.documentHelper.isScrollHandler = false;
                _this.isInitialLoad = false;
            }
        }, 50);
    };
    /**
     * @private
     */
    Layout.prototype.layoutComments = function (comments) {
        if (!isNullOrUndefined(comments)) {
            this.viewer.owner.commentReviewPane.layoutComments(comments);
        }
    };
    Layout.prototype.layoutSection = function (section, index, nextSection) {
        var block = section.firstChild;
        var nextBlock;
        var prevBlock;
        do {
            if (!this.isLayoutWhole && block instanceof TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                && !block.tableFormat.allowAutoFit) {
                block.calculateGrid();
            }
            if (!isNullOrUndefined(block)) {
                this.viewer.updateClientAreaForBlock(block, true, undefined, true, true);
                var bodyIndex = block.containerWidget.indexInOwner;
                nextBlock = this.layoutBlock(block, index);
                index = 0;
                this.viewer.updateClientAreaForBlock(block, false);
                prevBlock = block;
                block = nextBlock;
            }
        } while (block);
        block = section.firstChild;
        if (this.viewer instanceof PageLayoutViewer && section.sectionFormat.numberOfColumns > 1 && !isNullOrUndefined(nextSection) && nextSection.sectionFormat.breakCode === 'NoBreak' && (section.sectionFormat.breakCode === 'NoBreak' || (section.sectionIndex === section.page.bodyWidgets[0].sectionIndex))) {
            if (this.getColumnBreak(section)) {
                var splittedSection = section.getSplitWidgets();
                var bodyWidget = splittedSection[splittedSection.length - 1];
                if (!isNullOrUndefined(section.page.nextPage)) {
                    this.splitBodyWidgetBasedOnColumn(bodyWidget);
                }
                else {
                    var firstBody = this.getBodyWidget(bodyWidget, true);
                    this.viewer.updateClientArea(firstBody, firstBody.page);
                    var height = this.getNextWidgetHeight(firstBody);
                    this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                    this.viewer.clientActiveArea.y = height;
                }
            }
            else {
                if (!isNullOrUndefined(section.page.nextPage)) {
                    section = this.documentHelper.pages[this.documentHelper.pages.length - 1].bodyWidgets[0];
                }
                this.splitBodyWidgetBasedOnColumn(section);
            }
        }
        var page;
        if (block && block.bodyWidget && block.bodyWidget.page) {
            page = block.bodyWidget.page;
        }
        while (page) {
            if (page.footnoteWidget) {
                this.layoutfootNote(page.footnoteWidget);
                page = page.nextPage;
            }
            else {
                page = page.nextPage;
            }
        }
        page = undefined;
        block = undefined;
    };
    /**
     * @private
     *
     */
    Layout.prototype.reLayoutMultiColumn = function (section, isFirstBlock, blockIndex) {
        this.isInitialLoad = true;
        section = section.getSplitWidgets()[0];
        this.combineMultiColumnForRelayout(section);
        if (section.sectionFormat.numberOfColumns > 1) {
            this.isMultiColumnDoc = true;
        }
        this.isMultiColumnSplit = false;
        var previousSection = section.previousRenderedWidget;
        var nextSection = section.nextRenderedWidget;
        var isUpdatedClientArea = false;
        // Section's Y position is not updated properly when the two sections combined and layouted.
        if (!isFirstBlock && !isNullOrUndefined(section.firstChild) && section.firstChild instanceof ParagraphWidget && section.y !== section.firstChild.y) {
            section.y = section.firstChild.y;
        }
        if (isFirstBlock && nextSection && section.page !== nextSection.page && section.firstChild instanceof ParagraphWidget) {
            var paragraph = section.firstChild;
            var lineHeight = 0;
            if (paragraph.isEmpty()) {
                lineHeight = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat).Height;
            }
            else {
                var firstLine = paragraph.childWidgets[0];
                lineHeight = this.getMaxElementHeight(firstLine);
            }
            var previousBlock = paragraph.previousRenderedWidget;
            if (section.y === this.viewer.clientActiveArea.y && lineHeight > this.viewer.clientActiveArea.height) {
                previousBlock = isNullOrUndefined(previousBlock) ? paragraph : previousBlock;
                this.moveBlocksToNextPage(previousBlock);
                this.viewer.columnLayoutArea.setColumns(section.sectionFormat);
                this.viewer.updateClientArea(section, section.page);
                isUpdatedClientArea = true;
            }
        }
        else if (!isNullOrUndefined(previousSection) && previousSection.page !== section.page && section.firstChild instanceof ParagraphWidget && previousSection.lastChild instanceof ParagraphWidget) {
            var previousParagraph = previousSection.lastChild;
            var paragraph = section.firstChild;
            if (section instanceof BodyWidget && previousSection.lastChild && previousParagraph instanceof ParagraphWidget && previousSection.sectionFormat.breakCode === 'NoBreak' && section.page.index !== previousSection.page.index && section.index !== previousSection.index) {
                var bodyWidget = previousSection;
                if (bodyWidget.sectionFormat.columns.length > 1) {
                    bodyWidget = this.getBodyWidget(bodyWidget, true);
                }
                var bottom = HelperMethods.round((this.getNextWidgetHeight(bodyWidget) + paragraph.height), 2);
                // Bug 858530: Shift the widgets to previous container widget if the client height is not enough to place this widget.
                if (!previousSection.lastChild.isEndsWithPageBreak && !previousSection.lastChild.isEndsWithColumnBreak
                    && bottom <= HelperMethods.round(this.viewer.clientActiveArea.bottom, 2)) {
                    var page = previousSection.page;
                    var nextPage = section.page;
                    for (var j = 0; j < nextPage.bodyWidgets.length; j++) {
                        var nextBodyWidget = nextPage.bodyWidgets[j];
                        nextPage.bodyWidgets.splice(nextPage.bodyWidgets.indexOf(nextBodyWidget), 1);
                        page.bodyWidgets.splice(page.bodyWidgets.length, 0, nextBodyWidget);
                        nextBodyWidget.page = page;
                        j--;
                    }
                    section.y = this.viewer.clientActiveArea.y;
                    this.documentHelper.removeEmptyPages();
                }
            }
        }
        if (!isUpdatedClientArea) {
            this.viewer.columnLayoutArea.setColumns(section.sectionFormat);
            this.viewer.updateClientArea(section, section.page);
            this.viewer.clientActiveArea.height -= section.y - this.viewer.clientActiveArea.y;
            this.viewer.clientActiveArea.y = section.y;
        }
        this.addBodyWidget(this.viewer.clientActiveArea, section);
        this.clearBlockWidget(section.childWidgets, true, true, true);
        this.isMultiColumnLayout = true;
        this.reLayoutMultiColumnBlock(section, nextSection, blockIndex);
        this.isMultiColumnLayout = false;
        this.isInitialLoad = false;
        var splitSections = section.getSplitWidgets();
        var lastSection = splitSections[splitSections.length - 1];
        var firstBody = this.getBodyWidget(lastSection, true);
        this.viewer.updateClientArea(firstBody, firstBody.page);
        var height = this.getNextWidgetHeight(firstBody);
        this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
        this.viewer.clientActiveArea.y = height;
        if (!isNullOrUndefined(lastSection) && !isNullOrUndefined(lastSection.nextRenderedWidget)) {
            nextSection = lastSection.nextRenderedWidget;
            var clientY = this.documentHelper.viewer.clientActiveArea.y;
            var clientHeight = this.documentHelper.viewer.clientActiveArea.height;
            this.documentHelper.viewer.updateClientArea(nextSection, nextSection.page);
            this.documentHelper.viewer.clientActiveArea.y = clientY;
            this.documentHelper.viewer.clientActiveArea.height = clientHeight;
            this.documentHelper.blockToShift = nextSection.firstChild;
        }
        if (isNullOrUndefined(lastSection.nextRenderedWidget) ||
            (!isNullOrUndefined(lastSection.nextRenderedWidget) && lastSection.sectionFormat.breakCode !== 'NoBreak' && lastSection.nextRenderedWidget.sectionFormat.pageHeight !== lastSection.sectionFormat.pageHeight && lastSection.nextRenderedWidget.sectionFormat.pageWidth !== lastSection.sectionFormat.pageWidth)) {
            this.documentHelper.blockToShift = undefined;
        }
    };
    Layout.prototype.combineMultiColumnForRelayout = function (section) {
        var splitSections = section.getSplitWidgets();
        var firstSection = splitSections[0];
        section = splitSections[splitSections.length - 1];
        while (section !== firstSection) {
            var prevSection = section.previousRenderedWidget;
            var isPreviousSplit = false;
            for (var i = 0; i < section.childWidgets.length; i++) {
                if (section.childWidgets[i] instanceof BlockWidget && !isNullOrUndefined(section.childWidgets[i].previousSplitWidget)
                    && !isNullOrUndefined(section.childWidgets[i].previousSplitWidget.previousSplitWidget)
                    && section.childWidgets[i].previousSplitWidget.bodyWidget.page !== section.childWidgets[i].previousSplitWidget.previousSplitWidget.bodyWidget.page) {
                    isPreviousSplit = true;
                }
                if ((section.childWidgets[i] instanceof BlockWidget && !isNullOrUndefined(section.childWidgets[i].previousSplitWidget) && section.childWidgets[i].previousSplitWidget.bodyWidget.page === section.childWidgets[i].bodyWidget.page && !isPreviousSplit)) {
                    section.childWidgets[i].combineWidget(this.viewer);
                    if (prevSection.lastChild instanceof TableWidget) {
                        this.updateCellHeightInCombinedTable(prevSection.lastChild);
                    }
                    i--;
                    continue;
                }
                prevSection.childWidgets.push(section.childWidgets[i]);
                section.childWidgets[i].containerWidget = prevSection;
                section.childWidgets[i].containerWidget.page = prevSection.page;
                section.childWidgets.splice(0, 1);
                i--;
            }
            section = section.previousRenderedWidget;
        }
        this.documentHelper.removeEmptyPages();
    };
    Layout.prototype.reLayoutMultiColumnBlock = function (section, nextSection, blockIndex) {
        var block = section.firstChild;
        var nextBlock;
        do {
            if (block instanceof TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                && !block.tableFormat.allowAutoFit) {
                block.calculateGrid();
            }
            if (!isNullOrUndefined(block)) {
                this.viewer.updateClientAreaForBlock(block, true, undefined, true);
                nextBlock = this.layoutBlock(block, 0, block.index < blockIndex ? true : false);
                this.viewer.updateClientAreaForBlock(block, false);
                block = nextBlock;
            }
        } while (block && section.getSplitWidgets().indexOf(block.bodyWidget) !== -1);
        block = section.firstChild;
        if (this.viewer instanceof PageLayoutViewer && section.sectionFormat.numberOfColumns > 1 && !isNullOrUndefined(nextSection) && nextSection.sectionFormat.breakCode === 'NoBreak' && (section.sectionFormat.breakCode === 'NoBreak' || (section.sectionIndex === section.page.bodyWidgets[0].sectionIndex))) {
            var splittedSection = section.getSplitWidgets();
            var bodyWidget = splittedSection[splittedSection.length - 1];
            if (this.getColumnBreak(section)) {
                if (section.page !== bodyWidget.page) {
                    this.splitBodyWidgetBasedOnColumn(bodyWidget);
                }
                else {
                    var firstBody = this.getBodyWidget(bodyWidget, true);
                    this.viewer.updateClientArea(firstBody, firstBody.page);
                    var height = this.getNextWidgetHeight(firstBody);
                    this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                    this.viewer.clientActiveArea.y = height;
                }
            }
            else if (!isNullOrUndefined(section.page.nextPage)) {
                this.splitBodyWidgetBasedOnColumn(bodyWidget);
            }
        }
    };
    Layout.prototype.splitBodyWidgetBasedOnColumn = function (section) {
        section = this.getBodyWidget(section, true);
        var firstSection = section;
        this.isMultiColumnSplit = true;
        if (!this.isInitialLoad && section.sectionFormat.equalWidth) {
            var previousStartIndex = this.documentHelper.selection.startOffset;
            var previousEndIndex = this.documentHelper.selection.endOffset;
            this.combineMultiColumn(section);
            this.layoutMultiColumnBody(section, false);
            if (previousStartIndex !== this.documentHelper.selection.startOffset) {
                this.documentHelper.selection.select(previousStartIndex, previousEndIndex);
            }
        }
        this.combineMultiColumn(section);
        var lineCountInfo = this.getCountOrLine(section, undefined, undefined, true);
        var totalHeight = lineCountInfo.lineCount;
        var lineToBeSplit = Math.round(totalHeight / section.sectionFormat.numberOfColumns);
        while (section) {
            var lineCountInfo_1 = this.getCountOrLine(section, lineToBeSplit, true, false);
            var line = lineCountInfo_1.lineWidget;
            var lineIndexInCell = lineCountInfo_1.lineCount;
            if (!isNullOrUndefined(line)) {
                if (line.paragraph.containerWidget instanceof BodyWidget) {
                    this.moveToNextLine(line, true, line.indexInOwner);
                }
                else if (line.paragraph.containerWidget instanceof TableCellWidget) {
                    var table = [line.paragraph.containerWidget.ownerTable];
                    var rows = [line.paragraph.containerWidget.ownerRow];
                    var index = line.paragraph.containerWidget.index;
                    if (table[table.length - 1].isInsideTable) {
                        table[table.length - 1] = this.getParentTable(table[table.length - 1]);
                        rows[rows.length - 1] = this.getParentRow(rows[rows.length - 1]);
                    }
                    this.updateWidgetsToTable(table, rows, rows[rows.length - 1], false, lineIndexInCell, index, true);
                    var tableWidget = table[table.length - 1];
                    var rowWidget = rows[rows.length - 1];
                    var nextRow = rowWidget.nextRenderedWidget;
                    while (nextRow) {
                        this.clearRowWidget(nextRow, true, true, false);
                        nextRow = this.layoutRow(table, nextRow);
                        nextRow = nextRow.nextRenderedWidget;
                    }
                    if (!isNullOrUndefined(tableWidget.nextRenderedWidget) && section.sectionFormat.equalWidth) {
                        this.documentHelper.blockToShift = tableWidget.nextRenderedWidget;
                        this.documentHelper.layout.shiftLayoutedItems(false);
                    }
                }
                var firstBody = this.getBodyWidget(line.paragraph.bodyWidget, true);
                var lastBody = this.getBodyWidget(firstBody, false);
                if (!firstBody.sectionFormat.equalWidth && lastBody.sectionFormat.numberOfColumns - 1 === lastBody.columnIndex && isNullOrUndefined(lastBody.nextSplitWidget)) {
                    var nonEqualBody = firstBody;
                    var initialCount = (this.getCountOrLine(firstBody)).lineCount;
                    this.layoutMultiColumnBody(nonEqualBody, true);
                    var finalCount = (this.getCountOrLine(firstBody)).lineCount;
                    if (initialCount !== finalCount) {
                        this.splitBodyWidgetBasedOnColumn(firstBody);
                    }
                }
                if (isNullOrUndefined(lastBody.nextSplitWidget)) {
                    this.viewer.updateClientArea(firstBody, firstBody.page);
                    var height = this.getNextWidgetHeight(firstBody);
                    this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                    this.viewer.clientActiveArea.y = height;
                    this.viewer.clientArea.y = this.viewer.clientActiveArea.y;
                    this.viewer.clientArea.height = this.viewer.clientActiveArea.height;
                }
            }
            section = section.nextRenderedWidget;
            if (!isNullOrUndefined(section) && section.columnIndex === section.sectionFormat.numberOfColumns - 1) {
                break;
            }
        }
        this.isMultiColumnSplit = false;
        if (!this.isInitialLoad) {
            section = this.getBodyWidget(firstSection, false);
            if (!isNullOrUndefined(section.nextRenderedWidget)) {
                this.documentHelper.blockToShift = section.nextRenderedWidget.firstChild;
            }
        }
    };
    /**
   * @private
   */
    Layout.prototype.getColumnBreak = function (section) {
        var firstBody = this.getBodyWidget(section, true);
        if (firstBody.sectionFormat.numberOfColumns <= 1) {
            return false;
        }
        while (firstBody) {
            if (firstBody.lastChild instanceof ParagraphWidget && firstBody.lastChild.isEndsWithColumnBreak) {
                return true;
            }
            if (isNullOrUndefined(firstBody.nextRenderedWidget) || firstBody.index !== firstBody.nextRenderedWidget.index) {
                break;
            }
            firstBody = firstBody.nextRenderedWidget;
        }
        return false;
    };
    Layout.prototype.layoutMultiColumnBody = function (nonEqualBody, updatePosition) {
        var skipPosition = false;
        while (nonEqualBody) {
            if (!skipPosition) {
                this.viewer.updateClientArea(nonEqualBody, nonEqualBody.page);
                this.viewer.clientActiveArea.height -= nonEqualBody.y - this.viewer.clientActiveArea.y;
                if (nonEqualBody instanceof FootNoteWidget) {
                    this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                    this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                }
                else {
                    this.viewer.clientActiveArea.y = nonEqualBody.y;
                }
            }
            skipPosition = updatePosition ? false : true;
            for (var i = 0; i < nonEqualBody.childWidgets.length; i++) {
                var block = nonEqualBody.childWidgets[i];
                if (block instanceof TableWidget) {
                    this.clearTableWidget(block, true, true, true);
                }
                this.viewer.updateClientAreaForBlock(block, true);
                var isUpdatedList = false;
                if (block instanceof ParagraphWidget && !isNullOrUndefined(block.paragraphFormat)
                    && block.paragraphFormat.listFormat.listId !== -1) {
                    isUpdatedList = block.paragraphFormat.listFormat.listLevelNumber === 0 ? true : false;
                }
                this.layoutBlock(block, 0, isUpdatedList);
                this.viewer.updateClientAreaForBlock(block, false);
            }
            if (nonEqualBody.columnIndex === nonEqualBody.sectionFormat.numberOfColumns - 1 || (!isNullOrUndefined(nonEqualBody.nextRenderedWidget) && nonEqualBody.sectionIndex !== nonEqualBody.nextRenderedWidget.sectionIndex)) {
                break;
            }
            nonEqualBody = nonEqualBody.nextRenderedWidget;
        }
    };
    Layout.prototype.getNextWidgetHeight = function (body) {
        var height = 0;
        var updatedHeight = 0;
        while (body && body.childWidgets.length > 0) {
            var lastChild = body.lastChild;
            if (lastChild instanceof ParagraphWidget && lastChild.isSectionBreak && lastChild.previousRenderedWidget instanceof TableWidget && this.documentHelper.compatibilityMode !== 'Word2013') {
                lastChild = lastChild.previousRenderedWidget;
            }
            height = lastChild.height;
            if (lastChild instanceof TableWidget) {
                height = this.getHeight(lastChild);
            }
            height += lastChild.y;
            if (height > updatedHeight) {
                updatedHeight = height;
            }
            if (!isNullOrUndefined(body) && body.columnIndex === body.sectionFormat.numberOfColumns - 1 || body.sectionFormat.numberOfColumns === 0 || (!isNullOrUndefined(body.nextRenderedWidget) && body.sectionIndex !== body.nextRenderedWidget.sectionIndex)) {
                break;
            }
            body = body.nextRenderedWidget;
        }
        return updatedHeight;
    };
    Layout.prototype.getHeight = function (block) {
        var height = 0;
        for (var i = 0; i < block.childWidgets.length; i++) {
            height += block.childWidgets[i].height;
        }
        return height;
    };
    Layout.prototype.getBookmarkMargin = function (lineWidget) {
        var height = 0;
        for (var i = 0; i < lineWidget.children.length; i++) {
            var element = lineWidget.children[i];
            if (!isNullOrUndefined(element.margin) && element instanceof BookmarkElementBox) {
                height = element.margin.top + element.margin.bottom;
                break;
            }
        }
        return height;
    };
    Layout.prototype.getCountOrLine = function (section, lineToBeSplit, isSplit, getHeight) {
        var totalNoOflines = 0;
        var line;
        var count = 0;
        var skip = false;
        var maxHeight = 0;
        var lineIndexInCell = 0;
        var splitCountLine;
        var lineMargin = 0;
        while (section) {
            for (var i = 0; i < section.childWidgets.length; i++) {
                var block = section.childWidgets[i];
                if (block instanceof ParagraphWidget) {
                    //In ms word last paragraph of body widget is renderd in previous paragraph. So no need to calculate the last para
                    if (block.isSectionBreak) {
                        continue;
                    }
                    for (var j = 0; j < block.childWidgets.length; j++) {
                        var lineWidget = block.childWidgets[j];
                        lineMargin = 0;
                        if (!isNullOrUndefined(lineWidget.margin)) {
                            lineMargin = lineWidget.margin.top + lineWidget.margin.bottom + this.getBookmarkMargin(lineWidget);
                        }
                        if (!isSplit) {
                            totalNoOflines++;
                            maxHeight += lineWidget.height - lineMargin;
                        }
                        else {
                            maxHeight += lineWidget.height - lineMargin;
                            if (Math.round(lineToBeSplit) < Math.round(maxHeight)) {
                                line = block.childWidgets[j];
                                skip = true;
                                count = 0;
                                break;
                            }
                            else {
                                count++;
                            }
                        }
                    }
                }
                else if (block instanceof TableWidget) {
                    splitCountLine = this.getCountOrLineTable(block, lineToBeSplit, isSplit, maxHeight, false, getHeight);
                    if (getHeight) {
                        maxHeight += splitCountLine.lineCount;
                    }
                    else if (!isSplit) {
                        totalNoOflines += splitCountLine.lineCount;
                    }
                    else if (isNullOrUndefined(splitCountLine.lineWidget)) {
                        //  count = splitCountLine.lineCount;
                        maxHeight = splitCountLine.lineCount;
                    }
                    else {
                        line = splitCountLine.lineWidget;
                        lineIndexInCell = splitCountLine.lineCount;
                        skip = true;
                    }
                }
                if (skip && isSplit) {
                    break;
                }
            }
            if (skip && isSplit) {
                break;
            }
            if (!isNullOrUndefined(section.nextRenderedWidget) && section.index !== section.nextRenderedWidget.index) {
                break;
            }
            section = section.nextRenderedWidget;
        }
        if (getHeight) {
            return { lineWidget: undefined, lineCount: maxHeight };
        }
        else if (!isSplit) {
            return { lineWidget: undefined, lineCount: totalNoOflines };
        }
        else {
            return { lineWidget: line, lineCount: lineIndexInCell };
        }
    };
    Layout.prototype.getCountOrLineTable = function (block, lineToBeSplit, isSplit, maxSplitHeight, isNested, getHeight) {
        var lineIndexInCell = 0;
        var skip = false;
        var line;
        var totalNoOflines = 0;
        var totalHeight = 0;
        var minCount = 0;
        var maxCount = 0;
        var minHeight = 0;
        var maxHeight = 0;
        var splitCountLine;
        for (var i = 0; i < block.childWidgets.length; i++) {
            var row = block.childWidgets[i];
            var minCountCell = void 0;
            var maxCountCell = void 0;
            minCount = 0;
            maxCount = 0;
            minHeight = 0;
            maxHeight = 0;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                for (var k = 0; k < cell.childWidgets.length; k++) {
                    var blocks = cell.childWidgets[k];
                    if (blocks instanceof ParagraphWidget && blocks.childWidgets.length > 0) {
                        for (var l = 0; l < blocks.childWidgets.length; l++) {
                            minCount++;
                            minCountCell = cell;
                            minHeight += blocks.childWidgets[l].height;
                        }
                    }
                    else {
                        splitCountLine = this.getCountOrLineTable(blocks, lineToBeSplit, isSplit, maxSplitHeight, true, getHeight);
                        minCount += splitCountLine.lineCount;
                        minHeight += splitCountLine.lineCount;
                    }
                }
                if (maxCount < minCount) {
                    maxCount = minCount;
                    // maxCountCell = minCountCell;
                }
                if (maxHeight < minHeight) {
                    maxHeight = minHeight;
                    maxCountCell = minCountCell;
                }
                minCount = 0;
                minHeight = 0;
            }
            if (!isSplit || isNested) {
                totalNoOflines = totalNoOflines + maxCount;
                totalHeight += maxHeight;
            }
            else {
                var countInCell = 0;
                for (var i_2 = 0; i_2 < maxCountCell.childWidgets.length; i_2++) {
                    var blocks = maxCountCell.childWidgets[i_2];
                    if (blocks instanceof ParagraphWidget) {
                        for (var j = 0; j < blocks.childWidgets.length; j++) {
                            maxSplitHeight += blocks.childWidgets[j].height;
                            if (Math.round(lineToBeSplit) < Math.round(maxSplitHeight)) {
                                line = blocks.childWidgets[j];
                                skip = true;
                                maxSplitHeight = 0;
                                lineIndexInCell = countInCell;
                                break;
                            }
                            else {
                                countInCell++;
                            }
                            if (skip && isSplit) {
                                break;
                            }
                        }
                    }
                    else {
                        splitCountLine = this.getCountOrLineTable(blocks, lineToBeSplit, isSplit, maxSplitHeight, false, getHeight);
                        if (isNullOrUndefined(splitCountLine.lineWidget)) {
                            countInCell += splitCountLine.lineCount;
                            // count = splitCountLine.lineCount;
                            maxSplitHeight += blocks.height;
                        }
                        else {
                            skip = true;
                            maxSplitHeight = 0;
                            line = splitCountLine.lineWidget;
                            countInCell += splitCountLine.lineCount;
                            lineIndexInCell = countInCell;
                            break;
                        }
                    }
                    if (skip && isSplit) {
                        break;
                    }
                }
            }
            maxCount = 0;
            if (skip && isSplit) {
                break;
            }
        }
        if (getHeight) {
            return { lineWidget: undefined, lineCount: totalHeight };
        }
        else if (!isSplit) {
            return { lineWidget: undefined, lineCount: totalNoOflines };
        }
        else if (isSplit && isNullOrUndefined(line) && isNested) {
            return { lineWidget: undefined, lineCount: totalNoOflines };
        }
        else if (isSplit && isNullOrUndefined(line) && !isNested) {
            return { lineWidget: undefined, lineCount: maxSplitHeight };
        }
        else {
            return { lineWidget: line, lineCount: lineIndexInCell };
        }
    };
    /**
       * @private
       */
    Layout.prototype.combineMultiColumn = function (section) {
        section = this.getBodyWidget(section, false);
        while (section && section.columnIndex !== 0) {
            var prevSection = section.previousRenderedWidget;
            if (prevSection.lastChild instanceof ParagraphWidget && prevSection.lastChild.isEndsWithColumnBreak) {
                break;
            }
            var isPreviousSplit = false;
            for (var i = 0; i < section.childWidgets.length; i++) {
                if (section.childWidgets[i] instanceof BlockWidget && !isNullOrUndefined(section.childWidgets[i].previousSplitWidget)
                    && !isNullOrUndefined(section.childWidgets[i].previousSplitWidget.previousSplitWidget)
                    && section.childWidgets[i].previousSplitWidget.bodyWidget.page !== section.childWidgets[i].previousSplitWidget.previousSplitWidget.bodyWidget.page) {
                    isPreviousSplit = true;
                }
                if ((section.childWidgets[i] instanceof BlockWidget && !isNullOrUndefined(section.childWidgets[i].previousSplitWidget) && section.childWidgets[i].previousSplitWidget.bodyWidget.page === section.childWidgets[i].bodyWidget.page && !isPreviousSplit)) {
                    section.childWidgets[i].combineWidget(this.viewer);
                    if (prevSection.lastChild instanceof TableWidget) {
                        this.updateCellHeightInCombinedTable(prevSection.lastChild);
                    }
                    i--;
                    continue;
                }
                prevSection.childWidgets.push(section.childWidgets[i]);
                section.childWidgets[i].containerWidget = prevSection;
                section.childWidgets[i].containerWidget.page = prevSection.page;
                section.childWidgets.splice(0, 1);
                i--;
            }
            section = section.previousRenderedWidget;
        }
        this.documentHelper.removeEmptyPages();
    };
    Layout.prototype.updateCellHeightInCombinedTable = function (tableWidget) {
        var maxCellHeight = 0;
        var minCellHeight = 0;
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var row = tableWidget.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                for (var k = 0; k < cell.childWidgets.length; k++) {
                    minCellHeight += cell.childWidgets[k].height;
                }
                if (minCellHeight > maxCellHeight) {
                    maxCellHeight = minCellHeight;
                }
                minCellHeight = 0;
                for (var a = 0; a < row.childWidgets.length; a++) {
                    row.childWidgets[a].height = maxCellHeight;
                }
            }
            maxCellHeight = 0;
        }
    };
    Layout.prototype.layoutHeaderFooter = function (section, viewer, page) {
        //Header layout
        var headerFooterWidget = viewer.getCurrentPageHeaderFooter(section, true);
        if (headerFooterWidget) {
            var parentHeader = headerFooterWidget;
            if (isNullOrUndefined(headerFooterWidget.page)) {
                headerFooterWidget.page = page;
                headerFooterWidget.height = 0;
                this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
                viewer.updateHFClientArea(section.sectionFormat, true);
                this.layoutHeaderFooterItems(viewer, headerFooterWidget);
            }
            headerFooterWidget = parentHeader.clone();
            headerFooterWidget.parentHeaderFooter = parentHeader;
            this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
            var header = headerFooterWidget;
            header.page = page;
            header.height = 0;
            this.updateRevisionsToHeaderFooter(header, page);
            viewer.updateHFClientArea(section.sectionFormat, true);
            page.headerWidget = this.layoutHeaderFooterItems(viewer, header);
            //this.updateHeaderFooterToParent(header);
            //When the vertical position is related to margin, then it should be adjusted based on the layouted header height. Not default header height.
            if (section.sectionFormat.topMargin < page.boundingRectangle.bottom && page.headerWidget.floatingElements.length > 0 && page.headerWidget.floatingElements[0].textWrappingStyle !== "Behind") {
                page.headerWidget = this.shiftItemsForVerticalAlignment(header);
            }
        }
        //Footer Layout
        headerFooterWidget = viewer.getCurrentPageHeaderFooter(section, false);
        if (headerFooterWidget) {
            var parentHeader = headerFooterWidget;
            if (isNullOrUndefined(headerFooterWidget.page)) {
                headerFooterWidget.page = page;
                headerFooterWidget.height = 0;
                this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
                viewer.updateHFClientArea(section.sectionFormat, false);
                this.layoutHeaderFooterItems(viewer, headerFooterWidget);
            }
            headerFooterWidget = parentHeader.clone();
            headerFooterWidget.parentHeaderFooter = parentHeader;
            this.clearBlockWidget(headerFooterWidget.childWidgets, true, true, true);
            var footer = headerFooterWidget;
            footer.page = page;
            footer.height = 0;
            viewer.updateHFClientArea(section.sectionFormat, false);
            this.updateRevisionsToHeaderFooter(footer, page);
            page.footerWidget = this.layoutHeaderFooterItems(viewer, footer);
        }
    };
    Layout.prototype.shiftItemsForVerticalAlignment = function (headerWidget) {
        var floatingElements = headerWidget.floatingElements;
        for (var i = 0; i < floatingElements.length; i++) {
            var floatingItem = floatingElements[i];
            var verticalOrigin = floatingItem.verticalOrigin;
            var paragraph = floatingItem.paragraph;
            // When a owner paragraph is inside the table, we have to skip the vertical alignment of the floating entity.
            if (verticalOrigin === 'Margin' && !paragraph.isInsideTable) {
                var yPosition = floatingItem.verticalPosition;
                if (yPosition != 0) {
                    yPosition += this.viewer.clientActiveArea.y;
                    var diff = yPosition - floatingItem.y;
                    floatingItem.y = yPosition;
                    if (floatingItem instanceof ShapeElementBox) {
                        for (var j = 0; j < floatingItem.textFrame.childWidgets.length; j++) {
                            var block = floatingItem.textFrame.childWidgets[j];
                            if (block instanceof ParagraphWidget) {
                                block.y = block.y + diff;
                            }
                        }
                    }
                }
            }
        }
        return headerWidget;
    };
    Layout.prototype.updateHeaderFooterToParent = function (node) {
        var sectionIndex = node.page.sectionIndex;
        var typeIndex = this.viewer.getHeaderFooter(node.headerFooterType);
        var clone = node.clone();
        this.documentHelper.headersFooters[sectionIndex][typeIndex] = clone;
        for (var j = 0; j < clone.childWidgets.length; j++) {
            var child = clone.childWidgets[j];
            if (child instanceof TableWidget) {
                this.clearTableWidget(child, false, true);
            }
        }
        return clone;
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Layout.prototype.updateRevisionsToHeaderFooter = function (clone, page) {
        var childWidge = clone.childWidgets;
        if (clone instanceof HeaderFooterWidget && childWidge.length > 0) {
            for (var i = 0; i < childWidge.length; i++) {
                if (childWidge[i].childWidgets.length > 0) {
                    var lineWidge = childWidge[i].childWidgets;
                    for (var j = 0; j < lineWidge.length; j++) {
                        var childrens = lineWidge[j].children;
                        if (childrens) {
                            for (var k = 0; k < childrens.length; k++) {
                                if (childrens[k].removedIds.length > 0) {
                                    var removeId = childrens[k].removedIds;
                                    for (var l = 0; l < removeId.length; l++) {
                                        var revision = this.documentHelper.revisionsInternal.get(removeId[l]);
                                        childrens[k].revisions[l] = revision;
                                        this.updateRevisionRange(revision, page);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Layout.prototype.updateRevisionRange = function (revision, page) {
        for (var i = 0; i < revision.range.length; i++) {
            var inline = revision.range[i];
            if (inline instanceof TextElementBox) {
                if (isNullOrUndefined(inline.line.paragraph.bodyWidget.page)) {
                    inline.line.paragraph.bodyWidget.page = page;
                }
            }
            else if (inline instanceof WCharacterFormat) {
                if (isNullOrUndefined(inline.ownerBase.bodyWidget.page)) {
                    inline.ownerBase.bodyWidget.page = page;
                }
            }
        }
    };
    Layout.prototype.linkFieldInHeaderFooter = function (widget) {
        var firstChild = widget.firstChild;
        do {
            if (firstChild instanceof ParagraphWidget) {
                this.linkFieldInParagraph(firstChild);
            }
            else {
                this.linkFieldInTable(firstChild);
            }
            /* eslint-disable no-cond-assign */
        } while (firstChild = firstChild.nextWidget);
    };
    /**
     * @private
     */
    Layout.prototype.linkFieldInParagraph = function (widget) {
        for (var j = 0; j < widget.childWidgets.length; j++) {
            var line = widget.childWidgets[j];
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof FieldElementBox && (element.fieldType !== 0 || (element.fieldType === 0 &&
                    this.documentHelper.fields.indexOf(element) === -1))) {
                    element.linkFieldCharacter(this.documentHelper);
                }
                if (element instanceof FieldTextElementBox &&
                    !isNullOrUndefined(element.previousElement) &&
                    element.previousElement instanceof FieldElementBox &&
                    element.fieldBegin !== element.previousElement.fieldBegin) {
                    element.fieldBegin = element.previousElement.fieldBegin;
                }
                if (element instanceof ShapeElementBox) {
                    var firstBlock = element.textFrame.firstChild;
                    if (firstBlock) {
                        do {
                            if (firstBlock instanceof ParagraphWidget) {
                                this.linkFieldInParagraph(firstBlock);
                            }
                            else {
                                this.linkFieldInTable(firstBlock);
                            }
                            /* eslint-disable no-cond-assign */
                        } while (firstBlock = firstBlock.nextWidget);
                    }
                }
                else if (element instanceof CommentCharacterElementBox) {
                    var comment = this.getCommentById(this.documentHelper.comments, element.commentId);
                    if (!isNullOrUndefined(comment)) {
                        if (element.commentType === 0) {
                            comment.commentStart = element;
                        }
                        else {
                            comment.commentEnd = element;
                        }
                        element.comment = comment;
                    }
                }
            }
        }
    };
    /**
     * @private
     */
    Layout.prototype.getCommentById = function (commentsCollection, commentId) {
        for (var i = 0; i < commentsCollection.length; i++) {
            var comment = commentsCollection[i];
            if (comment.commentId === commentId) {
                return comment;
            }
        }
        return undefined;
    };
    Layout.prototype.linkFieldInTable = function (widget) {
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var row = widget.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                for (var k = 0; k < cell.childWidgets.length; k++) {
                    var block = cell.childWidgets[k];
                    if (block instanceof ParagraphWidget) {
                        this.linkFieldInParagraph(block);
                    }
                    else {
                        this.linkFieldInTable(block);
                    }
                }
            }
        }
    };
    Layout.prototype.layoutHeaderFooterItems = function (viewer, widget) {
        this.viewer.updateClientAreaLocation(widget, viewer.clientActiveArea);
        if (widget.childWidgets.length === 0) {
            var pargaraph = new ParagraphWidget();
            var line = new LineWidget(pargaraph);
            pargaraph.childWidgets.push(line);
            widget.childWidgets.push(pargaraph);
            pargaraph.containerWidget = widget;
        }
        this.linkFieldInHeaderFooter(widget);
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var block = widget.childWidgets[i];
            if (block instanceof TableWidget && block.tableFormat.preferredWidthType === 'Auto'
                && !block.tableFormat.allowAutoFit && !block.isGridUpdated) {
                block.calculateGrid();
            }
            viewer.updateClientAreaForBlock(block, true);
            this.layoutBlock(block, 0);
            viewer.updateClientAreaForBlock(block, false);
        }
        var type = widget.headerFooterType;
        if (type === 'OddFooter' || type === 'EvenFooter' || type === 'FirstPageFooter') {
            this.shiftChildLocation(viewer.clientArea.y - viewer.clientActiveArea.y, widget);
        }
        return widget;
    };
    Layout.prototype.shiftChildLocation = function (shiftTop, bodyWidget) {
        var widgetTop = bodyWidget.y + shiftTop;
        var footerMaxHeight = bodyWidget.page.boundingRectangle.height - (bodyWidget.page.boundingRectangle.height / 100) * 40;
        widgetTop = Math.max(widgetTop, footerMaxHeight);
        shiftTop = widgetTop - bodyWidget.y;
        var childTop = bodyWidget.y = widgetTop;
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            var childWidget = bodyWidget.childWidgets[i];
            if (childWidget instanceof ParagraphWidget) {
                childWidget.x = childWidget.x;
                childWidget.y = i === 0 ? childWidget.y + shiftTop : childTop;
                childTop += childWidget.height;
                for (var j = 0; j < childWidget.childWidgets.length; j++) {
                    var widget = childWidget.childWidgets[j];
                    for (var k = 0; k < widget.children.length; k++) {
                        var element = widget.children[k];
                        if (element instanceof ShapeBase && element.textWrappingStyle !== "Inline") {
                            if (element.verticalOrigin === "Paragraph" || element.verticalOrigin === "Line") {
                                element.y = childWidget.y + element.verticalPosition;
                            }
                            else {
                                var position = this.getFloatingItemPoints(element);
                                element.y = position.y;
                            }
                            if (element instanceof ShapeElementBox) {
                                var topMargin = element.textFrame.marginTop;
                                this.updateChildLocationForCellOrShape(element.y + topMargin, element);
                            }
                        }
                    }
                }
            }
            else {
                this.shiftChildLocationForTableWidget(childWidget, shiftTop);
                childTop += childWidget.height;
            }
        }
    };
    Layout.prototype.shiftChildLocationForTableWidget = function (tableWidget, shiftTop) {
        tableWidget.y = tableWidget.y + shiftTop;
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var childWidget = tableWidget.childWidgets[i];
            if (childWidget instanceof TableRowWidget) {
                this.shiftChildLocationForTableRowWidget(childWidget, shiftTop);
            }
        }
    };
    Layout.prototype.shiftChildLocationForTableRowWidget = function (rowWidget, shiftTop) {
        rowWidget.y = rowWidget.y + shiftTop;
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            this.shiftChildLocationForTableCellWidget(rowWidget.childWidgets[i], shiftTop);
        }
    };
    Layout.prototype.shiftChildLocationForTableCellWidget = function (cellWidget, shiftTop) {
        cellWidget.y = cellWidget.y + shiftTop;
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                cellWidget.childWidgets[i].x = cellWidget.childWidgets[i].x;
                cellWidget.childWidgets[i].y = cellWidget.childWidgets[i].y + shiftTop;
            }
            else {
                this.shiftChildLocationForTableWidget(cellWidget.childWidgets[i], shiftTop);
            }
        }
    };
    Layout.prototype.layoutBlock = function (block, index, isUpdatedList) {
        var nextBlock;
        if (block instanceof ParagraphWidget) {
            if (this.isInitialLoad || (!this.isRelayout && block.paragraphFormat.bidi && this.isDocumentContainsRtl)) {
                block.splitTextRangeByScriptType(0);
                block.splitLtrAndRtlText(0);
                block.combineconsecutiveRTL(0);
            }
            nextBlock = this.layoutParagraph(block, index, isUpdatedList);
            var nextBlockToLayout = this.checkAndRelayoutPreviousOverlappingBlock(block);
            if (nextBlockToLayout) {
                nextBlock = nextBlockToLayout;
            }
            // this.updateLinearIndex(block);
            // if (block != nextBlock) {
            //     this.updateLinearIndex(nextBlock);
            // }
        }
        else {
            nextBlock = this.layoutTable(block, index);
            this.checkAndRelayoutPreviousOverlappingBlock(block);
            this.updateTableYPositionBasedonTextWrap(nextBlock);
        }
        return nextBlock.nextRenderedWidget;
    };
    // /**
    //  * @private
    //  */
    // private updateLinearIndex(block: BlockWidget, skipParaMark?: boolean): void {
    //     if (!isNullOrUndefined(block) && block instanceof ParagraphWidget) {
    //         let splittedWidgets = block.getSplitWidgets();
    //         (splittedWidgets[0] as ParagraphWidget).length = block.getTotalLength();
    //     }
    // }
    Layout.prototype.updateTableYPositionBasedonTextWrap = function (table) {
        var _this = this;
        if (!isNullOrUndefined(table.bodyWidget) && !(table.containerWidget instanceof TextFrame)) {
            var tableY_1 = table.y;
            var tableRect_1 = new Rect(table.x, table.y, table.width, table.height);
            table.bodyWidget.floatingElements.forEach(function (shape) {
                if (shape instanceof ShapeElementBox && !shape.paragraph.isInsideTable) {
                    var shapeRect = new Rect(shape.x, shape.y, shape.width, shape.height);
                    var considerShape = (shape.textWrappingStyle === 'TopAndBottom' || shape.textWrappingStyle === 'Square');
                    if (considerShape && tableRect_1.isIntersecting(shapeRect)) {
                        table.y = shape.y + shape.height + shape.distanceBottom;
                        _this.updateChildLocationForTable(table.y, table);
                        var height = table.y - tableY_1;
                        _this.viewer.cutFromTop(_this.viewer.clientActiveArea.y + height);
                    }
                }
            });
        }
    };
    Layout.prototype.shiftWrapStyle = function (element) {
        return element.textWrappingStyle === 'InFrontOfText' || element.textWrappingStyle === 'Behind' || element.textWrappingStyle === 'Inline';
    };
    Layout.prototype.checkAndRelayoutPreviousOverlappingBlock = function (block) {
        if (!(block.containerWidget instanceof TextFrame) && !this.isRelayoutOverlap) {
            var preivousBlock = block.previousWidget;
            if (block instanceof ParagraphWidget) {
                if (block.floatingElements.length > 0) {
                    var height = 0;
                    for (var i = 0; i < block.floatingElements.length; i++) {
                        var element = block.floatingElements[i];
                        if (this.shiftWrapStyle(element)) {
                            continue;
                        }
                        var shapeRect = new Rect(element.x, element.y, element.width, element.height);
                        while (preivousBlock) {
                            // if height exceeds the client area height. then the paragraph belongs to previous page.
                            // So, we need to skip relayouting overlapping widgets.
                            // Adding this condition for row splitting to multiple page scenario.
                            if (block.isInsideTable && height > this.viewer.clientArea.height) {
                                this.startOverlapWidget = undefined;
                                this.endOverlapWidget = undefined;
                                break;
                            }
                            if (preivousBlock instanceof ParagraphWidget) {
                                var paraRect = new Rect(preivousBlock.x, preivousBlock.y, preivousBlock.width, preivousBlock.height);
                                if (shapeRect.isIntersecting(paraRect) &&
                                    this.startOverlapWidget !== preivousBlock) {
                                    this.startOverlapWidget = preivousBlock;
                                    this.endOverlapWidget = block;
                                }
                            }
                            height += preivousBlock.height;
                            preivousBlock = preivousBlock.previousWidget;
                        }
                        preivousBlock = block.previousWidget;
                    }
                }
                else {
                    var widget = block.getSplitWidgets();
                    if (widget) {
                        return widget[widget.length - 1];
                    }
                }
            }
            else {
                var table = block;
                if (!table.wrapTextAround) {
                    return table;
                }
                var tableRect = new Rect(table.x, table.y, table.getTableCellWidth(), table.height);
                while (preivousBlock) {
                    if (preivousBlock instanceof ParagraphWidget) {
                        var blockRect = new Rect(preivousBlock.x, preivousBlock.y, preivousBlock.width, preivousBlock.height);
                        if (tableRect.isIntersecting(blockRect) &&
                            this.startOverlapWidget !== preivousBlock) {
                            this.startOverlapWidget = preivousBlock;
                            this.endOverlapWidget = block;
                        }
                    }
                    preivousBlock = preivousBlock.previousWidget;
                }
                preivousBlock = block.previousWidget;
            }
            if (block instanceof ParagraphWidget && block.containerWidget instanceof BodyWidget && block.floatingElements.length > 0 && !this.shiftWrapStyle(block.floatingElements[0]) && block.containerWidget.firstChild != block && block.y + block.floatingElements[0].height > this.viewer.clientArea.bottom) {
                var previousBlock = block.previousWidget;
                if (previousBlock && previousBlock instanceof ParagraphWidget && (previousBlock.y + previousBlock.height + this.getLineHeigth(block, block.floatingElements[0].line) + block.floatingElements[0].height) > this.viewer.clientArea.bottom) {
                    this.moveToNextPage(this.viewer, block.floatingElements[0].line, false, false, true);
                    this.startOverlapWidget = block;
                    this.endOverlapWidget = block;
                }
            }
            if (this.startOverlapWidget) {
                this.isRelayoutOverlap = true;
                this.skipRelayoutOverlap = true;
                this.layoutStartEndBlocks(this.startOverlapWidget, block);
                this.isRelayoutOverlap = false;
                this.skipRelayoutOverlap = false;
            }
            this.startOverlapWidget = undefined;
            this.endOverlapWidget = undefined;
        }
        return block;
    };
    Layout.prototype.getLineHeigth = function (paragraph, line) {
        var height = 0;
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            if (line != paragraph.childWidgets[i]) {
                height += paragraph.childWidgets[i].height;
            }
        }
        return height;
    };
    Layout.prototype.addParagraphWidget = function (area, paragraphWidget) {
        // const ownerParaWidget: ParagraphWidget = undefined;
        if (paragraphWidget.isEmpty() && !isNullOrUndefined(paragraphWidget.paragraphFormat) &&
            (paragraphWidget.paragraphFormat.textAlignment === 'Center' || paragraphWidget.paragraphFormat.textAlignment === 'Right'
                || (paragraphWidget.paragraphFormat.textAlignment === 'Justify' && paragraphWidget.paragraphFormat.bidi))
            && paragraphWidget.paragraphFormat.listFormat.listId === -1) {
            this.updateXPositionForEmptyParagraph(area, paragraphWidget);
            paragraphWidget.y = area.y;
        }
        else {
            if (this.viewer.clientActiveArea.width <= 0 && this.viewer instanceof WebLayoutViewer) {
                paragraphWidget.x = this.previousPara;
            }
            else {
                paragraphWidget.x = area.x;
                this.previousPara = paragraphWidget.x;
            }
            paragraphWidget.width = area.width;
            paragraphWidget.y = area.y;
            paragraphWidget.clientX = undefined;
            if (paragraphWidget.hasOwnProperty('absoluteXPosition')) {
                delete paragraphWidget['absoluteXPosition'];
            }
        }
        return paragraphWidget;
    };
    // update the x position for bidi empty paragraph.
    Layout.prototype.updateXPositionForEmptyParagraph = function (area, paragraph) {
        if (paragraph.isEmpty() && !isNullOrUndefined(paragraph.paragraphFormat)) {
            // const top: number = 0;
            // const bottom: number = 0;
            var width = this.documentHelper.textHelper.getParagraphMarkWidth(paragraph.characterFormat);
            paragraph.clientX = area.x;
            var left = area.x;
            paragraph['absoluteXPosition'] = { 'width': area.width, 'x': area.x };
            if (paragraph.paragraphFormat.textAlignment === 'Center') {
                left += (area.width - width) / 2;
            }
            else {
                left += area.width - width;
            }
            paragraph.width = width;
            paragraph.x = left;
        }
    };
    Layout.prototype.addLineWidget = function (paragraphWidget) {
        var line = undefined;
        line = new LineWidget(paragraphWidget);
        line.width = paragraphWidget.width;
        paragraphWidget.childWidgets.push(line);
        line.paragraph = paragraphWidget;
        return line;
    };
    Layout.prototype.isFirstElementWithPageBreak = function (paragraphWidget) {
        var isPageBreak = false;
        if (this.viewer instanceof PageLayoutViewer) {
            var lineWidget = paragraphWidget.childWidgets[0];
            if (lineWidget) {
                var element = lineWidget.children[0];
                while (element) {
                    if (element instanceof BookmarkElementBox && element.name.indexOf('_') >= 0) {
                        element = element.nextElement;
                        continue;
                    }
                    if (element instanceof TextElementBox && (element.text === '\f' || element.text === String.fromCharCode(14))) {
                        isPageBreak = true;
                    }
                    break;
                }
            }
        }
        return isPageBreak;
    };
    /**
     * Layouts specified paragraph.
     *
     * @private
     * @param footnote
     */
    Layout.prototype.layoutfootNote = function (footnote) {
        if (this.documentHelper.owner.layoutType === 'Pages') {
            var pageIndex = footnote.page.index;
            var clientActiveArea = this.viewer.clientActiveArea.clone();
            var clientArea = this.viewer.clientArea.clone();
            if (footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1 && !this.isInitialLoad) {
                this.updateColumnIndex(footnote.bodyWidgets[0], false);
                this.layoutMultiColumnBody(footnote.bodyWidgets[0], true);
            }
            if (footnote.footNoteType === 'Endnote' && footnote.bodyWidgets[0].sectionFormat.numberOfColumns > 1) {
                if (!this.isInitialLoad) {
                    this.updateColumnIndex(footnote.bodyWidgets[0], false);
                }
                this.layoutMultiColumnBody(footnote.bodyWidgets[0], true);
                this.viewer.clientActiveArea = clientActiveArea;
            }
            var clientWidth = 0;
            if (footnote.sectionFormat.columns.length > 1 && footnote.footNoteType === 'Footnote') {
                this.viewer.updateClientArea(footnote, footnote.page);
                clientWidth = this.viewer.clientActiveArea.width;
            }
            if (footnote.footNoteType === 'Footnote') {
                this.viewer.updateFootnoteClientArea(footnote.sectionFormat, footnote);
                if (footnote.sectionFormat.columns.length > 1) {
                    this.viewer.clientActiveArea.width = clientWidth;
                    this.viewer.clientArea.width = clientWidth;
                }
            }
            footnote.height = 0;
            var block = void 0;
            var height = 0;
            this.isRelayoutFootnote = false;
            var index = 0;
            //        this.isfoot = true;
            /* eslint-disable-next-line max-len */
            if (this.viewer instanceof PageLayoutViewer && footnote.bodyWidgets.length > 0 && ((footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1) || (footnote.footNoteType === 'Endnote' && footnote.bodyWidgets[0].sectionFormat.columns.length > 1))) {
                if (this.isLayoutWhole) {
                    this.updateColumnIndex(footnote.bodyWidgets[0], false);
                }
                this.splitFootNoteWidgetBasedOnColumn(footnote.bodyWidgets[0]);
            }
            var footBody = footnote.bodyWidgets[0];
            var clientX = 0;
            for (var i = 0; i < footnote.bodyWidgets.length; i++) {
                if (footnote.bodyWidgets[i].columnIndex !== footBody.columnIndex && ((footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1) || (footnote.footNoteType === 'Endnote' && footnote.bodyWidgets[i].sectionFormat.columns.length > 1))) {
                    this.viewer.updateClientArea(footnote.bodyWidgets[i], footnote.bodyWidgets[i].page);
                    clientWidth = this.viewer.clientActiveArea.width;
                    clientX = this.viewer.clientActiveArea.x;
                    if (footnote.footNoteType === 'Footnote') {
                        this.viewer.updateFootnoteClientArea(footnote.sectionFormat, footnote);
                    }
                    this.viewer.clientActiveArea.x = clientX;
                    this.viewer.clientArea.x = clientX;
                    this.viewer.clientActiveArea.width = clientWidth;
                    this.viewer.clientArea.width = clientWidth;
                    this.viewer.cutFromTop(footnote.y + height);
                }
                if (i === 0) {
                    var newPara = new ParagraphWidget();
                    newPara.characterFormat = new WCharacterFormat();
                    newPara.paragraphFormat = new WParagraphFormat();
                    newPara.index = 0;
                    var lineWidget = new LineWidget(newPara);
                    newPara.childWidgets.push(lineWidget);
                    height = this.documentHelper.textHelper.getParagraphMarkSize(newPara.characterFormat).Height;
                    footnote.height += height;
                    footnote.y = this.viewer.clientActiveArea.y;
                    if (footnote.footNoteType === 'Endnote') {
                        this.viewer.updateClientArea(footnote.bodyWidgets[i], footnote.bodyWidgets[i].page, true);
                    }
                    this.viewer.cutFromTop(footnote.y + height);
                    footnote.margin = new Margin(0, height, 0, 0);
                }
                index = footnote.footNoteType === 'Endnote' ? 0 : index;
                for (var j = 0; j < footnote.bodyWidgets[i].childWidgets.length; j++) {
                    block = footnote.bodyWidgets[i].childWidgets[j];
                    if (footnote.footNoteType === 'Footnote' || footnote.bodyWidgets[i].getSplitWidgets().length === 1) {
                        block.index = index;
                        index++;
                    }
                    block.containerWidget = footnote.bodyWidgets[i];
                    block.containerWidget.page = footnote.page;
                    block.containerWidget.containerWidget = footnote;
                    // paragraph.index = i > 1 ? i - 1 : 0;
                    this.viewer.updateClientAreaForBlock(block, true);
                    if (block instanceof TableWidget) {
                        this.clearTableWidget(block, true, true, true);
                        this.isRelayoutFootnote = true;
                        if (footnote.footNoteType === 'Footnote') {
                            this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                            this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                        }
                    }
                    this.layoutBlock(block, 0);
                    if (isNullOrUndefined(footnote.bodyWidgets[i])) {
                        break;
                    }
                    if (footnote.bodyWidgets[i].columnIndex === footBody.columnIndex) {
                        footnote.height += block.height;
                    }
                    this.viewer.updateClientAreaForBlock(block, false);
                }
                footBody = footnote.bodyWidgets[i];
            }
            if (footnote.sectionFormat.columns.length > 1) {
                var footHeight = this.getFootNoteBodyHeight(footnote.bodyWidgets[0]);
                footnote.height = footHeight + height;
            }
            if (footnote.footNoteType === 'Footnote') {
                this.shiftChildWidgetInFootnote(footnote);
            }
            if (footnote.footNoteType === 'Footnote' && footnote.sectionFormat.columns.length > 1 && footnote.page.bodyWidgets[footnote.page.bodyWidgets.length - 1].sectionFormat.columns.length > 1) {
                var section = this.getBodyWidget(footnote.page.bodyWidgets[footnote.page.bodyWidgets.length - 1], true);
                var height_2 = this.getNextWidgetHeight(section);
                if (height_2 > footnote.y) {
                    this.footnoteHeight = footnote.height;
                    var isLayoutWhole = this.isLayoutWhole;
                    this.isLayoutWhole = false;
                    this.layoutMultiColumnBody(section, true);
                    this.isLayoutWhole = isLayoutWhole;
                }
            }
            this.viewer.clientActiveArea = clientActiveArea;
            this.viewer.clientArea = clientArea;
            if (!this.islayoutFootnote) {
                if (this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height > footnote.y) {
                    this.viewer.clientActiveArea.height -= footnote.height;
                    var sub = (this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height - footnote.y);
                    this.viewer.clientActiveArea.height -= sub;
                }
            }
            if (footnote.footNoteType === 'Endnote') {
                var endnote = undefined;
                if (!isNullOrUndefined(footnote.page.nextPage) && !isNullOrUndefined(footnote.page.nextPage.endnoteWidget)) {
                    endnote = footnote.page.nextPage.endnoteWidget;
                }
                else if (footnote.page.index !== pageIndex) {
                    endnote = footnote;
                }
                if (!isNullOrUndefined(endnote)) {
                    var lastBodyWidget = this.getBodyWidget(endnote.page.bodyWidgets[endnote.page.bodyWidgets.length - 1], true);
                    this.viewer.updateClientArea(lastBodyWidget, lastBodyWidget.page);
                    this.layoutfootNote(endnote);
                }
            }
        }
        this.footnoteHeight = 0;
        return footnote;
    };
    Layout.prototype.getFootNoteBodyHeight = function (section) {
        var height = 0;
        while (section) {
            if (section.columnIndex !== 0) {
                break;
            }
            for (var i = 0; i < section.childWidgets.length; i++) {
                height += section.childWidgets[i].height;
            }
            section = section.nextRenderedWidget;
        }
        return height;
    };
    Layout.prototype.splitFootNoteWidgetBasedOnColumn = function (section) {
        var lineCountInfo = this.getCountOrLine(section, undefined, undefined, true);
        var totalHeight = lineCountInfo.lineCount;
        var lineToBeSplit = Math.round(totalHeight / section.sectionFormat.numberOfColumns);
        while (section) {
            var lineCountInfo_2 = this.getCountOrLine(section, lineToBeSplit, true, false);
            var clientActiveArea = this.viewer.clientActiveArea.clone();
            var clientArea = this.viewer.clientArea.clone();
            if (lineCountInfo_2.lineWidget.paragraph.indexInOwner === 0 && lineCountInfo_2.lineWidget.indexInOwner === 0) {
                this.updateColumnIndex(lineCountInfo_2.lineWidget.paragraph.bodyWidget, true);
            }
            else {
                this.splitParagraph(lineCountInfo_2.lineWidget.paragraph, lineCountInfo_2.lineWidget.indexInOwner, undefined);
                var nextBody = this.moveBlocksToNextPage(lineCountInfo_2.lineWidget.paragraph.previousRenderedWidget);
                this.viewer.clientActiveArea = clientActiveArea;
                this.viewer.clientArea = clientArea;
                if (!isNullOrUndefined(nextBody.nextRenderedWidget)) {
                    this.updateColumnIndex(nextBody.nextRenderedWidget, true);
                }
            }
            if (lineCountInfo_2.lineWidget.paragraph.bodyWidget.columnIndex === lineCountInfo_2.lineWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns - 1) {
                break;
            }
            section = section.nextRenderedWidget;
        }
    };
    Layout.prototype.updateColumnIndex = function (section, increase) {
        while (section) {
            if (increase) {
                section.columnIndex++;
            }
            else {
                section.columnIndex = 0;
            }
            section = section.nextRenderedWidget;
        }
    };
    Layout.prototype.shiftChildWidgetInFootnote = function (footnote) {
        var page = footnote.page;
        var yPosition = footnote.y - footnote.height;
        if (page.bodyWidgets[0].childWidgets.length === 1 && page.bodyWidgets[0].firstChild) {
            var startY = page.bodyWidgets[0].firstChild.y;
            var bodyWidgetHeight = this.getBodyWidgetHeight(page.bodyWidgets[0]);
            if (yPosition < startY + bodyWidgetHeight) {
                yPosition = startY + bodyWidgetHeight;
            }
        }
        footnote.y = yPosition;
        yPosition += footnote.margin.top;
        var multiColumnY = yPosition;
        var columnBody = footnote.bodyWidgets[0];
        for (var i = 0; i < footnote.bodyWidgets.length; i++) {
            if (footnote.bodyWidgets[i].columnIndex !== columnBody.columnIndex) {
                yPosition = multiColumnY;
            }
            columnBody = footnote.bodyWidgets[i];
            for (var j = 0; j < footnote.bodyWidgets[i].childWidgets.length; j++) {
                var childWidget = footnote.bodyWidgets[i].childWidgets[j];
                if (childWidget instanceof ParagraphWidget) {
                    childWidget.y = yPosition;
                    yPosition += childWidget.height;
                }
                else {
                    this.shiftChildLocationForTableWidget(childWidget, yPosition - childWidget.y);
                    yPosition += childWidget.height;
                }
            }
        }
    };
    /**
       * @private
       */
    Layout.prototype.getBodyWidgetHeight = function (bodyWidget) {
        var height = 0;
        for (var i = 0; i < bodyWidget.childWidgets.length; i++) {
            height += bodyWidget.childWidgets[i].height;
        }
        return height;
    };
    // Check whether the block has the field separator or field end of the field begin.
    Layout.prototype.checkBlockHasField = function (block) {
        if (block instanceof ParagraphWidget) {
            for (var _i = 0, _a = block.childWidgets; _i < _a.length; _i++) {
                var lineWidget = _a[_i];
                for (var _b = 0, _c = lineWidget.children; _b < _c.length; _b++) {
                    var element = _c[_b];
                    if (element instanceof FieldElementBox && (element.fieldType === 2 || element.fieldType === 1)) {
                        if (this.documentHelper.fieldStacks.length > 0 && element.fieldBegin === this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1]) {
                            return true;
                        }
                    }
                }
            }
        }
        else {
            return this.checkTableHasField(block);
        }
        return false;
    };
    // Check whether the table has the field separator or field end of the field begin.
    Layout.prototype.checkTableHasField = function (table) {
        for (var _i = 0, _a = table.childWidgets; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, _c = row.childWidgets; _b < _c.length; _b++) {
                var cell = _c[_b];
                for (var _d = 0, _e = cell.childWidgets; _d < _e.length; _d++) {
                    var block = _e[_d];
                    if (this.checkBlockHasField(block)) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    Layout.prototype.layoutParagraph = function (paragraph, lineIndex, isUpdatedList) {
        if (this.isFieldCode && !this.checkBlockHasField(paragraph)) {
            if (paragraph.childWidgets.length === 0) {
                this.addLineWidget(paragraph);
            }
            paragraph.isFieldCodeBlock = true;
            return paragraph;
        }
        else if (paragraph.isSectionBreak && paragraph.previousRenderedWidget instanceof TableWidget && this.documentHelper.compatibilityMode !== 'Word2013') {
            // If compatibility mode is not 2013 the MS word will not render the last paragraph if the previous widget is table. 
            return paragraph;
        }
        paragraph.x = 0;
        paragraph.textWrapWidth = false;
        this.addParagraphWidget(this.viewer.clientActiveArea, paragraph);
        var isListLayout = true;
        var isFirstElmIsparagraph = this.isFirstElementWithPageBreak(paragraph);
        if (!isFirstElmIsparagraph) {
            this.layoutListItems(paragraph, isUpdatedList);
            isListLayout = false;
        }
        if (paragraph.isEmptyInternal(true) && !this.checkIsFieldParagraph(paragraph)) {
            this.layoutEmptyLineWidget(paragraph, true);
        }
        else {
            var line = lineIndex < paragraph.childWidgets.length ?
                paragraph.childWidgets[lineIndex] : undefined;
            if (!this.isRelayoutOverlap && !(paragraph.containerWidget instanceof TextFrame)) {
                this.layoutFloatElements(paragraph);
            }
            while (line instanceof LineWidget) {
                if (paragraph !== line.paragraph && line.indexInOwner === 0 && isListLayout) {
                    if (line.previousLine.isEndsWithColumnBreak) {
                        this.viewer.updateClientAreaForBlock(paragraph, true);
                        this.layoutListItems(line.paragraph);
                        this.viewer.updateClientAreaForBlock(paragraph, false);
                    }
                    else {
                        this.layoutListItems(line.paragraph);
                    }
                }
                if (line.isFirstLine() && isNullOrUndefined(this.fieldBegin)) {
                    if (!isNullOrUndefined(paragraph.paragraphFormat)) {
                        var firstLineIndent = -HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
                        this.viewer.updateClientWidth(firstLineIndent);
                    }
                }
                line.marginTop = 0;
                //let bodyIndex: number = line.paragraph.bodyWidget.indexInOwner;
                // if (!this.isInitialLoad && !this.isBidiReLayout && this.isContainsRtl(line)) {
                //     this.reArrangeElementsForRtl(line, paragraph.paragraphFormat.bidi);
                // }
                line = this.layoutLine(line, 0);
                // if (!line.paragraph.isInsideTable && bodyIndex !== line.paragraph.containerWidget.indexInOwner) {
                //     line = undefined;
                // }
                // else {
                paragraph = line.paragraph;
                line = line.nextLine;
                // }
            }
        }
        this.updateWidgetToPage(this.viewer, paragraph);
        paragraph.isLayouted = true;
        // this.updateLinearIndex(paragraph);
        paragraph.isFieldCodeBlock = false;
        return paragraph;
    };
    Layout.prototype.checkIsFieldParagraph = function (paragraph) {
        if (isNullOrUndefined(paragraph.childWidgets) || paragraph.childWidgets.length === 0) {
            return false;
        }
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            var line = paragraph.childWidgets[i];
            for (var j = 0; j < line.children.length; j++) {
                var element = line.children[j];
                if (element instanceof FieldElementBox && element.hasFieldEnd) {
                    return true;
                }
            }
        }
        return false;
    };
    Layout.prototype.clearLineMeasures = function () {
        this.maxBaseline = 0;
        this.maxTextBaseline = 0;
        this.maxTextHeight = 0;
    };
    Layout.prototype.layoutFloatElements = function (paragraph) {
        var _this = this;
        paragraph.floatingElements.forEach(function (shape) {
            if (shape instanceof ShapeBase && shape.textWrappingStyle !== 'Inline') {
                if (!_this.isRelayoutOverlap) {
                    _this.layoutShape(shape);
                }
            }
        });
    };
    Layout.prototype.layoutShape = function (element) {
        if (element instanceof ShapeElementBox && element.isHorizontalRule) {
            return;
        }
        if (element.textWrappingStyle !== 'Inline') {
            var position = this.getFloatingItemPoints(element);
            element.x = position.x;
            element.y = position.y;
            if (!element.paragraph.isInsideTable && element.paragraph.indexInOwner !== 0 && element.verticalPosition >= 0 && Math.round(element.paragraph.y) >= Math.round(element.y) && this.viewer.clientArea.bottom <= element.y + element.height && (element.verticalOrigin == "Line" || element.verticalOrigin == "Paragraph") && element.textWrappingStyle !== "InFrontOfText" && element.textWrappingStyle !== "Behind") {
                this.moveToNextPage(this.viewer, element.line);
                this.updateShapeBaseLocation(element.line.paragraph);
            }
            var bodyWidget = element.paragraph.bodyWidget;
            if (bodyWidget.floatingElements.indexOf(element) === -1) {
                bodyWidget.floatingElements.push(element);
                /* eslint:disable */
                bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
            }
            if (element.paragraph.floatingElements.indexOf(element) === -1) {
                element.paragraph.floatingElements.push(element);
            }
        }
        else {
            if (element.width === 0 && element.widthScale !== 0) {
                var containerWidth = HelperMethods.convertPointToPixel(element.line.paragraph.getContainerWidth());
                element.width = (containerWidth / 100) * element.widthScale;
            }
        }
        var clientArea = this.viewer.clientArea;
        var clientActiveArea = this.viewer.clientActiveArea;
        if (element instanceof ShapeElementBox) {
            var blocks = element.textFrame.childWidgets;
            this.viewer.updateClientAreaForTextBoxShape(element, true);
            for (var i = 0; i < blocks.length; i++) {
                var block = blocks[i];
                this.viewer.updateClientAreaForBlock(block, true);
                if (block instanceof TableWidget) {
                    this.clearTableWidget(block, true, true);
                }
                this.layoutBlock(block, 0);
                this.viewer.updateClientAreaForBlock(block, false);
            }
        }
        this.viewer.clientActiveArea = clientActiveArea;
        this.viewer.clientArea = clientArea;
    };
    Layout.prototype.moveElementFromNextLine = function (line) {
        var nextLine = line.nextLine;
        if (nextLine && !line.paragraph.bodyWidget.sectionFormat.equalWidth && line.paragraph.bodyWidget.columnIndex !== nextLine.paragraph.bodyWidget.columnIndex) {
            nextLine = undefined;
        }
        while (nextLine instanceof LineWidget) {
            if (nextLine.children.length > 0) {
                var element = nextLine.children.splice(0, 1)[0];
                line.children.push(element);
                element.line = line;
                break;
            }
            else {
                if (nextLine.paragraph.childWidgets.length === 1) {
                    nextLine.paragraph.destroy();
                }
                else {
                    nextLine.paragraph.childWidgets.splice(nextLine.paragraph.childWidgets.indexOf(nextLine), 1);
                }
                nextLine = line.nextLine;
            }
        }
    };
    Layout.prototype.layoutLine = function (line, count) {
        var paragraph = line.paragraph;
        if (line.children.length === 0) {
            this.moveElementFromNextLine(line);
        }
        var element = line.children[count];
        var isNotEmptyField = true;
        if (element instanceof FieldElementBox && line.children[line.children.length - 1] instanceof FieldElementBox) {
            isNotEmptyField = false;
            for (var i = 0; i < line.children.length; i++) {
                if (line.children[i].fieldType == 2 && line.children[i].nextElement != undefined && !(line.children[i].nextElement instanceof FieldElementBox)) {
                    isNotEmptyField = true;
                    break;
                }
            }
        }
        this.clearLineMeasures();
        line.marginTop = 0;
        var bodyIndex = paragraph.bodyWidget.indexInOwner;
        var lineIndex = line.indexInOwner;
        while (element instanceof ElementBox) {
            if (!(element instanceof ListTextElementBox)) {
                element.padding.left = 0;
            }
            if (!isNotEmptyField) {
                this.layoutElement(element, paragraph, true);
                isNotEmptyField = true;
            }
            else {
                this.layoutElement(element, paragraph);
            }
            line = element.line;
            if (element instanceof TextElementBox) {
                var textElement = element;
                if (!isNullOrUndefined(textElement.errorCollection) && textElement.errorCollection.length > 0) {
                    textElement.ischangeDetected = true;
                }
            }
            if (!this.isRTLLayout) {
                var lineIndex_1 = paragraph.childWidgets.indexOf(element.line);
                if (lineIndex_1 > 0 && this.hasFloatingElement) {
                    this.hasFloatingElement = false;
                    if (paragraph.bodyWidget.floatingElements.length > 0 && element instanceof TextElementBox && !(paragraph.containerWidget instanceof TableCellWidget)) {
                        element = paragraph.childWidgets[lineIndex_1].children[0];
                    }
                }
                else {
                    this.hasFloatingElement = false;
                    if (this.is2013Justification && !isNullOrUndefined(this.nextElementToLayout) && !(!isNullOrUndefined(element.paragraph.containerWidget.containerShape) && element.paragraph.containerWidget.containerShape === this.nextElementToLayout)) {
                        element = this.nextElementToLayout;
                    }
                    else {
                        // if (!line.paragraph.isInsideTable && bodyIndex !== line.paragraph.containerWidget.indexInOwner && !isNullOrUndefined(element.nextElement)) {
                        //     if (element.nextElement.line.children.indexOf(element.nextElement) !== element.nextElement.line.children.length - 1) {
                        //         element = undefined;
                        //     }
                        // }
                        // if (!isNullOrUndefined(element)) {
                        element = element.nextElement;
                        // }
                        if (element instanceof TextElementBox && element.text.indexOf(" ") == 0 && element.text.length > 2) {
                            if (isNullOrUndefined(element.nextElement) && element.text.trim().length > 0) {
                                element.text = element.text.substring(1, element.text.length);
                                element.isWidthUpdated = false;
                                var elementIndex = element.line.children.indexOf(element);
                                element.line.children.splice(elementIndex, 1);
                                var textElement = new TextElementBox();
                                textElement.text = " ";
                                textElement.line = element.line;
                                textElement.characterFormat.copyFormat(element.characterFormat);
                                // Copy revisions
                                if (element.revisions.length > 0) {
                                    for (var m = 0; m < element.revisions.length; m++) {
                                        var revision = element.revisions[m];
                                        textElement.revisions.push(revision);
                                        var rangeIndex = revision.range.indexOf(element);
                                        if (rangeIndex < 0) {
                                            revision.range.push(textElement);
                                        }
                                        else {
                                            revision.range.splice(rangeIndex, 0, textElement);
                                        }
                                    }
                                }
                                element.line.children.splice(elementIndex, 0, textElement);
                                element.line.children.splice(elementIndex + 1, 0, element);
                                element = textElement;
                            }
                        }
                    }
                    this.nextElementToLayout = undefined;
                }
            }
            else {
                element = undefined;
                this.isRTLLayout = false;
            }
        }
        return line;
    };
    /* eslint-disable  */
    Layout.prototype.layoutElement = function (element, paragraph, isEmptyField) {
        if (((element.isColumnBreak || element.isPageBreak) && paragraph.isInHeaderFooter) || (element instanceof ShapeElementBox && element.isHorizontalRule)) {
            return;
        }
        var line = element.line;
        var text = '';
        var index = element.indexInOwner;
        if (this.viewer.owner.editorModule && this.viewer.owner.editorHistoryModule && this.viewer.owner.editorHistoryModule.isRedoing && !isNullOrUndefined(element.paragraph.containerWidget.footNoteReference) && this.viewer.owner.enableTrackChanges && element.removedIds.length > 0) {
            this.viewer.owner.editorModule.constructRevisionFromID(element, true);
        }
        if (element instanceof FieldElementBox) {
            if (element.fieldType === 0) {
                if (this.documentHelper.fields.indexOf(element) === -1) {
                    this.documentHelper.fields.push(element);
                }
                if (!isNullOrUndefined(element.formFieldData) &&
                    this.documentHelper.formFields.indexOf(element) === -1 && !this.isInsertFormField) {
                    this.documentHelper.formFields.push(element);
                }
            }
            this.layoutFieldCharacters(element);
            if (element.line.isLastLine() && isNullOrUndefined(element.nextNode) && !this.isFieldCode) {
                // If a pargraph has a floating element and the line widget doesn't contain a valid element based on the element's width, then consider it an empty line.
                // Because the clientActiveArea position will be updated based on adjusted Rect in the adjustPoition method.
                if (!isNullOrUndefined(paragraph.containerWidget) && paragraph.floatingElements.length > 0 &&
                    !(paragraph.containerWidget instanceof TextFrame) && this.isConsiderAsEmptyLineWidget(element.line)) {
                    this.layoutEmptyLineWidget(paragraph, false, element.line);
                }
                this.moveToNextLine(line);
            }
            else if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                this.moveElementFromNextLine(line);
                if (element.line.isLastLine() && isNullOrUndefined(element.nextNode) && !this.isFieldCode) {
                    if (element.fieldType !== 2 && isNullOrUndefined(element.fieldSeparator)) {
                        this.layoutEmptyLineWidget(paragraph, false, element.line);
                    }
                    this.moveToNextLine(line);
                }
            }
            else if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width === 0) {
                this.moveToNextLine(line);
                if (line.paragraph.lastChild === line && !isNullOrUndefined(line.nextLine) &&
                    this.viewer.clientActiveArea.height >= 0) {
                    this.moveFromNextPage(line);
                }
            }
            else if (isEmptyField) {
                var textHelper = this.documentHelper.textHelper.getHeight(paragraph.characterFormat);
                element.height = textHelper.Height;
            }
            return;
        }
        if (element instanceof ListTextElementBox || this.isFieldCode || element instanceof BookmarkElementBox ||
            element instanceof EditRangeEndElementBox || element instanceof EditRangeStartElementBox
            || element instanceof ContentControl ||
            (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline')) {
            if (!this.isInitialLoad && element instanceof ContentControl && element.type === 0 && element.contentControlWidgetType === 'Block') {
                if (!isNullOrUndefined(element.paragraph) && element.paragraph.firstChild.children[0] === element && !isNullOrUndefined(element.reference)
                    && !isNullOrUndefined(element.reference.paragraph)
                    && element.reference.paragraph.lastChild.children[element.reference.paragraph.lastChild.children.length - 1] !== element.reference) {
                    element.contentControlWidgetType = 'Inline';
                    element.reference.contentControlWidgetType = 'Inline';
                    element.contentControlProperties.contentControlWidgetType = 'Inline';
                    var block = element.paragraph;
                    if (block === element.reference.paragraph && element.reference.paragraph.contentControlProperties) {
                        element.reference.paragraph.contentControlProperties = undefined;
                    }
                    while (block instanceof ParagraphWidget && block && block.contentControlProperties && block !== element.reference.paragraph) {
                        block.contentControlProperties = undefined;
                        block = block.nextRenderedWidget;
                    }
                }
            }
            if (element instanceof BookmarkElementBox) {
                if (element.bookmarkType === 0 && !this.documentHelper.bookmarks.containsKey(element.name)) {
                    this.documentHelper.bookmarks.add(element.name, element);
                    if (!isNullOrUndefined(element.properties)) {
                        var columnFirst = parseInt(element.properties["columnFirst"]);
                        if (element.paragraph.isInsideTable) {
                            var row = element.paragraph.associatedCell.ownerRow;
                            var cell = row.getCellUsingColumnIndex(row.rowIndex, columnFirst);
                            if (!isNullOrUndefined(cell)) {
                                cell.isRenderBookmarkStart = true;
                            }
                        }
                    }
                }
                else if (element.bookmarkType === 1 && this.documentHelper.bookmarks.containsKey(element.name)) {
                    var bookmrkElement = this.documentHelper.bookmarks.get(element.name);
                    if (isNullOrUndefined(bookmrkElement.reference)
                        || isNullOrUndefined(bookmrkElement.reference.paragraph)
                        || isNullOrUndefined(bookmrkElement.reference.paragraph.bodyWidget)) {
                        bookmrkElement.reference = element;
                        element.reference = bookmrkElement;
                    }
                    if (isNullOrUndefined(bookmrkElement.properties)) {
                        if (!isNullOrUndefined(this.documentHelper.selection)) {
                            var cell = bookmrkElement.reference.paragraph.associatedCell;
                            if (!isNullOrUndefined(cell)) {
                                cell.isRenderBookmarkEnd = false;
                                if (this.documentHelper.selection.isRenderBookmarkAtEnd(bookmrkElement.reference)) {
                                    cell.isRenderBookmarkEnd = true;
                                }
                            }
                        }
                    }
                    else {
                        if (!isNullOrUndefined(element.paragraph.associatedCell)) {
                            var lastPara = this.documentHelper.selection.getLastParagraph(element.paragraph.associatedCell);
                            var lastLine = lastPara.lastChild;
                            if (!isNullOrUndefined(lastLine)) {
                                var lastElement = lastLine.children[lastLine.children.length - 1];
                                if (lastElement == element) {
                                    var columnLast = parseInt(element.reference.properties['columnLast']);
                                    var endRow = element.paragraph.associatedCell.ownerRow;
                                    var endCell = undefined;
                                    var cellIndex = columnLast;
                                    while (isNullOrUndefined(endCell) && cellIndex > -1) {
                                        endCell = endRow.getCellUsingColumnIndex(endRow.rowIndex, cellIndex);
                                        if (isNullOrUndefined(endCell)) {
                                            cellIndex--;
                                        }
                                    }
                                    if (!isNullOrUndefined(endCell)) {
                                        endRow.isRenderBookmarkEnd = true;
                                    }
                                }
                            }
                        }
                    }
                }
                else if (element.bookmarkType === 0 && this.documentHelper.bookmarks.containsKey(element.name)) {
                    if (isNullOrUndefined(element.reference)) {
                        this.documentHelper.bookmarks.remove(element.name);
                    }
                    if (!isNullOrUndefined(element.properties)) {
                        var columnFirst = parseInt(element.properties["columnFirst"]);
                        if (element.paragraph.isInsideTable) {
                            var row = element.paragraph.associatedCell.ownerRow;
                            var cell = row.getCellUsingColumnIndex(row.rowIndex, columnFirst);
                            if (!isNullOrUndefined(cell)) {
                                cell.isRenderBookmarkStart = true;
                            }
                        }
                    }
                }
            }
            if (element instanceof EditRangeStartElementBox || element instanceof EditRangeEndElementBox) {
                if (element instanceof EditRangeStartElementBox) {
                    var user = element.user !== '' ? element.user : element.group;
                    if (this.documentHelper.editRanges.containsKey(user)) {
                        var editStartCollection = this.documentHelper.editRanges.get(user);
                        if (editStartCollection.indexOf(element) === -1) {
                            editStartCollection.push(element);
                        }
                    }
                    else {
                        var newEditStartCollection = [];
                        newEditStartCollection.push(element);
                        this.documentHelper.editRanges.add(user, newEditStartCollection);
                    }
                }
                if (element instanceof EditRangeStartElementBox && (this.documentHelper.owner.currentUser === element.user || (element.group === "Everyone" && element.user === ""))) {
                    if (element.columnFirst != -1 && element.columnLast != -1) {
                        var row = element.paragraph.associatedCell.ownerRow;
                        var cell = row.getCellUsingColumnIndex(row.rowIndex, element.columnFirst);
                        if (!isNullOrUndefined(cell)) {
                            cell.isRenderEditRangeStart = true;
                            row.editRangeID.add(element.editRangeId, element);
                        }
                    }
                }
                else if (element instanceof EditRangeEndElementBox && (this.documentHelper.owner.currentUser === element.editRangeStart.user || (element.editRangeStart.group === "Everyone" && element.editRangeStart.user === ""))) {
                    if (element.editRangeStart.columnFirst != -1 && element.editRangeStart.columnLast != -1) {
                        var row = element.paragraph.associatedCell.ownerRow;
                        if (row.editRangeID.containsKey(element.editRangeStart.editRangeId)) {
                            var cell = row.getCellUsingColumnIndex(row.rowIndex, element.editRangeStart.columnFirst);
                            if (!isNullOrUndefined(cell)) {
                                if (cell.isRenderEditRangeStart) {
                                    cell.isRenderEditRangeEnd = true;
                                }
                            }
                        }
                        else {
                            var table = element.paragraph.associatedCell.ownerTable;
                            for (var i = row.rowIndex - 1; i >= 0; i--) {
                                var previousRow = table.childWidgets[i];
                                if (previousRow.editRangeID.containsKey(element.editRangeStart.editRangeId)) {
                                    var previousCell = previousRow.getCellUsingColumnIndex(previousRow.rowIndex, element.editRangeStart.columnFirst);
                                    if (!isNullOrUndefined(previousCell)) {
                                        if (previousCell.isRenderEditRangeStart) {
                                            previousCell.isRenderEditRangeEnd = true;
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline' && paragraph.floatingElements.indexOf(element) == -1) {
                if (element instanceof ShapeElementBox) {
                    if (paragraph.floatingElements.indexOf(element) === -1) {
                        paragraph.floatingElements.push(element);
                    }
                    if (paragraph.bodyWidget.floatingElements.indexOf(element) === -1) {
                        paragraph.bodyWidget.floatingElements.push(element);
                    }
                }
            }
            if (element instanceof ContentControl && this.documentHelper.contentControlCollection.indexOf(element) === -1) {
                if (element.type === 0) {
                    if (this.isInitialLoad) {
                        this.documentHelper.contentControlCollection.push(element);
                    }
                    else {
                        this.documentHelper.owner.editorModule.insertContentControlInCollection(element);
                    }
                }
                else if (element.type === 1) {
                    var endPage = element.paragraph.bodyWidget.page;
                    for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
                        var cCStart = this.documentHelper.contentControlCollection[i];
                        var isInHeaderFooter = cCStart.line.paragraph.isInHeaderFooter;
                        // Link content control present in same header.
                        if (isInHeaderFooter && element.contentControlProperties === cCStart.contentControlProperties
                            && endPage === cCStart.line.paragraph.bodyWidget.page) {
                            element.reference = cCStart;
                            cCStart.reference = element;
                        }
                        else if (!isInHeaderFooter && element.contentControlProperties === cCStart.contentControlProperties) {
                            element.reference = cCStart;
                            cCStart.reference = element;
                        }
                    }
                }
                if (element instanceof ContentControl && paragraph.bodyWidget.floatingElements.length > 0) {
                    this.adjustPosition(element, element.line.paragraph.bodyWidget);
                }
            }
            if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                this.moveElementFromNextLine(line);
            }
            if (element.line.isLastLine() && isNullOrUndefined(element.nextElement)) {
                if (this.hasValidElement(line.paragraph) && !paragraph.isContainsShapeAlone()) {
                    this.moveToNextLine(line);
                }
                else if (!this.isInitialLoad && !this.hasValidElement(line.paragraph) && line.paragraph.paragraphFormat.bidi && line.paragraph.paragraphFormat.listFormat.listId !== -1) {
                    this.moveToNextLine(line);
                }
                else {
                    this.layoutEmptyLineWidget(line.paragraph, false, line, false);
                }
            }
            return;
        }
        if (element instanceof TextElementBox && element.characterFormat.highlightColor != "NoColor" && element.text.trim() != "" && element.text != element.text.trim()) {
            var firstLine = paragraph.firstChild;
            var lastLine = paragraph.lastChild;
            if (!isNullOrUndefined(firstLine) && firstLine instanceof LineWidget && firstLine.children.length > 0 && element === firstLine.children[0]) {
                HelperMethods.splitSpaceInTextElementBox(element, true);
            }
            if (!isNullOrUndefined(lastLine) && lastLine instanceof LineWidget && lastLine.children.length > 0 && element === lastLine.children[lastLine.children.length - 1]) {
                HelperMethods.splitSpaceInTextElementBox(element, false);
            }
        }
        var width = element.width;
        if (element instanceof FieldTextElementBox && !this.isTocField(element.fieldBegin)) {
            text = this.documentHelper.getFieldResult(element.fieldBegin, element.paragraph.bodyWidget.page);
            if (text !== '') {
                element.text = text;
            }
            else {
                text = element.text;
            }
        }
        else if (element instanceof FootnoteElementBox) {
            text = this.startAt(element, text);
            if (text !== '') {
                element.text = text;
            }
        }
        else if (element instanceof TextElementBox) {
            // skip when cliked enter in first footnote element
            if (!isNullOrUndefined(element.paragraph.containerWidget.footNoteReference)
                && element.line.isFirstLine()
                && element.paragraph.index === 0
                && element.indexInOwner === 0
                && !this.documentHelper.owner.editorModule.handledEnter
                && element instanceof FootnoteEndnoteMarkerElementBox) {
                element.text = element.paragraph.containerWidget.footNoteReference.text;
            }
            this.checkAndSplitTabOrLineBreakCharacter(element.text, element);
            //TODO: Need to update revision
            // if (element.text.length > 1 && element.line.paragraph.bidi) {
            //     let splittedText: string[] = this.splitTextByConsecutiveLtrAndRtl(element);
            //     this.updateSplittedText(element, splittedText);
            // }
            text = element.text;
        }
        // Here field code width and height update need to skipped based on the hidden property.
        if (element instanceof TextElementBox) {
            if (!element.isWidthUpdated || element.width === 0 || this.isInitialLoad
                || (this.viewer.owner.editorModule && this.viewer.owner.editorModule.isMeasureParaWidth)) {
                width = this.documentHelper.textHelper.getTextSize(element, element.characterFormat);
                element.isWidthUpdated = true;
            }
            else {
                width = element.trimEndWidth;
            }
            if (element.text === '\t') {
                width = this.getTabWidth(paragraph, this.viewer, index, line, element);
                element.width = width;
            }
            // As per MS word behavior, optional hyper Or column break is shown only when show paragraph mark properly is enabled
            // We need to show this special character based on property `showHiddenMark`
            else if (element.text === String.fromCharCode(31) || element.text === String.fromCharCode(14)) {
                element.width = width = 0;
            }
        }
        if (!isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
            !(element instanceof ShapeElementBox && element.textWrappingStyle == 'Inline') && !(paragraph.containerWidget instanceof TextFrame) && !(element instanceof CommentCharacterElementBox) &&
            !(paragraph.containerWidget instanceof TableCellWidget && paragraph.containerWidget.ownerTable.containerWidget instanceof TextFrame)) {
            this.adjustPosition(element, element.line.paragraph.bodyWidget);
            if (paragraph.textWrapWidth) {
                paragraph.x -= element.padding.left;
                paragraph.textWrapWidth = false;
            }
        }
        var beforeSpacing = line.isFirstLine() && element.indexInOwner === 0 ? this.getBeforeSpacing(paragraph) : 0;
        if (this.viewer instanceof PageLayoutViewer &&
            ((element instanceof ShapeElementBox && element.textWrappingStyle === 'Inline') || !(element instanceof ShapeElementBox))
            && this.viewer.clientActiveArea.height < beforeSpacing + element.height && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
            if ((element instanceof TextElementBox && (element.text !== '\f' && element.text !== String.fromCharCode(14) || (element.text === '\f' && paragraph.isPageBreak() && this.documentHelper.compatibilityMode === 'Word2013'))) || !(element instanceof TextElementBox)) {
                //let bodyIndex: number = line.paragraph.containerWidget.indexInOwner;
                this.moveToNextPage(this.viewer, line);
                // if (bodyIndex !== line.paragraph.containerWidget.indexInOwner) {
                //     return;
                // }
            }
            if (element instanceof FieldTextElementBox) {
                this.updateFieldText(element);
            }
            if (element.previousElement &&
                ((element.previousElement instanceof ShapeElementBox && element.previousElement.textWrappingStyle === 'Inline') ||
                    !(element.previousElement instanceof ShapeElementBox))) {
                this.cutClientWidth(element.previousElement, undefined, (element instanceof TextElementBox && element.text === '\f') ? true : false);
            }
        }
        if (element instanceof ShapeElementBox && element.textWrappingStyle === 'Inline') {
            if (paragraph.floatingElements.indexOf(element) === -1) {
                paragraph.floatingElements.push(element);
            }
            if (element.width > this.viewer.clientActiveArea.width) {
                this.splitElementForClientArea(paragraph, element);
                this.checkLineWidgetWithClientArea(line, element);
            }
            var is2013Justification = this.is2013Justification;
            this.layoutShape(element);
            this.is2013Justification = is2013Justification;
        }
        // tslint:disable-next-line:max-line-length
        if (element instanceof FootnoteElementBox && (!element.isLayout || this.isLayoutWhole) && this.documentHelper.owner.layoutType === 'Pages') {
            this.layoutFootEndNoteElement(element);
        }
        if (element instanceof FootnoteElementBox) {
            if (this.isfootMove) {
                this.moveToNextPage(this.viewer, element.line);
                if (element.previousElement &&
                    ((element.previousElement instanceof ShapeElementBox && element.previousElement.textWrappingStyle === 'Inline') ||
                        !(element.previousElement instanceof ShapeElementBox))) {
                    this.cutClientWidth(element.previousElement);
                }
                this.isfootMove = false;
            }
            if (paragraph.paragraphFormat.keepWithNext && paragraph.paragraphFormat.keepLinesTogether && !(!element.isLayout || this.isLayoutWhole)) {
                if (!isNullOrUndefined(paragraph.bodyWidget.page.footnoteWidget) && paragraph.bodyWidget.page.footnoteWidget.y !== 0 && paragraph.bodyWidget.page.footnoteWidget.y < this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height) {
                    var findDiff = this.viewer.clientActiveArea.y + this.viewer.clientActiveArea.height - paragraph.bodyWidget.page.footnoteWidget.y;
                    this.viewer.clientActiveArea.height -= findDiff;
                }
            }
        }
        if (parseFloat(width.toFixed(4)) <= parseFloat(this.viewer.clientActiveArea.width.toFixed(4)) || !this.viewer.textWrap) {
            //Fits the text in current line.
            this.addElementToLine(paragraph, element);
            if (isNullOrUndefined(element.nextElement) && !element.line.isLastLine()) {
                var nextLine = element.line.nextLine;
                var nextElement = nextLine.children[0];
                if (nextElement instanceof TextElementBox && nextElement.text.indexOf(" ") == 0) {
                    this.moveElementFromNextLine(line);
                }
            }
            if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0 && !element.line.isLastLine()) {
                this.moveElementFromNextLine(line);
            }
            else if (!element.line.isLastLine() && isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width === 0) {
                this.moveToNextLine(line);
                if (line.paragraph.lastChild === line && this.viewer.clientActiveArea.height >= 0) {
                    this.moveFromNextPage(line);
                }
            }
        }
        else if (element instanceof TextElementBox) {
            if (element.text === '\t') {
                var currentLine = element.line;
                var isElementMoved = false;
                // Added the condition to check While the tab element width is greater then clientActiveArea width and while it was first element of line should not move to next line
                if (element.indexInOwner !== 0 && element instanceof TabElementBox) {
                    isElementMoved = true;
                    this.addSplittedLineWidget(currentLine, currentLine.children.indexOf(element) - 1);
                }
                else {
                    if (this.isWrapText && this.viewer.clientActiveArea.x + this.viewer.clientActiveArea.width === this.viewer.clientActiveArea.right) {
                        this.isWrapText = false;
                    }
                    this.addSplittedLineWidget(currentLine, currentLine.children.indexOf(element));
                }
                this.moveToNextLine(currentLine);
                if (currentLine.paragraph.bodyWidget.floatingElements.length > 0 && isElementMoved) {
                    this.nextElementToLayout = element;
                    this.hasFloatingElement = true;
                    return;
                }
                else {
                    // Recalculates tab width based on new client active area X position
                    element.width = this.getTabWidth(paragraph, this.viewer, index, element.line, element);
                    if (isElementMoved) {
                        this.addElementToLine(paragraph, element);
                        if (isNullOrUndefined(element.nextElement) && this.viewer.clientActiveArea.width > 0
                            && !element.line.isLastLine()) {
                            this.moveElementFromNextLine(element.line);
                        }
                    }
                }
            }
            else {
                //Splits the text and arrange line by line, till end of text.
                do {
                    line = element.line;
                    //Added the condition to skip line split while layouting dropDownFormField 
                    if (!(element.previousElement instanceof FieldElementBox && element.previousElement.fieldType == 2
                        && !isNullOrUndefined(element.previousElement.fieldBeginInternal)
                        && element.previousElement.fieldBeginInternal.formFieldData instanceof DropDownFormField)) {
                        this.splitTextForClientArea(line, element, element.text, element.trimEndWidth, element.characterFormat);
                    }
                    this.checkLineWidgetWithClientArea(line, element);
                    if (element instanceof FieldTextElementBox && !this.isInitialLoad) {
                        this.updateFieldText(element);
                    }
                    if (element.line !== line && !isNullOrUndefined(this.nextElementToLayout) && this.is2013Justification) {
                        return;
                    }
                } while (element.line !== line && this.cutClientWidth(element));
            }
        }
        else {
            do {
                line = element.line;
                this.splitElementForClientArea(paragraph, element);
                this.checkLineWidgetWithClientArea(line, element);
                if (element instanceof FieldTextElementBox) {
                    this.updateFieldText(element);
                }
            } while (element.line !== line && this.cutClientWidth(element, true));
        }
        var contentControl;
        if (!isNullOrUndefined(element.nextNode) && element.nextNode instanceof ContentControl) {
            contentControl = element.nextNode;
        }
        if ((text === '\v' || text === '\f' || text === '\r' || text === String.fromCharCode(14)) && !contentControl) {
            var elementIndex = line.children.indexOf(element);
            if (elementIndex > -1) {
                this.addSplittedLineWidget(line, elementIndex);
            }
        }
        if (element.line.isLastLine() && isNullOrUndefined(element.nextElement) || text === '\v' || text === '\f' || text === '\r' || text === String.fromCharCode(14)) {
            if (this.isXPositionUpdated) {
                this.isXPositionUpdated = false;
                return;
            }
            this.moveToNextLine(element.line);
            if (text === '\v' && isNullOrUndefined(element.nextNode)) {
                this.layoutEmptyLineWidget(paragraph, true, line, true);
            }
            else if ((text === '\f' || text === String.fromCharCode(14)) && this.viewer instanceof PageLayoutViewer && !(element.line.paragraph.containerWidget instanceof TableCellWidget)) {
                var isRTLLayout = this.isRTLLayout;
                this.isRTLLayout = false;
                if (isNullOrUndefined(element.nextNode) || element.nextNode instanceof ContentControl) {
                    if (text === String.fromCharCode(14)) {
                        this.moveToNextPage(this.viewer, element.line.nextLine, false);
                        this.layoutEmptyLineWidget(element.line.nextLine.paragraph, false, element.line.nextLine, true);
                    }
                    else {
                        // We are layouting the section last paragraph and if previous widget is page break then we need to move the create new page.
                        var nextWidget = paragraph.nextWidget;
                        if (!(text === '\f' && nextWidget instanceof ParagraphWidget && nextWidget.isSectionBreak)) {
                            this.moveToNextPage(this.viewer, element.line, true);
                        }
                    }
                }
                else if (!isNullOrUndefined(element.line.nextLine)) {
                    this.moveToNextPage(this.viewer, element.line.nextLine, false);
                }
                this.isRTLLayout = isRTLLayout;
            }
        }
        this.isXPositionUpdated = false;
    };
    /**
    * @private
    */
    Layout.prototype.adjustPosition = function (element, bodyWidget) {
        var clientArea = this.viewer.clientActiveArea;
        var previousLeft = this.viewer.clientActiveArea.x;
        var previousTop = this.viewer.clientActiveArea.y;
        var previousWidth = this.viewer.clientActiveArea.width;
        var adjustedRect = this.adjustClientAreaBasedOnTextWrap(element, new Rect(clientArea.x, clientArea.y, clientArea.width, clientArea.height));
        this.viewer.clientActiveArea.width = adjustedRect.width;
        //Updated element padding for wrapping.
        // if (this.isWrapText) {
        var wrapDiff = this.viewer.clientActiveArea.x - previousLeft;
        // if (element.indexInOwner === 0 && element.line.isFirstLine()) {
        //     wrapDiff -= HelperMethods.convertPointToPixel(element.line.paragraph.paragraphFormat.firstLineIndent);
        // }
        if (element.line.isFirstLine() && this.getFirstElement(element.line) === element && wrapDiff > 0 && !this.isSkipFirstLineIndent) {
            var firstLineIndent = element.line.paragraph.paragraphFormat.firstLineIndent;
            wrapDiff += HelperMethods.convertPointToPixel(firstLineIndent > 0 ? firstLineIndent : 0);
        }
        this.isSkipFirstLineIndent = false;
        element.padding.left = wrapDiff > 0 ? wrapDiff : 0;
        if (previousWidth !== this.viewer.clientActiveArea.width) {
            var wrapPos = new WrapPosition(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.width);
            this.updateWrapPosition(wrapPos);
        }
        //this.isWrapText = false;
        // }
        if (this.viewer.clientActiveArea.width === 0) {
            this.isWrapText = false;
        }
        if (this.isYPositionUpdated) {
            if (element.line.isFirstLine()) {
                if (!isNullOrUndefined(element.line.paragraph.associatedCell)) {
                    var previousRenderedWidget = element.line.paragraph.previousRenderedWidget;
                    if (!isNullOrUndefined(previousRenderedWidget)) {
                        element.line.paragraph.associatedCell.height += (this.viewer.clientActiveArea.y - previousRenderedWidget.y + previousRenderedWidget.height);
                    }
                    else {
                        element.line.paragraph.associatedCell.height += (this.viewer.clientActiveArea.y - previousTop);
                    }
                }
                element.line.paragraph.y = this.viewer.clientActiveArea.y;
            }
            else if (element.line.children[0] === element) {
                element.line.marginTop += (this.viewer.clientActiveArea.y - previousTop);
            }
            if (element.line.paragraph.containerWidget instanceof HeaderFooterWidget) {
                element.line.paragraph.containerWidget.height += (this.viewer.clientActiveArea.y - previousTop);
            }
            if (!(element instanceof ListTextElementBox)) {
                this.isYPositionUpdated = false;
            }
        }
    };
    Layout.prototype.getFirstElement = function (line) {
        for (var j = 0; j < line.children.length; j++) {
            var element = line.children[j];
            if (!(element instanceof ShapeBase && element.textWrappingStyle !== 'Inline')) {
                return element;
            }
        }
        return undefined;
    };
    Layout.prototype.updateWrapPosition = function (wrapPos) {
        for (var i = 0; i < this.wrapPosition.length; i++) {
            var previousWrapPos = this.wrapPosition[i];
            if (Math.abs(previousWrapPos.right - wrapPos.right) > 1) {
                continue;
            }
            else {
                return;
            }
        }
        this.wrapPosition.push(wrapPos);
    };
    Layout.prototype.isFirstitemInPage = function (element, yposition) {
        if (!element.line.paragraph.isInHeaderFooter && Math.round(yposition) === this.viewer.clientArea.y) {
            return true;
        }
        return false;
    };
    Layout.prototype.isTextFitBelow = function (rect, top, element) {
        //TODO: After shape implementation.
        return false;
    };
    Layout.prototype.isNeedToWrapForTopAndBottom = function (currWidgetOwnerPara, elementBox, wrapOwnerIndex, wrapItemIndex, textWrappingStyle, textWrappingBounds, allowOverlap, wrapCollectionIndex, floatingEntity, isTextRangeInTextBox, rect, width, height) {
        if (currWidgetOwnerPara.isInsideTable && textWrappingStyle === "TopAndBottom" && !(floatingEntity instanceof TableWidget)) {
            var floatingItemOwnerPara = floatingEntity.paragraph;
            if (!isNullOrUndefined(floatingItemOwnerPara) && !isNullOrUndefined(floatingItemOwnerPara.associatedCell)) {
                var isLayoutInCell = floatingItemOwnerPara.isInsideTable;
                var floatingItemOwnerCell = floatingItemOwnerPara.associatedCell;
                var currParaOwnerCell = currWidgetOwnerPara.associatedCell;
                if ((!isNullOrUndefined(floatingItemOwnerCell) && !isNullOrUndefined(currParaOwnerCell) && floatingItemOwnerCell !== currParaOwnerCell)
                    || (!isLayoutInCell && this.documentHelper.compatibilityMode !== "Word2013"))
                    return false;
            }
        }
        return (wrapOwnerIndex !== wrapCollectionIndex
            && wrapItemIndex !== wrapCollectionIndex
            && textWrappingStyle === "TopAndBottom"
            && ((rect.y >= textWrappingBounds.y
                && rect.y < (textWrappingBounds.bottom))
                || ((rect.y + height > textWrappingBounds.y
                    || this.isTextFitBelow(textWrappingBounds, rect.y + height, floatingEntity))
                    && (rect.y + height < (textWrappingBounds.bottom)))
                || (rect.y < textWrappingBounds.y && rect.y + height > textWrappingBounds.bottom && textWrappingBounds.height > 0))
            && !(allowOverlap && (isTextRangeInTextBox || ((elementBox instanceof ImageElementBox)
                && elementBox.textWrappingStyle !== 'Inline' && elementBox.allowOverlap))));
    };
    Layout.prototype.isNeedToWrapForSquareTightAndThrough = function (bodyWidget, elementBox, wrapOwnerIndex, wrapItemIndex, textWrappingStyle, textWrappingBounds, allowOverlap, wrapCollectionIndex, floatingEntity, isTextRangeInTextBox, rect, width, height) {
        return (bodyWidget.floatingElements.length > 0
            && wrapOwnerIndex !== wrapCollectionIndex
            && wrapItemIndex !== wrapCollectionIndex
            && textWrappingStyle !== 'Inline'
            && textWrappingStyle !== 'Behind'
            && textWrappingStyle !== 'TopAndBottom'
            && textWrappingStyle !== 'InFrontOfText'
            && (Math.round((rect.y + height)) > Math.round(textWrappingBounds.y) ||
                this.isTextFitBelow(textWrappingBounds, rect.y + height, floatingEntity))
            && Math.round(rect.y) < Math.round((textWrappingBounds.y + textWrappingBounds.height))
            && !(allowOverlap && (isTextRangeInTextBox || ((elementBox instanceof ImageElementBox)
                && elementBox.textWrappingStyle !== 'Inline' && elementBox.allowOverlap))));
    };
    Layout.prototype.isNeedToWrapForSquareTightAndThroughForTable = function (container, table, wrapIndex, wrapItemIndex, wrappingStyle, textWrappingBounds, allowOverlap, wrapCollectionIndex, floatingElemnt, isInTextBox, rect, width, height) {
        return (container.floatingElements.length > 0 && wrapIndex !== wrapCollectionIndex
            && wrapItemIndex !== wrapCollectionIndex && wrappingStyle !== 'Inline'
            && wrappingStyle !== 'Behind' && wrappingStyle !== 'TopAndBottom'
            && wrappingStyle !== 'InFrontOfText'
            && ((Math.round(rect.y + height) >= Math.round(textWrappingBounds.y)
                && Math.round(rect.y) < Math.round(textWrappingBounds.bottom))
                //Checks whether the bottom of the table intersects with floating item.
                || Math.round(rect.y + height) <= Math.round(textWrappingBounds.bottom)
                    && Math.round(rect.y + height) >= Math.round(textWrappingBounds.y))
            && !(allowOverlap && (isInTextBox)));
    };
    Layout.prototype.isNeedToWrapLeafWidget = function (pargaraph, elementBox) {
        var IsNeedToWrap = true;
        return (pargaraph.bodyWidget.floatingElements.length > 0
            && (IsNeedToWrap || pargaraph.associatedCell)
            && !(elementBox instanceof ShapeBase && (elementBox.textWrappingStyle === 'InFrontOfText' || elementBox.textWrappingStyle === 'Behind')));
    };
    Layout.prototype.getMinWidth = function (currTextRange, width, height, rect) {
        var text = currTextRange.text;
        var split = text.split(' ');
        // Gets the minimum width from the text when it contains only empty space.
        if (text !== '' && text.trim() === ''
            && currTextRange && currTextRange.line.paragraph
            && currTextRange.previousNode && currTextRange.nextNode
            && currTextRange.line.paragraph.isEmpty) {
            split = [''];
        }
        // Initialized the text with additional empty string.
        // It avoids the minimum width calculation from next sibling (GetNextTextRangeWidth).
        var minwidth = this.documentHelper.textHelper.measureText(split[0], currTextRange.characterFormat, currTextRange.scriptType).Width;
        //Need to layout the unicode characters (chinese) character by character.
        // if (DrawingContext.IsUnicodeText(text)) {
        //     minwidth = DrawingContext.MeasureTextRange(currTextRange, text[0].ToString()).Width;
        // }
        var nextSibling = this.getNextSibling(currTextRange);
        if (split.length === 1 && nextSibling) {
            var nextSiblingText = nextSibling.text;
            minwidth += this.getNextTextRangeWidth(nextSibling, nextSiblingText, width, height, rect);
        } // Add the minimum character width of that paragraph, if this text range is para mark
        return minwidth;
    };
    Layout.prototype.getNextTextRangeWidth = function (nextSiblingTextRange, nextSiblingText, width, height, rect) {
        var nextsibling = nextSiblingTextRange;
        // if (nextSiblingTextRange instanceof WFootnote)
        //     nextsibling = ((nextSiblingTextRange as IWidget).LayoutInfo as LayoutFootnoteInfoImpl).TextRange;
        var sizeNext = new Rect(0, 0, 0, 0);
        var isNextSiblingSizeNeedToBeMeasure = this.isNextSibligSizeNeedToBeMeasure(sizeNext, nextSiblingTextRange, rect, width, height);
        while (isNextSiblingSizeNeedToBeMeasure
            && this.isLeafWidgetNextSiblingIsTextRange(nextsibling)
            && width + sizeNext.width < rect.width) {
            nextsibling = this.getNextSibling(nextsibling);
            if (!this.isNextSibligSizeNeedToBeMeasure(sizeNext, nextsibling, rect, width, height)) {
                break;
            }
            nextSiblingText += nextsibling.text;
        }
        return sizeNext.width;
    };
    Layout.prototype.isLeafWidgetNextSiblingIsTextRange = function (textRange) {
        var nextSiblingTextRange = this.getNextSibling(textRange);
        if (nextSiblingTextRange && nextSiblingTextRange instanceof TextElementBox) {
            return true;
        }
        return false;
    };
    Layout.prototype.isNextSibligSizeNeedToBeMeasure = function (sizeNext, nextSiblingwidget, rect, width, height) {
        var text = null;
        var nextSiblingTextRange = nextSiblingwidget;
        if (nextSiblingTextRange) {
            text = nextSiblingTextRange.text;
            if (text.indexOf(' ') !== -1 || (text.indexOf('-') !== -1 || (text.indexOf('_') !== -1)
                && ((width + sizeNext.width + (this.documentHelper.textHelper.measureText(text.split('-')[0], nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType)).Width) < rect.width))
                || ((nextSiblingTextRange).text === '\t')) {
                var elementWidth = nextSiblingTextRange.width;
                if (text !== text.split(' ')[0]) {
                    elementWidth = this.documentHelper.textHelper.measureText(text.split(' ')[0], nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType).Width;
                }
                if ((width + sizeNext.width + elementWidth) > rect.width && text.indexOf('-')) {
                    if (text !== text.split('-')[0] + '-') {
                        elementWidth = this.documentHelper.textHelper.measureText(text.split('-')[0] + '-', nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType).Width;
                    }
                }
                sizeNext.width += elementWidth;
                return false;
            }
            else {
                if (nextSiblingTextRange.text.length > 0) {
                    var textInfo = this.documentHelper.textHelper.measureText(nextSiblingTextRange.text, nextSiblingTextRange.characterFormat, nextSiblingTextRange.scriptType);
                    sizeNext.height += textInfo.Height;
                    sizeNext.width += textInfo.Width;
                }
            }
        }
        return true;
    };
    Layout.prototype.isNeedDoIntermediateWrapping = function (remainingClientWidth, textWrappingStyle, rect, width, paragraph, textWrappingBounds, leafWidget, minwidth, minimumWidthRequired) {
        return (((remainingClientWidth > minimumWidthRequired)
            && (((Math.round(rect.width) <= Math.round(minwidth)
                || (rect.width < width && leafWidget.paragraph.isInsideTable))
                && textWrappingStyle !== 'Left' // Skip to update width when the wrap type as left
                && textWrappingStyle !== 'Largest')
                || textWrappingStyle === 'Right' //To layout right side when the wrap type as right
                || (rect.width < remainingClientWidth && textWrappingStyle === 'Largest'))) // Check whether the right side width is greater than the left side when the wrap type as largest
            || ((Math.round(textWrappingBounds.x - paragraph.x + paragraph.leftIndent) < minimumWidthRequired // Check whether the left side of text wrap object is have minimum width to layout or not
                || (leafWidget instanceof TextElementBox && this.isFloatingItemOnLeft(rect, minwidth, textWrappingBounds)))
                && (textWrappingStyle !== 'Left' || remainingClientWidth < minimumWidthRequired)));
    };
    Layout.prototype.isFloatingItemOnLeft = function (rect, minWidth, bounds) {
        return false;
    };
    Layout.prototype.getNextSibling = function (currentElementBox) {
        var nextSibling = currentElementBox.nextNode;
        var isFieldCode = false;
        while (nextSibling) {
            if ((nextSibling instanceof FieldElementBox) || (nextSibling instanceof BookmarkElementBox) || isFieldCode || nextSibling instanceof ListTextElementBox) {
                if (nextSibling instanceof FieldElementBox) {
                    if (nextSibling.fieldType === 0) {
                        isFieldCode = true;
                    }
                    else if (nextSibling.fieldType === 2) {
                        isFieldCode = false;
                    }
                }
            }
            else if (nextSibling instanceof TextElementBox) {
                break;
            }
            nextSibling = nextSibling.nextNode;
        }
        return nextSibling;
    };
    Layout.prototype.adjustClientAreaBasedOnTextWrap = function (elementBox, rect) {
        var ownerPara = elementBox.line.paragraph;
        var bodyWidget = ownerPara.bodyWidget;
        var yValue = 0;
        var layouter = this.viewer;
        var yposition = rect.y;
        var isFirstItem = this.isFirstitemInPage(elementBox, yposition);
        if (isFirstItem) {
            yValue = yposition;
        }
        isFirstItem = isNullOrUndefined(ownerPara.previousWidget);
        //Update Layout area based on text wrap
        if (this.isNeedToWrapLeafWidget(ownerPara, elementBox)) {
            var clientLayoutArea = layouter.clientArea;
            //Need to handle sorting floating items.
            // Sort based on Y position
            bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
            // Sort based on X position
            bodyWidget.floatingElements.sort(function (a, b) { return a.x - b.x; });
            for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                var floatingItem = bodyWidget.floatingElements[i];
                var allowOverlap = false;
                if (floatingItem instanceof ShapeBase) {
                    allowOverlap = floatingItem.allowOverlap;
                }
                else {
                    allowOverlap = floatingItem.positioning.allowOverlap;
                }
                if (ownerPara.isInsideTable) {
                    if (floatingItem instanceof TableWidget && !floatingItem.isInsideTable) {
                        continue;
                    }
                }
                if (this.isRelayout && !this.isRelayoutOverlap &&
                    this.viewer.documentHelper.selection.isExistAfter(floatingItem instanceof TableWidget ? floatingItem : floatingItem.line.paragraph, elementBox.line.paragraph)
                    || this.isRelayout && this.isRelayoutOverlap && this.viewer.documentHelper.selection.isExistAfter(floatingItem instanceof TableWidget ? floatingItem : floatingItem.line.paragraph, this.endOverlapWidget)) {
                    continue;
                }
                // if (ownerPara.isInsideTable && allowOverlap
                //     && (ownerPara.associatedCell.ownerTable.positioning.allowOverlap))
                // {
                //     WParagraph ownerParagraph = (m_lcOperator as Layouter).FloatingItems[i].OwnerParagraph;
                //     if (!(ownerParagraph !== null
                //         && ownerParagraph.IsInCell
                //         && ownerPara.GetOwnerEntity() === ownerParagraph.GetOwnerEntity()))
                //     {
                //         continue;
                //     }
                // }
                var xPosition = floatingItem.x;
                var distanceLeft = 0;
                var distanceTop = 0;
                var distanceRight = 0;
                var distanceBottom = 0;
                var width = 0;
                if (floatingItem instanceof ShapeBase) {
                    distanceLeft = floatingItem.distanceLeft;
                    distanceTop = floatingItem.distanceTop;
                    distanceRight = floatingItem.distanceRight;
                    distanceBottom = floatingItem.distanceBottom;
                    width = floatingItem.width;
                }
                else {
                    width = floatingItem.getTableCellWidth();
                    distanceLeft = floatingItem.positioning.distanceLeft;
                    distanceTop = floatingItem.positioning.distanceTop;
                    distanceRight = floatingItem.positioning.distanceRight;
                    distanceBottom = floatingItem.positioning.distanceBottom;
                }
                var textWrappingBounds = new Rect(floatingItem.x - distanceLeft, floatingItem.y - distanceTop, width + distanceLeft + distanceRight, floatingItem.height + distanceTop + distanceBottom);
                var textWrappingStyle = floatingItem instanceof TableWidget ? 'Square' : floatingItem.textWrappingStyle;
                var textWrappingType = floatingItem instanceof TableWidget ? 'Both' : floatingItem.textWrappingType;
                //  //Need to skip the wrapping for line break when it is first item of corresponding paragraph and that paragraph contains First line indent as per Word 2010 and its lower version behavior.
                //  if (IsLineBreakIntersectOnFloatingItem(leafWidget, textWrappingStyle, textWrappingBounds, rect, size, ownerPara))
                //  continue;
                var minimumWidthRequired = 24;
                var bottom = layouter.clientArea.y + floatingItem.height;
                // if (this.isNeedToWrapParaMarkToRightSide(elementBox, ownerPara, textWrappingBounds, bottom, layouter, this.viewer.clientArea, textWrappingType, minimumWidthRequired)) {
                //     if (lineBreakPosition !== 0) {
                //         this.viewer.clientArea.y = lineBreakPosition;
                //         //m_layoutArea.UpdateBoundsBasedOnTextWrap(lineBreakPosition);
                //     }
                //     this.viewer.clientArea.x += textWrappingBounds.width;
                //     //(LeafWidget as IWidget).LayoutInfo.IsLineBreak = false;
                //     elementBox.height = 0;
                //     elementBox.width = textWrappingBounds.width;
                //     return;
                // }
                if (!(clientLayoutArea.x > (textWrappingBounds.right + minimumWidthRequired) || clientLayoutArea.right < textWrappingBounds.x - minimumWidthRequired)) {
                    if (this.isNeedToWrapForSquareTightAndThrough(bodyWidget, elementBox, -1, -1, textWrappingStyle, textWrappingBounds, allowOverlap, 1, floatingItem, false, rect, elementBox.width, elementBox.height)) {
                        var rightIndent = 0;
                        var leftIndent = 0;
                        var listLeftIndent = 0;
                        var firstLineIndent = HelperMethods.convertPointToPixel(elementBox.paragraph.paragraphFormat.firstLineIndent);
                        var paragraphLeftIndent = HelperMethods.convertPointToPixel(ownerPara.paragraphFormat.leftIndent);
                        var paragarphRightIndent = HelperMethods.convertPointToPixel(ownerPara.paragraphFormat.rightIndent);
                        firstLineIndent = ((elementBox.indexInOwner === 0 && elementBox.line.isFirstLine()) && firstLineIndent > 0) ? firstLineIndent : 0;
                        var currTextRange = elementBox instanceof TextElementBox || elementBox instanceof ListTextElementBox ? elementBox : null;
                        var containerWidget = floatingItem instanceof TableWidget ? floatingItem.containerWidget : floatingItem.line.paragraph.containerWidget;
                        var isnewline = false;
                        if (elementBox.line.paragraph) {
                            //Right indent is considered only if the rect.X greater than the floating item's X position and
                            //Text wrapping style should not be left
                            if (rect.x >= textWrappingBounds.x && textWrappingType !== 'Left') {
                                rightIndent = paragarphRightIndent;
                            }
                            //Left indent is considered only if the rect.X less than the floating item's X position and
                            //Text wrapping style should not be right
                            if (rect.x < textWrappingBounds.x && textWrappingType !== 'Right') {
                                leftIndent = paragraphLeftIndent;
                            }
                            var listFormat = ownerPara.paragraphFormat.listFormat;
                            var listLevel = this.getListLevel(listFormat.list, listFormat.listLevelNumber);
                            if (rect.x === (clientLayoutArea.x + paragraphLeftIndent)
                                && listFormat && listFormat.baseStyle
                                && listLevel && listLevel.paragraphFormat.leftIndent !== 0) {
                                listLeftIndent = paragraphLeftIndent;
                                isnewline = true; // to denote the current line is new line of the paragraph
                            }
                        }
                        // if (this.isXPositionUpdated && textWrappingType === 'Both' && this.layoutState === 'Splitted') {
                        //     rect.width = bodyWidget.width - this.viewer.clientActiveArea.x;
                        //     rect.x = textWrappingBounds.right;
                        //     this.viewer.updateClientAreaForTextWrap(rect);
                        //     return rect;
                        // }
                        /* Since the Microsoft Word has different behavior to calculate minimum width required to fit a word to a side of Table,
                        the minimum width required changes based upon table border value and table alignment.
                        And this value even differ for different word version, such that 2013, will have different minimum required value, where all other version shares the same logic to calculate minimum width required */
                        var border = 0;
                        var isBorderValueZero = false;
                        var table = void 0;
                        var borderThickness = 0;
                        var tableHorizontalPosition = void 0;
                        if (floatingItem instanceof TableWidget) {
                            table = floatingItem;
                            tableHorizontalPosition = floatingItem.positioning.horizontalAlignment;
                            border = this.getMaximumRightCellBorderWidth(floatingItem);
                            isBorderValueZero = this.getDefaultBorderSpacingValue(border, isBorderValueZero, tableHorizontalPosition);
                            borderThickness = floatingItem.tableFormat.borders.left.lineWidth / 2;
                        }
                        // Skip to update when the wrap type as left
                        if (rect.x + borderThickness >= textWrappingBounds.x && rect.x < textWrappingBounds.right && textWrappingType !== 'Left') // Skip to update when the wrap type as left
                         {
                            rect.width = rect.width - (textWrappingBounds.right - rect.x) - rightIndent;
                            this.isWrapText = true;
                            var isEntityFitInCurrentLine = true;
                            if (!isNullOrUndefined(table)) {
                                minimumWidthRequired = this.getMinimumWidthRequiredForTable(isBorderValueZero, tableHorizontalPosition, border);
                            }
                            //checks minimum width
                            if (!isEntityFitInCurrentLine || Math.round(rect.width) < minimumWidthRequired || (rect.width < elementBox.width && elementBox.text === '\t')
                                || (textWrappingBounds.x < ownerPara.x + paragraphLeftIndent)) // check whether the TextWrap X position is less than the paragraph X position
                             {
                                //TODO
                                rect.width = this.viewer.clientArea.right - textWrappingBounds.right - (isnewline ? listLeftIndent : 0);
                                //checks minimum width of the single word
                                var minwidth = 0;
                                if (!isNullOrUndefined(currTextRange)) {
                                    minwidth = this.getMinWidth(elementBox, elementBox.width, elementBox.height, rect);
                                }
                                else {
                                    minwidth = elementBox.width;
                                }
                                if (Math.round(rect.width) < minimumWidthRequired || rect.width < minwidth) {
                                    if (isEntityFitInCurrentLine && (textWrappingBounds.x - (ownerPara.x + ownerPara.leftIndent)) > minimumWidthRequired
                                        && (this.viewer.clientArea.right - textWrappingBounds.right) > minimumWidthRequired) {
                                        rect.width = 0;
                                    }
                                    else {
                                        var topMarginValue = 0;
                                        //topMarginValue = GetTopMarginValueForFloatingTable(ownerPara,
                                        //layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                        var isPositionsUpdated = false;
                                        //Check whether left side of current floating item has enoush place to fit current widget.
                                        //If it has, need to fit left side of the floating item, instead of moving to bottom.
                                        // if (layouter.clientArea.x + elementBox.width < floatingItem.x) {
                                        //     //Current item should preserve below to the floating item,which preserved left side of the floating item.
                                        //     //If left side has multiple items or none of items this may fail, need to handle this cases.
                                        //     let tempBounds: Rect = GetIntersectingItemBounds(floatingItem, yposition);
                                        //     if (tempBounds.bottom !== 0 && tempBounds.bottom <= textWrappingBounds.bottom) {
                                        //         rect.x = clientLayoutArea.x;
                                        //         rect.width = clientLayoutArea.width;
                                        //         rect.y = tempBounds.bottom + topMarginValue;
                                        //         rect.height = clientLayoutArea.bottom - tempBounds.bottom;
                                        //         this.isYPositionUpdated = true;
                                        //         isPositionsUpdated = true;
                                        //     }
                                        // }
                                        if (!isPositionsUpdated) {
                                            this.isYPositionUpdated = true;
                                            rect.width = this.viewer.clientArea.width;
                                            rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                            rect.y = textWrappingBounds.bottom + topMarginValue;
                                        }
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect);
                                    this.isWrapText = false;
                                }
                                else {
                                    var xposition = rect.x;
                                    //TabsLayoutInfo tabsInfo = null;
                                    rect.x = textWrappingBounds.right + (isnewline ? listLeftIndent : 0) + firstLineIndent;
                                    rect.width -= firstLineIndent;
                                    this.isSkipFirstLineIndent = true;
                                    //When there is no space to fit the content in right, then update the y position.
                                    if (textWrappingStyle === 'Square' && rect.width < 0 && elementBox.width > 0) {
                                        // let topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                        var topMarginValue = 0;
                                        this.isYPositionUpdated = true;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                        rect.y = textWrappingBounds.bottom + topMarginValue;
                                        rect.x = xposition;
                                    }
                                    else {
                                        // this.isXPositionUpdated = true;
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect); //
                                    // if (!(leafWidget is Break))
                                    // AdjustClientAreaBasedOnExceededTab(leafWidget, size, ref rect, ownerPara);
                                    // if (leafWidget != null)
                                    //     tabsInfo = (leafWidget as ILeafWidget).LayoutInfo as TabsLayoutInfo;
                                    //if (tabsInfo == null) {
                                    //this.isWrapText = true;
                                    //this.viewer.updateClientAreaForTextWrap(rect);//
                                    // if (layouter.FloatingItems[i].FloatingEntity is WTable)
                                    // layouter.FloatingTableBottom = textWrappingBounds.Bottom;
                                    //}
                                }
                            }
                            else {
                                //Check whether the RightPositionOfTabStopInterSectingFloattingItems have the value or not.
                                //if contains value means continue the layouting even x position exceeds the page right position.
                                var xposition = rect.x;
                                rect.x = textWrappingBounds.right + (isnewline ? listLeftIndent : 0) + firstLineIndent;
                                rect.width = this.viewer.clientArea.right - textWrappingBounds.right - (isnewline ? listLeftIndent : 0) - firstLineIndent;
                                this.isSkipFirstLineIndent = true;
                                //When there is no space to fit the content in right, then update the y position.
                                if (textWrappingStyle === 'Square' && rect.width < 0 && elementBox.width > 0) {
                                    // float topMarginValue = GetTopMarginValueForFloatingTable(ownerPara,
                                    //     layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                    var topMarginValue = 0;
                                    this.isYPositionUpdated = true;
                                    rect.width = this.viewer.clientArea.width;
                                    rect.height -= (textWrappingBounds.bottom + topMarginValue - rect.y);
                                    rect.y = textWrappingBounds.bottom + topMarginValue;
                                    rect.x = xposition;
                                }
                                //else
                                // this.isXPositionUpdated = true;
                                // if (!(leafWidget is Break))
                                //     AdjustClientAreaBasedOnExceededTab(leafWidget, size, ref rect, ownerPara);
                                // //Microsoft Word 2013 doesn't split text character by character, when current line has floating item.
                                // if (ownerPara != null && ownerPara.Document.Settings.CompatibilityMode == CompatibilityMode.Word2013)
                                //     layouter.m_canSplitbyCharacter = false;
                                this.isWrapText = true;
                                this.viewer.updateClientAreaForTextWrap(rect); //
                            }
                        }
                        else if (textWrappingBounds.x >= rect.x && rect.right > textWrappingBounds.x) {
                            rect.width = textWrappingBounds.x - rect.x - rightIndent;
                            //Remaining right side width
                            var remainingClientWidth = this.viewer.clientArea.right - textWrappingBounds.right;
                            remainingClientWidth = remainingClientWidth > 0 ? remainingClientWidth : 0;
                            this.isWrapText = true;
                            var isUpdateClientArea = false;
                            //checks minimum width
                            var minwidth = 0;
                            if (!isNullOrUndefined(currTextRange)) {
                                minwidth = this.getMinWidth(currTextRange, elementBox.width, elementBox.height, rect);
                            }
                            else {
                                minwidth = elementBox.width;
                            }
                            if (!isNullOrUndefined(table)) {
                                minimumWidthRequired = this.getMinimumWidthRequiredForTable(isBorderValueZero, tableHorizontalPosition, border);
                            }
                            if (this.isNeedDoIntermediateWrapping(remainingClientWidth, textWrappingType, rect, elementBox.width, elementBox.paragraph, textWrappingBounds, elementBox, minwidth, minimumWidthRequired)) {
                                var leftMinimumWidthRequired = 24;
                                rect.width = remainingClientWidth;
                                this.isWrapText = true;
                                if (rect.x + minwidth > textWrappingBounds.x || textWrappingType === 'Right' || clientLayoutArea.x > textWrappingBounds.x - leftMinimumWidthRequired) //Update X position when the wrap type as largest or right or the minimum width + rect.X > wrap x position
                                 {
                                    rect.x = textWrappingBounds.right;
                                    // let listFormat: WListFormat = null;
                                    // let listLevel: WListLevel = null;
                                    // if (elementBox.line.isFirstLine
                                    //    && (listFormat = ownerPara.GetListFormatValue()) != null
                                    //    && listFormat.CurrentListStyle != null
                                    //    && (listLevel = ownerPara.GetListLevel(listFormat)) != null
                                    //    && listLevel.ParagraphFormat.LeftIndent != 0)
                                    // {
                                    //     float x = 0;
                                    //     float width = rect.Width;
                                    //     //Updates the paragraph firstline horizontal positions, such as first line indent and listtab value
                                    //     UpdateParaFirstLineHorizontalPositions(paragraphLayoutInfo, ownerPara, ref x, ref width);
                                    //     rect.X += (x + (float)paragraphLayoutInfo.Margins.Left);
                                    //     rect.Width -= (x + (float)paragraphLayoutInfo.Margins.Left);
                                    // }
                                    // this.isXPositionUpdated = true;
                                    // if (textWrappingStyle == TextWrappingStyle.Through
                                    //     && layouter.FloatingItems[i].IsDoesNotDenotesRectangle) {
                                    //     UpdateXposition(textWrappingBounds, i, ref rect, size, minwidth);
                                    // }
                                    if (rect.width > minwidth || textWrappingType === 'Right') {
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                    }
                                    else if (rect.width < minwidth && elementBox.line.children[0] !== elementBox && textWrappingType === 'Both' && floatingItem instanceof ShapeBase) {
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                        isUpdateClientArea = true;
                                    }
                                }
                                if ((rect.width < minimumWidthRequired && !(minwidth < remainingClientWidth && ('Tight' === textWrappingStyle)))
                                    || (rect.width < minwidth && Math.round(rect.right) === Math.round(this.viewer.clientArea.right)
                                        && textWrappingType === 'Both')) {
                                    var rect1 = textWrappingBounds;
                                    if (Math.round(rect.x) === Math.round(bodyWidget.sectionFormat.leftMargin + ownerPara.paragraphFormat.leftIndent)) {
                                        //Updates top margin of the paragraph when paragraph mark not wrap based on the floating table.
                                        var topMarginValue = 0;
                                        //topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, floatingItem, rect.y);
                                        rect.y = rect1.bottom + topMarginValue;
                                        this.isYPositionUpdated = true;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height = rect.height - (rect1.height + topMarginValue);
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                        this.isWrapText = false;
                                    }
                                    // Reset the rectangle position when the rectangle right position is equialent to layout area right position
                                    else if (!isUpdateClientArea && Math.round(rect.right) >= Math.round(this.viewer.clientArea.right) && textWrappingType === 'Both') {
                                        //Updates top margin of the paragraph when paragraph mark not wrap based on the floating table.
                                        var topMarginValue = 0;
                                        // topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, floatingItem, rect.y);
                                        rect.y = rect1.bottom + topMarginValue;
                                        rect.width = this.viewer.clientArea.width;
                                        rect.height = rect.height - (rect1.height + topMarginValue);
                                        rect.x = this.viewer.clientArea.x + leftIndent;
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                        // this.isXPositionUpdated = true;
                                        this.isYPositionUpdated = true;
                                        this.isWrapText = false;
                                    }
                                    else {
                                        rect.width = 0;
                                        this.viewer.updateClientAreaForTextWrap(rect);
                                    }
                                }
                            }
                            else {
                                //While text intersecting with SQUARE type floating item and there is no space
                                //available to fit this text in current line then move the text to bottom
                                //of the floating item and this behavior is applicable only for Word 2013.
                                //Lower versions split the text character by character.
                                if ((elementBox.line.isFirstLine() && elementBox.indexInOwner === 0 || remainingClientWidth === 0 && elementBox.line.children[0] === elementBox) && textWrappingStyle === 'Square'
                                    && Math.round(rect.width) <= Math.round(minwidth)
                                    && ownerPara.containerWidget === containerWidget) {
                                    rect.x = clientLayoutArea.x;
                                    rect.y = textWrappingBounds.bottom;
                                    rect.width = clientLayoutArea.width;
                                    rect.height -= (textWrappingBounds.bottom - rect.y);
                                    this.isYPositionUpdated = true;
                                }
                                else if (Math.round(rect.width) <= Math.round(minwidth) && Math.round(rect.x - leftIndent) !== Math.round(this.viewer.clientArea.x)) {
                                    rect.width = 0;
                                }
                                this.viewer.updateClientAreaForTextWrap(rect); //
                            }
                        }
                        if (textWrappingType !== 'Both') {
                            this.isWrapText = false;
                        }
                    }
                    else if (this.isNeedToWrapForTopAndBottom(ownerPara, elementBox, -1, -1, textWrappingStyle, textWrappingBounds, allowOverlap, 1, floatingItem, false, rect, elementBox.width, elementBox.height)) {
                        // if ((textWrappingStyle === TextWrappingStyle.Tight || textWrappingStyle === TextWrappingStyle.Through)
                        //     && !(this.getBaseEntity(layouter.floatingItems[i].floatingEntity) instanceof HeaderFooter)
                        //     && !layouter.floatingItems[i].isDoesNotDenotesRectangle) {
                        //     //Gets the exact tight and throught floatting item's bottom position.
                        //     let floattingItemBottomPosition = this.getFloattingItemBottom(layouter.floatingItems[i].floatingEntity, textWrappingBounds.bottom);
                        //     textWrappingBounds = this.getBottomPositionForTightAndThrough(floattingItemBottomPosition, textWrappingBounds, ownerPara, rect.y, size.height);
                        // }
                        //Updates top margin of the paragraph when paragraph mark not wrap based on the floating table.
                        var topMarginValue = 0;
                        // topMarginValue = this.getTopMarginValueForFloatingTable(ownerPara,
                        //     layouter.floatingItems[i].floatingEntity, rect.y);
                        //previous floating item y position.
                        var prevY = rect.y;
                        rect.y = textWrappingBounds.bottom + topMarginValue;
                        this.isYPositionUpdated = true;
                        //Updating the rectangle height by reducing the previous floating item's y from the current floating item's bottom.
                        rect.height = rect.height - (textWrappingBounds.bottom - prevY + topMarginValue);
                        //Update the before spacing value once sets the floating item bottom position as paragraph y position
                        if (rect.y !== yposition && elementBox instanceof TextElementBox && !(floatingItem instanceof TableWidget)
                            && elementBox.line.isFirstLine()) {
                            rect.y += elementBox.margin.top;
                            yposition = rect.y;
                        }
                        this.viewer.updateClientAreaForTextWrap(rect);
                    }
                }
            }
        }
        return rect;
    };
    Layout.prototype.adjustClientAreaBasedOnTextWrapForTable = function (table, rect) {
        //let ownerPara: ParagraphWidget = elementBox.line.paragraph;
        if (isNullOrUndefined(table.containerWidget) || isNullOrUndefined(table.bodyWidget)) {
            return rect;
        }
        var bodyWidget = table.bodyWidget;
        var yValue = 0;
        var layouter = this.viewer;
        var yposition = rect.y;
        var isFirstItem = isNullOrUndefined(table.previousWidget);
        if (isFirstItem) {
            yValue = yposition;
        }
        if (bodyWidget.floatingElements.length > 0) {
            var clientLayoutArea = layouter.clientActiveArea;
            bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
            bodyWidget.floatingElements.sort(function (a, b) { return a.x - b.x; });
            for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                var floatingElement = bodyWidget.floatingElements[i];
                var allowOverlap = false;
                if (floatingElement instanceof ShapeBase) {
                    allowOverlap = floatingElement.allowOverlap;
                }
                else {
                    allowOverlap = floatingElement.positioning.allowOverlap;
                }
                if (table.isInsideTable) {
                    if (floatingElement instanceof TableWidget && !floatingElement.isInsideTable) {
                        continue;
                    }
                }
                if (floatingElement instanceof TableWidget && floatingElement.wrapTextAround && floatingElement.positioning.allowOverlap) {
                    if (table.wrapTextAround && table.positioning.allowOverlap) {
                        continue;
                    }
                }
                var tableWidth = table.getTableCellWidth();
                var isShape = floatingElement instanceof ShapeBase;
                var distanceLeft = isShape ? floatingElement.distanceLeft : floatingElement.positioning.distanceLeft;
                var distanceTop = isShape ? floatingElement.distanceTop : floatingElement.positioning.distanceTop;
                var distanceRight = isShape ? floatingElement.distanceRight : floatingElement.positioning.distanceRight;
                var distanceBottom = isShape ? floatingElement.distanceBottom : floatingElement.positioning.distanceBottom;
                var width = isShape ? floatingElement.width : floatingElement.getTableCellWidth();
                var wrappingBounds = new Rect(floatingElement.x - distanceLeft, floatingElement.y - distanceTop, width + distanceLeft + distanceRight, floatingElement.height + distanceTop + distanceBottom);
                var textWrappingStyle = floatingElement instanceof TableWidget ? 'Square' : floatingElement.textWrappingStyle;
                var textWrappingType = floatingElement instanceof TableWidget ? 'Both' : floatingElement.textWrappingType;
                var minimumWidthRequired = 24;
                var tableHeight = table.childWidgets.length > 0 ? table.childWidgets[0].rowFormat.height : 0;
                var lastNestedTable = this.getNestedTable(table);
                var characterFormat = lastNestedTable.firstChild.firstChild.firstChild.characterFormat;
                var size = this.documentHelper.textHelper.measureText(" ", characterFormat);
                if (tableHeight < size.Height) {
                    tableHeight = size.Height;
                }
                if (!(clientLayoutArea.x > (wrappingBounds.right + minimumWidthRequired) || clientLayoutArea.right < wrappingBounds.x - minimumWidthRequired)) {
                    if (this.isNeedToWrapForSquareTightAndThroughForTable(bodyWidget, table, -1, -1, textWrappingStyle, wrappingBounds, allowOverlap, 1, floatingElement, false, rect, tableWidth, tableHeight) && !(this.isRelayout && floatingElement instanceof TableWidget && floatingElement.positioning.verticalOrigin === 'Paragraph' && table.index < floatingElement.index)) {
                        // Skip to update when the wrap type as left
                        if (rect.x >= wrappingBounds.x && rect.x < wrappingBounds.right && textWrappingType !== 'Left') // Skip to update when the wrap type as left
                         {
                            rect.width = rect.width - (wrappingBounds.right - rect.x);
                            this.isWrapText = true;
                            var isEntityFitInCurrentLine = true;
                            if (!isEntityFitInCurrentLine || Math.round(rect.width) < minimumWidthRequired || (rect.width < tableWidth)
                                || (wrappingBounds.x < table.x)) // check whether the TextWrap X position is less than the paragraph X position
                             {
                                rect.width = this.viewer.clientArea.right - wrappingBounds.right;
                                var minwidth = tableWidth;
                                if (Math.round(rect.width) < minimumWidthRequired || rect.width < minwidth) {
                                    if (isEntityFitInCurrentLine && (wrappingBounds.x - (table.x)) > minimumWidthRequired
                                        && (this.viewer.clientArea.right - wrappingBounds.right) > minimumWidthRequired) {
                                        rect.width = 0;
                                    }
                                    else {
                                        var topMarginValue = 0;
                                        var isPositionsUpdated = false;
                                        if (!isPositionsUpdated) {
                                            this.isYPositionUpdated = true;
                                            rect.width = this.viewer.clientArea.width;
                                            rect.height -= (wrappingBounds.bottom + topMarginValue - rect.y);
                                            rect.y = wrappingBounds.bottom + topMarginValue;
                                        }
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect);
                                    this.isWrapText = false;
                                }
                                else {
                                    var xposition = rect.x;
                                    //TabsLayoutInfo tabsInfo = null;
                                    rect.x = wrappingBounds.right;
                                    //When there is no space to fit the content in right, then update the y position.
                                    if (textWrappingStyle === 'Square' && rect.width < 0 && tableWidth > 0) {
                                        // let topMarginValue = GetTopMarginValueForFloatingTable(ownerPara, layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                        var marginTop = 0;
                                        this.isYPositionUpdated = true;
                                        rect.height -= (wrappingBounds.bottom + marginTop - rect.y);
                                        rect.width = this.viewer.clientArea.width;
                                        rect.y = wrappingBounds.bottom + marginTop;
                                        rect.x = xposition;
                                    }
                                    this.viewer.updateClientAreaForTextWrap(rect); //
                                }
                            }
                            else {
                                var xposition = rect.x;
                                rect.x = wrappingBounds.right + table.firstChild.firstChild.leftMargin;
                                rect.width = this.viewer.clientArea.right - wrappingBounds.right;
                                //When there is no space to fit the content in right, then update the y position.
                                if (textWrappingStyle === 'Square' && rect.width < 0 && tableWidth > 0) {
                                    // float topMarginValue = GetTopMarginValueForFloatingTable(ownerPara,
                                    //     layouter.FloatingItems[i].FloatingEntity, rect.Y);
                                    var topMarginValue = 0;
                                    this.isYPositionUpdated = true;
                                    rect.width = this.viewer.clientArea.width;
                                    rect.height -= (wrappingBounds.bottom + topMarginValue - rect.y);
                                    rect.y = wrappingBounds.bottom + topMarginValue;
                                    rect.x = xposition;
                                }
                                this.viewer.updateClientAreaForTextWrap(rect); //
                            }
                        }
                    }
                }
            }
        }
        return rect;
    };
    Layout.prototype.getNestedTable = function (tableWidget) {
        var table = tableWidget;
        while (table.firstChild.firstChild.firstChild instanceof TableWidget) {
            table = table.firstChild.firstChild.firstChild;
        }
        return table;
    };
    Layout.prototype.startAt = function (element, text) {
        if (element.footnoteType === 'Footnote') {
            this.startat = element.paragraph.bodyWidget.sectionFormat.initialFootNoteNumber;
            text = this.getFootEndNote(element.paragraph.bodyWidget.sectionFormat.footNoteNumberFormat, this.documentHelper.footnoteCollection.indexOf(element) + this.startat);
        }
        else {
            this.startat = element.paragraph.bodyWidget.sectionFormat.initialEndNoteNumber;
            text = this.getFootEndNote(element.paragraph.bodyWidget.sectionFormat.endnoteNumberFormat, this.documentHelper.endnoteCollection.indexOf(element) + this.startat);
        }
        return text;
    };
    Layout.prototype.layoutFootEndNoteElement = function (element) {
        this.isFootnoteContentChanged = true;
        var footnote;
        var positionchanged = false;
        var footIndex = this.documentHelper.footnoteCollection.indexOf(element);
        var insertIndex = 1;
        this.islayoutFootnote = true;
        var isFitted;
        var clientArea = new Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
        var clientActiveArea = new Rect(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.y, this.viewer.clientActiveArea.width, this.viewer.clientActiveArea.height);
        var bodyWidget = element.paragraph.bodyWidget;
        var isCreated = false;
        var height = 0;
        if (bodyWidget.page.footnoteWidget) {
            for (var j = 0; j < bodyWidget.page.footnoteWidget.bodyWidgets.length; j++) {
                insertIndex = bodyWidget.page.footnoteWidget.bodyWidgets.length;
                var currentIndex = this.documentHelper.footnoteCollection.indexOf((bodyWidget.page.footnoteWidget.bodyWidgets[j]).footNoteReference);
                if (currentIndex > footIndex) {
                    if (currentIndex - footIndex === 1) {
                        insertIndex = j;
                        positionchanged = true;
                        break;
                    }
                }
            }
        }
        element.isLayout = true;
        if (element.footnoteType === 'Footnote') {
            if (bodyWidget.page.footnoteWidget && bodyWidget.page.footnoteWidget instanceof FootNoteWidget) {
                footnote = bodyWidget.page.footnoteWidget;
            }
            else {
                isCreated = true;
                footnote = new FootNoteWidget();
                footnote.footNoteType = 'Footnote';
                footnote.page = bodyWidget.page;
                var newParagraph = new ParagraphWidget();
                newParagraph.characterFormat = new WCharacterFormat();
                newParagraph.paragraphFormat = new WParagraphFormat();
                newParagraph.index = 0;
                var lineWidget = new LineWidget(newParagraph);
                newParagraph.childWidgets.push(lineWidget);
                height = this.documentHelper.textHelper.getParagraphMarkSize(newParagraph.characterFormat).Height;
                footnote.margin = new Margin(0, height, 0, 0);
            }
            this.isFootNoteLayoutStart = true;
            if (isCreated) {
                bodyWidget.page.footnoteWidget = footnote;
            }
            var body = element.bodyWidget;
            this.viewer.updateClientArea(footnote, footnote.page);
            this.viewer.clientArea.y = clientArea.y;
            this.viewer.clientActiveArea.y = clientActiveArea.y;
            for (var i = 0; i < element.bodyWidget.childWidgets.length; i++) {
                var block = element.bodyWidget.childWidgets[i];
                block.containerWidget = body;
                body.page = bodyWidget.page;
                body.sectionFormat = footnote.sectionFormat;
                block.containerWidget.containerWidget = footnote;
                this.viewer.updateClientAreaForBlock(block, true);
                if (block instanceof TableWidget) {
                    this.clearTableWidget(block, true, true);
                }
                this.layoutBlock(block, 0);
                height += block.height;
                block.y = 0;
                this.viewer.updateClientAreaForBlock(block, false);
                body.height += block.height;
            }
            if (footnote.sectionFormat.columns.length > 1 && !(footnote.bodyWidgets.length === 0 && body.childWidgets.length <= 1 && body.childWidgets[0].childWidgets.length <= 1)) {
                height = (height / footnote.sectionFormat.numberOfColumns);
            }
            this.isFootNoteLayoutStart = false;
            isFitted = false;
            if (height >= clientActiveArea.height) {
                this.isfootMove = true;
            }
            if (positionchanged) {
                footnote.bodyWidgets.splice(insertIndex, 0, body);
            }
            else {
                footnote.bodyWidgets.push(body);
            }
            if (element.line.paragraph.isInsideTable) {
                var table = this.getParentTable(element.line.paragraph.associatedCell.ownerTable);
                if (isNullOrUndefined(table.footnoteElement)) {
                    table.footnoteElement = [];
                }
                if (table.footnoteElement.indexOf(element) == -1) {
                    table.footnoteElement.push(element);
                    this.layoutedFootnoteElement.push(element);
                    var currentTable = element.line.paragraph.containerWidget.ownerTable;
                    if (currentTable.footnoteElement.indexOf(element) == -1) {
                        currentTable.footnoteElement.push(element);
                    }
                }
            }
            footnote.height += height;
            isFitted = true;
            this.viewer.clientActiveArea = clientActiveArea;
            this.viewer.clientActiveArea.height -= height;
            this.footnoteHeight += height;
            this.viewer.clientArea = clientArea;
        }
        return isFitted;
    };
    Layout.prototype.layoutEndNoteElement = function () {
        var totalPage = this.documentHelper.pages.length;
        if (this.documentHelper.endnoteCollection.length > 0) {
            var foot = void 0;
            var endNote = void 0;
            var isCreated = void 0;
            var lastPage = this.documentHelper.pages[totalPage - 1];
            var bodyWidget = lastPage.bodyWidgets[0];
            var lastSection = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
            if (this.viewer instanceof PageLayoutViewer && lastSection.sectionFormat.numberOfColumns > 1) {
                var firstSection = this.getBodyWidget(lastSection, true);
                this.splitBodyWidgetBasedOnColumn(firstSection);
            }
            for (var i = 0; i < this.documentHelper.endnoteCollection.length; i++) {
                foot = this.documentHelper.endnoteCollection[i];
                if (bodyWidget.page.endnoteWidget instanceof FootNoteWidget && bodyWidget.page.endnoteWidget.footNoteType === 'Endnote') {
                    endNote = bodyWidget.page.endnoteWidget;
                }
                else {
                    isCreated = true;
                    endNote = new FootNoteWidget();
                    endNote.footNoteType = 'Endnote';
                    endNote.page = bodyWidget.page;
                }
                var body = foot.bodyWidget;
                body.page = endNote.page;
                for (var j = 0; j < foot.bodyWidget.childWidgets.length; j++) {
                    var block = foot.bodyWidget.childWidgets[j];
                    block.containerWidget = body;
                    block.containerWidget.containerWidget = endNote;
                }
                if (endNote.bodyWidgets.indexOf(body) === -1) {
                    body.index = endNote.bodyWidgets.length;
                    endNote.bodyWidgets.push(body);
                    body.sectionFormat = endNote.page.bodyWidgets[endNote.page.bodyWidgets.length - 1].sectionFormat;
                }
                if (isCreated) {
                    bodyWidget.page.endnoteWidget = endNote;
                }
            }
            this.layoutfootNote(endNote);
        }
    };
    Layout.prototype.hasValidElement = function (paragraph) {
        var line = paragraph.firstChild;
        if (line) {
            var elementBox = line.children[0];
            while (elementBox) {
                if (elementBox instanceof FieldElementBox) {
                    elementBox = this.documentHelper.getNextValidElementForField(elementBox);
                    if (!isNullOrUndefined(elementBox) && !elementBox.line.paragraph.equals(paragraph)) {
                        return false;
                    }
                }
                if (elementBox instanceof TextElementBox || elementBox instanceof ImageElementBox) {
                    return true;
                }
                if (!isNullOrUndefined(elementBox)) {
                    elementBox = elementBox.nextNode;
                }
            }
        }
        return false;
    };
    Layout.prototype.isConsiderAsEmptyLineWidget = function (lineWidget) {
        for (var i = 0; i < lineWidget.children.length; i++) {
            var element = lineWidget.children[i];
            if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline') {
                continue;
            }
            if (element.width > 0) {
                return false;
            }
        }
        return true;
    };
    Layout.prototype.updateFieldText = function (element) {
        var text = this.documentHelper.getFieldResult(element.fieldBegin, element.paragraph.bodyWidget.page);
        if (text !== '') {
            element.text = text;
            this.documentHelper.textHelper.getTextSize(element, element.characterFormat);
        }
    };
    Layout.prototype.checkLineWidgetWithClientArea = function (line, element) {
        if (line !== element.line || element.line === line && isNullOrUndefined(element.nextElement)
            && !element.line.isLastLine()) {
            this.moveToNextLine(line);
            if (this.documentHelper.compatibilityMode !== 'Word2013' && this.isOverlapFloatTable) {
                var table = void 0;
                if (element.line.paragraph.previousRenderedWidget instanceof TableWidget && element.line.paragraph.previousRenderedWidget.wrapTextAround) {
                    table = element.line.paragraph.previousRenderedWidget;
                    this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                        HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
                }
                this.viewer.clientActiveArea.x += line.paragraph.leftIndent;
                this.isOverlapFloatTable = false;
            }
            if (line !== element.line) {
                this.isRTLLayout = false;
            }
        }
        if (element.line !== line && this.viewer instanceof PageLayoutViewer
            && this.viewer.clientActiveArea.height < element.height &&
            this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
            this.moveToNextPage(this.viewer, element.line);
        }
        else if (element.line === line && isNullOrUndefined(element.nextElement)
            && line.paragraph.lastChild === line && !line.isLastLine() && this.viewer.clientActiveArea.height >= 0) {
            this.moveFromNextPage(line);
        }
    };
    Layout.prototype.checkAndSplitTabOrLineBreakCharacter = function (text, element) {
        var char = ['\t', '\v', '\f'];
        var index = HelperMethods.indexOfAny(text, char);
        if (index > -1) {
            var character = text[index];
            if ((character === '\t' && text !== '\t') || (character === '\v' && text !== '\v')
                || (character === '\f' && text !== '\f')) {
                this.splitByLineBreakOrTab(this.viewer, element, index, character);
            }
        }
    };
    Layout.prototype.moveFromNextPage = function (line) {
        var nextLine = line.nextLine;
        if (nextLine && line.paragraph.childWidgets.indexOf(nextLine) === -1) {
            var splittedParagraph = nextLine.paragraph;
            nextLine.paragraph.childWidgets.splice(nextLine.indexInOwner, 1);
            line.paragraph.childWidgets.push(nextLine);
            nextLine.paragraph = line.paragraph;
            // this.updateLinearIndex(nextLine.paragraph);
            if (splittedParagraph.childWidgets.length === 0) {
                splittedParagraph.destroy();
            }
            else {
                //     this.updateLinearIndex(splittedParagraph);
            }
        }
    };
    Layout.prototype.cutClientWidth = function (currentElement, isNeedToLayoutShape, skipXPositionUpdate) {
        if (this.is2013Justification) {
            return false;
        }
        this.clearLineMeasures();
        var line = currentElement.line;
        line.marginTop = 0;
        var width = 0;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            if (isNeedToLayoutShape && element instanceof ShapeElementBox && element.textWrappingStyle === 'Inline') {
                this.layoutShape(element);
            }
            if (!this.isRelayoutOverlap && element instanceof TabElementBox && element.text === '\t') {
                element.width = this.getTabWidth(line.paragraph, this.viewer, 0, line, element);
            }
            width += element.width;
            if (currentElement === element) {
                break;
            }
        }
        var splitCurrentWidget = this.viewer.clientActiveArea.width - width < 0;
        var paragarph = currentElement.line.paragraph;
        var bodyWidget = paragarph.bodyWidget;
        if (bodyWidget && bodyWidget.floatingElements.length > 0) {
            this.hasFloatingElement = true;
            if (!skipXPositionUpdate) {
                this.isXPositionUpdated = true;
            }
            return false;
        }
        if (!splitCurrentWidget) {
            this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + width);
            if (currentElement.line.paragraph.paragraphFormat.textAlignment === 'Justify' &&
                currentElement instanceof TextElementBox) {
                this.splitTextElementWordByWord(currentElement);
            }
            if (isNullOrUndefined(currentElement.nextElement) && this.viewer.clientActiveArea.width > 0
                && !currentElement.line.isLastLine()) {
                this.moveElementFromNextLine(line);
            }
        }
        else if (currentElement.previousElement) {
            this.cutClientWidth(currentElement.previousElement);
        }
        return splitCurrentWidget;
    };
    Layout.prototype.layoutFieldCharacters = function (element) {
        if (element.fieldType === 0) {
            if (!isNullOrUndefined(element.formFieldData) && this.isInitialLoad) {
                this.checkAndUpdateFieldData(element);
            }
            if (!this.isFieldCode && (!isNullOrUndefined(element.fieldEnd) || element.hasFieldEnd)) {
                if (this.documentHelper.fieldStacks.indexOf(element) === -1) {
                    this.documentHelper.fieldStacks.push(element);
                }
                if (this.isRelayout) {
                    var fieldCode = HelperMethods.trimEnd(this.documentHelper.selection.getFieldCode(element));
                    this.isIFfield = HelperMethods.startsWith(fieldCode, 'IF');
                }
                this.isFieldCode = true;
                element.hasFieldEnd = true;
            }
        }
        else if (this.documentHelper.fieldStacks.length > 0) {
            if (element.fieldType === 2) {
                var field = this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1];
                if (field.fieldSeparator === element && (!isNullOrUndefined(field.fieldEnd) || field.hasFieldEnd)) {
                    this.isFieldCode = false;
                }
            }
            else {
                var field = this.documentHelper.fieldStacks[this.documentHelper.fieldStacks.length - 1];
                if (element === field.fieldEnd) {
                    this.documentHelper.fieldStacks.pop();
                    this.isFieldCode = false;
                    this.isIFfield = false;
                }
            }
        }
    };
    Layout.prototype.checkAndUpdateFieldData = function (fieldBegin) {
        if (fieldBegin.hasFieldEnd && !isNullOrUndefined(fieldBegin.fieldEnd)) {
            if (isNullOrUndefined(fieldBegin.fieldSeparator)) {
                var seperator = new FieldElementBox(2);
                seperator.fieldBegin = fieldBegin;
                seperator.fieldEnd = fieldBegin.fieldEnd;
                seperator.line = fieldBegin.line;
                fieldBegin.line.children.splice(fieldBegin.fieldEnd.indexInOwner, 0, seperator);
                fieldBegin.fieldSeparator = seperator;
                fieldBegin.fieldEnd.fieldSeparator = seperator;
            }
            var previousNode = fieldBegin.fieldEnd.previousNode;
            if (previousNode instanceof FieldElementBox && previousNode.fieldType === 2) {
                var formFieldData = fieldBegin.formFieldData;
                if (formFieldData instanceof CheckBoxFormField) {
                    var checkBoxTextElement = new TextElementBox();
                    checkBoxTextElement.skipformFieldLength = true;
                    checkBoxTextElement.line = fieldBegin.line;
                    var index = fieldBegin.line.children.indexOf(fieldBegin.fieldEnd);
                    fieldBegin.line.children.splice(index, 0, checkBoxTextElement);
                    checkBoxTextElement.characterFormat.copyFormat(fieldBegin.characterFormat);
                    if (formFieldData.checked) {
                        checkBoxTextElement.text = String.fromCharCode(9745);
                    }
                    else {
                        checkBoxTextElement.text = String.fromCharCode(9744);
                    }
                    this.setCheckBoxFontSize(formFieldData, checkBoxTextElement.characterFormat);
                }
                else if (formFieldData instanceof DropDownFormField) {
                    var dropDownTextElement = new TextElementBox();
                    dropDownTextElement.characterFormat.copyFormat(fieldBegin.characterFormat);
                    dropDownTextElement.skipformFieldLength = true;
                    dropDownTextElement.line = fieldBegin.line;
                    if (formFieldData.dropdownItems.length > 0) {
                        dropDownTextElement.text = formFieldData.dropdownItems[formFieldData.selectedIndex];
                    }
                    else {
                        dropDownTextElement.text = this.documentHelper.textHelper.repeatChar(this.documentHelper.textHelper.getEnSpaceCharacter(), 5);
                    }
                    var index = fieldBegin.line.children.indexOf(fieldBegin.fieldEnd);
                    fieldBegin.line.children.splice(index, 0, dropDownTextElement);
                }
            }
        }
    };
    /**
     * Set the checkbox font size
     * @returns {void}
     */
    Layout.prototype.setCheckBoxFontSize = function (formFieldData, format) {
        if (formFieldData.sizeType !== 'Auto') {
            format.fontSize = formFieldData.size * CHECK_BOX_FACTOR;
        }
        else {
            format.fontSize = format.fontSize * CHECK_BOX_FACTOR;
        }
    };
    Layout.prototype.layoutEmptyLineWidget = function (paragraph, isEmptyLine, line, isShiftEnter) {
        this.clearLineMeasures();
        var paraFormat = paragraph.paragraphFormat;
        var subWidth = 0;
        var whiteSpaceCount = 0;
        isShiftEnter = isNullOrUndefined(isShiftEnter) ? false : isShiftEnter;
        var borders = paraFormat.borders;
        var canRenderParagraphBorders = this.documentHelper.canRenderBorder(paragraph);
        //Calculate line height and descent based on formatting defined in paragraph.
        var paragraphMarkSize = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat);
        var maxHeight = paragraphMarkSize.Height;
        var beforeSpacing = 0;
        var lineWidget;
        if (paragraph.childWidgets.length > 0 && !isShiftEnter) {
            this.isUpdateMarginForCurrentLine(line);
            lineWidget = paragraph.childWidgets[0];
            if (lineWidget.children.length > 0) {
                if ((paraFormat.bidi || this.isContainsRtl(lineWidget))) {
                    this.shiftElementsForRTLLayouting(lineWidget, paraFormat.bidi);
                }
                var isParagraphStart = lineWidget.isFirstLine();
                var isParagraphEnd = lineWidget.isLastLine();
                var firstLineIndent = 0;
                if (isParagraphStart) {
                    beforeSpacing = this.getBeforeSpacing(paragraph);
                    firstLineIndent = HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
                }
                var textAlignment = paraFormat.textAlignment;
                if (textAlignment !== 'Left' && this.viewer.textWrap
                    && (!(textAlignment === 'Justify' && isParagraphEnd)
                        || (textAlignment === 'Justify' && paraFormat.bidi))) {
                    var getWidthAndSpace = this.getSubWidth(lineWidget, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
                    subWidth = getWidthAndSpace[0].subWidth;
                    whiteSpaceCount = getWidthAndSpace[0].spaceCount;
                }
            }
        }
        else {
            lineWidget = isEmptyLine ? this.addLineWidget(paragraph) : line;
        }
        if (lineWidget.isFirstLine()) {
            beforeSpacing = this.getBeforeSpacing(paragraph);
        }
        if (!isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
            !(paragraph.containerWidget instanceof TextFrame) && !(paragraph.containerWidget instanceof TableCellWidget && paragraph.containerWidget.ownerTable.containerWidget instanceof TextFrame)) {
            var elementBox = new TextElementBox();
            elementBox.line = lineWidget;
            lineWidget.children.push(elementBox);
            elementBox.text = '¶';
            elementBox.characterFormat = paragraph.characterFormat;
            elementBox.width = this.documentHelper.textHelper.getTextSize(elementBox, elementBox.characterFormat);
            this.adjustPosition(elementBox, paragraph.bodyWidget);
            paragraph.x += elementBox.padding.left;
            if (elementBox.padding.left !== 0) {
                paragraph.textWrapWidth = true;
            }
            if (isEmptyLine) {
                this.checkInbetweenShapeOverlap(lineWidget);
            }
            lineWidget.children.splice(elementBox.indexInOwner, 1);
        }
        //isNullOrUndefined(this.viewer.currentHeaderFooter) &&
        if (this.viewer instanceof PageLayoutViewer
            && this.viewer.clientActiveArea.height < beforeSpacing + maxHeight
            && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y
            && (!(lineWidget.isFirstLine() && isNullOrUndefined(lineWidget.paragraph.previousWidget))
                || lineWidget.isEndnoteLineWidget()) && !paragraph.isSectionBreak) {
            this.moveToNextPage(this.viewer, lineWidget);
        }
        //Gets line spacing.
        var lineSpacing = this.getLineSpacing(paragraph, maxHeight);
        //let maxDescent: number = maxHeight - paragraphMarkSize.BaselineOffset;
        //Calculate the bottom position of current line - max height + line spacing.
        if (!isNaN(this.maxTextHeight)
            && maxHeight < this.maxTextHeight) {
            maxHeight = this.maxTextHeight;
            //maxDescent = maxHeight - this.maxTextBaseline;
        }
        var topMargin = 0;
        var bottomMargin = 0;
        var leftMargin = 0;
        var height = maxHeight;
        var lineSpacingType = paragraph.paragraphFormat.lineSpacingType;
        if (lineSpacingType === 'Multiple') {
            if (lineSpacing > maxHeight) {
                bottomMargin += lineSpacing - maxHeight;
            }
            else {
                topMargin += lineSpacing - maxHeight;
            }
        }
        else if (lineSpacingType === 'Exactly') {
            topMargin += lineSpacing - (topMargin + height + bottomMargin);
        }
        else if (lineSpacing > topMargin + height + bottomMargin) {
            topMargin += lineSpacing - (topMargin + height + bottomMargin);
        }
        topMargin += beforeSpacing;
        bottomMargin += HelperMethods.convertPointToPixel(this.getAfterSpacing(paragraph));
        if (borders.top.lineStyle != 'None') {
            if (lineWidget.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                topMargin += HelperMethods.convertPointToPixel(borders.top.lineWidth + borders.top.space);
            }
        }
        if (borders.bottom.lineStyle != 'None') {
            if (lineWidget.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                bottomMargin += HelperMethods.convertPointToPixel(borders.bottom.lineWidth + borders.bottom.space);
            }
        }
        var renderedElements = lineWidget.renderedElements;
        for (var i = 0; i < renderedElements.length; i++) {
            var element = renderedElements[i];
            if (i === 0 && element instanceof ListTextElementBox || (paragraph.paragraphFormat.bidi && renderedElements[renderedElements.length - 1] instanceof ListTextElementBox)) {
                var textAlignment = paragraph.paragraphFormat.textAlignment;
                if (textAlignment === 'Right') { //Aligns the text as right justified.
                    leftMargin = subWidth;
                }
                else if (textAlignment === 'Center') { //Aligns the text as center justified.
                    leftMargin = subWidth / 2;
                }
                element.margin = new Margin(leftMargin, topMargin, 0, bottomMargin);
                element.line = lineWidget;
                lineWidget.height = topMargin + height + bottomMargin;
                break;
            }
        }
        lineWidget.margin = new Margin(0, topMargin, 0, bottomMargin);
        lineWidget.height = topMargin + height + bottomMargin;
        this.adjustPositionBasedOnTopAndBottom(lineWidget);
        if ((isNullOrUndefined(paragraph.nextRenderedWidget) && paragraph.isInsideTable
            && paragraph.previousRenderedWidget instanceof TableWidget && paragraph.childWidgets.length == 1) || paragraph.characterFormat.hidden) {
            //Special behavior for empty cell mark after nested table, preserved with zero height by default.
            //Empty line is displayed in cell for the last empty paragraph (Cell mark - last paragraph in cell) after a nested table.
            lineWidget.height = 0;
        }
        var previousWidget = paragraph.previousRenderedWidget;
        // In MS word behaviour if the section break last para is empty. Then they will render in the last para in the previous para. 
        if (paragraph.isSectionBreak && previousWidget instanceof ParagraphWidget && paragraph.index > 0) {
            this.layoutSectionBreakParagraph(paragraph, previousWidget);
            if (previousWidget.isEndsWithPageBreak) {
                // If pagebreak next para is section last para and it empty then will render next to the page break. 
                // In layout element method skipped to movetonext page and now it will move to next page.
                this.moveToNextPage(this.viewer, lineWidget, true);
            }
        }
        else {
            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + lineWidget.height);
            var previousWidget_1 = paragraph.previousRenderedWidget;
            if (previousWidget_1) {
                var previousSplitWidget = previousWidget_1.getSplitWidgets();
                if (paragraph.isSectionBreak && previousSplitWidget.length > 0 && previousSplitWidget[previousSplitWidget.length - 1] instanceof TableWidget && previousSplitWidget[previousSplitWidget.length - 1].wrapTextAround) {
                    this.viewer.cutFromTop(previousSplitWidget[previousSplitWidget.length - 1].y + previousSplitWidget[previousSplitWidget.length - 1].height);
                }
            }
        }
        this.wrapPosition = [];
        //Clears the previous line elements from collection.
    };
    Layout.prototype.layoutSectionBreakParagraph = function (paragraph, previousParagraph) {
        var lastLine = previousParagraph.lastChild;
        var lineWidget = paragraph.firstChild;
        if (lastLine.margin) {
            lineWidget.margin = new Margin(0, lastLine.margin.top, 0, lastLine.margin.bottom);
        }
        lineWidget.height = lastLine.height;
        paragraph.height = lastLine.height;
        paragraph.y = this.getLineYPosition(previousParagraph);
        paragraph.width = previousParagraph.width;
        paragraph.x = this.getLineXPosition(previousParagraph);
    };
    Layout.prototype.getLineYPosition = function (paragraph) {
        var yPosition = paragraph.y;
        for (var i = 0; i < paragraph.childWidgets.length - 1; i++) {
            yPosition += paragraph.childWidgets[i].height;
        }
        return yPosition;
    };
    Layout.prototype.getLineXPosition = function (paragraph) {
        var lastLine = paragraph.lastChild;
        var paragraphMarkSize = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat);
        return paragraph.x + this.getLineWidth(lastLine) + paragraphMarkSize.Width;
    };
    Layout.prototype.getLineWidth = function (linewidget) {
        var width = 0;
        for (var i = 0; i < linewidget.children.length; i++) {
            if (!(linewidget.children[i] instanceof ShapeElementBox)) {
                width += linewidget.children[i].width;
            }
        }
        return width;
    };
    Layout.prototype.isUpdateMarginForCurrentLine = function (line) {
        var isUpdate = true;
        if (!isNullOrUndefined(line) && !line.isFirstLine()) {
            for (var i = 0; i < line.children.length; i++) {
                if (!(line.children[i] instanceof EditRangeStartElementBox || line.children[i] instanceof EditRangeEndElementBox)) {
                    isUpdate = false;
                    break;
                }
            }
            if (isUpdate) {
                line.margin = new Margin(0, 0, 0, 0);
            }
        }
    };
    Layout.prototype.adjustPositionBasedOnTopAndBottom = function (lineWidget) {
        if (!isNullOrUndefined(lineWidget.paragraph.bodyWidget) && !isNullOrUndefined(lineWidget.paragraph.bodyWidget.page.headerWidget)
            && lineWidget.paragraph.bodyWidget.page.headerWidget.floatingElements.length > 0
            && lineWidget.paragraph === lineWidget.paragraph.bodyWidget.childWidgets[0]
            && lineWidget.indexInOwner === 0) {
            //To check whether first para in the page overlaps with shape in Header.
            this.checkInbetweenShapeOverlap(lineWidget, lineWidget.paragraph.bodyWidget.page.headerWidget.floatingElements);
        }
    };
    Layout.prototype.layoutListItems = function (paragraph, isUpdatedList) {
        if (!this.isFieldCode) {
            if (!isNullOrUndefined(paragraph.paragraphFormat)
                && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)
                && !isNullOrUndefined(this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId)) &&
                paragraph.paragraphFormat.listFormat.listLevelNumber >= 0
                && paragraph.paragraphFormat.listFormat.listLevelNumber < 9 && !isUpdatedList) {
                this.clearListElementBox(paragraph);
                this.layoutList(paragraph, this.documentHelper);
            }
            else if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId === -1) {
                this.clearListElementBox(paragraph);
            }
        }
    };
    Layout.prototype.layoutList = function (paragraph, documentHelper) {
        var list = documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
        var listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
        var currentListLevel = this.getListLevel(list, listLevelNumber);
        if (isNullOrUndefined(currentListLevel) || isNullOrUndefined(currentListLevel.numberFormat)) {
            return;
        }
        var lineWidget = paragraph.childWidgets[0];
        if (isNullOrUndefined(lineWidget)) {
            lineWidget = new LineWidget(paragraph);
            paragraph.childWidgets.push(lineWidget);
        }
        var element = new ListTextElementBox(currentListLevel, false);
        var considerAsHidden = false;
        if (paragraph.characterFormat.hidden) {
            if (paragraph.isEmpty()) {
                considerAsHidden = true;
            }
            else {
                var firstElement = lineWidget.children[0];
                while (firstElement) {
                    if (!firstElement.characterFormat.hidden) {
                        considerAsHidden = false;
                        break;
                    }
                    else {
                        considerAsHidden = true;
                    }
                    firstElement = firstElement.nextNode;
                }
            }
            if (considerAsHidden) {
                element.characterFormat.hidden = true;
            }
        }
        element.line = lineWidget;
        if (currentListLevel.listLevelPattern === 'Bullet') {
            element.text = currentListLevel.numberFormat;
            this.updateListValues(list, listLevelNumber);
        }
        else {
            element.text = this.getListNumber(paragraph.paragraphFormat.listFormat);
        }
        if (currentListLevel.numberFormat === '') {
            return;
        }
        this.viewer.updateClientWidth(-HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent));
        if (this.documentHelper.isIosDevice || this.documentHelper.isLinuxOS) {
            var text = element.text;
            text = text === String.fromCharCode(61623) ? String.fromCharCode(9679) : text === String.fromCharCode(61551) + String.fromCharCode(32) ? String.fromCharCode(9675) : text;
            if (text !== element.text) {
                element.text = text;
            }
        }
        documentHelper.textHelper.updateTextSize(element, paragraph);
        var moveToNextPage;
        if (this.viewer instanceof PageLayoutViewer
            && this.viewer.clientActiveArea.height < element.height && this.viewer.clientActiveArea.y !== this.viewer.clientArea.y) {
            moveToNextPage = true;
        }
        this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
        var previousElement = element;
        //Adds the text element to the line
        lineWidget.children.splice(0, 0, element);
        if (currentListLevel.followCharacter !== 'None') {
            element = new ListTextElementBox(currentListLevel, true);
            if (considerAsHidden) {
                element.characterFormat.hidden = true;
            }
            if (currentListLevel.followCharacter === 'Tab') {
                element.text = '\t';
                var index = lineWidget.children.indexOf(element);
                var tabWidth = this.getTabWidth(paragraph, this.viewer, index, lineWidget, element);
                documentHelper.textHelper.updateTextSize(element, paragraph);
                if (!considerAsHidden) {
                    element.width = tabWidth;
                }
            }
            else {
                element.text = ' ';
                documentHelper.textHelper.updateTextSize(element, paragraph);
            }
            this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
            //Adds the tabSpace to the line
            lineWidget.children.splice(1, 0, element);
            element.line = lineWidget;
        }
        if (!isNullOrUndefined(paragraph.containerWidget) && paragraph.bodyWidget.floatingElements.length > 0 &&
            !(previousElement instanceof ShapeElementBox) && !(paragraph.containerWidget instanceof TextFrame)) {
            this.adjustPosition(previousElement, previousElement.line.paragraph.bodyWidget);
            if ((previousElement instanceof ListTextElementBox) && previousElement.padding && previousElement.padding.left > 0 &&
                paragraph.paragraphFormat.firstLineIndent < 0) {
                previousElement.padding.left -= HelperMethods.convertPointToPixel(previousElement.line.paragraph.paragraphFormat.firstLineIndent);
            }
            if (this.isYPositionUpdated) {
                if (this.viewer.clientActiveArea.width > (previousElement.width + element.width)) {
                    this.viewer.clientActiveArea.width -= (previousElement.width + element.width);
                }
                this.isYPositionUpdated = false;
            }
        }
        if (moveToNextPage) {
            this.moveToNextPage(this.viewer, lineWidget, undefined, true);
            this.cutClientWidth(element);
            this.hasFloatingElement = false;
            this.isXPositionUpdated = false;
            return;
        }
        if (currentListLevel.followCharacter !== 'None') {
            this.viewer.updateClientWidth(HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent));
        }
    };
    Layout.prototype.addBodyWidget = function (area, widget) {
        var bodyWidget;
        if (widget) {
            bodyWidget = widget;
        }
        else {
            bodyWidget = new BodyWidget();
        }
        bodyWidget.width = area.width;
        bodyWidget.x = area.x;
        bodyWidget.y = area.y;
        // this.addSectionInDictionary(this.viewer, section, bodyWidget);
        return bodyWidget;
    };
    /**
     * @private
     */
    Layout.prototype.addListLevels = function (abstractList) {
        for (var i = abstractList.levels.length; i < 9; i++) {
            var listLevel = new WListLevel(abstractList);
            var val = i % 3;
            if (abstractList.levels[0].listLevelPattern === 'Bullet') {
                listLevel.listLevelPattern = 'Bullet';
                listLevel.numberFormat = val === 0 ? String.fromCharCode(61623) : val === 1 ? String.fromCharCode(61551) + String.fromCharCode(32) : String.fromCharCode(61607);
                listLevel.characterFormat.fontFamily = listLevel.numberFormat === String.fromCharCode(61607) ? 'Wingdings' : 'Symbol';
            }
            else {
                listLevel.listLevelPattern = this.getListLevelPattern(val);
                listLevel.numberFormat = '%' + (i + 1).toString() + '.';
                listLevel.startAt = 1;
                listLevel.restartLevel = i;
            }
            listLevel.paragraphFormat = new WParagraphFormat(undefined);
            listLevel.paragraphFormat.leftIndent = 48 * (i + 1);
            listLevel.paragraphFormat.firstLineIndent = -24;
            abstractList.levels.push(listLevel);
        }
    };
    Layout.prototype.addSplittedLineWidget = function (lineWidget, elementIndex, splittedElementBox) {
        var index = elementIndex;
        if (this.isWrapText) {
            if (!isNullOrUndefined(splittedElementBox)) {
                lineWidget.children.splice(index + 1, 0, splittedElementBox);
                splittedElementBox.line = lineWidget;
            }
            return;
        }
        var columneBreak = false;
        var paragraph = lineWidget.paragraph;
        var movedElementBox = [];
        var lineIndex = paragraph.childWidgets.indexOf(lineWidget);
        if (!isNullOrUndefined(splittedElementBox)) {
            movedElementBox.push(splittedElementBox);
        }
        var newLineWidget = undefined;
        var previousElement = lineWidget.children[index];
        if (previousElement instanceof CommentCharacterElementBox && previousElement.commentType === 0 && index != 0) {
            index = index - 1;
        }
        else if (previousElement.isColumnBreak && isNullOrUndefined(previousElement.nextNode)) {
            columneBreak = true;
        }
        //Move Next element box to temp collection
        for (var i = index + 1; i < lineWidget.children.length; i++) {
            movedElementBox.push(lineWidget.children[i]);
        }
        if (movedElementBox.length > 0 || columneBreak) {
            if (lineIndex === paragraph.childWidgets.length - 1) {
                newLineWidget = new LineWidget(paragraph);
            }
            else {
                newLineWidget = paragraph.childWidgets[lineIndex + 1];
            }
            for (var j = 0; j < movedElementBox.length; j++) {
                movedElementBox[j].line = newLineWidget;
            }
            if (movedElementBox.length > 0) {
                lineWidget.children.splice(index + 1, lineWidget.children.length - 1);
                if (!isNullOrUndefined(lineWidget.layoutedElements) && lineWidget.layoutedElements.length > 0) {
                    lineWidget.layoutedElements.splice(index + 1, lineWidget.layoutedElements.length - 1);
                }
                newLineWidget.children = movedElementBox.concat(newLineWidget.children);
            }
            if (paragraph.childWidgets.indexOf(newLineWidget) === -1) {
                paragraph.childWidgets.splice(lineIndex + 1, 0, newLineWidget);
            }
        }
    };
    Layout.prototype.addElementToLine = function (paragraph, element) {
        if (!(element instanceof ShapeBase && element.textWrappingStyle !== 'Inline')) {
            if (this.isWrapText) {
                this.isWrapText = false;
                this.viewer.clientActiveArea.width = this.viewer.clientArea.right - this.viewer.clientActiveArea.x;
            }
            this.viewer.cutFromLeft(this.viewer.clientActiveArea.x + element.width);
        }
        if (paragraph.paragraphFormat.textAlignment === 'Justify' && element instanceof TextElementBox) {
            this.splitTextElementWordByWord(element);
        }
        if (element instanceof ImageElementBox) {
            element.line.skipClipImage = !element.isInlineImage;
        }
    };
    Layout.prototype.splitElementForClientArea = function (paragraph, element) {
        //const line: LineWidget = element.line;
        if (element.line.children.length > 0) {
            var previousElement = element.previousElement;
            var index = element.indexInOwner;
            // if line widget contain only single image element box need to skip this from splitting
            // else move element to next line
            if (element.line.children.length > 1) {
                if (previousElement && this.viewer.clientActiveArea.x !== this.viewer.clientArea.x) {
                    index -= 1;
                }
            }
            this.addSplittedLineWidget(element.line, index);
        }
    };
    Layout.prototype.splitByWord = function (lineWidget, paragraph, elementBox, text, width, characterFormat) {
        var index = this.getSplitIndexByWord(this.viewer.clientActiveArea.width, text, width, characterFormat, elementBox.scriptType);
        if (index > 0 && index < elementBox.length) {
            var indexOf = lineWidget.children.indexOf(elementBox);
            //const lineIndex: number = paragraph.childWidgets.indexOf(lineWidget);
            var splittedElementBox = new TextElementBox();
            text = text.substring(index);
            splittedElementBox.text = text;
            if (text[0] === ' ') {
                var prevLength = text.length;
                text = HelperMethods.trimStart(text); //To trim white space at starting of the text.
                index += prevLength - text.length;
            }
            splittedElementBox.characterFormat.copyFormat(elementBox.characterFormat);
            splittedElementBox.width = this.documentHelper.textHelper.getWidth(splittedElementBox.text, characterFormat, splittedElementBox.scriptType);
            if (splittedElementBox.text[splittedElementBox.text.length - 1] === ' ') {
                splittedElementBox.trimEndWidth = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(splittedElementBox.text), characterFormat, splittedElementBox.scriptType);
            }
            else {
                splittedElementBox.trimEndWidth = splittedElementBox.width;
            }
            splittedElementBox.characterRange = elementBox.characterRange;
            splittedElementBox.scriptType = elementBox.scriptType;
            //splittedElementBox.revisions = splittedElementBox.revisions;
            elementBox.text = elementBox.text.substr(0, index);
            if (elementBox.text !== ' ' && HelperMethods.endsWith(elementBox.text) && characterFormat.bidi
                && elementBox.characterRange === CharacterRangeType.RightToLeft && !this.isWrapText) {
                var textElement = this.spitTextElementByWhitespace(elementBox, characterFormat);
                indexOf = lineWidget.children.indexOf(textElement);
            }
            elementBox.width = this.documentHelper.textHelper.getWidth(elementBox.text, elementBox.characterFormat, elementBox.scriptType);
            if (elementBox.text[elementBox.text.length - 1] === ' ') {
                elementBox.trimEndWidth = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(elementBox.text), elementBox.characterFormat, elementBox.scriptType);
            }
            else {
                elementBox.trimEndWidth = elementBox.width;
            }
            if (elementBox.revisions.length > 0) {
                this.updateRevisionForSplittedElement(elementBox, splittedElementBox, true);
                splittedElementBox.isMarkedForRevision = elementBox.isMarkedForRevision;
            }
            splittedElementBox.height = elementBox.height;
            splittedElementBox.baselineOffset = elementBox.baselineOffset;
            this.splitErrorCollection(elementBox, splittedElementBox);
            this.addSplittedLineWidget(lineWidget, indexOf, splittedElementBox);
            this.addElementToLine(paragraph, elementBox);
            if (elementBox.width === 0) {
                lineWidget.children.splice(indexOf, 1);
            }
        }
    };
    Layout.prototype.spitTextElementByWhitespace = function (textElement, format) {
        var lineWidget = textElement.line;
        var indexOf = lineWidget.children.indexOf(textElement);
        var text = textElement.text;
        var elementBox = new TextElementBox();
        var index = text.length - 1;
        textElement.text = text.substring(0, index);
        elementBox.text = text.substring(index);
        elementBox.characterFormat.copyFormat(textElement.characterFormat);
        elementBox.line = lineWidget;
        elementBox.characterRange = CharacterRangeType.WordSplit;
        elementBox.scriptType = textElement.scriptType;
        elementBox.height = textElement.height;
        elementBox.baselineOffset = textElement.baselineOffset;
        elementBox.width = this.documentHelper.textHelper.getWidth(elementBox.text, format, elementBox.scriptType);
        lineWidget.children.splice(indexOf + 1, 0, elementBox);
        if (textElement.revisions.length > 0) {
            this.updateRevisionForSplittedElement(textElement, elementBox, index > 0, true);
            elementBox.isMarkedForRevision = textElement.isMarkedForRevision;
        }
        return elementBox;
    };
    Layout.prototype.splitErrorCollection = function (elementBox, splittedBox) {
        if (elementBox.errorCollection.length > 0) {
            var errorCollection = [];
            var ignoreItems = elementBox.ignoreOnceItems;
            for (var i = 0; i < elementBox.errorCollection.length; i++) {
                errorCollection.push(elementBox.errorCollection[i]);
            }
            for (var j = 0; j < elementBox.errorCollection.length; j++) {
                var index = elementBox.text.indexOf(elementBox.errorCollection[j].text);
                var textElement = elementBox.errorCollection[j];
                if (index < 0) {
                    errorCollection.splice(0, 1);
                    splittedBox.errorCollection.push(textElement);
                }
                else if (splittedBox.text.indexOf(textElement.text) > 0) {
                    splittedBox.errorCollection.push(textElement);
                }
            }
            splittedBox.ignoreOnceItems = ignoreItems;
            elementBox.ignoreOnceItems = [];
            elementBox.errorCollection = errorCollection;
        }
    };
    Layout.prototype.splitByCharacter = function (lineWidget, textElement, text, width, characterFormat) {
        var paragraph = lineWidget.paragraph;
        var atleastSpacing = paragraph.paragraphFormat.lineSpacingType === 'AtLeast' ? paragraph.paragraphFormat.afterSpacing : 0;
        var index = this.getTextSplitIndexByCharacter(this.viewer.clientArea.width, this.viewer.clientActiveArea.width, text, width, characterFormat, textElement.scriptType);
        // if the index is zero, no need to split text by character. so, we can avoid the empty text element creation.
        if (index === 0 && textElement.previousNode instanceof ImageElementBox && textElement.previousNode.textWrappingType === "Right") {
            return;
        }
        else if (index === 0 && !isNullOrUndefined(textElement) && textElement.length > 0 && (Math.max(textElement.height, atleastSpacing) <= this.viewer.clientArea.height)
            && this.viewer.clientActiveArea.width === 0 && lineWidget.children.indexOf(textElement) === 0) {
            //Eventhough, there is zero remaining client area width and fit atleast one character of word in a line only if there is no item fitted in same line.
            index = 1;
        }
        var splitWidth = 0;
        if (index < textElement.length) {
            splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.substring(0, index), characterFormat, textElement.scriptType);
            text = text.substring(index);
        }
        if (splitWidth > this.viewer.clientActiveArea.width && textElement.indexInOwner > 0) {
            this.addSplittedLineWidget(lineWidget, textElement.indexInOwner - 1);
            return;
        }
        var indexOf = lineWidget.children.indexOf(textElement);
        if (index < textElement.length) {
            //const lineIndex: number = paragraph.childWidgets.indexOf(lineWidget);
            var splittedElement = new TextElementBox();
            splittedElement.text = text;
            splittedElement.errorCollection = textElement.errorCollection;
            splittedElement.scriptType = textElement.scriptType;
            textElement.text = textElement.text.substr(0, index);
            splittedElement.characterFormat.copyFormat(textElement.characterFormat);
            splittedElement.width = this.documentHelper.textHelper.getWidth(splittedElement.text, characterFormat, splittedElement.scriptType);
            if (splittedElement.text[splittedElement.text.length - 1] === ' ') {
                splittedElement.trimEndWidth = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(splittedElement.text), characterFormat, splittedElement.scriptType);
            }
            else {
                splittedElement.trimEndWidth = splittedElement.width;
            }
            splittedElement.characterRange = textElement.characterRange;
            textElement.width = this.documentHelper.textHelper.getWidth(textElement.text, characterFormat, textElement.scriptType);
            if (textElement.text[textElement.text.length - 1] === ' ') {
                textElement.trimEndWidth = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(textElement.text), characterFormat, textElement.scriptType);
            }
            else {
                textElement.trimEndWidth = textElement.width;
            }
            splittedElement.height = textElement.height;
            splittedElement.baselineOffset = textElement.baselineOffset;
            lineWidget.children.splice(textElement.indexInOwner + 1, 0, splittedElement);
            if (textElement.revisions.length > 0) {
                this.updateRevisionForSplittedElement(textElement, splittedElement, index > 0);
                splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
            }
            this.addElementToLine(paragraph, textElement);
            this.addSplittedLineWidget(lineWidget, indexOf);
            if (textElement.width === 0) {
                lineWidget.children.splice(indexOf, 1);
            }
        }
        else {
            //Adds the last text element on inline to line elements collection
            this.addSplittedLineWidget(lineWidget, indexOf);
            this.addElementToLine(paragraph, textElement);
        }
    };
    Layout.prototype.updateRevisionForSplittedElement = function (item, splittedElement, isSplitted, isJustify) {
        if (item.revisions.length > 0) {
            for (var i = 0; i < item.revisions.length; i++) {
                var currentRevision = item.revisions[i];
                if (isSplitted) {
                    splittedElement.revisions.push(currentRevision);
                    var rangeIndex = currentRevision.range.indexOf(item);
                    if (rangeIndex < 0) {
                        currentRevision.range.push(splittedElement);
                    }
                    else {
                        if (isJustify) {
                            currentRevision.range.splice(rangeIndex, 0, splittedElement);
                        }
                        else {
                            currentRevision.range.splice(rangeIndex + 1, 0, splittedElement);
                        }
                    }
                }
                else {
                    var rangeIndex = currentRevision.range.indexOf(item);
                    currentRevision.range.splice(rangeIndex, 1);
                    currentRevision.range.splice(rangeIndex, 0, splittedElement);
                    splittedElement.revisions.push(currentRevision);
                }
            }
        }
    };
    Layout.prototype.splitTextElementWordByWord = function (textElement) {
        var lineWidget = textElement.line;
        var indexOf = lineWidget.children.indexOf(textElement);
        var startIndex = indexOf;
        var paddingLeft = textElement.padding.left;
        textElement.padding.left = 0;
        var text = textElement.text;
        var format;
        var characterUptoWs = text.trim().indexOf(' ');
        if (characterUptoWs >= 0) {
            lineWidget.children.splice(indexOf, 1);
            format = textElement.characterFormat;
            //const fontSize: number = format.fontSize;
            var index = textElement.length - HelperMethods.trimStart(text).length; //Trim start
            while (index < textElement.length) {
                index = this.getTextIndexAfterSpace(text, index);
                if (index === 0 || index === textElement.length) {
                    break;
                }
                if (index < textElement.length) {
                    var splittedElement = new TextElementBox();
                    var splittedText = text.substring(0, index);
                    text = text.substring(index);
                    if (text.substring(0, 1) === ' ') {
                        // start of the text is trimmed and its length is reduced from text length.
                        index += text.length - HelperMethods.trimStart(text).length;
                    }
                    splittedElement.text = splittedText;
                    splittedElement.characterFormat.copyFormat(textElement.characterFormat);
                    splittedElement.line = lineWidget;
                    splittedElement.height = textElement.height;
                    splittedElement.baselineOffset = textElement.baselineOffset;
                    splittedElement.characterRange = textElement.characterRange;
                    splittedElement.scriptType = textElement.scriptType;
                    lineWidget.children.splice(indexOf, 0, splittedElement);
                    if (textElement.revisions.length > 0) {
                        this.updateRevisionForSplittedElement(textElement, splittedElement, index > 0, true);
                        splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
                    }
                    if (splittedElement.text !== ' ' && HelperMethods.endsWith(splittedElement.text) && format.bidi && splittedElement.characterRange === CharacterRangeType.RightToLeft) {
                        var elementBox = this.spitTextElementByWhitespace(splittedElement, format);
                        indexOf = lineWidget.children.indexOf(elementBox);
                    }
                    splittedElement.width = this.documentHelper.textHelper.getWidth(splittedElement.text, format, splittedElement.scriptType);
                    if (splittedElement.text[splittedElement.text.length - 1] === ' ') {
                        splittedElement.trimEndWidth = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(splittedElement.text), format, splittedElement.scriptType);
                    }
                    else {
                        splittedElement.trimEndWidth = splittedElement.width;
                    }
                    textElement.text = text;
                    textElement.width = this.documentHelper.textHelper.getWidth(textElement.text, textElement.characterFormat, textElement.scriptType);
                    if (textElement.text[textElement.text.length - 1] === ' ') {
                        textElement.trimEndWidth = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(textElement.text), textElement.characterFormat, textElement.scriptType);
                    }
                    else {
                        textElement.trimEndWidth = textElement.width;
                    }
                    if (textElement.width === 0 && lineWidget.children.indexOf(textElement) !== -1) {
                        lineWidget.children.splice(lineWidget.children.indexOf(textElement), 1);
                    }
                    index = 0;
                    indexOf++;
                }
            }
            textElement.text = text;
            lineWidget.children.splice(indexOf, 0, textElement);
        }
        lineWidget.children[startIndex].padding.left = paddingLeft;
    };
    Layout.prototype.isSplitByHyphen = function (element, text) {
        if (!isNullOrUndefined(element.previousElement)) {
            if (element.previousElement instanceof TextElementBox || element.previousElement instanceof ListTextElementBox) {
                var test = element.previousElement.text;
                return (text.substring(0, 1) === '-') && (test.substring(test.length - 1, test.length) !== ' ');
            }
        }
        return (text.substring(0, 1) === '-');
    };
    Layout.prototype.splitTextForClientArea = function (lineWidget, element, text, width, characterFormat) {
        var paragraph = lineWidget.paragraph;
        var isSplitByWord = true;
        var index = -1;
        if (!(text.substring(0, 1) === ' ') && !this.isSplitByHyphen(element, text)) {
            var textWidth = width;
            var characterUptoWS = 0;
            characterUptoWS = HelperMethods.trimEnd(text).indexOf(' ') + 1;
            if (characterUptoWS == 0) {
                characterUptoWS = HelperMethods.trimEnd(text).indexOf('-') + 1;
            }
            index = characterUptoWS;
            //Checks whether text not starts with white space. If starts with white space, no need to check previous text blocks.
            if (index > 0) {
                textWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.slice(0, index), characterFormat, element.scriptType);
            }
            if (this.viewer.clientActiveArea.width < textWidth && !this.documentHelper.textHelper.isUnicodeText(text, element.scriptType)
                && !this.isWordFittedByJustification(element, textWidth)) {
                //Check and split the previous text elements to next line.
                isSplitByWord = this.checkPreviousElement(lineWidget, lineWidget.children.indexOf(element));
                if (isSplitByWord) {
                    //lineWidget = paragraph.childWidgets[paragraph.childWidgets.indexOf(lineWidget) + 1] as LineWidget;
                    //isSplitByWord = textWidth <= this.viewer.clientActiveArea.width;
                    return;
                }
            }
        }
        else {
            index = 1;
        }
        var isSplitWordByWord = true;
        if (this.documentHelper.textHelper.isUnicodeText(text, element.scriptType) && element.scriptType === 3 && text.length - 1 === text.indexOf(' ')) {
            isSplitWordByWord = false;
        }
        if (width <= this.viewer.clientActiveArea.width) {
            //Fits the text in current line.
            this.addElementToLine(paragraph, element);
        }
        else if (isSplitByWord && (index > 0 || (text.indexOf(' ') !== -1 && isSplitWordByWord) || text.indexOf('-') !== -1)) {
            this.splitByWord(lineWidget, paragraph, element, text, width, characterFormat);
        }
        else {
            this.splitByCharacter(lineWidget, element, text, width, characterFormat);
        }
    };
    Layout.prototype.splitByLineBreakOrTab = function (viewer, span, index, spiltBy) {
        // Splits tab character to separate SpanAdv
        var inlineIndex = span.line.children.indexOf(span);
        var value = span.text;
        var remainder = value.substring(index);
        var newSpan = spiltBy === '\t' ? new TabElementBox() : new TextElementBox();
        newSpan.line = span.line;
        this.updateRevisionForSplittedElement(span, newSpan, true);
        newSpan.characterFormat.copyFormat(span.characterFormat);
        newSpan.characterRange = span.characterRange;
        span.line.children.splice(inlineIndex + 1, 0, newSpan);
        span.isWidthUpdated = false;
        if (index > 0 && remainder.length === 1) {
            newSpan.text = value.substring(index);
            span.text = value.substring(0, index);
        }
        else if (index > 0) {
            newSpan.text = spiltBy;
            var newText = new TextElementBox();
            newText.line = span.line;
            newText.text = value.substring(index + 1);
            this.updateRevisionForSplittedElement(span, newText, true);
            newText.characterFormat.copyFormat(span.characterFormat);
            newText.characterRange = span.characterRange;
            span.line.children.splice(inlineIndex + 2, 0, newText);
            span.text = value.substring(0, index);
        }
        else if (remainder !== '') {
            newSpan.text = value.substring(index + 1);
            span.text = spiltBy;
        }
    };
    /* eslint-disable  */
    Layout.prototype.moveToNextLine = function (line, isMultiColumnSplit, index) {
        var paragraph = line.paragraph;
        var paraFormat = paragraph.paragraphFormat;
        var isParagraphStart = line.isFirstLine();
        var isParagraphEnd = line.isLastLine();
        var height = 0;
        var maxDescent = 0;
        var afterSpacing = 0;
        var beforeSpacing = 0;
        var lineSpacing = 0;
        var firstLineIndent = 0;
        var borders = paraFormat.borders;
        this.updateLineWidget(line);
        height = this.maxTextHeight;
        maxDescent = height - this.maxTextBaseline;
        var pageIndex = 0;
        var skip2013Justification = false;
        var canRenderParagraphBorders = this.documentHelper.canRenderBorder(paragraph);
        if (paragraph.bodyWidget && !(paragraph.bodyWidget instanceof HeaderFooterWidget)) {
            pageIndex = this.documentHelper.pages.indexOf(paragraph.bodyWidget.page);
        }
        //Updates before spacing at the top of Paragraph first line.
        if (isParagraphStart) {
            beforeSpacing = this.getBeforeSpacing(paragraph, pageIndex);
            firstLineIndent = HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
        }
        //Updates after spacing at the bottom of Paragraph last line.
        if (isParagraphEnd) {
            afterSpacing = HelperMethods.convertPointToPixel(this.getAfterSpacing(paragraph));
        }
        if ((paraFormat.bidi || this.isContainsRtl(line))) {
            this.shiftElementsForRTLLayouting(line, paraFormat.bidi);
            // this.reArrangeElementsForRtl(line, paraFormat.bidi);
            this.isRTLLayout = true;
        }
        if (isNaN(this.maxTextHeight)) {
            //Calculate line height and descent based on formatting defined in paragraph.
            var measurement = this.documentHelper.textHelper.measureText('a', paragraph.characterFormat);
            height = measurement.Height;
            maxDescent = height - measurement.BaselineOffset;
        }
        else {
            height = this.maxTextHeight;
            maxDescent = height - this.maxTextBaseline;
        }
        // Gets line spacing.
        lineSpacing = this.getLineSpacing(paragraph, height);
        if ((line.skipClipImage || paragraph.paragraphFormat.lineSpacing >= 14 || lineSpacing < 0) && paraFormat.lineSpacingType === 'Exactly'
            && lineSpacing < maxDescent + this.maxBaseline) {
            lineSpacing = maxDescent + this.maxBaseline;
        }
        var subWidth = 0;
        var whiteSpaceCount = 0;
        var getWidthAndSpace;
        var textAlignment = paraFormat.textAlignment;
        var totalSpaceCount = 0;
        var trimmedSpaceWidth = 0;
        // calculates the sub width, for text alignments - Center, Right, Justify.
        // if the element is paragraph end and para bidi is true and text alignment is justify
        // we need to calculate subwidth and add it to the left margin of the element.
        if (textAlignment !== 'Left' && this.viewer.textWrap && (!(textAlignment === 'Justify' && isParagraphEnd)
            || (textAlignment === 'Justify' && paraFormat.bidi) || (this.is2013Justification && isParagraphEnd))) {
            getWidthAndSpace = this.getSubWidth(line, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
            subWidth = getWidthAndSpace[0].subWidth;
            whiteSpaceCount = getWidthAndSpace[0].spaceCount;
            totalSpaceCount = getWidthAndSpace[0].totalSpaceCount;
            trimmedSpaceWidth = getWidthAndSpace[0].trimmedSpaceWidth;
            skip2013Justification = line.isEndsWithPageBreak || line.isEndsWithColumnBreak || line.isEndsWithLineBreak || line.paragraph.bidi || this.isRTLLayout;
        }
        if (!skip2013Justification && (getWidthAndSpace && getWidthAndSpace.length === 1) && this.viewer.clientActiveArea.width > 0 &&
            !isParagraphEnd && !this.is2013Justification && textAlignment === 'Justify' && this.documentHelper.compatibilityMode === 'Word2013') {
            var availableWidth = this.viewer.clientActiveArea.width;
            var totalSpaceWidth = this.getTotalSpaceWidth(line);
            var averageWidthOfSpace = totalSpaceWidth / totalSpaceCount;
            var avgAvailableLineWidthForSpace = (availableWidth) / totalSpaceCount;
            var diffFactor = (avgAvailableLineWidthForSpace / averageWidthOfSpace) * 100;
            var widthForAdjustment = 0;
            if (diffFactor <= 33) {
                widthForAdjustment = totalSpaceWidth / 8;
            }
            else {
                widthForAdjustment = totalSpaceWidth / 4;
            }
            this.viewer.clientActiveArea.x -= widthForAdjustment;
            this.viewer.clientActiveArea.width += widthForAdjustment;
            this.is2013Justification = true;
            if (isMultiColumnSplit) {
                this.splitParagraphForMultiColumn(line, index);
            }
            else {
                this.moveElementFromNextLine(line);
                this.nextElementToLayout = line.children[line.children.length - 1];
            }
            return;
        }
        else {
            if (this.is2013Justification && isParagraphEnd) {
                if (subWidth > 0) {
                    subWidth = 0;
                    whiteSpaceCount = 0;
                }
            }
            this.is2013Justification = false;
            this.nextElementToLayout = undefined;
        }
        var addSubWidth = false;
        var wrapIndex = 0;
        var lineSpacingType = paraFormat.lineSpacingType;
        var isStarted = false;
        var children = line.renderedElements;
        var maxElementHeight = 0;
        var maxElementBottomMargin = 0;
        var maxElementTopMargin = 0;
        var elementLeft = this.viewer.clientArea.x;
        var isHidden = true;
        for (var i = 0; i < children.length; i++) {
            var topMargin = 0;
            var bottomMargin = 0;
            var leftMargin = 0;
            var elementBox = children[i];
            if (isHidden && !elementBox.characterFormat.hidden) {
                isHidden = false;
            }
            if (!isNullOrUndefined(getWidthAndSpace) && isStarted && elementBox.padding.left > 0 &&
                (getWidthAndSpace.length > wrapIndex + 1)) {
                var previousWidth = subWidth;
                if (textAlignment === "Justify") {
                    previousWidth = subWidth * getWidthAndSpace[wrapIndex].spaceCount;
                }
                else if (textAlignment === "Center") {
                    previousWidth = subWidth / 2;
                }
                elementBox.padding.left = elementBox.padding.left - previousWidth;
                var subWidthInfo = getWidthAndSpace[++wrapIndex];
                subWidth = subWidthInfo.subWidth;
                whiteSpaceCount = subWidthInfo.spaceCount;
            }
            if (elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline') {
                continue;
            }
            isStarted = true;
            var alignElements = this.alignLineElements(elementBox, topMargin, bottomMargin, maxDescent, addSubWidth, subWidth, textAlignment, whiteSpaceCount, i === children.length - 1);
            if (textAlignment === "Justify" && elementBox instanceof ShapeBase && elementBox.textWrappingStyle === 'Inline' && subWidth !== 0) {
                elementBox.x = elementLeft;
                if (elementBox instanceof ShapeElementBox) {
                    for (var i_3 = 0; i_3 < elementBox.textFrame.childWidgets.length; i_3++) {
                        var widget = elementBox.textFrame.childWidgets[i_3];
                        var indent = widget.bidi ? widget.rightIndent : widget.leftIndent;
                        widget.x = elementLeft + HelperMethods.convertPointToPixel(indent + elementBox.textFrame.marginLeft);
                    }
                }
            }
            elementLeft += elementBox.width;
            line.maxBaseLine = this.maxBaseline;
            topMargin = alignElements.topMargin;
            bottomMargin = alignElements.bottomMargin;
            addSubWidth = alignElements.addSubWidth;
            whiteSpaceCount = alignElements.whiteSpaceCount;
            //Updates line spacing, paragraph after/ before spacing and aligns the text to base line offset.
            if (lineSpacingType === 'Multiple') {
                if (lineSpacing > height) {
                    bottomMargin += lineSpacing - height;
                }
                else {
                    topMargin += lineSpacing - height;
                }
            }
            else if (lineSpacingType === 'Exactly') {
                topMargin += lineSpacing - (topMargin + elementBox.height + bottomMargin);
            }
            else if (lineSpacing > topMargin + elementBox.height + bottomMargin) {
                topMargin += lineSpacing - (topMargin + elementBox.height + bottomMargin);
            }
            if (pageIndex > 0 && paragraph === paragraph.bodyWidget.childWidgets[0] && this.documentHelper.pages[pageIndex].sectionIndex === this.documentHelper.pages[pageIndex - 1].sectionIndex) {
                topMargin += 0;
            }
            else {
                topMargin += beforeSpacing;
            }
            if (borders.top.lineStyle != 'None') {
                if (line.isFirstLine() && !canRenderParagraphBorders.skipTopBorder) {
                    topMargin += HelperMethods.convertPointToPixel(borders.top.lineWidth + borders.top.space);
                }
            }
            if (borders.bottom.lineStyle != 'None') {
                if (line.isLastLine() && !canRenderParagraphBorders.skipBottomBorder) {
                    bottomMargin += HelperMethods.convertPointToPixel(borders.bottom.lineWidth + borders.bottom.space);
                }
            }
            bottomMargin += afterSpacing;
            var previousElement = i > 0 ? children[i - 1] : undefined;
            if (i === 0 || (!(elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline') &&
                previousElement instanceof ShapeBase && previousElement.textWrappingStyle !== 'Inline' && previousElement.indexInOwner < elementBox.indexInOwner)
                || elementBox.padding.left > 0) {
                line.height = topMargin + elementBox.height + bottomMargin;
                if (textAlignment === 'Right' || (textAlignment === 'Justify' && paraFormat.bidi && (isParagraphEnd || trimmedSpaceWidth < 0))) {
                    //Aligns the text as right justified and consider subwidth for bidirectional paragrph with justify.
                    if (trimmedSpaceWidth < 0) {
                        leftMargin = trimmedSpaceWidth;
                    }
                    else {
                        leftMargin = subWidth;
                    }
                }
                else if (textAlignment === 'Center') {
                    //Aligns the text as center justified.
                    if (subWidth < 0) {
                        leftMargin = subWidth;
                    }
                    else {
                        leftMargin = subWidth / 2;
                    }
                }
            }
            elementBox.margin = new Margin(leftMargin, topMargin, 0, bottomMargin);
            elementBox.line = line;
            if (maxElementHeight < elementBox.height) {
                maxElementHeight = elementBox.height;
                maxElementBottomMargin = elementBox.margin.bottom;
                maxElementTopMargin = elementBox.margin.top;
            }
            if (elementBox instanceof ShapeElementBox && elementBox.textWrappingStyle === "Inline") {
                if (i !== 0 || elementBox.margin.left > 0) {
                    var elementLeftMargin = children[0].margin.left;
                    elementBox.x += elementLeftMargin;
                    for (var i_4 = 0; i_4 < elementBox.textFrame.childWidgets.length; i_4++) {
                        var widget = elementBox.textFrame.childWidgets[i_4];
                        if (widget instanceof TableWidget) {
                            widget.updateChildWidgetLeft(widget.x + elementLeftMargin);
                        }
                        else {
                            widget.x += elementLeftMargin;
                        }
                    }
                }
                this.updateShapeYPosition(elementBox);
            }
        }
        if (isHidden) {
            line.height = 0;
        }
        line.margin = new Margin(0, maxElementTopMargin, 0, maxElementBottomMargin);
        this.adjustPositionBasedOnTopAndBottom(line);
        this.checkInbetweenShapeOverlap(line);
        if (!isMultiColumnSplit && line.isLastLine() && line.indexInOwner === 0 && line.paragraph.paragraphFormat.widowControl) {
            var previousSplitWidget = line.paragraph.previousSplitWidget;
            if (!isNullOrUndefined(previousSplitWidget) && !previousSplitWidget.isEndsWithPageBreak && !previousSplitWidget.isEndsWithColumnBreak && previousSplitWidget.indexInOwner !== 0) {
                var startLineIndex = previousSplitWidget.childWidgets.length - 1;
                if (previousSplitWidget.childWidgets.length === 2) {
                    startLineIndex = 0;
                }
                this.splitParagraph(previousSplitWidget, startLineIndex, line.paragraph);
                this.updateClientAreaForNextBlock(line, line.paragraph);
            }
        }
        else if (isMultiColumnSplit) {
            this.splitParagraphForMultiColumn(line, index);
        }
        if (!isMultiColumnSplit) {
            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + line.height);
        }
        this.wrapPosition = [];
    };
    Layout.prototype.updateShapeYPosition = function (elementBox) {
        if (elementBox.margin.top > 0) {
            elementBox.y += elementBox.margin.top;
            for (var j = 0; j < elementBox.textFrame.childWidgets.length; j++) {
                elementBox.textFrame.childWidgets[j].y += elementBox.margin.top;
            }
        }
    };
    Layout.prototype.getBodyWidget = function (section, isFirstBody) {
        if (isFirstBody) {
            while (section && section.columnIndex !== 0) {
                section = section.previousRenderedWidget;
            }
        }
        else {
            while (section) {
                if (isNullOrUndefined(section.nextRenderedWidget) || section.columnIndex === section.sectionFormat.numberOfColumns - 1 || section.index !== section.nextRenderedWidget.index) {
                    break;
                }
                section = section.nextRenderedWidget;
            }
        }
        return section;
    };
    Layout.prototype.splitParagraphForMultiColumn = function (line, index) {
        this.splitParagraph(line.paragraph, index, undefined);
        if ((isNullOrUndefined(line.paragraph.previousRenderedWidget) && index == 0) ||
            (!isNullOrUndefined(line.paragraph.previousRenderedWidget) && line.paragraph.previousRenderedWidget.bodyWidget.sectionIndex !== line.paragraph.bodyWidget.sectionIndex)) {
            this.moveBlocksToNextPage(line.paragraph);
        }
        else {
            this.moveBlocksToNextPage(line.paragraph.previousRenderedWidget);
        }
        var clientHeight = this.viewer.clientActiveArea.height;
        this.viewer.updateClientArea(line.paragraph.bodyWidget, line.paragraph.bodyWidget.page);
        this.viewer.clientActiveArea.y = line.paragraph.bodyWidget.y;
        this.viewer.clientActiveArea.height = clientHeight;
        if (line.paragraph.bodyWidget.sectionFormat.equalWidth || line.paragraph.bodyWidget.sectionFormat.numberOfColumns - 1 === line.paragraph.bodyWidget.columnIndex) {
            var parawidget = line.paragraph;
            this.documentHelper.blockToShift = parawidget;
            this.shiftLayoutedItems(false, true);
        }
    };
    //Checks Inbetween Overlap & Updates Line marginTop
    Layout.prototype.checkInbetweenShapeOverlap = function (line, floatingElements) {
        var _this = this;
        if (!(line.paragraph.containerWidget instanceof TextFrame) && line.paragraph.bodyWidget) {
            var overlapShape_1;
            var lineY_1 = this.getLineY(line);
            var isInsideTable_1 = line.paragraph.isInsideTable;
            var emptyParaPosition_1 = line.paragraph.y;
            var isFloatingElementPresent_1 = true;
            if (isNullOrUndefined(floatingElements)) {
                isFloatingElementPresent_1 = false;
                floatingElements = line.paragraph.bodyWidget.floatingElements;
            }
            /* eslint:disable */
            floatingElements.sort(function (a, b) { return a.y - b.y; });
            floatingElements.forEach(function (shape) {
                if (isInsideTable_1 && shape.line && !shape.line.paragraph.isInsideTable || isNullOrUndefined(shape.line)) {
                    return;
                }
                var lineRect;
                if (shape.textWrappingStyle === 'TopAndBottom' && shape instanceof ImageElementBox && !line.paragraph.isEmpty()) {
                    lineRect = new Rect(line.paragraph.x, _this.viewer.clientActiveArea.y, line.paragraph.width, line.children[0].height);
                }
                else {
                    lineRect = new Rect(line.paragraph.x, _this.viewer.clientActiveArea.y, line.paragraph.width, line.height);
                }
                var shapeRect = new Rect(shape.x, shape.y - shape.distanceTop, shape.width, shape.height);
                if (shape.line && _this.isRelayout && !_this.isRelayoutOverlap && _this.viewer.documentHelper.selection.isExistAfter(shape.line.paragraph, line.paragraph)
                    || _this.isRelayout && _this.isRelayoutOverlap && _this.viewer.documentHelper.selection.isExistAfter(shape.line.paragraph, _this.endOverlapWidget)) {
                    return;
                }
                var considerShape = (shape.textWrappingStyle === 'TopAndBottom');
                var updatedFloatPosition = ((shape.y + shape.height + shape.distanceBottom) - lineY_1);
                if (overlapShape_1 && considerShape &&
                    overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom + line.height > shape.y - shape.distanceTop &&
                    overlapShape_1.y - overlapShape_1.distanceTop < shape.y - shape.distanceTop &&
                    shape.y + shape.height + shape.distanceBottom > overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom) {
                    overlapShape_1 = shape;
                    if (line.paragraph.isEmpty() && isFloatingElementPresent_1) {
                        line.paragraph.y = emptyParaPosition_1;
                        line.paragraph.y += updatedFloatPosition;
                    }
                    else {
                        line.marginTop = updatedFloatPosition;
                    }
                }
                else if (considerShape && !overlapShape_1 && lineRect.isIntersecting(shapeRect)) {
                    overlapShape_1 = shape;
                    if (line.paragraph.isEmpty() && isFloatingElementPresent_1) {
                        line.paragraph.y += updatedFloatPosition;
                    }
                    else {
                        line.marginTop = updatedFloatPosition;
                    }
                }
            });
            if (overlapShape_1) {
                this.viewer.cutFromTop(overlapShape_1.y + overlapShape_1.height + overlapShape_1.distanceBottom);
            }
            else if (this.isRelayoutOverlap) {
                line.marginTop = 0;
            }
        }
    };
    Layout.prototype.getLineY = function (line) {
        var para = line.paragraph;
        var lineY = para.y;
        if (!para.isEmpty()) {
            var lineWidget = para.firstChild;
            while (lineWidget !== line) {
                lineY = lineY + lineWidget.height + lineWidget.marginTop;
                lineWidget = lineWidget.nextLine;
            }
        }
        return lineY;
    };
    Layout.prototype.updateLineWidget = function (line) {
        var spaceHeight = 0;
        var spaceBaseline = 0;
        var isContainsImage = false;
        var isFieldCode = false;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            if (element instanceof FieldElementBox && element.fieldType === 2) {
                isFieldCode = false;
            }
            if (isFieldCode || element.characterFormat.hidden) {
                continue;
            }
            if (element instanceof FieldElementBox && element.fieldType === 0) {
                isFieldCode = true;
            }
            if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline') {
                continue;
            }
            if (element instanceof TextElementBox && element.text.replace(/\s+/g, '').length === 0 && element.text !== String.fromCharCode(160)) {
                if (spaceHeight < element.height) {
                    spaceHeight = element.height;
                    spaceBaseline = element.baselineOffset;
                }
                continue;
            }
            if (element instanceof TextElementBox || element instanceof ListTextElementBox) {
                var elementHeight = element.height;
                var baselineOffset = element.baselineOffset;
                var isCellContentControl = false;
                //We have increased the checkbox form field font size using a constant factor `CHECK_BOX_FACTOR`
                //To match the MS Word check box rendering size.
                //Due to it line height also get increased. So, handled adjusting height while updating line height.
                if (element instanceof TextElementBox && element.isCheckBoxElement && !isNullOrUndefined(element.previousNode) && element.previousNode instanceof ContentControl && (element.previousNode.contentControlWidgetType === 'Cell' || element.previousNode.contentControlWidgetType === 'Inline')) {
                    isCellContentControl = true;
                }
                if (element instanceof TextElementBox && element.isCheckBoxElement && !isCellContentControl) {
                    elementHeight = elementHeight / CHECK_BOX_FACTOR;
                    baselineOffset = baselineOffset / CHECK_BOX_FACTOR;
                }
                if (this.maxTextHeight < elementHeight) {
                    this.maxTextHeight = elementHeight;
                    this.maxTextBaseline = baselineOffset;
                }
                if (this.maxBaseline < this.maxTextBaseline) {
                    this.maxBaseline = this.maxTextBaseline;
                }
            }
            else if (this.maxBaseline < element.height) {
                this.maxBaseline = element.height;
                if (element instanceof ImageElementBox) {
                    isContainsImage = true;
                }
            }
        }
        if (this.maxTextHeight === 0 && spaceHeight !== 0) {
            if (isContainsImage) {
                this.maxTextHeight = 0;
                this.maxTextBaseline = 0;
            }
            else {
                if (line.isLastLine() && this.documentHelper.selection) {
                    var paragraphMarkSize = this.documentHelper.selection.getParagraphMarkSize(line.paragraph, 0, 0);
                    this.maxTextHeight = paragraphMarkSize.height;
                    this.maxTextBaseline = spaceBaseline;
                }
                else {
                    this.maxTextHeight = spaceHeight;
                    this.maxTextBaseline = spaceBaseline;
                }
                if (this.maxBaseline < this.maxTextBaseline) {
                    this.maxBaseline = this.maxTextBaseline;
                }
            }
        }
    };
    /**
     * @private
     */
    Layout.prototype.reLayoutEndnote = function () {
        var lastPage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
        if (!isNullOrUndefined(lastPage) && !isNullOrUndefined(lastPage.endnoteWidget)) {
            var clientActiveArea = this.viewer.clientActiveArea.clone();
            var bodyWidget = this.getBodyWidget(lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1], true);
            this.viewer.updateClientArea(bodyWidget, bodyWidget.page);
            var height = this.getNextWidgetHeight(bodyWidget);
            if (height > 0) {
                this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                this.viewer.clientActiveArea.y = height;
            }
            this.layoutfootNote(lastPage.endnoteWidget);
            this.viewer.clientActiveArea = clientActiveArea;
        }
    };
    Layout.prototype.moveEndnoteToNextPage = function (endnote, bodyWidget, isMoveEntireEndnote, currentBodyIndex) {
        if (isMoveEntireEndnote) {
            var newBodyWidget = this.createSplitBody(bodyWidget);
            var nextPage = this.viewer.createNewPage(newBodyWidget);
            this.viewer.updateClientArea(newBodyWidget, newBodyWidget.page);
            newBodyWidget.y = bodyWidget.y = this.viewer.clientActiveArea.y;
            for (var i = 0; i < endnote.bodyWidgets.length; i++) {
                endnote.bodyWidgets[i].page = nextPage;
                endnote.bodyWidgets[i].containerWidget = endnote;
            }
            endnote.page.endnoteWidget = undefined;
            nextPage.endnoteWidget = endnote;
            endnote.page = nextPage;
        }
        else {
            var page = bodyWidget.page;
            // if the page doesn't have a endNoteWidget, we create endNote, move the endnote to next page.
            if (isNullOrUndefined(page.endnoteWidget)) {
                var newEndnote = new FootNoteWidget();
                newEndnote.footNoteType = 'Endnote';
                newEndnote.page = page;
                newEndnote.bodyWidgets.push(bodyWidget);
                bodyWidget.containerWidget = newEndnote;
                for (var i = currentBodyIndex + 1; i < endnote.bodyWidgets.length; i++) {
                    var currentBodyWidget = endnote.bodyWidgets[i];
                    endnote.bodyWidgets.splice(i, 1);
                    newEndnote.bodyWidgets.push(currentBodyWidget);
                    currentBodyWidget.containerWidget = newEndnote;
                    currentBodyWidget.page = page;
                    i--;
                }
                page.endnoteWidget = newEndnote;
            }
            // if the page has a endNoteWidget, we move the endnote to next page.
            else {
                if (page.endnoteWidget.bodyWidgets.indexOf(bodyWidget) === -1) {
                    page.endnoteWidget.bodyWidgets.splice(0, 0, bodyWidget);
                    bodyWidget.containerWidget = page.endnoteWidget;
                }
                for (var i = endnote.bodyWidgets.length - 1; i > currentBodyIndex; i--) {
                    var currentBodyWidget = endnote.bodyWidgets[i];
                    page.endnoteWidget.bodyWidgets.unshift(currentBodyWidget);
                    currentBodyWidget.containerWidget = page.endnoteWidget;
                    currentBodyWidget.page = page;
                    endnote.bodyWidgets.splice(i, 1);
                }
            }
        }
    };
    Layout.prototype.moveToNextPage = function (viewer, line, isPageBreak, isList, skipFloat) {
        if (this.isFootNoteLayoutStart) {
            return;
        }
        var paragraphWidget = line.paragraph;
        var startBlock;
        var startIndex = 0;
        var keepLinesTogether = false;
        var keepWithNext = false;
        var isEndnote = false;
        var firstLineIndent = 0;
        if (paragraphWidget && !(!isNullOrUndefined(paragraphWidget.containerWidget) && !isNullOrUndefined(paragraphWidget.containerWidget.containerWidget) && paragraphWidget.containerWidget.containerWidget instanceof FootNoteWidget && paragraphWidget.containerWidget.containerWidget.footNoteType === 'Footnote')) {
            var index = 0;
            if (paragraphWidget instanceof FootNoteWidget) {
                return;
            }
            if (!isNullOrUndefined(paragraphWidget.containerWidget) && !isNullOrUndefined(paragraphWidget.containerWidget.containerWidget) && paragraphWidget.containerWidget.containerWidget instanceof FootNoteWidget && paragraphWidget.containerWidget.containerWidget.footNoteType === 'Endnote') {
                isEndnote = true;
            }
            if (!isNullOrUndefined(line)) {
                index = paragraphWidget.childWidgets.indexOf(line);
                if (index !== 0) {
                    if (paragraphWidget.paragraphFormat.keepLinesTogether && !isNullOrUndefined(paragraphWidget.previousWidget) && !line.previousLine.isEndsWithColumnBreak) {
                        index = 0;
                        keepLinesTogether = true;
                    }
                    else if (index == 1 && !line.previousLine.isEndsWithPageBreak && !line.previousLine.isEndsWithColumnBreak && paragraphWidget.paragraphFormat.widowControl &&
                        !isNullOrUndefined(paragraphWidget.previousWidget)) {
                        index = 0;
                        keepLinesTogether = true;
                    }
                }
                if (index > 0 || isPageBreak) {
                    paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
                }
                if (index === 0 && !paragraphWidget.isEndsWithPageBreak && !paragraphWidget.isEndsWithColumnBreak) {
                    var blockInfo = this.alignBlockElement(paragraphWidget);
                    if (!isNullOrUndefined(blockInfo.node)) {
                        startBlock = blockInfo.node instanceof TableRowWidget ? this.splitRow(blockInfo.node) : blockInfo.node;
                        startIndex = startBlock instanceof TableWidget ? 0 : parseInt(blockInfo.position.index, 10);
                        paragraphWidget = startBlock;
                        index = startIndex;
                        keepLinesTogether = false;
                        keepWithNext = true;
                        if (paragraphWidget instanceof ParagraphWidget) {
                            if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule && !paragraphWidget.paragraphFormat.keepWithNext && !isList) {
                                this.viewer.owner.editorModule.updateWholeListItems(paragraphWidget);
                            }
                        }
                        else {
                            if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule && !isList) {
                                this.viewer.owner.editorModule.updateWholeListItems(paragraphWidget);
                            }
                        }
                    }
                }
            }
            /* eslint-disable-next-line max-len */
            if (!isNullOrUndefined(paragraphWidget.bodyWidget) && !isNullOrUndefined(paragraphWidget.bodyWidget.containerWidget) && !(paragraphWidget.bodyWidget.containerWidget instanceof FootNoteWidget) && paragraphWidget.bodyWidget.page.footnoteWidget !== undefined) {
                // this.viewer.updateClientAreaForBlock(paragraphWidget.bodyWidget.page.footnoteWidget.block, true);
                this.layoutfootNote(paragraphWidget.bodyWidget.page.footnoteWidget);
                // this.viewer.updateClientAreaForBlock(paragraphWidget.bodyWidget.page.footnoteWidget.block, false);
            }
            if (this.isMultiColumnSplit) {
                var nextColumn = this.viewer.columnLayoutArea.getNextColumnByBodyWidget(paragraphWidget.bodyWidget);
                if (isNullOrUndefined(nextColumn)) {
                    return;
                }
            }
            var prevPage = paragraphWidget.bodyWidget.page;
            if (isPageBreak && index === 0 && !isNullOrUndefined(paragraphWidget.bodyWidget.lastChild) && paragraphWidget === paragraphWidget.bodyWidget.lastChild && this.endOverlapWidget) {
                this.isRelayoutOverlap = false;
            }
            if (isEndnote && isNullOrUndefined(prevPage.nextPage) && paragraphWidget.bodyWidget.index === 0 && paragraphWidget.index === 0 && index === 0) {
                var endnote = paragraphWidget.containerWidget.containerWidget;
                this.moveEndnoteToNextPage(endnote, paragraphWidget.bodyWidget, true);
                return;
            }
            var nextBody = this.moveBlocksToNextPage(paragraphWidget, index === 0, index, false, isEndnote);
            if (isEndnote) {
                var endnote = paragraphWidget.containerWidget.containerWidget;
                var currentBodyIndex = endnote.bodyWidgets.indexOf(paragraphWidget.bodyWidget);
                nextBody.footNoteReference = paragraphWidget.bodyWidget.footNoteReference;
                this.moveEndnoteToNextPage(endnote, nextBody, false, currentBodyIndex);
            }
            if (prevPage !== nextBody.page) {
                this.viewer.updateClientArea(nextBody, nextBody.page);
            }
            this.viewer.updateClientAreaForBlock(paragraphWidget, true);
            if (index > 0) {
                if (line.isLastLine() && isPageBreak) {
                    return;
                }
                var nextParagraph = void 0;
                if (nextBody.firstChild instanceof ParagraphWidget && nextBody.firstChild.equals(paragraphWidget)) {
                    nextParagraph = nextBody.firstChild;
                }
                else {
                    nextParagraph = new ParagraphWidget();
                }
                nextParagraph = this.moveChildsToParagraph(paragraphWidget, index, nextParagraph);
                // this.updateLinearIndex(paragraphWidget);
                // this.updateLinearIndex(nextParagraph);
                nextParagraph.containerWidget = nextBody;
                for (var m = 0; m < nextParagraph.floatingElements.length; m++) {
                    var element = nextParagraph.floatingElements[m];
                    if (element.line.paragraph.bodyWidget !== paragraphWidget.bodyWidget && element.textWrappingStyle !== 'Inline') {
                        paragraphWidget.bodyWidget.floatingElements.splice(paragraphWidget.bodyWidget.floatingElements.indexOf(element), 1);
                    }
                }
                var footWidget = this.getFootNoteWidgetsOf(nextParagraph);
                this.moveFootNotesToPage(footWidget, paragraphWidget.bodyWidget, nextBody);
                paragraphWidget = nextParagraph;
                this.viewer.clientActiveArea.height -= this.getFootNoteHeight(footWidget);
            }
            else if (!isPageBreak) {
                paragraphWidget.containerWidget.removeChild(paragraphWidget.indexInOwner);
                if (paragraphWidget instanceof ParagraphWidget && paragraphWidget.floatingElements.length > 0) {
                    this.addRemoveFloatElementsFromBody(paragraphWidget, paragraphWidget.containerWidget, false);
                }
                if (isEndnote && paragraphWidget.containerWidget.childWidgets.length === 0 && !isNullOrUndefined(paragraphWidget.containerWidget.containerWidget) && paragraphWidget.containerWidget.containerWidget instanceof FootNoteWidget) {
                    var endnote = paragraphWidget.containerWidget.containerWidget;
                    endnote.bodyWidgets.splice(endnote.bodyWidgets.indexOf(paragraphWidget.containerWidget), 1);
                    nextBody.footNoteReference.bodyWidget = nextBody;
                    if (!isNullOrUndefined(endnote.page.endnoteWidget) && endnote.page.endnoteWidget.bodyWidgets.length === 0) {
                        endnote.page.endnoteWidget = undefined;
                    }
                }
            }
            if (!isPageBreak) {
                if (nextBody.childWidgets.indexOf(paragraphWidget) === -1) {
                    nextBody.childWidgets.splice(0, 0, paragraphWidget);
                    if (paragraphWidget instanceof ParagraphWidget && paragraphWidget.floatingElements.length > 0) {
                        this.addRemoveFloatElementsFromBody(paragraphWidget, nextBody, true);
                    }
                }
                paragraphWidget.containerWidget = nextBody;
                this.viewer.updateClientAreaLocation(paragraphWidget, this.viewer.clientActiveArea);
                if (keepLinesTogether || keepWithNext) {
                    if (paragraphWidget.bodyWidget.page.footnoteWidget) {
                        this.layoutfootNote(paragraphWidget.bodyWidget.page.footnoteWidget);
                    }
                    if (line.paragraph !== paragraphWidget || (paragraphWidget.paragraphFormat.widowControl && this.isImagePresent(paragraphWidget))) {
                        if (paragraphWidget instanceof TableWidget) {
                            this.clearTableWidget(paragraphWidget, true, true, false);
                        }
                        this.layoutBlock(paragraphWidget, 0, true);
                        viewer.updateClientAreaForBlock(paragraphWidget, false);
                    }
                    var lastBlock = line.paragraph;
                    if (keepWithNext) {
                        var nextBlock = paragraphWidget.nextWidget;
                        if (!isNullOrUndefined(nextBlock)) {
                            do {
                                viewer.updateClientAreaForBlock(nextBlock, true);
                                if (nextBlock !== lastBlock) {
                                    if (nextBlock instanceof TableWidget) {
                                        this.clearTableWidget(nextBlock, true, true, false);
                                    }
                                    this.layoutBlock(nextBlock, 0, true);
                                    viewer.updateClientAreaForBlock(nextBlock, false);
                                }
                                else {
                                    this.viewer.updateClientAreaLocation(nextBlock, this.viewer.clientActiveArea);
                                    break;
                                }
                                nextBlock = nextBlock.nextWidget;
                            } while (nextBlock);
                        }
                    }
                    this.updateClientAreaForNextBlock(line, lastBlock);
                }
                if (line.isFirstLine() && line.indexInOwner === 0 && !(line.children[0] instanceof ListTextElementBox) && !skipFloat) {
                    firstLineIndent = -HelperMethods.convertPointToPixel(line.paragraph.paragraphFormat.firstLineIndent);
                    this.viewer.updateClientWidth(firstLineIndent);
                }
            }
        }
        if (!isPageBreak) {
            this.updateShapeBaseLocation(paragraphWidget);
        }
        if (skipFloat) {
            this.viewer.updateClientWidth(firstLineIndent);
        }
        if (this.isRelayoutOverlap && this.endOverlapWidget && (!this.skipRelayoutOverlap || (this.endOverlapWidget instanceof TableWidget && this.endOverlapWidget.wrapTextAround))) {
            var block_1 = this.endOverlapWidget.previousRenderedWidget;
            var para = line.paragraph;
            this.startOverlapWidget = para;
            line = this.endOverlapWidget.childWidgets[0];
            para = line.paragraph;
            while (para) {
                para.floatingElements.forEach(function (shape) {
                    if (block_1.bodyWidget.floatingElements.indexOf(shape) !== -1 && shape.textWrappingStyle !== 'Inline') {
                        block_1.bodyWidget.floatingElements.splice(block_1.bodyWidget.floatingElements.indexOf(shape), 1);
                        line.paragraph.bodyWidget.floatingElements.push(shape);
                    }
                });
                para = para !== this.endOverlapWidget ? para.nextWidget : undefined;
            }
            this.layoutStartEndBlocks(this.startOverlapWidget, this.endOverlapWidget);
            this.startOverlapWidget = undefined;
            this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - this.endOverlapWidget.y;
            this.viewer.clientActiveArea.y = this.endOverlapWidget.y;
        }
    };
    Layout.prototype.isImagePresent = function (paragraph) {
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            var line = paragraph.childWidgets[i];
            for (var j = 0; j < line.children.length; j++) {
                if (line.children[j] instanceof ImageElementBox) {
                    return true;
                }
            }
        }
        return false;
    };
    Layout.prototype.updateShapeBaseLocation = function (paragraphWidget) {
        if (paragraphWidget instanceof ParagraphWidget &&
            paragraphWidget.floatingElements.length > 0) {
            for (var m = 0; m < paragraphWidget.floatingElements.length; m++) {
                var shape = paragraphWidget.floatingElements[m];
                var position = this.getFloatingItemPoints(shape);
                shape.y = position.y;
                shape.x = position.x;
                if (shape instanceof ShapeElementBox)
                    this.updateChildLocationForCellOrShape(shape.y, shape);
            }
        }
    };
    Layout.prototype.moveChildsToParagraph = function (srcParagraph, childStartIndex, nextParagraph) {
        nextParagraph = this.addParagraphWidget(this.viewer.clientActiveArea, nextParagraph);
        var insertIndex = 0;
        for (var i = childStartIndex; i < srcParagraph.childWidgets.length; i++) {
            var lineWidget = srcParagraph.childWidgets[i];
            lineWidget.paragraph = nextParagraph;
            nextParagraph.childWidgets.splice(insertIndex, 0, lineWidget);
            lineWidget.paragraph = nextParagraph;
            insertIndex++;
        }
        nextParagraph.paragraphFormat = srcParagraph.paragraphFormat;
        nextParagraph.characterFormat = srcParagraph.characterFormat;
        nextParagraph.index = srcParagraph.index;
        srcParagraph.childWidgets.splice(childStartIndex);
        for (var i = 0; i < srcParagraph.floatingElements.length; i++) {
            var element = srcParagraph.floatingElements[i];
            if (element.line.paragraph !== srcParagraph) {
                nextParagraph.floatingElements.push(element);
                srcParagraph.floatingElements.splice(srcParagraph.floatingElements.indexOf(element), 1);
                i--;
            }
        }
        return nextParagraph;
    };
    /**
     * @param {ParagraphWidget} paragarph - the paragraph
     * @param {BodyWidget} body - the bodyWidget
     * @param {boolean} add - to specify add or remove floating elements from body widget.
     */
    Layout.prototype.addRemoveFloatElementsFromBody = function (paragarph, body, add) {
        if (paragarph.floatingElements.length > 0) {
            for (var x = 0; x < paragarph.floatingElements.length; x++) {
                if (add) {
                    if (body.floatingElements.indexOf(paragarph.floatingElements[x]) === -1 && paragarph.floatingElements[x].textWrappingStyle !== 'Inline') {
                        body.floatingElements.push(paragarph.floatingElements[x]);
                    }
                }
                else {
                    if (body.floatingElements.indexOf(paragarph.floatingElements[x]) !== -1) {
                        body.floatingElements.splice(body.floatingElements.indexOf(paragarph.floatingElements[x]), 1);
                    }
                }
            }
        }
    };
    /**
     * Align block based on keep with next and keep lines together property.
     */
    Layout.prototype.alignBlockElement = function (block) {
        if (block instanceof ParagraphWidget && (block.isEndsWithPageBreak || block.isEndsWithColumnBreak)) {
            return { node: undefined, position: { index: '' } };
        }
        var startBlock;
        var startIndex = 0;
        // Check previous block has keep with next property.
        var previousBlock = this.getPreviousBlock(block);
        while (previousBlock) {
            if (previousBlock instanceof ParagraphWidget) {
                if (!previousBlock.paragraphFormat.keepWithNext || previousBlock.isEndsWithPageBreak || previousBlock.isEndsWithColumnBreak) {
                    break;
                }
                startBlock = previousBlock;
                if (previousBlock.paragraphFormat.keepLinesTogether) {
                    if (isNullOrUndefined(this.getPreviousBlock(previousBlock))) {
                        startBlock = undefined;
                    }
                    else {
                        startIndex = 0;
                    }
                }
                else {
                    if (isNullOrUndefined(this.getPreviousBlock(previousBlock))
                        && previousBlock.childWidgets.length === 1) {
                        startBlock = undefined;
                    }
                    else {
                        if (!previousBlock.paragraphFormat.widowControl) {
                            startIndex = previousBlock.lastChild.indexInOwner;
                            if (startIndex !== 0) {
                                break;
                            }
                        }
                        else {
                            startIndex = previousBlock.lastChild.indexInOwner - 1;
                            if (startIndex === 1 || startIndex < 0) {
                                // Move entire block to next page based on widow control.
                                startIndex = 0;
                            }
                            if (startIndex !== 0) {
                                break;
                            }
                        }
                    }
                }
            }
            else if (previousBlock instanceof TableRowWidget) {
                var childWidget = previousBlock.childWidgets[0];
                if (childWidget.childWidgets.length > 0) {
                    var firstBlock = this.documentHelper.getFirstParagraphInCell(childWidget);
                    if (!firstBlock.paragraphFormat.keepWithNext) {
                        break;
                    }
                    if (firstBlock.paragraphFormat.keepWithNext) {
                        if (isNullOrUndefined(this.getPreviousBlock(previousBlock))) {
                            startBlock = undefined;
                        }
                        else {
                            startBlock = previousBlock;
                            startIndex = startBlock.indexInOwner;
                        }
                    }
                }
                else {
                    break;
                }
                // TODO: Table row splitting case.
            }
            previousBlock = this.getPreviousBlock(previousBlock);
        }
        if (!isNullOrUndefined(startBlock) && startBlock instanceof ParagraphWidget && startBlock.indexInOwner === 0 && startBlock.paragraphFormat.keepWithNext && startBlock.paragraphFormat.widowControl) {
            startBlock = block;
        }
        return { node: startBlock, position: { index: startIndex.toString() } };
    };
    Layout.prototype.getPreviousBlock = function (block) {
        var previousBlock;
        if (block instanceof ParagraphWidget) {
            previousBlock = block.previousWidget;
            if (!this.isInitialLoad && isNullOrUndefined(previousBlock) && block.containerWidget instanceof BodyWidget && !isNullOrUndefined(block.containerWidget.previousRenderedWidget) && block.containerWidget.sectionIndex === block.containerWidget.previousRenderedWidget.sectionIndex) {
                if (!isNullOrUndefined(block.previousRenderedWidget) && block.previousRenderedWidget instanceof ParagraphWidget) {
                    previousBlock = block.previousRenderedWidget;
                }
            }
        }
        else if (block instanceof TableRowWidget) {
            previousBlock = block.previousWidget;
            if (isNullOrUndefined(previousBlock)) {
                previousBlock = block.ownerTable.previousWidget;
            }
        }
        if (previousBlock instanceof TableWidget) {
            previousBlock = previousBlock.lastChild;
        }
        return previousBlock;
    };
    Layout.prototype.splitRow = function (startRow) {
        var table = startRow.ownerTable;
        if (startRow.indexInOwner === 0) {
            return table;
        }
        var newTable = this.createTableWidget(table);
        for (var i = startRow.indexInOwner; i < table.childWidgets.length;) {
            var rowWidget = table.childWidgets.splice(i, 1)[0];
            newTable.childWidgets.push(rowWidget);
            rowWidget.containerWidget = newTable;
            table.height -= rowWidget.height;
            newTable.height += rowWidget.height;
        }
        table.containerWidget.childWidgets.splice(table.indexInOwner + 1, 0, newTable);
        newTable.containerWidget = table.containerWidget;
        return newTable;
    };
    Layout.prototype.splitParagraph = function (paragarph, index, nextParagraph) {
        if (index === 0 && isNullOrUndefined(nextParagraph)) {
            return paragarph;
        }
        var isMoveCurrentBlock = false;
        if (isNullOrUndefined(nextParagraph)) {
            nextParagraph = new ParagraphWidget();
            nextParagraph.containerWidget = paragarph.containerWidget;
            paragarph.containerWidget.childWidgets.splice(paragarph.indexInOwner + 1, 0, nextParagraph);
            nextParagraph.paragraphFormat = paragarph.paragraphFormat;
            nextParagraph.characterFormat = paragarph.characterFormat;
            nextParagraph.index = paragarph.index;
        }
        else if (index === 0) {
            isMoveCurrentBlock = true;
            var temp = paragarph;
            paragarph = nextParagraph;
            nextParagraph = temp;
        }
        var insertIndex = 0;
        for (var i = index; i < paragarph.childWidgets.length; i++) {
            var lineWidget = paragarph.childWidgets[i];
            lineWidget.paragraph = nextParagraph;
            if (isMoveCurrentBlock) {
                nextParagraph.childWidgets.push(lineWidget);
            }
            else {
                nextParagraph.childWidgets.splice(insertIndex, 0, lineWidget);
            }
            nextParagraph.height += lineWidget.height;
            paragarph.height -= lineWidget.height;
            lineWidget.paragraph = nextParagraph;
            insertIndex++;
        }
        nextParagraph.width = paragarph.width;
        if (isMoveCurrentBlock) {
            nextParagraph.containerWidget.childWidgets.splice(nextParagraph.indexInOwner, 1);
            nextParagraph.y = paragarph.y;
            nextParagraph.x = paragarph.x;
            nextParagraph.containerWidget = paragarph.containerWidget;
            paragarph.containerWidget.childWidgets.unshift(nextParagraph);
        }
        else {
            paragarph.childWidgets.splice(index);
        }
        if (paragarph.childWidgets.length === 0 || isMoveCurrentBlock) {
            paragarph.containerWidget.childWidgets.splice(paragarph.indexInOwner, 1);
        }
        // this.updateLinearIndex(paragarph);
        // this.updateLinearIndex(nextParagraph);
        return nextParagraph;
    };
    Layout.prototype.updateClientPositionForBlock = function (block, currentBlock) {
        var startBlock = (block instanceof TableRowWidget) ? block.ownerTable : block;
        var isClientAreaUpdated = false;
        do {
            if (startBlock instanceof ParagraphWidget) {
                if (currentBlock instanceof ParagraphWidget && currentBlock.equals(startBlock)) {
                    isClientAreaUpdated = true;
                    break;
                }
                this.viewer.updateClientAreaForBlock(startBlock, true);
                this.addParagraphWidget(this.viewer.clientActiveArea, startBlock);
                this.viewer.cutFromTop(this.viewer.clientActiveArea.y + startBlock.height);
                this.viewer.updateClientAreaForBlock(startBlock, false);
            }
            else if (startBlock instanceof TableWidget) {
                this.viewer.updateClientAreaForBlock(startBlock, true);
                if (this.documentHelper.compatibilityMode !== 'Word2013' && !startBlock.isInsideTable) {
                    this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                        HelperMethods.convertPointToPixel(startBlock.firstChild.firstChild.leftMargin);
                }
                this.addTableWidget(this.viewer.clientActiveArea, [startBlock]);
                var nextRow = startBlock.firstChild;
                if (currentBlock instanceof TableRowWidget && startBlock.equals(currentBlock.ownerTable) && !isNullOrUndefined(nextRow)) {
                    do {
                        if (nextRow.equals(currentBlock)) {
                            isClientAreaUpdated = true;
                            break;
                        }
                        this.addTableRowWidget(this.viewer.clientActiveArea, [nextRow]);
                        this.updateChildLocationForRow(this.viewer.clientActiveArea.y, nextRow);
                        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + nextRow.height);
                        startBlock.height += nextRow.height;
                        nextRow = nextRow.nextWidget;
                    } while (nextRow);
                }
                else {
                    this.updateChildLocationForTable(startBlock.y, startBlock);
                    this.viewer.cutFromTop(this.viewer.clientActiveArea.y + startBlock.height);
                    this.viewer.updateClientAreaForBlock(startBlock, false);
                }
            }
            startBlock = startBlock.nextWidget;
        } while (startBlock && !isClientAreaUpdated);
    };
    Layout.prototype.updateClientAreaForNextBlock = function (line, paragraphWidget) {
        for (var m = 0; m < paragraphWidget.childWidgets.length; m++) {
            var child = paragraphWidget.childWidgets[m];
            if (line === child) {
                break;
            }
            this.updateShapeBaseLocation(paragraphWidget);
            this.checkInbetweenShapeOverlap(child);
            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + child.height);
        }
    };
    Layout.prototype.layoutStartEndBlocks = function (startBlock, endBlock) {
        var block = startBlock;
        this.isOverlapFloatTable = true;
        this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - startBlock.y;
        this.viewer.clientActiveArea.y = startBlock.y;
        var startParagaraph;
        if (startBlock instanceof TableWidget) {
            startParagaraph = this.documentHelper.getFirstParagraphInFirstCell(startBlock);
        }
        else {
            startParagaraph = startBlock;
        }
        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
            this.viewer.owner.editorModule.updateWholeListItems(startParagaraph);
        }
        while (block) {
            this.viewer.updateClientAreaForBlock(block, true);
            if (block instanceof ParagraphWidget) {
                this.layoutParagraph(block, 0);
            }
            else {
                this.clearTableWidget(block, true, true, true);
                this.layoutTable(block, 0);
            }
            this.viewer.updateClientAreaForBlock(block, false);
            var isTableHasParaVerticalOrigin = (!isNullOrUndefined(block.nextWidget) && block.nextWidget instanceof TableWidget && block.nextWidget === endBlock && (block.nextWidget.positioning.verticalOrigin === 'Paragraph'));
            block = block !== endBlock && !isTableHasParaVerticalOrigin ? block.nextWidget : undefined;
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.alignLineElements = function (element, topMargin, bottomMargin, maxDescent, addSubWidth, subWidth, textAlignment, whiteSpaceCount, isLastElement) {
        if (element.width > 0 && (element instanceof TextElementBox || element instanceof ListTextElementBox)) {
            var textElement = element instanceof TextElementBox ? element : undefined;
            //Updates the text to base line offset.
            var baselineOffset = element instanceof TextElementBox ? textElement.baselineOffset : element.baselineOffset;
            topMargin += this.maxBaseline - baselineOffset;
            bottomMargin += maxDescent - (element.height - baselineOffset);
            //Updates the text to base line offset.
            if (!isNullOrUndefined(textElement) && textAlignment === 'Justify' && whiteSpaceCount > 0) {
                //Aligns the text as Justified.
                textElement.isWidthUpdated = false;
                var width = textElement.width;
                var text = textElement.text;
                if (!addSubWidth) {
                    text = HelperMethods.trimStart(text); // trim start.
                    addSubWidth = (text.length > 0);
                }
                if (addSubWidth) {
                    var spaceCount = text.length - HelperMethods.removeSpace(text).length;
                    if (isLastElement) {
                        spaceCount -= text.length - HelperMethods.trimEnd(text).length;
                    }
                    if (whiteSpaceCount < spaceCount) {
                        width = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text, textElement.characterFormat, textElement.scriptType);
                        spaceCount = whiteSpaceCount;
                    }
                    if (spaceCount > 0) {
                        textElement.width = width + subWidth * spaceCount;
                        whiteSpaceCount -= spaceCount;
                    }
                }
            }
        }
        else {
            addSubWidth = true;
            //Updates the Image/UIElement to base line offset.
            topMargin += this.maxBaseline - element.height;
            bottomMargin += maxDescent;
        }
        return { 'topMargin': topMargin, 'bottomMargin': bottomMargin, 'addSubWidth': addSubWidth, 'whiteSpaceCount': whiteSpaceCount };
    };
    Layout.prototype.updateWidgetToPage = function (viewer, paragraphWidget, skipCellContentHeightCalc) {
        if (paragraphWidget.isInsideTable) {
            var cellWidget = paragraphWidget.associatedCell;
            paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
            // if (viewer instanceof PageLayoutViewer) {
            if (isNullOrUndefined(paragraphWidget.associatedCell) || isNullOrUndefined(paragraphWidget.associatedCell.ownerRow)
                || isNullOrUndefined(paragraphWidget.associatedCell.ownerRow.rowFormat)) {
                return;
            }
            if (paragraphWidget.associatedCell.ownerRow.rowFormat.heightType === 'Exactly') {
                cellWidget.height = HelperMethods.convertPointToPixel(paragraphWidget.associatedCell.ownerRow.rowFormat.height);
            }
            else {
                if ([cellWidget].length <= 1 && paragraphWidget.associatedCell.ownerRow.rowFormat.heightType === 'AtLeast' && !skipCellContentHeightCalc) {
                    cellWidget.height = Math.max(HelperMethods.convertPointToPixel(paragraphWidget.associatedCell.ownerRow.rowFormat.height), this.getCellContentHeight(cellWidget, false, paragraphWidget.indexInOwner));
                }
                else {
                    cellWidget.height = cellWidget.height + paragraphWidget.height;
                }
            }
            // } else {
            //     cellWidget.height = cellWidget.height + paragraphWidget.height;
            // }
            // cellWidget.childWidgets.push(paragraphWidget);
            paragraphWidget.containerWidget = cellWidget;
        }
        else {
            if (!paragraphWidget.isEndsWithPageBreak && !paragraphWidget.isEndsWithColumnBreak || viewer instanceof WebLayoutViewer) {
                paragraphWidget.height = viewer.clientActiveArea.y - paragraphWidget.y;
            }
            //Adds the paragraph widget to the Header Footer/ Body widget.
            // this.updateWidgetsToBody(paragraphWidget, viewer, paragraphWidget);
            //For canvas no need to render paragraph widget here. In case of div, need to render paragraph here.
            // this.render.renderParagraphWidget((paragraphWidget.containerWidget as BodyWidget).page, paragraphWidget);
        }
        if (this.isRelayoutFootnote && paragraphWidget.bodyWidget instanceof FootNoteWidget) {
            if (!paragraphWidget.isInsideTable) {
                paragraphWidget.containerWidget.height += paragraphWidget.height;
            }
            //this.isRelayoutFootnote = false;
            this.shiftFootnoteChildLocation(paragraphWidget.bodyWidget, this.viewer);
        }
        if (paragraphWidget.bodyWidget instanceof HeaderFooterWidget) {
            if (!paragraphWidget.isInsideTable) {
                paragraphWidget.containerWidget.height += paragraphWidget.height;
            }
            if (this.viewer.owner.enableHeaderAndFooter && paragraphWidget.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
                this.shiftFooterChildLocation(paragraphWidget.bodyWidget, this.viewer);
            }
        }
        if (viewer instanceof WebLayoutViewer && paragraphWidget.containerWidget instanceof BodyWidget) {
            paragraphWidget.containerWidget.height += paragraphWidget.height;
        }
    };
    Layout.prototype.shiftFooterChildLocation = function (widget, viewer) {
        var pageHeight = widget.page.bodyWidgets[0].sectionFormat.pageHeight;
        if (widget.headerFooterType.indexOf('Footer') !== -1) {
            var footerDistance = widget.page.bodyWidgets[0].sectionFormat.footerDistance;
            var height = HelperMethods.convertPointToPixel(pageHeight - footerDistance);
            var top_1;
            if (widget.y + widget.height > height) {
                top_1 = height - (widget.y + widget.height);
            }
            else if (widget.y + widget.height < height) {
                top_1 = (widget.y + widget.height) - height;
            }
            if (!isNullOrUndefined(top_1)) {
                top_1 = height - (widget.y + widget.height);
                this.shiftChildLocation(top_1, widget);
                viewer.clientActiveArea.y += top_1;
            }
        }
    };
    Layout.prototype.shiftFootnoteChildLocation = function (widget, viewer) {
        var pageHeight = widget.page.bodyWidgets[0].sectionFormat.pageHeight;
        var footerDistance = widget.page.bodyWidgets[0].sectionFormat.footerDistance;
        var bottomMargin = widget.page.bodyWidgets[0].sectionFormat.bottomMargin;
        var height = HelperMethods.convertPointToPixel(pageHeight - bottomMargin);
        var top;
        if (widget.y + widget.height > height) {
            top = height - (widget.y + widget.height);
        }
        else if (widget.y + widget.height < height) {
            top = (widget.y + widget.height) - height;
        }
        if (!isNullOrUndefined(top)) {
            top = height - (widget.y + widget.height);
            this.shiftChildLocation(top, widget);
            viewer.clientActiveArea.y += top;
        }
    };
    Layout.prototype.checkPreviousElement = function (line, index) {
        var paragraph = line.paragraph;
        var isSplitByWord = false;
        var lastTextElement = 0;
        var isJustifiedPara = paragraph.paragraphFormat.textAlignment === 'Justify' ? true : false;
        for (var i = index - 1; i >= 0; i--) {
            var textElement = line.children[i];
            if (textElement instanceof TextElementBox && (textElement.width > 0 || (!isJustifiedPara && textElement.text === '\t'))) {
                var text = textElement.text;
                lastTextElement = i;
                if (text.length > 0 && (text[text.length - 1] === ' ' || text[text.length - 1] === '-')) {
                    if (i === index - 1) {
                        this.addSplittedLineWidget(line, index - 1);
                        return true;
                    }
                    isSplitByWord = true;
                    break;
                }
                else if (!this.isRelayoutOverlap && !isJustifiedPara && textElement instanceof TabElementBox && text === '\t' && lastTextElement !== 0) {
                    lastTextElement--;
                    isSplitByWord = true;
                    break;
                }
                else if (text === '\t' || this.documentHelper.textHelper.isUnicodeText(text, textElement.scriptType)) {
                    return false;
                }
                else if (text.indexOf(' ') >= 0) {
                    isSplitByWord = true;
                    var index_1 = text.lastIndexOf(' ') + 1;
                    //Splits the text element by space.
                    var splittedElement = new TextElementBox();
                    splittedElement.text = text.substr(index_1);
                    splittedElement.characterFormat.copyFormat(textElement.characterFormat);
                    splittedElement.characterRange = textElement.characterRange;
                    if (textElement.revisions.length > 0) {
                        this.updateRevisionForSplittedElement(textElement, splittedElement, index_1 > 0);
                        splittedElement.isMarkedForRevision = textElement.isMarkedForRevision;
                    }
                    textElement.text = text.substr(0, index_1);
                    this.documentHelper.textHelper.getTextSize(splittedElement, textElement.characterFormat);
                    textElement.width -= splittedElement.width;
                    if (textElement.text[textElement.text.length - 1] === ' ') {
                        textElement.trimEndWidth = this.documentHelper.textHelper.getWidth(HelperMethods.trimEnd(textElement.text), textElement.characterFormat, textElement.scriptType);
                    }
                    else {
                        textElement.trimEndWidth = textElement.width;
                    }
                    textElement.height = splittedElement.height;
                    if (textElement.width === 0) {
                        line.children.splice(i, 1);
                        if (!isNullOrUndefined(line.layoutedElements) && line.layoutedElements.length > 0) {
                            line.layoutedElements.splice(i, 1);
                        }
                    }
                    //Adds the text element to the line
                    line.children.splice(i + 1, 0, splittedElement);
                    if (!isNullOrUndefined(line.layoutedElements)) {
                        line.layoutedElements.splice(i + 1, 0, splittedElement);
                    }
                    break;
                }
            }
            else if (!(textElement instanceof ListTextElementBox || textElement instanceof FieldElementBox
                // to skip field code
                || textElement instanceof TextElementBox && textElement.width === 0 || textElement instanceof CommentCharacterElementBox || textElement instanceof ContentControl)) {
                //Handled for inline images/UIelements.
                lastTextElement = i;
                isSplitByWord = true;
                break;
            }
        }
        if (isSplitByWord) {
            lastTextElement++;
            if (lastTextElement < line.children.length) {
                var splitWidth = 0;
                for (var i = lastTextElement; i < line.children.length; i++) {
                    splitWidth += line.children[i].width;
                    this.addSplittedLineWidget(line, i - 1);
                    i--;
                }
                var is2013Justification = paragraph.paragraphFormat.textAlignment === 'Justify' &&
                    this.documentHelper.compatibilityMode === 'Word2013';
                if (!is2013Justification) {
                    this.viewer.updateClientWidth(splitWidth);
                }
            }
        }
        return isSplitByWord;
    };
    Layout.prototype.clearListElementBox = function (paragraph) {
        if (paragraph.childWidgets.length === 0) {
            return;
        }
        var line = paragraph.childWidgets[0];
        if (isNullOrUndefined(line.children)) {
            return;
        }
        for (var i = line.children.length - 1; i > 0; i--) {
            if (line.children[i] instanceof ListTextElementBox) {
                line.children.splice(i, 1);
            }
            else {
                break;
            }
        }
        for (var i = 0; i < line.children.length; i++) {
            if (line.children[i] instanceof ListTextElementBox) {
                line.children.splice(i, 1);
                i--;
            }
            else {
                break;
            }
        }
    };
    /**
 * @private
 */
    Layout.prototype.clearInvalidList = function (list) {
        if (list) {
            if (list.abstractListId === -1 && this.documentHelper.abstractLists.indexOf(list.abstractList) !== -1) {
                this.documentHelper.abstractLists.splice(this.documentHelper.abstractLists.indexOf(list.abstractList), 1);
            }
            if (list.listId === -1 && this.documentHelper.lists.indexOf(list) !== -1) {
                this.documentHelper.lists.splice(this.documentHelper.lists.indexOf(list), 1);
            }
        }
    };
    Layout.prototype.getListNumber = function (listFormat, isAutoList) {
        var list = this.documentHelper.getListById(listFormat.listId);
        var levelNumber = listFormat.listLevelNumber;
        var listLevel = this.getListLevel(list, listFormat.listLevelNumber);
        var levelOverride = !isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[levelNumber] : undefined;
        // If LevelOverride exists and have either override list level or StartAtOverride, then only list numbering will be restarted.
        if (!isNullOrUndefined(levelOverride) && this.documentHelper.renderedLevelOverrides.indexOf(list) === -1 && isNullOrUndefined(levelOverride.overrideListLevel)) {
            //Add List Override style
            this.documentHelper.renderedLevelOverrides.push(list);
            var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
            if (this.documentHelper.renderedLists.containsKey(abstractList)) {
                var levels = this.documentHelper.renderedLists.get(abstractList);
                if (levels.containsKey(levelNumber)) {
                    levels.remove(levelNumber);
                    this.ClearSubListLevelValues(list, abstractList, levelNumber);
                }
            }
        }
        if (isNullOrUndefined(isAutoList)) {
            this.updateListValues(list, levelNumber);
        }
        return this.getListText(list, levelNumber, listLevel);
    };
    Layout.prototype.ClearSubListLevelValues = function (list, abstractList, levelNumber) {
        var levels = this.documentHelper.renderedLists.get(abstractList);
        var levelNumberTemp = levelNumber + 1;
        while (levelNumberTemp < abstractList.levels.length) {
            var listLevel = this.getListLevel(list, levelNumberTemp);
            if (levels.containsKey(levelNumberTemp) && listLevel.restartLevel > levelNumber) {
                levels.remove(levelNumberTemp);
            }
            levelNumberTemp++;
        }
    };
    Layout.prototype.getListStartValue = function (listLevelNumber, list) {
        var levelOverride = !isNullOrUndefined(list.levelOverrides) ? list.levelOverrides[listLevelNumber] : undefined;
        if (!isNullOrUndefined(levelOverride) && isNullOrUndefined(levelOverride.overrideListLevel)) {
            return levelOverride.startAt;
        }
        var listLevel = this.getListLevel(list, listLevelNumber);
        if (isNullOrUndefined(listLevel)) {
            return 0;
        }
        else {
            return listLevel.startAt;
        }
    };
    Layout.prototype.updateListValues = function (list, listLevelNumber) {
        var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
        var currentListLevel = this.getListLevel(list, listLevelNumber);
        if (!this.documentHelper.renderedLists.containsKey(abstractList)) {
            var startVal = new Dictionary();
            this.documentHelper.renderedLists.add(abstractList, startVal);
            var listLevel = this.getListLevel(list, listLevelNumber);
            for (var i = 0; i <= listLevelNumber; i++) {
                startVal.add(i, this.getListStartValue(i, list));
            }
        }
        else {
            var levels = this.documentHelper.renderedLists.get(abstractList);
            if (levels.containsKey(listLevelNumber)) {
                var startAt = levels.get(listLevelNumber);
                levels.set(listLevelNumber, startAt + 1);
                var levelNumber = listLevelNumber + 1;
                while (levelNumber < this.documentHelper.getAbstractListById(list.abstractListId).levels.length) {
                    var listLevel = this.getListLevel(list, levelNumber);
                    // if (!isNullOrUndefined(listLevel)) {
                    if (levels.containsKey(levelNumber) && (listLevel.restartLevel > listLevelNumber || currentListLevel.listLevelPattern === "Bullet")) {
                        levels.remove(levelNumber);
                        // if (document.renderedListLevels.indexOf(listLevel) > -1) {
                        //     document.renderedListLevels.pop();
                        // }
                    }
                    // }
                    levelNumber++;
                }
            }
            else {
                var levelNumber = listLevelNumber;
                while (!levels.containsKey(levelNumber - 1) && levelNumber > 0) {
                    var listLevel = this.getListLevel(list, levelNumber - 1);
                    // if (!isNullOrUndefined(listLevel)) {
                    levels.add(levelNumber - 1, this.getListStartValue(levelNumber - 1, list));
                    // if (document.renderedListLevels.indexOf(listLevel) !== -1) {
                    //     document.renderedListLevels.push(listLevel);
                    // }
                    // }
                    levelNumber--;
                }
                var startAt = this.getListStartValue(listLevelNumber, list);
                levels.add(listLevelNumber, startAt);
            }
        }
    };
    Layout.prototype.getListText = function (listAdv, listLevelNumber, currentListLevel) {
        var listText = currentListLevel.numberFormat;
        if (this.documentHelper.renderedLists.containsKey(this.documentHelper.getAbstractListById(listAdv.abstractListId))) {
            var levels = this.documentHelper.renderedLists.get(this.documentHelper.getAbstractListById(listAdv.abstractListId));
            var keys = levels.keys;
            for (var i = 0; i < keys.length; i++) {
                var levelNumber = keys[i];
                var levelKey = '%' + (levelNumber + 1).toString();
                // if isLegalStyleNumber boolean is true, consider the currentlistlevel for getting the replace text else use the levels from starting.
                var listLevel = this.getListLevel(listAdv, levelNumber);
                var pattern = i < listLevelNumber ? listLevel.listLevelPattern !== 'LeadingZero' ? 'Arabic' : listLevel.listLevelPattern : undefined;
                if (listText.match(levelKey)) {
                    if (levelNumber > listLevelNumber) {
                        return '';
                    }
                    else if (levels.containsKey(levelNumber) && !isNullOrUndefined(listLevel)) {
                        listText = listText.replace(levelKey, this.getListTextListLevel(listLevel, levels.get(levelNumber), currentListLevel.isLegalStyleNumbering ? pattern : undefined));
                    }
                    else {
                        listText = listText.replace(levelKey, '0');
                    }
                }
            }
        }
        return listText;
    };
    Layout.prototype.getAsLetter = function (number) {
        // if (number <= 0) {
        //     return '';
        // }
        var quotient = number / 26;
        var remainder = number % 26;
        if (remainder === 0) {
            //If number denotes the factor of 26, then reduce quotient by 1 and set remainder as 26.
            remainder = 26;
            quotient--;
        }
        //Index of A char in the ASCII table.     
        var letter = String.fromCharCode(65 - 1 + remainder);
        var listValue = '';
        while (quotient >= 0) {
            listValue = listValue + letter.toString();
            quotient--;
        }
        return listValue;
    };
    Layout.prototype.getListTextListLevel = function (listLevel, listValue, customPattern) {
        switch (!isNullOrUndefined(customPattern) ? customPattern : listLevel.listLevelPattern) {
            case 'UpRoman':
                return this.getAsRoman(listValue).toUpperCase();
            case 'LowRoman':
                return this.getAsRoman(listValue).toLowerCase();
            case 'UpLetter':
                return this.getAsLetter(listValue).toUpperCase();
            case 'LowLetter':
                return this.getAsLetter(listValue).toLowerCase();
            case 'Arabic':
                return (listValue).toString();
            case 'LeadingZero':
                return this.getAsLeadingZero(listValue);
            case 'Number':
                return (listValue).toString();
            case 'OrdinalText':
                if (listLevel.characterFormat.localeIdAscii === 3082 || this.documentHelper.characterFormat.localeIdAscii === 3082) {
                    return this.getOrdinalTextInSpanish(true, listValue.toString()).toUpperCase();
                }
                else {
                    return this.getOrdinalText(true, listValue.toString()).toUpperCase();
                }
            case 'Ordinal':
                return this.getAsOrdinal(listValue, listLevel.characterFormat).toString();
            case 'FarEast':
                return (listValue).toString();
            case 'Special':
                return (listValue).toString();
            default:
                return '';
        }
    };
    Layout.prototype.getFootEndNote = function (numberFormat, value) {
        switch (numberFormat) {
            case 'UpperCaseRoman':
                return this.getAsRoman(value).toUpperCase();
            case 'LowerCaseRoman':
                return this.getAsRoman(value).toLowerCase();
            case 'UpperCaseLetter':
                return this.getAsLetter(value).toUpperCase();
            case 'LowerCaseLetter':
                return this.getAsLetter(value).toLowerCase();
            default:
                return (value).toString();
        }
    };
    Layout.prototype.generateNumber = function (number, magnitude, letter) {
        var numberstring = '';
        while (number >= magnitude) {
            number -= magnitude;
            numberstring += letter;
            this.value = number;
        }
        return numberstring.toString();
    };
    Layout.prototype.getAsLeadingZero = function (listValue) {
        if (listValue < 10) {
            return '0' + listValue.toString();
        }
        else {
            return listValue.toString();
        }
    };
    Layout.prototype.getAsRoman = function (number) {
        var retval = '';
        this.value = number;
        retval += this.generateNumber(this.value, 1000, 'M');
        retval += this.generateNumber(this.value, 900, 'CM');
        retval += this.generateNumber(this.value, 500, 'D');
        retval += this.generateNumber(this.value, 400, 'CD');
        retval += this.generateNumber(this.value, 100, 'C');
        retval += this.generateNumber(this.value, 90, 'XC');
        retval += this.generateNumber(this.value, 50, 'L');
        retval += this.generateNumber(this.value, 40, 'XL');
        retval += this.generateNumber(this.value, 10, 'X');
        retval += this.generateNumber(this.value, 9, 'IX');
        retval += this.generateNumber(this.value, 5, 'V');
        retval += this.generateNumber(this.value, 4, 'IV');
        retval += this.generateNumber(this.value, 1, 'I');
        return retval.toString();
    };
    Layout.prototype.getOrdinalText = function (ordinalString, text) {
        //Check whether the text contain alphabet or not
        if (ordinalString) {
            text = text.trim();
            for (var i = 0; i < text.length; i++) {
                if (/[a-zA-Z]/.test(text.charAt(i))) {
                    ordinalString = false;
                    break;
                }
            }
            //Get ordinal string
            if (ordinalString) {
                text = this.numberToWords(parseInt(text), false);
            }
        }
        return text;
    };
    Layout.prototype.numberToWords = function (number, isCardText) {
        if (number === 0)
            return "zero";
        var words = '';
        if (Math.floor(number / 1000000) > 0) {
            words += this.numberToWords(Math.floor(number / 1000000), isCardText) + " million ";
            if (!isCardText && number % 10 === 0)
                words += "th ";
            number %= 1000000;
        }
        if (Math.floor(number / 1000) > 0) {
            words += this.numberToWords(Math.floor(number / 1000), isCardText) + " thousand ";
            if (!isCardText && number % 10 === 0)
                words += "th ";
            number %= 1000;
        }
        if (Math.floor(number / 100) > 0) {
            words += this.numberToWords(Math.floor(number / 100), isCardText) + " hundred ";
            if (!isCardText && number % 10 === 0)
                words += "th ";
            number %= 100;
        }
        if (number > 0) {
            if (words !== '' && isCardText)
                words += "and ";
            var unitsValue = null;
            if (isCardText) {
                unitsValue = [
                    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven",
                    "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
                ];
            }
            else {
                unitsValue = [
                    "", "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth",
                    "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth",
                    "seventeenth", "eighteenth", "nineteenth"
                ];
            }
            var tensValue = [
                "", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty",
                "ninety"
            ];
            var tensValue_ith = [
                "", "tenth", "twentieth", "thirtieth", "fortieth", "fiftieth", "sixtieth", "seventieth",
                "eightieth", "ninetieth"
            ];
            if (number < 20)
                words += unitsValue[number];
            else {
                if (isCardText || number % 10 > 0)
                    words += tensValue[Math.floor(number / 10)];
                if (number % 10 === 0 && !isCardText)
                    words += tensValue_ith[Math.floor(number / 10)];
                else if (number % 10 > 0)
                    words += "-" + unitsValue[number % 10];
            }
        }
        return words;
    };
    Layout.prototype.getOrdinalTextInSpanish = function (ordinalString, text) {
        //Check whether the text contain alphabet or not
        if (ordinalString) {
            text = text.trim();
            for (var i = 0; i < text.length; i++) {
                if (/[a-zA-Z]/.test(text.charAt(i))) {
                    ordinalString = false;
                    break;
                }
            }
            //Get ordinal string
            if (ordinalString) {
                text = this.numberToSpanishWords(parseInt(text), false);
            }
        }
        return text;
    };
    Layout.prototype.numberToSpanishWords = function (number, isCardText) {
        if (number === 0 && isCardText)
            return "cero";
        var words = '';
        if (Math.floor(number / 1000) > 0 && number <= 10000) {
            var thousandCardinalValue = [
                "", "mil", "dos mil", "tres mil", "cuatro mil", "cinco mil", "seis mil", "siete mil", "ocho mil",
                "nueve mil", "diez mil"
            ];
            var thousandOrdinalValue = [
                "", "milésimo", "dosmilésimo", "tresmilésimo", "cuatromilésimo", "cincomilésimo", "seismilésimo", "sietemilésimo",
                "ochomilésimo", "nuevemilésimo", "diezmilésimo"
            ];
            if (isCardText)
                words += thousandCardinalValue[Math.floor(number / 1000)];
            else
                words += thousandOrdinalValue[Math.floor(number / 1000)];
            number %= 1000;
        }
        if (Math.floor(number / 100) > 0) {
            if (words !== '')
                words += " ";
            var cardinalHundredsValue = [
                "", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos", "seiscientos", "setecientos",
                "ochocientos", "novecientos"
            ];
            var ordinalHundredsValue = [
                "", "centésimo", "ducentésimo", "tricentésimo", "cuadringentésimo", "quingentésimo", "sexcentésimo",
                "septingentésimo", "octingentésimo", "noningentésimo"
            ];
            if (isCardText)
                words += cardinalHundredsValue[Math.floor(number / 100)];
            else
                words += ordinalHundredsValue[Math.floor(number / 100)];
            number %= 100;
        }
        if (number > 0 && number < 100) {
            if (words !== '')
                words += " ";
            var unitsValue = null;
            if (isCardText) {
                unitsValue = [
                    "", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once",
                    "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"
                ];
            }
            else {
                unitsValue = [
                    "", "primero", "segundo", "tercero", "cuarto", "quinto", "sexto", "séptimo", "octavo",
                    "noveno", "décimo", "undécimo", "duodécimo", "decimotercero", "decimocuarto", "decimoquinto",
                    "decimosexto", "decimoséptimo", "decimoctavo", "decimonoveno"
                ];
            }
            var tensValue = [
                "", "diez", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta",
                "noventa"
            ];
            var tensValue_Ordinal = [
                "", "décimo", "vigésimo", "trigésimo", "cuadragésimo", "quincuagésimo", "sexagésimo", "septuagésimo",
                "octogésimo", "nonagésimo"
            ];
            var cardNumberFrom21to29Value = [
                "", "veintiuno", "veintidós", "veintitrés", "veinticuatro", "veinticinco", "veintiséis", "veintisiete",
                "veintiocho", "veintinueve"
            ];
            if (number < 20)
                words += unitsValue[number];
            else if (number > 20 && number < 30 && isCardText) {
                words += cardNumberFrom21to29Value[number % 10];
            }
            else {
                if (isCardText && number % 10 > 0)
                    words += tensValue[Math.floor(number / 10)];
                else if (isCardText && number % 10 === 0)
                    words += tensValue[Math.floor(number / 10)];
                if (number % 10 > 0 && !isCardText)
                    words += tensValue_Ordinal[Math.floor(number / 10)];
                if (number % 10 === 0 && !isCardText)
                    words += tensValue_Ordinal[Math.floor(number / 10)];
                else if (number % 10 > 0)
                    if (isCardText)
                        words += " y " + unitsValue[number % 10];
                    else
                        words += " " + unitsValue[number % 10];
            }
        }
        return words;
    };
    Layout.prototype.getAsOrdinal = function (number, characterFormat) {
        switch (characterFormat.localeIdAscii) {
            case 1069:
            case 8218:
            case 5146:
            case 4122:
            case 1050:
            case 1029:
            case 1061:
            case 1035:
            case 3079:
            case 1031:
            case 5127:
            case 4103:
            case 2055:
            case 1038:
            case 1060:
            case 1055:
            case 1044:
            case 2068:
            case 1045:
            case 6170:
            case 2074:
                //Returns ordinal in Czech
                return number.toString() + ".";
            case 2060:
            case 11276:
            case 3084:
            case 9228:
            case 12300:
            case 1036:
            case 15372:
            case 5132:
            case 13324:
            case 6156:
            case 14348:
            case 8204:
            case 10252:
            case 4108:
                //Returns Ordinal in French
                if (number == 1)
                    return number.toString() + "er";
                else
                    return number.toString() + "e";
            case 2067:
            case 1043:
                //Returns Ordinal in Dutch
                return number.toString() + "e";
            case 1032:
                //Returns Ordinal in Greek 
                return number.toString() + "o";
            case 1040:
            case 2064:
                //Returns Ordinal in Italian
                return number.toString() + String.fromCharCode(176);
            case 5130:
            case 7178:
            case 12298:
            case 17418:
            case 4106:
            case 1046:
            case 2070:
            case 11274:
            case 16394:
            case 13322:
            case 9226:
            case 18442:
            case 2058:
            case 19466:
            case 6154:
            case 15370:
            case 10250:
            case 20490:
            case 3082:
            case 1034:
            case 21514:
            case 14346:
            case 8202:
                //Returns Ordinal in Spanish
                return number.toString() + String.fromCharCode(186);
            case 1049:
            case 2073:
                //Returns Ordinal in Russian
                return number.toString() + "-" + String.fromCharCode(1081);
            case 2077:
            case 1053:
                //Returns Ordinal in Swedish
                return this.getOrdinalInSwedish(number);
            case 1027:
                //Returns Ordinal in Catalan
                return this.getOrdinalInCatalan(number);
            case 1030:
                //Returns Ordinal in Danish
                return this.getOrdinalInDanish(number);
            default:
                //Returns Ordinal in English (Default)
                return this.getOrdinalInEnglish(number);
        }
    };
    Layout.prototype.getOrdinalInEnglish = function (number) {
        switch (number % 100) {
            case 11:
            case 12:
            case 13:
                return number.toString() + "th";
        }
        switch (number % 10) {
            case 1:
                return number.toString() + "st";
            case 2:
                return number.toString() + "nd";
            case 3:
                return number.toString() + "rd";
            default:
                return number.toString() + "th";
        }
    };
    Layout.prototype.getOrdinalInSwedish = function (number) {
        if (number == 11 || number == 12) {
            return number.toString() + ":e";
        }
        else if ((number % 10) == 1 || (number % 10) == 2) {
            return number.toString() + ":a";
        }
        else
            return number.toString() + ":e";
    };
    Layout.prototype.getOrdinalInCatalan = function (number) {
        switch (number) {
            case 1:
                return number.toString() + ".";
            case 2:
                return number.toString() + "n";
            case 3:
                return number.toString() + "r";
            case 4:
                return number.toString() + "t";
            case 14:
                return number.toString() + String.fromCharCode(232) + "h";
            default:
                return number.toString() + String.fromCharCode(232);
        }
    };
    Layout.prototype.getOrdinalInDanish = function (number) {
        if (number == 0)
            return number.toString() + "te";
        switch (number % 100) {
            case 0:
                return number.toString() + "ende";
            case 1:
                return number.toString() + "ste";
            case 2:
                return number.toString() + "nden";
            case 3:
                return number.toString() + "dje";
            case 4:
                return number.toString() + "rde";
            case 5:
            case 6:
            case 11:
            case 12:
            case 30:
                return number.toString() + "te";
            default:
                return number.toString() + "nde";
        }
    };
    Layout.prototype.getListLevel = function (list, listLevelNumber) {
        if (!isNullOrUndefined(list)) {
            var abstractList = this.documentHelper.getAbstractListById(list.abstractListId);
            if (!isNullOrUndefined(list) && abstractList.levels.length <= listLevelNumber
                && listLevelNumber >= 0 && listLevelNumber < 9) {
                this.addListLevels(abstractList);
            }
            var levelOverrideAdv = undefined;
            var level = false;
            level = (!isNullOrUndefined(list.levelOverrides))
                && !isNullOrUndefined((levelOverrideAdv = this.getOverrideListLevel(list.levelOverrides, listLevelNumber)))
                && (!isNullOrUndefined(levelOverrideAdv.overrideListLevel));
            if (level) {
                if (isNullOrUndefined(levelOverrideAdv.startAt)) {
                    levelOverrideAdv.overrideListLevel.startAt = abstractList.levels[listLevelNumber].startAt;
                }
                return levelOverrideAdv.overrideListLevel;
            }
            else if (!isNullOrUndefined(abstractList) && listLevelNumber >= 0 && listLevelNumber < abstractList.levels.length) {
                return abstractList.levels[listLevelNumber];
            }
        }
        return undefined;
    };
    Layout.prototype.getOverrideListLevel = function (levelOverrides, listLevelNumber) {
        for (var i = 0; i < levelOverrides.length; i++) {
            if (levelOverrides[i].levelNumber == listLevelNumber)
                return levelOverrides[i];
        }
        return undefined;
    };
    Layout.prototype.getTabWidth = function (paragraph, viewer, index, lineWidget, element) {
        if (element.characterFormat.hidden) {
            return 0;
        }
        var fPosition = 0;
        var isCustomTab = false;
        var tabs = paragraph.paragraphFormat.getUpdatedTabs();
        var isList = false;
        var sectionFormat = paragraph.bodyWidget.sectionFormat;
        var leftMargin = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
        var tabBeforeLeftIndent = false;
        if (!isNullOrUndefined(paragraph.paragraphFormat.listFormat.listLevel) && !isNullOrUndefined(paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat)) {
            var listFormat = paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat;
            if (paragraph.paragraphFormat.leftIndent !== listFormat.leftIndent) {
                isList = true;
            }
        }
        var clientWidth = 0;
        var clientActiveX = viewer.clientActiveArea.x;
        var firstLineIndent = HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
        var leftIndent = HelperMethods.convertPointToPixel(paragraph.paragraphFormat.leftIndent);
        if (!isNullOrUndefined(element) && lineWidget.isFirstLine()) {
            clientWidth = this.viewer.clientArea.x + firstLineIndent;
            if (isList) {
                clientActiveX = clientActiveX + firstLineIndent;
            }
        }
        else {
            clientWidth = this.viewer.clientArea.x;
        }
        if (clientActiveX < clientWidth && (this.documentHelper.compatibilityMode !== 'Word2003' || tabs.length === 0)) {
            return viewer.clientArea.x - viewer.clientActiveArea.x;
        }
        var position = viewer.clientActiveArea.x -
            (viewer.clientArea.x - HelperMethods.convertPointToPixel(paragraph.paragraphFormat.leftIndent));
        for (var i = 0; i < tabs.length; i++) {
            var tabStop = tabs[i];
            var tabStopPosition = HelperMethods.convertPointToPixel(tabStop.position);
            if (tabStopPosition < leftIndent) {
                if (parseFloat(position.toFixed(2)) < parseFloat(tabStopPosition.toFixed(2))) {
                    tabBeforeLeftIndent = true;
                }
                else {
                    tabBeforeLeftIndent = false;
                }
            }
        }
        if (lineWidget.isFirstLine() && leftIndent > 0 && firstLineIndent < 0
            && (element instanceof ListTextElementBox || !tabBeforeLeftIndent)) {
            if ((viewer.clientArea.x - viewer.clientActiveArea.x) > 0) {
                return viewer.clientArea.x - viewer.clientActiveArea.x;
            }
            else if (tabs.length === 0 && paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listLevel) {
                tabs = paragraph.paragraphFormat.listFormat.listLevel.paragraphFormat.tabs;
            }
        }
        // Calculates tabwidth based on pageleftmargin and defaulttabwidth property
        var defaultTabWidth = HelperMethods.convertPointToPixel(this.documentHelper.defaultTabWidth);
        if (tabs.length === 0 && (position > 0 && defaultTabWidth > Math.round(position) && isList ||
            defaultTabWidth === this.defaultTabWidthPixel && defaultTabWidth > Math.round(position) && position > 0)) {
            return defaultTabWidth - position;
        }
        else {
            var breaked = false;
            if (tabs.length > 0) {
                for (var i = tabs.length - 1; i > -1; i--) {
                    var tabStop = tabs[i];
                    var tabPosition = HelperMethods.convertPointToPixel(tabStop.position);
                    if (!(parseFloat(tabPosition.toFixed(2)) > parseFloat(position.toFixed(2)))) {
                        if (i > 0 && (HelperMethods.convertPointToPixel(tabs[i - 1].position) > parseFloat(position.toFixed(2)))) {
                            continue;
                        }
                        if (i != tabs.length - 1) {
                            var tabInfo = this.getJustificationTabWidth(tabs[i + 1], element, lineWidget, paragraph, defaultTabWidth, position, fPosition);
                            defaultTabWidth = tabInfo.defaultTabWidth;
                            fPosition = tabInfo.fPosition;
                            position = tabInfo.position;
                            isCustomTab = true;
                        }
                        breaked = true;
                        break;
                    }
                }
                if (!breaked) {
                    var tabJustification = this.getJustificationTabWidth(tabs[0], element, lineWidget, paragraph, defaultTabWidth, position, fPosition);
                    defaultTabWidth = tabJustification.defaultTabWidth;
                    fPosition = tabJustification.fPosition;
                    position = tabJustification.position;
                    isCustomTab = true;
                }
            }
            if (!isCustomTab) {
                var diff = parseFloat(((position * 100) % (defaultTabWidth * 100) / 100).toFixed(2));
                if (diff < 0 && isList) {
                    diff += defaultTabWidth;
                }
                var cnt = (position - diff) / defaultTabWidth;
                fPosition = (cnt + 1) * defaultTabWidth;
            }
            if (parseFloat(fPosition.toFixed(1)) === parseFloat(position.toFixed(1))) {
                return defaultTabWidth;
            }
            return (fPosition - position) > 0 ? fPosition - position : defaultTabWidth;
        }
    };
    Layout.prototype.getJustificationTabWidth = function (tab, element, lineWidget, paragraph, defaultTabWidth, position, fPosition) {
        var elementWidth = element ? this.documentHelper.textHelper.getTextSize(element, element.characterFormat) : 0;
        if (tab.tabJustification === 'Left' || tab.tabJustification === 'List') {
            fPosition = HelperMethods.convertPointToPixel(tab.position);
            if (element instanceof TabElementBox) {
                element.tabLeader = tab.tabLeader;
                element.tabText = '';
            }
        }
        else {
            var tabWidth = HelperMethods.convertPointToPixel(tab.position) - position;
            var width = this.getRightTabWidth(element.indexInOwner + 1, lineWidget, paragraph);
            if (width < tabWidth && tab.tabJustification != 'Decimal') {
                if (tab.tabJustification === 'Right') {
                    defaultTabWidth = tabWidth - width;
                    var rightIndent = HelperMethods.convertPointToPixel(paragraph.rightIndent);
                    var areaWidth = this.viewer.clientActiveArea.width + rightIndent - defaultTabWidth;
                    this.viewer.clientActiveArea.width += rightIndent;
                    if (areaWidth < 0) {
                        defaultTabWidth += areaWidth - width;
                    }
                    else if (width > areaWidth) {
                        defaultTabWidth -= width - areaWidth;
                    }
                }
                else {
                    defaultTabWidth = tabWidth - width / 2;
                }
            }
            else if (tab.tabJustification === 'Center' && (width / 2) < tabWidth) {
                defaultTabWidth = tabWidth - width / 2;
            }
            else if (tab.tabJustification === 'Decimal') {
                if (!isNullOrUndefined(element.nextElement) && element.nextElement instanceof TextElementBox) {
                    var nextElement = element.nextElement;
                    if (nextElement.text.indexOf(".") != -1) {
                        var index = nextElement.text.indexOf(".");
                        var text = nextElement.text.substring(0, index);
                        var textWidth = this.documentHelper.textHelper.getWidth(text, nextElement.characterFormat, nextElement.scriptType);
                        defaultTabWidth = tabWidth - textWidth;
                    }
                    else if (width < tabWidth) {
                        defaultTabWidth = tabWidth - width;
                    }
                    else {
                        defaultTabWidth = tabWidth;
                    }
                }
                else {
                    defaultTabWidth = tabWidth;
                }
            }
            else {
                defaultTabWidth = tab.tabJustification === 'Right' ? 0 : elementWidth;
            }
            fPosition = position;
            if (element instanceof TabElementBox) {
                element.tabLeader = tab.tabLeader;
                element.tabText = '';
            }
        }
        return {
            defaultTabWidth: defaultTabWidth,
            fPosition: fPosition,
            position: position
        };
    };
    Layout.prototype.getRightTabWidth = function (index, lineWidget, paragraph) {
        var width = 0;
        var isFieldCode = false;
        var elementBox = lineWidget.children[index];
        while (elementBox) {
            if ((elementBox instanceof FieldElementBox) || (elementBox instanceof BookmarkElementBox) || isFieldCode) {
                if (elementBox instanceof FieldElementBox) {
                    if (elementBox.fieldType === 0) {
                        isFieldCode = true;
                    }
                    else if (elementBox.fieldType === 2) {
                        isFieldCode = false;
                    }
                }
                elementBox.width = 0;
            }
            else {
                if (elementBox instanceof FieldTextElementBox && !this.isTocField(elementBox.fieldBegin)) {
                    var text = this.documentHelper.getFieldResult(elementBox.fieldBegin, elementBox.paragraph.bodyWidget.page);
                    if (text !== '') {
                        elementBox.text = text;
                    }
                }
                if (elementBox instanceof TextElementBox) {
                    this.documentHelper.textHelper.getTextSize(elementBox, elementBox.characterFormat);
                }
            }
            if (elementBox instanceof TextElementBox && elementBox.text === '\t') {
                return width;
            }
            else {
                width = (elementBox instanceof ShapeElementBox && elementBox.textWrappingStyle !== "Inline") ? width : width + elementBox.width;
            }
            elementBox = elementBox.nextNode;
        }
        return width;
    };
    Layout.prototype.getSplitIndexByWord = function (clientActiveWidth, text, width, characterFormat, scriptType) {
        var index = 0;
        var length = text.length;
        while (index < length) {
            var nextIndex = this.getTextIndexAfterSpace(text, index);
            if (nextIndex === 0 || nextIndex === length) {
                nextIndex = length - 1;
            }
            var splitWidth = width;
            if ((nextIndex < length - 1 || (nextIndex === length - 1 && text[nextIndex - 1] === ' ')) && index !== nextIndex) {
                splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.slice(0, nextIndex), characterFormat, scriptType);
            }
            if (splitWidth <= clientActiveWidth) {
                index = nextIndex;
            }
            else {
                if (index === 0 && text[0] === ' ') {
                    index = this.getTextIndexAfterSpace(text, 0);
                }
                break;
            }
        }
        return index;
    };
    Layout.prototype.getTextSplitIndexByCharacter = function (totalClientWidth, clientActiveAreaWidth, text, width, characterFormat, scriptType) {
        var length = text.length;
        for (var i = 0; i < length; i++) {
            var splitWidth = width;
            if (i + 1 < length) {
                splitWidth = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(text.substring(0, i + 1), characterFormat, scriptType);
            }
            if (splitWidth > clientActiveAreaWidth) {
                if (i === 0 && splitWidth > totalClientWidth) {
                    //Handle for cell/section having client width less than a character's width.
                    return (length > 1 && text[1] === ' ') ? this.getTextIndexAfterSpace(text, 1) : 1;
                }
                else if (text[i] === ' ') {
                    // If the character is space, then split the text from next character.
                    return this.getTextIndexAfterSpace(text, i);
                }
                return i;
            }
        }
        return 0;
    };
    Layout.prototype.getSubWidth = function (lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd) {
        var width = 0;
        var trimSpace = true;
        var lineText = '';
        var trimmedSpaceWidth = 0;
        var isBidi = lineWidget.paragraph.paragraphFormat.bidi;
        if (this.wrapPosition.length > 0) {
            var subWidths = this.getSubWidthBasedOnTextWrap(lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd);
            if (subWidths.length > 0) {
                return subWidths;
            }
        }
        var renderElementBox = lineWidget.renderedElements;
        for (var i = renderElementBox.length - 1; i >= 0; i--) {
            var element = renderElementBox[i];
            if (element.width > 0 && element instanceof TextElementBox) {
                var elementText = element.text;
                lineText = elementText + lineText;
                if (justify && isBidi) {
                    if (elementText === ' ' && i - 1 >= 0 && renderElementBox[i - 1].text === ' ') {
                        trimSpace = true;
                    }
                    else {
                        trimSpace = false;
                    }
                }
                if (trimSpace && (elementText.trim() !== '' || elementText === '\t')) {
                    if (HelperMethods.endsWith(elementText)) {
                        var widthExcludeSpace = this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(elementText, element.characterFormat, element.scriptType);
                        width += widthExcludeSpace;
                        // Trimmed space width can be found by subtracting the actual width and width exclude end space.
                        trimmedSpaceWidth += element.width - widthExcludeSpace;
                    }
                    else {
                        width += element.width;
                    }
                    trimSpace = false;
                }
                else if (!trimSpace) {
                    width += element.width;
                }
                else {
                    ////Add the width of the textelement which contains space alone and present at end of the line.
                    trimmedSpaceWidth += element.width;
                }
            }
            else {
                lineText = 'a' + lineText;
                trimSpace = false;
                if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline') {
                    continue;
                }
                width += element.width;
            }
            if (!justify) {
                width = Math.round(width);
            }
            else {
                width = width;
            }
        }
        var totalSpaceCount = lineText.length - HelperMethods.removeSpace(lineText).length;
        lineText = lineText.trim();
        spaceCount = lineText.length - HelperMethods.removeSpace(lineText).length;
        var subWidth = (this.viewer.clientArea.width - firstLineIndent - width);
        var totalSubWidth = (this.viewer.clientArea.width - firstLineIndent - (width + trimmedSpaceWidth));
        if (isBidi && justify) {
            if (totalSubWidth < 0) {
                trimmedSpaceWidth = -trimmedSpaceWidth;
            }
            else {
                subWidth = totalSubWidth;
            }
        }
        if ((subWidth <= 0 && !this.is2013Justification) || (spaceCount === 0 && justify && !isBidi)) {
            spaceCount = 0;
            subWidth = 0;
        }
        else if (justify) {
            // For justify alignment, element width will be updated based space count value.
            // So when the element is paragraph end, need to set space count to zero.
            if (!isParagraphEnd && spaceCount > 0 || (isParagraphEnd && this.is2013Justification && spaceCount > 0)) {
                subWidth = subWidth / spaceCount;
            }
            else {
                spaceCount = 0;
            }
        }
        ////Generally, trailing space of line should get trimmed, if alignment type is Right or Left.
        ////But, if right-to-left rendering is enabled and it is last line of paragraph than the trailing space should be preserved.
        ////So, subtracted the trimmedSpaceWidth from subWidth.
        else if (trimmedSpaceWidth > 0 && isBidi && isParagraphEnd) {
            subWidth -= trimmedSpaceWidth;
        }
        // So set sub width to zero to layout the element in left alignment
        // Need to remove is once after implementing subwidth update separatly
        return [{ 'trimmedSpaceWidth': trimmedSpaceWidth, 'subWidth': subWidth, 'spaceCount': spaceCount, 'totalSpaceCount': totalSpaceCount }];
    };
    Layout.prototype.getSubWidthBasedOnTextWrap = function (lineWidget, justify, spaceCount, firstLineIndent, isParagraphEnd) {
        var subWidths = [];
        var width = 0;
        var lineContent = '';
        var wrapIndex = this.wrapPosition.length - 1;
        var trimSpace = true;
        for (var z = lineWidget.children.length - 1; z >= 0; z--) {
            var elementBox = lineWidget.children[z];
            if (elementBox.width > 0 && elementBox instanceof TextElementBox) {
                var elementText = elementBox.text;
                lineContent = elementText + lineContent;
                if (trimSpace && (elementText.trim() !== '' || elementText === '\t')) {
                    if (HelperMethods.endsWith(elementText)) {
                        width += this.documentHelper.textHelper.measureTextExcludingSpaceAtEnd(elementText, elementBox.characterFormat, elementBox.scriptType);
                    }
                    else {
                        width += elementBox.width;
                    }
                    trimSpace = false;
                }
                else if (!trimSpace) {
                    width += elementBox.width;
                }
            }
            else {
                lineContent = 'a' + lineContent;
                trimSpace = false;
                if (!(elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline')) {
                    width += elementBox.width;
                }
            }
            if ((elementBox.padding.left > 0 || z === 0) && (wrapIndex >= 0)) {
                var wrapPosition = this.wrapPosition[wrapIndex--];
                while (wrapPosition.width <= 0 && (wrapIndex >= 0)) {
                    wrapPosition = this.wrapPosition[wrapIndex--];
                }
                var info = this.getSubWidthInfo(lineWidget, wrapPosition.width, width, lineContent, spaceCount, justify, isParagraphEnd);
                if (!isNullOrUndefined(info)) {
                    width = 0;
                    lineContent = '';
                    subWidths.unshift(info);
                }
            }
        }
        return subWidths;
    };
    /* eslint-disable  */
    Layout.prototype.isWordFittedByJustification = function (element, nextWordWidth) {
        var line = element.line;
        var paragraph = line.paragraph;
        var paraFormat = paragraph.paragraphFormat;
        var textAlignment = paraFormat.textAlignment;
        var isParagraphEnd = line.isLastLine();
        var firstLineIndent = 0;
        if (line.isFirstLine()) {
            firstLineIndent = HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
        }
        var availableLineWidth = this.viewer.clientActiveArea.width;
        if (nextWordWidth != 0 && availableLineWidth >= nextWordWidth / 2) {
            var whiteSpaceCount = 0;
            var widthInfo = void 0;
            var totalSpaceCount = 0;
            if (textAlignment !== 'Left' && this.viewer.textWrap && (!(textAlignment === 'Justify' && isParagraphEnd)
                || (textAlignment === 'Justify' && paraFormat.bidi) || (this.is2013Justification && isParagraphEnd))) {
                widthInfo = this.getSubWidth(line, textAlignment === 'Justify', whiteSpaceCount, firstLineIndent, isParagraphEnd);
                whiteSpaceCount = widthInfo[0].spaceCount;
                totalSpaceCount = widthInfo[0].totalSpaceCount;
            }
            if (!isNullOrUndefined(widthInfo) && widthInfo.length == 1 && availableLineWidth > 0
                && textAlignment === 'Justify' && this.documentHelper.compatibilityMode === 'Word2013' && !this.is2013Justification
                && paraFormat.rightIndent === 0 && paraFormat.leftIndent === 0) {
                var effectiveWidth = 0;
                var totalSpaceWidth = this.getTotalSpaceWidth(line, totalSpaceCount);
                var normalWidth = totalSpaceWidth / totalSpaceCount;
                var justifyWidth = (availableLineWidth + totalSpaceWidth) / totalSpaceCount;
                var diffFactor = ((justifyWidth - normalWidth) / normalWidth) * 100;
                if (diffFactor <= 33) {
                    effectiveWidth = totalSpaceWidth / 8;
                }
                else {
                    effectiveWidth = totalSpaceWidth / 4;
                }
                if (availableLineWidth + effectiveWidth >= nextWordWidth) {
                    this.viewer.clientActiveArea.x -= effectiveWidth;
                    this.viewer.clientActiveArea.width += effectiveWidth;
                    this.is2013Justification = true;
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns the total space width in line widget.
     * @param {LineWidget} lineWidget - the line widget
     * @param {number} count - the space count to be considered.
     * @returns {number} the total space width.
     */
    Layout.prototype.getTotalSpaceWidth = function (lineWidget, count) {
        var totalSpaceWidth = 0;
        var totalSpaceCount = 0;
        if (lineWidget) {
            for (var i = 0; i < lineWidget.children.length; i++) {
                var currentWidget = lineWidget.children[i];
                if (currentWidget instanceof TextElementBox) {
                    var spaceCount = currentWidget.text.length - HelperMethods.removeSpace(currentWidget.text).length;
                    if (spaceCount > 0) {
                        var spaceWidth = this.documentHelper.textHelper.getWidth(' ', currentWidget.characterFormat, currentWidget.scriptType);
                        totalSpaceWidth += spaceCount * spaceWidth;
                        totalSpaceCount += spaceCount;
                    }
                }
                if (!isNullOrUndefined(count) && totalSpaceCount >= count) {
                    break;
                }
            }
        }
        return totalSpaceWidth;
    };
    Layout.prototype.getSubWidthInfo = function (lineWidget, lastWrapPositionWidth, width, lineContent, spaceCount, justify, isParagraphEnd) {
        if (lastWrapPositionWidth > 0) {
            var wrappedSubWidth = lastWrapPositionWidth - width;
            lineContent = lineContent.trim();
            spaceCount = lineContent.length - HelperMethods.removeSpace(lineContent).length;
            // TODO: Consider first line indent.
            var totalSubWidth = wrappedSubWidth;
            if (totalSubWidth <= 0 || (spaceCount === 0 && justify && !lineWidget.paragraph.paragraphFormat.bidi)) {
                spaceCount = 0;
                totalSubWidth = 0;
            }
            else if (justify) {
                // For justify alignment, element width will be updated based space count value.
                // So when the element is paragraph end, need to set space count to zero.
                if (!isParagraphEnd && spaceCount > 0) {
                    totalSubWidth = totalSubWidth / spaceCount;
                }
                else {
                    spaceCount = 0;
                }
            }
            return { 'trimmedSpaceWidth': 0, 'subWidth': totalSubWidth, 'spaceCount': spaceCount, 'totalSpaceCount': spaceCount };
        }
        return undefined;
    };
    Layout.prototype.getBeforeSpacing = function (paragraph, pageIndex) {
        var beforeSpacing = 0;
        if (!this.documentHelper.dontUseHtmlParagraphAutoSpacing) {
            var previousBlock = paragraph.previousWidget;
            if (previousBlock instanceof ParagraphWidget) {
                var afterSpacing = this.getAfterSpacing(previousBlock);
                var before = paragraph.paragraphFormat.beforeSpacing;
                if (paragraph.paragraphFormat.spaceBeforeAuto) {
                    before = 14;
                }
                if (afterSpacing < before) {
                    beforeSpacing = before - afterSpacing;
                }
            }
            else if (previousBlock instanceof TableWidget) {
                if (paragraph.paragraphFormat.spaceBeforeAuto) {
                    beforeSpacing = 14;
                }
                else {
                    beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                }
            }
            else {
                if (pageIndex > 0 && paragraph === paragraph.bodyWidget.childWidgets[0]) {
                    if (this.documentHelper.pages[pageIndex].sectionIndex !== this.documentHelper.pages[pageIndex - 1].sectionIndex) {
                        if (paragraph.paragraphFormat.spaceBeforeAuto) {
                            beforeSpacing = 14;
                        }
                        else {
                            beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                        }
                    }
                }
                else {
                    if (paragraph.paragraphFormat.spaceBeforeAuto) {
                        beforeSpacing = 0;
                    }
                    else {
                        beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
                    }
                }
            }
        }
        else {
            beforeSpacing = paragraph.paragraphFormat.beforeSpacing;
        }
        if (this.isSameStyle(paragraph, false)) {
            return 0;
        }
        else {
            return HelperMethods.convertPointToPixel(beforeSpacing);
        }
    };
    Layout.prototype.getAfterSpacing = function (paragraph) {
        var afterSpacing = paragraph.paragraphFormat.afterSpacing;
        if (!this.documentHelper.dontUseHtmlParagraphAutoSpacing && paragraph.paragraphFormat.spaceAfterAuto) {
            if (isNullOrUndefined(paragraph.nextWidget) && paragraph.isInsideTable) {
                afterSpacing = 0;
            }
            else {
                afterSpacing = 14;
            }
        }
        if (this.isSameStyle(paragraph, true)) {
            return 0;
        }
        else {
            return afterSpacing;
        }
    };
    Layout.prototype.getLineSpacing = function (paragraph, maxHeight, alterLineSpacing) {
        if (isNullOrUndefined(paragraph.paragraphFormat)) {
            return 0;
        }
        var lineSpacing = 0;
        switch (paragraph.paragraphFormat.lineSpacingType) {
            case 'AtLeast':
            case 'Exactly':
                lineSpacing = HelperMethods.convertPointToPixel(paragraph.paragraphFormat.lineSpacing);
                break;
            default:
                lineSpacing = paragraph.paragraphFormat.lineSpacing;
                if (alterLineSpacing) {
                    lineSpacing = lineSpacing - 1;
                }
                lineSpacing = lineSpacing * maxHeight;
                break;
        }
        return lineSpacing;
    };
    Layout.prototype.isParagraphFirstLine = function (paragraph, line) {
        var widget = paragraph;
        if (isNullOrUndefined(widget.childWidgets) || widget.childWidgets.indexOf(line) === 0) {
            //If the line elements conatins the elements from previous paragraph then need to retun false.
            //Example scenario, Field start and field end in different paragraphs.
            if (line.children.length > 0 && !isNullOrUndefined(paragraph.previousWidget)
                && paragraph.previousWidget instanceof ParagraphWidget) {
                return line.paragraph.index !== paragraph.previousWidget.index;
            }
            return true; //If the line elements count is zero then also need to return true.
        }
        return false;
    };
    Layout.prototype.isParagraphLastLine = function (element) {
        var paragraph = element.line.paragraph;
        var lastLineWidget = paragraph.childWidgets[paragraph.childWidgets.length - 1];
        var lastInline = lastLineWidget.children[lastLineWidget.children.length - 1];
        if (element === lastInline) {
            return (lastInline instanceof FieldElementBox) || ((!(lastInline instanceof TextElementBox && lastInline.text === '\v')));
        }
        return false;
    };
    Layout.prototype.getTextIndexAfterSpace = function (text, startIndex) {
        var length = text.length;
        var index = 0;
        var hyphenIndex = 0;
        index = text.indexOf(' ', startIndex) + 1;
        hyphenIndex = text.indexOf('-', startIndex) + 1;
        if (hyphenIndex == 1) {
            hyphenIndex = text.indexOf('-', (hyphenIndex + 1)) + 1;
        }
        if (hyphenIndex > 0 && index > 0) {
            index = Math.min(index, hyphenIndex);
        }
        else if (hyphenIndex > 0 && index == 0) {
            index = hyphenIndex;
        }
        var nextIndex = index;
        if (nextIndex === 0 || nextIndex === length) {
            return nextIndex;
        }
        while (text[nextIndex] === ' ') {
            nextIndex++;
            if (nextIndex === length) {
                break;
            }
        }
        return nextIndex;
    };
    //#region Table
    Layout.prototype.moveNextWidgetsToTable = function (tableWidget, currentRow, moveFromNext) {
        var rowIndex = currentRow.indexInOwner;
        var currentTable = tableWidget[tableWidget.length - 1];
        if (moveFromNext) {
            rowIndex += 1;
        }
        var nextWidgets = currentRow.containerWidget.childWidgets.splice(rowIndex);
        for (var i = 0; i < nextWidgets.length; i++) {
            currentTable.childWidgets.push(nextWidgets[i]);
            nextWidgets[i].containerWidget = currentTable;
        }
    };
    Layout.prototype.addTableCellWidget = function (cell, area, maxCellMarginTop, maxCellMarginBottom) {
        //let tableCellWidget: TableCellWidget = new TableCellWidget(cell);
        var prevColumnIndex = 0;
        var cellspace = 0;
        var left = 0;
        var top = maxCellMarginTop;
        var right = 0;
        var bottom = maxCellMarginBottom;
        if (!isNullOrUndefined(cell.cellFormat)) {
            if (cell.cellFormat.containsMargins()) {
                left = isNullOrUndefined(cell.cellFormat.leftMargin) ? HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.leftMargin) : HelperMethods.convertPointToPixel(cell.cellFormat.leftMargin);
                right = isNullOrUndefined(cell.cellFormat.rightMargin) ? HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.rightMargin) : HelperMethods.convertPointToPixel(cell.cellFormat.rightMargin);
            }
            else {
                if (cell.columnIndex === 0 && cell.ownerRow.rowFormat.hasValue('leftMargin')) {
                    left = HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.leftMargin);
                }
                else {
                    left = HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.leftMargin);
                }
                if (cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1 &&
                    cell.ownerRow.rowFormat.hasValue('rightMargin')) {
                    right = HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.rightMargin);
                }
                else {
                    right = HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.rightMargin);
                }
            }
        }
        cellspace = !isNullOrUndefined(cell.ownerTable) && !isNullOrUndefined(cell.ownerTable.tableFormat) ? HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing) : 0;
        if (cellspace === 0 && cell.ownerTable.isContainInsideTable && !cell.ownerTable.header) {
            var topBorder = TableCellWidget.getCellTopBorder(cell);
            if (cell.topMargin === 0 && topBorder.lineWidth === 0.75) {
                top += HelperMethods.convertPointToPixel(0.5);
            }
            var leftBorder = TableCellWidget.getCellLeftBorder(cell);
            if (cell.leftMargin <= 0.5 && leftBorder.lineWidth === 0.75) {
                left += HelperMethods.convertPointToPixel(0.8);
            }
        }
        cell.margin = new Margin(left, top, right, bottom);
        var autofit = cell.ownerTable.tableFormat.allowAutoFit;
        var cellWidth = cell.cellFormat.cellWidth;
        if (cell.cellFormat.preferredWidthType === 'Percent' && cell.cellFormat.preferredWidth !== 0 && cellWidth <= 0) {
            var width = HelperMethods.convertPointToPixel(cell.ownerTable.getTableClientWidth(cell.ownerTable.getContainerWidth()));
            cellWidth = cell.ownerTable.getCellWidth(cell.cellFormat.preferredWidth, cell.cellFormat.preferredWidthType, width, cell);
        }
        // if (cellWidth > cell.cellFormat.preferredWidth && cell.cellFormat.preferredWidth !== 0 && cell.cellFormat.preferredWidthType !== 'Percent' && cell.ownerTable.tableFormat.preferredWidthType !== 'Percent' && isNullOrUndefined(cell.ownerTable.positioning) && (!cell.ownerTable.isContainInsideTable) && (!(cell.ownerTable.containerWidget instanceof TableCellWidget))) {
        //     cellWidth = cell.cellFormat.preferredWidth;
        // }
        cell.width = HelperMethods.convertPointToPixel(cellWidth);
        if (!isNullOrUndefined(cell.previousWidget)) {
            prevColumnIndex = cell.previousWidget.columnIndex + cell.previousWidget.cellFormat.columnSpan;
        }
        var prevSpannedCellWidth = 0;
        if (prevColumnIndex < cell.columnIndex) {
            prevSpannedCellWidth = HelperMethods.convertPointToPixel(cell.ownerTable.tableHolder.getPreviousSpannedCellWidth(prevColumnIndex, cell.columnIndex));
            if (prevColumnIndex === 0) {
                prevSpannedCellWidth = prevSpannedCellWidth - cellspace / 2;
            }
        }
        cell.x = area.x + prevSpannedCellWidth + cell.margin.left;
        cell.y = area.y + cell.margin.top + cellspace;
        cell.width = cell.width - cell.margin.left - cell.margin.right;
        if (cellspace > 0) {
            cell.x += cellspace;
            if (cell.ownerTable.tableHolder.columns.length === 1) {
                cell.width -= cellspace * 2;
            }
            else if (cell.columnIndex === 0 || cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1) {
                cell.width -= ((cellspace * 2) - cellspace / 2);
            }
            else {
                cell.width -= cellspace;
            }
        }
        var leftBorderWidth = HelperMethods.convertPointToPixel(TableCellWidget.getCellLeftBorder(cell).getLineWidth());
        var rightBorderWidth = HelperMethods.convertPointToPixel(TableCellWidget.getCellRightBorder(cell).getLineWidth());
        // update the margins values respect to layouting of borders.
        // for normal table cells only left border is rendred. for last cell left and right border is rendred.
        // this border widths are not included in margins.
        var linestyle = false;
        cell.leftBorderWidth = !cell.ownerTable.isBidiTable ? leftBorderWidth : rightBorderWidth;
        var isLeftStyleNone = (cell.cellFormat.borders.left.lineStyle === 'None');
        var isRightStyleNone = (cell.cellFormat.borders.right.lineStyle === 'None');
        cell.x += (!isLeftStyleNone) ? 0 : (cell.leftBorderWidth > 0) ? 0 : cell.leftBorderWidth;
        cell.width -= (!isLeftStyleNone) ? 0 : (cell.leftBorderWidth > 0) ? 0 : cell.leftBorderWidth;
        var lastCell = !cell.ownerTable.isBidiTable ? cell.cellIndex === cell.ownerRow.childWidgets.length - 1
            : cell.cellIndex === 0;
        if (cellspace > 0 || cell.columnIndex === cell.ownerTable.tableHolder.columns.length - 1 ||
            cell.index === cell.containerWidget.childWidgets.length - 1) {
            cell.rightBorderWidth = !cell.ownerTable.isBidiTable ? rightBorderWidth : leftBorderWidth;
            if (!cell.ownerTable.tableFormat.allowAutoFit) {
                cell.width -= cell.rightBorderWidth;
            }
            if (!this.isInsertTable()) {
                linestyle = this.checkPreviousMargins(cell.ownerTable);
            }
        }
        //Add the border widths to respective margin side.
        //cell.margin.left += (isLeftStyleNone) ? 0 : (cell.leftBorderWidth);
        cell.margin.right += (isRightStyleNone && !linestyle) ? 0 : (cell.rightBorderWidth);
        //cell.ownerWidget = owner;
        return cell;
    };
    Layout.prototype.checkPreviousMargins = function (table) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[row.childWidgets.length - 1];
                if (cell.cellFormat.borders.right.lineStyle !== 'None') {
                    return true;
                }
            }
        }
        return false;
    };
    Layout.prototype.addWidgetToTable = function (viewer, tableCollection, rowCollection, row, footnotes, endRowWidget, isInitialLayout, startRowIndex, isRepeatRowHeader) {
        //Adds table row widget to owner table widget.
        var tableWidget = tableCollection[0];
        var index = tableWidget.childWidgets.length;
        var prevWidget = undefined;
        var rowWidgetIndex = rowCollection.indexOf(row);
        var footnoteWidgets = [];
        if (rowWidgetIndex > 0) {
            prevWidget = rowCollection[rowWidgetIndex - 1];
            // Need to update on this further
        }
        else if (row.previousRenderedWidget instanceof TableRowWidget &&
            row.previousRenderedWidget.ownerTable.equals(row.ownerTable)) {
            // Need to update on this further
            prevWidget = row.previousRenderedWidget;
        }
        if (!isNullOrUndefined(prevWidget)) {
            tableWidget = prevWidget.containerWidget;
            // index = tableWidget.childWidgets.length;
            index = tableWidget.childWidgets.indexOf(prevWidget) + 1;
            if (Math.round(row.y) !== Math.round(prevWidget.y + prevWidget.height)) {
                var prevIndex = tableCollection.indexOf(tableWidget);
                if (prevIndex + 1 >= tableCollection.length) {
                    //Creates new table widget for splitted rows.
                    this.addTableWidget(viewer.clientActiveArea, tableCollection, true);
                }
                tableWidget = tableCollection[prevIndex + 1];
                index = tableWidget.childWidgets.length;
            }
            if (rowWidgetIndex > 0) {
                index = 0;
            }
        }
        this.updateRowHeightBySpannedCell(tableWidget, row, index);
        this.updateRowHeightByCellSpacing(tableCollection, row, viewer);
        //Remove widget from previous container after splitteing
        if (row.containerWidget && row.containerWidget !== tableWidget &&
            row.containerWidget.childWidgets.indexOf(row) !== -1) {
            row.containerWidget.childWidgets.splice(row.containerWidget.childWidgets.indexOf(row), 1);
        }
        if (tableWidget.childWidgets.indexOf(row) === -1) {
            tableWidget.childWidgets.splice(index, 0, row);
            if (isRepeatRowHeader) {
                tableWidget.bodyWidget.page.repeatHeaderRowTableWidget = true;
            }
        }
        row.containerWidget = tableWidget;
        if (!row.ownerTable.isInsideTable) {
            if (footnotes.length > 0) {
                if (!isNullOrUndefined(footnotes)) {
                    footnoteWidgets = this.getFootnoteBody(footnotes);
                }
            }
            else {
                if (!isNullOrUndefined(row)) {
                    for (var i = 0; i < row.childWidgets.length; i++) {
                        var cell = row.childWidgets[i];
                        for (var j = 0; j < cell.childWidgets.length; j++) {
                            var footnoteCollection = this.getFootNoteWidgetsOf(cell.childWidgets[j], true);
                            for (var k = 0; k < footnoteCollection.length; k++) {
                                footnoteWidgets.splice(footnoteWidgets.length, 0, footnoteCollection[k]);
                            }
                        }
                    }
                }
            }
            if (footnoteWidgets.length > 0 && isNullOrUndefined(footnoteWidgets[0].containerWidget)) {
                this.layoutFootnoteInSplittedRow(row, footnoteWidgets);
            }
            else if (!isNullOrUndefined(footnoteWidgets) && footnoteWidgets.length > 0 && row.bodyWidget.previousRenderedWidget !== undefined && startRowIndex !== row.bodyWidget.page.index && footnoteWidgets[0].containerWidget.page.index !== row.bodyWidget.page.index) {
                this.moveFootNotesToPage(footnoteWidgets, footnoteWidgets[0].containerWidget.page.bodyWidgets[0], row.bodyWidget);
            }
            else if (footnoteWidgets.length > 0 && !this.isInitialLoad && !isNullOrUndefined(row.bodyWidget.page.footnoteWidget)) {
                this.layoutfootNote(row.bodyWidget.page.footnoteWidget);
            }
            footnotes.length = 0;
        }
        tableWidget.height = tableWidget.height + row.height;
        if (this.viewer instanceof PageLayoutViewer) {
            if (!isNullOrUndefined(tableWidget.containerWidget)
                && tableWidget.containerWidget.childWidgets.indexOf(tableWidget) >= 0 &&
                !(tableWidget.containerWidget instanceof HeaderFooterWidget)) {
                tableWidget.containerWidget.height += row.height;
            }
        }
        this.updateHeightForRowWidget(viewer, false, tableCollection, rowCollection, row, false, endRowWidget, isInitialLayout);
        viewer.cutFromTop(row.y + row.height);
        this.viewer.clientActiveArea.height -= this.getFootNoteHeight(footnoteWidgets);
        if (!row.ownerTable.isInsideTable) {
            this.existFootnoteHeight = 0;
        }
    };
    Layout.prototype.layoutFootnoteInSplittedRow = function (row, footnoteWidgets) {
        if (footnoteWidgets && footnoteWidgets.length > 0) {
            if (isNullOrUndefined(row.ownerTable.bodyWidget.page.footnoteWidget)) {
                this.addEmptyFootNoteToBody(row.ownerTable.bodyWidget);
            }
            var footnoteWidget = row.ownerTable.bodyWidget.page.footnoteWidget;
            if (footnoteWidget) {
                for (var j = 0; j < footnoteWidgets.length; j++) {
                    footnoteWidget.bodyWidgets.push(footnoteWidgets[j]);
                    footnoteWidgets[j].containerWidget = footnoteWidget;
                }
                this.layoutfootNote(footnoteWidget);
            }
        }
    };
    Layout.prototype.getFootNoteHeight = function (footnoteWidgets) {
        var height = 0;
        if (Array.isArray(footnoteWidgets)) {
            for (var i = 0; i < footnoteWidgets.length; i++) {
                height += this.getFootnoteHeightInternal(footnoteWidgets[i], i);
            }
        }
        else {
            height = this.getFootnoteHeightInternal(footnoteWidgets, 0);
        }
        return height;
    };
    Layout.prototype.getFootnoteHeightInternal = function (footnoteWidgets, index) {
        var height = 0;
        for (var i = 0; i < footnoteWidgets.childWidgets.length; i++) {
            height += footnoteWidgets.childWidgets[i].height;
            if ((footnoteWidgets.indexInOwner === 0 || (footnoteWidgets.indexInOwner !== -1 && footnoteWidgets.containerWidget
                && this.existFootnoteHeight === 0 && index === 0)) && i === 0) {
                height += footnoteWidgets.containerWidget.margin.top;
            }
        }
        return height;
    };
    Layout.prototype.updateRowHeightBySpannedCell = function (tableWidget, row, insertIndex) {
        var rowSpan = 1;
        if (tableWidget.childWidgets.length === 0 || insertIndex === 0) {
            this.updateRowHeight(row, row);
            return;
        }
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cellWidget = row.childWidgets[i];
            rowSpan = (isNullOrUndefined(cellWidget) || isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan : cellWidget.cellFormat.rowSpan;
            this.updateSpannedRowCollection(rowSpan, row, cellWidget);
        }
        if (!isNullOrUndefined(row.ownerTable)) {
            for (var i = 0; i < row.ownerTable.spannedRowCollection.length; i++) {
                if (row.ownerTable.spannedRowCollection.keys[i] === row.index) {
                    // Back track to previous table row widgets and update it height if vertical merge ends with this row.
                    for (var j = 0; j < insertIndex; j++) {
                        var prevRowWidget = tableWidget.childWidgets[j];
                        this.updateRowHeight(prevRowWidget, row);
                    }
                    row.ownerTable.spannedRowCollection.remove(row.ownerTable.spannedRowCollection.keys[i]);
                    break;
                }
            }
        }
    };
    Layout.prototype.updateRowHeight = function (prevRowWidget, row) {
        var rowIndex = row.index;
        var rowSpan = 1;
        for (var i = 0; i < prevRowWidget.childWidgets.length; i++) {
            var cellWidget = prevRowWidget.childWidgets[i];
            rowSpan = (isNullOrUndefined(cellWidget) || isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan : cellWidget.cellFormat.rowSpan;
            //To update Row height- if row has row span value greater than 1, need to add it in spannedRowCollection            
            this.updateSpannedRowCollection(rowSpan, row, cellWidget);
            if (rowIndex - cellWidget.rowIndex === rowSpan - 1) {
                var mergedCellHeight = cellWidget.y + cellWidget.height + cellWidget.margin.bottom - row.y;
                if ((row.rowFormat.heightType !== 'Exactly' || (row.rowFormat.heightType === 'Exactly' && row.rowFormat.height > mergedCellHeight)) && row.height < mergedCellHeight) {
                    row.height = mergedCellHeight;
                }
            }
        }
    };
    //if row has row span value greater than 1, need to add it in spannedRowCollection
    Layout.prototype.updateSpannedRowCollection = function (rowSpan, row, cellWidget) {
        if (rowSpan > 1 && !isNullOrUndefined(row.ownerTable)) {
            //Checks the rowspan is already exist in the list
            if (!row.ownerTable.spannedRowCollection.containsKey(row.index + rowSpan - 1)) {
                row.ownerTable.spannedRowCollection.add(row.index + rowSpan - 1, row.index);
            }
        }
    };
    Layout.prototype.updateRowHeightByCellSpacing = function (tableCollection, row, viewer) {
        if (row.ownerTable.tableFormat.cellSpacing > 0) {
            // In the Case of tableWidget is greater than one and rowWidget is start at the Top Position of the page. 
            // In such case we have update the row height with half of cell spacing.
            // Remaining cases we have to update the entire hight
            if (tableCollection.length > 1 && row.y === viewer.clientArea.y && viewer instanceof PageLayoutViewer) {
                row.height = row.height - HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.cellSpacing) / 2;
            }
        }
    };
    Layout.prototype.isRowSpanEnd = function (row, viewer) {
        var rowIndex = row.index;
        var rowSpan = 1;
        for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
            var splittedCell = this.documentHelper.splittedCellWidgets[i];
            rowSpan = (isNullOrUndefined(splittedCell) || isNullOrUndefined(splittedCell.cellFormat)) ? rowSpan : splittedCell.cellFormat.rowSpan;
            if (rowIndex - splittedCell.rowIndex === rowSpan - 1) {
                return true;
            }
        }
        return false;
    };
    Layout.prototype.isVerticalMergedCellContinue = function (row) {
        var colIndex = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            if (colIndex < cell.columnIndex) {
                return true;
            }
            colIndex += cell.cellFormat.columnSpan;
        }
        return colIndex < row.ownerTable.tableHolder.columns.length;
    };
    Layout.prototype.splitWidgets = function (tableRowWidget, viewer, tableCollection, rowCollection, splittedWidget, isLastRow, footNoteCollection, lineIndexInCell, cellIndex, isMultiColumnSplit, isRowSpan) {
        if (!(isMultiColumnSplit && lineIndexInCell === 0) && (this.isFirstLineFitForRow(viewer.clientArea.bottom, tableRowWidget) && tableRowWidget.childWidgets.length > 0)) {
            splittedWidget = this.getSplittedWidgetForRow(viewer.clientArea.bottom, tableCollection, rowCollection, tableRowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, undefined, isRowSpan);
            footNoteCollection = [];
            if (this.documentHelper.splittedCellWidgets.length > 0 || splittedWidget !== tableRowWidget) {
                if (isLastRow) {
                    for (var i = 0; i < splittedWidget.childWidgets.length; i++) {
                        var cell = splittedWidget.childWidgets[i];
                        if (cell.rowIndex !== splittedWidget.index) {
                            splittedWidget.childWidgets.splice(i, 1);
                            i--;
                        }
                    }
                }
                //Adds the splitted widget of a vertical merged cell, to next row widget in the next page.
                this.insertSplittedCellWidgets(viewer, tableCollection, splittedWidget, tableRowWidget.index - 1);
            }
        }
        else {
            //Adds the splitted widget of a vertical merged cell, to next row widget in the next page.
            this.insertSplittedCellWidgets(viewer, tableCollection, splittedWidget, tableRowWidget.index - 1);
        }
        return splittedWidget;
    };
    Layout.prototype.getSplittedWidgetForRow = function (bottom, tableCollection, rowCollection, tableRowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count, isRowSpan) {
        var splittedWidget = undefined;
        var rowIndex = tableRowWidget.index;
        this.isRelayoutneed = false;
        var issplit = false;
        var cellHeight = tableRowWidget.height;
        var previousHeight = cellHeight;
        var maximumCellWidgetHeight = 0;
        for (var i = 0; i < tableRowWidget.childWidgets.length; i++) {
            var cellWidget = tableRowWidget.childWidgets[i];
            if (i === 0 && cellWidget.childWidgets.length > 0 && cellWidget.columnIndex === 0
                && cellWidget.cellFormat.rowSpan === 1 && this.documentHelper.compatibilityMode === 'Word2013'
                && this.documentHelper.splittedCellWidgets.length === 0 && rowCollection.length === 1) {
                var firstBlock = this.documentHelper.getFirstParagraphInCell(cellWidget);
                if (!isNullOrUndefined(firstBlock) && firstBlock.paragraphFormat.keepWithNext && !isNullOrUndefined(this.getPreviousBlock(tableRowWidget))) {
                    return tableRowWidget;
                }
            }
            var splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count);
            if (isMultiColumnSplit && !isNullOrUndefined(splittedCell) && splittedCell.childWidgets.length !== 0 && cellHeight > cellWidget.height) {
                cellHeight = cellWidget.height;
            }
            if (!isNullOrUndefined(footNoteCollection) && footNoteCollection.length > 0) {
                for (var j = 0; j < footNoteCollection.length; j++) {
                    if (footNoteCollection[j].paragraph.containerWidget.indexInOwner === -1) {
                        footNoteCollection.splice(j, 1);
                    }
                }
            }
            if (isNullOrUndefined(splittedCell) && cellWidget === tableRowWidget.childWidgets[tableRowWidget.childWidgets.length - 1] && this.isRowSpanEnd(tableRowWidget, this.viewer) && this.documentHelper.splittedCellWidgets.length > 0 && isRowSpan) {
                splittedWidget = this.getSplittedWidgetForSpannedRow(bottom, tableRowWidget, tableCollection, rowCollection, footNoteCollection);
                splittedCell = undefined;
            }
            if (!isNullOrUndefined(splittedCell)) {
                if (splittedCell === cellWidget) {
                    // if the previous cell Widget is already splitted, in that case need to combine the splitted row widgets to single row widget.
                    if (rowCollection.length > 1) {
                        this.combineSplittedRowWidgets(rowCollection, previousHeight);
                    }
                    //Returns if the whole content of the row does not fit in current page.
                    return tableRowWidget;
                }
                var nestedCellHeight = 0;
                if (cellWidget.ownerTable.isInsideTable) {
                    for (var k = 0; k < cellWidget.childWidgets.length; k++) {
                        nestedCellHeight += cellWidget.childWidgets[k].height;
                    }
                }
                if (cellWidget.ownerTable.isInsideTable) {
                    if (maximumCellWidgetHeight < nestedCellHeight) {
                        maximumCellWidgetHeight = nestedCellHeight;
                    }
                }
                else if (cellWidget.height > maximumCellWidgetHeight) {
                    maximumCellWidgetHeight = cellWidget.height;
                }
                if (tableRowWidget.childWidgets.indexOf(splittedCell) !== -1) {
                    tableRowWidget.childWidgets.splice(tableRowWidget.childWidgets.indexOf(splittedCell), 1);
                }
                tableRowWidget.height -= splittedCell.height;
                if (i === 0 || tableRowWidget.height < maximumCellWidgetHeight + cellWidget.margin.top + cellWidget.margin.bottom) {
                    tableRowWidget.height = maximumCellWidgetHeight + cellWidget.margin.top + cellWidget.margin.bottom;
                }
                if (isNullOrUndefined(splittedWidget)) {
                    //Creates new widget, to hold the splitted contents.
                    splittedWidget = new TableRowWidget();
                    splittedWidget.containerWidget = tableRowWidget.containerWidget;
                    splittedWidget.index = tableRowWidget.index;
                    splittedWidget.rowFormat = tableRowWidget.rowFormat;
                    splittedWidget.isRenderBookmarkEnd = tableRowWidget.isRenderBookmarkEnd;
                    this.updateWidgetLocation(tableRowWidget, splittedWidget);
                    // splittedWidget.height = 0;
                    rowCollection.push(splittedWidget);
                }
                var rowSpan = 1;
                rowSpan = (isNullOrUndefined(splittedCell) || isNullOrUndefined(splittedCell.cellFormat)) ? rowSpan : splittedCell.cellFormat.rowSpan;
                if (rowIndex - splittedCell.rowIndex === rowSpan - 1
                    && splittedWidget.height < splittedCell.height + splittedCell.margin.top + splittedCell.margin.bottom) {
                    splittedWidget.height = splittedCell.height + splittedCell.margin.top + splittedCell.margin.bottom;
                }
                else {
                    if (tableRowWidget.rowFormat.heightType === 'Exactly' || (tableRowWidget.rowFormat.heightType === 'AtLeast' &&
                        splittedWidget.height < tableRowWidget.rowFormat.height)) {
                        //Sets the height for row widget if height type is exact or at least.
                        splittedWidget.height = tableRowWidget.rowFormat.height;
                    }
                }
                splittedWidget.childWidgets.push(splittedCell);
                splittedCell.containerWidget = splittedWidget;
                this.isRelayoutneed = true;
                var count_1 = i;
                while (count_1 > 0 && !issplit) {
                    var cellWidget_1 = tableRowWidget.childWidgets[count_1 - 1];
                    splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget_1, footNoteCollection);
                    splittedWidget.childWidgets.splice(0, 0, splittedCell);
                    splittedCell.containerWidget = splittedWidget;
                    count_1--;
                }
                issplit = true;
            }
        }
        if (isMultiColumnSplit && cellHeight !== previousHeight) {
            for (var i = 0; i < tableRowWidget.childWidgets.length; i++) {
                tableRowWidget.childWidgets[i].height = cellHeight;
            }
            tableRowWidget.height = cellHeight;
        }
        return splittedWidget;
    };
    Layout.prototype.combineSplittedRowWidgets = function (rowCollection, previousRowHeight) {
        var existingRow = rowCollection[0];
        for (var i = 1; i < rowCollection.length; i++) {
            var row = rowCollection[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var existingCell = existingRow.childWidgets[j];
                var cell = row.childWidgets[j];
                if (cell.childWidgets.length > 0) {
                    for (var k = 0; k < cell.childWidgets.length; k++) {
                        var block = cell.childWidgets[k];
                        if (block instanceof ParagraphWidget) {
                            var existingPara = existingCell.childWidgets[k];
                            if (existingPara.index === block.index) {
                                var paragraph = block;
                                if (paragraph.childWidgets.length > 0) {
                                    for (var l = 0; l < paragraph.childWidgets.length; l++) {
                                        var line = paragraph.childWidgets[l];
                                        existingPara.childWidgets.push(line);
                                        line.paragraph = existingPara;
                                        existingPara.height += line.height;
                                    }
                                }
                            }
                            else {
                                existingCell.childWidgets.push(block);
                                block.containerWidget = existingCell;
                            }
                            existingCell.height += block.height;
                        }
                        else if (block instanceof TableWidget) {
                            existingCell.childWidgets.push(block);
                            block.containerWidget = existingCell;
                            existingCell.height += block.height;
                        }
                    }
                }
            }
            rowCollection.splice(i, 1);
        }
        existingRow.height = previousRowHeight;
    };
    Layout.prototype.getSplittedWidgetForSpannedRow = function (bottom, tableRowWidget, tableCollection, rowCollection, footNoteCollection) {
        var splittedWidget = undefined;
        var splittedCell = undefined;
        var issplit = false;
        var isNeedToInsertNextCell = false;
        for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
            splittedCell = this.documentHelper.splittedCellWidgets[i];
            var nextSplittedCell = this.documentHelper.splittedCellWidgets[i + 1];
            var nextSplittedCellColumnIndex = !isNullOrUndefined(nextSplittedCell) ? nextSplittedCell.columnIndex : 0;
            // splitted cell widget column index
            var previousColumnIndex = this.documentHelper.splittedCellWidgets[i].columnIndex;
            var splitCell = this.documentHelper.splittedCellWidgets[i];
            // previousColumnIndex value is updated based on the previous row spanned cell widgets.
            while (splitCell && splitCell.cellFormat.rowSpan === this.documentHelper.splittedCellWidgets[i].cellFormat.rowSpan && previousColumnIndex > 0 && !issplit) {
                previousColumnIndex = splitCell.columnIndex;
                var row = splitCell.containerWidget;
                splitCell = row.getCell(row.rowIndex, previousColumnIndex - 1);
            }
            // splitted cell widget column index
            var nextColumnIndex = this.documentHelper.splittedCellWidgets[i].columnIndex;
            splitCell = this.documentHelper.splittedCellWidgets[i];
            // nextColumnIndex value is updated based on the next row spanned cell widgets.
            while (splitCell && splitCell.cellFormat.rowSpan === this.documentHelper.splittedCellWidgets[i].cellFormat.rowSpan && nextColumnIndex < splitCell.containerWidget.childWidgets.length - 1 && (!issplit || isNeedToInsertNextCell)) {
                nextColumnIndex = splitCell.columnIndex;
                var row = splitCell.containerWidget;
                splitCell = row.getCell(row.rowIndex, nextColumnIndex + 1);
            }
            if (isNullOrUndefined(splittedWidget)) {
                splittedWidget = new TableRowWidget();
                splittedWidget.containerWidget = tableRowWidget.containerWidget;
                splittedWidget.index = tableRowWidget.index;
                splittedWidget.rowFormat = tableRowWidget.rowFormat;
                splittedWidget.isRenderBookmarkEnd = tableRowWidget.isRenderBookmarkEnd;
                this.updateWidgetLocation(tableRowWidget, splittedWidget);
                rowCollection.push(splittedWidget);
            }
            splittedWidget.childWidgets.push(splittedCell);
            splittedCell.containerWidget = splittedWidget;
            this.isRelayoutneed = true;
            // insert cell widgets to left of the splitted cell widget.
            while (previousColumnIndex > 0 && !issplit) {
                var cellWidget = tableRowWidget.getCell(tableRowWidget.index, previousColumnIndex - 1);
                if (isNullOrUndefined(cellWidget)) {
                    previousColumnIndex--;
                    continue;
                }
                splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget, footNoteCollection);
                splittedWidget.childWidgets.splice(0, 0, splittedCell);
                splittedCell.containerWidget = splittedWidget;
                previousColumnIndex--;
            }
            // insert cell widgets to right of the splitted cell widget.
            while (nextColumnIndex < tableRowWidget.childWidgets[tableRowWidget.childWidgets.length - 1].columnIndex && (!issplit || isNeedToInsertNextCell)) {
                var cellWidget = tableRowWidget.getCell(tableRowWidget.index, nextColumnIndex + 1);
                if (isNullOrUndefined(cellWidget)) {
                    nextColumnIndex++;
                    continue;
                }
                // check whether the cellWidget column index is greater than the next splitted cell widget column index.
                // if so, then break the loop and insert the splitted cell widget and remaining cell widgets.
                if (nextSplittedCell && cellWidget.columnIndex > nextSplittedCellColumnIndex) {
                    isNeedToInsertNextCell = true;
                    break;
                }
                splittedCell = this.getSplittedWidget(bottom, true, tableCollection, rowCollection, cellWidget, footNoteCollection);
                splittedWidget.childWidgets.push(splittedCell);
                splittedCell.containerWidget = splittedWidget;
                nextColumnIndex++;
            }
            issplit = true;
        }
        return splittedWidget;
    };
    Layout.prototype.getFootNoteHeightInLine = function (line) {
        var height = 0;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            if (element instanceof FootnoteElementBox) {
                height += this.getFootNoteHeight(element.bodyWidget);
            }
        }
        return height;
    };
    Layout.prototype.getFootnoteFromLine = function (line, footNoteCollection) {
        for (var i = 0; i < line.children.length; i++) {
            if (line.children[i] instanceof FootnoteElementBox) {
                footNoteCollection.push(line.children[i]);
            }
        }
    };
    Layout.prototype.updateWidgetsToTable = function (tableWidgets, rowWidgets, row, rearrangeRow, lineIndexInCell, cellIndex, isMultiColumnSplit) {
        var startRowIndex = row.bodyWidget.page.index;
        var rowHeight = this.getRowHeight(row, [row]);
        var viewer = this.viewer;
        //initializing row properties with default values.
        var isHeader = row.rowFormat.isHeader;
        var headerRow = undefined;
        var isAllowBreakAcrossPages = row.rowFormat.allowBreakAcrossPages;
        var heightType = row.rowFormat.heightType;
        var cellSpacing = 0;
        var count = 0;
        var tableRowWidget = row;
        var moveRowToNextTable = false;
        var footnoteElements = this.layoutedFootnoteElement;
        var isRepeatRowHeader = false;
        if (tableRowWidget.bodyWidget.page.footnoteWidget !== undefined) {
            this.footHeight = this.getFootNoteHeight(tableRowWidget.bodyWidget.page.footnoteWidget.bodyWidgets);
            if (this.footnoteHeight === 0) {
                this.footnoteHeight = this.footHeight;
            }
        }
        else {
            this.footHeight = 0;
        }
        if (row.ownerTable.continueHeader && !isHeader) {
            row.ownerTable.continueHeader = false;
        }
        var isInitialLayout = row.ownerTable.isInsideTable;
        var isLastRow = false;
        cellSpacing = (!isNullOrUndefined(row.ownerTable) && !isNullOrUndefined(row.ownerTable.tableFormat)) ? HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.cellSpacing) : 0;
        while (count < rowWidgets.length) {
            count = rowWidgets.length;
            if (this.isRowSpanEnd(row, viewer) && row.rowFormat.heightType === 'Exactly' && this.documentHelper.splittedCellWidgets.length === 1) {
                this.documentHelper.splittedCellWidgets = [];
            }
            if (!isMultiColumnSplit && (row.ownerTable.isInsideTable || (this.documentHelper.splittedCellWidgets.length === 0 && tableRowWidget.y + tableRowWidget.height + cellSpacing + this.footHeight <= viewer.clientArea.bottom))) {
                if (this.isVerticalMergedCellContinue(row) && (tableRowWidget.y === viewer.clientArea.y
                    || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight)) {
                    this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.index - 1);
                }
                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements, undefined, isInitialLayout, startRowIndex, isRepeatRowHeader);
                if (!isNullOrUndefined(row.bodyWidget) && row.bodyWidget instanceof BodyWidget && this.documentHelper.splittedCellWidgets.length > 0 && isNullOrUndefined(rowWidgets[rowWidgets.length - 1].nextRow)) {
                    count--;
                    isLastRow = true;
                    // If the entire split cell widget does not fit on the current page, we should consider splitting the row again. This is why we check that the next row is not the end of a row span, and we decrease the count value accordingly.
                }
                else if (!isNullOrUndefined(row.bodyWidget) && row.bodyWidget instanceof BodyWidget && this.documentHelper.splittedCellWidgets.length > 0 && !isNullOrUndefined(rowWidgets[rowWidgets.length - 1].nextRow) && !this.isRowSpanEnd(rowWidgets[rowWidgets.length - 1].nextRow, viewer)) {
                    count--;
                }
                isInitialLayout = false;
            }
            else {
                footnoteElements = [];
                isInitialLayout = false;
                //Split widget for next page
                if (this.documentHelper.splittedCellWidgets.length > 0 && tableRowWidget.y + tableRowWidget.height + this.footHeight <= viewer.clientArea.bottom) {
                    var isRowSpanEnd = this.isRowSpanEnd(row, viewer);
                    if (!isRowSpanEnd) {
                        if (this.isVerticalMergedCellContinue(row) && (tableRowWidget.y === viewer.clientArea.y
                            || tableRowWidget.y === this.viewer.clientArea.y + tableRowWidget.ownerTable.headerHeight)) {
                            // Bug 918606: If the row is not the end of a row span, we need to skip updating the row height based on the height of the split cell. Therefore, we have added an additional parameter to the method below.
                            this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.index - 1, true);
                            this.updateChildLocationForRow(tableRowWidget.y, tableRowWidget);
                        }
                        this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                        continue;
                    }
                }
                var splittedWidget = tableRowWidget;
                var tableWidget = tableWidgets[tableWidgets.length - 1];
                if (isMultiColumnSplit || rowHeight + tableRowWidget.y + this.footHeight > viewer.clientArea.bottom) {
                    if (!isAllowBreakAcrossPages || (isHeader && row.ownerTable.continueHeader) || (heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) < viewer.clientArea.bottom)) {
                        var isSplitRow = !isAllowBreakAcrossPages && isNullOrUndefined(tableRowWidget.previousWidget) && tableWidgets.length > 1;
                        if ((heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) < viewer.clientActiveArea.height && (isAllowBreakAcrossPages || isSplitRow)) || (heightType !== 'Exactly' && tableRowWidget.y === viewer.clientArea.y) || (heightType === 'Auto' && isAllowBreakAcrossPages)) {
                            splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, lineIndexInCell, cellIndex, isMultiColumnSplit);
                            if (isNullOrUndefined(splittedWidget) && tableRowWidget.y === viewer.clientArea.y) {
                                this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            }
                            else if (isNullOrUndefined(splittedWidget) && heightType === 'AtLeast' && tableRowWidget.containerWidget.lastChild !== tableRowWidget) {
                                splittedWidget = tableRowWidget;
                            }
                        }
                        // If the row height type is "At Least" and the row height is greater than the height of the client active area, the row will be moved to the next page. Therefore, it is necessary to add the `splittedCellWidget` to the current row.
                        else if (heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) > viewer.clientActiveArea.height && this.documentHelper.splittedCellWidgets.length > 0 && this.isRowSpanEnd(row, viewer)) {
                            this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.index - 1);
                        }
                        // if (heightType === 'AtLeast' && row.ownerTable.spannedRowCollection.keys.length > 0) {
                        //     splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow);
                        // }
                        // if (heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) > viewer.clientActiveArea.height && isAllowBreakAcrossPages && tableRowWidget.ownerTable.tableHolder.columns.length > this.getTotalColumnSpan(tableRowWidget)) {
                        //     tableRowWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow);
                        //     splittedWidget = tableRowWidget;
                        // }
                        if (heightType === 'Exactly' && tableRowWidget.y === viewer.clientArea.y) {
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            count++;
                        }
                        if (isHeader && row.ownerTable.continueHeader) {
                            row.ownerTable.header = false;
                            row.ownerTable.headerHeight = 0;
                            var pages = undefined;
                            if (viewer instanceof PageLayoutViewer) {
                                pages = this.documentHelper.pages;
                            }
                            if (!isNullOrUndefined(pages)) {
                                for (var i = 0; i < pages.length; i++) {
                                    if (pages[i].repeatHeaderRowTableWidget && !isNullOrUndefined(pages[i].bodyWidgets[0].firstChild) && !(pages[i].bodyWidgets[0].firstChild instanceof TableWidget && pages[i].bodyWidgets[0].firstChild.header)) {
                                        pages[i].repeatHeaderRowTableWidget = false;
                                        row.ownerTable.continueHeader = false;
                                    }
                                }
                            }
                        }
                    }
                    else {
                        if ((heightType === 'Auto' || heightType === 'AtLeast') && isAllowBreakAcrossPages) {
                            if (!(HelperMethods.convertPointToPixel(row.rowFormat.height) > viewer.clientArea.bottom) || tableRowWidget.y === viewer.clientArea.y) {
                                splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, lineIndexInCell, cellIndex, isMultiColumnSplit);
                                if (isNullOrUndefined(splittedWidget) && tableRowWidget.y === viewer.clientArea.y) {
                                    this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                }
                            }
                            else if (heightType === 'AtLeast' && HelperMethods.convertPointToPixel(row.rowFormat.height) > viewer.clientArea.bottom && tableRowWidget.ownerTable.wrapTextAround && tableRowWidget.y - HelperMethods.convertPointToPixel(tableRowWidget.ownerTable.positioning.verticalPosition) === viewer.clientArea.y && tableRowWidget.bodyWidget.firstChild === tableRowWidget.ownerTable) {
                                splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, lineIndexInCell, cellIndex, isMultiColumnSplit);
                                if (isNullOrUndefined(splittedWidget)) {
                                    this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                                    count++;
                                    continue;
                                }
                            }
                        }
                        else if (heightType === 'Exactly' && tableRowWidget.y === viewer.clientArea.y) {
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            count++;
                        }
                    }
                }
                else {
                    var isInsertSplittedWidgets = false;
                    var headerHeight = 0;
                    if (!isNullOrUndefined(tableRowWidget.ownerTable.headerHeight)) {
                        headerHeight = tableRowWidget.ownerTable.headerHeight;
                    }
                    // Splitting handled for the merged cell with allowRowBreakAcross pages. 
                    if (this.isVerticalMergedCellContinue(row) && (isAllowBreakAcrossPages ||
                        (isInsertSplittedWidgets = (tableRowWidget.y === viewer.clientArea.y
                            || tableRowWidget.y === this.viewer.clientArea.y + headerHeight)))) {
                        if (isInsertSplittedWidgets) {
                            this.insertSplittedCellWidgets(viewer, tableWidgets, splittedWidget, tableRowWidget.indexInOwner - 1);
                        }
                        else {
                            splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, undefined, undefined, undefined, true);
                            if (isNullOrUndefined(splittedWidget)) {
                                isInsertSplittedWidgets = (tableRowWidget.y === viewer.clientArea.y
                                    || tableRowWidget.y === this.viewer.clientArea.y + headerHeight);
                                if (isInsertSplittedWidgets) {
                                    this.insertSplittedCellWidgets(viewer, tableWidgets, tableRowWidget, tableRowWidget.indexInOwner - 1);
                                    count--;
                                    continue;
                                }
                                if (this.isRowSpanEnd(row, viewer)) {
                                    splittedWidget = tableRowWidget;
                                }
                            }
                        }
                    }
                    else if (isLastRow && !isAllowBreakAcrossPages) {
                        splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements);
                    }
                    else if (this.isRowSpanEnd(row, viewer) && !isAllowBreakAcrossPages) {
                        if (heightType === 'AtLeast' && row.ownerTable.spannedRowCollection.keys.length > 0)
                            splittedWidget = this.splitWidgets(tableRowWidget, viewer, tableWidgets, rowWidgets, splittedWidget, isLastRow, footnoteElements, lineIndexInCell, cellIndex, isMultiColumnSplit, true);
                        if (isNullOrUndefined(splittedWidget)) {
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                        }
                    }
                }
                //Create New table for splitted widget
                if (!isNullOrUndefined(splittedWidget) && (isNullOrUndefined(this.documentHelper.owner.editorModule) || this.documentHelper.owner.editorModule && !this.documentHelper.owner.editorModule.isTableInsert) && !(splittedWidget.bodyWidget.containerWidget instanceof FootNoteWidget)) {
                    if (splittedWidget !== tableRowWidget) {
                        this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements, tableRowWidget.nextRow, undefined, undefined, isRepeatRowHeader);
                        //Updates the fitted table rows to current page.
                        this.updateWidgetsToPage(tableWidgets, rowWidgets, row.ownerTable, rearrangeRow, tableRowWidget.nextRow);
                        var index_2 = tableWidgets.indexOf(tableRowWidget.containerWidget);
                        if (index_2 + 1 >= tableWidgets.length) {
                            //Creates new table widget for splitted rows.
                            this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                        }
                        tableRowWidget = splittedWidget;
                    }
                    else {
                        if (row.index > 0) {
                            //Updates the fitted table rows to current page.
                            this.updateWidgetsToPage(tableWidgets, rowWidgets, row.ownerTable, rearrangeRow, row);
                            // Need to update on this further
                            if (row.previousRenderedWidget instanceof TableRowWidget) {
                                // Need to update on this further
                                var prevWidget = row.previousRenderedWidget;
                                if (HelperMethods.round(tableRowWidget.y, 2) === HelperMethods.round(prevWidget.y + prevWidget.height, 2)) {
                                    var prevIndex = tableWidgets.indexOf(prevWidget.containerWidget);
                                    if (prevIndex + 1 >= tableWidgets.length) {
                                        //Creates new table widget for splitted rows.
                                        this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                                    }
                                }
                                else {
                                    //Creates new table widget for splitted rows.
                                    this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                                }
                            }
                            else {
                                //Creates new table widget for splitted rows.
                                this.addTableWidget(viewer.clientActiveArea, tableWidgets, true);
                            }
                        }
                        else if (heightType === 'Exactly' && rowHeight + tableRowWidget.y + this.footHeight < viewer.clientArea.bottom && tableRowWidget.y >= viewer.clientArea.y) {
                            this.addWidgetToTable(viewer, tableWidgets, rowWidgets, tableRowWidget, footnoteElements);
                            count++;
                            continue;
                        }
                        moveRowToNextTable = true;
                        count--;
                    }
                    tableWidget = tableWidgets[tableWidgets.length - 1];
                    var rowToMove = row;
                    var keepNext = false;
                    var index = row.ownerTable.containerWidget.index;
                    var isTableFirstRow = false;
                    var bodyWidget = void 0;
                    var block = void 0;
                    if (moveRowToNextTable && tableWidgets.length === 1) {
                        block = tableWidgets[tableWidgets.length - 1];
                    }
                    else {
                        block = tableWidgets[tableWidgets.length - 2];
                    }
                    var removeTable = true;
                    //Move Next RowWidge to next page
                    if (moveRowToNextTable && rowWidgets.length === 1) {
                        var prev = this.alignBlockElement(row);
                        if (!isNullOrUndefined(prev.node)) {
                            var previousRow = prev.node;
                            if (previousRow instanceof TableRowWidget
                                && previousRow.indexInOwner === 0) {
                                if (tableWidgets.length > 1 && tableWidgets[tableWidgets.length - 1].childWidgets.length === 0) {
                                    tableWidgets.pop();
                                    tableWidget = tableWidgets[tableWidgets.length - 1];
                                    tableWidget.height = 0;
                                }
                            }
                            else if (prev.node instanceof ParagraphWidget) {
                                var previousWidget = this.splitParagraph(prev.node, parseInt(prev.position.index, 10));
                                block = previousWidget;
                                if (tableWidgets.length > 1 && tableWidgets[tableWidgets.length - 1].childWidgets.length === 0) {
                                    tableWidgets.pop();
                                    tableWidget = tableWidgets[tableWidgets.length - 1];
                                }
                                removeTable = false;
                            }
                            if (previousRow instanceof TableRowWidget) {
                                isTableFirstRow = previousRow.indexInOwner === 0;
                                rowToMove = previousRow;
                                if (!rowToMove.ownerTable.equals(row.ownerTable)) {
                                    block = rowToMove.ownerTable;
                                    removeTable = false;
                                }
                            }
                            keepNext = true;
                        }
                    }
                    bodyWidget = this.moveBlocksToNextPage(block instanceof ParagraphWidget ? block.previousWidget :
                        (keepNext && isTableFirstRow) ? !isNullOrUndefined(block.previousWidget) ? block.previousWidget : block : block, keepNext, undefined, undefined, undefined, true);
                    var curretTable = tableWidgets[tableWidgets.length - 1];
                    //Move Next RowWidge to next page
                    if (moveRowToNextTable && removeTable) {
                        if (rowToMove.index === 0 && curretTable.containerWidget && curretTable.containerWidget.childWidgets.indexOf(curretTable) !== -1) {
                            curretTable.containerWidget.childWidgets.splice(curretTable.containerWidget.childWidgets.indexOf(curretTable), 1);
                        }
                    }
                    if (removeTable) {
                        if (bodyWidget.childWidgets.indexOf(curretTable) !== -1) {
                            bodyWidget.childWidgets.splice(bodyWidget.childWidgets.indexOf(curretTable), 1);
                        }
                        bodyWidget.childWidgets.unshift(curretTable);
                        this.shiftFloatingItemsFromTable(curretTable, bodyWidget);
                    }
                    curretTable.containerWidget = bodyWidget;
                    if (moveRowToNextTable && rowToMove.index > 0 || rowWidgets.length > 1) {
                        var currentRow = !moveRowToNextTable ? rowWidgets[rowWidgets.length - 2] : rowWidgets[rowWidgets.length - 1];
                        if (keepNext) {
                            currentRow = rowToMove;
                        }
                        this.moveNextWidgetsToTable(tableWidgets, currentRow, !moveRowToNextTable);
                        rowToMove = row;
                    }
                    if (keepNext) {
                        this.updateClientPositionForBlock(removeTable ? curretTable : block, row);
                    }
                    moveRowToNextTable = false;
                    var insertHeaderRow = false;
                    var bottom = this.documentHelper.viewer.clientArea.bottom - tableRowWidget.bottomBorderWidth - cellSpacing;
                    if (rowToMove.ownerTable.header) {
                        //Checks if the splitted row widget can fit in along with header row.
                        //Based on the result header row is repeated and infinite looping of not fitted state is avoided.
                        splittedWidget.x = splittedWidget.x;
                        splittedWidget.y = this.viewer.clientArea.y + tableWidget.headerHeight;
                        this.updateChildLocationForRow(splittedWidget.y, splittedWidget);
                        insertHeaderRow = this.isFirstLineFitForRow(bottom, splittedWidget);
                    }
                    if (insertHeaderRow && rowToMove.ownerTable.header && !keepNext) {
                        if (viewer instanceof PageLayoutViewer) {
                            bodyWidget.page.repeatHeaderRowTableWidget = true;
                            isRepeatRowHeader = true;
                        }
                        //Updates table widgets location.
                        viewer.updateClientAreaForBlock(rowToMove.ownerTable, true, tableWidgets);
                        //Update splitted row widget location. if header is repeated update the y position of splitted widget to header height.
                        splittedWidget.x = splittedWidget.x;
                        splittedWidget.y = tableWidget.y + rowToMove.ownerTable.headerHeight;
                        // let cellspace: number = viewer instanceof PageLayoutViewer ? cellspacing / 2 : cellspacing;
                        var cellspace = cellSpacing / 2;
                        this.updateChildLocationForRow(tableWidget.y + rowToMove.ownerTable.headerHeight - cellspace, splittedWidget, tableWidget.containerWidget);
                    }
                    else {
                        //Updates table widgets location.
                        viewer.updateClientAreaForBlock(rowToMove.ownerTable, true, tableWidgets);
                        //Update splitted row widget location. if header is repeated update the y position of splitted widget to header height.
                        if (splittedWidget.bodyWidget.sectionFormat.columns.length > 1) {
                            var clientArea = new Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
                            var clientActiveArea = new Rect(this.viewer.clientActiveArea.x, this.viewer.clientActiveArea.y, this.viewer.clientActiveArea.width, this.viewer.clientActiveArea.height);
                            splittedWidget.x = this.viewer.clientActiveArea.x;
                            splittedWidget.y = this.viewer.clientActiveArea.y;
                            var topMargin = this.getMaxTopCellMargin(splittedWidget);
                            var bottomMargin = this.getMaxBottomCellMargin(splittedWidget);
                            for (var i = 0; i < splittedWidget.childWidgets.length; i++) {
                                var cell = splittedWidget.childWidgets[i];
                                cell.height = 0;
                                this.addTableCellWidget(cell, this.viewer.clientActiveArea, topMargin + splittedWidget.topBorderWidth, bottomMargin + splittedWidget.bottomBorderWidth);
                                this.viewer.updateClientAreaForCell(cell, true);
                                for (var j = 0; j < cell.childWidgets.length; j++) {
                                    var block_2 = cell.childWidgets[j];
                                    viewer.updateClientAreaForBlock(block_2, true);
                                    block_2.containerWidget = cell;
                                    this.layoutBlock(block_2, 0);
                                    viewer.updateClientAreaForBlock(block_2, false);
                                }
                                this.viewer.updateClientAreaForCell(cell, false);
                            }
                            this.viewer.clientActiveArea = clientActiveArea;
                            this.viewer.clientArea = clientArea;
                        }
                        splittedWidget.x = splittedWidget.x;
                        splittedWidget.y = tableWidget.y;
                        // let cellspace: number = viewer instanceof PageLayoutViewer ? cellspacing / 2 : cellspacing;
                        var cellspace = cellSpacing / 2;
                        this.updateChildLocationForRow(tableWidget.y - cellspace, splittedWidget, tableWidget.containerWidget, true);
                    }
                    if (removeTable && this.shiftedFloatingItemsFromTable.length > 0) {
                        for (var i = 0; i < this.shiftedFloatingItemsFromTable.length; i++) {
                            var floatingItem = this.shiftedFloatingItemsFromTable[i];
                            var position = this.getFloatingItemPoints(floatingItem);
                            floatingItem.y = position.y;
                            floatingItem.x = position.x;
                            if (floatingItem instanceof ShapeElementBox) {
                                this.updateChildLocationForCellOrShape(floatingItem.y, floatingItem);
                            }
                        }
                        this.shiftedFloatingItemsFromTable = [];
                    }
                }
                isLastRow = false;
            }
            if (isHeader) {
                if (row.ownerTable.continueHeader) {
                    row.ownerTable.header = true;
                    row.ownerTable.headerHeight = rowHeight + row.ownerTable.headerHeight;
                }
                headerRow = this.getHeader(row.ownerTable);
                if (!isNullOrUndefined(headerRow) && row.index === headerRow.index) {
                    var headerHeight = this.getHeaderHeight(row.ownerTable, row, rowWidgets);
                    if (headerHeight > row.ownerTable.headerHeight || headerHeight > row.ownerTable.headerHeight) {
                        row.ownerTable.headerHeight = headerHeight;
                    }
                    if (row.ownerTable.headerHeight > viewer.clientArea.height) {
                        row.ownerTable.header = false;
                        row.ownerTable.continueHeader = false;
                        row.ownerTable.headerHeight = 0;
                        var pages = this.documentHelper.pages;
                        for (var i = 0; i < pages.length; i++) {
                            if (pages[i].repeatHeaderRowTableWidget) {
                                pages[i].repeatHeaderRowTableWidget = false;
                            }
                        }
                    }
                }
            }
            isMultiColumnSplit = false;
            if (tableWidgets.length > 2 && row.ownerTable.header && tableRowWidget.height < viewer.clientActiveArea.bottom &&
                !viewer.documentHelper.currentRenderingPage.repeatHeaderRowTableWidget) {
                viewer.documentHelper.currentRenderingPage.repeatHeaderRowTableWidget = true;
            }
        }
    };
    Layout.prototype.getHeader = function (table) {
        var header = undefined;
        var flag = true;
        table = table.getSplitWidgets()[0];
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row.rowFormat.isHeader) {
                header = row;
            }
            else {
                flag = false;
            }
            if (!flag) {
                break;
            }
        }
        return header;
    };
    Layout.prototype.getHeaderHeight = function (ownerTable, row, rowCollection) {
        var height = 0;
        if (row.ownerTable.childWidgets.length > 0 && ownerTable.childWidgets[0].rowFormat.isHeader) {
            for (var i = 0; i < ownerTable.childWidgets.length; i++) {
                var row_1 = ownerTable.childWidgets[i];
                if (row_1.rowFormat.isHeader) {
                    height = height + row_1.height;
                }
                else {
                    break;
                }
            }
        }
        return height;
    };
    Layout.prototype.getHeaderHeightForSpannedRow = function (table) {
        var height = 0;
        var rowSpan = 1;
        var headerRow = this.getHeader(table);
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row.rowFormat.isHeader) {
                height = height + row.height;
                if (row == headerRow) {
                    for (var j = 0; j < headerRow.childWidgets.length; j++) {
                        var cell = headerRow.childWidgets[j];
                        rowSpan = Math.max(rowSpan, cell.cellFormat.rowSpan);
                    }
                    if (rowSpan > 1 && i + rowSpan < table.childWidgets.length) {
                        for (var k = 1; k < rowSpan; k++) {
                            var nextRow = table.childWidgets[i + k];
                            if (!isNullOrUndefined(nextRow)) {
                                height = height + nextRow.height;
                            }
                        }
                    }
                }
            }
        }
        return height;
    };
    Layout.prototype.updateWidgetToRow = function (cell) {
        //const viewer: LayoutViewer = this.viewer;
        //Adds table cell widget to owner row widget.
        var rowWidget = cell.ownerRow;
        // let cellLeft: number = rowWidget.x;
        // if (rowWidget.childWidgets.length > 0) {
        //     const lastWidget: TableCellWidget = rowWidget.childWidgets[rowWidget.childWidgets.length - 1] as TableCellWidget;
        //     cellLeft = lastWidget.x + lastWidget.width + lastWidget.margin.right;
        // }
        // rowWidget.childWidgets.push(cell);
        cell.containerWidget = rowWidget;
        //If the row height is set as Atleast then height is set to atleast height for the first cell of the row.
        if (!isNullOrUndefined(cell.ownerRow) && cell.ownerRow.rowFormat.heightType !== 'Exactly' && HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.height) > 0 && cell.cellIndex === 0) {
            rowWidget.height = rowWidget.height + HelperMethods.convertPointToPixel(cell.ownerRow.rowFormat.height);
        }
        //Add condition not cell merged vertically.
        if (cell.cellFormat.rowSpan === 1) {
            var cellHeight = void 0;
            if (rowWidget.rowFormat.heightType === 'Exactly') {
                cellHeight = cell.height + cell.margin.bottom;
            }
            else {
                cellHeight = cell.height + cell.margin.top + cell.margin.bottom;
            }
            if (rowWidget.height - HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing) < cellHeight) {
                rowWidget.height = cellHeight + HelperMethods.convertPointToPixel(cell.ownerTable.tableFormat.cellSpacing);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.updateHeightForRowWidget = function (viewer, isUpdateVerticalPosition, tableCollection, rowCollection, rowWidget, isLayouted, endRowWidget, isInitialLayout) {
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var cellspacing = 0;
            var cellWidget = undefined;
            var childWidget = rowWidget.childWidgets[i];
            // if (childWidget instanceof TableCellWidget) {
            cellWidget = childWidget;
            // }
            var rowSpan = 1;
            rowSpan = cellWidget.cellFormat.rowSpan;
            cellspacing = HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableFormat.cellSpacing);
            if (rowSpan > 1) {
                var currentRowWidgetIndex = rowWidget.containerWidget.childWidgets.indexOf(rowWidget);
                var rowSpanWidgetEndIndex = currentRowWidgetIndex + rowSpan - 1 - (rowWidget.index - cellWidget.rowIndex);
                if (!isInitialLayout && (viewer.clientArea.bottom < cellWidget.y + cellWidget.height + cellWidget.margin.bottom
                    || rowSpanWidgetEndIndex >= currentRowWidgetIndex + 1) && (rowCollection.length === 1
                    || rowCollection.length >= 1 && rowWidget === rowCollection[rowCollection.length - 1])) {
                    var footHeight = this.footHeight;
                    this.footHeight = this.existFootnoteHeight = !isNullOrUndefined(rowWidget.bodyWidget.page.footnoteWidget)
                        ? rowWidget.bodyWidget.page.footnoteWidget.height : 0;
                    this.splitSpannedCellWidget(cellWidget, tableCollection, rowCollection, viewer);
                    this.footHeight = this.existFootnoteHeight = footHeight;
                }
                var spanEndRowWidget = rowWidget;
                if (rowSpanWidgetEndIndex > 0) {
                    if (rowSpanWidgetEndIndex < rowWidget.containerWidget.childWidgets.length) {
                        var childWidget_1 = rowWidget.containerWidget.childWidgets[rowSpanWidgetEndIndex];
                        if (childWidget_1 instanceof TableRowWidget) {
                            spanEndRowWidget = childWidget_1;
                            if (spanEndRowWidget === endRowWidget) {
                                spanEndRowWidget = rowWidget;
                            }
                        }
                    }
                    else {
                        /* eslint-disable-next-line max-len */
                        spanEndRowWidget = rowWidget.containerWidget.childWidgets[rowWidget.containerWidget.childWidgets.length - 1];
                    }
                }
                if (cellWidget.y + cellWidget.height + cellWidget.margin.bottom < spanEndRowWidget.y + spanEndRowWidget.height) {
                    cellWidget.height = spanEndRowWidget.y + spanEndRowWidget.height - spanEndRowWidget.bottomBorderWidth - cellWidget.y - cellWidget.margin.bottom;
                    /* eslint-disable-next-line max-len */
                }
                else if (isLayouted && spanEndRowWidget && (spanEndRowWidget.y !== 0 && spanEndRowWidget.height !== 0) && cellWidget.y + cellWidget.height + cellWidget.margin.bottom > spanEndRowWidget.y + spanEndRowWidget.height) {
                    if (spanEndRowWidget.rowFormat.heightType !== 'Exactly' || (spanEndRowWidget.rowFormat.heightType === 'Exactly' && spanEndRowWidget.rowFormat.height > cellWidget.y + cellWidget.height + cellWidget.margin.bottom - spanEndRowWidget.y)) {
                        spanEndRowWidget.height = cellWidget.y + cellWidget.height + cellWidget.margin.bottom - spanEndRowWidget.y;
                    }
                    else {
                        cellWidget.height = (spanEndRowWidget.y - cellWidget.y) + spanEndRowWidget.height;
                    }
                    //Update the next rowlayout widget location. Reason for the updation is previous row height is updated when cell height is greater. So already layouted next row location has to be updated again.
                    // if (rowWidget === spanEndRowWidget && rowWidget.nextWidget instanceof TableRowWidget) {
                    //     let nextRow: TableRowWidget = rowWidget.nextWidget as TableRowWidget;
                    //     // Need to update on this further
                    //     // if (viewer.renderedElements.containsKey(nextRow)) {
                    //     //     let nextWidget: TableRowWidget[] = viewer.renderedElements.get(nextRow) as TableRowWidget[];
                    //     //     if (nextWidget.length > 0) {
                    //     //         nextWidget[0].x = nextWidget[0].x;
                    //     //         nextWidget[0].y = rowWidget.y + rowWidget.height;
                    //     //     }
                    //     // }
                    // }
                }
            }
            else {
                if (cellspacing > 0) {
                    // In the Case of tableWidget is greater than one and rowWidget is start at the Top Position of the page.
                    // In such case we have update the cell height with half of cell spacing.
                    // Remaining cases we have to update the entire hight
                    if (tableCollection.length > 1 && rowWidget.y === viewer.clientArea.y && viewer instanceof PageLayoutViewer) {
                        cellspacing = cellspacing / 2;
                    }
                }
                cellWidget.height = rowWidget.height - cellWidget.margin.top - cellWidget.margin.bottom - cellspacing;
            }
            this.updateHeightForCellWidget(viewer, tableCollection, rowCollection, cellWidget);
            var widget = rowWidget.containerWidget;
            while (widget.containerWidget instanceof Widget) {
                widget = widget.containerWidget;
            }
            var page = undefined;
            if (widget instanceof BodyWidget) {
                page = widget.page;
            }
            /* eslint-disable-next-line max-len */
            if ((viewer instanceof PageLayoutViewer && viewer.visiblePages.indexOf(page) !== -1) || isUpdateVerticalPosition) {
                this.updateCellVerticalPosition(cellWidget, false, cellWidget.ownerTable.isInsideTable);
            }
            //Renders the current table row contents, after relayout based on editing.
            // if (viewer instanceof PageLayoutViewer && (viewer as PageLayoutViewer).visiblePages.indexOf(page) !== -1) {
            //     //Added proper undefined condition check for Asynchronous operation.
            //     if (!isNullOrUndefined(rowWidget.tableRow) && !isNullOrUndefined(rowWidget.tableRow.rowFormat)) {
            //         this.viewer.updateScrollBars();
            //         //this.render.renderTableCellWidget(page, cellWidget);
            //     }
            // }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.updateHeightForCellWidget = function (viewer, tableWidget, rowCollection, cellWidget) {
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof TableWidget) {
                this.updateHeightForTableWidget(tableWidget, rowCollection, cellWidget.childWidgets[i]);
            }
        }
    };
    Layout.prototype.getRowHeight = function (row, rowCollection) {
        var height = 0;
        if (row.rowFormat.heightType === 'Exactly') {
            height = row.rowFormat.height;
        }
        else {
            for (var i = 0; i < rowCollection.length; i++) {
                if (rowCollection[i] instanceof TableRowWidget) {
                    height = rowCollection[i].height + height;
                }
            }
            height = Math.max(height, row.rowFormat.height);
        }
        return height;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.splitSpannedCellWidget = function (cellWidget, tableCollection, rowCollection, viewer) {
        /* eslint-disable-next-line max-len */
        var splittedCell = this.getSplittedWidget(viewer.clientArea.bottom, false, tableCollection, rowCollection, cellWidget, undefined, undefined, undefined, undefined, true);
        if (!isNullOrUndefined(splittedCell)) {
            //Adds the splitted contents of a vertical merged cell, in order preserve in next page.
            this.documentHelper.splittedCellWidgets.push(splittedCell);
            splittedCell.isSplittedCell = true;
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.insertSplittedCellWidgets = function (viewer, tableCollection, rowWidget, previousRowIndex, isSkipUpdateHeight) {
        if (!isNullOrUndefined(rowWidget)) {
            var left = rowWidget.x;
            var tableWidth = 0;
            var cellspace = 0;
            var linestyle = false;
            tableWidth = HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableHolder.tableWidth);
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                var cellWidget = rowWidget.childWidgets[i];
                var isRightStyleNone = (cellWidget.cellFormat.borders.right.lineStyle === 'None');
                cellspace = !isNullOrUndefined(cellWidget.ownerTable) && !isNullOrUndefined(cellWidget.ownerTable.tableFormat) ? HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableFormat.cellSpacing) : 0;
                if (Math.round(left) < Math.round(cellWidget.x - cellWidget.margin.left - cellspace)) {
                    if (this.insertRowSpannedWidget(rowWidget, viewer, left, i, isSkipUpdateHeight)) {
                        i--;
                        continue;
                    }
                    // Bug 871725: Empty cell widget must be inserted if the table split into next page.
                    if (tableCollection.length === 1 && this.documentHelper.splittedCellWidgets.length === 0) {
                        break;
                    }
                    var length_1 = rowWidget.childWidgets.length;
                    this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, i, previousRowIndex);
                    if (length_1 < rowWidget.childWidgets.length) {
                        i--;
                        continue;
                    }
                }
                left += cellWidget.margin.left + cellWidget.width + cellWidget.margin.right;
                if (cellspace > 0 || cellWidget.columnIndex === cellWidget.ownerTable.tableHolder.columns.length - 1 ||
                    cellWidget.index === cellWidget.containerWidget.childWidgets.length - 1) {
                    if (!cellWidget.ownerTable.tableFormat.allowAutoFit) {
                        var leftBorderWidth = HelperMethods.convertPointToPixel(TableCellWidget.getCellLeftBorder(cellWidget).getLineWidth());
                        var rightBorderWidth = HelperMethods.convertPointToPixel(TableCellWidget.getCellRightBorder(cellWidget).getLineWidth());
                        cellWidget.rightBorderWidth = !cellWidget.ownerTable.isBidiTable ? rightBorderWidth : leftBorderWidth;
                        left += cellWidget.rightBorderWidth;
                    }
                    if (!this.isInsertTable()) {
                        linestyle = this.checkPreviousMargins(cellWidget.ownerTable);
                    }
                }
                left -= (isRightStyleNone && !linestyle) ? 0 : (cellWidget.rightBorderWidth);
                if (i === rowWidget.childWidgets.length - 1 && Math.round(left) < Math.round(rowWidget.x + tableWidth)) {
                    if (this.insertRowSpannedWidget(rowWidget, viewer, left, i + 1)) {
                        continue;
                    }
                    this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, i + 1, previousRowIndex);
                    continue;
                }
            }
            // Special case: when the child widgets of row is equal to 0 then the splitted widgets in the viewer is added in the table row widgets.
            /* eslint-disable-next-line max-len */
            if ((isNullOrUndefined(rowWidget.childWidgets) || rowWidget.childWidgets.length === 0) && this.documentHelper.splittedCellWidgets.length > 0) {
                for (var j = 0; j < this.documentHelper.splittedCellWidgets.length; j++) {
                    var widget = this.documentHelper.splittedCellWidgets[j];
                    if (Math.round(left) <= Math.round(widget.x - widget.margin.left)) {
                        if (this.insertRowSpannedWidget(rowWidget, viewer, left, j)) {
                            j--;
                            continue;
                        }
                        var count = rowWidget.childWidgets.length;
                        this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, j, previousRowIndex);
                        if (count < rowWidget.childWidgets.length) {
                            j--;
                            continue;
                        }
                    }
                    left += widget.margin.left + widget.width + widget.margin.right;
                    if (j === rowWidget.childWidgets.length - 1 && Math.round(left) <
                        Math.round(rowWidget.x + tableWidth)) {
                        if (this.insertRowSpannedWidget(rowWidget, viewer, left, j + 1)) {
                            continue;
                        }
                        this.insertEmptySplittedCellWidget(rowWidget, tableCollection, left, j + 1, previousRowIndex);
                        continue;
                    }
                }
            }
            if (this.documentHelper.splittedCellWidgets.length > 0) {
                this.documentHelper.splittedCellWidgets = [];
            }
        }
    };
    Layout.prototype.insertRowSpannedWidget = function (rowWidget, viewer, left, index, isSkipUpdateHeight) {
        var cellSpacing = 0;
        if (rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
            cellSpacing = HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
        }
        for (var i = 0; i < this.documentHelper.splittedCellWidgets.length; i++) {
            var splittedCell = this.documentHelper.splittedCellWidgets[i];
            if (Math.round(left) === Math.round(splittedCell.x - splittedCell.margin.left)) {
                rowWidget.childWidgets.splice(index, 0, splittedCell);
                splittedCell.containerWidget = rowWidget;
                if (!isSkipUpdateHeight && splittedCell.height > rowWidget.height) {
                    rowWidget.height = splittedCell.height;
                }
                //If the splitted cell location differs from expected location update the location of row child widgets.
                if (splittedCell.y !== rowWidget.y + splittedCell.margin.top + cellSpacing) {
                    this.updateChildLocationForRow(rowWidget.y, rowWidget);
                }
                this.documentHelper.splittedCellWidgets.splice(i, 1);
                return true;
            }
        }
        return false;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.insertEmptySplittedCellWidget = function (currentRow, tableCollection, left, index, previousRowIndex) {
        var tableWidget = tableCollection[tableCollection.length - 1];
        var previousRow;
        for (var j = tableCollection.length - 1; j >= 0; j--) {
            var table = tableCollection[j];
            for (var z = table.childWidgets.length - 1; z >= 0; z--) {
                var row = table.childWidgets[z];
                if (row.index === previousRowIndex) {
                    previousRow = row;
                    break;
                }
            }
        }
        if (previousRow) {
            tableWidget = previousRow.ownerTable;
            previousRowIndex = previousRow.indexInOwner;
        }
        for (var i = previousRowIndex; i >= 0; i--) {
            var rowWidget = tableWidget.childWidgets[i];
            var previousLeft = rowWidget.x;
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                var rowSpan = 1;
                var cellWidget = rowWidget.childWidgets[j];
                var cellspace = !isNullOrUndefined(cellWidget.ownerTable) && !isNullOrUndefined(cellWidget.ownerTable.tableFormat) ? HelperMethods.convertPointToPixel(cellWidget.ownerTable.tableFormat.cellSpacing) : 0;
                if (Math.round(previousLeft) !== Math.round(cellWidget.x - cellWidget.margin.left - cellspace)) {
                    previousLeft = (cellWidget.x - cellWidget.margin.left - cellspace);
                }
                if (Math.round(left) === Math.round(previousLeft)) {
                    rowSpan = (isNullOrUndefined(cellWidget) || isNullOrUndefined(cellWidget.cellFormat)) ? rowSpan :
                        cellWidget.cellFormat.rowSpan;
                    if (rowSpan > 1 && (rowWidget.firstChild.columnIndex === 0)
                        && !this.isColumnExistsInCurrentRow(currentRow, cellWidget.columnIndex)) {
                        if (this.isVerticalMergedCellContinue(currentRow) && currentRow.rowFormat.heightType !== "Exactly" && !isNullOrUndefined(currentRow.previousRenderedWidget) && currentRow.previousRenderedWidget instanceof TableRowWidget && currentRow.previousRenderedWidget.y + currentRow.previousRenderedWidget.height < cellWidget.y + cellWidget.height) {
                            this.isRelayoutneed = true;
                            var splittedCell = this.getSplittedWidget(currentRow.previousRenderedWidget.y + currentRow.previousRenderedWidget.height, true, tableCollection, undefined, cellWidget, undefined, undefined, undefined, undefined, true);
                            this.isRelayoutneed = false;
                            currentRow.childWidgets.splice(index, 0, splittedCell);
                            splittedCell.containerWidget = currentRow;
                            this.updateChildLocationForRow(currentRow.y, currentRow);
                            return;
                        }
                        else {
                            //if (!isNullOrUndefined(currentRow.childWidgets[index])) {
                            var emptyCellWidget = this.createCellWidget(cellWidget);
                            //if (emptyCellWidget.x < (currentRow.childWidgets[index] as TableCellWidget).x) {
                            currentRow.childWidgets.splice(index, 0, emptyCellWidget);
                            emptyCellWidget.containerWidget = currentRow;
                            this.updateChildLocationForRow(currentRow.y, currentRow);
                            return;
                        }
                        //}
                        //}
                    }
                }
                previousLeft += cellWidget.margin.left + cellWidget.width + cellWidget.margin.right;
            }
        }
    };
    Layout.prototype.isColumnExistsInCurrentRow = function (row, columnIndex) {
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cellWidget = row.childWidgets[i];
            if (cellWidget.columnIndex === columnIndex) {
                return true;
            }
        }
        return false;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.getSplittedWidget = function (bottom, splitMinimalWidget, tableCollection, rowCollection, cellWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, nestedCount, splitSpannedCellWidget) {
        var splittedWidget = undefined;
        var footnoteHeight = 0;
        if (isMultiColumnSplit || cellWidget.y + cellWidget.height > bottom - this.footHeight - cellWidget.margin.bottom) {
            var count = 0;
            if (cellWidget.ownerTable.isInsideTable) {
                count = nestedCount;
            }
            var isCellSplit = false;
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                    var paragraphWidget = cellWidget.childWidgets[i];
                    var splittedPara = paragraphWidget;
                    if (!isCellSplit) {
                        splittedPara = this.getSplittedWidgetForPara(bottom - cellWidget.margin.bottom, paragraphWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count);
                    }
                    if (isMultiColumnSplit) {
                        count = count + paragraphWidget.childWidgets.length;
                    }
                    if (!isNullOrUndefined(splittedPara)) {
                        isCellSplit = true;
                        if (i === 0 && splittedPara === paragraphWidget && !splitSpannedCellWidget) {
                            //Returns if the whole content of the cell does not fit in current page.
                            return cellWidget;
                        }
                        if (cellWidget.childWidgets.indexOf(splittedPara) !== -1) {
                            cellWidget.childWidgets.splice(cellWidget.childWidgets.indexOf(splittedPara), 1);
                            i--;
                        }
                        cellWidget.height -= splittedPara.height;
                        if (isNullOrUndefined(splittedWidget)) {
                            //Creates new widget, to hold the splitted contents.
                            splittedWidget = this.createCellWidget(cellWidget);
                        }
                        splittedWidget.height += splittedPara.height;
                        splittedWidget.childWidgets.push(splittedPara);
                        splittedPara.containerWidget = splittedWidget;
                    }
                }
                else {
                    var tableWidget = cellWidget.childWidgets[i];
                    var tableCol = [tableWidget];
                    var nextFootHeight = 0;
                    if (!isNullOrUndefined(tableWidget.footnoteElement)) {
                        for (var j = 0; j < tableWidget.footnoteElement.length; j++) {
                            nextFootHeight += this.getFootNoteHeight(tableWidget.footnoteElement[j].bodyWidget);
                        }
                    }
                    var existFootnoteHeight = this.existFootnoteHeight + nextFootHeight;
                    if (!isNullOrUndefined(footNoteCollection)) {
                        for (var j = 0; j < footNoteCollection.length; j++) {
                            existFootnoteHeight += this.getFootNoteHeight(footNoteCollection[j].bodyWidget);
                        }
                    }
                    //Check for nested table.
                    if (isMultiColumnSplit || bottom - cellWidget.margin.bottom < tableWidget.y + tableWidget.height + existFootnoteHeight) {
                        var tableHeight = tableWidget.height;
                        /* eslint-disable-next-line max-len */
                        var splittedTable = void 0;
                        if (isCellSplit) {
                            splittedTable = tableWidget;
                        }
                        else {
                            splittedTable = this.getSplittedWidgetForTable(bottom - cellWidget.margin.bottom, tableCol, tableWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count);
                        }
                        if (isNullOrUndefined(splittedTable) &&
                            !(tableWidget.childWidgets[0].rowFormat.allowBreakAcrossPages)) {
                            splittedTable = tableWidget;
                        }
                        if (!isNullOrUndefined(splittedTable)) {
                            if (i === 0 && splittedTable === tableWidget) {
                                //Returns if the whole table does not fit in current page.
                                return cellWidget;
                            }
                            if (cellWidget.childWidgets.indexOf(splittedTable) !== -1) {
                                cellWidget.childWidgets.splice(cellWidget.childWidgets.indexOf(splittedTable), 1);
                                i--;
                                cellWidget.height -= splittedTable.height;
                            }
                            else {
                                cellWidget.height -= tableHeight - tableWidget.height;
                            }
                            if (isNullOrUndefined(splittedWidget)) {
                                //Creates new widget, to hold the splitted contents.
                                splittedWidget = this.createCellWidget(cellWidget);
                            }
                            splittedWidget.height += splittedTable.height;
                            splittedWidget.childWidgets.push(splittedTable);
                            splittedTable.containerWidget = splittedWidget;
                        }
                    }
                    else if (tableWidget.footnoteElement.length > 0) {
                        for (var j = 0; j < tableWidget.footnoteElement.length; j++) {
                            footNoteCollection.push(tableWidget.footnoteElement[j]);
                        }
                    }
                }
            }
        }
        else {
            this.updateFootHeight(cellWidget, footNoteCollection);
        }
        if (isNullOrUndefined(splittedWidget) && splitMinimalWidget && this.isRelayoutneed) {
            //Creates new widget, to hold the splitted contents.
            splittedWidget = this.createCellWidget(cellWidget);
        }
        return splittedWidget;
    };
    Layout.prototype.getNextFootNoteHeight = function (cell, currentPosition) {
        var height = 0;
        if (!isNullOrUndefined(cell.ownerTable.footnoteElement) && cell.ownerTable.footnoteElement.length > 0) {
            for (var i = cell.indexInOwner + 1; i < cell.ownerRow.childWidgets.length; i++) {
                var currentCell = cell.ownerRow.childWidgets[i];
                for (var j = 0; j < currentCell.childWidgets.length; j++) {
                    if (currentCell.childWidgets[j] instanceof ParagraphWidget) {
                        height += this.getFootHeightFromPara(currentCell.childWidgets[j], currentPosition);
                    }
                    else if (currentCell.childWidgets[j] instanceof TableWidget) {
                        var table = currentCell.childWidgets[j];
                        height += this.getFootHeightFromTable(table, currentPosition);
                    }
                }
            }
            if (cell.ownerTable.isInsideTable) {
                height += this.getNextFootNoteHeight(cell.ownerTable.containerWidget, currentPosition);
            }
        }
        return height;
    };
    Layout.prototype.getFootHeightFromTable = function (table, currentPosition) {
        var height = 0;
        for (var k = 0; k < table.childWidgets.length; k++) {
            var row = table.childWidgets[k];
            for (var m = 0; m < row.childWidgets.length; m++) {
                var cell = row.childWidgets[m];
                for (var n = 0; n < cell.childWidgets.length; n++) {
                    if (cell.childWidgets[n] instanceof ParagraphWidget) {
                        height += this.getFootHeightFromPara(cell.childWidgets[n], currentPosition);
                    }
                    else if (cell.childWidgets[n] instanceof TableWidget) {
                        height += this.getFootHeightFromTable(cell.childWidgets[n], currentPosition);
                    }
                }
            }
        }
        return height;
    };
    Layout.prototype.getFootHeightFromPara = function (blockWidget, currentPosition) {
        var height = 0;
        for (var k = 0; k < blockWidget.childWidgets.length; k++) {
            var lineWidget = blockWidget.childWidgets[k];
            var footHeight = this.getFootNoteHeightInLine(lineWidget);
            if (currentPosition > lineWidget.height + blockWidget.y) {
                height += footHeight;
            }
        }
        return height;
    };
    Layout.prototype.updateFootHeight = function (cellWidget, footNoteCollection) {
        if (!isNullOrUndefined(footNoteCollection)) {
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                    var paragraphWidget = cellWidget.childWidgets[i];
                    for (var j = 0; j < paragraphWidget.childWidgets.length; j++) {
                        this.getFootnoteFromLine(paragraphWidget.childWidgets[j], footNoteCollection);
                    }
                }
                else if (cellWidget.childWidgets[i] instanceof TableWidget) {
                    this.updateFootHeightForTable(cellWidget.childWidgets[i], footNoteCollection);
                }
            }
        }
    };
    Layout.prototype.updateFootHeightForTable = function (table, footNoteCollection) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var rowWidget = table.childWidgets[i];
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                var cellWidget = rowWidget.childWidgets[j];
                this.updateFootHeight(cellWidget, footNoteCollection);
            }
        }
    };
    Layout.prototype.getListLevelPattern = function (value) {
        switch (value) {
            case 0:
                return 'Arabic';
            case 1:
                return 'LowLetter';
            case 2:
                return 'LowRoman';
            case 3:
                return 'UpLetter';
            case 4:
                return 'UpRoman';
            case 5:
                return 'Ordinal';
            case 6:
                return 'Number';
            case 7:
                return 'OrdinalText';
            case 8:
                return 'LeadingZero';
            case 9:
                return 'Bullet';
            case 10:
                return 'FarEast';
            case 11:
                return 'Special';
            default:
                return 'None';
        }
    };
    Layout.prototype.createCellWidget = function (cell) {
        var cellWidget = new TableCellWidget();
        cellWidget.cellFormat = cell.cellFormat;
        cellWidget.index = cell.index;
        cellWidget.rowIndex = cell.rowIndex;
        cellWidget.columnIndex = cell.columnIndex;
        cellWidget.containerWidget = cell.containerWidget;
        this.updateWidgetLocation(cell, cellWidget);
        cellWidget.margin = cell.margin;
        cellWidget.leftBorderWidth = cell.leftBorderWidth;
        cellWidget.rightBorderWidth = cell.rightBorderWidth;
        return cellWidget;
    };
    Layout.prototype.createTableWidget = function (table) {
        var newTable = new TableWidget();
        if (table.header) {
            newTable.header = table.header;
            var height = this.getHeaderHeightForSpannedRow(table);
            newTable.headerHeight = height > table.headerHeight ? height : table.headerHeight;
        }
        newTable.index = table.index;
        newTable.tableFormat = table.tableFormat;
        newTable.tableHolder = table.tableHolder;
        newTable.footnoteElement = table.footnoteElement;
        newTable.isGridUpdated = table.isGridUpdated;
        newTable.wrapTextAround = table.wrapTextAround;
        newTable.positioning = table.positioning;
        newTable.isContainInsideTable = table.isContainInsideTable;
        newTable.isBidiTable = table.isBidiTable;
        return newTable;
    };
    Layout.prototype.getSplittedWidgetForPara = function (bottom, paragraphWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count) {
        var lineBottom = paragraphWidget.y;
        var splittedWidget = undefined;
        var moveEntireBlock = false;
        var isSplitParagraph = false;
        var lineWidgetHeight = 0;
        for (var i = 0; i < paragraphWidget.childWidgets.length; i++) {
            var nextFootHeight = this.getNextFootNoteHeight(paragraphWidget.containerWidget, paragraphWidget.y + lineWidgetHeight);
            var lineWidget = paragraphWidget.childWidgets[i];
            var height = this.getFootNoteHeightInLine(lineWidget);
            height += this.existFootnoteHeight + nextFootHeight;
            if (!isNullOrUndefined(footNoteCollection)) {
                for (var j = 0; j < footNoteCollection.length; j++) {
                    height += this.getFootNoteHeight(footNoteCollection[j].bodyWidget);
                }
            }
            var lineHeight = 0;
            if (lineWidget.children[0] instanceof ShapeBase) {
                lineHeight = lineWidget.children[0].height;
            }
            else {
                lineHeight = lineWidget.height;
            }
            lineWidgetHeight += lineHeight;
            if ((isMultiColumnSplit && count >= lineIndexInCell) || bottom < lineBottom + height + lineHeight) {
                if (paragraphWidget.paragraphFormat.keepLinesTogether && (paragraphWidget.index !== 0 ||
                    (paragraphWidget.index === 0 && !isNullOrUndefined(paragraphWidget.associatedCell.ownerRow.previousWidget)))) {
                    moveEntireBlock = true;
                    i = 0;
                    lineWidget = paragraphWidget.childWidgets[0];
                }
                else if (paragraphWidget.paragraphFormat.widowControl) {
                    if (!isNullOrUndefined(paragraphWidget.associatedCell) && i === 1 && bottom < lineBottom + lineHeight && !isSplitParagraph) {
                        var rowWidget = paragraphWidget.associatedCell.ownerRow;
                        var table = rowWidget.containerWidget;
                        var remLineHeight = paragraphWidget.height - paragraphWidget.childWidgets[0].height;
                        var isFirstitemInPage = ((table.indexInOwner <= 0 && paragraphWidget.associatedCell.ownerRow.indexInOwner <= 0
                            && (paragraphWidget.indexInOwner <= 0 || remLineHeight > bottom)) || this.documentHelper.compatibilityMode !== 'Word2013') ? true : false;
                        if (!isFirstitemInPage) {
                            return paragraphWidget;
                        }
                        else {
                            isSplitParagraph = true;
                        }
                    }
                    if (i === 1 && !isSplitParagraph) {
                        moveEntireBlock = true;
                        i = 0;
                        lineWidget = paragraphWidget.childWidgets[0];
                    }
                }
                if (i === 0) {
                    if (lineWidget.paragraph.containerWidget instanceof TableCellWidget && !moveEntireBlock && !isMultiColumnSplit) {
                        // checks first line of the page is exceed the page height
                        if (paragraphWidget.indexInOwner === 0 && lineBottom + lineHeight > bottom &&
                            lineWidget.paragraph.associatedCell.ownerRow.y === this.viewer.clientArea.y) {
                            lineBottom += lineWidget.height;
                            continue;
                        }
                    }
                    splittedWidget = paragraphWidget;
                    break;
                }
                if (paragraphWidget.childWidgets.indexOf(lineWidget) !== -1) {
                    paragraphWidget.childWidgets.splice(paragraphWidget.childWidgets.indexOf(lineWidget), 1);
                    i--;
                }
                paragraphWidget.height -= lineWidget.height;
                if (isNullOrUndefined(splittedWidget)) {
                    //Creates new widget, to hold the splitted contents.
                    splittedWidget = new ParagraphWidget();
                    splittedWidget.characterFormat = paragraphWidget.characterFormat;
                    splittedWidget.paragraphFormat = paragraphWidget.paragraphFormat;
                    splittedWidget.index = paragraphWidget.index;
                    this.updateWidgetLocation(paragraphWidget, splittedWidget);
                    splittedWidget.height = lineWidget.height;
                }
                else {
                    splittedWidget.height += lineWidget.height;
                }
                splittedWidget.childWidgets.push(lineWidget);
                lineWidget.paragraph = splittedWidget;
            }
            this.getFootnoteFromLine(lineWidget, footNoteCollection);
            lineBottom += lineWidget.height;
            count++;
        }
        // this.updateLinearIndex(splittedWidget);
        return splittedWidget;
    };
    Layout.prototype.getSplittedWidgetForTable = function (bottom, tableCollection, tableWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count) {
        var rowBottom = tableWidget.y;
        var splittedWidget = undefined;
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = undefined;
            var childWidget = tableWidget.childWidgets[i];
            // if (childWidget instanceof TableRowWidget) {
            rowWidget = childWidget;
            // }
            var rowHeight = rowWidget.height;
            var existFootnoteHeight = this.existFootnoteHeight;
            if (bottom > rowBottom + rowHeight + existFootnoteHeight && isNullOrUndefined(splittedWidget)) {
                for (var k = 0; k < rowWidget.childWidgets.length; k++) {
                    this.updateFootHeight(rowWidget.childWidgets[k], footNoteCollection);
                }
            }
            if (!isNullOrUndefined(footNoteCollection)) {
                for (var j = 0; j < footNoteCollection.length; j++) {
                    existFootnoteHeight += this.getFootNoteHeight(footNoteCollection[j].bodyWidget);
                }
            }
            if (isMultiColumnSplit || bottom < rowBottom + rowHeight + existFootnoteHeight || !isNullOrUndefined(splittedWidget)) {
                //ToDo: Check whether row included in vertical merge or AllowRowSplitbyPage is true, if so split row.
                //Checks if atleast first line fits in the client area.
                var splittedRow = undefined;
                var allowRowBreakAcrossPages = true;
                if (!isNullOrUndefined(rowWidget) && !isNullOrUndefined(rowWidget.rowFormat)) {
                    allowRowBreakAcrossPages = rowWidget.rowFormat.allowBreakAcrossPages;
                }
                if (allowRowBreakAcrossPages) {
                    /* eslint-disable-next-line max-len */
                    splittedRow = (isNullOrUndefined(splittedWidget) && this.isFirstLineFitForRow(bottom, rowWidget)) ? this.getSplittedWidgetForRow(bottom, tableCollection, [rowWidget], rowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count) : rowWidget;
                }
                else {
                    if ((isNullOrUndefined(tableWidget.containerWidget.containerWidget.previousWidget)
                        && this.isFirstLineFitForRow(bottom, rowWidget))
                        || (tableWidget.isInsideTable
                            && !(tableWidget.containerWidget.containerWidget.rowFormat.allowBreakAcrossPages))) {
                        splittedRow = this.getSplittedWidgetForRow(bottom, tableCollection, [rowWidget], rowWidget, footNoteCollection, lineIndexInCell, isMultiColumnSplit, count);
                    }
                    else if (!isNullOrUndefined(tableWidget.containerWidget.containerWidget.previousWidget)) {
                        splittedRow = rowWidget;
                    }
                }
                if (!isNullOrUndefined(splittedRow)) {
                    if (i === 0 && splittedRow === rowWidget) {
                        //Returns if the whole table does not fit in current page.
                        return tableWidget;
                    }
                    if (tableWidget.childWidgets.indexOf(splittedRow) !== -1) {
                        tableWidget.childWidgets.splice(tableWidget.childWidgets.indexOf(splittedRow), 1);
                        i--;
                        tableWidget.height -= splittedRow.height;
                    }
                    else {
                        tableWidget.height -= rowHeight - rowWidget.height;
                    }
                    if (isNullOrUndefined(splittedWidget)) {
                        //Creates new widget, to hold the splitted contents.
                        splittedWidget = this.createTableWidget(tableWidget);
                        this.updateWidgetLocation(tableWidget, splittedWidget);
                        splittedWidget.height = splittedRow.height;
                    }
                    else {
                        splittedWidget.height += splittedRow.height;
                    }
                    splittedWidget.childWidgets.push(splittedRow);
                    splittedRow.containerWidget = splittedWidget;
                }
            }
            rowBottom += rowWidget.height;
        }
        return splittedWidget;
    };
    Layout.prototype.isFirstLineFitForPara = function (bottom, paraWidget) {
        var lineWidget = paraWidget.childWidgets[0];
        var lineHeight = lineWidget.height;
        var height = this.getFootNoteHeightInLine(lineWidget);
        height += this.existFootnoteHeight;
        lineHeight += height;
        var cellwidget = lineWidget.paragraph.containerWidget;
        if (paraWidget.paragraphFormat.keepLinesTogether && Math.floor(cellwidget.containerWidget.y) !== this.viewer.clientArea.y) {
            lineHeight = paraWidget.height;
        }
        // let document: WordDocument = undefined;
        // if (!isNullOrUndefined(lineWidget.paragraph.currentNode) && !isNullOrUndefined(cellwidget.containerWidget)) {
        //     document = WordDocument.getDocumentOf(lineWidget.paragraph.currentNode);
        // }
        //checks first line of the page is exceed the page height
        if (this.documentHelper.isFirstLineFitInShiftWidgets) {
            /* eslint-disable-next-line max-len */
            if (this.viewer.clientActiveArea.y === this.viewer.clientArea.y && paraWidget.y + lineHeight >= bottom) {
                return true;
            }
        }
        else if (!cellwidget.ownerTable.isInsideTable && cellwidget.containerWidget.y === this.viewer.clientArea.y
            && paraWidget.y + lineHeight >= bottom) {
            return true;
        }
        return (paraWidget.y + lineHeight <= bottom);
    };
    Layout.prototype.isFirstLineFitForTable = function (bottom, tableWidget) {
        var rowWidget = undefined;
        var isFit = false;
        var childWidget = tableWidget.childWidgets[0];
        // if (childWidget instanceof TableRowWidget) {
        rowWidget = childWidget;
        // }
        if (!isNullOrUndefined(rowWidget)) {
            isFit = this.isFirstLineFitForRow(bottom, rowWidget);
        }
        return isFit;
    };
    Layout.prototype.isFirstLineFitForRow = function (bottom, rowWidget) {
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var cellWidget = rowWidget.childWidgets[i];
            if (!this.isFirstLineFitForCell(bottom, cellWidget)) {
                return false;
            }
        }
        return true;
    };
    Layout.prototype.isFirstLineFitForCell = function (bottom, cellWidget) {
        if (cellWidget.childWidgets.length === 0) {
            return true;
        }
        if (cellWidget.childWidgets[0] instanceof ParagraphWidget) {
            var paraWidget = cellWidget.childWidgets[0];
            return this.isFirstLineFitForPara(bottom - cellWidget.margin.bottom, paraWidget);
        }
        else {
            var tableWidget = cellWidget.childWidgets[0];
            return this.isFirstLineFitForTable(bottom - cellWidget.margin.bottom, tableWidget);
        }
    };
    Layout.prototype.updateWidgetLocation = function (widget, table) {
        table.x = widget.x;
        table.y = widget.y;
        table.width = widget.width;
    };
    Layout.prototype.updateChildLocationForTable = function (top, tableWidget, bodyWidget, updatePosition) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = tableWidget.childWidgets[i];
            //rowWidget.x = rowWidget.x;
            rowWidget.y = top;
            this.updateChildLocationForRow(top, rowWidget, bodyWidget, updatePosition);
            top += rowWidget.height;
        }
    };
    Layout.prototype.updateChildLocationForRow = function (top, rowWidget, bodyWidget, updatePosition) {
        var spacing = 0;
        if (rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
            spacing = HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
        }
        for (var i = 0; i < rowWidget.childWidgets.length; i++) {
            var cellWidget = rowWidget.childWidgets[i];
            //cellWidget.x = cellWidget.x;
            cellWidget.index = cellWidget.cellIndex;
            cellWidget.y = top + cellWidget.margin.top + spacing;
            this.updateChildLocationForCellOrShape(cellWidget.y, cellWidget, bodyWidget, updatePosition);
        }
    };
    Layout.prototype.updateChildLocationForCellOrShape = function (top, widget, bodyWidget, updatePosition, updateShapeYPosition) {
        var container = widget;
        if (widget instanceof ShapeElementBox) {
            container = widget.textFrame;
        }
        for (var i = 0; i < container.childWidgets.length; i++) {
            var skipHeight = false;
            if (container.childWidgets[i] instanceof TableWidget && container.childWidgets[i].wrapTextAround
                && !isNullOrUndefined(container.childWidgets[i + 1]) && container.childWidgets[i + 1].y > container.childWidgets[i].y
                && container.childWidgets[i + 1].y < (container.childWidgets[i].y + container.childWidgets[i].height)) {
                skipHeight = true;
            }
            if (!isNullOrUndefined(container.childWidgets[i].floatingElements) && container.childWidgets[i].floatingElements.length > 0 && updatePosition) {
                this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - top;
                this.viewer.clientActiveArea.y = top;
            }
            container.childWidgets[i].x = container.childWidgets[i].x;
            container.childWidgets[i].y = top;
            if (widget instanceof ShapeElementBox && widget.textWrappingStyle == "Inline" && updateShapeYPosition) {
                this.updateShapeYPosition(widget);
            }
            if (!isNullOrUndefined(bodyWidget) && widget instanceof TableCellWidget && container.childWidgets[i] instanceof ParagraphWidget) {
                var paragraph = container.childWidgets[i];
                var prevBodyWidgetFloatingElements = widget.ownerTable.bodyWidget.floatingElements;
                var isRowMovedToNextTable = false;
                if (widget.ownerTable.bodyWidget === bodyWidget && !isNullOrUndefined(widget.ownerTable.previousSplitWidget)) {
                    prevBodyWidgetFloatingElements = widget.ownerTable.previousSplitWidget.bodyWidget.floatingElements;
                    isRowMovedToNextTable = true;
                }
                if (paragraph.floatingElements.length > 0) {
                    for (var j = 0; j < paragraph.floatingElements.length; j++) {
                        var element = paragraph.floatingElements[j];
                        var prevClientActiveAreaX = this.viewer.clientActiveArea.x;
                        this.viewer.clientActiveArea.x = element.x;
                        this.layoutShape(element);
                        this.viewer.clientActiveArea.x = prevClientActiveAreaX;
                        if (!isNullOrUndefined(paragraph.firstChild)) {
                            var firstLine = paragraph.childWidgets[0];
                            for (var k = 0; k < firstLine.children.length; k++) {
                                var elementBox = firstLine.children[k];
                                if (elementBox instanceof ShapeBase && elementBox.textWrappingStyle == 'Inline') {
                                    this.adjustPosition(elementBox, widget.ownerTable.bodyWidget);
                                    top = paragraph.y;
                                }
                            }
                        }
                        if (prevBodyWidgetFloatingElements.indexOf(element) > -1 && element.textWrappingStyle !== 'Inline') {
                            if (!isRowMovedToNextTable) {
                                bodyWidget.floatingElements.push(element);
                                var previousBodyWidget = bodyWidget.previousSplitWidget;
                                if (!isNullOrUndefined(previousBodyWidget) && previousBodyWidget.floatingElements.indexOf(element) !== -1) {
                                    previousBodyWidget.floatingElements.splice(previousBodyWidget.floatingElements.indexOf(element), 1);
                                }
                            }
                            if (prevBodyWidgetFloatingElements.indexOf(element) !== -1) {
                                prevBodyWidgetFloatingElements.splice(prevBodyWidgetFloatingElements.indexOf(element), 1);
                            }
                        }
                    }
                }
            }
            if (container.childWidgets[i] instanceof TableWidget) {
                this.updateChildLocationForTable(top, container.childWidgets[i], bodyWidget, updatePosition);
            }
            if (!skipHeight) {
                top += container.childWidgets[i].height;
            }
        }
    };
    Layout.prototype.updateCellVerticalPosition = function (cellWidget, isUpdateToTop, isInsideTable) {
        var containerWidget = cellWidget.ownerTable.containerWidget;
        if (containerWidget instanceof BlockContainer || containerWidget instanceof TextFrame || isInsideTable) {
            var displacement = this.getDisplacement(cellWidget, isUpdateToTop);
            //Update Y position alone for the child widget of cell
            this.updateCellContentVerticalPosition(cellWidget, displacement, isUpdateToTop);
        }
    };
    Layout.prototype.updateCellContentVerticalPosition = function (cellWidget, displacement, isUpdateToTop) {
        if (displacement === 0) {
            return;
        }
        var location = cellWidget.y + displacement;
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                var para = cellWidget.childWidgets[i];
                para.y = location;
                this.updateShapeInsideCell(para, displacement);
            }
            else {
                this.updateTableWidgetLocation(cellWidget.childWidgets[i], location, isUpdateToTop);
            }
            location = location + cellWidget.childWidgets[i].height;
        }
    };
    Layout.prototype.updateShapeInsideCell = function (paragraph, displacement) {
        for (var i = 0; i < paragraph.floatingElements.length; i++) {
            var floatElement = paragraph.floatingElements[i];
            floatElement.y += displacement;
            if (floatElement instanceof ShapeElementBox) {
                this.updateChildLocationForCellOrShape(floatElement.y, floatElement);
            }
        }
    };
    Layout.prototype.updateTableWidgetLocation = function (tableWidget, location, isUpdateToTop) {
        tableWidget.y = location = location + tableWidget.topBorderWidth;
        var cellSpacing = 0;
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = tableWidget.childWidgets[i];
            rowWidget.y = location;
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                var cellWidget = rowWidget.childWidgets[j];
                cellWidget.y = location + cellWidget.margin.top + cellSpacing;
                this.updateCellVerticalPosition(cellWidget, isUpdateToTop, true);
            }
            location = location + rowWidget.height;
        }
        return location;
    };
    Layout.prototype.getDisplacement = function (cellWidget, isUpdateToTop) {
        //Gets the height of row
        var rowHeight = 0;
        var rowWidget = cellWidget.containerWidget;
        var padding = cellWidget.margin.top + cellWidget.margin.bottom;
        if (!isNullOrUndefined(cellWidget.cellFormat) && cellWidget.cellFormat.rowSpan > 1) {
            rowHeight = cellWidget.height;
        }
        else {
            rowHeight = ((!isNullOrUndefined(rowWidget) ? rowWidget.height : 0) - padding);
        }
        //Gets the height of content within the cell
        var cellContentHeight = this.getCellContentHeight(cellWidget, true);
        //Displacement field holds the value which has reduced from rowHeight and cellContentHeight
        var displacement = 0;
        if (rowHeight > cellContentHeight && rowHeight <= this.viewer.clientArea.height && !cellWidget.isSplittedCell) {
            displacement = rowHeight - cellContentHeight;
            if (cellWidget.cellFormat.verticalAlignment === 'Center') {
                displacement = displacement / 2;
            }
            else if ((cellWidget.cellFormat.verticalAlignment === 'Top' || isUpdateToTop)) {
                displacement = 0;
            }
        }
        return displacement;
    };
    Layout.prototype.getCellContentHeight = function (cellWidget, isDisplacement, paraIndex) {
        if (isNullOrUndefined(cellWidget.childWidgets)) {
            return 0;
        }
        var contentHeight = 0;
        var cellY = cellWidget.y;
        var withShapeContentHeight = 0;
        var withShapeBottom = 0;
        var considerShapeHeight = false;
        var considerAsTop = false;
        for (var i = 0; i < cellWidget.childWidgets.length; i++) {
            if (cellWidget.childWidgets[i] instanceof ParagraphWidget) {
                var para = cellWidget.childWidgets[i];
                contentHeight += cellWidget.childWidgets[i].height;
                if (!isDisplacement && para.floatingElements.length > 0 && paraIndex === para.indexInOwner) {
                    var totalShapeHeight = this.getFloatingItemsHeight(para, cellWidget);
                    contentHeight += totalShapeHeight;
                }
                for (var k = 0; k < para.floatingElements.length; k++) {
                    considerShapeHeight = true;
                    var floatElement = para.floatingElements[k];
                    var textWrappingStyle = floatElement.textWrappingStyle;
                    var shapeBottom = floatElement.y + floatElement.height;
                    var paraBottom = para.y + para.height;
                    if ((cellY + cellWidget.containerWidget.height) > shapeBottom && shapeBottom > withShapeBottom) {
                        withShapeContentHeight = Math.abs(cellY - shapeBottom);
                        withShapeBottom = shapeBottom;
                        considerAsTop = false;
                    }
                    else if (shapeBottom > paraBottom && para.x + para.width > floatElement.x && shapeBottom > withShapeBottom
                        && textWrappingStyle !== 'InFrontOfText' && textWrappingStyle !== 'Behind'
                        && (this.documentHelper.compatibilityMode === 'Word2013' || para.floatingElements[k].layoutInCell)) {
                        var height = (withShapeBottom === 0) ? shapeBottom - paraBottom : shapeBottom - withShapeBottom;
                        contentHeight += height;
                        withShapeBottom = shapeBottom;
                    }
                    else {
                        considerAsTop = true;
                    }
                }
            }
            else {
                if (this.considerPositionTableHeight(cellWidget, cellWidget.childWidgets[i])) {
                    contentHeight += cellWidget.childWidgets[i].height;
                }
            }
        }
        if ((cellY + contentHeight) > withShapeBottom) {
            considerShapeHeight = false;
        }
        return (isDisplacement && considerShapeHeight) ? withShapeContentHeight :
            (isDisplacement && considerAsTop ? cellWidget.ownerRow.height : contentHeight);
    };
    Layout.prototype.getFloatingItemsHeight = function (paragraph, cellWidget) {
        var withShapeBottom = 0;
        var totalShapeHeight = 0;
        for (var i = 0; i < paragraph.floatingElements.length; i++) {
            var floatElement = paragraph.floatingElements[i];
            var textWrappingStyle = floatElement.textWrappingStyle;
            var shapeBottom = floatElement.y + floatElement.height;
            var paraBottom = paragraph.y + paragraph.height;
            if (shapeBottom < this.viewer.clientArea.bottom && floatElement.y !== paragraph.y && paraBottom > shapeBottom && paragraph.x + paragraph.width > floatElement.x && shapeBottom > withShapeBottom
                && textWrappingStyle !== 'InFrontOfText' && textWrappingStyle !== 'Behind' && textWrappingStyle !== 'Inline'
                && (this.documentHelper.compatibilityMode === 'Word2013' || paragraph.floatingElements[i].layoutInCell)) {
                var height = (withShapeBottom === 0) ? shapeBottom - cellWidget.y : shapeBottom - withShapeBottom;
                totalShapeHeight += height;
                withShapeBottom = shapeBottom;
            }
        }
        return totalShapeHeight;
    };
    Layout.prototype.considerPositionTableHeight = function (cellWidget, nestedWrapTable) {
        if (nestedWrapTable.isLayouted && nestedWrapTable.wrapTextAround) {
            for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                var blockWidget = cellWidget.childWidgets[i];
                if (nestedWrapTable !== blockWidget && (blockWidget.y === nestedWrapTable.y
                    || (blockWidget.y + blockWidget.height) < nestedWrapTable.y)) {
                    return false;
                }
            }
        }
        return true;
    };
    Layout.prototype.getTableLeftBorder = function (borders) {
        if (!isNullOrUndefined(borders.left)) {
            return borders.left;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getTableRightBorder = function (borders) {
        if (!isNullOrUndefined(borders.right)) {
            return borders.right;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getTableTopBorder = function (borders) {
        if (!isNullOrUndefined(borders.top)) {
            return borders.top;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getTableBottomBorder = function (borders) {
        if (!isNullOrUndefined(borders.bottom)) {
            return borders.bottom;
        }
        else {
            var border = new WBorder(borders);
            border.lineStyle = 'Single';
            border.lineWidth = 0.66;
            return border;
        }
    };
    Layout.prototype.getCellDiagonalUpBorder = function (tableCell) {
        var diagonalUpBorder = undefined;
        var cellBorder = undefined;
        cellBorder = tableCell.cellFormat.borders;
        diagonalUpBorder = cellBorder.diagonalUp;
        return diagonalUpBorder;
    };
    Layout.prototype.getCellDiagonalDownBorder = function (tableCell) {
        var diagonalDownBorder = undefined;
        var cellBorder = undefined;
        cellBorder = tableCell.cellFormat.borders;
        diagonalDownBorder = cellBorder.diagonalDown;
        return diagonalDownBorder;
    };
    Layout.prototype.getTableWidth = function (table) {
        var width = 0;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            var rowWidth = 0;
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                rowWidth += HelperMethods.convertPointToPixel(cell.cellFormat.cellWidth);
            }
            if (width < rowWidth) {
                width = rowWidth;
            }
        }
        return width;
    };
    //#region shifting
    Layout.prototype.layoutNextItemsBlock = function (blockAdv, viewer, isFootnoteReLayout, isNextBlockToShift) {
        var sectionIndex = blockAdv.bodyWidget.sectionIndex;
        var block = blockAdv;
        var splittedWidget = block.getSplitWidgets();
        var nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        if (isNullOrUndefined(nextBlock) || this.documentHelper.blockToShift === block) {
            this.documentHelper.blockToShift = undefined;
        }
        var updateNextBlockList = true;
        while (nextBlock instanceof BlockWidget && (nextBlock.bodyWidget.sectionIndex === sectionIndex || (nextBlock.bodyWidget.sectionFormat.breakCode === 'NoBreak' && block.bodyWidget.sectionFormat.pageWidth === nextBlock.bodyWidget.sectionFormat.pageWidth && block.bodyWidget.sectionFormat.pageHeight === nextBlock.bodyWidget.sectionFormat.pageHeight))) {
            if (!isNullOrUndefined(isFootnoteReLayout) && isFootnoteReLayout && !nextBlock.isLayouted && this.isInitialLoad) {
                break;
            }
            var currentWidget = undefined;
            var blocks = block.getSplitWidgets();
            currentWidget = blocks[blocks.length - 1];
            // if (viewer.fieldEndParagraph === block) {
            //     //Sets field end paragraph to undefined, inorder to hold reLayouting with this paragraph.
            //     viewer.fieldEndParagraph = undefined;
            // }
            block = nextBlock;
            if (this.documentHelper.blockToShift === block) {
                this.documentHelper.blockToShift = undefined;
            }
            updateNextBlockList = false;
            var nextWidget = undefined;
            nextWidget = block.getSplitWidgets()[0];
            /* eslint-disable-next-line max-len */
            if (this.documentHelper.fieldStacks.length === 0 && !isNullOrUndefined(nextWidget) && currentWidget.containerWidget === nextWidget.containerWidget
                && (HelperMethods.round(nextWidget.y, 2) === HelperMethods.round(currentWidget.y + currentWidget.height, 2))) {
                if (!isNullOrUndefined(this.documentHelper.blockToShift) || this.documentHelper.owner.editorModule.isFootnoteElementRemoved) {
                    this.documentHelper.blockToShift = block;
                }
                else if (nextWidget.bodyWidget) {
                    var floatingElementLength = nextWidget.bodyWidget.floatingElements.length;
                    if (floatingElementLength > 0 || (floatingElementLength === 0 && isNullOrUndefined(this.documentHelper.blockToShift)
                        && isNextBlockToShift)) {
                        this.documentHelper.blockToShift = block;
                    }
                }
                break;
            }
            updateNextBlockList = true;
            if ((viewer.owner.isShiftingEnabled && (this.documentHelper.fieldStacks.length === 0 || this.viewer.owner.editorModule.isInsertingTOC)) || (this.isIFfield && !this.checkBlockHasField(block))) {
                this.documentHelper.blockToShift = block;
                break;
            }
            else if (isNullOrUndefined(this.viewer.owner.editorModule) || !this.viewer.owner.editorModule.isInsertingTOC) {
                block = block.combineWidget(this.viewer);
                //let paragraph: ParagraphWidget;
                if (currentWidget.containerWidget !== block.containerWidget) {
                    if (!(currentWidget instanceof ParagraphWidget) ||
                        (currentWidget instanceof ParagraphWidget) && !currentWidget.isEndsWithPageBreak && !currentWidget.isEndsWithColumnBreak && currentWidget.containerWidget.page !== block.containerWidget.page && !(block.bodyWidget instanceof BodyWidget && block.bodyWidget.sectionFormat.breakCode === 'NoBreak')) {
                        /* eslint-disable-next-line max-len */
                        this.updateContainerWidget(block, currentWidget.containerWidget, currentWidget.indexInOwner + 1, false);
                    }
                }
                if (block instanceof TableWidget) {
                    this.clearTableWidget(block, true, true);
                    block.isGridUpdated = false;
                    //paragraph = this.documentHelper.selection.getFirstParagraphInFirstCell(block as TableWidget);
                }
                else {
                    //paragraph = block as ParagraphWidget;
                }
                //if ((this.viewer.owner.isDocumentLoaded) && this.viewer.owner.editorModule) {
                //    this.viewer.owner.editorModule.updateWholeListItems(paragraph);
                //}
                viewer.updateClientAreaForBlock(block, true);
                if (this.viewer instanceof WebLayoutViewer || block.bodyWidget instanceof HeaderFooterWidget) {
                    block.containerWidget.height -= block.height;
                }
                this.documentHelper.layout.layoutBlock(block, 0);
                viewer.updateClientAreaForBlock(block, false);
            }
            splittedWidget = nextBlock.getSplitWidgets();
            nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        }
        if ((!viewer.owner.isShiftingEnabled || (this.documentHelper.blockToShift !== block)) && !this.isPastingContent) {
            this.viewer.owner.editorModule.updateListItemsTillEnd(block, updateNextBlockList);
        }
    };
    /**
     * Update the client area for the line widget.
     *
     * @param {LineWidget} startLineWidget LineWidget instance.
     * @private
     */
    Layout.prototype.updateClientAreaForLine = function (startLineWidget) {
        startLineWidget.marginTop = 0;
        //Clears the line widget starting from current line.
        var top = this.documentHelper.selection.getTop(startLineWidget);
        var left = this.viewer.clientArea.x;
        this.viewer.cutFromTop(top);
        this.viewer.cutFromLeft(left);
    };
    /**
     * @private
     */
    Layout.prototype.isAuto = function (table) {
        var isAllColumnHasAutoWidthType = false;
        if (table.tableFormat.preferredWidthType === 'Auto' && table.tableFormat.preferredWidth === 0 && table.tableFormat.allowAutoFit) {
            for (var i = 0; i < table.childWidgets.length; i++) {
                var row = table.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    if (cell.cellFormat.preferredWidthType === 'Auto' && cell.cellFormat.preferredWidth === 0) {
                        isAllColumnHasAutoWidthType = true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
        else {
            return false;
        }
        if (isAllColumnHasAutoWidthType && table.isInsideTable && table.containerWidget instanceof TableCellWidget) {
            isAllColumnHasAutoWidthType = this.isAuto(table.containerWidget.ownerTable);
        }
        return isAllColumnHasAutoWidthType;
    };
    Layout.prototype.getParentTable = function (block) {
        var widget = block;
        while (widget.containerWidget) {
            if (widget.containerWidget instanceof BlockContainer || widget.containerWidget instanceof TextFrame) {
                return widget;
            }
            widget = widget.containerWidget;
        }
        return undefined;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.reLayoutParagraph = function (paragraphWidget, lineIndex, elementBoxIndex, isBidi, isSkip) {
        if (this.isReplaceAll || (this.viewer.owner.editorModule && this.viewer.owner.editorModule.restrictLayout)) {
            return;
        }
        this.isRelayout = true;
        if (paragraphWidget.containerWidget instanceof TextFrame
            && paragraphWidget.containerWidget.containerShape.textWrappingStyle === 'Inline') {
            lineIndex = paragraphWidget.containerWidget.containerShape.line.indexInOwner;
            paragraphWidget = paragraphWidget.containerWidget.containerShape.paragraph;
        }
        isBidi = isNullOrUndefined(isBidi) ? false : isBidi;
        this.isRelayout = true;
        var isLayouted = false;
        if (this.documentHelper.blockToShift === paragraphWidget) {
            this.layoutBodyWidgetCollection(paragraphWidget.index, paragraphWidget.containerWidget, paragraphWidget, false);
            this.isBidiReLayout = true;
            isLayouted = true;
        }
        else {
            if (this.isBidiReLayout) {
                this.isBidiReLayout = false;
            }
        }
        // let isElementMoved: boolean = elementBoxIndex > 0;
        var skipWholeTableLayout = false;
        if (!isLayouted) {
            if (paragraphWidget.isInsideTable) {
                this.isBidiReLayout = true;
                if (this.documentHelper.owner.editorHistoryModule && this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo
                    && this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.isEmptySelection) {
                    skipWholeTableLayout = true;
                }
                var parentTable = this.getParentTable(paragraphWidget);
                var container = parentTable.containerWidget;
                if (!this.isReplacingAll && skipWholeTableLayout && container instanceof BodyWidget && isNullOrUndefined(container.containerWidget)) {
                    var tableHolderBeforeBuildColumn = parentTable.tableHolder.clone();
                    var tableWidget = (parentTable.clone()).combineWidget(this.viewer);
                    var isSameColumnWidth = true;
                    if (tableWidget.tableFormat.allowAutoFit) {
                        tableWidget.isGridUpdated = false;
                        tableWidget.buildTableColumns();
                        tableWidget.isGridUpdated = true;
                        if (tableHolderBeforeBuildColumn.columns.length === tableWidget.tableHolder.columns.length) {
                            for (var i = 0; i < tableWidget.tableHolder.columns.length; i++) {
                                var tableAfterColumnWidth = tableWidget.tableHolder.columns[i].preferredWidth;
                                var tableBeforeColumnWidth = tableHolderBeforeBuildColumn.columns[i].preferredWidth;
                                if (tableAfterColumnWidth !== tableBeforeColumnWidth) {
                                    isSameColumnWidth = false;
                                    break;
                                }
                            }
                        }
                        else {
                            isSameColumnWidth = false;
                        }
                    }
                    if (isSameColumnWidth) {
                        if (paragraphWidget.associatedCell.ownerTable.footnoteElement && paragraphWidget.associatedCell.ownerTable.footnoteElement.length > 0) {
                            this.clearFootnoteReference(paragraphWidget.associatedCell.ownerTable, true);
                        }
                        this.viewer.updateClientAreaForCell(paragraphWidget.associatedCell, true);
                        this.viewer.updateClientAreaForBlock(paragraphWidget, true);
                        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
                            this.viewer.owner.editorModule.updateWholeListItems(paragraphWidget);
                        }
                        this.layoutParagraph(paragraphWidget, 0);
                        this.viewer.updateClientAreaForBlock(paragraphWidget, false);
                        //Get Top level owner of block
                        var table = this.getParentTable(paragraphWidget);
                        var pageIndexBeforeLayouting = 0;
                        if (table.containerWidget instanceof BodyWidget) {
                            var blocks = table.getSplitWidgets();
                            var splittedWidget = blocks[blocks.length - 1];
                            pageIndexBeforeLayouting = splittedWidget.containerWidget.page.index;
                        }
                        //Combine splitted table in to single table
                        var currentTable = table.combineWidget(this.viewer);
                        var bodyWidget = currentTable.containerWidget;
                        if (this.viewer instanceof WebLayoutViewer) {
                            bodyWidget.height -= currentTable.height;
                        }
                        this.viewer.updateClientArea(bodyWidget, bodyWidget.page);
                        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
                            var block = this.documentHelper.getFirstParagraphInFirstCell(currentTable);
                            this.viewer.owner.editorModule.updateWholeListItems(block);
                        }
                        this.viewer.updateClientAreaForBlock(currentTable, true);
                        //Remove border width
                        currentTable.x -= currentTable.leftBorderWidth;
                        currentTable.y -= currentTable.topBorderWidth;
                        //Update Client area for current position
                        var yPos = this.getYPosition(currentTable);
                        this.viewer.cutFromTop(yPos);
                        this.clearTableWidget(currentTable, true, true, false, true, true);
                        this.shiftTableWidget(currentTable, this.viewer);
                        this.viewer.updateClientAreaForBlock(currentTable, false);
                        var pageIndexAfterLayouting = 0;
                        if (currentTable.containerWidget instanceof BodyWidget) {
                            var blocks = currentTable.getSplitWidgets();
                            var splittedWidget = blocks[blocks.length - 1];
                            pageIndexAfterLayouting = splittedWidget.containerWidget.page.index;
                        }
                        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule && currentTable.nextRenderedWidget) {
                            this.viewer.owner.editorModule.updateWholeListItems(currentTable.nextRenderedWidget);
                        }
                        this.layoutNextItemsBlock(currentTable, this.viewer, undefined, pageIndexBeforeLayouting !== pageIndexAfterLayouting);
                    }
                    else if (!this.isReplacingAll) {
                        this.reLayoutTable(paragraphWidget);
                    }
                }
                else if (!this.isReplacingAll) {
                    this.reLayoutTable(paragraphWidget);
                }
                /* eslint-disable-next-line max-len */
                if (this.isFootnoteContentChanged && (!isNullOrUndefined(paragraphWidget.bodyWidget)) && !isNullOrUndefined(paragraphWidget.bodyWidget.page.footnoteWidget)) {
                    var foot = paragraphWidget.bodyWidget.page.footnoteWidget;
                    this.layoutfootNote(foot);
                }
                this.isBidiReLayout = false;
            }
            else {
                // this.isRelayout = true;
                this.reLayoutLine(paragraphWidget, lineIndex, isBidi, isSkip, undefined);
            }
        }
        if (paragraphWidget.bodyWidget instanceof HeaderFooterWidget &&
            paragraphWidget.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
            this.shiftFooterChildLocation(paragraphWidget.bodyWidget, this.viewer);
        }
        // this.updateLinearIndex(paragraphWidget);
    };
    Layout.prototype.getParentRow = function (block) {
        return this.getParentCell(block).ownerRow;
    };
    /**
     * @private
     */
    Layout.prototype.getParentCell = function (block) {
        var cell = block;
        while (cell.ownerTable !== null && cell.ownerTable.isInsideTable) {
            cell = cell.ownerTable.associatedCell;
        }
        return cell;
    };
    Layout.prototype.reLayoutRow = function (block) {
        if (block instanceof ParagraphWidget) {
            block = block.associatedCell;
        }
        var currentRow = this.getParentRow(block).getSplitWidgets()[0];
        if (!isNullOrUndefined(currentRow) && !currentRow.ownerTable.tableFormat.allowAutoFit) {
            var currentTable = currentRow.ownerTable.getSplitWidgets()[0].combineWidget(this.viewer);
            var startRow = currentRow;
            while (this.isVerticalMergedCellContinue(startRow)) {
                var previousRow = startRow.previousWidget;
                if (isNullOrUndefined(previousRow)) {
                    break;
                }
                startRow = previousRow;
            }
            var bodyWidget = currentTable.containerWidget;
            if (this.viewer instanceof WebLayoutViewer) {
                bodyWidget.height -= currentTable.height;
            }
            if ((this.viewer.owner.enableHeaderAndFooter || block.isInHeaderFooter) && !(bodyWidget instanceof TextFrame)) {
                block.bodyWidget.isEmpty = false;
                bodyWidget.height -= currentTable.height;
                /* eslint-disable-next-line max-len */
                this.viewer.updateHeaderFooterClientAreaWithTop(currentTable.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(currentTable), bodyWidget.page);
            }
            else if (bodyWidget instanceof TextFrame) {
                this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
            }
            else {
                this.viewer.updateClientArea(bodyWidget, bodyWidget.page);
            }
            /* eslint-disable-next-line max-len */
            var area = new Rect(this.viewer.clientArea.x, this.viewer.clientArea.y, this.viewer.clientArea.width, this.viewer.clientArea.height);
            var clientArea = new Rect(area.x, area.y, area.width, area.height);
            if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
                var block_3 = this.documentHelper.getFirstParagraphInFirstCell(currentTable);
                this.viewer.owner.editorModule.updateWholeListItems(block_3);
            }
            this.viewer.updateClientAreaForBlock(currentTable, true);
            this.viewer.cutFromTop(startRow.y);
            this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
            //Clear Hieght for all the content
            currentTable.height = 0;
            do {
                this.clearRowWidget(currentRow, true, true, true);
                this.layoutRow([currentTable], currentRow, true);
                if (startRow === currentRow) {
                    break;
                }
                startRow = startRow.nextRow;
            } while (startRow && startRow !== currentRow);
            this.updateChildLocationForTable(currentTable.y, currentTable);
            this.viewer.clientArea = clientArea;
            this.viewer.clientActiveArea = new Rect(clientArea.x, clientArea.y, clientArea.width, clientArea.height);
            this.viewer.updateClientAreaForBlock(currentTable, true);
            currentTable.x -= currentTable.leftBorderWidth;
            currentTable.y -= currentTable.topBorderWidth;
            this.viewer.cutFromTop(currentTable.y);
            this.shiftTableWidget(currentTable, this.viewer, true);
            this.layoutNextItemsBlock(currentTable, this.viewer);
        }
        else {
            this.currentCell = block;
            this.reLayoutTable(block);
            this.currentCell = undefined;
        }
    };
    Layout.prototype.reLayoutTable = function (block, isFootnoteReLayout) {
        if (this.viewer.owner.editorModule && this.viewer.owner.editorModule.restrictLayout) {
            return;
        }
        //Get Top level owner of block
        var table = this.getParentTable(block);
        if (table.header) {
            var tableCollection = table.getSplitWidgets();
            for (var i = 1; i < tableCollection.length; i++) {
                tableCollection[i].bodyWidget.page.repeatHeaderRowTableWidget = false;
            }
        }
        var pageIndexBeforeLayouting = 0;
        if (table.containerWidget instanceof BodyWidget) {
            var blocks = table.getSplitWidgets();
            var splittedWidget = blocks[blocks.length - 1];
            pageIndexBeforeLayouting = splittedWidget.containerWidget.page.index;
        }
        //Combine splitted table in to single table
        var currentTable = table.combineWidget(this.viewer);
        var bodyWidget = currentTable.containerWidget;
        if (this.viewer instanceof WebLayoutViewer) {
            bodyWidget.height -= currentTable.height;
        }
        if ((this.viewer.owner.enableHeaderAndFooter || block.isInHeaderFooter) && !(bodyWidget instanceof TextFrame)) {
            block.bodyWidget.isEmpty = false;
            bodyWidget.height -= currentTable.height;
            /* eslint-disable-next-line max-len */
            this.viewer.updateHeaderFooterClientAreaWithTop(table.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(table), bodyWidget.page);
        }
        else if (bodyWidget instanceof TextFrame) {
            this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
        }
        else {
            this.viewer.updateClientArea(bodyWidget, bodyWidget.page);
        }
        //Clear Hieght for all the content
        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule) {
            var block_4 = this.documentHelper.getFirstParagraphInFirstCell(currentTable);
            this.viewer.owner.editorModule.updateWholeListItems(block_4);
        }
        this.viewer.updateClientAreaForBlock(currentTable, true);
        //Remove border width
        currentTable.x -= currentTable.leftBorderWidth;
        currentTable.y -= currentTable.topBorderWidth;
        //Update Client area for current position
        var yPos = this.getYPosition(currentTable);
        this.viewer.cutFromTop(yPos);
        this.clearTableWidget(currentTable, true, true, true, true);
        this.isBidiReLayout = true;
        this.layoutBlock(currentTable, 0);
        this.viewer.updateClientAreaForBlock(currentTable, false);
        var pageIndexAfterLayouting = 0;
        if (currentTable.containerWidget instanceof BodyWidget) {
            var blocks = currentTable.getSplitWidgets();
            var splittedWidget = blocks[blocks.length - 1];
            pageIndexAfterLayouting = splittedWidget.containerWidget.page.index;
        }
        this.layoutNextItemsBlock(currentTable, this.viewer, isFootnoteReLayout, pageIndexBeforeLayouting !== pageIndexAfterLayouting);
    };
    Layout.prototype.getYPosition = function (table) {
        if (table.wrapTextAround) {
            var prevWidget = table.previousWidget;
            while (prevWidget) {
                if (prevWidget instanceof ParagraphWidget) {
                    return prevWidget.y + prevWidget.height;
                }
                else if (prevWidget instanceof TableWidget) {
                    if (prevWidget.wrapTextAround) {
                        prevWidget = prevWidget.previousWidget;
                    }
                    else {
                        return prevWidget.y + prevWidget.height;
                    }
                }
            }
            return this.viewer.clientActiveArea.y;
        }
        return table.y;
    };
    Layout.prototype.clearFootnoteReference = function (table, updateClientHeight) {
        if (table.footnoteElement && table.footnoteElement.length > 0) {
            var startPage = table.bodyWidget.page;
            for (var i = table.footnoteElement.length - 1; i >= 0; i--) {
                var footnote = table.footnoteElement[i];
                footnote.isLayout = false;
                var footNoteWidget = footnote.bodyWidget.containerWidget;
                if (footNoteWidget && footNoteWidget.bodyWidgets.indexOf(footnote.bodyWidget) !== -1) {
                    var footnoteHeight = this.getFootNoteHeight(footnote.bodyWidget);
                    footNoteWidget.height -= footnoteHeight;
                    footNoteWidget.bodyWidgets.splice(footnote.bodyWidget.indexInOwner, 1);
                    if (updateClientHeight && footNoteWidget.page === startPage) {
                        this.viewer.clientActiveArea.height += footnoteHeight;
                        this.viewer.clientArea.height += footnoteHeight;
                    }
                }
                if (footNoteWidget && footNoteWidget.bodyWidgets.length === 0 && footNoteWidget.page) {
                    footNoteWidget.page.footnoteWidget = undefined;
                }
                footnote.bodyWidget.containerWidget = undefined;
            }
            table.footnoteElement = [];
        }
    };
    /**
     * @private
     */
    Layout.prototype.clearTableWidget = function (table, clearPosition, clearHeight, clearGrid, updateClientHeight, skipToClearPara) {
        table.height = 0;
        if (clearGrid) {
            table.isGridUpdated = false;
        }
        if (clearPosition) {
            table.y = 0;
            table.x = 0;
            if (table.footnoteElement && table.footnoteElement.length > 0) {
                this.clearFootnoteReference(table, updateClientHeight);
            }
        }
        table.leftBorderWidth = 0;
        table.rightBorderWidth = 0;
        table.topBorderWidth = 0;
        table.bottomBorderWidth = 0;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            this.clearRowWidget(row, clearPosition, clearHeight, clearGrid, skipToClearPara);
        }
    };
    /**
     * @private
     */
    Layout.prototype.clearRowWidget = function (row, clearPosition, clearHeight, clearGrid, skipToClearPara) {
        row.height = 0;
        if (clearPosition) {
            row.y = 0;
            row.x = 0;
        }
        row.topBorderWidth = 0;
        row.bottomBorderWidth = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            this.clearCellWidget(cell, clearPosition, clearHeight, clearGrid, skipToClearPara);
        }
    };
    /**
     * @private
     */
    Layout.prototype.clearCellWidget = function (cell, clearPosition, clearHeight, clearGrid, skipToClearPara) {
        cell.height = 0;
        if (clearPosition) {
            cell.y = 0;
            cell.x = 0;
        }
        cell.leftBorderWidth = 0;
        cell.rightBorderWidth = 0;
        this.clearBlockWidget(cell.childWidgets, clearPosition, clearHeight, clearGrid, skipToClearPara);
    };
    /**
     * @private
     */
    Layout.prototype.clearBlockWidget = function (blocks, clearPosition, clearHeight, clearGrid, skipToClearPara) {
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i];
            if (block instanceof ParagraphWidget) {
                if (clearPosition && !skipToClearPara) {
                    block.y = 0;
                    block.x = 0;
                }
                if (clearHeight && !skipToClearPara) {
                    block.height = 0;
                }
            }
            else {
                this.clearTableWidget(block, clearPosition, clearHeight, clearGrid, undefined, skipToClearPara);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.layoutBodyWidgetCollection = function (blockIndex, bodyWidget, block, shiftNextWidget, isSkipShifting, isSelectionInsideTable) {
        if ((!isNullOrUndefined(block) && block.isFieldCodeBlock)) {
            return;
        }
        if (!isNullOrUndefined(this.documentHelper.owner)
            && this.documentHelper.owner.isLayoutEnabled) {
            if (this.viewer.owner.editorModule && this.viewer.owner.editor.restrictLayout) {
                return;
            }
            if (bodyWidget instanceof BlockContainer || bodyWidget instanceof TextFrame) {
                var curretBlock = this.checkAndGetBlock(bodyWidget, blockIndex);
                if (bodyWidget instanceof BodyWidget && isNullOrUndefined(curretBlock) && !isNullOrUndefined(bodyWidget.nextRenderedWidget) && bodyWidget.nextRenderedWidget.sectionFormat.breakCode === 'NoBreak') {
                    curretBlock = bodyWidget.nextRenderedWidget.firstChild;
                    bodyWidget = bodyWidget.nextRenderedWidget;
                }
                if (isNullOrUndefined(curretBlock)) {
                    return;
                }
                if (this.viewer instanceof WebLayoutViewer) {
                    curretBlock.containerWidget.height -= curretBlock.height;
                }
                if (bodyWidget instanceof HeaderFooterWidget) {
                    bodyWidget.isEmpty = false;
                    this.viewer.updateHeaderFooterClientAreaWithTop(bodyWidget.sectionFormat, bodyWidget.headerFooterType.indexOf('Header') !== -1, bodyWidget.page);
                    curretBlock.containerWidget.height -= curretBlock.height;
                }
                else if (bodyWidget instanceof TextFrame) {
                    this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true, !shiftNextWidget);
                }
                else if (!isNullOrUndefined(bodyWidget.containerWidget) && bodyWidget.containerWidget instanceof FootNoteWidget) {
                    this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                    if (bodyWidget.containerWidget.footNoteType === 'Footnote') {
                        this.isRelayoutFootnote = true;
                        this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
                        this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
                        //curretBlock.containerWidget.height -= curretBlock.height;
                        this.viewer.clientActiveArea.y = curretBlock.containerWidget.containerWidget.y;
                    }
                    else {
                        this.viewer.cutFromTop(bodyWidget.containerWidget.y);
                        this.layoutfootNote(bodyWidget.containerWidget);
                        return;
                    }
                    // curretBlock.containerWidget.height -= curretBlock.height;
                }
                else {
                    if (!isNullOrUndefined(bodyWidget.page.footnoteWidget)) {
                        if (bodyWidget.page.footnoteWidget.footNoteType === 'Footnote') {
                            this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                        }
                        else {
                            this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                        }
                    }
                    else {
                        this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
                    }
                    // if (bodyWidget.page.footnoteWidget) {
                    //     this.viewer.clientActiveArea.height -= bodyWidget.page.footnoteWidget.height;
                    //     this.viewer.clientArea.height -= bodyWidget.page.footnoteWidget.height;
                    // }
                }
                var pageIndexBeforeLayout = 0;
                var pageIndexAfterLayout = 0;
                if (curretBlock.containerWidget instanceof BodyWidget) {
                    var blocks = curretBlock.getSplitWidgets();
                    var splittedWidget = blocks[blocks.length - 1];
                    pageIndexBeforeLayout = splittedWidget.containerWidget.page.index;
                }
                if (blockIndex > 0 || (curretBlock.bodyWidget.sectionFormat.breakCode === 'NoBreak' && curretBlock.bodyWidget.index !== 0 && curretBlock === bodyWidget.firstChild)) {
                    curretBlock = curretBlock.combineWidget(this.viewer);
                    var prevWidget = curretBlock.getSplitWidgets()[0].previousRenderedWidget;
                    if (!isNullOrUndefined(prevWidget) && prevWidget.wrapTextAround && !isNullOrUndefined(prevWidget.getSplitWidgets()[0].previousRenderedWidget) &&
                        prevWidget.bodyWidget.index === prevWidget.getSplitWidgets()[0].previousRenderedWidget.bodyWidget.index &&
                        prevWidget.y < prevWidget.getSplitWidgets()[0].previousRenderedWidget.y) {
                        prevWidget = prevWidget.getSplitWidgets()[0].previousRenderedWidget;
                    }
                    while (prevWidget instanceof BlockWidget && prevWidget.isFieldCodeBlock) {
                        prevWidget = prevWidget.getSplitWidgets()[0].previousRenderedWidget;
                    }
                    if (!(isNullOrUndefined(prevWidget) || prevWidget instanceof ParagraphWidget) ||
                        (prevWidget instanceof ParagraphWidget) && !prevWidget.isEndsWithPageBreak && !prevWidget.isEndsWithColumnBreak) {
                        if (isNullOrUndefined(isSkipShifting) && curretBlock.containerWidget !== prevWidget.containerWidget) {
                            /* eslint-disable-next-line max-len */
                            var prevBodyWidget = curretBlock.containerWidget;
                            var newBodyWidget = prevWidget.containerWidget;
                            var footWidgets = this.getFootNoteWidgetsOf(curretBlock);
                            this.moveFootNotesToPage(footWidgets, prevBodyWidget, newBodyWidget);
                            if (curretBlock.bodyWidget.sectionFormat.breakCode !== 'NoBreak' || (curretBlock.bodyWidget.index === prevWidget.bodyWidget.index)) {
                                this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                                this.updateContainerWidget(curretBlock, newBodyWidget, prevWidget.indexInOwner + 1, false);
                            }
                            else if (curretBlock.bodyWidget.sectionIndex !== prevWidget.bodyWidget.sectionIndex && prevWidget.bodyWidget.sectionFormat.numberOfColumns > 1 && curretBlock.bodyWidget.page === prevWidget.bodyWidget.page) {
                                var firstBody = this.getBodyWidget(prevWidget.bodyWidget, true);
                                var height = this.getNextWidgetHeight(firstBody);
                                this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                                this.viewer.clientActiveArea.y = height;
                                this.viewer.clientArea.y = this.viewer.clientActiveArea.y;
                                this.viewer.clientArea.height = this.viewer.clientActiveArea.height;
                            }
                            else {
                                this.viewer.updateClientArea(curretBlock.bodyWidget, curretBlock.bodyWidget.page, true);
                                this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                            }
                        }
                        else {
                            if (prevWidget instanceof ParagraphWidget && prevWidget.height <= 0 && this.isMultiColumnDoc) {
                                var prevPara = prevWidget;
                                this.viewer.updateClientAreaForBlock(prevPara, true);
                                this.layoutParagraph(prevPara, 0);
                                this.viewer.updateClientArea(prevPara.bodyWidget, prevPara.bodyWidget.page, true);
                            }
                            this.viewer.cutFromTop(prevWidget.y + prevWidget.height);
                        }
                    }
                    else if (prevWidget instanceof ParagraphWidget && (prevWidget.isEndsWithPageBreak || prevWidget.isEndsWithColumnBreak) &&
                        prevWidget.containerWidget === curretBlock.containerWidget) {
                        this.moveBlocksToNextPage(prevWidget, false);
                    }
                }
                var currentParagraph = void 0;
                curretBlock = curretBlock.combineWidget(this.viewer);
                if (curretBlock instanceof TableWidget) {
                    this.clearTableWidget(curretBlock, true, true);
                    curretBlock.isGridUpdated = false;
                    currentParagraph = this.documentHelper.getFirstParagraphInFirstCell(curretBlock);
                }
                else {
                    currentParagraph = curretBlock;
                }
                if ((this.viewer.owner.isDocumentLoaded) && this.viewer.owner.editorModule) {
                    this.viewer.owner.editorModule.updateWholeListItems(currentParagraph);
                }
                this.viewer.updateClientAreaForBlock(curretBlock, true, undefined, false, true);
                this.isRelayout = true;
                this.documentHelper.layout.layoutBlock(curretBlock, 0);
                this.isRelayout = false;
                this.viewer.updateClientAreaForBlock(curretBlock, false);
                if (!isNullOrUndefined(bodyWidget.containerWidget) && bodyWidget.containerWidget instanceof FootNoteWidget) {
                    if (bodyWidget.containerWidget.footNoteType === 'Footnote') {
                        this.layoutfootNote(bodyWidget.containerWidget);
                    }
                }
                var footnote = bodyWidget;
                if (bodyWidget.containerWidget == undefined && !(bodyWidget instanceof TextFrame) && footnote.page != undefined && footnote.page.footnoteWidget != undefined) {
                    if (footnote.page.footnoteWidget.footNoteType === 'Footnote') {
                        this.layoutfootNote(footnote.page.footnoteWidget);
                    }
                }
                if (curretBlock.containerWidget instanceof BodyWidget) {
                    var blocks = curretBlock.getSplitWidgets();
                    var splittedWidget = blocks[blocks.length - 1];
                    pageIndexAfterLayout = splittedWidget.containerWidget.page.index;
                }
                if (shiftNextWidget) {
                    this.shiftNextWidgets(curretBlock);
                }
                else {
                    this.layoutNextItemsBlock(curretBlock, this.viewer, undefined, pageIndexBeforeLayout !== pageIndexAfterLayout);
                }
            }
            else if (bodyWidget instanceof TableCellWidget && !isSelectionInsideTable) {
                this.reLayoutTable(bodyWidget.ownerTable);
            }
        }
        this.isRelayoutFootnote = false;
    };
    /**
     * @private
     */
    Layout.prototype.checkAndGetBlock = function (containerWidget, blockIndex) {
        if (containerWidget instanceof TextFrame) {
            return containerWidget.childWidgets[blockIndex];
        }
        else {
            var sectionIndex = containerWidget.indexInOwner;
            if (containerWidget.page.bodyWidgets.length <= 1) {
                while (containerWidget && containerWidget.indexInOwner === sectionIndex) {
                    if (containerWidget.childWidgets.length > 0 && containerWidget.firstChild.index <= blockIndex &&
                        containerWidget.lastChild.index >= blockIndex) {
                        for (var i = 0; i < containerWidget.childWidgets.length; i++) {
                            var block = containerWidget.childWidgets[i];
                            if (block.index === blockIndex) {
                                return block;
                            }
                        }
                    }
                    if (containerWidget instanceof BodyWidget) {
                        containerWidget = containerWidget.nextRenderedWidget;
                    }
                    else {
                        break;
                    }
                }
            }
            else {
                while (containerWidget) {
                    if (containerWidget.childWidgets.length > 0) {
                        for (var i = 0; i < containerWidget.childWidgets.length; i++) {
                            var block = containerWidget.childWidgets[i];
                            if (block.index === blockIndex) {
                                return block;
                            }
                        }
                    }
                    if (containerWidget instanceof BodyWidget) {
                        containerWidget = containerWidget.nextRenderedWidget;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return undefined;
    };
    //#endregion
    //#region Table
    Layout.prototype.layoutTable = function (table, startIndex) {
        if (this.isFieldCode && !this.checkTableHasField(table) && !this.isRelayout) {
            table.isFieldCodeBlock = true;
            return table;
        }
        if (!isNullOrUndefined(table.previousWidget) && this.viewer.clientActiveArea.height < 0 && !table.wrapTextAround) {
            this.moveBlocksToNextPage(table.previousWidget, false);
        }
        table.isBidiTable = table.bidi;
        if (!table.isGridUpdated) {
            table.buildTableColumns();
            table.isGridUpdated = true;
        }
        if (this.documentHelper.compatibilityMode !== 'Word2013'
            && !table.isInsideTable
            && !isNullOrUndefined(table.firstChild.firstChild.leftMargin)) {
            this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
        }
        var tableView = [table];
        this.addTableWidget(this.viewer.clientActiveArea, tableView);
        this.viewer.updateClientAreaTopOrLeft(table, true);
        var clientActiveAreaForTableWrap;
        var clientAreaForTableWrap;
        var wrapDiff = 0;
        if (table.wrapTextAround) {
            clientActiveAreaForTableWrap = this.viewer.clientActiveArea.clone();
            clientAreaForTableWrap = this.viewer.clientArea.clone();
            this.updateClientAreaForWrapTable(tableView, table, true, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        else if (!(table.containerWidget instanceof TextFrame)) {
            this.adjustClientAreaBasedOnTextWrapForTable(table, this.viewer.clientActiveArea);
            if (this.isWrapText) {
                wrapDiff = this.viewer.clientActiveArea.x - this.viewer.clientArea.x;
                this.isWrapText = false;
                table.x = this.viewer.clientActiveArea.x;
            }
        }
        if (table.childWidgets.length > 0) {
            var isHeader = table.childWidgets[0].rowFormat.isHeader;
            table.header = isHeader;
            table.continueHeader = isHeader;
            table.headerHeight = 0;
        }
        var row = table.childWidgets[startIndex];
        var index = tableView.length;
        this.updateFootnoteHeight(table, true);
        while (row) {
            row = this.layoutRow(tableView, row);
            row = row.nextRow;
        }
        this.updateFootnoteHeight(table, false);
        if (this.documentHelper.viewer instanceof PageLayoutViewer && table.wrapTextAround && (table.positioning.verticalAlignment === 'Bottom' || table.positioning.verticalAlignment === 'Center' || table.positioning.verticalAlignment === 'Outside')) {
            this.updateTableFloatPoints(table);
            this.updateChildLocationForTable(table.y, table);
        }
        this.updateWidgetsToPage(tableView, [], table, true);
        if (wrapDiff > 0) {
            this.viewer.clientArea.x = this.viewer.clientArea.x - wrapDiff;
        }
        if (table.wrapTextAround) {
            this.updateClientAreaForWrapTable(tableView, table, false, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        tableView[tableView.length - 1].isLayouted = true;
        tableView[tableView.length - 1].isFieldCodeBlock = false;
        if (this.documentHelper.compatibilityMode !== 'Word2013'
            && !table.isInsideTable
            && !table.wrapTextAround
            && !isNullOrUndefined(table.firstChild.firstChild.leftMargin)) {
            this.viewer.clientArea.x = this.viewer.clientArea.x + HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
        }
        return tableView[tableView.length - 1];
    };
    Layout.prototype.updateFootnoteHeight = function (block, isUpdateFootHeight, getBottom) {
        if ((!this.isInitialLoad || getBottom) && !block.isInsideTable && !isNullOrUndefined(block.bodyWidget) && !isNullOrUndefined(block.bodyWidget.page.footnoteWidget) &&
            block.bodyWidget.page.footnoteWidget.footNoteType === 'Footnote') {
            var page = block.bodyWidget.page;
            var section = page.bodyWidgets[0];
            var pageHeight = HelperMethods.convertPointToPixel(section.sectionFormat.pageHeight);
            var top_2 = HelperMethods.convertPointToPixel(section.sectionFormat.topMargin);
            var bottomMargin = HelperMethods.convertPointToPixel(section.sectionFormat.bottomMargin);
            var bottom = 0.667 + bottomMargin;
            var isEmptyWidget = false;
            var headerDistance = 48;
            var footerDistance = 48;
            if (!isNullOrUndefined(section.sectionFormat)) {
                top_2 = HelperMethods.convertPointToPixel(section.sectionFormat.topMargin);
                headerDistance = HelperMethods.convertPointToPixel(section.sectionFormat.headerDistance);
                footerDistance = HelperMethods.convertPointToPixel(section.sectionFormat.footerDistance);
            }
            if (!isNullOrUndefined(page.headerWidget)) {
                isEmptyWidget = page.headerWidget.isEmpty;
                if (top_2 >= 0) {
                    if (!isEmptyWidget || isEmptyWidget && this.documentHelper.owner.enableHeaderAndFooter) {
                        top_2 = Math.min(Math.max(headerDistance + page.headerWidget.height, top_2), pageHeight / 100 * 40);
                    }
                }
                else {
                    top_2 = Math.abs(top_2);
                }
            }
            if (!isNullOrUndefined(page.footerWidget)) {
                isEmptyWidget = page.footerWidget.isEmpty;
                var footnoteHeight = !isNullOrUndefined(page.footnoteWidget) ? page.footnoteWidget.height : 0;
                footnoteHeight = Math.min(footnoteHeight, ((pageHeight - top_2 - bottom) / 100 * 90));
                if (bottom >= 0) {
                    if (!isEmptyWidget || isEmptyWidget && this.documentHelper.owner.enableHeaderAndFooter) {
                        bottom = 0.667 + Math.min(pageHeight / 100 * 40, Math.max(footerDistance + page.footerWidget.height, bottomMargin));
                    }
                }
                else {
                    bottom = Math.abs(bottom);
                }
                if (!getBottom) {
                    bottom += footnoteHeight;
                }
            }
            if (!isNullOrUndefined(page.footnoteWidget)) {
                var footnoteHeight = !isNullOrUndefined(page.footnoteWidget) ? page.footnoteWidget.height : 0;
                //bottom += footnoteHeight;
                var height = pageHeight - top_2 - bottom;
                if (getBottom) {
                    return height + this.viewer.clientArea.y;
                }
                if (isUpdateFootHeight && height === this.viewer.clientArea.height) {
                    this.viewer.clientArea.height += footnoteHeight;
                }
                else if (height + footnoteHeight === this.viewer.clientArea.height) {
                    this.viewer.clientArea.height -= footnoteHeight;
                }
            }
        }
        return 0;
    };
    Layout.prototype.updateClientAreaForWrapTable = function (tables, table, beforeLayout, clientActiveAreaForTableWrap, clientAreaForTableWrap) {
        if (beforeLayout) {
            if (table.wrapTextAround) {
                this.updateTableFloatPoints(table);
                var clienactare = this.viewer.clientActiveArea.clone();
                var rect = this.adjustClientAreaBasedOnTextWrapForTable(table, this.viewer.clientActiveArea);
                if (clienactare.x !== rect.x) {
                    table.x = this.viewer.clientActiveArea.x;
                }
                if (clienactare.y !== rect.y) {
                    table.y = this.viewer.clientActiveArea.y;
                }
            }
        }
        else {
            if (table.wrapTextAround && table.bodyWidget) {
                if (tables.length == 1) {
                    if (!isNullOrUndefined(table.previousWidget) || table.isInHeaderFooter || table.isInsideTable) {
                        var clientActiveArea = clientActiveAreaForTableWrap.clone();
                        var clientArea = clientAreaForTableWrap.clone();
                        if (table.bodyWidget.lastChild !== tables[tables.length - 1]) {
                            this.viewer.clientActiveArea = clientActiveArea;
                            this.viewer.clientArea = clientArea;
                        }
                        if (!table.isLayouted && clientActiveArea.height < table.height && table.width >= clientActiveArea.width) {
                            this.moveBlocksToNextPage(table.previousWidget, false);
                        }
                    }
                    else {
                        this.documentHelper.tableLefts.pop();
                        this.viewer.updateClientArea(table.bodyWidget, table.bodyWidget.page);
                    }
                    if (table.bodyWidget.floatingElements.indexOf(table) === -1) {
                        table.bodyWidget.floatingElements.push(table);
                    }
                }
                else {
                    if (!isNullOrUndefined(table.previousWidget) && !table.isLayouted && clientActiveAreaForTableWrap.height < table.height && table.width >= clientActiveAreaForTableWrap.width) {
                        var splittedTable_1 = table;
                        do {
                            this.moveBlocksToNextPage(splittedTable_1.previousWidget, false);
                            splittedTable_1 = splittedTable_1.nextSplitWidget;
                        } while (splittedTable_1);
                    }
                    this.documentHelper.tableLefts.pop();
                    this.viewer.updateClientArea(table.bodyWidget, table.bodyWidget.page);
                    for (var z = 0; z < tables.length; z++) {
                        var bodyWidget = tables[z].bodyWidget;
                        if (!isNullOrUndefined(bodyWidget) && bodyWidget.floatingElements.indexOf(tables[z]) === -1) {
                            bodyWidget.floatingElements.push(tables[z]);
                        }
                    }
                    var splittedTable = tables[tables.length - 1];
                    this.viewer.cutFromTop(this.viewer.clientActiveArea.y + splittedTable.height + splittedTable.tableFormat.borders.bottom.lineWidth);
                }
            }
        }
    };
    Layout.prototype.addTableWidget = function (area, table, create) {
        var tableWidget = table[table.length - 1];
        if (create) {
            tableWidget = this.createTableWidget(tableWidget);
            table.push(tableWidget);
        }
        tableWidget.width = area.width;
        tableWidget.x = area.x;
        tableWidget.y = area.y;
        //Update the table height of tableWidget when cell spacing has been defined.
        if (tableWidget.tableFormat.cellSpacing > 0) {
            tableWidget.height = tableWidget.height + HelperMethods.convertPointToPixel(tableWidget.tableFormat.cellSpacing);
            if (!tableWidget.isBidiTable) {
                /* eslint-disable-next-line max-len */
                tableWidget.leftBorderWidth = HelperMethods.convertPointToPixel(this.getTableLeftBorder(tableWidget.tableFormat.borders).getLineWidth());
                /* eslint-disable-next-line max-len */
                tableWidget.rightBorderWidth = HelperMethods.convertPointToPixel(this.getTableRightBorder(tableWidget.tableFormat.borders).getLineWidth());
            }
            else { // Right to left direction table.
                /* eslint-disable-next-line max-len */
                tableWidget.leftBorderWidth = HelperMethods.convertPointToPixel(this.getTableRightBorder(tableWidget.tableFormat.borders).getLineWidth());
                /* eslint-disable-next-line max-len */
                tableWidget.rightBorderWidth = HelperMethods.convertPointToPixel(this.getTableLeftBorder(tableWidget.tableFormat.borders).getLineWidth());
            }
            /* eslint-disable-next-line max-len */
            tableWidget.topBorderWidth = HelperMethods.convertPointToPixel(this.getTableTopBorder(tableWidget.tableFormat.borders).getLineWidth());
            /* eslint-disable-next-line max-len */
            tableWidget.bottomBorderWidth = HelperMethods.convertPointToPixel(this.getTableBottomBorder(tableWidget.tableFormat.borders).getLineWidth());
            tableWidget.x += tableWidget.leftBorderWidth;
            tableWidget.y += tableWidget.topBorderWidth;
            tableWidget.width -= tableWidget.leftBorderWidth;
            tableWidget.width -= tableWidget.rightBorderWidth;
            tableWidget.height += tableWidget.bottomBorderWidth;
        }
        return tableWidget;
    };
    Layout.prototype.updateWidgetsToPage = function (tables, rows, table, rearrangeRow, endRowWidget) {
        var viewer = this.viewer;
        var tableWidget = tables[tables.length - 1];
        if (!table.isInsideTable) {
            for (var i = 0; i < tables.length; i++) {
                this.updateHeightForTableWidget(tables, rows, tables[i], endRowWidget);
            }
            if (tableWidget.childWidgets.length > 0 && tableWidget.y !== tableWidget.childWidgets[0].y) {
                tableWidget.y = tableWidget.childWidgets[0].y;
            }
            // Need to update on this further
            //Adds the table widget to owner cell widget.
            // (viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as TableCellWidget).childWidgets.push(tableWidget);
            // tableWidget.containerWidget = viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as BodyWidget;
            // (viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as TableCellWidget).height = (viewer.renderedElements.get(table.associatedCell)[viewer.renderedElements.get(table.associatedCell).length - 1] as TableCellWidget).height + tableWidget.height;
        }
        // Shift the widgets for Right to left directed table.
        if (table.isBidiTable && rearrangeRow) {
            for (var i = 0; i < tables.length; i++) {
                var layoutedTable = tables[i];
                for (var j = 0; j < layoutedTable.childWidgets.length; j++) {
                    var layoutedRow = layoutedTable.childWidgets[j];
                    layoutedRow.shiftWidgetForRtlTable();
                }
            }
        }
        if (table.tableFormat.cellSpacing > 0) {
            /* eslint-disable-next-line max-len */
            if (tableWidget.y + tableWidget.height + HelperMethods.convertPointToPixel(table.tableFormat.cellSpacing) > viewer.clientArea.bottom && viewer instanceof WebLayoutViewer) {
                //update the table height when split to next page. Which is equivalent Ms Word Behaviour.
                //In Ms Word if the Table Split to next page the bottom spacing of the table will be half of the current spacing.
                //And the Remaining space will be used in next page top of the table.
                tableWidget.height = tableWidget.height - HelperMethods.convertPointToPixel(table.tableFormat.cellSpacing) / 2;
            }
            //Update the current Y position of current clientactivearea.
            viewer.cutFromTop(tableWidget.y + tableWidget.height);
        }
        if (this.viewer instanceof WebLayoutViewer) {
            table.containerWidget.height += table.height;
        }
        if (table.bodyWidget instanceof HeaderFooterWidget && !table.wrapTextAround) {
            table.containerWidget.height += table.height;
            if (this.viewer.owner.enableHeaderAndFooter && table.bodyWidget.headerFooterType.indexOf('Footer') !== -1) {
                this.shiftFooterChildLocation(table.bodyWidget, this.viewer);
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.updateHeightForTableWidget = function (tables, rows, tableWidget, endRowWidget) {
        for (var i = 0; i < tableWidget.childWidgets.length; i++) {
            var rowWidget = tableWidget.childWidgets[i];
            if (rowWidget === endRowWidget) {
                break;
            }
            this.updateHeightForRowWidget(this.viewer, true, tables, rows, rowWidget, false, endRowWidget);
        }
    };
    //#endregion
    //#region Row
    Layout.prototype.layoutRow = function (tableWidget, row, isRowLayout) {
        var isNestedTable = row.ownerTable.isInsideTable;
        if (!isNestedTable) {
            this.updateExistingFootnoteHeight(row);
        }
        var viewer = this.viewer;
        var rowWidgets = [row];
        this.addTableRowWidget(viewer.clientActiveArea, rowWidgets);
        viewer.updateClientAreaForRow(row, true);
        var topMargin = this.getMaxTopCellMargin(row);
        var bottomMargin = this.getMaxBottomCellMargin(row);
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            this.layoutCell(cell, topMargin + row.topBorderWidth, bottomMargin + row.bottomBorderWidth);
        }
        viewer.updateClientAreaForRow(row, false);
        var rows = [row];
        if (!isRowLayout) {
            this.updateWidgetsToTable(tableWidget, rows, row, false);
        }
        if (!isNestedTable) {
            this.layoutedFootnoteElement = [];
        }
        return rows[rows.length - 1];
    };
    Layout.prototype.updateExistingFootnoteHeight = function (row) {
        this.layoutedFootnoteElement = [];
        if (!isNullOrUndefined(row.bodyWidget.page.footnoteWidget) && row.bodyWidget.page.footnoteWidget.bodyWidgets.length !== 0) {
            this.existFootnoteHeight = row.bodyWidget.page.footnoteWidget.height;
        }
        else {
            this.existFootnoteHeight = 0;
        }
    };
    Layout.prototype.isIntersecting = function (startPosition, endPosition, adjacentStartPosition, adjacentEndPosition) {
        return ((HelperMethods.round(adjacentStartPosition, 2) <= HelperMethods.round(startPosition, 2) || HelperMethods.round(adjacentStartPosition, 2) < HelperMethods.round(endPosition, 2))
            && HelperMethods.round(adjacentEndPosition, 2) > HelperMethods.round(startPosition, 2));
    };
    Layout.prototype.getAdjacentRowCell = function (cell, cellStartPos, cellEndPos, rowIndex) {
        var adjCells = [];
        var columnLength = cell.ownerTable.tableHolder.columns.length;
        var adjRow = cell.ownerTable.childWidgets[rowIndex];
        if (isNullOrUndefined(adjRow)) {
            return adjCells;
        }
        var prevCellEndPos = 0;
        var prevCellEndIndex = 0;
        var colSpan = cell.cellFormat.columnSpan;
        var columnIndex = cell.columnIndex;
        if (adjRow.rowFormat.gridBefore > 0) {
            if (adjRow.rowFormat.gridBefore > columnIndex + colSpan) {
                //When previous rows Grid before occupies more than cell width, returns empty collection.
                return adjCells;
            }
            prevCellEndPos = adjRow.rowFormat.beforeWidth;
            prevCellEndIndex = adjRow.rowFormat.gridBefore;
        }
        for (var i = 0; i < adjRow.childWidgets.length; i++) {
            var adjCell = adjRow.childWidgets[i];
            var adjCellStartPos = adjCell.x - adjCell.margin.left;
            var adjCellEndPos = adjCell.x + adjCell.width + adjCell.margin.right;
            var adjCellEndIndex = adjCell.columnIndex + adjCell.cellFormat.columnSpan;
            if (i == adjRow.childWidgets.length - 1 ||
                (HelperMethods.round(adjCellStartPos, 2) > HelperMethods.round(prevCellEndPos, 2)
                    && HelperMethods.round(adjCellStartPos, 2) > HelperMethods.round(cellStartPos, 2))) {
                if (i == adjRow.childWidgets.length - 1 && adjRow.rowFormat.gridAfter > 0
                    && adjCellEndIndex + adjRow.rowFormat.gridAfter === columnLength) {
                    //Only grid after present after this adjacent cell, no need to continue next.
                    return adjCells;
                }
                //When there is difference in adjacent cell start position and previous cell end position, there is an vertical merge continued cell.
                //Iterates with the previous end cell column index till adjacent cell's column index to retrieve the vertical merge start cell in that region.
                if (this.isIntersecting(cellStartPos, cellEndPos, prevCellEndPos, adjCellStartPos)) {
                    while (colSpan > 0) {
                        var prevRowAdjCell = adjRow.getVerticalMergeStartCell(columnIndex, colSpan);
                        var prevRowAdjCellEndPos = 0;
                        if (!isNullOrUndefined(prevRowAdjCell)) {
                            var adjCellColumnSpan = prevRowAdjCell.cellFormat.columnSpan;
                            adjCells.push(prevRowAdjCell);
                            prevRowAdjCellEndPos = prevRowAdjCell.x + prevRowAdjCell.width + prevRowAdjCell.margin.right;
                            cellStartPos = prevRowAdjCellEndPos;
                            prevCellEndIndex = prevRowAdjCell.columnIndex + adjCellColumnSpan;
                            colSpan -= prevCellEndIndex - columnIndex;
                            columnIndex = prevCellEndIndex;
                            if (HelperMethods.round(prevRowAdjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2)) {
                                break;
                            }
                        }
                        else {
                            break;
                        }
                    }
                }
            }
            if (this.isIntersecting(cellStartPos, cellEndPos, adjCellStartPos, adjCellEndPos)) {
                adjCells.push(adjCell);
                cellStartPos = adjCellEndPos;
                colSpan -= adjCellEndIndex - columnIndex;
                columnIndex = adjCellEndIndex;
            }
            if (HelperMethods.round(adjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2)) {
                //Once Adjacent cell end position reaches the current cell end position, no need to iterate next.
                break;
            }
            prevCellEndPos = adjCellEndPos;
            prevCellEndIndex = adjCellEndIndex;
        }
        return adjCells;
    };
    Layout.prototype.addTableRowWidget = function (area, row) {
        var rowWidget = row[row.length - 1];
        if ((rowWidget.rowFormat.beforeWidth !== 0 || rowWidget.rowFormat.gridBeforeWidth !== 0) && ((this.documentHelper.alignTablesRowByRow) ? rowWidget.ownerTable.tableFormat.tableAlignment === 'Left' : true)) {
            rowWidget.x += (rowWidget.rowFormat.beforeWidth !== 0) ? rowWidget.rowFormat.beforeWidth : rowWidget.rowFormat.gridBeforeWidth;
        }
        else {
            rowWidget.x = area.x;
        }
        rowWidget.y = area.y;
        rowWidget.width = area.width;
        var borderWidth = 0;
        if (!isNullOrUndefined(rowWidget.ownerTable) && !isNullOrUndefined(rowWidget.ownerTable.tableFormat)
            && rowWidget.ownerTable.tableFormat.cellSpacing > 0) {
            rowWidget.height = rowWidget.height + HelperMethods.convertPointToPixel(rowWidget.ownerTable.tableFormat.cellSpacing);
            //Update the table height with the border width to layout the border when the cell spacing is defined..
            for (var j = 0; j < rowWidget.childWidgets.length; j++) {
                if (!isNullOrUndefined(rowWidget.childWidgets[j].cellFormat)
                    && !isNullOrUndefined(rowWidget.childWidgets[j].cellFormat.borders)) {
                    /* eslint-disable-next-line max-len */
                    var width = TableCellWidget.getCellBottomBorder(rowWidget.childWidgets[j]).getLineWidth();
                    if (width > borderWidth) {
                        borderWidth = width;
                    }
                }
            }
            //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
            rowWidget.bottomBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
            if (rowWidget.index > 0 && !isNullOrUndefined(rowWidget.previousWidget)) {
                var prevRow = rowWidget.previousWidget;
                borderWidth = 0;
                for (var i = 0; i < prevRow.childWidgets.length; i++) {
                    /* eslint-disable-next-line max-len */
                    if (!isNullOrUndefined(prevRow.childWidgets[i].cellFormat) && !isNullOrUndefined(prevRow.childWidgets[i].cellFormat.borders)) {
                        /* eslint-disable-next-line max-len */
                        var value = TableCellWidget.getCellBottomBorder(prevRow.childWidgets[i]).getLineWidth();
                        if (value > borderWidth) {
                            borderWidth = value;
                        }
                    }
                }
                //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
                rowWidget.topBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
            }
        }
        if (!isNullOrUndefined(rowWidget.childWidgets)) {
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                if (!isNullOrUndefined(rowWidget.childWidgets[i].cellFormat) && !isNullOrUndefined(rowWidget.childWidgets[i].cellFormat.borders)) {
                    /* eslint-disable-next-line max-len */
                    var topBorderWidth = TableCellWidget.getCellTopBorder(rowWidget.childWidgets[i]).getLineWidth();
                    if (topBorderWidth > borderWidth) {
                        borderWidth = topBorderWidth;
                    }
                }
            }
        }
        //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
        rowWidget.topBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
        //Update the table height of tableWidget when cell spacing has been defined.
        /* eslint-disable-next-line max-len */
        if (!isNullOrUndefined(rowWidget.ownerTable) && !isNullOrUndefined(rowWidget.ownerTable.tableFormat) && rowWidget.ownerTable.tableFormat.cellSpacing <= 0 && rowWidget.rowIndex === rowWidget.ownerTable.childWidgets.length - 1) {
            // Update the bottom width for last row .
            for (var i = 0; i < rowWidget.childWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                if (!isNullOrUndefined(rowWidget.childWidgets[i].cellFormat) && !isNullOrUndefined(rowWidget.childWidgets[i].cellFormat.borders)) {
                    /* eslint-disable-next-line max-len */
                    var bottomBorderWidth = TableCellWidget.getCellBottomBorder(rowWidget.childWidgets[i]).getLineWidth();
                    if (bottomBorderWidth > borderWidth) {
                        borderWidth = bottomBorderWidth;
                    }
                }
            }
            //Maximum border width is calculated and hold it in a variable to add with the padding of the cells.
            rowWidget.bottomBorderWidth = HelperMethods.convertPointToPixel(borderWidth);
        }
        //tableRowWidget.ownerWidget = owner;
        return rowWidget;
    };
    Layout.prototype.getMaxTopCellMargin = function (row) {
        if (isNullOrUndefined(row.childWidgets)) {
            return 0;
        }
        var value = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            var topMargin = 0;
            if (cell.cellFormat.hasValue('topMargin')) {
                topMargin = HelperMethods.convertPointToPixel(cell.cellFormat.topMargin);
            }
            else if (row.rowFormat.hasValue('topMargin')) {
                topMargin = HelperMethods.convertPointToPixel(row.rowFormat.topMargin);
            }
            else {
                topMargin = HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.topMargin);
            }
            if (topMargin > value) {
                value = topMargin;
            }
        }
        return value;
    };
    Layout.prototype.getMaxBottomCellMargin = function (row) {
        if (isNullOrUndefined(row.childWidgets)) {
            return 0;
        }
        var value = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            var bottomMargin = 0;
            if (cell.cellFormat.hasValue('bottomMargin')) {
                bottomMargin = HelperMethods.convertPointToPixel(cell.cellFormat.bottomMargin);
            }
            else if (row.rowFormat.hasValue('bottomMargin')) {
                bottomMargin = HelperMethods.convertPointToPixel(row.rowFormat.bottomMargin);
            }
            else {
                bottomMargin = HelperMethods.convertPointToPixel(row.ownerTable.tableFormat.bottomMargin);
            }
            if (bottomMargin > value) {
                value = bottomMargin;
            }
        }
        return value;
    };
    //#endregion Row
    //#region cell
    Layout.prototype.layoutCell = function (cell, maxCellMarginTop, maxCellMarginBottom) {
        var viewer = this.viewer;
        this.addTableCellWidget(cell, viewer.clientActiveArea, maxCellMarginTop, maxCellMarginBottom);
        this.updateTopBorders(cell);
        viewer.updateClientAreaForCell(cell, true);
        if (cell.childWidgets.length === 0) {
            var paragraphWidget = new ParagraphWidget();
            paragraphWidget.characterFormat = new WCharacterFormat();
            paragraphWidget.paragraphFormat = new WParagraphFormat();
            paragraphWidget.index = 0;
            var lineWidget = new LineWidget(paragraphWidget);
            paragraphWidget.childWidgets.push(lineWidget);
            cell.childWidgets.push(paragraphWidget);
            paragraphWidget.paragraphFormat.borders = new WBorders();
        }
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            viewer.updateClientAreaForBlock(block, true);
            block.containerWidget = cell;
            this.layoutBlock(block, 0);
            viewer.updateClientAreaForBlock(block, false);
        }
        this.updateWidgetToRow(cell);
        viewer.updateClientAreaForCell(cell, false);
    };
    Layout.prototype.isInsertTable = function () {
        if (this.documentHelper.owner.editorHistoryModule && this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo && this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.action === 'InsertTable')
            return true;
        else
            return false;
    };
    Layout.prototype.updateTopBorders = function (cell) {
        cell.updatedTopBorders = [];
        if (cell.ownerTable.tableFormat.cellSpacing === 0) {
            var cellTopBorder = cell.cellFormat.borders.top;
            if (!cellTopBorder.isBorderDefined || (cellTopBorder.isBorderDefined
                && cellTopBorder.lineStyle === 'None' && cellTopBorder.lineWidth === 0 &&
                cellTopBorder.hasValue('color'))) {
                cellTopBorder = cell.ownerRow.rowFormat.borders.horizontal;
            }
            if (!cellTopBorder.isBorderDefined) {
                cellTopBorder = cell.ownerRow.ownerTable.tableFormat.borders.horizontal;
            }
            var cellStartPos = cell.x - cell.margin.left;
            var cellEndPos = cell.x + cell.width + cell.margin.right;
            var adjCells = this.getAdjacentRowCell(cell, cellStartPos, cellEndPos, cell.ownerRow.indexInOwner - 1);
            for (var j = 0; j < adjCells.length; j++) {
                var adjCell = adjCells[j];
                var prevCellBottomBorder = adjCell.cellFormat.borders.bottom;
                if (!prevCellBottomBorder.isBorderDefined || (prevCellBottomBorder.isBorderDefined
                    && prevCellBottomBorder.lineStyle === 'None' && prevCellBottomBorder.lineWidth === 0 &&
                    prevCellBottomBorder.hasValue('color'))) {
                    prevCellBottomBorder = adjCell.ownerRow.rowFormat.borders.horizontal;
                }
                if (!prevCellBottomBorder.isBorderDefined) {
                    prevCellBottomBorder = adjCell.ownerRow.ownerTable.tableFormat.borders.horizontal;
                }
                var border = void 0;
                if (cellTopBorder.lineStyle === 'None' || cellTopBorder.lineStyle === 'Cleared') {
                    border = prevCellBottomBorder;
                }
                else if (prevCellBottomBorder.lineStyle === 'Cleared' || prevCellBottomBorder.lineStyle === 'None') {
                    border = cellTopBorder;
                }
                else {
                    border = cell.getBorderBasedOnPriority(cellTopBorder, prevCellBottomBorder);
                }
                var adjCellStartPos = adjCell.x - adjCell.margin.left;
                var adjCellEndPos = adjCell.x + adjCell.width + adjCell.margin.right;
                if (j === 0 && cellStartPos < adjCellStartPos) {
                    cell.updatedTopBorders.push({ border: cellTopBorder, width: (adjCellStartPos - cellStartPos) });
                }
                if (border) {
                    var width = 0;
                    /* eslint-disable-next-line max-len */
                    if (HelperMethods.round(adjCellEndPos, 2) === HelperMethods.round(cellEndPos, 2) && HelperMethods.round(adjCellStartPos, 2) === HelperMethods.round(cellStartPos, 2)) {
                        width = cellEndPos - cellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) >= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2)) {
                        width = cellEndPos - adjCellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) >= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) <= HelperMethods.round(cellEndPos, 2)) {
                        width = adjCellEndPos - adjCellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) <= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) <= HelperMethods.round(cellEndPos, 2)) {
                        width = adjCellEndPos - cellStartPos;
                        /* eslint-disable-next-line max-len */
                    }
                    else if (HelperMethods.round(adjCellStartPos, 2) <= HelperMethods.round(cellStartPos, 2) && HelperMethods.round(adjCellEndPos, 2) >= HelperMethods.round(cellEndPos, 2)) {
                        width = cellEndPos - cellStartPos;
                    }
                    else {
                        width = cellEndPos - cellStartPos;
                    }
                    if (width < 0) {
                        width = 0;
                    }
                    cell.updatedTopBorders.push({ border: border, width: width });
                }
                if (j === (adjCells.length - 1) && cellEndPos > adjCellEndPos) {
                    cell.updatedTopBorders.push({ border: cellTopBorder, width: (cellEndPos - adjCellEndPos) });
                }
            }
        }
    };
    //endregion cell
    //#region Shifting
    Layout.prototype.shiftLayoutedItems = function (reLayout, isMultiColumnShift) {
        if (isNullOrUndefined(this.documentHelper.blockToShift) || isNullOrUndefined(this.documentHelper.blockToShift.containerWidget) || (this.viewer.owner.editorModule && this.viewer.owner.editorModule.restrictLayout)) {
            this.documentHelper.blockToShift = undefined;
            this.checkAndShiftEndnote();
            if (!reLayout) {
                this.documentHelper.removeEmptyPages();
            }
            return;
        }
        var block = this.documentHelper.blockToShift;
        var isColumnBreak = this.getColumnBreak(block.bodyWidget);
        if (!isColumnBreak && this.viewer instanceof PageLayoutViewer && !this.isMultiColumnSplit && block === block.bodyWidget.firstChild && !isNullOrUndefined(block.bodyWidget.previousRenderedWidget) && block.bodyWidget.sectionIndex !== block.bodyWidget.previousRenderedWidget.sectionIndex && block.bodyWidget.previousRenderedWidget.sectionFormat.columns.length > 1) {
            var previousBodyWidget = block.bodyWidget.previousRenderedWidget;
            var lastbody = this.getBodyWidget(previousBodyWidget, false);
            if (!isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.page === lastbody.nextRenderedWidget.page) {
                this.splitBodyWidgetBasedOnColumn(previousBodyWidget);
            }
        }
        var isFirstBlock = false;
        var lastPage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
        var lastSection = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
        if ((!isColumnBreak || (reLayout && this.isSectionEndsWithColumnBreak(block.bodyWidget))) && this.viewer instanceof PageLayoutViewer && !this.isMultiColumnSplit && block.bodyWidget.sectionFormat.columns.length > 1) {
            // let lastbody: BodyWidget = this.getBodyWidget(block.bodyWidget, false);
            // if (((!isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.page === (lastbody.nextRenderedWidget as BodyWidget).page) && !(block.bodyWidget.firstChild === block && isNullOrUndefined(block.bodyWidget.previousWidget) && this.viewer.clientActiveArea.height > (block.firstChild as Widget).height))|| (this.documentHelper.endnoteCollection.length > 0 && lastSection === lastbody)) {
            if (block.bodyWidget.columnIndex === 0 && block === block.bodyWidget.firstChild && !isNullOrUndefined(block.previousRenderedWidget) && block.bodyWidget.page === block.previousRenderedWidget.bodyWidget.page) {
                block.bodyWidget.y = this.viewer.clientActiveArea.y;
            }
            isFirstBlock = block === block.bodyWidget.firstChild;
            this.reLayoutMultiColumn(block.bodyWidget, isFirstBlock, block.index);
            if (isNullOrUndefined(this.documentHelper.blockToShift)) {
                return;
            }
            block = this.documentHelper.blockToShift;
            // }
        }
        var sectionIndex = block.bodyWidget.index;
        this.reLayoutOrShiftWidgets(block, this.viewer, isMultiColumnShift);
        var updateNextBlockList = true;
        // If flow layout, then all sections are in single page. Hence need to update till last block of last section.
        // Todo: For page layout and section break continuous, need to handle the same.
        var splittedWidget = block.getSplitWidgets();
        var nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        var footnoteCollection = [];
        while (nextBlock instanceof BlockWidget && (nextBlock.bodyWidget.index === sectionIndex || (nextBlock.bodyWidget.sectionFormat.breakCode === 'NoBreak' && block.bodyWidget.sectionFormat.pageWidth === nextBlock.bodyWidget.sectionFormat.pageWidth && block.bodyWidget.sectionFormat.pageHeight === nextBlock.bodyWidget.sectionFormat.pageHeight))) {
            if (isMultiColumnShift && nextBlock.bodyWidget.sectionFormat.columns.length === 0) {
                return;
            }
            isColumnBreak = this.getColumnBreak(nextBlock.bodyWidget);
            if ((!isColumnBreak || (reLayout && this.isSectionEndsWithColumnBreak(nextBlock.bodyWidget))) && this.viewer instanceof PageLayoutViewer && !this.isMultiColumnSplit && nextBlock.bodyWidget.sectionFormat.columns.length > 1) {
                // let lastbody: BodyWidget = this.getBodyWidget(nextBlock.bodyWidget, false);
                // if (((!isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.page === (lastbody.nextRenderedWidget as BodyWidget).page) && !(nextBlock.bodyWidget.firstChild === nextBlock && isNullOrUndefined(nextBlock.bodyWidget.previousWidget) && this.viewer.clientActiveArea.height > (nextBlock.firstChild as Widget).height))|| (this.documentHelper.endnoteCollection.length > 0 && lastSection === lastbody)) {
                if (nextBlock.bodyWidget.columnIndex === 0 && nextBlock === nextBlock.bodyWidget.firstChild && !isNullOrUndefined(nextBlock.previousRenderedWidget) && nextBlock.bodyWidget.page === nextBlock.previousRenderedWidget.bodyWidget.page) {
                    nextBlock.bodyWidget.y = this.viewer.clientActiveArea.y;
                }
                isFirstBlock = nextBlock === nextBlock.bodyWidget.firstChild;
                this.reLayoutMultiColumn(nextBlock.bodyWidget, isFirstBlock, nextBlock.index);
                if (isNullOrUndefined(this.documentHelper.blockToShift)) {
                    return;
                }
                nextBlock = this.documentHelper.blockToShift;
                // }
            }
            var currentWidget = undefined;
            var blocks = block.getSplitWidgets();
            currentWidget = blocks[blocks.length - 1];
            block = nextBlock;
            updateNextBlockList = false;
            var nextWidget = undefined;
            blocks = block.getSplitWidgets();
            if (block instanceof ParagraphWidget) {
                nextWidget = blocks[0];
            }
            else {
                if (block instanceof TableWidget) {
                    nextWidget = blocks[0];
                }
            }
            if (!this.documentHelper.owner.editorModule.isFootnoteElementRemoved && currentWidget.containerWidget === nextWidget.containerWidget
                && (HelperMethods.round(nextWidget.y, 2) === HelperMethods.round(this.viewer.clientActiveArea.y, 2)) &&
                isNullOrUndefined(nextWidget.nextWidget)) {
                break;
            }
            if (!isNullOrUndefined(currentWidget.floatingElements)) {
                //this.shiftLayoutFloatingItems(currentWidget as ParagraphWidget);
            }
            updateNextBlockList = true;
            // Here, we have added this condition to skip the non-layouted blocks during relayouting.
            if (!block.isFieldCodeBlock) {
                this.reLayoutOrShiftWidgets(block, this.viewer, isMultiColumnShift, footnoteCollection);
            }
            if (this.keepWithNext) {
                block = this.documentHelper.blockToShift;
                this.keepWithNext = false;
            }
            if (!this.isMultiColumnSplit && isColumnBreak && block.bodyWidget.sectionFormat.numberOfColumns > 1 && block.bodyWidget.nextWidget && block.nextRenderedWidget && block.bodyWidget.index !== block.nextRenderedWidget.bodyWidget.index) {
                var clientY = this.viewer.clientActiveArea.y;
                var clientHeight = this.viewer.clientActiveArea.height;
                this.viewer.updateClientArea(block.bodyWidget.nextWidget, block.bodyWidget.nextWidget.page);
                this.viewer.clientActiveArea.height = clientHeight;
                this.viewer.clientActiveArea.y = clientY;
            }
            if (this.isMultiColumnSplit && block.bodyWidget.sectionFormat.numberOfColumns > 1 && block === block.bodyWidget.lastChild && !isNullOrUndefined(block.bodyWidget.nextRenderedWidget) && block.bodyWidget.sectionIndex !== block.bodyWidget.nextRenderedWidget.sectionIndex && block.bodyWidget.page === block.bodyWidget.nextRenderedWidget.page) {
                return;
            }
            splittedWidget = block.getSplitWidgets();
            nextBlock = splittedWidget[splittedWidget.length - 1].nextRenderedWidget;
        }
        if (this.viewer.owner.editorModule) {
            this.viewer.owner.editorModule.updateListItemsTillEnd(block, updateNextBlockList);
        }
        this.documentHelper.blockToShift = undefined;
        var viewer = this.viewer;
        if (viewer.owner.editorModule.isFootnoteElementRemoved) {
            var lastPage_1 = this.documentHelper.pages[this.documentHelper.pages.length - 1];
            var lastChild = lastPage_1.bodyWidgets[lastPage_1.bodyWidgets.length - 1];
            var endNote = lastPage_1.endnoteWidget;
            if (!isNullOrUndefined(endNote)) {
                var clientArea = this.viewer.clientArea.clone();
                var clientActiveArea = this.viewer.clientActiveArea.clone();
                var y = lastChild.y;
                if (lastChild.childWidgets.length > 0) {
                    var lastPageLastPara = lastChild.childWidgets[lastChild.childWidgets.length - 1];
                    y = lastPageLastPara.y + lastPageLastPara.height;
                }
                this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - y;
                this.viewer.clientActiveArea.x = this.viewer.clientArea.x;
                this.viewer.clientActiveArea.width = this.viewer.clientArea.width;
                this.viewer.clientActiveArea.y = y;
                this.layoutfootNote(endNote);
                this.viewer.clientArea = clientArea;
                this.viewer.clientActiveArea = clientActiveArea;
            }
        }
        // if (viewer instanceof PageLayoutViewer) {
        this.documentHelper.removeEmptyPages();
        this.updateFieldElements(reLayout);
        var firstPage = this.documentHelper.pages[0];
        if (firstPage.bodyWidgets[0].sectionIndex > 0) {
            var page = firstPage;
            do {
                this.documentHelper.layout.layoutHeaderFooter(page.bodyWidgets[0], this.viewer, page);
                page = page.nextPage;
            } while (page);
            while (firstPage.bodyWidgets[0].sectionIndex > 0) {
                this.documentHelper.owner.editorModule.updateSectionIndex(undefined, firstPage.bodyWidgets[0], false);
            }
        }
        if (!(block.bodyWidget instanceof FootNoteWidget) && !this.isRelayoutFootnote && block.bodyWidget.page.endnoteWidget) {
            this.checkAndShiftEndnote(true);
        }
        if (((!this.documentHelper.owner.enableLockAndEdit && !this.documentHelper.owner.enableHeaderAndFooter) || !reLayout) && !this.isMultiColumnSplit) {
            viewer.updateScrollBars();
        }
        // }
    };
    Layout.prototype.isSectionEndsWithColumnBreak = function (section) {
        if (!isNullOrUndefined(section) && section.childWidgets.length > 0 && section.lastChild instanceof ParagraphWidget) {
            var paragraph = section.lastChild;
            return paragraph.isEndsWithColumnBreak;
        }
        return false;
    };
    /**
     * @private
     */
    Layout.prototype.checkAndShiftEndnote = function (isRelayout) {
        if (this.documentHelper.owner.selectionModule) {
            var endBlock = this.documentHelper.owner.selectionModule.end.paragraph;
            if (endBlock.isInsideTable) {
                endBlock = this.getParentTable(endBlock);
            }
            if (endBlock && !endBlock.isInHeaderFooter && !(endBlock.bodyWidget.containerWidget instanceof FootNoteWidget) && (isNullOrUndefined(endBlock.nextRenderedWidget) || isRelayout)) {
                if (!(endBlock.bodyWidget instanceof FootNoteWidget) && !this.isRelayoutFootnote
                    && endBlock.bodyWidget.page.endnoteWidget) {
                    var page = endBlock.bodyWidget.page;
                    var clientActiveArea = this.viewer.clientActiveArea.clone();
                    var bodyWidget = this.getBodyWidget(page.bodyWidgets[page.bodyWidgets.length - 1], true);
                    this.viewer.updateClientArea(bodyWidget, bodyWidget.page);
                    var height = this.getNextWidgetHeight(bodyWidget);
                    if (height > 0) {
                        this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                        this.viewer.clientActiveArea.y = height;
                    }
                    this.layoutfootNote(page.endnoteWidget);
                    this.viewer.clientActiveArea = clientActiveArea;
                }
            }
            else if (this.isEndnoteContentChanged && isRelayout && !this.isRelayoutFootnote) {
                this.reLayoutEndnote();
            }
        }
    };
    Layout.prototype.updateFieldElements = function (reLayout) {
        for (var i = 0; i < this.documentHelper.fields.length; i++) {
            var fieldBegin = this.documentHelper.fields[i];
            if (this.viewer instanceof PageLayoutViewer || (this.viewer instanceof WebLayoutViewer && !(fieldBegin.line.paragraph.containerWidget instanceof TextFrame || fieldBegin.line.paragraph.bodyWidget instanceof HeaderFooterWidget))) {
                if (!isNullOrUndefined(this.documentHelper.selection)) {
                    var fieldCode = this.documentHelper.selection.getFieldCode(fieldBegin);
                    var regex = /^(?!.*\bhyperlink\b)(?!.*\bnumpages\b).*\bpage\b.*$/;
                    if (!isNullOrUndefined(fieldCode) && (fieldCode.toLowerCase().match('numpages') || fieldCode.toLowerCase().match('sectionpages') || (regex.test(fieldCode.toLowerCase()) && reLayout)) && !isNullOrUndefined(fieldBegin.fieldSeparator)) {
                        var textElement = fieldBegin.fieldSeparator.nextNode;
                        if (!isNullOrUndefined(textElement)) {
                            var prevPageNum = textElement.text;
                            var paragraph = fieldBegin.line.paragraph;
                            if (!isNullOrUndefined(paragraph.containerWidget) && (paragraph.containerWidget instanceof BodyWidget) && paragraph.containerWidget.indexInOwner === -1) {
                                continue;
                            }
                            if (!isNullOrUndefined(paragraph.bodyWidget) && !isNullOrUndefined(paragraph.bodyWidget.page) && paragraph.bodyWidget.page.index !== -1) {
                                if (regex.test(fieldCode.toLowerCase())) {
                                    var index = paragraph.bodyWidget.page.index + 1;
                                    textElement.text = index.toString();
                                }
                                else {
                                    textElement.text = this.documentHelper.pages.length.toString();
                                }
                                if (prevPageNum !== textElement.text) {
                                    textElement.isWidthUpdated = false;
                                    var lineIndex = paragraph.childWidgets.indexOf(fieldBegin.line);
                                    var elementIndex = fieldBegin.line.children.indexOf(textElement);
                                    if (paragraph.isInsideTable) {
                                        this.reLayoutParagraph(paragraph, lineIndex, elementIndex);
                                    }
                                    else {
                                        this.reLayoutLine(paragraph, lineIndex, false, false, true);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    Layout.prototype.reLayoutOrShiftWidgets = function (blockAdv, viewer, isMultiColumnShift, footnoteCollection) {
        var block = blockAdv;
        var isRealyoutList = false;
        // if (block instanceof ParagraphWidget) {
        //     reLayoutItems = viewer.renderedElements.get(block as ParagraphWidget).length === 0;
        // } else {
        //     reLayoutItems = viewer.renderedElements.get(block as TableWidget).length === 0;
        // }
        if (this.isNeedToRelayout(blockAdv.bodyWidget) || this.isPageBreakInsideContentControl(blockAdv)) {
            if (!this.isMultiColumnSplit) {
                this.updateContainerForTable(block, viewer);
            }
            //Handle layouting the block.
            if (block instanceof TableWidget) {
                block = block.combineWidget(this.viewer);
                this.clearTableWidget(block, true, true, true);
            }
            viewer.updateClientAreaForBlock(block, true);
            if (block.wrapTextAround) {
                block.isLayouted = false;
            }
            this.isRelayout = true;
            this.layoutBlock(block, 0);
            this.isRelayout = false;
            viewer.updateClientAreaForBlock(block, false);
            isRealyoutList = true;
        }
        else {
            //Handled to check client area and shift layouted widget.
            this.shiftWidgetsBlock(block, viewer, footnoteCollection);
        }
        var index = this.documentHelper.pages.indexOf(block.bodyWidget.page);
        if (index > 0 && block === block.bodyWidget.childWidgets[0] && block instanceof ParagraphWidget) {
            var val = block.bodyWidget.childWidgets[0].childWidgets[0].children;
            for (var i = 0; i < val.length; i++) {
                var element = val[i];
                if (element.margin.top > 0 && element.margin.top === this.getBeforeSpacing(element.paragraph)) {
                    element.margin.top -= this.getBeforeSpacing(element.paragraph);
                }
            }
        }
        //Updates the list value of the rendered paragraph.
        if (this.viewer.owner.editorModule && !isRealyoutList && !isMultiColumnShift) {
            this.viewer.owner.editorModule.updateRenderedListItems(block);
        }
        if (!this.isRelayoutFootnote && block.bodyWidget.page.footnoteWidget) {
            this.islayoutFootnote = true;
            this.layoutfootNote(block.bodyWidget.page.footnoteWidget);
        }
        // }
    };
    Layout.prototype.isNeedToRelayout = function (bodyWidget) {
        for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
            var floatElement = bodyWidget.floatingElements[i];
            if (floatElement instanceof TableWidget || (floatElement instanceof ShapeBase &&
                (floatElement.textWrappingStyle === 'Square' || floatElement.textWrappingStyle === 'TopAndBottom'))) {
                return true;
            }
        }
        return false;
    };
    Layout.prototype.shiftWidgetsBlock = function (block, viewer, footnoteCollection) {
        if (block instanceof ParagraphWidget) {
            this.shiftWidgetsForPara(block, viewer, footnoteCollection);
        }
        else if (block instanceof TableWidget) {
            if (!isNullOrUndefined(footnoteCollection) && footnoteCollection.length > 0 && block.previousRenderedWidget && block.previousRenderedWidget.y + block.previousRenderedWidget.height + block.height > this.viewer.clientArea.bottom) {
                footnoteCollection.length = 0;
            }
            this.shiftWidgetsForTable(block, viewer);
        }
    };
    Layout.prototype.shiftWidgetsForPara = function (paragraph, viewer, footnoteCollection) {
        if (paragraph.height > (viewer.clientArea.height + viewer.clientArea.y) && !this.documentHelper.owner.enableHeaderAndFooter) {
            return;
        }
        else if (paragraph.isEmpty()) {
            //Handled sections last paragraph need to be layouted in previous paragraph if the paragraph is empty. Similar to Ms word
            var previousWidget = paragraph.previousRenderedWidget;
            if (paragraph.isSectionBreak && paragraph.index > 0) {
                if (previousWidget instanceof ParagraphWidget) {
                    this.layoutSectionBreakParagraph(paragraph, previousWidget);
                    if (!previousWidget.isEndsWithPageBreak && this.viewer.clientActiveArea.y <= paragraph.y) {
                        this.viewer.cutFromTop(paragraph.y + paragraph.height);
                    }
                    return;
                }
                else if (previousWidget instanceof TableWidget && this.documentHelper.compatibilityMode !== 'Word2013') {
                    return;
                }
            }
        }
        var bodywid = paragraph.bodyWidget;
        var prevBodyObj = this.getBodyWidgetOfPreviousBlock(paragraph, 0);
        var prevBodyWidget = prevBodyObj.bodyWidget;
        var index = prevBodyObj.index;
        var prevWidget = undefined;
        var skipFootNoteHeight = false;
        var isSkip = true;
        for (var i = 0; i < paragraph.getSplitWidgets().length; i++) {
            var widget = paragraph.getSplitWidgets()[i];
            var firstBody = this.getBodyWidget(widget.bodyWidget, true);
            if (this.isMultiColumnSplit && widget !== paragraph) {
                continue;
            }
            if (isSkip && !isNullOrUndefined(prevWidget)) {
                var isPageBreak = prevWidget.lastChild ? prevWidget.lastChild.isEndsWithPageBreak : false;
                var isColumnBreak = prevWidget.lastChild ? prevWidget.lastChild.isEndsWithColumnBreak : false;
                this.shiftToPreviousWidget(widget, viewer, prevWidget, isPageBreak, isColumnBreak);
                this.updateFloatingElementPosition(prevWidget);
                if ((isNullOrUndefined(widget.childWidgets) || widget.childWidgets.length === 0) && !isPageBreak && !isColumnBreak) {
                    i--;
                    continue;
                }
                if (prevBodyWidget !== widget.containerWidget) {
                    prevBodyWidget = widget.containerWidget;
                    if (isPageBreak && prevWidget !== widget.previousSplitWidget) {
                        viewer.updateClientAreaByWidget(widget);
                    }
                }
                prevWidget = undefined;
            }
            var footWidget = [];
            if (!skipFootNoteHeight) {
                footWidget = this.getFootNoteWidgetsOf(widget);
            }
            var footHeight = 0;
            var isSplit = false;
            if (!this.isMultiColumnSplit && !widget.isInsideTable && !isNullOrUndefined(footnoteCollection) && footnoteCollection.length > 0 && this.isFitInClientArea(widget, viewer, footWidget) && widget.previousRenderedWidget && widget.bodyWidget.page === widget.previousRenderedWidget.bodyWidget.page) {
                footHeight = this.getFootNoteHeight(footnoteCollection);
                var bottom = this.updateFootnoteHeight(widget, false, true);
                if (widget.previousRenderedWidget.y + widget.previousRenderedWidget.height + footHeight + widget.firstChild.height > bottom && this.viewer.clientArea.bottom <= bottom) {
                    isSplit = true;
                }
            }
            skipFootNoteHeight = false;
            //let isContainsFootnote: boolean = false;
            if ((this.isFitInClientArea(widget, viewer, footWidget) && !isSplit) || (viewer.clientActiveArea.height < widget.firstChild.height && this.viewer.clientActiveArea.y === this.viewer.clientArea.y)
                || (this.isMultiColumnSplit && widget.bodyWidget.sectionFormat.numberOfColumns - 1 !== widget.bodyWidget.columnIndex)) {
                if (!isNullOrUndefined(footnoteCollection) && !isNullOrUndefined(footWidget) && footWidget.length > 0) {
                    for (var k = 0; k < footWidget.length; k++) {
                        footnoteCollection.push(footWidget[k]);
                    }
                }
                if (this.keepWithNext) {
                    this.updateClientPositionForBlock(widget.containerWidget.firstChild, widget);
                    this.keepWithNext = false;
                }
                //Check whether this widget is moved to previous container widget.
                prevWidget = widget;
                viewer.updateClientAreaForBlock(widget, true, undefined, false, true);
                if (widget.isEmpty() && !isNullOrUndefined(widget.paragraphFormat) &&
                    (widget.paragraphFormat.textAlignment === 'Center' || widget.paragraphFormat.textAlignment === 'Right'
                        || (widget.paragraphFormat.textAlignment === 'Justify' && widget.paragraphFormat.bidi))
                    && widget.paragraphFormat.listFormat.listId === -1) {
                    this.updateXPositionForEmptyParagraph(viewer.clientActiveArea, widget);
                }
                else {
                    widget.x = viewer.clientActiveArea.x;
                }
                viewer.updateClientAreaForBlock(widget, false);
                widget.y = viewer.clientActiveArea.y;
                this.updateFloatingElementPosition(widget);
                viewer.cutFromTop(viewer.clientActiveArea.y + widget.height);
                //Moves the paragraph widget to previous body widget.
                if (!isNullOrUndefined(prevBodyWidget) && prevBodyWidget !== widget.containerWidget && !this.isMultiColumnSplit) {
                    index++;
                    if (!prevBodyWidget.lastChild.isEndsWithPageBreak && !prevBodyWidget.lastChild.isEndsWithColumnBreak && !this.isPageBreakInsideContentControl(prevBodyWidget.lastChild)) {
                        this.updateContainerWidget(widget, prevBodyWidget, index, true, footWidget);
                    }
                    if (footWidget.length > 0) {
                        if (prevBodyWidget.page.footnoteWidget) {
                            for (var k = 0; k < footWidget.length; k++) {
                                if (prevBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footWidget[k]) === -1 && widget.bodyWidget.page.index != footWidget[k].page.index) {
                                    prevBodyWidget.page.footnoteWidget.bodyWidgets.push(footWidget[k]);
                                    prevBodyWidget.page.footnoteWidget.height += footWidget[k].height;
                                }
                            }
                        }
                    }
                }
                else if (widget.containerWidget instanceof BodyWidget && widget.containerWidget.firstChild === widget && widget.previousRenderedWidget && widget.previousRenderedWidget instanceof ParagraphWidget && widget.previousRenderedWidget.containerWidget.sectionFormat.breakCode == 'NoBreak' && widget.containerWidget.page.index !== widget.previousRenderedWidget.containerWidget.page.index && widget.containerWidget.index !== widget.previousRenderedWidget.containerWidget.index) {
                    var bodyWidget = widget.previousRenderedWidget.bodyWidget;
                    var breakCode = bodyWidget.sectionFormat.breakCode;
                    if (bodyWidget.sectionFormat.columns.length > 1) {
                        bodyWidget = this.getBodyWidget(bodyWidget, true);
                    }
                    if (!isNullOrUndefined(bodyWidget.previousRenderedWidget) && bodyWidget.sectionFormat.breakCode === 'NoBreak'
                        && bodyWidget.previousRenderedWidget.sectionFormat.breakCode == 'NewPage'
                        && bodyWidget.page.index === bodyWidget.previousRenderedWidget.page.index) {
                        breakCode = bodyWidget.previousRenderedWidget.sectionFormat.breakCode;
                    }
                    var bottom = HelperMethods.round((this.getNextWidgetHeight(bodyWidget) + widget.height), 2);
                    // Bug 858530: Shift the widgets to previous container widget if the client height is not enough to place this widget.
                    if (!widget.previousRenderedWidget.containerWidget.lastChild.isEndsWithPageBreak && !widget.previousRenderedWidget.containerWidget.lastChild.isEndsWithColumnBreak
                        && bottom <= HelperMethods.round(this.viewer.clientActiveArea.bottom, 2) && breakCode === 'NoBreak') {
                        var page = widget.previousRenderedWidget.bodyWidget.page;
                        var nextPage = widget.containerWidget.page;
                        for (var j = 0; j < nextPage.bodyWidgets.length; j++) {
                            var nextBodyWidget = nextPage.bodyWidgets[j];
                            nextPage.bodyWidgets.splice(nextPage.bodyWidgets.indexOf(nextBodyWidget), 1);
                            page.bodyWidgets.splice(page.bodyWidgets.length, 0, nextBodyWidget);
                            nextBodyWidget.page = page;
                            j--;
                        }
                        widget.containerWidget.y = this.viewer.clientActiveArea.y;
                        this.documentHelper.removeEmptyPages();
                    }
                }
                if (!this.isInitialLoad && isSkip && widget.bodyWidget.sectionFormat.columns.length > 1 && widget === widget.bodyWidget.firstChild && (!isNullOrUndefined(firstBody.previousWidget)
                    && firstBody.page === firstBody.previousWidget.page)) {
                    this.viewer.updateClientArea(widget.bodyWidget, widget.bodyWidget.page);
                    firstBody = this.getBodyWidget(firstBody.previousWidget, true);
                    var height = this.getNextWidgetHeight(firstBody);
                    widget.bodyWidget.y = height;
                    this.viewer.clientActiveArea.height -= height - this.viewer.clientActiveArea.y;
                    this.viewer.clientActiveArea.y = height;
                    isSkip = false;
                    i--;
                }
                if (((widget.isEndsWithPageBreak && !this.isPageBreakInsideField(widget)) || widget.isEndsWithColumnBreak || this.isPageBreakInsideContentControl(widget)) && this.viewer instanceof PageLayoutViewer) {
                    var nextBodyWidget = this.createOrGetNextBodyWidget(prevBodyWidget, this.viewer);
                    nextBodyWidget = this.moveBlocksToNextPage(widget, true);
                    viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                }
            }
            else {
                if (!isNullOrUndefined(footnoteCollection)) {
                    footnoteCollection.length = 0;
                }
                var previousBlock = widget.previousRenderedWidget;
                var isPageBreak = false;
                var isColumnBreak = false;
                if (previousBlock instanceof ParagraphWidget && previousBlock.isEndsWithPageBreak &&
                    this.viewer instanceof PageLayoutViewer) {
                    isPageBreak = true;
                }
                if (previousBlock instanceof ParagraphWidget && previousBlock.isEndsWithColumnBreak &&
                    this.viewer instanceof PageLayoutViewer) {
                    isColumnBreak = true;
                }
                var isSplittedToNewPage = this.splitWidget(widget, viewer, prevBodyWidget, index + 1, isPageBreak, footWidget, isColumnBreak, isSplit ? footHeight : 0);
                this.updateFloatingElementPosition(widget);
                prevWidget = undefined;
                if (prevBodyWidget !== widget.containerWidget) {
                    prevBodyWidget = widget.containerWidget;
                    i--;
                    //Paragraph moved to next page and client area get updated with footnote widget height.
                    //So, skip considering footnote height.
                    if (footWidget.length > 0) {
                        skipFootNoteHeight = true;
                    }
                }
                index = prevBodyWidget.childWidgets.indexOf(widget);
                if (isSplittedToNewPage) {
                    prevBodyWidget = paragraph.getSplitWidgets()[i + 1].containerWidget;
                }
            }
        }
        this.skipUpdateContainerWidget = false;
    };
    Layout.prototype.updateFloatingElementPosition = function (widget) {
        if (widget.floatingElements.length > 0) {
            for (var k = 0; k < widget.floatingElements.length; k++) {
                var shape = widget.floatingElements[k];
                var topMargin = 0;
                if (shape instanceof ShapeElementBox && shape.textWrappingStyle === 'Inline') {
                    var lineIndex = shape.line.indexInOwner;
                    var lineHeight = 0;
                    topMargin = HelperMethods.convertPointToPixel(shape.textFrame.marginTop);
                    for (var k_1 = 0; k_1 < lineIndex; k_1++) {
                        if (!isNullOrUndefined(widget.childWidgets[k_1])) {
                            lineHeight += widget.childWidgets[k_1].height;
                        }
                    }
                    shape.y = widget.y + lineHeight;
                }
                else {
                    var position = this.getFloatingItemPoints(shape);
                    shape.y = position.y;
                    shape.x = position.x;
                }
                if (shape instanceof ShapeElementBox) {
                    this.updateChildLocationForCellOrShape(shape.y + topMargin, shape, undefined, false, true);
                }
            }
        }
    };
    Layout.prototype.isPageBreakInsideField = function (widget) {
        var isPageBreakInsideField = false;
        var isFieldElement = false;
        var height = 0;
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var line = widget.childWidgets[i];
            height += line.height;
            for (var j = 0; j < line.children.length; j++) {
                var element = line.children[j];
                if (element instanceof FieldElementBox) {
                    if (element.fieldType === 0) {
                        isFieldElement = true;
                    }
                    else if (element.fieldType === 2 || element.fieldType === 1) {
                        isFieldElement = false;
                    }
                }
                if (!isFieldElement && element.text === '\f') {
                    isPageBreakInsideField = false;
                }
                else {
                    isPageBreakInsideField = true;
                }
            }
        }
        if (isPageBreakInsideField && widget.height === 0) {
            this.viewer.cutFromTop(this.viewer.clientActiveArea.y + height);
        }
        return isPageBreakInsideField;
    };
    Layout.prototype.isPageBreakInsideContentControl = function (widget) {
        var isPageBreakBlockContentControl = false;
        if (widget instanceof ParagraphWidget && widget.childWidgets.length > 0) {
            var lastLine = widget.childWidgets[widget.childWidgets.length - 1];
            if (lastLine.children.length > 0) {
                var lastElement = lastLine.children[lastLine.children.length - 1];
                if (lastElement instanceof ContentControl && lastElement.contentControlWidgetType === 'Block' &&
                    !isNullOrUndefined(lastElement.previousElement) && lastElement.previousElement instanceof TextElementBox
                    && lastElement.previousElement.text === '\f') {
                    isPageBreakBlockContentControl = true;
                }
            }
        }
        return isPageBreakBlockContentControl;
    };
    /**
     * @private
     * Get the footnote of the block widget.
     *
     * @param {BlockWidget} widget BlockWidget instance.
     * @returns
     */
    Layout.prototype.getFootNotesOfBlock = function (widget, footnoteElements) {
        if (isNullOrUndefined(footnoteElements)) {
            footnoteElements = [];
        }
        if (widget.childWidgets.length > 0) {
            for (var j = 0; j < this.documentHelper.footnoteCollection.length; j++) {
                if (this.documentHelper.footnoteCollection[j].line.paragraph === widget) {
                    //isContainsFootnote = true;
                    footnoteElements.push(this.documentHelper.footnoteCollection[j]);
                }
            }
        }
        return footnoteElements;
    };
    Layout.prototype.getFootNotesWidgetsInLine = function (line) {
        var footnoteElements = [];
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            if (element instanceof FootnoteElementBox) {
                footnoteElements.push(element);
            }
        }
        return this.getFootNoteWidgetsBy(line.paragraph, footnoteElements);
    };
    Layout.prototype.getFootNoteWidgetsBy = function (widget, footnoteElements) {
        var footWidgets = [];
        if (widget.bodyWidget.page.footnoteWidget) {
            for (var i = 0; i < widget.bodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.bodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.bodyWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        if (footWidgets.length === 0 && (!isNullOrUndefined(widget.previousRenderedWidget) && widget.previousRenderedWidget.bodyWidget.page.footnoteWidget)) {
            for (var i = 0; i < widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.previousRenderedWidget.bodyWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        else if (!isNullOrUndefined(widget.bodyWidget.previousRenderedWidget) && widget.bodyWidget.previousRenderedWidget.page.footnoteWidget) {
            for (var i = 0; i < widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.bodyWidget.previousRenderedWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        else if (!isNullOrUndefined(widget.bodyWidget.nextRenderedWidget) && widget.bodyWidget.nextRenderedWidget.page.footnoteWidget) {
            for (var i = 0; i < widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                /* eslint-disable-next-line max-len */
                for (var j = 0; j < footnoteElements.length; j++) {
                    if ((widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference === footnoteElements[j]) {
                        footWidgets.push(widget.bodyWidget.nextRenderedWidget.page.footnoteWidget.bodyWidgets[i]);
                    }
                }
            }
        }
        return footWidgets;
    };
    /**
     * @param widget
     * @private
     */
    Layout.prototype.getFootNoteWidgetsOf = function (widget, isShifting) {
        var footnoteWidgets = [];
        var footnoteElements = [];
        if (widget instanceof TableWidget) {
            for (var k_2 = 0; k_2 < widget.childWidgets.length; k_2++) {
                var row = widget.childWidgets[k_2];
                for (var i = 0; i < row.childWidgets.length; i++) {
                    var cell = row.childWidgets[i];
                    for (var x = 0; x < cell.childWidgets.length; x++) {
                        var block = cell.childWidgets[x];
                        if (block instanceof TableWidget) {
                            var footWidgets = this.getFootNoteWidgetsOf(block, isShifting);
                            for (var f = 0; f < footWidgets.length; f++) {
                                if (footnoteWidgets.indexOf(footWidgets[f]) === -1) {
                                    footnoteWidgets.push(footWidgets[f]);
                                }
                            }
                        }
                        else {
                            footnoteElements = this.getFootNotesOfBlock(block, footnoteElements);
                        }
                        var blockfootnoteWidgets = this.getFootNoteWidgetsBy(block, footnoteElements);
                        if (isShifting && blockfootnoteWidgets.length === 0) {
                            for (var l = 0; l < footnoteElements.length; l++) {
                                if (footnoteWidgets.indexOf(footnoteElements[l].bodyWidget) === -1) {
                                    footnoteWidgets.push(footnoteElements[l].bodyWidget);
                                }
                            }
                        }
                        else {
                            for (var f = 0; f < blockfootnoteWidgets.length; f++) {
                                if (footnoteWidgets.indexOf(blockfootnoteWidgets[f]) === -1) {
                                    footnoteWidgets.push(blockfootnoteWidgets[f]);
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            footnoteElements = this.getFootNotesOfBlock(widget);
            if (footnoteElements.length > 0) {
                footnoteWidgets = this.getFootNoteWidgetsBy(widget, footnoteElements);
            }
            if (isShifting && footnoteWidgets.length === 0) {
                for (var k = 0; k < footnoteElements.length; k++) {
                    footnoteWidgets.push(footnoteElements[k].bodyWidget);
                }
            }
        }
        return footnoteWidgets;
    };
    Layout.prototype.getFootNodeWidgetsToShiftToPage = function (paragraph) {
        var splittedWidgets = paragraph.getSplitWidgets();
        var footNoteWidgets = [];
        var toBodyWidget = paragraph.containerWidget;
        var fromBodyWidget;
        for (var i = 0; i < splittedWidgets.length; i++) {
            var footWidgets = this.getFootNoteWidgetsOf(splittedWidgets[i]);
            for (var j = 0; j < footWidgets.length; j++) {
                fromBodyWidget = footWidgets[j].containerWidget;
                if (toBodyWidget !== fromBodyWidget) {
                    footNoteWidgets.push(footWidgets[j]);
                }
            }
        }
        return { 'footNoteWidgets': footNoteWidgets, 'fromBodyWidget': fromBodyWidget, 'toBodyWidget': toBodyWidget };
    };
    Layout.prototype.shiftTableWidget = function (table, viewer, isClearHeight) {
        if (isClearHeight === void 0) { isClearHeight = false; }
        table.isBidiTable = table.bidi;
        if (this.documentHelper.compatibilityMode !== 'Word2013'
            && !table.isInsideTable
            && !isNullOrUndefined(table.firstChild.firstChild.leftMargin)) {
            this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x - HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
        }
        var tables = [table];
        this.addTableWidget(this.viewer.clientActiveArea, tables);
        this.viewer.updateClientAreaTopOrLeft(table, true);
        var clientActiveAreaForTableWrap;
        var clientAreaForTableWrap;
        var wrapDiff = 0;
        if (table.wrapTextAround) {
            clientActiveAreaForTableWrap = this.viewer.clientActiveArea.clone();
            clientAreaForTableWrap = this.viewer.clientArea.clone();
            this.updateClientAreaForWrapTable(tables, table, true, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        else if (!(table.containerWidget instanceof TextFrame)) {
            this.adjustClientAreaBasedOnTextWrapForTable(table, this.viewer.clientActiveArea);
            if (this.isWrapText) {
                wrapDiff = this.viewer.clientActiveArea.x - this.viewer.clientArea.x;
                this.isWrapText = false;
                table.x = this.viewer.clientActiveArea.x;
            }
        }
        if (table.childWidgets.length > 0) {
            var isHeader = table.childWidgets[0].rowFormat.isHeader;
            table.header = isHeader;
            table.continueHeader = isHeader;
            table.headerHeight = 0;
        }
        var row = table.childWidgets[0];
        this.updateFootnoteHeight(table, true);
        if (this.documentHelper.viewer instanceof PageLayoutViewer && table.wrapTextAround && (table.positioning.verticalAlignment === 'Bottom' || table.positioning.verticalAlignment === 'Center' || table.positioning.verticalAlignment === 'Outside')) {
            this.updateTableFloatPoints(table);
            this.updateChildLocationForTable(table.y, table);
        }
        while (row) {
            row = this.shiftRowWidget(tables, row, isClearHeight);
            row = row.nextRow;
        }
        this.updateFootnoteHeight(table, false);
        this.updateWidgetsToPage(tables, [], table, true);
        if (wrapDiff > 0) {
            this.viewer.clientArea.x = this.viewer.clientArea.x - wrapDiff;
        }
        if (table.wrapTextAround) {
            this.updateClientAreaForWrapTable(tables, table, false, clientActiveAreaForTableWrap, clientAreaForTableWrap);
        }
        if (this.documentHelper.compatibilityMode !== 'Word2013'
            && !table.isInsideTable
            && !table.wrapTextAround
            && !isNullOrUndefined(table.firstChild.firstChild.leftMargin)) {
            this.viewer.clientArea.x = this.viewer.clientArea.x + HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
        }
        return tables[tables.length - 1];
    };
    Layout.prototype.shiftRowWidget = function (tables, row, isClearHeight) {
        if (isClearHeight === void 0) { isClearHeight = false; }
        var viewer = this.viewer;
        if (isClearHeight) {
            row.height = 0;
        }
        var isNestedTable = row.ownerTable.isInsideTable;
        if (!isNestedTable) {
            this.updateExistingFootnoteHeight(row);
        }
        var rows = [row];
        this.addTableRowWidget(viewer.clientActiveArea, rows);
        viewer.updateClientAreaForRow(row, true);
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cell = row.childWidgets[i];
            if (isClearHeight) {
                cell.height = 0;
            }
            /* eslint-disable-next-line max-len */
            this.shiftCellWidget(cell, this.getMaxTopCellMargin(row) + row.topBorderWidth, this.getMaxBottomCellMargin(row) + row.bottomBorderWidth, isClearHeight);
        }
        viewer.updateClientAreaForRow(row, false);
        if (!isNestedTable) {
            var footheight = this.footnoteHeight;
            this.updateFootnoteToBody(row, this.layoutedFootnoteElement);
            this.footnoteHeight = footheight;
        }
        this.updateWidgetsToTable(tables, rows, row, false);
        if (!isNestedTable) {
            this.layoutedFootnoteElement = [];
        }
        return rows[rows.length - 1];
    };
    Layout.prototype.updateFootnoteToBody = function (row, footnoteElements) {
        this.layoutFootnoteInSplittedRow(row, this.getFootnoteBody(footnoteElements));
        if (isNullOrUndefined(row.ownerTable.footnoteElement)) {
            row.ownerTable.footnoteElement = [];
        }
        for (var i = 0; i < footnoteElements.length; i++) {
            row.ownerTable.footnoteElement.push(footnoteElements[i]);
        }
    };
    Layout.prototype.getFootnoteBody = function (footnoteElements) {
        var footnoteWidgets = [];
        for (var i = 0; i < footnoteElements.length; i++) {
            footnoteWidgets.push(footnoteElements[i].bodyWidget);
        }
        return footnoteWidgets;
    };
    Layout.prototype.shiftCellWidget = function (cell, maxCellMarginTop, maxCellMarginBottom, isClearHeight) {
        if (isNullOrUndefined(isClearHeight)) {
            isClearHeight = false;
        }
        var viewer = this.viewer;
        this.addTableCellWidget(cell, viewer.clientActiveArea, maxCellMarginTop, maxCellMarginBottom);
        var clientHeight = this.viewer.clientActiveArea.height;
        viewer.updateClientAreaForCell(cell, true);
        for (var i = 0; i < cell.childWidgets.length; i++) {
            var block = cell.childWidgets[i];
            var skipCellContentHeightCalc = i !== cell.childWidgets.length - 1;
            viewer.updateClientAreaForBlock(block, true);
            if (block instanceof ParagraphWidget) {
                this.shiftParagraphWidget(block, skipCellContentHeightCalc);
            }
            else {
                this.shiftTableWidget(block, viewer, isClearHeight);
            }
            viewer.updateClientAreaForBlock(block, false);
        }
        this.updateWidgetToRow(cell);
        viewer.updateClientAreaForCell(cell, false);
        if (!cell.ownerTable.isInsideTable) {
            this.viewer.clientActiveArea.height = clientHeight;
        }
    };
    Layout.prototype.shiftParagraphWidget = function (paragraph, skipCellContentHeightCalc) {
        this.addParagraphWidget(this.viewer.clientActiveArea, paragraph);
        if (paragraph.floatingElements.length > 0) {
            for (var k = 0; k < paragraph.floatingElements.length; k++) {
                var shape = paragraph.floatingElements[k];
                var topMargin = 0;
                if (shape instanceof ShapeElementBox && shape.textWrappingStyle === 'Inline') {
                    var lineIndex = shape.line.indexInOwner;
                    var lineHeight = 0;
                    topMargin = HelperMethods.convertPointToPixel(shape.textFrame.marginTop);
                    for (var k_3 = 0; k_3 < lineIndex; k_3++) {
                        lineHeight += paragraph.childWidgets[k_3].height;
                    }
                    shape.y = paragraph.y + lineHeight;
                }
                else {
                    var position = this.getFloatingItemPoints(shape);
                    shape.y = position.y;
                    shape.x = position.x;
                }
                if (shape instanceof ShapeElementBox) {
                    this.updateChildLocationForCellOrShape(shape.y + topMargin, shape);
                }
            }
        }
        this.viewer.cutFromTop(this.viewer.clientActiveArea.y + paragraph.height);
        var footnoteCollection = this.getFootNoteWidgetsOf(paragraph, true);
        for (var i = 0; i < footnoteCollection.length; i++) {
            this.layoutedFootnoteElement.push(footnoteCollection[i].footNoteReference);
        }
        this.footnoteHeight += this.getFootNoteHeight(footnoteCollection);
        this.updateWidgetToPage(this.viewer, paragraph, skipCellContentHeightCalc);
    };
    Layout.prototype.updateContainerForTable = function (block, viewer) {
        var prevObj = this.getBodyWidgetOfPreviousBlock(block, 0);
        var prevBodyWidget = prevObj.bodyWidget;
        var index = prevObj.index;
        var isPageBreak = !isNullOrUndefined(prevBodyWidget.lastChild) && !isNullOrUndefined(prevBodyWidget.lastChild.lastChild) ?
            prevBodyWidget.lastChild.lastChild.isEndsWithPageBreak : false;
        var isColumnBreak = !isNullOrUndefined(prevBodyWidget.lastChild) && !isNullOrUndefined(prevBodyWidget.lastChild.lastChild) ?
            prevBodyWidget.lastChild.lastChild.isEndsWithColumnBreak : false;
        if (prevBodyWidget !== block.containerWidget) {
            if (!isPageBreak && !isColumnBreak) {
                this.updateContainerWidget(block, prevBodyWidget, index + 1, true);
            }
            else {
                viewer.updateClientArea(block.bodyWidget, block.bodyWidget.page);
            }
        }
        if (block.isInHeaderFooter || this.viewer instanceof WebLayoutViewer) {
            block.containerWidget.height -= block.height;
        }
    };
    Layout.prototype.shiftWidgetsForTable = function (table, viewer) {
        this.updateContainerForTable(table, viewer);
        this.viewer.updateClientAreaForBlock(table, true, undefined, false, true);
        this.updateVerticalPositionToTop(table, true);
        //const isPageLayout: boolean = viewer instanceof PageLayoutViewer;
        var combinedTable = table.combineWidget(this.viewer);
        this.documentHelper.layout.updateChildLocationForTable(combinedTable.y, combinedTable);
        this.clearTableWidget(combinedTable, true, false, false, true);
        this.shiftTableWidget(combinedTable, this.viewer);
        this.updateVerticalPositionToTop(table, false);
        this.viewer.updateClientAreaForBlock(table, false);
    };
    Layout.prototype.updateVerticalPositionToTop = function (table, isUpdateTop) {
        //Iterate the tableWidgets counts
        for (var i = 0; i < table.getSplitWidgets().length; i++) {
            var tablewidget = table.getSplitWidgets()[i];
            //Iterate the tableWidget child items
            for (var j = 0; j < tablewidget.childWidgets.length; j++) {
                var rowWidget = tablewidget.childWidgets[j];
                //Iterate the RowWidgets child items
                for (var k = 0; k < rowWidget.childWidgets.length; k++) {
                    var cellWidget = rowWidget.childWidgets[k];
                    //Iterate the RowWidgets child items
                    this.documentHelper.layout.updateCellVerticalPosition(cellWidget, isUpdateTop, false);
                }
            }
        }
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.splitWidget = function (paragraphWidget, viewer, previousBodyWidget, index, isPageBreak, footWidget, isColumnBreak, footHeight) {
        var firstLine = paragraphWidget.childWidgets[0];
        var keepLinesTogether = (paragraphWidget.paragraphFormat.keepLinesTogether && (this.viewer.clientActiveArea.y !== this.viewer.clientArea.y));
        var maxElementHeight = keepLinesTogether ? paragraphWidget.height : this.getMaxElementHeight(firstLine);
        var paragraphView = paragraphWidget.getSplitWidgets();
        var nextBodyWidget = paragraphWidget.containerWidget;
        // Get maximun height based on widow/orphan control.
        maxElementHeight = this.getMaximumLineHeightToSplit(paragraphWidget, maxElementHeight, viewer);
        // TODO: Footnote move on move entire paragraph.
        var footNoteInFirstLine = this.getFootNotesWidgetsInLine(firstLine);
        if (isNullOrUndefined(paragraphWidget.previousWidget) && footNoteInFirstLine.length > 0) {
            for (var i = 0; i < footNoteInFirstLine.length; i++) {
                for (var j = 0; j < footNoteInFirstLine[i].childWidgets.length; j++) {
                    maxElementHeight += footNoteInFirstLine[i].childWidgets[j].height;
                }
            }
            //maxElementHeight += (paragraphWidget.bodyWidget.page.footnoteWidget.childWidgets[0] as ParagraphWidget).height;
        }
        var height = 0;
        if (!isNullOrUndefined(footHeight) && footHeight > 0) {
            height = footHeight;
        }
        if (viewer.clientActiveArea.height >= maxElementHeight + height && !isPageBreak && !isColumnBreak) {
            var splittedWidget = undefined;
            var widgetIndex = paragraphView.indexOf(paragraphWidget);
            if (widgetIndex < (paragraphView.length - 1)) {
                splittedWidget = paragraphView[widgetIndex + 1];
                nextBodyWidget = splittedWidget.containerWidget;
            }
            else {
                splittedWidget = new ParagraphWidget();
                splittedWidget.index = paragraphWidget.index;
                splittedWidget.characterFormat = paragraphWidget.characterFormat;
                splittedWidget.paragraphFormat = paragraphWidget.paragraphFormat;
                splittedWidget.width = paragraphWidget.width;
                splittedWidget.x = paragraphWidget.x;
                splittedWidget.y = paragraphWidget.y;
                paragraphView.push(splittedWidget);
            }
            if (previousBodyWidget !== paragraphWidget.containerWidget && !this.skipUpdateContainerWidget) {
                this.updateContainerWidget(paragraphWidget, previousBodyWidget, index, true);
            }
            for (var i = paragraphWidget.childWidgets.length - 1; i > 0; i--) {
                var line = paragraphWidget.childWidgets[i];
                if (this.isFitInClientArea(paragraphWidget, viewer, undefined)) {
                    if (splittedWidget.childWidgets.length === 1) {
                        this.updateParagraphWidgetInternal(line, splittedWidget, 0);
                        this.skipUpdateContainerWidget = true;
                    }
                    break;
                }
                else {
                    var line_1 = paragraphWidget.childWidgets[i];
                    //Moves the line widget to next widget.
                    this.updateParagraphWidgetInternal(line_1, splittedWidget, 0);
                }
            }
            if (isNullOrUndefined(splittedWidget.containerWidget) && splittedWidget.childWidgets.length > 0) {
                var y = viewer.clientActiveArea.y;
                // eslint-disable-next-line max-len
                var clientArea = new Rect(viewer.clientArea.x, viewer.clientArea.y, viewer.clientArea.width, viewer.clientArea.height);
                // eslint-disable-next-line max-len
                var activeArea = new Rect(viewer.clientActiveArea.x, viewer.clientActiveArea.y, viewer.clientActiveArea.width, viewer.clientActiveArea.height);
                var prevPage = paragraphWidget.bodyWidget.page;
                //Checks whether next node exists, else adds new page.
                nextBodyWidget = this.moveBlocksToNextPage(paragraphWidget, false, -1);
                splittedWidget.containerWidget = nextBodyWidget;
                nextBodyWidget.childWidgets.splice(0, 0, splittedWidget);
                if (prevPage !== nextBodyWidget.page) {
                    nextBodyWidget.height += splittedWidget.height;
                    if (nextBodyWidget != previousBodyWidget) {
                        this.moveFootNotesToPage(footWidget, previousBodyWidget, nextBodyWidget);
                    }
                    if (nextBodyWidget.childWidgets.length === 1 && nextBodyWidget.firstChild instanceof ParagraphWidget &&
                        nextBodyWidget.firstChild.equals(paragraphWidget)) {
                        //paragraphWidget.x = paragraphWidget.x;
                        paragraphWidget.y = y;
                        return true;
                    }
                    else {
                        //Resetting Client area
                        viewer.clientArea = clientArea;
                        viewer.clientActiveArea = activeArea;
                    }
                }
                else {
                    if (paragraphWidget.x !== paragraphWidget.containerWidget.x) {
                        paragraphWidget.x = paragraphWidget.containerWidget.x;
                    }
                    paragraphWidget.y = y;
                    viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                    splittedWidget = this.addParagraphWidget(this.viewer.clientActiveArea, splittedWidget);
                    return true;
                }
            }
        }
        else {
            var startBlock = void 0;
            var keepWithNext = false;
            var startIndex = 0;
            viewer.columnLayoutArea.setColumns(previousBodyWidget.sectionFormat);
            nextBodyWidget = this.createOrGetNextBodyWidget(previousBodyWidget, this.viewer);
            var blockInfo = this.alignBlockElement(paragraphWidget);
            if (!this.isInitialLoad && !isNullOrUndefined(blockInfo.node) && !paragraphWidget.isEndsWithPageBreak && !paragraphWidget.isEndsWithColumnBreak && isNullOrUndefined(paragraphWidget.previousSplitWidget)) {
                startBlock = blockInfo.node instanceof TableRowWidget ? this.splitRow(blockInfo.node) : blockInfo.node;
                if (startBlock.containerWidget instanceof BodyWidget && startBlock.containerWidget.firstChild !== startBlock) {
                    startIndex = startBlock instanceof TableWidget ? 0 : parseInt(blockInfo.position.index, 10);
                    paragraphWidget = startBlock;
                    keepWithNext = true;
                    if (!isNullOrUndefined(paragraphWidget.nextRenderedWidget) && paragraphWidget.nextRenderedWidget instanceof ParagraphWidget) {
                        this.keepWithNext = true;
                        this.documentHelper.blockToShift = paragraphWidget.nextRenderedWidget;
                    }
                }
            }
            if (paragraphWidget.containerWidget !== nextBodyWidget || keepWithNext) {
                var prevPage = paragraphWidget.bodyWidget.page;
                nextBodyWidget = this.moveBlocksToNextPage(paragraphWidget, true);
                if (previousBodyWidget !== nextBodyWidget) {
                    viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                    if (startIndex > 0 && this.keepWithNext) {
                        this.viewer.updateClientAreaForBlock(paragraphWidget, true);
                        var nextParagraph = void 0;
                        if (paragraphWidget instanceof TableWidget) {
                            this.addTableWidget(this.viewer.clientActiveArea, [paragraphWidget]);
                        }
                        else if (nextBodyWidget.firstChild instanceof ParagraphWidget && nextBodyWidget.firstChild.equals(paragraphWidget)) {
                            nextParagraph = nextBodyWidget.firstChild;
                        }
                        else {
                            nextParagraph = new ParagraphWidget();
                        }
                        nextParagraph = this.moveChildsToParagraph(paragraphWidget, startIndex, nextParagraph);
                        nextParagraph.containerWidget = nextBodyWidget;
                        for (var m = 0; m < nextParagraph.floatingElements.length; m++) {
                            var element = nextParagraph.floatingElements[m];
                            if (element.line.paragraph.bodyWidget !== paragraphWidget.bodyWidget && element.textWrappingStyle !== 'Inline') {
                                paragraphWidget.bodyWidget.floatingElements.splice(paragraphWidget.bodyWidget.floatingElements.indexOf(element), 1);
                            }
                        }
                        paragraphWidget = nextParagraph;
                        if (nextBodyWidget.childWidgets.indexOf(paragraphWidget) === -1) {
                            nextBodyWidget.childWidgets.splice(0, 0, paragraphWidget);
                        }
                        this.viewer.updateClientAreaLocation(paragraphWidget, this.viewer.clientActiveArea);
                        this.layoutBlock(paragraphWidget, 0, true);
                        this.viewer.updateClientAreaForBlock(paragraphWidget, false);
                    }
                    else {
                        this.updateContainerWidget(paragraphWidget, nextBodyWidget, 0, true);
                        if (paragraphWidget instanceof TableWidget) {
                            this.addTableWidget(this.viewer.clientActiveArea, [paragraphWidget]);
                        }
                        else {
                            this.addParagraphWidget(this.viewer.clientActiveArea, paragraphWidget);
                        }
                    }
                    this.moveFootNotesToPage(footWidget, previousBodyWidget, nextBodyWidget);
                }
                if (previousBodyWidget.page === nextBodyWidget.page) {
                    if (previousBodyWidget === nextBodyWidget) {
                        viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
                        return false;
                    }
                    return true;
                }
            }
        }
        if (previousBodyWidget === paragraphWidget.containerWidget) {
            // if (paragraphWidget.x !== paragraphWidget.containerWidget.x) {
            //     paragraphWidget.x = paragraphWidget.containerWidget.x;
            // }
            paragraphWidget.y = viewer.clientActiveArea.y;
            viewer.cutFromTop(viewer.clientActiveArea.y + paragraphWidget.height);
        }
        else {
            //Updates client area based on next body widget.
            viewer.updateClientArea(nextBodyWidget, nextBodyWidget.page);
        }
        return false;
    };
    Layout.prototype.getMaximumLineHeightToSplit = function (paragraphWidget, maxElementHeight, viewer) {
        if (viewer.clientActiveArea.height >= maxElementHeight && !paragraphWidget.paragraphFormat.keepLinesTogether &&
            paragraphWidget.paragraphFormat.widowControl && !isNullOrUndefined(paragraphWidget.previousWidget) &&
            isNullOrUndefined(paragraphWidget.previousSplitWidget)) {
            var paragraphHeight = paragraphWidget.height;
            for (var m = paragraphWidget.childWidgets.length - 1; m >= 0; m--) {
                var lastLine = paragraphWidget.childWidgets[m];
                var lineHeight = this.getMaxElementHeight(lastLine);
                if (lastLine.height > lineHeight) {
                    paragraphHeight -= lastLine.height - lineHeight;
                }
                if (viewer.clientActiveArea.height >= paragraphHeight) {
                    // Move entire paragraph to next page, If first line alone not fitted in the client area.
                    if (m === 0) {
                        maxElementHeight = paragraphWidget.height;
                    }
                    break;
                }
                paragraphHeight -= (lastLine).height;
            }
        }
        return maxElementHeight;
    };
    /**
     * @private
     * @param footnoteWidgets
     * @param fromBodyWidget
     * @param toBodyWidget
     */
    Layout.prototype.moveFootNotesToPage = function (footnoteWidgets, fromBodyWidget, toBodyWidget) {
        if (footnoteWidgets.length > 0 && fromBodyWidget.page.footnoteWidget && fromBodyWidget.page !== toBodyWidget.page) {
            var footNoteIndex = -1;
            var footNoteWidget = void 0;
            var insertIndex = 0;
            var check = false;
            for (var k = 0; k < footnoteWidgets.length; k++) {
                /* eslint-disable-next-line max-len */
                footNoteWidget = footnoteWidgets[k];
                footNoteIndex = fromBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footNoteWidget);
                if (footNoteIndex >= 0) {
                    if (toBodyWidget.page.footnoteWidget === undefined) {
                        this.addEmptyFootNoteToBody(toBodyWidget);
                    }
                    for (var i = 0; i < toBodyWidget.page.footnoteWidget.bodyWidgets.length; i++) {
                        var body = (toBodyWidget.page.footnoteWidget.bodyWidgets[i]).footNoteReference;
                        if (body === (footNoteWidget).footNoteReference) {
                            check = true;
                        }
                    }
                    fromBodyWidget.page.footnoteWidget.bodyWidgets.splice(footNoteIndex, 1);
                    if (toBodyWidget.page.footnoteWidget.bodyWidgets.indexOf(footNoteWidget) < 0 && !check) {
                        var childLength = toBodyWidget.page.footnoteWidget.bodyWidgets.length;
                        var fromPage = this.documentHelper.pages.indexOf(fromBodyWidget.page);
                        var toPage = this.documentHelper.pages.indexOf(toBodyWidget.page);
                        footNoteWidget.containerWidget = toBodyWidget.page.footnoteWidget;
                        footNoteWidget.page = toBodyWidget.page;
                        if (fromPage > toPage) {
                            toBodyWidget.page.footnoteWidget.bodyWidgets.push(footNoteWidget);
                            insertIndex++;
                        }
                        else {
                            toBodyWidget.page.footnoteWidget.bodyWidgets.splice(insertIndex++, 0, footNoteWidget);
                        }
                        toBodyWidget.page.footnoteWidget.height += footNoteWidget.height;
                    }
                    fromBodyWidget.page.footnoteWidget.height -= footNoteWidget.height;
                }
            }
            if (fromBodyWidget.page.footnoteWidget && fromBodyWidget.page.footnoteWidget.bodyWidgets.length === 0) {
                fromBodyWidget.page.footnoteWidget = undefined;
            }
            if (fromBodyWidget.page.footnoteWidget !== undefined) {
                this.layoutfootNote(fromBodyWidget.page.footnoteWidget);
            }
            if (toBodyWidget.page.footnoteWidget !== undefined) {
                this.layoutfootNote(toBodyWidget.page.footnoteWidget);
            }
        }
    };
    Layout.prototype.addEmptyFootNoteToBody = function (bodyWidget) {
        var footnoteWidget = new FootNoteWidget();
        footnoteWidget.footNoteType = 'Footnote';
        footnoteWidget.page = bodyWidget.page;
        var newParagraph = new ParagraphWidget();
        newParagraph.characterFormat = new WCharacterFormat();
        newParagraph.paragraphFormat = new WParagraphFormat();
        newParagraph.index = 0;
        var lineWidget = new LineWidget(newParagraph);
        newParagraph.childWidgets.push(lineWidget);
        //  footnoteWidget.childWidgets.push(newParagraph);
        footnoteWidget.height = this.documentHelper.textHelper.getParagraphMarkSize(newParagraph.characterFormat).Height;
        footnoteWidget.margin = new Margin(0, footnoteWidget.height, 0, 0);
        bodyWidget.page.footnoteWidget = footnoteWidget;
    };
    Layout.prototype.getMaxElementHeight = function (lineWidget) {
        var height = 0;
        /* eslint-disable-next-line max-len */
        if (lineWidget.children.length === 0 || ((lineWidget.children.length === 1 && lineWidget.children[0] instanceof ListTextElementBox) || (lineWidget.children.length === 2 && lineWidget.children[0] instanceof ListTextElementBox && lineWidget.children[1] instanceof ListTextElementBox))) {
            var topMargin = 0;
            var bottomMargin = 0;
            height = this.documentHelper.selection.getParagraphMarkSize(lineWidget.paragraph, topMargin, bottomMargin).height;
            height += topMargin;
            if (lineWidget.children.length > 0) {
                var element = lineWidget.children[0];
                if (height < element.margin.top + element.height) {
                    height = element.margin.top + element.height;
                }
            }
        }
        else {
            for (var i = 0; i < lineWidget.children.length; i++) {
                var element = lineWidget.children[i];
                if (height < element.margin.top + element.height) {
                    height = element.margin.top + element.height;
                }
            }
        }
        return height;
    };
    Layout.prototype.createOrGetNextBodyWidget = function (bodyWidget, viewer) {
        viewer.columnLayoutArea.setColumns(bodyWidget.sectionFormat);
        var nextColumn = viewer.columnLayoutArea.getNextColumnByBodyWidget(bodyWidget);
        if (!isNullOrUndefined(nextColumn)) {
            var nextColumnBody = this.createOrGetNextColumnBody(bodyWidget);
            return nextColumnBody;
        }
        var nextBodyWidget = undefined;
        var pageIndex = 0;
        pageIndex = this.documentHelper.pages.indexOf(bodyWidget.page);
        var page = undefined;
        var index = undefined;
        index = bodyWidget.index;
        if (pageIndex === this.documentHelper.pages.length - 1
            || this.documentHelper.pages[pageIndex + 1].sectionIndex !== index) {
            var currentWidget = new BodyWidget();
            currentWidget.sectionFormat = bodyWidget.sectionFormat;
            currentWidget.index = bodyWidget.index;
            page = viewer.createNewPage(currentWidget);
            if (this.documentHelper.pages[pageIndex + 1].sectionIndex !== index) {
                this.documentHelper.insertPage(pageIndex + 1, page);
            }
            nextBodyWidget = page.bodyWidgets[0];
        }
        else {
            page = this.documentHelper.pages[pageIndex + 1];
            nextBodyWidget = page.bodyWidgets[0];
        }
        return nextBodyWidget;
    };
    Layout.prototype.isFitInClientArea = function (paragraphWidget, viewer, blocks) {
        var lastLine = paragraphWidget.childWidgets[paragraphWidget.childWidgets.length - 1];
        var height = paragraphWidget.height;
        var maxElementHeight = this.getMaxElementHeight(lastLine);
        if (lastLine.height > maxElementHeight) {
            height -= lastLine.height - maxElementHeight;
        }
        var footHeight = 0;
        if (!isNullOrUndefined(blocks)) {
            if (blocks.length > 0) {
                if (blocks[0].containerWidget instanceof FootNoteWidget) {
                    footHeight = blocks[0].containerWidget.margin.top;
                }
                for (var k = 0; k < blocks.length; k++) {
                    for (var l = 0; l < blocks[k].childWidgets.length; l++) {
                        footHeight += blocks[k].childWidgets[l].height;
                    }
                }
            }
        }
        return viewer.clientActiveArea.height >= height + footHeight;
    };
    Layout.prototype.isLineInFootNote = function (line, footNotes) {
        for (var i = 0; i < footNotes.length; i++) {
            if (footNotes[i].line === line) {
                return true;
            }
        }
        return false;
    };
    /* eslint-disable-next-line max-len */
    Layout.prototype.shiftToPreviousWidget = function (paragraphWidget, viewer, previousWidget, isPageBreak, isColumnBreak) {
        var fromBodyWidget = paragraphWidget.containerWidget;
        var toBodyWidget = previousWidget.containerWidget;
        var footNotes = [];
        var footNoteWidgets = [];
        if (toBodyWidget !== fromBodyWidget) {
            footNotes = this.getFootNotesOfBlock(paragraphWidget);
        }
        for (var i = 0; i < paragraphWidget.childWidgets.length; i++) {
            var line = paragraphWidget.childWidgets[i];
            var maxElementHeight = this.getMaxElementHeight(line);
            if (this.isLineInFootNote(line, footNotes)) {
                var footWidget = this.getFootNoteWidgetsBy(line.paragraph, footNotes);
                var height = 0;
                for (var m = 0; m < footWidget.length; m++) {
                    var footContent = footWidget[m];
                    for (var n = 0; n < footContent.childWidgets.length; n++) {
                        height += footContent.childWidgets[n].height;
                    }
                }
                if (footWidget.length > 0 && footWidget[0].containerWidget) {
                    height += footWidget[0].containerWidget.margin.top;
                }
                maxElementHeight += height;
            }
            if (viewer.clientActiveArea.height >= maxElementHeight && !isPageBreak && !isColumnBreak) {
                if (footNotes.length > 0 && this.isLineInFootNote(line, footNotes)) {
                    footNoteWidgets = footNoteWidgets.concat(this.getFootNoteWidgetsBy(line.paragraph, footNotes));
                }
                //Moves the line widget to previous widget.
                this.updateParagraphWidgetInternal(line, previousWidget, previousWidget.childWidgets.length);
                i--;
                viewer.cutFromTop(viewer.clientActiveArea.y + line.height);
                if (isNullOrUndefined(paragraphWidget.childWidgets)) {
                    break;
                }
            }
            else {
                var bodyWidget = previousWidget.containerWidget;
                viewer.updateClientArea(bodyWidget, bodyWidget.page);
                var newBodyWidget = this.createOrGetNextBodyWidget(bodyWidget, viewer);
                if (paragraphWidget.containerWidget !== newBodyWidget) {
                    newBodyWidget = this.moveBlocksToNextPage(paragraphWidget, true);
                }
                if (bodyWidget !== newBodyWidget) {
                    footNotes = this.getFootNotesOfBlock(paragraphWidget);
                    if (footNotes.length > 0) {
                        footNoteWidgets = footNoteWidgets.concat(this.getFootNoteWidgetsBy(paragraphWidget, footNotes));
                        toBodyWidget = newBodyWidget;
                    }
                    this.updateContainerWidget(paragraphWidget, newBodyWidget, 0, true);
                }
                //Updates client area based on next page.
                viewer.updateClientArea(newBodyWidget, newBodyWidget.page);
                break;
            }
        }
        if (!isNullOrUndefined(footNoteWidgets) && footNoteWidgets.length > 0 && fromBodyWidget.page.footnoteWidget
            && fromBodyWidget != toBodyWidget) {
            this.moveFootNotesToPage(footNoteWidgets, fromBodyWidget, toBodyWidget);
        }
    };
    Layout.prototype.updateParagraphWidgetInternal = function (lineWidget, newParagraphWidget, index) {
        if (!isNullOrUndefined(lineWidget.paragraph)) {
            lineWidget.paragraph.childWidgets.splice(lineWidget.paragraph.childWidgets.indexOf(lineWidget), 1);
            lineWidget.paragraph.height -= lineWidget.height;
            if (!isNullOrUndefined(lineWidget.paragraph.containerWidget)) {
                lineWidget.paragraph.containerWidget.height -= lineWidget.height;
            }
            if (isNullOrUndefined(lineWidget.paragraph.childWidgets) || lineWidget.paragraph.childWidgets.length === 0) {
                lineWidget.paragraph.destroyInternal(this.viewer);
            }
        }
        if (!isNullOrUndefined(lineWidget.paragraph) && lineWidget.paragraph.floatingElements.length > 0) {
            this.shiftFloatingElements(lineWidget, newParagraphWidget);
        }
        newParagraphWidget.childWidgets.splice(index, 0, lineWidget);
        lineWidget.paragraph = newParagraphWidget;
        newParagraphWidget.height += lineWidget.height;
        if (!isNullOrUndefined(newParagraphWidget.containerWidget)) {
            newParagraphWidget.containerWidget.height += lineWidget.height;
        }
    };
    Layout.prototype.shiftFloatingElements = function (lineWidget, newParagraphWidget) {
        for (var i = 0; i < lineWidget.children.length; i++) {
            if (lineWidget.children[i] instanceof ShapeElementBox && lineWidget.children[i].textWrappingStyle === 'Inline') {
                var index = lineWidget.paragraph.floatingElements.indexOf(lineWidget.children[i]);
                if (index >= 0) {
                    lineWidget.paragraph.floatingElements.splice(index, 1);
                    newParagraphWidget.floatingElements.splice(index, 0, lineWidget.children[i]);
                }
            }
        }
    };
    Layout.prototype.shiftNextWidgets = function (blockAdv) {
        var block = blockAdv;
        while (block.nextWidget instanceof BlockWidget) {
            block = block.nextWidget;
            if (this.viewer instanceof PageLayoutViewer && !this.isMultiColumnSplit && block.bodyWidget.sectionFormat.columns.length > 1) {
                var lastbody = this.getBodyWidget(block.bodyWidget, false);
                if ((!isNullOrUndefined(lastbody.nextRenderedWidget) && lastbody.page === lastbody.nextRenderedWidget.page)) {
                    this.splitBodyWidgetBasedOnColumn(block.bodyWidget);
                    break;
                }
            }
            this.reLayoutOrShiftWidgets(block, this.viewer);
        }
    };
    Layout.prototype.updateContainerWidget = function (widget, bodyWidget, index, destroyAndScroll, footWidget) {
        if (widget.containerWidget && widget.containerWidget.containerWidget instanceof FootNoteWidget) {
            return;
        }
        var previousWidget = widget.containerWidget;
        if (!isNullOrUndefined(widget.containerWidget)) {
            widget.containerWidget.childWidgets.splice(widget.containerWidget.childWidgets.indexOf(widget), 1);
            widget.containerWidget.height -= bodyWidget.height;
            if ((isNullOrUndefined(widget.containerWidget.childWidgets) || widget.containerWidget.childWidgets.length === 0)
                && widget.containerWidget instanceof BodyWidget && widget.containerWidget !== bodyWidget && destroyAndScroll) {
                var page = widget.containerWidget.page;
                if (this.documentHelper.pages[this.documentHelper.pages.length - 1] === page &&
                    this.viewer.visiblePages.indexOf(page) !== -1) {
                    this.documentHelper.scrollToBottom();
                }
                if (isNullOrUndefined(page.endnoteWidget) && (isNullOrUndefined(page.nextPage) || page.nextPage.bodyWidgets[0].index !== widget.containerWidget.index)) {
                    var section = widget.containerWidget;
                    if (!isNullOrUndefined(section.nextRenderedWidget) && section.nextRenderedWidget.sectionFormat.columns.length > 1) {
                        section.nextRenderedWidget.columnIndex = section.columnIndex;
                    }
                    widget.containerWidget.destroyInternal(this.viewer);
                }
            }
        }
        bodyWidget.childWidgets.splice(index, 0, widget);
        if (widget instanceof ParagraphWidget && !isNullOrUndefined(widget.floatingElements)) {
            for (var i = 0; i < widget.floatingElements.length; i++) {
                var shape = widget.floatingElements[i];
                if (shape.textWrappingStyle !== 'Inline') {
                    bodyWidget.floatingElements.push(shape);
                    widget.bodyWidget.floatingElements.splice(widget.bodyWidget.floatingElements.indexOf(shape), 1);
                    /* eslint:disable */
                    bodyWidget.floatingElements.sort(function (a, b) { return a.y - b.y; });
                }
            }
        }
        if (widget instanceof TableWidget && widget.wrapTextAround
            && widget.bodyWidget.floatingElements.indexOf(widget) !== -1) {
            widget.bodyWidget.floatingElements.splice(widget.bodyWidget.floatingElements.indexOf(widget), 1);
        }
        bodyWidget.height += bodyWidget.height;
        widget.containerWidget = bodyWidget;
        if (previousWidget && previousWidget.page && previousWidget.page.footnoteWidget && footWidget && footWidget.length > 0) {
            this.moveFootNotesToPage(footWidget, previousWidget, bodyWidget);
        }
    };
    Layout.prototype.getBodyWidgetOfPreviousBlock = function (block, index) {
        index = 0;
        var prevBodyWidget = undefined;
        var previousBlock = block.previousRenderedWidget;
        prevBodyWidget = (previousBlock && previousBlock.containerWidget.equals(block.containerWidget)) ?
            previousBlock.containerWidget :
            (block instanceof TableWidget && !isNullOrUndefined(block.containerWidget.previousRenderedWidget) && block.containerWidget.index === block.containerWidget.previousRenderedWidget.index) ?
                block.containerWidget.previousRenderedWidget :
                block.containerWidget;
        index = previousBlock && previousBlock.containerWidget.equals(block.containerWidget) ?
            prevBodyWidget.childWidgets.indexOf(previousBlock) : block.containerWidget.childWidgets.indexOf(block);
        return { bodyWidget: prevBodyWidget, index: index };
    };
    Layout.prototype.moveBlocksToNextPage = function (block, moveFootnoteFromLastBlock, childStartIndex, sectionBreakContinuous, isEndnote, isTableSplit) {
        var body = block.bodyWidget;
        this.viewer.columnLayoutArea.setColumns(body.sectionFormat);
        var nextColumn = this.viewer.columnLayoutArea.getNextColumnByBodyWidget(block.bodyWidget);
        var nextPage = undefined;
        var nextBody = undefined;
        if (!isNullOrUndefined(nextColumn) && !(block instanceof ParagraphWidget && block.isEndsWithPageBreak)) {
            nextBody = this.moveToNextColumnByBodyWidget(block, childStartIndex);
            nextBody.columnIndex = nextColumn.index;
            nextBody.y = block.bodyWidget.y;
            this.viewer.updateClientArea(nextBody, nextBody.page);
            this.viewer.clientActiveArea.height -= nextBody.y - this.viewer.clientActiveArea.y;
            this.viewer.clientActiveArea.y = nextBody.y;
            if (block.bodyWidget.sectionFormat.columns.length > 1) {
                var columnIndex = block.bodyWidget.columnIndex;
                var columnWidth = block.bodyWidget.x + block.bodyWidget.sectionFormat.columns[columnIndex].width + block.bodyWidget.sectionFormat.columns[columnIndex].space;
                for (var j = 0; j < block.bodyWidget.floatingElements.length; j++) {
                    if (block.bodyWidget.floatingElements[j] instanceof ShapeElementBox && columnWidth < block.bodyWidget.floatingElements[j].x + block.bodyWidget.floatingElements[j].width) {
                        nextBody.floatingElements.push(block.bodyWidget.floatingElements[j]);
                    }
                }
            }
        }
        if (isNullOrUndefined(nextBody)) {
            var insertPage = false;
            var page = body.page;
            var pageIndex = page.index + 1;
            if (this.documentHelper.pages.length > pageIndex && !this.isMultiColumnLayout) {
                nextPage = this.documentHelper.pages[pageIndex];
                if (isEndnote && !isNullOrUndefined(nextPage) && !isNullOrUndefined(nextPage.endnoteWidget)) {
                    if (nextPage.endnoteWidget.bodyWidgets[0].index === body.index) {
                        nextBody = nextPage.endnoteWidget.bodyWidgets[0];
                        this.viewer.updateClientArea(nextBody, nextBody.page);
                    }
                    else {
                        nextBody = this.createSplitBody(body);
                        var newEndnote = new FootNoteWidget();
                        newEndnote.footNoteType = 'Endnote';
                        newEndnote.page = nextPage;
                        newEndnote.bodyWidgets.push(nextBody);
                        nextBody.containerWidget = newEndnote;
                        nextBody.page = nextPage;
                        this.viewer.updateClientArea(nextBody, nextBody.page);
                        nextBody.y = this.viewer.clientActiveArea.y;
                    }
                }
                else if (!isNullOrUndefined(nextPage) && nextPage.bodyWidgets.length !== 0 && body.sectionFormat.pageHeight === nextPage.bodyWidgets[0].sectionFormat.pageHeight && body.sectionFormat.pageWidth === nextPage.bodyWidgets[0].sectionFormat.pageWidth && body.sectionFormat.breakCode === 'NoBreak') {
                    if (nextPage.bodyWidgets[0].index === body.index) {
                        nextBody = nextPage.bodyWidgets[0];
                        this.viewer.updateClientArea(nextBody, nextBody.page);
                    }
                    else {
                        nextBody = this.createSplitBody(body);
                        nextPage.bodyWidgets.splice(0, 0, nextBody);
                        nextBody.page = nextPage;
                        this.viewer.updateClientArea(nextBody, nextBody.page);
                        nextBody.y = this.viewer.clientActiveArea.y;
                    }
                }
                else if (nextPage.bodyWidgets.length === 0 || !body.equals(nextPage.bodyWidgets[0]) || (body.sectionIndex !== nextPage.bodyWidgets[0].sectionIndex && (body.sectionFormat.breakCode === 'NewPage' || (!body.isWord2010NextColumn && body.sectionFormat.breakCode !== 'NoBreak')))) {
                    nextPage = undefined;
                    insertPage = true;
                }
                else {
                    nextBody = nextPage.bodyWidgets[0];
                    this.viewer.updateClientArea(nextBody, nextBody.page);
                }
            }
            if (this.isMultiColumnLayout) {
                insertPage = true;
            }
            if (isNullOrUndefined(nextPage)) {
                nextBody = this.createSplitBody(body);
                if ((((this.documentHelper.owner.editorHistoryModule &&
                    this.documentHelper.owner.editorHistoryModule.isRedoing && this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo &&
                    this.documentHelper.owner.editorHistoryModule.currentBaseHistoryInfo.action === 'SectionBreakContinuous')) && block.bodyWidget.sectionFormat.breakCode === 'NoBreak')
                    || sectionBreakContinuous) {
                    //  this.viewer.clientActiveArea.y = block.y + block.height;
                }
                else if (isEndnote) {
                    var lastBodyWidget = page.bodyWidgets[body.page.bodyWidgets.length - 1];
                    var newBodyWidget = this.createSplitBody(lastBodyWidget);
                    nextPage = this.viewer.createNewPage(newBodyWidget, pageIndex);
                    this.viewer.updateClientArea(newBodyWidget, newBodyWidget.page);
                    newBodyWidget.y = nextBody.y = this.viewer.clientActiveArea.y;
                    nextBody.page = nextPage;
                }
                else {
                    nextPage = this.viewer.createNewPage(nextBody, pageIndex);
                    this.viewer.updateClientArea(nextBody, nextBody.page);
                    nextBody.y = this.viewer.clientActiveArea.y;
                }
                if (insertPage && !isNullOrUndefined(nextPage)) {
                    this.documentHelper.insertPage(pageIndex, nextPage);
                }
                this.clearLineMeasures();
            }
            if (nextPage) {
                do {
                    var lastBody = body.page.bodyWidgets[body.page.bodyWidgets.length - 1];
                    if (this.isSectionBreakCont || body === lastBody || body.containerWidget instanceof FootNoteWidget) {
                        break;
                    }
                    body.page.bodyWidgets.splice(body.page.bodyWidgets.indexOf(lastBody), 1);
                    nextPage.bodyWidgets.splice(1, 0, lastBody);
                    lastBody.page = nextPage;
                } while (true);
            }
        }
        // eslint-disable  no-constant-condition
        if (this.isTextFormat) {
            var index = body.childWidgets.indexOf(block);
            var child = body.childWidgets.slice(index);
            body.childWidgets.splice(index);
            for (var _i = 0, child_1 = child; _i < child_1.length; _i++) {
                var obj = child_1[_i];
                nextBody.childWidgets.push(obj);
                obj.containerWidget = nextBody;
            }
        }
        else {
            do {
                var lastBlock = void 0;
                if (body.lastChild instanceof FootNoteWidget) {
                    lastBlock = body.lastChild.previousWidget;
                }
                else {
                    lastBlock = body.lastChild;
                }
                if (moveFootnoteFromLastBlock || (isTableSplit && block !== lastBlock && !(lastBlock instanceof TableWidget) && lastBlock.isLayouted)) {
                    var footWidget = this.getFootNoteWidgetsOf(lastBlock);
                    this.moveFootNotesToPage(footWidget, body, nextBody);
                }
                if (block === lastBlock) {
                    break;
                }
                body.childWidgets.splice(body.childWidgets.indexOf(lastBlock), 1);
                nextBody.childWidgets.splice(0, 0, lastBlock);
                if (lastBlock instanceof TableWidget && (body.floatingElements.indexOf(lastBlock) !== -1)) {
                    body.floatingElements.splice(body.floatingElements.indexOf(lastBlock), 1);
                    //nextBody.floatingElements.push(lastBlock);
                }
                if (lastBlock instanceof ParagraphWidget && lastBlock.floatingElements.length > 0) {
                    for (var m = 0; m < lastBlock.floatingElements.length; m++) {
                        if (body.floatingElements.indexOf(lastBlock.floatingElements[m]) !== -1 && lastBlock.floatingElements[m].textWrappingStyle !== 'Inline') {
                            body.floatingElements.splice(body.floatingElements.indexOf(lastBlock.floatingElements[m]), 1);
                            nextBody.floatingElements.push(lastBlock.floatingElements[m]);
                        }
                    }
                }
                lastBlock.containerWidget = nextBody;
                nextBody.height += lastBlock.height;
                // eslint-disable-next-line no-constant-condition
            } while (true);
        }
        return nextBody;
    };
    Layout.prototype.createSplitBody = function (body) {
        var newBody = this.addBodyWidget(this.viewer.clientActiveArea);
        newBody.sectionFormat = body.sectionFormat;
        newBody.index = body.index;
        return newBody;
    };
    Layout.prototype.createOrGetNextColumnBody = function (fromBody) {
        var nextColumnBody;
        if (fromBody.nextRenderedWidget && fromBody.columnIndex + 1 === fromBody.nextRenderedWidget.columnIndex) {
            nextColumnBody = fromBody.nextRenderedWidget;
        }
        if (isNullOrUndefined(nextColumnBody)) {
            nextColumnBody = new BodyWidget();
            nextColumnBody.sectionFormat = fromBody.sectionFormat;
            nextColumnBody.index = fromBody.index;
            nextColumnBody.page = fromBody.page;
            nextColumnBody.y = fromBody.y;
            if (fromBody.containerWidget instanceof FootNoteWidget) {
                fromBody.containerWidget.bodyWidgets.splice(fromBody.containerWidget.bodyWidgets.indexOf(fromBody) + 1, 0, nextColumnBody);
                nextColumnBody.containerWidget = fromBody.containerWidget;
            }
            else {
                fromBody.page.bodyWidgets.splice(fromBody.page.bodyWidgets.indexOf(fromBody) + 1, 0, nextColumnBody);
            }
        }
        return nextColumnBody;
    };
    Layout.prototype.moveToNextColumnByBodyWidget = function (block, childStartIndex) {
        var fromBody = block.containerWidget;
        var nextColumnBody = this.createOrGetNextColumnBody(fromBody);
        return nextColumnBody;
    };
    //endregion
    //#region Relayout Parargaph
    /* eslint-disable  */
    Layout.prototype.reLayoutLine = function (paragraph, lineIndex, isBidi, isSkip, isSkipList) {
        if (!this.documentHelper.owner.editorModule.isFootnoteElementRemoved) {
            this.isFootnoteContentChanged = false;
        }
        if (this.viewer.owner.isDocumentLoaded && this.viewer.owner.editorModule && !isSkipList) {
            this.viewer.owner.editorModule.updateWholeListItems(paragraph);
        }
        var lineWidget;
        if (paragraph.paragraphFormat.listFormat && paragraph.paragraphFormat.listFormat.listId !== -1) {
            lineWidget = paragraph.getSplitWidgets()[0].firstChild;
        }
        else {
            lineWidget = paragraph.childWidgets[lineIndex];
        }
        var lineToLayout;
        if (paragraph.containerWidget instanceof BodyWidget && paragraph.containerWidget.sectionFormat.numberOfColumns > 1 && paragraph.containerWidget.sectionFormat.equalWidth) {
            lineToLayout = lineWidget.previousLine;
        }
        if (isNullOrUndefined(lineToLayout)) {
            lineToLayout = lineWidget;
        }
        if (this.allowLayout) {
            lineToLayout.paragraph.splitTextRangeByScriptType(lineToLayout.indexInOwner);
            lineToLayout.paragraph.splitLtrAndRtlText(lineToLayout.indexInOwner);
            lineToLayout.paragraph.combineconsecutiveRTL(lineToLayout.indexInOwner);
        }
        var bodyWidget = paragraph.containerWidget;
        bodyWidget.height -= paragraph.height;
        if ((this.viewer.owner.enableHeaderAndFooter || paragraph.isInHeaderFooter) && !(bodyWidget instanceof TextFrame)) {
            paragraph.bodyWidget.isEmpty = false;
            this.viewer.updateHeaderFooterClientAreaWithTop(paragraph.bodyWidget.sectionFormat, this.documentHelper.isBlockInHeader(paragraph), bodyWidget.page);
        }
        else if (bodyWidget instanceof TextFrame) {
            this.viewer.updateClientAreaForTextBoxShape(bodyWidget.containerShape, true);
            // } else if (bodyWidget instanceof FootNoteWidget) {
            //     this.isRelayoutFootnote = true;
            //     this.viewer.updateClientArea(bodyWidget.sectionFormat, bodyWidget.page);
            //     this.viewer.clientArea.height = Number.POSITIVE_INFINITY;
            //     this.viewer.clientActiveArea.height = Number.POSITIVE_INFINITY;
            //     // curretBlock.containerWidget.height -= curretBlock.height;
            //     this.viewer.clientActiveArea.y = paragraph.containerWidget.y;
        }
        else {
            this.viewer.updateClientArea(bodyWidget, bodyWidget.page, true);
        }
        this.viewer.updateClientAreaForBlock(paragraph, true);
        var pageIndexBeforeLayout = 0;
        if (paragraph.containerWidget instanceof BodyWidget) {
            var blocks = paragraph.getSplitWidgets();
            var splittedWidget = blocks[blocks.length - 1];
            pageIndexBeforeLayout = splittedWidget.containerWidget.page.index;
        }
        if (!isNullOrUndefined(paragraph.containerWidget) && !isNullOrUndefined(paragraph.containerWidget.containerWidget) && paragraph.containerWidget.containerWidget instanceof FootNoteWidget) {
            var y = paragraph.bodyWidget.containerWidget.y;
            this.viewer.cutFromTop(y);
            this.documentHelper.owner.editorModule.isFootNoteInsert = true;
            this.layoutfootNote(paragraph.containerWidget.containerWidget);
            this.documentHelper.owner.editorModule.isFootNoteInsert = false;
            return;
        }
        else if (lineToLayout.paragraph.isEmptyInternal(true) && isNullOrUndefined(lineToLayout.paragraph.nextSplitWidget)) {
            this.viewer.cutFromTop(paragraph.y);
            this.layoutParagraph(paragraph, 0);
        }
        else {
            this.updateClientAreaForLine(lineToLayout);
            this.layoutListItems(lineToLayout.paragraph);
            if (lineToLayout.isFirstLine() && !isNullOrUndefined(paragraph.paragraphFormat)) {
                var firstLineIndent = -HelperMethods.convertPointToPixel(paragraph.paragraphFormat.firstLineIndent);
                this.viewer.updateClientWidth(firstLineIndent);
            }
            do {
                lineToLayout = this.layoutLine(lineToLayout, 0);
                paragraph = lineToLayout.paragraph;
                lineToLayout = lineToLayout.nextLine;
            } while (lineToLayout);
            this.updateWidgetToPage(this.viewer, paragraph);
        }
        this.viewer.updateClientAreaForBlock(paragraph, false);
        var pageIndexAfterLayout = 0;
        if (paragraph.containerWidget instanceof BodyWidget) {
            var blocks = paragraph.getSplitWidgets();
            var splittedWidget = blocks[blocks.length - 1];
            pageIndexAfterLayout = splittedWidget.containerWidget.page.index;
        }
        this.layoutNextItemsBlock(paragraph, this.viewer, undefined, pageIndexBeforeLayout !== pageIndexAfterLayout);
        var prevWidget = paragraph.getSplitWidgets()[0].previousRenderedWidget;
        if (!isNullOrUndefined(prevWidget) && !paragraph.isEndsWithPageBreak && !paragraph.isEndsWithColumnBreak && (!(prevWidget instanceof ParagraphWidget) ||
            (prevWidget instanceof ParagraphWidget) && !prevWidget.isEndsWithPageBreak && !prevWidget.isEndsWithColumnBreak)) {
            this.viewer.cutFromTop(paragraph.y + paragraph.height);
            if (paragraph.containerWidget !== prevWidget.containerWidget && !isNullOrUndefined(prevWidget.containerWidget)) {
                /* eslint-disable-next-line max-len */
                var prevBodyWidget = paragraph.containerWidget;
                var newBodyWidget_1 = prevWidget.containerWidget;
                var footWidgets = this.getFootNoteWidgetsOf(paragraph);
                //this.updateContainerWidget(paragraph as Widget, newBodyWidget, prevWidget.indexInOwner + 1, false);
                if (!isNullOrUndefined(newBodyWidget_1.page.footnoteWidget)) {
                    this.moveFootNotesToPage(footWidgets, newBodyWidget_1, prevBodyWidget);
                }
            }
        }
        var page = this.documentHelper.pages.length;
        var lastPage = this.documentHelper.pages[page - 1];
        var foot;
        var newBodyWidget = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
        if ((this.documentHelper.owner.editorModule.isFootnoteElementRemoved || this.isFootnoteContentChanged)
            && !isNullOrUndefined(paragraph.bodyWidget.page.footnoteWidget)) {
            foot = paragraph.bodyWidget.page.footnoteWidget;
            this.layoutfootNote(foot);
        }
        if (!isNullOrUndefined(this.viewer.owner.editorHistoryModule) && this.viewer.owner.editorHistoryModule.isRedoing && !isNullOrUndefined(newBodyWidget.page.endnoteWidget)) {
            this.isEndnoteContentChanged = true;
        }
        if ((this.documentHelper.owner.editorModule.isEndnoteElementRemoved || this.isEndnoteContentChanged)
            && !isNullOrUndefined(newBodyWidget.page.endnoteWidget)) {
            foot = newBodyWidget.page.endnoteWidget;
            var clientArea = this.viewer.clientArea.clone();
            var clientActiveArea = this.viewer.clientActiveArea.clone();
            var y = newBodyWidget.y;
            if (newBodyWidget.childWidgets.length > 0) {
                var lastPageLastPara = newBodyWidget.childWidgets[newBodyWidget.childWidgets.length - 1];
                y = lastPageLastPara.y + lastPageLastPara.height;
            }
            this.viewer.clientActiveArea.height = this.viewer.clientActiveArea.bottom - y;
            this.viewer.clientActiveArea.x = this.viewer.clientArea.x;
            this.viewer.clientActiveArea.width = this.viewer.clientArea.width;
            this.viewer.clientActiveArea.y = y;
            this.layoutfootNote(foot);
            this.viewer.clientArea = clientArea;
            this.viewer.clientActiveArea = clientActiveArea;
            //this.viewer.updateClientAreaForBlock(foot.block, false);
        }
        if (!isNullOrUndefined(this.viewer.owner.editorHistoryModule) && this.viewer.owner.editorHistoryModule.isRedoing) {
            this.isEndnoteContentChanged = false;
        }
    };
    //#endregion
    //RTL Feature layout start
    Layout.prototype.isContainsRtl = function (lineWidget) {
        if (this.viewer.documentHelper.isSelectionChangedOnMouseMoved && !this.isDocumentContainsRtl) {
            return false;
        }
        var isContainsRTL = false;
        for (var i = 0; i < lineWidget.children.length; i++) {
            if (lineWidget.children[i] instanceof TextElementBox) {
                isContainsRTL = lineWidget.children[i].characterFormat.bidi || lineWidget.children[i].characterFormat.bdo === 'RTL'
                    || this.documentHelper.textHelper.isRTLText(lineWidget.children[i].text);
                if (isContainsRTL) {
                    if (!this.isDocumentContainsRtl) {
                        this.isDocumentContainsRtl = isContainsRTL;
                    }
                    break;
                }
            }
        }
        return isContainsRTL;
    };
    // Re arranges the elements for Right to left layotuing.
    /* eslint-disable  */
    // public reArrangeElementsForRtl(line: LineWidget, isParaBidi: boolean): void {
    //     if (line.children.length === 0) {
    //         return;
    //     }
    //     let lastAddedElementIsRtl: boolean = false;
    //     let lastAddedRtlElementIndex: number = -1;
    //     let tempElements: ElementBox[] = [];
    //     for (let i: number = 0; i < line.children.length; i++) {
    //         let element: ElementBox = line.children[i];
    //         let elementCharacterFormat: WCharacterFormat = undefined;
    //         if (element.characterFormat) {
    //             elementCharacterFormat = element.characterFormat;
    //         }
    //         let isRtl: boolean = false;
    //         let text: string = '';
    //         let containsSpecchrs: boolean = false;
    //         if (element instanceof BookmarkElementBox) {
    //             if (isParaBidi) {
    //                 if (lastAddedElementIsRtl || element.bookmarkType === 0 && element.nextElement
    //                     && element.nextElement.nextElement instanceof TextElementBox
    //                     && this.documentHelper.textHelper.isRTLText(element.nextElement.nextElement.text)
    //                     || element.bookmarkType === 1 && element.nextElement instanceof TextElementBox
    //                     && this.documentHelper.textHelper.isRTLText(element.nextElement.text)) {
    //                     tempElements.splice(0, 0, element);
    //                 } else {
    //                     tempElements.splice(lastAddedElementIsRtl ? lastAddedRtlElementIndex : lastAddedRtlElementIndex + 1, 0, element);
    //                 }
    //                 lastAddedRtlElementIndex = tempElements.indexOf(element);
    //             } else {
    //                 tempElements.push(element);
    //             }
    //             continue;
    //         }
    //         if (element instanceof TextElementBox) {
    //             text = (element as TextElementBox).text;
    //             containsSpecchrs = this.documentHelper.textHelper.containsSpecialCharAlone(text.trim());
    //             if (containsSpecchrs) {
    //                 if (elementCharacterFormat.bidi && isParaBidi) {
    //                     text = HelperMethods.reverseString(text);
    //                     for (let k: number = 0; k < text.length; k++) {
    //                         let ch: string = this.documentHelper.textHelper.inverseCharacter(text.charAt(k));
    //                         text = text.replace(text.charAt(k), ch);
    //                     }
    //                     element.text = text;
    //                 }
    //             }
    //             let textElement: ElementBox = element.nextElement;
    //             if (element instanceof TextElementBox && this.documentHelper.textHelper.containsNumberAlone(element.text.trim())) {
    //                 while (textElement instanceof TextElementBox && textElement.text.trim() !== '' && (this.documentHelper.textHelper.containsNumberAlone(textElement.text.trim()) || this.documentHelper.textHelper.containsSpecialCharAlone(textElement.text.trim()))) {
    //                     element.text = element.text + textElement.text;
    //                     element.line.children.splice(element.line.children.indexOf(textElement), 1);
    //                     textElement = element.nextElement;
    //                 }
    //                 element.width = this.documentHelper.textHelper.getTextSize(element as TextElementBox, element.characterFormat);
    //             }
    //         }
    //         let isRTLText: boolean = false;
    //         // let isNumber: boolean = false;
    //         // The list element box shold be added in the last position in line widget for the RTL paragraph 
    //         // and first in the line widget for LTR paragrph.
    //         if (element instanceof ListTextElementBox) {
    //             isRtl = isParaBidi;
    //         } else { // For Text element box we need to check the character format and unicode of text to detect the RTL text. 
    //             isRTLText = this.documentHelper.textHelper.isRTLText(text);
    //             isRtl = isRTLText || elementCharacterFormat.bidi
    //                 || elementCharacterFormat.bdo === 'RTL';
    //         }
    //         if (element instanceof FieldElementBox || this.isRtlFieldCode) {
    //             if ((element as FieldElementBox).fieldType === 0) {
    //                 this.isRtlFieldCode = true;
    //             } else if ((element as FieldElementBox).fieldType === 1) {
    //                 this.isRtlFieldCode = false;
    //             }
    //             isRtl = false;
    //         }
    //         // If the text element box contains only whitespaces, then need to check the previous and next elements.
    //         if (!isRtl && !isNullOrUndefined(text) && text !== '' && ((text !== '' && text.trim() === '') || containsSpecchrs)) {
    //             let elements: ElementBox[] = line.children;
    //             //Checks whether the langugae is RTL.
    //             if (elementCharacterFormat.bidi) {
    //                 // If the last added element is rtl then current text element box also considered as RTL for WhiteSpaces.
    //                 if (lastAddedElementIsRtl) {
    //                     isRtl = true;
    //                     // Else, Check for next element.
    //                 } else if (i + 1 < line.children.length && line.children[i + 1] instanceof TextElementBox) {
    //                     text = (elements[i + 1] as TextElementBox).text;
    //                     isRtl = this.documentHelper.textHelper.isRTLText(text) || elements[i + 1].characterFormat.bidi
    //                         || elements[i + 1].characterFormat.bdo === 'RTL';
    //                 }// If the last added element is rtl then current text element box also considered as RTL for WhiteSpaces.
    //             } else if (lastAddedElementIsRtl) {
    //                 isRtl = true;
    //             }
    //         }
    //         // Preserve the isRTL value, to reuse it for navigation and selection.
    //         element.isRightToLeft = isRtl;
    //         //Adds the text element to the line
    //         if (isRtl && elementCharacterFormat.bdo !== 'LTR') {
    //             if (lastAddedElementIsRtl) {
    //                 tempElements.splice(lastAddedRtlElementIndex, 0, element);
    //             } else {
    //                 if (!isParaBidi) {
    //                     tempElements.push(element);
    //                 } else {
    //                     tempElements.splice(0, 0, element);
    //                 }
    //                 lastAddedElementIsRtl = true;
    //                 lastAddedRtlElementIndex = tempElements.indexOf(element);
    //             }
    //         } else {
    //             if (lastAddedElementIsRtl && element instanceof ImageElementBox) {
    //                 if (elementCharacterFormat.bidi) {
    //                     tempElements.splice(lastAddedRtlElementIndex + 1, 0, element);
    //                 } else {
    //                     tempElements.splice(lastAddedRtlElementIndex, 0, element);
    //                 }
    //             } else {
    //                 if (!isParaBidi) {
    //                     tempElements.push(element);
    //                 } else {
    //                     if (lastAddedElementIsRtl) {
    //                         tempElements.splice(0, 0, element);
    //                     } else {
    //                         tempElements.splice(lastAddedRtlElementIndex + 1, 0, element);
    //                     }
    //                     lastAddedRtlElementIndex = tempElements.indexOf(element);
    //                 }
    //                 lastAddedElementIsRtl = false;
    //             }
    //         }
    //     }
    //     // Clear the elemnts and reassign the arranged elements.
    //     line.children = [];
    //     line.children = tempElements;
    // }
    Layout.prototype.shiftElementsForRTLLayouting = function (line, paraBidi) {
        ////Check whether span has bidi value
        var textRangeBidi = this.hasTextRangeBidi(line);
        if (this.isContainsRTLText(line) || paraBidi || textRangeBidi) {
            ////Splits the child elements of a line by consecutive RTL, LTR text and word breaking characters.
            var characterRangeTypes = [];
            var lineElementsBidiValues = [];
            for (var i = 0; i < line.children.length; i++) {
                var element = line.children[i];
                if (element instanceof TextElementBox && element.height > 0 && !(element.isPageBreak) && element.text !== '\v') {
                    var textRange = element;
                    lineElementsBidiValues.push(textRange.characterFormat.bidi);
                    if (textRange.text == "\t") {
                        characterRangeTypes.push(CharacterRangeType.Tab);
                    }
                    else {
                        characterRangeTypes.push(textRange.characterRange);
                    }
                    element.isRightToLeft = characterRangeTypes[characterRangeTypes.length - 1] == CharacterRangeType.RightToLeft;
                }
                else if (element instanceof CommentCharacterElementBox
                    || element instanceof BookmarkElementBox || element instanceof EditRangeStartElementBox
                    || element instanceof EditRangeEndElementBox || element instanceof ContentControl
                    || element instanceof FieldElementBox) {
                    var isStartMark = this.isStartMarker(element);
                    var isEndMark = this.isEndMarker(element);
                    if (isStartMark && i < line.children.length - 1) {
                        var nextltWidget = this.getNextValidWidget(i + 1, line);
                        if (!isNullOrUndefined(nextltWidget) && (nextltWidget instanceof TextElementBox)
                            && nextltWidget.height > 0) {
                            var textRange = nextltWidget;
                            lineElementsBidiValues.push(textRange.characterFormat.bidi);
                            //Since tab-stop in the line changes the reordering, here we consider an tab-stop widget as Tab.
                            if (nextltWidget.text === '\t') {
                                characterRangeTypes.push(CharacterRangeType.Tab);
                            }
                            else {
                                characterRangeTypes.push(textRange.characterRange);
                            }
                        }
                        else {
                            lineElementsBidiValues.push(false);
                            characterRangeTypes.push(CharacterRangeType.LeftToRight);
                        }
                    }
                    else if (!isEndMark && i > 0) {
                        lineElementsBidiValues.push(lineElementsBidiValues[lineElementsBidiValues.length - 1]);
                        characterRangeTypes.push(characterRangeTypes[characterRangeTypes.length - 1]);
                    }
                    else {
                        lineElementsBidiValues.push(false);
                        characterRangeTypes.push(CharacterRangeType.LeftToRight);
                    }
                }
                else if (element instanceof ListTextElementBox && paraBidi) {
                    lineElementsBidiValues.push(paraBidi);
                    characterRangeTypes.push(CharacterRangeType.RightToLeft);
                }
                else {
                    lineElementsBidiValues.push(false);
                    characterRangeTypes.push(CharacterRangeType.LeftToRight);
                }
            }
            ////Sets CharacterRangeType of word split characters as (WordSplit | RTL), if word split characters are present between splitted RTL text in the same layouted line.
            ////This code handles for both single and multiple Text Ranges of a line (Special case for ordering elements)
            var rtlStartIndex = -1;
            var isPrevLTRText = undefined;
            for (var i = 0; i < characterRangeTypes.length; i++) {
                if (i + 1 < lineElementsBidiValues.length
                    && lineElementsBidiValues[i] != lineElementsBidiValues[i + 1]) {
                    if (rtlStartIndex != -1) {
                        this.updateCharacterRange(line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                        rtlStartIndex = -1;
                    }
                    isPrevLTRText = null;
                    continue;
                }
                /// When only one NumberNonReversingCharacter(.:,) is exists in between a two numbers and 
                /// both these number and NumberNonReversingCharacter having a Bidi property,
                /// MS Word consider this NumberNonReversingCharacter(.:,) as Number and re-order it accordingly.
                if (i > 0 && i != characterRangeTypes.length - 1
                    && characterRangeTypes[i] == CharacterRangeType.WordSplit && lineElementsBidiValues[i]
                    && characterRangeTypes[i - 1] == CharacterRangeType.Number && lineElementsBidiValues[i - 1]
                    && characterRangeTypes[i + 1] == CharacterRangeType.Number && lineElementsBidiValues[i + 1]
                    && this.isNumberNonReversingCharacter(line.children[i])) {
                    characterRangeTypes[i] = CharacterRangeType.Number;
                }
                else if (characterRangeTypes[i] == CharacterRangeType.RightToLeft || characterRangeTypes[i] == CharacterRangeType.LeftToRight
                    || characterRangeTypes[i] == CharacterRangeType.Number && rtlStartIndex != -1
                    || (isNullOrUndefined(isPrevLTRText) || !isPrevLTRText) && lineElementsBidiValues[i]) {
                    if (rtlStartIndex == -1 && characterRangeTypes[i] != CharacterRangeType.LeftToRight) {
                        rtlStartIndex = i;
                    }
                    else if (rtlStartIndex == -1) {
                        if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                            isPrevLTRText = true;
                        }
                        else if (characterRangeTypes[i] == CharacterRangeType.RightToLeft) {
                            isPrevLTRText = false;
                        }
                        continue;
                    }
                    else if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                        this.updateCharacterRange(line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                        rtlStartIndex = characterRangeTypes[i] == CharacterRangeType.RightToLeft
                            || characterRangeTypes[i] == CharacterRangeType.Number && rtlStartIndex != -1 ? i : -1;
                    }
                }
                if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                    isPrevLTRText = true;
                }
                else if (characterRangeTypes[i] == CharacterRangeType.RightToLeft) {
                    isPrevLTRText = false;
                }
            }
            if (rtlStartIndex != -1 && rtlStartIndex < characterRangeTypes.length - 1) {
                this.updateCharacterRange(line, characterRangeTypes.length - 1, rtlStartIndex, lineElementsBidiValues, characterRangeTypes);
                rtlStartIndex = -1;
            }
            if (characterRangeTypes.length != line.children.length) {
                ////This exception is thrown to avoid, unhandled exception in RTL/LTR reordering logic.
                throw new Error("Splitted Widget count mismatch while reordering layouted child widgets of a line");
            }
            var reorderedWidgets = this.reorderElements(line, characterRangeTypes, lineElementsBidiValues, paraBidi);
            lineElementsBidiValues.length = 0;
            characterRangeTypes.length = 0;
            if (line.children.length > 0) {
                line.layoutedElements = reorderedWidgets;
                //elements.Clear();
                //line.children = reorderedWidgets;
                ////ReCalculate the height and baseline offset once again.
                //UpdateMaxElement();
            }
        }
        return paraBidi;
    };
    Layout.prototype.isNumberNonReversingCharacter = function (element) {
        if (element instanceof TextElementBox) {
            var textRange = element;
            if (textRange.characterFormat.hasValueWithParent('localeIdBidi')) {
                //Only these 10 word split characters (‘/’,‘:’,‘.’,‘,’,‘،’,‘#’,‘$’,‘%’,‘+’,‘-’) are behaving as number non reversing character based on language identifier.
                var ch = textRange.text.charCodeAt(0);
                //(‘/’) character is behaves as number non reversing character for some specific language identifiers.
                if ((ch == 47 && !this.isNumberReverseLangForSlash(textRange.characterFormat.localeIdBidi))
                    //(‘#’,‘$’,‘%’,‘+’,‘-’) characters are behaving as number non reversing character for some specific language identifiers.
                    || ((ch == 35 || ch == 36 || ch == 37 || ch == 43 || ch == 45) && !this.isNumberReverseLangForOthers(textRange.characterFormat.localeIdBidi))
                    //(‘,’,‘.’,‘:’,‘،’) characters are behaving as number non reversing character for any language identifier.
                    || (ch == 44 || ch == 46 || ch == 58 || ch == 1548)) {
                    return true;
                }
            }
            else {
                return TextHelper.isNumberNonReversingCharacter(textRange.text, textRange.characterFormat.bidi);
            }
        }
        return false;
    };
    Layout.prototype.isNumberReverseLangForSlash = function (lang) {
        return (this.isNumberReverseLangForOthers(lang) || lang == 6145 || lang == 1164 || lang == 1125 ||
            lang == 1120 || lang == 1123 || lang == 1065 || lang == 2137 ||
            lang == 1114 || lang == 1119 || lang == 1152 || lang == 1056);
    };
    Layout.prototype.isNumberReverseLangForOthers = function (lang) {
        return (lang == 14337 || lang == 15361 || lang == 5121 || lang == 3073 || lang == 2049 ||
            lang == 11265 || lang == 13313 || lang == 12289 || lang == 4097 || lang == 8193 ||
            lang == 16385 || lang == 1025 || lang == 10241 || lang == 7169 || lang == 9217);
    };
    Layout.prototype.isStartMarker = function (element) {
        if (element instanceof CommentCharacterElementBox) {
            return element.commentType === 0;
        }
        else if (element instanceof BookmarkElementBox) {
            return element.bookmarkType === 0;
        }
        else if (element instanceof EditRangeStartElementBox) {
            return true;
        }
        else if (element instanceof ContentControl) {
            return element.type === 0;
        }
        else if (element instanceof FieldElementBox) {
            return element.fieldType === 0;
        }
        return false;
    };
    Layout.prototype.isEndMarker = function (element) {
        if (element instanceof CommentCharacterElementBox) {
            return element.commentType === 1;
        }
        else if (element instanceof BookmarkElementBox) {
            return element.bookmarkType === 1;
        }
        else if (element instanceof EditRangeStartElementBox) {
            return true;
        }
        else if (element instanceof ContentControl) {
            return element.type === 1;
        }
        else if (element instanceof FieldElementBox) {
            return element.fieldType === 1;
        }
        return false;
    };
    Layout.prototype.getNextValidWidget = function (startIndex, layoutedWidgets) {
        for (var i = startIndex; i < layoutedWidgets.children.length; i++) {
            var element = layoutedWidgets.children[i];
            if (element instanceof CommentCharacterElementBox
                || element instanceof BookmarkElementBox || element instanceof EditRangeStartElementBox
                || element instanceof EditRangeEndElementBox || element instanceof ContentControl
                || element instanceof FieldElementBox) {
                continue;
            }
            else {
                return element[i];
            }
        }
        return null;
    };
    Layout.prototype.hasTextRangeBidi = function (line) {
        for (var i = 0; i < line.children.length; i++) {
            var elementBox = line.children[i];
            if (elementBox instanceof TextElementBox) {
                var textRange = elementBox;
                if (textRange.characterFormat.bidi) {
                    return true;
                }
            }
        }
        return false;
    };
    Layout.prototype.isContainsRTLText = function (line) {
        var documentHelper = line.paragraph.bodyWidget.page.documentHelper;
        var textHelper = documentHelper.textHelper;
        var isContainsRTL = false;
        for (var i = 0; i < line.children.length; i++) {
            if (line.children[i] instanceof TextElementBox) {
                isContainsRTL = line.children[i].characterFormat.bidi || line.children[i].characterFormat.bidi == true
                    || textHelper.isRTLText(line.children[i].text);
                if (isContainsRTL)
                    break;
            }
        }
        return isContainsRTL;
    };
    Layout.prototype.updateCharacterRange = function (line, i, rtlStartIndex, lineElementsBidiValues, characterRangeTypes) {
        var endIndex = i;
        if (!lineElementsBidiValues[i]) {
            if (characterRangeTypes[i] === CharacterRangeType.LeftToRight) {
                endIndex--;
            }
            for (var j = endIndex; j >= rtlStartIndex; j--) {
                if (characterRangeTypes[j] != CharacterRangeType.WordSplit) {
                    endIndex = j;
                    break;
                }
            }
        }
        for (var j = rtlStartIndex; j <= endIndex; j++) {
            if (characterRangeTypes[j] == CharacterRangeType.WordSplit) {
                characterRangeTypes[j] = CharacterRangeType.RightToLeft | CharacterRangeType.WordSplit;
                var previousIndex = j - 1;
                var nextIndex = j + 1;
                //// Handled a special behavior, When a EastAsia font is "Times New Roman" for text range.
                //// Group of word split character is exist in between a RTL characters, MS Word reverse a corresponding word split characters.
                //// So, that we have reverse the word split characters.
                if (previousIndex >= 0 && nextIndex < characterRangeTypes.length
                    && characterRangeTypes[previousIndex] == CharacterRangeType.RightToLeft
                    && (characterRangeTypes[nextIndex] == CharacterRangeType.RightToLeft || characterRangeTypes[nextIndex] == CharacterRangeType.Number)
                    && line.children[j] instanceof TextElementBox) {
                    var textRange = line.children[j];
                    if (textRange.characterFormat.fontFamilyBidi == "Times New Roman") {
                        var charArray = textRange.text.split("");
                        var reverseArray = charArray.reverse();
                        var joinArray = reverseArray.join("");
                        textRange.text = joinArray;
                    }
                }
            }
        }
    };
    Layout.prototype.reorderElements = function (line, characterRangeTypes, listElementsBidiValues, paraBidi) {
        var insertIndex = 0, lastItemIndexWithoutRTLFlag = -1, consecutiveRTLCount = 0, consecutiveNumberCount = 0;
        var reorderedElements = [];
        var prevCharType = CharacterRangeType.LeftToRight;
        var prevBidi = false;
        for (var i = 0; i < line.children.length; i++) {
            var element = line.children[i];
            var textElement = element;
            textElement.characterRange = characterRangeTypes[i];
            var isRTLText = (textElement.characterRange & CharacterRangeType.RightToLeft) == CharacterRangeType.RightToLeft || textElement.characterRange == CharacterRangeType.Number;
            var isBidi = listElementsBidiValues[i];
            ////If tab-stop is exist with in the line then we have to consider the below behaviours
            if (characterRangeTypes[i] == CharacterRangeType.Tab) {
                if (paraBidi) {
                    ////When para bidi is true, reordering is performed until tab stop position and break the reordering and then again reordering is performed for the remaining contents which exist after the tab-stop. 
                    ////Assume if we have an tab stop in center of the line, then the reordering is performed until the tab stop position and stop and place a tab stop and starts reordering for the remaining contents. 
                    insertIndex = 0;
                    lastItemIndexWithoutRTLFlag = -1;
                    consecutiveRTLCount = 0;
                    prevCharType = CharacterRangeType.LeftToRight;
                    prevBidi = false;
                    reorderedElements.splice(insertIndex, 0, element);
                    continue;
                }
                else if (isBidi) {
                    ////If text range bidi is true for the tab stop widget, MS Word does not consider this tab-stop bidi as LTR Bidi and does not shift it as per our reordering. 
                    ////Instead its consider this widget as non-bidi LTR and do the reordering.
                    isBidi = false;
                }
            }
            if (i > 0 && prevBidi != isBidi) {
                if (paraBidi) {
                    ////If Bidi of paragraph is true, then start inserting widgets from first (index 0).
                    insertIndex = 0;
                    lastItemIndexWithoutRTLFlag = -1;
                    consecutiveRTLCount = 0;
                }
                else {
                    ////If Bidi of paragraph is false, then start inserting widgets from last (reorderedWidgets.Count).
                    lastItemIndexWithoutRTLFlag = reorderedElements.length - 1;
                }
                ////If Bidi for previous and next widget differs, we have to reset consecutive number to 0.
                consecutiveNumberCount = 0;
            }
            if (!isBidi && !isRTLText) {
                if (paraBidi) {
                    if (consecutiveRTLCount > 0 && prevBidi == isBidi) {
                        insertIndex += consecutiveRTLCount;
                    }
                    reorderedElements.splice(insertIndex, 0, element);
                    insertIndex++;
                }
                else {
                    reorderedElements.push(element);
                    insertIndex = i + 1;
                }
                consecutiveRTLCount = 0;
                lastItemIndexWithoutRTLFlag = paraBidi ? insertIndex - 1 : reorderedElements.length - 1;
            }
            else if (isRTLText || (isBidi && textElement.characterRange == CharacterRangeType.WordSplit
                && (prevCharType == CharacterRangeType.RightToLeft || this.isInsertWordSplitToLeft(characterRangeTypes, listElementsBidiValues, i)))) {
                consecutiveRTLCount++;
                insertIndex = lastItemIndexWithoutRTLFlag + 1;
                if (textElement.characterRange == CharacterRangeType.Number) {
                    if (prevCharType == CharacterRangeType.Number) {
                        ////Moves the insertIndex to the right after the previous consecutive number.
                        insertIndex += consecutiveNumberCount;
                    }
                    ////Increments consecutive number counter, to decide how much position the next number text range (widget) has to be moved and inserted towards right of insertIndex.
                    consecutiveNumberCount++;
                }
                reorderedElements.splice(insertIndex, 0, element);
            }
            else {
                reorderedElements.splice(insertIndex, 0, element);
                insertIndex++;
                consecutiveRTLCount = 0;
            }
            if (textElement.characterRange != CharacterRangeType.Number) {
                ////Resets the consecutive number counter when character range is not a number.
                consecutiveNumberCount = 0;
            }
            if (textElement.characterRange != CharacterRangeType.WordSplit) {
                ////Note: Handled to set only CharacterRangeType.RightToLeft and CharacterRangeType.LeftToRight
                ////For CharacterRangeType.WordSplit | CharacterRangeType.RightToLeft case, the IsInsertWordSplitToLeft method will return true.
                prevCharType = textElement.characterRange;
            }
            prevBidi = isBidi;
        }
        return reorderedElements;
    };
    Layout.prototype.isInsertWordSplitToLeft = function (characterRangeTypes, lineElementsBidiValues, elementIndex) {
        for (var i = elementIndex + 1; i < characterRangeTypes.length; i++) {
            if ((characterRangeTypes[i] & CharacterRangeType.RightToLeft) == CharacterRangeType.RightToLeft) {
                return true;
            }
            else if (characterRangeTypes[i] == CharacterRangeType.LeftToRight) {
                if (lineElementsBidiValues[i]) {
                    return false;
                }
                else {
                    ////If bidi is true for previous LTR and bidi is false for next LTR, then insert Word split to before previous inserted widget.
                    return true;
                }
            }
        }
        return true;
    };
    Layout.prototype.shiftLayoutFloatingItems = function (paragraph) {
        for (var i = 0; i < paragraph.floatingElements.length; i++) {
            var element = paragraph.floatingElements[i];
            var position = this.getFloatingItemPoints(element);
            var height = position.y - element.y;
            element.x = position.x;
            element.y = position.y;
            if (element instanceof ShapeElementBox) {
                for (var j = 0; j < element.textFrame.childWidgets.length; j++) {
                    var block = element.textFrame.childWidgets[j];
                    if (block instanceof ParagraphWidget) {
                        block.y = block.y + height;
                    }
                    else if (block instanceof TableWidget) {
                        this.shiftChildLocationForTableWidget(block, height);
                    }
                }
            }
        }
    };
    //RTL feature layout end
    Layout.prototype.getFloatingItemPoints = function (floatElement) {
        var paragraph = floatElement.line.paragraph;
        var sectionFormat = paragraph.bodyWidget.sectionFormat;
        var indentX = 0;
        var indentY = 0;
        if (paragraph) {
            var leftMargin = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
            var rightMargin = HelperMethods.convertPointToPixel(sectionFormat.rightMargin);
            var topMargin = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
            var bottomMargin = sectionFormat.bottomMargin > 0 ? HelperMethods.convertPointToPixel(sectionFormat.bottomMargin) : 48;
            var headerDistance = HelperMethods.convertPointToPixel(sectionFormat.headerDistance);
            var footerDistance = HelperMethods.convertPointToPixel(sectionFormat.footerDistance);
            var pageWidth = HelperMethods.convertPointToPixel(sectionFormat.pageWidth);
            var pageHeight = HelperMethods.convertPointToPixel(sectionFormat.pageHeight);
            var pageClientWidth = pageWidth - (leftMargin + rightMargin);
            var pageClientHeight = pageHeight - topMargin - bottomMargin;
            //Need to consider RTL layout.
            if (paragraph.isInHeaderFooter && sectionFormat.topMargin <= 0) {
                topMargin = Math.abs(topMargin) > 0 ? Math.abs(topMargin)
                    : HelperMethods.convertPointToPixel(sectionFormat.headerDistance) + (paragraph.height);
            }
            else {
                topMargin = topMargin > 0 ? topMargin : 48;
            }
            //Update the top margin as text body y position when text body y position exceeds the top margin. 
            if (!paragraph.isInHeaderFooter && topMargin < this.viewer.clientArea.y) {
                topMargin = this.viewer.clientArea.y;
            }
            var mIsYPositionUpdated = false;
            var textWrapStyle = 'InFrontOfText';
            //if (textWrapStyle !== 'Inline') {
            var isLayoutInCell = false;
            var vertOrigin = floatElement.verticalOrigin;
            var horzOrigin = floatElement.horizontalOrigin;
            var horzAlignment = floatElement.horizontalAlignment;
            var vertAlignment = floatElement.verticalAlignment;
            var verticalPercent = floatElement.verticalRelativePercent;
            var horizontalPercent = floatElement.horizontalRelativePercent;
            var shapeHeight = floatElement.height;
            //Need to update size width for Horizontal Line when width exceeds client width.
            // if(shape !== null && shape.IsHorizontalRule && size.Width > m_layoutArea.ClientActiveArea.Width)
            //     size.Width = m_layoutArea.ClientActiveArea.Width;
            var shapeWidth = floatElement.width;
            var vertPosition = floatElement.verticalPosition;
            var horzPosition = floatElement.horizontalPosition;
            var layoutInCell = floatElement.layoutInCell;
            var heightPercent = floatElement.heightRelativePercent;
            var widthPercent = floatElement.widthRelativePercent;
            var autoShape = void 0;
            if (floatElement instanceof ShapeElementBox) {
                autoShape = floatElement.autoShapeType;
            }
            //Word 2013 Layout picture in table cell even layoutInCell property was False.
            if (paragraph.isInsideTable && layoutInCell) {
                isLayoutInCell = true;
                indentY = this.getVerticalPosition(floatElement, vertPosition, vertOrigin, textWrapStyle);
                indentX = this.getHorizontalPosition(floatElement.width, floatElement, horzAlignment, horzOrigin, horzPosition, textWrapStyle, paragraph.associatedCell.cellFormat.cellWidth);
            }
            else {
                if (this.documentHelper.viewer instanceof WebLayoutViewer) {
                    switch (vertOrigin) {
                        case 'Line':
                            indentY = this.documentHelper.selection.getTop(floatElement.line);
                            break;
                        default:
                            indentY = this.viewer.clientActiveArea.y;
                            break;
                    }
                    switch (horzOrigin) {
                        case 'Character':
                            indentX = this.viewer.clientActiveArea.x;
                            break;
                        default:
                            switch (horzAlignment) {
                                case 'Center':
                                    indentX = (this.viewer.clientArea.width / 2) - (floatElement.width / 2);
                                    break;
                                default:
                                    indentX = this.viewer.clientArea.x;
                                    break;
                            }
                            break;
                    }
                }
                else {
                    if (mIsYPositionUpdated) { /* Upadte the Y Coordinate of floating image when floating image postion is changed based on the wrapping style. */
                        indentY = this.viewer.clientArea.y;
                    }
                    else {
                        switch (vertOrigin) {
                            case 'Page':
                            case 'TopMargin':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Top':
                                        indentY = vertPosition;
                                        break;
                                    case 'Center':
                                        if (vertOrigin === 'TopMargin') {
                                            indentY = (topMargin - shapeHeight) / 2;
                                        }
                                        else {
                                            if (heightPercent > 0 && widthPercent > 0) {
                                                indentY = (pageHeight - (pageHeight) * (heightPercent / 100)) / 2;
                                                floatElement.height = (pageHeight) * (heightPercent / 100);
                                            }
                                            else {
                                                indentY = (pageHeight - shapeHeight) / 2;
                                            }
                                        }
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        if (vertOrigin === 'Page' && vertAlignment === 'Bottom') {
                                            indentY = pageHeight - shapeHeight;
                                        }
                                        else {
                                            if (vertOrigin === 'TopMargin') {
                                                indentY = (topMargin - shapeHeight);
                                            }
                                            else if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                                indentY = pageHeight - shapeHeight - footerDistance / 2;
                                            }
                                            else {
                                                indentY = headerDistance / 2;
                                            }
                                        }
                                        break;
                                    case 'Inside':
                                        if (vertOrigin === 'Page') {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - shapeHeight - footerDistance / 2;
                                            }
                                            else {
                                                indentY = headerDistance / 2;
                                            }
                                        }
                                        else {
                                            //Need to ensure this behaviour.
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = ((topMargin - shapeHeight) / 2 - headerDistance);
                                            }
                                        }
                                        break;
                                    case 'None':
                                        if (Math.abs(verticalPercent) <= 1000) {
                                            indentY = pageHeight * (verticalPercent / 100);
                                        }
                                        else {
                                            indentY = vertPosition;
                                        }
                                        break;
                                }
                                break;
                            case 'Line':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Inside':
                                    case 'Top':
                                        //Need to update line widget height instead of client active area.
                                        indentY = this.viewer.clientActiveArea.y;
                                        break;
                                    case 'Center':
                                        indentY = this.viewer.clientActiveArea.y - shapeHeight / 2;
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        indentY = this.viewer.clientActiveArea.y - shapeHeight;
                                        break;
                                    case 'None':
                                        indentY = Math.round(paragraph.y) + vertPosition;
                                        break;
                                }
                                break;
                            case 'BottomMargin':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Inside':
                                    case 'Top':
                                        indentY = (pageHeight - bottomMargin);
                                        break;
                                    case 'Center':
                                        indentY = pageHeight - bottomMargin + ((bottomMargin - shapeHeight) / 2);
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        if (paragraph.bodyWidget.page.index + 1 % 2 !== 0 && vertAlignment === 'Outside') {
                                            indentY = pageHeight - bottomMargin;
                                        }
                                        else {
                                            indentY = pageHeight - shapeHeight;
                                        }
                                        break;
                                    case 'None':
                                        indentY = pageHeight - bottomMargin + vertPosition;
                                        break;
                                }
                                break;
                            case 'InsideMargin':
                            case 'OutsideMargin':
                                indentY = vertPosition;
                                switch (vertAlignment) {
                                    case 'Inside':
                                        if (vertOrigin === 'InsideMargin') {
                                            if (vertOrigin === 'InsideMargin' && paragraph.bodyWidget.page.index + 1 % 2 === 0) {
                                                indentY = pageHeight - shapeHeight;
                                            }
                                            else {
                                                indentY = 0;
                                            }
                                        }
                                        else {
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin : topMargin - shapeHeight;
                                        }
                                        break;
                                    case 'Top':
                                        if (vertOrigin === 'InsideMargin') {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - bottomMargin;
                                            }
                                            else {
                                                indentY = 0;
                                            }
                                        }
                                        else {
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin : 0;
                                        }
                                        break;
                                    case 'Center':
                                        if (vertOrigin === 'OutsideMargin') {
                                            //Need to ensure this.
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? pageHeight - bottomMargin + (bottomMargin - shapeHeight) / 2 : (topMargin - shapeHeight) / 2;
                                        }
                                        else {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - bottomMargin + (bottomMargin - shapeHeight) / 2;
                                            }
                                            else {
                                                indentY = (topMargin - shapeHeight) / 2;
                                            }
                                        }
                                        break;
                                    case 'Outside':
                                        if (vertOrigin === 'InsideMargin') {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = (pageHeight - bottomMargin);
                                            }
                                            else {
                                                indentY = (topMargin - shapeHeight);
                                            }
                                        }
                                        else {
                                            indentY = (paragraph.bodyWidget.page.index + 1) % 2 !== 0 ? topMargin - shapeHeight : pageHeight - bottomMargin;
                                        }
                                        break;
                                    case 'Bottom':
                                        if (vertOrigin === 'OutsideMargin') {
                                            indentY = (paragraph.bodyWidget.page.index + 1) !== 0 ? pageHeight - shapeHeight : topMargin - shapeHeight;
                                        }
                                        else {
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentY = pageHeight - shapeHeight;
                                            }
                                            else {
                                                indentY = topMargin - shapeHeight;
                                            }
                                        }
                                        break;
                                    case 'None':
                                        break;
                                }
                                break;
                            case 'Paragraph':
                                var space = 0;
                                //let prevsibling: BlockWidget = paragraph.previousWidget as BlockWidget;
                                // if (floatElement) {
                                //     //Need to handle DocIO Implementation.
                                //     if (Math.round(paragraph.y) !== Math.round(topMargin) && (prevsibling instanceof ParagraphWidget)
                                //         && ((paragraph.paragraphFormat.beforeSpacing > prevsibling.paragraphFormat.afterSpacing)
                                //             || (prevsibling.paragraphFormat.afterSpacing < 14)
                                //             && !paragraph.paragraphFormat.contextualSpacing)) {
                                //         space = prevsibling.paragraphFormat.afterSpacing;
                                //     }
                                // }
                                // eslint-disable-next-line max-len
                                //Floating item Y position is calculated from paragraph original Y position not from wrapped paragraph Y(ParagraphLayoutInfo.YPosition) position.
                                indentY = Math.round(paragraph.y) + space + vertPosition;
                                break;
                            case 'Margin':
                                //If header distance is more than top margin, then calculate the position of item based on header distance.
                                //As per Microsoft Word behavior, it is need to consider paragraph height along with the distance.
                                if (paragraph.isInHeaderFooter && headerDistance > topMargin) {
                                    //Need to udpate.
                                    indentY = (headerDistance + (paragraph.height)) + vertPosition;
                                }
                                else {
                                    indentY = topMargin + vertPosition;
                                }
                                switch (vertAlignment) {
                                    case 'Top':
                                        indentY = topMargin;
                                        break;
                                    case 'Center':
                                        indentY = topMargin + (pageClientHeight - shapeHeight) / 2;
                                        break;
                                    case 'Outside':
                                    case 'Bottom':
                                        if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                            indentY = topMargin + pageClientHeight - shapeHeight;
                                        }
                                        else {
                                            indentY = topMargin;
                                        }
                                        break;
                                    case 'Inside':
                                        if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                            indentY = topMargin + pageClientHeight - shapeHeight;
                                        }
                                        else {
                                            indentY = topMargin;
                                        }
                                        break;
                                    case 'None':
                                        break;
                                }
                                break;
                            default:
                                //Need to analyze further.
                                indentY = this.viewer.clientArea.y - vertPosition;
                                break;
                        }
                    }
                    // if (horzOrigin !== 'Column' && horzAlignment !== 'None') {
                    //     indentX = this.viewer.clientArea.x;
                    //     //Update the floating item x position to zero when floating item’s width
                    //     //exceeds the page width when floating item and it wrapping style is not equal to  
                    //     // infront of text and behind text and also vertical origin is not equal to paragraph.
                    // } else 
                    if (paragraph && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind' &&
                        vertOrigin === 'Paragraph' && shapeWidth >= pageWidth) {
                        indentX = 0;
                    }
                    else {
                        switch (horzOrigin) {
                            case 'Page':
                                indentX = horzPosition;
                                switch (horzAlignment) {
                                    case 'Center':
                                        if (isLayoutInCell) {
                                            indentX = (paragraph.associatedCell.cellFormat.cellWidth - shapeWidth) / 2;
                                        }
                                        else {
                                            if (heightPercent > 0 && widthPercent > 0) {
                                                indentX = (pageWidth - (pageWidth) * (widthPercent / 100)) / 2;
                                                floatElement.width = (pageWidth) * (widthPercent / 100);
                                            }
                                            else {
                                                indentX = (pageWidth - shapeWidth) / 2;
                                            }
                                        }
                                        break;
                                    case 'Left':
                                        indentX = 0;
                                        break;
                                    case 'Outside':
                                    case 'Right':
                                        if (isLayoutInCell) {
                                            indentX = paragraph.associatedCell.cellFormat.cellWidth - shapeWidth;
                                        }
                                        else {
                                            indentX = pageWidth - shapeWidth;
                                        }
                                        break;
                                    case 'None':
                                        if (isLayoutInCell) {
                                            indentX = paragraph.associatedCell.x + horzPosition;
                                        }
                                        else if (floatElement instanceof ShapeElementBox) {
                                            indentX = horzPosition;
                                            // Shape pItemShape = paraItem as Shape;
                                            // float horRelPercent = pItemShape !== null ? pItemShape.TextFrame.HorizontalRelativePercent
                                            //                       : (paraItem as WTextBox).TextBoxFormat.HorizontalRelativePercent;
                                            // if (Math.Abs(horRelPercent) <= 1000)
                                            //     indentX = pageWidth * (horRelPercent / 100);
                                            // else
                                            //     indentX = pItemShape !== null ? pItemShape.HorizontalPosition
                                            //         : (paraItem as WTextBox).TextBoxFormat.HorizontalPosition;
                                        }
                                        else {
                                            indentX = horzPosition;
                                        }
                                        break;
                                }
                                if (indentX < 0 && isLayoutInCell) {
                                    indentX = paragraph.associatedCell.x;
                                }
                                break;
                            case 'Column':
                                var isXPositionUpated = false;
                                //Update the Xposition while wrapping element exsit in the paragraph
                                if (this.viewer.clientActiveArea.x < paragraph.x) {
                                    // let cellPadings = 0;
                                    // if (paragraph.isInsideTable) {
                                    //     CellLayoutInfo cellLayoutInfo = (ownerPara.GetOwnerEntity() as IWidget).LayoutInfo as CellLayoutInfo;
                                    //     cellPadings = cellLayoutInfo.Paddings.Left + cellLayoutInfo.Paddings.Right;
                                    // }
                                    // float minimumWidthRequired = DEF_MIN_WIDTH_SQUARE;
                                    // if (textWrapStyle === TextWrappingStyle.Tight || textWrapStyle === TextWrappingStyle.Through)
                                    //     minimumWidthRequired = ownerPara.Document.Settings.CompatibilityMode === CompatibilityMode.Word2013 ?
                                    //         DEF_MIN_WIDTH_2013_TIGHTANDTHROW : DEF_MIN_WIDTH_TIGHTANDTHROW;
                                    // minimumWidthRequired -= cellPadings;
                                    // //Re Update the x position to the page left when paragraph starting position not equal to the 
                                    // //column starting and current inline item is x position equal to the column left position.
                                    // if ((ownerPara.IsXpositionUpated && ownerPara.Document.Settings.CompatibilityMode === CompatibilityMode.Word2013)
                                    //     || paragraphLayoutInfo.XPosition > (pageWidth - minimumWidthRequired - rightMargin)
                                    //     || paragraphLayoutInfo.IsXPositionReUpdate)
                                    //     indentX = layouter.ClientLayoutArea.Left + horzPosition;
                                    // else
                                    indentX = paragraph.x + horzPosition;
                                }
                                else {
                                    //Re Update the x position to the page left when word version not equal to 2013 
                                    //and wrapping style not equal to infront of text and behind text. 
                                    if ((textWrapStyle === 'InFrontOfText' || textWrapStyle === 'Behind')) {
                                        if (!(floatElement.paragraph.isInsideTable) && ((autoShape === 'StraightConnector' || autoShape === 'Rectangle') || floatElement instanceof ImageElementBox)) {
                                            isXPositionUpated = true;
                                            indentX = horzPosition + paragraph.bodyWidget.x;
                                        }
                                        else {
                                            indentX = paragraph.x + horzPosition;
                                        }
                                    }
                                    else {
                                        indentX = this.viewer.clientActiveArea.x + horzPosition;
                                    }
                                }
                                //Update the Wrapping element right position as page right when 
                                //wrapping element right position  exceeds the page right except position 
                                //InFrontOfText and behindText wrapping style.
                                if (textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind'
                                    && Math.round(indentX + shapeWidth) > Math.round(pageWidth) && shapeWidth < pageWidth) {
                                    indentX = (pageWidth - shapeWidth);
                                }
                                if (paragraph.paragraphFormat.leftIndent && !isXPositionUpated) {
                                    var leftIndent = HelperMethods.convertPointToPixel(paragraph.leftIndent);
                                    indentX -= leftIndent;
                                }
                                switch (horzAlignment) {
                                    case 'Center':
                                        indentX = this.viewer.clientActiveArea.x + (this.viewer.clientActiveArea.width - shapeWidth) / 2;
                                        break;
                                    case 'Left':
                                        indentX = this.viewer.clientActiveArea.x;
                                        break;
                                    case 'Right':
                                        indentX = this.viewer.clientActiveArea.x + this.viewer.clientActiveArea.width - shapeWidth; //- TextBoxFormat.InternalMargin.Right;
                                        break;
                                    case 'None':
                                        break;
                                }
                                break;
                            case 'Margin':
                                if (paragraph.bodyWidget) {
                                    indentX = leftMargin + horzPosition;
                                    switch (horzAlignment) {
                                        case 'Center':
                                            indentX = leftMargin + (pageClientWidth - shapeWidth) / 2;
                                            break;
                                        case 'Left':
                                            indentX = leftMargin;
                                            break;
                                        case 'Outside':
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 !== 0) {
                                                indentX = leftMargin + pageClientWidth - shapeWidth;
                                            }
                                            break;
                                        case 'Right':
                                            indentX = leftMargin + pageClientWidth - shapeWidth;
                                            break;
                                        case 'Inside':
                                            if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                                indentX = leftMargin + pageClientWidth - shapeWidth;
                                            }
                                            break;
                                        case 'None':
                                            break;
                                    }
                                }
                                else {
                                    indentX = this.viewer.clientArea.x + horzPosition;
                                }
                                break;
                            case 'Character':
                                if (horzAlignment === 'Right' || horzAlignment === 'Center') {
                                    indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                else {
                                    //Need to update this while layouting.**
                                    indentX = this.viewer.clientArea.x + horzPosition;
                                }
                                break;
                            case 'LeftMargin':
                                indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                break;
                            case 'RightMargin':
                                indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                break;
                            case 'InsideMargin':
                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                    indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                else {
                                    indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                break;
                            case 'OutsideMargin':
                                if ((paragraph.bodyWidget.page.index + 1) % 2 === 0) {
                                    indentX = this.getLeftMarginHorizPosition(leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                else {
                                    indentX = this.getRightMarginHorizPosition(pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle);
                                }
                                break;
                            default:
                                indentX = this.viewer.clientArea.x + horzPosition;
                                break;
                        }
                    }
                    //Update the floating item right position to the page right when floating item 
                    //right position exceeds the page width and it wrapping style is not equal to  
                    // InFrontOfText and behind text and also vertical origin is not equal to paragraph.
                    if (paragraph && textWrapStyle !== 'InFrontOfText'
                        && textWrapStyle !== 'Behind' && vertOrigin === 'Paragraph' && pageWidth < indentX + shapeWidth) {
                        indentX = pageWidth - shapeWidth;
                    }
                }
            }
            if (paragraph && (vertOrigin === 'Paragraph' || vertOrigin === 'Line') && floatElement.textWrappingStyle !== "InFrontOfText" && floatElement.textWrappingStyle !== "Behind") {
                if (this.documentHelper.compatibilityMode === 'Word2013') {
                    if (!paragraph.isInHeaderFooter) {
                        if (indentY + floatElement.height > this.viewer.clientArea.bottom) {
                            indentY = this.viewer.clientArea.bottom - floatElement.height;
                        }
                        if (indentY < sectionFormat.topMargin) {
                            indentY = sectionFormat.topMargin;
                        }
                    }
                }
            }
        }
        //}
        return new Point(indentX, indentY);
    };
    Layout.prototype.getLeftMarginHorizPosition = function (leftMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle) {
        var indentX = horzPosition;
        switch (horzAlignment) {
            case 'Center':
                indentX = (leftMargin - shapeWidth) / 2;
                break;
            case 'Left':
                indentX = 0;
                break;
            case 'Right':
                indentX = leftMargin - shapeWidth;
                break;
            case 'None':
                break;
        }
        if (indentX < 0 && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind') {
            indentX = 0;
        }
        return indentX;
    };
    Layout.prototype.getRightMarginHorizPosition = function (pageWidth, rightMargin, horzAlignment, horzPosition, shapeWidth, textWrapStyle) {
        var xPosition = pageWidth - rightMargin;
        var indentX = xPosition + horzPosition;
        switch (horzAlignment) {
            case 'Center':
                indentX = xPosition + (rightMargin - shapeWidth) / 2;
                break;
            case 'Left':
                indentX = xPosition;
                break;
            case 'Right':
                indentX = pageWidth - shapeWidth;
                break;
            case 'None':
                break;
        }
        if ((indentX < 0 || indentX + shapeWidth > pageWidth) && textWrapStyle !== 'InFrontOfText' && textWrapStyle !== 'Behind') {
            indentX = pageWidth - shapeWidth;
        }
        return indentX;
    };
    Layout.prototype.getVerticalPosition = function (paraItem, vertPosition, vertOrigin, textWrapStyle) {
        var paragraph = paraItem.line.paragraph;
        //ParagraphLayoutInfo paragraphLayoutInfo = (paragraph as IWidget).LayoutInfo as ParagraphLayoutInfo;
        var shape = paraItem;
        //WPicture pic = paraItem as WPicture;
        var indentY = 0;
        var topMargin = paragraph.associatedCell.y;
        switch (vertOrigin) {
            case 'Page':
            case 'Margin':
            case 'TopMargin':
            case 'InsideMargin':
            case 'BottomMargin':
            case 'OutsideMargin':
                indentY = topMargin + vertPosition;
                break;
            case 'Line':
            case 'Paragraph':
                var space = 0;
                // if (shape) {
                //     space = paragraph.paragraphFormat.afterSpacing;
                // }
                indentY = paragraph.y + vertPosition + space;
                if (shape.textWrappingStyle == "Square") {
                    indentY = indentY <= paragraph.associatedCell.y ? paragraph.associatedCell.y : indentY;
                }
                break;
            default:
                indentY = this.viewer.clientActiveArea.y + vertPosition;
                break;
        }
        return indentY;
    };
    Layout.prototype.getHorizontalPosition = function (width, paraItem, horzAlignment, horzOrigin, horzPosition, textWrapStyle, cellWid) {
        var indentX = 0;
        var paragraph = paraItem.line.paragraph;
        // CellLayoutInfo cellLayoutInfo = (paragraph.OwnerTextBody as IWidget).LayoutInfo as CellLayoutInfo;
        // ILayoutSpacingsInfo spacings = cellLayoutInfo as ILayoutSpacingsInfo;
        var cell = paragraph.associatedCell;
        var cellWidth = cellWid - cell.leftMargin - cell.rightMargin;
        var cellInnerWidth = cell.cellFormat.cellWidth;
        var marginLeft = cell.x;
        var pageLeft = marginLeft - cell.leftMargin;
        switch (horzOrigin) {
            case 'Page':
                {
                    indentX = horzPosition;
                    switch (horzAlignment) {
                        case 'Center':
                            indentX = pageLeft + (cellWidth - width) / 2;
                            break;
                        case 'Left':
                            indentX = pageLeft;
                            break;
                        case 'Right':
                            indentX = pageLeft + (cellWidth - width);
                            break;
                        case 'None':
                            indentX = pageLeft + horzPosition;
                            break;
                    }
                }
                break;
            case 'Column':
            case 'Margin':
                {
                    switch (horzAlignment) {
                        case 'Center':
                            indentX = marginLeft + (cellInnerWidth - width) / 2;
                            break;
                        case 'Left':
                            indentX = marginLeft;
                            break;
                        case 'Right':
                            indentX = marginLeft + (cellInnerWidth - width);
                            break;
                        case 'None':
                            indentX = marginLeft + horzPosition;
                            break;
                    }
                }
                break;
            default:
                {
                    indentX = marginLeft + horzPosition;
                }
                break;
        }
        return indentX;
    };
    Layout.prototype.updateTableFloatPoints = function (table) {
        if (table.wrapTextAround) {
            var tableTotalWidth = table.getTableCellWidth();
            var position = table.positioning;
            var sectionFormat = table.bodyWidget.sectionFormat;
            if (this.documentHelper.viewer instanceof WebLayoutViewer) {
                if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Page' || position.horizontalOrigin === 'Column') {
                    if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                        this.viewer.clientActiveArea.x = this.viewer.clientArea.width - tableTotalWidth;
                    }
                    else {
                        this.viewer.clientActiveArea.x = this.viewer.clientArea.x;
                    }
                }
            }
            else {
                if (!(table.containerWidget instanceof TextFrame) && !table.isInsideTable) {
                    // Vertical position
                    if (position.verticalOrigin === 'Page') {
                        if (position.verticalAlignment === 'Top') {
                            this.viewer.clientActiveArea.y = 0;
                        }
                        else if (position.verticalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.y = 0;
                        }
                        else if (isNullOrUndefined(position.verticalAlignment) || position.verticalAlignment === 'None') {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    else if (position.verticalOrigin === 'Margin') {
                        if (position.verticalAlignment === 'Top') {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                        }
                        else if (position.verticalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(sectionFormat.topMargin);
                        }
                        else if (Math.round(position.verticalPosition) != 0 && !isNullOrUndefined(sectionFormat.topMargin)) {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(sectionFormat.topMargin + position.verticalPosition);
                        }
                        else {
                            this.viewer.clientActiveArea.y = HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    else if (position.verticalOrigin === 'Paragraph') {
                        if (isNullOrUndefined(position.verticalAlignment) || position.verticalAlignment === 'None') {
                            this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    if (position.horizontalOrigin === 'Page') {
                        if (position.horizontalAlignment === 'Left') {
                            this.viewer.clientActiveArea.x = 0;
                        }
                        else if (position.horizontalAlignment === 'Inside') {
                            // TODO
                            this.viewer.clientActiveArea.x = 0;
                        }
                        else if (position.horizontalAlignment === 'Right') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth;
                        }
                        else if (position.horizontalAlignment === 'Outside') {
                            // TODO
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth;
                        }
                        else if (position.horizontalAlignment === 'Center') {
                            this.viewer.clientActiveArea.x = (HelperMethods.convertPointToPixel(sectionFormat.pageWidth) - tableTotalWidth) / 2;
                        }
                    }
                    else if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Column') {
                        if (position.horizontalAlignment === 'Left') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                            if (this.documentHelper.compatibilityMode !== 'Word2013' && !table.isInsideTable) {
                                this.viewer.clientActiveArea.x = this.viewer.clientActiveArea.x -
                                    HelperMethods.convertPointToPixel(table.firstChild.firstChild.leftMargin);
                            }
                        }
                        else if (position.horizontalAlignment === 'Inside') {
                            // TODO
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.leftMargin);
                        }
                        else if (position.horizontalAlignment === 'Right') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth)
                                - (HelperMethods.convertPointToPixel(sectionFormat.rightMargin) + tableTotalWidth);
                        }
                        else if (position.horizontalAlignment === 'Outside') {
                            // TODO
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.pageWidth)
                                - (HelperMethods.convertPointToPixel(sectionFormat.rightMargin) + tableTotalWidth);
                        }
                        else if (position.horizontalAlignment === 'Center') {
                            this.viewer.clientActiveArea.x = HelperMethods.convertPointToPixel(sectionFormat.leftMargin)
                                + (HelperMethods.convertPointToPixel(sectionFormat.pageWidth - sectionFormat.rightMargin - sectionFormat.leftMargin) - tableTotalWidth) / 2;
                        }
                    }
                    if (Math.round(position.horizontalPosition) > 0 || (position.horizontalOrigin === 'Margin' && position.horizontalAlignment === 'Left')) {
                        this.viewer.clientActiveArea.x += HelperMethods.convertPointToPixel(position.horizontalPosition);
                    }
                }
                else if (table.isInsideTable) {
                    var ownerCell = table.containerWidget;
                    var cellFormat = ownerCell.cellFormat;
                    if (position.verticalOrigin === 'Page') {
                        this.viewer.clientActiveArea.y = ownerCell.y;
                        this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                    }
                    else if (position.verticalOrigin === 'Margin') {
                        this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                        //Check whether the absolute table vertical position is top relative to the margin
                        if (this.viewer.clientActiveArea.y < ownerCell.y || position.verticalAlignment === 'Top') {
                            this.viewer.clientActiveArea.y = ownerCell.y;
                        }
                    }
                    else {
                        if (this.viewer.clientActiveArea.y + HelperMethods.convertPointToPixel(position.verticalPosition) < ownerCell.y) {
                            this.viewer.clientActiveArea.y = ownerCell.y;
                        }
                        else {
                            this.viewer.clientActiveArea.y += HelperMethods.convertPointToPixel(position.verticalPosition);
                        }
                    }
                    if (position.horizontalOrigin === 'Page') {
                        if (position.horizontalAlignment === 'Left' || position.horizontalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.x = ownerCell.x;
                        }
                        else if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                            this.viewer.clientActiveArea.x = ((ownerCell.x + cellFormat.preferredWidth) - tableTotalWidth);
                        }
                    }
                    else if (position.horizontalOrigin === 'Margin' || position.horizontalOrigin === 'Column') {
                        if (position.horizontalAlignment === 'Left' || position.horizontalAlignment === 'Inside') {
                            this.viewer.clientActiveArea.x = (ownerCell.x + ownerCell.leftMargin);
                        }
                        else if (position.horizontalAlignment === 'Right' || position.horizontalAlignment === 'Outside') {
                            this.viewer.clientActiveArea.x = ((ownerCell.x + cellFormat.preferredWidth)
                                - (tableTotalWidth + ownerCell.rightMargin));
                        }
                    }
                    if (Math.round(position.horizontalPosition) > 0) {
                        this.viewer.clientActiveArea.x = ownerCell.x;
                        if (position.horizontalOrigin === 'Margin') {
                            this.viewer.clientActiveArea.x += ownerCell.leftMargin;
                        }
                        this.viewer.clientActiveArea.x += HelperMethods.convertPointToPixel(position.horizontalPosition);
                    }
                    if (position.horizontalAlignment === 'Center') {
                        this.viewer.clientActiveArea.x = (cellFormat.preferredWidth / 2) - (tableTotalWidth / 2);
                    }
                }
            }
        }
        table.x = this.viewer.clientActiveArea.x;
        table.y = this.viewer.clientActiveArea.y;
    };
    Layout.prototype.isTocField = function (element) {
        if (element instanceof FieldElementBox) {
            var nextElement = element.nextNode;
            if (element instanceof FieldElementBox && element.fieldType === 0 && nextElement instanceof TextElementBox
                && nextElement.text.trim().toLowerCase().indexOf('toc') !== -1) {
                return true;
            }
        }
        return false;
    };
    Layout.prototype.getTotalColumnSpan = function (row) {
        var tableRow = row;
        var totalColumnSpan = 0;
        for (var i = 0; i < tableRow.childWidgets.length; i++) {
            totalColumnSpan += tableRow.childWidgets[i].cellFormat.columnSpan;
        }
        return totalColumnSpan;
    };
    Layout.prototype.getMaximumRightCellBorderWidth = function (table) {
        var highestBorderSize = 0;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            var cell = row.childWidgets[row.childWidgets.length - 1];
            var cellBorder = cell.cellFormat.borders.right.lineWidth;
            if (highestBorderSize < cellBorder) {
                highestBorderSize = cellBorder;
            }
        }
        return highestBorderSize;
    };
    Layout.prototype.getDefaultBorderSpacingValue = function (border, isBorderValueZero, tableHorizontalPosition) {
        if (border == 0) {
            if (this.documentHelper.compatibilityMode != 'Word2013' && tableHorizontalPosition == 'Center') {
                border = 1.5;
            }
            else {
                border = 0.75;
            }
            return true;
        }
        return isBorderValueZero;
    };
    Layout.prototype.getMinimumWidthRequiredForTable = function (isBorderValueZero, tableHorizontalPosition, border) {
        var minimumWidthRequired = 0;
        //To fit the item right side of the Table Microsoft Word 2013 application and other version has different value based on border of the table and alignment of the table.
        if (this.documentHelper.compatibilityMode == 'Word2013') {
            if (tableHorizontalPosition == 'Center') {
                if (isBorderValueZero) {
                    minimumWidthRequired = 18.5 + Math.round(0.75 / 2);
                }
                else {
                    minimumWidthRequired = 18.5 + Math.round(border / 2);
                }
            }
            else {
                if (isBorderValueZero) {
                    minimumWidthRequired = 18.5 + 0.75;
                }
                else {
                    minimumWidthRequired = 18.5 + border;
                }
            }
        }
        else {
            if (tableHorizontalPosition == 'Center') {
                if (isBorderValueZero) {
                    minimumWidthRequired = 19.25;
                }
                else {
                    minimumWidthRequired = 18.5 + (border / 2);
                }
            }
            else {
                if (border == 0.25) {
                    minimumWidthRequired = 18.5;
                }
                else {
                    minimumWidthRequired = 19.3;
                }
            }
        }
        return HelperMethods.convertPointToPixel(minimumWidthRequired);
    };
    Layout.prototype.shiftFloatingItemsFromTable = function (table, bodyWidget) {
        if (table.containerWidget instanceof BodyWidget) {
            for (var i = 0; i < table.containerWidget.floatingElements.length; i++) {
                var shape = table.containerWidget.floatingElements[i];
                if (!(shape instanceof TableWidget) && shape.paragraph.containerWidget instanceof TableCellWidget
                    && shape.paragraph.containerWidget.ownerTable.containerWidget.ownerTable == table) {
                    bodyWidget.floatingElements.push(table.containerWidget.floatingElements[i]);
                    table.containerWidget.floatingElements.splice(table.containerWidget.floatingElements.indexOf(table.containerWidget.floatingElements[i]), 1);
                    this.shiftedFloatingItemsFromTable.push(shape);
                    i--;
                }
            }
        }
    };
    return Layout;
}());
export { Layout };
