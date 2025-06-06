/* eslint-disable */
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { WList } from '../list/list';
import { WListLevel } from '../list/list-level';
import { WAbstractList } from '../list/abstract-list';
import { WLevelOverride } from '../list/level-override';
import { WCharacterFormat, WListFormat, WParagraphFormat, WCellFormat, WSectionFormat, WRowFormat, WColumnFormat } from '../format/index';
import { WCharacterStyle, WParagraphStyle, WTabStop, WTableStyle } from '../format/index';
import { LineWidget, ParagraphWidget, ImageElementBox, BodyWidget, TextElementBox, TableCellWidget, TableRowWidget, TableWidget, FieldElementBox, HeaderFooterWidget, BookmarkElementBox, FieldTextElementBox, TabElementBox, EditRangeStartElementBox, EditRangeEndElementBox, ChartElementBox, ChartDataFormat, ChartCategory, ChartData, ChartSeries, ChartDataLabels, ChartTrendLines, ChartSeriesFormat, CommentCharacterElementBox, CommentElementBox, TextFormField, CheckBoxFormField, DropDownFormField, ShapeElementBox, LineFormat, TextFrame, ContentControlProperties, ContentControlListItems, ContentControl, CheckBoxState, XmlMapping, CustomXmlPart, Footnote, FootnoteElementBox, FillFormat, TablePosition, BreakElementBox, FootnoteEndnoteMarkerElementBox } from './page';
import { HelperMethods } from '../editor/editor-helper';
import { Dictionary } from '../../base/dictionary';
import { ChartComponent } from '@syncfusion/ej2-office-chart';
import { Revision } from '../track-changes/track-changes';
import { FontSchemeStruct } from '../index';
import { sectionsProperty, hiddenProperty, imagesProperty, paraStyleNameProperty, fontSubstitutionTableProperty, characterFormatProperty, paragraphFormatProperty, listsProperty, abstractListsProperty, backgroundProperty, stylesProperty, commentsProperty, revisionsProperty, customXmlProperty, defaultTabWidthProperty, formattingProperty, trackChangesProperty, protectionTypeProperty, enforcementProperty, hashValueProperty, saltValueProperty, doNotUseHTMLParagraphAutoSpacingProperty, alignTablesRowByRowProperty, formFieldShadingProperty, footnotesProperty, endnotesProperty, compatibilityModeProperty, themeFontLanguagesProperty, themesProperty, nameProperty, basedOnProperty, nextProperty, linkProperty, localeIdProperty, localeIdFarEastProperty, localeIdBidiProperty, boldProperty, italicProperty, underlineProperty, fontHintTypeProperty, baselineAlignmentProperty, strikethroughProperty, highlightColorProperty, fontSizeProperty, fontColorProperty, fontFamilyProperty, styleNameProperty, bidiProperty, bdoProperty, fontSizeBidiProperty, fontFamilyBidiProperty, boldBidiProperty, italicBidiProperty, allCapsProperty, complexScriptProperty, fontFamilyAsciiProperty, fontFamilyFarEastProperty, fontFamilyNonFarEastProperty, revisionIdsProperty, listIdProperty, listLevelNumberProperty, leftIndentProperty, rightIndentProperty, firstLineIndentProperty, textAlignmentProperty, afterSpacingProperty, beforeSpacingProperty, spaceAfterAutoProperty, spaceBeforeAutoProperty, lineSpacingProperty, lineSpacingTypeProperty, listFormatProperty, keepWithNextProperty, widowControlProperty, keepLinesTogetherProperty, outlineLevelProperty, contextualSpacingProperty, bordersProperty, tabsProperty, headerDistanceProperty, footerDistanceProperty, differentFirstPageProperty, differentOddAndEvenPagesProperty, pageWidthProperty, pageHeightProperty, leftMarginProperty, rightMarginProperty, topMarginProperty, bottomMarginProperty, restartPageNumberingProperty, pageStartingNumberProperty, endnoteNumberFormatProperty, footNoteNumberFormatProperty, restartIndexForFootnotesProperty, restartIndexForEndnotesProperty, initialFootNoteNumberProperty, initialEndNoteNumberProperty, pageNumberStyleProperty, columnsProperty, numberOfColumnsProperty, equalWidthProperty, lineBetweenColumnsProperty, breakCodeProperty, cellWidthProperty, columnSpanProperty, rowSpanProperty, verticalAlignmentProperty, allowBreakAcrossPagesProperty, isHeaderProperty, heightTypeProperty, gridBeforeProperty, gridBeforeWidthProperty, gridBeforeWidthTypeProperty, gridAfterProperty, gridAfterWidthProperty, gridAfterWidthTypeProperty, allowAutoFitProperty, cellSpacingProperty, shadingProperty, tableAlignmentProperty, preferredWidthProperty, preferredWidthTypeProperty, horizontalPositionAbsProperty, textureProperty, backgroundColorProperty, foregroundColorProperty, shadowProperty, hasNoneStyleProperty, verticalProperty, horizontalProperty, diagonalUpProperty, diagonalDownProperty, lineStyleProperty, lineWidthProperty, layoutProperty, dataFormatProperty, yValueProperty, chartDataProperty, categoryXNameProperty, lineProperty, foreColorProperty, layoutXProperty, layoutYProperty, directionProperty, endStyleProperty, numberValueProperty, markerStyleProperty, markerColorProperty, markerSizeProperty, forwardProperty, backwardProperty, interceptProperty, isDisplayRSquaredProperty, isDisplayEquationProperty, seriesNameProperty, dataLabelProperty, errorBarProperty, seriesFormatProperty, trendLinesProperty, dataPointsProperty, firstSliceAngleProperty, holeSizeProperty, isLegendKeyProperty, isBubbleSizeProperty, isCategoryNameProperty, isSeriesNameProperty, isValueProperty, isPercentageProperty, isLeaderLinesProperty, showSeriesKeysProperty, hasHorizontalBorderProperty, hasVerticalBorderProperty, hasBordersProperty, categoryTypeProperty, chartCategoryProperty, chartSeriesProperty, chartAreaProperty, chartTitleAreaProperty, plotAreaProperty, chartLegendProperty, chartPrimaryCategoryAxisProperty, chartPrimaryValueAxisProperty, chartTitleProperty, chartTypeProperty, gapWidthProperty, overlapProperty, chartDataTableProperty, textProperty, shapeIdProperty, alternativeTextProperty, visibleProperty, widthProperty, heightProperty, widthScaleProperty, heightScaleProperty, lineFormatProperty, fillFormatProperty, textWrappingStyleProperty, textWrappingTypeProperty, verticalRelativePercentProperty, horizontalRelativePercentProperty, heightRelativePercentProperty, widthRelativePercentProperty, zOrderPositionProperty, layoutInCellProperty, lockAnchorProperty, autoShapeTypeProperty, textFrameProperty, colorProperty, fillProperty, textVerticalAlignmentProperty, imageStringProperty, metaFileImageStringProperty, isInlineImageProperty, isMetaFileProperty, topProperty, bottomProperty, rightProperty, leftProperty, getImageHeightProperty, getImageWidthProperty, hasFieldEndProperty, formFieldDataProperty, fieldTypeProperty, enabledProperty, helpTextProperty, statusTextProperty, textInputProperty, checkBoxProperty, dropDownListProperty, maxLengthProperty, defaultValueProperty, formatProperty, sizeTypeProperty, sizeProperty, checkedProperty, dropDownItemsProperty, selectedIndexProperty, commentIdProperty, commentCharacterTypeProperty, authorProperty, initialProperty, dateProperty, doneProperty, replyCommentsProperty, revisionTypeProperty, revisionIdProperty, itemIDProperty, xmlProperty, footnoteTypeProperty, symbolCodeProperty, symbolFontNameProperty, customMarkerProperty, inlinesProperty, contentControlPropertiesProperty, lockContentControlProperty, lockContentsProperty, tagProperty, titleProperty, hasPlaceHolderTextProperty, multiLineProperty, isTemporaryProperty, dateCalendarTypeProperty, dateStorageFormatProperty, dateDisplayLocaleProperty, dateDisplayFormatProperty, isCheckedProperty, uncheckedStateProperty, checkedStateProperty, contentControlListItemsProperty, xmlMappingProperty, fontProperty, valueProperty, displayTextProperty, isMappedProperty, isWordMlProperty, prefixMappingProperty, xPathProperty, storeItemIdProperty, customXmlPartProperty, idProperty, cellFormatProperty, rowFormatProperty, cellsProperty, rowsProperty, descriptionProperty, wrapTextAroundProperty, positioningProperty, tableFormatProperty, allowOverlapProperty, distanceTopProperty, distanceRightProperty, distanceLeftProperty, distanceBottomProperty, verticalOriginProperty, verticalPositionProperty, horizontalOriginProperty, horizontalAlignmentProperty, horizontalPositionProperty, blocksProperty, headerProperty, footerProperty, evenHeaderProperty, evenFooterProperty, firstPageHeaderProperty, firstPageFooterProperty, headersFootersProperty, sectionFormatProperty, listLevelPatternProperty, followCharacterProperty, startAtProperty, restartLevelProperty, levelNumberProperty, numberFormatProperty, abstractListIdProperty, levelsProperty, overrideListLevelProperty, levelOverridesProperty, separatorProperty, continuationSeparatorProperty, continuationNoticeProperty, bookmarkTypeProperty, propertiesProperty, tabJustificationProperty, positionProperty, deletePositionProperty, tabLeaderProperty, editRangeIdProperty, columnFirstProperty, columnLastProperty, userProperty, groupProperty, editableRangeStartProperty, spaceProperty, fontSchemeProperty, fontSchemeNameProperty, majorFontSchemeProperty, minorFontSchemeProperty, fontSchemeListProperty, fontTypefaceProperty, typefaceProperty, panoseProperty, typeProperty, majorUnitProperty, maximumValueProperty, minimumValueProperty, hasMajorGridLinesProperty, hasMinorGridLinesProperty, majorTickMarkProperty, minorTickMarkProperty, tickLabelPositionProperty, rgbProperty, appearanceProperty, lineFormatTypeProperty, allowSpaceOfSameStyleInTableProperty, weightProperty, inlineFormatProperty, fontNameProperty, isCompressedProperty, isAfterParagraphMarkProperty, isAfterRowMarkProperty, isAfterCellMarkProperty, isAfterTableMarkProperty, belowTextProperty, breakClearTypeProperty, characterSpacingProperty, scalingProperty, nsidProperty, incrementalOps, isLegalStyleNumberingProperty, horizontalRuleProperty, isAutoMajorProperty, underlineColorProperty, editingPointsProperty } from '../../index';
/**
 * @private
 */
