import { Widget, BodyWidget, TableRowWidget, TableWidget, LineWidget, TextElementBox, ListTextElementBox, ImageElementBox, ParagraphWidget, TableCellWidget, FieldElementBox, BlockWidget, HeaderFooterWidget, BlockContainer, BookmarkElementBox, ElementBox, EditRangeStartElementBox, EditRangeEndElementBox, TabElementBox, CommentElementBox, CommentCharacterElementBox, TextFormField, CheckBoxFormField, DropDownFormField, ShapeElementBox, TextFrame, ContentControl, FieldTextElementBox, FootNoteWidget, FootnoteElementBox, ShapeBase } from '../viewer/page';
import { HelperMethods, Point } from '../editor/editor-helper';
import { SelectionCharacterFormat, SelectionCellFormat, SelectionParagraphFormat, SelectionRowFormat, SelectionSectionFormat, SelectionTableFormat, SelectionImageFormat } from './selection-format';
import { PageLayoutViewer, WebLayoutViewer, WRowFormat } from '../index';
import { isNullOrUndefined, createElement, L10n, Browser } from '@syncfusion/ej2-base';
import { Dictionary } from '../../base/dictionary';
import { contentControlEvent, beforeFormFieldFillEvent, afterFormFieldFillEvent, requestNavigateEvent, CharacterRangeType, aftercontentControlFillEvent, beforecontentControlFillEvent } from '../../base/index';
import { WCharacterFormat, WParagraphFormat, WParagraphStyle } from '../index';
import { HtmlExport } from '../writer/html-export';
import { Popup } from '@syncfusion/ej2-popups';
import { TextPosition, SelectionWidgetInfo, Hyperlink } from './selection-helper';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
/* eslint-disable */
/**
 * Selection
 */
var Selection = /** @class */ (function () {
    /**
     * @param documentEditor
     * @private
     */
    function Selection(documentEditor) {
        var _this = this;
        /**
         * @private
         */
        this.upDownSelectionLength = 0;
        /**
         * @private
         */
        this.isSkipLayouting = false;
        /**
        * @private
        */
        this.isImageSelected = false;
        /**
        * @private
        */
        this.isExcludeBookmarkStartEnd = false;
        this.contextTypeInternal = undefined;
        /**
         * @private
         */
        this.caret = undefined;
        //Format Retrieval Field
        /**
         * @private
         */
        this.isRetrieveFormatting = false;
        /**
         * @private
         */
        this.isSelectCurrentWord = false;
        /**
         * @private
         */
        this.isSelectionisInCC = false;
        /**
         * @private
         */
        this.skipFormatRetrieval = false;
        /**
         * @private
         */
        this.isModifyingSelectionInternally = false;
        this.isMoveDownOrMoveUp = false;
        this.isSelectBookmark = false;
        this.isHighlightContentControlEditRegionIn = true;
        /**
         * @private
         * This will holds the selection html content to set data in clipboard. Avoid to use this field for other purpose.
         */
        this.htmlContent = undefined;
        /**
         * @private
         * This will holds the selection sfdt content to set data in clipboard. Avoid to use this field for other purpose.
         */
        this.sfdtContent = undefined;
        /**
         * @private
         */
        this.isEndOffset = false;
        /**
         * @private
         */
        this.isViewPasteOptions = false;
        /**
         * @private
         */
        this.skipEditRangeRetrieval = false;
        /**
         * @private
         */
        this.selectedWidgets = undefined;
        /**
         * @private
         */
        this.isHighlightEditRegionIn = false;
        /**
         * @private
         */
        this.isHighlightFormFields = false;
        /**
         * @private
         */
        this.isHightlightEditRegionInternal = false;
        /**
         * @private
         */
        this.isCurrentUser = false;
        /**
         * @private
         */
        this.isHighlightNext = false;
        /**
         * @private
         */
        this.isWebLayout = false;
        /**
         * @private
         */
        this.contentControlHighlighters = undefined;
        /**
         * @private
         */
        this.editRegionHighlighters = undefined;
        /**
         * @private
         */
        this.contentControleditRegionHighlighters = undefined;
        /**
         * @private
         */
        this.formFieldHighlighters = undefined;
        this.isSelectList = false;
        /**
         * @private
         */
        this.previousSelectedFormField = undefined;
        /**
         * @private
         */
        this.previousSelectedContentControl = undefined;
        /**
         * @private
         */
        this.currentContentControl = undefined;
        /**
         * @private
         */
        this.isFormatUpdated = false;
        /**
         * @private
         */
        this.isCellPrevSelected = false;
        /**
         * @private
         */
        this.currentFormField = undefined;
        /**
         * @private
         */
        this.contentControls = [];
        /**
         * @private
         */
        this.isHomeEnd = false;
        /**
         * @private
         */
        this.pasteOptions = function (event) {
            var locale = new L10n('documenteditor', _this.owner.defaultLocale);
            locale.setLocale(_this.owner.locale);
            if (event.item.text === locale.getConstant('Keep source formatting')) {
                _this.owner.editorModule.applyPasteOptions('KeepSourceFormatting');
            }
            else if (event.item.text === locale.getConstant('Match destination formatting')) {
                _this.owner.editorModule.applyPasteOptions('MergeWithExistingFormatting');
            }
            else if (event.item.text === locale.getConstant('NestTable')) {
                _this.owner.editorModule.applyTablePasteOptions('NestTable');
            }
            else if (event.item.text === locale.getConstant('InsertAsRows')) {
                _this.owner.editorModule.applyTablePasteOptions('InsertAsRows');
            }
            else if (event.item.text === locale.getConstant('InsertAsColumns')) {
                _this.owner.editorModule.applyTablePasteOptions('InsertAsColumns');
            }
            else if (event.item.text === locale.getConstant('OverwriteCells')) {
                _this.owner.editorModule.applyTablePasteOptions('OverwriteCells');
            }
            else {
                _this.owner.editorModule.applyPasteOptions('KeepTextOnly');
            }
        };
        /**
         * Hides caret.
         *
         * @private
         * @returns {void}
         */
        this.hideCaret = function () {
            if (!isNullOrUndefined(_this.caret)) {
                _this.caret.style.display = 'none';
            }
        };
        this.owner = documentEditor;
        this.documentHelper = this.owner.documentHelper;
        this.start = new TextPosition(this.owner);
        this.end = new TextPosition(this.owner);
        this.selectedWidgets = new Dictionary();
        this.characterFormatIn = new SelectionCharacterFormat(this);
        this.paragraphFormatIn = new SelectionParagraphFormat(this, this.documentHelper);
        this.sectionFormatIn = new SelectionSectionFormat(this);
        this.rowFormatIn = new SelectionRowFormat(this);
        this.cellFormatIn = new SelectionCellFormat(this);
        this.tableFormatIn = new SelectionTableFormat(this);
        this.imageFormatInternal = new SelectionImageFormat(this);
        this.editRangeCollection = [];
        this.editRegionHighlighters = new Dictionary();
        this.contentControleditRegionHighlighters = new Dictionary();
        this.formFieldHighlighters = new Dictionary();
    }
    Object.defineProperty(Selection.prototype, "isHighlightEditRegion", {
        // Code for Comparing the offset calculated using old approach and optimized approach
        // /**
        //  * @private
        //  */
        // public isNewApproach: boolean;
        /**
         * @private
         * @returns {boolean} - Retuens true if highlighting editing region
         */
        get: function () {
            return this.isHighlightEditRegionIn;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isHighlightEditRegionIn = value;
            this.onHighlight();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isHighlightContentControlEditRegion", {
        /**
         * @private
         * @returns {boolean} - Retuens true if highlighting editing region
         */
        get: function () {
            return this.isHighlightContentControlEditRegionIn;
        },
        /**
         * @private
         */
        set: function (value) {
            this.isHighlightContentControlEditRegionIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "htmlWriter", {
        /**
         * @private
         */
        get: function () {
            if (isNullOrUndefined(this.htmlWriterIn)) {
                this.htmlWriterIn = new HtmlExport();
            }
            return this.htmlWriterIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "start", {
        /**
         * Gets the start text position of last range in the selection
         *
         * @private
         * @returns {TextPosition} - Returns selection start position.
         */
        get: function () {
            if (!isNullOrUndefined(this.owner) && !isNullOrUndefined(this.viewer)) {
                if (isNullOrUndefined(this.startInternal)) {
                    this.startInternal = this.owner.documentStart;
                }
                return this.startInternal;
            }
            return undefined;
        },
        /**
         * @private
         */
        set: function (value) {
            this.startInternal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "characterFormat", {
        //Format retrieval properties
        /**
         * Gets the instance of selection character format.
         *
         * @default undefined
         * @aspType SelectionCharacterFormat
         * @returns {SelectionCharacterFormat} Returns the selection character format.
         */
        get: function () {
            return this.characterFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "paragraphFormat", {
        /**
         * Gets the instance of selection paragraph format.
         *
         * @default undefined
         * @aspType SelectionParagraphFormat
         * @returns {SelectionParagraphFormat} Returns the selection paragraph format.
         */
        get: function () {
            return this.paragraphFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "sectionFormat", {
        /**
         * Gets the instance of selection section format.
         *
         * @default undefined
         * @aspType SelectionSectionFormat
         * @returns {SelectionSectionFormat} Returns the selection section format.
         */
        get: function () {
            return this.sectionFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "tableFormat", {
        /**
         * Gets the instance of selection table format.
         *
         * @default undefined
         * @aspType SelectionTableFormat
         * @returns {SelectionTableFormat} Returns the selection table format.
         */
        get: function () {
            return this.tableFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "cellFormat", {
        /**
         * Gets the instance of selection cell format.
         *
         * @default undefined
         * @aspType SelectionCellFormat
         * @returns {SelectionCellFormat} Returns the selection cell format.
         */
        get: function () {
            return this.cellFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "rowFormat", {
        /**
         * Gets the instance of selection row format.
         *
         * @default undefined
         * @aspType SelectionRowFormat
         * @returns {SelectionRowFormat} Returns selection row format.
         */
        get: function () {
            return this.rowFormatIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "imageFormat", {
        /**
         * Gets the instance of selection image format.
         *
         * @default undefined
         * @aspType SelectionImageFormat
         * @returns {SelectionImageFormat} Returns the selection image format.
         */
        get: function () {
            return this.imageFormatInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "end", {
        /**
         * Gets the start text position of selection range.
         *
         * @private
         * @returns {TextPosition} - Returns selection end position.
         */
        get: function () {
            return this.endInternal;
        },
        /**
         * For internal use
         *
         * @private
         */
        set: function (value) {
            this.endInternal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "startPage", {
        /**
         * Gets the page number where the selection starts.
         *
         * @returns {number} Returns the selection start page number.
         */
        get: function () {
            if (!this.owner.isDocumentLoaded || isNullOrUndefined(this.viewer)
                || this.viewer instanceof WebLayoutViewer || isNullOrUndefined(this.documentHelper.selectionStartPage)) {
                return 1;
            }
            return this.documentHelper.pages.indexOf(this.documentHelper.selectionStartPage) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "endPage", {
        /**
         * Gets the page number where the selection ends.
         *
         * @returns {number} Returns the selection end page number.
         */
        get: function () {
            if (!this.owner.isDocumentLoaded || isNullOrUndefined(this.viewer)
                || this.viewer instanceof WebLayoutViewer || isNullOrUndefined(this.documentHelper.selectionEndPage)) {
                return 1;
            }
            return this.documentHelper.pages.indexOf(this.documentHelper.selectionEndPage) + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isForward", {
        /**
         * Determines whether the selection direction is forward or not.
         *
         * @default false
         * @private
         * @returns {boolean} Returns isForward
         */
        get: function () {
            return this.start.isExistBefore(this.end);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isinFootnote", {
        /**
         * Determines whether the selection is in footnote or not.
         *
         * @default false
         * @returns {boolean} Returns true if selection is in footnote
         * @private
         */
        get: function () {
            return this.isFootNoteParagraph(this.start.paragraph);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isinEndnote", {
        /**
         * Determines whether the selection is in endnote or not.
         *
         * @default false
         * @returns {boolean}
         * @private
         */
        get: function () {
            return this.isEndNoteParagraph(this.start.paragraph);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isEmpty", {
        /**
         * Determines whether the start and end positions are same or not.
         *
         * @default false
         * @returns {boolean}
         * @private
         */
        get: function () {
            if (isNullOrUndefined(this.start)) {
                return true;
            }
            return this.start.isAtSamePosition(this.end);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "startOffset", {
        /**
         * Returns the start hierarchical index.
         */
        get: function () {
            return this.getHierarchicalIndexByPosition(this.start);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "endOffset", {
        /**
         * Returns the end hierarchical index.
         */
        get: function () {
            return this.getHierarchicalIndexByPosition(this.end);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isInShape", {
        /**
         * @private
         */
        get: function () {
            var container = this.start.paragraph.containerWidget;
            do {
                if (container instanceof TextFrame) {
                    return true;
                }
                if (container) {
                    container = container.containerWidget;
                }
            } while (container);
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "text", {
        /**
         * Gets the text within selection.
         *
         * @default ''
         * @aspType string
         * @returns {string} Returns the text within selection.
         */
        get: function () {
            return this.getText(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "contextType", {
        /**
         * Gets the context type of the selection.
         */
        get: function () {
            return this.contextTypeInternal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "bookmarks", {
        /**
         * Gets bookmark name collection.
         */
        get: function () {
            return this.getSelBookmarks(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "sfdt", {
        /**
        * Gets the selected content of the document as SFDT(Syncfusion Document Text) file format.
        *
        * @default undefined
        * @returns {string}
        */
        get: function () {
            if (this.owner.editorModule && !this.isEmpty) {
                return JSON.stringify(this.writeSfdt());
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the bookmark name collection in current selection.
     *
     * @param includeHidden - Decide whether to include hidden bookmark name in current selection or not.
     * @returns Returns the bookmark name collection in current selection.
     */
    Selection.prototype.getBookmarks = function (includeHidden) {
        return this.getSelBookmarks(includeHidden);
    };
    Object.defineProperty(Selection.prototype, "isCleared", {
        /**
         * @private
         */
        get: function () {
            return isNullOrUndefined(this.end);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "isInField", {
        /**
         * Returns true if selection is in field.
         *
         * @returns Returns true if selection is in field; Otherwise, false.
         */
        get: function () {
            if (!isNullOrUndefined(this.getHyperlinkField(true))) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the field information for the selected field.
     *
     * @returns { FieldInfo } Returns `FieldInfo` if selection is in field, otherwise `undefined`
     * > Returns `undefined` for text, image, table, shape. For nested fields, it returns combined field code and result.
     */
    Selection.prototype.getFieldInfo = function () {
        var field = this.getHyperlinkField(true);
        if (!isNullOrUndefined(field)) {
            var code = this.getFieldCode(field);
            var result = this.owner.editorModule.getFieldResultText(field);
            return {
                code: code,
                result: result
            };
        }
        return undefined;
    };
    Selection.prototype.isFootNoteParagraph = function (paragraph) {
        var container = this.getContainerWidget(paragraph);
        if (container instanceof FootNoteWidget && container.footNoteType === 'Footnote') {
            return true;
        }
        else {
            return false;
        }
    };
    Selection.prototype.isEndNoteParagraph = function (paragraph) {
        var container = this.getContainerWidget(paragraph);
        if (container instanceof FootNoteWidget && container.footNoteType === 'Endnote') {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param documentEditor
     * @private
     */
    Selection.prototype.isFootEndNoteParagraph = function (paragraph) {
        if (this.isFootNoteParagraph(paragraph)) {
            return true;
        }
        else if (this.isEndNoteParagraph(paragraph)) {
            return true;
        }
        else {
            return false;
        }
    };
    Selection.prototype.getSelBookmarks = function (includeHidden) {
        var bookmarkCln = [];
        var bookmarks = this.documentHelper.bookmarks;
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        var bookmrkStart;
        var bookmrkEnd;
        var isCellSelected = false;
        var selectedCells = this.getSelectedCells();
        for (var i = 0; i < bookmarks.length; i++) {
            if (includeHidden || !includeHidden && bookmarks.keys[i].indexOf('_') !== 0) {
                bookmrkStart = bookmarks.get(bookmarks.keys[i]);
                bookmrkEnd = bookmrkStart.reference;
                if (isNullOrUndefined(bookmrkEnd)) {
                    continue;
                }
                var bmStartPos = this.getElementPosition(bookmrkStart).startPosition;
                var bmEndPos = this.getElementPosition(bookmrkEnd, true).startPosition;
                if (bmStartPos.paragraph.isInsideTable || bmEndPos.paragraph.isInsideTable) {
                    if (selectedCells.length > 0) {
                        if (selectedCells.indexOf(bmStartPos.paragraph.associatedCell) >= 0
                            || selectedCells.indexOf(bmEndPos.paragraph.associatedCell) >= 0) {
                            isCellSelected = true;
                        }
                        else {
                            isCellSelected = false;
                            if (selectedCells.indexOf(bmStartPos.paragraph.associatedCell) < 0
                                || selectedCells.indexOf(bmEndPos.paragraph.associatedCell) < 0) {
                                var endCell = end.paragraph.isInsideTable && end.paragraph.associatedCell;
                                var bmEndPosCell = bmEndPos.paragraph.associatedCell;
                                if (endCell && bmEndPosCell && endCell.ownerTable.equals(bmEndPosCell.ownerTable) &&
                                    !(endCell.ownerTable
                                        && selectedCells.indexOf(this.getCellInTable(endCell.ownerTable, bmEndPosCell)) >= 0)) {
                                    // Bug 891131: The below code is comment to resolve the bookmark is not retrieved when selecting the table cell
                                    // continue;
                                }
                            }
                        }
                    }
                    else {
                        isCellSelected = false;
                    }
                }
                else {
                    isCellSelected = false;
                }
                if ((start.isExistAfter(bmStartPos) || start.isAtSamePosition(bmStartPos))
                    && (end.isExistBefore(bmEndPos) || end.isAtSamePosition(bmEndPos)) ||
                    ((bmStartPos.isExistAfter(start) || bmStartPos.isAtSamePosition(start))
                        && (bmEndPos.isExistBefore(end) || bmEndPos.isAtSamePosition(end))) ||
                    (bmStartPos.isExistAfter(start) && bmStartPos.isExistBefore(end)
                        && (end.isExistAfter(bmEndPos) || end.isExistBefore(bmEndPos))) ||
                    (bmEndPos.isExistBefore(end) && bmEndPos.isExistAfter(start)
                        && (start.isExistBefore(bmStartPos) || start.isExistAfter(bmStartPos))) || isCellSelected) {
                    bookmarkCln.push(bookmrkStart.name);
                }
            }
        }
        return bookmarkCln;
    };
    Object.defineProperty(Selection.prototype, "viewer", {
        /**
         *
         * @private
         */
        get: function () {
            return this.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    Selection.prototype.getModuleName = function () {
        return 'Selection';
    };
    Selection.prototype.checkLayout = function () {
        if (this.owner.layoutType === 'Continuous') {
            this.isWebLayout = true;
            this.documentHelper.isHeaderFooter = true;
            this.owner.layoutType = 'Pages';
            this.owner.viewer.destroy();
            this.owner.viewer = new PageLayoutViewer(this.owner);
            this.owner.editorModule.layoutWholeDocument();
        }
    };
    //Public API
    /**
     * Moves the selection to the header of current page.
     *
     * @returns {void}
     */
    Selection.prototype.goToHeader = function () {
        this.checkLayout();
        this.owner.enableHeaderAndFooter = true;
        this.enableHeadersFootersRegion(this.start.paragraph.bodyWidget.page.headerWidget, this.start.paragraph.bodyWidget.page);
        this.isWebLayout = false;
    };
    /**
     * Moves the selection to the footer of current page.
     *
     * @returns {void}
     */
    Selection.prototype.goToFooter = function () {
        this.checkLayout();
        this.owner.enableHeaderAndFooter = true;
        this.enableHeadersFootersRegion(this.start.paragraph.bodyWidget.page.footerWidget, this.start.paragraph.bodyWidget.page);
        this.isWebLayout = false;
    };
    /**
     * Closes the header and footer region.
     *
     * @returns {void}
     */
    Selection.prototype.closeHeaderFooter = function () {
        this.disableHeaderFooter();
        if (this.documentHelper.isHeaderFooter && this.owner.layoutType === 'Pages') {
            this.owner.layoutType = 'Continuous';
            this.documentHelper.isHeaderFooter = false;
        }
    };
    /**
    * Closes the xml Pane region.
    *
    * @returns {void}
    */
    Selection.prototype.closeXmlPane = function () {
        this.disableXml();
        this.owner.enableXMLPane = false;
        if (this.documentHelper.isHeaderFooter && this.owner.layoutType === 'Pages') {
            this.owner.layoutType = 'Continuous';
            this.documentHelper.isHeaderFooter = false;
        }
    };
    /**
     * Moves the selection to the start of specified page number.
     *
     * @param pageNumber Specify the page number to move selection.
     * @returns {void}
     */
    Selection.prototype.goToPage = function (pageNumber) {
        this.owner.scrollToPage(pageNumber);
        if (pageNumber >= 1 && pageNumber <= this.owner.documentHelper.pages.length) {
            var page = this.owner.documentHelper.pages[pageNumber - 1];
            this.updateTextPositionForBlockContainer(page.bodyWidgets[0]);
        }
    };
    /**
     * Selects the entire table if the context is within table.
     *
     * @returns {void}
     */
    Selection.prototype.selectTable = function () {
        if (!this.owner.enableSelection) {
            return;
        }
        this.selectTableInternal();
    };
    /**
     * Selects the entire row if the context is within table.
     *
     * @returns {void}
     */
    Selection.prototype.selectRow = function () {
        if (!this.owner.enableSelection) {
            return;
        }
        this.selectTableRow();
    };
    /**
     * Selects the entire column if the context is within table.
     *
     * @returns {void}
     */
    Selection.prototype.selectColumn = function () {
        if (!this.owner.enableSelection) {
            return;
        }
        this.selectColumnInternal();
    };
    /**
     * Selects the entire cell if the context is within table.
     *
     * @returns {void}
     */
    Selection.prototype.selectCell = function () {
        if (!this.owner.enableSelection) {
            return;
        }
        this.selectTableCell();
    };
    Selection.prototype.select = function (selectionSettings, startOrEnd) {
        if (typeof (selectionSettings) === 'string') {
            var startPosition = this.getTextPosBasedOnLogicalIndex(selectionSettings);
            var endPosition = this.getTextPosBasedOnLogicalIndex(startOrEnd);
            this.selectPosition(startPosition, endPosition);
        }
        else {
            var point = new Point(selectionSettings.x, selectionSettings.y);
            var pageCoordinates = this.viewer.findFocusedPage(point, true);
            if (selectionSettings.extend) {
                this.moveTextPosition(pageCoordinates, this.end);
            }
            else {
                this.documentHelper.updateTextPositionForSelection(pageCoordinates, 1);
            }
        }
    };
    /**
     * Selects the content based on the specified start and end hierarchical index.
     *
     * @param start Specify the start index to select.
     * @param end Specify the end index to select.
     * @returns {void}
     */
    Selection.prototype.selectByHierarchicalIndex = function (start, end) {
        var startPosition = this.getTextPosBasedOnLogicalIndex(start);
        var endPosition = this.getTextPosBasedOnLogicalIndex(end);
        this.selectPosition(startPosition, endPosition);
    };
    /**
     * Selects the current field if selection is in field
     *
     * @param fieldStart Specify the field start to select.
     * @returns {void}
     */
    Selection.prototype.selectField = function (fieldStart) {
        if (this.isInField || !isNullOrUndefined(fieldStart)) {
            if (isNullOrUndefined(fieldStart)) {
                fieldStart = this.getHyperlinkField(true);
            }
            this.selectFieldInternal(fieldStart);
        }
    };
    /**
     * @private
     * @param fieldStart
     * @returns {void}
     */
    Selection.prototype.selectContentControlInternal = function (fieldStart) {
        if (fieldStart) {
            var offset = fieldStart.line.getOffset(fieldStart, 1);
            var startPosition = new TextPosition(this.owner);
            var fieldEnd = fieldStart.reference;
            startPosition.setPositionParagraph(fieldStart.line, offset);
            var endoffset = fieldEnd.line.getOffset(fieldEnd, 0);
            var endPosition = new TextPosition(this.owner);
            endPosition.setPositionParagraph(fieldEnd.line, endoffset);
            //selects the field range
            this.documentHelper.selection.selectRange(startPosition, endPosition);
        }
    };
    /**
     * @private
     * @param fieldStart
     * @returns {void}
     */
    Selection.prototype.selectFieldInternal = function (fieldStart, isKeyBoardEvent, isReplacingFormResult) {
        if (fieldStart) {
            var formFillingMode = this.documentHelper.isFormFillProtectedMode || isReplacingFormResult;
            var fieldEnd = fieldStart.fieldEnd;
            if (formFillingMode) {
                fieldStart = fieldStart.fieldSeparator;
            }
            var offset = fieldStart.line.getOffset(fieldStart, formFillingMode ? 1 : 0);
            var startPosition = new TextPosition(this.owner);
            startPosition.setPositionParagraph(fieldStart.line, offset);
            var isBookmark = fieldStart.nextNode instanceof BookmarkElementBox;
            if (isBookmark && !formFillingMode && fieldStart.nextElement.reference) {
                fieldEnd = fieldStart.nextElement.reference;
            }
            var endoffset = fieldEnd.line.getOffset(fieldEnd, formFillingMode ? 0 : 1);
            var endPosition = new TextPosition(this.owner);
            endPosition.setPositionParagraph(fieldEnd.line, endoffset);
            //selects the field range
            this.documentHelper.selection.selectRange(startPosition, endPosition);
            if (!isReplacingFormResult) {
                this.triggerFormFillEvent(isKeyBoardEvent);
            }
        }
    };
    /**
     * @private
     * @param contentControl
     * @returns {void}
     */
    Selection.prototype.selectContentInternal = function (contentControl) {
        if (contentControl) {
            var fieldEnd = contentControl.reference;
            var offset = contentControl.line.getOffset(contentControl, 0);
            var startPosition = new TextPosition(this.owner);
            startPosition.setPositionParagraph(contentControl.line, offset);
            var endoffset = fieldEnd.line.getOffset(fieldEnd, 0);
            var endPosition = new TextPosition(this.owner);
            endPosition.setPositionParagraph(fieldEnd.line, endoffset);
            startPosition.offset++;
            endPosition.offset;
            this.documentHelper.selection.selectRange(startPosition, endPosition);
        }
    };
    /**
     * @param shape
     * @private
     * @returns {void}
     */
    Selection.prototype.selectShape = function (shape) {
        if (shape) {
            var offset = shape.line.getOffset(shape, 0);
            var startPosition = new TextPosition(this.owner);
            startPosition.setPositionParagraph(shape.line, offset);
            var endoffset = shape.line.getOffset(shape, 1);
            var endPosition = new TextPosition(this.owner);
            endPosition.setPositionParagraph(shape.line, endoffset);
            this.documentHelper.selection.selectRange(startPosition, endPosition);
        }
    };
    /**
     * Toggles the bold property of selected contents.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleBold = function () {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleBold();
        }
    };
    /**
     * Toggles the italic property of selected contents.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleItalic = function () {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleItalic();
        }
    };
    /**
     * Toggles the allCaps property of selected contents.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleAllCaps = function () {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleAllCaps();
        }
    };
    /**
     * Toggles the underline property of selected contents.
     *
     * @param {Underline} underline Default value of ‘underline’ parameter is Single.
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleUnderline = function (underline) {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleUnderline(underline);
        }
    };
    /**
     * Toggles the strike through property of selected contents.
     *
     * @param {Strikethrough} strikethrough Default value of strikethrough parameter is SingleStrike.
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleStrikethrough = function (strikethrough) {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleStrikethrough(strikethrough);
        }
    };
    /**
     * Toggles the highlight color property of selected contents.
     *
     * @param {HighlightColor} highlightColor Default value of ‘underline’ parameter is Yellow.
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleHighlightColor = function (highlightColor) {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleHighlightColor(highlightColor);
        }
    };
    /**
     * Toggles the subscript formatting of selected contents.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleSubscript = function () {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleSubscript();
        }
    };
    /**
     * Toggles the superscript formatting of selected contents.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleSuperscript = function () {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleSuperscript();
        }
    };
    /**
     * Toggles the text alignment property of selected contents.
     *
     * @param {TextAlignment} textAlignment Default value of ‘textAlignment parameter is TextAlignment.Left.
     * @private
     * @returns {void}
     */
    Selection.prototype.toggleTextAlignment = function (textAlignment) {
        if (this.owner.editorModule) {
            this.owner.editorModule.toggleTextAlignment(textAlignment);
        }
    };
    /**
     * Increases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.increaseIndent = function () {
        if (this.owner.editorModule) {
            this.owner.editorModule.increaseIndent();
        }
    };
    /**
     * Decreases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.decreaseIndent = function () {
        if (this.owner.editorModule) {
            this.owner.editorModule.decreaseIndent();
        }
    };
    /**
     * Fires the `requestNavigate` event if current selection context is in hyperlink.
     *
     * @returns {void}
     */
    Selection.prototype.navigateHyperlink = function () {
        var fieldBegin = this.getHyperlinkField();
        if (fieldBegin) {
            this.fireRequestNavigate(fieldBegin);
        }
    };
    /**
     * Navigate Hyperlink
     *
     * @param fieldBegin
     * @private
     * @returns {void}
     */
    Selection.prototype.fireRequestNavigate = function (fieldBegin) {
        var code = this.getFieldCode(fieldBegin);
        if (code.toLowerCase().indexOf('ref ') === 0 && !code.match('\\h')) {
            return;
        }
        var hyperlink = new Hyperlink(fieldBegin, this);
        var eventArgs = {
            isHandled: false,
            navigationLink: hyperlink.navigationLink,
            linkType: hyperlink.linkType,
            localReference: hyperlink.localReference,
            source: this.owner
        };
        this.owner.trigger(requestNavigateEvent, eventArgs);
        if (!eventArgs.isHandled) {
            this.documentHelper.selection.navigateBookmark(hyperlink.localReference, true);
        }
    };
    /**
     * Copies the hyperlink URL if the context is within hyperlink.
     *
     * @returns {void}
     */
    Selection.prototype.copyHyperlink = function () {
        var hyperLinkField = this.getHyperlinkField();
        var linkText = this.getLinkText(hyperLinkField, true);
        this.copyToClipboard(linkText);
    };
    Selection.prototype.isHideSelection = function (paragraph) {
        var bodyWgt = paragraph.bodyWidget;
        var sectionFormat = bodyWgt.sectionFormat;
        var pageHt = sectionFormat.pageHeight - sectionFormat.footerDistance;
        var headerFooterHt = bodyWgt.page.boundingRectangle.height / 100 * 40;
        return this.contextType.indexOf('Footer') >= 0
            && (paragraph.y + paragraph.height > HelperMethods.convertPointToPixel(pageHt))
            || this.contextType.indexOf('Header') >= 0 && paragraph.y + paragraph.height > headerFooterHt;
    };
    //Selection add, Highlight, remove API starts
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.highlightSelection = function (isSelectionChanged, isBookmark) {
        if (this.owner.enableImageResizerMode) {
            this.owner.imageResizerModule.hideImageResizer();
        }
        if (this.isEmpty) {
            if (!this.isInShape && this.isHideSelection(this.start.paragraph)) {
                this.hideCaret();
                return;
            }
            if (this.isInShape) {
                this.showResizerForShape();
            }
            this.updateCaretPosition();
        }
        else {
            if (this.isForward) {
                this.highlightSelectedContent(this.start, this.end);
            }
            else {
                this.highlightSelectedContent(this.end, this.start);
            }
            if (this.documentHelper.isComposingIME) {
                this.updateCaretPosition();
            }
        }
        this.documentHelper.updateTouchMarkPosition();
        if (isSelectionChanged) {
            this.documentHelper.scrollToPosition(this.start, this.end, undefined, isBookmark);
        }
    };
    Selection.prototype.createHighlightBorder = function (lineWidget, width, left, top, isElementBoxHighlight, contentControl) {
        if (width < 0) {
            width = 0;
        }
        var paragraph = lineWidget.paragraph;
        var floatingItems = [];
        if (paragraph.floatingElements.length > 0) {
            for (var k = 0; k < paragraph.floatingElements.length; k++) {
                var shapeElement = paragraph.floatingElements[k];
                if (shapeElement.line === lineWidget) {
                    var startTextPos = this.start;
                    var endTextPos = this.end;
                    if (!this.isForward) {
                        startTextPos = this.end;
                        endTextPos = this.start;
                    }
                    var offset = shapeElement.line.getOffset(shapeElement, 0);
                    if ((startTextPos.currentWidget !== lineWidget && endTextPos.currentWidget !== lineWidget) ||
                        (startTextPos.currentWidget === lineWidget && startTextPos.offset <= offset
                            && (endTextPos.currentWidget === lineWidget && endTextPos.offset >= offset + 1
                                || endTextPos.currentWidget !== lineWidget)) || (startTextPos.currentWidget !== lineWidget
                        && endTextPos.currentWidget === lineWidget && endTextPos.offset >= offset)) {
                        floatingItems.push(shapeElement);
                    }
                }
            }
        }
        var page = this.getPage(lineWidget.paragraph);
        var height = lineWidget.height;
        var widgets = this.selectedWidgets;
        var selectionWidget = undefined;
        var selectionWidgetCollection = undefined;
        if (this.isHighlightContentControlEditRegion && !isNullOrUndefined(contentControl)) {
            if (width === 0) {
                width = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat).Width;
            }
            this.addContentControlEditRegionHighlight(lineWidget, left, width, contentControl);
            return;
        }
        else if (this.isHightlightEditRegionInternal) {
            this.addEditRegionHighlight(lineWidget, left, width);
            return;
        }
        else if (this.isHighlightFormFields) {
            this.addFormFieldHighlight(lineWidget, left, width);
            return;
        }
        else {
            if (widgets.containsKey(lineWidget)) {
                if (widgets.get(lineWidget) instanceof SelectionWidgetInfo) {
                    selectionWidget = widgets.get(lineWidget);
                    // if the line element has already added with SelectionWidgetInfo
                    // now its need to be added as ElementBox highlighting them remove it from dictionary and add it collection.
                    if (isElementBoxHighlight) {
                        widgets.remove(lineWidget);
                        selectionWidgetCollection = [];
                        widgets.add(lineWidget, selectionWidgetCollection);
                    }
                }
                else {
                    selectionWidgetCollection = widgets.get(lineWidget);
                }
            }
            else {
                if (isElementBoxHighlight) {
                    selectionWidgetCollection = [];
                    widgets.add(lineWidget, selectionWidgetCollection);
                }
                else {
                    var wrapPosition = this.getWrapPosition(lineWidget, paragraph);
                    if (wrapPosition.length > 0) {
                        var selectionWidgetInfos = this.splitSelectionHighlightPosition(left, width, wrapPosition);
                        if (selectionWidgetInfos.length > 0) {
                            selectionWidgetInfos[0].floatingItems = floatingItems;
                            widgets.add(lineWidget, selectionWidgetInfos);
                            this.renderHighlight(page, lineWidget, selectionWidgetInfos, top, floatingItems);
                            return;
                        }
                        else {
                            selectionWidget = new SelectionWidgetInfo(left, width);
                            selectionWidget.floatingItems = floatingItems;
                            widgets.add(lineWidget, selectionWidget);
                        }
                    }
                    else {
                        selectionWidget = new SelectionWidgetInfo(left, width);
                        selectionWidget.floatingItems = floatingItems;
                        widgets.add(lineWidget, selectionWidget);
                    }
                }
            }
            if (selectionWidget === undefined) {
                selectionWidget = new SelectionWidgetInfo(left, width);
                selectionWidget.floatingItems = floatingItems;
                widgets.add(lineWidget, selectionWidget);
            }
        }
        this.renderHighlight(page, lineWidget, [selectionWidget], top, floatingItems);
        if (isElementBoxHighlight) {
            selectionWidgetCollection.push(selectionWidget);
        }
    };
    Selection.prototype.renderHighlight = function (page, lineWidget, selectionWidget, top, floatingItems) {
        var documentHelper = this.owner.documentHelper;
        var pageTop = this.getPageTop(page);
        var pageLeft = page.boundingRectangle.x;
        var height = lineWidget.height;
        if (this.viewer.containerTop <= pageTop
            || pageTop < this.viewer.containerTop + documentHelper.selectionCanvas.height) {
            var zoomFactor = documentHelper.zoomFactor;
            this.clipSelection(page, pageTop);
            for (var i = 0; i < selectionWidget.length; i++) {
                var selectedWidget = selectionWidget[i];
                var left = selectedWidget.left;
                var width = selectedWidget.width;
                if (this.documentHelper.isComposingIME) {
                    this.renderDashLine(documentHelper.selectionContext, page, lineWidget, (pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, top, width * zoomFactor, height);
                }
                else {
                    this.documentHelper.selectionContext.fillStyle = 'gray';
                    documentHelper.selectionContext.globalAlpha = 0.4;
                    documentHelper.selectionContext.fillRect((pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, (pageTop + (top * zoomFactor)) - this.viewer.containerTop, width * zoomFactor, height * zoomFactor);
                }
            }
            if (floatingItems.length > 0) {
                for (var z = 0; z < floatingItems.length; z++) {
                    var left = floatingItems[z].x;
                    var shapeTop = floatingItems[z].y;
                    var shapeWidth = floatingItems[z].width;
                    var shapeHeight = floatingItems[z].height;
                    documentHelper.selectionContext.fillRect((pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, (pageTop + (shapeTop * zoomFactor)) - this.viewer.containerTop, shapeWidth * zoomFactor, shapeHeight * zoomFactor);
                }
            }
            documentHelper.selectionContext.restore();
        }
    };
    Selection.prototype.getWrapPosition = function (lineWidget, paragraph) {
        var bodyWidget = paragraph.bodyWidget;
        if (!isNullOrUndefined(bodyWidget) && bodyWidget.floatingElements.length > 0 && lineWidget.children.length > 0) {
            var startLeft = this.getLeftInternal(lineWidget, lineWidget.children[0], 0);
            var width = 0;
            var wrapPos = [];
            var isStarted = false;
            for (var z = 0; z < lineWidget.children.length; z++) {
                var element = lineWidget.children[z];
                if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline') {
                    continue;
                }
                if (element.padding.left > 0) {
                    if (wrapPos.length === 1 && wrapPos[0].end === 0) {
                        wrapPos[0].end = wrapPos[0].start - paragraph.x;
                        wrapPos[0].start = paragraph.x;
                        startLeft = paragraph.x;
                    }
                    var clipInfo = {};
                    clipInfo.start = startLeft + width;
                    clipInfo.end = 0;
                    if (isStarted) {
                        clipInfo.end = startLeft + width + element.padding.left;
                    }
                    wrapPos.push(clipInfo);
                }
                width += element.padding.left + element.width;
                if (element instanceof TextElementBox) {
                    isStarted = true;
                }
            }
            if (wrapPos.length === 1 && wrapPos[0].end === 0) {
                wrapPos[0].end = wrapPos[0].start - paragraph.x;
                wrapPos[0].start = paragraph.x;
            }
            return wrapPos;
        }
        return [];
    };
    Selection.prototype.splitSelectionHighlightPosition = function (left, width, clipInfo) {
        var selectedWidget = [];
        for (var m = 0; m < clipInfo.length; m++) {
            var info = clipInfo[m];
            if ((left < info.start && left + width < info.end) || left > (info.end)) {
                continue;
            }
            if (left < info.start && left + width > info.end) {
                selectedWidget.push(new SelectionWidgetInfo(left, info.start - left));
                width = (left + width) - info.end;
                left = info.end;
            }
            else if (left === info.start) {
                if (width < info.end) {
                    width = left + width - info.end;
                    left = info.end;
                }
                else {
                    left += info.end;
                    width = width - info.end;
                }
            }
            if (m === clipInfo.length - 1) {
                selectedWidget.push(new SelectionWidgetInfo(left, width));
            }
        }
        return selectedWidget;
    };
    Selection.prototype.addEditRegionHighlight = function (lineWidget, left, width) {
        var highlighters = undefined;
        var collection = this.editRegionHighlighters;
        if (collection.containsKey(lineWidget)) {
            highlighters = collection.get(lineWidget);
        }
        else {
            highlighters = [];
            collection.add(lineWidget, highlighters);
        }
        var editRegionHighlight = new SelectionWidgetInfo(left, width);
        if (this.isCurrentUser) {
            editRegionHighlight.color = this.owner.userColor !== '' ? this.owner.userColor : '#FFFF00';
        }
        highlighters.push(editRegionHighlight);
        return editRegionHighlight;
    };
    Selection.prototype.addContentControlEditRegionHighlight = function (lineWidget, left, width, contentControl) {
        var collection = this.contentControleditRegionHighlighters;
        var highlighters = [];
        if (!collection.containsKey(contentControl)) {
            collection.add(contentControl, new Dictionary());
        }
        var contentInfo = collection.get(contentControl);
        contentInfo.add(lineWidget, highlighters);
        var editRegionHighlight = new SelectionWidgetInfo(left, width);
        highlighters.push(editRegionHighlight);
    };
    Selection.prototype.addFormFieldHighlight = function (lineWidget, left, width) {
        var highlighters = undefined;
        var collection = this.formFieldHighlighters;
        if (collection.containsKey(lineWidget)) {
            highlighters = collection.get(lineWidget);
        }
        else {
            highlighters = [];
            collection.add(lineWidget, highlighters);
        }
        var formFieldHighlight = new SelectionWidgetInfo(left, width);
        highlighters.push(formFieldHighlight);
    };
    Selection.prototype.createHighlightBorderInsideTable = function (cellWidget) {
        var page = this.getPage(cellWidget);
        var selectionWidget = undefined;
        var left = cellWidget.x - cellWidget.margin.left + cellWidget.leftBorderWidth;
        var width = cellWidget.width + cellWidget.margin.left
            + cellWidget.margin.right - cellWidget.leftBorderWidth - cellWidget.rightBorderWidth;
        var top = cellWidget.y;
        var height = cellWidget.height;
        var pageTop = this.getPageTop(page);
        var pageLeft = page.boundingRectangle.x;
        var isVisiblePage = this.documentHelper.isPageInVisibleBound(page, pageTop);
        var widgets = this.selectedWidgets;
        if (!this.isHightlightEditRegionInternal && !this.isHighlightFormFields) {
            if (widgets.containsKey(cellWidget) && widgets.get(cellWidget) instanceof SelectionWidgetInfo) {
                selectionWidget = widgets.get(cellWidget);
                if (isVisiblePage) {
                    this.documentHelper.selectionContext.clearRect((pageLeft + (selectionWidget.left * this.documentHelper.zoomFactor) - this.viewer.containerLeft), (pageTop + (top * this.documentHelper.zoomFactor)) - this.viewer.containerTop, selectionWidget.width * this.documentHelper.zoomFactor, height * this.documentHelper.zoomFactor);
                }
            }
            else {
                selectionWidget = new SelectionWidgetInfo(left, width);
                if (widgets.containsKey(cellWidget)) {
                    widgets.remove(widgets.get(cellWidget));
                }
                widgets.add(cellWidget, selectionWidget);
            }
        }
        if (isVisiblePage) {
            this.documentHelper.selectionContext.fillStyle = 'gray';
            this.documentHelper.selectionContext.globalAlpha = 0.4;
            var zoomFactor = this.documentHelper.zoomFactor;
            this.clipSelection(page, pageTop);
            this.documentHelper.selectionContext.fillRect((pageLeft + (left * zoomFactor)) - this.viewer.containerLeft, (pageTop + (top * zoomFactor)) - this.viewer.containerTop, width * zoomFactor, height * zoomFactor);
            this.documentHelper.selectionContext.restore();
        }
    };
    Selection.prototype.clipSelection = function (page, pageTop) {
        var documentHelper = this.owner.documentHelper;
        var width;
        var height;
        if (this.viewer instanceof WebLayoutViewer && this.documentHelper.zoomFactor < 1) {
            width = page.boundingRectangle.width / this.documentHelper.zoomFactor;
            height = page.boundingRectangle.height / this.documentHelper.zoomFactor;
        }
        else {
            width = page.boundingRectangle.width * this.documentHelper.zoomFactor;
            height = page.boundingRectangle.height * this.documentHelper.zoomFactor;
        }
        var left = page.boundingRectangle.x;
        documentHelper.selectionContext.beginPath();
        documentHelper.selectionContext.save();
        documentHelper.selectionContext.rect(left - this.viewer.containerLeft, pageTop - this.viewer.containerTop, width, height);
        documentHelper.selectionContext.clip();
    };
    /**
     * Add selection highlight
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.addSelectionHighlight = function (canvasContext, widget, top, page) {
        if (this.selectedWidgets.containsKey(widget)) {
            var height = this.documentHelper.render.getScaledValue(widget.height);
            var widgetInfo = this.selectedWidgets.get(widget);
            var widgetInfoCollection = undefined;
            if (widgetInfo instanceof SelectionWidgetInfo) {
                widgetInfoCollection = [];
                widgetInfoCollection.push(widgetInfo);
            }
            else {
                widgetInfoCollection = widgetInfo;
            }
            if (!isNullOrUndefined(widgetInfoCollection)) {
                for (var i = 0; i < widgetInfoCollection.length; i++) {
                    var selectedWidgetInfo = widgetInfoCollection[i];
                    var width = this.documentHelper.render.getScaledValue(widgetInfoCollection[i].width);
                    var left = this.documentHelper.render.getScaledValue(widgetInfoCollection[i].left, 1);
                    if (isNullOrUndefined(page)) {
                        page = this.owner.selectionModule.getPage(widget.paragraph);
                    }
                    this.owner.selectionModule.clipSelection(page, this.owner.selectionModule.getPageTop(page));
                    if (this.documentHelper.isComposingIME) {
                        this.renderDashLine(canvasContext, page, widget, left, top, width, height);
                    }
                    else {
                        canvasContext.globalAlpha = 0.4;
                        canvasContext.fillStyle = 'gray';
                        canvasContext.fillRect(left, this.documentHelper.render.getScaledValue(top, 2), width, height);
                        if (selectedWidgetInfo.floatingItems && selectedWidgetInfo.floatingItems.length > 0) {
                            for (var j = 0; j < selectedWidgetInfo.floatingItems.length; j++) {
                                var shape = selectedWidgetInfo.floatingItems[j];
                                width = this.documentHelper.render.getScaledValue(shape.width);
                                left = this.documentHelper.render.getScaledValue(shape.x, 1);
                                var shapeTop = this.documentHelper.render.getScaledValue(shape.y, 2);
                                canvasContext.fillRect(left, shapeTop, width, this.documentHelper.render.getScaledValue(shape.height));
                            }
                        }
                    }
                    canvasContext.restore();
                }
            }
        }
    };
    Selection.prototype.renderDashLine = function (ctx, page, widget, left, top, width, height) {
        var fontColor = this.characterFormat.fontColor;
        var fillColor = fontColor ? HelperMethods.getColor(fontColor) : '#000000';
        ctx.globalAlpha = 1;
        // Get character format copied from selection format
        var format = this.owner.editorModule.copyInsertFormat(new WCharacterFormat(), false);
        var heightInfo = this.documentHelper.textHelper.getHeight(format);
        var pageTop = this.getPageTop(page);
        var descent = heightInfo.Height - heightInfo.BaselineOffset;
        top = this.documentHelper.render.getUnderlineYPosition(widget) + top + 4 - descent;
        this.documentHelper.render.renderDashLine(ctx, left, (pageTop - this.viewer.containerTop) + (top * this.documentHelper.zoomFactor), width, fillColor, true);
    };
    /**
     * Add Selection highlight inside table
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.addSelectionHighlightTable = function (canvasContext, tableCellWidget, page) {
        if (this.selectedWidgets.containsKey(tableCellWidget)) {
            var selectedWidgetInfo = this.selectedWidgets.get(tableCellWidget);
            var selectedWidgetInfoCollection = undefined;
            if (selectedWidgetInfo instanceof SelectionWidgetInfo) {
                selectedWidgetInfoCollection = [];
                selectedWidgetInfoCollection.push(selectedWidgetInfo);
            }
            else {
                selectedWidgetInfoCollection = selectedWidgetInfo;
            }
            if (!isNullOrUndefined(selectedWidgetInfoCollection)) {
                for (var i = 0; i < selectedWidgetInfoCollection.length; i++) {
                    var left = this.documentHelper.render.getScaledValue(selectedWidgetInfoCollection[i].left, 1);
                    var top_1 = this.documentHelper.render.getScaledValue(tableCellWidget.y, 2);
                    var width = this.documentHelper.render.getScaledValue(selectedWidgetInfoCollection[i].width);
                    var height = this.documentHelper.render.getScaledValue(tableCellWidget.height);
                    canvasContext.fillStyle = 'gray';
                    if (isNullOrUndefined(page)) {
                        page = this.owner.selectionModule.getPage(tableCellWidget);
                    }
                    this.owner.selectionModule.clipSelection(page, this.owner.selectionModule.getPageTop(page));
                    canvasContext.fillRect(left, top_1, width, height);
                    canvasContext.restore();
                }
            }
        }
    };
    Selection.prototype.removeSelectionHighlight = function (widget) {
        var left = 0;
        var top = 0;
        var width = 0;
        var height = 0;
        var page = undefined;
        if (widget instanceof LineWidget) {
            var lineWidget = widget;
            var currentParaWidget = lineWidget.paragraph;
            page = !isNullOrUndefined(currentParaWidget) ?
                this.getPage((lineWidget.paragraph)) : undefined;
            if (isNullOrUndefined(page)) {
                return;
            }
            top = this.getTop(lineWidget);
            height = lineWidget.height;
        }
        else if (widget instanceof TableCellWidget) {
            page = !isNullOrUndefined(widget) ?
                this.getPage(widget) : undefined;
            if (isNullOrUndefined(page)) {
                return;
            }
            top = widget.y;
            height = widget.height;
        }
        if (isNullOrUndefined(page)) {
            return;
        }
        var selectedWidget = this.selectedWidgets.get(widget);
        var selectedWidgetCollection = undefined;
        if (selectedWidget instanceof SelectionWidgetInfo) {
            selectedWidgetCollection = [];
            selectedWidgetCollection.push(selectedWidget);
        }
        else {
            selectedWidgetCollection = selectedWidget;
        }
        if (!isNullOrUndefined(selectedWidgetCollection)) {
            for (var i = 0; i < selectedWidgetCollection.length; i++) {
                width = selectedWidgetCollection[i].width;
                left = selectedWidgetCollection[i].left;
                var pageRect = page.boundingRectangle;
                var pageIndex = this.documentHelper.pages.indexOf(page);
                var pageGap = this.viewer.pageGap;
                var pageTop = (pageRect.y - pageGap * (pageIndex + 1)) * this.documentHelper.zoomFactor + pageGap * (pageIndex + 1);
                var pageLeft = pageRect.x;
                var zoomFactor = this.documentHelper.zoomFactor;
                if (this.viewer.containerTop <= pageTop
                    || pageTop < this.viewer.containerTop + this.documentHelper.selectionCanvas.height) {
                    this.documentHelper.selectionContext.clearRect((pageLeft + (left * zoomFactor) - this.viewer.containerLeft) - 0.5, (pageTop + (top * zoomFactor)) - this.viewer.containerTop - 0.5, width * zoomFactor + 0.5, height * zoomFactor + 0.5);
                }
            }
        }
    };
    /**
     * Selects the current word.
     *
     * @param excludeSpace True if exclude white space; Otherwise, false.
     * @returns {void}
     */
    Selection.prototype.selectCurrentWord = function (excludeSpace) {
        this.isSelectCurrentWord = true;
        var startPosition = this.start.clone();
        var endPosition = this.end.clone();
        this.selectCurrentWordRange(startPosition, endPosition, excludeSpace ? excludeSpace : false);
        this.selectRange(startPosition, endPosition);
        this.isSelectCurrentWord = false;
    };
    /**
     * Selects the current paragraph.
     *
     * @returns {void}
     */
    Selection.prototype.selectParagraph = function () {
        if (!isNullOrUndefined(this.start)) {
            this.start.paragraphStartInternal(this, false);
            this.end.moveToParagraphEndInternal(this, false);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        }
    };
    /**
     * Selects the current line.
     *
     * @returns {void}
     */
    Selection.prototype.selectLine = function () {
        if (!isNullOrUndefined(this.start)) {
            this.moveToLineStart();
            this.handleShiftEndKey();
        }
    };
    /**
     * Moves the selection to the start of the document.
     *
     * @returns {void}
     */
    Selection.prototype.moveToDocumentStart = function () {
        this.handleControlHomeKey();
    };
    /**
     * Moves the selection to the end of the document.
     *
     * @returns {void}
     */
    Selection.prototype.moveToDocumentEnd = function () {
        this.handleControlEndKey();
    };
    /**
     * Moves the selection to the current paragraph start.
     *
     * @returns {void}
     */
    Selection.prototype.moveToParagraphStart = function () {
        if (this.isForward) {
            this.start.paragraphStartInternal(this, false);
            this.end.setPositionInternal(this.start);
            this.upDownSelectionLength = this.end.location.x;
        }
        else {
            this.end.paragraphStartInternal(this, false);
            this.start.setPositionInternal(this.end);
            this.upDownSelectionLength = this.start.location.x;
        }
        this.fireSelectionChanged(true);
    };
    /**
     * Moves the selection to the current paragraph end.
     *
     * @returns {void}
     */
    Selection.prototype.moveToParagraphEnd = function () {
        if (this.isForward) {
            this.start.moveToParagraphEndInternal(this, false);
            this.end.setPositionInternal(this.start);
            this.upDownSelectionLength = this.end.location.x;
        }
        else {
            this.end.moveToParagraphEndInternal(this, false);
            this.start.setPositionInternal(this.end);
            this.upDownSelectionLength = this.start.location.x;
        }
        this.fireSelectionChanged(true);
    };
    /**
     * Moves the selection to the next line.
     *
     * @returns {void}
     */
    Selection.prototype.moveToNextLine = function () {
        this.moveDown();
    };
    /**
     * Moves the selection to the previous line.
     *
     * @returns {void}
     */
    Selection.prototype.moveToPreviousLine = function () {
        this.moveUp();
    };
    /**
     * Moves the selection to the next character.
     *
     * @returns {void}
     */
    Selection.prototype.moveToNextCharacter = function () {
        this.handleRightKey();
    };
    /**
     * Moves the selection to the previous character.
     *
     * @returns {void}
     */
    Selection.prototype.moveToPreviousCharacter = function () {
        this.handleLeftKey();
    };
    Selection.prototype.selectCurrentWordRange = function (startPosition, endPosition, excludeSpace) {
        if (!isNullOrUndefined(startPosition)) {
            if (startPosition.offset > 0) {
                var wordStart = startPosition.clone();
                var indexInInline = 0;
                var inlineObj = startPosition.currentWidget.getInline(startPosition.offset, indexInInline);
                var inline = inlineObj.element;
                indexInInline = inlineObj.index;
                if (!isNullOrUndefined(inline) && inline instanceof FieldElementBox && inline.fieldType === 1) {
                    if (startPosition.offset > 2 && (!isNullOrUndefined(inline.fieldSeparator) || isNullOrUndefined(inline.fieldBegin))) {
                        wordStart.setPositionParagraph(wordStart.currentWidget, startPosition.offset - 2);
                        wordStart.moveToWordEndInternal(0, false);
                        if (!(wordStart.paragraph === startPosition.paragraph && wordStart.offset === startPosition.offset - 1)) {
                            startPosition.moveToWordStartInternal(2);
                        }
                    }
                    else if (startPosition.offset > 3 && isNullOrUndefined(inline.fieldSeparator)) {
                        wordStart.setPositionParagraph(wordStart.currentWidget, startPosition.offset - 3);
                        wordStart.moveToWordEndInternal(0, false);
                        if (!(wordStart.paragraph === startPosition.paragraph && wordStart.offset === startPosition.offset)) {
                            startPosition.moveToWordStartInternal(2);
                        }
                    }
                }
                else {
                    wordStart.setPositionParagraph(wordStart.currentWidget, startPosition.offset - 1);
                    wordStart.moveToWordEndInternal(0, false);
                    if (!(wordStart.paragraph === startPosition.paragraph && wordStart.offset === startPosition.offset)) {
                        startPosition.moveToWordStartInternal(2);
                    }
                }
            }
            endPosition.moveToWordEndInternal(2, excludeSpace);
        }
    };
    /**
     * Extends the selection to the paragraph start.
     *
     * @returns {void}
     */
    Selection.prototype.extendToParagraphStart = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.paragraphStartInternal(this, true);
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Extends the selection to the paragraph end.
     *
     * @returns {void}
     */
    Selection.prototype.extendToParagraphEnd = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.moveToParagraphEndInternal(this, true);
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Move to next text position
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.moveNextPosition = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        if (this.isEmpty) {
            this.start.moveNextPosition();
            this.end.setPositionInternal(this.start);
        }
        this.updateForwardSelection();
        this.upDownSelectionLength = this.start.location.x;
        this.fireSelectionChanged(true);
        if (this.documentHelper.isFormFillProtectedMode) {
            var formField = this.getCurrentFormField();
            if (!formField) {
                formField = this.getFormFieldInFormFillMode();
                this.selectPrevNextFormField(true, formField);
            }
        }
    };
    /**
     * Move to next paragraph
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.moveToNextParagraph = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.moveToNextParagraphStartInternal();
        this.start.setPositionInternal(this.end);
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Navigates to the next footnote from the current selection.
     *
     * @returns {void}
     */
    Selection.prototype.nextFootnote = function () {
        if (this.isinFootnote) {
            var footNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
            var colLength = this.documentHelper.footnoteCollection.length;
            var indexCount = this.documentHelper.footnoteCollection.indexOf(footNoteElement);
            var nextFootnoteElement = this.documentHelper.footnoteCollection[indexCount + 1];
            if (isNullOrUndefined(nextFootnoteElement)) {
                nextFootnoteElement = footNoteElement;
            }
            var start = this.start.clone();
            var end = this.end.clone();
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                var referenceElement = this.documentHelper.pages[i].footnoteWidget;
                for (var j = 1; j < referenceElement.bodyWidgets.length; j++) {
                    var element = (referenceElement.bodyWidgets[j]).footNoteReference;
                    if (element === nextFootnoteElement) {
                        start.setPositionParagraph(referenceElement.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                        end.setPositionInternal(start);
                        this.selectRange(start, end);
                    }
                }
            }
        }
    };
    /**
     * Navigates to the previous footnote from the current selection.
     *
     * @returns {void}
     */
    Selection.prototype.previousFootnote = function () {
        if (this.isinFootnote) {
            var footNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
            var colLength = this.documentHelper.footnoteCollection.length;
            var indexCount = this.documentHelper.footnoteCollection.indexOf(footNoteElement);
            var previousFootnote = this.documentHelper.footnoteCollection[indexCount - 1];
            if (isNullOrUndefined(previousFootnote)) {
                previousFootnote = footNoteElement;
            }
            var startPosition = this.start.clone();
            var endPosition = this.end.clone();
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                var footnote = this.documentHelper.pages[i].footnoteWidget;
                for (var j = 1; j < footnote.bodyWidgets.length; j++) {
                    var element = (footnote.bodyWidgets[j]).footNoteReference;
                    if (element === previousFootnote) {
                        startPosition.setPositionParagraph(footnote.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                        endPosition.setPositionInternal(startPosition);
                        this.selectRange(startPosition, endPosition);
                    }
                }
            }
        }
    };
    /**
     * Navigates to the next endnote from the current selection
     *
     * @returns {void}
     */
    Selection.prototype.nextEndnote = function () {
        if (this.isinEndnote) {
            var endNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
            var indexCount = this.documentHelper.endnoteCollection.indexOf(endNoteElement);
            var nextEndnote = this.documentHelper.endnoteCollection[indexCount + 1];
            if (isNullOrUndefined(nextEndnote)) {
                nextEndnote = endNoteElement;
            }
            var startPosition = this.start.clone();
            var endPosition = this.end.clone();
            var endnoteElement = this.documentHelper.pages[this.endPage - 1].endnoteWidget;
            for (var j = 0; j < endnoteElement.childWidgets.length; j++) {
                var element = (endnoteElement.bodyWidgets[j]).footNoteReference;
                if (element === nextEndnote) {
                    startPosition.setPositionParagraph(endnoteElement.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                    endPosition.setPositionInternal(startPosition);
                    this.selectRange(startPosition, endPosition);
                }
            }
        }
    };
    /**
     * Navigates to the previous endnote from the current selection.
     *
     * @returns {void}
     */
    Selection.prototype.previousEndnote = function () {
        if (this.isinEndnote) {
            var endNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
            var indexCount = this.documentHelper.endnoteCollection.indexOf(endNoteElement);
            var inline = this.documentHelper.endnoteCollection[indexCount - 1];
            if (isNullOrUndefined(inline)) {
                inline = endNoteElement;
            }
            var startPosition = this.start.clone();
            var endPosition = this.end.clone();
            var referenceElement = this.documentHelper.pages[this.endPage - 1].endnoteWidget;
            for (var j = 0; j < referenceElement.childWidgets.length; j++) {
                var element = (referenceElement.bodyWidgets[j]).footNoteReference;
                if (element === inline) {
                    startPosition.setPositionParagraph(referenceElement.bodyWidgets[j].childWidgets[0].childWidgets[0], 0);
                    endPosition.setPositionInternal(startPosition);
                    this.selectRange(startPosition, endPosition);
                }
            }
        }
    };
    /**
     * Move to previous text position
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.movePreviousPosition = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        if (this.isEmpty) {
            this.start.movePreviousPosition();
            this.end.setPositionInternal(this.start);
        }
        this.updateBackwardSelection();
        this.upDownSelectionLength = this.start.location.x;
        this.fireSelectionChanged(true);
        if (this.documentHelper.isFormFillProtectedMode) {
            var formField = this.getCurrentFormField();
            if (!formField) {
                formField = this.getFormFieldInFormFillMode();
                this.selectPrevNextFormField(false, formField);
            }
        }
    };
    /**
     * Move to previous paragraph
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.moveToPreviousParagraph = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.moveToPreviousParagraph(this);
        this.start.setPositionInternal(this.end);
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Extends the selection to previous line.
     *
     * @returns {void}
     */
    Selection.prototype.extendToPreviousLine = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.moveToPreviousLine(this, this.upDownSelectionLength);
        this.fireSelectionChanged(true);
    };
    /**
     * Extends the selection to line end
     *
     * @returns {void}
     */
    Selection.prototype.extendToLineEnd = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.moveToLineEndInternal(this, true);
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Extends the selection to line start.
     *
     * @returns {void}
     */
    Selection.prototype.extendToLineStart = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.moveToLineStartInternal(this, true);
        this.upDownSelectionLength = this.end.location.x;
        // To select Paragraph mark similar to MS WORD
        if (this.start.paragraph === this.end.paragraph && this.start.offset === this.start.currentWidget.getEndOffset()
            && this.isParagraphLastLine(this.start.currentWidget) && this.isParagraphFirstLine(this.end.currentWidget)) {
            this.start.setPositionParagraph(this.start.currentWidget, this.start.offset + 1);
        }
        this.fireSelectionChanged(true);
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.moveUp = function () {
        if (this.documentHelper.isFormFillProtectedMode) {
            this.selectPrevNextFormField(false);
            return;
        }
        if (isNullOrUndefined(this.start)) {
            return;
        }
        if (!this.isEmpty) {
            if (this.isForward) {
                this.end.setPositionInternal(this.start);
            }
            else {
                this.start.setPositionInternal(this.end);
            }
            this.upDownSelectionLength = this.start.location.x;
        }
        this.upDownSelectionLength = this.start.location.x;
        var beforeUp = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
        var isMultiColumn = this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 ? true : false;
        var beforeIndex = this.start.currentWidget.paragraph.bodyWidget.index;
        this.start.moveUp(this, this.upDownSelectionLength);
        isMultiColumn = this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 ? true : false;
        var afterUp = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
        if (isMultiColumn) {
            if (beforeUp === afterUp || beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1) {
                this.end.setPositionInternal(this.start);
            }
            else {
                do {
                    if (isNullOrUndefined(this.start.currentWidget.paragraph.previousRenderedWidget) || (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1)) {
                        break;
                    }
                    if (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 && beforeUp > this.start.currentWidget.paragraph.bodyWidget.columnIndex) {
                        break;
                    }
                    this.start.moveUp(this, this.upDownSelectionLength);
                } while (beforeUp !== this.start.currentWidget.paragraph.bodyWidget.columnIndex);
            }
        }
        this.end.setPositionInternal(this.start);
        this.fireSelectionChanged(true);
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.moveDown = function () {
        if (this.documentHelper.isFormFillProtectedMode) {
            this.selectPrevNextFormField(true);
            return;
        }
        if (isNullOrUndefined(this.start)) {
            return;
        }
        if (!this.isEmpty) {
            if (this.isForward) {
                this.start.setPositionInternal(this.end);
            }
            else {
                this.end.setPositionInternal(this.start);
            }
            this.upDownSelectionLength = this.start.location.x;
        }
        this.upDownSelectionLength = this.start.location.x;
        var beforeDown = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
        var beforeIndex = this.start.currentWidget.paragraph.bodyWidget.index;
        var isMultiColumn = this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 ? true : false;
        this.start.moveDown(this, this.upDownSelectionLength);
        var afterDown = this.start.currentWidget.paragraph.bodyWidget.columnIndex;
        if (isMultiColumn) {
            if (beforeDown === afterDown || beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1) {
                this.end.setPositionInternal(this.start);
            }
            else {
                do {
                    if (isNullOrUndefined(this.start.currentWidget.paragraph.nextRenderedWidget) || (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns === 1)) {
                        break;
                    }
                    if (beforeIndex !== this.start.currentWidget.paragraph.bodyWidget.index && this.start.currentWidget.paragraph.bodyWidget.sectionFormat.numberOfColumns > 1 && this.documentHelper.layout.getBodyWidget(this.start.currentWidget.paragraph.bodyWidget, false) === this.start.currentWidget.paragraph.bodyWidget) {
                        break;
                    }
                    this.start.moveDown(this, this.upDownSelectionLength);
                } while (beforeDown !== this.start.currentWidget.paragraph.bodyWidget.columnIndex);
            }
        }
        this.end.setPositionInternal(this.start);
        this.fireSelectionChanged(true);
    };
    Selection.prototype.updateForwardSelection = function () {
        if (!this.isEmpty) {
            if (this.isForward) {
                this.start.setPositionInternal(this.end);
            }
            else {
                this.end.setPositionInternal(this.start);
            }
        }
    };
    Selection.prototype.updateBackwardSelection = function () {
        if (!this.isEmpty) {
            if (this.isForward) {
                this.end.setPositionInternal(this.start);
            }
            else {
                this.start.setPositionInternal(this.end);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.getFirstBlockInFirstCell = function (table) {
        if (table.childWidgets.length > 0) {
            var firstrow = table.childWidgets[0];
            if (firstrow.childWidgets.length > 0) {
                var firstcell = firstrow.childWidgets[0];
                if (firstcell.childWidgets.length === 0) {
                    return undefined;
                }
                return firstcell.childWidgets[0];
            }
        }
        return undefined;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.getFirstCellInRegion = function (row, startCell, selectionLength, isMovePrevious) {
        var cellStart = this.getCellLeft(row, startCell);
        var cellEnd = cellStart + startCell.cellFormat.cellWidth;
        var flag = true;
        if (cellStart <= selectionLength && selectionLength < cellEnd) {
            for (var k = 0; k < row.childWidgets.length; k++) {
                var left = this.getCellLeft(row, row.childWidgets[k]);
                if (HelperMethods.round(cellStart, 2) <= HelperMethods.round(left, 2) &&
                    HelperMethods.round(left, 2) < HelperMethods.round(cellEnd, 2)) {
                    flag = false;
                    return row.childWidgets[k];
                }
            }
        }
        else {
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cellLeft = this.getCellLeft(row, row.childWidgets[j]);
                if (cellLeft <= selectionLength && cellLeft +
                    row.childWidgets[j].cellFormat.cellWidth > selectionLength) {
                    flag = false;
                    return row.childWidgets[j];
                }
            }
        }
        if (flag) {
            if (!isNullOrUndefined(row.previousRenderedWidget) && isMovePrevious) {
                var previousWidget = row.previousRenderedWidget;
                return this.getFirstCellInRegion(previousWidget, startCell, selectionLength, isMovePrevious);
            }
            else if (!isNullOrUndefined(row.nextRenderedWidget) && !isMovePrevious) {
                return this.getFirstCellInRegion(row.nextRenderedWidget, startCell, selectionLength, isMovePrevious);
            }
        }
        return row.childWidgets[0];
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.getFirstParagraph = function (tableCell) {
        while (tableCell.previousSplitWidget) {
            tableCell = tableCell.previousSplitWidget;
        }
        var firstBlock = tableCell.firstChild;
        return this.documentHelper.getFirstParagraphBlock(firstBlock);
    };
    /**
     * Get last block in last cell
     *
     * @private
     * @returns {void}
     */
    //Table
    Selection.prototype.getLastBlockInLastCell = function (table) {
        if (table.childWidgets.length > 0) {
            var lastRow = table.childWidgets[table.childWidgets.length - 1];
            var lastCell = lastRow.childWidgets[lastRow.childWidgets.length - 1];
            while (lastCell.childWidgets.length === 0 && !isNullOrUndefined(lastCell.previousSplitWidget)) {
                lastCell = lastCell.previousSplitWidget;
            }
            return lastCell.childWidgets[lastCell.childWidgets.length - 1];
        }
        return undefined;
    };
    /**
     * Moves the selection to start of the current line.
     *
     * @returns {void}
     */
    Selection.prototype.moveToLineStart = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.updateBackwardSelection();
        this.start.moveToLineStartInternal(this, false);
        this.end.setPositionInternal(this.start);
        this.upDownSelectionLength = this.start.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Moves the selection to end of the current line.
     *
     * @returns {void}
     */
    Selection.prototype.moveToLineEnd = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.updateForwardSelection();
        this.start.moveToLineEndInternal(this, false);
        this.end.setPositionInternal(this.start);
        this.upDownSelectionLength = this.start.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Get Page top
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.getPageTop = function (page) {
        return (page.boundingRectangle.y - this.viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1)) * this.documentHelper.zoomFactor + this.viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1);
    };
    /**
     * Move text position to cursor point
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.moveTextPosition = function (cursorPoint, textPosition, isMouseLeave) {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        //Updates the text position based on the cursor position.
        var widget = this.documentHelper.getLineWidgetInternal(cursorPoint, true);
        if (!isNullOrUndefined(widget)) {
            this.updateTextPositionWidget(widget, cursorPoint, textPosition, true);
        }
        this.upDownSelectionLength = textPosition.location.x;
        var selectionStartIndex = this.start.getHierarchicalIndexInternal();
        var selectionEndIndex = this.end.getHierarchicalIndexInternal();
        if (selectionStartIndex !== selectionEndIndex && !isMouseLeave) {
            // Extends selection end to field begin or field end.
            if (TextPosition.isForwardSelection(selectionStartIndex, selectionEndIndex)) {
                textPosition.validateForwardFieldSelection(selectionStartIndex, selectionEndIndex);
            }
            else {
                textPosition.validateBackwardFieldSelection(selectionStartIndex, selectionEndIndex);
            }
        }
        this.fireSelectionChanged(true);
    };
    //Helper Method Implementation
    //Document
    /**
     * Get document start position
     *
     * @private
     * @returns {TextPosition}
     */
    Selection.prototype.getDocumentStart = function () {
        var textPosition = undefined;
        var block = this.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
        return this.setPositionForBlock(block, true);
    };
    /**
     * Get document end position
     *
     * @private
     * @returns {TextPosition}
     */
    Selection.prototype.getDocumentEnd = function () {
        var textPosition = undefined;
        var documentStart = this.owner.documentStart;
        var lastPage = this.documentHelper.pages[this.documentHelper.pages.length - 1];
        // Bug 893168: If the length of the page's body widgets is 1 and the length of the child widgets is 0, then it is necessary to check the previous page.
        while (lastPage.previousPage && lastPage.bodyWidgets.length === 1
            && lastPage.bodyWidgets[0].childWidgets.length === 0) {
            lastPage = lastPage.previousPage;
        }
        if (!isNullOrUndefined(documentStart) && lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1].childWidgets.length > 0) {
            var block = undefined;
            var section = lastPage.bodyWidgets[lastPage.bodyWidgets.length - 1];
            var blocks = section.childWidgets;
            var lastBlkItem = blocks.length - 1;
            var lastBlock = blocks[lastBlkItem];
            if (lastBlock instanceof BlockWidget) {
                block = lastBlock;
            }
            textPosition = this.setPositionForBlock(block, false);
        }
        return textPosition;
    };
    //Keyboard shortcut internal API
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlEndKey = function () {
        this.isHomeEnd = true;
        var documentEnd = undefined;
        if (!isNullOrUndefined(this.owner.documentEnd)) {
            documentEnd = this.owner.documentEnd;
        }
        if (!isNullOrUndefined(documentEnd)) {
            this.owner.selectionModule.selectContent(documentEnd, true);
        }
        if (this.owner.enableAutoFocus) {
            this.checkForCursorVisibility();
        }
        this.isHomeEnd = false;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlHomeKey = function () {
        this.isHomeEnd = true;
        var documentStart = undefined;
        if (!isNullOrUndefined(this.owner.documentStart)) {
            documentStart = this.owner.documentStart;
        }
        if (!isNullOrUndefined(documentStart)) {
            this.owner.selectionModule.selectContent(documentStart, true);
        }
        if (this.owner.enableAutoFocus) {
            this.checkForCursorVisibility();
        }
        this.isHomeEnd = false;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlLeftKey = function () {
        this.extendToWordStartInternal(true);
        this.checkForCursorVisibility();
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlRightKey = function () {
        this.extendToWordEndInternal(true);
        this.checkForCursorVisibility();
    };
    /**
     * Handles control down key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlDownKey = function () {
        this.moveToNextParagraph();
        this.checkForCursorVisibility();
    };
    /**
     * Handles control up key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlUpKey = function () {
        this.moveToPreviousParagraph();
        this.checkForCursorVisibility();
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.handleShiftLeftKey = function () {
        this.extendBackward();
        this.checkForCursorVisibility();
    };
    /**
     * Handles shift up key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleShiftUpKey = function () {
        this.extendToPreviousLine();
        this.checkForCursorVisibility();
    };
    /**
     * Handles shift right key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleShiftRightKey = function () {
        this.extendForward();
        this.checkForCursorVisibility();
    };
    /**
     * Handles shift down key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleShiftDownKey = function () {
        this.extendToNextLine();
        this.checkForCursorVisibility();
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlShiftLeftKey = function () {
        var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
        if (isForward) {
            this.extendToWordEndInternal(false);
        }
        else {
            this.extendToWordStartInternal(false);
        }
        this.checkForCursorVisibility();
    };
    /**
     * Handles control shift up key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlShiftUpKey = function () {
        this.extendToParagraphStart();
        this.checkForCursorVisibility();
    };
    /**
     * Handles control shift right key
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlShiftRightKey = function () {
        var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
        if (isForward) {
            this.extendToWordStartInternal(false);
        }
        else {
            this.extendToWordEndInternal(false);
        }
        this.checkForCursorVisibility();
    };
    /**
     * Handles control shift down key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlShiftDownKey = function () {
        this.extendToParagraphEnd();
        this.checkForCursorVisibility();
    };
    /**
     * Handles left key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleLeftKey = function () {
        if (this.end.isCurrentParaBidi) {
            this.moveNextPosition();
        }
        else {
            this.movePreviousPosition();
        }
        if (this.owner.enableAutoFocus) {
            this.checkForCursorVisibility();
        }
    };
    /**
     * Handles up key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleUpKey = function () {
        this.isMoveDownOrMoveUp = true;
        this.moveUp();
        this.isMoveDownOrMoveUp = false;
        this.checkForCursorVisibility();
    };
    /**
     * Handles right key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleRightKey = function () {
        if (this.end.isCurrentParaBidi) {
            this.movePreviousPosition();
        }
        else {
            this.moveNextPosition();
        }
        if (this.owner.enableAutoFocus) {
            this.checkForCursorVisibility();
        }
    };
    /**
     * Handles end key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleEndKey = function () {
        this.isHomeEnd = true;
        this.moveToLineEnd();
        this.checkForCursorVisibility();
        this.isHomeEnd = false;
    };
    /**
     * Handles home key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleHomeKey = function () {
        this.isHomeEnd = true;
        this.moveToLineStart();
        this.checkForCursorVisibility();
        this.isHomeEnd = false;
    };
    /**
     * Handles down key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleDownKey = function () {
        this.isMoveDownOrMoveUp = true;
        this.moveDown();
        this.isMoveDownOrMoveUp = false;
        this.checkForCursorVisibility();
    };
    /**
     * Handles shift end key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleShiftEndKey = function () {
        this.isHomeEnd = true;
        this.extendToLineEnd();
        this.checkForCursorVisibility();
        this.isHomeEnd = false;
    };
    /**
     * Handles shift home key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleShiftHomeKey = function () {
        this.isHomeEnd = true;
        this.extendToLineStart();
        this.checkForCursorVisibility();
        this.isHomeEnd = false;
    };
    /**
     * Handles control shift end key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlShiftEndKey = function () {
        this.isHomeEnd = true;
        var documentEnd = undefined;
        if (!isNullOrUndefined(this.owner.documentEnd)) {
            documentEnd = this.owner.documentEnd;
        }
        if (!isNullOrUndefined(documentEnd)) {
            this.end.setPosition(documentEnd.currentWidget, false);
            this.fireSelectionChanged(true);
        }
        this.checkForCursorVisibility();
        this.isHomeEnd = false;
    };
    /**
     * Handles control shift home key.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.handleControlShiftHomeKey = function () {
        this.isHomeEnd = true;
        var documentStart = undefined;
        if (!isNullOrUndefined(this.owner.documentStart)) {
            documentStart = this.owner.documentStart;
        }
        if (!isNullOrUndefined(documentStart)) {
            this.end.setPositionInternal(documentStart);
            this.fireSelectionChanged(true);
        }
        this.checkForCursorVisibility();
        this.isHomeEnd = false;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.handleSpaceBarKey = function () {
        if (this.owner.documentHelper.isDocumentProtected && this.owner.documentHelper.protectionType === 'FormFieldsOnly'
            && this.getFormFieldType() === 'CheckBox') {
            this.owner.editorModule.toggleCheckBoxFormField(this.getCurrentFormField());
        }
    };
    /**
     * Handles tab key.
     *
     * @param isNavigateInCell
     * @param isShiftTab
     * @private
     * @returns {void}
     */
    Selection.prototype.handleTabKey = function (isNavigateInCell, isShiftTab) {
        var start = this.start;
        if (!this.isForward) {
            start = this.end;
        }
        var isCursorAtParaStart = false;
        var isCursorAtLineStart = false;
        if (isNullOrUndefined(start)) {
            return;
        }
        if ((start.offset === 0 || (!this.isForward && this.end.offset === 0)) && start.paragraph.paragraphFormat.listFormat.listId == -1) {
            if (start.currentWidget.isFirstLine()) {
                isCursorAtParaStart = true;
            }
            isCursorAtLineStart = true;
        }
        if (this.start.paragraph.isInsideTable && this.end.paragraph.isInsideTable && (isNavigateInCell || isShiftTab)) {
            //Perform tab navigation
            if (!this.owner.documentHelper.isDocumentProtected && !(this.documentHelper.protectionType === 'FormFieldsOnly')) {
                if (isShiftTab) {
                    this.selectPreviousCell();
                }
                else {
                    this.selectNextCell();
                }
            }
        }
        else if ((isNavigateInCell || isShiftTab) && !isNullOrUndefined(start) && start.offset === this.getStartOffset(start.paragraph)
            && !isNullOrUndefined(start.paragraph.paragraphFormat) && !isNullOrUndefined(start.paragraph.paragraphFormat.listFormat)
            && start.paragraph.paragraphFormat.listFormat.listId !== -1 && !this.owner.isReadOnlyMode) {
            var selection = this.documentHelper.selection;
            var currentPara = start.paragraph;
            var isFirstParaForList = false;
            if (!selection.isForward) {
                currentPara = selection.end.paragraph;
            }
            isFirstParaForList = this.owner.editorModule.isFirstParaForList(selection, currentPara);
            if (isFirstParaForList) {
                if (isShiftTab) {
                    this.owner.editorModule.updateListLevelIndent(-this.documentHelper.defaultTabWidth, currentPara);
                }
                else {
                    this.owner.editorModule.updateListLevelIndent(this.documentHelper.defaultTabWidth, currentPara);
                }
            }
            else {
                this.owner.editorModule.updateListLevel(isShiftTab ? false : true);
            }
        }
        else if (!this.owner.isReadOnlyMode && !this.documentHelper.isFormFillProtectedMode) {
            if (isCursorAtParaStart && start.paragraph.paragraphFormat.firstLineIndent < this.documentHelper.defaultTabWidth) {
                this.documentHelper.owner.editorModule.onApplyParagraphFormat('firstLineIndent', this.documentHelper.defaultTabWidth, true, false);
            }
            else if (isCursorAtLineStart) {
                if (isShiftTab) {
                    this.owner.editorModule.decreaseIndent();
                }
                else {
                    if (HelperMethods.convertPointToPixel(start.paragraph.paragraphFormat.firstLineIndent + start.paragraph.paragraphFormat.leftIndent) < this.documentHelper.viewer.clientArea.width) {
                        this.owner.editorModule.increaseIndent();
                    }
                }
            }
            else {
                this.owner.editorModule.handleTextInput('\t');
            }
        }
        if (this.documentHelper.protectionType === 'FormFieldsOnly' && this.documentHelper.formFields.length > 0) {
            this.selectPrevNextFormField(!isShiftTab);
        }
        this.checkForCursorVisibility();
    };
    /**
    * @private
    * @returns {void}
    */
    Selection.prototype.handlePageUpPageDownKey = function (isPageDown, shiftKey) {
        var _this = this;
        var offsetX = this.end.location.x;
        var offsetY = this.end.location.y;
        var page = this.end.paragraph.bodyWidget.page;
        var pageTop = this.getPageTop(page);
        var previousScrollTop = this.documentHelper.viewerContainer.scrollTop;
        offsetY = (offsetY * this.documentHelper.zoomFactor) + (pageTop - previousScrollTop);
        offsetX = (offsetX * this.documentHelper.zoomFactor) + page.boundingRectangle.x;
        if (isPageDown) {
            this.documentHelper.viewerContainer.scrollTop += this.documentHelper.visibleBounds.height;
        }
        else {
            this.documentHelper.viewerContainer.scrollTop -= this.documentHelper.visibleBounds.height;
        }
        var isSameScrollTop = false;
        if (previousScrollTop === this.documentHelper.viewerContainer.scrollTop) {
            isSameScrollTop = true;
        }
        if (shiftKey) {
            this.documentHelper.skipScrollToPosition = true;
        }
        setTimeout(function () {
            if (isSameScrollTop) {
                if (!shiftKey) {
                    if (isPageDown)
                        _this.moveToDocumentEnd();
                    else
                        _this.moveToDocumentStart();
                }
                else {
                    var position = void 0;
                    if (isPageDown) {
                        position = _this.getDocumentEnd();
                    }
                    else {
                        position = _this.getDocumentStart();
                    }
                    _this.end.setPositionForLineWidget(position.currentWidget, position.offset);
                    _this.fireSelectionChanged(true);
                }
            }
            else {
                _this.select({ x: offsetX, y: offsetY, extend: shiftKey });
            }
        }, 0);
    };
    // returns current field in FormFill mode
    Selection.prototype.getFormFieldInFormFillMode = function () {
        var currentStart = this.owner.selectionModule.start;
        var formField;
        for (var i = (this.documentHelper.formFields.length - 1); i >= 0; i--) {
            if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                continue;
            }
            var paraIndex = this.getElementPosition(this.documentHelper.formFields[i]).startPosition;
            if (paraIndex.isExistBefore(currentStart)) {
                formField = this.documentHelper.formFields[i];
                break;
            }
            else if (i === 0) {
                formField = this.documentHelper.formFields[(this.documentHelper.formFields.length - 1)];
            }
        }
        return formField;
    };
    // Navigates & Selects next form field
    Selection.prototype.selectPrevNextFormField = function (forward, formField) {
        if (this.documentHelper.isFormFillProtectedMode) {
            if (!formField) {
                formField = this.getCurrentFormField();
            }
            var index = this.documentHelper.formFields.indexOf(formField);
            if (index !== -1) {
                if (forward) {
                    for (var i = index;; i++) {
                        if (i === (this.documentHelper.formFields.length - 1)) {
                            i = 0;
                        }
                        else {
                            i = i + 1;
                        }
                        if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                            i = i - 1;
                            continue;
                        }
                        this.selectFieldInternal(this.documentHelper.formFields[i], true);
                        break;
                    }
                }
                else {
                    for (var i = index;; i--) {
                        if (i === 0) {
                            i = (this.documentHelper.formFields.length - 1);
                        }
                        else {
                            i = i - 1;
                        }
                        if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                            i = i + 1;
                            continue;
                        }
                        this.selectFieldInternal(this.documentHelper.formFields[i], true);
                        break;
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.navigateToNextFormField = function () {
        var currentStart = this.owner.selectionModule.end;
        var currentFormField;
        for (var i = 0; i < this.documentHelper.formFields.length; i++) {
            currentFormField = this.documentHelper.formFields[i];
            if (!this.documentHelper.formFields[i].formFieldData.enabled) {
                continue;
            }
            var paraIndex = this.getElementPosition(this.documentHelper.formFields[i]).startPosition;
            if (paraIndex.isExistAfter(currentStart)) {
                if (currentFormField.formFieldData instanceof TextFormField && currentFormField.formFieldData.type === 'Text' &&
                    this.documentHelper.isInlineFormFillProtectedMode) {
                    this.selectTextElementStartOfField(this.documentHelper.formFields[i]);
                }
                else {
                    this.selectFieldInternal(this.documentHelper.formFields[i]);
                }
                break;
            }
            else if (i === (this.documentHelper.formFields.length - 1)) {
                currentFormField = this.documentHelper.formFields[0];
                if (currentFormField.formFieldData instanceof TextFormField && currentFormField.formFieldData.type === 'Text' &&
                    this.documentHelper.isInlineFormFillProtectedMode) {
                    this.selectTextElementStartOfField(this.documentHelper.formFields[0]);
                }
                else {
                    this.selectFieldInternal(this.documentHelper.formFields[0]);
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.selectTextElementStartOfField = function (formField) {
        var fieldSeparator = formField.fieldSeparator;
        var element = fieldSeparator.nextElement;
        if (element) {
            while (!(element instanceof TextElementBox)) {
                element = element.nextElement;
            }
            var offset = formField.line.getOffset(element, 0);
            var point = this.getPhysicalPositionInternal(formField.line, offset, false);
            this.selectInternal(formField.line, element, 0, point);
        }
    };
    Selection.prototype.triggerFormFillEvent = function (isKeyBoardNavigation) {
        var previousField = this.previousSelectedFormField;
        var currentField = this.currentFormField;
        var previousFieldData;
        var currentFieldData;
        if (currentField !== previousField && previousField && previousField.formFieldData instanceof TextFormField
            && previousField.formFieldData.type === 'Text') {
            if (previousField.formFieldData.format !== '' && !this.isFormatUpdated) {
                // Need to handle update form field format
                this.owner.editorModule.applyFormTextFormat(previousField);
                if (!isNullOrUndefined(this.previousSelectedFormField)) {
                    previousField = this.previousSelectedFormField;
                }
            }
            previousFieldData = { 'fieldName': previousField.formFieldData.name, 'value': this.owner.editorModule.getFieldResultText(previousField) };
            this.owner.trigger(afterFormFieldFillEvent, previousFieldData);
        }
        if (currentField !== previousField && currentField && ((currentField.formFieldData instanceof TextFormField
            && currentField.formFieldData.type === 'Text' && isKeyBoardNavigation == undefined) || (((currentField.formFieldData instanceof TextFormField && this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Inline') || (currentField.formFieldData instanceof CheckBoxFormField)) && isKeyBoardNavigation))) {
            currentFieldData = { 'fieldName': currentField.formFieldData.name, 'value': this.owner.editorModule.getFieldResultText(currentField) };
            this.owner.trigger(beforeFormFieldFillEvent, currentFieldData);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.triggerContentControlFillEvent = function () {
        var currentContentControl = this.currentContentControl;
        var previousContentControl = this.previousSelectedContentControl;
        if (!isNullOrUndefined(previousContentControl) && previousContentControl.contentControlProperties) {
            var data = { 'Text': this.owner.editor.getResultContentControlText(previousContentControl) };
            this.owner.trigger(aftercontentControlFillEvent, data);
            if (!isNullOrUndefined(previousContentControl.contentControlProperties.xmlMapping)) {
                var xpath = previousContentControl.contentControlProperties.xmlMapping.xPath;
                this.owner.xmlPaneModule.updateContent(data.Text, xpath);
            }
        }
        if (!isNullOrUndefined(currentContentControl) && currentContentControl.contentControlProperties) {
            var data = { 'Text': this.owner.editor.getResultContentControlText(currentContentControl) };
            this.owner.trigger(beforecontentControlFillEvent, data);
        }
    };
    Selection.prototype.selectPreviousCell = function () {
        var tableCell = this.start.paragraph.associatedCell;
        var tableRow = tableCell.ownerRow;
        var tableAdv = tableRow.ownerTable;
        if (isNullOrUndefined(tableCell.previousWidget)) {
            if (!isNullOrUndefined(tableRow.previousRenderedWidget)) {
                //Move text selection or cursor to previous row's last cell
                var prevRow = undefined;
                if (tableRow.previousRenderedWidget instanceof TableRowWidget) {
                    prevRow = tableRow.previousRenderedWidget;
                }
                this.selectTableCellInternal(prevRow.childWidgets[prevRow.childWidgets.length - 1], true);
            }
        }
        else {
            //Move text selection or cursor to next cell in current row
            var prevCell = undefined;
            if (tableCell.previousWidget instanceof TableCellWidget) {
                prevCell = tableCell.previousWidget;
            }
            this.selectTableCellInternal(prevCell, true);
        }
    };
    Selection.prototype.selectNextCell = function () {
        var tableCell = this.start.paragraph.associatedCell;
        var tableRow = tableCell.ownerRow;
        var tableAdv = tableRow.ownerTable;
        if (isNullOrUndefined(tableCell.nextWidget)) {
            if (isNullOrUndefined(tableRow.nextRenderedWidget) && !this.owner.isReadOnlyMode) {
                //Insert new row below
                this.owner.editorModule.insertRow(false);
            }
            else {
                //Move text selection or cursor to next row's first cell
                var nextRow = undefined;
                if (tableRow.nextRenderedWidget instanceof TableRowWidget) {
                    nextRow = tableRow.nextRenderedWidget;
                }
                this.selectTableCellInternal(nextRow.childWidgets[0], true);
            }
            // }
        }
        else {
            //Move text selection or cursor to next cell in current row
            var nextCell = undefined;
            if (tableCell.nextRenderedWidget instanceof TableCellWidget) {
                nextCell = tableCell.nextRenderedWidget;
            }
            this.selectTableCellInternal(nextCell, true);
        }
    };
    /**
     * Select given table cell
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.selectTableCellInternal = function (tableCell, clearMultiSelection) {
        var firstParagraph = this.getFirstParagraph(tableCell);
        var lastParagraph = this.getLastParagraph(tableCell);
        if (firstParagraph === lastParagraph && lastParagraph.isEmpty()) {
            this.selectParagraphInternal(lastParagraph, true);
        }
        else {
            var firstLineWidget = lastParagraph.childWidgets[0];
            this.start.setPosition(firstParagraph.childWidgets[0], true);
            this.end.setPositionParagraph(firstLineWidget, firstLineWidget.getEndOffset());
            this.fireSelectionChanged(true);
        }
    };
    /**
     * Select while table
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.selectTableInternal = function () {
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        if (!isNullOrUndefined(start) && !isNullOrUndefined(end) && !isNullOrUndefined(this.getTable(start, end))) {
            var containerCell = this.getContainerCellOf(start.paragraph.associatedCell, end.paragraph.associatedCell);
            var table = containerCell.ownerTable;
            var firstPara = this.documentHelper.getFirstParagraphBlock(table);
            var lastPara = this.documentHelper.getLastParagraphBlock(table);
            var offset = lastPara.lastChild.getEndOffset();
            this.start.setPosition(firstPara.childWidgets[0], true);
            this.end.setPositionParagraph(lastPara.lastChild, offset + 1);
        }
        this.selectPosition(this.start, this.end);
    };
    /**
     * @private
     */
    Selection.prototype.getTableRevision = function () {
        var start = this.start.clone();
        var end = this.end.clone();
        if (!this.isForward) {
            start = this.end.clone();
            end = this.start.clone();
        }
        if (!isNullOrUndefined(start) && !isNullOrUndefined(end) && !isNullOrUndefined(this.getTable(start, end))) {
            var containerCell = this.getContainerCellOf(start.paragraph.associatedCell, end.paragraph.associatedCell);
            var table = containerCell.ownerTable;
            var firstPara = this.documentHelper.getFirstParagraphBlock(table);
            var lastPara = this.documentHelper.getLastParagraphBlock(table);
            var offset = lastPara.lastChild.getEndOffset();
            start.setPosition(firstPara.childWidgets[0], true);
            end.setPositionParagraph(lastPara.lastChild, offset + 1);
        }
        var startIndex = this.getAbsolutePositionFromRelativePosition(start);
        var endIndex = this.getAbsolutePositionFromRelativePosition(end);
        return Math.abs(endIndex - startIndex);
        // this.selectPosition(this.start, this.end);
    };
    /**
     * Select single column
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.selectColumnInternal = function () {
        var startTextPos = this.start;
        var endTextPos = this.end;
        if (!this.isForward) {
            startTextPos = this.end;
            endTextPos = this.start;
        }
        if (!isNullOrUndefined(startTextPos) && !isNullOrUndefined(endTextPos) && !isNullOrUndefined(this.getTable(startTextPos, endTextPos))) {
            var containerCell = this.getContainerCellOf(startTextPos.paragraph.associatedCell, endTextPos.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(endTextPos.paragraph.associatedCell)) {
                var startCell = this.getSelectedCell(startTextPos.paragraph.associatedCell, containerCell);
                var endCell = this.getSelectedCell(endTextPos.paragraph.associatedCell, containerCell);
                if (this.containsCell(containerCell, endTextPos.paragraph.associatedCell)) {
                    var row = startCell.ownerRow;
                    var columnCells = containerCell.ownerTable.getColumnCellsForSelection(containerCell, containerCell);
                    if (columnCells.length > 0) {
                        var firstPara = this.getFirstParagraph(columnCells[0]);
                        var lastPara = this.getLastParagraph(columnCells[columnCells.length - 1]);
                        this.start.setPosition(firstPara.firstChild, true);
                        var lastLine = lastPara.lastChild;
                        this.end.setPositionParagraph(lastLine, lastLine.getEndOffset() + 1);
                    }
                }
                else {
                    var startCellColumnCells = containerCell.ownerTable.getColumnCellsForSelection(startCell, startCell);
                    var endCellColumnCells = containerCell.ownerTable.getColumnCellsForSelection(endCell, endCell);
                    if (startCellColumnCells.length > 0 && endCellColumnCells.length > 0) {
                        var firstPara = this.getFirstParagraph(startCellColumnCells[0]);
                        var lastPara = this.getLastParagraph(endCellColumnCells[endCellColumnCells.length - 1]);
                        this.start.setPosition(firstPara.firstChild, true);
                        var lastLine = lastPara.lastChild;
                        this.end.setPositionParagraph(lastLine, lastLine.getEndOffset() + 1);
                    }
                }
            }
        }
        this.selectPosition(this.start, this.end);
    };
    /**
     * Select single row
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.selectTableRow = function () {
        var startPos = this.start;
        var endPos = this.end;
        if (!this.isForward) {
            startPos = this.end;
            endPos = this.start;
        }
        if (!isNullOrUndefined(startPos) && !isNullOrUndefined(endPos) && !isNullOrUndefined(this.getTable(startPos, endPos))) {
            var containerCell = void 0;
            containerCell = this.getContainerCellOf(startPos.paragraph.associatedCell, endPos.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(endPos.paragraph.associatedCell)) {
                var startCell = this.getSelectedCell(startPos.paragraph.associatedCell, containerCell);
                var endCell = this.getSelectedCell(endPos.paragraph.associatedCell, containerCell);
                if (this.containsCell(containerCell, endPos.paragraph.associatedCell)) {
                    var row = startCell.ownerRow;
                    var firstPara = this.getFirstParagraph(row.childWidgets[0]);
                    var lastPara = this.getLastParagraph(row.childWidgets[row.childWidgets.length - 1]);
                    this.start.setPosition(firstPara.firstChild, true);
                    this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                }
                else {
                    var firstPara = this.getFirstParagraph(startCell.ownerRow.childWidgets[0]);
                    var lastPara = void 0;
                    lastPara = this.getLastParagraph(endCell.ownerRow.childWidgets[endCell.ownerRow.childWidgets.length - 1]);
                    this.start.setPosition(firstPara.firstChild, true);
                    this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                }
            }
        }
        this.selectPosition(this.start, this.end);
    };
    /**
     * Select single cell
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.selectTableCell = function () {
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        if (isNullOrUndefined(this.getTable(start, end))) {
            return;
        }
        if (this.isEmpty) {
            if (start.paragraph.isInsideTable && !isNullOrUndefined(start.paragraph.associatedCell)) {
                var firstPara = this.getFirstParagraph(start.paragraph.associatedCell);
                var lastPara = this.getLastParagraph(end.paragraph.associatedCell);
                if (firstPara === lastPara) {
                    this.start.setPosition(lastPara.firstChild, true);
                    this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                }
                else {
                    this.start.setPosition(firstPara.firstChild, true);
                    this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                }
            }
        }
        else {
            var containerCell = this.getContainerCell(start.paragraph.associatedCell);
            if (this.containsCell(containerCell, start.paragraph.associatedCell) && this.containsCell(containerCell, end.paragraph.associatedCell)) {
                var firstPara = this.getFirstParagraph(containerCell);
                var lastPara = this.getLastParagraph(containerCell);
                if (!isNullOrUndefined(firstPara) && !isNullOrUndefined(lastPara)) {
                    this.start.setPosition(firstPara.firstChild, true);
                    this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                }
            }
        }
        this.selectPosition(this.start, this.end);
    };
    /**
     * Selects the entire document.
     *
     * @returns {void}
     */
    Selection.prototype.selectAll = function () {
        var documentStart;
        var documentEnd;
        this.documentHelper.skipScrollToPosition = true;
        var container = this.getContainerWidget(this.start.paragraph);
        if (this.owner.enableHeaderAndFooter) {
            var headerFooter = this.getContainerWidget(this.start.paragraph);
            documentStart = this.setPositionForBlock(headerFooter.firstChild, true);
            documentEnd = this.setPositionForBlock(headerFooter.lastChild, false);
        }
        else if (this.isInShape) {
            var textFrame = this.getCurrentTextFrame();
            documentStart = this.setPositionForBlock(textFrame.firstChild, true);
            documentEnd = this.setPositionForBlock(textFrame.lastChild, false);
        }
        else if (container instanceof FootNoteWidget && container.footNoteType === 'Footnote') {
            var i = void 0;
            var j = void 0;
            var pageLength = this.documentHelper.pages.length;
            for (i = 0; i <= pageLength - 1; i++) {
                if (isNullOrUndefined(this.documentHelper.pages[i].footnoteWidget)) {
                    continue;
                }
                else {
                    documentStart = this.setPositionForBlock(this.documentHelper.pages[i].footnoteWidget.bodyWidgets[0].firstChild, true);
                    break;
                }
            }
            for (j = pageLength - 1; j >= 0; j--) {
                if (isNullOrUndefined(this.documentHelper.pages[j].footnoteWidget)) {
                    continue;
                }
                else {
                    var child = this.documentHelper.pages[j].footnoteWidget.bodyWidgets.length;
                    var lastChild = this.documentHelper.pages[j].footnoteWidget.bodyWidgets[child - 1].childWidgets.length;
                    documentEnd = this.setPositionForBlock(this.documentHelper.pages[j].footnoteWidget.bodyWidgets[child - 1].childWidgets[lastChild - 1], false);
                    break;
                }
            }
        }
        else if (container instanceof FootNoteWidget && container.footNoteType === 'Endnote') {
            var endNotes = this.getContainerWidget(this.start.paragraph);
            documentStart = this.setPositionForBlock(endNotes.bodyWidgets[0].firstChild, true);
            documentEnd = this.setPositionForBlock(endNotes.bodyWidgets[endNotes.bodyWidgets.length - 1].firstChild, false);
        }
        else {
            documentStart = this.owner.documentStart;
            documentEnd = this.owner.documentEnd;
        }
        //Selects the entire document.
        if (!isNullOrUndefined(documentStart)) {
            this.start.setPositionInternal(documentStart);
            this.end.setPositionParagraph(documentEnd.currentWidget, documentEnd.offset + 1);
            this.upDownSelectionLength = this.end.location.x;
            this.fireSelectionChanged(true);
        }
    };
    /**
     * Extends the selection backward.
     *
     * @returns {void}
     */
    Selection.prototype.extendBackward = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
        if (isForward) {
            this.end.moveForward();
        }
        else {
            this.end.moveBackward();
        }
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Extends the selection forward.
     *
     * @returns {void}
     */
    Selection.prototype.extendForward = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        var isForward = this.isForward ? this.start.isCurrentParaBidi : this.end.isCurrentParaBidi;
        if (isForward) {
            this.end.moveBackward();
        }
        else {
            this.end.moveForward();
        }
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Extend selection to word start and end
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.extendToWordStartEnd = function () {
        if ((this.start.paragraph.isInsideTable || this.end.paragraph.isInsideTable)
            && (this.start.paragraph.associatedCell !== this.end.paragraph.associatedCell
                || this.isCellSelected(this.start.paragraph.associatedCell, this.start, this.end))) {
            return true;
        }
        return false;
    };
    /**
     * Extends the selection to word start.
     *
     * @returns {void}
     */
    Selection.prototype.extendToWordStart = function () {
        this.extendToWordStartInternal(false);
    };
    /**
     * Extends the selection to word end.
     *
     * @returns {void}
     */
    Selection.prototype.extendToWordEnd = function () {
        this.extendToWordEndInternal(false);
    };
    /**
     * Extends selection to word start
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.extendToWordStartInternal = function (isNavigation) {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        var isCellSelected = this.extendToWordStartEnd();
        if (isCellSelected) {
            this.end.moveToPreviousParagraphInTable(this);
        }
        else {
            if (isNavigation && this.end.isCurrentParaBidi) {
                this.end.moveToWordEndInternal(isNavigation ? 0 : 1, false);
            }
            else {
                this.end.moveToWordStartInternal(isNavigation ? 0 : 1);
            }
        }
        if (isNavigation) {
            this.start.setPositionInternal(this.end);
        }
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Extends the selection to word end.
     *
     * @returns {void}
     */
    Selection.prototype.extendToWordEndInternal = function (isNavigation) {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        var isCellSelect = this.extendToWordStartEnd();
        if (isCellSelect) {
            this.end.moveToNextParagraphInTable();
        }
        else {
            if (isNavigation && this.end.isCurrentParaBidi) {
                this.end.moveToWordStartInternal(isNavigation ? 0 : 1);
            }
            else {
                this.end.moveToWordEndInternal(isNavigation ? 0 : 1, false);
            }
        }
        if (isNavigation) {
            this.start.setPositionInternal(this.end);
        }
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Extends the selection to next line.
     *
     * @returns {void}
     */
    Selection.prototype.extendToNextLine = function () {
        if (isNullOrUndefined(this.start)) {
            return;
        }
        this.end.moveToNextLine(this.upDownSelectionLength);
        this.fireSelectionChanged(true);
    };
    //Selection Text get API
    //Selection add, Highlight, remove API enda
    Selection.prototype.getTextPosition = function (hierarchicalIndex) {
        var textPosition = new TextPosition(this.owner);
        textPosition.setPositionForCurrentIndex(hierarchicalIndex);
        return textPosition;
    };
    /**
     * Get Selected text
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.getText = function (includeObject) {
        if (isNullOrUndefined(this.start) || isNullOrUndefined(this.end)
            || isNullOrUndefined(this.start.paragraph) || isNullOrUndefined(this.end.paragraph)) {
            return undefined;
        }
        var startPosition = this.start;
        var endPosition = this.end;
        if (startPosition.isAtSamePosition(endPosition)) {
            return '';
        }
        return this.getTextInternal(startPosition, endPosition, includeObject);
    };
    /**
     * Get selected text
     *
     * @private
     * @returns {string}
     */
    Selection.prototype.getTextInternal = function (start, end, includeObject) {
        if (start.isExistAfter(end)) {
            var temp = end;
            end = start;
            start = temp;
        }
        var startPosition = start;
        var endPosition = end;
        if (!isNullOrUndefined(start) && !isNullOrUndefined(end) && !isNullOrUndefined(start.paragraph) && !isNullOrUndefined(end.paragraph)) {
            var startIndex = 0;
            var endIndex = 0;
            var startOffset = start.offset;
            var endOffset = end.offset;
            var startInlineObj = start.currentWidget.getInline(startOffset, startIndex);
            startIndex = startInlineObj.index;
            var inline = startInlineObj.element;
            // If the start position is at the beginning of field begin that has field end, then field code should be skipped.
            if (inline instanceof FieldElementBox && !isNullOrUndefined(inline.fieldEnd)) {
                var elementInfo = this.getRenderedInline(inline, startIndex);
                inline = elementInfo.element;
                startIndex = elementInfo.index;
            }
            var endInlineObj = end.currentWidget.getInline(endOffset, endIndex);
            var endInline = endInlineObj.element;
            endIndex = endInlineObj.index;
            var text = '';
            // Retrieves the text from start inline.
            if (inline instanceof ImageElementBox && includeObject && startIndex === 0) {
                text = ElementBox.objectCharacter;
            }
            else if (inline instanceof TextElementBox) {
                text = ((isNullOrUndefined(inline.text)) || (inline.text) === '') || inline.text.length < startIndex ? text : inline.text.substring(startIndex);
            }
            if (startPosition.paragraph === endPosition.paragraph) {
                if (inline instanceof ElementBox) {
                    if (inline === endInline && inline instanceof TextElementBox) {
                        text = text.length < endIndex - startIndex ? text : text.substring(0, endIndex - startIndex);
                    }
                    else if (inline.nextNode instanceof ElementBox) {
                        text = text + this.getTextInline(inline.nextNode, endPosition.paragraph, endInline, endIndex, includeObject);
                    }
                }
            }
            else {
                if (inline instanceof ElementBox && inline.nextNode instanceof ElementBox) {
                    text = text + this.getTextInline(inline.nextNode, endPosition.paragraph, endInline, endIndex, includeObject);
                }
                else {
                    var nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(startPosition.paragraph);
                    text = text + '\r';
                    while (!isNullOrUndefined(nextParagraphWidget) && nextParagraphWidget.isEmpty()) {
                        text = text + '\r';
                        if (nextParagraphWidget === endPosition.paragraph) {
                            return text;
                        }
                        nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(nextParagraphWidget);
                    }
                    if (!isNullOrUndefined(nextParagraphWidget) && !nextParagraphWidget.isEmpty()) {
                        text = text + this.getTextInline(nextParagraphWidget.childWidgets[0].children[0], endPosition.paragraph, endInline, endIndex, includeObject);
                    }
                }
            }
            // If the selection includes end paragraph mark.
            if (endOffset === (endPosition.currentWidget).getEndOffset() + 1) {
                text = text + '\r';
            }
            return text;
        }
        return undefined;
    };
    /**
     * @private
     * @param block
     * @param offset
     * @returns {string}
     */
    Selection.prototype.getHierarchicalIndex = function (block, offset) {
        var index;
        if (block) {
            if (block instanceof HeaderFooterWidget) {
                var hfString = block.headerFooterType.indexOf('Header') !== -1 ? 'H' : 'F';
                var pageIndex = block.page.index.toString();
                // let headerFooterIndex: string = (this.viewer as PageLayoutViewer).getHeaderFooter(block.headerFooterType).toString();
                var sectionIndex = block.page.sectionIndex;
                index = sectionIndex + ';' + hfString + ';' + pageIndex + ';' + offset;
            }
            else {
                if (block instanceof BodyWidget && !isNullOrUndefined(block.containerWidget) && block.containerWidget instanceof FootNoteWidget) {
                    var ind = block.containerWidget.bodyWidgets.indexOf(block);
                    index = ind + ';' + offset;
                }
                else {
                    // if (block instanceof BodyWidget && block.sectionFormat.columns.length > 1) {
                    //         index = block.indexInOwner + ';' + offset;
                    // }
                    // else {
                    index = block.index + ';' + offset;
                    // }
                }
            }
            if (block instanceof TextFrame) {
                var indexInOwner = block.containerShape.line.getOffset(block.containerShape, 1);
                index = 'S' + ';' + indexInOwner + ';' + offset;
                return this.getHierarchicalIndex(block.containerShape.paragraph, index);
            }
            if (block instanceof FootNoteWidget) {
                // index = block.index + ';' + index;
                //block = block.containerWidget;
                var hfString = block.footNoteType === 'Footnote' ? 'FN' : 'EN';
                var pageIndex = block.page.index.toString();
                // let headerFooterIndex: string = (this.viewer as PageLayoutViewer).getHeaderFooter(block.headerFooterType).toString();
                var sectionIndex = block.page.sectionIndex;
                index = sectionIndex + ';' + hfString + ';' + pageIndex + ';' + offset;
            }
            if (block.containerWidget) {
                if (block instanceof TableCellWidget && block.rowIndex !== block.containerWidget.index) {
                    index = block.rowIndex + ';' + index;
                    block = block.containerWidget;
                }
                return this.getHierarchicalIndex(block.containerWidget, index);
            }
        }
        return index;
    };
    /**
     * @private
     * @returns {string}
     */
    Selection.prototype.getHierarchicalIndexByPosition = function (position) {
        var info = this.getParagraphInfo(position);
        return this.getHierarchicalIndex(info.paragraph, info.offset.toString());
    };
    /**
     * @private
     * @returns {TextPosition}
     */
    Selection.prototype.getTextPosBasedOnLogicalIndex = function (hierarchicalIndex) {
        var textPosition = new TextPosition(this.owner);
        var blockInfo = this.getParagraph({ index: hierarchicalIndex });
        var lineInfo = this.getLineInfoBasedOnParagraph(blockInfo.paragraph, blockInfo.offset);
        textPosition.setPositionForLineWidget(lineInfo.line, lineInfo.offset);
        return textPosition;
    };
    /**
     * Get offset value to update in selection
     *
     * @private
     * @returns {LineInfo}
     */
    Selection.prototype.getLineInfoBasedOnParagraph = function (paragraph, offset) {
        var position = undefined;
        var element = undefined;
        var length = this.getParagraphLength(paragraph);
        var next = paragraph.nextSplitWidget;
        if (offset > length + 1 && isNullOrUndefined(next)) {
            offset = length;
        }
        while (offset > length && next instanceof ParagraphWidget) {
            offset -= length;
            paragraph = next;
            length = this.getParagraphLength(paragraph);
            next = paragraph.nextSplitWidget;
        }
        return this.getLineInfo(paragraph, offset);
    };
    /**
     * @private
     * @returns {ParagraphInfo}
     */
    Selection.prototype.getParagraph = function (position) {
        var paragraph = this.getParagraphInternal(this.getBodyWidget(position), position);
        return { paragraph: paragraph, offset: parseInt(position.index, 10) };
    };
    /**
     * Gets body widget based on position.
     *
     * @private
     * @returns {BlockContainer}
     */
    Selection.prototype.getBodyWidget = function (position) {
        var index = position.index.indexOf(';');
        var value = position.index.substring(0, index);
        position.index = position.index.substring(index).replace(';', '');
        var sectionIndex = parseInt(value, 10);
        index = parseInt(value, 10);
        index = position.index.indexOf(';');
        value = position.index.substring(0, index);
        // position = position.substring(index).replace(';', '');
        if (value === 'H' || value === 'F') {
            return this.getHeaderFooterWidget(position);
        }
        else if (value === 'FN' || value === 'EN') {
            return this.getFootNoteWidget(position);
        }
        index = parseInt(value, 10);
        return this.getBodyWidgetInternal(sectionIndex, index);
    };
    Selection.prototype.getFootNoteWidget = function (position) {
        var index1 = position.index.indexOf(';');
        var value1 = position.index.substring(0, index1);
        position.index = position.index.substring(index1).replace(';', '');
        var footNote = value1 === 'FN';
        index1 = position.index.indexOf(';');
        value1 = position.index.substring(0, index1);
        position.index = position.index.substring(index1).replace(';', '');
        index1 = parseInt(value1, 10);
        var page = this.documentHelper.pages[index1];
        index1 = position.index.indexOf(';');
        value1 = position.index.substring(0, index1);
        position.index = position.index.substring(index1).replace(';', '');
        index1 = parseInt(value1, 10);
        if (footNote) {
            return page.footnoteWidget.bodyWidgets[index1];
        }
        else {
            return page.endnoteWidget.bodyWidgets[index1];
        }
    };
    Selection.prototype.getHeaderFooterWidget = function (position) {
        //HEADER OR FOOTER WIDGET
        var index = position.index.indexOf(';');
        var value = position.index.substring(0, index);
        position.index = position.index.substring(index).replace(';', '');
        var isHeader = value === 'H';
        index = position.index.indexOf(';');
        value = position.index.substring(0, index);
        position.index = position.index.substring(index).replace(';', '');
        index = parseInt(value, 10);
        var page = this.documentHelper.pages[index];
        var headerFooterWidget;
        if (isHeader) {
            headerFooterWidget = page.headerWidget;
        }
        else {
            headerFooterWidget = page.footerWidget;
        }
        if (!isNullOrUndefined(headerFooterWidget)) {
            headerFooterWidget.page = page;
        }
        return headerFooterWidget;
    };
    /**
     * @private
     * @returns {BodyWidget}
     */
    Selection.prototype.getBodyWidgetInternal = function (sectionIndex, blockIndex) {
        for (var i = 0; i < this.documentHelper.pages.length; i++) {
            for (var j = 0; j < this.documentHelper.pages[i].bodyWidgets.length; j++) {
                var bodyWidget = this.documentHelper.pages[i].bodyWidgets[j];
                if (bodyWidget.index === sectionIndex) {
                    if (bodyWidget.childWidgets.length > 0 && bodyWidget.firstChild.index <= blockIndex &&
                        bodyWidget.lastChild.index >= blockIndex) {
                        return bodyWidget;
                    }
                }
                if (bodyWidget.index > sectionIndex) {
                    break;
                }
            }
        }
        return undefined;
    };
    Selection.prototype.getParagraphInternal = function (container, position, cellIndex) {
        if (isNullOrUndefined(position.index)) {
            return undefined;
        }
        if (container instanceof TableRowWidget && isNullOrUndefined(cellIndex)) {
            cellIndex = position.index;
        }
        // let ins: Widget = container;
        var index = position.index.indexOf(';');
        var value = '0';
        if (index >= 0) {
            value = position.index.substring(0, index);
            position.index = position.index.substring(index).replace(';', '');
        }
        // if (container instanceof BodyWidget && value === 'HF') {
        //     return this.getParagraph(container.headerFooters, position);
        // }
        index = parseInt(value, 10);
        if (container instanceof TableRowWidget && index >= container.childWidgets.length) {
            position.index = '0;0';
            index = container.childWidgets.length - 1;
        }
        var childWidget = this.getBlockByIndex(container, index, position);
        if (!isNullOrUndefined(cellIndex) && isNullOrUndefined(childWidget) && container instanceof TableCellWidget && container.containerWidget && isNullOrUndefined(container.getSplitWidgets().pop().nextRenderedWidget)) {
            index = cellIndex.indexOf(';');
            index = parseInt(cellIndex.substring(0, index), 10) - 1;
            position.index = cellIndex.substring(cellIndex.indexOf(';')).replace(';', '');
            if (index >= 0) {
                childWidget = this.getBlockByIndex(container.containerWidget, index);
            }
            cellIndex = undefined;
        }
        if (childWidget) {
            value = position.index.substring(0, 1);
            if (value === 'S') {
                position.index = position.index.substring(1).replace(';', '');
                var indexInOwner = position.index.substring(0, position.index.indexOf(';'));
                position.index = position.index.substring(position.index.indexOf(';')).replace(';', '');
                var paraIndex = position.index.substring(0, position.index.indexOf(';'));
                position.index = position.index.substring(position.index.indexOf(';')).replace(';', '');
                var shape = childWidget.getInline(parseInt(indexInOwner), 0).element;
                childWidget = shape.textFrame.childWidgets[paraIndex];
            }
            var child = childWidget;
            if (child instanceof ParagraphWidget) {
                if (position.index.indexOf(';') > 0) {
                    position.index = '0';
                }
                return child;
            }
            if (child instanceof Widget) {
                if (position.index.indexOf(';') > 0) {
                    return this.getParagraphInternal(child, position, cellIndex);
                }
                else {
                    //If table is shifted to previous text position then return the first paragraph within table.
                    if (child instanceof TableWidget) {
                        return this.documentHelper.getFirstParagraphInFirstCell(child);
                    }
                    return undefined;
                }
            }
        }
        else if (container) {
            var nextWidget = container.getSplitWidgets().pop().nextRenderedWidget;
            if (nextWidget instanceof Widget) {
                position.index = '0';
                if (nextWidget instanceof TableWidget) {
                    return this.documentHelper.getFirstParagraphInFirstCell(nextWidget);
                }
                return nextWidget;
            }
        }
        return undefined;
    };
    /**
     * @private
     * @returns {Widget}
     */
    Selection.prototype.getBlockByIndex = function (container, blockIndex, position) {
        var childWidget;
        if (container) {
            for (var j = 0; j < container.childWidgets.length; j++) {
                if (container.childWidgets[j].index === blockIndex) {
                    childWidget = container.childWidgets[j];
                    break;
                }
            }
            // If the row contains a vertically merged cell and the cell count differs between the current row and the split row. So, we have added the following code to update the split cell widget for selection.
            if (!isNullOrUndefined(childWidget) && childWidget instanceof TableRowWidget && childWidget.nextSplitWidget && this.documentHelper.layout.isVerticalMergedCellContinue(childWidget)) {
                var positionIndex = position.index;
                var index = positionIndex.indexOf(';');
                var cellIndexValue = positionIndex.substring(0, index);
                positionIndex = positionIndex.substring(index).replace(';', '');
                var currentCell = this.getBlockByIndex(childWidget, parseInt(cellIndexValue, 10));
                index = positionIndex.indexOf(';');
                var blockIndexValue = positionIndex.substring(0, index);
                if (currentCell && currentCell instanceof TableCellWidget && currentCell.childWidgets.length > 0 && currentCell.lastChild.index < parseInt(blockIndexValue, 10)) {
                    var prevCell = this.getBlockByIndex(childWidget, parseInt(cellIndexValue, 10) - 1);
                    if (prevCell && prevCell instanceof TableCellWidget && prevCell.childWidgets.length > 0 && prevCell.lastChild.index < parseInt(blockIndexValue, 10)) {
                        return this.getBlockByIndex(container.nextSplitWidget, blockIndex, position);
                    }
                }
            }
            if (!childWidget && !(container instanceof HeaderFooterWidget)) {
                return this.getBlockByIndex(container.nextSplitWidget, blockIndex, position);
            }
        }
        return childWidget;
    };
    /**
     * Get logical offset of paragraph.
     *
     * @private
     * @returns {ParagraphInfo}
     */
    Selection.prototype.getParagraphInfo = function (position) {
        return this.getParagraphInfoInternal(position.currentWidget, position.offset);
    };
    /**
     * Get the start or end cell from current selection
     *
     * @private
     * @returns {TableCellWidget}
     */
    Selection.prototype.getCellFromSelection = function (type) {
        var cell;
        var selectedCells = this.getSelectedCells();
        if (this.hasMergedCells()) {
            return undefined;
        }
        if (type == 0 && selectedCells.length > 0) {
            if (!(this.selectedWidgets.keys[0] instanceof TableCellWidget)) {
                return undefined;
            }
            cell = selectedCells[0];
            var rowIndex = cell.rowIndex;
            var colIndex = cell.columnIndex;
            var tableIndex = cell.ownerTable.index;
            for (var i = 0; i < selectedCells.length; i++) {
                var widget = selectedCells[i];
                if (widget.rowIndex < rowIndex) {
                    rowIndex = widget.rowIndex;
                }
                if (widget.columnIndex < colIndex) {
                    colIndex = widget.columnIndex;
                }
                if (widget.ownerTable.index < tableIndex) {
                    tableIndex = widget.ownerTable.index;
                }
            }
            for (var i = 0; i < selectedCells.length; i++) {
                var widget = selectedCells[i];
                if (rowIndex == widget.rowIndex && colIndex == widget.columnIndex && tableIndex == widget.ownerTable.index) {
                    cell = widget;
                }
            }
        }
        else if (type == 1 && selectedCells.length > 0) {
            if (!(this.selectedWidgets.keys[this.selectedWidgets.length - 1] instanceof TableCellWidget)) {
                return undefined;
            }
            cell = selectedCells[selectedCells.length - 1];
            var rowIndex = cell.rowIndex;
            var colIndex = cell.columnIndex;
            var tableIndex = cell.ownerTable.index;
            for (var i = selectedCells.length - 1; i >= 0; i--) {
                var widget = selectedCells[i];
                if (widget.rowIndex > rowIndex) {
                    rowIndex = widget.rowIndex;
                }
                if (widget.columnIndex > colIndex) {
                    colIndex = widget.columnIndex;
                }
                if (widget.ownerTable.index > tableIndex) {
                    tableIndex = widget.ownerTable.index;
                }
            }
            for (var i = 0; i < selectedCells.length; i++) {
                var widget = selectedCells[i];
                if (rowIndex == widget.rowIndex && colIndex == widget.columnIndex && tableIndex == widget.ownerTable.index) {
                    cell = widget;
                }
            }
        }
        return (cell instanceof TableCellWidget) ? cell : undefined;
    };
    /**
     * Get the start cell or end cell in table with merged cells from current selection.
     *
     * @private
     * @returns {TableCellWidget}
     */
    Selection.prototype.getCellFromSelectionInTable = function (type) {
        var cell;
        var selectedCells = this.getSelectedCells();
        var bounds = this.getCellBoundsInfo();
        var sortedRowIndexArray = [];
        var sortedColumnIndexArray = [];
        for (var i = 0; i < selectedCells.length; i++) {
            var widget = selectedCells[i];
            sortedRowIndexArray.push(widget.rowIndex);
            sortedColumnIndexArray.push(widget.columnIndex);
        }
        sortedRowIndexArray.sort();
        sortedColumnIndexArray.sort();
        var requiredRow;
        var requiredCol;
        if (type == 1) {
            requiredRow = bounds.row.rowLast;
            requiredCol = bounds.column.colLast;
            var isRequiredCellExist = false;
            while (!isRequiredCellExist && isNullOrUndefined(cell)) {
                for (var i = 0; i < selectedCells.length; i++) {
                    var widget_1 = selectedCells[i];
                    if (widget_1.rowIndex == requiredRow && widget_1.columnIndex == requiredCol) {
                        isRequiredCellExist = true;
                        cell = widget_1;
                        break;
                    }
                }
                if (!isRequiredCellExist) {
                    requiredRow -= 1;
                }
            }
        }
        else if (type == 0) {
            requiredRow = bounds.row.rowFirst;
            requiredCol = bounds.column.colFirst;
            var isRequiredCellExist = false;
            while (!isRequiredCellExist && isNullOrUndefined(cell)) {
                for (var i = 0; i < selectedCells.length; i++) {
                    var widget_2 = selectedCells[i];
                    if (widget_2.rowIndex == requiredRow && widget_2.columnIndex == requiredCol) {
                        isRequiredCellExist = true;
                        cell = widget_2;
                        break;
                    }
                }
                if (!isRequiredCellExist) {
                    requiredCol += 1;
                }
            }
        }
        return cell;
    };
    /**
     * Get the actual offset from the current selection.
     *
     * @private
     * @returns {string}
     */
    Selection.prototype.getActualOffset = function (cell, type) {
        var offset;
        if (type == 0) {
            var paraElement = this.getFirstParagraph(cell);
            offset = this.getHierarchicalIndex(paraElement, this.getStartOffset(paraElement).toString());
        }
        else if (type == 1) {
            var paraElement = this.getLastParagraph(cell);
            var lastLine = paraElement.lastChild;
            var length_1 = this.getParagraphLength(paraElement, lastLine) + this.getLineLength(lastLine) + 1;
            offset = this.getHierarchicalIndex(paraElement, length_1.toString());
        }
        return offset;
    };
    /**
     * Get the properties for Bookmark.
     *
     * @private
     * @returns {object}
     */
    Selection.prototype.getBookmarkProperties = function (bookmark) {
        var selectedWidgets = this.selectedWidgets.keys;
        if (bookmark.bookmarkType == 0) {
            if (!(selectedWidgets[0] instanceof TableCellWidget)) {
                return undefined;
            }
            var bounds = this.getCellBoundsInfo();
            if (!isNullOrUndefined(bounds)) {
                return {
                    'columnFirst': bounds.column.colFirst.toString(),
                    'columnLast': bounds.column.colLast.toString()
                };
            }
        }
        if (bookmark.bookmarkType == 1) {
            if (selectedWidgets[selectedWidgets.length - 1] instanceof TableCellWidget) {
                return undefined;
            }
            var properties = {};
            // isAfterParagraphMark
            // In Ms Word, If the paragraph mark is selected and the bookmark end is inside the table, then the bookmark end is considered to be after the paragraph mark.
            if (this.isParagraphMarkSelected() && this.end.paragraph.isInsideTable) {
                properties.isAfterParagraphMark = true;
            }
            // isAfterCellMark
            var bookmarkStart = bookmark.reference;
            var selectedCells = this.getSelectedCells();
            if (bookmarkStart && !isNullOrUndefined(bookmarkStart.properties)) {
                if (selectedCells.length == 1) {
                    if (this.isCellSelected(selectedCells[0], this.start, this.end)) {
                        properties.isAfterCellMark = true;
                        delete properties.isAfterParagraphMark;
                    }
                }
            }
            // isAfterTableMark
            if (this.isTableSelected()) {
                properties.isAfterTableMark = true;
            }
            // isAfterRowMark
            if (this.isRowSelected()) {
                properties.isAfterRowMark = true;
            }
            if (!isNullOrUndefined(properties.isAfterParagraphMark) || !isNullOrUndefined(properties.isAfterCellMark)) {
                return properties;
            }
        }
        return undefined;
    };
    /**
     * Returns true if Paragraph Mark is selected.
     *
     * @private
     * @returns {boolean}
     */
    Selection.prototype.isParagraphMarkSelected = function () {
        var end = this.isForward ? this.end : this.start;
        var line = end.currentWidget;
        var paraElement;
        if (line instanceof LineWidget) {
            paraElement = line.paragraph;
        }
        var paraLength = this.getParagraphLength(paraElement);
        var endIndices = this.getHierarchicalIndexByPosition(end).split(';');
        var endIndex = parseInt(endIndices[endIndices.length - 1]);
        if (endIndex > paraLength) {
            return true;
        }
        return false;
    };
    /**
     * Returns true if Row is selected.
     *
     * @private
     * @returns {boolean}
     */
    Selection.prototype.isRowSelected = function () {
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        if (isNullOrUndefined(start.paragraph.associatedCell) ||
            isNullOrUndefined(end.paragraph.associatedCell)) {
            return false;
        }
        var row = end.paragraph.associatedCell.ownerRow.getSplitWidgets();
        var firstParagraph;
        var firstcell;
        if (row[0].childWidgets.length > 0) {
            firstcell = row[0].childWidgets[0];
            if (firstcell.childWidgets.length === 0) {
                return undefined;
            }
            firstParagraph = firstcell.childWidgets[0];
        }
        var lastParagraph;
        var lastRow = row[row.length - 1];
        var lastCell = lastRow.childWidgets[lastRow.childWidgets.length - 1];
        while (lastCell.childWidgets.length === 0 && !isNullOrUndefined(lastCell.previousSplitWidget)) {
            lastCell = lastCell.previousSplitWidget;
        }
        lastParagraph = lastCell.childWidgets[lastCell.childWidgets.length - 1];
        return firstcell.equals(firstParagraph.associatedCell) &&
            end.paragraph.associatedCell.equals(lastParagraph.associatedCell)
            && (!firstParagraph.associatedCell.equals(lastParagraph.associatedCell) || (start.offset === 0
                && end.offset === this.getLineLength(lastParagraph.lastChild) + 1));
    };
    /**
     * Get the bounds of row and col index from selected cells
     *
     * @private
     * @returns {object}
     */
    Selection.prototype.getCellBoundsInfo = function () {
        var selectedWidgets = this.getSelectedCells();
        if (selectedWidgets.length > 0) {
            var colFirst = selectedWidgets[0].columnIndex;
            var colLast = selectedWidgets[selectedWidgets.length - 1].columnIndex;
            var rowFirst = selectedWidgets[0].rowIndex;
            var rowLast = selectedWidgets[selectedWidgets.length - 1].rowIndex;
            for (var i = 0; i < selectedWidgets.length; i++) {
                var widget = selectedWidgets[i];
                if (widget.columnIndex < colFirst) {
                    colFirst = widget.columnIndex;
                }
                if (widget.columnIndex > colLast) {
                    colLast = widget.columnIndex;
                }
                if (widget.rowIndex < rowFirst) {
                    rowFirst = widget.rowIndex;
                }
                if (widget.rowIndex > rowLast) {
                    rowLast = widget.rowIndex;
                }
            }
            return { 'column': {
                    'colFirst': colFirst,
                    'colLast': colLast
                },
                'row': {
                    'rowFirst': rowFirst,
                    'rowLast': rowLast
                }
            };
        }
        return undefined;
    };
    /**
     * Return true if the selection has merged cells, else false.
     *
     * @private
     * @returns {boolean}
     */
    Selection.prototype.hasMergedCells = function () {
        var selectedCells = this.getSelectedCells();
        for (var i = 0; i < selectedCells.length; i++) {
            var widget = selectedCells[i];
            if (widget.cellFormat.rowSpan > 1 || widget.cellFormat.columnSpan > 1) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     * @returns {ParagraphInfo}
     */
    Selection.prototype.getParagraphInfoInternal = function (line, lineOffset) {
        var paragraph = line.paragraph;
        var offset = this.getParagraphLength(paragraph, line) + lineOffset;
        var previous = paragraph.previousSplitWidget;
        while (previous instanceof ParagraphWidget) {
            paragraph = previous;
            offset += this.documentHelper.selection.getParagraphLength(paragraph);
            previous = paragraph.previousSplitWidget;
        }
        return { 'paragraph': paragraph, 'offset': offset };
    };
    /**
     * @private
     * @returns {ListTextElementBox}
     */
    Selection.prototype.getListTextElementBox = function (paragarph) {
        if (isNullOrUndefined(paragarph)) {
            return undefined;
        }
        var listTextElement;
        if (!paragarph.isEmpty()) {
            var lineWidget = paragarph.childWidgets[0];
            if (lineWidget.children.length > 1) {
                if (lineWidget.children[0] instanceof ListTextElementBox) {
                    listTextElement = lineWidget.children[0];
                }
            }
        }
        return listTextElement;
    };
    /**
     * @private
     * @returns {WListLevel}
     */
    Selection.prototype.getListLevel = function (paragraph) {
        var currentList = undefined;
        var listLevelNumber = 0;
        if (!isNullOrUndefined(paragraph.paragraphFormat) && !isNullOrUndefined(paragraph.paragraphFormat.listFormat)) {
            currentList = this.documentHelper.getListById(paragraph.paragraphFormat.listFormat.listId);
            listLevelNumber = paragraph.paragraphFormat.listFormat.listLevelNumber;
        }
        if (!isNullOrUndefined(currentList) &&
            !isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId))
            // && !isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId).levels.getItem(listLevelNumber))) {
            && !isNullOrUndefined(this.documentHelper.getAbstractListById(currentList.abstractListId).levels)) {
            return this.documentHelper.layout.getListLevel(currentList, listLevelNumber);
        }
        return undefined;
    };
    Selection.prototype.getTextInline = function (inlineElement, endParagraphWidget, endInline, endIndex, includeObject) {
        var text = '';
        do {
            if (inlineElement === endInline) {
                if (inlineElement instanceof TextElementBox) {
                    var span = inlineElement;
                    if (!(isNullOrUndefined(span.text) || span.text === '')) {
                        if (span.text.length < endIndex) {
                            text = text + span.text;
                        }
                        else {
                            text = text + span.text.substring(0, endIndex);
                        }
                    }
                }
                else if (inlineElement instanceof ImageElementBox && includeObject && endIndex === inlineElement.length) {
                    text = text + ElementBox.objectCharacter;
                }
                return text;
            }
            if (inlineElement instanceof TextElementBox) {
                text = text + inlineElement.text;
            }
            else if (inlineElement instanceof ImageElementBox && includeObject) {
                text = text + ElementBox.objectCharacter;
            }
            else if (inlineElement instanceof FieldElementBox && !isNullOrUndefined(inlineElement.fieldEnd)) {
                if (!isNullOrUndefined(inlineElement.fieldSeparator)) {
                    inlineElement = inlineElement.fieldSeparator;
                }
                else {
                    inlineElement = inlineElement.fieldEnd;
                }
            }
            if (isNullOrUndefined(inlineElement.nextNode)) {
                break;
            }
            inlineElement = inlineElement.nextNode;
        } while (!isNullOrUndefined(inlineElement));
        if (endParagraphWidget === inlineElement.line.paragraph) {
            return text;
        }
        var nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(inlineElement.line.paragraph);
        while (!isNullOrUndefined(nextParagraphWidget) && nextParagraphWidget.isEmpty()) {
            text = text + '\r';
            if (nextParagraphWidget === endParagraphWidget) {
                return text;
            }
            nextParagraphWidget = this.documentHelper.selection.getNextParagraphBlock(nextParagraphWidget);
        }
        if (!isNullOrUndefined(nextParagraphWidget) && !nextParagraphWidget.isEmpty()) {
            var lineWidget = nextParagraphWidget.childWidgets[0];
            if (isNullOrUndefined(nextParagraphWidget.previousSplitWidget)) {
                text = text + '\r';
            }
            text = text + this.getTextInline(lineWidget.children[0], endParagraphWidget, endInline, endIndex, includeObject);
        }
        return text;
    };
    /**
     * Returns field code.
     *
     * @private
     * @param fieldBegin
     * @returns {string}
     */
    Selection.prototype.getFieldCode = function (fieldBegin, isSkipTrim) {
        var fieldCode = '';
        if (!isNullOrUndefined(fieldBegin) && !(fieldBegin.fieldEnd instanceof FieldElementBox)) {
            return fieldCode;
        }
        var paragraph = fieldBegin.paragraph;
        var endParagraph = fieldBegin.fieldEnd.paragraph;
        if (fieldBegin.fieldSeparator instanceof FieldElementBox) {
            endParagraph = fieldBegin.fieldSeparator.paragraph;
        }
        var startLineIndex = fieldBegin.line.indexInOwner;
        var startIndex = fieldBegin.indexInOwner;
        do {
            fieldCode += this.getFieldCodeInternal(paragraph, startLineIndex, startIndex);
            if (paragraph === endParagraph) {
                break;
            }
            paragraph = this.getNextParagraphBlock(paragraph);
            startLineIndex = 0;
            startIndex = 0;
        } while (paragraph instanceof ParagraphWidget);
        return isSkipTrim ? fieldCode : fieldCode.trim();
    };
    Selection.prototype.getFieldCodeInternal = function (paragraph, startLineIndex, inlineIndex) {
        var fieldCode = '';
        for (var i = startLineIndex; i < paragraph.childWidgets.length; i++) {
            var line = paragraph.childWidgets[i];
            for (var i_1 = inlineIndex; i_1 < line.children.length; i_1++) {
                var element = line.children[i_1];
                if (element instanceof TextElementBox) {
                    fieldCode += element.text;
                }
                if (element instanceof FieldElementBox
                    && (element.fieldType === 2 || element.fieldType === 1)) {
                    return fieldCode;
                }
            }
            inlineIndex = 0;
        }
        return fieldCode;
    };
    /**
     * @private
     * @returns {FieldElementBox}
     */
    Selection.prototype.getTocFieldInternal = function () {
        var paragraph = this.start.paragraph;
        if (!this.isEmpty && !this.isForward) {
            paragraph = this.end.paragraph;
        }
        while (paragraph instanceof ParagraphWidget && paragraph.childWidgets.length > 0) {
            var line = paragraph.firstChild;
            if (line.children.length > 0) {
                var element = line.children[0];
                var nextElement = element.nextNode;
                if (element instanceof FieldElementBox && element.fieldType === 0 && nextElement instanceof TextElementBox
                    && nextElement.text.trim().toLowerCase().indexOf('toc') === 0) {
                    return element;
                }
            }
            paragraph = paragraph.previousRenderedWidget;
        }
        return undefined;
    };
    /**
     * Get next paragraph in bodyWidget
     *
     * @private
     * @returns {ParagraphWidget}
     */
    Selection.prototype.getNextParagraph = function (section) {
        if (section.nextRenderedWidget instanceof BodyWidget) {
            var block = section.nextRenderedWidget.childWidgets[0];
            return this.documentHelper.getFirstParagraphBlock(block);
        }
        return undefined;
    };
    /**
     * @private
     * @returns {ParagraphWidget}
     */
    Selection.prototype.getPreviousParagraph = function (section) {
        if (section.previousRenderedWidget instanceof BodyWidget) {
            var bodyWidget = section.previousRenderedWidget;
            var block = bodyWidget.childWidgets[bodyWidget.childWidgets.length - 1];
            return this.documentHelper.getLastParagraphBlock(block);
        }
        return undefined;
    };
    /**
     * Get Next start inline
     *
     * @private
     * @returns {ElementBox}
     */
    Selection.prototype.getNextStartInline = function (line, offset) {
        var indexInInline = 0;
        var inlineObj = line.getInline(offset, indexInInline);
        var inline = inlineObj.element;
        indexInInline = inlineObj.index;
        if ((!isNullOrUndefined(inline) && indexInInline === inline.length && inline.nextNode instanceof FieldElementBox)
            || inline instanceof ShapeElementBox) {
            var nextValidInline = this.documentHelper.getNextValidElement(inline.nextNode);
            if (nextValidInline instanceof FieldElementBox && nextValidInline.fieldType === 0) {
                inline = nextValidInline;
            }
        }
        return inline;
    };
    /**
     * Get previous text inline
     *
     * @private
     * @returns {ElementBox}
     */
    Selection.prototype.getPreviousTextInline = function (inline) {
        if (inline.previousNode instanceof TextElementBox) {
            return inline.previousNode;
        }
        if (inline.previousNode instanceof FieldElementBox && HelperMethods.isLinkedFieldCharacter(inline.previousNode)) {
            if (inline.previousNode.fieldType === 0 || inline.previousNode.fieldType === 1) {
                return inline.previousNode;
            }
            return inline.previousNode.fieldBegin;
        }
        if (!isNullOrUndefined(inline.previousNode)) {
            return this.getPreviousTextInline((inline.previousNode));
        }
        return undefined;
    };
    /**
     * Get next text inline
     *
     * @private
     * @returns {ElementBox}
     */
    Selection.prototype.getNextTextInline = function (inline) {
        if (inline.nextNode instanceof TextElementBox) {
            return inline.nextNode;
        }
        if (inline.nextNode instanceof FieldElementBox && (HelperMethods.isLinkedFieldCharacter(inline.nextNode))) {
            if (inline.nextNode.fieldType === 1 || inline.nextNode.fieldType === 0) {
                return inline.nextNode;
            }
            return inline.nextNode.fieldEnd;
        }
        if (!isNullOrUndefined(inline.nextNode)) {
            return this.getNextTextInline((inline.nextNode));
        }
        return undefined;
    };
    /**
     * Get container table
     *
     * @private
     * @returns {TableWidget}
     */
    Selection.prototype.getContainerTable = function (block) {
        if (block.isInsideTable) {
            if (block.associatedCell.ownerTable.isInsideTable) {
                block = this.getContainerTable(block.associatedCell.ownerTable);
            }
            else {
                block = block.associatedCell.ownerTable;
            }
        }
        if (block instanceof TableWidget) {
            return block;
        }
        return undefined;
    };
    /**
     * @private
     * @param element
     * @returns
     */
    Selection.prototype.isElementInSelection = function (element, isEnd) {
        var offset = element.line.getOffset(element, isEnd ? 0 : 1);
        var elemPosition = new TextPosition(this.owner);
        elemPosition.setPositionParagraph(element.line, offset);
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        return ((elemPosition.isExistAfter(start) || elemPosition.isAtSamePosition(start))
            && (elemPosition.isExistBefore(end) || elemPosition.isAtSamePosition(end)));
    };
    /**
     * @private
     */
    Selection.prototype.isSelectionInsideElement = function (element) {
        //Handled for spellcheck
        if (this.isEmpty) {
            var startOffset = element.line.getOffset(element, 0);
            var startPosition = new TextPosition(this.owner);
            startPosition.setPositionParagraph(element.line, startOffset);
            var endOffset = element.line.getOffset(element, element.length);
            var endPosition = new TextPosition(this.owner);
            endPosition.setPositionParagraph(element.line, endOffset);
            return ((this.start.isExistAfter(startPosition) || this.start.isAtSamePosition(startPosition))
                && (this.start.isExistBefore(endPosition) || this.start.isAtSamePosition(endPosition)));
        }
        return false;
    };
    /**
     * @private
     * @returns {boolean}
     */
    Selection.prototype.isExistBefore = function (start, block) {
        if (start.isInsideTable) {
            var cell1 = start.associatedCell;
            if (block.isInsideTable) {
                var cell2 = block.associatedCell;
                if (cell1 === cell2) {
                    return cell1.childWidgets.indexOf(start) < cell1.childWidgets.indexOf(block);
                }
                if (cell1.ownerRow === cell2.ownerRow) {
                    return cell1.cellIndex < cell2.cellIndex;
                }
                if (cell1.ownerTable === cell2.ownerTable) {
                    return cell1.ownerRow.rowIndex < cell2.ownerRow.rowIndex;
                }
                //Checks if current block exists before the block.
                var containerCell = this.getContainerCellOf(cell1, cell2);
                if (containerCell.ownerTable.contains(cell2)) {
                    cell1 = this.getSelectedCell(cell1, containerCell);
                    cell2 = this.getSelectedCell(cell2, containerCell);
                    if (cell1 === containerCell) {
                        return this.isExistBefore(start, cell2.ownerTable);
                    }
                    if (cell2 === containerCell) {
                        return this.isExistBefore(cell1.ownerTable, block);
                    }
                    if (containerCell.ownerRow === cell2.ownerRow) {
                        return containerCell.cellIndex < cell2.cellIndex;
                    }
                    if (containerCell.ownerTable === cell2.ownerTable) {
                        return containerCell.ownerRow.rowIndex < cell2.ownerRow.rowIndex;
                    }
                    return this.isExistBefore(cell1.ownerTable, cell2.ownerTable);
                }
                return this.isExistBefore(containerCell.ownerTable, this.getContainerTable(cell2.ownerTable));
            }
            else {
                var ownerTable = this.getContainerTable(start);
                return this.isExistBefore(ownerTable, block);
            }
        }
        else if (block.isInsideTable) {
            var ownerTable = this.getContainerTable(block);
            return this.isExistBefore(start, ownerTable);
        }
        else {
            {
                if (start.containerWidget === block.containerWidget) {
                    return start.index <
                        block.index;
                }
                if ((start.containerWidget instanceof BodyWidget && block.containerWidget instanceof BodyWidget)) {
                    //Splitted blocks
                    var startPage = this.documentHelper.pages.indexOf(start.containerWidget.page);
                    var endPage = this.documentHelper.pages.indexOf(block.containerWidget.page);
                    if (startPage === endPage) {
                        return start.containerWidget.indexInOwner < block.containerWidget.indexInOwner;
                    }
                    if (startPage === endPage && start.containerWidget.containerWidget instanceof FootNoteWidget && block.containerWidget.containerWidget instanceof FootNoteWidget) {
                        var startindex = this.documentHelper.pages[startPage].footnoteWidget.bodyWidgets.indexOf(start.containerWidget);
                        var endindex = this.documentHelper.pages[endPage].footnoteWidget.bodyWidgets.indexOf(block.containerWidget);
                        return startindex < endindex;
                    }
                    else if (startPage === endPage && start.containerWidget.index !== block.containerWidget.index) {
                        var startindex = this.documentHelper.pages[startPage].bodyWidgets.indexOf(start.containerWidget);
                        var endindex = this.documentHelper.pages[endPage].bodyWidgets.indexOf(block.containerWidget);
                        return startindex < endindex;
                    }
                    else {
                        return startPage < endPage;
                    }
                }
            }
        }
        return false;
    };
    /**
     * @private
     * @returns {boolean}
     */
    Selection.prototype.isExistAfter = function (start, block) {
        if (start.isInsideTable) {
            var cell1 = start.associatedCell;
            //Current paragraph in cell, paragraph in cell
            if (block.isInsideTable) {
                var cell2 = block.associatedCell;
                if (cell1 === cell2) {
                    return cell1.childWidgets.indexOf(start) > cell1.childWidgets.indexOf(block);
                }
                if (cell1.ownerRow === cell2.ownerRow) {
                    return cell1.cellIndex > cell2.cellIndex;
                }
                if (cell1.ownerTable === cell2.ownerTable) {
                    return cell1.ownerRow.rowIndex > cell2.ownerRow.rowIndex;
                }
                //Checks if this block exists before block.
                var containerCell = this.getContainerCellOf(cell1, cell2);
                if (containerCell.ownerTable.contains(cell2)) {
                    cell1 = this.getSelectedCell(cell1, containerCell);
                    cell2 = this.getSelectedCell(cell2, containerCell);
                    if (cell1 === containerCell) {
                        return this.isExistAfter(start, cell2.ownerTable);
                    }
                    if (cell2 === containerCell) {
                        return this.isExistAfter(cell1.ownerTable, block);
                    }
                    if (containerCell.ownerRow === cell2.ownerRow) {
                        return containerCell.cellIndex > cell2.cellIndex;
                    }
                    if (containerCell.ownerTable === cell2.ownerTable) {
                        return containerCell.ownerRow.rowIndex > cell2.ownerRow.rowIndex;
                    }
                    return this.isExistAfter(cell1.ownerTable, cell2.ownerTable);
                }
                return this.isExistAfter(containerCell.ownerTable, this.getContainerTable(cell2.ownerTable));
            }
            else {
                var ownerTable = this.getContainerTable(start);
                return this.isExistAfter(ownerTable, block);
            }
        }
        else if (block.isInsideTable) {
            var ownerTable = this.getContainerTable(block);
            return this.isExistAfter(start, ownerTable);
        }
        else {
            if (start.containerWidget === block.containerWidget) {
                return start.index >
                    block.index;
            }
            if ((start.containerWidget instanceof BodyWidget && block.containerWidget instanceof BodyWidget) || (start.containerWidget instanceof FootNoteWidget && block.containerWidget instanceof FootNoteWidget)) {
                //Splitted blocks
                var startPage = this.documentHelper.pages.indexOf(start.containerWidget.page);
                var endPage = this.documentHelper.pages.indexOf(block.containerWidget.page);
                return startPage > endPage;
            }
            //     if (start.owner instanceof WHeaderFooter) {
            //         return (start.owner as WHeaderFooter).childWidgets.indexOf(start)
            // > (block.owner as WHeaderFooter).childWidgets.indexOf(block);
            //     } else if (start.section === block.section && start.section instanceof WSection) {
            //         return (start.section as WSection).childWidgets.indexOf(start)
            //  > (start.section as WSection).childWidgets.indexOf(block);
            //     } else if (start.wordDocument instanceof WordDocument) {
            //         return (start.wordDocument as WordDocument).sections.indexOf(start.section as WSection) > (start.wordDocument as WordDocument).sections.indexOf(block.section as WSection);
        }
        return false;
    };
    /**
     * Return true if current inline in exist before inline
     *
     * @private
     * @returns {boolean}
     */
    Selection.prototype.isExistBeforeInline = function (currentInline, inline) {
        if (currentInline.line === inline.line) {
            return currentInline.line.children.indexOf(currentInline) <=
                inline.line.children.indexOf(inline);
        }
        if (currentInline.line.paragraph === inline.line.paragraph) {
            return currentInline.line.paragraph.childWidgets.indexOf(currentInline.line)
                < inline.line.paragraph.childWidgets.indexOf(inline.line);
        }
        var startParagraph = currentInline.line.paragraph;
        var endParagraph = inline.line.paragraph;
        if (startParagraph.containerWidget === endParagraph.containerWidget) {
            if (startParagraph.isInsideTable) {
                return startParagraph.associatedCell.childWidgets.indexOf(startParagraph) <
                    endParagraph.associatedCell.childWidgets.indexOf(endParagraph);
            }
            else if (startParagraph.containerWidget instanceof HeaderFooterWidget) {
                // return ((currentInline.owner as WParagraph).owner as WHeaderFooter).blocks.indexOf(currentInline.owner as WParagraph) <
                //     ((inline.owner as WParagraph).owner as WHeaderFooter).blocks.indexOf(inline.owner as WParagraph);
            }
            else {
                return startParagraph.containerWidget.childWidgets.indexOf(startParagraph) <
                    endParagraph.containerWidget.childWidgets.indexOf(endParagraph);
            }
        }
        return this.isExistBefore(startParagraph, endParagraph);
    };
    /**
     * Return true id current inline is exist after inline
     *
     * @private
     * @returns {boolean}
     */
    Selection.prototype.isExistAfterInline = function (currentInline, inline, isRetrieve) {
        if (currentInline.line === inline.line) {
            var selection = this.documentHelper.selection;
            if (isRetrieve) {
                return currentInline.line.children.indexOf(currentInline) >=
                    inline.line.children.indexOf(inline);
            }
            else if (currentInline === inline && selection.start.offset !== selection.end.offset) {
                return currentInline.line.children.indexOf(currentInline) ===
                    inline.line.children.indexOf(inline);
            }
            else {
                return currentInline.line.children.indexOf(currentInline) >
                    inline.line.children.indexOf(inline);
            }
        }
        if (currentInline.line.paragraph === inline.line.paragraph) {
            return currentInline.line.paragraph.childWidgets.indexOf(currentInline.line)
                > inline.line.paragraph.childWidgets.indexOf(inline.line);
        }
        var startParagraph = currentInline.line.paragraph;
        var endParagraph = inline.line.paragraph;
        if (startParagraph.containerWidget === endParagraph.containerWidget) {
            if (startParagraph.isInsideTable) {
                return startParagraph.associatedCell.childWidgets.indexOf(startParagraph) >
                    endParagraph.associatedCell.childWidgets.indexOf(endParagraph);
            }
            else if (startParagraph.containerWidget instanceof HeaderFooterWidget) {
                // return ((currentInline.owner as WParagraph).owner as WHeaderFooter).blocks.indexOf(currentInline.owner as WParagraph) <
                //     ((inline.owner as WParagraph).owner as WHeaderFooter).blocks.indexOf(inline.owner as WParagraph);
            }
            else {
                return startParagraph.containerWidget.childWidgets.indexOf(startParagraph) >
                    endParagraph.containerWidget.childWidgets.indexOf(endParagraph);
            }
        }
        return this.isExistAfter(startParagraph, endParagraph);
    };
    /**
     * Get next rendered block
     *
     * @private
     * @returns {BlockWidget}
     */
    Selection.prototype.getNextRenderedBlock = function (block) {
        if (isNullOrUndefined(block.nextWidget)) {
            return block.nextRenderedWidget;
        }
        return block.nextWidget;
    };
    /**
     * Get next rendered block
     *
     * @private
     * @returns {BlockWidget}
     */
    Selection.prototype.getPreviousRenderedBlock = function (block) {
        if (isNullOrUndefined(block.previousWidget)) {
            return block.previousRenderedWidget;
        }
        return block.previousWidget;
    };
    /**
     * Get Next paragraph in block
     *
     * @private
     * @returns {ParagraphWidget}
     */
    Selection.prototype.getNextParagraphBlock = function (block) {
        if (block.nextRenderedWidget instanceof ParagraphWidget) {
            return block.nextRenderedWidget;
        }
        else if (block.nextRenderedWidget instanceof TableWidget) {
            return this.documentHelper.getFirstParagraphInFirstCell(block.nextRenderedWidget);
        }
        if (block.containerWidget instanceof TableCellWidget) {
            return this.getNextParagraphCell(block.containerWidget);
        }
        else if (block.containerWidget instanceof BodyWidget) {
            var bodyWidget = block.containerWidget;
            return this.getNextParagraph(block.containerWidget);
        }
        else if (block.containerWidget instanceof HeaderFooterWidget && this.isMoveDownOrMoveUp) {
            return this.getFirstBlockInNextHeaderFooter(block);
        }
        return undefined;
    };
    /**
     * @private
     * @returns {ParagraphWidget}
     */
    Selection.prototype.getFirstBlockInNextHeaderFooter = function (block) {
        var headerFooter = block.containerWidget;
        var nextBlock;
        if (headerFooter.headerFooterType.indexOf('Header') !== -1) {
            nextBlock = headerFooter.page.footerWidget.firstChild;
        }
        else if (headerFooter.page.nextPage) {
            var nextPage = headerFooter.page.nextPage;
            var headerWidget = nextPage.headerWidget;
            headerWidget.page = nextPage;
            if (nextPage.footerWidget) {
                nextPage.footerWidget.page = nextPage;
            }
            nextBlock = headerWidget.firstChild;
        }
        else {
            return undefined;
        }
        if (nextBlock instanceof ParagraphWidget) {
            return nextBlock;
        }
        else {
            return this.getFirstBlockInFirstCell(nextBlock);
        }
    };
    /**
     * @private
     * @returns {ParagraphWidget}
     */
    Selection.prototype.getLastBlockInPreviousHeaderFooter = function (block) {
        var headerFooter = block.containerWidget;
        var previousBlock;
        if (headerFooter.headerFooterType.indexOf('Footer') !== -1) {
            previousBlock = headerFooter.page.headerWidget.lastChild;
        }
        else if (headerFooter.page.previousPage) {
            var previousPage = headerFooter.page.previousPage;
            var footerWidget = previousPage.footerWidget;
            footerWidget.page = previousPage;
            if (previousPage.headerWidget) {
                previousPage.headerWidget.page = previousPage;
            }
            previousBlock = footerWidget.lastChild;
        }
        else {
            return undefined;
        }
        if (previousBlock instanceof ParagraphWidget) {
            return previousBlock;
        }
        else {
            return this.getFirstBlockInFirstCell(previousBlock);
        }
    };
    /**
     * Get previous paragraph in block
     *
     * @private
     * @returns {ParagraphWidget}
     */
    Selection.prototype.getPreviousParagraphBlock = function (block, isAutoList) {
        if (block.previousRenderedWidget instanceof ParagraphWidget) {
            return block.previousRenderedWidget;
        }
        else if (block.previousRenderedWidget instanceof TableWidget) {
            return this.documentHelper.getLastParagraphInLastCell((block.previousRenderedWidget));
        }
        if (block.containerWidget instanceof TableCellWidget) {
            return this.getPreviousParagraphCell((block.containerWidget));
        }
        else if (block.containerWidget instanceof BodyWidget) {
            return this.getPreviousParagraph(block.containerWidget);
        }
        else if (block.containerWidget instanceof HeaderFooterWidget && this.isMoveDownOrMoveUp && !isAutoList) {
            return this.getLastBlockInPreviousHeaderFooter(block);
        }
        return undefined;
    };
    /**
     * Return true if paragraph has valid inline
     *
     * @private
     * @returns {ParagraphWidget}
     */
    Selection.prototype.hasValidInline = function (paragraph, start, end) {
        var index = paragraph.childWidgets.indexOf(start.line);
        for (var i = index; i < paragraph.childWidgets.length; i++) {
            for (var j = 0; j < paragraph.childWidgets[i].children.length; j++) {
                var inline = paragraph.childWidgets[i].children[j];
                if (inline.length === 0) {
                    continue;
                }
                if (inline === end) {
                    return false;
                }
                if (inline instanceof TextElementBox || inline instanceof ImageElementBox
                    || (inline instanceof FieldElementBox && HelperMethods.isLinkedFieldCharacter(inline))) {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Get paragraph length
     *
     * @private
     * @returns {number}
     */
    Selection.prototype.getParagraphLength = function (paragraph, endLine, elementInfo, includeShape) {
        var length = 0;
        if (!isNullOrUndefined(paragraph)) {
            for (var j = 0; j < paragraph.childWidgets.length; j++) {
                var line = paragraph.childWidgets[j];
                if (endLine instanceof LineWidget && endLine === line) {
                    if (elementInfo) {
                        length += this.getLineLength(line, elementInfo, includeShape);
                    }
                    break;
                }
                length += this.getLineLength(line, undefined, includeShape);
            }
        }
        return length;
    };
    /**
     * Get Line length
     *
     * @private
     * @returns {number}
     */
    Selection.prototype.getLineLength = function (line, elementInfo, includeShape) {
        var length = 0;
        var bidi = line.paragraph.bidi;
        for (var i = !bidi ? 0 : line.children.length - 1; bidi ? i > -1 : i < line.children.length; bidi ? i-- : i++) {
            var element = line.children[i];
            if (element instanceof ListTextElementBox) {
                continue;
            }
            if (includeShape) {
                if (element instanceof ShapeElementBox) {
                    for (var m = 0; m < element.textFrame.childWidgets.length; m++) {
                        var para = element.textFrame.childWidgets[m];
                        length += this.getParagraphLength(para) + 1;
                    }
                }
                else if (element instanceof FootnoteElementBox) {
                    for (var m = 0; m < element.bodyWidget.childWidgets.length; m++) {
                        var para = element.bodyWidget.childWidgets[m];
                        length += this.getParagraphLength(para) + 1;
                    }
                }
            }
            if (elementInfo && elementInfo.element instanceof ElementBox && elementInfo.element === element) {
                length += elementInfo.index;
                break;
            }
            length += element.length;
        }
        return length;
    };
    /**
     * Get line information
     *
     * @private
     * @returns {LineInfo}
     */
    Selection.prototype.getLineInfo = function (paragraph, offset) {
        var line = undefined;
        var length = 0;
        var childLength = paragraph.childWidgets.length;
        for (var j = 0; j < childLength; j++) {
            line = paragraph.childWidgets[j];
            length = this.getLineLength(line);
            if (offset <= length || j === childLength - 1) {
                break;
            }
            else {
                offset = offset - length;
            }
        }
        return { 'line': line, 'offset': offset };
    };
    /**
     * @private
     * @returns {ElementInfo}
     */
    Selection.prototype.getElementInfo = function (line, offset) {
        var index = 0;
        var element = undefined;
        for (var i = 0; i < line.children.length; i++) {
            element = line.children[i];
            if (element instanceof ListTextElementBox) {
                continue;
            }
            if (offset > element.length
                && (!(offset === element.length + 1 && isNullOrUndefined(element.nextNode)))) {
                offset = offset - element.length;
            }
            else {
                break;
            }
        }
        return { 'element': element, 'index': offset };
    };
    /**
     * Get paragraph start offset
     *
     * @private
     * @returns {number}
     */
    Selection.prototype.getStartOffset = function (paragraph) {
        var startOffset = 0;
        if (paragraph.childWidgets.length > 0) {
            var childWidgets = paragraph.childWidgets[0];
            return this.getStartLineOffset(childWidgets);
        }
        return startOffset;
    };
    /**
     * @private
     */
    Selection.prototype.getStartLineOffset = function (line) {
        var startOffset = 0;
        var isHidden = true;
        for (var i = 0; i < line.children.length; i++) {
            var inline = line.children[i];
            if (inline.length === 0) {
                continue;
            }
            if (inline instanceof ElementBox && inline.characterFormat.hidden) {
                startOffset += inline.length;
                if (isHidden) {
                    startOffset += 1;
                    isHidden = false;
                }
                continue;
            }
            if (inline instanceof TextElementBox || inline instanceof ImageElementBox || inline instanceof BookmarkElementBox
                || inline instanceof ShapeElementBox || inline instanceof EditRangeStartElementBox
                || inline instanceof EditRangeEndElementBox || inline instanceof CommentCharacterElementBox
                || (inline instanceof FieldElementBox && HelperMethods.isLinkedFieldCharacter(inline))
                || inline instanceof ContentControl) {
                return startOffset;
            }
            if (inline instanceof ListTextElementBox) {
                continue;
            }
            startOffset += inline.length;
        }
        return startOffset;
    };
    /**
     * Get previous paragraph from selection
     *
     * @private
     */
    Selection.prototype.getPreviousSelectionCell = function (cell) {
        if (!isNullOrUndefined(cell.previousRenderedWidget)) {
            if (!this.isForward) {
                var block = cell.previousRenderedWidget.childWidgets[0];
                if (block instanceof ParagraphWidget) {
                    return block;
                }
                else {
                    return this.documentHelper.getFirstParagraphInLastRow(block);
                }
            }
            else {
                var widgets = cell.previousRenderedWidget.childWidgets;
                var block = widgets[widgets.length - 1];
                if (block instanceof ParagraphWidget) {
                    return block;
                }
                else {
                    return this.getPreviousParagraphSelection(block.childWidgets[block.childWidgets.length - 1]);
                }
            }
        }
        return this.getPreviousSelectionRow(cell.ownerRow);
    };
    /**
     * Get previous paragraph selection in selection
     *
     * @private
     */
    Selection.prototype.getPreviousSelectionRow = function (row) {
        if (!isNullOrUndefined(row.previousRenderedWidget)) {
            if (!this.isForward) {
                var cell = row.previousRenderedWidget.childWidgets[0];
                var block = cell.childWidgets[0];
                return this.documentHelper.getFirstParagraphBlock(block);
            }
            else {
                return this.getPreviousParagraphSelection(row.previousRenderedWidget);
            }
        }
        return this.getPreviousSelectionBlock(row.ownerTable);
    };
    /**
     * @private
     */
    Selection.prototype.getNextSelectionBlock = function (block) {
        if (block.nextRenderedWidget instanceof ParagraphWidget) {
            return block.nextRenderedWidget;
        }
        else if (block.nextRenderedWidget instanceof TableWidget) {
            if (this.isEmpty || this.isForward) {
                return this.documentHelper.getLastParagraphInFirstRow(block.nextRenderedWidget);
            }
            else {
                return this.getNextParagraphSelection(block.nextRenderedWidget.childWidgets[0]);
            }
        }
        if (block.containerWidget instanceof TableCellWidget) {
            return this.getNextSelectionCell(block.containerWidget);
        }
        else if (block.containerWidget instanceof BodyWidget) {
            return this.getNextSelection(block.containerWidget);
        }
        return undefined;
    };
    /**
     * Get next paragraph from selected cell
     *
     * @private
     */
    Selection.prototype.getNextSelectionCell = function (cell) {
        if (!isNullOrUndefined(cell.nextRenderedWidget)) {
            if (this.isEmpty || this.isForward) {
                var block = cell.nextRenderedWidget.childWidgets[cell.nextRenderedWidget.childWidgets.length - 1];
                return this.documentHelper.getLastParagraphBlock(block);
            }
            else {
                //Return first paragraph in cell.
                var block = cell.nextRenderedWidget.childWidgets[0];
                if (block instanceof ParagraphWidget) {
                    return block;
                }
                else {
                    return this.getNextParagraphSelection(block.childWidgets[0]);
                }
            }
        }
        return this.getNextSelectionRow(cell.ownerRow);
    };
    /**
     * Get next paragraph in selection
     *
     * @private
     */
    Selection.prototype.getNextSelectionRow = function (row) {
        if (!isNullOrUndefined(row.nextRenderedWidget)) {
            var isForwardSelection = this.isEmpty || this.isForward;
            if (isForwardSelection) {
                var cell = row.nextRenderedWidget.childWidgets[row.nextRenderedWidget.childWidgets.length - 1];
                var block = cell.childWidgets[cell.childWidgets.length - 1];
                return this.documentHelper.getLastParagraphBlock(block);
            }
            else {
                return this.getNextParagraphSelection(row.nextRenderedWidget);
            }
        }
        return this.getNextSelectionBlock(row.ownerTable);
    };
    /**
     * Get next block with selection
     *
     * @private
     */
    Selection.prototype.getNextSelection = function (section) {
        if (section.nextRenderedWidget instanceof BodyWidget) {
            var block = section.nextRenderedWidget.childWidgets[0];
            if (block instanceof ParagraphWidget) {
                return block;
            }
            else {
                if (this.isEmpty || this.isForward) {
                    return this.documentHelper.getLastParagraphInFirstRow(block);
                }
                else {
                    return this.getNextParagraphSelection(block.childWidgets[0]);
                }
            }
        }
        return undefined;
    };
    /**
     * @private
     */
    Selection.prototype.getNextParagraphSelection = function (row) {
        //Iterate the exact cell based on UP/Down selection length.
        var cell = row.childWidgets[0];
        if (this.start.paragraph.isInsideTable
            && row.ownerTable.contains(this.start.paragraph.associatedCell)) {
            var startCell = this.getCellInTable(row.ownerTable, this.start.paragraph.associatedCell);
            cell = this.getFirstCellInRegion(row, startCell, this.upDownSelectionLength, false);
        }
        var block = cell.childWidgets[0];
        return this.documentHelper.getFirstParagraphBlock(block);
    };
    /**
     * @private
     */
    Selection.prototype.getPreviousSelectionBlock = function (block) {
        if (block.previousRenderedWidget instanceof ParagraphWidget) {
            return block.previousRenderedWidget;
        }
        else if (block.previousRenderedWidget instanceof TableWidget) {
            if (!this.isForward) {
                return this.documentHelper.getFirstParagraphInLastRow(block.previousRenderedWidget);
            }
            else {
                return this.getPreviousParagraphSelection(block.previousRenderedWidget.childWidgets[block.previousRenderedWidget.childWidgets.length - 1]);
            }
        }
        if (block.containerWidget instanceof TableCellWidget) {
            return this.getPreviousSelectionCell(block.containerWidget);
        }
        else if (block.containerWidget instanceof BodyWidget) {
            return this.getPreviousSelection(block.containerWidget);
        }
        return undefined;
    };
    /**
     * Get previous paragraph in selection
     *
     * @private
     */
    Selection.prototype.getPreviousSelection = function (section) {
        if (section.previousRenderedWidget instanceof BodyWidget) {
            var prevBodyWidget = section.previousRenderedWidget;
            var block = prevBodyWidget.childWidgets[prevBodyWidget.childWidgets.length - 1];
            if (block instanceof ParagraphWidget) {
                return block;
            }
            else {
                if (!this.isForward) {
                    return this.documentHelper.getFirstParagraphInLastRow(block);
                }
                else {
                    var tableWidget = block;
                    return this.getPreviousParagraphSelection(tableWidget.childWidgets[tableWidget.childWidgets.length - 1]);
                }
            }
        }
        return undefined;
    };
    /**
     * @private
     */
    Selection.prototype.getPreviousParagraphSelection = function (row) {
        //Iterate the exact cell based on UP/Down selection length.
        var cell = row.childWidgets[row.childWidgets.length - 1];
        if (this.start.paragraph.isInsideTable
            && row.ownerTable.contains(this.start.paragraph.associatedCell)) {
            var startCell = this.getCellInTable(row.ownerTable, this.start.paragraph.associatedCell);
            cell = this.getLastCellInRegion(row, startCell, this.upDownSelectionLength, true);
        }
        var block = cell.childWidgets[cell.childWidgets.length - 1];
        return this.documentHelper.getLastParagraphBlock(block);
    };
    /**
     * Get last cell in the selected region
     *
     * @private
     */
    Selection.prototype.getLastCellInRegion = function (row, startCell, selLength, isMovePrev) {
        var start = this.getCellLeft(row, startCell);
        var end = start + startCell.cellFormat.cellWidth;
        var flag = true;
        if (start <= selLength && selLength < end) {
            for (var i = row.childWidgets.length - 1; i >= 0; i--) {
                var left = this.getCellLeft(row, row.childWidgets[i]);
                if (HelperMethods.round(start, 2) <= HelperMethods.round(left, 2) &&
                    HelperMethods.round(left, 2) < HelperMethods.round(end, 2)) {
                    flag = false;
                    return row.childWidgets[i];
                }
            }
        }
        else {
            for (var i = row.childWidgets.length - 1; i >= 0; i--) {
                var left = this.getCellLeft(row, row.childWidgets[i]);
                if (left <= selLength && left + row.childWidgets[i].width > selLength) {
                    flag = false;
                    return row.childWidgets[i];
                }
            }
        }
        if (flag) {
            if (!isNullOrUndefined(row.previousRenderedWidget) && isMovePrev) {
                return this.getLastCellInRegion(row.previousRenderedWidget, startCell, selLength, isMovePrev);
            }
            else if (!isNullOrUndefined(row.nextRenderedWidget) && !isMovePrev) {
                return this.getLastCellInRegion(row.nextRenderedWidget, startCell, selLength, isMovePrev);
            }
        }
        return row.childWidgets[row.childWidgets.length - 1];
    };
    /**
     * Get Container table
     *
     * @private
     */
    Selection.prototype.getCellInTable = function (table, tableCell) {
        while (tableCell.ownerTable.isInsideTable) {
            if (table.equals(tableCell.ownerTable)) {
                return tableCell;
            }
            tableCell = tableCell.ownerTable.associatedCell;
        }
        return tableCell;
    };
    /**
     * Get previous valid offset
     *
     * @private
     */
    Selection.prototype.getPreviousValidOffset = function (line, offset) {
        if (offset === 0) {
            return 0;
        }
        var validOffset = 0;
        var count = 0;
        var hiddenTextLength = 0;
        for (var j = 0; j < line.children.length; j++) {
            var inline = line.children[j];
            if (inline.length === 0 || inline instanceof ListTextElementBox) {
                continue;
            }
            if (inline.characterFormat.hidden) {
                hiddenTextLength += inline.length;
                count += inline.length;
                continue;
            }
            hiddenTextLength = 0;
            if (offset <= count + inline.length) {
                return offset - 1 === count ? validOffset : offset - 1;
            }
            if (inline instanceof TextElementBox || inline instanceof ContentControl || inline instanceof ImageElementBox || inline instanceof CommentCharacterElementBox || inline instanceof BookmarkElementBox
                || (inline instanceof FieldElementBox && HelperMethods.isLinkedFieldCharacter(inline))) {
                validOffset = count + inline.length;
            }
            count += inline.length;
        }
        return offset - 1 === count ? validOffset : hiddenTextLength > 0 ? offset - (hiddenTextLength + 1) : offset - 1;
    };
    /**
     * Get next valid offset
     *
     * @private
     */
    Selection.prototype.getNextValidOffset = function (line, offset) {
        var count = 0;
        // if (!line.paragraph.paragraphFormat.bidi) {
        for (var i = 0; i < line.children.length; i++) {
            var inline = line.children[i];
            if (inline.length === 0 || inline instanceof ListTextElementBox) {
                continue;
            }
            if (inline.characterFormat.hidden) {
                count += inline.length;
                continue;
            }
            if (offset < count + inline.length) {
                if (inline instanceof TextElementBox || inline instanceof ContentControl || inline instanceof ImageElementBox
                    || (inline instanceof FieldElementBox && HelperMethods.isLinkedFieldCharacter(inline))) {
                    return (offset > count ? offset : count) + 1;
                }
            }
            if (offset === count + inline.length && inline instanceof FieldElementBox &&
                inline.fieldType === 1 && inline.previousNode instanceof ImageElementBox) {
                return offset;
            }
            count += inline.length;
        }
        // } else {
        //     if (offset !== this.getLineLength(line)) {
        //         offset = line.getInlineForOffset(offset, false, undefined, false, false, true).index;
        //     }
        // }
        return offset;
    };
    /**
     * Get paragraph mark size info
     *
     * @private
     */
    Selection.prototype.getParagraphMarkSize = function (paragraph, topMargin, bottomMargin) {
        var size = this.documentHelper.textHelper.getParagraphMarkSize(paragraph.characterFormat);
        var baselineOffset = size.BaselineOffset;
        var maxHeight = size.Height;
        var maxBaselineOffset = baselineOffset;
        if (paragraph instanceof ParagraphWidget) {
            // let paragraphWidget: ParagraphWidget[] = paragraph.renderedElement() as ParagraphWidget[];
            if (paragraph.childWidgets.length > 0) {
                var lineWidget = paragraph.childWidgets[0];
            }
            //Gets line spacing.
            var lineSpacing = this.documentHelper.layout.getLineSpacing(paragraph, maxHeight);
            var beforeSpacing = this.documentHelper.layout.getBeforeSpacing(paragraph);
            topMargin = maxBaselineOffset - baselineOffset;
            bottomMargin = maxHeight - maxBaselineOffset - (size.Height - baselineOffset);
            //Updates line spacing, paragraph after/ before spacing and aligns the text to base line offset.
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
                topMargin += lineSpacing - (topMargin + size.Height + bottomMargin);
            }
            else if (lineSpacing > topMargin + size.Height + bottomMargin) {
                topMargin += lineSpacing - (topMargin + size.Height + bottomMargin);
            }
            topMargin += beforeSpacing;
            bottomMargin += this.documentHelper.layout.getAfterSpacing(paragraph);
        }
        return { 'width': size.Width, 'height': size.Height, 'topMargin': topMargin, 'bottomMargin': bottomMargin };
    };
    /**
     * @private
     */
    Selection.prototype.getPhysicalPositionInternal = function (line, offset, moveNextLine) {
        if (line.paragraph.isEmpty()) {
            var paragraphWidget = line.paragraph;
            var left = paragraphWidget.x;
            if (paragraphWidget.childWidgets.length > 0) {
                var lineWidget = paragraphWidget.childWidgets[0];
                left = this.getLeft(lineWidget);
            }
            var topMargin = 0;
            var bottomMargin = 0;
            var size = this.getParagraphMarkSize(line.paragraph, topMargin, bottomMargin);
            if (offset > 0 || (offset === 0 && paragraphWidget.isEmpty() && paragraphWidget.bidi)) {
                left += size.width;
            }
            return new Point(left, paragraphWidget.y + size.topMargin);
        }
        else {
            var indexInInline = 0;
            var inlineObj = line.getInline(offset, indexInInline, line.paragraph.bidi);
            var inline = inlineObj.element; //return indexInInline must
            indexInInline = inlineObj.index;
            // if (inline.length === indexInInline && !isNullOrUndefined(inline.nextNode) && this.viewer.renderedElements.containsKey(inline) &&
            //     this.viewer.renderedElements.get(inline).length > 0 && this.viewer.renderedElements.containsKey(inline.nextNode as WInline)
            //     && this.viewer.renderedElements.get(inline.nextNode as WInline).length > 0 &&
            //     (this.viewer.renderedElements.get(inline)[this.viewer.renderedElements.get(inline).length - 1] as ElementBox).line !== (this.viewer.renderedElements.get(inline.nextNode as WInline)[0] as ElementBox).line) {
            //     //Handled specifically to move the cursor at start of next line.
            //     inline = inline.nextNode as WInline;
            //     indexInInline = 0;
            // }
            return this.getPhysicalPositionInline(inline, indexInInline, moveNextLine);
        }
    };
    /**
     * Highlight selected content
     *
     * @private
     */
    Selection.prototype.highlightSelectedContent = function (start, end) {
        if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
            || (!start.paragraph.associatedCell.equals(end.paragraph.associatedCell))
            || (!this.documentHelper.isSelectionChangedOnMouseMoved && this.isCellSelected(start.paragraph.associatedCell, start, end))
            || this.isCellPrevSelected)) {
            this.highlightCell(start.paragraph.associatedCell, this, start, end);
            this.isCellPrevSelected = true;
        }
        else {
            var inline = undefined;
            var index = 0;
            if (!this.owner.isReadOnlyMode && start.paragraph === end.paragraph) {
                if (start.offset + 1 === end.offset) {
                    var inlineObj = end.currentWidget.getInline(end.offset, index);
                    inline = inlineObj.element; // return index value
                    index = inlineObj.index;
                    if (inline instanceof ImageElementBox || inline instanceof ShapeElementBox) {
                        var startOffset = start.currentWidget.getOffset(inline, 0);
                        if (startOffset !== start.offset) {
                            inline = undefined;
                        }
                    }
                }
                else {
                    var indexInInline = 0;
                    var startInlineObj = start.currentWidget.getInline(start.offset, indexInInline);
                    var startInline = startInlineObj.element; //return indexInInline
                    indexInInline = startInlineObj.index;
                    if (indexInInline === startInline.length) {
                        startInline = this.getNextRenderedElementBox(startInline, indexInInline);
                    }
                    var endInlineObj = end.currentWidget.getInline(end.offset, indexInInline);
                    var endInline = endInlineObj.element; //return indexInInline
                    indexInInline = endInlineObj.index;
                    if (startInline instanceof FieldElementBox && endInline instanceof FieldElementBox && !isNullOrUndefined(startInline.fieldSeparator)) {
                        var fieldValue = startInline.fieldSeparator.nextNode;
                        if (fieldValue instanceof ImageElementBox && fieldValue.nextNode === endInline) {
                            inline = fieldValue;
                        }
                    }
                }
            }
            if (!this.owner.isReadOnlyMode && this.owner.isDocumentLoaded && (inline instanceof ImageElementBox || inline instanceof ShapeElementBox)) {
                var elementBoxObj = this.getElementBoxInternal(inline, index);
                var elementBox = elementBoxObj.element; //return index
                index = elementBoxObj.index;
                if (this.owner.enableImageResizerMode && !this.owner.editorModule.isRemoteAction) {
                    this.owner.imageResizerModule.positionImageResizer(elementBox);
                    this.owner.imageResizerModule.showImageResizer();
                }
                if (this.documentHelper.isTouchInput) {
                    this.documentHelper.touchStart.style.display = 'none';
                    this.documentHelper.touchEnd.style.display = 'none';
                }
            }
            else {
                if (start.paragraph.isInsideTable
                    && start.paragraph.associatedCell.equals(end.paragraph.associatedCell)
                    && end.paragraph.equals(this.getLastParagraph(end.paragraph.associatedCell))
                    && (this.getParagraphLength(end.paragraph) + 1) == end.offset) {
                    end.offset--;
                }
                this.highlight(start.paragraph, start, end);
                if (this.isHighlightNext) {
                    if (this.hightLightNextParagraph === start.paragraph) {
                        this.highlightNextBlock(this.hightLightNextParagraph, start, end);
                    }
                    this.isHighlightNext = false;
                    this.hightLightNextParagraph = undefined;
                }
            }
            if (this.isInShape) {
                this.showResizerForShape();
            }
        }
    };
    Selection.prototype.showResizerForShape = function () {
        var shape = this.getCurrentTextFrame().containerShape;
        this.owner.imageResizerModule.positionImageResizer(shape);
        this.owner.imageResizerModule.showImageResizer();
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.highlight = function (paragraph, start, end, contentControl) {
        var selectionStartIndex = 0;
        var selectionEndIndex = 0;
        var startElement = undefined;
        var endElement = undefined;
        var startLineWidget = undefined;
        var endLineWidget = undefined;
        //return start Element and selection start index
        var startLineObj = this.getStartLineWidget(paragraph, start, startElement, selectionStartIndex);
        startElement = startLineObj.element;
        if (isNullOrUndefined(startElement)) {
            startLineWidget = paragraph.childWidgets[0];
        }
        else {
            startLineWidget = startElement.line;
        }
        selectionStartIndex = startLineObj.index;
        var endLineObj = this.getEndLineWidget(end, endElement, selectionEndIndex);
        endElement = endLineObj.element;
        if (endElement) {
            endLineWidget = endElement.line;
        }
        else {
            endLineWidget = end.paragraph.childWidgets[end.paragraph.childWidgets.length - 1];
        }
        selectionEndIndex = endLineObj.index;
        var top = 0;
        var left = 0;
        if (!isNullOrUndefined(startLineWidget)) {
            top = this.getTop(startLineWidget);
            left = this.getLeftInternal(startLineWidget, startElement, selectionStartIndex);
        }
        if (!isNullOrUndefined(startLineWidget) && startLineWidget === endLineWidget) {
            //Selection ends in current line.
            var right = this.getLeftInternal(endLineWidget, endElement, selectionEndIndex);
            var width = 0;
            var isRtlText = false;
            if (endElement instanceof TextElementBox) {
                isRtlText = endElement.isRightToLeft;
            }
            if (!isRtlText && startElement instanceof TextElementBox) {
                isRtlText = startElement.isRightToLeft;
            }
            width = Math.abs(right - left);
            // Handled the highlighting approach as genric for normal and rtl text.
            if (isRtlText || paragraph.bidi) {
                var elementBoxCollection = this.getElementsForward(startLineWidget, startElement, endElement, paragraph.bidi);
                if (elementBoxCollection && elementBoxCollection.length > 1) {
                    for (var i = 0; i < elementBoxCollection.length; i++) {
                        var element = elementBoxCollection[i];
                        var elementIsRTL = false;
                        var index = element instanceof TextElementBox ? element.length : 1;
                        if (element === startElement) {
                            left = this.getLeftInternal(startLineWidget, element, selectionStartIndex);
                            right = this.getLeftInternal(startLineWidget, element, index);
                        }
                        else if (element === endElement) {
                            left = this.getLeftInternal(startLineWidget, element, 0);
                            right = this.getLeftInternal(startLineWidget, element, selectionEndIndex);
                        }
                        else {
                            left = this.getLeftInternal(startLineWidget, element, 0);
                            right = this.getLeftInternal(startLineWidget, element, index);
                        }
                        if (element instanceof TextElementBox) {
                            elementIsRTL = element.isRightToLeft;
                        }
                        width = Math.abs(right - left);
                        // Handled the paragraph mark highliting as special case.
                        if (element === endElement && element instanceof TextElementBox
                            && selectionEndIndex > element.length) {
                            var charFormat = element.line.paragraph.characterFormat;
                            var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(charFormat).Width;
                            if (paragraph.bidi && !elementIsRTL) {
                                width -= paragraphMarkWidth;
                                // Highlight the element.
                                this.createHighlightBorder(startLineWidget, width, left, top, true, contentControl);
                                // Highlight the paragraph mark of Bidi paragrph. 
                                left = this.getLineStartLeft(startLineWidget) - paragraphMarkWidth;
                                this.createHighlightBorder(startLineWidget, paragraphMarkWidth, left, top, true, contentControl);
                                // continue to next element.
                                continue;
                            }
                        }
                        this.createHighlightBorder(startLineWidget, width, elementIsRTL ? right : left, top, true, contentControl);
                    }
                }
                else { // Need to handle the Paragraph mark highlighting.
                    if (endElement instanceof TextElementBox && selectionEndIndex > endElement.length) {
                        var charFormat = endElement.line.paragraph.characterFormat;
                        var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(charFormat).Width;
                        // Since isRTLText is truo, so the right is considered as left
                        if (!paragraph.bidi && isRtlText) {
                            right += paragraphMarkWidth;
                            width -= paragraphMarkWidth;
                            // Highlight the element.
                            this.createHighlightBorder(startLineWidget, width, right, top, true, contentControl);
                            // Highlight the paragraph mark. 
                            right += endElement.width;
                            this.createHighlightBorder(startLineWidget, paragraphMarkWidth, right, top, true, contentControl);
                        }
                        else if (paragraph.bidi && !isRtlText) {
                            width -= paragraphMarkWidth;
                            // Highlight the element.
                            this.createHighlightBorder(startLineWidget, width, left, top, true, contentControl);
                            // Highlight the paragraph mark of Bidi paragrph. 
                            left = this.getLineStartLeft(startLineWidget) - paragraphMarkWidth;
                            this.createHighlightBorder(startLineWidget, paragraphMarkWidth, left, top, true, contentControl);
                        }
                        else {
                            this.createHighlightBorder(startLineWidget, width, isRtlText ? right : left, top, false, contentControl);
                        }
                    }
                    else {
                        this.createHighlightBorder(startLineWidget, width, isRtlText ? right : left, top, false, contentControl);
                    }
                }
            }
            else {
                // Start element and end element will be in reverese for Bidi paragraph highlighting. 
                // So, the right is considered based on Bidi property.
                this.createHighlightBorder(startLineWidget, width, paragraph.bidi ? right : left, top, false, contentControl);
            }
        }
        else {
            if (!isNullOrUndefined(startLineWidget)) {
                var x = startLineWidget.paragraph.x;
                if (paragraph !== startLineWidget.paragraph) {
                    paragraph = startLineWidget.paragraph;
                }
                var width = this.getWidth(startLineWidget, true) - (left - startLineWidget.paragraph.x);
                // Handled the  highlighting approach as genric for normal and rtl text.
                if (paragraph.bidi || (startElement instanceof TextElementBox && startElement.isRightToLeft)) {
                    var right = 0;
                    var elementCollection = this.getElementsForward(startLineWidget, startElement, endElement, paragraph.bidi);
                    if (elementCollection) {
                        var elementIsRTL = false;
                        for (var i = 0; i < elementCollection.length; i++) {
                            var element = elementCollection[i];
                            elementIsRTL = false;
                            if (element === startElement) {
                                left = this.getLeftInternal(startLineWidget, element, selectionStartIndex);
                            }
                            else {
                                left = this.getLeftInternal(startLineWidget, element, 0);
                            }
                            var index = element instanceof TextElementBox ? element.length : 1;
                            right = this.getLeftInternal(startLineWidget, element, index);
                            if (element instanceof TextElementBox) {
                                elementIsRTL = element.isRightToLeft;
                            }
                            width = Math.abs(right - left);
                            this.createHighlightBorder(startLineWidget, width, elementIsRTL ? right : left, top, true, contentControl);
                        }
                        // Highlight the Paragrph mark for last line.
                        if (startLineWidget.isLastLine()) {
                            var charFormat = elementCollection[elementCollection.length - 1].line.paragraph.characterFormat;
                            var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(charFormat).Width;
                            if (paragraph.bidi) {
                                // The paragraph mark will be at the left most end.
                                left = this.getLineStartLeft(startLineWidget) - paragraphMarkWidth;
                            }
                            else { // The paragraph mark will at right most end.
                                left = elementIsRTL ? startLineWidget.paragraph.x + this.getWidth(startLineWidget, false) : right;
                            }
                            this.createHighlightBorder(startLineWidget, paragraphMarkWidth, left, top, true, contentControl);
                        }
                    }
                    else {
                        this.createHighlightBorder(startLineWidget, width, left, top, false, contentControl);
                    }
                }
                else {
                    this.createHighlightBorder(startLineWidget, width, left, top, false, contentControl);
                }
                var lineIndex = startLineWidget.paragraph.childWidgets.indexOf(startLineWidget);
                //Iterates to last item of paragraph or selection end.                                             
                this.highlightParagraph(paragraph, lineIndex + 1, endLineWidget, endElement, selectionEndIndex, contentControl);
                if (paragraph.childWidgets.indexOf(end.currentWidget) !== -1) {
                    return;
                }
            }
            if (this.isHideSelection(paragraph)) {
                this.isHighlightNext = false;
                return;
            }
            this.isHighlightNext = true;
            this.hightLightNextParagraph = paragraph;
        }
    };
    Selection.prototype.highlightNextBlock = function (paragraph, start, end) {
        var block = paragraph.nextRenderedWidget;
        if (!isNullOrUndefined(block)) {
            if (block instanceof ParagraphWidget) {
                this.isHighlightNext = false;
                this.highlight(block, start, end);
                if (this.isHighlightNext) {
                    this.highlightNextBlock(this.hightLightNextParagraph, start, end);
                    this.isHighlightNext = false;
                    this.hightLightNextParagraph = undefined;
                }
            }
            else {
                this.highlightTable(block, start, end);
            }
        }
    };
    /**
     * Get start line widget
     * @private
     * @returns {ElementInfo}
     */
    Selection.prototype.getStartLineWidget = function (paragraph, start, startElement, selectionStartIndex) {
        var offset = paragraph === start.paragraph ? start.offset : this.getStartOffset(paragraph);
        var startInlineObj = undefined;
        if (paragraph === start.paragraph) {
            startInlineObj = start.currentWidget.getInline(offset, selectionStartIndex);
        }
        else {
            startInlineObj = paragraph.firstChild.getInline(offset, selectionStartIndex);
        }
        startElement = startInlineObj.element; //return selectionStartIndex
        selectionStartIndex = startInlineObj.index;
        if (startElement instanceof FieldElementBox) {
            var inlineInfo = this.getRenderedInline(startElement, selectionStartIndex);
            startElement = inlineInfo.element;
            selectionStartIndex = inlineInfo.index;
        }
        if (offset === this.getParagraphLength(start.paragraph) + 1) {
            selectionStartIndex++;
        }
        return {
            'index': selectionStartIndex, 'element': startElement
        };
    };
    /**
     * Get end line widget
     * @private
     */
    Selection.prototype.getEndLineWidget = function (end, endElement, selectionEndIndex) {
        var endInlineObj = end.currentWidget.getInline(end.offset, selectionEndIndex);
        endElement = endInlineObj.element; //return selection end index
        selectionEndIndex = endInlineObj.index;
        if (endElement instanceof FieldElementBox) {
            var inlineInfo = this.getRenderedInline(endElement, selectionEndIndex);
            endElement = inlineInfo.element;
            selectionEndIndex = inlineInfo.index;
        }
        var lineIndex = end.paragraph.childWidgets.indexOf(end.currentWidget);
        if (lineIndex === end.paragraph.childWidgets.length - 1 && end.offset === this.getLineLength(end.currentWidget) + 1) {
            selectionEndIndex = endElement ? endElement.length + 1 : 1;
        }
        return { 'index': selectionEndIndex, 'element': endElement };
    };
    /**
     * Get line widget
     * @private
     */
    Selection.prototype.getLineWidgetInternal = function (line, offset, moveToNextLine) {
        var lineWidget = undefined;
        if (line.children.length === 0 && line instanceof LineWidget) {
            lineWidget = line;
        }
        else {
            var indexInInline = 0;
            var inlineInfo = line.getInline(offset, indexInInline);
            var inline = inlineInfo.element;
            indexInInline = inlineInfo.index;
            lineWidget = inline instanceof ElementBox ? inline.line
                : this.getLineWidgetInternalInline(inline, indexInInline, moveToNextLine);
        }
        return lineWidget;
    };
    /**
     * Get last line widget
     * @private
     */
    Selection.prototype.getLineWidgetParagraph = function (offset, line) {
        var linewidget = undefined;
        if (line.children.length === 0) {
            linewidget = line;
        }
        else {
            var indexInInline = 0;
            var inlineInfo = line.getInline(offset, indexInInline);
            var inline = inlineInfo.element;
            indexInInline = inlineInfo.index;
            linewidget = this.getLineWidget(inline, indexInInline);
        }
        return linewidget;
    };
    /**
     * Highlight selected cell
     * @private
     */
    Selection.prototype.highlightCells = function (table, startCell, endCell) {
        var start = this.getCellLeft(startCell.ownerRow, startCell);
        var end = start + startCell.cellFormat.cellWidth;
        var endCellLeft = this.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        if (start > endCellLeft) {
            start = endCellLeft;
        }
        if (end < endCellRight) {
            end = endCellRight;
        }
        if (start > this.upDownSelectionLength) {
            start = this.upDownSelectionLength;
        }
        if (end < this.upDownSelectionLength) {
            end = this.upDownSelectionLength;
        }
        var tableWidgetCollection = table.getSplitWidgets();
        var startTableIndex = tableWidgetCollection.indexOf(startCell.ownerRow.ownerTable);
        var endTableIndex = tableWidgetCollection.indexOf(endCell.ownerRow.ownerTable);
        if (startTableIndex === endTableIndex) {
            var count = table.childWidgets.indexOf(endCell.ownerRow);
            for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
                this.highlightRow(table.childWidgets[i], start, end);
            }
        }
        else {
            var startRowIndex = 0;
            var endRowIndex = 0;
            for (var i = startTableIndex; i <= endTableIndex; i++) {
                table = tableWidgetCollection[i];
                if (i === startTableIndex) {
                    startRowIndex = table.childWidgets.indexOf(startCell.ownerRow);
                }
                else {
                    startRowIndex = 0;
                }
                if (i === endTableIndex) {
                    endRowIndex = table.childWidgets.indexOf(endCell.ownerRow);
                }
                else {
                    endRowIndex = table.childWidgets.length - 1;
                }
                for (var j = startRowIndex; j <= endRowIndex; j++) {
                    this.highlightRow(table.childWidgets[j], start, end);
                }
            }
        }
    };
    /**
     * highlight selected table
     *
     * @private
     */
    Selection.prototype.highlightTable = function (table, start, end) {
        this.highlightInternal(table.childWidgets[0], start, end);
        if (!end.paragraph.isInsideTable //Selection end is outside the table cell.
            || !table.contains(end.paragraph.associatedCell)) { //Selection end is not inside the current table.
            this.highlightNextBlock(table, start, end);
        }
    };
    /**
     * Get cell left
     *
     * @private
     */
    Selection.prototype.getCellLeft = function (row, cell) {
        var left = 0;
        left += cell.x - cell.margin.left;
        return left;
    };
    /**
     * Get next paragraph for row
     *
     * @private
     */
    Selection.prototype.getNextParagraphRow = function (row) {
        if (!isNullOrUndefined(row.nextRenderedWidget)) {
            var cell = row.nextRenderedWidget.childWidgets[0];
            var block = cell.childWidgets[0];
            if (isNullOrUndefined(block)) {
                return this.getNextParagraphCell(cell);
            }
            return this.documentHelper.getFirstParagraphBlock(block);
        }
        return this.getNextParagraphBlock(row.ownerTable);
    };
    /**
     * Get previous paragraph from row
     *
     * @private
     */
    Selection.prototype.getPreviousParagraphRow = function (row) {
        if (!isNullOrUndefined(row.previousRenderedWidget)) {
            var cell = row.previousRenderedWidget.lastChild;
            var block = cell.lastChild ? cell.lastChild : (cell.previousSplitWidget).lastChild;
            return this.documentHelper.getLastParagraphBlock(block);
        }
        return this.getPreviousParagraphBlock(row.ownerTable);
    };
    /**
     * Return true if row contain cell
     *
     * @private
     */
    Selection.prototype.containsRow = function (row, tableCell) {
        if (row.childWidgets.indexOf(tableCell) !== -1) {
            return true;
        }
        while (tableCell.ownerTable.isInsideTable) {
            if (row.childWidgets.indexOf(tableCell) !== -1) {
                return true;
            }
            tableCell = tableCell.ownerTable.associatedCell;
        }
        return row.childWidgets.indexOf(tableCell) !== -1;
    };
    /**
     * Highlight selected row
     *
     * @private
     */
    Selection.prototype.highlightRow = function (row, start, end) {
        for (var i = 0; i < row.childWidgets.length; i++) {
            var left = this.getCellLeft(row, row.childWidgets[i]);
            if (HelperMethods.round(start, 2) <= HelperMethods.round(left, 2) &&
                HelperMethods.round(left, 2) < HelperMethods.round(end, 2)) {
                this.highlightCellWidget(row.childWidgets[i]);
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.highlightInternal = function (row, start, end) {
        for (var i = 0; i < row.childWidgets.length; i++) {
            this.highlightCellWidget(row.childWidgets[i]);
        }
        if (end.paragraph.isInsideTable && this.containsRow(row, end.paragraph.associatedCell)) {
            return;
        }
        else if (row.nextRenderedWidget instanceof TableRowWidget) {
            this.highlightInternal(row.nextRenderedWidget, start, end);
        }
    };
    /**
     * Get last paragraph in cell
     *
     * @private
     */
    Selection.prototype.getLastParagraph = function (cell) {
        while (cell.nextSplitWidget) {
            if (cell.nextSplitWidget.childWidgets.length > 0) {
                cell = cell.nextSplitWidget;
            }
            else {
                break;
            }
        }
        var lastBlock;
        if (cell.childWidgets.length > 0) {
            lastBlock = cell.lastChild;
        }
        else {
            lastBlock = cell.previousSplitWidget.lastChild;
        }
        return this.documentHelper.getLastParagraphBlock(lastBlock);
    };
    /**
     * Return true is source cell contain cell
     *
     * @private
     */
    Selection.prototype.containsCell = function (sourceCell, cell) {
        if (sourceCell.equals(cell)) {
            return true;
        }
        while (cell.ownerTable.isInsideTable) {
            if (sourceCell.equals(cell.ownerTable.associatedCell)) {
                return true;
            }
            cell = cell.ownerTable.associatedCell;
        }
        return false;
    };
    /**
     * Return true if cell is selected
     *
     * @private
     */
    Selection.prototype.isCellSelected = function (cell, startPosition, endPosition) {
        var lastParagraph = this.getLastParagraph(cell);
        var isAtCellEnd = lastParagraph === endPosition.paragraph && endPosition.offset === this.getParagraphLength(lastParagraph) + 1;
        return isAtCellEnd || (!this.containsCell(cell, startPosition.paragraph.associatedCell) ||
            !this.containsCell(cell, endPosition.paragraph.associatedCell));
    };
    /**
     * Return Container cell
     *
     * @private
     */
    Selection.prototype.getContainerCellOf = function (cell, tableCell) {
        while (cell.ownerTable.isInsideTable) {
            if (cell.ownerTable.contains(tableCell)) {
                return cell;
            }
            cell = cell.ownerTable.associatedCell;
        }
        return cell;
    };
    /**
     * Get Selected cell
     *
     * @private
     */
    Selection.prototype.getSelectedCell = function (cell, containerCell) {
        if (cell.ownerTable.equals(containerCell.ownerTable)) {
            return cell;
        }
        while (cell.ownerTable.isInsideTable) {
            if (cell.ownerTable.associatedCell.equals(containerCell)) {
                return cell;
            }
            cell = cell.ownerTable.associatedCell;
        }
        return cell;
    };
    /**
     * @private
     */
    Selection.prototype.getSelectedCells = function () {
        var cells = [];
        for (var i = 0; i < this.selectedWidgets.keys.length; i++) {
            var widget = this.selectedWidgets.keys[i];
            if (widget instanceof TableCellWidget) {
                cells.push(widget);
            }
        }
        return cells;
    };
    /**
     * @private
     * @return
     */
    Selection.prototype.getLevelFormatNumber = function () {
        var numberFormat = '%';
        numberFormat = numberFormat + (((this.paragraphFormat.listLevelNumber <= 0) ? 0 : this.paragraphFormat.listLevelNumber) + 1) + '.';
        return numberFormat;
    };
    /**
     * Get Next paragraph from cell
     *
     * @private
     */
    Selection.prototype.getNextParagraphCell = function (cell) {
        if (cell.nextRenderedWidget && cell.nextRenderedWidget instanceof TableCellWidget) {
            if (cell.ownerRow.index === cell.nextRenderedWidget.rowIndex) {
                //Return first paragraph in cell.
                cell = cell.nextRenderedWidget;
                if (cell.getSplitWidgets()[0] instanceof TableCellWidget) {
                    cell = cell.getSplitWidgets()[0];
                }
                var block = cell.firstChild;
                if (block) {
                    return this.documentHelper.getFirstParagraphBlock(block);
                }
                else {
                    return this.getNextParagraphCell(cell);
                }
            }
            else {
                cell = cell.nextRenderedWidget;
                return this.getNextParagraphCell(cell);
            }
        }
        else if (cell.nextSplitWidget && cell.nextSplitWidget.childWidgets.length === 0) {
            cell = cell.getSplitWidgets().pop();
        }
        return this.getNextParagraphRow(cell.containerWidget);
    };
    /**
     * Get previous paragraph from cell
     *
     * @private
     */
    Selection.prototype.getPreviousParagraphCell = function (cell) {
        if (!isNullOrUndefined(cell.previousRenderedWidget) && cell.previousRenderedWidget instanceof TableCellWidget) {
            cell = cell.previousRenderedWidget;
            var block = cell.lastChild;
            return this.documentHelper.getLastParagraphBlock(block);
        }
        return this.getPreviousParagraphRow(cell.ownerRow);
    };
    /**
     * Get cell's container cell
     *
     * @private
     */
    Selection.prototype.getContainerCell = function (cell) {
        while (!isNullOrUndefined(cell.ownerTable) && cell.ownerTable.isInsideTable) {
            cell = cell.ownerTable.associatedCell;
        }
        return cell;
    };
    /**
     * Highlight selected cell
     *
     * @private
     */
    Selection.prototype.highlightCell = function (cell, selection, start, end) {
        if (end.paragraph.isInsideTable) {
            var containerCell = this.getContainerCellOf(cell, end.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                var startCell = this.getSelectedCell(cell, containerCell);
                var endCell = this.getSelectedCell(end.paragraph.associatedCell, containerCell);
                if (this.containsCell(containerCell, end.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (this.isCellSelected(containerCell, start, end)) {
                        this.highlightCellWidget(containerCell);
                    }
                    else {
                        if (startCell === containerCell) {
                            this.highlight(start.paragraph, start, end);
                            if (this.isHighlightNext) {
                                this.highlightNextBlock(this.hightLightNextParagraph, start, end);
                                this.isHighlightNext = false;
                                this.hightLightNextParagraph = undefined;
                            }
                        }
                        else {
                            this.highlightContainer(startCell, start, end);
                        }
                    }
                }
                else {
                    //Selection end is not in container cell.
                    this.highlightCellWidget(containerCell);
                    if (containerCell.ownerRow.equals(endCell.ownerRow)) {
                        //Highlight other selected cells in current row.
                        startCell = containerCell;
                        while (!isNullOrUndefined(startCell.nextRenderedWidget)) {
                            startCell = startCell.nextRenderedWidget;
                            this.highlightCellWidget(startCell);
                            if (startCell === endCell) {
                                break;
                            }
                        }
                    }
                    else {
                        this.highlightCells(containerCell.ownerTable, containerCell, endCell);
                    }
                }
            }
            else {
                this.highlightContainer(containerCell, start, end);
            }
        }
        else {
            var cell1 = this.getContainerCell(cell);
            this.highlightContainer(cell1, start, end);
        }
    };
    /**
     * @private
     */
    Selection.prototype.highlightContainer = function (cell, start, end) {
        this.highlightInternal(cell.containerWidget, start, end);
        this.highlightNextBlock(cell.ownerTable.getSplitWidgets().pop(), start, end);
    };
    /**
     * Get previous valid element
     *
     * @private
     */
    Selection.prototype.getPreviousValidElement = function (inline) {
        var previousValidInline = undefined;
        if (this.documentHelper.isFormFillProtectedMode && inline.fieldType === 2) {
            return inline;
        }
        while (inline instanceof FieldElementBox) {
            if (HelperMethods.isLinkedFieldCharacter(inline)) {
                if (inline instanceof FieldElementBox && inline.fieldType === 0) {
                    previousValidInline = inline;
                }
                else if (inline instanceof FieldElementBox && inline.fieldType === 1) {
                    previousValidInline = inline;
                    if (isNullOrUndefined(inline.fieldSeparator)) {
                        inline = inline.fieldBegin;
                        previousValidInline = inline;
                    }
                }
                else {
                    inline = inline.fieldBegin;
                    previousValidInline = inline;
                }
            }
            inline = inline.previousNode;
        }
        return isNullOrUndefined(previousValidInline) ? inline : previousValidInline;
    };
    /**
     * Return next valid inline with index
     *
     * @private
     */
    Selection.prototype.validateTextPosition = function (inline, index) {
        var nextNode = inline.nextNode;
        if (inline.length === index && (nextNode instanceof FieldElementBox
            || (!(inline instanceof ImageElementBox) && (nextNode instanceof BookmarkElementBox || nextNode instanceof CommentCharacterElementBox)))) {
            //If inline is last item within field, then set field end as text position.
            var nextInline = this.documentHelper.getNextValidElement(inline.nextNode);
            if ((nextInline instanceof FieldElementBox && nextInline.fieldType === 1)
                || (nextInline instanceof BookmarkElementBox && nextInline.bookmarkType === 1)
                || (nextInline instanceof CommentCharacterElementBox && nextInline.commentType === 1)) {
                inline = nextInline;
                index = this.documentHelper.isFormFillProtectedMode ? 0 : 1;
            }
        }
        else if (index === 0 && inline.previousNode instanceof FieldElementBox) {
            var prevInline = this.getPreviousValidElement(inline.previousNode);
            inline = prevInline;
            index = inline instanceof FieldElementBox ? 0 : inline.length;
            if (inline instanceof FieldElementBox && inline.fieldType === 1) {
                index++;
            }
        }
        return { 'element': inline, 'index': index };
    };
    /**
     * Get inline physical location
     *
     * @private
     */
    Selection.prototype.getPhysicalPositionInline = function (inline, index, moveNextLine) {
        var element = undefined;
        element = this.getElementBox(inline, index, moveNextLine).element;
        var lineWidget = undefined;
        if (isNullOrUndefined(element) || isNullOrUndefined(element.line)) {
            if (inline instanceof FieldElementBox && inline.fieldType === 1) {
                element = inline;
            }
            else {
                if (inline instanceof FieldElementBox || inline instanceof BookmarkElementBox || inline instanceof CommentCharacterElementBox || inline instanceof ContentControl) {
                    return this.getFieldCharacterPosition(inline);
                }
                return new Point(0, 0);
            }
        }
        var margin = element.margin;
        var top = 0;
        var left = 0;
        if (element instanceof TextElementBox && element.text === '\v' && isNullOrUndefined(inline.nextNode) && !this.owner.editorModule.handledEnter) {
            lineWidget = this.getNextLineWidget(element.line.paragraph, element);
            index = 0;
        }
        else {
            lineWidget = element.line;
        }
        top = this.getTop(lineWidget);
        if (element instanceof ImageElementBox && element.textWrappingStyle === 'Inline') {
            var format = element.line.paragraph.characterFormat;
            var previousInline = this.getPreviousTextElement(inline);
            if (!isNullOrUndefined(previousInline)) {
                format = previousInline.characterFormat;
            }
            else {
                var nextInline = this.getNextTextElement(inline);
                if (!isNullOrUndefined(nextInline)) {
                    format = nextInline.characterFormat;
                }
            }
            var measureObj = this.documentHelper.textHelper.getHeight(format);
            if (element.margin.top + element.height - measureObj.BaselineOffset > 0) {
                top += element.margin.top + element.height - measureObj.BaselineOffset;
            }
        }
        else if (!(element instanceof FieldElementBox)) {
            top += margin.top > 0 ? margin.top : 0;
        }
        left = (isNullOrUndefined(element) || isNullOrUndefined(lineWidget)) ? 0 : this.getLeftInternal(lineWidget, element, index);
        return new Point(left, top);
    };
    /**
     * Get field character position
     *
     * @private
     */
    Selection.prototype.getFieldCharacterPosition = function (firstInline) {
        var nextValidInline = this.documentHelper.getNextValidElementForField(firstInline);
        //If field separator/end exists at end of paragraph, then move to next paragraph.
        if (isNullOrUndefined(nextValidInline)) {
            var nextParagraph = firstInline.line.paragraph;
            return this.getEndPosition(nextParagraph);
        }
        else {
            return this.getPhysicalPositionInline(nextValidInline, 0, true);
        }
    };
    /**
     * @private
     */
    Selection.prototype.isRenderBookmarkAtEnd = function (bookmark) {
        var bookmarkElement;
        if (bookmark.bookmarkType == 1) {
            bookmarkElement = bookmark.reference;
        }
        else {
            bookmarkElement = bookmark;
        }
        if (bookmarkElement && isNullOrUndefined(bookmarkElement.properties)) {
            var endCell = bookmarkElement.reference ? bookmarkElement.reference.paragraph.associatedCell : undefined;
            if (isNullOrUndefined(endCell)) {
                return false;
            }
            var lastRow = bookmarkElement.reference ? bookmarkElement.reference.paragraph.associatedCell.ownerRow : undefined;
            var lastCell = lastRow ? lastRow.childWidgets[lastRow.childWidgets.length - 1] : undefined;
            if (isNullOrUndefined(lastCell)) {
                return false;
            }
            if (endCell == lastCell && !(bookmark.bookmarkType === 1 && !isNullOrUndefined(bookmark.line) && bookmark.line.children.indexOf(bookmark) !== bookmark.line.children.length - 1)) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    };
    /**
     * Get paragraph end position
     *
     * @private
     */
    Selection.prototype.getEndPosition = function (widget) {
        var left = widget.x;
        var top = widget.y;
        var lineWidget = undefined;
        if (widget.childWidgets.length > 0) {
            lineWidget = widget.childWidgets[widget.childWidgets.length - 1];
            if (widget.paragraphFormat.bidi) {
                left = this.getLeft(lineWidget);
            }
            else {
                left += this.getWidth(lineWidget, false);
            }
        }
        if (!isNullOrUndefined(lineWidget)) {
            top = this.getTop(lineWidget);
        }
        var topMargin = 0;
        var bottomMargin = 0;
        var size = this.getParagraphMarkSize(widget, topMargin, bottomMargin);
        return new Point(left, top + size.topMargin);
    };
    /**
     * Get element box
     *
     * @private
     */
    Selection.prototype.getElementBox = function (currentInline, index, moveToNextLine) {
        var elementBox = undefined;
        if (!(currentInline instanceof FieldElementBox || currentInline instanceof BookmarkElementBox || currentInline instanceof CommentCharacterElementBox || currentInline instanceof ContentControl)) {
            elementBox = currentInline;
        }
        return { 'element': elementBox, 'index': index };
    };
    /**
     * @private
     */
    Selection.prototype.getPreviousTextElement = function (inline) {
        if (inline.previousNode instanceof TextElementBox) {
            return inline.previousNode;
        }
        if (!isNullOrUndefined(inline.previousNode)) {
            return this.getPreviousTextElement(inline.previousNode);
        }
        return undefined;
    };
    /**
     * Get next text inline
     *
     * @private
     */
    Selection.prototype.getNextTextElement = function (inline) {
        if (inline.nextNode instanceof TextElementBox) {
            return inline.nextNode;
        }
        if (!isNullOrUndefined(inline.nextNode)) {
            return this.getNextTextElement(inline.nextNode);
        }
        return undefined;
    };
    /**
     * @private
     */
    Selection.prototype.getNextRenderedElementBox = function (inline, indexInInline) {
        if (inline instanceof FieldElementBox) {
            var fieldBegin = inline;
            if (fieldBegin.fieldType === 0) {
                inline = this.getRenderedField(fieldBegin);
                if (fieldBegin === inline) {
                    return fieldBegin;
                }
            }
            indexInInline = 1;
        }
        while (!isNullOrUndefined(inline) && indexInInline === inline.length && inline.nextNode instanceof FieldElementBox) {
            var nextValidInline = this.documentHelper.getNextValidElement((inline.nextNode));
            if (nextValidInline instanceof FieldElementBox && nextValidInline.fieldType === 0) {
                var fieldBegin = nextValidInline;
                inline = this.getRenderedField(fieldBegin);
                if (!isNullOrUndefined(inline) && fieldBegin === inline) {
                    return fieldBegin;
                }
                indexInInline = 1;
            }
            else {
                inline = nextValidInline;
            }
        }
        return inline;
    };
    /**
     * @private
     */
    Selection.prototype.getElementBoxInternal = function (inline, index) {
        var element = undefined;
        element = inline;
        return {
            'element': element, 'index': index
        };
    };
    /**
     * Get Line widget
     *
     * @private
     */
    Selection.prototype.getLineWidget = function (inline, index) {
        return this.getLineWidgetInternalInline(inline, index, true);
    };
    /**
     * @private
     */
    Selection.prototype.getLineWidgetInternalInline = function (inline, index, moveToNextLine) {
        var elementObj = this.getElementBox(inline, index, moveToNextLine);
        var element = elementObj.element; //return index
        index = elementObj.index;
        if (!isNullOrUndefined(element)) {
            if (moveToNextLine && element instanceof TextElementBox && element.text === '\v' && index === 1) {
                return this.getNextLineWidget(element.line.paragraph, element);
            }
            else {
                return element.line;
            }
        }
        var startInline = inline;
        //ToDo: Check previous inline here.
        var nextValidInline = this.documentHelper.getNextValidElementForField(startInline);
        //If field separator/end exists at end of paragraph, then move to next paragraph.
        if (isNullOrUndefined(nextValidInline)) {
            var lineWidget = undefined;
            var widget = startInline.line.paragraph;
            if (widget.childWidgets.length > 0) {
                lineWidget = widget.childWidgets[widget.childWidgets.length - 1];
            }
            return lineWidget;
        }
        else {
            return this.getLineWidget(nextValidInline, 0);
        }
    };
    /**
     * Get next line widget
     *
     * @private
     */
    Selection.prototype.getNextLineWidget = function (paragraph, element) {
        var lineWidget = undefined;
        var widget = paragraph;
        if (widget.childWidgets.length > 0) {
            var widgetIndex = widget.childWidgets.indexOf(element.line);
            if (widgetIndex === widget.childWidgets.length - 1) {
                widget = paragraph;
                // widget = paragraph.leafWidgets[paragraph.leafWidgets.length - 1];
                widgetIndex = -1;
            }
            else if (widgetIndex > widget.childWidgets.length - 1) {
                widget = this.getNextParagraphBlock(paragraph);
                widgetIndex = -1;
            }
            else if (widgetIndex < 0) {
                // widget = paragraph.leafWidgets[paragraph.leafWidgets.length - 1];
                widget = paragraph;
                widgetIndex = widget.childWidgets.indexOf(element.line);
            }
            lineWidget = widget.childWidgets[widgetIndex + 1];
        }
        return lineWidget;
    };
    Selection.prototype.getCaretHeight = function (inline, index, format, isEmptySelection, topMargin, isItalic) {
        var elementBoxInfo = this.getElementBox(inline, index, false);
        var element = elementBoxInfo.element;
        var currentInline = inline;
        if (isNullOrUndefined(element)) {
            if (currentInline instanceof FieldElementBox) {
                return this.getFieldCharacterHeight(currentInline, format, isEmptySelection, topMargin, isItalic);
            }
            return { 'height': this.documentHelper.textHelper.getHeight(format).Height, 'topMargin': topMargin, 'isItalic': isItalic };
        }
        var margin = element.margin;
        var heightElement = element.height;
        var maxLineHeight = 0;
        if (element instanceof ImageElementBox) {
            var previousInline = this.getPreviousTextElement(inline);
            var nextInline = this.getNextTextElement(inline);
            if (isNullOrUndefined(previousInline) && isNullOrUndefined(nextInline)) {
                var top_2 = 0;
                var bottom = 0;
                var paragarph = inline.line.paragraph;
                var sizeInfo = this.getParagraphMarkSize(paragarph, top_2, bottom);
                top_2 = sizeInfo.topMargin;
                bottom = sizeInfo.bottomMargin;
                maxLineHeight = sizeInfo.height;
                isItalic = paragarph.characterFormat.italic;
                if (!isEmptySelection) {
                    maxLineHeight += this.documentHelper.layout.getAfterSpacing(paragarph);
                }
            }
            else if (isNullOrUndefined(previousInline)) {
                isItalic = nextInline.characterFormat.italic;
                return this.getCaretHeight(nextInline, 0, nextInline.characterFormat, isEmptySelection, topMargin, isItalic);
            }
            else {
                if (!isNullOrUndefined(nextInline) && element instanceof ImageElementBox) {
                    //Calculates the caret size using image character format.
                    var textSizeInfo = this.documentHelper.textHelper.getHeight(element.characterFormat);
                    var charHeight = textSizeInfo.Height;
                    var baselineOffset = textSizeInfo.BaselineOffset;
                    maxLineHeight = (element.margin.top < 0 && baselineOffset > element.margin.top + element.height) ? element.margin.top + element.height + charHeight - baselineOffset : charHeight;
                    if (!isEmptySelection) {
                        maxLineHeight += element.margin.bottom;
                    }
                }
                else {
                    isItalic = previousInline.characterFormat.italic;
                    return this.getCaretHeight(previousInline, previousInline.length, previousInline.characterFormat, isEmptySelection, topMargin, isItalic);
                }
            }
        }
        else {
            var baselineAlignment = this.characterFormat.baselineAlignment;
            var elementHeight = heightElement;
            if (baselineAlignment !== 'Normal' && isEmptySelection) {
                //Set the caret height as sub/super script text height and updates the top margin for sub script text.
                elementHeight = elementHeight / 1.5;
                if (baselineAlignment === 'Subscript') {
                    topMargin = heightElement - elementHeight;
                }
            }
            maxLineHeight = (margin.top < 0 ? margin.top : 0) + elementHeight;
            if (!isEmptySelection) {
                maxLineHeight += margin.bottom;
            }
        }
        if (!isEmptySelection) {
            return { 'height': maxLineHeight, 'topMargin': topMargin, 'isItalic': isItalic };
        }
        var height = this.documentHelper.textHelper.getHeight(format).Height;
        if (height > maxLineHeight) {
            height = maxLineHeight;
        }
        return { 'height': height, 'topMargin': topMargin, 'isItalic': isItalic };
    };
    Selection.prototype.getFieldCharacterHeight = function (startInline, format, isEmptySelection, topMargin, isItalic) {
        var nextValidInline = this.documentHelper.getNextValidElementForField(startInline);
        //If field separator/end exists at end of paragraph, then move to next paragraph.
        if (isNullOrUndefined(nextValidInline)) {
            var nextParagraph = startInline.line.paragraph;
            var height = this.documentHelper.textHelper.getParagraphMarkSize(format).Height;
            var top_3 = 0;
            var bottom = 0;
            var sizeInfo = this.getParagraphMarkSize(nextParagraph, top_3, bottom);
            var maxLineHeight = sizeInfo.height;
            top_3 = sizeInfo.topMargin;
            bottom = sizeInfo.bottomMargin;
            if (!isEmptySelection) {
                maxLineHeight += bottom;
                return { 'height': maxLineHeight, 'topMargin': topMargin, 'isItalic': isItalic };
            }
            if (height > maxLineHeight) {
                height = maxLineHeight;
            }
            return { 'height': height, 'topMargin': topMargin, 'isItalic': isItalic };
        }
        else {
            return this.getCaretHeight(nextValidInline, 0, format, isEmptySelection, topMargin, isItalic);
        }
    };
    /**
     * Get rendered inline
     *
     * @private
     */
    //FieldCharacter
    Selection.prototype.getRenderedInline = function (inline, inlineIndex) {
        if (this.documentHelper.isFormFillProtectedMode && inline.fieldType === 2) {
            return { 'element': inline, 'index': inlineIndex };
        }
        var prevInline = this.getPreviousValidElement(inline);
        while (prevInline instanceof FieldElementBox) {
            prevInline = this.getPreviousTextElement(prevInline);
            if (prevInline instanceof FieldElementBox) {
                prevInline = prevInline.previousNode;
            }
        }
        if (!isNullOrUndefined(prevInline)) {
            inlineIndex = prevInline.length;
            return { 'element': prevInline, 'index': inlineIndex };
        }
        inlineIndex = 0;
        var nextInline = this.getNextRenderedElementBox(inline, 0);
        if (nextInline instanceof FieldElementBox && nextInline.fieldType === 0) {
            nextInline = nextInline.fieldSeparator;
            nextInline = nextInline.nextNode;
            while (nextInline instanceof FieldElementBox) {
                if (nextInline instanceof FieldElementBox && nextInline.fieldType === 0
                    && HelperMethods.isLinkedFieldCharacter(nextInline)) {
                    if (isNullOrUndefined(nextInline.fieldSeparator)) {
                        nextInline = nextInline.fieldEnd;
                    }
                    else {
                        nextInline = nextInline.fieldSeparator;
                    }
                }
                nextInline = nextInline.nextNode;
            }
        }
        return { 'element': nextInline, 'index': inlineIndex };
    };
    //Field Begin
    /**
     * Get rendered field
     *
     * @private
     */
    Selection.prototype.getRenderedField = function (fieldBegin) {
        var inline = fieldBegin;
        if (isNullOrUndefined(fieldBegin.fieldSeparator)) {
            inline = fieldBegin.fieldEnd;
        }
        else {
            inline = fieldBegin.fieldSeparator;
            var paragraph = inline.line.paragraph;
            if (paragraph === fieldBegin.fieldEnd.line.paragraph
                && !this.hasValidInline(paragraph, inline, fieldBegin.fieldEnd)) {
                inline = fieldBegin.fieldEnd;
            }
            else {
                return inline;
            }
        }
        return inline;
    };
    /**
     * Return true is inline is tha last inline
     *
     * @private
     */
    Selection.prototype.isLastRenderedInline = function (inline, index) {
        while (index === inline.length && inline.nextNode instanceof FieldElementBox) {
            var nextValidInline = this.documentHelper.getNextValidElement(inline.nextNode);
            index = 0;
            if (nextValidInline instanceof FieldElementBox && nextValidInline.fieldType === 0) {
                inline = nextValidInline;
            }
            if (inline instanceof FieldElementBox && inline.fieldType === 0 && !isNullOrUndefined(inline.fieldEnd)) {
                var fieldBegin = inline;
                if (isNullOrUndefined(fieldBegin.fieldSeparator)) {
                    inline = fieldBegin.fieldEnd;
                    index = 1;
                }
                else {
                    inline = fieldBegin.fieldSeparator;
                    var paragraph = inline.line.paragraph;
                    index = 1;
                    if (paragraph === fieldBegin.fieldEnd.line.paragraph
                        && !this.hasValidInline(paragraph, inline, fieldBegin.fieldEnd)) {
                        inline = fieldBegin.fieldEnd;
                    }
                    else {
                        break;
                    }
                }
            }
        }
        return index === inline.length && isNullOrUndefined(inline.nextNode);
    };
    /**
     * Get page
     *
     * @private
     */
    Selection.prototype.getPage = function (widget) {
        var page = undefined;
        if (widget.containerWidget instanceof TextFrame) {
            var shape = widget.containerWidget.containerShape;
            if (shape.line) {
                page = this.getPage(shape.line.paragraph);
            }
        }
        else if (widget.containerWidget instanceof BlockContainer) {
            var bodyWidget = widget.containerWidget;
            page = widget.containerWidget.page;
        }
        else if (!isNullOrUndefined(widget.containerWidget)) {
            page = this.getPage(widget.containerWidget);
        }
        return page;
    };
    /**
     * Clear Selection highlight
     *
     * @private
     */
    Selection.prototype.clearSelectionHighlightInSelectedWidgets = function () {
        var isNonEmptySelection = false;
        var widgets = this.selectedWidgets.keys;
        if (!this.viewer.documentHelper.isDragStarted) {
            for (var i = 0; i < widgets.length; i++) {
                this.removeSelectionHighlight(widgets[i]);
                isNonEmptySelection = true;
            }
            this.selectedWidgets.clear();
        }
        return isNonEmptySelection;
    };
    /**
     * Clear selection highlight
     *
     * @private
     */
    Selection.prototype.clearChildSelectionHighlight = function (widget) {
        for (var i = 0; i < widget.childWidgets.length; i++) {
            if (widget.childWidgets[i] instanceof LineWidget) {
                this.clearSelectionHighlightLineWidget(widget.childWidgets[i]);
            }
            else if (widget.childWidgets[i] instanceof TableCellWidget) {
                this.clearSelectionHighlight(widget.childWidgets[i]);
            }
            else if (widget.childWidgets[i] instanceof Widget) {
                this.clearChildSelectionHighlight(widget.childWidgets[i]);
            }
        }
    };
    /**
     * Get line widget from paragraph widget
     *
     * @private
     */
    //Body Widget 
    Selection.prototype.getLineWidgetBodyWidget = function (widget, point, isGetFirstChild) {
        isGetFirstChild = isNullOrUndefined(isGetFirstChild) ? true : isGetFirstChild;
        var bodyWgt = widget;
        if (bodyWgt instanceof BlockContainer) {
            for (var x = 0; x < bodyWgt.floatingElements.length; x++) {
                var floatWidget = bodyWgt.floatingElements[x];
                if (floatWidget instanceof TableWidget) {
                    var floatWidgetWidth = floatWidget.getTableCellWidth();
                    if (point.x <= floatWidget.x + floatWidgetWidth && point.x >= floatWidget.x
                        && point.y <= floatWidget.y + floatWidget.height && point.y >= floatWidget.y) {
                        return this.getLineWidgetTableWidget(floatWidget, point);
                    }
                }
                else if (floatWidget instanceof ShapeBase && floatWidget.textWrappingStyle !== 'Behind' && floatWidget.x <= point.x && (floatWidget.x + floatWidget.width) >= point.x
                    && floatWidget.y <= point.y && (floatWidget.y + floatWidget.height) >= point.y) {
                    return floatWidget.line;
                }
            }
        }
        if (widget instanceof FootNoteWidget) {
            var selectionBody = void 0;
            var isFit = false;
            for (var j = 0; j < widget.bodyWidgets.length; j++) {
                if (widget.sectionFormat.columns.length <= 1) {
                    for (var k = 0; k < widget.bodyWidgets[j].childWidgets.length; k++) {
                        var footChild = widget.bodyWidgets[j].childWidgets[k];
                        if (footChild instanceof Widget && footChild.y <= point.y
                            && (footChild.y + footChild.height) >= point.y) {
                            if (footChild instanceof ParagraphWidget) {
                                return this.getLineWidgetParaWidget(footChild, point);
                            }
                            else {
                                return this.getLineWidgetTableWidget(footChild, point);
                            }
                        }
                    }
                }
                else {
                    var bodyWidget = widget.bodyWidgets[j];
                    if (bodyWidget.firstChild.x + bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].width >= point.x && bodyWidget.firstChild.x <= point.x && bodyWidget.firstChild.y <= point.y && this.documentHelper.layout.getNextWidgetHeight(bodyWidget) >= point.y) {
                        selectionBody = bodyWidget;
                    }
                    else if (bodyWidget.firstChild.x + bodyWidget.sectionFormat.columns[bodyWidget.columnIndex].width < point.x && bodyWidget.firstChild.y <= point.y && this.documentHelper.layout.getNextWidgetHeight(bodyWidget) >= point.y) {
                        selectionBody = bodyWidget;
                    }
                    else if (widget.x > point.x && bodyWidget.firstChild.y <= point.y && this.documentHelper.layout.getNextWidgetHeight(bodyWidget) >= point.y && !isFit) {
                        selectionBody = bodyWidget;
                        isFit = true;
                    }
                    if (j === widget.bodyWidgets.length - 1 && !isNullOrUndefined(selectionBody)) {
                        for (var k = 0; k < selectionBody.childWidgets.length; k++) {
                            var footChild = selectionBody.childWidgets[k];
                            if (footChild instanceof Widget && footChild.y <= point.y
                                && (footChild.y + footChild.height) >= point.y) {
                                if (footChild instanceof ParagraphWidget) {
                                    return this.getLineWidgetParaWidget(footChild, point);
                                }
                                else {
                                    return this.getLineWidgetTableWidget(footChild, point);
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var childWidget = widget.childWidgets[i];
            if (childWidget instanceof FootNoteWidget) {
                return childWidget[i];
            }
            else {
                if (childWidget instanceof Widget && childWidget.y <= point.y
                    && (childWidget.y + childWidget.height) >= point.y) {
                    if (childWidget instanceof ParagraphWidget) {
                        // if ((childWidget as Widget).x <= point.x
                        // && ((childWidget as Widget).x + (childWidget as Widget).width) >= point.x) {
                        return this.getLineWidgetParaWidget(childWidget, point);
                        // }// return this.getLineWidgetParaWidget((childWidget as ParagraphWidget), point);
                    }
                    else {
                        var table = childWidget;
                        if (table.wrapTextAround) {
                            continue;
                        }
                        return this.getLineWidgetTableWidget(table, point);
                    }
                }
            }
        }
        var line = undefined;
        if (isGetFirstChild) {
            if (widget.childWidgets.length > 0) {
                var firstChild = widget.childWidgets[0];
                if (firstChild instanceof Widget && firstChild.y <= point.y) {
                    if (widget.childWidgets[widget.childWidgets.length - 1] instanceof ParagraphWidget) {
                        for (var i = 0; i < widget.childWidgets.length; i++) {
                            line = this.getLineWidgetParaWidget(widget.childWidgets[i], point);
                        }
                    }
                    else {
                        for (var i = 0; i < widget.childWidgets.length; i++) {
                            line = this.getLineWidgetTableWidget(widget.childWidgets[i], point);
                        }
                    }
                }
                else {
                    var childWidget = undefined;
                    if (firstChild instanceof Widget) {
                        childWidget = firstChild;
                    }
                    if (!isNullOrUndefined(childWidget)) {
                        if (childWidget instanceof ParagraphWidget) {
                            line = this.getLineWidgetParaWidget(firstChild, point);
                        }
                        else {
                            line = this.getLineWidgetTableWidget(firstChild, point);
                        }
                    }
                }
            }
        }
        return line;
    };
    //ParagraphWidget
    /**
     * Get line widget from paragraph widget
     *
     * @private
     */
    Selection.prototype.getLineWidgetParaWidget = function (widget, point) {
        var childWidgets = widget.childWidgets;
        var top = widget.y;
        for (var i = 0; i < childWidgets.length; i++) {
            var line = childWidgets[i];
            top += line.marginTop;
            var lineTotalHeight = line.height;
            if (line.nextLine && line.nextLine.marginTop > 0) {
                lineTotalHeight += line.nextLine.marginTop;
            }
            if (top <= point.y
                && (top + lineTotalHeight) >= point.y) {
                return line;
            }
            top += line.height;
        }
        var lineWidget = undefined;
        if (childWidgets.length > 0) {
            if (widget.y <= point.y) {
                lineWidget = childWidgets[childWidgets.length - 1];
            }
            else {
                lineWidget = childWidgets[0];
            }
        }
        return lineWidget;
    };
    Selection.prototype.highlightParagraph = function (widget, startIndex, endLine, endElement, endIndex, contentControl) {
        var top = 0;
        var width = 0;
        var isRtlText = false;
        var startElement = endElement;
        if (widget.paragraphFormat.bidi && endLine.children.indexOf(endElement) > 0) {
            startElement = endLine.children[0];
        }
        for (var i = startIndex; i < widget.childWidgets.length; i++) {
            var line = widget.childWidgets[i];
            if (i === startIndex) {
                top = this.getTop(line);
            }
            else {
                top += line.marginTop;
            }
            if (endElement instanceof TextElementBox) {
                isRtlText = endElement.isRightToLeft;
            }
            var left = this.getLeft(line);
            if (line === endLine) {
                //Selection ends in current line.
                var right = 0;
                // highlighting approach for normal and rtl text.
                if (isRtlText || widget.bidi) {
                    var elementBoxCollection = this.getElementsBackward(line, startElement, endElement, widget.bidi);
                    for (var i_2 = 0; i_2 < elementBoxCollection.length; i_2++) {
                        var element = elementBoxCollection[i_2];
                        var elementIsRTL = false;
                        if (element === endElement) {
                            right = this.getLeftInternal(line, element, element.length);
                        }
                        else {
                            var index = element instanceof TextElementBox ? element.length : 1;
                            right = this.getLeftInternal(line, element, index);
                        }
                        left = this.getLeftInternal(line, element, 0);
                        if (element instanceof TextElementBox) {
                            elementIsRTL = element.isRightToLeft;
                        }
                        width = Math.abs(right - left);
                        // Handled the paragraph mark highliting as special case.
                        if (element === endElement && element instanceof TextElementBox && endIndex > element.length) {
                            var paragraphMarkWidth = this.documentHelper.textHelper.getParagraphMarkSize(element.line.paragraph.characterFormat).Width;
                            if (!widget.bidi && elementIsRTL) {
                                right += paragraphMarkWidth;
                            }
                            else if (widget.bidi && !elementIsRTL) { // Paragrph and Selection ends in normal text
                                width -= paragraphMarkWidth;
                                // Highlight the element.
                                this.createHighlightBorder(line, width, left, top, true, contentControl);
                                // Highlight the paragraph mark of Bidi paragrph.
                                left = this.getLineStartLeft(line) - paragraphMarkWidth;
                                this.createHighlightBorder(line, paragraphMarkWidth, left, top, true, contentControl);
                                // continue to next element.
                                continue;
                            }
                        }
                        this.createHighlightBorder(line, width, elementIsRTL ? right : left, top, true, contentControl);
                    }
                    return;
                }
                else {
                    right = this.getLeftInternal(endLine, endElement, endIndex, true);
                    width = Math.abs(right - left);
                    this.createHighlightBorder(line, width, isRtlText ? right : left, top, false, contentControl);
                    return;
                }
            }
            else {
                width = this.getWidth(line, true) - (left - widget.x);
                // Highlight the paragrph mark for Bidi paragrph.
                if (widget.bidi && line.isLastLine()) {
                    left -= this.documentHelper.textHelper.getParagraphMarkSize(widget.characterFormat).Width;
                }
                this.createHighlightBorder(line, width, left, top, false, contentControl);
                top += line.height;
            }
        }
    };
    //Table Widget
    /**
     * Get line widget form table widget
     *
     * @private
     */
    Selection.prototype.getLineWidgetTableWidget = function (widget, point) {
        var lineWidget = undefined;
        for (var i = 0; i < widget.childWidgets.length; i++) {
            //Removed the height condition check to handle the vertically merged cells.
            var childWidget = widget.childWidgets[i];
            if (childWidget instanceof TableRowWidget && childWidget.y <= point.y) {
                if (childWidget.rowFormat.heightType === 'Exactly' &&
                    (childWidget.y + HelperMethods.convertPointToPixel(childWidget.rowFormat.height) < point.y)) {
                    continue;
                }
                lineWidget = this.getLineWidgetRowWidget(childWidget, point);
                var cellWidget = undefined;
                if (!isNullOrUndefined(lineWidget) && lineWidget.paragraph.containerWidget instanceof TableCellWidget) {
                    cellWidget = lineWidget.paragraph.containerWidget;
                }
                var cellSpacing = 0;
                var rowSpan = 0;
                if (!isNullOrUndefined(cellWidget)) {
                    var tableWidget = cellWidget.ownerRow.containerWidget;
                    cellSpacing = HelperMethods.convertPointToPixel(tableWidget.tableFormat.cellSpacing);
                    rowSpan = cellWidget.cellFormat.rowSpan;
                }
                var leftCellSpacing = 0;
                var rightCellSpacing = 0;
                var topCellSpacing = 0;
                var bottomCellSpacing = 0;
                if (cellSpacing > 0) {
                    leftCellSpacing = cellWidget.cellIndex === 0 ? cellSpacing : cellSpacing / 2;
                    rightCellSpacing = cellWidget.cellIndex === cellWidget.ownerRow.childWidgets.length - 1 ? cellSpacing : cellSpacing / 2;
                    var rowWidget = undefined;
                    if (cellWidget.containerWidget instanceof TableRowWidget) {
                        rowWidget = cellWidget.containerWidget;
                    }
                    var tableWidget = undefined;
                    if (cellWidget.containerWidget.containerWidget instanceof TableWidget) {
                        tableWidget = cellWidget.containerWidget.containerWidget;
                    }
                    if (!isNullOrUndefined(rowWidget) && !isNullOrUndefined(tableWidget)) {
                        topCellSpacing = cellWidget.ownerRow.rowIndex === 0 ? cellSpacing : cellSpacing / 2;
                        if (cellWidget.ownerRow.rowIndex + rowSpan === cellWidget.ownerTable.childWidgets.length) {
                            bottomCellSpacing = cellSpacing;
                        }
                        else {
                            bottomCellSpacing = cellSpacing / 2;
                        }
                    }
                }
                if ((!isNullOrUndefined(lineWidget) && lineWidget.paragraph.x <= point.x
                    && lineWidget.paragraph.x + lineWidget.width >= point.x
                    && lineWidget.paragraph.y <= point.y && this.getTop(lineWidget) + lineWidget.height >= point.y)
                    || (!isNullOrUndefined(cellWidget) && cellWidget.x - cellWidget.margin.left - leftCellSpacing <= point.x
                        && cellWidget.x + cellWidget.width + cellWidget.margin.right + rightCellSpacing >= point.x
                        && cellWidget.y - cellWidget.margin.top - topCellSpacing <= point.y
                        && cellWidget.y + cellWidget.height + cellWidget.margin.bottom + bottomCellSpacing >= point.y)) {
                    break;
                }
            }
        }
        return lineWidget;
    };
    //TableRowWidget
    /**
     * Get line widget fom row
     *
     * @private
     */
    Selection.prototype.getLineWidgetRowWidget = function (widget, point) {
        for (var i = 0; i < widget.childWidgets.length; i++) {
            var cellSpacing = 0;
            cellSpacing = HelperMethods.convertPointToPixel(widget.ownerTable.tableFormat.cellSpacing);
            var leftCellSpacing = 0;
            var rightCellSpacing = 0;
            if (cellSpacing > 0) {
                leftCellSpacing = widget.childWidgets[i].columnIndex === 0 ? cellSpacing : cellSpacing / 2;
                rightCellSpacing = widget.childWidgets[i].cellIndex === widget.childWidgets[i].ownerRow.childWidgets.length - 1 ? cellSpacing : cellSpacing / 2;
            }
            if (widget.childWidgets[i].x -
                widget.childWidgets[i].margin.left - leftCellSpacing <= point.x && (widget.childWidgets[i].x +
                widget.childWidgets[i].width) + widget.childWidgets[i].margin.right + rightCellSpacing >= point.x) {
                return this.getLineWidgetCellWidget(widget.childWidgets[i], point);
            }
        }
        var lineWidget = undefined;
        if (widget.childWidgets.length > 0) {
            if (widget.childWidgets[0].x <= point.x) {
                lineWidget = this.getLineWidgetCellWidget(widget.childWidgets[widget.childWidgets.length - 1], point);
            }
            else {
                lineWidget = this.getLineWidgetCellWidget(widget.childWidgets[0], point);
            }
        }
        return lineWidget;
    };
    /**
     * @private
     */
    Selection.prototype.getFirstBlock = function (cell) {
        if (cell.childWidgets.length > 0) {
            return cell.childWidgets[0];
        }
        return undefined;
    };
    //Table Cell Widget
    /**
     * Highlight selected cell widget
     *
     * @private
     */
    Selection.prototype.highlightCellWidget = function (widget) {
        var widgets = [];
        if (widget.previousSplitWidget || widget.nextSplitWidget) {
            widgets = widget.getSplitWidgets();
        }
        else {
            widgets.push(widget);
        }
        for (var i = 0; i < widgets.length; i++) {
            widget = widgets[i];
            //Clears Selection highlight of the child widgets.
            this.clearChildSelectionHighlight(widget);
            //Highlights the entire cell.
            this.createHighlightBorderInsideTable(widget);
        }
    };
    /**
     * Clear selection highlight
     *
     * @private
     */
    Selection.prototype.clearSelectionHighlight = function (widget) {
        if (this.selectedWidgets.containsKey(widget)) {
            this.removeSelectionHighlight(widget);
            this.selectedWidgets.remove(widget);
        }
    };
    /**
     * Get line widget from cell widget
     *
     * @private
     */
    Selection.prototype.getLineWidgetCellWidget = function (widget, point) {
        for (var i = 0; i < widget.childWidgets.length; i++) {
            if (widget.childWidgets[i].y <= point.y
                && (widget.childWidgets[i].y + widget.childWidgets[i].height) >= point.y) {
                if (widget.childWidgets[i] instanceof ParagraphWidget) {
                    return this.getLineWidgetParaWidget(widget.childWidgets[i], point);
                }
                else {
                    return this.getLineWidgetTableWidget(widget.childWidgets[i], point);
                }
            }
        }
        var lineWidget = undefined;
        if (widget.childWidgets.length > 0) {
            if (widget.childWidgets[0].y - widget.margin.top <= point.y) {
                if (widget.childWidgets[widget.childWidgets.length - 1] instanceof ParagraphWidget) {
                    lineWidget = this.getLineWidgetParaWidget(widget.childWidgets[widget.childWidgets.length - 1], point);
                }
                else {
                    lineWidget = this.getLineWidgetTableWidget(widget.childWidgets[0], point);
                }
            }
        }
        return lineWidget;
    };
    //LineWidget
    /**
     * update text position
     *
     * @private
     */
    Selection.prototype.updateTextPosition = function (widget, point) {
        var caretPosition = point;
        var element = undefined;
        var index = 0;
        var isImageSelected = false;
        if (this.owner.enableHeaderAndFooter) {
            var headerFooterWidget = this.start.paragraph.bodyWidget;
            if (headerFooterWidget.headerFooterType.indexOf('Header') != -1) {
                this.comparePageWidthAndMargins(headerFooterWidget.page.headerWidget, headerFooterWidget.page);
            }
            else {
                this.comparePageWidthAndMargins(headerFooterWidget.page.footerWidget, headerFooterWidget.page);
            }
        }
        var isImageSelectedObj = this.updateTextPositionIn(widget, element, index, point, false);
        if (!isNullOrUndefined(isImageSelectedObj)) {
            element = isImageSelectedObj.element;
            index = isImageSelectedObj.index;
            caretPosition = isImageSelectedObj.caretPosition;
            isImageSelected = isImageSelectedObj.isImageSelected;
            this.isImageSelected = isImageSelected;
        }
        if (isImageSelected) {
            this.selectInternal(widget, element, index, caretPosition);
            if (index === 0) {
                this.extendForward();
            }
            else {
                this.extendBackward();
            }
        }
        else {
            if (!isNullOrUndefined(this.owner.imageResizerModule)) {
                this.owner.imageResizerModule.selectedImageWidget.clear();
            }
            this.selectInternal(widget, element, index, caretPosition);
        }
    };
    /**
     * @private
     */
    Selection.prototype.updateTextPositionIn = function (widget, inline, index, caretPosition, includeParagraphMark) {
        var isImageSelected = false;
        var top = this.getTop(widget);
        var left = widget.paragraph.x;
        var elementValues = this.getFirstElement(widget, left);
        var element = elementValues.element;
        var isRtlText = false;
        var isParaBidi = false;
        left = elementValues.left;
        var children = widget.renderedElements;
        if (isNullOrUndefined(element)) {
            var topMargin = 0;
            var bottomMargin = 0;
            var size = this.getParagraphMarkSize(widget.paragraph, topMargin, bottomMargin);
            topMargin = size.topMargin;
            bottomMargin = size.bottomMargin;
            var selectParaMark = this.documentHelper.mouseDownOffset.y >= top && this.documentHelper.mouseDownOffset.y < top + widget.height ? (this.documentHelper.mouseDownOffset.x < left + size.width) : true;
            if (selectParaMark && includeParagraphMark && caretPosition.x > left + size.width / 2) {
                left += size.width;
                if (children.length > 0) {
                    inline = children[children.length - 1];
                    index = inline.length;
                }
                index++;
            }
            else if (widget.paragraph.isEmpty() && widget.paragraph.bidi) {
                left += size.width;
            }
            caretPosition = new Point(left, topMargin > 0 ? top + topMargin : top);
        }
        else {
            if (!isNullOrUndefined(element)) {
                if (caretPosition.x > left + element.margin.left || (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline')) {
                    var isInInline = false;
                    if (widget.paragraph.floatingElements.length > 0) {
                        isInInline = this.documentHelper.checkPointIsInLine(widget, caretPosition);
                    }
                    for (var i = children.indexOf(element); i < children.length; i++) {
                        element = children[i];
                        if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline') {
                            if (this.documentHelper.isInShapeBorder(element, caretPosition) &&
                                !this.documentHelper.isSelectionChangedOnMouseMoved && !isInInline) {
                                left = element.x;
                                top = element.y;
                                break;
                            }
                            continue;
                        }
                        var isCurrentParaBidi = false;
                        if (element instanceof ListTextElementBox || element instanceof TextElementBox) {
                            isCurrentParaBidi = element.line.paragraph.paragraphFormat.bidi;
                        }
                        if (caretPosition.x < left + element.margin.left + element.width + element.padding.left || i === children.length - 1
                            || ((children[i + 1] instanceof ListTextElementBox) && isCurrentParaBidi)) {
                            break;
                        }
                        left += element.margin.left + element.width + element.padding.left;
                    }
                    if (element instanceof TextElementBox) {
                        isRtlText = element.isRightToLeft;
                        isParaBidi = element.line.paragraph.paragraphFormat.bidi;
                    }
                    if (caretPosition.x > left + element.margin.left + element.width + element.padding.left && !(element instanceof ShapeElementBox)) {
                        //Line End
                        index = element instanceof TextElementBox ? element.length : 1;
                        if (isRtlText && isParaBidi) {
                            index = 0;
                        }
                        if ((element instanceof TextElementBox && (element.text !== "\v" && element.text !== '\f' && element.text !== String.fromCharCode(14))) || includeParagraphMark) {
                            left += element.margin.left + element.width + element.padding.left;
                        }
                    }
                    else if (element instanceof TextElementBox) {
                        if (element instanceof TextElementBox && isRtlText) {
                            left += element.width + element.padding.left;
                        }
                        var x = 0;
                        if (isRtlText) {
                            x = (left + element.margin.left) - caretPosition.x;
                        }
                        else {
                            x = caretPosition.x - left - element.margin.left - element.padding.left;
                        }
                        left += (element.margin.left + element.padding.left);
                        var prevWidth = 0;
                        var charIndex = 0;
                        for (var i = 1; i <= element.length; i++) {
                            var width = 0;
                            if (i === element.length) {
                                width = element.width + element.padding.left;
                            }
                            else {
                                width = this.documentHelper.textHelper.getWidth(element.text.substr(0, i), element.characterFormat, element.scriptType);
                            }
                            if (x < width || i === element.length) {
                                //Updates exact left position of the caret.
                                var charWidth = width - prevWidth;
                                if (x - prevWidth > charWidth / 2) {
                                    if (isRtlText) {
                                        left -= width;
                                    }
                                    else {
                                        left += width;
                                    }
                                    charIndex = i;
                                }
                                else {
                                    if (isRtlText) {
                                        left -= prevWidth;
                                    }
                                    else {
                                        left += prevWidth;
                                    }
                                    charIndex = i - 1;
                                    if (i === 1 && element !== children[0] && !(children[0] instanceof ShapeBase &&
                                        children[0].textWrappingStyle !== 'Inline')) {
                                        var curIndex = children.indexOf(element);
                                        if (!(children[curIndex - 1] instanceof ListTextElementBox) && !isRtlText) {
                                            element = children[curIndex - 1];
                                            if (element instanceof ShapeBase && element.textWrappingStyle !== 'Inline' && charIndex == 0 && !isNullOrUndefined(element.previousElement)) {
                                                element = children[children.indexOf(element) - 1];
                                            }
                                            charIndex = element instanceof TextElementBox ? element.length : 1;
                                        }
                                    }
                                }
                                break;
                            }
                            prevWidth = width;
                        }
                        index = charIndex;
                    }
                    else {
                        isImageSelected = element instanceof ImageElementBox || element instanceof ShapeElementBox;
                        if (caretPosition.x - left - element.margin.left > element.width / 2) {
                            index = 1;
                            left += (element.margin.left + element.width + element.padding.left);
                        }
                        else if (element !== children[0] && !isImageSelected) {
                            var curIndex = children.indexOf(element);
                            if (!(children[curIndex - 1] instanceof ListTextElementBox)) {
                                element = children[curIndex - 1];
                                index = element instanceof TextElementBox ? element.length : 1;
                            }
                        }
                    }
                    if (element instanceof TextElementBox && (element.text === '\v' || element.text === '\f' || element.text === String.fromCharCode(14))) {
                        index = 0;
                    }
                }
                else {
                    isRtlText = element.isRightToLeft;
                    isParaBidi = element.line.paragraph.paragraphFormat.bidi;
                    if (element instanceof TextElementBox && (isParaBidi || isRtlText) && caretPosition.x < left + element.margin.left + element.width + element.padding.left) {
                        index = this.getTextLength(element.line, element) + element.length;
                    }
                    else {
                        index = this.getTextLength(element.line, element);
                    }
                    left += element.margin.left;
                }
                if (element instanceof TextElementBox) {
                    top += element.margin.top > 0 ? element.margin.top : 0;
                }
                else {
                    var textMetrics = this.documentHelper.textHelper.getHeight(element.characterFormat); //for ascent and descent
                    var height = element.height;
                    if (element instanceof BookmarkElementBox && !this.documentHelper.layout.hasValidElement(element.line.paragraph)) {
                        height = textMetrics.Height; //after text helper class
                    }
                    top += element.margin.top + height - textMetrics.BaselineOffset;
                }
                inline = element;
                if (inline instanceof FieldElementBox && inline.fieldType === 2 && !isNullOrUndefined(inline.fieldBegin)) {
                    inline = inline.fieldBegin;
                    index = 0;
                }
                if (inline instanceof EditRangeEndElementBox) {
                    index = 0;
                }
                if (this.isMoveDownOrMoveUp && element instanceof ContentControl) {
                    index = element.type === 0 ? (index + 1) : (index - 1);
                }
                if (!isNullOrUndefined(inline.previousElement) && inline.previousElement instanceof ShapeBase && inline.previousElement.textWrappingStyle !== 'Inline' && index == 0) {
                    inline = inline.previousElement;
                }
                var inlineObj = this.validateTextPosition(inline, index);
                inline = inlineObj.element;
                index = inlineObj.index;
                var isParagraphEnd = isNullOrUndefined(inline.nextNode) && index === inline.length;
                var isLineEnd = inline.line.isEndsWithLineBreak
                    && inline instanceof TextElementBox && inline.text === '\v';
                if (includeParagraphMark && inline.nextNode instanceof FieldElementBox && index === inline.length) {
                    isParagraphEnd = this.isLastRenderedInline(inline, index);
                }
                if (includeParagraphMark && isParagraphEnd || isLineEnd) {
                    var width = 0;
                    //Include width of Paragraph mark.
                    if (isParagraphEnd) {
                        width = this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
                        var selectParaMark = this.documentHelper.mouseDownOffset.y >= top && this.documentHelper.mouseDownOffset.y < top + widget.height ? (this.documentHelper.mouseDownOffset.x < left + width) : true;
                        if (selectParaMark && caretPosition.x > left + width / 2) {
                            left += width;
                            index = inline.length + 1;
                        }
                        //Include width of line break mark.
                    }
                    else if (isLineEnd) {
                        width = element.width + element.padding.left;
                        left += width;
                        // index = inline.length;
                    }
                }
                caretPosition = new Point(left, top);
            }
        }
        return {
            'element': inline,
            'index': index,
            'caretPosition': caretPosition,
            'isImageSelected': isImageSelected
        };
    };
    /**
     * @private
     */
    Selection.prototype.checkAllFloatingElements = function (widget, caretPosition) {
        var bodyWidget;
        var isShapeSelected = false;
        var isInShapeBorder = false;
        var floatElement;
        if (!isNullOrUndefined(widget)) {
            bodyWidget = widget.paragraph.bodyWidget;
            isShapeSelected = false;
            isInShapeBorder = false;
            for (var i = 0; i < bodyWidget.floatingElements.length; i++) {
                if (bodyWidget.floatingElements[i] instanceof TableWidget) {
                    continue;
                }
                floatElement = bodyWidget.floatingElements[i];
                if (caretPosition.x < floatElement.x + floatElement.margin.left + floatElement.width && caretPosition.x > floatElement.x
                    && caretPosition.y < floatElement.y + floatElement.margin.top + floatElement.height && caretPosition.y > floatElement.y) {
                    isShapeSelected = true;
                    if (this.documentHelper.isInShapeBorder(floatElement, caretPosition)) {
                        isInShapeBorder = true;
                    }
                    break;
                }
            }
        }
        return {
            'element': floatElement,
            'caretPosition': caretPosition,
            'isShapeSelected': isShapeSelected,
            'isInShapeBorder': isInShapeBorder
        };
    };
    /**
     * Get text length if the line widget
     *
     * @private
     */
    Selection.prototype.getTextLength = function (widget, element) {
        var length = 0;
        var renderedElement = widget.renderedElements;
        var count = renderedElement.indexOf(element);
        if (renderedElement.length > 0 && renderedElement[0] instanceof ListTextElementBox) {
            if (renderedElement[1] instanceof ListTextElementBox) {
                count -= 2;
            }
            else {
                count -= 1;
            }
        }
        for (var i = 1; i < count; i++) {
            length += renderedElement[i].length;
        }
        return length;
    };
    /**
     * Get Line widget left
     *
     * @private
     */
    Selection.prototype.getLeft = function (widget) {
        var left = widget.paragraph.x;
        var paragraphFormat = widget.paragraph.paragraphFormat;
        if (this.isParagraphFirstLine(widget) && !paragraphFormat.bidi && !(paragraphFormat.textAlignment === 'Right')) {
            left += HelperMethods.convertPointToPixel(paragraphFormat.firstLineIndent);
        }
        var renderedElements = widget.renderedElements;
        for (var i = 0; i < renderedElements.length; i++) {
            var element = renderedElements[i];
            if (element instanceof ListTextElementBox && !paragraphFormat.bidi) { //after list implementation
                if (i === 0) {
                    left += element.margin.left + element.width;
                    if (element.padding) {
                        left += element.padding.left;
                    }
                }
                else {
                    left += element.width;
                }
            }
            else {
                left += element.margin.left;
                break;
            }
        }
        return left;
    };
    /**
     * Get line widget top
     *
     * @private
     */
    Selection.prototype.getTop = function (widget) {
        var top = widget.paragraph.y;
        var count = widget.paragraph.childWidgets.indexOf(widget);
        for (var i = 0; i < count; i++) {
            var line = widget.paragraph.childWidgets[i];
            top = (top + line.height + line.marginTop);
        }
        top += widget.marginTop;
        return top;
    };
    /**
     * Get first element the widget
     *
     * @private
     */
    Selection.prototype.getFirstElement = function (widget, left) {
        var firstLineIndent = 0;
        if (this.isParagraphFirstLine(widget) && !widget.paragraph.paragraphFormat.bidi) {
            firstLineIndent = HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.firstLineIndent);
        }
        left += firstLineIndent;
        var element = undefined;
        var renderedChild = widget.renderedElements;
        for (var i = 0; i < renderedChild.length; i++) {
            element = renderedChild[i];
            if (element instanceof ListTextElementBox) {
                if (widget.paragraph.paragraphFormat.bidi) {
                    left += element.margin.left;
                    element = undefined;
                }
                else {
                    left += element.margin.left + element.width + element.padding.left;
                    element = undefined;
                }
                // }
                //  else if (element instanceof FieldElementBox || element instanceof BookmarkElementBox
                //     || (element.nextNode instanceof FieldElementBox && ((element.nextNode as FieldElementBox).fieldType === 2))) {
                //     element = undefined;
            }
            else {
                break;
            }
        }
        return { 'element': element, 'left': left };
    };
    /**
     * Return inline index
     *
     * @private
     */
    //ElementBox
    Selection.prototype.getIndexInInline = function (elementBox) {
        var indexInInline = 0;
        if (elementBox instanceof TextElementBox) {
            var count = elementBox.line.children.indexOf(elementBox);
            for (var i = 0; i < count; i++) {
                var element = elementBox.line.children[i];
                if (element instanceof FieldElementBox || element instanceof ListTextElementBox) {
                    continue;
                }
                indexInInline += element.length;
            }
        }
        return indexInInline;
    };
    /**
     * Return true if widget is first inline of paragraph
     *
     * @private
     */
    Selection.prototype.isParagraphFirstLine = function (widget) {
        if (isNullOrUndefined(widget.paragraph.previousSplitWidget) &&
            widget === widget.paragraph.firstChild) {
            return true;
        }
        return false;
    };
    /**
     * @param widget
     * @private
     */
    Selection.prototype.isParagraphLastLine = function (widget) {
        if (isNullOrUndefined(widget.paragraph.nextSplitWidget)
            && widget === widget.paragraph.lastChild) {
            return true;
        }
        return false;
    };
    /**
     * Return line widget width
     *
     * @private
     */
    Selection.prototype.getWidth = function (widget, includeParagraphMark) {
        var width = 0;
        var paraFormat = widget.paragraph.paragraphFormat;
        if (this.isParagraphFirstLine(widget) && !paraFormat.bidi) {
            width += HelperMethods.convertPointToPixel(paraFormat.firstLineIndent);
        }
        for (var i = 0; i < widget.children.length; i++) {
            var elementBox = widget.children[i];
            if (elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline') {
                continue;
            }
            width += (elementBox.margin.left + elementBox.width + elementBox.padding.left);
        }
        if (includeParagraphMark && widget.paragraph.childWidgets.indexOf(widget) === widget.paragraph.childWidgets.length - 1
            && isNullOrUndefined(widget.paragraph.nextSplitWidget)) {
            width += this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
        }
        return width;
    };
    /**
     * Return line widget left
     *
     * @private
     */
    Selection.prototype.getLeftInternal = function (widget, elementBox, index, skipPadding) {
        var left = widget.paragraph.x;
        var paraFormat = widget.paragraph.paragraphFormat;
        if (this.isParagraphFirstLine(widget) && !paraFormat.bidi) {
            left += HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.firstLineIndent);
        }
        var renderedWidget = widget.renderedElements;
        var count = renderedWidget.indexOf(elementBox);
        if ((renderedWidget.length === 1 && renderedWidget[0] instanceof ListTextElementBox) || (renderedWidget.length === 2
            && renderedWidget[0] instanceof ListTextElementBox && renderedWidget[1] instanceof ListTextElementBox)) {
            count = renderedWidget.length;
        }
        var isFieldCode = false;
        for (var i = 0; i < count; i++) {
            var widgetInternal = renderedWidget[i];
            if (widgetInternal instanceof FieldElementBox && widgetInternal.fieldType === 2) {
                isFieldCode = false;
            }
            if (isFieldCode) {
                continue;
            }
            if (widgetInternal instanceof ShapeBase && widgetInternal.textWrappingStyle !== 'Inline') {
                continue;
            }
            if (i === 1 && widgetInternal instanceof ListTextElementBox) {
                left += widgetInternal.width;
                if (widgetInternal.padding && widgetInternal.padding.left) {
                    left += widgetInternal.padding.left;
                }
            }
            else if (widgetInternal instanceof TabElementBox && elementBox === widgetInternal) {
                left += widgetInternal.margin.left;
            }
            else {
                left += widgetInternal.margin.left + widgetInternal.width + widgetInternal.padding.left;
            }
            if (widgetInternal instanceof FieldElementBox && widgetInternal.fieldType === 0) {
                isFieldCode = true;
            }
        }
        var isRtlText = false;
        var isParaBidi = widget.paragraph.bidi;
        if (!isNullOrUndefined(elementBox)) {
            isRtlText = elementBox.characterRange === CharacterRangeType.RightToLeft;
            isParaBidi = elementBox.line.paragraph.paragraphFormat.bidi;
            left = (index === 0 && skipPadding) ? left + elementBox.margin.left : left + elementBox.margin.left + elementBox.padding.left;
            if (elementBox instanceof ShapeBase && !isNullOrUndefined(elementBox.nextElement)) {
                left += (elementBox.nextElement.margin.left + elementBox.nextElement.padding.left);
            }
            if (isRtlText || (this.documentHelper.moveCaretPosition === 1 && !isRtlText && isParaBidi)) {
                left += elementBox.width;
            }
        }
        var width = 0;
        if (elementBox instanceof TextElementBox) {
            if ((this.documentHelper.moveCaretPosition !== 0) && (isParaBidi || isRtlText)) {
                if ((isRtlText && isParaBidi && this.documentHelper.moveCaretPosition === 2)
                    || (isRtlText && !isParaBidi && this.documentHelper.moveCaretPosition === 1)) {
                    left -= elementBox.width;
                }
                this.documentHelper.moveCaretPosition = 0;
                return left;
            }
            if (index === elementBox.length && !isRtlText) {
                left += elementBox.width;
            }
            else if (index > elementBox.length) {
                width = this.documentHelper.textHelper.getParagraphMarkWidth(elementBox.line.paragraph.characterFormat);
                if (isRtlText) {
                    left -= elementBox.width + width;
                }
                else {
                    left += elementBox.width + width;
                }
            }
            else {
                if (index === elementBox.length && isRtlText && paraFormat.textAlignment === 'Justify') {
                    width = elementBox.width;
                }
                else {
                    width = this.documentHelper.textHelper.getWidth(elementBox.text.substr(0, index), elementBox.characterFormat, elementBox.scriptType);
                }
                if (isRtlText) {
                    left -= width;
                }
                else {
                    left += width;
                }
            }
            this.documentHelper.moveCaretPosition = 0;
        }
        else if (index > 0) {
            if (!isNullOrUndefined(elementBox) && !(elementBox instanceof ListTextElementBox)) {
                if (!(elementBox instanceof ShapeBase && elementBox.textWrappingStyle !== 'Inline')) {
                    left += elementBox.width;
                }
                if (index === 2) {
                    var paragraph = elementBox.line.paragraph;
                    left += this.documentHelper.textHelper.getParagraphMarkWidth(paragraph.characterFormat);
                }
            }
            else {
                left += this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
            }
        }
        return left;
    };
    /**
     * Return line widget start offset
     * @private
     */
    Selection.prototype.getLineStartLeft = function (widget) {
        var left = widget.paragraph.x;
        var paragraphFormat = widget.paragraph.paragraphFormat;
        if (this.isParagraphFirstLine(widget) && !paragraphFormat.bidi) {
            left += HelperMethods.convertPointToPixel(paragraphFormat.firstLineIndent);
        }
        if (widget.children.length > 0) {
            left += widget.children[0].margin.left;
        }
        return left;
    };
    /**
     * Update text position
     * @private
     */
    Selection.prototype.updateTextPositionWidget = function (widget, point, textPosition, includeParagraphMark) {
        var caretPosition = point;
        var inline = undefined;
        var index = 0;
        var updatePositionObj;
        updatePositionObj = this.updateTextPositionIn(widget, inline, index, caretPosition, includeParagraphMark);
        inline = updatePositionObj.element;
        index = updatePositionObj.index;
        caretPosition = updatePositionObj.caretPosition;
        textPosition.setPositionForSelection(widget, inline, index, caretPosition);
    };
    /**
     * Clear selection highlight
     * @private
     */
    Selection.prototype.clearSelectionHighlightLineWidget = function (widget) {
        if (!isNullOrUndefined(this.owner) && this.selectedWidgets.length > 0) {
            this.clearSelectionHighlight(this);
        }
    };
    /**
     * Return first element from line widget
     * @private
     */
    Selection.prototype.getFirstElementInternal = function (widget) {
        var element = undefined;
        var childLen = widget.children.length;
        for (var i = 0; i < childLen; i++) {
            element = widget.children[i];
            if (element instanceof ListTextElementBox) {
                element = undefined;
            }
            else {
                break;
            }
        }
        return element;
    };
    //Selection API.   
    /**
     * Select content between given range
     * @private
     */
    Selection.prototype.selectRange = function (startPosition, endPosition, isBookmark) {
        this.start.setPositionInternal(startPosition);
        this.end.setPositionInternal(endPosition);
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true, true, isBookmark);
    };
    /**
     * Selects current paragraph
     * @private
     */
    Selection.prototype.selectParagraphInternal = function (paragraph, positionAtStart) {
        var line;
        if (!isNullOrUndefined(paragraph) && !isNullOrUndefined(paragraph.firstChild)) {
            line = paragraph.firstChild;
            if (positionAtStart) {
                this.start.setPosition(line, positionAtStart);
            }
            else {
                var endOffset = line.getEndOffset();
                this.start.setPositionParagraph(line, endOffset);
            }
        }
        this.end.setPositionInternal(this.start);
        this.upDownSelectionLength = this.start.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * @private
     */
    Selection.prototype.setPositionForBlock = function (block, selectFirstBlock) {
        var position;
        if (block instanceof TableWidget) {
            if (selectFirstBlock) {
                block = this.documentHelper.getFirstParagraphInFirstCell(block);
            }
            else {
                block = this.documentHelper.getLastParagraphInLastCell(block);
            }
        }
        if (block instanceof ParagraphWidget) {
            position = new TextPosition(this.owner);
            if (selectFirstBlock) {
                position.setPosition(block.firstChild, true);
            }
            else {
                var line = block.lastChild;
                position.setPositionParagraph(line, line.getEndOffset());
            }
        }
        return position;
    };
    /**
     * Select content in given text position
     * @private
     */
    Selection.prototype.selectContent = function (textPosition, clearMultiSelection) {
        if (isNullOrUndefined(textPosition)) {
            throw new Error('textPosition is undefined.');
        }
        this.start.setPositionInternal(textPosition);
        this.end.setPositionInternal(textPosition);
        this.upDownSelectionLength = this.end.location.x;
        this.fireSelectionChanged(true);
    };
    /**
     * Select paragraph
     * @private
     */
    Selection.prototype.selectInternal = function (lineWidget, element, index, physicalLocation) {
        this.start.setPositionForSelection(lineWidget, element, index, physicalLocation);
        this.end.setPositionInternal(this.start);
        this.upDownSelectionLength = physicalLocation.x;
        this.fireSelectionChanged(true);
    };
    /**
     * @private
     */
    Selection.prototype.selects = function (lineWidget, offset, skipSelectionChange) {
        this.documentHelper.clearSelectionHighlight();
        this.start.setPositionForLineWidget(lineWidget, offset);
        this.end.setPositionInternal(this.start);
        if (!skipSelectionChange) {
            this.fireSelectionChanged(true);
        }
    };
    /**
     * Select content between start and end position
     * @private
     */
    Selection.prototype.selectPosition = function (startPosition, endPosition) {
        if (isNullOrUndefined(startPosition) || isNullOrUndefined(endPosition)) {
            throw new Error('TextPosition cannot be undefined');
        }
        if (isNullOrUndefined(startPosition.paragraph)
            || startPosition.offset > this.getParagraphLength(startPosition.paragraph) + 1) {
            throw new Error('Start TextPosition is not valid.');
        }
        if (isNullOrUndefined(endPosition.paragraph)
            || endPosition.offset > this.getParagraphLength(endPosition.paragraph) + 1) {
            throw new Error('End TextPosition is not valid.');
        }
        if (startPosition.isAtSamePosition(endPosition)) {
            // Select start position.
            this.selectRange(startPosition, startPosition);
        }
        else {
            // If both text position exists within same comment or outside comment, and not at same position.
            if (startPosition.isExistBefore(endPosition)) {
                endPosition.validateForwardFieldSelection(startPosition.getHierarchicalIndexInternal(), endPosition.getHierarchicalIndexInternal());
            }
            else {
                startPosition.validateForwardFieldSelection(endPosition.getHierarchicalIndexInternal(), startPosition.getHierarchicalIndexInternal());
            }
            this.selectRange(startPosition, endPosition);
        }
    };
    /**
     * Notify selection change event
     * @private
     */
    Selection.prototype.fireSelectionChanged = function (isSelectionChanged, isKeyBoardNavigation, isBookmark) {
        if (!this.isSelectBookmark) {
            this.isExcludeBookmarkStartEnd = false;
        }
        if (!this.isEmpty) {
            if (this.isForward) {
                this.start.updatePhysicalPosition(true);
                this.end.updatePhysicalPosition(false);
            }
            else {
                this.start.updatePhysicalPosition(false);
                this.end.updatePhysicalPosition(true);
            }
        }
        if (this.isModifyingSelectionInternally) {
            return;
        }
        if (this.documentHelper.formFields.length > 0 && !this.owner.editor.isRemoteAction) {
            this.currentFormField = this.getCurrentFormField();
        }
        else {
            this.currentFormField = undefined;
        }
        if (!isNullOrUndefined(this.previousSelectedFormField) && isNullOrUndefined(this.previousSelectedFormField.fieldSeparator)) {
            this.previousSelectedFormField = this.currentFormField;
        }
        if (isSelectionChanged) {
            this.previousSelectedContentControl = this.currentContentControl;
        }
        if (this.documentHelper.contentControlCollection.length > 0) {
            this.currentContentControl = this.owner.editor.getContentControl();
        }
        else {
            this.currentContentControl = undefined;
        }
        if (!this.skipFormatRetrieval && !(!isNullOrUndefined(this.owner.optionsPaneModule) && this.owner.optionsPaneModule.isBuildHeading)) {
            this.retrieveCurrentFormatProperties();
        }
        this.updateContentControlHighlightSelection();
        this.documentHelper.clearSelectionHighlight();
        this.hideToolTip();
        if (this.owner.isLayoutEnabled && !this.owner.isShiftingEnabled) {
            this.highlightSelection(true, isBookmark);
        }
        if (this.documentHelper.restrictEditingPane.isShowRestrictPane && !this.skipEditRangeRetrieval) {
            this.documentHelper.restrictEditingPane.updateUserInformation();
        }
        if (isSelectionChanged) {
            if (this.start.paragraph.isInHeaderFooter && !this.owner.enableHeaderAndFooter) {
                this.owner.enableHeaderAndFooter = true;
            }
            else if (!this.start.paragraph.isInHeaderFooter && this.owner.enableHeaderAndFooter) {
                this.owner.enableHeaderAndFooter = false;
            }
            this.owner.fireSelectionChange();
        }
        this.triggerSpellCheckWhenSelectionChanges();
        if (this.owner.enableAutoFocus) {
            this.documentHelper.updateFocus();
        }
        if (this.documentHelper.isFormFillProtectedMode && isSelectionChanged) {
            this.triggerFormFillEvent(isKeyBoardNavigation);
            this.previousSelectedFormField = this.currentFormField;
        }
        if (this.owner.rulerHelper && this.owner.documentEditorSettings && this.owner.documentEditorSettings.showRuler &&
            !this.owner.isReadOnlyMode) {
            this.owner.rulerHelper.updateRuler(this.owner, false);
        }
    };
    /**
     * Notify selection change event
     * @private
     */
    Selection.prototype.updateContentControlHighlightSelection = function () {
        this.contentControleditRegionHighlighters.clear();
        if (!this.isHighlightContentControlEditRegion) {
            return;
        }
        if (this.documentHelper.contentControlCollection.length > 0 && !(!isNullOrUndefined(this.owner.optionsPaneModule) && this.owner.optionsPaneModule.isBuildHeading)) {
            this.contentControls = this.owner.editor.getContentControls();
        }
        else {
            this.contentControls = [];
        }
        if (this.contentControls && this.contentControls.length > 0) {
            for (var i = 0; i < this.contentControls.length; i++) {
                this.highlightContentControlEditRegionInternal(this.contentControls[parseInt(i.toString(), 10)]);
            }
        }
    };
    //Formats Retrieval
    /**
     * Retrieve all current selection format
     * @private
     */
    Selection.prototype.retrieveCurrentFormatProperties = function () {
        this.isRetrieveFormatting = true;
        var startPosition = this.start;
        var endPosition = this.end;
        if (!this.isForward) {
            startPosition = this.end;
            endPosition = this.start;
        }
        this.retrieveImageFormat(startPosition, endPosition);
        this.retrieveCharacterFormat(startPosition, endPosition);
        this.retrieveParagraphFormat(startPosition, endPosition);
        this.retrieveSectionFormat(startPosition, endPosition);
        this.retrieveTableFormat(startPosition, endPosition);
        this.isRetrieveFormatting = false;
        this.setCurrentContextType();
    };
    Selection.prototype.triggerSpellCheckWhenSelectionChanges = function () {
        if (this.documentHelper.isSpellCheckPending && this.documentHelper.owner.isSpellCheck && !this.documentHelper.isTextInput) {
            this.documentHelper.triggerElementsOnLoading = true;
            this.documentHelper.triggerSpellCheck = true;
            this.viewer.updateScrollBars();
            this.documentHelper.isSpellCheckPending = false;
            this.documentHelper.triggerElementsOnLoading = false;
            this.documentHelper.triggerSpellCheck = false;
        }
    };
    /**
     * @private
     */
    Selection.prototype.retrieveImageFormat = function (start, end) {
        var image;
        if (start.currentWidget === end.currentWidget && start.offset + 1 === end.offset) {
            var elementInfo = end.currentWidget.getInline(end.offset, 0);
            image = elementInfo.element;
            var index = elementInfo.index;
            if (image instanceof ImageElementBox) {
                var startOffset = start.currentWidget.getOffset(image, 0);
                if (startOffset !== start.offset) {
                    image = undefined;
                }
            }
        }
        if (image instanceof ImageElementBox) {
            this.imageFormat.copyImageFormat(image);
        }
        else {
            this.imageFormat.clearImageFormat();
        }
    };
    /**
     * Gets the context type of previous character or element.
     * @param isElement - Decides whether to get previous context type from element or character. By default, character.
     * @returns Returns the context type of previous character or element.
     */
    Selection.prototype.getPreviousContextType = function (isElement) {
        var contextType;
        var start = this.start;
        if (start.offset > 0) {
            var element = start.currentWidget.getInline(start.offset, 0).element;
            if (isElement) {
                element = element.previousElement;
            }
            else {
                element = start.currentWidget.getInline(start.offset - 1, 0).element;
            }
            contextType = this.getContextElement(element);
            return contextType;
        }
        return undefined;
    };
    /**
     * Gets the context type of next character or element.
     * @param isElement - Decides whether to get next context type from element or character. By default, character.
     * @return Returns the context type of next character or element.
     */
    Selection.prototype.getNextContextType = function (isElement) {
        var contextType;
        var start = this.start;
        var element = start.currentWidget.getInline(start.offset, 0).element;
        if (isElement && element.nextElement) {
            element = element.nextElement;
        }
        else {
            element = start.currentWidget.getInline(start.offset + 1, 0).element;
        }
        contextType = this.getContextElement(element);
        return contextType;
    };
    Selection.prototype.getContextElement = function (element) {
        if (element instanceof TextElementBox) {
            return 'Text';
        }
        else if (element instanceof FieldElementBox || element instanceof FieldTextElementBox) {
            return 'Field';
        }
        else if (element instanceof BookmarkElementBox) {
            return 'Bookmark';
        }
        else if (element instanceof ImageElementBox) {
            return 'Image';
        }
        else if (element instanceof ShapeElementBox) {
            return 'Shape';
        }
        else if (element instanceof CommentElementBox || element instanceof CommentCharacterElementBox) {
            return 'Comment';
        }
        else if (element instanceof ListTextElementBox) {
            return 'List';
        }
        else if (element instanceof EditRangeStartElementBox || element instanceof EditRangeEndElementBox) {
            return 'EditRange';
        }
        else {
            return undefined;
        }
    };
    Selection.prototype.getContentControlPositions = function (contenControl) {
        var offset = contenControl.line.getOffset(contenControl, 1);
        var startPosition = new TextPosition(this.owner);
        startPosition.setPositionParagraph(contenControl.line, offset);
        var contentControlEnd = contenControl.reference;
        var endoffset = contentControlEnd.line.getOffset(contentControlEnd, 0);
        var endPosition = new TextPosition(this.owner);
        endPosition.setPositionParagraph(contentControlEnd.line, endoffset);
        return { startPosition: startPosition, endPosition: endPosition };
    };
    /**
    * Retrieves the information about the content control associated with the current selection.
    *
    * @returns {ContentControlInfo} An object containing details about the content control, including
    * its title, tag, value, editability, deletability, type, and any XML mapping if applicable.
    */
    Selection.prototype.getContentControlInfo = function () {
        var contentControl = this.currentContentControl;
        if (!isNullOrUndefined(contentControl)) {
            var ccValue = '';
            if (contentControl.contentControlProperties.type === 'Text') {
                var position = this.getContentControlPositions(contentControl);
                ccValue = this.documentHelper.selection.getTextInternal(position.startPosition, position.endPosition, false);
            }
            else if (contentControl.contentControlProperties.type === 'RichText') {
                // When writing SFDT if the block is Richtext this will write has rich block not as paragraph block. To skip this changing the type as BuldingBlockGallery 
                contentControl.contentControlProperties.type = 'BuildingBlockGallery';
                var position = this.getContentControlPositions(contentControl);
                var documentContent = !isNullOrUndefined(this.owner.sfdtExportModule) ?
                    this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), position.startPosition.currentWidget, position.startPosition.offset, position.endPosition.currentWidget, position.endPosition.offset, false, true) : {};
                ccValue = JSON.stringify(documentContent);
                contentControl.contentControlProperties.type = 'RichText';
            }
            else if (contentControl.contentControlProperties.type === 'CheckBox') {
                ccValue = contentControl.contentControlProperties.isChecked ? 'true' : 'false';
            }
            else if (contentControl.contentControlProperties.type === 'ComboBox' || contentControl.contentControlProperties.type === 'DropDownList' || contentControl.contentControlProperties.type === 'Date') {
                var element = contentControl;
                while (element !== contentControl.reference) {
                    if (element instanceof TextElementBox) {
                        ccValue += element.text;
                    }
                    element = element.nextNode;
                }
            }
            else if (contentControl.contentControlProperties.type === 'Picture') {
                if (contentControl.nextNode instanceof ImageElementBox) {
                    ccValue = this.documentHelper.getImageString(contentControl.nextNode);
                }
            }
            var contentControlInfo = {
                title: contentControl.contentControlProperties.title,
                tag: contentControl.contentControlProperties.tag,
                value: ccValue,
                canDelete: contentControl.contentControlProperties.lockContentControl,
                canEdit: contentControl.contentControlProperties.lockContents,
                type: contentControl.contentControlProperties.type
            };
            return contentControlInfo;
        }
        return undefined;
    };
    Selection.prototype.setCurrentContextType = function () {
        var contextIsinImage = this.imageFormat.image ? true : false;
        var contextIsinTable = (isNullOrUndefined(this.tableFormat) || isNullOrUndefined(this.tableFormat.table)) ? false : true;
        var style = this.start.paragraph.paragraphFormat.baseStyle;
        if (style instanceof WParagraphStyle && style.name.toLowerCase().indexOf('toc') === 0) {
            var tocField = this.getTocFieldInternal();
            if (!isNullOrUndefined(tocField)) {
                this.contextTypeInternal = 'TableOfContents';
                return;
            }
        }
        var currentRevision = this.getCurrentRevision();
        if (!isNullOrUndefined(currentRevision) && this.owner.showRevisions && this.owner.isUpdateTrackChanges) {
            this.owner.trackChangesPane.currentSelectedRevision = currentRevision[0];
            if (isNullOrUndefined(this.owner.documentHelper.currentSelectedComment)) {
                this.owner.commentReviewPane.selectReviewTab('Changes');
            }
            this.owner.notify('reviewPane', { comment: this.owner.showComments, changes: true, isUserClosed: false });
        }
        else if (!isNullOrUndefined(this.owner.trackChangesPane.currentSelectedRevision)) {
            this.owner.trackChangesPane.currentSelectedRevision = undefined;
        }
        if (this.start.paragraph.isInHeaderFooter) {
            var isInHeader = this.start.paragraph.bodyWidget.headerFooterType.indexOf('Header') !== -1;
            if (contextIsinTable) {
                if (contextIsinImage) {
                    this.contextTypeInternal = isInHeader ? 'HeaderTableImage' : 'FooterTableImage';
                }
                else {
                    this.contextTypeInternal = isInHeader ? 'HeaderTableText' : 'FooterTableText';
                }
            }
            else {
                if (contextIsinImage) {
                    this.contextTypeInternal = isInHeader ? 'HeaderImage' : 'FooterImage';
                }
                else {
                    this.contextTypeInternal = isInHeader ? 'HeaderText' : 'FooterText';
                }
            }
        }
        else {
            if (contextIsinTable) {
                this.contextTypeInternal = contextIsinImage ? 'TableImage' : 'TableText';
            }
            else {
                this.contextTypeInternal = contextIsinImage ? 'Image' : 'Text';
            }
        }
        if (!isNullOrUndefined(this.owner.editor) && !isNullOrUndefined(this.owner.editor.documentHelper) &&
            this.owner.editor.documentHelper.contentControlCollection &&
            this.owner.editor.documentHelper.contentControlCollection.length > 0) {
            var contentControl = this.currentContentControl;
            var contentControlImage = this.owner.getImageContentControl();
            if (!isNullOrUndefined(contentControl) || !isNullOrUndefined(contentControlImage)) {
                var type = contentControl ? contentControl.contentControlProperties.type :
                    contentControlImage.contentControlProperties.type;
                switch (type) {
                    case 'RichText':
                        this.contextTypeInternal = "RichTextContentControl";
                        break;
                    case 'Text':
                        this.contextTypeInternal = "PlainTextContentControl";
                        break;
                    case 'Picture':
                        this.contextTypeInternal = "PictureContentControl";
                        break;
                    case 'ComboBox':
                        this.contextTypeInternal = "ComboBoxContentControl";
                        break;
                    case 'DropDownList':
                        this.contextTypeInternal = "DropDownListContentControl";
                        break;
                    case 'CheckBox':
                        this.contextTypeInternal = "CheckBoxContentControl";
                        break;
                    case 'Date':
                        this.contextTypeInternal = "DatePickerContentControl";
                        break;
                }
            }
        }
    };
    Selection.prototype.addItemRevisions = function (currentItem, isFromAccept) {
        for (var i = 0; i < currentItem.revisions.length; i++) {
            var currentRevision = currentItem.revisions[i];
            this.selectRevision(currentRevision);
            if (isFromAccept) {
                currentRevision.accept();
            }
            else {
                currentRevision.reject();
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.hasRevisions = function () {
        if (this.getCurrentRevision()) {
            return true;
        }
        return false;
    };
    Selection.prototype.getCurrentRevision = function () {
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        var isUpdateSelection = false;
        if (this.owner.enableTrackChanges && this.owner.editorHistoryModule && this.owner.editorHistoryModule.currentBaseHistoryInfo && this.owner.editorHistoryModule.currentBaseHistoryInfo.action === 'BackSpace') {
            isUpdateSelection = true;
        }
        var elementInfo;
        if (isUpdateSelection && this.getLineLength(start.currentWidget) >= start.offset + 1) {
            elementInfo = start.currentWidget.getInline(start.offset + 1, 0);
        }
        else {
            elementInfo = start.currentWidget.getInline(start.offset, 0);
        }
        var currentElement = elementInfo.element;
        var startPara = start.paragraph;
        var nextOffsetElement;
        if (isUpdateSelection && this.getLineLength(start.currentWidget) >= start.offset + 2) {
            nextOffsetElement = start.currentWidget.getInline(start.offset + 2, 0).element;
        }
        else {
            nextOffsetElement = start.currentWidget.getInline(start.offset + 1, 0).element;
        }
        var eleEndPosition;
        if (currentElement && currentElement === nextOffsetElement) {
            var offset = currentElement.line.getOffset(currentElement, (currentElement.length));
            eleEndPosition = new TextPosition(this.owner);
            eleEndPosition.setPositionParagraph(currentElement.line, offset);
            if (end.offset === eleEndPosition.offset && !isNullOrUndefined(currentElement.nextElement)) {
                return undefined;
            }
        }
        if (!isNullOrUndefined(currentElement) && currentElement.revisions.length > 0) {
            return currentElement.revisions;
        }
        if (startPara.isInsideTable) {
            var cellWidget = startPara.associatedCell;
            if (!isNullOrUndefined(cellWidget.ownerRow) && cellWidget.ownerRow.rowFormat.revisions.length > 0) {
                return cellWidget.ownerRow.rowFormat.revisions;
            }
        }
        if (end.offset > end.paragraph.getLength()) {
            if (end.paragraph.characterFormat.revisions.length > 0) {
                return end.paragraph.characterFormat.revisions;
            }
        }
        return undefined;
    };
    Selection.prototype.processLineRevisions = function (linewidget, isFromAccept) {
        for (var i = 0; i < linewidget.children.length; i++) {
            var element = linewidget.children[i];
            if (element.revisions.length > 0) {
                this.addItemRevisions(element, isFromAccept);
            }
        }
    };
    /**
     * @private
     * @param isFromAccept
     */
    Selection.prototype.handleAcceptReject = function (isFromAccept) {
        if (this.isEmpty) {
            var elementInfo = this.start.currentWidget.getInline((this.start.offset + 1), 0);
            var currentElement = elementInfo.element;
            var startPara = this.start.paragraph;
            if (!isNullOrUndefined(currentElement) && currentElement.revisions.length > 0) {
                this.addItemRevisions(currentElement, isFromAccept);
            }
            if (startPara.isInsideTable) {
                var cellWidget = startPara.associatedCell;
                if (!isNullOrUndefined(cellWidget)) {
                    if (cellWidget.ownerRow.rowFormat.revisions.length > 0) {
                        this.addItemRevisions(cellWidget.ownerRow.rowFormat, isFromAccept);
                    }
                }
                else if (!startPara.isEmpty()) {
                    for (var i = 0; i < cellWidget.childWidgets.length; i++) {
                        var paraWidget = cellWidget.childWidgets[i];
                        for (var lineIndex = void 0; lineIndex < paraWidget.childWidgets.length; lineIndex++) {
                            var linewidget = paraWidget.childWidgets[lineIndex];
                            this.processLineRevisions(linewidget, isFromAccept);
                        }
                    }
                }
            }
        }
        else {
            var revisions = this.getselectedRevisionElements();
            for (var i = 0; i < revisions.length; i++) {
                this.acceptReject(revisions[i], isFromAccept);
            }
        }
    };
    Selection.prototype.acceptReject = function (currentRevision, toAccept) {
        this.selectRevision(currentRevision);
        if (toAccept) {
            currentRevision.accept();
        }
        else {
            currentRevision.reject();
        }
    };
    Selection.prototype.getselectedRevisionElements = function () {
        var revisionCollec = [];
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        for (var i = 0; i < this.selectedWidgets.length; i++) {
            var currentWidget = this.selectedWidgets.keys[i];
            if (currentWidget instanceof LineWidget) {
                revisionCollec = this.getSelectedLineRevisions(currentWidget, start, end, revisionCollec);
            }
            else if (currentWidget instanceof TableCellWidget) {
                if (currentWidget.ownerRow.rowFormat.revisions.length > 0) {
                    revisionCollec = this.addRevisionsCollec(currentWidget.ownerRow.rowFormat.revisions, revisionCollec);
                }
                for (var i_3 = 0; i_3 < currentWidget.childWidgets.length; i_3++) {
                    var paraWidget = currentWidget.childWidgets[i_3];
                    for (var lineIndex = 0; lineIndex < paraWidget.childWidgets.length; lineIndex++) {
                        var linewidget = paraWidget.childWidgets[lineIndex];
                        revisionCollec = this.getSelectedLineRevisions(linewidget, start, end, revisionCollec);
                    }
                }
            }
        }
        return revisionCollec;
    };
    Selection.prototype.getSelectedLineRevisions = function (currentWidget, start, end, elements) {
        if (currentWidget.paragraph.characterFormat.revisions.length > 0) {
            elements = this.addRevisionsCollec(currentWidget.paragraph.characterFormat.revisions, elements);
        }
        for (var j = 0; j < currentWidget.children.length; j++) {
            var currentElement = currentWidget.children[j];
            var offset = currentElement.line.getOffset(currentElement, 0);
            var eleStartPosition = new TextPosition(this.owner);
            eleStartPosition.setPositionParagraph(currentElement.line, offset);
            offset = currentElement.line.getOffset(currentElement, (currentElement.length));
            var eleEndPosition = new TextPosition(this.owner);
            eleEndPosition.setPositionParagraph(currentElement.line, offset);
            if (((eleEndPosition.isExistAfter(start) && eleEndPosition.isExistBefore(end))
                || (eleStartPosition.isExistAfter(start) && eleStartPosition.isExistBefore(end))
                || eleStartPosition.isAtSamePosition(start)
                || (start.isExistAfter(eleStartPosition) && end.isExistBefore(eleEndPosition))) && currentElement.revisions.length > 0) {
                elements = this.addRevisionsCollec(currentElement.revisions, elements);
            }
        }
        return elements;
    };
    Selection.prototype.addRevisionsCollec = function (element, revisCollec) {
        for (var i = 0; i < element.length; i++) {
            if (revisCollec.indexOf(element[i]) === -1) {
                revisCollec.push(element[i]);
            }
        }
        return revisCollec;
    };
    //Table Format retrieval starts
    /**
     * Retrieve selection table format
     * @private
     */
    Selection.prototype.retrieveTableFormat = function (start, end) {
        var tableAdv = this.getTable(start, end);
        if (!isNullOrUndefined(tableAdv)) {
            this.tableFormat.table = tableAdv;
            this.tableFormat.copyFormat(tableAdv.tableFormat);
            this.retrieveCellFormat(start, end);
            this.retrieveRowFormat(start, end);
        }
        else {
            //When the selection is out of table
            this.tableFormat.clearFormat();
        }
    };
    /**
     * Retrieve selection cell format
     * @private
     */
    Selection.prototype.retrieveCellFormat = function (start, end) {
        if (start.paragraph.isInsideTable && end.paragraph.isInsideTable) {
            this.cellFormat.copyFormat(start.paragraph.associatedCell.cellFormat);
            this.getCellFormat(start.paragraph.associatedCell.ownerTable, start, end);
        }
        else {
            //When the selection is out of table
            this.cellFormat.clearCellFormat();
        }
    };
    /**
     * Retrieve selection row format
     * @private
     */
    Selection.prototype.retrieveRowFormat = function (start, end) {
        if (start.paragraph.isInsideTable && end.paragraph.isInsideTable) {
            this.rowFormat.copyFormat(start.paragraph.associatedCell.ownerRow.rowFormat);
            this.getRowFormat(start.paragraph.associatedCell.ownerTable, start, end);
        }
        else {
            //When the selection is out of table
            this.rowFormat.clearRowFormat();
        }
    };
    /**
     * Get selected cell format
     * @private
     */
    Selection.prototype.getCellFormat = function (table, start, end) {
        if (start.paragraph.associatedCell.equals(end.paragraph.associatedCell)) {
            return;
        }
        var isStarted = false;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row === start.paragraph.associatedCell.ownerRow) {
                isStarted = true;
            }
            if (isStarted) {
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    if (this.isCellSelected(cell, start, end)) {
                        this.cellFormat.combineFormat(cell.cellFormat);
                    }
                    if (cell === end.paragraph.associatedCell) {
                        this.cellFormat.combineFormat(cell.cellFormat);
                        return;
                    }
                }
            }
        }
    };
    /**
     * Get selected row format
     * @private
     */
    Selection.prototype.getRowFormat = function (table, start, end) {
        var tableRow = start.paragraph.associatedCell.ownerRow;
        if (tableRow === end.paragraph.associatedCell.ownerRow) {
            return;
        }
        for (var i = table.childWidgets.indexOf(tableRow) + 1; i < table.childWidgets.length; i++) {
            var tempTableRow = table.childWidgets[i];
            this.rowFormat.combineFormat(tempTableRow.rowFormat);
            if (tempTableRow === end.paragraph.associatedCell.ownerRow) {
                return;
            }
        }
    };
    /**
     * Return table with given text position
     * @private
     */
    Selection.prototype.getTable = function (startPosition, endPosition) {
        if (!isNullOrUndefined(startPosition.paragraph.associatedCell) && !isNullOrUndefined(endPosition.paragraph.associatedCell)) {
            var startTable = startPosition.paragraph.associatedCell.ownerTable;
            var endTable = startPosition.paragraph.associatedCell.ownerTable;
            if (startTable === endTable) {
                return startTable;
            }
            else {
                if (startTable.contains(startPosition.paragraph.associatedCell)) {
                    return startTable;
                }
                else if (endTable.contains(startPosition.paragraph.associatedCell)) {
                    return endTable;
                }
                else if (!startTable.isInsideTable || !endTable.isInsideTable) {
                    return undefined;
                }
                else {
                    do {
                        startTable = startTable.associatedCell.ownerTable;
                        if (startTable === endTable || startTable.contains(endTable.associatedCell)) {
                            return startTable;
                        }
                        else if (endTable.contains(startTable.associatedCell)) {
                            return endTable;
                        }
                    } while (!isNullOrUndefined(startTable.associatedCell));
                }
            }
        }
        return undefined;
    };
    Selection.prototype.getContainerWidget = function (block) {
        var bodyWidget;
        if (block.containerWidget instanceof TextFrame) {
            bodyWidget = block.containerWidget.containerShape.line.paragraph.bodyWidget;
        }
        else if (block.containerWidget instanceof BlockContainer) {
            if (!isNullOrUndefined(block.containerWidget.containerWidget) && block.containerWidget.containerWidget instanceof FootNoteWidget) {
                bodyWidget = block.containerWidget.containerWidget;
            }
            else {
                bodyWidget = block.containerWidget;
            }
        }
        else {
            bodyWidget = block.containerWidget;
            while (!(bodyWidget instanceof BlockContainer)) {
                if (bodyWidget instanceof TextFrame) {
                    bodyWidget = bodyWidget.containerShape.line.paragraph;
                }
                bodyWidget = bodyWidget.containerWidget;
            }
        }
        return bodyWidget;
    };
    //Table format retrieval ends
    //Section format retrieval starts
    /**
     * Retrieve selection section format
     * @private
     */
    Selection.prototype.retrieveSectionFormat = function (start, end) {
        var startParaSection = this.getContainerWidget(start.paragraph);
        var endParaSection = this.getContainerWidget(end.paragraph);
        if (!isNullOrUndefined(startParaSection)) {
            this.sectionFormat.copyFormat(startParaSection.sectionFormat);
            var startPageIndex = this.documentHelper.pages.indexOf(startParaSection.page);
            var endPageIndex = this.documentHelper.pages.indexOf(endParaSection.page);
            for (var i = startPageIndex + 1; i <= endPageIndex; i++) {
                this.sectionFormat.combineFormat(this.documentHelper.pages[i].bodyWidgets[0].sectionFormat);
            }
        }
    };
    //section format retrieval ends.
    //Paragraph format retrieval implementation starts.
    /**
     * Retrieve selection paragraph format
     * @private
     */
    Selection.prototype.retrieveParagraphFormat = function (start, end) {
        this.getParagraphFormatForSelection(start.paragraph, this, start, end);
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphFormatForSelection = function (paragraph, selection, start, end) {
        //Selection start in cell.
        if (start.paragraph.isInsideTable && (!end.paragraph.isInsideTable
            || start.paragraph.associatedCell !== end.paragraph.associatedCell
            || this.isCellSelected(start.paragraph.associatedCell, start, end))) {
            this.getParagraphFormatInternalInCell(start.paragraph.associatedCell, start, end);
        }
        else {
            this.getParagraphFormatInternalInParagraph(paragraph, start, end);
            if (end.paragraph === paragraph) {
                return;
            }
            var block = this.getNextRenderedBlock(paragraph);
            if (!isNullOrUndefined(block)) {
                this.getParagraphFormatInternalInBlock(block, start, end);
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphsInSelection = function () {
        var selection = this.owner.selectionModule;
        var selectedWidgets = selection.selectedWidgets.keys;
        var paragraphsInSelection = [];
        if (selection.isEmpty || selection.start.paragraph === selection.end.paragraph) {
            return [selection.start.paragraph];
        }
        for (var i = 0; i < selectedWidgets.length; i++) {
            var widget = selectedWidgets[i];
            if (paragraphsInSelection.indexOf(widget.paragraph) === -1) {
                paragraphsInSelection.push(widget.paragraph);
            }
        }
        return paragraphsInSelection;
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphFormatInternalInParagraph = function (paragraph, start, end) {
        if (start.paragraph === paragraph) {
            this.paragraphFormat.copyFormat(paragraph.paragraphFormat);
        }
        else {
            this.paragraphFormat.combineFormat(paragraph.paragraphFormat);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphFormatInternalInBlock = function (block, start, end) {
        if (block instanceof ParagraphWidget) {
            this.getParagraphFormatInternalInParagraph(block, start, end);
            if (end.paragraph === block) {
                return;
            }
            var para = this.getNextRenderedBlock(block);
            if (!isNullOrUndefined(para)) {
                this.getParagraphFormatInternalInBlock(para, start, end);
            }
        }
        else {
            this.getParagraphFormatInternalInTable(block, start, end);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphFormatInternalInTable = function (table, start, end) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var tableRow = table.childWidgets[i];
            for (var j = 0; j < tableRow.childWidgets.length; j++) {
                this.getParagraphFormatInCell(tableRow.childWidgets[j]);
            }
            if (end.paragraph.isInsideTable && this.containsRow(tableRow, end.paragraph.associatedCell)) {
                return;
            }
        }
        var block = this.getNextRenderedBlock(table);
        //Goto the next block.
        this.getParagraphFormatInternalInBlock(block, start, end);
    };
    /**
     * Get paragraph format in cell
     * @private
     */
    Selection.prototype.getParagraphFormatInCell = function (cell) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            this.getParagraphFormatInBlock(cell.childWidgets[i]);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphFormatInBlock = function (block) {
        if (block instanceof ParagraphWidget) {
            this.getParagraphFormatInParagraph(block);
        }
        else {
            this.getParagraphFormatInTable(block);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphFormatInTable = function (tableAdv) {
        for (var i = 0; i < tableAdv.childWidgets.length; i++) {
            var tableRow = tableAdv.childWidgets[i];
            for (var j = 0; j < tableRow.childWidgets.length; j++) {
                this.getParagraphFormatInCell(tableRow.childWidgets[j]);
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.getParagraphFormatInParagraph = function (paragraph) {
        if (this.start.paragraph === paragraph) {
            this.paragraphFormat.copyFormat(paragraph.paragraphFormat);
        }
        else {
            this.paragraphFormat.combineFormat(paragraph.paragraphFormat);
        }
    };
    /**
     * Get paragraph format in cell
     * @private
     */
    Selection.prototype.getParagraphFormatInternalInCell = function (cellAdv, start, end) {
        if (end.paragraph.isInsideTable) {
            var containerCell = this.getContainerCellOf(cellAdv, end.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                var startCell = this.getSelectedCell(cellAdv, containerCell);
                var endCell = this.getSelectedCell(end.paragraph.associatedCell, containerCell);
                if (this.containsCell(containerCell, end.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (this.isCellSelected(containerCell, start, end)) {
                        this.getParagraphFormatInCell(containerCell);
                    }
                    else {
                        if (startCell === containerCell) {
                            this.getParagraphFormatInternalInParagraph(start.paragraph, start, end);
                            if (end.paragraph === start.paragraph) {
                                return;
                            }
                            var block = this.getNextRenderedBlock(start.paragraph);
                            if (!isNullOrUndefined(block)) {
                                this.getParagraphFormatInternalInBlock(block, start, end);
                            }
                        }
                        else {
                            this.getParagraphFormatInRow(startCell.ownerRow, start, end);
                        }
                    }
                }
                else {
                    //Format other selected cells in current table.
                    this.getParaFormatForCell(containerCell.ownerTable, containerCell, endCell);
                }
            }
            else {
                this.getParagraphFormatInRow(containerCell.ownerRow, start, end);
            }
        }
        else {
            var cell = this.getContainerCell(cellAdv);
            this.getParagraphFormatInRow(cell.ownerRow, start, end);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getParaFormatForCell = function (table, startCell, endCell) {
        var startCellIn = this.getCellLeft(startCell.ownerRow, startCell);
        var endCellIn = startCellIn + startCell.cellFormat.cellWidth;
        var endCellLeft = this.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        if (startCellIn > endCellLeft) {
            startCellIn = endCellLeft;
        }
        if (endCellIn < endCellRight) {
            endCellIn = endCellRight;
        }
        if (startCellIn > this.upDownSelectionLength) {
            startCellIn = this.upDownSelectionLength;
        }
        if (startCellIn < this.upDownSelectionLength) {
            startCellIn = this.upDownSelectionLength;
        }
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
            var tableRow = table.childWidgets[i];
            for (var j = 0; j < tableRow.childWidgets.length; j++) {
                var cell = tableRow.childWidgets[j];
                var left = this.getCellLeft(tableRow, cell);
                if (HelperMethods.round(startCellIn, 2) <= HelperMethods.round(left, 2)
                    && HelperMethods.round(left, 2) < HelperMethods.round(endCellIn, 2)) {
                    this.getParagraphFormatInCell(cell);
                }
            }
        }
    };
    /**
     * Get paragraph format ins row
     * @private
     */
    Selection.prototype.getParagraphFormatInRow = function (tableRow, start, end) {
        for (var i = tableRow.rowIndex; i < tableRow.ownerTable.childWidgets.length; i++) {
            var row = tableRow.ownerTable.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.getParagraphFormatInCell(row.childWidgets[j]);
            }
            if (end.paragraph.isInsideTable && this.containsRow(row, end.paragraph.associatedCell)) {
                return;
            }
        }
        var block = this.getNextRenderedBlock(tableRow.ownerTable);
        //Goto the next block.
        this.getParagraphFormatInternalInBlock(block, start, end);
    };
    // paragraph format retrieval implementation ends
    // Character format retrieval implementation starts.
    /**
     * Retrieve Selection character format
     * @private
     */
    Selection.prototype.retrieveCharacterFormat = function (start, end) {
        this.characterFormat.copyFormat(start.paragraph.characterFormat);
        if (start.paragraph.isEmpty()) {
            this.characterFormat.copyFormat(start.paragraph.characterFormat, this.documentHelper.textHelper.getFontNameToRender(0, start.paragraph.characterFormat));
        }
        if (start.paragraph === end.paragraph && start.currentWidget.isLastLine()
            && start.offset === this.getLineLength(start.currentWidget) && start.offset + 1 === end.offset) {
            return;
        }
        var para = start.paragraph;
        if (start.paragraph === end.paragraph && this.isSelectList) {
            var listLevel = this.getListLevel(start.paragraph);
            // let breakCharacterFormat: WCharacterFormat = start.paragraph.characterFormat;
            if (listLevel && listLevel.characterFormat.uniqueCharacterFormat) {
                this.characterFormat.copyFormat(listLevel.characterFormat);
            }
            return;
        }
        if (start.offset === this.getParagraphLength(para) && !this.isEmpty) {
            para = this.getNextParagraphBlock(para);
        }
        while (!isNullOrUndefined(para) && para !== end.paragraph && para.isEmpty()) {
            para = this.getNextParagraphBlock(para);
        }
        var offset = para === start.paragraph ? start.offset : 0;
        var indexInInline = 0;
        if (!isNullOrUndefined(para) && !para.isEmpty()) {
            var position = new TextPosition(this.owner);
            var elemInfo = start.currentWidget.getInline(offset, indexInInline);
            var physicalLocation = this.getPhysicalPositionInternal(start.currentWidget, offset, true);
            position.setPositionForSelection(start.currentWidget, elemInfo.element, elemInfo.index, physicalLocation);
            this.getCharacterFormatForSelection(para, this, position, end);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getCharacterFormatForSelection = function (paragraph, selection, startPosition, endPosition) {
        //Selection start in cell.
        if (startPosition.paragraph instanceof ParagraphWidget && startPosition.paragraph.isInsideTable
            && (!endPosition.paragraph.isInsideTable
                || startPosition.paragraph.associatedCell !== endPosition.paragraph.associatedCell
                || this.isCellSelected(startPosition.paragraph.associatedCell, startPosition, endPosition))) {
            this.getCharacterFormatInTableCell(startPosition.paragraph.associatedCell, selection, startPosition, endPosition);
        }
        else {
            this.getCharacterFormat(paragraph, startPosition, endPosition);
        }
    };
    /**
     * Get Character format
     * @private
     */
    //Format Retrieval
    Selection.prototype.getCharacterFormatForTableRow = function (tableRowAdv, start, end) {
        for (var i = tableRowAdv.rowIndex; i < tableRowAdv.ownerTable.childWidgets.length; i++) {
            var tableRow = tableRowAdv.ownerTable.childWidgets[i];
            for (var j = 0; j < tableRow.childWidgets.length; j++) {
                this.getCharacterFormatForSelectionCell(tableRow.childWidgets[j], start, end);
            }
            if (end.paragraph.isInsideTable && this.containsRow(tableRow, end.paragraph.associatedCell)) {
                return;
            }
        }
        var block = this.getNextRenderedBlock(tableRowAdv.ownerTable);
        // //Goto the next block.
        this.getCharacterFormatForBlock(block, start, end);
    };
    /**
     * Get Character format in table
     * @private
     */
    Selection.prototype.getCharacterFormatInTableCell = function (tableCell, selection, start, end) {
        if (end.paragraph.isInsideTable) {
            var containerCell = this.getContainerCellOf(tableCell, end.paragraph.associatedCell);
            if (containerCell.ownerTable.contains(end.paragraph.associatedCell)) {
                var startCell = this.getSelectedCell(tableCell, containerCell);
                var endCell = this.getSelectedCell(end.paragraph.associatedCell, containerCell);
                if (this.containsCell(containerCell, end.paragraph.associatedCell)) {
                    //Selection end is in container cell.
                    if (this.isCellSelected(containerCell, start, end)) {
                        this.getCharacterFormatForSelectionCell(containerCell, start, end);
                    }
                    else {
                        if (startCell === containerCell) {
                            this.getCharacterFormat(start.paragraph, start, end);
                        }
                        else {
                            this.getCharacterFormatForTableRow(startCell.ownerRow, start, end);
                        }
                    }
                }
                else {
                    //Format other selected cells in current table.
                    this.getCharacterFormatInternalInTable(containerCell.ownerTable, containerCell, endCell, start, end);
                }
            }
            else {
                this.getCharacterFormatForTableRow(containerCell.ownerRow, start, end);
            }
        }
        else {
            var cell = this.getContainerCell(tableCell);
            this.getCharacterFormatForTableRow(cell.ownerRow, start, end);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getCharacterFormatInternalInTable = function (table, startCell, endCell, startPosition, endPosition) {
        var startIn = this.getCellLeft(startCell.ownerRow, startCell);
        var endIn = startIn + startCell.cellFormat.cellWidth;
        var endCellLeft = this.getCellLeft(endCell.ownerRow, endCell);
        var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
        if (startIn > endCellLeft) {
            startIn = endCellLeft;
        }
        if (endIn < endCellRight) {
            endIn = endCellRight;
        }
        if (startIn > this.upDownSelectionLength) {
            startIn = this.upDownSelectionLength;
        }
        if (endIn < this.upDownSelectionLength) {
            endIn = this.upDownSelectionLength;
        }
        var count = table.childWidgets.indexOf(endCell.ownerRow);
        for (var i = table.childWidgets.indexOf(startCell.ownerRow); i <= count; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                var cell = row.childWidgets[j];
                var left = this.getCellLeft(row, cell);
                if (HelperMethods.round(startIn, 2) <= HelperMethods.round(left, 2) &&
                    HelperMethods.round(left, 2) < HelperMethods.round(endIn, 2)) {
                    this.getCharacterFormatForSelectionCell(cell, startPosition, endPosition);
                }
            }
        }
    };
    /**
     * Get character format with in selection
     * @private
     */
    Selection.prototype.getCharacterFormat = function (paragraph, start, end) {
        if (paragraph !== start.paragraph && paragraph !== end.paragraph && !paragraph.isEmpty()) {
            this.getCharacterFormatInternal(paragraph, this);
            if (!this.characterFormat.canRetrieveNextCharacterFormat())
                return;
        }
        if (end.paragraph === paragraph && start.paragraph !== paragraph && end.offset === 0) {
            return;
        }
        var startOffset = 0;
        var length = this.getParagraphLength(paragraph);
        if (paragraph === start.paragraph) {
            startOffset = start.offset;
            //Sets selection character format.            
            var isUpdated = this.setCharacterFormat(paragraph, start, end, length);
            if (isUpdated) {
                return;
            }
        }
        var startLineWidget = paragraph.childWidgets.indexOf(start.currentWidget) !== -1 ?
            paragraph.childWidgets.indexOf(start.currentWidget) : 0;
        var endLineWidget = paragraph.childWidgets.indexOf(end.currentWidget) !== -1 ?
            paragraph.childWidgets.indexOf(end.currentWidget) : paragraph.childWidgets.length - 1;
        var endOffset = end.offset;
        if (paragraph !== end.paragraph) {
            endOffset = length;
        }
        var isFieldStartSelected = false;
        for (var i = startLineWidget; i <= endLineWidget; i++) {
            var lineWidget = paragraph.childWidgets[i];
            if (i !== startLineWidget) {
                startOffset = this.getStartLineOffset(lineWidget);
            }
            if (lineWidget === end.currentWidget) {
                endOffset = end.offset;
            }
            else {
                endOffset = this.getLineLength(lineWidget);
            }
            var count = 0;
            for (var j = 0; j < lineWidget.children.length; j++) {
                var inline = lineWidget.children[j];
                if (inline instanceof ListTextElementBox) {
                    continue;
                }
                if (startOffset >= count + inline.length) {
                    count += inline.length;
                    continue;
                }
                if (inline instanceof FieldElementBox && inline.fieldType === 0
                    && HelperMethods.isLinkedFieldCharacter(inline)) {
                    var nextInline = isNullOrUndefined(inline.fieldEnd) ?
                        inline.fieldBegin : inline.fieldEnd;
                    j--;
                    do {
                        this.characterFormat.combineFormat(inline.characterFormat);
                        count += inline.length;
                        inline = inline.nextNode;
                        i++;
                        j++;
                    } while (!isNullOrUndefined(inline) && inline !== nextInline);
                    continue;
                    //isFieldStartSelected = true;
                }
                // if (inline instanceof FieldElementBox && (inline as FieldElementBox).fieldType === 1
                //     && HelperMethods.isLinkedFieldCharacter((inline as FieldElementBox)) && isFieldStartSelected) {
                //     let fieldInline: ElementBox = (inline as FieldElementBox).fieldBegin;
                //     do {
                //         this.characterFormat.combineFormat(fieldInline.characterFormat);
                //         fieldInline = fieldInline.nextNode as ElementBox;
                //     } while (!(fieldInline instanceof FieldElementBox));
                // }
                if (inline instanceof TextElementBox || inline instanceof FieldElementBox) {
                    this.characterFormat.combineFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                }
                if (isNullOrUndefined(inline) || endOffset <= count + inline.length) {
                    break;
                }
                count += inline.length;
            }
        }
        if (end.paragraph === paragraph) {
            return;
        }
        var block = this.getNextRenderedBlock(paragraph);
        if (!isNullOrUndefined(block)) {
            this.getCharacterFormatForBlock(block, start, end);
        }
    };
    Selection.prototype.setCharacterFormat = function (para, startPos, endPos, length) {
        var index = 0;
        var startOffset = startPos.offset;
        var inlineAndIndex = startPos.currentWidget.getInline(startOffset, index);
        index = inlineAndIndex.index;
        var inline = inlineAndIndex.element;
        if (isNullOrUndefined(inline)) {
            var currentLineIndex = startPos.paragraph.childWidgets.indexOf(startPos.currentWidget);
            if (startPos.currentWidget.previousLine) {
                inline = startPos.currentWidget.previousLine.children[startPos.currentWidget.previousLine.children.length - 1];
                this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                return true;
            }
        }
        if (startOffset < length) {
            if (this.isEmpty) {
                if (inline instanceof TextElementBox || (inline instanceof FieldElementBox
                    && (inline.fieldType === 0 || inline.fieldType === 1))) {
                    var previousNode = this.getPreviousTextElement(inline);
                    if (startOffset === 0 && previousNode) {
                        inline = previousNode;
                    }
                    this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                }
                else {
                    if (!isNullOrUndefined(this.getPreviousTextElement(inline))) {
                        var element = this.getPreviousTextElement(inline);
                        this.characterFormat.copyFormat(element.characterFormat, this.documentHelper.textHelper.getFontNameToRender(element.scriptType, inline.characterFormat));
                    }
                    else if (!isNullOrUndefined(this.getNextTextElement(inline))) {
                        var element = this.getNextTextElement(inline);
                        this.characterFormat.copyFormat(element.characterFormat, this.documentHelper.textHelper.getFontNameToRender(element.scriptType, inline.characterFormat));
                    }
                    else {
                        this.characterFormat.copyFormat(para.characterFormat);
                    }
                }
                return true;
            }
            else {
                if (index === inline.length && !isNullOrUndefined(inline.nextNode)) {
                    this.characterFormat.copyFormat(this.getNextValidCharacterFormat(inline), this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                }
                else if (inline instanceof TextElementBox) {
                    this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                }
                else if (inline instanceof FieldElementBox) {
                    this.characterFormat.copyFormat(this.getNextValidCharacterFormatOfField(inline));
                }
            }
        }
        else {
            if (length === endPos.offset) {
                if (inline instanceof TextElementBox || inline instanceof FieldElementBox) {
                    this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                }
                else if (!isNullOrUndefined(inline)) {
                    inline = this.getPreviousTextElement(inline);
                    if (!isNullOrUndefined(inline)) {
                        this.characterFormat.copyFormat(inline.characterFormat, this.documentHelper.textHelper.getFontNameToRender(inline.scriptType, inline.characterFormat));
                    }
                }
                else {
                    this.characterFormat.copyFormat(para.characterFormat);
                }
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.getCharacterFormatForBlock = function (block, start, end) {
        if (block instanceof ParagraphWidget) {
            this.getCharacterFormat(block, start, end);
        }
        else {
            this.getCharacterFormatInTable(block, start, end);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getCharacterFormatInTable = function (table, start, end) {
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            for (var j = 0; j < row.childWidgets.length; j++) {
                this.getCharacterFormatForSelectionCell(row.childWidgets[j], start, end);
            }
            if (end.paragraph.isInsideTable && this.containsRow(row, end.paragraph.associatedCell)) {
                return;
            }
        }
        var blockAdv = this.getNextRenderedBlock(table);
        // //Goto the next block.
        if (!isNullOrUndefined(blockAdv)) {
            this.getCharacterFormatForBlock(blockAdv, start, end);
        }
    };
    /**
     * Get character format in selection
     * @private
     */
    Selection.prototype.getCharacterFormatForSelectionCell = function (cell, start, end) {
        for (var i = 0; i < cell.childWidgets.length; i++) {
            this.getCharacterFormatForBlock(cell.childWidgets[i], start, end);
        }
    };
    /**
     * @private
     */
    Selection.prototype.getCharacterFormatInternal = function (paragraph, selection) {
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            var linewidget = paragraph.childWidgets[i];
            for (var j = 0; j < linewidget.children.length; j++) {
                var element = linewidget.children[j];
                if (!(element instanceof ImageElementBox || element instanceof FieldElementBox || element instanceof ListTextElementBox)) {
                    selection.characterFormat.combineFormat(element.characterFormat);
                }
            }
        }
    };
    /**
     * Get next valid character format from inline
     * @private
     */
    Selection.prototype.getNextValidCharacterFormat = function (inline) {
        var startInline = this.getNextTextElement(inline);
        if (isNullOrUndefined(startInline)) {
            return inline.characterFormat;
        }
        var fieldBegin = undefined;
        if (startInline instanceof FieldElementBox) {
            if (fieldBegin.fieldType === 0) {
                fieldBegin = startInline;
            }
        }
        if (isNullOrUndefined(fieldBegin)) {
            return startInline.characterFormat;
        }
        else {
            return this.getNextValidCharacterFormatOfField(fieldBegin);
        }
    };
    /**
     * Get next valid paragraph format from field
     * @private
     */
    Selection.prototype.getNextValidCharacterFormatOfField = function (fieldBegin) {
        var startInline = fieldBegin;
        if (HelperMethods.isLinkedFieldCharacter(fieldBegin)) {
            if (isNullOrUndefined(fieldBegin.fieldSeparator)) {
                startInline = fieldBegin.fieldEnd;
            }
            else {
                startInline = fieldBegin.fieldSeparator;
            }
        }
        var nextValidInline = undefined;
        if (!isNullOrUndefined(startInline.nextNode)) {
            //Check the next node is a valid and returns inline.
            nextValidInline = this.documentHelper.getNextValidElement(startInline.nextNode);
        }
        //If field separator/end exists at end of paragraph, then move to next paragraph.
        if (isNullOrUndefined(nextValidInline)) {
            return startInline.characterFormat;
        }
        return nextValidInline.characterFormat;
    };
    /**
     * Return true if cursor point with in selection range
     * @private
     */
    Selection.prototype.checkCursorIsInSelection = function (widget, point) {
        if (isNullOrUndefined(this.start) || this.isEmpty || isNullOrUndefined(widget)) {
            return false;
        }
        var isSelected = false;
        do {
            if (this.selectedWidgets.containsKey(widget)) {
                var top_4 = void 0;
                var left = void 0;
                if (widget instanceof LineWidget) {
                    top_4 = this.owner.selectionModule.getTop(widget);
                    left = this.owner.selectionModule.getLeft(widget);
                }
                else {
                    top_4 = widget.y;
                    left = widget.x;
                }
                var widgetInfo = this.selectedWidgets.get(widget);
                if (widgetInfo instanceof SelectionWidgetInfo) {
                    isSelected = widgetInfo.left <= point.x && top_4 <= point.y &&
                        top_4 + widget.height >= point.y && widgetInfo.left + widgetInfo.width >= point.x;
                }
                else {
                    var widgetIn = widgetInfo;
                    for (var j = 0; j < widgetIn.length; j++) {
                        if (widgetIn[j] instanceof SelectionWidgetInfo) {
                            isSelected = widgetIn[j].left <= point.x && top_4 <= point.y &&
                                top_4 + widget.height >= point.y && widgetIn[j].left + widgetIn[j].width >= point.x;
                            if (isSelected) {
                                break;
                            }
                        }
                    }
                }
            }
            widget = (widget instanceof LineWidget) ? widget.paragraph : widget.containerWidget;
        } while (!isNullOrUndefined(widget) && !isSelected);
        return isSelected;
    };
    /**
     * Copy paragraph for to selection paragraph format
     * @private
     */
    Selection.prototype.copySelectionParagraphFormat = function () {
        var format = new WParagraphFormat();
        this.paragraphFormat.copyToFormat(format);
        return format;
    };
    /**
     * Get hyperlink display text
     * @private
     */
    Selection.prototype.getHyperlinkDisplayText = function (paragraph, fieldSeparator, fieldEnd, isNestedField, format) {
        var para = paragraph;
        if (para !== fieldEnd.line.paragraph) {
            isNestedField = true;
            return { displayText: '<<Selection in Document>>', 'isNestedField': isNestedField, 'format': format };
        }
        var displayText = '';
        var lineIndex = para.childWidgets.indexOf(fieldSeparator.line);
        var index = para.childWidgets[lineIndex].children.indexOf(fieldSeparator);
        for (var j = lineIndex; j < para.childWidgets.length; j++) {
            var lineWidget = para.childWidgets[j];
            if (j !== lineIndex) {
                index = -1;
            }
            for (var i = index + 1; i < lineWidget.children.length; i++) {
                var inline = lineWidget.children[i];
                if (inline === fieldEnd) {
                    return { 'displayText': displayText, 'isNestedField': isNestedField, 'format': format };
                }
                if (inline instanceof TextElementBox) {
                    displayText += inline.text;
                    format = inline.characterFormat;
                }
                else if (inline instanceof FieldElementBox) {
                    if (inline instanceof FieldElementBox && inline.fieldType === 0
                        && !isNullOrUndefined(inline.fieldEnd)) {
                        if (isNullOrUndefined(inline.fieldSeparator)) {
                            index = lineWidget.children.indexOf(inline.fieldEnd);
                        }
                        else {
                            index = lineWidget.children.indexOf(inline.fieldSeparator);
                        }
                    }
                }
                else {
                    isNestedField = true;
                    return { 'displayText': '<<Selection in Document>>', 'isNestedField': isNestedField, 'format': format };
                }
            }
        }
        return { 'displayText': displayText, 'isNestedField': isNestedField, 'format': format };
    };
    /**
     * Navigates hyperlink on mouse Event.
     * @private
     */
    Selection.prototype.navigateHyperLinkOnEvent = function (cursorPoint, isTouchInput) {
        var _this = this;
        var widget = this.documentHelper.getLineWidget(cursorPoint);
        if (!isNullOrUndefined(widget)) {
            var hyperLinkField = this.getHyperLinkFieldInCurrentSelection(widget, cursorPoint);
            //Invokes Hyperlink navigation events.
            if (!isNullOrUndefined(hyperLinkField)) {
                this.documentHelper.updateTextPositionForSelection(cursorPoint, 1);
                this.fireRequestNavigate(hyperLinkField);
                setTimeout(function () {
                    if (_this.viewer) {
                        _this.documentHelper.isTouchInput = isTouchInput;
                        _this.documentHelper.updateFocus();
                        _this.documentHelper.isTouchInput = false;
                    }
                });
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.getLinkText = function (fieldBegin, copyAddress) {
        var hyperlink = new Hyperlink(fieldBegin, this);
        var link = hyperlink.navigationLink;
        var screenTip = hyperlink.screenTip;
        if (copyAddress) {
            if (hyperlink.localReference.length > 0) {
                if (hyperlink.localReference[0] === '_' && (isNullOrUndefined(link) || link.length === 0)) {
                    link = 'Current Document';
                }
                else {
                    if (hyperlink.isCrossRef) {
                        link += hyperlink.localReference;
                    }
                    else {
                        link += '#' + hyperlink.localReference;
                    }
                }
            }
            hyperlink.destroy();
            return link;
        }
        else {
            hyperlink.destroy();
            return screenTip;
        }
    };
    /**
     * Set Hyperlink content to tool tip element
     * @private
     */
    Selection.prototype.setHyperlinkContentToToolTip = function (fieldBegin, widget, xPos, isFormField) {
        if (fieldBegin) {
            if (this.owner.contextMenuModule &&
                this.owner.contextMenuModule.contextMenuInstance.element.style.display === 'block') {
                return;
            }
            if (!this.toolTipElement) {
                this.toolTipElement = createElement('div', { className: 'e-de-tooltip' });
                this.documentHelper.viewerContainer.appendChild(this.toolTipElement);
                this.screenTipElement = createElement('p');
                this.toolTipElement.appendChild(this.screenTipElement);
                this.toolTipTextElement = createElement('p', { styles: 'font-weight:bold' });
                this.toolTipElement.appendChild(this.toolTipTextElement);
            }
            this.toolTipElement.style.display = 'block';
            var l10n = new L10n('documenteditor', this.owner.defaultLocale);
            l10n.setLocale(this.owner.locale);
            var toolTipText = l10n.getConstant('Click to follow link');
            if (this.owner.useCtrlClickToFollowHyperlink) {
                if (this.documentHelper.isIosDevice) {
                    toolTipText = 'Command+' + toolTipText;
                }
                else {
                    toolTipText = 'Ctrl+' + toolTipText;
                }
            }
            var linkText = this.getScreenTipText(fieldBegin);
            if (isFormField) {
                var helpText = fieldBegin.formFieldData.helpText;
                if (isNullOrUndefined(helpText) || helpText === '') {
                    return;
                }
                this.screenTipElement.innerText = helpText;
            }
            else {
                this.screenTipElement.innerText = linkText;
                this.toolTipTextElement.innerText = toolTipText;
            }
            var position = this.getTooltipPosition(fieldBegin.line, xPos, this.toolTipElement, false);
            this.showToolTip(position.x, position.y);
            if (!isNullOrUndefined(this.toolTipField) && fieldBegin !== this.toolTipField) {
                this.toolTipObject.position = { X: position.x, Y: position.y };
            }
            this.toolTipObject.show();
            this.toolTipField = fieldBegin;
        }
        else {
            this.hideToolTip();
        }
    };
    /**
    * Get screenTip text
    * @private
    */
    Selection.prototype.getScreenTipText = function (fieldBegin) {
        var hyperlink = new Hyperlink(fieldBegin, this);
        if (!hyperlink.screenTip && !hyperlink.localReference) {
            return hyperlink.navigationLink;
        }
        else if (hyperlink.screenTip) {
            return hyperlink.screenTip;
        }
        else {
            return hyperlink.localReference;
        }
    };
    /**
     * Set Hyperlink content to tool tip element
     * @private
     */
    Selection.prototype.setFootnoteContentToToolTip = function (footnote, widget, xPos) {
        if (footnote) {
            if (this.owner.contextMenuModule.contextMenuInstance.element.style.display === 'block' &&
                this.owner.contextMenuModule) {
                return;
            }
            if (!this.toolTipElement) {
                this.toolTipElement = createElement('div', { className: 'e-de-tooltip' });
                this.documentHelper.viewerContainer.appendChild(this.toolTipElement);
            }
            this.toolTipElement.style.display = 'block';
            var ln = new L10n('documenteditor', this.owner.defaultLocale);
            ln.setLocale(this.owner.locale);
            var toolTipText = void 0;
            if (footnote.footnoteType === 'Endnote') {
                toolTipText = ln.getConstant('Click to View/Edit Endnote');
            }
            else if (footnote.footnoteType === 'Footnote') {
                toolTipText = ln.getConstant('Click to View/Edit Footnote');
            }
            this.toolTipElement.innerHTML = '<b>' + toolTipText + '</b>';
            var positions = this.getTooltipPosition(footnote.line, xPos, this.toolTipElement, false);
            this.showToolTip(positions.x, positions.y);
            if (!isNullOrUndefined(this.toolTipField)) {
                this.toolTipObject.position = { X: positions.x, Y: positions.y };
            }
            this.toolTipObject.show();
            // this.toolTipField = fieldBegin;
        }
        else {
            this.hideToolTip();
        }
    };
    /**
     * Set locked content info to tool tip element
     * @private
     */
    Selection.prototype.setLockInfoTooptip = function (widget, xPos, user) {
        if (widget) {
            if (this.owner.contextMenuModule &&
                this.owner.contextMenuModule.contextMenuInstance.element.style.display === 'block') {
                return;
            }
            var toolTipElement = this.toolTipElement;
            if (!this.toolTipElement) {
                toolTipElement = createElement('div', { className: 'e-de-tooltip' });
                this.documentHelper.viewerContainer.appendChild(toolTipElement);
                this.toolTipElement = toolTipElement;
            }
            toolTipElement.style.display = 'block';
            var l10n = new L10n('documenteditor', this.owner.defaultLocale);
            l10n.setLocale(this.owner.locale);
            var toolTipInfo = l10n.getConstant('This region is locked by');
            toolTipElement.innerHTML = toolTipInfo + ' <b>' + user + '</b>';
            var position = this.getTooltipPosition(widget, xPos, toolTipElement, false);
            this.showToolTip(position.x, position.y);
            if (!isNullOrUndefined(this.toolTipField) && user !== this.toolTipField) {
                this.toolTipObject.position = { X: position.x, Y: position.y };
            }
            this.toolTipObject.show();
            this.toolTipField = user;
        }
        else {
            this.hideToolTip();
        }
    };
    /**
     * @private
     */
    Selection.prototype.getTooltipPosition = function (widget, xPos, toolTipElement, isFormField) {
        var widgetTop = this.getTop(widget) * this.documentHelper.zoomFactor;
        var page = this.getPage(widget.paragraph);
        var containerWidth = this.documentHelper.viewerContainer.getBoundingClientRect().width + this.documentHelper.viewerContainer.scrollLeft;
        var left = page.boundingRectangle.x + xPos * this.documentHelper.zoomFactor;
        if ((left + toolTipElement.clientWidth + 10) > containerWidth) {
            left = left - ((toolTipElement.clientWidth - (containerWidth - left)) + 15);
        }
        var offsetHeight = !isFormField ? toolTipElement.offsetHeight : 0;
        var top = this.getPageTop(page) + (widgetTop - offsetHeight);
        top = top > this.documentHelper.viewerContainer.scrollTop ? top : top + widget.height + offsetHeight;
        return new Point(left, top);
    };
    /**
     * @private
     */
    Selection.prototype.updateSelectionInfo = function (info) {
        var cells = this.selectedWidgets.keys;
        if (cells[0] instanceof TableCellWidget && cells[cells.length - 1] instanceof TableCellWidget) {
            if (cells.length > 0) {
                var firstcell = cells[0];
                var lastCell = cells[cells.length - 1];
                var firstrow = firstcell.ownerRow;
                var lastRow = lastCell.ownerRow;
                var startCell = firstrow.getCell(firstrow.rowIndex, undefined, 0);
                var firstPara = this.owner.documentHelper.getFirstParagraphInCell(startCell);
                info.start = this.owner.documentHelper.selection.getHierarchicalIndex(firstPara, "0");
                var lastCellInRow = lastRow.getCell(lastRow.rowIndex, undefined, lastRow.childWidgets.length - 1);
                var lastPara = this.getLastParagraph(lastCellInRow);
                var offset = this.getParagraphLength(lastPara);
                info.end = this.owner.documentHelper.selection.getHierarchicalIndex(lastPara, offset.toString());
            }
        }
        return info;
    };
    /**
     * @private
     */
    Selection.prototype.createPasteElement = function (top, left) {
        var items;
        var locale = new L10n('documenteditor', this.owner.defaultLocale);
        locale.setLocale(this.owner.locale);
        switch (this.currentPasteAction) {
            case 'DefaultPaste':
                items = [
                    {
                        text: locale.getConstant('Keep source formatting'),
                        iconCss: 'e-icons e-de-paste-source'
                    },
                    {
                        text: locale.getConstant('Match destination formatting'),
                        iconCss: 'e-icons e-de-paste-merge'
                    },
                    {
                        text: locale.getConstant('Text only'),
                        iconCss: 'e-icons e-de-paste-text'
                    }
                ];
                break;
            case 'TextOnly':
                items = [
                    {
                        text: locale.getConstant('Text only'),
                        iconCss: 'e-icons e-de-paste-text'
                    }
                ];
                break;
            case 'InsertAsColumns':
            case 'OverwriteCells':
            case 'InsertAsRows':
                items = [
                    {
                        text: locale.getConstant('NestTable'),
                        iconCss: 'e-icons e-de-paste-nested-table'
                    },
                    {
                        text: locale.getConstant('InsertAsRows'),
                        iconCss: 'e-icons e-de-paste-row'
                    }
                ];
                if (this.currentPasteAction === 'InsertAsColumns') {
                    var obj = {
                        text: locale.getConstant('InsertAsColumns'),
                        iconCss: 'e-icons e-de-paste-column'
                    };
                    items.unshift(obj);
                }
                else if (this.currentPasteAction === 'OverwriteCells') {
                    var obj = {
                        text: locale.getConstant('OverwriteCells'),
                        iconCss: 'e-icons e-de-paste-overwrite-cells'
                    };
                    items.splice(2, 0, obj);
                }
                break;
        }
        if (!this.pasteElement) {
            this.pasteElement = createElement('div', { className: 'e-de-tooltip' });
            this.documentHelper.viewerContainer.appendChild(this.pasteElement);
            var splitButtonEle = createElement('button', { id: this.owner.containerId + '_iconsplitbtn' });
            this.pasteElement.appendChild(splitButtonEle);
            this.pasteDropDwn = new DropDownButton({
                items: items, iconCss: 'e-icons e-de-paste', select: this.pasteOptions
            });
            this.pasteDropDwn.appendTo(splitButtonEle);
        }
        else {
            this.pasteDropDwn.items = items;
        }
        this.pasteElement.style.display = 'block';
        this.pasteElement.style.position = 'absolute';
        this.pasteElement.style.left = left;
        this.pasteElement.style.top = top;
        this.pasteDropDwn.dataBind();
    };
    /**
    * Returns an array of context-based paste options.
    *
    * @returns {(PasteOptions | TablePasteOptions)[]} An array containing the available paste options.
    */
    Selection.prototype.getContextBasedPasteOptions = function (sfdtContent) {
        // Parse the sfdt content
        var content = HelperMethods.getSfdtDocument(sfdtContent);
        if (!isNullOrUndefined(content.optimizeSfdt) && content.optimizeSfdt) {
            this.owner.editorModule.keywordIndex = 1;
        }
        else {
            this.owner.editorModule.keywordIndex = 0;
        }
        var widgets = [];
        this.owner.editorModule.getBlocks(content, true, widgets, [], [], true);
        var selection = this.documentHelper.selection;
        // Check the sfdt has table alone 
        if (selection.start.paragraph.isInsideTable && selection.end.paragraph.isInsideTable) {
            var isTablePaste = false;
            if (widgets.length === 1) {
                var childWidgets = widgets[0].childWidgets;
                if ((childWidgets.length < 3)) {
                    if (childWidgets.length === 1 && childWidgets[0] instanceof TableWidget || childWidgets.length === 2 && childWidgets[0] instanceof TableWidget && childWidgets[1].isEmpty()) {
                        isTablePaste = true;
                    }
                }
            }
            if (isTablePaste) {
                var startCell = selection.start.paragraph.associatedCell;
                var endCell = selection.end.paragraph.associatedCell;
                var newTable = widgets[0].childWidgets[0];
                // tslint:disable-next-line:max-line-length
                if (startCell.ownerTable.equals(endCell.ownerTable)) {
                    if (selection.start.paragraph.associatedCell.rowIndex === 0 && selection.end.paragraph.associatedCell.rowIndex === 0
                        && startCell.equals(endCell) && !this.isCellSelected(startCell, selection.start, selection.end)) {
                        return ['NewColumn', 'NestTable', 'NewRow'];
                    }
                    else {
                        return ['NestTable', 'NewRow', 'OverwriteCells'];
                    }
                }
            }
        }
        return ['KeepSourceFormatting', 'MergeWithExistingFormatting', 'KeepTextOnly'];
    };
    /**
     * Show hyperlink tooltip
     * @private
     */
    Selection.prototype.showToolTip = function (x, y) {
        if (!this.toolTipObject) {
            this.toolTipObject = new Popup(this.toolTipElement, {
                height: 'auto',
                width: 'auto',
                relateTo: this.documentHelper.viewerContainer.parentElement,
                position: { X: x, Y: y }
            });
        }
    };
    /**
     * Hide tooltip object
     * @private
     */
    Selection.prototype.hideToolTip = function () {
        this.toolTipField = undefined;
        if (this.toolTipObject) {
            this.toolTipElement.style.display = 'none';
            this.toolTipObject.hide();
            this.toolTipObject.destroy();
            this.toolTipObject = undefined;
        }
    };
    /**
     * Return hyperlink field
     * @private
     */
    Selection.prototype.getHyperLinkFieldInCurrentSelection = function (widget, cursorPosition, isFormField) {
        var inline = undefined;
        var top = this.getTop(widget);
        var lineStartLeft = this.getLineStartLeft(widget);
        var leftIndent = HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.leftIndent);
        var rightIndent = HelperMethods.convertPointToPixel(widget.paragraph.paragraphFormat.rightIndent);
        if (cursorPosition.y < top || cursorPosition.y > top + widget.height
            || cursorPosition.x < lineStartLeft || cursorPosition.x > lineStartLeft + widget.paragraph.width + leftIndent + rightIndent) {
            return undefined;
        }
        var left = widget.paragraph.x;
        var elementValues = this.getFirstElement(widget, left);
        left = elementValues.left;
        var element = elementValues.element;
        if (isNullOrUndefined(element)) {
            var width = this.documentHelper.textHelper.getParagraphMarkWidth(widget.paragraph.characterFormat);
            if (cursorPosition.x <= lineStartLeft + width || cursorPosition.x >= lineStartLeft + width) {
                //Check if paragraph is within a field result.
                var checkedFields = [];
                var field = this.getHyperLinkFields(widget.paragraph, checkedFields, false, isFormField);
                checkedFields = [];
                checkedFields = undefined;
                return field;
            }
        }
        else {
            var renderedChild = widget.renderedElements;
            if (cursorPosition.x > left + element.margin.left) {
                for (var i = renderedChild.indexOf(element); i < renderedChild.length; i++) {
                    element = renderedChild[i];
                    if (cursorPosition.x < left + element.margin.left + element.width || i === renderedChild.length - 1) {
                        break;
                    }
                    left += element.margin.left + element.width;
                }
            }
            inline = element;
            var width = element.margin.left + element.width;
            if (isNullOrUndefined(inline.nextNode)) {
                //Include width of Paragraph mark.
                width += this.documentHelper.textHelper.getParagraphMarkWidth(inline.line.paragraph.characterFormat);
            }
            if (cursorPosition.x <= left + width) {
                //Check if inline is within a field result.
                var checkedFields = [];
                var field = this.getHyperLinkFieldInternal(inline.line.paragraph, inline, checkedFields, false, isFormField);
                checkedFields = [];
                checkedFields = undefined;
                return field;
            }
        }
        return undefined;
    };
    /**
     * Return FootnoteElementBox
     * @private
     */
    Selection.prototype.getFootNoteElementInCurrentSelection = function (lineWidget, position) {
        var inline = undefined;
        var top = this.getTop(lineWidget);
        var lineStartInLeft = this.getLineStartLeft(lineWidget);
        if (position.y < top || position.y > top + lineWidget.height
            || position.x < lineStartInLeft
            || position.x > lineStartInLeft + lineWidget.paragraph.width) {
            return undefined;
        }
        var leftLength = lineWidget.paragraph.x;
        var elementValues = this.getFirstElement(lineWidget, leftLength);
        leftLength = elementValues.left;
        var element = elementValues.element;
        if (isNullOrUndefined(element)) {
            var width = this.documentHelper.textHelper.getParagraphMarkWidth(lineWidget.paragraph.characterFormat);
            if (position.x <= lineStartInLeft + width || position.x >= lineStartInLeft + width) {
                //Check if paragraph is within a field result.
                var inlineObj = this.documentHelper.selection.start.currentWidget.getInline(this.documentHelper.selection.start.offset, 0);
                var footNote = inlineObj.element;
                if (footNote instanceof FootnoteElementBox) {
                    return footNote;
                }
                else {
                    return undefined;
                }
            }
        }
        else {
            if (position.x > leftLength + element.margin.left) {
                for (var i = lineWidget.children.indexOf(element); i < lineWidget.children.length; i++) {
                    element = lineWidget.children[i];
                    if (position.x < leftLength + element.margin.left + element.width || i === lineWidget.children.length - 1) {
                        break;
                    }
                    leftLength += element.margin.left + element.width;
                }
            }
            if (element instanceof FootnoteElementBox) {
                inline = element;
            }
            var width = element.margin.left + element.width;
            if (isNullOrUndefined(element.nextNode)) {
                //Include width of Paragraph mark.
                width += this.documentHelper.textHelper.getParagraphMarkWidth(element.line.paragraph.characterFormat);
            }
            if (position.x <= leftLength + width) {
                return inline;
            }
        }
        return undefined;
    };
    /**
     * Return field if paragraph contain hyperlink field
     * @private
     */
    Selection.prototype.getHyperlinkField = function (isRetrieve) {
        if (isNullOrUndefined(this.end)) {
            return undefined;
        }
        var index = 0;
        var selection = this.documentHelper.selection;
        var start = selection.start;
        var end = selection.end;
        if (!selection.isForward) {
            start = selection.end;
            end = selection.start;
            ;
        }
        var currentInline = this.end.currentWidget.getInline(end.offset, index);
        index = currentInline.index;
        var inline = currentInline.element;
        var checkedFields = [];
        var field = undefined;
        if (isNullOrUndefined(inline)) {
            field = this.getHyperLinkFields(this.end.paragraph, checkedFields, isRetrieve);
        }
        else if (this.documentHelper.isFormFillProtectedMode && inline instanceof BookmarkElementBox
            && inline.previousNode instanceof FieldElementBox && inline.previousNode.fieldType === 1) {
            field = undefined;
        }
        else {
            var paragraph = inline.line.paragraph;
            field = this.getHyperLinkFieldInternal(paragraph, inline, checkedFields, isRetrieve, false);
        }
        checkedFields = [];
        return field;
    };
    /**
     * @private
     */
    Selection.prototype.getHyperLinkFields = function (paragraph, checkedFields, isRetrieve, checkFormField) {
        for (var i = 0; i < this.documentHelper.fields.length; i++) {
            if (checkedFields.indexOf(this.documentHelper.fields[i]) !== -1 || isNullOrUndefined(this.documentHelper.fields[i].fieldSeparator)) {
                continue;
            }
            else {
                checkedFields.push(this.documentHelper.fields[i]);
            }
            var field = this.getFieldCode(this.documentHelper.fields[i]);
            field = field.trim().toLowerCase();
            var isParagraph = this.paragraphIsInFieldResult(this.documentHelper.fields[i], paragraph);
            if ((isRetrieve || (!isRetrieve && field.match('hyperlink '))) && isParagraph) {
                return this.documentHelper.fields[i];
            }
            if (isParagraph && checkFormField && this.documentHelper.fields[i].formFieldData) {
                return this.documentHelper.fields[i];
            }
            if ((isRetrieve || (!isRetrieve && field.match('ref '))) && isParagraph) {
                return this.documentHelper.fields[i];
            }
        }
        // if (paragraph.containerWidget instanceof BodyWidget && !(paragraph instanceof WHeaderFooter)) {
        //     return this.getHyperLinkFields((paragraph.con as WCompositeNode), checkedFields);
        // }
        return undefined;
    };
    /**
     * @private
     */
    Selection.prototype.getHyperLinkFieldInternal = function (paragraph, inline, fields, isRetrieve, checkFormField) {
        for (var i = 0; i < this.documentHelper.fields.length; i++) {
            if (fields.indexOf(this.documentHelper.fields[i]) !== -1 || isNullOrUndefined(this.documentHelper.fields[i].fieldSeparator)) {
                continue;
            }
            else {
                fields.push(this.documentHelper.fields[i]);
            }
            var fieldCode = this.getFieldCode(this.documentHelper.fields[i]);
            fieldCode = fieldCode.trim().toLowerCase();
            var fieldBegin = this.documentHelper.fields[i];
            var fieldEnd = fieldBegin.fieldEnd;
            if (isRetrieve && fieldBegin.nextNode instanceof BookmarkElementBox && fieldBegin.nextNode.reference) {
                fieldEnd = fieldBegin.nextNode.reference;
            }
            var isInline = (this.inlineIsInFieldResult(fieldBegin, fieldEnd, fieldBegin.fieldSeparator, inline, isRetrieve) || this.isImageField());
            if ((isRetrieve || (!isRetrieve && fieldCode.match('hyperlink '))) && isInline) {
                return this.documentHelper.fields[i];
            }
            if (isInline && checkFormField && this.documentHelper.fields[i].formFieldData) {
                return this.documentHelper.fields[i];
            }
            if ((isRetrieve || (!isRetrieve && fieldCode.match('ref '))) && isInline) {
                return this.documentHelper.fields[i];
            }
        }
        if (paragraph.containerWidget instanceof BodyWidget && !(paragraph instanceof HeaderFooterWidget)) {
            return this.getHyperLinkFieldInternal(paragraph.containerWidget, inline, fields, isRetrieve, checkFormField);
        }
        return undefined;
    };
    /**
     * @private
     */
    Selection.prototype.getBlock = function (currentIndex) {
        if (currentIndex === '' || isNullOrUndefined(currentIndex)) {
            return undefined;
        }
        var index = { index: currentIndex };
        var page = this.start.getPage(index);
        var bodyIndex = index.index.indexOf(';');
        var value = index.index.substring(0, bodyIndex);
        index.index = index.index.substring(bodyIndex).replace(';', '');
        var bodyWidget = page.bodyWidgets[parseInt(value, 10)];
        return this.getBlockInternal(bodyWidget, index.index);
    };
    /**
     * Return Block relative to position
     * @private
     */
    Selection.prototype.getBlockInternal = function (widget, position) {
        if (position === '' || isNullOrUndefined(position)) {
            return undefined;
        }
        var index = position.indexOf(';');
        var value = position.substring(0, index);
        position = position.substring(index).replace(';', '');
        var node = widget;
        // if (node instanceof Widget && value === 'HF') {
        //     //Gets the block in Header footers.
        //     let blockObj: BlockInfo = this.getBlock((node as WSection).headersFooters, position);
        //     return { 'node': (!isNullOrUndefined(blockObj)) ? blockObj.node : undefined, 'position': (!isNullOrUndefined(blockObj)) ? blockObj.position : undefined };
        // }
        index = parseInt(value, 10);
        if (index >= 0 && index < widget.childWidgets.length) {
            var child = widget.childWidgets[(index)];
            if (position.indexOf(';') >= 0) {
                if (child instanceof ParagraphWidget) {
                    if (position.indexOf(';') >= 0) {
                        position = '0';
                    }
                    return child;
                }
                if (child instanceof BlockWidget) {
                    var blockObj = this.getBlockInternal(child, position);
                    return blockObj;
                }
            }
            else {
                return child;
            }
        }
        else {
            return node;
        }
        return node;
    };
    /**
     * Return true if inline is in field result
     * @private
     */
    Selection.prototype.inlineIsInFieldResult = function (fieldBegin, fieldEnd, fieldSeparator, inline, isRetrieve) {
        if (!isNullOrUndefined(fieldEnd) && !isNullOrUndefined(fieldSeparator)) {
            if (this.isExistBeforeInline(fieldSeparator, inline)) {
                return this.isExistAfterInline(fieldEnd, inline, isRetrieve);
            }
        }
        return false;
    };
    /**
     * Retrieve true if paragraph is in field result
     * @private
     */
    Selection.prototype.paragraphIsInFieldResult = function (fieldBegin, paragraph) {
        if (!isNullOrUndefined(fieldBegin.fieldEnd) && !isNullOrUndefined(fieldBegin.fieldSeparator)) {
            var fieldParagraph = fieldBegin.fieldSeparator.line.paragraph;
            if (fieldBegin.fieldSeparator.line.paragraph === paragraph
                || this.isExistBefore(fieldParagraph, paragraph)) {
                var currentParagraph = fieldBegin.fieldEnd.line.paragraph;
                return (currentParagraph !== paragraph && this.isExistAfter(fieldParagraph, paragraph));
            }
        }
        return false;
    };
    /**
     * Return true if image is In field
     * @private
     */
    Selection.prototype.isImageField = function () {
        if (this.start.paragraph.isEmpty() || this.end.paragraph.isEmpty()) {
            return false;
        }
        var startPosition = this.start;
        var endPosition = this.end;
        if (!this.isForward) {
            startPosition = this.end;
            endPosition = this.start;
        }
        var indexInInline = 0;
        var inlineInfo = startPosition.paragraph.getInline(startPosition.offset, indexInInline);
        var inline = inlineInfo.element;
        indexInInline = inlineInfo.index;
        if (indexInInline === inline.length) {
            inline = this.getNextRenderedElementBox(inline, indexInInline);
        }
        inlineInfo = endPosition.paragraph.getInline(endPosition.offset, indexInInline);
        var endInline = inlineInfo.element;
        indexInInline = inlineInfo.index;
        if (inline instanceof FieldElementBox && inline.fieldType === 0
            && endInline instanceof FieldElementBox && endInline.fieldType === 1 && inline.fieldSeparator) {
            var fieldValue = inline.fieldSeparator.nextNode;
            if (fieldValue instanceof ImageElementBox && fieldValue.nextNode === endInline) {
                return true;
            }
        }
        return false;
    };
    /**
     * Return true if selection is in Form field
     * @private
     */
    Selection.prototype.isFormField = function () {
        var inline = this.currentFormField;
        if (inline instanceof FieldElementBox && inline.formFieldData) {
            return true;
        }
        return false;
    };
    /**
     * Return true if selection is in reference field
     * @private
     */
    Selection.prototype.isReferenceField = function (field) {
        if (isNullOrUndefined(field)) {
            field = this.getHyperlinkField(true);
        }
        if (field) {
            var fieldCode = this.getFieldCode(field);
            fieldCode = fieldCode.toLowerCase();
            if (field instanceof FieldElementBox && fieldCode.match('ref ')) {
                return true;
            }
        }
        return false;
    };
    /**
     * Return true if selection is in text form field
     * @private
     */
    Selection.prototype.isInlineFormFillMode = function (field) {
        if (this.documentHelper.isInlineFormFillProtectedMode) {
            field = isNullOrUndefined(field) ? this.currentFormField : field;
            if (isNullOrUndefined(field)) {
                field = this.getCurrentFormField();
            }
            if (field) {
                if (field.formFieldData instanceof TextFormField && field.formFieldData.type === 'Text') {
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.getFormFieldType = function (formField) {
        if (isNullOrUndefined(formField)) {
            formField = this.currentFormField;
        }
        if (formField instanceof FieldElementBox) {
            if (formField.formFieldData instanceof TextFormField) {
                return 'Text';
            }
            else if (formField.formFieldData instanceof CheckBoxFormField) {
                return 'CheckBox';
            }
            else if (formField.formFieldData instanceof DropDownFormField) {
                return 'DropDown';
            }
        }
        return undefined;
    };
    /**
     * Get selected form field type
     * @private
     */
    Selection.prototype.getCurrentFormField = function (checkFieldResult) {
        var field;
        if (checkFieldResult || this.documentHelper.isFormFillProtectedMode && this.owner.documentEditorSettings.formFieldSettings &&
            this.owner.documentEditorSettings.formFieldSettings.formFillingMode === 'Inline') {
            for (var i = 0; i < this.documentHelper.formFields.length; i++) {
                var formField = this.documentHelper.formFields[i];
                var start = this.start;
                var end = this.end;
                if (!this.isForward) {
                    start = this.end;
                    end = this.start;
                }
                if (HelperMethods.isLinkedFieldCharacter(formField)) {
                    var offset = formField.fieldSeparator.line.getOffset(formField.fieldSeparator, 1);
                    var fieldStart = new TextPosition(this.owner);
                    fieldStart.setPositionParagraph(formField.fieldSeparator.line, offset);
                    var fieldEndElement = formField.fieldEnd;
                    offset = fieldEndElement.line.getOffset(fieldEndElement, 0);
                    var fieldEnd = new TextPosition(this.owner);
                    fieldEnd.setPositionParagraph(fieldEndElement.line, offset);
                    if ((start.isExistAfter(fieldStart) || start.isAtSamePosition(fieldStart))
                        && (end.isExistBefore(fieldEnd) || end.isAtSamePosition(fieldEnd))) {
                        field = formField;
                        break;
                    }
                }
            }
        }
        else {
            field = this.getHyperlinkField(true);
        }
        if (field instanceof FieldElementBox && field.fieldType === 0 && !isNullOrUndefined(field.formFieldData)) {
            return field;
        }
        return undefined;
    };
    /**
     * @private
     */
    Selection.prototype.getCurrentTextFrame = function () {
        var container = this.start.paragraph.containerWidget;
        do {
            if (container instanceof TextFrame) {
                return container;
            }
            if (container) {
                container = container.containerWidget;
            }
        } while (container);
        return null;
    };
    /**
     * @private
     */
    Selection.prototype.isTableSelected = function (isNested) {
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        if (isNullOrUndefined(start.paragraph.associatedCell) ||
            isNullOrUndefined(end.paragraph.associatedCell)) {
            return false;
        }
        var table = start.paragraph.associatedCell.ownerTable.getSplitWidgets();
        var firstParagraph = this.getFirstBlockInFirstCell(table[0]);
        var lastParagraph = this.getLastBlockInLastCell(table[table.length - 1]);
        if (isNested) {
            var nestedTable = lastParagraph.associatedCell.ownerTable;
            while (nestedTable.containerWidget instanceof TableCellWidget) {
                nestedTable = nestedTable.containerWidget.ownerTable;
            }
            lastParagraph = this.getLastBlockInLastCell(nestedTable);
        }
        return start.paragraph.associatedCell.equals(firstParagraph.associatedCell) &&
            end.paragraph.associatedCell.equals(lastParagraph.associatedCell)
            && (!firstParagraph.associatedCell.equals(lastParagraph.associatedCell) || (start.offset === 0
                && end.offset === this.getLineLength(lastParagraph.lastChild) + 1));
    };
    /**
     * Select List Text
     * @private
     */
    Selection.prototype.selectListText = function () {
        var lineWidget = this.documentHelper.selectionLineWidget;
        var endOffset = '0';
        var selectionIndex = lineWidget.getHierarchicalIndex(endOffset);
        var startPosition = this.getTextPosition(selectionIndex);
        var endPosition = this.getTextPosition(selectionIndex);
        this.isSelectList = true;
        this.selectRange(startPosition, endPosition);
        this.isSelectList = false;
        this.highlightListText(this.documentHelper.selectionLineWidget);
        this.contextTypeInternal = 'List';
    };
    /**
     * Manually select the list text
     * @private
     */
    Selection.prototype.highlightListText = function (linewidget) {
        var width = linewidget.children[0].width;
        var left = this.documentHelper.getLeftValue(linewidget);
        var top = linewidget.paragraph.y;
        this.createHighlightBorder(linewidget, width, left, top, false);
        this.documentHelper.isListTextSelected = true;
    };
    /**
     * @private
     */
    Selection.prototype.updateImageSize = function (imageFormat) {
        this.owner.isShiftingEnabled = true;
        var startPosition = this.start;
        var endPosition = this.end;
        if (!this.isForward) {
            startPosition = this.end;
            endPosition = this.start;
        }
        var inline = null;
        var index = 0;
        var paragraph = startPosition.paragraph;
        if (paragraph === endPosition.paragraph
            && startPosition.offset + 1 === endPosition.offset) {
            var inlineObj = paragraph.getInline(endPosition.offset, index);
            inline = inlineObj.element;
            index = inlineObj.index;
        }
        if (inline instanceof ImageElementBox || inline instanceof ShapeElementBox) {
            var width = inline.width;
            var height = inline.height;
            var alternateText = inline.alternateText;
            inline.width = imageFormat.width;
            inline.height = imageFormat.height;
            inline.alternateText = imageFormat.alternatetext;
            imageFormat.width = width;
            imageFormat.height = height;
            imageFormat.alternatetext = alternateText;
            if (paragraph !== null && paragraph.containerWidget !== null && this.owner.editorModule) {
                var lineIndex = paragraph.childWidgets.indexOf(inline.line);
                var elementIndex = inline.line.children.indexOf(inline);
                this.documentHelper.layout.reLayoutParagraph(paragraph, lineIndex, elementIndex);
                this.highlightSelection(false);
            }
        }
    };
    /**
     * Gets selected table content
     * @private
     */
    Selection.prototype.getSelectedCellsInTable = function (table, startCell, endCell) {
        var startColumnIndex = startCell.columnIndex;
        var endColumnIndex = endCell.columnIndex + endCell.cellFormat.columnSpan - 1;
        var startRowindex = startCell.ownerRow.index;
        var endRowIndex = endCell.ownerRow.index;
        var cells = [];
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            if (row.index >= startRowindex && row.index <= endRowIndex) {
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    if (cell.columnIndex >= startColumnIndex && cell.columnIndex <= endColumnIndex) {
                        cells.push(cell);
                    }
                }
            }
            if (row.index > endRowIndex) {
                break;
            }
        }
        return cells;
        // return html;
    };
    /**
     * Copies the selected content to clipboard.
     *
     * @returns {void}
     */
    Selection.prototype.copy = function () {
        if (this.isEmpty) {
            return;
        }
        this.copySelectedContent(false);
    };
    /**
     * @private
     *
     * @returns {void}
     */
    Selection.prototype.copySelectedContent = function (isCut) {
        if (isNullOrUndefined(this.owner.sfdtExportModule)) {
            return;
        }
        this.documentHelper.isCopying = true;
        this.htmlContent = this.getHtmlContent();
        this.copyToClipboard();
        this.documentHelper.isCopying = false;
        if (isCut && this.owner.editorModule) {
            this.owner.editorModule.handleCut(this);
        }
        if (this.owner.enableAutoFocus) {
            this.documentHelper.updateFocus();
        }
    };
    /**
     * Write the selected content as SFDT.
     * @returns SFDT Object.
     */
    Selection.prototype.writeSfdt = function () {
        var startPosition = this.start;
        var endPosition = this.end;
        if (!this.isForward) {
            startPosition = this.end;
            endPosition = this.start;
        }
        return (this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), startPosition.currentWidget, startPosition.offset, endPosition.currentWidget, endPosition.offset, true));
    };
    /**
     * @private
     */
    Selection.prototype.getHtmlContent = function () {
        var documentContent = this.writeSfdt();
        this.sfdtContent = JSON.stringify(documentContent);
        if (this.owner.editorModule) {
            this.owner.editorModule.copiedData = JSON.stringify(documentContent);
        }
        var isOptimizedSfdt = this.owner.documentEditorSettings.optimizeSfdt;
        return this.htmlWriter.writeHtml(documentContent, isOptimizedSfdt);
    };
    Selection.prototype.copyToClipboard = function (htmlContent) {
        window.getSelection().removeAllRanges();
        //Skip the copy operation Using shadow DOM if it is mobile device or IE browser.
        var isSafariOnMac = (navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
            navigator.userAgent &&
            navigator.userAgent.indexOf('Macintosh') > -1 &&
            navigator.userAgent.indexOf('Safari') > -1 &&
            navigator.userAgent.indexOf('Chrome') === -1);
        var isMobileDeviceOrInternetExplorer = /Android|Windows Phone|iPhone|Trident|webOS/i.test(navigator.userAgent) || isSafariOnMac;
        var shadowRoot;
        var div = document.createElement('div');
        div.style.left = '-10000px';
        div.style.top = '-10000px';
        div.style.position = 'relative';
        if (!isNullOrUndefined(htmlContent)) {
            div.innerHTML = htmlContent;
        }
        else if (isSafariOnMac) {
            div.innerText = 'copy';
        }
        if (!isMobileDeviceOrInternetExplorer) {
            shadowRoot = document.createElement('div');
            var shadowDOM = shadowRoot.attachShadow({ mode: 'open' });
            shadowDOM.appendChild(div);
            document.body.appendChild(shadowRoot);
        }
        else {
            document.body.appendChild(div);
        }
        if (navigator !== undefined && navigator.userAgent.indexOf('Firefox') !== -1) {
            div.contentEditable = 'true';
        }
        var range = document.createRange();
        range.selectNodeContents(div);
        window.getSelection().addRange(range);
        var copySuccess = false;
        try {
            copySuccess = document.execCommand('copy');
        }
        catch (e) {
            // Copying data to Clipboard can potentially fail - for example, if another application is holding Clipboard open.       
        }
        finally {
            window.getSelection().removeAllRanges();
            div.parentNode.removeChild(div);
            if (!isMobileDeviceOrInternetExplorer) {
                shadowRoot.parentNode.removeChild(shadowRoot);
            }
        }
        return copySuccess;
    };
    /**
     * @private
     */
    Selection.prototype.onCopy = function (event) {
        if (event.clipboardData && !isNullOrUndefined(this.htmlContent)) {
            event.clipboardData.clearData();
            event.clipboardData.setData('text/html', this.htmlContent);
            event.clipboardData.setData('text/plain', this.text);
            event.clipboardData.setData('application/json', JSON.stringify(this.sfdtContent));
            this.htmlContent = undefined;
            this.sfdtContent = undefined;
        }
    };
    // Caret implementation starts
    /**
     * Shows caret in current selection position.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.showCaret = function () {
        var page = !isNullOrUndefined(this.documentHelper.currentPage) ? this.documentHelper.currentPage : this.documentHelper.currentRenderingPage;
        if (isNullOrUndefined(page) || this.documentHelper.isRowOrCellResizing || (this.owner.enableImageResizerMode && this.owner.imageResizerModule.isImageResizerVisible && !this.owner.imageResizerModule.isShapeResize)) {
            return;
        }
        var left = page.boundingRectangle.x;
        var right;
        if (this.viewer instanceof PageLayoutViewer) {
            right = page.boundingRectangle.width * this.documentHelper.zoomFactor + left;
        }
        else {
            right = page.boundingRectangle.width - this.owner.viewer.padding.right - this.documentHelper.scrollbarWidth;
        }
        if (!this.owner.enableImageResizerMode || (!this.owner.imageResizerModule.isImageResizerVisible || this.owner.imageResizerModule.isShapeResize)) {
            if (this.isHideSelection(this.start.paragraph)) {
                this.caret.style.display = 'none';
            }
            else if (this.isEmpty && (!this.owner.isReadOnly || this.owner.enableCursorOnReadOnly || this.isInlineFormFillMode())) {
                var caretLeft = parseInt(this.caret.style.left.replace('px', ''), 10);
                if (caretLeft < left || caretLeft > right) {
                    this.caret.style.display = 'none';
                }
                else {
                    this.caret.style.display = 'block';
                }
            }
            else if (this.isImageSelected && !this.owner.enableImageResizerMode) {
                this.caret.style.display = 'block';
            }
            else {
                if (this.caret.style.display === 'block' || isNullOrUndefined(this)) {
                    if (!this.documentHelper.isComposingIME) {
                        this.caret.style.display = 'none';
                    }
                }
            }
        }
        if (!isNullOrUndefined(this) && this.documentHelper.isTouchInput && !this.owner.isReadOnlyMode) {
            var caretStartLeft = parseInt(this.documentHelper.touchStart.style.left.replace('px', ''), 10) + 14;
            var caretEndLeft = parseInt(this.documentHelper.touchEnd.style.left.replace('px', ''), 10) + 14;
            var page_1 = this.getSelectionPage(this.start);
            if (page_1) {
                if (caretEndLeft < left || caretEndLeft > right) {
                    this.documentHelper.touchEnd.style.display = 'none';
                }
                else {
                    this.documentHelper.touchEnd.style.display = 'block';
                }
                if (!this.isEmpty) {
                    left = page_1.boundingRectangle.x;
                    right = page_1.boundingRectangle.width * this.documentHelper.zoomFactor + left;
                }
                if (caretStartLeft < left || caretStartLeft > right) {
                    this.documentHelper.touchStart.style.display = 'none';
                }
                else {
                    this.documentHelper.touchStart.style.display = 'block';
                }
            }
        }
        else {
            this.documentHelper.touchStart.style.display = 'none';
            this.documentHelper.touchEnd.style.display = 'none';
        }
    };
    /**
     * To set the editable div caret position
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.setEditableDivCaretPosition = function (index) {
        this.documentHelper.editableDiv.focus();
        var child = this.documentHelper.editableDiv.childNodes[this.documentHelper.editableDiv.childNodes.length - 1];
        if (child) {
            var range = document.createRange();
            range.setStart(child, index);
            range.collapse(true);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
        }
    };
    /**
     * Initializes caret.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.initCaret = function () {
        this.caret = createElement('div', {
            styles: 'position:absolute',
            className: 'e-de-blink-cursor e-de-cursor-animation'
        });
        this.caret.style.display = 'none';
        this.owner.documentHelper.viewerContainer.appendChild(this.caret);
    };
    /**
     * Updates caret position.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.updateCaretPosition = function () {
        var caretPosition = this.end.location;
        var page = this.getSelectionPage(this.end);
        if (page && !isNullOrUndefined(this.caret)) {
            var left = page.boundingRectangle.x + (Math.round(caretPosition.x) * this.documentHelper.zoomFactor) + 'px';
            this.caret.style.left = left;
            var caretInfo = this.updateCaretSize(this.owner.selectionModule.end);
            var topMargin = caretInfo.topMargin;
            //let caretHeight: number = caretInfo.height;
            var viewer = this.viewer;
            var top_5 = (page.boundingRectangle.y - viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1)) * this.documentHelper.zoomFactor + viewer.pageGap * (this.documentHelper.pages.indexOf(page) + 1);
            var pageTop = top_5;
            this.caret.style.top = pageTop + (Math.round(caretPosition.y + topMargin) * this.documentHelper.zoomFactor) + 'px';
            if (this.owner.selectionModule.characterFormat.baselineAlignment === 'Subscript') {
                this.caret.style.top = parseFloat(this.caret.style.top) + (parseFloat(this.caret.style.height) / 2) + 'px';
            }
            if (this.documentHelper.isTouchInput || this.documentHelper.touchStart.style.display !== 'none') {
                this.documentHelper.touchStart.style.left = page.boundingRectangle.x + (Math.round(caretPosition.x) * this.documentHelper.zoomFactor - 14) + 'px';
                this.documentHelper.touchStart.style.top = pageTop + ((caretPosition.y + caretInfo.height) * this.documentHelper.zoomFactor) + 'px';
                this.documentHelper.touchEnd.style.left = page.boundingRectangle.x + (Math.round(caretPosition.x) * this.documentHelper.zoomFactor - 14) + 'px';
                this.documentHelper.touchEnd.style.top = pageTop + ((caretPosition.y + caretInfo.height) * this.documentHelper.zoomFactor) + 'px';
            }
            if (Browser.isDevice) {
                this.documentHelper.editableDiv.style.left = left + "px";
                this.documentHelper.editableDiv.style.top = top_5 + "px";
            }
        }
        this.showHidePasteOptions(this.caret.style.top, this.caret.style.left);
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.showHidePasteOptions = function (top, left) {
        if (Browser.isIE) {
            return;
        }
        if (this.isViewPasteOptions) {
            if (this.pasteElement && this.pasteElement.style.display === 'block') {
                return;
            }
            this.createPasteElement(top, left);
        }
        else if (this.pasteElement) {
            this.pasteElement.style.display = 'none';
            if (!isNullOrUndefined(this.owner.editorModule)) {
                this.owner.editorModule.isHtmlPaste = false;
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.getRect = function (position) {
        var caretPosition = position.location;
        var page = this.getSelectionPage(position);
        if (page) {
            var documentHelper = this.owner.documentHelper;
            var left = page.boundingRectangle.x + (Math.round(caretPosition.x) * documentHelper.zoomFactor);
            var pageGap = this.viewer.pageGap;
            var pageTop = (page.boundingRectangle.y - pageGap * (page.index + 1)) * documentHelper.zoomFactor + pageGap * (page.index + 1);
            var top_6 = pageTop + (Math.round(caretPosition.y) * documentHelper.zoomFactor);
            return new Point(left, top_6);
        }
        return new Point(0, 0);
    };
    /**
     * Gets current selected page
     * @private
     */
    Selection.prototype.getSelectionPage = function (position) {
        var lineWidget = this.getLineWidgetInternal(position.currentWidget, position.offset, true);
        if (lineWidget) {
            return this.getPage(lineWidget.paragraph);
        }
        return undefined;
    };
    /**
     * Updates caret size.
     * @private
     */
    Selection.prototype.updateCaretSize = function (textPosition, skipUpdate) {
        var topMargin = 0;
        var isItalic = false;
        var caret;
        var index = 0;
        var caretHeight = 0;
        if (this.characterFormat.italic) {
            isItalic = this.characterFormat.italic;
        }
        if (textPosition.paragraph.isEmpty()) {
            var paragraph = textPosition.paragraph;
            var bottomMargin = 0;
            var paragraphInfo = this.getParagraphMarkSize(paragraph, topMargin, bottomMargin);
            topMargin = paragraphInfo.topMargin;
            bottomMargin = paragraphInfo.bottomMargin;
            var height = paragraphInfo.height;
            var baselineAlignment = this.characterFormat.baselineAlignment;
            var elementHeight = height;
            if (baselineAlignment !== 'Normal') {
                //Set the caret height as sub/super script text height and updates the top margin for sub script text.
                elementHeight = elementHeight / 1.5;
                if (baselineAlignment === 'Subscript') {
                    topMargin = height - elementHeight;
                }
            }
            caretHeight = topMargin < 0 ? topMargin + elementHeight : elementHeight;
            if (!skipUpdate) {
                this.caret.style.height = caretHeight * this.documentHelper.zoomFactor + 'px';
            }
            topMargin = 0;
        }
        else {
            var inlineInfo = textPosition.currentWidget.getInline(textPosition.offset, index);
            index = inlineInfo.index;
            var inline = inlineInfo.element;
            if (!isNullOrUndefined(inline)) {
                caret = this.getCaretHeight(inline, index, inline.characterFormat, true, topMargin, isItalic);
                caretHeight = caret.height;
                if (inline.characterFormat.hidden && caret.height === 0) {
                    var visibleElement = inline;
                    while (visibleElement && visibleElement.characterFormat.hidden) {
                        visibleElement = visibleElement.previousElement;
                    }
                    if (isNullOrUndefined(visibleElement)) {
                        visibleElement = inline;
                        while (visibleElement && visibleElement.characterFormat.hidden) {
                            visibleElement = visibleElement.nextElement;
                        }
                    }
                    if (!isNullOrUndefined(visibleElement)) {
                        var height = this.documentHelper.textHelper.getHeight(visibleElement.characterFormat).Height;
                        caretHeight = caret.height = height;
                    }
                }
                if (!skipUpdate) {
                    this.caret.style.height = caret.height * this.documentHelper.zoomFactor + 'px';
                }
            }
        }
        if (!skipUpdate) {
            if (isItalic) {
                this.caret.style.transform = 'rotate(13deg)';
            }
            else {
                this.caret.style.transform = '';
            }
        }
        return {
            'topMargin': topMargin,
            'height': caretHeight
        };
    };
    /**
     * Updates caret to page.
     * @private
     * @returns {void}
     */
    Selection.prototype.updateCaretToPage = function (startPosition, endPage) {
        if (!isNullOrUndefined(endPage)) {
            this.documentHelper.selectionEndPage = endPage;
            if (this.owner.selectionModule.isEmpty) {
                this.documentHelper.selectionStartPage = endPage;
            }
            else {
                var startLineWidget = this.getLineWidgetParagraph(startPosition.offset, startPosition.paragraph.childWidgets[0]);
                //Gets start page.
                var startPage = this.getPage(startLineWidget.paragraph);
                if (!isNullOrUndefined(startPage)) {
                    this.documentHelper.selectionStartPage = startPage;
                }
            }
        }
        if (this.owner.enableAutoFocus) {
            this.checkForCursorVisibility();
        }
    };
    /**
     * Gets caret bottom position.
     * @private
     */
    Selection.prototype.getCaretBottom = function (textPosition, isEmptySelection) {
        var bottom = textPosition.location.y;
        if (textPosition.paragraph.isEmpty()) {
            var paragraph = textPosition.paragraph;
            var topMargin = 0;
            var bottomMargin = 0;
            var sizeInfo = this.getParagraphMarkSize(paragraph, topMargin, bottomMargin);
            topMargin = sizeInfo.topMargin;
            bottomMargin = sizeInfo.bottomMargin;
            bottom += sizeInfo.height;
            bottom += topMargin;
            if (!isEmptySelection) {
                bottom += bottomMargin;
            }
        }
        else {
            var index = 0;
            var inlineInfo = textPosition.paragraph.getInline(textPosition.offset, index);
            var inline = inlineInfo.element;
            index = inlineInfo.index;
            var topMargin = 0;
            var isItalic = false;
            var caretHeightInfo = this.getCaretHeight(inline, index, inline.characterFormat, false, topMargin, isItalic);
            topMargin = caretHeightInfo.topMargin;
            isItalic = caretHeightInfo.isItalic;
            bottom += caretHeightInfo.height;
            if (isEmptySelection) {
                bottom -= HelperMethods.convertPointToPixel(this.documentHelper.layout.getAfterSpacing(textPosition.paragraph));
            }
        }
        return bottom;
    };
    /**
     * Checks for cursor visibility.
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.checkForCursorVisibility = function () {
        this.showCaret();
    };
    // caret implementation ends
    /**
     * Keyboard shortcuts
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.onKeyDownInternal = function (event, ctrl, shift, alt) {
        var key = event.which || event.keyCode;
        this.owner.focusIn();
        if (ctrl && !shift && !alt) {
            this.documentHelper.isControlPressed = true;
            switch (key) {
                // case 9:
                //     event.preventDefault();
                //     if (this.owner.acceptTab) {
                //         this.selection.handleTabKey(false, false);
                //     }
                //     break;
                case 35:
                    this.handleControlEndKey();
                    break;
                case 36:
                    this.handleControlHomeKey();
                    break;
                case 37:
                    this.handleControlLeftKey();
                    break;
                case 38:
                    this.handleControlUpKey();
                    break;
                case 39:
                    this.handleControlRightKey();
                    break;
                case 40:
                    this.handleControlDownKey();
                    break;
                case 65:
                    this.owner.selectionModule.selectAll();
                    break;
                case 67:
                    event.preventDefault();
                    this.copy();
                    break;
                case 70:
                    event.preventDefault();
                    if (!isNullOrUndefined(this.owner.optionsPaneModule)) {
                        this.owner.documentEditorSettings.showNavigationPane = true;
                        this.owner.optionsPaneModule.showHideOptionsPane(true);
                    }
                    break;
            }
        }
        else if (shift && !ctrl && !alt) {
            this.documentHelper.isCompleted = false;
            switch (key) {
                case 33:
                    event.preventDefault();
                    this.handlePageUpPageDownKey(false, shift);
                    break;
                case 34:
                    event.preventDefault();
                    this.handlePageUpPageDownKey(true, shift);
                    break;
                case 35:
                    this.handleShiftEndKey();
                    event.preventDefault();
                    break;
                case 36:
                    this.handleShiftHomeKey();
                    event.preventDefault();
                    break;
                case 37:
                    this.handleShiftLeftKey();
                    event.preventDefault();
                    break;
                case 38:
                    this.handleShiftUpKey();
                    event.preventDefault();
                    break;
                case 39:
                    this.handleShiftRightKey();
                    event.preventDefault();
                    break;
                case 40:
                    this.handleShiftDownKey();
                    event.preventDefault();
                    break;
            }
        }
        else if (shift && ctrl && !alt) {
            switch (key) {
                case 32:
                    this.owner.editorModule.insertText(String.fromCharCode(160));
                    break;
                case 35:
                    this.handleControlShiftEndKey();
                    break;
                case 36:
                    this.handleControlShiftHomeKey();
                    break;
                case 37:
                    this.handleControlShiftLeftKey();
                    break;
                case 38:
                    this.handleControlShiftUpKey();
                    break;
                case 39:
                    this.handleControlShiftRightKey();
                    break;
                case 40:
                    this.handleControlShiftDownKey();
                    break;
                case 56:
                    this.owner.toggleShowHiddenMarksInternal();
                    break;
            }
        }
        else {
            switch (key) {
                // case 9:
                //     event.preventDefault();
                //     if (this.owner.acceptTab) {
                //         this.handleTabKey(true, false);
                //     }
                //     break;  
                case 33:
                    event.preventDefault();
                    this.handlePageUpPageDownKey(false, shift);
                    break;
                case 34:
                    event.preventDefault();
                    this.handlePageUpPageDownKey(true, shift);
                    break;
                case 35:
                    this.handleEndKey();
                    event.preventDefault();
                    break;
                case 36:
                    this.handleHomeKey();
                    event.preventDefault();
                    break;
                case 37:
                    this.handleLeftKey();
                    event.preventDefault();
                    break;
                case 38:
                    this.handleUpKey();
                    event.preventDefault();
                    break;
                case 39:
                    this.handleRightKey();
                    event.preventDefault();
                    break;
                case 40:
                    this.handleDownKey();
                    event.preventDefault();
                    break;
            }
        }
        if (this.isFormField() && !(this.documentHelper.isDocumentProtected)) {
            var formField = this.getCurrentFormField(true);
            if (formField && formField.formFieldData instanceof DropDownFormField) {
                formField = (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 40) ? formField : formField.nextElement instanceof BookmarkElementBox ? formField.nextElement.reference : formField.fieldEnd;
                var index = event.keyCode === 39 ? 1 : 0;
                var offset = formField.line.getOffset(formField, index);
                var point = this.getPhysicalPositionInternal(formField.line, offset, false);
                this.selectInternal(formField.line, formField, index, point);
            }
        }
        if (!this.owner.isReadOnlyMode || this.documentHelper.isCommentOnlyMode || this.isInlineFormFillMode() || (this.documentHelper.isDocumentProtected && this.documentHelper.protectionType === 'FormFieldsOnly' && this.documentHelper.owner.editor.canEditContentControl && !isNullOrUndefined(this.documentHelper.selection) && this.documentHelper.selection.checkContentControlLocked())) {
            this.owner.editorModule.onKeyDownInternal(event, ctrl, shift, alt);
        }
        else if (this.documentHelper.isDocumentProtected && this.documentHelper.protectionType === 'FormFieldsOnly') {
            if (event.keyCode === 9 || event.keyCode === 32) {
                this.owner.editorModule.onKeyDownInternal(event, ctrl, shift, alt);
            }
        }
        if (this.owner.searchModule) {
            if (!isNullOrUndefined(this.owner.searchModule.searchHighlighters) && this.owner.searchModule.searchHighlighters.length > 0) {
                this.owner.searchModule.searchResults.clear();
            }
        }
        if (event.keyCode === 27 || event.which === 27) {
            if (!isNullOrUndefined(this.owner.optionsPaneModule)) {
                this.owner.optionsPaneModule.showHideOptionsPane(false);
                this.documentHelper.updateFocus();
            }
            if (this.owner.enableHeaderAndFooter) {
                this.disableHeaderFooter();
            }
        }
    };
    //#region Enable or disable Header Footer
    /**
     * @private
     */
    Selection.prototype.checkAndEnableHeaderFooter = function (point, pagePoint) {
        var page = this.documentHelper.currentPage;
        if (this.isCursorInsidePageRect(point, page)) {
            if (this.isCursorInHeaderRegion(point, page)) {
                if (this.owner.enableHeaderAndFooter) {
                    return false;
                }
                return this.enableHeadersFootersRegion(page.headerWidget, page);
            }
            if (this.isCursorInFooterRegion(point, page)) {
                if (this.owner.enableHeaderAndFooter) {
                    return false;
                }
                return this.enableHeadersFootersRegion(page.footerWidget, page);
            }
        }
        if (this.owner.enableHeaderAndFooter) {
            this.owner.enableHeaderAndFooter = false;
            this.documentHelper.updateTextPositionForSelection(pagePoint, 1);
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.isCursorInsidePageRect = function (point, page) {
        if ((this.viewer.containerLeft + point.x) >= page.boundingRectangle.x &&
            (this.viewer.containerLeft + point.x) <= (page.boundingRectangle.x + (page.boundingRectangle.width * this.documentHelper.zoomFactor)) && this.viewer instanceof PageLayoutViewer) {
            return true;
        }
        else if ((this.viewer.containerLeft + point.x) >= page.boundingRectangle.x &&
            (this.viewer.containerLeft + point.x) <= (page.boundingRectangle.x + page.boundingRectangle.width)) {
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.isCursorInHeaderRegion = function (point, page) {
        if (this.viewer instanceof PageLayoutViewer) {
            var pageTop = this.getPageTop(page);
            var headerHeight = 0;
            var header = page.headerWidget;
            if (header) {
                headerHeight = (header.y + header.height);
            }
            var isEmpty = header.isEmpty && !this.owner.enableHeaderAndFooter;
            var topMargin = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.topMargin);
            var pageHeight = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.pageHeight);
            var height = isEmpty ? topMargin : Math.min(Math.max(headerHeight, topMargin), pageHeight / 100 * 40);
            height = height * this.documentHelper.zoomFactor;
            if ((this.viewer.containerTop + point.y) >= pageTop && (this.viewer.containerTop + point.y) <= pageTop + height) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.isCursorInFooterRegion = function (point, page) {
        if (this.viewer instanceof PageLayoutViewer) {
            var pageRect = page.boundingRectangle;
            var pageTop = this.getPageTop(page);
            var pageBottom = pageTop + (pageRect.height * this.documentHelper.zoomFactor);
            var footerDistance = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.footerDistance);
            var footerHeight = 0;
            if (page.footerWidget) {
                footerHeight = page.footerWidget.height;
            }
            var bottomMargin = HelperMethods.convertPointToPixel(page.bodyWidgets[0].sectionFormat.bottomMargin);
            var isEmpty = page.footerWidget.isEmpty && !this.owner.enableHeaderAndFooter;
            var height = pageRect.height;
            if (isEmpty) {
                height = (height - bottomMargin) * this.documentHelper.zoomFactor;
            }
            else {
                height = (height - Math.min(pageRect.height / 100 * 40, Math.max(footerHeight + footerDistance, bottomMargin))) * this.documentHelper.zoomFactor;
            }
            if ((this.viewer.containerTop + point.y) <= pageBottom && (this.viewer.containerTop + point.y) >= pageTop + height) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.enableHeadersFootersRegion = function (widget, page) {
        if (this.viewer instanceof PageLayoutViewer) {
            this.owner.enableHeaderAndFooter = true;
            widget.page = page;
            this.comparePageWidthAndMargins(widget, page);
            this.updateTextPositionForBlockContainer(widget);
            this.shiftBlockOnHeaderFooterEnableDisable();
            return true;
        }
        return false;
    };
    /**
    * Disable xml
    * @private
    */
    Selection.prototype.disableXml = function () {
        var page = this.getPage(this.start.paragraph);
        this.updateTextPositionForBlockContainer(page.bodyWidgets[0]);
        this.owner.enableHeaderAndFooter = false;
        this.shiftBlockOnHeaderFooterEnableDisable();
    };
    /**
     * /* Here is the explanation for the code below:
        1. When there are multiple sections in a document, the first section is the parent section of the other sections.
        2. If you change the page width or header distance of the parent section, the child section will inherit the page width or header distance of the parent section.
        3. So when you change the page width or header distance of the parent section, the child section should be relayouted.
     * @private
     */
    Selection.prototype.comparePageWidthAndMargins = function (parentHFWidget, page) {
        var headerFooterType = parentHFWidget.headerFooterType;
        var currentHFWidget;
        var isHeader = headerFooterType.indexOf('Header') != -1;
        var isRelayout = false;
        if (isHeader) {
            currentHFWidget = page.headerWidgetIn;
        }
        else {
            currentHFWidget = page.footerWidgetIn;
        }
        if (!isNullOrUndefined(currentHFWidget)) {
            var parentSectionFormat = parentHFWidget.sectionFormat;
            var currentSectionFormat = currentHFWidget.sectionFormat;
            if (!isNullOrUndefined(parentSectionFormat) && !isNullOrUndefined(currentSectionFormat)) {
                if (isHeader) {
                    if (parentHFWidget.width != currentHFWidget.width || parentSectionFormat.headerDistance != currentSectionFormat.headerDistance) {
                        isRelayout = true;
                    }
                }
                else {
                    if (parentHFWidget.width != currentHFWidget.width || parentSectionFormat.footerDistance != currentSectionFormat.footerDistance) {
                        isRelayout = true;
                    }
                }
            }
            if (isRelayout) {
                this.owner.viewer.updateHFClientArea(parentHFWidget.sectionFormat, isHeader);
                parentHFWidget = this.documentHelper.layout.layoutHeaderFooterItems(this.owner.viewer, parentHFWidget);
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.shiftBlockOnHeaderFooterEnableDisable = function () {
        for (var i = 0; i < this.documentHelper.headersFooters.length; i++) {
            var headerFooter = this.documentHelper.headersFooters[i];
            var bodywidget = this.getBodyWidgetInternal(i, 0);
            if (isNullOrUndefined(bodywidget)) {
                continue;
            }
            var sectionFormat = bodywidget.sectionFormat;
            for (var _i = 0, _a = Object.keys(headerFooter); _i < _a.length; _i++) {
                var key = _a[_i];
                var widget = headerFooter[key];
                if (widget.isEmpty) {
                    this.owner.editorModule.shiftPageContent(widget.headerFooterType, sectionFormat);
                }
            }
        }
    };
    /**
     * @private
     */
    Selection.prototype.updateTextPositionForBlockContainer = function (widget) {
        var block = widget.firstChild;
        if (block instanceof TableWidget) {
            block = this.getFirstBlockInFirstCell(block);
            if (block instanceof TableWidget) {
                block = this.getFirstBlockInFirstCell(block);
            }
        }
        this.selectParagraphInternal(block, true);
    };
    /**
     * Disable Header footer
     * @private
     */
    Selection.prototype.disableHeaderFooter = function () {
        var page = this.getPage(this.start.paragraph);
        this.updateTextPositionForBlockContainer(page.bodyWidgets[0]);
        this.owner.enableHeaderAndFooter = false;
        this.shiftBlockOnHeaderFooterEnableDisable();
    };
    //#endregion
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.clear = function () {
        if (this.editRegionHighlighters) {
            this.editRegionHighlighters.clear();
        }
        this.editRangeCollection = [];
        if (this.selectedWidgets) {
            this.selectedWidgets.clear();
        }
        if (this.contentControleditRegionHighlighters) {
            this.contentControleditRegionHighlighters.clear();
        }
        this.contentControls = [];
        this.currentContentControl = undefined;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.destroy = function () {
        if (!isNullOrUndefined(this.contextTypeInternal)) {
            this.contextTypeInternal = undefined;
        }
        if (this.pasteDropDwn) {
            this.pasteDropDwn.destroy();
            this.pasteDropDwn = undefined;
        }
        this.caret = undefined;
        this.contextTypeInternal = undefined;
        this.upDownSelectionLength = undefined;
        this.owner = undefined;
        this.upDownSelectionLength = undefined;
        this.isSkipLayouting = undefined;
        this.isImageSelected = undefined;
        if (!isNullOrUndefined(this.documentHelper)) {
            this.documentHelper = undefined;
        }
        this.contextTypeInternal = undefined;
        this.isRetrieveFormatting = undefined;
        if (this.characterFormatIn) {
            this.characterFormatIn.destroy();
        }
        this.characterFormatIn = undefined;
        if (this.paragraphFormatIn) {
            this.paragraphFormatIn.destroy();
        }
        this.paragraphFormatIn = undefined;
        if (this.sectionFormatIn) {
            this.sectionFormatIn.destroy();
        }
        this.sectionFormatIn = undefined;
        if (this.tableFormatIn) {
            this.tableFormatIn.destroy();
        }
        this.tableFormatIn = undefined;
        if (this.cellFormatIn) {
            this.cellFormatIn.destroy();
        }
        this.cellFormatIn = undefined;
        if (this.rowFormatIn) {
            this.rowFormatIn.destroy();
        }
        this.rowFormatIn = undefined;
        this.imageFormatInternal = undefined;
        this.skipFormatRetrieval = undefined;
        this.startInternal = undefined;
        this.endInternal = undefined;
        this.htmlWriterIn = undefined;
        this.toolTipElement = undefined;
        if (!isNullOrUndefined(this.toolTipObject)) {
            this.toolTipObject.destroy();
        }
        this.toolTipField = undefined;
        this.isMoveDownOrMoveUp = undefined;
        this.pasteElement = undefined;
        this.currentPasteAction = undefined;
        this.isViewPasteOptions = undefined;
        this.skipEditRangeRetrieval = undefined;
        this.editPosition = undefined;
        if (!isNullOrUndefined(this.selectedWidgets)) {
            this.selectedWidgets.destroy();
        }
        this.isHighlightEditRegionIn = undefined;
        this.isHighlightFormFields = undefined;
        this.editRangeCollection = [];
        this.editRangeCollection = undefined;
        this.isHightlightEditRegionInternal = undefined;
        this.isCurrentUser = undefined;
        this.isHighlightNext = undefined;
        this.hightLightNextParagraph = undefined;
        this.isWebLayout = undefined;
        if (!isNullOrUndefined(this.editRegionHighlighters)) {
            this.editRegionHighlighters.destroy();
        }
        if (!isNullOrUndefined(this.formFieldHighlighters)) {
            this.formFieldHighlighters.destroy();
        }
        if (!isNullOrUndefined(this.contentControleditRegionHighlighters)) {
            this.contentControleditRegionHighlighters.destroy();
        }
        this.isCellPrevSelected = undefined;
        this.currentFormField = undefined;
        this.contentControls = [];
    };
    /**
     * Returns the cells in between the bounds.
     * @param table Specify the table to find cells.
     * @param columnFirst Specify start index of column to find cells.
     * @param columnLast Specify end index of column to find cells.
     * @param bookmark Specify the bookmark element.
     */
    Selection.prototype.getCellsToSelect = function (table, columnFirst, columnLast, bookmark) {
        var rows = table.childWidgets;
        if (isNullOrUndefined(bookmark.paragraph.associatedCell) || !isNullOrUndefined(bookmark.reference) && isNullOrUndefined(bookmark.reference.paragraph.associatedCell)) {
            return undefined;
        }
        var startRowIndex = bookmark.paragraph.associatedCell.ownerRow.rowIndex;
        var endRowIndex = bookmark.reference.paragraph.associatedCell.ownerRow.rowIndex;
        var cellArray = [];
        for (var i = startRowIndex; i <= endRowIndex; i++) {
            var row = rows[i];
            for (var j = columnFirst; j <= columnLast; j++) {
                var cell = row.childWidgets[j];
                if (!isNullOrUndefined(cell)) {
                    cellArray.push(cell);
                }
            }
        }
        return cellArray;
    };
    /**
     * Selects the cells between bookmark start and end.
     * @param bookmark Specify the bookmark.
     */
    Selection.prototype.selectBookmarkInTable = function (bookmark) {
        this.documentHelper.clearSelectionHighlight();
        var columnFirst = parseInt(bookmark.properties['columnFirst']);
        var columnLast = parseInt(bookmark.properties['columnLast']);
        var table = bookmark.paragraph.associatedCell.ownerTable;
        var cellArray = this.getCellsToSelect(table, columnFirst, columnLast, bookmark);
        if (!isNullOrUndefined(cellArray)) {
            for (var i = 0; i < cellArray.length; i++) {
                this.highlightCellWidget(cellArray[i]);
            }
        }
    };
    /**
     * Navigates to the specified bookmark.
     * @param name
     * @param moveToStart
     * @param excludeBookmarkStartEnd
     * @private
     */
    Selection.prototype.navigateBookmark = function (name, moveToStart, excludeBookmarkStartEnd) {
        var bookmarks = this.documentHelper.bookmarks;
        if (bookmarks.containsKey(name)) {
            //bookmark start element
            var bookmrkElmnt = bookmarks.get(name);
            if (!isNullOrUndefined(bookmrkElmnt.properties)) {
                this.selectBookmarkInTable(bookmrkElmnt);
            }
            else {
                var offset = bookmrkElmnt.line.getOffset(bookmrkElmnt, 0);
                if (excludeBookmarkStartEnd) {
                    offset++;
                }
                var startPosition = new TextPosition(this.owner);
                startPosition.setPositionParagraph(bookmrkElmnt.line, offset);
                if (moveToStart) {
                    this.documentHelper.selection.selectRange(startPosition, startPosition, true);
                }
                else {
                    //bookmark end element
                    var bookmrkEnd = bookmrkElmnt.reference;
                    if (bookmrkElmnt.reference && bookmrkElmnt.reference.line.paragraph.bodyWidget == null) {
                        bookmrkEnd = bookmrkElmnt;
                    }
                    var endoffset = bookmrkEnd.line.getOffset(bookmrkEnd, 1);
                    if (bookmrkEnd instanceof BookmarkElementBox && !excludeBookmarkStartEnd) {
                        if (!isNullOrUndefined(bookmrkEnd.properties)) {
                            if (bookmrkEnd.properties['isAfterParagraphMark']) {
                                endoffset = bookmrkEnd.line.getOffset(bookmrkEnd, 1);
                            }
                        }
                    }
                    if (excludeBookmarkStartEnd) {
                        endoffset--;
                    }
                    var endPosition = new TextPosition(this.owner);
                    endPosition.setPositionParagraph(bookmrkEnd.line, endoffset);
                    //selects the bookmark range
                    this.documentHelper.selection.selectRange(startPosition, endPosition, true);
                }
            }
        }
    };
    /**
     * Selects the specified bookmark.
     * @param name Specify the bookmark name to select.
     * @param excludeBookmarkStartEnd Specify true to exclude bookmark start and end from selection, otherwise false.
     */
    Selection.prototype.selectBookmark = function (name, excludeBookmarkStartEnd) {
        this.isSelectBookmark = true;
        this.isExcludeBookmarkStartEnd = excludeBookmarkStartEnd;
        this.navigateBookmark(name, undefined, excludeBookmarkStartEnd);
        this.isSelectBookmark = false;
    };
    /**
     * Returns the toc field from the selection.
     * @private
     */
    Selection.prototype.getTocField = function () {
        var paragraph = this.start.paragraph;
        var tocPara = undefined;
        while ((paragraph !== undefined && this.isTocStyle(paragraph))) {
            tocPara = paragraph;
            paragraph = paragraph.previousRenderedWidget;
        }
        if (tocPara !== undefined) {
            var lineWidget = tocPara.childWidgets[0];
            if (lineWidget !== undefined) {
                return lineWidget.children[0];
            }
        }
        return undefined;
    };
    /**
     * Returns true if the paragraph has toc style.
     */
    Selection.prototype.isTocStyle = function (paragraph) {
        var style = paragraph.paragraphFormat.baseStyle;
        return (style !== undefined && (style.name.toLowerCase().indexOf('toc') !== -1));
    };
    /**
     * Return true if selection is in TOC
     * @private
     */
    Selection.prototype.isTOC = function () {
        var info = this.getParagraphInfo(this.start);
        var para = info.paragraph;
        for (var i = 0; i < para.childWidgets[0].children.length; i++) {
            var element = para.childWidgets[0].children[i];
            if (element instanceof FieldElementBox) {
                var fieldCode = this.owner.selectionModule.getFieldCode(element);
                if (fieldCode.match('TOC ') || fieldCode.match('Toc')) {
                    return true;
                }
            }
            else {
                continue;
            }
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.getElementsForward = function (lineWidget, startElement, endElement, bidi) {
        if (isNullOrUndefined(startElement)) {
            return undefined;
        }
        var elements = [];
        // while (bidi && startElement && startElement !== endElement && startElement.nextElement && !startElement.isRightToLeft) {
        //     startElement = startElement.nextElement;
        // }
        // while (bidi && endElement && startElement !== endElement && endElement.previousElement && !endElement.isRightToLeft) {
        //     endElement = endElement.previousElement;
        // }
        var elementIndex = lineWidget.children.indexOf(startElement);
        while (elementIndex >= 0) {
            for (var i = elementIndex; i < lineWidget.children.length; i++) {
                var inlineElement = lineWidget.children[i];
                if (inlineElement.line === lineWidget) {
                    if (inlineElement === endElement) {
                        elements.push(inlineElement);
                        elementIndex = -1;
                        break;
                    }
                    else {
                        elements.push(inlineElement);
                    }
                }
                else {
                    elementIndex = -1;
                    break;
                }
            }
            // inline = inline !== null && inline.NextNode !== null ? (inline.NextNode as Inline).GetNextRenderedInline() : null;
            elementIndex = -1;
        }
        return elements.length === 0 ? undefined : elements;
    };
    // Gets the current line elements in inline reverse order from the end element.
    /**
     * @private
     */
    Selection.prototype.getElementsBackward = function (lineWidget, startElement, endElement, bidi) {
        var elements = [];
        while (bidi && startElement && startElement.previousElement && (!startElement.isRightToLeft
            || startElement instanceof TextElementBox && this.documentHelper.textHelper.isRTLText(startElement.text))) {
            startElement = startElement.previousElement;
        }
        var elementIndex = lineWidget.children.indexOf(startElement);
        while (elementIndex >= 0) {
            for (var i = elementIndex; i > -1 && i < lineWidget.children.length; bidi ? i++ : i--) {
                var inlineElement = lineWidget.children[i];
                if (inlineElement.line === lineWidget) {
                    elements.push(inlineElement);
                    if (inlineElement === endElement) {
                        elementIndex = -1;
                        break;
                    }
                }
                else {
                    elementIndex = -1;
                    break;
                }
            }
            // inline = inline !== null && inline.NextNode !== null ? (inline.NextNode as Inline).GetNextRenderedInline() : null;
            elementIndex = -1;
        }
        return elements;
    };
    /**
     * Navigates to the previous comment in the document.
     *
     * @returns {void}
     */
    Selection.prototype.navigatePreviousComment = function () {
        this.commentNavigateInternal(false);
    };
    /**
     * Navigates to the next comment in the document.
     *
     * @returns {void}
     */
    Selection.prototype.navigateNextComment = function () {
        this.commentNavigateInternal(true);
    };
    Selection.prototype.commentNavigateInternal = function (next) {
        if (!this.documentHelper.currentSelectedComment) {
            if (this.documentHelper.comments.length === 0) {
                return;
            }
            this.documentHelper.currentSelectedComment = this.documentHelper.comments[0];
        }
        if (this.documentHelper.currentSelectedComment) {
            var comments = this.documentHelper.comments;
            var comment = this.documentHelper.currentSelectedComment;
            var index = comments.indexOf(comment);
            if (next) {
                comment = (index === (comments.length - 1)) ? comments[0] : comments[index + 1];
            }
            else {
                comment = index === 0 ? comments[comments.length - 1] : comments[index - 1];
            }
            this.documentHelper.currentSelectedComment = comment;
            this.selectComment(comment);
        }
    };
    /**
     * Navigates to the previous revision in the document.
     *
     * @returns {void}
     */
    Selection.prototype.navigatePreviousRevision = function () {
        this.revisionNavigateInternal(false);
    };
    /**
     * Navigates to the next revision in the document.
     *
     * @returns {void}
     */
    Selection.prototype.navigateNextRevision = function () {
        this.revisionNavigateInternal(true);
    };
    /**
     * Method to navigate revisions
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.revisionNavigateInternal = function (next) {
        if (!this.documentHelper.currentSelectedRevisionInternal) {
            if (this.documentHelper.owner.revisions.length === 0) {
                return;
            }
            this.documentHelper.currentSelectedRevision = this.documentHelper.owner.revisions.get(0);
        }
        if (this.documentHelper.currentSelectedRevision) {
            var revisions = this.documentHelper.owner.revisions.changes;
            var revision = this.documentHelper.currentSelectedRevision;
            var index = revisions.indexOf(revision);
            if (next) {
                revision = (index === (revisions.length - 1)) ? revisions[0] : revisions[index + 1];
            }
            else {
                revision = index === 0 ? revisions[revisions.length - 1] : revisions[index - 1];
            }
            this.documentHelper.currentSelectedRevision = revision;
            this.selectRevision(revision);
        }
        this.owner.trackChangesPane.currentSelectedRevision = this.documentHelper.currentSelectedRevision;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.selectComment = function (comment) {
        if (!isNullOrUndefined(comment)) {
            var startPosition = this.getElementPosition(comment.commentStart, true).startPosition;
            var endPosition = this.getElementPosition(comment.commentEnd, false).startPosition;
            if (this.owner.commentReviewPane) {
                this.owner.commentReviewPane.selectComment(comment);
            }
            this.selectPosition(startPosition, endPosition);
        }
    };
    /**
     * @private
     * @param revision
     * @returns {void}
     */
    Selection.prototype.selectRevision = function (revision, startPosition, endPosition) {
        var isSelect = false;
        if (isNullOrUndefined(startPosition) && isNullOrUndefined(endPosition)) {
            isSelect = true;
        }
        if (!isNullOrUndefined(revision) && revision.range.length > 0) {
            var firstElement = revision.range[0];
            var lastElement = revision.range[revision.range.length - 1];
            var paragraph = void 0;
            if (firstElement instanceof WCharacterFormat) {
                paragraph = firstElement.ownerBase;
            }
            else if (!(firstElement instanceof WRowFormat)) {
                paragraph = firstElement.line.paragraph;
            }
            if (!isNullOrUndefined(paragraph) && !isNullOrUndefined(paragraph.bodyWidget) && paragraph.bodyWidget instanceof HeaderFooterWidget && (isNullOrUndefined(paragraph.bodyWidget.page) || (!isNullOrUndefined(paragraph.bodyWidget.page) && paragraph.bodyWidget.page.index === -1))) {
                return;
            }
            if (firstElement instanceof WRowFormat) {
                var rowWidget = firstElement.ownerBase;
                var firstCell = rowWidget.childWidgets[0];
                var lastCell = rowWidget.childWidgets[rowWidget.childWidgets.length - 1];
                var firstPara = this.getFirstParagraph(firstCell);
                var lastPara = this.getLastParagraph(lastCell);
                this.start.setPosition(firstPara.firstChild, true);
                this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                this.selectPosition(this.start, this.end);
            }
            else if (firstElement && lastElement) {
                if (isNullOrUndefined(startPosition)) {
                    startPosition = new TextPosition(this.owner);
                }
                var offset = 0;
                if (firstElement instanceof WCharacterFormat) {
                    var currentPara = firstElement.ownerBase;
                    // Set the offset based on length of para - length of remaning lines except last line because we have added the remaning line length in getParagraphInfoInternal method.
                    //when we have add para length to the offset, again added the length of remaning lines except last line in getParagraphInfoInternal method. so when perform undo, the offset is greater than para length + 1. in this case, we set the para length to start and end offset, so paramark doesn't comes to selection region (undo case for splitted para but paramark only tracked).
                    if (currentPara.childWidgets.length > 1) {
                        offset = this.getParagraphLength(currentPara) - this.getParagraphLength(currentPara, currentPara.lastChild);
                    }
                    else {
                        // added the condition to set offset to paragraph start when para without contain text elements.
                        if (this.isEmptyWidget(currentPara)) {
                            offset = 0;
                        }
                        else {
                            offset = currentPara.getLength();
                        }
                    }
                    startPosition.setPositionParagraph(currentPara.lastChild, offset);
                }
                else {
                    offset = firstElement.line.getOffset(firstElement, 0);
                    var line = firstElement.line;
                    if (line.isFirstLine()) {
                        for (var i = 0; i < line.children.length; i++) {
                            if (firstElement === line.children[i] && line.children[i] instanceof TextElementBox && !(line.children[i] instanceof FootnoteElementBox)) {
                                offset = 0;
                                break;
                            }
                            else if (line.children[i] instanceof TextElementBox) {
                                break;
                            }
                        }
                    }
                    startPosition.setPositionForLineWidget(firstElement.line, offset);
                }
                if (isNullOrUndefined(endPosition)) {
                    endPosition = new TextPosition(this.owner);
                }
                if (lastElement instanceof WCharacterFormat) {
                    var currentPara = lastElement.ownerBase;
                    var splittedWidgets = currentPara.getSplitWidgets();
                    currentPara = splittedWidgets[splittedWidgets.length - 1];
                    if (currentPara.isEndsWithPageBreak || currentPara.isEndsWithColumnBreak) {
                        this.owner.trackChangesPane.isTrackingPageBreak = true;
                    }
                    // Changed the condition to get last child of current paragraph instead of next para of current para if current para contain page break
                    if (currentPara.childWidgets.length > 1) {
                        offset = this.getParagraphLength(currentPara) - this.getParagraphLength(currentPara, currentPara.lastChild);
                    }
                    else {
                        offset = currentPara.getLength();
                    }
                    endPosition.setPositionParagraph(currentPara.lastChild, offset + 1);
                }
                else {
                    offset = lastElement.line.getOffset(lastElement, 0) + lastElement.length;
                    if (this.isTOC()) {
                        offset += 1;
                    }
                    endPosition.setPositionForLineWidget(lastElement.line, offset);
                }
                var curentPosition = startPosition.clone();
                if (!startPosition.isExistBefore(endPosition)) {
                    startPosition = endPosition;
                    endPosition = curentPosition;
                }
                if (isSelect) {
                    this.selectPosition(startPosition, endPosition);
                }
            }
        }
    };
    Selection.prototype.isEmptyWidget = function (block) {
        if (block instanceof TableWidget) {
            return false;
        }
        else if (block.isEmpty()) {
            return true;
        }
        else {
            for (var i = 0; i < block.childWidgets.length; i++) {
                var line = block.childWidgets[i];
                for (var j = 0; j < line.children.length; j++) {
                    if (line.children[j] instanceof TextElementBox) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
    /**
     * @private
     */
    Selection.prototype.selectTableRevision = function (revision) {
        if (!isNullOrUndefined(revision) && revision[0].range.length > 0) {
            var firstElementTable = revision[0].range[0];
            var lastElementTable = revision[revision.length - 1].range[0];
            if (firstElementTable instanceof WRowFormat) {
                var firstRowWidget = firstElementTable.ownerBase;
                var firstCell = firstRowWidget.childWidgets[0];
                var secondRowWidget = lastElementTable.ownerBase;
                var lastCell = secondRowWidget.childWidgets[secondRowWidget.childWidgets.length - 1];
                var firstPara = this.getFirstParagraph(firstCell);
                var lastPara = this.getLastParagraph(lastCell);
                this.start.setPosition(firstPara.firstChild, true);
                this.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                this.selectPosition(this.start, this.end);
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.updateEditRangeCollection = function () {
        if (this.editRangeCollection.length > 0) {
            this.editRangeCollection = [];
        }
        var editRangeStart;
        var everyOneArea;
        if (!this.documentHelper.isDocumentProtected) {
            for (var i = 0; i < this.documentHelper.editRanges.length; i++) {
                var user = this.documentHelper.editRanges.keys[i];
                editRangeStart = this.documentHelper.editRanges.get(user);
                for (var j = 0; j < editRangeStart.length; j++) {
                    if (!isNullOrUndefined(editRangeStart[j].editRangeEnd)) {
                        this.editRangeCollection.push(editRangeStart[j]);
                    }
                }
            }
        }
        else {
            if (this.documentHelper.editRanges.containsKey(this.owner.currentUser)) {
                editRangeStart = this.documentHelper.editRanges.get(this.owner.currentUser);
                for (var j = 0; j < editRangeStart.length; j++) {
                    if (!isNullOrUndefined(editRangeStart[j].editRangeEnd)) {
                        this.editRangeCollection.push(editRangeStart[j]);
                    }
                }
            }
            if (this.documentHelper.editRanges.containsKey('Everyone')) {
                var user = 'Everyone';
                everyOneArea = this.documentHelper.editRanges.get(user);
                for (var j = 0; j < everyOneArea.length; j++) {
                    if (!isNullOrUndefined(everyOneArea[j].editRangeEnd)) {
                        this.editRangeCollection.push(everyOneArea[j]);
                    }
                }
            }
        }
    };
    //Restrict editing implementation starts
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.onHighlight = function () {
        if (this.isHighlightEditRegion) {
            this.highlightEditRegion();
        }
        else {
            this.unHighlightEditRegion();
        }
        this.viewer.renderVisiblePages();
    };
    //Restrict editing implementation starts
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.onHighlightContentControl = function () {
        if (this.isHighlightContentControlEditRegion) {
            if (this.documentHelper.contentControlCollection.length > 0) {
                for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
                    if (this.documentHelper.contentControlCollection[i].paragraph.isInHeaderFooter && this.documentHelper.owner.layoutType === "Continuous") {
                        continue;
                    }
                    if (this.documentHelper.contentControlCollection[i].line.paragraph.bodyWidget.page
                        && this.documentHelper.contentControlCollection[i].line.paragraph.bodyWidget.page.documentHelper) {
                        this.highlightContentControlEditRegionInternal(this.documentHelper.contentControlCollection[i]);
                    }
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.highlightContentControlEditRegionInternal = function (editRangeStart) {
        var positionInfo = this.getPosition(editRangeStart);
        if (!isNullOrUndefined(positionInfo.startPosition) && !isNullOrUndefined(positionInfo.endPosition)) {
            var startPosition = positionInfo.startPosition;
            var endPosition = positionInfo.endPosition;
            this.highlight(editRangeStart.line.paragraph, startPosition, endPosition, editRangeStart);
            var currentParagraph = editRangeStart.line.paragraph;
            while (currentParagraph !== endPosition.paragraph) {
                if (currentParagraph.nextRenderedWidget instanceof ParagraphWidget) {
                    currentParagraph = currentParagraph.nextRenderedWidget;
                    this.highlight(currentParagraph, startPosition, endPosition, editRangeStart);
                }
                else {
                    return;
                }
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.selectPlaceHolderText = function (contentControl) {
        if (contentControl.contentControlProperties && contentControl.contentControlProperties.hasPlaceHolderText && (contentControl.contentControlProperties.type === 'RichText' || contentControl.contentControlProperties.type === 'Text')) {
            this.selectContentControlInternal(contentControl);
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.isPlainContentControl = function () {
        var contentControl = this.owner.editorModule.getContentControl();
        if (contentControl && contentControl.contentControlProperties && contentControl.contentControlProperties.type === 'Text') {
            return true;
        }
        return false;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.highlightEditRegion = function () {
        this.updateEditRangeCollection();
        if (this.owner.enableLockAndEdit) {
            this.viewer.updateScrollBars();
            return;
        }
        if (!this.isHighlightEditRegion) {
            this.unHighlightEditRegion();
            return;
        }
        this.isHightlightEditRegionInternal = true;
        if (isNullOrUndefined(this.editRegionHighlighters)) {
            this.editRegionHighlighters = new Dictionary();
        }
        this.editRegionHighlighters.clear();
        for (var j = 0; j < this.editRangeCollection.length; j++) {
            this.highlightEditRegionInternal(this.editRangeCollection[j]);
        }
        this.isHightlightEditRegionInternal = false;
        this.viewer.updateScrollBars();
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.highlightFormFields = function () {
        if (isNullOrUndefined(this.formFieldHighlighters)) {
            this.formFieldHighlighters = new Dictionary();
        }
        this.formFieldHighlighters.clear();
        var formFields = this.documentHelper.formFields;
        if (!isNullOrUndefined(formFields) && formFields.length > 0) {
            for (var i = 0; i < formFields.length; i++) {
                var formField = formFields[i];
                if (HelperMethods.isLinkedFieldCharacter(formField)) {
                    var offset = formField.line.getOffset(formField, 0);
                    var startPosition = new TextPosition(this.owner);
                    startPosition.setPositionParagraph(formField.line, offset);
                    var endElement = formField.fieldEnd;
                    offset = endElement.line.getOffset(endElement, 1);
                    var endPosition = new TextPosition(this.owner);
                    endPosition.setPositionParagraph(endElement.line, offset);
                    this.isHighlightFormFields = true;
                    this.highlight(startPosition.paragraph, startPosition, endPosition);
                    if (this.isHighlightNext) {
                        this.highlightNextBlock(this.hightLightNextParagraph, startPosition, endPosition);
                        this.isHighlightNext = false;
                        this.hightLightNextParagraph = undefined;
                    }
                }
            }
            this.isHighlightFormFields = false;
            this.viewer.updateScrollBars();
        }
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.unHighlightEditRegion = function () {
        if (!isNullOrUndefined(this.editRegionHighlighters)) {
            this.editRegionHighlighters.clear();
            this.editRegionHighlighters = undefined;
        }
        this.isHightlightEditRegionInternal = false;
    };
    /**
     * @private
     * @returns {void}
     */
    Selection.prototype.highlightEditRegionInternal = function (editRangeStart) {
        var positionInfo = this.getPosition(editRangeStart);
        var startPosition = positionInfo.startPosition;
        var endPosition = positionInfo.endPosition;
        // if (editRangeStart.user === this.owner.currentUser && editRangeStart.group === '') {
        this.isCurrentUser = true;
        // }
        this.highlightEditRegions(editRangeStart, startPosition, endPosition);
        this.isCurrentUser = false;
    };
    /**
     * Shows all the editing region, where current user can edit.
     *
     * @returns {void}
     */
    Selection.prototype.showAllEditingRegion = function () {
        if (this.editRangeCollection.length === 0) {
            this.updateEditRangeCollection();
        }
        this.documentHelper.clearSelectionHighlight();
        for (var j = 0; j < this.editRangeCollection.length; j++) {
            var editRangeStart = this.editRangeCollection[j];
            var positionInfo = this.getPosition(editRangeStart);
            var startPosition = positionInfo.startPosition;
            var endPosition = positionInfo.endPosition;
            this.highlightEditRegions(editRangeStart, startPosition, endPosition);
        }
    };
    Selection.prototype.highlightEditRegions = function (editRangeStart, startPosition, endPosition) {
        if (!editRangeStart.line.paragraph.isInsideTable
            || (editRangeStart.line.paragraph.isInsideTable && !editRangeStart.editRangeEnd.line.paragraph.isInsideTable) || editRangeStart.columnFirst === -1) {
            this.highlight(editRangeStart.line.paragraph, startPosition, endPosition);
            if (this.isHighlightNext) {
                this.highlightNextBlock(this.hightLightNextParagraph, startPosition, endPosition);
                this.isHighlightNext = false;
                this.hightLightNextParagraph = undefined;
            }
        }
        else {
            var row = editRangeStart.line.paragraph.associatedCell.ownerRow;
            var cell = row.childWidgets[editRangeStart.columnFirst];
            if (cell) {
                for (var i = 0; i < cell.childWidgets.length; i++) {
                    if (cell.childWidgets[i] instanceof ParagraphWidget) {
                        this.highlight(cell.childWidgets[i], startPosition, endPosition);
                        if (this.isHighlightNext) {
                            this.highlightNextBlock(this.hightLightNextParagraph, startPosition, endPosition);
                            this.isHighlightNext = false;
                            this.hightLightNextParagraph = undefined;
                        }
                    }
                }
            }
        }
    };
    /**
     * Navigates to the next editing region, where current user can edit.
     *
     * @returns {void}
     */
    Selection.prototype.navigateToNextEditingRegion = function () {
        var editRange = this.getEditRangeStartElement(true);
        if (this.editRangeCollection.length > 0) {
            this.sortEditRangeCollection();
            var length_2 = this.editRangeCollection.length;
            var index = length_2;
            if (!isNullOrUndefined(editRange)) {
                index = this.editRangeCollection.indexOf(editRange);
            }
            var editRangeStart = index < length_2 - 1 ?
                this.editRangeCollection[index + 1] : this.editRangeCollection[0];
            var positionInfo = this.getPosition(editRangeStart, true);
            var startPosition = positionInfo.startPosition;
            var endPosition = positionInfo.endPosition;
            this.selectRange(startPosition, endPosition);
        }
    };
    Selection.prototype.sortEditRangeCollection = function () {
        //Sort based on position
        for (var i = this.editRangeCollection.length - 1; i >= 0; i--) {
            for (var j = 1; j <= i; j++) {
                var nextPosition = this.getPosition(this.editRangeCollection[j - 1]).startPosition;
                var firstPosition = this.getPosition(this.editRangeCollection[j]).startPosition;
                if (nextPosition.isExistAfter(firstPosition)) {
                    var temp = this.editRangeCollection[j - 1];
                    this.editRangeCollection[j - 1] = this.editRangeCollection[j];
                    this.editRangeCollection[j] = temp;
                }
            }
        }
    };
    /**
     * Highlights all the editing region, where current user can edit.
     *
     * @returns {void}
     */
    Selection.prototype.toggleEditingRegionHighlight = function () {
        this.isHighlightEditRegion = !this.isHighlightEditRegion;
    };
    /**
     * @private
     */
    Selection.prototype.getEditRangeStartElement = function (isNavigateToNextEditRegion) {
        for (var i = 0; i < this.editRangeCollection.length; i++) {
            var editStart = this.editRangeCollection[i];
            var position = this.getPosition(editStart, isNavigateToNextEditRegion);
            var start = position.startPosition;
            var end = position.endPosition;
            if ((this.start.isExistAfter(start) || this.start.isAtSamePosition(start))
                && (this.end.isExistBefore(end) || this.end.isAtSamePosition(end))) {
                return editStart;
            }
        }
        return undefined;
    };
    /**
     * Determines whether the selection is inside the edit region.
     *
     * @returns {boolean} Returns true if the selection is inside the edit region; Otherwise, false.
     */
    Selection.prototype.isSelectionInEditRegion = function () {
        if (!this.documentHelper.isDocumentProtected) {
            return false;
        }
        return this.checkSelectionIsAtEditRegion();
    };
    /**
     * Determines whether the specified start and end position of the selection is inside the edit region.
     * @param {TextPosition} start Specify the start position of the selection.
     * @param {TextPosition} end Specify the end position of the selection.
     * @returns {boolean} Returns true if the specified start and end position of the selection is inside the edit region; Otherwise, false.
     */
    Selection.prototype.checkSelectionIsAtEditRegion = function (start, end) {
        if (isNullOrUndefined(start) && isNullOrUndefined(end)) {
            start = this.start;
            end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
        }
        if (this.editRangeCollection.length > 0 && this.isFootEndNoteParagraph(start.paragraph) && this.isFootEndNoteParagraph(end.paragraph) && start.paragraph.containerWidget == end.paragraph.containerWidget) {
            var position = this.getElementPosition(start.paragraph.containerWidget.footNoteReference, true).startPosition;
            start = position;
            end = position;
        }
        for (var i = 0; i < this.editRangeCollection.length; i++) {
            var editRangeStart = this.editRangeCollection[i];
            if (!editRangeStart.line.paragraph.isInsideTable
                || (editRangeStart.line.paragraph.isInsideTable && !editRangeStart.editRangeEnd.line.paragraph.isInsideTable)
                || editRangeStart.columnFirst === -1) {
                if (this.isSelectionInsideEditRange(editRangeStart, start, end)) {
                    return true;
                }
            }
            else {
                if (editRangeStart.paragraph.isInsideTable && editRangeStart.editRangeEnd &&
                    editRangeStart.editRangeEnd.line.paragraph.isInsideTable) {
                    var editRangeRow = editRangeStart.paragraph.associatedCell.ownerRow;
                    var startCell = start.paragraph.associatedCell;
                    var endCell = end.paragraph.associatedCell;
                    if (!isNullOrUndefined(startCell) && !isNullOrUndefined(endCell)) {
                        if (editRangeRow.equals(startCell.ownerRow) && editRangeRow.equals(endCell.ownerRow)
                            && startCell.index >= editRangeStart.columnFirst && startCell.index <= editRangeStart.columnLast) {
                            if (this.isEmpty && startCell.index === editRangeStart.line.paragraph.associatedCell.index) {
                                if (this.isSelectionInsideEditRange(editRangeStart, start, end)) {
                                    return true;
                                }
                            }
                            else if (!this.isCellSelected(startCell, start, end)) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.isEditRangeCellSelected = function (start, end) {
        if (isNullOrUndefined(start) && isNullOrUndefined(end)) {
            start = this.start;
            end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
        }
        for (var i = 0; i < this.editRangeCollection.length; i++) {
            var editRangeStart = this.editRangeCollection[i];
            if (editRangeStart.paragraph.isInsideTable && editRangeStart.editRangeEnd &&
                editRangeStart.editRangeEnd.line.paragraph.isInsideTable) {
                var startCell = start.paragraph.associatedCell;
                var endCell = end.paragraph.associatedCell;
                var editRangeCell = editRangeStart.paragraph.associatedCell;
                if (!isNullOrUndefined(startCell) && !isNullOrUndefined(endCell)) {
                    if (startCell.index >= editRangeStart.columnFirst && startCell.index <= editRangeStart.columnLast) {
                        if (this.isCellSelected(editRangeCell, start, end)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    };
    Selection.prototype.isSelectionInsideEditRange = function (editRangeStart, start, end) {
        var positionInfo = this.getPosition(editRangeStart);
        var startPosition = positionInfo.startPosition;
        var endPosition = positionInfo.endPosition;
        if ((start.isExistAfter(startPosition) || start.isAtSamePosition(startPosition))
            && (end.isExistBefore(endPosition) || end.isAtSamePosition(endPosition))) {
            return true;
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.getPosition = function (element, isNavigateToNextEditRegion) {
        var offset = element.line.getOffset(element, 1);
        var startPosition = new TextPosition(this.owner);
        startPosition.setPositionParagraph(element.line, offset);
        var endElement;
        if (element instanceof EditRangeStartElementBox) {
            endElement = element.editRangeEnd;
        }
        else if (element instanceof ContentControl) {
            endElement = element.reference;
        }
        else if (element instanceof BookmarkElementBox) {
            endElement = element.reference;
        }
        else if (element instanceof CommentCharacterElementBox) {
            endElement = element.comment.commentEnd;
        }
        var endPosition;
        if (endElement) {
            var line = endElement.line;
            if (!isNullOrUndefined(endElement.line) && !isNullOrUndefined(line.children)) {
                offset = endElement.line.getOffset(endElement, isNavigateToNextEditRegion || (endElement instanceof ContentControl && this.isSelectionisInCC) ? 0 : 1);
                endPosition = new TextPosition(this.owner);
                endPosition.setPositionParagraph(endElement.line, offset);
            }
            else {
                endPosition = startPosition.clone();
            }
        }
        return { 'startPosition': startPosition, 'endPosition': endPosition };
    };
    /**
     * @private
     */
    Selection.prototype.checkContentControlLocked = function (checkFormat) {
        this.owner.editorModule.isXmlMapped = false;
        this.isSelectionisInCC = true;
        for (var i = 0; i < this.documentHelper.contentControlCollection.length; i++) {
            var contentControlStart = this.documentHelper.contentControlCollection[i];
            if (isNullOrUndefined(contentControlStart.reference) || contentControlStart.reference.indexInOwner === -1) {
                continue;
            }
            var position = this.getPosition(contentControlStart);
            var cCstart = position.startPosition;
            var cCend = position.endPosition;
            var start = this.start;
            var end = this.end;
            if (!this.isForward) {
                start = this.end;
                end = this.start;
            }
            if (isNullOrUndefined(checkFormat)) {
                var cCStartInsideSelction = ((cCstart.isExistAfter(start) || cCstart.isAtSamePosition(start)) && (cCstart.isExistBefore(end) || cCstart.isAtSamePosition(end)));
                var cCEndInsideSelction = ((cCend.isExistAfter(start) || cCend.isAtSamePosition(start)) && (cCend.isExistBefore(end) || cCend.isAtSamePosition(end)));
                if (cCStartInsideSelction && cCEndInsideSelction) {
                    if (contentControlStart.contentControlProperties.lockContentControl || this.documentHelper.isFormFillProtectedMode) {
                        this.owner.trigger(contentControlEvent);
                        return true;
                    }
                    return false;
                }
                if ((cCStartInsideSelction) || (cCEndInsideSelction)) {
                    if (!(cCstart.isAtSamePosition(start) || cCend.isAtSamePosition(start)) && (contentControlStart.contentControlProperties.lockContentControl || contentControlStart.contentControlProperties.lockContents)) {
                        return true;
                    }
                }
            }
            if (checkFormat) {
                var cCStartInsideSelction = ((cCstart.isExistAfter(start) || cCstart.isAtSamePosition(start)) && (cCstart.isExistBefore(end) || cCstart.isAtSamePosition(end)));
                var cCEndInsideSelction = ((cCend.isExistAfter(start) || cCend.isAtSamePosition(start)) && (cCend.isExistBefore(end) || cCend.isAtSamePosition(end)));
                if (cCStartInsideSelction && cCEndInsideSelction) {
                    if (contentControlStart.contentControlProperties.lockContents) {
                        this.owner.trigger(contentControlEvent);
                        return true;
                    }
                    return false;
                }
                if ((cCStartInsideSelction) || (cCEndInsideSelction)) {
                    if (!(cCstart.isAtSamePosition(start) || cCend.isAtSamePosition(start)) && contentControlStart.contentControlProperties.lockContents) {
                        return true;
                    }
                }
            }
            if ((start.isExistAfter(cCstart) || start.isAtSamePosition(cCstart))
                && (end.isExistBefore(cCend) || end.isAtSamePosition(cCend))) {
                if (contentControlStart.contentControlProperties.xmlMapping
                    && contentControlStart.contentControlProperties.xmlMapping.isMapped) {
                    this.owner.editorModule.isXmlMapped = true;
                }
                if (contentControlStart.contentControlProperties.lockContents) {
                    this.owner.trigger(contentControlEvent);
                    return true;
                }
                else if (isNullOrUndefined(checkFormat)
                    && (contentControlStart.contentControlProperties.type === 'CheckBox'
                        || contentControlStart.contentControlProperties.type === 'ComboBox'
                        || contentControlStart.contentControlProperties.type === 'DropDownList'
                        || contentControlStart.contentControlProperties.type === 'Date'
                        || contentControlStart.contentControlProperties.type === 'Picture'
                        || contentControlStart.contentControlProperties.type === 'Text'
                        || contentControlStart.contentControlProperties.type === 'RichText')) {
                    this.owner.trigger(contentControlEvent);
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * @private
     */
    Selection.prototype.getElementPosition = function (element, isEnd) {
        var offset = element.line.getOffset(element, isEnd ? 0 : 1);
        var startPosition = new TextPosition(this.owner);
        startPosition.setPositionParagraph(element.line, offset);
        return { 'startPosition': startPosition, 'endPosition': undefined };
    };
    //Restrict editing implementation ends
    /**
     * Update ref field.
     * @private
     */
    Selection.prototype.updateRefField = function (field) {
        if (isNullOrUndefined(field)) {
            field = this.getHyperlinkField(true);
        }
        if (!isNullOrUndefined(field)) {
            if (!this.isReferenceField(field)) {
                return;
            }
            var fieldCode = this.getFieldCode(field).replace(/\s+/g, ' ');
            fieldCode = fieldCode.trim();
            if (fieldCode.toLowerCase().indexOf('ref') === 0) {
                var code = fieldCode.split(' ');
                if (code.length > 1) {
                    var bookmarkId = code[1];
                    if (this.documentHelper.bookmarks.containsKey(bookmarkId)) {
                        var start = this.start;
                        var end = this.end;
                        if (!this.isForward) {
                            start = this.end;
                            end = this.start;
                        }
                        var bookmarkStart = this.documentHelper.bookmarks.get(bookmarkId);
                        var bookmarkEnd = bookmarkStart.reference;
                        var previousNode = bookmarkStart.previousNode;
                        if ((isNullOrUndefined(previousNode) || !(previousNode instanceof FieldElementBox))
                            && bookmarkEnd && bookmarkEnd.previousNode instanceof FieldElementBox
                            && bookmarkEnd.previousNode.fieldType === 1
                            && !isNullOrUndefined(bookmarkEnd.previousNode.fieldBegin)
                            && !isNullOrUndefined(bookmarkEnd.previousNode.fieldBegin.formFieldData)) {
                            bookmarkStart = bookmarkEnd.previousNode.fieldBegin.fieldSeparator;
                            bookmarkEnd = bookmarkEnd.previousNode.fieldBegin.fieldEnd;
                        }
                        else if (previousNode instanceof FieldElementBox && previousNode.fieldType === 0
                            && !isNullOrUndefined(previousNode.formFieldData)) {
                            bookmarkStart = previousNode.fieldSeparator;
                            bookmarkEnd = previousNode.fieldEnd;
                        }
                        var offset = bookmarkStart.line.getOffset(bookmarkStart, 1);
                        start.setPositionParagraph(bookmarkStart.line, offset);
                        end.setPositionParagraph(bookmarkEnd.line, bookmarkEnd.line.getOffset(bookmarkEnd, 0));
                        var documentContent = this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), start.currentWidget, start.offset, end.currentWidget, end.offset, false, true);
                        var startElement = field.fieldSeparator;
                        var endElement = field.fieldEnd;
                        start.setPositionParagraph(startElement.line, startElement.line.getOffset(startElement, 1));
                        end.setPositionParagraph(endElement.line, endElement.line.getOffset(endElement, 0));
                        this.owner.editorModule.pasteContents(documentContent);
                    }
                }
            }
        }
    };
    /**
     *
     * @private
     * @returns {void}
     */
    Selection.prototype.footnoteReferenceElement = function (start, end, inline) {
        var container = this.getContainerWidget(start.paragraph);
        var count = 0;
        if (container instanceof FootNoteWidget) {
            var footNoteElement = this.start.paragraph.bodyWidget.footNoteReference;
            for (var i = 0; i < this.documentHelper.pages.length; i++) {
                count = 0;
                var page = this.documentHelper.pages[i];
                for (var j = 0; j < page.bodyWidgets.length; j++) {
                    var bodyWidget = page.bodyWidgets[j];
                    for (var k = 0; k < bodyWidget.childWidgets.length; k++) {
                        var paragraph = bodyWidget.childWidgets[k];
                        if (paragraph instanceof TableWidget) {
                            for (var tr = 0; tr < paragraph.childWidgets.length; tr++) {
                                var tablerow = paragraph.childWidgets[tr];
                                for (var tc = 0; tc < tablerow.childWidgets.length; tc++) {
                                    var tablecell = tablerow.childWidgets[tc];
                                    for (var para = 0; para < tablecell.childWidgets.length; para++) {
                                        var paragr = tablecell.childWidgets[para];
                                        for (var line = 0; line < paragr.childWidgets.length; line++) {
                                            var lines = paragr.childWidgets[line];
                                            count = 0;
                                            if (!isNullOrUndefined(lines.children)) {
                                                for (var m = 0; m < lines.children.length; m++) {
                                                    var child = lines.children[m];
                                                    count += child.length;
                                                    if (child instanceof FootnoteElementBox && child === footNoteElement) {
                                                        start.setPositionParagraph(lines, count - 1);
                                                        end.setPositionParagraph(lines, count);
                                                        this.selectRange(start, end);
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            for (var l = 0; l < paragraph.childWidgets.length; l++) {
                                var lines = paragraph.childWidgets[l];
                                count = 0;
                                if (!isNullOrUndefined(lines.children)) {
                                    for (var m = 0; m < lines.children.length; m++) {
                                        var child = lines.children[m];
                                        count += child.length;
                                        if (child instanceof FootnoteElementBox && child === footNoteElement) {
                                            start.setPositionParagraph(lines, count - 1);
                                            end.setPositionParagraph(lines, count);
                                            this.selectRange(start, end);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    /**
     * Convert hierachical index to linear index;
     * @private
     */
    Selection.prototype.getAbsolutePositionFromRelativePosition = function (textPosition) {
        var startPosition;
        if (typeof textPosition == 'string') {
            startPosition = this.getTextPosBasedOnLogicalIndex(textPosition);
        }
        else {
            startPosition = textPosition;
        }
        var paragraphInfo = this.getParagraphInfo(startPosition);
        var positionInfo = { position: 0, done: false };
        this.getPositionInfoForHeaderFooter(paragraphInfo, positionInfo);
        if (!positionInfo.done) {
            //Iterate Footnotes content;
        }
        return positionInfo.position;
    };
    /**
     * @private
     */
    Selection.prototype.getPositionInfoForBodyContent = function (paragraphInfo, positionInfo, blockWidget, tableBlock) {
        var block = !isNullOrUndefined(blockWidget) ? blockWidget : this.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
        //Iterate body content;
        positionInfo.position += this.getBlockIndex(block, paragraphInfo, positionInfo, tableBlock);
        return positionInfo;
    };
    /**
     * @private
     */
    Selection.prototype.getPositionInfoForHeaderFooter = function (paragraphInfo, positionInfo, tableBlock) {
        positionInfo = this.getPositionInfoForBodyContent(paragraphInfo, positionInfo, undefined, tableBlock);
        if (!positionInfo.done) {
            //Iterate header/footer content;
            this.getBlockIndexFromHeaderFooter(paragraphInfo, positionInfo, tableBlock);
        }
        return positionInfo;
    };
    Selection.prototype.getBlockIndexFromHeaderFooter = function (paragraphInfo, positionInfo, tableBlock) {
        //Iterate header/footer content;
        var headersFooters = this.documentHelper.headersFooters;
        for (var _i = 0, headersFooters_1 = headersFooters; _i < headersFooters_1.length; _i++) {
            var headerFooter = headersFooters_1[_i];
            for (var i = 0; i < 6; i++) {
                var currentHeaderFooter = headerFooter[i];
                if (currentHeaderFooter) {
                    positionInfo.position += this.getBlockIndex(currentHeaderFooter.childWidgets[0], paragraphInfo, positionInfo, tableBlock);
                    if (positionInfo.done) {
                        return positionInfo;
                    }
                }
                else {
                    positionInfo.position += 1;
                }
            }
        }
        return positionInfo;
    };
    Selection.prototype.getBlockIndex = function (block, paragraphInfo, positionInfo, tableBlock) {
        var position = 0;
        var fieldResult = { length: 0 };
        do {
            if (block instanceof ParagraphWidget && !isNullOrUndefined(paragraphInfo) && !isNullOrUndefined(paragraphInfo.paragraph) && paragraphInfo.paragraph.equals(block)) {
                //Paragraph start
                position += 1;
                var elementInfo = block.getInline(paragraphInfo.offset, 0);
                position += this.getBlockOffsetByElement(paragraphInfo, block, elementInfo.element, elementInfo.index, fieldResult);
                // if (this.isEndOffset && this.end.offset === this.getLineLength(this.end.currentWidget) + 1) {
                //     position += 1;
                // }
                // if (this.owner.documentHelper.isDocumentProtected && this.owner.documentHelper.protectionType === 'FormFieldsOnly') {
                //     position -= fieldResult.length;
                // }
                positionInfo.done = true;
                break;
            }
            position = this.getBlockLength(paragraphInfo, block, position, positionInfo, true, tableBlock, fieldResult);
            if (positionInfo.done) {
                // if (this.owner.documentHelper.isDocumentProtected && this.owner.documentHelper.protectionType === 'FormFieldsOnly') {
                //     position -= fieldResult.length;
                // }
                break;
            }
            if (!isNullOrUndefined(block)) {
                if (block.containerWidget instanceof BodyWidget && block.containerWidget.containerWidget instanceof FootNoteWidget) {
                    var nextBlock = block.getSplitWidgets().pop().nextRenderedWidget;
                    if (!isNullOrUndefined(nextBlock) && block.containerWidget !== nextBlock.containerWidget) {
                        break;
                    }
                    else {
                        block = nextBlock;
                    }
                }
                else {
                    block = block.getSplitWidgets().pop().nextRenderedWidget;
                }
            }
        } while (block);
        //positionInfo.position = position;
        return position;
    };
    Selection.prototype.getBlockTotalLength = function (block, targetBlock, positionInfo, tableBlock, fieldResult) {
        var offset = 0;
        var isDropdown = false;
        var splittedWidget = block.getSplitWidgets();
        for (var i = 0; i < splittedWidget.length; i++) {
            for (var j = 0; j < splittedWidget[i].childWidgets.length; j++) {
                var line = splittedWidget[i].childWidgets[j];
                for (var k = 0; k < line.children.length; k++) {
                    var element = line.children[k];
                    if (element instanceof ListTextElementBox) {
                        continue;
                    }
                    if (element instanceof ShapeElementBox || element instanceof FootnoteElementBox) {
                        if (element instanceof ShapeElementBox) {
                            if (element.textFrame.childWidgets.length > 0) {
                                offset += this.getBlockIndex(element.textFrame.childWidgets[0], targetBlock, positionInfo, undefined);
                            }
                        }
                        else {
                            offset += this.getBlockIndex(element.bodyWidget.childWidgets[0], targetBlock, positionInfo, undefined);
                        }
                        if (positionInfo.done) {
                            return offset;
                        }
                    }
                    if (element instanceof FieldElementBox && element.fieldType == 0 && element.formFieldData instanceof DropDownFormField) {
                        isDropdown = true;
                    }
                    if (isDropdown && element instanceof FieldElementBox && element.fieldType == 1) {
                        if (element.previousNode instanceof TextElementBox) {
                            fieldResult.length += element.previousNode.length;
                            isDropdown = false;
                        }
                    }
                    if (!element.skipformFieldLength) {
                        offset += element.length;
                    }
                }
            }
        }
        return offset;
    };
    /**
     * @private
     */
    Selection.prototype.getBlockLength = function (paragraphInfo, block, position, completed, skipShapeElement, tableBlock, fieldResult) {
        if (paragraphInfo && block instanceof ParagraphWidget && !isNullOrUndefined(paragraphInfo.paragraph) && paragraphInfo.paragraph.equals(block)) {
            //Paragraph start
            position += 1;
            var elementInfo = block.getInline(paragraphInfo.offset, 0);
            position += this.getBlockOffsetByElement(paragraphInfo, block, elementInfo.element, elementInfo.index, fieldResult);
            if (this.isEndOffset && block.isInsideTable && block.associatedCell.lastChild.equals(block) && paragraphInfo.offset === this.getParagraphLength(block) + 1) {
                position += 1;
            }
            completed.done = true;
            return position;
        }
        if (block instanceof ParagraphWidget) {
            // Code for Comparing the offset calculated using old approach and optimized approach
            // if (this.isNewApproach) {
            // position += 1;
            // if (!skipShapeElement) {
            //     position += block.length;
            // } else {
            //     position += this.getBlockTotalLength(block, paragraphInfo, completed, tableBlock, fieldResult);
            // }
            // } else {
            //Add Paragraph start length;
            position += 1;
            if (!skipShapeElement) {
                position += (block.getTotalLength());
            }
            else {
                position += this.getBlockTotalLength(block, paragraphInfo, completed, tableBlock, fieldResult);
            }
            // }
        }
        else if (block instanceof TableWidget) {
            // Table start mark length
            position += 1;
            if (!isNullOrUndefined(tableBlock)) {
                if (tableBlock instanceof TableWidget) {
                    if (tableBlock.equals(block)) {
                        completed.done = true;
                        return position;
                    }
                }
            }
            var row = block.firstChild;
            while (row) {
                // Row mark length
                position += 1;
                if (!isNullOrUndefined(tableBlock)) {
                    if (tableBlock instanceof TableRowWidget) {
                        if (tableBlock.equals(row)) {
                            completed.done = true;
                            return position;
                        }
                    }
                }
                var cell = row.firstChild;
                while (cell) {
                    // Cell mark length
                    position += 1;
                    if (!isNullOrUndefined(tableBlock)) {
                        if (tableBlock instanceof TableCellWidget) {
                            if (tableBlock.equals(cell)) {
                                completed.done = true;
                                return position;
                            }
                        }
                    }
                    var childBlock = cell.firstChild;
                    while (childBlock) {
                        position = this.getBlockLength(paragraphInfo, childBlock, position, completed, skipShapeElement, tableBlock, fieldResult);
                        if (completed.done) {
                            return position;
                        }
                        childBlock = childBlock.getSplitWidgets().pop().nextRenderedWidget;
                    }
                    cell = cell.nextWidget;
                }
                var tableIndex = row.ownerTable.index;
                row = row.getSplitWidgets().pop().nextRenderedWidget;
                if (row && row.ownerTable.index !== tableIndex) {
                    row = undefined;
                }
            }
            // Table end mark length
            // position += 1;
        }
        return position;
    };
    /**
     * Calculate the cell length.
     * @private
     */
    Selection.prototype.calculateCellLength = function (cell) {
        var block = cell.firstChild;
        var position = 0;
        var completed = { "done": false };
        var paragraphInfo = { 'paragraph': null, 'offset': 0 };
        while (block) {
            position = this.getBlockLength(paragraphInfo, block, position, completed, true, undefined, undefined);
            block = block.getSplitWidgets().pop().nextRenderedWidget;
        }
        return position;
    };
    Selection.prototype.getBlockOffsetByElement = function (paragraphInfo, block, targetElement, elementIndex, fieldResult) {
        var offset = 0;
        var isDropdown = false;
        var splittedWidget = block.getSplitWidgets();
        for (var i = 0; i < splittedWidget.length; i++) {
            for (var j = 0; j < splittedWidget[i].childWidgets.length; j++) {
                var line = splittedWidget[i].childWidgets[j];
                for (var k = 0; k < line.children.length; k++) {
                    var element = line.children[k];
                    if (element instanceof ListTextElementBox) {
                        continue;
                    }
                    if (element instanceof FieldElementBox && element.fieldType == 0 && element.formFieldData instanceof DropDownFormField) {
                        isDropdown = true;
                    }
                    if (isDropdown && element instanceof FieldElementBox && element.fieldType == 1) {
                        if (element.previousNode instanceof TextElementBox) {
                            fieldResult.length += element.previousNode.length;
                            isDropdown = false;
                        }
                    }
                    if (element === targetElement) {
                        return offset + elementIndex;
                    }
                    if (element instanceof ShapeElementBox || element instanceof FootnoteElementBox) {
                        if (element instanceof ShapeElementBox) {
                            if (element.textFrame.childWidgets.length > 0) {
                                for (var m = 0; m < element.textFrame.childWidgets.length; m++) {
                                    offset = this.getBlockLength(paragraphInfo, element.textFrame.childWidgets[m], offset, { done: false }, false, undefined, undefined);
                                }
                            }
                        }
                        else {
                            if (element.bodyWidget.childWidgets.length > 0) {
                                for (var m = 0; m < element.bodyWidget.childWidgets.length; m++) {
                                    offset = this.getBlockLength(paragraphInfo, element.bodyWidget.childWidgets[m], offset, { done: false }, false, undefined, undefined);
                                }
                            }
                        }
                    }
                    if (!element.skipformFieldLength) {
                        offset += element.length;
                    }
                }
            }
        }
        return offset;
    };
    /**
     * This method is for collaborative editing.
     * @private
     */
    Selection.prototype.getTableRelativeValue = function (startPosition, endPosition) {
        // If start is in firset row first cell and end is in last row last cell or next table or next para. we need to minus the offset to 3. Else checking row.
        // If start is first cell and end is in row last cell or other row last cell or other widgets. we need to minus the offset to 2. else return 0.
        if (startPosition.currentWidget.paragraph.isInsideTable) {
            if (this.isTableSelected()) {
                return 3;
            }
            else if (this.isRowSelect() && endPosition.paragraph.isInsideTable && startPosition.paragraph.associatedCell.ownerTable.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                return 2;
            }
            else {
                var table = startPosition.paragraph.associatedCell.ownerTable.getSplitWidgets();
                var firstParagraph = this.getFirstBlockInFirstCell(table[0]);
                if (startPosition.paragraph.associatedCell.equals(firstParagraph.associatedCell)) {
                    if (endPosition.paragraph.isInsideTable) {
                        if (!startPosition.paragraph.associatedCell.ownerTable.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                            var length_3 = this.isRowSelect() ? 2 : 3;
                            var table_1 = startPosition.paragraph.associatedCell.ownerTable;
                            while (table_1.containerWidget instanceof TableCellWidget) {
                                length_3 += 3;
                                table_1 = table_1.containerWidget.ownerTable;
                                if (table_1.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                                    break;
                                }
                            }
                            return length_3;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        return 3;
                    }
                }
                else {
                    if (endPosition.currentWidget.paragraph.isInsideTable) {
                        if (!startPosition.paragraph.associatedCell.ownerTable.equals(endPosition.paragraph.associatedCell.ownerTable)) {
                            return 2;
                        }
                        else {
                            return 0;
                        }
                    }
                    else {
                        return 2;
                    }
                }
            }
        }
        return 0;
    };
    /**
     *
     * @private
     */
    Selection.prototype.isRowSelect = function () {
        // This method wil return if start row child widgets equals to end row child widgets. 
        var start = this.start;
        var end = this.end;
        if (!this.isForward) {
            start = this.end;
            end = this.start;
        }
        if (isNullOrUndefined(start.paragraph.associatedCell) ||
            isNullOrUndefined(end.paragraph.associatedCell) || start.paragraph.associatedCell.equals(end.paragraph.associatedCell) || this.isTableSelected(true)) {
            return false;
        }
        var endTable = end.paragraph.associatedCell.ownerTable;
        var isRowSelect = false;
        if (endTable.containerWidget instanceof TableCellWidget) {
            while (endTable.containerWidget instanceof TableCellWidget) {
                endTable = endTable.containerWidget.ownerTable;
                for (var i = 0; i < endTable.childWidgets.length; i++) {
                    var row_1 = endTable.childWidgets[i];
                    if (row_1.childWidgets[row_1.childWidgets.length - 1].equals(endTable.containerWidget)) {
                        isRowSelect = true;
                    }
                }
            }
        }
        else {
            for (var i = 0; i < endTable.childWidgets.length; i++) {
                var row_2 = endTable.childWidgets[i];
                if (row_2.childWidgets[row_2.childWidgets.length - 1].equals(end.paragraph.associatedCell)) {
                    isRowSelect = true;
                }
            }
        }
        var row = start.paragraph.associatedCell.ownerRow.getSplitWidgets();
        var firstcell;
        if (row[0].childWidgets.length > 0) {
            firstcell = row[0].childWidgets[0];
        }
        return start.paragraph.associatedCell.equals(firstcell) && isRowSelect;
    };
    return Selection;
}());
export { Selection };