var SfdtReader = /** @class */ (function () {
    function SfdtReader(documentHelper) {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        this.documentHelper = undefined;
        /**
         * @private
         */
        this.commentStarts = undefined;
        /**
         * @private
         */
        this.commentEnds = undefined;
        /**
         * @private
         */
        this.commentsCollection = undefined;
        /**
         * @private
         */
        this.revisionCollection = undefined;
        this.isPageBreakInsideTable = false;
        this.referedRevisions = [];
        this.isParseHeader = false;
        this.footnotes = undefined;
        this.endnotes = undefined;
        this.keywordIndex = undefined;
        this.themes = undefined;
        /**
         * @private
         */
        this.isCutPerformed = false;
        /**
         * @private
         */
        this.isPaste = false;
        /**
         * @private
         */
        this.isContextBasedPaste = false;
        /**
         * @private
         */
        this.isHtmlPaste = false;
        this.documentHelper = documentHelper;
        this.editableRanges = new Dictionary();
    }
    Object.defineProperty(SfdtReader.prototype, "isPasting", {
        get: function () {
            return this.viewer && this.viewer.owner.isPastingContent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SfdtReader.prototype, "viewer", {
        get: function () {
            return this.documentHelper.owner.viewer;
        },
        enumerable: true,
        configurable: true
    });
    SfdtReader.prototype.convertJsonToDocument = function (json, incrementalOperations) {
        this.commentStarts = new Dictionary();
        this.commentEnds = new Dictionary();
        this.commentsCollection = new Dictionary();
        this.revisionCollection = new Dictionary();
        this.fontInfoCollection = new Dictionary();
        this.referedRevisions = [];
        this.keywordIndex = 0;
        this.footnotes = new Footnote();
        this.endnotes = new Footnote();
        var sections = [];
        var jsonObject = HelperMethods.getSfdtDocument(json);
        if (!isNullOrUndefined(jsonObject.optimizeSfdt) && jsonObject.optimizeSfdt) {
            this.keywordIndex = 1;
        }
        if (!isNullOrUndefined(jsonObject[fontSubstitutionTableProperty[this.keywordIndex]])) {
            this.parseFontSubstitutionTable(jsonObject[fontSubstitutionTableProperty[this.keywordIndex]]);
        }
        if (isNullOrUndefined(jsonObject[characterFormatProperty[this.keywordIndex]])) {
            this.parseCharacterFormat(0, this.viewer.owner.characterFormat, this.documentHelper.characterFormat);
        }
        else {
            this.documentHelper.characterFormat.clearFormat();
            this.parseCharacterFormat(this.keywordIndex, jsonObject[characterFormatProperty[this.keywordIndex]], this.documentHelper.characterFormat);
        }
        if (isNullOrUndefined(jsonObject[paragraphFormatProperty[this.keywordIndex]])) {
            this.parseParagraphFormat(0, this.viewer.owner.paragraphFormat, this.documentHelper.paragraphFormat);
        }
        else {
            this.parseParagraphFormat(this.keywordIndex, jsonObject[paragraphFormatProperty[this.keywordIndex]], this.documentHelper.paragraphFormat);
        }
        if (!isNullOrUndefined(jsonObject[themeFontLanguagesProperty[this.keywordIndex]])) {
            this.parseCharacterFormat(this.keywordIndex, jsonObject[themeFontLanguagesProperty[this.keywordIndex]], this.documentHelper.themeFontLanguage);
        }
        this.parseDocumentProtection(jsonObject);
        if (!isNullOrUndefined(jsonObject[defaultTabWidthProperty[this.keywordIndex]])) {
            this.documentHelper.defaultTabWidth = jsonObject[defaultTabWidthProperty[this.keywordIndex]];
        }
        if (!isNullOrUndefined(jsonObject[trackChangesProperty[this.keywordIndex]])) {
            //when new document is open in collaborative editing, again building operation for enable track changes. So skipping it. 
            if (this.documentHelper.owner.enableTrackChanges !== HelperMethods.parseBoolValue(jsonObject[trackChangesProperty[this.keywordIndex]])) {
                this.documentHelper.owner.skipSettingsOps = true;
            }
            this.documentHelper.owner.enableTrackChanges = HelperMethods.parseBoolValue(jsonObject[trackChangesProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(jsonObject[doNotUseHTMLParagraphAutoSpacingProperty[this.keywordIndex]])) {
            this.documentHelper.dontUseHtmlParagraphAutoSpacing = HelperMethods.parseBoolValue(jsonObject[doNotUseHTMLParagraphAutoSpacingProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(jsonObject[allowSpaceOfSameStyleInTableProperty[this.keywordIndex]])) {
            this.documentHelper.allowSpaceOfSameStyleInTable = HelperMethods.parseBoolValue(jsonObject[allowSpaceOfSameStyleInTableProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(jsonObject[alignTablesRowByRowProperty[this.keywordIndex]])) {
            this.documentHelper.alignTablesRowByRow = HelperMethods.parseBoolValue(jsonObject[alignTablesRowByRowProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(jsonObject[backgroundProperty[this.keywordIndex]])) {
            this.documentHelper.backgroundColor = this.getColor(jsonObject[backgroundProperty[this.keywordIndex]][colorProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(jsonObject[compatibilityModeProperty[this.keywordIndex]])) {
            this.documentHelper.compatibilityMode = this.getCompatibilityMode(jsonObject[compatibilityModeProperty[this.keywordIndex]]);
            if (!isNullOrUndefined(this.documentHelper.owner.documentSettings)) {
                this.documentHelper.owner.documentSettings.compatibilityMode = this.getCompatibilityMode(jsonObject[compatibilityModeProperty[this.keywordIndex]]);
            }
        }
        if (!isNullOrUndefined(jsonObject[abstractListsProperty[this.keywordIndex]])) {
            this.parseAbstractList(jsonObject, this.documentHelper.abstractLists);
        }
        if (!isNullOrUndefined(jsonObject[listsProperty[this.keywordIndex]])) {
            this.parseList(jsonObject, this.documentHelper.lists);
        }
        if (!isNullOrUndefined(jsonObject[stylesProperty[this.keywordIndex]])) {
            this.parseStyles(jsonObject, this.documentHelper.styles);
        }
        if (!isNullOrUndefined(jsonObject[commentsProperty[this.keywordIndex]])) {
            this.parseComments(jsonObject, this.documentHelper.comments);
        }
        if (!isNullOrUndefined(jsonObject[revisionsProperty[this.keywordIndex]])) {
            this.parseRevisions(jsonObject, this.viewer.owner.revisionsInternal.changes);
        }
        if (!isNullOrUndefined(jsonObject[imagesProperty[this.keywordIndex]])) {
            this.parseImages(jsonObject[imagesProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(jsonObject[sectionsProperty[this.keywordIndex]])) {
            this.parseSections(jsonObject[sectionsProperty[this.keywordIndex]], sections);
        }
        if (!isNullOrUndefined(jsonObject[customXmlProperty[this.keywordIndex]])) {
            this.parseCustomXml(jsonObject);
        }
        if (!isNullOrUndefined(jsonObject[formFieldShadingProperty[this.keywordIndex]])) {
            this.documentHelper.owner.documentEditorSettings.formFieldSettings.applyShading = HelperMethods.parseBoolValue(jsonObject[formFieldShadingProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(jsonObject[footnotesProperty[this.keywordIndex]])) {
            this.parseFootnotes(jsonObject[footnotesProperty[this.keywordIndex]], this.documentHelper.footnotes);
        }
        if (!isNullOrUndefined(jsonObject[endnotesProperty[this.keywordIndex]])) {
            this.parseEndtnotes(jsonObject[endnotesProperty[this.keywordIndex]], this.documentHelper.endnotes);
        }
        if (!isNullOrUndefined(jsonObject[themesProperty[this.keywordIndex]])) {
            this.parseThemes(jsonObject[themesProperty[this.keywordIndex]], this.documentHelper.themes);
        }
        this.generalizeRevisions();
        this.removeUnmappedBookmark();
        if (!isNullOrUndefined(jsonObject[incrementalOps[0]])) {
            incrementalOperations[incrementalOps[0]] = (jsonObject[incrementalOps[0]]);
        }
        if (this.documentHelper.fieldStacks && this.documentHelper.fieldStacks.length > 0) {
            this.documentHelper.fieldStacks = [];
        }
        return sections;
    };
    SfdtReader.prototype.parseFontSubstitutionTable = function (fontSubstitutionTable) {
        if (!isNullOrUndefined(this.documentHelper) && !isNullOrUndefined(this.documentHelper.fontSubstitutionTable)) {
            if (Object.keys(fontSubstitutionTable).length > 0) {
                var keys = Object.keys(fontSubstitutionTable);
                for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                    var key = keys_1[_i];
                    this.documentHelper.fontSubstitutionTable.add(key, fontSubstitutionTable[key]);
                }
            }
        }
    };
    SfdtReader.prototype.removeUnmappedBookmark = function () {
        var bookmarkKeys = this.documentHelper.bookmarks.keys;
        var endBookmark = this.documentHelper.endBookmarksUpdated;
        for (var i = 0; i < bookmarkKeys.length; i++) {
            if (endBookmark.indexOf(bookmarkKeys[i]) === -1) {
                var bookmark = this.documentHelper.bookmarks.get(bookmarkKeys[i]);
                if (bookmark) {
                    bookmark.line.children.splice(bookmark.line.children.indexOf(bookmark), 1);
                }
                this.documentHelper.bookmarks.remove(bookmarkKeys[i]);
            }
        }
        this.documentHelper.endBookmarksUpdated = [];
    };
    SfdtReader.prototype.generalizeRevisions = function () {
        var _this = this;
        var tempRevisionCollection = new Dictionary();
        var tempRevisons = [];
        this.referedRevisions.forEach(function (element) {
            var revision = _this.documentHelper.revisionsInternal.get(element);
            if (tempRevisons.indexOf(revision) === -1) {
                tempRevisons.push(revision);
                tempRevisionCollection.add(element, revision);
            }
        });
        this.viewer.owner.revisionsInternal.changes = tempRevisons;
        this.documentHelper.revisionsInternal = tempRevisionCollection;
    };
    SfdtReader.prototype.parseFootnotes = function (data, footnote) {
        if (!isNullOrUndefined(data[separatorProperty[this.keywordIndex]])) {
            this.parseBody(data[separatorProperty[this.keywordIndex]], footnote.separator);
        }
        if (!isNullOrUndefined(data[continuationNoticeProperty[this.keywordIndex]])) {
            this.parseBody(data[continuationNoticeProperty[this.keywordIndex]], footnote.continuationNotice);
        }
        if (!isNullOrUndefined(data[continuationSeparatorProperty[this.keywordIndex]])) {
            this.parseBody(data[continuationSeparatorProperty[this.keywordIndex]], footnote.continuationSeparator);
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseImages = function (data) {
        for (var img in data) {
            if (Array.isArray(data["" + img])) {
                this.documentHelper.images.add(parseInt(img), data["" + img]);
            }
            else {
                var images = [];
                images.push(data["" + img]);
                this.documentHelper.images.add(parseInt(img), images);
            }
        }
    };
    SfdtReader.prototype.parseEndtnotes = function (data, endnote) {
        if (!isNullOrUndefined(data[separatorProperty[this.keywordIndex]])) {
            this.parseBody(data[separatorProperty[this.keywordIndex]], endnote.separator);
        }
        if (!isNullOrUndefined(data[continuationNoticeProperty[this.keywordIndex]])) {
            this.parseBody(data[continuationNoticeProperty[this.keywordIndex]], endnote.continuationNotice);
        }
        if (!isNullOrUndefined(data[continuationSeparatorProperty[this.keywordIndex]])) {
            this.parseBody(data[continuationSeparatorProperty[this.keywordIndex]], endnote.continuationSeparator);
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseCustomXml = function (data) {
        for (var i = 0; i < data[customXmlProperty[this.keywordIndex]].length; i++) {
            var xmlData = data[customXmlProperty[this.keywordIndex]][i];
            if (!this.documentHelper.customXmlData.containsKey(xmlData[itemIDProperty[this.keywordIndex]])) {
                this.documentHelper.customXmlData.add(xmlData[itemIDProperty[this.keywordIndex]], xmlData[xmlProperty[this.keywordIndex]]);
            }
        }
    };
    SfdtReader.prototype.parseDocumentProtection = function (data) {
        if (!isNullOrUndefined(data[formattingProperty[this.keywordIndex]])) {
            this.documentHelper.restrictFormatting = HelperMethods.parseBoolValue(data[formattingProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(data[enforcementProperty[this.keywordIndex]])) {
            this.documentHelper.isDocumentProtected = HelperMethods.parseBoolValue(data[enforcementProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(data[protectionTypeProperty[this.keywordIndex]])) {
            this.documentHelper.protectionType = this.getProtectionType(data[protectionTypeProperty[this.keywordIndex]]);
        }
        if (!isNullOrUndefined(data[hashValueProperty[this.keywordIndex]])) {
            this.documentHelper.hashValue = data[hashValueProperty[this.keywordIndex]];
        }
        if (!isNullOrUndefined(data[saltValueProperty[this.keywordIndex]])) {
            this.documentHelper.saltValue = data[saltValueProperty[this.keywordIndex]];
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseStyles = function (data, styles) {
        for (var i = 0; i < data[stylesProperty[this.keywordIndex]].length; i++) {
            var editor = this.documentHelper.owner.editorModule;
            if ((!isNullOrUndefined(editor) && editor.isRemoteAction) || isNullOrUndefined(this.documentHelper.styles.findByName(data[stylesProperty[this.keywordIndex]][i][nameProperty[this.keywordIndex]]))) {
                this.parseStyle(data, data[stylesProperty[this.keywordIndex]][i], styles);
            }
        }
    };
    SfdtReader.prototype.parseRevisions = function (data, revisions) {
        for (var i = 0; i < data[revisionsProperty[this.keywordIndex]].length; i++) {
            var revisionData = data[revisionsProperty[this.keywordIndex]][i];
            if (!isNullOrUndefined(revisionData[revisionIdProperty[this.keywordIndex]]) && !isNullOrUndefined(revisionData[revisionTypeProperty[this.keywordIndex]])) {
                var revision = this.parseRevision(revisionData);
                var revisionCheck = true;
                if (!this.documentHelper.owner.sfdtExportModule.copyWithTrackChange && this.isPaste) {
                    if (this.getRevisionType(revisionData[revisionTypeProperty[this.keywordIndex]]) === 'Insertion' && this.isPaste && this.documentHelper.owner.enableTrackChanges && !this.documentHelper.owner.editorModule.isRemoteAction) {
                        // var editor = this.documentHelper.owner.editor;
                        // if (!isNullOrUndefined(editor) && editor.isRemoteAction) {
                        //     this.documentHelper.owner.editor.revisionData.push(this.documentHelper.owner.editor.getMarkerData(undefined, undefined, revision));
                        // }
                        continue;
                    }
                    else {
                        if (!this.revisionCollection.containsKey(revisionData[revisionIdProperty[this.keywordIndex]])) {
                            this.revisionCollection.add(revisionData[revisionIdProperty[this.keywordIndex]], revision);
                        }
                    }
                }
                else {
                    this.revisionCollection.add(revisionData[revisionIdProperty[this.keywordIndex]], revision);
                }
                for (var j = 0; j < revisions.length; j++) {
                    if (revisions[j].revisionID === revision.revisionID) {
                        revisionCheck = false;
                    }
                }
                if (revisionCheck && !this.documentHelper.owner.editorModule.isRemoteAction) {
                    revisions.push(revision);
                }
            }
        }
        this.documentHelper.revisionsInternal = this.revisionCollection;
        if (this.documentHelper.owner.sfdtExportModule) {
            this.documentHelper.owner.sfdtExportModule.copyWithTrackChange = false;
        }
    };
    SfdtReader.prototype.parseRevision = function (data) {
        if (!isNullOrUndefined(data)) {
            var revision = new Revision(this.viewer.owner, data[authorProperty[this.keywordIndex]], data[dateProperty[this.keywordIndex]]);
            revision.revisionID = data[revisionIdProperty[this.keywordIndex]];
            revision.revisionType = this.getRevisionType(data[revisionTypeProperty[this.keywordIndex]]);
            return revision;
        }
        else {
            return undefined;
        }
    };
    SfdtReader.prototype.checkAndApplyRevision = function (keyIndex, inline, item) {
        if (!isNullOrUndefined(inline[revisionIdsProperty[keyIndex]]) && inline[revisionIdsProperty[keyIndex]].length > 0) {
            for (var i = 0; i < inline[revisionIdsProperty[keyIndex]].length; i++) {
                var id = inline[revisionIdsProperty[keyIndex]][i];
                if (this.revisionCollection.containsKey(id)) {
                    this.referedRevisions.push(id);
                    var revision = this.revisionCollection.get(id);
                    if (!(item instanceof WParagraphFormat)) {
                        revision.range.push(item);
                    }
                    item.revisions.push(revision);
                    if (this.isPaste && this.documentHelper.owner.editorModule.isRemoteAction && item instanceof WRowFormat) {
                        this.documentHelper.owner.editorModule.remotePasteRevision.push(revision);
                    }
                }
            }
        }
    };
    SfdtReader.prototype.parseComments = function (data, comments) {
        var count = 0;
        for (var i = 0; i < data[commentsProperty[this.keywordIndex]].length; i++) {
            var commentData = data[commentsProperty[this.keywordIndex]][i];
            var commentElement = undefined;
            commentElement = this.parseComment(commentData, commentElement);
            while (count < commentData[replyCommentsProperty[this.keywordIndex]].length) {
                var replyComment = undefined;
                replyComment = this.parseComment(commentData[replyCommentsProperty[this.keywordIndex]][count], replyComment);
                replyComment.ownerComment = commentElement;
                replyComment.isReply = true;
                commentElement.replyComments.push(replyComment);
                this.commentsCollection.add(replyComment.commentId, replyComment);
                count++;
            }
            this.commentsCollection.add(commentElement.commentId, commentElement);
            comments.push(commentElement);
            count = 0;
        }
    };
    SfdtReader.prototype.parseComment = function (commentData, commentElement) {
        commentElement = new CommentElementBox(commentData[dateProperty[this.keywordIndex]]);
        commentElement.author = commentData[authorProperty[this.keywordIndex]];
        commentElement.initial = commentData[initialProperty[this.keywordIndex]];
        commentElement.commentId = commentData[commentIdProperty[this.keywordIndex]];
        commentElement.isResolved = HelperMethods.parseBoolValue(commentData[doneProperty[this.keywordIndex]]);
        commentElement.text = this.parseCommentText(commentData[blocksProperty[this.keywordIndex]]);
        commentElement.mentions = this.parseCommentMentions(commentData[blocksProperty[this.keywordIndex]]);
        commentElement.isPosted = true;
        return commentElement;
    };
    SfdtReader.prototype.parseCommentText = function (blocks) {
        var text = '';
        var isFieldDisplayText = false;
        for (var i = 0; i < blocks.length; i++) {
            if (i !== 0) {
                text += '<div>';
            }
            if (blocks[i][inlinesProperty[this.keywordIndex]].length > 0) {
                var inlines = blocks[i][inlinesProperty[this.keywordIndex]];
                for (var j = 0; j < inlines.length; j++) {
                    var inline = inlines[j];
                    if ((inline[fieldTypeProperty[this.keywordIndex]] === 0) || (inline[fieldTypeProperty[this.keywordIndex]] === 1) || (inline[fieldTypeProperty[this.keywordIndex]] === 2)) {
                        if (inline[fieldTypeProperty[this.keywordIndex]] === 0) {
                            j++;
                        }
                        else if (inline[fieldTypeProperty[this.keywordIndex]] === 2) {
                            isFieldDisplayText = true;
                        }
                        continue;
                    }
                    var textValue = inline[textProperty[this.keywordIndex]];
                    if (isFieldDisplayText) {
                        text = text + '<span contenteditable="false" class="e-mention-chip">' + textValue + '</span>';
                        isFieldDisplayText = false;
                    }
                    else if (textValue) {
                        text = text + textValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                    }
                }
            }
            else {
                text += i === 0 ? '<div><br></div>' : '<br>';
            }
            if (i !== 0) {
                text += '</div>';
            }
        }
        return text;
    };
    SfdtReader.prototype.parseCommentMentions = function (blocks) {
        var data = [];
        var isFieldCode = false;
        var isFieldDisplayText = false;
        for (var i = 0; i < blocks.length; i++) {
            var inlines = blocks[i][inlinesProperty[this.keywordIndex]];
            var mention = {};
            for (var j = 0; j < inlines.length; j++) {
                var inline = inlines[j];
                if ((inline[fieldTypeProperty[this.keywordIndex]] === 0) || (inline[fieldTypeProperty[this.keywordIndex]] === 1) || (inline[fieldTypeProperty[this.keywordIndex]] === 2)) {
                    if (inline[fieldTypeProperty[this.keywordIndex]] === 0) {
                        isFieldCode = true;
                    }
                    else if (inline[fieldTypeProperty[this.keywordIndex]] === 2) {
                        isFieldDisplayText = true;
                    }
                    continue;
                }
                var textValue = inline[textProperty[this.keywordIndex]];
                if (isFieldCode) {
                    var updatedText = textValue.replace(/.*"(.*)".*/, '$1');
                    updatedText = updatedText.replace('mailto:', '');
                    mention.value = updatedText;
                    isFieldCode = false;
                }
                else if (isFieldDisplayText) {
                    mention.text = textValue;
                    isFieldDisplayText = false;
                    data.push(mention);
                    mention = {};
                }
            }
        }
        return data;
    };
    SfdtReader.prototype.parseStyle = function (data, style, styles, resetKeyIndex) {
        var wStyle;
        var keyIndex = 0;
        var editor = this.documentHelper.owner.editorModule;
        if (!isNullOrUndefined(resetKeyIndex) && resetKeyIndex) {
            keyIndex = this.keywordIndex;
            this.keywordIndex = 0;
        }
        if (!isNullOrUndefined(style[typeProperty[this.keywordIndex]])) {
            if (this.getStyleType(style[typeProperty[this.keywordIndex]]) === 'Paragraph') {
                wStyle = new WParagraphStyle();
                wStyle.type = 'Paragraph';
            }
            if (this.getStyleType(style[typeProperty[this.keywordIndex]]) === 'Character') {
                wStyle = new WCharacterStyle();
                wStyle.type = 'Character';
            }
            if (this.getStyleType(style[typeProperty[this.keywordIndex]]) === 'Table') {
                wStyle = new WTableStyle();
                wStyle.type = 'Table';
            }
            if (!isNullOrUndefined(style[nameProperty[this.keywordIndex]])) {
                wStyle.name = style[nameProperty[this.keywordIndex]];
            }
            styles.push(wStyle);
            if (!isNullOrUndefined(style[basedOnProperty[this.keywordIndex]])) {
                var basedOn = void 0;
                if (!isNullOrUndefined(editor) && editor.isRemoteAction) {
                    basedOn = this.documentHelper.styles.findByName(style[basedOnProperty[this.keywordIndex]]);
                }
                else {
                    basedOn = styles.findByName(style[basedOnProperty[this.keywordIndex]]);
                }
                if (!isNullOrUndefined(basedOn)) {
                    if (basedOn.type === wStyle.type && basedOn.name !== wStyle.name) {
                        wStyle.basedOn = basedOn;
                        var baseStyle = this.getStyle(style[basedOnProperty[this.keywordIndex]], data);
                        if (this.isPaste && !isNullOrUndefined(baseStyle)) {
                            if (wStyle.type === 'Paragraph' && this.getStyleType(baseStyle[typeProperty[this.keywordIndex]]) === 'Paragraph') {
                                this.updateParagraphFormatFromBaseStyle(style, baseStyle);
                            }
                        }
                    }
                }
                else {
                    var basedStyle = this.getStyle(style[basedOnProperty[this.keywordIndex]], data);
                    var styleString = void 0;
                    if (!isNullOrUndefined(basedStyle) && this.getStyleType(basedStyle[typeProperty[this.keywordIndex]]) === wStyle.type) {
                        styleString = basedStyle;
                    }
                    else {
                        if (wStyle.type === 'Paragraph') {
                            styleString = JSON.parse('{"type":"Paragraph","name":"Normal","next":"Normal"}');
                        }
                        else if (wStyle.type === 'Character') {
                            styleString = JSON.parse('{"type": "Character","name": "Default Paragraph Font"}');
                        }
                    }
                    this.parseStyle(data, styleString, styles);
                    if (!isNullOrUndefined(editor) && editor.isRemoteAction) {
                        wStyle.basedOn = this.documentHelper.styles.findByName(styleString[nameProperty[this.keywordIndex]]);
                    }
                    else {
                        wStyle.basedOn = styles.findByName(styleString[nameProperty[this.keywordIndex]]);
                    }
                }
            }
            if (!isNullOrUndefined(style[linkProperty[this.keywordIndex]])) {
                var link = styles.findByName(style[linkProperty[this.keywordIndex]]);
                var linkStyle = this.getStyle(style[linkProperty[this.keywordIndex]], data);
                if (!isNullOrUndefined(editor) && editor.isRemoteAction) {
                    link = this.documentHelper.styles.findByName(style[linkProperty[this.keywordIndex]]);
                }
                var styleString = void 0;
                if (isNullOrUndefined(link)) {
                    if (isNullOrUndefined(linkStyle)) {
                        //Construct the CharacterStyle string
                        var charaStyle = {};
                        charaStyle[characterFormatProperty[this.keywordIndex]] = style[characterFormatProperty[this.keywordIndex]];
                        charaStyle[nameProperty[this.keywordIndex]] = style[nameProperty[this.keywordIndex]] + ' Char';
                        charaStyle[typeProperty[this.keywordIndex]] = 'Character';
                        //TODO: Implement basedOn
                        charaStyle[basedOnProperty[this.keywordIndex]] = style[basedOnProperty[this.keywordIndex]] === 'Normal' ? 'Default Paragraph Font' : (style[basedOnProperty[this.keywordIndex]] + ' Char');
                        styleString = charaStyle;
                    }
                    else {
                        styleString = linkStyle;
                    }
                    this.parseStyle(data, styleString, styles);
                    var linkedStyle = void 0;
                    if (!isNullOrUndefined(editor) && editor.isRemoteAction) {
                        linkedStyle = this.documentHelper.styles.findByName(styleString[nameProperty[this.keywordIndex]]);
                        wStyle.link = isNullOrUndefined(linkedStyle) ? style[linkProperty[this.keywordIndex]] : linkedStyle;
                    }
                    else {
                        linkedStyle = styles.findByName(styleString[nameProperty[this.keywordIndex]]);
                        wStyle.link = isNullOrUndefined(linkedStyle) ? style[linkProperty[this.keywordIndex]] : linkedStyle;
                    }
                }
                else {
                    wStyle.link = link;
                }
            }
            if (!isNullOrUndefined(style[characterFormatProperty[this.keywordIndex]])) {
                this.parseCharacterFormat(this.keywordIndex, style[characterFormatProperty[this.keywordIndex]], wStyle.characterFormat);
            }
            if (!isNullOrUndefined(style[paragraphFormatProperty[this.keywordIndex]])) {
                this.parseParagraphFormat(this.keywordIndex, style[paragraphFormatProperty[this.keywordIndex]], wStyle.paragraphFormat);
            }
            if (!isNullOrUndefined(style[nextProperty[this.keywordIndex]])) {
                if (style[nextProperty[this.keywordIndex]] === style[nameProperty[this.keywordIndex]]) {
                    wStyle.next = wStyle;
                }
                else {
                    var next = void 0;
                    if (!isNullOrUndefined(editor) && editor.isRemoteAction) {
                        next = this.documentHelper.styles.findByName(style[nextProperty[this.keywordIndex]]);
                    }
                    else {
                        next = styles.findByName(style[nextProperty[this.keywordIndex]]);
                    }
                    if (!isNullOrUndefined(next) && next.type === wStyle.type) {
                        wStyle.next = next;
                    }
                    else {
                        var nextStyleString = this.getStyle(style[nextProperty[this.keywordIndex]], data);
                        if (!isNullOrUndefined(nextStyleString)) {
                            this.parseStyle(data, nextStyleString, styles);
                            if (!isNullOrUndefined(editor) && editor.isRemoteAction) {
                                wStyle.next = this.documentHelper.styles.findByName(nextStyleString.name);
                            }
                            else {
                                wStyle.next = styles.findByName(nextStyleString.name);
                            }
                        }
                        else {
                            wStyle.next = wStyle;
                        }
                    }
                }
            }
        }
        if (!isNullOrUndefined(resetKeyIndex) && resetKeyIndex) {
            this.keywordIndex = keyIndex;
        }
        if (!isNullOrUndefined(wStyle) && wStyle.type !== 'Table') {
            this.documentHelper.addToStylesMap(wStyle);
        }
    };
    SfdtReader.prototype.updateParagraphFormatFromBaseStyle = function (style, baseStyle) {
        if (!isNullOrUndefined(style[paragraphFormatProperty[this.keywordIndex]]) && !isNullOrUndefined(baseStyle[paragraphFormatProperty[this.keywordIndex]])) {
            var paragraphFormat = style[paragraphFormatProperty[this.keywordIndex]];
            var baseParagraphFormat = baseStyle[paragraphFormatProperty[this.keywordIndex]];
            if (!paragraphFormat.hasOwnProperty(leftIndentProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(leftIndentProperty[this.keywordIndex])) {
                paragraphFormat[leftIndentProperty[this.keywordIndex]] = baseParagraphFormat[leftIndentProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(rightIndentProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(rightIndentProperty[this.keywordIndex])) {
                paragraphFormat[rightIndentProperty[this.keywordIndex]] = baseParagraphFormat[rightIndentProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(beforeSpacingProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(beforeSpacingProperty[this.keywordIndex])) {
                paragraphFormat[beforeSpacingProperty[this.keywordIndex]] = baseParagraphFormat[beforeSpacingProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(afterSpacingProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(afterSpacingProperty[this.keywordIndex])) {
                paragraphFormat[afterSpacingProperty[this.keywordIndex]] = baseParagraphFormat[afterSpacingProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(lineSpacingProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(lineSpacingProperty[this.keywordIndex])) {
                paragraphFormat[lineSpacingProperty[this.keywordIndex]] = baseParagraphFormat[lineSpacingProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(lineSpacingTypeProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(lineSpacingTypeProperty[this.keywordIndex])) {
                paragraphFormat[lineSpacingTypeProperty[this.keywordIndex]] = baseParagraphFormat[lineSpacingTypeProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(textAlignmentProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(textAlignmentProperty[this.keywordIndex])) {
                paragraphFormat[textAlignmentProperty[this.keywordIndex]] = baseParagraphFormat[textAlignmentProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(outlineLevelProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(outlineLevelProperty[this.keywordIndex])) {
                paragraphFormat[outlineLevelProperty[this.keywordIndex]] = baseParagraphFormat[outlineLevelProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(contextualSpacingProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(contextualSpacingProperty[this.keywordIndex])) {
                paragraphFormat[contextualSpacingProperty[this.keywordIndex]] = baseParagraphFormat[contextualSpacingProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(keepWithNextProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(keepWithNextProperty[this.keywordIndex])) {
                paragraphFormat[keepWithNextProperty[this.keywordIndex]] = baseParagraphFormat[keepWithNextProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(keepLinesTogetherProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(keepLinesTogetherProperty[this.keywordIndex])) {
                paragraphFormat[keepLinesTogetherProperty[this.keywordIndex]] = baseParagraphFormat[keepLinesTogetherProperty[this.keywordIndex]];
            }
            if (!paragraphFormat.hasOwnProperty(widowControlProperty[this.keywordIndex])
                && baseParagraphFormat.hasOwnProperty(widowControlProperty[this.keywordIndex])) {
                paragraphFormat[widowControlProperty[this.keywordIndex]] = baseParagraphFormat[widowControlProperty[this.keywordIndex]];
            }
        }
    };
    SfdtReader.prototype.getStyle = function (name, data) {
        for (var i = 0; i < data[stylesProperty[this.keywordIndex]].length; i++) {
            if (data[stylesProperty[this.keywordIndex]][i][nameProperty[this.keywordIndex]] === name) {
                return data[stylesProperty[this.keywordIndex]][i];
            }
        }
        return undefined;
    };
    SfdtReader.prototype.parseAbstractList = function (data, abstractLists) {
        for (var i = 0; i < data[abstractListsProperty[this.keywordIndex]].length; i++) {
            var abstractList = new WAbstractList();
            var abstract = data[abstractListsProperty[this.keywordIndex]][i];
            if (!isNullOrUndefined(abstract)) {
                if (!isNullOrUndefined(abstract[abstractListIdProperty[this.keywordIndex]])) {
                    abstractList.abstractListId = abstract[abstractListIdProperty[this.keywordIndex]];
                }
                if (!isNullOrUndefined(abstract[nsidProperty])) {
                    abstractList.nsid = abstract[nsidProperty];
                }
                if (!isNullOrUndefined(abstract[levelsProperty[this.keywordIndex]])) {
                    for (var j = 0; j < abstract[levelsProperty[this.keywordIndex]].length; j++) {
                        var level = abstract[levelsProperty[this.keywordIndex]][j];
                        if (!isNullOrUndefined(level)) {
                            var listLevel = this.parseListLevel(level, abstractList);
                            abstractList.levels.push(listLevel);
                        }
                    }
                }
            }
            abstractLists.push(abstractList);
        }
    };
    SfdtReader.prototype.parseListLevel = function (data, owner) {
        var listLevel = new WListLevel(owner);
        if (this.getListLevelPattern(data[listLevelPatternProperty[this.keywordIndex]]) === 'Bullet') {
            listLevel.listLevelPattern = 'Bullet';
            listLevel.numberFormat = !isNullOrUndefined(data[numberFormatProperty[this.keywordIndex]]) ? data[numberFormatProperty[this.keywordIndex]] : '';
        }
        else {
            listLevel.listLevelPattern = this.getListLevelPattern(data[listLevelPatternProperty[this.keywordIndex]]);
            listLevel.startAt = data[startAtProperty[this.keywordIndex]];
            listLevel.numberFormat = !isNullOrUndefined(data[numberFormatProperty[this.keywordIndex]]) ? data[numberFormatProperty[this.keywordIndex]] : '';
            if (data[restartLevelProperty[this.keywordIndex]] >= 0) {
                listLevel.restartLevel = data[restartLevelProperty[this.keywordIndex]];
            }
            else {
                listLevel.restartLevel = data[levelNumberProperty[this.keywordIndex]];
            }
        }
        listLevel.paraStyleName = !isNullOrUndefined(data[paraStyleNameProperty[this.keywordIndex]]) ? data[paraStyleNameProperty[this.keywordIndex]] : '';
        listLevel.isLegalStyleNumbering = !isNullOrUndefined(data[isLegalStyleNumberingProperty[this.keywordIndex]]) ? HelperMethods.parseBoolValue(data[isLegalStyleNumberingProperty[this.keywordIndex]]) : false;
        listLevel.followCharacter = this.getFollowCharacterType(data[followCharacterProperty[this.keywordIndex]]);
        this.parseCharacterFormat(this.keywordIndex, data[characterFormatProperty[this.keywordIndex]], listLevel.characterFormat);
        this.parseParagraphFormat(this.keywordIndex, data[paragraphFormatProperty[this.keywordIndex]], listLevel.paragraphFormat);
        return listLevel;
    };
    SfdtReader.prototype.parseList = function (data, listCollection) {
        for (var i = 0; i < data[listsProperty[this.keywordIndex]].length; i++) {
            var list = new WList();
            var lists = data[listsProperty[this.keywordIndex]][i];
            if (!isNullOrUndefined(lists[abstractListIdProperty[this.keywordIndex]])) {
                list.abstractListId = lists[abstractListIdProperty[this.keywordIndex]];
                list.abstractList = this.documentHelper.getAbstractListById(lists[abstractListIdProperty[this.keywordIndex]]);
            }
            listCollection.push(list);
            if (!isNullOrUndefined(lists[listIdProperty[this.keywordIndex]])) {
                list.listId = lists[listIdProperty[this.keywordIndex]];
            }
            if (!isNullOrUndefined(lists[nsidProperty])) {
                list.nsid = lists[nsidProperty];
            }
            else {
                list.nsid = list.abstractList.nsid;
            }
            if (lists.hasOwnProperty(levelOverridesProperty[this.keywordIndex])) {
                this.parseLevelOverride(lists[levelOverridesProperty[this.keywordIndex]], list);
            }
        }
    };
    SfdtReader.prototype.parseLevelOverride = function (data, list) {
        if (isNullOrUndefined(data)) {
            return;
        }
        for (var i = 0; i < data.length; i++) {
            var levelOverrides = new WLevelOverride();
            var levelOverride = data[i];
            levelOverrides.startAt = levelOverride[startAtProperty[this.keywordIndex]];
            levelOverrides.levelNumber = levelOverride[levelNumberProperty[this.keywordIndex]];
            if (!isNullOrUndefined(levelOverride[overrideListLevelProperty[this.keywordIndex]])) {
                levelOverrides.overrideListLevel = this.parseListLevel(levelOverride[overrideListLevelProperty[this.keywordIndex]], levelOverrides);
            }
            list.levelOverrides.push(levelOverrides);
        }
    };
    SfdtReader.prototype.parseSections = function (data, sections) {
        for (var i = 0; i < data.length; i++) {
            var section = new BodyWidget();
            section.sectionFormat = new WSectionFormat(section);
            section.index = i;
            var item = data[i];
            var breakCode = '';
            var nextItem = data[i + 1];
            var sectionFormat = nextItem && nextItem[sectionFormatProperty[this.keywordIndex]] ? nextItem[sectionFormatProperty[this.keywordIndex]] : undefined;
            breakCode = sectionFormat && sectionFormat[breakCodeProperty[this.keywordIndex]] ? sectionFormat[breakCodeProperty[this.keywordIndex]] : 'NewPage';
            if (!isNullOrUndefined(item[sectionFormatProperty[this.keywordIndex]])) {
                this.parseSectionFormat(this.keywordIndex, item[sectionFormatProperty[this.keywordIndex]], section.sectionFormat);
            }
            if (isNullOrUndefined(item[headersFootersProperty[this.keywordIndex]])) {
                item[headersFootersProperty[this.keywordIndex]] = {};
            }
            this.documentHelper.headersFooters.push(this.parseHeaderFooter(item[headersFootersProperty[this.keywordIndex]], this.documentHelper.headersFooters));
            this.isParseHeader = false;
            this.parseTextBody(item[blocksProperty[this.keywordIndex]], section, i + 1 < data.length, breakCode);
            for (var i_1 = 0; i_1 < section.childWidgets.length; i_1++) {
                section.childWidgets[i_1].containerWidget = section;
            }
            sections.push(section);
        }
    };
    SfdtReader.prototype.parseHeaderFooter = function (data, headersFooters) {
        this.isParseHeader = true;
        var hfs = {};
        if (!isNullOrUndefined(data[headerProperty[this.keywordIndex]])) {
            var oddHeader = new HeaderFooterWidget('OddHeader');
            hfs[0] = oddHeader;
            this.parseTextBody(data[headerProperty[this.keywordIndex]][blocksProperty[this.keywordIndex]], oddHeader);
        }
        if (!isNullOrUndefined(data[footerProperty[this.keywordIndex]])) {
            var oddFooter = new HeaderFooterWidget('OddFooter');
            hfs[1] = oddFooter;
            this.parseTextBody(data[footerProperty[this.keywordIndex]][blocksProperty[this.keywordIndex]], oddFooter);
        }
        if (!isNullOrUndefined(data[evenHeaderProperty[this.keywordIndex]])) {
            var evenHeader = new HeaderFooterWidget('EvenHeader');
            hfs[2] = evenHeader;
            this.parseTextBody(data[evenHeaderProperty[this.keywordIndex]][blocksProperty[this.keywordIndex]], evenHeader);
        }
        if (!isNullOrUndefined(data[evenFooterProperty[this.keywordIndex]])) {
            var evenFooter = new HeaderFooterWidget('EvenFooter');
            hfs[3] = evenFooter;
            this.parseTextBody(data[evenFooterProperty[this.keywordIndex]][blocksProperty[this.keywordIndex]], evenFooter);
        }
        if (!isNullOrUndefined(data[firstPageHeaderProperty[this.keywordIndex]])) {
            var firstPageHeader = new HeaderFooterWidget('FirstPageHeader');
            hfs[4] = firstPageHeader;
            this.parseTextBody(data[firstPageHeaderProperty[this.keywordIndex]][blocksProperty[this.keywordIndex]], firstPageHeader);
        }
        if (!isNullOrUndefined(data[firstPageFooterProperty[this.keywordIndex]])) {
            var firstPageFooter = new HeaderFooterWidget('FirstPageFooter');
            hfs[5] = firstPageFooter;
            this.parseTextBody(data[firstPageFooterProperty[this.keywordIndex]][blocksProperty[this.keywordIndex]], firstPageFooter);
        }
        return hfs;
    };
    SfdtReader.prototype.parseTextBody = function (data, section, isSectionBreak, breakCode) {
        this.parseBody(data, section.childWidgets, section, isSectionBreak, undefined, undefined, breakCode);
    };
    SfdtReader.prototype.addCustomStyles = function (data) {
        if (!isNullOrUndefined(data[stylesProperty[this.keywordIndex]])) {
            for (var i = 0; i < data[stylesProperty[this.keywordIndex]].length; i++) {
                var style = this.documentHelper.styles.findByName(data[stylesProperty[this.keywordIndex]][i][nameProperty[this.keywordIndex]]);
                if (style === undefined) {
                    this.parseStyle(data, data[stylesProperty[this.keywordIndex]][i], this.documentHelper.styles);
                }
            }
        }
    };
    SfdtReader.prototype.parseBody = function (data, blocks, container, isSectionBreak, contentControlProperties, styles, breakCode, isFootnoteEndnote) {
        if (!isNullOrUndefined(data)) {
            for (var i = 0; i < data.length; i++) {
                var block = data[i];
                var hasValidElmts = false;
                if (block.hasOwnProperty(inlinesProperty[this.keywordIndex])) {
                    var writeInlineFormat = false;
                    //writeInlineFormat = this.isPasting && i === data.length - 1;
                    var paragraph = new ParagraphWidget();
                    paragraph.characterFormat = new WCharacterFormat(paragraph);
                    paragraph.paragraphFormat = new WParagraphFormat(paragraph);
                    if (block[inlinesProperty[this.keywordIndex]].length > 0) {
                        hasValidElmts = this.parseParagraph(block[inlinesProperty[this.keywordIndex]], paragraph, writeInlineFormat, undefined, isFootnoteEndnote && i === 0);
                    }
                    if (!(isSectionBreak && block === data[data.length - 1] && block[inlinesProperty[this.keywordIndex]].length === 0 && !hasValidElmts)) {
                        this.parseCharacterFormat(this.keywordIndex, block[characterFormatProperty[this.keywordIndex]], paragraph.characterFormat);
                        this.parseParagraphFormat(this.keywordIndex, block[paragraphFormatProperty[this.keywordIndex]], paragraph.paragraphFormat);
                        var styleObj = void 0;
                        var styleName = 'Normal';
                        var isParaHasStyleName = false;
                        if (!isNullOrUndefined(block[paragraphFormatProperty[this.keywordIndex]]) && !isNullOrUndefined(block[paragraphFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]])) {
                            //Default value to link style object.
                            styleName = block[paragraphFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]];
                            isParaHasStyleName = true;
                        }
                        styleObj = this.documentHelper.styles.findByName(styleName, 'Paragraph');
                        if (!isNullOrUndefined(styleObj)) {
                            // The below lines are disabled because they cause a break for this task: 870732 
                            // if (this.isPaste && styles && isParaHasStyleName) {
                            //     for (let j = 0; j < styles.length; j++) {
                            //         if (styles[j][nameProperty[this.keywordIndex]] === styleName) {
                            //             var fontColor = styles[j][characterFormatProperty[this.keywordIndex]];
                            //             if (isNullOrUndefined(fontColor) || fontColor[fontColorProperty[this.keywordIndex]] !== (styleObj as WCharacterStyle).characterFormat.fontColor) {
                            //                 const charFormat: WCharacterFormat = new WCharacterFormat();
                            //                 this.parseCharacterFormat(this.keywordIndex, styles[j][characterFormatProperty[this.keywordIndex]], charFormat);
                            //                 (styleObj as WCharacterStyle).characterFormat.copyFormat(charFormat);
                            //                 break;
                            //             }
                            //         }
                            //     }
                            // }
                            paragraph.paragraphFormat.applyStyle(styleObj);
                        }
                        blocks.push(paragraph);
                    }
                    else if (isSectionBreak && data.length === 1) {
                        blocks.push(paragraph);
                    }
                    else {
                        // If section last paragraph is empty then we need to layout the paragraph in the previous widget which is handled similar to MS word.
                        paragraph.isSectionBreak = true;
                        blocks.push(paragraph);
                    }
                    paragraph.index = blocks.length - 1;
                    paragraph.containerWidget = container;
                }
                else if (block.hasOwnProperty(rowsProperty[this.keywordIndex])) {
                    this.parseTable(block, blocks, blocks.length, container);
                }
                else if (block.hasOwnProperty(contentControlPropertiesProperty[this.keywordIndex])) {
                    var blockStartContentControl = new ContentControl('Block');
                    var blockEndContentControl = new ContentControl('Block');
                    this.parseContentControlProperties(block[contentControlPropertiesProperty[this.keywordIndex]], blockStartContentControl.contentControlProperties);
                    blockEndContentControl.contentControlProperties = blockStartContentControl.contentControlProperties;
                    blockStartContentControl.type = 0;
                    blockEndContentControl.type = 1;
                    this.parseBody(block[blocksProperty[this.keywordIndex]], blocks, container, isSectionBreak, blockStartContentControl.contentControlProperties);
                    for (var j = 0; j < 2; j++) {
                        var para = (blocks.length < block[blocksProperty[this.keywordIndex]].length) ? blocks[0] : j === 0 ? blocks[blocks.length - block[blocksProperty[this.keywordIndex]].length] : blocks[blocks.length - 1];
                        var blockWidget = void 0;
                        if (para instanceof ParagraphWidget) {
                            blockWidget = para;
                        }
                        else if (para instanceof TableWidget) {
                            if (j === 0) {
                                blockWidget = para.firstChild.firstChild.firstChild;
                            }
                            else {
                                var cell = para.lastChild.lastChild;
                                blockWidget = cell.lastChild;
                            }
                        }
                        if (!isNullOrUndefined(blockWidget) && blockWidget.childWidgets.length === 0) {
                            var lineWidget = new LineWidget(blockWidget);
                            blockWidget.childWidgets.push(lineWidget);
                        }
                        if (j === 0) {
                            blockWidget.firstChild.children.splice(0, 0, blockStartContentControl);
                            blockStartContentControl.line = blockWidget.firstChild;
                        }
                        else {
                            blockWidget.lastChild.children.push(blockEndContentControl);
                            blockEndContentControl.line = blockWidget.lastChild;
                        }
                    }
                }
                if (!isNullOrUndefined(contentControlProperties)) {
                    blocks[blocks.length - 1].contentControlProperties = contentControlProperties;
                }
            }
        }
    };
    SfdtReader.prototype.parseTable = function (block, blocks, index, section) {
        var table = new TableWidget();
        table.index = index;
        if (!isNullOrUndefined(block[tableFormatProperty[this.keywordIndex]])) {
            this.parseTableFormat(block[tableFormatProperty[this.keywordIndex]], table.tableFormat, this.keywordIndex);
        }
        table.tableFormat.title = block[titleProperty[this.keywordIndex]];
        table.tableFormat.description = block[descriptionProperty[this.keywordIndex]];
        this.parseTablePositioning(block, table);
        for (var i = 0; i < block[rowsProperty[this.keywordIndex]].length; i++) {
            var row = new TableRowWidget();
            row.rowFormat = new WRowFormat(row);
            var tableRow = block[rowsProperty[this.keywordIndex]][i];
            if (!isNullOrUndefined(tableRow[contentControlPropertiesProperty[this.keywordIndex]])) {
                row.contentControlProperties = new ContentControlProperties('Row');
                this.parseContentControlProperties(tableRow[contentControlPropertiesProperty[this.keywordIndex]], row.contentControlProperties);
            }
            if (tableRow.hasOwnProperty(rowFormatProperty[this.keywordIndex])) {
                this.parseRowFormat(tableRow[rowFormatProperty[this.keywordIndex]], row.rowFormat, this.keywordIndex);
                row.index = i;
                for (var j = 0; j < tableRow[cellsProperty[this.keywordIndex]].length; j++) {
                    var cell = new TableCellWidget();
                    cell.cellFormat = new WCellFormat(cell);
                    var tableCell = tableRow[cellsProperty[this.keywordIndex]][j];
                    if (!isNullOrUndefined(tableCell[contentControlPropertiesProperty[this.keywordIndex]])) {
                        cell.contentControlProperties = new ContentControlProperties('Cell');
                        this.parseContentControlProperties(tableCell[contentControlPropertiesProperty[this.keywordIndex]], cell.contentControlProperties);
                    }
                    row.childWidgets.push(cell);
                    cell.containerWidget = row;
                    cell.index = j;
                    cell.rowIndex = i;
                    cell.columnIndex = j;
                    if (tableCell.hasOwnProperty(cellFormatProperty[this.keywordIndex])) {
                        this.parseCellFormat(tableCell[cellFormatProperty[this.keywordIndex]], cell.cellFormat, this.keywordIndex);
                    }
                    var item = tableCell[blocksProperty[this.keywordIndex]];
                    for (var k = 0; k < item.length; k++) {
                        if (item[k].hasOwnProperty([rowsProperty[this.keywordIndex]])) {
                            table.isContainInsideTable = true;
                        }
                    }
                    this.isPageBreakInsideTable = true;
                    this.parseTextBody(tableCell[blocksProperty[this.keywordIndex]], cell, false);
                    if (!isNullOrUndefined(cell.contentControlProperties)) {
                        var cellStartContentControl = new ContentControl('Cell');
                        var cellEndContentControl = new ContentControl('Cell');
                        cellStartContentControl.contentControlProperties = cell.contentControlProperties;
                        cellEndContentControl.contentControlProperties = cell.contentControlProperties;
                        cellStartContentControl.type = 0;
                        cellEndContentControl.type = 1;
                        if (cell.firstChild.childWidgets.length === 0) {
                            var lineWidget = new LineWidget(cell.firstChild);
                            cell.firstChild.childWidgets.push(lineWidget);
                        }
                        cellStartContentControl.line = cell.firstChild.firstChild;
                        cell.firstChild.firstChild.children.splice(0, 0, cellStartContentControl);
                        if (cell.lastChild.childWidgets.length === 0) {
                            var lineWidget = new LineWidget(cell.lastChild);
                            cell.lastChild.childWidgets.push(lineWidget);
                        }
                        cellEndContentControl.line = cell.lastChild.lastChild;
                        cell.lastChild.lastChild.children.push(cellEndContentControl);
                    }
                    if (!isNullOrUndefined(row.contentControlProperties)) {
                        if (row.firstChild === cell) {
                            var rowStartContentControl = new ContentControl('Row');
                            rowStartContentControl.contentControlProperties = row.contentControlProperties;
                            rowStartContentControl.type = 0;
                            if (cell.firstChild.childWidgets.length === 0) {
                                var lineWidget = new LineWidget(cell.firstChild);
                                cell.firstChild.childWidgets.push(lineWidget);
                            }
                            rowStartContentControl.line = cell.firstChild.firstChild;
                            cell.firstChild.firstChild.children.splice(0, 0, rowStartContentControl);
                        }
                        else if (row.lastChild === cell) {
                            var rowEndContentControl = new ContentControl('Row');
                            rowEndContentControl.contentControlProperties = row.contentControlProperties;
                            rowEndContentControl.type = 1;
                            if (cell.lastChild.childWidgets.length === 0) {
                                var lineWidget = new LineWidget(cell.lastChild);
                                cell.lastChild.childWidgets.push(lineWidget);
                            }
                            rowEndContentControl.line = cell.lastChild.lastChild;
                            cell.lastChild.lastChild.children.push(rowEndContentControl);
                        }
                    }
                    this.isPageBreakInsideTable = false;
                }
            }
            if (row.childWidgets.length > 0) {
                table.childWidgets.push(row);
                row.containerWidget = table;
            }
        }
        table.containerWidget = section;
        if (table.childWidgets.length > 0) {
            blocks.push(table);
        }
        table.isGridUpdated = false;
    };
    SfdtReader.prototype.parseTablePositioning = function (block, table) {
        table.wrapTextAround = !isNullOrUndefined(block[wrapTextAroundProperty[this.keywordIndex]]) ? HelperMethods.parseBoolValue(block[wrapTextAroundProperty[this.keywordIndex]]) : false;
        if (table.wrapTextAround) {
            table.positioning = new TablePosition();
            table.positioning.allowOverlap = HelperMethods.parseBoolValue(block[positioningProperty[this.keywordIndex]][allowOverlapProperty[this.keywordIndex]]);
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][distanceBottomProperty[this.keywordIndex]])) {
                table.positioning.distanceBottom = HelperMethods.convertPointToPixel(block[positioningProperty[this.keywordIndex]][distanceBottomProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][distanceLeftProperty[this.keywordIndex]])) {
                table.positioning.distanceLeft = HelperMethods.convertPointToPixel(block[positioningProperty[this.keywordIndex]][distanceLeftProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][distanceRightProperty[this.keywordIndex]])) {
                table.positioning.distanceRight = HelperMethods.convertPointToPixel(block[positioningProperty[this.keywordIndex]][distanceRightProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][distanceTopProperty[this.keywordIndex]])) {
                table.positioning.distanceTop = HelperMethods.convertPointToPixel(block[positioningProperty[this.keywordIndex]][distanceTopProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]])) {
                table.positioning.verticalAlignment = this.getTableVerticalPosition(block[positioningProperty[this.keywordIndex]][verticalAlignmentProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][verticalOriginProperty[this.keywordIndex]])) {
                table.positioning.verticalOrigin = this.getTableVerticalRelation(block[positioningProperty[this.keywordIndex]][verticalOriginProperty[this.keywordIndex]]);
            }
            table.positioning.verticalPosition = block[positioningProperty[this.keywordIndex]][verticalPositionProperty[this.keywordIndex]];
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]])) {
                table.positioning.horizontalAlignment = this.getTableHorizontalPosition(block[positioningProperty[this.keywordIndex]][horizontalAlignmentProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(block[positioningProperty[this.keywordIndex]][horizontalOriginProperty[this.keywordIndex]])) {
                table.positioning.horizontalOrigin = this.getTableHorizontalRelation(block[positioningProperty[this.keywordIndex]][horizontalOriginProperty[this.keywordIndex]]);
            }
            table.positioning.horizontalPosition = block[positioningProperty[this.keywordIndex]][horizontalPositionProperty[this.keywordIndex]];
        }
    };
    SfdtReader.prototype.parseRowGridValues = function (data, rowFormat, keyIndex) {
        if (!isNullOrUndefined(data[gridBeforeProperty[keyIndex]])) {
            rowFormat.gridBefore = data[gridBeforeProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[gridBeforeWidthProperty[keyIndex]])) {
            rowFormat.gridBeforeWidth = data[gridBeforeWidthProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[gridBeforeWidthTypeProperty[keyIndex]])) {
            rowFormat.gridBeforeWidthType = this.getWidthType(data[gridBeforeWidthTypeProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[gridAfterProperty[keyIndex]])) {
            rowFormat.gridAfter = data[gridAfterProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[gridAfterWidthProperty[keyIndex]])) {
            rowFormat.gridAfterWidth = data[gridAfterWidthProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[gridAfterWidthTypeProperty[keyIndex]])) {
            rowFormat.gridAfterWidthType = this.getWidthType(data[gridAfterWidthTypeProperty[keyIndex]]);
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseContentControlProperties = function (wContentControlProperties, contentControlProperties, keywordIndex) {
        if (isNullOrUndefined(keywordIndex)) {
            keywordIndex = this.keywordIndex;
        }
        if (!isNullOrUndefined(wContentControlProperties[lockContentControlProperty[keywordIndex]])) {
            contentControlProperties.lockContentControl = HelperMethods.parseBoolValue(wContentControlProperties[lockContentControlProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(wContentControlProperties[lockContentsProperty[keywordIndex]])) {
            contentControlProperties.lockContents = HelperMethods.parseBoolValue(wContentControlProperties[lockContentsProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(wContentControlProperties[tagProperty[keywordIndex]])) {
            contentControlProperties.tag = wContentControlProperties[tagProperty[keywordIndex]];
        }
        else {
            //Updating for undo/redo content control properties
            contentControlProperties.tag = undefined;
        }
        if (!isNullOrUndefined(wContentControlProperties[colorProperty[keywordIndex]])) {
            contentControlProperties.color = wContentControlProperties[colorProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(wContentControlProperties[titleProperty[keywordIndex]])) {
            contentControlProperties.title = wContentControlProperties[titleProperty[keywordIndex]];
        }
        else {
            //Updating for undo/redo content control properties
            contentControlProperties.title = undefined;
        }
        if (!isNullOrUndefined(wContentControlProperties[appearanceProperty[keywordIndex]])) {
            contentControlProperties.appearance = this.getContentControlAppearance(wContentControlProperties[appearanceProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(wContentControlProperties[typeProperty[keywordIndex]])) {
            contentControlProperties.type = this.getContentControlType(wContentControlProperties[typeProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(wContentControlProperties[hasPlaceHolderTextProperty[keywordIndex]])) {
            contentControlProperties.hasPlaceHolderText = HelperMethods.parseBoolValue(wContentControlProperties[hasPlaceHolderTextProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(wContentControlProperties[multiLineProperty[keywordIndex]])) {
            contentControlProperties.multiline = HelperMethods.parseBoolValue(wContentControlProperties[multiLineProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(wContentControlProperties[isTemporaryProperty[keywordIndex]])) {
            contentControlProperties.isTemporary = HelperMethods.parseBoolValue(wContentControlProperties[isTemporaryProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(wContentControlProperties[characterFormatProperty[keywordIndex]])) {
            this.parseCharacterFormat(keywordIndex, wContentControlProperties[characterFormatProperty[keywordIndex]], contentControlProperties.characterFormat);
        }
        if (contentControlProperties.type === 'CheckBox') {
            if (!isNullOrUndefined(wContentControlProperties[isCheckedProperty[keywordIndex]])) {
                contentControlProperties.isChecked = HelperMethods.parseBoolValue(wContentControlProperties[isCheckedProperty[keywordIndex]]);
            }
            if (!isNullOrUndefined(wContentControlProperties[uncheckedStateProperty[keywordIndex]])) {
                contentControlProperties.uncheckedState = new CheckBoxState();
                contentControlProperties.uncheckedState.font = wContentControlProperties[uncheckedStateProperty[keywordIndex]][fontProperty[keywordIndex]];
                contentControlProperties.uncheckedState.value = wContentControlProperties[uncheckedStateProperty[keywordIndex]][valueProperty[keywordIndex]];
            }
            if (!isNullOrUndefined(wContentControlProperties[checkedStateProperty[keywordIndex]])) {
                contentControlProperties.checkedState = new CheckBoxState();
                contentControlProperties.checkedState.font = wContentControlProperties[checkedStateProperty[keywordIndex]][fontProperty[keywordIndex]];
                contentControlProperties.checkedState.value = wContentControlProperties[checkedStateProperty[keywordIndex]][valueProperty[keywordIndex]];
            }
        }
        else if (contentControlProperties.type === 'Date') {
            if (!isNullOrUndefined(wContentControlProperties[dateCalendarTypeProperty[keywordIndex]])) {
                contentControlProperties.dateCalendarType = this.getDateCalendarType(wContentControlProperties[dateCalendarTypeProperty[keywordIndex]]);
            }
            if (!isNullOrUndefined(wContentControlProperties[dateStorageFormatProperty[keywordIndex]])) {
                contentControlProperties.dateStorageFormat = this.getDateStorageFormat(wContentControlProperties[dateStorageFormatProperty[keywordIndex]]);
            }
            if (!isNullOrUndefined(wContentControlProperties[dateDisplayLocaleProperty[keywordIndex]])) {
                contentControlProperties.dateDisplayLocale = wContentControlProperties[dateDisplayLocaleProperty[keywordIndex]];
            }
            if (!isNullOrUndefined(wContentControlProperties[dateDisplayFormatProperty[keywordIndex]])) {
                contentControlProperties.dateDisplayFormat = wContentControlProperties[dateDisplayFormatProperty[keywordIndex]];
            }
        }
        else if (contentControlProperties.type === 'ComboBox' || contentControlProperties.type === 'DropDownList') {
            if (!isNullOrUndefined(wContentControlProperties[contentControlListItemsProperty[keywordIndex]])) {
                //Updating for undo/redo content control properties
                contentControlProperties.contentControlListItems = [];
                for (var i = 0; i < wContentControlProperties[contentControlListItemsProperty[keywordIndex]].length; i++) {
                    var contentControlListItem = new ContentControlListItems();
                    contentControlListItem.displayText = wContentControlProperties[contentControlListItemsProperty[keywordIndex]][i][displayTextProperty[keywordIndex]];
                    contentControlListItem.value = wContentControlProperties[contentControlListItemsProperty[keywordIndex]][i][valueProperty[keywordIndex]];
                    contentControlProperties.contentControlListItems.push(contentControlListItem);
                }
            }
        }
        if (!isNullOrUndefined(wContentControlProperties[xmlMappingProperty[keywordIndex]])) {
            contentControlProperties.xmlMapping = new XmlMapping();
            contentControlProperties.xmlMapping.isMapped = HelperMethods.parseBoolValue(wContentControlProperties[xmlMappingProperty[keywordIndex]][isMappedProperty[keywordIndex]]);
            contentControlProperties.xmlMapping.isWordMl = HelperMethods.parseBoolValue(wContentControlProperties[xmlMappingProperty[keywordIndex]][isWordMlProperty[keywordIndex]]);
            if (!isNullOrUndefined(wContentControlProperties[xmlMappingProperty[keywordIndex]][prefixMappingProperty[keywordIndex]])) {
                contentControlProperties.xmlMapping.prefixMapping = wContentControlProperties[xmlMappingProperty[keywordIndex]][prefixMappingProperty[keywordIndex]];
            }
            contentControlProperties.xmlMapping.xPath = wContentControlProperties[xmlMappingProperty[keywordIndex]][xPathProperty[keywordIndex]];
            contentControlProperties.xmlMapping.storeItemId = wContentControlProperties[xmlMappingProperty[keywordIndex]][storeItemIdProperty[keywordIndex]];
            if (!isNullOrUndefined(wContentControlProperties[xmlMappingProperty[keywordIndex]][customXmlPartProperty[keywordIndex]])) {
                contentControlProperties.xmlMapping.customXmlPart = new CustomXmlPart();
                contentControlProperties.xmlMapping.customXmlPart.id = wContentControlProperties[xmlMappingProperty[keywordIndex]][customXmlPartProperty[keywordIndex]][idProperty[keywordIndex]];
                contentControlProperties.xmlMapping.customXmlPart.xml = wContentControlProperties[xmlMappingProperty[keywordIndex]][customXmlPartProperty[keywordIndex]][xmlProperty[keywordIndex]];
            }
        }
    };
    SfdtReader.prototype.parseSymbol = function (fieldCode, lineWidget) {
        var code = fieldCode.split(' ');
        var indexOf = code.indexOf('SYMBOL');
        if (indexOf !== -1) {
            var characterCode = code[indexOf + 1];
            var textElement = new TextElementBox();
            textElement.characterFormat = new WCharacterFormat(textElement);
            textElement.text = String.fromCharCode(parseInt(characterCode));
            var fontIndex = code.indexOf('\\f');
            if (fontIndex !== -1) {
                var fontName = "";
                for (var j = fontIndex + 1; j < code.length; j++) {
                    if (code[j] === '\\s') {
                        break;
                    }
                    fontName += code[j] + ' ';
                }
                if (fontName !== null) {
                    fontName = fontName.replace(/"/g, '');
                    fontName = fontName.trim();
                    textElement.characterFormat.fontFamily = fontName;
                }
            }
            var sizeIndex = code.indexOf('\\s');
            if (sizeIndex !== -1) {
                textElement.characterFormat.fontSize = parseInt(code[sizeIndex + 1]);
            }
            textElement.line = lineWidget;
            lineWidget.children.push(textElement);
        }
    };
    /* eslint-disable  */
    SfdtReader.prototype.parseParagraph = function (data, paragraph, writeInlineFormat, lineWidget, isFootnoteEndnote) {
        var _this = this;
        var isContentControl = false;
        if (isNullOrUndefined(lineWidget)) {
            lineWidget = new LineWidget(paragraph);
        }
        else {
            isContentControl = true;
        }
        var hasValidElmts = false;
        var revision;
        var trackChange = this.viewer.owner.enableTrackChanges;
        var count = 0;
        var isCreateTextEleBox = false;
        var isCreateField = false;
        var fieldCode = undefined;
        var _loop_1 = function (i) {
            var inline = data[i];
            isCreateTextEleBox = false;
            if (inline.hasOwnProperty([fieldTypeProperty[this_1.keywordIndex]])) {
                if (inline[fieldTypeProperty[this_1.keywordIndex]] === 2) {
                    count = i;
                }
                if (inline[fieldTypeProperty[this_1.keywordIndex]] === 1 && count + 1 === i) {
                    isCreateTextEleBox = true;
                    count = 0;
                }
            }
            if (isCreateTextEleBox && this_1.documentHelper.isPageField) {
                var textElement = new FieldTextElementBox();
                textElement.characterFormat = new WCharacterFormat(textElement);
                textElement.text = "";
                textElement.line = lineWidget;
                lineWidget.children.push(textElement);
                hasValidElmts = true;
                i--;
                return out_i_1 = i, "continue";
            }
            else if (isCreateTextEleBox && !isNullOrUndefined(fieldCode) && fieldCode.indexOf('SYMBOL') !== -1) {
                this_1.parseSymbol(fieldCode, lineWidget);
                fieldCode = undefined;
                isCreateTextEleBox = false;
            }
            if (inline.hasOwnProperty(textProperty[this_1.keywordIndex]) || inline.hasOwnProperty(breakClearTypeProperty[this_1.keywordIndex])) {
                var textElement = undefined;
                if (this_1.documentHelper.isPageField) {
                    textElement = new FieldTextElementBox();
                    textElement.fieldBegin = this_1.documentHelper.fieldStacks[this_1.documentHelper.fieldStacks.length - 1];
                }
                else if (inline[textProperty[this_1.keywordIndex]] === '\t') {
                    textElement = new TabElementBox();
                }
                else if (inline[textProperty[this_1.keywordIndex]] === '\f' && this_1.isPageBreakInsideTable) {
                    return out_i_1 = i, "continue";
                }
                else {
                    if (inline.hasOwnProperty(breakClearTypeProperty[this_1.keywordIndex])) {
                        textElement = new BreakElementBox();
                        textElement.breakClearType = this_1.getBreakClearType(inline[breakClearTypeProperty[this_1.keywordIndex]]);
                    }
                    else if (inline[textProperty[this_1.keywordIndex]] === '\u0002'
                        || (HelperMethods.checkTextFormat(inline[textProperty[this_1.keywordIndex]]) && lineWidget.children.length === 0 && i === 0 && isFootnoteEndnote)) {
                        textElement = new FootnoteEndnoteMarkerElementBox();
                    }
                    else {
                        textElement = new TextElementBox();
                        if ((inline[textProperty[this_1.keywordIndex]]).length === 0 && !isNullOrUndefined(inline[revisionIdsProperty[this_1.keywordIndex]])) {
                            return out_i_1 = i, "continue";
                        }
                    }
                }
                textElement.characterFormat = new WCharacterFormat(textElement);
                this_1.parseCharacterFormat(this_1.keywordIndex, inline[characterFormatProperty[this_1.keywordIndex]], textElement.characterFormat, writeInlineFormat);
                this_1.applyCharacterStyle(inline, textElement);
                textElement.text = textElement instanceof BreakElementBox ? "\v" : inline[textProperty[this_1.keywordIndex]];
                fieldCode = textElement.text;
                if (this_1.isHtmlPaste && (textElement instanceof TextElementBox || textElement instanceof BreakElementBox)) {
                    var previousElement = void 0;
                    if (lineWidget.children.length > 0) {
                        previousElement = lineWidget.children[lineWidget.children.length - 1];
                    }
                    // In html content, text bidi property is not present in the file level
                    // Hence bidi property is false for RTL content
                    // So, For html pasting we need to check and content and enable bidi to order the content similar to MS Word
                    if (this_1.documentHelper.textHelper.isRTLText(textElement.text)) {
                        textElement.characterFormat.bidi = true;
                        if (previousElement instanceof TextElementBox && previousElement.text === ' ') {
                            previousElement.characterFormat.bidi = true;
                        }
                    }
                    //If previous element is RTL element, the we need to enable bidi for space character
                    else if (textElement.text === ' ' && previousElement && previousElement.characterFormat.bidi) {
                        textElement.characterFormat.bidi = true;
                    }
                }
                if (this_1.documentHelper.owner.parser.isPaste && !(this_1.isCutPerformed)) {
                    if (!isNullOrUndefined(inline[revisionIdsProperty[this_1.keywordIndex]])) {
                        for (var j = 0; j < inline[revisionIdsProperty[this_1.keywordIndex]].length; j++) {
                            if (this_1.revisionCollection.containsKey(inline[revisionIdsProperty[this_1.keywordIndex]][j])) {
                                if (trackChange) {
                                    revision = this_1.revisionCollection.get(inline[revisionIdsProperty[this_1.keywordIndex]][j]);
                                }
                                if (!isNullOrUndefined(revision) && lineWidget.children.length > 0 && !isNullOrUndefined(lineWidget.children[i - 1].revisions[j]) && ((!trackChange) || (trackChange && (revision.revisionType === 'Deletion')))) {
                                    if (revision.revisionID === inline[revisionIdsProperty[this_1.keywordIndex]][j]) {
                                        inline[revisionIdsProperty[this_1.keywordIndex]][j] = lineWidget.children[i - 1].revisions[j].revisionID;
                                        this_1.checkAndApplyRevision(this_1.keywordIndex, inline, textElement);
                                        continue;
                                    }
                                }
                                if (!trackChange) {
                                    revision = this_1.documentHelper.revisionsInternal.get(inline[revisionIdsProperty[this_1.keywordIndex]][j]);
                                }
                                if (this_1.documentHelper.owner.editorModule.isRemoteAction) {
                                    this_1.documentHelper.owner.editorModule.insertRevision(textElement, revision.revisionType, revision.author, undefined, undefined, false, revision.revisionID);
                                }
                                else {
                                    this_1.documentHelper.owner.editorModule.insertRevision(textElement, revision.revisionType, revision.author, undefined, undefined, false);
                                }
                                inline[revisionIdsProperty[this_1.keywordIndex]][j] = textElement.revisions[j].revisionID;
                            }
                        }
                    }
                }
                else {
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, textElement);
                }
                textElement.line = lineWidget;
                // handling in case the previous element is bookmark with isAfterParagraph true
                var lineChildren = lineWidget.children;
                var lastIndex = lineChildren.length - 1;
                while (lineChildren.length > 0
                    && lineChildren[lastIndex] instanceof BookmarkElementBox
                    && !isNullOrUndefined(lineChildren[lastIndex].properties)
                    && lineChildren[lastIndex].properties['isAfterParagraphMark'] === true) {
                    lastIndex--;
                }
                if (lastIndex !== lineChildren.length - 1) {
                    lineChildren.splice(lastIndex + 1, 0, textElement);
                }
                else {
                    lineChildren.push(textElement);
                }
                if (textElement instanceof TextElementBox && textElement.text.length > 90) {
                    // Here, the text is split based on the maximum character length of 90.
                    HelperMethods.splitWordByMaxLength(textElement, lineWidget, true);
                }
                hasValidElmts = true;
            }
            else if (inline.hasOwnProperty(footnoteTypeProperty[this_1.keywordIndex])) {
                var footnoteElement = new FootnoteElementBox();
                footnoteElement.line = lineWidget;
                footnoteElement.footnoteType = this_1.getFootnoteType(inline[footnoteTypeProperty[this_1.keywordIndex]]);
                if (footnoteElement.footnoteType === 'Footnote') {
                    this_1.documentHelper.footnoteCollection.push(footnoteElement);
                }
                else {
                    this_1.documentHelper.endnoteCollection.push(footnoteElement);
                }
                footnoteElement.symbolCode = inline[symbolCodeProperty[this_1.keywordIndex]];
                footnoteElement.symbolFontName = inline[symbolFontNameProperty[this_1.keywordIndex]];
                footnoteElement.customMarker = inline[customMarkerProperty[this_1.keywordIndex]];
                footnoteElement.characterFormat = new WCharacterFormat(footnoteElement);
                this_1.parseCharacterFormat(this_1.keywordIndex, inline[characterFormatProperty[this_1.keywordIndex]], footnoteElement.characterFormat, writeInlineFormat);
                this_1.applyCharacterStyle(inline, footnoteElement);
                this_1.checkAndApplyRevision(this_1.keywordIndex, inline, footnoteElement);
                this_1.parseBody(inline[blocksProperty[this_1.keywordIndex]], footnoteElement.bodyWidget.childWidgets, footnoteElement.bodyWidget, false, undefined, undefined, undefined, true);
                lineWidget.children.push(footnoteElement);
                hasValidElmts = true;
            }
            else if (inline.hasOwnProperty(chartTypeProperty[this_1.keywordIndex])) {
                // chartPreservation
                if (this_1.documentHelper.owner.editorModule) {
                    this_1.documentHelper.owner.editorModule.chartType = true;
                }
                var chartElement = new ChartElementBox();
                chartElement.title = inline[chartTitleProperty[this_1.keywordIndex]];
                chartElement.type = inline[chartTypeProperty[this_1.keywordIndex]];
                chartElement.chartGapWidth = inline[gapWidthProperty[this_1.keywordIndex]];
                chartElement.chartOverlap = inline[overlapProperty[this_1.keywordIndex]];
                this_1.parseChartTitleArea(inline[chartTitleAreaProperty[this_1.keywordIndex]], chartElement.chartTitleArea);
                this_1.parseChartArea(inline[chartAreaProperty[this_1.keywordIndex]], chartElement.chartArea);
                this_1.parseChartArea(inline[plotAreaProperty[this_1.keywordIndex]], chartElement.chartPlotArea);
                this_1.parseChartLegend(inline[chartLegendProperty[this_1.keywordIndex]], chartElement.chartLegend);
                this_1.parseChartData(inline, chartElement);
                this_1.parseChartCategoryAxis(inline[chartPrimaryCategoryAxisProperty[this_1.keywordIndex]], chartElement.chartPrimaryCategoryAxis);
                this_1.parseChartCategoryAxis(inline[chartPrimaryValueAxisProperty[this_1.keywordIndex]], chartElement.chartPrimaryValueAxis);
                if (inline[chartDataTableProperty[this_1.keywordIndex]] != null) {
                    this_1.parseChartDataTable(inline[chartDataTableProperty[this_1.keywordIndex]], chartElement.chartDataTable);
                }
                chartElement.line = lineWidget;
                lineWidget.children.push(chartElement);
                chartElement.height = HelperMethods.convertPointToPixel(inline[heightProperty[this_1.keywordIndex]]);
                chartElement.width = HelperMethods.convertPointToPixel(inline[widthProperty[this_1.keywordIndex]]);
                var officeChart = new ChartComponent();
                officeChart.chartRender(inline, this_1.keywordIndex);
                chartElement.officeChart = officeChart;
                officeChart.chart.appendTo(chartElement.targetElement);
                hasValidElmts = true;
            }
            else if (inline.hasOwnProperty(imageStringProperty[this_1.keywordIndex])) {
                var image_1 = new ImageElementBox(HelperMethods.parseBoolValue(inline[isInlineImageProperty[this_1.keywordIndex]]));
                image_1.isMetaFile = HelperMethods.parseBoolValue(inline[isMetaFileProperty[this_1.keywordIndex]]);
                image_1.isCompressed = inline[isCompressedProperty[this_1.keywordIndex]];
                image_1.metaFileImageString = inline[metaFileImageStringProperty[this_1.keywordIndex]];
                image_1.characterFormat = new WCharacterFormat(image_1);
                image_1.line = lineWidget;
                this_1.checkAndApplyRevision(this_1.keywordIndex, inline, image_1);
                lineWidget.children.push(image_1);
                var imageString = HelperMethods.formatClippedString(inline[imageStringProperty[this_1.keywordIndex]]).formatClippedString;
                var isValidImage = this_1.validateImageUrl(imageString);
                if (!isValidImage) {
                    image_1.imageString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAgVBMVEX///8AAADgAADY2Njl5eVcXFxjY2NZWVl/f3+wsLCmpqb4+PiioqKpqam7u7vV1dX2uLj2wsLhFRXzpKT3vb30sbHhCwv74+P40dH+9vbkIyO2trbBwcHLy8tsbGycnJz529v4zMzrbGzlLS3qZmblNzfrdXXoRkbvi4vvgYHlHh7CZsBOAAADpUlEQVR4nO3da1faQBSF4ekAUQlUEFs14AXxVv7/D6yaQiZx5mSEYXF2ut+PNKzyyK5diYDmR9czx34AB49C/CjE759w3jvvWr15Tdgz3atXE54f++EcIArxoxA/CvGjED8K8aMQPwrxoxA/CvGLEeZ9jPJdhfk4GyCUjb3ECGE/Q6m/q3DwfudjP0ERZYN9hKdn2hvd3+0jHJz5/kBVuTk96bbQUEjhYR9ckiikUH8UUqg/CinUH4UU6o9CCvVHIYX6o5BC/VFIof4opFB/FFKoPwop1B+FFOqPQgrjyxfjVC38Lxk9tnAxGqZqdKtSOE4GHA5/fuNJpDCtcNHbv4VqYYqPLjgfUViPQgrjozA2CptRSGF8/59w+Wrt+rr1btNna1cPzg0wwuXavncxabnX7PfHYYXzlYARvlobQZyUR9mXm+1NMEK7SSLONgcVV9vb8IQXv4J3KSeKKlxXxNCzONkeYp8AV3p9UT1+P3FWHVAsq5thhGZSEb1DrSZq7dS5HUdoLiuBZ6jORG3tCwAkNJfCUJ2Jrqe1P0ESCkMNTdSACYNDDU7UoAkDQw1P1MAJvUMVJmrwhJ6hShM1gMIvQxUnahCFjaHKEzWQQneoxR95ogZTWBuqPFEDKnSHKk/UoArdoYoTNbDC5lBDEzW4QjMpYiZqgIXG/S76JhwHK5zVVipcnkIVuv/RW/HyFKhwYhuFr6NiCmdNoDBUSGFjovJQEYXuRN9ahwoorJ8uSZenPsMTNk+X2q6jwgm/ntHL11HhhL4zenmoYEL/Gb04VCxh6KKTNFQoYfiikzBUJKF00Sk8VCChfF00OFQcYdt10dBQYYRT5xn0n9G7Q0X8GfCzNNEyZ6iPgD/HlydaVg11DfhajJaJlm2HugIUrlomWrYZKuJKHz6vHhbSM/hROdRnxNe1meuXYvW0DB6+aflYrB7dlzDiCM3N1dVN6GDhMCDhjlHYjEIK46MwNgqbUUhhfJ/vA07wO8N1vw94ONo/3e/lTpVOYfc/UyG//ZmqW52fi/FuTNW3/lZ+eguF+qOQQv1RSKH+KKRQfxRSqD8KKdQfhRTqj0IK9UchhfqjkEL9UUih/iikUH8UUqg/CmXh6Hsv3jlK+wnvD/vgkrSHMMuyu1P9ZdmuwnycDQYn+svG3n9KEUKT9zHyf6+IEWJHIX4U4kchfhTiRyF+FOJHIX4U4kchfnVhijeZa6sunCf4ZdPamteEHY5C/CjEr/vCv0ec0g+AtS1QAAAAAElFTkSuQmCC';
                }
                else {
                    if (this_1.isPaste && !isNullOrUndefined(this_1.documentHelper.owner.editorModule.pasteImageIndex)) {
                        image_1.imageString = this_1.documentHelper.owner.editorModule.pasteImageIndex.get(inline[imageStringProperty[this_1.keywordIndex]]);
                        if (!isNullOrUndefined(inline[metaFileImageStringProperty[this_1.keywordIndex]])) {
                            image_1.metaFileImageString = this_1.documentHelper.owner.editorModule.pasteImageIndex.get(inline[metaFileImageStringProperty[this_1.keywordIndex]]);
                        }
                    }
                    else {
                        image_1.imageString = inline[imageStringProperty[this_1.keywordIndex]];
                    }
                }
                // Before 21.1 duplicate images are preserved as inline images with direct base64 string in the image string property. TO provide backward compatibility we are checking both the index based retrieval from images collections and inline image string.
                var imgStrValue = parseInt(inline[imageStringProperty[this_1.keywordIndex]]);
                if (imgStrValue.toString() === "NaN" ? true : false) {
                    this_1.documentHelper.addBase64StringInCollection(image_1);
                }
                image_1.width = HelperMethods.convertPointToPixel(inline[widthProperty[this_1.keywordIndex]]);
                image_1.height = HelperMethods.convertPointToPixel(inline[heightProperty[this_1.keywordIndex]]);
                if (!this_1.isContextBasedPaste) {
                    var imgStr = this_1.documentHelper.getImageString(image_1);
                    if (!isNullOrUndefined(imgStr) && (HelperMethods.startsWith(imgStr, 'http://') || HelperMethods.startsWith(imgStr, 'https://'))) {
                        // Generate fall back image for URL images.
                        image_1.element.crossOrigin = 'Anonymous';
                        this_1.viewer.documentHelper.getBase64(imgStr, image_1.width, image_1.height).then(function (imageUrlString) {
                            _this.viewer.documentHelper.images.get(parseInt(image_1.imageString))[1] = imageUrlString;
                            image_1.element.src = imageUrlString;
                        });
                    }
                    image_1.element.src = imgStr;
                }
                image_1.top = inline[topProperty[this_1.keywordIndex]];
                image_1.left = inline[leftProperty[this_1.keywordIndex]];
                image_1.bottom = inline[bottomProperty[this_1.keywordIndex]];
                image_1.right = inline[rightProperty[this_1.keywordIndex]];
                image_1.cropHeightScale = inline[getImageHeightProperty[this_1.keywordIndex]];
                image_1.cropWidthScale = inline[getImageWidthProperty[this_1.keywordIndex]];
                image_1.name = inline[nameProperty[this_1.keywordIndex]];
                image_1.alternateText = inline[alternativeTextProperty[this_1.keywordIndex]];
                image_1.title = inline[titleProperty[this_1.keywordIndex]];
                image_1.visible = HelperMethods.parseBoolValue(inline[visibleProperty[this_1.keywordIndex]]);
                image_1.widthScale = inline[widthScaleProperty[this_1.keywordIndex]];
                image_1.heightScale = inline[heightScaleProperty[this_1.keywordIndex]];
                image_1.verticalPosition = HelperMethods.convertPointToPixel(inline[verticalPositionProperty[this_1.keywordIndex]]);
                image_1.verticalOrigin = this_1.getVerticalOrigin(inline[verticalOriginProperty[this_1.keywordIndex]]);
                image_1.verticalAlignment = this_1.getShapeVerticalAlignment(inline[verticalAlignmentProperty[this_1.keywordIndex]]);
                image_1.horizontalPosition = HelperMethods.convertPointToPixel(inline[horizontalPositionProperty[this_1.keywordIndex]]);
                image_1.horizontalOrigin = this_1.getHorizontalOrigin(inline[horizontalOriginProperty[this_1.keywordIndex]]);
                image_1.horizontalAlignment = this_1.getShapeHorizontalAlignment(inline[horizontalAlignmentProperty[this_1.keywordIndex]]);
                image_1.allowOverlap = HelperMethods.parseBoolValue(inline[allowOverlapProperty[this_1.keywordIndex]]);
                if (!isNullOrUndefined(inline[textWrappingStyleProperty[this_1.keywordIndex]])) {
                    image_1.textWrappingStyle = this_1.getTextWrappingStyle(inline[textWrappingStyleProperty[this_1.keywordIndex]]);
                }
                if (!isNullOrUndefined(inline[textWrappingTypeProperty[this_1.keywordIndex]])) {
                    image_1.textWrappingType = this_1.getTextWrappingType(inline[textWrappingTypeProperty[this_1.keywordIndex]]);
                }
                image_1.isBelowText = HelperMethods.parseBoolValue(inline[belowTextProperty[this_1.keywordIndex]]);
                if (!isNullOrUndefined(inline[distanceBottomProperty[this_1.keywordIndex]])) {
                    image_1.distanceBottom = HelperMethods.convertPointToPixel(inline[distanceBottomProperty[this_1.keywordIndex]]);
                }
                if (!isNullOrUndefined(inline[distanceLeftProperty[this_1.keywordIndex]])) {
                    image_1.distanceLeft = HelperMethods.convertPointToPixel(inline[distanceLeftProperty[this_1.keywordIndex]]);
                }
                if (!isNullOrUndefined(inline[distanceRightProperty[this_1.keywordIndex]])) {
                    image_1.distanceRight = HelperMethods.convertPointToPixel(inline[distanceRightProperty[this_1.keywordIndex]]);
                }
                if (!isNullOrUndefined(inline[distanceTopProperty[this_1.keywordIndex]])) {
                    image_1.distanceTop = HelperMethods.convertPointToPixel(inline[distanceTopProperty[this_1.keywordIndex]]);
                }
                image_1.zOrderPosition = inline[zOrderPositionProperty[this_1.keywordIndex]];
                image_1.layoutInCell = HelperMethods.parseBoolValue(inline[layoutInCellProperty[this_1.keywordIndex]]);
                if (!isNullOrUndefined(inline[topProperty[this_1.keywordIndex]]) && inline[topProperty[this_1.keywordIndex]] !== 0 ||
                    !isNullOrUndefined(inline[bottomProperty[this_1.keywordIndex]]) && inline[bottomProperty[this_1.keywordIndex]] !== 0 ||
                    !isNullOrUndefined(inline[leftProperty[this_1.keywordIndex]]) && inline[leftProperty[this_1.keywordIndex]] !== 0 ||
                    !isNullOrUndefined(inline[rightProperty[this_1.keywordIndex]]) && inline[rightProperty[this_1.keywordIndex]] !== 0) {
                    image_1.isCrop = true;
                }
                if (this_1.getTextWrappingStyle(image_1.textWrappingStyle) !== 'Inline') {
                    paragraph.floatingElements.push(image_1);
                }
                this_1.parseCharacterFormat(this_1.keywordIndex, inline[characterFormatProperty[this_1.keywordIndex]], image_1.characterFormat);
                hasValidElmts = true;
            }
            else if (inline.hasOwnProperty(hasFieldEndProperty[this_1.keywordIndex]) || (inline.hasOwnProperty(fieldTypeProperty[this_1.keywordIndex]) && inline[fieldTypeProperty[this_1.keywordIndex]] === 0)) {
                isCreateField = true;
                var fieldBegin = new FieldElementBox(0);
                this_1.parseCharacterFormat(this_1.keywordIndex, inline[characterFormatProperty[this_1.keywordIndex]], fieldBegin.characterFormat, writeInlineFormat);
                this_1.applyCharacterStyle(inline, fieldBegin);
                fieldBegin.fieldCodeType = inline.fieldCodeType;
                fieldBegin.hasFieldEnd = inline[hasFieldEndProperty[this_1.keywordIndex]];
                if (inline.hasOwnProperty(formFieldDataProperty[this_1.keywordIndex])) {
                    var formFieldData = void 0;
                    formFieldData = this_1.parseFormFieldData(this_1.keywordIndex, inline, formFieldData);
                    fieldBegin.formFieldData = formFieldData;
                    if (!this_1.isContextBasedPaste) {
                        this_1.documentHelper.formFields.push(fieldBegin);
                    }
                }
                this_1.documentHelper.fieldStacks.push(fieldBegin);
                this_1.checkAndApplyRevision(this_1.keywordIndex, inline, fieldBegin);
                fieldBegin.line = lineWidget;
                if (!this_1.isContextBasedPaste) {
                    this_1.documentHelper.fields.push(fieldBegin);
                }
                lineWidget.children.push(fieldBegin);
            }
            else if (inline.hasOwnProperty([fieldTypeProperty[this_1.keywordIndex]])) {
                var field = undefined;
                if (inline[fieldTypeProperty[this_1.keywordIndex]] === 2 || (inline[fieldTypeProperty[this_1.keywordIndex]] === 1 && isCreateField)) {
                    field = new FieldElementBox(2);
                    this_1.parseCharacterFormat(this_1.keywordIndex, inline[characterFormatProperty[this_1.keywordIndex]], field.characterFormat, writeInlineFormat);
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, field);
                    this_1.fieldSeparator = field;
                    if (this_1.documentHelper.fieldStacks.length > 0) {
                        field.fieldBegin = this_1.documentHelper.fieldStacks[this_1.documentHelper.fieldStacks.length - 1];
                        field.fieldBegin.fieldSeparator = field;
                        //finds the whether the field is page filed or not
                        var lineWidgetCount = lineWidget.children.length;
                        if (lineWidgetCount >= 2) {
                            var fieldTextElement = this_1.containsFieldBegin(lineWidget);
                            if (!isNullOrUndefined(fieldTextElement) && fieldTextElement instanceof TextElementBox && (fieldTextElement.text.match('PAGE') || fieldTextElement.text.match('page'))) {
                                var textField = fieldTextElement.text.replace(/^\s+/g, '');
                                if (!textField.startsWith('HYPERLINK')) {
                                    this_1.documentHelper.isPageField = true;
                                }
                            }
                        }
                    }
                    if (inline[fieldTypeProperty[this_1.keywordIndex]] === 1 && isCreateField) {
                        i--;
                        count = i;
                    }
                    isCreateField = false;
                }
                else if (inline[fieldTypeProperty[this_1.keywordIndex]] === 1) {
                    field = new FieldElementBox(1);
                    this_1.parseCharacterFormat(this_1.keywordIndex, inline[characterFormatProperty[this_1.keywordIndex]], field.characterFormat, writeInlineFormat);
                    this_1.applyCharacterStyle(inline, field);
                    this_1.checkAndApplyRevision(this_1.keywordIndex, inline, field);
                    //For Field End Updated begin and separator.                                      
                    if (this_1.documentHelper.fieldStacks.length > 0) {
                        field.fieldBegin = this_1.documentHelper.fieldStacks[this_1.documentHelper.fieldStacks.length - 1];
                        field.fieldBegin.fieldEnd = field;
                    }
                    if (!isNullOrUndefined(field.fieldBegin) && field.fieldBegin.fieldSeparator) {
                        field.fieldSeparator = field.fieldBegin.fieldSeparator;
                        field.fieldBegin.fieldSeparator.fieldEnd = field;
                        hasValidElmts = true;
                    }
                    //After setting all the property clear the field values
                    this_1.documentHelper.fieldStacks.splice(this_1.documentHelper.fieldStacks.length - 1, 1);
                    this_1.fieldSeparator = undefined;
                    this_1.documentHelper.isPageField = false;
                    if (!this_1.isContextBasedPaste) {
                        this_1.documentHelper.fieldCollection.push(field.fieldBegin);
                    }
                    fieldCode = undefined;
                }
                field.line = lineWidget;
                lineWidget.children.push(field);
            }
            else if (inline.hasOwnProperty([bookmarkTypeProperty[this_1.keywordIndex]])) {
                var bookmark = undefined;
                bookmark = new BookmarkElementBox(inline[bookmarkTypeProperty[this_1.keywordIndex]]);
                bookmark.name = inline[nameProperty[this_1.keywordIndex]];
                bookmark.properties = inline[propertiesProperty[this_1.keywordIndex]];
                if (!isNullOrUndefined(inline[propertiesProperty[this_1.keywordIndex]])) {
                    if (!isNullOrUndefined(inline[propertiesProperty[this_1.keywordIndex]][isAfterParagraphMarkProperty[this_1.keywordIndex]])) {
                        bookmark.properties['isAfterParagraphMark'] = HelperMethods.parseBoolValue(inline[propertiesProperty[this_1.keywordIndex]][isAfterParagraphMarkProperty[this_1.keywordIndex]]);
                    }
                    if (!isNullOrUndefined(inline[propertiesProperty[this_1.keywordIndex]][isAfterTableMarkProperty[this_1.keywordIndex]])) {
                        bookmark.properties['isAfterTableMark'] = HelperMethods.parseBoolValue(inline[propertiesProperty[this_1.keywordIndex]][isAfterTableMarkProperty[this_1.keywordIndex]]);
                    }
                    if (!isNullOrUndefined(inline[propertiesProperty[this_1.keywordIndex]][isAfterRowMarkProperty[this_1.keywordIndex]])) {
                        bookmark.properties['isAfterRowMark'] = HelperMethods.parseBoolValue(inline[propertiesProperty[this_1.keywordIndex]][isAfterRowMarkProperty[this_1.keywordIndex]]);
                    }
                    if (!isNullOrUndefined(inline[propertiesProperty[this_1.keywordIndex]][isAfterCellMarkProperty[this_1.keywordIndex]])) {
                        bookmark.properties['isAfterCellMark'] = HelperMethods.parseBoolValue(inline[propertiesProperty[this_1.keywordIndex]][isAfterCellMarkProperty[this_1.keywordIndex]]);
                    }
                    if (!isNullOrUndefined(inline[propertiesProperty[this_1.keywordIndex]][columnFirstProperty[this_1.keywordIndex]])) {
                        bookmark.properties['columnFirst'] = inline[propertiesProperty[this_1.keywordIndex]][columnFirstProperty[this_1.keywordIndex]];
                    }
                    if (!isNullOrUndefined(inline[propertiesProperty[this_1.keywordIndex]][columnLastProperty[this_1.keywordIndex]])) {
                        bookmark.properties['columnLast'] = inline[propertiesProperty[this_1.keywordIndex]][columnLastProperty[this_1.keywordIndex]];
                    }
                }
                this_1.checkAndApplyRevision(this_1.keywordIndex, inline, bookmark);
                lineWidget.children.push(bookmark);
                bookmark.line = lineWidget;
                if (!this_1.isParseHeader || this_1.isPaste) {
                    if (inline[bookmarkTypeProperty[this_1.keywordIndex]] === 0) {
                        var isAdd = this_1.isPaste && !this_1.documentHelper.bookmarks.containsKey(bookmark.name);
                        if (!this_1.isPaste || (isAdd && !this_1.isContextBasedPaste)) {
                            this_1.documentHelper.bookmarks.add(bookmark.name, bookmark);
                        }
                        else if (!isAdd) {
                            lineWidget.children.splice(lineWidget.children.indexOf(bookmark), 1);
                        }
                    }
                    else if (inline[bookmarkTypeProperty[this_1.keywordIndex]] === 1) {
                        if (this_1.documentHelper.bookmarks.containsKey(bookmark.name)) {
                            var bookmarkStart = this_1.documentHelper.bookmarks.get(bookmark.name);
                            var isConsider = this_1.isPaste && isNullOrUndefined(bookmarkStart.reference);
                            if (!this_1.isPaste || (isConsider && !this_1.isContextBasedPaste)) {
                                bookmarkStart.reference = bookmark;
                                bookmark.reference = bookmarkStart;
                                this_1.documentHelper.endBookmarksUpdated.push(bookmark.name);
                            }
                            else if (!isConsider) {
                                lineWidget.children.splice(lineWidget.children.indexOf(bookmark), 1);
                            }
                        }
                    }
                }
                if (bookmark.name.indexOf('_') !== 0) {
                    hasValidElmts = true;
                }
            }
            else if (inline.hasOwnProperty([editRangeIdProperty[this_1.keywordIndex]])) {
                if (inline.hasOwnProperty(editableRangeStartProperty[this_1.keywordIndex])) {
                    var permEnd = new EditRangeEndElementBox();
                    if (this_1.editableRanges.containsKey(inline[editRangeIdProperty[this_1.keywordIndex]])) {
                        var start = this_1.editableRanges.get(inline[editRangeIdProperty[this_1.keywordIndex]]);
                        permEnd.editRangeStart = start;
                        start.editRangeEnd = permEnd;
                        if (!isNullOrUndefined(inline[editRangeIdProperty[this_1.keywordIndex]])) {
                            permEnd.editRangeId = inline[editRangeIdProperty[this_1.keywordIndex]];
                        }
                        this_1.editableRanges.remove(inline[editRangeIdProperty[this_1.keywordIndex]]);
                    }
                    lineWidget.children.push(permEnd);
                    permEnd.line = lineWidget;
                }
                else {
                    var permStart = this_1.parseEditableRangeStart(inline);
                    lineWidget.children.push(permStart);
                    permStart.line = lineWidget;
                    if (!this_1.editableRanges.containsKey(inline[editRangeIdProperty[this_1.keywordIndex]])) {
                        this_1.editableRanges.add(inline[editRangeIdProperty[this_1.keywordIndex]], permStart);
                    }
                }
                hasValidElmts = true;
            }
            else if (inline.hasOwnProperty([commentIdProperty[this_1.keywordIndex]])) {
                var commentID = inline[commentIdProperty[this_1.keywordIndex]];
                var commentStart = undefined;
                var comment = void 0;
                if (this_1.commentStarts.containsKey(commentID)) {
                    commentStart = this_1.commentStarts.get(commentID);
                }
                var commentEnd = undefined;
                if (this_1.commentEnds.containsKey(commentID)) {
                    commentEnd = this_1.commentEnds.get(commentID);
                }
                if (inline.hasOwnProperty([commentCharacterTypeProperty[this_1.keywordIndex]])) {
                    if (inline[commentCharacterTypeProperty[this_1.keywordIndex]] === 0) {
                        var commentStartElement = new CommentCharacterElementBox(0);
                        commentStartElement.commentId = commentID;
                        if (!this_1.commentStarts.containsKey(commentID)) {
                            this_1.commentStarts.add(commentID, commentStartElement);
                        }
                        commentStartElement.line = lineWidget;
                        lineWidget.children.push(commentStartElement);
                        comment = this_1.commentsCollection.get(commentID);
                        if (!isNullOrUndefined(comment)) {
                            comment.commentStart = commentStartElement;
                            commentStartElement.comment = comment;
                        }
                    }
                    else {
                        var commentEndElement = new CommentCharacterElementBox(1);
                        commentEndElement.commentId = commentID;
                        if (!this_1.commentEnds.containsKey(commentID)) {
                            this_1.commentEnds.add(commentID, commentEndElement);
                        }
                        commentEndElement.line = lineWidget;
                        lineWidget.children.push(commentEndElement);
                        comment = this_1.commentsCollection.get(commentID);
                        if (!isNullOrUndefined(comment)) {
                            comment.commentEnd = commentEndElement;
                            commentEndElement.comment = comment;
                        }
                    }
                    if (!isNullOrUndefined(comment) && comment.isReply) {
                        if (isNullOrUndefined(comment.ownerComment.commentStart)) {
                            comment.ownerComment.commentStart = comment.commentStart;
                        }
                        if (isNullOrUndefined(comment.ownerComment.commentEnd)) {
                            comment.ownerComment.commentEnd = comment.commentEnd;
                        }
                    }
                }
            }
            else if (inline.hasOwnProperty([shapeIdProperty[this_1.keywordIndex]])) {
                var shape = new ShapeElementBox();
                shape.shapeId = inline[shapeIdProperty[this_1.keywordIndex]];
                shape.name = inline[nameProperty[this_1.keywordIndex]];
                shape.alternateText = inline[alternativeTextProperty[this_1.keywordIndex]];
                shape.title = inline[titleProperty[this_1.keywordIndex]];
                shape.visible = HelperMethods.parseBoolValue(inline[visibleProperty[this_1.keywordIndex]]);
                shape.width = HelperMethods.convertPointToPixel(inline[widthProperty[this_1.keywordIndex]]);
                shape.height = HelperMethods.convertPointToPixel(inline[heightProperty[this_1.keywordIndex]]);
                if (shape.height === 0) {
                    shape.isZeroHeight = true;
                }
                shape.widthScale = inline[widthScaleProperty[this_1.keywordIndex]];
                shape.heightScale = inline[heightScaleProperty[this_1.keywordIndex]];
                shape.verticalPosition = HelperMethods.convertPointToPixel(inline[verticalPositionProperty[this_1.keywordIndex]]);
                shape.verticalOrigin = this_1.getVerticalOrigin(inline[verticalOriginProperty[this_1.keywordIndex]]);
                shape.verticalAlignment = this_1.getShapeVerticalAlignment(inline[verticalAlignmentProperty[this_1.keywordIndex]]);
                shape.verticalRelativePercent = inline[verticalRelativePercentProperty[this_1.keywordIndex]];
                shape.horizontalPosition = HelperMethods.convertPointToPixel(inline[horizontalPositionProperty[this_1.keywordIndex]]);
                shape.horizontalOrigin = this_1.getHorizontalOrigin(inline[horizontalOriginProperty[this_1.keywordIndex]]);
                shape.horizontalAlignment = this_1.getShapeHorizontalAlignment(inline[horizontalAlignmentProperty[this_1.keywordIndex]]);
                shape.horizontalRelativePercent = inline[horizontalRelativePercentProperty[this_1.keywordIndex]];
                shape.heightRelativePercent = inline[heightRelativePercentProperty[this_1.keywordIndex]];
                shape.widthRelativePercent = inline[widthRelativePercentProperty[this_1.keywordIndex]];
                shape.zOrderPosition = inline[zOrderPositionProperty[this_1.keywordIndex]];
                shape.allowOverlap = HelperMethods.parseBoolValue(inline[allowOverlapProperty[this_1.keywordIndex]]);
                shape.textWrappingStyle = this_1.getTextWrappingStyle(inline[textWrappingStyleProperty[this_1.keywordIndex]]);
                shape.textWrappingType = this_1.getTextWrappingType(inline[textWrappingTypeProperty[this_1.keywordIndex]]);
                shape.isBelowText = HelperMethods.parseBoolValue(inline[belowTextProperty[this_1.keywordIndex]]);
                shape.isHorizontalRule = HelperMethods.parseBoolValue(inline[horizontalRuleProperty[this_1.keywordIndex]]);
                if (!isNullOrUndefined(inline[distanceBottomProperty[this_1.keywordIndex]])) {
                    shape.distanceBottom = HelperMethods.convertPointToPixel(inline[distanceBottomProperty[this_1.keywordIndex]]);
                }
                if (!isNullOrUndefined(inline[distanceLeftProperty[this_1.keywordIndex]])) {
                    shape.distanceLeft = HelperMethods.convertPointToPixel(inline[distanceLeftProperty[this_1.keywordIndex]]);
                }
                if (!isNullOrUndefined(inline[distanceRightProperty[this_1.keywordIndex]])) {
                    shape.distanceRight = HelperMethods.convertPointToPixel(inline[distanceRightProperty[this_1.keywordIndex]]);
                }
                if (!isNullOrUndefined(inline[distanceTopProperty[this_1.keywordIndex]])) {
                    shape.distanceTop = HelperMethods.convertPointToPixel(inline[distanceTopProperty[this_1.keywordIndex]]);
                }
                shape.layoutInCell = HelperMethods.parseBoolValue(inline[layoutInCellProperty[this_1.keywordIndex]]);
                shape.lockAnchor = HelperMethods.parseBoolValue(inline[lockAnchorProperty[this_1.keywordIndex]]);
                shape.autoShapeType = this_1.getAutoShapeType(inline[autoShapeTypeProperty[this_1.keywordIndex]]);
                shape.editingPoints = inline[editingPointsProperty[this_1.keywordIndex]];
                if (inline.hasOwnProperty(lineFormatProperty[this_1.keywordIndex])) {
                    var lineFormat = new LineFormat();
                    lineFormat.line = HelperMethods.parseBoolValue(inline[lineFormatProperty[this_1.keywordIndex]][lineProperty[this_1.keywordIndex]]);
                    lineFormat.lineFormatType = this_1.getLineFormatType(inline[lineFormatProperty[this_1.keywordIndex]][lineFormatTypeProperty[this_1.keywordIndex]]);
                    lineFormat.color = inline[lineFormatProperty[this_1.keywordIndex]][colorProperty[this_1.keywordIndex]];
                    lineFormat.weight = inline[lineFormatProperty[this_1.keywordIndex]][weightProperty[this_1.keywordIndex]];
                    lineFormat.dashStyle = this_1.getLineDashStyle(inline[lineFormatProperty[this_1.keywordIndex]][lineStyleProperty[this_1.keywordIndex]]);
                    shape.lineFormat = lineFormat;
                }
                if (inline.hasOwnProperty(fillFormatProperty[this_1.keywordIndex])) {
                    var fillFormat = new FillFormat();
                    fillFormat.color = inline[fillFormatProperty[this_1.keywordIndex]][colorProperty[this_1.keywordIndex]];
                    fillFormat.fill = HelperMethods.parseBoolValue(inline[fillFormatProperty[this_1.keywordIndex]][fillProperty[this_1.keywordIndex]]);
                    shape.fillFormat = fillFormat;
                }
                if (inline.hasOwnProperty(textFrameProperty[this_1.keywordIndex])) {
                    var textFrame = new TextFrame();
                    textFrame.textVerticalAlignment = this_1.getTextVerticalAlignment(inline[textFrameProperty[this_1.keywordIndex]][textVerticalAlignmentProperty[this_1.keywordIndex]]);
                    textFrame.marginLeft = HelperMethods.convertPointToPixel(inline[textFrameProperty[this_1.keywordIndex]][leftMarginProperty[this_1.keywordIndex]]);
                    textFrame.marginRight = HelperMethods.convertPointToPixel(inline[textFrameProperty[this_1.keywordIndex]][rightMarginProperty[this_1.keywordIndex]]);
                    textFrame.marginTop = HelperMethods.convertPointToPixel(inline[textFrameProperty[this_1.keywordIndex]][topMarginProperty[this_1.keywordIndex]]);
                    textFrame.marginBottom = HelperMethods.convertPointToPixel(inline[textFrameProperty[this_1.keywordIndex]][bottomMarginProperty[this_1.keywordIndex]]);
                    if (inline[textFrameProperty[this_1.keywordIndex]][blocksProperty[this_1.keywordIndex]].length === 0 && shape.autoShapeType === "DownArrow") {
                        var block = this_1.keywordIndex === 1 ? { i: [] } : { inlines: [] };
                        inline[textFrameProperty[this_1.keywordIndex]][blocksProperty[this_1.keywordIndex]].push(block);
                    }
                    this_1.parseBody(inline[textFrameProperty[this_1.keywordIndex]][blocksProperty[this_1.keywordIndex]], textFrame.childWidgets, textFrame);
                    shape.textFrame = textFrame;
                    textFrame.containerShape = shape;
                }
                shape.line = lineWidget;
                this_1.checkAndApplyRevision(this_1.keywordIndex, inline, shape);
                lineWidget.children.push(shape);
                paragraph.floatingElements.push(shape);
            }
            else if (inline.hasOwnProperty(contentControlPropertiesProperty[this_1.keywordIndex])) {
                var inlineStartContentControl = new ContentControl('Inline');
                var inlineEndContentControl = new ContentControl('Inline');
                this_1.parseContentControlProperties(inline[contentControlPropertiesProperty[this_1.keywordIndex]], inlineStartContentControl.contentControlProperties);
                inlineEndContentControl.contentControlProperties = inlineStartContentControl.contentControlProperties;
                inlineStartContentControl.line = lineWidget;
                inlineEndContentControl.line = lineWidget;
                inlineStartContentControl.type = 0;
                inlineEndContentControl.type = 1;
                lineWidget.children.push(inlineStartContentControl);
                this_1.parseParagraph(inline[inlinesProperty[this_1.keywordIndex]], paragraph, writeInlineFormat, lineWidget);
                var element = lineWidget.children[lineWidget.children.length - 1];
                while (!(element instanceof ContentControl)) {
                    element.contentControlProperties = inlineStartContentControl.contentControlProperties;
                    element = element.previousElement;
                }
                lineWidget.children.push(inlineEndContentControl);
                hasValidElmts = true;
            }
            out_i_1 = i;
        };
        var this_1 = this, out_i_1;
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
            i = out_i_1;
        }
        this.isCutPerformed = false;
        if (!isContentControl) {
            paragraph.childWidgets.push(lineWidget);
        }
        return hasValidElmts;
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseFormFieldData = function (keywordIndex, sourceData, formFieldData) {
        if (formFieldData instanceof TextFormField || formFieldData instanceof CheckBoxFormField || formFieldData instanceof DropDownFormField) {
            if (formFieldData instanceof CheckBoxFormField) {
                formFieldData.sizeType = sourceData.sizeType;
                formFieldData.size = sourceData.size;
                formFieldData.defaultValue = sourceData.defaultValue;
                formFieldData.checked = sourceData.checked;
            }
            else if (formFieldData instanceof TextFormField) {
                formFieldData.type = sourceData.type;
                formFieldData.maxLength = sourceData.maxLength;
                formFieldData.defaultValue = sourceData.defaultValue;
                formFieldData.format = sourceData.format;
            }
            else {
                formFieldData.dropdownItems = sourceData.dropdownItems;
                formFieldData.selectedIndex = sourceData.selectedIndex;
            }
            formFieldData.name = sourceData.name;
            formFieldData.enabled = sourceData.enabled;
            formFieldData.helpText = sourceData.helpText;
            formFieldData.statusText = sourceData.statusText;
        }
        else {
            if (sourceData[formFieldDataProperty[keywordIndex]].hasOwnProperty(textInputProperty[keywordIndex])) {
                formFieldData = new TextFormField();
                formFieldData.type = this.getTextFormFieldType(sourceData[formFieldDataProperty[keywordIndex]][textInputProperty[keywordIndex]][typeProperty[keywordIndex]]);
                formFieldData.maxLength = sourceData[formFieldDataProperty[keywordIndex]][textInputProperty[keywordIndex]][maxLengthProperty[keywordIndex]];
                formFieldData.defaultValue = sourceData[formFieldDataProperty[keywordIndex]][textInputProperty[keywordIndex]][defaultValueProperty[keywordIndex]];
                formFieldData.format = this.getTextFormFieldFormat(sourceData[formFieldDataProperty[keywordIndex]][textInputProperty[keywordIndex]][formatProperty[keywordIndex]]);
            }
            else if (sourceData[formFieldDataProperty[keywordIndex]].hasOwnProperty(checkBoxProperty[keywordIndex])) {
                formFieldData = new CheckBoxFormField();
                formFieldData.sizeType = this.getCheckBoxSizeType(sourceData[formFieldDataProperty[keywordIndex]][checkBoxProperty[keywordIndex]][sizeTypeProperty[keywordIndex]]);
                formFieldData.size = sourceData[formFieldDataProperty[keywordIndex]][checkBoxProperty[keywordIndex]][sizeProperty[keywordIndex]];
                formFieldData.defaultValue = HelperMethods.parseBoolValue(sourceData[formFieldDataProperty[keywordIndex]][checkBoxProperty[keywordIndex]][defaultValueProperty[keywordIndex]]);
                formFieldData.checked = HelperMethods.parseBoolValue(sourceData[formFieldDataProperty[keywordIndex]][checkBoxProperty[keywordIndex]][checkedProperty[keywordIndex]]);
            }
            else {
                formFieldData = new DropDownFormField();
                formFieldData.dropdownItems = sourceData[formFieldDataProperty[keywordIndex]][dropDownListProperty[keywordIndex]][dropDownItemsProperty[keywordIndex]];
                formFieldData.selectedIndex = sourceData[formFieldDataProperty[keywordIndex]][dropDownListProperty[keywordIndex]][selectedIndexProperty[keywordIndex]];
            }
            formFieldData.name = sourceData[formFieldDataProperty[keywordIndex]][nameProperty[keywordIndex]];
            formFieldData.enabled = HelperMethods.parseBoolValue(sourceData[formFieldDataProperty[keywordIndex]][enabledProperty[keywordIndex]]);
            formFieldData.helpText = sourceData[formFieldDataProperty[keywordIndex]][helpTextProperty[keywordIndex]];
            formFieldData.statusText = sourceData[formFieldDataProperty[keywordIndex]][statusTextProperty[keywordIndex]];
        }
        return formFieldData;
    };
    SfdtReader.prototype.applyCharacterStyle = function (inline, elementbox) {
        if (!isNullOrUndefined(inline[characterFormatProperty[this.keywordIndex]]) && !isNullOrUndefined(inline[characterFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]])) {
            var charStyle = this.documentHelper.styles.findByName(inline[characterFormatProperty[this.keywordIndex]][styleNameProperty[this.keywordIndex]], 'Character');
            elementbox.characterFormat.applyStyle(charStyle);
        }
    };
    SfdtReader.prototype.parseEditableRangeStart = function (data) {
        var permStart = new EditRangeStartElementBox();
        if (!isNullOrUndefined(data[columnFirstProperty[this.keywordIndex]])) {
            permStart.columnFirst = data[columnFirstProperty[this.keywordIndex]];
        }
        if (!isNullOrUndefined(data[columnLastProperty[this.keywordIndex]])) {
            permStart.columnLast = data[columnLastProperty[this.keywordIndex]];
        }
        if (!isNullOrUndefined(data[editRangeIdProperty[this.keywordIndex]])) {
            permStart.editRangeId = data[editRangeIdProperty[this.keywordIndex]];
        }
        if (!isNullOrUndefined(data[userProperty[this.keywordIndex]])) {
            permStart.user = data[userProperty[this.keywordIndex]];
            if (this.documentHelper.userCollection.indexOf(permStart.user) === -1) {
                this.documentHelper.userCollection.push(permStart.user);
            }
            this.addEditRangeCollection(permStart.user, permStart);
        }
        if (!isNullOrUndefined(data[groupProperty[this.keywordIndex]]) && data[groupProperty[this.keywordIndex]] !== '') {
            permStart.group = data[groupProperty[this.keywordIndex]];
            permStart.group = permStart.group === 'everyone' ? 'Everyone' : permStart.group;
            if (this.documentHelper.userCollection.indexOf(permStart.group) === -1) {
                this.documentHelper.userCollection.push(permStart.group);
            }
            this.addEditRangeCollection(permStart.group, permStart);
        }
        return permStart;
    };
    SfdtReader.prototype.addEditRangeCollection = function (name, permStart) {
        if (this.documentHelper.editRanges.containsKey(name)) {
            var editStartCollection = this.documentHelper.editRanges.get(name);
            editStartCollection.push(permStart);
        }
        else {
            var newEditStartCollection = [];
            newEditStartCollection.push(permStart);
            this.documentHelper.editRanges.add(name, newEditStartCollection);
        }
    };
    SfdtReader.prototype.parseChartTitleArea = function (titleArea, chartTitleArea) {
        chartTitleArea.chartfontName = titleArea[fontNameProperty[this.keywordIndex]];
        chartTitleArea.chartFontSize = titleArea[fontSizeProperty[this.keywordIndex]];
        this.parseChartDataFormat(titleArea[dataFormatProperty[this.keywordIndex]], chartTitleArea.dataFormat);
        this.parseChartLayout(titleArea[layoutProperty[this.keywordIndex]], chartTitleArea.layout);
    };
    SfdtReader.prototype.parseChartDataFormat = function (format, dataFormat) {
        dataFormat.fill.color = format[fillProperty[this.keywordIndex]][foreColorProperty[this.keywordIndex]];
        dataFormat.fill.rgb = format[fillProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
        dataFormat.line.color = format[lineProperty[this.keywordIndex]][colorProperty[this.keywordIndex]];
        dataFormat.line.rgb = format[lineProperty[this.keywordIndex]][rgbProperty[this.keywordIndex]];
    };
    SfdtReader.prototype.parseChartLayout = function (layout, chartLayout) {
        chartLayout.chartLayoutLeft = layout[layoutXProperty[this.keywordIndex]];
        chartLayout.chartLayoutTop = layout[layoutYProperty[this.keywordIndex]];
    };
    SfdtReader.prototype.parseChartLegend = function (legend, chartLegend) {
        chartLegend.chartLegendPostion = legend[positionProperty[this.keywordIndex]];
        this.parseChartTitleArea(legend[chartTitleAreaProperty[this.keywordIndex]], chartLegend.chartTitleArea);
    };
    SfdtReader.prototype.parseChartCategoryAxis = function (categoryAxis, primaryAxis) {
        primaryAxis.categoryAxisType = categoryAxis[categoryTypeProperty[this.keywordIndex]];
        primaryAxis.categoryNumberFormat = categoryAxis[numberFormatProperty[this.keywordIndex]];
        if (categoryAxis.hasOwnProperty(isAutoMajorProperty[this.keywordIndex])) {
            primaryAxis.isAutoInternal = HelperMethods.parseBoolValue(categoryAxis[isAutoMajorProperty[this.keywordIndex]]);
        }
        primaryAxis.interval = categoryAxis[majorUnitProperty[this.keywordIndex]];
        primaryAxis.axisFontSize = categoryAxis[fontSizeProperty[this.keywordIndex]];
        primaryAxis.axisFontName = categoryAxis[fontNameProperty[this.keywordIndex]];
        primaryAxis.max = categoryAxis[maximumValueProperty[this.keywordIndex]];
        primaryAxis.min = categoryAxis[minimumValueProperty[this.keywordIndex]];
        primaryAxis.majorGridLines = HelperMethods.parseBoolValue(categoryAxis[hasMajorGridLinesProperty[this.keywordIndex]]);
        primaryAxis.minorGridLines = HelperMethods.parseBoolValue(categoryAxis[hasMinorGridLinesProperty[this.keywordIndex]]);
        primaryAxis.majorTick = categoryAxis[majorTickMarkProperty[this.keywordIndex]];
        primaryAxis.minorTick = categoryAxis[minorTickMarkProperty[this.keywordIndex]];
        primaryAxis.tickPosition = categoryAxis[tickLabelPositionProperty[this.keywordIndex]];
        primaryAxis.categoryAxisTitle = categoryAxis[chartTitleProperty[this.keywordIndex]];
        if (categoryAxis[chartTitleProperty[this.keywordIndex]] != null) {
            this.parseChartTitleArea(categoryAxis[chartTitleAreaProperty[this.keywordIndex]], primaryAxis.chartTitleArea);
        }
    };
    SfdtReader.prototype.parseChartDataTable = function (dataTable, chartDataTable) {
        chartDataTable.showSeriesKeys = HelperMethods.parseBoolValue(dataTable[showSeriesKeysProperty[this.keywordIndex]]);
        chartDataTable.hasHorzBorder = HelperMethods.parseBoolValue(dataTable[hasHorizontalBorderProperty[this.keywordIndex]]);
        chartDataTable.hasVertBorder = HelperMethods.parseBoolValue(dataTable[hasVerticalBorderProperty[this.keywordIndex]]);
        chartDataTable.hasBorders = HelperMethods.parseBoolValue(dataTable[hasBordersProperty[this.keywordIndex]]);
    };
    SfdtReader.prototype.parseChartArea = function (area, chartArea) {
        chartArea.chartForeColor = area[foreColorProperty[this.keywordIndex]];
    };
    SfdtReader.prototype.parseChartData = function (inline, chart) {
        for (var i = 0; i < inline[chartCategoryProperty[this.keywordIndex]].length; i++) {
            var chartCategory = new ChartCategory();
            var xData = inline[chartCategoryProperty[this.keywordIndex]][i];
            if (xData.hasOwnProperty(categoryXNameProperty[this.keywordIndex])) {
                chartCategory.xName = xData[categoryXNameProperty[this.keywordIndex]];
            }
            for (var j = 0; j < xData[chartDataProperty[this.keywordIndex]].length; j++) {
                var chartData = new ChartData();
                var yData = xData[chartDataProperty[this.keywordIndex]][j];
                chartData.yAxisValue = yData[yValueProperty[this.keywordIndex]];
                if (inline[chartTypeProperty[this.keywordIndex]] === 'Bubble') {
                    chartData.bubbleSize = yData[sizeProperty[this.keywordIndex]];
                }
                chartCategory.chartData.push(chartData);
            }
            chart.chartCategory.push(chartCategory);
        }
        this.parseChartSeries(inline, chart);
    };
    SfdtReader.prototype.parseChartSeries = function (inline, chart) {
        var chartType = inline[chartTypeProperty[this.keywordIndex]];
        var isPieType = (chartType === 'Pie' || chartType === 'Doughnut');
        for (var i = 0; i < inline[chartSeriesProperty[this.keywordIndex]].length; i++) {
            var chartSeries = new ChartSeries();
            var xData = inline[chartSeriesProperty[this.keywordIndex]][i];
            if (xData.hasOwnProperty(seriesNameProperty[this.keywordIndex])) {
                chartSeries.seriesName = xData[seriesNameProperty[this.keywordIndex]];
                if (isPieType) {
                    if (xData.hasOwnProperty(firstSliceAngleProperty[this.keywordIndex])) {
                        chartSeries.firstSliceAngle = xData[firstSliceAngleProperty[this.keywordIndex]];
                    }
                    if (chartType === 'Doughnut') {
                        chartSeries.doughnutHoleSize = xData[holeSizeProperty[this.keywordIndex]];
                    }
                }
                if (xData.hasOwnProperty(dataLabelProperty[this.keywordIndex])) {
                    this.parseChartDataLabels(xData[dataLabelProperty[this.keywordIndex]], chartSeries);
                }
                if (xData.hasOwnProperty(seriesFormatProperty[this.keywordIndex])) {
                    var seriesFormat = new ChartSeriesFormat();
                    var format = xData[seriesFormatProperty[this.keywordIndex]];
                    seriesFormat.markerStyle = format[markerStyleProperty[this.keywordIndex]];
                    seriesFormat.markerColor = format[markerColorProperty[this.keywordIndex]];
                    seriesFormat.numberValue = format[markerSizeProperty[this.keywordIndex]];
                    chartSeries.seriesFormat = seriesFormat;
                }
                if (xData.hasOwnProperty(errorBarProperty[this.keywordIndex])) {
                    var errorBar = chartSeries.errorBar;
                    errorBar.errorType = xData[errorBarProperty[this.keywordIndex]][typeProperty[this.keywordIndex]];
                    errorBar.errorDirection = xData[errorBarProperty[this.keywordIndex]][directionProperty[this.keywordIndex]];
                    errorBar.errorEndStyle = xData[errorBarProperty[this.keywordIndex]][endStyleProperty[this.keywordIndex]];
                    errorBar.numberValue = xData[errorBarProperty[this.keywordIndex]][numberValueProperty[this.keywordIndex]];
                }
                if (xData.hasOwnProperty(trendLinesProperty[this.keywordIndex])) {
                    this.parseChartTrendLines(xData[trendLinesProperty[this.keywordIndex]], chartSeries);
                }
                this.parseChartSeriesDataPoints(xData[dataPointsProperty[this.keywordIndex]], chartSeries);
            }
            chart.chartSeries.push(chartSeries);
        }
    };
    SfdtReader.prototype.parseChartDataLabels = function (dataLabels, series) {
        var dataLabel = new ChartDataLabels();
        dataLabel.labelPosition = dataLabels[positionProperty[this.keywordIndex]];
        dataLabel.fontName = dataLabels[fontNameProperty[this.keywordIndex]];
        dataLabel.fontColor = dataLabels[fontColorProperty[this.keywordIndex]];
        dataLabel.fontSize = dataLabels[fontSizeProperty[this.keywordIndex]];
        dataLabel.isLegendKey = HelperMethods.parseBoolValue(dataLabels[isLegendKeyProperty[this.keywordIndex]]);
        dataLabel.isBubbleSize = HelperMethods.parseBoolValue(dataLabels[isBubbleSizeProperty[this.keywordIndex]]);
        dataLabel.isCategoryName = HelperMethods.parseBoolValue(dataLabels[isCategoryNameProperty[this.keywordIndex]]);
        dataLabel.isSeriesName = HelperMethods.parseBoolValue(dataLabels[isSeriesNameProperty[this.keywordIndex]]);
        dataLabel.isValue = HelperMethods.parseBoolValue(dataLabels[isValueProperty[this.keywordIndex]]);
        dataLabel.isPercentage = HelperMethods.parseBoolValue(dataLabels[isPercentageProperty[this.keywordIndex]]);
        dataLabel.isLeaderLines = HelperMethods.parseBoolValue(dataLabels[isLeaderLinesProperty[this.keywordIndex]]);
        series.dataLabels = dataLabel;
    };
    SfdtReader.prototype.parseChartSeriesDataPoints = function (dataPoints, series) {
        for (var i = 0; i < dataPoints.length; i++) {
            var chartFormat = new ChartDataFormat();
            if (dataPoints[i].hasOwnProperty(idProperty[this.keywordIndex])) {
                chartFormat.id = dataPoints[i][idProperty[this.keywordIndex]];
            }
            this.parseChartDataFormat(dataPoints[i], chartFormat);
            series.chartDataFormat.push(chartFormat);
        }
    };
    SfdtReader.prototype.parseChartTrendLines = function (trendLines, series) {
        for (var i = 0; i < trendLines.length; i++) {
            var data = trendLines[i];
            var trendLine = new ChartTrendLines();
            trendLine.trendLineName = data[nameProperty[this.keywordIndex]];
            trendLine.trendLineType = data[typeProperty[this.keywordIndex]];
            trendLine.forwardValue = data[forwardProperty[this.keywordIndex]];
            trendLine.backwardValue = data[backwardProperty[this.keywordIndex]];
            trendLine.interceptValue = data[interceptProperty[this.keywordIndex]];
            trendLine.isDisplayEquation = HelperMethods.parseBoolValue(data[isDisplayEquationProperty[this.keywordIndex]]);
            trendLine.isDisplayRSquared = HelperMethods.parseBoolValue(data[isDisplayRSquaredProperty[this.keywordIndex]]);
            series.trendLines.push(trendLine);
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseTableFormat = function (sourceFormat, tableFormat, keywordIndex) {
        this.parseBorders(keywordIndex, sourceFormat[bordersProperty[keywordIndex]], tableFormat.borders);
        if (!isNullOrUndefined(sourceFormat[allowAutoFitProperty[keywordIndex]])) {
            tableFormat.allowAutoFit = HelperMethods.parseBoolValue(sourceFormat[allowAutoFitProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(sourceFormat[cellSpacingProperty[keywordIndex]])) {
            tableFormat.cellSpacing = sourceFormat[cellSpacingProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[leftMarginProperty[keywordIndex]])) {
            tableFormat.leftMargin = sourceFormat[leftMarginProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[topMarginProperty[keywordIndex]])) {
            tableFormat.topMargin = sourceFormat[topMarginProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[rightMarginProperty[keywordIndex]])) {
            tableFormat.rightMargin = sourceFormat[rightMarginProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[bottomMarginProperty[keywordIndex]])) {
            tableFormat.bottomMargin = sourceFormat[bottomMarginProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[leftIndentProperty[keywordIndex]])) {
            tableFormat.leftIndent = sourceFormat[leftIndentProperty[keywordIndex]];
        }
        this.parseShading(sourceFormat[shadingProperty[keywordIndex]], tableFormat.shading, keywordIndex);
        if (!isNullOrUndefined(sourceFormat[tableAlignmentProperty[keywordIndex]])) {
            tableFormat.tableAlignment = this.getTableAlignment(sourceFormat[tableAlignmentProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(sourceFormat[preferredWidthProperty[keywordIndex]])) {
            tableFormat.preferredWidth = sourceFormat[preferredWidthProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[preferredWidthTypeProperty[keywordIndex]])) {
            tableFormat.preferredWidthType = this.getWidthType(sourceFormat[preferredWidthTypeProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(sourceFormat[bidiProperty[keywordIndex]])) {
            tableFormat.bidi = HelperMethods.parseBoolValue(sourceFormat[bidiProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(sourceFormat[horizontalPositionAbsProperty[keywordIndex]])) {
            tableFormat.horizontalPositionAbs = this.getHorizontalPositionAbs(sourceFormat[horizontalPositionAbsProperty[keywordIndex]]);
        }
        if (!isNullOrUndefined(sourceFormat[horizontalPositionProperty[keywordIndex]])) {
            tableFormat.horizontalPosition = sourceFormat[horizontalPositionProperty[keywordIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[styleNameProperty[keywordIndex]])) {
            tableFormat.styleName = sourceFormat[styleNameProperty[keywordIndex]];
        }
        if (this.documentHelper.owner.enableCollaborativeEditing && !isNullOrUndefined(sourceFormat[titleProperty[keywordIndex]])) {
            tableFormat.title = sourceFormat[titleProperty[keywordIndex]];
        }
        if (this.documentHelper.owner.enableCollaborativeEditing && !isNullOrUndefined(sourceFormat[descriptionProperty[keywordIndex]])) {
            tableFormat.description = sourceFormat[descriptionProperty[keywordIndex]];
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseCellFormat = function (sourceFormat, cellFormat, keyIndex) {
        if (!isNullOrUndefined(sourceFormat)) {
            this.parseBorders(keyIndex, sourceFormat[bordersProperty[keyIndex]], cellFormat.borders);
            if (!sourceFormat.isSamePaddingAsTable) {
                //    cellFormat.ClearMargins();
                //else
                this.parseCellMargin(sourceFormat, cellFormat, keyIndex);
            }
            if (!isNullOrUndefined(sourceFormat[cellWidthProperty[keyIndex]])) {
                cellFormat.cellWidth = sourceFormat[cellWidthProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[columnSpanProperty[keyIndex]])) {
                cellFormat.columnSpan = sourceFormat[columnSpanProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[rowSpanProperty[keyIndex]])) {
                cellFormat.rowSpan = sourceFormat[rowSpanProperty[keyIndex]];
            }
            this.parseShading(sourceFormat[shadingProperty[keyIndex]], cellFormat.shading, keyIndex);
            if (!isNullOrUndefined(sourceFormat[verticalAlignmentProperty[keyIndex]])) {
                cellFormat.verticalAlignment = this.getCellVerticalAlignment(sourceFormat[verticalAlignmentProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[preferredWidthTypeProperty[keyIndex]])) {
                cellFormat.preferredWidthType = this.getWidthType(sourceFormat[preferredWidthTypeProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[preferredWidthProperty[keyIndex]])) {
                cellFormat.preferredWidth = sourceFormat[preferredWidthProperty[keyIndex]];
            }
        }
    };
    SfdtReader.prototype.parseCellMargin = function (sourceFormat, cellFormat, keyIndex) {
        if (!isNullOrUndefined(sourceFormat[leftMarginProperty[keyIndex]])) {
            cellFormat.leftMargin = sourceFormat[leftMarginProperty[keyIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[rightMarginProperty[keyIndex]])) {
            cellFormat.rightMargin = sourceFormat[rightMarginProperty[keyIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[topMarginProperty[keyIndex]])) {
            cellFormat.topMargin = sourceFormat[topMarginProperty[keyIndex]];
        }
        if (!isNullOrUndefined(sourceFormat[bottomMarginProperty[keyIndex]])) {
            cellFormat.bottomMargin = sourceFormat[bottomMarginProperty[keyIndex]];
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseRowFormat = function (sourceFormat, rowFormat, keyIndex) {
        if (!isNullOrUndefined(sourceFormat)) {
            if (!isNullOrUndefined(sourceFormat[allowBreakAcrossPagesProperty[keyIndex]])) {
                rowFormat.allowBreakAcrossPages = HelperMethods.parseBoolValue(sourceFormat[allowBreakAcrossPagesProperty[this.keywordIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[isHeaderProperty[keyIndex]])) {
                rowFormat.isHeader = HelperMethods.parseBoolValue(sourceFormat[isHeaderProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[heightTypeProperty[keyIndex]])) {
                rowFormat.heightType = this.getHeightType(sourceFormat[heightTypeProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[heightProperty[keyIndex]])) {
                rowFormat.height = sourceFormat[heightProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[leftMarginProperty[keyIndex]])) {
                rowFormat.leftMargin = sourceFormat[leftMarginProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[topMarginProperty[keyIndex]])) {
                rowFormat.topMargin = sourceFormat[topMarginProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[rightMarginProperty[keyIndex]])) {
                rowFormat.rightMargin = sourceFormat[rightMarginProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[bottomMarginProperty[keyIndex]])) {
                rowFormat.bottomMargin = sourceFormat[bottomMarginProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[leftIndentProperty[keyIndex]])) {
                rowFormat.leftIndent = sourceFormat[leftIndentProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[revisionIdsProperty[keyIndex]]) && sourceFormat[revisionIdsProperty[keyIndex]].length > 0) {
                this.checkAndApplyRevision(keyIndex, sourceFormat, rowFormat);
            }
            this.parseRowGridValues(sourceFormat, rowFormat, keyIndex);
            this.parseBorders(keyIndex, sourceFormat[bordersProperty[keyIndex]], rowFormat.borders);
        }
    };
    SfdtReader.prototype.parseBorders = function (keyIndex, sourceBorders, destBorder) {
        if (!isNullOrUndefined(sourceBorders)) {
            destBorder.isParsing = true;
            this.parseBorder(keyIndex, sourceBorders[leftProperty[keyIndex]], destBorder.left);
            this.parseBorder(keyIndex, sourceBorders[rightProperty[keyIndex]], destBorder.right);
            this.parseBorder(keyIndex, sourceBorders[topProperty[keyIndex]], destBorder.top);
            this.parseBorder(keyIndex, sourceBorders[bottomProperty[keyIndex]], destBorder.bottom);
            this.parseBorder(keyIndex, sourceBorders[verticalProperty[keyIndex]], destBorder.vertical);
            this.parseBorder(keyIndex, sourceBorders[horizontalProperty[keyIndex]], destBorder.horizontal);
            this.parseBorder(keyIndex, sourceBorders[diagonalDownProperty[keyIndex]], destBorder.diagonalDown);
            this.parseBorder(keyIndex, sourceBorders[diagonalUpProperty[keyIndex]], destBorder.diagonalUp);
            destBorder.isParsing = false;
        }
    };
    SfdtReader.prototype.parseBorder = function (keyIndex, sourceBorder, destBorder) {
        if (!isNullOrUndefined(sourceBorder)) {
            if (!isNullOrUndefined(sourceBorder[colorProperty[keyIndex]])) {
                destBorder.color = this.getColor(sourceBorder[colorProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceBorder[lineStyleProperty[keyIndex]])) {
                destBorder.lineStyle = this.getLineStyle(sourceBorder[lineStyleProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceBorder[lineWidthProperty[keyIndex]])) {
                destBorder.lineWidth = sourceBorder[lineWidthProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceBorder[hasNoneStyleProperty[keyIndex]])) {
                destBorder.hasNoneStyle = HelperMethods.parseBoolValue(sourceBorder[hasNoneStyleProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceBorder[spaceProperty[keyIndex]])) {
                destBorder.space = sourceBorder[spaceProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceBorder[shadowProperty[keyIndex]])) {
                destBorder.shadow = HelperMethods.parseBoolValue(sourceBorder[shadowProperty[keyIndex]]);
            }
        }
    };
    SfdtReader.prototype.parseShading = function (sourceShading, destShading, keyIndex) {
        if (!isNullOrUndefined(sourceShading)) {
            if (!isNullOrUndefined(sourceShading[backgroundColorProperty[keyIndex]])) {
                destShading.backgroundColor = this.getColor(sourceShading[backgroundColorProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceShading[foregroundColorProperty[keyIndex]])) {
                destShading.foregroundColor = this.getColor(sourceShading[foregroundColorProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceShading[textureProperty[keyIndex]]) || !isNullOrUndefined(sourceShading.textureStyle)) {
                destShading.textureStyle = !isNullOrUndefined(sourceShading[textureProperty[keyIndex]]) ? this.getTextureStyle(sourceShading[textureProperty[keyIndex]]) : this.getTextureStyle(sourceShading.textureStyle);
            }
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.parseCharacterFormat = function (keyIndex, sourceFormat, characterFormat, writeInlineFormat) {
        if (!isNullOrUndefined(sourceFormat)) {
            if (writeInlineFormat && sourceFormat.hasOwnProperty(inlineFormatProperty[keyIndex])) {
                this.parseCharacterFormat(keyIndex, sourceFormat.inlineFormat, characterFormat);
                return;
            }
            if (!isNullOrUndefined(sourceFormat[baselineAlignmentProperty[keyIndex]])) {
                characterFormat.baselineAlignment = this.getBaseAlignment(sourceFormat[baselineAlignmentProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[underlineProperty[keyIndex]])) {
                characterFormat.underline = this.getUnderline(sourceFormat[underlineProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[underlineColorProperty[keyIndex]])) {
                characterFormat.underlineColor = this.getColor(sourceFormat[underlineColorProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[fontHintTypeProperty[keyIndex]])) {
                characterFormat.fontHintType = this.getFontHintType(sourceFormat[fontHintTypeProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[strikethroughProperty[keyIndex]])) {
                characterFormat.strikethrough = this.getStrikethrough(sourceFormat[strikethroughProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[fontSizeProperty[keyIndex]])) {
                sourceFormat[fontSizeProperty[keyIndex]] = parseFloat(sourceFormat[fontSizeProperty[keyIndex]]);
                var number = sourceFormat[fontSizeProperty[keyIndex]] * 10;
                if (number % 10 !== 0) {
                    number = sourceFormat[fontSizeProperty[keyIndex]].toFixed(1) * 10;
                    //to check worst case scenerio like 8.2 or 8.7 like these to round off
                    if (number % 5 === 0) {
                        sourceFormat[fontSizeProperty[keyIndex]] = sourceFormat[fontSizeProperty[keyIndex]].toFixed(1);
                    }
                    else {
                        sourceFormat[fontSizeProperty[keyIndex]] = Math.round(sourceFormat[fontSizeProperty[keyIndex]]);
                    }
                }
                var fontSize = parseFloat(sourceFormat[fontSizeProperty[keyIndex]]);
                characterFormat.fontSize = fontSize < 0 ? 0 : fontSize;
            }
            if (!isNullOrUndefined(sourceFormat[fontFamilyProperty[keyIndex]])) {
                if (sourceFormat[fontFamilyProperty[keyIndex]].indexOf('"') !== -1) {
                    sourceFormat[fontFamilyProperty[keyIndex]] = sourceFormat[fontFamilyProperty[keyIndex]].replace('"', '');
                }
                var fontFamily = sourceFormat[fontFamilyProperty[keyIndex]];
                if (!isNullOrUndefined(this.documentHelper.fontSubstitutionTable) && this.documentHelper.fontSubstitutionTable.containsKey(fontFamily) && !this.isFontInstalled(fontFamily)) {
                    fontFamily = this.documentHelper.fontSubstitutionTable.get(fontFamily);
                }
                characterFormat.fontFamily = fontFamily;
                if (isNullOrUndefined(sourceFormat[fontFamilyAsciiProperty[keyIndex]])) {
                    characterFormat.fontFamilyAscii = fontFamily;
                }
                if (isNullOrUndefined(sourceFormat[fontFamilyNonFarEastProperty[keyIndex]])) {
                    characterFormat.fontFamilyNonFarEast = fontFamily;
                }
            }
            if (!isNullOrUndefined(sourceFormat[boldProperty[keyIndex]])) {
                characterFormat.bold = HelperMethods.parseBoolValue(sourceFormat[boldProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[italicProperty[keyIndex]])) {
                characterFormat.italic = HelperMethods.parseBoolValue(sourceFormat[italicProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[highlightColorProperty[keyIndex]])) {
                characterFormat.highlightColor = this.getHighlightColor(sourceFormat[highlightColorProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[fontColorProperty[keyIndex]])) {
                characterFormat.fontColor = this.getColor(sourceFormat[fontColorProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[bidiProperty[keyIndex]])) {
                characterFormat.bidi = HelperMethods.parseBoolValue(sourceFormat[bidiProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[bdoProperty[keyIndex]])) {
                characterFormat.bdo = this.getBiDirectionalOverride(sourceFormat[bdoProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[fontSizeBidiProperty[keyIndex]])) {
                var fontSize = parseFloat(sourceFormat[fontSizeBidiProperty[keyIndex]]);
                characterFormat.fontSizeBidi = fontSize < 0 ? 0 : fontSize;
            }
            if (!isNullOrUndefined(sourceFormat[fontFamilyBidiProperty[keyIndex]])) {
                if (sourceFormat[fontFamilyBidiProperty[keyIndex]].indexOf('"') !== -1) {
                    sourceFormat[fontFamilyBidiProperty[keyIndex]] = sourceFormat[fontFamilyBidiProperty[keyIndex]].replace('"', '');
                }
                var fontFamilyBidi = sourceFormat[fontFamilyBidiProperty[keyIndex]];
                if (!isNullOrUndefined(this.documentHelper.fontSubstitutionTable) && this.documentHelper.fontSubstitutionTable.containsKey(fontFamilyBidi) && !this.isFontInstalled(fontFamilyBidi)) {
                    fontFamilyBidi = this.documentHelper.fontSubstitutionTable.get(fontFamilyBidi);
                }
                characterFormat.fontFamilyBidi = fontFamilyBidi;
            }
            if (!isNullOrUndefined(sourceFormat[boldBidiProperty[keyIndex]])) {
                characterFormat.boldBidi = HelperMethods.parseBoolValue(sourceFormat[boldBidiProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[italicBidiProperty[keyIndex]])) {
                characterFormat.italicBidi = HelperMethods.parseBoolValue(sourceFormat[italicBidiProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[revisionIdsProperty[keyIndex]]) && sourceFormat[revisionIdsProperty[keyIndex]].length > 0) {
                this.checkAndApplyRevision(keyIndex, sourceFormat, characterFormat);
            }
            if (!isNullOrUndefined(sourceFormat[allCapsProperty[keyIndex]])) {
                characterFormat.allCaps = HelperMethods.parseBoolValue(sourceFormat[allCapsProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[localeIdBidiProperty[keyIndex]])) {
                characterFormat.localeIdBidi = sourceFormat[localeIdBidiProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[localeIdProperty[keyIndex]])) {
                characterFormat.localeIdAscii = sourceFormat[localeIdProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[localeIdFarEastProperty[keyIndex]])) {
                characterFormat.localeIdFarEast = sourceFormat[localeIdFarEastProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[complexScriptProperty[keyIndex]])) {
                characterFormat.complexScript = HelperMethods.parseBoolValue(sourceFormat[complexScriptProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[hiddenProperty[keyIndex]])) {
                characterFormat.hidden = HelperMethods.parseBoolValue(sourceFormat[hiddenProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[fontFamilyFarEastProperty[keyIndex]])) {
                if (sourceFormat[fontFamilyFarEastProperty[keyIndex]].indexOf('"') !== -1) {
                    sourceFormat[fontFamilyFarEastProperty[keyIndex]] = sourceFormat[fontFamilyFarEastProperty[keyIndex]].replace('"', '');
                }
                var fontFamilyFarEast = sourceFormat[fontFamilyFarEastProperty[keyIndex]];
                if (!isNullOrUndefined(this.documentHelper.fontSubstitutionTable) && this.documentHelper.fontSubstitutionTable.containsKey(fontFamilyFarEast) && !this.isFontInstalled(fontFamilyFarEast)) {
                    fontFamilyFarEast = this.documentHelper.fontSubstitutionTable.get(fontFamilyFarEast);
                }
                characterFormat.fontFamilyFarEast = fontFamilyFarEast;
            }
            if (!isNullOrUndefined(sourceFormat[fontFamilyAsciiProperty[keyIndex]])) {
                if (sourceFormat[fontFamilyAsciiProperty[keyIndex]].indexOf('"') !== -1) {
                    sourceFormat[fontFamilyAsciiProperty[keyIndex]] = sourceFormat[fontFamilyAsciiProperty[keyIndex]].replace('"', '');
                }
                var fontFamilyAscii = sourceFormat[fontFamilyAsciiProperty[keyIndex]];
                if (!isNullOrUndefined(this.documentHelper.fontSubstitutionTable) && this.documentHelper.fontSubstitutionTable.containsKey(fontFamilyAscii) && !this.isFontInstalled(fontFamilyAscii)) {
                    fontFamilyAscii = this.documentHelper.fontSubstitutionTable.get(fontFamilyAscii);
                }
                characterFormat.fontFamilyAscii = fontFamilyAscii;
            }
            if (!isNullOrUndefined(sourceFormat[fontFamilyNonFarEastProperty[keyIndex]])) {
                if (sourceFormat[fontFamilyNonFarEastProperty[keyIndex]].indexOf('"') !== -1) {
                    sourceFormat[fontFamilyNonFarEastProperty[keyIndex]] = sourceFormat[fontFamilyNonFarEastProperty[keyIndex]].replace('"', '');
                }
                var fontFamilyNonFarEast = sourceFormat[fontFamilyNonFarEastProperty[keyIndex]];
                if (!isNullOrUndefined(this.documentHelper.fontSubstitutionTable) && this.documentHelper.fontSubstitutionTable.containsKey(fontFamilyNonFarEast) && !this.isFontInstalled(fontFamilyNonFarEast)) {
                    fontFamilyNonFarEast = this.documentHelper.fontSubstitutionTable.get(fontFamilyNonFarEast);
                }
                characterFormat.fontFamilyNonFarEast = fontFamilyNonFarEast;
            }
            if (!isNullOrUndefined(sourceFormat[characterSpacingProperty[keyIndex]])) {
                characterFormat.characterSpacing = sourceFormat[characterSpacingProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[scalingProperty[keyIndex]])) {
                characterFormat.scaling = sourceFormat[scalingProperty[keyIndex]];
            }
        }
    };
    // Bug 864876: Here, we have checking whether the font is installed or not. If not installed, then we have changed the font name from the font substitution table.
    // The below code is implemented by refering the following link. (https://www.samclarke.com/javascript-is-font-available/#:~:text=Then%20to%20check%20a%20font,otherwise%20another%20fallback%20is%20tried.)
    /**
     * @private
     * @returns {boolean}
     */
    SfdtReader.prototype.isFontInstalled = function (fontFamily) {
        if (this.fontInfoCollection && this.fontInfoCollection.containsKey(fontFamily)) {
            return this.fontInfoCollection.get(fontFamily);
        }
        var monoWidth = this.getWidth('monospace');
        var sansWidth = this.getWidth('sans-serif');
        var serifWidth = this.getWidth('serif');
        var isFontInstalled = monoWidth !== this.getWidth(fontFamily + ', monospace', monoWidth) ||
            sansWidth !== this.getWidth(fontFamily + ', sans-serif', sansWidth) ||
            serifWidth !== this.getWidth(fontFamily + ', serif', serifWidth);
        if (this.fontInfoCollection) {
            this.fontInfoCollection.add(fontFamily, isFontInstalled);
        }
        return isFontInstalled;
    };
    SfdtReader.prototype.getWidth = function (fontFamily, defaultWidth) {
        var width;
        var container = document.createElement('span');
        container.innerHTML = Array(100).join('wi');
        container.style.cssText = [
            'position:absolute',
            'width:auto',
            'font-size:128px',
            'left:-99999px'
        ].join(' !important;');
        container.style.fontFamily = fontFamily;
        document.body.appendChild(container);
        width = container.clientWidth;
        if (container.style.fontFamily === "" && !isNullOrUndefined(defaultWidth)) {
            width = defaultWidth;
        }
        document.body.removeChild(container);
        return width;
    };
    SfdtReader.prototype.getColor = function (color) {
        var convertColor = color;
        return convertColor || '#ffffff';
    };
    SfdtReader.prototype.parseThemes = function (sourceFormat, themes) {
        this.parseFontScheme(sourceFormat[fontSchemeProperty[this.keywordIndex]], themes);
    };
    SfdtReader.prototype.parseFontScheme = function (sourceFormat, themes) {
        if (!isNullOrUndefined(sourceFormat[fontSchemeNameProperty[this.keywordIndex]]))
            themes.fontScheme.fontSchemeName = sourceFormat[fontSchemeNameProperty[this.keywordIndex]];
        if (!isNullOrUndefined(sourceFormat[majorFontSchemeProperty[this.keywordIndex]])) {
            this.parseMajorMinorFontScheme(sourceFormat[majorFontSchemeProperty[this.keywordIndex]], themes.fontScheme.majorFontScheme);
        }
        if (!isNullOrUndefined(sourceFormat[minorFontSchemeProperty[this.keywordIndex]])) {
            this.parseMajorMinorFontScheme(sourceFormat[minorFontSchemeProperty[this.keywordIndex]], themes.fontScheme.minorFontScheme);
        }
    };
    SfdtReader.prototype.parseMajorMinorFontScheme = function (sourceFormat, majorMinor) {
        if (!isNullOrUndefined(sourceFormat[fontTypefaceProperty[this.keywordIndex]]) && Object.keys(sourceFormat[fontTypefaceProperty[this.keywordIndex]]).length > 0) {
            var keys = Object.keys(sourceFormat[fontTypefaceProperty[this.keywordIndex]]);
            for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
                var key = keys_2[_i];
                majorMinor.fontTypeface.add(key, sourceFormat[fontTypefaceProperty[this.keywordIndex]][key]);
            }
            this.documentHelper.hasThemes = true;
        }
        if (!isNullOrUndefined(sourceFormat[fontSchemeListProperty[this.keywordIndex]]) && sourceFormat[fontSchemeListProperty[this.keywordIndex]].length > 0) {
            for (var j = 0; j < sourceFormat[fontSchemeListProperty[this.keywordIndex]].length; j++) {
                var data = sourceFormat[fontSchemeListProperty[this.keywordIndex]][j];
                var fontList = new FontSchemeStruct();
                fontList.name = !isNullOrUndefined(data.fontName) ? data[fontNameProperty[this.keywordIndex]] : data[nameProperty[this.keywordIndex]];
                fontList.typeface = !isNullOrUndefined(data.fontTypeface) ? data.fontTypeface : data[typefaceProperty[this.keywordIndex]];
                fontList.panose = !isNullOrUndefined(data.pnose) ? data.pnose : data[panoseProperty[this.keywordIndex]];
                majorMinor.fontSchemeList.push(fontList);
            }
            this.documentHelper.hasThemes = true;
        }
    };
    SfdtReader.prototype.parseParagraphFormat = function (keyIndex, sourceFormat, paragraphFormat) {
        if (!isNullOrUndefined(sourceFormat)) {
            if (!isNullOrUndefined(sourceFormat[bordersProperty[keyIndex]])) {
                this.parseBorders(keyIndex, sourceFormat[bordersProperty[keyIndex]], paragraphFormat.borders);
            }
            if (!isNullOrUndefined(sourceFormat[bidiProperty[keyIndex]])) {
                paragraphFormat.bidi = HelperMethods.parseBoolValue(sourceFormat[bidiProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[leftIndentProperty[keyIndex]])) {
                paragraphFormat.leftIndent = sourceFormat[leftIndentProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[rightIndentProperty[keyIndex]])) {
                paragraphFormat.rightIndent = sourceFormat[rightIndentProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[firstLineIndentProperty[keyIndex]])) {
                paragraphFormat.firstLineIndent = sourceFormat[firstLineIndentProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[afterSpacingProperty[keyIndex]])) {
                paragraphFormat.afterSpacing = sourceFormat[afterSpacingProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[beforeSpacingProperty[keyIndex]])) {
                paragraphFormat.beforeSpacing = sourceFormat[beforeSpacingProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[spaceBeforeAutoProperty[keyIndex]])) {
                paragraphFormat.spaceBeforeAuto = HelperMethods.parseBoolValue(sourceFormat[spaceBeforeAutoProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[spaceAfterAutoProperty[keyIndex]])) {
                paragraphFormat.spaceAfterAuto = HelperMethods.parseBoolValue(sourceFormat[spaceAfterAutoProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[lineSpacingProperty[keyIndex]])) {
                paragraphFormat.lineSpacing = sourceFormat[lineSpacingProperty[keyIndex]];
            }
            if (!isNullOrUndefined(sourceFormat[lineSpacingTypeProperty[keyIndex]])) {
                paragraphFormat.lineSpacingType = this.getLineSpacingType(sourceFormat[lineSpacingTypeProperty[keyIndex]]);
            }
            else {
                if (!isNullOrUndefined(sourceFormat[lineSpacingProperty[keyIndex]])) {
                    paragraphFormat.lineSpacingType = 'Multiple';
                }
            }
            if (!isNullOrUndefined(sourceFormat[textAlignmentProperty[keyIndex]])) {
                paragraphFormat.textAlignment = this.getTextAlignment(sourceFormat[textAlignmentProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[outlineLevelProperty[keyIndex]])) {
                paragraphFormat.outlineLevel = this.getOutlineLevel(sourceFormat[outlineLevelProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[contextualSpacingProperty[keyIndex]])) {
                paragraphFormat.contextualSpacing = HelperMethods.parseBoolValue(sourceFormat[contextualSpacingProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[keepWithNextProperty[keyIndex]])) {
                paragraphFormat.keepWithNext = HelperMethods.parseBoolValue(sourceFormat[keepWithNextProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[keepLinesTogetherProperty[keyIndex]])) {
                paragraphFormat.keepLinesTogether = HelperMethods.parseBoolValue(sourceFormat[keepLinesTogetherProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(sourceFormat[widowControlProperty[keyIndex]])) {
                paragraphFormat.widowControl = HelperMethods.parseBoolValue(sourceFormat[widowControlProperty[keyIndex]]);
            }
            paragraphFormat.listFormat = new WListFormat(paragraphFormat);
            if (sourceFormat.hasOwnProperty(listFormatProperty[keyIndex])) {
                this.parseListFormat(keyIndex, sourceFormat, paragraphFormat.listFormat);
            }
            if (sourceFormat.hasOwnProperty(tabsProperty[keyIndex])) {
                this.parseTabStop(keyIndex, sourceFormat[tabsProperty[keyIndex]], paragraphFormat.tabs);
            }
        }
    };
    SfdtReader.prototype.parseListFormat = function (keyIndex, block, listFormat) {
        if (!isNullOrUndefined(block[listFormatProperty[keyIndex]])) {
            if (!isNullOrUndefined(block[listFormatProperty[keyIndex]][listIdProperty[keyIndex]])) {
                listFormat.listId = block[listFormatProperty[keyIndex]][listIdProperty[keyIndex]];
                listFormat.list = this.documentHelper.getListById(block[listFormatProperty[keyIndex]][listIdProperty[keyIndex]]);
            }
            if (!isNullOrUndefined(block[listFormatProperty[keyIndex]][nsidProperty])) {
                listFormat.nsid = block[listFormatProperty[keyIndex]][nsidProperty];
            }
            else if (!isNullOrUndefined(listFormat.list)) {
                // Backward compatibility
                listFormat.nsid = listFormat.list.nsid;
            }
            if (!isNullOrUndefined(block[listFormatProperty[keyIndex]][listLevelNumberProperty[keyIndex]])) {
                listFormat.listLevelNumber = block[listFormatProperty[keyIndex]][listLevelNumberProperty[keyIndex]];
            }
        }
    };
    SfdtReader.prototype.parseSectionFormat = function (keyIndex, data, sectionFormat) {
        if (!isNullOrUndefined(data[pageWidthProperty[keyIndex]])) {
            sectionFormat.pageWidth = data[pageWidthProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[pageHeightProperty[keyIndex]])) {
            sectionFormat.pageHeight = data[pageHeightProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[leftMarginProperty[keyIndex]])) {
            sectionFormat.leftMargin = data[leftMarginProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[topMarginProperty[keyIndex]])) {
            sectionFormat.topMargin = data[topMarginProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[rightMarginProperty[keyIndex]])) {
            sectionFormat.rightMargin = data[rightMarginProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[bottomMarginProperty[keyIndex]])) {
            sectionFormat.bottomMargin = data[bottomMarginProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[headerDistanceProperty[keyIndex]])) {
            sectionFormat.headerDistance = data[headerDistanceProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[footerDistanceProperty[keyIndex]])) {
            sectionFormat.footerDistance = data[footerDistanceProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[differentFirstPageProperty[keyIndex]])) {
            sectionFormat.differentFirstPage = HelperMethods.parseBoolValue(data[differentFirstPageProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[differentOddAndEvenPagesProperty[keyIndex]])) {
            sectionFormat.differentOddAndEvenPages = HelperMethods.parseBoolValue(data[differentOddAndEvenPagesProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[bidiProperty[keyIndex]])) {
            sectionFormat.bidi = HelperMethods.parseBoolValue(data[bidiProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[restartPageNumberingProperty[keyIndex]])) {
            sectionFormat.restartPageNumbering = HelperMethods.parseBoolValue(data[restartPageNumberingProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[pageStartingNumberProperty[keyIndex]])) {
            sectionFormat.pageStartingNumber = data[pageStartingNumberProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[endnoteNumberFormatProperty[keyIndex]])) {
            sectionFormat.endnoteNumberFormat = this.getFootEndNoteNumberFormat(data[endnoteNumberFormatProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[footNoteNumberFormatProperty[keyIndex]])) {
            sectionFormat.footNoteNumberFormat = this.getFootEndNoteNumberFormat(data[footNoteNumberFormatProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[restartIndexForFootnotesProperty[keyIndex]])) {
            sectionFormat.restartIndexForFootnotes = this.getFootnoteRestartIndex(data[restartIndexForFootnotesProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[restartIndexForEndnotesProperty[keyIndex]])) {
            sectionFormat.restartIndexForEndnotes = this.getFootnoteRestartIndex(data[restartIndexForEndnotesProperty[keyIndex]]);
        }
        if (!isNullOrUndefined(data[initialFootNoteNumberProperty[keyIndex]])) {
            sectionFormat.initialFootNoteNumber = data[initialFootNoteNumberProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[initialEndNoteNumberProperty[keyIndex]])) {
            sectionFormat.initialEndNoteNumber = data[initialEndNoteNumberProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[pageNumberStyleProperty[keyIndex]])) {
            sectionFormat.pageNumberStyle = data[pageNumberStyleProperty[keyIndex]];
        }
        if (!isNullOrUndefined(data[columnsProperty[keyIndex]]) && !isNullOrUndefined(data[numberOfColumnsProperty[keyIndex]]) && data[numberOfColumnsProperty[keyIndex]] > 1) {
            sectionFormat.numberOfColumns = data[numberOfColumnsProperty[keyIndex]];
            sectionFormat.equalWidth = HelperMethods.parseBoolValue(data[equalWidthProperty[keyIndex]]);
            sectionFormat.lineBetweenColumns = HelperMethods.parseBoolValue(data[lineBetweenColumnsProperty[keyIndex]]);
            if (data[columnsProperty[keyIndex]]) {
                for (var i = 0; i < data[columnsProperty[keyIndex]].length; i++) {
                    var newCol = new WColumnFormat();
                    newCol.width = HelperMethods.convertPointToPixel(data[columnsProperty[keyIndex]][i][widthProperty[keyIndex]]);
                    newCol.space = HelperMethods.convertPointToPixel(data[columnsProperty[keyIndex]][i][spaceProperty[keyIndex]]);
                    newCol.index = i;
                    sectionFormat.columns.push(newCol);
                }
            }
        }
        if (!isNullOrUndefined(data[breakCodeProperty[keyIndex]])) {
            sectionFormat.breakCode = data[breakCodeProperty[keyIndex]];
        }
    };
    SfdtReader.prototype.parseColumns = function (wCols, columns) {
        columns = [];
        if (wCols) {
            for (var i = 0; i < wCols.length; i++) {
                var newCol = new WColumnFormat();
                newCol.width = HelperMethods.convertPointToPixel(wCols[i][widthProperty[this.keywordIndex]]);
                newCol.space = HelperMethods.convertPointToPixel(wCols[i][spaceProperty[this.keywordIndex]]);
                newCol.index = i;
                columns.push(newCol);
            }
        }
    };
    SfdtReader.prototype.parseTabStop = function (keyIndex, wTabs, tabs) {
        if (wTabs) {
            for (var i = 0; i < wTabs.length; i++) {
                var isDuplicate = false;
                var tab = wTabs[i];
                if (Object.keys(tab).length > 0) {
                    var tabStop = new WTabStop();
                    tabStop.position = tab[positionProperty[keyIndex]];
                    tabStop.tabLeader = this.getTabLeader(tab[tabLeaderProperty[keyIndex]]);
                    tabStop.deletePosition = tab[deletePositionProperty[keyIndex]];
                    tabStop.tabJustification = this.getTabJustification(tab[tabJustificationProperty[keyIndex]]);
                    for (var j = 0; j < tabs.length; j++) {
                        var existingTab = tabs[j];
                        if (existingTab.position === tabStop.position &&
                            existingTab.tabLeader === tabStop.tabLeader &&
                            existingTab.deletePosition === tabStop.deletePosition &&
                            existingTab.tabJustification === tabStop.tabJustification) {
                            isDuplicate = true;
                            break;
                        }
                    }
                    if (!isDuplicate) {
                        tabs.push(tabStop);
                    }
                }
            }
        }
    };
    SfdtReader.prototype.validateImageUrl = function (imagestr) {
        var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        imagestr = imagestr.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        var totalLength = imagestr.length * 3 / 4;
        if (imagestr.charAt(imagestr.length - 1) === keyStr.charAt(64)) {
            totalLength--;
        }
        if (imagestr.charAt(imagestr.length - 2) === keyStr.charAt(64)) {
            totalLength--;
        }
        if (totalLength % 1 !== 0) {
            // totalLength is not an integer, the length does not match a valid
            // base64 content. That can happen if:
            // - the imagestr is not a base64 content
            // - the imagestr is *almost* a base64 content, with a extra chars at the
            // beginning or at the end
            // - the imagestr uses a base64 variant (base64url for example)
            return false;
        }
        return true;
    };
    SfdtReader.prototype.containsFieldBegin = function (line) {
        var element = undefined;
        for (var i = line.children.length - 1; i >= 0; i--) {
            element = line.children[i];
            if (element instanceof FieldElementBox && element.hasFieldEnd && element.nextElement instanceof TextElementBox) {
                return element.nextElement;
            }
            else if (element instanceof FieldElementBox) {
                return undefined;
            }
        }
        return element;
    };
    SfdtReader.prototype.getBaseAlignment = function (baselineAlignment) {
        switch (baselineAlignment) {
            case 0:
                return 'Normal';
            case 1:
                return 'Superscript';
            case 2:
                return 'Subscript';
            default:
                return baselineAlignment;
        }
    };
    SfdtReader.prototype.getUnderline = function (underline) {
        switch (underline) {
            case 0:
                return 'None';
            case 1:
                return 'Single';
            case 2:
                return 'Words';
            case 3:
                return 'Double';
            case 4:
                return 'Dotted';
            case 5:
                return 'Thick';
            case 6:
                return 'Dash';
            case 7:
                return 'DashLong';
            case 8:
                return 'DotDash';
            case 9:
                return 'DotDotDash';
            case 10:
                return 'Wavy';
            case 11:
                return 'DottedHeavy';
            case 12:
                return 'DashHeavy';
            case 13:
                return 'DashLongHeavy';
            case 14:
                return 'DotDashHeavy';
            case 15:
                return 'DotDotDashHeavy';
            case 16:
                return 'WavyHeavy';
            case 17:
                return 'WavyDouble';
            default:
                return underline;
        }
    };
    SfdtReader.prototype.getFontHintType = function (fontHintType) {
        switch (fontHintType) {
            case 0:
                return 'Default';
            case 1:
                return 'EastAsia';
            case 2:
                return 'CS';
            default:
                return fontHintType;
        }
    };
    SfdtReader.prototype.getStrikethrough = function (strikethrough) {
        switch (strikethrough) {
            case 0:
                return 'None';
            case 1:
                return 'SingleStrike';
            case 2:
                return 'DoubleStrike';
            default:
                return strikethrough;
        }
    };
    SfdtReader.prototype.getHighlightColor = function (highlightColor) {
        switch (highlightColor) {
            case 0:
                return 'NoColor';
            case 1:
                return 'Yellow';
            case 2:
                return 'BrightGreen';
            case 3:
                return 'Turquoise';
            case 4:
                return 'Pink';
            case 5:
                return 'Blue';
            case 6:
                return 'Red';
            case 7:
                return 'DarkBlue';
            case 8:
                return 'Teal';
            case 9:
                return 'Green';
            case 10:
                return 'Violet';
            case 11:
                return 'DarkRed';
            case 12:
                return 'DarkYellow';
            case 13:
                return 'Gray50';
            case 14:
                return 'Gray25';
            case 15:
                return 'Black';
            default:
                return highlightColor;
        }
    };
    SfdtReader.prototype.getLineSpacingType = function (lineSpacingType) {
        switch (lineSpacingType) {
            case 0:
                return 'Multiple';
            case 1:
                return 'AtLeast';
            case 2:
                return 'Exactly';
            default:
                return lineSpacingType;
        }
    };
    SfdtReader.prototype.getOutlineLevel = function (outlineLevel) {
        switch (outlineLevel) {
            case 0:
                return 'BodyText';
            case 1:
                return 'Level1';
            case 2:
                return 'Level2';
            case 3:
                return 'Level3';
            case 4:
                return 'Level4';
            case 5:
                return 'Level5';
            case 6:
                return 'Level6';
            case 7:
                return 'Level7';
            case 8:
                return 'Level8';
            case 9:
                return 'Level9';
            default:
                return outlineLevel;
        }
    };
    SfdtReader.prototype.getTextAlignment = function (textAlignment) {
        switch (textAlignment) {
            case 0:
                return 'Left';
            case 1:
                return 'Center';
            case 2:
                return 'Right';
            case 3:
                return 'Justify';
            default:
                return textAlignment;
        }
    };
    SfdtReader.prototype.getWidthType = function (widthType) {
        switch (widthType) {
            case 0:
                return 'Auto';
            case 1:
                return 'Percent';
            case 2:
                return 'Point';
            default:
                return widthType;
        }
    };
    SfdtReader.prototype.getTableAlignment = function (tableAlignment) {
        switch (tableAlignment) {
            case 0:
                return 'Left';
            case 1:
                return 'Center';
            case 2:
                return 'Right';
            default:
                return tableAlignment;
        }
    };
    SfdtReader.prototype.getLineStyle = function (lineStyle) {
        switch (lineStyle) {
            case 0:
                return 'Single';
            case 1:
                return 'None';
            case 2:
                return 'Dot';
            case 3:
                return 'DashSmallGap';
            case 4:
                return 'DashLargeGap';
            case 5:
                return 'DashDot';
            case 6:
                return 'DashDotDot';
            case 7:
                return 'Double';
            case 8:
                return 'Triple';
            case 9:
                return 'ThinThickSmallGap';
            case 10:
                return 'ThickThinSmallGap';
            case 11:
                return 'ThinThickThinSmallGap';
            case 12:
                return 'ThinThickMediumGap';
            case 13:
                return 'ThickThinMediumGap';
            case 14:
                return 'ThinThickThinMediumGap';
            case 15:
                return 'ThinThickLargeGap';
            case 16:
                return 'ThickThinLargeGap';
            case 17:
                return 'ThinThickThinLargeGap';
            case 18:
                return 'SingleWavy';
            case 19:
                return 'DoubleWavy';
            case 20:
                return 'DashDotStroked';
            case 21:
                return 'Emboss3D';
            case 22:
                return 'Engrave3D';
            case 23:
                return 'Outset';
            case 24:
                return 'Inset';
            case 25:
                return 'Thick';
            case 26:
                return 'Cleared';
            default:
                return lineStyle;
        }
    };
    SfdtReader.prototype.getTextureStyle = function (textureStyle) {
        switch (textureStyle) {
            case 0:
                return 'TextureNone';
            case 1:
                return 'Texture2Pt5Percent';
            case 2:
                return 'Texture5Percent';
            case 3:
                return 'Texture7Pt5Percent';
            case 4:
                return 'Texture10Percent';
            case 5:
                return 'Texture12Pt5Percent';
            case 6:
                return 'Texture15Percent';
            case 7:
                return 'Texture17Pt5Percent';
            case 8:
                return 'Texture20Percent';
            case 9:
                return 'Texture22Pt5Percent';
            case 10:
                return 'Texture25Percent';
            case 11:
                return 'Texture27Pt5Percent';
            case 12:
                return 'Texture30Percent';
            case 13:
                return 'Texture32Pt5Percent';
            case 14:
                return 'Texture35Percent';
            case 15:
                return 'Texture37Pt5Percent';
            case 16:
                return 'Texture40Percent';
            case 17:
                return 'Texture42Pt5Percent';
            case 18:
                return 'Texture45Percent';
            case 19:
                return 'Texture47Pt5Percent';
            case 20:
                return 'Texture50Percent';
            case 21:
                return 'Texture52Pt5Percent';
            case 22:
                return 'Texture55Percent';
            case 23:
                return 'Texture57Pt5Percent';
            case 24:
                return 'Texture60Percent';
            case 25:
                return 'Texture62Pt5Percent';
            case 26:
                return 'Texture65Percent';
            case 27:
                return 'Texture67Pt5Percent';
            case 28:
                return 'Texture70Percent';
            case 29:
                return 'Texture72Pt5Percent';
            case 30:
                return 'Texture75Percent';
            case 31:
                return 'Texture77Pt5Percent';
            case 32:
                return 'Texture80Percent';
            case 33:
                return 'Texture82Pt5Percent';
            case 34:
                return 'Texture85Percent';
            case 35:
                return 'Texture87Pt5Percent';
            case 36:
                return 'Texture90Percent';
            case 37:
                return 'Texture92Pt5Percent';
            case 38:
                return 'Texture95Percent';
            case 39:
                return 'Texture97Pt5Percent';
            case 40:
                return 'TextureSolid';
            case 41:
                return 'TextureDarkHorizontal';
            case 42:
                return 'TextureDarkVertical';
            case 43:
                return 'TextureDarkDiagonalDown';
            case 44:
                return 'TextureDarkDiagonalUp';
            case 45:
                return 'TextureDarkCross';
            case 46:
                return 'TextureDarkDiagonalCross';
            case 47:
                return 'TextureHorizontal';
            case 48:
                return 'TextureVertical';
            case 49:
                return 'TextureDiagonalDown';
            case 50:
                return 'TextureDiagonalUp';
            case 51:
                return 'TextureCross';
            case 52:
                return 'TextureDiagonalCross';
            default:
                return textureStyle;
        }
    };
    SfdtReader.prototype.getHeightType = function (heightType) {
        switch (heightType) {
            case 0:
                return 'AtLeast';
            case 1:
                return 'Exactly';
            default:
                return heightType;
        }
    };
    SfdtReader.prototype.getCellVerticalAlignment = function (cellVerticalAlignment) {
        switch (cellVerticalAlignment) {
            case 0:
                return 'Top';
            case 1:
                return 'Center';
            case 2:
                return 'Bottom';
            default:
                return cellVerticalAlignment;
        }
    };
    /**
     * @private
     */
    SfdtReader.prototype.getListLevelPattern = function (listLevelPattern) {
        switch (listLevelPattern) {
            case 0:
                return 'None';
            case 1:
            // In online Ms Word, the Arabic pattern is applied for unsupported list level pattern.
            case 13:
            case 'KanjiDigit':
                return 'Arabic';
            case 2:
                return 'UpRoman';
            case 3:
                return 'LowRoman';
            case 4:
                return 'UpLetter';
            case 5:
                return 'LowLetter';
            case 6:
                return 'Ordinal';
            case 7:
                return 'Number';
            case 8:
                return 'OrdinalText';
            case 9:
                return 'LeadingZero';
            case 10:
                return 'Bullet';
            case 11:
                return 'FarEast';
            case 12:
                return 'Special';
            default:
                return listLevelPattern;
        }
    };
    SfdtReader.prototype.getFollowCharacterType = function (followCharacterType) {
        switch (followCharacterType) {
            case 0:
                return 'Tab';
            case 1:
                return 'Space';
            case 2:
                return 'None';
            default:
                return followCharacterType;
        }
    };
    SfdtReader.prototype.getStyleType = function (styleType) {
        switch (styleType) {
            case 0:
                return 'Paragraph';
            case 1:
                return 'Character';
            case 2:
                return 'Table';
            default:
                return styleType;
        }
    };
    SfdtReader.prototype.getProtectionType = function (protectionType) {
        switch (protectionType) {
            case 0:
                return 'NoProtection';
            case 1:
                return 'ReadOnly';
            case 2:
                return 'FormFieldsOnly';
            case 3:
                return 'CommentsOnly';
            case 4:
                return 'RevisionsOnly';
            default:
                return protectionType;
        }
    };
    SfdtReader.prototype.getRevisionType = function (revisionType) {
        switch (revisionType) {
            case 1:
                return 'Insertion';
            case 2:
                return 'Deletion';
            case 3:
                return 'MoveTo';
            case 4:
                return 'MoveFrom';
            default:
                return revisionType;
        }
    };
    SfdtReader.prototype.getFootnoteType = function (footnoteType) {
        switch (footnoteType) {
            case 0:
                return 'Footnote';
            case 1:
                return 'Endnote';
            default:
                return footnoteType;
        }
    };
    SfdtReader.prototype.getFootnoteRestartIndex = function (footnoteRestartIndex) {
        switch (footnoteRestartIndex) {
            case 0:
                return 'DoNotRestart';
            case 1:
                return 'RestartForEachSection';
            case 2:
                return 'RestartForEachPage';
            default:
                return footnoteRestartIndex;
        }
    };
    SfdtReader.prototype.getFootEndNoteNumberFormat = function (footEndNoteNumberFormat) {
        switch (footEndNoteNumberFormat) {
            case 0:
                return 'Arabic';
            case 1:
                return 'UpperCaseRoman';
            case 2:
                return 'LowerCaseRoman';
            case 3:
                return 'UpperCaseLetter';
            case 4:
                return 'LowerCaseLetter';
            default:
                return footEndNoteNumberFormat;
        }
    };
    SfdtReader.prototype.getBiDirectionalOverride = function (biDirectionalOverride) {
        switch (biDirectionalOverride) {
            case 0:
                return 'None';
            case 1:
                return 'LTR';
            case 2:
                return 'RTL';
            default:
                return biDirectionalOverride;
        }
    };
    SfdtReader.prototype.getBreakClearType = function (breakClearType) {
        switch (breakClearType) {
            case 0:
                return 'None';
            case 1:
                return 'Left';
            case 2:
                return 'Right';
            case 3:
                return 'All';
            default:
                return breakClearType;
        }
    };
    SfdtReader.prototype.getTextVerticalAlignment = function (textVerticalAlignment) {
        switch (textVerticalAlignment) {
            case 0:
                return 'Top';
            case 1:
                return 'Center';
            case 2:
                return 'Bottom';
            default:
                return textVerticalAlignment;
        }
    };
    SfdtReader.prototype.getShapeVerticalAlignment = function (shapeVerticalAlignment) {
        switch (shapeVerticalAlignment) {
            case 0:
                return 'None';
            case 1:
                return 'Top';
            case 2:
                return 'Center';
            case 3:
                return 'Bottom';
            case 4:
                return 'Inline';
            case 5:
                return 'Inside';
            case 6:
                return 'Outside';
            default:
                return shapeVerticalAlignment;
        }
    };
    SfdtReader.prototype.getShapeHorizontalAlignment = function (shapeHorizontalAlignment) {
        switch (shapeHorizontalAlignment) {
            case 0:
                return 'None';
            case 1:
                return 'Center';
            case 2:
                return 'Inside';
            case 3:
                return 'Left';
            case 4:
                return 'Outside';
            case 5:
                return 'Right';
            default:
                return shapeHorizontalAlignment;
        }
    };
    SfdtReader.prototype.getVerticalOrigin = function (verticalOrigin) {
        switch (verticalOrigin) {
            case 0:
                return 'Paragraph';
            case 1:
                return 'BottomMargin';
            case 2:
                return 'InsideMargin';
            case 3:
                return 'Line';
            case 4:
                return 'Margin';
            case 5:
                return 'OutsideMargin';
            case 6:
                return 'Page';
            case 7:
                return 'TopMargin';
            default:
                return verticalOrigin;
        }
    };
    SfdtReader.prototype.getHorizontalOrigin = function (horizontalOrigin) {
        switch (horizontalOrigin) {
            case 0:
                return 'Column';
            case 1:
                return 'Character';
            case 2:
                return 'InsideMargin';
            case 3:
                return 'LeftMargin';
            case 4:
                return 'Margin';
            case 5:
                return 'OutsideMargin';
            case 6:
                return 'Page';
            case 7:
                return 'RightMargin';
            default:
                return horizontalOrigin;
        }
    };
    SfdtReader.prototype.getTableVerticalRelation = function (tableRelation) {
        switch (tableRelation) {
            case 0:
                return 'Paragraph';
            case 1:
                return 'Margin';
            case 2:
                return 'Page';
            default:
                return tableRelation;
        }
    };
    SfdtReader.prototype.getTableHorizontalRelation = function (tableRelation) {
        switch (tableRelation) {
            case 0:
                return 'Column';
            case 1:
                return 'Margin';
            case 2:
                return 'Page';
            default:
                return tableRelation;
        }
    };
    SfdtReader.prototype.getTableVerticalPosition = function (tableVerticalPosition) {
        switch (tableVerticalPosition) {
            case 0:
                return 'None';
            case 1:
                return 'Top';
            case 2:
                return 'Center';
            case 3:
                return 'Bottom';
            case 4:
                return 'Inside';
            case 5:
                return 'Outside';
            default:
                return tableVerticalPosition;
        }
    };
    SfdtReader.prototype.getTableHorizontalPosition = function (tableHorizontalPosition) {
        switch (tableHorizontalPosition) {
            case 0:
                return 'Left';
            case 1:
                return 'Center';
            case 2:
                return 'Inside';
            case 3:
                return 'Outside';
            case 4:
                return 'Right';
            default:
                return tableHorizontalPosition;
        }
    };
    SfdtReader.prototype.getLineDashStyle = function (lineDashStyle) {
        switch (lineDashStyle) {
            case 0:
                return 'Solid';
            case 1:
                return 'Dash';
            case 2:
                return 'DashDot';
            case 3:
                return 'DashDotDot';
            case 4:
                return 'DashDotGEL';
            case 5:
                return 'DashGEL';
            case 6:
                return 'Dot';
            case 7:
                return 'DotGEL';
            case 8:
                return 'LongDashDotDotGEL';
            case 9:
                return 'LongDashDotGEL';
            case 10:
                return 'LongDashGEL';
            default:
                return lineDashStyle;
        }
    };
    SfdtReader.prototype.getHorizontalPositionAbs = function (horizontalPositionAbs) {
        switch (horizontalPositionAbs) {
            case 0:
                return 'Left';
            case 1:
                return 'Center';
            case 2:
                return 'Right';
            case 3:
                return 'Inside';
            case 4:
                return 'Outside';
            default:
                return horizontalPositionAbs;
        }
    };
    SfdtReader.prototype.getTabJustification = function (tabJustification) {
        switch (tabJustification) {
            case 0:
                return 'Left';
            case 1:
                return 'Bar';
            case 2:
                return 'Center';
            case 3:
                return 'Decimal';
            case 4:
                return 'List';
            case 5:
                return 'Right';
            default:
                return tabJustification;
        }
    };
    SfdtReader.prototype.getTabLeader = function (tabLeader) {
        switch (tabLeader) {
            case 0:
                return 'None';
            case 1:
                return 'Single';
            case 2:
                return 'Dot';
            case 3:
                return 'Hyphen';
            case 4:
                return 'Underscore';
            default:
                return tabLeader;
        }
    };
    SfdtReader.prototype.getTextFormFieldType = function (textFormFieldType) {
        switch (textFormFieldType) {
            case 0:
                return 'Text';
            case 1:
                return 'Number';
            case 2:
                return 'Date';
            case 3:
                return 'Calculation';
            default:
                return textFormFieldType;
        }
    };
    SfdtReader.prototype.getTextFormFieldFormat = function (textFormFieldFormat) {
        switch (textFormFieldFormat) {
            case 0:
                return 'None';
            case 1:
                return 'FirstCapital';
            case 2:
                return 'Lowercase';
            case 3:
                return 'Uppercase';
            case 4:
                return 'Titlecase';
            default:
                return textFormFieldFormat;
        }
    };
    SfdtReader.prototype.getCheckBoxSizeType = function (checkBoxSizeType) {
        switch (checkBoxSizeType) {
            case 0:
                return 'Auto';
            case 1:
                return 'Exactly';
            default:
                return checkBoxSizeType;
        }
    };
    SfdtReader.prototype.getContentControlAppearance = function (contentControlAppearance) {
        switch (contentControlAppearance) {
            case 1:
                return 'BoundingBox';
            case 2:
                return 'Hidden';
            case 3:
                return 'Tags';
            default:
                return contentControlAppearance;
        }
    };
    SfdtReader.prototype.getContentControlType = function (contentControlType) {
        switch (contentControlType) {
            case 0:
                return 'RichText';
            case 1:
                return 'BuildingBlockGallery';
            case 2:
                return 'CheckBox';
            case 3:
                return 'ComboBox';
            case 4:
                return 'Date';
            case 5:
                return 'DropDownList';
            case 6:
                return 'Group';
            case 7:
                return 'Picture';
            case 8:
                return 'RepeatingSection';
            case 9:
                return 'Text';
            default:
                return contentControlType;
        }
    };
    SfdtReader.prototype.getDateCalendarType = function (dateCalendarType) {
        switch (dateCalendarType) {
            case 0:
                return 'Gregorian';
            case 1:
                return 'GregorianArabic';
            case 2:
                return 'GregorianEnglish';
            case 3:
                return 'GregorianMiddleEastFrench';
            case 4:
                return 'GregorianTransliteratedEnglish';
            case 5:
                return 'GregorianTransliteratedFrench';
            case 6:
                return 'Hebrew';
            case 7:
                return 'Hijri';
            case 8:
                return 'Japan';
            case 9:
                return 'Korean';
            case 10:
                return 'Saka';
            case 11:
                return 'Taiwan';
            case 12:
                return 'Thai';
            default:
                return dateCalendarType;
        }
    };
    SfdtReader.prototype.getDateStorageFormat = function (dateStorageFormat) {
        switch (dateStorageFormat) {
            case 1:
                return 'DateStorageDate';
            case 2:
                return 'DateStorageDateTime';
            case 3:
                return 'DateStorageText';
            default:
                return dateStorageFormat;
        }
    };
    SfdtReader.prototype.getTextWrappingStyle = function (textWrappingStyle) {
        switch (textWrappingStyle) {
            case 0:
                return 'Inline';
            case 1:
                return 'InFrontOfText';
            case 2:
                return 'Square';
            case 3:
                return 'TopAndBottom';
            case 4:
                return 'Behind';
            default:
                return textWrappingStyle;
        }
    };
    SfdtReader.prototype.getTextWrappingType = function (textWrappingType) {
        switch (textWrappingType) {
            case 0:
                return 'Both';
            case 1:
                return 'Left';
            case 2:
                return 'Right';
            case 3:
                return 'Largest';
            default:
                return textWrappingType;
        }
    };
    SfdtReader.prototype.getCompatibilityMode = function (compatibilityMode) {
        switch (compatibilityMode) {
            case 0:
                return 'Word2013';
            case 1:
                return 'Word2003';
            case 2:
                return 'Word2007';
            case 3:
                return 'Word2010';
            default:
                return compatibilityMode;
        }
    };
    SfdtReader.prototype.getLineFormatType = function (lineFormatType) {
        switch (lineFormatType) {
            case 0:
                return 'Solid';
            case 1:
                return 'Patterned';
            case 2:
                return 'Gradient';
            case 3:
                return 'None';
            default:
                return lineFormatType;
        }
    };
    SfdtReader.prototype.getAutoShapeType = function (autoShapeType) {
        switch (autoShapeType) {
            case 1:
                return 'Rectangle';
            case 2:
                return 'RoundedRectangle';
            case 3:
                return 'StraightConnector';
            case 4:
                return "Oval";
            case 5:
                return "IsoscelesTriangle";
            case 6:
                return "RightTriangle";
            case 7:
                return "Parallelogram";
            case 8:
                return "Trapezoid";
            case 9:
                return "Diamond";
            case 10:
                return "RegularPentagon";
            case 11:
                return "Hexagon";
            case 12:
                return "Heptagon";
            case 13:
                return "Octagon";
            case 14:
                return "Decagon";
            case 15:
                return "Dodecagon";
            case 16:
                return "Chord";
            case 17:
                return "Teardrop";
            case 18:
                return "Frame";
            case 19:
                return "HalfFrame";
            case 20:
                return "L_Shape";
            case 21:
                return "Pie";
            case 22:
                return "DiagonalStripe";
            case 23:
                return "Cross";
            case 24:
                return "Plaque";
            case 25:
                return "Can";
            case 26:
                return "Cube";
            case 27:
                return "Bevel";
            case 28:
                return "Donut";
            case 29:
                return "NoSymbol";
            case 30:
                return "BlockArc";
            case 31:
                return "FoldedCorner";
            case 32:
                return "SmileyFace";
            case 33:
                return "Heart";
            case 34:
                return "LightningBolt";
            case 35:
                return "Sun";
            case 36:
                return "Moon";
            case 37:
                return "Cloud";
            case 38:
                return "Arc";
            case 39:
                return "DoubleBracket";
            case 40:
                return "DoubleBrace";
            case 41:
                return "LeftBracket";
            case 42:
                return "RightBracket";
            case 43:
                return "LeftBrace";
            case 44:
                return "RightBrace";
            case 45:
                return "FlowChartProcess";
            case 46:
                return "FlowChartAlternateProcess";
            case 47:
                return "FlowChartDecision";
            case 48:
                return "FlowChartData";
            case 49:
                return "FlowChartPredefinedProcess";
            case 50:
                return "FlowChartInternalStorage";
            case 51:
                return "FlowChartDocument";
            case 52:
                return "FlowChartMultiDocument";
            case 53:
                return "FlowChartTerminator";
            case 54:
                return "FlowChartPreparation";
            case 55:
                return "FlowChartManualInput";
            case 56:
                return "FlowChartManualOperation";
            case 57:
                return "FlowChartConnector";
            case 58:
                return "FlowChartOffPageConnector";
            case 59:
                return "FlowChartCard";
            case 60:
                return "FlowChartPunchedTape";
            case 61:
                return "FlowChartSummingJunction";
            case 62:
                return "FlowChartOr";
            case 63:
                return "FlowChartCollate";
            case 64:
                return "FlowChartSort";
            case 65:
                return "FlowChartExtract";
            case 66:
                return "FlowChartMerge";
            case 67:
                return "FlowChartStoredData";
            case 68:
                return "FlowChartDelay";
            case 69:
                return "FlowChartSequentialAccessStorage";
            case 70:
                return "FlowChartMagneticDisk";
            case 71:
                return "FlowChartDirectAccessStorage";
            case 72:
                return "FlowChartDisplay";
            case 73:
                return "RightArrow";
            case 74:
                return "LeftArrow";
            case 75:
                return "UpArrow";
            case 76:
                return "DownArrow";
            case 77:
                return "LeftRightArrow";
            case 78:
                return "UpDownArrow";
            case 79:
                return "QuadArrow";
            case 80:
                return "LeftRightUpArrow";
            case 81:
                return "BentArrow";
            case 82:
                return "UTurnArrow";
            case 83:
                return "LeftUpArrow";
            case 84:
                return "BentUpArrow";
            case 85:
                return "CurvedRightArrow";
            case 86:
                return "CurvedLeftArrow";
            case 87:
                return "CurvedUpArrow";
            case 88:
                return "CurvedDownArrow";
            case 89:
                return "StripedRightArrow";
            case 90:
                return "NotchedRightArrow";
            case 91:
                return "Pentagon";
            case 92:
                return "Chevron";
            case 93:
                return "RightArrowCallout";
            case 94:
                return "DownArrowCallout";
            case 95:
                return "LeftArrowCallout";
            case 96:
                return "UpArrowCallout";
            case 97:
                return "LeftRightArrowCallout";
            case 98:
                return "QuadArrowCallout";
            case 99:
                return "CircularArrow";
            case 100:
                return "MathPlus";
            case 101:
                return "MathMinus";
            case 102:
                return "MathMultiply";
            case 103:
                return "MathDivision";
            case 104:
                return "MathEqual";
            case 105:
                return "MathNotEqual";
            case 106:
                return "Explosion1";
            case 107:
                return "Explosion2";
            case 108:
                return "Star4Point";
            case 109:
                return "Star5Point";
            case 110:
                return "Star6Point";
            case 111:
                return "Star7Point";
            case 112:
                return "Star8Point";
            case 113:
                return "Star10Point";
            case 114:
                return "Star12Point";
            case 115:
                return "Star16Point";
            case 116:
                return "Star24Point";
            case 117:
                return "Star32Point";
            case 118:
                return "UpRibbon";
            case 119:
                return "DownRibbon";
            case 120:
                return "CurvedUpRibbon";
            case 121:
                return "CurvedDownRibbon";
            case 122:
                return "VerticalScroll";
            case 123:
                return "HorizontalScroll";
            case 124:
                return "Wave";
            case 125:
                return "DoubleWave";
            case 126:
                return "SnipSingleCornerRectangle";
            case 127:
                return "SnipSameSideCornerRectangle";
            case 128:
                return "SnipDiagonalCornerRectangle";
            case 129:
                return "SnipAndRoundSingleCornerRectangle";
            case 130:
                return "RoundSingleCornerRectangle";
            case 131:
                return "RoundSameSideCornerRectangle";
            case 132:
                return "RoundDiagonalCornerRectangle";
            case 133:
                return "Unknown";
            case 134:
                return "ElbowConnector";
            case 135:
                return "CurvedConnector";
            default:
                return autoShapeType;
        }
    };
    /**
     * @private
     * @returns {void}
     */
    SfdtReader.prototype.destroy = function () {
        if (this.footnotes) {
            this.footnotes.destroy();
        }
        this.footnotes = undefined;
        if (this.endnotes) {
            this.endnotes.destroy();
        }
        this.endnotes = undefined;
        if (this.editableRanges) {
            this.editableRanges.destroy();
        }
        this.editableRanges = undefined;
        if (this.commentEnds) {
            this.commentEnds.destroy();
        }
        this.commentEnds = undefined;
        if (this.commentStarts) {
            this.commentStarts.destroy();
        }
        this.commentStarts = undefined;
        if (this.commentsCollection) {
            this.commentsCollection.destroy();
        }
        this.commentsCollection = undefined;
        if (this.revisionCollection) {
            this.revisionCollection.destroy();
        }
        this.revisionCollection = undefined;
        if (this.fontInfoCollection) {
            this.fontInfoCollection.destroy();
        }
        this.fontInfoCollection = undefined;
        this.documentHelper = undefined;
        this.keywordIndex = undefined;
    };
    return SfdtReader;
}());
export { SfdtReader };
